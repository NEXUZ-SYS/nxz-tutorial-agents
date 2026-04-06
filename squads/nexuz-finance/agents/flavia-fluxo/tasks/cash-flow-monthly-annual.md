---
id: cash-flow-monthly-annual
name: "Fluxo de Caixa Mensal (3 meses) e Anual (12 meses)"
agent: flavia-fluxo
order: 2
---

# Fluxo de Caixa Mensal e Anual

## Processo

### Mensal (3 meses)

1. **Calcular MRR atual** — Base de assinaturas ativas no Asaas, excluindo setup e servicos avulsos
2. **Aplicar churn esperado** — Usar taxa de churn media dos ultimos 3 meses sobre MRR
3. **Projetar receitas nao-recorrentes** — Setup e implantacao com base no pipeline comercial confirmado
4. **Levantar despesas fixas** — Folha, aluguel, assinaturas de servicos, infra cloud (recorrentes)
5. **Estimar despesas variaveis** — Comissoes, marketing, gateway Asaas (% sobre receita)
6. **Montar projecao mensal** — Saldo inicial + entradas - saidas = saldo final por mes

### Anual (12 meses)

7. **Definir premissas por cenario** — Conservador, Base e Otimista para crescimento MRR, churn e despesas
8. **Projetar receita por cenario** — MRR composto mensalmente com taxa de crescimento do cenario
9. **Projetar despesas por cenario** — Fixas + variaveis ajustadas por premissas de contratacao e investimento
10. **Calcular runway** — Meses de operacao cobertos pelo caixa disponivel em cada cenario

## Formato de Output

### Visao Mensal (3 meses)

| Linha | Mes 1 | Mes 2 | Mes 3 |

### Visao Anual (12 meses) — por cenario

| Linha | M1 | M2 | ... | M12 | Total |

Cada cenario em tabela separada com premissas declaradas no cabecalho.

## Exemplo de Output

```
Fluxo de Caixa Mensal — Abr a Jun/2026
Premissas: Churn mensal 3,5% | Crescimento MRR 2,0%/mes | Inadimplencia 8%

| Linha                    | Abr/2026      | Mai/2026      | Jun/2026      |
|--------------------------|---------------|---------------|---------------|
| Saldo Inicial            | R$ 45.000,00  | R$ 52.300,00  | R$ 58.100,00  |
| (+) Receita Recorrente   | R$ 75.400,00  | R$ 76.900,00  | R$ 78.400,00  |
| (+) Receita Nao-Recorr.  | R$ 8.000,00   | R$ 5.000,00   | R$ 6.000,00   |
| (-) Despesas Fixas       | R$ 48.000,00  | R$ 48.000,00  | R$ 48.500,00  |
| (-) Despesas Variaveis   | R$ 28.100,00  | R$ 28.100,00  | R$ 28.600,00  |
| (=) Saldo Final          | R$ 52.300,00  | R$ 58.100,00  | R$ 65.400,00  |

---
Fluxo de Caixa Anual — Cenario BASE
Premissas: Crescimento MRR 2,0%/mes | Churn 3,5%/mes | Novas contratacoes: +1 dev em Jul

| Linha              | Abr    | Mai    | Jun    | ... | Mar/27 | Total Ano  |
|--------------------|--------|--------|--------|-----|--------|------------|
| Entradas           | 83.400 | 81.900 | 84.400 | ... | 98.200 | 1.045.000  |
| Saidas             | 76.100 | 76.100 | 77.100 | ... | 82.500 | 945.000    |
| Saldo Final        | 52.300 | 58.100 | 65.400 | ... | 145.000| —          |

Runway atual (cenario base): 14 meses
Runway (conservador): 9 meses | Runway (otimista): 18+ meses
```

## Criterios de Qualidade

1. MRR calculado a partir de base real de assinaturas (nao estimado)
2. Churn aplicado sobre MRR com taxa justificada
3. Separacao clara entre despesas fixas e variaveis
4. Cenarios anuais com premissas explicitas e distintas
5. Runway calculado para cada cenario
6. Receita nao-recorrente nunca tratada como recorrente nas projecoes

## Condicoes de Veto

- MRR base nao extraido de dados reais do Asaas
- Cenario unico para projecao anual (exige minimo 3 cenarios)
- Premissas de churn sem base historica
- Despesas fixas sem fonte verificavel (folha, contratos)
- Runway nao calculado
