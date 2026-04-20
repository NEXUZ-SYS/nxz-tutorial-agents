---
id: "squads/nxz-backoffice-processes/agents/mario-mapeador/tasks/validate-flow-coherence"
name: "Validar coerência do fluxo"
order: 3
agent: "mario-mapeador"
inputs:
  - squads/nxz-backoffice-processes/output/_work/as-is-flow.md
  - squads/nxz-backoffice-processes/output/_work/to-be-flow.md
  - squads/nxz-backoffice-processes/output/_work/traceability.md
outputs:
  - squads/nxz-backoffice-processes/output/process-flow.md
---

# Validar coerência do fluxo

Rodar oito checks estruturais sobre AS-IS e TO-BE, emitindo o flow coherence report com status PASS/FAIL e finding por check. Em seguida, montar o `process-flow.md` final — artefato consolidado que combina AS-IS, TO-BE, traceability e coherence report em um único documento pronto para a Paula Processo consumir no step-05.

## Process

1. **Check 1 — Gateway exhaustiveness** — para cada gateway, verificar que as condições das branches são mutuamente exclusivas (nenhuma entrada bate em duas) e exaustivas (toda entrada bate em pelo menos uma).
2. **Check 2 — Handoff symmetry** — para cada sequence flow entre lanes, verificar que o dado/evento que sai da atividade A corresponde, em formato e conteúdo, ao que a atividade B espera receber.
3. **Check 3 — Zero orphan steps** — toda atividade alcançável a partir do start event e toda atividade tem pelo menos uma saída (sequence flow ou end event).
4. **Check 4 — Zero loops sem exit** — todo loop de retrabalho ou retry tem condição explícita de saída (limite de tentativas, escalonamento, end event de falha).
5. **Check 5 — Happy path + ≥ 3 exceções** — tanto AS-IS quanto TO-BE atendem ao mínimo.
6. **Check 6 — Naming consistency** — mesmo verbo canônico para mesma ação ao longo de todo o diagrama (AS-IS e TO-BE).
7. **Check 7 — Lane ownership** — cada atividade em exatamente uma lane.
8. **Check 8 — Zero tool-brand contamination** — busca textual por nomes de produto/software retorna vazio em AS-IS, TO-BE, traceability e assumptions.
9. **Montar `process-flow.md`** — consolidar AS-IS + TO-BE + traceability + coherence report em documento único, com sumário executivo no topo (processo, owner, status de cada check, principais deltas do redesenho).

## Output Format

```yaml
coherence_report:
  process_name: string
  checks:
    - id: "C-01"
      name: "Gateway exhaustiveness"
      status: "PASS|FAIL"
      finding: string
    - id: "C-02"
      name: "Handoff symmetry"
      status: "PASS|FAIL"
      finding: string
    # ... C-03 a C-08
  summary:
    total_checks: 8
    passed: int
    failed: int
    blockers: [string]                 # findings que impedem entrega ao step-05

process_flow_assembly:
  file: "squads/nxz-backoffice-processes/output/process-flow.md"
  sections:
    - "1. Sumário executivo"
    - "2. AS-IS (swimlane narrativo)"
    - "3. TO-BE (swimlane narrativo)"
    - "4. Traceability AS-IS → TO-BE"
    - "5. Premissas do TO-BE"
    - "6. Flow coherence report"
```

## Output Example

```yaml
coherence_report:
  process_name: "Pagamento a fornecedor"
  checks:
    - id: "C-01"
      name: "Gateway exhaustiveness"
      status: "PASS"
      finding: "G-01, G-02, GT-01 e GT-02 têm branches mutuamente exclusivas e exaustivas"
    - id: "C-02"
      name: "Handoff symmetry"
      status: "FAIL"
      finding: "Handoff T-01→T-04 assume campo 'centro de custo' que não é exigido em T-01; ajustar capability de T-01 ou aceitar default em T-04"
    - id: "C-03"
      name: "Zero orphan steps"
      status: "PASS"
      finding: "Todas as atividades A-01..A-05 e T-01..T-05 são alcançáveis e têm saída"
    - id: "C-04"
      name: "Zero loops sem exit"
      status: "PASS"
      finding: "Loop EXT-02 → T-01 tem exit implícito no end event 'Fatura recusada'; EXT-01 tem escalonamento após SLA"
    - id: "C-05"
      name: "Happy path + ≥ 3 exceções"
      status: "PASS"
      finding: "AS-IS com EX-01/02/03; TO-BE com EXT-01/02/03"
    - id: "C-06"
      name: "Naming consistency"
      status: "FAIL"
      finding: "AS-IS usa 'Conferir' em A-02 e 'Validar' em EX-01 para a mesma ação; padronizar para 'Validar'"
    - id: "C-07"
      name: "Lane ownership"
      status: "PASS"
      finding: "Cada atividade em exatamente uma lane, AS-IS e TO-BE"
    - id: "C-08"
      name: "Zero tool-brand contamination"
      status: "PASS"
      finding: "Busca por nomes de produto em AS-IS, TO-BE, traceability e assumptions retornou vazio"
  summary:
    total_checks: 8
    passed: 6
    failed: 2
    blockers:
      - "C-02: handoff T-01→T-04 precisa ser consertado antes de entregar ao step-05"
      - "C-06: naming inconsistente precisa ser padronizado"

process_flow_assembly:
  file: "squads/nxz-backoffice-processes/output/process-flow.md"
  sections:
    - "1. Sumário executivo — processo, owner, status dos 8 checks, deltas principais"
    - "2. AS-IS — swimlane narrativo completo com pain points mapeados"
    - "3. TO-BE — swimlane narrativo com controles e cycle time targets"
    - "4. Traceability — tabela AS-IS → TO-BE com classificação e justificativa"
    - "5. Premissas — ASM-01..ASM-03 com owner"
    - "6. Coherence report — 8 checks detalhados + blockers"
```

## Quality Criteria

1. Os 8 checks executados e reportados com status e finding — zero check pulado.
2. Qualquer FAIL vira blocker explícito ou traz justificativa de por que não impede o step-05.
3. `process-flow.md` final tem as 6 seções na ordem definida, sem menção a produto/software.

## Veto Conditions

- **VETO** se qualquer check C-01 a C-08 aparecer como FAIL sem blocker declarado nem justificativa — coherence report incompleto.
- **VETO** se `process-flow.md` for entregue com algum blocker não resolvido — Paula Processo não consegue partir de diagrama incoerente.
