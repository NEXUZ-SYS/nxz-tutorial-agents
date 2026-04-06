---
execution: inline
agent: squads/nexuz-revenue-analysis/agents/analyst
inputFile: squads/nexuz-revenue-analysis/output/relatorio-receita.md
outputFile: squads/nexuz-revenue-analysis/output/export-confirmation.md
---

# Step 08 — Export to Google Sheets

**Agent:** André Análise
**Goal:** Export the approved revenue report data to Google Sheets, writing each report section to an appropriate tab or range.

---

## Context Files

- `squads/nexuz-revenue-analysis/output/relatorio-receita.md` — The approved revenue report to export
- `squads/nexuz-revenue-analysis/output/review-feedback.md` — Review context (for reference only)

---

## Instructions

### Step 1: Inspect Existing Spreadsheet

Use `mcp__gsheets__get-spreadsheet-info` to check the target spreadsheet:

- Retrieve spreadsheet ID from squad configuration or environment
- List all existing sheets/tabs
- Identify if a "Receita" or "Revenue Analysis" tab already exists

### Step 2: Write Report Data

Use `mcp__gsheets__write-range` to write the report data. Create a new tab named `Receita-{YYYY-MM-DD}` using today's date.

Write the following sections as separate table blocks within the tab:

1. **KPI Summary** — Key metrics table (MRR, overdue, churn rate, ARPU)
2. **Category Breakdown** — One row per customer category with count and total revenue
3. **Customer Detail** — One row per customer with classification, value, and status
4. **Anomalies** — List of anomalies flagged in the report

### Step 3: Confirm Export

After all writes complete, produce `output/export-confirmation.md` summarizing what was written.

---

## Process Steps

1. Call `mcp__gsheets__get-spreadsheet-info` with the target spreadsheet ID
2. Review existing sheets to avoid overwriting active data
3. Determine the new tab name: `Receita-{YYYY-MM-DD}`
4. Parse `relatorio-receita.md` to extract structured data for each section
5. Call `mcp__gsheets__write-range` for the KPI Summary block
6. Call `mcp__gsheets__write-range` for the Category Breakdown block
7. Call `mcp__gsheets__write-range` for the Customer Detail table
8. Call `mcp__gsheets__write-range` for the Anomalies block
9. Verify all writes returned success responses
10. Write `export-confirmation.md`

---

## Output Example

```markdown
# Export Confirmation

**Date:** 2026-04-06 15:47:00
**Spreadsheet:** Nexuz Revenue Dashboard
**Tab created:** Receita-2026-04-06
**Status:** Success

## Sections Written

| Section | Range | Rows Written |
|---------|-------|-------------|
| KPI Summary | Receita-2026-04-06!A1:B8 | 7 |
| Category Breakdown | Receita-2026-04-06!A11:D16 | 5 |
| Customer Detail | Receita-2026-04-06!A19:F1266 | 1,247 |
| Anomalies | Receita-2026-04-06!A1269:C1284 | 15 |

## Spreadsheet Link

https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit#gid={tab_id}
```

---

## Quality Criteria

- All 4 sections must be written successfully (no partial exports)
- Tab name must include today's date in YYYY-MM-DD format
- No existing tabs may be overwritten or deleted
- Export confirmation must include the spreadsheet link for the user to access
- Row counts in the confirmation must match the actual data written
- All monetary values must be written as plain numbers (not strings) so Google Sheets can compute totals
