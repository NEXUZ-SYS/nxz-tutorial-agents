---
id: checkpoint-topics
type: checkpoint
inputFile: squads/nxz-faq-chatwoot/output/topics-to-generate.md
outputFile: squads/nxz-faq-chatwoot/output/approved-topics.md
---

# Checkpoint: Aprovacao da Lista de Topicos

## Objetivo

Carol Oliveira revisa e aprova QUAIS FAQs serao geradas antes que o writer
produza qualquer artigo. Este checkpoint evita desperdicio de geracao e garante
que so entra na fila conteudo que Carol considera util e correto para publicar.

## Instrucoes para o Pipeline Runner

### PASSO 1 — Gerar o arquivo approved-topics.md com decisoes em branco

Leia `output/topics-to-generate.md` e gere `output/approved-topics.md` seguindo
o formato definido abaixo. Todos os campos `**Decisao:**` devem ser preenchidos
com o valor `PENDENTE`. Todos os campos `**Observacao:**` devem ser preenchidos
com o valor `-`.

**O pipeline NUNCA deve preencher decisoes automaticamente. O valor padrao e
`PENDENTE`, nao `APROVAR`.**

### PASSO 2 — Exibir o caminho do arquivo e a tabela resumo no terminal

Apos gerar o arquivo, exiba no terminal:

```
=====================================================
CHECKPOINT: Aprovacao de Topicos
=====================================================
Arquivo para revisao:
  {caminho_absoluto}/squads/nxz-faq-chatwoot/output/approved-topics.md

Topicos aguardando decisao:

| # | Produto | Tema | Frequencia | Acao Recomendada |
|---|---------|------|-----------|-----------------|
| 1 | ...     | ...  | ...       | ...             |

Decisoes possiveis: APROVAR | REJEITAR | AJUSTAR | ESCALAR_LUIZ
=====================================================
Abra o arquivo, preencha o campo **Decisao:** de cada topico e salve.
Quando terminar, retorne aqui e confirme digitando: aprovacao concluida
=====================================================
```

Monte a tabela com os dados reais lidos do `topics-to-generate.md`.

### PASSO 3 — Enviar notificacao Telegram

Apos exibir a mensagem no terminal, envie notificacao Telegram para alertar
Carol de que ha topicos aguardando aprovacao.

Use o caminho absoluto do arquivo na mensagem. Para obter o caminho absoluto,
use `pwd` e concatene com o caminho relativo.

Execute:

```bash
source .env && SQUAD_PATH="$(pwd)/squads/nxz-faq-chatwoot/output/approved-topics.md" && node -e "
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;
const filePath = process.env.SQUAD_PATH;
const text = encodeURIComponent('*Checkpoint: nxz-faq-chatwoot*\nEtapa: Aprovacao de Topicos\n\nHa topicos aguardando sua decisao antes que o pipeline continue.\n\nArquivo para revisao: \`' + filePath + '\`\n\nDecisoes possiveis: APROVAR | REJEITAR | AJUSTAR | ESCALAR\\_LUIZ\nAguardando sua acao no terminal.');
require('https').get('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatId + '&parse_mode=Markdown&text=' + text, r => r.resume());
" SQUAD_PATH="$SQUAD_PATH"
```

Se o comando acima falhar, use `rtk proxy curl`:

```bash
source .env && SQUAD_PATH="$(pwd)/squads/nxz-faq-chatwoot/output/approved-topics.md" && rtk proxy curl -s -X POST \
  "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": \"${TELEGRAM_NOTIFY_CHAT_ID}\", \"parse_mode\": \"Markdown\", \"text\": \"*Checkpoint: nxz-faq-chatwoot*\nEtapa: Aprovacao de Topicos\n\nHa topicos aguardando sua decisao antes que o pipeline continue.\n\nArquivo para revisao: \`${SQUAD_PATH}\`\n\nDecisoes possiveis: APROVAR | REJEITAR | AJUSTAR | ESCALAR\\_LUIZ\nAguardando sua acao no terminal.\"}"
```

### PASSO 4 — Aguardar confirmacao do usuario no terminal

Apos enviar a notificacao, PARE completamente e aguarde o usuario confirmar
no terminal que terminou de preencher o arquivo.

Exiba esta mensagem e aguarde input:

```
Aguardando confirmacao...
Digite "aprovacao concluida" quando tiver preenchido todas as decisoes:
```

**O pipeline NAO deve continuar ate receber esta confirmacao explicitamente.**

### PASSO 5 — Validar que todas as decisoes foram preenchidas

Apos receber a confirmacao do usuario, leia o arquivo `output/approved-topics.md`
e verifique cada bloco delimitado por `<!-- TOPICO_INICIO -->` e `<!-- TOPICO_FIM -->`.

Para cada bloco, verifique se a linha `**Decisao:**` contem um valor diferente
de `PENDENTE`.

Se encontrar alguma decisao ainda como `PENDENTE`:

1. Informe no terminal quais topicos ainda estao pendentes:

