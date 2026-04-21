# Briefing de Contexto: Playbook de Vendas Nexuz — Qualificação & Fechamento

> Versão: v1.0 | Data: 2026-04-21 | Público: Sales-Ops | Nível: Operacional

## Metadata

- **Produto:** Suíte Nexuz (NXZ ERP, NXZ Go Totem/PDV/Smart POS, NXZ KDS, NXZ Delivery, NXZ Pay Go)
- **Categoria:** Playbook comercial / material de contexto de processo
- **Público-Alvo do Briefing:** Sales-Ops (SDR + Closer + operador de pipeline)
- **Nível Organizacional:** Operacional (execução diária)
- **Objetivo do Briefing:** Padronizar a execução de qualificação e fechamento pelo time de Ops comercial da Nexuz, alinhado ao PDD de vendas canônico (PDD-NXZ-VENDAS-001 v1.0) e ao Pipe Pipefy "Vendas" já configurado (P1 → P8).
- **Produtos Relacionados:**
  - NXZ ERP — backend obrigatório (todo deal inclui)
  - NXZ Go Totem/PDV/Smart POS — 3 modos de frente
  - NXZ KDS — sistema separado de cozinha (nunca apresentar como "modo do Go")
  - NXZ Delivery — centralizador de pedidos delivery
  - NXZ Pay Go — pagamento mobile integrado
- **Referências de base:**
  - `squads/nxz-backoffice-processes/output/2026-04-16-165948/v6/process-design-document.md` — PDD canônico
  - `squads/nxz-pipefy-setup/output/2026-04-20-162723/v1/` — design do Pipe Vendas (P1 a P8, campos, automações A-01 a A-16, templates ET-01 a ET-04)
  - Briefings de contexto por módulo em `context/` (v1.0 ERP, Go Sales, Go PDV, Totem, Smart POS)

**Gaps `[a confirmar com Carol]` desta v1:** tabela de preços operacional, top-15 objeções reais do campo, scripts WhatsApp (canal primário sem automação), critérios numéricos de ICP, roteiro de demo QS/FS detalhado, template de proposta PDF FS, cases citáveis além de No. Coffee, gatilhos de urgência validados. Todas marcadas inline na seção correspondente.

---

## 1. Visão Geral do Processo Comercial Nexuz

### 1.1 Fluxo de ponta a ponta

```
Lead chega → S1 Novo Lead → S2 Qualificação → S3 Demo → S4 Pós-demo
            │                                                      │
            └─ S8 Descarte ←──────────── (motivo obrigatório) ──────┤
                                                                   ▼
                                          S5 Proposta → S6 Fechamento → S7 GANHO
                                               │
                                    S_NUT Nutrição (paralela)
```

- **Entrada:** Inbound, Outbound, Indicação, Evento, Parceiro (5 origens — Start Form do Pipe P1).
- **Saídas terminais:** S7 GANHO (positivo) ou S8 DESCARTE (negativo, 9 motivos fixos).
- **Paralelo:** S_NUT Nutrição (card volta para nutrição por 2 ciclos de 30d — [no v1 ainda sem pipe separado; é sinalizada no card]).

### 1.2 Papéis (RACI do PDD §4)

| Papel | Departamento | Responsabilidade |
|---|---|---|
| **Ops comercial** (Carol e equipe) | Comercial | S1 → S6. Conduz o funil, qualifica, demo, proposta, negocia, entrega CNPJ. Dono do card no Pipefy. |
| **Gestão** | Comercial / Diretoria | Aprovação de descontos >15% (A-12), assinatura de contrato (S6), calibração de ICP. |
| **Financeiro** | Financeiro | Emissão de boleto e confirmação de pagamento (S6). Preenche `Pagamento confirmado`. |
| **Relacionamento / Implantação** | CS | Recebe handoff pós-GANHO (R40). |
| **Marketing** | Marketing | Gera inbound, campanhas, parceiros. |

### 1.3 Marcos POD (Proof Of Delivery) registrados no card

- **Lead** — card criado em P1 (Data entrada etapa).
- **MQL** — card entra em P2 Qualificação (Data MQL, auto A-01).
- **SAL** — card sai de P2 com Checklist Binário 6/6 (Data SAL, auto A-02).
- **Ganho** — card entra em P7 GANHO (Data Ganho, auto A-03).
- **Live** — marco de implantação (fora do Pipe Vendas; no Pipe Implantação).

### 1.4 Mapa PDD → Pipefy (1:1)

| Etapa PDD | Fase Pipefy | Gate de saída |
|---|---|---|
| S1 Novo Lead | P1 Novo Lead | Ops responsável atribuído (GT-01) |
| S2 Qualificação | P2 Qualificação | Checklist Binário 6/6 |
| S3 Demo Agendada | P3 Demo Agendada | Cliente + Contatos + Tipo demo preenchidos |
| S4 Pós-demo | P4 Pós-demo | Status demo + Aceite verbal + Dor confirmada |
| S5 Proposta | P5 Proposta | Aceite proposta + MRR + Módulos |
| S6 Fechamento | P6 Fechamento | CNPJ + Pagamento + Contrato |
| S7 GANHO | P7 GANHO | Automático (A-13 quando pgto+contrato=true) |
| S8 Descarte | P8 DESCARTE | Motivo obrigatório (1 de 9) |

**Exemplo operacional:** "Estou em S4 Pós-demo. Preciso marcar `Status demo = Realizada com aceite`, `Aceite verbal = true`, `Dor confirmada = true`. Sem os 3 marcados, o card não avança para P5 Proposta."

---

## 2. ICP e Comitê de Compra

### 2.1 Quem é cliente Nexuz

**Mercado:** Food Service "To Go" (restaurantes, bares, cafés, food trucks, catering, franquias) + negócios em digitalização.

**Dois segmentos de ICP (PDD §3.1):**

| Segmento | Perfil | Tipo de venda | Demo | Proposta |
|---|---|---|---|---|
| **QS (Quick Serve)** | Operação simples, 1-2 unidades, decisão rápida | Transacional | Simplificada ~15 min | Mensagem / e-mail curto |
| **FS (Full Service)** | Operação completa (salão + cozinha + delivery), 3+ unidades ou franquia | Consultiva | Completa ~30 min | PDF consultivo |

**Rótulos Pipefy disponíveis no card:** QS, FS, Zona de fronteira, Fora ICP + temperatura (Frio, Morno, Quente).

`[a confirmar com Carol]` — **critérios numéricos de ICP** (PDD §8 diz "a calibrar D+30"):
- Faturamento mensal mínimo para ser QS / FS
- Nº mínimo de unidades para ser FS
- Limite de faturamento para ser "Fora ICP"
- Geografia (atende todo BR ou tem região preferencial?)

### 2.2 Comitê de compra — 5 personas (v0.2 Personas + PDD §3.2)

| Persona | Papel na decisão | Onde abordar | O que valoriza |
|---|---|---|---|
| **Proprietário** | **Decisor** (Economic Buyer) | WhatsApp direto, LinkedIn | Margem, expansão, compliance fiscal/LGPD, sono tranquilo |
| **Gerente de Operação** | **Champion** / Influenciador chave | Visita presencial, demo | Dashboard, indicadores, onboarding simples, menos retrabalho |
| **Caixa / Operador de PDV** | Usuário final | Observação em demo | Agilidade, interface simples, menos erros de fechamento |
| **Garçom** | Usuário final | Observação em demo | Velocidade, pedido sem voltar ao caixa |
| **Contador / Contabilidade** | Gatekeeper | E-mail formal | Integração com ECD/EFD, relatórios fiscais |

