---
task: "Gerar Fluxogramas Mermaid"
order: 3
input: |
  - department_profiles: Processos mapeados no brainstorm
  - hierarchy_design: Hierarquia desenhada
output: |
  - flowcharts: Fluxogramas Mermaid por departamento
---

# Gerar Fluxogramas Mermaid

Criar fluxogramas detalhados do workflow principal de cada departamento
usando sintaxe Mermaid, incluindo decision points, handoffs e automações.

## Process

1. Para cada departamento, identificar o processo principal
2. Mapear as etapas do processo como nós do fluxograma
3. Adicionar decision points (gates) como losangos
4. Marcar handoffs cross-department com cor/estilo diferente
5. Indicar onde automações serão aplicadas
6. Apresentar ao usuário e iterar se necessário

## Output Format

```mermaid
graph TD
    A[Início] --> B[Etapa 1]
    B --> C{Decisão?}
    C -->|Sim| D[Etapa 2]
    C -->|Não| E[Alternativa]
    D --> F[Fim]
    style F fill:#90EE90
```

## Output Example

```mermaid
graph TD
    A[Lead recebido] --> B[Qualificação inicial]
    B --> C{Lead qualificado?}
    C -->|Sim| D[Agendar reunião]
    C -->|Não| E[Nurturing - Marketing]
    D --> F[Apresentação/Demo]
    F --> G[Enviar proposta]
    G --> H{Proposta aceita?}
    H -->|Sim| I[Fechado Ganho]
    H -->|Não| J{Negociação?}
    J -->|Sim| K[Renegociar termos]
    K --> G
    J -->|Não| L[Fechado Perdido]
    I --> M[Handoff → CS Onboarding]

    style E fill:#FFD700
    style I fill:#90EE90
    style L fill:#FF6B6B
    style M fill:#87CEEB
```

## Quality Criteria

- [ ] Cada departamento tem pelo menos 1 fluxograma do processo principal
- [ ] Decision points representados como losangos
- [ ] Handoffs cross-department indicados visualmente
- [ ] Sintaxe Mermaid válida

## Veto Conditions

1. Fluxograma com menos de 5 nós (oversimplificado)
2. Sintaxe Mermaid inválida
