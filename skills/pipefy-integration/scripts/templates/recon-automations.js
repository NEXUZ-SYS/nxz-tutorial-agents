// Passive recon: open pipe automations page, capture DOM + screenshots at each step.
// No manual interaction required — script does a scripted click-through.
//
// ARGS JSON: { "pipe_id": "307117441" }
// Output: /tmp/pipefy-recon-automations.json + /tmp/pipefy-recon-auto-step-{N}.png

const { test } = require('@playwright/test');
const fs = require('fs');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');
test.setTimeout(180_000);

test('recon-automations', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id required');

  const captured = [];
  const { ctx, page } = await launchPipefyContext();

  const snapshot = async (step) => {
    const path = `/tmp/pipefy-recon-auto-step-${step}.png`;
    await page.screenshot({ path, fullPage: true }).catch(() => {});
    const buttons = await page.locator('button').all();
    const buttonList = [];
    for (const b of buttons.slice(0, 60)) {
      const visible = await b.isVisible().catch(() => false);
      if (!visible) continue;
      const t = (await b.innerText().catch(() => '')).trim().slice(0, 50);
      const tid = await b.getAttribute('data-testid').catch(() => null);
      const aria = await b.getAttribute('aria-label').catch(() => null);
      if (t || tid || aria) buttonList.push({ t, tid, aria });
    }
    const headings = await page.locator('h1, h2, h3, h4').all();
    const headingList = [];
    for (const h of headings.slice(0, 30)) {
      if (!await h.isVisible().catch(() => false)) continue;
      const text = (await h.innerText().catch(() => '')).trim().slice(0, 80);
      if (text) headingList.push(text);
    }
    const inputs = await page.locator('input, textarea, select').all();
    const inputList = [];
    for (const i of inputs.slice(0, 30)) {
      if (!await i.isVisible().catch(() => false)) continue;
      const tag = await i.evaluate((el) => el.tagName);
      const name = await i.getAttribute('name').catch(() => null);
      const type = await i.getAttribute('type').catch(() => null);
      const placeholder = await i.getAttribute('placeholder').catch(() => null);
      const aria = await i.getAttribute('aria-label').catch(() => null);
      const tid = await i.getAttribute('data-testid').catch(() => null);
      inputList.push({ tag, name, type, placeholder, aria, tid });
    }
    captured.push({ step, url: page.url(), buttons: buttonList, headings: headingList, inputs: inputList });
    fs.writeFileSync('/tmp/pipefy-recon-automations.json', JSON.stringify({ captured }, null, 2));
    console.log(`  [step ${step}] screenshot=${path}  url=${page.url()}  btns=${buttonList.length}  inputs=${inputList.length}`);
  };

  // ──── Step 1: load pipe view + click Automações tab ────
  const url = `https://app.pipefy.com/pipes/${ARGS.pipe_id}`;
  console.log(`→ goto ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn(page);
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(3000);
  await snapshot(1);

  // Click Automations tab in the pipe view header
  console.log('→ click Automations tab');
  const autoTabSelectors = [
    '[data-testid="view-header-tab-automations"]',
    '[data-testid*="automation"]',
    'a:has-text("Automações")',
    'button:has-text("Automações")',
  ];
  for (const sel of autoTabSelectors) {
    const tab = page.locator(sel).first();
    if (await tab.isVisible().catch(() => false)) {
      console.log(`   clicking ${sel}`);
      await tab.click({ force: true });
      break;
    }
  }
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle').catch(() => {});
  await snapshot(2);

  // ──── Step 3: click "Nova automação" ────
  console.log('→ click Nova automação');
  const btnSelectors = [
    '[data-testid*="new-automation"]',
    '[data-testid*="create-automation"]',
    '[data-testid*="add-automation"]',
    'button:has-text("Nova automação")',
    'button:has-text("Criar automação")',
    'button:has-text("New automation")',
    'a:has-text("Nova automação")',
  ];
  let clicked = false;
  for (const sel of btnSelectors) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible().catch(() => false)) {
      console.log(`   using selector: ${sel}`);
      await btn.click({ force: true });
      clicked = true;
      break;
    }
  }
  if (!clicked) {
    console.log('   ⚠ no known selector matched — dumping visible buttons in snapshot');
  }
  await page.waitForTimeout(3000);
  await snapshot(2);

  // ──── Step 3: dump current state after builder opens ────
  await page.waitForTimeout(2000);
  await snapshot(3);

  // ──── Step 4: look for event type options ────
  console.log('→ scan for event type options (scheduler, sla, card_moved, etc.)');
  const eventHints = await page.locator('button, [role="button"], [role="option"], [role="menuitem"]').all();
  const eventTexts = [];
  for (const el of eventHints.slice(0, 80)) {
    if (!await el.isVisible().catch(() => false)) continue;
    const t = (await el.innerText().catch(() => '')).trim();
    if (t && t.length < 100) eventTexts.push(t);
  }
  captured.push({ step: 4, event_hints: eventTexts });
  fs.writeFileSync('/tmp/pipefy-recon-automations.json', JSON.stringify({ captured }, null, 2));
  console.log(`   found ${eventTexts.length} clickable texts`);

  await ctx.close();
  console.log(`\n✓ recon done — see /tmp/pipefy-recon-automations.json + /tmp/pipefy-recon-auto-step-*.png`);
});
