---
execution: subagent
agent: squads/nxz-pipefy-setup/agents/researcher
inputFile: squads/nxz-pipefy-setup/pipeline/data/config-focus.md
outputFile: squads/nxz-pipefy-setup/output/research-findings.md
model_tier: powerful
required_skills:
  - pipefy-integration
---

# Step 02: Pesquisa de API e Documentação Pipefy

## Skill de referência

Antes de pesquisar na web, consultar o que a skill `pipefy-integration` já
consolida — evita re-descobrir limitações conhecidas:

- `skills/pipefy-integration/references/known-limitations.md` — gaps API
- `skills/pipefy-integration/references/automation-patterns.md` — padrões validados
- `skills/pipefy-integration/references/graphql-recipes.md` — mutations/queries

A pesquisa externa deve **complementar** (novidades, limites específicos), não
duplicar o que já está documentado.

## Context Loading

- `squads/nxz-pipefy-setup/pipeline/data/config-focus.md` — Escopo selecionado
- `squads/nxz-pipefy-setup/pipeline/data/research-brief.md` — Pesquisa prévia
- `squads/nxz-backoffice-processes/output/2026-04-16-165948/v1/pipefy-dossier.md` — Dossiê técnico
- `skills/pipefy-integration/references/` — aprendizados consolidados

## Instructions

### Process
1. Ler o config-focus.md para saber qual escopo foi selecionado
2. Pesquisar na documentação oficial do Pipefy:
   - https://developers.pipefy.com (GraphQL API reference)
   - https://help.pipefy.com (guides and tutorials)
   - https://community.pipefy.com (community solutions)
3. Para cada componente no escopo selecionado, documentar:
   - Mutations/queries GraphQL necessárias
   - Parâmetros obrigatórios e opcionais
   - Limitações e workarounds conhecidos
   - Exemplos de uso real
4. Validar as informações do Dossiê Técnico (v1/pipefy-dossier.md):
   - Confirmar se quota de 300 jobs/mês ainda é válida
   - Confirmar se conditional fields ainda não disparam via API
   - Verificar se há novidades na API desde a pesquisa anterior
5. Pesquisar especificamente:
   - Como criar automações com múltiplas condições via API
   - Como configurar SLA/late alerts via API
   - Como criar email templates com dynamic fields
   - Como configurar connector fields com sync rules
   - Limites de rate limiting da API

## Output Format

```markdown
# Pesquisa Pipefy API — Escopo Selecionado

## API GraphQL — Operações Disponíveis

### Pipes
- Mutation: createPipe, updatePipe, deletePipe
- Query: pipe(id), organization.pipes
- Parâmetros: ...
- Exemplo: ...

### Phases
...

### Fields
...

### Automations
...

### Connections/Connectors
...

### Databases
...

### Webhooks
...

## Limitações Confirmadas
- ...

## Novidades desde última pesquisa
- ...

## Quota e Planos
- ...

## Sources
- [Título](URL)
```

## Veto Conditions

1. Output não cobre todos os componentes do escopo selecionado
2. Nenhuma fonte oficial do Pipefy citada (developers.pipefy.com ou help.pipefy.com)
3. GraphQL mutations sem exemplo de uso

## Quality Criteria

- [ ] Cada componente tem mutations/queries documentadas com exemplos
- [ ] Pelo menos 3 fontes oficiais citadas
- [ ] Limitações do dossiê técnico validadas ou atualizadas
- [ ] Rate limits e quotas documentados
- [ ] Parâmetros obrigatórios vs opcionais claramente diferenciados
