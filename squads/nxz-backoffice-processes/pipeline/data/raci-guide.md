# RACI Guide — regras duras de matriz de responsabilidades

## Definições

| Letra | Significado | Quem é |
|-------|-------------|--------|
| **R** (Responsible) | Executa a atividade | Quem faz o trabalho. Pode ter várias pessoas. |
| **A** (Accountable) | Responde pelo resultado | Única pessoa accountable. Aprova ou rejeita. |
| **C** (Consulted) | Consultado antes da decisão | Comunicação bi-direcional antes de agir. |
| **I** (Informed) | Informado depois da decisão | Comunicação uni-direcional após o fato. |

## Regras não-negociáveis

1. **1 A por atividade** — accountability jamais compartilhada. Duas cabeças = zero cabeça.
2. **≥ 1 R por atividade** — alguém precisa executar. R pode ser plural; A não.
3. **Linha sem A é blocker** — rejeitar o design até alguém assumir.
4. **Coluna só com I** — papel é passageiro no processo; reavalie se precisa estar no RACI.
5. **Mesmo papel sendo A + R** — ok quando o accountable também executa; só preencha com "R/A" ou "A/R".
6. **Separe request + approval** — quem pede não pode aprovar (SoD básico).
7. **Separe execute + reconcile** — quem registra a transação não pode conciliar a evidência.
8. **Aprovação financeira** — sempre four-eyes acima de threshold material.

## Heurísticas de validação

### Check horizontal (por atividade / linha)
- Tem exatamente 1 A? ✅ / ❌
- Tem ≥ 1 R? ✅ / ❌
- Os C's são realmente necessários (alguém que precisa opinar antes)?
- Os I's são realmente necessários (alguém que precisa saber depois)?

### Check vertical (por papel / coluna)
- Papel só tem I's? Talvez não precise estar aqui.
- Papel é A em muitas linhas? Risco de gargalo.
- Papel é R em muitas linhas críticas ao mesmo tempo? Risco de bottleneck operacional.

### Check de SoD (cross-papel)
- Alguém tem A em "Solicitar" **E** A em "Aprovar"? ❌ Violação.
- Alguém tem A em "Registrar transação" **E** A em "Conciliar"? ❌ Violação.
- Alguém tem A em "Cadastrar fornecedor" **E** A em "Liberar pagamento"? ❌ Violação.
- Four-eyes aplicado em atividades materiais? ✅ obrigatório.

## Formato de apresentação

Tabela Markdown, papéis em colunas, atividades em linhas. Para processos complexos, quebrar em múltiplas tabelas (uma por sub-processo).

Exemplo mínimo:

| Atividade | Requester | Analyst | Manager | CFO |
|-----------|-----------|---------|---------|-----|
| Submeter pedido | R/A | I | - | - |
| Validar pedido | C | R/A | I | - |
| Aprovar (≤ R$ 10k) | I | C | R/A | - |
| Aprovar (> R$ 10k) | I | C | R | A |

## Armadilhas comuns

- **"Todo mundo é R"**: diluir responsabilidade. Máx 2-3 R's; senão vire sub-atividades.
- **Substituir papel por pessoa** ("João" em vez de "Analista de Compras"): o doc vira frágil a turnover.
- **Esquecer papel externo** (auditoria, cliente, fornecedor): se impactam a decisão, entram no RACI.
- **Gateways sem C**: decisões complexas geralmente precisam de alguém consultado.
