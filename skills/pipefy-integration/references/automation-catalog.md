# Pipefy — Catálogo de Automações (events × actions)

> Atualizado: 2026-04-22

Documento definitivo de **o que é possível automatizar nativamente no Pipefy**. Use sempre antes de decidir construir integração externa (n8n/webhook).

## Query para inspecionar catálogo em tempo real

```graphql
# Lista de actions disponíveis para um pipe específico
query {
  automationActions(repoId: "<PIPE_ID>") {
    id icon enabled initiallyHidden disabledReason
    eventsBlacklist triggerEvents acceptedParameters
  }
}

# Lista de events disponíveis (triggers)
query {
  automationEvents { id icon acceptedParameters actionsBlacklist }
}
```

Roda sempre que suspeitar de nova limitação — o catálogo muda entre versões.

## Events (triggers) — 10 disponíveis

| Event ID | Quando dispara | actionsBlacklist notável |
|---|---|---|
| `card_created` | Card criado | — |
| `card_moved` | Card muda de phase | — |
| `card_left_phase` | Card sai da phase (complemento de card_moved) | `send_a_task` |
| `field_updated` | Valor de field muda | — |
| `sla_based` | SLA `late` (antes prazo) ou `expired` (após prazo) | `send_a_task` |
| `scheduler` | Agendado (cron interno Pipefy) | **Quase tudo** — só aceita `schedule_create_card`. Inutilizável para cadências/alertas |
| `card_inbox_received_email` | Email entra na inbox do pipe | — |
| `all_children_in_phase` | Todos os sub-cards estão na mesma phase | — |
| `http_response_received` | Resposta HTTP de um `send_http_request` anterior (chain!) | — |
| `manually_triggered` | Usuário aperta botão no card | — |

## Actions — 14 disponíveis

| Action ID | O que faz | eventsBlacklist | Usamos em |
|---|---|---|---|
| `update_card_field` | Atualiza valor de um field | `scheduler` | A-01/02/03 |
| `send_email_template` | Envia email (template pré-criado) | `scheduler` | A-04, A-08, A-12 |
| `send_http_request` | POST/GET para URL externa | `scheduler` | A-11, A-14 |
| `move_single_card` | Move card para outra phase | `scheduler` | A-13 |
| `move_parent_card` | Move card-pai | `scheduler` | — |
| `create_card` | Cria card novo em pipe | `scheduler` | — |
| `create_connected_card` | Cria card em pipe conectado | `scheduler` | — |
| **`send_a_task`** | **Cria task interna Pipefy para usuários** | **`scheduler`, `sla_based`, `card_left_phase`** | — (considerar) |
| `distribute_assignments` | Distribui cards entre assignees conforme estratégia | `scheduler` | — |
| `apply_sla_rules` | Recalcula SLA no card | `scheduler` | — |
| `run_a_formula` | Executa fórmula | `scheduler` | — |
| `generate_with_ai` | Gera conteúdo via IA Pipefy | `scheduler` | — |
| `schedule_create_card` ⚠️ hidden | Único action que `scheduler` aceita | Todos exceto `scheduler` | — |
| `move_multiple_cards` ⚠️ hidden | Move múltiplos cards | Quase tudo | — |

## Combinações bloqueadas (lembrar)

| Quero fazer isso | Combo | Bloqueado? | Alternativa |
|---|---|---|---|
| Alerta agendado diário por email | `scheduler` + `send_email_template` | ❌ bloqueado | External cron (n8n) |
| Webhook agendado | `scheduler` + `send_http_request` | ❌ bloqueado | External cron |
| Task interna quando SLA expira | `sla_based` + `send_a_task` | ❌ bloqueado | Notificação nativa (abaixo) |
| 3ª threshold temporal na mesma fase | — | ❌ `sla_based` só tem `late`+`expired` | External cron |
| Task quando card cria | `card_created` + `send_a_task` | ✅ OK | — |
| Alerta quando SLA expira (para assignee) | — | — | **Nativo** (ver seção Notificações) |

## Notificações nativas Pipefy

**Pipefy tem sistema de notificação in-app (sino + email opcional) que dispara AUTOMATICAMENTE. Não requer criar automação customizada.**

