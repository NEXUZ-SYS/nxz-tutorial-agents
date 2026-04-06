---
type: agent
agent: diana-dados
execution: subagent
inputFile: squads/nexuz-finance/pipeline/data/analysis-focus.md
outputFile: squads/nexuz-finance/output/dados-extraidos.md
---

## Extração de Dados

Diana Dados extrai dados de todas as fontes configuradas para o período definido no checkpoint anterior.

### Fontes
1. **Asaas API** — clientes, cobranças, assinaturas, pagamentos, inadimplência
2. **Google Sheets** — pagamentos Inter, títulos a pagar, lançamentos
3. **Odoo** — contatos e dados complementares (quando MCP configurado)

### Saída Esperada
Dataset normalizado com:
- Lista de clientes ativos e inativos no período
- Cobranças por status (paga, pendente, vencida, cancelada)
- Valores recebidos por tipo de pagamento
- Títulos a pagar do Inter
- Resumo de volumes por fonte
