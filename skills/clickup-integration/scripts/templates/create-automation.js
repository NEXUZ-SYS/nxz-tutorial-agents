// Create a single automation on a List. Supports the time-in-status pattern
// (schedule trigger + status condition + time-in-status condition + comment action).
//
// CLICKUP_ARGS JSON shape:
// {
//   "list_id": "901712879969",
//   "list_url": "https://app.clickup.com/3086998/v/l/6-901712879969-1",
//   "name": "Alerta Qualificado >48h",
//   "trigger": { "type": "scheduled", "frequency": "Diariamente" },
//   "conditions": [
//     { "type": "Status", "value": "qualificado" },
//     { "type": "Time In Status", "operator": ">", "value": "48h" }
//   ],
//   "action": {
//     "type": "comment",
//     "body": "@Carol Oliveira Lead qualificado há >48h sem avanço.",
//     "mentions": ["Carol Oliveira"]
//   }
// }
//
// KNOWN LIMITATION (2026-04): ClickUp's "converged-ai" automation dialog often
// closes on portal-level clicks. This template uses native dispatchEvent with
// bubbles:true, longer settle delays, and checks the dialog is still mounted
// after each step. If it fails twice, the caller should switch to a manual guide.

const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

const SETTLE = 1200; // ms — converged-ai UI needs generous delays
const SHORT = 400;

async function safeClick(page, selector, description) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error('not found');
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }, selector).catch(() => {
    throw new Error(`safeClick failed on ${description} (${selector})`);
  });
}

async function ensureDialogMounted(page) {
  const mounted = await page.$('.cu-edit-automation__container, [class*="edit-automation"]');
  if (!mounted) throw new Error('automation dialog closed unexpectedly — likely converged-ai issue');
}

test('create-automation', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Open Automatizar → Gerenciar automações → + Adicionar automação
  await safeClick(page, '[data-test="automation-converged-ai-task-button__button"]', 'Automatizar');
  await page.waitForTimeout(SETTLE);
  await page.click('button.converged-ai-task-manage-button', { timeout: 5000 });
  await page.waitForTimeout(SETTLE);
  await safeClick(page, '[data-test="automation-tab-manage__add-automation-button"]', '+ Adicionar automação');
  await page.waitForTimeout(SETTLE);
  await ensureDialogMounted(page);

  // Trigger — scheduled / Daily
  if (ARGS.trigger.type === 'scheduled') {
    // Click the trigger slot
    const triggerSlot = await page.locator('button:has-text("Tarefa ou subtarefa criada"), button:has-text("Selecione um gatilho")').first();
    await triggerSlot.click();
    await page.waitForTimeout(SHORT);
    await page.click('[data-test="dropdown-list-item__schedule"]', { timeout: 5000 });
    await page.waitForTimeout(SHORT);
    await page.click(`[data-test="dropdown-list-item__${ARGS.trigger.frequency}"]`, { timeout: 5000 });
    await page.waitForTimeout(SHORT);
  }

  // Conditions
  for (const cond of ARGS.conditions || []) {
    await page.click('.cu-edit-automation__container-body-add[aria-label="Adicionar condição"]', { timeout: 5000 });
    await page.waitForTimeout(SHORT);
    await page.click(`[data-test="dropdown-list-item__${cond.type}"]`, { timeout: 5000 });
    await page.waitForTimeout(SETTLE);
    await ensureDialogMounted(page);

    if (cond.type === 'Status') {
      await page.click('[data-test="status-filter__toggle"]', { timeout: 5000 });
      await page.waitForTimeout(SHORT);
      await page.locator(`text=${cond.value}`).first().click();
      // Close the popover by clicking body
      await page.evaluate(() => document.body.click());
      await page.waitForTimeout(SHORT);
    } else if (cond.type === 'Time In Status') {
      const input = page.locator('input[placeholder*="48h"], input[placeholder*="2h"]').first();
      await input.click();
      await input.fill(cond.value);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(SHORT);
    }
  }

  // Action — add comment
  if (ARGS.action.type === 'comment') {
    const actionSlot = await page.locator('button:has-text("Selecione uma ação"), button:has-text("Então")').first();
    await actionSlot.click();
    await page.waitForTimeout(SHORT);
    await page.click('[data-test="dropdown-list-item__Adicionar um comentário"]', { timeout: 5000 });
    await page.waitForTimeout(SETTLE);

    // The comment editor is a contenteditable div inside [data-test="comment-bar__editor-input"]
    const editor = page.locator('[data-test="comment-bar__editor-input"] .ql-editor').first();
    await editor.click();
    await editor.fill(ARGS.action.body);
    await page.waitForTimeout(SHORT);
  }

  // Save
  await ensureDialogMounted(page);
  await safeClick(page, '[data-test="edit-automation__create-footer-button"]', 'Criar');
  await page.waitForTimeout(SETTLE * 2);

  console.log('automation created:', ARGS.name);
  await ctx.close();
});
