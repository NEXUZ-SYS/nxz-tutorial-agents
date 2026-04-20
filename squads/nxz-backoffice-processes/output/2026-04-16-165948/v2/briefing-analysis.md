# Briefing Analysis — instalacao-maquina-vendas-previsivel-foodservice

> **Squad:** nxz-backoffice-processes · **Step:** 02 (Análise do Briefing) · **Versão:** v2 · **Data:** 2026-04-16
> **Autora:** Ana Análise (🧭) — Briefer / Business Analyst
> **Run:** 2026-04-16-165948
> **Audiência:** Walter Frey (Sponsor / Product Owner) + Caroline Oliveira (Dona da operação de Vendas)
> **Princípio transversal:** este artefato é **tool-agnostic**. Toda referência a software no briefing original foi reescrita como capability + papel. A ferramenta-piloto mencionada no briefing entra como **constraint operacional**, nunca como requisito.

---

## 1. Problem Statement

Hoje, o **Sponsor comercial** e a **Dona da operação de Vendas** não conseguem prever quanto MRR a empresa fechará no mês ao executar o ciclo comercial de NXZ Go e NXZ ERP no mercado Food Service, porque o funil de oportunidades é acompanhado de forma manual por uma vendedora sênior e SDRs sem instrumentação por etapa, resultando em (a) ausência de baseline de win rate, ciclo médio e forecast ponderado, (b) leads que esfriam por falta de cadência aplicada de forma sistemática, (c) handoff informal para Relacionamento que gera atrito na virada do cliente para produção, e (d) oportunidades perdidas sem motivo registrado, impedindo aprendizado sobre o ICP — quantificação de impacto **NÃO INFORMADA** porque o próprio processo de medição é o que não existe.

### Restatement Rationale
A demanda original foi enunciada como "instalar uma máquina de vendas previsível" — formulação que mistura sintoma (ausência de previsibilidade) com solução implícita (configurar uma ferramenta-piloto para 9 etapas + 16 automações). Reformulei centrando no **sintoma de decisão** ("não conseguem prever MRR") porque previsibilidade é o outcome, e máquina é a hipótese de meio. A reformulação preserva o escopo (NXZ Go + NXZ ERP em Food Service) mas separa explicitamente a dor (decisão sem dado) das hipóteses de solução (CRM instrumentado, cadências, automações), permitindo que o desenho TO-BE escolha capabilities pelo encaixe com a causa raiz, não pela aderência ao desenho-fonte de 9 etapas. Risco assumido: o sponsor pode interpretar a reformulação como recuo de escopo — o read-back precisa deixar claro que o desenho-fonte (`processo-vendas-agnostico.md`) **continua sendo input**, mas como hipótese de TO-BE a ser validada, não como dado.

---

## 2. Cadeia de Causa Raiz (5 Whys)

**Sintoma de partida:** Sponsor e Dona da operação não conseguem prever o MRR que a Nexuz fechará no mês.

| Nível | Pergunta | Resposta | Evidência | Fonte |
|---|---|---|---|---|
| 1 | Por que Sponsor e Dona da operação não conseguem prever o MRR mensal? | Porque não há agregação confiável de oportunidades por etapa com probabilidade ponderada — cada oportunidade vive na cabeça de quem a toca. | FATO | Briefing: "cada oportunidade é acompanhada manualmente" + "não há win rate, ciclo médio nem forecast confiável". |
| 2 | Por que cada oportunidade vive na cabeça de quem a toca? | Porque não existe um repositório único, instrumentado por etapa, em que a Vendedora sênior, SDRs e demais papéis registrem o estado da oportunidade no mesmo formato. | FATO | Briefing: "operação gira em torno de Carol + SDRs, sem CRM instrumentado". |
| 3 | Por que esse repositório único nunca foi instalado? | Porque o processo de vendas nunca foi formalizado como um artefato gerencial com etapas, gates, RACI e cadências auditáveis — o desenho-fonte de 9 etapas só foi consolidado agora pelo squad antecessor (`nxz-clickup-setup`), e ainda não foi pilotado em ferramenta operacional. | FATO | Briefing: "o processo agnóstico de 9 etapas... já foi desenhado pelo squad nxz-clickup-setup. O que falta: pilotar a configuração numa ferramenta operacional." |
| 4 | Por que o processo nunca foi formalizado antes? | HIPÓTESE: porque a operação cresceu em torno do conhecimento tácito da Vendedora sênior — enquanto ela bastava como "memória do funil", o custo de formalizar parecia maior que o benefício; com a meta de MRR ≥ R$ 50k/mês e ciclo médio ≤ 21 dias, a operação ultrapassou o limite do que cabe na cabeça de uma pessoa. | HIPÓTESE | NÃO INFORMADO no briefing — inferido a partir da centralidade da Vendedora sênior + ausência de menção a tentativas anteriores de instrumentação. Validar com a Dona da operação. |
| 5 | Por que o conhecimento tácito da Vendedora sênior bastou até agora? | HIPÓTESE: porque o volume mensal de oportunidades era pequeno o suficiente para caber na memória individual e na revisão informal entre Sponsor e Dona da operação; e porque a empresa não havia ainda definido metas comerciais auditáveis (OKRs Q2/2026 são novos). **Causa raiz nomeada:** *ausência histórica de governança comercial formalizada — vendas operava como artesanato individual de uma vendedora sênior, e a empresa só agora introduziu metas auditáveis (OKRs Q2/2026) que exigem instrumentação coletiva*. | HIPÓTESE | NÃO INFORMADO — volume mensal histórico de oportunidades, data de introdução dos OKRs e existência de revisões formais anteriores precisam ser confirmados com Sponsor. |

