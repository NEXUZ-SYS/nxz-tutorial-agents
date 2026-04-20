# Pipefy — Known Limitations

> Atualizado: 2026-04-20

## API Limitations

| # | Limitação | Impacto | Workaround |
|---|---|---|---|
| 1 | `updatePhaseField` NÃO funciona em start form fields | Não é possível atualizar campos do start form via API | Deletar e recriar o campo |
| 2 | Conditional fields NÃO disparam via API | Campos populados via GraphQL não ativam regras de show/hide | Enviar explicitamente todos os campos condicionais |
| 3 | Dashboards NÃO podem ser criados via API | Sem mutation para dashboards | Playwright CLI (raríssimo) |
| 4 | PDF Templates NÃO configuráveis via API | Sem mutation para templates PDF | Playwright CLI (raríssimo) |
| 5 | Email Inbox setup NÃO configurável via API | Configuração inicial requer UI | Playwright CLI (uma vez) |
| 6 | Power-ups/integrations NÃO configuráveis via API | Slack, Teams etc. requerem UI | Configurar manualmente |
| 7 | Paginação max 50 registros | Queries grandes precisam de paginação | Cursor-based pagination |
| 8 | Rate limit: 500 req/30s, lockout 5 min | Muitas calls rápidas travam a API | Delay 500ms entre calls |
| 9 | Links de arquivo expiram em 15 min | URLs de anexos não são permanentes | Regenerar quando necessário |
| 10 | Webhook `card.done` não dispara se phase mudou de active→done | Cards já na phase não são notificados | Mover card manualmente após alterar phase |
| 11 | Webhooks SLA não funcionam em Tables | Late/expired só funciona em Pipes | Usar automações internas |
| 12 | Automações não retornam na query `pipe()` | Precisam de query separada `automations()` | Usar `automations(repoId, organizationId)` |
| 13 | Quota 300 jobs/mês (Business) | Pode esgotar com funil ativo | Monitorar mensalmente; considerar Enterprise |

## UI-Only Operations (Playwright necessário)

| Operação | Frequência | Quando usar |
|---|---|---|
| Configurar dashboards visuais | Raríssimo (1x no setup) | Após toda a configuração via API |
| Configurar PDF templates | Raríssimo (1x no setup) | Se necessário para propostas |
| Setup email inbox | Raríssimo (1x no setup) | Se quiser email integrado |
| Configurar power-ups (Slack etc.) | Raríssimo (1x no setup) | Se necessário |
| Customizar formulário público (CSS/logo) | Raríssimo (1x no setup) | Após criar pipe com start form |

## Quirks

| # | Comportamento | Impacto | Mitigação |
|---|---|---|---|
| 1 | `createPipe` com phases define ordem pela posição no array | Ordem importa | Manter array na ordem visual desejada |
| 2 | `createFieldCondition` funciona mas conditions complexas (AND/OR nested) podem ter comportamento inesperado | Condições muito complexas | Testar manualmente após criar |
| 3 | IDs de fields na query retornam `internal_id` e `id` — usar `internal_id` para references em automações | Confusão de IDs | Sempre capturar ambos, usar internal_id |
| 4 | `currency` field não aceita formato com vírgula via API | Valores devem ser "1000.50" não "1.000,50" | Formatar como float com ponto decimal |
| 5 | `connector` field precisa do pipe_id target, não database_id | Erro se passar database_id | Verificar se é pipe ou database |
