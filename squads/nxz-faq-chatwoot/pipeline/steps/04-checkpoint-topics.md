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

### PASSO 2 — Enviar notificacao Telegram (ANTES de exibir no terminal)

Siga o protocolo de notificacao Telegram definido em
`pipeline/data/telegram-notification-protocol.md` com os seguintes parametros:

- ETAPA: "Aprovacao de Topicos"
- DESCRICAO: "Ha topicos aguardando sua decisao antes que o pipeline continue.\nDecisoes possiveis: APROVAR | REJEITAR | AJUSTAR | ESCALAR\_LUIZ"
- ARQUIVO: "{caminho_absoluto}/squads/nxz-faq-chatwoot/output/approved-topics.md"

### PASSO 3 — Exibir o caminho do arquivo e a tabela resumo no terminal

Apos enviar o Telegram, exiba no terminal:

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
  via Telegram usando o protocolo em `pipeline/data/telegram-notification-protocol.md`:
  - ETAPA: "Pipeline Encerrado"
  - DESCRICAO: "Nenhum topico foi aprovado nesta rodada. Todos foram rejeitados ou escalados.\nStatus: NOOP"
  - ARQUIVO: "{caminho_absoluto}/squads/nxz-faq-chatwoot/output/pending-escalations.md"

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
