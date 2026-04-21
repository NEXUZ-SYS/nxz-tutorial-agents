// Bulk-create Pipefy field conditions via internal_api.
// Reuses authenticated session + CSRF token extraction.
//
// ARGS JSON: { "pipe_id": "307117441", "config_path": "..." }
// OUTPUT: /tmp/pipefy-bulk-fc-result.json

const { test } = require('@playwright/test');
const fs = require('fs');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');

const CREATE_MUTATION = `
  mutation createFieldCondition (
    $name: String,
    $phaseId: ID!,
    $actions: [FieldConditionActionInput],
    $condition: ConditionInput
  ){
    createFieldCondition (
      input: { name: $name, phaseId: $phaseId, actions: $actions, condition: $condition }
    ){
      fieldCondition { id }
    }
  }
`;

test.setTimeout(180_000);

test('bulk-create-field-conditions', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id required');
  if (!ARGS.config_path) throw new Error('ARGS.config_path required');

  if (!fs.existsSync(ARGS.config_path)) throw new Error(`config not found: ${ARGS.config_path}`);
  const config = JSON.parse(fs.readFileSync(ARGS.config_path, 'utf8'));
  const items = config.field_conditions || [];
  console.log(`→ ${items.length} field conditions to create`);

  const { ctx, page } = await launchPipefyContext();
  const result = { created: [], failed: [] };

  try {
    await page.goto(`https://app.pipefy.com/pipes/${ARGS.pipe_id}`, { waitUntil: 'domcontentloaded' });
    await ensureLoggedIn(page);
    await page.waitForLoadState('networkidle').catch(() => {});

    const csrfToken = await page.evaluate(() => {
      const m = document.querySelector('meta[name="csrf-token"]');
      return m ? m.getAttribute('content') : null;
    });
    if (!csrfToken) console.log('⚠ no csrf-token');
    else console.log(`✓ csrf-token extracted`);

    for (const spec of items) {
      console.log(`\n→ [${spec.id}] ${spec.variables.name}`);
      try {
        const resp = await page.evaluate(async ({ query, variables, csrf }) => {
          const r = await fetch('https://app.pipefy.com/queries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
            credentials: 'include',
            body: JSON.stringify({ query, variables }),
          });
          const text = await r.text();
          try { return { status: r.status, body: JSON.parse(text) }; }
          catch { return { status: r.status, body: text }; }
        }, { query: CREATE_MUTATION, variables: spec.variables, csrf: csrfToken });

        const id = resp.body?.data?.createFieldCondition?.fieldCondition?.id;
        const errs = resp.body?.errors;
        if (id) {
          console.log(`   ✓ id=${id}`);
          result.created.push({ spec_id: spec.id, pipefy_id: id, name: spec.variables.name });
        } else {
          console.log(`   ✘ ${JSON.stringify(resp.body).slice(0, 300)}`);
          result.failed.push({ spec_id: spec.id, name: spec.variables.name, error: errs || resp.body });
        }
      } catch (err) {
        console.log(`   ✘ exception: ${err.message}`);
        result.failed.push({ spec_id: spec.id, error: String(err) });
      }
      await page.waitForTimeout(400);
    }
  } finally {
    fs.writeFileSync('/tmp/pipefy-bulk-fc-result.json', JSON.stringify(result, null, 2));
    console.log(`\n━━━ ✓ ${result.created.length}/${items.length}  ✘ ${result.failed.length} ━━━`);
    await ctx.close();
  }
});
