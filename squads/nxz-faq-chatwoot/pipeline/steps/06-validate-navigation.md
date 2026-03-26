---
id: validate-navigation
agent: tester
execution: inline
inputFile: squads/nxz-faq-chatwoot/output/faqs_index.md
outputFile: squads/nxz-faq-chatwoot/output/navigation-validation-report.md
---

# Validacao de Navegacao via Playwright

## Objetivo

Verificar, diretamente no produto NXZ, se os caminhos de menu e instrucoes
de navegacao descritos nos artigos FAQ existem de fato. Esta etapa impede
que o Help Center publique instrucoes incorretas que confundem os clientes.

## Pre-requisito: Acesso ao Produto

Antes de qualquer validacao, verifique se voce tem acesso ao produto:

1. Leia `_opensquad/_memory/company.md` para encontrar URLs dos produtos NXZ.
2. Verifique se ha sessao salva no browser profile para o produto.
3. Tente navegar ate a tela de login de cada produto que precisa ser validado.

**Se NAO tiver acesso a um produto** (sem URL configurada, sem sessao, login
bloqueado), siga o protocolo abaixo antes de continuar.

### Protocolo quando nao ha acesso ao produto

#### 1. Enviar notificacao Telegram (ANTES de exibir no terminal)

Siga o protocolo de notificacao Telegram definido em
`pipeline/data/telegram-notification-protocol.md` com os seguintes parametros:

- ETAPA: "Validacao de Navegacao"
- DESCRICAO: "O tester nao tem acesso ao produto para validar caminhos de menu.\nProduto bloqueado: [produto]\nArtigos afetados: [lista resumida]\n\nOpcoes:\n(a) Fornecer URL e credenciais de acesso\n(b) Fornecer os caminhos corretos manualmente\n(c) Marcar como requer revisao manual e continuar"
- ARQUIVO: "" (vazio)

Substitua `[produto]` e `[lista resumida]` pelos valores reais.

#### 2. Exibir mensagem no terminal

```
=====================================================
AGUARDANDO INPUT: Acesso ao Produto
=====================================================
Preciso validar caminhos de navegacao para [produto], mas nao tenho acesso.

Artigos que dependem desta validacao:
- [lista dos artigos afetados]

Deseja:
(a) Fornecer a URL e credenciais de acesso para eu validar agora
(b) Fornecer os caminhos corretos manualmente (eu atualizo os artigos)
(c) Marcar estes artigos como "requer revisao manual" e continuar sem validacao

Qual a sua preferencia?
=====================================================
Aguardando sua resposta:
```

#### 3. Aguardar resposta do usuario no terminal

Apos enviar a notificacao e exibir a mensagem, aguarde resposta antes de continuar.

---

## Instrucoes

1. Leia o `output/faqs_index.md` e filtre artigos com `navigation_validated: false`
   e `navigation_source` diferente de `manual_user_input`.
2. Para cada artigo a validar:
   a. Extraia todos os caminhos de menu mencionados no corpo do artigo.
      Exemplo: "Acesse Configuracoes > Ponto de Venda > Impressora"
   b. Abra o produto via Playwright.
   c. Navegue pelo caminho exato descrito, passo a passo.
   d. Registre o resultado: CONFIRMADO, INCORRETO ou NAO_ENCONTRADO.
3. Para caminhos INCORRETO ou NAO_ENCONTRADO:
   a. Explore o produto para encontrar o caminho correto.
   b. Se encontrar: registre o caminho correto e atualize o artigo.
   c. Se nao encontrar em 3 tentativas: marque como `REQUER_REVISAO_MANUAL`
      e registre o que foi tentado.
4. Atualize cada artigo FAQ com os caminhos validados ou corretos.
5. Atualize o frontmatter de cada artigo:
   - `navigation_validated: true` se todos os caminhos foram confirmados ou corrigidos
   - `navigation_validated: false` se algum caminho ficou sem resolver
6. Gere o relatorio de validacao.

## Regras de Navegacao Playwright

- Use seletores semanticos: aria-label, texto visivel, role — NUNCA seletor por classe CSS
- Tire screenshot de cada passo de navegacao bem-sucedida (salvar em `output/screenshots/nav/`)
- Tire screenshot quando um caminho nao e encontrado (evidencia do que foi tentado)
- Se uma tela demorar mais de 10s para carregar, tente uma vez; se falhar novamente,
  registre como TIMEOUT e siga para o proximo caminho
- Nao faca alteracoes no produto durante a validacao — apenas navegacao de leitura

## Formato do Relatorio (navigation-validation-report.md)

```markdown
# Relatorio de Validacao de Navegacao — {data}

## Resumo
- Artigos validados: {N}
- Caminhos verificados: {N}
- Confirmados: {N}
- Corrigidos automaticamente: {N}
- Requer revisao manual: {N}
- Artigos sem acesso ao produto: {N}

## Detalhes por Artigo

### {titulo-do-artigo}
- Arquivo: output/faqs/{path}.md
- Status final: VALIDADO | CORRIGIDO | REQUER_REVISAO_MANUAL | SEM_ACESSO

#### Caminhos verificados:
| Caminho Original | Resultado | Caminho Corrigido |
|------------------|-----------|-------------------|
| Config > PdV > Impressora | INCORRETO | Configuracoes > Perifericos > Impressora Fiscal |

#### Screenshots: output/screenshots/nav/{slug}/

---
```

## O que fazer com artigos que ficam NAO validados

Artigos com `navigation_validated: false` ao final desta etapa recebem
automaticamente a flag `needs_expert_review: true` e aparecem no
checkpoint de revisao da Carol com o status `REQUER_REVISAO_NAVEGACAO`.

Carol pode entao:
- Aprovar mesmo assim (assumindo a responsabilidade pelos caminhos)
- Fornecer os caminhos corretos para o squad corrigir antes de publicar
- Rejeitar o artigo para esta rodada

## Veto Conditions

- Nao conseguiu abrir o Playwright para nenhum produto (falha de ambiente)
  -> Neste caso, NAO aborte o pipeline. Marque TODOS os artigos com
     navegacao como `navigation_validated: false` e notifique o usuario.
     O pipeline continua para o checkpoint de revisao onde Carol decide.
