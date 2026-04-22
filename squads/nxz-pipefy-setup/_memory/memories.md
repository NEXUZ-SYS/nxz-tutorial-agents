# Squad Memory — nxz-pipefy-setup

## Learnings (Run 2026-04-20-162723)

### Decisões arquiteturais consolidadas
- **Contas → Parceiros (CTI):** adotar CTI com `Parceiros` abstrata + especializações (`Clientes`, `Fornecedores`, `Colaboradores`). Nesta execução criamos Parceiros + Clientes; outras especializações em runs futuras.
- **Contato modelado como Parceiro PF:** não criar tabela `Contatos` separada. `Parceiros.tipo_pessoa=PF` + connector self-ref `empresa_mãe` cobre a relação N:1 Contato→Cliente.
- **Roles de Contato (Abordagem A):** 1 connector único `contatos_do_deal` no Start Form (multi) + role GLOBAL no Parceiro (`Papel no comitê`: Decisor/Influenciador/Operacional/Gatekeeper). Abordagem B (connector por role) foi descartada — user prefere simplicidade.
- **Enforcement 1:1 (DD-002):** pre-check client-side obrigatório + title formula visual + audit diário webhook. Sem webhook validator nuclear.
- **Creation livre:** usuários podem criar diretamente em Parceiros ou Clientes. Sem automação "creation-via-Parceiros" (economiza quota).
- **Escopo v1:** Pipe Vendas + Parceiros + Clientes. Nutrição, Implantação, Fornecedores, Colaboradores ficam para runs futuras.

### Padrões descobertos no Pipefy durante execução
- **Pipe cria 3 phases default automaticamente** (Caixa de entrada/Fazendo/Concluído) — sempre deletar após `createPipe`.
- **Start Form tem phase oculta** (`pipe.startFormPhaseId`), separada de "Novo Lead". Phase fields da primeira phase NÃO populam o start form.
- **ID collision phase_field vs table_field:** mesmo slug (`n_unidades`, `cliente`, etc.) em ambos causa "Acesso negado" em `updatePhaseField`. Solução: passar `id` + `uuid` juntos.
- **`deletePhaseField` bloqueia ~85% dos types** ("Acesso negado") — deletar pipe inteiro + recriar é o workaround.
- **Boolean = `radio_horizontal` com ["Sim","Não"]** — `checkbox` não existe como phase_field type.
- **`createPipe` não aceita `public`** — default é privado.

### O que funcionou bem
- Consultar pipes existentes ([Modelo] CRM) via GraphQL API deu padrões concretos.
- Scripts Python reutilizáveis para lotes de mutations (create_field helpers).
- `id + uuid` para desambiguar IDs em `updatePhaseField`.
- Iteração rápida: criar pipe → validar com user → descobrir erro de design → recriar (2 versões em 1 hora).

### O que evitar na próxima
- Não criar fields de intake como phase_field na primeira phase esperando virar start form.
- Não tentar deletar phase_field individualmente — recriar pipe é mais confiável.
- Discutir refinamentos CTI com user antes de executar (o user trouxe N:1 Contato↔Cliente + roles depois).

### IDs importantes (produção)
- Org: `302461450` (Nxz Sistemas Inteligentes Ltda)
- Tables: Parceiros=`xcO4_FB_`, Clientes=`XaduYW7H`
- Pipe Vendas: `307117441` (v2 limpa; v1 `307117352` deletada)
- Start Form phase: `342928165`

### Pendente na próxima run
- Layers 5-7: 6 Field Conditions + 16 Automations + 4 Email Templates
- Playbook Vendas Nexuz (Google Doc — URL do PLAYBOOK-VENDAS-NEXUZ a substituir quando publicado)
- Webhook receiver para audit diário de duplicatas (DD-002 camada 3)
- DPAs antes do go-live produtivo (PDD R-09)

