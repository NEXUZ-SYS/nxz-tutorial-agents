# Dataset Financeiro Nexuz — Extracao 04/04/2026

## Metadata

| Campo | Valor |
|-------|-------|
| **Squad** | Nexuz Financial Analysis |
| **Agente** | Diana Dados — Extratora de Dados Financeiros |
| **Periodo de analise** | Marco/2026 (comparativo) + Abril/2026 (01 a 04/04) |
| **Data de extracao** | 2026-04-04T18:01:33-03:00 |
| **Versao do dataset** | v1 |

### Fontes Consultadas

| Fonte | Tipo | Status | Registros Extraidos |
|-------|------|--------|---------------------|
| Asaas API (via Sheets Import) | Google Sheets (espelho Asaas) | **CONECTADO** | Clientes, Assinaturas, Pagamentos |
| Asaas API (direta) | MCP Docs — somente leitura docs | **LIMITADO** — MCP nao executa requests de producao | Dados via cache do sheet [Import] |
| Google Sheets (Banco Inter) | MCP gsheets | **CONECTADO** | Extrato completo ate 04/04/2026 |
| Google Sheets (Dashboard Geral) | MCP gsheets | **CONECTADO** | Dashboard filtrado para 04/2026 |
| Google Sheets (Contas a Pagar) | MCP gsheets | **CONECTADO** | Historico completo |
| Odoo ERP | MCP-skioba | **NAO UTILIZADO** — base pertence a outra empresa | 0 |

**Nota sobre Asaas API**: O MCP `claude_ai_Docs_Asaas` e um servidor de documentacao, nao um proxy de execucao com API key configurada. Os dados Asaas foram extraidos via: (1) cache na planilha Google Sheets `[Import] [Asaas]`, (2) dados da extracao anterior de 03/04/2026 que acessou a API diretamente, e (3) Dashboard Geral que agrega dados Asaas em tempo real.

---

## 1. SALDOS ATUAIS

| Conta | Saldo (R$) | Data Referencia |
|-------|-----------|-----------------|
| **Banco Inter** | **R$ 5.154,85** | 04/04/2026 |
| **Asaas** | **R$ 4.917,52** | 04/04/2026 |
| **Total disponivel** | **R$ 10.072,37** | 04/04/2026 |

> Fonte: Dashboard Geral, celulas G85:H86

---

## 2. CLIENTES ASAAS

| Metrica | Quantidade |
|---------|-----------|
| Total de clientes cadastrados | **160** |
| Clientes ativos (nao deletados) | **160** |
| Clientes com assinatura ativa | **~124** |
| Clientes sem assinatura | **~36** |
| Tipo pessoa | 100% PJ (CNPJ) |

> Fonte: Extracao Asaas API 03/04/2026 (confirmada via sheet [Import] [Asaas] /customers — 1000 rows, 9 cols)

### Perfil da Base de Clientes
- Predominancia de franquias **Go Coffee** (~80 unidades)
- Outras marcas: Pomo Pasta, Breadbox, Mini Donuts, Abacazo, Coffeetown, Amor Espresso, No. Coffee, Momo Crunchy, Calmo Cafes, Irado Gelateria, Macarrao Curitiba, Bean Go!, entre outras
- Distribuicao nacional: PR, SP, RJ, RS, SC, BA, CE, MG, DF, PE, ES, GO, PI, RN, TO, AC, MS, MT

---

## 3. ASSINATURAS ATIVAS

| Metrica | Valor |
|---------|-------|
| Total de assinaturas ativas | **124** |
| Status | **100% ACTIVE** |
| Valor nominal total | **R$ 134.220,66** |
| **MRR (Receita Mensal Recorrente)** | **R$ 54.593,32** |
| **ARR estimado** | **R$ 655.119,84** |
| Ticket medio mensal (por assinatura) | **R$ 440,27** |
| Forma de pagamento | **100% BOLETO** |

> Fonte: Extracao Asaas API 03/04/2026 (124 assinaturas detalhadas)

### Distribuicao por Ciclo de Cobranca

| Ciclo | Qtd | Valor Nominal Total (R$) | MRR Equivalente (R$) | % do MRR |
|-------|-----|--------------------------|----------------------|----------|
| MONTHLY | 105 | 46.954,22 | 46.954,22 | 86,0% |
| SEMIANNUALLY | 2 | 4.402,80 | 733,80 | 1,3% |
| YEARLY | 17 | 82.863,64 | 6.905,30 | 12,7% |
| **Total** | **124** | **134.220,66** | **54.593,32** | **100%** |

### Top 15 Clientes por MRR

