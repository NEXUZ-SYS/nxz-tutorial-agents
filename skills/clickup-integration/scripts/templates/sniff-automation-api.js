// Opens automation manage panel and logs all XHR/fetch URLs hitting ClickUp backends.
const { test, chromium } = require('@playwright/test');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test('sniff-automation-api', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  const hits = [];
  page.on('request', req => {
    const u = req.url();
    if (/automation|schedule/i.test(u)) hits.push({ method: req.method(), url: u, headers: req.headers() });
  });
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  await page.click('[data-test="automation-converged-ai-task-button__button"]');
  await page.waitForTimeout(1500);
  if (!(await page.$('[data-test="automation-tab-manage__add-automation-top-button"]'))) {
    const m = await page.$('button.converged-ai-task-manage-button');
    if (m) { await m.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForTimeout(4000);

  // Try a delete to capture DELETE URL
  const row = await page.evaluateHandle(() => {
    const rows = Array.from(document.querySelectorAll('[data-test="automation-tab-manage__item"]'));
    return rows.find(r => /schedule is due.*post comment/i.test(r.innerText || '')) || null;
  });
  const el = row.asElement();
  if (el) {
    await el.hover();
    await page.waitForTimeout(400);
    const del = await el.$('[data-test="automation-tab-manage__delete-button"] button');
    if (del) {
      await del.click();
      await page.waitForTimeout(1500);
      // Click confirm
      await page.locator('cu-modal button[cu3-destructive="true"]').first().click({ force: true }).catch(()=>{});
      await page.waitForTimeout(3000);
    }
  }

  console.log('HITS:', JSON.stringify(hits.map(h => ({ method: h.method, url: h.url })), null, 2));
  // Also dump auth-relevant headers from first hit
  if (hits.length) {
    const keys = Object.keys(hits[0].headers).filter(k => /auth|token|cookie|x-/i.test(k));
    console.log('AUTH_HEADERS_KEYS:', keys);
    // Show values of non-cookie auth headers
    for (const k of keys) {
      if (k !== 'cookie') console.log(`  ${k}: ${(hits[0].headers[k]||'').slice(0,60)}`);
    }
  }
  await ctx.close();
});
