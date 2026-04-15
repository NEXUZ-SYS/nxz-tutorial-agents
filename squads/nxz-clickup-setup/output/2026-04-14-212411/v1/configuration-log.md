# Log de Configuração ClickUp — Desenvolvimento (Run 2026-04-14-212411)

_Configurador: Carlos Configurador ⚙️ · Data: 2026-04-14_

## Resumo executivo
- **Space criado:** Desenvolvimento (via Playwright, template "Produto + engenharia")
- **Folders criados via MCP:** 4
- **Lists criadas via MCP:** 7
- **Custom Fields ativados (nativos):** 2 (Pontos do Sprint, Sprints) na List "Sprint Atual"
- **Custom Fields criados:** 1 (Tipo — Dropdown Bug/Feature/Inovação/Débito Técnico) na List "Sprint Atual"
- **Pendente:** demais Custom Fields, Views, Sprint ClickApp settings, Goals, Automações, Integrações, Dashboards — ver guia detalhado em `usage-guide.md`

---

## Ações executadas

### 🖥️ Via Playwright (UI automation)

| Ação | Resultado | Notas |
|---|---|---|
| Criar Space "Desenvolvimento" | ✅ 2026-04-14 22:21 | Template "Produto + engenharia" (statuses granulares: BACKLOG → SCOPING → IN DESIGN → IN DEVELOPMENT → IN REVIEW → TESTING → READY FOR DEVELOPMENT → SHIPPED → CANCELLED) |
| Privacidade | ✅ Público no workspace | Decisão do usuário |

### 🔌 Via ClickUp MCP (API)

#### Folders
| Nome | ID | Status |
|---|---|---|
| Sprints Produto | 90178184338 | ✅ |
| Backlog & Roadmap | 90178184341 | ✅ |
| Ritos & Operação | 90178184343 | ✅ |
| Docs Técnicas | 90178184346 | ✅ |