**Mapeamento PDD (papel no card):** no Pipefy, ao vincular Contato (DB Parceiros tipo=PF), marcar papel como `Decisor`, `Influenciador`, `Operacional` ou `Gatekeeper`. **Decisor é obrigatório para avançar para S3 Demo** (Gate F-Demo).

**Regra de champion (best practice Sales 2026):** Proprietário fecha, mas **Gerente de Operação vende internamente** quando você não está na sala. Identifique-o já em S2 e invista tempo com ele.

---

## 3. S1 — Novo Lead: Entrada e abertura

### 3.1 Objetivo

Capturar dados mínimos, atribuir um Ops responsável, dar primeira resposta dentro do SLA.

### 3.2 SLA de resposta (PDD §9)

- **Inbound** (site, ads, Instagram resposta): **2h úteis**.
- **Indicação**: **2h úteis** + feedback ao indicador em até 7 dias (A-14 dispara lembrete).
- **Outbound** (você prospectou): **48h úteis** para continuar a cadência.
- **Evento / Parceiro**: **24h úteis**.

### 3.3 Start Form do Pipe P1 — campos obrigatórios

Ao criar o card em P1, preencha:

- Nome do contato *
- E-mail *
- Telefone/WhatsApp *
- Empresa (razão social ou fantasia) *
- **Origem** * — `Inbound | Outbound | Indicação | Evento | Parceiro`
- **Canal preferido** * — `WhatsApp | LinkedIn | Instagram | Facebook | E-mail | Ligação`

**Campos condicionais (aparecem conforme origem):**
- Se `Origem = Inbound` → **Consentimento LGPD** (checkbox).
- Se `Origem = Indicação` → **Quem indicou** (obrigatório, FC-02) + Contexto da indicação.
- Se `Origem = Outbound` → **Reason to Call** (por que você ligou) + **ICP** (QS/FS/Zona/Fora).

**Gate GT-01:** **sem Ops responsável atribuído, o card não sai de P1**.

### 3.4 Scripts de abertura por origem `[v1: inferência; a validar com Carol]`

**Inbound (respondendo formulário do site/ads):**

> _"Oi, {nome}! Aqui é {ops} da Nexuz. Vi que você pediu uma conversa sobre tecnologia pra {empresa} — seja muito bem-vindo(a). Me conta em 1 linha o que te motivou a procurar a gente? Assim já venho com o contexto certo pro nosso papo. Pode ser hoje ou amanhã entre {janela}?"_

**Outbound (cold WhatsApp após pesquisa):**

> _"Oi, {nome}. Aqui é {ops}, cuido de novas operações na Nexuz — a gente é especializada em Food Service. Vi a {empresa} e achei que faria sentido a gente conversar por causa de {reason_to_call}. 15 min essa semana funciona? Se não for o momento, me responde aqui mesmo que eu tiro do radar — sem problema."_

**Indicação:**

> _"Oi, {nome}! {indicador} me passou seu contato comentando que vocês estão avaliando tecnologia pra {empresa}. Já agradeci ele — e queria muito trocar uma ideia com você. Quando te chamo por aqui ou no telefone?"_

**Evento:**

> _"Oi, {nome}, muito bom te conhecer no {evento}! Seguindo nossa conversa sobre {tópico discutido}, te chamei por aqui pra marcarmos uns 20 min. Qual dia da próxima semana funciona melhor?"_

**Parceiro:**

> _"Oi, {nome}, aqui é {ops} da Nexuz. A {parceiro} me indicou seu caso — e baseado no que eles me contaram sobre a {empresa}, faz todo sentido conversarmos. Topa marcar pra essa semana?"_

### 3.5 Checklist diário em S1

- [ ] Todo card novo em P1 tem Ops responsável em até 2h (inbound/indicação) ou 48h (outbound).
- [ ] Consentimento LGPD checado para todo inbound.
- [ ] Feedback enviado ao indicador antes de D+7 (A-14 envia alerta).
- [ ] Nenhum card preso sem ação em P1 por >3 dias úteis (PDD §10 SLA interno).

---

## 4. S2 — Qualificação: Checklist Binário + Cadência

### 4.1 Objetivo

Validar, em contato humano, se o lead é realmente um SAL (Sales-Accepted Lead). **Não agendar demo antes da validação**: demo prematura = tempo perdido e lead frustrado.

### 4.2 Checklist Binário — os 6 itens (PDD §5A F-Qualificação)

Para avançar de P2 para P3, **os 6 checkboxes no Pipefy têm que estar marcados**:

| # | Item | Campo de apoio | Como você coleta |
|---|---|---|---|
| 1 | **Fit confirmado (ICP compatível)** | — | Avaliação sua após entender o negócio. É Food Service? Está no ICP? |
| 2 | **Faturamento declarado** | `Faturamento mensal (R$)` | Pergunta direta (seção 4.3 abaixo) |
| 3 | **Dor central identificada** | `Dor central (descrição)` | Pergunta consultiva SPIN |
| 4 | **Nº unidades registrado** | `Nº unidades` | Pergunta direta |
| 5 | **Decisor confirmado** | Vinculação de Contato com papel=Decisor | Pergunta sobre processo de decisão |
| 6 | **Urgência declarada** | `Urgência (descrição)` | Pergunta sobre prazo / evento gatilho |

**Leia o Checklist como BANT-adjacente:**
- Faturamento ≈ **Budget**
- Decisor ≈ **Authority**
- Dor ≈ **Need**
- Urgência ≈ **Timeline**
- Fit + Nº unidades = bônus do ICP Nexuz

### 4.3 Perguntas canônicas por item `[v1: inferência; a validar com Carol]`

**Item 1 — Fit / ICP**
- "Me conta um pouco da operação da {empresa}: vocês atendem dentro do salão, delivery, food truck, catering…?"
- "Hoje, 50/50 entre salão e delivery? Ou mais pra um lado?"

**Item 2 — Faturamento**
- "Pra eu conseguir montar uma proposta fiel à realidade de vocês, me ajuda com uma ordem de grandeza: o faturamento médio mensal está mais próximo de R$ 50k, R$ 150k, R$ 500k?"
- **Truque:** pedir faixa, não número exato — remove atrito.

**Item 3 — Dor**
- "Se você tivesse que resumir em 1 frase o maior problema operacional da {empresa} hoje, qual seria?"
- **5 dores canônicas para referência** (Negócios v0.4):
  1. Comunicação ineficiente salão ↔ cozinha
  2. Controle de estoque deficiente
  3. Gestão financeira complexa
  4. Experiência do cliente (fila, erro, demora)
  5. Implementação demorada de outros sistemas

**Item 4 — Nº unidades**
- "Quantas unidades vocês operam hoje? Tem plano de abrir mais nos próximos 6 meses?"

**Item 5 — Decisor**
- "Além de você, quem mais participa da decisão sobre tecnologia aí? Financeiro? Dono?"
- "E a decisão final sobre contratar um sistema novo — é sua ou precisa subir pra alguém?"
- **Registro no Pipefy:** após identificar, criar/vincular Contato (PF) com papel=Decisor.

