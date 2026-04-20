# Briefing CRM Vendas — Nexuz (Agnóstico de Ferramenta)

**Versão:** 1.0 · **Data:** 2026-04-16
**Origem:** Design validado em `workspace-design.md` + aprendizados da execução ClickUp (2026-04-13 a 04-15).
**Propósito:** Reexecutar o CRM de vendas em **Pipefy** (ou qualquer ferramenta) partindo do design consolidado, sem dependência de detalhes específicos do ClickUp.

---

## 1. Contexto de Negócio

**Empresa:** Nexuz — software de gestão e ponto-de-venda para food service e varejo (ERP, Totem, PDV, Smart POS, KDS, Delivery).
**Departamento:** Vendas.
**Operação atual:** Carol (Ops/Vendedora sênior) + SDRs · Sabrina (guest financeiro) · Matheus/Luiz (Relacionamento/Implantação).

**Objetivo de negócio:** Instalar uma máquina de vendas previsível para **NXZ Go** e **NXZ ERP** no mercado Food Service, com funil instrumentado, SLA por etapa, forecast ponderado e handoff limpo para Implantação.

**ICPs:**
- **QS** (Quick Serve — restaurantes casuais, ticket baixo, ciclo curto, demo 15–20 min).
- **FS** (Full Serve — restaurantes com salão/operação complexa, ticket médio-alto, ciclo longo, demo 45–60 min).

---

## 2. Modelo de Dados

### 2.1 Entidades

| Entidade | Propósito | Cardinalidade típica |
|---|---|---|
| **Lead & Deal** | 1 card = 1 oportunidade de venda (fusão lead + deal, simplifica funil) | Alta rotatividade |
| **Conta** | Empresa (CNPJ, razão social, segmento) | 1 conta ↔ N deals ao longo do tempo |
| **Contato** | Pessoa física vinculada a uma conta (decisor, influenciador, usuário) | 1 conta ↔ N contatos |
| **Nutrição** | Leads em cadência longa (ciclos D+30/D+60) — pode ser etapa do funil ou pipeline paralelo | — |
| **Implantação** | Handoff para Relacionamento quando deal fecha (vive em outro departamento) | 1 deal → 1 implantação |

### 2.2 Relacionamentos (obrigatório suportar)

```
Contato  N ─────> 1  Conta  1 <───── 1  Lead & Deal  1 ─────> 1  Implantação
                                                         (N contatos ligados
                                                          via Conta)
```

- **Lead & Deal → Conta:** 1:1 (cada deal pertence a uma conta).
- **Contato → Conta:** N:1 (uma conta tem vários decisores/contatos).
- **Lead & Deal → Contatos:** **indireto via Conta** (evita duplicação de vínculo).
- **Lead & Deal → Implantação:** 1:1, cross-departamento (handoff Vendas → CS/Relacionamento).

**Requisito de ferramenta:** suporte a relacionamentos entre pipelines/tabelas; ideal é conseguir referenciar contatos de um pipeline dentro de um card do outro (resolve o problema de "quem é o email do decisor neste deal?").

---

## 3. Funil de Vendas — 9 Etapas

| # | Etapa | Tipo | Responsável default | Gate de entrada |
|---|---|---|---|---|
| 1 | Qualificado | Aberta | Agent/automação | Lead Score ≥ 45 (checklist F1) |
| 2 | Primeiro contato | Ativa | Carol | Checklist F1 OK |
| 3 | Agendamento | Ativa | Carol | Fit confirmado + faturamento validado |
| 4 | Apresentação | Ativa | Carol | Demo realizada |
| 5 | Proposta enviada | Ativa | Carol | Aceite verbal = true |
| 6 | Fechamento | Ativa | Carol + Sabrina + Matheus | Aceite proposta = true |
| 7 | **Live** | **Ganho** | — (automático) | Pagamento confirmado + Contrato assinado |
| 8 | Nutrição | Ativa (paralelo) | Carol | Sinal fraco: D+15 sem resposta, reagendamento 2x, "vou pensar", etc. |
| 9 | **Perdido** | **Perda** | Carol | **Motivo perda obrigatório** |

### 3.1 Transições

