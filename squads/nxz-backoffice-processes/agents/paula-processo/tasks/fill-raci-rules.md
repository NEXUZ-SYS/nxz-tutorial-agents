---
id: "squads/nxz-backoffice-processes/agents/paula-processo/tasks/fill-raci-rules"
name: "Fill RACI & Business Rules"
order: 2
owner: paula-processo
inputs:
  - output/process-design-document.md (scaffold)
  - output/process-flow.md
  - pipeline/data/raci-guide.md
outputs:
  - output/process-design-document.md (com RACI + regras + inputs/outputs + SoD check)
---

# Fill RACI & Business Rules

## Objective

Preencher as seções de RACI, regras de negócio, inputs/outputs por atividade e executar o SoD check. Esta task transforma o scaffold em um PDD "operacionalmente testável".

## Process

1. **Mapear papéis.** A partir do swimlane, listar todos os papéis envolvidos (nunca pessoas nominais, sempre cargos/funções). Validar contra `pipeline/data/raci-guide.md`.
2. **Montar matriz RACI.** Para cada atividade A-nn, atribuir R, A, C, I. Regra dura: exatamente um A por atividade, no mínimo um R. Se surgir conflito, escalar para process owner antes de fechar.
3. **Registrar regras de negócio.** Para cada decisão/gate no fluxo, escrever uma BR-nnn no formato IF <condição> THEN <ação> ELSE <ação alternativa>. Atômicas, sem "e/ou" composto. Cada BR linkada à atividade ou gate correspondente.
4. **Preencher tabela de inputs/outputs.** Por atividade: input artifact, source (sistema de origem descrito por capability), output artifact, destination. Sem marca, só capability.
5. **Rodar SoD check.** Para cada par crítico (request/approve, record/reconcile, vendor-master/payment-release), verificar se o mesmo papel aparece em ambos. Se sim, registrar violação e propor mitigação.
6. **Atualizar change log.** Versão incrementa para `0.2-draft`. Anotar o que foi preenchido.

## Output Format

```yaml
raci:
  - activity: A-01
    r: [role]
    a: role
    c: [role]
    i: [role]
business_rules:
  - id: BR-001
    linked_to: A-02 / G-01
    rule: "IF ... THEN ... ELSE ..."
inputs_outputs:
  - activity: A-01
    input_artifact: string
    source_capability: string
    output_artifact: string
    destination_capability: string
sod_check:
  - pair: "request / approve"
    status: ok | violation
    mitigation: string | null
```

## Output Example

```markdown
## RACI — Contas a Pagar
| Atividade | R | A | C | I |
|-----------|---|---|---|---|
| A-01 Receber NF | Analista CAP | Coordenador CAP | Fiscal | Controller |
| A-02 Validar dados fiscais | Analista CAP | Coordenador CAP | Fiscal | — |
| A-03 Aprovar pagamento | Coordenador CAP | Controller | — | CFO |
| A-04 Agendar pagamento | Tesoureiro | Controller | Coordenador CAP | — |
| A-05 Conciliar pagamento | Analista Contábil | Controller | Tesoureiro | — |

## Regras de Negócio
- BR-001 (A-02/G-01): IF dados da NF batem com pedido de compra THEN seguir para A-03 ELSE disparar EX-01.
- BR-002 (A-03): IF valor ≤ R$ 50.000 THEN Coordenador CAP aprova ELSE escalar para Controller.
- BR-003 (A-03): IF valor > R$ 200.000 THEN exigir aprovação dupla (Controller + CFO).
- BR-004 (A-04): IF fornecedor sem cadastro completo THEN bloquear agendamento ELSE prosseguir.
- BR-005 (A-05): IF divergência entre extrato e pagamento > R$ 100 THEN abrir EX-02.

## Inputs / Outputs
| Atividade | Input | Source (capability) | Output | Destination (capability) |
|-----------|-------|---------------------|--------|--------------------------|
| A-01 | NF-e XML | canal fiscal autorizado | Registro de NF recebida | repositório documental auditável |
| A-02 | NF + Pedido | repositório de pedidos | Validação fiscal | trilha de auditoria |
| A-03 | Validação + alçada | matriz de alçadas | Aprovação formalizada | fila de pagamentos |
| A-04 | Aprovação | fila de pagamentos | Ordem de pagamento | capability bancária |
| A-05 | Extrato bancário | capability bancária | Conciliação assinada | livro contábil |

## SoD Check
- request (A-01) / approve (A-03): ok — papéis distintos.
- record (A-05) / reconcile (A-05): violação — mesmo papel executa. Mitigação: segregar conciliação para segundo analista contábil com revisão do Controller.
- vendor-master / payment-release: ok — cadastro de fornecedor pertence ao Compras, liberação ao Tesoureiro.
```

## Quality Criteria

- Exatamente um A por atividade; pelo menos um R por atividade; nenhuma célula vazia obrigatória.
- Toda decisão/gate do swimlane tem ao menos uma BR correspondente.
- Regras atômicas: uma condição por BR, sem composição "e/ou" implícita.
- Tabela de inputs/outputs cobre 100% das atividades.
- SoD check documentado para os três pares obrigatórios, com mitigação nomeada em caso de violação.

## Veto Conditions

- Qualquer atividade com duas letras A ou nenhuma A.
- Regra de negócio sem ELSE explícito quando existe caminho alternativo no fluxo.
- SoD check ausente ou incompleto (menos de três pares avaliados).
- Papel descrito por nome de pessoa em vez de cargo/função.
