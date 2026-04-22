# Step 06 — Auditoria Plano vs Realidade

**Data:** 2026-04-22
**Pipe Vendas:** 307117441
**Organização:** 302461450 (Nxz Sistemas Inteligentes Ltda)

---

## Resumo executivo

| Layer | Planejado | Criado | Status |
|---|---|---|---|
| 1 — Databases | 2 | 7 (2 originais + 2 novos + 3 legados) | ✅ + escopo ampliado |
| 2 — Pipe Vendas | 1 | 1 | ✅ |
| 3 — Phases | 8 | 8 | ✅ |
| 4 — Start Form Fields | 13 | 12 | ⚠️ refactor (6 substituídos por connectors) |
| 4 — Phase Fields | 53 esperados | 53 atuais | ✅ exatos por phase |
| 5 — Connectors | 4 | 6 (4 + 2 novos) | ✅ + escopo ampliado |
| 6 — Automations (API) | 11 | 11 nativas + 2 resíduos | ✅ + cleanup pendente |
| 6 — Deferred external cron | 5 | 5 documentadas | ✅ |
| 7 — Field Conditions | 6 | 6 | ✅ |
| 8 — Email Templates | 4 | 4 | ✅ |
| 9 — Labels | 6 | 6 | ✅ |

---

## Layer 1 — Databases ✅+

| Tabela | ID | Records | Status |
|---|---|---|---|
| Parceiros | `xcO4_FB_` | 1 | ✅ Planejada |
| Clientes | `XaduYW7H` | 1 | ✅ Planejada |
| Contatos | `Hwgq9hZN` | 1 | ➕ Refactor 2026-04-22 |
| Atividades | `SWpeb0uP` | 0 | ➕ Refactor 2026-04-22 |
| [Legacy] Contatos Template | `iUu_Ek5r` | 8 | 🗑️ Resíduo template CRM |
| [Legacy] Empresas Template | `oeRq6rkd` | 8 | 🗑️ Resíduo template CRM |
| [Legacy] Atividades Template | `-WGEyGwJ` | 0 | 🗑️ Resíduo template CRM |

## Layer 2 — Pipe ✅ (com 1 divergência menor)

- Name: **Vendas** ✅
- noun: **oportunidade** ✅
- create_card_label: **"Nova oportunidade"** ✅
- `anyone_can_create_card: **True**` ⚠️ *(plano: False — revisar)*

## Layer 3 — Phases (8/8) ✅

Todas as 8 phases criadas com IDs e descrições:

| Phase | ID | Terminal | Cards |
|---|---|---|---|
| Novo Lead | 342928169 | não | 1 (teste) |
| Qualificação | 342928170 | não | 0 |
| Demo Agendada | 342928171 | não | 0 |
| Pós-demo | 342928172 | não | 0 |
| Proposta | 342928173 | não | 0 |
| Fechamento | 342928174 | não | 0 |
| GANHO | 342928175 | ✅ | 0 |
| DESCARTE | 342928176 | ✅ | 0 |

## Layer 4 — Start Form (12/13) ⚠️ refactor arquitetural

### Campos que divergiram do plano

**Removidos (6)** — migrados para tabelas relacionais:

| Plano original | Substituto atual |
|---|---|
| Nome do contato | Connector `Contatos do deal` → tabela Contatos.Nome completo |
| E-mail | Contatos.E-mail |
| Telefone/WhatsApp | Contatos.Telefone/WhatsApp |
| Empresa (razão social ou fantasia) | Connector `Cliente` → Clientes |
| LinkedIn do contato | Contatos.LinkedIn |
| Cargo | Contatos.Cargo |

**Adicionados (6)** — não estavam no plano original:

| Campo adicionado | Razão |
|---|---|
| Título do deal | Display de card limpo |
| Cliente (connector → Clientes) | Modelo CTI Parceiros |
| Contatos do deal (connector → Contatos) | Refactor 2026-04-22 |
| (legado) Contatos do deal — Parceiros | Campo anterior marcado como legado |
| Atividades do deal (connector → Atividades) | Feature nova de hoje |

