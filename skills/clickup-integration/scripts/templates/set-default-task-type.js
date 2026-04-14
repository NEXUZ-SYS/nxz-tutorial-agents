// Set the default task type for a List (e.g., "Deal", "Contact", "Account").
// This setting is UI-only — the API read returns null.
//
// CLICKUP_ARGS JSON shape:
// {
//   "list_name": "Leads & Deals",
//   "task_type": "Deal"
// }

const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
const WS = process.env.CLICKUP_WORKSPACE_ID;

test('set-default-task-type', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(`https://app.clickup.com/${WS}/home`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  // Find the List in sidebar by name and right-click
  const listLink = page.locator(`a:has-text("${ARGS.list_name}")`).first();
  await listLink.scrollIntoViewIfNeeded();
  await listLink.click({ button: 'right' });
  await page.waitForTimeout(600);

  // Open submenu "Tipo de tarefa padrão"
  await page.locator('text=Tipo de tarefa padrão').first().click();
  await page.waitForTimeout(400);

  // Pick the task type
  await page.locator(`text=${ARGS.task_type}`).first().click();
  await page.waitForTimeout(800);

  console.log(`default task type set: ${ARGS.list_name} → ${ARGS.task_type}`);
  await ctx.close();
});
