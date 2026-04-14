# ClickUp Hierarchy Design Patterns

## The four levels

ClickUp's hierarchy is: **Workspace → Space → Folder → List → Task**. Stop at Task for structure; use checklists and subtasks for granularity.

## Rules

### 1. One Workspace per company
Never split. Cross-workspace views are limited; cross-workspace automations don't exist. A single workspace keeps search, reporting, and permissions coherent.

### 2. One Space per department
Marketing, Vendas, Suporte, RH, Produto. Not per-team (too granular), not per-project (too ephemeral). A Space should represent a permanent business function.

Exceptions:
- "Operações internas" catch-all Space for cross-functional process (onboarding, compliance)
- "Clientes" Space if the company's core model is per-client delivery (agencies)

### 3. Folders group processes that share a workflow
If two Lists have the same status flow, put them in the same Folder and configure statuses **at the Folder level** — Lists inherit. Example: `Vendas / CRM / {Leads & Deals, Contas, Contatos}` all share the CRM status flow.

Single-List Folders are waste — collapse to a folderless List directly in the Space.

### 4. Lists represent a workflow or a backlog
A List is where tasks live and where Custom Fields attach. Keep Lists narrow enough that every task in them follows the same process. If half the tasks in a List never use half the fields, split the List.

### 5. Never use generic "To Do / In Progress / Done"
Custom statuses are where the magic happens. Examples:
- CRM: `Lead novo / Qualificado / Primeiro contato / Apresentação / Proposta enviada / Fechado ganho / Fechado perdido / Nutrição`
- Conteúdo: `Backlog / Briefing / Produção / Revisão / Agendado / Publicado`
- Suporte: `Novo / Triagem / Em atendimento / Aguardando cliente / Resolvido / Monitorando`

Minimum 3 statuses (opening / working / closed). Status names should be action-oriented and unambiguous.

## Naming

- Use the company's native language (Portuguese for Brazilian users)
- Use full words: "Leads & Deals" not "L&D"
- Consistent casing: "Vendas" not "vendas" and not "VENDAS"
- Emojis sparingly — only for top-level Spaces or Docs if the company uses them elsewhere

## Incremental rollout

Don't set up everything at once. Phased approach:

**Phase 1 — Minimum viable**
- Hierarchy (Spaces, Folders, Lists)
- Custom statuses
- 3-5 essential Custom Fields per List
- Default task types
- 2-3 essential Views (Pipeline, Esta semana, etc.)

Let the team use Phase 1 for **at least one week** before Phase 2.

**Phase 2 — Automation & insight**
- Remaining Custom Fields
- Automations (start with time-in-status alerts, add status-change reactions later)
- Dashboards
- Goals / OKRs
- Cross-list relationships

**Phase 3 — Polish**
- Document pages filled with playbooks, scripts, templates
- SLA dashboards
- Cross-space automations

## Anti-patterns

### Anti: deep nesting via subtasks
Subtasks should represent "work that can be done together with the parent," not "another layer of hierarchy." If you need another level, create a Folder or List.

### Anti: Custom Fields as status substitutes
If you're using a checkbox or dropdown to track progress, it should be a status. Fields are for attributes (CNPJ, Valor proposto, Canal).

### Anti: one giant Space with 40 Lists
Hard to browse, slow to load, painful for permissions. Split into departmental Spaces.

### Anti: copying the org chart into ClickUp
Org charts change; business functions change more slowly. Organize by process, not by reporting line.

## Recovery patterns

### "The statuses are wrong, we already have tasks"
ClickUp preserves tasks when statuses change. You can:
1. Add new statuses alongside the old ones
2. Bulk-move tasks to the new names
3. Delete the old statuses

Do this via Playwright (the API can't touch statuses) — see `references/playwright-patterns.md`.

### "We need to split a Space"
1. Create the new Space via API v2
2. Move Folders between Spaces via the UI (or `POST /folder/{id}/folder_move` if it exists — verify before relying on it)
3. Automations do NOT move automatically — recreate them in the destination

### "We over-engineered and need to simplify"
Archive first, delete later. `DELETE /space/{id}` is permanent. Archiving gives you a week to reconsider.
