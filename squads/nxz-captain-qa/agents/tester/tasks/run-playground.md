---
name: Executar Testes no Playground
order: 2
input: Cenarios de teste estruturados
output: Resultados dos testes com respostas do Captain
---

## Process

1. Ler credenciais e assistant_id
2. Para cada cenario, enviar mensagem ao Playground API
3. Capturar resposta do Captain
4. Documentar resultado (sucesso/falha)
5. Reportar progresso

## Output Format

JSON com pares de teste completos.

## Quality Criteria

- Todos os cenarios testados (ou documentadas razoes de falha)
- Respostas do Captain capturadas sem modificacao
- Progresso reportado a cada 10 testes

## Veto Conditions

- Menos de 50% dos testes executados
- API com falhas persistentes nao reportadas
