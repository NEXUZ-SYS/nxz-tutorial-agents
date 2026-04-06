# Análise de Receita Recorrente & Unit Economics — Abril/2026

**Agente:** 📊 Ricardo Receita — Revenue Analyst
**Período base:** Abril/2026 (snapshot dia 04) com comparativo 12 meses
**Fonte de dados:** Dataset Diana Dados v1 (Asaas API + Google Sheets)
**Data de geração:** 2026-04-04

---

## 1. MRR & ARR — Visão Atual

### 1.1 MRR Total e Composição por Ciclo de Cobrança

| Ciclo | Assinaturas | Valor Nominal (R$) | MRR Equivalente (R$) | % do MRR |
|-------|-------------|--------------------|-----------------------|----------|
| MONTHLY | 105 | 46.954,22 | 46.954,22 | 86,0% |
| SEMIANNUALLY | 2 | 4.402,80 | 733,80 | 1,3% |
| YEARLY | 17 | 82.863,64 | 6.905,30 | 12,7% |
| **Total** | **124** | **134.220,66** | **54.593,32** | **100%** |

**Premissas de normalização:**
- Planos mensais: valor integral
- Planos semestrais: valor / 6
- Planos anuais: valor / 12

| Métrica | Valor |
|---------|-------|
| **MRR** | **R$ 54.593,32** |
| **ARR** | **R$ 655.119,84** (MRR × 12) |
| **ARPA** | **R$ 440,27** (MRR / 124 contas) |

### 1.2 Segmentação de MRR por Produto

Baseado na decomposição das descrições de 124 assinaturas ativas:

| Produto | Assinaturas com Produto | MRR Estimado (R$) | % do MRR | ARPA por Produto (R$) |
|---------|------------------------|--------------------|----------|----------------------|
| **NXZ ERP** | ~118 | ~14.400,00 | 26,4% | ~122,03 |
| **NXZ PDV/Go** | ~116 | ~21.200,00 | 38,8% | ~182,76 |
| **NXZ KDS** | ~108 | ~13.800,00 | 25,3% | ~127,78 |
| **NXZ Delivery** | ~14 | ~1.450,00 | 2,7% | ~103,57 |
| **Módulos adicionais** | ~10 | ~3.743,32 | 6,8% | ~374,33 |
| **Total** | — | **54.593,32** | **100%** | — |

> **Nota:** Valores por produto são estimativas baseadas nas descrições das assinaturas. Clientes com descrição genérica ("Referente ao Pagamento da Mensalidade") foram distribuídos proporcionalmente.

**Observações chave:**
- NXZ PDV/Go é o produto com maior contribuição ao MRR (38,8%)
- NXZ ERP é quase universal (presente em ~95% das assinaturas)
- NXZ KDS tem alta adoção (~87% das assinaturas)
- NXZ Delivery tem baixa penetração (~11%) — oportunidade de expansion
- Módulos adicionais geram ticket significativamente maior (R$ 374/mód vs R$ 440 ARPA total)

### 1.3 Distribuição por Faixa de Ticket

| Faixa de Valor Mensal | Qtd Assinaturas | % | MRR Contribuído (R$) | % MRR |
|------------------------|----------------|---|----------------------|-------|
| Até R$ 200 | 8 | 6,5% | ~1.220,00 | 2,2% |
| R$ 201 - R$ 400 | 47 | 37,9% | ~16.100,00 | 29,5% |
| R$ 401 - R$ 600 | 52 | 41,9% | ~26.300,00 | 48,2% |
| R$ 601 - R$ 800 | 12 | 9,7% | ~7.700,00 | 14,1% |
| Acima de R$ 800 | 5 | 4,0% | ~3.273,32 | 6,0% |

**Concentração:** Top 15 clientes = R$ 10.823,98/mês = **19,8% do MRR**. Concentração moderada — nenhum cliente individual representa mais de 2,3% do MRR.

### 1.4 Receita Histórica Mensal (12 meses)

| Mês | Receita Recebida (R$) | Δ m/m | Δ m/m % |
|-----|----------------------|-------|---------|
| Fev/2025 | 56.847,12 | — | — |
| Mar/2025 | 57.658,13 | +811,01 | +1,4% |
| Abr/2025 | 57.270,55 | -387,58 | -0,7% |
| Mai/2025 | 64.926,18 | +7.655,63 | +13,4% |
| Jun/2025 | 66.480,68 | +1.554,50 | +2,4% |
| Jul/2025 | 61.964,48 | -4.516,20 | -6,8% |
| Ago/2025 | 76.751,98 | +14.787,50 | +23,9% |
| Set/2025 | 61.776,22 | -14.975,76 | -19,5% |
| Out/2025 | 65.705,04 | +3.928,82 | +6,4% |
| Nov/2025 | 63.303,93 | -2.401,11 | -3,7% |
| Dez/2025 | 60.774,97 | -2.528,96 | -4,0% |
| Jan/2026 | 57.222,64 | -3.552,33 | -5,8% |

