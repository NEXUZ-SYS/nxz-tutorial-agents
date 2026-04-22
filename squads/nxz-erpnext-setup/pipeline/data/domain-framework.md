# Domain Framework — ERPNext para Food Service (Nexuz)

## Contexto de domínio

A Nexuz é empresa SaaS de tecnologia para Food Service (FS) que opera hoje
com ERP baseado em Odoo 12. Esta squad configura ERPNext (Frappe v16) como
**base alternativa de teste** para avaliar viabilidade de migração ou
coexistência. O fork `github.com/NEXUZ-SYS/frappe_docker` expõe a stack via
HTTP local (documentado em `frappe_docker/docs/nxz/`). Esta squad
configura a camada de negócio em cima da stack.

## Mapeamento Nexuz → ERPNext

### Estrutura principal

| Conceito Nexuz | ERPNext Doctype | Notas |
|---|---|---|
| Empresa (Nexuz Sistemas Inteligentes Ltda) | Company | 1 registro por organização legal; moeda default BRL |
| Ano fiscal | Fiscal Year | Ex: 2026-01-01 a 2026-12-31 |
| Plano de contas | Chart of Accounts (Account doctype) | Hierarquia via `parent_account` |
| Tipos de imposto | Account (is_group=false, account_type="Tax") | PIS, COFINS, ICMS, ISS |
| Centro de custo | Cost Center | Hierarquia via `parent_cost_center` |
| Almoxarifado/estoque | Warehouse | Hierarquia (Main → Matriz → Filial) |
| Grupos de produtos | Item Group | Ex: Matéria-prima, Revenda, Serviço |
| Produtos/serviços | Item | Com UOM, stock_uom, item_group, is_stock_item |
| Unidades de medida | UOM | Ex: Kg, L, Unidade, Porção |
| Cliente PF/PJ | Customer | + Customer Group (Varejo, Atacado, Franquia) |
| Fornecedor | Supplier | + Supplier Group |
| Colaborador | Employee | Via módulo HR |
| Projeto de implantação | Project | Via módulo Projects |
| Formas de pagamento | Mode of Payment | Stone, Cielo, PagSeguro, SumUp, iFood, Rappi, PIX, Boleto |
| Ponto de venda/PDV | POS Profile | Vincula Warehouse, Mode of Payment, Item Group |
| Usuários sistema | User | + Role Profile, User Permission |
| Papéis de acesso | Role | Ex: "Vendedor", "Caixa", "Gestor", "AI Team" |
| Fluxos de aprovação | Workflow + Workflow State + Workflow Action | Ex: aprovação de desconto >15% |
| Extensões sem fork | Custom Field + Custom Doctype | Em vez de alterar core |
| Validações custom | Server Script (type=DocType Event) | JavaScript/Python server-side |
| Integração externa | Webhook + Server Script (type=API) | Webhook para POST, Server Script para receber |

### Módulos ERPNext instalados no site por default

```
erpnext   (Accounting, Stock, Selling, Buying, Projects, HR, Manufacturing)
crm       (Lead, Opportunity, Deal, Contact, Organization) — requires payments
lms       (Learning Management)
builder   (No-code page builder)
payments  (dependência do crm — integração com gateways)
```

**Módulos ERPNext nativos potencialmente úteis para Food Service:**
- **Accounting** — COA, fiscal year, payment entries
- **Stock** — Warehouse, Item, Stock Entry, Bin
- **Selling** — Customer, Quotation, Sales Order, Sales Invoice
- **Buying** — Supplier, Purchase Order, Purchase Receipt
- **POS** — POS Profile, POS Invoice (pode ser base para NXZ Go)
- **Projects** — Project, Task (para implantação de clientes)
- **HR** — Employee, Shift Type (para equipe do restaurante)

## Regras de negócio críticas a considerar

### Fiscais (Brasil)
1. **CNPJ único por Company**: ERPNext não valida CNPJ nativo — precisa Custom Field + Server Script de validação
2. **NF-e/NFC-e**: ERPNext core não tem — precisa app externo (ex: `brazilfiscal/erpnext_brazil`) ou integração com emissor (Migrate, Nuvem Fiscal)
3. **Impostos BR** (PIS/COFINS/ICMS/ISS): modelar como `Tax Template` + `Item Tax`
4. **Regime tributário** (Simples Nacional / Lucro Presumido / Real): Custom Field na Company

### Food Service específicos
1. **Item com múltiplos UOMs** (ex: cerveja comprada em caixa, vendida em unidade): `UOM Conversion Detail` no Item
2. **Receitas/fichas técnicas** (BOM — Bill of Materials): `Item` com `Bundle` ou módulo Manufacturing
3. **Estoque por lote/validade**: `Item.has_batch_no=1` + `Item.has_expiry_date=1`
4. **Mesa/comanda** (se integrar com POS NXZ Go): Custom Doctype `Mesa` com Link para POS Invoice
5. **Integração iFood/Rappi**: Webhooks de entrada + Custom Doctype `Pedido Delivery` mapeando canal → Sales Order

## Camadas de configuração (referência para EDD)

| Layer | Nome | Doctypes principais | Interface |
|---|---|---|---|
| 0 | Stack lifecycle | — | bench via docker exec |
| 1 | API access + users | User, Role, API Key | REST + gen-api-key.sh |
| 2 | Company + Fiscal | Company, Fiscal Year, Currency | REST API |
| 3 | Chart of Accounts | Account, Cost Center | REST API |
| 4 | Master data | UOM, Item Group, Item, Customer Group, Customer, Supplier Group, Supplier, Warehouse | REST API |
| 5 | Customizations | Custom Doctype, Custom Field, Property Setter | REST API |
| 6 | Workflows + Rules | Workflow, Workflow State, Workflow Action, Server Script | REST API |
| 7 | Integrations | Webhook, Server Script (API), Event Streaming | REST API |

## Personas dos usuários

| Papel | Pessoa | Uso principal |
|---|---|---|
| Admin/AI Team | Walter + time AI interno | Lifecycle stack, API keys, auditoria técnica |
| Contábil/Financeiro | TBD via entrevista | COA, launches, conciliação |
| Vendedor/Ops PDV | TBD | Usar interface ERPNext + NXZ Go integrado |
| Gestor estabelecimento | TBD | Relatórios, dashboards |
| Integrador AI | Time AI | Consome REST API para plugar apps Nexuz próprios |
