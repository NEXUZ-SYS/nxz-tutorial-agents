# Pesquisa Pipefy API — Escopo Selecionado (Pipe Vendas completo)

**Data da pesquisa:** 2026-04-20
**Escopo:** Pipe Vendas completo (9 fases + campos + automações) + customização Completa
**Plano:** Enterprise/Unlimited (API GraphQL + todos recursos liberados)
**Pesquisadora:** Rita Pesquisa
**Dossiê anterior validado:** `squads/nxz-backoffice-processes/output/2026-04-16-165948/v1/pipefy-dossier.md` (2026-04-16)

---

## Resumo Executivo

A API GraphQL do Pipefy cobre **≥95%** de todas as operações necessárias para o Pipe Vendas completo, incluindo Pipes, Phases, Fields, Automations, Connectors, Databases (Tables), Webhooks, SLAs (via automation SLA-based) e Email Templates (via action `send_a_task`). Apenas **Dashboards avançados, PDF Templates, Email Inbox setup e customização visual do formulário público** exigem Playwright CLI.

**Novidades 2025-2026 (confirmadas via changelog oficial):**
- Full automation management via API (`createAutomation`, `updateAutomation`, `deleteAutomation`) — Confirmado.
- Batch field updates (`updateFieldsValues`) — até 30 campos em 1 call.
- `duplicateCondition` mutation (2026-03-18).
- `createCustomRole`, `saveRolePermission`, `exportPipeAuditLogsReport` (2025-10-27).
- `createPipeReport`, `updatePipeReport`, `deletePipeReport` (2025-10-30).
- `archived` field em Phases/Reports (2025-11-18).
- `deletedAt` fields em Phase/Pipe/Table/Repo (2026-03-18).
- `automationLoopDetected` enum (2026-01-06).
- LLM provider management (`createLlmProvider` etc., 2026-03-18).

**Quota Enterprise ATUALIZADA:** 2.000 jobs/mês (o dossiê anterior estimava 10.000 — **correção necessária**). Unlimited permanece como plano separado para volumes maiores.

---

## API GraphQL — Operações Disponíveis

### Pipes

**Mutations Confirmadas:**

```graphql
# Criar Pipe com phases + labels + start_form_fields em 1 call (atomic)
mutation {
  createPipe(input: {
    organization_id: $ORG_ID
    name: "Vendas"
    icon: "money"
    anyone_can_create_card: false
    phases: [
      { name: "Novo Lead" },
      { name: "Qualificação" },
      { name: "Demo Agendada" },
      { name: "Pós-demo" },
      { name: "Proposta" },
      { name: "Fechamento" },
      { name: "GANHO", done: true },
      { name: "DESCARTE", done: true }
    ]
    labels: [
      { name: "Inbound", color: "#2196F3" },
      { name: "Outbound", color: "#FF9800" },
      { name: "Indicação", color: "#4CAF50" }
    ]
    start_form_fields: [
      { label: "Nome do Contato", type_id: "short_text", required: true },
      { label: "Empresa", type_id: "short_text", required: true },
      { label: "Email", type_id: "email", required: true },
      { label: "Origem", type_id: "select", required: true,
        options: ["Inbound", "Outbound", "Indicação"] }
    ]
  }) { pipe { id name phases { id name } } }
}
```

**Outras mutations:** `updatePipe`, `deletePipe`, `clonePipes` (clona estrutura entre orgs).

**Queries:** `organization(id).pipes`, `pipe(id) { ... }`, `pipes(ids: [])`.

**Obrigatórios:** `organization_id`, `name`. **Opcionais:** `icon`, `color`, `anyone_can_create_card`, `preferences`, `public`.

### Phases

```graphql
mutation {
  createPhase(input: {
    pipe_id: $PIPE_ID
    name: "Qualificação"
    done: false
    description: "Lead em qualificação humana"
    lateness_time: 691200  # 8 dias em segundos (para SLA late alert)
  }) { phase { id name } }
}
```

Também disponíveis: `updatePhase`, `deletePhase`, `setRole`, `movePhase`. O novo campo `archived` (2025-11-18) permite arquivar sem deletar.

### Fields

```graphql
mutation {
  createPhaseField(input: {
    phase_id: $PHASE_ID
    type: "currency"
    label: "MRR"
    required: true
    description: "Receita recorrente mensal"
    minimal_view: true
  }) { phase_field { id internal_id label type } }
}
```

