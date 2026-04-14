// Configure custom statuses on a Folder or List.
//
// CLICKUP_ARGS JSON shape:
// {
//   "target": "folder" | "list",
//   "id": "90178149765",
//   "statuses": [
//     {"name": "Backlog", "color": "Cinza", "type": "active"},
//     {"name": "Em progresso", "color": "Azul neon", "type": "active"},
//     {"name": "Concluído", "color": "Verde", "type": "done"}
//   ]
// }
//
// Strategy: navigate to the folder/list, hover its sidebar row to reveal the ellipsis,
// open Settings → Task statuses → "Usar status personalizados", then rename the defaults
// or add new ones. Finishes with the "Aplicar alterações" footer button.

const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
const WS = process.env.CLICKUP_WORKSPACE_ID;

test('configure-statuses', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(`https://app.clickup.com/${WS}/home`, { waitUntil: 'domcontentloaded' });
  // If redirected to login, bail with a clear message — user must log in once manually.
  if (page.url().includes('/login')) {
    throw new Error('not logged in — run the login template first');
  }

  // Resolve the sidebar row for the target. Uses ClickUp's stable data-test attrs.
  const rowSelector = ARGS.target === 'folder'
    ? `[data-test^="category-row__ellipsis-folder-name__"]`
    : `[data-test^="subcategory-row__ellipsis-name__"]`;

  // Hover the item to reveal the ellipsis, then click it.
  // Strategy: find by text match on the name label, then find the nearby ellipsis.
  // Works across both Folder and List levels.
  await page.waitForSelector(rowSelector, { timeout: 15000 });
  const ellipses = await page.$$(rowSelector);
  if (!ellipses.length) throw new Error(`no ${ARGS.target} ellipsis buttons found`);
  // Pick the one closest to the target name — ClickUp embeds the name in the data-test.
  const match = ellipses.find(async (el) => {
    const dt = await el.getAttribute('data-test');
    return dt && dt.includes(ARGS.name || '');
  });
  if (!match) throw new Error(`no row matching name: ${ARGS.name}`);
  await match.click();

  // Wait for the context menu and open Statuses
  await page.click('[data-test="nav-menu-item__task-statuses"]', { timeout: 5000 });
  await page.waitForTimeout(800);

  // Switch to custom statuses mode
  const customRadio = await page.$('input[type="radio"][value="custom"]')
    || await page.$('text=Usar status personalizados');
  if (customRadio) await customRadio.click();
  await page.waitForTimeout(400);

  // Apply each status spec
  for (const st of ARGS.statuses) {
    const container = st.type === 'done' ? 'done' : 'active';
    const addInput = await page.$(
      `[data-test="status-manager__statuses-container-${container}"] ` +
      `[data-test="status-manager__create-status-input"]`
    );
    if (!addInput) {
      // Assume existing slot — try to rename the first default in this section
      const existing = await page.$(
        `[data-test^="status-manager__status-item-"][data-test$="status-manager__status-item_input"]`
      );
      if (existing) {
        await existing.click();
        await page.keyboard.press('Control+a');
        await page.keyboard.type(st.name, { delay: 20 });
        await page.waitForTimeout(200);
      }
      continue;
    }
    await addInput.click();
    await page.keyboard.type(st.name, { delay: 20 });
    if (st.color) {
      const colorBtn = await page.$(`[data-test="color-picker-option__${st.color}"]`);
      if (colorBtn) await colorBtn.click();
    }
    const saveBtn = await page.$('[data-test="status-manager__create-status-save"]')
      || await page.locator('button:has-text("Salvar")').first();
    await saveBtn.click();
    await page.waitForTimeout(400);
  }

  // Apply all changes
  await page.click('[data-test="status-manager-footer__save"]', { timeout: 5000 });
  await page.waitForTimeout(1500);

  console.log('statuses configured:', ARGS.statuses.map(s => s.name).join(', '));
  await ctx.close();
});
