---
id: "squads/nxz-backoffice-processes/agents/mario-mapeador/tasks/design-to-be"
name: "Desenhar TO-BE"
order: 2
agent: "mario-mapeador"
inputs:
  - squads/nxz-backoffice-processes/output/_work/as-is-flow.md
  - squads/nxz-backoffice-processes/output/briefing-analysis.md
outputs:
  - squads/nxz-backoffice-processes/output/_work/to-be-flow.md
  - squads/nxz-backoffice-processes/output/_work/traceability.md
---

# Desenhar TO-BE

Redesenhar o processo eliminando waste, consolidando handoffs e substituindo checks manuais por capabilities automatizadas (sempre descritas como comportamento, nunca como produto). Adicionar controles preventivos e detectivos onde os pain points justificarem. Produzir uma traceability table que rastreia cada atividade do AS-IS para o TO-BE com classificação keep / remove / transform / add e justificativa curta. Declarar as premissas de capacidade organizacional e dado que o TO-BE assume.

## Process

1. **Ler AS-IS + critérios TO-BE do briefing** — extrair cycle time alvo, first-pass yield alvo, controles exigidos, handoffs a eliminar.
2. **Classificar cada atividade AS-IS** — para cada A-XX do AS-IS decidir: `keep` (permanece como está), `remove` (elimina — waste puro), `transform` (muda lane, forma ou dado) ou será substituída por um `add` novo.
3. **Desenhar o TO-BE com atividades T-XX** — lanes reorganizadas, atividades em verbo + objeto, gateways explícitos, handoffs consolidados. Capabilities automatizadas descritas como "Validação automatizada de X", nunca como produto.
4. **Adicionar controles onde os pain points exigem** — preventivos (bloqueiam entrada inválida antes de avançar) ou detectivos (detectam desvio depois e disparam exceção).
5. **Anotar cycle time alvo** — em cada atividade-chave do TO-BE, registrar o tempo esperado e comparar com o AS-IS.
6. **Montar traceability table** — uma linha por atividade TO-BE, declarando origem AS-IS e justificativa.
7. **Listar premissas explícitas** — o que precisa ser verdade para o TO-BE funcionar (capacidade de papel, qualidade de dado upstream, política aprovada, etc.).

## Output Format

```yaml
to_be:
  process_name: string
  trigger: string
  end_events: [string]
  lanes:
    - role: string
      activities:
        - id: "T-XX"
          name: "verbo + objeto"
          cycle_time_target: "Xh|Xd"
          control_type: "preventive|detective|null"
          capability_required: string   # descrição agnóstica
  gateways:
    - id: "GT-XX"
      after_activity: "T-XX"
      question: string
      branches:
        - condition: string
          next: "T-XX|EXT-XX|end:<name>"
  exceptions:
    - id: "EXT-XX"
      trigger: string
      handled_by_lane: string
      treatment: string
      returns_to: "T-XX|end:<name>"

traceability:
  - as_is_id: "A-XX|null"
    to_be_id: "T-XX|null"
    classification: "keep|remove|transform|add"
    justification: string               # 1 linha

assumptions:
  - id: "ASM-XX"
    statement: string
    owner: string                       # quem valida a premissa
```

## Output Example