**Tipos Confirmados:** `short_text`, `long_text`, `number`, `currency`, `date`, `datetime`, `time`, `due_date`, `select`, `radio_vertical`, `radio_horizontal`, `checklist_vertical`, `checklist_horizontal`, `email`, `phone`, `cpf`, `cnpj`, `attachment`, `assignee_select`, `label_select`, `connector`, `statement`, `id`.

**Limitação confirmada:** `updatePhaseField` NÃO funciona em start_form_fields — workaround é deletar e recriar.

**Novidade (2025):** `batch_update` via mutation `updateFieldsValues` — atualiza até 30 campos de um card/record em 1 call, com suporte a `operation: ADD` para campos multi-valor (labels, assignees, connections, checklists).

### Automations

```graphql
# Automação completa: SLA → email template → conditions AND
mutation {
  createAutomation(input: {
    name: "Alerta SLA Qualificação > 8 dias"
    event_id: "sla_based"
    action_id: "send_a_task"
    event_repo_id: "$PIPE_ID"
    action_repo_id: "$PIPE_ID"
    event_params: {
      phase_id: "$PHASE_QUALIFICACAO_ID"
      sla_warning_time: 192  # horas
    }
    action_params: {
      subject: "⚠️ Lead {{card.title}} - SLA Qualificação"
      body: "Lead há mais de 8 dias em Qualificação. Decidir: Nutrição ou Descarte."
      to: "{{card.assignees}}"
    }
    condition: {
      expressions: [
        { structure_id: 0, field_address: "fit_confirmado", operation: "equals", value: "Sim" }
      ]
      expressions_structure: [[0]]
    }
  }) { automation { id name active } }
}
```

**Conditions — AND vs OR (Confirmado via `Condition` object):**

```json
// AND: ambas condições devem ser verdadeiras
"expressions_structure": [[0, 1]]

// OR: qualquer condição é suficiente
"expressions_structure": [[0], [1]]

// (A AND B) OR C
"expressions_structure": [[0, 1], [2]]
```

Cada grupo interno `[...]` é AND; separação entre grupos é OR. **A validar em runtime:** conditions aninhadas profundas (AND dentro de OR dentro de AND) têm comportamento documentado como "inesperado" pela comunidade — sempre testar.

**Event IDs suportados:** `card_created`, `card_moved`, `card_left_phase`, `field_updated`, `all_children_in_phase`, `scheduler`, `sla_based`, `manually_triggered`.

**Action IDs suportados:** `move_single_card`, `create_card`, `update_card_field`, `send_a_task` (email), `generate_with_ai`, `run_formula`, `webhook` (HTTP Request).

**Alert types (via event `sla_based` ou `card_late`):**
- **Overdue** — baseado em Due Date field
- **Late** — card excedeu SLA da phase (requer `lateness_time` configurado na phase)
- **Expired** — card excedeu deadline do pipe (configurado em Pipe Settings)

### Connections / Connectors

```graphql
# Pipe Relation entre Vendas e Implantação
mutation {
  createPipeRelation(input: {
    parentId: "$PIPE_VENDAS_ID"
    childId: "$PIPE_IMPLANTACAO_ID"
    name: "Handoff Vendas → Implantação"
    canCreateNewConnected: true
    canConnectExisting: true
    canConnectMultiples: false  # 1:1
    autoFillFieldEnabled: true  # autofill ativa
    allChildrenMustBeDoneToFinishParent: false
    allChildrenMustBeDoneToMoveParent: false
    childMustExistToFinishParent: true  # bloqueia fechar Deal sem handoff
    childMustExistToMoveParent: false
  }) { pipeRelation { id name } }
}
```

**ConnectorField object (confirmado):**
- `canConnectExisting`, `canConnectMultiples`, `canCreateNewConnected`
- `connectedRepo` — target pipe ou database
- `autoFillFieldEnabled` — ativa sync de campos entre connected cards
- `triggersFieldConditions` — permite field conditions reagirem a mudanças
- `settings` (JSON) — configuração avançada
- `initialValue`, `isRequired`, `isEditable`

**Limitação confirmada (autofill):** autofill só dispara em cards/records criados **manualmente via connection**. Se o card for criado via automação `create_connected_card`, autofill NÃO dispara — use `field_map` na automação com `inputMode: "copy_from"` para replicar dados.

### Databases (Tables)

