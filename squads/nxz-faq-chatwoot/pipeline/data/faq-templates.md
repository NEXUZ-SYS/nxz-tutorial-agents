# Templates de FAQ

## Template A — Resposta Direta

Para perguntas simples com resposta curta.

```markdown
---
produto: {produto}
categoria: {categoria}
slug: {slug}
titulo: {titulo}
versao: 1
gerado_em: {data}
article_id: null
template: A
tickets_relacionados: {N}
---

# {Pergunta}?

{Resposta direta em 1-3 paragrafos.}

> {Observacao importante, se houver.}

**Ainda precisa de ajuda?** Fale com nosso suporte pelo WhatsApp.
```

## Template B — Passo a Passo

Para tarefas com multiplas etapas.

```markdown
---
produto: {produto}
categoria: {categoria}
slug: {slug}
titulo: {titulo}
versao: 1
gerado_em: {data}
article_id: null
template: B
tickets_relacionados: {N}
---

# {Pergunta}?

## Antes de comecar
{Pre-requisitos, se houver.}

## Passo a passo

1. {Passo 1}
2. {Passo 2}
3. {Passo 3}
...

{Resultado esperado apos completar.}

## Problemas comuns

- **{Problema 1}:** {solucao}
- **{Problema 2}:** {solucao}

**Ainda precisa de ajuda?** Fale com nosso suporte pelo WhatsApp.
```

## Template C — Resolucao de Erro

Para mensagens de erro especificas.

```markdown
---
produto: {produto}
categoria: {categoria}
slug: {slug}
titulo: {titulo}
versao: 1
gerado_em: {data}
article_id: null
template: C
tickets_relacionados: {N}
---

# {Descricao do problema} — o que fazer?

## Causa mais comum
{Explicacao da causa.}

## Como resolver

1. {Passo 1}
2. {Passo 2}
3. {Passo 3}

## Se nada funcionar
{Acao de ultimo recurso.}

**Ainda com problema?** Fale com nosso suporte pelo WhatsApp — tenha em maos {informacao util}.
```