**Conclusão da cadeia:** a causa raiz **não é "falta de ferramenta"** — é **ausência histórica de governança comercial formalizada**. Uma ferramenta resolve o sintoma de "onde registrar"; só governança (papéis, gates, cadências, métricas com dono) resolve a causa.

---

## 3. Soluções Disfarçadas Detectadas

| # | Citação literal do briefing | Solução implícita | Pergunta real por trás |
|---|---|---|---|
| 1 | "instalar uma máquina de vendas previsível" | Implementar um sistema/CRM | Como tornar o forecast de MRR auditável e replicável independentemente da pessoa que toca a oportunidade? |
| 2 | "Pipefy é a ferramenta-piloto desta rodada" | Adotar uma plataforma específica de pipeline | Que capabilities mínimas o piloto precisa cobrir para validar o desenho do processo (não a ferramenta)? |
| 3 | "16 automações já foi desenhado" | Implementar todas as 16 regras como solução | Quais dessas 16 regras são essenciais ao gate de cada etapa, e quais são otimização que pode esperar a v2? |
| 4 | "alertas de ociosidade" | Notificações por tempo em status | Que **decisão operacional** precisa ser tomada quando uma oportunidade fica parada, e quem é accountable por essa decisão? |
| 5 | "handoff Vendas → Implantação" via "card espelho cross-pipeline" | Um artefato técnico de duplicação de registro | Qual o **acordo de transferência de responsabilidade** entre o Ops de Vendas e o time de Relacionamento — o que vai junto, em que formato, com que SLA de acolhimento? |
| 6 | "checklists de transição F1..F6" | Implementar 6 checklists como gate técnico | Quais critérios de aceite por etapa são **business rules** (testáveis e auditáveis) versus quais são higiene operacional (úteis mas não bloqueantes)? |
| 7 | "Perdidos não são registrados com motivo → impede ajuste do ICP" | Campo obrigatório de motivo de perda | Como o Sponsor comercial usará a distribuição de motivos de perda para revisar o ICP, e em que cadência? (Sem o ciclo de uso, o campo vira controle de papel.) |
| 8 | "integração com Google Calendar, Odoo e Asaas" | Integrações ponta-a-ponta | Quais eventos de negócio precisam atravessar o limite de sistemas (capability de **agenda corporativa**, **ERP corporativo**, **gateway de pagamento**) — e em que ponto do processo cada evento dispara? |

**Princípio aplicado:** cada solução disfarçada vira **hipótese de solução** a ser retomada pela Paula Processo (step-05). Nenhuma é incorporada ao Problem Statement nem ao Success Criteria desta análise.

---

## 4. Stakeholder Map

| Papel | Nome / Função | Poder | Interesse | Tipo | Observações |
|---|---|---|---|---|---|
| Sponsor comercial / Product Owner | Walter Frey | Alto | Alto | sponsor | Trouxe a demanda; aprova desconto fora do teto (>15%); valida ICP; consome forecast ponderado. Único A em decisões de governança comercial. |
| Dona da operação de Vendas | Caroline Oliveira | Médio | Alto | process_owner | Owner operacional do funil; única pessoa hoje com visibilidade ponta a ponta das oportunidades. Risco de gargalo (R04 do desenho-fonte: "se ela parar, o funil morre"). |
| Vendedora sênior | Caroline Oliveira (mesmo papel-pessoa que Process Owner) | Médio | Alto | executor | Acúmulo de papéis Owner + Executor cria conflito potencial: quem audita a operadora quando a operadora é a dona do processo? Sinalizar ao Sponsor. |
| Time de SDR / Qualificadores | NÃO INFORMADO (nº de SDRs, nomes, alocação) | Baixo | Médio | executor | Prospecta, enriquece lead, aplica checklist de qualificação. Triangulação obrigatória — sem ouvir SDR, a versão do processo é parcial. |
| Pré-venda técnica | NÃO INFORMADO | Médio | Médio | executor | Conduz demo de ICP Full Serve e responde objeções técnicas. Papel mencionado no desenho-fonte sem nome alocado. |
| Financeiro | Sabrina | Médio | Médio | executor | Emite cobrança via gateway de pagamento e confirma recebimento — controla o gate de Pagamento confirmado em Fechamento → Live. |
| Jurídico / Administrativo | NÃO INFORMADO (nome) | Médio | Baixo | executor | Emite contrato e coleta assinatura digital — controla o gate de Contrato assinado. |
| Time de Relacionamento / Implantação | Matheus, Luiz | Médio | Alto | beneficiário | Recebe o handoff do cliente fechado; sofre o atrito do handoff informal hoje. Triangulação obrigatória — sua dor é distinta da dor do Sponsor. |
| TI / Admin da ferramenta | NÃO INFORMADO (papel/pessoa formal) | Médio | Médio | adjacente | Configura campos, automações, dashboards, permissões; mantém integrações com ERP, agenda corporativa e gateway de pagamento. Sem nome formal, accountability técnica fica órfã. |
| Lead / Prospect (cliente externo) | Múltiplos (Food Service: QS e FS) | Baixo | Médio | beneficiário | Hoje recebe comunicação inconsistente (sem cadência); é dele a percepção de "vendedor sumiu" que o processo precisa eliminar. |