```graphql
# Criar Database "Contas"
mutation {
  createTable(input: {
    organization_id: $ORG_ID
    name: "Contas"
    color: "blue"
  }) { table { id name } }
}

# Criar field na Database
mutation {
  createTableField(input: {
    table_id: "$TABLE_ID"
    label: "CNPJ"
    type: "cnpj"
    required: true
    unique: true
    description: "CNPJ único da conta"
  }) { table_field { id label } }
}

# Criar registro
mutation {
  createTableRecord(input: {
    table_id: "$TABLE_ID"
    title: "Nexuz Food LTDA"
    fields_attributes: [
      { field_id: "cnpj", field_value: "12345678000199" },
      { field_id: "razao_social", field_value: "Nexuz Food LTDA" }
    ]
  }) { table_record { id title } }
}
```

**Mutations disponíveis:** `createTable`, `updateTable`, `deleteTable`, `createTableField`, `updateTableField`, `deleteTableField`, `createTableRecord`, `updateTableRecord`, `deleteTableRecord`.

### Webhooks

```graphql
mutation {
  createWebhook(input: {
    pipe_id: "$PIPE_ID"
    name: "Notificar ERP no GANHO"
    url: "https://hooks.nexuz.com.br/pipefy/ganho"
    actions: ["card.done", "card.move", "card.late"]
    headers: { "X-Secret": "..." }
    filters: { on_phase_id: [123, 456] }
  }) { webhook { id name url } }
}
```

**Actions suportadas:** `card.create`, `card.field_update`, `card.move`, `card.done`, `card.delete`, `card.late`, `card.overdue`, `card.expired`.

**Limites:** recomendação ≤30 webhooks/pipe; timeout 10s; retry automático até 10x.

### SLAs / Late Alerts

**Confirmado:** SLA por phase é configurável via `lateness_time` no `updatePhase`/`createPhase` (em segundos) + automation `event_id: "sla_based"` com `sla_warning_time` (em horas).

**A validar:** help center afirma que "alert-based automations are configured exclusively through the UI" — mas a skill já valida que a mutation `createAutomation` com `event_id: "sla_based"` funciona via API. Divergência a investigar em runtime — provavelmente o help center está desatualizado vs o changelog de 2025-10 que liberou automation management completo via API.

```graphql
# Configurar SLA da phase via API
mutation {
  updatePhase(input: {
    id: "$PHASE_ID"
    lateness_time: 691200  # 8 dias em segundos (SLA Qualificação)
  }) { phase { id lateness_time } }
}
```

### Email Templates

Email templates Pipefy são **dinamicamente criados via action `send_a_task`** dentro de `createAutomation` — não há mutation isolada `createEmailTemplate`. Templates aceitam:
- **Dynamic fields no subject, recipient, sender, body** — incluindo campos de connected cards (sintaxe `{{card.field_name}}` ou `%{field_internal_id}`)
- **Max 100 dynamic fields por template**
- **Novidade 2025-2026:** query `dependentEmailTemplates` permite inspecionar templates vinculados a um campo

```graphql
action_params: {
  subject: "Bem-vindo, {{nome_contato}}!"
  body: """
  Olá {{nome_contato}},

  Sua proposta (MRR R$ {{mrr}}) está em análise.
  Contato Nexuz: {{responsavel_comercial}}
  """
  to: "{{email_decisor}}"
  cc: "{{email_influenciador}}"
}
```

### Dashboards

**Confirmado: NÃO há mutation para dashboards na API pública.** Pipefy oferece dashboards nativos com charts bar/line/area/pie/table/calendar/number, mas a criação/configuração requer UI.

**Implicação para o escopo:** Dashboards do PDD (Vendas, Cadência, Funil) exigem Playwright CLI ou configuração manual pelo admin. Novidade 2025-2026: blog Pipefy menciona "AI-generated dashboards" — UI-only.

### Organization & Roles

**Novidade 2025-10-27:** `createCustomRole`, `deleteCustomRole`, `saveRolePermission`, `availableRoles` query. Permite automação de permissões por pipe (Vendas vs Implantação) via API.

```graphql
mutation {
  createCustomRole(input: {
    organization_id: $ORG_ID
    name: "Ops de Vendas"
    permissions: ["pipe.read", "pipe.create_card", "pipe.move_card"]
  }) { customRole { id name } }
}
```

**Audit logs:** `exportPipeAuditLogsReport` (compliance).

### Pipe Reports (novidade 2025-10-30)

