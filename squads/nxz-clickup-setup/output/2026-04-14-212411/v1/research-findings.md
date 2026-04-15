# Pesquisa ClickUp — Departamento Desenvolvimento/Produtos (Nexuz)

_Data de acesso das fontes: 2026-04-14_
_Pesquisadora: Duda Documentação — squad nxz-clickup-setup_

## Sumário executivo

- **Sprints ClickApp é nativo em todos os planos**, mas Sprint Automations, Sprint Dashboard cards e Sprint Points ilimitados exigem **Business plan ou superior** (Free/Unlimited têm limite de 100 usos de Sprint Points). Confiança: alta.
- **GitHub e GitLab são integrações nativas e gratuitas em todos os planos**, associando automaticamente commits/PRs/MRs/branches a tasks via ID do ClickUp na mensagem. Confiança: alta.
- **Formula Field `DAYS(TODAY(), field("Date created"))`** resolve o cálculo de Age, mas existe uma limitação crítica: Formula Fields que usam `TODAY()` **não podem ser usados em Automations, filtros, sort, group nem Dashboard Calculation cards**. Isso inviabiliza o disparo direto da regra "Age ≥ 90 → tag" — exige workaround (ver §7 e §10).
- **Automation Conditions exigem Business plan ou superior** — impacta regras como "Status=In Review → notifica líder" quando se quer filtrar por campos adicionais.
- **API do ClickUp tem limitação conhecida** para gestão programática de custom statuses e para disparo de automações baseadas em `TODAY()`; configurações estruturais devem ser feitas via UI (ver gaps em §10).

---

## 1. Sprint Management (Sprint Folders)

### Funcionalidade
Sprint Folders são uma variante especial de Folder que, quando a ClickApp Sprints está ativa, oferecem: datas de sprint automáticas, auto-criação do próximo sprint, rollover de tasks incompletas, Sprint Points e Sprint Status (unstarted / in progress / complete). Cada Sprint dentro do Folder é uma **List** com tasks.

### Como configurar cadência semanal
1. Ativar a **Sprints ClickApp** em Settings → ClickApps.
2. Workspace → Settings → **Sprint Folder default settings**: definir Sprint Duration = **1 week** (padrão é 2 weeks; é customizável por Workspace e por Folder).
3. Ao criar o Sprint Folder ("Sprints - Produto"), sobrescrever a duração se necessário. O ClickUp cria automaticamente os sprints subsequentes conforme a cadência.
4. Habilitar **Automatically start the next Sprint** e **Move unfinished tasks to next Sprint** nas settings do Folder.

### Capacity Planning + split 20/80
- **Sprint Points ClickApp** (dropdown numérico por task) permite somar pontos por assignee e ver capacidade total no Sprint.
- **O split 20% bugs / 80% features/inovação não é um recurso nativo.** Recomendação baseada em docs oficiais + blog ClickUp: usar **Custom Field "Tipo"** (Dropdown: Bug/Feature/Inovação/Débito Técnico) e criar um **Dashboard card** agrupando pontos por Tipo no Sprint atual; alertar visualmente quando Bugs ultrapassarem 20% da soma. Alternativa: Dashboard Pie/Bar chart com Story Points agrupados por Tipo.

### Requer plano
- Sprints ClickApp básico: **todos os planos** (incluindo Free).
- **Sprint Automations + Sprint Dashboard cards: Business plan+**.
- Sprint Points ilimitados: Business+ (Free/Unlimited = 100 usos).

### Confiança: alta

### Fontes
- https://help.clickup.com/hc/en-us/articles/6303974210071-Intro-to-Sprints
- https://help.clickup.com/hc/en-us/articles/35715405307415-Customize-settings-for-each-Sprint-Folder
- https://help.clickup.com/hc/en-us/articles/35715191301399-Configure-your-default-settings-for-Sprint-Folders
- https://help.clickup.com/hc/en-us/articles/6303883602327-Use-Sprint-Points
- https://help.clickup.com/hc/en-us/articles/35714017592471-Sprints-feature-availability-and-limits
- https://help.clickup.com/hc/en-us/articles/21362742005399-Activate-the-Sprints-ClickApp
- https://help.clickup.com/hc/en-us/articles/6328184839831-How-to-set-up-an-Agile-Scrum-Workflow-in-ClickUp

