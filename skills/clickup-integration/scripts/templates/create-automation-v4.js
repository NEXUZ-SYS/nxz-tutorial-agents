// Creates one ClickUp automation: Schedule(Daily) + Status + Time In Status > X + Add a comment mentioning user.
// ARGS: { list_url, name, status_text, time_str ("48h" | "7d" | "16d"), mention_name, comment_body }
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
const SETTLE = 1500, SHORT = 700;
const snap = async (p, n) => { try { await p.screenshot({ path: `/tmp/v4-${n}.png` }); } catch(_){} };

async function closeOverlay(page) {
  await page.evaluate(() => {
    const ov = document.querySelector('.cdk-overlay-backdrop-showing, .cdk-overlay-transparent-backdrop');
    if (ov) ov.click();
  });
  await page.waitForTimeout(500);
}

test('create-automation-v4', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(SETTLE);
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(SETTLE); }
  }
  await page.waitForSelector('[data-test="automation-tab-manage__add-automation-top-button"]', { timeout: 15000 });
  await page.click('[data-test="automation-tab-manage__add-automation-top-button"]');
  await page.waitForTimeout(3000);
  await snap(page, '1-opened');

  // Trigger: Schedule + Daily
  await page.locator('[data-test="edit-automation__when-dropdown"] button').first().click();
  await page.waitForTimeout(SHORT);
  await page.click('[data-test="dropdown-list-item__schedule"]');
  await page.waitForTimeout(SETTLE);
  const weekly = page.locator('button:has-text("Weekly")').first();
  if (await weekly.count()) {
    await weekly.click();
    await page.waitForTimeout(SHORT);
    await page.click('[data-test="dropdown-list__item-daily"]');
    await page.waitForTimeout(SETTLE);
  }
  await snap(page, '2-trigger-daily');

  // Condition 1: Status = <status_text>
  await page.locator('button[aria-label=" Add Condition"]').first().click();
  await page.waitForTimeout(SETTLE);
  let fbtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  await fbtns[fbtns.length - 2].click();
  await page.waitForTimeout(SHORT);
  await page.click('[data-test="dropdown-list-item__status"]');
  await page.waitForTimeout(SETTLE);

  const valBtns = await page.$$('[data-test="edit-automation-dropdown__button"]');
  await valBtns[valBtns.length - 1].click();
  await page.waitForTimeout(SETTLE);
  // Type in combo-box search to filter, then Playwright click on item with pointer events
  const statusSlug = (ARGS.status_text || '').toLowerCase();
  await page.keyboard.type(statusSlug, { delay: 40 });
  await page.waitForTimeout(900);
  // Debug: what items are visible?
  const itemsInfo = await page.evaluate((slug) => {
    const items = Array.from(document.querySelectorAll('cu3-combo-box-item'));
    return items.map(i => ({ slug: i.getAttribute('data-test-status'), cls: (i.className||'').slice(0,80), aria: i.getAttribute('aria-selected')||'', visible: i.offsetParent !== null }));
  }, statusSlug);
  console.log('STATUS_ITEMS:', JSON.stringify(itemsInfo));
  // Click the inner data-test element (status-list__<slug>) — the actual interactive menu-item div
  const innerItem = page.locator(`[data-test="status-list__${statusSlug}"]`).first();
  await innerItem.click({ force: true });
  await page.waitForTimeout(SETTLE);
  // Verify the row-button now shows the status name (not "Any Status")
  const currentRowText = await page.evaluate(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    const btns = Array.from(body.querySelectorAll('[data-test="edit-automation-dropdown__button"]'));
    return btns.map(b => (b.innerText||'').trim().slice(0,30));
  });
  console.log('ROW_BTNS_AFTER_STATUS:', JSON.stringify(currentRowText));
  await snap(page, '3-cond-status');

  // Condition 2: Time In Status > <time_str>
  await page.locator('button[aria-label=" Add Condition"]').first().click();
  await page.waitForTimeout(SETTLE);
  fbtns = await page.$$('[data-test="edit-automation-dropdown__condition-button"]');
  await fbtns[fbtns.length - 2].click();
  await page.waitForTimeout(SHORT);
  await page.click('[data-test="dropdown-list-item__time_in_status"]');
  await page.waitForTimeout(SETTLE);

  await page.locator('button:has-text("Select a time")').first().click();
  await page.waitForTimeout(SETTLE);

  // Fill popup input with "48h" format, fire input/change, then click Add
  const timeStr = ARGS.time_str || '48h';
  await page.evaluate((val) => {
    const pane = Array.from(document.querySelectorAll('.cdk-overlay-pane')).find(p => /cancel|add/i.test(p.innerText||''));
    const input = pane && pane.querySelector('input');
    if (input) {
      input.focus();
      const nv = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nv.call(input, String(val));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    }
  }, timeStr);
  await page.waitForTimeout(SHORT);
  await page.locator('.cdk-overlay-pane button:has-text("Add")').first().click({ force: true });
  await page.waitForTimeout(SETTLE);
  // Verify status condition still intact
  const afterTIS = await page.evaluate(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    return Array.from(body.querySelectorAll('[data-test="edit-automation-dropdown__button"]')).map(b => (b.innerText||'').trim().slice(0,30));
  });
  console.log('ROW_BTNS_AFTER_TIS:', JSON.stringify(afterTIS));
  await snap(page, '4-cond-tis');

  // Action: Add a comment
  await page.locator('[data-test="edit-automation-dropdown__action-button"]').first().click();
  await page.waitForTimeout(SETTLE);
  await page.click('[data-test="dropdown-list-item__comment"]');
  await page.waitForTimeout(SETTLE);
  await snap(page, '5-act-comment');

  // Fill Quill editor: focus + type @, wait autocomplete, arrow+enter to confirm, then type body
  const editor = page.locator('[data-test="comment-bar__editor-input"]').first();
  await editor.click();
  await page.waitForTimeout(500);
  if (ARGS.mention_name) {
    // Type @ and part of name to trigger autocomplete
    await page.keyboard.type('@' + ARGS.mention_name.split(' ')[0], { delay: 60 });
    await page.waitForTimeout(1500);
    await page.waitForTimeout(1200);
    // Dump visible items in mention dropdown panes
    const acDump = await page.evaluate(() => {
      const panes = Array.from(document.querySelectorAll('.cdk-overlay-pane'));
      const out = panes.map(p => ({ cls: (p.className||'').slice(0,60), text: (p.innerText||'').slice(0,400).replace(/\n/g,' | ') }));
      return out;
    });
    console.log('MENTION_PANES:', JSON.stringify(acDump, null, 2));
    // Click user item coordinates via full-name search
    const userBox = await page.evaluate((full) => {
      const all = Array.from(document.querySelectorAll('.cdk-overlay-pane *')).filter(e => {
        const t = (e.innerText||'').trim();
        return t && t.length < 80 && e.children.length < 6 && new RegExp(full, 'i').test(t) && !/assignee|watcher|triggerer|creator|people|tasks|docs|whiteboard|location|channel|members/i.test(t);
      });
      const target = all[0];
      if (!target) return null;
      target.scrollIntoView({ block: 'center' });
      const r = target.getBoundingClientRect();
      return { x: r.x + r.width/2, y: r.y + r.height/2, text: target.innerText.slice(0,60) };
    }, ARGS.mention_name);
    console.log('USER_BOX:', userBox);
    if (userBox) {
      await page.mouse.click(userBox.x, userBox.y);
      await page.waitForTimeout(SHORT);
    }
    await page.waitForTimeout(SHORT);
  }
  if (ARGS.comment_body) {
    await page.keyboard.type(' ' + ARGS.comment_body, { delay: 20 });
  }
  await page.waitForTimeout(SHORT);
  await snap(page, '6-comment-filled');

  // Final state check
  const finalState = await page.evaluate(() => {
    const body = document.querySelector('[data-test="edit-automation__container-body"]');
    return body ? body.innerText.replace(/\n+/g,' | ').slice(0, 800) : '';
  });
  console.log('FINAL_STATE:', finalState);
  // Find Create/Save button in footer
  const createBtn = page.locator('[data-test="edit-automation__create-footer-button"]').first();
  const createText = await createBtn.innerText().catch(()=>'');
  const createEnabled = await createBtn.isEnabled().catch(()=>false);
  console.log('CREATE_BTN:', { text: createText, enabled: createEnabled });
  await snap(page, '7-before-create');
  if (createEnabled) {
    await createBtn.click();
    await page.waitForTimeout(3000);
    await snap(page, '8-after-create');
    // Check for toast
    const toast = await page.evaluate(() => {
      const t = document.querySelector('[class*="toast"], [class*="snackbar"], [role="status"]');
      return t ? (t.innerText||'').slice(0,200) : '';
    });
    console.log('TOAST:', toast);
  } else {
    console.log('CREATE DISABLED — inspecting dialog state');
    const body = await page.evaluate(() => {
      const b = document.querySelector('[data-test="edit-automation__container-body"]');
      return b ? b.innerText.slice(0, 1500).replace(/\n+/g, ' | ') : 'NO_BODY';
    });
    console.log('BODY:', body);
  }

  await page.waitForTimeout(5000);
  await ctx.close();
});
