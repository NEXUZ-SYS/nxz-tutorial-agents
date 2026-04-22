---
execution: inline
agent: squads/nxz-erpnext-setup/agents/configurator
inputFile: squads/nxz-erpnext-setup/output/erpnext-design-document.md
outputFile: squads/nxz-erpnext-setup/output/configuration-log.md
required_skills:
  - erpnext-integration
---

# Step 08: Configurar ERPNext via Skill `erpnext-integration`

## Skill obrigatória

Este step **exige** a skill `erpnext-integration`. Toda interação com o ERPNext
passa por ela — REST API ou bench CLI via docker exec. Abrir primeiro:

- `skills/erpnext-integration/SKILL.md` — fluxo hybrid e matriz de decisão
- `skills/erpnext-integration/references/rest-recipes.md` — endpoints validados
- `skills/erpnext-integration/references/bench-cli-recipes.md` — comandos bench
- `skills/erpnext-integration/references/doctype-catalog.md` — dependências
- `skills/erpnext-integration/references/known-limitations.md` — o que não funciona
- `skills/erpnext-integration/references/auth-patterns.md` — token auth

## Context Loading

- `squads/nxz-erpnext-setup/output/erpnext-design-document.md` — design aprovado
- `squads/nxz-erpnext-setup/specs/` — JSON specs por camada
- `squads/nxz-erpnext-setup/pipeline/data/config-focus.md` — escopo e customization level
- `squads/nxz-erpnext-setup/pipeline/data/anti-patterns.md` — erros comuns
- `frappe_docker/docs/nxz/access-contract.md` — contrato estável
- `frappe_docker/docs/nxz/lifecycle.md` — scripts

## Instructions

### Pré-flight (obrigatório)

1. Ler EDD e identificar Layer 0 (lifecycle plan)
2. Verificar `frappe_docker/nxz/.env` contém `HTTP_PUBLISH_PORT`
3. **Layer 0**: executar lifecycle conforme Layer 0 do EDD:
   - Se "assumir up": smoke test antes de qualquer coisa
   - Se `up.sh`: rodar e aguardar `docker logs -f nxz-create-site-1` terminar
   - Se `reset.sh` + `up.sh`: confirmar com user (destrutivo)
4. Após stack up (caso fresh start): rodar `./nxz/gen-api-key.sh <user> --save` **UMA ÚNICA VEZ** para carimbar secret (vide troubleshooting nxz — encryption_key drift).
5. Source das credenciais:
   ```bash
   source <frappe_docker_path>/nxz/.secrets/<user>.env
   ```
6. Smoke tests:
   ```bash
   PORT=$(grep '^HTTP_PUBLISH_PORT=' <frappe_docker_path>/nxz/.env | cut -d= -f2)
   curl -s -H "Host: erpnext.localhost" http://localhost:$PORT/api/method/ping
   # esperado: {"message":"pong"}

   curl -s -H "Host: erpnext.localhost" \
        -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
        http://localhost:$PORT/api/method/frappe.auth.get_logged_user
   # esperado: {"message":"<user>"}
   ```
7. Abortar se smoke test falhar — logar erro e pausar para user.

### Processo por camada (ordem obrigatória)

Aplicar a **matriz de decisão da skill** em cada operação:

| Layer | Operação | Interface primária | Fallback |
|---|---|---|---|
| 0 | Stack lifecycle (build/up/reset/api-key) | bench scripts nxz/ | — |
| 1 | User, Role, API Key | REST (`/api/resource/User`, `Role`) + script nxz/ | — |
| 2 | Company, Fiscal Year | REST API | — |
| 3 | Account, Cost Center (COA) | REST API | bench para import CSV se aplicável |
| 4 | UOM, Item Group, Warehouse, Item, Customer, Supplier | REST API | — |
| 5 | Custom Field, Property Setter, Custom Doctype | REST API | bench (migrate) após criar Custom Doctype |
| 6 | Workflow State, Workflow, Workflow Action Master, Workflow Transition, Server Script | REST API | — |
| 7 | Webhook, Server Script (API) | REST API | — |

### Invocação REST API

```bash
source <frappe_docker_path>/nxz/.secrets/<user>.env
PORT=$(grep '^HTTP_PUBLISH_PORT=' <frappe_docker_path>/nxz/.env | cut -d= -f2)
BASE="http://localhost:$PORT"
AUTH="Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET"
HOST_HDR="Host: erpnext.localhost"

# Exemplo — criar Company
curl -s -X POST "$BASE/api/resource/Company" \
     -H "$HOST_HDR" -H "$AUTH" \
     -H "Content-Type: application/json" \
     -d @specs/02-company-fiscal.json | jq .
```

### Invocação bench CLI (lifecycle e migrate)