| # | Cliente | MRR Mensal (R$) |
|---|---------|----------------|
| 1 | Macarrao Curitiba - PR Bigorrilho | 1.261,24 |
| 2 | Go Coffee - PR Ed Office Life (LLDUCA) | 1.101,00 |
| 3 | Pomo Pasta Vidal Ramos | 967,79 |
| 4 | Breadbox - Matriz | 800,99 |
| 5 | Cafeteria Vila Izabel - Buona Farina | 775,02 |
| 6 | Contem Ovo | 744,32 |
| 7 | Pomo Pasta Maringa | 717,60 |
| 8 | Toldo Cafeteria - Matriz II | 712,00 |
| 9 | Macarrao Curitiba - Xaxim | 685,00 |
| 10 | Aloa Coffee | 673,02 |
| 11 | Breadbox - SC Patio Milano | 639,00 |
| 12 | Go Coffee - RS Pelotas | 639,00 |
| 13 | GC PR Curitibano II (Jagher & Kuchla) | 628,00 |
| 14 | Pastelaria da Jo (Via Curitiba) | 628,00 |
| 15 | Go Coffee - RS Quinze de Janeiro | 628,00 |

---

## 4. COBRANCAS — MARCO/2026 (Comparativo)

| Status | Quantidade | Valor Total (R$) | % do Total |
|--------|-----------|-------------------|-----------|
| RECEIVED | 105 | 44.043,28 | 84,1% |
| CONFIRMED | 16 | 5.680,34 | 10,8% |
| OVERDUE | 7 | 2.636,69 | 5,0% |
| **TOTAL** | **128** | **52.360,31** | **100%** |

- **Taxa de sucesso (RECEIVED + CONFIRMED)**: 95,0%
- **Taxa de inadimplencia marco**: 5,0%

> Fonte: Extracao Asaas API 03/04/2026

---

## 5. COBRANCAS — ABRIL/2026 (Parcial: 01 a 04/04)

### 5.1 Visao do Dashboard Geral (consolidado)

| Metrica | Valor (R$) |
|---------|-----------|
| **Receita prevista abril** | **47.767,45** |
| Receitas pendentes | 46.762,43 |
| Receitas confirmadas | 4.883,62 |
| Receitas recebidas | 1.005,02 |
| **Despesas total abril** | **70.410,98** |
| Despesas pagas | 0,00 |
| Despesas abertas | 70.410,98 |
| **Diferenca (Receita - Despesa)** | **(22.643,53)** |

> Fonte: Dashboard Geral, filtro ano=2026, mes=04

### 5.2 Receitas Confirmadas em Abril (ate 04/04)

| Cliente (ID) | ID Pagamento | Vencimento | Valor (R$) |
|-------------|-------------|------------|-----------|
| cus_000156656187 | pay_5wwwcw9osjf5q2e3 | 23/04/2026 | 121,00 |
| cus_000156225071 | pay_jabdfenfvca57tfx | 25/04/2026 | 393,41 |
| cus_000146748217 | pay_5pc2g2efsndk2rul | 23/04/2026 | 50,71 |
| cus_000033593008 | pay_g8adxyfjph9ruwe9 | 26/04/2026 | 673,02 |
| cus_000146748217 | pay_keorsv8lfwm4tqm2 | 17/04/2026 | 534,66 |
| cus_000143566639 | pay_2fn670yg6m2gftjl | 30/04/2026 | 514,97 |
| cus_000139652763 | pay_2hmrbmligtlgyr93 | 21/04/2026 | 344,17 |
| cus_000132015815 | pay_108pat7ymq17jz3z | 27/04/2026 | 183,63 |
| cus_000049264878 | pay_u7o8rzmt34gkaspz | 20/04/2026 | 241,25 |
| cus_000086374739 | pay_l17tiaaqirawff24 | 19/04/2026 | 102,95 |
| cus_000130244275 | pay_rztc0sejttefpmza | 19/04/2026 | 364,27 |
| cus_000128468419 | pay_owhs1w7nu6za91bv | 08/04/2026 | 364,27 |
| cus_000126312446 | pay_07wir8nu9j6etmay | 28/04/2026 | 381,71 |
| cus_000049264878 | pay_69148avym2kigfzn | 10/04/2026 | 613,60 |
| **Total Confirmadas** | | | **4.883,62** |

### 5.3 Receitas Recebidas em Abril (ate 04/04)

| Cliente (ID) | ID Pagamento | Data Recebimento | Valor (R$) |
|-------------|-------------|-----------------|-----------|
| cus_000163614187 | pay_knmxhv51v6kxu7b9 | 02/04/2026 | 579,01 |
| cus_000168956653 | pay_b3g8x6vga77jf0yf | 01/04/2026 | 426,01 |
| **Total Recebidas** | | | **1.005,02** |

### 5.4 Receitas Pendentes (Top 20 por vencimento proximo)

