# Pesquisa ClickUp — Departamentos Selecionados

## Departamento: Marketing

### Funcionalidades Recomendadas

| Funcionalidade | Descrição | Plano Requerido | Confiança |
|---|---|---|---|
| Custom Fields ilimitados | Campos personalizados para campanhas, tipos de conteúdo, canais | Unlimited+ | Alta |
| Automações (10.000/mês) | Automações de status, atribuição e notificação | Unlimited+ | Alta |
| Goals / OKRs | Rastreamento de objetivos e key results com targets mensuráveis | Unlimited+ | Alta |
| Calendar View | Visualização de calendário editorial e campanhas | Free (limitado) | Alta |
| Board View (Kanban) | Arrastar tarefas entre estágios do workflow | Free | Alta |
| Gantt Chart | Planejamento de campanhas com dependências e milestones | Unlimited+ | Alta |
| Timeline View | Visão de linha do tempo para planejamento cross-campaign | Business+ | Média |
| Workload View | Monitoramento de capacidade da equipe | Business+ | Alta |
| Dashboards avançados | Painéis com métricas de campanha e progresso | Unlimited+ | Alta |
| Forms | Formulários para requests internos de marketing/criativo | Free (limitado) | Alta |
| Docs / Wiki | Documentação de processos, briefs de campanha, SOPs | Free | Alta |
| Proofing | Comentários diretamente em imagens/documentos para aprovação | Business+ | Média |
| Integração HubSpot | Sync CRM, tickets e pipeline | Unlimited+ | Alta |
| Integração Figma | Embed de protótipos interativos em tasks e docs | Free | Alta |
| Integração Google Drive | Anexar e sincronizar arquivos do Drive | Free | Alta |
| Integração Zapier | Conexão com centenas de apps (Google Analytics via Zapier) | Free (limitado) | Alta |
| ClickUp AI | Assistência na criação de conteúdo, resumos, brainstorming | Add-on $7/user/mês (qualquer plano pago) | Média |

### Hierarquia / Estrutura de Folders Sugerida

```
Workspace: Nexuz
└── Space: Marketing
    ├── Folder: Campanhas
    │   ├── List: [Nome da Campanha 1] (ex: Lançamento Módulo Delivery)
    │   ├── List: [Nome da Campanha 2] (ex: Black Friday 2026)
    │   └── List: [Campanha Arquivada] (arquivar ao concluir)
    ├── Folder: Marketing Management
    │   ├── List: Conteúdo (blog, artigos, cases)
    │   ├── List: Redes Sociais (posts, stories, reels)
    │   ├── List: Email Marketing (newsletters, automações)
    │   ├── List: Website (landing pages, SEO, atualizações)
    │   ├── List: Criativos (design, vídeos, materiais)
    │   └── List: Requests Recebidos (Form view para pedidos internos)
    ├── Folder: Calendário Editorial
    │   ├── List: Blog
    │   ├── List: Social Media
    │   ├── List: Email Newsletter
    │   └── List: Vídeo
    └── Folder: Interno
        ├── List: Reuniões
        ├── List: Documentação / SOPs
        └── List: Biblioteca de Processos (templates reutilizáveis)
```

