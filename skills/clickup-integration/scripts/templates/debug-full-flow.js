// Walk through the full automation builder flow, dumping state at each step.
// Does NOT save — keeps dialog open for inspection.
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

async function dumpOverlayMenu(page, label) {
  const items = await page.evaluate(() => {
    const overlay = document.querySelector('.cdk-overlay-pane, .cdk-overlay-container [role="menu"]');
    if (!overlay) return { found: false };
    const dtItems = Array.from(overlay.querySelectorAll('[data-test]'))
      .map(e => ({ dt: e.getAttribute('data-test'), tag: e.tagName.toLowerCase(), text: (e.innerText||'').trim().slice(0,50) }))
      .filter(e => e.text.length > 0 && e.text.length < 60)
      .slice(0, 30);
    return { found: true, items: dtItems };
  });
  console.log(`[${label}] OVERLAY:`, JSON.stringify(items, null, 2));
}

async function dumpBody(page, label) {
  const info = await page.evaluate(() => {
    const b = document.querySelector('[data-test="edit-automation__container-body"]');
    return b ? b.innerText.slice(0, 800) : 'NO_BODY';
  });
  console.log(`[${label}] BODY:`, info.replace(/\n+/g, ' | '));
}

test('full-flow', async () => {
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
  console.log('=== BUILDER OPEN ===');

  // STEP 1: Change trigger to Schedule
  await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
  await page.waitForTimeout(1000);
  await page.click('[data-test="dropdown-list-item__schedule"]');
  await page.waitForTimeout(2000);
  await dumpBody(page, 'after-schedule');
  await page.screenshot({ path: '/tmp/ff-1-schedule.png' });

  // STEP 2: Add first condition
  await page.locator('button[aria-label=" Add Condition"]').first().click();
  await page.waitForTimeout(1500);
  await dumpBody(page, 'after-add-cond-1');

  // Click the FIRST field button of the newly added condition row (not an existing one)
  // Strategy: find all condition-button elements and click the LAST field (first in last row)
  // Better: count condition rows, target last row
  const condRowsInfo = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('cu-automation-condition, [data-test*="condition-row"], .cu-automation-condition'));
    return { count: rows.length, classes: rows.map(r => (r.className||'').toString().slice(0,80)) };
  });
  console.log('COND_ROWS:', JSON.stringify(condRowsInfo));

  // Find all condition field buttons, open LAST one's dropdown
  const fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  console.log('field-button count:', fieldBtns.length);
  if (fieldBtns.length >= 2) {
    // Last pair = new row; click the first of last pair (the FIELD selector)
    const fieldBtn = fieldBtns[fieldBtns.length - 2]; // field button, not operator button
    await fieldBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/ff-2-field-dropdown.png' });
    await dumpOverlayMenu(page, 'field-dropdown');
  }

  await page.waitForTimeout(8000);
  console.log('=== END (keeping open 8s) ===');
  await ctx.close();
});