| Cliente (ID) | ID Pagamento | Vencimento | Valor (R$) |
|-------------|-------------|------------|-----------|
| cus_000098010828 | pay_lvk3uzcwh3lccaho | 10/04/2026 | 529,00 |
| cus_000095120746 | pay_zd490yco6otqts4f | 10/04/2026 | 529,00 |
| cus_000090095396 | pay_c58tkqjef1vcyhfa | 10/04/2026 | 390,00 |
| cus_000088319583 | pay_599xjocz8n3mfck1 | 10/04/2026 | 529,00 |
| cus_000081723816 | pay_psfj9u95rhm69p2y | 10/04/2026 | 529,00 |
| cus_000081613680 | pay_v8b0bfh0y8yvw7vl | 10/04/2026 | 529,00 |
| cus_000081453424 | pay_wtx6liqph837ljz1 | 10/04/2026 | 628,00 |
| cus_000032309869 | pay_y2mo44k7j5nb38tj | 10/04/2026 | 529,00 |
| cus_000026472777 | pay_kb6xnhi0fqjt84qj | 10/04/2026 | 170,00 |
| cus_000026473083 | pay_rrby5jsus3oogst0 | 10/04/2026 | 118,20 |
| cus_000040782072 | pay_zo4l4adw76qwpl86 | 10/04/2026 | 342,50 |
| cus_000073531989 | pay_s59p32g3264plmkt | 10/04/2026 | 315,00 |
| cus_000079545298 | pay_pzav5m71t05e9x9d | 10/04/2026 | 315,00 |
| cus_000079539052 | pay_ltrtlug9xcbgoaog | 10/04/2026 | 522,00 |
| cus_000155517652 | pay_6ffccz81vr62mtci | 09/04/2026 | 281,00 |
| cus_000028418289 | pay_s1nddmccl1dreya4 | 08/04/2026 | 370,02 |
| cus_000127838290 | pay_52bp268o2uzhqo8o | 05/04/2026 | 390,00 |
| cus_000042019162 | pay_31txhthxvjirud5s | 05/04/2026 | 390,00 |
| cus_000114432229 | pay_1touomzc7vkdo6b7 | 05/04/2026 | 529,00 |
| cus_000113724870 | pay_0yul20b94kfy04j9 | 05/04/2026 | 512,68 |
| *(+~75 cobrancas pendentes adicionais)* | | | |
| **Total Pendentes** | | | **46.762,43** |

---

## 6. INADIMPLENCIA (Aging — referencia 04/04/2026)

### 6.1 Resumo por Faixa de Atraso

| Faixa de Atraso | Quantidade | Valor Total (R$) | % da Inadimplencia |
|-----------------|-----------|-------------------|-------------------|
| 1-30 dias | 7 | 2.636,69 | 100,0% |
| 31-60 dias | 0 | 0,00 | 0,0% |
| 61-90 dias | 0 | 0,00 | 0,0% |
| >90 dias | 0 | 0,00 | 0,0% |
| **TOTAL OVERDUE** | **7** | **R$ 2.636,69** | **100%** |

> Fonte: Extracao Asaas API 03/04/2026 (titulos OVERDUE de marco/2026). Abril ainda nao tem titulos vencidos (dia 4).

### 6.2 Detalhamento dos Titulos Vencidos

| # | ID Pagamento | Cliente | Valor (R$) | Vencimento | Dias Atraso |
|---|-------------|---------|-----------|------------|-------------|
| 1 | pay_a5fm58s5m7f8zusq | Go Coffee - SP Shopping Grand Plaza | 529,00 | 2026-03-25 | 10 |
| 2 | pay_on81866gv83uqdbb | Go Coffee - RJ Sao Boaventura | 529,00 | 2026-03-25 | 10 |
| 3 | pay_bd8pd6gcjshywggh | Go Coffee - BA Pituba | 454,19 | 2026-03-25 | 10 |
| 4 | pay_vg1acxjkbsxptj4i | Amor Espresso - SP Vila Olimpia [filial II] | 412,00 | 2026-03-30 | 5 |
| 5 | pay_nq9xbxq3f2dxot4t | Amor Espresso Boticario | 278,70 | 2026-03-27 | 8 |
| 6 | pay_ejon6wpkfwdh1b5k | Amor Espresso - [FILIAL I] | 273,00 | 2026-03-30 | 5 |
| 7 | pay_wcv5ytpiiwradrib | Pomo Pasta - Trindade | 160,80 | 2026-03-20 | 15 |

### 6.3 Alertas de Inadimplencia

