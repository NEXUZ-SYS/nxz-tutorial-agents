---
task: "Pesquisar Workflows por Departamento"
order: 2
input: |
  - features_map: Funcionalidades mapeadas por departamento
  - config_focus: Departamentos selecionados
output: |
  - workflow_recommendations: Workflows recomendados por departamento
  - automation_recipes: Receitas de automação recomendadas
---

# Pesquisar Workflows por Departamento

Pesquisar templates de workflow, status flows e automações recomendadas para cada
departamento, usando documentação oficial e blogs especializados.

## Process

1. Para cada departamento selecionado, buscar:
   - "ClickUp {departamento} workflow template" na web
   - "ClickUp {departamento} best practices" na web
   - Templates oficiais no ClickUp Help Center
2. Mapear o workflow recomendado: statuses, transições, gates
3. Identificar automações comuns para aquele tipo de workflow
4. Compilar recomendações de Custom Fields específicos para o workflow
5. Buscar exemplos reais de implementação bem-sucedida

## Output Format

```yaml
workflows:
  - department: "..."
    recommended_workflow:
      statuses: ["...", "...", "..."]
      transitions: "description of flow"
    automations:
      - trigger: "..."
        action: "..."
        description: "..."
    custom_fields:
      - name: "..."
        type: "Dropdown/Number/Currency/Date/Checkbox/Rating/Formula"
        options: ["..."] # if applicable
    sources:
      - title: "..."
        url: "..."
```

## Output Example

```yaml
workflows:
  - department: "Vendas"
    recommended_workflow:
      statuses:
        - "Lead Novo"
        - "Qualificação"
        - "Proposta Enviada"
        - "Negociação"
        - "Fechado Ganho"
        - "Fechado Perdido"
      transitions: "Fluxo linear com possibilidade de retorno a Negociação. Fechado Ganho/Perdido são finais."
    automations:
      - trigger: "Status mudou para 'Proposta Enviada'"
        action: "Criar tarefa de follow-up em 3 dias"
        description: "Garante que nenhuma proposta fique sem acompanhamento"
      - trigger: "Status mudou para 'Fechado Ganho'"
        action: "Criar task no Space CS → Folder Onboarding"
        description: "Inicia automaticamente o onboarding do novo cliente"
    custom_fields:
      - name: "Valor do Deal"
        type: "Currency"
        options: null
      - name: "Probabilidade"
        type: "Number"
        options: null
      - name: "Próximo Contato"
        type: "Date"
        options: null
      - name: "Etapa Pipeline"
        type: "Dropdown"
        options: ["Inbound", "Outbound", "Indicação", "Upsell"]
    sources:
      - title: "ClickUp for Sales Teams"
        url: "https://clickup.com/teams/sales"
```

## Quality Criteria

- [ ] Cada departamento tem workflow com statuses definidos
- [ ] Pelo menos 2 automações por departamento
- [ ] Custom Fields com tipos e opções quando aplicável
- [ ] Fontes citadas para cada workflow

## Veto Conditions

1. Workflows genéricos sem customização para a área
2. Nenhuma automação recomendada
