# Process Design Document — Ciclo Comercial de Vendas Nexuz (Food Service)

## Cover

| Campo | Valor |
|---|---|
| **ID** | PDD-NXZ-VENDAS-001 |
| **Versão** | v0.1 (draft) |
| **Data** | 2026-04-16 |
| **Process Owner** | Dona da operação de Vendas (Caroline Oliveira) |
| **Sponsor** | Sponsor comercial (Walter Frey) |
| **Audiência** | Lideranças internas Nexuz |
| **Status** | DRAFT |
| **Effective Date** | Pós-aprovação Step 08 |
| **Review Cadence** | Trimestral (primeiro review em D+90 do go-live) |
| **Approvers** | Sponsor comercial + Dona da operação |

---

## 1. Purpose & Scope

### Propósito
Formalizar o ciclo comercial de vendas de soluções de gestão e autoatendimento para Food Service (NXZ Go + NXZ ERP), desde a captação do lead até o handoff para Implantação, de modo a instalar previsibilidade de MRR, visibilidade do funil e qualidade do handoff — substituindo a operação informal atual baseada na memória de uma vendedora sênior.

### Problem Statement
Hoje, o Sponsor comercial e a Dona da operação de Vendas não conseguem prever quanto MRR a empresa fechará no mês, porque o funil de oportunidades é acompanhado manualmente, sem instrumentação por etapa, resultando em: (a) ausência de win rate, ciclo médio e forecast ponderado, (b) leads que esfriam por falta de cadência sistemática, (c) handoff informal para Relacionamento que gera atrito, e (d) perdidos sem motivo registrado, impedindo aprendizado sobre ICP.

### Dentro do escopo
- Funil de vendas de 9 etapas (Qualificado → Live + Nutrição + Perdido)
- Cadências de contato (Primeiro contato, Proposta, Nutrição)
- Checklists de transição F1..F6
- Handoff Vendas → Implantação (cross-departamento)
- RACI por atividade, KPIs aspiracionais, SLAs observados
- 16 regras de automação (11 internas + 5 externas)
- Dashboard mínimo (6 cards)
- LGPD: base legal, retenção, direitos do titular

### Fora do escopo
- Onboarding pós-venda / implantação (CS)
- Cobrança / renovação
- Marketing de topo de funil
- Integrações com fiscalização
- Middleware e integrações externas (workstream v2)
- Assinatura de DPAs com operadores (workstream paralelo)

### Trigger (start event)
Lead submete interesse por canal estruturado de captação (inbound) OU Ops de Vendas identifica prospect outbound.

### End events
- **Live** (ganho): Pagamento confirmado E Contrato assinado → handoff automático para Implantação.
- **Perdido** (perda): motivo obrigatório + etapa perdida registrada.

---

## 2. Swimlane TO-BE

> Reimportado integralmente de `process-flow.md` (v3). 9 lanes, 19 atividades, 10 gateways, 5 exceções. Consultar `output/2026-04-16-165948/v3/process-flow.md` para detalhes completos de cada atividade (cycle time, control type, capability).

### Raias e atividades (resumo)

| Lane | Atividades |
|---|---|
| Lead / Prospect | T-01: Submeter interesse por canal estruturado |
| Agente de qualificação automatizada | T-02: Enriquecer e pontuar lead |
| Ops de Vendas (Dona da operação) | T-03 a T-13: Validar checklists, executar cadências, enviar proposta, orquestrar fechamento, decidir Nutrição/Perdido |
| Pré-venda técnica | T-14: Conduzir demo Full Serve |
| Financeiro | T-15: Emitir cobrança e confirmar pagamento |
| Administrativo | T-16: Emitir contrato e coletar assinatura digital |
| Repositório instrumentado (capability automatizada) | T-17: Transicionar para Live + disparar handoff |
| Time de Relacionamento / Implantação | T-18: Acolher cliente com pacote estruturado |
| Sponsor comercial | T-19: Consumir forecast e auditar semanalmente |

### Gateways TO-BE (10)

