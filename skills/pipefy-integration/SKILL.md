---
name: pipefy-integration
description: Automate Pipefy workspace configuration using a hybrid approach — GraphQL API for most operations (pipes, phases, fields, cards, automations, webhooks) and Playwright CLI (headed scripts) for UI-only features like advanced Dashboard creation, conditional field visual configuration, and complex automation rules that exceed API capabilities. Use when the user needs to create or configure Pipefy Pipes, Phases, Fields, Automations, Connectors, Databases, or Dashboards end-to-end.
type: hybrid
version: 2.0.0
categories:
  - pipefy
  - productivity
  - process-management
env:
  - PIPEFY_API_TOKEN
  - PIPEFY_ORGANIZATION_ID
script:
  path: scripts/run-playwright.sh
  runtime: bash
  dependencies:
    - "@playwright/test"
  invoke: bash scripts/run-playwright.sh {template} {args_json}
---

# Pipefy Integration — Hybrid (GraphQL API + Playwright CLI)

## The core problem

Pipefy **does NOT have an official CLI**. It has THREE programmatic interfaces:

1. **Public GraphQL API** (`api.pipefy.com/graphql`) — Bearer token; ~90% dos casos
2. **Internal GraphQL API** (`app.pipefy.com/graphql/core`) — mesmo Bearer token; email templates, algumas automations, UI features não expostas publicamente
3. **Internal REST API** (`app.pipefy.com/internal_api/*`) — requer CSRF token + cookie de sessão; usado pelo próprio UI Pipefy (ex.: sync fields, field settings, card view config)

**Playwright CLI** é usado apenas para:
- Operações UI-only sem endpoint (dashboards avançados, PDF templates, email inbox setup)
- **Replay** de mutations internal_api capturadas via sniff (quando endpoint existe mas requer CSRF)

## 🔴 ANTES de criar qualquer alerta/notificação — verifique o nativo

Pipefy tem **notificações in-app nativas** (sino + email) que disparam AUTOMATICAMENTE:
- Card atribuído a você → você recebe notificação
- SLA `late` ou `expired` → assignees + watchers recebem
- `@mention` em comentário → pessoa mencionada recebe
- Phase change em card seu → assignee/watchers recebem

**Consequência:** não construa automação de webhook/email para "avisar owner" — Pipefy já faz. Só construa quando precisar alertar pessoas que **NÃO** são assignees (outros papeis, canais coletivos, sistemas externos).

Queries essenciais antes de qualquer desenho de automação:

```graphql
# Lista actions disponíveis + quais events cada uma aceita
query { automationActions(repoId: "<PIPE_ID>") { id enabled eventsBlacklist triggerEvents } }

# Lista events (triggers) disponíveis
query { automationEvents { id actionsBlacklist } }
```

Ver `references/automation-catalog.md` para resultados completos + decision tree.

## Decision matrix — which tool for what

| Operation | Public GraphQL | Internal GraphQL/REST | Playwright |
|---|---|---|---|
| Create Pipe | ✅ | — | — |
| Create/update Phase | ✅ | — | — |
| Create Phase Fields | ✅ | — | — |
| Update Phase Field (com label obrigatório) | ✅ | — | — |
| Create Labels | ✅ | — | — |
| Create Automations (simples) | ✅ | — | — |
| Create Automations (scheduler/sla complexas) | ❌ | ✅ `/internal_api` replay | — |
| Update Automation URL | ✅ `updateAutomation` | — | — |
| Delete Automation | ✅ `deleteAutomation` | — | — |
| Create Webhooks | ✅ | — | — |
| Create Cards | ✅ | — | — |
| Move Cards | ✅ | — | — |
| Create Database (Table) | ✅ `authorization: "write"` | — | — |
| Create Table Field | ✅ (usa `type`, camelCase connector props) | — | — |
| Delete Table Field | ✅ (snake_case `table_id`) | — | — |
| Update Table Field type | ❌ type não é updatable | — | Delete + recreate |
| Create Connector Fields | ✅ | — | — |
| **own_field_maps (sync fields)** | ❌ | ✅ `PUT /internal_api/settings/fields/{id}` | Playwright replay + CSRF |
| Configure SLA/Late alerts | ✅ (via automation) | — | — |
| Email Templates CRUD | ❌ | ✅ `graphql/core` | — |
| Conditional Fields | ✅ `createFieldCondition` | — | — |
| **Dashboard visual** | ❌ | ❌ | ✅ **only way** (raro) |
| **PDF Templates** | ❌ | ❌ | ✅ **only way** (raro) |
| **Email Inbox setup** | ❌ | ❌ | ✅ **only way** (raro) |
| Organization settings | ❌ | ❌ | ✅ |
| Read pipe/phase/field | ✅ | — | — |
| Read cards/records | ✅ | — | — |

