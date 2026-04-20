# Briefing Gaps Resolved — 2026-04-16

Referência: briefing-analysis.md (v2, run 2026-04-16-165948)
Respondido em batches temáticos via AskUserQuestion (6 rodadas)

---

## Gaps Respondidos

### 1. BASELINES NUMÉRICOS

#### Gap C-01 — Volume mensal de oportunidades
- **Criticidade:** Critical
- **Pergunta:** Qual o volume mensal atual de oportunidades em cada etapa do funil?
- **Resposta do usuário:** 30-80 leads/mês entrando em Qualificado. Volume por etapa intermediária: NÃO INFORMADO (sem instrumentação).
- **Impacto no desenho:** Define capacidade do funil; com 30-80 leads e Carol solo (sem SDR), a capacidade operacional é o gargalo principal. Cadências precisam ser realistas para 1 pessoa. Quota de 300 automation jobs/mês da ferramenta-piloto pode ser suficiente nesse volume.

#### Gap C-02 — Ciclo médio Qualificado → Live/Perdido
- **Criticidade:** Critical
- **Pergunta:** Hoje, quanto tempo (em dias) cada oportunidade leva em média entre Qualificado e Live (ou Perdido)?
- **Resposta do usuário:** Imprevisível — FS > 60 dias, QS variável. Sem baseline medido.
- **Impacto no desenho:** KR3 (ciclo ≤ 21 dias) é aspiracional sem referência. Piloto precisa entregar MENSURAÇÃO primeiro; meta de ciclo é calibrável após 60 dias de dados. SLAs por etapa devem ser observados (não cobrados) na v1.

#### Gap C-03 — Win Rate percebido
- **Criticidade:** Critical
- **Pergunta:** Hoje, qual a taxa percebida de oportunidades que avançam de cada etapa para a próxima?
- **Resposta do usuário:** NÃO INFORMADO. Sem número mesmo estimado.
- **Impacto no desenho:** KR2 (Win Rate ≥ 25%) nasce sem baseline. Piloto foca em registrar todas as saídas (Live + Perdido) para gerar o primeiro número real. Forecast ponderado é aspiracional até existir win rate medido.

#### Gap C-04 — Volume de Perdidos e motivo frequente
- **Criticidade:** High
- **Pergunta:** Quantas oportunidades por mês são marcadas como Perdidas hoje, e qual o motivo informal mais frequente?
- **Resposta do usuário:** Motivo percebido: **sem fit / ICP errado**. Volume de perdas: NÃO INFORMADO.
- **Impacto no desenho:** Confirma a hipótese de qualificação de topo deficiente. Piloto precisa garantir que Motivo de Perda é obrigatório (regra R15) e que Lead Score + ICP são preenchidos na F1, para que o ciclo de aprendizado ICP funcione.

#### Gap C-05 — Baseline dos 5 KRs OKR Q2/2026
- **Criticidade:** Critical
- **Pergunta:** Qual o baseline atual (medido ou estimado) das 5 métricas dos OKRs?
- **Resposta do usuário:** Consolidando: MRR/mês = NÃO INFORMADO; Win Rate = NÃO INFORMADO; Ciclo médio = Imprevisível (FS >60d); % Perdidos com motivo = NÃO INFORMADO (sem registro formal); demos/mês = NÃO INFORMADO.
- **Impacto no desenho:** Todos os 5 KRs nascem sem baseline. Objetivo primário do piloto = **instrumentar para medir**, não para melhorar. Melhoria é Q3/Q4.

---

### 2. GOVERNANÇA E PAPÉIS

#### Gap C-06 — Carol acumula process owner + executora
- **Criticidade:** Critical
- **Pergunta:** A Dona da operação de Vendas pode ser simultaneamente process owner E executora? Quem audita?
- **Resposta do usuário:** **Walter (Sponsor) audita por revisão semanal do pipe.** Cadência 1h/semana Walter ↔ Carol.
- **Impacto no desenho:** RACI reflete: Carol = R+A operacional; Walter = A estratégico + auditor semanal. PDD precisa incluir cadência de "weekly pipe review" como cerimônia obrigatória.

#### Gap C-07 — Admin da ferramenta-CRM
- **Criticidade:** Critical
- **Pergunta:** Quem é o responsável formal por TI/Admin da ferramenta?
- **Resposta do usuário:** **Walter (sponsor) é admin provisório do piloto.** Sem time de TI dedicado.
- **Impacto no desenho:** Risco de conflito sponsor ↔ admin. RACI marca Walter como Admin (provisório) com nota: escalar para TI quando maturar. PDD não assume SLA de configuração — Walter opera ad-hoc.