| Métrica | Valor |
|---------|-------|
| Acumulado 12 meses | R$ 750.681,92 |
| Média mensal | R$ 62.556,83 |
| Desvio padrão | R$ 5.890,00 |
| Mediana | R$ 62.870,35 |

> **Nota:** Receita recebida inclui receita recorrente + one-time (setup, serviços). O MRR puro de assinaturas (R$ 54.593) é ~87% da receita média mensal. Os ~R$ 8.000 restantes são receita não-recorrente.

### 1.5 MRR Waterfall — Estimativa

> **Premissa:** Não dispomos de snapshots mensais de MRR histórico. A decomposição abaixo é estimada com base em: (1) data de criação das assinaturas, (2) receita mensal recebida, (3) clientes sem assinatura ativa.

| Componente | Jan/2026 | Fev/2026 | Mar/2026 | Abr/2026 (parcial) |
|------------|----------|----------|----------|---------------------|
| MRR Início | ~53.500 | ~53.800 | ~54.200 | 54.165 |
| + New MRR | ~800 | ~400 | ~581 | ~428 |
| + Expansion MRR | ~0 | ~200 | ~0 | ~0 |
| - Contraction MRR | ~(200) | ~(0) | ~(200) | ~(0) |
| - Churn MRR | ~(300) | ~(200) | ~(416) | ~(0) |
| = Net New MRR | ~300 | ~400 | ~(35) | ~428 |
| **MRR Final** | **~53.800** | **~54.200** | **~54.165** | **~54.593** |

**Novas assinaturas identificadas:**
- Mar/2026: sub_t6qukrh17h18a3w8 (cus_000163614187) — R$ 581/mês → New MRR março
- Abr/2026: sub_cmlcfxzo91n3l66m (cus_000168956653) — R$ 428/mês → New MRR abril

**Limitação:** [ESTIMADO] O waterfall acima é uma aproximação. Para decomposição precisa, seria necessário snapshot mensal das assinaturas ativas no dia 1 de cada mês. **Recomendação: criar processo de snapshot mensal de MRR.**

---

## 2. Churn & Retenção

### 2.1 Métricas de Churn — Snapshot Abril/2026

| Métrica | Valor | Benchmark SaaS B2B | Status |
|---------|-------|---------------------|--------|
| **Logo Churn (estimado mensal)** | ~0,8% | <2,0% | 🟢 Saudável |
| **Gross Revenue Churn (estimado)** | ~0,8% | <2,0% | 🟢 Saudável |
| **NRR mensal (estimado)** | ~99,9% | >100% | 🟡 Atenção |
| **NRR anualizado (estimado)** | ~99,2% | >110% | 🔴 Crítico |

**Premissas de cálculo:**
- Logo Churn: ~1 cancelamento/mês sobre base de ~124 clientes = 0,8%
- Revenue Churn: ~R$ 416/mês de churn MRR sobre MRR de R$ 54.593 = 0,8%
- NRR: Sem Expansion MRR significativa para compensar churn → NRR < 100%

### 2.2 Análise dos 36 Clientes sem Assinatura Ativa

| Indicador | Valor |
|-----------|-------|
| Clientes cadastrados no Asaas | 160 |
| Com assinatura ativa | 124 |
| **Sem assinatura ativa** | **36 (22,5%)** |

> **ALERTA:** Estes 36 clientes representam churn acumulado não rastreado. Se cada um pagava o ARPA médio (R$ 440), o churn acumulado total é de ~R$ 15.840/mês de MRR perdido. A data de cancelamento não está disponível nos dados atuais — impossível construir curva de churn temporal.

### 2.3 Análise de Cohort — Assinaturas por Data de Criação

