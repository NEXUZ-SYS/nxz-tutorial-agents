# Pipefy Setup Nexuz — RESUME POINT

**Última sessão:** 2026-04-20
**Run:** `2026-04-20-162723`
**Status:** ⏸ **Paused** após Layer 4 + customizações UI
**Progresso:** 6/11 steps da pipeline (~60%)

---

## 🎯 Como retomar esta execução

Em nova sessão, diga:
> "Retomar squad nxz-pipefy-setup — run 2026-04-20-162723. Continuar com Layers 5-7 (Field Conditions, Automations, Email Templates)."

Ou use:
```
/opensquad run nxz-pipefy-setup
```
e aponte para este run existente quando perguntar.

---

## 📌 Pipefy — Estado atual em produção

**Org:** Nxz Sistemas Inteligentes Ltda (`302461450`)
**Credenciais:** `.env` tem `PIPEFY_API_TOKEN`, `PIPEFY_ORGANIZATION_ID`, `PIPEFY_EMAIL`, `PIPEFY_PASSWORD`

### IDs criados (produção real)

| Objeto | Nome | ID |
|---|---|---|
| Database | Parceiros (CTI abstrata) | `xcO4_FB_` |
| Database | Clientes (CTI especializada) | `XaduYW7H` |
| Pipe | Vendas | `307117441` |
| Phase | Novo Lead | `342928169` |
| Phase | Qualificação | `342928170` |
| Phase | Demo Agendada | `342928171` |
| Phase | Pós-demo | `342928172` |
| Phase | Proposta | `342928173` |
| Phase | Fechamento | `342928174` |
| Phase | GANHO (done) | `342928175` |
| Phase | DESCARTE (done) | `342928176` |
| Start Form (phase oculta) | — | `342928165` |

### ✅ O que já está no Pipefy real

- **2 Databases CTI**: Parceiros (18 fields + self-ref) + Clientes (14 fields + connector C-03 1:1)
- **Pipe Vendas**: 8 phases + 6 labels + 10 start form fields + 48 phase fields + 8 statements
- **Connectors ativos**: C-01 Deal→Cliente, C-02 Deal→Parceiros(PF), C-03 Cliente→Parceiro, C-04 Parceiro self-ref
- **Todos os fields com description curta + help markdown**
- **55 descriptions com link `[Playbook — §X](url)` markdown**
- **8 phase descriptions com resumo 1-linha** (com quebra `\n\n` quando longas)
- **pipe.noun** = "oportunidade" (API)
- **pipe.create_card_label** = "Nova oportunidade" (Playwright CLI)
- **pipe.description** = setada no UI via Playwright (peculiaridade: API query retorna null)

### ❌ Pendente (Layers 5-7 do pipeline da squad)

- **Layer 5 — 6 Field Conditions** (FC-01 a FC-06, visibilidade dinâmica):
  - FC-01 Consent LGPD se Origem=Inbound
  - FC-02 Quem indicou / Contexto se Origem=Indicação
  - FC-03 Reason to Call + ICP + LinkedIn + Cargo se Origem=Outbound
  - FC-04 Aceite verbal se Status demo=Realizada com aceite
  - FC-05 Qual concorrente se motivo=6
  - FC-06 Último canal se motivo=9
  - Specs em: `output/2026-04-20-162723/v1/specs/05-field-conditions.json`

- **Layer 6 — 16 Automations** (A-01 a A-16):
  - 3 marcos POD (data MQL/SAL/Ganho)
  - 3 cadência Qualificação (D+1/D+3/D+7)
  - 3 proposta (D+3 auto, D+7/D+15 alertas)
  - 1 desconto >15% alerta Gestão
  - 1 GANHO automático (pgto+contrato=Sim)
  - 2 SLA Qualificação (D+8 + 48h idle)
  - 1 Fechamento 5d sem pgto
  - 1 Feedback indicador D+7
  - 1 Audit diário Clientes duplicados (DD-002 camada 3)
  - Specs em: `output/2026-04-20-162723/v1/specs/06-automations.json`
  - Estimativa ~250 jobs/mês (12% da quota Enterprise)

- **Layer 7 — 4 Email Templates** (ET-01 a ET-04, PT-BR):
  - ET-01 Qualificação D+1
  - ET-02 Qualificação D+3
  - ET-03 Qualificação D+7 (última tentativa)
  - ET-04 Proposta D+3 follow-up
  - Specs em: `output/2026-04-20-162723/v1/specs/07-email-templates.json`

### 🔧 Tarefas externas ao Pipefy

1. **Criar Google Doc "Playbook Vendas Nexuz"** com as ~22 sections ancoradas (§Intake, §Checklist Binário, §Roteiros de Demo, etc.) — ver lista em `configuration-log.md`
2. **Substituir placeholder** `PLAYBOOK-VENDAS-NEXUZ` pelo ID real do Doc em todas as 55+ descriptions (eu faço em ~2 min quando tiver a URL)
3. **Webhook receiver** para A-16 (audit duplicatas) — Slack, Cloudflare Worker ou serverless
4. **DPAs** (LGPD PDD R-09) — antes do go-live produtivo

---

## 🗂️ Estrutura de arquivos desta run

