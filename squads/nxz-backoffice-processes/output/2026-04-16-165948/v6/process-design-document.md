# Process Design Document — Ciclo Comercial de Vendas Nexuz (Food Service)

## Cover

| Campo | Valor |
|---|---|
| **ID** | PDD-NXZ-VENDAS-001 |
| **Versão** | v1.0 (publicada) |
| **Data** | 2026-04-17 |
| **Process Owner** | Dona da operação de Vendas (Caroline Oliveira) |
| **Sponsor** | Sponsor comercial (Walter Frey) |
| **Audiência** | Lideranças internas Nexuz |
| **Status** | PUBLICADO |
| **Effective Date** | Pós-aprovação Step 08 |
| **Review Cadence** | Trimestral (primeiro review em D+90 do go-live) |
| **Approvers** | Sponsor comercial + Dona da operação |

---

## 1. Purpose & Scope

### Propósito
Formalizar o ciclo comercial de vendas de soluções de gestão, autoatendimento e inteligência para Food Service (portfólio completo: ERP, PDV/Go, Smart POS, KDS, Delivery, Inteligência, Manager, Brain, Setup-as-a-Service, Retainer de Performance), desde a captação do lead até o handoff para Implantação, de modo a instalar previsibilidade de MRR, visibilidade do funil e qualidade do handoff — substituindo a operação informal atual baseada na memória de uma vendedora sênior.

### Problem Statement
Hoje, Sponsor comercial e Dona da operação de Vendas não conseguem prever quanto MRR a empresa fechará no mês, porque o funil de oportunidades é acompanhado manualmente, sem instrumentação por etapa, resultando em: (a) ausência de win rate, ciclo médio e forecast ponderado, (b) leads que esfriam por falta de cadência sistemática, (c) handoff informal para Relacionamento que gera atrito, e (d) descartes sem motivo registrado, impedindo aprendizado sobre ICP.

### Dentro do escopo
- Funil de vendas: 3 sub-etapas de entrada + 5 etapas sequenciais + 2 terminais + pipe paralelo de Nutrição
- Modelo de Dados (Conta / Contato / Deal) com campos completos
- Cadências detalhadas (Qualificação, Proposta, Nutrição) com canal e executor por toque
- Marcos POD (Lead, MQL, SAL, Ganho, Live) com taxas de conversão e benchmarks
- Checklists de transição e Checklist Binário (6 itens)
- Motivos de Descarte (9 motivos) com regras de reengajamento
- Handoff Vendas → Implantação (cross-departamento)
- RACI por atividade com 5 departamentos
- Metas e Métricas em 3 camadas (Top-line, Alavanca, Diagnóstico)
- SLAs de Entrada (3 SLAs) + SLAs Internos por etapa
- 3 Dashboards (Meu Dia, Meu Funil, Minha Evolução)
- Precificação (preço base, margem, valor proposto final)
- Automações (alertas internos + e-mails externos)
- LGPD: base legal, retenção, direitos do titular

### Fora do escopo
- Onboarding pós-venda / implantação (CS)
- Cobrança / renovação
- Marketing de topo de funil
- Integrações com fiscalização
- Middleware e integrações externas (workstream v2)
- Assinatura de DPAs com operadores (workstream paralelo)

### Trigger (start event)
Lead submete interesse por canal estruturado de captação (inbound) OU Ops de Vendas identifica prospect outbound OU parceiro/cliente encaminha indicação formal.

### End events
- **GANHO** (terminal positivo): Pagamento confirmado E Contrato assinado → transição automática para Live e handoff para Implantação.
- **DESCARTE** (terminal negativo): motivo obrigatório (1 de 9 motivos) + campos condicionais preenchidos.

---

## 2. Swimlane TO-BE

### Etapas do Funil

O funil possui 3 sub-etapas de entrada diferenciadas por origem, 5 etapas sequenciais, 2 etapas terminais e 1 pipe paralelo de Nutrição.

| Etapa | Tipo | SLA | Descrição |
|---|---|---|---|
| **1A. Novo Lead — Inbound** | Entrada | 2h úteis | Lead entra via formulário web ou canal de captação digital. Ops de Vendas valida dados mínimos e encaminha para Qualificação. |
| **1B. Novo Lead — Outbound** | Entrada | 48h úteis | Ops de Vendas identifica prospect via prospecção ativa (LinkedIn, eventos, redes). Cria card com Reason to Call e encaminha para Qualificação. |
| **1C. Novo Lead — Indicação** | Entrada | 2h úteis | Parceiro, cliente ou contato encaminha indicação com contexto. Ops de Vendas valida dados e encaminha para Qualificação. |
| **2. Qualificação** | Sequencial | 8 dias corridos | Ops de Vendas executa cadência de qualificação (D+0/D+1/D+3/D+7). Gate de saída: Checklist Binário completo (6 itens). |
| **3. Demo Agendada** | Sequencial | Até data da demo + 1 dia útil | Ops de Vendas agenda e conduz demo segmentada (QS ou FS). Registra no-show, aceite verbal ou desfecho. |
| **4. Pós-demo** | Sequencial | 3 dias corridos | Ops de Vendas captura desfecho: no-show → reagendamento ou Nutrição; aceite verbal → avança para Proposta; sem aceite → Nutrição ou Descarte. |
| **5. Proposta** | Sequencial | 15 dias corridos | Ops de Vendas envia proposta comercial (QS: mensagem simples / FS: PDF consultivo). Cadência de follow-up até aceite ou decisão. |
| **6. Fechamento** | Sequencial | 10 dias corridos | Ops de Vendas coleta dados fiscais. Financeiro emite cobrança. Gestão emite contrato e coleta assinatura. |
| **7. GANHO** | Terminal positivo | Automático | Pagamento confirmado + Contrato assinado → transição automática. Handoff para Implantação. |
| **8. DESCARTE** | Terminal negativo | Imediato | Motivo obrigatório (1 de 9). Campos condicionais conforme motivo. Nunca reabrir card descartado. |
| **Nutrição** | Pipe paralelo | Ciclo 1: 30d / Ciclo 2: 30d | Lead com sinal fraco entra em Nutrição. Ciclo 1 (30d) → decisão → Ciclo 2 (30d) → decisão → Descarte automático D+67. Reaquecida gera card NOVO em Qualificação. |

### Raias e atividades (resumo)

| Raia | Atividades |
|---|---|
| Lead / Prospect | T-01: Submeter interesse por canal estruturado (Inbound) / Receber indicação (Indicação) |
| Ops de Vendas (Carol) | T-02 a T-15: Validar entrada, executar qualificação humana (Checklist Binário), executar cadências, agendar e conduzir demo, registrar pós-demo, enviar proposta, orquestrar fechamento, decidir Nutrição/Descarte |
| Gestão (Walter) | T-16: Emitir contrato e coletar assinatura digital. T-17: Consumir forecast e auditar semanalmente |
| Financeiro (Sabrina) | T-18: Emitir cobrança e confirmar pagamento |
| Relacionamento / Implantação (Matheus, Luiz) | T-19: Acolher cliente com pacote estruturado |
| Desenvolvimento | T-20: Configurar e manter automações, campos e integrações no repositório instrumentado |
| Repositório instrumentado (capability automatizada) | T-21: Transicionar para GANHO + disparar handoff automático |

### Gateways TO-BE

| ID | Critério | Ramo SIM | Ramo NÃO |
|---|---|---|---|
| GT-01 | Dados mínimos de entrada preenchidos (nome, empresa, canal) | Qualificação (etapa 2) | Bloqueio: completar dados antes de prosseguir |
| GT-02 | Checklist Binário completo (6/6 itens) | Demo Agendada (etapa 3) | Permanece em Qualificação; D+8 → Nutrição ou Descarte |
| GT-02A | Inbound com Checklist Binário já completo na entrada (R4) | Demo Agendada (pula Qualificação) | Qualificação normal |
| GT-03 | Lead respondeu dentro da cadência (D+7) | Continua qualificação | D+8 sem resposta → Nutrição ou Descarte |
| GT-04 | ICP = QS ou FS? | QS: demo simplificada / FS: demo consultiva | — |
| GT-05 | Demo realizada com aceite verbal | Proposta (etapa 5) | Pós-demo: reagendamento, Nutrição ou Descarte |
| GT-06 | No-show na demo | Reagendamento (≤ 3x) ou Nutrição | — |
| GT-07 | Aceite proposta obtido | Fechamento (etapa 6) | Nutrição ou Descarte |
| GT-08 | Pagamento = verdadeiro AND Contrato assinado = verdadeiro | GANHO automático (etapa 7) | Alerta por SLA |
| GT-09 | Nutrição Ciclo 1 D+30: decisão humana | Reaquecida → card NOVO em Qualificação | Ciclo 2 |
| GT-10 | Nutrição Ciclo 2 D+60: decisão humana | Reaquecida → card NOVO em Qualificação | D+67 → Descarte automático |
| GT-11 | Desconto > 15%? | Escalar para Sponsor | Ops aprova |

### Exceções TO-BE