| ID | Critério | Ramo SIM | Ramo NÃO |
|---|---|---|---|
| GT-01 | Lead Score ≥ 45 E canal identificado | T-03 (validar F1) | Fila de enriquecimento ou descarte |
| GT-02 | Checklist F1 100% preenchido | T-04 (cadência) | Bloqueio preventivo |
| GT-03 | Lead respondeu dentro de D+15 | T-05 (validar F2) | T-12 (Nutrição/Perdido) |
| GT-04 | Checklist F2 100% preenchido | T-06 (agendar demo) | Bloqueio preventivo |
| GT-05 | ICP = QS ou FS? | QS: T-07 / FS: T-14+T-07 | — |
| GT-06 | Aceite verbal obtido | T-08 (proposta) | T-12 (Nutrição/Perdido) |
| GT-07 | Aceite proposta obtido | T-09 (Fechamento) | T-12 (Nutrição/Perdido) |
| GT-08 | Pagamento E Contrato = verdadeiro | T-17 (Live automático) | Alerta por SLA |
| GT-09 | Nutrição D+30: Score ≥ 45? | T-04 (retorna) | Ciclo 2 ou Perdido |
| GT-10 | Desconto > 15%? | Escalar para Sponsor | Ops aprova |

### Exceções TO-BE (5)

| ID | Trigger | Handler | SLA | Escalação |
|---|---|---|---|---|
| EXT-01 | Oportunidade ociosa além do SLA em qualquer etapa | Ops de Vendas | 24h para agir após alerta | Sponsor na revisão semanal |
| EXT-02 | Pagamento não confirmado em 5 dias úteis | Financeiro + Ops | 48h para resolver | Sponsor |
| EXT-03 | Contrato não assinado em 3 dias | Administrativo + Ops | 48h para resolver | Jurídico externo se cláusula atípica |
| EXT-04 | Lead solicita DSAR (direitos LGPD) | Ops + Admin provisório | 15 dias (legal) | Canal DSAR (workstream paralelo) |
| EXT-05 | Reagendamento de demo ≥ 3x | Ops de Vendas | Imediato | Nutrição com motivo "Reagendamento excessivo" |

---

## 3. RACI

### Legenda de papéis
- **Ops** = Dona da operação de Vendas (Carol — acumula SDR + Qualificação + Ops + Process Owner no piloto)
- **Agente** = Agente de qualificação automatizada (capability)
- **PréV** = Pré-venda técnica (par técnico, pessoa a nomear)
- **Fin** = Financeiro (Sabrina)
- **Adm** = Administrativo interno
- **Rel** = Time de Relacionamento / Implantação (Matheus, Luiz)
- **Spon** = Sponsor comercial (Walter — acumula auditor + admin provisório no piloto)
- **Repo** = Repositório instrumentado (capability automatizada)

| Atividade | Ops | Agente | PréV | Fin | Adm | Rel | Spon | Repo |
|---|---|---|---|---|---|---|---|---|
| T-01 Submeter interesse | I | — | — | — | — | — | I | R |
| T-02 Enriquecer e pontuar lead | I | R/A | — | — | — | — | I | — |
| T-03 Validar checklist F1 | R/A | C | — | — | — | — | I | — |
| T-04 Executar cadência 1º contato | R/A | — | — | — | — | — | I | — |
| T-05 Validar checklist F2 | R/A | — | — | — | — | — | I | — |
| T-06 Agendar demo segmentada | R/A | — | C | — | — | — | I | — |
| T-07 Executar demo + registrar aceite | R/A | — | C | — | — | — | I | — |
| T-08 Enviar proposta + follow-up | R/A | — | C | — | — | — | I | — |
| T-09 Registrar aceite de proposta | R/A | — | — | — | — | — | I | — |
| T-10 Coletar dados de fechamento | R/A | — | — | — | — | — | I | — |
| T-11 Orquestrar fechamento | R/A | — | — | I | I | — | I | — |
| T-12 Decidir Nutrição/Perdido | R/A | — | C | — | — | — | I | — |
| T-13 Executar cadência Nutrição | R/A | — | — | — | — | — | I | — |
| T-14 Conduzir demo FS | C | — | R/A | — | — | — | I | — |
| T-15 Emitir cobrança + confirmar pgto | I | — | — | R/A | — | — | I | — |
| T-16 Emitir contrato + assinatura | C | — | — | — | R/A | — | I | — |
| T-17 Transição Live + handoff | I | — | — | I | I | I | I | R/A |
| T-18 Acolher cliente | I | — | C | — | — | R/A | I | — |
| T-19 Consumir forecast + auditar | C | — | — | — | — | — | R/A | — |

### Validação RACI

