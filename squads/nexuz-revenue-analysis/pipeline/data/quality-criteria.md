# Quality Criteria — Revenue Analysis

## Data Extraction Criteria

- [ ] All paginated endpoints were fully traversed (hasMore: false reached)
- [ ] totalCount from API matches number of records extracted
- [ ] No duplicate records (unique IDs verified)
- [ ] Customer, subscription, payment, and anticipation counts are logged and reported

## Raw Validation File Criteria

- [ ] One row per customer-payment combination (no aggregation)
- [ ] All fields present: customer_id, customer_name, cpf_cnpj, payment_id, payment_value, payment_status, due_date, subscription_id, subscription_status, anticipation_id, anticipation_status, anticipation_date, anticipation_fee, anticipation_net_value
- [ ] No data transformation applied (raw values from API)
- [ ] Null/empty fields preserved as-is (not replaced with defaults)
- [ ] Anticipation fields empty when payment has no linked anticipation (not "null" or "N/A")
- [ ] File is saved as CSV with headers in the first row

## Analysis Criteria

- [ ] Every customer appears in exactly one category (mutually exclusive classification)
- [ ] Sum of customers across all categories equals total unique customers
- [ ] Customers with active subscriptions are NOT listed in "sem assinatura" category
- [ ] Subscription status values match Asaas enum: ACTIVE, INACTIVE, EXPIRED
- [ ] Payment-subscription linkage uses the `subscription` field from payment records

## Report Criteria

- [ ] Executive summary has exactly 3 bullet points
- [ ] Every metric includes absolute count and percentage of total
- [ ] Detailed lists include customer name, CPF/CNPJ, and relevant IDs
- [ ] Anticipated revenue section includes all CREDITED anticipations with date, fee, and net value
- [ ] Anticipated payments are attributed to the month of anticipationDate, not dueDate
- [ ] Recommendations are actionable and specific
- [ ] Methodology section states data extraction date and record counts
