---
task: "Criar Quick Reference Cards"
order: 2
input: |
  - user_guide: Guia de uso completo
output: |
  - quick_reference: Cards de referência rápida por departamento
---

# Criar Quick Reference Cards

Gerar cards de referência rápida (1 tabela por departamento) com as ações
mais comuns e como executá-las no ClickUp.

## Process

1. Para cada departamento no guia de uso:
   a. Identificar as 5-8 ações mais frequentes
   b. Descrever cada ação em uma linha (máximo 2 frases)
   c. Incluir caminho no ClickUp (Space → Folder → List → ação)
2. Formatar como tabela escaneável
3. Adicionar card geral de navegação do workspace

## Output Format

```markdown
### Quick Reference — {Departamento}

| Ação | Como Fazer |
|---|---|
| ... | ... |
```

## Output Example

```markdown
### Quick Reference — Vendas

| Ação | Como Fazer |
|---|---|
| Novo lead | Space Vendas → Pipeline → + Add Task |
| Mover para próxima etapa | Arrastar card no Board View |
| Registrar valor | Editar Custom Field "Valor do Deal" |
| Agendar follow-up | Editar Custom Field "Próximo Contato" |
| Ver meu pipeline | Board View → filtrar por Assignee |
| Fechar negócio | Status → "Fechado Ganho" (CS notificado automaticamente) |
| Ver forecast | Dashboard Vendas |
```

## Quality Criteria

- [ ] Mínimo 5 ações por departamento
- [ ] Cada ação em no máximo 2 frases
- [ ] Caminho no ClickUp claro
- [ ] Automações mencionadas quando relevante

## Veto Conditions

1. Card com menos de 5 ações
2. Ações vagas sem caminho específico