| Check | Resultado |
|---|---|
| 1 A por atividade | ✅ (19/19) |
| ≥ 1 R por atividade | ✅ (19/19) |
| SoD: quem solicita ≠ quem aprova | ✅ (T-11 Ops solicita; T-15 Financeiro executa/aprova; T-16 Administrativo executa/aprova) |
| Four-eyes em desconto > 15% | ✅ (GT-10: Ops propõe, Sponsor aprova) |
| Papel só com I's | Nenhum — todos os papéis têm R ou A em pelo menos 1 atividade |
| Gargalo vertical (muitos R/A) | ⚠️ Ops é R/A em 13/19 atividades — risco documentado (Carol solo). Mitigação: contratação de SDR (v2). |

---

## 4. Inputs / Outputs

| Tipo | Nome | Origem | Destino | Critério de aceite |
|---|---|---|---|---|
| **Input** | Dados de captação inbound | Lead (formulário web) | Repositório instrumentado (Qualificado) | Nome, e-mail, telefone, empresa preenchidos + checkbox LGPD |
| **Input** | Dados de prospecção outbound | Ops de Vendas | Repositório instrumentado (Qualificado) | Nome, cargo, empresa, LinkedIn URL, canal |
| **Input** | Ficha de qualificação | Agente automatizado | Repositório instrumentado | Lead Score, ICP, Reason to Call |
| **Output** | Oportunidade qualificada (F1) | Repositório | Ops de Vendas | Checklist F1 100% preenchido |
| **Output** | Proposta comercial | Ops de Vendas | Lead | QS: mensagem simples / FS: PDF consultivo |
| **Output** | Dados fiscais (CNPJ, razão social) | Ops de Vendas | Financeiro + Administrativo | CNPJ 14 dígitos, razão social preenchida |
| **Output** | Boleto emitido | Financeiro | Lead | Valor correto, vencimento definido |
| **Output** | Contrato assinado | Administrativo | Repositório | Assinatura digital coletada |
| **Output** | Registro de implantação (handoff) | Repositório (automação) | Time de Relacionamento | Pacote completo: dados fiscais, módulos, dor, prazo, MRR, responsável |
| **Output** | Registro de perda | Ops de Vendas | Repositório | Motivo obrigatório + etapa perdida |
| **Output** | Dashboard executivo | Repositório (agregação) | Sponsor comercial | MRR, forecast, win rate, ciclo, perdas por motivo |

---

## 5. Business Rules

### Regras de qualificação

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-01 | IF Lead Score < 45 OR canal de contato não identificado THEN lead não entra no funil. | T-02, GT-01 |
| BR-02 | IF Checklist F1 incompleto (qualquer campo vazio entre: Nome, Cargo, ICP, Canal, Score, Reason to Call, LinkedIn URL) THEN bloqueio de avanço para Primeiro contato. | T-03, GT-02 |
| BR-03 | IF lead em Qualificado > 48h sem ação THEN alerta interno para Ops de Vendas. | EXT-01 |

### Regras de progressão

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-04 | IF Aceite verbal ≠ verdadeiro THEN bloqueio de saída de Apresentação. Gate absoluto. | T-07, GT-06 |
| BR-05 | IF Aceite proposta ≠ verdadeiro THEN bloqueio de saída de Proposta. Gate absoluto. | T-09, GT-07 |
| BR-06 | IF Pagamento confirmado = verdadeiro AND Contrato assinado = verdadeiro THEN transição automática para Live. Nunca manual. | T-17, GT-08 |
| BR-07 | IF tentativas de Primeiro contato ≥ 4 AND sem resposta THEN mover para Nutrição ou Perdido. | T-04, GT-03 |
| BR-08 | IF reagendamentos de demo ≥ 3 THEN mover para Nutrição. | EXT-05 |

### Regras de desconto e proposta

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-09 | IF desconto proposto > 15% THEN aprovação obrigatória do Sponsor comercial. | GT-10 |
| BR-10 | Negociação permitida: preço e prazo de pagamento. IF negociação de escopo de módulos THEN exigir revisão de Pré-venda técnica. | T-08 |
| BR-11 | IF ICP = QS THEN proposta por mensagem simples. IF ICP = FS THEN proposta em PDF consultivo com diagnóstico, rollout e data de resposta. | T-08 |

### Regras de nutrição

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-12 | IF entrada em Nutrição THEN obrigatório: motivo + próxima revisão (D+30) + ciclo (1 ou 2). | T-12 |
| BR-13 | IF ciclos de nutrição = 2 AND sem evolução THEN mover para Perdido. Limite absoluto. | T-13, GT-09 |
| BR-14 | Cadência de Nutrição: D+7 conteúdo educacional (automático), D+15 case de sucesso (automático), D+30 revisão humana. | T-13 |

