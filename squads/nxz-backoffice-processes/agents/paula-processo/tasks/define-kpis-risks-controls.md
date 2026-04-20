---
id: "squads/nxz-backoffice-processes/agents/paula-processo/tasks/define-kpis-risks-controls"
name: "Define KPIs, SLAs, Risks, Controls, Exceptions & LGPD"
order: 3
owner: paula-processo
inputs:
  - output/process-design-document.md (após fill-raci-rules)
  - pipeline/data/kpi-design-guide.md
outputs:
  - output/process-design-document.md (com KPIs, SLAs, matriz de risco, exceções e LGPD)
---

# Define KPIs, SLAs, Risks, Controls, Exceptions & LGPD

## Objective

Fechar as seções de medição, risco, controle, exceção e proteção de dados. Depois desta task, o PDD está semanticamente completo — falta apenas montagem final.

## Process

1. **Definir KPIs SMART.** Escolher 3–5 indicadores alinhados com o propósito. Para cada: nome, definição, fórmula, baseline atual, target, threshold de alerta, owner, data source (capability), cadência, ação em caso de breach.
2. **Definir SLAs por atividade crítica.** Atividades com impacto direto em prazo externo (fornecedor, cliente, fisco) recebem SLA em horas úteis ou dias corridos, com owner e ação em caso de breach.
3. **Construir Risk & Control Matrix.** Para cada risco: descrição, likelihood (baixa/média/alta), impacto (baixo/médio/alto), inherent risk, controles (preventivo e detectivo quando aplicável), owner do controle, frequência, evidência esperada, residual risk.
4. **Redigir Exception & Escalation Playbook.** Mínimo três cenários EX-01, EX-02, EX-03. Cada um: trigger, handler (papel), max response time, resolution criteria, logging obrigatório.
5. **Preencher seção LGPD.** Listar cada dado pessoal tocado pelo processo, base legal (art. 7º/11 da LGPD), finalidade, retenção, compartilhamento, fluxo de atendimento a direitos do titular em até 15 dias, encarregado (DPO) nomeado por papel.
6. **Atualizar change log.** Versão incrementa para `0.3-draft`.

## Output Format

```yaml
kpis:
  - id: KPI-01
    name: string
    formula: string
    baseline: number+unit
    target: number+unit
    threshold: number+unit
    owner_role: string
    data_source_capability: string
    cadence: string
    action_on_breach: string
slas:
  - activity: A-nn
    sla: string
    owner_role: string
    action_on_breach: string
risk_control_matrix:
  - risk_id: R-01
    description: string
    likelihood: low|medium|high
    impact: low|medium|high
    controls:
      - type: preventive|detective|corrective
        description: string
        owner_role: string
        frequency: string
        evidence: string
    residual_risk: low|medium|high
exceptions:
  - id: EX-01
    trigger: string
    handler_role: string
    max_response: string
    resolution_criteria: string
    logging: string
lgpd:
  - data_field: string
    legal_basis: string
    purpose: string
    retention: string
    sharing: string
  data_subject_rights_flow: string
  dpo_role: string
```

## Output Example

```markdown
## KPIs — Contas a Pagar
- KPI-01 Pontualidade de Pagamento: (pagamentos dentro do vencimento / total) × 100. Baseline 87%, target ≥ 98%, threshold < 95%. Owner: Controller. Data source: capability de pagamentos. Cadência: mensal. Breach: plano de ação em 5 dias úteis.
- KPI-02 Prazo Médio de Aprovação (A-02→A-03): em horas úteis. Baseline 22h, target ≤ 8h, threshold > 12h. Owner: Coordenador CAP. Cadência: semanal.
- KPI-03 Taxa de Divergência em Conciliação: (linhas com divergência / linhas conciliadas) × 100. Baseline 4,2%, target ≤ 1%, threshold > 2%. Owner: Analista Contábil. Cadência: mensal.
- KPI-04 Retrabalho por NF rejeitada: NFs que retornam para A-02. Baseline 11%, target ≤ 4%. Owner: Analista CAP. Cadência: quinzenal.

## SLAs
| Atividade | SLA | Owner | Ação em breach |
|-----------|-----|-------|----------------|
| A-02 Validar NF | 4h úteis | Analista CAP | Escalar para Coordenador |
| A-03 Aprovar pagamento | 1 dia útil | Coordenador CAP | Acionar Controller |
| A-05 Conciliar pagamento | D+2 do pagamento | Analista Contábil | Abrir EX-02 |

## Risk & Control Matrix
- R-01 Pagamento duplicado. Likelihood: média. Impacto: alto. Controle preventivo: bloqueio automático por número de NF já pago (capability de deduplicação), owner Tesoureiro, por evento, evidência em log. Controle detectivo: relatório semanal de pagamentos duplicados, owner Controller, semanal, evidência arquivada no repositório de conciliação. Residual: baixo.
- R-02 Fraude em cadastro de fornecedor. Likelihood: baixa. Impacto: alto. Controle preventivo: aprovação em quatro olhos para novos fornecedores, owner Compras + Controller, por evento. Controle detectivo: auditoria trimestral de novos cadastros, owner Auditoria Interna. Residual: baixo.
- R-03 Vazamento de dados pessoais de fornecedor PF. Likelihood: média. Impacto: alto. Preventivo: acesso por perfil mínimo, owner DPO. Detectivo: revisão trimestral de acessos. Residual: médio.

## Exceptions Playbook
- EX-01 NF não bate com pedido. Trigger: BR-001 falha. Handler: Analista CAP sênior. Max response: 4h úteis. Resolution: NF corrigida ou devolvida com justificativa. Logging: registrar no repositório documental com motivo.
- EX-02 Divergência em conciliação > R$ 100. Trigger: BR-005. Handler: Analista Contábil. Max response: 1 dia útil. Resolution: ajuste contábil ou devolução ao Tesoureiro. Logging: nota de conciliação assinada.
- EX-03 Aprovação fora de alçada. Trigger: BR-002/BR-003 sem quem aprove disponível. Handler: Controller. Max response: 2h úteis. Resolution: aprovação substituta ou adiamento formal. Logging: registro de exceção de alçada.

## LGPD
- Dados pessoais tocados: nome do fornecedor PF, CPF, endereço, e-mail, dados bancários.
- Base legal: execução de contrato (art. 7º, V) para fornecedores PF; obrigação legal (art. 7º, II) para retenção fiscal.
- Retenção: 5 anos após o último pagamento, por exigência fiscal.
- Compartilhamento: somente com instituições financeiras envolvidas no pagamento e autoridades fiscais.
- Direitos do titular: solicitação por canal oficial, resposta em até 15 dias, tratada pelo encarregado (DPO).
- Encarregado (DPO): Gerente de Compliance.
```

## Quality Criteria

- 3–5 KPIs, todos SMART com os nove campos obrigatórios preenchidos.
- SLA definido para toda atividade crítica identificada no fluxo.
- Todo risco com likelihood × impacto ≥ médio tem controle preventivo mapeado.
- Mínimo três exceções documentadas (EX-01, EX-02, EX-03) com os cinco campos obrigatórios.
- Seção LGPD completa com base legal, retenção, compartilhamento, fluxo de direitos do titular em 15 dias e DPO nomeado.

## Veto Conditions

- Qualquer KPI sem baseline numérico ou sem target.
- Risco alto sem controle preventivo.
- Seção LGPD genérica (sem listar campos pessoais reais do processo).
- Exceção sem handler ou sem max response time.
