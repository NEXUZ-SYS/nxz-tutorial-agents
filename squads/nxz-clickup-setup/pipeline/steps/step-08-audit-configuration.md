---
execution: inline
agent: squads/nxz-clickup-setup/agents/reviewer
inputFile: squads/nxz-clickup-setup/output/configuration-log.md
outputFile: squads/nxz-clickup-setup/output/audit-report.md
---

# Step 08: Auditoria da Configuração

## Context Loading

Load these files before executing:
- `squads/nxz-clickup-setup/output/configuration-log.md` — Log de operações executadas
- `squads/nxz-clickup-setup/output/workspace-design.md` — Design aprovado (referência)
- `squads/nxz-clickup-setup/pipeline/data/quality-criteria.md` — Critérios de qualidade
- `squads/nxz-clickup-setup/pipeline/data/anti-patterns.md` — Erros comuns

## Instructions

### Process
1. Ler o design aprovado e o log de configuração
2. Usar os MCP tools do ClickUp para verificar o estado atual:
   - `clickup_get_workspace_hierarchy` — verificar hierarquia criada
   - `clickup_get_list` — verificar Lists e statuses
   - `clickup_get_custom_fields` — verificar campos criados
3. Comparar o que foi configurado com o design aprovado
4. Para cada critério em quality-criteria.md, avaliar score 1-10
5. Verificar se algum anti-pattern foi introduzido
6. Gerar relatório de auditoria com verdict APPROVE/REJECT
7. Listar required changes se REJECT ou CONDITIONAL APPROVE

## Output Format

```
==============================
 REVIEW VERDICT: {APPROVE/REJECT/CONDITIONAL APPROVE}
==============================

Departamento: {nome}
Data: {YYYY-MM-DD}

------------------------------
 SCORING TABLE
------------------------------
| Critério              | Score  | Resumo    |
|...

OVERALL: X/10

DETAILED FEEDBACK:
...

PATH TO APPROVAL: (if not approved)
...
```

## Output Example

(See output-examples.md — Example 2 for a complete audit report)

## Veto Conditions

1. Auditoria não verificou o ClickUp real (apenas leu o log sem usar MCP tools)
2. Algum critério do quality-criteria.md foi completamente omitido da avaliação

## Quality Criteria

- [ ] Todos os 6 critérios de quality-criteria.md foram avaliados
- [ ] Cada score tem justificativa escrita
- [ ] Comparação design vs realidade foi feita
- [ ] Required changes são específicos e acionáveis
- [ ] Anti-patterns foram verificados