**Item 6 — Urgência**
- "E qual a janela que vocês estão pensando pra ter isso rodando? Tem alguma data / evento puxando?"
- **Gatilhos aceitáveis (Food Service):** abertura de nova unidade, início de temporada, troca de adquirente, problema fiscal, reforma/reabertura. `[validar com Carol quais gatilhos reais o time escuta]`

### 4.4 Cadência automatizada em P2 Qualificação (4 toques em 8 dias)

| Toque | Dia | Canal | Automação | Template |
|---|---|---|---|---|
| 1 | D+0 | WhatsApp humano | — (manual) | Script 3.4 por origem |
| 2 | D+1 | E-mail | **A-04** | **ET-01** "{empresa}, que bom te conhecer" |
| 3 | D+3 | E-mail | **A-05** | **ET-02** "{nome}, um insight que pode ajudar a {empresa}" |
| 4 | D+7 | E-mail | **A-06** | **ET-03** "{nome}, última tentativa esta semana" (break-up) |

**Janela de envio:** Seg-Sex 9h-18h BRT (R36). Fora disso, enfileira para próximo slot útil.

**Fim da cadência:** se D+8 sem resposta → card vai para S8 Descarte com motivo **9. Sumiu/sem resposta** (obrigatório `Último canal tentado`).

### 4.5 Exemplo de conversa completa (WhatsApp consultivo)

```
Ops:    Oi, João! Aqui é Carol da Nexuz. Vi que vocês pediram uma conversa
        sobre sistema pra Burguer Master. Pra eu já chegar pronta, me conta
        em 1 linha o que motivou a busca?
João:   Tô perdendo tempo conciliando iFood no caixa e a cozinha fica
        brigando comigo sobre pedido.
Ops:    Entendi — centralizar delivery e comunicação com cozinha. Esse
        problema tá rolando há quanto tempo?
João:   Uns 6 meses. Piorou depois que abrimos a 2a unidade.
Ops:    Faz sentido. E hoje vocês estão em quantas unidades no total?
João:   2. E já tô pensando na 3ª pra janeiro.
Ops:    Show. Pra te ajudar a desenhar algo fiel à operação, posso te
        perguntar a faixa de faturamento médio? Está mais próximo de
        R$ 80k, R$ 200k ou R$ 500k/mês?
João:   Tá perto de R$ 250k somando as duas.
Ops:    Perfeito. Última pergunta antes de marcarmos uma demo rápida:
        você decide sozinho ou precisa subir pro seu sócio/financeiro?
João:   Meu sócio cuida de financeiro, mas eu que decido sistema.
Ops:    Ótimo. Então já consigo preparar uma demo de 30 min — semana que
        vem, terça 10h ou quarta 15h?
```

**Ao final desta conversa, no Pipefy:**
- ✅ Item 1 Fit (é restaurante QSR multi-unidade)
- ✅ Item 2 Faturamento `R$ 250.000`
- ✅ Item 3 Dor `Centralização delivery + comunicação com cozinha (6 meses, piorou com 2a unidade)`
- ✅ Item 4 Nº unidades `2` (plano de 3 em janeiro)
- ✅ Item 5 Decisor `João Silva (PF, papel=Decisor)`
- ✅ Item 6 Urgência `Abertura de nova unidade em janeiro — quer rodar antes`
- → Checklist 6/6 → move card P2 → P3 → **A-02 dispara Data SAL**

### 4.6 Critérios de avanço e veto

- **Avançar para P3** apenas se Checklist 6/6 marcado. Pipefy bloqueia via required fields.
- **Mover para P8 Descarte** se:
  - Item 1 Fit = não (fora de ICP) → motivo 1.
  - Item 2 Faturamento abaixo do mínimo → motivo 2.
  - Item 5 Decisor diz explicitamente "não vou comprar" → motivo 4 ou 7.
  - Sem resposta em 8 dias → motivo 9.

### 4.7 Objeções típicas em S2 `[v1: inferência; validar com Carol]`

| Objeção | Resposta sugerida | Ancoragem |
|---|---|---|
| "Tô sem tempo pra conversar agora" | "Sem problema, João. Faz assim: me responde 3 coisas bem rápidas — faturamento mensal aproximado, nº de unidades, e qual o maior problema hoje. Em 2 min eu já te digo se faz sentido continuarmos." | Reduz atrito de reunião |
| "Manda por e-mail que eu olho" | "Mando sim. Só que, como nossa solução é modular (ERP, Go, KDS, Delivery, Pay Go), mandar um catálogo genérico seria perda de tempo dos dois lados. 15 min no WhatsApp ou ligação pra eu entender a operação e aí te mandar **algo que serve pra você**?" | Valoriza personalização |
| "Já tenho sistema" | "Legal, qual? …Entendi. E se você pudesse melhorar 1 coisa nele hoje, seria o quê?" | Descobre dor latente |
| "Não tô pensando em trocar" | "Totalmente entendível. Só uma pergunta pra eu respeitar seu tempo: quando foi a última vez que você parou pra comparar sua operação com o que o mercado tem feito? Se a resposta for 'faz tempo', vale 15 min. Se foi recente, eu saio do seu caminho." | Provoca curiosidade sem pressão |

---

## 5. S3 + S4 — Demo e Pós-demo

### 5.1 Objetivo

Mostrar a solução funcionando **no contexto do prospect** (nunca demo genérica) e sair da demo com **aceite verbal explícito** para a proposta.

### 5.2 Tipo de demo — QS vs FS (PDD §5 R8-R10)

| Aspecto | QS — Simplificada | FS — Consultiva |
|---|---|---|
| Duração | ~15 min | ~30 min |
| Ferramentas | Compartilhar tela, dados demo | Compartilhar tela + PDF de apoio |
| Participantes | Decisor + Ops | Decisor + Gerente + Ops (+ quem mais o cliente trouxer) |
| Estrutura | Pitch → 2-3 wow moments → CTA | Pitch → Diagnóstico → Mapa de rollout → Wow moments → CTA |
| Fechamento esperado | Aceite verbal direto | Aceite verbal + acordo de data de resposta |

**Campo Pipefy** `Tipo de demo` (radio: QS / FS) — preenchido em P3.

### 5.3 Gates antes de agendar demo (F-Demo)

Para sair de P2 → P3, Pipefy exige:
1. Checklist Binário 6/6 marcado.
2. `Cliente vinculado` (connector a DB Clientes — criar se não existir).
3. `Contatos vinculados` com ≥1 papel=Decisor (connector a DB Parceiros tipo=PF).
4. `Data da demo` preenchida.
5. `Quem vai conduzir` (Ops responsável ou outro).
6. `Decisores presentes na demo (nomes)` — quem **de fato** vai estar na reunião.

### 5.4 Checklist pré-demo (24h antes) `[v1: inferência]`

- [ ] Confirmar presença com o decisor (WhatsApp: "João, confirmado amanhã 10h, certo? Te mando o link 10 min antes").
- [ ] Enviar link Meet/Zoom/WhatsApp call conforme `Canal preferido`.
- [ ] Revisar card no Pipefy: `Dor central`, `Nº unidades`, `Faturamento`, `Urgência` — demo vai falar **disso**.
- [ ] Preparar ambiente demo (conta sandbox NXZ Go + KDS com dados plausíveis do segmento do prospect).
- [ ] Se FS: abrir template de PDF de proposta preenchido até "diagnóstico" para mostrar no final.
- [ ] Plano B para prospect sem internet/zoom: ligação + telefone + screenshots.

