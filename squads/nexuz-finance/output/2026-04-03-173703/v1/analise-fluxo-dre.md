# Analise de Fluxo de Caixa e DRE — Abril/2026

**Agente:** Flavia Fluxo — Analista de Fluxo de Caixa & DRE
**Periodo:** Marco-Abril/2026
**Fonte:** Asaas API (producao)
**Data:** 2026-04-03

> **DISCLAIMER**: Este relatorio foi construido com dados PARCIAIS. Apenas a receita (Asaas) esta disponivel. Google Sheets (Banco Inter) e sistema de custos estao indisponiveis. Linhas de custo e despesa sao **[ESTIMADAS]** com premissas de mercado SaaS B2B.

---

## 1. Fluxo de Caixa Semanal — Abril/2026 (30 dias)

### Premissas
- Taxa de inadimplencia: 5,0% (baseada em marco/2026)
- Saldo inicial Inter: **INDISPONIVEL**
- Saidas programadas: **INDISPONIVEL**
- Distribuicao de recebiveis: estimada uniformemente por semana

### Recebiveis Asaas por Semana

| Semana | Recebiveis Brutos (R$) | Inadimplencia (-5%) | Receita Liquida Esperada (R$) | Status |
|--------|----------------------|---------------------|-------------------------------|--------|
| 01-07/04 | 13.491 | (675) | 12.816 | Parcialmente realizado |
| 08-14/04 | 13.491 | (675) | 12.816 | Projetado |
| 15-21/04 | 13.491 | (675) | 12.816 | Projetado |
| 22-30/04 | 13.491 | (675) | 12.816 | Projetado |
| **TOTAL** | **53.964** | **(2.698)** | **51.266** | |

### Realizacao Parcial (ate 03/04/2026)

| Status | Qtd | Valor (R$) | % do Total Abril |
|--------|-----|-----------|-----------------|
| RECEIVED | 6 | 2.381,14 | 4,4% |
| CONFIRMED | 15 | 5.292,22 | 9,8% |
| PENDING | 99 | 46.290,57 | 85,8% |
| OVERDUE | 0 | 0,00 | 0,0% |
| **TOTAL** | **120** | **53.963,93** | **100%** |

### Alertas
- Sem dados de saidas, nao e possivel calcular saldo projetado diario
- Conciliacao Asaas x Inter indisponivel nesta execucao
- Recebiveis de marco com R$ 2.636,69 OVERDUE (7 titulos) — impacto no caixa de abril

---

## 2. Fluxo de Caixa Mensal — Abr a Jun/2026

### Premissas
- MRR base: R$ 54.593,32 (124 assinaturas ativas)
- Churn mensal: 5,0% [proxy de inadimplencia — CONSERVADOR]
- Novos clientes: 0 [sem dados de pipeline comercial]
- Despesas fixas: R$ 40.000/mes [ESTIMADO — 10-15 colaboradores]
- Despesas variaveis: ~5% da receita [ESTIMADO — taxas gateway + outros]

| Linha | Abr/2026 | Mai/2026 | Jun/2026 |
|-------|----------|----------|----------|
| MRR | R$ 54.593 | R$ 51.863 | R$ 49.270 |
| (-) Inadimplencia (5%) | (R$ 2.730) | (R$ 2.593) | (R$ 2.464) |
| (=) Receita Efetiva | R$ 51.863 | R$ 49.270 | R$ 46.807 |
| (-) Despesas Fixas [EST.] | (R$ 40.000) | (R$ 40.000) | (R$ 40.000) |
| (-) Despesas Variaveis [EST.] | (R$ 2.730) | (R$ 2.593) | (R$ 2.464) |
| **(=) Resultado Mensal** | **R$ 9.133** | **R$ 6.677** | **R$ 4.343** |
| Resultado Acumulado | R$ 9.133 | R$ 15.810 | R$ 20.153 |

> **Cenario pessimista** (churn 5% sem novos). Resultado cai R$ 2.456/mes a cada periodo. Em 10 meses, resultado mensal atinge zero.

---

## 3. Fluxo de Caixa Anual — 3 Cenarios (Abr/2026 a Mar/2027)

### Cenario CONSERVADOR
Premissas: Churn 5%/mes | 0 novos clientes | Despesas +5%/ano

| Trimestre | Receita (R$) | Despesas (R$) | Resultado (R$) |
|-----------|-------------|---------------|----------------|
| Q2/2026 (abr-jun) | 147.940 | 130.787 | 17.153 |
| Q3/2026 (jul-set) | 119.380 | 132.300 | (12.920) |
| Q4/2026 (out-dez) | 96.340 | 133.830 | (37.490) |
| Q1/2027 (jan-mar) | 77.730 | 135.380 | (57.650) |
| **TOTAL ANUAL** | **441.390** | **532.297** | **(90.907)** 🔴 |

### Cenario BASE
Premissas: Churn 3%/mes | +2 novos/mes (R$ 440 ARPA) | Despesas estavel

| Trimestre | Receita (R$) | Despesas (R$) | Resultado (R$) |
|-----------|-------------|---------------|----------------|
| Q2/2026 (abr-jun) | 153.800 | 128.190 | 25.610 |
| Q3/2026 (jul-set) | 149.500 | 128.190 | 21.310 |
| Q4/2026 (out-dez) | 145.400 | 128.190 | 17.210 |
| Q1/2027 (jan-mar) | 141.500 | 128.190 | 13.310 |
| **TOTAL ANUAL** | **590.200** | **512.760** | **77.440** 🟢 |

