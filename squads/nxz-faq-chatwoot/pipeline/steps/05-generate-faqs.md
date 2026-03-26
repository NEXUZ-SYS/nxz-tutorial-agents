---
id: generate-faqs
agent: writer
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/approved-topics.md
outputFile: squads/nxz-faq-chatwoot/output/faqs_index.md
---

# Geracao de FAQs

## Objetivo

Gerar artigos FAQ em Markdown para cada topico aprovado por Carol no checkpoint
anterior. O conteudo e gerado do zero pelo agente, NAO copiado das respostas
dos agentes humanos.

## Instrucoes

1. Leia os topicos aprovados em `output/approved-topics.md`
   - Identifique os blocos delimitados por `<!-- TOPICO_INICIO -->` e `<!-- TOPICO_FIM -->`
   - Processe apenas blocos onde `**Decisao:**` seja `APROVAR` ou `AJUSTAR`
   - Blocos com `ESCALAR_LUIZ` ou `REJEITAR` devem ser ignorados
   - Para topicos com `AJUSTAR`, a observacao de Carol em `**Observacao:**` e
     obrigatoria — incorpore-a ao escopo do artigo antes de escrever
2. Leia os templates em `pipeline/data/faq-templates.md`
3. Leia as categorias em `pipeline/data/product-categories.md`
4. Para cada topico, **antes de escrever o artigo**, identifique se ele contem
   instrucoes de navegacao no produto (caminhos de menu, botoes, telas).
   - Se SIM: siga obrigatoriamente o protocolo de validacao descrito abaixo.
   - Se NAO: gere o artigo diretamente.
5. Gere o artigo FAQ em Markdown com frontmatter YAML completo.
6. Salve em: `output/faqs/{produto-slug}/{categoria-slug}/{slug}.md`
7. Registre em `output/faqs_index.md` todos os artigos gerados, com o campo
   `navigation_validated: true/false/not_applicable` por artigo.

## Como parsear o approved-topics.md

O arquivo usa marcadores consistentes. Para cada bloco de topico:

- Inicio do bloco: linha `<!-- TOPICO_INICIO -->`
- Fim do bloco: linha `<!-- TOPICO_FIM -->`
- Produto: linha com `**Produto:**`
- Tema: linha com `**Tema:**`
- Decisao: linha com `**Decisao:**`
- Observacao de Carol: linha com `**Observacao:**`

Exemplo de leitura:

```
<!-- TOPICO_INICIO -->
### Topico 1 — NXZ ERP: Abertura de caixa

**Produto:** NXZ ERP
**Tema:** Abertura de caixa
**Frequencia:** 15 conversas
**Acao Recomendada:** Criar
**Decisao:** APROVAR
**Observacao:** -

<!-- TOPICO_FIM -->
```

Para o conteudo substantivo do artigo (o que o cliente pergunta, o problema
real, a causa raiz), consulte o arquivo `output/topics-to-generate.md` e localize
o bloco correspondente pelo mesmo **Produto** e **Tema**. As conversas reais dos
clientes e o context_conversation estao detalhados la.

## Regra Critica: Proibido Inventar Caminhos de Menu

Esta e a regra mais importante desta etapa.

**Nenhum caminho de menu, nome de tela, nome de botao, sequencia de cliques
ou passo de navegacao pode ser incluido em um artigo sem ter sido verificado
ou fornecido por uma fonte confiavel.**

Fontes confiaveis aceitas (em ordem de preferencia):
1. Validacao direta via Playwright no produto (etapa 06-validate-navigation.md)
2. Informacao fornecida explicitamente pelo usuario durante o checkpoint de topicos
3. Informacao fornecida explicitamente pelo usuario durante a geracao (via pergunta direta)

Fontes NAO aceitas:
- Conhecimento interno do LLM sobre o produto
- Inferencia por analogia com outros sistemas
- Respostas anteriores de agentes humanos no Chatwoot (podem estar desatualizadas)

