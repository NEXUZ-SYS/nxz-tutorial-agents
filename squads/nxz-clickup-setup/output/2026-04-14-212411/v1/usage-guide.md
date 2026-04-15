# Guia de Uso e Finalização — ClickUp Desenvolvimento (Nexuz)

_Treinador: Tiago Treinamento 📚 · Data: 2026-04-14_

Este guia tem duas partes:

1. **Finalização da configuração** — o que falta fazer na UI do ClickUp (~45-60 min)
2. **Playbook operacional** — como o time usa o workspace no dia a dia

---

## PARTE 1 — Finalização da configuração (~45-60 min)

**Links diretos do que já foi criado:**

- Space Desenvolvimento: https://app.clickup.com/3086998/v/l/s/90178184335 (ou navegue pela sidebar)
- Sprint Atual: https://app.clickup.com/3086998/v/l/li/901712929313
- Backlog Produto: https://app.clickup.com/3086998/v/l/li/901712929317
- Bug Pool: https://app.clickup.com/3086998/v/l/li/901712929320
- Débito Técnico: https://app.clickup.com/3086998/v/l/li/901712929322
- Daily Standups: https://app.clickup.com/3086998/v/l/li/901712929324
- Retros & Reviews: https://app.clickup.com/3086998/v/l/li/901712929326
- ADRs & RFCs: https://app.clickup.com/3086998/v/l/li/901712929328

---

### Bloco 1 — Ativar Sprints ClickApp e configurar Sprint Folder (10 min)

1. Abra o Space **Desenvolvimento**
2. Clique nos 3 pontinhos ao lado do nome → **Configurações (Space settings)**
3. Vá em **ClickApps** → ative **Sprints** (ON)
4. Também ative: **Story Points (Sprint Points)**, **Dependencies**, **Multiple Assignees**, **Tags**, **Time Tracking**
5. Volte ao Space → clique no Folder **Sprints Produto** → 3 pontinhos → **Configurações do Folder**
6. Em **Sprint Settings**:
   - Duration: **1 week**
   - Start day: **Monday**
   - Automatically start the next Sprint: **ON**
   - Move unfinished tasks to next Sprint: **ON**
   - Auto-create recurring tasks: conforme preferência
7. Salvar

> Dica: Depois da ativação, a List "Sprint Atual" vira automaticamente uma Sprint List nativa. O ClickUp passará a criar os sprints futuros sozinho.

---

### Bloco 2 — Custom Fields em nível Space (15 min)

Para evitar recriar campo por campo em cada List, crie-os **uma vez em nível Space** e conecte às Lists que precisarem.

1. Sidebar → clique direito no Space **Desenvolvimento** → **Space settings** → aba **Custom Fields**
2. Clique em **+ Create Field**

Crie os seguintes na ordem:

| # | Nome | Tipo | Opções / Config |
|---|---|---|---|
| 1 | **Prioridade Custom** | Dropdown | P0-Crítica (vermelho), P1-Alta (laranja), P2-Normal (amarelo), P3-Baixa (cinza) |
| 2 | **Tipo** | Dropdown (já existe na Sprint Atual — mover para Space) | Bug, Feature, Inovação, Débito Técnico |
| 3 | **KR vinculada** | Relationship (Task) | Aponta para List "OKR Targets" (criar antes — ver Bloco 4) |
| 4 | **Repositório** | Dropdown | GitHub, GitLab, Ambos |
| 5 | **Repo URL** | Website (URL) | — |
| 6 | **Age (dias)** | Formula | Expressão: `DAYS(TODAY(), field("Date created"))` |
| 7 | **Risco** | Dropdown | Baixo, Médio, Alto |
| 8 | **Ambiente afetado** | Labels (multi) | Prod, Staging, Dev |

> **Para mover Tipo (já criado na Sprint Atual) para Space:**
> Abra Sprint Atual → Colunas → campo Tipo → 3 pontinhos → **Share with Folder/Space** → escolher Space Desenvolvimento.

**Conectar fields a cada List que precisar:**
Lists que devem ter os fields 1-8: Sprint Atual, Backlog Produto, Bug Pool, Débito Técnico.
- Abrir a List → clicar em **Colunas** → aba **Adicionar um existente** → marcar os fields desejados.

---

### Bloco 3 — Custom Fields específicos de Daily e Retros (5 min)

**List Daily Standups:**
1. Abrir Lista → **Colunas** → **Criar novo**
2. **Progresso da sprint** — Área de texto (texto longo)
3. **Tarefa em execução** — Relationship (aponta para Sprint Atual)
4. **Bloqueios** — Área de texto
5. **Data** — Date (default: hoje)

