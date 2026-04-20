// Attempts to create an email automation with guessed schema. Reports full server response.
const { test, chromium } = require('@playwright/test');
const crypto = require('crypto');
const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;
test.setTimeout(120000);

test('try-email', async () => {
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

  const blockId = 'block-' + crypto.randomBytes(6).toString('hex');

  // Test a bunch of trigger type variants — minimal payload with known-working comment action
  const TRIGGER_GUESSES = [
    'status_change', 'statusChange', 'taskStatusChanged', 'status', 'statusUpdated',
    'taskStatusChange', 'statusChanged', 'task_status_changed', 'taskUpdated',
    'taskCreated', 'task_created', 'fieldUpdated', 'custom_field_updated',
  ];
  const commentBlocks = [
    { text: '@Carol Oliveira test', attributes: {} },
    { text: '\n', attributes: { 'block-id': blockId } },
  ];
  const attempts = TRIGGER_GUESSES.map(t => ({
    label: `trigger=${t}`,
    payload: {
      active: true,
      trigger: {
        type: t, resource: 'task',
        conditions: [
          { field: 'status', op: 'any', value: [{ status_id: 'sc901712879969_ynl0jYlh', label: 'agendamento' }] },
        ],
        input: {},
      },
      actions: [{
        id: crypto.randomUUID(), type: 'comment', resource: 'task',
        input: { comment: commentBlocks, dynamic_mentions: [] },
        mapped_input: {}, interpolated_input: { assignee_cf_ids: [], comment: commentBlocks },
      }],
      isSuggestedField: false,
    },
  }));

  const out = await page.evaluate(async ({ jwt, csrf, workspaceId, listId, attempts }) => {
    const headers = { authorization: `Bearer ${jwt}`, 'x-csrf': csrf, 'x-workspace-id': workspaceId, 'content-type': 'application/json' };
    const results = [];
    for (const a of attempts) {
      if (!a.payload) continue;
      try {
        const r = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/subcategory/${listId}/workflow`, {
          method: 'POST', headers, credentials: 'include', body: JSON.stringify(a.payload),
        });
        const text = await r.text();
        results.push({ label: a.label, status: r.status, body: text.slice(0, 2000) });
        // if created, cleanup
        try {
          const parsed = JSON.parse(text);
          if (parsed.id) {
            const del = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/workflow/${parsed.id}`, { method: 'DELETE', headers, credentials: 'include' });
            results[results.length - 1].deleted = del.status;
          }
        } catch {}
      } catch (e) { results.push({ label: a.label, error: String(e) }); }
    }
    return results;
  }, { jwt, csrf, workspaceId: '3086998', listId: '901712879969', attempts });

  console.log(JSON.stringify(out, null, 2));
  await ctx.close();
});