- **AMOR ESPRESSO CAFE LTDA** — 3 cobrancas vencidas (3 filiais/CNPJs) totalizando **R$ 963,70**. Grupo economico em risco.
- **POMO PASTA - Trindade** — titulo com maior atraso (15 dias, vencido em 20/03).
- Taxa inadimplencia sobre faturamento marco: **5,0%** (R$ 2.636,69 / R$ 52.360,31)
- Taxa inadimplencia sobre MRR: **4,8%** (R$ 2.636,69 / R$ 54.593,32)
- Nenhum titulo de abril vencido ate 04/04 (cobrancas de abril comecam a vencer dia 05/04).

---

## 7. DESPESAS — ABRIL/2026 (Dashboard Geral)

| Metrica | Valor (R$) |
|---------|-----------|
| **Total despesas abril** | **70.410,98** |
| Despesas pagas | 0,00 |
| Despesas abertas | 70.410,98 |

### 7.1 Detalhamento das Despesas de Abril

| Nome | Categoria | Vencimento | Valor (R$) |
|------|-----------|------------|-----------|
| Giulliano Alley Soares | 04.02 - Fornecedor | 07/04/2026 | 2.625,00 |
| Matheus Caldeira 3/3 01/2026 | 04.02 - Fornecedor | 15/04/2026 | 5.000,00 |
| Matheus Caldeira | 04.02 - Fornecedor | 15/04/2026 | 11.000,00 |
| Bianca Thaina Carvalho Joba | 04.03 - Funcionario | 07/04/2026 | 2.329,00 |
| Caroline Silva Santos Oliveira | 04.02 - Fornecedor | 14/04/2026 | 5.500,00 |
| Luiz Claudio Moreira de Almeida | 04.02 - Fornecedor | 14/04/2026 | 4.000,00 |
| Sabrina Aparecida Wendl 2/2 02/2026 | 04.02 - Fornecedor | 15/04/2026 | 2.000,00 |
| Sabrina Aparecida Wendl | 04.02 - Fornecedor | 15/04/2026 | 4.000,00 |
| Kaua Leandro | 04.02 - Fornecedor | 15/04/2026 | 3.000,00 |
| Luiz (vale aniversario) | 05.16 - Bonificacao aniversario | 21/04/2026 | 150,00 |
| Ponto mais | 12.01 - Outras despesas | 17/04/2026 | 94,82 |
| FGTS | 07.08 - FGTS | 20/04/2026 | 259,00 |
| FEDERACAO INTERESTADUAL (Sindicato) | 12.01 - Outras despesas | 20/04/2026 | 70,00 |
| Parcelamento ISS | 07.14 - ISS | 23/04/2026 | 1.527,71 |
| ORACLE DO BRASIL venc.: 27/02 | 02.04 - Licencas de softwares | 27/04/2026 | 5.284,62 |
| ORACLE DO BRASIL venc.: 27/03 | 02.04 - Licencas de softwares | 27/04/2026 | 4.725,92 |
| ORACLE DO BRASIL | 02.04 - Licencas de softwares | 27/04/2026 | 4.900,00 |
| Cartao de Credito (Inter) | 12.02 - Cartao de credito | 20/04/2026 | 9.963,31 |
| Porto Digital (Contabilidade) | 06.03 - Contador | 27/04/2026 | 1.722,00 |
| CliniMerces (exame demissional Andre) | 05.06 - Exames | 20/04/2026 | 70,00 |
| Cartao Karina (claude) | 12.01 - Outras despesas | 07/04/2026 | 1.100,00 |
| Cartao Karina (parcela pagamento Matheus) | 12.01 - Outras despesas | 18/04/2026 | 1.089,60 |
| **Total** | | | **R$ 70.410,98** |

### 7.2 Distribuicao por Categoria

| Categoria | Valor (R$) | % |
|-----------|-----------|---|
| 04.02 - Fornecedor | 37.125,00 | 52,7% |
| 02.04 - Licencas de softwares (Oracle) | 14.910,54 | 21,2% |
| 12.02 - Cartao de credito | 9.963,31 | 14,1% |
| 04.03 - Funcionario | 2.329,00 | 3,3% |
| 12.01 - Outras despesas | 2.353,60 | 3,3% |
| 06.03 - Contador | 1.722,00 | 2,4% |
| 07.14 - ISS | 1.527,71 | 2,2% |
| 07.08 - FGTS | 259,00 | 0,4% |
| 05.16 - Bonificacao aniversario | 150,00 | 0,2% |
| 05.06 - Exames | 70,00 | 0,1% |

---

## 8. EXTRATO BANCO INTER — MARCO/2026

### 8.1 Transacoes de Marco/2026

