# Pipefy GraphQL API — Recipes

## Authentication

```bash
TOKEN=$(grep '^PIPEFY_API_TOKEN=' .env | cut -d= -f2)
ORG_ID=$(grep '^PIPEFY_ORGANIZATION_ID=' .env | cut -d= -f2)

# Test connectivity
curl -s 'https://api.pipefy.com/graphql' \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ me { name email } }"}' | jq .
```

## Rate Limits

| Recurso | Limite |
|---------|--------|
| Requests | 500 a cada 30 segundos (lockout de 5 min se exceder) |
| Paginação | Max 50 registros por request |
| Webhooks | Max 30 por pipe |
| Anexos | 512MB por arquivo |
| Links de arquivo | Válidos por 15 minutos |
| Pipe Report Export | 25 requests em 24h por pipe |

**Recomendação:** delay de 500ms entre mutations.

---

## Read Operations

### List all pipes in organization
```graphql
{
  organization(id: $ORG_ID) {
    pipes { id name phases { id name } }
  }
}
```

### Get pipe details (full)
```graphql
{
  pipe(id: $PIPE_ID) {
    id name cards_count
    phases {
      id name done
      fields { id internal_id type label required description }
    }
    start_form_fields { id internal_id type label required }
    labels { id name color }
    webhooks { id name url }
  }
}
```

### Get cards with filters
```graphql
{
  cards(pipe_id: $PIPE_ID, first: 50) {
    edges {
      node {
        id title done
        current_phase { id name }
        fields { name value }
        assignees { name email }
      }
    }
    pageInfo { hasNextPage endCursor }
  }
}
```

### Get automations
```graphql
{
  automations(repoId: "$PIPE_ID", organizationId: "$ORG_ID", active: true) {
    edges {
      node { id name action_id event_id active }
    }
    totalCount
  }
}
```

---

## Create Operations

### Create Pipe (with phases, labels, start_form_fields — all in 1 call)
```graphql
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
      { label: "Telefone/WhatsApp", type_id: "phone", required: true },
      { label: "Origem", type_id: "select", required: true, options: ["Inbound", "Outbound", "Indicação"] },
      { label: "Reason to Call", type_id: "long_text", required: false }
    ]
  }) {
    pipe { id name phases { id name } }
  }
}
```

### Create Phase (additional)
```graphql
mutation {
  createPhase(input: {
    pipe_id: $PIPE_ID
    name: "Nutrição Ciclo 1"
    done: false
  }) {
    phase { id name }
  }
}
```

