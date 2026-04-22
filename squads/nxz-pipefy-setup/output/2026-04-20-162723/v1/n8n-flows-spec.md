# N8N Flows Spec — Automações Pipefy Pipe Vendas

**Versão:** 2.0 · 2026-04-22
**Destino:** `n8n.nexuz.app` (instância Nexuz)
**Pipefy pipe:** Vendas (307117441)
**Canal Discord:** `#Comercial` (notificações internas)

Este documento é handoff para uma futura squad `nxz-n8n-setup`.

## Histórico de revisões
- **v1.0** — Previa 8 workflows (4 schedulers + 4 webhook receivers)
- **v2.0** — 2 automações Pipefy deletadas (A-07/A-09 redundantes com notificações nativas). URLs dos webhooks restantes apontadas para n8n.nexuz.app. Escopo n8n reduzido para **6 workflows** (4 schedulers + 2 webhook receivers).

---

## 1. Decisões arquiteturais (leia primeiro)

### 1.1 Notificações nativas Pipefy cobrem SLA para assignees

Pipefy tem sistema de notificação in-app (sino + email) que **dispara automaticamente** para o assignee (`Ops responsável`) quando SLA `late` ou `expired` é atingido. **Não requer automação customizada.**

Como consequência:
- **A-07 (Qualif expired) → DELETADA** — era redundante com notificação nativa
- **A-09 (Proposta expired) → DELETADA** — idem

O Ops responsável recebe notificação nativa quando o card dele estoura SLA. Não precisa de webhook adicional.

### 1.2 Quando AINDA faz sentido webhook

Apenas quando precisa alertar **pessoas que NÃO são assignees** do card. Casos:
- **A-11** — Fechamento late: Financeiro e Gestão precisam saber (não são os Ops)
- **A-14** — Feedback indicador: mandamos pro time comercial ver quem indicou precisa de retorno

Essas 2 mantêm `send_http_request`. Apontam para `n8n.nexuz.app/webhook/pipefy/*` (já reapontado via `updateAutomation` em 2026-04-22).

### 1.3 Limitação `send_a_task` × `sla_based`

O action `send_a_task` do Pipefy tem `eventsBlacklist: ['scheduler', 'sla_based', 'card_left_phase']`. Portanto **não é possível usar send_a_task com SLA triggers** — por isso A-07/09/11/14 não podem migrar para send_a_task.

### 1.4 Limitação `scheduler` event

Event `scheduler` tem `actionsBlacklist` que bloqueia `send_email_template`, `send_http_request`, `update_card_field`. Só aceita `schedule_create_card`. Por isso A-16 (daily ping) precisa de cron externo.

---

## 2. Arquitetura final (pós-revisão)

```
Pipefy (Pipe Vendas, 9 automações ativas)
   │
   ├── A-01..A-03 → update_card_field (marcos temporais, nativo)
   ├── A-04, A-08 → send_email_template (emails para LEADS via SLA)
   ├── A-11 → send_http_request → n8n.nexuz.app/webhook/pipefy/alerta-fechamento-late
   ├── A-12 → send_email_template (desconto > 15% alerta Gestão)
   ├── A-13 → move_single_card (GANHO automático)
   └── A-14 → send_http_request → n8n.nexuz.app/webhook/pipefy/feedback-indicador

n8n.nexuz.app (6 workflows)
   ├── Schedulers (cron):
   │    ├── pipefy-qualif-d3-cadence    — cron 09:00 → SMTP → LEAD
   │    ├── pipefy-qualif-d7-cadence    — cron 09:00 → SMTP → LEAD
   │    ├── pipefy-proposta-15d-alert   — cron 09:00 → Discord #Comercial
   │    └── pipefy-daily-healthcheck    — cron 08:00 → Discord #Comercial
   └── Webhook receivers (chamados pelo Pipefy):
        ├── pipefy-alerta-fechamento-late  → Discord #Comercial (+ @mention Fin/Gestão)
        └── pipefy-feedback-indicador      → Discord #Comercial (+ future: email indicador)

Pipefy Native Notifications (automático, zero automação)
   └── Assignee (Ops responsável) recebe sino + email em:
        - card_late / card_expired (SLA)
        - card atribuído a ele
        - @mention em comentário
```

---

## 3. Inventário de workflows a criar no n8n (6 total)

### 3.1 Schedulers (cron-based) — 4 flows

