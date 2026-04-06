# Anti-Patterns — Análise Financeira SaaS

## Nunca Faça

1. **Misturar receita reconhecida com caixa recebido** — São conceitos diferentes. Receita é quando o serviço é prestado; caixa é quando o dinheiro entra. No Asaas, uma cobrança criada não é receita recebida.

2. **Calcular MRR com valores anuais sem dividir** — Se um cliente paga anualmente, o MRR é o valor anual / 12, não o valor total.

3. **Ignorar inadimplência no fluxo de caixa** — Boletos e PIX no Asaas têm taxa de inadimplência. Projetar 100% de recebimento é irreal.

4. **Apresentar churn sem contexto de cohort** — Churn bruto mensal sem análise de safra esconde a real dinâmica de retenção.

5. **Usar margem bruta contábil para SaaS** — COGS de SaaS inclui infra/cloud e suporte, não matéria-prima. Usar a classificação errada distorce a métrica.

6. **Comparar períodos sem normalizar** — Meses têm dias úteis diferentes. Comparar fevereiro com março sem ajuste gera distorção.

7. **Projetar crescimento linear** — SaaS cresce (ou decresce) exponencialmente. Projeções lineares são otimistas demais no começo e pessimistas demais depois.

## Sempre Faça

1. **Documentar a fonte de cada número** — Todo dado deve ser rastreável: "MRR calculado a partir de GET /v3/subscriptions status=active no Asaas em DD/MM/YYYY"

2. **Separar receita recorrente de não-recorrente** — Setup, implantação e serviços avulsos não são MRR.

3. **Incluir variância % entre projetado e realizado** — Número absoluto sozinho não mostra a magnitude do desvio.

4. **Considerar taxas do gateway no COGS** — Asaas cobra taxas por transação que impactam a margem bruta.

5. **Validar dados cruzando fontes** — Total de receita Asaas deve bater com extratos bancários (descontadas taxas).
