# Pesquisa ClickUp — Departamento Vendas

## Departamento: Vendas

### Funcionalidades Recomendadas

| Funcionalidade | Descrição | Plano | Confiança | Fonte |
|---|---|---|---|---|
| Custom Statuses por Lista | Permite as 9 etapas do funil NXZ como statuses dedicados (Qualificado → Perdido) | Unlimited+ | Alta | help.clickup.com/29610943320471 |
| Custom Fields (Money, Dropdown, Formula, Relationship) | Tipagem para Lead Score, MRR, Canal, vínculo Contato↔Conta↔Deal | Free (limites) / Unlimited (uso pleno) | Alta | help.clickup.com/6303499162647 |
| Email ClickApp | Envia emails do task ao lead (templates + signatures) | Free 100 usos / Unlimited ilimitado / Business 2 contas + templates | Alta | help.clickup.com/6303747270807 |
| Automations (status, time-in-status, custom field, scheduled) | 17 regras do funil NXZ podem ser mapeadas a triggers nativos | Unlimited (50 usos/mês) / Business (10k) / Business Plus (25k) | Alta | help.clickup.com/6312102752791, /23477062949911 |
| Dashboards + Calculation Cards | Soma de MRR, pipeline value, count de deals | Unlimited+ | Alta | help.clickup.com/21928345433879 |
| Goals com Targets numéricos / monetários | Quotas mensais, MRR target, número de demos | Free Forever (limitado) / Unlimited+ (sem limite) | Alta | help.clickup.com/6325733579671 |
| Relationship Custom Field | Liga Contato → Conta → Deal → Implantação | Unlimited+ | Alta | help.clickup.com/17650012803735 |
| Google Calendar 2-way sync | Demos sincronizadas com agendas dos vendedores | Todos os planos | Alta | help.clickup.com/6336507264663 |
| Time in Status (Condition) | Trigger scheduled + condition "time in status > X" para SLA por etapa | Business+ | Média | help.clickup.com/6312136485527 |
| Custom Email Permissions (Send Email) | Controle de quem dispara email do workspace | Business Plus / Enterprise | Alta | help.clickup.com/6303747270807 |

### Workflow Sugerido

**Statuses (validação das 9 do Funil NXZ v1.0):**
Conforme documentação oficial de "Create statuses for CRM" (help.clickup.com/29610943320471), os 9 statuses são todos válidos como Custom Statuses em uma Lista. Recomendação baseada em best practices ClickUp:

1. `Qualificado` (tipo: Open / cor azul)
2. `Primeiro contato` (Active)
3. `Agendamento` (Active)
4. `Apresentação` (Active)
5. `Proposta enviada` (Active)
6. `Fechamento` (Active)
7. `Live` (Closed — Won) — ClickUp recomenda separar Won/Lost em status Closed para que dashboards calculem win rate corretamente
8. `Nutrição` (Active — paralelo) — alternativa: criar uma **List separada "Nutrição"** com Automation `status changed to Nutrição → move task to Nutrição list`, evita poluir Board principal
9. `Perdido` (Closed — Lost)

**Ajuste recomendado (confiança alta):** marcar `Live` e `Perdido` como tipo "Closed" no ClickUp; isso habilita widgets nativos de win/loss rate em dashboards sem fórmula manual.

**Custom Fields (tipos ClickUp explícitos):**

| Campo NXZ | Tipo ClickUp | Observação |
|---|---|---|
| Lead Score | `Rating` (estrelas 1-5) ou `Number` (0-100) | Rating facilita visual; Number permite cálculo em Formula |
| Canal | `Dropdown` | Opções: Inbound, Outbound, Indicação, Evento, Parceiro |
| Reason to Call | `Label` (multi-select) ou `Text` | Label permite filtrar por motivo |
| Faturamento estimado | `Money` (BRL) | Calculation card pode somar |
| Decisores | `People` (multi) + `Text` (cargo) | People para usuários do workspace; Text para externos |
| Data demo | `Date` (com hora) | Alimenta Calendar view |
| Aceite verbal | `Checkbox` | Trigger para automation de envio de proposta |
| Aceite proposta | `Checkbox` | Trigger para mover a Fechamento |
| MRR | `Money` (BRL) | Soma em dashboard |
| Motivo perda | `Dropdown` | Opções: Preço, Timing, Concorrente, Sem fit, Sem retorno |
| Próxima revisão (Nutrição) | `Date` | Trigger scheduled para automation |
| ICP | `Dropdown` | Opções: QS, FS |
| Produto interesse | `Label` (multi) | NXZ ERP, NXZ Go, NXZ KDS, NXZ Delivery |
| Probabilidade fechamento | `Number` (%) | Usado em Formula `MRR * Prob` = forecast ponderado |
| Forecast ponderado | `Formula` | `field("MRR") * field("Probabilidade") / 100` |
| Conta (Account) | `Relationship` → List "Contas" | Liga lead à conta corporativa |
| Implantação relacionada | `Relationship` → List "Onboarding" (Matheus/Luiz) | Cria handoff Vendas → CS |