| ID | Nome no n8n | Cron | Tipo |
|---|---|---|---|
| **A-05** | `pipefy-qualif-d3-cadence` | `0 9 * * *` (09:00 BRT) | SMTP → LEAD |
| **A-06** | `pipefy-qualif-d7-cadence` | `0 9 * * *` | SMTP → LEAD |
| **A-10** | `pipefy-proposta-15d-alert` | `0 9 * * *` | Discord interno |
| **A-16** | `pipefy-daily-healthcheck` | `0 8 * * *` (08:00 BRT) | Discord interno |

### 3.2 Webhook receivers — 2 flows

| ID Pipefy | URL configurada no Pipefy | Nome no n8n | Destino |
|---|---|---|---|
| A-11 | `https://n8n.nexuz.app/webhook/pipefy/alerta-fechamento-late` ✅ | `pipefy-alerta-fechamento-late` | Discord #Comercial |
| A-14 | `https://n8n.nexuz.app/webhook/pipefy/feedback-indicador` ✅ | `pipefy-feedback-indicador` | Discord #Comercial |

**✅ URLs já atualizadas no Pipefy** em 2026-04-22 via `updateAutomation`.

---

## 3. Pré-requisitos no n8n

Antes de criar qualquer workflow, configurar:

### 3.1 Credentials

| Credencial | Tipo | Valores |
|---|---|---|
| `pipefy-api` | HTTP Header Auth | Header `Authorization: Bearer {{PIPEFY_API_TOKEN}}` |
| `pipefy-internal-api` | HTTP Header Auth | Para `graphql/core` endpoints internos (mesmo token) |
| `discord-comercial` | Discord Webhook | URL do webhook do canal `#Comercial` (criar em Server Settings → Integrations → Webhooks) |
| `smtp-nexuz` | SMTP | Para A-05/A-06 enviarem emails externos. Host, user, password, porta, sender `nxz@nxz.one`. |

### 3.2 Variáveis globais

Criar em **Settings → Variables**:

```env
PIPEFY_PIPE_VENDAS_ID=307117441
PIPEFY_ORG_ID=302461450
PIPEFY_PHASE_QUALIFICACAO=342928170
PIPEFY_PHASE_PROPOSTA=342928173
PIPEFY_PHASE_FECHAMENTO=342928174
PIPEFY_PHASE_NOVO_LEAD=342928169
PIPEFY_PHASE_GANHO=342928175
PIPEFY_PHASE_DESCARTE=342928176
PIPEFY_ET_QUALIF_D1=309594743
PIPEFY_ET_QUALIF_D3=309594744
PIPEFY_ET_QUALIF_D7=309594745
PIPEFY_ET_PROPOSTA_D3=309594746
DISCORD_COMERCIAL_WEBHOOK={{set via credential}}
PIPEFY_FROM_EMAIL=nxz@nxz.one
PIPEFY_FROM_NAME=Equipe Nexuz
```

### 3.3 Idempotência — evitar re-envios

Criar uma tabela/KV store (Postgres, SQLite, ou n8n Data Store) com schema:

```sql
CREATE TABLE n8n_pipefy_idempotency (
  rule_id VARCHAR(16),         -- 'A-05', 'A-06', 'A-10', etc.
  card_id VARCHAR(16),
  executed_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (rule_id, card_id, DATE(executed_at))
);
```

Cada flow consulta esta tabela antes de enviar email/notificação.

---

## 4. Receitas detalhadas — Schedulers

### 4.1 A-05: Cadência Qualificação D+3 (ET-02)

**Objetivo:** enviar o email template ET-02 (`309594744 — Qualificação D+3`) para os contatos de todos os deals que estão há 3-6 dias na fase Qualificação.

**Nodes n8n (em ordem):**

#### Node 1 — Trigger
- **Tipo:** Schedule Trigger
- **Cron:** `0 9 * * *` (diário 09:00 BRT)
- **Timezone:** `America/Sao_Paulo`

#### Node 2 — Query Pipefy: cards em Qualificação
- **Tipo:** HTTP Request
- **Method:** POST
- **URL:** `https://api.pipefy.com/graphql`
- **Authentication:** Header Auth (`pipefy-api`)
- **Body:** JSON:
```json
{
  "query": "query CardsInPhase($pipeId: ID!, $phaseId: ID!) { pipe(id: $pipeId) { phases(ids: [$phaseId]) { cards(first: 50) { edges { node { id title createdAt current_phase { id name } fields { name value field { id internal_id } } phases_history { phase { id } firstTimeIn } } } pageInfo { hasNextPage endCursor } } } } }",
  "variables": {
    "pipeId": "{{$env.PIPEFY_PIPE_VENDAS_ID}}",
    "phaseId": "{{$env.PIPEFY_PHASE_QUALIFICACAO}}"
  }
}
```

