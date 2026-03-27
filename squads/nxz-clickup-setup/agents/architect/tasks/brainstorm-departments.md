---
task: "Brainstorm por Departamento"
order: 1
input: |
  - config_focus: Departamentos selecionados
  - research_findings: Pesquisa sobre funcionalidades ClickUp
  - company_context: Perfil da empresa Nexuz
output: |
  - department_profiles: Perfil de cada departamento com processos, dores e necessidades
---

# Brainstorm por Departamento

Conduzir brainstorm interativo com o usuário para entender profundamente cada
departamento selecionado antes de desenhar qualquer hierarquia.

## Process

1. Listar os departamentos selecionados e perguntar: "Por qual departamento quer começar?"
2. Para o departamento escolhido, fazer as seguintes perguntas (uma por vez):
   a. "Quais são os 3-5 processos principais deste departamento?"
   b. "Quem são os responsáveis/papéis neste departamento?"
   c. "Quais as maiores dores ou gargalos hoje?"
   d. "Que tipo de visibilidade/relatórios vocês precisam?"
   e. "Existe algum processo que envolve outros departamentos? (handoffs)"
3. Compilar as respostas em um perfil estruturado do departamento
4. Confirmar o perfil com o usuário: "Entendi corretamente? Falta algo?"
5. Repetir para cada departamento selecionado

## Output Format

```yaml
departments:
  - name: "..."
    processes:
      - name: "..."
        description: "..."
        frequency: "diário/semanal/mensal/por demanda"
    roles: ["..."]
    pain_points: ["..."]
    reporting_needs: ["..."]
    cross_department_flows:
      - from: "..."
        to: "..."
        trigger: "..."
```

## Output Example

```yaml
departments:
  - name: "Suporte"
    processes:
      - name: "Atendimento de tickets"
        description: "Receber, triar, resolver e fechar tickets de suporte"
        frequency: "diário"
      - name: "Escalação"
        description: "Escalar tickets complexos para nível 2 ou desenvolvimento"
        frequency: "por demanda"
      - name: "Base de conhecimento"
        description: "Criar e manter artigos de FAQ e troubleshooting"
        frequency: "semanal"
    roles:
      - "Agente de Suporte N1"
      - "Especialista N2"
      - "Gerente de Suporte"
    pain_points:
      - "Tickets sem SLA definido"
      - "Escalação manual e demorada"
      - "Sem visibilidade de métricas"
    reporting_needs:
      - "Tempo médio de resposta"
      - "Tickets por prioridade"
      - "CSAT por agente"
    cross_department_flows:
      - from: "Suporte"
        to: "Desenvolvimento"
        trigger: "Bug reportado que requer fix no código"
      - from: "Suporte"
        to: "CS"
        trigger: "Cliente insatisfeito com alto risco de churn"
```

## Quality Criteria

- [ ] Cada departamento tem pelo menos 3 processos mapeados
- [ ] Roles identificados
- [ ] Dores documentadas (base para automações futuras)
- [ ] Cross-department flows mapeados
- [ ] Perfil validado com o usuário

## Veto Conditions

1. Brainstorm não foi interativo (não perguntou ao usuário)
2. Departamento selecionado omitido do brainstorm
