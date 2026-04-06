# Analise de Receita Recorrente e Unit Economics — Abril/2026

**Agente:** Ricardo Receita — Revenue Analyst
**Periodo:** Marco-Abril/2026 (snapshot)
**Fonte:** Asaas API (producao)
**Data:** 2026-04-03

---

## 1. MRR e ARR

### Premissas de Normalizacao
- Planos MONTHLY: valor integral
- Planos SEMIANNUALLY: valor / 6
- Planos YEARLY: valor / 12
- Receita one-time (setup, implantacao): excluida do MRR
- Trials e cortesias: nao identificados na base

### MRR por Ciclo de Cobranca

| Ciclo | Assinaturas | Valor Nominal (R$) | MRR Equivalente (R$) | % MRR |
|-------|-------------|---------------------|----------------------|-------|
| MONTHLY | 105 | 46.954,22 | 46.954,22 | 86,0% |
| SEMIANNUALLY | 2 | 4.402,80 | 733,80 | 1,3% |
| YEARLY | 17 | 82.863,64 | 6.905,30 | 12,7% |
| **TOTAL** | **124** | **134.220,66** | **54.593,32** | **100%** |

### Metricas Principais

| Metrica | Valor |
|---------|-------|
| **MRR** | **R$ 54.593,32** |
| **ARR** | **R$ 655.119,84** |
| **ARPA** (por assinatura ativa) | **R$ 440,27/mes** |
| Contas com assinatura ativa | 124 |
| Clientes cadastrados total | 160 |
| Clientes sem assinatura | 36 (22,5%) |

### Concentracao de Receita — Top 15 Clientes

| # | Cliente | MRR (R$) | % do MRR Total |
|---|---------|----------|----------------|
| 1 | Macarrao Curitiba - PR Bigorrilho | 1.261,24 | 2,3% |
| 2 | Go Coffee - PR Ed Office Life | 1.101,00 | 2,0% |
| 3 | Pomo Pasta Vidal Ramos | 967,79 | 1,8% |
| 4 | Breadbox - Matriz | 800,99 | 1,5% |
| 5 | Cafeteria Vila Izabel - Buona Farina | 775,02 | 1,4% |
| 6 | Contem Ovo | 744,32 | 1,4% |
| 7 | Pomo Pasta Maringa | 717,60 | 1,3% |
| 8 | Toldo Cafeteria - Matriz II | 712,00 | 1,3% |
| 9 | Macarrao Curitiba - Xaxim | 685,00 | 1,3% |
| 10 | Aloa Coffee | 673,02 | 1,2% |
| 11 | Breadbox - SC Patio Milano | 639,00 | 1,2% |
| 12 | Go Coffee - RS Pelotas | 639,00 | 1,2% |
| 13 | GC PR Curitibano II | 628,00 | 1,2% |
| 14 | Pastelaria da Jo | 628,00 | 1,2% |
| 15 | Go Coffee - RS Quinze de Janeiro | 628,00 | 1,2% |
| **Top 15 total** | | **10.599,98** | **19,4%** |

> Concentracao moderada: Top 15 clientes representam 19,4% do MRR. Risco de concentracao baixo — nenhum cliente isolado ultrapassa 2,5% do MRR total.

### Segmentacao por Produto
> **LIMITACAO**: API Asaas nao discrimina produto por assinatura. Base predominantemente franquias Go Coffee (~80 unidades). Segmentacao por produto (ERP, Go, KDS, Delivery) requer cruzamento com CRM/Odoo (indisponivel).

### MRR Waterfall
> **LIMITACAO CRITICA**: Sem snapshots historicos de MRR. API retornou apenas assinaturas ACTIVE. Nao e possivel calcular New MRR, Expansion, Contraction e Churn MRR sem:
> - Historico de assinaturas canceladas por periodo
> - Historico de alteracoes de valor
> - Snapshot de MRR dos meses anteriores

### Faturamento Real vs MRR

| Metrica | Valor (R$) | Observacao |
|---------|-----------|-----------|
| MRR (assinaturas ativas) | 54.593,32 | Teorico |
| Faturamento marco/2026 | 52.360,31 | 128 cobrancas emitidas |
| Faturamento previsto abril/2026 | 53.963,93 | 120 cobrancas emitidas |
| Gap MRR vs faturamento marco | -2.233,01 (-4,1%) | Inadimplencia + variacoes |

> O gap de 4,1% entre MRR teorico e faturamento real reflete a inadimplencia (R$ 2.636,69 em cobrancas OVERDUE marco) e possivel diferenca de timing entre vencimentos.

---

## 2. Churn e Retencao