---

## 2. OKRs / Goals nativo

### Como criar Goals
Goals é um módulo separado da Hierarchy (Sidebar → Goals). Cada Goal tem:
- Nome, descrição, owner, período (start/end date)
- **Targets** (antigo "Key Results") — quebras mensuráveis do Goal. Tipos suportados: **Number**, **Currency**, **True/False**, **Task**, **List of tasks**.
- Folders de Goals para agrupar por equipe/departamento.

Recomendação Nexuz: criar Folder de Goals "Desenvolvimento - 2026Q2" agrupando Goals do departamento; cada KR = um Target.

### Como vincular Goals a Tasks/Sprints
Três mecanismos oficiais:
1. **Target do tipo "Task" ou "List of tasks"**: o Target é automaticamente atualizado quando as tasks são concluídas. Uso ideal para KRs mensuráveis por delivery.
2. **Target "Number"** atualizado manualmente ou via API para KRs métricas.
3. **Custom Field de Relationship "KR vinculada"** na List de tasks, apontando para tasks-espelho do Goal (workaround quando o KR não é Task-based).

### Limitações conhecidas
- A API do ClickUp tem **cobertura parcial** para Goals: é possível criar/ler Goals e Targets via API, mas campos como progresso rollup e histórico têm suporte limitado. Operações estruturais complexas ainda exigem UI.
- Goals ficam em hierarquia separada de Spaces/Folders — **não é possível filtrar tasks por Goal diretamente** em uma view de List; usa-se Relationship field como proxy.
- Nem todos os tipos de Target aparecem em todos os views (Gantt de Goals tem subset).

### Requer plano
Goals disponível em todos os planos pagos. **Free: limitado a 100 usos de Goals**. Unlimited+: ilimitado.

### Confiança: alta

### Fontes
- https://help.clickup.com/hc/en-us/articles/6327987972119-Use-ClickUp-to-track-goals-and-OKRs
- https://help.clickup.com/hc/en-us/articles/6325733579671-Create-a-Goal
- https://help.clickup.com/hc/en-us/sections/30808122161815-ClickUp-for-goals-and-OKRs
- https://help.clickup.com/hc/en-us/articles/30806266190103-Organize-your-Hierarchy-for-goals-and-OKRs
- https://help.clickup.com/hc/en-us/articles/30807756167447-Use-views-for-goals-and-OKRs
- https://clickup.com/features/goals

---

## 3. Daily Standups como Lista

### Templates recomendados
ClickUp oferece templates prontos:
- **Daily Standup Meeting Template** (List-based): statuses por membro, campos Blockers/Goals/Announcements.
- **Stand Up Meeting Agenda** (Doc-based).

Recomendação Nexuz: usar o template List-based, clonando como List "Daily Standup" dentro da Space Desenvolvimento.

### Task template com campos Progresso/Tarefa/Bloqueios
Criar **Task Template** com:
- Nome: "Daily [Membro] - [Data]"
- Custom Fields na List:
  - **Progresso da sprint** (Text longo ou Dropdown %)
  - **Tarefa atual** (Relationship apontando para a List da Sprint ativa)
  - **Bloqueios** (Text longo)
  - **Status**: To Do → Done

### Automação "auto-criar daily por membro"
Opções nativas:
1. **Recurring Tasks**: configurar task recorrente diária para cada membro (UI da própria task → Recurring → Daily, Mon-Fri). Método mais simples e confiável. Confiança: alta.
2. **Automation "Sprint criada → criar daily tasks"**: usando trigger Sprints ("When Sprint is created") + action "Create task" repetida por membro. Exige Business+.
3. **ClickUp Brain / Autopilot Agents** (AI): Daily Report e Team Stand-Up agents que coletam updates automaticamente das tasks do dev — alternativa moderna à List dedicada, mas requer ClickUp Brain add-on.

