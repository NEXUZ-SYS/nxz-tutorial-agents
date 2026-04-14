# Log de Configuração ClickUp — Vendas (Run 2026-04-13-163931)

**Executor:** Carlos Configurador ⚙️
**Workspace:** Nxz Sistemas (3086998)
**Estratégia:** Execução parcial — Fase 1A via API + MCP (hierarquia + Docs). Fase 1B via Playwright (statuses + custom fields). Fase 2 em próxima execução (automações, views, dashboard, goals).

---

## Resumo Fase 1A

- Total de operações: 9
- Sucesso: 9
- Falha: 0
- Manual required (Fase 1B/2): 4 blocos

## Departamento: Vendas

### Space: Vendas
- [✅] Criado em 2026-04-13 16:50 — **ID: 90175210820**
- URL: https://app.clickup.com/3086998/v/s/90175210820
- Features habilitadas: due_dates · tags · checklists · custom_fields · dependency_warning · portfolios
- Features desabilitadas: time_tracking, time_estimates (não necessárias em CRM)

### Folder: CRM
- [✅] Criado em 2026-04-13 16:51 — **ID: 90178149765**

### Lists (4 — dentro de Folder CRM)
| List | ID | Descrição |
|---|---|---|
| Leads & Deals | 901712879969 | Funil principal (9 etapas do Funil NXZ v1.0) |
| Contas | 901712879972 | Empresas (CNPJ, razão social, segmento) |
| Contatos | 901712879973 | Pessoas nas contas (decisores, influenciadores) |
| Nutrição | 901712879976 | Leads em cadência longa (D+30/D+60) |

### Docs (4 — nível Space)
| Doc | ID | URL |
|---|---|---|
| 📘 Playbook de Vendas NXZ | 2y6mp-6777 | https://app.clickup.com/3086998/docs/2y6mp-6777 |
| 📗 Scripts & Templates | 2y6mp-6797 | https://app.clickup.com/3086998/docs/2y6mp-6797 |
| 📕 Tratamento de Objeções | 2y6mp-6817 | https://app.clickup.com/3086998/docs/2y6mp-6817 |
| 📙 Onboarding do SDR | 2y6mp-6837 | https://app.clickup.com/3086998/docs/2y6mp-6837 |

> Docs foram criados com página inicial em branco. Conteúdo das sub-pages (roteiros, scripts, objeções, onboarding SDR) fica para próxima fase — pode ser gerado pelo agente Trainer (Tiago Treinamento) no Step 09.

---

## Fase 1B — EM EXECUÇÃO (Playwright)

### Custom Statuses — CONCLUÍDO ✅
- [✅] **Leads & Deals**: 9 statuses — Qualificado (Azul) · Primeiro contato · Agendamento · Apresentação · Proposta enviada (Amarelo) · Fechamento (Laranja) · Live (Closed Won, Verde escuro) · Nutrição (Cinza) · Perdido (Closed Lost, Vermelho)
- [✅] **Contas**: Ativa / Prospect / Cliente / Churn
- [✅] **Contatos**: Decisor / Influenciador / Usuário / Inativo
- [✅] **Nutrição**: Ciclo 1 / Ciclo 2 / Revisão

### Custom Fields — Lote A (11 críticos) CONCLUÍDO ✅
Campos criados em `Leads & Deals` (via Playwright + JS injection):

| Campo | Tipo | ID |
|---|---|---|
| Aceite verbal | checkbox | a61f74a3-475a-490c-9083-7b2c059ebfae |
| Aceite proposta | checkbox | fa500bf9-09fa-4b72-aa81-99b3f1253281 |
| Boleto emitido | checkbox | 6ddf4990-a70c-4fc5-9df2-ae01f28b2e98 |
| Pagamento confirmado | checkbox | 0d67a4f8-6151-4be7-871e-ef09d88d4336 |
| Contrato assinado | checkbox | cdbdefc0-e8b4-4a00-a283-118f2b8821ca |
| CNPJ | short_text | a727d389-78aa-4efc-9146-00c747a8f4c0 |
| Razão social | short_text | 9a7d6102-2c36-4b88-b5df-219e6bff73ef |
| Valor proposto | currency (**BRL**) | 39779f2e-41aa-460a-9216-8d73dd4f2451 |
| Data demo | date | 80133cc1-c40f-442b-9888-00a025ebe43b |
| Motivo perda | drop_down | 4690cee2-31cb-45bb-9f99-f48ac4d62815 |
| Motivo nutrição | drop_down | a066dee1-da5c-4596-ae40-c00a4bf9bae4 |