| Período de Entrada | Assinaturas Criadas | Ativas Hoje | Retidas | % Retenção |
|---------------------|--------------------|-|---------|-----------|
| Mar/2024 (fundação) | ~65 | ~58 | 58 | 89,2% |
| Abr-Jun/2024 | ~12 | ~11 | 11 | 91,7% |
| Jul-Set/2024 | ~8 | ~7 | 7 | 87,5% |
| Out-Dez/2024 | ~13 | ~12 | 12 | 92,3% |
| Jan-Mar/2025 | ~8 | ~7 | 7 | 87,5% |
| Abr-Jun/2025 | ~5 | ~5 | 5 | 100% |
| Jul-Set/2025 | ~7 | ~7 | 7 | 100% |
| Out-Dez/2025 | ~12 | ~12 | 12 | 100% |
| Jan-Mar/2026 | ~4 | ~4 | 4 | 100% |
| Abr/2026 | 1 | 1 | 1 | 100% |

> **Nota:** [ESTIMADO] As contagens por cohort são baseadas nas datas de criação das assinaturas no Asaas. Cohorts recentes (< 6 meses) não tiveram tempo suficiente para demonstrar churn — a retenção de 100% é esperada para cohorts jovens.

**Padrão identificado:** O cohort fundacional (março/2024) perdeu ~7 clientes em 24 meses — retenção de 89,2% na base original. Isso equivale a Logo Churn de ~0,5%/mês, abaixo do benchmark de 2%.

### 2.4 Inadimplência como Sinal de Churn

| Cliente OVERDUE | Valor (R$) | Dias de Atraso | Risco de Churn |
|----------------|-----------|----------------|----------------|
| Go Coffee - SP Shopping Grand Plaza | 529,00 | 10 | 🟡 Médio |
| Go Coffee - RJ São Boaventura | 529,00 | 10 | 🟡 Médio |
| Go Coffee - BA Pituba | 454,19 | 10 | 🟡 Médio |
| Amor Espresso - SP Vila Olímpia II | 412,00 | 5 | 🔴 Alto (grupo) |
| Amor Espresso Boticário | 278,70 | 8 | 🔴 Alto (grupo) |
| Amor Espresso - Filial I | 273,00 | 5 | 🔴 Alto (grupo) |
| Pomo Pasta - Trindade | 160,80 | 15 | 🟡 Médio |

> **ALERTA AMOR ESPRESSO:** 3 filiais inadimplentes = R$ 963,70. Grupo econômico em risco de churn total. Se churnar, impacto de ~R$ 963/mês no MRR (1,8% do total).

---

## 3. Unit Economics

### 3.1 Painel Consolidado

| Métrica | Valor | Benchmark SaaS B2B SMB | Status |
|---------|-------|------------------------|--------|
| **ARPA** | R$ 440,27 | — | — |
| **LTV (simples)** | R$ 55.033,75 | — | — |
| **LTV (com margem)** | R$ 38.523,63 | — | — |
| **CAC** | [NÃO DISPONÍVEL] | — | ⚠️ |
| **LTV:CAC** | [NÃO CALCULÁVEL] | >3:1 | ⚠️ |
| **Payback Period** | [NÃO CALCULÁVEL] | <12 meses | ⚠️ |
| **Gross Margin** | ~70% [ESTIMADO] | >70% | 🟡 Limite |
| **Quick Ratio SaaS** | ~1,0 [ESTIMADO] | >4 | 🔴 Crítico |
| **Rule of 40** | ~-15% [ESTIMADO] | >40% | 🔴 Crítico |

### 3.2 Detalhamento dos Cálculos

**LTV (Lifetime Value):**
- Permanência média: 1 / Churn mensal = 1 / 0,008 = **125 meses (~10,4 anos)**
- LTV simples = ARPA × permanência = R$ 440,27 × 125 = **R$ 55.033,75**
- LTV ajustado (com Gross Margin ~70%) = R$ 55.033,75 × 0,70 = **R$ 38.523,63**

**CAC (Customer Acquisition Cost):**
- ⚠️ **Dados de custos de S&M não disponíveis nas fontes atuais**
- Despesas com fornecedores abril: R$ 37.125 (inclui desenvolvimento + outros — não segregado)
- **Premissa para estimativa:** Se considerarmos que ~30% dos custos de fornecedores são S&M (~R$ 11.000/mês) e a empresa adquire ~1-2 clientes novos/mês:
  - CAC estimado: R$ 5.500 a R$ 11.000 [ESTIMATIVA GROSSEIRA]
  - LTV:CAC estimado: 3,5:1 a 7:1 → provavelmente 🟢
- **Recomendação:** Segregar custos de S&M na planilha de contas a pagar para cálculo preciso

**Quick Ratio SaaS:**
- Quick Ratio = (New MRR + Expansion MRR) / (Churn MRR + Contraction MRR)
- Março/2026 estimado: (R$ 581 + R$ 0) / (R$ 416 + R$ 200) = **0,94**
- Benchmark: >4 é excelente, >2 é saudável, <1 a receita encolhe
- **Status: 🔴 CRÍTICO** — Quick Ratio < 1 indica que a empresa perde mais receita do que ganha
- **Ressalva:** Com apenas 1-2 vendas/mês, um único novo cliente muda drasticamente o Quick Ratio. A métrica é volátil para bases pequenas.

