# Briefing de Contexto: NXZ Go — PDV (Caixa)

> Versao: v1.0 | Data: 2026-03-28 | Publico: Marketing + Vendas | Nivel: Operacional

## Metadata

- **Produto:** NXZ Go — Modo PDV (Caixa)
- **Categoria:** App de Frente de Caixa (Android)
- **Versao atual:** 5.13.1
- **Publico-Alvo do Briefing:** Marketing + Vendas
- **Nivel Organizacional:** Operacional
- **Objetivo:** Contexto para geracao de conteudo de marketing e vendas
- **Modelo Comercial:** Parte do ecossistema NXZ (vendido com NXZ ERP)
- **Produtos Relacionados:**
  - NXZ ERP — backend (catalogo, precos, estoque, fiscal, financeiro, mesas)
  - NXZ Go Totem — autoatendimento do cliente (mesmo app, modo diferente)
  - NXZ Go KDS — tela de cozinha (recebe pedidos do PDV)
  - NXZ Go Smart POS — PDV na maquininha (mesmo app em outro hardware)

---

## 1. Identidade do Produto

### O que e

O NXZ Go PDV e uma caixa registradora completa em um tablet Android. O operador registra pedidos, aplica descontos, gerencia mesas e comandas, processa qualquer forma de pagamento e emite nota fiscal — tudo conectado ao ERP em tempo real. E o modo mais completo do NXZ Go: tudo que o Totem faz, o PDV faz tambem, com controles administrativos que so o operador precisa.

### Problema que resolve

Caixa sem controle financeiro — dinheiro sumia e ninguem sabia onde. Pedidos anotados no papel com letra ilegivel que a cozinha nao entendia. Operacao lenta porque garcom ia e voltava do balcao conferindo preco, desconto, mesa. Sem relatorio por operador, sem conferencia de turno, sem rastreabilidade. O restaurante vendia, mas nao sabia quanto.

### Proposta de valor

O PDV centraliza toda a operacao do caixa em uma unica tela: venda, pagamento, controle de caixa, mesas, comandas, desconto, nota fiscal e impressao. O operador abre o caixa no inicio do turno (com fundo de troco), registra pedidos durante o dia, e fecha o caixa no fim com conferencia automatica. Cada pedido vai direto pro KDS da cozinha em 2 segundos. Se o restaurante tambem tem Totem, os pedidos do cliente e os do caixa chegam no mesmo lugar — mesma fila, mesma cozinha, mesmo sistema.

**Exemplo:** Restaurante to-go com 2 caixas e 1 totem. Maria abre o caixa as 7h com R$ 200 de fundo de troco. Atende 80 pedidos no turno: cafe, pao de queijo, smoothie. Aplica cupom de desconto em 5 pedidos. Faz sangria de R$ 500 ao meio-dia. As 15h fecha o caixa: sistema aponta R$ 2.340 em vendas, R$ 200 fundo + R$ 1.640 em dinheiro fisico + R$ 500 sangria = tudo bate. Zero surpresa.

---

## 2. Publico-Alvo do Produto

### Quem usa o PDV

| Persona | Relacao com o PDV |
|---------|------------------|
| **Operador de caixa** | Registra pedidos, processa pagamentos, abre/fecha caixa — usuario direto o dia todo |
| **Gerente de operacao** | Aplica descontos manuais, controla disponibilidade de produtos, confere fechamento |
| **Garcom** | Lanca pedidos por mesa, abre comandas, adiciona itens a pedidos existentes |
| **Proprietario** | Monitora vendas, confere relatorios por turno, controla sangria/suprimento |
| **Equipe de cozinha** | Recebe os pedidos do PDV no KDS — nao interage diretamente |

### Perfil do operador no PDV

- Precisa de velocidade: fila no balcao, cliente esperando, pedido tem que ser rapido
- Faz operacoes repetitivas: 50-200 pedidos por turno
- Precisa de flexibilidade: aplicar desconto, mudar preco, abrir comanda, dividir conta
- Nem sempre e tech-savvy: interface precisa ser intuitiva e tolerante a erros
- Opera o mesmo dispositivo por horas: tablet em suporte fixo no balcao ou movel com garcom

