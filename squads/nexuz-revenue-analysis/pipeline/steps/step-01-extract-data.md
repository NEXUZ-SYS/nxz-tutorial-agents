---
execution: subagent
agent: squads/nexuz-revenue-analysis/agents/extractor
outputFile: squads/nexuz-revenue-analysis/output/extraction-summary.md
model_tier: fast
---

# Step 01 — Extract Data

**Agent:** Elena Extração
**Goal:** Extract all customers, subscriptions, and payments from the Asaas API and produce a structured extraction summary.

---

## Context Files

- `squads/nexuz-revenue-analysis/agents/extractor/research-brief.md` — Background on the revenue analysis goal and scope
- `squads/nexuz-revenue-analysis/agents/extractor/domain-framework.md` — Business rules, entity definitions, and field mappings for Asaas data

---

## Instructions

Run all 3 extraction tasks in sequence:

1. **extract-customers** — Fetch all customers from Asaas. Paginate until all records are retrieved. Save raw output to `output/raw-customers.json`.
2. **extract-subscriptions** — Fetch all active and inactive subscriptions. Paginate until complete. Save raw output to `output/raw-subscriptions.json`.
3. **extract-payments** — Fetch all payments (CONFIRMED, RECEIVED, OVERDUE, PENDING). Paginate until complete. Save raw output to `output/raw-payments.json`.
4. **extract-anticipations** — Fetch all anticipations from `/v3/anticipations`. Paginate until complete. Save raw output to `output/raw-anticipations.json`. Use ASAAS_API_KEY from .env for authentication via `access_token` header.

After all 4 tasks complete, produce the file `output/extraction-summary.md` summarizing the extraction results.

---

## Process Steps

1. Initialize Asaas API client using credentials from environment or config
2. Call `/customers` endpoint with pagination — collect all pages
3. Write `raw-customers.json` with full response array
4. Call `/subscriptions` endpoint with pagination — collect all pages
5. Write `raw-subscriptions.json` with full response array
6. Call `/payments` endpoint with pagination — collect all pages
7. Write `raw-payments.json` with full response array
8. Call `/anticipations` endpoint with pagination — collect all pages
9. Write `raw-anticipations.json` with full response array, including status breakdown
10. Count entities in each file
9. Check for any HTTP errors, empty responses, or missing fields
10. Write `extraction-summary.md` with counts, warnings, and status

---

## Output Format

The output file `extraction-summary.md` must contain:

- Extraction date and time
- Count of customers extracted
- Count of subscriptions extracted
- Count of payments extracted (broken down by status)
- Count of anticipations extracted (broken down by status: CREDITED, PENDING, DENIED, etc.)
- Any warnings or errors encountered during extraction
- Confirmation that all 4 raw JSON files were written successfully

---

## Output Example

```markdown
# Extraction Summary

**Date:** 2026-04-06 14:32:00
**Status:** Completed successfully

## Entity Counts

| Entity         | Count |
|----------------|-------|
| Customers      | 1,247 |
| Subscriptions  |   832 |
| Payments       | 4,591 |
| Anticipations  |    47 |

### Payments by Status

| Status    | Count |
|-----------|-------|
| CONFIRMED |   312 |
| RECEIVED  | 3,891 |
| OVERDUE   |   274 |
| PENDING   |   114 |

### Anticipations by Status

| Status    | Count |
|-----------|-------|
| CREDITED  |    42 |
| PENDING   |     3 |
| DENIED    |     1 |
| CANCELLED |     1 |

## Files Written

- `output/raw-customers.json` — 1,247 records
- `output/raw-subscriptions.json` — 832 records
- `output/raw-payments.json` — 4,591 records
- `output/raw-anticipations.json` — 47 records

## Warnings

- None
```

---

## Veto Conditions

Do NOT proceed and raise an error if:

- Any API call returns a non-2xx status code
- The customers list is empty (0 records)
- The payments list is empty (0 records)
- Any raw JSON file cannot be written to disk

---

## Quality Criteria

- All 4 entity types extracted (customers, subscriptions, payments, anticipations)
- No pagination gaps (total count in API header matches records collected)
- All 4 raw JSON files present and non-empty
- Extraction summary accurately reflects the actual counts
- Warnings documented for any partial failures or skipped records
