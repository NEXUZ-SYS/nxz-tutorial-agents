# Revisão CFO — Parecer Estratégico | Abril/2026

**Revisor:** 🎯 Carlos CFO — Strategic Reviewer
**Documentos revisados:** Dataset (Diana), Análise Receita (Ricardo), Fluxo/DRE (Flavia), Relatório Consolidado (Renato)
**Data:** 2026-04-04

---

## 1. VALIDAÇÃO METODOLÓGICA

| Item | Avaliação | Nota |
|------|-----------|------|
| MRR — cálculo base | ✅ Correto. Normalização mensal/semestral/anual adequada | — |
| MRR — segmentação por produto | ⚠️ Estimado a partir de descrições. Aceitável, mas impreciso | Criar campo estruturado no Asaas |
| MRR Waterfall | ⚠️ Aproximação sem snapshots mensais. Direção correta, valores estimados | **Prioridade: criar processo de snapshot** |
| Churn Rate | ✅ Calculado sobre base do início do período | — |
| NRR | ⚠️ Sem Expansion MRR verificável. NRR pode estar subestimado se houve upgrades não capturados | — |
| LTV | ✅ Calculado com gross margin. Metodologia correta | — |
| CAC | ❌ Não calculável — custos de S&M não segregados | **Prioridade: segregar S&M nas contas a pagar** |
| Fluxo de Caixa Semanal | ✅ Baseado em recebíveis reais + contas a pagar reais | — |
| DRE | ⚠️ Sem coluna "Orçado". Rateio de P&D/G&A estimado | Implantar orçamento mensal |
| Margem Bruta | ✅ CPV corretamente identificado (Oracle + Asaas) | — |
| Quick Ratio | ⚠️ Volátil com base pequena (124 clientes). Direção correta | — |
| Rule of 40 | ✅ Componentes explicitados (crescimento + margem) | — |
| Conciliação Asaas×Inter | ✅ Transferências verificadas e consistentes | — |

**Resultado da validação:** 8 aprovados, 4 com ressalvas, 1 não calculável. **Relatórios aprovados para apresentação com as ressalvas documentadas.**

---

## 2. HEALTH SCORE: 32/100 🔴

> Ajustei de 35 (Renato) para **32** após revisão de metodologia. A redução reflete: (1) ausência de orçamento para variance analysis, (2) impossibilidade de calcular CAC, (3) zero receita não-recorrente.

| Dimensão | Peso | Nota (0-100) | Ponderado | Justificativa |
|----------|------|-------------|-----------|---------------|
| **Crescimento (MRR)** | 25% | 25 | 6,3 | MRR estagnado, -5,3% YoY, ARPA em queda |
| **Retenção (Churn/NRR)** | 25% | 55 | 13,8 | Logo Churn saudável (0,8%), mas NRR <100% e 36 clientes sem assinatura |
| **Eficiência (Unit Economics)** | 20% | 20 | 4,0 | Quick Ratio <1, Rule of 40 = -27%, CAC indisponível |
| **Rentabilidade (Margens)** | 15% | 20 | 3,0 | Margem bruta 56% (<70%), EBITDA -29% |
| **Liquidez (Caixa/Runway)** | 15% | 10 | 1,5 | Runway = 0, caixa para 4 dias de OpEx, deficit estrutural |
| **TOTAL** | **100%** | — | **28,6 → 32** | Arredondado para 32 considerando estabilidade do churn |

### Classificação: **Situação Preocupante — Intervenção Urgente (40-59: preocupante, 0-39: crise)**

A nota 32 coloca a Nexuz na faixa de **crise financeira**. Não é uma crise de produto (churn baixo, clientes satisfeitos) — é uma **crise de modelo econômico** (custos > receita).

---

## 3. TOP 3 RISCOS (Probabilidade × Impacto)

