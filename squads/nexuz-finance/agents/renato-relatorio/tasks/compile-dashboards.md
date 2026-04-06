---
id: compile-dashboards
title: Compilar Dashboards Operacionais
agent: renato-relatorio
order: 1
depends_on: []
input:
  - ricardo-receita/analyze-mrr
  - ricardo-receita/analyze-churn
  - ricardo-receita/analyze-unit-economics
  - flavia-fluxo/analyze-cashflow
  - flavia-fluxo/analyze-dre
output: dashboards-operacionais.md
---

# Compilar Dashboards Operacionais

Compilar todos os dashboards financeiros em um relatório operacional unificado para o time financeiro.

---

## Process

1. **Coletar outputs** de todos os agentes predecessores (Ricardo Receita e Flavia Fluxo)
2. **Validar consistência** — verificar que MRR final bate com receita da DRE, que fluxo de caixa é coerente com resultado operacional
3. **Montar MRR Waterfall** — New, Expansion, Contraction, Churn com valores e % do MRR inicial
4. **Montar Cohort de Churn** — matriz por safra mensal (últimos 6 meses), com taxa de retenção por mês
5. **Montar Fluxo de Caixa** — entradas por categoria, saídas por categoria, saldo acumulado, projeção 3 meses
6. **Montar DRE Resumida** — receita bruta, deduções, receita líquida, custos, despesas, EBITDA, resultado. Com variance vs mês anterior e vs orçamento
7. **Montar Unit Economics** — LTV, CAC, Payback, LTV:CAC, margem bruta por cliente. Com evolução últimos 6 meses
8. **Montar Aging de Inadimplência** — faixas 0-30, 31-60, 61-90, 90+ dias. Valor total e % da receita
9. **Aplicar semáforo** (🟢🟡🔴) a cada KPI conforme tabela de benchmarks
10. **Adicionar notas explicativas** para variações superiores a 10% vs mês anterior

---

## Output Format

```markdown
# 📊 Dashboards Operacionais — [Mês/Ano]
**Gerado em**: [data]
**Período**: [mês referência]

## 1. MRR Waterfall
[Tabela com componentes e valores]

## 2. Cohort de Churn
[Matriz safra x mês de vida]

## 3. Fluxo de Caixa
[Tabela entradas/saídas/saldo + projeção]

## 4. DRE Resumida
[Tabela com variance analysis]

## 5. Unit Economics
[Tabela com evolução 6 meses]

## 6. Aging de Inadimplência
[Tabela por faixa + total]

## Notas e Observações
[Explicações para variações relevantes]
```

---

## Output Example

```markdown
## 1. MRR Waterfall — Março 2026
| Componente | Valor | % MRR Inicial | Status |
|------------|-------|---------------|--------|
| MRR Inicial | R$ 460.000 | 100,0% | — |
| + New MRR | R$ 35.000 | 7,6% | 🟢 |
| + Expansion | R$ 18.000 | 3,9% | 🟢 |
| - Contraction | -R$ 12.000 | -2,6% | 🟡 |
| - Churn | -R$ 16.000 | -3,5% | 🟡 |
| = MRR Final | R$ 485.000 | 105,4% | 🟢 |

## 6. Aging de Inadimplência
| Faixa | Valor | % Receita | Clientes | Status |
|-------|-------|-----------|----------|--------|
| 0-30 dias | R$ 42.000 | 8,7% | 18 | 🟡 |
| 31-60 dias | R$ 15.000 | 3,1% | 7 | 🟡 |
| 61-90 dias | R$ 8.000 | 1,6% | 3 | 🔴 |
| 90+ dias | R$ 5.000 | 1,0% | 2 | 🔴 |
| **Total** | **R$ 70.000** | **14,4%** | **30** | 🟡 |
```

---

## Quality Criteria

- [ ] MRR Waterfall fecha matematicamente (inicial + movimentos = final)
- [ ] Cohort cobre últimos 6 meses de safras
- [ ] Fluxo de caixa inclui projeção de 3 meses
- [ ] DRE tem variance vs mês anterior E vs orçamento
- [ ] Unit Economics com evolução de 6 meses
- [ ] Aging com todas as 4 faixas preenchidas
- [ ] Semáforo aplicado a todos os KPIs
- [ ] Notas explicativas para variações >10%
- [ ] Todos os valores em BRL com formato brasileiro (R$ X.XXX,XX)

---

## Veto Conditions

- MRR Waterfall não fecha (soma dos componentes ≠ MRR final)
- Divergência entre MRR final e receita recorrente da DRE
- Falta de dados de qualquer um dos 6 dashboards
- Semáforo não aplicado ou aplicado com critérios inconsistentes
- Valores sem período de referência explícito
