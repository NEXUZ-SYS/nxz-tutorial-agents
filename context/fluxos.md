# Fluxos — Diagramas

> Diagramas Mermaid dos fluxos principais de cada modo.

## Fluxo de Inicialização do App

```mermaid
flowchart TD
    A[App Inicia] --> B[WelcomeConfiguration]
    B --> C[SignIn]
    C --> D[Start - Carregamento]
    D --> E{loadingStore}
    E --> F[Busca sessão, config, catálogo, BOMs]
    F --> G[Inicializa socket, crons, modo imersivo]
    G --> H{user.mode?}
    H -->|KDS| I[Navega para KDS]
    H -->|PDV ou BOTH| J[Navega para PDV]
```

## Fluxo Completo — PDV / Totem / Smart POS

```mermaid
flowchart TD
    SS[Screen Saver<br/>Slideshow promocional] -->|Toque na tela| SC
    SC[StartCustomerOrder<br/>Tela de boas-vindas] --> RC{Recuperar<br/>pedido pendente?}
    RC -->|Sim| CART
    RC -->|Não| ID_CHECK

    ID_CHECK{identify_after_cart<br/>ou hidden_name?}
    ID_CHECK -->|Sim, tem dineOptions| DINE
    ID_CHECK -->|Sim, sem dineOptions| PROD
    ID_CHECK -->|Não| CI

    CI[CustomerIdentification<br/>Nome / CPF / Email / Telefone] --> DINE_CHECK
    DINE_CHECK{dineOptions?}
    DINE_CHECK -->|Sim| DINE
    DINE_CHECK -->|Não| PROD

    DINE[DineOptions<br/>Comer aqui / Levar] --> PROD

    PROD[ProductsList<br/>Catálogo com categorias e busca] -->|Adiciona produto| CUSTOM_CHECK
    CUSTOM_CHECK{Tem BOM?}
    CUSTOM_CHECK -->|Sim| CUSTOM[Customization<br/>Tamanho, sabor, adicionais]
    CUSTOM_CHECK -->|Não| PROD
    CUSTOM --> PROD

    PROD -->|Vai para carrinho| CART
    CART[ShoppingCart<br/>Revisão do pedido] --> PAGER_CHECK

    PAGER_CHECK{usePager?}
    PAGER_CHECK -->|Sim| PAGER[PagerSelection<br/>Número do pager]
    PAGER_CHECK -->|Não| PAID_CHECK
    PAGER --> PAID_CHECK

    PAID_CHECK{paidLater?}
    PAID_CHECK -->|Sim| PL[PaidLater<br/>Abrir comanda ou pagar agora?]
    PAID_CHECK -->|Não| NF
    PL -->|Abrir comanda| DRAFT_SAVE[SaveDraft → Volta ao início]
    PL -->|Pagar agora| NF

    NF{skipNfSelection?}
    NF -->|Sim| SAVE
    NF -->|Não| NFS[NFStatus<br/>Imprimir / Email / Nenhuma]
    NFS -->|Email| NFE[NFStatusEmail<br/>Input de e-mail]
    NFS --> SAVE
    NFE --> SAVE

    SAVE[SaveDraft<br/>Salva pedido] --> SPLIT_CHECK

    SPLIT_CHECK{useSplit?}
    SPLIT_CHECK -->|Sim| PO[PaymentOptions<br/>Pagar tudo ou dividir?]
    SPLIT_CHECK -->|Não| PT
    PO --> PT

    PT[PaymentType<br/>Seleção do método] --> PT_ACTION

    PT_ACTION{Método selecionado}
    PT_ACTION -->|Dinheiro| PC[PaymentChange<br/>Cálculo de troco]
    PT_ACTION -->|Eletrônico + split| PV[PaymentValue<br/>Valor da parcela]
    PT_ACTION -->|Eletrônico| PAY
    PT_ACTION -->|Pagar no balcão<br/>Totem only| DRAFT_SAVE
    PV --> PAY

    PAY[Paying<br/>Processamento - 181s countdown] --> PAY_RESULT
    PC --> SEND

    PAY_RESULT{Resultado}
    PAY_RESULT -->|Aprovado + saldo restante| PT
    PAY_RESULT -->|Aprovado + saldo zero| SEND
    PAY_RESULT -->|Erro| ERR_PAY{usePayAtCashierHelp?}
    ERR_PAY -->|Sim| DRAFT_SAVE
    ERR_PAY -->|Não| PT

    SEND[SendSale<br/>Gera fiscal + envia ao backend] --> SEND_RESULT
    SEND_RESULT{Resultado}
    SEND_RESULT -->|Sucesso| OK[SuccessOrder<br/>Confirmação + auto-print]
    SEND_RESULT -->|Erro| ERR[ErrorOrder<br/>Toque para voltar ao carrinho]
    ERR --> CART
    OK -->|10s ou toque| SC
```

