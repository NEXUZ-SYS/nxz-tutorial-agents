---
name: Pontuar Respostas
order: 1
input: Resultados dos testes com pares pergunta/resposta
output: Scores individuais por conversa com justificativas
---

## Process

1. Para cada par de teste, aplicar rubrica de 5 dimensoes
2. Escrever reasoning antes de atribuir score (G-Eval pattern)
3. Comparar resposta do Captain com referencia
4. Atribuir scores 1-5 por dimensao
5. Calcular score medio e classificar APROVADO/REPROVADO

## Output Format

JSON com scores detalhados e justificativas.

## Quality Criteria

- Todas as 5 dimensoes avaliadas por conversa
- Justificativa escrita para cada score
- Classificacao consistente com threshold 3.5

## Veto Conditions

- Scores sem justificativa
- Dimensoes nao avaliadas
