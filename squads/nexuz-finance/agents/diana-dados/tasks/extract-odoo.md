---
task: Extrair Dados do Odoo MCP
order: 3
source: odoo-mcp
agent: diana-dados
status: placeholder
---

# Extrair Dados do Odoo MCP

> **PLACEHOLDER** — O Odoo MCP para a Nexuz ainda será configurado. Esta task define a estrutura esperada para quando a integração estiver ativa. Enquanto isso, os dados de contato e cadastro devem ser obtidos das outras fontes disponíveis (Asaas, Sheets).

Extrair dados cadastrais e de contato dos clientes a partir do Odoo ERP via MCP Server.

---

## Processo

### 1. Verificar Disponibilidade do MCP
- Testar conexão com o Odoo MCP Server
- Se indisponível: registrar status PLACEHOLDER e prosseguir sem esta fonte
- Se disponível: verificar acesso ao modelo `res.partner`

### 2. Extrair Contatos (res.partner)
- Modelo: `res.partner`
- Campos: `id`, `name`, `vat` (CNPJ), `email`, `phone`, `street`, `city`, `state_id`, `active`
- Filtro: `[('customer', '=', True), ('active', '=', True)]`
- Paginar resultados se necessário

### 3. Extrair Dados Complementares
- Modelo: `account.invoice` (quando disponível)
- Campos: `number`, `partner_id`, `amount_total`, `state`, `date_invoice`, `date_due`
- Modelo: `sale.order` (quando disponível)
- Campos: `name`, `partner_id`, `amount_total`, `state`, `date_order`

### 4. Validar Extração
- Conferir total de contatos ativos vs. esperado (~159)
- Verificar campos obrigatórios: `name`, `vat` (CNPJ)
- Garantir que `vat` está em formato válido de CNPJ

---

## Formato de Output

```
dataset_odoo:
  metadata:
    fonte: odoo-mcp
    status: placeholder | ativo
    periodo: {data_inicio} a {data_fim}
    extraido_em: {timestamp}
    total_contatos: N
  contatos: [...]
  faturas: [...]
  pedidos: [...]
```

---

## Exemplo de Output (quando ativo)

```
dataset_odoo:
  metadata:
    fonte: odoo-mcp
    status: ativo
    extraido_em: 2026-04-01T11:00:00-03:00
    total_contatos: 159
  contatos:
    - id: 42
      name: "Restaurante Alpha LTDA"
      vat: "12.345.678/0001-90"
      email: "financeiro@alpha.com.br"
      city: "São Paulo"
      state: "SP"
```

---

## Criterios de Qualidade

- CNPJ em formato válido (XX.XXX.XXX/XXXX-XX)
- Todos os contatos com campo `name` preenchido
- Emails em formato válido quando presentes
- Zero contatos duplicados por CNPJ

---

## Condições de Veto

- **MCP não configurado:** Registrar como PLACEHOLDER, não tratar como erro. Prosseguir com as demais fontes.
- **Modelo inacessível:** Se `res.partner` retornar permissão negada, abortar e sinalizar
- **Dados muito divergentes:** Se total de contatos divergir mais de 20% do esperado, pausar e alertar