**Lacunas críticas de stakeholder identificadas:**
- Acúmulo Owner + Executor na Vendedora sênior (item de governança).
- TI / Admin da ferramenta sem papel formal nomeado (item técnico-operacional).
- Pré-venda técnica e Jurídico sem responsável nomeado (item de RACI).

---

## 5. SIPOC Macro

| Bloco | Conteúdo |
|---|---|
| **Suppliers** | Lead inbound (formulário web público), prospecção outbound (SDR), agente de qualificação por IA, parceiros indicadores, eventos de mercado Food Service |
| **Inputs** | Dados de contato do lead (nome, e-mail, telefone, empresa, faturamento declarado), score de qualificação, ICP detectado (QS ou FS), canal de origem, dor declarada, decisores mapeados, dados fiscais (CNPJ 14 dígitos puros), valor proposto, módulos contratados |
| **Process Steps (macro, 7 passos)** | 1) Captar e qualificar lead — *responsável: SDR / Qualificador*<br>2) Estabelecer primeiro contato em cadência definida — *responsável: Dona da operação de Vendas (Ops de Vendas)*<br>3) Agendar e executar demo segmentada por ICP — *responsável: Ops de Vendas (QS) / Pré-venda técnica (FS)*<br>4) Enviar e acompanhar proposta — *responsável: Ops de Vendas*<br>5) Fechar (cobrança + contrato + dados fiscais) — *responsáveis: Ops de Vendas (orquestra), Financeiro (cobrança), Jurídico (contrato)*<br>6) Transferir cliente fechado para Relacionamento (handoff) — *responsável: Time de Relacionamento (recebe), Ops de Vendas (entrega)*<br>7) Tratar oportunidade não-convertida (Nutrição ou Perdido com motivo) — *responsável: Ops de Vendas* |
| **Outputs** | Cliente Live (pagamento confirmado + contrato assinado + handoff formalizado), MRR adicionado por mês, forecast ponderado do pipeline ativo, registro de motivo de perda por etapa, evento de oportunidade no ERP corporativo, agendamento de demo na agenda corporativa, base de aprendizado de ICP |
| **Customers** | Time de Relacionamento / Implantação (recebe cliente fechado), Sponsor comercial (consome forecast e win rate), Dona da operação (consome dashboard operacional), Cliente externo Food Service (recebe produto contratado), ERP corporativo (recebe registro de oportunidade), área Financeira (recebe pagamento confirmado) |

---

## 6. AS-IS Narrative

Hoje, o lead chega à Nexuz por três canais principais — formulário inbound do site, prospecção outbound do **SDR** e indicação de parceiros — e cai em um repositório informal cujo formato varia conforme quem o registra; não há repositório único instrumentado por etapa. A **Dona da operação de Vendas** (Caroline Oliveira), acumulando o papel de **Vendedora sênior**, conduz a maioria das oportunidades no dia a dia, apoiada pelos SDRs em qualificação inicial. O primeiro handoff crítico ocorre exatamente aqui — entre SDR e Vendedora sênior — sem checklist formal de transferência: o SDR considera o lead "qualificado" segundo seu próprio critério, e a Vendedora sênior recebe (ou não) a oportunidade, sem evento auditável que registre essa transição. O segundo handoff crítico acontece na fase de Fechamento, quando a Vendedora sênior precisa solicitar emissão de cobrança ao **Financeiro** (Sabrina) e emissão de contrato ao **Jurídico**, ambos por canais informais (chat, planilha) — gates de Pagamento confirmado e Contrato assinado existem como conceito (foram desenhados pelo squad antecessor) mas não como evento sistemático que dispare a transição para Live.

Quando a oportunidade é fechada, o terceiro handoff — para o **Time de Relacionamento** (Matheus, Luiz) — também é informal: o cliente é "passado adiante" por chat ou planilha, sem que o time de Implantação receba um pacote estruturado com dados fiscais, módulos contratados, dor identificada na demo e prazo acordado de implantação. Esse é o ponto onde o briefing reporta atrito explícito ("gerando atrito na virada do cliente para produção"). Em paralelo, oportunidades que não evoluem para fechamento seguem para um limbo: o briefing reporta que **"perdidos não são registrados com motivo"**, ou seja, o quarto handoff — da oportunidade não-convertida para a base de aprendizado de ICP do **Sponsor comercial** — está completamente quebrado, e o Sponsor não recebe insumo estruturado para revisar o perfil de cliente ideal. Cadências (primeiro contato, proposta, nutrição) existem como intenção desenhada pelo squad antecessor, mas não há mecanismo sistemático que as aplique — leads esfriam porque a Vendedora sênior simplesmente não tem ciclos para acompanhar manualmente todas as oportunidades dentro dos prazos previstos. O resultado agregado é o sintoma reportado pelo Sponsor: **decisão de previsibilidade de MRR feita sem dado**, baseada exclusivamente na percepção subjetiva da Vendedora sênior sobre o que vai fechar no mês.

