const { test, chromium } = require('@playwright/test');
const crypto = require('crypto');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
test.setTimeout(180000);

test('try-email-action', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false, viewport: { width: 1400, height: 900 } });
  const page = ctx.pages()[0] || await ctx.newPage();
  let jwt = null, csrf = '1';
  page.on('request', req => {
    const h = req.headers();
    if (!jwt && h.authorization?.startsWith('Bearer ') && /frontdoor-prod/.test(req.url())) {
      jwt = h.authorization.replace('Bearer ', ''); csrf = h['x-csrf'] || '1';
    }
  });
  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  for (let i = 0; i < 15 && !jwt; i++) await page.waitForTimeout(1000);
  if (!jwt) { await ctx.close(); throw new Error('no jwt'); }

  const ACTION_TYPES = ['email', 'sendEmail', 'send_email', 'post_email', 'emailSend', 'email_send', 'mail'];
  const attempts = ACTION_TYPES.map(t => ({
    label: `action=${t}`,
    payload: {
      active: true,
      trigger: { type: 'status', resource: 'task',
        conditions: [{ field: 'status', op: 'any', value: [{ status_id: 'sc901712879969_ynl0jYlh', label: 'agendamento' }] }],
        input: {},
      },
      actions: [{
        id: crypto.randomUUID(), type: t, resource: 'task',
        input: { to: ['walter@nexuz.com.br'], subject: 'test', body: 'test body' },
        mapped_input: {}, interpolated_input: {},
      }],
      isSuggestedField: false,
    },
  }));

  const out = await page.evaluate(async ({ jwt, csrf, workspaceId, listId, attempts }) => {
    const headers = { authorization: `Bearer ${jwt}`, 'x-csrf': csrf, 'x-workspace-id': workspaceId, 'content-type': 'application/json' };
    const results = [];
    for (const a of attempts) {
      const r = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/subcategory/${listId}/workflow`, {
        method: 'POST', headers, credentials: 'include', body: JSON.stringify(a.payload),
      });
      const text = await r.text();
      const short = text.slice(0, 300);
      results.push({ label: a.label, status: r.status, body: short });
      try {
        const p = JSON.parse(text);
        if (p.id) {
          await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/workflow/${p.id}`, { method: 'DELETE', headers, credentials: 'include' });
        }
      } catch {}
    }
    return results;
  }, { jwt, csrf, workspaceId: '3086998', listId: '901712879969', attempts });

  console.log(JSON.stringify(out, null, 2));
  await ctx.close();
});
