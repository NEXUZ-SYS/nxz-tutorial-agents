# Briefing de Contexto: NXZ ERP

> Versao: v1.1 | Data: 2026-03-28 | Publico: Marketing + Vendas | Nivel: Operacional | Foco: Franquias

## Metadata

- **Produto:** NXZ ERP
- **Categoria:** ERP (Sistema de Gestao Integrada)
- **Base Tecnologica:** Odoo 12, customizado com 21 modulos exclusivos NXZ
- **Infraestrutura:** Oracle Cloud
- **Publico-Alvo do Briefing:** Marketing — linguagem de marca, beneficios, UX, copy
- **Nivel Organizacional:** Operacional — uso diario, passo a passo, funcionalidades, fluxos
- **Objetivo do Briefing:** Contexto para geracao de conteudo de marketing
- **Produtos Relacionados:**
  - NXZ Go (PDV/Totem/Smart POS) — frontend de vendas e autoatendimento
  - NXZ KDS — display de cozinha em tempo real
  - NXZ Delivery — centralizador de pedidos delivery (iFood, Rappi)
  - NXZ Pay Go — pagamento mobile

---

## 1. Identidade do Produto

### O que e

O NXZ ERP e o sistema de gestao completo da Nexuz, criado especificamente para estabelecimentos de alimentacao e bebidas. E o coracao do ecossistema NXZ — tudo passa por ele: vendas, estoque, compras, producao, financeiro e faturamento.

### Problema que resolve

Estabelecimentos de food service operam com sistemas desconectados: um software para o caixa, outro para estoque, planilhas para financeiro. Resultado: retrabalho, falta de controle, decisoes no escuro e operacao lenta. Fechar o caixa demora horas, inventario e manual, e ninguem sabe o custo real de um prato.

### Proposta de valor

Um unico sistema que conecta toda a operacao — do pedido no balcao ate o fechamento financeiro. O NXZ ERP elimina planilhas, integra caixa com estoque, atualiza custos de producao em tempo real e entrega relatorios prontos. Tudo isso customizado para food service, nao adaptado de um ERP generico.

**Exemplo:** Um restaurante que usava 3 sistemas separados (caixa, estoque, financeiro) migra para o NXZ ERP. Agora, quando um cafe latte e vendido no totem, o estoque de leite e cafe e atualizado automaticamente, o custo de producao e recalculado e o financeiro ja registra a receita — sem ninguem digitar nada.

---

## 2. Publico-Alvo do Produto

### Personas

| Persona | Perfil | Necessidade Principal |
|---------|--------|----------------------|
| **Proprietario/Franqueador** | Dono de 1+ unidades, foco em resultado | Visao consolidada de todas as unidades, controle financeiro, margem real |
| **Gerente de Operacao** | Responsavel pelo dia a dia da loja | Abertura/fechamento de caixa rapido, controle de estoque, relatorios diarios |
| **Operador de Caixa** | Atende no balcao ou supervisiona totens | Interface simples, registro rapido de vendas, multiplas formas de pagamento |
| **Equipe de Cozinha** | Cozinheiros e preparadores | Fichas tecnicas com quantidades exatas, ordens de producao claras |
| **Financeiro/Contabil** | Controla contas a pagar/receber, DRE | Conciliacao bancaria, emissao de NF, relatorios fiscais |

**Exemplo — Gerente de Operacao:**
Maria abre o restaurante as 10h. No NXZ ERP, ela abre a sessao do PDV com 2 cliques, confere o estoque critico no dashboard (alerta: leite abaixo do minimo) e gera o pedido de compra direto do sistema. No fim do dia, o fechamento de caixa e automatico — o sistema ja consolidou todas as vendas do PDV, totem e iFood.

---

## 3. Funcionalidades Principais

### 3.1 Ponto de Venda (PDV)

O PDV do NXZ ERP nao e um caixa registradora — e um sistema de vendas completo integrado ao estoque e financeiro.

- **Multiplas configuracoes:** PDV balcao, Totem autoatendimento, canal iFood — cada um com precos e regras proprias
- **Modo restaurante:** planta do salao com mesas, comandas por mesa, abertura/fechamento de conta
- **Formas de pagamento:** dinheiro, cartao (Stone, Cielo, PagSeguro, SumUp), Pix, vouchers e cupons
- **Vouchers e cupons:** criacao e gestao de promocoes, programas de fidelidade
- **Emissao fiscal automatica:** NFC-e emitida a cada venda, sem intervencao manual

