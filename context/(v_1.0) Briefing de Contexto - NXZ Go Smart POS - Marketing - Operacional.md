# Briefing de Contexto: NXZ Go — Smart POS (Maquininha Inteligente)

> Versao: v1.0 | Data: 2026-04-02 | Publico: Marketing | Nivel: Operacional

## Metadata

- **Produto:** NXZ Go — Modo Smart POS (Maquininha Inteligente)
- **Categoria:** App de PDV em Terminal de Pagamento (Android)
- **Versao atual:** 5.13.1 (cielo 1.2.2 / stone 1.0.0 / pagbank 1.1.1)
- **Publico-Alvo do Briefing:** Marketing
- **Nivel Organizacional:** Operacional
- **Objetivo:** Contexto para geracao de conteudo de marketing
- **Modelo Comercial:** Parte do ecossistema NXZ (vendido com NXZ ERP)
- **Produtos Relacionados:**
  - NXZ ERP — backend (catalogo, precos, estoque, fiscal, financeiro)
  - NXZ Go PDV — caixa em tablet (mesmo app, hardware diferente)
  - NXZ Go Totem — autoatendimento do cliente (mesmo app, modo diferente)
  - NXZ Go KDS — tela de cozinha (recebe pedidos do Smart POS)
  - NXZ Delivery — centralizador de pedidos delivery

---

## 1. Identidade do Produto

### O que e

O NXZ Go Smart POS transforma a maquininha de cartao em um PDV completo no bolso. O operador monta o pedido, processa o pagamento e imprime o comprovante — tudo em um unico dispositivo que cabe na mao. Nao e uma maquininha que cobra. E uma caixa registradora completa que tambem cobra.

### Problema que resolve

Negocios moveis e compactos operavam com 3 equipamentos separados: tablet para pedido, maquininha para cobranca e impressora para comprovante. O garcom ia e voltava do caixa fixo para fechar a conta. O food truck precisava de tomada, mesa e espaco para montar um PDV. O evento pop-up gastava mais tempo montando infraestrutura do que vendendo. Resultado: custo alto, mobilidade zero e operacao lenta.

### Proposta de valor

O Smart POS elimina tudo que nao cabe no bolso. Um unico dispositivo com tela touch, leitor de cartao, NFC, impressora termica e conexao com o ERP. O operador abre o app, monta o pedido, cobra no cartao ou Pix, imprime o comprovante e o pedido vai direto para o KDS da cozinha. Funciona offline, aceita qualquer adquirente (Stone, Cielo, PagBank) e exibe a marca do cliente — nao a da Nexuz.

**Exemplo:** Food truck de acai em evento na praia. Antes: tablet em suporte improvisado + maquininha Bluetooth que desconectava + impressora portatil sem bateria. Depois: 1 maquininha Stone no bolso do atendente. Cliente pede bowl grande com extra granola, paga por aproximacao, recibo impresso na hora. Pedido aparece no celular da cozinha (KDS). Setup: 0 minutos. Equipamentos: 1.

---

## 2. Publico-Alvo do Produto

### Quem usa o Smart POS

| Persona | Relacao com o Smart POS |
|---------|------------------------|
| **Atendente movel** | Leva a maquininha ao cliente, monta pedido, cobra e imprime — usuario direto |
| **Garcom** | Atende na mesa: registra pedido, processa pagamento, imprime comprovante sem voltar ao caixa |
| **Operador de food truck** | PDV completo em espaco minimo — pedido, pagamento e impressao em um dispositivo |
| **Vendedor em evento** | Setup instantaneo para operacoes temporarias — liga e vende |
| **Gerente** | Acompanha vendas, configura catalogo e precos via ERP |

### Perfil do operador no Smart POS

