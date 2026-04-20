const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test.setTimeout(120000);

test('rename-and-list', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  let jwt = null, csrf = '1';
  page.on('request', req => {
    const h = req.headers();
    if (!jwt && h.authorization?.startsWith('Bearer ') && /frontdoor-prod/.test(req.url())) {
      jwt = h.authorization.replace('Bearer ', ''); csrf = h['x-csrf'] || '1';
    }
  });
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  for (let i = 0; i < 15 && !jwt; i++) await page.waitForTimeout(1000);
  if (!jwt) { console.log('no jwt'); await ctx.close(); throw new Error(); }

  const out = await page.evaluate(async ({ jwt, csrf, workspaceId, listId, renames }) => {
    const headers = { authorization: `Bearer ${jwt}`, 'x-csrf': csrf, 'x-workspace-id': workspaceId, 'content-type': 'application/json' };
    const results = {};
    for (const [id, name] of Object.entries(renames)) {
      const r = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/workflow/${id}`, {
        method: 'PUT', headers, credentials: 'include', body: JSON.stringify({ name }),
      });
      results[id] = { status: r.status };
    }
    // list all
    const lst = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/filters/subcategory/${listId}/workflow`, {
      method: 'POST', headers, credentials: 'include',
      body: JSON.stringify({ filters: { actionTypes: [], conditionTypes: [], triggerTypes: [], lastUpdatedBy: [], active: 'ALL' } }),
    });
    const body = await lst.json();
    const summary = (body.automations || []).map(a => ({
      id: a.id, name: a.name, active: a.active,
      trigger: a.trigger?.type,
      conditions: (a.trigger?.conditions || []).map(c => `${c.field} ${c.op} ${JSON.stringify(c.value).slice(0, 50)}`),
      action: a.actions?.[0]?.type,
    }));
    results.list = summary;
    return results;
  }, { jwt, csrf, workspaceId: '3086998', listId: '901712879969', renames: ARGS.renames || {} });

  console.log(JSON.stringify(out, null, 2));
  await ctx.close();
});
