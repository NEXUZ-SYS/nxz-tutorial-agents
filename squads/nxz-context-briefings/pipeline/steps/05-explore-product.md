---
id: explore-product
agent: navigator
execution: inline
inputFile: squads/nxz-context-briefings/output/briefing-config.md
outputFile: squads/nxz-context-briefings/output/product-exploration.yaml
---

# Exploracao do Produto via Playwright

## Objetivo

Navegar pelo produto selecionado usando Playwright para validar informacoes e coletar dados reais.

## Instrucoes

1. Leia a configuracao do briefing e a entrevista para entender o foco
2. Leia as credenciais do arquivo `.env` (ODOO_SAAS_URL, ODOO_SAAS_USER, ODOO_SAAS_PASSWORD)
3. Navegue pelo produto usando Playwright:

### Para NXZ ERP:
- Login no Odoo
- Navegue pelos modulos relevantes ao briefing
- Capture screenshots de: dashboard, menus principais, formularios-chave, relatorios
- Documente o caminho de navegacao (menu > submenu > tela)
- Identifique integracoes visiveis com outros produtos

### Para NXZ Go / KDS / Delivery:
- Se o produto estiver acessivel via URL, navegue por ele
- Se nao, use o MCP Odoo (mcp__claude_ai_MCP-skioba) para consultar:
  - Configuracoes do produto (ir.config_parameter, pos.config)
  - Models relacionados
  - Campos e relacoes
- Documente funcionalidades observadas

### Para qualquer produto:
- Capture pelo menos 3-5 screenshots das telas mais relevantes
- Documente a estrutura de navegacao real
- Verifique se informacoes dos contextos existentes estao corretas
- Identifique funcionalidades novas ou nao documentadas

4. Se nao for possivel acessar o produto (sem credenciais, produto offline):
   - Informe o usuario
   - Use os dados da entrevista e da analise como base
   - Marque secoes como "[nao validado via produto]"

5. Salve a exploracao no formato YAML

## Veto Conditions

- Exploracao nao tentou acessar o produto
- Exploracao nao capturou nenhum screenshot (quando o produto e acessivel)
- Exploracao nao documentou o mapa de navegacao
