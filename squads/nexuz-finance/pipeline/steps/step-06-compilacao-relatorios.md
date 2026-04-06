---
type: agent
agent: renato-relatorio
execution: inline
inputFile: squads/nexuz-finance/output/analise-receita.md
outputFile: squads/nexuz-finance/output/relatorio-consolidado.md
---

## Compilação de Dashboards e Relatórios

Renato Relatorio consolida todas as análises em relatórios finais para dois públicos.

### Entregas

#### Relatório Executivo (Diretoria / Sócios)
- Resumo de saúde financeira em 1 página (semáforo: verde/amarelo/vermelho)
- KPIs principais: MRR, ARR, Churn, NRR, Runway, Rule of 40
- Top 3 alertas e Top 3 oportunidades
- Recomendações de ação priorizadas

#### Relatório Operacional (Gestão Financeira)
- Dashboards detalhados (MRR waterfall, Fluxo de Caixa, DRE, Cohort)
- Tabelas com dados completos e fontes referenciadas
- Análise de variâncias e explicações
- Inadimplência Asaas com aging

### Inputs
- squads/nexuz-finance/output/analise-receita.md
- squads/nexuz-finance/output/analise-fluxo-dre.md
