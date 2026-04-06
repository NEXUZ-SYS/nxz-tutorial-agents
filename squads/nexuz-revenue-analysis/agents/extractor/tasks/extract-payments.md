---
task: Extrair Cobranças do Asaas
order: 3
input: squads/nexuz-revenue-analysis/output/raw-customers.json
output: squads/nexuz-revenue-analysis/output/raw-payments.json
---

# Extrair Cobranças do Asaas

Extrair todas as cobranças (payments) do Asaas com paginação completa. Cobranças são os fatos financeiros individuais — cada vencimento gerado por uma assinatura ou avulso. São a base para análise de inadimplência, MRR e fluxo de caixa.

> Cobranças em Asaas = cobranças/faturas financeiras. NÃO são documentos fiscais (NF-e). Nunca referenciar como "invoices" ou "notas fiscais".

---

## Processo

### 1. Inicializar paginação
- Definir `offset=0` e `limit=100`
- Preparar array vazio `all_payments = []`
- Registrar `extracted_at` com timestamp ISO 8601 (America/Sao_Paulo)

### 2. Paginar até hasMore=false
- Chamar `mcp__claude_ai_Docs_Asaas__execute-request` com:
  - method: `GET`
  - endpoint: `/v3/payments`
  - params: `{ offset: N, limit: 100 }`
- Adicionar `response.data` ao array `all_payments`
- Se `response.hasMore == true`: incrementar `offset += 100` e repetir
- Se `response.hasMore == false`: encerrar loop

### 3. Validar e salvar
- Comparar `length(all_payments)` com `totalCount` da última resposta
- Verificar que cada cobrança possui campo `customer` preenchido
- Calcular `status_breakdown` agrupando por campo `status`
- Se divergência de contagem, registrar alerta no metadado
- Montar objeto final com metadados e salvar em `raw-payments.json`

---

## Output Format

```yaml
metadata:
  endpoint: /v3/payments
  params:
    limit: 100
  extracted_at: string (ISO 8601)
  total_records: integer
  pages_fetched: integer
  status: COMPLETO | PARCIAL | ERRO
  status_breakdown:
    CONFIRMED: integer
    RECEIVED: integer
    PENDING: integer
    OVERDUE: integer
    REFUNDED: integer
    CANCELED: integer
  warning: string | null
data:
  - id: string
    customer: string (customer id)
    subscription: string (subscription id) | null
    value: number
    netValue: number | null
    billingType: string (BOLETO | CREDIT_CARD | PIX | etc)
    status: string
    dueDate: string (YYYY-MM-DD)
    paymentDate: string (YYYY-MM-DD) | null
    description: string | null
    externalReference: string | null
    invoiceUrl: string | null
    bankSlipUrl: string | null
    dateCreated: string (YYYY-MM-DD)
```

---

## Output Example

```json
{
  "metadata": {
    "endpoint": "/v3/payments",
    "params": { "limit": 100 },
    "extracted_at": "2026-04-06T14:40:00-03:00",
    "total_records": 312,
    "pages_fetched": 4,
    "status": "COMPLETO",
    "status_breakdown": {
      "CONFIRMED": 187,
      "RECEIVED": 94,
      "PENDING": 23,
      "OVERDUE": 8,
      "REFUNDED": 0,
      "CANCELED": 0
    },
    "warning": null
  },
  "data": [
    {
      "id": "pay_000009876543",
      "customer": "cus_000001234567",
      "subscription": "sub_000005678901",
      "value": 299.90,
      "netValue": 293.30,
      "billingType": "BOLETO",
      "status": "CONFIRMED",
      "dueDate": "2026-04-10",
      "paymentDate": "2026-04-08",
      "description": "NXZ Go - Plano Essencial - Abril/2026",
      "externalReference": null,
      "invoiceUrl": "https://www.asaas.com/i/abc123",
      "bankSlipUrl": "https://www.asaas.com/b/pdf/abc123",
      "dateCreated": "2026-03-25"
    },
    {
      "id": "pay_000009876544",
      "customer": "cus_000001234568",
      "subscription": "sub_000005678902",
      "value": 499.90,
      "netValue": null,
      "billingType": "PIX",
      "status": "OVERDUE",
      "dueDate": "2026-03-05",
      "paymentDate": null,
      "description": "NXZ ERP - Plano Pro - Março/2026",
      "externalReference": null,
      "invoiceUrl": "https://www.asaas.com/i/def456",
      "bankSlipUrl": null,
      "dateCreated": "2026-02-20"
    }
  ]
}
```

---

## Quality Criteria

- `total_records` no metadado deve igualar `length(data)` — divergência é condição de alerta obrigatório
- Todos os objetos em `data` devem ter campos `id`, `customer`, `value`, `status` e `dueDate` preenchidos
- `status_breakdown` deve somar exatamente `total_records`
- `paymentDate` deve ser `null` para cobranças com status `PENDING` ou `OVERDUE` — nunca uma data futura
- Valores monetários (`value`, `netValue`) devem ser numéricos; `netValue` pode ser `null` para não pagas

---

## Veto Conditions

- **API retorna 401 ou 403:** Encerrar imediatamente — token inválido ou sem permissão. Salvar arquivo com `status: ERRO` e corpo da resposta como evidência. Não prosseguir.
- **Paginação em loop:** Se duas chamadas consecutivas retornarem os mesmos `id`s, abortar — sinal de bug no controle de offset. Salvar parcial com `status: PARCIAL` e alertar com número da página em que ocorreu.
- **Cobrança sem customer:** Se qualquer objeto retornado não tiver campo `customer`, registrar alerta crítico no metadado e listar os `id`s afetados — dados sem cliente não podem ser analisados.
