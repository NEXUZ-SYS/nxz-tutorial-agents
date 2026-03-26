---
name: telegram-notify
description: >
  Send notifications via Telegram Bot API. Supports plain text, Markdown,
  and HTML formatted messages. Use when a squad pipeline needs to notify
  someone about checkpoints, completions, errors, or any event that
  requires human attention outside the terminal.
description_pt-BR: >
  Envia notificacoes via Telegram Bot API. Suporta texto puro, Markdown
  e HTML. Use quando o pipeline de uma squad precisar notificar alguem
  sobre checkpoints, conclusoes, erros ou qualquer evento que exija
  atencao humana fora do terminal.
type: prompt
version: 1.0.0
categories: [notifications, messaging, telegram]
env:
  - TELEGRAM_BOT_TOKEN
  - TELEGRAM_NOTIFY_CHAT_ID
  - TELEGRAM_ADMIN_CHAT_ID
---

# Telegram Notify

## When to use

Use this skill when the pipeline needs to send a notification to a person via Telegram. Common scenarios:

- A checkpoint requires human approval (e.g., Carol needs to review FAQs)
- A squad execution completed successfully or failed
- A long-running step finished and someone needs to act on the result
- An error occurred that requires manual intervention

## Prerequisites Check

Before sending, verify the environment variables are configured in the project `.env` file:

```bash
source .env 2>/dev/null
echo "BOT_TOKEN: ${TELEGRAM_BOT_TOKEN:+OK}"
echo "NOTIFY_CHAT_ID: ${TELEGRAM_NOTIFY_CHAT_ID:-NOT SET}"
echo "ADMIN_CHAT_ID: ${TELEGRAM_ADMIN_CHAT_ID:-NOT SET}"
```

If any variable is missing:
- Inform the user which variables are missing
- Guide them: "Add these to your `.env` file:
  ```
  TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
  TELEGRAM_NOTIFY_CHAT_ID=chat_id_of_the_person_to_notify
  TELEGRAM_ADMIN_CHAT_ID=chat_id_of_the_admin
  ```
  Create a bot via @BotFather on Telegram. The recipient must send `/start` to the bot before receiving messages."
- Do NOT proceed until `TELEGRAM_BOT_TOKEN` and at least one chat ID are configured.

After loading, store them for use in all subsequent API calls:
```bash
source .env
```

## API Request Rules

1. **Base URL:** `https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/`
2. **Always use `rtk proxy curl`** for API calls that return JSON you need to parse. RTK filters JSON values, making responses unparseable. `rtk proxy` bypasses this filtering.
3. **Authentication:** The bot token is part of the URL path — no separate auth header needed.

## Notification Flow

### Step 1: Determine the recipient

Choose the correct chat ID based on the notification type:

| Scenario | Variable | Who receives |
|----------|----------|-------------|
| Checkpoint approval needed | `TELEGRAM_NOTIFY_CHAT_ID` | Reviewer (e.g., Carol) |
| Error or system alert | `TELEGRAM_ADMIN_CHAT_ID` | Admin (e.g., Walter) |
| Both need to know | Send to both chat IDs | Both |

### Step 2: Build the message

Structure the message with context so the recipient can act on it:

**For checkpoint notifications:**
```
*Checkpoint: [squad name]*
[brief description of what needs review]

Itens para revisao: [count]
Localizacao: [file path or description]

Aguardando sua aprovacao no terminal.
```

**For completion notifications:**
```
*Squad concluida: [squad name]*
[summary of what was done]

Resultados: [key metrics]
Relatorio: [file path]
```

**For error notifications:**
```
*Erro no squad: [squad name]*
Etapa: [step name]
Erro: [brief error description]

Acao necessaria: [what the admin should do]
```

### Step 3: Send the message

Use the `sendMessage` endpoint. The `parse_mode` parameter controls formatting:

**Markdown format (default):**
```bash
source .env && rtk proxy curl -s -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "$(node -e "
const payload = {
  chat_id: '$TELEGRAM_NOTIFY_CHAT_ID',
  parse_mode: 'Markdown',
  text: '*Checkpoint: nxz-faq-chatwoot*\n15 FAQs aguardando revisao.\n\nAguardando aprovacao no terminal.'
};
process.stdout.write(JSON.stringify(payload));
")"
```