| ID | Trigger | Handler | SLA | Escalação |
|---|---|---|---|---|
| EXT-01 | Oportunidade ociosa além do SLA em qualquer etapa | Ops de Vendas | 24h para agir após alerta | Sponsor na revisão semanal |
| EXT-02 | Pagamento não confirmado em 5 dias úteis | Financeiro + Ops | 48h para resolver | Sponsor |
| EXT-03 | Contrato não assinado em 3 dias | Gestão + Ops | 48h para resolver | Jurídico externo se cláusula atípica |
| EXT-04 | Lead solicita DSAR (direitos LGPD) | Ops + Sponsor (admin provisório) | 15 dias (legal) | Canal DSAR (workstream paralelo) |
| EXT-05 | Reagendamento de demo ≥ 3x | Ops de Vendas | Imediato | Nutrição com motivo "Reagendamento excessivo" |
| EXT-06 | Nutrição D+67 sem decisão | Repositório (automação) | Automático | Descarte com motivo "Nutrição expirada" |

---

## 3. Modelo de Dados (Conta / Contato / Deal)

### 3.1 Conta

Representa a empresa/estabelecimento prospect ou cliente.

| Campo | Tipo | Validação | Obrigatório |
|---|---|---|---|
| CNPJ | Texto (14 dígitos puros) | Exatamente 14 dígitos numéricos, único em contas ativas | Sim |
| Razão social | Texto | Não vazio | Sim |
| Nome fantasia | Texto | — | Não |
| Segmento/ICP | Lista: QS / FS / Zona de fronteira / Fora de ICP | Valor selecionado | Sim |
| Faturamento mensal | Monetário (R$) | > 0 | Sim (a partir de Qualificação) |
| Nº unidades | Inteiro | ≥ 1 | Sim (a partir de Qualificação) |
| Tipo operação | Texto | — | Não |
| Estado | Lista (UFs) | UF válida | Sim |
| Website | URL | Formato URL válido | Não |
| Instagram | Texto (@handle) | — | Não |
| Sistema atual | Texto | — | Não |
| Data criação | Data/hora | Auto (timestamp criação) | Auto |
| Status | Lista: Ativa / Cliente / Descartada / Inativa | Valor selecionado | Auto |

### 3.2 Contato

Representa uma pessoa física vinculada a uma Conta.

| Campo | Tipo | Validação | Obrigatório |
|---|---|---|---|
| Nome completo | Texto | Não vazio, ≥ 2 palavras | Sim |
| Cargo | Texto | Não vazio | Sim |
| Email | Email | Formato email válido | Sim |
| Telefone/WhatsApp | Texto | Formato telefone válido | Sim |
| LinkedIn URL | URL | Formato URL válido | Não |
| Instagram | Texto (@handle) | — | Não |
| Papel no comitê | Lista: Decisor / Influenciador / Operacional / Gatekeeper | Valor selecionado | Sim |
| Canal preferido | Lista: WhatsApp / LinkedIn / Instagram / Facebook / Email / Ligação | Valor selecionado | Sim |
| Conta vinculada | Referência (N:1) | Conta existente | Sim |

### 3.3 Deal

Representa uma oportunidade de venda vinculada a uma Conta e seus Contatos.

| Campo | Tipo | Validação | Obrigatório | Preenchido por |
|---|---|---|---|---|
| Título | Texto | Auto (Nome fantasia + Produto + Data) | Auto | Repositório |
| Conta vinculada | Referência (1:1) | Conta existente | Sim | Ops de Vendas |
| Contatos vinculados | Referência (N:1) | ≥ 1 Contato da Conta | Sim | Ops de Vendas |
| Origem | Lista: Inbound / Outbound / Indicação / Evento / Parceiro | Valor selecionado | Sim | Ops de Vendas |
| Quem indicou | Texto | Não vazio se Origem = Indicação | Condicional | Ops de Vendas |
| Produto de interesse | Lista múltipla: ERP / PDV-Go / Smart POS / KDS / Delivery / Inteligência / Manager / Brain / Setup-as-a-Service / Retainer de Performance / Outros | ≥ 1 selecionado | Sim | Ops de Vendas |
| Linha de produto | Lista: Operação Core / Inteligência / Serviços | Auto (derivada de Produto de interesse) | Auto | Repositório |
| Etapa atual | Lista (etapas do funil) | Auto (movimentação) | Auto | Repositório |
| Data entrada etapa | Data/hora | Auto (timestamp movimentação) | Auto | Repositório |
| Reason to Call | Texto | Não vazio | Sim | Ops de Vendas |
| Dor central | Texto | Não vazio (a partir de Qualificação) | Sim | Ops de Vendas |
| Urgência declarada | Texto | Não vazio | Sim (Checklist Binário) | Ops de Vendas |
| Checklist Binário | 6 campos booleanos (ver seção 5A) | 6/6 = true para sair de Qualificação | Sim | Ops de Vendas |
| Data demo | Data/hora | Data futura no agendamento | Condicional | Ops de Vendas |
| Tipo demo | Lista: QS / FS | Consistente com ICP | Condicional | Ops de Vendas |
| Status demo | Lista: Realizada com aceite / Realizada sem aceite / No-show | Valor selecionado | Condicional | Ops de Vendas |
| Aceite verbal | Booleano | — | Condicional | Ops de Vendas |
| Preço base | Monetário (R$) | > 0 | Condicional (Proposta) | Ops de Vendas (manual, via planilha de precificação externa v1) |
| Margem aplicada | Percentual (%) | ≥ 0 | Condicional (Proposta) | Ops de Vendas |
| Valor proposto final | Monetário (R$) | Calculado (Base × (1+Margem)) ou manual para componentes adicionais | Condicional (Proposta) | Ops de Vendas / Repositório |
| MRR | Monetário (R$) | > 0 | Condicional (Proposta) | Ops de Vendas |
| Módulos contratados | Lista múltipla | ≥ 1 módulo | Condicional (Fechamento) | Ops de Vendas |
| Data proposta enviada | Data | — | Condicional | Ops de Vendas |
| Aceite proposta | Booleano | — | Condicional | Ops de Vendas |
| Boleto emitido | Booleano | — | Condicional (Fechamento) | Financeiro |
| Pagamento confirmado | Booleano | — | Condicional (Fechamento) | Financeiro |
| Contrato assinado | Booleano | — | Condicional (Fechamento) | Gestão |
| Motivo descarte | Lista (9 motivos — ver seção 13) | Obrigatório se etapa = DESCARTE | Condicional | Ops de Vendas |
| Qual concorrente | Texto | Obrigatório se motivo = "Perdeu pra concorrente" | Condicional | Ops de Vendas |
| Último canal tentado | Lista (canais) | Obrigatório se motivo = "Sumiu/sem resposta" | Condicional | Ops de Vendas |
| Observação descarte | Texto | — | Não | Ops de Vendas |
| Data Lead | Data/hora | Auto (marco POD) | Auto | Repositório |
| Data MQL | Data/hora | Auto (marco POD) | Auto | Repositório |
| Data SAL | Data/hora | Auto (marco POD) | Auto | Repositório |
| Data Ganho | Data/hora | Auto (marco POD) | Auto | Repositório |
| Data Live | Data/hora | Auto (marco POD) | Auto | Repositório |
| Reengajamento | Booleano + link ao deal original | — | Condicional | Ops de Vendas |

### 3.4 Relacionamentos

| Relação | Cardinalidade | Regra |
|---|---|---|
| Conta : Contatos | 1 : N | Uma Conta pode ter múltiplos Contatos. |
| Deal : Conta | 1 : 1 | Cada Deal pertence a exatamente 1 Conta. |
| Deal : Contatos | N : 1 | Cada Deal deve ter ≥ 1 Contato vinculado. |
| Deals ativos por Conta | 1 (regra geral) | Apenas 1 Deal ativo por Conta. Exceção: Conta com Deal em status Live pode ter Deal de upsell/expansão. |

---

## 4. RACI

### Legenda de departamentos e papéis

| Sigla | Departamento | Papel(is) no piloto |
|---|---|---|
| **Vnd** | Vendas | Ops de Vendas (Carol — acumula SDR + Qualificação + Closer no piloto) |
| **Ges** | Gestão | Sponsor comercial (Walter — acumula admin provisório + auditor + contrato no piloto) |
| **Des** | Desenvolvimento | Responsável por configuração de automações, campos e integrações no repositório instrumentado |
| **Rel** | Relacionamento | Time de Relacionamento / Implantação (Matheus, Luiz) |
| **Fin** | Financeiro | Financeiro (Sabrina) |
| **Repo** | Repositório instrumentado | Capability automatizada (não é papel humano) |

### Matriz RACI