**Ajustes aplicados (2026-04-14):**
- ❌ Removido "Jason preenchido" (escopo de onboarding/implantação, fora do funil de vendas) — Automação #11 (Jason → Matheus) também removida
- ✅ `Valor proposto` currency alterada de USD para **BRL** (R$)
- ✅ Formato de data de Walter alterado para `dd/mm/yyyy`
- ⚠️ `number_format: en-US` é read-only no ClickUp (não exposto na UI/API) — separadores ficam "R$ 1,234.56" em vez de "R$ 1.234,56". Única via de correção: ticket no suporte ClickUp.

### Custom Fields — Lote B CONCLUÍDO ✅ (2026-04-14)

**Leads & Deals — campos complementares criados:**

| Campo | Tipo | Observação |
|---|---|---|
| Lead Score | number | 0–100 |
| Canal | drop_down | Inbound · Outbound · Indicação · Evento · Parceiro |
| ICP | drop_down | Tier 1 · Tier 2 · Tier 3 · Fora do ICP |
| Reason to Call | short_text | — |
| Abertura sugerida | long_text | — |
| LinkedIn URL | url | — |
| Produto de interesse | labels (multi) | Totem · PDV · Smart POS · KDS |
| Faturamento estimado | currency (BRL) | — |
| Nº decisores | number | — |
| Tipo demo | drop_down | Remota · Presencial · Híbrida |
| Dor central | long_text | — |
| Data proposta enviada | date | — |
| Probabilidade | number | 0–100 (%) |
| Forecast ponderado | formula | `field("Valor proposto") * field("Probabilidade") / 100` — ✅ validada (`calculation_state: ready`) |
| MRR | currency (BRL) | — |
| Módulos contratados | labels (multi) | — |
| Ciclo nutrição | drop_down | Ciclo 1 · Ciclo 2 · Revisão |
| Próxima revisão | date | — |
| Etapa perdida | drop_down | espelha etapas do funil |

### Relationships CONCLUÍDO ✅ (modelo corrigido)

| Origem | Tipo | Destino | Semântica |
|---|---|---|---|
| Leads & Deals | 1 → 1 | Contas | Cada deal pertence a **uma** conta |
| Contatos | N → 1 | Contas | Uma conta tem **vários** decisores |

> **Correção aplicada:** modelagem inicial previa Leads → Contatos direto. Substituída pela cadeia Lead → Conta ← Contatos, refletindo a realidade B2B (conta = empresa, contato = decisor).
>
> Relationship **Implantação** (cross-space) adiado para Fase 2 (depende do Space Relacionamento).

### Default Task Types CONCLUÍDO ✅
- **Contatos** → `Contact`
- **Contas** → `Account`
- **Leads & Deals** → `Deal` (atualizado 2026-04-14)

> API v2 `PUT /list/{id}` com `default_task_type` falha silenciosamente (retorna payload mas não persiste). Aplicado via UI: hover na List → ellipsis menu → "Tipo de tarefa padrão".

### Campos Nativos Ocultados ✅
Em **Contatos** e **Contas**, campos nativos sem uso em CRM foram ocultados das colunas (right-click → Ocultar coluna):
- Data de Vencimento · Responsáveis · Prioridade · Time Estimate · Tags (quando não usadas)

> Ocultar no card (hide-on-card) exige pelo menos uma tarefa criada — adiado para quando houver dados de teste.

### Custom Fields específicos por List ✅ (2026-04-14)

**Contatos:**
| Campo | Tipo |
|---|---|
| Função do contato | short_text |
| Telefone | phone |
| E-mail do contato | email |
| Data de Último Contato | date |
| LinkedIn | url |

**Contas:**
| Campo | Tipo | ID |
|---|---|---|
| Razão Social | short_text | dfc7a98e-fa76-4801-8ad9-dde0b5acf777 |
| CNPJ | short_text | a727d389-78aa-4efc-9146-00c747a8f4c0 |
| Endereço | location | ca0c73a8-0bfa-4870-89e6-2d7f38cd1d86 |
| Site | url | a8dfdccc-9695-4de6-80fb-c0415ccbb859 |

