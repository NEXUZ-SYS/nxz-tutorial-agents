---
task: Extrair Clientes do Asaas
order: 1
input: none
output: squads/nexuz-revenue-analysis/output/raw-customers.json
---

# Extrair Clientes do Asaas

Extrair a lista completa de clientes cadastrados no Asaas via API paginada. Os clientes são a entidade âncora da análise de receita — todas as assinaturas e cobranças se relacionam a eles.

---

## Processo

### 1. Inicializar paginação
- Definir `offset=0` e `limit=100`
- Preparar array vazio `all_customers = []`
- Registrar `extracted_at` com timestamp ISO 8601 (America/Sao_Paulo)

### 2. Paginar até hasMore=false
- Chamar `mcp__claude_ai_Docs_Asaas__execute-request` com:
  - method: `GET`
  - endpoint: `/v3/customers`
  - params: `{ offset: N, limit: 100 }`
- Adicionar `response.data` ao array `all_customers`
- Se `response.hasMore == true`: incrementar `offset += 100` e repetir
- Se `response.hasMore == false`: encerrar loop

### 3. Validar e salvar
- Comparar `length(all_customers)` com `totalCount` da última resposta
- Se divergirem, registrar alerta no metadado (`warning: totalCount mismatch`)
- Montar objeto final com metadados e salvar em `raw-customers.json`

---

## Output Format

```yaml
metadata:
  endpoint: /v3/customers
  params:
    limit: 100
  extracted_at: string (ISO 8601)
  total_records: integer
  pages_fetched: integer
  status: COMPLETO | PARCIAL | ERRO
  warning: string | null
data:
  - id: string
    name: string
    cpfCnpj: string | null
    email: string | null
    phone: string | null
    mobilePhone: string | null
    address: string | null
    addressNumber: string | null
    complement: string | null
    province: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    externalReference: string | null
    deleted: boolean
```

---

## Output Example

```json
{
  "metadata": {
    "endpoint": "/v3/customers",
    "params": { "limit": 100 },
    "extracted_at": "2026-04-06T14:30:00-03:00",
    "total_records": 159,
    "pages_fetched": 2,
    "status": "COMPLETO",
    "warning": null
  },
  "data": [
    {
      "id": "cus_000001234567",
      "name": "Restaurante Alpha Ltda",
      "cpfCnpj": "12.345.678/0001-90",
      "email": "financeiro@restaurantealpha.com.br",
      "phone": null,
      "mobilePhone": "(11) 99988-7766",
      "address": "Rua das Flores",
      "addressNumber": "123",
      "complement": "Sala 4",
      "province": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "postalCode": "01310-100",
      "externalReference": "NXZ-001",
      "deleted": false
    },
    {
      "id": "cus_000001234568",
      "name": "Padaria Beta ME",
      "cpfCnpj": "98.765.432/0001-10",
      "email": "contato@padariabeta.com.br",
      "phone": "(11) 3344-5566",
      "mobilePhone": null,
      "address": "Av. Paulista",
      "addressNumber": "456",
      "complement": null,
      "province": "Bela Vista",
      "city": "São Paulo",
      "state": "SP",
      "postalCode": "01310-200",
      "externalReference": "NXZ-002",
      "deleted": false
    }
  ]
}
```

---

## Quality Criteria

- `total_records` no metadado deve igualar `length(data)` — zero tolerância para divergência silenciosa
- Todos os objetos em `data` devem ter campo `id` preenchido (nunca nulo)
- Todos os objetos devem ter campo `name` preenchido (nunca nulo ou string vazia)
- `extracted_at` em formato ISO 8601 com timezone `-03:00`
- `status` deve ser `COMPLETO` apenas quando `total_records == totalCount` retornado pela API

---

## Veto Conditions

- **API retorna 401 ou 403:** Encerrar imediatamente — token inválido ou sem permissão. Salvar arquivo com `status: ERRO` e mensagem do erro, não prosseguir para próximas tasks.
- **Paginação em loop:** Se duas chamadas consecutivas retornarem os mesmos `id`s, abortar — offset não está incrementando corretamente. Salvar parcial com `status: PARCIAL` e alerta.
- **Resposta sem campo data:** Se a resposta da API não contiver o array `data`, abortar a paginação e registrar o corpo da resposta no metadado como evidência.
