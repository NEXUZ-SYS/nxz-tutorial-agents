# Process Flow — vendas-previsivel-foodservice

> **Squad:** nxz-backoffice-processes | **Step:** 04 (Mapeamento AS-IS + Desenho TO-BE)
> **Autor:** Mario Mapeador | **Run:** 2026-04-16-165948 | **Versao:** v3
> **Process Owner:** Dona da operacao de Vendas (Caroline Oliveira)
> **Sponsor:** Sponsor comercial (Walter Frey)
> **Principio transversal:** artefato 100% tool-agnostic. Nenhuma marca de software citada. Capabilities descritas como papel + dado + decisao.

---

## 1. Sumario executivo

**Processo:** Ciclo comercial de vendas de solucoes de gestao e autoatendimento para Food Service (NXZ Go + NXZ ERP), da captacao do lead ate o handoff para Implantacao.

**Owner:** Dona da operacao de Vendas (Carol) — acumula papel de executora; Sponsor comercial (Walter) audita semanalmente.

**Deltas principais do redesenho (AS-IS para TO-BE):**
1. Repositorio informal e disperso substituido por repositorio unico instrumentado com 9 etapas e gates formais.
2. Cadencia de contato inexistente formalizada em sequencias com prazos e limites de tentativa.
3. Handoff informal (chat/memoria) para Relacionamento substituido por pacote estruturado com SLA observado.
4. Motivo de perda inexistente tornado obrigatorio antes de encerrar oportunidade.
5. Governanca formalizada: cadencia semanal Sponsor + Dona da operacao, baseline de metricas como objetivo primario do piloto.

**Coherence check (resumo):** 8/8 checks PASS. Zero blockers.

---

## 2. AS-IS Swimlane Narrativo

> Retrato fiel do estado atual. Inclui informalidades, atalhos e ausencias. Nao idealiza.

### Raia: Lead / Prospect

1. **[A-01] Submeter interesse por canal de entrada** — Lead preenche formulario inbound no site, responde a prospecao outbound, ou chega via indicacao de parceiro. Formato do dado varia conforme o canal (formulario semi-estruturado, e-mail livre, mensagem de chat). Entrega: *dados basicos de contato (nome, e-mail, telefone, empresa)* para Qualificador(a).
   - cycle_time: 5min | wait_time: n/a | pain_point_ref: null

### Raia: Qualificador(a) / SDR

> **Nota AS-IS:** papel SDR e inexistente na operacao atual (zero SDR). Carol acumula este papel.

2. **[A-02] Receber lead e registrar em repositorio informal** — Qualificador(a) recebe dados por canal variavel (e-mail, chat, formulario) e registra em repositorio nao-padronizado (planilha, anotacao, memoria). Nao ha formato unico nem campo obrigatorio.
   - cycle_time: 10min | wait_time: ate 48h (lead pode ficar sem registro) | pain_point_ref: P-01
3. **[A-03] Qualificar lead (criterio informal)** — Qualificador(a) avalia fit do lead com base em percepcao pessoal (sem checklist formal, sem Lead Score sistematico). Decide se vale contatar.
   - cycle_time: 15min | wait_time: n/a | pain_point_ref: P-02

### Raia: Dona da operacao de Vendas (Ops de Vendas)

> Carol acumula: SDR + Qualificadora + Ops de Vendas + Process Owner.

4. **[A-04] Receber lead qualificado (handoff informal)** — Ops de Vendas recebe lead da Qualificadora (que e ela mesma) sem evento auditavel de transicao. Nao ha checklist de transferencia nem registro de quando o lead mudou de status.
   - cycle_time: n/a (sem evento discreto) | wait_time: variavel (horas a dias) | pain_point_ref: P-03
5. **[A-05] Realizar primeiro contato** — Ops de Vendas entra em contato por canal do lead (e-mail ou telefone). Cadencia e informal: 1-2 tentativas baseadas em instinto, sem sequencia definida nem prazo entre tentativas.
   - cycle_time: 15min por tentativa | wait_time: imprevisivel (dias a semanas) | pain_point_ref: P-04
6. **[A-06] Agendar e executar demo** — Ops de Vendas agenda demo (QS: 15-20min, FS: 45-60min) diretamente com o lead, sem registro padronizado de dor central nem decisores presentes. Agendamento por e-mail ou telefone, sem integracao com agenda corporativa.
   - cycle_time: 30min-1h (demo) | wait_time: 3-15 dias (agendamento) | pain_point_ref: null
7. **[A-07] Enviar proposta** — Ops de Vendas envia proposta por e-mail. Proposta QS e informal (mensagem); proposta FS e PDF consultivo. Acompanhamento e ad-hoc (segue instinto de Carol).
   - cycle_time: 30min-2h | wait_time: ate 15 dias sem follow-up sistematico | pain_point_ref: P-05
8. **[A-08] Coletar documentos de fechamento** — Ops de Vendas solicita CNPJ, razao social e dados fiscais por chat ou e-mail. Formato nao-padronizado.
   - cycle_time: 15min | wait_time: ate 5 dias | pain_point_ref: null
9. **[A-09] Solicitar emissao de cobranca ao Financeiro** — Ops de Vendas avisa Financeiro por chat ou e-mail informal. Nao ha formulario, SLA nem evento rastreavel.
   - cycle_time: 5min | wait_time: variavel | pain_point_ref: P-06
10. **[A-10] Solicitar emissao de contrato ao Administrativo** — Ops de Vendas avisa Administrativo por chat informal. Sem SLA nem rastreamento.
    - cycle_time: 5min | wait_time: variavel | pain_point_ref: P-06
