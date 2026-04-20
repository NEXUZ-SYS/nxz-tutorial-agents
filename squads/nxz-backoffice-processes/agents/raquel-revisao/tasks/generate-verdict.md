---
task: generate-verdict
order: 3
input:
  - rubric-scoring-table (output of task 1)
  - governance-checks (output of task 2)
output:
  - squads/nxz-backoffice-processes/output/review-verdict.md
---

# Task 3 — Generate Verdict

Consolidar a rubrica de 10 dimensões (task 1) e os governance checks (task 2) em um veredito formal escrito em `output/review-verdict.md`. O veredito decide se o PDD avança para go-live, avança com condições, ou volta para Paula Processo revisar.

## Process

1. **Aplicar as regras de decisão.** Classificar o veredito segundo o algoritmo:
   - **APROVADO**: total ≥ 14/20 AND nenhuma dimensão com nota 0 AND SoD overall = PASS AND LGPD sem FAIL crítico.
   - **APROVADO COM CONDIÇÕES**: total ≥ 12/20 AND SoD overall = PASS AND LGPD sem FAIL crítico AND existe pelo menos 1 dimensão com nota 1 ou 1 fail-safe FAIL não-crítico.
   - **REJEITADO**: qualquer SoD FAIL, ou LGPD FAIL crítico, ou total < 12/20, ou qualquer dimensão com nota 0.
2. **Escrever as seções do veredito.** Gerar o review-verdict.md com estrutura obrigatória: Veredito → Score Summary → Governance Checks → Blocking Issues → Non-Blocking Recommendations → Re-Score Plan (somente se CONDICIONAL ou REJEITADO).
3. **Listar blocking issues numerados.** Cada blocking issue traz: dimensão afetada, citação de evidência do PDD, ação requerida específica (verbo + escopo), prioridade (P0 = go-live blocker, P1 = condição obrigatória antes de 30d).
4. **Listar non-blocking recommendations numerados.** Cada recomendação traz: área, recomendação concreta, rationale. Recomendações são melhorias — não bloqueiam go-live mas entram no backlog de evolução.
5. **Gerar re-score plan quando aplicável.** Se veredito = REJEITADO ou CONDICIONAL, listar quais dimensões precisam ser re-pontuadas após a revisão de Paula e qual evidência específica deve ser adicionada para cada uma virar nota 2.
6. **Salvar em `output/review-verdict.md`.** Arquivo final em Markdown, tool-agnostic (nenhuma menção a produto de software), pronto para ser consumido pelo step-08 do pipeline.

## Output Format

```yaml
review_verdict:
  process_name: string
  pdd_version: string
  reviewer: "Raquel Revisão"
  reviewed_at: ISO-8601
  verdict: APROVADO | APROVADO COM CONDIÇÕES | REJEITADO
  total_score: integer / 20
  score_summary_table: [embedded from task 1]
  governance_checks_summary: [embedded from task 2]
  blocking_issues:
    - id: B1
      dimension: string
      evidence: string
      required_action: string
      priority: P0 | P1
  non_blocking_recommendations:
    - id: R1
      area: string
      recommendation: string
      rationale: string
  rescore_plan:
    - dimension: string
      required_evidence: string
      target_score: 2
```

## Output Example

