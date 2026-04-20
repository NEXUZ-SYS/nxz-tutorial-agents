// Create a ClickUp automation end-to-end via the converged-ai builder (English UI, 2026-04).
// Shape of CLICKUP_ARGS:
// {
//   "list_url": "...",
//   "name": "Alert X",
//   "status_id": "qualificado",            // used as dropdown text match
//   "time_in_status": "48h",                // raw value string
//   "comment_body": "@Carol Oliveira ..."   // plain text; @mention typed literally
// }
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

const SETTLE = 1500;
const SHORT = 500;

async function dumpAndDie(page, step, err) {
  await page.screenshot({ path: `/tmp/fail-${step}.png`, fullPage: false });
  const body = await page.evaluate(() => {
    const b = document.querySelector('[data-test="edit-automation__container-body"]');
    return b ? b.innerText.slice(0, 1000) : 'NO_BODY';
  });
  console.log(`FAIL at step=${step} err=${err.message}`);
  console.log(`BODY:`, body);
  throw err;
}

async function clickByDt(page, dt, description) {
  await page.waitForSelector(`[data-test="${dt}"]`, { timeout: 10000 });
  await page.click(`[data-test="${dt}"]`);
}

test('create-automation-v2', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  // Open builder
  try {
    await page.click('[data-test="automation-converged-ai-task-button__button"]');
    await page.waitForTimeout(SETTLE);
    if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
      const m = await page.$('button.converged-ai-task-manage-button');
      if (m) { await m.click(); await page.waitForTimeout(SETTLE); }
    }
    await page.waitForSelector('[data-test="automation-tab-manage__add-automation-top-button"]', { timeout: 15000 });
    await page.click('[data-test="automation-tab-manage__add-automation-top-button"]');
    await page.waitForTimeout(3000);
  } catch (e) { await dumpAndDie(page, 'open-builder', e); }

  // Trigger → Schedule
  try {
    await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
    await page.waitForTimeout(SHORT);
    await clickByDt(page, 'dropdown-list-item__schedule', 'schedule');
    await page.waitForTimeout(SETTLE);
  } catch (e) { await dumpAndDie(page, 'trigger-schedule', e); }

  // Add condition 1: Status
  try {
    await page.locator('button[aria-label=" Add Condition"]').first().click();
    await page.waitForTimeout(SETTLE);
    let fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
    // last-but-one = the new row's field selector
    await fieldBtns[fieldBtns.length - 2].click();
    await page.waitForTimeout(SHORT);
    await clickByDt(page, 'dropdown-list-item__status', 'Status field');
    await page.waitForTimeout(SETTLE);
    await page.screenshot({ path: '/tmp/v2-after-status-picked.png' });

    // Now find the status value picker — typically the last row has a value button like "Select status"
    // Click "Any Status" button to open status value picker
    await page.locator('button:has-text("Any Status")').first().click();
    await page.waitForTimeout(SETTLE);
    await page.screenshot({ path: '/tmp/v2-status-picker.png' });

    // Dump the status picker overlay
    const statusOptions = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.cdk-overlay-pane [data-test], .cdk-overlay-pane button, .cdk-overlay-pane [role="option"]'))
        .map(e => ({ tag: e.tagName.toLowerCase(), dt: e.getAttribute('data-test')||'', text: (e.innerText||'').trim().slice(0,50) }))
        .filter(e => e.text.length > 0 && e.text.length < 60)
        .slice(0, 40);
    });
    console.log('STATUS_OPTS:', JSON.stringify(statusOptions, null, 2));
  } catch (e) { await dumpAndDie(page, 'cond-1-status', e); }

  // Pause to inspect
  await page.waitForTimeout(5000);
  await ctx.close();
});