```yaml
to_be:
  process_name: "Pagamento a fornecedor (TO-BE)"
  trigger: "Fatura recebida em canal estruturado de AP"
  end_events: ["Pagamento liquidado", "Fatura recusada com motivo registrado"]
  lanes:
    - role: "Requester"
      activities:
        - id: "T-01"
          name: "Submeter fatura com OC vinculada"
          cycle_time_target: "10min"
          control_type: "preventive"
          capability_required: "Canal estruturado que exige OC no momento da submissão"
    - role: "Analista AP"
      activities:
        - id: "T-02"
          name: "Revisar exceções sinalizadas"
          cycle_time_target: "15min"
          control_type: "detective"
          capability_required: "Fila de exceções priorizada por data de vencimento"
        - id: "T-03"
          name: "Lançar fatura no razão"
          cycle_time_target: "10min"
          control_type: null
          capability_required: "Integração de lançamento a partir de fatura validada"
    - role: "Aprovador"
      activities:
        - id: "T-04"
          name: "Aprovar pagamento dentro de SLA"
          cycle_time_target: "até 24h"
          control_type: null
          capability_required: "Notificação com SLA visível e escalonamento automático"
    - role: "Tesouraria"
      activities:
        - id: "T-05"
          name: "Liquidar pagamento"
          cycle_time_target: "4h"
          control_type: null
          capability_required: "Visão consolidada de pagamentos aprovados por data"
  gateways:
    - id: "GT-01"
      after_activity: "T-01"
      question: "Fatura passou na validação automatizada de completude?"
      branches:
        - condition: "Sim"
          next: "T-04"
        - condition: "Não"
          next: "T-02"
    - id: "GT-02"
      after_activity: "T-04"
      question: "Aprovador respondeu em até 24h?"
      branches:
        - condition: "Sim"
          next: "T-05"
        - condition: "Não"
          next: "EXT-01"
  exceptions:
    - id: "EXT-01"
      trigger: "SLA de 24h expirado no aprovador"
      handled_by_lane: "Analista AP"
      treatment: "Escalonamento automático ao backup de aprovação"
      returns_to: "T-04"
    - id: "EXT-02"
      trigger: "Fatura rejeitada por validação automatizada"
      handled_by_lane: "Requester"
      treatment: "Devolução com motivo estruturado"
      returns_to: "T-01"
    - id: "EXT-03"
      trigger: "Fundo insuficiente"
      handled_by_lane: "Tesouraria"
      treatment: "Reter pagamento e alertar Controladoria"
      returns_to: "T-05"

traceability:
  - as_is_id: "A-01"
    to_be_id: "T-01"
    classification: "transform"
    justification: "Submissão passa a exigir OC vinculada (controle preventivo)"
  - as_is_id: "A-02"
    to_be_id: null
    classification: "remove"
    justification: "Conferência manual substituída por validação automatizada"
  - as_is_id: null
    to_be_id: "T-02"
    classification: "add"
    justification: "Nova atividade detectiva para tratar apenas exceções"
  - as_is_id: "A-03"
    to_be_id: "T-03"
    classification: "keep"
    justification: "Lançamento permanece sob Analista AP, com input já validado"
  - as_is_id: "A-04"
    to_be_id: "T-04"
    classification: "transform"
    justification: "Aprovação passa a ter SLA de 24h com escalonamento automático"
  - as_is_id: "A-05"
    to_be_id: "T-05"
    classification: "keep"
    justification: "Liquidação permanece na Tesouraria"

assumptions:
  - id: "ASM-01"
    statement: "Requester tem acesso a OCs geradas antes da fatura chegar"
    owner: "Área de Compras"
  - id: "ASM-02"
    statement: "Backup de aprovação está formalmente designado por política"
    owner: "Controladoria"
  - id: "ASM-03"
    statement: "Capability de validação automatizada cobre CNPJ, valor e OC"
    owner: "Paula Processo (implementação)"
```

## Quality Criteria

1. Toda atividade AS-IS aparece na traceability com classificação keep / remove / transform / add e justificativa.
2. Toda atividade TO-BE que não veio do AS-IS está marcada como `add` com motivo claro.
3. Cycle time target declarado nos passos-chave e coerente com critérios do briefing.
4. Controles (preventivos ou detectivos) endereçam pain points nomeados no AS-IS.
5. Premissas listadas explicitamente com owner responsável por validar.

## Veto Conditions

- **VETO** se qualquer atividade do TO-BE menciona produto, ferramenta ou UI — violação de tool-agnostic.
- **VETO** se a traceability omite alguma atividade do AS-IS — rastreabilidade incompleta.
- **VETO** se o TO-BE não apresenta pelo menos um controle endereçando o pain point de maior cycle time do AS-IS.
