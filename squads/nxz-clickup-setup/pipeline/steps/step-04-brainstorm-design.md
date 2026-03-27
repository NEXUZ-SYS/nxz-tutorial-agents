---
execution: inline
agent: squads/nxz-clickup-setup/agents/architect
inputFile: squads/nxz-clickup-setup/output/research-findings.md
outputFile: squads/nxz-clickup-setup/output/workspace-design.md
---

# Step 04: Brainstorm + Design do Workspace

## Context Loading

Load these files before executing:
- `squads/nxz-clickup-setup/output/research-findings.md` — Pesquisa sobre funcionalidades ClickUp
- `squads/nxz-clickup-setup/pipeline/data/config-focus.md` — Departamentos selecionados
- `squads/nxz-clickup-setup/pipeline/data/domain-framework.md` — Framework de implementação
- `squads/nxz-clickup-setup/pipeline/data/anti-patterns.md` — Erros comuns a evitar
- `_opensquad/_memory/company.md` — Contexto da empresa Nexuz

## Instructions

### Process
1. Ler os departamentos selecionados no config-focus.md
2. Para CADA departamento, em sequência:
   a. Fazer brainstorm interativo com o usuário:
      - Quais os processos principais deste departamento?
      - Quais as dores/gargalos atuais?
      - Quem são os responsáveis?
      - Que tipo de relatórios/visibilidade precisam?
   b. Com base nas respostas + pesquisa, projetar:
      - Hierarquia: Space → Folders → Lists
      - Custom Statuses por List
      - Custom Fields necessários
      - Automações recomendadas
      - Views otimizadas
   c. Gerar fluxograma Mermaid do workflow principal
   d. Gerar documentação completa em Markdown
   e. Apresentar ao usuário para validação antes de ir ao próximo departamento
3. Após todos os departamentos, compilar o design completo em um único documento
4. Incluir seção de OKRs com Goals sugeridos para cada departamento
5. Gerar visão geral da hierarquia completa do Workspace

## Output Format

```markdown
# Design do Workspace ClickUp — Nexuz

## Visão Geral da Hierarquia

(Diagrama Mermaid da hierarquia completa)

## Departamento: {Nome}

### Processos Mapeados
- ...

### Fluxograma
(Diagrama Mermaid do workflow)

### Hierarquia Proposta
- Space: {nome}
  - Folder: {nome}
    - List: {nome}
      - Statuses: ...

### Custom Fields
| Campo | Tipo | Opções/Descrição |

### Automações
| # | Trigger | Action |

### Views
- ...

### OKRs Sugeridos
- Objective: ...
  - KR1: ...
  - KR2: ...
  - KR3: ...

(Repetir para cada departamento)
```

## Output Example

(See output-examples.md for a complete example of a department design with Mermaid flowchart)

## Veto Conditions

1. Algum departamento selecionado foi omitido do design
2. Faltam fluxogramas Mermaid para qualquer departamento
3. Design não foi validado interativamente com o usuário por departamento

## Quality Criteria

- [ ] Cada departamento tem fluxograma Mermaid completo
- [ ] Cada departamento tem hierarquia (Space/Folders/Lists) definida
- [ ] Custom Fields com tipos específicos definidos
- [ ] Automações com trigger + action concretos
- [ ] OKRs com 3-5 Key Results por Objective
- [ ] Design segue anti-patterns (evita overengineering)
- [ ] Nomenclatura consistente entre departamentos
