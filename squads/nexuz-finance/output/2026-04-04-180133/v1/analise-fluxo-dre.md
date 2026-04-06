# Análise de Fluxo de Caixa & DRE — Abril/2026

**Agente:** 💰 Flavia Fluxo — Analista de Fluxo de Caixa & DRE
**Período:** Abril/2026 (snapshot dia 04) com comparativos históricos
**Fontes:** Asaas API, Google Sheets (Inter + Contas a Pagar), Dashboard Geral
**Data de geração:** 2026-04-04

---

## 1. FLUXO DE CAIXA SEMANAL — Abril/2026 (30 dias)

### Premissas
- **Saldo inicial (04/04):** R$ 10.072,37 (Inter R$ 5.154,85 + Asaas R$ 4.917,52)
- **Taxa de inadimplência aplicada:** 5,0% (referência março/2026)
- **Receita prevista abril (Asaas):** R$ 47.767,45 (líquida de já recebidas R$ 1.005,02 e confirmadas R$ 4.883,62)
- **Receita líquida esperada (após inadimplência):** R$ 45.379,08
- **Despesas totais abril:** R$ 70.410,98
- **Fonte dos recebíveis:** Cobranças Asaas por data de vencimento
- **Nota:** Transferências Asaas→Inter ocorrem em D+2 a D+5 após recebimento. Projeções consideram recebimento na data de vencimento.

### 1.1 Fluxo Semanal Resumido

| Semana | Período | Saldo Início (R$) | Entradas (R$) | Saídas (R$) | Saldo Final (R$) | Status |
|--------|---------|-------------------|---------------|-------------|-------------------|--------|
| S1 | 04-06/abr | 10.072,37 | 0,00 | 0,00 | 10.072,37 | 🟡 ALERTA |
| S2 | 07-13/abr | 10.072,37 | 9.889,00 | 6.054,00 | 13.907,37 | 🟡 ALERTA |
| S3 | 14-20/abr | 13.907,37 | 22.143,00 | 45.106,91 | (9.056,54) | 🔴 CRÍTICO |
| S4 | 21-27/abr | (9.056,54) | 9.168,00 | 18.160,25 | (18.048,79) | 🔴 CRÍTICO |
| S5 | 28-30/abr | (18.048,79) | 4.179,08 | 1.089,82 | (14.959,53) | 🔴 CRÍTICO |

> **⚠️ ALERTA CRÍTICO:** O caixa fica negativo a partir da semana 3 (14-20/abr) quando vencem as despesas de fornecedores (R$ 34.500) e cartão (R$ 9.963). Sem aporte ou antecipação de recebíveis, a empresa não cobre suas obrigações.

### 1.2 Fluxo Diário Detalhado — Dias Críticos

| Data | Evento | Entradas (R$) | Saídas (R$) | Saldo Acumulado (R$) |
|------|--------|---------------|-------------|----------------------|
| 05/04 | Vencimento boletos (4 clientes) | 1.821,68 | — | 11.894,05 |
| 07/04 | Fornecedor (Giulliano) + Func. (Bianca) + Cartão (Karina) | — | 6.054,00 | 5.840,05 |
| 08/04 | Vencimento boletos (2 clientes) | 734,29 | — | 6.574,34 |
| 10/04 | **Concentração de boletos** (~14 clientes) | 6.056,70 | — | 12.631,04 |
| 14/04 | Fornecedores (Caroline + Luiz Cláudio) | — | 9.500,00 | 3.131,04 |
| **15/04** | **Fornecedores (Matheus 3/3 + Matheus + Sabrina 2/2 + Sabrina + Kauã)** | 1.276,00 | **25.000,00** | **(20.592,96)** |
| 17/04 | Boletos + Ponto Mais | 534,66 | 94,82 | (20.153,12) |
| 18/04 | Cartão Karina (parcela) | — | 1.089,60 | (21.242,72) |
| 19/04 | Boletos (2 clientes) | 467,22 | — | (20.775,50) |
| 20/04 | Boletos + FGTS + Sindicato + Cartão Inter + Exame + Bonificação | 241,25 | 10.512,31 | (31.046,56) |
| 21/04 | Boleto (1 cliente) | 344,17 | — | (30.702,39) |
| 23/04 | Boletos + ISS | 171,71 | 1.527,71 | (32.058,39) |
| 25/04 | Boleto (1 cliente) | 393,41 | — | (31.664,98) |
| 26/04 | Boleto (1 cliente) | 673,02 | — | (30.991,96) |
| **27/04** | **Oracle (3 parcelas) + Contabilidade** | 564,34 | **16.632,54** | **(47.060,16)** |
| 28/04 | Boleto (1 cliente) | 381,71 | — | (46.678,45) |
| 30/04 | Boleto (1 cliente) | 514,97 | — | (46.163,48) |

