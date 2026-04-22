# Dados da Entrevista de Configuração — ERPNext Nxz

**Entrevistadora:** Ana Analista (🎙️)
**Data:** 2026-04-22
**Run ID:** 2026-04-22-150201
**Escopo selecionado:** Núcleo (Stack + API + Company + Fiscal Year + COA)
**Sponsor/Respondente:** Walter Frey (Nexuz)

## Bloco 1 — Company

| Campo | Valor | Destino ERPNext |
|---|---|---|
| Razão social | **Nxz Sistemas Inteligentes Ltda** | `Company.company_name` |
| Abreviação (abbr) | **NXZ** | `Company.abbr` (usado em autonaming: NXZ-00001) |
| CNPJ | **placeholder `00.000.000/0001-00`** (user fornece real depois) | Custom Field `cnpj` em Company (a criar se Rita não achar módulo BR nativo) |
| Regime tributário | **Simples Nacional** | Custom Field `regime_tributario` em Company (ou equivalente do módulo BR, se existir) |
| Moeda default | **BRL** | `Company.default_currency` |
| País | **Brazil** | `Company.country` |

### Observações Bloco 1
- Razão social inclui **Nxz** (não "Nexuz") por decisão explícita do sponsor.
- Abbr `NXZ` alinha com prefixo dos produtos (NXZ Go, NXZ KDS, NXZ Delivery) e atende 3–6 letras.
- CNPJ será fornecido fora deste checkpoint e gravado via PUT no Company depois que o Custom Field for criado.

## Bloco 2 — Fiscal Year

| Campo | Valor | Destino ERPNext |
|---|---|---|
| Fiscal Year corrente | **2026-01-01 → 2026-12-31** | `Fiscal Year` com `is_default=1` e linked to Company NXZ |
| Fiscal Year anteriores | Não criar nesta run | — |

## Bloco 3 — Chart of Accounts

| Campo | Valor | Destino ERPNext |
|---|---|---|
| Abordagem | **Template `Brazil - Default COA`** | Passado em `Company.chart_of_accounts` na criação |
| Fallback | Se Rita confirmar que template BR não está disponível no ERPNext v16, Paulo propõe Standard + mapeamento BR manual | — |

## Pedidos de pesquisa (encaminhados para Rita no Step 04)

1. **Módulos de localização brasileira** disponíveis para Frappe/ERPNext v16 (ex: `brazilfiscal/erpnext_brazil`, `tiago-peczenyj/erpnext-brazil`, `l10n-brazil`) — avaliar se algum atende e se a stack `nxz-erpnext:v16` aceita instalação.
   - Pergunta-chave: algum app nativo modela CNPJ, regime tributário, PIS/COFINS/ICMS/ISS, NF-e, boleto?
2. **Template COA "Brazil - Default COA"** — confirmar se vem embarcado no ERPNext v16 ou se exige o app de localização.
3. **Impacto de instalar app BR** depois de criar Company — documentar se força migração destrutiva do COA existente.

## Customização (escopo definido em config-focus)

- Nível: **Liberal** — Paulo pode propor Custom Fields, Server Scripts, Webhooks à vontade; tudo vai ao checkpoint Step 07 antes da execução.
- Dentro do escopo Núcleo os Custom Fields prováveis são: `Company.cnpj`, `Company.regime_tributario`, `Company.inscricao_estadual`, `Company.inscricao_municipal`.

## Itens fora de escopo desta run (próximas)

- Master Data (UOM, Item Groups, Items, Customers/Groups, Suppliers, Warehouses)
- Users adicionais (Administrator é o único nesta run) + Role Profiles
- Workflows de aprovação
- POS Profile, Mode of Payment
- Webhooks de integração NXZ Go / KDS / Delivery
- Custom Doctypes (Mesa, Pedido Delivery, etc.)

## Quality Check (Veto Conditions)

- [x] Blocos 1–3 completos (escopo Núcleo cobre até bloco 3)
- [x] Todas as perguntas via AskUserQuestion com 2–4 opções
- [x] Nenhuma contradição com company.md (razão social explicitada diferente mas intencionalmente escolhida pelo sponsor)
- [x] Dados sensíveis (CNPJ, razão social, moeda, fiscal year) reconfirmados
- [x] Jargão ERPNext traduzido nas perguntas