**Exemplo — Operador:**
Carlos e caixa de uma cafeteria com movimento forte no almoco. Ele abre o caixa as 6h30, confere o fundo de troco e comeca a atender. Cliente 1: "cafe e pao de queijo, pra levar" — 15 segundos para registrar, cartao na maquininha, pronto. Cliente 2: "aquele smoothie grande com whey extra" — toca Booster Smoothie, personaliza tamanho e adicionais no BOM, 20 segundos. Cliente 3: gerente do escritorio vizinho com cupom de 10% — Carlos abre o modal de cupom, seleciona da lista, desconto aplicado. Pedido vai pro KDS, cozinha ja prepara. Zero papel, zero grito.

---

## 3. Funcionalidades Principais

### 3.1 Controle de Caixa — Dinheiro Sob Controle

O diferencial numero um do PDV para quem gerencia: saber exatamente quanto entrou e quanto saiu.

**O que inclui:**
- **Abertura de caixa:** operador informa o valor do fundo de troco ao iniciar o turno
- **Sangria:** retirada de dinheiro durante o turno (ex: enviar excesso ao cofre)
- **Suprimento:** entrada de dinheiro extra no caixa (ex: trocar notas)
- **Fechamento de caixa:** sistema mostra o total esperado, operador confere o dinheiro fisico
- **Relatorio por operador:** cada caixa e rastreado individualmente

**Para vendas:** "Nunca mais fechar o caixa no escuro. O sistema sabe exatamente quanto deveria ter na gaveta. Se faltar R$ 5, voce sabe antes de ir embora."

**Exemplo:** Final do turno da noite. Joao abre a tela de fechamento, sistema mostra: R$ 200 (fundo) + R$ 1.800 (vendas em dinheiro) - R$ 500 (sangria 14h) = R$ 1.500 esperados. Joao conta o dinheiro na gaveta: R$ 1.500. Perfeito. Fechamento aprovado, relatório gerado, proximo turno pode abrir zerado.

### 3.2 Modo Restaurante — Mesas e Comandas

Para restaurantes com salao, o PDV vira um sistema completo de gestao de mesas.

**O que inclui:**
- **Planta do salao:** mesas organizadas por andar/area (configurado no Odoo)
- **Selecao de mesa no carrinho:** operador/garcom associa o pedido a uma mesa
- **Comanda aberta (open tab):** pedido fica "em aberto" na mesa — garcom adiciona itens ao longo da refeicao
- **Divisao de conta:** quando a mesa pede a conta, pode dividir entre 2, 3 ou mais pessoas com metodos diferentes
- **Pedido vai pro KDS:** cada item adicionado aparece na cozinha em tempo real

**Para vendas:** "Seu garcom anota no tablet, a cozinha ja recebe no display. Cliente pede mais uma bebida? Adiciona na comanda. Na hora de pagar, divide a conta entre 3 cartoes. Tudo no mesmo sistema."

**Exemplo:** Mesa 7, quatro amigos. Garcom abre comanda: 2 smoothies, 1 acai bowl, 1 cafe. Cozinha recebe no KDS e comeca a preparar. 20 minutos depois, mesa pede mais 2 shots de gengibre — garcom adiciona na mesma comanda. Na hora de pagar: R$ 89,60 total. "Divide em 3?" Sim: R$ 29,87 no cartao de cada um, o quarto paga R$ 29,86 em PIX. Conta fechada, mesa liberada.

### 3.3 Gestao de Pedidos — Nada se Perde

Tela administrativa exclusiva do PDV, acessivel pelo drawer lateral (swipe).

**O que inclui:**
- **Lista de pedidos em aberto:** rascunhos, comandas, pedidos pendentes
- **Retomar pedido:** reabrir no carrinho para continuar ou pagar
- **Cancelar pedido:** com justificativa e rastreamento
- **Imprimir pedido:** reimprimir ticket, recibo ou DANFE
- **Recuperacao pos-crash:** se o app fecha inesperadamente, pedidos pendentes sao recuperados automaticamente