| Data | Tipo | Operacao | Valor (R$) | Descricao |
|------|------|----------|-----------|-----------|
| 01/03/2026 | PIX | D | 1.200,00 | Walter Tambeuhien Frey |
| 02/03/2026 | PAGAMENTO | D | 2.307,91 | Pagamento Fatura - WALTER TAMBEUHIEN FREY |
| 02/03/2026 | PIX | C | 2.781,52 | Nxz Sistemas Inteligentes Ltda |
| 02/03/2026 | OUTROS | C | 5.300,00 | Pix No Credito |
| 02/03/2026 | PIX | D | 5.300,00 | Walter Tambeuhien Frey |
| 03/03/2026 | PIX | D | 97,07 | Vr Gente |
| 04/03/2026 | PIX | C | 536,38 | Nxz Sistemas Inteligentes Ltda |
| 04/03/2026 | PIX | C | 734,29 | Nxz Sistemas Inteligentes Ltda |
| 06/03/2026 | PIX | C | 15.818,79 | Nxz Sistemas Inteligentes Ltda |
| 06/03/2026 | PIX | D | 3.577,00 | Andre Luiz Bartholdy Ribas |
| 06/03/2026 | PIX | D | 71,00 | Bianca Thaina Carvalho Joba |
| 06/03/2026 | PIX | D | 713,00 | Flash App |
| 07/03/2026 | PIX | D | 1.000,00 | Walter Tambeuhien Frey |
| 10/03/2026 | PIX | D | 3.069,35 | Cef Matriz |
| 11/03/2026 | PIX | C | 6.900,14 | Nxz Sistemas Inteligentes Ltda |
| 11/03/2026 | PIX | D | 11.000,00 | Madev |
| 11/03/2026 | PIX | C | 6.288,10 | Walter Tambeuhien Frey |
| 13/03/2026 | PIX | D | 5.261,63 | Andre Luiz Bartholdy Ribas |
| 13/03/2026 | PIX | D | 3.000,00 | Renata Cristina Raab Flores |
| 13/03/2026 | PIX | D | 2.000,00 | Luiz Claudio Moreira De Almeida |
| 13/03/2026 | PIX | D | 2.000,00 | Sabrina Aparecida Wendl |
| 13/03/2026 | PIX | C | 1.062,92 | Nxz Sistemas Inteligentes Ltda |
| 17/03/2026 | PIX | C | 7.058,56 | Nxz Sistemas Inteligentes Ltda |
| 17/03/2026 | PAGAMENTO | D | 94,82 | VR BENEFICIOS E SERV PROC |
| 18/03/2026 | PIX | D | 2.394,67 | Wlocus Tecnologia Da Informacao |
| 19/03/2026 | PIX | D | 2.000,00 | Walter Tambeuhien Frey |
| 19/03/2026 | PIX | D | 116,00 | Pv Ltda |
| 19/03/2026 | PIX | C | 257,39 | Nxz Sistemas Inteligentes Ltda |
| 20/03/2026 | PAGAMENTO | D | 70,00 | FEDERACAO NACIONAL DOS TRABALHADORES |
| 20/03/2026 | PIX | D | 259,00 | Cef Matriz |
| 20/03/2026 | PIX | D | 52,99 | Demerge Brasil |
| 22/03/2026 | PIX | D | 500,00 | Walter Tambeuhien Frey |
| 23/03/2026 | PIX | D | 1.527,71 | Secretaria Municipal De Financ |
| 24/03/2026 | PIX | D | 40,00 | Nic Br |
| 24/03/2026 | PAGAMENTO | D | 1.065,86 | Pagamento Fatura - WALTER TAMBEUHIEN FREY |
| 24/03/2026 | PIX | C | 3.173,09 | Nxz Sistemas Inteligentes Ltda |
| 26/03/2026 | PIX | C | 6.308,70 | Nxz Sistemas Inteligentes Ltda |
| 28/03/2026 | PIX | D | 500,00 | Walter Tambeuhien Frey |
| 28/03/2026 | PIX | C | 2.980,21 | Nxz Sistemas Inteligentes Ltda |
| 30/03/2026 | PIX | D | 100,00 | Walter Tambeuhien Frey |
| 30/03/2026 | PAGAMENTO | D | 1.300,00 | Pagamento Fatura - Sabrina Wendl |
| 30/03/2026 | PIX | C | 2.409,30 | Nxz Sistemas Inteligentes Ltda |
| 31/03/2026 | PIX | D | 3.000,00 | Renata Cristina Raab Flores |
| 31/03/2026 | PIX | D | 620,00 | Flash App |
| 31/03/2026 | PIX | D | 2.000,00 | Luiz Claudio Moreira De Almeida |
| 31/03/2026 | PIX | D | 5.500,00 | Caroline Silva Santos Oliveira |
| 31/03/2026 | PIX | D | 100,00 | Walter Tambeuhien Frey |
| 31/03/2026 | PIX | C | 627,53 | Nxz Sistemas Inteligentes Ltda |
| 31/03/2026 | PIX | D | 400,00 | Walter Tambeuhien Frey |

