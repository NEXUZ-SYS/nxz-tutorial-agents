# Quality Criteria — ERPNext Setup

## Critérios de avaliação (score 1-10 cada)

### 1. Fidelidade à Entrevista
O ERPNext reflete fielmente os dados coletados pela Ana?
- Company com razão social, CNPJ, moeda, país corretos
- Fiscal Year conforme input
- COA com estrutura declarada
- Item Groups, Customer Groups, Warehouses conforme input
- Papéis/permissões conforme input
- Deltas vs. entrevista claramente marcados no audit

### 2. Integridade estrutural
A estrutura ERPNext é consistente e funcional?
- Dependências respeitadas (Company antes de COA, UOM antes de Item, etc.)
- Link Fields apontando para registros válidos
- Custom Fields com tipos e target doctypes corretos
- Workflow sem estado órfão (todo estado tem transição)
- Nenhum Doctype standard desabilitado silenciosamente

### 3. Acesso e Segurança
Auth e permissões operacionais?
- Usuário dedicado AI Team criado (não Administrator em produção)
- API Key gerada e testada (smoke tests passam)
- Roles aplicadas aos usuários
- Host header `erpnext.localhost` documentado no guia Integrador
- Credenciais NÃO hardcoded em specs ou output

### 4. Lifecycle e Reprodutibilidade
A config pode ser replicada em outra instância?
- Scripts de config idempotentes (GET antes de POST)
- `names` capturados em `ids_created` do state.json
- Ordem de criação documentada no configuration-log
- Volume de dados dentro do esperado para dev local

### 5. Usabilidade
A configuração é utilizável pela equipe no dia a dia?
- Naming em português onde faz sentido (itens, clientes, warehouses)
- Workflows refletem aprovações reais da empresa
- Permissões não bloqueiam operações rotineiras
- Dashboards/Reports úteis configurados (se no escopo)

### 6. Documentação
A configuração está documentada?
- Configuration-log com todos os `names` criados
- Audit-report com score por camada
- User-guide com 3 perfis (Admin/Usuário/Integrador)
- FAQ com perguntas reais por perfil
- Links para docs nxz locais (getting-started, api-access, troubleshooting)

## Scoring por Layer

Cada layer (0-7) recebe score 1-10 baseado nos critérios acima. Score da squad = média ponderada.

## Verdict

| Overall Score | Nenhum critério < X | Verdict |
|---|---|---|
| ≥ 7.0 | nenhum < 5 | APPROVE |
| ≥ 5.0 | nenhum < 3 | CONDITIONAL APPROVE (com PATCHes listados) |
| < 5.0 | qualquer < 3 | REJECT (rodar novamente após corrigir) |
