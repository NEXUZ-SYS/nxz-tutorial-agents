# Scope Selection — Run 2026-04-22-150201

**Run ID:** 2026-04-22-150201
**Date:** 2026-04-22

## Escopo selecionado
**Núcleo** — Stack lifecycle + API access + Company + Fiscal Year + Chart of Accounts.

Fora de escopo nesta execução (fica para runs futuras):
- Master Data (UOM, Item Groups, Items, Customers, Suppliers, Warehouses)
- Users/Roles/Permissions
- Custom Fields / Workflows
- Custom Doctypes / Server Scripts / Webhooks

## Status da stack
**Sim, já está up** — usuário fornece `HTTP_PUBLISH_PORT` no próximo checkpoint.
Squad NÃO vai rodar `build.sh`, `up.sh` nem `reset.sh` nesta execução.

## Implicações para os próximos steps
- Step 01 coleta: HTTP_PUBLISH_PORT, user AI, path do frappe_docker, dados básicos da Nexuz (razão social, CNPJ, moeda, fiscal year).
- Step 02 (entrevista) foca em: estrutura societária, plano de contas brasileiro, ano fiscal, moeda, país.
- Step 04 (pesquisa) foca em: Company, Fiscal Year, Chart of Accounts no ERPNext v16.
- Step 06 (EDD) foca apenas na camada núcleo.
- Step 08 executa apenas camada 1 (lifecycle/api) e camada 2 (company/fiscal/COA).
