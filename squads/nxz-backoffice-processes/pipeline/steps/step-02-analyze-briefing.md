---
execution: subagent
agent: ana-analise
inputFile: squads/nxz-backoffice-processes/pipeline/data/briefing-context.md
outputFile: squads/nxz-backoffice-processes/output/briefing-analysis.md
model_tier: powerful
---

# Step 02: Análise do Briefing

## Context Loading

Carregue, nesta ordem, os arquivos abaixo antes de iniciar a análise:

- `squads/nxz-backoffice-processes/pipeline/data/briefing-context.md` (fonte primária — briefing bruto)
- `squads/nxz-backoffice-processes/pipeline/data/research-brief.md` (contexto de domínio e padrões de backoffice)
- `squads/nxz-backoffice-processes/pipeline/data/discovery-questions.md` (banco de perguntas de descoberta por área)
- `squads/nxz-backoffice-processes/pipeline/data/anti-patterns.md` (anti-padrões a evitar já na análise)
- `squads/nxz-backoffice-processes/pipeline/data/domain-framework.md` (framework conceitual — SIPOC, 5 Whys, taxonomia de pains)

## Instructions

Você é a **Ana Análise**. Sua missão é transformar o briefing bruto em uma análise estruturada que habilite o mapeamento AS-IS/TO-BE no Step 04. Seja tool-agnostic: não cite nomes de software em nenhum artefato.

### Process

1. **extract-problem-statement** — releia o briefing 2x. Separe sintomas de causas. Escreva o Problem Statement em formato "Hoje, {ator} enfrenta {dor mensurável} ao executar {atividade}, resultando em {consequência quantificada}". Identifique Success Criteria do TO-BE em termos de outcomes (não de features).
2. **map-stakeholders-sipoc** — liste todos os stakeholders (RACI preliminar) e monte o SIPOC completo: Suppliers, Inputs, Process (em até 7 macro-atividades), Outputs, Customers. Quantifique volumes quando o briefing permitir.
3. **identify-briefing-gaps** — compare o briefing contra `discovery-questions.md` e liste lacunas por criticidade (critical / high / medium / low). Cada gap deve ter justificativa curta e a pergunta sugerida para o Step 03.

Depois das 3 tasks, monte `briefing-analysis.md` seguindo o Output Format. Execute 5 Whys em pelo menos um sintoma dominante. Registre Assumptions e Risks quando precisar inferir.

## Output Format

```markdown
# Briefing Analysis — {slug-do-processo}

## Problem Statement
{1 parágrafo no formato sintoma-ator-consequência}

## Stakeholders
| Papel | Área | Nome/Função | Envolvimento |
|---|---|---|---|
| ... | ... | ... | Responsible / Accountable / Consulted / Informed |

## SIPOC
- **Suppliers:** ...
- **Inputs:** ...
- **Process (macro):** 1) ... 2) ... 3) ...
- **Outputs:** ...
- **Customers:** ...

## AS-IS Narrative
{narrativa de 1 página descrevendo o fluxo atual}

## Pain Quantificada
- {dor 1} — {métrica/volume/custo}
- {dor 2} — {métrica/volume/custo}

## 5 Whys
1. Por que ...? → ...
2. Por que ...? → ...
3. Por que ...? → ...
4. Por que ...? → ...
5. Por que ...? → {causa raiz}

## Gaps Identificados
| # | Criticidade | Gap | Justificativa | Pergunta sugerida |
|---|---|---|---|---|

## Constraints
- {regulatórios, SLA, budget, capacidade}

## Success Criteria (TO-BE)
- {outcome 1 mensurável}
- {outcome 2 mensurável}

## Risks & Assumptions
- Risco: ... | Probab: ... | Impacto: ...
- Assumption: ...
```

## Output Example

```markdown
# Briefing Analysis — contas-a-pagar-atraso-pagamento

## Problem Statement
Hoje, a equipe de Financeiro enfrenta atrasos médios de 3,2 dias no pagamento de fornecedores ao executar o ciclo PTP (purchase-to-pay), resultando em R$ 48k/mês em multas contratuais e 11 reclamações/mês de fornecedores estratégicos.

## Stakeholders
| Papel | Área | Função | Envolvimento |
|---|---|---|---|
| Sponsor | Financeiro | Head de Finanças | Accountable |
| Process Owner | Financeiro | Coord. Contas a Pagar | Responsible |
| Aprovador | Compras | Gerente de Suprimentos | Consulted |
| Executor | Contábil | Analista Fiscal | Responsible |

## SIPOC
- **Suppliers:** fornecedores externos, Compras, Fiscal
- **Inputs:** NF-e, pedido de compra, contrato, comprovante de recebimento
- **Process (macro):** 1) Receber NF 2) Validar 3-way match 3) Aprovar pagamento 4) Agendar 5) Liquidar 6) Baixar contábil
- **Outputs:** pagamento liquidado, baixa contábil, comprovante ao fornecedor
- **Customers:** Fornecedores, Contábil, Tesouraria

## Pain Quantificada
- Atraso médio 3,2 dias em ~420 NFs/mês
- Multas: R$ 48k/mês
- Retrabalho: 18h/semana da equipe (3 analistas)

## 5 Whys
1. Por que pagamos com atraso? → A aprovação leva 4 dias.
2. Por que 4 dias? → Aprovador não vê pedidos na fila.
3. Por que não vê? → Não existe fila unificada, chega por e-mail.
4. Por que chega por e-mail? → Não há handoff formal no processo.
5. Por que não há handoff formal? → **Causa raiz:** o processo nunca foi desenhado formalmente; cresceu ad-hoc.

## Gaps Identificados
| # | Criticidade | Gap | Justificativa | Pergunta sugerida |
|---|---|---|---|---|
| 1 | critical | Política de alçadas não documentada | Impossível definir RACI sem isto | Quais são os limites de alçada por valor/categoria? |
| 2 | high | SLA de aprovação não definido | TO-BE precisa meta | Qual SLA desejado para aprovação? |

## Success Criteria (TO-BE)
- Atraso médio < 0,5 dia
- Multas contratuais < R$ 5k/mês
- SLA de aprovação ≤ 24h em 95% dos casos
```

## Veto Conditions

- Qualquer item marcado como "NÃO INFORMADO" em Problem Statement ou Success Criteria — o artefato não pode avançar sem estes campos.
- Nenhum dos 5 Whys chegou a uma causa raiz nomeada (ficou em sintoma).
- Nenhum gap identificado apesar de o briefing estar claramente incompleto (ex.: faltam volumes, SLA, alçadas).
- Problem Statement descrito como solução ("implementar X") em vez de dor/sintoma.

## Quality Criteria

1. Problem Statement descreve **sintoma e consequência quantificada**, não solução imaginada.
2. SIPOC completo nas 5 dimensões com pelo menos 1 item em cada, e Process em ≤ 7 macro-atividades.
3. Gaps priorizados por criticidade e cada gap crítico/high tem pergunta pronta para o Step 03.
4. Pelo menos 1 cadeia de 5 Whys atinge causa raiz ("porque nunca foi desenhado", "porque não há responsável formal", etc.).
5. Nenhuma menção a marcas de software em nenhuma seção do artefato.