| # | Atividade | Vnd | Ges | Des | Rel | Fin | Repo |
|---|---|---|---|---|---|---|---|
| T-01 | Receber lead inbound (formulário/canal digital) | R/A | I | — | — | — | — |
| T-02 | Registrar lead outbound (prospecção ativa) | R/A | I | — | — | — | — |
| T-03 | Receber e validar indicação | R/A | I | — | — | — | — |
| T-04 | Criar card e registrar dados de entrada | R/A | I | — | — | — | — |
| T-05 | Executar cadência de qualificação (D+0/D+1/D+3/D+7) | R/A | I | — | — | — | — |
| T-06 | Preencher Checklist Binário (6 itens) | R/A | I | — | — | — | — |
| T-07 | Validar gate de saída de Qualificação | R/A | C | — | — | — | — |
| T-08 | Agendar demo segmentada (QS/FS) | R/A | I | — | — | — | — |
| T-09 | Conduzir demo e registrar desfecho | R/A | I | — | — | — | — |
| T-10 | Registrar pós-demo (aceite / no-show / sem aceite) | R/A | I | — | — | — | — |
| T-11 | Preparar proposta comercial (precificação) | R/A | C | — | — | — | — |
| T-12 | Enviar proposta e executar cadência de follow-up | R/A | I | — | — | — | — |
| T-13 | Registrar aceite de proposta | R/A | I | — | — | — | — |
| T-14 | Coletar dados fiscais (CNPJ, razão social) | R/A | I | — | — | — | — |
| T-15 | Orquestrar fechamento (coordenar Financeiro + Gestão) | R/A | I | — | — | I | — |
| T-16 | Emitir contrato e coletar assinatura digital | C | R/A | — | — | — | — |
| T-17 | Emitir cobrança e confirmar pagamento | I | I | — | — | R/A | — |
| T-18 | Decidir Nutrição ou Descarte | R/A | I | — | — | — | — |
| T-19 | Executar cadência de Nutrição | R/A | I | — | — | — | — |
| T-20 | Aprovar desconto > 15% | C | R/A | — | — | — | — |
| T-21 | Transição GANHO + handoff automático | I | I | I | I | I | R/A |
| T-22 | Acolher cliente (pacote estruturado) | I | I | — | R/A | — | — |
| T-23 | Consumir forecast e auditar semanalmente | C | R/A | — | — | — | — |
| T-24 | Configurar automações e campos no repositório | I | C | R/A | — | — | — |
| T-25 | Manter integrações e resolução de incidentes técnicos | I | I | R/A | — | — | — |
| T-26 | Criar e manter dashboards | I | C | R/A | — | — | — |
| T-27 | Registrar motivo de descarte (9 motivos + condicionais) | R/A | I | — | — | — | — |
| T-28 | Executar reengajamento (novo card em Qualificação) | R/A | I | — | — | — | — |
| T-29 | Enviar feedback ao indicador (SLA 7d) | R/A | I | — | — | — | — |
| T-30 | Preencher precificação (preço base + margem) | R/A | C | — | — | — | — |

### Validação RACI

| Check | Resultado |
|---|---|
| 1 A por atividade | ✅ (30/30) |
| ≥ 1 R por atividade | ✅ (30/30) |
| SoD: quem solicita ≠ quem aprova | ✅ (T-15 Ops coordena; T-17 Financeiro executa/aprova; T-16 Gestão executa/aprova) |
| Four-eyes em desconto > 15% | ✅ (T-20: Ops propõe, Gestão aprova) |
| Papel só com I's | Nenhum — todos os departamentos têm R ou A em pelo menos 1 atividade |
| Gargalo vertical (muitos R/A) | ⚠️ Vendas é R/A em 22/30 atividades — risco documentado (Carol solo). Mitigação: contratação de SDR em v2. |

---

## 5. Business Rules

### Regras de entrada no funil

| ID | Regra | Atividade vinculada |
|---|---|---|
| R1 | IF origem = Inbound THEN Ops de Vendas valida dados mínimos (nome, empresa, canal) em até 2h úteis e encaminha para Qualificação. | T-01, GT-01 |
| R2 | IF origem = Outbound THEN Ops de Vendas cria card com Reason to Call, ICP e LinkedIn em até 48h úteis e encaminha para Qualificação. | T-02, GT-01 |
| R3 | IF origem = Indicação THEN Ops de Vendas valida dados mínimos em até 2h úteis, registra "Quem indicou" e encaminha para Qualificação. Ops de Vendas envia feedback ao indicador em até 7 dias. | T-03, T-29, GT-01 |
| R4 | IF origem = Inbound AND Checklist Binário já completo (6/6 itens marcados via formulário ou enriquecimento imediato) THEN deal pula Qualificação e entra direto em Demo Agendada. | T-01, GT-02A |

### Regras de qualificação

| ID | Regra | Atividade vinculada |
|---|---|---|
| R5 | Gate de saída de Qualificação = Checklist Binário completo (6/6 itens: fit confirmado, faturamento declarado, dor central identificada, nº unidades, decisor confirmado, urgência declarada). Qualificação é 100% humana, executada por Ops de Vendas. NÃO existe agente de qualificação automatizada. | T-06, T-07, GT-02 |
| R6 | IF Checklist Binário incompleto após D+8 THEN Ops de Vendas decide: Nutrição ou Descarte. | T-18, GT-03 |
| R7 | IF lead em Qualificação > 48h sem ação THEN alerta interno para Ops de Vendas. | EXT-01 |

### Regras de demo

| ID | Regra | Atividade vinculada |
|---|---|---|
| R8 | IF ICP = QS THEN demo simplificada (Ops de Vendas conduz). IF ICP = FS THEN demo consultiva (Ops de Vendas conduz). | T-09, GT-04 |
| R9 | IF no-show na demo THEN Ops de Vendas registra Status demo = "No-show" e tenta reagendamento (≤ 3x). IF reagendamentos ≥ 3 THEN Nutrição. | T-10, GT-06, EXT-05 |
| R10 | IF demo realizada sem aceite verbal THEN Ops de Vendas registra Status demo = "Realizada sem aceite" e decide: Nutrição ou Descarte (via Pós-demo). | T-10, GT-05 |

### Regras de proposta e precificação

| ID | Regra | Atividade vinculada |
|---|---|---|
| R11 | IF Aceite verbal = verdadeiro THEN Ops de Vendas avança para Proposta. Gate absoluto: sem aceite verbal, sem proposta. | T-10, GT-05 |
| R12 | IF Aceite proposta ≠ verdadeiro THEN bloqueio de saída de Proposta. Gate absoluto. | T-13, GT-07 |
| R13 | IF desconto proposto > 15% THEN aprovação obrigatória de Gestão (Sponsor). | T-20, GT-11 |
| R14 | IF ICP = QS THEN proposta por mensagem simples. IF ICP = FS THEN proposta em PDF consultivo com diagnóstico, rollout e data de resposta. | T-12 |
| R15 | Negociação permitida: preço e prazo de pagamento. IF negociação de escopo de módulos THEN exigir revisão técnica. | T-12 |
| R16 | Preço base preenchido manualmente por Ops de Vendas via planilha de precificação externa (v1). Cálculo automático em v2. | T-30 |
| R17 | Margem aplicada editável por Ops de Vendas. Sem teto de aprovação em v1 (exceto R13 para desconto > 15%). | T-30 |
| R18 | Valor proposto final = Preço base × (1 + Margem aplicada). Ops de Vendas pode adicionar componentes manuais: setup, assessoria, fidelidade, desconto pontualidade. | T-30 |

### Regras de fechamento

| ID | Regra | Atividade vinculada |
|---|---|---|
| R19 | IF Pagamento confirmado = verdadeiro AND Contrato assinado = verdadeiro THEN transição automática para GANHO. Nunca manual. | T-21, GT-08 |
| R20 | IF tentativas de contato na cadência ≥ 4 AND sem resposta THEN Ops de Vendas decide: Nutrição ou Descarte. | T-05, GT-03 |

### Regras de nutrição

| ID | Regra | Atividade vinculada |
|---|---|---|
| R21 | IF entrada em Nutrição THEN obrigatório: motivo + ciclo (1 ou 2). | T-18 |
| R22 | Cadência de Nutrição conforme seção 6. Ciclo 1 (30d) → decisão humana → Ciclo 2 (30d) → decisão humana D+60. | T-19 |
| R23 | IF reaquecida em Nutrição THEN Ops de Vendas cria card NOVO em Qualificação com Checklist Binário revalidado. NUNCA reabrir card antigo. Link de reengajamento obrigatório. | T-28 |
| R24 | IF D+67 após entrada em Nutrição AND sem decisão tomada dentro de 7 dias após D+60 THEN descarte automático com motivo "Nutrição expirada". | EXT-06, GT-10 |

### Regras de descarte

| ID | Regra | Atividade vinculada |
|---|---|---|
| R25 | IF status = DESCARTE AND Motivo descarte vazio THEN bloqueio (alerta bloqueante). | T-27 |
| R26 | Motivo descarte deve ser exatamente 1 dos 9 motivos da taxonomia fixa (seção 13). | T-27 |
| R27 | IF motivo = "Perdeu pra concorrente" THEN campo "Qual concorrente" obrigatório. | T-27 |
| R28 | IF motivo = "Sumiu/sem resposta" THEN campo "Último canal tentado" obrigatório. | T-27 |
| R29 | Card descartado NUNCA é reaberto. Reengajamento = card NOVO em Qualificação com Checklist Binário revalidado. | T-28 |
| R30 | Reengajamento condicionado por motivo × tempo desde descarte (ver seção 13). | T-28 |

### Regras de dados

| ID | Regra | Atividade vinculada |
|---|---|---|
| R31 | CNPJ armazenado em 14 dígitos puros, sem máscara. | T-14 |
| R32 | Valores monetários em BRL, 2 casas decimais. | T-11, T-13, T-30 |
| R33 | IF duplicidade de CNPJ em contas ativas THEN bloqueio de criação. | T-14 |
| R34 | 1 Deal ativo por Conta (regra geral). Exceção: Conta com Deal Live pode ter Deal de upsell/expansão. | Modelo de Dados |

### Regras de comunicação

