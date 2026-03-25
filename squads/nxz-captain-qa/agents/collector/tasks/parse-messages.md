---
name: Parsear Mensagens
order: 2
input: Lista de IDs de conversas
output: Conversas com mensagens classificadas por tipo
---

## Process

1. Para cada conversation_id, GET /conversations/{id}/messages
2. Paginar com ?before={oldest_id} ate obter todas
3. Classificar cada mensagem: incoming (cliente), outgoing (agente), activity
4. Identificar mensagens do Captain (sender_type == "Captain::Assistant")
5. Marcar conversas com handoff (activity message de transferencia)
6. Estruturar no formato JSON final

## Output Format

JSON com conversas completas e mensagens classificadas.

## Quality Criteria

- Todas as mensagens de cada conversa foram coletadas (paginacao completa)
- Classificacao correta por sender_type
- Handoffs identificados

## Veto Conditions

- Mensagens incompletas (paginacao falhou)
- Classificacao incorreta de sender_type