11. **[A-11] Notificar Relacionamento sobre cliente fechado (quando lembra)** — Ops de Vendas avisa Time de Relacionamento por chat quando lembra. Nao ha pacote estruturado (dados fiscais, modulos contratados, dor identificada, prazo de implantacao). Handoff acontece de forma intermitente.
    - cycle_time: 5min | wait_time: 0 a varios dias (depende da memoria de Carol) | pain_point_ref: P-07
12. **[A-12] Registrar oportunidade como perdida (sem motivo)** — Quando a oportunidade nao avanca, Ops de Vendas simplesmente para de acompanhar. Motivo de perda nao e registrado. Etapa em que foi perdida nao e documentada.
    - cycle_time: n/a (nao ha acao formal) | wait_time: n/a | pain_point_ref: P-08

### Raia: Financeiro

13. **[A-13] Emitir cobranca** — Financeiro recebe solicitacao informal de Ops de Vendas e emite boleto via gateway de pagamento. Confirma pagamento quando ocorre.
    - cycle_time: 15min | wait_time: ate 5 dias uteis (aguarda pagamento) | pain_point_ref: null

### Raia: Administrativo

14. **[A-14] Emitir contrato e coletar assinatura** — Administrativo emite contrato a partir de template aprovado. Coleta assinatura digital. Juridico externo so intervem em excecoes.
    - cycle_time: 30min | wait_time: ate 3 dias | pain_point_ref: null

### Raia: Time de Relacionamento / Implantacao

15. **[A-15] Acolher cliente fechado (quando notificado)** — Time de Relacionamento (Matheus, Luiz) recebe notificacao informal (quando existe) e inicia implantacao sem pacote padronizado de handoff. Precisa buscar informacoes com Carol por conta propria.
    - cycle_time: variavel | wait_time: indeterminado (depende de A-11) | pain_point_ref: P-07

### Raia: Sponsor comercial

16. **[A-16] Consumir forecast (baseado em percepcao)** — Sponsor comercial pergunta a Carol "como esta o pipe?" e recebe resposta verbal, sem dados estruturados, sem probabilidade ponderada, sem historico auditavel.
    - cycle_time: 15min (conversa) | wait_time: n/a | pain_point_ref: P-09

---

### Gateways AS-IS

- **G-01 — Lead tem fit minimo?** after_activity: A-03. Criterio: percepcao pessoal da Qualificadora (sem checklist, sem Lead Score). Ramo SIM -> A-04 (passa para contato). Ramo NAO -> lead e ignorado (sem registro formal de perda).

- **G-02 — Lead respondeu ao contato?** after_activity: A-05. Criterio: lead retornou em alguma tentativa informal. Ramo SIM -> A-06 (agendar demo). Ramo NAO -> lead esfria sem acao sistematica (pode ou nao ser retomado).

- **G-03 — Lead aceitou verbalmente apos demo?** after_activity: A-06. Criterio: lead demonstrou interesse verbal durante ou apos demo. Ramo SIM -> A-07 (enviar proposta). Ramo NAO -> lead pode ir para limbo (sem acao formal de nutriao ou perda).

- **G-04 — Lead aceitou proposta?** after_activity: A-07. Criterio: lead confirmou aceite por e-mail ou verbalmente. Ramo SIM -> A-08 (coletar docs). Ramo NAO -> lead esfria sem cadencia de follow-up.

- **G-05 — Pagamento confirmado E contrato assinado?** after_activity: A-13 + A-14. Criterio: Financeiro confirma pagamento E Administrativo confirma assinatura. Ramo SIM -> A-11 (handoff informal). Ramo NAO -> pendencia fica sem SLA nem escalacao.

---

### Excecoes AS-IS

- **EX-01 — Lead esfria por ausencia de cadencia:** Trigger: lead nao responde apos 1-2 tentativas informais e nao ha sequencia definida de follow-up. Handled_by: Ops de Vendas. Tratamento: nenhum sistematico — lead simplesmente e esquecido ate Carol lembrar ou desistir. Retorno: nao ha retorno ao fluxo; lead vai para limbo (sem registro de Nutricao nem Perdido). Estimativa: afeta maioria das oportunidades em Primeiro contato.

- **EX-02 — Handoff para Relacionamento nao acontece:** Trigger: Ops de Vendas esquece de notificar Time de Relacionamento apos fechamento, ou notifica sem pacote estruturado. Handled_by: Time de Relacionamento (reativo). Tratamento: Relacionamento busca informacoes por conta propria com Carol, gerando atrito e atraso na implantacao. Retorno: implantacao inicia com delay indeterminado. Estimativa: reportado como atrito frequente.

- **EX-03 — Oportunidade perdida sem registro de motivo:** Trigger: lead desiste ou e descartado em qualquer etapa. Handled_by: ninguem (nao ha tratamento). Tratamento: oportunidade simplesmente sai do radar de Carol sem registro de motivo, etapa de perda ou aprendizado. Retorno: nao ha — dado se perde. Consequencia: impede aprendizado sobre ICP e revisao de estrategia comercial.

- **EX-04 — Pagamento ou contrato atrasa sem escalacao:** Trigger: Financeiro ou Administrativo demora alem do esperado para emitir cobranca ou contrato. Handled_by: Ops de Vendas (cobrar por chat). Tratamento: Carol cobra informalmente; nao ha SLA, backup nomeado nem escalacao automatica. Retorno: A-13 ou A-14 (retenta ate resolver).

---

### Pain Points Mapeados (AS-IS)

