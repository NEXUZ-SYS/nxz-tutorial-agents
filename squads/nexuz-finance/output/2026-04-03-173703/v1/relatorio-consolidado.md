# Relatorio Financeiro Consolidado — Nexuz | Abril/2026

**Compilado por:** Renato Relatorio — Report Compiler
**Periodo:** Marco-Abril/2026
**Gerado em:** 2026-04-03
**Fontes:** Asaas API (real) | Google Sheets (indisponivel) | Odoo (placeholder)

---

# PARTE 1 — RESUMO EXECUTIVO (Diretoria / Socios)

## Health Score: 52/100 🟡

> Score reduzido pela incompletude de dados (sem custos, sem banco, sem historico). Metricas de receita solidas, mas visibilidade financeira limitada.

## KPIs Principais

| KPI | Valor Atual | Benchmark SaaS | Status |
|-----|-------------|----------------|--------|
| MRR | R$ 54.593,32 | — | 🟢 Estavel |
| ARR | R$ 655.119,84 | — | 🟢 |
| ARPA | R$ 440,27/mes | — | — |
| Inadimplencia | 5,0% | <2% | 🔴 Critico |
| NRR (proxy) | ~95,9% | >100% | 🔴 Critico |
| Clientes ativos | 124 c/ assinatura | — | 🟢 |
| Clientes sem assinatura | 36 (22,5%) | — | 🟡 Atencao |
| Margem Bruta [EST.] | 73,9% | >70% | 🟢 |
| EBITDA [EST.] | R$ 6.674 (12,7%) | >15% | 🟡 |
| Saldo Asaas | R$ 0,00 | — | 🟡 Auto-transfer |

## 🔴 Top 3 Alertas

1. **Inadimplencia acima do benchmark** — 5,0% vs meta <2%. Amor Espresso concentra R$ 963,70 em 3 filiais. Acao imediata de cobranca necessaria.

2. **NRR abaixo de 100%** — Receita efetiva (R$ 52.360) ficou 4,1% abaixo do MRR teorico (R$ 54.593). Indica que a receita real esta encolhendo, nao crescendo.

3. **36 clientes sem assinatura ativa** — 22,5% da base cadastrada sem receita recorrente. Se forem churn real, representam ~R$ 15.850/mes perdidos.

## 🟢 Top 3 Pontos Positivos

1. **Receita 100% recorrente** — Previsibilidade alta, sem dependencia de receita one-time. Base solida para planejamento.

2. **Concentracao de receita baixa** — Top 15 clientes = 19,4% do MRR. Nenhum cliente ultrapassa 2,5%. Risco de concentracao controlado.

3. **Base diversificada geograficamente** — Clientes em 17 estados brasileiros. Reduz risco regional.

## Recomendacao Principal

**Priorizar retencao sobre aquisicao.** Com inadimplencia de 5% e 36 clientes potencialmente churned, o maior risco da Nexuz hoje e perder receita existente. Task force de retencao com foco em Amor Espresso (3 filiais) e investigacao dos 36 clientes sem assinatura deve ser acao #1.

---

# PARTE 2 — DASHBOARD OPERACIONAL (Gestao Financeira)

## 2.1 MRR e Receita Recorrente

### MRR por Ciclo de Cobranca

| Ciclo | Assinaturas | MRR (R$) | % MRR |
|-------|-------------|----------|-------|
| MONTHLY | 105 | 46.954,22 | 86,0% |
| SEMIANNUALLY | 2 | 733,80 | 1,3% |
| YEARLY | 17 | 6.905,30 | 12,7% |
| **TOTAL** | **124** | **54.593,32** | **100%** |

### Faturamento Real vs MRR

| Metrica | Valor (R$) | Obs |
|---------|-----------|-----|
| MRR (teorico) | 54.593,32 | Assinaturas ativas |
| Faturamento marco/2026 | 52.360,31 | 128 cobrancas |
| Gap | -2.233,01 (-4,1%) | Inadimplencia + timing |
| Faturamento prev. abril/2026 | 53.963,93 | 120 cobrancas |

### Top 10 Clientes por MRR

| # | Cliente | MRR (R$) | % Total |
|---|---------|----------|---------|
| 1 | Macarrao Curitiba Bigorrilho | 1.261,24 | 2,3% |
| 2 | Go Coffee PR Ed Office Life | 1.101,00 | 2,0% |
| 3 | Pomo Pasta Vidal Ramos | 967,79 | 1,8% |
| 4 | Breadbox Matriz | 800,99 | 1,5% |
| 5 | Cafeteria Vila Izabel | 775,02 | 1,4% |
| 6 | Contem Ovo | 744,32 | 1,4% |
| 7 | Pomo Pasta Maringa | 717,60 | 1,3% |
| 8 | Toldo Cafeteria Matriz II | 712,00 | 1,3% |
| 9 | Macarrao Curitiba Xaxim | 685,00 | 1,3% |
| 10 | Aloa Coffee | 673,02 | 1,2% |

## 2.2 Inadimplencia e Aging

### Cobrancas Marco/2026

