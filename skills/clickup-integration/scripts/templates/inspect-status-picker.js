const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('inspect-status-picker', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForSelector('[data-test="automation-tab-manage__add-automation-top-button"]', { timeout: 15000 });
  await page.click('[data-test="automation-tab-manage__add-automation-top-button"]');
  await page.waitForTimeout(3000);

  // Add status condition
  await page.locator('button[aria-label=" Add Condition"]').first().click();
  await page.waitForTimeout(1500);
  const fbtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  await fbtns[fbtns.length - 2].click();
  await page.waitForTimeout(800);
  await page.click('[data-test="dropdown-list-item__status"]');
  await page.waitForTimeout(1500);

  // Open status picker
  const valBtns = await page.$$('[data-test="edit-automation-dropdown__button"]');
  await valBtns[valBtns.length - 1].click();
  await page.waitForTimeout(1500);

  // Dump first combo-box-item HTML
  const item = await page.evaluate(() => {
    const el = document.querySelector('cu3-combo-box-item');
    if (!el) return 'NONE';
    return el.outerHTML.slice(0, 3000);
  });
  console.log('ITEM_HTML:', item);

  // Dump list container info
  const list = await page.evaluate(() => {
    const ov = document.querySelectorAll('.cdk-overlay-pane');
    const lastPane = ov[ov.length-1];
    if (!lastPane) return 'NO_PANE';
    return {
      cls: lastPane.className,
      inner: lastPane.outerHTML.slice(0, 2500),
    };
  });
  console.log('PANE:', JSON.stringify(list, null, 2).slice(0, 3000));

  await page.waitForTimeout(8000);
  await ctx.close();
});
