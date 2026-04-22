---
name: erpnext-integration
description: Automate ERPNext (Frappe v16) configuration using a hybrid approach — REST API (`/api/method/` and `/api/resource/`) for most operations (Company, COA, Items, Customers, Custom Fields, Workflows, Webhooks, Server Scripts) and bench CLI via `docker exec` for lifecycle operations (build, up, reset, migrate, install-app) that REST cannot handle. Use when the user needs to configure ERPNext Doctypes, Master Data, Customizations, Workflows, or Integrations end-to-end on the `nxz-erpnext:v16` stack (fork `frappe_docker`).
type: hybrid
version: 1.0.0
categories:
  - erpnext
  - frappe
  - erp
  - food-service
env:
  - FRAPPE_API_KEY
  - FRAPPE_API_SECRET
  - HTTP_PUBLISH_PORT
  - FRAPPE_DOCKER_PATH
---

# ERPNext Integration — Hybrid (REST API + bench CLI)

## The core problem

ERPNext (Frappe v16) ships with TWO programmatic interfaces:

- **REST API** (HTTP) — covers 90%+ of operations: Doctypes CRUD, Custom Fields, Workflows, Webhooks, Server Scripts, RPC methods via `/api/method/`.
- **bench CLI** (via `docker exec nxz-backend-1 bench ...`) — required for **lifecycle** and **app management**: `migrate`, `install-app`, `new-site`, `backup`, `clear-cache`. Also needed when REST permissions are insufficient at bootstrap.

The `nxz-erpnext:v16` stack adds a **third layer** of convenience — the **`nxz/*.sh` scripts** (`build.sh`, `up.sh`, `down.sh`, `reset.sh`, `gen-api-key.sh`) that wrap docker-compose + bench patterns documented in `frappe_docker/docs/nxz/lifecycle.md`.

**Unlike Pipefy**, Frappe has no rate limit published but the dev stack (MariaDB local, no redundancy) can choke under parallel load — so the patterns here are conservative (300ms delay between POSTs).

## Decision matrix — which tool for what

| Operation | REST API | bench CLI | nxz scripts |
|---|---|---|---|
| Build image | — | — | ✅ `build.sh` |
| Start stack | — | — | ✅ `up.sh` |
| Stop stack | — | — | ✅ `down.sh` |
| Reset (destrutivo) | — | — | ✅ `reset.sh` |
| Generate API key | — | `bench execute frappe.core.doctype.user.user.generate_keys` | ✅ `gen-api-key.sh` (preferred) |
| Install app no site | — | ✅ `bench --site X install-app Y` | — |
| Migrate (após Custom Doctype) | — | ✅ `bench --site X migrate` | — |
| Clear cache | — | ✅ `bench --site X clear-cache` | — |
| Create Company | ✅ `POST /api/resource/Company` | — | — |
| Create Fiscal Year | ✅ | — | — |
| Create Account (COA) | ✅ | — | — |
| Create Cost Center | ✅ | — | — |
| Create UOM | ✅ | — | — |
| Create Item Group | ✅ | — | — |
| Create Item | ✅ | — | — |
| Create Warehouse | ✅ | — | — |
| Create Customer / Supplier | ✅ | — | — |
| Create User | ✅ | `bench add-user` (alternativa) | — |
| Create Role | ✅ | — | — |
| Create Custom Field | ✅ `POST /api/resource/Custom Field` | — | — |
| Create Property Setter | ✅ | — | — |
| Create Custom Doctype | ✅ `POST /api/resource/DocType` + `bench migrate` | migrate após POST | — |
| Create Workflow | ✅ (Workflow + Workflow State + Workflow Transition + Workflow Action Master) | — | — |
| Create Server Script | ✅ `POST /api/resource/Server Script` | — | — |
| Create Webhook | ✅ `POST /api/resource/Webhook` | — | — |
| Submit submittable doctype | ✅ `POST /api/method/frappe.client.submit` | — | — |
| Read any doctype | ✅ `GET /api/resource/<Doctype>?filters=...` | — | — |
| Read logs | — | ✅ `docker logs nxz-backend-1` | — |

**Rule of thumb:** REST API for DATA operations. bench CLI for LIFECYCLE / MIGRATE / APP MANAGEMENT. nxz scripts for DOCKER STACK.

**Priority order for data operations: REST API → bench CLI (fallback) → nxz scripts (only for stack lifecycle).**

## When to use this skill

Activate whenever the user wants to:
- Configure an ERPNext instance on the nxz fork (Company, COA, Items, Customers, Workflows)
- Set up Custom Fields / Custom Doctypes / Server Scripts / Webhooks via API
- Lifecycle the Docker stack (build/up/reset/migrate)
- Audit the state of an ERPNext site via REST
- Rotate API keys
- Integrate external apps Nexuz (NXZ Go, KDS, Delivery) with ERPNext

## Prerequisites — credentials & stack

### 1. Stack is running

