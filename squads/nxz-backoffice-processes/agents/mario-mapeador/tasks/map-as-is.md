---
id: "squads/nxz-backoffice-processes/agents/mario-mapeador/tasks/map-as-is"
name: "Mapear AS-IS"
order: 1
agent: "mario-mapeador"
inputs:
  - squads/nxz-backoffice-processes/output/briefing-analysis.md
  - gap-resolutions (step-03)
outputs:
  - squads/nxz-backoffice-processes/output/_work/as-is-flow.md
---

# Mapear AS-IS

Produzir o retrato fiel do estado atual do processo em formato swimlane narrativo, com lanes por papel, atividades no formato verbo + objeto, gateways explícitos, caminhos de exceção e anotações de tempo onde disponível. Se o briefing indicar processo novo (sem AS-IS existente), esta task produz um **Problem baseline map** — representação em swimlane da situação atual de dor: quem sofre, onde o handoff quebra, qual dado falta.

## Process

1. **Ler briefing + gap resolutions** — extrair: papéis envolvidos, trigger do processo, outputs esperados, dores nomeadas, exceções mencionadas, tempos citados.
2. **Listar papéis e declarar lanes** — uma lane por papel organizacional distinto. Se o briefing diz "analista e assistente fazem", virar duas lanes, não uma.
3. **Traçar happy path na ordem real** — sequence flow do start event até um end event, atividades em verbo + objeto, cada decisão substituída por gateway nomeado.
4. **Adicionar no mínimo 3 caminhos de exceção** — cada exceção (EX-01, EX-02, ...) com: trigger, lane que trata, retorno ao fluxo ou end event alternativo.
5. **Anotar cycle/wait time onde mensurável** — pelo menos nos 3 passos mais lentos ou mais suspeitos de gargalo, mesmo como estimativa.
6. **Mapear pain points ao diagrama** — linkar cada dor citada pela Ana a uma atividade ou handoff específico do AS-IS.
7. **Walk-through mental com executor** — reler o fluxo do ponto de vista de quem executa; se algum passo não bate com a realidade descrita no briefing, ajustar antes de entregar.

## Output Format

```yaml
as_is:
  process_name: string
  trigger: string                      # start event
  end_events: [string]                 # pode haver múltiplos
  lanes:
    - role: string
      activities:
        - id: "A-XX"
          name: "verbo + objeto"
          cycle_time: "Xh|Xd|n/a"
          wait_time: "Xh|Xd|n/a"
          pain_point_ref: "P-XX|null"  # link ao briefing da Ana
  gateways:
    - id: "G-XX"
      after_activity: "A-XX"
      question: string
      branches:
        - condition: string
          next: "A-XX|EX-XX|end:<name>"
  exceptions:
    - id: "EX-XX"
      trigger: string
      handled_by_lane: string
      treatment: string
      returns_to: "A-XX|end:<name>"
  pain_points_mapped:
    - pain_id: "P-XX"                  # do briefing da Ana
      location: "A-XX|G-XX|handoff:A-XX→A-YY"
      symptom: string
```

## Output Example

```yaml
as_is:
  process_name: "Pagamento a fornecedor"
  trigger: "Fatura recebida no e-mail de AP"
  end_events: ["Pagamento liquidado", "Fatura recusada"]
  lanes:
    - role: "Requester (solicitante da compra)"
      activities:
        - id: "A-01"
          name: "Encaminhar fatura ao AP"
          cycle_time: "15min"
          wait_time: "até 2d"
          pain_point_ref: "P-03"
    - role: "Analista AP"
      activities:
        - id: "A-02"
          name: "Conferir dados da fatura"
          cycle_time: "30min"
          wait_time: "n/a"
          pain_point_ref: "P-01"
        - id: "A-03"
          name: "Lançar fatura no razão"
          cycle_time: "20min"
          wait_time: "n/a"
          pain_point_ref: null
    - role: "Aprovador"
      activities:
        - id: "A-04"
          name: "Aprovar pagamento"
          cycle_time: "10min"
          wait_time: "até 5d"
          pain_point_ref: "P-02"
    - role: "Tesouraria"
      activities:
        - id: "A-05"
          name: "Liquidar pagamento"
          cycle_time: "10min"
          wait_time: "1d"
          pain_point_ref: null
  gateways:
    - id: "G-01"
      after_activity: "A-02"
      question: "Fatura aprovada na conferência?"
      branches:
        - condition: "Sim"
          next: "A-03"
        - condition: "Não — divergência"
          next: "EX-01"
    - id: "G-02"
      after_activity: "A-04"
      question: "Aprovador respondeu em até 48h?"
      branches:
        - condition: "Sim"
          next: "A-05"
        - condition: "Não"
          next: "EX-02"
  exceptions:
    - id: "EX-01"
      trigger: "Divergência em valor, CNPJ ou OC"
      handled_by_lane: "Analista AP"
      treatment: "Devolver fatura ao Requester com motivo"
      returns_to: "A-01"
    - id: "EX-02"
      trigger: "Aprovador indisponível > 48h"
      handled_by_lane: "Analista AP"
      treatment: "Escalar ao backup de aprovação"
      returns_to: "A-04"
    - id: "EX-03"
      trigger: "Fundo insuficiente na conta pagadora"
      handled_by_lane: "Tesouraria"
      treatment: "Reter pagamento e alertar Controladoria"
      returns_to: "A-05"
  pain_points_mapped:
    - pain_id: "P-01"
      location: "A-02"
      symptom: "30% das faturas voltam por falta de OC vinculada"
    - pain_id: "P-02"
      location: "A-04"
      symptom: "wait time médio de 3,2 dias no aprovador"
    - pain_id: "P-03"
      location: "handoff:A-01→A-02"
      symptom: "faturas perdidas em caixa de e-mail compartilhada"
```

## Quality Criteria

1. Happy path completo + no mínimo 3 exceções nomeadas com trigger, tratamento e retorno.
2. Cada atividade vive em exatamente uma lane; cada decisão em gateway explícito.
3. Todo pain point citado pela Ana está linkado a uma atividade, gateway ou handoff específico.
4. Zero menção a produto, software ou UI no output.
5. Naming consistente: mesmo verbo para mesma ação.

## Veto Conditions

- **VETO** se o briefing não identifica claramente os papéis envolvidos — dispara checkpoint de volta para a Ana antes de mapear.
- **VETO** se o AS-IS apresenta menos de 3 exceções nomeadas para um processo operacional de rotina — indica mapeamento idealizado, não real.
- **VETO** se qualquer atividade aparece em mais de uma lane — viola o princípio de ownership único.