### Fields mantidos do plano (6)
Origem, Canal preferido, Consentimento LGPD, Quem indicou, Contexto da indicação, Reason to Call, ICP — todos presentes e funcionais.

## Layer 4 — Phase Fields ✅

Todas as 8 phases têm a quantidade exata de fields conforme spec `03-phase-fields.json`:

| Phase | Fields criados | Plan | Status |
|---|---|---|---|
| Novo Lead | 3 | 3 | ✅ |
| Qualificação | 14 | 14 | ✅ |
| Demo Agendada | 5 | 5 | ✅ |
| Pós-demo | 5 | 5 | ✅ |
| Proposta | 11 | 11 | ✅ |
| Fechamento | 6 | 6 | ✅ |
| GANHO | 3 | 3 | ✅ |
| DESCARTE | 6 | 6 | ✅ |

**⚠️ Bug conhecido:** phase fields (Ops responsável, Data entrada etapa, etc.) NÃO renderizam no card drawer deste pipe (CRM template funciona; Vendas não). Causa não isolada. Workaround atual: start form para visibility crítica. Fields existem e são editáveis via API/mutations.

## Layer 5 — Connectors ✅+

| ID plano | Origem | Destino | Status |
|---|---|---|---|
| C-01 | Deal.Cliente | Clientes | ✅ start form, req=true |
| C-02 | Deal.Contatos | Parceiros (PF) | ✅ criado, rebatizado "(legado)", req=false |
| C-03 | Clientes.Parceiro | Parceiros | ✅ 1:1 CTI |
| C-04 | Parceiros.Conta mãe | Parceiros (self-ref) | ✅ |
| (novo) | Deal.Contatos do deal | Contatos | ➕ refactor 2026-04-22 |
| (novo) | Contatos.Cliente | Clientes | ➕ refactor 2026-04-22 |
| (novo) | Deal.Atividades do deal | Atividades | ➕ feature hoje |
| (novo) | Atividades.Cliente | Clientes | ➕ feature hoje |
| (novo) | Atividades.Contato | Contatos | ➕ feature hoje |

## Layer 6 — Automations

### Nativas criadas via API (11/11) ✅

| Código | ID | Nome | Active |
|---|---|---|---|
| A-01 | 306955890 | Marcar Data MQL ao entrar em Qualificação | ✅ |
| A-02 | 306955891 | Marcar Data SAL ao entrar em Demo Agendada | ✅ |
| A-03 | 306955892 | Marcar Data Ganho ao entrar em GANHO | ✅ |
| A-04 | 306955893 | Cadência Qualificação D+1 (ET-01) | ✅ |
| A-07 | 306955920 | SLA Qualificação expired alerta (R6) | ✅ |
| A-08 | 306955894 | Cadência Proposta D+3 (ET-04) | ✅ |
| A-09 | 306955921 | Proposta expired alerta interno | ✅ |
| A-11 | 306955926 | Fechamento late sem pagamento | ✅ |
| A-12 | 306955837 | Desconto > 15% alerta Gestão (R13) | ✅ |
| A-13 | 306955838 | GANHO automático (pgto+contrato=Sim) (R19) | ✅ |
| A-14 | 306955930 | Feedback ao indicador (T-29) | ✅ |

### Deferidas para external cron (5) ✅ documentado

| Código | Razão |
|---|---|
| A-05 | 2ª threshold D+3 mesma fase (só tem late+expired por fase) |
| A-06 | 3ª threshold D+7 mesma fase |
| A-10 | 2ª threshold D+15 na Proposta (após A-08 + A-09) |
| A-15 | Conflito com A-04 (mesma fase, mesma kind late) |
| A-16 | Scheduler bloqueia send_http_request e todas actions úteis |

Spec em `output/.../v1/external-cron-spec.md`.

### 🗑️ Automações residuais (2 a limpar)

