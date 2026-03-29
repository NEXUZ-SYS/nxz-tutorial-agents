# Mapa de Relacoes entre Produtos Nexuz

## Relacoes Diretas

### NXZ ERP <--> NXZ Go
- **Tipo:** Backend-Frontend
- **Integracao:** NXZ Go consome APIs do Odoo 12 (ERP) para catalogo, precos, estoque
- **Modulo ERP:** Ponto de Venda (pos.config, pos.order)
- **Fluxo:** Pedidos feitos no Go sao registrados como pos.order no ERP
- **Dados compartilhados:** Produtos, precos, tabelas de preco, clientes, estoque

### NXZ ERP <--> NXZ KDS
- **Tipo:** Backend-Display
- **Integracao:** KDS recebe pedidos do ERP (pos.order) em tempo real
- **Fluxo:** Pedido criado no PDV/Go → aparece no KDS → cozinha prepara → marca como pronto
- **Dados compartilhados:** Pedidos, itens, status de preparo, categorias de producao

### NXZ ERP <--> NXZ Delivery
- **Tipo:** Backend-Agregador
- **Integracao:** Delivery sincroniza pedidos de plataformas externas com o ERP
- **Fluxo:** Pedido iFood/Rappi → Delivery → ERP (pos.order) → KDS
- **Dados compartilhados:** Pedidos, produtos, estoque, status

### NXZ ERP <--> NXZ Pay Go
- **Tipo:** Backend-Pagamento
- **Integracao:** Pay Go processa pagamentos que sao registrados no ERP
- **Fluxo:** Pagamento via Pay Go → registro no ERP como payment → conciliacao financeira
- **Dados compartilhados:** Transacoes, valores, metodos de pagamento

### NXZ Go <--> NXZ KDS
- **Tipo:** Frontend-Display
- **Integracao:** Pedidos do Go aparecem automaticamente no KDS
- **Fluxo:** Cliente faz pedido no totem/app → KDS exibe para cozinha
- **Dados compartilhados:** Pedidos, itens, personalizacoes

### NXZ Delivery <--> NXZ KDS
- **Tipo:** Agregador-Display
- **Integracao:** Pedidos de delivery aparecem no KDS com identificacao de origem
- **Fluxo:** Pedido iFood → Delivery → KDS (com badge "iFood")
- **Dados compartilhados:** Pedidos, itens, origem do pedido

## Fluxo End-to-End Tipico

```
Cliente → NXZ Go (pedido) → NXZ ERP (registro) → NXZ KDS (producao)
                                    ↑
            NXZ Delivery ← iFood/Rappi (pedido externo)
                                    ↓
                              NXZ Pay Go (pagamento) → NXZ ERP (financeiro)
```