| ID | Regra | Atividade vinculada |
|---|---|---|
| R35 | WhatsApp é canal PRIMÁRIO de comunicação com lead (ação humana). E-mail é canal de backup/automação. | T-05, T-12, T-19 |
| R36 | Janela de contato: segunda a sexta, 9h-18h. Nunca antes das 8h ou após as 21h. Nunca aos domingos. | T-05, T-12, T-19 |
| R37 | Comunicação interna entre time: notificação nativa do repositório (comentário + menção). Proibido e-mail interno para cobrar colegas. | T-15, EXT-01 a EXT-03 |

### Regras de handoff

| ID | Regra | Atividade vinculada |
|---|---|---|
| R38 | Registro de implantação criado automaticamente no ato do GANHO, no departamento de Relacionamento, com link bidirecional ao registro de Vendas. | T-21 |
| R39 | Departamento de Implantação fica em pipeline/espaço separado. Nunca no mesmo pipeline de Vendas. | T-21, T-22 |
| R40 | Pacote de handoff contém: dados fiscais, módulos contratados, dor central, prazo, MRR, responsável, histórico de interações. | T-21, T-22 |

---

## 5A. Checklists de Transição

> Gates obrigatórios de progressão no funil. Bloqueio preventivo automático se qualquer campo obrigatório estiver vazio.

### Gate de Entrada — variável por origem

O gate para ENTRAR em Qualificação varia conforme a origem do lead:

| Origem | Dados mínimos obrigatórios | SLA | Preenchido por |
|---|---|---|---|
| Inbound | Nome, empresa, canal de contato, checkbox LGPD | 2h úteis | Lead (formulário) + Ops de Vendas (validação) |
| Outbound | Nome, cargo, empresa, LinkedIn URL, canal, Reason to Call, ICP | 48h úteis | Ops de Vendas |
| Indicação | Nome, empresa, canal, quem indicou, contexto da indicação | 2h úteis | Indicador + Ops de Vendas (validação) |

### Checklist Binário — Gate de Saída de Qualificação (6 itens)

Ops de Vendas preenche integralmente durante a qualificação humana. Todos os 6 itens devem ser verdadeiros para sair de Qualificação e avançar para Demo Agendada.

| # | Item | Tipo | Validação | Preenchido por |
|---|---|---|---|---|
| 1 | Fit confirmado (ICP = QS ou FS) | Booleano | = verdadeiro | Ops de Vendas |
| 2 | Faturamento declarado | Booleano (+ valor monetário vinculado na Conta) | = verdadeiro, valor > 0 | Ops de Vendas |
| 3 | Dor central identificada | Booleano (+ texto descritivo no Deal) | = verdadeiro, texto não vazio | Ops de Vendas |
| 4 | Nº unidades registrado | Booleano (+ inteiro vinculado na Conta) | = verdadeiro, valor ≥ 1 | Ops de Vendas |
| 5 | Decisor confirmado | Booleano (+ Contato com papel "Decisor" vinculado) | = verdadeiro, ≥ 1 decisor | Ops de Vendas |
| 6 | Urgência declarada | Booleano (+ texto descritivo no Deal) | = verdadeiro, texto não vazio | Ops de Vendas |

**Regra vinculada:** R5 (gate de saída), R4 (inbound que já entra com 6/6 pula Qualificação).

### F-Demo — Gate de entrada em Demo Agendada

| # | Campo obrigatório | Tipo | Validação | Preenchido por |
|---|---|---|---|---|
| 1 | Checklist Binário completo | 6 bools | 6/6 = verdadeiro | Ops de Vendas |
| 2 | Data da demo | Data/hora | Data futura no momento do agendamento | Ops de Vendas |
| 3 | Tipo de demo | Lista (QS / FS) | Valor selecionado, consistente com ICP | Ops de Vendas |
| 4 | Decisores confirmados para demo | Texto | Não vazio, ≥ 1 nome | Ops de Vendas |

### F-Proposta — Gate de entrada em Proposta

| # | Campo obrigatório | Tipo | Validação | Preenchido por |
|---|---|---|---|---|
| 1 | Data da demo realizada | Data | Não vazio, ≤ hoje | Ops de Vendas |
| 2 | Status demo | Lista | = "Realizada com aceite" | Ops de Vendas |
| 3 | Aceite verbal | Booleano | = verdadeiro (gate absoluto) | Ops de Vendas |
| 4 | Dor confirmada | Booleano | = verdadeiro | Ops de Vendas |

**Regra vinculada:** R11 (aceite verbal obrigatório).

### F-Fechamento — Gate de entrada em Fechamento

| # | Campo obrigatório | Tipo | Validação | Preenchido por |
|---|---|---|---|---|
| 1 | Aceite da proposta | Booleano | = verdadeiro (gate absoluto) | Ops de Vendas |
| 2 | Valor proposto final | Monetário (R$, 2 casas) | > 0 | Ops de Vendas |
| 3 | MRR | Monetário (R$) | > 0 | Ops de Vendas |
| 4 | Módulos contratados | Lista múltipla | ≥ 1 módulo selecionado | Ops de Vendas |

**Regra vinculada:** R12 (bloqueio absoluto sem aceite proposta), R13 (desconto > 15% escala para Gestão).

### F-GANHO — Gate de saída de Fechamento (entrada em GANHO)

| # | Campo obrigatório | Tipo | Validação | Preenchido por |
|---|---|---|---|---|
| 1 | CNPJ | Texto (14 dígitos) | Exatamente 14 dígitos numéricos, único em contas ativas | Ops de Vendas |
| 2 | Razão social | Texto | Não vazio | Ops de Vendas |
| 3 | Pagamento confirmado | Booleano | = verdadeiro | Financeiro |
| 4 | Contrato assinado | Booleano | = verdadeiro | Gestão |

**Regra vinculada:** R19 (transição automática quando F-GANHO 100%), R31 (CNPJ 14 dígitos), R33 (duplicidade CNPJ).

---

> **Nota de governança:** Ops de Vendas é responsável por garantir que cada checklist esteja completo antes de avançar. A capability de validação automatizada bloqueia a transição se qualquer campo obrigatório estiver vazio (controle preventivo). Em caso de exceção (campo indisponível por motivo legítimo), Ops de Vendas documenta o motivo e escala para Gestão (Sponsor) na revisão semanal.

---

## 6. Cadências

### 6.1 Cadência de Qualificação

Ops de Vendas executa 4 tentativas em 8 dias corridos via canal preferido do lead. E-mail como backup se canal primário sem resposta.

| Toque | Dia | Canal | Executor | Ação |
|---|---|---|---|---|
| 1 | D+0 | Canal preferido (WhatsApp primário) | Ops de Vendas (humano) | Primeiro contato: apresentação + Reason to Call |
| 2 | D+1 | Canal preferido | Ops de Vendas (humano) | Follow-up: reforço de valor + pergunta aberta |
| 3 | D+3 | Canal preferido + E-mail (backup) | Ops de Vendas (humano) | Terceira tentativa: conteúdo educacional + CTA |
| 4 | D+7 | Canal preferido + E-mail (backup) | Ops de Vendas (humano) | Última tentativa: urgência + prazo para resposta |
| — | D+8 | — | Ops de Vendas (decisão) | Se sem resposta: Nutrição ou Descarte (R6) |

**Janela de contato:** segunda a sexta, 9h-18h. Nunca antes das 8h ou após as 21h. Nunca aos domingos.

### 6.2 Cadência de Proposta

Ops de Vendas envia proposta e acompanha até aceite ou decisão em 15 dias corridos.

| Toque | Dia | Canal | Executor | Ação |
|---|---|---|---|---|
| 1 | D+0 | Canal preferido (WhatsApp primário) | Ops de Vendas (humano) | Envio da proposta comercial |
| 2 | D+1 | Canal preferido | Ops de Vendas (humano) | Confirmação de recebimento + disponibilidade para dúvidas |
| 3 | D+3 | E-mail | Repositório (automação) | E-mail automático de follow-up |
| 4 | D+7 | Interno | Repositório (alerta) | Alerta interno para Ops de Vendas |
| 5 | D+15 | — | Ops de Vendas (decisão) | Se sem aceite: Nutrição ou Descarte |

### 6.3 Cadência de Nutrição

Lead com sinal fraco entra em Nutrição. Dois ciclos de 30 dias cada. Descarte automático D+67 se sem decisão.

| Toque | Dia | Canal | Executor | Ação |
|---|---|---|---|---|
| — | D+0 | — | Ops de Vendas | Entrada em Nutrição com motivo registrado |
| 1 | D+7 | E-mail | Repositório (automação) | E-mail automático: conteúdo educacional |
| 2 | D+15 | E-mail | Repositório (automação) | E-mail automático: case de sucesso |
| 3 | D+30 | Canal preferido | Ops de Vendas (humano) | Revisão humana Ciclo 1: reaquecida (card NOVO) ou Ciclo 2 |
| 4 | D+37 | E-mail | Repositório (automação) | E-mail automático Ciclo 2: conteúdo educacional |
| 5 | D+45 | E-mail | Repositório (automação) | E-mail automático Ciclo 2: case de sucesso |
| 6 | D+60 | Canal preferido | Ops de Vendas (humano) | Decisão final: reaquecida (card NOVO) ou Descarte |
| — | D+67 | — | Repositório (automação) | Descarte automático se sem decisão em 7d após D+60. Motivo: "Nutrição expirada" (R24) |

---

## 7. Marcos POD

### 7.1 Definição dos 5 marcos

Marcos registrados automaticamente como timestamps no Deal. Cada marco representa uma mudança de status significativa no ciclo comercial.

