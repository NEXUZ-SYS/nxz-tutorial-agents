# Comparativo — PDV vs Totem vs Smart POS

> O PDV, Totem e Smart POS compartilham a mesma base de código e funcionalidades. Este documento foca nas **diferenças** entre eles. Tudo que o Totem faz, o PDV também faz. Tudo que o PDV faz, o Smart POS também faz (com limitações de hardware).

## Princípio Geral

O Smart POS é essencialmente um **PDV completo rodando em uma maquininha**. Ele herda todas as funcionalidades do PDV/Totem, com duas limitações de hardware:

1. **Sem polling de conexão longa** — Provedores de pagamento via API polling (Stone API, Sumup, Pagarme) e Bluetooth+API (Cielo, PagBank, Stone Física) não são utilizados. O pagamento é feito diretamente pelo SDK nativo do terminal.
2. **Sem WebView** — Por restrições de segurança das maquininhas, funcionalidades que dependem de WebView não estão disponíveis.
3. **Sem KDS** — O modo KDS não funciona em Smart POS. Maquininhas não suportam operação como display de cozinha (tela pequena, sem suporte a conexão real-time prolongada).

## Configuração e Identificação

| Aspecto            | PDV (Caixa)     | Totem                  | Smart POS                                |
| ------------------ | --------------- | ---------------------- | ---------------------------------------- |
| Config type        | `caixa`         | `totem`                | `caixa` ou `totem`                       |
| `isPdv`            | `true`          | `false`                | Depende do config type                   |
| Flavor             | `playstore`     | `playstore`            | `cielo` / `stone` / `pagbank` / `msitef` |
| Dispositivo típico | Tablet Android  | Tablet 10"+ em suporte | Maquininha com Android                   |
| Layout detectado   | Phone ou Tablet | Phone ou Tablet        | Phone (tela ~5.5")                       |

## O que é igual nos três

Todas as funcionalidades abaixo estão presentes em PDV, Totem e Smart POS:

- Catálogo de produtos com categorias e busca
- Personalização de produtos via BOM
- Leitor de código de barras
- Identificação do cliente (simples, identificação, unificado)
- Opção dine-in/takeaway
- Código de vendedor
- Seleção de mesa
- Gorjeta
- Divisão de conta (se `useSplit`)
- Nota fiscal (opção imprimir/email/nenhuma, gerida pelo ERP)
- SAT/CF-e (se `config.sat`)
- Screen saver (se `whitelabel.savers`)
- Timer de inatividade
- Modo imersivo (barra Android oculta)
- Tela de configurações
- Comanda aberta / pedido rascunho
- Recuperação de pedido pós-crash
- Crons de background (Sale, SaleError, ClearCache, Device, Upgrade, etc.)
- Comunicação remota via WebSocket (restart, clear cache, debug, send CFe)

## Diferenças: PDV vs Totem

O Totem é um PDV com interface simplificada para uso pelo consumidor final.

| Aspecto                              | PDV (Caixa)                            | Totem                             |
| ------------------------------------ | -------------------------------------- | --------------------------------- |
| Drawer lateral                       | Slide com swipe                        | Bloqueado (front, sem swipe)      |
| Pagamentos offline                   | Exibidos diretamente, sem senha        | Protegidos por senha              |
| Seletor de tabela de preços          | Sim (se múltiplas pricelists)          | Não                               |
| Edição de preço por item             | Sim (configurável)                     | Não                               |
| Modal de cupom (sem digitar código)  | Abre lista de cupons + desconto manual | Precisa digitar código            |
| "Pagar no balcão" (draft → KDS)      | Não                                    | Sim (se `enableSendToKDSAsDraft`) |
| Gestão de pedidos (drawer)           | Retomar, cancelar, imprimir            | Não (drawer bloqueado)            |
| Controle de disponibilidade (drawer) | Sim                                    | Não (drawer bloqueado)            |
| Switch PDV ↔ KDS                     | Sim (se BOTH)                          | Sim (se BOTH)                     |

## Diferenças: Smart POS vs PDV/Totem

O Smart POS faz tudo que o PDV/Totem faz, exceto pelas limitações de hardware.

| Aspecto                  | PDV / Totem                              | Smart POS                               |
| ------------------------ | ---------------------------------------- | --------------------------------------- |
| **Pagamento**            | Via Bluetooth+API ou API polling         | SDK nativo do terminal (sem rede)       |
| **Impressão**            | V1 (RawBT) ou V2 (BLE/Network/USB)       | V3 — impressora térmica integrada       |
| **KDS**                  | Sim (se modo BOTH ou KDS)                | Não — sem suporte a KDS                 |
| **WebView**              | Sim                                      | Não — restrição de segurança            |
| **Polling de pagamento** | Stone API, Sumup, Pagarme, Bluetooth+API | Não — usa SDK nativo direto             |
| **Config type**          | `caixa` (PDV) ou `totem` (Totem)         | `caixa` ou `totem` — funciona nos dois  |
| **Cancelamento MSiTef**  | N/A                                      | Sim (se flavor msitef) — tela no drawer |
| **Admin MSiTef**         | N/A                                      | Sim (se flavor msitef)                  |

## Build e Distribuição

| Aspecto        | PDV / Totem                | Smart POS                         |
| -------------- | -------------------------- | --------------------------------- |
| Módulo Android | `playstore`                | `cielo` / `stone` / `pagbank`     |
| ApplicationId  | `com.moober_self_checkout` | Varia por fabricante              |
| Distribuição   | Play Store / APK           | APK direto / loja do terminal     |
| SDKs nativos   | Sumup SDK                  | SDK do fabricante (PlugPag, etc.) |
| Versionamento  | Unificado (5.19.9)         | Independente por módulo           |
