---
task: "Design da Hierarquia"
order: 2
input: |
  - department_profiles: Perfis dos departamentos (brainstorm)
  - research_findings: Pesquisa ClickUp
output: |
  - hierarchy_design: Hierarquia completa do workspace por departamento
---

# Design da Hierarquia

Projetar a hierarquia do ClickUp (Spaces, Folders, Lists) para cada departamento
com base no brainstorm realizado e na pesquisa de funcionalidades.

## Process

1. Para cada departamento, traduzir processos em hierarquia:
   - 1 Space por departamento
   - Folders agrupam processos relacionados
   - Lists representam tipos de tarefa dentro de cada processo
2. Aplicar regra de simplicidade: se Folder teria só 1 List, usar List direto no Space
3. Nomear de forma clara e padronizada
4. Gerar diagrama Mermaid da hierarquia
5. Apresentar ao usuário para aprovação

## Output Format

```markdown
## {Departamento}

### Hierarquia
- Space: {nome}
  - Folder: {nome}
    - List: {nome}
    - List: {nome}
  - List: {nome} (sem Folder, processo simples)

### Diagrama
(mermaid graph TD)
```

## Output Example

```markdown
## Suporte

### Hierarquia
- Space: Suporte
  - Folder: Tickets
    - List: Tickets Ativos
    - List: Tickets Resolvidos (arquivo)
  - Folder: Knowledge Base
    - List: Artigos FAQ
    - List: Troubleshooting
  - List: Escalações (sem Folder — processo simples)

### Diagrama
graph TD
    A[Space: Suporte] --> B[Folder: Tickets]
    A --> C[Folder: Knowledge Base]
    A --> D[List: Escalações]
    B --> E[List: Tickets Ativos]
    B --> F[List: Tickets Resolvidos]
    C --> G[List: Artigos FAQ]
    C --> H[List: Troubleshooting]
```

## Quality Criteria

- [ ] 1 Space por departamento (não mais, não menos)
- [ ] Folders justificados (mais de 1 List dentro)
- [ ] Nomes claros e consistentes
- [ ] Diagrama Mermaid gerado

## Veto Conditions

1. Departamento sem hierarquia definida
2. Hierarquia com mais de 4 níveis de profundidade
