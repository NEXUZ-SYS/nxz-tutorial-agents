---
type: checkpoint
---

# Step 06: Aprovação do Desenho do Processo

## Contexto

Paula Processo entregou o PDD completo em `squads/nxz-backoffice-processes/output/process-design-document.md`. Este é um checkpoint de **validação humana** antes da revisão de governança (Step 07 — Raquel Revisão). O objetivo é confirmar que o desenho capturou corretamente a intenção do briefing, refletiu as respostas aos gaps e está coerente com o AS-IS/TO-BE antes de gastar ciclo de revisão formal.

Artefatos disponíveis neste ponto:
- `process-design-document.md` (PDD draft v0.1).
- `process-flow.md` (AS-IS/TO-BE).
- `briefing-analysis.md` e `briefing-gaps-resolved.md` (contexto original).

## Apresentação ao Usuário

Mostrar ao usuário, em ordem:

1. **Resumo executivo do PDD** (gerar on-the-fly a partir do Cover + seções do documento):
   - Nome do processo + versão + owner + audiência.
   - Purpose & Scope (in/out) — 3 linhas.
   - 3 principais KPIs com target.
   - 3 principais riscos com controle.
   - Swimlane TO-BE condensado (1 frase por raia).
   - Principais Assumptions assumidas (se houver).

2. **Link direto** para o artefato completo:
   `squads/nxz-backoffice-processes/output/process-design-document.md`

3. **Sugestão explícita** ao usuário: "Recomendado ler o PDD completo antes de decidir — especialmente as seções RACI, KPIs e Risk & Control Matrix. Vou aguardar sua decisão."

## Opções

Apresentar via AskUserQuestion, enumeradas exatamente como abaixo:

- **APROVAR** — seguir para revisão de governança (Step 07 — Raquel Revisão executa a rubrica de 10 dimensões + checks SoD/Fail-safe/LGPD).
- **AJUSTAR** — solicitar edições pontuais antes da revisão de governança. O usuário fornece os pontos a ajustar em texto livre; o pipeline devolve para Paula Processo (Step 05) apenas com o delta solicitado, mantendo o restante do PDD.
- **REJEITAR** — o desenho não reflete o briefing ou há problema estrutural. Voltar para Step 05 (design) em loop manual; o usuário indica em texto livre o motivo da rejeição (erro de escopo, stakeholders errados, TO-BE inviável, etc.) para Paula refazer o draft.
