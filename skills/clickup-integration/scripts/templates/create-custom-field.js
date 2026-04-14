// Create a custom field on a List via the right panel UI.
//
// CLICKUP_ARGS JSON shape:
// {
//   "list_url": "https://app.clickup.com/3086998/v/l/6-901712879969-1",
//   "name": "CNPJ",
//   "type": "text",   // text | number | dropdown | checkbox | date | money | formula | people
//   "options": ["opt1","opt2"],   // only for dropdown
//   "required": false
// }

const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

const TYPE_LABELS = {
  text: 'Texto curto',
  number: 'Número',
  dropdown: 'Menu suspenso',
  checkbox: 'Caixa de seleção',
  date: 'Data',
  money: 'Dinheiro',
  formula: 'Fórmula',
  people: 'Pessoas',
};

test('create-custom-field', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  // Click + at the end of the column header row to open the field picker
  // Selector: [data-test="header-cell__add-column"] or similar; fall back to text
  const addBtn = await page.locator('[data-test*="add-column"], button[aria-label*="campo"]').first();
  await addBtn.click();
  await page.waitForTimeout(600);

  // Search the type in the picker
  const typeLabel = TYPE_LABELS[ARGS.type] || ARGS.type;
  await page.locator(`text=${typeLabel}`).first().click();
  await page.waitForTimeout(800);

  // Fill the name
  const nameInput = page.locator('input[placeholder*="Nome do campo"], input[placeholder*="Field name"]').first();
  await nameInput.click();
  await nameInput.fill(ARGS.name);

  // Dropdown options
  if (ARGS.type === 'dropdown' && ARGS.options) {
    for (const opt of ARGS.options) {
      const addOpt = page.locator('button:has-text("Adicionar opção"), [data-test="add-option"]').first();
      await addOpt.click();
      await page.waitForTimeout(200);
      await page.keyboard.type(opt, { delay: 15 });
      await page.keyboard.press('Enter');
    }
  }

  // Create button in the panel footer
  await page.locator('button:has-text("Criar"), [data-test="custom-field-create"]').first().click();
  await page.waitForTimeout(1500);

  console.log('custom field created:', ARGS.name, '(' + ARGS.type + ')');
  await ctx.close();
});