### Fontes
- https://clickup.com/templates/daily-standup-meeting-t-206515719
- https://clickup.com/templates/meeting-agenda/daily-standup
- https://help.clickup.com/hc/en-us/articles/20011540694551-Use-ClickUp-AI-to-write-a-StandUp-or-team-updates
- https://clickup.com/p/project-management-software/daily-standup-automation
- https://clickup.com/blog/stand-up-meetings/

### Confiança: média-alta (o mecanismo "auto-criar daily por Sprint" tem variações dependendo do plano)

---

## 4. Views — Gantt, Kanban, List, filtered views

### Como criar cada view
Em qualquer List, Folder ou Space: **+ View** → escolher tipo.

- **Gantt view**: timeline com dependências visuais, critical path, zoom (day/week/month/year). Recomendação Nexuz: aplicar ao Sprint Folder para ver timeline de sprints.
- **Board (Kanban)** view: colunas = Custom Statuses. Agrupar por "Status" (default) ou por assignee, prioridade, custom field.
- **List view**: tabular com grouping configurável; ideal para backlog.
- **View "Bugs"**: duplicar List view, aplicar filtro `Tipo = Bug`, salvar como "Bugs".
- **View ">90 dias"**: List view com filtro no Formula Field Age `≥ 90`. **Atenção**: Formula Fields com `TODAY()` **não podem ser filtrados nativamente** (§5). Workaround: criar Number field "Age_static" atualizado diariamente por Automation (com data de referência), ou filtrar por **Date Created ≤ 90 dias atrás** diretamente (funciona sem formula).

### Filtros para Bugs e >90 dias
- Filtro Bugs: `Custom Field "Tipo" is Bug`.
- Filtro >90 dias **solução recomendada**: `Date Created is before [90 days ago]` (relative date filter, nativo).

### Requer plano
- Gantt: **Unlimited plan+** (Free tem apenas 100 usos de Gantt).
- Board, List: todos os planos.
- Saved views customizadas: todos os planos.

### Confiança: alta

### Fontes
- https://help.clickup.com/hc/en-us/articles/6310249474967-Create-and-share-a-Gantt-view
- https://help.clickup.com/hc/en-us/articles/32274881672599-Views-feature-availability-and-limits
- https://help.clickup.com/hc/en-us/articles/6329880717719-Intro-to-views
- https://help.clickup.com/hc/en-us/articles/12665650881943-Search-sort-and-filter-tasks-by-Custom-Fields
- https://help.clickup.com/hc/en-us/articles/6310140728855-Filter-tags-in-views

---

## 5. Custom Fields

| Campo | Tipo ClickUp | Configuração | Requer plano |
|---|---|---|---|
| **Story Points** | Dropdown (ou usar Sprint Points ClickApp nativo) | Opções: 1, 2, 3, 5, 8, 13, 21 (Fibonacci). Alternativa: usar o Sprint Points field nativo, que já é numérico e integra com Sprint rollups. | Sprint Points nativo: Business+ para uso ilimitado; Dropdown: todos os planos |
| **Prioridade** | Dropdown (ou usar campo Priority nativo) | P0 (urgent red), P1 (high yellow), P2 (normal blue), P3 (low gray). Alternativa: usar o Priority field nativo do ClickUp (Urgent/High/Normal/Low) que já tem UI otimizada | Todos os planos |
| **Tipo** | Dropdown | Bug, Feature, Inovação, Débito Técnico | Todos os planos |
| **KR vinculada** | Relationship (Custom Relationship) | Aponta para Goals/Targets ou para uma List de KRs-espelho | Todos os planos; Custom Relationships avançadas em Business+ |
| **Repositório** | Combinação: Dropdown (GitHub/GitLab) + URL field | Dois campos distintos: um dropdown para identificar a plataforma, um URL para o link do repo. Alternativa: um único dropdown com opções "GitHub: nexuz/repo-x", "GitLab: nexuz/repo-y" | Todos os planos |
| **Age** | Formula: `DAYS(TODAY(), field("Date created"))` | Retorna dias decorridos desde a criação | Formula Fields: Business+ (Unlimited tem 1 formula por List) |