**Folder structure sugerida** (conforme help.clickup.com/17649910036887 "Organize your Hierarchy for CRM"):

```
Space: Vendas (Nexuz)
├── Folder: CRM
│   ├── List: Leads & Deals (statuses do funil — Lista principal)
│   ├── List: Contas (companies)
│   ├── List: Contatos (people)
│   └── List: Nutrição (cadência longa, próxima revisão)
├── Folder: Operações de Vendas
│   ├── List: Onboarding/Implantação (handoff)
│   └── List: Playbooks & Templates
└── Folder: Métricas
    └── (Goals + Dashboards vivem fora de Folder, mas referenciam estas Lists)
```

### Automações Recomendadas

Mapeamento das 17 automações do Funil NXZ v1.0 para triggers nativos ClickUp (conforme help.clickup.com/6312128853015 e /6312097314199):

1. **Trigger:** Status changes to `Qualificado` → **Action:** Assign to "SDR de plantão" + Post comment `@SDR Novo lead — confirmar Lead Score em 24h`
2. **Trigger:** Status `Primeiro contato` AND scheduled (daily 9h) AND condition `Time in Status > 48h` → **Action:** Send email template "Reengajamento contato" + Notify owner
3. **Trigger:** Custom Field `Aceite verbal` checked → **Action:** Change status to `Proposta enviada` + Send email template "Proposta NXZ"
4. **Trigger:** Status changes to `Agendamento` → **Action:** Create subtask "Confirmar demo D-1" with due date = `Data demo - 1d`
5. **Trigger:** Custom Field `Data demo` set → **Action:** Send email "Confirmação demo" to Email field + Add comment com link Google Meet
6. **Trigger:** Status `Apresentação` AND `Time in Status > 72h` → **Action:** Notify Sales Manager via comment + email template follow-up
7. **Trigger:** Status changes to `Proposta enviada` → **Action:** Set due date to today+7d + Send email template proposta
8. **Trigger:** Status `Proposta enviada` AND `Time in Status > 5d` → **Action:** Send email "Reforço proposta" + assign comment para vendedor
9. **Trigger:** Custom Field `Aceite proposta` checked → **Action:** Change status to `Fechamento` + Notify Financeiro
10. **Trigger:** Status changes to `Fechamento` → **Action:** Create task in List "Onboarding" (handoff Matheus/Luiz) via Relationship + Send email "Boas-vindas Nexuz"
11. **Trigger:** Status changes to `Live` → **Action:** Set custom field `Data Live = today` + Send email NPS D+30 (scheduled) + Add to Dashboard MRR
12. **Trigger:** Status changes to `Nutrição` → **Action:** Move task to List `Nutrição` + Set `Próxima revisão = today + 30d`
13. **Trigger:** Scheduled daily AND Custom Field `Próxima revisão = today` → **Action:** Notify owner + Send email cadência nutrição
14. **Trigger:** Status changes to `Perdido` → **Action:** Require Custom Field `Motivo perda` (validation via comment if empty) + Archive after 90d
15. **Trigger:** Custom Field `Lead Score >= 80` → **Action:** Add tag `hot-lead` + Notify Sales Manager
16. **Trigger:** Form submission (lead inbound) → **Action:** Create task in `Leads & Deals` with status `Qualificado` + auto-assign round-robin
17. **Trigger:** Status changes (any → next stage) → **Action:** Comment com checklist da etapa (playbook) + start time tracking

> **Nota técnica:** "Time in Status" hoje existe como **Condition** (não trigger nativo). Implementação: criar um **Scheduled Trigger** (daily) com Condition `Time in status > X horas`. Conforme feedback.clickup.com/p/time-in-status-trigger, o trigger nativo está em desenvolvimento.

### Views Otimizadas

