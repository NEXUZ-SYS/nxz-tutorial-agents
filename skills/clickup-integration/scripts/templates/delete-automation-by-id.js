const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
test.setTimeout(90000);
test('delete-automation', async () => {
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
  const out = await page.evaluate(async ({ jwt, csrf, workspaceId, ids }) => {
    const headers = { authorization: `Bearer ${jwt}`, 'x-csrf': csrf, 'x-workspace-id': workspaceId, 'content-type': 'application/json' };
    const r = {};
    for (const id of ids) {
      const res = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/workflow/${id}`, { method: 'DELETE', headers, credentials: 'include' });
      r[id] = res.status;
    }
    return r;
  }, { jwt, csrf, workspaceId: '3086998', ids: ARGS.ids });
  console.log(JSON.stringify(out, null, 2));
  await ctx.close();
});
