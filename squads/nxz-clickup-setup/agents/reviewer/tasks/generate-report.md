---
task: "Gerar Relatório de Auditoria"
order: 2
input: |
  - audit_scores: Scores por critério
output: |
  - audit_report: Relatório completo com verdict
---

# Gerar Relatório de Auditoria

Compilar os scores em um relatório de auditoria completo com verdict, feedback detalhado
e path to approval.

## Process

1. Calcular score geral (média dos critérios)
2. Verificar hard rejection triggers (algum critério < 4/10)
3. Determinar verdict: APPROVE, CONDITIONAL APPROVE ou REJECT
4. Para cada critério:
   a. Se < 7: escrever "Required change" específico
   b. Se >= 7 mas < 10: escrever "Suggestion (non-blocking)"
   c. Identificar pelo menos 1 "Strength"
5. Se REJECT ou CONDITIONAL: gerar "Path to Approval" com ações numeradas
6. Formatar relatório no padrão de output

## Output Format

```
==============================
 REVIEW VERDICT: {verdict}
==============================

SCORING TABLE
...

DETAILED FEEDBACK
...

PATH TO APPROVAL (if applicable)
...
```

## Output Example

(See output-examples.md — Example 2)

## Quality Criteria

- [ ] Verdict consistente com scores
- [ ] Required changes específicos e acionáveis
- [ ] Pelo menos 1 Strength identificado
- [ ] Path to Approval presente quando não aprovado

## Veto Conditions

1. Verdict contradiz scores (ex: APPROVE com score < 7)
2. REJECT sem Path to Approval