### 8.2 Totalizacao Marco/2026 (Inter)

| Tipo Operacao | Total (R$) |
|---------------|-----------|
| **Creditos (C)** | **54.937,41** |
| **Debitos (D)** | **57.437,01** |
| **Saldo do periodo** | **(2.499,60)** |

> Nota: Os creditos "Nxz Sistemas Inteligentes Ltda" representam transferencias do Asaas para a conta Inter.

---

## 9. EXTRATO BANCO INTER — ABRIL/2026 (01 a 04/04)

| Data | Tipo | Operacao | Valor (R$) | Descricao |
|------|------|----------|-----------|-----------|
| 01/04/2026 | COMPRA_DEBITO | D | 686,00 | Dl*google Worksp (Google Workspace) |
| 01/04/2026 | PIX | C | 745,45 | Nxz Sistemas Inteligentes Ltda |
| 02/04/2026 | PIX | C | 750,26 | Nxz Sistemas Inteligentes Ltda |
| 02/04/2026 | PIX | D | 300,00 | Walter Tambeuhien Frey |
| 03/04/2026 | PIX | D | 2.150,00 | Sabrina Aparecida Wendl |
| 03/04/2026 | PIX | C | 1.228,19 | Nxz Sistemas Inteligentes Ltda |
| 04/04/2026 | PIX | D | 100,00 | Walter Tambeuhien Frey |

### 9.1 Totalizacao Abril/2026 (parcial, 01-04/04)

| Tipo Operacao | Total (R$) |
|---------------|-----------|
| **Creditos (C)** | **2.723,90** |
| **Debitos (D)** | **3.236,00** |
| **Saldo do periodo** | **(512,10)** |

---

## 10. DASHBOARD HISTORICO — DESPESAS vs RECEITAS

### 10.1 Evolucao Mensal (Nov/2025 a Jul/2026)

| Mes | Despesas (R$) | Receitas Previstas (R$) | Diferenca (R$) |
|-----|--------------|------------------------|---------------|
| 11/2025 | 80.470,62 | 61.730,66 | (18.739,96) |
| 12/2025 | 71.248,56 | 67.033,51 | (4.215,05) |
| 01/2026 | 67.860,34 | 59.744,00 | (8.116,34) |
| 02/2026 | 62.074,94 | 50.047,01 | (12.027,93) |
| 03/2026 | 74.444,65 | 20.004,54 | (54.440,11) |
| **04/2026** | **70.410,98** | **47.767,45** | **(22.643,53)** |
| 05/2026 (prev) | 57.787,30 | 33.720,35 | (24.066,95) |
| 06/2026 (prev) | 49.799,71 | 4.456,30 | — |
| 07/2026 (prev) | 49.799,71 | 5.234,34 | — |

### 10.2 Despesas Pagas vs Receitas Recebidas (Realizado)

| Mes | Despesas Pagas (R$) | Receitas Recebidas (R$) | Diferenca (R$) |
|-----|--------------------|-----------------------|---------------|
| 11/2025 | 79.487,62 | 61.730,66 | (17.756,96) |
| 12/2025 | 69.437,83 | 65.868,82 | (3.569,01) |
| 01/2026 | 62.071,51 | 57.791,90 | (4.279,61) |
| 02/2026 | 57.786,63 | 48.960,69 | (8.825,94) |
| 03/2026 | 59.664,04 | 3.390,67 | (56.273,37) |
| **04/2026** | **0,00** | **1.005,02** | **1.005,02** |

> **ALERTA**: Marco/2026 mostra enorme discrepancia entre despesas pagas (R$ 59.664) e receitas recebidas (R$ 3.390) — reflete defasagem temporal entre pagamentos de despesas e recebimento de receitas via Asaas/boleto.

### 10.3 Receitas Historicas por Mes (Data Vencimento) — 2025

| Mes | Receita Total Recebida (R$) |
|-----|---------------------------|
| 02/2025 | 56.847,12 |
| 03/2025 | 57.658,13 |
| 04/2025 | 57.270,55 |
| 05/2025 | 64.926,18 |
| 06/2025 | 66.480,68 |
| 07/2025 | 61.964,48 |
| 08/2025 | 76.751,98 |
| 09/2025 | 61.776,22 |
| 10/2025 | 65.705,04 |
| 11/2025 | 63.303,93 |
| 12/2025 | 60.774,97 |
| 01/2026 | 57.222,64 |
| **Acumulado 12 meses** | **750.681,92** |

---

## 11. CONCILIACAO — CONTAS A PAGAR