- **Feliz:** Qualificado → Primeiro contato → Agendamento → Apresentação → Proposta enviada → Fechamento → Live.
- **Para Nutrição:** qualquer etapa ativa pode cair em Nutrição por sinal fraco.
- **Saída de Nutrição:** revisão de score ≥ 45 → volta para Primeiro contato; 2 ciclos sem evolução → Perdido.
- **Para Perdido:** qualquer etapa com confirmação de perda.

**Requisito:** a ferramenta precisa separar **ganho** de **perda** (não só "fechado") para dashboards nativos de win rate.

---

## 4. Campos por Entidade

> Tipos expressos em termos genéricos. Traduzir no momento da implementação (ex: "seleção única" = dropdown no ClickUp, select no Pipefy).

### 4.1 Lead & Deal (~33 campos)

**Qualificação / Prospecção**
| Campo | Tipo | Observação |
|---|---|---|
| Lead Score | Número (0–100) | Ordena "Lista da semana" |
| Canal | Seleção única | Inbound · Outbound · Indicação · Evento · Parceiro |
| ICP | Seleção única | Tier 1 · Tier 2 · Tier 3 · Fora do ICP |
| Reason to Call | Texto curto | Gatilho de intenção detectado |
| Abertura sugerida | Texto longo | Preenchido pelo agente IA |
| LinkedIn URL | URL | |
| Produto de interesse | Seleção múltipla | NXZ ERP · Totem · PDV · Smart POS · KDS |
| Faturamento estimado | Moeda (BRL) | |
| Nº decisores | Número | |

**Agendamento / Apresentação**
| Campo | Tipo | Observação |
|---|---|---|
| Data demo | Data + hora | Alimenta view Calendário |
| Tipo demo | Seleção única | Remota · Presencial · Híbrida |
| Dor central | Texto longo | |
| Aceite verbal | Booleano | Gate para proposta |

**Proposta / Fechamento**
| Campo | Tipo | Observação |
|---|---|---|
| Data proposta enviada | Data | |
| Valor proposto | Moeda (BRL) | |
| Aceite proposta | Booleano | Gate para Fechamento |
| Probabilidade | Número (%) | |
| **Forecast ponderado** | **Fórmula** | `Valor proposto × Probabilidade ÷ 100` |
| MRR | Moeda (BRL) | Soma em dashboard |
| Módulos contratados | Seleção múltipla | |

**Documentação Fechamento**
| Campo | Tipo |
|---|---|
| CNPJ | Texto (14 dígitos, sem máscara) |
| Razão social | Texto |
| Boleto emitido | Booleano |
| Pagamento confirmado | Booleano (gate p/ Live) |
| Contrato assinado | Booleano (gate p/ Live) |

**Nutrição / Perda**
| Campo | Tipo | Observação |
|---|---|---|
| Motivo nutrição | Seleção única | Sem urgência · Sem orçamento · "Vou pensar" · Sem resposta · Reagendou 2x · Preço bloqueou |
| Ciclo nutrição | Seleção única | Ciclo 1 · Ciclo 2 · Revisão |
| Próxima revisão | Data | Trigger agendado |
| Motivo perda | Seleção única (**obrigatório em Perdido**) | Preço · Sem fit · Sem urgência · Sem resposta · Outro |
| Etapa perdida | Seleção única | Espelha a etapa anterior |

**Relacionamentos**
| Campo | Tipo |
|---|---|
| Conta | Relacionamento → Conta (1:1) |
| Implantação | Relacionamento cross-departamento → Implantação |

### 4.2 Conta

| Campo | Tipo |
|---|---|
| Razão Social | Texto |
| CNPJ | Texto (14 dígitos) |
| Endereço | Endereço/localização |
| Site | URL |
| Segmento | Seleção única |
| Status | Ativa · Prospect · Cliente · Churn |

### 4.3 Contato

| Campo | Tipo |
|---|---|
| Nome | Texto |
| Função do contato | Texto |
| Telefone | Telefone |
| E-mail | E-mail |
| LinkedIn | URL |
| Data de último contato | Data |
| Papel | Decisor · Influenciador · Usuário · Inativo |

### 4.4 Nutrição
Subset de Lead & Deal + Ciclo · Próxima revisão. Implementável como etapa do pipeline principal **ou** pipeline separado (trade-off: poluição visual no kanban vs. overhead de sincronização).

