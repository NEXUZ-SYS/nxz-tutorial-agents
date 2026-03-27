---
task: "Design de Statuses e Views"
order: 5
input: |
  - hierarchy_design: Hierarquia definida
  - flowcharts: Fluxogramas dos processos
  - department_profiles: Processos e necessidades
output: |
  - statuses_spec: Statuses customizados por List
  - views_spec: Views recomendadas por Space
---

# Design de Statuses e Views

Definir statuses customizados para cada List (baseados nos fluxogramas)
e Views otimizadas para cada Space.

## Process

1. Para cada List, traduzir as etapas do fluxograma em statuses
2. Agrupar statuses em Active e Closed
3. Definir cores para cada status
4. Para cada Space, definir Views essenciais:
   - Board (Kanban): para workflows visuais
   - List: para filtros e relatórios
   - Calendar: para áreas com deadlines
   - Gantt: para projetos com dependências
5. Definir filtros padrão para cada View

## Output Format

```markdown
### {List} — Statuses

| Status | Grupo | Cor |
|---|---|---|
| ... | Active/Closed | ... |

### {Space} — Views

| View | Tipo | Filtros | Uso Principal |
|---|---|---|---|
```

## Output Example

```markdown
### Tickets Ativos — Statuses

| Status | Grupo | Cor |
|---|---|---|
| Novo | Active | 🔵 Azul |
| Em Triagem | Active | 🟡 Amarelo |
| Em Atendimento | Active | 🟠 Laranja |
| Aguardando Cliente | Active | 🟣 Roxo |
| Escalado | Active | 🔴 Vermelho |
| Resolvido | Closed | 🟢 Verde |

### Suporte — Views

| View | Tipo | Filtros | Uso Principal |
|---|---|---|---|
| Board Principal | Board | Status != Resolvido | Gestão diária de tickets |
| Meus Tickets | List | Assignee = eu | Visão individual |
| SLA Dashboard | Calendar | Prioridade = Crítica/Alta | Gestão de prazos |
| Todos os Tickets | List | Nenhum | Relatórios e busca |
```

## Quality Criteria

- [ ] Cada List tem statuses customizados (não genéricos)
- [ ] Statuses refletem o fluxograma do processo
- [ ] Grupo Active/Closed definido para cada status
- [ ] Views justificadas por caso de uso
- [ ] Máximo 3-4 Views por Space (evitar excesso)

## Veto Conditions

1. Statuses genéricos (To Do/In Progress/Done) para área que tem fluxo específico
2. Mais de 5 Views por Space (overengineering)