**List Retros & Reviews:**
1. **Sprint** — Relationship (Sprint Atual)
2. **O que foi bem** — Área de texto
3. **O que melhorar** — Área de texto
4. **Action items** — Checkbox list

---

### Bloco 4 — Goals e OKRs (10 min)

1. Sidebar → **Metas (Goals)**
2. Clique em **+ Nova Pasta** → nome: **Desenvolvimento 2026-Q2** (ajuste o trimestre)
3. Dentro da pasta, crie:

**Goal 1: Entregar valor previsível com qualidade**
- Owner: Walter (Líder)
- Período: Q atual
- Targets:
  - KR1 (Number): % sprints com meta batida ≥ 85% → meta 85
  - KR2 (Number): Bug rate por release ≤ 3 → meta 3 (inverse)
  - KR3 (Number): Cycle time médio em dias ≤ 4 → meta 4 (inverse)

**Goal 2: Elevar saúde técnica**
- Owner: Walter
- Targets:
  - KR1 (Number): % capacity em débito técnico ≥ 15% → meta 15
  - KR2 (Number): Cobertura de testes ≥ 70% → meta 70
  - KR3 (Number): MTTR em horas ≤ 2 → meta 2 (inverse)

4. **Criar List "OKR Targets"** dentro do Space (para o campo Relationship):
   - Folder "Ritos & Operação" → **+ Nova List** → nome: **OKR Targets**
   - Criar uma task-espelho por KR (KR1 do Goal 1, KR2 do Goal 1, ...)

---

### Bloco 5 — Views obrigatórias (15 min)

Para cada view: abra a List → botão **+ View** no topo → escolha o tipo → configure filtros → salvar com o nome.

**Sprint Atual** (List):
- **Gantt Sprints** — Tipo: Gantt — Group by: Sprint
- **Kanban** — Tipo: Board — Group by: Status
- **Backlog da Sprint** — Tipo: List — Filter: Status IN (BACKLOG, SCOPING) — Sort: Prioridade Custom ↓
- **Bugs (split 20%)** — Tipo: List — Filter: Tipo=Bug — mostrar sum de Sprint Points
- **Em Review** — Tipo: List — Filter: Status=IN REVIEW

**Backlog Produto** (+ replicar em Bug Pool e Débito Técnico):
- **Backlog priorizado** — List — Sort: Prioridade Custom ↓ Sprint Points ↓
- **Sem refinamento** — List — Filter: Sprint Points is empty OR Description is empty
- **>90 dias (obrigatório)** — List — Filter: Date Created **before 90 days ago** — Sort: Date Created asc
- **Por KR** — List — Group by: KR vinculada
- **Roadmap Gantt** — Gantt — Color by: Tipo

**Daily Standups:**
- **Hoje** — List — Filter: Data=today — Group by: Assignee
- **Esta semana** — Calendar — campo Data

---

### Bloco 6 — Automações (10 min)

No Space Desenvolvimento → **Automations** (ícone de raio na barra superior da List):

1. **Status → IN REVIEW → Notify Líder**: When status changes to IN REVIEW → Notify: Walter (ou grupo de líderes)
2. **Bug + P0 → hot + notify**: When Tipo=Bug AND Prioridade Custom=P0-Crítica → Add tag "hot" + Notify líder
3. **PR criado (GitHub) → IN REVIEW**: (requer integração GitHub no Bloco 7) When pull request opened → Change status to IN REVIEW
4. **PR merged → SHIPPED**: When pull request merged → Change status to SHIPPED
5. **Sem Story Point em Sprint**: When task added to list=Sprint Atual AND Sprint Points is empty → Notify assignee + líder

---

### Bloco 7 — Integrações GitHub + GitLab (5 min)

1. Space Desenvolvimento → **Settings** → **Integrations**
2. **GitHub**: clicar, autorizar, selecionar os repos da Nexuz
3. **GitLab**: clicar, autorizar, selecionar os repos

Uma vez integrado:
- Mencionar `CU-{task_id}` em commit / branch / PR → aparece vinculado automaticamente na task
- As automações do Bloco 6 (itens 3 e 4) passam a funcionar

---

### Bloco 8 — Dashboard (Fase 2 — 10 min)

1. Sidebar → **Painéis (Dashboards)** → **+ New Dashboard** → nome: **Desenvolvimento — Sprint Atual**
2. Adicionar cards:
   - **Velocity** (Line chart) — Story Points completed últimas 8 sprints
   - **Split Bugs vs Features** (Bar chart) — Sprint Atual, Group by Tipo, sum Sprint Points
   - **Burndown** (Burndown chart) — Sprint Atual
   - **Em Review (aging)** (List) — filter Status=IN REVIEW, sort por time in status
   - **>90 dias no Backlog** (List + count) — filter Date Created before 90 days ago
   - **Progresso das KRs** (Goal card) — Goals "Desenvolvimento 2026-Q2"