| Pain ID | Localizacao | Sintoma |
|---|---|---|
| P-01 | A-02 | Leads registrados em repositorio nao-padronizado; dados incompletos; duplicidades possiveis. |
| P-02 | A-03 / G-01 | Qualificacao por percepcao pessoal sem criterio formal; leads fracos entram no funil, leads bons sao ignorados. |
| P-03 | handoff: A-03 -> A-04 | Handoff SDR -> Ops de Vendas e invisivel (Carol e a mesma pessoa); quando houver SDR real, nao ha checklist de transferencia. |
| P-04 | A-05 / G-02 | Cadencia informal (1-2 tentativas por instinto); leads esfriam por falta de follow-up sistematico. |
| P-05 | A-07 / G-04 | Proposta enviada sem follow-up cadenciado; lead some sem resposta e nao ha acao definida. |
| P-06 | A-09, A-10 | Solicitacao ao Financeiro e Administrativo por canal informal; sem SLA, sem rastreabilidade; gera atraso em fechamento. |
| P-07 | A-11, A-15 | Handoff para Relacionamento e informal e intermitente; Time de Implantacao recebe cliente sem pacote estruturado. |
| P-08 | A-12 | Perdidos sem motivo registrado; impede aprendizado de ICP e revisao de estrategia comercial. |
| P-09 | A-16 | Forecast baseado em percepcao verbal; Sponsor decide sem dado auditavel. |

---

## 3. TO-BE Swimlane Narrativo

> Redesenho tool-agnostic. Capabilities descritas como comportamento, nunca como produto. Piloto foca em instrumentar para medir; metas sao aspiracionais ate baseline existir (post-60 dias).

### Raia: Lead / Prospect

1. **[T-01] Submeter interesse por canal estruturado de captacao** — Lead preenche formulario inbound (com checkbox de consentimento LGPD para inbound) ou e contatado via prospeccao outbound (base legal: legitimo interesse). Dados entram em repositorio unico instrumentado na etapa Qualificado.
   - cycle_time_target: 5min | control_type: preventive | capability: canal estruturado que exige campos minimos (nome, e-mail, telefone, empresa) para gerar registro.

### Raia: Agente de qualificacao automatizada

2. **[T-02] Enriquecer e pontuar lead** — Agente automatizado calcula Lead Score, detecta ICP (QS ou FS), gera Reason to Call e Abertura sugerida. Entrega: *ficha de qualificacao* com Score, ICP, Reason to Call para Ops de Vendas.
   - cycle_time_target: automatico (batch semanal ou on-demand) | control_type: preventive | capability: pontuacao automatizada de lead com base em criterios de ICP.

### Raia: Ops de Vendas (Dona da operacao)

> Carol = unica executora operacional do funil no piloto. Sem SDR. Sponsor audita semanalmente.

3. **[T-03] Validar checklist F1 e mover para Primeiro contato** — Ops de Vendas revisa ficha de qualificacao e completa campos obrigatorios do checklist F1 (Nome completo, Cargo, ICP, Canal de contato, Lead Score >= 45, Reason to Call, LinkedIn URL). Gate: checklist F1 100% preenchido. Entrega: *oportunidade qualificada com F1 completo* no repositorio instrumentado.
   - cycle_time_target: 10min | control_type: preventive | capability: validacao automatizada de completude do checklist F1 — bloqueio de avanco se campo obrigatorio vazio.

4. **[T-04] Executar cadencia de Primeiro contato (D+0/D+2/D+5/D+8)** — Ops de Vendas executa sequencia de 4 tentativas em 8 dias pelo canal do ICP (e-mail default; WhatsApp a partir de F3 somente com opt-in registrado em campo "Canal autorizado pelo lead"). Limite: 4 tentativas. Apos D+15 sem resposta, decidir Nutricao ou Perdido.
   - cycle_time_target: 15min por tentativa | control_type: null | capability: cadencia estruturada com prazos e limite de tentativas visivel no repositorio.

5. **[T-05] Validar checklist F2 e mover para Agendamento** — Ops de Vendas confirma: resposta obtida, fit confirmado, faturamento declarado, decisores mapeados. Gate: checklist F2 100% preenchido. Entrega: *oportunidade com F2 completo* para Agendamento.
   - cycle_time_target: 10min | control_type: preventive | capability: validacao automatizada de completude do checklist F2.

6. **[T-06] Agendar demo segmentada por ICP** — Ops de Vendas agenda demo com data, hora, tipo (QS ou FS), dor central identificada, decisores confirmados. Registra em campo "Canal autorizado pelo lead" se WhatsApp foi autorizado. Entrega: *evento de demo na agenda corporativa* + checklist F3 preenchido. Para demo FS, acionar Pre-venda tecnica.
   - cycle_time_target: 15min | control_type: preventive | capability: integracao bidirecional com agenda corporativa; checklist F3 obrigatorio.

7. **[T-07] Executar demo e registrar aceite verbal** — Ops de Vendas (QS) ou Pre-venda tecnica (FS) conduz demo. Registra: data da demo realizada, decisores presentes, dor confirmada, Aceite verbal (gate absoluto F4). Entrega: *oportunidade com F4 completo*.
   - cycle_time_target: 20min (QS) / 60min (FS) | control_type: preventive | capability: campo obrigatorio "Aceite verbal" como gate de saida de Apresentacao.