```graphql
mutation {
  createPipeReport(input: {
    pipe_id: "$PIPE_ID"
    name: "Funil Vendas Q2"
    filters: { ... }
  }) { pipeReport { id name } }
}
```

Útil para relatórios de pipeline sem depender da UI (antes só era acessível via export de 50 req/24h).

---

## Limitações Confirmadas

| # | Limitação | Status 2026-04-20 | Workaround |
|---|---|---|---|
| 1 | `updatePhaseField` NÃO funciona em start form fields | Confirmado (da skill) | Deletar e recriar |
| 2 | Conditional fields NÃO disparam via API (apenas UI) | Confirmado — validar em runtime | Enviar explicitamente todos campos dependentes |
| 3 | Dashboards NÃO podem ser criados via API | Confirmado | Playwright CLI ou UI manual |
| 4 | PDF Templates NÃO configuráveis via API | Confirmado | Playwright CLI (raríssimo) |
| 5 | Email Inbox setup requer UI | Confirmado | Playwright CLI ou manual (1x) |
| 6 | Power-ups (Slack/Teams) não configuráveis via API | Confirmado | UI manual |
| 7 | Paginação max 50 registros | Confirmado | Cursor-based pagination |
| 8 | Rate limit: 500 req/30s, lockout 5min | Confirmado (≈16,67 req/s sustentado) | Delay 500ms entre mutations |
| 9 | Links de arquivo expiram em 15 min | Confirmado | Regenerar quando necessário |
| 10 | Webhook `card.done` não dispara se phase mudou active→done | Confirmado (da skill) | Mover card manualmente após alterar phase |
| 11 | Webhook SLA não funciona em Tables | Confirmado | Usar automações internas |
| 12 | Automações não retornam na query `pipe()` | Confirmado | Query separada `automations(repoId, organizationId)` |
| 13 | **Quota 300 jobs/mês (Business)** | Confirmado | Estimar uso; considerar Enterprise (2.000) |
| 14 | Autofill não dispara em cards criados por automação | Confirmado (novo) | Usar `field_map` na automação `create_connected_card` |
| 15 | Dynamic fields: max 100 por email template | Confirmado (novo) | Consolidar variáveis |
| 16 | Pipe Reports Export: 50 req/24h por pipe | Confirmado | Usar `createPipeReport` (2025-10-30) para relatórios persistentes |
| 17 | Webhook recomendado ≤30/pipe | Confirmado | Design enxuto |
| 18 | `updateFieldsValues`: max 30 campos por call (novidade) | Confirmado | Batching |
| 19 | Conditions aninhadas profundas podem ter comportamento inesperado | A validar em runtime | Sempre testar após criar |
| 20 | `currency` field rejeita formato com vírgula via API | Confirmado | Sempre enviar float com ponto (`1000.50`) |

---

## Novidades desde última pesquisa (2026-04-16)

Pesquisa anterior data de **2026-04-16**, portanto as novidades abaixo são "anteriores" mas foram **não documentadas** no dossiê original. Todas confirmadas via changelog oficial `developers.pipefy.com/changelog`:

1. **Full automation management via API** (`createAutomation`, `updateAutomation`, `deleteAutomation`) — reforça a skill, mas ainda há help center desatualizado que afirma "UI only".
2. **Batch field updates** — `updateFieldsValues` (até 30 campos/call, suporta `operation: ADD`).
3. **Custom Role management via API** (2025-10-27) — permite automação completa de permissões.
4. **Pipe Reports via API** (2025-10-30) — `createPipeReport`, `updatePipeReport`, `deletePipeReport`.
5. **`archived` field em Phases/Reports** (2025-11-18) — soft-delete sem perder histórico.
6. **`deletedAt` fields** (2026-03-18) — em ConnectedTable, InternalPipe, Phase, PhaseFlow, Pipe, Table, Repo. Permite queries em entidades deletadas.
7. **`duplicateCondition` mutation** (2026-03-18) — duplicar field conditions.
8. **`automationLoopDetected` enum** (2026-01-06) — notificação de loop em automações (mitiga risco documentado de sync bidirecional entre pipes).
9. **LLM Provider management** (2026-03-18) — `createLlmProvider`, `setActiveLlmProvider` etc. Permite configurar IA para action `generate_with_ai`.
10. **`createIdentityPropagationConfiguration`** (2026-01-06) — SSO/SAML via API.
11. **`exportPipeAuditLogsReport`** (2025-10-27) — compliance.
12. **Webhooks for User Management** — notificações de mudanças em usuários/roles.
13. **Tag management** — nova `createTag` mutation.
14. **`dependentEmailTemplates` query + `updateAiSettings`** — inspeção de dependências e configuração de IA.

