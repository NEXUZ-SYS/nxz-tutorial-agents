# Briefing de Contexto: NXZ Go — Guia Completo para Vendas

> Versao: v1.0 | Data: 2026-04-02 | Publico: Sales (Vendas) | Nivel: Operacional

## Metadata

- **Produto:** NXZ Go — Todos os Modos (Totem, PDV, Smart POS)
- **Categoria:** Plataforma de PDV e Autoatendimento para Food Service (Android)
- **Versao atual:** 5.13.1
- **Publico-Alvo do Briefing:** Equipe de Vendas
- **Nivel Organizacional:** Operacional
- **Objetivo:** Base para treinamento de equipe de vendas
- **Modelo Comercial:** SaaS — parte do ecossistema NXZ (vendido com NXZ ERP)
- **Pricing:** Consultar tabela interna (confidencial — nao incluido neste briefing)
- **Produtos Relacionados:**
  - NXZ ERP — backend obrigatorio (catalogo, precos, estoque, fiscal, financeiro)
  - NXZ KDS — tela de cozinha (sistema separado, nao e modo do NXZ Go)
  - NXZ Delivery — centralizador de pedidos delivery (iFood, Rappi)

---

## 1. O que e o NXZ Go

O NXZ Go e um unico app Android que funciona em 3 modos diferentes, no mesmo dispositivo ou em dispositivos separados. Cada modo atende uma necessidade diferente do estabelecimento:

| Modo | Quem usa | Hardware | Uma frase |
|------|----------|----------|-----------|
| **Totem** | O cliente | Tablet Android | Autoatendimento com a marca do cliente |
| **PDV** | O operador de caixa | Tablet Android | Caixa registradora completa |
| **Smart POS** | O operador movel | Maquininha inteligente | PDV completo no bolso |

**Frase-chave para o prospect:** "E um unico sistema que se adapta ao seu negocio. O cliente pede no totem, o caixa registra no PDV, o garcom atende na maquininha — e tudo chega na mesma cozinha, no mesmo financeiro, no mesmo sistema."

### O que NAO e o NXZ Go

- Nao e um app de delivery (isso e o NXZ Delivery)
- Nao e o sistema da cozinha (isso e o NXZ KDS — produto separado)
- Nao e um ERP (o backend e o NXZ ERP — obrigatorio, vendido junto)
- Nao e uma maquininha de cartao (e um PDV que roda NA maquininha)

---

## 2. Base Comum — 11 Capacidades em Todos os Modos

Estas funcionalidades estao presentes nos 3 modos. Use como argumentos gerais:

### 2.1 Whitelabel Total
Interface 100% personalizada com a marca do cliente: cores, logo, textos, screensaver. Nenhuma referencia a "NXZ" ou "Nexuz" aparece para o consumidor final.

**Para vendas:** "O seu cliente ve a SUA marca. Se voce nao contar, ele nunca vai saber que e tecnologia Nexuz."

### 2.2 Multi-Adquirente
Funciona com Stone, Cielo, PagBank, SumUp, Pagarme e PIX. O prospect nao precisa trocar de adquirente.

**Para vendas:** "Qual maquininha voce usa hoje? Stone? Cielo? PagBank? Funciona com todas. E se trocar no futuro, o sistema acompanha."

### 2.3 Offline-First
Funciona sem internet. Catalogo, precos e operacoes ficam em cache local. Quando a conexao volta, sincroniza automaticamente com o ERP.

**Para vendas:** "Caiu o Wi-Fi? O sistema continua funcionando. Quando volta, sincroniza tudo sozinho. Seu cliente nunca sabe que houve problema."

### 2.4 Integracao KDS — Cozinha em 2 Segundos
Todo pedido (do totem, do caixa ou da maquininha) aparece na tela da cozinha automaticamente. Mesma fila, mesma prioridade.

**Para vendas:** "O pedido sai da tela e aparece na cozinha em 2 segundos. Sem grito, sem papel, sem ir ate o balcao."