- Precisa de mobilidade: nao fica atras de um balcao, vai ate o cliente
- Opera com uma mao: dispositivo compacto, interface otimizada para tela ~5.5"
- Trabalha em condicoes adversas: sol, chuva, multidao, sem mesa, sem tomada
- Precisa de velocidade: evento com fila, tempo e dinheiro
- Nem sempre tem internet estavel: praia, parque, area rural

**Exemplo — Garcom:**
Fernanda e garcona em um bar com mesas na calcada. Mesa 7 pede 2 chopes e uma porcao de batata. Fernanda tira a maquininha do avental, toca "Gelada > Chope" (2x), "Para comer > Batata Frita", total R$ 67,70. Cliente paga por aproximacao. Recibo impresso na hora. Pedido aparece no KDS do bar em 2 segundos. Fernanda nao voltou ao caixa nenhuma vez.

---

## 3. Funcionalidades Principais

### 3.1 PDV Completo no Bolso

Tudo que um PDV de tablet faz, o Smart POS faz na maquininha:

- **Catalogo visual:** categorias em chips horizontais, grid compacto com imagens
- **Personalizacao de pedido:** tamanhos, adicionais, observacoes (via BOM do ERP)
- **Carrinho:** revisao, edicao de quantidade, notas por item
- **Desconto e cupom:** aplicacao de descontos manuais ou cupons
- **Comanda:** abertura e controle por mesa/comanda
- **Nota fiscal:** emissao de NFC-e integrada

**Para marketing:** "Nao e uma maquininha que cobra. E um caixa completo que cabe no bolso."

**Exemplo:** Padaria com delivery proprio. Entregador leva a maquininha, mostra o pedido ao cliente na tela, cobra cartao ou Pix, imprime comprovante com dados fiscais. Se o cliente quer adicionar um cafe, o entregador adiciona ali mesmo e cobra a diferenca.

### 3.2 Pagamento Nativo — Zero Latencia

O diferencial tecnico traduzido em beneficio real: o pagamento acontece direto no hardware, sem app externo, sem Bluetooth, sem polling de API.

**O que isso significa na pratica:**
- Operador toca "Cobrar" → maquininha pede cartao → cliente aproxima → aprovado → imprime
- Sem espera de "conectando maquininha..."
- Sem falha de Bluetooth no meio da transacao
- Sem app de pagamento separado que trava

**Metodos aceitos em todos os fabricantes:**
- Cartao de credito (chip e aproximacao)
- Cartao de debito (chip e aproximacao)
- Voucher (Alelo, Sodexo, VR)
- PIX

**Para marketing:** "Cobrou, passou. Sem pareamento, sem app externo, sem espera. O cartao encosta na maquininha e pronto."

### 3.3 Impressao Integrada — Sem Impressora Extra

Toda maquininha Smart POS tem impressora termica embutida. O Smart POS usa nativamente:

**Formatos disponiveis:**
- **DANFE** — Nota fiscal completa com tabela de produtos, totais, pagamentos, QR code do NF-e
- **Comprovante** — Resumo do pedido com itens e pagamento
- **Ticket de producao** — Vai para a cozinha (via KDS ou impresso)
- **Etiqueta** — Identificacao do pedido

**Para marketing:** "Imprime na hora, direto na maquininha. Comprovante, nota fiscal, ticket de cozinha — sem impressora extra, sem Bluetooth, sem papel acabando em outro aparelho."

### 3.4 Interface Compacta — Feita para Tela Pequena

O app detecta automaticamente que esta em uma maquininha e ativa o layout compacto:

- **Categorias em chips horizontais:** navegacao rapida com o polegar
- **Grid de produtos compacto:** imagens menores, informacao essencial
- **Carrinho vertical:** scroll otimizado para tela de 5.5"
- **Teclado numerico adaptado:** digitos grandes para toque rapido

**Para marketing:** "Interface feita para a maquininha, nao adaptada de um tablet. Tudo acessivel com o polegar."

### 3.5 Modo BOTH — PDV e KDS no Mesmo Dispositivo

