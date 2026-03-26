---
id: run-playground-tests
agent: tester
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/test_plan.json
outputFile: squads/nxz-faq-chatwoot/output/test_results.json
---

# Execucao dos Testes no Agente de IA

## Objetivo

Enviar perguntas reais dos clientes ao agente de IA do Chatwoot via Copilot
Threads API e avaliar se as respostas utilizam as FAQs publicadas corretamente.

## Instrucoes

1. Leia o plano de teste (test_plan.json)
2. Leia credenciais do .env (CHATWOOT_BASE_URL, CHATWOOT_API_TOKEN, CHATWOOT_ACCOUNT_ID)
3. Para cada pergunta do plano:
   a. Crie um thread: POST /api/v1/accounts/{account_id}/captain/copilot_threads
      - Body: `{"assistant_id": 3, "message": "{pergunta}"}`
   b. Aguarde 10 segundos
   c. Busque mensagens: GET .../copilot_threads/{thread_id}/messages
   d. Identifique resposta do Captain (sender_type: "Captain::Assistant")
   e. Se nao houver resposta em 30s, registre como TIMEOUT
   f. Classifique: ACERTOU, PARCIAL, GENERICO, ERROU ou TIMEOUT
   g. Justifique a classificacao em 1-2 frases
4. Calcule taxa de acerto: (ACERTOU + PARCIAL * 0.5) / total_respondidas * 100
5. Gere test_results.json e test_report.md
6. Reporte progresso: "Testando pergunta X/N..."

## Fallback

Se a API do Copilot Threads falhar consistentemente (3+ erros seguidos):
- Registre o erro
- Aborte apenas esta etapa
- Informe no relatorio que o teste nao pode ser executado
- O fluxo continua para o checkpoint (Carol revisara FAQs sem relatorio de teste)

## Veto Conditions

- Menos de 50% dos testes executados com sucesso
- Falha de autenticacao na API
