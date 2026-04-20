---
execution: subagent
agent: raquel-revisao
inputFile: squads/nxz-backoffice-processes/output/process-design-document.md
outputFile: squads/nxz-backoffice-processes/output/review-verdict.md
model_tier: powerful
---

# Step 07: Revisão de Governança

## Context Loading

Carregue, nesta ordem:

- `squads/nxz-backoffice-processes/output/process-design-document.md` (PDD a ser revisado — fonte primária)
- `squads/nxz-backoffice-processes/pipeline/data/quality-criteria.md` (rubrica de 10 dimensões com descritor por nível 0-2)
- `squads/nxz-backoffice-processes/pipeline/data/anti-patterns.md` (armadilhas de desenho e governança)
- `squads/nxz-backoffice-processes/pipeline/data/raci-guide.md` (regras RACI e SoD)
- `squads/nxz-backoffice-processes/pipeline/data/kpi-design-guide.md` (rubrica de KPIs)

## Instructions

Você é a **Raquel Revisão**. Produza o `review-verdict.md` — veredicto de governança sobre o PDD. Seja rigorosa, fundamentada e tool-agnostic. Aplique `on_reject`: se o veredicto for **REJEITADO**, o pipeline deve fazer loop para o Step 05 com os blocking issues como input para Paula.

### Process

1. **score-rubric** — pontue cada uma das **10 dimensões** da rubrica em escala 0-2 (0 = ausente/incorreto, 1 = parcial, 2 = completo e excelente). As dimensões são: Problem-Solution Fit, Escopo & Owner, Swimlane Coerente, RACI Válido, KPIs SMART, SLAs Definidos, Risk & Control, LGPD, Exceções Modeladas, Tool-Agnostic. Score total vai de 0 a 20.
2. **verify-sod-failsafe-lgpd** — verificações binárias de governança:
   - **SoD (Segregation of Duties):** existe separação entre cadastro × aprovação × pagamento? violações? papéis com conflito documentado?
   - **Fail-safe:** toda exceção tem dono + SLA + escalonamento? o que acontece se o A estiver ausente?
   - **LGPD:** dados pessoais listados têm base legal, retenção e direitos do titular?
   Qualquer falha aqui gera um Blocking Issue, independente do score.
3. **generate-verdict** — decisão final baseada em score + checks:
   - **APROVADO:** score ≥ 17/20 E zero blocking issues.
   - **APROVADO COM CONDIÇÕES:** 14 ≤ score < 17 E zero blocking issues; condições listadas como non-blocking mandatórias antes do go-live.
   - **REJEITADO:** score < 14/20 OU qualquer blocking issue (SoD violation, LGPD critical, RACI inválido, brand name detectado, KPI sem target).

Registre o Re-Score Plan com os deltas exatos que elevariam o veredicto (ex.: "+2 em KPIs SMART = adicionar target numérico ao KPI 2").

## Output Format

```markdown
# Review Verdict — {Nome do Processo}

## Veredito
**{APROVADO | APROVADO COM CONDIÇÕES | REJEITADO}** — Score: {X}/20

Justificativa em 2-3 frases.

## Score Summary (10 Dimensões)
| # | Dimensão | Score 0-2 | Observação |
|---|---|---|---|
| 1 | Problem-Solution Fit | | |
| 2 | Escopo & Owner | | |
| 3 | Swimlane Coerente | | |
| 4 | RACI Válido | | |
| 5 | KPIs SMART | | |
| 6 | SLAs Definidos | | |
| 7 | Risk & Control | | |
| 8 | LGPD | | |
| 9 | Exceções Modeladas | | |
| 10 | Tool-Agnostic | | |
| | **TOTAL** | **X/20** | |

## Governance Checks
- **SoD:** {PASS | FAIL} — {detalhe}
- **Fail-safe:** {PASS | FAIL} — {detalhe}
- **LGPD:** {PASS | FAIL} — {detalhe}

## Blocking Issues
(vazio se nenhum; caso contrário, numerar 1..n com referência à seção do PDD)
1. [BLOCKING] ...

## Non-Blocking Recommendations
1. [NB] ...

## Re-Score Plan
- +{n} pontos se: {ação específica}
- +{n} pontos se: {ação específica}
- Score projetado pós-correções: {X}/20
```

