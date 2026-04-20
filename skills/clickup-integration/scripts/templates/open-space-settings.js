const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('open-space-settings', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  // Scroll gear into view inside sidebar then click via JS
  await page.evaluate(() => {
    const el = document.querySelector('div[aria-label=" Space settings"]');
    if (el) { el.scrollIntoView({ block: 'center' }); el.click(); }
  });
  await page.waitForTimeout(2500);

  // Dump menu items
  const items = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('.cdk-overlay-pane [role="menuitem"], .cdk-overlay-pane cu-dropdown-list-item, .cdk-overlay-pane button, .cdk-overlay-pane a'));
    return els.slice(0, 40).map(e => ({ dt: e.getAttribute('data-test')||'', text: (e.innerText||'').trim().slice(0,60) })).filter(x => x.text);
  });
  console.log('MENU_ITEMS:', JSON.stringify(items, null, 2));

  // Try to click "ClickApps"
  const ca = await page.$('text=/ClickApps/i');
  if (ca) {
    console.log('Clicking ClickApps...');
    await ca.click();
    await page.waitForTimeout(5000);
    console.log('URL after ClickApps click:', page.url());
    await page.screenshot({ path: '/tmp/space-clickapps.png', fullPage: true });
    const tis = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('*')).filter(e => {
        const t = (e.innerText||'').trim();
        return /^Time in Status/i.test(t) && t.length < 500 && e.children.length < 20;
      });
      return rows.slice(0,3).map(r => ({ text: r.innerText.slice(0,300), html: r.outerHTML.slice(0,1500) }));
    });
    console.log('TIS_DETAIL:', JSON.stringify(tis, null, 2));
  } else {
    console.log('No ClickApps menu item found');
  }

  await page.waitForTimeout(15000);
  await ctx.close();
});
