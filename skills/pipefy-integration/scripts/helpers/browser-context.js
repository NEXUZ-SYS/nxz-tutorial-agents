// Shared helper for Playwright browser context.
//
// Centralizes the "how to open a Pipefy browser session" concern so templates
// don't each hardcode viewport/headless/profile options. Resolution order:
//   1. Skill defaults (this file)
//   2. config.env (exported vars: PIPEFY_BROWSER_HEADLESS, PIPEFY_BROWSER_WIDTH,
//      PIPEFY_BROWSER_HEIGHT, PIPEFY_BROWSER_DEVICE)
//   3. Project .env (loaded by run-playwright.sh; overrides above)
//   4. Template override (pass opts arg)
//
// Usage in a template:
//   const { launchPipefyContext } = require('../helpers/browser-context');
//   const { ctx, page } = await launchPipefyContext();           // defaults
//   const { ctx, page } = await launchPipefyContext({ device: 'Desktop Chrome HiDPI' });
//
// After use: await ctx.close();

const { chromium, devices } = require('@playwright/test');

const DEFAULTS = {
  headless: false,
  viewport: { width: 1400, height: 900 },
  device: null, // e.g. 'Desktop Chrome' — if set, overrides viewport with device preset
  profile: process.env.PIPEFY_BROWSER_PROFILE,
};

function readEnvDefaults() {
  const env = process.env;
  const out = {};
  if (env.PIPEFY_BROWSER_HEADLESS != null) {
    out.headless = env.PIPEFY_BROWSER_HEADLESS !== 'false' && env.PIPEFY_BROWSER_HEADLESS !== '0';
  }
  if (env.PIPEFY_BROWSER_WIDTH && env.PIPEFY_BROWSER_HEIGHT) {
    out.viewport = {
      width: parseInt(env.PIPEFY_BROWSER_WIDTH, 10),
      height: parseInt(env.PIPEFY_BROWSER_HEIGHT, 10),
    };
  }
  if (env.PIPEFY_BROWSER_DEVICE) out.device = env.PIPEFY_BROWSER_DEVICE;
  if (env.PIPEFY_BROWSER_PROFILE) out.profile = env.PIPEFY_BROWSER_PROFILE;
  return out;
}

async function launchPipefyContext(override = {}) {
  const opts = { ...DEFAULTS, ...readEnvDefaults(), ...override };
  if (!opts.profile) throw new Error('PIPEFY_BROWSER_PROFILE not set (check run-playwright.sh)');

  const launchOpts = { headless: opts.headless };
  if (opts.device) {
    Object.assign(launchOpts, devices[opts.device] || {});
  } else if (opts.viewport) {
    launchOpts.viewport = opts.viewport;
  }

  const ctx = await chromium.launchPersistentContext(opts.profile, launchOpts);
  const page = ctx.pages()[0] || (await ctx.newPage());
  return { ctx, page, resolved: opts };
}

async function ensureLoggedIn(page, { timeoutMs = 60_000 } = {}) {
  const url = page.url();
  const isLogin =
    url.includes('/login') || url.includes('/signin') || url.includes('/realms/');
  if (!isLogin) return;
  const email = process.env.PIPEFY_EMAIL;
  const password = process.env.PIPEFY_PASSWORD;
  if (!email || !password) {
    console.log('⏳ Manual login required — waiting up to 120s.');
    await page.waitForURL(
      (u) =>
        !u.toString().includes('/login') &&
        !u.toString().includes('/signin') &&
        !u.toString().includes('/realms/'),
      { timeout: 120_000 }
    );
    return;
  }
  console.log(`→ Auto-login as ${email} (2-step: email → Continue → password)...`);
  const emailInput = page.getByRole('textbox', { name: /email|username/i }).first();
  await emailInput.waitFor({ timeout: 15_000 });
  await emailInput.fill(email);
  await page.getByRole('button', { name: /^Continue$|Continuar/i }).first().click();
  const passInput = page.locator('input[type="password"]').first();
  await passInput.waitFor({ timeout: 15_000 });
  await passInput.fill(password);
  await page.getByRole('button', { name: /Log in|Sign in|Entrar/i }).first().click();
  await page.waitForURL(
    (u) =>
      !u.toString().includes('/login') &&
      !u.toString().includes('/signin') &&
      !u.toString().includes('/realms/'),
    { timeout: timeoutMs }
  );
}

module.exports = { launchPipefyContext, ensureLoggedIn, DEFAULTS };
