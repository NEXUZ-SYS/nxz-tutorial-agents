---
type: checkpoint
---

# Step 07 — Approve Report

**Type:** Checkpoint — requires explicit user approval before continuing.

---

## Display to User

Present the following information before asking for approval:

**Executive Summary** (from `output/relatorio-receita.md`):

Display the full "Sumário Executivo" section of the report, including:
- Total customers analyzed
- Total MRR
- Total overdue amount
- Churn rate
- Any other top-level KPIs present in the summary

**Review Score & Feedback** (from `output/review-feedback.md`):

- Overall score: `{score} / 10.0`
- Verdict: `{APPROVED / REJECTED}`
- Top issues found (list up to 5 most critical)
- Reviewer recommendations summary

**Report Location:**

- Full report: `squads/nexuz-revenue-analysis/output/relatorio-receita.md`
- Review feedback: `squads/nexuz-revenue-analysis/output/review-feedback.md`

---

## Question

> "O relatório está aprovado para exportação ao Google Sheets?"

---

## Options

| Option | Action |
|--------|--------|
| **Aprovar e exportar** | Continue to step-08-export-to-sheets |
| **Solicitar revisão** | Return to step-06-review-analysis to trigger a new review cycle |
| **Ajustar manualmente** | Pause and allow user to edit `relatorio-receita.md` directly, then re-present this checkpoint |

---

## Rules

- Do NOT auto-approve this checkpoint
- Wait for explicit user selection before proceeding
- If the user selects "Ajustar manualmente", instruct them to edit the file and confirm when ready
- If the user asks for clarification on any metric or category, answer before re-presenting options
- If "Solicitar revisão" is selected, pass the user's specific concerns to step-06 as additional review context