#### Node 3 — Filter: 3-6 dias na phase
- **Tipo:** Function (JavaScript)
- **Código:**
```javascript
const pipeData = items[0].json.data.pipe.phases[0];
const cards = pipeData.cards.edges.map(e => e.node);
const now = new Date();

const eligible = cards.filter(card => {
  const qualifHistory = card.phases_history.find(h => h.phase.id === $env.PIPEFY_PHASE_QUALIFICACAO);
  if (!qualifHistory?.firstTimeIn) return false;
  const daysInPhase = (now - new Date(qualifHistory.firstTimeIn)) / 86400000;
  return daysInPhase >= 3 && daysInPhase < 7;
});

return eligible.map(card => ({ json: card }));
```

#### Node 4 — Check idempotência
- **Tipo:** Postgres / SQLite (ou HTTP Request se usar outro KV)
- **Query:** `SELECT 1 FROM n8n_pipefy_idempotency WHERE rule_id='A-05' AND card_id=$1 AND DATE(executed_at)=CURRENT_DATE`
- **Filter:** continuar só se não houver resultado

#### Node 5 — Extrair contato email do card
- **Tipo:** Function
- **Código:** mapear `card.fields[]` para pegar `{{contatos_do_deal_1}}` → resolver para email do contato via query adicional na tabela Contatos se necessário.

```javascript
// Resolver connector contatos_do_deal_1 para emails
const contatosField = item.json.fields.find(f => f.field.internal_id === "428522757");
const contatoIds = JSON.parse(contatosField.value || "[]");
// Retornar cards que tenham pelo menos 1 contato; fazer query separada para pegar emails
return { json: { card_id: item.json.id, contato_ids: contatoIds, card_title: item.json.title } };
```

#### Node 6 — Query Contatos: resolver emails
- **Tipo:** HTTP Request → Pipefy GraphQL
- **Body:** query `tableRecord(id: ID!) { fields { name value } }` para cada contato_id

#### Node 7 — Renderizar template ET-02
- **Tipo:** HTTP Request → `https://app.pipefy.com/graphql/core`
- **Query:**
```graphql
query { emailTemplate(id: "309594744") { subject body fromName fromEmail } }
```
- Substituir placeholders `{{empresa}}`, `{{nome_contato}}`, `{{ops_responsavel_nome}}` com valores do card.

#### Node 8 — Send Email
- **Tipo:** Email Send (SMTP)
- **Credentials:** `smtp-nexuz`
- **To:** `{{ $json.contato_email }}`
- **From:** `{{ $env.PIPEFY_FROM_NAME }} <{{$env.PIPEFY_FROM_EMAIL}}>`
- **Subject:** (do template renderizado)
- **HTML:** (body renderizado)

#### Node 9 — Gravar idempotência
- **Tipo:** Postgres
- **Query:** `INSERT INTO n8n_pipefy_idempotency (rule_id, card_id) VALUES ('A-05', $1) ON CONFLICT DO NOTHING`

#### Node 10 — Discord summary (opcional)
- **Tipo:** Discord Webhook (`discord-comercial`)
- **Message:** `📧 A-05 executado às {{$now.format('HH:mm')}} — {{$json.count}} emails enviados para leads em Qualificação D+3.`

---

### 4.2 A-06: Cadência Qualificação D+7 (ET-03) — "última tentativa"

**Idêntico ao A-05**, com 3 mudanças:
- Filter: `daysInPhase >= 7 && daysInPhase < 15`
- Template: `{{$env.PIPEFY_ET_QUALIF_D7}}` (309594745)
- `rule_id: 'A-06'` na tabela de idempotência

**Sugestão de otimização:** criar 1 workflow único que processa ambos (A-05 e A-06) no mesmo trigger, filtrando cada bucket. Economiza chamadas GraphQL.

---

### 4.3 A-10: Alerta Proposta 15+ dias (Discord interno)

**Objetivo:** alertar o time em `#Comercial` quando houver deal preso na fase Proposta há 15+ dias sem fechamento.