Verify with:
```bash
cd $FRAPPE_DOCKER_PATH
docker compose --project-name nxz ps
# All containers should be "running" or "healthy"
```

If not, `./nxz/up.sh` to start (or `./nxz/build.sh` + `./nxz/up.sh` if first time).

### 2. `.env` resolved

Read these from `$FRAPPE_DOCKER_PATH/nxz/.env`:
- `HTTP_PUBLISH_PORT` (default 8080; autor usa 8090)

### 3. API Key carimbado

After `up.sh` (or `reset.sh`), run ONCE:
```bash
./nxz/gen-api-key.sh <user> --save
```

This writes `nxz/.secrets/<user>.env` with `FRAPPE_API_KEY` + `FRAPPE_API_SECRET`. Necessary because of **encryption_key drift** at bootstrap (see `troubleshooting.md` in docs nxz).

**WARNING:** this script ROTATES the secret on every call. Run once, reuse. Don't run "pra garantir".

### 4. Source the env

```bash
source $FRAPPE_DOCKER_PATH/nxz/.secrets/<user>.env
# exports FRAPPE_API_KEY and FRAPPE_API_SECRET
```

## Core workflows

### 1. Smoke tests (always first)

```bash
PORT=$(grep '^HTTP_PUBLISH_PORT=' $FRAPPE_DOCKER_PATH/nxz/.env | cut -d= -f2)
BASE="http://localhost:$PORT"
HOST_HDR="Host: erpnext.localhost"
AUTH="Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET"

# Unauthenticated ping
curl -s -H "$HOST_HDR" $BASE/api/method/ping
# → {"message":"pong"}

# Authenticated ping
curl -s -H "$HOST_HDR" -H "$AUTH" $BASE/api/method/frappe.auth.get_logged_user
# → {"message":"<user>"}
```

Se 401, re-rodar `gen-api-key.sh --save` e re-source. Se pong falha, stack não está pronta.

### 2. Read state (REST first)

```bash
# List all Companies
curl -s -H "$HOST_HDR" -H "$AUTH" \
     "$BASE/api/resource/Company?fields=%5B%22name%22%2C%22abbr%22%2C%22country%22%5D"

# Get specific Company
curl -s -H "$HOST_HDR" -H "$AUTH" \
     "$BASE/api/resource/Company/Nexuz%20Sistemas%20Inteligentes%20Ltda"

# List Custom Fields of a target doctype
curl -s -H "$HOST_HDR" -H "$AUTH" \
     "$BASE/api/resource/Custom%20Field?filters=%5B%5B%22dt%22%2C%22%3D%22%2C%22Customer%22%5D%5D&fields=%5B%22name%22%2C%22fieldname%22%2C%22fieldtype%22%5D"
```

### 3. Create records via REST

**Pattern:** GET first (idempotency check) → if missing, POST.

```bash
# Create Company
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
     -d '{
       "company_name": "Nexuz Sistemas Inteligentes Ltda",
       "abbr": "NEXUZ",
       "default_currency": "BRL",
       "country": "Brazil",
       "chart_of_accounts": "Brazil - Default COA"
     }' \
     $BASE/api/resource/Company | jq .
# → { "data": { "name": "Nexuz Sistemas Inteligentes Ltda", ... } }
```

**Always capture `data.name`** — PK natural do Frappe.

### 4. Update records via REST

```bash
curl -s -X PUT -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
     -d '{"country": "Brazil"}' \
     "$BASE/api/resource/Company/Nexuz%20Sistemas%20Inteligentes%20Ltda" | jq .
```

### 5. RPC calls via `/api/method/`

```bash
# Call frappe.client.get_list with JSON body
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
     -d '{"doctype":"Item","filters":[["item_group","=","Software"]],"fields":["name","item_code"]}' \
     $BASE/api/method/frappe.client.get_list | jq .

# Submit a submittable doctype
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
     -d '{"doctype":"Sales Invoice","name":"SINV-0001"}' \
     $BASE/api/method/frappe.client.submit | jq .
```

### 6. Custom Field creation

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
     $BASE/api/resource/Custom%20Field | jq .
```

### 7. Custom Doctype creation (REST + bench migrate)

```bash
# 1. POST DocType
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
     -d @specs/my-custom-doctype.json \
     $BASE/api/resource/DocType | jq .

# 2. Migrate (gera tabela no DB)
docker exec -it nxz-backend-1 bench --site erpnext.localhost migrate
```

### 8. Workflow creation (4 docs em sequência)

```bash
# 1. Workflow State (para cada estado)
curl -s -X POST ... -d '{"doctype":"Workflow State","workflow_state_name":"Aguardando Aprovação"}' \
     $BASE/api/resource/Workflow%20State

# 2. Workflow Action Master (para cada action label)
curl -s -X POST ... -d '{"doctype":"Workflow Action Master","workflow_action_name":"Aprovar"}' \
     $BASE/api/resource/Workflow%20Action%20Master

