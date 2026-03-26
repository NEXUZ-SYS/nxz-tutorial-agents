---
id: analyze-patterns
agent: analyst
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/extracted-conversations.json
outputFile: squads/nxz-faq-chatwoot/output/pattern-report.md
---

# Analise de Padroes

## Objetivo

Agrupar conversas dos clientes por tema e produto, ranquear por frequencia,
e identificar lacunas na base de conhecimento do Help Center.

O insumo principal para identificar temas sao as mensagens com role "customer"
dentro do campo messages e o campo context_conversation. As mensagens com role
"agent" podem ser consultadas para desambiguacao quando o contexto estiver
ambiguo, mas NUNCA devem ser usadas como base para o conteudo de FAQs.

## Instrucoes

1. Leia o arquivo de conversas extraidas (extracted-conversations.json)
2. Para cada conversa, use as mensagens de role "customer" do array messages
   e o context_conversation para identificar o problema central
3. Agrupe semanticamente por tema dentro de cada produto
   - Conversas como "como abro o caixa", "abertura de caixa", "pra abrir o pdv"
     sao o MESMO tema
   - Use context_conversation.problema_principal para resolver ambiguidades:
     uma pergunta vaga como "nao funciona" pode ser sobre impressora ou sobre
     login — o campo problema_principal resolve
   - Use context_conversation.produto_funcionalidade para garantir que temas
     identicos em produtos diferentes sejam contados separadamente
4. Conte a frequencia de cada tema (1 conversa = 1 ocorrencia)
5. Descarte temas com menos de 3 ocorrencias
6. Verifique FAQs ja publicadas no Help Center do Chatwoot:
   a. Liste artigos existentes via API: GET /api/v1/accounts/{account_id}/portals/{slug}/articles
   b. Compare com temas identificados
   c. Marque: "Criar" (sem FAQ), "Atualizar" (FAQ desatualizada), "Adequada" (ja coberta)
7. Respeite o limite de FAQs por produto definido na configuracao
8. Gere o relatorio de padroes no formato Markdown

## Formato de Saida (pattern-report.md)

```markdown
# Analise de Padroes — {data}

## Resumo
- Periodo: {periodo}
- Conversas analisadas: {N}
- Temas identificados: {N}
- Temas para gerar FAQ: {N}
- Temas ja cobertos: {N}

## Temas Priorizados por Produto

### NXZ ERP
| # | Tema | Frequencia | Status | Acao |
|---|------|-----------|--------|------|
| 1 | Abertura de caixa | 15 conversas | Sem FAQ | Criar |

### NXZ Go
...
```

Tambem gere um arquivo JSON estruturado para o writer.
O JSON deve incluir, para cada topico, os exemplos representativos usando o
campo messages completo (com role, time e text) e o context_conversation
estruturado — isso da ao writer material suficiente para entender o problema
real sem depender das respostas dos agentes.

- outputFile adicional: squads/nxz-faq-chatwoot/output/topics-to-generate.json

### Formato do topics-to-generate.json

```json
{
  "generated_at": "YYYY-MM-DD",
  "topics": [
    {
      "product": "NXZ ERP",
      "theme": "Abertura de caixa",
      "frequency": 15,
      "action": "Criar",
      "representative_examples": [
        {
          "conversation_id": 12345,
          "messages": [
            {"role": "customer", "time": "10:30:15.123", "text": "Ola"},
            {"role": "agent", "time": "10:31:02.456", "text": "Boa tarde. Como posso ajudar?"},
            {"role": "customer", "time": "10:32:45.789", "text": "Estou com problema pra abrir o caixa"},
            {"role": "agent", "time": "10:35:10.012", "text": "Qual o erro que aparece?"},
            {"role": "customer", "time": "10:36:22.301", "text": "Aparece que nao tenho permissao"}
          ],
          "context_conversation": {
            "problema_principal": "Cliente nao conseguia abrir o caixa no PDV — aparecia mensagem de sem permissao.",
            "produto_funcionalidade": "NXZ ERP — Abertura de Caixa no PDV",
            "causa_raiz": "Perfil do operador sem permissao de abertura de caixa configurada.",
            "resolucao": "Ajuste de permissao em Configuracoes > Caixa. Cliente confirmou resolucao.",
            "observacoes": "Recorrente em implantacoes recentes."
          }
        }
      ]
    }
  ]
}
```

Lembrete para o writer: as mensagens com role "agent" dentro do campo messages
dos exemplos estao presentes apenas para dar contexto da conversa. O conteudo
das FAQs deve ser derivado exclusivamente das mensagens com role "customer" e
do context_conversation.

## Veto Conditions

- Nenhum tema com 3+ ocorrencias identificado
- Arquivo de conversas vazio ou corrompido
- Campo context_conversation ausente em todas as conversas
- Array messages ausente ou vazio em todas as conversas
