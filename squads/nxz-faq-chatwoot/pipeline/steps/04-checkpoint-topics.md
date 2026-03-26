---
id: checkpoint-topics
type: checkpoint
inputFile: squads/nxz-faq-chatwoot/output/pattern-report.md
---

# Checkpoint: Aprovacao da Lista de Topicos

## Objetivo

Carol Oliveira revisa e aprova QUAIS FAQs serao geradas antes que o writer
produza qualquer artigo. Este checkpoint evita desperdicio de geracao e garante
que so entra na fila conteudo que Carol considera util e correto para publicar.

## O que Carol precisa fazer

O arquivo `output/pattern-report.md` ja esta disponivel. Ele contem a tabela
completa de topicos identificados, com frequencia, status atual (Criar /
Atualizar / Adequada) e acao recomendada.

### Decisoes possiveis por topico

| Acao | Significado |
|------|-------------|
| `APROVAR` | Gerar a FAQ conforme recomendado pelo analyst |
| `REJEITAR` | Nao gerar esta FAQ nesta rodada (motivo opcional) |
| `AJUSTAR` | Aprovar com ajuste — Carol descreve o que mudar (escopo, titulo, categoria) |
| `ESCALAR_LUIZ` | Conteudo tecnico fora da area de Carol — Luiz Claudio precisa validar o escopo antes de gerar |

### Como responder

Copie a tabela abaixo (pre-preenchida com os topicos do pattern-report.md) e
preencha a coluna `Decisao` e `Observacao` para cada linha.

> O pipeline runner ira preencher automaticamente esta tabela com os topicos
> do pattern-report.md antes de apresentar o checkpoint.

```
| Produto | Topico | Frequencia | Status Atual | Decisao | Observacao |
|---------|--------|-----------|--------------|---------|------------|
| ...     | ...    | ...        | ...          | APROVAR | -          |
```

Voce tambem pode:
- **Adicionar um topico manualmente** — se identificar uma lacuna que os tickets
  nao capturaram, adicione uma linha nova com `Decisao: APROVAR` e
  `Status Atual: Manual`.
- **Alterar a prioridade** — reordene as linhas se quiser mudar a ordem de geracao.

## O que acontece depois

O pipeline salva a lista aprovada em `output/approved-topics.json` e passa
apenas os topicos com decisao `APROVAR` ou `AJUSTAR` para o writer.

Topicos com `ESCALAR_LUIZ` ficam registrados em `output/pending-escalations.json`
e aparecem como pendencias no relatorio da rodada. Eles NAO sao gerados agora.

## Criterio para continuar

- Pelo menos 1 topico com decisao `APROVAR` ou `AJUSTAR`.
- Se todos os topicos forem rejeitados ou escalados, o pipeline encerra com
  status `NOOP` e notifica Carol via Telegram.

## Veto Conditions

- Carol nao preenche a tabela dentro do prazo configurado (24h padrao)
- Nenhum topico aprovado ou ajustado
