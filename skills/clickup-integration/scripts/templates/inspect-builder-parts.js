// Inspect: status picker contents, schedule frequency options, action change picker
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('inspect-builder-parts', async () => {
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

  // Set schedule trigger
  await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
  await page.waitForTimeout(800);
  await page.click('[data-test="dropdown-list-item__schedule"]');
  await page.waitForTimeout(2000);

  // --- Inspect schedule frequency ---
  const schedButtons = await page.evaluate(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    return Array.from(body.querySelectorAll('button')).map(b => ({ text: (b.innerText||'').trim().slice(0,40), dt: b.getAttribute('data-test')||'' })).filter(x=>x.text);
  });
  console.log('SCHED_BUTTONS:', JSON.stringify(schedButtons, null, 2));

  // Click the "Weekly on ..." button to see frequency picker
  const weekly = await page.$('button:has-text("Weekly")');
  if (weekly) {
    await weekly.click();
    await page.waitForTimeout(1200);
    const freqItems = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.cdk-overlay-pane cu-dropdown-list-item')).map(e => ({ dt: e.getAttribute('data-test')||'', id: e.getAttribute('data-id')||'', text: (e.innerText||'').trim().slice(0,30) }));
    });
    console.log('FREQ_ITEMS:', JSON.stringify(freqItems, null, 2));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  // Add status condition + inspect the status picker items
  await page.locator('button[aria-label=" Add Condition"]').first().click();
  await page.waitForTimeout(1200);
  let fieldBtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  await fieldBtns[fieldBtns.length - 2].click();
  await page.waitForTimeout(800);
  await page.click('[data-test="dropdown-list-item__status"]');
  await page.waitForTimeout(1500);

  // Click the status-value button (e.g. "LIVE" or "Any Status")
  const statusValBtn = await page.$('[data-test="edit-automation-dropdown__button"]');
  const allButtons = await page.evaluate(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    return Array.from(body.querySelectorAll('button')).map(b => ({ text: (b.innerText||'').trim().slice(0,30), dt: b.getAttribute('data-test')||'' })).filter(x=>x.text);
  });
  console.log('AFTER_STATUS_COND:', JSON.stringify(allButtons, null, 2));

  // Open status-value picker via the button that is NOT the condition-button
  const valBtn = await page.evaluateHandle(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    // find button with short all-caps status text or "Any Status"
    const btns = Array.from(body.querySelectorAll('button[data-test="edit-automation-dropdown__button"]'));
    return btns[btns.length - 1];
  });
  if (valBtn) {
    await valBtn.asElement().click();
    await page.waitForTimeout(1500);
    const statusOpts = await page.evaluate(() => {
      const opts = Array.from(document.querySelectorAll('.cdk-overlay-pane cu-status-filter-option, .cdk-overlay-pane [data-test-id]'));
      return opts.slice(0, 40).map(e => ({ tag: e.tagName, testId: e.getAttribute('data-test-id')||e.getAttribute('data-test')||'', text: (e.innerText||'').trim().slice(0,40) }));
    });
    console.log('STATUS_OPTS:', JSON.stringify(statusOpts, null, 2));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  // --- Now inspect the action section ---
  const actionBtns = await page.$$('[data-test="edit-automation-dropdown__action-button"]');
  console.log('ACTION_BTN_COUNT:', actionBtns.length);
  if (actionBtns.length) {
    await actionBtns[0].click();
    await page.waitForTimeout(1500);
    const actions = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.cdk-overlay-pane cu-dropdown-list-item')).slice(0, 40).map(e => ({ dt: e.getAttribute('data-test')||'', id: e.getAttribute('data-id')||'', text: (e.innerText||'').trim().slice(0,40), disabled: e.classList.contains('cu-dropdown-list-item_disabled') }));
    });
    console.log('ACTIONS:', JSON.stringify(actions, null, 2));
    await page.keyboard.press('Escape');
  }

  // --- Try to find the name input and create button ---
  const topInfo = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input, textarea')).map(i => ({ ph: i.placeholder, type: i.type, name: i.name, dt: i.getAttribute('data-test')||'' }));
    const footerBtns = Array.from(document.querySelectorAll('button')).filter(b => /create|save|cancel|criar|salvar/i.test((b.innerText||''))).map(b => ({ text: (b.innerText||'').trim(), dt: b.getAttribute('data-test')||'' }));
    return { inputs: inputs.slice(0,30), footerBtns };
  });
  console.log('TOP_INFO:', JSON.stringify(topInfo, null, 2));

  await page.waitForTimeout(5000);
  await ctx.close();
});
