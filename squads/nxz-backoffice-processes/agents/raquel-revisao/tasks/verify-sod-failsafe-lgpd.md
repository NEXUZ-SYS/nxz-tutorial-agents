---
task: verify-sod-failsafe-lgpd
order: 2
input:
  - squads/nxz-backoffice-processes/output/process-design-document.md
output:
  - governance-checks (inline, feeds task 3)
---

# Task 2 — Verify SoD, Fail-safe e LGPD

Executar três verificações específicas de governança sobre o PDD, independentemente da rubrica geral. Cada verificação produz PASS/FAIL com evidência citada. Qualquer FAIL em SoD ou FAIL crítico em LGPD é blocker automático para go-live.

## Process

1. **SoD check — pares incompatíveis.** Testar cada par de papéis incompatível no processo: (a) request / approve, (b) record / reconcile, (c) vendor-master maintenance / payment-release, (d) custody / record. Para cada par, localizar no PDD qual papel executa cada lado. Se o mesmo papel executa os dois lados do par = FAIL. Se papéis diferentes = PASS. Documentar evidência (seção/passo).
2. **Fail-safe check — exceptions com handler completo.** Listar todas as exceptions mapeadas no PDD. Para cada uma, verificar 4 elementos obrigatórios: (1) trigger definido (quando essa exceção dispara), (2) handler definido (quem trata), (3) SLA definido (em quanto tempo), (4) rollback ou escalation path definido (o que acontece se o handler não resolver). Faltando qualquer elemento = FAIL para aquela exceção.
3. **LGPD check — campos de dado pessoal.** Identificar no PDD cada campo de dado pessoal tocado (nome, CPF, e-mail, telefone, endereço, dados bancários, etc.). Para cada campo, verificar 3 elementos: (1) base legal declarada (execução de contrato, consentimento, obrigação legal, etc.), (2) retenção definida (quanto tempo), (3) fluxo de direitos do titular em até 15 dias desenhado. Faltando qualquer elemento em campo com dado pessoal = FAIL (crítico se for CPF, dados bancários ou dado sensível).
4. **Compilar decisão de go-live.** Se qualquer par SoD retornou FAIL, ou qualquer campo LGPD crítico retornou FAIL, a decisão de go-live = BLOCK. Se fail-safe retornou FAIL em exceções não-críticas, pode virar condição (non-blocking para o veredito final, dependendo do contexto).

## Output Format

```yaml
governance_checks:
  sod_check:
    pairs_tested:
      - pair: string (ex.: "request / approve")
        role_side_a: string
        role_side_b: string
        result: PASS | FAIL
        evidence: string
    overall: PASS | FAIL
  failsafe_check:
    exceptions:
      - id: string
        trigger_defined: true | false
        handler_defined: true | false
        sla_defined: true | false
        rollback_defined: true | false
        result: PASS | FAIL
        evidence: string
    overall: PASS | FAIL
  lgpd_check:
    personal_data_fields:
      - field: string
        sensitive: true | false
        legal_basis_defined: true | false
        retention_defined: true | false
        rights_flow_defined: true | false
        result: PASS | FAIL
        evidence: string
    overall: PASS | FAIL | PARTIAL
  go_live_decision: PASS | BLOCK
  block_reasons: [list of strings]
```

## Output Example

```yaml
governance_checks:
  sod_check:
    pairs_tested:
      - pair: "request / approve"
        role_side_a: "Analista de Compras (request)"
        role_side_b: "Gerente Financeiro (approve)"
        result: PASS
        evidence: "Seção 7 RACI atribui request a Compras e approve a Financeiro."
      - pair: "record / reconcile"
        role_side_a: "Analista Financeiro (record)"
        role_side_b: "Analista de Tesouraria (reconcile)"
        result: PASS
        evidence: "Seção 4.1 registra, seção 5.3 reconcilia — papéis distintos."
      - pair: "vendor-master maintenance / payment-release"
        role_side_a: "Analista Financeiro"
        role_side_b: "Analista Financeiro"
        result: FAIL
        evidence: "Seção 3.1 e seção 6.2 atribuem ambos os lados ao mesmo papel — violação clássica."
      - pair: "custody / record"
        role_side_a: "Tesouraria (custody)"
        role_side_b: "Financeiro (record)"
        result: PASS
        evidence: "Seção 6 separa liquidação (tesouraria) de lançamento (financeiro)."
    overall: FAIL
  failsafe_check:
    exceptions:
      - id: "E1 — fornecedor não cadastrado"
        trigger_defined: true
        handler_defined: false
        sla_defined: false
        rollback_defined: false
        result: FAIL
        evidence: "Seção 6.2 cita a exceção mas só diz 'escalar para coordenação' — sem handler nominal nem SLA."
      - id: "E2 — divergência de valor no boleto"
        trigger_defined: true
        handler_defined: true
        sla_defined: true
        rollback_defined: true
        result: PASS
        evidence: "Seção 6.3 define trigger, handler (tesouraria sênior), SLA 4h úteis e rollback (reter pagamento)."
      - id: "E3 — aprovação fora do horário"
        trigger_defined: true
        handler_defined: true
        sla_defined: false
        rollback_defined: true
        result: FAIL
        evidence: "Seção 6.4 não define SLA — só 'tratar no próximo dia útil' sem prazo claro."
    overall: FAIL
  lgpd_check:
    personal_data_fields:
      - field: "CPF do fornecedor PJ-MEI"
        sensitive: false
        legal_basis_defined: true
        retention_defined: true
        rights_flow_defined: false
        result: FAIL
        evidence: "Seção 10.1 declara base legal e retenção de 5 anos, mas fluxo de direitos em 15d ausente."
      - field: "Dados bancários do fornecedor"
        sensitive: true
        legal_basis_defined: true
        retention_defined: true
        rights_flow_defined: false
        result: FAIL
        evidence: "Mesmo gap — campo sensível sem fluxo de direitos do titular."
    overall: FAIL
  go_live_decision: BLOCK
  block_reasons:
    - "SoD violation em vendor-master / payment-release (mesmo papel executa os dois lados)."
    - "LGPD crítico — ausência de fluxo de direitos do titular para CPF e dados bancários."
```

## Quality Criteria

- Todos os 4 pares SoD testados, mesmo que o processo à primeira vista não os envolva — evidência negativa também é evidência.
- Toda exception do PDD incluída no fail-safe check, nenhuma omitida.
- Todo campo de dado pessoal identificado listado no LGPD check, com marcação de sensibilidade (sensitive: true para CPF, bancários, saúde, etc.).
- `go_live_decision` derivado mecanicamente das regras: qualquer SoD FAIL → BLOCK; qualquer LGPD crítico FAIL → BLOCK.

## Veto Conditions

- Algum par SoD não testado por "parecer óbvio que está ok" — re-fazer com evidência explícita antes de prosseguir.
- Campo de dado pessoal identificado mas não analisado nas 3 sub-checks (base legal, retenção, direitos) — completar análise antes de fechar o check.
