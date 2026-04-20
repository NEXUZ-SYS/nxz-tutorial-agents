// Open the builder, click the trigger slot, and dump dropdown options
const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

async function openBuilder(page) {
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  const addBtn = await page.$('[data-test="automation-tab-manage__add-automation-top-button"]');
  if (!addBtn) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.click('[data-test="automation-tab-manage__add-automation-top-button"]');
  await page.waitForTimeout(3000);
}

async function dumpMenu(page, label) {
  await page.screenshot({ path: `/tmp/menu-${label}.png` });
  const items = await page.evaluate(() => {
    // Menu items are usually in cdk-overlay-container or cu-menu
    const overlays = Array.from(document.querySelectorAll('.cdk-overlay-container [role="menu"], .cdk-overlay-container [role="menuitem"], .cdk-overlay-container [role="option"], .cdk-overlay-container .cu-dropdown-list-item, .cdk-overlay-container cu-dropdown-list-item, .cdk-overlay-container [data-test^="dropdown"]'));
    return overlays.map(e => ({
      tag: e.tagName.toLowerCase(),
      dt: e.getAttribute('data-test') || '',
      text: (e.innerText || '').trim().slice(0, 80),
      role: e.getAttribute('role') || '',
    })).slice(0, 40);
  });
  console.log(`MENU_${label}:`, JSON.stringify(items, null, 2));
}

test('debug-trigger', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await openBuilder(page);
  console.log('BUILDER OPEN');

  // Click the trigger when-dropdown
  const triggerBtn = page.locator('[data-test="edit-automation__when-dropdown"] button').first();
  await triggerBtn.click();
  await page.waitForTimeout(1500);
  await dumpMenu(page, 'trigger');

  // Look for schedule option
  const scheduleCandidates = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('.cdk-overlay-container *'))
      .filter(e => /schedul|every|time|date/i.test(e.textContent || ''))
      .filter(e => e.children.length === 0 || (e.innerText || '').length < 60)
      .slice(0, 20);
    return all.map(e => ({ tag: e.tagName.toLowerCase(), text: (e.innerText || '').trim().slice(0, 60), dt: e.getAttribute('data-test') || '', cls: (e.className||'').toString().slice(0,60) }));
  });
  console.log('SCHEDULE_CANDIDATES:', JSON.stringify(scheduleCandidates, null, 2));

  await page.waitForTimeout(5000);
  await ctx.close();
});