```
Ainda ha decisoes pendentes nos seguintes topicos:
- Topico N — {Produto}: {Tema}
- Topico M — {Produto}: {Tema}

Por favor, preencha as decisoes pendentes e confirme novamente.
Digite "aprovacao concluida" quando terminar:
```

2. Volte ao PASSO 4 e aguarde nova confirmacao.

Repita ate que nenhum topico esteja com decisao `PENDENTE`.

### PASSO 6 — Verificar criterio para continuar

Apos todas as decisoes preenchidas, verifique se ha pelo menos 1 topico com
decisao `APROVAR` ou `AJUSTAR`.

- Se SIM: continue para o step 05.
- Se NAO (todos REJEITAR ou ESCALAR_LUIZ): encerre o pipeline com status `NOOP`,
  registre os escalamentos em `output/pending-escalations.md` e notifique Carol
  via Telegram:

```bash
source .env && node -e "
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;
const text = encodeURIComponent('*nxz-faq-chatwoot — Pipeline Encerrado*\n\nNenhum topico foi aprovado nesta rodada.\nTodos os topicos foram rejeitados ou escalados.\n\nStatus: NOOP\nConsulte o arquivo \`output/pending-escalations.md\` para os escalamentos pendentes.');
require('https').get('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatId + '&parse_mode=Markdown&text=' + text, r => r.resume());
"
```

---

## Formato do approved-topics.md

O pipeline deve gerar `output/approved-topics.md` com a seguinte estrutura,
preenchida a partir do `topics-to-generate.md`. Todos os campos `**Decisao:**`
devem iniciar como `PENDENTE`.

```markdown
# Topicos Aprovados para Geracao de FAQ
**Gerado em:** YYYY-MM-DD
**Revisado por:** Carol Oliveira

---

## Tabela de Decisoes

| # | Produto | Tema | Frequencia | Acao Recomendada | Decisao | Observacao |
|---|---------|------|-----------|-----------------|---------|------------|
| 1 | NXZ ERP | Abertura de caixa | 15 | Criar | PENDENTE | - |
| 2 | NXZ Go | Configurar cardapio | 8 | Atualizar | PENDENTE | - |

---

## Detalhamento das Decisoes

<!-- TOPICO_INICIO -->
### Topico 1 — NXZ ERP: Abertura de caixa

**Produto:** NXZ ERP
**Tema:** Abertura de caixa
**Frequencia:** 15 conversas
**Acao Recomendada:** Criar
**Decisao:** PENDENTE
**Observacao:** -

<!-- TOPICO_FIM -->

<!-- TOPICO_INICIO -->
### Topico 2 — NXZ Go: Configurar cardapio

**Produto:** NXZ Go
**Tema:** Configurar cardapio
**Frequencia:** 8 conversas
**Acao Recomendada:** Atualizar
**Decisao:** PENDENTE
**Observacao:** -

<!-- TOPICO_FIM -->
```

## Decisoes possiveis por topico

| Acao | Significado |
|------|-------------|
| `APROVAR` | Gerar a FAQ conforme recomendado pelo analyst |
| `REJEITAR` | Nao gerar esta FAQ nesta rodada (motivo opcional) |
| `AJUSTAR` | Aprovar com ajuste — Carol descreve o que mudar (escopo, titulo, categoria) |
| `ESCALAR_LUIZ` | Conteudo tecnico fora da area de Carol — Luiz Claudio precisa validar o escopo antes de gerar |

## Regras de preenchimento

- O campo `**Decisao:**` deve conter exatamente um dos valores: `APROVAR`, `REJEITAR`, `AJUSTAR`, `ESCALAR_LUIZ`
- O campo `**Observacao:**` e obrigatorio para `AJUSTAR` e `ESCALAR_LUIZ`; para os demais, use `-` se nao houver observacao
- Os delimitadores `<!-- TOPICO_INICIO -->` e `<!-- TOPICO_FIM -->` devem ser mantidos — o writer usa esses marcadores para parsear
- NAO alterar os campos **Produto**, **Tema** e **Frequencia** — eles identificam o topico de forma inequivoca
- Voce tambem pode **adicionar um topico manualmente** — adicione um bloco novo seguindo o mesmo formato, com `**Acao:** Criar` e `**Decisao:** APROVAR` e `**Status Atual:** Manual`.
- Voce tambem pode **alterar a prioridade** — reordene os blocos de topico se quiser mudar a ordem de geracao.

## O que acontece depois

O pipeline passa apenas os topicos com decisao `APROVAR` ou `AJUSTAR` para o
writer no step 05.

Topicos com `ESCALAR_LUIZ` ficam registrados em `output/pending-escalations.md`
e aparecem como pendencias no relatorio da rodada. Eles NAO sao gerados agora.

## Criterio para continuar

- Pelo menos 1 topico com decisao `APROVAR` ou `AJUSTAR`.
- Se todos os topicos forem rejeitados ou escalados, o pipeline encerra com
  status `NOOP` e notifica Carol via Telegram.

## Veto Conditions

- O pipeline gerou `approved-topics.md` com decisoes pre-preenchidas (diferente de `PENDENTE`)
- Carol nao confirma a aprovacao no terminal
- Nenhum topico aprovado ou ajustado