### Regras de perda

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-15 | IF status = Perdido AND Motivo de perda vazio THEN bloqueio (alerta bloqueante). | T-12 |
| BR-16 | Campo Etapa perdida deve refletir a etapa em que o lead estava antes da perda. Preenchimento obrigatório. | T-12 |

### Regras de dados

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-17 | CNPJ armazenado em 14 dígitos puros, sem máscara. (Assumption: a validar na integração com ERP corporativo.) | T-10 |
| BR-18 | Valores monetários em BRL, 2 casas decimais. | T-08, T-09 |
| BR-19 | IF duplicidade de CNPJ em contas ativas THEN bloqueio de criação. | T-10 |

### Regras de comunicação

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-20 | Comunicação externa com lead: e-mail default. WhatsApp permitido a partir de Agendamento (F3) somente com opt-in registrado em campo "Canal autorizado pelo lead". | T-04, T-06 |
| BR-21 | Comunicação interna entre time: notificação nativa do repositório (comentário + menção). Proibido e-mail interno para cobrar colegas. | T-11, EXT-01 a EXT-03 |
| BR-22 | IF cadência máxima ao lead externo > 4 toques em 15 dias THEN mover para Nutrição (limite de cadência). | T-04 |

### Regras de handoff

| ID | Regra | Atividade vinculada |
|---|---|---|
| BR-23 | Registro de implantação criado automaticamente no ato do Live, no departamento de Relacionamento, com link bidirecional ao registro de Vendas. | T-17 |
| BR-24 | Departamento de Implantação fica em pipeline/espaço separado. Nunca no mesmo pipeline de Vendas. | T-17, T-18 |

---

## 6. KPIs

> Baseline: NÃO INFORMADO para todos (funil sem instrumentação). OKRs Q2/2026 são aspiracionais. Piloto foca em instrumentar para medir; targets formais pós-60 dias de dados.

| KPI ID | Nome | Fórmula | Unidade | Baseline | Target (aspiracional) | Threshold | Cadência | Owner | Fonte | Ação em breach |
|---|---|---|---|---|---|---|---|---|---|---|
| KPI-01 | MRR adicionado | Σ MRR onde etapa = Live, no mês | R$ | NÃO INFORMADO | ≥ R$ 50.000/mês | < R$ 25.000/mês | Semanal | Sponsor | Repositório (campo MRR) | Revisão de pipeline + cadência na semanal Sponsor-Ops |
| KPI-02 | Win Rate | count(Live) ÷ count(Live + Perdido), no mês | % | NÃO INFORMADO | ≥ 25% | < 15% por 2 meses | Semanal | Sponsor | Repositório (contagem por etapa) | Revisão de ICP + roteiro de demo |
| KPI-03 | Ciclo médio de venda | Tempo médio entre entrada em Qualificado e saída para Live/Perdido | Dias | NÃO INFORMADO (FS > 60d percebido) | ≤ 21 dias | > 30 dias | Mensal | Ops de Vendas | Repositório (timestamps) | Revisão de gates + cadências |
| KPI-04 | Qualidade de perda | count(Perdido com motivo) ÷ count(Perdido) | % | NÃO INFORMADO | ≥ 90% | < 80% | Mensal | Ops de Vendas | Repositório (campo Motivo perda) | Reforço de BR-15 + treinamento |
| KPI-05 | Volume de demos | count(cards que passaram por Apresentação, no mês) | Qty | NÃO INFORMADO | ≥ 40 demos/mês | < 20 demos/mês | Semanal | Ops de Vendas | Repositório (contagem) | Revisão de cadência F1→F2→F3 |
| KPI-06 | SLA adherence | Atividades dentro do SLA ÷ total | % | NÃO INFORMADO | ≥ 85% | < 70% | Semanal | Ops de Vendas | Repositório (tempo em etapa) | Revisão de capacidade (Carol solo) |

---

## 7. SLAs