### 5.5 Roteiro de demo — esqueleto genérico

```
00:00  Abertura (1-2 min)
       - Cumprimento, checar agenda
       - Recapitular o que você já sabe: "João, confirma se entendi:
         Burguer Master tem 2 unidades, ticket médio X, dor principal
         é Y. Correto?"
       - Objetivo da reunião: "Hoje quero te mostrar como a Nexuz
         resolveria exatamente isso. 30 min no máximo, e no final a
         gente decide se faz sentido eu mandar uma proposta."

03:00  Pitch 30s da suíte
       - "Nexuz é uma plataforma integrada de Food Service: o que chega
         pelo Totem/PDV/App de delivery vai direto pro KDS da cozinha,
         e todo o financeiro/estoque/fiscal roda no ERP sem você
         precisar duplicar lançamento. Simples assim."

04:00  Wow moments (escolhidos pela dor do prospect)
       - Dor = centralização delivery → NXZ Delivery capturando iFood
         e Rappi em 1 tela + roteando pro KDS.
       - Dor = comunicação cozinha → NXZ KDS recebendo de 5 canais
         simultâneos, com tempos por etapa visíveis.
       - Dor = autoatendimento/fila → NXZ Go Totem personalizado com
         identidade visual do cliente.
       - Dor = caixa lento → NXZ Go PDV + Smart POS (mobile).
       - Dor = gestão financeira → NXZ ERP: dashboard de margem,
         conciliação automática com Stone/Cielo/PagSeguro.

15:00 (FS) Diagnóstico + rollout
       - "Pelo que você me contou, proposta faria sentido assim:
         mês 1 — ERP + Go PDV nas 2 unidades;
         mês 2 — KDS;
         mês 3 — Delivery.
         Pay Go entra se/quando quiserem trocar adquirente."

25:00  Perguntas + gestão de objeções (seção 8)

28:00  CTA de aceite verbal (GATE)
       - "João, pela conversa, faz sentido você receber uma proposta
         detalhada com número?"
       - Se SIM: "Perfeito, mando terça (D+1). Combinamos de conversar
         de novo na sexta (D+4) pra você me dar feedback?"
       - Se NÃO: "Entendi. O que ficou de fora que te impediria
         de pedir uma proposta?" (tratar objeção ou descartar)
       - Se TALVEZ: "Me fala o que ficou em aberto pra eu resolver
         antes de investir tempo em proposta."
```

`[a validar com Carol: wow moments específicos que hoje mais fecham demo]`

### 5.6 Pós-demo — campos obrigatórios em P4

Logo após a demo (mesmo dia, máximo D+1):

- `Status demo` * — `Realizada com aceite | Realizada sem aceite | No-show`
- `Data da demo realizada` *
- `Dor confirmada` * (checkbox — reconfirma ou ajusta a dor inicial)
- `Aceite verbal` (checkbox — obrigatório via FC-04 se `Status = Realizada com aceite`)
- `Contagem de reagendamentos` (útil para futuras regras EXT-05)

**Gate F-Proposta (para avançar P4 → P5):**
1. `Status demo = Realizada com aceite`
2. `Aceite verbal = true`
3. `Dor confirmada = true`

**Sem os 3, Pipefy NÃO deixa mover** — previne proposta sem demanda clara.

### 5.7 Como pedir aceite verbal sem soar forçado

> _"João, antes de eu investir tempo montando uma proposta específica pra Burguer Master, só queria ter certeza: hoje, se o que a gente discutiu aqui virar uma proposta com número e prazo realistas, você se vê comprando? Não precisa dizer 'sim eu compro' — mas um 'sim faz sentido receber' já é suficiente pra eu dedicar o tempo."_

**Se o prospect diz "sim, manda":** você tem aceite verbal (marca no card).
**Se o prospect diz "vou olhar, depende":** **não é aceite verbal**. Marque `Status = Realizada sem aceite` e descubra o que falta (possivelmente volta pra nutrição ou descarte).

### 5.8 Tratamento de no-show

Se o decisor não aparece:
1. Esperar 10 min e mandar WhatsApp: _"João, sem stress. Te reagendo ou prefere outro momento?"_
2. Em 1h, se silêncio: ligar.
3. 1 reagendamento OK. 2º reagendamento sobe atenção. 3 no-shows → descarte (motivo 9) ou nutrição.
4. Campo `Contagem de reagendamentos` no Pipefy atualiza a cada reagendamento.

---

## 6. S5 — Proposta: Construção, envio, follow-up

### 6.1 Objetivo

Converter o aceite verbal em aceite formal registrado, com valor e escopo claros, dentro de 15 dias.

### 6.2 Montagem da proposta (PDD §5 R11-R18, §15)

**Campos Pipefy em P5:**

| Campo | Tipo | Origem |
|---|---|---|
| `Data proposta enviada` * | date | Você |
| `Proposta (anexo)` | attachment | PDF para FS, pular para QS |
| `Preço base (R$)` * | currency | Planilha interna de precificação (confidencial) `[a confirmar com Carol]` |
| `Margem aplicada (%)` * | number | Tabela interna |
| `Desconto (%)` | number | Até 15% sem aprovação. >15% dispara **A-12** (alerta Gestão) |
| `Valor proposto final (R$)` * | currency | `Preço base × (1+margem/100) + setup + assessoria + fidelidade` |
| `MRR (R$)` * | currency | Recorrente mensal |
| `Módulos contratados` * | checklist | ERP, PDV/Go, Smart POS, KDS, Delivery, Inteligência, Manager, Brain, Setup-as-a-Service, Retainer de Performance |
| `Aceite proposta` * | checkbox | **Gate absoluto F-Fechamento** |

### 6.3 Proposta QS (transacional) — mensagem simples

Modelo para WhatsApp / e-mail curto após a demo:

> _"João, conforme combinado, segue a proposta pra Burguer Master:_
>
> _**Módulos:** ERP + NXZ Go PDV (2 unidades) + KDS + Delivery_
> _**MRR:** R$ {mrr}/mês_
> _**Setup único:** R$ {setup} (implantação + treinamento da equipe)_
> _**Prazo de go-live:** {n} dias úteis após fechamento._
>
> _Documento completo com termos em anexo. Qualquer dúvida me chama."_
>
> _"Nossa janela de decisão pra esses números é {15 dias}. Posso te ligar na sexta (D+4) pra ver como está a avaliação?"_

### 6.4 Proposta FS (consultiva) — estrutura do PDF `[template a confirmar com Carol]`

```
Capa         | Logo + "Proposta Comercial para {Empresa}" + data
Pág 1        | Resumo executivo (3-5 linhas do diagnóstico)
Pág 2-3      | Diagnóstico — dor, impacto, status atual
Pág 4        | Solução proposta — módulos e papéis
Pág 5        | Rollout — cronograma de 3-6 meses com milestones
Pág 6        | Preço — MRR + setup + condições de reajuste
Pág 7        | Cases similares — [validar com Carol quais podem citar]
Pág 8        | Próximos passos + data de resposta
Última       | Contato + assinatura
```

### 6.5 Cadência de follow-up (PDD §6.2)

| Dia | Ação | Automação | Template |
|---|---|---|---|
| D+0 | Envio da proposta | manual | — |
| D+3 | E-mail de follow-up | **A-08** | **ET-04** "conseguiu avaliar a proposta?" |
| D+7 | Alerta ao Ops responsável | automação interna | — (toque humano WhatsApp) |
| D+15 | Decisão — aceite, rejeição ou descarte | — | — |

