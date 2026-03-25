# Research Brief: NXZ Captain QA

## Domain 1: AI Agent Evaluation Frameworks

### Key Frameworks
- **RAGAS**: Retrieval-Augmented Generation Assessment. Metricas: Faithfulness, Answer Relevancy, Contextual Precision/Recall.
- **G-Eval**: LLM-as-judge com Chain-of-Thought. Gera reasoning antes do score.
- **DeepEval**: Framework open-source com metricas customizaveis.

### Rubrica Adotada (5 dimensoes, escala 1-5)
1. Correcao (Faithfulness)
2. Relevancia (Answer Relevancy)
3. Tom (Tone Appropriateness)
4. Resolucao (Task Completion)
5. Completude (Completeness)

### Golden Dataset
Conversas reais do Chatwoot servem como golden dataset. A resposta do agente humano e a referencia (ground truth).

## Domain 2: Customer Support Quality Metrics

### KPIs Relevantes
- FCR (First Contact Resolution): resolvido no primeiro contato
- Taxa de deflecao: resolvido pelo Captain sem humano
- CSAT: satisfacao do cliente

### QA Scorecard (4C Model)
- Communication (25%): clareza, tom, voz da marca
- Customer Connection (25%): empatia, personalizacao
- Compliance (25%): procedimentos, SLA
- Correct Content (25%): acuracia, completude

## Domain 3: Chatwoot API

### Endpoints Utilizados
- Teams: GET /api/v1/accounts/{id}/teams
- Filter: POST /api/v1/accounts/{id}/conversations/filter
- Messages: GET /api/v1/accounts/{id}/conversations/{id}/messages
- Playground: POST /api/v1/accounts/{id}/captain/assistants/{id}/playground

### Paginacao de Mensagens
Max 20 por request. Usar ?before={message_id} para paginas anteriores.

### Identificacao de Sender
- Contact = cliente
- User = agente humano
- Captain::Assistant = resposta do Captain
