# Domain Framework: Captain QA Testing

## Fluxo Operacional

### 1. Configuracao
- Selecionar time(s), periodo, volume de conversas
- Validar credenciais da API do Chatwoot
- Identificar assistant_id do Captain

### 2. Coleta de Dados
- Filtrar conversas por team_id e created_at
- Extrair todas as mensagens de cada conversa
- Classificar por sender_type (cliente, agente, captain, activity)
- Identificar handoffs (Captain -> humano)

### 3. Preparacao de Cenarios
- Extrair primeira pergunta substantiva do cliente
- Parear com resposta de referencia (agente humano ou Captain original)
- Incluir contexto de mensagens anteriores

### 4. Execucao de Testes
- Enviar pergunta do cliente ao Playground API do Captain
- Capturar resposta gerada
- Documentar falhas de API

### 5. Avaliacao (G-Eval Pattern)
Para cada par de teste:
1. Ler pergunta, resposta do Captain, resposta de referencia
2. Para cada dimensao: raciocinar (CoT) -> comparar -> pontuar
3. Score 1-5 com justificativa
4. Classificar: APROVADO (>= 3.5) ou REPROVADO (< 3.5)

### 6. Agregacao de Metricas
- Media por dimensao por time
- Taxa de aprovacao por time
- Identificacao de padroes de falha
- Gaps na knowledge base

### 7. Relatorio
- Resumo executivo
- Metricas por time (tabelas)
- Analise detalhada com exemplos
- Recomendacoes priorizadas

## Thresholds

| Score | Classificacao | Acao |
|-------|--------------|------|
| >= 4.0 | Excelente | Captain pronto para producao |
| 3.5-3.9 | Bom | Pequenos ajustes necessarios |
| 3.0-3.4 | Regular | Ajustes significativos |
| < 3.0 | Insuficiente | Revisao completa necessaria |
