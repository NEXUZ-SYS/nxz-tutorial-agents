# Domain Framework — ClickUp Implementation

## Metodologia de Implantação

### Fase 1: Discovery por Departamento
1. Identificar processos-chave do departamento
2. Mapear fluxo atual (quem faz o quê, quando, com quais ferramentas)
3. Identificar dores e gargalos
4. Definir requisitos de visibilidade e relatórios
5. Documentar em Markdown + fluxograma Mermaid

### Fase 2: Design da Arquitetura
1. Definir Space do departamento
2. Organizar Folders por tipo de processo/projeto
3. Criar Lists específicas dentro de cada Folder
4. Definir Custom Statuses por List (adequados ao workflow)
5. Definir Custom Fields necessários (Dropdown, Currency, Date, etc.)
6. Definir Views essenciais (List, Board, Calendar, Gantt conforme necessidade)
7. Gerar fluxograma Mermaid da hierarquia proposta

### Fase 3: Configuração via MCP
1. Criar Space com settings adequados
2. Criar Folders dentro do Space
3. Criar Lists com statuses customizados
4. Adicionar Custom Fields
5. Configurar Automações (triggers + actions)
6. Criar Goals/OKRs e linkar a tasks

### Fase 4: Validação
1. Verificar hierarquia criada vs design aprovado
2. Testar automações
3. Validar linkagem OKR → Tasks
4. Gerar relatório de auditoria

### Fase 5: Documentação
1. Gerar guia de uso por departamento
2. Criar quick reference cards
3. Documentar automações configuradas

## Hierarquia Recomendada para Nexuz

```
Workspace: Nexuz
├── Space: Marketing
│   ├── Folder: Campanhas
│   ├── Folder: Conteúdo
│   └── Folder: Eventos
├── Space: Vendas
│   ├── Folder: Pipeline
│   ├── Folder: Propostas
│   └── Folder: Pós-venda
├── Space: Financeiro e Backoffice
│   ├── Folder: Contas a Pagar
│   ├── Folder: Contas a Receber
│   └── Folder: Compliance
├── Space: Desenvolvimento
│   ├── Folder: Sprints
│   ├── Folder: Backlog
│   └── Folder: Releases
├── Space: Suporte
│   ├── Folder: Tickets
│   ├── Folder: Knowledge Base
│   └── Folder: Escalations
├── Space: CS
│   ├── Folder: Onboarding
│   ├── Folder: Health Score
│   └── Folder: Renewals
└── Space: OKRs (Goals)
    ├── Folder: Company OKRs
    └── Folder: Department OKRs
```

Nota: Esta é uma estrutura base. O Ernesto Estrutura refinará por departamento
durante o brainstorm com o usuário.

## Padrão de Custom Fields por Área

| Departamento | Campos Essenciais |
|---|---|
| Marketing | Canal, Tipo de Campanha, Budget, ROI, Status Aprovação |
| Vendas | Valor do Deal, Probabilidade, Etapa Pipeline, Próximo Contato |
| Financeiro | Valor, Vencimento, Centro de Custo, Categoria, Aprovador |
| Desenvolvimento | Sprint, Story Points, Prioridade, Componente, Tipo (Bug/Feature) |
| Suporte | SLA, Prioridade, Canal Origem, Tempo Resposta, Satisfação |
| CS | Health Score, MRR, Próximo Renewal, NPS, Risco de Churn |

## Padrão de Automações por Área

| Trigger | Action | Departamento |
|---|---|---|
| Status → "Aguardando Aprovação" | Assign ao aprovador + notificação | Financeiro, Marketing |
| Status → "Fechado Ganho" | Criar task no CS (Onboarding) | Vendas |
| SLA próximo de vencer | Notificar responsável + escalar | Suporte |
| Sprint finalizada | Mover tasks não concluídas para próximo sprint | Desenvolvimento |
| Health Score < 70 | Criar alerta no CS + notificar gerente | CS |
| Status → "Concluído" | Atualizar progresso do OKR | Todos |
