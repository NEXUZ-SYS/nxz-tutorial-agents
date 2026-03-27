# Research Brief — ClickUp Implementation for Nexuz

## Scope
Implantação completa do ClickUp como ferramenta principal de gestão de processos da Nexuz,
cobrindo 6 departamentos: Marketing, Vendas, Financeiro/Backoffice, Desenvolvimento, Suporte, CS.
Inclui setup de OKRs linkados à execução.

## Key Findings

### 1. Arquitetura de Workspace
- **Um Workspace por organização** — nunca criar múltiplos workspaces (billing separado, usuários duplicados)
- **Spaces por departamento** — cada área (Marketing, Vendas, etc.) deve ter seu próprio Space
- **Folders para projetos** — dentro do Space, Folders agrupam projetos relacionados
- **Lists para tarefas** — cada projeto/processo vira uma List com tarefas específicas
- **Evitar overengineering** — não ativar todas as Views, só as necessárias por Space
- **Auditorias regulares** — revisar hierarquia periodicamente para manter aderência ao negócio

Sources:
- [Hierarchy best practices – ClickUp Help](https://help.clickup.com/hc/en-us/articles/20480724378135)
- [Intro to the Hierarchy – ClickUp Help](https://help.clickup.com/hc/en-us/articles/13856392825367)
- [ClickUp Hierarchy Guide](https://clickup.com/hierarchy-guide)
- [ProcessDriven: 7 Setup Mistakes](https://processdriven.co/hub/7-clickup-setup-mistakes-how-to-fix-them)

### 2. OKRs no ClickUp
- **Um Space dedicado para Goals/OKRs** — centraliza accountability e transparência
- **Folders por nível**: Company-wide, Departamental, Trimestral
- **Tasks = Objectives, Subtasks = Key Results** — customizar campo "Targets" como "Key Results"
- **3-5 Key Results por Objective** — menos gera tracking raso, mais perde foco
- **Target types**: Number, True/False, Currency, Percentage — escolher por métrica
- **Color-coding por departamento** — cores distinguem áreas nos dashboards
- **Task Relationships** — linkam OKRs de time a OKRs de empresa para roll-up automático
- **Dashboards para tracking visual** — List view + Gantt view + Dashboards customizados
- **Check-ins regulares** — atualizar progresso semanalmente, review bi-semanal/mensal

Sources:
- [Use ClickUp to track goals and OKRs](https://help.clickup.com/hc/en-us/articles/6327987972119)
- [Organize your Hierarchy for goals and OKRs](https://help.clickup.com/hc/en-us/articles/30806266190103)
- [ClickUp OKR Tracking Playbook](https://clickup.com/blog/okr-tracking-playbook/)
- [Mooncamp: ClickUp Goals for OKRs](https://mooncamp.com/blog/clickup-okrs)

### 3. Workflows por Departamento
- **Marketing**: Campanhas, calendário editorial, produção de conteúdo, aprovações
- **Vendas**: Pipeline CRM, qualificação de leads, follow-ups, forecasting
- **Financeiro/Backoffice**: Contas a pagar/receber, aprovações, compliance, reconciliação
- **Desenvolvimento**: Sprints, backlog, bug tracking, releases, code review
- **Suporte**: Tickets, SLAs, escalation, knowledge base
- **CS**: Onboarding de clientes, health score, renewals, churn prevention

### 4. Automações e Custom Fields
- **Triggers**: mudança de status, assignee, custom field, checklist completo, subtasks resolvidas
- **Actions**: assign task, post comment, change status, move to list, send email
- **Conditions**: filtram quais tasks ativam a automação
- **100+ templates** de automação pré-configurados no ClickUp
- **Custom Field Types**: Dropdown, Labels, Number, Currency, Formula, Rollup, Date, Checkbox, Rating
- **Automação por nível**: podem ser aplicadas em Space, Folder ou List

Sources:
- [Use Automation Triggers – ClickUp Help](https://help.clickup.com/hc/en-us/articles/6312128853015)
- [Use Automation Actions – ClickUp Help](https://help.clickup.com/hc/en-us/articles/6312097314199)
- [ClickUp Automation Examples](https://clickup.com/blog/automation-examples/)

## Common Mistakes
1. Criar múltiplos Workspaces em vez de um só
2. Overcomplicar hierarquia com muitos Spaces/Folders/Lists desnecessários
3. Ativar todas as Views em vez de só as necessárias
4. Aplicar settings em nível alto demais (Space) quando deveria ser em List
5. OKRs sem key results suficientes (menos de 3)
6. Não definir threshold de sucesso para stretch goals (70% = bom)
7. Escrever Objectives como mission statements vagos
8. Não atualizar progresso regularmente

## Gaps
- Não encontradas best practices específicas para Food Service/SaaS no ClickUp
- Documentação de automações avançadas (webhook, API) requer exploração adicional
- Templates específicos por indústria são limitados na documentação oficial
