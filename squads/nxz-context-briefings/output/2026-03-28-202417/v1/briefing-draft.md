# Briefing de Contexto: NXZ Go — Totem de Autoatendimento

> Versao: v1.0 | Data: 2026-03-28 | Publico: Marketing + Vendas | Nivel: Operacional

## Metadata

- **Produto:** NXZ Go — Modo Totem (Autoatendimento)
- **Categoria:** App de Autoatendimento (Android)
- **Versao atual:** 5.13.1
- **Publico-Alvo do Briefing:** Marketing + Vendas
- **Nivel Organizacional:** Operacional
- **Objetivo:** Contexto para geracao de conteudo de marketing e vendas
- **Modelo Comercial:** Parte do ecossistema NXZ (vendido com NXZ ERP)
- **Produtos Relacionados:**
  - NXZ ERP — backend (catalogo, precos, whitelabel, fiscal, estoque)
  - NXZ Go PDV — caixa do operador (mesmo app, modo diferente)
  - NXZ Go KDS — tela de cozinha (recebe pedidos do totem)
  - NXZ Go Smart POS — maquininha (mesmo app em outro hardware)

---

## 1. Identidade do Produto

### O que e

O NXZ Go Totem e um app de autoatendimento que transforma qualquer tablet Android em um totem de pedido com a marca do cliente. O consumidor faz o pedido, personaliza, paga e recebe o numero — sem precisar de atendente.

### Problema que resolve

Filas no caixa, pedidos errados por falta de clareza, equipe presa no balcao e ticket medio baixo porque o cliente pede rapido sem explorar o cardapio. O resultado: clientes impacientes, vendas perdidas e equipe sobrecarregada fazendo trabalho que o cliente poderia fazer sozinho.

### Proposta de valor

O totem libera a equipe, elimina filas e aumenta o ticket medio. O cliente explora o cardapio visual com calma, personaliza o pedido do jeito dele, paga com cartao ou Pix e recebe o numero. O pedido vai direto pra cozinha em 2 segundos. E tudo com a marca do estabelecimento — cores, logo, promocoes. Ninguem sabe que e tecnologia NXZ.

**Exemplo:** Cafeteria instala totem na entrada. Antes: 1 atendente no caixa, fila de 5 pessoas, cliente pede "um cafe" sem olhar o cardapio. Depois: cliente navega pelo totem, descobre os smoothies, adiciona um bowl de acai, paga R$ 34,90 em vez dos R$ 6,50 do cafe. Ticket medio sobe 400%. Atendente que ficava no caixa agora ajuda na producao.

---

## 2. Publico-Alvo do Produto

### Quem usa o totem

| Persona | Relacao com o totem |
|---------|-------------------|
| **Consumidor final** | Faz o pedido, personaliza, paga — usuario direto |
| **Gerente de operacao** | Configura visual (whitelabel), cardapio e horarios no ERP |
| **Proprietario** | Decide o posicionamento, aprova a identidade visual, monitora resultados |
| **Equipe de cozinha** | Recebe os pedidos do totem no KDS |

### Perfil do consumidor no totem

- Quer rapidez e autonomia — nao quer esperar na fila
- Prefere navegar visualmente pelo cardapio com imagens
- Se sente confortavel com telas touch (smartphone generation)
- Explora mais opcoes do que pediria no balcao (cardapio visual estimula)
- Pode ter dificuldade com pagamento eletronico (por isso existe "pagar no caixa")

**Exemplo — Consumidor:**
Ana entra na cafeteria na hora do almoco. Fila de 8 pessoas no caixa. Ela vai ao totem, toca na tela (screensaver mostra o combo do dia), navega por "Acai & Bowls", seleciona "Bowl Grande", adiciona extra granola e whey, paga com cartao contactless. Numero 47. Ela senta, e em 4 minutos ouve: "Pedido 47 pronto". Sem fila, sem pressa, pedido exatamente como queria.

---

## 3. Funcionalidades Principais

### 3.1 Whitelabel — Sua Marca, Nao a Nossa

O diferencial central do totem: tudo exibe a marca do estabelecimento.

**O que e personalizavel:**
- **Cores:** primaria, header, footer, gradientes, botoes, textos — tudo via painel Odoo
- **Logo:** centralizado na tela de boas-vindas
- **Textos:** mensagem de boas-vindas ("Bem-vindo ao No. Coffee"), texto do botao de pedido, mensagem de sucesso
- **Screensaver:** slideshow de imagens promocionais com duracao configuravel
- **GIF de sucesso:** animacao exibida quando o pedido e finalizado
- **Comportamentos:** ocultar tempo de espera, pular selecao de NF, ocultar impressao