### 1.3 Classificação de Liquidez

| Status | Definição | Dias em Abril |
|--------|-----------|---------------|
| 🟢 OK | Saldo > 30 dias de OpEx (~R$ 70K) | 0 dias |
| 🟡 ALERTA | Saldo < 30 dias de OpEx | 10 dias (01-14/abr) |
| 🔴 CRÍTICO | Saldo negativo | **16 dias (15-30/abr)** |

### 1.4 Conciliação — Dias Realizados (01-04/abr)

| Data | Projetado (R$) | Realizado Inter (R$) | Divergência |
|------|----------------|---------------------|-------------|
| 01/04 | +745,45 (Asaas→Inter) | +745,45 C / -686,00 D (Google) | OK — transferência Asaas confirmada |
| 02/04 | +750,26 | +750,26 C / -300,00 D | OK |
| 03/04 | +1.228,19 | +1.228,19 C / -2.150,00 D | OK — saída Sabrina conforme contas a pagar |
| 04/04 | — | -100,00 D (Walter) | OK — retirada pessoal |

---

## 2. FLUXO DE CAIXA MENSAL — Abr a Jun/2026

### Premissas

| Premissa | Valor | Fonte |
|----------|-------|-------|
| MRR base | R$ 54.593,32 | Asaas (124 assinaturas) |
| Churn mensal | 0,8% | Estimativa Ricardo Receita |
| Inadimplência | 5,0% | Março/2026 realizado |
| Despesas fixas mensais | ~R$ 65.000 | Média Dashboard Geral (últimos 6 meses) |
| Receita não-recorrente | R$ 0 [CONSERVADOR] | Sem pipeline confirmado |

| Linha | Abr/2026 | Mai/2026 (proj.) | Jun/2026 (proj.) |
|-------|----------|-------------------|-------------------|
| Saldo Inicial | R$ 10.072,37 | **(R$ 15.238,61)** | **(R$ 40.399,63)** |
| (+) Receita Recorrente (MRR × 95%) | R$ 51.863,65 | R$ 51.448,75 | R$ 51.037,29 |
| (+) Receita Não-Recorrente | R$ 0,00 | R$ 0,00 | R$ 0,00 |
| (-) Despesas Totais | R$ 70.410,98 | R$ 65.000,00 | R$ 65.000,00 |
| (-) Asaas (taxas gateway ~5,5%) | R$ 6.763,65 | R$ 6.710,05 | R$ 6.656,96 |
| **(=) Saldo Final** | **(R$ 15.238,61)** | **(R$ 40.399,63)** | **(R$ 61.019,30)** |

> **⚠️ ALERTA:** O deficit se acumula mês a mês. Em junho, o deficit acumulado atinge R$ 61K. Sem aporte de capital, a operação é insustentável no curto prazo.

**Nota sobre taxas Asaas:** Estimativa de 5,5% sobre receita bruta para taxas de gateway (boleto ~R$ 3,49/boleto + taxa sobre valor). Valor preciso depende do contrato Asaas.

---

## 3. FLUXO DE CAIXA ANUAL — Cenários (Abr/2026 a Mar/2027)

### 3.1 Premissas por Cenário