---

## 5. Automações — 16 Regras

**Política:**
- **Alertas internos** (cobranças, escalonamentos) = notificação nativa da ferramenta (comment + @mention, push, etc). Não gastar envelope de email.
- **E-mails externos** reservados para comunicação com o lead (confirmações, follow-ups, conteúdo de nutrição).

### 5.1 Tabela de automações (semântica trigger → ação)

| # | Quando (trigger) | Faz o quê (ação) | Canal | Campos referenciados |
|---|---|---|---|---|
| 1 | Etapa = Qualificado por >48h | Notificar @Carol | Interno | Status, Time-in-status |
| 2 | Etapa = Primeiro contato por >16d | Notificar @Carol ("mover p/ Nutrição ou Perdido") | Interno | Status, Time-in-status |
| 3 | Etapa muda para Agendamento | **Enviar e-mail "Confirmação demo" ao lead** | Externo | E-mail do contato (decisor) |
| 4 | Data demo = amanhã (scheduled) | Enviar e-mail lembrete ao lead + Notificar @Carol | Misto | Data demo, E-mail decisor |
| 5 | Etapa = Apresentação por >48h | Notificar @Carol | Interno | Status, Time-in-status |
| 6 | Etapa = Proposta enviada por >3d | Enviar e-mail follow-up ao lead | Externo | E-mail decisor |
| 7 | Etapa = Proposta enviada por >7d | Notificar @Carol | Interno | Status, Time-in-status |
| 8 | Etapa = Fechamento + CNPJ vazio por 48h | Notificar @Carol (cobrar docs) | Interno | CNPJ, Status |
| 9 | Boleto emitido = true por 5d + Pagamento = false | Notificar @Carol + @Sabrina | Interno | Booleanos, tempo |
| 10 | Pagamento = true + Contrato = false por 3d | Notificar @Carol | Interno | Booleanos, tempo |
| 11 | Pagamento = true + Contrato = true | **Mover para Live + Notificar @Luiz + Criar card em Implantações** | Interno + Ação | Relacionamento cross-pipeline |
| 12 | Etapa muda para Perdido + Motivo perda vazio | Notificar @Carol (bloqueante) | Interno | Validação condicional |
| 13 | Etapa = Nutrição por 7d | Enviar e-mail "Conteúdo NXZ" ao lead | Externo | E-mail decisor |
| 14 | Etapa = Nutrição por 15d | Enviar e-mail "Case NXZ" ao lead | Externo | E-mail decisor |
| 15 | Etapa = Nutrição por 30d | Notificar @Carol (revisar score) | Interno | Status, tempo |
| 16 | Próxima revisão = hoje (scheduled) | Notificar @Carol | Interno | Data, agendamento |

**Balanço:** 11 notificações internas + 5 e-mails externos.

### 5.2 Requisitos que a ferramenta DEVE suportar

1. **Triggers por tempo em etapa** ("status age"): indispensável para 9 das 16 regras. Aceita via trigger nativo **ou** combo `scheduled + condition time-in-status`.
2. **Triggers agendados** (daily cron) com condições sobre campos de data.
3. **E-mails com destinatário dinâmico** resolvido a partir de **campo relacionado** (ex: "enviar para o e-mail do Contato vinculado via Conta"). **Blocker confirmado no ClickUp** (só aceita destinatário estático); funcionalidade nativa do **Pipefy**.
4. **E-mails com corpo dinâmico** usando campos do card — incluindo campos relacionados (rollup/lookup).
5. **Criação de card em outro pipeline/list** como ação (handoff Vendas → Implantação).
6. **Menção de usuário em comentário** dispara notificação push/email ao mencionado.
7. **Validação condicional** (ex: bloquear mudança de etapa se campo obrigatório vazio) — se não existir nativamente, simular via automação que notifica e reverte.

---

## 6. Views / Relatórios

