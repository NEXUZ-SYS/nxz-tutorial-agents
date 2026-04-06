---
type: checkpoint
---

# Step 02 — Validate Extraction

**Type:** Checkpoint — requires explicit user approval before continuing.

---

## Display to User

Present the following information clearly before asking for approval:

**Extraction Results:**

- Total customers extracted: `{customers_count}` records
- Total subscriptions extracted: `{subscriptions_count}` records
- Total payments extracted: `{payments_count}` records
  - CONFIRMED: `{payments_confirmed}`
  - RECEIVED: `{payments_received}`
  - OVERDUE: `{payments_overdue}`
  - PENDING: `{payments_pending}`

**Extraction Warnings / Errors:**

- List any warnings or errors from `extraction-summary.md`
- If none: "Nenhum erro ou aviso registrado."

---

## Question

> "Os dados extraídos estão corretos? Posso prosseguir com a geração do arquivo de validação?"

---

## Options

| Option | Action |
|--------|--------|
| **Aprovar** | Continue to step-03-generate-raw-validation |
| **Reextrair dados** | Return to step-01-extract-data and rerun the extraction |

---

## Rules

- Do NOT auto-approve this checkpoint
- Wait for explicit user selection before proceeding
- If the user requests adjustments or asks questions, address them before presenting the options again