---

## PARTE 2 — Playbook operacional

### Rotina de Sprint Planning (toda segunda-feira, 30-45 min)

1. Abrir view **Bugs (split 20%)** na Sprint atual que está terminando → calcular Sprint Points de Bug / Total da sprint. Se >20%, anotar para compensar na próxima.
2. Abrir view **>90 dias (obrigatório)** nos backlogs → **todas** essas tasks entram na próxima sprint.
3. Abrir Backlog Produto (view **Backlog priorizado**) → escolher features até fechar ~80% do capacity (descontando bugs).
4. Abrir Bug Pool → escolher bugs até ~20% do capacity.
5. Adicionar tasks escolhidas à Sprint Atual (arrastar / move).
6. Confirmar que TODAS as tasks têm: Story Points, Prioridade Custom, Tipo, KR vinculada, Descrição em Markdown (template abaixo).
7. Iniciar a Sprint.

### Template de Descrição de Task (Markdown)

Copie e use como descrição padrão:

```markdown
## Contexto
(Por que esta task existe? Qual problema ou oportunidade?)

## Objetivo
(O que ela entrega? Resultado esperado em 1-2 frases.)

## Critérios de Aceite
- [ ] CA 1
- [ ] CA 2
- [ ] CA 3

## Links técnicos
- Repo: {URL do repositório}
- Branch: {nome da branch ou "a criar"}
- Issue/PR: {link após criar}
- Docs: {links de design/RFC}

## Notas técnicas
(Decisões, trade-offs, avisos para quem executa)
```

> **Dica:** Pinhe esse template como "Task Template" na List Sprint Atual — ClickUp cria a task nova já com a estrutura preenchida.

### Rotina de Daily (todo dia, 09h30)

1. Cada membro abre a List **Daily Standups**
2. Cria uma task com o nome `Daily — {seu nome} — {data}`
3. Preenche:
   - **Progresso da sprint**: 1-3 bullets sobre o que fez desde a última daily
   - **Tarefa em execução**: Relationship para a task atual da Sprint
   - **Bloqueios**: vazio ou descrição objetiva
4. Status: Aberto → Concluído ao finalizar
5. Líder abre a view **Hoje** às 10h e lê tudo em 5 min.

### Ciclo de vida de uma Task

| Status | O que acontece |
|---|---|
| **BACKLOG** | Criada mas ainda não entrou em sprint |
| **SCOPING** | Em refinamento — adicionar AC, Story Points, KR |
| **IN DESIGN** | Design/UX/arquitetura em andamento |
| **IN DEVELOPMENT** | Branch criada, código em escrita |
| **IN REVIEW** | PR aberto, aguardando review. Automação notifica líder. |
| **TESTING** | Mergeado em staging, QA testando |
| **READY FOR DEVELOPMENT** | Pronta para próxima fase (para tasks compostas) |
| **SHIPPED** | Em produção |
| **CANCELLED** | Descartada com justificativa |

### Regra dos 90 dias

Qualquer task com `Date Created` > 90 dias atrás **entra automaticamente na próxima sprint** — não há negociação. A view **>90 dias (obrigatório)** é consultada no Planning e todas são promovidas. Se a task está realmente obsoleta, o caminho é mudar status para **CANCELLED** com comentário justificando.

### Split 20/80

Por sprint:
- Máximo 20% do capacity (Sprint Points) em tasks de Tipo=Bug
- Mínimo 80% em Feature / Inovação / Débito Técnico
- Monitorar via Dashboard card "Split Bugs vs Features"

### Integrações GitHub/GitLab na prática

Ao criar um commit, branch ou PR/MR, inclua `CU-{task_id}` na mensagem/título:
- Branch: `feature/CU-abc123-implementa-auth-2fa`
- Commit: `feat(auth): adiciona 2FA · CU-abc123`
- PR title: `[CU-abc123] Implementa autenticação 2FA`

Benefícios automáticos:
- PR aparece vinculado na task
- Automação move status para IN REVIEW quando PR abre
- Automação move para SHIPPED quando PR é mergeado

---

## Referências rápidas

- **Design do workspace:** `workspace-design.md`
- **Pesquisa de capabilities do ClickUp:** `research-findings.md`
- **Log do que foi configurado:** `configuration-log.md`
- **Auditoria:** `audit-report.md`
- **Briefing original do usuário:** `config-focus.md`

## Suporte

Dúvidas na operação: líder (Walter). Ajustes de workspace: rodar `/opensquad run nxz-clickup-setup` novamente.
