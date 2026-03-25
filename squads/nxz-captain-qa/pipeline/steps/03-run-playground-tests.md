---
id: run-playground-tests
agent: tester
execution: inline
inputFile: squads/nxz-captain-qa/output/collected-conversations.json
outputFile: squads/nxz-captain-qa/output/test-results.json
---

# Execucao dos Testes no Playground

## Objetivo

Para cada conversa coletada, reproduzir as mensagens do cliente no Playground do Captain
e capturar as respostas geradas, criando pares de comparacao.

## Instrucoes

1. Leia o arquivo de conversas coletadas
2. Leia as credenciais do Chatwoot do .env
3. Para cada conversa:
   a. Extraia a primeira mensagem do cliente (incoming)
   b. Envie ao Playground do Captain:
      POST /api/v1/accounts/{account_id}/captain/assistants/{assistant_id}/playground
   c. Capture a resposta do Captain
   d. Compare com a resposta real (outgoing) do agente humano ou Captain original
4. Crie pares de teste: pergunta do cliente + resposta do Captain (playground) + resposta real (referencia)
5. Reporte progresso: "Testando conversa X/N do time Y..."
6. Salve os resultados

## Formato de Saida

```json
{
  "assistant_id": N,
  "test_date": "ISO date",
  "teams": {
    "team_name": {
      "test_pairs": [
        {
          "conversation_id": N,
          "customer_message": "texto do cliente",
          "captain_playground_response": "resposta do Captain no playground",
          "reference_response": "resposta real do agente/captain original",
          "reference_sender_type": "User|Captain::Assistant",
          "conversation_context": ["mensagens anteriores para contexto"],
          "had_handoff_in_original": true|false
        }
      ],
      "total_tested": N,
      "total_failed": N
    }
  }
}
```

## Veto Conditions

- Menos de 50% dos testes executados com sucesso
- Playground API retornando erros consistentes
- Arquivo de resultados nao gerado
