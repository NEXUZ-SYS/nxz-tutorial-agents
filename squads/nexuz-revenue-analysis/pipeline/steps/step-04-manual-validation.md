---
type: checkpoint
---

# Step 04 — Manual Validation

**Type:** Checkpoint — requires explicit user approval before continuing.

---

## Display to User

Present the following information before asking for approval:

**Generated File:**

- Path: `squads/nexuz-revenue-analysis/output/validacao-bruta.csv`
- Total rows (excluding header): `{row_count}`

**Sample Data (first 5–10 rows):**

Display the first 5 to 10 rows of the CSV in a readable table format, including all column headers. If the CSV has many columns, prioritize the most important fields:
- `customer_name`, `payment_value`, `payment_status`, `payment_due_date`, `subscription_cycle`

**Data Quality Notes:**

- Flag any rows where customer fields are empty (payment with unresolved customer)
- Flag any rows where payment_value is 0 or negative
- Indicate how many payments have no linked subscription

---

## Question

> "Valide os dados brutos no arquivo CSV. Os dados estão corretos para prosseguir com a análise?"

---

## Options

| Option | Action |
|--------|--------|
| **Aprovar e continuar análise** | Continue to step-05-cross-reference-analysis |
| **Preciso de ajustes no arquivo** | Pause and allow user to manually edit the CSV, then re-present checkpoint |
| **Reextrair dados do Asaas** | Return to step-01-extract-data and rerun the full extraction |

---

## Rules

- Do NOT auto-approve this checkpoint
- Wait for explicit user selection before proceeding
- If the user selects "Preciso de ajustes no arquivo", instruct them to edit the file directly and confirm when done
- If the user asks questions about specific rows or values, answer them before presenting options again
