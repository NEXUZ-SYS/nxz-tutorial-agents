// Creates automations via ClickUp internal API by replaying captured JWT.
// Uses POST /automation/subcategory/{listId}/workflow then PUT /automation/workflow/{id} to rename.
const { test, chromium } = require('@playwright/test');
const crypto = require('crypto');
const fs = require('fs');

const ARGS = JSON.parse(process.env.CLICKUP_ARGS || '{}');
const PROFILE = process.env.CLICKUP_PROFILE_DIR;

test.setTimeout(180000);

const uuid = () => crypto.randomUUID();

// 4 automations planned — #18 (qualificado/48h) already created manually; skip it if skip_existing.
const DEFS = [
  { name: 'Alerta Primeiro contato estagnado (>16d)',
    status_id: 'sc901712879969_u1xxLF8h', status_label: 'primeiro contato',
    threshold_ms: 16 * 24 * 3600 * 1000,
    comment: '@Carol Oliveira Lead em primeiro contato há >16 dias. Considerar mover para Nutrição ou marcar como Perdido.' },
  { name: 'Alerta Apresentação sem follow-up (>48h)',
    status_id: 'sc901712879969_HcLjvORP', status_label: 'apresentação',
    threshold_ms: 48 * 3600 * 1000,
    comment: '@Carol Oliveira Apresentação agendada há >48h sem atualização. Confirmar realização e próximos passos.' },
  { name: 'Alerta Proposta sem retorno (>7d)',
    status_id: 'sc901712879969_0OKn8SOg', status_label: 'proposta enviada',
    threshold_ms: 7 * 24 * 3600 * 1000,
    comment: '@Carol Oliveira Proposta enviada há >7 dias sem retorno. Fazer follow-up ativo.' },
];

function buildCreatePayload(def) {
  const blockId = 'block-' + crypto.randomBytes(6).toString('hex');
  const commentBlocks = [
    { text: def.comment, attributes: {} },
    { text: '\n', attributes: { 'block-id': blockId } },
  ];
  return {
    active: true,
    trigger: {
      type: 'schedule',
      resource: 'task',
      conditions: [
        { field: 'status', op: 'any', value: [{ status_id: def.status_id, label: def.status_label }] },
        { field: 'time_in_status', op: 'gte', value: def.threshold_ms },
      ],
      input: {
        trigger_on: 'ONSCHEDULE',
        options: {
          cron_expression: '0 9 * * *',
          customWeekdays: ['sun'],
          start_at_in_ms: 1776254400000,
          end_at_in_ms: null,
          timezone: 'America/Sao_Paulo',
          frequency: 'daily',
          intervals: null,
        },
      },
    },
    actions: [{
      id: uuid(),
      type: 'comment',
      resource: 'task',
      input: { comment: commentBlocks, dynamic_mentions: [] },
      mapped_input: {},
      interpolated_input: { assignee_cf_ids: [], comment: commentBlocks },
    }],
    isSuggestedField: false,
  };
}

test('api-create-automations', async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1400, height: 900 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  let jwt = null, csrf = '1';
  page.on('request', req => {
    const h = req.headers();
    if (!jwt && h.authorization?.startsWith('Bearer ') && /frontdoor-prod/.test(req.url())) {
      jwt = h.authorization.replace('Bearer ', '');
      csrf = h['x-csrf'] || '1';
    }
  });

  await page.goto(ARGS.list_url, { waitUntil: 'domcontentloaded' });
  // Trigger some network activity to capture JWT
  for (let i = 0; i < 15 && !jwt; i++) await page.waitForTimeout(1000);

  if (!jwt) {
    console.log('JWT not captured — bailing.');
    await ctx.close();
    throw new Error('no jwt');
  }
  console.log('JWT captured.');

  const listId = ARGS.list_id || '901712879969';
  const workspaceId = ARGS.workspace_id || '3086998';

  const results = await page.evaluate(async ({ jwt, csrf, workspaceId, listId, defs, payloadFn }) => {
    const headers = {
      authorization: `Bearer ${jwt}`,
      'x-csrf': csrf,
      'x-workspace-id': workspaceId,
      'content-type': 'application/json',
    };
    const out = [];
    for (const p of defs) {
      try {
        const r = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/subcategory/${listId}/workflow`, {
          method: 'POST', headers, credentials: 'include',
          body: JSON.stringify(p.payload),
        });
        const text = await r.text();
        let id = null, parsed = null;
        try { parsed = JSON.parse(text); id = parsed.id; } catch {}
        let renameResp = null;
        if (id) {
          const rn = await fetch(`https://frontdoor-prod-us-west-2-3.clickup.com/automation/workflow/${id}`, {
            method: 'PUT', headers, credentials: 'include',
            body: JSON.stringify({ name: p.name }),
          });
          renameResp = { status: rn.status, body: (await rn.text()).slice(0, 300) };
        }
        out.push({ name: p.name, createStatus: r.status, id, rename: renameResp, body: text.slice(0, 500) });
      } catch (e) {
        out.push({ name: p.name, error: String(e) });
      }
    }
    return out;
  }, {
    jwt, csrf, workspaceId, listId,
    defs: DEFS.map(d => ({ name: d.name, payload: buildCreatePayload(d) })),
  });

  console.log('\n=== RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync('/tmp/clickup-api-create-results.json', JSON.stringify(results, null, 2));
  await ctx.close();
});
