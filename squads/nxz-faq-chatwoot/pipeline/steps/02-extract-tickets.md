---
id: extract-tickets
agent: extractor
execution: subagent
model_tier: powerful
inputFile: squads/nxz-faq-chatwoot/output/run-config.md
outputFile: squads/nxz-faq-chatwoot/output/extracted-conversations.json
---

# Extracao de Conversas dos Clientes

## Objetivo

Extrair conversas resolvidas do Chatwoot, agrupando todas as mensagens por
conversation_id em ordem cronologica estrita. O objetivo e capturar a jornada
completa do cliente — do problema relatado ate a resolucao — para que a analise
de padroes tenha contexto suficiente para identificar o problema real, e nao
apenas a formulacao da pergunta.

Regra fundamental: mensagens dos agentes humanos NAO sao fonte confiavel para
gerar conteudo de FAQ. Elas sao coletadas exclusivamente como contexto para
entender o problema e a resolucao — nunca como base para o texto publicado.

## Instrucoes

1. Leia o arquivo de configuracao para obter: periodo, volume, inbox_ids
2. Leia as credenciais do Chatwoot do arquivo `.env`
3. Filtre conversas resolvidas no periodo via POST /api/v1/accounts/{account_id}/conversations/filter
   - Status: resolved
   - Periodo: conforme configuracao
   - Inbox: se inbox_ids estiver definido e nao for "Todas as inboxes", inclua o filtro
     inbox_id no payload usando o operador "equal_to". Exemplo de payload:
     ```json
     {
       "payload": [
         {"attribute_key": "status", "filter_operator": "equal_to", "values": ["resolved"], "query_operator": "AND"},
         {"attribute_key": "created_at", "filter_operator": "is_greater_than", "values": ["YYYY-MM-DD"], "query_operator": "AND"},
         {"attribute_key": "inbox_id", "filter_operator": "equal_to", "values": [19], "query_operator": null}
       ]
     }
     ```
     Se inbox_ids contiver mais de uma inbox, execute a requisicao uma vez por inbox_id
     e una os resultados antes de paginar, mantendo o volume total configurado.
   - Paginar com ?page=N ate atingir o volume configurado
4. Para cada conversa:
   a. Extraia todas as mensagens via GET /api/v1/accounts/{account_id}/conversations/{id}/messages
   b. Para cada mensagem, registre:
      - role: "customer" se incoming (type 0, sender_type Contact)
      - role: "agent" se outgoing (type 1, sender_type AgentBot ou User)
      - time: extraido do campo created_at da mensagem, no formato HH:mm:ss.SSS
      - text: conteudo da mensagem
   c. Exclua mensagens do tipo activity e template
   d. Monte o array messages ordenado ESTRITAMENTE por timestamp (created_at)
      — a ordem cronologica e critica para preservar o contexto da conversa
   e. Identifique o canal da conversa (WhatsApp, Email, Widget, etc.)
   f. Gere o campo context_conversation via LLM conforme instrucoes abaixo
5. Estruture no formato JSON de saida agrupado por conversa
6. Reporte progresso a cada 10 conversas

## Regra para ordenacao do campo messages

O array messages DEVE estar em ordem cronologica crescente por created_at.
Nunca separe mensagens por papel antes de ordenar — a intercalacao entre
customer e agent e parte essencial do contexto. Mensagens com o mesmo segundo
devem ser desempatadas pelo milissegundo (campo SSS do time).

## Regra para gerar context_conversation

O campo context_conversation NAO deve ser preenchido com regras manuais. Ele
deve ser gerado via chamada ao LLM, replicando o mesmo mecanismo que o Captain
do Chatwoot usa internamente para summarizar conversas.

### Passo 1 — Formatar o texto da conversa

Monte o texto da conversa no mesmo formato do conversation_llm_formatter do
Chatwoot, antes de enviar ao LLM:

```
Conversation ID: #{conversation_id}
Channel: {channel}
Message History:
User: {texto da mensagem do cliente}
Support Agent: {texto da mensagem do agente}
Bot: {texto de mensagem de bot, se houver}
```

Regras de formatacao:
- Mensagens privadas (notas internas) devem ser prefixadas: "[Private Note] Support Agent:"
- Mensagens em ordem cronologica ASC (mesma ordem do array messages)
- Nao inclua mensagens do tipo activity nem template

### Passo 2 — Chamar o LLM com o system prompt adaptado

