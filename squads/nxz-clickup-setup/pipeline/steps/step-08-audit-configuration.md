---
execution: inline
agent: squads/nxz-clickup-setup/agents/reviewer
inputFile: squads/nxz-clickup-setup/output/configuration-log.md
outputFile: squads/nxz-clickup-setup/output/audit-report.md
required_skills:
  - clickup-integration
---

# Step 08: Auditoria da Configuração

## Skill obrigatória

Toda leitura do ClickUp passa pela skill `clickup-integration`. Abrir antes:

- `skills/clickup-integration/SKILL.md` — matriz de decisão
- `skills/clickup-integration/references/api-v2-recipes.md` — curls de validação

Para auditoria usar **MCP primeiro, API v2 como fallback** (nunca Playwright CLI —
leitura não precisa de UI).

## Context Loading

- `squads/nxz-clickup-setup/output/configuration-log.md` — log do step 06
- `squads/nxz-clickup-setup/output/workspace-design.md` — design aprovado
- `squads/nxz-clickup-setup/pipeline/data/quality-criteria.md` — critérios
- `squads/nxz-clickup-setup/pipeline/data/anti-patterns.md` — erros comuns

## Instructions

### Process
1. Ler design aprovado + log de configuração
2. Verificar estado real do ClickUp via skill `clickup-integration`:
   - `clickup_get_workspace_hierarchy` (MCP) — hierarquia
   - `clickup_get_list` / `clickup_get_folder` (MCP) — statuses por List/Folder
   - `clickup_get_custom_fields` (MCP) — campos
   - Fallback API v2 quando MCP retornar 0 itens para recurso conhecido
   - Automações: `GET /api/v2/list/$LIST_ID/automation` (única forma sem abrir UI)
3. Comparar realidade vs design (nomes, hierarquia, statuses, campos, automações)
4. Para cada critério em `quality-criteria.md`, atribuir score 1-10 com justificativa
5. Verificar anti-patterns
6. Gerar verdict APPROVE / CONDITIONAL APPROVE / REJECT
7. Listar required changes acionáveis se não for APPROVE puro

## Output Format

```
==============================
 REVIEW VERDICT: {APPROVE/REJECT/CONDITIONAL APPROVE}
==============================

Departamento: {nome}
Data: {YYYY-MM-DD}
Skill usada: clickup-integration vX.Y.Z
Interfaces usadas: MCP / API v2

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

## Veto Conditions

1. Auditoria não verificou ClickUp real (só leu log)
2. Chamadas diretas ao MCP/API sem passar pela matriz da skill
3. Algum critério de `quality-criteria.md` omitido
4. Uso de Playwright CLI para leitura (desnecessário — veto)

## Quality Criteria

- [ ] Skill `clickup-integration` carregada antes de qualquer leitura
- [ ] Todos os 6 critérios de `quality-criteria.md` avaliados com score+justificativa
- [ ] Comparação design vs realidade feita item a item
- [ ] Automações verificadas via endpoint `/list/$ID/automation`
- [ ] Anti-patterns checados
- [ ] Required changes específicos e acionáveis
