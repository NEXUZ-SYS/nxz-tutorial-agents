// Click trigger → Every → inspect sub-menu (Daily/Weekly)
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('debug-schedule', async () => {
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
  await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
  await page.waitForTimeout(1500);
  await page.click('[data-test="dropdown-list-item__schedule"]');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/after-schedule.png' });

  // Dump all data-test elements in the builder body + all buttons with visible text
  const info = await page.evaluate(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    if (!body) return { error: 'no body' };
    const dts = Array.from(body.querySelectorAll('[data-test]'))
      .map(e => ({ dt: e.getAttribute('data-test'), tag: e.tagName.toLowerCase(), text: (e.innerText || '').trim().slice(0, 60) }))
      .filter(e => e.text.length > 0 || /button|input|add|condition|repeat|daily|schedule|select/i.test(e.dt))
      .slice(0, 50);
    const addButtons = Array.from(body.querySelectorAll('button, div[role="button"], a'))
      .map(e => ({ text: (e.innerText || '').trim().slice(0, 60), dt: e.getAttribute('data-test') || '', aria: e.getAttribute('aria-label') || '' }))
      .filter(e => /add|condition|new|daily|weekly|repeat|every/i.test(e.text + e.dt + e.aria))
      .slice(0, 30);
    return { dts, addButtons };
  });
  console.log('BODY_DTs:', JSON.stringify(info.dts, null, 2));
  console.log('---');
  console.log('ADD_BUTTONS:', JSON.stringify(info.addButtons, null, 2));

  // Also check if the builder panel shows a day/time picker after schedule is selected
  const panelInfo = await page.evaluate(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    return body ? body.innerText.slice(0, 1500) : 'no body';
  });
  console.log('PANEL_TEXT:', panelInfo);

  await page.waitForTimeout(4000);
  await ctx.close();
});
