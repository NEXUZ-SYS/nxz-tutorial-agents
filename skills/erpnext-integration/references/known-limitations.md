# Known Limitations — ERPNext REST API + bench CLI

Gaps conhecidos da API e quirks que exigem workaround.
**Atualizar sempre que descobrir uma nova limitação durante execução.**

## 1. encryption_key drift no bootstrap

**Sintoma**: primeira chamada autenticada após `up.sh` passa (às vezes), as próximas falham com 401 ou `InvalidToken`.

**Causa**: o `encryption_key` do site pode drift durante bootstrap entre `bench new-site` e o primeiro request. O `api_secret` criptografado fica não-decifrável.

**Fix documentado em `frappe_docker/docs/nxz/troubleshooting.md`**:
```bash
./nxz/gen-api-key.sh Administrator --save
```

Re-gerar reinstala o secret cifrado com a chave atual.

**Regra**: após `./nxz/up.sh` numa stack recém-criada, **rodar `gen-api-key.sh` UMA vez antes de distribuir credenciais**.

## 2. `gen-api-key.sh` rotaciona o secret a cada call

**Consequência**: rodar "pra garantir" quebra tokens em uso.

**Fix**: rodar 1x, distribuir o `.env`, só rotacionar quando necessário.

## 3. `create-site` só roda na primeira subida

**Sintoma**: adicionei app em `apps.json`, subi com `up.sh`, mas o app não está no site.

**Causa**: `create-site` pula se o volume de sites já existe.

**Workaround**: `docker exec nxz-backend-1 bench --site erpnext.localhost install-app <app>`.

Alternativa destrutiva: `./nxz/reset.sh` + `./nxz/up.sh` (apaga DB).

## 4. Custom Doctype criado via REST não gera tabela DB

**Sintoma**: POST em `/api/resource/DocType` retorna 200, mas GET subsequente falha com "Table doesn't exist".

**Causa**: REST registra o Doctype mas não roda migrate.

**Fix**: após criar Custom Doctype via REST, **rodar `bench migrate`** uma vez:
```bash
docker exec -it nxz-backend-1 bench --site erpnext.localhost migrate
```

## 5. Server Script precisa enable explícito

**Sintoma**: POST de Server Script aceito mas script nunca executa.

**Causa**: System Settings → `server_script_enabled=0` por default (segurança).

**Fix**:
```bash
curl -X PUT -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"server_script_enabled": 1}' \
  "$BASE/api/resource/System%20Settings/System%20Settings"
```

## 6. Doctypes submittable ficam em draft após POST

**Sintoma**: criei Sales Invoice via POST, mas não vejo impact contábil.

**Causa**: POST cria com `docstatus=0` (draft). Só após submit (`docstatus=1`) os efeitos rodam.

**Fix**:
```bash
curl -X POST -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"doc":{"doctype":"Sales Invoice","name":"<name_retornado>"}}' \
  "$BASE/api/method/frappe.client.submit"
```

## 7. `Host: erpnext.localhost` é obrigatório

**Sintoma**: curl sem Host header retorna 404 ou página HTML default.

**Causa**: nginx do Frappe roteia por Host header.

**Fix**: sempre incluir `-H "Host: erpnext.localhost"`.

## 8. Workflow não funciona sem `workflow_state` no Doctype

**Sintoma**: Workflow configurado mas transições não aparecem no doc.

**Causa**: o Doctype alvo precisa ter um campo chamado `workflow_state` (ou o definido em `Workflow.workflow_state_field`).

**Fix**: adicionar Custom Field `workflow_state` (fieldtype Link → Workflow State) ao doctype alvo antes de criar o Workflow.

## 9. Custom Field fieldname case-sensitivity e colisão

**Sintoma**: POST Custom Field retorna 417 "Fieldname already exists".

**Causa**: fieldname (sempre snake_case) colide com field existente em core ou em outro Custom Field.

