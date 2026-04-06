---
task: Gerar Arquivo de Validação Bruta
order: 1
input:
  - squads/nexuz-revenue-analysis/output/raw-customers.json
  - squads/nexuz-revenue-analysis/output/raw-subscriptions.json
  - squads/nexuz-revenue-analysis/output/raw-payments.json
  - squads/nexuz-revenue-analysis/output/raw-anticipations.json
output:
  - squads/nexuz-revenue-analysis/output/validacao-bruta.csv
---

# Gerar Arquivo de Validação Bruta

Gerar um arquivo CSV flat com uma linha por combinação customer × payment × subscription. Nenhum dado é filtrado, agrupado ou interpretado. O objetivo é criar uma base auditável dos dados brutos da extração.

---

## Processo

### 1. Carregar e Inspecionar os JSONs de Entrada
- Ler `raw-customers.json`, `raw-subscriptions.json`, `raw-payments.json` e `raw-anticipations.json` do diretório de output
- Registrar a contagem total de registros por arquivo: total_customers, total_subscriptions, total_payments, total_anticipations
- Verificar que os quatro arquivos existem e estão não-vazios antes de prosseguir
- Inspecionar campos presentes em cada arquivo e confirmar que os campos esperados estão presentes

### 2. Construir o CSV Flat (uma linha por pagamento)
- Para cada pagamento em `raw-payments.json`:
  - Buscar o cliente correspondente em `raw-customers.json` pelo campo `customer` (ID do pagamento)
  - Se o pagamento tiver `subscription` não-nulo, buscar a assinatura em `raw-subscriptions.json`
  - Se `subscription` for null, preencher todos os campos de assinatura com string vazia `""`
  - Buscar se há antecipação vinculada a este pagamento em `raw-anticipations.json` (campo `payment` da antecipação == `id` do pagamento)
  - Se houver antecipação com `status: CREDITED`, preencher campos de antecipação; caso contrário, campos vazios
  - Montar a linha com todos os campos da tabela de colunas abaixo
- Colunas: `customer_id`, `customer_name`, `customer_cpfCnpj`, `customer_email`, `customer_externalReference`, `subscription_id`, `subscription_status`, `subscription_value`, `subscription_cycle`, `subscription_nextDueDate`, `subscription_billingType`, `subscription_description`, `payment_id`, `payment_value`, `payment_netValue`, `payment_status`, `payment_dueDate`, `payment_paymentDate`, `payment_billingType`, `payment_description`, `anticipation_id`, `anticipation_status`, `anticipation_date`, `anticipation_fee`, `anticipation_net_value`
- Preservar valores exatamente como vieram da API — sem normalização de capitalização, sem conversão de tipos

### 3. Escrever o CSV e Registrar Metadados
- Gravar o arquivo em `squads/nexuz-revenue-analysis/output/validacao-bruta.csv` com cabeçalho na primeira linha
- Usar separador `,` e encoding UTF-8
- Após gravar, contar o número de linhas de dados (excluindo cabeçalho) e confirmar que é igual ao total de pagamentos do JSON de entrada
- Registrar: total de linhas geradas, total de pagamentos com assinatura vinculada, total de pagamentos avulsos (subscription=null)

---

## Output Format

```yaml
validacao_bruta:
  arquivo: squads/nexuz-revenue-analysis/output/validacao-bruta.csv
  gerado_em: "{timestamp ISO 8601}"
  total_linhas: N
  total_com_assinatura: N
  total_avulso: N
  total_antecipado: N
  colunas:
    - customer_id
    - customer_name
    - customer_cpfCnpj
    - customer_email
    - customer_externalReference
    - subscription_id
    - subscription_status
    - subscription_value
    - subscription_cycle
    - subscription_nextDueDate
    - subscription_billingType
    - subscription_description
    - payment_id
    - payment_value
    - payment_netValue
    - payment_status
    - payment_dueDate
    - payment_paymentDate
    - payment_billingType
    - payment_description
    - anticipation_id
    - anticipation_status
    - anticipation_date
    - anticipation_fee
    - anticipation_net_value
```

