// Sniff Pipefy automation mutations via the internal /graphql/core endpoint.
//
// Why: the public GraphQL API rejects scheduler/sla_based/card_moved combos
// (see automations-api-gap-analysis.md). The UI builder uses a richer internal
// endpoint at /graphql/core. This script captures those mutations so we can
// parameterize and replay them for the remaining 14 automations.
//
// Flow:
//   1. Navigate to the pipe's new-automation URL.
//   2. Hook into network requests on /graphql/core — log operationName +
//      variables + (truncated) query string.
//   3. WAIT for the user to manually drive the UI: choose event, choose action,
//      configure, and hit Save.
//   4. On Save, the mutation fires — we capture the full payload to disk.
//   5. Keep the page open until the user closes the browser tab (ctx.close
//      handles cleanup).
//
// ARGS JSON: { "pipe_id": "307117441" }
// OUTPUT: /tmp/pipefy-automation-sniff.json  (appends all captured mutations)

const { test } = require('@playwright/test');
const fs = require('fs');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');
const OUT = '/tmp/pipefy-automation-sniff.json';

test.setTimeout(20 * 60_000); // 20 min for manual interaction

test('sniff-automation-mutation', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id required');

  const captured = [];
  const { ctx, page } = await launchPipefyContext();

  // ── Load existing captures (append mode) ──
  if (fs.existsSync(OUT)) {
    try {
      const prior = JSON.parse(fs.readFileSync(OUT, 'utf8'));
      if (prior.captured?.length) captured.push(...prior.captured);
      console.log(`ℹ loaded ${captured.length} prior captures from ${OUT}`);
    } catch {}
  }

  const writeOut = () => {
    fs.writeFileSync(OUT, JSON.stringify({
      _captured_at: new Date().toISOString(),
      pipe_id: ARGS.pipe_id,
      captured,
    }, null, 2));
  };

  // ── Hook ALL POST/PUT/PATCH/DELETE requests (promiscuous sniff) ──
  page.on('request', async (req) => {
    const method = req.method();
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return;
    const u = req.url();
    // Skip obvious non-API traffic (analytics, tracking, assets)
    if (/\.(png|jpg|jpeg|svg|css|js|woff2?)(\?|$)/i.test(u)) return;
    if (/google-analytics|segment\.com|mixpanel|sentry\.io|hotjar|facebook\.com|doubleclick/i.test(u)) return;

    let body = null;
    let rawBody = null;
    try {
      rawBody = req.postData();
      body = req.postDataJSON();
    } catch {}

    const isGraphql = /\/graphql/.test(u);
    let op = '(non-gql)';
    let vars = {};
    let query = '';
    if (isGraphql && body) {
      op = body.operationName || '(anonymous)';
      vars = body.variables || {};
      query = (body.query || '').trim();
      // Skip plain queries to reduce noise; keep mutations and subscriptions
      if (/^\s*query\b/i.test(query)) return;
    }

    console.log(`\n═══ ${method} ${op} ═══  ${u}`);
    if (isGraphql) {
      console.log('  variables:', JSON.stringify(vars, null, 2).slice(0, 1500));
      console.log('  query (first 600 chars):', query.slice(0, 600));
    } else {
      console.log('  raw body (first 800 chars):', (rawBody || '').slice(0, 800));
    }

    // Capture request headers (look for auth/csrf tokens)
    const headers = await req.allHeaders().catch(() => ({}));
    const entry = {
      _captured_at: new Date().toISOString(),
      method,
      url: u,
      isGraphql,
      operationName: op,
      variables: vars,
      query,
      rawBody: isGraphql ? null : rawBody,
      requestHeaders: headers,
      response: null,
    };
    captured.push(entry);
    writeOut();

    // Attach response
    try {
      const resp = await req.response();
      if (resp) {
        const respBody = await resp.json().catch(() => null);
        entry.response = respBody;
        writeOut();
        if (respBody?.errors) {
          console.log(`  ✘ response errors:`, JSON.stringify(respBody.errors).slice(0, 500));
        } else if (respBody?.data) {
          const keys = Object.keys(respBody.data);
          console.log(`  ✓ response data keys: ${keys.join(', ')}`);
        }
      }
    } catch (e) {
      console.log(`  (no response: ${e.message})`);
    }
  });

  // ── Go to new-automation page ──
  const url = `https://app.pipefy.com/pipes/${ARGS.pipe_id}/settings/automations/new`;
  console.log(`→ goto ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn(page);
  await page.waitForLoadState('networkidle').catch(() => {});

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SNIFF MODE — manual interaction required');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  1. Create an automation in the UI (any kind — e.g. A-04 scheduler+email)');
  console.log('  2. Hit Save/Salvar');
  console.log('  3. Mutation will be captured & logged here');
  console.log('  4. Repeat for any other event/action combo you want sniffed');
  console.log('  5. Close the browser tab when done\n');

  // Keep alive until page/context closes
  await new Promise((resolve) => {
    page.on('close', resolve);
    ctx.on('close', resolve);
  });

  console.log(`\n✓ sniff done — ${captured.length} mutations saved to ${OUT}`);
});