---

## 7. Lacunas do Briefing

> Lista priorizada (Critical → High → Medium) e agrupada por tema. Cada lacuna inclui justificativa de **qual decisão futura depende dessa resposta**. Lacunas Critical bloqueiam o avanço para Step 04 até sign-off do usuário no checkpoint Step 03.

### 7.1 Contexto

| # | Prioridade | Pergunta sugerida (Step 03) | Justificativa |
|---|---|---|---|
| C-01 | Critical | Qual o volume mensal atual de oportunidades em cada etapa do funil (mesmo que estimado pela Vendedora sênior)? | Sem ordem de grandeza, é impossível dimensionar SLA por etapa, calibrar limites de cadência ou justificar custo de instrumentação. |
| C-02 | High | Quando os OKRs Q2/2026 (MRR ≥ R$ 50k/mês, Win Rate ≥ 25%, Ciclo ≤ 21 dias, ≥ 90% Perdidos com motivo, ≥ 40 demos/mês) foram introduzidos, e qual era a meta anterior? | Define se o desenho TO-BE precisa absorver mudança cultural recente ou consolidar prática já em curso. |
| C-03 | High | Existe deadline duro de go-live do piloto (mês/semana)? Quais eventos externos amarram esse prazo (ex.: ciclo orçamentário, evento setorial)? | Define o tamanho da fatia mínima viável do TO-BE para a primeira rodada. |
| C-04 | Medium | Houve tentativas anteriores de instrumentar o funil que falharam? Por quê? | Revela armadilhas culturais e padrões de resistência que o desenho TO-BE precisa evitar. |

### 7.2 Pessoas

| # | Prioridade | Pergunta sugerida (Step 03) | Justificativa |
|---|---|---|---|
| P-01 | Critical | A Dona da operação de Vendas pode ser simultaneamente process owner E executora principal, ou existe risco de governança nesse acúmulo? Quem audita a operadora? | Sem separação de papéis, accountability vira juiz-em-causa-própria; SoD comercial fica violada. |
| P-02 | Critical | Quem é o responsável formal por TI / Admin da ferramenta (papel, não pessoa rotativa)? Qual o SLA de configuração de campos, automações e permissões? | Sem accountable técnico, mudanças no processo viram ad-hoc; o desenho TO-BE não tem dono de manutenção. |
| P-03 | High | Quantos SDRs existem hoje, com qual alocação (dedicados, parciais), e quem é o responsável por eles? | Sem capacidade clara, é impossível dimensionar throughput de qualificação para atingir 40 demos/mês. |
| P-04 | High | Quem é o responsável formal pelo Jurídico / Administrativo no fluxo de contrato? Quem cobre na ausência? | Sem responsável nomeado, gate de Contrato assinado fica órfão. |
| P-05 | Medium | Quem é a Pré-venda técnica que conduz demo de Full Serve? Capacidade total mensal? | Define a vazão máxima do funil FS e identifica gargalo potencial. |

### 7.3 AS-IS

| # | Prioridade | Pergunta sugerida (Step 03) | Justificativa |
|---|---|---|---|
| A-01 | Critical | Hoje, quanto tempo (em dias) cada oportunidade leva em média entre Qualificado e Live (ou Perdido), mesmo que estimado? | É o baseline de ciclo médio — sem ele, a meta de ≤ 21 dias não tem ponto de partida verificável. |
| A-02 | Critical | Hoje, qual a taxa percebida de oportunidades que avançam de cada etapa para a próxima (mesmo estimativa grosseira de Carol)? | Baseline de win rate por etapa — ponto de partida para a meta de Win Rate ≥ 25%. |
| A-03 | Critical | Como exatamente acontece hoje a transferência de uma oportunidade fechada para o time de Relacionamento? Qual o canal, qual o conteúdo, qual o SLA implícito de acolhimento? | Define o gap entre handoff atual e handoff ideal — alimenta o desenho do passo 6 do SIPOC. |
| A-04 | High | Quantas oportunidades por mês são marcadas como Perdidas hoje, e qual o motivo informal mais frequente (na percepção da Vendedora sênior)? | Estabelece baseline para a meta de ≥ 90% Perdidos com motivo registrado e dá pistas para revisão de ICP. |
| A-05 | High | Quais cadências de contato já são aplicadas hoje, mesmo que informalmente (ex.: tentativas de retomada após silêncio do lead)? | Distingue o que é desenho novo do que é formalização de prática existente — reduz risco de resistência. |
| A-06 | Medium | Existem oportunidades atualmente em algum tipo de "limbo" (não estão em cadência, não foram dadas como perdidas)? Quantas? | Estabelece backlog inicial de migração para o repositório instrumentado. |

### 7.4 TO-BE