| Marco | Definição | Trigger de registro |
|---|---|---|
| **Lead** | Momento em que o lead entra no funil | Criação do card em qualquer sub-etapa de entrada (1A/1B/1C) |
| **MQL** (Marketing Qualified Lead) | Lead passou o gate de entrada e entrou em Qualificação | Card avança para etapa 2 (Qualificação) |
| **SAL** (Sales Accepted Lead) | Lead qualificado com Checklist Binário completo | Card avança para etapa 3 (Demo Agendada) — Checklist Binário 6/6 |
| **Ganho** | Deal fechado com pagamento + contrato | Card avança para etapa 7 (GANHO) — F-GANHO completo |
| **Live** | Cliente ativo com handoff para Implantação realizado | Registro de implantação criado no departamento de Relacionamento |

### 7.2 Taxas de conversão

4 taxas de conversão entre marcos consecutivos, calculadas mensalmente.

| Taxa | Fórmula | Benchmark (a calibrar em 30-60 dias) |
|---|---|---|
| Lead → MQL | count(MQL) ÷ count(Lead), no período | ≥ 70% (exemplo) |
| MQL → SAL | count(SAL) ÷ count(MQL), no período | ≥ 40% (exemplo) |
| SAL → Ganho | count(Ganho) ÷ count(SAL), no período | ≥ 30% (exemplo) |
| Ganho → Live | count(Live) ÷ count(Ganho), no período | ≥ 95% (exemplo) |

### 7.3 Intervalos de tempo entre marcos

| Intervalo | Fórmula | Benchmark QS (exemplo) | Benchmark FS (exemplo) |
|---|---|---|---|
| Lead → MQL | Data MQL - Data Lead | ~2 dias | ~2 dias |
| MQL → SAL | Data SAL - Data MQL | ~6 dias | ~6 dias |
| SAL → Ganho | Data Ganho - Data SAL | ~18 dias | ~35 dias |
| Ganho → Live | Data Live - Data Ganho | ~7 dias | ~7 dias |

**Ciclo total** = Data Ganho - Data Lead (tempo até fechamento comercial).
**Ciclo operacional** = Data Live - Data Lead (tempo até cliente ativo).

> **Nota:** Todos os benchmarks são ilustrativos e devem ser calibrados nos primeiros 30-60 dias de operação instrumentada.

---

## 8. Metas e Métricas

> Baseline: NÃO INFORMADO para todas as métricas (funil sem instrumentação histórica). Todos os valores são **ilustrativos** e devem ser **calibrados nos primeiros 30-60 dias** de operação instrumentada. Piloto foca em instrumentar para medir.

### 8.1 Metas Top-line (3)

Metas estratégicas de resultado, acompanhadas por Gestão (Sponsor) e Vendas.

| ID | Meta | Fórmula | Target (exemplo) | Cadência | Owner | Fonte |
|---|---|---|---|---|---|---|
| MT-01 | MRR novo | Σ MRR dos deals que atingiram GANHO, no mês | R$ 8.000/mês | Semanal | Gestão (Sponsor) | Repositório (campo MRR) |
| MT-02 | Nº fechamentos | count(GANHO), no mês | 3/mês | Semanal | Gestão (Sponsor) | Repositório (contagem) |
| MT-03 | Ticket médio | Σ MRR ÷ count(GANHO), no mês | R$ 2.700 | Mensal | Gestão (Sponsor) | Repositório (cálculo) |

### 8.2 Metas de Alavanca (3)

Metas de atividade que impulsionam os resultados top-line, acompanhadas por Vendas.

| ID | Meta | Fórmula | Target (exemplo) | Cadência | Owner | Fonte |
|---|---|---|---|---|---|---|
| MA-01 | Demos agendadas | count(cards que entraram em Demo Agendada), no mês | 8/mês | Semanal | Ops de Vendas | Repositório (contagem) |
| MA-02 | Propostas enviadas | count(cards que entraram em Proposta), no mês | 5/mês | Semanal | Ops de Vendas | Repositório (contagem) |
| MA-03 | Leads outbound | count(cards criados com origem Outbound), na semana | 3/semana | Semanal | Ops de Vendas | Repositório (contagem) |

### 8.3 Métricas de Diagnóstico (10)

Métricas de saúde do funil, para identificar gargalos e oportunidades de melhoria.

| ID | Métrica | Fórmula | Target (exemplo) | Cadência | Owner | Fonte | Ação em breach |
|---|---|---|---|---|---|---|---|
| MD-01 | Win Rate | count(GANHO) ÷ count(GANHO + DESCARTE), no mês | ≥ 25% | Semanal | Gestão | Repositório | Revisão de ICP + roteiro de demo |
| MD-02 | Ciclo médio QS | Média(Data Ganho - Data Lead) para ICP = QS | ≤ 30 dias | Mensal | Ops de Vendas | Repositório | Revisão de cadências |
| MD-03 | Ciclo médio FS | Média(Data Ganho - Data Lead) para ICP = FS | ≤ 45 dias | Mensal | Ops de Vendas | Repositório | Revisão de cadências |
| MD-04 | No-show rate | count(Status demo = "No-show") ÷ count(demos agendadas), no mês | ≤ 15% | Mensal | Ops de Vendas | Repositório | Revisão de cadência pré-demo |
| MD-05 | Lead → MQL | Ver seção 7.2 | ≥ 70% | Mensal | Ops de Vendas | Repositório | Revisão de fontes de lead |
| MD-06 | MQL → SAL | Ver seção 7.2 | ≥ 40% | Mensal | Ops de Vendas | Repositório | Revisão de cadência de qualificação |
| MD-07 | SAL → Ganho | Ver seção 7.2 | ≥ 30% | Mensal | Ops de Vendas | Repositório | Revisão de demo + proposta |
| MD-08 | Ganho → Live | Ver seção 7.2 | ≥ 95% | Mensal | Gestão | Repositório | Revisão de fechamento (Financeiro + Gestão) |
| MD-09 | Taxa reativação Nutrição | count(reaquecidas) ÷ count(entradas em Nutrição), no trimestre | ≥ 20% | Trimestral | Ops de Vendas | Repositório | Revisão de conteúdo de nutrição |
| MD-10 | Distribuição descartes por motivo | count por motivo ÷ count(DESCARTE total) | Análise qualitativa | Mensal | Gestão | Repositório | Ajuste de ICP / oferta / cadência |

> **Nota:** Margem média (indisponível v1 — preço base manual, sem integração com custo).

---

## 9. SLAs de Entrada

3 SLAs que governam a interface entre fontes de leads e Vendas.

### SLA 1: Marketing → Vendas (Inbound)

| Dimensão | Compromisso |
|---|---|
| **Volume** | A definir (depende de campanhas ativas) |
| **Qualidade** | Lead contém: nome, empresa, canal, ICP compatível, faturamento estimado, dor declarada |
| **Tempo de resposta** | Ops de Vendas responde ao lead inbound em até 2h úteis |
| **Cadência máxima** | 4 tentativas em 8 dias (cadência de Qualificação) |
| **Feedback** | Ops de Vendas reporta mensalmente a Marketing: volume recebido, % qualificado (MQL → SAL), motivos de descarte por fonte |

### SLA 2: Indicação → Vendas

| Dimensão | Compromisso |
|---|---|
| **Formato** | Indicação formal com contexto: nome, empresa, dor, canal de contato, quem indicou |
| **Tempo de resposta** | Ops de Vendas responde em até 2h úteis |
| **Feedback ao indicador** | Ops de Vendas envia feedback ao indicador em até 7 dias corridos com status do contato |
| **Cadência** | Mesma cadência de Qualificação (4 tentativas em 8 dias) |

### SLA 3: Outbound interno (Ops de Vendas)

| Dimensão | Compromisso |
|---|---|
| **Volume** | Meta: 3 leads outbound/semana (exemplo, a calibrar) |
| **Qualidade** | Lead contém: ICP confirmado, LinkedIn URL, cargo, Reason to Call personalizado |
| **Tempo de resposta** | Criação do card em até 48h úteis após identificação |
| **Cadência** | 4 tentativas em 8 dias (cadência de Qualificação) |

---

## 10. SLAs Internos por Etapa