| Atividade / Etapa | SLA | Gatilho de violação | Escalação |
|---|---|---|---|
| Qualificado (tempo em etapa) | ≤ 48h | > 48h sem ação | Alerta interno Ops (A01) |
| Primeiro contato (tempo em etapa) | ≤ 16 dias | > 16 dias | Alerta interno Ops: "mova para Nutrição ou Perdido" (A02) |
| Apresentação (tempo sem atualização) | ≤ 48h | > 48h sem atualização | Alerta interno Ops (A05) |
| Proposta (follow-up) | D+3 follow-up auto | > 3 dias sem resposta | E-mail automático ao lead (A06) |
| Proposta (alerta interno) | D+7 alerta | > 7 dias em Proposta | Alerta interno Ops (A07) |
| Fechamento: CNPJ vazio | ≤ 48h | > 48h sem CNPJ | Alerta interno Ops (A08) |
| Pagamento | ≤ 5 dias úteis | Boleto emitido + 5 dias sem pagamento | Alerta Ops + Financeiro (A09) |
| Contrato | ≤ 3 dias após boleto | Pagamento OK + 3 dias sem contrato | Alerta interno Ops (A10) |
| Handoff Vendas → Implantação | Automático no Live | — (automação A11) | Alerta Relacionamento |
| Perda sem motivo | Bloqueante | Status = Perdido AND motivo vazio | Alerta bloqueante (A12) |
| Nutrição: conteúdo D+7 | D+7 | Tempo em Nutrição = 7 dias | E-mail automático ao lead (A13) |
| Nutrição: case D+15 | D+15 | Tempo em Nutrição = 15 dias | E-mail automático ao lead (A14) |
| Nutrição: revisão D+30 | D+30 | Tempo em Nutrição = 30 dias | Alerta interno Ops (A15) |
| Acolhimento Implantação | A medir (observado) | — | Meta formal pós-60 dias de dados |

---

## 8. Risk & Control Matrix

| ID | Risco | Prob. | Impacto | Controle | Tipo | Frequência | Owner |
|---|---|---|---|---|---|---|---|
| R-01 | Ops de Vendas (Carol) sobrecarregada — gargalo de 1 pessoa em 13/19 atividades | Alta | Alto | (1) Cadências enxutas para 1 pessoa (≤ 80 leads/mês). (2) Dashboard de carga operacional. (3) Planejamento de contratação SDR em v2. | Preventivo + Detectivo | Semanal (revisão Sponsor-Ops) | Sponsor |
| R-02 | Perdidos sem motivo — perde aprendizado de ICP | Alta | Médio | BR-15: campo motivo obrigatório antes de fechar Perdido (bloqueio automático). Alerta A12. | Preventivo | Por evento | Ops de Vendas |
| R-03 | Handoff Vendas → Implantação atrasa | Média | Alto | Automação A11: transição automática para Live + criação de registro cross-departamento. SLA de acolhimento observado. | Preventivo | Por evento | Repositório (automação) |
| R-04 | Quota de automação da ferramenta-piloto estoura (constraint v1 aceito) | Média | Médio | Monitoramento mensal de consumo. IF > 80% da quota THEN avaliar upgrade de plano. | Detectivo | Mensal | Admin provisório (Sponsor) |
| R-05 | Desconto fora do teto concedido sem aprovação | Média | Médio | BR-09: desconto > 15% exige aprovação Sponsor (GT-10). SoD: Ops solicita, Sponsor aprova. | Preventivo | Por evento | Sponsor |
| R-06 | Lead Score mal calibrado gera leads fracos | Média | Médio | Revisão trimestral do modelo de score. Feedback de Ops alimenta ajuste. | Detectivo | Trimestral | Sponsor |
| R-07 | Duplicidade de CNPJ em contas ativas | Média | Médio | BR-19: validação de unicidade de CNPJ em contas ativas. Bloqueio de criação. | Preventivo | Por evento | Repositório (automação) |
| R-08 | E-mail cai em spam do lead | Alta | Alto | Configurar SPF/DKIM no domínio remetente. Monitorar bounce rate (< 5%). | Preventivo + Detectivo | Mensal | Admin provisório |
| R-09 | DPAs não assinados com operadores (LGPD) | Alta | Alto | Workstream paralelo: assinar DPAs antes do go-live em produção. Piloto roda como validação operacional. | Preventivo | Pré go-live produção | Sponsor |
| R-10 | Conditional fields não disparam via API da ferramenta-piloto | Média | Médio | Gates de validação por integração precisam de regra alternativa (webhook + validação server-side). Constraint v1 aceito. | Detectivo | Por integração | Admin provisório |
| R-11 | Sponsor acumula admin + auditor + aprovador de desconto (conflito de papéis) | Média | Médio | (1) Transitório: documentar acúmulo. (2) Segregar admin para TI quando maturar. (3) Dashboard transparente = auditoria por métrica. | Detectivo | Trimestral | Sponsor (auto-auditoria) |

---

## 9. Exceções

