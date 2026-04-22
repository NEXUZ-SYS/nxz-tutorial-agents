// Open a specific card and screenshot the UI (full page) so we can see
// exactly what fields render.
//
// ARGS JSON: { "pipe_id": "307117441", "card_id": "1339762897", "out_prefix": "/tmp/card-shot" }

const { test } = require('@playwright/test');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');

test.setTimeout(5 * 60_000);

test('screenshot-card', async () => {
  const pipeId = ARGS.pipe_id;
  const cardId = ARGS.card_id;
  const out = ARGS.out_prefix || '/tmp/card-shot';
  if (!pipeId || !cardId) throw new Error('pipe_id and card_id required');

  const { ctx, page } = await launchPipefyContext();
  const url = `https://app.pipefy.com/pipes/${pipeId}#cards/${cardId}`;
  console.log(`→ goto ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn(page);
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(3000); // let card drawer animate in

  // Try scrolling the card drawer/modal so we capture all fields
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${out}-viewport.png`, fullPage: false });
  await page.screenshot({ path: `${out}-fullpage.png`, fullPage: true });

  // Attempt to capture visible field labels for debugging
  const labels = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('[class*="field"], [class*="Field"], label'));
    return nodes.map(n => n.textContent?.trim()).filter(s => s && s.length > 0 && s.length < 100).slice(0, 80);
  });
  console.log('\n--- Visible "field-like" text on page ---');
  labels.forEach(l => console.log(`  "${l}"`));

  console.log(`\n✓ screenshots saved: ${out}-viewport.png and ${out}-fullpage.png`);
  await ctx.close();
});
