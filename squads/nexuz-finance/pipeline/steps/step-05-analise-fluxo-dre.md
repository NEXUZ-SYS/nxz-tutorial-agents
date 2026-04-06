---
type: agent
agent: flavia-fluxo
execution: inline
inputFile: squads/nexuz-finance/output/dados-extraidos.md
outputFile: squads/nexuz-finance/output/analise-fluxo-dre.md
---

## Análise de Fluxo de Caixa e DRE

Flavia Fluxo monta os relatórios de fluxo de caixa e DRE com dados de Asaas e Inter.

### Entregas
1. **Fluxo de Caixa Semanal** (próximos 30 dias): projetado x realizado por semana
2. **Fluxo de Caixa Mensal** (3 meses): receitas x despesas, variância acumulada
3. **Fluxo de Caixa Anual** (12 meses): cenários conservador/base/otimista
4. **DRE SaaS**: Mês Atual | Mês Anterior | Mesmo Mês Ano Anterior | Orçado x Realizado
5. **Conciliação**: gap entre receita reconhecida e caixa recebido (taxas Asaas, inadimplência)

### Referências
- pipeline/data/research-brief.md (estrutura DRE SaaS)
- pipeline/data/domain-framework.md (processo)
- squads/nexuz-finance/output/analise-receita.md (MRR para projeções)
