# Funcionalidades — PDV, Totem e Smart POS

> Lista completa de funcionalidades do ponto de venda. Tudo que o Totem e o Smart POS possuem, o PDV também possui. As diferenças estão documentadas no [comparativo](./comparativo.md).

## Tela Inicial e Atração

- **Screen Saver** — Slideshow de imagens promocionais configuráveis com duração por imagem. Ativado após 20 segundos de inatividade. Toque na tela retorna à tela de boas-vindas.
- **Tela de boas-vindas** — Logo do estabelecimento, mensagem customizável, tempo estimado de espera (ocultável) e botão "Novo Pedido" (texto configurável via whitelabel).
- **Alternância PDV ↔ KDS** — Quando o usuário está em modo `BOTH`, botão para trocar para KDS com modal de confirmação.
- **Recuperação de pedido** — Após crash/restart, detecta pedidos pendentes em cache e oferece retomar o pedido interrompido.

## Identificação do Cliente

- **Três modos de identificação**:
  - `simple` — Apenas nome do cliente
  - `identification` — Busca por chave (CPF, email ou telefone) via PartnerMuk, com toggle para modo simples
  - `unified` — Nome + chave opcional na mesma tela
- **Seletor de tabela de preços** — Quando há múltiplas pricelists configuradas (exclusivo do PDV)

## Opção de Consumo

- **"Para comer aqui"** ou **"Para levar"** — Dois botões grandes com ícones. Define `dineOption` do pedido. Habilitado via `configs.dineOptions`.

## Catálogo de Produtos

- **Layout adaptativo**:
  - **Tablet** — Sidebar vertical com categorias à esquerda + grid de produtos à direita + busca toggle + footer com carrinho animado
  - **Phone** — Chips de categorias em scroll horizontal + grid de produtos + resumo do carrinho no footer
- **Busca** — Campo de texto com debounce de 300ms
- **Leitor de código de barras** — Hidden TextInput + KeyEvent listener. Multiplicador de quantidade (1x, 2x, 3x, 5x, 10x, 20x) ciclável ou input manual.
- **Modal de produto** — Detalhes do produto com opção de adicionar ao carrinho ou ir para personalização

## Personalização de Produtos (BOM)

- **Tela fullscreen** com FlatList de etapas de customização (tamanho, sabor, adicionais)
- **Controle de quantidade** (+/-), ocultável quando quantidade é fixa (`qtyFixed`)
- **Preço atualizado em tempo real** conforme seleções
- **Auto-adição** quando há apenas uma opção no BOM

## Carrinho / Revisão do Pedido

- **Indicador de etapas**: Revisão → Nota Fiscal → Pagamento → Confirmação
- **Lista de itens** com edição, remoção, notas por item
- **Edição de preço por item** — Habilitado quando `configs.discount.usePrice === true`, com limites configuráveis (exclusivo PDV)
- **Campo CPF/CNPJ** para nota fiscal
- **Código de desconto/cupom** — Input de texto; validação automática ao digitar
- **Modal de cupom (exclusivo PDV)** — Ao clicar em "Aplicar" sem digitar código, abre modal com:
  - Lista de cupons existentes cadastrados (carregados via API)
  - Seção de desconto manual: porcentagem ou valor fixo (quando `usePrice` habilitado)
- **Código de vendedor** — Rastreamento por pedido (quando `configs.useSaller`)
- **Seleção de mesa** — Integração com planta do salão (floor/table hierarchy do Odoo, quando `configs.useTable`)
- **Gorjeta** — Percentual ou valor fixo configurável (quando `configs.useTip`)
- **Resumo financeiro**: subtotal, desconto, gorjeta, total

## Comanda e Rascunho

- **"Abrir comanda"** — Salva pedido como open tab no Firebase, visível no KDS para preparação. Pagamento posterior no caixa. Habilitado via `configs.paidLater`.
- **"Pagar no balcão"** — Salva pedido como draft no KDS e direciona o cliente ao caixa (Totem). Habilitado via `configs.enableSendToKDSAsDraft`.
- **Gestão de pedidos** (drawer, exclusivo PDV) — Lista pedidos draft/open tab com ações: retomar no carrinho, cancelar, imprimir.

## Seleção do Pager

- **Input numérico** para número do pager/comanda (quando `configs.usePager`). Label customizável via whitelabel.

## Nota Fiscal

- **Opções apresentadas ao cliente**:
  - "Não desejo nota fiscal"
  - "Imprimir nota fiscal" (ocultável via config ou quando auto-print está ativo)
  - "Enviar por e-mail" → tela de input de e-mail
- **Sem seleção de modelo** — O tipo de NF (NFC-e modelo 65 / SAT CF-e modelo 59) é gerido pelo ERP Odoo, não pelo operador
- **Skip automático** — Configurável via `configs.skipNfSelection`

## Integração SAT/CF-e

- **Independente do modo** — Funciona tanto no PDV quanto no Totem, ativada por `config.sat`
- **Geração de XML** conforme padrão CF-e-SAT v0.08 com ICMS, PIS, COFINS completos
- **Comunicação com equipamento SAT** via HTTP local (`config.sat.ip`)
- **Emissão e acompanhamento** com retry automático (até 3x) em caso de erro SAT
- **QR Code** gerado a partir da resposta SAT para impressão
- **Re-emissão remota** via WebSocket (ação `SendCFe` do ERP)