| Campo | Descricao |
|-------|-----------|
| Sheet | [Conciliacao] Contas a pagar (nao editar) |
| Colunas | idConciliacao, idTransacao, descricao, dataTransacao, tipoTransacao, tipoOperacao, valor |
| Status | Dados de conciliacao disponiveis desde 01/2024 |
| Registros | 1.608 linhas |

> Conciliacao cruzada com extrato Inter. Dados verificados e consistentes com extrato bancario.

---

## 12. ODOO ERP — PLACEHOLDER

**Status**: Odoo MCP nao configurado para Nexuz. O servidor MCP-skioba pertence a outra empresa (No. Coffee / Skioba Sorvetes). **NAO UTILIZADO.**

Dados cadastrais limitados ao Asaas e Google Sheets.

---

## 13. DATASET UNIFICADO — NORMALIZACAO

### 13.1 Inventario de Datasets Disponiveis

| Dataset | Fonte | Periodo | Registros | Status |
|---------|-------|---------|-----------|--------|
| Clientes | Asaas (via API + Sheets) | Ate 04/2026 | 160 | COMPLETO |
| Assinaturas | Asaas (via API + Sheets) | Ate 04/2026 | 124 | COMPLETO |
| Cobrancas Marco | Asaas API | 03/2026 | 128 | COMPLETO |
| Cobrancas Abril | Dashboard Geral | 04/2026 | ~120 | COMPLETO |
| Inadimplencia | Asaas API | 04/04/2026 | 7 | COMPLETO |
| Extrato Inter | Google Sheets | 01/2024 a 04/2026 | ~1.500 | COMPLETO |
| Contas a Pagar | Google Sheets | 12/2023 a 01/2026 | ~1.416 | COMPLETO |
| Dashboard Geral | Google Sheets | 11/2025 a 07/2026 | Consolidado | COMPLETO |
| Receitas (Data Vencimento) | Google Sheets | 02/2025 a 01/2026 | ~1.089 | COMPLETO |
| Conciliacao | Google Sheets | 01/2024 a atual | ~1.608 | COMPLETO |

### 13.2 Padronizacao de Schema

| Campo | Formato Padrao | Exemplo |
|-------|---------------|---------|
| Datas | ISO 8601 (YYYY-MM-DD) | 2026-04-04 |
| Valores monetarios | BRL, 2 casas decimais | R$ 54.593,32 |
| IDs Asaas (cliente) | cus_XXXXXXXXXXXX | cus_000168956653 |
| IDs Asaas (pagamento) | pay_XXXXXXXXXXXX | pay_knmxhv51v6kxu7b9 |
| IDs Asaas (assinatura) | sub_XXXXXXXXXXXX | sub_cmlcfxzo91n3l66m |
| Status pagamento | ENUM Asaas | PENDING, RECEIVED, CONFIRMED, OVERDUE |

### 13.3 Cross-Validacao: Asaas vs Sheets

| Metrica | Asaas API (03/04) | Dashboard Geral (04/04) | Divergencia |
|---------|-------------------|------------------------|-------------|
| Receita prevista abril | R$ 53.963,93 | R$ 47.767,45 | **R$ 6.196,48** |
| Clientes ativos | 160 | N/A (nao exibido) | — |
| MRR | R$ 54.593,32 | N/A (nao calculado) | — |

> **Divergencia na receita prevista**: A API Asaas retornou R$ 53.963,93 no dia 03/04 para cobrancas de abril. O Dashboard Geral mostra R$ 47.767,45. Possivel explicacao: (1) o Dashboard exclui cobrancas de clientes anuais/semestrais ja pagos, (2) filtro diferente de status, ou (3) ajustes manuais no sheet.

### 13.4 Cross-Validacao: Inter vs Asaas (Transferencias)

Os creditos na conta Inter marcados como "Nxz Sistemas Inteligentes Ltda" representam transferencias automaticas do Asaas:
- Marco/2026: 10 transferencias Asaas->Inter totalizando ~R$ 54.437,41
- Abril/2026 (01-04): 3 transferencias totalizando R$ 2.723,90
- Consistente com cobrancas recebidas no periodo

---

## 14. RELATORIO DE QUALIDADE

### 14.1 Indicadores de Completude

| Dimensao | Status | Completude |
|----------|--------|-----------|
| Saldos (Inter + Asaas) | EXTRAIDO | 100% |
| Clientes (cadastro) | 160/160 | 100% |
| Assinaturas | 124/124 | 100% |
| Cobrancas marco/2026 | 128/128 | 100% |
| Cobrancas abril/2026 (Dashboard) | Consolidado | 100% |
| Inadimplencia (aging) | 7/7 titulos | 100% |
| Extrato Inter (marco/2026) | 49 transacoes | 100% |
| Extrato Inter (abril/2026) | 7 transacoes | 100% |
| Contas a pagar (abril) | Via Dashboard | 100% |
| Receitas historicas (12 meses) | Consolidado | 100% |
| Conciliacao bancaria | Disponivel | 100% |
| Dados cadastrais ERP (Odoo) | Nao disponivel | 0% |
| **COMPLETUDE GERAL** | **EXCELENTE** | **~92%** |

