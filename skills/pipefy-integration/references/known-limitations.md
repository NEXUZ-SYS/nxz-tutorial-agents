# Pipefy — Known Limitations

> Atualizado: 2026-04-20

## API Limitations

| # | Limitação | Impacto | Workaround |
|---|---|---|---|
| 1 | `updatePhaseField` NÃO funciona em start form fields | Não é possível atualizar campos do start form via API | Deletar e recriar o campo |
| 2 | Conditional fields NÃO disparam via API | Campos populados via GraphQL não ativam regras de show/hide | Enviar explicitamente todos os campos condicionais |
| 1a | **ID collision entre phase_field e table_field com mesmo slug** | `updatePhaseField(id: X)` retorna "Acesso negado" (PERMISSION_DENIED) quando o mesmo slug existe em uma table. Ex.: `n_unidades` em Qualificação E em tabela Clientes | **Passar `id` + `uuid` juntos** em `updatePhaseField`. O `uuid` desambigua (confirmado 2026-04-20 na config Nexuz Vendas) |
| 1b | **Phase fields criados inicialmente no Novo Lead NÃO movem para Start Form** | Criar fields na phase "Novo Lead" (primeira visível) não popula o Start Form. O Start Form tem uma phase oculta própria (`pipe.startFormPhaseId`) | Criar fields diretamente em `pipe.startFormPhaseId`. Corrigir retroativamente exige recriar o pipe (deletePhaseField bloqueia types específicos) |
| 1c | **deletePhaseField bloqueia ~85% dos types via API** | Retorna "Acesso negado" para select/number/currency/datetime/checkbox/etc. Só consegue deletar alguns `long_text` e `attachment`. Provável causa: field virou title/summary auto ou está referenciado em connector | **Deletar pipe inteiro + recriar** é mais confiável que tentar deletes granulares |
| 1d | **Pipefy cria 3 phases default** (Caixa de entrada, Fazendo, Concluído) em qualquer `createPipe` | Mesmo quando `phases: [...]` é explícito. Polui a visualização | Capturar IDs e chamar `deletePhase` pra cada uma após `createPipe` (essas SIM deletam) |
| 1e | **Pipefy fields boolean: não existe `checkbox` em phase_fields** | Erro "Field type not found with id: checkbox" | Usar `radio_horizontal` com `options: ["Sim","Não"]` (padrão dos templates CRM) |
| 1f | **CreatePipeInput NÃO aceita `public`** | Erro "doesn't accept argument 'public'" | Public é configurado via outra mutation (pipe padrão é privado) |
| 1g | **`phase_field.help` NÃO renderiza no UI do Pipefy** | Campo `help` é guardado pela API mas não aparece como ícone `?` no card/start form. Só `description` aparece (logo abaixo do label) | Usar `description` para tudo que o usuário precisa ver. `help` só serve como metadata/export |
| 1h | **Statement label máx ~255 chars** | Mensagem de erro genérica "Algo deu errado" quando label > ~255 chars | Quebrar textos longos em múltiplos statements OU colocar em KB externa e linkar |
| 1i | **`phase.description` renderiza no UI** | Aparece no topo da coluna/phase (visível para todo usuário) | Usar para contexto de etapa: SLA, Gate, RACI, link para Playbook |
| 1j | **`json.dumps` quebra emojis em surrogate pairs** → GraphQL rejeita com "bad Unicode escape sequence" | Emojis como 📖 📎 ✅ em label/description falham | Passar `ensure_ascii=False` no `json.dumps`, ou usar caracteres BMP (→, —, •, ★) no lugar |
| 1k | **Markdown `[texto](url)` funciona em `phase_field.description` E em `phase.description`** | Aparece como link clicável (texto azul sublinhado) | Usar `[Label humano](https://...)` — NÃO funciona em: `statement.label`, `field.label`, `help`, `pipe.description` (confirmado); URLs diretas (https://...) também auto-linkam em description; preferir markdown para UX mais limpa |
| 1l | **Markdown em `statement.label` — validar caso a caso** | Por doc Pipefy statements aceitam markdown, mas verificar visualmente pois alguns contextos mostram markdown literal | Se markdown falhar em statement, usar apenas texto de instrução (sem link) e colocar links só em `phase_field.description` |
| 1m | **`pipe.description` é read-only via API** | `UpdatePipeInput` NÃO tem campo `description`. Só pode ser setado via UI (settings do pipe) | Ou setar manualmente no UI, ou colocar o link master em algum `phase_field.description` no Start Form (primeiro contato do usuário com o pipe) |
| 1n | **Markdown confirmado pela doc oficial (validado 2026-04-20):** Links `[texto](url)` (sem espaço entre `]` e `(`), bold `**`, italic `*`, strike `~~`, listas, tabelas, imagens `![alt][1]`/`[1]: url`. **NÃO suportado:** HTML tags, headings `#`, code blocks, blockquotes. Field `label` **NÃO aplica markdown** (asteriscos literais). | — | Usar apenas markdown; evitar HTML; para headings usar bold + emoji |
| 1o | **Quebra de linha em `phase.description` renderiza com `\n\n`** (parágrafo duplo). Textos longos em 1 linha **ficam cortados** no header da coluna/phase do Kanban. Limite visual estimado: ~60-70 chars antes de truncar. | Descrição longa parece sumir no UI mesmo estando no backend | Usar `\n\n` para quebrar em parágrafos; manter cada parágrafo ≤ 60 chars para evitar truncamento visual. Confirmado empiricamente em 2026-04-20 para Pipe Vendas Nexuz (Novo Lead phase) |
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
| 14 | **`/graphql` (public) NÃO tem `createEmailTemplate`**, mas `/graphql/core` (interno) tem — e aceita o mesmo Bearer token | Sem o endpoint interno, email templates precisariam ser criados via UI/Playwright | **Descoberto 2026-04-21**: usar `https://app.pipefy.com/graphql/core` com `PIPEFY_API_TOKEN` para `createEmailTemplate`, `updateEmailTemplate`, `deleteEmailTemplate`, `createEmailSignature`, `updateEmailSignature`, `deleteEmailSignature`. Input schema: `name`, `subject`, `body`, `fromName`, `fromEmail`, `toEmail`, `locale`, `timeZone`, `repoId` (todos NOT NULL); `bccEmail`, `ccEmail` opcionais. `toEmail` aceita slug de connector/field do pipe (ex.: `{{contatos_do_deal}}`). |
| 15 | **`/graphql/core` é endpoint "interno" descoberto via recon network** | Pode mudar sem aviso; não está na documentação pública do Pipefy | Monitorar; se mudar, re-sniffar com `scripts/templates/recon-email-templates.js` |

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
