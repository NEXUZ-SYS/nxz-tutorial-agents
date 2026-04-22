# Auth Patterns — ERPNext REST API

## Token auth (recomendado para todas as chamadas da squad)

### Formato
```http
Authorization: token <api_key>:<api_secret>
Host: erpnext.localhost
```

- **Não precisa CSRF token** com auth via bearer token.
- Funciona em `/api/method/*` e `/api/resource/*` igualmente.
- Válido até `api_secret` ser rotacionado.

### Gerar token

Preferir o wrapper nxz:
```bash
./nxz/gen-api-key.sh <user> --save
# Grava nxz/.secrets/<user>.env com FRAPPE_API_KEY + FRAPPE_API_SECRET
```

Alternativa via bench:
```bash
docker exec -it nxz-backend-1 \
  bench execute frappe.core.doctype.user.user.generate_keys --args '["<user_email>"]'
```

### Source env
```bash
source $FRAPPE_DOCKER_PATH/nxz/.secrets/<user>.env
echo $FRAPPE_API_KEY  # conferir não-vazio
```

### Testar auth
```bash
PORT=$(grep '^HTTP_PUBLISH_PORT=' $FRAPPE_DOCKER_PATH/nxz/.env | cut -d= -f2)
curl -s -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     http://localhost:$PORT/api/method/frappe.auth.get_logged_user
# Esperado: {"message":"<user>"}
```

## Cookie auth (sessão — NÃO USAR NA SQUAD)

Para UI humanos, Frappe usa session cookie via login endpoint.
**A squad NUNCA deve usar cookie auth** — token é auditável, cookie não.

(Documentado aqui apenas para referência.)

```bash
# Login para obter cookie
curl -s -c /tmp/cookies.txt \
  -X POST "$BASE/api/method/login" \
  -d '{"usr":"Administrator","pwd":"admin"}'

# Chamada autenticada com cookie (requer CSRF)
curl -s -b /tmp/cookies.txt \
  -H "X-Frappe-CSRF-Token: <from_boot>" \
  "$BASE/api/method/..."
```

## CSRF token

- **Com token auth: NÃO é necessário.**
- Com cookie auth: necessário para operações de escrita. Obtido do boot (`/api/method/frappe.boot.get_bootinfo`).

A squad sempre usa token auth, então CSRF não aplica.

## Rotação

### Quando rotacionar
- Após bootstrap fresh (1x após `up.sh` ou `reset.sh` — encryption_key drift)
- Suspeita de vazamento
- Antes de handoff formal do projeto

### Quando NÃO rotacionar
- "Pra garantir" (quebra tokens em uso)
- Toda execução da squad (overkill)
- Entre layers da mesma run

### Processo de rotação
1. Rodar `./nxz/gen-api-key.sh <user> --save` (sobrescreve `.env`)
2. Atualizar clients que usam o token (env vars, secret managers)
3. Validar com `get_logged_user`
4. Armazenar evidência (data, quem rodou) em `_memory/memories.md`

## Usuário dedicado vs Administrator

### Administrator
- Role: todas (super-user)
- Uso: bootstrap, primeira run local, debugging
- **NUNCA** em runs produtivas (audit trail pobre, revogar difícil)

### Usuário dedicado (recomendado)
- Ex: `ai@nxz.ai` com Role `System Manager` (ou mais restrito após runs iniciais)
- Criação:
  ```bash
  # Via REST (usando Administrator inicial)
  curl -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
    -d '{
      "email":"ai@nxz.ai",
      "first_name":"AI","last_name":"Team",
      "user_type":"System User",
      "send_welcome_email":0,
      "roles":[{"role":"System Manager"}]
    }' \
    "$BASE/api/resource/User"
  ```
- Gerar API key para ele:
  ```bash
  ./nxz/gen-api-key.sh ai@nxz.ai --save
  source nxz/.secrets/ai@nxz.ai.env  # overrides FRAPPE_API_KEY de Administrator
  ```

### Revogação
Para "revogar" um token sem trocar user, basta rotacionar:
```bash
./nxz/gen-api-key.sh ai@nxz.ai --save
# Token antigo volta 401 a partir desse momento
```

Para **revogar o usuário inteiro** (offboarding), PATCH para disabled:
```bash
curl -X PUT ... -d '{"enabled": 0}' \
  "$BASE/api/resource/User/ai@nxz.ai"
```

## Roles mínimas por operação

| Operação | Role mínima |
|---|---|
| Create Company | System Manager |
| Create Account (COA) | Accounts Manager |
| Create Item | Item Manager |
| Create Customer | Sales Master Manager |
| Create Supplier | Purchase Master Manager |
| Create Custom Field | System Manager |
| Create Workflow | System Manager |
| Create Server Script | System Manager + `server_script_enabled=1` |
| Create Webhook | System Manager |
| Submit Sales Invoice | Accounts Manager OR Sales User (conforme Workflow) |

Para runs iniciais, usar `System Manager` simplifica. Runs futuras podem
granular roles conforme a entrevista.

## Erros comuns

| Status | Causa provável | Fix |
|---|---|---|
| 401 | api_secret rotacionado ou encryption_key drift | `gen-api-key.sh` + re-source |
| 403 | Role do user não permite o doctype | Adicionar role ou usar System Manager |
| 404 | Doctype não existe / app não instalado no site | `bench list-apps` / `install-app` |
| 417 | Campo mandatory faltando ou link inválido | Checar `_server_messages` no response |
| 500 | Erro server Python | `docker logs nxz-backend-1` |