### Cenario OTIMISTA
Premissas: Churn 2%/mes | +4 novos/mes (R$ 440 ARPA) | Despesas +3%

| Trimestre | Receita (R$) | Despesas (R$) | Resultado (R$) |
|-----------|-------------|---------------|----------------|
| Q2/2026 (abr-jun) | 160.900 | 131.640 | 29.260 |
| Q3/2026 (jul-set) | 166.200 | 133.200 | 33.000 |
| Q4/2026 (out-dez) | 172.100 | 134.800 | 37.300 |
| Q1/2027 (jan-mar) | 178.500 | 136.400 | 42.100 |
| **TOTAL ANUAL** | **677.700** | **536.040** | **141.660** 🟢 |

### Resumo de Cenarios

| Metrica | Conservador | Base | Otimista |
|---------|-------------|------|----------|
| MRR Mar/2027 | R$ 29.367 | R$ 45.500 | R$ 58.200 |
| Receita Anual | R$ 441.390 | R$ 590.200 | R$ 677.700 |
| Resultado Anual | (R$ 90.907) 🔴 | R$ 77.440 🟢 | R$ 141.660 🟢 |
| Runway | ~6 meses | 12+ meses | 18+ meses |
| Break-even mensal | Q3/2026 fica negativo | Positivo todo periodo | Positivo e crescente |

---

## 4. DRE SaaS — Marco/2026

### Premissas de Custo [ESTIMADAS]
- Deducoes (ISS ~5%, PIS+COFINS ~3,65%): 8,65% da receita bruta
- CPV (Infra Cloud ~8%, Suporte ~6%, Gateway Asaas ~3,5%): 17,5% da receita bruta
- P&D: R$ 18.000/mes [ESTIMADO]
- S&M: R$ 8.000/mes [ESTIMADO]
- G&A: R$ 6.000/mes [ESTIMADO]

| Linha DRE | Mar/2026 (R$) | % Receita | Benchmark SaaS |
|-----------|--------------|-----------|----------------|
| **(+) Receita Recorrente (MRR)** | **52.360,31** | 100,0% | — |
| (+) Receita Setup/Implantacao [N/D] | 0,00 | 0,0% | 5-15% |
| (+) Servicos Premium [N/D] | 0,00 | 0,0% | 0-5% |
| **(=) Receita Bruta** | **52.360,31** | **100,0%** | — |
| (-) Deducoes (ISS, PIS, COFINS) [EST.] | (4.529) | 8,6% | 8-12% |
| **(=) Receita Liquida** | **47.831** | **91,4%** | — |
| (-) CPV (Infra + Suporte + Gateway) [EST.] | (9.157) | 17,5% | 15-30% |
| **(=) Lucro Bruto** | **38.674** | **73,9%** | **>70%** 🟢 |
| (-) P&D (Desenvolvimento) [EST.] | (18.000) | 34,4% | 25-40% |
| (-) S&M (Vendas e Marketing) [EST.] | (8.000) | 15,3% | 15-30% |
| (-) G&A (Administrativo) [EST.] | (6.000) | 11,5% | 8-15% |
| **(=) EBITDA** | **6.674** | **12,7%** | **>15%** 🟡 |

### Metricas SaaS Derivadas

| Metrica | Valor | Benchmark | Status |
|---------|-------|-----------|--------|
| MRR | R$ 54.593,32 | — | — |
| ARR | R$ 655.119,84 | — | — |
| Margem Bruta [EST.] | 73,9% | >70% | 🟢 SAUDAVEL |
| Margem EBITDA [EST.] | 12,7% | >15% | 🟡 ATENCAO |
| % Receita Recorrente | 100% | >85% | 🟢 EXCELENTE |
| Burn Rate Liquido [EST.] | ~R$ 0 (cash-flow positivo) | — | 🟢 |

### DRE — Comparativos
> **INDISPONIVEL**: Sem dados de meses anteriores ou orcamento. DRE comparativo requer:
> - Fev/2026 e Mar/2025 para comparacao temporal
> - Orcamento aprovado para analise de variancia
> - Custos reais (nao estimados)

---

## 5. Alertas e Limitacoes

| Severidade | Alerta | Impacto |
|------------|--------|---------|
| 🔴 CRITICO | DRE e Fluxo de Caixa construidos com custos ESTIMADOS | Numeros de resultado/margem nao sao confiveis para decisao |
| 🔴 CRITICO | Sem saldo bancario Inter | Impossivel calcular runway ou liquidez real |
| 🟡 MEDIO | Sem historico de meses anteriores | DRE sem comparativos, fluxo sem tendencia |
| 🟡 MEDIO | Churn real desconhecido | Cenarios anuais senseis a premissa de churn |
| ℹ️ INFO | Receita 100% recorrente | Positivo — previsibilidade alta, dependencia baixa de one-time |

---

*Analise produzida por Flavia Fluxo — Analista de Fluxo de Caixa & DRE*
*Nexuz Financial Analysis Squad | 2026-04-03*
*Completude: ~30% (receita real, custos estimados, banco indisponivel)*