1. **Pipeline (Board view)** — Group by Status, swimlane por `Lead Score` (alto/médio/baixo via filtro). Conforme help.clickup.com/17649952462487, Board é o padrão CRM.
2. **Lista da Semana (List view)** — Filter `Lead Score >= 70` AND `Status != Live AND != Perdido`, sort by `Data demo asc`, group by Assignee.
3. **Demos (Calendar view)** — Source: Custom Field `Data demo`, color-code por Status. 2-way sync com Google Calendar do vendedor.
4. **Revisão Nutrição (List view)** — Filter `Status = Nutrição` AND `Próxima revisão <= today + 7d`, sort por Próxima revisão.
5. **Dashboard MRR (Dashboard)** — Calculation cards: SUM `MRR` (Live), SUM `Forecast ponderado` (não-Live), COUNT por Status (funnel widget), conversion rate via Formula card.
6. **Leads Perdidos (List view)** — Filter `Status = Perdido`, group by `Motivo perda`, para análise pós-mortem mensal.

### OKRs Sugeridos

**Objective Q2 2026:** Estabelecer máquina de vendas previsível para NXZ Go e NXZ ERP no mercado Food Service.

**Key Results (configurar como Goals com Targets em ClickUp — help.clickup.com/6325733579671):**

- **KR1 — MRR target:** Atingir R$ 80.000 de novo MRR no trimestre (Target type: `Currency`, source: SUM custom field MRR onde Status=Live AND Data Live no Q2)
- **KR2 — Volume top-funnel:** Qualificar 120 leads com Score ≥ 70 (Target type: `Number`, source: count de tasks com filtro)
- **KR3 — Conversão demo→proposta:** Manter taxa ≥ 45% (Target type: `Number/Percentage`, manual update mensal ou via Formula)
- **KR4 — Velocidade do ciclo:** Reduzir tempo médio Qualificado→Live para ≤ 35 dias (Target type: `Number`, fonte: Time in Status agregado)
- **KR5 — Win rate:** Atingir 25% (Closed Won / Closed total) (Target type: `Number/Percentage`)

> Conforme docs ClickUp, Targets podem ser do tipo Number, True/False, Currency ou Task. Goals com hierarquia de subgoals requerem **Unlimited+**; Folders de Goals para organização requerem **Business+**.

### Integrações Relevantes

| Integração | Uso | Confiança | Fonte |
|---|---|---|---|
| Google Calendar (nativa, 2-way) | Sync demos do Calendar view; disponível em todos os planos | Alta | help.clickup.com/6336507264663 |
| Outlook Calendar (nativa, 1-way) | Sync apenas leitura; para 2-way usar GCal como ponte | Alta | help.clickup.com/30618267005975 |
| Email ClickApp (Gmail/Outlook IMAP/SMTP via accounts) | Conta de email anexada ao workspace para enviar do task | Alta | help.clickup.com/6303747270807 |
| Webhook → Odoo (skioba CRM) | Disparar criação de oportunidade Odoo quando status=Fechamento; usar Automation action "Call webhook" | Média (depende endpoint Odoo) | help.clickup.com/6312097314199 |
| Zapier/Make → Odoo | Alternativa low-code se webhook direto não atender (assinatura digital, sale.order) | Alta | clickup.com integrations |
| Google Drive (nativa) | Anexar propostas ao task; ClickApp Drive | Alta | help.clickup.com (Drive integration) |
| Forms (nativo ClickUp) | Captura de leads inbound do site; cria task com status Qualificado | Alta (Unlimited+) | help.clickup.com (Forms) |

### Gaps / Limitações Técnicas

Conforme limitações conhecidas validadas no run anterior e na documentação oficial:

1. **API v2 não cria/edita Custom Fields nem Custom Statuses.** Conforme feedback.clickup.com/public-api/p/custom-field-creation-via-api, a API permite apenas ler e setar valores; criação de campos e statuses é exclusivamente via UI. **Mitigação:** Playwright/MCP browser para automatizar configuração inicial — validado no run anterior.
2. **API v2 não altera tipos de status nem cria custom statuses programaticamente.** Mesma limitação acima — Spaces até podem ser criados via API, mas custom statuses devem ser configurados via UI.
3. **MCP-clickup não cria Spaces com custom statuses pré-definidos.** Limitação observada no run anterior; Folders e Lists sim, statuses não.
4. **"Time in Status" é Condition, não Trigger nativo.** Requer Scheduled Trigger + Condition combinados. Trigger dedicado está em roadmap (feedback.clickup.com/p/time-in-status-trigger).
5. **Email automation tem limites por plano:** Free 100 emails/conta, Unlimited 1 conta ilimitada, Business 2 contas. Custom permissions de "Send Email" requerem **Business Plus+**.
6. **Automations têm limite mensal por plano:** Unlimited 1.000/mês por Workspace, Business 10.000, Business Plus 25.000, Enterprise 250.000 (help.clickup.com/23477062949911). Com 17 automações ativas + alto volume de leads, pode estourar Unlimited.
7. **Outlook Calendar é 1-way apenas.** Para 2-way usar GCal como ponte intermediária (workaround documentado).
8. **Voting Custom Field não pode ser setado via API** (não relevante para CRM, mas limitação geral).
9. **Update de múltiplos custom fields requer chamadas individuais** ao endpoint Set Custom Field Value — pode impactar performance em sync em massa com Odoo.
10. **Goals: Folders de Goals e Goals com subgoals requerem Business+.** Free permite apenas 100 Goals; Unlimited remove limite mas não habilita subgoals organizados.

