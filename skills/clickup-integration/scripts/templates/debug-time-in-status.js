const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('debug-time-in-status', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  // Hard reload to bypass cache
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

  // Keep default trigger (Task or subtask created) - do NOT change to schedule
  // Add condition
  await page.locator('button[aria-label=" Add Condition"]').first().click();
  await page.waitForTimeout(1500);

  // Open field dropdown
  const fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  await fieldBtns[fieldBtns.length - 2].click();
  await page.waitForTimeout(1000);

  // Dump all items + disabled state + tooltips
  const items = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cdk-overlay-pane cu-dropdown-list-item'))
      .map(e => ({
        dt: e.getAttribute('data-test') || '',
        id: e.getAttribute('data-id') || '',
        text: (e.innerText||'').trim().slice(0, 50),
        disabled: e.classList.contains('cu-dropdown-list-item_disabled'),
        cls: (e.className||'').toString().slice(0,100),
        tip: e.getAttribute('tippy-content') || e.getAttribute('title') || '',
      }))
      .slice(0, 40);
  });
  console.log('COND_FIELDS:', JSON.stringify(items, null, 2));

  // Inspect full HTML + tooltip of the disabled Time In Status item
  const tisHtml = await page.evaluate(() => {
    const el = document.querySelector('[data-test="dropdown-list__item-time_in_status"]');
    return el ? el.outerHTML.slice(0, 2500) : 'NOT_FOUND';
  });
  console.log('TIS_HTML:', tisHtml);

  // Hover to trigger tooltip
  const loc = page.locator('[data-test="dropdown-list__item-time_in_status"]').first();
  await loc.hover({ force: true });
  await page.waitForTimeout(2000);
  const tooltip = await page.evaluate(() => {
    const tips = Array.from(document.querySelectorAll('[class*="tippy"], [role="tooltip"], .cu-tooltip, .cdk-overlay-pane'));
    return tips.map(t => ({ cls: (t.className||'').toString().slice(0,80), text: (t.innerText||'').trim().slice(0,200) })).filter(t => t.text.length > 0);
  });
  console.log('TOOLTIPS:', JSON.stringify(tooltip, null, 2));

  await page.waitForTimeout(3000);
  await ctx.close();
});
