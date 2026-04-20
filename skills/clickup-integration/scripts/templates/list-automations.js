const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('list-automations', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  // If "Manage" not already open, click the manage footer link
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForTimeout(2500);
  const autos = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('[class*="automation-item"], cu-automation-item, [data-test*="automation-item"], [data-test*="manage"]'));
    return rows.filter(r => (r.innerText||'').trim().length > 10).slice(0,20).map(r => ({ cls: (r.className||'').toString().slice(0,60), text: (r.innerText||'').trim().slice(0,200).replace(/\n/g,' | '), dt: r.getAttribute('data-test')||'' }));
  });
  console.log('AUTOS:', JSON.stringify(autos, null, 2));
  await page.screenshot({ path: '/tmp/list-autos.png', fullPage: true });
  await page.waitForTimeout(3000);
  await ctx.close();
});