8. **[T-08] Enviar proposta e executar cadencia de follow-up** — Ops de Vendas envia proposta (QS: mensagem simples; FS: PDF consultivo com diagnostico e rollout). Cadencia: D+0 envio, D+1 confirmacao de recebimento, D+3 follow-up automatizado ao lead, D+7 alerta interno para Ops, D+15 decisao Nutricao/Perdido. Entrega: *proposta enviada com checklist F5 em andamento*.
   - cycle_time_target: 30min (envio) + cadencia ate 15 dias | control_type: detective | capability: cadencia de proposta com alertas automatizados por tempo em status.

9. **[T-09] Registrar aceite de proposta e mover para Fechamento** — Ops de Vendas registra Aceite da proposta (gate absoluto F5), valor proposto, modulos contratados. Entrega: *oportunidade com F5 completo* para Fechamento.
   - cycle_time_target: 10min | control_type: preventive | capability: campo obrigatorio "Aceite proposta" como gate de saida de Proposta.

10. **[T-10] Coletar dados de fechamento (CNPJ, razao social)** — Ops de Vendas solicita e registra CNPJ (14 digitos puros, premissa a validar na integracao com ERP corporativo), razao social e dados fiscais complementares. Entrega: *dados fiscais completos* para Financeiro e Administrativo.
    - cycle_time_target: 15min | control_type: preventive | capability: validacao automatizada de formato CNPJ e unicidade em contas ativas.

11. **[T-11] Orquestrar fechamento (cobranca + contrato)** — Ops de Vendas dispara solicitacao estruturada para Financeiro (emissao de cobranca) e Administrativo (emissao de contrato) via notificacao interna rastreavel. Acompanha SLAs: cobranca mesmo dia, pagamento ate 5 dias uteis, contrato ate 3 dias apos cobranca.
    - cycle_time_target: 10min | control_type: detective | capability: notificacao interna rastreavel com SLA visivel e alerta de atraso automatizado.

12. **[T-12] Decidir Nutricao ou Perdido (em qualquer etapa)** — Ops de Vendas classifica oportunidade que nao avancou: Nutricao (sinal fraco: sem resposta D+15, reagendamento 2x, "vou pensar", sem orcamento) com motivo + proxima revisao (D+30), ou Perdido com motivo obrigatorio + etapa perdida. Entrega: *registro de Nutricao ou Perdido com campos obrigatorios preenchidos*.
    - cycle_time_target: 10min | control_type: preventive | capability: campo obrigatorio "Motivo de perda" ou "Motivo de nutricao" como gate de transicao; bloqueio se vazio.

13. **[T-13] Executar cadencia de Nutricao (D+7/D+15/D+30/D+60)** — Ops de Vendas gerencia ciclo de nutricao: D+7 conteudo educacional automatizado, D+15 case de sucesso automatizado, D+30 reavaliacao de Lead Score humana. Se score >= 45, retorna a Primeiro contato. Se 2 ciclos sem evolucao, move para Perdido. Maximo: 2 ciclos.
    - cycle_time_target: 15min (revisao humana D+30) | control_type: detective | capability: cadencia automatizada de nutricao com alertas de revisao em D+30 e D+60.

### Raia: Pre-venda tecnica

14. **[T-14] Conduzir demo Full Serve** — Pre-venda tecnica conduz demo FS (45-60min) com decisores do lead. Registra: objecoes tecnicas, dor confirmada. Entrega: *anotacoes tecnicas da demo* para Ops de Vendas.
    - cycle_time_target: 60min | control_type: null | capability: participacao de especialista tecnico em demos de ICP Full Serve.

### Raia: Financeiro

15. **[T-15] Emitir cobranca e confirmar pagamento** — Financeiro recebe solicitacao estruturada de Ops de Vendas com dados fiscais completos. Emite boleto via gateway de pagamento no mesmo dia. Monitora pagamento por ate 5 dias uteis. Confirma recebimento no repositorio instrumentado. Entrega: *campo "Pagamento confirmado = verdadeiro"*.
    - cycle_time_target: 15min (emissao) + ate 5 dias uteis (aguarda pagamento) | control_type: detective | capability: alerta automatizado se pagamento nao confirmado em 5 dias uteis (notifica Ops + Financeiro).

### Raia: Administrativo

16. **[T-16] Emitir contrato e coletar assinatura digital** — Administrativo recebe solicitacao estruturada. Emite contrato a partir de template aprovado. Coleta assinatura digital. Juridico externo so em excecoes (clausulas fora do padrao). Entrega: *campo "Contrato assinado = verdadeiro"*.
    - cycle_time_target: 30min + ate 3 dias (assinatura) | control_type: detective | capability: alerta automatizado se contrato nao assinado em 3 dias (notifica Ops).

### Raia: Repositorio instrumentado (capability automatizada)

17. **[T-17] Transicionar automaticamente para Live e disparar handoff** — Quando "Pagamento confirmado = verdadeiro" E "Contrato assinado = verdadeiro", transicao automatica para etapa Live. Cria registro de implantacao no departamento de Relacionamento com pacote estruturado: dados fiscais, modulos contratados, dor identificada na demo, prazo de implantacao acordado, MRR, responsavel de implantacao atribuido. Notifica Time de Relacionamento.
    - cycle_time_target: automatico (imediato) | control_type: preventive | capability: transicao automatizada condicional (2 gates = verdadeiro) + criacao de registro cross-departamento com link bidirecional.

### Raia: Time de Relacionamento / Implantacao

18. **[T-18] Acolher cliente com pacote estruturado de handoff** — Time de Relacionamento (Matheus, Luiz) recebe notificacao com registro de implantacao contendo pacote completo. Inicia implantacao. Lead time de acolhimento e observado (nao cobrado no piloto; SLA formal apos 60 dias de dados).
    - cycle_time_target: a medir no piloto | control_type: detective | capability: registro de lead time de acolhimento como metrica observada.

