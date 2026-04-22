# Anti-Patterns — ERPNext Setup

## Erros comuns a evitar

### 1. Esquecer o header `Host: erpnext.localhost`
**Errado:** `curl http://localhost:8080/api/method/ping`
**Certo:** `curl -H "Host: erpnext.localhost" http://localhost:8080/api/method/ping`
**Por quê:** o nginx do Frappe roteia por Host header. Sem ele, você recebe 404 ou página default.

### 2. Hardcodar a porta HTTP
**Errado:** `curl .../8080/...`
**Certo:** ler `HTTP_PUBLISH_PORT` do `.env` do repo `frappe_docker`.
**Por quê:** máquinas diferentes usam portas diferentes (default 8080, autor usa 8090).

### 3. Rodar `gen-api-key.sh` repetidamente
**Errado:** rodar "pra garantir" toda vez antes de configurar.
**Certo:** rodar 1x após `up.sh`/`reset.sh` (carimbar secret) e reusar até precisar rotacionar de propósito.
**Por quê:** o script rotaciona o `api_secret` a cada call — invalida tokens em uso.

### 4. Ignorar encryption_key drift do bootstrap
**Errado:** após `up.sh`, começar a rodar config imediatamente e receber `InvalidToken` intermitente.
**Certo:** rodar `gen-api-key.sh Administrator --save` UMA vez após `up.sh` e antes do primeiro curl autenticado da squad.
**Por quê:** o `encryption_key` do site pode drift durante bootstrap; re-gerar o secret "carimba" com a chave estável.

### 5. Usar bench CLI quando REST resolve
**Errado:** `docker exec bench --site erpnext.localhost new-doc Item` para criar um Item.
**Certo:** `POST /api/resource/Item` com JSON body.
**Por quê:** REST é mais rápido, retorna estruturado, testável, auditável. bench é para lifecycle (install-app, migrate, build).

### 6. Criar Doctypes fora de ordem de dependência
**Errado:** criar Item antes de UOM e Item Group.
**Certo:** Company → Fiscal Year → Currency → UOM → Item Group → Warehouse → Item → Customer → Supplier.
**Por quê:** `/api/resource/Item` com link field inválido retorna 417 (mandatory field missing) ou 404 (link not found).

### 7. Deltas silenciosos (Architect adicionando além da entrevista)
**Errado:** Architect incluir Custom Field no EDD "porque faz sentido" sem tê-lo na entrevista.
**Certo:** qualquer proposta fora do coletado vai em seção "Deltas vs. Entrevista" do EDD, com justificativa, para revisão do usuário no Step 07.
**Por quê:** aprendido do pipefy refactor 2026-04-22 — delta silencioso cria divergência realidade vs. vontade do dono.

### 8. Rodar configurator com o secret rotacionado
**Errado:** configurator começa a postar Items e recebe 401 na 5ª call.
**Certo:** configurator faz smoke test `/api/method/frappe.auth.get_logged_user` ANTES de qualquer operação de escrita.
**Por quê:** falha de auth no meio da execução pode criar estado parcial difícil de reverter.

### 9. Usar nomes de Doctypes traduzidos
**Errado:** `POST /api/resource/Cliente` (nome traduzido).
**Certo:** `POST /api/resource/Customer` (nome canônico do ERPNext).
**Por quê:** Frappe case-sensitive e usa nome canônico inglês. Usar UI labels traduzidos é erro comum.

### 10. Esquecer submit em doctypes submittable
**Errado:** criar uma `Sales Invoice` e esperar que tenha efeitos contábeis sem submit.
**Certo:** criar (`docstatus=0`), validar, e submit (`docstatus=1` via `/api/method/frappe.client.submit`).
**Por quê:** doctypes submittable só têm efeitos após submit — POST-only deixa em draft silencioso.

### 11. Tratar stack local como production-grade
**Errado:** simular carga pesada ou paralelismo agressivo.
**Certo:** delay 300ms entre calls, serializar operações sensíveis, aceitar que MariaDB dev pode travar.
**Por quê:** `nxz-erpnext:v16` é base de TESTE local (vide `access-contract.md`) — sem HTTPS, sem redundância, sem tuning.

### 12. Não consultar docs nxz antes de procurar externamente
**Errado:** pesquisar "how to set HTTP_PUBLISH_PORT in frappe_docker" no Google.
**Certo:** ler `frappe_docker/docs/nxz/troubleshooting.md` primeiro — já tem o fix.
**Por quê:** docs nxz foram escritas pelo time para evitar retrabalho; externamente você encontra soluções upstream que não batem com o fork nxz.

### 13. Hardcodar `names` ou IDs
**Errado:** copiar um `name` de um Item criado e usar como string literal em script posterior.
**Certo:** capturar `name` do response do POST e passar adiante como variável.
**Por quê:** `names` gerados por autonaming (series) podem variar entre runs e entre instâncias.

### 14. Configurar em produção sem rodar em dev primeiro
**Errado:** apontar o squad para um site não-local sem testes.
**Certo:** sempre validar em `erpnext.localhost` local; se instância produtiva for alvo, outro squad cuida (nxz-erpnext-promote).
**Por quê:** esta squad é para **teste local**. Produção tem restrições adicionais (HTTPS, IP allowlist, LGPD, backups).