### 2.5 Nota Fiscal Integrada
Emissao de NFC-e automatica com impressao na hora. CPF/CNPJ na nota, envio por email, DANFE impresso.

**Para vendas:** "Nota fiscal emitida automaticamente, sem impressora fiscal separada, sem complicacao."

### 2.6 Catalogo Visual com Personalizacao
Categorias com imagens, ficha tecnica (BOM) para adicionais e tamanhos, busca por nome, multiplicador de quantidade.

**Para vendas:** "O cliente ve o cardapio com fotos, personaliza o pedido do jeito dele — tamanho, extras, observacoes. Tudo configurado no ERP, aparece igual em todos os canais."

### 2.7 Sessao Automatica
Abertura e fechamento de caixa por horario, sem intervencao humana.

### 2.8 Pricelist — Precos por Canal
Cada modo/ponto de venda pode ter tabela de precos diferente. Totem com preco de autoatendimento, balcao com preco de mesa.

### 2.9 Cupom e Desconto
Aplicacao de cupons e descontos manuais com rastreabilidade.

### 2.10 Recuperacao Pos-Crash
Pedidos pendentes recuperados automaticamente se o app reiniciar.

### 2.11 Monitoramento Sentry
Erros reportados automaticamente para a equipe tecnica — o cliente nao precisa abrir chamado.

---

## 3. Modo Totem — Autoatendimento

### Quando recomendar
- Prospect reclama de **filas**
- Quer **aumentar ticket medio** sem contratar mais gente
- Tem **operacao to-go** (cafeteria, fast food, padaria)
- Quer **liberar equipe** para producao

### Pitch de 30 segundos
"O NXZ Go Totem transforma qualquer tablet Android em um totem de autoatendimento com a marca do seu cliente. O consumidor faz o pedido sozinho, paga com cartao ou Pix, e o pedido vai direto pra cozinha. Funciona offline, sem fila, e o screensaver roda as promocoes 24 horas. Nao precisa de hardware especial — qualquer tablet serve."

### Diferenciais exclusivos do Totem
1. **Screensaver como marketing 24h** — Quando ninguem esta usando, o totem exibe promocoes do estabelecimento. Marketing gratuito, 24 horas.
2. **"Pagar no caixa"** — Se o pagamento eletronico falha, o pedido e salvo e o cliente vai ao caixa. Zero abandono.
3. **Modo imersivo** — Tela fullscreen sem barra do Android. Experiencia limpa.
4. **Drawer bloqueado** — Cliente nao acessa configuracoes. Seguro para operar sem supervisao.
5. **Timer de inatividade** — Volta ao screensaver automaticamente.
6. **Split bill** — Divisao de conta entre multiplos pagantes.

### Casos de uso Totem

| Segmento | Setup | Impacto |
|----------|-------|---------|
| Cafeteria / Juiceria | 1 totem na entrada + KDS | Fila eliminada, ticket medio sobe (cliente explora cardapio visual) |
| Fast food | 2-3 totens no salao + KDS por praca | 30 pedidos/hora por totem, equipe focada em producao |
| Praca de alimentacao | 1 totem por quiosque, whitelabel individual | Gestao unificada, experiencia individualizada por marca |
| Rede de franquias | Template replicavel por unidade | Padronizacao total, nova unidade com totem em horas |
| Padaria | 1 totem to-go + PDV no balcao | 2 canais, 1 financeiro |
| Evento / Pop-up | 1-2 tablets temporarios | Monta em 10 min, desmonta e leva embora |

### Objecoes comuns — Totem

| Objecao | Resposta |
|---------|---------|
| "Totem e caro" | Roda em qualquer tablet Android. Nao precisa de totem dedicado de R$ 15 mil. |
| "Meu cliente nao sabe usar" | Categorias visuais com fotos, toque para pedir. Se usa smartphone, usa o totem. |
| "E se o pagamento falhar?" | "Pagar no caixa" — pedido salvo, cliente paga no balcao. Zero perda. |
| "Nao quero marca de terceiro" | Whitelabel total. Nenhuma referencia a NXZ aparece. |
| "E se cair a internet?" | Offline-first. Continua vendendo, sincroniza depois. |

