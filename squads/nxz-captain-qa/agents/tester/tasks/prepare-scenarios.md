---
name: Preparar Cenarios de Teste
order: 1
input: Conversas coletadas com mensagens classificadas
output: Lista de cenarios de teste estruturados
---

## Process

1. Para cada conversa, extrair a mensagem principal do cliente
2. Identificar contexto relevante (mensagens anteriores)
3. Identificar a resposta de referencia (do agente humano ou Captain original)
4. Estruturar como cenario de teste

## Output Format

JSON com cenarios de teste prontos para execucao.

## Quality Criteria

- Cada cenario tem uma pergunta clara do cliente
- Cada cenario tem uma resposta de referencia
- Contexto relevante incluido

## Veto Conditions

- Cenarios sem pergunta do cliente
- Cenarios sem resposta de referencia
