---
id: collect-conversations
agent: collector
execution: subagent
model_tier: powerful
inputFile: squads/nxz-captain-qa/output/test-config.md
outputFile: squads/nxz-captain-qa/output/collected-conversations.json
---

# Coleta de Conversas

## Objetivo

Extrair conversas reais do Chatwoot via API, filtrando por time e periodo definidos no checkpoint anterior.

## Instrucoes

1. Leia o arquivo de configuracao do teste para obter: time(s), periodo, volume
2. Leia as credenciais do Chatwoot do arquivo `.env` (CHATWOOT_BASE_URL, CHATWOOT_API_TOKEN, CHATWOOT_ACCOUNT_ID)
3. Liste os times disponiveis via API: GET /api/v1/accounts/{account_id}/teams
4. Para cada time selecionado:
   a. Filtre conversas via POST /api/v1/accounts/{account_id}/conversations/filter
      - Filtros: team_id, created_at (periodo), status=resolved
      - Pagine com ?page=N ate atingir o volume desejado
   b. Para cada conversa encontrada:
      - Extraia todas as mensagens via GET /api/v1/accounts/{account_id}/conversations/{id}/messages
      - Pagine com ?before={message_id} se houver mais de 20 mensagens
      - Separe mensagens por tipo: incoming (cliente), outgoing (agente/captain), activity
      - Identifique mensagens do Captain (sender_type: "Captain::Assistant")
5. Estruture os dados no formato JSON de saida
6. Salve o arquivo de conversas coletadas

## Formato de Saida

```json
{
  "config": { "teams": [...], "period": {...}, "volume": N },
  "teams": {
    "team_name": {
      "team_id": N,
      "conversations": [
        {
          "id": N,
          "status": "resolved",
          "created_at": "ISO date",
          "messages": [
            {
              "id": N,
              "type": "incoming|outgoing|activity",
              "sender_type": "Contact|User|Captain::Assistant",
              "content": "texto",
              "created_at": "ISO date"
            }
          ],
          "had_captain": true|false,
          "had_handoff": true|false
        }
      ],
      "total_collected": N
    }
  }
}
```

## Veto Conditions

- Menos de 5 conversas coletadas no total
- Falha de autenticacao na API
- Arquivo de saida nao gerado
