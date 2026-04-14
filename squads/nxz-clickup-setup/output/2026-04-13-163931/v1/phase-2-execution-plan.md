# Fase 2 — Plano de Execução em Sessões Limpas

> **Objetivo:** completar a configuração do Space Vendas com Views, Automações, Dashboard e Goals, quebrando o trabalho em sessões dedicadas para caber no budget de contexto de cada execução.
>
> **Pré-requisitos (todos atendidos):**
> - Space Vendas (90175210820), Folder CRM (90178149765), 4 Lists criadas
> - Custom Statuses configurados nas 4 Lists
> - Custom Fields Lote A (11) e Lote B (20) criados
> - Relationships: Leads & Deals 1→1 Contas · Contatos N→1 Contas
> - Default task types: Contatos=Contact · Contas=Account · **Leads & Deals=Deal** ✅ (2026-04-14)
> - Fórmula `Forecast ponderado` validada
> - 4 Docs criados (sub-pages vazias)
> - **Sessão 1 + 1b (6 views com filtros/grouping/sort)** ✅ — 1 item manual pendente: calendar `Data demo`

---

## Estado inicial de cada sessão

Antes de começar, **sempre**:
1. `source .env` (ou `TOKEN=$(grep '^CLICKUP_API_TOKEN=' .env | cut -d= -f2)`)
2. Verificar login Playwright: `browser_navigate https://app.clickup.com/3086998/home` → checar se há snapshot ou redireciona para login
3. Se login necessário: credenciais em `.env` (CLICKUP_EMAIL / CLICKUP_PASSWORD)
4. Verificar estado atual via API:
   ```bash
   curl -s "https://api.clickup.com/api/v2/space/90175210820/view" -H "Authorization: $TOKEN" | jq '.views[] | {id, name, type}'
   curl -s "https://api.clickup.com/api/v2/list/901712879969" -H "Authorization: $TOKEN" | jq '.statuses[].status, .task_count'
   ```

**IDs críticos:**
- Workspace: `3086998`
- Space Vendas: `90175210820`
- Folder CRM: `90178149765`
- List Leads & Deals: `901712879969`
- List Contas: `901712879972`
- List Contatos: `901712879973`
- List Nutrição: `901712879976`

**Field IDs (Leads & Deals):**
- Valor proposto: `39779f2e-41aa-460a-9216-8d73dd4f2451`
- Probabilidade: `5ab07b67-dcc1-439d-9038-20301a9666f7`
- Forecast ponderado: `f4b9298e-58e0-466c-a4f1-ceea180277e6`
- MRR: (verificar via `GET /list/.../field`)
- Motivo perda: `4690cee2-31cb-45bb-9f99-f48ac4d62815`
- Motivo nutrição: `a066dee1-da5c-4596-ae40-c00a4bf9bae4`
- CNPJ: `a727d389-78aa-4efc-9146-00c747a8f4c0`
- Aceite verbal: `a61f74a3-475a-490c-9083-7b2c059ebfae`
- Aceite proposta: `fa500bf9-09fa-4b72-aa81-99b3f1253281`
- Boleto emitido: `6ddf4990-a70c-4fc5-9df2-ae01f28b2e98`
- Pagamento confirmado: `0d67a4f8-6151-4be7-871e-ef09d88d4336`
- Contrato assinado: `cdbdefc0-e8b4-4a00-a283-118f2b8821ca`

---

## SESSÃO 1 — Views (6 views) — ESTRUTURA CONCLUÍDA ✅ (2026-04-14)

**Estado atual:** 6 views criadas com nome/tipo corretos. **Filtros e agrupamentos ainda precisam ser aplicados.**

| View | ID | Tipo | Filtro pendente | Sort/Group pendente |
|---|---|---|---|---|
| Pipeline | 2y6mp-6877 | board | Status ≠ Live AND ≠ Perdido | (board já agrupa por Status) |
| Lista da semana | 2y6mp-6897 | list | Status = Qualificado | Sort: Lead Score desc |
| Demos desta semana | 2y6mp-6917 | calendar | Data demo ∈ semana atual | Campo de data: Data demo |
| Revisão Nutrição | 2y6mp-6937 | list | Status = Nutrição AND Próxima revisão ≤ hoje+7 | — |
| Forecast | 2y6mp-6957 | list | Status ≠ Perdido | Agrupar por Status |
| Leads perdidos | 2y6mp-6977 | list | Status = Perdido | Agrupar por Motivo perda |

