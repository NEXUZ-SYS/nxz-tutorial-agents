---
execution: subagent
agent: squads/nxz-clickup-setup/agents/researcher
inputFile: squads/nxz-clickup-setup/pipeline/data/config-focus.md
outputFile: squads/nxz-clickup-setup/output/research-findings.md
model_tier: powerful
required_skills:
  - clickup-integration
---

# Step 02: Pesquisa de Documentação ClickUp

## Skill de referência

Antes de pesquisar na web, consultar o que a skill `clickup-integration` já
consolida — evita re-descobrir limitações conhecidas:

- `skills/clickup-integration/references/known-limitations.md` — gaps API/MCP
- `skills/clickup-integration/references/automation-patterns.md` — padrões validados
- `skills/clickup-integration/references/hierarchy-patterns.md` — design rules

A pesquisa externa deve **complementar** (novidades, casos específicos por
departamento), não duplicar o que já está documentado. Se encontrar uma nova
limitação ou padrão durante a pesquisa, atualizar a referência correspondente.

## Context Loading

Load these files before executing:
- `squads/nxz-clickup-setup/pipeline/data/config-focus.md` — Departamentos selecionados e nível de customização
- `squads/nxz-clickup-setup/pipeline/data/research-brief.md` — Pesquisa prévia sobre ClickUp
- `squads/nxz-clickup-setup/pipeline/data/domain-framework.md` — Framework de implementação
- `skills/clickup-integration/references/` — aprendizados já consolidados

## Instructions

### Process
1. Ler o config-focus.md para saber quais departamentos foram selecionados
2. Para cada departamento selecionado, pesquisar na documentação oficial do ClickUp (https://help.clickup.com/hc/en-us):
   - Templates de workflow recomendados para aquela área
   - Custom Fields mais usados
   - Automações recomendadas
   - Views otimizadas
3. Pesquisar best practices de OKR setup no ClickUp para os departamentos selecionados
4. Pesquisar ClickUp API/MCP capabilities para configuração programática
   (cruzar com `known-limitations.md` da skill — não repetir o que já sabemos)
5. Compilar tudo em um relatório estruturado por departamento

## Output Format

```
# Pesquisa ClickUp — Departamentos Selecionados

## Departamento: {Nome}

### Funcionalidades Recomendadas
- ...

### Workflow Sugerido
- Status: ...
- Custom Fields: ...

### Automações Recomendadas
- ...

### Views Otimizadas
- ...

### OKRs Sugeridos
- ...

## Sources
- [Título](URL)
```

## Output Example

```
# Pesquisa ClickUp — Departamentos Selecionados

## Departamento: Suporte

### Funcionalidades Recomendadas
- Tickets como Tasks com Custom Fields para prioridade, SLA, canal de origem
- Board View como visualização principal (Kanban por status)
- Automações para assignment baseado em prioridade
- Templates de task para diferentes tipos de ticket

### Workflow Sugerido
- Statuses: Novo → Em Triagem → Em Atendimento → Aguardando Cliente → Escalado → Resolvido
- Custom Fields: Prioridade (Dropdown), Canal (Dropdown), SLA horas (Number), Satisfação (Rating)
- Folder structure: Tickets / Knowledge Base / Escalations

### Automações Recomendadas
1. Task created → Assign to on-duty agent
2. Priority = Critical → Notify manager
3. SLA > 80% → Alert assignee
4. All subtasks done → Change status to Resolved

### Views Otimizadas
- Board (kanban por status) — visão diária
- List (com filtros) — relatórios
- Calendar (por SLA deadline) — gestão de prazos

### OKRs Sugeridos
- Objective: Reduzir tempo de resposta para < 1h
  - KR1: Tempo médio primeira resposta < 30min
  - KR2: 95% dos tickets resolvidos dentro do SLA
  - KR3: CSAT > 4.5/5.0

## Sources
- [Hierarchy best practices – ClickUp Help](https://help.clickup.com/hc/en-us/articles/20480724378135)
- [Intro to Automations – ClickUp Help](https://help.clickup.com/hc/en-us/articles/6312102752791)
```

## Veto Conditions

1. Output não cobre todos os departamentos selecionados no config-focus.md
2. Nenhuma fonte oficial do ClickUp citada (help.clickup.com ou clickup.com/blog)

## Quality Criteria

- [ ] Cada departamento tem seções de workflow, custom fields, automações e views
- [ ] Pelo menos 3 fontes oficiais do ClickUp citadas
- [ ] OKRs sugeridos com 3-5 Key Results por Objective
- [ ] Automações são específicas (trigger + action), não genéricas
- [ ] Custom Fields têm tipos definidos (Dropdown, Number, etc.)
