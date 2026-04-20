// Step through Automate dropdown to discover the current selectors
const { test, chromium } = require('@playwright/test');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

function dump(sel, tag) {
  return { sel, tag };
}

test('debug-flow', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  console.log('STEP 1: Click Automate');
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/after-automate.png' });

  const afterAutomate = await page.evaluate(() => {
    const dts = Array.from(document.querySelectorAll('[data-test]'))
      .filter(e => /automation|manage|adicionar|add-auto/i.test(e.getAttribute('data-test') || ''))
      .map(e => ({ dt: e.getAttribute('data-test'), tag: e.tagName.toLowerCase(), text: (e.innerText || '').trim().slice(0, 50), cls: (e.className||'').toString().slice(0,80) }));
    const buttons = Array.from(document.querySelectorAll('button, a, div[role="button"]'))
      .map(b => ({ text: (b.innerText || '').trim().slice(0,50), dt: b.getAttribute('data-test') || '', cls: (b.className||'').toString().slice(0,80) }))
      .filter(b => /manage|gerenciar|adicionar|create|criar automa|add automa/i.test(b.text) || /manage|automation/i.test(b.dt))
      .slice(0, 30);
    return { dts, buttons };
  });
  console.log('AFTER_AUTOMATE_DTs:', JSON.stringify(afterAutomate.dts, null, 2));
  console.log('AFTER_AUTOMATE_BUTTONS:', JSON.stringify(afterAutomate.buttons, null, 2));

  // Try clicking "Manage" button (converged-ai-task-manage-button)
  console.log('STEP 2: Click Manage');
  const hasManage = await page.$('button.converged-ai-task-manage-button');
  if (hasManage) {
    console.log('found manage button, clicking');
    await hasManage.click();
  } else {
    console.log('manage button NOT found by class; trying text');
    const byText = await page.getByRole('button', { name: /Manage|Gerenciar/i }).first();
    if (byText) await byText.click().catch(e => console.log('text click err', e.message));
  }
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/tmp/after-manage.png' });

  const afterManage = await page.evaluate(() => {
    const dts = Array.from(document.querySelectorAll('[data-test]'))
      .filter(e => /automation|manage|add-auto/i.test(e.getAttribute('data-test') || ''))
      .map(e => ({ dt: e.getAttribute('data-test'), tag: e.tagName.toLowerCase(), text: (e.innerText || '').trim().slice(0, 50) }));
    const buttons = Array.from(document.querySelectorAll('button, a, div[role="button"]'))
      .map(b => ({ text: (b.innerText || '').trim().slice(0,60), dt: b.getAttribute('data-test') || '' }))
      .filter(b => /add|adicionar|create|criar|novo|new/i.test(b.text))
      .slice(0, 20);
    return { dts: dts.slice(0,30), buttons };
  });
  console.log('AFTER_MANAGE_DTs:', JSON.stringify(afterManage.dts, null, 2));
  console.log('AFTER_MANAGE_BUTTONS:', JSON.stringify(afterManage.buttons, null, 2));

  await page.waitForTimeout(3000);
  await ctx.close();
});
