---
id: build-dre
name: "DRE SaaS com Comparativos de Periodo"
agent: flavia-fluxo
order: 3
---

# DRE — Demonstrativo de Resultado do Exercicio (SaaS)

## Processo

1. **Classificar receitas** — Separar em: Assinaturas (recorrente), Setup/Implantacao (nao-recorrente), Servicos Premium
2. **Calcular deducoes** — Descontos concedidos + impostos sobre receita (ISS, PIS, COFINS)
3. **Apurar CPV (Custo dos Produtos Vendidos)** — Infra cloud, suporte ao cliente, taxas gateway Asaas
4. **Levantar OpEx** — Separar em P&D (desenvolvimento), S&M (vendas e marketing), G&A (administrativo)
5. **Calcular margens** — Margem bruta, margem operacional (EBITDA)
6. **Montar comparativos** — Mes atual vs mes anterior vs mesmo mes do ano anterior vs orcado
7. **Calcular variacoes** — Percentual de variacao real vs orcado para cada linha
8. **Destacar desvios** — Linhas com variacao > 10% do orcado recebem sinalizacao

## Formato de Output

Tabela markdown com 6 colunas:

| Linha DRE | Mes Atual | Mes Anterior | Mesmo Mes Ano Ant. | Orcado | Real vs Orcado (%) |

Seguida de:
- **Metricas SaaS**: MRR, ARR, margem bruta %, margem EBITDA %, receita recorrente vs total (%)
- **Desvios significativos**: Linhas com variacao > 10% com explicacao
- **Premissas de rateio**: Como custos compartilhados foram alocados entre P&D, S&M, G&A

## Exemplo de Output

```
DRE Nexuz — Marco/2026
Periodo: 01/03/2026 a 31/03/2026

| Linha                          | Mar/26       | Fev/26       | Mar/25       | Orcado       | vs Orcado |
|--------------------------------|--------------|--------------|--------------|--------------|-----------|
| (+) Receita Recorrente (MRR)   | R$ 82.000,00 | R$ 79.500,00 | R$ 61.000,00 | R$ 85.000,00 | -3,5%     |
| (+) Receita Setup/Implantacao  | R$ 5.000,00  | R$ 8.000,00  | R$ 3.200,00  | R$ 6.000,00  | -16,7%  * |
| (+) Servicos Premium           | R$ 2.000,00  | R$ 1.500,00  | R$ 0,00      | R$ 2.500,00  | -20,0%  * |
| (=) Receita Bruta              | R$ 89.000,00 | R$ 89.000,00 | R$ 64.200,00 | R$ 93.500,00 | -4,8%     |
| (-) Deducoes                   | R$ 8.900,00  | R$ 8.900,00  | R$ 6.420,00  | R$ 9.350,00  | -4,8%     |
| (=) Receita Liquida            | R$ 80.100,00 | R$ 80.100,00 | R$ 57.780,00 | R$ 84.150,00 | -4,8%     |
| (-) CPV                        | R$ 12.000,00 | R$ 11.500,00 | R$ 9.800,00  | R$ 12.500,00 | -4,0%     |
| (=) Lucro Bruto                | R$ 68.100,00 | R$ 68.600,00 | R$ 47.980,00 | R$ 71.650,00 | -5,0%     |
| (-) P&D                        | R$ 28.000,00 | R$ 27.000,00 | R$ 22.000,00 | R$ 28.000,00 | 0,0%      |
| (-) S&M                        | R$ 14.000,00 | R$ 13.500,00 | R$ 12.000,00 | R$ 15.000,00 | -6,7%     |
| (-) G&A                        | R$ 10.000,00 | R$ 9.500,00  | R$ 8.000,00  | R$ 10.000,00 | 0,0%      |
| (=) EBITDA                     | R$ 16.100,00 | R$ 18.600,00 | R$ 5.980,00  | R$ 18.650,00 | -13,7%  * |

* Desvio > 10% — requer analise

Metricas SaaS:
- MRR: R$ 82.000,00 | ARR: R$ 984.000,00
- Margem Bruta: 85,0% | Margem EBITDA: 20,1%
- Receita Recorrente / Total: 92,1%
```

## Criterios de Qualidade

1. Quatro colunas comparativas presentes (atual, anterior, mesmo mes ano anterior, orcado)
2. Receita recorrente e nao-recorrente nunca somadas em linha unica
3. Deducoes com impostos discriminados (ISS, PIS, COFINS)
4. CPV inclui apenas custos diretamente ligados a entrega (infra, suporte, gateway)
5. OpEx separado em P&D, S&M e G&A
6. Metricas SaaS calculadas (MRR, ARR, margens, % recorrente)
7. Desvios > 10% sinalizados com asterisco e explicacao

## Condicoes de Veto

- Ausencia de qualquer coluna comparativa (minimo 4 colunas obrigatorias)
- Receita de setup incluida no MRR
- CPV misturado com OpEx
- Impostos (ISS, PIS, COFINS) nao discriminados nas deducoes
- EBITDA calculado incorretamente (receita liquida - CPV - OpEx)
- Dados sem fonte identificavel