**Para vendas:** "O operador controla tudo pelo menu lateral. Pedido ficou pendente? Retoma. Precisa reimprimir? Imprime. Nada se perde, mesmo se o app reiniciar."

### 3.4 Descontos e Cupons — Flexibilidade para o Gerente

O PDV tem controle avancado de descontos que o Totem nao oferece.

**O que inclui:**
- **Edicao de preco por item:** operador altera o preco direto no carrinho (com limites configuraveis)
- **Modal de cupom avancado:** ao tocar "Aplicar", abre painel com:
  - Lista de cupons cadastrados no ERP (carregados via API)
  - Desconto manual por porcentagem ou valor fixo
- **Codigo de cupom digitado:** cliente informa codigo, sistema valida automaticamente
- **Tabela de precos (pricelist):** operador pode trocar a pricelist do pedido (ex: preco balcao vs preco delivery)

**Para vendas:** "Gerente pode aplicar desconto direto no caixa — sem planilha, sem calculadora. E se o cliente tem cupom, o operador seleciona da lista ou digita o codigo. Tudo rastreado."

### 3.5 Fluxo Completo do Pedido no PDV

O operador percorre ate 10 etapas (varias sao opcionais):

```
Boas-vindas → Identificacao → Consumo → Catalogo → Personalizacao → Carrinho → Comanda → NF → Pagamento → Sucesso
```

**Etapa 1 — Boas-vindas:** Tela inicial com logo. Se houver pedido pendente (crash), oferece recuperar.

**Etapa 2 — Identificacao (opcional):** Nome do cliente, CPF, email ou telefone. 3 modos: simples (so nome), identificacao (busca por CPF via PartnerMuk), unificado (ambos).

**Etapa 3 — Consumo (opcional):** "Comer aqui" ou "Para levar". Define o tipo do pedido.

**Etapa 4 — Catalogo:** Categorias visuais na lateral (tablet) ou chips no topo (phone). Grid de produtos com imagens. Busca por nome com debounce. Leitor de codigo de barras com multiplicador (1x, 2x, 3x, 5x, 10x, 20x).

**Etapa 5 — Personalizacao:** Tela fullscreen por produto com BOM — tamanhos, sabores, adicionais. Preco atualizado em tempo real. Auto-adicao quando so ha uma opcao.

**Etapa 6 — Carrinho:** Revisao do pedido com: desconto/cupom, codigo de vendedor, selecao de mesa, gorjeta. Editar preco por item (se habilitado). Indicador visual de etapas: Revisao → NF → Pagamento.

**Etapa 7 — Comanda (opcional):** "Abrir comanda" salva pedido no Firebase como open tab. "Pagar agora" segue para pagamento. Comanda fica visivel no KDS para preparacao imediata.

**Etapa 8 — Nota Fiscal:** NFC-e: imprimir, enviar por email, ou nenhuma. Configuravel para skip automatico.

**Etapa 9 — Pagamento:** Dinheiro (com calculo de troco automatico), cartao (Stone, Cielo, PagBank, SumUp, Pagarme), PIX (QR code), ou split bill (multiplos pagamentos parciais com metodos diferentes).

**Etapa 10 — Sucesso:** Numero do pedido, GIF animado, impressao automatica (DANFE, receipt, ticket), countdown de 10 segundos. Pedido no KDS da cozinha em ~2 segundos.

### 3.6 Pagamentos no PDV

O PDV aceita todas as formas de pagamento — e o dinheiro e tratado de forma diferente do Totem.

| Metodo | Disponibilidade | Observacao |
|--------|----------------|-----------|
| **Cartao (credito/debito)** | Stone, Cielo, PagBank, SumUp, Pagarme | Via maquininha ou API |
| **PIX** | QR code exibido na tela | Confirmacao automatica |
| **Dinheiro** | Direto, sem senha | Exclusivo PDV — no Totem precisa de senha |
| **Split bill** | Sim | Divide entre multiplos pagantes/metodos |
| **Troco** | Calculo automatico | Operador informa quanto recebeu |