**Escopo restante (Sessão 1b):** aplicar filtros + sort/group nas 6 views.

### Aprendizados do flow de filtro (Playwright)
Descoberto na sessão 1:
- Overlays `.cdk-overlay-backdrop` reaparecem após cada click e bloqueiam o próximo — sempre remover via `evaluate` antes de qualquer ação
- Sequência para adicionar filtro Status:
  1. `page.getByRole('button', { name: 'Filtro', exact: true }).first().click()`
  2. `evaluate(() => document.querySelector('[data-test="filter-value-add-dropdown__toggle"]').click())` (usar evaluate evita backdrop)
  3. Selecionar campo `Status` (option role)
  4. Click `data-test="filter-value__operator-dropdown"` → escolher "Não é" (para filtros negativos)
  5. Click `data-test="status-filter__toggle"` → multi-select dos valores
- Para agrupar: botão "Menu suspenso" com texto "Agrupando por: X" → escolher novo campo
- Para ordenar: abrir colunas (ícone/botão "Colunas") ou clicar no header da coluna → Sort descending

### Padrão de criação de view (JÁ VALIDADO)
Snippet que funcionou em loop para as 6 views:
```js
async function createView(viewTypeRegex, newName) {
  await page.evaluate(() => document.querySelectorAll('.cdk-overlay-backdrop').forEach(e => e.remove()));
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Visualização Adicionar' }).first().click();
  await page.waitForTimeout(900);
  await page.getByRole('button', { name: viewTypeRegex }).first().click();
  await page.waitForTimeout(2500);
  const tabs = page.locator('[data-test^="data-view-item__name-text__"]');
  await tabs.nth(await tabs.count() - 1).click({ button: 'right' });
  await page.waitForTimeout(500);
  await page.locator('[data-test="dropdown-list-item__rename"]').click();
  await page.waitForTimeout(400);
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Delete');
  await page.keyboard.type(newName, { delay: 30 });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(900);
}
```
Regex de tipo: `/Lista Acompanhe/i` para List, `/Calendário/i` para Calendar, `/Quadro – Kanban/i` para Board.

### Validação (executada)
```bash
TOKEN=$(grep '^CLICKUP_API_TOKEN=' .env | cut -d= -f2)
curl -s "https://api.clickup.com/api/v2/list/901712879969/view" -H "Authorization: $TOKEN" | jq '.views[] | {id, name, type}'
```
Retornou as 6 views corretas em 2026-04-14.

---

## SESSÃO 2 — Automações — **EXECUTAR MANUALMENTE** (Playwright inviável)