> **CNPJ sem máscara:** ClickUp não suporta input mask nativamente em `short_text`. Campo armazena 14 dígitos puros (padrão compatível com Odoo/Asaas). Orientação fica em descrição do campo.
>
> **CNPJ/Razão Social compartilhados:** ambos existiam originalmente em Leads & Deals (Lote A). Ao criar em Contas, usado botão "Usar existente" (`cfm-duplicate-field-modal__use-existing-button`), preservando mesmo ID.

---

## Fase 2 — EM EXECUÇÃO

### Views — CONCLUÍDO ✅ (2026-04-14)
6 views criadas no List `Leads & Deals`. Filtros/agrupamentos aplicados via **API v2** (exceto calendar, manual):

| View | ID | Tipo | Filtro aplicado | Sort/Group |
|---|---|---|---|---|
| Pipeline | 2y6mp-6877 | board | Status NOT ({type:done}, {type:closed}) ≡ ≠Live ∧ ≠Perdido | Group Status ✅ |
| Lista da semana | 2y6mp-6897 | list | Status EQ qualificado | Sort cf_Lead Score dir=-1 ✅ |
| Demos desta semana | 2y6mp-6917 | calendar | — | ⚠️ **Manual:** calendar date_field não exposto via API v2. Abrir view → selecionar campo `Data demo` na UI |
| Revisão Nutrição | 2y6mp-6937 | list | Status EQ nutrição AND cf_Próxima revisão LT 1776826799000 (2026-04-21 23:59) | ⚠️ timestamp fixo (rolling indisponível via API) |
| Forecast | 2y6mp-6957 | list | Status NOT {type:closed} | Group Status ✅ |
| Leads perdidos | 2y6mp-6977 | list | Status EQ perdido | Group cf_Motivo perda ✅ |

**Aprendizados — Views via API v2:**
- `PUT /api/v2/view/{id}` aceita filters/grouping/sorting diretamente. Muito mais estável que Playwright para views.
- Payload mínimo precisa `{name, type, parent}` para o PUT persistir; sem parent retorna null.
- Custom fields em filters/sorting/grouping exigem prefixo `cf_<field_id>`.
- Status groups usam values do tipo `{"type":"done"|"closed"|"active"}` para NOT-filters.
- Ops relativas de data (NEXT_7, ROLLING) não aceitas via API → usar timestamp fixo ou UI.
- Calendar `date_field` (para calendar views) não é settable via API v2 — somente UI.

**Pendências manuais:**
1. Demos desta semana: selecionar `Data demo` como campo-base do calendar (UI only).
2. Revisão Nutrição: se desejar filtro rolling (sempre hoje+7), ajustar via UI após executar ou criar job cron para PUT diário atualizando o timestamp.

## Fase 2 — PRÓXIMAS SESSÕES

- [✅ Fase 2 Sessão 1b] Filtros/grouping/sort aplicados (2026-04-14, via API v2)
- [⚠️ Fase 2] Calendar `Data demo` (1 step manual na UI)
- [⚠️ Fase 2] 14 Automações (Sessão 2). Escopo ajustado 2026-04-14: skip #9 (@Sabrina) e #11 (@Luiz) até onboarding. 7 automações default legadas deletadas. Usar nomes completos nas menções: **@Carol Oliveira** (membros atuais: Carol Oliveira, Matheus Caldeira, Walter Frey).
- [⚠️ Fase 2] Dashboard "MRR & Pipeline NXZ" (6 cards)
- [⚠️ Fase 2] Goals/OKRs (5 KRs)
- [⚠️ Fase 2] Relationship field cross-space → List Implantações (requer Space Relacionamento)
- [⚠️ Fase 2] Hide-on-card dos campos nativos ocultados (exige tarefas criadas)
- [⚠️ Fase 2] Conteúdo das sub-pages dos 4 Docs (via Tiago Treinamento)

---

## Links úteis

- Workspace: https://app.clickup.com/3086998/
- Space Vendas: https://app.clickup.com/3086998/v/s/90175210820
- Folder CRM: https://app.clickup.com/3086998/v/o/f/90178149765
- List Leads & Deals: https://app.clickup.com/3086998/v/li/901712879969

---

## Próximos passos sugeridos

1. Executar **Fase 1B** em uma sessão dedicada com Playwright: configurar 9 custom statuses + criar top 10 custom fields essenciais (Lead Score, Canal, ICP, Data demo, Aceite verbal, Aceite proposta, Valor proposto, MRR, Motivo perda, Próxima revisão).
2. Validar visualmente os Lists com a Carol antes de prosseguir para automações.
3. Rodar o squad novamente em modo Fase 2 para automações + views + dashboard.
