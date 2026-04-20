// Captures POST/PUT requests to ClickUp automation endpoints with full body.
// Opens the list, waits for the user to manually create 1 automation, then dumps captured payloads.
const { test, chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
const OUT_FILE = ARGS.out_file || '/tmp/clickup-sniff-create.json';
const WAIT_MS = ARGS.wait_ms || 300000; // 5 min default

test.setTimeout(WAIT_MS + 60000);

test('sniff-automation-create', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  const hits = [];
  page.on('request', req => {
    const u = req.url();
    const m = req.method();
    if (!/automation|workflow|schedule/i.test(u)) return;
    if (!/POST|PUT|PATCH/i.test(m)) return;
    let body = null;
    try { body = req.postData(); } catch {}
    hits.push({
      method: m,
      url: u,
      headers: req.headers(),
      body,
      ts: new Date().toISOString(),
    });
    console.log(`[HIT] ${m} ${u}`);
  });

  page.on('response', async res => {
    const u = res.url();
    if (!/automation\/workflow|automation\/filters/i.test(u)) return;
    if (res.request().method() === 'GET') return;
    try {
      const body = await res.text();
      const match = hits.find(h => h.url === u && !h.responseBody);
      if (match) {
        match.status = res.status();
        match.responseBody = body.slice(0, 4000);
      }
    } catch {}
  });

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  console.log('\n>>> Página aberta. Crie 1 automação manualmente no browser agora.');
  console.log('>>> Clique Automatizar → Gerenciar → + Adicionar automação → configure → Criar.');
  console.log(`>>> Aguardando ${WAIT_MS/1000}s ou feche o browser para encerrar.\n`);

  // Wait for either timeout or browser close
  const start = Date.now();
  try {
    while (Date.now() - start < WAIT_MS) {
      await page.waitForTimeout(2000);
      if (page.isClosed()) break;
    }
  } catch {}

  fs.writeFileSync(OUT_FILE, JSON.stringify(hits, null, 2));
  console.log(`\n>>> Capturados ${hits.length} requests. Salvo em ${OUT_FILE}`);
  for (const h of hits) {
    console.log(`\n--- ${h.method} ${h.url}`);
    if (h.body) console.log(`BODY: ${h.body.slice(0, 800)}`);
    if (h.responseBody) console.log(`RESP(${h.status}): ${h.responseBody.slice(0, 400)}`);
  }
  try { await ctx.close(); } catch {}
});
