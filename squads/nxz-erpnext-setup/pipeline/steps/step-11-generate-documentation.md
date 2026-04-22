---
execution: inline
agent: squads/nxz-erpnext-setup/agents/trainer
inputFile: squads/nxz-erpnext-setup/output/erpnext-design-document.md
outputFile: squads/nxz-erpnext-setup/output/user-guide.md
---

# Step 11: Gerar Documentação e Guias

## Contexto

A documentação gerada por Teo deve refletir fielmente o que foi configurado
(nomes exatos do ERPNext conforme `configuration-log.md`) e cobrir três perfis:
Admin (devops/AI team), Usuário final (via UI), Integrador (via REST API).

## Context Loading

- `squads/nxz-erpnext-setup/output/erpnext-design-document.md` — design
- `squads/nxz-erpnext-setup/output/configuration-log.md` — o que foi criado (nomes exatos)
- `squads/nxz-erpnext-setup/output/audit-report.md` — resultado da auditoria
- `squads/nxz-erpnext-setup/pipeline/data/interview-data.md` — entrevista
- `_opensquad/_memory/company.md` — contexto Nexuz
- `frappe_docker/docs/nxz/` — docs locais (referenciar, não copiar)

## Instructions

### Process

1. Ler EDD + log de config + audit report.
2. Gerar guias por perfil:

   **Para Admin (AI Team / DevOps):**
   a. Como subir/derrubar a stack (refs lifecycle.md)
   b. Como rotacionar api_key (refs api-access.md + caveats encryption_key)
   c. Como adicionar app novo (refs apps-workflow.md)
   d. Como diagnosticar problemas (refs troubleshooting.md)
   e. Copy-paste commands com PORT e host header corretos

   **Para Usuário final (via UI):**
   a. Como logar (`http://localhost:<porta>/login`)
   b. Como criar um Customer pela UI
   c. Como criar um Item pela UI
   d. Como usar os Custom Fields adicionados (se houver)
   e. Como iniciar um Workflow (se houver)
   f. Quick reference card das ações mais frequentes

   **Para Integrador AI:**
   a. Como obter credenciais (`nxz/.secrets/<user>.env`)
   b. curl template autenticado com Host header
   c. Endpoints principais do escopo configurado (por Doctype)
   d. Paginação, filters, fields (query params)
   e. Como criar um registro via REST (exemplo com Customer)
   f. Como chamar um método RPC (exemplo com `frappe.client.get_list`)
   g. Códigos de status e como interpretar (401, 403, 417, 500)

3. Documentar automações e workflows ativos (o que acontece automaticamente).
4. Gerar FAQ por perfil (mínimo 3 perguntas cada).
5. Incluir diagrama Mermaid da arquitetura final.

## Output Format

```markdown
# Guia de Uso ERPNext — Nexuz

## Visão Geral
(Diagrama Mermaid: Company, módulos ativos, workflows, integrações)

Base URL: http://localhost:{PORT}
Site: erpnext.localhost (sempre enviar `Host: erpnext.localhost`)
Apps instalados: erpnext, crm, lms, builder, payments

---

## Para Admin (AI Team / DevOps)

### Quick Commands
```bash
# Subir stack
cd <frappe_docker_path>
./nxz/up.sh

# Smoke test
curl -H "Host: erpnext.localhost" http://localhost:{PORT}/api/method/ping
# → {"message":"pong"}

# Rotacionar api key (user dedicado)
./nxz/gen-api-key.sh {user} --save

# Derrubar sem perder dados
./nxz/down.sh

# Reset completo (destrutivo — precisa digitar "reset")
./nxz/reset.sh
```

### Troubleshooting
Consulte `frappe_docker/docs/nxz/troubleshooting.md` — sintomas e fixes:
- Port conflict → mudar HTTP_PUBLISH_PORT em `nxz/.env`
- InvalidToken após up → rodar `gen-api-key.sh --save` 1x
- create-site failed → ver `docker logs nxz-create-site-1`

---

## Para Usuário Final (UI)

### Login
1. Acesse `http://localhost:{PORT}` no navegador
2. Use email e senha fornecidos pelo Admin
3. Você verá o Desk do ERPNext