## Sistema de Pagamento

### Métodos Disponíveis

| Provedor | Códigos | Mecanismo |
| --- | --- | --- |
| Dinheiro | `CASH` | Offline, callback imediato |
| Sumup | `SUMUP` | Native SDK Android |
| Sumup PIX | `SUMUP_PIX` | Variante PIX |
| Cielo | `CCD/CCC/CCR/CCPX` | Bluetooth (webhook) + API (polling) em paralelo |
| PagBank | `PCD/PCC/PCR/PPIX` | Bluetooth (webhook) + API (polling) em paralelo |
| Stone | `SCD/SCC/SCR/SCPX` | API com polling |
| Stone Física | `SFCC/SFCD/SFCR/SFPX` | Bluetooth (webhook) + API (polling) em paralelo |
| Pagarme | — | API com polling |
| Smart POS Nativo | — | SDK nativo do terminal (Cielo/Stone/PagBank/MSiTef) |

### Bluetooth + API (Dual Channel)

As integrações Cielo, PagBank e Stone Física usam dois canais simultâneos:

1. **Bluetooth (webhook)** — Envia comando via `bluetooth.write()`, escuta resposta via `bluetooth.onData()`. Retry a cada 4 segundos.
2. **API (polling)** — Cria pagamento via `POST /payments`, poll a cada 3 segundos por até 180 segundos.

O canal que resolver primeiro vence; o outro é cancelado.

### Divisão de Conta

- Habilitada via `configs.useSplit` (funciona em PDV e Totem)
- Permite múltiplos pagamentos parciais com métodos diferentes
- O operador/cliente escolhe o valor de cada parcela
- Validação: valor máximo = saldo restante

### Fluxo de Pagamento

1. Seleção do método de pagamento
2. Para dinheiro: tela de troco com cálculo automático
3. Para eletrônicos: tela de processamento com countdown de 181 segundos
4. Hook `usePayment` gerencia UX: modal de QR code (PIX), carrossel de instruções (maquininha), ou loading genérico
5. Em caso de erro + `usePayAtCashierHelp`: oferece "Pagar no caixa"

## Impressão

- **DANFE** — Nota fiscal completa com tabela de produtos, totais, pagamentos, troco, QR code
- **Receipt** — Comprovante resumido
- **Ticket** — Ticket de produção para cozinha
- **Sticker** — Etiqueta de identificação
- **Impressão automática** — Configurável via `autoPrinterEnabled`
- **Retry de impressão** — Até 120 tentativas; após falha, oferece opção de envio por e-mail
- **Três gerações de drivers**:
  - V1: RawBT / EscPOS (modo Playstore padrão)
  - V2: BLE / Network TCP / USB (modo `direct`)
  - V3: Impressora nativa do terminal Smart POS

## Tela de Sucesso

- Mensagem customizável + GIF animado
- Countdown de 10 segundos para retorno automático (desabilitável via `disableTimer`)
- Botões: "Imprimir nota" e "Fazer novo pedido"

## Tela de Erro

- Mensagem, descrição e código do erro
- GIF animado de erro
- Toque na tela retorna ao carrinho para retry

## Timer de Inatividade

- Monitora todas as telas; qualquer toque reseta o timer
- Ao expirar, retorna à tela inicial ou screensaver
- Desabilitável via `configs.disableTimer`
- Gerenciado pelo `TimerManager` no contexto `Pdv`

## Administração

### Configurações (tela Settings, acessível via ícone de engrenagem)

- Tipo de dispositivo (phone/tablet/auto)
- Configuração de terminal Sumup
- Código de ativação do dispositivo
- Teste de pagamento
- Configuração MSiTef (configure + admin menu)
- Auto-aceite de pedidos iFood
- Terminal Bluetooth de pagamento
- Enviar como pronto (toggle)
- Configuração de impressora
- Health check do sistema
- Info do app e dispositivo
- Limpeza de cache e pedidos
- Logout

### Controle de Disponibilidade de Produtos (drawer)

- Lista paginada de todos os produtos
- Toggle de `available_in_pos` por produto
- Alteração de status: indisponível, em processo, parcial, disponível

### MSiTef (Smart POS)

- **Admin Menu** — Menu administrativo do terminal MSiTef
- **Cancelamento de transação** — Tela dedicada no drawer, com cache local de transações e `markAsCancelled()`
- **Configuração** — `configure()` para inicialização do terminal

## Background Jobs (Crons)

| Cron | Modo | Frequência | Função |
| --- | --- | --- | --- |
| Sale | PDV | 5 seg | Processa fila de pedidos, envia ao Odoo, salva no Firebase |
| SaleError | PDV | — | Reprocessa pedidos com erro |
| NotifyOrders | PDV | — | Notifica pedidos pendentes |
| SendEmail | PDV | — | Envia e-mails de NF |
| ClearCache | BOTH | 24h | Remove cache expirado |
| Device | BOTH | — | Health check e registro do dispositivo |
| NotifyErrors | BOTH | — | Pipeline de notificação de erros |
| Upgrade | BOTH | — | Verifica atualizações OTA |

## Comunicação em Tempo Real

- **WebSocket (Odoo Bus)** — Longpolling Odoo 12 para CRUD de produtos/categorias em tempo real
- **Ações remotas via WebSocket**: restart, clear cache, debug mode, status, send CFe, clear crons
