# Config Focus — Run 2026-04-22-150201

**Run ID:** 2026-04-22-150201
**Date:** 2026-04-22
**Scope:** Núcleo (Stack + API + Company + Fiscal Year + COA)

## Parâmetros técnicos

| Parâmetro | Valor |
|---|---|
| HTTP_PUBLISH_PORT | `8090` |
| FRAPPE_DOCKER_PATH | `/home/walterfrey/Documentos/code/frappe_docker` |
| Secrets file | `nxz/.secrets/Administrator.env` |
| Host header | `Host: erpnext.localhost` |
| Base URL | `http://localhost:8090` |
| API user | `Administrator` |
| Customization level | **Liberal** (Architect propõe livremente, tudo revisado em Step 07) |

## Smoke tests executados
- `GET /api/method/ping` → `pong` (HTTP 200)
- `GET /api/method/frappe.auth.get_logged_user` com token → `Administrator` (HTTP 200)

Stack pronta para Layer 1/2 da configuração. Secrets já carimbados — NÃO rodar `gen-api-key.sh` nesta run.

## Implicações
- **Usuário dedicado AI Team** não será criado nesta run (usuário escolheu Administrator). Ficará como recomendação na documentação final (Step 11).
- Modo **Liberal** dá ao Paulo Processos (Architect) liberdade para propor Custom Fields e ajustes de COA; todas as propostas passam por revisão no Step 07.
