# Research Brief — Dashboards Financeiros SaaS para Nexuz

## Contexto
Nexuz é uma empresa SaaS B2B que vende soluções ERP/PDV/KDS para food service.
~159 clientes ativos no Asaas. Modelo de assinatura mensal por módulos, unidades e volume de transações.

## Fontes de Dados
- **Asaas API** (MCP): receita recorrente, cobranças, inadimplência, clientes
- **Google Sheets**: pagamentos via Inter, reconciliação manual entre títulos a pagar e lançamentos
- **MCP Odoo** (a configurar): contatos e dados complementares de clientes

## Dashboards Essenciais

### 1. MRR/ARR Waterfall
- MRR total decomposto: Novo MRR + Expansão - Churn - Contração
- ARR = MRR x 12 com projeção de tendência
- Cortes: por produto (ERP, PDV, KDS), por plano, por unidade do cliente
- Visualização: gráfico waterfall mensal

### 2. Fluxo de Caixa (Projetado x Realizado)
- **Semanal (30 dias)**: recebimentos previstos Asaas por dia de vencimento, pagamentos programados, saldo projetado diário
- **Mensal (3 meses)**: MRR ajustado por churn esperado, receita não-recorrente, despesas fixas x variáveis, variância acumulada
- **Anual (12 meses)**: cenários conservador/base/otimista, impacto de crescimento, sazonalidade

### 3. DRE SaaS
- Estrutura: Receita Bruta → Receita Líquida → Lucro Bruto (>70%) → EBITDA
- Comparativo: Mês Atual | Mês Anterior | Mesmo Mês Ano Anterior | Orçado x Realizado
- Linhas de receita: Assinaturas (recorrente), Implantação/Setup (não-recorrente), Serviços Premium
- COGS: Infra/Cloud, Suporte CS, Taxas Asaas

### 4. Churn & Retenção
- Logo Churn e Revenue Churn mensais
- NRR (Net Revenue Retention) — meta: >100%
- Análise por cohort: retenção mês a mês por safra
- Motivos de cancelamento categorizados

### 5. Unit Economics
- CAC, LTV, LTV:CAC (meta: >3:1), Payback (<12 meses)
- Quick Ratio SaaS = (Novo + Expansão) / (Churn + Contração) — meta: >4
- Rule of 40 = Growth Rate % + Profit Margin %

### 6. Runway & Saúde Financeira
- Burn Rate mensal líquido
- Runway em meses = Caixa / Burn Rate (meta: >12 meses)

### 7. Inadimplência Asaas
- Por tipo de cobrança (boleto, PIX, cartão)
- Aging: 1-15 dias, 16-30 dias, 31-60 dias, 60+ dias
- Taxa de recuperação

## Métricas e Benchmarks

| Métrica | Benchmark Saudável |
|---|---|
| Gross Churn | < 2% mensal |
| NRR | > 110% |
| LTV:CAC | > 3:1 |
| CAC Payback | < 12 meses |
| Margem Bruta | > 70% |
| Runway | > 12 meses |
| Quick Ratio SaaS | > 4 |
| Rule of 40 | > 40% |