**Fonte:** [Organize your Workspace Hierarchy for marketing teams](https://help.clickup.com/hc/en-us/articles/9907965431191-Organize-your-Workspace-Hierarchy-for-marketing-teams) e [ZenPilot — ClickUp for Internal Marketing Teams](https://www.zenpilot.com/blog/clickup-for-internal-marketing-teams)

### Workflow Sugerido

**Statuses (fluxo principal para conteúdo/campanhas):**

```
Backlog → Briefing → Em Produção → Revisão Interna → Aprovação → Agendado → Publicado → Concluído
```

Statuses alternativos para controle:
- `Bloqueado` — dependência externa ou aguardando recurso
- `Cancelado` — descartado

**Detalhamento das transições:**

| De | Para | Gate / Ação |
|---|---|---|
| Backlog | Briefing | Atribuir responsável, preencher brief |
| Briefing | Em Produção | Brief aprovado, deadline definido |
| Em Produção | Revisão Interna | Conteúdo/criativo anexado à task |
| Revisão Interna | Aprovação | Feedback incorporado, versão final pronta |
| Aprovação | Agendado | Aprovado por gestor/cliente interno |
| Agendado | Publicado | Data de publicação atingida |
| Publicado | Concluído | Métricas registradas (opcional) |

### Custom Fields

| Campo | Tipo | Valores / Uso |
|---|---|---|
| Canal | Dropdown | Social Media, Blog, Email, Ads, Eventos, Parcerias, Website |
| Tipo de Conteúdo | Dropdown | Post, Story/Reel, Artigo, Newsletter, Landing Page, Vídeo, Case Study, Infográfico, Podcast |
| Categoria de Trabalho | Dropdown | Conteúdo, Criativo, Website, Social, Email, Ads |
| Campanha | Dropdown | (lista dinâmica das campanhas ativas — ex: Lançamento Delivery, Black Friday) |
| Responsável por Entrega (Delivery Role) | Dropdown | Redator, Designer, Videomaker, Estrategista, Social Media, Gestor |
| Plataforma | Dropdown | Instagram, LinkedIn, YouTube, TikTok, Blog Nexuz, Email, Google Ads, Meta Ads |
| Palavra-chave SEO | Text | Keyword alvo para conteúdo otimizado |
| Data de Publicação | Date | Data programada para go-live |
| Link do Conteúdo Final | URL | Link para o conteúdo publicado |
| Rascunho | URL/Files | Link ou anexo do rascunho |
| Referência | URL/Files | Material de referência (briefing, benchmark) |
| Aprovação | Dropdown / Label | Pendente, Aprovado, Reprovado |
| Orçamento | Money/Number | Valor investido (para campanhas pagas) |

**Fonte:** [Use Custom Fields for marketing teams](https://help.clickup.com/hc/en-us/articles/9914837085079-Use-Custom-Fields-for-marketing-teams) e [ZenPilot Guide](https://www.zenpilot.com/blog/clickup-for-internal-marketing-teams)

### Automacoes Recomendadas

| # | Trigger | Action | Descrição |
|---|---|---|---|
| 1 | Status muda para "Revisão Interna" | Reatribuir ao revisor + comentário com instruções | Quando o criador finaliza o rascunho, a task é automaticamente atribuída ao revisor designado com um comentário modelo solicitando feedback |
| 2 | Status muda para "Aprovação" | Reatribuir ao gestor/aprovador + notificação | Escala a task para aprovação do gestor de marketing, garantindo que não fique parada |
| 3 | Status muda para "Aprovado" (Aprovação → Agendado) | Reatribuir ao publicador + definir due date (2 dias) | Após aprovação, atribui automaticamente ao responsável pela publicação com prazo |
| 4 | Task criada em lista de Campanha | Aplicar campo "Campanha" automaticamente | Preenche o Custom Field "Campanha" com o nome da lista/campanha correspondente |
| 5 | Task criada (qualquer lista de conteúdo) | Aplicar task template do tipo de conteúdo | Aplica template com subtasks, checklists e SOPs baseado no tipo de deliverable |
| 6 | Due date chegando (1 dia antes) | Enviar notificação/email ao assignee | Lembrete automático para evitar atrasos em publicações agendadas |
| 7 | Task fica overdue | Reatribuir ao gestor + comentário de alerta | Escalação automática quando prazo é ultrapassado |
| 8 | Prioridade alterada para "Urgent" | Atribuir ao gestor + definir due date (1 dia) | Tasks urgentes são escaladas imediatamente com prazo agressivo |
| 9 | Status muda para "Publicado" | Criar subtask "Registrar Métricas" | Ao publicar, gera automaticamente uma subtask para acompanhamento de resultados |
| 10 | Custom Field "Canal" alterado | Reatribuir ao especialista do canal | Quando o canal muda, a task é redirecionada ao especialista correspondente |

**Nível recomendado:** Automações 1-3 e 6-7 no nível de Folder (aplicam a todas as listas). Automação 4 no nível de List (específica por campanha). Automações 5, 8-10 no nível de Space ou Folder conforme necessidade.

**Fonte:** [Use Automations for marketing teams](https://help.clickup.com/hc/en-us/articles/9916765876119-Use-Automations-for-marketing-teams) e [ClickUp Automation Examples](https://clickup.com/blog/automation-examples/)

### Views Otimizadas

| View | Tipo | Justificativa |
|---|---|---|
| Calendário Editorial | Calendar View | Visualizar todas as publicações programadas por data. Filtrar por canal ou plataforma. Essencial para equipe de conteúdo e social media. |
| Pipeline de Conteúdo | Board View (por Status) | Kanban drag-and-drop para mover tasks entre estágios (Backlog → Publicado). Visão rápida do estado de cada peça. |
| Campanha Tracker | List View (filtrado por Campanha) | Agrupar por status para ver progresso de cada campanha. Ideal para gestores acompanharem múltiplas iniciativas. |
| Minhas Tarefas | List View (filtrado por Assignee = Me) | Cada membro vê apenas suas tasks, agrupadas por due date. Foco individual. |
| Timeline de Campanhas | Gantt View | Planejamento de longo prazo com dependências entre tasks. Visualizar sobreposições e gargalos. |
| Carga de Trabalho | Workload View | Gestor monitora capacidade da equipe com base em time estimates. Identificar sobrecarga. (Requer Business+) |
| Dashboard de Marketing | Dashboard | Widgets com tasks por status, overdue, por campanha, e métricas. Visão executiva. |
| Requests Recebidos | Form View | Formulário para equipes internas solicitarem materiais de marketing. Gera task automaticamente na lista de Requests. |

**Fonte:** [ClickUp for marketing teams](https://help.clickup.com/hc/en-us/sections/9757919969943-ClickUp-for-marketing-teams)

### OKRs Sugeridos (para Nexuz — SaaS Food Service)

**Objective 1: Aumentar a geração de leads qualificados pelo marketing digital**
- KR1: Aumentar tráfego orgânico do site em 40% no trimestre (baseline atual → meta)
- KR2: Gerar 200 leads qualificados (MQLs) por mês via landing pages e conteúdo
- KR3: Alcançar taxa de conversão de 5% em páginas de captura

**Objective 2: Fortalecer a presença e engajamento nas redes sociais**
- KR1: Crescer seguidores no Instagram em 30% no trimestre
- KR2: Atingir taxa de engajamento média de 4% nos posts (curtidas + comentários / alcance)
- KR3: Publicar 12 conteúdos educativos por mês (posts sobre ERP, autoatendimento, KDS, delivery)

**Objective 3: Posicionar a Nexuz como referência em tecnologia para food service**
- KR1: Publicar 8 artigos de blog otimizados para SEO por mês
- KR2: Produzir 2 cases de sucesso de clientes por trimestre
- KR3: Alcançar 3 menções ou parcerias de mídia especializada no trimestre

**Objective 4: Otimizar a eficiência operacional do time de marketing**
- KR1: Reduzir tempo médio de produção de conteúdo de X dias para Y dias
- KR2: Atingir 95% de entregas dentro do prazo (on-time delivery rate)
- KR3: Implementar 10 automações no ClickUp para eliminar trabalho manual repetitivo

**Fonte:** [How to Set Marketing OKRs](https://clickup.com/blog/marketing-okrs/) e [ClickUp OKR Examples](https://clickup.com/blog/okr-examples/)

### Integrações Recomendadas

| Integração | Função | Plano Requerido |
|---|---|---|
| HubSpot | Sync de CRM, leads e pipeline de vendas com tasks de marketing | Unlimited+ |
| Figma | Embed de protótipos e designs dentro de tasks para revisão | Free |
| Google Drive | Anexar e sincronizar documentos, planilhas, apresentações | Free |
| Slack | Notificações de tasks, atualizações de status e comentários no canal do time | Free |
| Zapier | Conectar com Google Analytics, Meta Ads, Mailchimp e centenas de apps | Free (limitado) |
| Google Calendar | Sincronizar deadlines do ClickUp com calendário pessoal | Free |
| GitHub | Vincular PRs e commits a tasks de marketing (para landing pages, website) | Free |
| Loom | Incorporar vídeos de feedback e explicações em tasks | Free |

**Fonte:** [Integrations for marketing teams](https://help.clickup.com/hc/en-us/articles/9915577759639-Integrations-for-marketing-teams)

### Templates Oficiais Recomendados

1. **Quick Start: Marketing** — Template de Space completo para começar rapidamente
2. **Marketing Team Operations** — Espaço pronto com folders, lists e views configurados
3. **Marketing Campaign Management** — 7 statuses, 11 custom fields, 7 views incluindo Budget Tracker
4. **Marketing Content Calendar** — 8 views incluindo Board, Calendar, Timeline e Gantt
5. **Social Media Strategy Workflow** — Workflow específico para social media
6. **OKR Framework** — Template para configurar Goals e OKRs no ClickUp

**Fonte:** [Use templates for marketing teams](https://help.clickup.com/hc/en-us/articles/9911535033495-Use-templates-for-marketing-teams)

### Notas sobre Planos e Limitações

| Plano | Preço (anual) | Automações/mês | Custom Fields | Goals | Storage |
|---|---|---|---|---|---|
| Free Forever | $0 | 100 ações | Limitado | Limitado | 60 MB |
| Unlimited | $7/user/mês | 10.000 ações | Ilimitado | Ilimitado | Ilimitado |
| Business | $12/user/mês | ~100.000 ações | Ilimitado | Ilimitado | Ilimitado |
| Enterprise | Sob consulta | Ilimitado | Ilimitado | Ilimitado | Ilimitado |

**Recomendação para Nexuz:** O plano **Unlimited** ($7/user/mês anual) atende todas as necessidades listadas nesta pesquisa para o departamento de Marketing, incluindo Custom Fields ilimitados, 10.000 automações/mês, Goals/OKRs, Gantt, e integração com HubSpot.

### Gaps Identificados

1. **Workflow Transitions direcionais** — ClickUp ainda não suporta nativamente a restrição de transições entre statuses (ex: impedir que alguém mova de "Backlog" direto para "Publicado"). Está em feature request.
2. **Google Analytics nativo** — Não há integração direta. Necessário usar Zapier ou embed em Dashboard.
3. **Aprovação formal com sign-off** — O sistema de aprovação é baseado em statuses e automações, não há um módulo formal de aprovação com assinatura digital.
4. **Proofing** — Funcionalidade de revisão visual disponível apenas no plano Business+.

---

## Sources

### Fontes Oficiais ClickUp (help.clickup.com)
- [Organize your Workspace Hierarchy for marketing teams](https://help.clickup.com/hc/en-us/articles/9907965431191-Organize-your-Workspace-Hierarchy-for-marketing-teams)
- [Use Custom Fields for marketing teams](https://help.clickup.com/hc/en-us/articles/9914837085079-Use-Custom-Fields-for-marketing-teams)
- [Use Automations for marketing teams](https://help.clickup.com/hc/en-us/articles/9916765876119-Use-Automations-for-marketing-teams)
- [Use templates for marketing teams](https://help.clickup.com/hc/en-us/articles/9911535033495-Use-templates-for-marketing-teams)
- [ClickUp for marketing teams overview](https://help.clickup.com/hc/en-us/articles/9907519621399-ClickUp-for-marketing-teams-overview)
- [Integrations for marketing teams](https://help.clickup.com/hc/en-us/articles/9915577759639-Integrations-for-marketing-teams)
- [Forms for marketing teams](https://help.clickup.com/hc/en-us/articles/9917409028759-Forms-for-marketing-teams)
- [Use Docs for marketing teams](https://help.clickup.com/hc/en-us/articles/9917270167703-Use-Docs-for-marketing-teams)
- [Use ClickUp to track goals and OKRs](https://help.clickup.com/hc/en-us/articles/6327987972119-Use-ClickUp-to-track-goals-and-OKRs)
- [Intro to Automations](https://help.clickup.com/hc/en-us/articles/6312102752791-Intro-to-Automations)
- [HubSpot integration](https://help.clickup.com/hc/en-us/articles/7925934313111-HubSpot-integration)
- [Figma integration](https://help.clickup.com/hc/en-us/articles/13648563810711-Figma-integration)

### Blog ClickUp (clickup.com/blog)
- [How to Set Marketing OKRs (With 30 Examples)](https://clickup.com/blog/marketing-okrs/)
- [How to Create a Content Calendar in ClickUp](https://clickup.com/blog/how-to-create-a-content-calendar-in-clickup/)
- [Guide to Automations in ClickUp (With 10 Use Case Examples)](https://clickup.com/blog/automation-examples/)
- [OKR Examples](https://clickup.com/blog/okr-examples/)
- [Marketing Workflow Tools](https://clickup.com/blog/marketing-workflow-tools/)
- [Content Marketing Projects](https://clickup.com/blog/content-marketing-projects/)
- [Organize Content Calendar by Campaign](https://clickup.com/blog/organize-content-calendar-by-campaign/)

### Templates ClickUp
- [Marketing Campaign Management Template](https://clickup.com/templates/marketing-campaign-management-t-200523911)
- [Marketing Content Calendar Template](https://clickup.com/templates/content-calendar/marketing)
- [Marketing Team Operations Template](https://clickup.com/templates/marketing-team-operations-t-32296499)
- [Social Media Strategy Workflow Template](https://clickup.com/templates/social-media-strategy-workflow-t-200549659)
- [OKR Framework Template](https://clickup.com/templates/okr-framework-t-234154748)

### Fontes Secundárias
- [ZenPilot — ClickUp for Internal Marketing Teams: The Ultimate Guide](https://www.zenpilot.com/blog/clickup-for-internal-marketing-teams)
- [ConsultEvo — ClickUp Marketing Calendar Guide](https://consultevo.com/clickup-marketing-calendar-how-to-3/)
- [ClickUp Pricing Plans](https://clickup.com/pricing)
