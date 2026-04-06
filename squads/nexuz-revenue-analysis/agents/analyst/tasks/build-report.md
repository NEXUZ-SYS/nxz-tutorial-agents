---
task: Construir Relatório Analítico de Receita
order: 3
input:
  - squads/nexuz-revenue-analysis/output/analise-cruzamento.md
  - squads/nexuz-revenue-analysis/output/raw-payments.json
  - squads/nexuz-revenue-analysis/output/raw-subscriptions.json
  - squads/nexuz-revenue-analysis/output/raw-anticipations.json
output:
  - squads/nexuz-revenue-analysis/output/relatorio-receita.md
---

# Construir Relatório Analítico de Receita

Transformar os dados do cruzamento em um relatório executivo estruturado, com sumário, métricas consolidadas, análise por categoria e recomendações acionáveis para a equipe de receita da Nexuz.

---

## Processo

### 1. Calcular Métricas Consolidadas
A partir de `analise-cruzamento.md` e dos JSONs de entrada, calcular:
- **MRR estimado (Monthly Recurring Revenue):** soma do `value` de todas as assinaturas ACTIVE
- **Receita em risco:** soma do `value` das assinaturas ACTIVE de clientes classificados como Inadimplente
- **Valor inadimplente total:** soma do `value` dos pagamentos OVERDUE de clientes inadimplentes
- **Receita perdida (churn):** soma do `value` das assinaturas INACTIVE/EXPIRED
- **Receita avulsa:** soma do `value` dos pagamentos com `subscription == null`
- **Taxa de churn:** (clientes churn / total clientes com assinatura) × 100
- **Taxa de inadimplência:** (clientes inadimplentes / total clientes com assinatura ACTIVE) × 100
- **Receita antecipada bruta:** soma do `totalValue` das antecipações com status CREDITED
- **Taxa total de antecipação:** soma do `fee` das antecipações CREDITED
- **Receita antecipada líquida:** soma do `netValue` das antecipações CREDITED
- **% da receita antecipada:** (receita antecipada bruta / MRR) × 100

### 2. Estruturar o Relatório
Construir o relatório em markdown com as seguintes seções na ordem:
1. Cabeçalho com data de geração e período de referência dos dados
2. Sumário Executivo (3-5 frases com os achados mais críticos)
3. Tabela de Métricas Consolidadas
4. Análise Detalhada por Categoria (uma subseção por categoria)
5. Clientes em Atenção (top inadimplentes por valor em aberto)
6. Receitas Antecipadas (pagamentos já recebidos antecipadamente, com mês de recebimento efetivo, taxas e impacto no fluxo de caixa)
7. Recomendações (mínimo 3, baseadas nos dados)
8. Notas metodológicas

### 3. Gravar e Confirmar
- Gravar o relatório em `squads/nexuz-revenue-analysis/output/relatorio-receita.md`
- Confirmar que o arquivo foi gravado e listar o número de seções e linhas totais

---

## Output Format

```yaml
relatorio:
  arquivo: squads/nexuz-revenue-analysis/output/relatorio-receita.md
  gerado_em: "{timestamp ISO 8601}"
  periodo_referencia: "{data_inicio} a {data_fim}"
  metricas:
    mrr_brl: N
    receita_em_risco_brl: N
    valor_inadimplente_brl: N
    receita_perdida_churn_brl: N
    receita_avulsa_brl: N
    taxa_churn_pct: N
    taxa_inadimplencia_pct: N
    receita_antecipada_bruta_brl: N
    taxa_antecipacao_brl: N
    receita_antecipada_liquida_brl: N
    pct_receita_antecipada: N
  secoes:
    - Sumário Executivo
    - Métricas Consolidadas
    - Análise por Categoria
    - Clientes em Atenção
    - Receitas Antecipadas
    - Recomendações
    - Notas Metodológicas
```

---

## Output Example