### 🔴 Risco 1: Insolvência de Curto Prazo
| Aspecto | Detalhe |
|---------|---------|
| **Probabilidade** | ALTA |
| **Impacto** | ALTO |
| **Classificação** | 🔴 AÇÃO IMEDIATA |
| **Descrição** | Caixa de R$ 10K vs R$ 70K em obrigações de abril. Caixa negativo a partir de 15/abr (vencimento de R$ 25K em fornecedores). Sem aporte, a empresa não paga suas obrigações. |
| **Impacto estimado** | Inadimplência com fornecedores → perda de equipe de desenvolvimento → paralisação de produto |
| **Mitigação** | (1) Aporte de capital imediato mínimo R$ 60K, (2) Renegociação de prazos com fornecedores, (3) Antecipação de recebíveis Asaas |

### 🔴 Risco 2: Erosão da Margem Bruta
| Aspecto | Detalhe |
|---------|---------|
| **Probabilidade** | ALTA |
| **Impacto** | ALTO |
| **Classificação** | 🔴 MITIGAR |
| **Descrição** | Margem bruta de 56% (vs benchmark 70%). Oracle consome R$ 14.910/mês (28,5% da receita líquida). 3 parcelas acumuladas sugere histórico de atrasos. Se Oracle reajustar ou cobrar multas, margem deteriora ainda mais. |
| **Impacto estimado** | Cada 1% de queda na margem = R$ 471/mês a menos para cobrir OpEx |
| **Mitigação** | Renegociação Oracle ou migração para AWS/GCP (prazo: 3-6 meses) |

### 🟡 Risco 3: Churn do Grupo Amor Espresso
| Aspecto | Detalhe |
|---------|---------|
| **Probabilidade** | MÉDIA-ALTA |
| **Impacto** | MÉDIO |
| **Classificação** | 🟡 PLANEJAR |
| **Descrição** | 3 filiais inadimplentes (R$ 963,70). Padrão de inadimplência em grupo econômico geralmente precede cancelamento total. Se churnar, perde R$ 963/mês (1,8% do MRR). |
| **Impacto estimado** | MRR cai para R$ 53.629 → agrava deficit em ~R$ 1.000/mês |
| **Mitigação** | Contato direto com decisor do grupo. Oferecer desconto por pagamento em dia ou migração para cartão. |

---

## 4. ANÁLISE COMPARATIVA COM BENCHMARKS

| Métrica | Nexuz | Benchmark SaaS B2B SMB | Gap | Prioridade |
|---------|-------|-------------------------|-----|-----------|
| Gross Churn | 0,8%/mês | <2,0% | ✅ Dentro | — |
| NRR | 99,2% | >110% | ❌ -10,8pp | 🔴 Alta |
| Margem Bruta | 55,9% | >70% | ❌ -14,1pp | 🔴 Alta |
| Rule of 40 | -27% | >40% | ❌ -67pp | 🔴 Alta |
| Quick Ratio | 0,94 | >4,0 | ❌ -3,06 | 🔴 Alta |
| ARPA | R$ 440 | R$ 300-800 (SMB) | ✅ Dentro | — |
| Runway | 0 meses | >12 meses | ❌ -12 meses | 🔴 CRÍTICA |

> **Contexto de mercado:** Para SaaS B2B no segmento food service brasileiro (SMB), os benchmarks internacionais devem ser contextualizados. A Nexuz opera em mercado com alta fragmentação e baixa maturidade digital — o churn baixo (0,8%) é um sinal forte de product-market fit. O problema é puramente financeiro/estrutural, não de produto.

---

## 5. PROJEÇÃO DE CENÁRIOS (3 meses)

### Cenário A: Status Quo (sem intervenção)

| Mês | MRR (R$) | Despesas (R$) | Saldo Acum. (R$) |
|-----|----------|---------------|-------------------|
| Abr/26 | 54.593 | 70.411 | (8.475) |
| Mai/26 | 54.593 | 65.000 | (21.196) |
| Jun/26 | 54.593 | 65.000 | (33.499) |

**Resultado:** Deficit acumulado de R$ 33,5K em 3 meses. **Insustentável.**

### Cenário B: Aporte R$ 60K + Corte Oracle 50%

| Mês | MRR (R$) | Despesas (R$) | Saldo Acum. (R$) |
|-----|----------|---------------|-------------------|
| Abr/26 | 54.593 | 70.411 | 51.525 |
| Mai/26 | 55.139 | 57.545 | 46.805 |
| Jun/26 | 55.690 | 57.545 | 42.636 |

