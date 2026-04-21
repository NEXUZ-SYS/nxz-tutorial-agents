// Create Pipefy automation via UI builder (Playwright CLI).
// Used when the GraphQL API rejects the combo (scheduler, sla_based, card_moved,
// update_card_field action — see automations-api-gap-analysis.md).
//
// ARGS JSON:
// {
//   "pipe_id": "307117441",            // REQUIRED
//   "name": "A-04 — Cadência Qualif D+1",
//   "event": {
//     "type": "scheduler" | "sla_based" | "card_moved" | "card_left_phase" | "card_created" | "field_updated",
//     // scheduler specifics:
//     "frequency": "daily",            // daily|weekly|monthly
//     "cron_hour": "10", "cron_minute": "0", "cron_weekdays": "mon-fri",
//     "filter_phase_name": "Qualificação", "filter_days_in_phase": 1,
//     // card_moved / sla_based / card_left_phase specifics:
//     "phase_name": "Qualificação",    // target phase for card_moved/sla_based
//     "sla_kind": "late",              // for sla_based: late|expired
//     "sla_days": 8,
//     // field_updated specifics:
//     "field_labels": ["Desconto (%)"]
//   },
//   "action": {
//     "type": "send_email_template" | "update_card_field" | "send_http_request" | "send_a_task" | "move_single_card",
//     // send_email_template:
//     "email_template_name": "Qualificação D+1",
//     // update_card_field:
//     "field_label": "Data MQL", "field_value_mode": "current_datetime" | "fixed", "field_value": "...",
//     // send_http_request:
//     "url": "https://...", "method": "POST", "headers_json": "{...}", "body_json": "{...}",
//     // send_a_task:
//     "recipients": "assignees", "title": "alert message",
//     // move_single_card:
//     "to_phase_name": "GANHO"
//   }
// }
//
// OUTPUT: /tmp/pipefy-create-automation-ui-result.json with { success, automation_id, url, errors }

const { test } = require('@playwright/test');
const fs = require('fs');
const { launchPipefyContext, ensureLoggedIn } = require('../helpers/browser-context');

const ARGS = JSON.parse(process.env.PIPEFY_ARGS || '{}');

// UI labels per event/action type
const EVENT_LABELS = {
  scheduler: /Uma atividade for recorrente/i,
  sla_based: /Um alerta for acionado/i,
  card_moved: /Um card entrar em uma fase/i,
  card_left_phase: /Um card sair de uma fase/i,
  card_created: /Um card for criado/i,
  field_updated: /Um campo for atualizado/i,
};
const ACTION_LABELS = {
  send_email_template: /Envie um template de email/i,
  update_card_field: /Atualize um campo no card ou registro/i,
  send_http_request: /Faça uma requisição HTTP/i,
  send_a_task: /Envie uma tarefa/i,
  move_single_card: /^Mova um card$/i,
  create_card: /Crie um card ou registro/i,
};

test.setTimeout(180_000);