**Dual-channel (Bluetooth + API):** Para Cielo, PagBank e Stone Fisica, o PDV envia o pagamento por dois canais simultaneos — Bluetooth e API. O primeiro a confirmar vence. Resultado: pagamento mais rapido e confiavel.

**Para vendas:** "Cliente paga como quiser: cartao, PIX, dinheiro ou divide entre amigos. E se usar Cielo ou PagBank, o pagamento vai por dois caminhos ao mesmo tempo — o mais rapido vence."

### 3.7 Sistema de Impressao

4 tipos de impressao para diferentes necessidades:

| Tipo | Uso | Conteudo |
|------|-----|----------|
| **DANFE** | Nota fiscal para o cliente | Tabela de produtos, totais, pagamentos, troco, QR code fiscal |
| **Receipt** | Comprovante resumido | Itens, valores, metodo de pagamento |
| **Ticket** | Ticket de producao | Vai pra cozinha com detalhes do pedido |
| **Sticker** | Etiqueta de identificacao | Nome do cliente + numero do pedido |

**Protocolos suportados:** ESC/POS, Bluetooth (BLE), Rede (Wi-Fi/Ethernet), USB.

**Impressao automatica:** configuravel — imprimir automaticamente apos cada venda.
**Retry:** ate 120 tentativas. Se falhar, oferece envio por email.

**Para vendas:** "Imprime nota fiscal, comprovante, ticket de cozinha e etiqueta — tudo automatico. Bluetooth, Wi-Fi ou USB, qualquer impressora termica funciona."

### 3.8 Controle de Disponibilidade de Produtos

Acessivel pelo drawer lateral — exclusivo do PDV.

- Lista paginada de todos os produtos do catalogo
- Toggle de disponibilidade por produto (disponivel/indisponivel/parcial/em processo)
- Efeito imediato: produto some do catalogo do PDV e do Totem

**Para vendas:** "Acabou o acai? O operador desabilita no PDV e o produto some do totem tambem. Sem confusao, sem pedido de algo que nao tem."

### 3.9 Nota Fiscal

Emissao fiscal integrada no fluxo:

- **NFC-e (modelo 65):** emissao automatica ou manual
- **Opcoes para o cliente:** imprimir, enviar por email, ou nenhuma
- **Skip automatico:** configuravel para pular a selecao de NF
- **CPF/CNPJ:** campo no carrinho para o cliente informar

**Para vendas:** "Nota fiscal automatica. O operador nao precisa fazer nada — o sistema emite e imprime sozinho. Se o cliente quer por email, digita ali mesmo."

---

## 4. Multi-Adquirente — Liberdade de Escolha

O NXZ Go nao prende o estabelecimento a um adquirente. Builds nativos (com SDK do fabricante) para:

| Adquirente | Tipo | Dispositivos |
|-----------|------|-------------|
| **Stone** | Build nativo (SDK) | Maquininhas Stone |
| **Cielo** | Build nativo (SDK) + Dual-channel | Maquininhas Cielo |
| **PagBank** | Build nativo (SDK) + Dual-channel | Maquininhas PagBank |
| **SumUp** | SDK Android nativo | Leitores SumUp |
| **Pagarme** | API REST | Via API |
| **PIX** | QR Code | Qualquer tela |

**Para vendas:** "Seu cliente ja tem Stone? Usa Cielo? Migrou pro PagBank? Tanto faz. O NXZ Go funciona com todos. E se trocar no futuro, so muda o build."

---

## 5. Offline-First — Nunca Para de Vender

O PDV funciona sem internet:

- **Vendas processadas localmente:** catalogo e configuracoes em cache
- **Fila de pedidos:** cron de 5 segundos processa e envia ao Odoo quando reconectar
- **Reprocessamento automatico:** pedidos com erro sao reprocessados pelo SaleError
- **Sem intervencao:** o operador nem percebe que estava offline

**Para vendas:** "Caiu o Wi-Fi no horario de pico? O caixa continua vendendo. Quando a internet volta, tudo sincroniza automaticamente. Seu cliente nunca sabe que houve um problema."