---

## 4. Modo PDV — Caixa do Operador

### Quando recomendar
- Prospect precisa de **controle de caixa** (abertura, sangria, fechamento)
- Tem **operacao com mesas** e comandas
- Precisa de **rastreabilidade por operador/turno**
- Quer **substituir caixa registradora** ou PDV legado

### Pitch de 30 segundos
"O NXZ Go PDV e uma caixa registradora completa em um tablet. Abertura de caixa com fundo de troco, sangria, suprimento, fechamento com conferencia automatica. Modo restaurante com mesas e comandas. Desconto, cupom, nota fiscal — tudo integrado com o ERP. O caixa sabe exatamente quanto deveria ter na gaveta. Nunca mais fechar no escuro."

### Diferenciais exclusivos do PDV
1. **Controle de caixa completo** — Abertura (fundo de troco), sangria, suprimento, fechamento com conferencia. Relatório por operador.
2. **Modo restaurante** — Mesas, comandas, adicionar itens a pedidos existentes.
3. **Edicao de preco na hora** — Gerente pode ajustar preco de um item sem ir ao ERP.
4. **Dinheiro como pagamento padrao** — Aceita dinheiro nativo (diferente do Totem).
5. **Gestao de disponibilidade** — Marcar produto como indisponivel direto no caixa.
6. **Modal de cupom** — Lista de cupons aplicaveis com busca.
7. **Relatório por turno/operador** — Cada caixa rastreado individualmente.

### Casos de uso PDV

| Segmento | Setup | Impacto |
|----------|-------|---------|
| Restaurante com mesa | 1 PDV no balcao + mesas configuradas | Controle por mesa/comanda, garcom lanca direto |
| Cafeteria alto volume | 2 PDVs no balcao + KDS | 50-200 pedidos/turno com conferencia de caixa |
| Bar / Cervejaria | 1 PDV + comandas | Comanda aberta, fecha quando cliente quiser |
| Operacao com franquias | PDV padronizado por unidade | Mesmo fluxo, mesmo relatorio, gestao centralizada |

### Objecoes comuns — PDV

| Objecao | Resposta |
|---------|---------|
| "Ja tenho PDV" | O NXZ Go integra nativo com ERP, KDS e Totem. O pedido do caixa e do totem chegam na mesma cozinha. Seu PDV atual faz isso? |
| "Meu caixa nao e tech-savvy" | Interface visual com fotos, toque para adicionar. Se usa WhatsApp, usa o PDV. |
| "Preciso de gaveta de dinheiro" | Compativel. Fundo de troco, sangria, suprimento e fechamento com conferencia. |
| "E muito caro trocar" | Roda em qualquer tablet Android. Sem hardware dedicado. |

---

## 5. Modo Smart POS — Maquininha Inteligente

### Quando recomendar
- Prospect precisa de **mobilidade** (garcom na mesa, food truck, evento)
- Quer **eliminar multiplos dispositivos** (tablet + maquininha + impressora)
- Tem **operacao compacta** sem espaco para PDV fixo
- Faz **delivery com cobranca na entrega**

### Pitch de 30 segundos
"O NXZ Go Smart POS transforma a maquininha em um PDV completo. Pedido, pagamento nativo no hardware, impressao e nota fiscal — tudo em um dispositivo que cabe no bolso. O garcom atende na mesa sem voltar ao caixa. O food truck vende sem montar infraestrutura. Funciona offline, roda em Stone, Cielo e PagBank."

### Diferenciais exclusivos do Smart POS
1. **Pagamento nativo zero latencia** — Cobra direto no hardware, sem app externo, sem Bluetooth, sem polling.
2. **Impressora termica integrada** — DANFE, comprovante, ticket de cozinha, etiqueta. Sem impressora extra.
3. **Interface compacta** — Feita para tela de 5.5", nao adaptada de tablet.
4. **Modo BOTH** — Alterna entre PDV e KDS no mesmo dispositivo.
5. **Multi-fabricante** — Stone POS, Cielo LIO, PagBank Moderninha, MSiTef.
6. **Tudo em 1** — Substitui tablet + maquininha + impressora por 1 dispositivo.

