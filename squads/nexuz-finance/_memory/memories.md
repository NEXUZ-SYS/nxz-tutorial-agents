# Squad Memory — nexuz-finance

## Run 2026-04-03-173703

### Decisoes do Usuario
- Periodo: Abril/2026 (mes atual)
- Dashboards: Fluxo de Caixa + DRE
- Foco: Visao geral de saude
- Todos os checkpoints aprovados na primeira passagem

### Aprendizados
- **Asaas API Key**: disponivel em `.env` como `ASAAS_API_KEY`. Funciona com MCP Docs Asaas via `execute-request` passando no header `access_token`
- **Google Sheets MCP**: configurado em `.mcp.json` (gsheets) mas NAO conectou nesta sessao. Tools nao aparecem nos servidores ativos. Precisa investigar: pacote `mcp-google-sheets` instalado? Token OAuth valido?
- **Odoo MCP (skioba)**: NAO pertence a Nexuz. E do cliente No. Coffee. Nunca usar para dados Nexuz.
- **Base de clientes**: 160 cadastrados, 124 com assinatura ativa. 36 sem assinatura = possivel churn nao rastreado
- **MRR**: R$ 54.593,32 (105 mensais + 2 semestrais + 17 anuais)
- **Inadimplencia marco**: 5,0% (R$ 2.636,69) — Amor Espresso concentra R$ 963,70 em 3 filiais
- **100% boleto**: todos os pagamentos via boleto. Diversificacao recomendada
- **Completude geral**: ~40% — receita real, custos estimados, banco e historico indisponiveis
- **Health Score CFO**: 55/100 — score deprimido por falta de dados, nao por problemas estruturais

### Proxima Execucao — Pre-requisitos
1. Reconectar Google Sheets MCP (verificar `mcp-google-sheets` e token OAuth)
2. Criar snapshots mensais de MRR (planilha com contagem e valor no dia 1 de cada mes)
3. Configurar Asaas API Key no skill (skill asaas_mcp criada nesta sessao)
4. Investigar os 36 clientes sem assinatura antes de rodar analise de churn