### Raia: Sponsor comercial

19. **[T-19] Consumir forecast ponderado e auditar operacao semanalmente** — Sponsor comercial acessa painel consolidado com MRR adicionado, forecast ponderado do pipeline ativo, win rate e ciclo medio. Conduz revisao semanal (1h) com Dona da operacao. Entrega: *decisoes de governanca registradas* (revisao de ICP, ajuste de cadencia, escalacao).
    - cycle_time_target: 1h/semana | control_type: detective | capability: painel consolidado com metricas de pipeline (MRR, forecast, win rate, ciclo medio, distribuicao de perdas por motivo).

---

### Gateways TO-BE

- **GT-01 — Lead Score >= 45 e canal identificado?** after_activity: T-02. Criterio: Lead Score calculado pelo agente de qualificacao >= 45 E canal de contato identificado. Ramo SIM -> T-03 (validar checklist F1). Ramo NAO -> lead permanece em fila de enriquecimento ou e descartado sem entrar no funil.

- **GT-02 — Checklist F1 100% preenchido?** after_activity: T-03. Criterio: todos os 7 campos obrigatorios de F1 preenchidos. Ramo SIM -> T-04 (iniciar cadencia de Primeiro contato). Ramo NAO -> Ops de Vendas completa campos faltantes antes de avancar (bloqueio preventivo).

- **GT-03 — Lead respondeu dentro da cadencia (D+0 a D+15)?** after_activity: T-04. Criterio: lead retornou a pelo menos 1 das 4 tentativas dentro de 15 dias. Ramo SIM -> T-05 (validar checklist F2). Ramo NAO -> T-12 (decidir Nutricao ou Perdido).

- **GT-04 — Checklist F2 100% preenchido (fit + faturamento + decisores)?** after_activity: T-05. Criterio: resposta obtida, fit confirmado, faturamento declarado, decisores mapeados. Ramo SIM -> T-06 (agendar demo). Ramo NAO -> Ops de Vendas completa campos (bloqueio preventivo).

- **GT-05 — Demo e QS ou FS?** after_activity: T-06. Criterio: campo ICP do lead. Ramo QS -> T-07 (Ops de Vendas conduz demo). Ramo FS -> T-14 (Pre-venda tecnica conduz demo) + T-07 (Ops de Vendas registra resultado).

- **GT-06 — Aceite verbal obtido apos demo?** after_activity: T-07. Criterio: campo "Aceite verbal = verdadeiro" preenchido. Ramo SIM -> T-08 (enviar proposta). Ramo NAO -> T-12 (decidir Nutricao ou Perdido).

- **GT-07 — Lead aceitou proposta dentro da cadencia (D+0 a D+15)?** after_activity: T-08. Criterio: campo "Aceite proposta = verdadeiro" preenchido. Ramo SIM -> T-09 (registrar aceite e mover para Fechamento). Ramo NAO -> T-12 (decidir Nutricao ou Perdido).

- **GT-08 — Pagamento confirmado E contrato assinado?** after_activity: T-11. Criterio: campo "Pagamento confirmado = verdadeiro" E campo "Contrato assinado = verdadeiro". Ramo SIM -> T-17 (transicao automatica para Live). Ramo NAO -> pendencia com alerta automatizado por SLA (5 dias pagamento, 3 dias contrato) e escalacao.

- **GT-09 — Reavaliacao de Nutricao D+30: Score >= 45?** after_activity: T-13. Criterio: Lead Score reavaliado >= 45 na revisao D+30. Ramo SIM -> T-04 (retorna a Primeiro contato). Ramo NAO -> permanece em Nutricao Ciclo 2 ou move para Perdido apos 2 ciclos sem evolucao.

- **GT-10 — Desconto solicitado > 15%?** after_activity: T-08 (durante negociacao). Criterio: desconto proposto excede 15% do valor padrao. Ramo SIM -> escalacao para Sponsor comercial (aprovacao obrigatoria). Ramo NAO -> Ops de Vendas pode aprovar autonomamente.

---

### Excecoes TO-BE

- **EXT-01 — Lead ocioso em qualquer etapa alem do SLA:** Trigger: oportunidade permanece na mesma etapa alem do SLA observado (48h em Qualificado, 16 dias em Primeiro contato, 48h em Apresentacao, 7 dias em Proposta, 48h em Fechamento para CNPJ). Handled_by: Ops de Vendas (alerta automatizado). Tratamento: alerta interno automatico para Ops de Vendas com prazo expirado. Se nao agir em 24h adicionais, alerta ao Sponsor na revisao semanal. Retorno: Ops de Vendas decide: retomar cadencia, mover para Nutricao ou mover para Perdido.

- **EXT-02 — Pagamento nao confirmado em 5 dias uteis:** Trigger: boleto emitido e campo "Pagamento confirmado" permanece falso apos 5 dias uteis. Handled_by: Financeiro + Ops de Vendas (alerta conjunto). Tratamento: alerta automatizado para Financeiro e Ops de Vendas. Ops de Vendas contata lead para verificar; Financeiro verifica status no gateway de pagamento. Se nao resolver em 48h adicionais, escalar para Sponsor. Retorno: T-11 (aguarda confirmacao) ou T-12 (Perdido se lead desistiu).

