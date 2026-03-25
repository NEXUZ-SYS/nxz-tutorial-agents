# Relatorio de QA — Chatwoot Captain (NXZ AI)

**Data do teste:** 2026-03-25
**Periodo testado:** 18/03/2026 a 25/03/2026
**Time:** Relacionamento
**Conversas coletadas:** 20
**Testes executados:** 10 (perguntas representativas dos temas encontrados)
**Assistant:** NXZ AI (ID: 3)
**Metodo de teste:** Copilot Threads API

---

## Resumo Executivo

O Captain NXZ AI obteve um score geral de **2.44/5.0**, com taxa de aprovacao de apenas **10%** (1 de 10 testes). O unico tema com resposta satisfatoria foi "Certificado Digital" (4.6/5.0), que possui documentacao detalhada na knowledge base. Os demais 9 temas receberam respostas genericas ou nenhuma resposta, indicando **gaps criticos na knowledge base**. As dimensoes mais fracas foram Resolucao (1.7) e Completude (1.7), significando que o Captain raramente consegue resolver a duvida do cliente sem escalar para um agente humano. A causa raiz e a falta de documentacao sobre funcionalidades basicas do NXZ ERP na knowledge base do Captain.

---

## Metricas Consolidadas

### Score Geral

```
Score Geral:     2.44 / 5.0  ❌ INSUFICIENTE
Taxa Aprovacao:  10% (1/10)
Threshold:       3.5 / 5.0
```

### Scores por Dimensao

| Dimensao | Media | Min | Max | Status |
|----------|-------|-----|-----|--------|
| Correcao | 2.3 | 1 | 5 | ❌ |
| Relevancia | 3.1 | 1 | 5 | ⚠️ |
| Tom | 3.3 | 1 | 4 | ⚠️ |
| Resolucao | 1.7 | 1 | 5 | ❌ |
| Completude | 1.7 | 1 | 4 | ❌ |

### Distribuicao Visual

```
Correcao     ██████░░░░░░░░░░░░░░  2.3/5
Relevancia   ████████████░░░░░░░░  3.1/5
Tom          █████████████░░░░░░░  3.3/5
Resolucao    █████░░░░░░░░░░░░░░░  1.7/5
Completude   █████░░░░░░░░░░░░░░░  1.7/5
```

---

## Analise Detalhada por Teste

| # | Tema | Correcao | Relevancia | Tom | Resolucao | Completude | Media | Status |
|---|------|----------|------------|-----|-----------|------------|-------|--------|
| 1 | Produto sumiu | 3 | 4 | 4 | 2 | 2 | 3.0 | ❌ |
| 2 | **Certificado digital** | **5** | **5** | **4** | **5** | **4** | **4.6** | **✅** |
| 3 | Impressora | 3 | 4 | 4 | 2 | 2 | 3.0 | ❌ |
| 4 | Senha | 3 | 4 | 4 | 2 | 2 | 3.0 | ❌ |
| 5 | Erro PDV | 2 | 3 | 3 | 1 | 1 | 2.0 | ❌ |
| 6 | NF devolucao | 1 | 2 | 3 | 1 | 1 | 1.6 | ❌ |
| 7 | Cadastro produto | 1 | 2 | 3 | 1 | 1 | 1.6 | ❌ |
| 8 | KDS | 3 | 4 | 4 | 2 | 2 | 3.0 | ❌ |
| 9 | Sangria | 1 | 1 | 1 | 1 | 1 | 1.0 | ❌ |
| 10 | Relatorio vendas | 1 | 2 | 3 | 1 | 1 | 1.6 | ❌ |

---

## Melhor Conversa: Certificado Digital (4.6/5.0) ✅

**Pergunta do cliente:** "Preciso atualizar o certificado digital para emitir nota fiscal. Qual o passo a passo?"

**Resposta do Captain:**
> Para atualizar o certificado digital no NXZ ERP e emitir nota fiscal, siga estes passos:
> 1. Abra o NXZ ERP no navegador e faca login com o usuario administrador.
> 2. Clique no icone de menu no canto superior esquerdo e selecione 'Faturamento'.
> 3. Na tela de Faturamento, clique em 'Configuracao' e depois em 'Atualizar Certificado Digital'.
> 4. Na janela que abrir, localize o campo 'A1 Arquivo'...

**Por que funcionou:** A knowledge base contem documentacao detalhada sobre certificado digital com caminhos de menu reais do NXZ ERP.