### Aplicado com sucesso nesta run
- **Mini-guias** em 8 phase descriptions (1 linha resumo, sem link) + 8 statements (instruções curtas)
- **Links Playbook** em 55 phase_field.descriptions usando markdown `[Playbook — §X](url)`
- **Pipe.noun** = "oportunidade" (via API updatePipe)
- **Pipe.create_card_label** = "Nova oportunidade" (via Playwright — API é read-only)
- **Pipe.description** = setada via Playwright (aceitou no UI, API query retorna null — peculiaridade Pipefy)

### Reusable templates produzidos
- `/tmp/build-vendas-v2.py` — script completo de criação de fields
- `/tmp/update-help.py` + `/tmp/update-help3.py` — patterns de update em batch com id+uuid
- `/tmp/apply-links.py` — regex-based replacement de Playbook markers por markdown links
- **`skills/pipefy-integration/scripts/templates/customize-pipe-settings.js`** — template Playwright reutilizável para customização UI-only de pipes (button_text + description). Reusar em pipes futuros.

### Descoberta chave — Playwright CLI como extensão da API
Pipefy tem várias configurações UI-only que não existem em mutations GraphQL.
Padrão estabelecido: **API para o que der + Playwright CLI para o resto**, ambos via skill.
Template genérico cobre: login 2-step auto, navegação em drawer/modal, CKEditor em iframe.

---

## Continuation (Run 2026-04-21)

### Layers 5-7 concluídas via sniff + replay de /internal_api e /queries

**Padrão validado (Pipefy internal API replay):**
1. Rodar `sniff-automation-mutation.js` promíscuo (captura TODO POST exceto assets/telemetry).
2. Usuário faz 1 criação manual na UI → capturamos `url`, `operationName`, `query`, `variables`, `requestHeaders`.
3. Extrair `X-CSRF-Token` do header capturado (Rails-style, vem do meta tag `<meta name="csrf-token">` na página).
4. Replay via `page.evaluate` com fetch incluindo `X-CSRF-Token` + `credentials: 'include'`.

**3 endpoints GraphQL descobertos no Pipefy:**
- `api.pipefy.com/graphql` — público, Bearer token. Aceita delete*, read, maioria de create*. Rejeita `createAutomation` com combos scheduler/sla/card_moved, rejeita `createFieldCondition` ("Algo deu errado").
- `app.pipefy.com/internal_api` — `createAutomation`, `createEmailTemplate`.
- `app.pipefy.com/queries` — `createFieldCondition` (apesar do nome, aceita mutations).

**Pipefy peculiaridades novas:**
- **URL validation in send_http_request**: Pipefy faz DNS lookup. `.internal` TLD rejeitado, `hooks.nexuz.com.br` (subdomínio sem record) rejeitado, `nexuz.com.br/path` (domínio raiz que resolve) aceito. Usar root domain como placeholder.
- **Event×Action blacklist (scheduler)**: scheduler event bloqueia send_email_template, send_http_request, update_card_field. Só aceita `schedule_create_card`. Efetivamente inutilizável para cadências/alertas.
- **sla_based só tem 2 thresholds por fase** (`late` + `expired`). 3º+ threshold requer external cron.
- **FieldCondition action enum público = ["hidden"]**, mas internal aceita `"show"` (não está no schema público).
- **Start form tem própria phaseId** (`pipe.startFormPhaseId`), não é nenhuma das 8 phases visíveis.

### Outputs criados nesta continuation
- `skills/pipefy-integration/scripts/templates/sniff-automation-mutation.js` (v4 — promíscuo + captura headers)
- `skills/pipefy-integration/scripts/templates/bulk-create-automations.js` (replay via /internal_api com CSRF)
- `skills/pipefy-integration/scripts/templates/bulk-create-field-conditions.js` (replay via /queries com CSRF)
- `skills/pipefy-integration/scripts/templates/probe-pipefy-auth.js` (diagnóstico de auth)
- `output/2026-04-20-162723/v1/external-cron-spec.md` (A-05/06/10/16 docs p/ cron externo)
- `output/2026-04-20-162723/v1/specs/05-field-conditions-final.json` (FCs com IDs reais)
- `output/2026-04-20-162723/v1/specs/06-automations-final.json` (9 automations + 5 deferidas)