#### Lists
| Nome | Folder | List ID | URL |
|---|---|---|---|
| Sprint Atual | Sprints Produto | 901712929313 | [abrir](https://app.clickup.com/3086998/v/l/li/901712929313) |
| Backlog Produto | Backlog & Roadmap | 901712929317 | [abrir](https://app.clickup.com/3086998/v/l/li/901712929317) |
| Bug Pool | Backlog & Roadmap | 901712929320 | [abrir](https://app.clickup.com/3086998/v/l/li/901712929320) |
| Débito Técnico | Backlog & Roadmap | 901712929322 | [abrir](https://app.clickup.com/3086998/v/l/li/901712929322) |
| Daily Standups | Ritos & Operação | 901712929324 | [abrir](https://app.clickup.com/3086998/v/l/li/901712929324) |
| Retros & Reviews | Ritos & Operação | 901712929326 | [abrir](https://app.clickup.com/3086998/v/l/li/901712929326) |
| ADRs & RFCs | Docs Técnicas | 901712929328 | [abrir](https://app.clickup.com/3086998/v/l/li/901712929328) |

---

## ⚠️ Pendências (MANUAL via UI ou próxima fase)

### 1. Sprint Folder settings (Playwright ou manual)
- [ ] Ativar **Sprints ClickApp** no Space (Settings → ClickApps)
- [ ] Converter Folder "Sprints Produto" em **Sprint Folder** nativo
- [ ] Duration = 1 week, start day = Monday
- [ ] Automatically start next Sprint: ON
- [ ] Move unfinished tasks to next Sprint: ON

### 2. Custom Fields (MCP API — próxima iteração)
Aplicar aos Folders Sprints Produto, Backlog & Roadmap:
- [ ] Story Points — Dropdown (1, 2, 3, 5, 8, 13, 21)
- [ ] Prioridade — Dropdown (P0-Crítica, P1-Alta, P2-Normal, P3-Baixa)
- [ ] Tipo — Dropdown (Bug, Feature, Inovação, Débito Técnico)
- [ ] KR vinculada — Relationship → List OKR Targets
- [ ] Repositório — Dropdown (GitHub, GitLab, Ambos)
- [ ] Repo URL — URL
- [ ] Age (dias) — Formula `DAYS(TODAY(), field("Date created"))`
- [ ] Risco — Dropdown (Baixo, Médio, Alto)
- [ ] Ambiente afetado — Labels (Prod, Staging, Dev)

Na List Daily Standups:
- [ ] Progresso da sprint — Text
- [ ] Tarefa em execução — Relationship → Sprint Atual
- [ ] Bloqueios — Text
- [ ] Data — Date

Na List Retros & Reviews:
- [ ] Sprint — Relationship
- [ ] O que foi bem — Text MD
- [ ] O que melhorar — Text MD
- [ ] Action items — Checklist

### 3. Statuses customizados (Playwright — opcional)
Os statuses do template "Produto + engenharia" estão ativos (decisão do usuário mantê-los). Sem ação extra.

### 4. Views (MCP ou manual)
Por List / Folder:
- [ ] **Gantt Sprints** — Folder Sprints Produto, group by Sprint
- [ ] **Kanban** — Sprint Atual, group by Status
- [ ] **Backlog da Sprint** — Sprint Atual, filter: status=Backlog/To Do, sort: Prioridade
- [ ] **Bugs (split 20%)** — Sprint Atual, filter: Tipo=Bug, sum Story Points
- [ ] **Em Review** — Sprint Atual, filter: Status=IN REVIEW
- [ ] **Backlog priorizado** — Backlog Produto, sort: Prioridade ↓ Story Points ↓
- [ ] **Sem refinamento** — Backlog Produto, filter: Story Points=empty OR Descrição=empty
- [ ] **>90 dias (obrigatório)** — Backlog Produto+Bug Pool+Débito, filter: `Date created` before 90 days ago
- [ ] **Por KR** — Backlog Produto, group by KR vinculada
- [ ] **Roadmap Gantt** — Backlog Produto, by Due Date
- [ ] **Hoje** — Daily Standups, filter: Data=today, group by Assignee
- [ ] **Esta semana** — Daily Standups, Calendar view

### 5. Goals / OKRs (Playwright ou manual)
- [ ] Goals Folder: "Desenvolvimento 2026-Q2"
- [ ] Goal 1: Entregar valor previsível com qualidade (3 KRs)
- [ ] Goal 2: Elevar saúde técnica (3 KRs)

### 6. Automações (Manual via UI — ClickUp Automation Manager)
- [ ] Status → IN REVIEW → Notify Líder
- [ ] Tipo=Bug + Prioridade=P0 → Notify Líder + tag "hot"
- [ ] PR/MR criado (via integração) → Move para IN REVIEW
- [ ] PR merged → Move para SHIPPED + close task
- [ ] Task criada sem Story Point + entra em Sprint → Notify assignee + líder

### 7. Regra 90 dias — SEM AUTOMAÇÃO
Conforme decisão do usuário: implementada via **View filtrada + checklist no Sprint Planning**. Sem job externo / automação.

### 8. Integrações (Manual via UI — Space Settings)
- [ ] GitHub — conectar repos Nexuz
- [ ] GitLab — conectar repos Nexuz

### 9. Dashboards (Fase 2)
- [ ] Dashboard "Desenvolvimento — Sprint Atual" com 6 cards

---

## Conclusão

**Estado atual:** Estrutura hierárquica (Space + 4 Folders + 7 Lists) criada e operacional.

**Próximo passo recomendado:** Carlos pode continuar com os Custom Fields via MCP em iteração subsequente ou passar bastão para Rui revisar o que já foi feito.

**Workspace:** 3086998
**Space:** Desenvolvimento
**Template aplicado:** Produto + engenharia (statuses granulares 9-estágios)