**Rule of thumb:** API pública primeiro. `graphql/core` ou `internal_api` quando a feature é UI-native mas tem endpoint descoberto (precisa CSRF via Playwright). Playwright-only em último caso.

**Priority order: Public GraphQL → Internal endpoints via Playwright replay → Playwright pura.**

## When to use this skill

Activate whenever the user wants to:
- Configure a Pipefy workspace (Pipes, Phases, Fields, Automations, Databases, Connectors)
- Set up a business process pipeline from a PDD (Process Design Document)
- Bulk-create or audit existing pipe structure
- Operationalize a process template in Pipefy

## Prerequisites — credentials

Pipefy requires a Personal Access Token. First run should verify `.env` has:

```
PIPEFY_API_TOKEN=eyJ...
PIPEFY_ORGANIZATION_ID=123456
```

If missing, ask the user for the token (Account Settings → Personal Access Tokens in Pipefy) and the organization ID (visible in the URL: `app.pipefy.com/organizations/<ORG_ID>`).

## Core workflows

### 1. Read state (API first)

Before creating anything, know what exists:

```bash
# List all pipes in the organization
curl -s 'https://api.pipefy.com/graphql' \
  -H "Authorization: Bearer $PIPEFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ organization(id: '$PIPEFY_ORGANIZATION_ID') { pipes { id name phases { id name } } } }"}'
```

### 2. Create Pipes and Phases (API)

```graphql
# Create a Pipe
mutation {
  createPipe(input: {
    organization_id: $ORG_ID
    name: "Vendas"
    icon: "money"
    anyone_can_create_card: false
  }) {
    pipe { id name }
  }
}

# Create a Phase in a Pipe
mutation {
  createPhase(input: {
    pipe_id: $PIPE_ID
    name: "Qualificação"
    done: false
    description: "Lead em qualificação humana"
  }) {
    phase { id name }
  }
}
```

### 3. Create Fields (API)

```graphql
# Create a field in a phase
mutation {
  createPhaseField(input: {
    phase_id: $PHASE_ID
    type: "short_text"
    label: "Razão Social"
    required: true
    description: "Nome oficial da empresa"
  }) {
    phase_field { id label type }
  }
}
```

Available field types:
- `short_text`, `long_text`, `number`, `currency`, `date`, `datetime`, `due_date`
- `select` (dropdown), `radio_vertical`, `radio_horizontal`, `checklist_vertical`, `checklist_horizontal`
- `email`, `phone`, `cpf`, `cnpj`
- `attachment`, `assignee_select`, `label_select`
- `statement` (section header/divider)
- `connector` (link to another pipe/database)
- `id` (auto-generated)

### 4. Create Automations (API)

```graphql
# Create an automation
mutation {
  createAutomation(input: {
    pipe_id: $PIPE_ID
    name: "Mover para Qualificação ao criar card"
    trigger: {
      type: "card_created"
    }
    actions: [{
      type: "move_card_to_phase"
      phase_id: $PHASE_ID
    }]
    conditions: []
  }) {
    automation { id name }
  }
}
```

