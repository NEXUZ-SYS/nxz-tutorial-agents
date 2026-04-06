---
task: Análise de Cruzamento de Dados
order: 2
input:
  - squads/nexuz-revenue-analysis/output/raw-customers.json
  - squads/nexuz-revenue-analysis/output/raw-subscriptions.json
  - squads/nexuz-revenue-analysis/output/raw-payments.json
  - squads/nexuz-revenue-analysis/output/raw-anticipations.json
output:
  - squads/nexuz-revenue-analysis/output/analise-cruzamento.md
---

# Análise de Cruzamento de Dados

Cruzar clientes × assinaturas × pagamentos e classificar cada cliente em exatamente uma categoria de receita. A classificação segue regras estritas e mutuamente exclusivas — nenhum cliente pode pertencer a duas categorias.

---

## Processo

### 1. Construir o Perfil Consolidado por Cliente
- Para cada cliente em `raw-customers.json`:
  - Coletar todas as assinaturas associadas (campo `customer` nas assinaturas)
  - Coletar todos os pagamentos associados (campo `customer` nos pagamentos)
  - Separar pagamentos vinculados a assinatura (`subscription != null`) dos avulsos (`subscription == null`)
  - Verificar se cada pagamento possui antecipação vinculada em `raw-anticipations.json` (campo `payment` da antecipação == `id` do pagamento)
  - Se houver antecipação com `status: CREDITED`, marcar o pagamento como **antecipado** e registrar a `anticipationDate` como data efetiva de recebimento
  - Registrar: lista de status de assinaturas, lista de status de pagamentos, valor total pago, valor total em aberto, valor total antecipado

### 2. Aplicar Regras de Classificação (ordem de precedência)
Aplicar as regras na sequência abaixo — a primeira que se aplicar define a categoria:

- **Inadimplente:** tem >= 1 assinatura com status `ACTIVE` E >= 1 pagamento com status `OVERDUE`
- **Com assinatura ativa:** tem >= 1 assinatura com status `ACTIVE` e nenhum pagamento `OVERDUE`
- **Assinatura inativa/expirada (churn):** tem >= 1 assinatura, mas nenhuma com status `ACTIVE` (todas `INACTIVE` ou `EXPIRED`)
- **Cobrança avulsa:** tem pagamentos com `subscription == null` e nunca teve nenhuma assinatura registrada

Clientes sem nenhuma assinatura e sem nenhum pagamento são registrados como "Sem movimentação" e listados separadamente.

**Marcação de antecipações (aplica-se a TODAS as categorias):**
- Após classificar cada cliente, verificar quais de seus pagamentos foram antecipados (antecipação `status: CREDITED`)
- Para cada pagamento antecipado, registrar: `anticipation_id`, `anticipationDate` (data do recebimento efetivo), `fee` (taxa), `netValue` (valor líquido recebido)
- Na análise mensal: um pagamento com vencimento em maio mas `anticipationDate` em março é **receita já recebida em março**, não em maio
- Incluir coluna/campo `antecipado: true/false` e `mes_recebimento_efetivo` em cada pagamento do perfil do cliente

### 3. Gerar o Documento de Cruzamento
- Escrever `squads/nexuz-revenue-analysis/output/analise-cruzamento.md` com as seguintes seções:
  - Resumo de contagens por categoria
  - Lista detalhada de cada categoria com: `customer_id`, `nome`, `cpfCnpj`, `assinaturas (status)`, `pagamentos (status)`, `valor_total_pago`, `valor_em_aberto`
  - Lista de clientes "Sem movimentação" (se houver)
  - Alertas: clientes encontrados nos JSONs de assinatura/pagamento mas não no JSON de clientes

---

## Output Format

```yaml
cruzamento:
  gerado_em: "{timestamp ISO 8601}"
  totais:
    com_assinatura_ativa: N
    inadimplente: N
    churn: N
    cobranca_avulsa: N
    sem_movimentacao: N
    total_clientes: N
    pagamentos_antecipados: N
    valor_total_antecipado_bruto: N
    valor_total_taxa_antecipacao: N
    valor_total_antecipado_liquido: N
  categorias:
    com_assinatura_ativa:
      - customer_id: "cus_XXXX"
        nome: "Nome do Cliente"
        cpfCnpj: "XX.XXX.XXX/0001-XX"
        assinaturas: [{id, status, value, nextDueDate}]
        total_pago_brl: N
        pagamentos_overdue: 0
    inadimplente:
      - customer_id: "cus_XXXX"
        nome: "Nome do Cliente"
        assinaturas_ativas: [{id, status}]
        pagamentos_overdue: [{id, value, dueDate}]
        valor_em_aberto_brl: N
    churn:
      - customer_id: "cus_XXXX"
        nome: "Nome do Cliente"
        ultimo_status_assinatura: "INACTIVE"
        ultimo_pagamento: "{data}"
    cobranca_avulsa:
      - customer_id: "cus_XXXX"
        nome: "Nome do Cliente"
        total_cobrado_brl: N
        quantidade_cobranças: N
```

