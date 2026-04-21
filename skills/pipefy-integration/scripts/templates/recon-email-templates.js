// Reconnaissance: sniff Pipefy's internal API for email template CRUD.
//
// Strategy:
//   1. Open pipe settings page.
//   2. Monitor ALL requests to api.pipefy.com/graphql (or internal endpoints).
//   3. Navigate UI to the Email Templates section.
//   4. Trigger a "create template" flow (filled with spec from args OR a safe probe).
//   5. Capture: URL, method, headers, body (payload), response.
//   6. Dump everything to stdout + write to /tmp/pipefy-recon-email-templates.json.
//
// ARGS JSON shape:
// {
//   "pipe_id": "307117441",           // REQUIRED
//   "probe": {                         // optional — if set, will attempt UI create
//     "name": "PROBE-ET-00",
//     "subject": "probe subject",
//     "body_html": "<p>probe body</p>",
//     "from_name": "Probe"
//   }
// }
//
// Output:
//   - stdout: summary of captured requests related to email templates
//   - /tmp/pipefy-recon-email-templates.json: full dump for analysis

const { test, chromium } = require('@playwright/test');
const fs = require('fs');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');
const PROFILE = process.env.PIPEFY_BROWSER_PROFILE;

test.setTimeout(240_000);

test('recon-email-templates', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id is required');

  const captured = [];
  const capturedResponses = new Map();
  const saveDump = (extra = {}) => {
    const dump = {
      pipe_id: ARGS.pipe_id,
      requests: captured,
      responses: Array.from(capturedResponses.entries()).map(([k, v]) => ({ key: k, ...v })),
      ...extra,
    };
    fs.writeFileSync('/tmp/pipefy-recon-email-templates.json', JSON.stringify(dump, null, 2));
  };

  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  // Log all requests to api.pipefy.com or /graphql or /internal
  page.on('request', (req) => {
    const url = req.url();
    const method = req.method();
    if (method === 'OPTIONS') return;
    const relevant = url.includes('api.pipefy.com') ||
                     url.includes('/internal') ||
                     url.includes('email') ||
                     url.includes('template') ||
                     (method !== 'GET' && url.includes('pipefy.com'));
    if (!relevant) return;

    const entry = {
      kind: 'request',
      ts: new Date().toISOString(),
      url,
      method,
      headers: req.headers(),
      postData: req.postData() || null,
    };
    captured.push(entry);
  });

  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (!url.includes('pipefy.com')) return;
      if (url.endsWith('.js') || url.endsWith('.css') || url.endsWith('.svg') || url.includes('/assets/')) return;
      let body = null;
      const ctype = res.headers()['content-type'] || '';
      if (ctype.includes('json')) {
        body = await res.text().catch(() => null);
      }
      capturedResponses.set(url + '|' + (res.request().postData() || ''), {
        status: res.status(),
        url,
        body: body ? body.slice(0, 10_000) : null,
      });
    } catch {}
  });

  const ensureLoggedIn = async () => {
    if (page.url().includes('/login') || page.url().includes('/signin') || page.url().includes('/realms/')) {
      const email = process.env.PIPEFY_EMAIL;
      const password = process.env.PIPEFY_PASSWORD;
      if (!email || !password) throw new Error('Session expired and no PIPEFY_EMAIL/PASSWORD in env.');
      console.log(`→ Auto-login as ${email} (2-step)`);
      const emailInput = page.getByRole('textbox', { name: /email|username/i }).first();
      await emailInput.waitFor({ timeout: 15_000 });
      await emailInput.fill(email);
      await page.getByRole('button', { name: /^Continue$|Continuar/i }).first().click();
      const passInput = page.locator('input[type="password"]').first();
      await passInput.waitFor({ timeout: 15_000 });
      await passInput.fill(password);
      await page.getByRole('button', { name: /Log in|Sign in|Entrar/i }).first().click();
      await page.waitForURL(
        (url) => !url.toString().includes('/login') && !url.toString().includes('/signin') && !url.toString().includes('/realms/'),
        { timeout: 60_000 },
      );
    }
  };

  // Step 1 — navigate to pipe (emails tab lives in pipe view header, not /settings)
  const pipeUrl = `https://app.pipefy.com/pipes/${ARGS.pipe_id}`;
  console.log(`→ Navigating to ${pipeUrl}`);
  await page.goto(pipeUrl, { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn();
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(2500);

  // Step 2 — click the "emails" tab via data-testid (found via prior recon)
  console.log('→ Clicking Emails tab (data-testid=view-header-tab-emails)...');
  const emailsTab = page.locator('[data-testid="view-header-tab-emails"]').first();
  await emailsTab.waitFor({ timeout: 15_000 });
  await emailsTab.scrollIntoViewIfNeeded().catch(() => {});
  await emailsTab.click({ force: true });
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle').catch(() => {});
  console.log(`  current url: ${page.url()}`);

  // Step 2.5 — click "Templates de email" to open the templates management UI
  console.log('→ Clicking "Templates de email" button...');
  const tplBtn = page.locator('[data-testid="email-templates-button"]').first();
  await tplBtn.waitFor({ timeout: 10_000 });
  await tplBtn.click({ force: true });
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle').catch(() => {});

  // Snapshot body text after opening the templates UI
  const bodyText = await page.locator('body').innerText().catch(() => '');
  fs.writeFileSync('/tmp/pipefy-recon-emails-body.txt', bodyText);
  console.log(`  body snapshot saved (${bodyText.length} chars)`);

  // Enumerate all visible buttons — helps identify the right CTA label
  const allButtons = await page.locator('button').all();
  const buttonLabels = [];
  for (const b of allButtons) {
    const visible = await b.isVisible().catch(() => false);
    if (!visible) continue;
    const text = (await b.innerText().catch(() => '')).trim();
    const testid = await b.getAttribute('data-testid').catch(() => null);
    const aria = await b.getAttribute('aria-label').catch(() => null);
    if (text || testid || aria) buttonLabels.push({ text: text.slice(0, 60), testid, aria });
  }
  console.log(`  visible buttons (${buttonLabels.length}):`);
  buttonLabels.slice(0, 40).forEach((b, i) => console.log(`    [${i}] ${JSON.stringify(b)}`));

  // Step 3 — if probe args given, try to create a template via UI
  if (ARGS.probe) {
    console.log('→ Attempting UI create with probe data...');
    // Look for "Add template" / "Novo template" / "New email" button
    const createCandidates = [
      page.locator('[data-testid*="new-email" i], [data-testid*="create-email" i], [data-testid*="new-template" i], [data-testid*="create-template" i]').first(),
      page.getByRole('button', { name: /Novo(?:\s+modelo)?|Criar(?:\s+modelo)?|New template|Create template|Adicionar modelo/i }).first(),
      page.getByRole('button', { name: /^(\+|Novo|Criar|Adicionar)/i }).first(),
    ];
    let createBtn = null;
    for (const c of createCandidates) {
      if (await c.isVisible().catch(() => false)) { createBtn = c; break; }
    }
    if (createBtn) {
      console.log('  → clicking create button');
      await createBtn.click({ force: true });
      await page.waitForTimeout(2000);
      const nameInput = page.getByRole('textbox', { name: /Nome|Name/i }).first();
      if (await nameInput.isVisible().catch(() => false)) await nameInput.fill(ARGS.probe.name);
      const subjInput = page.getByRole('textbox', { name: /Assunto|Subject/i }).first();
      if (await subjInput.isVisible().catch(() => false)) await subjInput.fill(ARGS.probe.subject);
      const fromInput = page.getByRole('textbox', { name: /Remetente|From/i }).first();
      if (await fromInput.isVisible().catch(() => false)) await fromInput.fill(ARGS.probe.from_name);
      // Body — likely CKEditor/iframe
      for (const frame of page.frames()) {
        const ed = frame.locator('[contenteditable="true"], .ck-content').first();
        if (await ed.isVisible().catch(() => false)) {
          await ed.click();
          await page.keyboard.type(ARGS.probe.body_html.replace(/<[^>]+>/g, ''), { delay: 2 });
          break;
        }
      }
      const saveBtn = page.getByRole('button', { name: /Salvar|Save|Criar(?!\s+modelo)|Create(?!\s+template)/i }).first();
      if (await saveBtn.isVisible().catch(() => false)) {
        console.log('  → clicking Save...');
        await saveBtn.click();
        await page.waitForTimeout(4000);
      }
    } else {
      console.log('  ⚠️ No create button visible — check button snapshot above');
    }
  }

  saveDump({ url_final: page.url(), button_labels: buttonLabels.slice(0, 80) });
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Captured ${captured.length} requests, ${capturedResponses.size} responses`);
  console.log('  Dump: /tmp/pipefy-recon-email-templates.json');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Print summary of non-GET requests (likely mutations)
  const mutations = captured.filter((c) => c.method !== 'GET' && c.method !== 'HEAD');
  console.log(`  Non-GET requests: ${mutations.length}`);
  mutations.forEach((m, i) => {
    console.log(`  [${i}] ${m.method} ${m.url}`);
    if (m.postData) {
      const preview = m.postData.slice(0, 400);
      console.log(`       body: ${preview}${m.postData.length > 400 ? '...' : ''}`);
    }
  });

  await ctx.close();
});
