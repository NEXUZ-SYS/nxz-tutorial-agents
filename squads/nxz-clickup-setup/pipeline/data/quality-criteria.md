# Quality Criteria — ClickUp Configuration

## Critérios de Qualidade da Configuração

### 1. Hierarquia (peso 25%)
- [ ] Um único Workspace para toda a Nexuz
- [ ] Um Space por departamento (6 Spaces)
- [ ] Folders organizados por tipo de processo (não por pessoa)
- [ ] Lists com nomes claros e padronizados
- [ ] Sem Spaces, Folders ou Lists vazios ou redundantes
- [ ] Profundidade máxima: Workspace → Space → Folder → List (4 níveis)

### 2. Custom Fields (peso 20%)
- [ ] Campos relevantes para cada departamento (mínimo 3 por área)
- [ ] Tipos de campo apropriados (Dropdown para categorias, Currency para valores, etc.)
- [ ] Nomenclatura consistente entre departamentos (mesma convenção de nomes)
- [ ] Sem campos duplicados entre Lists do mesmo Space
- [ ] Campos obrigatórios marcados corretamente

### 3. Statuses (peso 15%)
- [ ] Statuses customizados refletem o workflow real do departamento
- [ ] Mínimo 3 statuses por List (To Do, In Progress, Done)
- [ ] Statuses com nomes claros e sem ambiguidade
- [ ] Fluxo lógico de progressão (sem saltos ilógicos)
- [ ] Status "Done" sempre no grupo "Closed"

### 4. OKRs e Goals (peso 20%)
- [ ] Goals criados para cada departamento
- [ ] 3-5 Key Results por Objective
- [ ] Target types adequados (Number, Currency, Percentage, True/False)
- [ ] Goals linkados a tasks de execução via Relationships
- [ ] Color-coding por departamento aplicado
- [ ] Dashboard de OKRs configurado

### 5. Automações (peso 10%)
- [ ] Pelo menos 1 automação por departamento
- [ ] Automações testadas e funcionando
- [ ] Triggers e actions fazem sentido para o workflow
- [ ] Sem automações conflitantes ou loops

### 6. Views (peso 10%)
- [ ] Views essenciais habilitadas por Space (não todas)
- [ ] Board view para workflows com kanban (Vendas, Suporte)
- [ ] List view como padrão para todas as áreas
- [ ] Calendar view para áreas com deadlines (Marketing, Financeiro)
- [ ] Gantt view para projetos com dependências (Desenvolvimento)

## Scoring

| Score | Significado |
|---|---|
| 9-10 | Excelente — configuração profissional, pronta para uso |
| 7-8 | Bom — funcional com pequenos ajustes recomendados |
| 5-6 | Regular — funciona mas precisa de melhorias significativas |
| 3-4 | Insuficiente — problemas estruturais que impedem uso eficiente |
| 1-2 | Crítico — configuração inutilizável, requer refazer |

## Threshold
- **Aprovação**: Score geral >= 7/10 E nenhum critério abaixo de 4/10
- **Rejeição**: Score geral < 7/10 OU qualquer critério abaixo de 4/10