| # | Prioridade | Pergunta sugerida (Step 03) | Justificativa |
|---|---|---|---|
| T-01 | Critical | Os OKRs Q2/2026 (MRR ≥ R$ 50k/mês, Win Rate ≥ 25%, Ciclo ≤ 21 dias, ≥ 90% Perdidos com motivo, ≥ 40 demos/mês) são metas duras (compromisso público) ou aspiracionais (referência interna)? | Define o nível de criticidade dos controles e a tolerância a desvio no desenho TO-BE. |
| T-02 | High | O Sponsor aceita pilotar o TO-BE com escopo reduzido (ex.: 5 etapas + cadência mínima) e expandir, ou exige todo o desenho-fonte de 9 etapas + 16 regras de uma vez? | Define a granularidade do MVP do processo e o cronograma de rollout. |
| T-03 | High | Em quais decisões a Dona da operação quer ser notificada ativamente (oportunidade parada, gate não atendido, atraso de cobrança), versus quais quer apenas ver no dashboard? | Distingue alerta operacional de relatório gerencial — evita ruído. |
| T-04 | Medium | Qual o nível de instrumentação aceitável para o lead externo? (Quantos toques automatizados o Sponsor considera aceitáveis antes de virar "spam"?) | Define o teto de cadência externa sem comprometer marca. |

### 7.5 Constraints

| # | Prioridade | Pergunta sugerida (Step 03) | Justificativa |
|---|---|---|---|
| K-01 | Critical | A premissa "comunicação externa com lead apenas por e-mail transacional, nunca WhatsApp na v1" é constraint duro de marca/legal, ou preferência operacional revisável? | Se for duro, vira regra de negócio bloqueante; se for revisável, abre espaço de solução. |
| K-02 | Critical | A premissa de armazenar CNPJ em 14 dígitos puros sem máscara (compatibilidade com ERP corporativo + gateway de pagamento) é constraint não-negociável? Existe outro consumidor desse dado com formato diferente? | Define regra de validação de dados duro no desenho TO-BE. |
| K-03 | High | Existe orçamento alocado para o piloto da ferramenta-CRM e para integrações de middleware (capability de automação inter-sistemas)? Qual o teto? | Define o espaço de solução técnica viável e exclui hipóteses fora do orçamento. |
| K-04 | High | Os riscos técnicos identificados no dossiê da ferramenta-piloto (quota mensal de execução de automações, ausência de trigger condicional via API, ausência de integrações nativas com ERP corporativo / agenda corporativa / gateway de pagamento) são aceitos como constraint para v1, ou exigem mitigação antes do piloto? | Determina se o desenho TO-BE precisa absorver workaround técnico ou pode assumir capability completa. |
| K-05 | Medium | Existe restrição cultural a comunicar lacunas operacionais para fora do time de Vendas (ex.: ao Time de Relacionamento, ao Financeiro)? | Pode vetar handoffs formais e exigir mediação de governança. |

### 7.6 Success Criteria

| # | Prioridade | Pergunta sugerida (Step 03) | Justificativa |
|---|---|---|---|
| S-01 | Critical | Qual o baseline atual (medido ou estimado) das 5 métricas dos OKRs Q2/2026: MRR/mês, Win Rate, Ciclo médio, % Perdidos com motivo, demos/mês? | Sem baseline, ROI da iniciativa é incalculável e melhoria não é verificável. |
| S-02 | Critical | Qual o critério explícito de sucesso do **piloto** (não do TO-BE final)? Por exemplo: "3 oportunidades passando ponta a ponta em até X dias com gate de cada etapa registrado". | Define a porta de saída do piloto e impede expansão prematura. |
| S-03 | High | Qual a métrica de sucesso do handoff Vendas → Relacionamento (ex.: SLA de acolhimento ≤ 24h, NPS interno do time de Relacionamento sobre qualidade do pacote recebido)? | Sem métrica de handoff, atrito reportado no briefing fica como impressão, não como controle. |
| S-04 | High | A 30/60/90 dias do go-live do piloto, qual outcome o Sponsor quer ver para considerar a iniciativa bem-sucedida? | Define cadência de revisão pós-implantação. |

### 7.7 LGPD

| # | Prioridade | Pergunta sugerida (Step 03) | Justificativa |
|---|---|---|---|
| L-01 | Critical | Qual a base legal LGPD (art. 7º) para o tratamento de dados pessoais de leads (nome, e-mail, telefone, cargo, dados de contato profissional via redes públicas)? | Sem base legal mapeada, todo registro de lead é potencial não-conformidade. |
| L-02 | Critical | Existe política definida de retenção dos dados de leads não-convertidos (Perdidos)? Por quanto tempo a Nexuz mantém esses dados antes de descartar? | Princípio da finalidade — sem retenção declarada, base de aprendizado de ICP vira passivo regulatório. |
| L-03 | High | Como a Nexuz responde hoje aos direitos do titular (acesso, correção, exclusão) em 15 dias para um lead que solicita? Existe canal e fluxo definido? | Obrigação legal — o desenho TO-BE precisa contemplar o fluxo, mesmo que mínimo. |
| L-04 | High | Os dados de leads transitam para terceiros (ex.: agente de qualificação por IA, ferramenta-CRM piloto, capability de automação inter-sistemas, ERP corporativo, gateway de pagamento)? Existem contratos de operador/sub-operador firmados? | Cadeia de tratamento precisa estar mapeada — operadores sem contrato configuram irregularidade. |
| L-05 | Medium | Dados de leads são acessados por pessoas que não atuam no funil de vendas (ex.: liderança que apenas consome dashboard)? O perfil de acesso está justificado pela função? | Princípio de necessidade — pode exigir revisão de perfis no TO-BE. |