Common trigger types:
- `card_created` — card created in pipe
- `card_moved_to_phase` — card enters a specific phase
- `card_field_updated` — field value changes
- `card_expired` — SLA expired
- `card_late` — SLA approaching
- `recurring` — time-based (daily, weekly, monthly)

Common action types:
- `move_card_to_phase` — move card
- `update_card_field` — update a field value
- `send_email` — send email template
- `create_card` — create card in another pipe
- `create_connected_card` — create connected card
- `run_formula` — calculate field value
- `webhook` — HTTP request to external service

### 5. Create Connections between Pipes (API)

```graphql
# Create a connector field linking Pipe A to Pipe B
mutation {
  createPhaseField(input: {
    phase_id: $PHASE_ID
    type: "connector"
    label: "Conta Vinculada"
    connector_pipe_id: $TARGET_PIPE_ID
    can_create_new_connected: true
    can_connect_existing: true
    can_connect_multiples: false
  }) {
    phase_field { id label }
  }
}
```

### 6. Create Webhooks (API)

```graphql
mutation {
  createWebhook(input: {
    pipe_id: $PIPE_ID
    name: "Notificar ERP"
    url: "https://hooks.nexuz.com.br/pipefy/card-moved"
    actions: ["card.move", "card.done"]
    headers: { "X-Secret": "..." }
  }) {
    webhook { id name url }
  }
}
```

### 7. Configure via Playwright CLI (UI-only operations)

For operations that require the UI, use the Playwright CLI wrapper:

```bash
bash skills/pipefy-integration/scripts/run-playwright.sh \
  configure-conditional-fields \
  '{"pipe_id":"301234","field_id":"cnpj","condition":"motivo_descarte","value":"Perdeu pra concorrente"}'
```

### Tuning Playwright execution

Same pattern as clickup-integration. Resolution order (later wins):

1. **Skill defaults** — `skills/pipefy-integration/config.env`
2. **Project `.env`** — per-project overrides
3. **Shell env** — session overrides
4. **CLI after `--`** — one-off flags

## Working with the PDD (Process Design Document)

This squad receives a PDD from `nxz-backoffice-processes`. The translation rules:

| PDD Concept | Pipefy Object |
|---|---|
| Funil (pipeline) | Pipe |
| Etapa (stage) | Phase |
| Sub-etapa de entrada | Phase with labels/fields to differentiate |
| Campo (field) | Phase Field |
| Checklist de transição | Required fields on phase (gate) |
| Automação | Automation |
| Cadência (email sequence) | Multiple automations with recurring triggers |
| Conta/Contato | Database (Table) |
| Deal | Card in Vendas Pipe |
| Handoff (Vendas → Implantação) | Connector + "Create connected card" automation |
| Dashboard | Dashboard with charts |
| SLA | Late alert + automation |
| Motivo de descarte | Dropdown field (required in terminal phase) |

## Design best practices for Pipefy

1. **One Pipe per process.** Vendas = 1 pipe. Implantação = 1 pipe. Nutrição = 1 pipe (parallel).
2. **Databases for master data.** Contas and Contatos as Databases, connected to Deal cards via connector fields.
3. **Required fields as gates.** Mark fields as required on a phase to block progression without them.
4. **Phases map to stages.** Each PDD etapa becomes a Phase. Keep the same names.
5. **Start Form for lead intake.** Public form generates cards in the first phase.
6. **Connector fields for relationships.** Deal → Conta (1:1), Conta → Contatos (1:N).
7. **Automations for SLAs.** Use `card_late` trigger + `send_email` or `update_card_field` actions.
8. **Separate Done/Lost phases.** Terminal phases: "GANHO" (done=true) and "DESCARTE" (done=true, with required motivo field).
9. **Email templates per pipe.** Define templates for each automated communication.
10. **Quota awareness.** Business plan = 300 automation jobs/month. Design automations efficiently.
11. **Native notifications first.** SLA/assignment alerts to assignees são nativos — não duplique com webhook.
12. **Connector paralelo para trocar target.** Quando precisa mudar um connector de Pipe/Table X para Y, NÃO tente `deletePhaseField` (bloqueia 85%). Crie novo connector em paralelo, rebatize o antigo como `(legado) ...` e `required=false`. Atualize refs em email templates / automations para o novo slug.
13. **`label_select` NUNCA em tabelas.** Use `select`/`checklist_vertical`/`radio_*`. label_select foi desenhado para labels de cards em Pipes, não renderiza dropdown em tabelas.
14. **`anyone_can_create_card`**: default é `false` (mais seguro). Só habilitar se squad precisa intake público.