## Fluxo de Pagamento Detalhado

```mermaid
flowchart TD
    PT[PaymentType] --> METHOD{Tipo do método}

    METHOD -->|Cash| CHANGE[PaymentChange<br/>Input valor recebido<br/>Cálculo de troco]
    CHANGE --> RECORD[Registra pagamento]

    METHOD -->|Bluetooth + API<br/>Cielo/PagBank/Stone Física| DUAL
    DUAL[Inicia dual channel] --> BT[Bluetooth write<br/>Retry 4s]
    DUAL --> API_CREATE[POST /payments<br/>Cria pagamento]
    API_CREATE --> API_POLL[GET /payments/id<br/>Poll 3s / 180s max]
    BT --> RACE{Primeiro a resolver}
    API_POLL --> RACE
    RACE --> CALLBACK

    METHOD -->|API only<br/>Stone/Sumup/Pagarme| API_ONLY
    API_ONLY --> API_CREATE2[POST /payments<br/>Cria pagamento]
    API_CREATE2 --> API_POLL2[GET /payments/id<br/>Poll 2s]
    API_POLL2 --> CALLBACK

    METHOD -->|Native SDK<br/>Smart POS| NATIVE
    NATIVE[paymentModule.payment<br/>amount, type, installments] --> EVENTS[NativeEventEmitter<br/>PAYMENT events]
    EVENTS --> CALLBACK

    CALLBACK{Resultado}
    CALLBACK -->|paid| SUCCESS[Pagamento registrado]
    CALLBACK -->|canceled| CANCEL[Retorna ao PaymentType]
    CALLBACK -->|payment_failed| ERROR[Exibe erro]
    CALLBACK -->|AMOUNT_ERROR| AMT_ERR[Valor inválido]

    SUCCESS --> SPLIT_CHECK{inSplit e<br/>saldo restante?}
    SPLIT_CHECK -->|Sim| PT
    SPLIT_CHECK -->|Não| SEND[SendSale]
```

## Fluxo KDS — Ciclo de Vida do Pedido

```mermaid
flowchart TD
    SRC[Fontes de pedidos] --> FB[Firebase / Supabase]

    SRC --- PDV_SRC[PDV / Totem / Smart POS]
    SRC --- IFOOD_SRC[iFood]
    SRC --- OD_SRC[Open Delivery<br/>Keeta, 99Food, VCQPad]

    FB -->|onValue / realtime| OM[OrderManager<br/>Singleton EventEmitter]
    OM -->|emit update| HOME[Home - Pedidos Ativos]

    HOME --> CARD[Card do Pedido]

    CARD --> ACTIONS{Ações disponíveis}
    ACTIONS -->|iFood não confirmado| ACCEPT{Aceitar?}
    ACCEPT -->|Sim| CONFIRMED[Pedido confirmado]
    ACCEPT -->|Não| REJECT[Pedido rejeitado]

    ACTIONS -->|Pedido ativo| STAGE_MGMT[Gerenciar stages]
    STAGE_MGMT --> ITEM_STAGE{Stage do item}
    ITEM_STAGE -->|vazio| PROGRESS[Em preparação]
    ITEM_STAGE -->|progress| DONE[Pronto]
    ITEM_STAGE -->|done| CONFIRM[Confirmado]

    STAGE_MGMT --> ALL_DONE{Todos itens done?}
    ALL_DONE -->|Sim| PENDING[Pending Finish]
    PENDING --> FINISH[Operador finaliza]
    FINISH --> HISTORY[Histórico]

    ACTIONS -->|Imprimir| PRINT[Ticket / Sticker / DANFE]
    ACTIONS -->|Disputar iFood| DISPUTE[Modal de disputa]

    HISTORY --> CLEANUP[Cron ExcludeOrder<br/>Mantém max 100]
```

