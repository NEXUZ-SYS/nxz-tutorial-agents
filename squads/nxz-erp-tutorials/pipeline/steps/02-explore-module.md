---
id: explore-module
agent: explorer
execution: subagent
model_tier: powerful
inputFile: squads/nxz-erp-tutorials/output/topic-selection.md
outputFile: squads/nxz-erp-tutorials/output/module-analysis.yaml
---

# Exploracao do Modulo

## Objetivo

Analisar o codigo-fonte do modulo selecionado no Odoo 12 e produzir um mapeamento completo
de menus, telas, campos, botoes e fluxos operacionais.

## Instrucoes

1. Leia o arquivo de selecao de topico para entender qual modulo/funcionalidade documentar
2. Se o codebase estiver disponivel (config `erp_codebase` no squad.yaml), explore o codigo-fonte
3. Se o codebase NAO estiver disponivel (null), explore o Odoo via interface web usando Playwright:
   - Leia as credenciais do arquivo `.env` (ODOO_SAAS_URL, ODOO_SAAS_USER, ODOO_SAAS_PASSWORD)
   - Navegue pelos menus do modulo para mapear telas, campos e fluxos
4. Localize o modulo correspondente
4. Mapeie completamente:
   - Estrutura de menus (menuitem XML)
   - Views (form, tree, kanban) com todos os campos
   - Models com campos, tipos e constraints
   - Grupos de acesso (ir.model.access.csv, security groups)
   - Workflows e transicoes de estado
   - Botoes e acoes server
5. Documente o fluxo operacional passo a passo
6. Identifique pontos criticos para screenshots
7. Salve a analise no formato YAML estruturado

## Contexto

- **Codebase:** Definido em squad.yaml config.erp_codebase (pode ser null se indisponivel)
- **Odoo URL:** Definido em .env (ODOO_SAAS_URL) — usar para exploracao via interface web
- **Framework:** Odoo 12 (Python, XML views, PostgreSQL)
- **Foco:** Mapeamento operacional (como o usuario usa), nao tecnico

## Veto Conditions

- Analise nao contem caminho de menus
- Analise nao lista campos dos formularios
- Analise nao identifica persona alvo
- Analise inventa funcionalidades nao encontradas no codigo