**Exemplo:** A cafeteria No. Coffee opera 3 PDVs: um totem na filial Peruibe, um totem em Santos e um canal iFood em Santos com tabela de precos diferenciada. Tudo configurado no ERP, sem precisar de sistemas separados.

**Dados reais:** 5 PDVs configurados, 4.676 pedidos processados no sistema.

### 3.2 Estoque e Inventario

Controle de estoque em tempo real, com baixa automatica a cada venda.

- **Baixa automatica:** vendeu no PDV ou totem → estoque atualizado instantaneamente
- **Alertas de estoque minimo:** notificacao quando um insumo atinge nivel critico
- **Movimentacoes:** entrada (compras), saida (vendas, perdas), transferencias entre unidades
- **Categorias food service:** acai & bowls, smoothies, sucos, quentes, geladas, para comer, insumos, descartaveis
- **Rastreabilidade:** historico completo de cada movimentacao

**Exemplo:** Quando o totem vende um "Booster Smoothie", o sistema automaticamente da baixa nos insumos (banana, whey, leite de amendoas) com base na ficha tecnica. Se banana ficar abaixo do minimo, o gerente recebe alerta no dashboard.

**Dados reais:** 205 produtos cadastrados, 16 categorias, 4.678 movimentacoes de estoque.

### 3.3 Producao e Fichas Tecnicas (MRP)

O modulo de producao transforma receitas em fichas tecnicas com custo automatico.

- **Fichas tecnicas (BOM):** receita completa com ingredientes, quantidades e unidades de medida
- **Ordens de producao:** quando produzir, quanto produzir, com quais insumos
- **Custo automatico:** o custo do prato e calculado com base no preco real dos insumos
- **Atualizacao de preco no PDV:** quando o custo de producao muda, o sistema pode atualizar o preco de venda
- **Substituicao de insumos:** trocar ingredientes na ficha tecnica sem perder historico

**Exemplo:** A ficha tecnica do "Acai Bowl Grande" lista: 300g acai, 50g granola, 30g banana, 15g mel. O custo e calculado automaticamente: R$ 8,42. Se o preco do acai sobe 20%, o sistema recalcula para R$ 9,65 e alerta o gerente que a margem caiu.

**Dados reais:** 4.824 ordens de producao registradas no sistema.

### 3.4 Faturamento e Financeiro

Todas as vendas — PDV, totem, iFood — consolidam automaticamente no financeiro.

- **Contas a pagar e receber:** cadastro, vencimentos, baixas automaticas
- **Conciliacao bancaria:** importacao de extratos (OFX, TXT, CSV, PayPal) e conciliacao automatica
- **Emissao de Nota Fiscal:** NFe, NFC-e com compliance fiscal brasileira completa
- **Plano de contas:** plano de contas padrao NXZ otimizado para food service
- **Relatorios contabeis e fiscais:** DRE, balancete, livro caixa, obrigacoes SPED

**Exemplo:** No fim do mes, o financeiro do restaurante abre o modulo de Faturamento e encontra todas as 1.200 vendas do mes ja consolidadas — PDV, totem e iFood separados por canal. Importa o extrato bancario e o sistema concilia 95% das transacoes automaticamente.

### 3.5 Compras

Gestao completa do ciclo de compras, do pedido ao recebimento.

- **Pedidos de compra:** criacao manual ou automatica (baseada em estoque minimo)
- **Controle de recebimento:** conferencia de mercadoria vs pedido
- **Integracao com estoque:** entrada automatica ao confirmar recebimento
- **Relatorios de compras:** historico, gastos por fornecedor, por categoria

### 3.6 Dashboards e Relatorios

Visao consolidada da operacao em paineis visuais.

- **Dashboard Produtos:** visao geral do catalogo, estoque, categorias
- **Dashboard Contador:** resumo contabil para o escritorio de contabilidade
- **Dashboard Franqueadora:** visao multi-unidade para o franqueador
- **Relatorios de PDV:** vendas por periodo, por produto, por canal, por forma de pagamento
- **Relatorios de Producao:** ordens executadas, custos, consumo de insumos

