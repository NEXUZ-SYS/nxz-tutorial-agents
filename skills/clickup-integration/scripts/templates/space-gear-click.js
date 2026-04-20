const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('space-gear-click', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  // Find the gear's bounding box and click at its center with real mouse events
  const box = await page.evaluate(() => {
    const el = document.querySelector('div[aria-label=" Space settings"]');
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width/2, y: r.y + r.height/2, w: r.width, h: r.height };
  });
  console.log('GEAR_BOX:', box);
  if (!box) { await ctx.close(); return; }

  await page.mouse.move(box.x, box.y);
  await page.waitForTimeout(500);
  await page.mouse.down();
  await page.waitForTimeout(100);
  await page.mouse.up();
  await page.waitForTimeout(2500);

  const items = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('.cdk-overlay-pane *, [role="menu"] *, cu-menu *'));
    return els.filter(e => (e.innerText||'').trim() && e.children.length < 5)
      .slice(0, 40).map(e => ({ tag: e.tagName, text: (e.innerText||'').trim().slice(0,50) }));
  });
  console.log('MENU:', JSON.stringify(items, null, 2));
  await page.screenshot({ path: '/tmp/gear-menu.png', fullPage: true });

  await page.waitForTimeout(15000);
  await ctx.close();
});