```markdown
# Relatório de Receita — Nexuz
**Gerado em:** 2026-04-06 | **Período de referência:** Março/2026

---

## Sumário Executivo

A base de clientes da Nexuz totalizou 159 clientes analisados em março/2026. O MRR estimado é de **R$ 42.380,00**, com **R$ 5.380,20 em risco** devido a 18 clientes inadimplentes. A taxa de churn identificada é de 15,8% (21 clientes com assinaturas inativas), representando **R$ 4.197,90 em receita mensal perdida**. Ação imediata é recomendada para os 5 maiores inadimplentes, que concentram 72% do valor em aberto.

---

## Métricas Consolidadas

| Métrica                         | Valor           |
|---------------------------------|-----------------|
| MRR Estimado                    | R$ 42.380,00    |
| Receita em Risco (inadimplentes)| R$ 5.380,20     |
| Valor Inadimplente Total        | R$ 4.789,60     |
| Receita Perdida (churn)         | R$ 4.197,90     |
| Receita Avulsa                  | R$ 1.250,00     |
| Taxa de Inadimplência           | 13,8%           |
| Taxa de Churn                   | 15,8%           |
| Receita Antecipada (bruta)      | R$ 4.200,00     |
| Taxa de Antecipação             | R$ 98,50        |
| Receita Antecipada (líquida)    | R$ 4.101,50     |
| % Receita Antecipada s/ MRR     | 9,9%            |
| Total de Clientes Analisados    | 159             |

---

## Análise por Categoria

### Com Assinatura Ativa (112 clientes — 70,4%)
MRR consolidado de R$ 37.000,00. Clientes em situação regular, sem cobranças em aberto.

### Inadimplentes (18 clientes — 11,3%)
18 clientes possuem assinatura ACTIVE com cobranças OVERDUE. Valor total em aberto: R$ 4.789,60.

### Churn — Assinatura Inativa/Expirada (21 clientes — 13,2%)
21 clientes com assinaturas encerradas. Último pagamento médio: 47 dias atrás.

### Cobrança Avulsa (8 clientes — 5,0%)
8 clientes com cobranças pontuais sem assinatura vinculada. Total: R$ 1.250,00.

---

## Clientes em Atenção (Top 5 Inadimplentes por Valor)

| # | Cliente             | Valor em Aberto | Dias de Atraso | Assinatura  |
|---|---------------------|-----------------|----------------|-------------|
| 1 | Bar Delta EIRELI    | R$ 899,70       | 35 dias        | sub_0003    |
| 2 | Churrascaria Épsilon| R$ 599,80       | 20 dias        | sub_0015    |

---

## Receitas Antecipadas

12 pagamentos foram antecipados com status CREDITED, totalizando **R$ 4.200,00 brutos** (R$ 4.101,50 líquidos após taxa de R$ 98,50).

| Pagamento   | Cliente            | Valor Original | Taxa   | Líquido   | Data Antecipação | Vencimento Original |
|-------------|--------------------|--------------:|-------:|----------:|------------------|---------------------|
| pay_0001    | Restaurante Alpha  | R$ 299,90     | R$ 2,33| R$ 287,77 | 2026-03-20       | 2026-04-01          |
| pay_0010    | Pizzaria Omega     | R$ 499,90     | R$ 4,50| R$ 485,40 | 2026-03-22       | 2026-05-01          |

> **Impacto no fluxo de caixa:** Esses valores já foram recebidos nos meses indicados na coluna "Data Antecipação" e não devem ser contabilizados novamente no mês de vencimento original.

---

## Recomendações

1. **Acionar régua de cobrança imediata** para os 18 inadimplentes — priorizar os 5 com maior valor em aberto.
2. **Investigar os 21 churns:** verificar motivo de cancelamento e oportunidade de reativação com desconto ou ajuste de plano.
3. **Converter clientes avulsos:** os 8 clientes com cobranças avulsas são candidatos à migração para assinatura recorrente.

---

## Notas Metodológicas

- Dados extraídos do Asaas API em 2026-04-06
- MRR calculado com base no `value` das assinaturas ACTIVE (não considera descontos ou promoções pontuais)
- Clientes sem assinatura e sem pagamento não foram incluídos nas análises
```

---

## Quality Criteria

- O relatório deve ter no mínimo as 7 seções listadas no processo, na ordem especificada
- Os valores das métricas no sumário executivo devem corresponder exatamente aos valores na tabela de métricas consolidadas — zero inconsistências
- As taxas percentuais devem usar a base correta: inadimplência sobre clientes com assinatura ACTIVE, churn sobre todos com assinatura (ACTIVE + INACTIVE + EXPIRED)
- O relatório deve referenciar o período de referência dos dados na seção de cabeçalho — nunca omitir a janela temporal

---

## Veto Conditions

- **Métricas inconsistentes:** Se o total de clientes somado por categoria no relatório divergir do total em `analise-cruzamento.md`, abortar e recalcular
- **Ausência do arquivo de cruzamento:** Se `analise-cruzamento.md` não existir ou estiver vazio, abortar — o relatório depende do cruzamento como fonte de verdade
- **Seções faltantes:** Se o arquivo gerado não contiver as 7 seções obrigatórias (incluindo Receitas Antecipadas), não registrar o relatório como completo e revisar antes de prosseguir para o export
