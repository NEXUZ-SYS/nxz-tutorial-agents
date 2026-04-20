# Processo de Vendas Nexuz — Agnóstico de Ferramenta

**Versão:** 1.0 · **Data:** 2026-04-16
**Origem:** Funil NXZ v1.0 (Carol) + Workspace Design v1 + Briefing CRM Agnóstico
**Propósito:** Descrever o processo de vendas da Nexuz de forma independente da ferramenta de CRM, de modo que possa ser implantado em ClickUp, Pipefy, HubSpot, Odoo CRM, Salesforce ou qualquer outra plataforma sem perda de contexto operacional.

---

## 1. Briefing

### 1.1 Contexto
A Nexuz é uma empresa de tecnologia para Food Service sediada em Curitiba (PR), que comercializa soluções de gestão e autoatendimento (ERP, PDV, Totem NXZ Go, Smart POS, KDS, Delivery) em modelo SaaS.

A operação de vendas hoje gira em torno de uma vendedora sênior (Carol) apoiada por SDRs, sem sistema de CRM instrumentado. Cada oportunidade é acompanhada de forma manual, o que compromete previsibilidade de MRR, visibilidade do funil e qualidade do handoff para Relacionamento/Implantação.

### 1.2 Problema
- Funil sem instrumentação: não há win rate, ciclo médio nem forecast confiável.
- Perda de leads por falta de cadência definida e ausência de alertas de ociosidade.
- Handoff Vendas → Implantação informal (chat/planilha), gerando atrito na virada do cliente para produção.
- "Perdidos" não são registrados com motivo, impedindo ajuste do ICP.

### 1.3 Objetivo
Instalar uma máquina de vendas previsível para **NXZ Go** e **NXZ ERP** no mercado Food Service, com funil instrumentado, SLA por etapa, forecast ponderado e handoff limpo para Implantação.

### 1.4 Escopo
- **In:** funil de vendas de 9 etapas, cadastro de contas/contatos, cadência de nutrição, dashboard de MRR, OKRs Q2/2026, handoff para Relacionamento.
- **Out:** onboarding pós-venda, cobrança/renovação (CS), marketing de topo de funil, integrações com fiscalização.

### 1.5 ICPs
| ICP | Descrição | Ticket | Ciclo | Demo |
|---|---|---|---|---|
| **QS** (Quick Serve) | Restaurantes casuais, self-service, fast food, cafés | Baixo | Curto (≤14 dias) | 15–20 min |
| **FS** (Full Serve) | Restaurantes com salão, operação complexa, franquias | Médio-alto | Longo (21–45 dias) | 45–60 min |

### 1.6 Premissas
- Comunicação externa com o lead é sempre por **e-mail** do CRM (nunca WhatsApp na v1).
- Alertas internos entre pessoas do time usam **notificação nativa** da ferramenta (comentário + menção). E-mail externo é reservado para o lead.
- Dados fiscais (CNPJ) são mantidos sem máscara, em 14 dígitos puros, compatíveis com ERP Odoo/Asaas.

---

## 2. Fluxo Ponta a Ponta

### 2.1 Visão macro

```
Captação → Qualificação → Contato → Agendamento → Apresentação
   → Proposta → Fechamento → Live (ganho) → Implantação (handoff)
              ↘ Nutrição (paralelo) ↘ Perdido (fim)
```

### 2.2 Funil operacional (9 etapas)

