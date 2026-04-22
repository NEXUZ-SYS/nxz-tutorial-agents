// Bulk-apply `own_field_maps_attributes` (Pipefy "Campos sincronizados") to
// multiple connector phase_fields at once, via PUT /internal_api/settings/fields.
//
// Pattern: capture CSRF from logged-in session, loop through targets doing
// page.evaluate fetch calls. Same Rails-style replay used by bulk-create-automations.js.
//
// ARGS JSON example:
// {
//   "targets": [
//     {
//       "internal_id": "428533332",
//       "label": "Atividades do deal",
//       "description": "...",
//       "required": false,
//       "connected_pipe_id": "SWpeb0uP",
//       "own_field_maps": [
//         {"field_id": "428533322", "input_mode": "fixed_value", "value": "Planejada"},
//         {"field_id": "428533330", "input_mode": "copy_from", "value": "%{428488620}"}
//       ]
//     },
//     ...
//   ]
// }

const { test } = require('@playwright/test');
const fs = require('fs');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');
const OUT = '/tmp/pipefy-bulk-field-sync-result.json';

test.setTimeout(10 * 60_000);

test('bulk-apply-field-sync', async () => {
  if (!ARGS.targets || !Array.isArray(ARGS.targets) || !ARGS.targets.length) {
    throw new Error('ARGS.targets must be a non-empty array');
  }

  const { ctx, page } = await launchPipefyContext();
  const results = [];

  // Navigate to any pipe settings page to get authenticated + CSRF
  await page.goto('https://app.pipefy.com/pipes/307117441/settings/start-form', { waitUntil: 'domcontentloaded' });
  await ensureLoggedIn(page);
  await page.waitForLoadState('networkidle').catch(() => {});

  // Read CSRF token from meta tag
  const csrf = await page.evaluate(() => {
    const m = document.querySelector('meta[name="csrf-token"]');
    return m ? m.getAttribute('content') : null;
  });
  if (!csrf) throw new Error('Could not read CSRF token from page');
  console.log(`CSRF: ${csrf.slice(0, 20)}...`);

  for (const t of ARGS.targets) {
    console.log(`\n→ PUT /internal_api/settings/fields/${t.internal_id}  (${t.label || '?'})`);
    const payload = {
      data: {
        id: String(t.internal_id),
        type: "fields",
        attributes: {
          label: t.label,
          help: t.help || "",
          value: "",
          unique: false,
          required: !!t.required,
          card_synced: false,
          minimal_view: false,
          options: [],
          custom_validation: "",
          editable: true,
          can_create_connected_cards: t.can_create_connected_cards !== false,
          can_search_connected_cards: t.can_search_connected_cards !== false,
          can_connect_multiple_cards: t.can_connect_multiple_cards !== false,
          description: t.description || "",
          child_must_exist_to_finish_parent: false,
          own_field_maps_attributes: t.own_field_maps || [],
          all_children_must_be_done_to_move_parent: false,
          all_children_must_be_done_to_finish_parent: false,
          settings: {},
          autofill: "",
        },
        relationships: {
          connected_pipe: { data: { type: "connected_pipe", id: t.connected_pipe_id } },
          type: { data: { type: "field_type", name: "Connector" } },
        },
      },
    };

    const resp = await page.evaluate(async ({ url, token, body }) => {
      const r = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.api+json',
          'X-CSRF-Token': token,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(body),
      });
      let j = null;
      try { j = await r.json(); } catch {}
      return { status: r.status, ok: r.ok, body: j };
    }, {
      url: `https://app.pipefy.com/internal_api/settings/fields/${t.internal_id}`,
      token: csrf,
      body: payload,
    });

    const mark = resp.ok ? '✓' : '✘';
    console.log(`  ${mark} status=${resp.status}`);
    if (!resp.ok) console.log(`  body: ${JSON.stringify(resp.body).slice(0, 500)}`);
    results.push({ target: t, response_status: resp.status, ok: resp.ok });
  }

  fs.writeFileSync(OUT, JSON.stringify({ _at: new Date().toISOString(), results }, null, 2));
  console.log(`\nResults → ${OUT}`);
  const ok = results.filter(r => r.ok).length;
  console.log(`Summary: ${ok}/${results.length} succeeded`);
  await ctx.close();
});
