---
type: agent
agent: ricardo-receita
execution: inline
inputFile: squads/nexuz-finance/output/dados-extraidos.md
outputFile: squads/nexuz-finance/output/analise-receita.md
---

## Análise de Receita Recorrente e Unit Economics

Ricardo Receita analisa os dados extraídos para calcular métricas de receita SaaS.

### Entregas
1. **MRR/ARR Dashboard**: decomposição waterfall (Novo, Expansão, Churn, Contração)
2. **Segmentação**: MRR por produto (ERP, PDV, KDS), por plano, por porte
3. **Churn Analysis**: Logo Churn, Revenue Churn, NRR, cohort matrix
4. **Unit Economics**: LTV, CAC, LTV:CAC, Payback, Quick Ratio SaaS, Rule of 40

### Referências
- pipeline/data/research-brief.md (benchmarks e metas)
- pipeline/data/domain-framework.md (processo de cálculo)
- pipeline/data/anti-patterns.md (erros a evitar)