---

## 6. Cross-References

### Fluxo PDV → Cozinha → Cliente

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Operador │───>│   PDV    │───>│   ERP    │───>│   KDS    │
│  (caixa) │    │(NXZ Go)  │    │(estoque, │    │(cozinha) │
│          │    │          │    │ fiscal)  │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                                                      ▼
                                                ┌──────────┐
                                                │  Balcao  │
                                                │(retirada)│
                                                └──────────┘
```

### PDV + Totem Lado a Lado

```
┌──────────┐    ┌──────────┐
│ Cliente  │───>│  Totem   │──┐
│(self)    │    │          │  │    ┌──────────┐    ┌──────────┐
└──────────┘    └──────────┘  ├───>│   ERP    │───>│   KDS    │
                              │    │          │    │(mesma    │
┌──────────┐    ┌──────────┐  │    └──────────┘    │ fila)    │
│ Operador │───>│   PDV    │──┘                    └──────────┘
│(caixa)   │    │          │
└──────────┘    └──────────┘
```

Totem e PDV alimentam a mesma fila de producao no KDS. O gerente ve todas as vendas no mesmo dashboard do ERP — independente de onde o pedido foi feito.

| Passo | O que acontece | Tempo |
|-------|---------------|-------|
| 1. Operador registra no PDV | Seleciona produtos, personaliza, aplica desconto | 15-30 seg |
| 2. PDV → ERP | Venda registrada, estoque baixado, NF emitida | Instantaneo |
| 3. ERP → KDS | Pedido aparece na tela da cozinha | ~2 segundos |
| 4. Cozinha prepara | Stages: recebido → preparando → pronto | 3-10 min |
| 5. Cliente retira | Numero chamado no balcao | — |

[Ver: NXZ ERP > Secao 3.1 PDV para configuracao de PDVs no backend]
[Ver: NXZ ERP > Secao 3.2 Estoque para baixa automatica por venda]
[Ver: NXZ Go Totem > Secao 3 para comparacao de funcionalidades]
[Ver: NXZ Go KDS > Funcionalidades para stages de producao e filtros por praca]

---

## 7. Terminologia

| Termo | Significado |
|-------|-------------|
| **PDV** | Ponto de Venda — caixa registradora digital para operador humano |
| **Controle de caixa** | Abertura/fechamento de turno com conferencia de valores (fundo, sangria, suprimento) |
| **Sangria** | Retirada de dinheiro do caixa durante o turno (enviar ao cofre) |
| **Suprimento** | Entrada de dinheiro extra no caixa (trocar notas, repor fundo) |
| **Comanda aberta** | Pedido "em aberto" associado a uma mesa — itens adicionados ao longo da refeicao |
| **Open tab** | Mesmo que comanda aberta — termo tecnico usado no sistema |
| **Draft** | Pedido salvo como rascunho, ainda nao pago |
| **Split bill** | Divisao da conta entre multiplos pagantes/metodos |
| **BOM** | Ficha tecnica do produto — define opcoes de personalizacao (tamanhos, adicionais) |
| **Pricelist** | Tabela de precos — PDV pode ter preco diferente do Totem ou delivery |
| **Drawer** | Menu lateral deslizante com funcoes administrativas (exclusivo PDV) |
| **Dual-channel** | Pagamento enviado por Bluetooth e API simultaneamente — o mais rapido vence |
| **NFC-e** | Nota Fiscal de Consumidor Eletronica — cupom fiscal digital |
| **DANFE** | Documento Auxiliar da NF-e — versao impressa da nota fiscal |
| **Build nativo** | Versao do app compilada com SDK do adquirente (Stone, Cielo, PagBank) |
| **Floor** | Planta do salao com mesas — configurado no Odoo ERP |

---

## 8. Copy Pronto para Marketing

### Headlines

- "O caixa que sabe quanto deveria ter na gaveta."
- "Pedido no balcao. Cozinha ja preparando. 2 segundos."
- "Mesas, comandas, descontos e nota fiscal. Tudo em um tablet."
- "Seu caixa nunca mais fecha no escuro."
- "Caiu a internet? Seu caixa continua vendendo."

### Sub-headlines

- "Controle de caixa real: abertura, sangria, suprimento e fechamento com conferencia."
- "Modo restaurante: mesas, comandas abertas e divisao de conta."
- "Stone, Cielo ou PagBank? O PDV funciona com todos."
- "Desconto, cupom e tabela de precos — tudo na mao do gerente."
- "PDV + Totem na mesma fila. Mesma cozinha. Mesmo sistema."

### Descricoes

**25 palavras:**
NXZ Go PDV: caixa registradora completa em tablet Android. Controle de caixa, mesas, comandas, multi-adquirente, offline-first. Tudo integrado ao ERP.

**50 palavras:**
O NXZ Go PDV transforma qualquer tablet Android em uma caixa registradora completa. O operador registra pedidos, aplica descontos, gerencia mesas e comandas, processa pagamento com cartao, PIX ou dinheiro, e emite nota fiscal. Funciona offline, aceita Stone, Cielo, PagBank e SumUp. Pedido na cozinha em 2 segundos.

**100 palavras:**
Caixa registradora inteligente para food service. O NXZ Go PDV roda em qualquer tablet Android e oferece controle total: abertura e fechamento de caixa com conferencia, modo restaurante com mesas e comandas abertas, descontos e cupons com rastreamento, divisao de conta entre amigos, e nota fiscal automatica. O operador registra o pedido e em 2 segundos a cozinha ja esta preparando via KDS. Funciona offline — se cair o Wi-Fi, o caixa continua vendendo. Aceita Stone, Cielo, PagBank, SumUp e Pagarme. E se o restaurante tambem tem Totem, os pedidos de ambos chegam na mesma fila. Parte do ecossistema NXZ.

### CTAs

- "Veja o PDV funcionando — agende uma demo"
- "Calcule quanto voce economiza com controle de caixa real"
- "Converse com quem entende de caixa para food service"
- "Monte a operacao completa: PDV + Totem + KDS"

### Argumentos para Objecoes

| Objecao | Resposta |
|---------|---------|
| "Ja tenho uma caixa registradora" | Sua caixa registradora faz controle de caixa com conferencia, envia pedido direto pra cozinha e emite NFC-e automatica? O NXZ Go PDV faz tudo isso e ainda funciona offline. |
| "Meu restaurante e pequeno, nao preciso de sistema" | Quanto menor, mais cada real conta. Controle de caixa evita perda de dinheiro. Pedido digital elimina erro. E o app roda em qualquer tablet — sem hardware caro. |
| "E se cair a internet?" | O PDV funciona offline. Vendas ficam em cache e sincronizam automaticamente quando a internet volta. O operador nem percebe. |
| "Meu adquirente nao e compativel" | Compativel com Stone, Cielo, PagBank, SumUp, Pagarme e PIX. Se trocar de adquirente, so muda o build. |
| "Nao quero trocar tudo de uma vez" | Comece so com o PDV. Depois adicione Totem, KDS ou Smart POS conforme a necessidade. Tudo se conecta automaticamente. |
| "Meu garcom nao vai saber usar" | A interface e visual: toca no produto, toca na mesa, toca em pagar. Se ele usa WhatsApp, usa o PDV. Treinamento em 1 turno. |
| "Quem controla desconto?" | Voce configura os limites no ERP: quem pode dar desconto, ate quanto, em quais situacoes. Tudo rastreado por operador. |
| "E caro manter tablet + maquininha?" | O app e incluido no ecossistema NXZ. O tablet pode ser qualquer Android. A maquininha voce ja tem (Stone, Cielo, PagBank). Custo extra: zero. |

---

## 9. Casos de Uso por Segmento

### Cafeteria / Juiceria — Balcao Rapido
**Setup:** 1 PDV no balcao + 1 KDS na cozinha (+ Totem opcional na entrada)
**Operacao:** Operador no caixa atende fila. Pedido rapido: cafe + pao de queijo = 15 segundos. Cozinha recebe no KDS. Se tiver Totem, cliente pode pedir sozinho e o PDV fica para pedidos mais complexos ou pagamento em dinheiro.
**Impacto:** Fila anda mais rapido. Controle de caixa evita perda. Se Totem + PDV: dois canais vendendo simultaneamente.

### Restaurante com Mesas
**Setup:** 1-2 PDVs (balcao + movel com garcom) + KDS por praca
**Operacao:** Garcom lanca pedido no tablet, seleciona mesa 7, abre comanda. Cliente pede mais itens — garcom adiciona na mesma comanda. Na hora de pagar, divide entre 3 cartoes. KDS separa itens por praca (bar, cozinha quente, fria).
**Impacto:** Zero papel entre salao e cozinha. Comanda nunca some. Divisao de conta sem calculadora. Relatorio por garcom no fim do turno.

### Padaria / Confeitaria
**Setup:** 1 PDV no balcao + impressora termica
**Operacao:** Atendimento rapido: cliente aponta, operador registra, cobra e imprime comprovante. Para clientes frequentes: cupom de desconto via ERP. Controle de caixa com abertura/fechamento a cada turno.
**Impacto:** Controle financeiro rigoroso. Nota fiscal automatica. Rastreabilidade de cada venda.

### Food Court / Praca de Alimentacao
**Setup:** 1 PDV por quiosque + KDS central + Totem compartilhado
**Operacao:** Cada quiosque com seu PDV e pricelist propria. KDS central recebe pedidos de todos os quiosques. Totem na entrada para pedidos avulsos.
**Impacto:** Operacao unificada no ERP. Cada quiosque com seu controle financeiro independente. Relatorio consolidado para o operador da praca.

### Rede de Franquias
**Setup:** Template PDV replicavel por unidade + KDS + Totem
**Operacao:** Matriz configura PDV-template no ERP: catalogo, precos, limites de desconto, categorias do KDS. Cada unidade recebe copia com personalizacao minima (pricelist local, operadores). Nova unidade em horas.
**Impacto:** Padronizacao de operacao. Controle centralizado de precos e descontos. Relatorio consolidado multi-unidade.

### Food Truck / Evento
**Setup:** 1 tablet com PDV + maquininha Bluetooth
**Operacao:** Leve e rapido. Abre o caixa, atende, fecha o caixa no fim. Funciona offline se o evento nao tem Wi-Fi estavel. Maquininha Bluetooth pareia e pronto.
**Impacto:** Profissionaliza o food truck. Controle de caixa mesmo em evento temporario. Dados de venda no ERP para analise posterior.

---

## 10. Contexto de Mercado

### PDV para Food Service no Brasil

A maioria dos pequenos e medios estabelecimentos ainda usa caixa registradora basica (fiscal), caderno de anotacao ou sistemas de PDV genericos (pensados para varejo, nao para food service). O gap: nenhum desses oferece modo restaurante com mesas, integracao com KDS, controle de caixa com conferencia automatica e multi-adquirente em um unico app.

### Posicionamento do NXZ Go PDV

| Aspecto | Concorrentes tipicos | NXZ Go PDV |
|---------|---------------------|-----------|
| Hardware | PC fixo ou caixa dedicada | Qualquer tablet Android |
| Mesas/comandas | Modulo separado ou inexistente | Integrado nativamente |
| Cozinha (KDS) | Impressao de ticket em papel | KDS digital em tempo real |
| Adquirente | Preso a 1 ou 2 | Stone, Cielo, PagBank, SumUp, Pagarme |
| Offline | Requer internet | Offline-first |
| Autoatendimento | Sistema separado | Mesmo app (modo Totem) |
| ERP | Integracao parcial via API | Nativo — mesmo backend Odoo |
| Controle de caixa | Basico ou manual | Automatizado com conferencia |

### Tom de Voz

- **Foco:** Controle financeiro, velocidade operacional, gestao completa de caixa e mesas
- **Tom:** Pratico, confiavel, direto ao beneficio — "Dinheiro sob controle"
- **Evitar:** Jargao tecnico, siglas sem explicacao, promessas vagas
