---
task: Extrair Assinaturas do Asaas
order: 2
input: squads/nexuz-revenue-analysis/output/raw-customers.json
output: squads/nexuz-revenue-analysis/output/raw-subscriptions.json
---

# Extrair Assinaturas do Asaas

Extrair todas as assinaturas cadastradas no Asaas, incluindo inativas e deletadas para preservar o histórico completo. Assinaturas representam a recorrência de receita da Nexuz — são o vínculo entre clientes e planos contratados.

---

## Processo

### 1. Inicializar paginação
- Definir `offset=0` e `limit=100`
- Preparar array vazio `all_subscriptions = []`
- Registrar `extracted_at` com timestamp ISO 8601 (America/Sao_Paulo)
- Definir parâmetro fixo `includeDeleted=true` para capturar histórico completo

### 2. Paginar até hasMore=false
- Chamar `mcp__claude_ai_Docs_Asaas__execute-request` com:
  - method: `GET`
  - endpoint: `/v3/subscriptions`
  - params: `{ offset: N, limit: 100, includeDeleted: true }`
- Adicionar `response.data` ao array `all_subscriptions`
- Se `response.hasMore == true`: incrementar `offset += 100` e repetir
- Se `response.hasMore == false`: encerrar loop

### 3. Validar e salvar
- Comparar `length(all_subscriptions)` com `totalCount` da última resposta
- Verificar que cada assinatura possui campo `customer` preenchido
- Se divergência de contagem, registrar alerta no metadado (`warning: totalCount mismatch`)
- Montar objeto final com metadados e salvar em `raw-subscriptions.json`

---

## Output Format

```yaml
metadata:
  endpoint: /v3/subscriptions
  params:
    limit: 100
    includeDeleted: true
  extracted_at: string (ISO 8601)
  total_records: integer
  pages_fetched: integer
  status: COMPLETO | PARCIAL | ERRO
  status_breakdown:
    ACTIVE: integer
    INACTIVE: integer
    EXPIRED: integer
  warning: string | null
data:
  - id: string
    customer: string (customer id)
    value: number
    nextDueDate: string (YYYY-MM-DD) | null
    cycle: string (MONTHLY | WEEKLY | YEARLY | etc)
    billingType: string (BOLETO | CREDIT_CARD | PIX | etc)
    status: string (ACTIVE | INACTIVE | EXPIRED)
    description: string | null
    externalReference: string | null
    deleted: boolean
    dateCreated: string (YYYY-MM-DD)
```

---

## Output Example

```json
{
  "metadata": {
    "endpoint": "/v3/subscriptions",
    "params": { "limit": 100, "includeDeleted": true },
    "extracted_at": "2026-04-06T14:35:00-03:00",
    "total_records": 162,
    "pages_fetched": 2,
    "status": "COMPLETO",
    "status_breakdown": {
      "ACTIVE": 143,
      "INACTIVE": 12,
      "EXPIRED": 7
    },
    "warning": null
  },
  "data": [
    {
      "id": "sub_000005678901",
      "customer": "cus_000001234567",
      "value": 299.90,
      "nextDueDate": "2026-05-10",
      "cycle": "MONTHLY",
      "billingType": "BOLETO",
      "status": "ACTIVE",
      "description": "NXZ Go - Plano Essencial",
      "externalReference": "SUB-NXZ-001",
      "deleted": false,
      "dateCreated": "2024-08-01"
    },
    {
      "id": "sub_000005678902",
      "customer": "cus_000001234568",
      "value": 499.90,
      "nextDueDate": null,
      "cycle": "MONTHLY",
      "billingType": "PIX",
      "status": "EXPIRED",
      "description": "NXZ ERP - Plano Pro",
      "externalReference": "SUB-NXZ-002",
      "deleted": true,
      "dateCreated": "2023-11-15"
    }
  ]
}
```

---

## Quality Criteria

- `total_records` no metadado deve igualar `length(data)` — sem tolerância para divergência silenciosa
- Todos os objetos em `data` devem ter campos `id` e `customer` preenchidos
- `status_breakdown` deve somar exatamente `total_records`
- Valores monetários (`value`) devem ser numéricos, nunca strings
- `includeDeleted=true` deve estar presente nos `params` do metadado como evidência de uso

---

## Veto Conditions

- **API retorna 401 ou 403:** Encerrar imediatamente — token inválido ou sem permissão. Salvar arquivo com `status: ERRO` e mensagem do erro, não prosseguir para a próxima task.
- **Paginação em loop:** Se duas chamadas consecutivas retornarem os mesmos `id`s, abortar — offset não está incrementando. Salvar parcial com `status: PARCIAL` e alerta explícito.
- **Nenhuma assinatura retornada (total_records=0):** Pausar e alertar — resultado vazio em conta com clientes ativos é sinal de problema de autenticação ou filtro incorreto.