Envie o texto formatado acima como mensagem do usuario (`role: user`) com o
seguinte system prompt (`role: system`):

---
**SYSTEM PROMPT — NXZ FAQ Context Extractor**

You are an AI-powered conversation analysis tool for NXZ support tickets. Your
task is to analyze conversations between support agents and customers and extract
structured context that will be used to generate FAQ articles for the NXZ Help
Center.

Rules:
1. Be brief and concise in all fields.
2. Focus exclusively on information relevant to the customer's problem and its
   resolution. Remove greetings, farewells, and off-topic exchanges.
3. Identify the NXZ product involved (NXZ ERP, NXZ Go, NXZ KDS, NXZ Delivery,
   NXZ Pay Go) and the specific feature or module (e.g., "Abertura de Caixa no
   PDV", "Cadastro de Produto", "Fechamento de Turno").
4. For causa_raiz, use only what can be inferred from the agent's responses.
   Use "nao identificada" when not determinable.
5. For resolucao, describe what actually resolved the issue. Use "nao confirmada"
   if the customer did not confirm resolution.
6. Do not include personal data: customer names, phone numbers, account IDs.
7. Do not insert your own opinions or add information not present in the
   conversation.
8. The observacoes field is optional — only populate it if there is relevant
   contextual information that does not fit the other fields (e.g., recurrence
   pattern, dependency on another module, operational context).
9. If a section has no content, set its value to null.
10. Mark technically important terms in bold using markdown syntax.
11. Reply in Brazilian Portuguese.

Output must be valid JSON with exactly these fields:
{
  "problema_principal": "...",
  "produto_funcionalidade": "...",
  "causa_raiz": "...",
  "resolucao": "...",
  "observacoes": "..." or null
}
---

### Passo 3 — Usar a resposta do LLM como context_conversation

O JSON retornado pelo LLM e usado diretamente como valor do campo
context_conversation no objeto da conversa. Nao reinterprete nem reescreva
o resultado — use como recebido.

## Formato de Saida

```json
{
  "extraction_date": "YYYY-MM-DD",
  "period": {"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"},
  "total_conversations": 150,
  "conversations": [
    {
      "conversation_id": 12345,
      "product": "NXZ ERP",
      "labels": ["erp", "pdv"],
      "channel": "WhatsApp",
      "created_at": "2026-03-15T10:30:00Z",
      "resolved_at": "2026-03-15T11:45:00Z",
      "messages": [
        {"role": "customer", "time": "10:30:15.123", "text": "Ola"},
        {"role": "agent", "time": "10:31:02.456", "text": "Boa tarde. Sou o Luiz da Nexuz. Como posso ajudar?"},
        {"role": "customer", "time": "10:32:45.789", "text": "Estou com problema pra abrir o caixa"},
        {"role": "agent", "time": "10:35:10.012", "text": "Vou verificar. Qual o erro que aparece?"},
        {"role": "customer", "time": "10:36:22.301", "text": "Aparece que nao tenho permissao"},
        {"role": "agent", "time": "10:38:55.640", "text": "Precisa ajustar o perfil do operador em Configuracoes > Caixa"}
      ],
      "context_conversation": {
        "problema_principal": "Cliente nao conseguia abrir o caixa no PDV — aparecia mensagem de sem permissao ao clicar em abrir.",
        "produto_funcionalidade": "NXZ ERP — **Abertura de Caixa** no PDV",
        "causa_raiz": "Perfil do operador sem **permissao de abertura de caixa** configurada.",
        "resolucao": "Agente orientou ajuste de permissao em **Configuracoes > Caixa**. Cliente confirmou resolucao.",
        "observacoes": "Situacao comum em implantacoes recentes onde os perfis sao copiados sem revisar permissoes de caixa."
      }
    }
  ],
  "by_product": {
    "NXZ ERP": 60,
    "NXZ Go": 35,
    "NXZ KDS": 20,
    "NXZ Delivery": 25,
    "NXZ Pay Go": 7,
    "indefinido": 3
  }
}
```

## Veto Conditions

- Menos de 10 conversas coletadas no total
- Falha de autenticacao na API
- Arquivo de saida nao gerado
- Nenhuma conversa com o campo messages preenchido
- Array messages com mensagens fora de ordem cronologica
- context_conversation ausente ou com todos os campos nulos em mais de 20% das conversas
