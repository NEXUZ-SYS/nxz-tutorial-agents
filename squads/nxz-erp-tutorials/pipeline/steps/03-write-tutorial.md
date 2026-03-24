---
id: write-tutorial
agent: writer
execution: inline
format: technical-writing
inputFile: squads/nxz-erp-tutorials/output/module-analysis.yaml
outputFile: squads/nxz-erp-tutorials/output/tutorial-draft.md
---

# Redacao do Tutorial

## Objetivo

Transformar a analise tecnica do modulo em um tutorial passo a passo claro e acessivel,
com marcadores de screenshot para captura automatica.

## Instrucoes

1. Leia a analise do modulo (YAML) produzida pelo Explorador
2. Identifique a persona alvo e adapte o tom de escrita
3. Crie a estrutura do tutorial seguindo o template do agent
4. Escreva cada passo com:
   - Uma unica acao clara
   - Caminho completo de navegacao
   - Descricao do que acontece na tela
   - Marcador [SCREENSHOT: descricao precisa]
   - Dicas e alertas quando relevante
5. Inclua pre-requisitos (permissoes, acessos)
6. Adicione resumo e proximos passos
7. Salve o tutorial draft

## Regras de Screenshots

Cada marcador deve seguir o padrao:
```
[SCREENSHOT: {Nome da Tela} - {Estado} - {Elemento em destaque}]
```

Exemplos:
- `[SCREENSHOT: Menu principal - Modulo Vendas expandido]`
- `[SCREENSHOT: Formulario de Pedido de Venda - Novo - Campo Cliente em destaque]`
- `[SCREENSHOT: Lista de Pedidos - Filtro por status Confirmado aplicado]`

## Veto Conditions

- Tutorial tem menos de 5 passos
- Algum passo tem mais de uma acao
- Faltam marcadores de screenshot (minimo 1 por secao principal)
- Linguagem tecnica sem explicacao (ex: "many2one", "ir.model.access")
- Faltam pre-requisitos
- Uso de em dashes