> **Decisão 2026-04-14 (segunda tentativa):** Após 2 sessões de tentativa com Playwright, confirmado que a nova UI "converged-ai-task" da ClickUp impede automação confiável. Seguir via **guia manual** no arquivo `phase-2-lote-a-manual-guide.md`.
>
> **Escopo atual (Lote A):** 4 automações time-in-status (#1, #2, #5, #7). Usuário executa na UI (~15min). Após validação em produção, decidir se Lotes B/C/D valem o esforço ou se ficam permanentemente manuais.
>
> **Ajustes 2026-04-14 (primeira tentativa, preservados):**
> - 7 automações default legadas (tipo `When task created → set custom field`) **deletadas**. Começar do zero.
> - Escopo reduzido de 16 → 14: pular #9 (@Sabrina) e #11 (@Luiz) até esses usuários serem onboardados. Workspace atual: Carol Oliveira, Matheus Caldeira, Walter Frey.
> - **Menções sempre com nome completo:** @Carol Oliveira (não @Carol).
>
> **Bloqueio técnico confirmado:** botões `automation-tab-manage__add-automation-button` e `automation-converged-ai-task-create-button` respondem ao click JS mas o builder não monta — `ReactModalPortal` permanece vazio. O overlay `cdk-overlay-connected-position-bounding-box` do Angular CDK consome eventos. Tentativas testadas sem sucesso: click via ref Playwright, `.click()` via evaluate, mousedown/mouseup dispatch, remoção do overlay antes do click.

**Escopo:** criar 16 automações no List `Leads & Deals`. Executar em **4 lotes de 4**, validando entre lotes.

### Padrão de criação de automação
```
1. URL: https://app.clickup.com/3086998/v/li/901712879969
2. Menu (...) da List → Automatizações → "Criar automação" OU botão "Automatizar" no header
3. Escolher trigger (Status changes, Time in status, Custom field updated, Scheduled)
4. Condições (se aplicável): AND custom field = X, time > Nh
5. Ação: Post comment (com @mention) OU Send email
6. Salvar
```

### Lote A — Alertas time-in-status (4)
| # | Trigger | Condição | Ação |
|---|---|---|---|
| 1 | Time in status "Qualificado" > 48h | — | Post comment `@Carol Oliveira` |
| 2 | Time in status "Primeiro contato" > 16 dias | — | Post comment `@Carol Oliveira` ("mova para Nutrição ou Perdido") |
| 5 | Time in status "Apresentação" > 48h | — | Post comment `@Carol Oliveira` |
| 7 | Time in status "Proposta enviada" > 7 dias | — | Post comment `@Carol Oliveira` |

### Lote B — Emails ao lead (5)
| # | Trigger | Ação |
|---|---|---|
| 3 | Status changes to "Agendamento" | Send email template "Confirmação demo" |
| 4 | Scheduled: Data demo = amanhã | Send email lembrete + Notify `@Carol Oliveira` |
| 6 | Time in status "Proposta enviada" > 3 dias | Send email follow-up |
| 13 | Time in status "Nutrição" = 7 dias | Send email "Conteúdo NXZ" |
| 14 | Time in status "Nutrição" = 15 dias | Send email "Case NXZ" |

### Lote C — Fechamento (4)
| # | Trigger | Condição | Ação |
|---|---|---|---|
| 8 | Time in status "Fechamento" > 48h | CNPJ empty | Post comment `@Carol Oliveira` (cobrar docs) |
| 9 | Boleto emitido = true time > 5d | Pagamento confirmado = false | Post comment `@Carol Oliveira` + `@Sabrina` |
| 10 | Pagamento confirmado = true time > 3d | Contrato assinado = false | Post comment `@Carol Oliveira` |
| 11 | Pagamento = true AND Contrato = true | — | Change status → Live + Post `@Luiz` + Create task em Implantações |

### Lote D — Perdidos + Nutrição + Revisão (3)
| # | Trigger | Condição | Ação |
|---|---|---|---|
| 12 | Status changes to Perdido | Motivo perda empty | Post comment `@Carol Oliveira` |
| 15 | Time in status "Nutrição" = 30 dias | — | Post comment `@Carol Oliveira` (revisar score) |
| 16 | Scheduled: Próxima revisão = hoje | — | Post comment `@Carol Oliveira` |

### Notas técnicas
- **"Time in status"** pode exigir plano Business+ — validar no primeiro lote
- **Guest users** (Sabrina/Matheus): testar se recebem @mentions; fallback para email se necessário
- **Automação 11** cria task cross-space em Implantações — requer Space Relacionamento criado (Fase 2+); se não existir, configurar automação parcial (só status change + notify) e deixar criação de task para sessão posterior

### Validação
```bash
curl -s "https://api.clickup.com/api/v2/list/901712879969/automation" -H "Authorization: $TOKEN" | jq '.automations[] | {id, name, enabled}'
```

**Estimativa:** 16 × 10-15 interações = 160-240 interações. Sessão limpa dedicada.

---

## SESSÃO 3 — Dashboard + Goals

### Dashboard "MRR & Pipeline NXZ"

**Localização:** Hubs → Dashboards → Criar dashboard (nível Workspace ou Space)

**Fonte dos dados:** List `Leads & Deals` (901712879969)

**6 Cards:**
| # | Tipo | Config |
|---|---|---|
| 1 | Calculation (Number) | Soma de `MRR` · Filtro: Status = Live · Período: mês corrente |
| 2 | Calculation (Number) | Soma de `Forecast ponderado` · Filtro: Status ∉ {Live, Perdido} |
| 3 | Calculation | count(Status=Live) / count(Status ∈ {Live, Perdido}) · Período: mês |
| 4 | Pie chart | Agrupar por `Canal` · Filtro: created ∈ mês |
| 5 | Bar chart | Agrupar por `Motivo perda` · Filtro: Status = Perdido · Período: trimestre |
| 6 | Line chart | Soma `MRR` por semana · Status = Live · Últimas 12 semanas |

### Goal Q2-2026

**Nome:** "Previsibilidade comercial Q2-2026"
**Period:** 2026-04-01 → 2026-06-30
**Owner:** Walter Frey

**5 KRs:**
| # | Descrição | Target | Measurement |
|---|---|---|---|
| KR1 | MRR adicionado/mês | ≥ R$ 50.000 | Number target · Soma MRR onde Status = Live |
| KR2 | Win Rate | ≥ 25% | Percentage target · Live / (Live + Perdido) |
| KR3 | Ciclo médio de venda | ≤ 21 dias | Number target · Média time-to-Live |
| KR4 | Perdidos com motivo preenchido | 90% | Percentage · count(Motivo perda ≠ null) / count(Status = Perdido) |
| KR5 | Demos realizadas/mês | ≥ 40 | Number · count onde Data demo ∈ mês |

### Caminho Playwright (Goals)
```
1. URL: https://app.clickup.com/3086998/goals
2. Botão "Novo objetivo"
3. Nome, período, owner
4. Adicionar KR → escolher tipo (Number/Percentage/Task) → conectar ao campo/list
5. Repetir para 5 KRs
6. Salvar
```

**Estimativa:** Dashboard 6 cards × 15 interações = 90. Goals 5 KRs × 10 = 50. Total 140 interações. Sessão limpa.

---

## SESSÃO 4 (OPCIONAL) — Conteúdo dos Docs + Cross-space

### 4 Docs (sub-pages vazias)
- 📘 Playbook de Vendas NXZ (`2y6mp-6777`) — roteiros por etapa do funil
- 📗 Scripts & Templates (`2y6mp-6797`) — templates de email, mensagem, proposta
- 📕 Tratamento de Objeções (`2y6mp-6817`) — top 10 objeções e respostas
- 📙 Onboarding do SDR (`2y6mp-6837`) — checklist de onboarding

**Execução:** agente Tiago Treinamento (Step 09 do squad) gera conteúdo; criar pages via API:
```bash
curl -X POST "https://api.clickup.com/api/v3/workspaces/3086998/docs/2y6mp-6777/pages" \
  -H "Authorization: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Etapa 1 — Qualificado","content":"..."}'
```

### Relationship cross-space "Implantação"
- Requer Space "Relacionamento" (ou similar) com List "Implantações" criados previamente
- Criar relationship em `Leads & Deals`: tipo `relationship`, target = List Implantações

---

## Checklist de retomada (para abrir próxima sessão)

```
[ ] Ler squads/nxz-clickup-setup/output/2026-04-13-163931/v1/configuration-log.md
[ ] Ler squads/nxz-clickup-setup/output/2026-04-13-163931/v1/phase-2-execution-plan.md (este arquivo)
[ ] source .env
[ ] Verificar login ClickUp via Playwright
[ ] Confirmar estado atual via API (views, automations, goals existentes)
[ ] Executar a sessão apropriada (1b, 2, 3 ou 4)
[ ] Atualizar configuration-log.md ao final de cada sessão
```

---

## Histórico de execuções

| Data | Sessão | Entrega | Observações |
|---|---|---|---|
| 2026-04-13 | Fase 1A | Hierarquia (Space, Folder, 4 Lists) + 4 Docs | API v2 |
| 2026-04-13 | Fase 1B-A | Custom Statuses · Custom Fields Lote A (11) | Playwright |
| 2026-04-14 | Fase 1B-B | Custom Fields Lote B (20) · Relationships · Default task types · Hide nativos · Fields Contatos/Contas · Fórmula Forecast ponderado | Playwright + API; CNPJ sem máscara (limitação ClickUp) |
| 2026-04-14 | Sessão 1 (Views) | 6 views criadas (estrutura nome+tipo) | Filtros/grouping adiados para Sessão 1b |
| 2026-04-14 | Sessão 1b (Filtros) | Filtros/grouping/sort em 5/6 views aplicados via API v2. Calendar Data demo pendente (manual). | Chave: `cf_<id>` p/ custom fields; `{type:done\|closed}` p/ status groups em NOT-filters |
| 2026-04-14 | Default task type Deal | `Leads & Deals` default task type alterado para **Deal** (ID 1003) via Playwright (right-click → Tipo de tarefa padrão → Deal). API GET retorna null para todas Lists — limitação do endpoint. | UI valida: header mostra "+ Deal" |
| 2026-04-14 | Sessão 2 (descoberta) | **Time In Status é CONDIÇÃO, não trigger.** Plano ClickUp ajustado desbloqueou. Padrão correto para as 10 automações time-based descrito abaixo. Sessão interrompida por lock de perfil Playwright. | Nenhuma automação criada ainda — só mapeamento do builder |
| 2026-04-14 | Sessão 2 (tentativa Playwright) | **Bloqueada.** Nova UI "converged-ai-task" da ClickUp substituiu o builder clássico. Botão Automatizar agora abre dropdown com sugestões IA; rodapé tem "Gerenciar automações" → "+ Adicionar automação", mas o click fecha o dialog sem abrir o builder (overlay `cdk-overlay-connected-position-bounding-box` intercepta). Escopo reduzido mid-session 14→4 (Lote A). Zero automações salvas. | Gerado guia manual em `phase-2-lote-a-manual-guide.md` — usuário vai executar manualmente (~15min) |
| 2026-04-14 | Sessão 2 (spike retomada) | **UI DESBLOQUEADA.** Botão "Automatizar" → dropdown "Criar automação" (ref `automation-converged-ai-task-create-button` dentro de `cu-automation-converged-ai-task-other-automations-list`) agora **abre o dialog `Automações`** corretamente. Builder funcional: trigger selector, "Adicionar condição", action selector, botão Criar. Escopo 16→14 (pular #9 Sabrina, #11 Luiz — não estão no workspace). Modo de execução: **Playwright via subagent** (contexto isolado). | Path validado: click `[data-test="automation-converged-ai-task-button__button"]` → click `cu-automation-converged-ai-task-other-automations-list [data-test="automation-converged-ai-task-create-button"]` → dialog abre |

**Sessão ativa:** 2 (14 automações via Playwright, subagent).
**Usuários disponíveis:** Carol Oliveira, Walter Frey, Matheus Caldeira. Sabrina/Luiz ainda não no /team.
**Pulados:** #9 (depende @Sabrina), #11 (depende @Luiz).

### Padrão descoberto (Sessão 2 — 2026-04-14)
Trigger "Tempo em status" **não existe** no menu de triggers. Opções de trigger disponíveis: `Tarefa criada`, `Alterações de status`, `Alterações de campo personalizado`, `A cada...` (scheduled), `Comunicação`, `Datas e horário`, etc.

**"Time In Status" existe como condição** (acessada via botão "Adicionar condição" dentro do builder). Lista completa de condições: Assignee, Current Date Is, Custom Field, Due Date, O nome da tarefa contém, Observador, Priority, Start Date, Status, Tag, Time Estimate, **Time In Status**, Tipo de tarefa.

**Padrão para automações time-based (#1, #2, #5, #6, #7, #8, #10, #13, #14, #15):**
```
Trigger:   A cada 4 horas (ou intervalo apropriado)
Condição 1: Status = <status alvo>
Condição 2: Time In Status > <threshold> (ex: 48h, 7d)
Ação:      Adicionar comentário "@Carol Oliveira <mensagem>"
```

**Padrão para automações status-change (#3, #4, #12, #16):**
```
Trigger:   Alterações de status (De: Qualquer → Para: <alvo>)  ou  A cada... (scheduled)
Ação:      Adicionar comentário ou Enviar e-mail
```

### Lock Playwright (resolver antes de retomar)
Sessão 2 travou com Chrome órfão segurando `_opensquad/_browser_profile/SingletonLock` (PID 53070 no snapshot). Próxima sessão: matar processo ou aguardar fechamento antes de reabrir.

### Plano de execução Sessão 2 (retomada) — **MODO MANUAL**
**Usar:** `phase-2-lote-a-manual-guide.md` (mesmo diretório)

**Passos resumidos para Lote A (4 automações):**
1. Abrir Lista Leads & Deals no ClickUp
2. Clicar **Automatizar** → **Gerenciar automações** (rodapé do dropdown) → **+ Adicionar automação**
3. Trigger: **A cada... → Diariamente** (09:00)
4. Condição 1: **Status** = <status alvo>
5. Condição 2: **Time In Status** > <threshold>
6. Ação: **Adicionar comentário** com `@Carol Oliveira <mensagem>`
7. **Criar** (salvar)
8. Repetir 4×

Tabela completa (nomes, status, thresholds, mensagens) no arquivo de guia.

### Se alguma sessão futura quiser retentar Playwright
Pré-requisitos para nova tentativa valer o esforço:
- Confirmar que ClickUp ainda usa o padrão `cu-edit-automation__container` OU que rolaram de volta para UI antiga
- Testar em conta pessoal de desenvolvimento primeiro (sem risco)
- Avaliar browser_use ou alternativas ao Playwright MCP padrão
- Considerar: custo real de Playwright p/ 4 automações > 100k tokens vs. 15min manuais do usuário

### Validação final (quando todas criadas)
```bash
curl -s "https://api.clickup.com/api/v2/list/901712879969/automation" -H "Authorization: $TOKEN" | jq '.automations[] | {id, name, enabled}'
```