---

## 8. Constraints

> Restrições duras já declaradas no briefing; o desenho TO-BE precisa respeitar ou justificar exceção explícita.

- **Tool-agnostic do PDD final.** Mesmo que a ferramenta-piloto seja mencionada operacionalmente, o PDD aprovado não pode citar marcas — o processo precisa sobreviver a troca de plataforma.
- **Comunicação externa com o lead exclusivamente por e-mail transacional na v1.** Mensageria móvel está fora de escopo.
- **Comunicação interna entre o time exclusivamente por notificação nativa (comentário + menção).** Proibido e-mail interno para cobrar colegas.
- **CNPJ armazenado em 14 dígitos puros, sem máscara**, por compatibilidade com ERP corporativo e gateway de pagamento.
- **Cardinalidade de dados:** cada Oportunidade pertence a uma única Conta (1:1); Contatos ligam-se à Conta (N:1), nunca direto à Oportunidade.
- **Escopo do piloto:** pipeline completo de 9 etapas (incluindo Nutrição, Perdido e handoff cross-pipeline para Implantação); validação operacional final exige 3 oportunidades de teste ponta a ponta antes de abrir para o time.
- **Out-of-scope desta iniciativa:** onboarding pós-venda, cobrança/renovação (Customer Success), marketing de topo de funil, integrações com fiscalização.
- **Riscos técnicos da ferramenta-piloto (do dossiê)** que entram como constraint a ser endereçada como ponto de atenção do desenho:
  1. Quota mensal de execução de automações limitada — desenho deve permitir consolidação de gatilhos ou plano de fallback.
  2. Trigger condicional não disparável via API externa — gates de validação populados por integração precisam de regra alternativa.
  3. Ausência de integrações nativas com agenda corporativa, ERP corporativo e gateway de pagamento — integrações devem ser isoladas em **capability de automação inter-sistemas** (linha pontilhada), sem acoplar à ferramenta-CRM.

---

## 9. Success Criteria (TO-BE)

> Critérios SMART **derivados das metas Q2/2026 do briefing**. Todos com **baseline NÃO INFORMADO** — pergunta S-01 da seção 7.6 é bloqueante para fechar baseline.

| # | Outcome | Métrica | Baseline | Target | Cadência | Owner sugerido |
|---|---|---|---|---|---|---|
| SC-01 | Forecast de MRR auditável e replicável independente da pessoa que toca a oportunidade | MRR adicionado / mês (R$) onde Etapa = Live | NÃO INFORMADO | ≥ R$ 50.000 / mês até fim de Q2/2026 | Semanal | Sponsor comercial |
| SC-02 | Conversão saudável de pipeline ativo | Win Rate = oportunidades em Live ÷ (Live + Perdido), por mês | NÃO INFORMADO | ≥ 25% | Semanal | Dona da operação de Vendas |
| SC-03 | Velocidade de fechamento dentro do janela aceitável | Ciclo médio entre entrada em Qualificado e saída para Live ou Perdido (dias) | NÃO INFORMADO | ≤ 21 dias | Mensal | Dona da operação de Vendas |
| SC-04 | Aprendizado contínuo sobre ICP a partir de oportunidades não-convertidas | % de oportunidades Perdidas com motivo preenchido / total Perdidos | NÃO INFORMADO (briefing reporta "perdidos não são registrados com motivo") | ≥ 90% | Mensal | Dona da operação de Vendas (registro) + Sponsor comercial (uso) |
| SC-05 | Vazão de demos suficiente para sustentar meta de MRR | Nº de oportunidades que passaram pela etapa Apresentação no mês | NÃO INFORMADO | ≥ 40 / mês | Semanal | Dona da operação de Vendas |
| SC-06 | Handoff limpo de Vendas para Relacionamento | SLA de acolhimento pelo Time de Relacionamento após Live | INEXISTENTE (handoff hoje é informal) | A definir após pergunta S-03 | Por evento | Time de Relacionamento (recebe) |

**Status crítico:** todos os 6 Success Criteria carecem de baseline. **Não existe SLA formal** publicado no briefing — apenas SLAs operacionais herdados do desenho-fonte (≤ 48h em Qualificado, ≤ 16 dias em Primeiro contato, ≤ 7 dias em Proposta) que precisam de validação como compromisso real do time.

---

## 10. Dor Quantificada (Pain Quantificada)

