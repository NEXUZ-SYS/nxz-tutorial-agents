---
task: "Criar Estrutura do Workspace"
order: 1
input: |
  - workspace_design: Design aprovado com hierarquia
output: |
  - workspace_ids: IDs dos Spaces, Folders e Lists criados
  - creation_log: Log de cada operação
---

# Criar Estrutura do Workspace

Criar Spaces, Folders e Lists no ClickUp conforme design aprovado usando MCP tools.

## Process

1. Usar `clickup_get_workspace_hierarchy` para verificar estado atual
2. Para cada departamento no design:
   a. Verificar se Space já existe
   b. Se não, criar Space (registrar ID)
   c. Para cada Folder no design:
      - Criar Folder no Space usando `clickup_create_folder`
      - Registrar ID
   d. Para cada List no design:
      - Criar List no Folder usando `clickup_create_list_in_folder`
      - Ou criar List direto no Space usando `clickup_create_list`
      - Registrar ID
3. Após criar tudo, usar `clickup_get_workspace_hierarchy` para validar
4. Configurar Custom Fields em cada List usando `clickup_get_custom_fields`

## Output Format

```markdown
## Space: {nome}
- [✅] Criado — ID: {id}
  ### Folder: {nome}
  - [✅] Criado — ID: {id}
    #### List: {nome}
    - [✅] Criada — ID: {id}
```

## Output Example

```markdown
## Space: Suporte
- [✅] Criado em 2026-03-27 15:30:00 — ID: 90120001

### Folder: Tickets
- [✅] Criado em 2026-03-27 15:30:15 — ID: 90120002

#### List: Tickets Ativos
- [✅] Criada em 2026-03-27 15:30:30 — ID: 901200021
- Statuses configurados: Novo, Em Triagem, Em Atendimento, Aguardando Cliente, Escalado, Resolvido

#### List: Tickets Resolvidos
- [✅] Criada em 2026-03-27 15:30:45 — ID: 901200022
```

## Quality Criteria

- [ ] Todos os Spaces criados
- [ ] Todos os Folders nos Spaces corretos
- [ ] Todas as Lists nos Folders corretos
- [ ] IDs registrados para cada recurso
- [ ] Validação final com hierarchy check

## Veto Conditions

1. Space criado no lugar errado ou com nome errado
2. Nenhum recurso foi efetivamente criado
