---
execution: inline
agent: squads/nxz-erpnext-setup/agents/architect
inputFile: squads/nxz-erpnext-setup/output/research-findings.md
outputFile: squads/nxz-erpnext-setup/output/erpnext-design-document.md
---

# Step 06: ERPNext Design Document (EDD)

## Agente responsável
**Paulo Processos** (📐) — traduz entrevista + pesquisa em um Design Document em camadas.

## Context Loading

- `squads/nxz-erpnext-setup/pipeline/data/interview-data.md` — fonte da verdade do negócio
- `squads/nxz-erpnext-setup/output/research-findings.md` — validação técnica da API
- `squads/nxz-erpnext-setup/pipeline/data/config-focus.md` — escopo e customization level
- `squads/nxz-erpnext-setup/pipeline/data/domain-framework.md` — mapeamento Nexuz → ERPNext
- `squads/nxz-erpnext-setup/pipeline/data/anti-patterns.md` — erros comuns a evitar
- `_opensquad/_memory/company.md` — contexto Nexuz
- `frappe_docker/docs/nxz/access-contract.md` — contrato estável

## Instructions

### Process

1. Ler entrevista completa (fonte da verdade).
2. Ler pesquisa (confirmar viabilidade técnica de cada item da entrevista).
3. Para CADA camada do escopo, traduzir entrevista → design ERPNext:

   **Layer 0 — Stack lifecycle** (presente sempre, mesmo se stack já rodando)
   - Decidir entre: assumir stack up / rodar `up.sh` / rodar `reset.sh` + `up.sh`
   - Documentar porta e caminho do repo `frappe_docker`
   - Plano de smoke tests (ping + get_logged_user)
   - Gerar api_key carimbado (`gen-api-key.sh --save` 1x após up)

   **Layer 1 — API access + Users baseline**
   - Criar usuário AI Team se declarado na entrevista
   - Gerar api_key para o usuário alvo
   - Aplicar role baseline (System Manager para run inicial; restringir em runs futuras)

   **Layer 2 — Company + Fiscal Year**
   - Company com dados da entrevista (razão social, abbr, CNPJ via Custom Field, regime tributário)
   - Fiscal Year conforme entrevista

   **Layer 3 — Chart of Accounts + Cost Centers**
   - Se template: Company.chart_of_accounts = "Brazil - Default COA" (ou outro declarado)
   - Se CSV: plano de import (preview + mapping)
   - Se custom: árvore de Account + Cost Center proposta

   **Layer 4 — Master Data** (se no escopo)
   - UOMs customizadas (além das default)
   - Item Groups (hierarquia)
   - Warehouses (hierarquia)
   - Customer Groups + Customers iniciais
   - Supplier Groups + Suppliers iniciais
   - Items iniciais (com UOM, item_group, is_stock_item, stock_uom)

   **Layer 5 — Customizations** (se no escopo)
   - Custom Fields listados na entrevista (dt, fieldname, fieldtype, label, mandatory)
   - Property Setters (ajustes a campos standard — ex: tornar Customer.tax_id mandatory)
   - Custom Doctypes (se declarados)

   **Layer 6 — Workflows + Rules** (se no escopo)
   - Workflows com estados, transições, doctype alvo
   - Server Scripts tipo DocType Event (validações, automações server-side)

   **Layer 7 — Integrations** (se no escopo)
   - Webhooks (doctype, docevent, url, headers)
   - Server Scripts tipo API (endpoints customizados)
   - Integrações de entrada (fonte externa → doctype destino)

4. Gerar **diagrama Mermaid** da arquitetura completa (Company, módulos, Custom Doctypes, Workflows, integrações).
5. Gerar **JSON specs** por camada em `squads/nxz-erpnext-setup/specs/` (input para o Configurator).
6. Seção **"Deltas vs. Entrevista"** com qualquer item proposto fora do coletado (justificativa + flag para revisão do usuário).
7. Estimativa de volume (quantos Items, Customers, Custom Fields) e quota de API calls.

## Output Format

