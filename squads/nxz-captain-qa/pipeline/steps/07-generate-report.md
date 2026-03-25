---
id: generate-report
agent: reporter
execution: inline
inputFile: squads/nxz-captain-qa/output/evaluation-results.json
outputFile: squads/nxz-captain-qa/output/qa-report.md
---

# Geracao do Relatorio

## Objetivo

Gerar um relatorio completo com metricas detalhadas e recomendacoes de melhoria.

## Instrucoes

1. Leia os resultados da avaliacao
2. Gere o relatorio no formato abaixo
3. Inclua graficos em ASCII/texto para visualizacao das metricas
4. Adicione recomendacoes acionaveis baseadas nos pontos fracos identificados

## Formato do Relatorio

```markdown
# Relatorio de QA — Chatwoot Captain
**Data:** {data}
**Periodo testado:** {periodo}
**Times:** {times}
**Total de conversas:** {N}
**Assistant ID:** {id}

## Resumo Executivo
[Paragrafo resumindo os resultados principais e conclusao]

## Metricas por Time

### {Nome do Time}
- Score Geral: X.X/5.0
- Taxa de Aprovacao: XX%
- Conversas testadas: N

| Dimensao | Score | Status |
|----------|-------|--------|
| Correcao | X.X | ✅/⚠️/❌ |
| Relevancia | X.X | ✅/⚠️/❌ |
| Tom | X.X | ✅/⚠️/❌ |
| Resolucao | X.X | ✅/⚠️/❌ |
| Completude | X.X | ✅/⚠️/❌ |

### Pontos Fortes
[Lista de areas onde o Captain se saiu bem]

### Pontos Fracos
[Lista de areas com baixa performance]

## Analise Detalhada por Conversa
[Tabela com cada conversa, scores e status]

## Padroes Identificados
[Tipos de pergunta problematicos, gaps na knowledge base]

## Recomendacoes
1. [Acao especifica para melhorar]
2. [Acao especifica para melhorar]
3. [Acao especifica para melhorar]

## Proximos Passos
[Sugestoes de acompanhamento]
```

## Veto Conditions

- Relatorio sem metricas por time
- Relatorio sem recomendacoes
- Relatorio sem analise detalhada por conversa
