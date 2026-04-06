# Revisao Estrategica CFO — Abril/2026

**Revisor:** Carlos CFO — Strategic Reviewer
**Data:** 2026-04-03
**Documentos revisados:** dados-extraidos.md, analise-receita.md, analise-fluxo-dre.md, relatorio-consolidado.md

---

## Validacao Metodologica

| Item | Status | Observacao |
|------|--------|-----------|
| MRR Calculo | ✅ Correto | Normalizacao mensal/semestral/anual adequada. Fonte: Asaas API real |
| ARPA | ✅ Correto | R$ 440,27 = MRR R$ 54.593,32 / 124 assinaturas |
| Inadimplencia | ✅ Correto | 5,0% = R$ 2.636,69 / R$ 52.360,31 (base marco) |
| NRR proxy | ⚠️ Ressalva | Faturamento/MRR como proxy superestima churn real. NRR real requer dados historicos |
| DRE Custos | ❌ Nao confiavel | 100% estimado. Margem bruta e EBITDA sao indicativos, nao factuais |
| Fluxo de Caixa | ❌ Incompleto | Sem despesas, sem saldo bancario. Apenas projecao de receita |
| Cenarios Anuais | ⚠️ Ressalva | Premissas razoaveis, mas alta sensibilidade ao churn |
| Aging | ✅ Correto | 100% na faixa 1-30 dias. Sem inadimplencia cronica |

---

## Health Score: 55/100 🟡

| Dimensao | Peso | Nota | Ponderado | Justificativa |
|----------|------|------|-----------|---------------|
| Crescimento (MRR) | 25% | 60 | 15,0 | MRR estavel, sem evidencia de crescimento ou queda |
| Retencao (Churn/NRR) | 25% | 40 | 10,0 | Inadimplencia 5% (critico) + 36 clientes sem assinatura |
| Eficiencia (Unit Eco) | 20% | 30 | 6,0 | CAC, LTV, Quick Ratio indisponiveis |
| Rentabilidade (Margem) | 15% | 70 | 10,5 | Margem bruta ~74% saudavel SE confirmada com custos reais |
| Liquidez (Runway) | 15% | 55 | 8,3 | Cenario base positivo, saldo real desconhecido |
| **TOTAL** | **100%** | | **49,8 → 55*** | *+5: base 100% recorrente e diversificada |

### Interpretacao do Score
- **55/100 = Sinais de alerta. Acoes corretivas necessarias.**
- Score deprimido pela falta de dados (~40% de visibilidade), nao necessariamente por problemas reais
- Com dados completos, score provavel seria 65-75 (saudavel com pontos de atencao)

---

## Top 3 Riscos

| # | Risco | Probabilidade | Impacto | Classificacao |
|---|-------|---------------|---------|---------------|
| 1 | **Churn silencioso** — 36 clientes sem assinatura | Alta | Alto | 🔴 Acao imediata |
| 2 | **Inadimplencia persistente** — 5% vs benchmark 2% | Alta | Medio | 🔴 Mitigar |
| 3 | **Cegueira financeira** — 60% dos dados indisponiveis | Alta | Alto | 🔴 Acao imediata |

### Detalhamento de Riscos

**Risco 1 — Churn silencioso**
- 36 de 160 clientes cadastrados nao tem assinatura ativa (22,5%)
- Se forem churn real: ~R$ 15.850/mes perdidos (36 x ARPA R$ 440)
- Impacto potencial no ARR: -R$ 190.200/ano
- Acao: Auditoria individual dos 36 clientes em 2 semanas

**Risco 2 — Inadimplencia persistente**
- 5,0% esta 2,5x acima do benchmark SaaS (<2%)
- Amor Espresso concentra R$ 963,70 em 3 filiais — grupo economico em risco
- 100% boleto maximiza inadimplencia (sem debito automatico)
- Acao: Cobranca prioritaria Amor Espresso + plano de migracao para PIX/cartao

**Risco 3 — Cegueira financeira**
- Sem Google Sheets (Inter): nao sabemos o saldo bancario nem as contas a pagar
- Sem historico: nao sabemos se MRR esta crescendo ou encolhendo
- Sem custos: margens e runway sao estimativas, nao fatos
- Acao: Reconectar infraestrutura de dados ANTES da proxima analise

---

## Recomendacoes Estrategicas (3 — priorizadas)

### 1. 🔴 URGENTE — Auditoria dos 36 clientes sem assinatura
- **O que:** Verificar cada cliente: churn? migracao? erro cadastral?
- **Quem:** Comercial + CS
- **Prazo:** 2 semanas
- **ROI estimado:** Se 10% forem recuperaveis = ~R$ 1.585/mes
- **Metrica de sucesso:** Lista completa classificada (churn/ativo/erro) em 14 dias

### 2. 🔴 URGENTE — Resolver infraestrutura de dados
- **O que:** Reconectar Google Sheets MCP, criar snapshots mensais de MRR, configurar alertas Asaas
- **Quem:** TI + Financeiro
- **Prazo:** 1 semana
- **ROI:** Visibilidade financeira de 40% para 90%+
- **Metrica de sucesso:** Proxima execucao deste pipeline com completude >80%

### 3. 🟡 MEDIO PRAZO — Diversificar metodos de pagamento
- **O que:** Implementar PIX recorrente e cartao de credito como opcoes
- **Quem:** Produto + Financeiro
- **Prazo:** 1 mes
- **ROI estimado:** Reducao de inadimplencia de 5% para ~2% = R$ 1.580/mes
- **Metrica de sucesso:** Taxa de inadimplencia <3% em 60 dias

---

## Parecer Final

### APROVADO COM RESSALVAS ✅⚠️

**O que esta bom:**
- MRR de R$ 54.593 e solido para o porte
- 100% receita recorrente — previsibilidade excelente
- Concentracao baixa (top 15 = 19,4%)
- Diversificacao geografica (17 estados)
- Inadimplencia toda na faixa 1-30 dias (sem cronico)

**O que preocupa:**
- Inadimplencia 5% (2,5x acima do benchmark)
- 36 clientes sem assinatura = possivel churn silencioso
- 60% dos dados financeiros indisponiveis

**Mensagem para o board:**
"A Nexuz tem uma base de receita recorrente solida (R$ 655K ARR) com boa diversificacao. Os dois riscos imediatos sao: inadimplencia acima do aceitavel (5% vs 2%) e possivel churn nao rastreado (36 clientes). A maior urgencia, porem, e operacional: precisamos de visibilidade financeira completa antes de tomar decisoes estrategicas. Recomendo priorizar a infraestrutura de dados esta semana."

---

*Parecer emitido por Carlos CFO — Strategic Reviewer*
*Nexuz Financial Analysis Squad | 2026-04-03*
