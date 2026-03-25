# Anti-Patterns: Captain QA Testing

## Na Coleta de Dados

1. **Ignorar paginacao**: API retorna max 20 mensagens. Nao paginar = dados incompletos.
2. **Coletar conversas em andamento**: Conversas nao resolvidas tem dados incompletos.
3. **Nao classificar sender_type**: Confundir mensagens do Captain com agente humano invalida o teste.
4. **Ignorar rate limits**: 3000 req/min. Exceder = bloqueio temporario.

## Na Preparacao de Cenarios

5. **Testar com saudacoes**: "Oi", "Bom dia" nao sao perguntas testáveis.
6. **Ignorar contexto**: Enviar pergunta sem historico pode gerar resposta diferente.
7. **Cenarios sem referencia**: Sem resposta de referencia, nao ha como avaliar.

## Na Avaliacao

8. **Output-Only Evaluation**: Avaliar so a resposta final, ignorando se o Captain usou as ferramentas certas.
9. **Self-Grading Bias**: Usar o mesmo modelo para gerar e avaliar. Infla scores em 15-25%.
10. **Single-Point Aggregation**: Media unica esconde dimensoes criticas com score baixo.
11. **Score sem justificativa**: Notas sem reasoning sao inconsistentes e nao auditaveis.
12. **Rubrica rigida demais**: Penalizar respostas corretas mas com abordagem diferente da referencia.

## No Relatorio

13. **Dados sem contexto**: Apresentar numeros sem explicar o que significam.
14. **Problemas sem solucao**: Listar falhas sem recomendacoes acionaveis.
15. **Ignorar dados negativos**: Omitir resultados ruins para parecer positivo.

## Na Operacao

16. **Avaliacao unica**: Tratar como gate de deploy, nao como processo continuo.
17. **Benchmark obsoleto**: Usar golden dataset desatualizado apos mudancas no produto.
18. **Amostra enviesada**: Selecionar conversas "interessantes" ao inves de amostra aleatoria.
