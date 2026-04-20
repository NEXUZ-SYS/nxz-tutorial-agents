# Pipefy — Dossiê Técnico para Implantação de Funil de Vendas

> Pesquisa: 2026-04-16 · Fontes: pipefy.com, api-docs.pipefy.com, developers.pipefy.com, help.pipefy.com, community.pipefy.com.

## 1. Modelo conceitual
Pipefy organiza tudo em **Organização → Pipes → Phases → Cards**, com **Databases** (Tables) à parte servindo como cadastros relacionais (Contas, Produtos, Catálogos). Cada **Pipe** é um workflow com fases sequenciais; cada **Card** percorre as fases carregando seus campos. **Connector fields** ligam cards entre pipes ou cards a registros de Database, suportando 1:1 ou 1:N. Para o nosso caso, mapeamento natural: Pipe "Vendas" com 9 phases (Lead → Qualificado → … → Ganho/Perdido com fases finais distintas), Database "Contas" e "Contatos" (N:1 via connector), Pipe separado "Implantação" recebendo handoff via connector + automação "create connected card".

## 2. API & Automação programática
- **GraphQL endpoint:** `https://api.pipefy.com/graphql`. Autenticação **OAuth2 Bearer** via Personal Access Token (testes) ou Service Account (produção).
- **Operações:** `createPipe`, `createPhase`, `createPhaseField`, `createCard`, `updateCard`, `moveCardToPhase`, `createCardRelation`, `createWebhook`, etc. Explorer disponível em `app.pipefy.com/graphiql`.
- **Webhooks:** registráveis via mutation; recomendação prática ≤30 webhooks/pipe. Triggers cobrem card.create, card.move, card.field_update, card.done, card.late etc.
- **Limites:** rate limits específicos não publicados em todas rotas (ex.: Pipe Reports Export = 50 req/24h por pipe). API liberada a partir do plano **Business**.
- **Exemplo (criar campo + mover card):**
```graphql
mutation {
  createPhaseField(input:{
    phase_id:"301", type:"short_text", label:"Origem do Lead", required:true
  }){ phase_field { id } }
}
mutation {
  moveCardToPhase(input:{ card_id:"15001", destination_phase_id:"302" }){
    card { id current_phase { name } }
  }
}
```

## 3. Campos e validação
- **Tipos suportados:** short/long text, number, currency, date, datetime, due date, dropdown, radio, checkbox, label/select, email, phone, attachment, assignee, statement, **connector**, **formula** (via automação "Run a formula"), CPF/CNPJ, address.
- **Conditional fields:** mostram/ocultam ou tornam obrigatórios campos conforme valores de outros campos no mesmo formulário/phase. Não disparam quando o campo é alterado via API (apenas UI).
- **Gate de transição:** campos marcados como `required` na phase **bloqueiam nativamente** a movimentação do card para a próxima fase enquanto não preenchidos. Combinado com conditional fields, dá para fazer "locks" condicionais (mandatory only-if).
- **Fórmula entre campos do mesmo card:** suportado via automação **Run a formula** (sum, sub, mul, div, %, ^ + comparações). Falha silenciosamente se algum operando estiver vazio. Não há campo "fórmula nativa" calculada em tempo real fora de automação.

## 4. Automações nativas
- **Eventos disponíveis:** card criado; card entra em phase; card sai de phase; campo atualizado; alerta disparado (late/expired SLA); recorrência horária/diária/semanal/mensal; e-mail recebido no pipe; todos os connected cards moveram-se; resposta de HTTP request.
- **Ações disponíveis:** enviar template de e-mail; mover card; atualizar card/registro de database; criar **connected card** em outro pipe/database; criar card; mover o "parent" card; distribuir assignment; **rodar fórmula**; **HTTP Request** (webhook out); gerar com IA.
- **E-mail externo com destinatário dinâmico:** ✅ suportado. Sender, recipient e body aceitam **dynamic fields** — incluindo campos de cards conectados via connector. Templates ficam por pipe.
- **Limites:** Plano **Business** = 300 automation jobs/mês (cada execução conta). **Enterprise/Unlimited** ampliam. Quotas separadas para AI credits.

## 5. Conexões cross-pipe
- **Connector field:** propriedades `connectedRepo`, `canCreateNewConnected`, `canConnectExisting`, `canConnectMultiples` (esta última define 1:1 vs 1:N).
- **Sync de campos:** regras "se campo X em pipe A muda, atualizar campo Y em pipe B" são configuráveis na conexão.
- **Cross-pipe handoff (Vendas → Implantação):** ✅ totalmente nativo via ação "Create a connected card or record in another pipe" disparada por evento "card enters phase Ganho". Conexão N:1 e 1:1 ambas suportadas.

## 6. Formulários públicos & integração externa
- **Public forms:** sim — link público + embed code (HTML). Cada submissão vira card na phase inicial. Customização de cores/logo, request tracker para visitantes, agrupamento em **Portal**.
- **Integrações nativas:** Salesforce, Slack, Google Workspace (Gmail, Drive), Microsoft Teams, WhatsApp. **Sem integração nativa 2-way com Google Calendar** — é necessário Make/Zapier/n8n/Albato. Sem integração nativa Odoo/Asaas — exigem iPaaS ou GraphQL custom. iPaaS próprio + integração via webhooks/HTTP.