#### Gap H-01 — SDRs
- **Criticidade:** High
- **Pergunta:** Quantos SDRs existem hoje, com qual alocação?
- **Resposta do usuário:** **Zero SDR — Carol prospecta e qualifica sozinha.**
- **Impacto no desenho:** Carol = SDR + Qualificadora + Ops de Vendas. Capacidade de Primeiro Contato é severamente limitada. Cadência D+0/D+2/D+5/D+8 precisa ser realista para 1 pessoa gerenciando 30-80 leads/mês. RACI: papel SDR fica abstrato até contratação.

#### Gap H-02 — Jurídico/Administrativo do contrato
- **Criticidade:** High
- **Pergunta:** Quem é o responsável formal?
- **Resposta do usuário:** **Administrativo interno Nexuz (não-Jurídico).** Usa template aprovado; Jurídico externo só em exceções.
- **Impacto no desenho:** RACI: Admin interno = R para contrato; Jurídico externo = C (só exceções). Gate F6 (Contrato assinado) depende de SLA do Admin interno. PDD inclui alerta se contrato não assinado em 3 dias.

---

### 3. PREMISSAS E CONSTRAINTS

#### Gap C-08 — OKRs duros vs aspiracionais
- **Criticidade:** Critical
- **Pergunta:** Os OKRs Q2/2026 são metas duras ou aspiracionais?
- **Resposta do usuário:** **Aspiracionais (referência interna para calibrar).** Não são compromisso público.
- **Impacto no desenho:** PDD trata os 5 KRs como "referência de leitura, não de cobrança". Piloto foca em instrumentação; meta formal só após baseline medido (post-60 dias).

#### Gap C-09 — WhatsApp constraint duro?
- **Criticidade:** Critical
- **Pergunta:** "Comunicação externa apenas por e-mail, nunca WhatsApp na v1" é constraint duro?
- **Resposta do usuário:** **E-mail default, WhatsApp só após aceite verbal do lead (a partir de F3).** Decisão operacional revisável.
- **Impacto no desenho:** **Modifica regra R21 do processo-fonte.** Cadência oficial permanece e-mail; WhatsApp entra como canal secundário a partir de Agendamento (F3) com opt-in registrado em campo dedicado. PDD cria campo "Canal autorizado" e gate condicional.

#### Gap C-10 — CNPJ formato
- **Criticidade:** Critical
- **Pergunta:** CNPJ em 14 dígitos puros sem máscara é constraint não-negociável?
- **Resposta do usuário:** **Revisão técnica necessária.** Depende do ERP aceitar 14 dígitos via API; fica como assumption técnica a validar na integração.
- **Impacto no desenho:** PDD mantém premissa R17 (14 dígitos puros) como **assumption** com nota: "a validar na integração com ERP corporativo". Se ERP exigir formato diferente, transform on read/write.

#### Gap C-11 — Critério de sucesso do piloto
- **Criticidade:** Critical
- **Pergunta:** Qual o critério objetivo de sucesso do PILOTO?
- **Resposta do usuário:** **Tríplice:** (1) 3 deals ponta a ponta (Qual→Live) com todos os gates F1–F6 registrados + (2) Ciclo completo em ≤ 30 dias para 3 deals QS + 1 deal FS + (3) Carol opera sem intervenção técnica por 15 dias.
- **Impacto no desenho:** Define acceptance criteria claros para o piloto. PDD inclui seção "Critérios de Aceite do Piloto" com esses 3 itens como gates de go/no-go.

---

### 4. LGPD

#### Gap C-12 — Base legal art. 7º
- **Criticidade:** Critical
- **Pergunta:** Qual a base legal LGPD para tratamento de dados pessoais de leads?
- **Resposta do usuário:** **Híbrido: legítimo interesse (art. 7º IX) para outbound + consentimento (art. 7º I) para inbound.** Modelo padrão SaaS B2B.
- **Impacto no desenho:** PDD documenta ambas as bases; formulário inbound precisa checkbox opt-in; outbound precisa LIA documentada (workstream paralelo).

#### Gap C-13 — Política de retenção de Perdidos
- **Criticidade:** Critical
- **Pergunta:** Política de retenção de dados de leads não-convertidos?
- **Resposta do usuário:** **12 meses após última interação, depois descarte.**
- **Impacto no desenho:** PDD inclui regra R-LGPD: card Perdido recebe campo "Data última interação" + automação de purge/anonimização em D+365.

#### Gap H-03 — Direitos do titular
- **Criticidade:** High
- **Pergunta:** Como a Nexuz responde à solicitação de direitos do titular?
- **Resposta do usuário:** **Nunca receberam solicitação.** Sem canal formal nem fluxo.
- **Impacto no desenho:** PDD recomenda criar canal (dpo@nexuz.com.br ou contato@) + RACI de DSAR (Data Subject Access Request) como workstream paralelo. Não bloqueia piloto, mas bloqueia escala.

