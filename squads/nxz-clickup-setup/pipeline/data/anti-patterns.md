# Anti-Patterns — ClickUp Implementation

## Nunca Faça

### 1. Múltiplos Workspaces
Criar mais de um Workspace para a mesma empresa. Cada Workspace tem billing,
usuários e settings separados. Um Workspace = uma empresa. Sempre.

### 2. Overengineering da Hierarquia
Criar muitos níveis desnecessários. Se um Folder só tem uma List, provavelmente
o Folder é desnecessário. Se uma List só tem 2-3 tasks, considere consolidar.

### 3. Ativar Todas as Views
Habilitar Board, Gantt, Calendar, Timeline, Mind Map, etc. em todos os Spaces.
Ative apenas o que o departamento vai realmente usar. Views desnecessárias
confundem os usuários e diluem o foco.

### 4. Custom Fields no Nível Errado
Aplicar campos no nível do Space quando deveriam estar no nível da List.
Campos no Space aparecem em TODAS as Lists daquele Space, poluindo
formulários e views.

### 5. Statuses Genéricos
Usar "To Do / In Progress / Done" para todos os departamentos. Cada área
tem seu próprio workflow — Vendas tem Pipeline stages, Suporte tem SLAs,
Dev tem Sprint phases. Customize por List.

### 6. OKRs sem Linkagem
Criar Goals no ClickUp mas não linkar a tasks reais. OKRs desconectados
da execução são apenas decoração — não geram accountability.

### 7. Objetivos como Mission Statements
Escrever Objectives vagos como "Encantar o cliente" ou "Ser referência".
Objectives devem ser específicos e atingíveis no trimestre.
Exemplo correto: "Reduzir tempo médio de resposta de suporte de 4h para 1h no Q2"

### 8. Automações em Excesso
Configurar automações para tudo antes de o time se acostumar com a ferramenta.
Comece com automações essenciais (notificações, status changes) e evolua gradualmente.

### 9. Ignorar Permissões
Não configurar quem pode ver/editar o quê. Em 6 departamentos, nem todo mundo
deve ter acesso a tudo (ex: Financeiro deve ser restrito).

### 10. Migrar Tudo de Uma Vez
Tentar implantar todos os 6 departamentos simultaneamente. Faça um departamento
por vez, valide, aprenda, e só então avance para o próximo.

## Sempre Faça

### 1. Um Departamento Por Vez
Implante, valide, documente e treine antes de avançar para o próximo.

### 2. Nomeie Consistentemente
Use padrões claros de nomenclatura em toda a organização.
Ex: "[Depto] - Nome do Processo" ou categorização clara por Folder.

### 3. Documente Tudo
Cada automação, custom field e workflow deve ter documentação acessível.
Use ClickUp Docs ou a documentação gerada pelo squad.

### 4. Teste Antes de Liberar
Crie tasks de teste em cada List para validar statuses, automações e campos
antes de liberar para o time real.

### 5. Treine o Time
Documentação não substitui treinamento. Cada departamento precisa de
orientação sobre como usar SUA parte do ClickUp.