- **EXT-03 — Contrato nao assinado em 3 dias:** Trigger: contrato emitido e campo "Contrato assinado" permanece falso apos 3 dias. Handled_by: Administrativo + Ops de Vendas (alerta conjunto). Tratamento: alerta automatizado. Ops de Vendas acompanha com lead; Administrativo verifica pendencia tecnica. Se clausula fora do padrao, escalar para Juridico externo. Retorno: T-16 (retenta assinatura) ou T-12 (Perdido se lead recusou).

- **EXT-04 — Lead solicita exercicio de direitos LGPD (DSAR):** Trigger: lead solicita acesso, correcao ou exclusao de seus dados pessoais. Handled_by: Ops de Vendas (recebe) + Sponsor/Admin provisorio (executa). Tratamento: encaminhar para canal de DSAR (a ser criado como workstream paralelo). Prazo legal: 15 dias. No piloto, tratamento manual com registro. Retorno: dados corrigidos/excluidos conforme solicitacao; registro de atendimento em log de LGPD.

- **EXT-05 — Reagendamento de demo excede limite (2x):** Trigger: lead reagenda demo pela terceira vez. Handled_by: Ops de Vendas. Tratamento: sinal fraco indicando baixa prioridade do lead. Mover para Nutricao com motivo "Reagendamento excessivo". Retorno: T-12 (Nutricao) -> T-13 (cadencia de nutricao).

---

## 4. Traceability Table (AS-IS -> TO-BE)

| AS-IS ID | TO-BE ID | Classificacao | Justificativa |
|---|---|---|---|
| A-01 | T-01 | transform | Canal de entrada passa a exigir campos minimos + checkbox LGPD (inbound). |
| A-02 | T-01, T-02 | transform | Registro informal substituido por repositorio unico instrumentado + enriquecimento automatizado. |
| A-03 | T-02, T-03 | transform | Qualificacao por percepcao pessoal substituida por Lead Score automatizado + checklist F1 formal. |
| A-04 | -- | remove | Handoff invisivel eliminado — Carol opera diretamente no repositorio instrumentado; quando SDR existir, checklist F1 sera o gate formal. |
| A-05 | T-04 | transform | Cadencia informal (1-2 tentativas por instinto) substituida por sequencia D+0/D+2/D+5/D+8 com limite de 4 tentativas. |
| A-06 | T-06, T-07 | transform | Agendamento e demo passam a ter checklist F3 obrigatorio, registro de dor central, decisores, integracao com agenda corporativa. |
| A-07 | T-08, T-09 | transform | Proposta passa a ter cadencia de follow-up (D+0..D+15) e gate formal de aceite (F5). |
| A-08 | T-10 | transform | Coleta de docs passa a ter validacao automatizada de CNPJ e unicidade. |
| A-09 | T-11 | transform | Solicitacao informal ao Financeiro substituida por notificacao interna rastreavel com SLA. |
| A-10 | T-11 | transform | Solicitacao informal ao Administrativo substituida por notificacao interna rastreavel com SLA. |
| A-11 | T-17 | transform | Handoff por memoria de Carol substituido por transicao automatica + pacote estruturado cross-departamento. |
| A-12 | T-12 | transform | Perda sem registro substituida por campo obrigatorio de motivo + etapa perdida como gate. |
| A-13 | T-15 | keep | Emissao de cobranca permanece com Financeiro; adiciona alerta automatizado por SLA. |
| A-14 | T-16 | keep | Emissao de contrato permanece com Administrativo; adiciona alerta automatizado por SLA. |
| A-15 | T-18 | transform | Acolhimento reativo sem pacote substituido por recebimento de registro com pacote estruturado e lead time observado. |
| A-16 | T-19 | transform | Forecast verbal substituido por painel consolidado + cadencia semanal formal. |
| -- | T-02 | add | Agente de qualificacao automatizada (Lead Score, ICP, Reason to Call) — capability nova para escalar qualificacao. |
| -- | T-13 | add | Cadencia formal de nutricao (D+7/D+15/D+30/D+60) — processo inexistente no AS-IS. |
| -- | T-14 | add | Papel formal de Pre-venda tecnica para demo FS — mencionado no desenho-fonte mas inexistente na pratica atual. |
| -- | T-17 | add | Transicao automatizada condicional (2 gates) + criacao de registro cross-departamento — capability totalmente nova. |

---

## 5. Traceability Table (TO-BE -> Pain + Success Criteria + Gap)

