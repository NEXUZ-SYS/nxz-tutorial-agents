---
id: "squads/nxz-backoffice-processes/agents/paula-processo/tasks/assemble-final-pdd"
name: "Assemble Final PDD"
order: 4
owner: paula-processo
inputs:
  - output/process-design-document.md (após define-kpis-risks-controls)
  - pipeline/data/quality-criteria.md
outputs:
  - output/process-design-document.md (versão final 1.0)
---

# Assemble Final PDD

## Objective

Montar a versão final do Process Design Document com todas as seções na ordem canônica, rodar o self-check contra o hard-checklist de qualidade e marcar como `status: ready-for-review` apenas se todos os itens passarem.

## Process

1. **Ordenar seções.** Reorganizar o documento na ordem canônica: Cover → Purpose & Scope → Swimlane → RACI → Inputs/Outputs → Business Rules → KPIs → SLAs → Risk & Control Matrix → Exceptions & Escalation → LGPD → Glossário → Change Log.
2. **Inserir índice.** Gerar Table of Contents automático com links para cada seção.
3. **Rodar read-aloud test.** Ler o PDD simulando um operador novo. Anotar pontos de ambiguidade e corrigir.
4. **Executar self-check.** Para cada item do `pipeline/data/quality-criteria.md`, marcar ✅ ou ❌ com nota explicando o porquê.
5. **Verificar veto conditions globais.** Zero brand names; RACI válido; LGPD completa; KPIs SMART; riscos altos com preventivo.
6. **Fechar versão.** Se tudo passa, subir para versão `1.0`, status `ready-for-review`, atualizar change log e gravar arquivo final.
7. **Sinalizar falha.** Se algum item falha, devolver para a task responsável com a lista de ❌ e manter versão em draft.

## Output Format

```yaml
final_document:
  version: "1.0"
  status: ready-for-review | blocked
  toc: [list of sections]
self_check:
  - item: string
    result: pass | fail
    note: string
vetoes:
  - rule: string
    status: pass | fail
handoff:
  to_role: Process Owner
  next_step: review-and-sign-off
```

## Output Example

```markdown
# PDD — Contas a Pagar (PRC-CAP-01) · v1.0

## Índice
1. Cover
2. Purpose & Scope
3. Swimlane Narrativo
4. RACI
5. Inputs & Outputs
6. Business Rules
7. KPIs
8. SLAs
9. Risk & Control Matrix
10. Exceptions & Escalation
11. LGPD
12. Glossário
13. Change Log

## Self-Check (quality-criteria.md)
- ✅ Cover block 100% preenchido — todos os campos ok.
- ✅ Zero brand names no documento — varredura automática sem hits.
- ✅ RACI: 1 A por atividade, ≥1 R por atividade — 5/5 atividades conformes.
- ✅ Business rules atômicas e no formato IF/THEN/ELSE — 5/5.
- ✅ KPIs SMART com baseline + target + threshold + owner + cadência — 4/4.
- ✅ SLA em toda atividade crítica (A-02, A-03, A-05) — ok.
- ✅ Riscos médios/altos com controle preventivo — 3/3.
- ✅ Controles com owner, frequência e evidência — 6/6.
- ✅ ≥3 exceções nomeadas com handler, SLA e logging — 3/3.
- ✅ LGPD: base legal por campo, retenção, fluxo de direitos em 15d, DPO nomeado.
- ✅ Glossário com ≥5 termos de domínio.
- ✅ Read-aloud test aprovado por revisão interna da Paula.

## Veto Conditions (global)
- ✅ Sem brand names.
- ✅ Nenhuma atividade com 2 A ou 0 A.
- ✅ Nenhum KPI sem target.
- ✅ Nenhum risco alto sem controle preventivo.
- ✅ LGPD completa.

## Change Log
- 1.0 (2026-04-16) — assembly final, self-check aprovado, handoff para Coordenador de Backoffice Financeiro.
- 0.3-draft (2026-04-16) — KPIs, SLAs, riscos, exceções e LGPD preenchidos.
- 0.2-draft (2026-04-16) — RACI, regras, inputs/outputs e SoD check.
- 0.1-draft (2026-04-16) — scaffold inicial.

## Handoff
Para: Coordenador de Backoffice Financeiro (Process Owner).
Próximo passo: revisão e sign-off. Prazo sugerido: 5 dias úteis.
```

## Quality Criteria

- Seções na ordem canônica exata definida no processo.
- Índice (TOC) presente no topo do documento.
- Self-check contra quality-criteria.md com decisão por item (✅/❌) e nota.
- Todas as veto conditions globais marcadas como `pass`.
- Change log completo com versões anteriores (0.1 → 0.2 → 0.3 → 1.0).
- Handoff explícito nomeando o papel receptor.

## Veto Conditions

- Qualquer item do hard-checklist com ❌ sem que o documento seja devolvido para a task responsável (não é permitido publicar 1.0 com falhas).
- Ausência de índice, change log ou handoff nomeado.
