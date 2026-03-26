---
id: checkpoint-config
type: checkpoint
outputFile: squads/nxz-faq-chatwoot/output/run-config.md
---

# Checkpoint: Configuracao da Execucao

Colete as informacoes necessarias para executar o squad de FAQs.

## Notificacao Telegram (ANTES de perguntar)

Antes de fazer qualquer pergunta ao usuario, envie notificacao Telegram.

Siga o protocolo de notificacao Telegram definido em
`pipeline/data/telegram-notification-protocol.md` com os seguintes parametros:

- ETAPA: "Configuracao da Execucao"
- DESCRICAO: "O pipeline foi iniciado e precisa de configuracoes antes de continuar."
- ARQUIVO: "" (vazio — ainda nao ha arquivo)

## Perguntas

### 1. Qual periodo de conversas analisar?

- Ultimos 15 dias (execucao recorrente)
- Ultimos 30 dias
- Ultimos 90 dias (primeira execucao recomendado)
- Periodo customizado (informar datas)

### 2. Limite de FAQs por produto?

- 5 por produto (primeira execucao, calibragem)
- 10 por produto (execucao padrao)
- Sem limite (gerar todas acima do threshold)

### 3. Em qual portal do Help Center publicar?

O agente listara os portais disponiveis via API do Chatwoot.
Selecione o portal desejado.

### 4. Esta e a primeira execucao deste squad?

- Sim (baseline, sem comparativo com rodada anterior)
- Nao (incluir comparativo com rodada anterior)