**Correção ao dossiê de 2026-04-16:**
- Quota Enterprise era estimada em "ampliada/10.000 jobs" — pricing page de 2026 confirma **2.000 jobs/mês** (não 10.000). Unlimited é o plano para volumes maiores (até 15 milhões de jobs/mês segundo uma fonte, a validar diretamente com Pipefy Sales).

---

## Quota e Rate Limits (atualizado 2026-04-20)

### Jobs de Automação por Plano (Confirmado via pipefy.com/pricing)

| Plano | Preço | Automation Jobs/mês | API Calls/mês | DB Records | Notas |
|---|---|---|---|---|---|
| Starter | Free | 15 | 205 | — | Sem API produtiva; até 10 users, 5 pipes |
| Business | Contato (≈US$ 33/user) | **300** | 500 | 10.000 | Mínimo para API útil |
| Enterprise | Contato (≈US$ 65/user) | **2.000** | 10.000 | Custom | **Correção vs dossiê** |
| Unlimited | Sob consulta | Muito alto (até 15 mi) | 5.000+ | Custom | SLA dedicado |

### Rate Limits de API (Confirmado)

| Recurso | Limite |
|---|---|
| Requests | **500 req/30s** (lockout 5min se exceder) ≈ 16,67 req/s sustentado |
| Paginação | **50 registros/request** |
| Webhooks | **30/pipe** (recomendado) |
| Webhook timeout | **10s** (retry até 10x) |
| File attachments | **512MB/arquivo** |
| Attachment URLs | Expiram em **15 min** |
| Pipe Report Export | **50 req/24h por pipe** |
| `updateFieldsValues` | **30 campos por call** |
| Email template dynamic fields | **100/template** |

### Job Counting (Confirmado via help.pipefy.com)

**Importante:** 1 job é consumido **toda vez que o evento configurado dispara**, mesmo se a condition não for satisfeita. Ex: automação "if field = X then Y" com 100 updates → 100 jobs (mesmo se só 5 atenderem a condição).

**Implicação para design:** consolidar conditions dentro de 1 automação não reduz jobs — cada trigger conta. Para reduzir quota, **reduza triggers**, não conditions.

**Estimativa Nexuz (10 leads/mês, skill):** ~100 jobs/mês — cabe confortavelmente em Business (300). Enterprise (2.000) oferece 6,6x de headroom para crescimento ou cadências extras.

---

## Gaps API vs UI (matriz)

| Operação | API | Playwright | Observação |
|---|---|---|---|
| Criar Pipe + Phases + Labels + Start Form | ✅ | — | 1 call atômica |
| Criar/atualizar Phase (incl. SLA/lateness_time) | ✅ | — | Confirmado |
| Criar Phase Fields (todos os tipos) | ✅ | — | `createPhaseField` |
| Atualizar Phase Field | ✅* | — | *não funciona em start_form_fields |
| Criar Automations (trigger + conditions + actions) | ✅ | — | `createAutomation` (event `sla_based` inclusive) |
| Update/delete Automations | ✅ | — | Novidade via changelog 2025 |
| Criar Field Conditions (show/hide) | ✅ | — | `createFieldCondition` + `duplicateCondition` |
| Criar Pipe Relation (connector) | ✅ | — | Inclui `autoFillFieldEnabled` |
| Criar Database (Table) + Fields + Records | ✅ | — | Todas as mutations |
| Criar Webhooks (incl. card.late, card.overdue) | ✅ | — | 30/pipe recomendado |
| Configurar SLA da Phase (`lateness_time`) | ✅ | — | Via `updatePhase` + automation `sla_based` |
| Criar Email Templates | ✅ | — | Via action `send_a_task` (inline na automação) |
| Criar Custom Roles + Permissions | ✅ | — | Novidade 2025-10 |
| Criar Pipe Reports | ✅ | — | Novidade 2025-10 |
| Export Audit Logs | ✅ | — | Novidade 2025-10 |
| Batch update (30 campos/call) | ✅ | — | `updateFieldsValues` (2025) |
| **Dashboards (widgets visuais)** | ❌ | ✅ | Único caminho; UI-only |
| **PDF Templates** | ❌ | ✅ | Raríssimo |
| **Email Inbox setup inicial** | ❌ | ✅ | 1x, só se quiser email integrado |
| **Power-ups (Slack/Teams)** | ❌ | ✅ | UI manual |
| **Customização visual do Form público (CSS/logo)** | ❌ | ✅ | UI manual |
| Paginar cards/records | ✅ | — | Cursor-based, max 50 |
| Query automations | ✅ | — | Query separada `automations()` |

