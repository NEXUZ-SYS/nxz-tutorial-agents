# Doctype Catalog — ERPNext v16 essenciais

Catálogo de Doctypes mais usados em configuração, com dependências e
campos mandatory. Todos os Doctypes têm endpoints padrão:

- `GET /api/resource/<Doctype>` — list
- `GET /api/resource/<Doctype>/<name>` — read single
- `POST /api/resource/<Doctype>` — create
- `PUT /api/resource/<Doctype>/<name>` — update
- `DELETE /api/resource/<Doctype>/<name>` — delete (quando permitido)

Nomes de Doctype são **case-sensitive** e usam espaços (Pascal Case).
Url-encode espaços como `%20`.

## Camada 2 — Company / Financeiro Base

### Company
- **Mandatory**: `company_name`, `abbr`, `default_currency`, `country`
- **Dependências**: Currency `BRL` (seed), Country `Brazil` (seed)
- **Notas**: `abbr` usada em autonaming (`NEXUZ-00001`). 3-6 chars.
- `chart_of_accounts` opcional — pode ser aplicado depois via PUT

### Fiscal Year
- **Mandatory**: `year`, `year_start_date`, `year_end_date`
- **Notas**: formato `year` é string (ex: "2026"). Datas ISO.

### Currency (seed — não criar normalmente)
- Já existe BRL, USD, EUR, etc. no ERPNext fresh.

### Country (seed — não criar normalmente)

## Camada 3 — COA / Cost Center

### Account
- **Mandatory**: `account_name`, `company`, `parent_account`, `is_group`
- **Dependências**: Company existe, parent_account existe
- **Notas**: tree via `parent_account`. `is_group=1` para nós, `0` para folhas.
- `account_type` opcional mas recomendado: "Income Account", "Expense Account", "Asset", "Liability", "Tax", "Bank", "Cash"

### Cost Center
- **Mandatory**: `cost_center_name`, `company`, `parent_cost_center`, `is_group`
- **Dependências**: Company existe (auto-cria root cost center com nome Company)

## Camada 4 — Master Data

### UOM
- **Mandatory**: `uom_name`
- **Default seeds**: Unidade, Kg, g, L, mL, Metro, cm, Hora, Dia, Caixa
- **Notas**: `must_be_whole_number=1` para unidades indivisíveis

### UOM Conversion Detail (child table em Item)
- **Parent**: Item
- **Mandatory**: `uom`, `conversion_factor`
- **Notas**: representa "1 Caixa = 12 Unidades" no próprio Item

### Item Group
- **Mandatory**: `item_group_name`, `parent_item_group`, `is_group`
- **Dependências**: parent_item_group existe (root = "All Item Groups")

### Item
- **Mandatory**: `item_code`, `item_name`, `item_group`, `stock_uom`
- **Dependências**: Item Group, UOM
- **Notas**:
  - `is_stock_item=0` para serviços / digitais (não controla estoque)
  - `is_sales_item=1` / `is_purchase_item=1` definem se aparece em SO/PO
  - `has_variants=1` para templates (UOM comum, variants definem SKU)
  - `has_batch_no=1` + `has_expiry_date=1` para FS com validade

### Warehouse
- **Mandatory**: `warehouse_name`, `company`, `parent_warehouse`, `is_group`
- **Notas**: tree. Root auto-criado: "All Warehouses - <ABBR>"

### Customer Group
- **Mandatory**: `customer_group_name`, `parent_customer_group`, `is_group`

### Customer
- **Mandatory**: `customer_name`, `customer_group`, `territory`
- **Dependências**: Customer Group, Territory (seed "Brazil" ou "All Territories")
- **Notas**: `customer_type` = "Individual" | "Company"

### Supplier Group
- **Mandatory**: `supplier_group_name`, `parent_supplier_group`, `is_group`

### Supplier
- **Mandatory**: `supplier_name`, `supplier_group`
- **Notas**: `supplier_type` = "Individual" | "Company"

### Territory
- **Mandatory**: `territory_name`, `parent_territory`, `is_group`
- **Seed**: "All Territories" (root), "Brazil"

## Camada 5 — Users / Roles / Permissions

### User
- **Mandatory**: `email`, `first_name`
- **Notas**: `user_type` = "System User" | "Website User"
- Child table `roles` para atribuir roles inline no POST
- `send_welcome_email=0` para não spamear em dev

### Role
- **Mandatory**: `role_name`
- **Notas**: roles custom aparecem em Role Profile e User.roles

### Role Profile
- **Mandatory**: `role_profile`
- Child table `roles`

