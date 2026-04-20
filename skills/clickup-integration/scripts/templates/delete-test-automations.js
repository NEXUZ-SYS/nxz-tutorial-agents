// Deletes all automations matching "When schedule is due, then post comment" (test leftovers).
// KEEPS any automation with different trigger/action wording.
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('delete-test-automations', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForTimeout(2500);

  let deleted = 0;
  for (let i = 0; i < 20; i++) {
    // Find first row whose text contains "schedule is due, then post comment"
    const target = await page.evaluateHandle(() => {
      const rows = Array.from(document.querySelectorAll('[data-test="automation-tab-manage__item"]'));
      return rows.find(r => /schedule is due.*post comment/i.test(r.innerText || '')) || null;
    });
    const el = target.asElement();
    if (!el) { console.log('No more test rows to delete.'); break; }

    // Hover to reveal buttons
    await el.hover();
    await page.waitForTimeout(500);
    // Click delete button within this row
    const delBtn = await el.$('[data-test="automation-tab-manage__delete-button"] button');
    if (!delBtn) { console.log('Row has no delete btn; aborting.'); break; }
    await delBtn.click();
    await page.waitForTimeout(1500);
    // Neutralize pointer-blocking elements, then real mouse click on destructive btn
    await page.waitForSelector('cu-modal button[cu3-destructive="true"]', { timeout: 5000 });
    await page.evaluate(() => {
      document.querySelectorAll('cu-modal .cu-modal__inner, cu-modal .body, cu-modal .footer, cu-modal [data-test="modal__background"]').forEach(el => {
        el.style.pointerEvents = 'none';
      });
    });
    await page.waitForTimeout(200);
    const box = await page.evaluate(() => {
      const b = document.querySelector('cu-modal button[cu3-destructive="true"]');
      if (!b) return null;
      b.style.pointerEvents = 'auto';
      b.scrollIntoView({ block: 'center' });
      const r = b.getBoundingClientRect();
      return { x: r.x + r.width/2, y: r.y + r.height/2 };
    });
    if (!box) { console.log('No destructive btn'); break; }
    await page.mouse.move(box.x, box.y);
    await page.waitForTimeout(200);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.up();
    console.log('  confirmed mouse', box);
    // Wait for modal to disappear
    const gone = await page.waitForFunction(() => !document.querySelector('cu-modal'), { timeout: 8000 }).then(()=>true).catch(()=>false);
    if (!gone) {
      console.log('  modal still present, removing from DOM');
      await page.evaluate(() => {
        document.querySelectorAll('cu-modal').forEach(m => m.remove());
        document.querySelectorAll('.cdk-overlay-backdrop').forEach(b => b.remove());
      });
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1500);
    // Re-open manage panel if it closed
    if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
      console.log('  manage panel closed, reopening');
      await page.click('[data-test="automation-converged-ai-task-button__button"]');
      await page.waitForTimeout(1500);
      const m = await page.$('button.converged-ai-task-manage-button');
      if (m) { await m.click(); await page.waitForTimeout(1500); }
      await page.waitForTimeout(2000);
    }
    deleted++;
    console.log(`Deleted ${deleted}`);
  }
  console.log('TOTAL_DELETED:', deleted);

  // Final state
  const remaining = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-test="automation-tab-manage__item"]')).map(r => (r.innerText || '').trim().slice(0, 120).replace(/\n/g, ' | '));
  });
  console.log('REMAINING:', JSON.stringify(remaining, null, 2));
  await page.waitForTimeout(3000);
  await ctx.close();
});
