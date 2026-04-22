# REST API Recipes — ERPNext (Frappe v16)

Biblioteca de chamadas REST validadas para uso pela squad. Todos os exemplos
assumem que as variáveis de ambiente estão carregadas:

```bash
source $FRAPPE_DOCKER_PATH/nxz/.secrets/<user>.env  # FRAPPE_API_KEY + FRAPPE_API_SECRET
PORT=$(grep '^HTTP_PUBLISH_PORT=' $FRAPPE_DOCKER_PATH/nxz/.env | cut -d= -f2)
BASE="http://localhost:$PORT"
HOST_HDR="Host: erpnext.localhost"
AUTH="Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET"
```

## 0. Smoke tests

```bash
# Unauth
curl -s -H "$HOST_HDR" "$BASE/api/method/ping"
# → {"message":"pong"}

# Auth
curl -s -H "$HOST_HDR" -H "$AUTH" "$BASE/api/method/frappe.auth.get_logged_user"
# → {"message":"Administrator"}
```

## 1. Company + Fiscal Year

### Create Company
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "company_name": "Nexuz Sistemas Inteligentes Ltda",
    "abbr": "NEXUZ",
    "default_currency": "BRL",
    "country": "Brazil",
    "chart_of_accounts": "Brazil - Default COA"
  }' \
  "$BASE/api/resource/Company"
```

### Create Fiscal Year
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "year": "2026",
    "year_start_date": "2026-01-01",
    "year_end_date": "2026-12-31"
  }' \
  "$BASE/api/resource/Fiscal%20Year"
```

## 2. Chart of Accounts / Cost Center

### Read COA tree
```bash
curl -s -H "$HOST_HDR" -H "$AUTH" \
  "$BASE/api/resource/Account?filters=%5B%5B%22company%22%2C%22%3D%22%2C%22Nexuz%20Sistemas%20Inteligentes%20Ltda%22%5D%5D&fields=%5B%22name%22%2C%22account_type%22%2C%22parent_account%22%2C%22is_group%22%5D&limit_page_length=0"
```

### Create Account (leaf)
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "account_name": "Receita de Software",
    "parent_account": "Income - NEXUZ",
    "company": "Nexuz Sistemas Inteligentes Ltda",
    "account_type": "Income Account",
    "is_group": 0
  }' \
  "$BASE/api/resource/Account"
```

### Create Cost Center
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "cost_center_name": "Matriz Curitiba",
    "company": "Nexuz Sistemas Inteligentes Ltda",
    "parent_cost_center": "Nexuz Sistemas Inteligentes Ltda - NEXUZ",
    "is_group": 0
  }' \
  "$BASE/api/resource/Cost%20Center"
```

## 3. UOM / Item Group / Warehouse / Item

### Create UOM
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"uom_name":"Porção","must_be_whole_number":0}' \
  "$BASE/api/resource/UOM"
```

### Create Item Group (tree)
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "item_group_name": "Software",
    "parent_item_group": "All Item Groups",
    "is_group": 0
  }' \
  "$BASE/api/resource/Item%20Group"
```

### Create Warehouse
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "warehouse_name": "Digital",
    "company": "Nexuz Sistemas Inteligentes Ltda",
    "parent_warehouse": "All Warehouses - NEXUZ",
    "is_group": 0
  }' \
  "$BASE/api/resource/Warehouse"
```

### Create Item
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "item_code": "NXZ-ERP-MENSAL",
    "item_name": "NXZ ERP — Plano Mensal",
    "item_group": "Software",
    "stock_uom": "Unidade",
    "is_stock_item": 0,
    "is_sales_item": 1,
    "is_purchase_item": 0,
    "standard_rate": 299.00
  }' \
  "$BASE/api/resource/Item"
```

## 4. Customer / Supplier

### Create Customer Group
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "customer_group_name": "FS Small",
    "parent_customer_group": "All Customer Groups",
    "is_group": 0
  }' \
  "$BASE/api/resource/Customer%20Group"
```

### Create Customer
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Padaria Exemplo Ltda",
    "customer_group": "FS Small",
    "customer_type": "Company",
    "territory": "Brazil"
  }' \
  "$BASE/api/resource/Customer"
```

### Create Supplier
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "supplier_name": "Oracle Brasil",
    "supplier_group": "Infra",
    "supplier_type": "Company"
  }' \
  "$BASE/api/resource/Supplier"
```

## 5. User / Role

### Create User
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "email": "ai@nxz.ai",
    "first_name": "AI",
    "last_name": "Team",
    "user_type": "System User",
    "send_welcome_email": 0,
    "roles": [{"role": "System Manager"}]
  }' \
  "$BASE/api/resource/User"
```

### Create Role
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"role_name": "AI Team"}' \
  "$BASE/api/resource/Role"
```

## 6. Custom Field / Property Setter

### Create Custom Field
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "doctype": "Custom Field",
    "dt": "Customer",
    "fieldname": "cnpj",
    "fieldtype": "Data",
    "label": "CNPJ",
    "reqd": 1,
    "unique": 1,
    "insert_after": "tax_id"
  }' \
  "$BASE/api/resource/Custom%20Field"
```

### List Custom Fields by target doctype
```bash
curl -s -H "$HOST_HDR" -H "$AUTH" \
  "$BASE/api/resource/Custom%20Field?filters=%5B%5B%22dt%22%2C%22%3D%22%2C%22Customer%22%5D%5D&fields=%5B%22name%22%2C%22fieldname%22%2C%22fieldtype%22%2C%22label%22%5D"
```

