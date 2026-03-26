---
id: checkpoint-config
type: checkpoint
outputFile: squads/nxz-faq-chatwoot/output/run-config.md
---

# Checkpoint: Configuracao da Execucao

Colete as informacoes necessarias para executar o squad de FAQs.

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

## Notificacao Telegram

Apos coletar e salvar todas as configuracoes em `output/run-config.md`, envie
uma notificacao Telegram informando que o pipeline foi iniciado e esta aguardando
confirmacao de configuracao.

Execute o seguinte comando para enviar a notificacao:

```bash
source .env && node -e "
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;
const text = encodeURIComponent('*Checkpoint: nxz-faq-chatwoot*\nEtapa: Configuracao da Execucao\n\nO pipeline foi iniciado e as configuracoes foram salvas.\n\nArquivo para revisao: \`squads/nxz-faq-chatwoot/output/run-config.md\`\nAguardando sua acao no terminal.');
require('https').get('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatId + '&parse_mode=Markdown&text=' + text, r => r.resume());
"
```

Se o comando acima falhar, use `rtk proxy curl`:

```bash
source .env && rtk proxy curl -s -X POST \
  "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": \"${TELEGRAM_NOTIFY_CHAT_ID}\", \"parse_mode\": \"Markdown\", \"text\": \"*Checkpoint: nxz-faq-chatwoot*\nEtapa: Configuracao da Execucao\n\nO pipeline foi iniciado e as configuracoes foram salvas.\n\nArquivo para revisao: \`squads/nxz-faq-chatwoot/output/run-config.md\`\nAguardando sua acao no terminal.\"}"
```