---

## Pior Conversa: Sangria (1.0/5.0) ❌

**Pergunta do cliente:** "Como faco para fazer uma sangria no caixa do PDV?"

**Resposta do Captain:** Nenhuma resposta gerada.

**Por que falhou:** Zero documentacao sobre sangria na knowledge base. O Captain nao conseguiu nem gerar uma resposta generica.

---

## Padroes de Falha Identificados

### 1. Gap massivo na Knowledge Base (causa raiz)
O Captain so consegue responder bem quando ha documentacao especifica. Dos 10 temas testados, apenas 1 (certificado digital) tem documentacao completa. Os outros 9 tem cobertura zero ou parcial.

### 2. Respostas genericas insuficientes
Quando nao encontra na KB, o Captain gera respostas genericas de troubleshooting que nao ajudam o cliente a resolver no NXZ ERP especificamente. "Verifique as configuracoes" sem dizer ONDE verificar e inutil.

### 3. Admissao de limitacao sem alternativa
Em 4 de 10 testes, o Captain respondeu "nao encontrei informacoes especificas". Isso frustra o cliente e desperdiça uma oportunidade de ao menos orientar parcialmente.

### 4. Confusao de nomenclatura
O Captain referenciou "NXZ AI" como nome do sistema em vez de "NXZ ERP", indicando possivel confusao entre o nome do assistant e o nome do produto.

---

## Gaps na Knowledge Base (priorizados por impacto)

### Prioridade Alta (funcionalidades basicas, alta demanda)
1. **Cadastro de produto** — Zero cobertura. Funcao basica do ERP.
2. **Relatorio de vendas** — Zero cobertura. Demanda diaria dos gerentes.
3. **Sangria no PDV** — Zero cobertura. Operacao frequente de caixa.
4. **NF de devolucao** — Zero cobertura. Operacao fiscal obrigatoria.

### Prioridade Media (troubleshooting frequente)
5. **Erro PDV / tela branca** — Zero cobertura. Problema recorrente.
6. **Recuperacao de senha** — Cobertura parcial. Falta procedimento NXZ especifico.
7. **Impressora termica** — Cobertura parcial. Faltam configuracoes NXZ.

### Prioridade Baixa (parcialmente cobertos)
8. **KDS** — Cobertura parcial. Faltam configuracoes especificas.
9. **Produto sumiu no PDV** — Cobertura parcial. Faltam caminhos de menu.

---

## Recomendacoes (priorizadas por impacto)

### 1. Criar documentacao para os 4 gaps de prioridade alta
**Impacto estimado:** Poderia elevar a taxa de aprovacao de 10% para ~50%
**Acao:** Criar artigos no Help Center para: cadastro de produto, relatorio de vendas, sangria no PDV, NF de devolucao. Cada artigo deve conter passo a passo com caminhos de menu reais do NXZ ERP.

### 2. Enriquecer documentacao dos 3 gaps de prioridade media
**Impacto estimado:** +15-20% na taxa de aprovacao
**Acao:** Adicionar troubleshooting especifico do NXZ para: erro PDV, recuperacao de senha, e configuracao de impressora termica.

### 3. Configurar fallback inteligente
**Impacto estimado:** Melhoria de tom e experiencia mesmo quando nao resolve
**Acao:** Nas instrucoes do Captain, configurar que quando nao encontrar resposta, ele ofereca: (a) link para base de conhecimento, (b) horario do suporte, (c) opcao de abrir ticket. Nunca responder apenas "nao encontrei informacoes".

### 4. Corrigir nomenclatura
**Acao rapida:** Nas instrucoes do Captain, clarificar que o produto e "NXZ ERP" (sistema de gestao), nao "NXZ AI".

### 5. Re-executar este teste apos implementar as recomendacoes
**Meta:** Atingir score geral >= 3.5 e taxa de aprovacao >= 60% na proxima rodada.

---

## Proximos Passos

1. Priorizar criacao dos 4 artigos de alta prioridade (1-2 semanas)
2. Re-rodar esta squad apos publicar os artigos
3. Expandir testes para os times Comercial e Implantacao
4. Considerar ativar o Captain como assistente (alem de roteador) para o time de Suporte
5. Estabelecer rotina de QA apos cada atualizacao da knowledge base

---

*Relatorio gerado pela squad NXZ Captain QA — Opensquad*
*Run: 2026-03-25-152501*
