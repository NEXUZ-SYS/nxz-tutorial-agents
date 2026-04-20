// Minimal Playwright config for running ClickUp template scripts.
// Place at skill root or copy to project root if you want `npx playwright test` to find it automatically.

module.exports = {
  testDir: './scripts/templates',
  testMatch: /.*\.js$/,
  timeout: 120_000,
  expect: { timeout: 10_000 },
  workers: 1,             // never run concurrently — shared browser profile
  reporter: 'list',
  use: {
    headless: false,
    viewport: { width: 1400, height: 900 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};
