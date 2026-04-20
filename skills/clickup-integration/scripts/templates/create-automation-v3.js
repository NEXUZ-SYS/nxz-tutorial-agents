// Full end-to-end automation creation via the converged-ai builder.
// ARGS: { list_url, name, status_text (UPPERCASE like "QUALIFICADO"), time_in_status ("48h"), comment_body }
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

const SETTLE = 1500;
const SHORT = 600;

async function snap(page, name) {
  try { await page.screenshot({ path: `/tmp/v3-${name}.png` }); } catch(_) {}
}

async function step(label, fn, page) {
  console.log(`--- STEP: ${label} ---`);
  try {
    await fn();
    await snap(page, label);
  } catch (e) {
    await snap(page, `FAIL-${label}`);
    const body = await page.evaluate(() => {
      const b = document.querySelector('[data-test="edit-automation__container-body"]');
      return b ? b.innerText.slice(0, 1500).replace(/\n+/g, ' | ') : 'NO_BODY';
    }).catch(() => 'n/a');
    console.log(`FAIL step=${label} err=${e.message}`);
    console.log(`BODY:`, body);
    throw e;
  }
}

test('create-automation-v3', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  await step('open-builder', async () => {
    await page.click('[data-test="automation-converged-ai-task-button__button"]');
    await page.waitForTimeout(SETTLE);
    if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
      const m = await page.$('button.converged-ai-task-manage-button');
      if (m) { await m.click(); await page.waitForTimeout(SETTLE); }
    }
    await page.waitForSelector('[data-test="automation-tab-manage__add-automation-top-button"]', { timeout: 15000 });
    await page.click('[data-test="automation-tab-manage__add-automation-top-button"]');
    await page.waitForTimeout(3000);
  }, page);

  await step('trigger-schedule', async () => {
    await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
    await page.waitForTimeout(SHORT);
    await page.click('[data-test="dropdown-list-item__schedule"]');
    await page.waitForTimeout(SETTLE);
  }, page);

  await step('cond1-status-field', async () => {
    await page.locator('button[aria-label=" Add Condition"]').first().click();
    await page.waitForTimeout(SETTLE);
    const fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
    await fieldBtns[fieldBtns.length - 2].click();
    await page.waitForTimeout(SHORT);
    await page.click('[data-test="dropdown-list-item__status"]');
    await page.waitForTimeout(SETTLE);
  }, page);

  await step('cond1-status-value', async () => {
    // Click "Any Status" to open picker
    await page.locator('button:has-text("Any Status")').first().click();
    await page.waitForTimeout(SETTLE);
    // Pick by data-test-id (lowercase)
    const testId = ARGS.status_text.toLowerCase();
    await page.locator(`cu-status-filter-option[data-test-id="${testId}"]`).first().click({ force: true });
    await page.waitForTimeout(SHORT);
    // Close the picker by clicking outside / press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(SHORT);
  }, page);

  await step('cond2-time-field', async () => {
    await page.locator('button[aria-label=" Add Condition"]').first().click();
    await page.waitForTimeout(SETTLE);
    const fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
    // Last row's field button
    await fieldBtns[fieldBtns.length - 2].click();
    await page.waitForTimeout(SHORT);
    await page.click('[data-test="dropdown-list-item__time_in_status"]');
    await page.waitForTimeout(SETTLE);
  }, page);

  await step('cond2-time-value', async () => {
    // Dump DOM to find the time input
    const info = await page.evaluate(() => {
      const body = document.querySelector('[data-test="edit-automation__container-body"]');
      const inputs = Array.from(body.querySelectorAll('input')).map(i => ({ ph: i.placeholder, type: i.type, name: i.name, dt: i.getAttribute('data-test')||'' }));
      const btns = Array.from(body.querySelectorAll('button')).slice(-20).map(b => ({ text: (b.innerText||'').trim().slice(0,40), dt: b.getAttribute('data-test')||'' }));
      return { inputs, lastBtns: btns };
    });
    console.log('TIME_INPUT_INFO:', JSON.stringify(info, null, 2));
  }, page);

  // Pause to observe
  console.log('Pausing 20s for manual inspection...');
  await page.waitForTimeout(20000);

  await ctx.close();
});
