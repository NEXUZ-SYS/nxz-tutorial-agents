# Squad Memory — nxz-erpnext-setup

Memórias de execução ficam aqui. Atualizar ao final de cada run com:

- Decisões arquiteturais consolidadas (mapeamentos Nexuz → ERPNext)
- Padrões descobertos na REST API ou bench CLI durante execução
- O que funcionou bem (reusable templates, scripts)
- O que evitar na próxima (anti-patterns específicos de ERPNext)
- IDs/names importantes criados (company, COA, workflows, custom doctypes)
- Pendências para próxima run (layers incompletas, external todos)

## Learnings acumulados (placeholder inicial — preencher após primeira execução)

### Sobre a stack Docker nxz-erpnext:v16
- Vide docs em `frappe_docker/docs/nxz/` — fonte de verdade.
- Base URL `http://localhost:<HTTP_PUBLISH_PORT>` (default 8080; máquina do autor usa 8090).
- Host header `erpnext.localhost` é obrigatório em toda request.
- Apps pré-instalados: `erpnext`, `crm`, `lms`, `builder` (+`payments` via cascata do crm).
- Scripts lifecycle em `nxz/` — `build.sh`, `up.sh`, `down.sh`, `reset.sh`, `gen-api-key.sh`.

### Sobre a API REST do Frappe
- Duas famílias: `/api/method/<dotted.path>` (RPC) e `/api/resource/<Doctype>` (CRUD).
- Auth: `Authorization: token <api_key>:<api_secret>` — não precisa de CSRF quando usa token.
- `gen-api-key.sh` rotaciona `api_secret` a cada chamada — gerar uma vez, reusar.
- Após `up.sh` numa stack recém-criada, rodar `gen-api-key.sh --save` uma vez para "carimbar" secret com chave estável do site (drift conhecido do encryption_key no bootstrap).
- Pagination via query params: `limit_page_length`, `limit_start`, `fields`, `filters`, `order_by`.
- Status codes úteis: 401 (token inválido/rotacionado), 403 (role insuficiente), 417 (campo obrigatório faltando).

### Padrões esperados para config ERPNext
- Ordem de criação: Company → Fiscal Year → Chart of Accounts → Taxes → Cost Centers → Warehouses → Items → Customers/Suppliers → Users/Roles → Workflows → Custom Doctypes/Fields.
- Doctypes críticos para Food Service: Item (com UOM, Stock UOM), Item Group, Customer, Supplier, Warehouse, POS Profile, Mode of Payment.
- Custom Doctypes úteis para Nexuz: integração com NXZ Go, KDS, Delivery (se migrar para ERPNext como base).

### Regras de negócio Nexuz → ERPNext (a consolidar após primeira run)
- Placeholder — será preenchido conforme a entrevista (step 02) e o design (step 06) forem executados.
