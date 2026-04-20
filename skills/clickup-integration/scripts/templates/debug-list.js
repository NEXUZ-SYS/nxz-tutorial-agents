// Debug: open a List URL and dump info about buttons/data-test attributes in the header area.
const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('debug-list', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  const url = page.url();
  console.log('CURRENT_URL:', url);
  const title = await page.title();
  console.log('TITLE:', title);

  await page.screenshot({ path: '/tmp/clickup-list.png', fullPage: false });
  console.log('SCREENSHOT: /tmp/clickup-list.png');

  const info = await page.evaluate(() => {
    const dts = Array.from(document.querySelectorAll('[data-test]'))
      .map(e => ({ dt: e.getAttribute('data-test'), tag: e.tagName.toLowerCase(), text: (e.innerText || '').trim().slice(0, 40) }))
      .filter(x => /autom/i.test(x.dt) || /Autom/i.test(x.text));
    const buttons = Array.from(document.querySelectorAll('button'))
      .map(b => ({ text: (b.innerText || '').trim(), aria: b.getAttribute('aria-label') || '', dt: b.getAttribute('data-test') || '', cls: b.className.slice(0,60) }))
      .filter(b => /autom/i.test(b.text + b.aria + b.dt))
      .slice(0, 20);
    return { dts: dts.slice(0, 30), buttons };
  });
  console.log('DATA_TEST_HITS:', JSON.stringify(info.dts, null, 2));
  console.log('BUTTON_HITS:', JSON.stringify(info.buttons, null, 2));

  await page.waitForTimeout(2000);
  await ctx.close();
});
