---
id: generate-report
agent: analyst
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/publish_log.json
outputFile: squads/nxz-faq-chatwoot/output/execution_report.md
---

# Relatorio de Execucao

## Objetivo

Gerar relatorio executivo consolidando todas as metricas da execucao,
incluindo comparativo com rodada anterior quando disponivel.

## Instrucoes

1. Leia todos os outputs das etapas anteriores:
   - run-config.md (configuracao)
   - extracted-questions.json (extracao)
   - pattern-report.md (analise de padroes)
   - faqs_index.md (FAQs geradas)
   - test_results.json (resultados do teste)
   - review-decisions.md (decisoes de Carol)
   - publish_log.json (publicacao)
2. Se existir `run_metrics_history.json` de rodada anterior, inclua comparativo
3. Gere o relatorio executivo
4. Atualize o historico de metricas

## Formato do Relatorio

```markdown
# Relatorio de Execucao — nxz-faq-chatwoot
**Data:** {data} | **Rodada:** #{N}

## Resumo Executivo
| Metrica | Valor | Delta |
|---------|-------|-------|
| Perguntas analisadas | {N} | - |
| Temas identificados | {N} | - |
| FAQs geradas | {N} | - |
| FAQs aprovadas | {N} | - |
| FAQs rejeitadas | {N} | - |
| FAQs publicadas | {N} | - |
| Taxa de acerto do agente | {X}% | {+/-Y}% |

## Detalhamento por Produto
| Produto | Perguntas | FAQs Publicadas | Taxa Acerto |
|---------|-----------|-----------------|-------------|
| NXZ ERP | {N} | {N} | {X}% |

## Teste do Agente de IA
- Total de perguntas testadas: {N}
- ACERTOU: {N} | PARCIAL: {N} | GENERICO: {N} | ERROU: {N} | TIMEOUT: {N}
- Taxa de acerto: {X}%

## Decisoes de Carol
- Aprovados: {N}
- Aprovados com edicao: {N}
- Rejeitados: {N} (motivos: ...)
- Escalados para Luiz: {N}

## Comparativo com Rodada Anterior
(se disponivel)
| Metrica | Anterior | Atual | Delta |
|---------|----------|-------|-------|
| Taxa de acerto | {X}% | {Y}% | {+/-Z}% |
| FAQs no Help Center | {N} | {N} | +{N} |

## Proxima Execucao
- Data recomendada: {data + 15 dias}
- Pendencias: {lista de artigos escalados para Luiz, se houver}
```

## Historico de Metricas

Salve/atualize o arquivo `output/run_metrics_history.json`:

```json
{
  "runs": [
    {
      "date": "YYYY-MM-DD",
      "round": 1,
      "questions_analyzed": 320,
      "faqs_generated": 25,
      "faqs_published": 20,
      "faqs_rejected": 3,
      "test_accuracy": 45.0,
      "test_breakdown": {"ACERTOU": 10, "PARCIAL": 4, "GENERICO": 3, "ERROU": 2, "TIMEOUT": 1}
    }
  ]
}
```

## Atualizacao da Squad Memory

Atualize `_memory/memories.md` com:
- Data e resultados desta execucao
- Descobertas relevantes (gaps na KB, padroes novos)
- Ajustes recomendados para proxima rodada