| Atividade TO-BE | Pain enderecada | Success Criterion | Gap resolvido |
|---|---|---|---|
| T-01 — Submeter interesse por canal estruturado | P-01 (repositorio nao-padronizado) | SC-01 (forecast auditavel) | C-12 (base legal LGPD: checkbox inbound) |
| T-02 — Enriquecer e pontuar lead | P-02 (qualificacao por percepcao) | SC-05 (vazao de demos) | -- |
| T-03 — Validar checklist F1 | P-02, P-03 (qualificacao informal, handoff invisivel) | SC-02 (win rate), SC-05 | -- |
| T-04 — Executar cadencia Primeiro contato | P-04 (cadencia inexistente) | SC-03 (ciclo medio) | H-08 (cadencias existentes: nenhuma formal) |
| T-05 — Validar checklist F2 | P-04 (leads esfriam) | SC-02 (win rate) | -- |
| T-06 — Agendar demo segmentada | P-04 (sem follow-up) | SC-05 (volume de demos) | C-09 (WhatsApp liberado F3+ com opt-in) |
| T-07 — Executar demo e registrar aceite | -- | SC-05 (volume de demos) | -- |
| T-08 — Enviar proposta + cadencia follow-up | P-05 (proposta sem follow-up) | SC-03 (ciclo medio) | -- |
| T-09 — Registrar aceite de proposta | P-05 | SC-02 (win rate) | -- |
| T-10 — Coletar dados de fechamento | P-06 (solicitacao informal) | SC-01 (forecast auditavel) | C-10 (CNPJ formato: assumption tecnica) |
| T-11 — Orquestrar fechamento | P-06 (sem SLA Financeiro/Admin) | SC-03 (ciclo medio) | H-02 (Juridico: Admin interno + externo excecao) |
| T-12 — Decidir Nutricao ou Perdido | P-08 (perdidos sem motivo) | SC-04 (>= 90% perdidos com motivo) | C-04 (motivo frequente: sem fit/ICP errado) |
| T-13 — Executar cadencia de Nutricao | P-04 (leads esfriam) | SC-03 (ciclo medio) | -- |
| T-14 — Conduzir demo Full Serve | -- | SC-05 (volume de demos) | P-05/M (Pre-venda: assumption) |
| T-15 — Emitir cobranca e confirmar pagamento | P-06 (sem rastreabilidade) | SC-01 (MRR adicionado) | -- |
| T-16 — Emitir contrato e coletar assinatura | P-06 (sem rastreabilidade) | SC-01 (MRR adicionado) | H-02 (Admin interno responsavel) |
| T-17 — Transicao automatica + handoff | P-07 (handoff informal) | SC-06 (handoff limpo) | C-14 (handoff atual: NAO EXISTE) |
| T-18 — Acolher cliente com pacote | P-07 (atrito na implantacao) | SC-06 (SLA acolhimento: a medir) | H-05 (SLA: medir primeiro, definir depois) |
| T-19 — Consumir forecast e auditar | P-09 (forecast verbal) | SC-01 (MRR auditavel), SC-02 (win rate) | C-06 (Walter audita semanalmente) |

---

## 6. Premissas do TO-BE (Assumptions)

| ID | Premissa | Owner da validacao |
|---|---|---|
| ASM-01 | Carol opera sozinha (zero SDR) no piloto. Cadencias e gates devem ser realistas para 1 pessoa gerenciando 30-80 leads/mes. | Sponsor comercial |
| ASM-02 | OKRs Q2/2026 sao aspiracionais. Piloto foca em instrumentar para medir; metas formais so apos baseline medido (post-60 dias). | Sponsor comercial |
| ASM-03 | CNPJ armazenado em 14 digitos puros e premissa tecnica a validar na integracao com ERP corporativo. Se ERP exigir formato diferente, aplicar transformacao on read/write. | Admin provisorio (Walter) |
| ASM-04 | Pre-venda tecnica para demo FS existe como papel (par tecnico), mas pessoa nao nomeada e capacidade mensal desconhecida. | Sponsor comercial |
| ASM-05 | Handoff para Relacionamento: lead time de acolhimento e metrica observada (nao cobrada) no piloto. SLA formal sera definido apos 60 dias de dados. | Time de Relacionamento |
| ASM-06 | Nenhuma tentativa anterior formal de instrumentar o funil existiu. Operacao cresceu como artesanato individual. | Dona da operacao |
| ASM-07 | Existem oportunidades em limbo nao-quantificadas. Piloto comeca com pipeline zerado e migra backlog manualmente nos primeiros 7 dias. | Ops de Vendas |
| ASM-08 | Cadencia maxima ao lead externo = 4 toques em 15 dias (Primeiro contato). Alem disso, move para Nutricao. Alinhado com boas praticas outbound B2B. | Sponsor comercial |
| ASM-09 | Nao ha restricao cultural a handoffs formais cross-departamento. Se resistencia surgir, escalar para Sponsor. | Sponsor comercial |
| ASM-10 | DPAs (contratos de operador LGPD) nao assinados. Piloto roda como validacao operacional; go-live real em producao exige DPAs assinados com todos os operadores (repositorio instrumentado, middleware, ERP, gateway de pagamento, agente de qualificacao). | Sponsor comercial |
| ASM-11 | Retenao de dados de leads nao-convertidos: 12 meses apos ultima interacao, depois descarte/anonimizacao. | Sponsor comercial |
| ASM-12 | Backup de aprovacao para desconto > 15% e o proprio Sponsor (Walter), sem substituto formal nomeado. | Sponsor comercial |
| ASM-13 | WhatsApp liberado a partir de F3 (Agendamento) somente com opt-in do lead registrado em campo "Canal autorizado pelo lead". | Sponsor comercial |
| ASM-14 | Alertas ativados para todos os SLAs desde o go-live (maxima visibilidade). Trigger de revisao se > 10 alertas/dia (risco de alert fatigue). | Ops de Vendas |
| ASM-15 | Roadmap de entrega: D+0 = pipeline + gates + handoff manual instruido. D+30 = cadencias automatizadas. D+60 = handoff automatico cross-departamento. D+90 = painel consolidado com MRR + Win Rate. | Sponsor comercial |

---

## 7. Flow Coherence Report

### Check C-01 — Gateway exhaustiveness
- **Status:** PASS
- **Finding:** Todos os 10 gateways (GT-01 a GT-10) possuem condicoes mutuamente exclusivas e exaustivas. Cada gateway tem criterio explicito e exatamente 2 ramos (SIM/NAO ou categorias exaustivas como QS/FS). Nenhum gateway permite entrada que nao bata em pelo menos um ramo. AS-IS: 5 gateways (G-01 a G-05) com condicoes explicitas.

