// After Schedule trigger, click Add Condition and see options
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('debug-condition', async () => {
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

  // Click trigger dropdown → Every
  await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
  await page.waitForTimeout(1500);
  await page.click('[data-test="dropdown-list-item__schedule"]');
  await page.waitForTimeout(2000);

  // Inspect Add Condition button first
  const btnHtml = await page.evaluate(() => {
    const b = document.querySelector('button.cu-edit-automation__container-body-add[aria-label=" Add Condition"]');
    return b ? b.outerHTML.slice(0, 1000) : 'NOT_FOUND';
  });
  console.log('ADD_COND_HTML:', btnHtml);

  // Try multiple click strategies
  console.log('Try 1: Playwright click');
  await page.locator('button[aria-label=" Add Condition"]').first().click({ force: true });
  await page.waitForTimeout(1500);
  let ovCount = await page.evaluate(() => document.querySelectorAll('.cdk-overlay-pane').length);
  console.log('overlays after click 1:', ovCount);
  if (ovCount === 0) {
    console.log('Try 2: scrollIntoView + click');
    await page.evaluate(() => {
      const b = document.querySelector('button[aria-label=" Add Condition"]');
      if (b) b.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(500);
    await page.locator('button[aria-label=" Add Condition"]').first().click({ force: true });
    await page.waitForTimeout(1500);
    ovCount = await page.evaluate(() => document.querySelectorAll('.cdk-overlay-pane').length);
    console.log('overlays after click 2:', ovCount);
  }
  if (ovCount === 0) {
    console.log('Try 3: dispatch mousedown+mouseup+click');
    await page.evaluate(() => {
      const b = document.querySelector('button[aria-label=" Add Condition"]');
      if (!b) return;
      const rect = b.getBoundingClientRect();
      const opts = { bubbles: true, cancelable: true, view: window, clientX: rect.x + rect.width/2, clientY: rect.y + rect.height/2, button: 0 };
      b.dispatchEvent(new MouseEvent('pointerdown', opts));
      b.dispatchEvent(new MouseEvent('mousedown', opts));
      b.dispatchEvent(new MouseEvent('pointerup', opts));
      b.dispatchEvent(new MouseEvent('mouseup', opts));
      b.dispatchEvent(new MouseEvent('click', opts));
    });
    await page.waitForTimeout(1500);
    ovCount = await page.evaluate(() => document.querySelectorAll('.cdk-overlay-pane').length);
    console.log('overlays after click 3:', ovCount);
  }
  await page.screenshot({ path: '/tmp/condition-menu.png' });

  // Check if the body changed (e.g., a condition row added inline)
  const bodyText = await page.evaluate(() => {
    const b = document.querySelector('[data-test="edit-automation__container-body"]');
    return b ? b.innerText.slice(0, 1500) : 'no body';
  });
  console.log('BODY_AFTER_CLICK:', bodyText);

  const bodyDts = await page.evaluate(() => {
    const b = document.querySelector('[data-test="edit-automation__container-body"]');
    if (!b) return [];
    return Array.from(b.querySelectorAll('[data-test]'))
      .filter(e => /condit/i.test(e.getAttribute('data-test') || ''))
      .map(e => ({ dt: e.getAttribute('data-test'), text: (e.innerText||'').trim().slice(0,50) }));
  });
  console.log('CONDITION_DTs:', JSON.stringify(bodyDts, null, 2));

  // Also check aria-label variants for Add Condition button
  const addCondBtns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, div[role="button"]'))
      .filter(b => /condit/i.test((b.innerText||'') + (b.getAttribute('aria-label')||'')))
      .map(b => ({ text: (b.innerText||'').trim().slice(0,40), aria: b.getAttribute('aria-label')||'', dt: b.getAttribute('data-test')||'', cls: (b.className||'').toString().slice(0,60) }));
  });
  console.log('COND_BUTTONS:', JSON.stringify(addCondBtns, null, 2));

  await page.waitForTimeout(4000);
  await ctx.close();
});
