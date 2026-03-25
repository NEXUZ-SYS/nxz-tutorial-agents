---
name: Gerar Metricas Agregadas
order: 2
input: Scores individuais por conversa
output: Metricas agregadas por time e dimensao
---

## Process

1. Agregar scores por time
2. Calcular media, mediana, min, max por dimensao por time
3. Calcular taxa de aprovacao por time
4. Identificar top 3 tipos de pergunta com melhor performance
5. Identificar top 3 tipos de pergunta com pior performance
6. Identificar gaps na knowledge base

## Output Format

JSON com metricas agregadas e padroes identificados.

## Quality Criteria

- Metricas corretas matematicamente
- Padroes de falha identificados com exemplos
- Gaps na knowledge base listados

## Veto Conditions

- Erros de calculo nas metricas
- Nenhum padrao de falha identificado