### Create Property Setter (tornar Customer.tax_id mandatory)
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "doctype": "Property Setter",
    "doc_type": "Customer",
    "field_name": "tax_id",
    "property": "reqd",
    "property_type": "Check",
    "value": "1"
  }' \
  "$BASE/api/resource/Property%20Setter"
```

## 7. Workflow

### Create Workflow State
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "doctype": "Workflow State",
    "workflow_state_name": "Aguardando Aprovação de Desconto",
    "style": "Warning"
  }' \
  "$BASE/api/resource/Workflow%20State"
```

### Create Workflow Action Master
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"doctype": "Workflow Action Master", "workflow_action_name": "Aprovar"}' \
  "$BASE/api/resource/Workflow%20Action%20Master"
```

### Create Workflow (states + transitions inline)
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d @specs/09-workflow-desconto.json \
  "$BASE/api/resource/Workflow"
```

Payload example (09-workflow-desconto.json):
```json
{
  "doctype": "Workflow",
  "workflow_name": "Aprovação Desconto >15% - Sales Order",
  "document_type": "Sales Order",
  "is_active": 1,
  "workflow_state_field": "workflow_state",
  "states": [
    { "state": "Draft", "doc_status": "0", "allow_edit": "Sales User" },
    { "state": "Aguardando Aprovação de Desconto", "doc_status": "0", "allow_edit": "Sales Manager" },
    { "state": "Aprovado", "doc_status": "1", "allow_edit": "Sales Manager" }
  ],
  "transitions": [
    {
      "state": "Draft",
      "action": "Submit para Aprovação",
      "next_state": "Aguardando Aprovação de Desconto",
      "allowed": "Sales User"
    },
    {
      "state": "Aguardando Aprovação de Desconto",
      "action": "Aprovar",
      "next_state": "Aprovado",
      "allowed": "Sales Manager"
    }
  ]
}
```

## 8. Server Script

### Create Server Script (DocType Event)
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "doctype": "Server Script",
    "name": "Validate Customer CNPJ",
    "script_type": "DocType Event",
    "reference_doctype": "Customer",
    "doctype_event": "Before Save",
    "disabled": 0,
    "script": "cnpj = (doc.cnpj or \"\").replace(\".\", \"\").replace(\"/\", \"\").replace(\"-\", \"\")\nif cnpj and len(cnpj) != 14:\n    frappe.throw(\"CNPJ deve ter 14 dígitos\")"
  }' \
  "$BASE/api/resource/Server%20Script"
```

**Prerequisite**: System Settings → `server_script_enabled = 1`. Check via:
```bash
curl -s -H "$HOST_HDR" -H "$AUTH" \
  "$BASE/api/resource/System%20Settings/System%20Settings?fields=%5B%22server_script_enabled%22%5D"
```

## 9. Webhook

### Create Webhook
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "doctype": "Webhook",
    "webhook_doctype": "Sales Invoice",
    "webhook_docevent": "on_submit",
    "request_url": "https://hooks.nexuz.com.br/erpnext/invoice-submit",
    "request_method": "POST",
    "enabled": 1,
    "webhook_headers": [{"key":"X-Secret","value":"{{ webhook_secret }}"}]
  }' \
  "$BASE/api/resource/Webhook"
```

## 10. `/api/method/` utilities

### `frappe.client.get_list` — com filters JSON-body
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "doctype": "Item",
    "filters": [["item_group","=","Software"]],
    "fields": ["name","item_code","standard_rate"],
    "limit_page_length": 50,
    "order_by": "creation desc"
  }' \
  "$BASE/api/method/frappe.client.get_list"
```

### `frappe.client.insert`
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"doc":{"doctype":"UOM","uom_name":"Kit"}}' \
  "$BASE/api/method/frappe.client.insert"
```

### `frappe.client.set_value`
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"doctype":"Customer","name":"Padaria Exemplo Ltda","fieldname":"customer_group","value":"FS Enterprise"}' \
  "$BASE/api/method/frappe.client.set_value"
```

### `frappe.client.submit`
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"doc":{"doctype":"Sales Invoice","name":"SINV-2026-00001"}}' \
  "$BASE/api/method/frappe.client.submit"
```

### `erpnext.setup.setup_wizard.run_setup_wizard.setup_complete`
(Programmatic setup wizard — pular UI setup em sites novos)
```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{
    "args": {
      "language": "Portuguese",
      "country": "Brazil",
      "timezone": "America/Sao_Paulo",
      "currency": "BRL",
      "company_name": "Nexuz Sistemas Inteligentes Ltda",
      "company_abbr": "NEXUZ",
      "chart_of_accounts": "Brazil - Default COA",
      "fy_start_date": "2026-01-01",
      "fy_end_date": "2026-12-31",
      "full_name": "AI Team",
      "email": "ai@nxz.ai",
      "password": "<strong-password>"
    }
  }' \
  "$BASE/api/method/erpnext.setup.setup_wizard.run_setup_wizard.setup_complete"
```

## Paginação e filters (url-encoded)

Query params comuns:
- `limit_page_length=N` (default 20, `0` = all, cuidado com performance)
- `limit_start=N` (offset)
- `fields=["name","email"]` — JSON array url-encoded (`%5B%22...%22%5D`)
- `filters=[["field","op","value"]]` — JSON nested url-encoded
- `order_by=creation desc`

Operators em filters: `=`, `!=`, `like`, `not like`, `in`, `not in`, `>`, `<`, `>=`, `<=`, `between`, `is`.

## Status codes

- 200 — sucesso
- 401 — token inválido / rotacionado
- 403 — role insuficiente no doctype alvo
- 404 — endpoint ou doctype não existe
- 417 — validação Frappe (campo obrigatório, link inválido)
- 500 — erro de server (`docker logs nxz-backend-1`)