## Pattern descoberto 2026-04-22: Sync de campos entre cards (own_field_maps)

Pipefy tem "Campos sincronizados" (own_field_maps_attributes) nos connectors — permite pré-preencher campos do registro criado via "Criar novo" no picker:

```
Deal.connector.criar_novo → registro novo com campos pré-preenchidos
  ├─ fixed_value: "Ativo"                     # valor constante
  └─ copy_from: "%{<source_internal_id>}"     # copia de outro campo do card pai
```

**Endpoint:** `PUT /internal_api/settings/fields/{internal_id}` (JSON:API envelope, precisa CSRF)
**Script pronto:** `scripts/templates/bulk-apply-field-sync.js`
**Doc completa:** `references/connector-field-maps.md`

Caso de uso típico: deal tem connector `Cliente` → Clientes e `Contatos do deal` → Contatos. Ao criar um Contato a partir do deal, auto-preencher `Contato.cliente = Deal.cliente` (copy_from).

## Pattern descoberto: Replay de mutations internal_api via Playwright CSRF

Para UI-features que não existem na API pública mas têm endpoint interno:

1. Abrir sniff-* template (captura promíscua de POST/PUT/PATCH)
2. Usuário faz 1 ação manual na UI → capturamos mutation, headers (X-CSRF-Token), cookies
3. Extrair payload, parametrizar
4. Replay via `page.evaluate(fetch)` com CSRF + `credentials: 'include'`

Templates prontos:
- `sniff-connector-settings.js` — sniff genérico de qualquer config de connector field
- `bulk-apply-field-sync.js` — replay bulk de own_field_maps
- `bulk-create-automations.js` — replay de createAutomation
- `bulk-create-field-conditions.js` — replay de createFieldCondition

## Nível de confiança por layer (heurística)

| Layer | API pública funciona? | Probabilidade de precisar Playwright |
|---|---|---|
| Databases (create/update) | ✅ 100% | 0% |
| Pipe + phases | ✅ 100% | 0% |
| Phase fields (scalar/select) | ✅ 100% | 0% |
| Phase fields (connector) | ✅ 100% | 0% |
| Connectors cross-table | ✅ 100% | 0% |
| Automations simples (card_moved, field_updated) | ✅ 100% | 0% |
| Automations sla_based+send_email | ✅ 100% | 0% |
| Automations scheduler+* | ❌ actionsBlacklist | **External cron (n8n)** |
| own_field_maps (sync fields) | ❌ não exposto | 100% (internal_api replay) |
| Email templates CRUD | ⚠️ só via `/graphql/core` | 0% (mas endpoint não-público) |
| Filtro dinâmico connector | ❓ não confirmado | Provável Playwright |
| Visualização do card (quais fields aparecem) | ❓ investigar `UpdateCardLeftSidePanels` | Provável internal_api |
| Dashboards | ❌ | 100% |
| PDF templates | ❌ | 100% |

## Error handling

### "Pipe with this name already exists"
Before creating, query existing pipes:
```graphql
{ organization(id: $ORG_ID) { pipes { id name } } }
```

### Rate limiting
Pipefy doesn't publish exact limits. If you hit 429, wait 60s and retry. Batch operations with 500ms delay between calls.

### Conditional fields not triggering via API
Known limitation: conditional field visibility rules only fire in the UI. If populating fields via API, ensure all conditionally-required fields are sent explicitly.

### Automation quota approaching limit
Monitor monthly. If > 80% of 300 jobs used, alert the user to consider Enterprise plan or reduce automation frequency.

