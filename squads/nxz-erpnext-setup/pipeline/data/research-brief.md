# ERPNext — Briefing de Pesquisa Prévia

## Fontes já consolidadas

### Docs locais do fork nxz (`frappe_docker/docs/nxz/`)
Fonte de verdade para o **contrato de acesso**. Sempre consultar primeiro:

| Doc | O que cobre |
|---|---|
| `index.md` | Visão geral do fork, navegação |
| `getting-started.md` | Happy path do clone ao primeiro curl autenticado |
| `access-contract.md` | URL, porta, Host header, site base, credenciais, apps disponíveis |
| `api-access.md` | Endpoints `/api/method/`, `/api/resource/`, paginação, status codes |
| `apps-workflow.md` | Adicionar/remover apps Frappe da imagem |
| `lifecycle.md` | Scripts `nxz/*.sh` (build, up, down, reset, gen-api-key) |
| `troubleshooting.md` | Sintomas comuns e fixes (porta ocupada, payments missing, encryption_key drift) |

### Informações-chave já conhecidas

**Stack:**
- Imagem: `nxz-erpnext:v16` (fork `github.com/NEXUZ-SYS/frappe_docker`)
- 6 apps pré-instalados: `frappe 16.16.0`, `erpnext 16.15.0`, `payments 0.0.1`, `crm 1.69.1`, `lms 2.52.1`, `builder 1.23.3`
- Instalados no site por default: `erpnext`, `crm`, `lms`, `builder` (+ `payments` via cascata do crm)
- Site: `erpnext.localhost` (Host header obrigatório)
- Porta: `HTTP_PUBLISH_PORT` do `.env` (default 8080; máquina do autor usa 8090)

**API:**
- Endpoints: `/api/method/<dotted.path>` (RPC) + `/api/resource/<Doctype>` (CRUD)
- Auth: `Authorization: token <api_key>:<api_secret>` (token auth não requer CSRF)
- Status codes críticos: 401 (token inválido/rotacionado), 403 (role insuficiente), 417 (validação Frappe)
- Paginação: `limit_page_length`, `limit_start`, `fields`, `filters`, `order_by`

**Scripts `nxz/`:**
- `build.sh` — builda imagem (primeiro build ~15-25min, rebuild ~3-5min)
- `up.sh` — sobe stack (backend, frontend, websocket, queues, scheduler, db, redis)
- `down.sh` — para (mantém volumes)
- `reset.sh` — DESTRUTIVO: apaga volumes (precisa digitar "reset")
- `gen-api-key.sh [user] [--save]` — gera/rotaciona api_key+api_secret (rotaciona a cada call!)

**Limitações conhecidas:**
- Após `up.sh` numa stack recém-criada, `gen-api-key.sh` precisa rodar 1x para "carimbar" secret com encryption_key estável (drift no bootstrap).
- `nxz/compose.create-site.yaml` tem lista de apps instalados HARDCODED — apps adicionados em `apps.json` ficam no bench mas não no site automaticamente. Workaround: `docker exec nxz-backend-1 bench --site erpnext.localhost install-app <app>`.
- `gen-api-key.sh` rotaciona o secret — não rodar periodicamente.

## O que a pesquisa do Step 04 deve complementar

1. **Catálogo de Doctypes essenciais** para o escopo selecionado — listar com dependências
2. **Endpoints `/api/method/` de utilidade**:
   - `frappe.client.insert`, `frappe.client.set_value`, `frappe.client.get_list`
   - `frappe.client.submit` (para doctypes submittable como Sales Invoice)
   - Helpers: `erpnext.setup.setup_wizard.*`
3. **Custom Doctypes e Custom Fields via API** — confirmar que funciona ou listar gaps
4. **Workflows via API** — estados, transições, actions (é via doctype `Workflow`)
5. **Server Scripts via API** — doctype `Server Script`, flags de API acesso
6. **Webhooks via API** — doctype `Webhook`
7. **Roles e permissões via API** — doctypes `Role`, `DocType Permission`, `User Permission`
8. **ERPNext setup wizard programático** — pular UI setup usando `erpnext.setup.setup_wizard.run_setup_wizard`
9. **Novidades v16** (16.15.0) — breaking changes vs v15 ou v14
10. **Discuss.erpnext.com** — workarounds conhecidos para limitações comuns
