---
execution: subagent
agent: squads/nxz-erpnext-setup/agents/researcher
inputFile: squads/nxz-erpnext-setup/pipeline/data/interview-data.md
outputFile: squads/nxz-erpnext-setup/output/research-findings.md
model_tier: powerful
required_skills:
  - erpnext-integration
---

# Step 04: Pesquisa de API e Doctypes ERPNext

## Skill de referência

Antes de pesquisar na web, consultar o que a skill `erpnext-integration` já consolida:

- `skills/erpnext-integration/references/rest-recipes.md` — endpoints `/api/method/` e `/api/resource/`
- `skills/erpnext-integration/references/doctype-catalog.md` — doctypes core + dependências
- `skills/erpnext-integration/references/known-limitations.md` — gaps e quirks
- `skills/erpnext-integration/references/auth-patterns.md` — token vs cookie, CSRF

A pesquisa externa deve **complementar** (novidades v16, questões específicas), não duplicar o que já está documentado.

## Context Loading

- `squads/nxz-erpnext-setup/pipeline/data/config-focus.md` — escopo e parâmetros técnicos
- `squads/nxz-erpnext-setup/pipeline/data/interview-data.md` — dados coletados pela Ana
- `squads/nxz-erpnext-setup/pipeline/data/research-brief.md` — briefing prévio
- `squads/nxz-erpnext-setup/pipeline/data/domain-framework.md` — mapeamento Nexuz → ERPNext
- `frappe_docker/docs/nxz/*` — docs locais (6 arquivos) — **fonte de verdade do contrato de acesso**
- `skills/erpnext-integration/references/` — aprendizados consolidados

## Instructions

### Process

1. Ler `frappe_docker/docs/nxz/index.md` e navegar pelos 6 docs locais — confirmar contrato de acesso e lifecycle.
2. Ler `interview-data.md` para saber qual escopo foi capturado.
3. Pesquisar na documentação oficial:
   - https://frappeframework.com/docs/user/en/api/rest (REST API reference)
   - https://docs.erpnext.com (módulos ERPNext)
   - https://github.com/frappe/erpnext (source para validar doctypes)
   - https://discuss.erpnext.com (workarounds community)
4. Para cada **Doctype** no escopo, documentar:
   - Endpoint `/api/resource/<Doctype>` (POST payload mínimo e opcional)
   - Endpoints `/api/method/` relacionados (ex: `frappe.client.get_list` com filtros)
   - Campos mandatory, Link Fields e dependências
   - Exemplo curl completo
   - Submittable? (se sim, precisa submit após insert)
5. Para cada **Custom Field** declarado na entrevista, confirmar:
   - Doctype alvo existe?
   - Fieldname proposto não colide com campo existente
   - Tipo proposto é suportado (Data, Link, Select, Float, etc.)
6. Para cada **Workflow** declarado, confirmar:
   - Doctype alvo suporta workflow (tem `docstatus`)
   - Estados e transições são representáveis em `Workflow State` + `Workflow Transition`
7. Validar especificamente:
   - Como rodar o ERPNext setup wizard programaticamente (pular UI setup)
   - Como criar Custom Doctype via REST (ou se precisa bench)
   - Como criar Server Script via REST
   - Como criar Webhook via REST
   - Rate limits / paginação (não tem rate limit publicado, mas dev local limita)
8. Reportar **novidades v16** (breaking changes vs v15) relevantes ao escopo

## Output Format

```markdown
# Pesquisa ERPNext API — Escopo Selecionado

## Contrato de Acesso (validado contra docs nxz)
- Base URL: http://localhost:<HTTP_PUBLISH_PORT>
- Site header: Host: erpnext.localhost (obrigatório)
- Auth: Authorization: token <api_key>:<api_secret>
- Apps no site: erpnext, crm, lms, builder, payments

## REST API — Operações por Doctype

### Company
- Endpoint: `POST /api/resource/Company`
- Body mínimo: ...
- Dependências: Currency, Country
- Exemplo curl: ...

### Fiscal Year
- ...

(repetir para cada doctype no escopo)

## Endpoints `/api/method/` úteis
- frappe.client.insert, set_value, get_list, submit
- erpnext.setup.setup_wizard.run_setup_wizard.setup_complete

## Customizações via API
### Custom Field
- Endpoint: `POST /api/resource/Custom Field`
- Body: { "dt": "<target>", "fieldname": "...", "fieldtype": "...", "label": "...", ... }
- Confirmado para os custom fields da entrevista: ✅ all supported
- Alertas: fieldname "cnpj" colide com campo existente em X (se aplicável)

### Custom Doctype
- ...

### Workflow
- Endpoints: `POST /api/resource/Workflow`, `Workflow State`, `Workflow Transition`, `Workflow Action Master`
- ...

### Server Script
- Endpoint: `POST /api/resource/Server Script`
- Campos: script_type (DocType Event | API | Permission Query | Scheduler Event), ...
- Restrição: system setting `server_script_enabled` precisa estar ativo

### Webhook
- Endpoint: `POST /api/resource/Webhook`
- Campos: webhook_doctype, webhook_docevent, request_url, headers
- ...

## Limitações Confirmadas
- ...

## Novidades v16 (vs v15) relevantes
- ...

## Sources
- [Título](URL)
```

## Veto Conditions

1. Docs nxz não foram lidas como fonte primária do contrato de acesso
2. Algum doctype do escopo ficou sem endpoint + exemplo curl
3. Nenhuma fonte oficial citada (frappeframework.com, docs.erpnext.com)
4. Custom Fields da entrevista não foram validados (colisões, tipos)

## Quality Criteria

- [ ] 6 docs nxz lidas e citadas
- [ ] Cada doctype do escopo com endpoint + exemplo curl
- [ ] Pelo menos 3 fontes oficiais citadas
- [ ] Custom Fields da entrevista validados
- [ ] Workflows da entrevista validados
- [ ] Rate limits / paginação documentados
- [ ] Novidades v16 destacadas (se existirem)