**Para marketing:** O screensaver e marketing gratuito. Promocoes, combos, novidades — rodando na tela 24 horas. Quando o totem esta ocioso, ele vende. Quando o cliente toca, ele vende. Nunca para.

**Exemplo:** No. Coffee configura o totem com: logo No. Coffee centralizado, cores em tons de verde e marrom, boas-vindas "Bem-vindo ao No. Coffee", screensaver com 3 imagens rotativas (combo smoothie+bowl, nova linha de shots, programa de fidelidade). Tempo de cada imagem: 5 segundos. Nenhuma referencia a "NXZ" ou "Nexuz" em lugar nenhum.

### 3.2 Screensaver como Ferramenta de Marketing

Quando ninguem esta usando o totem, ele se transforma em um ponto de midia:

- **Slideshow automatico:** imagens promocionais rotativas com duracao configuravel
- **Ativacao:** apos 20 segundos de inatividade
- **Texto sobreposto:** "Toque para iniciar" convida o proximo cliente
- **Retorno:** qualquer toque na tela inicia novo pedido

**Para vendas:** "O totem nao fica parado. Quando ninguem esta pedindo, ele esta exibindo suas promocoes. E marketing trabalhando 24 horas, sem custo extra."

### 3.3 Fluxo Completo do Pedido

O cliente percorre 6 etapas visuais:

```
Screensaver → Boas-vindas → Catalogo → Carrinho → Pagamento → Sucesso
```

**Etapa 1 — Screensaver:** Imagens promocionais rotativas. Toque para iniciar.

**Etapa 2 — Boas-vindas:** Logo do estabelecimento, mensagem customizada, tempo estimado de espera (ex: "03 min"), botao "Novo Pedido".

**Etapa 3 — Catalogo:** Categorias visuais na lateral (Smoothies, Bowls, Quentes...) + grid de produtos com imagens. Busca por nome. Toque para ver detalhes e personalizar.

**Etapa 4 — Personalizacao:** Tela fullscreen por produto — tamanhos, sabores, adicionais. Controle de quantidade (+/-). Preco atualizado em tempo real. Baseado na ficha tecnica (BOM) do ERP.

**Etapa 5 — Carrinho/Revisao:** Lista de itens, quantidades, notas. Subtotal, desconto (se cupom), gorjeta e total. Steps visuais: Revisao → NF → Pagamento.

**Etapa 6 — Pagamento:** Cartao (Stone, Cielo, PagBank, SumUp, Pagarme), Pix (QR code na tela) ou "Pagar no caixa".

**Etapa 7 — Sucesso:** Numero do pedido, GIF animado, mensagem customizada, countdown de 10 segundos. Opcao de imprimir recibo ou fazer novo pedido.

**Exemplo — Fluxo completo:**
1. Totem mostra screensaver com combo do dia
2. Cliente toca → ve "Bem-vindo ao No. Coffee" com logo
3. Toca "Novo Pedido" → catalogo com 10 categorias visuais
4. Seleciona "Booster Smoothie" → personaliza: tamanho grande, extra whey, sem banana
5. Adiciona "Shot de Gengibre" ao carrinho
6. Revisa: 1x Booster Smoothie Grande (R$ 22,90) + 1x Shot Gengibre (R$ 8,90) = R$ 31,80
7. Paga com cartao contactless na maquininha acoplada
8. Tela: "Pedido #47 — Obrigado! Retire no balcao" + GIF de sucesso
9. Pedido aparece no KDS da cozinha em 2 segundos

### 3.4 Pagamentos no Totem

O totem e focado em pagamento eletronico — sem manuseio de dinheiro.

| Metodo | Disponibilidade |
|--------|----------------|
| **Cartao (credito/debito)** | Stone, Cielo, PagBank, SumUp, Pagarme |
| **Pix** | QR code exibido na tela |
| **Pagar no caixa** | Pedido salvo como draft, cliente paga no balcao |
| **Dinheiro** | Oculto por padrao (configuravel) |

A opcao **"Pagar no caixa"** e a valvula de escape: se o pagamento eletronico falha, o pedido e salvo e enviado para a cozinha como draft. O cliente vai ao caixa, paga, e o pedido ja esta sendo preparado.