```
squads/nxz-pipefy-setup/
├── state.json                                   (status: paused)
├── _memory/memories.md                          (aprendizados + IDs + pendências)
├── output/2026-04-20-162723/
│   ├── RESUME.md                                (este arquivo)
│   └── v1/
│       ├── research-findings.md                 Rita Pesquisa (API GraphQL)
│       ├── pipefy-crm-reference.md              3 pipes [Modelo] CRM como ref
│       ├── design-decisions.md                  DD-001/002/003/004
│       ├── pipe-design.md                       Design completo + Mermaid
│       ├── configuration-log.md                 Log consolidado
│       └── specs/
│           ├── 01-databases.json
│           ├── 02-pipe-vendas.json
│           ├── 03-phase-fields.json
│           ├── 04-connectors.json
│           ├── 05-field-conditions.json         ← próximo
│           ├── 06-automations.json              ← próximo
│           └── 07-email-templates.json          ← próximo
├── pipeline/
│   ├── pipeline.yaml (a criar em outra run — opcional)
│   └── data/
│       ├── pdd-source.md
│       ├── config-focus.md                      Step 01 output
│       └── design-approval.md                   Step 05 output
└── agents/                                      5 agent files .agent.md
```

---

## 🧠 Decisões arquiteturais consolidadas

### DD-001 — Modelo CTI Parceiros+Clientes (não "Contas")
- `Parceiros` (abstrata, PF ou PJ) com campo `tipo_pessoa` discriminador
- `Clientes` (especializada PJ comercial) com connector 1:1 para Parceiros
- Fornecedores/Colaboradores = futuras tabelas
- Contatos = registros em Parceiros com `tipo_pessoa=PF`

### DD-002 — Enforcement 1:1 do connector
- **Camada 1 (preventiva)**: pre-check client-side antes de `createTableRecord`
- **Camada 2 (visual)**: title sincronizado com Parceiro + id
- **Camada 3 (detetiva)**: automação diária A-16 via webhook

### DD-003 — Escopo v1
Apenas Parceiros + Clientes + Pipe Vendas. Nutrição, Implantação, Fornecedores, Colaboradores = futuras runs.

### DD-004 — Creation livre
Usuários criam diretamente em Parceiros/Clientes. Sem automação "creation-via-Parceiros".

### Abordagem A para Contatos no Deal
1 connector único multi (`contatos_do_deal` → Parceiros PF), role GLOBAL no Parceiro (`Papel no comitê`).

---

## 🎓 Skill `pipefy-integration` — enriquecida nesta run

Aprendizados novos em `skills/pipefy-integration/references/known-limitations.md`:
- `1a` ID collision phase_field vs table_field (fix: `id + uuid` juntos)
- `1b` Start Form tem phase oculta `startFormPhaseId`
- `1c` `deletePhaseField` bloqueia ~85% dos types
- `1d` `createPipe` cria 3 phases default
- `1e` `checkbox` não existe (usar `radio_horizontal` Sim/Não)
- `1f` `CreatePipeInput` não aceita `public`
- `1g` `help` field não renderiza no UI (usar apenas description)
- `1h` Statement label máx ~255 chars
- `1i` `phase.description` renderiza no topo da coluna
- `1j` Emojis via JSON surrogate pair quebram API
- `1k` Markdown `[texto](url)` funciona em descriptions
- `1l` Markdown em statement.label — verificar caso a caso
- `1m` `pipe.description` read-only via API
- `1n` Markdown validado pela doc oficial Pipefy
- `1o` Quebra de linha `\n\n` em phase.description (≤60 chars/parágrafo)

Novo arquivo: **`references/pipe-customization-defaults.md`** com catálogo de `noun` para 10 processos Nexuz e fluxo completo API+Playwright.

Novo template Playwright: **`scripts/templates/customize-pipe-settings.js`**:
- Auto-login 2-step com PIPEFY_EMAIL/PASSWORD
- Navegação drawer/tabs/header buttons
- CKEditor em iframe via `page.frames()`
- Args: `pipe_id`, `button_text`, `description`

Bug fixes:
- `scripts/run-playwright.sh`: `${2:-{}}` adicionava `}` ao JSON — corrigido
- `playwright.config.js` criado com projects chromium

---

## ▶️ Comando para retomar

Para continuar com **Layer 5 (Field Conditions)**:
```
/opensquad run nxz-pipefy-setup

# Quando perguntar run, use: 2026-04-20-162723
# Então: execute step 06 (configure-pipefy) continuando Layer 5-7
```

Ou simplesmente diga:
> "Continuar nxz-pipefy-setup do run 2026-04-20-162723. Executa Layer 5 (Field Conditions FC-01 a FC-06) usando o spec em output/2026-04-20-162723/v1/specs/05-field-conditions.json"

---

## 📞 Contexto rápido para nova sessão

- **Produto da Nexuz**: ERP + PDV/Go + Smart POS + KDS + Delivery (Food Service)
- **PDD base**: `squads/nxz-backoffice-processes/output/2026-04-16-165948/v6/process-design-document.md` (973 linhas)
- **Squad papers**: Rita Pesquisa 🔍, Paulo Pipes 📐, Caio Configurador ⚙️, Vera Validação ✅, Teo Treinamento 📚
- **Usuário**: Walter Frey — Sponsor comercial (`nxz@nxz.one`)