### Criar um Customer
1. Pesquise "Customer" no menu
2. Clique em "+ Novo" (top right)
3. Preencha: Customer Name, Customer Group
4. Custom field "CNPJ" (se configurado): insira sem pontos
5. Salve

### Quick Reference
| Ação | Onde |
|---|---|
| Novo Cliente | Menu → Customer → + Novo |
| Novo Item | Menu → Item → + Novo |
| Ver Contas (COA) | Menu → Chart of Accounts |
| Dashboard | Menu → Dashboard |

---

## Para Integrador AI

### Credenciais
```bash
source <frappe_docker_path>/nxz/.secrets/{user}.env
# Define FRAPPE_API_KEY e FRAPPE_API_SECRET
```

### Template de chamada autenticada
```bash
PORT={PORT}
curl -s -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     http://localhost:$PORT/api/method/frappe.auth.get_logged_user
# → {"message":"<user>"}
```

### Listar Customers
```bash
curl -s -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     "http://localhost:$PORT/api/resource/Customer?limit_page_length=10&fields=%5B%22name%22%2C%22customer_group%22%5D"
```

### Criar Customer via REST
```bash
curl -s -X POST \
     -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{"customer_name":"ACME Corp","customer_group":"FS Small"}' \
     http://localhost:$PORT/api/resource/Customer
```

### Status Codes
- 200 sucesso
- 401 token inválido/rotacionado (re-source .env)
- 403 role insuficiente
- 417 campo obrigatório faltando
- 500 erro de server (`docker logs nxz-backend-1`)

### Outros endpoints relevantes (conforme escopo configurado)
- `GET /api/resource/Item?...`
- `GET /api/resource/Account?filters=[["company","=","..."]]`
- `POST /api/resource/Sales Invoice` (+ submit via `/api/method/frappe.client.submit`)
- `POST /api/method/frappe.client.get_list` (com JSON body)

---

## Automações e Workflows Ativos
| Automação | Quando roda | Efeito |
|---|---|---|
| Webhook X | Sales Invoice on_submit | POST para hooks.nexuz.com.br/... |
| Workflow "Desconto >15%" | Sales Order create/submit | Exige aprovação de Gestor |
...

## FAQ

### Admin
- **P:** Minha api_key parou de funcionar.
  **R:** Secret foi rotacionado. Rode `./nxz/gen-api-key.sh {user} --save` e re-source o .env.
- **P:** Mudei `apps.json` e os apps não aparecem.
  **R:** Rode `./nxz/build.sh` + `./nxz/reset.sh` + `./nxz/up.sh`. Ver `apps-workflow.md`.
- **P:** A porta 8080 está ocupada.
  **R:** Edite `nxz/.env` → `HTTP_PUBLISH_PORT=8090` (ou outra livre).

### Usuário Final
- **P:** Não consigo criar Item — erro "mandatory fields missing".
  **R:** Preencha UOM (stock_uom) e Item Group — são obrigatórios.
- **P:** Onde vejo o Plano de Contas?
  **R:** Menu lateral → Accounting → Chart of Accounts.
- **P:** Como mudo minha senha?
  **R:** Top right → Profile → Change Password.

### Integrador
- **P:** Como criar Customer submittable como invoice?
  **R:** Customer não é submittable. Para Sales Invoice, POST + `frappe.client.submit` para efetivar.
- **P:** Como listar todos os Items sem paginação?
  **R:** `?limit_page_length=0` (todos), mas prefira paginação para performance.
- **P:** Como filtrar por data?
  **R:** `?filters=[["creation",">=","2026-01-01"]]` url-encoded.
```

## Veto Conditions

1. Algum perfil (Admin, Usuário, Integrador) não tem seção dedicada
2. Nomes não batem com `configuration-log.md` (nomes inventados ou genéricos)
3. Curl templates sem Host header ou sem auth
4. Referências a docs nxz ausentes

## Quality Criteria

- [ ] Três perfis cobertos (Admin, Usuário, Integrador)
- [ ] Admin tem comandos bash copy-paste com variáveis
- [ ] Integrador tem curl completos com auth
- [ ] Usuário final tem passo-a-passo em português sem jargão
- [ ] FAQ com 3+ perguntas por perfil
- [ ] Links para docs nxz onde aplicável
- [ ] Diagrama Mermaid da arquitetura
- [ ] Automações/Workflows ativos listados