### Casos de uso Smart POS

| Segmento | Setup | Impacto |
|----------|-------|---------|
| Food truck / Ambulante | 1 maquininha | PDV completo em espaco zero, funciona offline |
| Garcom na mesa | 1-3 maquininhas + KDS | Atende, registra e cobra sem voltar ao caixa |
| Evento / Pop-up | 2-5 maquininhas | Liga e vende, desmonta e leva embora |
| Delivery na entrega | 1 maquininha por entregador | Mostra pedido, cobra, imprime na hora |
| Operacao compacta | 1 Smart POS como caixa | Custo minimo: R$ 500-1.500 vs R$ 3-5K de PDV fixo |
| Rede movel | Template por unidade | Mesma config replicada, gestao centralizada |

### Objecoes comuns — Smart POS

| Objecao | Resposta |
|---------|---------|
| "Maquininha so serve pra cobrar" | E um PDV completo: catalogo, pedido, desconto, comanda, NF, impressao. Cobrar e so 1 das funcoes. |
| "Tela muito pequena" | Interface feita para 5.5" — categorias em chips, teclado adaptado. Otimizado pro polegar. |
| "Ja tenho maquininha" | Se for Stone, Cielo ou PagBank, o NXZ Go roda nela. Sem trocar hardware. |
| "E se cair a internet?" | Offline-first + pagamento nativo nao depende de internet do app. |

---

## 6. Matriz de Decisao — Qual Modo Recomendar?

### Por Tipo de Operacao

| Operacao | Modo recomendado | Por que |
|----------|-----------------|---------|
| Autoatendimento (cliente pede sozinho) | **Totem** | Feito para o consumidor final, sem operador |
| Caixa fixo com operador | **PDV** | Controle de caixa, mesas, comandas, sangria |
| Garcom na mesa | **Smart POS** | Mobilidade — atende, registra e cobra sem voltar |
| Food truck / Ambulante | **Smart POS** | Tudo em 1 dispositivo, sem infraestrutura |
| Evento temporario | **Smart POS** ou **Totem** | Smart POS se operador, Totem se autoatendimento |
| Delivery com cobranca | **Smart POS** | Entregador leva a maquininha |

### Por Tamanho do Negocio

| Tamanho | Recomendacao | Setup tipico |
|---------|-------------|-------------|
| Micro (1-2 pessoas) | **Smart POS** | 1 maquininha = PDV completo |
| Pequeno (3-10 pessoas) | **PDV** + opcional Totem | 1 PDV no balcao + 1 totem na entrada |
| Medio (10-30 pessoas) | **PDV** + **Totem** + **Smart POS** | 2 PDVs + 2 totens + maquininhas pra garcom |
| Grande / Franquia | **Todos os modos** | Template replicavel por unidade, gestao centralizada |

### Por Dor Principal

| Dor | Modo | Argumento |
|-----|------|-----------|
| "Muita fila" | **Totem** | Cliente pede sozinho, sem fila no caixa |
| "Nao sei quanto tem no caixa" | **PDV** | Abertura, sangria, fechamento com conferencia |
| "Garcom vai e volta pro caixa" | **Smart POS** | Atende, registra e cobra na mesa |
| "Custo de hardware alto" | **Smart POS** | R$ 500-1.500 vs R$ 3-5K de PDV fixo |
| "Ticket medio baixo" | **Totem** | Cardapio visual, cliente explora mais opcoes |
| "Pedido chega errado na cozinha" | **Qualquer modo + KDS** | Pedido digital direto na tela da cozinha |
| "Preciso de mobilidade" | **Smart POS** | PDV no bolso, funciona em qualquer lugar |

---

## 7. Guia de Demo — O que Mostrar

### Sequencia recomendada (15 minutos)

