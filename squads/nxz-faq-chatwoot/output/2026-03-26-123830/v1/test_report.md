# Relatorio de Testes — 2026-03-26

## Status: ABORTADO

O teste automatizado do agente de IA (Captain) nao pode ser executado nesta rodada.

## Causa

O endpoint para buscar mensagens de threads do Copilot nao esta disponivel nesta versao do Chatwoot:
- **Thread creation** (POST `/captain/copilot_threads`): funciona corretamente, retorna thread ID
- **Thread messages** (GET `/captain/copilot_threads/{id}/messages`): retorna 404 (Page not found)
- Testadas 5+ variacoes do endpoint, todas retornaram 404

## Impacto

- Nao ha taxa de acerto baseline para comparativo
- Carol revisara as FAQs manualmente sem dados de teste automatizado
- Recomendacao: investigar endpoint correto para proxima rodada ou usar Playwright para testar via UI do Playground

## Plano de Teste (nao executado)

12 perguntas estavam preparadas cobrindo 6 FAQs:
- Cancelamento de venda (2 perguntas)
- Acesso e login (2 perguntas)
- Impressora e impressao (2 perguntas)
- Nota fiscal (2 perguntas)
- Erros de sistema (2 perguntas)
- Integracao iFood/Rappi (2 perguntas)
