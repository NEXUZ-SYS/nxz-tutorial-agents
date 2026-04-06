---
id: calculate-mrr
name: "Calcular MRR e ARR"
agent: ricardo-receita
order: 1
---

# Calcular MRR e ARR com Decomposicao

## Process

1. **Extrair assinaturas ativas do Asaas**
   - Filtrar assinaturas com status ativo e valor > R$ 0
   - Excluir trials, cortesias e receita one-time (setup, implementacao)
   - Registrar data de referencia da extracao

2. **Normalizar para base mensal**
   - Planos mensais: usar valor integral
   - Planos trimestrais: dividir por 3
   - Planos anuais: dividir por 12
   - Registrar premissa de normalizacao para cada tipo

3. **Calcular MRR total e ARR**
   - MRR = Soma de todas as assinaturas normalizadas
   - ARR = MRR x 12

4. **Segmentar MRR por dimensao**
   - Por produto: NXZ ERP, NXZ Go (PDV/Totem), NXZ KDS, NXZ Delivery
   - Por faixa de plano (quando aplicavel)
   - Por porte do cliente (numero de unidades/lojas)

5. **Decompor MRR (Waterfall)**
   - New MRR: clientes com primeira cobranca no periodo
   - Expansion MRR: clientes existentes com aumento de valor vs mes anterior
   - Contraction MRR: clientes existentes com reducao de valor vs mes anterior
   - Churn MRR: clientes que cancelaram no periodo (valor do mes anterior)
   - Net New MRR = New + Expansion - Contraction - Churn

6. **Calcular ARPA**
   - ARPA = MRR / Numero de contas ativas
   - Segmentar ARPA por produto

## Output Format

Entregar em formato tabular (Markdown) com:
- Tabela MRR Waterfall dos ultimos 3-6 meses
- Tabela de MRR segmentado por produto
- ARPA geral e por produto
- Grafico textual de tendencia Net New MRR

## Output Example

```
## MRR Waterfall — Jan a Mar/2026

| Componente        | Jan/26      | Fev/26      | Mar/26      |
|-------------------|-------------|-------------|-------------|
| MRR Inicio        | R$ 89.450   | R$ 91.230   | R$ 93.100   |
| + New MRR         | R$ 3.200    | R$ 2.850    | R$ 3.500    |
| + Expansion MRR   | R$ 1.080    | R$ 1.420    | R$ 980      |
| - Contraction MRR | R$ (500)    | R$ (400)    | R$ (680)    |
| - Churn MRR       | R$ (2.000)  | R$ (2.000)  | R$ (1.800)  |
| = Net New MRR     | R$ 1.780    | R$ 1.870    | R$ 2.000    |
| MRR Final         | R$ 91.230   | R$ 93.100   | R$ 95.100   |

ARPA Geral: R$ 598,11 | ERP: R$ 420,00 | Go: R$ 135,00 | KDS: R$ 28,00 | Delivery: R$ 15,11
```

## Quality Criteria

- [ ] MRR calculado somente com receita recorrente (sem one-time)
- [ ] Valores normalizados para base mensal com premissas documentadas
- [ ] Decomposicao completa: New + Expansion - Contraction - Churn = Net New MRR
- [ ] Segmentacao por produto presente
- [ ] Minimo 3 meses de historico no waterfall
- [ ] Valores em R$ formato brasileiro
- [ ] ARPA calculado e segmentado

## Veto Conditions

- MRR inclui receita nao recorrente (setup, servicos)
- Decomposicao nao fecha (soma dos componentes != diferenca entre MRR inicio e final)
- Falta segmentacao por produto
- Periodo de referencia nao declarado
- Fonte de dados nao identificada