| View | Tipo | Filtro principal | Ordenação / Agrupamento | Dono | Cadência |
|---|---|---|---|---|---|
| Pipeline | Kanban | Exclui Live + Perdido | Agrupa por Etapa | Carol | Diária |
| Lista da semana | Lista | Etapa = Qualificado | Sort Lead Score desc | Carol | Segunda |
| Demos desta semana | Calendário | Data demo ∈ semana atual | — | Carol | Quinta |
| Revisão Nutrição | Lista | Etapa = Nutrição + Próxima revisão ≤ hoje+7 | Sort Próxima revisão | Carol | Sexta |
| Forecast | Lista agrupada | Exclui Perdido | Agrupa por Etapa, soma Forecast ponderado | Carol + Walter | Semanal |
| Leads perdidos | Lista agrupada | Etapa = Perdido | Agrupa por Motivo perda | Walter | Mensal |

**Requisitos:** filtros relativos de data (hoje, hoje+7), agrupamento com totais somados, kanban nativo, calendário alimentado por campo de data.

---

## 7. Dashboard "MRR & Pipeline Nexuz" (6 cards)

1. **Soma de MRR** onde Etapa = Live, período mês corrente.
2. **Soma de Forecast ponderado** do pipeline ativo (exclui Live + Perdido).
3. **Win Rate** = `count(Live) / count(Live + Perdido)`, mês.
4. **Leads por Canal** (pie chart) — mês.
5. **Leads perdidos por Motivo** (bar chart) — trimestre.
6. **MRR adicionado por semana** (line chart) — últimas 12 semanas.

**Requisitos:** cards de cálculo (sum, count, ratio), gráficos pie/bar/line sobre campos do pipeline, filtros temporais.

---

## 8. OKRs — Q2/2026

**Objetivo:** Estabelecer previsibilidade comercial.

| KR | Meta | Fonte de dados |
|---|---|---|
| KR1 | MRR adicionado ≥ R$ 50.000/mês | Soma MRR onde Etapa=Live |
| KR2 | Win Rate ≥ 25% | Live ÷ (Live + Perdido) |
| KR3 | Ciclo médio de venda ≤ 21 dias | Tempo Qualificado → Live/Perdido |
| KR4 | ≥ 90% dos Perdidos com motivo preenchido | Qualidade do aprendizado |
| KR5 | ≥ 40 demos realizadas/mês | Count de cards que passaram por Apresentação |

---

## 9. Integrações Requeridas

| Integração | Uso | Criticidade |
|---|---|---|
| **Google Calendar** (2-way) | Sync do campo Data demo com agenda dos vendedores | Alta |
| **E-mail transacional** | Envio dos 5 e-mails externos (templates + variáveis dinâmicas) | Alta |
| **Forms de captação** | Inbound do site cria card na etapa Qualificado (round-robin) | Alta |
| **Webhook → Odoo** | Quando Etapa = Fechamento, criar oportunidade no ERP (assinatura, sale.order) | Média |
| **Google Drive** | Anexar propostas aos cards | Média |
| **LinkedIn Sales Navigator** | Enriquecimento de contatos (manual hoje, automação futura) | Baixa |

---

## 10. Handoff Vendas → Relacionamento (Implantação)

```
Carol fecha deal (Pagamento + Contrato = true)
  → Automação 11 dispara
  → Card de Vendas muda para Live
  → Card é criado no pipeline Implantações (Relacionamento)
  → Relacionamento (Matheus/Luiz) acolhe e executa
  → Quando implantação = Done, comentário volta pro card de Vendas
```

**Requisito:** criação de card em outro pipeline/tabela via automação, com preservação de vínculo bidirecional.

---

## 11. Anti-Patterns a Evitar

- ❌ Pipelines duplicados quando relacionamento resolve (ex: não ter "Lead" separado de "Deal" — fundidos).
- ❌ Onboarding/Implantação no mesmo Space/Departamento de Vendas (handoff cross-space).
- ❌ Custom statuses excessivos além das 9 etapas (espelho exato do funil).
- ❌ Campos redundantes (Decisores: 1 campo People + 1 Text basta).
- ❌ Automações genéricas "avisar quando algo mudar" (todas têm trigger + ação concretos).
- ❌ E-mails internos entre vendedores (usar notificação nativa).
- ❌ Status único "Fechado" sem diferenciar ganho/perda (quebra win rate nativo).

---

## 12. Checklist de Avaliação da Ferramenta

