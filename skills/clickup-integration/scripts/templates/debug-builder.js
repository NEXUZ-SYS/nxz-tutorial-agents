// Open the automation builder and dump the structure to find selectors
const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('debug-builder', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  const addBtn = await page.$('[data-test="automation-tab-manage__add-automation-top-button"]');
  if (!addBtn) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.click('[data-test="automation-tab-manage__add-automation-top-button"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/tmp/builder.png' });

  const info = await page.evaluate(() => {
    const container = document.querySelector('.cu-edit-automation__container, [class*="edit-automation"]');
    const containerHtml = container ? container.outerHTML.slice(0, 6000) : 'NO_CONTAINER';
    const dts = Array.from(document.querySelectorAll('[data-test]'))
      .filter(e => /edit-auto|trigger|condition|action|when|then/i.test(e.getAttribute('data-test') || ''))
      .map(e => ({ dt: e.getAttribute('data-test'), tag: e.tagName.toLowerCase(), text: (e.innerText || '').trim().slice(0, 60) }))
      .slice(0, 40);
    const buttons = Array.from(document.querySelectorAll('button, div[role="button"]'))
      .map(b => ({ text: (b.innerText || '').trim().slice(0,80), dt: b.getAttribute('data-test') || '' }))
      .filter(b => b.text.length > 0 && b.text.length < 80)
      .slice(0, 40);
    return { containerHtml, dts, buttons };
  });
  console.log('DTs:', JSON.stringify(info.dts, null, 2));
  console.log('---BUTTONS---');
  console.log(JSON.stringify(info.buttons, null, 2));
  console.log('---CONTAINER_HTML (first 6000 chars)---');
  console.log(info.containerHtml);

  await page.waitForTimeout(5000);
  await ctx.close();
});
