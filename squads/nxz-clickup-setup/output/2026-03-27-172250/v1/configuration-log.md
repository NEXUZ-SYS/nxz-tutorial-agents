# Log de Configuração ClickUp — Nexuz Marketing

## Resumo
- **Data:** 2026-03-27
- **Departamento:** Marketing
- **Nível:** Mínimo (Hierarquia Spaces/Folders/Lists)
- **Total de operações:** 10
- **Sucesso (API):** 8
- **Já existia:** 1 (Space)
- **Manual required:** 1 (Custom Statuses — API limitation)

---

## Departamento: Marketing

### Space: Marketing
- [✅] Já existia — ID: `90174933772`
- Criado manualmente pelo usuário antes da execução

### Folder: Conteúdo
- [✅] Criado via API — ID: `90177771029`

#### List: Redes Sociais
- [✅] Criada via API — ID: `901712369311`
- Descrição: Posts, stories, reels para Instagram, LinkedIn, YouTube, TikTok
- Statuses atuais: to do → complete (padrão)
- [⚠️ MANUAL] Statuses customizados necessários (ver abaixo)

#### List: Blog & Artigos
- [✅] Criada via API — ID: `901712369313`
- Descrição: Artigos de blog, cases de sucesso, conteúdo SEO
- [⚠️ MANUAL] Statuses customizados necessários (ver abaixo)

#### List: Email Marketing
- [✅] Criada via API — ID: `901712369314`
- Descrição: Newsletters, automações de email, campanhas de nurturing
- [⚠️ MANUAL] Statuses customizados necessários (ver abaixo)

#### List: Vídeos
- [✅] Criada via API — ID: `901712369315`
- Descrição: Vídeos tutoriais, cases, conteúdo para YouTube e Reels
- [⚠️ MANUAL] Statuses customizados necessários (ver abaixo)

### Folder: Campanhas
- [✅] Criado via API — ID: `90177771031`

#### List: Campanhas Ativas
- [✅] Criada via API — ID: `901712369316`
- Descrição: Campanhas em andamento — lançamentos, promoções, sazonais
- [⚠️ MANUAL] Statuses customizados necessários (ver abaixo)

#### List: Campanhas Concluídas
- [✅] Criada via API — ID: `901712369317`
- Descrição: Arquivo de campanhas finalizadas
- [⚠️ MANUAL] Statuses customizados necessários (ver abaixo)

### List: Requests Internos (direto no Space)
- [✅] Criada via API — ID: `901712369318`
- Descrição: Pedidos de materiais de marketing de outros departamentos
- [⚠️ MANUAL] Statuses customizados necessários (ver abaixo)

---

## Ações Manuais Pendentes: Custom Statuses

A API do ClickUp **não suporta criação/modificação de statuses programaticamente**. Esta é uma limitação documentada da API v2.

### Statuses para Lists de Conteúdo (Redes Sociais, Blog, Email, Vídeos)

Configurar no Space Marketing → Folder Conteúdo → cada List:

| Status | Grupo | Cor sugerida |
|---|---|---|
| Backlog | Active | Cinza |
| Briefing | Active | Azul |
| Em Produção | Active | Amarelo |
| Revisão | Active | Laranja |
| Agendado | Active | Roxo |
| Publicado | Closed | Verde |

**Dica:** Configure os statuses no **Folder Conteúdo** (nível de Folder) para que todas as 4 Lists herdem automaticamente.

### Statuses para Campanhas Ativas e Concluídas

| Status | Grupo | Cor sugerida |
|---|---|---|
| Planejamento | Active | Azul |
| Em Execução | Active | Amarelo |
| Pausada | Active | Cinza |
| Concluída | Closed | Verde |

**Dica:** Configure no **Folder Campanhas** para herança automática.

### Statuses para Requests Internos

| Status | Grupo | Cor sugerida |
|---|---|---|
| Novo | Active | Azul |
| Em Avaliação | Active | Amarelo |
| Aceito | Active | Verde claro |
| Em Produção | Active | Laranja |
| Entregue | Closed | Verde |
| Recusado | Closed | Vermelho |

---

## IDs de Referência

| Recurso | ID |
|---|---|
| Workspace | 3086998 |
| Space: Marketing | 90174933772 |
| Folder: Conteúdo | 90177771029 |
| Folder: Campanhas | 90177771031 |
| List: Redes Sociais | 901712369311 |
| List: Blog & Artigos | 901712369313 |
| List: Email Marketing | 901712369314 |
| List: Vídeos | 901712369315 |
| List: Campanhas Ativas | 901712369316 |
| List: Campanhas Concluídas | 901712369317 |
| List: Requests Internos | 901712369318 |

---

## Notas Técnicas

- **Método usado:** API v2 do ClickUp via curl (o MCP não suporta criação de Spaces)
- **Token:** Salvo em `.env` como `CLICKUP_API_TOKEN`
- **Limitação principal:** Custom Statuses não podem ser criados via API — é a feature request mais votada da API do ClickUp
- **Plano recomendado:** Unlimited ($7/user/mês) para Custom Fields ilimitados e 10.000 automações/mês
