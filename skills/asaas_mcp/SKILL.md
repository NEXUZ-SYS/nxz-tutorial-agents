---
name: "Asaas MCP"
description: "Integração com API Asaas via MCP para extração de dados financeiros (clientes, cobranças, assinaturas, pagamentos)"
type: mcp
version: "1.0.0"
mcp:
  server_name: asaas
  transport: http
  url: "https://docs.asaas.com/mcp"
env: []
categories:
  - finance
  - payments
  - data
---

# Asaas MCP — Instruções para Agentes

## Visão Geral

O Asaas é o gateway de pagamentos da Nexuz. Este MCP fornece acesso à documentação da API Asaas e permite executar chamadas à API diretamente.

## Ferramentas Disponíveis

### Consulta de Documentação
- **list-specs**: Lista todas as especificações da API disponíveis
- **list-endpoints**: Lista endpoints de uma spec (filtrar por tag/path)
- **search-endpoints**: Busca endpoints por palavra-chave
- **get-endpoint**: Obtém detalhes completos de um endpoint (parâmetros, schemas, exemplos)
- **search**: Busca na documentação por texto livre

### Execução de Requests
- **fetch**: Faz fetch de uma URL (para documentação ou recursos)
- **execute-request**: Executa uma chamada à API Asaas com parâmetros

## Fluxo de Trabalho Recomendado

1. **Descobrir endpoints**: Use `search-endpoints` ou `list-endpoints` para encontrar os endpoints necessários
2. **Entender parâmetros**: Use `get-endpoint` para ver detalhes do endpoint (parâmetros obrigatórios, schemas)
3. **Executar chamadas**: Use `execute-request` para fazer as chamadas à API

## Endpoints Principais para Análise Financeira

### Clientes
- `GET /v3/customers` — Listar clientes (paginado)
- `GET /v3/customers/{id}` — Detalhes de um cliente

### Cobranças
- `GET /v3/payments` — Listar cobranças (filtrar por status, data, cliente)
- `GET /v3/payments/{id}` — Detalhes de uma cobrança
- Status possíveis: PENDING, RECEIVED, CONFIRMED, OVERDUE, REFUNDED, RECEIVED_IN_CASH, REFUND_REQUESTED, REFUND_IN_PROGRESS, CHARGEBACK_REQUESTED, CHARGEBACK_DISPUTE, AWAITING_CHARGEBACK_REVERSAL, DUNNING_REQUESTED, DUNNING_RECEIVED, AWAITING_RISK_ANALYSIS

### Assinaturas
- `GET /v3/subscriptions` — Listar assinaturas
- `GET /v3/subscriptions/{id}` — Detalhes de uma assinatura
- `GET /v3/subscriptions/{id}/payments` — Cobranças de uma assinatura

### Estatísticas
- `GET /v3/finance/getCurrentBalance` — Saldo atual
- `GET /v3/payments/statistics` — Estatísticas de cobranças

## Boas Práticas

- **Sempre usar paginação**: Limite padrão é 10, máximo 100. Use `offset` e `limit`.
- **Filtrar por período**: Use `dateCreated[ge]` e `dateCreated[le]` para filtrar por data.
- **Filtrar por status**: Use `status` para filtrar cobranças (ex: `CONFIRMED`, `OVERDUE`).
- **Respeitar rate limits**: Não fazer mais de 5 chamadas simultâneas.
- **Dados monetários**: Valores retornados em BRL como float (ex: 299.90). Formatar para 2 casas decimais.

## Autenticação

A autenticação é gerenciada pelo MCP. O header `access_token` é configurado automaticamente. Não é necessário passar credenciais manualmente nas chamadas.

## Tratamento de Erros

- **401**: Token inválido ou expirado — reportar ao usuário
- **404**: Recurso não encontrado — verificar ID
- **429**: Rate limit — aguardar e tentar novamente
- **500**: Erro interno Asaas — reportar e usar dados parciais disponíveis
