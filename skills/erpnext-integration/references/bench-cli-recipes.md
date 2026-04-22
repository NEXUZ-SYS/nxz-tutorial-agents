# bench CLI Recipes — via `docker exec`

Comandos `bench` para operações que REST não cobre ou cobre mal. Sempre via
`docker exec -it nxz-backend-1 bench --site erpnext.localhost <command>`.

## Quando usar bench (não REST)

- **Migrate** — após criar Custom Doctype, rodar `migrate` para gerar tabela no DB
- **Install app** — app recém-adicionado ao imagem fica no bench mas não no site
- **Clear cache** — após property setter ou custom field em doctype heavily-used
- **Backup/restore** — operações de disaster recovery
- **Debug** — `bench execute <path.to.function>` para rodar Python arbitrário
- **Generate keys** — fallback do `gen-api-key.sh`

## Comandos essenciais

### Migrate (após Custom Doctype/Custom Field heavy)
```bash
docker exec -it nxz-backend-1 bench --site erpnext.localhost migrate
```
- Executa patches pendentes + sincroniza schema DB com Doctypes Python
- Tempo: 5s–3min dependendo do volume
- Idempotente (pode rodar múltiplas vezes)

### Install app no site
```bash
docker exec -it nxz-backend-1 bench --site erpnext.localhost install-app <appname>
```
- Necessário quando app foi adicionado à imagem via `apps.json` (vide `apps-workflow.md`)
- Falha se o app não estiver no bench — cheque com `list-apps`
- Falha se `required_apps` não satisfeito — instale dependências primeiro

### List apps instalados no site
```bash
docker exec nxz-backend-1 bench --site erpnext.localhost list-apps
```

### Clear cache
```bash
docker exec -it nxz-backend-1 bench --site erpnext.localhost clear-cache
```
- Útil após mudança de Custom Field em doctype standard

### Clear website cache (para Builder / LMS public pages)
```bash
docker exec -it nxz-backend-1 bench --site erpnext.localhost clear-website-cache
```

### Execute Python arbitrário
```bash
docker exec -it nxz-backend-1 \
  bench --site erpnext.localhost execute frappe.utils.password.get_decrypted_password \
  --args '["User","Administrator","api_secret"]'
```
- Usado pelo `gen-api-key.sh` internamente
- Útil para debugging de encryption_key drift (vide troubleshooting.md)

### Reset password
```bash
docker exec -it nxz-backend-1 \
  bench --site erpnext.localhost set-admin-password <new-password>
```
- Só para Administrator (outros users via `/api/resource/User` PATCH com `new_password`)

### List installed apps versões
```bash
docker exec nxz-backend-1 bench version
```

### Run patches
```bash
docker exec -it nxz-backend-1 bench --site erpnext.localhost run-patch <patch.path>
```

### Uninstall app
```bash
docker exec -it nxz-backend-1 \
  bench --site erpnext.localhost uninstall-app <appname>
```
- Precisa confirmação — usa `--yes` para skip prompt
- CAUIDADO: apaga todos os dados do app (doctypes, records)

## Logs e diagnóstico

### Logs do backend
```bash
docker logs -f nxz-backend-1
```

### Logs com filtro de erros
```bash
docker logs nxz-backend-1 2>&1 | grep -iE 'error|traceback'
```

### Todos os services (últimas 200 linhas)
```bash
cd $FRAPPE_DOCKER_PATH
docker compose --project-name nxz \
  --env-file nxz/.env \
  -f compose.yaml \
  -f overrides/compose.mariadb.yaml \
  -f overrides/compose.redis.yaml \
  -f overrides/compose.noproxy.yaml \
  -f nxz/compose.create-site.yaml \
  logs --tail=200
```

### Status dos containers
```bash
docker compose --project-name nxz ps
# ou:
docker ps --filter name=nxz-
```

## Notas importantes

1. **Sempre `--site erpnext.localhost`** — bench sem `--site` tenta aplicar em todos, causando timeout.
2. **`-it` vs sem `-it`** — interactive para comandos que pedem confirmação; omitir para scripts.
3. **Container exato: `nxz-backend-1`** — NÃO `frontend`, `queue-*`, `scheduler` (esses são para suas funções específicas).
4. **Não rodar migrate em loop** — se migrate falha por `pending patch`, o next migrate aborta. Investigue o patch antes de retry.
5. **gen-api-key.sh é o wrapper recomendado** — use `bench execute frappe.core.doctype.user.user.generate_keys` apenas se precisar customizar comportamento.