| Premissa | 🔴 Conservador | 🟡 Base | 🟢 Otimista |
|----------|---------------|---------|-------------|
| Crescimento MRR m/m | 0,0% | +1,0% | +3,0% |
| Churn mensal | 1,5% | 0,8% | 0,5% |
| New MRR/mês | R$ 400 | R$ 800 | R$ 2.000 |
| Despesas fixas/mês | R$ 68.000 | R$ 65.000 | R$ 58.000 |
| Taxa inadimplência | 7% | 5% | 3% |

### 3.2 Projeção — Cenário BASE

| Mês | MRR (R$) | Receita Líq. (R$) | Despesas (R$) | Fluxo Líq. (R$) | Saldo Acum. (R$) |
|-----|----------|-------------------|---------------|------------------|-------------------|
| Abr/26 | 54.593 | 51.864 | 70.411 | (18.547) | (8.475) |
| Mai/26 | 55.030 | 52.279 | 65.000 | (12.721) | (21.196) |
| Jun/26 | 55.471 | 52.697 | 65.000 | (12.303) | (33.499) |
| Jul/26 | 55.915 | 53.119 | 65.000 | (11.881) | (45.380) |
| Ago/26 | 56.363 | 53.545 | 65.000 | (11.455) | (56.835) |
| Set/26 | 56.815 | 53.974 | 65.000 | (11.026) | (67.861) |
| Out/26 | 57.271 | 54.407 | 65.000 | (10.593) | (78.454) |
| Nov/26 | 57.730 | 54.844 | 65.000 | (10.156) | (88.610) |
| Dez/26 | 58.194 | 55.284 | 65.000 | (9.716) | (98.326) |
| Jan/27 | 58.661 | 55.728 | 65.000 | (9.272) | (107.598) |
| Fev/27 | 59.133 | 56.176 | 65.000 | (8.824) | (116.422) |
| Mar/27 | 59.609 | 56.629 | 65.000 | (8.371) | (124.793) |

### 3.3 Runway

| Cenário | Runway | Status |
|---------|--------|--------|
| 🔴 Conservador | **0 meses** — caixa já insuficiente | 🔴 CRÍTICO |
| 🟡 Base | **0 meses** — deficit de R$ 18,5K no mês 1 | 🔴 CRÍTICO |
| 🟢 Otimista (com corte de custos para R$ 58K) | **0 meses** — receita líquida R$ 52K < despesas R$ 58K | 🔴 CRÍTICO |

> **CONCLUSÃO RUNWAY:** A Nexuz não tem runway em nenhum cenário. As despesas mensais (R$ 65-70K) excedem consistentemente a receita líquida (~R$ 52K). A empresa opera com deficit estrutural de ~R$ 13-18K/mês e precisa de **capitalização imediata** ou **redução drástica de custos**.

### 3.4 Break-Even Analysis

Para atingir break-even mensal (receita = despesas):

| Caminho | Meta | Gap Atual | Viabilidade |
|---------|------|-----------|-------------|
| **Aumentar receita** | MRR de R$ 72.000 (+32%) | +R$ 17.407/mês | 🟡 Médio prazo (12-18 meses) |
| **Reduzir despesas** | Despesas < R$ 52.000 (-26%) | -R$ 18.411/mês | 🟡 Requer cortes significativos |
| **Híbrido** | MRR R$ 63K + Despesas R$ 60K | +R$ 8K receita, -R$ 10K custos | 🟢 Mais realista |

**Maiores oportunidades de corte:**
1. Oracle: R$ 14.910/mês → renegociar ou migrar (economia potencial: R$ 5-10K)
2. Fornecedores (desenvolvimento): R$ 37.125/mês → avaliar prioridades
3. Cartão de crédito: R$ 9.963/mês → revisar composição

---

## 4. DRE SaaS — Março/2026

### Premissas de Rateio