## Fluxo KDS — Filtro de Categorias

```mermaid
flowchart TD
    ORDER[Pedido chega no KDS] --> FILTER{use_category_filter?}
    FILTER -->|Não| SHOW_ALL[Exibe todos os itens]
    FILTER -->|Sim| CHECK[Verifica categoria de cada item]

    CHECK --> MATCH{Item na lista<br/>de categorias?}
    MATCH -->|Sim| SHOW[Exibe normalmente]
    MATCH -->|Não| ACTION{category_filter_action}

    ACTION -->|no_warning| SHOW
    ACTION -->|warning| WARN[Exibe com alerta visual]
    ACTION -->|hide| HIDE[Item oculto]
    ACTION -->|block| BLOCK[Item visível mas bloqueado]
```

## Fluxo SAT / CF-e (Independente do Modo)

```mermaid
flowchart TD
    SEND[SendSale] --> SAT_CHECK{config.sat<br/>configurado?}
    SAT_CHECK -->|Não| SKIP[Envia sem fiscal SAT]
    SAT_CHECK -->|Sim| GEN[Fiscal.generateXML<br/>Gera XML CF-e-SAT v0.08]

    GEN --> EMIT[POST sat_ip?acao=emissao<br/>Envia ao equipamento SAT]
    EMIT --> READ[POST sat_ip?acao=acompanhamento<br/>Lê resposta]

    READ --> RESULT{Resultado}
    RESULT -->|Sucesso| PARSE[Parse XML resposta<br/>chaveConsulta, nCFe, QR code]
    RESULT -->|Erro 06010/1999| RETRY{Tentativas < 3?}
    RETRY -->|Sim| EMIT
    RETRY -->|Não| FAIL[Erro SAT]

    PARSE --> SALE[Inclui dados SAT na venda<br/>cfe, chave_nfe, qr_code]
```

## Fluxo de Inicialização do Smart POS

```mermaid
flowchart TD
    INIT[App detecta flavor<br/>NativeModules.ConfigModule] --> FLAVOR{Flavor?}

    FLAVOR -->|cielo| CIELO[Carrega Cielo Native Adapter<br/>+ Cielo Printer V3]
    FLAVOR -->|stone| STONE[Carrega Stone Native Adapter<br/>+ Stone Printer V3]
    FLAVOR -->|pagbank| PAGBANK[Carrega PagBank Native Adapter<br/>+ PagBank Printer V3]
    FLAVOR -->|msitef| MSITEF[Carrega MSiTef Adapter<br/>+ configure + adminMenu]
    FLAVOR -->|playstore| PLAY[Carrega adapters Playstore<br/>Sumup, Cielo API, Stone API, etc.]

    CIELO --> NATIVE_PAY[NativePaymentAdapter<br/>PaymentModule + EventEmitter]
    STONE --> NATIVE_PAY
    PAGBANK --> NATIVE_PAY
    MSITEF --> MSITEF_PAY[MSiTef Adapter<br/>initializeMSitef + transaction cache]

    NATIVE_PAY --> READY[Terminal pronto]
    MSITEF_PAY --> READY
    PLAY --> API_PAY[PaymentAdapter / BluetoothAdapter] --> READY
```
