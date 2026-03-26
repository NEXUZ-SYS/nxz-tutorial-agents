---
id: checkpoint-review
type: checkpoint
outputFile: squads/nxz-faq-chatwoot/output/review-decisions.md
---

# Checkpoint: Revisao de Carol Oliveira

Carol revisa as FAQs geradas e o relatorio de testes do agente de IA.

## Material para Revisao

Apresente a Carol:
1. **Indice de FAQs** (`output/faqs_index.md`) — lista de todos os artigos gerados
2. **Relatorio de validacao de navegacao** (`output/navigation-validation-report.md`) — caminhos de menu verificados, corrigidos e os que precisam de revisao manual
3. **Relatorio de testes** (`output/test_report.md`) — como o agente de IA respondeu
4. **Artigos individuais** — acessiveis em `output/faqs/{produto}/{categoria}/`

Artigos com `navigation_validated: false` devem ser destacados com o label
`REQUER_REVISAO_NAVEGACAO` antes de qualquer outra decisao de revisao.

## Perguntas

### 1. Revisao dos artigos

Para cada artigo no indice, Carol pode decidir:
- APROVADO — publicar sem alteracoes
- APROVADO COM EDICAO — Carol edita o arquivo .md e aprova
- REJEITADO — nao publicar (informar motivo)
- ESCALAR LUIZ — precisa revisao tecnica do Luiz Claudio
- REQUER_REVISAO_NAVEGACAO — artigo com `navigation_validated: false`; Carol deve fornecer os caminhos corretos ou rejeitar o artigo

Apresente os artigos um a um ou em lote, conforme preferencia de Carol.

### 2. Observacoes sobre o relatorio de teste

Carol pode comentar sobre:
- FAQs que o agente nao conseguiu usar (resultado GENERICO/ERROU)
- Ajustes na formulacao das FAQs para melhorar a taxa de acerto
- Temas que precisam de FAQs adicionais

### 3. Aprovacao para publicacao

- Publicar todos os aprovados agora
- Aguardar revisao do Luiz Claudio antes de publicar
- Cancelar publicacao desta rodada

## Registro de Decisoes

Salve as decisoes no formato:

```markdown
# Decisoes de Revisao — {data}

## Resumo
- Aprovados: {N}
- Aprovados com edicao: {N}
- Rejeitados: {N}
- Escalados para Luiz: {N}

## Por Artigo
| Artigo | Produto | Decisao | Observacao |
|--------|---------|---------|------------|
| {slug} | {produto} | APROVADO | - |
| {slug} | {produto} | REJEITADO | Informacao desatualizada |
```