## Reference files

- `references/graphql-recipes.md` — biblioteca de mutations/queries públicas
- `references/playwright-patterns.md` — cheat sheet de seletores UI Pipefy
- `references/automation-patterns.md` — combos trigger/condition/action comuns
- **`references/automation-catalog.md`** — **catálogo completo** de 14 actions × 10 events com eventsBlacklist, notificações nativas, decision tree (🔴 ler ANTES de desenhar alerta)
- **`references/connector-field-maps.md`** — sync fields (own_field_maps) via `/internal_api/settings/fields`
- `references/known-limitations.md` — 29 limitações conhecidas + workarounds
- `references/pdd-to-pipefy-mapping.md` — regras de tradução PDD → objetos Pipefy
- `references/pipe-customization-defaults.md` — customizações UI-only (button label, description, etc.)

## Templates Playwright prontos (`scripts/templates/`)

### Sniffing (captura UI → replay programático)
- `sniff-automation-mutation.js` — sniff promíscuo de createAutomation
- `sniff-connector-settings.js` — sniff de qualquer config de connector field (filter, sync fields, etc.)
- `recon-automations.js` — recon de automations existentes
- `recon-email-templates.js` — recon de email templates

### Bulk operations (replay parametrizado)
- `bulk-create-automations.js` — cria N automations via `/internal_api` (para combos public GraphQL rejeita)
- `bulk-create-field-conditions.js` — cria N field conditions via `/queries`
- `bulk-apply-field-sync.js` — aplica own_field_maps em N connectors via `/internal_api/settings/fields`

### UI configuration (uma vez por pipe)
- `customize-pipe-settings.js` — button label, description, etc.
- `create-automation-ui.js` — criar automation via UI (fallback quando internal_api insuficiente)

### Diagnóstico
- `screenshot-card.js` — screenshot de um card para debug visual
- `screenshot-card-detailed.js` — screenshot + scroll + HTML dump
- `probe-pipefy-auth.js` — valida credenciais
- `login.js` — força login (se sessão expirou)

## Memory

When a squad completes a Pipefy setup, save learnings to `_opensquad/_memory/` under the squad name:
- What worked on the first try (reusable template)
- What required a workaround (document it)
- Automation quota consumption patterns
- Customer-specific naming conventions

## Checklist anti-surprise (antes de começar qualquer squad Pipefy)

Todos esses pontos foram descobertos empiricamente — pular algum = retrabalho:

- [ ] `authorization` em `CreateTableInput` é `"write"` / `"read"` — NÃO `"write_access"`
- [ ] `CreateTableFieldInput` usa `type` (não `type_id`) + camelCase em connector props
- [ ] `DeleteTableFieldInput` usa `table_id` (snake_case) não `tableId`
- [ ] `UpdatePhaseFieldInput` exige `label` non-null mesmo em update parcial
- [ ] Após `createPipe`, deletar as 3 phases default ("Caixa de entrada", "Fazendo", "Concluído")
- [ ] Start form tem phase própria oculta (`pipe.startFormPhaseId`) — criar fields lá, NÃO na primeira phase visível
- [ ] Label_select NUNCA em tabelas → usar select/checklist/radio
- [ ] Para updatePhaseField quando há collision de slug phase_field×table_field → passar `id` + `uuid` juntos
- [ ] `deletePhaseField` bloqueia ~85% dos types → planejar ou deletar pipe inteiro + recriar
- [ ] Antes de desenhar alerta, verificar notificações nativas Pipefy (podem já cobrir o caso)
- [ ] `automationActions(repoId:"<id>")` antes de desenhar automation — retorna eventsBlacklist por action
- [ ] `scheduler` event + ação útil = bloqueado → usar external cron
- [ ] Rate limit 500 req/30s → delay 500ms entre mutations
- [ ] Emojis em JSON: passar `ensure_ascii=False` no `json.dumps` (surrogate pairs quebram GraphQL)
