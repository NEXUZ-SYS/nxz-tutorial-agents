---
id: "squads/nxz-backoffice-processes/agents/paula-processo/tasks/draft-pdd-scaffold"
name: "Draft PDD Scaffold"
order: 1
owner: paula-processo
inputs:
  - output/briefing-analysis.md
  - output/process-flow.md
outputs:
  - output/process-design-document.md (scaffold version)
---

# Draft PDD Scaffold

## Objective

Criar o esqueleto do Process Design Document já com as seções "cabeça" 100% preenchidas (cover block, propósito, escopo, swimlane narrativo, glossário) e as demais seções marcadas com placeholders explícitos, prontas para as tasks seguintes.

## Process

1. **Ler entradas.** Abrir `output/briefing-analysis.md` e `output/process-flow.md`. Extrair: nome do processo, process owner candidato, áreas envolvidas, atividades, decisões, gates, termos de domínio recorrentes.
2. **Preencher cover block.** Definir Process ID (formato `PRC-<sigla>-<nn>`), versão `0.1-draft`, data, process owner nomeado por papel, cadência de revisão (default: semestral), status `draft`.
3. **Redigir propósito e escopo.** Uma frase de propósito (o que o processo entrega e para quem) + escopo `in-scope` e `out-of-scope` em bullets curtos. Nada de jargão vazio.
4. **Importar swimlane narrativo.** Copiar o fluxo textual de `process-flow.md` para a seção "Swimlane Narrativo", preservando numeração de atividades (A-01, A-02 …) e gates (G-01, G-02 …).
5. **Montar glossário inicial.** Extrair 5–12 termos de domínio que aparecem no briefing e no flow; definir cada termo em uma linha.
6. **Inserir placeholders.** Para RACI, regras, inputs/outputs, KPIs, SLAs, riscos, exceções, LGPD e change log, inserir cabeçalho da seção + bloco `> TODO — preenchido por <task>` nomeando a task responsável.
7. **Salvar.** Gravar em `output/process-design-document.md` com o sufixo interno `scaffold` no change log.

## Output Format

```yaml
document:
  process_id: string            # ex.: PRC-CAP-01
  process_name: string
  version: "0.1-draft"
  date: YYYY-MM-DD
  process_owner_role: string
  review_cadence: string
  status: "draft"
sections:
  cover: filled
  purpose_scope: filled
  swimlane_narrative: imported_from_process_flow
  glossary: filled
  raci: placeholder
  inputs_outputs: placeholder
  business_rules: placeholder
  kpis: placeholder
  slas: placeholder
  risk_control_matrix: placeholder
  exceptions_playbook: placeholder
  lgpd: placeholder
  change_log: seeded
```

## Output Example

```markdown
# PDD — Contas a Pagar (PRC-CAP-01)

## Cover
- Process ID: PRC-CAP-01
- Versão: 0.1-draft
- Data: 2026-04-16
- Process Owner: Coordenador de Backoffice Financeiro
- Cadência de revisão: semestral
- Status: draft

## Propósito
Garantir que obrigações com fornecedores sejam registradas, aprovadas e pagas dentro do prazo contratado, com trilha de auditoria e segregação de função.

## Escopo
In-scope: recebimento de nota fiscal de fornecedor, validação fiscal, aprovação, agendamento de pagamento, conciliação.
Out-of-scope: folha de pagamento, reembolso de despesas de viagem, impostos retidos na fonte de serviços internacionais.

## Swimlane Narrativo
A-01 Analista de Contas a Pagar recebe nota fiscal via canal oficial.
A-02 Analista valida dados fiscais contra pedido de compra.
G-01 Nota bate com pedido? Sim → A-03. Não → EX-01.
A-03 Coordenador aprova pagamento dentro da alçada.
...

## Glossário
- Nota fiscal de entrada: documento fiscal eletrônico emitido pelo fornecedor.
- Alçada: valor máximo que um papel pode aprovar sem escalação.
- Conciliação: comparação entre pagamento efetuado e extrato bancário.

## RACI
> TODO — preenchido por fill-raci-rules.md

## Regras de Negócio
> TODO — preenchido por fill-raci-rules.md

## KPIs / SLAs / Riscos / Exceções / LGPD
> TODO — preenchido por define-kpis-risks-controls.md

## Change Log
- 0.1-draft (2026-04-16) — scaffold inicial por Paula Processo.
```

## Quality Criteria

- Cover block 100% preenchido (nenhum campo em branco).
- Propósito em uma única frase com verbo de entrega ("garantir", "assegurar", "registrar").
- Escopo com in-scope e out-of-scope explícitos.
- Swimlane narrativo importado com numeração preservada (A-nn, G-nn).
- Glossário com pelo menos 5 termos.
- Todas as seções futuras marcadas com placeholder `> TODO — preenchido por <task>`.

## Veto Conditions

- Process ID ausente ou fora do padrão `PRC-<sigla>-<nn>`.
- Escopo sem `out-of-scope` definido (Paula rejeita PDDs "abertos").
- Swimlane narrativo copiado sem numeração de atividades/gates.
- Qualquer menção a nome de marca ou produto de software no scaffold.
