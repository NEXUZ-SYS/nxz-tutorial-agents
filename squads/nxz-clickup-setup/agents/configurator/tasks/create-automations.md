---
task: "Configurar Automações"
order: 3
input: |
  - workspace_design: Automações planejadas
  - workspace_ids: IDs dos recursos criados
output: |
  - automation_log: Log de automações configuradas
---

# Configurar Automações

Configurar automações no ClickUp conforme design aprovado.

## Process

1. Verificar se ClickUp MCP suporta criação de automações
2. Se sim:
   a. Para cada automação no design, configurar trigger + action
   b. Testar com task de exemplo quando possível
3. Se automações não disponíveis via MCP:
   a. Documentar como ação manual
   b. Gerar receitas detalhadas para configuração manual
   c. Incluir trigger, conditions e actions em formato passo a passo

## Output Format

```markdown
### Automações — {Departamento}

| # | Trigger | Action | Status |
|---|---|---|---|
| 1 | ... | ... | ✅/⚠️ MANUAL |
```

## Output Example

```markdown
### Automações — Suporte

| # | Trigger | Action | Status |
|---|---|---|---|
| 1 | Task created in "Tickets Ativos" | Assign to on-duty agent | ⚠️ MANUAL |
| 2 | Prioridade = "Crítica" | Post comment + notify @gerente | ⚠️ MANUAL |
| 3 | All subtasks done | Change status → "Resolvido" | ⚠️ MANUAL |

**Instruções para configuração manual:**

**Automação #1: Auto-assign**
1. Vá em Tickets Ativos → Automations
2. Click "Add Automation"
3. Trigger: "When task is created"
4. Action: "Change assignees" → "Add" → [agente de plantão]
5. Save
```

## Quality Criteria

- [ ] Cada departamento tem pelo menos 1 automação
- [ ] Automações com trigger + action definidos
- [ ] Status claro (configurado vs manual)
- [ ] Instruções manuais detalhadas quando MCP não suporta

## Veto Conditions

1. Nenhuma automação configurada ou documentada
2. Automações sem instruções manuais quando não disponível via MCP
