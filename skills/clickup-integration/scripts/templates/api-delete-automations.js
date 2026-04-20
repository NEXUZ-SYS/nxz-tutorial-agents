// Deletes automations via ClickUp internal API, called from within the authenticated page context.
// ARGS: { list_url, list_id, workspace_id, match_regex (default: "schedule is due.*post comment") }
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('api-delete-automations', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();

  // Capture auth headers AND the real list-call body from any automation request
  let authHeaders = null;
  let listBody = null;
  page.on('request', req => {
    const u = req.url();
    if (!authHeaders && /frontdoor.*\/automation\//.test(u)) {
      const h = req.headers();
      if (h.authorization) {
        authHeaders = {
          authorization: h.authorization,
          'x-csrf': h['x-csrf'] || '1',
          'x-workspace-id': h['x-workspace-id'] || String(ARGS.workspace_id || ''),
          'content-type': 'application/json',
        };
      }
    }
    if (!listBody && req.method() === 'POST' && /\/automation\/filters\/subcategory\/.*\/workflow/.test(u)) {
      try { listBody = req.postData(); } catch(_) {}
    }
  });

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  // Open automation panel to trigger API calls that leak auth headers
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(2000);
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForTimeout(3000);

  if (!authHeaders) { console.log('FAILED: no auth headers captured'); await ctx.close(); return; }
  console.log('AUTH captured:', authHeaders.authorization.slice(0, 30) + '...');
  console.log('LIST_BODY captured:', listBody ? listBody.slice(0, 400) : 'NONE');

  const listId = String(ARGS.list_id);
  const matchRe = new RegExp(ARGS.match_regex || 'schedule is due.*post comment', 'i');

  // Use page.evaluate to call API inside page (inherits cookies too)
  const result = await page.evaluate(async ({ listId, headers, reSource, reFlags, replayBody }) => {
    const re = new RegExp(reSource, reFlags);
    const BASE = 'https://frontdoor-prod-us-west-2-3.clickup.com';
    const body = replayBody ? JSON.parse(replayBody) : { filters: {} };
    // Try both URLs and dump full response
    const urlA = `${BASE}/automation/filters/subcategory/${listId}/workflow?paging=true`;
    const urlB = `${BASE}/automation/filters/subcategory/${listId}/workflow`;
    const resA = await fetch(urlA, { method: 'POST', headers, credentials: 'include', body: JSON.stringify(body) });
    const jA = await resA.json();
    const resB = await fetch(urlB, { method: 'POST', headers, credentials: 'include', body: JSON.stringify(body) });
    const jB = await resB.json();
    // Also try GET on /automation/subcategory/{listId}/workflow (common pattern)
    const resC = await fetch(`${BASE}/automation/subcategory/${listId}/workflow`, { method: 'GET', headers, credentials: 'include' });
    const jC = await resC.json().catch(()=>({ err: 'not json' }));
    console.log = (...a) => a;  // noop — we'll return
    const dump = { jA_keys: Object.keys(jA), jA_autos_len: (jA.automations||[]).length, jA_sample: JSON.stringify(jA).slice(0,2000), jB_autos_len: (jB.automations||[]).length, jC_status: resC.status, jC_keys: Object.keys(jC) };
    const all = (jA.automations || []).concat((jB.automations||[]).filter(b=>!(jA.automations||[]).find(a=>a.id===b.id)));
    const lastJson = jA;
    const deletions = [];
    const probes = [];
    for (const a of all) {
      const name = a.name || a.title || '';
      if (!re.test(name)) continue;
      const id = a.id;
      // Try several DELETE endpoints until one returns < 400
      const urls = [
        `${BASE}/automation/subcategory/${listId}/workflow/${id}`,
        `${BASE}/automation/workflow/${id}`,
        `${BASE}/automation/${id}`,
        `${BASE}/automation/parentType/6/parentId/${listId}/workflow/${id}`,
      ];
      let ok = null;
      const tried = [];
      for (const u of urls) {
        const r = await fetch(u, { method: 'DELETE', headers, credentials: 'include' });
        tried.push({ u: u.replace(BASE,''), s: r.status });
        if (r.status < 400) { ok = u; break; }
      }
      deletions.push({ id, name: name.slice(0,80), ok, tried });
      if (!probes.length) probes.push({ id, firstItemKeys: Object.keys(a) });
    }
    return { total: all.length, topKeys: lastJson ? Object.keys(lastJson) : [], deletions, probes, dump };
  }, { listId, headers: authHeaders, reSource: matchRe.source, reFlags: matchRe.flags, replayBody: listBody });

  console.log('RESULT:', JSON.stringify(result, null, 2));
  await ctx.close();
});
