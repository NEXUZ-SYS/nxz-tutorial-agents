---
type: checkpoint
outputFile: squads/nxz-erpnext-setup/pipeline/data/scope-selection.md
---

# Step 00: Seleção do Escopo de Configuração

## Contexto
Esta squad configura o ERPNext (Frappe v16) em cima da stack local
`frappe_docker` (fork nxz). O fluxo é: entrevista → pesquisa → design (EDD) →
execução em camadas → auditoria → documentação.

Antes de começar, precisa decidir até onde a squad deve ir nesta execução.
Execuções posteriores podem expandir escopo — a stack e os dados anteriores
são preservados (exceto se o usuário rodar `reset.sh`).

## Perguntas

### Qual o escopo desta execução?
Recomendamos começar pelo núcleo (Stack + API + Company + COA) e expandir depois.

1. Núcleo — Stack lifecycle + API access + Company + Fiscal Year + COA
2. Núcleo + Master Data — Adiciona UOM, Item Groups, Items, Customers, Suppliers, Warehouses
3. Completo — Núcleo + Master Data + Users/Roles + Custom Fields + Workflows básicos
4. Full Stack — Tudo acima + Custom Doctypes + Server Scripts + Webhooks (squad mais longa)

### A stack `nxz-erpnext:v16` já está rodando localmente?
1. Sim, já está up (vou fornecer a porta no próximo checkpoint)
2. Não, precisa buildar + subir (squad vai rodar `build.sh` + `up.sh`)
3. Sim, mas precisa reset limpo (squad vai rodar `reset.sh` + `up.sh`)
4. Não sei — squad verifica e decide