O Smart POS pode alternar entre modo PDV (frente de caixa) e modo KDS (tela de cozinha) no mesmo dispositivo:

**Para marketing:** "Um dispositivo, duas funcoes. O mesmo aparelho que registra pedidos pode exibir a fila de producao na cozinha."

**Exemplo:** Hamburgueria pequena com 1 maquininha. O atendente registra o pedido no modo PDV, vira a maquininha para o cozinheiro que ve o pedido no modo KDS. Operacao de 2 pessoas com 1 dispositivo.

### 3.6 Whitelabel — Marca do Cliente

A interface do Smart POS exibe a marca do estabelecimento:

- Cores personalizadas (primaria, header, footer, botoes)
- Logo do estabelecimento
- Textos customizados

**Para marketing:** "Seu cliente ve a sua marca, nao a nossa. Maquininha com a cara do seu negocio."

### 3.7 Integracao KDS — Pedido na Cozinha em 2 Segundos

Todo pedido feito no Smart POS e enviado automaticamente ao KDS:

- Pedido aparece na tela da cozinha instantaneamente
- Stages de producao: recebido → preparando → pronto
- Funciona via Firebase/Supabase (real-time)

**Para marketing:** "O garcom cobra na mesa e a cozinha ja sabe o que preparar. Sem grito, sem papel, sem viagem ao balcao."

### 3.8 Nota Fiscal Eletronica

Emissao de NFC-e integrada e automatica:

- Emissao direto na maquininha
- Impressao do DANFE na impressora termica integrada
- Envio por email (cliente informa no pedido)
- CPF/CNPJ na nota (campo disponivel)
- Ambiente de producao e homologacao configuravel

**Para marketing:** "Nota fiscal emitida e impressa na hora, direto na maquininha. Sem computador, sem impressora fiscal separada."

---

## 4. Multi-Fabricante — Sem Vendor Lock-in

O NXZ Go Smart POS roda em maquininhas de diferentes fabricantes. Nao prende o cliente a um hardware:

| Fabricante | Terminal | SDK |
|-----------|---------|-----|
| **Stone** | Stone POS | SDK nativo Stone |
| **Cielo** | Cielo LIO | SDK nativo Cielo |
| **PagBank** | Moderninha Smart | PlugPag SDK |
| **MSiTef** | Terminais Software Express | MSiTef SDK |

**Para marketing:** "Ja tem maquininha Stone? Usa Cielo? Migrou pro PagBank? O NXZ Go Smart POS funciona em todas. E se trocar no futuro, o app acompanha."

**Exemplo:** Rede de 3 food trucks. Truck 1 usa Stone, Truck 2 usa Cielo, Truck 3 usa PagBank. Todos rodam o NXZ Go Smart POS com o mesmo catalogo, mesmos precos, mesma marca. Gestao unificada no ERP, hardware independente.

---

## 5. Offline-First — Vende Sem Internet

O Smart POS funciona mesmo sem conexao:

- **Catalogo em cache local:** produtos, precos e imagens disponives offline
- **Vendas processadas localmente:** pedido registrado mesmo sem internet
- **Sincronizacao automatica:** quando a conexao volta, tudo sobe para o ERP
- **Sem intervencao:** o operador nem percebe que estava offline

**Para marketing:** "Na praia, no parque, no estacionamento — onde tiver cliente, voce vende. Sem Wi-Fi? O Smart POS continua funcionando. Quando a internet volta, sincroniza tudo sozinho."

**Exemplo:** Food truck em festival ao ar livre. Rede 4G instavel, cai a cada 20 minutos. Smart POS continua registrando pedidos, cobrando cartao (pagamento nativo nao depende de internet do app) e imprimindo comprovantes. Quando o 4G volta, 15 pedidos sincronizam com o ERP em segundos.

---

## 6. Cross-References

