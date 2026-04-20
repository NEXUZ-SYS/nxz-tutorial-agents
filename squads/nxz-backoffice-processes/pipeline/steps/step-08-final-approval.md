---
type: checkpoint
---

# Step 08: Aprovação Final

## Contexto

Raquel Revisão entregou o veredicto de governança em `squads/nxz-backoffice-processes/output/review-verdict.md`. Este é o último checkpoint do pipeline: decidir o destino final do PDD. Os três caminhos são publicar (go-live), iterar (voltar a Paula com os blocking issues) ou arquivar (parar sem publicação, registrando motivo).

Artefatos disponíveis neste ponto:
- `review-verdict.md` (veredito + score + blocking / non-blocking).
- `process-design-document.md` (PDD na versão revisada).
- `process-flow.md` e `briefing-analysis.md` (contexto rastreável).

## Apresentação ao Usuário

Exibir ao usuário, em ordem:

1. **Veredito em destaque:** `APROVADO | APROVADO COM CONDIÇÕES | REJEITADO` com score total `X/20`, extraído literalmente do `review-verdict.md`.
2. **Score Summary** — mostrar a tabela de 10 dimensões completa.
3. **Governance Checks** — status PASS/FAIL de SoD, Fail-safe e LGPD.
4. **Blocking Issues** — lista numerada (ou "nenhum").
5. **Non-Blocking Recommendations** — lista numerada.
6. **Re-Score Plan** — mostrar o delta projetado pós-correções.
7. **Links diretos** aos artefatos completos:
   - `squads/nxz-backoffice-processes/output/review-verdict.md`
   - `squads/nxz-backoffice-processes/output/process-design-document.md`
8. **Sugestão explícita:** "Leia o veredicto completo e o PDD antes de decidir. As opções abaixo são definitivas para este ciclo."

## Opções

Apresentar via AskUserQuestion, enumeradas exatamente como abaixo:

- **PUBLICAR** — versão final aprovada. Atualizar Change Log do PDD para `v1.0 — publicada em {ISO}`, marcar status = PUBLICADO, encaminhar ao Process Owner para go-live. Uso recomendado quando veredicto é APROVADO (score ≥17) ou APROVADO COM CONDIÇÕES e as condições foram cumpridas no ciclo atual.
- **ITERAR** — voltar a Paula Processo (Step 05) tendo como input os Blocking Issues e/ou Non-Blocking Recommendations do veredicto. O pipeline reinicia a partir de Step 05 → Step 06 → Step 07 → Step 08. Uso recomendado quando veredicto é REJEITADO ou quando o usuário quer endereçar as condições antes de publicar.
- **ARQUIVAR** — parar o processo sem publicação. O usuário registra o motivo em texto livre (ex.: "demanda cancelada", "escopo redefinido", "processo descontinuado", "prioridade realocada"). O motivo é salvo no Change Log do PDD como `v0.X — ARQUIVADO em {ISO} — motivo: {texto}` e o squad encerra sem entregável publicado.
