---
id: validate-methodology
title: Validar Metodologia e Consistência
agent: carlos-cfo
order: 1
depends_on:
  - renato-relatorio/compile-dashboards
  - renato-relatorio/executive-summary
input:
  - dashboards-operacionais.md
  - resumo-executivo.md
output: validacao-metodologica.md
---

# Validar Metodologia e Consistência

Verificar que todas as fórmulas, cálculos e dados estão corretos e consistentes entre os relatórios produzidos.

---

## Process

1. **Listar todas as métricas** presentes nos dashboards e resumo executivo
2. **Verificar fórmulas de MRR** — MRR Final = MRR Inicial + New + Expansion - Contraction - Churn. Conferir cada componente
3. **Verificar cálculo de Churn** — Gross Churn = MRR perdido / MRR inicial. Confirmar que cohort usa mesma base
4. **Verificar NRR** — NRR = (MRR Inicial + Expansion - Contraction - Churn) / MRR Inicial × 100
5. **Verificar Unit Economics** — LTV = ARPU × Margem Bruta / Churn Rate. CAC = (S&M total) / Novos clientes. Confirmar que CS não está no CAC
6. **Verificar DRE** — Receita Líquida = Bruta - Deduções. EBITDA correto. Classificação de custos vs despesas
7. **Verificar Fluxo de Caixa** — Saldo final = Saldo inicial + Entradas - Saídas. Conferir categorização
8. **Cross-check entre relatórios** — MRR dos dashboards = MRR do resumo executivo. Churn rate consistente. Health Score coerente com KPIs
9. **Verificar semáforos** — Cada 🟢🟡🔴 está de acordo com os benchmarks definidos
10. **Documentar achados** — Lista de ✅ validados, ⚠️ ajustes necessários, ❌ erros críticos

---

## Output Format

```markdown
# 🎯 Validação Metodológica — [Mês/Ano]

## Resumo
- Total de métricas verificadas: [N]
- ✅ Corretas: [N]
- ⚠️ Ajustes necessários: [N]
- ❌ Erros críticos: [N]

## Parecer: [APROVADO | APROVADO COM RESSALVAS | REJEITADO]

## Detalhamento

### MRR e Crescimento
[Status] — [Descrição da verificação e resultado]

### Churn e Retenção
[Status] — [Descrição da verificação e resultado]

### Unit Economics
[Status] — [Descrição da verificação e resultado]

### DRE
[Status] — [Descrição da verificação e resultado]

### Fluxo de Caixa
[Status] — [Descrição da verificação e resultado]

### Consistência Cross-Report
[Status] — [Descrição da verificação e resultado]

### Semáforos
[Status] — [Descrição da verificação e resultado]

## Correções Necessárias
[Lista numerada de correções com prioridade]
```

---

## Output Example

```markdown
# 🎯 Validação Metodológica — Março 2026

## Resumo
- Total de métricas verificadas: 24
- ✅ Corretas: 20
- ⚠️ Ajustes necessários: 3
- ❌ Erros críticos: 1

## Parecer: APROVADO COM RESSALVAS

## Detalhamento

### MRR e Crescimento
✅ — Waterfall fecha corretamente. R$ 460K + 35K + 18K - 12K - 16K = R$ 485K

### Unit Economics
⚠️ — LTV calculado com média simples de ARPU. Recomendo ponderar por segmento (SMB vs Enterprise)
❌ — CAC inclui custos de CS (R$ 22K). Deve considerar apenas S&M. CAC correto: R$ 1.850 (não R$ 2.100)

### Consistência Cross-Report
⚠️ — Health Score do resumo executivo (72) não reflete a piora em NRR adequadamente. Sugiro recalcular com peso ajustado

## Correções Necessárias
1. ❌ **[CRÍTICO]** Recalcular CAC excluindo custos de CS — impacta LTV:CAC
2. ⚠️ **[MÉDIO]** Ponderar LTV por segmento ao invés de média simples
3. ⚠️ **[BAIXO]** Recalibrar Health Score considerando tendência de NRR
```

---

## Quality Criteria

- [ ] Todas as fórmulas principais verificadas e documentadas
- [ ] Cross-check entre dashboards e resumo executivo realizado
- [ ] Cada métrica tem status explícito (✅, ⚠️ ou ❌)
- [ ] Erros críticos identificados com correção específica
- [ ] Parecer final claro e justificado
- [ ] Correções priorizadas por severidade
- [ ] Verificação de semáforos vs benchmarks definidos
- [ ] Nenhuma métrica ignorada ou pulada na verificação

---

## Veto Conditions

- Erro crítico (❌) não documentado com correção
- Parecer "APROVADO" emitido com erros críticos pendentes
- Fórmula verificada como correta quando está errada
- Cross-check entre relatórios não realizado
- Métrica presente nos relatórios mas ausente na validação
