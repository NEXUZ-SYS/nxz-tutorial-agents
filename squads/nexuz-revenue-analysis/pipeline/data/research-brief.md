# Research Brief — Revenue Analysis (Asaas)

## Domain: Financial Data Analysis (SaaS Billing)

### Frameworks & Methodologies

1. **Subscription Revenue Analysis Framework**
   - Extract all customers from billing platform
   - Map each customer to their active subscriptions (recurring revenue)
   - Map each customer to their payments/charges (realized revenue)
   - Cross-reference: identify customers with payments but no active subscription
   - Classify gaps: churned, downgraded, one-time-only, or data error

2. **Customer Lifecycle Mapping**
   - Active subscriber: has at least one subscription with status ACTIVE
   - Churned subscriber: had subscription(s) in the past, all now INACTIVE/EXPIRED
   - Non-subscriber: has payments but never had a subscription (one-time charges)
   - At-risk: subscription active but no recent payments (overdue)

3. **Asaas API Data Model**
   - **Customers** (`GET /v3/customers`): id, name, cpfCnpj, email, phone, externalReference
   - **Subscriptions** (`GET /v3/subscriptions`): id, customer, status, value, cycle, nextDueDate, billingType, dateCreated, description
     - Status values: ACTIVE, INACTIVE, EXPIRED
     - Can filter by: customer, status, billingType, includeDeleted
   - **Payments** (`GET /v3/payments`): id, customer, subscription, value, netValue, status, dueDate, paymentDate, billingType, description
     - Status values: PENDING, RECEIVED, CONFIRMED, OVERDUE, REFUNDED, RECEIVED_IN_CASH, REFUND_REQUESTED, REFUND_IN_PROGRESS, CHARGEBACK_REQUESTED, CHARGEBACK_DISPUTE, AWAITING_CHARGEBACK_REVERSAL, DUNNING_REQUESTED, DUNNING_RECEIVED, AWAITING_RISK_ANALYSIS
     - Can filter by: customer, subscription, status, billingType, dateCreated range, dueDate range

### Key Metrics

- **Total customers**: count of unique customers
- **Customers with active subscriptions**: count with at least 1 ACTIVE subscription
- **Customers without active subscriptions**: total - active subscribers
- **Revenue from subscriptions vs one-time**: breakdown by subscription linkage
- **Churn indicators**: customers whose subscriptions changed from ACTIVE to INACTIVE/EXPIRED

### Anticipations API

- **Anticipations** (`GET /v3/anticipations`): id, payment, status, anticipationDate, dueDate, requestDate, fee, anticipationDays, netValue, totalValue, value, denialObservation
  - Status values: PENDING, DENIED, CREDITED, DEBITED, CANCELLED, OVERDUE, SCHEDULED
  - `CREDITED` = dinheiro já recebido antecipadamente
  - Can filter by: payment, installment, status
  - The `payment` field links to the payment ID (`pay_XXX`)
  - Authentication: `access_token` header with ASAAS_API_KEY from .env

**Lógica de antecipação:**
- Um pagamento com antecipação `status: CREDITED` teve seu valor recebido na `anticipationDate`, não na `dueDate`
- A `fee` é o custo da antecipação, `netValue` é o valor líquido recebido
- Para análise mensal: o mês de recebimento efetivo é o mês da `anticipationDate`

### Pagination Strategy

All Asaas endpoints are paginated (default limit: 10, max: 100).
Must iterate with `offset` parameter until `hasMore: false`.

### Google Sheets MCP

- **Tool**: `mcp__gsheets__write-range` — write data to specific ranges
- **Tool**: `mcp__gsheets__append-rows` — append rows to existing data
- **Tool**: `mcp__gsheets__get-spreadsheet-info` — get sheet names and structure
- **Spreadsheet ID**: Retrieved from environment variable `GOOGLE_SHEETS_CONTAS_A_PAGAR_ID`

### Data Quality Considerations

- Asaas customer IDs are prefixed with `cus_`
- Subscription IDs are prefixed with `sub_`
- Payment IDs are prefixed with `pay_`
- A payment may or may not have a `subscription` field — null means it's a one-time charge
- Anticipation IDs are UUIDs (not prefixed)
- Always verify totalCount from API response matches records retrieved
