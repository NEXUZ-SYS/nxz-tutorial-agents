---
id: strategic-review
title: Revisão Estratégica e Health Score
agent: carlos-cfo
order: 2
depends_on:
  - validate-methodology
input:
  - dashboards-operacionais.md
  - resumo-executivo.md
  - validacao-metodologica.md
output: revisao-estrategica.md
---

# Revisão Estratégica e Health Score

Produzir análise estratégica final com avaliação de riscos, recomendações priorizadas e Health Score consolidado.

---

## Process

1. **Incorporar correções** da validação metodológica — recalcular métricas se necessário
2. **Posicionar vs benchmarks SaaS** — cada KPI comparado com Excelente/Bom/Atenção/Crítico do mercado
3. **Calcular Health Score** (0-100) por dimensão com pesos:
   - Crescimento (MRR Growth, New MRR): 25%
   - Retenção (Gross Churn, NRR): 25%
   - Eficiência (LTV:CAC, Payback, CAC): 20%
   - Rentabilidade (Margem Bruta, EBITDA): 15%
   - Liquidez (Runway, Quick Ratio, Caixa): 15%
4. **Mapear riscos** — identificar 3-5 riscos principais, classificar na matriz Probabilidade × Impacto
5. **Projetar cenários** — Base, Otimista, Pessimista para MRR e Runway em 3 e 6 meses, com premissas explícitas
6. **Formular recomendações** — máximo 3, priorizadas por impacto × urgência, com ROI estimado
7. **Emitir parecer final** — aprovado, aprovado com ressalvas, ou rejeitado para apresentação ao board
8. **Redigir nota ao board** — 2-3 parágrafos com visão do CFO sobre a saúde da empresa

---

## Output Format

```markdown
# 🎯 Revisão Estratégica — [Mês/Ano]

## Health Score Final: [X]/100 [🟢|🟡|🔴]

### Composição
| Dimensão | Peso | Nota | Ponderado | Benchmark |
|----------|------|------|-----------|-----------|
| Crescimento | 25% | [X] | [X] | [posição] |
| Retenção | 25% | [X] | [X] | [posição] |
| Eficiência | 20% | [X] | [X] | [posição] |
| Rentabilidade | 15% | [X] | [X] | [posição] |
| Liquidez | 15% | [X] | [X] | [posição] |

## Análise de Riscos
[Matriz com top 3-5 riscos]

## Projeção de Cenários
[Tabela com Base/Otimista/Pessimista para 3 e 6 meses]

## Recomendações Estratégicas
[Máximo 3, priorizadas, com ROI]

## Parecer Final
[APROVADO | APROVADO COM RESSALVAS | REJEITADO]
[Justificativa]

## Nota ao Board
[2-3 parágrafos com visão do CFO]
```

---

## Output Example

```markdown
# 🎯 Revisão Estratégica — Março 2026

## Health Score Final: 68/100 🟡

### Composição
| Dimensão | Peso | Nota | Ponderado | vs Mercado |
|----------|------|------|-----------|------------|
| Crescimento | 25% | 78 | 19,5 | Bom |
| Retenção | 25% | 55 | 13,8 | Atenção |
| Eficiência | 20% | 72 | 14,4 | Bom |
| Rentabilidade | 15% | 70 | 10,5 | Bom |
| Liquidez | 15% | 65 | 9,8 | Atenção |

## Análise de Riscos
| # | Risco | Prob. | Impacto | Classe | Ação |
|---|-------|-------|---------|--------|------|
| 1 | Aceleração do churn | Alta | Alto | 🔴 | Task force imediata |
| 2 | Runway encurtando | Média | Alto | 🔴 | Otimizar burn rate |
| 3 | Concentração de receita | Média | Médio | 🟡 | Diversificar base |
| 4 | CAC crescente | Média | Médio | 🟡 | Revisar canais |

## Projeção de Cenários
| Cenário | MRR 3m | MRR 6m | Runway 3m | Runway 6m | Premissas |
|---------|--------|--------|-----------|-----------|-----------|
| Otimista | R$ 545K | R$ 620K | 16m | 18m | Churn cai para 2%, expansion +20% |
| Base | R$ 510K | R$ 540K | 12m | 10m | Tendências atuais mantidas |
| Pessimista | R$ 470K | R$ 430K | 9m | 6m | Churn sobe para 5%, sem expansion |

## Recomendações Estratégicas
1. **Task force de retenção** (Urgência: ALTA | ROI: R$ 50K/mês)
   - Mapear top 20 clientes em risco, ação proativa em 2 semanas
2. **Revisão de pricing** (Urgência: MÉDIA | ROI: R$ 30K/mês)
   - Implementar tier Enterprise com expansion built-in
3. **Otimização de burn** (Urgência: MÉDIA | ROI: R$ 15K/mês)
   - Renegociar infra (-15%) e consolidar ferramentas redundantes

## Parecer Final
**APROVADO COM RESSALVAS**
Relatórios podem ser apresentados ao board após correção do cálculo de CAC (excluir CS). Health Score deve ser recalculado para refletir a correção. Demais dados e análises estão consistentes e adequados.

## Nota ao Board
A empresa encerra março com crescimento sólido de MRR (+5,4%), mas com sinais de alerta na retenção que precisam de atenção imediata. O churn crescente pelo segundo mês consecutivo é o principal risco — se não contido, pode anular o crescimento em 3-4 meses.

Recomendo que a prioridade do próximo trimestre seja retenção sobre aquisição. A base de clientes atual tem potencial de expansão significativo que não está sendo capturado. Com as ações recomendadas, projetamos estabilização do churn e retomada do NRR acima de 110% até junho.

O caixa está confortável mas merece monitoramento mensal. O cenário pessimista coloca o runway em 6 meses ao fim do semestre — precisamos garantir que não cheguemos lá.
```

---

## Quality Criteria

- [ ] Health Score calculado com pesos explícitos e nota por dimensão
- [ ] Cada dimensão comparada com benchmark SaaS
- [ ] Mínimo 3 riscos mapeados com classificação Probabilidade × Impacto
- [ ] Cenários Base/Otimista/Pessimista com premissas documentadas
- [ ] Máximo 3 recomendações com ROI estimado e urgência
- [ ] Parecer final claro com justificativa
- [ ] Nota ao board em linguagem estratégica, 2-3 parágrafos
- [ ] Correções da validação metodológica incorporadas
- [ ] Rule of 40 calculado e posicionado vs benchmark

---

## Veto Conditions

- Health Score sem composição detalhada por dimensão
- Recomendações sem ROI estimado ou sem priorização
- Mais de 3 recomendações estratégicas (falta de priorização)
- Cenários sem premissas explícitas
- Parecer final sem justificativa
- Correções da validação metodológica não incorporadas
- Nota ao board com linguagem técnica inadequada para audiência