test('create-automation-ui', async () => {
  if (!ARGS.pipe_id) throw new Error('ARGS.pipe_id required');
  if (!ARGS.name) throw new Error('ARGS.name required');
  if (!ARGS.event?.type) throw new Error('ARGS.event.type required');
  if (!ARGS.action?.type) throw new Error('ARGS.action.type required');
  const ev = ARGS.event, ac = ARGS.action;

  const { ctx, page } = await launchPipefyContext();
  const result = { success: false, errors: [] };

  try {
    // ── Nav to new automation page ──
    const url = `https://app.pipefy.com/pipes/${ARGS.pipe_id}/settings/automations/new`;
    console.log(`→ goto ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await ensureLoggedIn(page);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2500);

    // ── Select event ──
    console.log(`→ select event: ${ev.type}`);
    const evLbl = EVENT_LABELS[ev.type];
    if (!evLbl) throw new Error(`Unknown event type: ${ev.type}`);
    const evBtn = page.getByRole('button', { name: evLbl }).first();
    await evBtn.waitFor({ timeout: 10_000 });
    await evBtn.click();
    await page.waitForTimeout(1500);

    // ── Configure event (branch per type) ──
    if (ev.type === 'scheduler') {
      console.log(`   → frequency=${ev.frequency || 'daily'}`);
      // Heuristic: UI shows a frequency dropdown + hour/minute pickers. Click freq dropdown.
      await page.screenshot({ path: '/tmp/pipefy-auto-evt-scheduler.png', fullPage: true }).catch(() => {});
      // TODO — iterate selectors based on screenshot
    } else if (ev.type === 'sla_based') {
      console.log(`   → sla ${ev.sla_days}d em fase "${ev.phase_name}"`);
      await page.screenshot({ path: '/tmp/pipefy-auto-evt-sla.png', fullPage: true }).catch(() => {});
      // Try phase dropdown
      const phaseDrop = page.locator('[role="combobox"], select').first();
      if (await phaseDrop.isVisible().catch(() => false)) {
        await phaseDrop.click();
        await page.waitForTimeout(800);
        const phaseOpt = page.getByRole('option', { name: new RegExp(ev.phase_name, 'i') }).first();
        if (await phaseOpt.isVisible().catch(() => false)) await phaseOpt.click();
      }
      // Days input
      const daysInput = page.locator('input[type="number"]').first();
      if (await daysInput.isVisible().catch(() => false)) {
        await daysInput.fill(String(ev.sla_days || 1));
      }
    } else if (ev.type === 'card_moved' || ev.type === 'card_left_phase') {
      console.log(`   → fase="${ev.phase_name}"`);
      await page.screenshot({ path: `/tmp/pipefy-auto-evt-${ev.type}.png`, fullPage: true }).catch(() => {});
      const phaseDrop = page.locator('[role="combobox"], select').first();
      if (await phaseDrop.isVisible().catch(() => false)) {
        await phaseDrop.click();
        await page.waitForTimeout(800);
        const phaseOpt = page.getByRole('option', { name: new RegExp(ev.phase_name, 'i') }).first();
        if (await phaseOpt.isVisible().catch(() => false)) await phaseOpt.click();
      }
    } else if (ev.type === 'field_updated') {
      console.log(`   → fields=${(ev.field_labels || []).join(', ')}`);
      await page.screenshot({ path: '/tmp/pipefy-auto-evt-field.png', fullPage: true }).catch(() => {});
      for (const fl of ev.field_labels || []) {
        const fieldDrop = page.locator('[role="combobox"]').first();
        if (await fieldDrop.isVisible().catch(() => false)) {
          await fieldDrop.click();
          await page.waitForTimeout(600);
          const opt = page.getByRole('option', { name: new RegExp(fl, 'i') }).first();
          if (await opt.isVisible().catch(() => false)) await opt.click();
          await page.waitForTimeout(500);
        }
      }
    }

    await page.waitForTimeout(1500);

    // ── Select action ──
    console.log(`→ select action: ${ac.type}`);
    const acLbl = ACTION_LABELS[ac.type];
    if (!acLbl) throw new Error(`Unknown action type: ${ac.type}`);
    const acBtn = page.getByRole('button', { name: acLbl }).first();
    await acBtn.waitFor({ timeout: 10_000 });
    await acBtn.click();
    await page.waitForTimeout(1500);

    // ── Configure action (branch per type) ──
    if (ac.type === 'send_email_template') {
      console.log(`   → template="${ac.email_template_name}"`);
      await page.screenshot({ path: '/tmp/pipefy-auto-act-email.png', fullPage: true }).catch(() => {});
      const tplDrop = page.locator('[role="combobox"]').first();
      if (await tplDrop.isVisible().catch(() => false)) {
        await tplDrop.click();
        await page.waitForTimeout(800);
        const opt = page.getByRole('option', { name: new RegExp(ac.email_template_name, 'i') }).first();
        if (await opt.isVisible().catch(() => false)) await opt.click();
      }
    } else if (ac.type === 'update_card_field') {
      console.log(`   → campo="${ac.field_label}" mode=${ac.field_value_mode}`);
      await page.screenshot({ path: '/tmp/pipefy-auto-act-update.png', fullPage: true }).catch(() => {});
      // Field dropdown
      const fieldDrop = page.locator('[role="combobox"]').first();
      if (await fieldDrop.isVisible().catch(() => false)) {
        await fieldDrop.click();
        await page.waitForTimeout(600);
        const opt = page.getByRole('option', { name: new RegExp(ac.field_label, 'i') }).first();
        if (await opt.isVisible().catch(() => false)) await opt.click();
      }
      await page.waitForTimeout(800);
      // Value — mode-specific
      if (ac.field_value_mode === 'current_datetime') {
        const curBtn = page.getByRole('button', { name: /Data atual|Current date|Now/i }).first();
        if (await curBtn.isVisible().catch(() => false)) await curBtn.click();
      } else {
        const valInput = page.locator('input').last();
        if (await valInput.isVisible().catch(() => false)) await valInput.fill(String(ac.field_value || ''));
      }
    } else if (ac.type === 'send_http_request') {
      console.log(`   → url=${ac.url}`);
      await page.screenshot({ path: '/tmp/pipefy-auto-act-http.png', fullPage: true }).catch(() => {});
      const urlInput = page.getByRole('textbox', { name: /URL/i }).first();
      if (await urlInput.isVisible().catch(() => false)) await urlInput.fill(ac.url);
    } else if (ac.type === 'send_a_task') {
      console.log(`   → task title="${ac.title}"`);
      await page.screenshot({ path: '/tmp/pipefy-auto-act-task.png', fullPage: true }).catch(() => {});
      const titleInput = page.getByRole('textbox', { name: /Título|Title/i }).first();
      if (await titleInput.isVisible().catch(() => false)) await titleInput.fill(ac.title);
    } else if (ac.type === 'move_single_card') {
      console.log(`   → to_phase="${ac.to_phase_name}"`);
      await page.screenshot({ path: '/tmp/pipefy-auto-act-move.png', fullPage: true }).catch(() => {});
      const phaseDrop = page.locator('[role="combobox"]').last();
      if (await phaseDrop.isVisible().catch(() => false)) {
        await phaseDrop.click();
        await page.waitForTimeout(600);
        const opt = page.getByRole('option', { name: new RegExp(ac.to_phase_name, 'i') }).first();
        if (await opt.isVisible().catch(() => false)) await opt.click();
      }
    }

    await page.waitForTimeout(1500);

    // ── Save automation ──
    console.log('→ save');
    const saveBtn = page.getByRole('button', { name: /Salvar|Save|Criar|Publicar/i }).first();
    await saveBtn.waitFor({ timeout: 10_000 });
    await saveBtn.click();
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle').catch(() => {});

    result.success = true;
    result.url = page.url();
    console.log(`✓ saved. url=${result.url}`);
    await page.screenshot({ path: '/tmp/pipefy-auto-saved.png', fullPage: true }).catch(() => {});

  } catch (err) {
    result.success = false;
    result.errors.push(String(err));
    console.error(`✘ error: ${err}`);
    await page.screenshot({ path: '/tmp/pipefy-auto-error.png', fullPage: true }).catch(() => {});
  } finally {
    fs.writeFileSync('/tmp/pipefy-create-automation-ui-result.json', JSON.stringify(result, null, 2));
    await ctx.close();
  }

  if (!result.success) throw new Error(`Automation creation failed: ${result.errors.join('; ')}`);
});