**Exemplo — Franqueador:** O dono da rede No. Coffee abre o "Dashboard Franqueadora" e ve as 3 unidades lado a lado: Matriz, Peruibe e Santos. Compara vendas, ticket medio e estoque critico de cada uma, tudo em tempo real.

### 3.7 Multi-Empresa e Franquias

Sistema preparado para redes e franquias desde o primeiro dia.

- **Template replicavel:** configura uma vez, replica para novas unidades
- **Empresa-grupo:** holding que consolida resultados de todas as filiais
- **Isolamento por unidade:** cada filial ve apenas seus dados, o grupo ve tudo
- **Configuracoes compartilhadas:** cardapio, fichas tecnicas e precos podem ser centralizados

**Exemplo:** A No. Coffee opera com 5 empresas no sistema: 1 template base, 1 grupo holding, 1 matriz e 2 filiais (Peruibe e Santos). Cada filial tem seu proprio caixa e estoque, mas o cardapio e precos sao geridos centralmente.

### 3.8 Comunicacao e Tempo Real

O ERP nao e estatico — ele se comunica em tempo real com todos os dispositivos.

- **WebSocket (Odoo Bus):** atualizacoes instantaneas entre ERP, PDV, Totem e KDS
- **Mensagens internas:** comunicacao entre equipes dentro do sistema
- **Notificacoes:** alertas de estoque, pedidos, vencimentos

**Exemplo:** O gerente cadastra um novo produto ("Smoothie de Manga") no ERP. Em segundos, o produto aparece no cardapio do totem e no PDV do caixa — sem precisar reiniciar nada.

### 3.9 Compliance Fiscal Brasileira

Totalmente adaptado a legislacao fiscal do Brasil.

- **Localizacao brasileira completa:** CPF/CNPJ, enderecos com CEP, municipios, estados
- **NFe e NFC-e:** emissao de nota fiscal eletronica integrada
- **NFe contingencia:** emissao offline quando a SEFAZ esta indisponivel
- **Importacao de documentos fiscais:** leitura de XML de NFe de fornecedores
- **SPED e obrigacoes acessorias:** relatorios formatados para entrega ao fisco
- **Integracao com adquirentes:** Stone, Cielo, PagSeguro, SumUp

---

## 4. Cross-References

### Mapa de Integracao do Ecossistema NXZ

```
                    ┌─────────────┐
                    │   NXZ ERP   │
                    │  (Coracao)  │
                    └──────┬──────┘
            ┌──────────────┼──────────────┐
            │              │              │
     ┌──────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
     │   NXZ Go    │ │ NXZ KDS  │ │NXZ Delivery │
     │ PDV | Totem │ │ Cozinha  │ │iFood | Rappi│
     │ Smart POS   │ │          │ │             │
     └─────────────┘ └──────────┘ └─────────────┘
```

### Fluxos entre Produtos

| Fluxo | Caminho | O que acontece |
|-------|---------|----------------|
| Venda no totem | NXZ Go (Totem) → NXZ ERP → NXZ KDS | Cliente faz pedido no totem, ERP registra venda e baixa estoque, KDS exibe pedido na cozinha |
| Pedido iFood | iFood → NXZ KDS → NXZ ERP | Pedido chega no KDS, cozinha prepara, ERP registra venda e emite NF |
| Novo produto | NXZ ERP → NXZ Go + KDS | Gerente cadastra produto no ERP, aparece instantaneamente no totem e no KDS |
| Fechamento de caixa | NXZ Go → NXZ ERP | Todas as vendas do PDV/Totem consolidam no financeiro do ERP |
| Alerta de estoque | NXZ ERP → Gerente | Venda baixa estoque abaixo do minimo, gerente recebe alerta e gera pedido de compra |

[Ver: NXZ Go > Funcionalidades PDV para detalhes do fluxo de pedido no caixa]
[Ver: NXZ KDS > Funcionalidades para detalhes dos stages de producao na cozinha]
[Ver: NXZ Go > Arquitetura para detalhes tecnicos da integracao ERP-Go via WebSocket]

---

## 5. Terminologia e Glossario

### Termos do Produto