**Alerta crítico sobre Formula + TODAY()**: conforme documentação oficial, Formula Fields que usam `TODAY()` **não podem ser usados em Automations, não podem ser sorted/filtered/grouped nem usados em Dashboard Calculation cards**. Isso afeta diretamente os requisitos 4 (view >90 dias) e 7 (automação Age ≥ 90). Ver workaround em §7.

### Confiança: alta

### Fontes
- https://help.clickup.com/hc/en-us/articles/6303499162647-Custom-Field-types
- https://help.clickup.com/hc/en-us/articles/30494683858071-Create-a-Formula-Field
- https://help.clickup.com/hc/en-us/articles/20627467591447-Use-date-and-time-functions-in-Formulas
- https://help.clickup.com/hc/en-us/articles/6308656424983-Intro-to-Formula-Fields
- https://help.clickup.com/hc/en-us/articles/15807110924567-Use-advanced-Formulas

---

## 6. Custom Statuses (workflow)

### Como criar por List/Folder
Hierarquia de statuses: **Space → Folder → List** (níveis herdam/substituem).

1. Space Settings → **Statuses** → criar o template "Dev Workflow": Backlog (gray) → To Do (blue) → In Progress (yellow) → In Review (purple) → QA (orange) → Done (green).
2. Aplicar o Space template a todos os Folders/Lists de dev, ou sobrescrever no Folder "Sprints" se necessário.
3. Salvar como **Status Template** para reutilização.

Recomendação de cores/categorias ClickUp: **Not Started** (Backlog, To Do), **Active** (In Progress, In Review, QA), **Closed** (Done). A categoria afeta comportamento de rollups e Sprints.

### Limitação conhecida: API não suporta criar statuses
A API pública do ClickUp **não expõe endpoints para criar/editar custom statuses** programaticamente. Criação e edição de statuses **devem ser feitas via UI** (ou via ferramentas internas/MCP que simulem UI). Isso significa que o MCP do ClickUp usado nesta squad **não conseguirá configurar os statuses** — será necessário registrar essa configuração como step manual ou via Playwright.

Além disso: recomenda-se menos de **100 statuses por location** para performance.

### Confiança: alta

### Fontes
- https://help.clickup.com/hc/en-us/articles/6309465975063-Statuses-FAQ
- https://help.clickup.com/hc/en-us/articles/6309452618647-Manage-task-statuses
- https://help.clickup.com/hc/en-us/articles/6308803927831-Statuses-for-Folders
- https://help.clickup.com/hc/en-us/articles/6309533958935-Status-templates
- https://help.clickup.com/hc/en-us/articles/32580791275927-Edit-task-statuses

---

## 7. Automações

### Trigger + Action para cada automação do briefing

| # | Regra | Trigger | Condition | Action | Plano mínimo |
|---|---|---|---|---|---|
| A | Sprint criada → auto-criar tasks de daily | `When Sprint is created` (ou Recurring Task daily) | — | `Create task` por membro (1 automation por membro) OU Recurring Task nativa | Sprint trigger: Business+; Recurring Task: todos |
| B | Status=In Review → notifica líder | `When status changes` | `Status = In Review` | `Notify [líder]` ou `Post comment @líder` | Automation: todos; Condition: Business+ |
| C | Task sem Story Point entrando em sprint → bloquear/notificar | `When custom field changes` (Sprint field) | `Sprint Points is empty` | `Notify assignee` + `Add tag "sem-pontos"` | Business+ (usa Condition) |
| D | Age ≥ 90d → tag "obrigatorio-proxima-sprint" + notifica líder | **Ver workaround abaixo** — Formula+TODAY() não é filtrável por Automation | — | — | — |

