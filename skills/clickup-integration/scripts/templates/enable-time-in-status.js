// Enable the "Time in Status" ClickApp at Space level, then verify it's ON
// ARGS: { workspace_id, space_id }
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('enable-time-in-status', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();

  // Navigate to Space ClickApps settings
  const url = `https://app.clickup.com/${ARGS.workspace_id}/v/s/${ARGS.space_id}/settings/clickapps`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: '/tmp/clickapps.png' });

  // Search/scan for "Time in Status"
  const found = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'))
      .filter(e => /time in status/i.test(e.textContent || ''))
      .filter(e => (e.children.length === 0) || (e.innerText||'').length < 200)
      .slice(0, 10);
    return all.map(e => ({ tag: e.tagName.toLowerCase(), text: (e.innerText||'').trim().slice(0,120), cls: (e.className||'').toString().slice(0,80) }));
  });
  console.log('TIS_MATCHES:', JSON.stringify(found, null, 2));

  // Try to locate the card/row and its toggle
  const cardInfo = await page.evaluate(() => {
    // ClickApps typically have cards with title + toggle
    const cards = Array.from(document.querySelectorAll('[class*="click-app"], [class*="clickapp"], cu-click-app-card, cu-clickapp-card, [data-test*="clickapp"]'));
    const matches = cards.filter(c => /time in status/i.test(c.textContent || ''));
    return matches.slice(0, 3).map(c => ({
      cls: (c.className||'').toString().slice(0,100),
      text: (c.innerText||'').slice(0,200),
      html: c.outerHTML.slice(0, 2000),
    }));
  });
  console.log('CARDS:', JSON.stringify(cardInfo, null, 2));

  await page.waitForTimeout(10000);
  await ctx.close();
});
