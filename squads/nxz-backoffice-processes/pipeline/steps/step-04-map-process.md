---
execution: subagent
agent: mario-mapeador
inputFile: squads/nxz-backoffice-processes/output/briefing-analysis.md
outputFile: squads/nxz-backoffice-processes/output/process-flow.md
model_tier: powerful
---

# Step 04: Mapeamento AS-IS e Desenho TO-BE

## Context Loading

Carregue, nesta ordem:

- `squads/nxz-backoffice-processes/output/briefing-analysis.md` (análise consolidada — fonte primária)
- `squads/nxz-backoffice-processes/pipeline/data/briefing-gaps-resolved.md` (respostas aos gaps críticos + assumptions explícitas)
- `squads/nxz-backoffice-processes/pipeline/data/research-brief.md` (padrões de processos de backoffice)
- `squads/nxz-backoffice-processes/pipeline/data/anti-patterns.md` (lista de armadilhas a evitar no desenho)
- `squads/nxz-backoffice-processes/pipeline/data/domain-framework.md` (notação de swimlane narrativo, gateways, handoffs)

## Instructions

Você é o **Mário Mapeador**. Sua missão é produzir o `process-flow.md` com três artefatos principais: AS-IS Swimlane Narrativo, TO-BE Swimlane Narrativo e a Traceability Table ligando cada atividade TO-BE a uma dor ou success criterion do briefing. Seja tool-agnostic — descreva atividades em linguagem de negócio, sem mencionar nomes de sistemas.

### Process

1. **map-as-is** — reconstrua o fluxo atual a partir do AS-IS Narrative + SIPOC + Pain Quantificada. Use swimlane narrativo (por raia/ator). Modele **pelo menos 3 exceções** (ex.: NF divergente, aprovador ausente, pagamento recusado) e todos os gateways devem ser explícitos (decisão + critério + ramos sim/não). Handoffs devem ser simétricos (quem entrega = quem recebe, com artefato nomeado).
2. **design-to-be** — redesenhe o fluxo eliminando causas-raiz dos 5 Whys e endereçando cada Pain. Mantenha swimlane narrativo. Cada atividade TO-BE deve ter: ator (raia), gatilho, ação, artefato de saída, handoff. Atacar assimetrias, gateways implícitos e retrabalho. Registrar Assumptions toda vez que inferir algo não respondido no briefing-gaps-resolved.
3. **validate-flow-coherence** — rode o checklist interno: todos os handoffs são simétricos? todos os gateways têm critério explícito? exceções ≥ 3? nenhuma menção a marca? cada atividade TO-BE rastreia para pelo menos um success criterion? Produza o Flow Coherence Report no final do artefato.

Assemble tudo em `process-flow.md` no formato abaixo.

## Output Format

```markdown
# Process Flow — {slug-do-processo}

## 1. AS-IS Swimlane Narrativo
### Raia: {Ator 1}
1. {Gatilho} → {ação} → entrega {artefato} para {Ator 2}.
2. ...

### Raia: {Ator 2}
1. Recebe {artefato} de {Ator 1} → ...

### Gateways AS-IS
- **G1 — {nome}:** critério = "{condição}"; ramo SIM → ...; ramo NÃO → ...

### Exceções AS-IS
- **E1 — {nome}:** gatilho, tratamento, retorno ao fluxo principal.
- **E2 — ...**
- **E3 — ...**

## 2. TO-BE Swimlane Narrativo
### Raia: {Ator 1}
1. ...

### Gateways TO-BE
- **G1 — {nome}:** critério explícito, ramos.

### Exceções TO-BE
- **E1 — ...**
- **E2 — ...**
- **E3 — ...**

## 3. Traceability Table
| Atividade TO-BE | Pain endereçada | Success Criterion | Gap resolvido |
|---|---|---|---|

## 4. Assumptions
- A1: {hipótese assumida por ausência de resposta no briefing-gaps-resolved}

## 5. Flow Coherence Report
- Handoffs simétricos: {sim/não — evidências}
- Gateways explícitos: {sim/não}
- Exceções modeladas: {n}
- Menções a marca: {nenhuma / lista}
- Rastreabilidade TO-BE → Success Criteria: {% coberto}
```

