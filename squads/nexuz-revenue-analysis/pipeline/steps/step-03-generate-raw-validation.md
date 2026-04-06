---
execution: inline
agent: squads/nexuz-revenue-analysis/agents/analyst
inputFile: squads/nexuz-revenue-analysis/output/extraction-summary.md
outputFile: squads/nexuz-revenue-analysis/output/validacao-bruta.csv
---

# Step 03 — Generate Raw Validation CSV

**Agent:** André Análise
**Goal:** Generate a flat, ungrouped CSV file with one row per customer-payment-subscription combination. No transformations — all values are raw as received from Asaas.

---

## Context Files

- `output/raw-customers.json` — Raw customer records from Asaas
- `output/raw-subscriptions.json` — Raw subscription records from Asaas
- `output/raw-payments.json` — Raw payment records from Asaas
- `output/raw-anticipations.json` — Raw anticipation records from Asaas
- `squads/nexuz-revenue-analysis/agents/analyst/anti-patterns.md` — Common data mistakes to avoid during cross-referencing

---

## Instructions

1. Load all 4 raw JSON files into memory (customers, subscriptions, payments, anticipations)
2. Build a lookup map of anticipations by `payment` field (anticipation.payment → anticipation object)
3. For each payment record, resolve its linked customer, subscription (if present), and anticipation (if exists with status CREDITED)
4. Produce one CSV row per payment, joining the customer, subscription, and anticipation data
4. Do NOT aggregate, group, deduplicate, or transform any values
5. Write the output to `output/validacao-bruta.csv`

---

## Process Steps

1. Parse `raw-customers.json` — build a lookup map by customer ID
2. Parse `raw-subscriptions.json` — build a lookup map by subscription ID
3. Parse `raw-anticipations.json` — build a lookup map by `payment` field (anticipation.payment → anticipation)
4. Parse `raw-payments.json` — iterate each payment record
5. For each payment:
   a. Look up the customer record by `payment.customer`
   b. Look up the subscription record by `payment.subscription` (nullable)
   c. Look up the anticipation record by `payment.id` in anticipations map (if found and status=CREDITED, include anticipation data; otherwise empty)
   d. Combine fields from all 4 entities into a single flat row
5. Write CSV header row
6. Write one data row per payment
7. Log total row count to console

---

## CSV Columns

The CSV must include the following columns (in this order):

```
payment_id, payment_date_created, payment_due_date, payment_value, payment_net_value, payment_status, payment_billing_type,
customer_id, customer_name, customer_cpf_cnpj, customer_email,
subscription_id, subscription_value, subscription_cycle, subscription_status, subscription_next_due_date,
anticipation_id, anticipation_status, anticipation_date, anticipation_fee, anticipation_net_value
```

- If a payment has no subscription, subscription columns must be empty (not omitted)
- All values are raw strings — no currency formatting, no date reformatting
- Use comma as delimiter; wrap values containing commas in double quotes

---

## Output Example

```csv
payment_id,payment_date_created,payment_due_date,payment_value,payment_net_value,payment_status,payment_billing_type,customer_id,customer_name,customer_cpf_cnpj,customer_email,subscription_id,subscription_value,subscription_cycle,subscription_status,subscription_next_due_date,anticipation_id,anticipation_status,anticipation_date,anticipation_fee,anticipation_net_value
pay_abc123,2026-01-10,2026-01-15,299.00,290.21,RECEIVED,BOLETO,cus_xyz789,Empresa Alfa Ltda,12.345.678/0001-90,financeiro@alfa.com.br,sub_def456,299.00,MONTHLY,ACTIVE,2026-02-15,9e7d-350f,CREDITED,2026-01-05,2.33,287.88
pay_abc124,2026-01-11,2026-01-20,149.90,144.52,OVERDUE,BOLETO,cus_xyz790,João da Silva,123.456.789-00,joao@email.com,,,,,,,,,,
pay_abc125,2026-01-12,2026-01-25,599.00,581.51,CONFIRMED,CREDIT_CARD,cus_xyz791,Beta Comércio ME,98.765.432/0001-10,contato@beta.com,sub_def789,599.00,MONTHLY,ACTIVE,2026-02-25,,,,,
```

---

## Quality Criteria

- Every payment in `raw-payments.json` must appear as exactly one row
- No rows may be skipped, even if customer or subscription lookup fails (fill missing fields with empty string)
- Column count must be consistent across all rows
- File must be valid, parseable CSV
- Total row count (excluding header) must match the payment count from `extraction-summary.md`

---

## Veto Conditions

Reject and redo if ANY of these are true:
1. Any of the 4 raw JSON input files is missing or empty (customers, subscriptions, payments, anticipations)
2. Row count in CSV does not match totalCount of payments from extraction
3. CSV contains aggregated, grouped, or deduplicated data instead of raw flat rows