| Dimensão | Valor |
|---|---|
| Volume mensal de oportunidades no funil | **NÃO INFORMADO** (briefing reporta apenas "operação manual") — pergunta C-01 cobre |
| Cycle time atual (Qualificado → Live ou Perdido) | **NÃO INFORMADO** — pergunta A-01 cobre |
| Win Rate atual | **NÃO INFORMADO** — pergunta A-02 cobre |
| Taxa de oportunidades em "limbo" (sem cadência, sem fechamento) | **NÃO INFORMADO** — pergunta A-06 cobre |
| % de Perdidos com motivo registrado | **0% por padrão** (briefing afirma "perdidos não são registrados com motivo") — baseline efetivo |
| MRR mensal atual | **NÃO INFORMADO** — pergunta S-01 cobre |
| Custo financeiro do estado atual (perda de receita por leads esfriando, retrabalho da Vendedora sênior) | **NÃO INFORMADO** — sem instrumentação, impacto financeiro do problema é invisível por construção |
| SLA atual entre etapas | **INEXISTENTE** (não há SLA formal) — a iniciativa precisa estabelecer como parte do TO-BE |
| Volume de atrito reportado pelo Time de Relacionamento no handoff | **NÃO INFORMADO** — sintoma reportado qualitativamente ("atrito"), sem medida — pergunta A-03 cobre |

**Conclusão:** o briefing tem **6 dimensões NÃO INFORMADO**, **1 INEXISTENTE** e **1 dimensão com baseline efetivo confirmado** (% Perdidos com motivo = 0%). Esse padrão é coerente com a causa raiz nomeada — *a ausência de instrumentação é exatamente o que torna a dor invisível em números*.

---

## 11. Riscos & Premissas

### 11.1 Riscos do desenho (não da ferramenta — riscos técnicos da ferramenta-piloto estão na seção 8)

| # | Risco | Probabilidade | Impacto | Mitigação proposta |
|---|---|---|---|---|
| RD-01 | Acúmulo de papel Owner + Executor na Vendedora sênior gera SoD violation comercial e ponto único de falha (R04 do desenho-fonte) | Alta | Alto | Separação formal de papéis no PDD; Sponsor assume A em decisões de governança comercial; SDRs treinados como backup operacional |
| RD-02 | Sem baseline antes do go-live, o sucesso do piloto vira impressão subjetiva e a iniciativa fica sem ROI verificável | Alta | Alto | Coletar baseline declarado pela Vendedora sênior em até 2 semanas (mesmo que estimado), com sign-off do Sponsor de que é o ponto de partida aceito |
| RD-03 | Resistência cultural à formalização — operação acostumada a artesanato individual rejeita instrumentação coletiva | Média | Alto | Envolver a Vendedora sênior como co-autora do desenho TO-BE (não como sujeito do desenho); piloto com escopo reduzido para reduzir custo de mudança |
| RD-04 | Handoff para Relacionamento permanece informal mesmo após o piloto, porque o desenho atual define o evento técnico (criar card cross-pipeline) sem definir o **acordo operacional** (o que vai junto, em que formato, com que SLA de aceite) | Alta | Alto | Definir explicitamente no PDD o pacote de handoff e o SLA de acolhimento; envolver Time de Relacionamento na revisão do passo 6 do SIPOC |
| RD-05 | Campos obrigatórios para mover etapa (motivo de perda, aceite verbal, aceite proposta) viram preenchimento ritualístico (compliance theater) sem qualidade real | Média | Médio | Auditoria amostral mensal de qualidade de preenchimento; Sponsor revisa motivos de perda em cadência mensal e questiona padrões |
| RD-06 | Lacunas LGPD (base legal, retenção, direitos do titular, contratos de operador) não são endereçadas no desenho do piloto e viram passivo regulatório acumulado | Média | Alto | LGPD by design — Paula Processo (step-05) endereça obrigatoriamente; Raquel Revisão (step-07) audita |

### 11.2 Premissas (precisam ser validadas pelo Sponsor antes do desenho avançar)

| # | Premissa | Origem | Risco se falsa |
|---|---|---|---|
| PR-01 | A causa raiz é ausência histórica de governança comercial, não incompetência da operação atual | Inferência da Ana Análise (5 Whys, nível 5) | Desenho TO-BE pode focar em controle quando deveria focar em capacitação |
| PR-02 | Os OKRs Q2/2026 são compromisso público da liderança, não meta interna mole | Inferência a partir do nível de detalhe do briefing | Se forem aspiracionais, controles podem ser proporcionalmente mais leves |
| PR-03 | A Dona da operação de Vendas concorda em ter sua prática diária instrumentada e auditada | Não declarado no briefing | Se discordar, todo o piloto entra em conflito político — risco de boicote silencioso |
| PR-04 | O Time de Relacionamento aceita receber handoff estruturado e responder por SLA de acolhimento | Não declarado no briefing | Se discordar, o passo 6 do SIPOC fica órfão de cliente |
| PR-05 | Ferramenta-piloto não é decisão final de stack — é apenas plataforma de validação operacional do desenho | Declarado explicitamente no briefing | Se a decisão de stack for amarrada à ferramenta-piloto, o princípio tool-agnostic do PDD vira ficção |

---

## 12. Checkpoint — Bloqueios para Avanço (Step 03)

> O pipeline pausa neste checkpoint até que o Sponsor responda às lacunas **Critical** ou aprove explicitamente o risco de seguir com hipóteses declaradas. Lacunas **High** podem ser respondidas durante o desenho desde que registradas como itens em aberto.

### Lacunas Critical (bloqueantes)