### Indicadores de Churn

| Metrica | Valor | Benchmark SaaS B2B | Status |
|---------|-------|---------------------|--------|
| Taxa de inadimplencia marco | 5,0% | <2% mensal | 🔴 CRITICO |
| Clientes inadimplentes | 5 (7 cobrancas) | — | — |
| Clientes sem assinatura ativa | 36 de 160 (22,5%) | — | 🟡 ATENCAO |
| NRR estimado (proxy mensal) | ~95,9% | >100% | 🔴 CRITICO |

> **PREMISSA**: NRR estimado usando faturamento efetivo / MRR como proxy. Valor real requer dados historicos.

### Mapa de Inadimplencia (Risco de Churn)

| Cliente | Filiais Inadimplentes | Valor Total (R$) | Dias Atraso | Risco |
|---------|-----------------------|-------------------|-------------|-------|
| Amor Espresso Cafe | 3 | 963,70 | 4-7 dias | 🔴 ALTO — grupo economico |
| Go Coffee SP Grand Plaza | 1 | 529,00 | 9 dias | 🟡 MEDIO |
| Go Coffee RJ Sao Boaventura | 1 | 529,00 | 9 dias | 🟡 MEDIO |
| Go Coffee BA Pituba | 1 | 454,19 | 9 dias | 🟡 MEDIO |
| Pomo Pasta Trindade | 1 | 160,80 | 14 dias | 🟡 MEDIO |

### Cohort Matrix
> **INDISPONIVEL**: Sem data de entrada dos clientes via API Asaas. Necessario cruzar com CRM/Odoo para construir cohorts.

---

## 3. Unit Economics

| Metrica | Valor | Benchmark SaaS | Status |
|---------|-------|----------------|--------|
| ARPA | R$ 440,27/mes | — | — |
| LTV estimado | R$ 8.805* | — | — |
| Permanencia media estimada | ~20 meses* | >36 meses | 🟡 ATENCAO |
| CAC | **INDISPONIVEL** | — | ⚠️ |
| LTV:CAC | **INDISPONIVEL** | >3:1 | ⚠️ |
| Payback | **INDISPONIVEL** | <12 meses | ⚠️ |
| Quick Ratio | **INDISPONIVEL** | >4 | ⚠️ |
| Rule of 40 | **INDISPONIVEL** | >40% | ⚠️ |
| Gross Margin | **INDISPONIVEL** | >70% | ⚠️ |

*LTV = ARPA / Revenue Churn Rate estimado = R$ 440,27 / 5,0% = R$ 8.805,40
**Premissa conservadora**: usando taxa de inadimplencia como proxy de churn (tende a superestimar).

---

## 4. Sintese e Recomendacoes

### Semaforo Geral

| Indicador | Status | Comentario |
|-----------|--------|------------|
| MRR | 🟢 SAUDAVEL | R$ 54.593 estavel, concentracao baixa |
| Inadimplencia | 🔴 CRITICO | 5,0% acima do benchmark de 2% |
| NRR (proxy) | 🔴 CRITICO | ~95,9% indica receita encolhendo |
| Base de clientes | 🟡 ATENCAO | 36 sem assinatura = possivel churn nao rastreado |
| Dados | 🟡 ATENCAO | Sem custos, sem historico, sem segmentacao por produto |

### Top 5 Recomendacoes

1. **Acionar Amor Espresso imediatamente** — 3 filiais inadimplentes (R$ 963,70). Contato urgente antes que escale para cancelamento. Impacto: R$ 963,70/mes em risco.

2. **Investigar 36 clientes sem assinatura** — Determinar se sao churn real, migracao ou erro cadastral. Se forem churn, representam ~R$ 15.850/mes perdidos (estimativa 36 x ARPA medio).

3. **Diversificar metodos de pagamento** — 100% boleto e incomum e aumenta inadimplencia. Implementar PIX recorrente e cartao de credito pode reduzir inadimplencia de 5% para <2%.

4. **Criar snapshots mensais de MRR** — Salvar contagem de assinaturas e valores no inicio de cada mes para habilitar MRR Waterfall, NRR real e cohort analysis.

5. **Consolidar dados de custos** — Sem dados de custos (folha, infra, marketing, vendas), impossivel calcular Gross Margin, CAC, LTV:CAC, Payback e Rule of 40. Priorizar integracao com Google Sheets ou Odoo.

---

*Analise produzida por Ricardo Receita — Revenue Analyst*
*Nexuz Financial Analysis Squad | 2026-04-03*
*Fonte: Asaas API (producao) | Completude: ~40% (limitada por ausencia de historico e custos)*
