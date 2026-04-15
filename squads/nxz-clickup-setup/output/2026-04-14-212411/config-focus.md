# Config Focus — Run 2026-04-14-212411

**Data:** 2026-04-14
**Run ID:** 2026-04-14-212411

## Departamentos selecionados
- **Desenvolvimento / Produtos** (único departamento desta execução)

## Processos documentados
- Informais — o briefing do usuário abaixo é a fonte da verdade

## Nível de customização
- **Completo** — Custom Fields + Automações + OKRs (Goals) + Dashboards + Views (Gantt/Kanban/Lista)

---

## Contexto Específico de Produtos/Desenvolvimento (briefing do usuário)

> Estamos trabalhando com OKRs + sprint + tarefas, então precisamos que toda sprint tenha um vínculo com a KR que está sendo trabalhada para que consigamos medir os esforços e acompanhar. Atualmente trabalhamos com GitHub + GitLab, precisamos definir rotinas de sprint semanal + tarefas descritas de forma completa.
>
> Iremos utilizar um sistema de daily pelo ClickUp também, o objetivo desse daily é mencionar o progresso da sprint + tarefa de forma que o líder consiga acompanhar o que está sendo executado.
>
> De forma geral, precisamos ter uma visualização Gantt das sprints, Kanban e Lista. Kanban de tarefas com responsável, descrição em markdown dela completa, tarefas vinculadas.
>
> Também devemos ter story point, classificação de prioridade para que possamos classificar a task e enquadrar em uma sprint. Caso a task esteja há mais de 90 dias ela de forma obrigatória deve entrar na próxima sprint. Devemos separar a sprint para que 20% seja bug e o restante inovação/feature.

---

## Requisitos consolidados (para o Architect no Step 04)

### Hierarquia OKR → Sprint → Tarefa
- **Goals (OKRs)** no módulo nativo Goals do ClickUp, escopo do Space Desenvolvimento
- Cada **Sprint** vincula uma/mais KRs via custom field Relationship "KR vinculada"
- Cada **Tarefa** pertence a uma Sprint (Sprint Folder nativo) e também referencia a KR via "KR vinculada"

### Sprints
- **Cadência:** semanal
- **Split obrigatório:** 20% bugs / 80% inovação/feature (capacity planning)
- **Regra dos 90 dias:** task com idade ≥ 90 dias entra obrigatoriamente na próxima sprint
  - Implementação: Formula "Age (dias)" + Automação "Age ≥ 90d → tag 'obrigatorio-proxima-sprint' + notificar líder" + View ">90 dias"

### Custom Fields nas tarefas
- **Story Points** — Dropdown com Fibonacci (1/2/3/5/8/13/21)
- **Prioridade** — Dropdown (P0/Crítica, P1/Alta, P2/Normal, P3/Baixa)
- **Tipo** — Dropdown (Bug / Feature / Inovação / Débito Técnico)
- **KR vinculada** — Relationship (aponta para Goals/KRs)
- **Repositório** — Dropdown (GitHub / GitLab) + campo URL para repo ou PR
- **Age (dias)** — Formula `today - date_created`
- **Descrição** — Markdown nativo do ClickUp (completa, com critérios de aceite)
- **Task Dependencies** — nativo (para tarefas vinculadas/bloqueantes)
- **Assignee** — nativo

### Views obrigatórias
- **Gantt** — linha do tempo das sprints
- **Kanban** — tarefas por status (com Assignee visível)
- **Lista** — backlog com filtros por Prioridade / Tipo / KR
- **View "Bugs"** — filtro Tipo=Bug para monitorar limite de 20%
- **View ">90 dias"** — filtro Age ≥ 90 para entrar na próxima sprint

### Daily (decisão do usuário)
- **Formato:** Lista dedicada "Daily Standups" com tasks diárias por membro
- Task template com campos: "Progresso da sprint", "Tarefa em execução", "Bloqueios"
- Automação sugerida: Sprint criada → auto-criar tasks diárias por membro

### OKR binding (decisão do usuário)
- **Formato:** Goals nativo do ClickUp + custom field "KR vinculada" nas Sprints/Tasks
- Se MCP não suportar Goals API, documentar como passo manual no ClickUp UI

### Regra 90 dias (decisão do usuário)
- **Formato:** Automação Age ≥ 90d → tag "obrigatorio-proxima-sprint" + notificação ao líder
- Fallback manual se automação não estiver disponível via MCP

### Custom Statuses para Lists de Sprint
Sugeridos (o Architect confirma no Step 04):
Backlog → To Do → In Progress → In Review (PR aberto) → QA → Done

### Integrações
- **GitHub** (integração nativa ClickUp — vincula commits/PRs/branches à task)
- **GitLab** (integração nativa ClickUp — vincular commits/MRs à task)

### Automações prioritárias
1. Task Age ≥ 90d → tag "obrigatorio-proxima-sprint" + notifica líder
2. Status = In Review → notifica líder
3. Task sem Story Point entrando em Sprint → bloqueia ou notifica
4. Sprint criada → auto-criar tasks de Daily para cada membro

### OKRs sugeridos para Desenvolvimento
- **Objective:** Entregar valor previsível com qualidade
  - KR1: % sprints com meta batida (story points entregues / comprometidos)
  - KR2: Bug rate por release
  - KR3: Cycle time médio das tasks
- **Objective:** Elevar saúde técnica
  - KR1: % do capacity investido em débito técnico
  - KR2: Cobertura de testes
  - KR3: MTTR (mean time to recovery)
