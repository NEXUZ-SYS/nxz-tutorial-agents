---
id: notify-reviewer
agent: publisher
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/test_results.json
outputFile: squads/nxz-faq-chatwoot/output/notification-log.json
---

# Notificacao para Revisora

## Objetivo

Enviar notificacao via Telegram para Carol Oliveira informando que as FAQs
e o relatorio de testes estao prontos para revisao.

## Instrucoes

1. Leia o indice de FAQs (faqs_index.md) para contar o total
2. Leia os resultados do teste (test_results.json) para obter a taxa de acerto
3. Carregue variaveis do .env (TELEGRAM_BOT_TOKEN, TELEGRAM_NOTIFY_CHAT_ID)
4. Construa a mensagem seguindo a skill telegram-notify:

```
*Checkpoint: nxz-faq-chatwoot*
{N} FAQs prontas para revisao.

Taxa de acerto do agente: {X}%
Produtos cobertos: {lista}

Aguardando sua aprovacao no terminal.
```

5. Envie via Telegram Bot API
6. Verifique resposta ok: true
7. Registre no log

## Formato de Saida (notification-log.json)

```json
{
  "notification_date": "YYYY-MM-DDTHH:mm:ss",
  "recipient": "Carol Oliveira",
  "chat_id": "TELEGRAM_NOTIFY_CHAT_ID",
  "message_sent": true,
  "faqs_count": 15,
  "test_accuracy": 45.0
}
```

## Fallback

Se o Telegram falhar, registre o erro e continue para o checkpoint.
O checkpoint funciona independente da notificacao.