## Output Example

```markdown
# Process Flow — contas-a-pagar-atraso-pagamento

## 1. AS-IS Swimlane Narrativo
### Raia: Fornecedor
1. Emite NF-e → envia por e-mail para caixa genérica "fiscal@".

### Raia: Fiscal
1. Recebe NF por e-mail → confere cabeçalho → encaminha para Compras validar pedido.
2. Em caso de divergência → devolve ao Fornecedor (E1).

### Raia: Compras
1. Recebe NF → busca pedido em planilha → valida 3-way match manualmente → aprova ou rejeita.
2. Aprovado → repassa por e-mail para Contas a Pagar.

### Gateways AS-IS
- **G1 — 3-way match OK?** critério: NF = Pedido = Recebimento. SIM → aprova. NÃO → devolve ao Fornecedor (E1).
- **G2 — Valor > R$ 50k?** SIM → exige aprovação do Head (E2 — aprovador ausente). NÃO → fluxo normal.

### Exceções AS-IS
- **E1 — NF divergente:** retorna ao fornecedor, perde 2-5 dias.
- **E2 — Aprovador ausente:** e-mail fica parado até retorno; sem substituto formal.
- **E3 — Pagamento recusado por banco:** Tesouraria reagenda, sem notificação ao fornecedor.

## 2. TO-BE Swimlane Narrativo
### Raia: Fiscal
1. Gatilho: NF entra na fila estruturada → valida cabeçalho → despacha para validação 3-way.

### Gateways TO-BE
- **G1 — 3-way match OK?** critério: match automático; SIM → rota para aprovação por alçada. NÃO → exceção E1 com SLA de 24h para resolução.
- **G2 — Alçada?** valores ≤ R$ 10k: Coord. CAP. Até R$ 50k: Gerente. Acima: Head + backup nomeado.

### Exceções TO-BE
- **E1 — NF divergente:** SLA 24h, dono = Fiscal, escalonamento automático.
- **E2 — Aprovador ausente:** backup nomeado assume após 8h úteis.
- **E3 — Falha de liquidação:** notificação ao fornecedor em ≤ 2h e reagendamento em D+1.

## 3. Traceability Table
| Atividade TO-BE | Pain endereçada | Success Criterion | Gap resolvido |
|---|---|---|---|
| Fila estruturada de NFs | Atraso 3,2d | SLA aprovação ≤ 24h | Gap #1 Alçadas |
| Backup nomeado p/ aprovador | Aprovador ausente | Atraso < 0,5d | Gap #2 SLA aprovação |

## 4. Assumptions
- A1: backup de aprovação respeita mesma alçada (gap #4 não-respondido).

## 5. Flow Coherence Report
- Handoffs simétricos: sim (12/12).
- Gateways explícitos: sim (G1, G2).
- Exceções modeladas: 3.
- Menções a marca: nenhuma.
- Rastreabilidade TO-BE → Success Criteria: 100% (3/3 critérios cobertos).
```

## Veto Conditions

- Qualquer menção a nome de software/produto/marca no AS-IS, TO-BE, Assumptions ou Coherence Report.
- Pelo menos 1 gateway implícito (sem critério nomeado ou sem ramos explícitos).
- Pelo menos 1 handoff assimétrico (quem entrega ≠ quem recebe, ou artefato não nomeado).
- Menos de 3 exceções modeladas no AS-IS OU no TO-BE.
- Atividade TO-BE sem linha correspondente na Traceability Table.

## Quality Criteria

1. AS-IS descreve a realidade operacional com honestidade (inclusive feiura), sem romantização.
2. TO-BE elimina ao menos 1 causa raiz identificada nos 5 Whys.
3. Cada gateway tem critério + ramos explícitos; cada handoff tem artefato nomeado.
4. Traceability Table cobre 100% dos Success Criteria do briefing-analysis.
5. Assumptions listam explicitamente todos os gaps não-respondidos usados como premissa.
