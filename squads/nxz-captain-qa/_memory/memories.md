# NXZ Captain QA — Squad Memory

## Configuracao

- Chatwoot URL: definido em .env (CHATWOOT_BASE_URL)
- Chatwoot Token: definido em .env (CHATWOOT_API_TOKEN)
- Chatwoot Account: definido em .env (CHATWOOT_ACCOUNT_ID)
- Captain: 1 assistant unico para os 3 times
- Times reais do Chatwoot: comercial (1), relacionamento (2), implantacao (3), pre-vendas (4), financeiro (9), desenvolvimento (10)
- Captain assistant: NXZ AI (ID: 3)
- Frequencia: Sob demanda, apos mudancas no Captain

## Preferencias

- Volume padrao: 20-50 conversas por time
- Threshold de aprovacao: score >= 3.5 de 5.0
- Metricas: Correcao, Relevancia, Tom, Resolucao, Completude
- Output: Relatorio Markdown + metricas JSON

## Historico de Execucoes

### Run 2026-03-25-152501
- **Time testado:** Relacionamento (ID: 2)
- **Periodo:** 18/03 a 25/03/2026
- **Conversas coletadas:** 20
- **Testes executados:** 10 perguntas representativas
- **Score geral:** 2.44/5.0 (INSUFICIENTE)
- **Taxa aprovacao:** 10% (1/10)
- **Unico aprovado:** Certificado Digital (4.6/5.0)
- **Metodo de teste:** Copilot Threads API (Playground sempre retorna saudacao generica)
- **Descobertas tecnicas:**
  - Playground API sempre retorna mesma saudacao independente do input (assistant configurado para cumprimentar primeiro)
  - Copilot Threads API funciona para testar: POST /captain/copilot_threads com assistant_id + message
  - Resposta assincrona: aguardar ~10s e buscar mensagens do thread
  - Captain usa search_articles automaticamente (visivel no assistant_thinking)
  - Mensagens do Captain identificadas por sender_type "Captain::Assistant" (nao sender null como inicialmente observado)
  - Captain atualmente opera como roteador (menu de opcoes) e nao como assistente que responde perguntas
- **Gaps criticos na KB:** sangria, cadastro-produto, NF-devolucao, relatorio-vendas, erro-PDV
- **Recomendacoes:** Criar artigos Help Center para os 9 gaps identificados, configurar fallback inteligente, corrigir nomenclatura NXZ AI -> NXZ ERP