```bash
# Install app no site (quando app recém-adicionado à imagem)
docker exec -it nxz-backend-1 bench --site erpnext.localhost install-app <app>

# Migrate (após criar Custom Doctype)
docker exec -it nxz-backend-1 bench --site erpnext.localhost migrate

# List apps
docker exec nxz-backend-1 bench --site erpnext.localhost list-apps
```

### Regras de operação

- **Idempotência:** antes de POST, GET via `?filters=[["name","=","<candidate_name>"]]`. Se existir, PATCH; se não, POST.
- **Nomes canônicos**: usar nomes de Doctype canônicos em inglês (`Customer`, não `Cliente`).
- **Header `Host`**: NUNCA esquecer `Host: erpnext.localhost`.
- **Capturar `name`**: cada POST retorna `data.name`. Capturar e tabelar no log.
- **Log com timestamp** para cada operação (sucesso/falha/manual-required).
- **Falha → continuar**: uma operação falhada não aborta. Log e próxima.
- **Delay entre calls**: 300ms entre POSTs para evitar sobrecarregar MariaDB dev.
- **Submit submittable**: doctypes submittable (Sales Invoice, Purchase Order, Journal Entry) ficam em draft após POST. Submit via `/api/method/frappe.client.submit` só quando o EDD explicitamente pedir.
- **Re-auth em 401**: se receber 401 no meio, pausar e re-rodar `gen-api-key.sh` + re-source — NÃO silenciar erros de auth.
- **Ao descobrir nova limitação**, atualizar `skills/erpnext-integration/references/known-limitations.md`.

## Output Format

```markdown
# Log de Configuração ERPNext

## Resumo
- Total de operações: X
- Sucesso: X / Falha: Y / Manual required: Z
- Skill usada: erpnext-integration v1.0.0
- Porta: {PORT}
- Base URL: http://localhost:{PORT}

## Smoke Tests Pré-flight
- [✅/❌] ping retornou pong em {ts}
- [✅/❌] get_logged_user retornou {user} em {ts}

## `names` Criados (referência rápida)
| Doctype | name | Layer | Created at |
|---|---|---|---|
| Company | {razão social} | 2 | {ts} |
| Fiscal Year | 2026 | 2 | {ts} |
| UOM | Unidade | 4 | {ts} |
| Item Group | Software | 4 | {ts} |
| Item | NXZ-ERP-MENSAL | 4 | {ts} |
...

## Layer 0: Stack Lifecycle
- Decisão tomada: {assumir-up | up.sh | reset.sh+up.sh}
- [✅/❌] {script} em {ts}
- [✅] gen-api-key.sh {user} --save em {ts}

## Layer 1: API Access + Users
- [✅] {ts} POST /api/resource/User → name="{email}" (via REST)
- [✅] {ts} gen-api-key.sh → api_key gravado em nxz/.secrets/{user}.env

## Layer 2: Company + Fiscal Year
- [✅] {ts} POST /api/resource/Company → name="{razão social}" (via REST)
- [✅] {ts} POST /api/resource/Fiscal Year → name="2026" (via REST)

## Layer 3: COA
- [✅] {ts} Company atualizada com chart_of_accounts="Brazil - Default COA" (via PATCH)
OU
- [⚠️ MANUAL] COA custom: importar CSV manualmente via UI (API não suporta import direto)

## Layer 4: Master Data
...

## Layer 5: Customizations
- [✅] {ts} POST /api/resource/Custom Field → name="Customer-cnpj" (via REST)
...

## Layer 6: Workflows
...

## Layer 7: Integrations
- [✅] {ts} POST /api/resource/Webhook → name="{hash}" (via REST)
...

## Falhas e Ações Manuais
- [❌ {ts}] POST {endpoint} com {payload} → 417 "{msg}" — TODO: corrigir {campo} no spec
- [⚠️ MANUAL] {operação} — guia em {file.md}

## Descobertas a documentar em known-limitations.md
- ...
```

## Veto Conditions

1. Agente chamou API ou bench sem seguir a matriz de decisão da skill
2. Smoke test pré-flight não foi executado
3. Nenhuma operação de criação executada (tudo falhou sem fallback)
4. `names` não capturados (impossibilita layers subsequentes e auditoria)
5. `Host: erpnext.localhost` ausente em alguma chamada
6. `gen-api-key.sh` rodado mais de 1x sem justificativa (rotação desnecessária)

## Quality Criteria

- [ ] Skill `erpnext-integration` carregada antes de qualquer operação
- [ ] Matriz de decisão consultada para cada tipo de operação
- [ ] Smoke tests pré-flight executados com sucesso
- [ ] Ordem de criação respeitada (Company antes de COA, UOM antes de Item, etc.)
- [ ] Todos os `names` capturados e documentados
- [ ] Log documenta qual interface foi usada em cada operação
- [ ] Descobertas novas refletidas em `known-limitations.md`
- [ ] Delay de 300ms entre calls respeitado
