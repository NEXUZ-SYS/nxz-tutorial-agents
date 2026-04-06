---
id: analyze-churn
name: "Analisar Churn e Retencao"
agent: ricardo-receita
order: 2
---

# Analise de Churn e Retencao

## Process

1. **Identificar cancelamentos no periodo**
   - Listar assinaturas canceladas com data de cancelamento, valor e produto
   - Distinguir cancelamento total (logo churn) de reducao parcial (contraction)
   - Registrar motivo do cancelamento quando disponivel

2. **Calcular Logo Churn Rate**
   - Logo Churn = Clientes perdidos no periodo / Clientes ativos no inicio do periodo
   - Segmentar por produto, plano e porte
   - Benchmark: <2% mensal para SaaS B2B

3. **Calcular Revenue Churn Rate (Gross)**
   - Gross Revenue Churn = (Churn MRR + Contraction MRR) / MRR no inicio do periodo
   - Segmentar por produto
   - Benchmark: <2% mensal

4. **Calcular Net Revenue Retention (NRR)**
   - NRR = (MRR inicio - Churn MRR - Contraction MRR + Expansion MRR) / MRR inicio
   - Apresentar como percentual (>100% = expansao liquida)
   - Benchmark: >110% anual para B2B SaaS

5. **Construir Cohort Matrix de Retencao**
   - Agrupar clientes por mes de entrada (cohort)
   - Calcular retencao de receita em M0, M1, M2, M3, M6, M12
   - Identificar cohorts com retencao acima/abaixo da media
   - Sinalizar pontos de inflexao (meses onde a queda acelera)

6. **Analisar padroes e causas**
   - Top motivos de cancelamento (quando disponivel)
   - Correlacao entre churn e produto/plano/porte
   - Sazonalidade (meses com pico de cancelamento)
   - Sinais preditivos de churn (reducao de uso, atrasos, contraction previa)

## Output Format

Entregar em formato tabular (Markdown) com:
- Tabela resumo: Logo Churn, Revenue Churn, NRR (ultimos 3-6 meses)
- Cohort matrix de retencao de receita
- Lista de top motivos de churn
- Semaforo vs benchmarks SaaS

## Output Example

```
## Metricas de Churn — Mar/2026

| Metrica              | Mar/26 | Benchmark | Status    |
|----------------------|--------|-----------|-----------|
| Logo Churn           | 1,9%   | <2,0%     | AMARELO   |
| Gross Revenue Churn  | 1,4%   | <2,0%     | VERDE     |
| NRR (mensal)         | 100,8% | >100%     | VERDE     |
| NRR (anualizado)     | 110,0% | >110%     | VERDE     |

## Cohort Retencao de Receita

| Cohort  | M0   | M1    | M3    | M6    | M12   |
|---------|------|-------|-------|-------|-------|
| Out/25  | 100% | 96,5% | 91,8% | 87,0% | 80,5% |
| Nov/25  | 100% | 97,1% | 93,2% | 88,4% |  --   |
| Dez/25  | 100% | 94,3% | 89,7% |  --   |  --   |

Alerta: Cohort Dez/25 com retencao M1 abaixo da media (94,3% vs 96,5%).
Hipotese: sazonalidade food service em janeiro.
```

## Quality Criteria

- [ ] Logo Churn e Revenue Churn calculados separadamente
- [ ] NRR inclui contraction (nao apenas churn)
- [ ] Cohort matrix com minimo 3 cohorts e 3 periodos
- [ ] Base de calculo e o inicio do periodo (nao media ou final)
- [ ] Comparacao com benchmarks SaaS com semaforo
- [ ] Segmentacao por produto presente
- [ ] Sazonalidade considerada na analise

## Veto Conditions

- Churn rate calculado sobre base errada (media ou final do periodo)
- NRR calculado sem contraction MRR
- Ausencia de cohort matrix
- Logo Churn usado como proxy de Revenue Churn sem ressalvas
- Periodo de referencia nao declarado
