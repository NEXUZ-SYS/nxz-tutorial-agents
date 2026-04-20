const { test, expect } = require('@playwright/test');

test('Pipefy login', async ({ page }) => {
  const profileDir = process.env.PIPEFY_BROWSER_PROFILE;
  const baseUrl = 'https://app.pipefy.com';

  await page.goto(`${baseUrl}/login`);
  await page.waitForLoadState('networkidle');

  // Check if already logged in
  const isLoggedIn = await page.locator('[data-testid="user-menu"]').isVisible().catch(() => false);
  if (isLoggedIn) {
    console.log('✅ Already logged in');
    return;
  }

  console.log('⏳ Waiting for manual login (60s timeout)...');
  console.log('   Please log in to Pipefy in the browser window.');

  // Wait for successful login (user menu appears)
  await page.waitForSelector('[data-testid="user-menu"], .sidebar-menu', { timeout: 60000 });
  console.log('✅ Login successful — session saved to browser profile');
});
