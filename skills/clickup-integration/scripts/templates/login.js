// First-run login. Opens ClickUp and waits up to 3 minutes for the user
// to authenticate manually. Session is then cached in the persistent profile.
//
// CLICKUP_ARGS JSON shape: {} (no args needed)

const { test, chromium } = require('@playwright/test');

const PROFILE = process.env.CLICKUP_PROFILE_DIR;
const WS = process.env.CLICKUP_WORKSPACE_ID;

test('login', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto(`https://app.clickup.com/${WS}/home`, { waitUntil: 'domcontentloaded' });

  // Wait up to 3 minutes for the user to authenticate. Done when the URL
  // no longer contains /login and the sidebar is rendered.
  for (let i = 0; i < 36; i++) {
    if (!page.url().includes('/login') && await page.$('nav[aria-label="Barra lateral"], nav[aria-label="Sidebar"]')) {
      console.log('logged in — session cached to', PROFILE);
      await ctx.close();
      return;
    }
    await page.waitForTimeout(5000);
  }
  throw new Error('timed out waiting for login');
});