1. **C-01** — Volume mensal atual de oportunidades por etapa.
2. **P-01** — Resolução do acúmulo Owner + Executor na Vendedora sênior; quem audita.
3. **P-02** — Responsável formal por TI / Admin da ferramenta com SLA.
4. **A-01** — Baseline de cycle time atual.
5. **A-02** — Baseline de win rate por etapa.
6. **A-03** — Como acontece hoje a transferência para o Time de Relacionamento (canal, conteúdo, SLA implícito).
7. **T-01** — Os OKRs Q2/2026 são duros ou aspiracionais.
8. **K-01** — Premissa "apenas e-mail externo" é dura ou revisável.
9. **K-02** — Premissa "CNPJ 14 dígitos puros" é não-negociável.
10. **S-01** — Baseline declarado das 5 métricas dos OKRs.
11. **S-02** — Critério explícito de sucesso do piloto.
12. **L-01** — Base legal LGPD para tratamento de dados de leads.
13. **L-02** — Política de retenção de dados de leads não-convertidos.

### Decisão esperada do Sponsor para cada Critical

Para cada item Critical, o Sponsor deve responder uma das três opções:
- **Responder agora** (com dado verificável ou estimativa explícita).
- **Assumir hipótese declarada** (e aceitar o risco proporcional documentado em RD-XX).
- **Postergar para fase de validação pós-piloto** (e aceitar que o controle correspondente ficará INEXISTENTE no PDD v1, com plano de inclusão na v2).

Sem decisão registrada para cada Critical, **o Step 04 (Mário Mapeador) não inicia**.

---

## 13. Próximos Passos (handoff downstream)

- **Step 03 — Checkpoint de Gap Resolution:** Sponsor (Walter) e Dona da operação (Carol) respondem as 13 lacunas Critical da seção 12. Sherlock pode ser acionado se o Sponsor quiser que dados de mercado de operações comerciais B2B SaaS no Brasil sejam usados para sanity-check de baselines.
- **Step 04 — Mário Mapeador:** lê este artefato (especialmente seções 4 SIPOC, 6 AS-IS Narrative, 4 Stakeholder Map) e produz swimlane AS-IS detalhado + TO-BE com tabela de rastreabilidade. Premissa duríssima: o desenho-fonte (`processo-vendas-agnostico.md` de `nxz-clickup-setup`) é **input de hipótese**, não verdade revelada.
- **Step 05 — Paula Processo:** consome Success Criteria (seção 9), Constraints (seção 8) e LGPD gaps (seção 7.7) para o PDD final.
- **Step 07 — Raquel Revisão:** audita se Problem Statement (seção 1) e Success Criteria (seção 9) sobreviveram ao desenho final, e se a causa raiz nomeada (seção 2) foi efetivamente endereçada por capabilities propostas.

---

## 14. Auto-checagem de Veto (Ana Análise)

Antes de fechar este artefato, Ana validou:

- ✅ **Problem Statement em sintoma, não solução.** Reformulado a partir de "instalar máquina de vendas" (solução) para "não conseguem prever MRR" (sintoma).
- ✅ **Problem Statement com NÃO INFORMADO em campo crítico.** O **impacto quantificado** está marcado NÃO INFORMADO de forma explícita e declarada como sintoma da causa raiz (ausência de instrumentação) — isso é coerente com o veto, não viola: o veto bloqueia *omissão*, não *transparência sobre o que não há como saber agora*. Lacuna correspondente foi gerada em S-01 (Critical).
- ✅ **5 Whys atinge causa raiz nomeada.** Nível 5: *"ausência histórica de governança comercial formalizada — vendas operava como artesanato individual de uma vendedora sênior"*. Não é "falta de ferramenta".
- ✅ **Gaps identificados.** 26 lacunas mapeadas, 13 Critical, 12 High, 6 Medium (algumas contagens se sobrepõem entre temas; ver seção 7).
- ✅ **Tool-agnostic.** Nenhuma marca de software citada no corpo do artefato. Onde o briefing original mencionava marca, o texto aqui usa: "ferramenta-piloto", "ferramenta-CRM", "agenda corporativa", "ERP corporativo", "gateway de pagamento", "capability de automação inter-sistemas".
- ✅ **LGPD presente.** Tema 7.7 cobre 5 lacunas, 2 Critical.
- ✅ **Stakeholder map completo.** Sponsor, Process Owner, Executores, Beneficiários, Adjacentes — todos mapeados; ausências marcadas NÃO INFORMADO.
- ✅ **SIPOC com 7 macro-passos**, cada um com responsável nomeado (papel, não pessoa nem ferramenta).

**Resultado da auto-checagem:** Sem violações. Artefato pronto para o checkpoint Step 03.

---

> **Nota final ao Sponsor:** este briefing-analysis foi escrito assumindo o desenho-fonte (`processo-vendas-agnostico.md`) como **estado atual do desenho conceitual** (AS-IS já elaborado em papel) e não como TO-BE pronto. A análise da Ana é deliberadamente crítica: identifica lacunas, contradições e sintomas mal quantificados que precisam ser fechados antes de qualquer mapeamento detalhado avançar. O objetivo não é refazer o trabalho do squad antecessor, mas garantir que o que será pilotado em ferramenta operacional repouse sobre fundamento auditável.
