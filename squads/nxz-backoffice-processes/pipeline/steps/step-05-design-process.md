---
execution: inline
agent: paula-processo
inputFile: squads/nxz-backoffice-processes/output/process-flow.md
outputFile: squads/nxz-backoffice-processes/output/process-design-document.md
---

# Step 05: Desenho Final do Processo (PDD)

## Context Loading

Carregue, nesta ordem:

- `squads/nxz-backoffice-processes/output/process-flow.md` (AS-IS/TO-BE e traceability — fonte primária)
- `squads/nxz-backoffice-processes/output/briefing-analysis.md` (problem statement, stakeholders, success criteria)
- `squads/nxz-backoffice-processes/pipeline/data/briefing-gaps-resolved.md` (respostas e assumptions)
- `squads/nxz-backoffice-processes/pipeline/data/raci-guide.md` (regras RACI — 1 A por atividade, sem ausência de R)
- `squads/nxz-backoffice-processes/pipeline/data/kpi-design-guide.md` (KPIs SMART com target + fonte + frequência)
- `squads/nxz-backoffice-processes/pipeline/data/quality-criteria.md` (checklist final de qualidade do PDD)
- `squads/nxz-backoffice-processes/pipeline/data/output-examples.md` (exemplos de PDDs anteriores)
- `squads/nxz-backoffice-processes/pipeline/data/anti-patterns.md` (armadilhas: brand, RACI inválido, KPI sem fonte)

## Instructions

Você é a **Paula Processo**. Produza o `process-design-document.md` — o artefato final que será revisado no Step 07 e aprovado no Step 08. É um documento de governança, tool-agnostic, pronto para publicação como procedimento oficial.

### Process

1. **draft-pdd-scaffold** — monte o esqueleto com todas as seções do template Output Format. Preencha Cover (versão, data, owner, audiência), Purpose & Scope (dentro/fora de escopo), e reimporte o Swimlane TO-BE do process-flow.md sem perder fidelidade.
2. **fill-raci-rules** — construa a matriz RACI por atividade: 1 A por atividade (nunca 2), pelo menos 1 R, C e I conforme necessidade. Em seguida documente as Business Rules (alçadas, prazos, políticas, dependências). Valide contra `raci-guide.md`.
3. **define-kpis-risks-controls** — crie pelo menos 3 KPIs SMART (cada um com nome, fórmula, target, fonte, frequência, dono), SLAs vinculados a atividades, Risk & Control Matrix (risco → controle → tipo preventivo/detectivo/corretivo → frequência), e Exceções com dono e SLA. Consulte `kpi-design-guide.md`.
4. **assemble-final-pdd** — preencha Inputs/Outputs, LGPD (dados pessoais tratados + base legal LGPD + retenção + direitos do titular), Glossary e Change Log. Rode o self-check contra `quality-criteria.md` — somente declare pronto se 100% dos itens passarem. Se algo falhar, corrija antes de encerrar.

## Output Format

```markdown
# Process Design Document — {Nome do Processo}

## Cover
- Versão: v0.1 (draft)
- Data: {ISO}
- Process Owner: {papel}
- Audiência: {Lideranças Nexuz | BPO | Cliente externo | Misto}
- Status: DRAFT

## 1. Purpose & Scope
- Propósito: ...
- Dentro do escopo: ...
- Fora do escopo: ...

## 2. Swimlane TO-BE
{reimportado de process-flow.md — raias, gateways, exceções}

## 3. RACI
| Atividade | R | A | C | I |
|---|---|---|---|---|

## 4. Inputs / Outputs
| Tipo | Nome | Origem/Destino | Critério de aceite |
|---|---|---|---|

## 5. Business Rules
- BR1: ...
- BR2: ...

## 6. KPIs
| KPI | Fórmula | Target | Fonte | Frequência | Dono |
|---|---|---|---|---|---|

## 7. SLAs
| Atividade | SLA | Gatilho de violação | Escalonamento |
|---|---|---|---|

## 8. Risk & Control Matrix
| Risco | Probab | Impacto | Controle | Tipo | Frequência | Dono |
|---|---|---|---|---|---|---|

## 9. Exceções
| # | Nome | Gatilho | Tratamento | Dono | SLA |
|---|---|---|---|---|---|

## 10. LGPD
- Dados pessoais tratados: ...
- Base legal: ...
- Retenção: ...
- Direitos do titular: ...

## 11. Glossary
- Termo → definição

## 12. Change Log
| Versão | Data | Autor | Mudança |
|---|---|---|---|
| v0.1 | {ISO} | Paula Processo | Draft inicial |
```

