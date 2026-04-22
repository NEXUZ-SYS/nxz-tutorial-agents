# nxz/*.sh Scripts — Wrapper Patterns

Scripts do fork `frappe_docker/nxz/` são a interface preferida para lifecycle
da stack. Esta referência mostra quando e como invocá-los da squad.

Todos os comandos assumem `cd $FRAPPE_DOCKER_PATH` antes.

## `./nxz/build.sh`

**Quando chamar**:
- Primeira instalação
- Após editar `nxz/apps.json`
- Após mudança de versões Python/Node no Dockerfile

**Não chamar**:
- A cada execução da squad (é caro — 3-25min)
- Se imagem `nxz-erpnext:v16` já existe e não mudou nada

**Verificação pré-call**:
```bash
docker image inspect nxz-erpnext:v16 >/dev/null 2>&1 && echo "imagem existe" || echo "precisa buildar"
```

**Verificação pós-call**:
```bash
docker run --rm --entrypoint="" nxz-erpnext:v16 ls apps
# Deve listar: frappe, erpnext, payments, crm, lms, builder (+ adicionais)
```

## `./nxz/up.sh`

**Quando chamar**:
- Sempre que quiser a stack rodando
- Após `down.sh` ou `reset.sh`

**Verificação pré-call**:
```bash
# Se já tem containers rodando, down antes
docker compose --project-name nxz ps | grep -q "running" && ./nxz/down.sh
```

**Verificação pós-call (STACK ESTÁ READY?)**:
```bash
# up.sh retorna antes de create-site terminar. Aguardar:
docker logs -f nxz-create-site-1
# Ou aguardar o ping funcionar:
PORT=$(grep '^HTTP_PUBLISH_PORT=' nxz/.env | cut -d= -f2)
until curl -s -H "Host: erpnext.localhost" http://localhost:$PORT/api/method/ping | grep -q pong; do
  echo "waiting for erpnext..."
  sleep 10
done
echo "stack ready"
```

## `./nxz/down.sh`

**Quando chamar**:
- Desligar sem perder dados
- Antes de `up.sh` se algo está travado

**Preserva**: volumes (site, DB, Redis).

## `./nxz/reset.sh`

**Quando chamar**:
- Adicionou app em `apps.json` e precisa recriar o site
- Site em estado inconsistente

**DESTRUTIVO**: apaga todos os volumes. Pede confirmação interativa (digitar "reset").

**A squad NÃO deve chamar `reset.sh` automaticamente** — sempre confirmar com user explicitamente via AskUserQuestion antes.

Wrapper recomendado para squad:
```bash
# Confirmar com user ANTES (via AskUserQuestion — responsabilidade do step)
# Depois:
cd $FRAPPE_DOCKER_PATH
echo "reset" | ./nxz/reset.sh
./nxz/up.sh
# Aguardar ready conforme acima
./nxz/gen-api-key.sh <user> --save
```

## `./nxz/gen-api-key.sh`

**Quando chamar**:
- 1x após `up.sh` ou `reset.sh` (encryption_key drift)
- Rotação intencional

**NUNCA** chamar repetidamente — rotaciona o secret.

```bash
./nxz/gen-api-key.sh <user> --save
# Grava nxz/.secrets/<user>.env
source nxz/.secrets/<user>.env
```

## Patterns para a squad

### Pattern 1: Bootstrap fresh (stack recém-buildada)
```bash
cd $FRAPPE_DOCKER_PATH
# Verificar imagem
docker image inspect nxz-erpnext:v16 >/dev/null 2>&1 || ./nxz/build.sh

# Subir
./nxz/up.sh

# Aguardar ready
PORT=$(grep '^HTTP_PUBLISH_PORT=' nxz/.env | cut -d= -f2)
until curl -s -H "Host: erpnext.localhost" http://localhost:$PORT/api/method/ping | grep -q pong; do
  sleep 10
done

# Carimbar secret (encryption_key drift)
./nxz/gen-api-key.sh Administrator --save
source nxz/.secrets/Administrator.env

# Smoke test auth
curl -s -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     http://localhost:$PORT/api/method/frappe.auth.get_logged_user
```

### Pattern 2: Stack já rodando, só pegar creds
```bash
cd $FRAPPE_DOCKER_PATH
# Se já tem .secrets/<user>.env, source
source nxz/.secrets/Administrator.env 2>/dev/null || {
  # Ainda não existe, gerar
  ./nxz/gen-api-key.sh Administrator --save
  source nxz/.secrets/Administrator.env
}
# Smoke test
PORT=$(grep '^HTTP_PUBLISH_PORT=' nxz/.env | cut -d= -f2)
curl -s -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     http://localhost:$PORT/api/method/frappe.auth.get_logged_user
```

### Pattern 3: Trocar de user (Administrator → ai@nxz.ai)
```bash
# Pressupõe user já criado via REST
cd $FRAPPE_DOCKER_PATH
./nxz/gen-api-key.sh ai@nxz.ai --save
source nxz/.secrets/ai@nxz.ai.env  # sobrescreve FRAPPE_API_KEY
```

### Pattern 4: Adicionar app e instalar no site
```bash
# 1. Editar nxz/apps.json adicionando app
# 2. Rebuild
./nxz/build.sh
# 3. App fica no bench mas não no site — instalar:
docker exec -it nxz-backend-1 bench --site erpnext.localhost install-app <app>
# 4. Clear cache
docker exec -it nxz-backend-1 bench --site erpnext.localhost clear-cache
```

### Pattern 5: Logs diagnóstico durante falha
```bash
# Últimas 200 linhas do backend
docker logs --tail=200 nxz-backend-1

# Filtro de erros
docker logs nxz-backend-1 2>&1 | grep -iE 'error|traceback'

# create-site (durante bootstrap)
docker logs -f nxz-create-site-1
```

## Env vars esperadas

A skill lê estas vars (com fallback aos defaults em `config.env`):

| Var | Default | Fonte |
|---|---|---|
| `FRAPPE_DOCKER_PATH` | `/home/walterfrey/Documentos/code/frappe_docker` | `config.env` da skill |
| `HTTP_PUBLISH_PORT` | `8080` | `$FRAPPE_DOCKER_PATH/nxz/.env` |
| `FRAPPE_SITE` | `erpnext.localhost` | fixo por `access-contract.md` |
| `FRAPPE_API_KEY` | — | `$FRAPPE_DOCKER_PATH/nxz/.secrets/<user>.env` |
| `FRAPPE_API_SECRET` | — | idem |
| `FRAPPE_USER` | `Administrator` | escolhido no step 01 |

## Segurança

- **Nunca commitar** conteúdo de `nxz/.secrets/*` — diretório gitignored por default.
- **Nunca ecoar secret em logs** — logar apenas `FRAPPE_API_KEY=***` redacted.
- **Não expor além de localhost** — docs nxz dizem explicitamente "base de teste local, não exponha publicamente".