### Fluxo Smart POS → ERP → Cozinha

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Operador │───>│ Smart POS│───>│   ERP    │───>│   KDS    │
│  (pedido │    │(maquininha)   │(estoque, │    │(cozinha) │
│+ cobranca)    │          │    │ fiscal)  │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                                                      ▼
                                                ┌──────────┐
                                                │ Producao │
                                                │(preparo) │
                                                └──────────┘
```

### Smart POS vs PDV vs Totem — Lado a Lado

```
┌─────────────────────────────────────────────────────────┐
│                    NXZ Go (mesmo app)                   │
├──────────────┬──────────────┬───────────────────────────┤
│   Totem      │    PDV       │     Smart POS             │
│ (cliente)    │ (operador)   │  (operador movel)         │
│ tablet fixo  │ tablet fixo  │  maquininha no bolso      │
│ autoatend.   │ caixa compl. │  PDV + pagamento + print  │
└──────┬───────┴──────┬───────┴───────────┬───────────────┘
       │              │                   │
       └──────────────┼───────────────────┘
                      ▼
              ┌──────────────┐
              │   NXZ KDS    │
              │  (cozinha)   │
              │ mesma fila   │
              └──────────────┘
```

Todos os modos alimentam a mesma fila no KDS. O pedido do totem, do caixa e da maquininha chegam no mesmo lugar.

[Ver: NXZ ERP > Secao 3.1 PDV para configuracao de catálogo e precos no backend]
[Ver: NXZ Go Totem > Secao 3.3 para fluxo completo de pedido no autoatendimento]
[Ver: NXZ Go PDV > Secao 3.1 para controle de caixa com abertura/fechamento de turno]
[Ver: NXZ Go KDS > Funcionalidades para stages de producao e filtros por praca]

---

## 7. Terminologia

| Termo | Significado |
|-------|-------------|
| **Smart POS** | Terminal de pagamento inteligente com Android — a "maquininha" que roda o NXZ Go |
| **Pagamento nativo** | Cobranca feita direto no hardware da maquininha, sem app externo ou Bluetooth |
| **Multi-fabricante** | O app roda em maquininhas de Stone, Cielo, PagBank e MSiTef |
| **Impressao V3** | Sistema de impressao que usa a impressora termica integrada da maquininha |
| **Flavor** | Variante de build do app para cada fabricante (cielo, stone, pagbank) |
| **NFC** | Near Field Communication — tecnologia de pagamento por aproximacao |
| **DANFE** | Documento Auxiliar da Nota Fiscal Eletronica — a nota fiscal impressa |
| **NFC-e** | Nota Fiscal de Consumidor Eletronica — cupom fiscal digital |
| **KDS** | Kitchen Display System — tela da cozinha que recebe os pedidos |
| **BOM** | Ficha tecnica do produto — define opcoes de personalizacao (tamanhos, adicionais) |
| **Offline-first** | Funciona sem internet, sincroniza quando reconecta |
| **Whitelabel** | Personalizacao da interface com a marca do cliente |
| **Pricelist** | Tabela de precos — Smart POS pode ter precos diferentes de outros canais |
| **Modo BOTH** | Smart POS alterna entre funcao PDV e funcao KDS no mesmo dispositivo |
| **PlugPag** | SDK da PagBank para integracao nativa com maquininhas Moderninha |
| **Sessao** | Periodo de operacao do caixa (abertura → vendas → fechamento) |

---

## 8. Copy Pronto para Marketing

### Headlines

- "Seu proximo PDV cabe no bolso."
- "Maquininha que faz pedido, cobra e imprime. Tudo em um."
- "Food truck, evento, mesa — onde tiver cliente, voce vende."
- "Sem tablet, sem impressora, sem maquininha separada. So a maquininha."
- "Cobrou, imprimiu. Sem pareamento, sem espera, sem app externo."

### Sub-headlines

- "PDV completo em uma maquininha: pedido, pagamento e nota fiscal."
- "Stone, Cielo ou PagBank? O NXZ Go funciona em todas."
- "Sem internet? Continua vendendo. Sincroniza quando voltar."
- "A maquininha com a marca do seu negocio, nao a nossa."
- "Pedido feito na mesa, cozinha ja sabe. Sem grito, sem papel."

### Descricoes

**25 palavras:**
NXZ Go Smart POS: PDV completo na maquininha. Pedido, pagamento nativo, impressao e nota fiscal em um dispositivo. Offline-first. Multi-fabricante. Whitelabel.

**50 palavras:**
O NXZ Go Smart POS transforma a maquininha em PDV completo. O operador monta o pedido, cobra no cartao ou Pix direto no hardware (sem app externo), imprime o comprovante e o pedido vai pra cozinha em 2 segundos. Funciona offline, aceita Stone, Cielo e PagBank. Um dispositivo, operacao completa.

**100 palavras:**
Chega de carregar tablet, maquininha e impressora separados. O NXZ Go Smart POS coloca tudo em um unico dispositivo: o operador navega pelo catalogo visual, monta o pedido com personalizacao completa, cobra no cartao ou Pix direto no hardware da maquininha — sem pareamento Bluetooth, sem app externo — e imprime comprovante e nota fiscal na impressora termica integrada. O pedido vai pro KDS da cozinha em 2 segundos. Funciona offline (sincroniza quando a internet volta), roda em Stone, Cielo e PagBank, e exibe a marca do seu negocio. Ideal para food trucks, garcons, eventos e qualquer operacao que precisa de mobilidade.

### CTAs

- "Coloque um PDV no bolso do seu garcom — agende uma demo"
- "Veja como vender em qualquer lugar com uma maquininha"
- "Troque 3 equipamentos por 1 — fale com a gente"
- "Seu food truck merece um PDV de verdade"

### Argumentos para Objecoes

| Objecao | Resposta |
|---------|---------|
| "Maquininha so serve pra cobrar" | O NXZ Go Smart POS e um PDV completo: catalogo, pedido, personalizacao, desconto, comanda, nota fiscal e impressao. Cobrar e so uma das funcoes. |
| "Tela muito pequena" | Interface feita para tela de 5.5": categorias em chips, grid compacto, teclado adaptado. Otimizado para o polegar, nao adaptado de tablet. |
| "Preciso de uma maquininha especifica" | Funciona em Stone, Cielo, PagBank e MSiTef. Se trocar de adquirente, o app acompanha. |
| "E se cair a internet?" | Offline-first: continua vendendo com cache local. Pagamento nativo nao depende da internet do app. Quando volta, sincroniza tudo. |
| "Ja tenho sistema de caixa" | O Smart POS nao substitui, complementa. Garcom leva na mesa, entregador leva na rua, food truck leva no evento. O caixa fixo continua no lugar. |
| "Impressora separada e melhor" | A impressora da maquininha imprime DANFE, comprovante, ticket de cozinha e etiqueta. Sem fio, sem Bluetooth, sem bateria extra. |
| "Nao quero marca de terceiro" | Whitelabel: cores, logo e textos do seu negocio. O cliente ve a sua marca, nao a da Nexuz. |
| "Como integra com meu sistema?" | O Smart POS e conectado ao NXZ ERP. Catalogo, precos, estoque, fiscal e financeiro — tudo centralizado. Pedidos aparecem no ERP automaticamente. |

---

## 9. Casos de Uso por Segmento

### Food Truck / Ambulante
**Setup:** 1 maquininha Smart POS (Stone, Cielo ou PagBank)
**Impacto:** PDV completo em espaco zero. Sem mesa, sem tomada fixa, sem tablet. Operador monta pedido, cobra e imprime em um dispositivo. Funciona offline em areas sem Wi-Fi estavel. Setup: ligar e vender.

### Garcom na Mesa
**Setup:** 1-3 maquininhas para garcons + 1 KDS na cozinha
**Impacto:** Garcom atende, registra e cobra na mesa sem voltar ao caixa. Pedido vai pro KDS em 2 segundos. Conta fechada na hora — cliente nao espera. Rotatividade de mesa aumenta.

### Evento / Pop-up / Festival
**Setup:** 2-5 maquininhas por ponto de venda temporario
**Impacto:** Setup instantaneo — liga e vende. Desmonta e leva embora. Offline-first para locais sem infraestrutura. Whitelabel com marca do evento. Dados de venda centralizados no ERP apos o evento.

### Delivery com Cobranca na Entrega
**Setup:** 1 maquininha por entregador
**Impacto:** Entregador mostra pedido na tela, cobra cartao ou Pix, imprime comprovante. Se cliente quer adicionar item, faz ali mesmo. Nota fiscal emitida na hora.

### Operacao Compacta (Padaria, Cafeteria, Quiosque)
**Setup:** 1 Smart POS como caixa principal (sem tablet)
**Impacto:** Custo minimo de hardware. Balcao sem computador, sem monitor, sem gaveta. Toda operacao em um dispositivo de R$ 500-1.500 em vez de R$ 3.000-5.000 de infraestrutura PDV.

### Rede / Franquia Movel
**Setup:** Template replicavel — mesma configuracao para todas as unidades
**Impacto:** Cada unidade com mesmo catalogo, mesmos precos, mesma marca. Nova unidade operando em minutos. Gestao centralizada no ERP, hardware local independente.

---

## 10. Contexto de Mercado

### Maquininhas Inteligentes no Brasil

O mercado de Smart POS cresce aceleradamente: Stone, Cielo e PagBank investem em terminais Android com tela touch, impressora e conectividade. Mas a maioria dos apps disponiveis nessas maquininhas sao simples — catalogo basico, sem integracao com ERP, sem gestao de estoque, sem nota fiscal integrada. A maquininha virou hardware inteligente, mas o software ainda e "burro".

### Posicionamento do NXZ Go Smart POS

| Aspecto | Maquininha padrao | NXZ Go Smart POS |
|---------|-------------------|------------------|
| Funcao | Cobrar cartao | PDV completo (pedido + pagamento + impressao + fiscal) |
| Catalogo | Basico ou inexistente | Visual com categorias, imagens, BOM (personalizacao) |
| Integracao | Isolada | Nativo com ERP (estoque, fiscal, financeiro, KDS) |
| Fabricante | Preso a 1 | Multi-fabricante (Stone, Cielo, PagBank, MSiTef) |
| Offline | Requer internet | Offline-first com sync automatico |
| Marca | Do adquirente | Whitelabel — marca do cliente |
| Impressao | So comprovante de cartao | DANFE, comprovante, ticket de cozinha, etiqueta |
| Cozinha | Nao envia | Integrado com KDS — pedido em 2 segundos |

### Dados Reais do Sistema

- **3.184 pedidos** processados no ecossistema NXZ Go
- **R$ 146.715** em volume total de vendas
- **182 produtos** ativos no catalogo
- **~700 pedidos/mes** (media ultimos 5 meses)
- **Ticket medio:** R$ 46,07
- **16 categorias** food service (Acai & Bowls, Smoothies, Sucos, Quente, Gelada...)

### Tom de Voz

- **Foco:** Mobilidade, tudo em um, sem infraestrutura — "PDV no bolso"
- **Tom:** Pratico, direto ao beneficio, sem jargao tecnico — "Simples assim"
- **Narrativa central:** O Smart POS e para o OPERADOR MOVEL. Totem e para o CLIENTE. PDV e para o CAIXA FIXO. Smart POS e para quem precisa levar o PDV ate o cliente.
- **Evitar:** Linguagem tecnica (SDK, NativeModules, flavor), comparacoes com tablet, promessas de velocidade sem contexto
