const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('debug-tis-with-schedule', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
  await page.evaluate(() => location.reload(true));
  await page.waitForTimeout(8000);

  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForSelector('[data-test="automation-tab-manage__add-automation-top-button"]', { timeout: 15000 });
  await page.click('[data-test="automation-tab-manage__add-automation-top-button"]');
  await page.waitForTimeout(3000);

  // Switch trigger to Schedule
  console.log('--- switching trigger to Schedule ---');
  await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
  await page.waitForTimeout(800);
  // Dump trigger options
  const triggers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cdk-overlay-pane cu-dropdown-list-item'))
      .map(e => ({ dt: e.getAttribute('data-test')||'', id: e.getAttribute('data-id')||'', text: (e.innerText||'').trim().slice(0,40), disabled: e.classList.contains('cu-dropdown-list-item_disabled') }))
      .slice(0, 30);
  });
  console.log('TRIGGERS:', JSON.stringify(triggers, null, 2));
  const hasSchedule = await page.$('[data-test="dropdown-list-item__schedule"]');
  if (hasSchedule) {
    await page.click('[data-test="dropdown-list-item__schedule"]');
  } else {
    // try by id attr
    const item = await page.$('cu-dropdown-list-item[data-id="schedule"]');
    if (item) await item.click();
  }
  await page.waitForTimeout(2500);

  // Add condition
  await page.locator('button[aria-label=" Add Condition"]').first().click();
  await page.waitForTimeout(1500);
  const fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  await fieldBtns[fieldBtns.length - 2].click();
  await page.waitForTimeout(1000);

  const items = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cdk-overlay-pane cu-dropdown-list-item'))
      .map(e => ({ id: e.getAttribute('data-id')||'', text: (e.innerText||'').trim().slice(0,30), disabled: e.classList.contains('cu-dropdown-list-item_disabled') }))
      .slice(0, 40);
  });
  console.log('COND_FIELDS_AFTER_SCHEDULE:', JSON.stringify(items, null, 2));

  await page.waitForTimeout(3000);
  await ctx.close();
});