## Output Example

```markdown
# Process Design Document — Contas a Pagar (PTP)

## Cover
- Versão: v0.1 (draft)
- Data: 2026-04-16
- Process Owner: Coord. Contas a Pagar
- Audiência: Lideranças Nexuz + BPO
- Status: DRAFT

## 1. Purpose & Scope
- Propósito: padronizar o ciclo PTP reduzindo atraso médio para <0,5d e multas para <R$5k/mês.
- Dentro: recebimento de NF, validação 3-way, aprovação por alçada, liquidação, baixa contábil.
- Fora: cadastro de fornecedor, negociação comercial, conciliação bancária mensal.

## 3. RACI (extrato)
| Atividade | R | A | C | I |
|---|---|---|---|---|
| Validar 3-way match | Analista Fiscal | Coord. CAP | Compras | Fornecedor |
| Aprovar por alçada | Aprovador da faixa | Head Finanças | Compliance | Tesouraria |
| Liquidar pagamento | Analista Tesouraria | Coord. Tesouraria | — | Fornecedor, Contábil |

## 6. KPIs
| KPI | Fórmula | Target | Fonte | Frequência | Dono |
|---|---|---|---|---|---|
| Atraso médio de pagamento | Σ(data_pag − data_vencto) / NFs pagas | ≤ 0,5d | Relatório CAP | Semanal | Coord. CAP |
| % aprovações dentro do SLA | aprovações ≤24h / total | ≥ 95% | Fila de aprovação | Semanal | Head Finanças |
| Multas contratuais | Σ multas pagas | ≤ R$5k/mês | Contábil | Mensal | Head Finanças |

## 8. Risk & Control Matrix (extrato)
| Risco | P | I | Controle | Tipo | Frequência | Dono |
|---|---|---|---|---|---|---|
| Aprovação fora de alçada | Média | Alta | Validação automática de faixa | Preventivo | Por NF | Coord. CAP |
| Fraude em cadastro de fornecedor | Baixa | Crítica | Segregação cadastro × aprovação (SoD) | Preventivo | Contínuo | Compliance |

## 10. LGPD
- Dados pessoais tratados: CPF de representantes PF, dados bancários.
- Base legal: execução de contrato (Art. 7º, V).
- Retenção: 5 anos após término contratual.
- Direitos do titular: acesso, correção, portabilidade mediante solicitação ao DPO.
```

## Veto Conditions

- Qualquer brand name em qualquer seção do PDD.
- RACI inválido: atividade sem A, atividade com 2+ As, atividade sem nenhum R.
- KPI sem target numérico, sem fonte nomeada ou sem frequência.
- Dado pessoal listado na seção LGPD sem base legal correspondente.
- Swimlane TO-BE divergente do process-flow.md (perda de fidelidade).
- Self-check contra `quality-criteria.md` com qualquer item pendente.

## Quality Criteria

1. Tool-agnostic em 100% do documento — nenhum nome de software.
2. RACI segue raci-guide.md: 1 A único por atividade, ≥1 R, sem "papéis genéricos".
3. KPIs são SMART: cada um tem fórmula, target numérico, fonte, frequência e dono nomeado.
4. Risk & Control Matrix cobre pelo menos 3 riscos, com SoD (segregation of duties) documentada para ao menos 1 controle crítico.
5. LGPD completo: dados, base legal, retenção e direitos — sem campos em branco se dados pessoais forem tratados.
6. Swimlane TO-BE consistente com process-flow.md (mesmas raias, gateways e exceções).