**Wow moment 1 — Whitelabel (2 min)**
Abra o app com a marca de um cliente real. Mostre: logo, cores, screensaver com promocoes. Diga: "Isso aqui e a marca do No. Coffee. O cliente final nunca ve 'NXZ' em lugar nenhum."

**Wow moment 2 — Pedido → KDS (3 min)**
Faca um pedido no Totem ou PDV. Mostre o pedido aparecendo no KDS em 2 segundos. Diga: "Saiu da tela, apareceu na cozinha. Sem grito, sem papel."

**Wow moment 3 — Multi-modo (3 min)**
Mostre o mesmo app alternando entre Totem, PDV e Smart POS. Diga: "E o mesmo sistema. O pedido do totem, do caixa e da maquininha chegam na mesma fila da cozinha."

**Features de apoio (5-7 min)**
Conforme a dor do prospect, aprofunde:
- Se fila: screensaver, fluxo completo do totem, pagar no caixa
- Se controle: abertura de caixa, sangria, fechamento, relatorio
- Se mobilidade: pagamento nativo, impressao integrada, offline
- Se franquia: multi-empresa, template replicavel, pricelist por canal

**Fechamento (2 min)**
Mostre os dados reais: "Esse sistema esta em producao. 3.184 pedidos processados, 182 produtos, operacao real."

### O que NAO mostrar na primeira demo
- Configuracao do ERP (complexo demais para primeira impressao)
- Integracao tecnica (APIs, SDKs)
- Pricing (tratar em conversa separada com tabela interna)

---

## 8. Comparativo Competitivo

### vs Sistemas POS Tradicionais (Linx, TOTVS, Saipos, Consumer)

| Aspecto | POS Tradicional | NXZ Go |
|---------|----------------|--------|
| Hardware | PC dedicado ou proprietario | Qualquer tablet Android ou maquininha |
| Autoatendimento | Produto separado ou inexistente | Modo Totem nativo no mesmo app |
| Mobilidade | Nao tem ou add-on caro | Smart POS nativo |
| Marca | Marca do fornecedor visivel | Whitelabel total |
| Offline | Requer servidor local | Offline-first nativo |
| Integracao cozinha | Separado ou impressora | KDS em 2 segundos (produto separado NXZ) |
| Multi-adquirente | Preso a 1-2 | Stone, Cielo, PagBank, SumUp, Pagarme, PIX |
| Multi-modo | Nao — cada funcao e um produto | 1 app, 3 modos |

**Argumento central:** "Eles vendem 3 produtos separados para fazer o que o NXZ Go faz em 1 app."

### vs Apps de Autoatendimento (Anota AI, Goomer, Menu Digital iFood)

| Aspecto | App de autoatendimento | NXZ Go |
|---------|----------------------|--------|
| PDV completo | Nao tem (so autoatendimento) | PDV + Totem + Smart POS |
| Controle de caixa | Nao tem | Abertura, sangria, fechamento, relatorio |
| Integracao ERP | Basica ou inexistente | Nativo com NXZ ERP (estoque, fiscal, financeiro) |
| Offline | Requer internet | Offline-first |
| Marca | Marca do fornecedor | Whitelabel total |
| Impressao | Via impressora externa | Nativo (Smart POS) ou configuravel |
| Nota fiscal | Parcial ou inexistente | NFC-e integrada em todos os modos |

**Argumento central:** "Eles resolvem 1 pedaco do problema. O NXZ Go resolve a operacao inteira."

---

## 9. Upsell e Combinacoes

### Pacotes naturais

| Prospect quer | Venda | Adicione |
|--------------|-------|---------|
| Totem | Totem + NXZ ERP (obrigatorio) | KDS para a cozinha receber os pedidos |
| PDV | PDV + NXZ ERP (obrigatorio) | Totem para autoatendimento + KDS |
| Smart POS | Smart POS + NXZ ERP (obrigatorio) | PDV fixo para o balcao + KDS |
| "Quero tudo" | PDV + Totem + Smart POS + NXZ ERP | KDS por praca de producao + NXZ Delivery |

### Gatilhos de upsell