**Rule of 40:**
- Crescimento de MRR MoM (últimos 3 meses): ~0% (MRR estagnado em ~R$ 54K)
- Crescimento anualizado: ~0%
- Margem EBITDA estimada: Receita ~R$ 55K - Despesas ~R$ 70K = **~-27%**
- Rule of 40 = 0% + (-27%) = **-27%**
- **Status: 🔴 CRÍTICO** — muito abaixo do benchmark de 40%
- **Contexto:** O deficit é estrutural (despesas > receita). Rule of 40 negativo reflete a necessidade de capitalização ou corte significativo de custos.

### 3.3 Crescimento YoY

| Métrica | Abr/2025 | Abr/2026 (proj.) | Crescimento YoY |
|---------|----------|-------------------|-----------------|
| Receita mensal | R$ 57.270,55 | ~R$ 54.593,32 | **-4,7%** |
| Clientes (estimado) | ~120 | 124 | **+3,3%** |
| ARPA (estimado) | ~R$ 477 | R$ 440,27 | **-7,7%** |

> **Alerta:** Receita caiu 4,7% YoY enquanto base cresceu 3,3%. ARPA em queda de 7,7% indica que novos clientes entram com ticket menor que a base existente (diluição de ARPA).

---

## 4. Resumo — Semáforo de Métricas SaaS

| Métrica | Valor | Status | Ação Sugerida |
|---------|-------|--------|---------------|
| MRR | R$ 54.593,32 | 🟡 Estagnado | Acelerar New MRR e Expansion |
| ARR | R$ 655.119,84 | 🟡 | — |
| ARPA | R$ 440,27 | 🟡 Em queda YoY | Revisar pricing de novos contratos |
| Logo Churn | ~0,8%/mês | 🟢 Saudável | Manter monitoramento |
| Revenue Churn | ~0,8%/mês | 🟢 Saudável | — |
| NRR anualizado | ~99,2% | 🔴 Abaixo de 100% | Priorizar Expansion (Delivery, Módulos) |
| Gross Margin | ~70% [EST] | 🟡 Limite | Oracle R$ 15K/mês é custo crítico |
| Quick Ratio | ~0,94 | 🔴 < 1 | Receita encolhendo — inverter tendência |
| Rule of 40 | ~-27% | 🔴 Negativo | Deficit estrutural — ação urgente |
| Concentração | Top 15 = 19,8% | 🟢 Saudável | — |
| Inadimplência | 5,0% (R$ 2.637) | 🟡 Aceitável | Ação em Amor Espresso (3 filiais) |

---

## 5. Recomendações Priorizadas

### 🔴 Urgentes (impacto imediato)

1. **Programa de Expansion MRR via NXZ Delivery**
   - Apenas 14 de 124 clientes têm Delivery (~11% de penetração)
   - Potencial: se 30 clientes adicionais adotarem a R$ ~105/mês = +R$ 3.150/mês (+5,8% MRR)
   - Quick Ratio subiria para >2 com esta expansão

2. **Contenção de Churn — Amor Espresso**
   - 3 filiais inadimplentes = R$ 963,70/mês em risco
   - Contato imediato com decisor do grupo para negociação
   - Se churnar: impacto de 1,8% no MRR

3. **Revisão de Custos — Oracle**
   - R$ 14.910/mês em licenças Oracle (21% das despesas)
   - 3 parcelas acumuladas indicam possível atraso prévio
   - Avaliar: migração para cloud alternativa? Renegociação?

### 🟡 Médio prazo (próximos 3 meses)

4. **Estruturar acompanhamento mensal de MRR**
   - Criar snapshot no dia 1 de cada mês com: assinaturas ativas, valores, status
   - Permitirá waterfall preciso e detecção precoce de churn

5. **Diversificação de meios de pagamento**
   - 100% boleto = maior inadimplência e prazo de recebimento
   - Planos anuais já usam cartão de crédito — expandir para mensais
   - Impacto esperado: redução de inadimplência de 5% para ~2%

---

*Análise gerada por 📊 Ricardo Receita — Revenue Analyst*
*Nexuz Financial Analysis Squad | v1 | 2026-04-04*
*Fonte: Asaas API + Google Sheets | Completude: ~85% (sem dados históricos de MRR e CAC detalhados)*
