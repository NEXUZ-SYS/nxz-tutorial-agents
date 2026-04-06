---
id: executive-summary
title: Gerar Resumo Executivo
agent: renato-relatorio
order: 2
depends_on:
  - compile-dashboards
input:
  - dashboards-operacionais.md
output: resumo-executivo.md
---

# Gerar Resumo Executivo

Produzir um resumo executivo de 1 página com Health Score, KPIs principais, alertas e oportunidades para board e sócios.

---

## Process

1. **Extrair KPIs-chave** dos dashboards operacionais compilados — selecionar os 5 mais relevantes para decisão estratégica
2. **Calcular Health Score** (0-100) — média ponderada dos KPIs com base na tabela de pesos:
   - MRR Growth: 25%
   - Churn/NRR: 25%
   - Unit Economics (LTV:CAC): 20%
   - Margem/DRE: 15%
   - Runway/Caixa: 15%
3. **Classificar Health Score** — 🟢 ≥75, 🟡 50-74, 🔴 <50
4. **Identificar Top 3 Alertas** — KPIs em 🔴 ou 🟡 com tendência de piora, priorizados por impacto financeiro
5. **Identificar Top 3 Oportunidades** — áreas com potencial de melhoria quantificável
6. **Redigir narrativa** — parágrafo de 3-4 linhas conectando a situação geral, o principal risco e a principal oportunidade
7. **Formatar em 1 página** — cortar tudo que não seja essencial. Se não cabe, simplificar
8. **Revisar** — garantir que todo número do resumo bate com os dashboards

---

## Output Format

```markdown
# 📋 Resumo Executivo — Saúde Financeira | [Mês/Ano]
**Health Score: [X]/100** [🟢|🟡|🔴]

## Visão Geral
[Parágrafo narrativo de 3-4 linhas]

## KPIs Principais
| KPI | Atual | Mês Anterior | Δ | Meta | Status |
|-----|-------|-------------|---|------|--------|
| ... | ... | ... | ... | ... | ... |

## 🔴 Top 3 Alertas
1. [Alerta + impacto estimado + recomendação]
2. [Alerta + impacto estimado + recomendação]
3. [Alerta + impacto estimado + recomendação]

## 🟢 Top 3 Oportunidades
1. [Oportunidade + potencial estimado + ação sugerida]
2. [Oportunidade + potencial estimado + ação sugerida]
3. [Oportunidade + potencial estimado + ação sugerida]

## Recomendação Principal
[1-2 frases com a ação mais importante para o próximo mês]
```

---

## Output Example

```markdown
# 📋 Resumo Executivo — Saúde Financeira | Março 2026
**Health Score: 72/100** 🟡

## Visão Geral
A empresa mantém crescimento saudável de MRR (+5,4%), mas o churn subiu pelo segundo mês consecutivo, pressionando o NRR para abaixo de 110%. O caixa segue confortável com 14 meses de runway, porém a tendência requer atenção para evitar deterioração no próximo trimestre.

## KPIs Principais
| KPI | Atual | Anterior | Δ | Meta | Status |
|-----|-------|----------|---|------|--------|
| MRR | R$ 485K | R$ 460K | +5,4% | +5% | 🟢 |
| Gross Churn | 3,2% | 2,8% | +0,4pp | <2% | 🟡 |
| NRR | 108% | 112% | -4pp | >110% | 🟡 |
| LTV:CAC | 3,8:1 | 4,1:1 | -0,3 | >3:1 | 🟢 |
| Runway | 14m | 16m | -2m | >12m | 🟢 |

## 🔴 Top 3 Alertas
1. **Churn acelerando** — +0,4pp em 1 mês. Se mantiver ritmo, MRR estagna em 3 meses. → Investigar segmento com maior churn
2. **NRR abaixo de 110%** — expansão não compensa churn. → Priorizar upsell no segmento Enterprise
3. **CAC subindo** — +12% sem melhora em conversão. → Revisar canais de aquisição

## 🟢 Top 3 Oportunidades
1. **Expansão Enterprise** — potencial de +R$ 45K/mês com upsell de módulo fiscal
2. **Recuperação de inadimplência** — R$ 28K em 90+ dias recuperáveis com régua de cobrança
3. **Otimização de CAC** — canal orgânico com CAC 60% menor que pago

## Recomendação Principal
Priorizar retenção sobre aquisição no próximo mês. Montar task force de churn focada nos 10 maiores clientes em risco.
```

---

## Quality Criteria

- [ ] Health Score calculado com pesos corretos e classificação coerente
- [ ] Máximo 5 KPIs na tabela principal — somente os mais estratégicos
- [ ] Todos os alertas têm impacto estimado E recomendação
- [ ] Todas as oportunidades têm potencial estimado E ação sugerida
- [ ] Narrativa de Visão Geral em no máximo 4 linhas
- [ ] Relatório cabe em 1 página (sem scroll extenso)
- [ ] Números 100% consistentes com dashboards operacionais
- [ ] Recomendação principal é específica e acionável

---

## Veto Conditions

- Health Score sem metodologia de cálculo explícita
- Relatório ultrapassa 1 página
- Alertas sem recomendação associada
- Números divergem dos dashboards operacionais
- Ausência de comparação com mês anterior em qualquer KPI
- Recomendação genérica sem ação concreta
