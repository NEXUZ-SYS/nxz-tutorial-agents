# Pesquisa ERPNext API — Escopo Núcleo (Run 2026-04-22-150201)

**Pesquisadora:** Rita Pesquisa (🔍)
**Data:** 2026-04-22
**Escopo:** Núcleo — Company + Fiscal Year + Chart of Accounts (+ Custom Field como ferramenta de suporte)
**Stack alvo:** `nxz-erpnext:v16` (fork `NEXUZ-SYS/frappe_docker`) em `http://localhost:8090`
**Versões confirmadas na imagem:** frappe 16.16.0 · erpnext 16.15.0 (release oficial 2026-04-22)

---

## 1. Contrato de Acesso (validado contra docs nxz)

Contrato estável conforme [`frappe_docker/docs/nxz/`](/home/walterfrey/Documentos/code/frappe_docker/docs/nxz/):

| Item | Valor | Fonte |
|---|---|---|
| Base URL | `http://localhost:8090` (host do autor; default do time é 8080) | [`access-contract.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/access-contract.md) |
| Host header (obrigatório) | `Host: erpnext.localhost` | [`access-contract.md#host-header-obrigatório`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/access-contract.md) |
| Auth | `Authorization: token <key>:<secret>` (CSRF não se aplica com token) | [`api-access.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/api-access.md) |
| Envelope de chaves | `/home/walterfrey/Documentos/code/frappe_docker/nxz/.secrets/Administrator.env` (`FRAPPE_API_KEY` + `FRAPPE_API_SECRET`) | [`api-access.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/api-access.md) |
| Apps instalados no site | erpnext, crm, lms, builder (+ payments como required_apps de crm) | [`access-contract.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/access-contract.md) + [`apps-workflow.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/apps-workflow.md) |
| Smoke tests validados | `GET /api/method/ping` → `{"message":"pong"}` · `GET /api/method/frappe.auth.get_logged_user` → `{"message":"Administrator"}` | [`getting-started.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/getting-started.md) |

### Pontos de atenção operacionais

1. **Rotação destrutiva de secret:** [`lifecycle.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/lifecycle.md) — `./nxz/gen-api-key.sh` **sempre rotaciona**. Rodar uma única vez após `up.sh`/`reset.sh` para "carimbar" o secret pós encryption_key drift ([`troubleshooting.md` sintoma "Failed to decrypt key"](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/troubleshooting.md)).
2. **Apps hardcoded no create-site:** [`apps-workflow.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/apps-workflow.md) — apps adicionados em `nxz/apps.json` ficam no bench mas não no site automaticamente. Para instalar app BR eventual: `docker exec -it nxz-backend-1 bench --site erpnext.localhost install-app <app>`.
3. **Porta divergente:** valor no host do autor é 8090 (env `HTTP_PUBLISH_PORT=8090`); exemplos da doc usam 8080. Sempre resolver via `grep '^HTTP_PUBLISH_PORT=' nxz/.env`.
4. **Status atual da stack (validado nesta run):** 0 Companies, 0 Fiscal Years, 0 Custom Fields em Company. Campo nativo de base limpa — qualquer criação desta run é **idempotência via GET first**.

**Smoke test executado nesta pesquisa:**
```bash
source /home/walterfrey/Documentos/code/frappe_docker/nxz/.secrets/Administrator.env
curl -s -H "Host: erpnext.localhost" http://localhost:8090/api/method/ping
# {"message":"pong"}
curl -s -H "Host: erpnext.localhost" -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
  http://localhost:8090/api/method/frappe.auth.get_logged_user
# {"message":"Administrator"}
```

---

## 2. Módulos de Localização Brasileira (P1)

### Apps investigados

| App | URL | Compatível v16 | Último push | Doctypes / Capacidades | Licença | Stars | Recomendação |
|---|---|---|---|---|---|---|---|
| **brunoobueno/erpnext_fiscal_br** | https://github.com/brunoobueno/erpnext_fiscal_br | **NÃO** — `required_apps=["frappe","erpnext"]` + README "ERPNext v15.x" explícito | 2025-12-16 (ativo) | `Configuracao_fiscal`, `Certificado_digital`, `Nota_fiscal`, `Evento_fiscal`; NFe/NFCe, DANFE, CCe, regimes tributários | MIT | 14 | **Não instalar.** Monitorar fork/PR v16 nos próximos 3-6 meses. |
| **SonyBlackk/erpnext_fiscal_br** | https://github.com/SonyBlackk/erpnext_fiscal_br | A validar (fork) | 2025-12-23 | Fork do brunoobueno sem release v16 aparente | — | 0 | Não usar. |
| **techmaxsolucoes/ERPNext Regional Brasil** | https://github.com/orgs/techmaxsolucoes/projects/2 (project board) | NÃO — targeting v14 originalmente, "stalled on testing phase" (Nov/2025) | — | Motor tributário Python (`motor_tributario_py` push 2026-01-09), integração SPED (`SPEDIR-DOCS` push 2025-12-29) | — | — | Componentes úteis como referência, mas nenhum app Frappe plugable disponível. |
| **frappe/erpnext regional/** | `apps/erpnext/erpnext/regional/` | Sim (parte do core) | Core v16 | Hoje contém *regional rules* para KSA, IN, UAE, etc. — **sem submódulo Brazil** | GPL-3 | — | Sem suporte nativo BR no core v16. |
| **COA template BR embarcado** | `verified/br_planilha_de_contas.json` | **SIM** | Core v16 | Template COA *único ativo* para Brazil; valida-se pelo `country_code=br` | GPL-3 | — | Usar. |
| Issue #30847 (Brazil Compliance) | https://github.com/frappe/erpnext/issues/30847 | — | Aberta desde 2022, sem maintainer oficial | — | — | — | Sem movimento institucional. |

### Recomendação final para Nxz (Nucleo + próximas fases)

**Para esta run (Núcleo):** **nenhum app BR maduro para v16**. Seguir com:

1. Template COA `"Brasileira - Planilha de Contas"` (embutido no core v16 — ver §3).
2. Campo nativo `Company.tax_id` (Data, label "Tax ID") para guardar o CNPJ — **evita Custom Field hoje**.
3. Custom Fields opcionais: `regime_tributario`, `inscricao_estadual`, `inscricao_municipal` em Company (sem colisão verificada, ver §6).

**Para próximas runs (NFe/NFCe, impostos):** reavaliar `brunoobueno/erpnext_fiscal_br` — é o único projeto BR com atividade constante em 2025/2026 e licença MIT. Se não lançar v16 até meados de 2026, construir fork interno Nxz baseado nesse código-fonte.

**Anti-pattern:** não instalar `erpnext_fiscal_br@main` hoje contra `erpnext@version-16` — vai quebrar por `required_apps`/migration. A regra nxz [`apps-workflow.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/apps-workflow.md) exige `./nxz/reset.sh` (destrutivo) em caso de erro de install — caro.

---

## 3. Template "Brazil - Default COA" (P2)

**Resposta direta:** O template exato **"Brazil - Default COA" NÃO existe** no ERPNext v16. O que existe é:

| Nome do template | Onde | Disponível? | Validado |
|---|---|---|---|
| `Brasileira - Planilha de Contas` | `apps/erpnext/erpnext/accounts/doctype/account/chart_of_accounts/verified/br_planilha_de_contas.json` | **Sim, nativamente** | Confirmado via `get_charts_for_country?country=Brazil` |
| `Standard` | Fallback universal (core) | Sim | Confirmado |
| `Standard with Numbers` | Fallback universal (core) | Sim | Confirmado |

### Evidência — API response

```bash
source /home/walterfrey/Documentos/code/frappe_docker/nxz/.secrets/Administrator.env
curl -s -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     "http://localhost:8090/api/method/erpnext.accounts.doctype.account.chart_of_accounts.chart_of_accounts.get_charts_for_country?country=Brazil&with_standard=true"
# {"message":["Brasileira - Planilha de Contas","Standard","Standard with Numbers"]}
```

### Correção do endpoint na doc nxz/skill

A skill e a entrevista mencionam `erpnext.accounts.doctype.chart_of_accounts.chart_of_accounts.get_charts_for_country` — **errado no v16**. Path real:

```
erpnext.accounts.doctype.account.chart_of_accounts.chart_of_accounts.get_charts_for_country
```

Diferença: `doctype/account/chart_of_accounts/chart_of_accounts.py` (em Account), não `doctype/chart_of_accounts/chart_of_accounts.py` (que existia em versões antigas).

### Hierarquia raiz do `br_planilha_de_contas.json`

Estrutura do template confirmada via `docker exec nxz-backend-1 cat apps/erpnext/erpnext/accounts/doctype/account/chart_of_accounts/verified/br_planilha_de_contas.json`:

- **ATIVO**
  - CIRCULANTE (Contas Retificadoras, Créditos [com Clientes = Receivable], Despesas do Exercício Seguinte, Disponibilidades [Bancos, Caixa = Bank], Estoques, Investimentos Temporários, Mercadorias para Revenda, Outros Créditos, Serviços Prestados)
  - NÃO-CIRCULANTE (Investimentos, Imobilizado, Intangível)
- **PASSIVO**
  - CIRCULANTE (Contas a Pagar, Empréstimos, Impostos, Salários, Obrigações Sociais)
  - NÃO-CIRCULANTE (Exigível a Longo Prazo)
- **PATRIMÔNIO LÍQUIDO** (Capital Social, Reservas, Lucros Acumulados)
- **RECEITA** (Receita Bruta de Vendas, Deduções, Outras Receitas Operacionais)
- **DESPESA** (Custo das Vendas, Despesas Operacionais, Despesas Financeiras, Tributos sobre Lucro)

Atende estrutura padrão brasileira (ATIVO/PASSIVO/PL/DRE). Marca `Clientes` como `Receivable`, `Bancos/Caixa` como `Bank`.

### Recomendação final P2

Usar **literalmente** a string `"Brasileira - Planilha de Contas"` em `Company.chart_of_accounts`. **Atualizar interview-data.md** — a entrevista registrou "Brazil - Default COA" que crasha (ver §5.1 abaixo — 500 AttributeError silencioso).

---

## 4. Impacto de Instalar App BR Pós-Company (P3)

**Resposta direta:** Não aplicável nesta run (Núcleo fica sem app BR). Mas o padrão geral e as restrições da stack `nxz-erpnext:v16` implicam:

### Riscos técnicos

1. **Migração destrutiva do COA já criado:** apps de localização BR (quando existirem em v16) tipicamente adicionam contas via `fixtures.py` + `after_install()`. Se a Company já existe com Brazilian COA de origem, a instalação cria **contas adicionais** (não remove as existentes), mas pode falhar em validações se o app pressupõe contas específicas que não estão lá.
2. **Custom Fields colidindo:** se o app define `Company.cnpj` (provável) e Nxz já criou manualmente, `bench migrate` falha com `DuplicateEntryError`. Ordem importa.
3. **Hardcoded lista de apps em `nxz/compose.create-site.yaml`:** [`apps-workflow.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/apps-workflow.md) deixa claro que instalar app novo no site já existente exige `docker exec ... bench install-app`. Não acontece automaticamente no `up.sh`.
4. **`reset.sh` é destrutivo:** [`lifecycle.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/lifecycle.md) — se der errado e precisar limpar, **todos os dados somem**.

### Ordem recomendada (quando houver app BR v16)

1. Rodar `./nxz/down.sh`.
2. Editar `nxz/apps.json` adicionando o app BR.
3. `./nxz/build.sh` (~3-5min rebuilding).
4. `./nxz/reset.sh` (destrutivo — só se Company ainda não tem dados reais).
5. `./nxz/up.sh`.
6. `docker exec -it nxz-backend-1 bench --site erpnext.localhost install-app <app_br>`.
7. `./nxz/gen-api-key.sh Administrator --save` (carimbar secret de novo).
8. Recriar Company (via REST conforme §5.1).

**Alternativa não-destrutiva** (Company já em uso): instalar app via `install-app` + rodar `bench --site erpnext.localhost migrate` — geralmente os apps BR não removem contas, apenas adicionam. Fazer backup antes (`bench --site erpnext.localhost backup`).

### Precauções

- **Nunca criar Custom Field com mesmo fieldname que o app possa definir.** Usar prefixo `nxz_` para customs internos (`nxz_regime_tributario`, `nxz_inscricao_estadual`). Mais fácil de mergear depois.
- **Documentar Custom Fields criados manualmente** — quando um app BR sair em v16, revisar e migrar.

### Recomendação final P3

**Para Núcleo desta run:** não é bloqueio. Seguir sem app BR.

**Ordem segura para futuro:** `app BR PRIMEIRO` → `Company DEPOIS`. Evita migração de dados. Se Company já existir, fazer backup + migrate + validar COA.

---

## 5. REST API — Doctypes do Escopo Núcleo

Todos os endpoints validados via `DocField` list contra `http://localhost:8090`.

### 5.1 Company

- **Endpoint:** `POST /api/resource/Company`
- **Doctype:** não-submittable (não precisa `frappe.client.submit`).
- **Body mínimo obrigatório:**

```json
{
  "company_name": "Nxz Sistemas Inteligentes Ltda",
  "abbr": "NXZ",
  "default_currency": "BRL",
  "country": "Brazil"
}
```

- **Body recomendado (com COA BR + Tax ID nativo):**

```json
{
  "company_name": "Nxz Sistemas Inteligentes Ltda",
  "abbr": "NXZ",
  "default_currency": "BRL",
  "country": "Brazil",
  "chart_of_accounts": "Brasileira - Planilha de Contas",
  "tax_id": "00.000.000/0001-00"
}
```

- **Dependências implícitas:**
  - `default_currency` → Link para `Currency` (BRL existe no core).
  - `country` → Link para `Country` (Brazil existe, `code=br`).
  - `chart_of_accounts` → Select populado dinamicamente via `get_charts_for_country`. Se vazio, defaulta para `"Standard"`. Se inválido, **500 AttributeError** silencioso (validado empiricamente nesta pesquisa).
  - Criar Company automaticamente cria Tree de Cost Centers + Warehouses padrão.

- **Exemplo curl completo:**

```bash
source /home/walterfrey/Documentos/code/frappe_docker/nxz/.secrets/Administrator.env
curl -s -X POST \
     -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
       "company_name": "Nxz Sistemas Inteligentes Ltda",
       "abbr": "NXZ",
       "default_currency": "BRL",
       "country": "Brazil",
       "chart_of_accounts": "Brasileira - Planilha de Contas",
       "tax_id": "00.000.000/0001-00"
     }' \
     "http://localhost:8090/api/resource/Company" | python3 -m json.tool
```

- **Resposta esperada:** `{"data":{"name":"Nxz Sistemas Inteligentes Ltda",...}}` (201).
- **Idempotência (GET first):**

```bash
curl -s -H "Host: erpnext.localhost" -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     "http://localhost:8090/api/resource/Company/Nxz%20Sistemas%20Inteligentes%20Ltda"
# 200 → existe. 404 → criar via POST.
```

- **Campos obrigatórios confirmados via DocField:** `company_name` (Data), `abbr` (Data), `country` (Link), `default_currency` (Link). Total 127 fields no doctype.

### 5.2 Fiscal Year

- **Endpoint:** `POST /api/resource/Fiscal Year`
- **Doctype:** não-submittable.
- **Body mínimo obrigatório:**

```json
{
  "year": "2026",
  "year_start_date": "2026-01-01",
  "year_end_date": "2026-12-31"
}
```

- **Body recomendado (com Company vinculada via child table):**

```json
{
  "year": "2026",
  "year_start_date": "2026-01-01",
  "year_end_date": "2026-12-31",
  "companies": [
    { "company": "Nxz Sistemas Inteligentes Ltda" }
  ]
}
```

- **Dependências:**
  - Campo obrigatório `year` (Data) = nome legível. Convenção: `"2026"`.
  - `companies` é child table `Fiscal Year Company` — tem apenas `company` (Link para Company, reqd=1).
  - Não há campo `is_default` direto no doctype; para definir default, usar Global Defaults ou `frappe.db.set_single_value("Global Defaults","current_fiscal_year","2026")`.

- **Exemplo curl:**

```bash
source /home/walterfrey/Documentos/code/frappe_docker/nxz/.secrets/Administrator.env
curl -s -X POST \
     -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
       "year": "2026",
       "year_start_date": "2026-01-01",
       "year_end_date": "2026-12-31",
       "companies": [{"company": "Nxz Sistemas Inteligentes Ltda"}]
     }' \
     "http://localhost:8090/api/resource/Fiscal%20Year" | python3 -m json.tool
```

- **GET first (idempotência):**

```bash
curl -s -H "Host: erpnext.localhost" -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     "http://localhost:8090/api/resource/Fiscal%20Year/2026"
```

- **Definir como default após criar:**

```bash
curl -s -X POST \
     -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{"doctype":"Global Defaults","current_fiscal_year":"2026"}' \
     "http://localhost:8090/api/method/frappe.client.set_value"
```

### 5.3 Account (COA atômico)

- **Endpoint:** `POST /api/resource/Account`
- **Doctype:** não-submittable.
- **Uso típico:** já criado automaticamente quando Company recebe template. **Só usar se precisar adicionar conta manual** (ex.: subconta que o template BR não cobre).

- **Body mínimo obrigatório:**

```json
{
  "account_name": "Conta de Exemplo",
  "parent_account": "ATIVO - NXZ",
  "company": "Nxz Sistemas Inteligentes Ltda",
  "is_group": 0,
  "root_type": "Asset"
}
```

- **Dependências críticas:**
  - `parent_account` (Link reqd=1) → **deve existir antes**. Autonaming de Account usa `<nome> - <abbr>` (ex: `ATIVO - NXZ`).
  - `company` (Link reqd=1).
  - `account_name` (Data reqd=1).
  - `root_type` (Select): `Asset`, `Liability`, `Equity`, `Income`, `Expense` — necessário nos nós raiz; filhos herdam.
  - `account_type` (Select, opcional): `Receivable`, `Payable`, `Bank`, `Cash`, `Stock`, `Tax`, `Expense Account`, etc.
  - `is_group` (Check): 1 se é grupo pai, 0 se é folha lançável.

- **Exemplo curl:**

```bash
source /home/walterfrey/Documentos/code/frappe_docker/nxz/.secrets/Administrator.env
curl -s -X POST \
     -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
       "account_name": "Cartão de Crédito - NXZ Go",
       "parent_account": "Bancos - NXZ",
       "company": "Nxz Sistemas Inteligentes Ltda",
       "is_group": 0,
       "account_type": "Bank",
       "root_type": "Asset"
     }' \
     "http://localhost:8090/api/resource/Account" | python3 -m json.tool
```

- **Listar COA atual da Company:**

```bash
curl -s -H "Host: erpnext.localhost" -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     "http://localhost:8090/api/resource/Account?filters=%5B%5B%22company%22%2C%22%3D%22%2C%22Nxz%20Sistemas%20Inteligentes%20Ltda%22%5D%5D&fields=%5B%22name%22%2C%22account_name%22%2C%22parent_account%22%2C%22root_type%22%2C%22is_group%22%5D&limit_page_length=500"
```

### 5.4 Custom Field

- **Endpoint:** `POST /api/resource/Custom Field`
- **Doctype:** não-submittable.
- **Body mínimo obrigatório:**

```json
{
  "dt": "Company",
  "fieldtype": "Data"
}
```

- **Body recomendado:**

```json
{
  "dt": "Company",
  "fieldname": "nxz_regime_tributario",
  "label": "Regime Tributário",
  "fieldtype": "Select",
  "options": "\nSimples Nacional\nLucro Presumido\nLucro Real",
  "reqd": 0,
  "insert_after": "tax_id"
}
```

- **Campos obrigatórios confirmados via DocField:** apenas `dt` (Link reqd=1) e `fieldtype` (Select reqd=1). `fieldname` não é reqd mas **deve ser passado** para não receber hash autogenerado.
- **Convenção Nxz:** prefixar `nxz_` em todos os custom fields para evitar colisão com apps regionais futuros.
- **`insert_after`:** nome do fieldname existente após o qual o campo aparecerá na UI. `tax_id` é seguro em Company.
- **Migração automática:** diferente de Custom Doctype, Custom Field **não precisa** `bench migrate` — é aplicado na hora.

- **Exemplo curl:**

```bash
source /home/walterfrey/Documentos/code/frappe_docker/nxz/.secrets/Administrator.env
curl -s -X POST \
     -H "Host: erpnext.localhost" \
     -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
       "dt": "Company",
       "fieldname": "nxz_regime_tributario",
       "label": "Regime Tributário",
       "fieldtype": "Select",
       "options": "\nSimples Nacional\nLucro Presumido\nLucro Real",
       "insert_after": "tax_id"
     }' \
     "http://localhost:8090/api/resource/Custom%20Field" | python3 -m json.tool
```

---

## 6. Validação de Custom Fields Propostos

Realizado GET em `/api/resource/DocField?filters=[["parent","=","Company"]]` (127 fields) + `/api/resource/Custom Field?filters=[["dt","=","Company"]]` (0 fields hoje) contra a stack real. Resultado:

| Fieldname proposto | Tipo | Doctype | Colisão? | Recomendação |
|---|---|---|---|---|
| `cnpj` | Data | Company | **Sim parcialmente** — existe `tax_id` nativo (Data, label="Tax ID") que serve como CNPJ genericamente | **Não criar**. Usar `Company.tax_id` direto. Adicionar label auxiliar via Property Setter se quiser renomear visualmente. |
| `regime_tributario` | Select | Company | Não (nenhum campo nativo nem custom) | **Criar como `nxz_regime_tributario`** (prefixo evita futuro app BR). Options: `"\nSimples Nacional\nLucro Presumido\nLucro Real"`. `insert_after=tax_id`. |
| `inscricao_estadual` | Data | Company | Não | **Criar como `nxz_inscricao_estadual`**. `insert_after=nxz_regime_tributario`. |
| `inscricao_municipal` | Data | Company | Não | **Criar como `nxz_inscricao_municipal`**. `insert_after=nxz_inscricao_estadual`. |

**Conclusão:** zero Custom Fields em Company hoje na stack. Nenhuma colisão. **Abandonar `cnpj` em favor de `tax_id` nativo** evita dívida técnica quando app BR for instalado no futuro (apps como `erpnext_fiscal_br` v15 tipicamente adicionam `cnpj` como Custom Field — teria colisão). Usar prefixo `nxz_` nos 3 campos restantes.

---

## 7. Endpoints `/api/method/` Úteis para Setup Núcleo

| Método | Uso | Confirmado v16 |
|---|---|---|
| `ping` | `GET` — smoke test sem auth | ✅ |
| `frappe.auth.get_logged_user` | `GET` — validar auth token | ✅ |
| `erpnext.accounts.doctype.account.chart_of_accounts.chart_of_accounts.get_charts_for_country` | `GET ?country=Brazil&with_standard=true` — listar templates COA disponíveis | ✅ (path v16 correto — difere do v14/v15) |
| `erpnext.accounts.doctype.account.chart_of_accounts.chart_of_accounts.get_chart` | `GET ?chart_template=Brasileira - Planilha de Contas` — retorna tree do template | ✅ |
| `frappe.client.get_list` | `POST {"doctype":"X","filters":[...],"fields":[...]}` | ✅ |
| `frappe.client.get_value` | `POST {"doctype":"X","filters":{...},"fieldname":"..."}` | ✅ |
| `frappe.client.set_value` | `POST {"doctype":"X","name":"Y","fieldname":"Z","value":...}` — update atomic | ✅ |
| `frappe.client.insert` | `POST {"doc":{"doctype":"X",...}}` — equivalente a POST /api/resource | ✅ |
| `frappe.client.submit` | `POST {"doctype":"X","name":"Y"}` — usar em submittable (não aplicável ao escopo Núcleo) | ✅ |
| `frappe.desk.form.save.savedocs` | POST cookie-based — **NÃO usar com token**, é para UI | n/a |

### Exemplo útil — listar COA templates válidos antes de criar Company:

```bash
curl -s -H "Host: erpnext.localhost" -H "Authorization: token $FRAPPE_API_KEY:$FRAPPE_API_SECRET" \
     "http://localhost:8090/api/method/erpnext.accounts.doctype.account.chart_of_accounts.chart_of_accounts.get_charts_for_country?country=Brazil&with_standard=true"
# {"message":["Brasileira - Planilha de Contas","Standard","Standard with Numbers"]}
```

---

## 8. Novidades v16 (vs v15) Relevantes

Validadas via releases oficiais 2026-04-22 (`v16.15.0`) e código-fonte na imagem:

1. **Path do módulo `chart_of_accounts` mudou:** agora está sob `doctype/account/` (v16), antes era `doctype/chart_of_accounts/` (v14/v15). Impacta chamadas RPC — documentadas no skill ERPNext atual estão erradas.
2. **`Company.create_chart_of_accounts_based_on`** novo campo Literal (`"Standard Template"` ou `"Existing Company"`). Se não passado, ERPNext infere a partir de `chart_of_accounts` e `existing_company`.
3. **Release cadence mais rápida:** v16.x atualiza a cada ~3-4 dias (v16.13.3 → v16.14.0 → v16.15.0 em 11 dias). Pin via tag ou hash, não branch.
4. **Tax ID único no core** — `Company.tax_id` confirmado existir (mesmo do v15). Issue aberta [#50167](https://github.com/frappe/erpnext/issues/50167) para separar Tax ID vs VAT/GST ID, ainda não implementada.
5. **COA importer separado** (`chart_of_accounts_importer` é doctype próprio) — permite bulk import de CSV custom.

---

## 9. Limitações / Riscos Identificados

1. **[BLOQUEANTE — correção necessária]** `Company.chart_of_accounts = "Brazil - Default COA"` (registrado na entrevista) **quebra com 500 AttributeError**. Trocar para **`"Brasileira - Planilha de Contas"`** no EDD/Step 06.
2. **Path RPC errado na skill:** corrigir `erpnext.accounts.doctype.chart_of_accounts.*` → `erpnext.accounts.doctype.account.chart_of_accounts.*` em `SKILL.md`.
3. **Sem app BR em v16:** CNPJ validation, NFe, PIS/COFINS/ICMS/ISS — nenhum disponível. `erpnext_fiscal_br@v15` é o mais maduro (MIT, 14 stars, ativo Dez/2025) mas **incompatível v16 hoje**.
4. **Secret rotation footgun:** rodar `gen-api-key.sh` "pra garantir" quebra clientes em produção. Rodar **uma vez** depois de `up.sh`/`reset.sh` e **nunca mais** salvo rotação intencional.
5. **Hardcoded apps no create-site:** adicionar novo app requer `docker exec bench install-app` + `gen-api-key.sh` de novo (encryption_key drift).
6. **Stack sem HTTPS:** contrato explicitamente **local only** ([`access-contract.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/access-contract.md)). Não assumir TLS em clientes.
7. **`is_default` em Fiscal Year não existe no doctype:** usar `Global Defaults.current_fiscal_year` via `frappe.client.set_value`.
8. **Custom Field sem `fieldname` explícito** vira hash autogerado (ilegível). Sempre passar `fieldname`.
9. **`tax_id` é Data genérico:** sem validação de dígito/formato CNPJ. Se precisar validar, criar Server Script `Before Save` em Company (fora do escopo Núcleo — flag para runs futuras).
10. **COA criado falha silenciosamente** se template inválido passar — capturar HTTP 500 + `exc_type=AttributeError` no runner e dar erro claro.

---

## 10. Fontes

### Docs locais nxz (validadas)
- [`/home/walterfrey/Documentos/code/frappe_docker/docs/nxz/index.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/index.md) — 2026-04-22
- [`access-contract.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/access-contract.md) — 2026-04-22
- [`api-access.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/api-access.md) — 2026-04-22
- [`getting-started.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/getting-started.md) — 2026-04-22
- [`apps-workflow.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/apps-workflow.md) — 2026-04-22
- [`lifecycle.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/lifecycle.md) — 2026-04-22
- [`troubleshooting.md`](file:///home/walterfrey/Documentos/code/frappe_docker/docs/nxz/troubleshooting.md) — 2026-04-22
- [`skills/erpnext-integration/SKILL.md`](file:///home/walterfrey/Documentos/code/nexuz/nxz-tutorial-agents/skills/erpnext-integration/SKILL.md) — 2026-04-22

### Docs oficiais Frappe/ERPNext
- [Frappe REST API](https://docs.frappe.io/framework/user/en/api/rest) — acesso 2026-04-22
- [ERPNext GitHub — frappe/erpnext](https://github.com/frappe/erpnext) — acesso 2026-04-22
- [ERPNext v16.15.0 release (2026-04-22)](https://github.com/frappe/erpnext/releases/tag/v16.15.0) — acesso 2026-04-22
- [How To Make Regional Contributions (Wiki)](https://github.com/frappe/erpnext/wiki/How-To-Make-Regional-Contributions) — acesso 2026-04-22
- [Issue #30847 Brazil Compliance](https://github.com/frappe/erpnext/issues/30847) — acesso 2026-04-22

### Apps BR investigados
- [brunoobueno/erpnext_fiscal_br](https://github.com/brunoobueno/erpnext_fiscal_br) — MIT, 14 stars, v15 only, push 2025-12-16
- [SonyBlackk/erpnext_fiscal_br](https://github.com/SonyBlackk/erpnext_fiscal_br) — fork, 0 stars, push 2025-12-23
- [techmaxsolucoes GitHub org](https://github.com/techmaxsolucoes) — motor_tributario_py (push 2026-01-09), SPEDIR-DOCS (push 2025-12-29)

### Fórum Frappe
- [Regional Brasileira (Brazil Compliance) NFE thread](https://discuss.frappe.io/t/regional-brasileira-brazil-compliance-nfe/89121) — acesso 2026-04-22 (discussão ativa Nov-Dez/2025)
- [How to fit Brazilian complex taxes in ERPNext taxes](https://discuss.frappe.io/t/how-to-fit-brazilian-complex-taxes-in-erpnext-taxes/8664)

### Código-fonte consultado (via container)
- `nxz-backend-1:apps/erpnext/erpnext/accounts/doctype/account/chart_of_accounts/chart_of_accounts.py` linhas 134-168 (função `get_charts_for_country`)
- `nxz-backend-1:apps/erpnext/erpnext/accounts/doctype/account/chart_of_accounts/verified/br_planilha_de_contas.json` (árvore COA BR)
- `nxz-backend-1:apps/erpnext/erpnext/setup/doctype/company/company.py` linhas 415-541 (função `validate_coa_input` + `create_default_accounts`)
- `nxz-backend-1:apps/erpnext/erpnext/setup/doctype/company/company.json` (campo `tax_id`)

---

## Auto-veto check

- [x] 6 docs nxz lidas e citadas explicitamente (index + access-contract + api-access + getting-started + apps-workflow + lifecycle + troubleshooting = 7 na verdade).
- [x] Cada doctype do escopo (Company, Fiscal Year, Account, Custom Field) tem endpoint + body mínimo + body recomendado + exemplo curl completo contra `http://localhost:8090`.
- [x] 3+ fontes externas oficiais citadas: docs.frappe.io (framework REST), github.com/frappe/erpnext (releases + wiki + issues), discuss.frappe.io.
- [x] Custom Fields validados contra DocField (127 fields listados) + Custom Field (0 fields) — dois endpoints conforme instrução.
- [x] P1 respondida: nenhum app BR maduro para v16. P2 respondida: template é "Brasileira - Planilha de Contas", NÃO "Brazil - Default COA". P3 respondida: ordem app-antes-de-Company; não aplicável nesta run.

