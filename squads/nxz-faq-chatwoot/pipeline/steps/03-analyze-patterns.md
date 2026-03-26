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

Tambem gere um arquivo Markdown estruturado para revisao humana e para o writer.
O Markdown deve incluir, para cada topico, os exemplos representativos com as
mensagens de role "customer" formatadas como blockquotes e o context_conversation
em formato de lista — isso da ao writer e a Carol material suficiente para
entender o problema real sem depender das respostas dos agentes.

- outputFile adicional: squads/nxz-faq-chatwoot/output/topics-to-generate.md

### Formato do topics-to-generate.md

O arquivo deve seguir EXATAMENTE esta estrutura para que o writer consiga
parsear sem ambiguidade. Use os delimitadores de secao conforme indicado.

```markdown
# Topicos para Geracao de FAQ
**Gerado em:** YYYY-MM-DD

---

## Tabela Resumo

| # | Produto | Tema | Frequencia | Acao |
|---|---------|------|-----------|------|
| 1 | NXZ ERP | Abertura de caixa | 15 | Criar |
| 2 | NXZ Go | Configurar cardapio | 8 | Atualizar |

---

## Detalhamento por Topico

<!-- TOPICO_INICIO -->
### Topico 1 — NXZ ERP: Abertura de caixa

**Produto:** NXZ ERP
**Tema:** Abertura de caixa
**Frequencia:** 15 conversas
**Acao:** Criar

#### Exemplos Representativos

##### Conversa #12345

**Contexto**
- **Problema principal:** Cliente nao conseguia abrir o caixa no PDV — aparecia mensagem de sem permissao.
- **Produto / Funcionalidade:** NXZ ERP — Abertura de Caixa no PDV
- **Causa raiz:** Perfil do operador sem permissao de abertura de caixa configurada.
- **Resolucao:** Ajuste de permissao em Configuracoes > Caixa. Cliente confirmou resolucao.
- **Observacoes:** Recorrente em implantacoes recentes.

**Conversa**

> **[cliente — 10:30]** Ola, estou com problema pra abrir o caixa

> **[agente — 10:31]** Boa tarde. Como posso ajudar?

> **[cliente — 10:32]** Aparece que nao tenho permissao

> **[agente — 10:35]** Qual o erro exato que aparece na tela?

> **[cliente — 10:36]** "Operador sem permissao de abertura"

---

##### Conversa #12389

**Contexto**
- **Problema principal:** ...
- **Produto / Funcionalidade:** ...
- **Causa raiz:** ...
- **Resolucao:** ...
- **Observacoes:** ...

**Conversa**

> **[cliente — HH:MM]** ...

---

<!-- TOPICO_FIM -->

<!-- TOPICO_INICIO -->
### Topico 2 — NXZ Go: Configurar cardapio

...

<!-- TOPICO_FIM -->
```

**Regras de formatacao do topics-to-generate.md:**

- Cada topico deve comecar com `<!-- TOPICO_INICIO -->` e terminar com `<!-- TOPICO_FIM -->`
- O titulo de cada topico segue o padrao: `### Topico N — {Produto}: {Tema}`
- Os campos **Produto**, **Tema**, **Frequencia** e **Acao** devem aparecer em negrito logo apos o titulo
- Mensagens de clientes e agentes devem ser formatadas como blockquotes com `> **[role — HH:MM]** texto`
- O context_conversation deve ser uma lista de bullets com labels em negrito
- Separadores `---` devem aparecer entre conversas e entre topicos
- NAO incluir JSON em nenhuma parte deste arquivo

Lembrete para o writer: as mensagens de role "agent" dentro dos exemplos estao
presentes apenas para dar contexto da conversa. O conteudo das FAQs deve ser
derivado exclusivamente das mensagens de role "customer" e do context_conversation.

## Veto Conditions

- Nenhum tema com 3+ ocorrencias identificado
- Arquivo de conversas vazio ou corrompido
- Campo context_conversation ausente em todas as conversas
- Array messages ausente ou vazio em todas as conversas
