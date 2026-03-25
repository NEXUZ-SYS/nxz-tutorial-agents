---
id: capture-screenshots
agent: capturer
execution: inline
inputFile: squads/nxz-erp-tutorials/output/tutorial-draft.md
outputFile: squads/nxz-erp-tutorials/output/screenshot-manifest.yaml
---

# Captura de Screenshots

## Objetivo

Navegar no Odoo 12 via Playwright e capturar screenshots de todas as telas
marcadas no tutorial.

## Instrucoes

1. Leia o tutorial draft e extraia todos os marcadores [SCREENSHOT: ...]
2. Faca login no Odoo usando as credenciais do arquivo `.env` na raiz do projeto:
   - URL: ${ODOO_SAAS_URL}/web/login
   - Email: ${ODOO_SAAS_USER}
   - Senha: ${ODOO_SAAS_PASSWORD}
3. Para cada marcador de screenshot, em ordem:
   a. Navegue ate a tela indicada pelo caminho de menus
   b. Reproduza o estado descrito (preencher campos, selecionar filtros, etc.)
   c. Aguarde a pagina carregar completamente (sem spinners)
   d. Capture a screenshot em resolucao 1920x1080
   e. Salve como PNG no diretorio de output: `screenshots/{NN}-{descricao-curta}.png`
4. Gere o manifesto YAML com a lista de screenshots capturadas
5. Reporte progresso a cada captura: "Capturando X/N: descricao"

## Configuracao Playwright

- Viewport: 1920x1080
- Formato: PNG
- Timeout de navegacao: 30 segundos
- Aguardar `networkidle` antes de capturar
- Em caso de falha, tentar 1 vez antes de marcar como `failed`

## Veto Conditions

- Menos de 50% dos screenshots capturados com sucesso
- Login falhou
- Manifesto nao gerado
