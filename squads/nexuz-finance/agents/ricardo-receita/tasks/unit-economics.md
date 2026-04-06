---
id: unit-economics
name: "Unit Economics"
agent: ricardo-receita
order: 3
---

# Unit Economics — LTV, CAC e Eficiencia

## Process

1. **Calcular LTV (Lifetime Value)**
   - LTV simples = ARPA / Gross Revenue Churn Rate mensal
   - LTV ajustado = (ARPA x Gross Margin) / Gross Revenue Churn Rate mensal
   - Segmentar LTV por produto e por faixa de plano
   - Apresentar LTV em R$ e em meses de permanencia media (1 / Churn Rate)

2. **Calcular CAC (Customer Acquisition Cost)**
   - CAC = (Custos de Vendas + Custos de Marketing) / Novos clientes no periodo
   - Incluir: salarios comerciais, comissoes, ferramentas de vendas, ads, eventos, conteudo
   - Excluir: custos de onboarding/CS (nao sao aquisicao)
   - Calcular CAC por canal de aquisicao quando disponivel

3. **Calcular LTV:CAC Ratio**
   - LTV:CAC = LTV / CAC
   - Benchmark: >3:1 (ideal entre 3:1 e 5:1)
   - Abaixo de 3:1 = aquisicao insustentavel
   - Acima de 5:1 = possivel subinvestimento em crescimento

4. **Calcular Payback Period**
   - Payback = CAC / (ARPA x Gross Margin)
   - Resultado em meses
   - Benchmark: <12 meses para SaaS B2B SMB

5. **Calcular Quick Ratio SaaS**
   - Quick Ratio = (New MRR + Expansion MRR) / (Churn MRR + Contraction MRR)
   - Benchmark: >4 e excelente, >2 e saudavel, <1 a receita encolhe
   - Analisar tendencia dos ultimos 3-6 meses

6. **Calcular Rule of 40**
   - Rule of 40 = Taxa de Crescimento de Receita (%) + Margem de Lucro (%)
   - Usar crescimento de MRR YoY ou MoM anualizado
   - Margem: EBITDA margin ou margem operacional
   - Benchmark: soma >40% indica empresa saudavel

7. **Consolidar painel de Unit Economics**
   - Reunir todas as metricas em tabela unica com benchmarks e semaforo
   - Identificar os indicadores fora do benchmark e priorizar por impacto
   - Recomendar 3-5 acoes para melhorar unit economics

## Output Format

Entregar em formato tabular (Markdown) com:
- Tabela consolidada de unit economics com benchmarks e semaforo
- Detalhamento de LTV e CAC por segmento
- Tendencia do Quick Ratio (ultimos 3-6 meses)
- Recomendacoes priorizadas

## Output Example

```
## Unit Economics — Mar/2026

| Metrica              | Valor          | Benchmark      | Status    |
|----------------------|----------------|----------------|-----------|
| ARPA                 | R$ 598,11      | --             | --        |
| LTV                  | R$ 42.722      | --             | --        |
| CAC                  | R$ 8.500       | --             | --        |
| LTV:CAC              | 5,0:1          | >3:1           | VERDE     |
| Payback              | 9,2 meses      | <12 meses      | VERDE     |
| Gross Margin         | 78,3%          | >70%           | VERDE     |
| Quick Ratio          | 3,1            | >4             | AMARELO   |
| Rule of 40           | 38,5%          | >40%           | AMARELO   |

Quick Ratio tendencia: 3,8 (Jan) → 3,4 (Fev) → 3,1 (Mar) — tendencia de queda.
Causa provavel: Expansion MRR desacelerando enquanto Churn MRR estavel.

Recomendacoes:
1. Priorizar campanhas de expansion (upsell modulos) para recuperar Quick Ratio
2. Investigar queda de Expansion MRR — possivel saturacao de base atual
3. Rule of 40 proximo do limite — avaliar otimizacao de custos operacionais
```

## Quality Criteria

- [ ] LTV calculado com gross margin (nao apenas ARPA / churn)
- [ ] CAC inclui todos os custos de aquisicao e exclui onboarding
- [ ] LTV:CAC ratio com interpretacao (nao apenas o numero)
- [ ] Payback em meses com benchmark
- [ ] Quick Ratio com tendencia temporal (minimo 3 meses)
- [ ] Rule of 40 com componentes explicitados (crescimento + margem)
- [ ] Semaforo vs benchmarks SaaS para cada metrica
- [ ] Recomendacoes acionaveis vinculadas aos indicadores fora do benchmark

## Veto Conditions

- LTV calculado sem considerar gross margin
- CAC inclui custos de CS/onboarding (nao sao aquisicao)
- Quick Ratio sem tendencia temporal
- Rule of 40 sem explicitar os dois componentes
- Ausencia de benchmarks de referencia
- Recomendacoes genericas sem vinculo com os dados apresentados
