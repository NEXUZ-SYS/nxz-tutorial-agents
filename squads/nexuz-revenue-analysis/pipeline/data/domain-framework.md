# Domain Framework — Revenue Analysis

## Operational Methodology

### Step 1: Data Extraction
Extract all records from three Asaas endpoints with full pagination:
1. Customers — all active customers
2. Subscriptions — all subscriptions (include deleted for historical context)
3. Payments — all payments within the analysis period

For each endpoint, paginate with `offset` and `limit=100` until `hasMore: false`.
Verify `totalCount` matches the number of records retrieved.

### Step 1b: Anticipation Extraction
Extract all anticipations from `/v3/anticipations` with full pagination.
Build a lookup map: anticipation.payment → anticipation object.
Only anticipations with `status: CREDITED` represent actual early cash receipt.

### Step 2: Raw Data Compilation
Compile a flat, ungrouped file with one row per customer-payment-subscription-anticipation combination:
- Customer ID, Name, CPF/CNPJ, Email
- Payment ID, Value, Status, Due Date, Payment Date, Billing Type
- Subscription ID (if linked), Subscription Status, Subscription Value, Cycle
- Anticipation ID (if exists), Anticipation Status, Anticipation Date, Fee, Net Value

This file is for manual validation — no filters, no aggregations, no sorting beyond natural order.

### Step 3: Data Cross-Reference
For each customer, determine:
- Has active subscription(s)? → List subscription IDs and values
- Has payments without subscription link? → List payment IDs
- Has only inactive/expired subscriptions? → Flag as churned
- Has no subscriptions at all? → Flag as non-subscriber

### Step 3b: Anticipation Cross-Reference
For each payment, check if it has a linked anticipation with status CREDITED:
- If yes: mark as "receita antecipada" with `anticipationDate` as effective receipt date
- Calculate: total anticipated revenue (gross), total fees, total net anticipated
- For monthly analysis: attribute the revenue to the month of `anticipationDate`, not `dueDate`

### Step 4: Gap Identification
Identify customers in these categories:
1. **Sem assinatura ativa**: Customer has payments but zero ACTIVE subscriptions
2. **Assinatura inativa**: Customer has subscription(s) but all are INACTIVE or EXPIRED
3. **Cobrança avulsa**: Customer has payments with no subscription link (subscription field is null)
4. **Inadimplente**: Customer has ACTIVE subscription but payments are OVERDUE

### Step 5: Report Generation
Produce a structured analytical report with:
- Executive summary (3 bullets)
- Metrics table with counts and percentages
- Detailed list per category
- Anticipated revenue section (payments already received early, with effective month, fees, and cash flow impact)
- Recommendations for action

### Step 6: Export to Google Sheets
Write the analytical report to a dedicated sheet in the target spreadsheet.

## Decision Criteria

| Condition | Classification |
|-----------|---------------|
| Customer has >= 1 ACTIVE subscription | Ativo |
| Customer has subscriptions but all INACTIVE/EXPIRED | Churned |
| Customer has payments but subscription field is null on all | Cobrança avulsa |
| Customer has ACTIVE subscription + OVERDUE payments | Inadimplente |
| Customer has no payments and no subscriptions | Inativo (sem movimentação) |
| Payment has anticipation with status CREDITED | Receita antecipada (já recebida) |