```markdown
# Review Verdict — Contas a Pagar v1.2

## Veredito
**APROVADO COM CONDIÇÕES — 15/20**
Processo estruturalmente sólido, mas contém 1 violação de SoD e 1 gap de LGPD
que devem ser corrigidos em até 15 dias após go-live (P0). Exceções com
fail-safe incompleto são P1.

## Score Summary
| # | Dimensão | Nota | Evidência |
|---|---|---|---|
| 1 | Clarity | 2 | Seção 2 — verbos de ação por passo |
| 2 | Completeness | 2 | Seções 2-6 cobrem ciclo completo |
| 3 | Coherence | 1 | 4.3 vs 7 — divergência de papel |
| 4 | Feasibility | 2 | Volumes 420/mês compatíveis |
| 5 | Controls | 1 | 3.2 preventivo sem detectivo pareado |
| 6 | Measurability | 1 | KPI sem baseline numérica atual |
| 7 | Auditability | 2 | Audit trail 5 anos, seção 9 |
| 8 | Exception handling | 1 | Exceção 6.2 sem handler nominal |
| 9 | Compliance/LGPD | 1 | Fluxo de direitos 15d ausente |
| 10 | Ownership & Governance | 2 | Owner + deputy + cadência definidos |
| — | **Total** | **15/20** | — |

## Governance Checks
- **SoD:** FAIL — vendor-master e payment-release no mesmo papel (seções 3.1 e 6.2).
- **Fail-safe:** FAIL — exceção E1 sem handler, E3 sem SLA.
- **LGPD:** FAIL parcial — CPF e dados bancários sem fluxo de direitos em 15d.
- **Decisão de go-live:** CONDICIONAL (corrigir SoD e LGPD em até 15d).

## Blocking Issues
1. **B1 — SoD violation (Controls)** — Evidência: seções 3.1 e 6.2 atribuem
   manutenção de cadastro de fornecedor e liberação de pagamento ao mesmo
   papel. **Ação requerida:** separar manutenção de cadastro em papel distinto
   OU implementar four-eyes compensatório documentado no passo 6.2.
   **Prioridade: P0.**
2. **B2 — LGPD sem fluxo de direitos (Compliance)** — Evidência: seção 10.1
   declara base legal e retenção mas não desenha fluxo de direitos do titular
   em até 15 dias. **Ação requerida:** adicionar seção 10.3 com fluxo de
   recebimento, triagem, resposta e registro de solicitações do titular.
   **Prioridade: P0.**
3. **B3 — Exceção E1 sem handler (Exception handling)** — Evidência: seção 6.2
   escala para "coordenação" sem nomear handler ou SLA. **Ação requerida:**
   nomear handler (papel específico) e fixar SLA em horas úteis.
   **Prioridade: P1.**

## Non-Blocking Recommendations
1. **R1 — Coherence de papéis (Coherence)** — Unificar terminologia entre
   seção 4.3 ("analista de tesouraria") e RACI seção 7 ("tesouraria júnior").
   Rationale: evita ambiguidade em handover.
2. **R2 — Controle detectivo de cadastro (Controls)** — Adicionar
   reconciliação trimestral de base de fornecedores como controle detectivo
   pareado ao preventivo do passo 3.2. Rationale: detecta duplicidades que
   escapam do preventivo.
3. **R3 — Baseline do KPI (Measurability)** — Medir tempo médio de aprovação
   durante 30 dias pós go-live e registrar como baseline no PDD. Rationale:
   sem baseline o KPI não detecta desvio.
4. **R4 — SLA explícito em E3 (Exception handling)** — Fixar SLA para aprovação
   fora do horário (ex.: tratado até 11h do próximo dia útil). Rationale:
   evita dívida de prazo indefinida.

## Re-Score Plan
Após Paula Processo revisar o PDD, re-pontuar as seguintes dimensões com
evidência requerida:
- **Controls** — evidência necessária: controle detectivo pareado documentado
  no passo 3.2. Target: nota 2.
- **Compliance/LGPD** — evidência necessária: seção 10.3 com fluxo de direitos
  do titular em 15d. Target: nota 2.
- **Exception handling** — evidência necessária: E1 com handler nominal + SLA.
  Target: nota 2.
- **Coherence** — evidência necessária: terminologia de papéis unificada entre
  seções 4.3 e 7. Target: nota 2.
Após re-score, total projetado: 19/20 → elegível a APROVADO sem condições.
```

## Quality Criteria

- Veredito classificado segundo as regras determinísticas (sem zona cinzenta).
- Score summary e governance checks embutidos diretamente no verdict file — leitor não precisa abrir outro documento.
- Cada blocking issue tem os 4 campos preenchidos (dimensão, evidência, ação requerida, prioridade).
- Re-score plan presente sempre que veredito ≠ APROVADO, com dimensões específicas e evidência requerida por dimensão.

## Veto Conditions

- Veredito emitido sem as regras de decisão aplicadas corretamente (ex.: SoD FAIL presente mas veredito = APROVADO) — rejeitar e reclassificar.
- Blocking issue sem ação requerida específica (ex.: "melhorar controle" em vez de "adicionar reconciliação trimestral no passo 3.2") — reescrever com verbo + escopo antes de publicar.