| Termo | Significado |
|-------|-------------|
| **PDV** | Ponto de Venda — o caixa onde as vendas sao registradas |
| **POS** | Point of Sale — mesmo que PDV, usado no contexto tecnico do Odoo |
| **Sessao POS** | Periodo de operacao do caixa (abertura ate fechamento) |
| **BOM / Ficha Tecnica** | Bill of Materials — receita com ingredientes e quantidades para producao |
| **MRP** | Manufacturing Resource Planning — modulo de producao e fichas tecnicas |
| **NFe** | Nota Fiscal Eletronica — documento fiscal para vendas entre empresas |
| **NFC-e** | Nota Fiscal de Consumidor Eletronica — cupom fiscal digital |
| **SPED** | Sistema Publico de Escrituracao Digital — obrigacoes fiscais eletronicas |
| **OFX** | Open Financial Exchange — formato de extrato bancario para conciliacao |
| **Whitelabel** | Personalizacao visual (cores, logo) do sistema com a marca do cliente |
| **Multi-empresa** | Estrutura que permite gerenciar varias unidades/filiais em um unico sistema |
| **Template** | Configuracao-base que pode ser replicada para novas unidades |
| **Pricelist** | Tabela de precos — permite precos diferentes por canal (balcao vs iFood) |
| **Voucher** | Cupom de desconto ou credito para uso no PDV |

### Termos do Setor Food Service

| Termo | Significado |
|-------|-------------|
| **Ticket medio** | Valor medio gasto por cliente em cada compra |
| **CMV** | Custo de Mercadoria Vendida — custo real dos ingredientes de cada prato |
| **Food cost** | Percentual do custo do ingrediente em relacao ao preco de venda |
| **KDS** | Kitchen Display System — tela digital na cozinha que substitui comandas de papel |
| **Comanda** | Pedido registrado para uma mesa ou cliente |
| **Praça** | Estacao de preparo na cozinha (ex: praca quente, praca fria) |
| **Abertura de caixa** | Inicio da operacao diaria do PDV, com conferencia do fundo de caixa |
| **Fechamento de caixa** | Encerramento diario com conferencia de valores e conciliacao |
| **Open Delivery** | Protocolo aberto de integracao com plataformas de delivery |

---

## 6. Contexto de Mercado

### Setor Food Service no Brasil

O setor de alimentacao fora do lar e um dos maiores do Brasil, com milhoes de estabelecimentos — de food trucks a redes de franquias. A digitalizacao e acelerada mas desigual: grandes redes usam sistemas robustos, enquanto pequenos e medios estabelecimentos ainda operam com planilhas e sistemas desconectados.

### Posicionamento do NXZ ERP

O NXZ ERP se posiciona no espaco entre ERPs genericos (TOTVS, SAP) — caros e complexos demais para food service — e sistemas de PDV simples (que nao cobrem estoque, producao e financeiro). E um ERP completo, mas desenhado exclusivamente para alimentacao e bebidas.

### Diferenciais-chave para conteudo de marketing

1. **All-in-one para food service** — nao e um ERP generico adaptado, e um sistema nascido para alimentacao
2. **Ecossistema integrado** — PDV, totem, cozinha, delivery e financeiro conectados nativamente
3. **Especializado em operacoes to go** — autoatendimento, delivery e takeaway como cidadaos de primeira classe
4. **Multi-empresa nativo** — escala de 1 loja a rede de franquias sem trocar de sistema
5. **Compliance fiscal completa** — NFe, NFC-e, SPED, tudo integrado sem modulos extras
6. **Custo de producao automatico** — ficha tecnica com custo real, atualizado em tempo real
7. **Comunicacao em tempo real** — cadastrou um produto no ERP, aparece no totem em segundos

### Tom de Voz da Marca

- **Slogan:** "Simples assim"
- **Tom:** Profissional e acessivel, sem jargao tecnico
- **Foco:** Beneficios praticos, nao features tecnicas
- **Valores:** Empatia, Colaboracao, Evolucao, Transparencia, Respeito

---

## 7. Franquias — Conteudo Estrategico

### Por que o NXZ ERP e ideal para franquias

O NXZ ERP foi construido com multi-empresa no DNA — nao e um recurso adicionado depois, e a arquitetura base do sistema. Isso significa que escalar de 1 para 50 unidades nao exige trocar de software, migrar dados ou reconfigurar tudo do zero.

### Estrutura Multi-Empresa na Pratica

