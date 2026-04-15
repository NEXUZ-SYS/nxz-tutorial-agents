# Squad Memory — nxz-clickup-setup

_Este arquivo e atualizado automaticamente apos cada execucao do pipeline._

## Run 1: Marketing (2026-03-27)

### Resultado
- **Status:** Concluido com sucesso
- **Departamento:** Marketing
- **Nivel:** Minimo (Hierarquia + Custom Statuses)
- **Auditoria:** APPROVE (8.5/10)
- **Run ID:** 2026-03-27-172250

### O que foi criado
- 1 Space: Marketing (ID: 90174933917)
- 2 Folders: Conteudo (90177771231), Campanhas (90177771232)
- 7 Lists com descricoes
- 3 conjuntos de custom statuses

### Aprendizados Tecnicos
- **ClickUp MCP** nao suporta criacao de Spaces nem modificacao de statuses
- **API v2** nao suporta criacao/modificacao de custom statuses (limitacao documentada)
- **Playwright browser automation** resolve a limitacao de statuses — funciona bem via UI
- **Metodo hibrido ideal:** API v2 para hierarquia (Space/Folder/List) + Playwright para statuses
- Token API salvo em `.env` como `CLICKUP_API_TOKEN`
- Workspace ID: 3086998

### Decisoes de Design
- Folder Conteudo agrupa 4 Lists por canal (Redes Sociais, Blog, Email, Videos)
- Folder Campanhas separa ativas de concluidas
- Requests Internos como List solta no Space (sem Folder proprio)
- Statuses configurados no nivel Folder para heranca automatica
- Calendar View e Custom Fields ficaram para fase 2

### Proxima Execucao
- Usuario quer rodar para outros departamentos (Vendas, Suporte, Dev, Financeiro, RH)
- Seguir mesma abordagem: 1 departamento por vez
- Reusar o metodo hibrido (API + Playwright) para configuracao

## Run 2: Desenvolvimento/Produtos (2026-04-14)

### Resultado
- **Status:** Concluido (APPROVE WITH FOLLOW-UP)
- **Departamento:** Desenvolvimento (Produtos)
- **Nivel:** Completo solicitado, parcialmente entregue
- **Auditoria:** 7.0/10
- **Run ID:** 2026-04-14-212411

### O que foi criado via UI/MCP
- Space: Desenvolvimento (ID: 90178184335) — template "Produto + engenharia"
- Statuses granulares: BACKLOG > SCOPING > IN DESIGN > IN DEVELOPMENT > IN REVIEW > TESTING > READY FOR DEV > SHIPPED > CANCELLED
- 4 Folders: Sprints Produto (90178184338), Backlog & Roadmap (90178184341), Ritos & Operacao (90178184343), Docs Tecnicas (90178184346)
- 7 Lists: Sprint Atual, Backlog Produto, Bug Pool, Debito Tecnico, Daily Standups, Retros & Reviews, ADRs & RFCs
- Custom Fields ativados na Sprint Atual: Pontos do Sprint (nativo), Sprints (nativo), Tipo (dropdown: Bug/Feature/Inovacao/Debito Tecnico)

### Pendente (documentado em usage-guide.md)
- Sprint ClickApp settings + Sprint Folder settings (1 week, rollover)
- Custom Fields restantes (Prioridade P0-P3, KR vinculada, Repositorio, Repo URL, Age Formula, Risco, Ambiente)
- Fields especificos de Daily e Retros
- 12 Views customizadas (Gantt, Kanban, Bugs 20%, >90 dias, etc)
- Goals/OKRs (2 Objectives x 3 KRs)
- 5 Automacoes
- Integracoes GitHub + GitLab
- Dashboard (Fase 2)

### Aprendizados Tecnicos
- MCP ClickUp **nao cria Custom Fields/Views/Automacoes** - so le (get_custom_fields)
- Playwright via playwright-cli funciona bem para UI, mas lento para volume (150+ interacoes estimadas para tudo)
- Template "Produto + engenharia" do ClickUp traz fluxo pronto - aceitar statuses granulares foi bom trade-off
- Playwright MCP (via .mcp.json) estava headless por default - tem que editar _opensquad/config/playwright.config.json
- playwright-cli suporta --config arg com arquivo temporario e flag --persistent
- Formula+TODAY() no ClickUp nao filtra nem dispara automacao - regra 90d via "Date Created before 90 days ago" view

### Decisoes do Usuario
- Daily via Lista dedicada (tasks diarias por membro)
- OKR binding via Goals nativo + custom field Relationship
- Regra 90d via View filtrada + checklist no planning (sem automacao)
- Privacidade Space: Publico no workspace
- Statuses granulares do template "Produto + engenharia" (nao simplificados)
- Automacao via Playwright para pendencias manuais
- Encerramento antecipado do Step 06 - guia manual foi mais eficiente que continuar Playwright

### Proxima Execucao
- Finalizar departamentos restantes: Vendas, Suporte, Financeiro, CS (Marketing e Dev ja configurados)
- Considerar: oferecer script Node.js com Personal API Token do ClickUp para acelerar volume de Custom Fields
