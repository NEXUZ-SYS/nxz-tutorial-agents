# NXZ FAQ Chatwoot — Squad Memory

## Configuracao

- Chatwoot URL: definido em .env (CHATWOOT_BASE_URL)
- Chatwoot Token: definido em .env (CHATWOOT_API_TOKEN)
- Chatwoot Account: definido em .env (CHATWOOT_ACCOUNT_ID)
- Captain assistant: NXZ AI (ID: 3)
- Metodo de teste: Copilot Threads API (Playground retorna saudacao generica)
- Endpoint de leitura: GET .../copilot_threads/{id}/copilot_messages (NAO /messages)
- Filtrar message_type: "assistant" (ignorar "assistant_thinking")
- Validadora: Carol Oliveira (TELEGRAM_NOTIFY_CHAT_ID)
- Admin: Walter Frey (TELEGRAM_ADMIN_CHAT_ID)
- Frequencia: Quinzenal

## Produtos

- NXZ ERP: Sistema completo de gestao (Odoo 12)
- NXZ Go: Totem de autoatendimento
- NXZ KDS: Kitchen Display System
- NXZ Delivery: Centralizador de pedidos delivery
- NXZ Pay Go: App de pagamento em maquinas de cartao

## Decisoes de Design

- FAQs sao geradas do zero pelo agente writer, NAO copiadas das respostas dos agentes humanos
- Perguntas reais dos clientes sao usadas apenas como contexto de demanda
- Teste acontece ANTES da publicacao para criar comparativo antes/depois
- Taxa de acerto: (ACERTOU + PARCIAL * 0.5) / total_respondidas * 100
- Classificacao: ACERTOU, PARCIAL, GENERICO, ERROU, TIMEOUT
- Primeira execucao: max 5 FAQs por produto, baseline sem comparativo
- Threshold minimo para gerar FAQ: 3 tickets sobre o mesmo tema

## Historico de Execucoes

(nenhuma execucao realizada ainda)
