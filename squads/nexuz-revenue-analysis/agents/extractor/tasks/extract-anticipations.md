---
task: Extrair Antecipações do Asaas
order: 4
input:
  - Nenhum (endpoint direto da API Asaas)
output:
  - squads/nexuz-revenue-analysis/output/raw-anticipations.json
---

# Extrair Antecipações do Asaas

Extrair todas as antecipações de recebíveis da API Asaas via `GET /v3/anticipations`. Cada antecipação está vinculada a um pagamento (`payment` field) e indica que a receita foi recebida antecipadamente. Apenas antecipações com `status: CREDITED` representam dinheiro efetivamente recebido.

---

## Processo

### 1. Iniciar Paginação
- Chamar `mcp__claude_ai_Docs_Asaas__execute-request` com:
  - method: `GET`
  - url: `https://api.asaas.com/v3/anticipations`
  - headers: `[{"name": "access_token", "value": "{ASAAS_API_KEY}"}]`
  - queryString: `[{"name": "offset", "value": "0"}, {"name": "limit", "value": "100"}]`
- Registrar `totalCount` da primeira resposta

### 2. Paginar até Completar
- Enquanto `hasMore == true`:
  - Incrementar offset em 100
  - Chamar o endpoint novamente com novo offset
  - Acumular objetos do array `data` em uma lista consolidada
- Após finalizar, validar: `len(lista) == totalCount`

### 3. Salvar e Validar
- Salvar em `squads/nexuz-revenue-analysis/output/raw-anticipations.json` com metadados:
  ```json
  {
    "extracted_at": "{timestamp ISO}",
    "endpoint": "/v3/anticipations",
    "params": {"offset": 0, "limit": 100},
    "total_records": N,
    "status_breakdown": {"CREDITED": N, "PENDING": N, "DENIED": N, ...},
    "data": [...]
  }
  ```
- Registrar breakdown por status para o resumo de extração

---

## Output Format

```yaml
anticipations_extraction:
  arquivo: squads/nexuz-revenue-analysis/output/raw-anticipations.json
  total_records: N
  status_breakdown:
    CREDITED: N
    PENDING: N
    DENIED: N
    CANCELLED: N
    SCHEDULED: N
    DEBITED: N
    OVERDUE: N
  campos_por_registro:
    - id: "ID único da antecipação"
    - payment: "ID do pagamento antecipado (pay_XXX)"
    - status: "PENDING|DENIED|CREDITED|DEBITED|CANCELLED|OVERDUE|SCHEDULED"
    - anticipationDate: "Data em que a antecipação foi creditada"
    - dueDate: "Data de vencimento original do pagamento"
    - requestDate: "Data da solicitação da antecipação"
    - fee: "Taxa de antecipação cobrada"
    - netValue: "Valor líquido recebido (descontada a taxa)"
    - totalValue: "Valor total do pagamento original"
    - value: "Valor da antecipação"
```

---

## Output Example

```json
{
  "extracted_at": "2026-04-06T14:40:00-03:00",
  "endpoint": "/v3/anticipations",
  "params": {"offset": 0, "limit": 100},
  "total_records": 47,
  "status_breakdown": {
    "CREDITED": 42,
    "PENDING": 3,
    "DENIED": 1,
    "CANCELLED": 1
  },
  "data": [
    {
      "object": "receivableAnticipation",
      "id": "9e7d8639-350f-45c0-8bc3-d4ddc5f4ebac",
      "payment": "pay_626366773834",
      "status": "CREDITED",
      "anticipationDate": "2026-03-20",
      "dueDate": "2026-04-26",
      "requestDate": "2026-03-14",
      "fee": 2.33,
      "anticipationDays": 37,
      "netValue": 73.68,
      "totalValue": 80.00,
      "value": 76.01,
      "denialObservation": null
    },
    {
      "object": "receivableAnticipation",
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "payment": "pay_987654321012",
      "status": "CREDITED",
      "anticipationDate": "2026-03-22",
      "dueDate": "2026-05-15",
      "requestDate": "2026-03-18",
      "fee": 4.50,
      "anticipationDays": 54,
      "netValue": 285.50,
      "totalValue": 299.90,
      "value": 290.00,
      "denialObservation": null
    }
  ]
}
```

---

## Quality Criteria

- `totalCount` da API deve igualar o número de objetos no array `data`
- Cada objeto deve ter os campos: `id`, `payment`, `status`, `anticipationDate`, `fee`, `netValue`, `totalValue`
- O `status_breakdown` deve somar exatamente `total_records`
- O campo `payment` deve seguir o padrão `pay_XXX` — IDs fora desse padrão devem ser sinalizados

---

## Veto Conditions

- Se a API retornar erro 401/403 (token inválido ou sem permissão), abortar imediatamente — a ASAAS_API_KEY pode estar incorreta
- Se `totalCount` da API diferir do número de registros coletados, abortar e reportar a divergência