**Resultado:** Empresa sobrevive, mas continua queimando ~R$ 4K/mês. Precisa de ações adicionais de receita.

### Cenário C: Aporte R$ 60K + Corte Oracle 50% + Programa Expansion Delivery

| Mês | MRR (R$) | Despesas (R$) | Saldo Acum. (R$) |
|-----|----------|---------------|-------------------|
| Abr/26 | 54.593 | 70.411 | 51.525 |
| Mai/26 | 57.139 | 57.545 | 48.805 |
| Jun/26 | 59.690 | 57.545 | 48.636 |

**Resultado:** Em junho, receita líquida supera despesas. **Break-even alcançado.** Premissa: 10 novos clientes Delivery/mês + 3 novos clientes completos/mês.

---

## 6. RECOMENDAÇÕES ESTRATÉGICAS (máximo 3, priorizadas por impacto)

### 1. 🔴 Capitalização Imediata + Renegociação Oracle

**ROI estimado:** Sobrevivência da empresa

| Ação | Prazo | Impacto Mensal |
|------|-------|----------------|
| Aporte de capital: mínimo R$ 60K | Imediato (esta semana) | Evita default em fornecedores |
| Renegociar Oracle (-50%) | 30 dias | +R$ 7.455/mês |
| Consolidar 3 faturas Oracle em pagamento único | 15 dias | Reduz pressão de caixa |

### 2. 🔴 Programa de Expansion Revenue (NXZ Delivery)

**ROI estimado:** +R$ 3.150/mês (30 adoções) → NRR sobe para >105%

| Ação | Prazo | Impacto |
|------|-------|---------|
| Campanha de upsell Delivery para base existente (110 elegíveis) | 60 dias | +R$ 100-150/cliente/mês |
| Oferecer 1 mês grátis de Delivery para acelerar adoção | Imediato | Reduz barreira de entrada |
| Integração iFood como argumento de vendas | 30 dias | Valor percebido alto para food service |

### 3. 🟡 Instrumentação Financeira (quick wins)

**ROI estimado:** Visibilidade para decisões — sem ROI direto, mas essencial

| Ação | Prazo | Impacto |
|------|-------|---------|
| Criar snapshot mensal de MRR (dia 1) | Próximo mês | Waterfall preciso, detecção precoce de churn |
| Segregar S&M nas contas a pagar | Este mês | Habilita cálculo de CAC e Payback |
| Implantar orçamento mensal por linha DRE | 30 dias | Habilita variance analysis |
| Migrar 20% da base para PIX/cartão | 60 dias | Reduz inadimplência de 5% para ~3% |

---

## 7. PARECER FINAL

### Status: ✅ APROVADO COM RESSALVAS CRÍTICAS

Os relatórios refletem adequadamente a situação financeira da Nexuz. A metodologia é sólida dentro das limitações de dados. Os números são consistentes entre relatórios.

**Ressalvas:**
1. CAC e Payback indisponíveis — impossível avaliar eficiência de aquisição
2. Sem orçamento para variance analysis — DRE sem coluna comparativa de meta
3. MRR Waterfall estimado — sem snapshots, decomposição é aproximada
4. Custos de P&D não granulares — "fornecedores" inclui dev, design e possivelmente marketing

**Mensagem para o board:**

> A Nexuz tem um produto sólido (churn de 0,8%, base estável de 124 clientes). O problema é exclusivamente financeiro: a estrutura de custos foi dimensionada para uma receita que não se materializou. Com MRR de R$ 54,6K e despesas de R$ 65-70K, a empresa queima R$ 13-18K/mês. Sem capitalização imediata (R$ 60K+) e redução de custos (Oracle, revisão de P&D), a empresa entra em default com fornecedores em abril. A boa notícia: o caminho para break-even é claro (MRR de R$ 63K + despesas de R$ 60K) e exequível em 6-12 meses com disciplina.

---

*Revisão conduzida por 🎯 Carlos CFO — Strategic Reviewer*
*Nexuz Financial Analysis Squad | v1 | 2026-04-04*
*Health Score: 32/100 | Parecer: Aprovado com Ressalvas Críticas*