**Regra:** sem aceite em D+15, card vai para descarte (motivo 7 "Preço acima do aceito" ou 5 "Projeto adiado/congelado" ou 3 "Sem orçamento").

### 6.6 Regra de desconto (A-12)

- Desconto ≤ 15% → Ops aprova sozinho.
- Desconto > 15% → **A-12 dispara aprovação Gestão**. Card espera aprovação antes de enviar proposta ao prospect.

**Não quebre essa regra** — desconto não autorizado gera ruído com Financeiro na hora do contrato.

### 6.7 Objeções típicas em S5 Proposta `[v1: inferência; validar com Carol]`

| Objeção | Resposta sugerida |
|---|---|
| **"Tá caro"** | "Comparado a quê, João? Se for comparado com maquininha isolada, sim. Se for comparado com perder {X horas/mês} conciliando e {Y erros/mês} de cozinha errada, quero te mostrar a conta inversa." |
| **"Vou perder dados na migração"** | "Migração assistida é parte do Setup-as-a-Service. Fazemos carga inicial do seu estoque e cadastro de produtos, e rodamos 2 semanas em paralelo com o sistema atual antes de cortar. Risco zero." |
| **"Minha equipe não vai aprender"** | "Nossa interface foi desenhada pra operador de FS que não é técnico — o Totem e o PDV têm 2-3 botões principais. Treinamento de 2h cobre 80% do caixa, e a gente fica com suporte próximo nos primeiros 30 dias." |
| **"Preciso falar com meu sócio"** | "Perfeito. Quer que eu faça uma demo express pra ele também? 15 min. Ou mando um resumo em 1 pág que você pode compartilhar — o que preferir?" |
| **"Só preciso de maquininha"** | "Entendi. A Nexuz não é maquininha — é uma plataforma que **centraliza** PDV+KDS+delivery+financeiro. Se você só quer pagamento, a gente se despede amigavelmente e te recomenda Stone/PagSeguro. Se em 6 meses mudar o cenário, a gente volta a conversar." (quando for o caso, descarte honesto) |
| **"Quero só o Totem"** | "Totem faz sentido, mas ele fica cego sem ERP por trás — o pedido vai pra onde? Posso te mostrar o caminho mínimo: ERP + Go Totem. Dá pra começar assim e expandir depois." |
| **"Tenho contabilidade própria"** | "Perfeito. Nosso ERP integra com ECD/EFD e seu contador continua usando o sistema dele. A gente só manda os dados prontos — ele nem precisa aprender nossa tela." |
| **"E se cair a internet?"** | "NXZ Go PDV e Smart POS têm modo offline: continua vendendo, sincroniza quando voltar. Totem depende de rede — e pra isso a gente recomenda 4G backup barato." |
| **"E multi-unidade?"** | "Essa é nossa praia. ERP unifica faturamento de todas, KDS por unidade, relatórios consolidados por grupo. Tem cliente nosso operando com {X unidades} hoje (No. Coffee). `[validar case]`" |
| **"LGPD / fiscal"** | "Infra Oracle Cloud em compliance, nota fiscal homologada SAT+NFCe, suporte a MEI/SN/LP/LR/LG, dados do consumidor tratados por consentimento no Totem. Documento técnico em anexo na proposta." |
| **"Tempo de implantação"** | "QS pequeno: 5-10 dias úteis. FS multi-unidade: 30-45 dias. Setup-as-a-Service é parte do contrato e tem gerente dedicado." |
| **"Integra com iFood e Rappi?"** | "Integra direto via NXZ Delivery. Pedido cai no KDS já categorizado por canal. Zero retrabalho." |
| **"E o Pay Go, vale a pena?"** | "Depende. Se sua margem de maquininha hoje tá em X%, Pay Go integrado baixa pra Y% e elimina conciliação. Te mando o cálculo." `[a confirmar margens]` |
| **"Quero testar antes"** | "Posso agendar uma visita presencial no seu estabelecimento com tablet configurado simulando 1 dia de operação. Não é trial, é prova de conceito de meio dia." `[confirmar se Carol faz isso]` |
| **"Vou pensar e te dou retorno"** | "Combinado. Só pra eu respeitar seu tempo e o meu: qual seria a janela razoável pra voltarmos a falar? Quinta-feira? Ou na outra semana?" (sempre amarrar próxima data) |

---

## 7. S6 + S7 — Fechamento e GANHO

### 7.1 Objetivo

Converter aceite proposta em contrato assinado e pagamento confirmado, com orquestração entre Ops, Financeiro e Gestão. SLA total: 10 dias.

### 7.2 Campos Pipefy em P6

| Campo | Responsável | Observação |
|---|---|---|
| `CNPJ` * | Ops | 14 dígitos, sem máscara. R33 valida unicidade. |
| `Razão social` * | Ops | Confere com CNPJ |
| `Boleto emitido` | Financeiro | T-17 RACI |
| `Pagamento confirmado` * | **Financeiro** | Checkbox — dispara A-13 se contrato=true |
| `Contrato assinado` * | **Gestão** | Checkbox — dispara A-13 se pgto=true |

### 7.3 Fluxo de orquestração

```
Ops: coleta CNPJ + razão social → preenche no card
     │
     ├─→ @Financeiro mention no card: "pedir boleto"
     │      │
     │      └─→ Financeiro emite boleto (SLA 5 dias úteis)
     │          marca `Boleto emitido = true`
     │          após pagamento, marca `Pagamento confirmado = true`
     │
     └─→ @Gestão mention: "envia contrato"
            │
            └─→ Gestão envia contrato DocuSign (SLA 3 dias úteis)
                após assinatura, marca `Contrato assinado = true`

Quando pgto=true AND contrato=true → A-13 move card auto para P7 GANHO
```

### 7.4 Gates F-Fechamento → F-GANHO

Para `A-13` disparar e mover o card para GANHO:
- `CNPJ` preenchido (R31 — 14 dígitos válidos)
- `Razão social` preenchida
- `Pagamento confirmado = true`
- `Contrato assinado = true`

**Sem as 4 condições, o card fica em P6** — não force, não bypasse.

### 7.5 Exemplo de conversa de fechamento

```
Ops:    João, show que você topou! Pra dar sequência, preciso de 2 coisas
        rápidas:
        1. CNPJ da Burguer Master (os 14 dígitos)
        2. Qual CNPJ assina o contrato (se diferente do operacional)
João:   12.345.678/0001-90
Ops:    Anotado. Agora vou pedir pra Luana (Financeiro) emitir o boleto
        do setup + primeira mensalidade. Ela te manda hoje no e-mail
        financeiro@burguer.com certo?
        Em paralelo, o Guilherme (Gestão) te envia o contrato DocuSign
        amanhã. Te guio em tudo — quando bater dúvida, grita.
```

**No card:**
- [ ] CNPJ: `12345678000190`
- [ ] Razão social: `Burguer Master Ltda.`
- [ ] @Luana Financeiro: "pedir boleto"
- [ ] @Guilherme Gestão: "enviar contrato"

### 7.6 Pós-GANHO — Handoff para Implantação (PDD §R40)

Quando A-13 move card para P7, **automaticamente** é gerado o **pacote de handoff**:
- Dados fiscais (CNPJ, Razão social)
- Módulos contratados
- Dor confirmada
- MRR + Valor proposto final
- Ops responsável (histórico)
- Prazo acordado
- Data de Ganho