Antes de executar, validar que a ferramenta-alvo suporta:

- [ ] 9 etapas/fases customizáveis em um mesmo pipeline, com tipos ganho/perda distintos
- [ ] Relacionamento N:1 entre pipelines (Contato→Conta, Deal→Conta)
- [ ] Relacionamento 1:1 cross-pipeline/departamento (Deal→Implantação)
- [ ] Campo fórmula com referência a 2 campos numéricos do mesmo card
- [ ] Triggers por tempo em etapa (nativo ou via scheduled+condition)
- [ ] Triggers agendados (daily/cron) com condições sobre datas
- [ ] E-mails com **destinatário dinâmico vindo de campo relacionado** (gap do ClickUp)
- [ ] E-mails com corpo usando variáveis de campos do card (incluindo relacionados)
- [ ] Ação "criar card em outro pipeline"
- [ ] Views: kanban, lista agrupada com soma, calendário por campo de data
- [ ] Dashboard com cards de cálculo (sum, count, ratio) e gráficos pie/bar/line
- [ ] Forms web públicos que geram cards na etapa Qualificado
- [ ] Webhook out + in para integração com Odoo
- [ ] Sync 2-way com Google Calendar
- [ ] Validação condicional (ou fallback via automação reversa)

---

## 13. Ordem Sugerida de Execução

Independente da ferramenta, executar nesta sequência para minimizar retrabalho:

1. **Estrutura básica:** Departamento/Space "Vendas", pipelines Leads & Deals / Contas / Contatos / Nutrição.
2. **Etapas/statuses** do pipeline Leads & Deals (9 customizadas, 2 marcadas como ganho/perda).
3. **Campos core** (gates do funil): Aceite verbal, Aceite proposta, Valor proposto, Data demo, MRR, Motivo perda.
4. **Relacionamentos:** Contato→Conta (N:1), Lead&Deal→Conta (1:1).
5. **Campos complementares** de qualificação, proposta, nutrição.
6. **Validação visual com Carol** antes de seguir — cria 2-3 deals de teste.
7. **Forms** de captação inbound.
8. **Views** (pipeline, lista da semana, demos, forecast, perdidos, nutrição).
9. **Automações** — começar pelas notificações internas (11 regras, baixo risco), depois e-mails externos (5 regras, requer template + remetente).
10. **Dashboard & OKRs.**
11. **Integração Google Calendar.**
12. **Handoff cross-pipeline** para Implantação (quando o pipeline de Relacionamento existir).
13. **Webhook Odoo** (última etapa, depende de endpoint pronto no ERP).

---

## 14. Aprendizados da Execução Anterior (ClickUp)

Guardar como contexto para decidir trade-offs na nova execução:

1. **Destinatário dinâmico em e-mail** é o maior diferencial prático. ClickUp não suporta (aberto desde 2021, 559 votos na comunidade). Pipefy suporta nativamente — foi o driver da migração.
2. **Time-in-status como trigger** não é universal. Mapeie antes quais regras dependem disso (9 das 16).
3. **API pública limitada** (ClickUp: não cria custom fields nem statuses programaticamente) força UI automation. Avaliar a API da ferramenta-alvo antes de estimar esforço.
4. **Relacionamento Lead→Contatos direto** gera duplicação. Modelar sempre via Conta intermediária.
5. **Campo CNPJ sem máscara** é o padrão pragmático (14 dígitos puros compatíveis com Odoo/Asaas).
6. **Formato de número BR** (R$ 1.234,56) pode não ser configurável — validar na ferramenta antes de prometer.
7. **Menções em comentários** precisam usar nome completo do usuário (ClickUp); validar sintaxe na ferramenta-alvo.
8. **Handoff entre departamentos** funciona melhor via card criado em outro pipeline do que via mudança de etapa em pipeline compartilhado.

---

**Responsáveis:**
- Product Owner / Sponsor: Walter Frey
- Dona da operação: Carol Oliveira
- Arquitetura e execução técnica: Opensquad (squad a ser definido)

**Output esperado da nova execução:** CRM configurado na ferramenta-alvo, 3 deals de teste funcionando ponta-a-ponta (Qualificado → Live), Carol operando sem intervenção técnica.
