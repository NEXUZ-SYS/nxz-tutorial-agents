# Protocolo de Notificacao Telegram — nxz-faq-chatwoot

## Regra Sistêmica

**Antes de QUALQUER AskUserQuestion, pausa esperando input do usuario, ou
checkpoint que exija acao humana, o pipeline DEVE enviar uma notificacao
Telegram PRIMEIRO, sem excecao.**

Esta regra vale para TODOS os steps do pipeline, incluindo paradas
imprevistas, bloqueios por falta de acesso, e confirmacoes de aprovacao.

O pipeline NAO pode exibir a mensagem de espera no terminal e depois
parar aguardando o usuario sem ter enviado o Telegram antes.

## Ordem de execucao obrigatoria

Para qualquer pausa aguardando input:

1. Enviar notificacao Telegram (usando o snippet abaixo)
2. Exibir a mensagem de pausa no terminal
3. Aguardar a resposta do usuario
4. Continuar o pipeline somente apos receber a confirmacao

## Template da mensagem

```
*Checkpoint: nxz-faq-chatwoot*
Etapa: {NOME_DA_ETAPA}

{DESCRICAO_DO_QUE_ESTA_AGUARDANDO}

{ARQUIVO_SE_HOUVER}

Aguardando sua acao no terminal.
```

Parametros:
- `{NOME_DA_ETAPA}` — nome legivel da etapa atual (ex: "Configuracao da Execucao")
- `{DESCRICAO_DO_QUE_ESTA_AGUARDANDO}` — o que o pipeline precisa do usuario
- `{ARQUIVO_SE_HOUVER}` — linha opcional com o caminho do arquivo para revisao;
  omita este bloco inteiro se a etapa nao produz arquivo

## Snippet reutilizavel

Substitua os valores de ETAPA, DESCRICAO e ARQUIVO antes de executar.

```bash
source .env && \
ETAPA="Nome da Etapa" && \
DESCRICAO="O que o pipeline aguarda do usuario." && \
ARQUIVO="" && \
node -e "
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;
const etapa = process.env.ETAPA;
const descricao = process.env.DESCRICAO;
const arquivo = process.env.ARQUIVO;
const arquivoLinha = arquivo ? '\n\nArquivo para revisao: \`' + arquivo + '\`' : '';
const text = encodeURIComponent(
  '*Checkpoint: nxz-faq-chatwoot*\nEtapa: ' + etapa +
  '\n\n' + descricao + arquivoLinha +
  '\n\nAguardando sua acao no terminal.'
);
require('https').get(
  'https://api.telegram.org/bot' + token +
  '/sendMessage?chat_id=' + chatId +
  '&parse_mode=Markdown&text=' + text,
  r => r.resume()
);
" ETAPA="$ETAPA" DESCRICAO="$DESCRICAO" ARQUIVO="$ARQUIVO"
```

Se o comando acima falhar (node nao disponivel), use o fallback com `rtk proxy curl`:

```bash
source .env && \
ETAPA="Nome da Etapa" && \
DESCRICAO="O que o pipeline aguarda do usuario." && \
ARQUIVO="" && \
ARQUIVO_LINHA="" && \
[ -n "$ARQUIVO" ] && ARQUIVO_LINHA="\n\nArquivo para revisao: \`${ARQUIVO}\`" ; \
rtk proxy curl -s -X POST \
  "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": \"${TELEGRAM_NOTIFY_CHAT_ID}\", \"parse_mode\": \"Markdown\", \"text\": \"*Checkpoint: nxz-faq-chatwoot*\nEtapa: ${ETAPA}\n\n${DESCRICAO}${ARQUIVO_LINHA}\n\nAguardando sua acao no terminal.\"}"
```

## Como referenciar este protocolo nos steps

Nos steps do pipeline, em vez de incluir o bloco de codigo completo inline,
escreva:

```
Siga o protocolo de notificacao Telegram definido em
`pipeline/data/telegram-notification-protocol.md` com os seguintes parametros:

- ETAPA: "Nome da Etapa"
- DESCRICAO: "Descricao especifica do que aguarda neste step."
- ARQUIVO: "/caminho/absoluto/do/arquivo.md" (ou vazio se nao houver arquivo)
```

## Comportamento esperado em caso de falha no envio

Se o Telegram falhar nos dois metodos (node e rtk proxy curl):

1. Registre o erro no terminal: `[TELEGRAM] Falha ao enviar notificacao — continuando sem notificacao`
2. Continue para exibir a mensagem de pausa no terminal normalmente
3. NAO aborte o pipeline por causa de falha no Telegram

A notificacao e um mecanismo auxiliar. O pipeline NAO deve travar por
causa de falha no Telegram — o usuario ainda ve a pausa no terminal.
