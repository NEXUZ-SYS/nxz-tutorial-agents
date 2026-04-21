// Probe Pipefy page for any auth tokens / CSRF meta / relevant cookies.
// ARGS JSON: { "pipe_id": "307117441" }
// OUTPUT: /tmp/pipefy-auth-probe.json

const { test } = require('@playwright/test');
const fs = require('fs');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');

test.setTimeout(120_000);

test('probe-pipefy-auth', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id required');
  const { ctx, page } = await launchPipefyContext();

  await page.goto(`https://app.pipefy.com/pipes/${ARGS.pipe_id}`, { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn(page);
  await page.waitForLoadState('networkidle').catch(() => {});

  // Probe page context
  const pageInfo = await page.evaluate(() => {
    const meta = {};
    document.querySelectorAll('meta').forEach(m => {
      const k = m.getAttribute('name') || m.getAttribute('property') || m.getAttribute('http-equiv');
      if (k) meta[k] = m.getAttribute('content');
    });
    const ls = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      const v = localStorage.getItem(k);
      ls[k] = v && v.length > 200 ? v.slice(0, 200) + '…' : v;
    }
    return { meta, ls_keys: Object.keys(ls), ls_sample: ls };
  });

  // Probe cookies
  const cookies = await ctx.cookies('https://app.pipefy.com');

  // Try a direct replay of a simple query via fetch (to see what works)
  const probeResult = await page.evaluate(async () => {
    const trial = async (endpoint, body, extraHeaders = {}) => {
      try {
        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...extraHeaders },
          credentials: 'include',
          body: JSON.stringify(body),
        });
        const txt = await r.text();
        return { status: r.status, body: txt.slice(0, 400) };
      } catch (e) { return { error: String(e) }; }
    };

    const simple = { query: '{ me { id email } }' };
    return {
      internal_api_no_extra: await trial('/internal_api', simple),
      internal_api_with_xrw: await trial('/internal_api', simple, { 'X-Requested-With': 'XMLHttpRequest' }),
      queries_endpoint: await trial('/queries', simple),
    };
  });

  fs.writeFileSync('/tmp/pipefy-auth-probe.json', JSON.stringify({
    meta: pageInfo.meta,
    ls_keys: pageInfo.ls_keys,
    ls_sample: pageInfo.ls_sample,
    cookie_names: cookies.map(c => c.name),
    probe: probeResult,
  }, null, 2));

  console.log('✓ probe saved to /tmp/pipefy-auth-probe.json');
  await ctx.close();
});