#### Gap H-04 — Operadores terceiros (DPAs)
- **Criticidade:** High
- **Pergunta:** Contratos de operador firmados com terceiros que tocam dados de leads?
- **Resposta do usuário:** **NÃO DEFINIDO ainda.** Nenhum DPA assinado.
- **Impacto no desenho:** PDD inclui workstream "Assinatura de DPA com operadores" como pré-requisito de produção. Piloto pode rodar em ambiente de teste, mas go-live real exige DPAs. Lista de operadores: CRM-piloto, middleware, ERP, gateway pagamento, agente IA.

---

### 5. HANDOFF E ROADMAP

#### Gap C-14 — Handoff atual
- **Criticidade:** Critical
- **Pergunta:** Como acontece hoje a transferência de uma oportunidade fechada para Relacionamento?
- **Resposta do usuário:** **NÃO EXISTE handoff formal.** Carol avisa quando lembra.
- **Impacto no desenho:** Valida 100% a dor do briefing. Automação A11 (Move→Live + Cria card Implantação) é o ganho mais tangível do piloto. PDD prioriza cross-pipe handoff como capability #1.

#### Gap H-05 — SLA de acolhimento do handoff
- **Criticidade:** High
- **Pergunta:** Métrica de sucesso do handoff Vendas → Relacionamento?
- **Resposta do usuário:** **NÃO DEFINIDO — piloto mede primeiro, SLA depois.**
- **Impacto no desenho:** PDD registra lead time de acolhimento como métrica observada (não cobrada) no piloto. Meta formal definida após 60 dias de dados.

#### Gap H-06 — Deadline go-live
- **Criticidade:** High
- **Pergunta:** Existe deadline duro de go-live do piloto?
- **Resposta do usuário:** **Imediato (≤ 2 semanas) — urgente.** Sem evento externo, mas pressão do sponsor.
- **Impacto no desenho:** **CONSTRAINT PRINCIPAL DO PIPELINE.** PDD precisa ser enxuto e acionável. Configuração precisa caber em 2 semanas. Integração middleware, DSAR, DPAs ficam como workstreams v2.

#### Gap H-07 — Outcomes 30/60/90
- **Criticidade:** High
- **Pergunta:** Outcomes que o Sponsor quer ver a 30/60/90 dias?
- **Resposta do usuário:** **30d:** pipeline visual + 3 deals rodando | **60d:** cadência funcionando + handoff automático | **90d:** dashboard com MRR + Win Rate.
- **Impacto no desenho:** PDD inclui roadmap 30/60/90 como seção de entregas escalonadas. Go-live (D+0) = pipeline + gates básicos. D+30 = cadências. D+60 = automações de handoff. D+90 = dashboard.

---

### 6. OPERACIONAL

#### Gap H-08 — Cadências existentes
- **Criticidade:** High
- **Pergunta:** Quais cadências de contato já existem hoje?
- **Resposta do usuário:** **Follow-up informal (Carol segue instinto: 1-2 contatos).** Sem sequência nem prazo.
- **Impacto no desenho:** Cadência D+0/D+2/D+5/D+8 do processo-fonte é 100% nova. PDD precisa incluir playbook de cadência como deliverable do piloto.

#### Gap H-09 — Riscos Pipefy aceitos como constraint v1
- **Criticidade:** High
- **Pergunta:** Riscos técnicos da ferramenta-piloto (quota 300 jobs/mês, conditional fields via API, integrações nativas) são aceitos?
- **Resposta do usuário:** **Aceitos para v1 (mitigação só se estourar).** Piloto começa com limitações; escala para Enterprise ou middleware se necessário.
- **Impacto no desenho:** PDD registra os 3 riscos técnicos como "constraint aceito pelo sponsor v1" com trigger de revisão: quota > 80% = avaliar upgrade.

#### Gap H-10 — Orçamento do piloto
- **Criticidade:** High
- **Pergunta:** Existe orçamento alocado?
- **Resposta do usuário:** **R$ 500-1.500/mês (cabe plano Business da ferramenta-piloto).** Middleware com free tier ou manual.
- **Impacto no desenho:** Confirma plano Business como target. PDD dimensiona para 5-7 usuários. Middleware (se necessário) começa com free tier.

#### Gap H-11 — Alertas Carol
- **Criticidade:** High
- **Pergunta:** Em quais situações Carol quer alerta ativo vs. dashboard?
- **Resposta do usuário:** **Alertas em todos os SLAs (48h Qualificado, 16d Primeiro contato, etc.).** Máxima visibilidade.
- **Impacto no desenho:** Todas as 11 automações internas do processo-fonte (A01, A02, A05, A07-A10, A12, A15-A16) ficam ativas desde o go-live. Risco de alert fatigue se volume crescer — PDD inclui trigger de revisão se >10 alertas/dia.