### Query para checar notificações do usuário corrente

```graphql
{ notifications { unreadCount messages { ... } } }
```

### Quando dispara automaticamente

| Evento | Para quem |
|---|---|
| Card atribuído (`assignee_select` change) | Novo assignee |
| SLA `late` ou `expired` | Assignees + watchers do card |
| `@mention` em comentário | Pessoa mencionada |
| Card movido | Assignee + watchers |
| Email do lead recebido na inbox | Assignee do card |
| Field crítico atualizado | Depende de config do usuário |

**Consequência prática:** não construir webhook para "avisar owner quando SLA expirar" — Pipefy já faz isso. Só use webhook externo quando precisar alertar **pessoas diferentes do assignee** (outros papeis, canais coletivos, sistemas externos).

## Decision tree: preciso de webhook externo?

```
Preciso avisar alguém quando X acontece.
│
├── X é SLA late/expired + alvo é assignee?
│   └── NÃO construa automação. Nativa já faz.
│
├── X é SLA late/expired + alvo é OUTRO papel (Financeiro, Gestão, time coletivo)?
│   ├── Usuários são Pipefy users?
│   │   └── Tentar send_email_template com emails fixos (toEmail=financeiro@nexuz...)
│   │   │   Se funcionar, usa isso.
│   │   └── OU create_card em Pipe "Alertas" com assignee = role alvo (eles pegam notif nativa)
│   │
│   └── Canal coletivo (Discord, Slack)?
│       └── send_http_request para n8n.nexuz.app que redistribui
│
├── X é scheduler (cron diário/semanal)?
│   └── scheduler event é inútil (actionsBlacklist). Usar n8n.
│
└── X é 3ª+ threshold temporal na mesma fase?
    └── sla_based só tem 2 thresholds. Usar n8n.
```

## sla_based — anatomia

Configurado por phase, gera 2 pontos temporais:

```
phase.late_time (fires "late" event)  →  phase.time_limit (fires "expired" event)
       |                                         |
       v                                         v
  send_email_template (OK)              send_http_request (OK)
  send_http_request (OK)                send_a_task ❌ BLACKLISTED
  update_card_field (OK)
```

**Só duas automações sla_based por phase são possíveis** (uma `late`, uma `expired`). Para 3ª+ threshold: n8n cron consultando `phases_history` + `time_in_phase`.

## scheduler — anatomia

Event `scheduler` existe mas tem `actionsBlacklist` enorme. Na prática:

```
scheduler (configurável: daily/weekly/monthly com timezone)
    │
    └── Única action aceita: schedule_create_card
```

Não consegue enviar email, nem HTTP, nem update field, nem task. Efetivamente inutilizável para cadências, alertas ou pings.

**Workaround:** n8n cron externo consultando Pipefy via API pública.

## Caminhos para alerta INTERNO sem external

Ordenados do mais simples ao mais complexo:

1. **Deixar nativo fazer** — SLA late/expired + assignee = nada a construir
2. **`send_email_template`** — email para endereço fixo interno (financeiro@, gestao@) ou dinâmico (`{{ops_responsavel}}`)
3. **`create_card` em Pipe "Alertas"** — assignee do novo card = pessoa alvo, ela recebe notif nativa
4. **`send_a_task`** — só funciona com triggers não-SLA (card_moved, field_updated, card_created, etc.)
5. **`send_http_request` → n8n → Discord** — último recurso, quando quer broadcast ou formato rico

## Caminhos para alerta EXTERNO (lead/cliente)

1. **`send_email_template`** com `toEmail={{contatos_do_deal}}` — email para o lead
2. **Chained automations** via `http_response_received` — automation A dispara webhook, webhook responde JSON, automation B consome response
3. **External cron (n8n)** — para cadências além de 2 thresholds

## Referências cruzadas

- Endpoints GraphQL: `references/graphql-recipes.md`
- Sync de campos entre cards (own_field_maps): `references/connector-field-maps.md`
- Limitações conhecidas: `references/known-limitations.md`
- Playwright para UI-only: `references/playwright-patterns.md`
