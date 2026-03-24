---
id: assemble-final
agent: assembler
execution: inline
inputFile: squads/nxz-erp-tutorials/output/tutorial-draft.md
outputFile: squads/nxz-erp-tutorials/output/tutorial-final.md
---

# Montagem do Tutorial Final

## Objetivo

Integrar o texto do tutorial com as imagens capturadas, produzindo o documento
final em Markdown com todas as screenshots incorporadas.

## Instrucoes

1. Leia o tutorial draft (texto com marcadores)
2. Leia o manifesto de screenshots (YAML com lista de imagens)
3. Para cada marcador [SCREENSHOT: descricao]:
   a. Encontre a imagem correspondente no manifesto
   b. Substitua o marcador pela sintaxe Markdown:
      ```
      ![descricao](./screenshots/NN-descricao-curta.png)
      *Figura N: descricao*
      ```
   c. Se a imagem nao foi capturada (status: failed), manter o marcador com nota:
      ```
      > [SCREENSHOT NAO CAPTURADA: descricao] — Capturar manualmente
      ```
4. Adicione table of contents se o tutorial tem mais de 5 secoes
5. Adicione header com metadata:
   - Data de criacao
   - Versao do tutorial
   - Modulo documentado
   - Persona alvo
6. Verifique que todos os marcadores foram processados
7. Salve o documento final

## Veto Conditions

- Marcadores [SCREENSHOT: ...] nao substituidos restantes (exceto os marcados como failed)
- Imagens referenciadas com caminho absoluto
- Falta de legendas nas imagens