**Workaround para regra Age ≥ 90 (D)** — três opções:
1. **Nativo recomendado**: Automation `When task is created 90 days ago` (trigger de tempo relativo a date created) → Action `Add tag` + `Notify líder`. Se ClickUp expuser esse trigger (verificar na UI); caso contrário, usar opção 2.
2. **Dashboard + review humana**: criar Dashboard card "Tasks com idade ≥ 90" usando filtro nativo `Date Created before [90 days ago]` (não precisa Formula). Líder revisa semanalmente.
3. **Scheduled automation externa**: usar Zapier/Make ou job diário via API que lista tasks com `date_created < now - 90d` e chama endpoint para adicionar tag.

### Quais automações são suportadas via MCP vs UI
- **Criar Automations via MCP/API**: **não suportado oficialmente** — automations são configuradas via UI. O MCP do ClickUp (conforme ferramentas disponíveis: `clickup_add_tag_to_task`, `clickup_add_task_dependency`, etc.) permite **executar ações equivalentes** mas não criar a Automation declarativa.
- **Tag a uma task, criar reminder, comentar, mover task, setar custom field**: suportado via MCP.
- Implicação: automations estruturais (A, B, C, D) precisam ser criadas via UI ou Playwright.

### Plano mínimo
- **Automations básicas**: Unlimited plan (100 automations/month).
- **Automations com Conditions**: Business plan+.
- **Email automations, advanced automations, webhooks**: Business Plus/Enterprise.

### Fontes
- https://help.clickup.com/hc/en-us/articles/6312102752791-Intro-to-Automations
- https://help.clickup.com/hc/en-us/articles/6312128853015-Use-Automation-Triggers
- https://help.clickup.com/hc/en-us/articles/6312097314199-Use-Automation-Actions
- https://help.clickup.com/hc/en-us/articles/6312136485527-Use-Automation-Conditions
- https://help.clickup.com/hc/en-us/articles/35446142759575-Use-Custom-Fields-in-Automations
- https://help.clickup.com/hc/en-us/articles/23477062949911-Automations-feature-availability-and-limits
- https://help.clickup.com/hc/en-us/articles/30241682127127-Create-an-Automation

### Confiança: alta (exceto regra D, onde a existência de trigger "task is X days old" precisa de confirmação em UI)

---

## 8. Integrações GitHub + GitLab

### Como configurar
1. Space Settings → **Integrations** → App Center → GitHub (ou GitLab) → Connect.
2. Autorizar via OAuth (admin do workspace + admin do repositório).
3. Selecionar Space(s) onde a integração fica ativa e repo(s) vinculado(s).
4. GitLab self-hosted também suportado (URL custom do GitLab instance).

### O que aparece na task
Ambas integrações, quando o **ID da task ClickUp** é incluído no título/descrição do PR/MR, branch ou commit message:
- **Commits**: listados na task com hash, autor, mensagem, link.
- **Pull Requests (GitHub) / Merge Requests (GitLab)**: status (open/merged/closed), reviewers, CI checks, link.
- **Branches**: nome do branch vinculado.
- Comentários da PR aparecem no feed de atividade da task.
- Do lado inverso: a task pode sugerir **nome de branch** (ex: `CU-a1b2c3_feature-x`) e commit message prontos para copiar.
- **Criar issue, branch ou PR/MR direto da task** (botão na sidebar de integrações da task).

### Plano mínimo
**Todos os planos, incluindo Free Forever.** Ambas GitHub e GitLab são nativas e gratuitas.

### Confiança: alta

