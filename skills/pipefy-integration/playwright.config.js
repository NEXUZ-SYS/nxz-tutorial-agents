// Playwright config for pipefy-integration skill templates.
// Usage: bash scripts/run-playwright.sh <template> '<args_json>'

const { devices } = require('@playwright/test');

module.exports = {
  testDir: './scripts/templates',
  testMatch: /.*\.js$/,
  timeout: 180_000,
  expect: { timeout: 10_000 },
  workers: 1,             // shared persistent browser profile — never concurrent
  reporter: 'list',
  use: {
    headless: false,
    viewport: { width: 1400, height: 900 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
};