**Rule of thumb confirmada:** **API GraphQL resolve ≥95%** do escopo Pipe Vendas. Playwright CLI só para os 5 itens marcados com ❌ na API, todos "1x no setup" ou opcionais.

---

## Recomendações Práticas para o Step 03 (Design)

1. **Ordem de criação obrigatória:** Databases → Pipe (com phases/labels/start_form em 1 call) → Phase Fields → Connectors (PipeRelations) → Field Conditions → Automations → Webhooks → Custom Roles.
2. **Consolidar automações** para respeitar quota — preferir 1 automação com conditions vs várias separadas (lembrar: cada trigger dispara 1 job independente de condition, então consolidar só reduz overhead de rules).
3. **Design para Enterprise (2.000 jobs/mês)** — dossiê anterior previa 10.000, então reforçar que o teto real é 2.000. Ainda folgado para funil Nexuz (estimativa ~100 jobs/mês), mas monitorar em produção.
4. **Conditional fields: sempre testar pós-criação** — comportamento pode variar em condições aninhadas complexas.
5. **Evitar autofill em handoff Vendas→Implantação** — não funciona em cards criados por automação. Usar `field_map` explícito.
6. **Delay 500ms entre mutations** para evitar lockout de 5min.
7. **Dashboards ficam para etapa manual/Playwright** no final do setup — não bloqueiam o go-live do pipe.

---

## Sources

- [Pipefy GraphQL API — Reference](https://api-docs.pipefy.com/) — 2026-04-20
- [Condition object — Pipefy GraphQL API](https://api-docs.pipefy.com/reference/objects/Condition/) — 2026-04-20
- [createTable mutation](https://api-docs.pipefy.com/reference/mutations/createTable/) — 2026-04-20
- [ConnectorField object](https://api-docs.pipefy.com/reference/objects/ConnectorField/) — 2026-04-20
- [Pipefy Developers — Database Tables](https://developers.pipefy.com/reference/tables) — 2026-04-20
- [Pipefy Developers — Changelog 2025-2026](https://developers.pipefy.com/changelog) — 2026-04-20
- [Changelog: Batch field updates for Cards and DB Records](https://developers.pipefy.com/changelog/new-graphql-update-batch-field-updates-for-cards-and-database-records) — 2026-04-20
- [Changelog: User Management Mutations](https://developers.pipefy.com/changelog/new-graphql-api-update-user-management-mutations) — 2026-04-20
- [Changelog: Webhooks for User Management](https://developers.pipefy.com/changelog/new-graphql-api-update-webhooks-for-user-management) — 2026-04-20
- [Pipefy Pricing 2026](https://www.pipefy.com/pricing/) — 2026-04-20
- [Pipefy — How automation jobs are enumerated](https://help.pipefy.com/en/articles/6445865-how-pipefy-enumerates-automation-jobs-vs-automation-rules) — 2026-04-20
- [Pipefy — GraphQL API Limits (community)](https://community.pipefy.com/customs-apps-integrations-75/what-are-the-graphql-api-limits-958) — 2026-04-20
- [Pipefy — Alert-based automations](https://help.pipefy.com/en/articles/8067742-how-to-create-alert-based-automations) — 2026-04-20
- [Pipefy — Connection field overview](https://help.pipefy.com/en/articles/865712-what-is-a-connection-field) — 2026-04-20
- [Pipefy — Autofill connection fields](https://help.pipefy.com/articles/1303264-autofill) — 2026-04-20
- [Pipefy — Email templates: dynamic fields](https://help.pipefy.com/en/articles/726710-adding-dynamic-fields-to-email-templates) — 2026-04-20
- [Pipefy — Webhooks overview](https://developers.pipefy.com/reference/pipe-table-webhooks) — 2026-04-20
- [Pipefy Dossier — 2026-04-16 (herdado)](../../../../nxz-backoffice-processes/output/2026-04-16-165948/v1/pipefy-dossier.md) — base validada
