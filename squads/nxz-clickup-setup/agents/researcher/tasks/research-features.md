---
task: "Pesquisar Funcionalidades ClickUp"
order: 1
input: |
  - config_focus: Departamentos selecionados e nível de customização
  - research_brief: Pesquisa prévia sobre ClickUp
output: |
  - features_map: Mapa de funcionalidades por departamento
  - plan_requirements: Requisitos de plano ClickUp por funcionalidade
---

# Pesquisar Funcionalidades ClickUp

Pesquisar na documentação oficial do ClickUp as funcionalidades relevantes para cada
departamento selecionado, incluindo requisitos de plano.

## Process

1. Ler config-focus.md para identificar departamentos selecionados
2. Para cada departamento, buscar no help.clickup.com:
   - Templates de workflow recomendados
   - Custom Fields mais usados para aquela área
   - Views otimizadas (Board, List, Calendar, Gantt)
   - Integrações disponíveis
3. Verificar quais funcionalidades requerem planos específicos (Business, Enterprise)
4. Compilar mapa de funcionalidades por departamento

## Output Format

```yaml
departments:
  - name: "..."
    features:
      - name: "..."
        description: "..."
        plan_required: "Free/Unlimited/Business/Enterprise"
        confidence: "high/medium/low"
        source: "URL"
    views_recommended:
      - "Board" | "List" | "Calendar" | "Gantt" | "Timeline"
    integrations:
      - "..."
```

## Output Example

```yaml
departments:
  - name: "Suporte"
    features:
      - name: "Custom Statuses por List"
        description: "Statuses personalizados para workflow de tickets"
        plan_required: "Free"
        confidence: "high"
        source: "https://help.clickup.com/hc/en-us/articles/..."
      - name: "Automations"
        description: "Automações para assignment e notificações"
        plan_required: "Unlimited"
        confidence: "high"
        source: "https://help.clickup.com/hc/en-us/articles/6312102752791"
      - name: "Goals/OKRs"
        description: "Tracking de metas com targets e rollup"
        plan_required: "Business"
        confidence: "high"
        source: "https://help.clickup.com/hc/en-us/articles/6327987972119"
    views_recommended:
      - "Board"
      - "List"
      - "Calendar"
    integrations:
      - "Email integration para criação automática de tickets"
```

## Quality Criteria

- [ ] Cada departamento tem pelo menos 3 funcionalidades mapeadas
- [ ] Requisito de plano indicado para cada funcionalidade
- [ ] Fontes oficiais citadas
- [ ] Views recomendadas justificadas

## Veto Conditions

1. Nenhuma fonte oficial do ClickUp citada
2. Departamento selecionado completamente omitido
