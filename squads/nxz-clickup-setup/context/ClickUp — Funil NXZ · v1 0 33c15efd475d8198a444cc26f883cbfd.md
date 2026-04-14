# ClickUp — Funil NXZ · v1.0

> **O que é esta página:** Visão operacional do funil de vendas como seria visto no Board View do ClickUp. Cada coluna é um status. Use como referência para entender o fluxo de ponta a ponta. Para a configuração técnica completa, consulte os documentos Doc 1, Doc 2, Doc 3 e Doc 4.
> 

> **Versão atualizada:** Removidas referências a [Make.com](http://Make.com) e WhatsApp. Funil 100% nativo ClickUp. Nutrição operada via e-mail automático do ClickUp.
> 

---

# Board View — Funil NXZ no ClickUp

| Coluna | Cor | Responsável | Gatilho de entrada | Gatilho de saída |
| --- | --- | --- | --- | --- |
| **Qualificado** | Azul | Agent | Score ≥45 + canal identificado + checklist completo | Carol valida checklist e move |
| **Primeiro contato** | Verde | Carol | Carol valida checklist F1 | Fit confirmado + faturamento declarado |
| **Agendamento** | Verde | Carol | Carol valida checklist F2 | Demo realizada + aceite verbal |
| **Apresentação** | Verde | Carol | Checklist F3 completo | Aceite verbal = verdadeiro |
| **Proposta enviada** | Amarelo | Carol | Aceite verbal obrigatório | Aceite da proposta = verdadeiro |
| **Fechamento** | Laranja | Carol + Sabrina + Time | Aceite da proposta | Pagamento + Contrato = verdadeiro |
| **Live** | Verde escuro | Automático | Pagamento + Contrato = verdadeiro | — |
| **Nutrição** | Cinza | Carol | Sem urgência / sem resposta D+15 | Revisão D+30 → score ok → volta ao funil |
| **Perdido** | Vermelho | Carol | Motivo obrigatório preenchido | — |

---

# Coluna 1 — Qualificado

**Responsável:** Agent · **Alimentada:** toda segunda antes das 09h

Um card entra aqui quando o Agent finalizou o enriquecimento e o Lead Score atingiu ≥45 com canal de contato identificado. O card já chega com: nome, cargo, empresa, ICP, canal, sinal de intenção, Reason to Call e Abertura sugerida.

**O que Carol vê aqui:** a lista semanal ordenada por score decrescente. Hot no topo, Warm abaixo.

**Para mover para Primeiro contato — checklist obrigatório:**

- Nome completo preenchido
- Cargo preenchido
- ICP definido (QS ou FS)
- Canal definido
- Lead Score preenchido
- Reason to Call preenchido
- LinkedIn URL preenchido

**Alerta automático ClickUp:** card parado em Qualificado por 48h → e-mail interno para Carol.

---

# Coluna 2 — Primeiro contato

**Responsável:** Carol · **Quando atua:** terça e quarta

Carol entra em contato pelo canal indicado no card usando a Abertura sugerida pelo Agent como ponto de partida.

**Cadência de contato — tudo feito por Carol:**

| Dia | Ação | Canal |
| --- | --- | --- |
| D+0 | Carol — 1º contato com abertura personalizada | LinkedIn ou Email (conforme ICP) |
| D+2 | Carol — follow-up leve: "Só passando pra ver se chegou" | Mesmo canal |
| D+5 | Carol — novo ângulo ou case diferente | Mesmo canal |
| D+8 | Carol — última tentativa: "Deixo aberta a possibilidade" | Mesmo canal |
| D+15 | Alerta ClickUp — Carol move para Nutrição ou Perdido | — |

**Limite:** máximo 4 tentativas. Além disso queima o lead.

**Para mover para Agendamento — checklist obrigatório:**

- Data do 1º contato registrada
- Resposta obtida = marcado
- Fit confirmado = marcado
- Faturamento declarado preenchido
- Decisores mapeados preenchido

**Automação ClickUp nativo:** card parado 16 dias → e-mail interno para Carol: "Lead sem resposta, mova para Nutrição ou Perdido."

**Saídas possíveis:**

- Sem resposta D+15 → **Nutrição** (preencher motivo)
- Sem fit → **Perdido** (preencher motivo)

---

# Coluna 3 — Agendamento

**Responsável:** Carol

Lead respondeu com fit positivo, diagnóstico concluído, decisores mapeados e data de demo confirmada.

**Antes de agendar Carol pergunta:** "Além de você, tem alguém mais que precisa estar?" Se sim → incluir todos desde já.

**Para mover para Apresentação — checklist obrigatório:**

- Data da demo preenchida
- Tipo de demo selecionado (QS ou FS)
- Dor central identificada preenchida
- Número de decisores preenchido

**Automações ClickUp nativo:**

- Status muda para Agendamento → e-mail de confirmação automático ao lead
- Data da demo - 24h → e-mail de lembrete ao lead + alerta interno Carol

**Saídas possíveis:**

- Reagendou 2x → **Nutrição** (preencher motivo)
- Sumiu → **Perdido** (preencher motivo)

---

# Coluna 4 — Apresentação

**Responsável:** Carol · QS: 15–20 min · FS: 45–60 min

**Roteiro QS:** abrir com PDV + autoatendimento → 1 relatório simples → conectar à dor declarada. Não mostrar ERP.

**Roteiro FS:** abrir com NXZ Intelligence → Manager → Setup-as-a-Service. Nunca começar pelo PDV.

**Regra absoluta:** aceite verbal = verdadeiro é obrigatório para avançar. Sem isso, a proposta não é enviada.

**Para mover para Proposta enviada — checklist obrigatório:**

- Demo realizada em (data preenchida)
- Decisores presentes = marcado
- Aceite verbal = verdadeiro
- Dor confirmada na demo preenchida

**Automação ClickUp nativo:** demo realizada + 48h sem atualização → e-mail interno Carol.

**Saídas possíveis:**

- Sem fit real → **Perdido** (preencher motivo)
- Sem urgência → **Nutrição** (preencher motivo)

---

# Coluna 5 — Proposta enviada

**Responsável:** Carol · Proposta só enviada após aceite verbal obrigatório

| ICP | Formato | Canal |
| --- | --- | --- |
| QS | Mensagem simples: módulos + valor + prazo + próximo passo | Email ou LinkedIn |
| FS | PDF consultivo: diagnóstico + solução + case + rollout + data de resposta | Email |

**Cadência de follow-up da proposta:**

| Dia | Quem | Ação |
| --- | --- | --- |
| D+0 | Carol | Proposta enviada |
| D+1 | Carol | "Chegou bem? Ficou alguma dúvida?" |
| D+3 | ClickUp auto | E-mail de follow-up automático ao lead |
| D+7 | Alerta ClickUp | Carol recebe alerta: fazer contato direto |
| D+15 | Carol decide | Nutrição ou Perdido |

Desconto máximo sem aprovação: 15%. Negociar preço ou prazo, nunca módulos.

**Para mover para Fechamento — checklist obrigatório:**

- Data proposta enviada preenchida
- Valor proposto preenchido
- Aceite da proposta = verdadeiro

**Automações ClickUp nativo:**

- D+3 sem resposta → e-mail automático ao lead
- D+7 sem atualização → alerta interno Carol

**Saídas possíveis:**

- Preço bloqueou → **Nutrição** (preencher motivo)
- Desistiu → **Perdido** (preencher motivo)

---

# Coluna 6 — Fechamento

**Responsável:** Carol + Sabrina + Matheus + Luiz · Prazo: ≤ 5 dias úteis do aceite ao contrato assinado

| Passo | Quem | Campo no card | Prazo | Alerta automático |
| --- | --- | --- | --- | --- |
| Coleta de docs | Carol → cliente | CNPJ + Razão social | 48h | ClickUp: docs não recebidos em 48h → e-mail Carol |
| Registro | Carol | Drive + Odoo CRM | Imediato | — |
| Boleto | Carol → Sabrina | Boleto emitido (checkbox) | Mesmo dia | ClickUp: não pago em 5d → e-mail Carol + Sabrina |
| Pagamento | Sabrina confirma | Pagamento confirmado (checkbox) | — | — |
| Contrato | Odoo assinatura digital | Contrato assinado (checkbox) | Após boleto | ClickUp: não assinado em 3d → e-mail Carol |
| Jason | Carol → Matheus | Jason preenchido (checkbox) | Após pagamento | ClickUp: Jason = true → e-mail Matheus |
| Implantação | Matheus → Luiz | Responsável implantação | Prazo acordado | ClickUp: Pagamento + Contrato = true → e-mail Luiz |

**Para mover para Live — checklist obrigatório:**

- CNPJ · Razão social · Certificado digital · CSC · Boleto · Pagamento · Contrato · Jason · MRR · Módulos · Prazo

**Quando Pagamento confirmado = verdadeiro E Contrato assinado = verdadeiro → ClickUp muda status para Live automaticamente.**

---

# Coluna 7 — Live

Contrato assinado + pagamento confirmado → automação do ClickUp move o status para Live. Dashboard de MRR atualizado. Card passa para área de CS (próxima fase do processo).

Carol não precisa fazer mais nada neste card.

---

# Nutrição — Carol opera com e-mail automático do ClickUp

**Quando entra:** sem urgência · sem orçamento · "vou pensar" sem prazo · D+15 sem resposta · reagendou 2x · preço bloqueou

**O que Carol preenche antes de mover — obrigatório:**

- Motivo de nutrição selecionado
- Próxima revisão definida (30 dias à frente)
- Ciclo de nutrição registrado (1 ou 2)

**Cadência de nutrição — 100% ClickUp nativo:**

| Dia | Ação | Ferramenta |
| --- | --- | --- |
| D+0 | Carol move para Nutrição + preenche campos | Manual |
| D+7 | E-mail automático ao lead (template conteúdo NXZ) | ClickUp Email Automation |
| D+15 | E-mail automático ao lead (template case NXZ) | ClickUp Email Automation |
| D+30 | Alerta ClickUp → Carol reavalia score manualmente | ClickUp nativo |
| D+30 | Se score ≥45: Carol move para Primeiro contato | Manual |
| D+30 | Se score < 45 e ciclo = 1: Carol registra Ciclo = 2, nova revisão | Manual |
| D+60 | Revisão ciclo 2: sem evolução → Carol move para Perdido | Manual |

**Máximo 2 ciclos.** Após o segundo sem requalificação → Perdido.

---

# Perdido — Registrar sempre, sem exceção

**Quando entra:** sem fit real · recusou · 4 tentativas sem resposta · bloqueou · 2 ciclos de nutrição sem evolução

**Campos obrigatórios antes de fechar:**

- Motivo de perda: Preço · Sem fit · Sem urgência · Sem resposta · Outro
- Etapa em que foi perdido

**Automação ClickUp nativo:** status = Perdido com motivo vazio → e-mail interno Carol: "Preencha o motivo antes de fechar este card."

Não existe "perdido sem motivo" no funil NXZ. Esse campo é a fonte de aprendizado para ajustar o ICP.

---

# Mapa de Automações — 100% ClickUp Nativo

| O que automatizar | ClickUp Nativo |
| --- | --- |
| Alerta: Qualificado parado 48h | ✅ |
| Alerta: Primeiro contato sem resposta 16 dias | ✅ |
| E-mail confirmação de demo ao lead | ✅ Email ClickApp |
| E-mail lembrete 24h antes da demo ao lead | ✅ Email ClickApp |
| Alerta: Apresentação sem atualização 48h | ✅ |
| E-mail follow-up D+3 da proposta ao lead | ✅ Email ClickApp |
| Alerta: proposta parada 7 dias | ✅ |
| Alerta: docs não recebidos 48h | ✅ |
| Alerta: boleto não pago 5 dias | ✅ |
| Alerta: contrato não assinado 3 dias | ✅ |
| E-mail interno Matheus quando Jason = true | ✅ |
| E-mail interno Luiz quando Pagamento + Contrato = true | ✅ |
| Status muda para Live automaticamente | ✅ |
| Alerta: Perdido sem motivo preenchido | ✅ |
| E-mail nutrição D+7 ao lead | ✅ Email ClickApp |
| E-mail nutrição D+15 ao lead | ✅ Email ClickApp |
| Alerta: revisão de nutrição D+30 | ✅ |

---

# Views a configurar no ClickUp

| View | Tipo | Filtros | Para quem | Quando usar |
| --- | --- | --- | --- | --- |
| Pipeline | Board (Kanban) | Todos os status ativos · excluir Live e Perdido | Carol | Todo dia — visão principal |
| Lista da semana | List | Status = Qualificado · ordenado por Score desc | Carol | Segunda-feira |
| Demos desta semana | Calendar | Campo Data da demo = esta semana | Carol | Quinta-feira |
| Revisão de nutrição | List | Status = Nutrição · Próxima revisão = esta semana | Carol | Sexta-feira |
| Dashboard MRR | Dashboard | Soma MRR adicionado onde Status = Live | Carol + Walter | Semanal |
| Leads perdidos | List | Status = Perdido · agrupado por Motivo | Carol + Walter | Mensal |

---

> **Versão:** v2.0 · Abril de 2026 · Atualizado — 100% ClickUp nativo, sem [Make.com](http://Make.com), sem WhatsApp
> 

> **Configuração ClickUp:** Walter
> 

> **Automações:** Matheus
> 

> **Operação:** Caroline Oliveira
> 

> **Docs relacionados:** Doc 1 (Estados) · Doc 2 (Campos) · Doc 3 (Automações) · Doc 4 (Manual Carol)
>