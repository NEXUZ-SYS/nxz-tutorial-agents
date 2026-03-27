---
task: "Configurar OKRs e Goals"
order: 2
input: |
  - workspace_design: Design com OKRs sugeridos
  - workspace_ids: IDs dos recursos criados
output: |
  - okr_log: Log de Goals e Targets criados
---

# Configurar OKRs e Goals

Criar Goals, Targets e linkagem com tasks no ClickUp conforme design aprovado.

## Process

1. Verificar se ClickUp MCP suporta criação de Goals
2. Se sim:
   a. Criar Goal folder para cada departamento
   b. Criar Objectives como Goals
   c. Criar Key Results como Targets dentro de cada Goal
   d. Linkar targets a Lists/tasks quando possível
3. Se Goals API não disponível via MCP:
   a. Documentar como ação manual
   b. Gerar instruções detalhadas para criação manual
   c. Incluir screenshots/caminhos na interface ClickUp

## Output Format

```markdown
### OKRs — {Departamento}

#### Objective: {nome}
- [✅/⚠️ MANUAL] Goal criado — ID: {id}
  - KR1: {nome} — Target tipo: {type}
  - KR2: {nome} — Target tipo: {type}
  - KR3: {nome} — Target tipo: {type}
```

## Output Example

```markdown
### OKRs — Suporte

#### Objective: Reduzir tempo de resposta para < 1h
- [⚠️ MANUAL] Goals API não disponível via MCP

**Instruções para criação manual:**
1. Acesse ClickUp → Goals (barra lateral)
2. Crie Folder "Suporte Q2 2026"
3. Adicione Goal: "Reduzir tempo de resposta para < 1h"
4. Adicione Targets:
   - "Tempo médio primeira resposta < 30min" (Number, target: 30)
   - "95% tickets no SLA" (Percentage, target: 95)
   - "CSAT > 4.5" (Number, target: 4.5)
5. Link cada target ao Space "Suporte"
```

## Quality Criteria

- [ ] Cada departamento tem pelo menos 1 Objective com 3+ KRs
- [ ] Targets com tipos adequados (Number, Percentage, Currency, True/False)
- [ ] Ações manuais com instruções detalhadas

## Veto Conditions

1. OKRs do design completamente ignorados
2. Ações manuais sem instruções de como fazer