# 3. Workflow (com states + transitions embutidos)
curl -s -X POST ... -d @specs/my-workflow.json \
     $BASE/api/resource/Workflow
```

### 9. Webhook creation

```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
     -d '{
       "doctype": "Webhook",
       "webhook_doctype": "Sales Invoice",
       "webhook_docevent": "on_submit",
       "request_url": "https://hooks.nexuz.com.br/erpnext/invoice-submit",
       "request_method": "POST",
       "webhook_headers": [{"key":"X-Secret","value":"{{env}}"}]
     }' \
     $BASE/api/resource/Webhook | jq .
```

### 10. Server Script creation

```bash
curl -s -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
     -d '{
       "doctype": "Server Script",
       "name": "Validate Customer CNPJ",
       "script_type": "DocType Event",
       "reference_doctype": "Customer",
       "doctype_event": "Before Save",
       "script": "if doc.cnpj and len(doc.cnpj.replace(\".\", \"\").replace(\"/\", \"\").replace(\"-\", \"\")) != 14:\n    frappe.throw(\"CNPJ inválido\")"
     }' \
     $BASE/api/resource/Server%20Script | jq .
```

**WARNING**: `server_script_enabled` em System Settings precisa estar ligado. Checar antes.

## Error handling

### 401 Unauthorized
- `api_secret` rotacionou OU `encryption_key` drift no bootstrap
- Fix: rodar `gen-api-key.sh <user> --save` uma vez e re-source

### 403 Forbidden
- Role do user não permite acesso ao doctype
- Fix: via `/api/resource/DocType Permission` adicionar role, ou usar user com System Manager

### 417 Expectation Failed
- Campo obrigatório faltando no POST
- Fix: ler response `_server_messages` para detalhes, adicionar campo no payload

### 404 Not Found
- Doctype não existe (typo) ou app não instalado no site
- Fix: verificar `docker exec nxz-backend-1 bench --site erpnext.localhost list-apps`

### Host header ausente → página HTML default
- Sempre incluir `Host: erpnext.localhost`

### Stack não responde
- Ver `docker logs nxz-backend-1` e `nxz-create-site-1`
- Troubleshooting em `frappe_docker/docs/nxz/troubleshooting.md`

## Working with the EDD (ERPNext Design Document)

This squad produces an EDD in Step 06. The translation rules:

| EDD Concept | ERPNext Object |
|---|---|
| Company (razão social) | Doctype Company |
| Ano fiscal | Doctype Fiscal Year |
| Plano de contas | Tree of Account (hierarchy via parent_account) |
| Centro de custo | Tree of Cost Center |
| Tipo de produto | Item Group |
| Produto/serviço | Item |
| Unidade de medida | UOM + UOM Conversion Detail |
| Cliente | Customer + Customer Group |
| Fornecedor | Supplier + Supplier Group |
| Almoxarifado | Warehouse (hierarchy) |
| Usuário | User + Role |
| Workflow de aprovação | Workflow + Workflow State + Workflow Transition |
| Campo customizado | Custom Field |
| Validação server-side | Server Script (DocType Event) |
| Endpoint customizado | Server Script (API) |
| Integração de saída | Webhook |

## Design best practices for ERPNext

1. **One Company per legal entity**. Multi-company setup only if de fato há múltiplas entidades.
2. **Abbr matters** — usada em autonaming (NEXUZ-00001, etc). 3-6 letras.
3. **Chart of Accounts early** — antes de qualquer Sales/Purchase/Journal Entry.
4. **UOMs antes de Items** — Item requer `stock_uom` Link válido.
5. **Item Group tree** antes de Items.
6. **Separate Dev and Prod** — esta squad é para **local only**. Prod outro caminho.
7. **Custom Fields são versionáveis** via `fixtures` — exportar após criar (fora do escopo desta squad).
8. **Server Scripts requerem enable** — System Settings → Enable Server Script = Yes.
9. **Submittable doctypes** ficam em draft após POST — submit via `frappe.client.submit`.
10. **Host header sempre** — esquecer = 404 silencioso.

## Reference files

- `references/rest-recipes.md` — full REST endpoint library (CRUD + RPC)
- `references/bench-cli-recipes.md` — bench commands via docker exec
- `references/doctype-catalog.md` — core doctypes + dependencies + mandatory fields
- `references/known-limitations.md` — API gaps and UI-only operations
- `references/auth-patterns.md` — token vs cookie, CSRF (não aplica com token), rotação
- `references/nxz-scripts-wrapper.md` — wrapper patterns para scripts nxz/*.sh

## Memory

When a squad completes an ERPNext setup, save learnings to `squads/<squad>/_memory/memories.md`:
- What worked on the first try (reusable template)
- What required bench instead of REST (document why)
- Which Custom Fields collided with existing (document renames)
- Doctype dependencies discovered the hard way
- Customer-specific naming conventions / abbr choices