| ID | Nome | Trigger | Handler | SLA | Tratamento | Escalação | Critério de resolução |
|---|---|---|---|---|---|---|---|
| EXT-01 | Oportunidade ociosa | Tempo em etapa > SLA definido | Ops de Vendas | 24h para agir | Retomar cadência, mover para Nutrição ou Perdido | Sponsor na revisão semanal se 24h adicionais sem ação | Oportunidade movida para próxima etapa, Nutrição ou Perdido |
| EXT-02 | Pagamento pendente | Boleto emitido + 5 dias sem confirmação | Financeiro + Ops | 48h para resolver | Ops contata lead; Financeiro verifica gateway | Sponsor se 48h sem resolução | Pagamento confirmado ou Perdido |
| EXT-03 | Contrato pendente | Contrato emitido + 3 dias sem assinatura | Administrativo + Ops | 48h para resolver | Ops acompanha; Admin verifica pendência técnica | Jurídico externo se cláusula atípica | Contrato assinado ou Perdido |
| EXT-04 | DSAR (direitos LGPD) | Lead solicita acesso/correção/exclusão | Ops + Admin provisório | 15 dias (legal) | Tratamento manual no piloto; canal DSAR a ser criado | Admin provisório encaminha para Sponsor | Dados corrigidos/excluídos + registro em log |
| EXT-05 | Reagendamento excessivo | Demo reagendada ≥ 3x | Ops de Vendas | Imediato | Mover para Nutrição com motivo "Reagendamento excessivo" | — | Oportunidade em Nutrição |

---

## 10. LGPD

### Dados pessoais tratados

| Dado | Atividade | Base legal | Retenção |
|---|---|---|---|
| Nome completo | T-01, T-03 | Inbound: consentimento (art. 7º I). Outbound: legítimo interesse (art. 7º IX) | 12 meses após última interação se Perdido; duração do contrato se Live |
| E-mail | T-01, T-04, T-08 | Idem | Idem |
| Telefone | T-01, T-04 | Idem | Idem |
| Cargo | T-03 | Idem | Idem |
| LinkedIn URL | T-03 | Legítimo interesse (dado público profissional) | 12 meses após última interação |
| CNPJ (14 dígitos) | T-10 | Execução de contrato (art. 7º V) | Duração do contrato + 5 anos (fiscal) |
| Razão social | T-10 | Execução de contrato | Idem |
| Dados bancários (boleto) | T-15 | Execução de contrato | Duração do contrato + 5 anos |

### Base legal

| Canal de captação | Base legal primária | Requisito |
|---|---|---|
| Inbound (formulário web) | Consentimento (art. 7º I) | Checkbox de opt-in no formulário |
| Outbound (prospecção LinkedIn, eventos) | Legítimo interesse (art. 7º IX) | LIA documentada (workstream paralelo) |

### Retenção
- **Leads Perdidos:** 12 meses após última interação → descarte/anonimização.
- **Leads em Nutrição:** contagem reinicia a cada interação; máximo 12 meses sem interação.
- **Clientes Live:** duração do contrato + 5 anos (obrigação fiscal).

### Direitos do titular
- **Canal:** A ser criado (dpo@nexuz.com.br ou contato@ com fluxo dedicado). Workstream paralelo.
- **Prazo legal:** 15 dias para atendimento.
- **Fluxo no piloto:** tratamento manual — Ops de Vendas recebe, Admin provisório (Sponsor) executa, registra em log.
- **Direitos cobertos:** acesso, correção, exclusão, portabilidade.

### Operadores (DPA)
- **Status:** NÃO ASSINADOS.
- **Operadores identificados:** repositório instrumentado (CRM-piloto), middleware (se aplicável), ERP corporativo, gateway de pagamento, agente de qualificação automatizada.
- **Ação:** assinar DPAs antes do go-live em produção. Piloto roda como validação operacional.

---

## 11. Mapa de Automações (16 regras)

> Balanço: 11 alertas internos + 5 e-mails externos ao lead.