| ID | Nome | Origem |
|---|---|---|
| 306955867 | "Automação de envio de e-mail quando um alerta (atrasado) for emitido" | Template CRM leftover |
| 306955869 | "Teste de automação" | Teste manual esquecido |

Ambas devem ser deletadas.

## Layer 7 — Field Conditions (6/6) ✅

| Código | ID | Phase | Nome |
|---|---|---|---|
| FC-01 | 306681511 | Start form | Consent LGPD se Inbound |
| FC-02 | 306681512 | Start form | Campos de indicação |
| FC-03 | 306681513 | Start form | Campos de outbound |
| FC-04 | 306681514 | Pós-demo | Aceite verbal se demo com aceite |
| FC-05 | 306681515 | DESCARTE | Qual concorrente se motivo=6 |
| FC-06 | 306681516 | DESCARTE | Último canal tentado se motivo=9 |

## Layer 8 — Email Templates (4/4) ✅

| Código | ID | Nome | toEmail |
|---|---|---|---|
| ET-01 | 309594743 | Qualificação D+1 | `{{contatos_do_deal_1}}` |
| ET-02 | 309594744 | Qualificação D+3 | `{{contatos_do_deal_1}}` |
| ET-03 | 309594745 | Qualificação D+7 (última tentativa) | `{{contatos_do_deal_1}}` |
| ET-04 | 309594746 | Proposta D+3 follow-up | `{{contatos_do_deal_1}}` |

Todos apontam para o connector novo pós-refactor. ✅

## Labels (6/6) ✅

Frio (#2979FF), Morno (#FFAB00), Quente (#FF3D00), QS (#4CAF50), FS (#FF9800), Fora ICP (#757575).

---

## ⚠️ Divergências do plano original (justificadas/pendentes)

1. **Start form refactor** — 6 campos planos → connectors relacionais. **Decisão arquitetural do Architect** durante Step 06, validada posteriormente pelo usuário (refactor Contatos 2026-04-22).

2. **`anyone_can_create_card: True`** — plano dizia `False`. Impacto: qualquer membro do workspace pode criar deals. Recomendação: revisar com base em política de governança.

3. **Campo "Categoria primária"** em Parceiros — adicionado pelo Architect sem estar no PDD. Hoje convertido de `label_select` (quebrado na UI de tables) para `checklist_vertical` (funcional).

## 🗑️ Cleanup recomendado

1. **Deletar 2 automações residuais** (306955867, 306955869) — consomem slot de quota
2. **Deletar 3 pipes [CRM]** template + **3 tabelas [Legacy]** se não forem reaproveitadas (16 registros demo seriam perdidos)
3. **Bug phase field rendering** — investigar ou aceitar workaround start-form
4. **Connector legado `contatos_do_deal` → Parceiros** — deletar quando confirmado que nenhum deal produtivo depende

## ❌ Pendências externas (fora do Pipefy, conforme plano)

1. External cron implementando A-05, A-06, A-10, A-16 — spec documentada
2. 4 webhook endpoints: `https://nexuz.com.br/api/webhook/pipefy/*`
3. Google Doc Playbook + substituir placeholder `PLAYBOOK-VENDAS-NEXUZ` em ~55 field descriptions
4. DPAs LGPD assinados antes do go-live (PDD R-09)
5. Filtro dinâmico cross-field no connector `Contatos do deal` (UX cascade picker) — sniff template pronto

---

## Veredito

**Step 06 está COMPLETO em essência**: todos os objetos planejados foram criados, com 3 tipos de divergência:
- ✅ **Ampliações** aprovadas (Contatos, Atividades novas)
- ⚠️ **Refactor arquitetural** (start form → connectors) — melhoria de design validada pelo usuário
- 🗑️ **Resíduos** a limpar (2 automações, opcional limpeza de templates CRM)

**Recomendação:** Step 06 pode ser formalmente APROVADO, com as 4 tarefas de cleanup (ver acima) adicionadas ao backlog do Step 08 (auditoria Vera). Os pendentes externos seguem fora de escopo do Pipefy e não bloqueiam a conclusão da squad.
