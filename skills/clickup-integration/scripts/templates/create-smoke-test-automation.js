// Creates a temporary smoke-test automation firing in ~5 min on qualificado status.
const { test, chromium } = require('@playwright/test');
const crypto = require('crypto');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test.setTimeout(120000);

test('create-smoke-test', async () => {
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
  if (!jwt) { console.log('no jwt'); await ctx.close(); throw new Error(); }

  const blockId = 'block-' + crypto.randomBytes(6).toString('hex');
  const commentBlocks = [
    { text: `@Carol Oliveira ${ARGS.comment_text}`, attributes: {} },
    { text: '\n', attributes: { 'block-id': blockId } },
  ];
  const payload = {
    active: true,
    trigger: {
      type: 'schedule',
      resource: 'task',
      conditions: [
        { field: 'status', op: 'any', value: [{ status_id: ARGS.status_id, label: ARGS.status_label }] },
        { field: 'time_in_status', op: 'gte', value: 0 },
      ],
      input: {
        trigger_on: 'ONSCHEDULE',
        options: {
          cron_expression: ARGS.cron,
          customWeekdays: ['sun'],
          start_at_in_ms: Date.now(),
          end_at_in_ms: null,
          timezone: 'America/Sao_Paulo',
          frequency: 'daily',
          intervals: null,
        },
      },
    },
    actions: [{
      id: crypto.randomUUID(),
      type: 'comment',
      resource: 'task',
      input: { comment: commentBlocks, dynamic_mentions: [] },
      mapped_input: {},
      interpolated_input: { assignee_cf_ids: [], comment: commentBlocks },
    }],
    isSuggestedField: false,
  };

  const out = await page.evaluate(async ({ jwt, csrf, workspaceId, listId, payload, name }) => {
    const headers = { authorization: `Bearer ${jwt}`, 'x-csrf': csrf, 'x-workspace-id': workspaceId, 'content-type': 'application/json' };
    const r = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/subcategory/${listId}/workflow`, {
      method: 'POST', headers, credentials: 'include', body: JSON.stringify(payload),
    });
    const body = await r.json();
    const id = body.id;
    const rn = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/workflow/${id}`, {
      method: 'PUT', headers, credentials: 'include', body: JSON.stringify({ name }),
    });
    return { id, status: r.status, rename: rn.status };
  }, { jwt, csrf, workspaceId: '3086998', listId: '901712879969', payload, name: ARGS.name });

  console.log(JSON.stringify(out, null, 2));
  await ctx.close();
});