---

## Gaps Intencionalmente Não-Respondidos (Medium)

### Gap C-04/M — Tentativas anteriores de instrumentação
- **Criticidade:** Medium
- **Motivo do deferimento:** Prioridade baixa — seguirá com assumption
- **Assumption assumida pelo squad:** Nenhuma tentativa anterior formal de instrumentar o funil; operação cresceu como "artesanato individual" da Vendedora sênior.
- **Revalidar em:** Step 06 — Aprovação do Desenho

### Gap P-05/M — Pré-venda técnica (demo FS)
- **Criticidade:** Medium
- **Motivo do deferimento:** Prioridade baixa — seguirá com assumption
- **Assumption assumida pelo squad:** Demo FS é conduzida por um par técnico (ainda sem pessoa nomeada); capacidade mensal: NÃO INFORMADA. RACI: Pré-venda = R para demo FS.
- **Revalidar em:** Step 06 — Aprovação do Desenho

### Gap A-06/M — Oportunidades em limbo
- **Criticidade:** Medium
- **Motivo do deferimento:** Prioridade baixa — seguirá com assumption
- **Assumption assumida pelo squad:** Existem oportunidades em limbo não-quantificadas; piloto começa com pipeline zerado e migra backlog manualmente nos primeiros 7 dias.
- **Revalidar em:** Step 06 — Aprovação do Desenho

### Gap T-04/M — Nível de instrumentação aceitável para lead externo
- **Criticidade:** Medium
- **Motivo do deferimento:** Prioridade baixa — seguirá com assumption
- **Assumption assumida pelo squad:** Cadência máxima = 4 toques em 15 dias (conforme processo-fonte R7); além disso, move para Nutrição. Alinhado com boas práticas de outbound B2B.
- **Revalidar em:** Step 06 — Aprovação do Desenho

### Gap K-05/M — Restrição cultural a comunicar lacunas entre áreas
- **Criticidade:** Medium
- **Motivo do deferimento:** Prioridade baixa — seguirá com assumption
- **Assumption assumida pelo squad:** Não há restrição cultural; handoff cross-pipeline e alertas ao Financeiro/Implantação são aceitos pelo sponsor. Se resistência surgir na prática, escala para Walter.
- **Revalidar em:** Step 06 — Aprovação do Desenho

### Gap L-05/M — Acesso de não-operadores ao dashboard
- **Criticidade:** Medium
- **Motivo do deferimento:** Prioridade baixa — seguirá com assumption
- **Assumption assumida pelo squad:** Dashboard de MRR/Win Rate é visível ao Sponsor e Dona da operação; Financeiro vê pipe de Fechamento; Implantação vê pipe de Implantação. Acesso restrito por pipe.
- **Revalidar em:** Step 06 — Aprovação do Desenho

---

## Gaps adicionados durante a resolução (novas premissas)

### NEW-01 — WhatsApp liberado a partir de F3 com opt-in
- **Origem:** Resposta do sponsor sobre regra R21
- **Premissa:** Comunicação externa default = e-mail. WhatsApp autorizado a partir do Agendamento (F3) se lead der aceite verbal. Criar campo "Canal autorizado pelo lead" (dropdown: e-mail, WhatsApp, ambos).
- **Impacto:** Modifica regra R21 do processo-fonte. Cadências D+0..D+8 mantêm e-mail; lembrete de demo (A04) pode ir por WhatsApp se canal autorizado.

### NEW-02 — Go-live ≤ 2 semanas como constraint
- **Origem:** Resposta do sponsor sobre deadline
- **Premissa:** Configuração do piloto precisa caber em 2 semanas. Isso implica: (a) PDD enxuto e acionável, (b) integrações middleware/ERP = v2, (c) DPAs = workstream paralelo, (d) cadência de proposta começa manual, automações em D+30.
- **Impacto:** Reshaping do roadmap 30/60/90: D+0 = pipeline + gates + handoff manual instruído | D+30 = automações internas + cadências | D+60 = handoff automático | D+90 = dashboard + forecast.

### NEW-03 — Critério tríplice de sucesso do piloto
- **Origem:** Resposta do sponsor sobre acceptance criteria
- **Premissa:** Piloto é "sucesso" quando: (1) 3 deals passaram ponta a ponta com gates registrados, (2) ciclo ≤ 30 dias para QS + FS, (3) Carol opera sem intervenção técnica por 15 dias.
- **Impacto:** PDD inclui seção "Critérios de Aceite do Piloto" como gate de go/no-go.

---

Registrado em: 2026-04-16T17:15:00-03:00
Responsável pela resolução: Walter Frey (sponsor)
Método: 6 batches temáticos via AskUserQuestion (pipeline Claude Code)
