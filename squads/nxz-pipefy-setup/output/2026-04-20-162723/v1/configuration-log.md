# Configuration Log — Pipefy Setup Nexuz Vendas

**Run:** 2026-04-20-162723  
**Data:** 2026-04-20  
**Org:** Nxz Sistemas Inteligentes Ltda (`302461450`)  
**Usuário:** Walter Frey (`nxz@nxz.one`)  
**Skill:** `pipefy-integration` v1.0.0  
**Interface:** 100% GraphQL API (Playwright não necessário nesta execução)

## Resumo

- **Sucesso:** 2 databases + 32 table_fields + 1 pipe + 8 phases + 6 labels + 10 start form + 48 phase fields + 55 helps/descriptions = **162 objetos criados/atualizados**
- **Falha:** 0 (após correção com id+uuid)
- **Iterações de aprendizado:** 2 (pipe recriado 1× após descobrir start form design error)
- **Skill atualizada:** `known-limitations.md` com 6 aprendizados novos

## IDs Criados (referência rápida)

| Objeto | Nome | ID |
|---|---|---|
| Table | **Parceiros** | `xcO4_FB_` |
| Table | **Clientes** | `XaduYW7H` |
| Pipe | **Vendas** | `307117441` |
| Phase (start form oculta) | (internal) | `342928165` |
| Phase | Novo Lead | `342928169` |
| Phase | Qualificação | `342928170` |
| Phase | Demo Agendada | `342928171` |
| Phase | Pós-demo | `342928172` |
| Phase | Proposta | `342928173` |
| Phase | Fechamento | `342928174` |
| Phase | GANHO (done=true) | `342928175` |
| Phase | DESCARTE (done=true) | `342928176` |
| Label | Frio | `317580100` |
| Label | Morno | `317580101` |
| Label | Quente | `317580102` |
| Label | QS | `317580103` |
| Label | FS | `317580104` |
| Label | Fora ICP | `317580105` |

## Layer 1: Databases

### Database: Parceiros (`xcO4_FB_`)
- ✅ Criada em 2026-04-20T16:38 via GraphQL (`createTable`)
- Icon: `globe` / Public: false / Authorization: write_access
- **18 fields criados** (`createTableField`):
  - Nome / Razão Social (`short_text`, required) — title
  - Nome Fantasia (`short_text`)
  - Tipo pessoa (`select` PF/PJ, required) — discriminador CTI
  - Documento CPF ou CNPJ (`short_text`, required)
  - Categoria primária (`label_select` multi: Cliente/Fornecedor/Colaborador/Contato/Prestador, required)
  - E-mail principal, Telefone/WhatsApp, CEP, Endereço, Cidade, UF (27 UFs)
  - Website, LinkedIn, Instagram
  - Papel no comitê (`select`: Decisor/Influenciador/Operacional/Gatekeeper)
  - Status (`select` Ativo/Inativo/Bloqueado, required)
  - Observações (`long_text`)
  - **Conta mãe (se Contato)** (`connector` → Parceiros self-ref, C-04)

### Database: Clientes (`XaduYW7H`)
- ✅ Criada em 2026-04-20T16:42 via GraphQL
- Icon: `briefcase` / Public: false / Authorization: write_access
- **14 fields criados**:
  - **Parceiro** (`connector` → Parceiros, 1:1, required) — **core do CTI (C-03)**, `can_connect_multiples=false`
  - Segmento/ICP (`select` QS/FS/Zona fronteira/Fora ICP, required)
  - Porte, Nº unidades, Faturamento mensal, Sistema atual
  - Status comercial (`select` Prospect/Proposta em negociação/Ativo (Live)/Cancelado, required)
  - MRR atual, Plano contratado (10 módulos), Data primeiro contato, Data Live
  - LTV estimado, NPS atual, Observações comerciais

## Layer 2: Pipe Vendas (`307117441`)

- ✅ Criado via `createPipe` com phases + labels embutidos
- **8 phases** (após deletar 3 defaults Pipefy: Caixa de entrada, Fazendo, Concluído)
- **6 labels** (Temperatura + ICP) com cores da paleta Material Design

## Layer 3: Start Form (`342928165`)

10 fields criados, **todos com description + help** preenchidos (referência ao Playbook futuro):

| # | Field | Type | Required |
|---|---|---|---|
| 1 | Título do deal | short_text | ✅ |
| 2 | **Cliente** | connector → Clientes | ✅ |
| 3 | **Contatos do deal** | connector → Parceiros (multi) | ✅ |
| 4 | Origem | select (Inbound/Outbound/Indicação/Evento/Parceiro) | ✅ |
| 5 | Canal preferido | select (6 opções) | ✅ |
| 6 | Consentimento LGPD | radio_horizontal Sim/Não | |
| 7 | Quem indicou | short_text (condicional Indicação) | |
| 8 | Contexto da indicação | long_text | |
| 9 | Reason to Call | long_text (condicional Outbound) | |
| 10 | ICP | select (condicional Outbound) | |