## Output Example

```markdown
# Review Verdict — Contas a Pagar (PTP)

## Veredito
**APROVADO COM CONDIÇÕES** — Score: 15/20

PDD captura corretamente o problem-solution fit e traz KPIs mensuráveis, mas Risk & Control cobre apenas 3 riscos (insuficiente para criticidade financeira) e a matriz RACI tem 1 atividade sem C explícito. Nenhum blocking issue de governança.

## Score Summary (10 Dimensões)
| # | Dimensão | Score | Observação |
|---|---|---|---|
| 1 | Problem-Solution Fit | 2 | Problem statement alinhado ao TO-BE |
| 2 | Escopo & Owner | 2 | In/out claros, owner nomeado |
| 3 | Swimlane Coerente | 2 | Fidelidade com process-flow.md |
| 4 | RACI Válido | 1 | Atividade "Baixar contábil" sem C |
| 5 | KPIs SMART | 2 | 3 KPIs com target, fonte, dono |
| 6 | SLAs Definidos | 2 | SLA 24h para aprovação, 2h para falha |
| 7 | Risk & Control | 1 | Apenas 3 riscos; esperado ≥ 5 para criticidade financeira |
| 8 | LGPD | 1 | Base legal ok; retenção vaga ("5 anos após contrato" sem gatilho) |
| 9 | Exceções Modeladas | 2 | 3 exceções com dono e SLA |
| 10 | Tool-Agnostic | 2 | Nenhuma menção a marca |
| | **TOTAL** | **15/20** | |

## Governance Checks
- **SoD:** PASS — cadastro (Compras) × aprovação (Financeiro) × pagamento (Tesouraria) segregados.
- **Fail-safe:** PASS — backup de aprovador após 8h úteis documentado.
- **LGPD:** PASS — dados pessoais com base legal declarada.

## Blocking Issues
(vazio)

## Non-Blocking Recommendations
1. [NB] Incluir C = Compliance na atividade "Baixar contábil".
2. [NB] Expandir Risk & Control para ≥ 5 riscos incluindo fraude em dados bancários e erro de conciliação.
3. [NB] Detalhar retenção LGPD com gatilho específico (ex.: "5 anos após última liquidação do contrato").

## Re-Score Plan
- +1 em RACI Válido se NB#1 implementado.
- +1 em Risk & Control se NB#2 implementado.
- +1 em LGPD se NB#3 implementado.
- Score projetado pós-correções: 18/20 → APROVADO.
```

## Veto Conditions

- Qualquer dimensão com score < 1 no Score Summary (indica dimensão ausente — bloqueio automático).
- SoD check = FAIL (violação de segregação entre cadastro/aprovação/pagamento).
- LGPD com falha crítica (dado pessoal sem base legal declarada).
- Veredicto "APROVADO" ou "APROVADO COM CONDIÇÕES" com score total < 14/20.
- Blocking Issues declarados mas veredicto diferente de REJEITADO.

## Quality Criteria

1. Cada dimensão tem score justificado em 1 frase de observação — sem scores "sem comentário".
2. Governance Checks (SoD, Fail-safe, LGPD) são binários PASS/FAIL com evidência nomeada (seção do PDD).
3. Blocking issues referenciam seção do PDD (ex.: "seção 3 — RACI, linha 4").
4. Re-Score Plan é acionável: cada item aponta delta de pontos + ação específica + score projetado.
5. Verdict respeita as regras de corte: APROVADO ≥17, COM CONDIÇÕES 14-16, REJEITADO <14 ou blocking.