**Fix**: escolher fieldname único. Consultar:
```bash
curl -H "$HOST_HDR" -H "$AUTH" \
  "$BASE/api/resource/Custom%20Field?filters=%5B%5B%22dt%22%2C%22%3D%22%2C%22Customer%22%5D%5D&fields=%5B%22fieldname%22%5D"
```

## 10. `fields` e `filters` em query params precisam url-encode

**Sintoma**: query retorna 400 ou ignora params.

**Causa**: `[`, `]`, `"` precisam ser escapados na URL.

**Fix**: url-encode. Ou usar `/api/method/frappe.client.get_list` com JSON body (sem encoding).

## 11. MariaDB dev local pode travar com paralelismo

**Sintoma**: erros 500 intermitentes durante lotes.

**Causa**: stack local não é production-grade.

**Fix**: delay 300ms entre POSTs, serializar operações.

## 12. `limit_page_length=0` retorna TODOS os registros (cuidado)

**Sintoma**: query lenta ou timeout.

**Causa**: `0` = no limit. Útil para auditoria mas perigoso em doctypes grandes.

**Fix**: usar `limit_page_length=50` ou `100` por default. Paginar com `limit_start`.

## 13. Apps do fork nxz: crm requer payments

**Sintoma**: `create-site` falha com `ModuleNotFoundError: No module named 'payments'`.

**Causa**: `crm` declara `payments` em `required_apps`.

**Fix**: adicionar `payments` em `nxz/apps.json`. Documentado em `apps-workflow.md`.

## 14. Validação CNPJ / CPF não é nativa do ERPNext

**Sintoma**: ERPNext aceita `tax_id` com qualquer formato.

**Causa**: `tax_id` é `Data` genérico.

**Fix**: Server Script tipo DocType Event (Before Save) para validar 14 dígitos CNPJ ou 11 CPF.

## 15. NF-e / NFC-e não tem no core

**Sintoma**: ERPNext nativo não emite NFe.

**Fix**: integração externa (Nuvem Fiscal, Migrate) via Webhook OU instalar app externo (ex: `brazilfiscal/erpnext_brazil`).

## 16. Submit em bulk via `/api/method/frappe.client.submit` é 1 por 1

**Sintoma**: loop de submit lento.

**Causa**: não há endpoint bulk nativo.

**Workaround**: Server Script (API) custom que itera server-side, ou bench script.

## 17. Payload de DocType POST é complexo

**Sintoma**: POST `/api/resource/DocType` com payload mínimo falha.

**Causa**: DocType precisa `fields` (child table), `permissions` (child table), `module`, `custom=1`.

**Fix**: preparar JSON completo. Exemplo mínimo funcional:
```json
{
  "name": "Mesa",
  "module": "Custom",
  "custom": 1,
  "autoname": "field:mesa_codigo",
  "fields": [
    {"fieldname":"mesa_codigo","label":"Código","fieldtype":"Data","reqd":1,"unique":1},
    {"fieldname":"restaurante","label":"Restaurante","fieldtype":"Link","options":"Company","reqd":1}
  ],
  "permissions": [
    {"role":"System Manager","read":1,"write":1,"create":1,"delete":1}
  ]
}
```

## 18. Após criar Role nova, User precisa ser atualizado

**Sintoma**: Role criada mas não aparece no User.

**Causa**: roles são child table em User — POST Role não adiciona automaticamente.

**Fix**: PUT no User com `roles` child table incluindo a nova role:
```bash
curl -X PUT ... -d '{"roles":[{"role":"System Manager"},{"role":"AI Team"}]}' \
  "$BASE/api/resource/User/email@nxz.ai"
```

---

## Histórico de descobertas

<!-- Adicionar aqui descobertas de runs futuras, com data ISO -->

### 2026-04-22 — criação inicial
Documento seed baseado em:
- `frappe_docker/docs/nxz/troubleshooting.md`
- Frappe REST API docs oficiais
- Aprendizados prévios da squad pipefy (padrão "sempre validar post-POST" aplicado aqui também)
