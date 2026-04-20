# Quality Criteria — Pipefy Setup

## Critérios de avaliação (score 1-10 cada)

### 1. Fidelidade ao PDD
O Pipefy reflete fielmente o Process Design Document?
- Todas as 9 etapas do funil mapeadas como Phases
- Campos do modelo de dados (seção 3) presentes
- Checklists de transição (seção 5A) como required fields
- Motivos de descarte (seção 13) como dropdown
- Cadências (seção 6) como automações

### 2. Integridade estrutural
A estrutura Pipefy é consistente e funcional?
- Pipes com phases na ordem correta
- Fields com tipos adequados (não tudo short_text)
- Connectors com cardinalidade correta (1:1 vs 1:N)
- Databases separadas de Pipes
- Start Form funcional para intake de leads

### 3. Automações e SLAs
As automações cobrem os requisitos do PDD?
- SLAs por etapa configurados (late alerts)
- E-mails automáticos das cadências
- Transição automática GANHO (R19)
- Descarte automático D+67 Nutrição (R24)
- Handoff automático para Implantação (R38)
- Quota não excede 80% do plano

### 4. Usabilidade
A configuração é utilizável pela equipe no dia a dia?
- Nomes claros e em português
- Fields na ordem lógica de preenchimento
- Required fields apenas onde necessário (não excesso)
- Labels úteis para visualização rápida

### 5. Segurança e governança
Controles de acesso e governança adequados?
- Permissões por pipe (Vendas vs Implantação)
- Campo motivo de descarte obrigatório (R25)
- Desconto >15% com aprovação (R13)
- CNPJ com validação de unicidade (R33)

### 6. Documentação
A configuração está documentada?
- Log de configuração completo com IDs
- Guia de uso por perfil de usuário
- Automações documentadas
- FAQ relevante

## Scoring

| Score | Significado |
|---|---|
| 9-10 | Excelente — pronto para go-live |
| 7-8 | Bom — ajustes menores recomendados |
| 5-6 | Regular — ajustes necessários antes do go-live |
| 3-4 | Insuficiente — requer retrabalho significativo |
| 1-2 | Crítico — design fundamentalmente errado |

## Verdict

| Overall Score | Verdict |
|---|---|
| ≥ 7.0 e nenhum critério < 5 | APPROVE |
| ≥ 5.0 e nenhum critério < 3 | CONDITIONAL APPROVE |
| < 5.0 ou qualquer critério < 3 | REJECT |