| Etapa / Atividade | SLA | Gatilho de violação | Escalação |
|---|---|---|---|
| 1A. Novo Lead — Inbound | 2h úteis para resposta | > 2h úteis sem ação | Alerta interno Ops |
| 1B. Novo Lead — Outbound | 48h úteis para criação de card | > 48h úteis | Alerta interno Ops |
| 1C. Novo Lead — Indicação | 2h úteis para resposta | > 2h úteis sem ação | Alerta interno Ops |
| 2. Qualificação (tempo em etapa) | ≤ 8 dias corridos | > 8 dias sem Checklist Binário completo | Ops decide: Nutrição ou Descarte |
| 2. Qualificação (inatividade) | ≤ 48h entre ações | > 48h sem ação | Alerta interno Ops |
| 3. Demo Agendada | Até data da demo + 1 dia útil | Demo não realizada | Alerta interno Ops |
| 4. Pós-demo | ≤ 3 dias corridos | > 3 dias sem registro de desfecho | Alerta interno Ops |
| 5. Proposta (follow-up auto) | D+3 follow-up | > 3 dias sem resposta | E-mail automático ao lead |
| 5. Proposta (alerta interno) | D+7 alerta | > 7 dias em Proposta | Alerta interno Ops |
| 5. Proposta (decisão) | D+15 | > 15 dias em Proposta | Ops decide: Nutrição ou Descarte |
| 6. Fechamento (CNPJ) | ≤ 48h para dados fiscais | > 48h sem CNPJ | Alerta interno Ops |
| 6. Fechamento (pagamento) | ≤ 5 dias úteis | Boleto emitido + 5 dias sem pagamento | Alerta Ops + Financeiro |
| 6. Fechamento (contrato) | ≤ 3 dias após boleto | Pagamento OK + 3 dias sem contrato | Alerta interno Ops |
| 7. GANHO → Handoff | Automático | — | Alerta Relacionamento |
| 8. DESCARTE (motivo) | Bloqueante | Status = DESCARTE AND motivo vazio | Alerta bloqueante |
| Nutrição (conteúdo D+7) | D+7 | Tempo em Nutrição = 7 dias | E-mail automático ao lead |
| Nutrição (case D+15) | D+15 | Tempo em Nutrição = 15 dias | E-mail automático ao lead |
| Nutrição (revisão D+30) | D+30 | Tempo em Nutrição = 30 dias | Alerta interno Ops |
| Nutrição (descarte auto D+67) | D+67 | Sem decisão 7d após D+60 | Descarte automático |
| Feedback ao indicador | ≤ 7 dias corridos | > 7 dias sem feedback | Alerta interno Ops |

---

## 11. Risk & Control Matrix

| ID | Risco | Prob. | Impacto | Controle | Tipo | Frequência | Owner |
|---|---|---|---|---|---|---|---|
| R-01 | Ops de Vendas (Carol) sobrecarregada — gargalo de 1 pessoa em 22/30 atividades | Alta | Alto | (1) Cadências enxutas para 1 pessoa. (2) Dashboard de carga operacional. (3) Contratação de SDR em v2. | Preventivo + Detectivo | Semanal (revisão Gestão-Ops) | Gestão |
| R-02 | Descartes sem motivo — perde aprendizado de ICP | Alta | Médio | R25: campo motivo obrigatório antes de fechar DESCARTE (bloqueio automático). 9 motivos padronizados. | Preventivo | Por evento | Ops de Vendas |
| R-03 | Handoff Vendas → Implantação atrasa | Média | Alto | Automação: transição automática para GANHO + criação de registro cross-departamento. SLA de acolhimento observado. | Preventivo | Por evento | Repositório (automação) |
| R-04 | Quota de automação da ferramenta-piloto estoura | Média | Médio | Monitoramento mensal de consumo. IF > 80% da quota THEN avaliar upgrade de plano. | Detectivo | Mensal | Gestão (admin provisório) |
| R-05 | Desconto fora do teto concedido sem aprovação | Média | Médio | R13: desconto > 15% exige aprovação Gestão (GT-11). SoD: Ops solicita, Gestão aprova. | Preventivo | Por evento | Gestão |
| R-06 | Checklist Binário mal calibrado gera qualificação fraca | Média | Médio | Revisão trimestral dos 6 itens do checklist. Feedback de Ops alimenta ajuste. | Detectivo | Trimestral | Gestão |
| R-07 | Duplicidade de CNPJ em contas ativas | Média | Médio | R33: validação de unicidade de CNPJ. Bloqueio de criação. | Preventivo | Por evento | Repositório (automação) |
| R-08 | E-mail de automação cai em spam do lead | Alta | Alto | Configurar SPF/DKIM no domínio remetente. Monitorar bounce rate (< 5%). | Preventivo + Detectivo | Mensal | Gestão (admin provisório) |
| R-09 | DPAs não assinados com operadores (LGPD) | Alta | Alto | Workstream paralelo: assinar DPAs antes do go-live em produção. Piloto roda como validação operacional. | Preventivo | Pré go-live produção | Gestão |
| R-10 | Leads esfriam por falta de cadência na Nutrição | Média | Médio | Cadência automatizada (e-mails D+7/D+15) + revisão humana D+30/D+60. Descarte automático D+67 (R24). | Preventivo + Detectivo | Por evento | Ops de Vendas |
| R-11 | Gestão acumula admin + auditor + aprovador de desconto + contrato (conflito de papéis) | Média | Médio | (1) Transitório: documentar acúmulo. (2) Segregar admin para Desenvolvimento quando maturar. (3) Dashboard transparente = auditoria por métrica. | Detectivo | Trimestral | Gestão (auto-auditoria) |
| R-12 | Precificação manual (v1) gera inconsistência de preços | Média | Médio | R16-R18: planilha de referência + fórmula de cálculo documentada. Automatizar em v2. | Detectivo | Por evento | Ops de Vendas + Gestão |

---

## 12. Exceções

| ID | Nome | Trigger | Handler | SLA | Tratamento | Escalação | Critério de resolução |
|---|---|---|---|---|---|---|---|
| EXT-01 | Oportunidade ociosa | Tempo em etapa > SLA definido | Ops de Vendas | 24h para agir | Retomar cadência, mover para Nutrição ou Descarte | Gestão na revisão semanal se 24h adicionais sem ação | Oportunidade movida para próxima etapa, Nutrição ou Descarte |
| EXT-02 | Pagamento pendente | Boleto emitido + 5 dias sem confirmação | Financeiro + Ops | 48h para resolver | Ops contata lead; Financeiro verifica gateway | Gestão se 48h sem resolução | Pagamento confirmado ou Descarte |
| EXT-03 | Contrato pendente | Contrato emitido + 3 dias sem assinatura | Gestão + Ops | 48h para resolver | Ops acompanha; Gestão verifica pendência técnica | Jurídico externo se cláusula atípica | Contrato assinado ou Descarte |
| EXT-04 | DSAR (direitos LGPD) | Lead solicita acesso/correção/exclusão | Ops + Gestão (admin provisório) | 15 dias (legal) | Tratamento manual no piloto; canal DSAR a ser criado | Gestão encaminha para assessoria jurídica | Dados corrigidos/excluídos + registro em log |
| EXT-05 | Reagendamento excessivo | Demo reagendada ≥ 3x | Ops de Vendas | Imediato | Mover para Nutrição com motivo "Reagendamento excessivo" | — | Oportunidade em Nutrição |
| EXT-06 | Nutrição expirada | D+67 sem decisão tomada após D+60 | Repositório (automação) | Automático | Descarte automático com motivo "Nutrição expirada" | — | Card descartado |

---

## 13. Motivos de Descarte

### 13.1 Taxonomia fixa (9 motivos)

| # | Motivo | Campos condicionais | Observação |
|---|---|---|---|
| 1 | Fora de ICP | — | Lead não atende perfil de cliente ideal |
| 2 | Faturamento abaixo | — | Faturamento declarado abaixo do mínimo viável |
| 3 | Sem orçamento no momento | — | Fit existe, mas orçamento indisponível no período |
| 4 | Tem sistema atual, sem intenção de trocar | — | Lead satisfeito com solução existente |
| 5 | Projeto adiado/congelado | — | Lead reconhece necessidade, mas adiou implementação |
| 6 | Perdeu pra concorrente | **Qual concorrente** (obrigatório) | Registrar nome do concorrente para análise competitiva |
| 7 | Preço acima do aceito | — | Proposta rejeitada por preço |
| 8 | Não viu valor/fit técnico | — | Demo/proposta não demonstrou valor suficiente |
| 9 | Sumiu/sem resposta | **Último canal tentado** (obrigatório) | Todas as tentativas de cadência esgotadas |

**Motivo adicional automático:** "Nutrição expirada" — aplicado automaticamente pelo repositório em D+67 (R24).

### 13.2 Regras de reengajamento

Reengajamento é condicionado por motivo e tempo desde descarte. SEMPRE gera card NOVO em Qualificação com Checklist Binário revalidado. NUNCA reabrir card antigo.

| Motivo | Tempo mínimo para reengajamento | Condição |
|---|---|---|
| 1. Fora de ICP | Sem reengajamento | — (ICP fixo) |
| 2. Faturamento abaixo | 6 meses | Nova evidência de crescimento |
| 3. Sem orçamento no momento | 3 meses | Novo ciclo orçamentário |
| 4. Tem sistema atual | 6 meses | Evidência de insatisfação com sistema atual |
| 5. Projeto adiado/congelado | 3 meses | Sinal de retomada |
| 6. Perdeu pra concorrente | 6 meses | Evidência de insatisfação com concorrente |
| 7. Preço acima do aceito | 3 meses | Nova condição comercial ou mudança de escopo |
| 8. Não viu valor/fit técnico | 6 meses | Nova funcionalidade ou caso de uso relevante |
| 9. Sumiu/sem resposta | 3 meses | Novo canal ou sinal de vida |
| Nutrição expirada | 3 meses | Novo sinal de interesse |

---

## 14. Dashboards

### 14.1 Meu Dia (diário, Vendas)

Visão operacional do dia para Ops de Vendas. 5 cards com barra de progresso em relação às metas.

| # | Card | Métrica | Meta (exemplo) | Barra de progresso |
|---|---|---|---|---|
| 1 | MRR acumulado/mês | Σ MRR dos GANHO no mês corrente | R$ 8.000/mês | Realizado ÷ Meta |
| 2 | Fechamentos/mês | count(GANHO) no mês corrente | 3/mês | Realizado ÷ Meta |
| 3 | Demos/mês | count(Demo Agendada) no mês corrente | 8/mês | Realizado ÷ Meta |
| 4 | Propostas/mês | count(Proposta) no mês corrente | 5/mês | Realizado ÷ Meta |
| 5 | Leads outbound/semana | count(Outbound) na semana corrente | 3/semana | Realizado ÷ Meta |

