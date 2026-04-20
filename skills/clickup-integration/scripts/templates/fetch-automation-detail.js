// Fetches the full JSON of existing automations via internal API.
// Authenticates by replaying headers from a captured request inside the page.
const { test, chromium } = require('@playwright/test');
const fs = require('fs');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
const OUT_FILE = ARGS.out_file || '/tmp/clickup-automation-detail.json';

test.setTimeout(180000);

test('fetch-automation-detail', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  // Capture JWT by waiting for an automation call to happen
  let jwt = null;
  let csrf = null;
  page.on('request', req => {
    const h = req.headers();
    if (!jwt && h.authorization && h.authorization.startsWith('Bearer ') && /automation|clickup/.test(req.url())) {
      jwt = h.authorization.replace('Bearer ', '');
      csrf = h['x-csrf'] || '1';
    }
  });

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  // Open Automate panel to trigger the list call
  try {
    await page.click('[data-test="automation-converged-ai-task-button__button"]', { timeout: 8000 });
    await page.waitForTimeout(1500);
    const manageBtn = await page.$('button.converged-ai-task-manage-button');
    if (manageBtn) { await manageBtn.click(); await page.waitForTimeout(2000); }
  } catch (e) { console.log('panel open failed:', e.message); }
  await page.waitForTimeout(3000);

  if (!jwt) {
    console.log('JWT not captured — aborting');
    await ctx.close();
    return;
  }
  console.log('JWT captured (first 30 chars):', jwt.slice(0, 30));

  const listId = ARGS.list_id || '901712879969';
  const workspaceId = ARGS.workspace_id || '3086998';
  const automationId = ARGS.automation_id;

  const results = await page.evaluate(async ({ jwt, csrf, workspaceId, listId, automationId }) => {
    const headers = {
      authorization: `Bearer ${jwt}`,
      'x-csrf': csrf,
      'x-workspace-id': workspaceId,
      'content-type': 'application/json',
    };
    const out = {};

    // Try direct GET on workflow id
    if (automationId) {
      try {
        const r = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/workflow/${automationId}`, {
          method: 'GET', headers, credentials: 'include',
        });
        out.getById = { status: r.status, body: await r.text() };
      } catch (e) { out.getByIdErr = String(e); }
    }

    // List all (no paging)
    try {
      const r = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/filters/subcategory/${listId}/workflow`, {
        method: 'POST', headers, credentials: 'include',
        body: JSON.stringify({ filters: { actionTypes: [], conditionTypes: [], triggerTypes: [], lastUpdatedBy: [], active: 'ALL' } }),
      });
      out.listAll = { status: r.status, body: await r.text() };
    } catch (e) { out.listAllErr = String(e); }

    return out;
  }, { jwt, csrf, workspaceId, listId, automationId });

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2));
  console.log(`Saved to ${OUT_FILE}`);
  console.log('getById status:', results.getById?.status);
  console.log('listAll status:', results.listAll?.status);
  if (results.getById?.body) console.log('getById body (first 2000):', results.getById.body.slice(0, 2000));

  await ctx.close();
});
