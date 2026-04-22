// Sniff ALL Pipefy internal mutations fired from a connector field's settings
// drawer (filter config + sync-fields + anything else UI-only).
//
// Why: Pipefy's public GraphQL API does NOT expose:
//   a) Dynamic cross-field filter (Contatos.cliente == Deal.cliente)
//   b) Sync fields on "create new connected" (pre-fill Contato.cliente from
//      Deal.cliente when user creates a new Contato inline)
// Both are UI-only features configured in the connector field settings panel.
// This sniff captures whatever mutation the UI fires so we can replay programmatically.
//
// Flow:
//   1. Navigate to pipe settings → start form editor.
//   2. Hook ALL network POSTs (matching pattern from sniff-automation-mutation.js).
//   3. User manually opens settings for the target connector field and tweaks
//      settings (filter + sync fields + anything else to capture), then Save.
//   4. Each save fires a mutation captured at /tmp/pipefy-connector-settings-sniff.json.
//   5. Inspect captured mutations to see which fields they carry; parameterize
//      and replay via /internal_api like bulk-create-automations.js.
//
// ARGS JSON: { "pipe_id": "307117441", "field_id": "contatos_do_deal_1" }

const { test } = require('@playwright/test');
const fs = require('fs');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');
const OUT = '/tmp/pipefy-connector-settings-sniff.json';

test.setTimeout(30 * 60_000); // 30 min for manual interaction

test('sniff-connector-settings', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id required');

  const captured = [];
  const { ctx, page } = await launchPipefyContext();

  if (fs.existsSync(OUT)) {
    try {
      const prior = JSON.parse(fs.readFileSync(OUT, 'utf8'));
      if (prior.captured?.length) captured.push(...prior.captured);
      console.log(`loaded ${captured.length} prior captures`);
    } catch {}
  }

  const writeOut = () => fs.writeFileSync(OUT, JSON.stringify({
    _captured_at: new Date().toISOString(),
    pipe_id: ARGS.pipe_id,
    field_id: ARGS.field_id,
    captured,
  }, null, 2));

  page.on('request', async (req) => {
    const method = req.method();
    if (!['POST', 'PUT', 'PATCH'].includes(method)) return;
    const u = req.url();
    if (/\.(png|jpg|jpeg|svg|css|js|woff2?)(\?|$)/i.test(u)) return;
    if (/google-analytics|segment\.com|mixpanel|sentry\.io|hotjar|facebook\.com|doubleclick/i.test(u)) return;

    let body = null, rawBody = null;
    try { rawBody = req.postData(); body = req.postDataJSON(); } catch {}

    const isGraphql = /\/graphql/.test(u);
    let op = '(non-gql)', vars = {}, query = '';
    if (isGraphql && body) {
      op = body.operationName || '(anonymous)';
      vars = body.variables || {};
      query = (body.query || '').trim();
      if (/^\s*query\b/i.test(query)) return;
    }

    console.log(`\n═ ${method} ${op}  ${u}`);
    if (isGraphql) {
      console.log('  vars:', JSON.stringify(vars, null, 2).slice(0, 1200));
      console.log('  query:', query.slice(0, 400));
    } else {
      console.log('  body:', (rawBody || '').slice(0, 800));
    }

    const headers = await req.allHeaders().catch(() => ({}));
    const entry = {
      _at: new Date().toISOString(), method, url: u, isGraphql,
      operationName: op, variables: vars, query,
      rawBody: isGraphql ? null : rawBody,
      requestHeaders: headers, response: null,
    };
    captured.push(entry); writeOut();

    try {
      const resp = await req.response();
      if (resp) {
        const respBody = await resp.json().catch(() => null);
        entry.response = respBody; writeOut();
        if (respBody?.errors) console.log(`  ✘`, JSON.stringify(respBody.errors).slice(0, 300));
        else if (respBody?.data) console.log(`  ✓ keys: ${Object.keys(respBody.data).join(', ')}`);
      }
    } catch {}
  });

  // Go directly to start form editor
  const url = `https://app.pipefy.com/pipes/${ARGS.pipe_id}/settings/start-form`;
  console.log(`→ goto ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn(page);
  await page.waitForLoadState('networkidle').catch(() => {});

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SNIFF MODE — connector settings discovery');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Target field: ${ARGS.field_id || 'contatos_do_deal_1'}`);
  console.log('  1. Find the target connector field in the Start Form');
  console.log('  2. Click the gear/settings icon to edit it');
  console.log('  3. Configure any UI-only option you want captured, e.g.:');
  console.log('     a) "Filtros" / "Cards filter" (filter by related field)');
  console.log('     b) "Campos sincronizados" / "Sync fields" (pre-fill on create)');
  console.log('     c) any other connector-specific setting');
  console.log('  4. Save each config — separate mutation fires per save');
  console.log('  5. All captured mutations saved to:', OUT);
  console.log('  6. Close the browser when done\n');

  await new Promise((resolve) => {
    page.on('close', resolve);
    ctx.on('close', resolve);
  });

  console.log(`\n✓ ${captured.length} requests captured → ${OUT}`);
});
