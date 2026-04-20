const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('inspect-auto-row', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForTimeout(2500);

  // Hover first row + dump its HTML + any revealed buttons
  const firstRowHTML = await page.evaluate(() => {
    const r = document.querySelector('[data-test="automation-tab-manage__item"]');
    return r ? r.outerHTML.slice(0, 3500) : 'NONE';
  });
  console.log('ROW_HTML:', firstRowHTML);

  // Hover
  const row = page.locator('[data-test="automation-tab-manage__item"]').first();
  await row.hover();
  await page.waitForTimeout(1000);
  const hoverBtns = await page.evaluate(() => {
    const r = document.querySelector('[data-test="automation-tab-manage__item"]');
    if (!r) return [];
    return Array.from(r.querySelectorAll('button,[role="button"],cu3-icon-button,[aria-label]')).map(b => ({ tag: b.tagName, al: b.getAttribute('aria-label')||'', dt: b.getAttribute('data-test')||'', text: (b.innerText||'').trim().slice(0,30), visible: b.offsetParent !== null }));
  });
  console.log('HOVER_BTNS:', JSON.stringify(hoverBtns, null, 2));

  // Right-click on row to see context menu
  await row.click({ button: 'right' });
  await page.waitForTimeout(1500);
  const menu = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cdk-overlay-pane [role="menuitem"], .cdk-overlay-pane cu-dropdown-list-item, .cdk-overlay-pane button')).slice(0, 20).map(e => ({ dt: e.getAttribute('data-test')||'', text: (e.innerText||'').trim().slice(0,40) }));
  });
  console.log('CTX_MENU:', JSON.stringify(menu, null, 2));
  await page.screenshot({ path: '/tmp/auto-row.png', fullPage: true });
  await page.waitForTimeout(3000);
  await ctx.close();
});