### Fontes
- https://help.clickup.com/hc/en-us/articles/6305771568791-GitHub-integration
- https://help.clickup.com/hc/en-us/articles/6305774858263-GitLab-integration
- https://help.clickup.com/hc/en-us/articles/6305836061463-Use-GitHub-Automations
- https://help.clickup.com/hc/en-us/articles/35048588377495-Integrations-on-tasks
- https://help.clickup.com/hc/en-us/articles/12103076840087-Integrations-embeds-and-links-in-tasks

---

## 9. Task Dependencies / Task Relationships

### Diferenças
| Mecanismo | Uso | Semântica | Plano |
|---|---|---|---|
| **Dependency Relationship** | "This task blocks" / "This task is blocked by" | Afeta Gantt (linhas de dependência, critical path) e Automations. Tasks bloqueadas mostram warning. | Todos os planos |
| **Linked Tasks** | Associar tasks relacionadas sem bloqueio | Apenas referência visual e navegação; sem impacto em Gantt | Todos os planos |
| **Relationship Custom Field** (antigo rollup) | Vincular tasks entre Lists específicas com rollup de dados | Permite puxar campos da task relacionada (rollup columns). Usado para "KR vinculada", "Repositório parent", etc. | Todos os planos |
| **Custom Relationships** | Relationship avançada com nome customizado e schema | Mais controle (ex: "Parent Epic", "Related Bug") | Business+ |

**Recomendação Nexuz**:
- Dependências de desenvolvimento reais (A bloqueia B): **Dependency Relationship**.
- Tasks relacionadas sem bloqueio (duplicata, referência): **Linked Tasks**.
- Campo "KR vinculada" (requisito §5): **Relationship Custom Field** apontando para a List de Targets/Goals.

### Fontes
- https://help.clickup.com/hc/en-us/articles/6309155073303-Intro-to-Dependency-Relationships
- https://help.clickup.com/hc/en-us/articles/6309943321751-Create-Dependency-Relationships-in-tasks
- https://help.clickup.com/hc/en-us/articles/6304528030743-Intro-to-Relationships
- https://help.clickup.com/hc/en-us/articles/6309896464407-Link-tasks
- https://help.clickup.com/hc/en-us/articles/6309153663639-Custom-Relationships
- https://help.clickup.com/hc/en-us/articles/6309187371031-Add-relationship-columns-to-tasks

### Confiança: alta

---

## 10. Gaps (o que não encontrei ou é incerto)

1. **Trigger nativo "task age ≥ 90 days"**: não confirmado em docs oficiais; dependências de trigger de tempo relativo ao `date_created` precisam ser validadas na UI no ambiente real. Recomendação: fallback via Dashboard ou job externo.
2. **API para criar Custom Statuses**: ausente. Qualquer setup da squad via MCP terá que registrar este step como manual ou usar Playwright para UI automation. Impacta todo o workflow de Custom Statuses §6.
3. **API para criar Automations**: ausente. Automations precisam ser configuradas na UI.
4. **Bloquear task sem Story Point entrando em Sprint**: ClickUp não tem "validation rule" declarativa como Jira — só pode **notificar** (não bloquear movimentação). Best-effort: Automation que reverte o status ou move a task de volta para Backlog caso entre em Sprint sem pontos.
5. **Split 20/80 bugs/features enforcement**: não é um recurso nativo. Só pode ser **monitorado** (Dashboard) e não **forçado** pela plataforma. Governança fica com o Product Lead.
6. **Limites exatos de automations/mês por plano**: tentei fetch direto da página oficial de limits mas retornou 403. Dados inferidos de blogs: Unlimited ~100/mo, Business ~10k/mo, Business Plus ~100k/mo, Enterprise 250k/mo. **Recomendação: validar no workspace real em Settings → Automations → usage**.
7. **Formula Field com TODAY() em Unlimited plan**: Unlimited tem limite de formula fields simples; cálculos avançados exigem Business+. Requer confirmação no plano real do cliente.
8. **Goals API coverage**: cobertura parcial. Importações massivas de KRs via MCP podem exigir criação manual via UI.

