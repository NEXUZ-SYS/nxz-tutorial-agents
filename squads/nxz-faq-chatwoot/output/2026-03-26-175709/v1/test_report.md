# Relatorio de Testes — 2026-03-26

## Status: ABORTADO

Os testes nao puderam ser executados nesta rodada.

## Motivo

A API de Copilot Threads do Chatwoot nao permite recuperar mensagens individuais:
- `POST /captain/copilot_threads` funciona (cria thread com mensagem)
- `GET /captain/copilot_threads/{id}/messages` retorna **404**
- `GET /captain/copilot_threads/{id}` retorna **404**
- `GET /captain/copilot_threads` lista threads mas nao inclui mensagens

## Impacto

- 6 perguntas planejadas, 0 executadas
- Taxa de acerto: N/A
- Threads criados e nao consumidos: #48, #49

## Contexto

Esta e a **primeira execucao** (baseline). As FAQs ainda nao foram publicadas no Help Center, portanto o Captain nao teria acesso a elas de qualquer forma. O teste sera mais significativo apos a publicacao, na proxima rodada quinzenal.

## Recomendacao

1. Investigar a versao do Chatwoot e se a API de mensagens de Copilot Threads esta habilitada
2. Verificar se ha uma rota alternativa para ler respostas do Captain
3. Na proxima rodada, testar apos publicacao para medir o impacto real das FAQs

## Plano de Teste (preservado para proxima rodada)

| # | Pergunta | FAQ Esperada |
|---|----------|-------------|
| 1 | nao estava conseguindo atualizar o certificado digital | Certificado Digital A1 |
| 2 | Nao aparece para renovar o certificado | Certificado Digital A1 |
| 3 | Envio do certificado Digital e para voces? | Certificado Digital A1 |
| 4 | nao estou localizando no meu sistema para atualizar o certificado | Certificado Digital A1 |
| 5 | como pago minha mensalidade do nexuz? | Mensalidade Nexuz |
| 6 | preciso da segunda via do boleto da mensalidade | Mensalidade Nexuz |

**Ainda precisa de ajuda?** Fale com nosso suporte pelo WhatsApp.
