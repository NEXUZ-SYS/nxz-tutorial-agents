---
id: publish
agent: assembler
execution: inline
---

# Publicar Tutorial

Execute a publicacao de acordo com a escolha do usuario no checkpoint anterior.

## Regras

- Leia a escolha do checkpoint-publish para determinar o destino
- Carregue a skill correspondente antes de executar:
  - **Notion**: skill `notion-publisher`
  - **Chatwoot**: skill `chatwoot-publish`
  - **Markdown/PDF**: nenhuma skill necessaria

## Fluxo por destino

### Markdown / PDF

1. O tutorial ja esta salvo em Markdown no output da run
2. Informe o caminho do arquivo ao usuario
3. Se o usuario pediu PDF, gere o PDF a partir do Markdown final

### Notion

1. Carregue e siga as instrucoes da skill `notion-publisher`
2. Use o tutorial final montado (com imagens locais) como input
3. Publique na pagina/database indicada pelo usuario ou na default da squad memory

### Chatwoot

1. Carregue e siga as instrucoes da skill `chatwoot-publish`
2. Use o tutorial final montado (com imagens locais) como input
3. Publique no portal/categoria indicados pelo usuario ou nos defaults da squad memory

## Output

Informe ao usuario:
- Destino da publicacao
- Link ou caminho do documento publicado
- Confirmacao de que imagens foram hospedadas corretamente (se aplicavel)
