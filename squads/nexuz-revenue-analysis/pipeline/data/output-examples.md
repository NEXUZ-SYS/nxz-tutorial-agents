# Output Examples — Revenue Analysis

## Example 1: Raw Validation File (CSV)

```csv
customer_id,customer_name,cpf_cnpj,email,payment_id,payment_value,payment_status,payment_due_date,payment_date,payment_billing_type,subscription_id,subscription_status,subscription_value,subscription_cycle,anticipation_id,anticipation_status,anticipation_date,anticipation_fee,anticipation_net_value
cus_000001234,Restaurante Sabor & Arte,12.345.678/0001-90,contato@saborarte.com.br,pay_abc123,299.90,RECEIVED,2026-03-15,2026-03-14,CREDIT_CARD,sub_xyz789,ACTIVE,299.90,MONTHLY,9e7d8639-350f,CREDITED,2026-02-28,2.33,287.77
cus_000001234,Restaurante Sabor & Arte,12.345.678/0001-90,contato@saborarte.com.br,pay_abc124,299.90,RECEIVED,2026-02-15,2026-02-15,CREDIT_CARD,sub_xyz789,ACTIVE,299.90,MONTHLY,,,,,
cus_000001234,Restaurante Sabor & Arte,12.345.678/0001-90,contato@saborarte.com.br,pay_abc125,150.00,RECEIVED,2026-01-20,2026-01-20,BOLETO,,,,,,,,,
cus_000005678,Bar do Zé,98.765.432/0001-10,ze@bardoze.com.br,pay_def456,199.90,OVERDUE,2026-03-10,,BOLETO,sub_uvw321,INACTIVE,199.90,MONTHLY,,,,,
cus_000005678,Bar do Zé,98.765.432/0001-10,ze@bardoze.com.br,pay_def457,199.90,RECEIVED,2026-02-10,2026-02-12,BOLETO,sub_uvw321,INACTIVE,199.90,MONTHLY,,,,,
cus_000009012,Café Aroma,11.222.333/0001-44,aroma@cafe.com.br,pay_ghi789,500.00,RECEIVED,2026-03-01,2026-03-01,PIX,,,,,,,,,
```

Notes:
- Subscription fields are empty when payment has no subscription link
- Each row is one payment record with its associated customer, subscription, and anticipation data
- Anticipation fields are empty when payment has no linked anticipation
- No grouping, no sorting beyond API response order
- All values are raw from the Asaas API

## Example 2: Analytical Report

```markdown
# Relatório de Análise de Receita — Asaas
**Data da extração:** 2026-04-06
**Período analisado:** Todos os registros

## Resumo Executivo

- **72 de 156 clientes (46.2%) não possuem assinatura ativa**, representando uma
  oportunidade de R$ 14.380,00/mês em receita recorrente potencial baseada no
  ticket médio de R$ 199.72.
- **23 clientes (14.7%) possuem assinaturas inativas/expiradas** — indicando
  churn recente que pode ser recuperável com ação comercial direcionada.
- **49 clientes (31.4%) possuem apenas cobranças avulsas** sem nenhum histórico
  de assinatura, sugerindo oportunidade de conversão para planos recorrentes.
- **12 pagamentos foram antecipados** (status CREDITED), totalizando R$ 4.200,00
  brutos (R$ 4.101,50 líquidos). Essas receitas já foram recebidas e não devem
  ser contabilizadas novamente no mês de vencimento original.

## Métricas

| Categoria | Clientes | % do Total | Receita Mensal Associada |
|-----------|----------|------------|--------------------------|
| Com assinatura ativa | 84 | 53.8% | R$ 25.180,00 |
| Assinatura inativa/expirada | 23 | 14.7% | R$ 0,00 (era R$ 5.420,00) |
| Apenas cobranças avulsas | 49 | 31.4% | — |
| **Total** | **156** | **100%** | **R$ 25.180,00** |

## Clientes Sem Assinatura Ativa

### Assinaturas Inativas/Expiradas (Churn)

| Cliente | CPF/CNPJ | Última Assinatura | Valor | Status | Última Cobrança |
|---------|----------|-------------------|-------|--------|-----------------|
| Bar do Zé | 98.765.432/0001-10 | sub_uvw321 | R$ 199,90 | INACTIVE | 2026-02-10 |
| Pizzaria Napoli | 33.444.555/0001-66 | sub_abc111 | R$ 349,90 | EXPIRED | 2026-01-15 |
| ... | ... | ... | ... | ... | ... |

### Cobranças Avulsas (Sem Histórico de Assinatura)

| Cliente | CPF/CNPJ | Total Cobranças | Valor Total | Última Cobrança |
|---------|----------|-----------------|-------------|-----------------|
| Café Aroma | 11.222.333/0001-44 | 3 | R$ 1.500,00 | 2026-03-01 |
| ... | ... | ... | ... | ... |

## Recomendações

1. **Contatar 23 clientes com assinaturas inativas** — Prioridade: Alta |
   Confiança: Alta. Estes clientes já foram assinantes e representam
   R$ 5.420,00/mês em receita perdida. Ação: campanha de reativação com
   oferta especial.

2. **Converter clientes de cobranças avulsas para assinaturas** — Prioridade: Média |
   Confiança: Média. 49 clientes pagam avulso — qualificar quais são recorrentes
   e oferecer plano com desconto.

## Metodologia

- **Data de extração**: 2026-04-06
- **Fonte**: API Asaas v3 (customers, subscriptions, payments)
- **Registros extraídos**: 156 clientes, 97 assinaturas, 1.234 cobranças, 47 antecipações
- **Classificação**: Baseada no campo `status` de subscriptions e no campo
  `subscription` de payments (null = cobrança avulsa)
```