```
┌──────────────────────────────────────┐
│         [Grupo] Holding              │
│   Visao consolidada de tudo          │
├──────────┬───────────┬───────────────┤
│ Matriz   │ Filial 1  │ Filial 2     │
│ Proprio  │ Franquia  │ Franquia     │
│ estoque  │ proprio   │ proprio      │
│ proprio  │ estoque   │ estoque      │
│ caixa    │ caixa     │ caixa        │
└──────────┴───────────┴───────────────┘
     Cardapio, precos e fichas tecnicas
          centralizados no template
```

### Funcionalidades para Franqueadores

| Funcionalidade | Beneficio para a rede |
|---------------|----------------------|
| **Template replicavel** | Abra uma nova unidade em horas, nao semanas — toda a configuracao e clonada |
| **Cardapio centralizado** | Mude um preco ou adicione um produto e todas as unidades atualizam em tempo real |
| **Dashboard Franqueadora** | Compare vendas, ticket medio e estoque de todas as unidades lado a lado |
| **Isolamento de dados** | Cada franqueado ve apenas sua unidade; o franqueador ve tudo |
| **Fichas tecnicas padronizadas** | Garanta que o "Acai Bowl" tenha exatamente os mesmos ingredientes em todas as lojas |
| **Tabelas de preco por regiao** | Santos pode ter precos diferentes de Peruibe — configuracao por unidade |
| **Contratos e recorrencias** | Gestao de royalties, taxas de franquia e cobrancas recorrentes |

### Caso de Uso — Rede de Franquias

> **No. Coffee** e uma rede de cafeterias com matriz em SP e filiais em Peruibe e Santos.
>
> **Antes do NXZ ERP:** Cada loja usava um sistema diferente. O dono recebia relatorios em planilhas, uma semana atrasados. Nao sabia se o cardapio estava igual em todas as unidades. Precificacao era manual.
>
> **Depois do NXZ ERP:**
> - 1 template base replica a configuracao de cada nova loja
> - Cardapio e fichas tecnicas sao geridos centralmente — muda uma vez, atualiza todas
> - Dashboard Franqueadora mostra as 3 unidades em tempo real
> - Cada filial tem seu proprio PDV/totem e estoque, mas os dados fluem para o grupo
> - Canal iFood de Santos opera com pricelist propria, sem conflitar com precos do balcao
>
> **Resultado:** Expansao de 1 para 3 lojas sem trocar de sistema. Padronizacao garantida.

---

## 8. Copy Pronto para Marketing

### Headlines (H1)

- "Gestao completa para food service. Simples assim."
- "Do pedido ao financeiro, tudo conectado em um unico sistema."
- "O ERP que nasceu para alimentacao — nao foi adaptado, foi criado."
- "De 1 loja a 50 franquias, sem trocar de sistema."
- "Pare de usar 3 sistemas. Use 1 que faz tudo."

### Sub-headlines (H2)

- "PDV, estoque, producao, financeiro e delivery integrados nativamente."
- "Seu totem vendeu um smoothie? O estoque ja sabe."
- "Ficha tecnica com custo real. Atualizado automaticamente."
- "Abra uma nova franquia em horas, nao semanas."
- "iFood, Rappi e balcao — todos os canais, um so financeiro."

### Descricoes Curtas (para cards, ads, bios)

**25 palavras:**
NXZ ERP: gestao completa para restaurantes, cafeterias e franquias. PDV, estoque, producao e financeiro integrados. Especializado em food service.

**50 palavras:**
O NXZ ERP e o sistema de gestao criado exclusivamente para food service. Integra ponto de venda, estoque, producao, financeiro e delivery em uma unica plataforma. Com suporte nativo a multi-empresa, escala de uma loja a redes de franquias sem trocar de sistema. Compliance fiscal brasileira completa.

**100 palavras:**
Chega de planilhas e sistemas desconectados. O NXZ ERP conecta toda a operacao do seu restaurante em um unico sistema: ponto de venda, autoatendimento por totem, controle de estoque com baixa automatica, fichas tecnicas com custo real, financeiro com conciliacao bancaria e emissao fiscal integrada. Tudo em tempo real — vendeu no totem, o estoque atualiza, o custo recalcula, o financeiro registra. Com estrutura multi-empresa nativa, o NXZ ERP escala com voce: de uma loja a uma rede de franquias, sem migracoes e sem dor de cabeca. Especializado em food service desde 2009.

### CTAs (Call to Action)

