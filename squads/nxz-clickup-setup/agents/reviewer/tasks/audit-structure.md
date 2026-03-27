---
task: "Auditar Estrutura"
order: 1
input: |
  - configuration_log: Log de operações realizadas
  - workspace_design: Design aprovado
  - quality_criteria: Critérios de avaliação
output: |
  - audit_scores: Scores por critério com justificativa
---

# Auditar Estrutura

Verificar a configuração do ClickUp contra o design aprovado e os critérios de qualidade.

## Process

1. Ler o design aprovado e o log de configuração
2. Usar `clickup_get_workspace_hierarchy` para obter estado atual do ClickUp
3. Para cada departamento configurado:
   a. Verificar se Spaces, Folders, Lists existem conforme design
   b. Verificar nomes e organização
   c. Usar `clickup_get_list` para verificar statuses
   d. Usar `clickup_get_custom_fields` para verificar campos
4. Para cada critério em quality-criteria.md, atribuir score 1-10
5. Verificar anti-patterns (overengineering, campos no nível errado, etc.)
6. Compilar scores com justificativas

## Output Format

```markdown
| Critério | Score | Justificativa |
|---|---|---|
| Hierarquia | X/10 | ... |
| Custom Fields | X/10 | ... |
```

## Output Example

```markdown
| Critério | Score | Justificativa |
|---|---|---|
| Hierarquia | 9/10 | Todos Spaces, Folders e Lists criados conforme design. Nomes consistentes. |
| Custom Fields | 7/10 | Campos presentes mas falta campo "SLA" na List de Tickets |
| Statuses | 8/10 | Fluxo correto, grupos Active/Closed adequados |
| OKRs | 5/10 | Goals não criados via MCP, instruções manuais presentes mas incompletas |
| Automações | 6/10 | Nenhuma automação configurada via MCP, instruções manuais ok |
| Views | 8/10 | Board e List views configuradas, falta Calendar para Suporte |
```

## Quality Criteria

- [ ] Cada critério avaliado com score numérico
- [ ] Justificativa escrita para cada score
- [ ] Verificação feita via MCP tools (não só leitura de logs)
- [ ] Anti-patterns verificados

## Veto Conditions

1. Scores sem justificativa
2. Nenhuma verificação via MCP realizada