**Além do pacote automático, Ops faz um handoff verbal:**

> _"Matheus, manda 5 min tua? Esse é o João da Burguer Master — gente de boa, bateu bem comigo no processo. Ele tem 2 unidades, dor de delivery + cozinha, contratou ERP + Go PDV + KDS + Delivery. A operação dele pega forte de 11h às 14h e de 19h às 23h, então o treinamento idealmente acontece entre 15h e 18h. O João prefere WhatsApp, e o decisor do dia-a-dia é o gerente de operação Marcos (coloquei o telefone no card)."_

**Checklist de handoff verbal:**
- [ ] Dor principal reforçada (o que NÃO pode dar errado)
- [ ] Janela preferencial de contato
- [ ] Canal preferido do decisor
- [ ] Particularidades do prospect (humor, estilo, "flags")
- [ ] Cases similares que Implantação pode referenciar
- [ ] Datas-chave (abertura de nova unidade, campanha planejada)

---

## 8. Banco de Objeções — Suíte Completa

> Fonte: inferência baseada em briefings v1.0 NXZ Go Sales/PDV/Totem/Smart POS/ERP + persona v0.2. `[v1 a validar com Carol]`

### 8.1 Objeções de etapa S2 Qualificação

Ver **seção 4.7**.

### 8.2 Objeções de etapa S3/S4 Demo

| Objeção | Resposta | Aterragem |
|---|---|---|
| "Demo não vai mostrar minha realidade" | "Concordo. Por isso eu preparo sandbox com dados do seu segmento. Se depois da demo você achar que não bateu, eu paro aqui." | Personalização |
| "Não tenho 30 min" | "Vou 15 e só mostro os 3 wow moments. Se você quiser mais, a gente estende. Se não, pausa aí." | Demo QS |
| "Manda vídeo gravado" | "Posso mandar, mas o engajamento cai pra 10-15%. Prefere investir 15 min ao vivo pra eu já responder suas dúvidas do seu caso específico?" | Compromisso |

### 8.3 Objeções de etapa S5 Proposta

Ver **seção 6.7** (14 objeções).

### 8.4 Objeções de etapa S6 Fechamento

| Objeção | Resposta | Aterragem |
|---|---|---|
| "Quero travar o preço por 2 anos" | "Contrato padrão é 12m com reajuste IGP-M. 24m dá travar mediante análise da Gestão — te volto em 1 dia útil." | Escalar |
| "Preciso de cláusula de saída antecipada" | "Tem cláusula padrão de 30d de aviso. SLA de churn-save antes." | Contrato |
| "Setup é muito alto" | "Setup cobre migração + treinamento + gerente dedicado 30d. Se quiser, a gente divide em 2x sem juros." | Negociar forma |
| "Posso pagar só depois de 1 mês testando?" | "O contrato prevê um período de adaptação. Pagamento inicial é pro setup + 1º mês. Se em 30d não rodar, o Relacionamento escala churn-save." | Alinhar expectativa |

---

## 9. S8 Descarte e Nutrição

### 9.1 9 Motivos fixos de descarte (PDD §13)

| # | Motivo | Campo condicional | Janela de reengajamento sugerida |
|---|---|---|---|
| 1 | Fora de ICP | — | Não reabrir (ou só se pivotar) |
| 2 | Faturamento abaixo | — | 6 meses (mercado muda) |
| 3 | Sem orçamento no momento | — | 3 meses |
| 4 | Tem sistema atual, sem intenção de trocar | — | 12 meses ou quando sistema atual romper contrato |
| 5 | Projeto adiado/congelado | — | 3 meses |
| 6 | Perdeu pra concorrente | `Qual concorrente` * (FC-05) | 6 meses |
| 7 | Preço acima do aceito | — | 6 meses |
| 8 | Não viu valor / fit técnico | — | Aprendizado — reabrir só se produto evoluiu |
| 9 | Sumiu / sem resposta | `Último canal tentado` * (FC-06) | 3 meses |
| 10 | Nutrição expirada | — | Auto após pipe Nutrição (futuro) |

**Regra R29:** card em P8 **nunca é reaberto**. Reengajamento = novo card com link ao anterior nas notas.

### 9.2 Nutrição (pipe paralelo futuro; v1 = marcação no card)

- Ciclo 1 (30d): e-mail D+7 + e-mail D+15.
- Revisão D+30: decide se passa pro ciclo 2 ou descarta.
- Ciclo 2 (30d): nova rodada.
- Revisão D+60: decide descarte ou tentativa final.
- Auto-descarte D+67 se sem reação → motivo 10.

### 9.3 Como registrar descarte no Pipefy

1. Mover card para P8.
2. Preencher `Motivo descarte` * (1 dos 9).
3. Preencher campos condicionais:
   - Motivo 6 → `Qual concorrente`.
   - Motivo 9 → `Último canal tentado`.
4. `Observação descarte` (texto livre, rico em aprendizado).
5. `Data descarte` (auto A-DESC-TS).

### 9.4 Reengajamento após descarte — como abordar

**Motivo 3 (sem orçamento), 3 meses depois:**
> _"Oi, João. Carol aqui — falamos há 3 meses sobre a Burguer Master. Na época o orçamento tava apertado. Reabrindo o contato só pra saber como andam as coisas por aí — me responde 1 linha?"_

**Motivo 4 (tem sistema, sem intenção), 12 meses depois:**
> _"Oi, João. Lembra da gente? Mais de 1 ano se passou — e muita coisa mudou aqui na Nexuz. Queria ver se hoje faz sentido uma conversa nova, sem compromisso. Te respondo rápido?"_

**Motivo 6 (concorrente), 6 meses depois:**
> _"Oi, João. Sei que vocês escolheram a {concorrente} 6 meses atrás. Queria só saber: como tá a experiência? Se algo tá rolando bem e vocês estão felizes, fico feliz também. Se algo tá ruim, me conta — talvez a gente possa conversar."_

---

## 10. Mapa de Referência Rápida — Etapa × Pipefy

> Imprima esta tabela. É o resumo que você consulta durante o dia.

| Etapa | Fase Pipefy | Gate saída | Campos obrigatórios saída | Automações/Templates disparados |
|---|---|---|---|---|
| S1 Novo Lead | P1 Novo Lead | GT-01: Ops responsável | Start Form (Nome, E-mail, Fone, Empresa, Origem, Canal) + condicionais | A-14 (feedback indicador D+7); A-LEAD-TS |
| S2 Qualificação | P2 Qualificação | Checklist 6/6 | 6 checkboxes + Faturamento + Nº unidades + Dor + Urgência + Decisor vinculado | A-01 (Data MQL); A-02 (Data SAL); A-04 ET-01 D+1; A-05 ET-02 D+3; A-06 ET-03 D+7 |
| S3 Demo Agendada | P3 Demo Agendada | F-Demo (6 gates) | Cliente+Contatos vinculados, Data demo, Tipo QS/FS, Condutor, Decisores presentes | — |
| S4 Pós-demo | P4 Pós-demo | F-Proposta | Status demo, Aceite verbal (FC-04), Dor confirmada, Data demo realizada | — |
| S5 Proposta | P5 Proposta | F-Fechamento | Data envio, Preço base, Margem, Valor final, MRR, Módulos, Aceite proposta | A-08 ET-04 D+3; A-12 se desconto >15% |
| S6 Fechamento | P6 Fechamento | F-GANHO (4 campos) | CNPJ, Razão social, Pagamento=true, Contrato=true | A-13 move auto p/ P7 |
| S7 GANHO | P7 GANHO | Terminal | — | A-03 (Data Ganho); pacote handoff R40 |
| S8 Descarte | P8 DESCARTE | Terminal | Motivo (1 de 9) + condicional FC-05/FC-06 | A-DESC-TS |