### Reusable learnings para novos pipes
Reusar o stack `sniff + bulk-create-*` em qualquer pipe Pipefy:
1. Editar `config.automations[].variables` com IDs do novo pipe (phase_ids, field_ids, template_ids)
2. Rodar `bulk-create-automations.js`
3. Mesmo pattern para field conditions

Skill `pipefy-integration` agora cobre end-to-end: create pipe → customize UI → email templates → automations → field conditions. Falta apenas: deletar automações em lote (existe script? criar se precisar).

---

## Refactor Contatos (Run 2026-04-22)

### Decisão arquitetural — afastando-se do modelo CTI puro
User pediu tabela `Contatos` dedicada + N:1 com Clientes, vs. modelo anterior (Contato = Parceiro PF com papel global). Motivo prático: um cliente tem múltiplos decisores; manter contatos como PF na mesma tabela de Parceiros mistura escopos.

**Modelo novo:**
- `Contatos` (Hwgq9hZN) com 8 fields + connector `cliente` N:1 → Clientes
- Campos first-class: Nome completo, E-mail, Telefone/WhatsApp, LinkedIn, Cargo, Papel no comitê (Decisor/Influenciador/Operacional/Gatekeeper), Status, Observações
- Isso RESOLVE o gap antigo de FC-03 ("Criar LinkedIn/Cargo no start form") — os campos são next-level na tabela Contatos.

**Como o modelo antigo (Parceiros CTI) fica:** mantido para Fornecedores/Colaboradores (futuras especializações). Self-ref C-04 (Contato→Empresa) deprecated para nova arquitetura mas ainda presente.

### Padrão aplicado: "Connector paralelo" para mudar target de campo connector sem deletePhaseField
Limitação 1c (`deletePhaseField` bloqueia ~85% dos types) tornou inviável deletar o `contatos_do_deal` existente apontando para Parceiros. Solução: connector paralelo.
1. Criar NOVO `contatos_do_deal_1` → Contatos (Pipefy auto-sufixa o slug quando label colide)
2. Renomear o antigo para `(legado) Contatos do deal — Parceiros` via `updatePhaseField` (funciona em start form fields com id+uuid)
3. Tornar o antigo `required: false` (mesmo pattern: label+required obrigatórios juntos no UpdatePhaseFieldInput — sempre passar label)
4. Reposicionar com `index` float (novo=2.5 após cliente, legado=99.0 no fim)

### Descobertas técnicas novas 2026-04-22
- **CreateTableInput.authorization enum = ["read", "write"]**, NÃO "read_access"/"write_access" como em outros Pipefy inputs. Fonte de erro comum.
- **CreateTableFieldInput usa `type` (não `type_id`)** e camelCase em connector props: `canConnectMultiples`, `canConnectExisting`, `canCreateNewConnected`, `connectedRepoId`. NÃO tem `connections`/`connector_pipe_id`/`can_have_multiple_values`.
- **UpdatePhaseFieldInput exige `label` non-null** mesmo quando só se quer alterar required/index. Sempre passar label atual junto.
- **DeleteTableFieldInput usa `table_id` (snake_case)**, não `tableId`. E `deleteTableField` funciona para fields não-referenciados (diferente de deletePhaseField que bloqueia 85%).
- **updateEmailTemplatePayload tem campos flat** (id, name, toEmail, etc.) — sem nesting `emailTemplate { ... }` como em outros endpoints. Confirmado em `/graphql/core`.
- **Slug auto-sufixo:** criar phase_field com label já existente no mesmo phase gera slug `<slug>_1`, `_2`, etc. automaticamente.
- **Tabelas legadas podem ser renomeadas via `updateTable.name`** — forma segura de "descomissionar" sem deletar (e sem perder registros existentes).

### Descoberta principal: "Campos sincronizados" existe e foi capturada
Pipefy tem a feature `own_field_maps_attributes` em connector fields — permite pré-preencher campos do registro criado via "Adicionar" (copy_from do pai ou fixed_value). Documentado em `skills/pipefy-integration/references/connector-field-maps.md`. Endpoint descoberto:

```
PUT https://app.pipefy.com/internal_api/settings/fields/{internal_id}
```

Body JSON:API com `attributes.own_field_maps_attributes: [{field_id, input_mode: fixed_value|copy_from, value}]`. Para copy_from, value usa sintaxe `%{source_field_id}`.

Aplicado em `contatos_do_deal_1` (428522757) → pré-preenche Contatos.Status="Ativo" + Contatos.Cliente=%{deal.cliente} (428488620). Sniff completo arquivado em `output/.../v1/specs/connector-sync-sniff-2026-04-22.json`.

### Gap ainda aberto: filtro dinâmico cross-field (diferente de sync fields)
Payload capturado NÃO tem atributo `filter` visível — o filtro dinâmico cross-field (contato.cliente == deal.cliente no PICKER, para não mostrar contatos de outros clientes) deve ser outro atributo ou endpoint. Precisa sniff adicional quando user for configurar.

---

## Feature Atividades (Run 2026-04-22 continuada)

### Inspirado em template CRM importado
User pediu transformar a tabela `[Legacy] Atividades Template` (órfã, 0 refs, template CRM importado pelo Pipefy) em feature real integrada ao Pipe Vendas.

### Design aplicado
- **Tabela Atividades** (SWpeb0uP): 11 fields — Assunto (title), Tipo, Status, Data planejada/realizada, Responsável, Descrição, Resultado, Próxima ação, Cliente (connector Clientes), Contato (connector Contatos)
- **6 phase_connectors** em Pipe Vendas (um por working phase: Novo Lead, Qualificação, Demo Agendada, Pós-demo, Proposta, Fechamento). GANHO/DESCARTE excluídos (fases terminais).
- **own_field_maps aplicado em todos os 6**: Status=fixed "Planejada" + Cliente=copy_from %{deal.cliente}. Via Playwright bulk-apply-field-sync.js.

### Descoberta técnica: bulk replay do `PUT /internal_api/settings/fields` funciona
Mesmo pattern do sync-fields do `contatos_do_deal_1` (capturado anteriormente) replicado em loop via `page.evaluate(fetch)`. 6/6 sucesso em ~35s. Script reusable: `skills/pipefy-integration/scripts/templates/bulk-apply-field-sync.js`.

### Decisão de design: 6 phase_fields separados vs 1 start form
User escolheu "todas as phases visíveis" (6 connectors). **Trade-off:** cada connector é uma lista SEPARADA — atividades criadas em Qualificação NÃO aparecem em Demo Agendada por padrão. Pipefy não agrega cross-phase. Se quiser UX contínua, migrar para 1 connector no start form depois.

### Phase connector IDs (Atividades do deal) — DELETADOS 2026-04-22
6 phase_connectors criados inicialmente (um por working phase) foram deletados porque **phase fields do Pipe Vendas não renderizam no card drawer** (bug não-resolvido, possivelmente config-level do pipe). CRM template pipes renderizam normalmente — diferença não isolada via API pública (atributos idênticos: synced_with_card, editable, minimal_view, archived, deleted, settings).

### Substituído por: 1 start form connector
- internal_id: 428549684
- slug: atividades_do_deal
- uuid: 2266f99b-d4a9-47f1-a86a-5ae528b04068
- Start form fields RENDERIZAM normalmente no Pipe Vendas
- Sync fields aplicados: Status=fixed "Planejada" + Cliente=copy_from %{428488620}

### Workaround pattern: start form connector para features cross-phase
Quando phase fields não renderizam no card (bug nosso pipe) OU quando queremos 1 lista contínua ao invés de listas disjuntas por phase, **usar start form field**. Start form fields:
- Sempre visíveis no card drawer regardless da phase
- 1 lista única acompanha o deal do início ao fim
- Editável em qualquer phase (default)

### Deferred v2
Automações auto-criação (ao entrar em phase, criar atividade default); validação Status=Realizada exige Data realizada; dashboard por vendedor.