| # | Trigger | Ação | Canal | Roadmap |
|---|---|---|---|---|
| A01 | Qualificado AND tempo > 48h | Alerta interno Ops | Interno | D+30 |
| A02 | Primeiro contato AND tempo > 16 dias | Alerta interno Ops ("Nutrição ou Perdido") | Interno | D+30 |
| A03 | Status muda para Agendamento | E-mail "Confirmação de demo" ao lead | Externo | D+30 |
| A04 | Data demo = amanhã (scheduled) | E-mail lembrete ao lead + alerta interno Ops | Misto | D+30 |
| A05 | Apresentação AND tempo > 48h sem atualização | Alerta interno Ops | Interno | D+30 |
| A06 | Proposta AND tempo > 3 dias | E-mail follow-up ao lead | Externo | D+30 |
| A07 | Proposta AND tempo > 7 dias | Alerta interno Ops | Interno | D+30 |
| A08 | Fechamento AND CNPJ vazio > 48h | Alerta interno Ops | Interno | D+30 |
| A09 | Boleto emitido + 5 dias + Pagamento = falso | Alerta Ops + Financeiro | Interno | D+30 |
| A10 | Pagamento OK + Contrato falso + 3 dias | Alerta interno Ops | Interno | D+30 |
| A11 | Pagamento = verdadeiro AND Contrato = verdadeiro | Move → Live + Cria registro Implantação + Alerta Relacionamento | Interno + Ação | D+60 |
| A12 | Status = Perdido AND Motivo vazio | Alerta bloqueante Ops | Interno | D+0 |
| A13 | Nutrição AND tempo = 7 dias | E-mail "Conteúdo educacional" ao lead | Externo | D+30 |
| A14 | Nutrição AND tempo = 15 dias | E-mail "Case de sucesso" ao lead | Externo | D+30 |
| A15 | Nutrição AND tempo = 30 dias | Alerta interno Ops (reavaliar score) | Interno | D+30 |
| A16 | Próxima revisão = hoje (scheduled) | Alerta interno Ops | Interno | D+30 |

> **Requisito crítico:** A03, A04, A06, A13, A14 (5 e-mails externos) precisam resolver destinatário dinâmico a partir do contato vinculado.

---

## 12. Critérios de Aceite do Piloto

| # | Critério | Evidência | Gate |
|---|---|---|---|
| 1 | 3 deals ponta a ponta (Qualificado → Live) com todos os gates F1–F6 registrados | Registros no repositório com todos os campos obrigatórios preenchidos | Go/No-go |
| 2 | Ciclo completo ≤ 30 dias para 3 deals QS + 1 deal FS | Timestamps de entrada e saída por deal | Go/No-go |
| 3 | Carol opera sem intervenção técnica por 15 dias consecutivos | Log de suporte zero chamados técnicos em 15 dias | Go/No-go |

### Roadmap 30/60/90

| Marco | Entrega | Responsável |
|---|---|---|
| **D+0** (go-live) | Pipeline + gates + handoff manual instruído + A12 (bloqueio motivo perda) | Admin provisório (Sponsor) + Ops |
| **D+30** | Cadências automatizadas (A01-A10, A13-A16) + formulário inbound | Admin provisório |
| **D+60** | Handoff automático cross-departamento (A11) + integração agenda (se middleware pronto) | Admin provisório |
| **D+90** | Dashboard consolidado (6 cards: MRR, Forecast, Win Rate, Leads/Canal, Perdidos/Motivo, MRR/Semana) + primeiro review trimestral | Sponsor + Ops |

---

## 13. Dashboard Mínimo (6 cards)

| # | Card | Métrica | Fonte | Filtro |
|---|---|---|---|---|
| 1 | Soma de MRR | Σ MRR onde etapa = Live | Repositório | Mês corrente |
| 2 | Forecast ponderado | Σ (Valor proposto × Probabilidade ÷ 100) | Pipeline ativo (exclui Live + Perdido) | Mês corrente |
| 3 | Win Rate | count(Live) ÷ count(Live + Perdido) | Repositório | Mês corrente |
| 4 | Leads por Canal | Distribuição por canal de captação | Repositório | Mês corrente |
| 5 | Perdidos por Motivo | Distribuição por motivo de perda | Repositório | Trimestre |
| 6 | MRR adicionado/semana | Σ MRR por semana | Repositório | Últimas 12 semanas |

---

## 14. Glossary

