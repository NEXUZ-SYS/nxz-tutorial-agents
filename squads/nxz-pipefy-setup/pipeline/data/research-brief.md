# Pipefy — Briefing de Pesquisa Prévia

## Fontes já consolidadas

### Dossiê Técnico (2026-04-16)
Disponível em `squads/nxz-backoffice-processes/output/2026-04-16-165948/v1/pipefy-dossier.md`.
Cobre: modelo conceitual, API GraphQL, campos, automações nativas, conexões cross-pipe,
formulários públicos, dashboards, permissões, limitações, planos/custo.

### Pesquisa de API (2026-04-20)
A skill `pipefy-integration` já documenta mutations/queries validadas:
- `createPipe` (com phases, labels, start_form_fields inline)
- `createPhase`, `createPhaseField`, `createFieldCondition`
- `createAutomation` (com conditions e actions)
- `createPipeRelation` (connectors cross-pipe)
- `createWebhook`, `createLabel`

### Informações-chave já conhecidas

**API:**
- Endpoint: `https://api.pipefy.com/graphql`
- Auth: Bearer token (Personal Access Token ou Service Account)
- Rate limits: 500 req/30s (lockout 5min), paginação max 50
- 117 mutations disponíveis
- `createPipe` aceita phases + labels + start_form_fields em 1 call

**Planos:**
- Business: US$ 33/user/mês — mínimo para API
- 300 automation jobs/mês (Business), 10.000 (Enterprise)

**Limitações:**
- Conditional fields via API: SIM (`createFieldCondition`)
- Automações via API: SIM (`createAutomation`)
- Dashboards avançados: NÃO (requer UI)
- PDF templates: NÃO (requer UI)
- Email inbox setup: NÃO (requer UI)
- `updatePhaseField` NÃO funciona em start form fields

## O que a pesquisa do Step 02 deve complementar

1. Validar mutations de automação com condições complexas (AND/OR)
2. Confirmar se `createFieldCondition` funciona para todos os tipos de condição
3. Investigar como configurar SLA/due dates via API
4. Verificar se há novidades na API desde 2026-04-16
5. Documentar qualquer gap encontrado durante testes reais
