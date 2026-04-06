---
name: "Google Sheets"
description: "Integração com Google Sheets via MCP para leitura de planilhas financeiras (Banco Inter, contas a pagar)"
type: mcp
version: "1.0.0"
mcp:
  server_name: gsheets
  command: "/home/walterfrey/.local/bin/mcp-gsheets.sh"
  args: []
  transport: stdio
env: []
categories:
  - finance
  - spreadsheet
  - data
---

# Google Sheets MCP — Instruções para Agentes

## Visão Geral

O MCP Google Sheets permite acessar planilhas do Google Sheets da Nexuz, incluindo dados integrados do Banco Inter (pagamentos, extratos) e planilhas internas (contas a pagar, controles financeiros).

## Contexto de Uso na Nexuz

### Planilhas Financeiras
- **Extrato Banco Inter**: Pagamentos recebidos, transferências, saldo
- **Contas a Pagar**: Compromissos futuros, fornecedores, folha de pagamento, impostos
- **Reconciliação**: Cruzamento de dados Asaas vs Inter

## Fluxo de Trabalho

1. **Listar planilhas disponíveis**: Identificar as planilhas relevantes para o período
2. **Ler dados**: Extrair dados das abas necessárias
3. **Validar**: Verificar completude e consistência dos dados extraídos

## Boas Práticas

- **Sempre especificar o range**: Não ler planilhas inteiras — definir range (ex: `A1:H100`)
- **Verificar formato de datas**: Planilhas podem ter datas em DD/MM/AAAA — normalizar para ISO 8601
- **Valores monetários**: Podem estar formatados como texto (R$ 1.234,56) — converter para float
- **Campos vazios**: Tratar células vazias como `null`, não como zero
- **Abas múltiplas**: Cada planilha pode ter múltiplas abas — verificar qual contém os dados do período

## Tratamento de Erros

- **MCP não conectado**: Se o MCP Google Sheets não estiver respondendo, informar ao usuário e sugerir verificar a configuração
- **Planilha não encontrada**: Verificar se o ID da planilha está correto
- **Permissão negada**: O token pode precisar ser renovado — instruir o usuário a re-autenticar

## Nota sobre Disponibilidade

O MCP Google Sheets requer autenticação OAuth. Se o servidor não estiver conectado na sessão atual, os agentes devem:
1. Informar que os dados do Sheets não estão disponíveis nesta execução
2. Prosseguir com as demais fontes (Asaas, Odoo)
3. Documentar a lacuna no relatório de qualidade