---

## 11. Templates de Comunicação

### 11.1 E-mails automáticos do Pipefy (ET-01 a ET-04)

**ET-01 — Qualificação D+1** (A-04, dispara 1 dia após criação do card em P2)

> **Subject:** `{{empresa}}, que bom te conhecer`
> **From:** `{{ops_responsavel_nome}} · Nexuz`
>
> Olá {{nome_contato}},
>
> Meu nome é {{ops_responsavel_nome}} e cuido das novas oportunidades aqui na Nexuz. Ontem recebemos o seu interesse sobre a **{{empresa}}** e fico feliz de iniciar essa conversa.
>
> Posso te chamar no {{canal_preferido}} hoje ou amanhã em algum horário que funcione bem pra você?
>
> Abraço,
> {{ops_responsavel_nome}}
> Nexuz — Tecnologia para Food Service

**ET-02 — Qualificação D+3** (A-05)

> **Subject:** `{{nome_contato}}, um insight que pode ajudar a {{empresa}}`
>
> Olá {{nome_contato}},
>
> Seguindo nossa conversa, preparei um panorama rápido de como operações de Food Service na escala da **{{empresa}}** costumam ganhar visibilidade de margem e eficiência na cozinha ao centralizar PDV + KDS + gestão em uma só camada.
>
> Se fizer sentido, consigo montar uma demo de 30 minutos focada no seu contexto — me responde por aqui ou no {{canal_preferido}} com 2 horários que funcionam pra você.
>
> Abraço,
> {{ops_responsavel_nome}}

**ET-03 — Qualificação D+7 (break-up)** (A-06)

> **Subject:** `{{nome_contato}}, última tentativa esta semana`
>
> Olá {{nome_contato}},
>
> Essa é a minha última tentativa por enquanto — daqui a pouco eu fecho esse caso pra não ficar te incomodando. Se ainda fizer sentido conversar sobre operação e tecnologia pra **{{empresa}}**, me responde até sexta?
>
> Caso não seja o momento certo, tudo bem também — responde qualquer coisa que eu tiro do radar. Vou lembrar de você pra reabrir em 90 dias, ok?
>
> Abraço,
> {{ops_responsavel_nome}}

**ET-04 — Proposta D+3 follow-up** (A-08)

> **Subject:** `{{nome_contato}}, conseguiu avaliar a proposta?`
>
> Olá {{nome_contato}},
>
> Te enviei a proposta comercial há 3 dias e queria saber se conseguiu dar uma olhada com o time. Estou à disposição para:
> - Esclarecer qualquer ponto da proposta
> - Ajustar escopo ou prazo se precisar
> - Demo adicional com outro decisor
>
> Valor total proposto: **R$ {{valor_proposto_final}}** (MRR de R$ {{mrr}}).
>
> Me responde por aqui ou no {{canal_preferido}} quando for possível.
>
> Abraço,
> {{ops_responsavel_nome}}

**Janela de envio:** Seg-Sex, 9h-18h BRT (R36). Sender com SPF/DKIM configurados (em v1 e-mail padrão Nexuz; em produção subdomínio `comercial@comunica.nexuz.com.br`).

### 11.2 Templates de WhatsApp (canal primário) `[a criar/automatizar v2]`

**WhatsApp não tem automação no Pipefy v1** — você envia manualmente. Sugestões para a equipe salvar como quick reply:

- **Follow-up S2 D+2:** _"{nome}, te chamei no e-mail também mas quis vir por aqui que normalmente é mais prático. Tem 10 min essa semana?"_
- **Confirmação de demo D-1:** _"{nome}, confirmado nossa demo amanhã às {hora}? Te mando o link 10 min antes. Qualquer coisa grita aqui."_
- **Follow-up pós-demo D+1:** _"{nome}, valeu pelo papo de ontem! Tô preparando a proposta exatamente nos termos que conversamos. Mando até {data}."_
- **Follow-up proposta D+2:** _"{nome}, já deu pra olhar a proposta? Qualquer dúvida me chama."_
- **Fechamento D-1:** _"{nome}, boleto chega pro e-mail financeiro hoje. Contrato vai assinar pelo DocuSign pelo endereço do sócio. Me avisa se der problema."_

### 11.3 Mensagens de handoff interno (nas notas do card)

**Pedido de boleto (Ops → Financeiro):**
> _"@Luana: card fechou. CNPJ `12.345.678/0001-90` Burguer Master Ltda. Módulos ERP+GoPDV+KDS+Delivery. Setup `R$ X`, MRR `R$ Y`. Pode emitir boleto e-mail `financeiro@burguer.com`? Abraço."_

**Pedido de contrato (Ops → Gestão):**
> _"@Guilherme: contrato padrão 12m, módulos ERP+GoPDV+KDS+Delivery, MRR R$ Y, setup R$ X, desconto {z}%. Signatário: João Silva (sócio principal) e-mail `joao@burguer.com`. Prazo assinatura: 3d úteis."_

**Handoff para Implantação (Ops → Matheus/Relacionamento):**
> Ver **seção 7.6**.

---

## 12. Checklist Diário de Sales-Ops ("Meu Dia")

> O que olhar **toda manhã** no Pipefy (PDD §14.1 Dashboard "Meu Dia").

### 12.1 Rotina da manhã (15 min)

- [ ] **Cards em P1 Novo Lead sem Ops responsável** — atribuir imediatamente (GT-01).
- [ ] **Inbounds chegados nas últimas 12h** — responder até as 11h (SLA 2h úteis).
- [ ] **Leads em P2 em D+1, D+3, D+7** — validar se cadência automática rodou + toque humano WhatsApp.
- [ ] **Demos agendadas hoje** — revisar cards, preparar ambiente, confirmar presença.
- [ ] **Demos de ontem sem P4 preenchido** — preencher Status + Aceite + Dor confirmada hoje.
- [ ] **Propostas em D+3, D+7, D+15** — follow-up (D+3 automático, D+7 WhatsApp, D+15 decisão).
- [ ] **Fechamentos pendentes há >5 dias** — escalar com Financeiro/Gestão.
- [ ] **Indicações em D+5** — antecipar feedback ao indicador antes de D+7 (A-14).

### 12.2 Rotina da tarde

- [ ] Fechar todas as demos do dia no Pipefy ANTES de sair.
- [ ] Revisar cards com alerta de SLA estourado (PDD §10).
- [ ] Preparar proposta(s) do dia seguinte.

### 12.3 Métricas que Ops acompanha (PDD §14)

| Indicador | Como medir | Benchmark `[v1]` |
|---|---|---|
| Taxa de conversão MQL→SAL | SAL / MQL | `[calibrar D+30]` |
| Taxa SAL→Ganho | Ganho / SAL | `[calibrar D+30]` |
| Tempo médio Lead→Ganho | média de dias S1→S7 | `[calibrar]` |
| Taxa de no-show em demo | no-shows / total demos | <10% é bom |
| Valor médio de proposta | média `Valor proposto final` | `[calibrar]` |
| Taxa descarte motivo 9 (sumiu) | motivo 9 / total descartes | <30% é bom |