**Para vendas:** "Ninguem abandona o pedido. Se o cartao nao passa, o cliente vai ao caixa e paga la. O pedido ja foi pra cozinha — zero perda."

### 3.5 Sessao Automatica

O totem abre e fecha sozinho, sem intervencao humana.

- **Abertura automatica:** configuravel por horario (ex: 7h)
- **Fechamento automatico:** configuravel por horario (ex: 22h)
- **Re-abertura automatica:** se configurado, reopen apos fechamento

**Para vendas:** "O totem opera sozinho. Configura o horario e esquece. Nenhum funcionario precisa abrir ou fechar caixa do totem."

### 3.6 Catalogo Visual

10 categorias food service com imagens, organizadas no ERP:

| Seq. | Categoria |
|------|-----------|
| 0 | Novidades |
| 1 | Timeless Smoothies |
| 2 | Booster Smoothies |
| 3 | Gelada |
| 4 | Refreshing Smoothies |
| 5 | Quente |
| 6 | Sucos |
| 7 | Shots |
| 8 | Acai & Bowls |
| 9 | Para comer |

- Categorias com imagens (display visual)
- Busca por nome com debounce
- Leitor de codigo de barras (se configurado)
- Multiplicador de quantidade rapido (1x, 2x, 3x, 5x, 10x)
- 205 produtos cadastrados no sistema

### 3.7 Seguranca e Estabilidade

O totem opera sem supervisao constante — precisa ser robusto:

- **Drawer bloqueado:** cliente nao acessa configuracoes ou telas administrativas
- **Timer de inatividade:** tela volta ao screensaver se ninguem interage
- **Modo imersivo:** barra de navegacao do Android oculta (experiencia fullscreen)
- **Recuperacao pos-crash:** pedidos pendentes recuperados automaticamente
- **Offline-first:** funciona sem internet, sincroniza quando reconecta
- **Monitoramento Sentry:** erros reportados automaticamente para a equipe tecnica

### 3.8 Nota Fiscal

Emissao fiscal integrada com 3 opcoes para o cliente:

- Nao emitir NF
- Imprimir NFC-e (impressora termica)
- Enviar NFC-e por email (cliente digita email no totem)
- Configuravel para pular a selecao (emissao automatica)

---

## 4. Multi-Adquirente — Liberdade de Escolha

O NXZ Go nao prende o estabelecimento a um adquirente. Builds nativos (com SDK do fabricante) para:

| Adquirente | Tipo | Dispositivos |
|-----------|------|-------------|
| **Stone** | Build nativo (SDK) | Maquininhas Stone |
| **Cielo** | Build nativo (SDK) | Maquininhas Cielo |
| **PagBank** | Build nativo (SDK) | Maquininhas PagBank |
| **SumUp** | API | Leitores SumUp |
| **Pagarme** | API | Via API |
| **PIX** | QR Code | Qualquer tela |

**Para vendas:** "Seu cliente ja tem Stone? Usa Cielo? Migrou pro PagBank? Tanto faz. O NXZ Go funciona com todos. E se trocar no futuro, so muda o build."

---

## 5. Offline-First — Nunca Para de Vender

O totem funciona sem internet:

- **Vendas processadas localmente:** catalogo e configuracoes em cache
- **Sincronizacao automatica:** quando a conexao volta, tudo sobe para o ERP
- **Sem intervencao:** o usuario nem percebe que estava offline

**Para vendas:** "Caiu o Wi-Fi? O totem continua vendendo. Quando a internet volta, tudo sincroniza automaticamente. Seu cliente nunca sabe que houve um problema."

---

## 6. Cross-References

### Fluxo Totem → Cozinha → Cliente

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Cliente  │───>│  Totem   │───>│   ERP    │───>│   KDS    │
│  (pedido) │    │(NXZ Go)  │    │(estoque, │    │(cozinha) │
│           │    │          │    │ fiscal)  │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                                                      ▼
                                                ┌──────────┐
                                                │  Balcao  │
                                                │(retirada)│
                                                └──────────┘
