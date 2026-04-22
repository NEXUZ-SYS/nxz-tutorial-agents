// Detailed screenshot: multiple URLs + scroll + HTML dump
// ARGS: { "pipe_id":"...", "card_id":"...", "out_prefix":"..." }

const { test } = require('@playwright/test');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');
test.setTimeout(5 * 60_000);

test('screenshot-card-detailed', async () => {
  const { ctx, page } = await launchPipefyContext();
  const out = ARGS.out_prefix || '/tmp/card-detail';

  // 1. Try full-page card URL (not hash)
  const url = `https://app.pipefy.com/pipes/${ARGS.pipe_id}#cards/${ARGS.card_id}`;
  console.log(`→ goto ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn(page);
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(4000);

  // Scroll all scrollable containers in the middle panel
  console.log('Trying to scroll middle panel content...');
  const scrolled = await page.evaluate(() => {
    const results = [];
    const sel = document.querySelectorAll('[class*="phase"], [class*="Phase"], [class*="fase"], [class*="current"], section, aside, main, div');
    let count = 0;
    for (const el of sel) {
      if (el.scrollHeight > el.clientHeight + 10 && el.clientHeight > 100) {
        const text = (el.textContent || '').slice(0, 100).trim();
        results.push({ tag: el.tagName, cls: el.className?.toString?.().slice(0,80), sh: el.scrollHeight, ch: el.clientHeight, text });
        el.scrollTop = el.scrollHeight;
        count++;
        if (count > 20) break;
      }
    }
    return results;
  });
  console.log('Scrollable elements detected:');
  scrolled.forEach(s => console.log(`  ${s.tag}.${s.cls}  sh=${s.sh} ch=${s.ch}  "${s.text}"`));

  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${out}-afterscroll.png`, fullPage: true });

  // 2. Inspect the phase panel specifically
  const phasePanel = await page.evaluate(() => {
    // Look for elements that mention "Fase atual" or "Novo Lead"
    const all = Array.from(document.querySelectorAll('*'));
    const matches = all.filter(el => {
      const t = (el.textContent || '').slice(0, 50);
      return t.includes('Fase atual') && el.children.length < 20;
    }).slice(0, 5);
    return matches.map(el => ({
      tag: el.tagName,
      cls: el.className?.toString?.().slice(0,100),
      text: (el.textContent || '').slice(0, 500),
      html: el.outerHTML.slice(0, 1500),
    }));
  });
  console.log('\n"Fase atual" matches:');
  phasePanel.forEach(p => {
    console.log(`  [${p.tag}.${p.cls}]`);
    console.log(`    text: ${p.text}`);
    console.log(`    html: ${p.html}`);
  });

  // 3. Full-page settings link for phase fields
  console.log('\n→ goto phase fields editor');
  await page.goto(`https://app.pipefy.com/pipe_settings/pipes/${ARGS.pipe_id}/phases/342928169/fields`, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${out}-phase-settings.png`, fullPage: true });

  console.log(`\n✓ shots: ${out}-afterscroll.png, ${out}-phase-settings.png`);
  await ctx.close();
});