---

## Output Example

```markdown
# Análise de Cruzamento — Nexuz Revenue Analysis
Gerado em: 2026-04-06T14:35:00-03:00

## Resumo por Categoria

| Categoria                        | Clientes | % do Total |
|----------------------------------|----------|------------|
| Com assinatura ativa             | 112      | 70,4%      |
| Inadimplente                     | 18       | 11,3%      |
| Assinatura inativa/expirada      | 21       | 13,2%      |
| Cobrança avulsa                  | 8        | 5,0%       |
| Sem movimentação                 | 0        | 0,0%       |
| **Total**                        | **159**  | **100%**   |

## Com Assinatura Ativa (112 clientes)

| customer_id | Nome               | CPF/CNPJ              | Assinatura      | Status | Valor Mensal | Próx. Vencimento |
|-------------|--------------------|-----------------------|-----------------|--------|--------------|------------------|
| cus_0001    | Restaurante Alpha  | 12.345.678/0001-99    | sub_0001        | ACTIVE | R$ 299,90    | 2026-05-01       |
| cus_0007    | Pizzaria Omega     | 33.444.555/0001-22    | sub_0008        | ACTIVE | R$ 499,90    | 2026-05-01       |

## Inadimplente (18 clientes)

| customer_id | Nome            | Assinatura Ativa | Pagamento(s) Vencido(s)    | Valor em Aberto |
|-------------|-----------------|------------------|----------------------------|-----------------|
| cus_0004    | Bar Delta EIRELI | sub_0003 (ACTIVE) | pay_0005 — venc. 2026-04-01 | R$ 299,90      |

## Assinatura Inativa/Expirada — Churn (21 clientes)

| customer_id | Nome         | Último Status  | Último Pagamento |
|-------------|--------------|----------------|------------------|
| cus_0002    | Padaria Beta | INACTIVE       | 2026-02-01       |

## Cobrança Avulsa (8 clientes)

| customer_id | Nome              | Cobranças | Total Cobrado |
|-------------|-------------------|-----------|---------------|
| cus_0003    | Lanchonete Gama   | 2         | R$ 300,00     |

## Receitas Antecipadas (12 pagamentos)

| payment_id  | Cliente            | Valor Original | Taxa   | Valor Líquido | Data Antecipação | Vencimento Original | Mês Recebimento |
|-------------|--------------------|--------------:|-------:|--------------:|------------------|--------------------:|-----------------|
| pay_0001    | Restaurante Alpha  | R$ 299,90     | R$ 2,33| R$ 287,77     | 2026-03-20       | 2026-04-01          | Mar/2026        |
| pay_0010    | Pizzaria Omega     | R$ 499,90     | R$ 4,50| R$ 485,40     | 2026-03-22       | 2026-05-01          | Mar/2026        |

**Totais de Antecipação:**
- Pagamentos antecipados: 12
- Valor bruto antecipado: R$ 4.200,00
- Taxa total de antecipação: R$ 98,50
- Valor líquido recebido: R$ 4.101,50
```

---

## Quality Criteria

- A soma de clientes em todas as categorias (incluindo "Sem movimentação") deve ser igual ao total de clientes em `raw-customers.json`
- Cada cliente deve aparecer em exatamente uma categoria — verificar duplicatas por `customer_id` entre seções
- A classificação "Inadimplente" deve ter precedência sobre "Com assinatura ativa" — clientes com ACTIVE + OVERDUE nunca vão para a categoria de ativos
- Valores monetários nas tabelas devem usar formatação `R$ X.XXX,XX` com separador de milhar e vírgula decimal

---

## Veto Conditions

- **Soma de categorias divergente:** Se a soma de clientes por categoria não bater com o total do JSON de clientes, abortar e revisar a lógica de classificação
- **Cliente classificado em duas categorias:** Se o mesmo `customer_id` aparecer em mais de uma categoria, abortar — a regra de precedência não foi aplicada corretamente
- **Dados de entrada ausentes:** Se qualquer um dos três JSONs de entrada não existir, abortar — não é possível fazer o cruzamento sem todos os dados