| Sinal do prospect | Oportunidade |
|-------------------|-------------|
| "Tenho mais de 1 unidade" | Multi-empresa no ERP + template replicavel |
| "Faco delivery" | NXZ Delivery (centraliza iFood, Rappi) |
| "Minha cozinha e lenta" | NXZ KDS por praca (frios, quentes, bar) |
| "Quero dados de venda" | Dashboard do ERP + relatorios |
| "Preciso controlar estoque" | Modulo de estoque do NXZ ERP |

---

## 10. Terminologia para Vendedores

| Termo | O que dizer ao prospect |
|-------|------------------------|
| **Whitelabel** | "A interface fica com a sua marca — cores, logo, textos. Ninguem sabe que e tecnologia Nexuz." |
| **Offline-first** | "Funciona sem internet. Quando volta, sincroniza sozinho." |
| **Multi-adquirente** | "Funciona com qualquer maquininha — Stone, Cielo, PagBank." |
| **KDS** | "Tela na cozinha que recebe os pedidos automaticamente." |
| **Smart POS** | "PDV completo dentro da maquininha." |
| **Pagamento nativo** | "Cobra direto na maquininha, sem app externo." |
| **BOM** | "Ficha tecnica do produto — define os adicionais e tamanhos que o cliente pode escolher." |
| **Pricelist** | "Tabela de precos — voce pode ter preco diferente no totem e no balcao." |
| **Sessao automatica** | "O caixa abre e fecha sozinho no horario que voce configurar." |
| **NFC-e** | "Cupom fiscal digital — emitido e impresso automaticamente." |
| **Screensaver** | "Quando ninguem esta usando o totem, ele exibe as promocoes do restaurante." |
| **Modo BOTH** | "A maquininha pode virar tela de cozinha — 2 funcoes em 1 dispositivo." |
| **Sangria** | "Retirada de dinheiro do caixa durante o turno (ex: enviar ao cofre)." |
| **Draft** | "Pedido salvo sem pagamento — usado quando o cliente vai pagar no caixa." |

---

## 11. Dados Reais para Credibilidade

Use estes dados em apresentacoes e propostas:

- **3.184 pedidos** processados no sistema em producao
- **R$ 146.715** em volume de vendas
- **182 produtos** ativos no catalogo
- **~700 pedidos/mes** (media operacional)
- **Ticket medio:** R$ 46,07
- **1.049 clientes** cadastrados
- **Multi-empresa ativa:** No. Coffee com 3 unidades (Matriz, Peruibe, Santos)
- **16 categorias** food service em operacao real

**Para vendas:** "Isso nao e demo. E sistema em producao, com vendas reais, em operacao diaria."

---

## 12. Cross-References

### Fluxo Completo do Ecossistema

```
┌─────────────────────────────────────────────────────────┐
│                    NXZ Go (1 app)                       │
├──────────────┬──────────────┬───────────────────────────┤
│   Totem      │    PDV       │     Smart POS             │
│ (cliente)    │ (operador)   │  (operador movel)         │
│ tablet fixo  │ tablet fixo  │  maquininha no bolso      │
└──────┬───────┴──────┬───────┴───────────┬───────────────┘
       │              │                   │
       └──────────────┼───────────────────┘
                      ▼
              ┌──────────────┐
              │   NXZ ERP    │◄──── Catalogo, precos, estoque, fiscal
              │  (backend)   │
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │   NXZ KDS    │◄──── Pedidos de TODOS os canais
              │  (cozinha)   │
              └──────────────┘
                     ▲
              ┌──────────────┐
              │ NXZ Delivery │◄──── iFood, Rappi, pedidos externos
              │(centralizador)│
              └──────────────┘
```

[Ver: NXZ ERP > Briefing Marketing para detalhes do backend e módulos]
[Ver: NXZ Go Totem > Briefing Marketing para funcionalidades detalhadas do autoatendimento]
[Ver: NXZ Go PDV > Briefing Marketing para controle de caixa e modo restaurante]
[Ver: NXZ Go Smart POS > Briefing Marketing para pagamento nativo e impressao integrada]
