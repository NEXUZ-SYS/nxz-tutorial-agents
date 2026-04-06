---
execution: inline
agent: squads/nexuz-revenue-analysis/agents/analyst
inputFile: squads/nexuz-revenue-analysis/output/validacao-bruta.csv
outputFile: squads/nexuz-revenue-analysis/output/relatorio-receita.md
---

# Step 05 — Cross-Reference Analysis

**Agent:** André Análise
**Goal:** Cross-reference customers against subscriptions and payments, classify each customer into revenue categories, and build a full analytical report.

---

## Context Files

- `squads/nexuz-revenue-analysis/agents/analyst/domain-framework.md` — Category definitions, classification rules, and revenue logic
- `squads/nexuz-revenue-analysis/agents/analyst/quality-criteria.md` — Thresholds and acceptance criteria for the report
- `squads/nexuz-revenue-analysis/agents/analyst/output-examples.md` — Reference examples of complete, well-formed revenue reports

---

## Tasks

### Task 1: cross-reference-analysis

1. Load `validacao-bruta.csv`
2. Group rows by `customer_id`
3. For each customer, evaluate:
   - Total amount received (sum of `payment_value` where `payment_status` IN [RECEIVED, CONFIRMED])
   - Total amount overdue (sum of `payment_value` where `payment_status` = OVERDUE)
   - Active subscriptions count
   - Last payment date
4. Classify each customer into one of the following categories (per `domain-framework.md`):
   - **Ativo Regular** — Has active subscription and no overdue payments
   - **Ativo com Inadimplência** — Has active subscription and 1+ overdue payments
   - **Churn Recente** — Subscription cancelled or expired in last 90 days
   - **Inativo** — No subscription activity in last 180+ days
   - **Novo Cliente** — First payment within last 30 days
5. Compute aggregate metrics:
   - Total MRR (Monthly Recurring Revenue)
   - Total overdue amount
   - Churn rate (churned / total active last month)
   - Average revenue per customer

### Task 2: build-report

Using the classification output from Task 1, build a structured Markdown report at `output/relatorio-receita.md`.

---

## Process Steps

1. Load and parse CSV
2. Build customer profiles (group by customer_id, aggregate payments)
3. Apply classification rules per domain-framework.md
4. Compute aggregate KPIs
5. Write executive summary section
6. Write per-category breakdowns with customer lists and totals
7. Write KPI summary table
8. Write anomaly section (customers with unusual patterns)
9. Finalize and write `relatorio-receita.md`

---

## Output Example

```markdown
# Relatório de Receita — Nexuz

**Data de referência:** 2026-04-06
**Período analisado:** Últimos 12 meses

## Sumário Executivo

- Total de clientes analisados: 1,247
- MRR Total: R$ 187.430,00
- Inadimplência total: R$ 23.180,00
- Taxa de churn (últimos 30 dias): 3,2%

## Categorias de Clientes

### Ativo Regular (892 clientes — R$ 156.200,00 MRR)

| Cliente | Valor Mensal | Último Pagamento |
|---------|-------------|-----------------|
| Empresa Alfa Ltda | R$ 299,00 | 2026-03-15 |
| Beta Comércio ME | R$ 599,00 | 2026-03-25 |

### Ativo com Inadimplência (134 clientes — R$ 18.400,00 em aberto)
...

### Churn Recente (87 clientes)
...

### Inativo (198 clientes)
...

### Novo Cliente (36 clientes)
...

## KPIs

| Métrica | Valor |
|---------|-------|
| MRR Total | R$ 187.430,00 |
| Inadimplência | R$ 23.180,00 |
| Churn Rate | 3,2% |
| ARPU | R$ 150,31 |

## Anomalias Detectadas

- 3 clientes com pagamentos duplicados no mesmo mês
- 12 clientes com assinatura ativa mas sem pagamentos nos últimos 60 dias
```

---

## Quality Criteria

- Every customer in the CSV must be classified into exactly one category
- MRR calculation must only include ACTIVE subscriptions
- Overdue totals must only include OVERDUE payments
- Report must include executive summary, all category sections, KPI table, and anomaly section
- No customer may appear in more than one category
- All monetary values formatted as `R$ X.XXX,XX`