## Sources

Acessadas em 2026-04-13:

- https://help.clickup.com/hc/en-us/articles/6328220946583-Use-ClickUp-for-CRM
- https://help.clickup.com/hc/en-us/articles/17649910036887-Organize-your-Hierarchy-for-CRM
- https://help.clickup.com/hc/en-us/articles/17650012803735-Use-Custom-Fields-for-CRM
- https://help.clickup.com/hc/en-us/sections/17649878639255-ClickUp-for-CRM
- https://help.clickup.com/hc/en-us/articles/29610943320471-Create-statuses-for-CRM
- https://help.clickup.com/hc/en-us/articles/17650021555479-Use-ClickApps-for-CRM
- https://help.clickup.com/hc/en-us/articles/17649952462487-Use-views-for-CRM
- https://help.clickup.com/hc/en-us/articles/29611127407639-Automations-for-CRM
- https://help.clickup.com/hc/en-us/articles/6303499162647-Custom-Field-types
- https://help.clickup.com/hc/en-us/articles/6303536766231-Intro-to-Custom-Fields
- https://help.clickup.com/hc/en-us/articles/30494683858071-Create-a-Formula-Field
- https://help.clickup.com/hc/en-us/articles/6308656424983-Intro-to-Formula-Fields
- https://help.clickup.com/hc/en-us/articles/6312083386903-Create-an-email-Automation
- https://help.clickup.com/hc/en-us/articles/6303747270807-Use-Email-in-ClickUp
- https://help.clickup.com/hc/en-us/articles/6312102752791-Intro-to-Automations
- https://help.clickup.com/hc/en-us/articles/30241682127127-Create-an-Automation
- https://help.clickup.com/hc/en-us/articles/23477062949911-Automations-feature-availability-and-limits
- https://help.clickup.com/hc/en-us/articles/6312128853015-Use-Automation-Triggers
- https://help.clickup.com/hc/en-us/articles/6312097314199-Use-Automation-Actions
- https://help.clickup.com/hc/en-us/articles/6312136485527-Use-Automation-Conditions
- https://help.clickup.com/hc/en-us/articles/6312119071383-Manage-Automations
- https://help.clickup.com/hc/en-us/articles/35446142759575-Use-Custom-Fields-in-Automations
- https://help.clickup.com/hc/en-us/articles/21928345433879-Calculation-cards
- https://help.clickup.com/hc/en-us/articles/6312164195095-Custom-cards
- https://help.clickup.com/hc/en-us/articles/6327987972119-Use-ClickUp-to-track-goals-and-OKRs
- https://help.clickup.com/hc/en-us/articles/6325733579671-Create-a-Goal
- https://help.clickup.com/hc/en-us/sections/30808122161815-ClickUp-for-goals-and-OKRs
- https://help.clickup.com/hc/en-us/articles/6336507264663-Google-Calendar-integration
- https://help.clickup.com/hc/en-us/articles/30618267005975-Outlook-Calendar-integration
- https://help.clickup.com/hc/en-us/sections/6131948315799-Calendar-integrations
- https://developer.clickup.com/docs/customfields
- https://developer.clickup.com/reference/setcustomfieldvalue
- https://developer.clickup.com/docs/tasks
- https://feedback.clickup.com/public-api/p/custom-field-creation-via-api
- https://feedback.clickup.com/feature-requests/p/time-in-status-trigger
- https://clickup.com/blog/automation-examples/
- https://clickup.com/blog/sales-okrs/
- https://clickup.com/blog/feature-custom-fields/
- https://clickup.com/blog/new-feature-email-clickup/
