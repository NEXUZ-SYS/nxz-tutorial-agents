---
execution: inline
agent: squads/nxz-pipefy-setup/agents/reviewer
inputFile: squads/nxz-pipefy-setup/output/configuration-log.md
outputFile: squads/nxz-pipefy-setup/output/audit-report.md
required_skills:
  - pipefy-integration
---

# Step 08: Auditoria da Configuração

## Skill obrigatória

Toda leitura do Pipefy passa pela skill `pipefy-integration`. Abrir antes:

- `skills/pipefy-integration/SKILL.md` — matriz de decisão
- `skills/pipefy-integration/references/graphql-recipes.md` — queries de validação

Para auditoria usar **GraphQL API exclusivamente** (leitura nunca precisa de Playwright).

## Context Loading

- `squads/nxz-pipefy-setup/output/configuration-log.md` — log do step 06
- `squads/nxz-pipefy-setup/output/pipe-design.md` — design aprovado
- `squads/nxz-pipefy-setup/pipeline/data/quality-criteria.md` — critérios
- `squads/nxz-pipefy-setup/pipeline/data/anti-patterns.md` — erros comuns
- `squads/nxz-backoffice-processes/output/2026-04-16-165948/v6/process-design-document.md` — PDD

## Instructions

### Process
1. Ler design aprovado + log de configuração
2. Verificar estado real do Pipefy via GraphQL API:
   - Query `organization.pipes` — listar pipes
   - Query `pipe(id)` com phases, fields, labels — estrutura completa
   - Query `automations(repoId, organizationId)` — automações configuradas
   - Query connectors/relations
3. Comparar realidade vs design:
   - Nomes de pipes/phases/fields
   - Campos obrigatórios (required) nos gates corretos
   - Automações com triggers e actions corretos
   - Connectors com cardinalidade correta
4. Verificar conformidade com PDD:
   - Todas as etapas do funil mapeadas
   - Checklists de transição → campos required
   - SLAs configurados
   - Motivos de descarte presentes
5. Para cada critério em `quality-criteria.md`, atribuir score 1-10
6. Gerar verdict APPROVE / CONDITIONAL APPROVE / REJECT

## Output Format

```
==============================
 REVIEW VERDICT: {APPROVE/REJECT/CONDITIONAL APPROVE}
==============================

Data: {YYYY-MM-DD}
Skill usada: pipefy-integration v1.0.0
Interface usada: GraphQL API (read-only)

------------------------------
 SCORING TABLE
------------------------------
| Critério              | Score  | Resumo    |
|...

OVERALL: X/10

CONFORMIDADE COM PDD:
- Etapas do funil: X/9 mapeadas
- Checklists de transição: X/5 gates configurados
- Automações: X/Y do design implementadas
- SLAs: X/Y configurados
- Motivos de descarte: configurado/não configurado

DETAILED FEEDBACK:
...

PATH TO APPROVAL: (if not approved)
...
```

## Veto Conditions

1. Auditoria não verificou Pipefy real (só leu log)
2. Chamadas diretas à API sem passar pela skill
3. Algum critério de `quality-criteria.md` omitido
4. Uso de Playwright para leitura (desnecessário)

## Quality Criteria

- [ ] Skill `pipefy-integration` carregada antes de qualquer leitura
- [ ] Todos os critérios de `quality-criteria.md` avaliados
- [ ] Comparação design vs realidade feita item a item
- [ ] Automações verificadas via query `automations`
- [ ] Conformidade com PDD verificada (etapas, gates, SLAs)
- [ ] Required changes específicos e acionáveis
