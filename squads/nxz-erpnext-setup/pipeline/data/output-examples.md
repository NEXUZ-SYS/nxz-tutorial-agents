# Output Examples — ERPNext Setup

Exemplos de fragmentos de saída esperados em cada step. Usar como referência
ao gerar documentos (não como template fechado — adaptar ao escopo).

## Exemplo: research-findings.md (Step 04)

```markdown
# Pesquisa ERPNext API — Escopo Full Stack + Customizações

## REST API — Operações Disponíveis

### Doctypes Essenciais (escopo selecionado)

#### Company
- Endpoint: `POST /api/resource/Company`
- Body obrigatório: `{"company_name": "...", "default_currency": "BRL", "country": "Brazil"}`
- Campos opcionais: `chart_of_accounts`, `create_chart_of_accounts_based_on`, `abbr`
- Confirmado: doc oficial + nxz/access-contract.md
- Dependência: Currency "BRL" e Country "Brazil" devem existir (default seed do ERPNext)

#### Fiscal Year
- Endpoint: `POST /api/resource/Fiscal Year`
- Body: `{"year": "2026", "year_start_date": "2026-01-01", "year_end_date": "2026-12-31"}`
...

### Endpoints `/api/method/` úteis
- `frappe.client.insert` — create generic
- `frappe.client.set_value` — update single field
- `frappe.client.get_list` — list with filters
- `frappe.client.submit` — submit submittable doctypes
- `erpnext.setup.setup_wizard.run_setup_wizard.setup_complete` — setup wizard programático

## Limitações Confirmadas
- ...

## Sources
- [Frappe REST API](https://frappeframework.com/docs/user/en/api/rest)
- [ERPNext Accounting](https://docs.erpnext.com/docs/user/manual/en/accounts)
- `frappe_docker/docs/nxz/api-access.md`
```

## Exemplo: interview-data.md (Step 02)

```markdown
# Dados da Entrevista de Configuração — ERPNext Nexuz

**Entrevistadora:** Ana Analista
**Data:** 2026-04-22
**Sponsor:** Walter Frey

## Bloco 1: Company
- Razão social: Nexuz Sistemas Inteligentes Ltda
- CNPJ: 12.345.678/0001-00 (a confirmar com Walter)
- Moeda default: BRL
- País: Brazil
- Abreviação (abbr) para autonaming: NEXUZ

## Bloco 2: Fiscal Year
- Início: 2026-01-01
- Fim: 2026-12-31
- Regime tributário: Lucro Presumido (custom field)

## Bloco 3: Chart of Accounts
- Base: usar template "Brazil - Default COA" OU importar CSV da Odoo atual
- Regime: Lucro Presumido
- ...

## Bloco 4: Master Data
- Item Groups: Software, Serviço, Hardware
- Customer Groups: FS Small, FS Enterprise, Franquia
- Supplier Groups: Gateway, Hardware, Infra
- Warehouses: Digital (default, não físico), Matriz Curitiba

## Bloco 5: Users & Roles
- Admin AI: email@nxz.ai (role "AI Team" customizada)
- Vendas: (TBD)
- Financeiro: (TBD)

## Bloco 6: Customizations
- Custom Field: Company.regime_tributario (Select)
- Custom Field: Customer.cnpj (Data com validação via Server Script)
- Workflow: Aprovação de Desconto >15% (Sales Order)

## Bloco 7: Integrations
- Webhook out: Sales Invoice submit → `https://hooks.nexuz.com.br/erpnext/invoice-paid`
- Server Script entrada: receber pedidos iFood
```

## Exemplo: erpnext-design-document.md (Step 06)

```markdown
# ERPNext Design Document (EDD) — Nexuz

## Arquitetura Geral
(Mermaid diagram: Company → módulos → customizations)

## Deltas vs. Entrevista
| Delta | Justificativa | Aprovado? |
|---|---|---|
| Custom Field Company.ramo_atividade | Útil para segmentação relatórios | ⚠️ pendente aprovação user |

## Layer 2: Company + Fiscal
### Company: Nexuz Sistemas Inteligentes Ltda
```json
{
  "doctype": "Company",
  "company_name": "Nexuz Sistemas Inteligentes Ltda",
  "abbr": "NEXUZ",
  "default_currency": "BRL",
  "country": "Brazil",
  "create_chart_of_accounts_based_on": "Standard Template",
  "chart_of_accounts": "Brazil - Default COA"
}
```

### Fiscal Year: 2026
...

## Layer 3: Chart of Accounts
...

## Layer 4: Master Data
...

## JSON Specs (para Step 08)
Referência: `squads/nxz-erpnext-setup/specs/`
- `01-company-fiscal.json`
- `02-coa-cost-centers.json`
- `03-uom-item-groups.json`
- `04-items.json`
- `05-customers-suppliers.json`
- `06-warehouses.json`
- `07-users-roles.json`
- `08-custom-fields.json`
- `09-workflows.json`
- `10-webhooks.json`
```

## Exemplo: configuration-log.md (Step 08)

```markdown
# Log de Configuração ERPNext

## Resumo
- Total de operações: X
- Sucesso: X, Falha: Y, Manual required: Z
- Skill usada: erpnext-integration v1.0.0

## `names` Criados (referência rápida)
| Doctype | name | Layer |
|---|---|---|
| Company | Nexuz Sistemas Inteligentes Ltda | 2 |
| Fiscal Year | 2026 | 2 |
| UOM | Unidade | 4 |
| Item Group | Software | 4 |
| Item | NXZ-ERP-MENSAL | 4 |
...

## Layer 0: Stack lifecycle
- [✅] `./nxz/up.sh` — containers healthy em 2026-04-22T10:00:00
- [✅] `gen-api-key.sh Administrator --save` — api_key carimbado em 10:02:15

## Layer 2: Company + Fiscal
- [✅] 10:05:00 POST /api/resource/Company → name="Nexuz Sistemas Inteligentes Ltda" (via REST)
- [✅] 10:05:01 POST /api/resource/Fiscal Year → name="2026" (via REST)
...
```
