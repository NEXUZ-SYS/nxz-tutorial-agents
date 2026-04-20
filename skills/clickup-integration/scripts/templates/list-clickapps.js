const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('list-clickapps', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  // Try alternate URL patterns for ClickApps
  const candidates = [
    `https://app.clickup.com/${ARGS.workspace_id}/settings/space/${ARGS.space_id}/clickapps`,
    `https://app.clickup.com/${ARGS.workspace_id}/settings/space/${ARGS.space_id}`,
    `https://app.clickup.com/${ARGS.workspace_id}/settings/clickapps`,
  ];
  for (const u of candidates) {
    console.log('TRYING:', u);
    await page.goto(u, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(6000);
    const txt = await page.evaluate(() => (document.body.innerText || '').slice(0, 200));
    console.log('  got:', page.url(), '| body:', txt.replace(/\n/g,' | ').slice(0,150));
    if (!/404|not found/i.test(txt) && txt.length > 20) { console.log('LANDED OK at', u); break; }
  }
  await page.waitForTimeout(3000);
  console.log('CURRENT_URL:', page.url());
  console.log('TITLE:', await page.title());
  const bodyText = await page.evaluate(() => (document.body.innerText || '').slice(0, 2000));
  console.log('BODY:', bodyText);
  await page.screenshot({ path: '/tmp/clickapps-full.png', fullPage: true });

  const apps = await page.evaluate(() => {
    // Try a few card selectors
    const results = [];
    const allTexts = Array.from(document.body.querySelectorAll('*'));
    // Find all elements that have a visible toggle/switch nearby
    const toggles = Array.from(document.querySelectorAll('cu-toggle-switch, cu3-toggle, input[type="checkbox"][role="switch"], [class*="toggle-switch"]'));
    toggles.forEach(t => {
      // Walk up to find a container with title text
      let cur = t;
      for (let i = 0; i < 5; i++) {
        cur = cur.parentElement;
        if (!cur) break;
        const txt = (cur.innerText || '').trim();
        if (txt.length > 10 && txt.length < 250) {
          const isOn = t.classList.contains('cu-toggle-switch_checked') ||
                       t.getAttribute('aria-checked') === 'true' ||
                       (t.querySelector && t.querySelector('[aria-checked="true"]')) ||
                       (t.querySelector && t.querySelector('input:checked'));
          results.push({ title: txt.split('\n')[0].slice(0,60), fullText: txt.slice(0, 200), on: !!isOn });
          break;
        }
      }
    });
    return results.slice(0, 50);
  });
  console.log('APPS:', JSON.stringify(apps, null, 2));

  // Also scan for "Time in Status" specifically
  const tis = await page.evaluate(() => {
    const matches = Array.from(document.querySelectorAll('*'))
      .filter(e => e.children.length === 0 && /time in status|time-in-status|tempo no status|tempo em status/i.test(e.textContent||''))
      .slice(0, 5);
    return matches.map(e => ({ text: (e.textContent||'').trim().slice(0,80), parent: (e.parentElement?.outerHTML||'').slice(0,800) }));
  });
  console.log('TIS_SEARCH:', JSON.stringify(tis, null, 2));

  await page.waitForTimeout(5000);
  await ctx.close();
});