```markdown
# ERPNext Design Document (EDD) — Nexuz

**Arquiteto:** Paulo Processos
**Data:** {YYYY-MM-DD}
**Baseado em:** interview-data.md ({ts}), research-findings.md ({ts})

## Arquitetura Geral
(Diagrama Mermaid)

## Deltas vs. Entrevista
| Delta | Camada | Justificativa | Flag |
|---|---|---|---|
| Custom Field Company.ramo_atividade | 5 | ... | ⚠️ aprovar |

## Estimativa
- Total de operações POST: ~N
- Volume inicial esperado: X Items / Y Customers / Z Suppliers
- Layer mais pesada: {layer} (~N operações)

## Layer 0: Stack Lifecycle
- Decisão: {up.sh | reset.sh+up.sh | assumir up}
- Porta: {HTTP_PUBLISH_PORT}
- Repo path: {caminho}
- Smoke tests plan: ping + get_logged_user

## Layer 1: API Access + Users
### User: email@nxz.ai (AI Team)
```json
{
  "doctype": "User",
  "email": "email@nxz.ai",
  "first_name": "AI",
  "last_name": "Team",
  "user_type": "System User",
  "roles": [{"role": "System Manager"}]
}
```
### API Key
- Usuário alvo: {user}
- Script: `./nxz/gen-api-key.sh {user} --save`
- Armazenar: `nxz/.secrets/{user}.env`

## Layer 2: Company + Fiscal Year
### Company: {razão social}
```json
{ ... }
```

## Layer 3: Chart of Accounts
...

## Layer 4: Master Data
...

## Layer 5: Customizations
### Custom Field: Customer.cnpj
```json
{
  "doctype": "Custom Field",
  "dt": "Customer",
  "fieldname": "cnpj",
  "fieldtype": "Data",
  "label": "CNPJ",
  "reqd": 1,
  "unique": 1
}
```

## Layer 6: Workflows
...

## Layer 7: Integrations
### Webhook: Sales Invoice on_submit
```json
{
  "doctype": "Webhook",
  "webhook_doctype": "Sales Invoice",
  "webhook_docevent": "on_submit",
  "request_url": "https://hooks.nexuz.com.br/erpnext/invoice-paid",
  "webhook_headers": [ { "key": "X-Secret", "value": "{{env}}" } ]
}
```

## JSON Specs (para Step 08)
Referência: `squads/nxz-erpnext-setup/specs/`
- 01-users-roles.json
- 02-company-fiscal.json
- 03-coa-cost-centers.json
- 04-uom-item-groups.json
- 05-warehouses.json
- 06-items.json
- 07-customers-suppliers.json
- 08-custom-fields.json
- 09-workflows.json
- 10-server-scripts.json
- 11-webhooks.json

## Ordem de Execução (Configurator deve seguir)
1. Layer 0 → smoke tests
2. Layer 1 → user + api_key
3. Layer 2 → Company + Fiscal Year + Currency seeds
4. Layer 3 → COA
5. Layer 4 → UOM → Item Groups → Warehouses → Items → Customer Groups → Customers → Supplier Groups → Suppliers
6. Layer 5 → Custom Fields → Property Setters → Custom Doctypes
7. Layer 6 → Workflow States → Workflows → Server Scripts (DocType Event)
8. Layer 7 → Webhooks → Server Scripts (API)
```

## Veto Conditions

1. Entrevista não foi lida como fonte primária do design
2. Algum bloco da entrevista foi omitido no EDD
3. Deltas vs. entrevista não foram sinalizados
4. Ordem de execução não respeita dependências (ex: Item antes de UOM)
5. JSON specs não foram gerados em `specs/`
6. Estimativa de volume não foi calculada

## Quality Criteria

- [ ] Cada bloco da entrevista tem contraparte no EDD
- [ ] Layer 0 (lifecycle) tem decisão explícita sobre stack
- [ ] Dependências entre layers documentadas
- [ ] Deltas vs. entrevista em seção dedicada com flag
- [ ] JSON specs gerados para cada layer
- [ ] Diagrama Mermaid da arquitetura
- [ ] Estimativa de operações POST e volume de dados
- [ ] Ordem de execução explícita para o Configurator