### Email templates — sempre atualizar toEmail quando slug do connector muda
Ao criar connector paralelo, os templates (ET-01..04 aqui) continuam apontando para o slug antigo `{{contatos_do_deal}}`. Sempre atualizar via `updateEmailTemplate(input: {id, toEmail: "{{novo_slug}}"})` no endpoint `/graphql/core`.

### IDs novos 2026-04-22
- `table_contatos`: Hwgq9hZN
- `contatos.cliente` connector: id=`cliente` internal=428522458 → Clientes (XaduYW7H)
- `deal.contatos_do_deal_1` (novo): internal=428522757 uuid=39761305-fe16-49f0-aee9-caa105c01cec → Contatos
- `deal.contatos_do_deal` (legado): rebatizado, required=false, index=99

### Reusable template criado
- `skills/pipefy-integration/scripts/templates/sniff-connector-filter.js` — sniff genérico para descobrir mutations UI-only de connector filter settings

### Anti-pattern descoberto 2026-04-22: `label_select` em tabelas
`label_select` foi aceito pelo createTableField (não retornou erro) e a options ficou persistida na API. Porém, o tipo `label_select` é desenhado para **labels de cards em Pipes**, não funciona como dropdown em tabelas — a UI renderiza o campo VAZIO sem opções.

**Regra:** em tabelas (Database), NUNCA usar `label_select`. Usar:
- `select` → single choice dropdown
- `radio_vertical` / `radio_horizontal` → single choice radio
- `checklist_vertical` / `checklist_horizontal` → multi-select checkboxes

**Correção:** como `UpdateTableFieldInput` não tem campo `type`, mudar o tipo exige delete + recreate. `deleteTableField(table_id, id)` funciona para table fields sem registros (diferente de `deletePhaseField` que bloqueia 85%). Confirmado corrigindo `Parceiros.categoria_prim_ria` → `checklist_vertical`.

### Anti-pattern: Architect adicionando campos fora do PDD sem flag
Durante a config Layers 1-4, o Architect criou o campo `Categoria primária` em Parceiros (não existe no PDD seção 3.1). Motivação razoável (suportar CTI de Parceiros abstrato), mas deveria ter sido flagged como "proposta além do PDD" para revisão do usuário. Na próxima run, forçar Architect a listar deltas vs. PDD explicitamente antes de executar.

### Descoberta 2026-04-22: Pipefy tem notificações nativas + 14 automation actions
Antes de desenhar alertas via webhook externo, SEMPRE checar:
1. **Notificações nativas**: Pipefy alerta assignee automaticamente em card_late, card_expired, assignment, @mention. Não requer automação customizada.
2. **`send_a_task`**: action nativa que cria task interna para usuários Pipefy. **Blacklist: `sla_based`, `scheduler`, `card_left_phase`** — então não serve para alertas baseados em SLA.
3. **Actions list via `automationActions(repoId)`**: query retorna eventsBlacklist por action — use antes de desenhar qualquer automação.
4. **Events list via `automationEvents`**: 10 disponíveis, incluindo `manually_triggered` (botão no card), `http_response_received` (chain automations).

### Decisão aplicada: deletar alertas redundantes com notificação nativa
A-07 (Qualif expired) e A-09 (Proposta expired) foram **deletadas** — eram webhooks apontando para `nexuz.com.br/api/webhook/*` (nunca implementado) que duplicavam o que Pipefy já notifica nativamente ao assignee. A-11 (Fechamento late — alerta Fin+Gestão) e A-14 (Feedback indicador) ficaram pois precisam alertar quem NÃO é assignee. Ambas reapontadas para `n8n.nexuz.app/webhook/pipefy/*`.

### Arquitetura final alertas Pipe Vendas (pós-revisão 2026-04-22)
- Pipefy nativo: 9 automações ativas (A-01..04, A-08, A-11..14) + notificações built-in para assignees
- n8n externo: 6 workflows (4 schedulers A-05/06/10/16 + 2 webhook receivers A-11/14)
- Canal Discord #Comercial para broadcast coletivo
- Zero backend custom em nexuz.com.br (plano original) — n8n substitui