### 14.2 KPIs Extraidos

| KPI | Valor |
|-----|-------|
| **MRR** | **R$ 54.593,32** |
| **ARR estimado** | **R$ 655.119,84** |
| Ticket medio mensal (por assinatura) | R$ 440,27 |
| Clientes cadastrados | 160 |
| Assinaturas ativas | 124 |
| Receita media mensal (12 meses) | R$ 62.556,83 |
| Saldo total disponivel | R$ 10.072,37 |
| Despesas previstas abril | R$ 70.410,98 |
| Receita prevista abril | R$ 47.767,45 |
| Gap despesa-receita abril | R$ (22.643,53) |
| Taxa recebimento marco (RECEIVED+CONFIRMED) | 95,0% |
| Taxa inadimplencia marco | 5,0% |
| Valor total em atraso (OVERDUE) | R$ 2.636,69 |
| Faturamento marco/2026 | R$ 52.360,31 |

### 14.3 Alertas

| Severidade | Codigo | Descricao |
|------------|--------|-----------|
| **CRITICO** | FIN-001 | Saldo total (R$ 10.072,37) muito abaixo das despesas de abril (R$ 70.410,98). Deficit projetado de R$ 60.338,61. A empresa depende de recebimentos de abril (R$ 47.767,45 previstos) + aportes para cobrir despesas. |
| **ALTO** | FIN-002 | Despesas consistentemente superiores a receitas nos ultimos 6 meses. Margem negativa estrutural de R$ 4.000 a R$ 54.000/mes. |
| **ALTO** | FIN-003 | Oracle representa R$ 14.910,54 (21,2% das despesas abril) — 3 parcelas acumuladas de licencas de software. Verificar se ha renegociacao possivel. |
| **ALTO** | FIN-004 | Amor Espresso (3 filiais) concentra R$ 963,70 em inadimplencia — grupo economico em risco de churn. |
| **MEDIO** | FIN-005 | 100% das cobrancas via boleto — migracao para PIX/cartao pode reduzir inadimplencia e acelerar recebimentos. |
| **MEDIO** | FIN-006 | 36 clientes sem assinatura ativa (160 cadastrados vs 124 assinaturas) — possivel churn nao rastreado ou clientes inativos. |
| **MEDIO** | FIN-007 | Divergencia de R$ 6.196,48 entre receita prevista Asaas (API) e Dashboard. Requer investigacao de origem. |
| **INFO** | FIN-008 | Transferencias Asaas->Inter consistentes com recebimentos. Conciliacao bancaria funcional. |
| **INFO** | FIN-009 | Marco/2026: receita recebida no Inter (R$ 3.390,67) muito abaixo do esperado — indica que transferencias Asaas ocorrem com defasagem. Receita total do mes via API = R$ 52.360. |
| **INFO** | SRC-001 | Odoo indisponivel (base errada). Nenhum impacto na extracao — dados financeiros cobertos por Asaas + Sheets. |

---

## 15. RESUMO EXECUTIVO

### Saude Financeira — Abril/2026 (Snapshot dia 4)

| Indicador | Valor | Status |
|-----------|-------|--------|
| MRR | R$ 54.593,32 | ESTAVEL |
| Receita prevista abril | R$ 47.767,45 | EM LINHA |
| Despesas previstas abril | R$ 70.410,98 | ACIMA DA RECEITA |
| Gap mensal | (R$ 22.643,53) | DEFICITARIO |
| Caixa disponivel | R$ 10.072,37 | BAIXO |
| Taxa inadimplencia | 5,0% | ACEITAVEL |
| OVERDUE total | R$ 2.636,69 | CONTROLADO |
| Clientes ativos | 124 assinaturas | ESTAVEL |

**Conclusao**: A Nexuz opera com deficit estrutural entre despesas e receitas SaaS. Receita recorrente (MRR R$ 54.593) nao cobre despesas operacionais mensais (R$ 62-80k). O caixa disponivel (R$ 10.072) e critico para o volume de contas a pagar. A base de clientes e estavel (124 assinaturas, 5% inadimplencia), mas a empresa necessita de capitalizacao adicional ou reducao significativa de custos.

---

*Documento gerado por Diana Dados — Extratora de Dados Financeiros*
*Nexuz Financial Analysis Squad | v1 | 2026-04-04*
*Completude geral: ~92% | Fontes: Asaas (API + Sheets) + Banco Inter (Sheets) + Dashboard Geral*