---

## Sources (lista completa)

Todas as URLs acessadas em 2026-04-14:

**Sprints / Sprint Folders / Points:**
- [Intro to Sprints](https://help.clickup.com/hc/en-us/articles/6303974210071-Intro-to-Sprints)
- [Create a Sprint Folder](https://help.clickup.com/hc/en-us/articles/36078645779479-Create-a-Sprint-Folder)
- [Customize settings for each Sprint Folder](https://help.clickup.com/hc/en-us/articles/35715405307415-Customize-settings-for-each-Sprint-Folder)
- [Configure default Sprint Folder settings](https://help.clickup.com/hc/en-us/articles/35715191301399-Configure-your-default-settings-for-Sprint-Folders)
- [Use Sprint Points](https://help.clickup.com/hc/en-us/articles/6303883602327-Use-Sprint-Points)
- [Activate the Sprints ClickApp](https://help.clickup.com/hc/en-us/articles/21362742005399-Activate-the-Sprints-ClickApp)
- [Sprints feature availability and limits](https://help.clickup.com/hc/en-us/articles/35714017592471-Sprints-feature-availability-and-limits)
- [Sprints ClickApp FAQ](https://help.clickup.com/hc/en-us/articles/6303924616087-Sprints-ClickApp-FAQ)
- [Create your first Sprint](https://help.clickup.com/hc/en-us/articles/6304342064151-Create-your-first-Sprint)
- [Agile Scrum Workflow in ClickUp](https://help.clickup.com/hc/en-us/articles/6328184839831-How-to-set-up-an-Agile-Scrum-Workflow-in-ClickUp)
- [ClickUp for epics and user stories](https://help.clickup.com/hc/en-us/articles/6328018878103-ClickUp-for-epics-and-user-stories)
- [Sprints feature page](https://clickup.com/features/sprints)

**Goals / OKRs:**
- [Use ClickUp to track goals and OKRs](https://help.clickup.com/hc/en-us/articles/6327987972119-Use-ClickUp-to-track-goals-and-OKRs)
- [Create a Goal](https://help.clickup.com/hc/en-us/articles/6325733579671-Create-a-Goal)
- [Organize Hierarchy for goals and OKRs](https://help.clickup.com/hc/en-us/articles/30806266190103-Organize-your-Hierarchy-for-goals-and-OKRs)
- [Use views for goals and OKRs](https://help.clickup.com/hc/en-us/articles/30807756167447-Use-views-for-goals-and-OKRs)
- [Goals feature page](https://clickup.com/features/goals)

**Standups:**
- [Daily Standup Meeting Template](https://clickup.com/templates/daily-standup-meeting-t-206515719)
- [Daily Standup Meeting Agenda](https://clickup.com/templates/meeting-agenda/daily-standup)
- [Use ClickUp AI for StandUps](https://help.clickup.com/hc/en-us/articles/20011540694551-Use-ClickUp-AI-to-write-a-StandUp-or-team-updates)
- [Daily Standup Automation](https://clickup.com/p/project-management-software/daily-standup-automation)
- [Stand-Up Meetings Guide](https://clickup.com/blog/stand-up-meetings/)

**Custom Fields / Formulas:**
- [Custom Field types](https://help.clickup.com/hc/en-us/articles/6303499162647-Custom-Field-types)
- [Create a Formula Field](https://help.clickup.com/hc/en-us/articles/30494683858071-Create-a-Formula-Field)
- [Intro to Formula Fields](https://help.clickup.com/hc/en-us/articles/6308656424983-Intro-to-Formula-Fields)
- [Date and time functions in Formulas](https://help.clickup.com/hc/en-us/articles/20627467591447-Use-date-and-time-functions-in-Formulas)
- [Advanced Formulas](https://help.clickup.com/hc/en-us/articles/15807110924567-Use-advanced-Formulas)

**Statuses:**
- [Statuses FAQ](https://help.clickup.com/hc/en-us/articles/6309465975063-Statuses-FAQ)
- [Manage task statuses](https://help.clickup.com/hc/en-us/articles/6309452618647-Manage-task-statuses)
- [Statuses for Folders](https://help.clickup.com/hc/en-us/articles/6308803927831-Statuses-for-Folders)
- [Status templates](https://help.clickup.com/hc/en-us/articles/6309533958935-Status-templates)
- [Edit task statuses](https://help.clickup.com/hc/en-us/articles/32580791275927-Edit-task-statuses)

**Automations:**
- [Intro to Automations](https://help.clickup.com/hc/en-us/articles/6312102752791-Intro-to-Automations)
- [Use Automation Triggers](https://help.clickup.com/hc/en-us/articles/6312128853015-Use-Automation-Triggers)
- [Use Automation Actions](https://help.clickup.com/hc/en-us/articles/6312097314199-Use-Automation-Actions)
- [Use Automation Conditions](https://help.clickup.com/hc/en-us/articles/6312136485527-Use-Automation-Conditions)
- [Automations feature availability and limits](https://help.clickup.com/hc/en-us/articles/23477062949911-Automations-feature-availability-and-limits)
- [Create an Automation](https://help.clickup.com/hc/en-us/articles/30241682127127-Create-an-Automation)
- [Custom Fields in Automations](https://help.clickup.com/hc/en-us/articles/35446142759575-Use-Custom-Fields-in-Automations)

**Integrations:**
- [GitHub integration](https://help.clickup.com/hc/en-us/articles/6305771568791-GitHub-integration)
- [GitLab integration](https://help.clickup.com/hc/en-us/articles/6305774858263-GitLab-integration)
- [Use GitHub Automations](https://help.clickup.com/hc/en-us/articles/6305836061463-Use-GitHub-Automations)
- [Integrations on tasks](https://help.clickup.com/hc/en-us/articles/35048588377495-Integrations-on-tasks)
- [Integrations, embeds, and links in tasks](https://help.clickup.com/hc/en-us/articles/12103076840087-Integrations-embeds-and-links-in-tasks)

**Relationships / Dependencies:**
- [Intro to Dependency Relationships](https://help.clickup.com/hc/en-us/articles/6309155073303-Intro-to-Dependency-Relationships)
- [Create Dependency Relationships in tasks](https://help.clickup.com/hc/en-us/articles/6309943321751-Create-Dependency-Relationships-in-tasks)
- [Intro to Relationships](https://help.clickup.com/hc/en-us/articles/6304528030743-Intro-to-Relationships)
- [Link tasks](https://help.clickup.com/hc/en-us/articles/6309896464407-Link-tasks)
- [Custom Relationships](https://help.clickup.com/hc/en-us/articles/6309153663639-Custom-Relationships)
- [Add relationship columns to tasks](https://help.clickup.com/hc/en-us/articles/6309187371031-Add-relationship-columns-to-tasks)

**Views:**
- [Views feature availability and limits](https://help.clickup.com/hc/en-us/articles/32274881672599-Views-feature-availability-and-limits)
- [Create and share a Gantt view](https://help.clickup.com/hc/en-us/articles/6310249474967-Create-and-share-a-Gantt-view)
- [Intro to views](https://help.clickup.com/hc/en-us/articles/6329880717719-Intro-to-views)
- [Search, sort, and filter by Custom Fields](https://help.clickup.com/hc/en-us/articles/12665650881943-Search-sort-and-filter-tasks-by-Custom-Fields)
- [Filter tags in views](https://help.clickup.com/hc/en-us/articles/6310140728855-Filter-tags-in-views)

**Pricing / Plan limits:**
- [Intro to pricing](https://help.clickup.com/hc/en-us/articles/10129535087383-Intro-to-pricing)
- [Customizable ClickUp features](https://help.clickup.com/hc/en-us/articles/9559764679831-Customizable-ClickUp-features)
