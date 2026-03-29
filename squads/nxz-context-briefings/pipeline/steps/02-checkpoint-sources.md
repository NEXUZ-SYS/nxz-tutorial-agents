---
id: checkpoint-sources
type: checkpoint
outputFile: squads/nxz-context-briefings/output/additional-sources.md
---

# Checkpoint: Fontes Adicionais de Contexto

Alem dos arquivos ja existentes na pasta `context/`, o usuario pode fornecer fontes extras
para enriquecer a analise e o briefing final.

## Perguntas

### 1. Deseja adicionar fontes extras de contexto?

- Sim, quero adicionar fontes extras
- Nao, seguir apenas com os contextos existentes na pasta `context/`

### 2. Quais fontes deseja adicionar? (se sim)

O usuario pode fornecer quantas fontes quiser. Para cada fonte, identifique o tipo e colete:

**Tipos de fonte aceitos:**

- **Arquivo local** — Caminho absoluto para um arquivo no sistema (ex: `/home/user/docs/spec.md`, `~/projetos/nxz/api-docs.pdf`)
- **Website/URL** — URL publica para fetch (ex: `https://nexuz.com.br/produtos/nxz-go`, `https://docs.exemplo.com/api`)
- **Pagina do Notion** — URL de pagina do Notion para leitura via MCP (ex: `https://notion.so/nexuz/NXZ-Go-Specs-abc123`)
- **Texto livre** — Informacao colada diretamente no chat pelo usuario (ex: anotacoes, specs internas, emails, mensagens)

**Instrucoes para o usuario:**

Envie suas fontes no formato que preferir. Exemplos:

```
Arquivo: /home/walterfrey/Documentos/specs/nxz-go-api.md
URL: https://nexuz.com.br/produtos/nxz-go
Notion: https://notion.so/nexuz/Roadmap-2026-abc123
Texto: "O NXZ Pay Go foi lancado em jan/2026 e integra com Stone e PagSeguro via SDK nativo..."
```

Ou simplesmente cole os links/caminhos/textos e eu identifico o tipo automaticamente.

### 3. Ha algo especifico nestas fontes que devo priorizar?

O usuario pode indicar o que buscar nas fontes (ex: "foque nas APIs de integracao", "extraia o roadmap de 2026", "pegue os diferenciais competitivos").

## Processamento das Fontes

Ao salvar o outputFile, registre cada fonte com seu tipo e conteudo/caminho:

```markdown
# Fontes Adicionais de Contexto

## Fontes Fornecidas

### Fonte 1
- **Tipo:** arquivo_local | website | notion | texto_livre
- **Referencia:** {caminho, URL ou "inline"}
- **Foco:** {o que priorizar, se indicado}
- **Conteudo:** {texto colado, se tipo = texto_livre}

### Fonte 2
...

## Instrucoes de Priorizacao
{o que o usuario pediu para focar, se aplicavel}
```