- "Agende uma demonstracao gratuita"
- "Veja o NXZ ERP funcionando na pratica"
- "Fale com um consultor especializado em food service"
- "Descubra como simplificar sua operacao"
- "Calcule quanto voce pode economizar"

### Argumentos para Objecoes

| Objecao | Resposta |
|---------|---------|
| "Ja uso um sistema de caixa" | O NXZ ERP nao e so caixa — e caixa + estoque + producao + financeiro integrados. Voce elimina as planilhas e os outros 2 sistemas. |
| "ERP e caro e complexo" | O NXZ ERP e SaaS (paga mensal), sem infraestrutura propria. E complexo por dentro, simples por fora — a interface e feita para quem trabalha em cozinha, nao em TI. |
| "Migracao da medo" | Template replicavel: sua configuracao e importada e clonada. Treinamento incluido. Dados migrados com suporte da equipe Nexuz. |
| "Nao preciso de ERP, sou so 1 loja" | Hoje e 1 loja. Amanha podem ser 3. Com o NXZ ERP, voce nao vai precisar trocar de sistema quando crescer. Invista em crescer, nao em migrar. |
| "Ja uso iFood/Rappi direto" | O NXZ ERP centraliza os pedidos de iFood, Rappi e balcao em um unico financeiro. Sem conferir extrato por extrato no fim do mes. |

---

## 9. Casos de Uso por Segmento

### Cafeteria / Juiceria

**Perfil:** 30-100 pedidos/dia, cardapio rotativo, foco em to go
**Funcionalidades-chave:** Totem de autoatendimento, fichas tecnicas de smoothies/sucos, categorias visuais (quente, gelada, bowls), low ticket com alto volume
**Exemplo:** Cafeteria com totem na entrada. Cliente monta seu smoothie, paga no totem, pedido aparece no KDS da cozinha. Estoque de frutas e insumos atualiza automaticamente.

### Restaurante de Medio Porte

**Perfil:** 100-300 pedidos/dia, salao com mesas, cozinha com pracas
**Funcionalidades-chave:** Modo restaurante (mesas/comandas), KDS por praca (quente, fria, bar), controle de CMV, fechamento de caixa multi-turno
**Exemplo:** Restaurante com 20 mesas e 3 pracas na cozinha. Garcom registra pedido no PDV, cada item vai para a praca correta no KDS. No fim do turno, fechamento automatico com vendas por garcom.

### Food Truck

**Perfil:** 50-150 pedidos/dia, operacao compacta, mobilidade
**Funcionalidades-chave:** Smart POS (maquininha inteligente como PDV), estoque minimo com alertas, cardapio enxuto, emissao fiscal mobile
**Exemplo:** Food truck com Smart POS na Stone. Vendas registradas na maquininha, estoque atualizado em tempo real, NFC-e emitida automaticamente. No fim do dia, o financeiro esta pronto.

### Rede de Franquias

**Perfil:** 3-50 unidades, padronizacao critica, franqueador quer visao consolidada
**Funcionalidades-chave:** Multi-empresa, template replicavel, dashboard franqueadora, cardapio centralizado, tabelas de preco por unidade/canal
**Exemplo:** Rede com 5 unidades. Franqueador gerencia cardapio e fichas tecnicas centralmente. Cada unidade opera de forma autonoma mas com dados consolidados no dashboard do grupo. Nova unidade aberta com template em 1 dia.

### Bar / Cervejaria

**Perfil:** Operacao noturna, alto volume de bebidas, comandas por mesa
**Funcionalidades-chave:** Modo restaurante com mesas, comandas abertas, controle de chope (litros/copos), vouchers e promocoes, fechamento de caixa noturno
**Exemplo:** Cervejaria com 30 mesas. Comanda aberta por mesa, controle de rodadas, chope vendido por litro com baixa automatica no barril. Happy hour com precos diferenciados via pricelist temporaria.

### Padaria / Confeitaria

**Perfil:** Producao propria, alto giro de estoque, mix de balcao + delivery
**Funcionalidades-chave:** MRP (producao com fichas tecnicas), custo de producao automatico, multi-canal (balcao + iFood), estoque de insumos vs produtos prontos
**Exemplo:** Padaria com producao de 50 tipos de pao. Ficha tecnica de cada pao com custo calculado (farinha, fermento, manteiga). Pedido de insumos automatico quando estoque atinge minimo. Vendas no balcao e iFood consolidadas.