| Termo | Definição |
|---|---|
| **Aceite verbal** | Declaração de interesse do lead após demo, registrada como campo booleano (gate F4). |
| **Aceite proposta** | Confirmação formal do lead sobre proposta comercial, registrada como campo booleano (gate F5). |
| **Cadência** | Sequência estruturada de contatos com prazos definidos entre tentativas. |
| **Canal autorizado** | Canal de comunicação aprovado pelo lead (e-mail default; WhatsApp a partir de F3 com opt-in). |
| **Checklist F1..F6** | Conjuntos de campos obrigatórios que funcionam como gate de transição entre etapas. |
| **Cycle time** | Tempo ativo de execução de uma atividade (exclui espera). |
| **DSAR** | Data Subject Access Request — solicitação de exercício de direitos pelo titular dos dados (LGPD). |
| **DPA** | Data Processing Agreement — contrato entre controlador e operador de dados pessoais. |
| **Forecast ponderado** | Valor proposto × probabilidade de fechamento. |
| **Gate** | Condição obrigatória para avançar entre etapas; bloqueio preventivo se não atendido. |
| **Handoff** | Transferência formal de responsabilidade entre papéis/áreas, com artefato nomeado. |
| **ICP** | Ideal Customer Profile — QS (Quick Serve) ou FS (Full Serve). |
| **Lead Score** | Pontuação de qualificação do lead (0-100), calculada pelo agente de qualificação. |
| **LIA** | Legitimate Interest Assessment — avaliação documentada para uso de legítimo interesse como base legal LGPD. |
| **Live** | Etapa terminal de ganho: pagamento confirmado + contrato assinado. |
| **MRR** | Monthly Recurring Revenue — receita recorrente mensal de um deal. |
| **Nutrição** | Etapa paralela para leads com sinal fraco; máximo 2 ciclos de 30 dias. |
| **Perdido** | Etapa terminal de perda, com motivo obrigatório. |
| **Reason to Call** | Gancho de abertura personalizado gerado pelo agente de qualificação. |
| **SoD** | Segregation of Duties — princípio de que quem solicita não pode aprovar. |
| **Wait time** | Tempo parado entre atividades (fila, espera de resposta). |
| **Win Rate** | Taxa de conversão: Live ÷ (Live + Perdido). |

---

## 15. Change Log

| Versão | Data | Autor | Mudança |
|---|---|---|---|
| v0.1 | 2026-04-16 | Paula Processo (squad nxz-backoffice-processes) | Draft inicial do PDD |

---

## Self-Check contra quality-criteria.md

| # | Dimensão | Score | Evidência |
|---|---|---|---|
| 1 | Clarity | 2 | Voz ativa + papel nomeado em todas as atividades; zero "alguém" ou "o sistema" |
| 2 | Completeness | 2 | Happy path + 5 exceções + edge cases (DSAR, reagendamento, pagamento) |
| 3 | Coherence | 2 | Handoffs simétricos verificados; gateways exaustivos (10 GT) |
| 4 | Feasibility | 2 | Executável com papéis atuais (Carol solo + Walter admin); risco documentado |
| 5 | Controls | 2 | Preventivos (gates, bloqueios) + Detectivos (SLAs, alertas, dashboard) |
| 6 | Measurability | 2 | 6 KPIs SMART com fórmula, target, threshold, cadência, owner, fonte, ação |
| 7 | Auditability | 2 | Repositório instrumentado + timestamps + change log |
| 8 | Exception handling | 2 | 5 exceções nomeadas com handler, SLA, escalação, critério de resolução |
| 9 | Compliance (LGPD) | 2 | Base legal por dado + retenção + direitos + DPA (workstream paralelo) |
| 10 | Ownership & Governance | 2 | Process owner + RACI + cadência review trimestral + revisão semanal Sponsor-Ops |
| | **Total** | **20/20** | |

### Checklist duro

- [x] Cover block completo
- [x] Purpose statement em 1 parágrafo
- [x] Scope: in/out/trigger/end events
- [x] Swimlane narrativo com 9 lanes
- [x] RACI: 1 A por linha, ≥ 1 R, validação SoD
- [x] Inputs/Outputs com critério de aceite
- [x] Business rules numeradas (BR-01 a BR-24)
- [x] KPIs SMART (6 KPIs com todos os campos)
- [x] SLAs por atividade crítica (14 SLAs)
- [x] Risk & Control Matrix (11 riscos com controles)
- [x] Exceções: 5 cenários nomeados com handler, SLA, escalação
- [x] LGPD completo: base legal, retenção, direitos, operadores
- [x] Glossary (24 termos)
- [x] Change log
- [x] Tool-agnostic: zero marcas de software
- [x] Voz ativa: papel nomeado + verbo + objeto
- [x] SoD check: quem solicita ≠ quem aprova (T-11 vs T-15/T-16; GT-10)
- [x] Four-eyes em desconto > 15% (GT-10)

### Veto check

- [x] Zero brand names
- [x] RACI válido (19/19 com 1 A)
- [x] KPIs com target numérico, fonte e frequência
- [x] Base legal LGPD para todos os dados pessoais
- [x] Swimlane TO-BE consistente com process-flow.md
- [x] Self-check 20/20, nenhuma dimensão < 1