### 12.4 Quando escalar para Gestão

- Desconto > 15% solicitado (A-12 automático).
- Card parado no mesmo fase >200% do SLA.
- Objeção jurídica/contratual (cláusula atípica).
- Faturamento declarado >> ICP típico (big deal — Gestão participa da proposta).
- Perda para concorrente duas vezes seguidas no mesmo perfil — sinalizar para analisar posicionamento.

---

## Terminologia e Glossário

### Vendas / Processo

- **PDD** — Process Design Document. O processo canônico de vendas da Nexuz (PDD-NXZ-VENDAS-001 v1.0).
- **Checklist Binário** — Os 6 itens que precisam estar `true` para sair de S2 Qualificação (Gate F-Qualificação).
- **MQL / SAL** — Marketing-Qualified Lead / Sales-Accepted Lead. MQL entra em P2, SAL sai de P2 com Checklist 6/6.
- **POD** — Proof of Delivery. Marcos do funil registrados automaticamente (Data MQL, Data SAL, Data Ganho).
- **Gate** — Regra que impede avanço de fase. F-Qualificação, F-Demo, F-Proposta, F-Fechamento, F-GANHO.
- **GT (Gate Técnico)** — Validação técnica que Pipefy impõe (GT-01, GT-11).
- **FC (Field Condition)** — Condição que torna campo obrigatório (FC-01 LGPD, FC-02 Quem indicou, etc.).
- **Cadência** — Sequência programada de toques (4 em 8d em S2; 3 em 15d em S5).
- **Aceite verbal** — Gate absoluto em S4 para avançar para proposta.
- **Aceite proposta** — Gate absoluto em S5 para avançar para fechamento.
- **Handoff R40** — Pacote de dados passado automaticamente para Implantação no GANHO.

### Pipefy

- **Pipe** — Workflow. Neste caso "Vendas" com 8 phases.
- **Phase** — Fase do pipe (P1 a P8).
- **Card** — Oportunidade / deal. Um deal = um card.
- **Connector** — Campo que aponta para outro DB (ex: Cliente vinculado → DB Clientes).
- **Start Form** — Formulário de entrada do card em P1.
- **A-01 a A-16** — Automações configuradas no pipe.
- **ET-01 a ET-04** — Email Templates configurados.

### ICP / Segmento

- **QS** — Quick Serve. Operação simples, decisão rápida.
- **FS** — Full Service. Operação completa, venda consultiva.
- **Zona de fronteira** — Entre QS e FS.
- **Fora ICP** — Não atende ao perfil.

### Food Service (setor)

- **Ticket médio** — Valor médio por pedido.
- **DRE** — Demonstração do Resultado do Exercício (financeiro).
- **Adquirente** — Stone, Cielo, PagSeguro, SumUp, Getnet, etc.
- **NCM / CFOP** — Classificações fiscais.
- **ECD / EFD** — Obrigações fiscais digitais.
- **SAT / NFCe** — Equipamentos/formatos de nota fiscal.
- **Multi-unidade** — Operação em mais de 1 endereço.
- **Franquia** — Multi-unidade com marca licenciada.
- **Delivery próprio vs. agregador** — Operação de delivery pela casa vs. iFood/Rappi.

### Produtos Nexuz

- **NXZ ERP** — Motor de gestão (Odoo 12) — backend obrigatório da suíte.
- **NXZ Go** — App/totem de autoatendimento. **3 modos:** Totem (cliente), PDV (caixa), Smart POS (operador móvel).
- **NXZ KDS** — Kitchen Display System. **Sistema separado** — nunca apresentar como "modo do NXZ Go".
- **NXZ Delivery** — Centralizador de canais delivery (iFood, Rappi, NXZ Go).
- **NXZ Pay Go** — Pagamento mobile integrado.

---

## Cross-References

- **§4 Qualificação → NXZ ERP**: produto vendido, backend obrigatório. Qualifica presença de gestão financeira/fiscal/estoque.
- **§4, §5 → NXZ Go (Totem/PDV/Smart POS)**: 3 modos. Demo segmenta por operação do prospect. [Ver: `context/(v_1.0) Briefing de Contexto - NXZ Go - Sales - Operacional.md`]
- **§5 Demo → NXZ KDS**: apresentar quando dor = "cozinha errada" ou "pedido demorado". [Ver: `context/(V_0.1) NXZ KDS.md`]
- **§5, §8 → NXZ Delivery**: apresentar quando prospect usa iFood/Rappi.
- **§5, §6 → NXZ Pay Go**: upsell em S5 — `[a confirmar posicionamento exato com Carol]`.
- **§7 Fechamento → Implantação/Relacionamento**: handoff cross-departamento.
- **§12 Checklist diário → PDD §14.1 "Meu Dia"**: instrumentação operacional — mesmo conceito, dashboards diferentes (PDD fala em BI, aqui adaptado para operação no Pipefy).

---

## Anti-Patterns — o que NUNCA fazer

1. **Agendar demo sem Checklist Binário 6/6.** Gera demo frustrada e cadência sem fundamento.
2. **Avançar card sem gate.** Pipefy bloqueia na saída, mas se você editar manualmente, quebra o funil downstream.
3. **Enviar proposta sem aceite verbal.** Perde tempo do Ops e do cliente. Gate F-Proposta existe por isso.
4. **Oferecer desconto >15% sem aprovação A-12.** Gera atrito com Gestão e Financeiro no contrato.
5. **Tratar NXZ KDS como "modo do NXZ Go".** KDS é produto separado — sempre vender como tal.
6. **Esquecer consentimento LGPD em inbound.** FC-01 torna obrigatório — respeitar.
7. **Pular feedback ao indicador.** A-14 envia alerta em D+7 — responder antes gera confiança e mais indicações.
8. **Enviar e-mail fora da janela 9h-18h Seg-Sex.** R36 — automação já respeita, manual deve respeitar também.
9. **Deixar card em P6 sem CNPJ válido >3 dias.** Bloqueia GANHO e gera ruído com Financeiro.
10. **Reabrir card em P8 Descarte.** R29 é clara — novo card, sempre. Perde histórico se reabrir.

---

## Nota Final

Este playbook é **v1 pragmático** — construído a partir do PDD v1.0 canônico, do design do Pipe Pipefy v1 e dos briefings v1.0 por módulo.

**O que ainda precisa ser complementado em v2** (marcações `[a confirmar com Carol]` no texto):

1. Critérios numéricos de ICP (§2.1).
2. Scripts reais que o time usa hoje (§3.4, §4.3).
3. Wow moments específicos de demo QS e FS (§5.5).
4. Template oficial do PDF de proposta FS (§6.4).
5. Tabela de preços operacional (§6.2).
6. Banco de objeções reais do campo (§6.7 e §8).
7. Cases citáveis além de No. Coffee (§5.5, §6.7).
8. Gatilhos de urgência validados (§4.3).
9. Templates de WhatsApp oficiais com quick-reply (§11.2).
10. Posicionamento de NXZ Pay Go (§6.7).

Recomendação: após 30 dias de operação no Pipefy (D+30 conforme PDD §8), fazer revisão deste playbook com Carol e equipe, substituindo todas as marcações `[a confirmar]` pelo conteúdo real do campo.
