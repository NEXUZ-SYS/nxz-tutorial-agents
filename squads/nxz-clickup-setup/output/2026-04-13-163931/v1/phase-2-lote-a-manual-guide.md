# Lote A — Guia Manual: 4 Alertas Time-in-Status

**Lista:** Vendas › CRM › Leads & Deals
**URL:** https://app.clickup.com/3086998/v/l/6-901712879969-1
**Tempo estimado:** ~15 min (4 automações × ~3min)

## Por que manual?
Playwright não conseguiu manter o builder de automação aberto de forma confiável (overlay `cdk-overlay-connected-position-bounding-box` intercepta cliques). Execução manual é 100% confiável.

---

## Fluxo base (repetir para cada uma das 4)

### 1. Abrir o builder
1. Na lista Leads & Deals, clicar botão **Automatizar** (topo, ao lado de "Compartilhar")
2. No painel que abre, clicar **Gerenciar automações** (rodapé do dropdown)
3. Clicar **+ Adicionar automação**

### 2. Configurar Trigger (Acionador)
1. Clicar no campo **Quando...**
2. Escolher **A cada...** (ícone de relógio/agendamento)
3. Selecionar **Diariamente**
4. Horário: **09:00** (padrão já deve estar OK)

### 3. Adicionar Condição 1 — Status
1. Clicar **+ Adicionar condição**
2. Escolher **Status**
3. No dropdown que aparece, marcar **apenas o status específico** (ver tabela abaixo)
4. Clicar fora para fechar

### 4. Adicionar Condição 2 — Time In Status
1. Clicar **+ Adicionar condição**
2. Escolher **Time In Status**
3. No campo numérico, digitar o valor (ex: `48h` ou `16d`)
4. Operador: **Maior que (>)**

### 5. Configurar Action (Ação)
1. Clicar no campo **Então...**
2. Escolher **Adicionar um comentário**
3. No editor de comentário, colar o texto (ver tabela abaixo)
4. Adicionar menção `@responsável` digitando `@` e selecionando o dono do deal

### 6. Salvar
- Clicar **Criar** no rodapé do dialog
- Aguardar toast "Automação criada"
- Voltar ao passo 1 para a próxima

---

## Tabela das 4 automações

| # | Nome | Status | Time In Status > | Comentário |
|---|------|--------|------------------|-----------|
| 1 | Alerta Qualificado sem avanço | `qualificado` | `48h` | `@responsável Lead qualificado há >48h sem avanço. Revisar próximo passo.` |
| 2 | Alerta Primeiro contato estagnado | `primeiro contato` | `16d` | `@responsável Lead em primeiro contato há >16 dias. Considerar mover para Nutrição ou Perdido.` |
| 5 | Alerta Apresentação sem follow-up | `apresentação agendada` | `48h` | `@responsável Apresentação agendada há >48h sem atualização. Confirmar realização e próximos passos.` |
| 7 | Alerta Proposta sem retorno | `proposta enviada` | `7d` | `@responsável Proposta enviada há >7 dias sem retorno. Fazer follow-up ativo.` |

**Nota sobre status:** Os nomes exatos dos status na lista são os configurados na Sessão 1. Verificar grafia exata no dropdown do builder.

---

## Validação após criar todas

1. No painel Automações, tab **Gerenciar**, deve aparecer as 4 entradas
2. Cada uma com toggle **Ativa** ligado
3. Clicar em cada para conferir: trigger = `Diariamente`, 2 condições, action = comentário

## Próximos passos (Lote B/C — adiados)

- **Lote B (6 auto):** mudança de status → set due date, comentário de handoff
- **Lote C (4 auto):** notificações de stage-change para #vendas no Slack/ClickUp Chat

Esses lotes serão replanejados após validarmos o Lote A em produção por 1 semana.