#### Node 1 — Trigger
- **Schedule:** `0 9 * * *` (09:00 BRT)

#### Node 2 — Query cards em Proposta
- Mesma query do A-05, mudando `phaseId` para `PIPEFY_PHASE_PROPOSTA` (342928173)

#### Node 3 — Filter: 15+ dias na phase
```javascript
const daysInPhase = (new Date() - new Date(history.firstTimeIn)) / 86400000;
return daysInPhase >= 15;
```

#### Node 4 — Idempotência (rule_id='A-10')

#### Node 5 — Enriquecer dados
- Fetch connector `Cliente` → nome
- Fetch field `MRR (R$)`, `Ops responsável`

#### Node 6 — Discord webhook
- **URL:** `{{$credentials.discord-comercial}}`
- **Body JSON:**
```json
{
  "username": "Pipefy Alert",
  "avatar_url": "https://app.pipefy.com/favicon.ico",
  "embeds": [{
    "title": "⚠️ Proposta travada há 15+ dias",
    "description": "Deal **{{$json.deal_title}}** está em Proposta sem movimento",
    "color": 15105570,
    "fields": [
      { "name": "Cliente", "value": "{{$json.cliente_nome}}", "inline": true },
      { "name": "MRR", "value": "R$ {{$json.mrr}}", "inline": true },
      { "name": "Dias em Proposta", "value": "{{$json.days}}", "inline": true },
      { "name": "Ops responsável", "value": "{{$json.ops_name}}", "inline": true }
    ],
    "url": "https://app.pipefy.com/pipes/307117441#cards/{{$json.card_id}}",
    "footer": { "text": "A-10 · automation externa" },
    "timestamp": "{{$now.toISO()}}"
  }]
}
```

---

### 4.4 A-16: Daily ping / healthcheck (Discord interno)

**Objetivo:** confirmar que o pipeline está operacional + dar visão diária do funil.

#### Node 1 — Trigger
- **Schedule:** `0 8 * * *` (08:00 BRT, antes do comercial começar)

#### Node 2 — Query contagens por fase
```graphql
query DashboardSnapshot {
  pipe(id: 307117441) {
    cards_count
    phases {
      id
      name
      cards_count
    }
  }
}
```

#### Node 3 — Format Discord embed
```json
{
  "username": "Pipefy Daily",
  "embeds": [{
    "title": "📊 Status Pipe Vendas — {{$today}}",
    "color": 3447003,
    "fields": [
      { "name": "Total deals ativos", "value": "{{$json.total}}", "inline": false },
      { "name": "Novo Lead", "value": "{{$json.novo_lead}}", "inline": true },
      { "name": "Qualificação", "value": "{{$json.qualif}}", "inline": true },
      { "name": "Demo", "value": "{{$json.demo}}", "inline": true },
      { "name": "Pós-demo", "value": "{{$json.pos_demo}}", "inline": true },
      { "name": "Proposta", "value": "{{$json.proposta}}", "inline": true },
      { "name": "Fechamento", "value": "{{$json.fechamento}}", "inline": true },
      { "name": "GANHO 🏆", "value": "{{$json.ganho}}", "inline": true },
      { "name": "DESCARTE", "value": "{{$json.descarte}}", "inline": true }
    ],
    "timestamp": "{{$now.toISO()}}"
  }]
}
```

#### Node 4 — Discord webhook `discord-comercial`

---

## 5. Receitas detalhadas — Webhook Receivers (2 flows)

> **Histórico:** A v1.0 deste doc previa 4 receivers (A-07/09/11/14). A-07 e A-09 foram **deletados do Pipefy** em 2026-04-22 porque eram redundantes com notificações nativas Pipefy (assignee já recebe alerta no SLA expired). Sobraram só A-11 e A-14 — ambos têm valor real de broadcast porque precisam alertar pessoas que NÃO são assignees do card.

### 5.1 A-11: Alerta Fechamento late sem pagamento

**Endpoint n8n:** `POST https://n8n.nexuz.app/webhook/pipefy/alerta-fechamento-late`
**URL já configurada no Pipefy** (automação 306955926, atualizada em 2026-04-22).

**Trigger no Pipefy:** `sla_based` (kindOfSla=`late`) na fase Fechamento + condição `pagamento_confirmado != "Sim"`.

