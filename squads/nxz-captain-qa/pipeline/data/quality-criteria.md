# Quality Criteria: Captain QA

## Rubrica de Avaliacao (5 dimensoes, escala 1-5)

### 1. Correcao (Faithfulness)
| Score | Descricao |
|-------|-----------|
| 5 | Perfeitamente correta, sem erros factuais |
| 4 | Correta com detalhes minimos faltando |
| 3 | Parcialmente correta, info principal presente mas incompleta |
| 2 | Contem erros significativos |
| 1 | Completamente incorreta ou fabricada |

### 2. Relevancia (Answer Relevancy)
| Score | Descricao |
|-------|-----------|
| 5 | Totalmente relevante, responde exatamente o que foi perguntado |
| 4 | Relevante com informacao extra desnecessaria |
| 3 | Parcialmente relevante, desvia do assunto |
| 2 | Pouco relevante |
| 1 | Irrelevante |

### 3. Tom (Tone Appropriateness)
| Score | Descricao |
|-------|-----------|
| 5 | Tom perfeito: empatico, profissional, alinhado ao time |
| 4 | Tom adequado com pequenas melhorias possiveis |
| 3 | Tom neutro, sem personalizacao |
| 2 | Levemente inadequado (frio, robotico, ou casual demais) |
| 1 | Inaceitavel (rude, condescendente, inapropriado) |

### 4. Resolucao (Task Completion)
| Score | Descricao |
|-------|-----------|
| 5 | Resolucao completa, cliente nao precisaria de mais nada |
| 4 | Quase completa, talvez 1 follow-up necessario |
| 3 | Parcial, cliente precisaria de mais interacoes |
| 2 | Insuficiente, escalacao necessaria |
| 1 | Nao resolve nada, escalacao obrigatoria |

### 5. Completude (Completeness)
| Score | Descricao |
|-------|-----------|
| 5 | Cobre tudo, incluindo dicas e proximos passos |
| 4 | Cobre os pontos principais |
| 3 | Cobre o basico mas omite detalhes importantes |
| 2 | Muitas omissoes |
| 1 | Extremamente incompleta |

## Thresholds de Classificacao

- **APROVADO**: Score medio >= 3.5
- **REPROVADO**: Score medio < 3.5

## Regras de Avaliacao

1. Sempre escrever reasoning ANTES do score (G-Eval pattern)
2. Comparar contra resposta de referencia, nao expectativa ideal
3. Considerar contexto do time ao avaliar tom
4. Auto-fail: score 1 em Correcao reprova automaticamente
