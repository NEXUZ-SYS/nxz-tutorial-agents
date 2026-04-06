---
execution: inline
agent: squads/nexuz-revenue-analysis/agents/reviewer
inputFile: squads/nexuz-revenue-analysis/output/relatorio-receita.md
outputFile: squads/nexuz-revenue-analysis/output/review-feedback.md
---

# Step 06 — Review Analysis

**Agent:** Renata Revisão
**Goal:** Review the revenue report for analytical quality, completeness, and accuracy. Score the report and generate structured feedback.

---

## Context Files

- `squads/nexuz-revenue-analysis/agents/reviewer/quality-criteria.md` — Scoring rubric and minimum thresholds
- `squads/nexuz-revenue-analysis/agents/reviewer/anti-patterns.md` — Known mistakes and disqualifying patterns to check for

---

## Tasks

### Task 1: score-analysis

Review `relatorio-receita.md` against the quality criteria and assign a numeric score from 0.0 to 10.0.

Evaluate the following dimensions:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Completeness | 25% | All required sections present (summary, categories, KPIs, anomalies) |
| Accuracy | 30% | Calculations match source data; categories correctly applied |
| Clarity | 20% | Report is readable and well-structured |
| Anti-pattern absence | 15% | No disqualifying patterns from anti-patterns.md |
| Actionability | 10% | Insights are specific and useful for business decisions |

Final score = weighted average across all dimensions.

### Task 2: generate-feedback

Based on the scoring, produce `output/review-feedback.md` with:

- Overall score (e.g., 8.4 / 10.0)
- Score breakdown by dimension
- List of specific issues found (with line references where possible)
- Recommendations for improvement (if score < 10.0)
- Final verdict: APPROVED or REJECTED

**Rejection rule:** If the final score is below 7.0, set verdict to REJECTED. This will trigger a return to step-05 for re-analysis.

---

## Process Steps

1. Read `relatorio-receita.md` in full
2. Check for presence of all required sections
3. Spot-check 10+ calculations against the source CSV logic
4. Identify any anti-patterns from anti-patterns.md
5. Evaluate clarity and actionability
6. Compute weighted score
7. Write score breakdown
8. Write specific issue list with references
9. Write final verdict
10. Save to `output/review-feedback.md`

---

## Output Example

```markdown
# Review Feedback — Relatório de Receita

**Reviewed by:** Renata Revisão
**Date:** 2026-04-06
**Score:** 8.1 / 10.0
**Verdict:** APPROVED

## Score Breakdown

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|---------|
| Completeness | 9.0 | 25% | 2.25 |
| Accuracy | 8.0 | 30% | 2.40 |
| Clarity | 8.5 | 20% | 1.70 |
| Anti-pattern absence | 7.5 | 15% | 1.13 |
| Actionability | 6.5 | 10% | 0.65 |
| **Total** | | | **8.13** |

## Issues Found

1. **[Accuracy]** MRR total (R$ 187.430,00) includes 3 payments with status PENDING — only ACTIVE subscriptions should be counted.
2. **[Clarity]** The "Churn Recente" section lacks a definition of the 90-day window used.
3. **[Actionability]** Anomaly section lists issues but provides no recommended next steps.

## Recommendations

- Recalculate MRR excluding PENDING payments
- Add a note clarifying the 90-day churn window definition
- Add recommended actions for each anomaly type

## Verdict

**APPROVED** — Score above threshold (7.0). Proceed to final approval checkpoint.
```

---

## On Rejection (score < 7.0)

If the verdict is REJECTED:

1. Document all critical issues clearly in the feedback file
2. Set `on_reject: step-05-cross-reference-analysis` — the pipeline runner will return to step-05 for re-analysis
3. The feedback file will be passed as context to step-05 on the retry

---

## Quality Criteria

- Score must be a number between 0.0 and 10.0
- All 5 dimensions must be evaluated independently
- At least 10 spot-check calculations must be documented
- Verdict must be either APPROVED or REJECTED — no other values
- Feedback must include specific, actionable improvement notes (not generic)