---

## Output Example

```
customer_id,customer_name,customer_cpfCnpj,customer_email,customer_externalReference,subscription_id,subscription_status,subscription_value,subscription_cycle,subscription_nextDueDate,subscription_billingType,subscription_description,payment_id,payment_value,payment_netValue,payment_status,payment_dueDate,payment_paymentDate,payment_billingType,payment_description,anticipation_id,anticipation_status,anticipation_date,anticipation_fee,anticipation_net_value
cus_0001,Restaurante Alpha Ltda,12.345.678/0001-99,alpha@email.com,ERP-001,sub_0001,ACTIVE,299.90,MONTHLY,2026-05-01,BOLETO,NXZ ERP — Plano Mensal,pay_0001,299.90,290.10,CONFIRMED,2026-04-01,2026-04-01,BOLETO,NXZ ERP — Plano Mensal,9e7d8639-350f,CREDITED,2026-03-20,2.33,287.77
cus_0001,Restaurante Alpha Ltda,12.345.678/0001-99,alpha@email.com,ERP-001,sub_0001,ACTIVE,299.90,MONTHLY,2026-05-01,BOLETO,NXZ ERP — Plano Mensal,pay_0002,299.90,290.10,CONFIRMED,2026-03-01,2026-03-01,BOLETO,NXZ ERP — Plano Mensal,,,,,
cus_0002,Padaria Beta ME,98.765.432/0001-11,beta@email.com,ERP-002,sub_0002,INACTIVE,199.90,MONTHLY,,BOLETO,NXZ ERP — Plano Básico,pay_0003,199.90,193.50,CONFIRMED,2026-02-01,2026-02-01,BOLETO,NXZ ERP — Plano Básico,,,,,
cus_0003,Lanchonete Gama,11.222.333/0001-44,gama@email.com,ERP-003,,,,,,,,,pay_0004,150.00,145.50,CONFIRMED,2026-03-15,2026-03-15,PIX,Implantação avulsa,,,,,
cus_0004,Bar Delta EIRELI,55.666.777/0001-88,delta@email.com,ERP-004,sub_0003,ACTIVE,299.90,MONTHLY,2026-05-01,BOLETO,NXZ ERP — Plano Mensal,pay_0005,299.90,290.10,OVERDUE,2026-04-01,,BOLETO,NXZ ERP — Plano Mensal,,,,
```

Metadados após geração:
```
Arquivo: squads/nexuz-revenue-analysis/output/validacao-bruta.csv
Gerado em: 2026-04-06T14:22:00-03:00
Total de linhas de dados: 312
Total com assinatura vinculada: 287
Total avulso (subscription=null): 25
Total antecipado (anticipation CREDITED): 12
```

---

## Quality Criteria

- O número de linhas de dados no CSV deve ser exatamente igual ao total de registros em `raw-payments.json`
- Todas as 25 colunas devem estar presentes no cabeçalho, na ordem especificada
- Campos de assinatura de pagamentos avulsos devem ser string vazia `""`, nunca `null` ou `"null"` como texto
- Nenhum campo de cliente deve estar em branco — se um pagamento não tiver cliente correspondente, registrar `"CLIENTE_NAO_ENCONTRADO"` e alertar
- Valores monetários devem estar como string numérica com ponto decimal (ex: `299.90`), sem símbolo de moeda

---

## Veto Conditions

- **Arquivo de entrada ausente:** Se qualquer um dos quatro JSONs (customers, subscriptions, payments, anticipations) não existir ou estiver vazio, abortar e solicitar reexecução da etapa de extração
- **Contagem divergente:** Se o total de linhas no CSV for diferente do total de pagamentos no JSON de entrada, abortar — o CSV está incompleto ou com duplicatas
- **Cliente não encontrado:** Se mais de 5% dos pagamentos não tiverem cliente correspondente nos dados de entrada, abortar e alertar sobre inconsistência na extração