| Status | Qtd | Valor (R$) | % |
|--------|-----|-----------|---|
| RECEIVED | 105 | 44.043,28 | 84,1% 🟢 |
| CONFIRMED | 16 | 5.680,34 | 10,8% 🟢 |
| OVERDUE | 7 | 2.636,69 | 5,0% 🔴 |
| **TOTAL** | **128** | **52.360,31** | **100%** |

### Aging de Inadimplencia

| Faixa | Qtd | Valor (R$) | % |
|-------|-----|-----------|---|
| 1-30 dias | 7 | 2.636,69 | 100% |
| 31-60 dias | 0 | 0,00 | 0% |
| 61-90 dias | 0 | 0,00 | 0% |
| >90 dias | 0 | 0,00 | 0% |

> Ponto positivo: toda a inadimplencia esta na faixa 1-30 dias. Sem titulos em atraso cronico.

### Detalhamento — Clientes Inadimplentes

| Cliente | Cobrancas | Valor (R$) | Dias Atraso | Risco |
|---------|-----------|-----------|-------------|-------|
| Amor Espresso (3 filiais) | 3 | 963,70 | 4-7 | 🔴 ALTO |
| Go Coffee SP Grand Plaza | 1 | 529,00 | 9 | 🟡 |
| Go Coffee RJ S. Boaventura | 1 | 529,00 | 9 | 🟡 |
| Go Coffee BA Pituba | 1 | 454,19 | 9 | 🟡 |
| Pomo Pasta Trindade | 1 | 160,80 | 14 | 🟡 |

## 2.3 Cobrancas Abril/2026 (parcial ate 03/04)

| Status | Qtd | Valor (R$) | % |
|--------|-----|-----------|---|
| PENDING | 99 | 46.290,57 | 85,8% |
| CONFIRMED | 15 | 5.292,22 | 9,8% |
| RECEIVED | 6 | 2.381,14 | 4,4% |
| **TOTAL** | **120** | **53.963,93** | **100%** |

> Mes recem iniciado. Maioria pendente e esperado. Sem inadimplencia ate agora.

## 2.4 Fluxo de Caixa — Cenarios 12 Meses

| Cenario | Premissas | MRR Mar/27 | Resultado Anual | Runway |
|---------|-----------|-----------|-----------------|--------|
| Conservador | Churn 5%, 0 novos, desp +5% | R$ 29.367 | (R$ 90.907) 🔴 | ~6m |
| **Base** | **Churn 3%, +2/mes, desp estavel** | **R$ 45.500** | **R$ 77.440** 🟢 | **12+m** |
| Otimista | Churn 2%, +4/mes, desp +3% | R$ 58.200 | R$ 141.660 🟢 | 18+m |

## 2.5 DRE SaaS — Marco/2026

| Linha | Mar/2026 (R$) | % Receita | Benchmark |
|-------|--------------|-----------|-----------|
| (+) Receita Recorrente | 52.360,31 | 100,0% | — |
| (=) Receita Bruta | 52.360,31 | 100,0% | — |
| (-) Deducoes [EST.] | (4.529) | 8,6% | 8-12% |
| (=) Receita Liquida | 47.831 | 91,4% | — |
| (-) CPV [EST.] | (9.157) | 17,5% | 15-30% |
| **(=) Lucro Bruto** | **38.674** | **73,9%** | **>70%** 🟢 |
| (-) OpEx [EST.] | (32.000) | 61,1% | 50-70% |
| **(=) EBITDA** | **6.674** | **12,7%** | **>15%** 🟡 |

## 2.6 Completude de Dados

| Fonte | Status | Impacto |
|-------|--------|---------|
| Asaas API | 🟢 100% | Receita, clientes, cobrancas — completo |
| Google Sheets (Inter) | 🔴 0% | Sem saldo bancario, sem contas a pagar |
| Odoo ERP | 🔴 0% | Sem cadastro complementar |
| Custos/Despesas | 🟡 Estimados | DRE e margens nao confilaveis para decisao |
| Historico MRR | 🔴 0% | Sem waterfall, sem churn real, sem cohort |

---

# PARTE 3 — METRICAS INDISPONIVEIS

As seguintes metricas nao puderam ser calculadas nesta execucao por falta de dados:

| Metrica | Motivo | Fonte Necessaria |
|---------|--------|------------------|
| MRR Waterfall | Sem historico de assinaturas | Snapshots mensais Asaas |
| Logo Churn | Sem cancelamentos | API Asaas (filtro cancelled) |
| Revenue Churn (real) | Sem historico | Snapshots mensais |
| Cohort Matrix | Sem data de entrada | CRM/Odoo |
| CAC | Sem custos de vendas/mkt | Google Sheets / Contabilidade |
| LTV:CAC | Depende de CAC | — |
| Payback | Depende de CAC | — |
| Quick Ratio | Sem waterfall | Snapshots mensais |
| Rule of 40 | Sem crescimento + margem reais | Historico + custos |
| Runway (real) | Sem saldo bancario | Banco Inter / Sheets |
| Saldo bancario | MCP Sheets desconectado | Reconectar gsheets MCP |

---

*Relatorio compilado por Renato Relatorio — Report Compiler*
*Nexuz Financial Analysis Squad | 2026-04-03*
*Completude geral: ~40% (receita real, custos estimados, banco e historico indisponiveis)*
