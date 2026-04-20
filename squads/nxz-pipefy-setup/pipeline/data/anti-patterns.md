# Anti-Patterns — Pipefy Setup

## Erros comuns a evitar

### 1. Phases demais (fragmented pipeline)
**Errado:** criar 1 phase por sub-etapa de entrada (Inbound, Outbound, Indicação = 3 phases separadas).
**Certo:** 1 phase "Novo Lead" com campo dropdown "Origem" para diferenciar.
**Por quê:** sub-etapas de entrada diferem apenas no SLA e dados mínimos, não no workflow.

### 2. Campos no card que deveriam estar na Database
**Errado:** colocar CNPJ, Razão Social, Segmento no card do Deal.
**Certo:** esses campos ficam na Database "Contas", conectada ao card via connector.
**Por quê:** se a Conta tiver múltiplos Deals, os dados seriam duplicados.

### 3. Automações demais (quota burn)
**Errado:** criar 1 automação por SLA de cada etapa + 1 por e-mail + 1 por move.
**Certo:** consolidar automações quando possível (1 automação com condições vs 5 separadas).
**Por quê:** 300 jobs/mês no Business podem esgotar em 2 semanas com funil ativo.

### 4. Required fields em excesso
**Errado:** marcar todos os campos como required em todas as phases.
**Certo:** required apenas nos gates de transição (checklists do PDD seção 5A).
**Por quê:** excesso de required trava o preenchimento e frustra o usuário.

### 5. Ignorar a ordem de criação
**Errado:** criar automações antes dos pipes/phases/fields.
**Certo:** Databases → Pipes → Phases → Fields → Connectors → Automations.
**Por quê:** automações dependem de IDs de phases e fields que só existem após criação.

### 6. Connector bidirecional sem proteção
**Errado:** criar sync rules bidirecionais (A→B e B→A) sem proteção contra loop.
**Certo:** sync unidirecional OU bidirecional com campo de controle que evita loop.
**Por quê:** loops de sync podem estourar quota de automação rapidamente.

### 7. Playwright para o que a API resolve
**Errado:** usar Playwright CLI para criar phases, fields ou automações.
**Certo:** GraphQL API para 95%+ das operações.
**Por quê:** API é 10x mais rápida, confiável e auditável que UI automation.

### 8. Hardcodar IDs
**Errado:** copiar IDs de um pipe de teste e usar no script de produção.
**Certo:** sempre capturar IDs do resultado da mutation e passá-los adiante.
**Por quê:** IDs mudam entre ambientes e reexecuções.

### 9. Esquecer a paginação
**Errado:** fazer query de cards sem paginação e assumir que retorna todos.
**Certo:** sempre paginar (max 50 por request) com cursor-based pagination.
**Por quê:** queries sem paginação retornam no máximo 50 registros.

### 10. Não validar após criar
**Errado:** criar pipe e assumir que está correto sem verificar.
**Certo:** query o pipe criado e comparar com o design.
**Por quê:** mutations podem ter sucesso parcial (pipe criado mas phase faltando).