```

| Passo | O que acontece | Tempo |
|-------|---------------|-------|
| 1. Cliente pede no totem | Monta pedido, personaliza, paga | 1-3 min |
| 2. Totem → ERP | Venda registrada, estoque baixado, NF emitida | Instantaneo |
| 3. ERP → KDS | Pedido aparece na tela da cozinha | ~2 segundos |
| 4. Cozinha prepara | Stages: recebido → preparando → pronto | 3-10 min |
| 5. Cliente retira | Numero chamado no balcao | — |

[Ver: NXZ ERP > Secao 3.1 PDV para configuracao de PDVs/Totens no backend]
[Ver: NXZ ERP > Secao 3.2 Estoque para baixa automatica por venda]
[Ver: NXZ Go KDS > Funcionalidades para stages de producao e filtros por praca]

---

## 7. Terminologia

| Termo | Significado |
|-------|-------------|
| **Totem** | Tablet/dispositivo de autoatendimento para o cliente fazer pedido |
| **Whitelabel** | Personalizacao do totem com a marca do cliente (cores, logo, textos) |
| **Screensaver** | Slideshow de imagens promocionais exibido quando o totem esta ocioso |
| **Draft** | Pedido salvo sem pagamento — usado no "Pagar no caixa" |
| **Sessao automatica** | Totem abre e fecha o caixa sozinho, por horario |
| **Timer de inatividade** | Contador que volta o totem ao screensaver se ninguem interage |
| **Split bill** | Divisao da conta entre multiplos pagantes |
| **BOM** | Ficha tecnica do produto — define opcoes de personalizacao (tamanhos, adicionais) |
| **Pricelist** | Tabela de precos — totem pode ter precos diferentes do balcao |
| **NFC-e** | Nota Fiscal de Consumidor Eletronica — cupom fiscal digital |
| **Modo imersivo** | Tela fullscreen sem barra de navegacao do Android |
| **Build nativo** | Versao do app compilada com SDK do adquirente (Stone, Cielo, PagBank) |

---

## 8. Copy Pronto para Marketing

### Headlines

- "Seu cliente faz o pedido. Voce faz o que importa."
- "Autoatendimento com a sua marca, nao a nossa."
- "Fila zero. Ticket medio em alta. Equipe livre."
- "O totem que vende ate quando ninguem esta pedindo."
- "Caiu a internet? Seu totem continua vendendo."

### Sub-headlines

- "Whitelabel total: cores, logo e promocoes com a cara do seu negocio."
- "Screensaver = marketing 24h. Promocoes rodando na tela ociosa."
- "Cliente personaliza o pedido, paga e retira. Sem fila, sem erro."
- "Stone, Cielo ou PagBank? O totem funciona com todos."
- "Configura o horario e esquece. O totem abre e fecha sozinho."

### Descricoes

**25 palavras:**
NXZ Go Totem: autoatendimento com a marca do seu restaurante. Cliente pede, paga e retira. Offline-first. Multi-adquirente. Whitelabel completo.

**50 palavras:**
O NXZ Go Totem transforma qualquer tablet Android em autoatendimento com a marca do seu estabelecimento. O cliente navega pelo cardapio visual, personaliza o pedido, paga com cartao ou Pix e o pedido vai direto pra cozinha. Funciona offline, aceita Stone, Cielo, PagBank e SumUp. Screensaver de promocoes incluso.

**100 palavras:**
Fila no caixa e coisa do passado. Com o NXZ Go Totem, seu cliente faz o pedido sozinho: navega pelas categorias visuais, personaliza ingredientes, paga com cartao ou Pix e recebe o numero do pedido. Em 2 segundos, a cozinha ja esta preparando. O totem exibe a marca do seu negocio — cores, logo, textos e screensaver com promocoes rodando 24 horas. Funciona offline, opera sozinho (abertura e fechamento automaticos) e aceita qualquer adquirente: Stone, Cielo, PagBank, SumUp. Se o cartao nao passa, o cliente vai ao caixa sem perder o pedido. Parte do ecossistema NXZ.

### CTAs

- "Monte o totem com a sua marca — agende uma demo"
- "Veja como eliminar filas no seu restaurante"
- "Calcule quanto voce ganha com autoatendimento"
- "Fale com quem entende de totem para food service"

### Argumentos para Objecoes

| Objecao | Resposta |
|---------|---------|
| "Totem e caro" | O NXZ Go roda em qualquer tablet Android. Nao precisa de hardware especial ou totem dedicado. O app, o whitelabel e o screensaver de promocoes sao incluidos no ecossistema NXZ. |
| "Meu cliente nao vai saber usar" | O totem e feito para consumidor final: categorias visuais com fotos, toque para adicionar, toque para pagar. Se jogar Candy Crush, sabe usar o totem. |
| "E se o pagamento falhar?" | Opcao "Pagar no caixa" — o pedido e salvo e enviado pra cozinha. O cliente vai ao balcao, paga la, e o prato ja esta sendo preparado. Zero abandono. |
| "Nao quero marca de terceiro" | Whitelabel total. O totem mostra SUA marca. Cores, logo, textos, screensaver. Nenhuma referencia a NXZ aparece para o cliente. |
| "E se cair a internet?" | Offline-first: o totem continua vendendo com cache local. Quando a internet volta, sincroniza tudo automaticamente. |
| "Meu adquirente nao e compativel" | Compativel com Stone, Cielo, PagBank, SumUp, Pagarme e PIX. Se trocar de adquirente no futuro, so muda o build. |
| "Quem abre e fecha o totem?" | Ninguem. Sessao automatica: configura horario de abertura e fechamento, o totem opera sozinho. |
| "Totem nao funciona pra restaurante com mesa" | Funciona sim. O totem tem modo restaurante com mesas e divisao de conta. Ou pode ser usado so para pedidos to go enquanto as mesas usam o PDV com garcom. |

---

## 9. Casos de Uso por Segmento

### Cafeteria / Juiceria
**Setup:** 1 totem na entrada + 1 KDS na cozinha
**Impacto:** Fila eliminada. Cliente explora cardapio visual (smoothies, bowls, shots). Ticket medio sobe — cliente descobre opcoes que nao pediria no caixa. Screensaver com combo do dia roda 24h.

### Fast Food / Fast Casual
**Setup:** 2-3 totens no salao + KDS por praca
**Impacto:** Multiplos pedidos simultaneos sem fila. Cada totem processa 1 pedido a cada 2 minutos = 30 pedidos/hora por totem. Equipe focada em producao, nao em atendimento.

### Praca de Alimentacao
**Setup:** 1 totem por quiosque, whitelabel individual por marca
**Impacto:** Cada quiosque com totem personalizado (marca propria). Centralizacao no mesmo ERP para o operador da praca. Gestao unificada, experiencia individualizada.

### Rede de Franquias
**Setup:** Template replicavel — totem configurado uma vez, clonado para cada unidade
**Impacto:** Padronizacao de experiencia em todas as unidades. Mesmo cardapio, mesma interface, mesma marca. Nova unidade com totem em horas, nao semanas.

### Padaria / Confeitaria
**Setup:** 1 totem para pedidos to go + PDV no balcao para atendimento
**Impacto:** Clientes que so querem cafe + pao de queijo usam o totem (rapido, sem fila). Atendimento personalizado no balcao para quem quer. Dois canais, um financeiro.

### Evento / Pop-up
**Setup:** 1-2 tablets como totem temporario
**Impacto:** Monta em 10 minutos (so precisa de tablet + internet). Whitelabel com a marca do evento. Desmonta e leva embora. Dados de venda ficam no ERP.

---

## 10. Contexto de Mercado

### Autoatendimento no Brasil

Totens de autoatendimento crescem aceleradamente no food service brasileiro, impulsionados por McDonald's, Burger King e Subway. Mas a maioria das solucoes para pequenos e medios estabelecimentos e cara (hardware dedicado), generica (sem marca propria) ou desconectada (nao integra com estoque/financeiro).

### Posicionamento do NXZ Go Totem

| Aspecto | Concorrentes tipicos | NXZ Go Totem |
|---------|---------------------|-------------|
| Hardware | Totem dedicado (R$ 5-15k) | Qualquer tablet Android |
| Marca | Marca do fornecedor no totem | Whitelabel total — marca do cliente |
| Integracao | Isolado ou integracao basica | Nativo com ERP (estoque, fiscal, financeiro) |
| Adquirente | Preso a 1 adquirente | Multi-adquirente (Stone, Cielo, PagBank...) |
| Offline | Requer internet | Offline-first |
| Screensaver | Tela preta ou logo do fornecedor | Marketing 24h com promocoes do cliente |

### Tom de Voz

- **Foco:** Autoatendimento que libera equipe, elimina filas, aumenta ticket medio
- **Tom:** Pratico, visual, direto ao beneficio — "Simples assim"
- **Evitar:** Jargao tecnico, siglas sem explicacao, promessas vagas
