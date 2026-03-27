# Log de Configuração ClickUp — Nexuz Marketing

## Resumo
- **Data:** 2026-03-27
- **Departamento:** Marketing
- **Nível:** Mínimo (Hierarquia Spaces/Folders/Lists + Custom Statuses)
- **Total de operações:** 17
- **Sucesso (API):** 10 (hierarquia via API v2)
- **Sucesso (Playwright):** 6 (custom statuses via browser automation)
- **Recriado:** 1 (Space foi deletado e recriado)
- **Manual required:** 0

---

## Departamento: Marketing

### Space: Marketing
- [✅] Criado via API v2 — ID: `90174933917`
- Recriado após deleção do space anterior (ID: 90174933772)

### Folder: Conteúdo
- [✅] Criado via API — ID: `90177771231`
- [✅] Custom Statuses configurados via Playwright (nível Folder — herança automática para 4 Lists)
- Statuses: Backlog → Briefing → Em Produção → Revisão → Agendado → Publicado

#### List: Redes Sociais
- [✅] Criada via API — ID: `901712369683`
- Descrição: Posts, stories, reels para Instagram, LinkedIn, YouTube, TikTok
- [✅] Statuses herdados do Folder Conteúdo

#### List: Blog & Artigos
- [✅] Criada via API — ID: `901712369684`
- Descrição: Artigos de blog, cases de sucesso, conteúdo SEO
- [✅] Statuses herdados do Folder Conteúdo

#### List: Email Marketing
- [✅] Criada via API — ID: `901712369685`
- Descrição: Newsletters, automações de email, campanhas de nurturing
- [✅] Statuses herdados do Folder Conteúdo

#### List: Vídeos
- [✅] Criada via API — ID: `901712369686`
- Descrição: Vídeos tutoriais, cases, conteúdo para YouTube e Reels
- [✅] Statuses herdados do Folder Conteúdo

### Folder: Campanhas
- [✅] Criado via API — ID: `90177771232`
- [✅] Custom Statuses configurados via Playwright (nível Folder — herança automática para 2 Lists)
- Statuses: Planejamento → Em Execução → Pausada → Concluída

#### List: Campanhas Ativas
- [✅] Criada via API — ID: `901712369687`
- Descrição: Campanhas em andamento — lançamentos, promoções, sazonais
- [✅] Statuses herdados do Folder Campanhas

#### List: Campanhas Concluídas
- [✅] Criada via API — ID: `901712369688`
- Descrição: Arquivo de campanhas finalizadas
- [✅] Statuses herdados do Folder Campanhas

### List: Requests Internos (direto no Space)
- [✅] Criada via API — ID: `901712369689`
- Descrição: Pedidos de materiais de marketing de outros departamentos
- [✅] Custom Statuses configurados via Playwright (nível List)
- Statuses: Novo → Em Avaliação → Aceito → Em Produção → Entregue / Recusado

---

## Custom Statuses — Configurados Automaticamente

### Folder Conteúdo (Redes Sociais, Blog, Email, Vídeos)

| Status | Grupo | Cor |
|---|---|---|
| Backlog | Active | Cinza |
| Briefing | Active | Azul |
| Em Produção | Active | Amarelo |
| Revisão | Active | Laranja |
| Agendado | Active | Roxo |
| Publicado | Closed | Verde |

### Folder Campanhas (Campanhas Ativas, Campanhas Concluídas)

| Status | Grupo | Cor |
|---|---|---|
| Planejamento | Active | Azul |
| Em Execução | Active | Amarelo |
| Pausada | Active | Cinza |
| Concluída | Closed | Verde |

### List Requests Internos

| Status | Grupo | Cor |
|---|---|---|
| Novo | Active | Azul |
| Em Avaliação | Active | Amarelo |
| Aceito | Active | Verde |
| Em Produção | Active | Laranja |
| Entregue | Closed | Verde |
| Recusado | Done | Vermelho |

---

## IDs de Referência

| Recurso | ID |
|---|---|
| Workspace | 3086998 |
| Space: Marketing | 90174933917 |
| Folder: Conteúdo | 90177771231 |
| Folder: Campanhas | 90177771232 |
| List: Redes Sociais | 901712369683 |
| List: Blog & Artigos | 901712369684 |
| List: Email Marketing | 901712369685 |
| List: Vídeos | 901712369686 |
| List: Campanhas Ativas | 901712369687 |
| List: Campanhas Concluídas | 901712369688 |
| List: Requests Internos | 901712369689 |

---

## Notas Técnicas

- **Hierarquia criada via:** API v2 do ClickUp (curl direto)
- **Custom Statuses criados via:** Playwright browser automation (API v2 não suporta)
- **Token:** Salvo em `.env` como `CLICKUP_API_TOKEN`
- **Limitação superada:** Custom Statuses não podem ser criados via API v2 — resolvido com automação de browser
- **MCP ClickUp:** Usado para consultas, mas não suporta criação de Spaces nem modificação de statuses
- **Plano recomendado:** Unlimited ($7/user/mês) para Custom Fields ilimitados e 10.000 automações/mês
