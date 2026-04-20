---
type: checkpoint
outputFile: squads/nxz-pipefy-setup/pipeline/data/config-focus.md
---

# Step 01: Configuração Inicial

## Contexto
Este squad configura o Pipefy para o processo comercial de vendas da Nexuz,
baseado no PDD (Process Design Document) gerado pela squad nxz-backoffice-processes.

O PDD define:
- Funil de vendas com 3 sub-etapas de entrada + 5 etapas sequenciais + 2 terminais
- Pipe paralelo de Nutrição
- Modelo de dados: Conta / Contato / Deal
- Cadências, automações, SLAs, dashboards

## Perguntas

### Qual escopo deseja configurar nesta execução?
Recomendamos começar pelo pipe principal (Vendas) e expandir depois.

1. Pipe Vendas completo (9 fases + campos + automações)
2. Pipe Vendas + Pipe Nutrição (paralelo)
3. Pipe Vendas + Nutrição + Databases (Contas/Contatos)
4. Tudo (Vendas + Nutrição + Databases + Pipe Implantação + Dashboards)

### Já possui conta no Pipefy com plano Business ou superior?
A API GraphQL requer plano Business (US$ 33/user/mês) no mínimo.

1. Sim, já tenho plano Business
2. Sim, tenho plano Enterprise/Unlimited
3. Não, preciso criar conta/upgrade
4. Não sei qual plano tenho

### Qual o nível de customização desejado?
1. Completo — Pipes, Phases, Fields, Automations, Databases, Connectors, Dashboards, SLAs, Email Templates
2. Essencial — Pipes, Phases, Fields, Automations básicas, Connectors
3. Mínimo — Só a estrutura de Pipes e Phases com campos obrigatórios
