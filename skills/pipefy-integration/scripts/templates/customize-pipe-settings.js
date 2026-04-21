// Customize pipe UI-only settings that the GraphQL API doesn't support:
//   - create_card_label ("Texto do botão de criar cards")
//   - description (Pipe description / "Descrição do pipe")
//   - Public Form visibility/look (optional future extension)
//
// ARGS JSON shape (all fields optional; set only what you want to change):
// {
//   "pipe_id": "307117441",          // REQUIRED
//   "button_text": "Nova oportunidade",
//   "description": "**Pipe Vendas Nexuz** — ...\n\n📖 [Playbook](https://...)"
// }
//
// Strategy: navigate to /pipes/{id}/settings and update the relevant input fields.
// Uses text-based selectors (Pipefy UI labels in Portuguese) since data-testid coverage is uneven.
// First run requires manual login (browser opens, waits up to 120s for user to log in).
// Subsequent runs reuse the persistent profile.

const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');
const PROFILE = process.env.PIPEFY_BROWSER_PROFILE;

test.setTimeout(180_000);

test('customize-pipe-settings', async () => {
  if (!ARGS.pipe_id) {
    throw new Error('ARGS.pipe_id is required');
  }
  const wantButton = typeof ARGS.button_text === 'string';
  const wantDesc = typeof ARGS.description === 'string';
  if (!wantButton && !wantDesc) {
    throw new Error('Nothing to do — provide at least one of: button_text, description');
  }

  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  // Navigate to settings. Pipefy may redirect to login if session expired.
  const settingsUrl = `https://app.pipefy.com/pipes/${ARGS.pipe_id}/settings`;
  console.log(`→ Navigating to ${settingsUrl}`);
  await page.goto(settingsUrl, { waitUntil: 'domcontentloaded' });

  // If redirected to login, try auto-login with credentials from env
  if (page.url().includes('/login') || page.url().includes('/signin')) {
    const email = process.env.PIPEFY_EMAIL;
    const password = process.env.PIPEFY_PASSWORD;
    if (email && password) {
      console.log(`→ Auto-login as ${email} (2-step: email → Continue → password)...`);
      // STEP 1: email or username — Pipefy uses generic textbox with placeholder "email@company.com"
      const emailInput = page.getByRole('textbox', { name: /email|username/i }).first();
      await emailInput.waitFor({ timeout: 15_000 });
      await emailInput.fill(email);
      // STEP 2: click Continue
      const continueBtn = page.getByRole('button', { name: /^Continue$|Continuar/i }).first();
      await continueBtn.click();
      // STEP 3: password page loads — wait for password input
      const passInput = page.locator('input[type="password"]').first();
      await passInput.waitFor({ timeout: 15_000 });
      await passInput.fill(password);
      // STEP 4: submit
      const submitBtn = page.getByRole('button', { name: /Log in|Sign in|Entrar/i }).first();
      await submitBtn.click();
      // Wait for navigation away from login
      await page.waitForURL((url) => !url.toString().includes('/login') && !url.toString().includes('/signin') && !url.toString().includes('/realms/'),
        { timeout: 30_000 }).catch(async () => {
          console.log('⚠️  Auto-login did not complete in 30s (2FA/captcha?). Waiting 120s for manual resolution...');
          await page.waitForURL((url) => !url.toString().includes('/login') && !url.toString().includes('/signin') && !url.toString().includes('/realms/'),
            { timeout: 120_000 });
        });
      console.log('✅ Login successful. Re-navigating to settings...');
      await page.goto(settingsUrl, { waitUntil: 'domcontentloaded' });
    } else {
      console.log('⏳ No PIPEFY_EMAIL/PASSWORD in env. Log in manually — waiting up to 120s...');
      await page.waitForURL((url) => !url.toString().includes('/login') && !url.toString().includes('/signin'),
        { timeout: 120_000 });
      await page.goto(settingsUrl, { waitUntil: 'domcontentloaded' });
    }
  }

  // Give the SPA time to render the settings form
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(2000);

  // ===== Button text ("Texto do botão de criar cards") =====
  // Location: Settings drawer → Tab "Configurações do pipe" → textbox "Texto do botão de criar cards"
  if (wantButton) {
    console.log('→ Opening "Configurações do pipe" tab...');
    const configTab = page.getByRole('tab', { name: /Configurações do pipe/i }).first();
    await configTab.waitFor({ timeout: 15_000 });
    await configTab.click();
    await page.waitForTimeout(1500);

    console.log(`→ Setting button text to "${ARGS.button_text}"`);
    const input = page.getByRole('textbox', { name: /Texto do botão de criar cards/i }).first();
    await input.waitFor({ timeout: 10_000 });
    await input.click();
    await input.fill('');
    await input.type(ARGS.button_text, { delay: 20 });
    await input.blur().catch(() => {});
    // Auto-saves on blur — wait for debounce
    await page.waitForTimeout(1500);
    console.log('  ✓ button_text saved');
  }

  // ===== Pipe description =====
  // Location: Pipe header → button "Descrição do Pipe" (opens popover with rich-text-like textarea)
  // NOT inside the Settings drawer — separate UI surface.
  if (wantDesc) {
    console.log('→ Opening "Descrição do Pipe" popover...');
    // If settings drawer is open, close it first so the header button is clickable
    const closeDrawer = page.getByRole('button', { name: /Fechar/i }).first();
    if (await closeDrawer.isVisible().catch(() => false)) {
      await closeDrawer.click();
      await page.waitForTimeout(800);
    }
    const descBtn = page.getByRole('button', { name: /Descrição do Pipe/i }).first();
    await descBtn.waitFor({ timeout: 10_000 });
    await descBtn.click();
    await page.waitForTimeout(1500);

    console.log(`→ Setting pipe description (${ARGS.description.length} chars)`);
    // Pipefy uses CKEditor classic mode inside an iframe with the label
    // "Rich Text Area. Press ALT-0 for help.". We need frameLocator.
    // Try iframe first, then fallback to contenteditable outside iframe.
    let editor = null;
    const frames = page.frames();
    for (const frame of frames) {
      const candidate = frame.locator('[aria-label*="Rich Text"], .ck-content, [contenteditable="true"]').first();
      if (await candidate.isVisible().catch(() => false)) {
        editor = candidate;
        console.log(`  found editor in frame: ${frame.url() || '(inline)'}`);
        break;
      }
    }
    if (!editor) {
      // Last resort — try top-level
      const top = page.locator('[aria-label*="Rich Text"], .ck-content, [contenteditable="true"]').first();
      if (await top.isVisible().catch(() => false)) editor = top;
    }
    if (!editor) {
      throw new Error('Could not find Rich Text editor for pipe description. ' +
        'Pipefy uses CKEditor in an iframe — selector strategies did not match. ' +
        'SET DESCRIPTION MANUALLY: click "Descrição do Pipe" button in pipe header and paste the text.');
    }
    await editor.click();
    // Clear existing content
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.waitForTimeout(300);
    // Type description line by line (preserves newlines in CKEditor)
    const lines = ARGS.description.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) await page.keyboard.type(lines[i], { delay: 3 });
      if (i < lines.length - 1) await page.keyboard.press('Enter');
    }
    await page.waitForTimeout(500);

    const saveBtn = page.getByRole('button', { name: /Salvar|Save|Aplicar|Publicar/i }).first();
    if (await saveBtn.isVisible().catch(() => false)) {
      await saveBtn.click();
      await page.waitForTimeout(1500);
      console.log('  ✓ description saved');
    } else {
      console.log('  ⚠️ save button not found — check UI');
    }
  }

  // Each section saves itself (button_text: auto on blur; description: save button or blur)
  await ctx.close();
  console.log('✅ customize-pipe-settings completed');
});

// Helper — find input/textarea whose visible label matches any of the candidate strings.
async function findInputByLabelText(page, candidates, element = 'input') {
  for (const label of candidates) {
    // Attempt 1: <label>LABEL</label> followed by <input> in same block
    const byLabelFor = await page.locator(`label:has-text("${label}")`).first();
    if (await byLabelFor.count() > 0) {
      const htmlFor = await byLabelFor.getAttribute('for').catch(() => null);
      if (htmlFor) {
        const byId = page.locator(`#${htmlFor}`);
        if (await byId.count() > 0) return byId.first();
      }
      // fallback: find nearest following input/textarea
      const near = byLabelFor.locator(`xpath=following::${element}[1]`);
      if (await near.count() > 0) return near.first();
    }
    // Attempt 2: aria-label or placeholder match
    const byAria = page.locator(`${element}[aria-label*="${label}" i], ${element}[placeholder*="${label}" i]`);
    if (await byAria.count() > 0) return byAria.first();
  }
  return null;
}
