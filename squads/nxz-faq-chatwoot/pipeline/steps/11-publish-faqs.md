---
id: publish-faqs
agent: publisher
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/review-decisions.md
outputFile: squads/nxz-faq-chatwoot/output/publish_log.json
---

# Publicacao das FAQs no Help Center

## Objetivo

Publicar as FAQs aprovadas por Carol no Help Center do Chatwoot via API,
usando a skill chatwoot-publish.

## Instrucoes

1. Leia as decisoes de revisao (review-decisions.md)
2. Filtre apenas artigos com status APROVADO ou APROVADO_COM_EDICAO
3. Se nenhum artigo aprovado, encerre com mensagem informativa
4. Leia credenciais do .env
5. Siga o fluxo da skill chatwoot-publish:
   a. Obtenha author_id via GET /api/v1/profile
   b. Use o portal selecionado no checkpoint de configuracao
   c. Para cada FAQ aprovada:
      - Verifique se a categoria existe; se nao, crie
      - Verifique se o artigo ja existe (por slug ou article_id de log anterior)
      - Se existe: atualize via PUT (nao crie duplicata)
      - Se nao existe: crie via POST
      - Registre o article_id retornado
      - Atualize o frontmatter do arquivo .md com o article_id
   d. Verifique cada artigo publicado
6. Gere o log de publicacao

## Verificacao de Duplicatas

Antes de criar um artigo, verifique:
1. Busque no log anterior (`publish_log.json` de rodada anterior, se existir)
2. Liste artigos existentes no portal via API
3. Compare por slug
4. Se encontrar: use PUT para atualizar
5. Se nao encontrar: use POST para criar

## Notificacao de Conclusao

Apos publicar, envie notificacao via Telegram para Carol e Walter:

```
*Squad concluida: nxz-faq-chatwoot*
{N} FAQs publicadas no Help Center.
{N} atualizadas, {N} novas.
```

## Veto Conditions

- Nenhum artigo aprovado para publicacao
- Falha de autenticacao na API do Chatwoot
