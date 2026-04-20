const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

async function checkTIS(page) {
  // Click first "Add Condition" if present, else open existing field dropdown
  const addBtn = await page.$('button[aria-label=" Add Condition"]');
  if (addBtn) { await addBtn.click(); await page.waitForTimeout(1500); }
  const fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  if (!fieldBtns.length) return { err: 'no field buttons' };
  await fieldBtns[fieldBtns.length - 2].click();
  await page.waitForTimeout(1000);
  const tis = await page.evaluate(() => {
    const el = document.querySelector('[data-test="dropdown-list__item-time_in_status"]');
    if (!el) return 'MISSING';
    return el.classList.contains('cu-dropdown-list-item_disabled') ? 'DISABLED' : 'ENABLED';
  });
  // Close dropdown
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  // Remove the condition we just added if we added one
  const removeBtns = await page.$$('[data-test="edit-automation-condition-row__remove-button"], button[aria-label*="Remove"]');
  if (removeBtns.length && addBtn) { try { await removeBtns[removeBtns.length-1].click(); await page.waitForTimeout(500); } catch(_){} }
  return tis;
}

test('debug-tis-multi-trigger', async () => {
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

  // Default trigger
  console.log('Default trigger (task_created?):', await checkTIS(page));

  // Iterate triggers
  const triggerIds = ['schedule', 'status_change', 'status_changes_to', 'status_changes_from', 'status_set', 'task_created', 'due_date_arrives'];
  for (const tid of triggerIds) {
    await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
    await page.waitForTimeout(800);
    const item = await page.$(`[data-test="dropdown-list-item__${tid}"]`);
    if (!item) {
      console.log(`Trigger ${tid}: NOT FOUND`);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      continue;
    }
    await item.click();
    await page.waitForTimeout(2000);
    const res = await checkTIS(page);
    console.log(`Trigger ${tid}: ${res}`);
  }

  // Also dump all trigger options for reference
  await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
  await page.waitForTimeout(800);
  const allTriggers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cdk-overlay-pane cu-dropdown-list-item'))
      .map(e => ({ id: e.getAttribute('data-id')||'', text: (e.innerText||'').trim().slice(0,40), disabled: e.classList.contains('cu-dropdown-list-item_disabled') }));
  });
  console.log('ALL_TRIGGERS:', JSON.stringify(allTriggers, null, 2));

  await page.waitForTimeout(3000);
  await ctx.close();
});