## 7. Dashboards & relatórios
- **Dashboards customizáveis:** charts bar, line, area, pie, table, calendar, number. Métricas: contagem de cards, lead time horas, soma/avg de campos numéricos, agrupamento por dimensão.
- **Pipe Reports:** filtros e export. Cycle time / throughput acessíveis via report nativo + dashboard.
- **SLA por fase:** ✅ nativo via "late alert" — define tempo máximo na fase, dispara alertas e pode acionar automações.

## 8. Permissões & multi-departamento
5 roles padrão: Super Admin, Administrator, Member, Company Guest, External Guest. **Permissões por pipe** com 4 níveis (Read-only, Restricted view, Pipe member, Admin) — disponível no plano **Business+**. Mesmo usuário pode ter roles distintos em pipes diferentes — atende perfeitamente a separação Vendas/Implantação. Custom roles e Groups disponíveis. Guests veem só forms compartilhados.

## 9. Limitações conhecidas / pontos de atenção
- **Conditional fields não disparam via API** — só pela UI. Risco para integrações automatizadas que populam campos por GraphQL.
- **Não existe campo fórmula reativo nativo** — toda fórmula precisa virar uma automação (consome quota).
- **Quota de 300 automation jobs/mês no Business** pode estourar rapidamente em pipeline com muitas trocas de status e e-mails.
- **Sem 2-way sync nativo com Google Calendar** — depende de iPaaS (Make/Zapier).
- **Sem integração nativa com Odoo nem Asaas** — exigirá conector custom ou middleware.
- **Webhooks recomendados ≤30/pipe** — ok, mas exige design enxuto.
- **Conditional logic não permite if/else encadeado complexo** numa só automação — precisa de múltiplas automações com condições.
- **Fórmula falha silenciosa** se operando estiver vazio — exige guardas.
- **Cross-pipe sync é unidirecional por regra** — bidirecionalidade exige duas regras espelhadas, com risco de loop.

## 10. Plano necessário & custo aproximado
- **Starter:** sem API, sem automações avançadas — inviável para nosso caso.
- **Business:** US$ 33/usuário/mês — **mínimo necessário**: API GraphQL, 300 automation jobs/mês, conexões entre pipes, public forms, dashboards, permissões por pipe.
- **Enterprise:** US$ 65/usuário/mês — automações ampliadas, segurança avançada (SSO/SAML), governança.
- **Unlimited:** sob consulta — automações ilimitadas e SLA dedicado.
- Estimativa para piloto Nexuz (5 usuários comerciais + 2 implantação): ~US$ 230/mês no Business (~R$ 1.250/mês a câmbio atual). Enterprise se a quota de 300 jobs estourar.

## 11. Compatibilidade com checklist da seção 8
- 9 etapas customizáveis com tipos ganho/perda distintos: ✅ (phases finais separadas + label de outcome)
- Relacionamento N:1 entre pipelines (Contato→Conta, Deal→Conta): ✅ (connector com `canConnectMultiples=false` no lado N)
- Relacionamento 1:1 cross-pipeline (Deal→Implantação): ✅ (connector + ação "create connected card")
- Campo fórmula referenciando 2 campos numéricos do mesmo card: ⚠️ (via automação "Run a formula", não é campo reativo)
- Triggers por tempo em etapa: ✅ (late alert / SLA nativo)
- Triggers agendados (cron) com condições sobre datas: ✅ (recurring activity hourly/daily/weekly/monthly + condições)
- E-mails com destinatário dinâmico de campo relacionado: ✅ (dynamic field no recipient, inclui campos de connected cards)
- E-mails com corpo usando variáveis do card (incluindo relacionados): ✅
- Ação "criar card em outro pipeline" como efeito de automação: ✅ ("Create a connected card or record in another pipe")
- Views: kanban, lista agrupada com soma, calendário por campo de data: ✅ (kanban e lista nativos; calendário disponível; soma em dashboards)
- Dashboard com sum/count/ratio + pie/bar/line: ✅
- Formulários web públicos gerando cards na fase inicial: ✅ (sempre na start phase — para cair direto em "Qualificado" use automação que move o card)
- Webhook de saída e entrada para integração com ERP: ✅ (HTTP Request action + webhooks via API)
- Sync 2-way com Google Calendar: ❌ nativo — ⚠️ via Make/Zapier
- Validação condicional de campos obrigatórios: ✅ (conditional fields + required = locks); ⚠️ não dispara via API

## 12. Veredito
Pipefy é **viável como ferramenta-piloto**: cobre nativamente 12 dos 15 itens do checklist e os 3 restantes têm workaround claro. O modelo de connector cross-pipe + automações por SLA + e-mail dinâmico encaixa exatamente no nosso desenho de funil 9 etapas com handoff para Implantação.

**3 maiores riscos técnicos a validar antes de configurar:**
1. **Quota de 300 automation jobs/mês no Business** — fazer estimativa real (cadências F1..F6 + e-mails + moves automáticos podem estourar rápido; talvez exija Enterprise).
2. **Conditional fields não disparam por API** — se a integração com Odoo/Asaas popular campos via GraphQL, locks condicionais e gates de fase não vão acionar; precisa redesenhar para validação server-side ou triggers de "field updated" complementares.
3. **Ausência de integração nativa Google Calendar / Odoo / Asaas** — definir desde já o middleware (Make, n8n self-hosted ou serviço próprio) e contar o custo + esforço de manutenção dele no escopo.
