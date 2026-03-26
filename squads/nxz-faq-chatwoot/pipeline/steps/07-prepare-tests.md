---
id: prepare-tests
agent: curator
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/faqs_index.md
outputFile: squads/nxz-faq-chatwoot/output/test_plan.json
---

# Preparacao para Teste

## Objetivo

Selecionar perguntas representativas dos clientes para testar o agente de IA
do Chatwoot. Cada pergunta e mapeada a uma FAQ esperada como resposta.

## Instrucoes

1. Leia as FAQs geradas (indice + arquivos individuais)
2. Leia as perguntas originais dos clientes (extracted-questions.json)
3. Para cada FAQ gerada, selecione 1-2 perguntas reais correspondentes
4. Use a formulacao REAL do cliente (nao a pergunta canonica/reformulada)
5. Distribua equilibradamente entre produtos
6. Maximo: 20 perguntas total
7. Mapeie cada pergunta a FAQ esperada
8. Gere o plano de teste

## Criterios de Selecao

1. Prioridade por frequencia (temas mais perguntados primeiro)
2. Cobertura de produto (ao menos 1 pergunta por produto com FAQ)
3. Variedade de formulacao (incluir formas diferentes de perguntar)
4. Usar formulacao real do cliente (erros de digitacao, informalidade ok)

## Formato de Saida

Ver formato em `agents/curator.agent.md`

## Veto Conditions

- Menos de 5 perguntas selecionadas
- Nenhuma correspondencia entre perguntas e FAQs