### Create Phase Field
```graphql
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

### Field types reference
- `short_text`, `long_text`, `number`, `currency`, `date`, `datetime`, `time`
- `email`, `phone`, `cpf`, `cnpj`
- `select` (dropdown), `radio_vertical`, `radio_horizontal`
- `checklist_vertical`, `checklist_horizontal`
- `attachment`, `assignee_select`, `label_select`
- `connector`, `due_date`, `statement`, `id`

### Create Label
```graphql
mutation {
  createLabel(input: {
    pipe_id: $PIPE_ID
    name: "Hot"
    color: "#FF0000"
  }) {
    label { id name color }
  }
}
```

### Create Pipe Relation (connector cross-pipe)
```graphql
mutation {
  createPipeRelation(input: {
    parent_id: $PARENT_PIPE_ID
    child_id: $CHILD_PIPE_ID
    name: "Implantação do Deal"
    can_create_connected_cards: true
    can_search_connected_cards: true
    can_connect_multiple_cards: false
    all_children_must_be_done_to_finish_parent: false
  }) {
    pipeRelation { id name }
  }
}
```

### Create Automation
```graphql
mutation {
  createAutomation(input: {
    name: "Alerta SLA Qualificação > 8 dias"
    action_id: "send_a_task"
    event_id: "sla_based"
    event_repo_id: "$PIPE_ID"
    action_repo_id: "$PIPE_ID"
    event_params: {
      phase_id: "$PHASE_QUALIFICACAO_ID"
      sla_warning_time: 192  # 8 dias em horas
    }
    action_params: {
      subject: "⚠️ Lead em Qualificação há mais de 8 dias"
      body: "O lead {{card.title}} está em Qualificação há mais de 8 dias."
      to: "{{card.assignees}}"
    }
    condition: {
      expressions: []
      expressions_structure: []
    }
  }) {
    automation { id name active }
  }
}
```

### Create Field Condition (conditional field)
```graphql
mutation {
  createFieldCondition(input: {
    phase_id: $PHASE_DESCARTE_ID
    name: "Mostrar campo Qual Concorrente"
    condition: {
      expressions: [{
        field_address: "motivo_descarte"
        operation: "equals"
        value: "Perdeu pra concorrente"
      }]
    }
    actions: [{
      phase_field_id: "$FIELD_QUAL_CONCORRENTE_ID"
      action_id: "show"
    }]
  }) {
    fieldCondition { id name }
  }
}
```

### Create Webhook
```graphql
mutation {
  createWebhook(input: {
    pipe_id: $PIPE_ID
    name: "Notificar ERP no GANHO"
    url: "https://hooks.nexuz.com.br/pipefy/ganho"
    actions: ["card.done"]
  }) {
    webhook { id name url }
  }
}
```

### Create Card
```graphql
mutation {
  createCard(input: {
    pipe_id: $PIPE_ID
    title: "Lead - Empresa XYZ"
    phase_id: $FIRST_PHASE_ID
    fields_attributes: [
      { field_id: "nome_contato", field_value: "João Silva" },
      { field_id: "empresa", field_value: "Empresa XYZ" },
      { field_id: "email", field_value: "joao@xyz.com" }
    ]
    label_ids: [$LABEL_INBOUND_ID]
  }) {
    card { id title }
  }
}
```

### Move Card
```graphql
mutation {
  moveCardToPhase(input: {
    card_id: $CARD_ID
    destination_phase_id: $PHASE_ID
  }) {
    card { id current_phase { name } }
  }
}
```

---

## Update Operations

### Update Pipe
```graphql
mutation {
  updatePipe(input: {
    id: $PIPE_ID
    name: "Vendas NXZ"
    anyone_can_create_card: true
  }) {
    pipe { id name }
  }
}
```

### Update Phase
```graphql
mutation {
  updatePhase(input: {
    id: $PHASE_ID
    name: "Novo Nome"
    done: true
  }) {
    phase { id name done }
  }
}
```

---

## Delete Operations

### Delete Phase
```graphql
mutation {
  deletePhase(input: { id: $PHASE_ID }) {
    success
  }
}
```

### Delete Webhook
```graphql
mutation {
  deleteWebhook(input: { id: $WEBHOOK_ID }) {
    success
  }
}
```

---

## Automation Event IDs

| Event ID | Descrição |
|----------|-----------|
| `card_created` | Card criado |
| `card_moved` | Card movido para phase |
| `card_left_phase` | Card saiu de phase |
| `field_updated` | Campo atualizado |
| `all_children_in_phase` | Todos os filhos em uma phase |
| `scheduler` | Recorrência (horário/diário/semanal/mensal) |
| `sla_based` | SLA/late alert |
| `manually_triggered` | Manual |

## Automation Action IDs

| Action ID | Descrição |
|-----------|-----------|
| `move_single_card` | Mover card para phase |
| `create_card` | Criar card/registro |
| `update_card_field` | Atualizar campo |
| `send_a_task` | Enviar email template |
| `generate_with_ai` | Gerar com IA |

## Condition Operators

`equals`, `not_equals`, `present`, `blank`, `string_contains`, `string_not_contains`,
`number_greater_than`, `number_less_than`, `date_is_today`, `date_is`, `date_is_after`, `date_is_before`
