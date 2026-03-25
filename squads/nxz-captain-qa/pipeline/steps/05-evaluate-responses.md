---
id: evaluate-responses
agent: evaluator
execution: inline
inputFile: squads/nxz-captain-qa/output/test-results.json
outputFile: squads/nxz-captain-qa/output/evaluation-results.json
---

# Avaliacao das Respostas

## Objetivo

Avaliar cada par de teste usando uma rubrica de 5 dimensoes, gerando scores individuais
e metricas agregadas por time.

## Instrucoes

1. Leia os resultados dos testes
2. Para cada par de teste, avalie nas 5 dimensoes (escala 1-5):

### Rubrica de Avaliacao

**Correcao (Faithfulness)** — A resposta do Captain e factualmente correta?
- 5: Perfeitamente correta, sem erros
- 4: Correta com detalhes minimos faltando
- 3: Parcialmente correta, informacao principal presente mas incompleta
- 2: Contem erros significativos
- 1: Completamente incorreta ou fabricada

**Relevancia (Answer Relevancy)** — A resposta e relevante a pergunta?
- 5: Totalmente relevante, responde exatamente o que foi perguntado
- 4: Relevante com informacao extra desnecessaria
- 3: Parcialmente relevante, desvia do assunto
- 2: Pouco relevante
- 1: Irrelevante, nao responde a pergunta

**Tom (Tone Appropriateness)** — O tom e adequado ao time e contexto?
- 5: Tom perfeito, empatico, profissional, alinhado ao time
- 4: Tom adequado com pequenas melhorias possiveis
- 3: Tom neutro, sem personalizacao
- 2: Tom levemente inadequado (frio, robotico, ou casual demais)
- 1: Tom inaceitavel (rude, condescendente, ou inapropriado)

**Resolucao (Task Completion)** — O Captain resolveria sem escalar?
- 5: Resolucao completa, cliente nao precisaria de mais nada
- 4: Quase completa, talvez 1 follow-up necessario
- 3: Parcial, cliente precisaria de mais interacoes
- 2: Insuficiente, escalacao necessaria
- 1: Nao resolve nada, escalacao obrigatoria

**Completude (Completeness)** — A resposta cobre todos os pontos necessarios?
- 5: Cobre tudo, incluindo dicas e proximos passos
- 4: Cobre os pontos principais
- 3: Cobre o basico mas omite detalhes importantes
- 2: Muitas omissoes
- 1: Extremamente incompleta

3. Calcule scores agregados por time e geral
4. Identifique padroes: tipos de pergunta onde o Captain falha mais
5. Classifique cada conversa como: APROVADA (score >= 3.5) ou REPROVADA (score < 3.5)

## Formato de Saida

JSON com scores individuais por conversa e metricas agregadas por time.

## Veto Conditions

- Avaliacao de menos de 80% das conversas
- Scores sem justificativa (reasoning)