| Classificação | Categorias Incluídas | Fonte |
|---------------|---------------------|-------|
| **Receita Recorrente** | Assinaturas Asaas (MRR) | Cobranças RECEIVED + CONFIRMED |
| **Receita Não-Recorrente** | Setup, implantação, serviços | Diferença entre receita total e MRR |
| **CPV** | Licenças Oracle (infra), taxas Asaas | Contas a pagar + estimativa |
| **P&D** | Fornecedores dev (Matheus, André, Kauã, Luiz, Caroline, Sabrina, Renata) | Contas a pagar cat. 04.02 |
| **G&A** | Contabilidade, impostos, FGTS, funcionários, sindicato, outros | Contas a pagar cat. 06, 07, 04.03, 12 |
| **S&M** | [NÃO SEGREGADO] | Incluído em fornecedores |

### 4.1 DRE Comparativa

| Linha DRE | Mar/2026 | Fev/2026 | Mar/2025 | Orçado | vs Orçado |
|-----------|----------|----------|----------|--------|-----------|
| **(+) Receita Recorrente (MRR)** | **R$ 52.360,31** | R$ 50.047,01 | R$ 57.658,13 | — | — |
| (+) Receita Não-Recorrente | R$ 0,00 [EST] | R$ 0,00 [EST] | R$ 0,00 [EST] | — | — |
| **(=) Receita Bruta** | **R$ 52.360,31** | **R$ 50.047,01** | **R$ 57.658,13** | — | — |
| (-) Deduções (~10%: ISS 5% + PIS/COFINS ~4,65%) | R$ (5.236,03) | R$ (5.004,70) | R$ (5.765,81) | — | — |
| **(=) Receita Líquida** | **R$ 47.124,28** | **R$ 45.042,31** | **R$ 51.892,32** | — | — |
| (-) CPV — Infra Oracle | R$ (14.910,54) [EST] | R$ (14.910,54) [EST] | R$ (12.000,00) [EST] | — | — |
| (-) CPV — Taxas Asaas (~5,5%) | R$ (2.879,82) | R$ (2.752,59) | R$ (3.171,20) | — | — |
| **(=) Lucro Bruto** | **R$ 29.333,92** | **R$ 27.379,18** | **R$ 36.721,12** | — | — |
| **Margem Bruta** | **55,9%** | **54,7%** | **63,6%** | — | — |
| (-) P&D (Fornecedores dev) | R$ (37.125,00) [EST] | R$ (30.000,00) [EST] | R$ (25.000,00) [EST] | — | — |
| (-) S&M | R$ 0,00 [NÃO SEGREGADO] | — | — | — | — |
| (-) G&A (Admin, impostos, RH) | R$ (7.349,56) | R$ (7.000,00) [EST] | R$ (6.000,00) [EST] | — | — |
| **(=) EBITDA** | **(R$ 15.140,64)** | **(R$ 9.620,82)** | **R$ 5.721,12** | — | — |
| **Margem EBITDA** | **-28,9%** | **-19,2%** | **9,9%** | — | — |

### 4.2 Métricas SaaS Derivadas

| Métrica | Mar/2026 | Fev/2026 | Mar/2025 | Tendência |
|---------|----------|----------|----------|-----------|
| MRR | R$ 54.593,32 | ~R$ 54.200 | ~R$ 57.658 | 📉 -5,3% YoY |
| ARR | R$ 655.120 | ~R$ 650.400 | ~R$ 691.898 | 📉 |
| Margem Bruta | 55,9% | 54,7% | 63,6% | 📉 Abaixo benchmark 70% |
| Margem EBITDA | -28,9% | -19,2% | 9,9% | 📉 Deteriorando |
| % Receita Recorrente | ~100% | ~100% | ~100% | ✅ |
| Receita / Funcionário [EST] | — | — | — | Não disponível |

### 4.3 Desvios Significativos (> 10%)

| Linha | Desvio | Explicação |
|-------|--------|------------|
| **Oracle (CPV)** | +24,2% vs Mar/25 | 3 parcelas acumuladas + reajuste de licenças |
| **P&D (Fornecedores)** | +48,5% vs Mar/25 | Aumento da equipe de desenvolvimento terceirizada |
| **EBITDA** | -365% vs Mar/25 | Resultado de aumento de custos sem crescimento proporcional de receita |
| **Margem Bruta** | -7,7pp vs Mar/25 | Oracle elevou CPV significativamente |