> Cada transição entre etapas é governada por um **checklist (F1..F6)** detalhado na seção [2.9](#29-checklists-de-transição-f1f6). Os gates abaixo mostram a condição essencial; o checklist correspondente traz o detalhamento completo dos campos obrigatórios.

| # | Etapa | Tipo | Gate de entrada | Gate de saída |
|---|---|---|---|---|
| 1 | **Qualificado** | Aberta | Lead Score ≥ 45 + canal identificado | **Checklist F1 OK** |
| 2 | **Primeiro contato** | Ativa | Checklist F1 OK | **Checklist F2 OK** (fit + faturamento + decisores) |
| 3 | **Agendamento** | Ativa | Checklist F2 OK | **Checklist F3 OK** (demo agendada com dor e decisores) |
| 4 | **Apresentação** | Ativa | Checklist F3 OK | **Checklist F4 OK** (aceite verbal = verdadeiro) |
| 5 | **Proposta enviada** | Ativa | Checklist F4 OK | **Checklist F5 OK** (aceite da proposta = verdadeiro) |
| 6 | **Fechamento** | Ativa | Checklist F5 OK | **Checklist F6 OK** (pagamento + contrato) |
| 7 | **Live** | **Ganho** | Checklist F6 OK (Pagamento + Contrato = verdadeiro) | — (terminal ganho) |
| 8 | **Nutrição** | Ativa (paralelo) | Sinal fraco (D+15 sem resposta, reagendamento 2x, "vou pensar", sem orçamento) | Score ≥ 45 volta ao funil OU 2 ciclos sem evolução → Perdido |
| 9 | **Perdido** | **Perda** | Confirmação de perda | — (terminal perda, motivo obrigatório) |

### 2.3 Transições legítimas

**Caminho feliz:**
`Qualificado → Primeiro contato → Agendamento → Apresentação → Proposta → Fechamento → Live`

**Desvios para Nutrição** (qualquer etapa ativa pode cair):
- Primeiro contato: sem resposta D+15 ou 4 tentativas queimadas
- Agendamento: reagendou 2x
- Apresentação: sem urgência declarada
- Proposta: preço bloqueou / "vou pensar" sem prazo

**Saída de Nutrição:**
- Revisão D+30 com score ≥ 45 → volta para Primeiro contato
- 2 ciclos sem evolução → Perdido

**Desvios para Perdido** (qualquer etapa):
- Sem fit confirmado · recusa explícita · sumiu · bloqueio de preço absoluto

### 2.4 Cadência de Primeiro Contato

| Dia | Ação | Canal |
|---|---|---|
| D+0 | 1º contato com abertura personalizada | Canal do ICP |
| D+2 | Follow-up leve ("Só passando pra ver se chegou") | Mesmo canal |
| D+5 | Novo ângulo ou case diferente | Mesmo canal |
| D+8 | Última tentativa ("Deixo aberta a possibilidade") | Mesmo canal |
| D+15 | Alerta de ociosidade → mover para Nutrição ou Perdido | — |

**Limite:** 4 tentativas. Mais do que isso queima o lead.

### 2.5 Cadência de Proposta

| Dia | Quem | Ação |
|---|---|---|
| D+0 | Responsável operacional | Proposta enviada |
| D+1 | Responsável operacional | "Chegou bem? Ficou alguma dúvida?" |
| D+3 | Automação | E-mail de follow-up automático ao lead |
| D+7 | Automação | Alerta interno para o responsável operacional |
| D+15 | Responsável operacional | Decisão: Nutrição ou Perdido |

### 2.6 Cadência de Nutrição

| Dia | Ação | Quem |
|---|---|---|
| D+0 | Entrada em Nutrição + preenchimento de motivo + próxima revisão | Responsável operacional |
| D+7 | E-mail automático com conteúdo educacional | Automação |
| D+15 | E-mail automático com case de sucesso | Automação |
| D+30 | Alerta para reavaliar Lead Score | Automação |
| D+30 | Se score ≥ 45: move para Primeiro contato; senão, registra Ciclo 2 | Responsável operacional |
| D+60 | Fim do Ciclo 2: sem evolução → Perdido | Responsável operacional |

**Máximo de 2 ciclos.** Após o segundo sem requalificação → Perdido.

### 2.7 Fechamento (passo a passo)

| Passo | Campo obrigatório | Prazo | Alerta se atrasar |
|---|---|---|---|
| Coleta de docs | CNPJ + Razão social | 48h | Alerta interno ao responsável operacional |
| Registro no ERP | — | Imediato | — |
| Emissão de boleto | Boleto emitido = verdadeiro | Mesmo dia | — |
| Pagamento | Pagamento confirmado = verdadeiro | 5 dias úteis | Alerta interno para operacional + financeiro |
| Contrato | Contrato assinado = verdadeiro | 3 dias após boleto | Alerta interno ao responsável operacional |
| Handoff Implantação | Responsável implantação atribuído | Após pagamento+contrato | Alerta para time de Implantação |

**Regra de transição automática:** quando `Pagamento = verdadeiro E Contrato = verdadeiro`, a ferramenta move automaticamente o card para **Live** e dispara a criação do card de Implantação no departamento de Relacionamento.

### 2.8 Handoff Vendas → Relacionamento

```
Vendas fecha deal (Pagamento + Contrato = verdadeiro)
  ↓
Automação de ganho dispara
  ↓
Card de Vendas → status Live
  ↓
Card espelho é criado no pipeline de Implantação (outro departamento)
  ↓
Relacionamento acolhe, executa e devolve "Implantação = Done" como comentário ligado
```

### 2.9 Checklists de transição (F1..F6)

Cada transição entre etapas ativas exige um checklist 100% preenchido. Sem o checklist OK, a ferramenta **não permite** (ou alerta bloqueante) o avanço.

#### F1 — Qualificado → Primeiro contato
- Nome completo preenchido
- Cargo preenchido
- ICP definido (QS ou FS)
- Canal de contato definido
- Lead Score preenchido
- Reason to Call preenchido
- LinkedIn URL preenchido

#### F2 — Primeiro contato → Agendamento
- Data do 1º contato registrada
- Resposta obtida = verdadeiro
- Fit confirmado = verdadeiro
- Faturamento declarado preenchido
- Decisores mapeados preenchido

#### F3 — Agendamento → Apresentação
- Data da demo preenchida (com hora)
- Tipo de demo selecionado (QS ou FS)
- Dor central identificada
- Número de decisores presentes confirmado

#### F4 — Apresentação → Proposta enviada
- Demo realizada em (data preenchida)
- Decisores presentes = verdadeiro
- **Aceite verbal = verdadeiro** (gate absoluto)
- Dor confirmada na demo

#### F5 — Proposta enviada → Fechamento
- Data da proposta enviada preenchida
- Valor proposto preenchido
- Módulos contratados definidos
- **Aceite da proposta = verdadeiro** (gate absoluto)

#### F6 — Fechamento → Live
- CNPJ preenchido (14 dígitos) + Razão social
- Dados fiscais necessários ao ERP (ex.: Certificado digital, CSC) — quando aplicável
- Boleto emitido = verdadeiro
- **Pagamento confirmado = verdadeiro** (gate absoluto)
- **Contrato assinado = verdadeiro** (gate absoluto)
- MRR preenchido
- Prazo de implantação acordado

---

## 3. Papéis (RACI)

### 3.1 Papéis funcionais (agnósticos de pessoa)

| Papel | Responsabilidade |
|---|---|
| **Sponsor comercial** | Define metas, aprova desconto fora do teto, valida ICP |
| **Ops de Vendas** | Orquestra o funil no dia a dia, move cards, executa cadências |
| **SDR / Qualificador** | Prospecta, enriquece lead, aplica checklist F1 |
| **Agente de qualificação (AI/automação)** | Score, Reason to Call, Abertura sugerida |
| **Pré-venda técnica** | Conduz demo FS, responde objeções técnicas |
| **Financeiro** | Emite boleto, confirma pagamento |
| **Jurídico/Administrativo** | Emite contrato, coleta assinatura digital |
| **Relacionamento / Implantação** | Acolhe o cliente pós-fechamento, executa setup |
| **Admin da ferramenta** | Configura campos, automações, dashboards, permissões |

### 3.2 Matriz RACI — etapas do funil

Legenda: **R** = Responsável (faz) · **A** = Aprovador (responde) · **C** = Consultado · **I** = Informado.

| Etapa / Atividade | SDR | Agent IA | Ops Vendas | Pré-venda | Financeiro | Jurídico | Implantação | Sponsor | Admin |
|---|---|---|---|---|---|---|---|---|---|
| Enriquecer lead (Qualificado) | R | R | A | — | — | — | — | I | C |
| Validar checklists de transição (F1..F6) | C | — | R/A | — | — | — | — | I | — |
| Primeiro contato (D+0..D+8) | C | — | R/A | — | — | — | — | I | — |
| Agendamento + mapeamento de decisores | — | — | R/A | C | — | — | — | I | — |
| Demo QS | — | — | R/A | — | — | — | — | I | — |
| Demo FS | — | — | R | R/A | — | — | — | I | — |
| Aceite verbal registrado | — | — | R/A | C | — | — | — | I | — |
| Envio de proposta | — | — | R/A | C | — | — | — | I | — |
| Aceite de proposta | — | — | R/A | — | — | — | — | C | — |
| Coleta de docs (CNPJ, Razão social) | — | — | R/A | — | — | — | — | I | — |
| Emissão de boleto | — | — | C | — | R/A | — | — | I | — |
| Confirmação de pagamento | — | — | I | — | R/A | — | — | I | — |
| Assinatura de contrato | — | — | C | — | — | R/A | — | I | — |
| Transição para Live (automática) | — | — | I | — | I | I | I | I | A |
| Criação do card de Implantação | — | — | I | — | — | — | R/A | I | A |
| Execução da implantação | — | — | I | C | — | — | R/A | I | — |
| Preencher motivo de perda | — | — | R/A | — | — | — | — | C | — |
| Decidir Nutrição vs Perdido | — | — | R/A | C | — | — | — | I | — |
| Reavaliar Nutrição D+30 / D+60 | — | — | R/A | — | — | — | — | I | — |
| Configurar pipeline, campos, automações | — | — | C | — | — | — | — | A | R |

---

## 4. Entradas / Saídas

### 4.1 Entradas do processo

| Fonte | Dado / Evento | Quem alimenta | Quando |
|---|---|---|---|
| Formulário de site | Nome, e-mail, telefone, produto, empresa, faturamento declarado | Prospect | On-demand (inbound) |
| Prospecção outbound | Nome, cargo, empresa, LinkedIn URL, canal | SDR | Diário |
| Agente de qualificação (AI) | Lead Score, Reason to Call, Abertura sugerida, ICP detectado | Automação | Semanal (batch) |
| Indicação / Parceiro | Dados básicos + origem | Parceiro | Ad-hoc |
| Evento | Lista de presentes qualificados | SDR | Pós-evento |

### 4.2 Saídas do processo

| Destino | Artefato / Evento | Quem gera | Quando |
|---|---|---|---|
| Dashboard executivo | MRR adicionado, Forecast ponderado, Win rate, Ciclo médio | Ferramenta (agregação) | Tempo real |
| Pipeline de Implantação | Card com dados do cliente fechado | Automação de ganho | No momento do Live |
| ERP (ex.: Odoo) | Registro de oportunidade / ordem de venda | Webhook | No Fechamento |
| Agenda Google | Evento de demo (2-way) | Integração Calendar | Ao agendar demo |
| Repositório de perda | Motivo de perda + etapa perdida | Responsável operacional | Ao mover para Perdido |
| Base de aprendizado ICP | Padrões de leads perdidos / nutrição | Sponsor comercial | Mensal |

### 4.3 Campos mínimos obrigatórios (resumo)

**Qualificação:** Lead Score · Canal · ICP · Reason to Call · Abertura sugerida · LinkedIn URL · Produto de interesse · Faturamento estimado · Nº decisores.

**Agendamento/Apresentação:** Data demo · Tipo demo · Dor central · Aceite verbal.

**Proposta/Fechamento:** Data proposta · Valor proposto · Aceite proposta · Probabilidade · Forecast ponderado (fórmula: `Valor proposto × Probabilidade ÷ 100`) · MRR · Módulos contratados.

**Documentação de Fechamento:** CNPJ · Razão social · Boleto emitido · Pagamento confirmado · Contrato assinado.

**Nutrição/Perda:** Motivo nutrição · Ciclo nutrição · Próxima revisão · Motivo perda (obrigatório) · Etapa perdida.

**Relacionamentos:** Conta (1:1) · Contatos (N:1 via Conta) · Implantação (1:1 cross-departamento).

---

## 5. Regras de Negócio

### 5.1 Regras de qualificação
- **R1.** Só entra no funil lead com `Lead Score ≥ 45` e canal de contato identificado.
- **R2.** Checklist F1 completo é pré-requisito para mover para Primeiro contato: Nome · Cargo · ICP · Canal · Score · Reason to Call · LinkedIn URL.
- **R3.** Lead sem resposta por 48h em Qualificado aciona alerta interno para o responsável operacional.

### 5.2 Regras de progressão
- **R4.** Não existe "proposta sem aceite verbal". O campo `Aceite verbal = verdadeiro` é gate obrigatório para sair de Apresentação.
- **R5.** Não existe "Fechamento sem aceite de proposta". O campo `Aceite proposta = verdadeiro` é gate obrigatório.
- **R6.** Live só acontece automaticamente quando `Pagamento confirmado = verdadeiro E Contrato assinado = verdadeiro`. Nunca manual.
- **R7.** Máximo de 4 tentativas em Primeiro contato antes de mover para Nutrição ou Perdido.
- **R8.** Máximo de 2 reagendamentos em Agendamento antes de Nutrição.

### 5.3 Regras de desconto e proposta
- **R9.** Desconto máximo sem aprovação do Sponsor: **15%**.
- **R10.** Negociação permitida: preço, prazo de pagamento. **Nunca escopo de módulos** sem revisão técnica.
- **R11.** Proposta QS é enviada como mensagem simples (e-mail/LinkedIn). Proposta FS é PDF consultivo completo com diagnóstico, rollout e data de resposta.

### 5.4 Regras de nutrição
- **R12.** Entrada em Nutrição exige: Motivo de nutrição + Próxima revisão (30 dias à frente) + Ciclo (1 ou 2).
- **R13.** Limite absoluto de 2 ciclos de nutrição. Após o Ciclo 2 sem evolução → Perdido.
- **R14.** Toda cadência de nutrição é por e-mail automático (D+7, D+15). Revisão humana só em D+30.

### 5.5 Regras de perda
- **R15.** Campo `Motivo perda` é **obrigatório** antes de fechar um card como Perdido. A ferramenta deve bloquear ou alertar sobre preenchimento vazio.
- **R16.** Campo `Etapa perdida` deve refletir a etapa em que o lead estava antes da perda.

### 5.6 Regras de dados
- **R17.** CNPJ armazenado em 14 dígitos puros, sem máscara.
- **R18.** Valores monetários em BRL, 2 casas decimais.
- **R19.** Cada Lead/Deal pertence a **uma única Conta** (1:1). Contatos ligam-se a Conta (N:1), nunca direto ao Deal.
- **R20.** Duplicidade de CNPJ em Contas ativas é bloqueada.

### 5.7 Regras de alerta e comunicação
- **R21.** Comunicação com o lead (externo): apenas por e-mail transacional com destinatário dinâmico vindo do contato vinculado.
- **R22.** Comunicação interna entre o time: notificação nativa da ferramenta (comentário + menção). **Proibido** e-mail interno para cobrar colegas.
- **R23.** Cada automação tem trigger + ação concretos. Proibido alertas genéricos "avisar quando algo mudar".

### 5.8 Regras de handoff
- **R24.** Card de Implantação é criado automaticamente no ato do Live, no departamento de Relacionamento, com link bidirecional ao card de Vendas.
- **R25.** O departamento de Implantação fica em outro Space/Workspace lógico, **nunca** no mesmo pipeline de Vendas.

### 5.9 Mapa de automações (16 regras)

**Balanço:** 11 alertas internos + 5 e-mails externos ao lead.

| # | Trigger (quando) | Ação (o quê) | Canal |
|---|---|---|---|
| **A01** | Qualificado AND tempo-em-status > 48h | Alerta interno ao Ops de Vendas | Interno |
| **A02** | Primeiro contato AND tempo-em-status > 16 dias | Alerta interno ao Ops ("mova para Nutrição ou Perdido") | Interno |
| **A03** | Status muda para Agendamento | **E-mail "Confirmação de demo" ao lead** | Externo |
| **A04** | Data demo = amanhã (scheduled) | E-mail lembrete ao lead + Alerta interno ao Ops | Misto |
| **A05** | Apresentação AND tempo-em-status > 48h sem atualização | Alerta interno ao Ops | Interno |
| **A06** | Proposta enviada AND tempo-em-status > 3 dias | **E-mail follow-up ao lead** | Externo |
| **A07** | Proposta enviada AND tempo-em-status > 7 dias | Alerta interno ao Ops | Interno |
| **A08** | Fechamento AND CNPJ vazio > 48h | Alerta interno ao Ops (cobrar docs) | Interno |
| **A09** | Boleto emitido = verdadeiro AND 5 dias AND Pagamento = falso | Alerta interno ao Ops + Financeiro | Interno |
| **A10** | Pagamento = verdadeiro AND Contrato = falso AND 3 dias | Alerta interno ao Ops | Interno |
| **A11** | Pagamento = verdadeiro AND Contrato = verdadeiro | **Move status → Live + Cria card em Implantação + Alerta ao time de Relacionamento** | Interno + Ação |
| **A12** | Status muda para Perdido AND Motivo de perda vazio | Alerta bloqueante ao Ops | Interno |
| **A13** | Nutrição AND tempo-em-status = 7 dias | **E-mail "Conteúdo educacional" ao lead** | Externo |
| **A14** | Nutrição AND tempo-em-status = 15 dias | **E-mail "Case de sucesso" ao lead** | Externo |
| **A15** | Nutrição AND tempo-em-status = 30 dias | Alerta interno ao Ops (reavaliar score) | Interno |
| **A16** | Próxima revisão = hoje (scheduled) | Alerta interno ao Ops | Interno |

> **Requisito crítico:** automações **A03, A04, A06, A13 e A14** (os 5 e-mails externos) precisam resolver **destinatário dinâmico** a partir do contato vinculado via Conta — gap comum em várias ferramentas, validar no checklist de implantação (seção 8).

---

## 6. KPIs (OKRs Q2/2026)

### 6.1 Objetivo
Estabelecer previsibilidade comercial com funil instrumentado.

### 6.2 Key Results

| KR | Métrica | Meta | Fórmula | Cadência |
|---|---|---|---|---|
| **KR1** | MRR adicionado | ≥ R$ 50.000 / mês | Soma de `MRR` onde Etapa = Live, no mês | Semanal |
| **KR2** | Win Rate | ≥ 25% | `count(Live) ÷ count(Live + Perdido)`, no mês | Semanal |
| **KR3** | Ciclo médio de venda | ≤ 21 dias | Tempo médio entre entrada em Qualificado e saída para Live/Perdido | Mensal |
| **KR4** | Qualidade de perda | ≥ 90% dos Perdidos com motivo preenchido | `count(Perdido com motivo) ÷ count(Perdido)`, no mês | Mensal |
| **KR5** | Volume de demos | ≥ 40 demos / mês | `count` de cards que passaram por Apresentação no mês | Semanal |

### 6.3 Métricas operacionais (não OKR)
- Tempo médio em cada etapa (SLA interno): alvo ≤ 48h em Qualificado, ≤ 16 dias em Primeiro contato, ≤ 7 dias em Proposta.
- Distribuição de perdas por motivo (pie chart) — insumo para ajustar ICP.
- MRR adicionado por canal — insumo para priorização de investimento.
- Leads por canal (volume + conversão) — insumo para SDR/Marketing.

### 6.4 Dashboard mínimo (6 cards)
1. Soma de MRR (mês corrente, Etapa = Live)
2. Soma de Forecast ponderado (pipeline ativo, exclui Live + Perdido)
3. Win Rate (mês)
4. Leads por Canal (pie chart, mês)
5. Leads perdidos por Motivo (bar chart, trimestre)
6. MRR adicionado por semana (line chart, últimas 12 semanas)

---

## 7. Riscos

### 7.1 Matriz de risco

| # | Risco | Categoria | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|---|
| **R01** | Ferramenta escolhida não suporta e-mail com destinatário dinâmico a partir de contato relacionado | Técnico | Alta | Alto (quebra 5 automações externas) | Validar no checklist antes da execução; fallback: CRM dispara webhook para ferramenta de e-mail externa (ex.: Mailgun) |
| **R02** | Time-in-status não é trigger nativo | Técnico | Média | Alto (9 de 16 automações) | Implementar via combo scheduled + condition; orçar plano Business+ se necessário |
| **R03** | API pública da ferramenta não permite criar campos/statuses programaticamente | Técnico | Média | Médio (aumenta esforço via UI automation) | Avaliar API antes da contratação; considerar templates reutilizáveis |
| **R04** | Ops de Vendas (Carol) sobrecarregada, não consegue operar o funil no dia a dia | Operacional | Alta | Alto (funil morre se ela parar) | SDRs treinados como backup; playbook operacional documentado e versionado |
| **R05** | Perdidos sem motivo preenchido — perde-se o aprendizado | Processo | Alta | Médio (vício no ICP continua) | Validação condicional obrigatória; alerta interno bloqueante |
| **R06** | Handoff para Implantação atrasa e cliente fica sem direcionamento pós-Live | Processo | Média | Alto (churn inicial) | Automação A11 (ver 5.9) cria card automaticamente; SLA de acolhimento 24h |
| **R07** | Lead Score mal calibrado gera leads fracos no topo do funil | Dados | Média | Médio (desperdício de SDR) | Revisão trimestral do modelo de score; feedback de Carol alimenta ajuste |
| **R08** | Desconto fora do teto sendo concedido sem aprovação | Governança | Média | Médio (margem erodida) | Política clara (regra R9, seção 5.3); dashboard com desconto médio por deal |
| **R09** | Duplicidade de contas (mesmo CNPJ em múltiplos deals) | Dados | Média | Médio (relatórios inflados) | Validação de unicidade de CNPJ em Contas ativas |
| **R10** | E-mail do CRM cair em spam do destinatário | Entregabilidade | Alta | Alto (cadência quebrada) | Configurar SPF/DKIM no domínio remetente; monitorar bounce rate |
| **R11** | Ferramenta cobra por automação/execução e orçamento estoura | Financeiro | Baixa | Médio | Dimensionar volume de disparos mensais; usar notificação nativa em vez de e-mail interno |
| **R12** | Integração com ERP (Odoo) não fica pronta a tempo | Integração | Média | Baixo (operação roda sem ela) | Mover integração para última etapa da implantação; saída manual intermediária aceitável |
| **R13** | Troca de ferramenta no meio da operação (migração) | Estratégico | Baixa | Alto | Manter este documento como contrato agnóstico; exportar dados em CSV periodicamente |
| **R14** | Guest users (financeiro, implantação) não recebem notificações nativas | Permissionamento | Média | Médio | Validar no setup; fallback de e-mail interno apenas para essas 2 automações |

### 7.2 Gatilhos de revisão
- Win Rate < 15% por 2 meses consecutivos → revisão de ICP e de roteiro de demo.
- Ciclo médio > 30 dias → revisão de gates e cadências.
- Entregabilidade de e-mail < 95% → auditoria de domínio/template.

---

## 8. Checklist de implantação (independente da ferramenta)

Antes de executar em qualquer plataforma, validar que ela suporta:

- [ ] 9 etapas customizáveis em um mesmo pipeline, com tipos ganho/perda distintos
- [ ] Relacionamento N:1 entre pipelines (Contato→Conta, Deal→Conta)
- [ ] Relacionamento 1:1 cross-pipeline/departamento (Deal→Implantação)
- [ ] Campo fórmula referenciando 2 campos numéricos do mesmo card
- [ ] Triggers por tempo em etapa (nativo ou via scheduled + condition)
- [ ] Triggers agendados (cron) com condições sobre datas
- [ ] E-mails com destinatário dinâmico vindo de campo relacionado
- [ ] E-mails com corpo usando variáveis do card (incluindo campos relacionados)
- [ ] Ação "criar card em outro pipeline" como efeito de automação
- [ ] Views: kanban, lista agrupada com soma, calendário por campo de data
- [ ] Dashboard com cards de cálculo (sum, count, ratio) e gráficos pie/bar/line
- [ ] Formulários web públicos que geram cards na etapa Qualificado
- [ ] Webhook de saída e entrada para integração com ERP
- [ ] Sync 2-way com Google Calendar
- [ ] Validação condicional de campos obrigatórios (ou fallback via automação reversa)

---

## 9. Ordem sugerida de execução

Independente da ferramenta, executar nesta sequência para minimizar retrabalho:

1. Departamento / Space "Vendas" e pipelines (Leads & Deals, Contas, Contatos, Nutrição)
2. Etapas do pipeline Leads & Deals (9, com 2 marcadas como ganho/perda)
3. Campos core (gates): Aceite verbal, Aceite proposta, Valor proposto, Data demo, MRR, Motivo perda
4. Relacionamentos (Contato→Conta, Deal→Conta)
5. Campos complementares (qualificação, proposta, nutrição)
6. Validação visual com Ops de Vendas (2–3 deals de teste)
7. Formulários de captação inbound
8. Views (pipeline, lista da semana, demos, forecast, perdidos, nutrição)
9. Automações — começar pelas 11 internas, depois as 5 externas
10. Dashboard + OKRs
11. Integração com Google Calendar
12. Handoff cross-pipeline para Implantação
13. Webhook para ERP (última etapa)

---

## 10. Responsáveis

- **Sponsor / Product Owner:** Walter Frey
- **Dona da operação:** Caroline Oliveira (Carol)
- **Arquitetura e execução técnica:** Squad Opensquad (`nxz-clickup-setup`)
- **Suporte financeiro:** Sabrina
- **Suporte implantação:** Matheus / Luiz (departamento Relacionamento)

---

**Output esperado da implantação:** CRM configurado na ferramenta-alvo, 3 deals de teste funcionando ponta a ponta (Qualificado → Live), Ops de Vendas operando sem intervenção técnica, dashboard de MRR publicado e handoff automático para Implantação validado.
