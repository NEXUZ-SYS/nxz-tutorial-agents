# Layer 6 — Automations API Gap Analysis

> Descoberto durante tentativa de criar as 16 automações via `createAutomation` mutation em 2026-04-21.

## Matriz Event × Action (validada empiricamente)

| Event \ Action | send_email_template | update_card_field | move_single_card | send_http_request | create_card | distribute_assignments |
|---|---|---|---|---|---|---|
| `card_created` | ✅ | ❌ 500 | ✅ | ✅ | ⚠ ciclo | ✅ |
| `card_moved` | ❌ inválido | ❌ 500 | ❌ inválido | ❌ inválido | ❌ inválido | ❌ inválido |
| `card_left_phase` | ✅ | ❌ 500 | ✅ | ✅ | ⚠ campos | ✅ |
| `field_updated` | ✅ | ❌ 500 | ✅ | ✅ | ⚠ campos | ✅ |
| `sla_based` | ❌ inválido | ❌ 500 | ❌ inválido | ❌ inválido | ❌ inválido | ❌ inválido |
| `all_children_in_phase` | ❌ inválido | ❌ 500 | ❌ inválido | ❌ inválido | ❌ inválido | ❌ inválido |
| `scheduler` | 🚫 **BLACKLIST** | ❌ 500 | 🚫 BLACKLIST | 🚫 BLACKLIST | 🚫 BLACKLIST | 🚫 BLACKLIST |

**Conclusões:**
1. **`update_card_field` action: 100% quebrado via API** (sempre INTERNAL_SERVER_ERROR)
2. **`scheduler` event: blacklisted** (erro i18n `event_action_blacklist`)
3. **`card_moved`, `sla_based`, `all_children_in_phase`: todos bloqueados** ("não é válido")
4. **Apenas 3 eventos funcionam**: `card_created`, `card_left_phase`, `field_updated`
5. **Apenas 4 ações funcionam**: `send_email_template`, `move_single_card`, `send_http_request`, `distribute_assignments`

## Mapeamento spec → API (capacidade real)

| A- | Descrição | Trigger spec | Action spec | Via API? | Motivo |
|---|---|---|---|---|---|
| A-01 | Marcar Data MQL | card_moved→Qualif | update_card_field | ❌ | Ambos bloqueados |
| A-02 | Marcar Data SAL | card_moved→Demo | update_card_field | ❌ | Ambos bloqueados |
| A-03 | Marcar Data Ganho | card_moved→GANHO | update_card_field | ❌ | Ambos bloqueados |
| A-04 | Qualif D+1 email | scheduler/sla_based | send_email_template | ❌ | scheduler blacklist |
| A-05 | Qualif D+3 email | scheduler/sla_based | send_email_template | ❌ | scheduler blacklist |
| A-06 | Qualif D+7 email | scheduler/sla_based | send_email_template | ❌ | scheduler blacklist |
| A-07 | SLA Qualif 8d | sla_based | notify | ❌ | sla_based inválido |
| A-08 | Proposta D+3 email | scheduler/sla_based | send_email_template | ❌ | scheduler blacklist |
| A-09 | Proposta 7d alerta | sla_based | notify | ❌ | sla_based inválido |
| A-10 | Proposta 15d decisão | sla_based | notify | ❌ | sla_based inválido |
| A-11 | Fechamento 5d | sla_based | notify | ❌ | sla_based inválido |
| A-12 | Desconto > 15% | field_updated | notify (→email) | ✅ | field_updated + send_email_template |
| A-13 | GANHO auto (pgto+contrato) | field_updated | move_single_card | ✅ | field_updated + move_single_card |
| A-14 | Indicação D+7 | scheduler | notify | ❌ | scheduler blacklist |
| A-15 | Qualif 48h inativo | sla_based | notify | ❌ | sla_based inválido |
| A-16 | Audit diário webhook | scheduler | send_http_request | ❌ | scheduler blacklist |

**Cobertura via API: 2/16 (12,5%).**

## Opções de continuidade

### Opção A — API parcial + UI manual (2 auto API + 14 manual)
- Criar A-12 e A-13 via API agora
- Documentar as outras 14 com instruções UI passo-a-passo no `configuration-log.md`
- User executa manualmente as 14 na interface
- Tempo Claude: ~15min | Tempo user manual: ~1h30

### Opção B — API + Playwright CLI (todas automatizadas)
- Criar A-12/A-13 via API
- Escrever script Playwright genérico `create-automation-via-ui.js` que aceita spec JSON e clica nos passos
- Executar o script 14× com payloads diferentes
- Tempo Claude: ~2h setup + debugging | Brittle (UI muda)

### Opção C — Sniff do payload UI + retry API
- Abrir pipe → UI automation builder → criar 1 automação de cada tipo → sniff request
- Descobrir se existe mutation interna (ex.: `/graphql/core` mais permissiva, ou payload com token especial)
- Se achar: voltar a batch API com payload corrigido; se não: cair em A ou B
- Tempo Claude: ~45min recon + resultado incerto

## Recomendação

**Opção A** para esta sprint. Justificativa:
1. Pipefy claramente bloqueou automações complexas via API por design (scheduler, sla_based, update_card_field) — provavelmente para forçar uso do UI builder
2. Playwright das 14 seria frágil e custaria horas de manutenção
3. Instruções UI claras + specs já prontos permitem que o user + futuro TS façam em 1h30
4. A-12 e A-13 cobrem os dois pontos mais críticos de lógica: Gate R19 (GANHO auto) e escalation de desconto
5. Demais automações (timestamps, cadência, SLA alerts) são previsíveis e padronizadas — fáceis de reproduzir no UI builder seguindo os specs

Se o user preferir cobertura total automatizada, escalar para Opção B em sprint separada.