**HTML format (use when Markdown special characters conflict with content):**
```bash
source .env && rtk proxy curl -s -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "$(node -e "
const payload = {
  chat_id: '$TELEGRAM_NOTIFY_CHAT_ID',
  parse_mode: 'HTML',
  text: '<b>Checkpoint: nxz-faq-chatwoot</b>\n15 FAQs aguardando revisao.\n\nAguardando aprovacao no terminal.'
};
process.stdout.write(JSON.stringify(payload));
")"
```

Use `node -e` to build the JSON payload to avoid shell escaping issues with special characters, line breaks, and emoji in the message text.

### Step 4: Verify the response

The API returns a JSON object. Check the `ok` field:

```bash
rtk proxy curl -s -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d @/tmp/telegram_message.json | node -e '
let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
  const r=JSON.parse(d);
  if (r.ok) console.log("Enviado para:", r.result.chat.first_name || r.result.chat.title);
  else console.log("ERRO:", r.description);
})'
```

## Sending to Multiple Recipients

When both the reviewer and admin need to be notified, send separate messages:

```bash
source .env

# Build message once
node -e "
const text = '*Squad concluida: nxz-faq-chatwoot*\n15 FAQs publicadas com sucesso.';
const ids = ['$TELEGRAM_NOTIFY_CHAT_ID', '$TELEGRAM_ADMIN_CHAT_ID'];
ids.forEach(id => {
  const payload = { chat_id: id, parse_mode: 'Markdown', text };
  console.log(JSON.stringify(payload));
});
" | while read -r payload; do
  rtk proxy curl -s -X POST \
    "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
    -H "Content-Type: application/json" \
    -d "$payload" > /dev/null
done
```

## Markdown Formatting Reference

Telegram's Markdown (v1) supports:

| Format | Syntax | Result |
|--------|--------|--------|
| Bold | `*text*` | **text** |
| Italic | `_text_` | _text_ |
| Code | `` `text` `` | `text` |
| Code block | `` ```text``` `` | code block |
| Link | `[text](url)` | clickable link |

Characters that need escaping in Markdown: `_`, `*`, `` ` ``, `[`

If your message content contains these characters naturally (e.g., file paths with underscores), use `parse_mode: 'HTML'` instead to avoid formatting issues.

## Critical Rules

1. **Always `source .env` before sending.** The bot token and chat IDs come from environment variables.

2. **Always use `rtk proxy curl`** when parsing the JSON response. Regular `curl` output gets filtered by RTK.

3. **Use `node -e` for JSON payload construction.** This avoids shell escaping nightmares with special characters, newlines, and emoji in message text.

4. **Check the `ok` field in the response.** If `false`, the `description` field explains the error.

5. **Do not send sensitive data** (passwords, API tokens, full error stack traces) in Telegram messages. Keep notifications actionable but safe.

6. **Respect rate limits.** Telegram allows ~30 messages per second to different chats. For squad pipelines this is never an issue, but avoid sending in tight loops.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Invalid bot token | Verify `TELEGRAM_BOT_TOKEN` in `.env` |
| `400 Bad Request: chat not found` | Recipient never sent `/start` to the bot | Ask the recipient to open the bot and send `/start` |
| `400 Bad Request: can't parse entities` | Malformed Markdown/HTML in message | Switch to `parse_mode: 'HTML'` or escape special characters |
| `429 Too Many Requests` | Rate limit hit | Wait the `retry_after` seconds indicated in the response |
| Empty response or parse error | RTK filtering JSON | Use `rtk proxy curl` instead of `curl` |

## Example: Checkpoint Notification in a Squad Pipeline

```
Context:
  - squad: nxz-faq-chatwoot
  - step: Revisao Humana (Etapa 6)
  - reviewer: Carol Oliveira (TELEGRAM_NOTIFY_CHAT_ID)
  - faqs_count: 15
  - test_accuracy: 45%

Steps:
  1. source .env -> load TELEGRAM_BOT_TOKEN, TELEGRAM_NOTIFY_CHAT_ID
  2. Build message: checkpoint details, FAQs count, test accuracy
  3. POST /sendMessage -> notify Carol
  4. Check response -> ok: true
  5. Pipeline pauses at checkpoint, waiting for Carol in the terminal
```
