---
task: score-rubric
order: 1
input:
  - squads/nxz-backoffice-processes/output/process-design-document.md
  - squads/nxz-backoffice-processes/pipeline/data/quality-criteria.md
output:
  - rubric-scoring-table (inline, feeds task 3)
---

# Task 1 — Score Rubric

Aplicar a rubrica oficial de 10 dimensões ao Process Design Document (PDD) produzido por Paula Processo. Cada dimensão recebe nota 0, 1 ou 2 com justificativa de 1-2 frases citando evidência direta do PDD (seção, passo ou trecho literal). Nota total entregue como X / 20.

## Process

1. **Carregar a rubrica oficial.** Ler `pipeline/data/quality-criteria.md` para confirmar as 10 dimensões vigentes, a definição de cada nota (0 = ausente, 1 = parcial, 2 = completo) e eventuais regras específicas por dimensão (ex.: Compliance/LGPD exige base legal + retenção + fluxo de direitos para nota 2).
2. **Walkthrough completo do PDD.** Ler o PDD do início ao fim antes de pontuar — incluindo fluxo principal, exceções, RACI, KPIs, anexos. Pontuar sem ter lido o documento inteiro gera nota enviesada.
3. **Pontuar cada dimensão com evidência.** Para cada uma das 10 dimensões, atribuir 0/1/2 e escrever justificativa curta. Nota abaixo de 2 exige citação (seção X.Y, passo Z, ou quote). Nota 2 pode citar a evidência positiva mas não é obrigatório.
4. **Somar total e registrar dimensões de atenção.** Calcular total /20. Listar separadamente dimensões com nota 0 (ausentes) e dimensões com nota 1 (parciais) — essa lista alimenta a task 3 (generate-verdict).
5. **Passar saída para a próxima task.** A tabela completa é input para a task 3 (generate-verdict) e será embutida no review-verdict.md final.

## Output Format

```yaml
rubric_scoring:
  process_name: string
  pdd_version: string
  reviewed_at: ISO-8601
  dimensions:
    - name: Clarity
      score: 0 | 1 | 2
      evidence: "citação direta ou referência seção/passo"
    - name: Completeness
      score: 0 | 1 | 2
      evidence: string
    - name: Coherence
      score: 0 | 1 | 2
      evidence: string
    - name: Feasibility
      score: 0 | 1 | 2
      evidence: string
    - name: Controls
      score: 0 | 1 | 2
      evidence: string
    - name: Measurability
      score: 0 | 1 | 2
      evidence: string
    - name: Auditability
      score: 0 | 1 | 2
      evidence: string
    - name: Exception handling
      score: 0 | 1 | 2
      evidence: string
    - name: Compliance/LGPD
      score: 0 | 1 | 2
      evidence: string
    - name: Ownership & Governance
      score: 0 | 1 | 2
      evidence: string
  total: integer / 20
  dimensions_at_zero: [list of dimension names]
  dimensions_at_one: [list of dimension names]
```

## Output Example

```yaml
rubric_scoring:
  process_name: "Contas a Pagar — Lançamento a Liquidação"
  pdd_version: "v1.2"
  reviewed_at: "2026-04-16T14:30:00-03:00"
  dimensions:
    - name: Clarity
      score: 2
      evidence: "Seção 2 (Fluxo Principal) usa verbos de ação em cada passo e define gatilho e saída por etapa."
    - name: Completeness
      score: 2
      evidence: "Cobre lançamento, aprovação, agendamento, liquidação e conciliação — seções 2 a 6 completas."
    - name: Coherence
      score: 1
      evidence: "Seção 4.3 cita 'analista de tesouraria' enquanto RACI na seção 7 lista 'tesouraria júnior' — divergência de papel."
    - name: Feasibility
      score: 2
      evidence: "Volumes declarados (seção 1.3, ~420 títulos/mês) compatíveis com carga descrita para o time de 2 pessoas."
    - name: Controls
      score: 1
      evidence: "Passo 3.2 tem controle preventivo (validação de fornecedor ativo) mas não tem controle detectivo pareado — ausência de reconciliação periódica de cadastro."
    - name: Measurability
      score: 1
      evidence: "KPI 'tempo médio de aprovação' declarado (seção 8) sem baseline numérica atual — marcado como 'a medir'."
    - name: Auditability
      score: 2
      evidence: "Seção 9 define audit trail por evento (lançamento, aprovação, pagamento) com retenção de 5 anos."
    - name: Exception handling
      score: 1
      evidence: "Três exceções mapeadas (seção 6), mas exceção 6.2 (fornecedor não cadastrado no momento do lançamento) não define handler — só escala para 'coordenação'."
    - name: Compliance/LGPD
      score: 1
      evidence: "Base legal declarada (seção 10.1, execução de contrato) e retenção definida, mas fluxo de direitos do titular em até 15 dias não está desenhado."
    - name: Ownership & Governance
      score: 2
      evidence: "Seção 7 define process owner (gerente financeiro), deputy e cadência de revisão trimestral."
  total: 15 / 20
  dimensions_at_zero: []
  dimensions_at_one: [Coherence, Controls, Measurability, Exception handling, Compliance/LGPD]
```

## Quality Criteria

- Todas as 10 dimensões pontuadas — nenhuma pulada ou marcada como "N/A".
- Toda nota abaixo de 2 acompanha citação direta do PDD (seção/passo/quote).
- Total calculado e conferido contra a soma individual das dimensões.
- Listas `dimensions_at_zero` e `dimensions_at_one` produzidas — alimentam a task 3.

## Veto Conditions

- PDD não lido por completo antes de pontuar (ex.: faltou ler seção de exceções) — re-fazer walkthrough antes de emitir notas.
- Nota abaixo de 2 sem citação de evidência — dimensão precisa ser re-pontuada com referência ao PDD, ou solicitar clarificação a Paula Processo antes de fechar a rubrica.
