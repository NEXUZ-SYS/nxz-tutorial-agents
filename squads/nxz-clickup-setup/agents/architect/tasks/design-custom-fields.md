---
task: "Design de Custom Fields"
order: 4
input: |
  - department_profiles: Processos e necessidades
  - hierarchy_design: Hierarquia definida
  - research_findings: Funcionalidades ClickUp
output: |
  - custom_fields_spec: Especificação de Custom Fields por List
---

# Design de Custom Fields

Definir os Custom Fields necessários para cada List, com tipos adequados
e opções quando aplicável.

## Process

1. Para cada List na hierarquia, identificar dados que precisam ser trackeados
2. Escolher o tipo de campo adequado:
   - Dropdown: categorias fixas
   - Number: métricas numéricas
   - Currency: valores monetários
   - Date: prazos e datas
   - Checkbox: sim/não
   - Rating: escalas 1-5
   - Text: informação livre
   - Formula: cálculos automáticos
3. Definir opções para campos Dropdown
4. Indicar quais campos são obrigatórios
5. Verificar se há campos que devem ser compartilhados entre Lists do mesmo Space

## Output Format

```markdown
### {Departamento} → {List}

| Campo | Tipo | Opções | Obrigatório |
|---|---|---|---|
| ... | ... | ... | Sim/Não |
```

## Output Example

```markdown
### Vendas → Pipeline

| Campo | Tipo | Opções | Obrigatório |
|---|---|---|---|
| Valor do Deal | Currency (BRL) | — | Sim |
| Probabilidade | Number (%) | — | Sim |
| Etapa | Dropdown | Inbound, Outbound, Indicação, Upsell | Sim |
| Próximo Contato | Date | — | Não |
| Produto Interesse | Dropdown | NXZ ERP, NXZ Go, NXZ KDS, NXZ Delivery | Sim |
| Decisor | Text | — | Não |
| Score | Rating (1-5) | — | Não |
```

## Quality Criteria

- [ ] Mínimo 3 Custom Fields por List principal
- [ ] Tipos adequados (não usar Text onde Dropdown serve melhor)
- [ ] Campos obrigatórios marcados
- [ ] Opções de Dropdown definidas quando aplicável

## Veto Conditions

1. List principal sem Custom Fields definidos
2. Todos os campos são Text (sem estruturação)
