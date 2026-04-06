# Quality Criteria — Squad nexuz-finance

## Critérios Gerais
1. **Precisão numérica**: todos os cálculos devem ser verificáveis e rastreáveis à fonte
2. **Consistência**: valores devem bater entre relatórios (MRR no dashboard = MRR na DRE)
3. **Completude**: nenhum período ou fonte deve ter lacunas não documentadas
4. **Clareza**: qualquer pessoa da diretoria deve entender os relatórios sem explicação verbal
5. **Acionabilidade**: todo insight deve vir com recomendação de ação

## Critérios por Relatório

### MRR/ARR
- Decomposição deve somar 100% (Novo + Expansão - Churn - Contração = Delta MRR)
- Comparação mês a mês obrigatória
- Segmentação por produto obrigatória

### Fluxo de Caixa
- Projetado e Realizado lado a lado com variância em %
- Saldo mínimo de segurança identificado
- Alertas automáticos para semanas com caixa negativo projetado

### DRE
- Estrutura SaaS padrão (não formato contábil genérico)
- Mínimo 3 colunas comparativas
- Margem bruta destacada e comentada

### Churn
- Churn por receita E por logo (quantidade)
- Análise de cohort com mínimo 6 meses de histórico
- Motivos categorizados quando disponível

## Condições de Veto (refazer obrigatório)
1. Números que não batem entre relatórios
2. Ausência de fonte para algum dado apresentado
3. Relatório sem período claramente definido
4. Recomendações genéricas sem dados de suporte
