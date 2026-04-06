---
task: score-analysis
order: 1
input:
  - squads/nexuz-revenue-analysis/output/analise-cruzamento.md
  - squads/nexuz-revenue-analysis/output/relatorio-receita.md
  - squads/nexuz-revenue-analysis/pipeline/data/quality-criteria.md
  - squads/nexuz-revenue-analysis/pipeline/data/anti-patterns.md
output: squads/nexuz-revenue-analysis/output/review-score.md
---

# Score Analysis — Pontuar a Análise de Receita

Avaliar a análise em 4 dimensões ponderadas e calcular o score geral. Cada dimensão é pontuada de 1 a 10. O score geral é a média ponderada.

---

## Process

1. **Avaliar Integridade dos Dados (25%)** — Verificar se a contagem total de clientes no `analise-cruzamento.md` corresponde ao total declarado no `relatorio-receita.md`. Confirmar que não há registros duplicados entre categorias. Confirmar que clientes sem assinatura ativa não estão listados com assinatura ACTIVE. Pontuar de 1-10.

2. **Avaliar Precisão da Classificação (25%)** — Verificar que todas as categorias são mutuamente exclusivas: a soma de clientes por categoria deve igualar o total único de clientes. Confirmar que a classificação usa o campo `subscription_status` diretamente (não inferida do status do pagamento). Verificar ausência de violações dos anti-patterns documentados. Pontuar de 1-10.

3. **Avaliar Completude do Relatório (25%)** — Verificar presença do resumo executivo com exatamente 3 bullet points. Confirmar que cada métrica tem valor absoluto e percentual. Confirmar que listas detalhadas incluem nome do cliente, CPF/CNPJ e IDs relevantes. Verificar se a seção de metodologia declara data de extração e contagem de registros. Pontuar de 1-10.

4. **Avaliar Qualidade das Recomendações (25%)** — Verificar se cada recomendação identifica o segmento alvo, o volume de clientes afetados e a ação concreta. Rejeitar recomendações genéricas sem especificidade. Confirmar que recomendações são viáveis operacionalmente. Pontuar de 1-10.

5. **Calcular score geral** — `score_geral = (integridade × 0.25) + (classificacao × 0.25) + (completude × 0.25) + (recomendacoes × 0.25)`. Registrar score com 1 casa decimal.

---

## Output Format

```yaml
# review-score.md
score_geral: <float>  # ex: 7.5
veredicto_preliminar: <APROVADO | REPROVADO>  # >= 7.0 = APROVADO
dimensoes:
  integridade_dados:
    peso: 25%
    nota: <int 1-10>
    justificativa: <string>
    issues: <list of strings>
  classificacao_clientes:
    peso: 25%
    nota: <int 1-10>
    justificativa: <string>
    issues: <list of strings>
  completude_relatorio:
    peso: 25%
    nota: <int 1-10>
    justificativa: <string>
    issues: <list of strings>
  qualidade_recomendacoes:
    peso: 25%
    nota: <int 1-10>
    justificativa: <string>
    issues: <list of strings>
anti_patterns_violados: <list of strings>
validados: <list of strings>
```

---

## Output Example

```markdown
# Review Score — Análise de Receita Nexuz

**Score Geral: 8.0 / 10**
**Veredicto Preliminar: APROVADO**

---

## Dimensões

### Integridade dos Dados — 8/10 (peso: 25%)
**Justificativa:** Contagem total declarada (159 clientes) bate com a soma de todas as categorias (159). Nenhum cliente duplicado identificado entre as categorias. Campos null preservados nos dados brutos.
**Issues:**
- Nenhum issue crítico encontrado.

### Precisão da Classificação — 9/10 (peso: 25%)
**Justificativa:** Todas as categorias são mutuamente exclusivas. A classificação usa `subscription_status` diretamente, não inferida por pagamentos. Nenhuma violação de anti-pattern detectada.
**Issues:**
- Nenhum issue crítico encontrado.

### Completude do Relatório — 7/10 (peso: 25%)
**Justificativa:** Resumo executivo presente com 3 bullet points. Métricas com valor absoluto e percentual. Metodologia declara data de extração.
**Issues:**
- Sugestão (não bloqueante): Lista de clientes inadimplentes não inclui CPF/CNPJ — apenas nome e ID.

### Qualidade das Recomendações — 8/10 (peso: 25%)
**Justificativa:** Recomendações identificam segmento e ação concreta. Ex: "Acionar régua de cobrança para 12 clientes OVERDUE há 30+ dias".
**Issues:**
- Sugestão (não bloqueante): Recomendação 3 poderia incluir estimativa de impacto em receita.

---

## Anti-Patterns Violados
- Nenhum

## Critérios Validados
- Contagem total fechada e consistente
- Categorias mutuamente exclusivas
- Resumo executivo com 3 bullet points
- Classificação baseada em subscription_status
- Data de extração declarada na metodologia
```

---

## Quality Criteria

- [ ] Todas as 4 dimensões avaliadas com nota numérica e justificativa escrita
- [ ] Score geral calculado como média ponderada (não média simples)
- [ ] Issues listados com referência ao arquivo e seção específica
- [ ] Anti-patterns violados identificados explicitamente (ou "Nenhum")
- [ ] Veredicto preliminar consistente com o score (>= 7.0 = APROVADO)

---

## Veto Conditions

- Qualquer dimensão com nota 0 — análise deve ser rejeitada imediatamente sem calcular score geral
- Score geral calculado com pesos errados (ex: média simples ao invés de ponderada)
- Veredicto "APROVADO" emitido quando score < 7.0
- Dimensão avaliada sem justificativa escrita (nota sem explicação é inválida)