#### Node 1 — Webhook trigger
- **Path:** `pipefy/alerta-fechamento-late`
- **Method:** POST
- **Response Mode:** "When Last Node Finishes"

#### Node 2 — Parse Pipefy payload + enriquecer
- Pipefy envia ao menos `{card_id, pipe_id, action, ...}`. Buscar card details via GraphQL API pra pegar CNPJ, valor, ops_responsavel, dias em Fechamento.
- ⚠️ Confirmar formato exato via sniff de 1 execução real — Pipefy payload varia por trigger.

#### Node 3 — Discord embed
- **Mentions:** pegar role_ids de `@Financeiro` e `@Gestão` no Discord (criar roles antes se não existirem).

```json
{
  "content": "<@&FINANCEIRO_ROLE_ID> <@&GESTAO_ROLE_ID>",
  "embeds": [{
    "title": "🧾 Fechamento late — pagamento não confirmado",
    "description": "Deal **{{$json.card.title}}** no Fechamento sem pagamento",
    "color": 15158332,
    "fields": [
      { "name": "CNPJ", "value": "{{$json.cnpj}}", "inline": true },
      { "name": "MRR", "value": "R$ {{$json.mrr}}", "inline": true },
      { "name": "Dias em Fechamento", "value": "{{$json.days}}", "inline": true },
      { "name": "Ops responsável", "value": "{{$json.ops_name}}", "inline": true }
    ],
    "url": "https://app.pipefy.com/pipes/307117441#cards/{{$json.card.id}}"
  }]
}
```

### 5.2 A-14: Feedback ao indicador

**Endpoint n8n:** `POST https://n8n.nexuz.app/webhook/pipefy/feedback-indicador`
**URL já configurada no Pipefy** (automação 306955930, atualizada em 2026-04-22).

**Trigger no Pipefy:** `sla_based` (late) em Novo Lead + condição `origem == "Indicação"`.

#### Node 1-2 — Webhook + Parse (mesmo padrão 5.1)

#### Node 3 — Branch por desfecho
Se podemos fetch do card e detectar status final:
- `status_final == GANHO` → Discord: "🎉 Indicação convertida! Ops precisa avisar [[nome_indicador]]"
- `status_final == DESCARTE` → Discord: "Indicação **{{empresa}}** descartada (motivo: {{motivo}}). Ops pode dar retorno."
- `origem == Indicação` + SLA late → Discord lembrete: "Indicação [[quem_indicou]] aguardando retorno há X dias"

```json
{
  "embeds": [{
    "title": "🤝 Indicação — feedback pendente",
    "description": "Lead **{{$json.card.title}}** indicado por **{{$json.quem_indicou}}** precisa de retorno",
    "color": 3066993,
    "fields": [
      { "name": "Fase atual", "value": "{{$json.phase}}", "inline": true },
      { "name": "Dias sem movimento", "value": "{{$json.days}}", "inline": true },
      { "name": "Contexto indicação", "value": "{{$json.contexto_indicacao}}", "inline": false }
    ],
    "url": "https://app.pipefy.com/pipes/307117441#cards/{{$json.card.id}}"
  }]
}
```

**Futuro (v2):** enviar email automático para o próprio indicador (se tivermos email dele em um field). Não implementar agora — depende de capturar email do indicador no start form ou em tabela Parceiros.

---

## 6. Helpers reutilizáveis (criar como subworkflows)

### 6.1 `helper-pipefy-query`
Wrapper para POST `api.pipefy.com/graphql` com autenticação. Aceita `{query, variables}` e retorna parsed JSON.

### 6.2 `helper-card-enrich`
Dado um `card_id`, retorna objeto normalizado:
```json
{
  "id": "...", "title": "...",
  "current_phase": {...},
  "cliente": { "id": "...", "nome": "...", "mrr": ... },
  "contatos": [ { "nome": ..., "email": ..., "papel": ... } ],
  "ops_responsavel": { "id": ..., "nome": ..., "email": ... },
  "days_in_phase": N
}
```
Usado por todos os flows para evitar repetir GraphQL.

### 6.3 `helper-discord-send`
Wrapper que recebe `{title, description, color, fields[], card_id}` e monta o embed padronizado. Central izar estilo visual.

### 6.4 `helper-idempotency-check`
Input: `{rule_id, card_id}`. Retorna boolean "já executado hoje?". Gerenciável em Data Store ou Postgres.

---

## 7. Checklist de implementação (ordem recomendada)