---

## 5. CONCILIAÇÃO — Receita Reconhecida vs Caixa Recebido

| Métrica | Mar/2026 | Fonte |
|---------|----------|-------|
| Receita Asaas (RECEIVED + CONFIRMED) | R$ 49.723,62 | Asaas API |
| Receita Asaas (OVERDUE) | R$ 2.636,69 | Asaas API |
| Transferências Asaas→Inter (março) | R$ 54.937,41 | Extrato Inter |
| Receita reconhecida no Dashboard | R$ 20.004,54 | Dashboard Geral |

> **Divergência identificada:** O Dashboard Geral registra receita março de R$ 20.004,54, muito abaixo do Asaas (R$ 52.360). O Dashboard pode estar contando apenas receitas "Recebidas" no extrato Inter (excluindo pendentes de transferência Asaas). As transferências Asaas→Inter somam R$ 54.937 no extrato — valor consistente com cobranças recebidas no Asaas, incluindo pagamentos de meses anteriores.

**Gap de Caixa:**
- Receita reconhecida (Asaas): R$ 52.360,31
- (-) Taxas Asaas (~5,5%): R$ (2.879,82)
- (-) Inadimplência: R$ (2.636,69)
- (=) Caixa efetivo esperado: R$ 46.843,80
- Transferências realizadas Inter: R$ 54.937,41 (inclui recebimentos de meses anteriores)

---

## 6. RESUMO — POSIÇÃO FINANCEIRA

### Indicadores de Liquidez

| Indicador | Valor | Status |
|-----------|-------|--------|
| **Caixa Disponível** | R$ 10.072,37 | 🔴 Crítico |
| **Runway** | 0 meses (deficit imediato) | 🔴 Crítico |
| **Burn Rate Líquido** | ~R$ 15.000-18.000/mês | 🔴 Crítico |
| **Dias de Caixa** | ~4 dias de OpEx | 🔴 Crítico |
| **Deficit Abril Projetado** | R$ (22.644) a R$ (18.547) | 🔴 |
| **Break-Even MRR Necessário** | R$ 72.000 (+32% vs atual) | 🟡 |

### Diagnóstico

A Nexuz opera com **deficit estrutural**:
- Receita líquida mensal: ~R$ 47-52K
- Despesas mensais: ~R$ 65-70K
- Gap: R$ 13-23K/mês

**Causas raiz do deficit:**
1. **CPV elevado:** Oracle R$ 14.910/mês (28,5% da receita líquida) — margem bruta de 56% vs benchmark de 70%+
2. **P&D sobre-dimensionado:** Fornecedores dev R$ 37K/mês (71% da receita líquida)
3. **Estagnação de receita:** MRR praticamente estável em R$ 54-55K desde jan/2026
4. **Zero receita não-recorrente:** Sem setup fees ou serviços adicionais gerando receita complementar

### Cenário de Sobrevivência

Para sobreviver os próximos 6 meses sem aporte:

| Ação | Economia/Receita Mensal | Impacto |
|------|------------------------|---------|
| Renegociar Oracle (-50%) | +R$ 7.455 | Essencial |
| Reduzir fornecedores dev (-20%) | +R$ 7.425 | Alto impacto em P&D |
| Expansão MRR (+10 clientes Delivery) | +R$ 1.050 | Incremental |
| Cobrança inadimplência Amor Espresso | +R$ 964 (one-time) | Pontual |
| **Total** | **+R$ 16.894/mês** | Fecha gap parcialmente |

---

*Análise gerada por �� Flavia Fluxo — Analista de Fluxo de Caixa & DRE*
*Nexuz Financial Analysis Squad | v1 | 2026-04-04*
*Fonte: Asaas API + Banco Inter (Sheets) + Contas a Pagar (Sheets) + Dashboard Geral*
*Nota: Valores marcados [EST] são estimativas. Orçado não disponível — coluna omitida no comparativo.*