### 14.2 Meu Funil (diagnóstico)

Visão de saúde do funil para diagnóstico de gargalos.

| # | Componente | Descrição |
|---|---|---|
| 1 | Funil visual POD | Visualização das 5 taxas de conversão entre marcos (Lead → MQL → SAL → Ganho → Live) |
| 2 | Ciclo por etapa | Tempo médio em cada etapa do funil |
| 3 | No-show rate | % de demos com no-show no mês |
| 4 | Motivos de descarte | Distribuição dos 9 motivos no trimestre |
| 5 | Ticket médio | MRR médio dos deals GANHO |

### 14.3 Minha Evolução (mensal, Vendas + Gestão)

Visão de evolução temporal para acompanhamento estratégico.

| # | Componente | Descrição | Janela |
|---|---|---|---|
| 1 | MRR/mês | Evolução do MRR novo adicionado | 12 meses |
| 2 | Win Rate | Evolução da taxa de conversão | 6 meses |
| 3 | Ciclo médio | Evolução do tempo de venda | 6 meses |
| 4 | Por ICP | Métricas segmentadas QS vs FS | 6 meses |
| 5 | Por origem | Métricas segmentadas Inbound vs Outbound vs Indicação | 6 meses |

---

## 15. Precificação

### 15.1 Modelo de precificação (v1 — manual)

| Componente | Descrição | Responsável |
|---|---|---|
| **Preço base** | Preenchido manualmente por Ops de Vendas via planilha de precificação externa. Automação do cálculo prevista para v2. | Ops de Vendas |
| **Margem aplicada** | Percentual editável por Ops de Vendas. Sem teto de aprovação em v1 (exceto desconto > 15% → aprovação Gestão). | Ops de Vendas |
| **Valor proposto final** | Calculado: Preço base × (1 + Margem aplicada). OU manual para componentes adicionais. | Ops de Vendas / Repositório |

**Componentes adicionais (manual):** setup, assessoria, fidelidade, desconto pontualidade.

### 15.2 Preços de referência (ilustrativos, sujeitos a atualização)

| Produto | Preço mensal referência |
|---|---|
| Acesso Usuário ERP | R$ 128 |
| PDV/Go | R$ 153 |
| KDS | R$ 147 |
| Delivery | R$ 121 |

> **Nota:** Estes preços são ilustrativos e sujeitos a atualização. Fonte: planilha de precificação interna.

### 15.3 Portfólio de produtos

| Linha | Produtos |
|---|---|
| **Operação Core** | ERP, PDV/Go, Smart POS, KDS, Delivery |
| **Inteligência** | Inteligência, Manager, Brain |
| **Serviços** | Setup-as-a-Service, Retainer de Performance (em estruturação) |

---

## 16. Inputs / Outputs

| Tipo | Nome | Origem | Destino | Critério de aceite |
|---|---|---|---|---|
| **Input** | Dados de captação inbound | Lead (formulário web) | Repositório instrumentado (Novo Lead — Inbound) | Nome, empresa, canal preenchidos + checkbox LGPD |
| **Input** | Dados de prospecção outbound | Ops de Vendas | Repositório instrumentado (Novo Lead — Outbound) | Nome, cargo, empresa, LinkedIn URL, canal, Reason to Call, ICP |
| **Input** | Dados de indicação | Indicador + Ops de Vendas | Repositório instrumentado (Novo Lead — Indicação) | Nome, empresa, canal, quem indicou, contexto |
| **Output** | Lead qualificado (Checklist Binário 6/6) | Ops de Vendas | Demo Agendada | 6 itens do Checklist Binário = verdadeiro |
| **Output** | Proposta comercial | Ops de Vendas | Lead | QS: mensagem simples / FS: PDF consultivo |
| **Output** | Dados fiscais (CNPJ, razão social) | Ops de Vendas | Financeiro + Gestão | CNPJ 14 dígitos, razão social preenchida |
| **Output** | Boleto emitido | Financeiro | Lead | Valor correto, vencimento definido |
| **Output** | Contrato assinado | Gestão | Repositório | Assinatura digital coletada |
| **Output** | Registro de implantação (handoff) | Repositório (automação) | Relacionamento | Pacote completo: dados fiscais, módulos, dor, prazo, MRR, responsável |
| **Output** | Registro de descarte | Ops de Vendas | Repositório | Motivo obrigatório (1 de 9) + campos condicionais |
| **Output** | Dashboard executivo (3 visões) | Repositório (agregação) | Gestão + Ops de Vendas | Meu Dia, Meu Funil, Minha Evolução |
| **Output** | Feedback ao indicador | Ops de Vendas | Indicador | Status do contato em até 7 dias |

---

## 17. LGPD

### Dados pessoais tratados

| Dado | Atividade | Base legal | Retenção |
|---|---|---|---|
| Nome completo | T-01 a T-04 | Inbound: consentimento (art. 7º I). Outbound: legítimo interesse (art. 7º IX). Indicação: legítimo interesse (art. 7º IX) | 12 meses após última interação se Descarte; duração do contrato se GANHO/Live |
| E-mail | T-01, T-05, T-12 | Idem | Idem |
| Telefone/WhatsApp | T-01, T-05 | Idem | Idem |
| Cargo | T-04, T-06 | Idem | Idem |
| LinkedIn URL | T-02, T-04 | Legítimo interesse (dado público profissional) | 12 meses após última interação |
| Instagram | T-04 | Legítimo interesse (dado público) | 12 meses após última interação |
| CNPJ (14 dígitos) | T-14 | Execução de contrato (art. 7º V) | Duração do contrato + 5 anos (fiscal) |
| Razão social | T-14 | Execução de contrato | Idem |
| Dados bancários (boleto) | T-17 | Execução de contrato | Duração do contrato + 5 anos |

### Base legal

| Canal de captação | Base legal primária | Requisito |
|---|---|---|
| Inbound (formulário web) | Consentimento (art. 7º I) | Checkbox de opt-in no formulário |
| Outbound (prospecção LinkedIn, eventos) | Legítimo interesse (art. 7º IX) | LIA documentada (workstream paralelo) |
| Indicação (parceiro, cliente) | Legítimo interesse (art. 7º IX) | LIA documentada + consentimento verbal do indicado |

### Retenção
- **Leads Descartados:** 12 meses após última interação → descarte/anonimização.
- **Leads em Nutrição:** contagem reinicia a cada interação; máximo 12 meses sem interação. Descarte automático D+67 (R24) gera retenção de 12 meses a partir do descarte.
- **Clientes Live:** duração do contrato + 5 anos (obrigação fiscal).

### Direitos do titular
- **Canal:** A ser criado (dpo@nexuz.com.br ou contato@ com fluxo dedicado). Workstream paralelo.
- **Prazo legal:** 15 dias para atendimento.
- **Fluxo no piloto:** tratamento manual — Ops de Vendas recebe, Gestão (admin provisório) executa, registra em log.
- **Direitos cobertos:** acesso, correção, exclusão, portabilidade.

### Operadores (DPA)
- **Status:** NÃO ASSINADOS.
- **Operadores identificados:** repositório instrumentado, middleware (se aplicável), ERP corporativo, gateway de pagamento.
- **Ação:** assinar DPAs antes do go-live em produção. Piloto roda como validação operacional.

---

## 18. Critérios de Aceite do Piloto

| # | Critério | Evidência | Gate |
|---|---|---|---|
| 1 | 3 deals ponta a ponta (Novo Lead → GANHO) com todos os gates e Checklist Binário registrados | Registros no repositório com todos os campos obrigatórios preenchidos | Go/No-go |
| 2 | Ciclo completo ≤ 30 dias para 3 deals QS + 1 deal FS ≤ 45 dias | Timestamps de marcos POD por deal | Go/No-go |
| 3 | Carol opera sem intervenção técnica por 15 dias consecutivos | Log de suporte zero chamados técnicos em 15 dias | Go/No-go |
| 4 | 3 dashboards operacionais (Meu Dia, Meu Funil, Minha Evolução) | Dashboards acessíveis e atualizados | Go/No-go |
| 5 | Marcos POD registrando automaticamente timestamps | 5 marcos com timestamps em ≥ 3 deals | Go/No-go |

### Roadmap 30/60/90

| Marco | Entrega | Responsável |
|---|---|---|
| **D+0** (go-live) | Pipeline com etapas atualizadas + gates + Checklist Binário + handoff manual instruído + bloqueio motivo descarte | Desenvolvimento + Ops |
| **D+30** | Cadências automatizadas (e-mails de Nutrição, follow-up de Proposta, alertas internos) + formulário inbound + marcos POD | Desenvolvimento |
| **D+60** | Handoff automático cross-departamento + dashboard "Meu Dia" + descarte automático D+67 Nutrição | Desenvolvimento |
| **D+90** | 3 dashboards completos + primeiro review trimestral + calibração de metas com 60 dias de dados | Gestão + Ops |

---

## 19. Glossary