## Layer 4: Phase Fields

Total: **48 phase fields + 10 start form = 58 fields** (todos com description curta + help detalhado).

### Phase 1: Novo Lead (2 fields)
Ops responsável, Data entrada etapa

### Phase 2: Qualificação (14 fields)
**Checklist Binário 6/6** (6× radio Sim/Não, gate F-Qualif) + suporte (Faturamento, Dor central, Nº unidades, Urgência) + Marcos POD (Data MQL, Data SAL)

### Phase 3: Demo Agendada (4 fields)
Data da demo, Tipo de demo (QS/FS), Quem vai conduzir, Decisores presentes

### Phase 4: Pós-demo (5 fields)
Status demo, Aceite verbal, Contagem reagendamentos, Data demo realizada, Dor confirmada

### Phase 5: Proposta (10 fields)
Data proposta enviada, Proposta anexo, Preço base, Margem %, Desconto %, Valor proposto final, MRR, Módulos contratados (10 opções), statement "Aceite", Aceite proposta (gate R12)

### Phase 6: Fechamento (5 fields)
CNPJ (cnpj type), Razão social, Boleto emitido, Pagamento confirmado, Contrato assinado (gate F-GANHO combinado dispara A-13 → move para GANHO)

### Phase 7: GANHO (3 fields)
Data Ganho, Handoff Implantação (card), Notas de handoff

### Phase 8: DESCARTE (5 fields)
Motivo descarte (9 motivos + Nutrição expirada), Qual concorrente (cond FC-05), Último canal tentado (cond FC-06), Observação, Data descarte

## Layer 5-7: PENDENTE (próxima execução)

- ❌ **Field Conditions** (6 FCs): FC-01 a FC-06 (visibilidade dinâmica UI)
- ❌ **Automations** (16 A-xx): cadência de Qualificação/Proposta, marcos POD, GANHO automático, Desconto alerta, Audit diário duplicatas, SLA alerts
- ❌ **Email Templates** (4 ET-xx): ET-01 a ET-04 (PT-BR, respeitando R36 janela seg-sex 9-18h)

## Aprendizados incorporados à skill `pipefy-integration`

`skills/pipefy-integration/references/known-limitations.md` atualizada com 6 limitações novas (itens 1a-1f):

| # | Limitação | Workaround |
|---|---|---|
| 1a | ID collision entre phase_field e table_field com mesmo slug | Passar `id + uuid` juntos em `updatePhaseField` |
| 1b | Fields no Novo Lead não populam Start Form | Criar fields direto em `pipe.startFormPhaseId` |
| 1c | `deletePhaseField` bloqueia ~85% dos types | Deletar pipe inteiro + recriar |
| 1d | `createPipe` cria 3 phases default sempre | Capturar IDs e chamar `deletePhase` em cada |
| 1e | `checkbox` não existe em phase_fields | Usar `radio_horizontal` com ["Sim","Não"] |
| 1f | `createPipe` não aceita argumento `public` | Default é privado |

## Decisões arquiteturais preservadas

- **DD-001:** Contas → Parceiros + CTI (4 tabelas planejadas, 2 criadas nesta execução)
- **DD-002:** Enforcement 1:1 do connector especializada→Parceiros (pre-check + title + audit — audit ficará em Layer 6 próxima)
- **DD-003:** Escopo Parceiros + Clientes (Fornecedores/Colaboradores em futuras execuções)
- **DD-004:** Creation livre (sem Creation-via-Parceiros)
- **Abordagem A** para roles de Contato: 1 connector único + role global no Parceiro (`Papel no comitê`)

## Pendências de UX / limpeza manual

Nenhuma. A versão final (v2) do pipe foi recriada limpa, sem duplicatas.

## Arquivos gerados nesta execução

- `pipe-design.md` — design completo (Mermaid + phases + fields + automações)
- `design-decisions.md` — 4 decisões arquiteturais
- `pipefy-crm-reference.md` — referência dos 3 pipes CRM existentes
- `research-findings.md` — pesquisa API Pipefy (Rita)
- `specs/01-07-*.json` — JSON specs estruturados
- `configuration-log.md` — este arquivo

## Próximos passos recomendados

1. **Testar no Pipefy agora:** abrir o pipe `Vendas` (307117441), clicar "Nova oportunidade", preencher o Start Form com um lead de teste, validar que o Cliente+Contatos são criados corretamente via connector
2. **Executar Layers 5-7** em próxima run da squad quando quiser (scripts estão prontos nos JSON specs)
3. **Configurar Playbook Vendas Nexuz** — os helps de todos os fields apontam para sections do Playbook que ainda não existe; criar esse documento é o próximo passo natural
4. **Webhook de audit (DD-002 camada 3)** — decidir onde hospedar o receiver (Slack incoming webhook? serverless function? ClickUp task creation?)
5. **DPAs (PDD R-09)** — assinar antes do go-live produtivo com Pipefy como operador de dados
