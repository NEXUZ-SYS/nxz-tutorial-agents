---
name: pipefy-integration
description: Automate Pipefy workspace configuration using a hybrid approach — GraphQL API for most operations (pipes, phases, fields, cards, automations, webhooks) and Playwright CLI (headed scripts) for UI-only features like advanced Dashboard creation, conditional field visual configuration, and complex automation rules that exceed API capabilities. Use when the user needs to create or configure Pipefy Pipes, Phases, Fields, Automations, Connectors, Databases, or Dashboards end-to-end.
type: hybrid
version: 1.0.0
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

Pipefy **does NOT have an official CLI**. It is a no-code/low-code platform with two
programmatic interfaces:
- **GraphQL API** — covers 95%+ of operations: create/update pipes, phases, fields, cards, automations, webhooks, databases, connections, conditional fields
- **Playwright CLI (Microsoft)** — headless/headed browser automation for the **extremely rare** UI-only operations that the API cannot handle (advanced dashboards, PDF templates, email inbox setup)

Unlike ClickUp (where automations require UI), Pipefy's API is **extremely capable**.
Automations, conditional fields, and most config can be done 100% via GraphQL.
**Playwright is almost never needed** — only for visual configuration that has no API equivalent.

## Decision matrix — which tool for what

| Operation | GraphQL API | Playwright CLI |
|---|---|---|
| Create Pipe | ✅ first choice | last resort |
| Create/update Phase | ✅ | last resort |
| Create Phase Fields | ✅ | last resort |
| Set field as required | ✅ | — |
| Create Labels | ✅ | — |
| Create Automations | ✅ (covers 99% of cases) | almost never needed |
| Create Webhooks | ✅ | — |
| Create Cards | ✅ | — |
| Move Cards | ✅ | — |
| Create Database (Table) | ✅ | — |
| Create Database Records | ✅ | — |
| Create Connector Fields | ✅ | — |
| Configure SLA/Late alerts | ✅ (via automation) | — |
| Create Email Templates | ✅ (via automation action) | — |
| Conditional Fields | ✅ (createFieldCondition) | — |
| **Advanced Dashboards (visual)** | ❌ | ✅ **only way** (rare) |
| **Organization settings** | ❌ | ✅ **only way** (rare) |
| **PDF Templates** | ❌ | ✅ **only way** (rare) |
| **Email Inbox setup** | ❌ | ✅ **only way** (rare) |
| Read pipe/phase/field structure | ✅ | — |
| Read cards/records | ✅ | — |

**Rule of thumb:** GraphQL API for EVERYTHING. Playwright CLI is the absolute last resort
and should be used in fewer than 5% of operations.

**Priority order: GraphQL API → Playwright CLI (almost never).**

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

- `references/graphql-recipes.md` — full mutation/query library
- `references/playwright-patterns.md` — selector cheat sheet for Pipefy UI
- `references/automation-patterns.md` — trigger/condition/action combos
- `references/known-limitations.md` — API gaps and UI quirks
- `references/pdd-to-pipefy-mapping.md` — translation rules from PDD to Pipefy objects

## Memory

When a squad completes a Pipefy setup, save learnings to `_opensquad/_memory/` under the squad name:
- What worked on the first try (reusable template)
- What required a workaround (document it)
- Automation quota consumption patterns
- Customer-specific naming conventions
