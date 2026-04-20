# Pipefy — Automation Patterns

## Padrões validados para o funil de vendas

### 1. SLA Alert (tempo em etapa)
```graphql
# Alerta quando card está na phase por mais de X horas
mutation {
  createAutomation(input: {
    name: "SLA Qualificação > 8 dias"
    event_id: "sla_based"
    action_id: "send_a_task"
    event_repo_id: "$PIPE_ID"
    action_repo_id: "$PIPE_ID"
    event_params: {
      phase_id: "$PHASE_ID"
      sla_warning_time: 192  # horas (8 dias × 24h)
    }
    action_params: {
      subject: "⚠️ {{card.title}} - SLA Qualificação"
      body: "Lead há mais de 8 dias em Qualificação. Decidir: Nutrição ou Descarte."
      to: "{{card.assignees}}"
    }
  }) { automation { id } }
}
```

### 2. Move automático (campo atualizado → mover card)
```graphql
# Quando Pagamento=true E Contrato=true → mover para GANHO
mutation {
  createAutomation(input: {
    name: "Auto-GANHO: pagamento + contrato"
    event_id: "field_updated"
    action_id: "move_single_card"
    event_repo_id: "$PIPE_ID"
    action_repo_id: "$PIPE_ID"
    event_params: {
      field_id: "$FIELD_PAGAMENTO_ID"
    }
    action_params: {
      phase_id: "$PHASE_GANHO_ID"
    }
    condition: {
      expressions: [
        { structure_id: 0, field_address: "pagamento_confirmado", operation: "equals", value: "true" },
        { structure_id: 1, field_address: "contrato_assinado", operation: "equals", value: "true" }
      ]
      expressions_structure: [[0, 1]]  # AND
    }
  }) { automation { id } }
}
```

### 3. Create connected card (handoff cross-pipe)
```graphql
# No GANHO → criar card no Pipe Implantação
mutation {
  createAutomation(input: {
    name: "Handoff: criar card Implantação"
    event_id: "card_moved"
    action_id: "create_card"
    event_repo_id: "$PIPE_VENDAS_ID"
    action_repo_id: "$PIPE_IMPLANTACAO_ID"
    event_params: {
      to_phase_id: "$PHASE_GANHO_ID"
    }
    action_params: {
      title: "Implantação - {{card.title}}"
      phase_id: "$FIRST_PHASE_IMPLANTACAO_ID"
      field_map: [
        { fieldId: "$FIELD_MODULOS", inputMode: "copy_from", value: "%{modulos_contratados}" },
        { fieldId: "$FIELD_MRR", inputMode: "copy_from", value: "%{mrr}" }
      ]
    }
  }) { automation { id } }
}
```

### 4. Email automático (cadência)
```graphql
# D+3 Proposta: follow-up automático
mutation {
  createAutomation(input: {
    name: "Follow-up proposta D+3"
    event_id: "sla_based"
    action_id: "send_a_task"
    event_repo_id: "$PIPE_ID"
    action_repo_id: "$PIPE_ID"
    event_params: {
      phase_id: "$PHASE_PROPOSTA_ID"
      sla_warning_time: 72  # 3 dias
    }
    action_params: {
      subject: "Sua proposta Nexuz - acompanhamento"
      body: "Olá {{nome_contato}}, passando para verificar se recebeu nossa proposta..."
      to: "{{email}}"
    }
  }) { automation { id } }
}
```

### 5. Campo obrigatório condicional (motivo descarte)
```graphql
# Mostrar "Qual concorrente" quando motivo = "Perdeu pra concorrente"
mutation {
  createFieldCondition(input: {
    phase_id: "$PHASE_DESCARTE_ID"
    name: "Mostrar Qual Concorrente"
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
  }) { fieldCondition { id } }
}
```

### 6. Descarte automático D+67 Nutrição
```graphql
# Card em Nutrição há 67 dias → mover para DESCARTE
mutation {
  createAutomation(input: {
    name: "Descarte automático Nutrição D+67"
    event_id: "sla_based"
    action_id: "move_single_card"
    event_repo_id: "$PIPE_NUTRICAO_ID"
    action_repo_id: "$PIPE_NUTRICAO_ID"
    event_params: {
      phase_id: "$PHASE_NUTRICAO_ID"
      sla_warning_time: 1608  # 67 dias × 24h
    }
    action_params: {
      phase_id: "$PHASE_DESCARTE_NUTRICAO_ID"
    }
  }) { automation { id } }
}
```

## Estimativa de quota

Para calcular jobs/mês de uma automação:

| Tipo | Fórmula estimativa |
|---|---|
| SLA alert | (cards ativos na phase / SLA em dias) × 30 |
| Card moved trigger | movimentações estimadas por mês |
| Field updated trigger | atualizações estimadas por mês |
| Scheduler (daily) | 30 jobs/mês |
| Scheduler (weekly) | 4-5 jobs/mês |

**Exemplo para funil Nexuz (estimativa conservadora com 10 leads/mês):**
- SLA alerts (6 phases × ~3 disparos/mês): ~18 jobs
- Move automático GANHO: ~3 jobs
- E-mails de cadência Qualificação: ~40 jobs (4 toques × 10 leads)
- E-mails de cadência Proposta: ~15 jobs
- E-mails de cadência Nutrição: ~20 jobs
- Handoff para Implantação: ~3 jobs
- Descarte automático D+67: ~2 jobs
- **Total estimado: ~100 jobs/mês** (dentro dos 300 do Business)

## Conditions — AND vs OR

```json
// AND: ambas as condições devem ser verdadeiras
"expressions_structure": [[0, 1]]

// OR: qualquer condição é suficiente
"expressions_structure": [[0], [1]]

// Complex: (A AND B) OR C
"expressions_structure": [[0, 1], [2]]
```
