# Domain Framework — Análise Financeira SaaS

## Processo Operacional

### Etapa 1: Extração de Dados
1. Conectar às fontes (Asaas, Sheets, Odoo)
2. Extrair dados brutos do período solicitado
3. Normalizar formatos (datas, valores, moeda BRL)
4. Validar completude e consistência
5. Gerar dataset unificado para análise

### Etapa 2: Análise de Receita Recorrente
1. Calcular MRR atual a partir de cobranças ativas no Asaas
2. Decompor MRR: Novo, Expansão, Churn, Contração
3. Identificar movimentações (upgrades, downgrades, cancelamentos)
4. Calcular ARR e projeção de tendência
5. Segmentar por produto, plano e porte do cliente

### Etapa 3: Análise de Churn e Retenção
1. Identificar clientes que cancelaram no período
2. Calcular Logo Churn e Revenue Churn
3. Calcular NRR (Net Revenue Retention)
4. Montar matriz de cohort por mês de entrada
5. Categorizar motivos de saída (se disponível)

### Etapa 4: Unit Economics
1. Levantar gastos de S&M do período (via Sheets/DRE)
2. Calcular CAC = Gasto S&M / Novos Clientes
3. Calcular LTV = ARPU / Churn Rate mensal
4. Calcular LTV:CAC e Payback Period
5. Quick Ratio SaaS e Rule of 40

### Etapa 5: Fluxo de Caixa
1. Mapear recebimentos previstos (Asaas) por data de vencimento
2. Mapear pagamentos previstos (Sheets Inter)
3. Calcular saldo projetado x realizado
4. Destacar variâncias significativas (>10%)
5. Montar visões semanal, mensal e anual

### Etapa 6: DRE
1. Classificar receitas: recorrente, não-recorrente, serviços
2. Classificar custos: COGS (infra, suporte, taxas), OpEx (P&D, S&M, G&A)
3. Calcular margens: bruta, operacional, EBITDA
4. Montar comparativo de períodos
5. Destacar desvios relevantes do orçado

### Etapa 7: Revisão Estratégica
1. Validar consistência entre relatórios
2. Identificar tendências e alertas
3. Propor ações corretivas
4. Gerar recomendações priorizadas

## Critérios de Decisão
- Variâncias > 10% entre projetado e realizado devem ser investigadas
- Churn > 2% mensal é alerta vermelho
- Margem bruta < 70% requer revisão de custos
- Runway < 6 meses é situação crítica