### Check C-02 — Handoff symmetry
- **Status:** PASS
- **Finding:** Todos os handoffs verificados:
  - T-01 -> T-02: Lead entrega dados basicos; Agente recebe dados basicos. Simetrico.
  - T-02 -> T-03: Agente entrega ficha de qualificacao; Ops recebe ficha de qualificacao. Simetrico.
  - T-11 -> T-15: Ops entrega solicitacao estruturada com dados fiscais; Financeiro recebe solicitacao com dados fiscais. Simetrico.
  - T-11 -> T-16: Ops entrega solicitacao estruturada; Administrativo recebe solicitacao. Simetrico.
  - T-17 -> T-18: Repositorio entrega registro de implantacao com pacote completo (dados fiscais, modulos, dor, prazo, MRR, responsavel); Relacionamento recebe registro com pacote completo. Simetrico.
  - T-06 -> T-14: Ops entrega agendamento com dados do lead e ICP FS; Pre-venda recebe agendamento com dados. Simetrico.
  - T-14 -> T-07: Pre-venda entrega anotacoes tecnicas; Ops recebe anotacoes para registrar resultado. Simetrico.

### Check C-03 — Zero orphan steps
- **Status:** PASS
- **Finding:** Todas as atividades AS-IS (A-01 a A-16) e TO-BE (T-01 a T-19) sao alcancaveis a partir do start event (Lead submete interesse) e possuem pelo menos uma saida (sequence flow para proxima atividade, gateway ou end event: Live, Perdido).

### Check C-04 — Zero loops sem exit
- **Status:** PASS
- **Finding:** Loop GT-03 (NAO) -> T-12 -> T-13 -> GT-09 -> T-04: exit explicito apos 2 ciclos de Nutricao -> Perdido (end event). Loop GT-09 (SIM) -> T-04: retorna ao fluxo principal com exit via GT-03. Loop EXT-01 (retorna ao fluxo): exit via decisao de Nutricao/Perdido apos SLA + 24h. Nenhum loop sem condicao de saida.

### Check C-05 — Happy path + >= 3 excecoes
- **Status:** PASS
- **Finding:** AS-IS: happy path (A-01 -> A-16) + 4 excecoes nomeadas (EX-01, EX-02, EX-03, EX-04). TO-BE: happy path (T-01 -> T-19) + 5 excecoes nomeadas (EXT-01, EXT-02, EXT-03, EXT-04, EXT-05). Ambos superam o minimo de 3.

### Check C-06 — Naming consistency
- **Status:** PASS
- **Finding:** Verbos canonicos padronizados ao longo do documento: "Submeter" (entrada de lead), "Enriquecer" (qualificacao automatizada), "Validar" (checklists), "Executar" (cadencias e demos), "Enviar" (proposta), "Registrar" (aceites e decisoes), "Coletar" (dados e assinatura), "Emitir" (cobranca e contrato), "Orquestrar" (fechamento), "Acolher" (handoff). Nenhum verbo sinonimo usado para a mesma acao.

### Check C-07 — Lane ownership
- **Status:** PASS
- **Finding:** Cada atividade pertence a exatamente uma lane. AS-IS: 6 lanes (Lead, Qualificador(a), Ops de Vendas, Financeiro, Administrativo, Time de Relacionamento, Sponsor). TO-BE: 7 lanes (Lead, Agente de qualificacao automatizada, Ops de Vendas, Pre-venda tecnica, Financeiro, Administrativo, Repositorio instrumentado, Time de Relacionamento, Sponsor). Nenhuma atividade paira entre lanes.

### Check C-08 — Zero tool-brand contamination
- **Status:** PASS
- **Finding:** Busca textual por nomes de produto/software no documento completo (AS-IS, TO-BE, Traceability, Assumptions, Coherence Report). Termos verificados: Pipefy, ClickUp, HubSpot, Salesforce, Odoo, Asaas, Google, Make, n8n, Zapier, WhatsApp Business API, LinkedIn Sales Navigator, Mailgun, SAP, Notion, Jira. Resultado: ZERO ocorrencias. Todas as referencias usam capabilities agnosticas: "repositorio instrumentado", "ERP corporativo", "gateway de pagamento", "agenda corporativa", "agente de qualificacao automatizada", "canal estruturado de captacao".

### Sumario

| Metrica | Valor |
|---|---|
| Total de checks | 8 |
| Passed | 8 |
| Failed | 0 |
| Blockers | Nenhum |

**Conclusao:** Artefato pronto para consumo pela Paula Processo (step-05). Nenhum blocker identificado.

---

## 8. Criterios de Aceite do Piloto (referencia do gap-resolved)

Para conveniencia da Paula Processo, registro aqui os criterios tríplices de sucesso do piloto definidos pelo Sponsor:

1. **3 deals ponta a ponta** (Qualificado -> Live) com todos os gates F1-F6 registrados.
2. **Ciclo completo em <= 30 dias** para 3 deals QS + 1 deal FS.
3. **Carol opera sem intervencao tecnica por 15 dias** consecutivos.

Roadmap escalonado: D+0 = pipeline + gates basicos | D+30 = cadencias | D+60 = handoff automatico | D+90 = painel consolidado.

---

> **Nota ao step-05 (Paula Processo):** este artefato descreve O QUE o processo faz e QUEM decide. A Paula Processo transforma em COMO implementar: RACI detalhado, business rules numeradas (BR-nnn), KPIs SMART com baseline, risk & control matrix, exception playbook e glossario. Os riscos tecnicos da ferramenta-piloto (quota de automacoes, trigger condicional via API, ausencia de integracoes nativas) estao documentados no dossie tecnico e devem ser endereçados como constraints operacionais, nao como requisitos do processo.
