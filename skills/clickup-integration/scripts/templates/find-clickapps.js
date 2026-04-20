// Navigate Space settings via UI (click gear) to find ClickApps page URL and Time in Status toggle state.
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('find-clickapps', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();

  // Land on the list first
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Open sidebar and right-click on the Space "Vendas"
  // Use URL pattern known for Space Home
  await page.goto(`https://app.clickup.com/${ARGS.workspace_id}/v/s/${ARGS.space_id}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  console.log('SPACE URL:', page.url());

  // Try clicking Space settings gear — look for data-test selectors
  const gearSelectors = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-test*="settings"], [aria-label*="ettings"], [aria-label*="ClickApp"], [data-test*="clickapp"]'));
    return els.slice(0, 20).map(e => ({ dt: e.getAttribute('data-test')||'', al: e.getAttribute('aria-label')||'', tag: e.tagName, text: (e.innerText||'').trim().slice(0,40) }));
  });
  console.log('GEARS:', JSON.stringify(gearSelectors, null, 2));

  // Try ClickApps candidate URLs
  const candidates = [
    `https://app.clickup.com/${ARGS.workspace_id}/settings/clickapps/space/${ARGS.space_id}`,
    `https://app.clickup.com/${ARGS.workspace_id}/v/s/${ARGS.space_id}/settings`,
    `https://app.clickup.com/${ARGS.workspace_id}/spaces/${ARGS.space_id}/settings/clickapps`,
    `https://app.clickup.com/${ARGS.workspace_id}/settings/team/clickapps`,
    `https://app.clickup.com/${ARGS.workspace_id}/settings`,
  ];
  for (const u of candidates) {
    await page.goto(u, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000);
    const ok = await page.evaluate(() => {
      const txt = (document.body.innerText||'').slice(0, 400);
      const has = /Time in Status/i.test(document.body.innerText||'');
      return { url: location.href, title: document.title, hasTis: has, preview: txt.replace(/\n/g,' | ').slice(0,200) };
    });
    console.log('TRY', u, '->', JSON.stringify(ok));
    if (ok.hasTis) {
      console.log('FOUND Time in Status on', u);
      // Get toggle state
      const tis = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('*')).filter(e => {
          const t = (e.innerText||'').trim();
          return /^Time in Status/i.test(t) && t.length < 400 && e.children.length < 15;
        });
        return rows.slice(0, 3).map(r => ({
          text: (r.innerText||'').slice(0,300),
          html: r.outerHTML.slice(0, 1500),
        }));
      });
      console.log('TIS_DETAIL:', JSON.stringify(tis, null, 2));
      await page.screenshot({ path: '/tmp/clickapps-found.png', fullPage: true });
      break;
    }
  }

  await page.waitForTimeout(8000);
  await ctx.close();
});