### O que fazer quando voce nao tem o caminho correto

Se o artigo precisa descrever navegacao e voce nao tem uma fonte confiavel,
**PARE** e siga o protocolo abaixo antes de continuar.

#### 1. Enviar notificacao Telegram (ANTES de exibir no terminal)

Siga o protocolo de notificacao Telegram definido em
`pipeline/data/telegram-notification-protocol.md` com os seguintes parametros:

- ETAPA: "Geracao de FAQs"
- DESCRICAO: "O writer precisa de caminhos de navegacao para continuar.\nTopico bloqueado: [topico] — [produto]\n\nOpcoes:\n(a) Fornecer os caminhos manualmente\n(b) Fornecer URL + login para validacao Playwright\n(c) Gerar artigo sem instrucoes de navegacao"
- ARQUIVO: "" (vazio)

Substitua `[topico]` e `[produto]` pelos valores reais do artigo sendo gerado.

#### 2. Exibir mensagem no terminal

```
=====================================================
AGUARDANDO INPUT: Caminhos de Navegacao
=====================================================
Preciso descrever a navegacao para "[topico]" no [produto], mas nao tenho
acesso confirmado ao produto para verificar os caminhos corretos.

Deseja:
(a) Fornecer os caminhos corretos manualmente agora
(b) Me dar acesso ao produto (URL + login) para eu validar via Playwright
(c) Gerar o artigo sem instrucoes de navegacao (apenas conceitual)

Nao vou inventar ou assumir nenhum caminho de menu.
=====================================================
Aguardando sua resposta:
```

#### 3. Aguardar resposta do usuario no terminal

Apos enviar a notificacao e exibir a mensagem, aguarde a resposta do usuario antes de continuar.

Se o usuario escolher (a), registre o caminho fornecido como
`source: manual_user_input` no frontmatter do artigo.
Se o usuario escolher (c), o artigo deve conter uma nota explicita:

```
> **Nota:** Os caminhos de menu variam conforme a versao do produto.
> Consulte nossa equipe de suporte para orientacao especifica ao seu ambiente.
```

### Marcacao de artigos com navegacao nao validada

Se por qualquer motivo um artigo for gerado sem validacao de navegacao
(escolha (c) acima), ele deve receber no frontmatter:

```yaml
navigation_validated: false
navigation_validation_note: "Caminhos nao verificados — revisar antes de publicar"
```

Este artigo sera sinalizado no checkpoint de revisao da Carol como
`REQUER_REVISAO_NAVEGACAO`.

## Regras de Geracao

- Conteudo gerado do zero, NUNCA copiado de respostas dos agentes humanos
- Perguntas dos clientes sao apenas contexto (o QUE precisa ser respondido)
- Cada artigo deve ter frontmatter YAML completo
- Cada artigo deve terminar com CTA: "Ainda precisa de ajuda? Fale com nosso suporte pelo WhatsApp."
- Slug deve ser URL-friendly (ex: como-abrir-caixa-pdv)

## Frontmatter Obrigatorio por Artigo

```yaml
---
title: ""
product: ""           # nxz-erp | nxz-go | nxz-kds | nxz-delivery | nxz-pay-go
category: ""
slug: ""
status: draft
navigation_validated: true | false | not_applicable
navigation_source: playwright | manual_user_input | not_applicable
needs_expert_review: false
---
```

## Estrutura de Diretorios

```
output/faqs/
  nxz-erp/
    vendas-pdv/
      como-abrir-caixa-pdv.md
    financeiro-fiscal/
      como-cancelar-nota-fiscal.md
  nxz-go/
    configuracao-cardapio/
      como-adicionar-produto.md
```

## Veto Conditions

- Nenhuma FAQ gerada
- FAQ sem frontmatter YAML
- FAQ copiando resposta de agente humano
- FAQ com caminho de menu inventado (sem fonte confiavel registrada no frontmatter)
