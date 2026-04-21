// Bulk-create Pipefy automations via the internal /internal_api endpoint.
//
// Uses page.evaluate() fetch to replay the `createAutomation` mutation captured
// during sniffing. Reuses the authenticated browser session (cookies persist in
// the Pipefy profile dir), so no CSRF/token handling needed.
//
// ARGS JSON:
// {
//   "pipe_id": "307117441",
//   "config_path": "squads/.../06-automations-final.json"
// }
//
// OUTPUT: /tmp/pipefy-bulk-automations-result.json
//   { created: [{ spec_id, pipefy_id, name }], failed: [{ spec_id, error }] }

const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');

const CREATE_MUTATION = `
  mutation createAutomation (
    $name: String!,
    $action_id: ID!,
    $event_id: ID!,
    $action_repo_id: ID,
    $event_repo_id: ID,
    $event_params: AutomationEventParamsInput,
    $action_params: AutomationActionParamsInput,
    $condition: ConditionInput,
    $scheduler_frequency: String,
    $searchFor: [SearchConditionInput],
    $schedulerCron: CronInput
    $responseSchema: JSON
  ){
    createAutomation (
      input: {
        name: $name,
        action_id: $action_id,
        event_id: $event_id,
        action_repo_id: $action_repo_id,
        event_repo_id: $event_repo_id,
        event_params: $event_params,
        action_params: $action_params,
        condition: $condition,
        scheduler_frequency: $scheduler_frequency,
        searchFor: $searchFor,
        schedulerCron: $schedulerCron
        responseSchema: $responseSchema
      }
    ){
      automation { id }
      error_details { object_key messages }
    }
  }
`;

test.setTimeout(300_000);

test('bulk-create-automations', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id required');
  if (!ARGS.config_path) throw new Error('ARGS.config_path required');

  const configPath = path.resolve(process.cwd(), '..', ARGS.config_path);
  // Fallback: maybe config_path is absolute
  const resolvedPath = fs.existsSync(configPath) ? configPath : ARGS.config_path;
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Config not found at ${configPath} or ${ARGS.config_path}`);
  }
  const config = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  const automations = config.automations || [];
  console.log(`→ ${automations.length} automations to create`);

  const { ctx, page } = await launchPipefyContext();
  const result = { created: [], failed: [] };

  try {
    // Navigate to pipe so cookies + CSRF context are initialized
    await page.goto(`https://app.pipefy.com/pipes/${ARGS.pipe_id}`, { waitUntil: 'domcontentloaded' });
    await ensureLoggedIn(page);
    await page.waitForLoadState('networkidle').catch(() => {});

    // Extract CSRF token from meta tag (Rails-style)
    const csrfToken = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="csrf-token"]');
      return meta ? meta.getAttribute('content') : null;
    });
    if (!csrfToken) {
      console.log('⚠ no csrf-token meta tag found — requests may fail');
    } else {
      console.log(`✓ csrf-token extracted (${csrfToken.length} chars)`);
    }

    for (const spec of automations) {
      console.log(`\n→ [${spec.id}] ${spec.name}`);
      try {
        const resp = await page.evaluate(async ({ query, variables, csrf }) => {
          const r = await fetch('https://app.pipefy.com/internal_api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrf,
            },
            credentials: 'include',
            body: JSON.stringify({ query, variables }),
          });
          const text = await r.text();
          try {
            return { status: r.status, body: JSON.parse(text) };
          } catch {
            return { status: r.status, body: text };
          }
        }, { query: CREATE_MUTATION, variables: spec.variables, csrf: csrfToken });

        const errors = resp.body?.errors || resp.body?.data?.createAutomation?.error_details;
        const id = resp.body?.data?.createAutomation?.automation?.id;
        if (id) {
          console.log(`   ✓ id=${id}`);
          result.created.push({ spec_id: spec.id, pipefy_id: id, name: spec.name });
        } else {
          console.log(`   ✘ no id. response=${JSON.stringify(resp.body).slice(0, 300)}`);
          result.failed.push({ spec_id: spec.id, name: spec.name, status: resp.status, error: errors || resp.body });
        }
      } catch (err) {
        console.log(`   ✘ exception: ${err.message}`);
        result.failed.push({ spec_id: spec.id, name: spec.name, error: String(err) });
      }

      await page.waitForTimeout(500); // gentle rate-limit
    }
  } finally {
    fs.writeFileSync('/tmp/pipefy-bulk-automations-result.json', JSON.stringify(result, null, 2));
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  ✓ created: ${result.created.length}/${automations.length}`);
    console.log(`  ✘ failed:  ${result.failed.length}`);
    console.log(`  result:    /tmp/pipefy-bulk-automations-result.json`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    await ctx.close();
  }
});
