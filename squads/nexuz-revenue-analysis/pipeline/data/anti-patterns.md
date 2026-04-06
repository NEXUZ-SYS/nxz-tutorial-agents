# Anti-Patterns — Revenue Analysis

## Never Do

1. **Never aggregate data before presenting the raw validation file.** The user explicitly
   requires ungrouped, raw data for manual verification. Any grouping, filtering, or
   summarization in the validation file defeats its purpose and hides data discrepancies.

2. **Never assume a customer without payments has no subscription.** A customer may have an
   ACTIVE subscription with future-dated payments not yet generated. Always check the
   subscription status field directly.

3. **Never classify based on payment status alone.** A payment being OVERDUE does not mean
   the subscription is inactive. And a payment being RECEIVED does not mean the subscription
   is active. Always cross-reference with the subscription's own status field.

4. **Never stop pagination early.** Asaas API paginates with a default of 10 records.
   Stopping before `hasMore: false` means incomplete data, which invalidates the entire
   analysis. Always paginate to completion.

5. **Never mix Asaas "invoices" (notas fiscais) with "payments" (cobranças).** In Asaas
   terminology, `/v3/invoices` are fiscal documents (NFS-e), not billing charges. The
   revenue analysis must use `/v3/payments` for billing data.

6. **Never present analysis without stating extraction date and record counts.** The reader
   must know when the data was pulled and how many records were analyzed to assess reliability.

7. **Never count anticipated revenue twice.** A payment with a CREDITED anticipation was
   already received on the `anticipationDate`. Do not count it again on the `dueDate`.
   The effective receipt month is determined by `anticipationDate`, not `dueDate`.

8. **Never ignore anticipation fees.** The `fee` reduces the actual amount received. Always
   report both gross (`totalValue`) and net (`netValue`) for anticipated payments. The
   difference is real cost to the business.

## Always Do

1. **Always verify record counts match API totalCount.** After pagination, compare your
   local count with the `totalCount` field from the API response. If they differ, flag
   the discrepancy.

2. **Always preserve null/empty subscription fields in raw data.** A null subscription
   field on a payment is meaningful — it indicates a one-time charge. Do not replace it
   with "N/A" or "—" in the raw validation file.

3. **Always classify customers into mutually exclusive categories.** Every customer must
   appear in exactly one category. The sum of all categories must equal the total customer
   count.

4. **Always include CPF/CNPJ in customer identification.** Customer names may have
   duplicates; CPF/CNPJ is the unique business identifier for manual verification.

5. **Always attribute anticipated revenue to the correct month.** Use `anticipationDate`
   as the effective receipt date, not the payment's `dueDate`. This is critical for
   accurate monthly cash flow analysis.