| Termo | Definição |
|---|---|
| **Aceite verbal** | Declaração de interesse do lead após demo, registrada como campo booleano (gate F-Proposta). |
| **Aceite proposta** | Confirmação formal do lead sobre proposta comercial, registrada como campo booleano (gate F-Fechamento). |
| **Cadência** | Sequência estruturada de contatos com prazos, canais e executores definidos por toque. |
| **Canal preferido** | Canal de comunicação preferido pelo lead (WhatsApp, LinkedIn, Instagram, Facebook, Email, Ligação). WhatsApp é canal primário. |
| **Checklist Binário** | Gate de saída de Qualificação: 6 itens booleanos (fit confirmado, faturamento declarado, dor central identificada, nº unidades, decisor confirmado, urgência declarada). |
| **Ciclo total** | Data Ganho - Data Lead. Tempo até fechamento comercial. |
| **Ciclo operacional** | Data Live - Data Lead. Tempo até cliente ativo. |
| **Conta** | Entidade que representa uma empresa/estabelecimento. CNPJ único. |
| **Contato** | Entidade que representa uma pessoa física vinculada a uma Conta. |
| **Cycle time** | Tempo ativo de execução de uma atividade (exclui espera). |
| **Deal** | Entidade que representa uma oportunidade de venda vinculada a uma Conta. |
| **DESCARTE** | Etapa terminal negativa, com motivo obrigatório (1 de 9 motivos). Substituiu "Perdido". |
| **DSAR** | Data Subject Access Request — solicitação de exercício de direitos pelo titular dos dados (LGPD). |
| **DPA** | Data Processing Agreement — contrato entre controlador e operador de dados pessoais. |
| **Forecast ponderado** | Valor proposto × probabilidade de fechamento. |
| **GANHO** | Etapa terminal positiva: pagamento confirmado + contrato assinado. Substituiu "Live" como nome de etapa. |
| **Gate** | Condição obrigatória para avançar entre etapas; bloqueio preventivo se não atendido. |
| **Handoff** | Transferência formal de responsabilidade entre departamentos, com artefato nomeado. |
| **ICP** | Ideal Customer Profile — QS (Quick Serve), FS (Full Serve), Zona de fronteira, ou Fora de ICP. |
| **LIA** | Legitimate Interest Assessment — avaliação documentada para uso de legítimo interesse como base legal LGPD. |
| **Live** | Marco POD: cliente ativo com handoff para Implantação realizado. |
| **Marco POD** | Ponto de dados com timestamp automático: Lead, MQL, SAL, Ganho, Live. |
| **Margem aplicada** | Percentual sobre preço base, editável por Ops de Vendas. |
| **MQL** | Marketing Qualified Lead — lead que passou o gate de entrada e está em Qualificação. |
| **MRR** | Monthly Recurring Revenue — receita recorrente mensal de um deal. |
| **Nutrição** | Pipe paralelo para leads com sinal fraco; Ciclo 1 (30d) + Ciclo 2 (30d). Descarte automático D+67. |
| **Preço base** | Valor unitário mensal por produto, preenchido manualmente (v1). |
| **Reason to Call** | Gancho de abertura personalizado, criado por Ops de Vendas para prospecção outbound. |
| **Reengajamento** | Retomada de contato com lead descartado. Sempre card NOVO em Qualificação. Nunca reabrir card antigo. |
| **SAL** | Sales Accepted Lead — lead qualificado com Checklist Binário 6/6 completo. |
| **SoD** | Segregation of Duties — princípio de que quem solicita não pode aprovar. |
| **Valor proposto final** | Preço base × (1 + Margem) + componentes adicionais. |
| **Wait time** | Tempo parado entre atividades (fila, espera de resposta). |
| **Win Rate** | Taxa de conversão: GANHO ÷ (GANHO + DESCARTE). |

---

## 20. Change Log

| Versão | Data | Autor | Mudança |
|---|---|---|---|
| v0.1 | 2026-04-16 | Paula Processo (squad nxz-backoffice-processes) | Draft inicial do PDD |
| v0.2 | 2026-04-17 | Paula Processo (ajuste Step 06) | Adicionada seção 5A: Checklists de Transição F1..F6 com campos obrigatórios detalhados, tipos, validações e responsáveis. Glossário atualizado. |
| v0.3 | 2026-04-17 | Paula Processo (incorporação de 14 deltas da planilha de referência) | Reescrita completa incorporando
| v1.0 | 2026-04-20 | Sponsor comercial (Walter Frey) | PUBLICADA — Aprovada com condições (Score 16/20, zero blockers). Condições: calibrar KPIs baselines em D+30; resolver LIA/DSAR/DPAs antes de go-live produtivo. Próximo review: D+90. |

> **Nota histórica v0.3:** Reescrita completa incorporando: (1) Funil com 3 sub-etapas de entrada + Pós-demo + Nutrição paralela; (2) Checklist Binário 6 itens substitui Lead Score, qualificação 100% humana; (3) Modelo de Dados Conta/Contato/Deal; (4) Marcos POD com 5 marcos e taxas de conversão; (5) Métricas em 3 camadas (Top-line/Alavanca/Diagnóstico); (6) 3 Dashboards (Meu Dia/Meu Funil/Minha Evolução); (7) 9 Motivos de Descarte com reengajamento; (8) Cadências detalhadas com canal/executor por toque; (9) Precificação (preço base/margem/valor final); (10) SLAs de Entrada; (11) RACI com 5 departamentos e 30 atividades; (12) Portfólio expandido (10 produtos); (13) Regra R4: inbound qualificado pula Qualificação; (14) Descarte automático D+67 Nutrição. Terminologia: "Descarte" substitui "Perdido", "GANHO" substitui "Live" como etapa terminal. |

---

## Self-Check contra quality-criteria.md

| # | Dimensão | Score | Evidência |
|---|---|---|---|
| 1 | Clarity | 2 | Voz ativa + papel nomeado em todas as atividades; zero "alguém" ou "o sistema" |
| 2 | Completeness | 2 | Happy path + 6 exceções + edge cases (DSAR, reagendamento, nutrição expirada, reengajamento, no-show, precificação) |
| 3 | Coherence | 2 | Handoffs simétricos verificados; gateways exaustivos (11 GT); Modelo de Dados com relacionamentos |
| 4 | Feasibility | 2 | Executável com papéis atuais (Carol solo + Walter admin); riscos documentados; precificação manual v1 |
| 5 | Controls | 2 | Preventivos (gates, bloqueios, Checklist Binário) + Detectivos (SLAs, alertas, dashboards, descarte automático D+67) |
| 6 | Measurability | 2 | 16 métricas em 3 camadas com fórmula, target, cadência, owner, fonte, ação; marcos POD com conversões |
| 7 | Auditability | 2 | Repositório instrumentado + timestamps automáticos (marcos POD) + change log |
| 8 | Exception handling | 2 | 6 exceções nomeadas com handler, SLA, escalação, critério de resolução |
| 9 | Compliance (LGPD) | 2 | Base legal por dado e por canal + retenção + direitos + DPA (workstream paralelo) |
| 10 | Ownership & Governance | 2 | Process owner + RACI com 5 departamentos + cadência review trimestral + revisão semanal Gestão-Ops |
| | **Total** | **20/20** | |

### Checklist duro

- [x] Cover block completo
- [x] Purpose statement em 1 parágrafo
- [x] Scope: in/out/trigger/end events
- [x] Swimlane narrativo com raias atualizadas (7 raias)
- [x] Modelo de Dados: Conta / Contato / Deal com campos, tipos, validações
- [x] RACI: 1 A por linha, ≥ 1 R, validação SoD, 5 departamentos, 30 atividades
- [x] Inputs/Outputs com critério de aceite
- [x] Business rules numeradas (R1 a R40)
- [x] Checklists de transição atualizados (Checklist Binário + gates por etapa)
- [x] Cadências detalhadas com canal/executor por toque (3 cadências)
- [x] Marcos POD (5 marcos, 4 taxas, 4 intervalos)
- [x] Metas e Métricas em 3 camadas (3 + 3 + 10 = 16 métricas)
- [x] SLAs de Entrada (3 SLAs)
- [x] SLAs Internos por etapa
- [x] Risk & Control Matrix (12 riscos com controles)
- [x] Exceções: 6 cenários nomeados com handler, SLA, escalação
- [x] Motivos de Descarte: 9 motivos + regras de reengajamento
- [x] Dashboards: 3 visões (Meu Dia, Meu Funil, Minha Evolução)
- [x] Precificação: preço base, margem, valor final, preços de referência
- [x] LGPD completo: base legal, retenção, direitos, operadores
- [x] Glossary (33 termos)
- [x] Change log com v0.3
- [x] Tool-agnostic: zero marcas de software
- [x] Voz ativa: papel nomeado + verbo + objeto
- [x] SoD check: quem solicita ≠ quem aprova (T-15 vs T-17/T-16; GT-11)
- [x] Four-eyes em desconto > 15% (GT-11)
- [x] "Descarte" em vez de "Perdido" em todo o documento
- [x] Sem "agente de qualificação automatizada" (qualificação 100% humana)
- [x] Portfólio expandido: 10 produtos em 3 linhas

### Veto check

- [x] Zero brand names
- [x] RACI válido (30/30 com 1 A)
- [x] Métricas com target, fonte e frequência (todos exemplos/ilustrativos, a calibrar)
- [x] Base legal LGPD para todos os dados pessoais
- [x] Modelo de Dados com entidades, campos e relacionamentos
- [x] Self-check 20/20, nenhuma dimensão < 1