### User Permission
- **Mandatory**: `user`, `allow`, `for_value`
- **Notas**: restringe registros visíveis para um usuário (ex: só Company X)

### DocType Permission (sub-table em DocType — usar Custom Docperm)

### Custom DocPerm (para override de permissions sem alterar DocType standard)
- **Mandatory**: `parent` (doctype alvo), `role`, `permlevel`

## Camada 6 — Customizations

### Custom Field
- **Mandatory**: `dt` (target doctype), `fieldname`, `fieldtype`, `label`
- **Notas**:
  - `fieldname` deve ser snake_case, sem colidir com fieldnames existentes
  - `insert_after` opcional (ex: `"tax_id"`) — controla ordem na UI
  - `reqd=1` para mandatory, `unique=1` para unicidade
  - `fieldtype` comum: Data, Link, Select, Check, Int, Float, Currency, Date, Datetime, Text, Long Text, Table, Attach

### Property Setter
- **Mandatory**: `doc_type`, `field_name` (ou `doctype_or_field=DocType`), `property`, `property_type`, `value`
- **Notas**: ajusta propriedades de campos standard SEM alterar Doctype core

### DocType (Custom Doctype)
- **Mandatory**: `name`, `module`, `fields`, `permissions`, `custom=1`
- **Notas**:
  - `custom=1` flag obrigatória para Doctypes criados via UI/API
  - Após POST, rodar `bench migrate` para gerar tabela
  - `autoname` comum: "field:<fieldname>" | "naming_series:" | "autoincrement"

## Camada 7 — Workflows

### Workflow State
- **Mandatory**: `workflow_state_name`
- **Notas**: `style` = "Primary" | "Success" | "Warning" | "Danger" | "Info"

### Workflow Action Master
- **Mandatory**: `workflow_action_name`

### Workflow
- **Mandatory**: `workflow_name`, `document_type`, `is_active`, `workflow_state_field`
- **Child tables**:
  - `states`: { state, doc_status (0|1|2), allow_edit (role) }
  - `transitions`: { state, action, next_state, allowed (role), condition }
- **Notas**: `workflow_state_field` default = `workflow_state` (adicionar como Custom Field se não existir no doctype)

## Camada 8 — Server Scripts / Integrations

### Server Script
- **Mandatory**: `name`, `script_type`, `script`
- **Tipos**:
  - `DocType Event`: precisa `reference_doctype` + `doctype_event` (Before Insert, After Insert, Before Save, Before Submit, After Submit, On Cancel, On Trash)
  - `API`: precisa `api_method` (endpoint custom em `/api/method/<api_method>`)
  - `Permission Query`: roda em SELECT para filtrar registros
  - `Scheduler Event`: precisa `event_frequency` (All, Hourly, Daily, Weekly, Monthly, Cron) + `cron_format` se Cron
- **Prerequisite**: System Settings.server_script_enabled=1

### Webhook
- **Mandatory**: `webhook_doctype`, `webhook_docevent`, `request_url`
- **Notas**:
  - `webhook_docevent`: after_insert, on_update, on_submit, on_cancel, on_update_after_submit, on_trash
  - `request_method` default POST
  - `webhook_headers` child table com { key, value }
  - `webhook_data` child table para payload mapping (se omitido, envia doc inteiro)
  - `condition`: Python expression (ex: `doc.total > 1000`)

### Email Account (para envio de email via workflow / webhook email)
- **Mandatory**: `email_id`, `email_server` ou `service`, `smtp_server`

### Email Template
- **Mandatory**: `name`, `subject`, `response`
- **Notas**: usa Jinja em `response` (ex: `{{ doc.customer_name }}`)

## Doctypes submittable (precisam `frappe.client.submit` após POST)

- Sales Invoice, Purchase Invoice
- Sales Order, Purchase Order
- Delivery Note, Purchase Receipt
- Journal Entry, Payment Entry
- Stock Entry, Stock Reconciliation
- Material Request
- Timesheet
- Expense Claim
- Quotation (opcional — submit finaliza)

POSTs criam `docstatus=0` (draft). Submit → `docstatus=1`. Cancel → `docstatus=2`.

## Doctypes settings singleton (não cria nem deleta — só PATCH)

- System Settings — `/api/resource/System Settings/System Settings`
- Global Defaults — `/api/resource/Global Defaults/Global Defaults`
- Accounts Settings — `/api/resource/Accounts Settings/Accounts Settings`
- Stock Settings, Selling Settings, Buying Settings, HR Settings

Para ligar `server_script_enabled`:
```bash
curl -X PUT -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"server_script_enabled": 1}' \
  "$BASE/api/resource/System%20Settings/System%20Settings"
```