- [ ] **Infra n8n**: confirmar `n8n.nexuz.app` online + acesso
- [ ] **Discord**: criar webhook no canal `#Comercial`, guardar URL
- [ ] **SMTP**: configurar credencial `smtp-nexuz` com `nxz@nxz.one` (ou alias dedicado `vendas@nxz.one`)
- [ ] **Storage**: escolher backend idempotência (Postgres/SQLite/Data Store) + criar schema
- [ ] **Variáveis globais**: carregar as 14 variáveis da seção 3.2
- [ ] **Credenciais**: criar `pipefy-api`, `pipefy-internal-api`, `discord-comercial`, `smtp-nexuz`
- [ ] **Helpers**: criar os 4 subworkflows (seção 6)
- [ ] **A-16** primeiro (mais simples, valida pipeline end-to-end) → Discord diário funcional
- [ ] **A-10** (alerta interno) → Discord com embed rico
- [ ] **A-05** (email externo D+3) → validar SMTP + template rendering
- [ ] **A-06** (email externo D+7) → clone A-05 com parâmetros trocados
- [x] **Migração webhooks**: `updateAutomation` em Pipefy para A-11/A-14 apontando para `n8n.nexuz.app/webhook/pipefy/*` (feito em 2026-04-22)
- [ ] **A-11, A-14**: receivers no n8n (Discord alerts)
- [ ] **Monitoramento**: adicionar error workflows (n8n tem native error trigger) → alerta Discord se algum flow falhar
- [ ] **Documentação**: atualizar este doc com URLs reais dos webhooks + cron expressions finais

---

## 8. Monitoramento e observabilidade

### 8.1 Error handling

No n8n, para cada workflow, configurar em **Settings → Error workflow**: aponte para um flow dedicado `meta-error-alert` que:
1. Recebe `{workflow_name, error_message, stack, node_name}`
2. Posta em `#Comercial` (ou canal dedicado `#automations-errors`):
```
❌ Workflow `{{name}}` falhou
Node: {{node_name}}
Erro: {{error_message}}
Timestamp: {{$now}}
```

### 8.2 Métricas semanais

Criar flow `weekly-ops-report` (cron `0 9 * * 1`, segunda 09:00) que:
- Conta executions bem-sucedidas vs falhadas de cada flow pipefy-*
- Conta cards processados por rule
- Posta resumo em `#Comercial`

### 8.3 Auditoria de idempotência

Weekly flow `idempotency-audit` que verifica:
- Cards onde A-05 executou mas nunca A-06 (cadência incompleta?)
- Cards com 2+ execuções A-10 (alerta repetido — é intencional?)

---

## 9. Dependências de outras squads

| Dependência | Responsável | Bloqueia |
|---|---|---|
| Playbook Google Doc publicado | Comercial + Marketing | Emails A-05/06 (templates linkam Playbook) |
| Discord webhook `#Comercial` criado | DevOps / Admin Discord | Todos os flows com notificação Discord |
| SMTP credential configurado | DevOps | A-05, A-06 |
| n8n instance saudável | DevOps | Tudo |
| DPAs LGPD assinados | Legal | Go-live produtivo (não bloqueia homologação) |
| Webhooks Pipefy reapontados | Squad N8N (execução) | A-07/09/11/14 funcionando |

---

## 10. Exemplo de payload — webhook receiver `send_http_request`

Para facilitar o parsing nos flows 5.1-5.4, o Pipefy envia (aproximadamente):

```json
{
  "action": "card.move",
  "data": {
    "card": {
      "id": "1339762897",
      "title": "Negócio NXZ",
      "pipe_id": 307117441,
      "current_phase": { "id": 342928170, "name": "Qualificação" }
    },
    "from": { "id": 342928169, "name": "Novo Lead" },
    "to": { "id": 342928170, "name": "Qualificação" }
  }
}
```

⚠️ Confirmar formato real via sniff de uma execução antes de implementar (o payload varia por tipo de trigger).

---

## Referências

- **Pipefy API docs:** https://developers.pipefy.com/reference
- **n8n docs:** https://docs.n8n.io
- **Specs deste pipe:** `squads/nxz-pipefy-setup/output/2026-04-20-162723/v1/specs/`
- **External cron spec original:** `output/2026-04-20-162723/v1/external-cron-spec.md` (base deste doc)
- **Skill Pipefy:** `skills/pipefy-integration/SKILL.md`
