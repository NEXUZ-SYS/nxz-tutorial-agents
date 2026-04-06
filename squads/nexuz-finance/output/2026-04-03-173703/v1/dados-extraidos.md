# Dataset Financeiro Nexuz — Extracao 03/04/2026

## Metadata

| Campo | Valor |
|-------|-------|
| **Squad** | Nexuz Financial Analysis |
| **Agente** | Diana Dados — Extratora de Dados Financeiros |
| **Periodo de analise** | Marco/2026 + Abril/2026 (parcial ate 03/04) |
| **Data de extracao** | 2026-04-03T17:37:03-03:00 |
| **Versao do dataset** | v1 (re-execucao com API key) |

### Fontes Consultadas

| Fonte | Tipo | Status | Registros Extraidos |
|-------|------|--------|---------------------|
| Asaas API | REST API v3 (producao) | **CONECTADO** | 532 registros |
| Google Sheets (Banco Inter) | MCP (gsheets) | **INDISPONIVEL** — nao conectado | 0 |
| Odoo ERP | MCP (skioba) | **CONECTADO — base errada** (No. Coffee, nao Nexuz) | 0 |

---

## Saldo Asaas

| Metrica | Valor |
|---------|-------|
| Saldo disponivel em conta | **R$ 0,00** |
| Data da consulta | 03/04/2026 |

> **Nota**: Saldo zerado indica que os valores recebidos sao transferidos automaticamente para conta bancaria (transferencia automatica ativa) ou foram sacados recentemente.

---

## Clientes

| Metrica | Quantidade |
|---------|-----------|
| Total de clientes cadastrados | **160** |
| Clientes ativos | **160** |
| Clientes deletados | **0** |
| Clientes com assinatura ativa | **~124** |
| Clientes sem assinatura (possivel churn) | **~36** |

### Perfil da Base
- 100% dos clientes sao PJ (CNPJ)
- Predominancia de franquias **Go Coffee** (~80 unidades), seguidas por **Pomo Pasta**, **Breadbox**, **Mini Donuts**, **Abacazo**, **Coffeetown**, **Amor Espresso**, entre outras marcas food-service
- Distribuicao geografica nacional: PR, SP, RJ, RS, SC, BA, CE, MG, DF, PE, ES, GO, PI, RN, TO, AC, MS

### Lista Completa de Clientes (160)

| # | ID Asaas | Razao Social / Nome Fantasia | CNPJ |
|---|----------|------------------------------|------|
| 1 | cus_000168956653 | Toldo Cafeteria Ltda - Filial III | 65964193000146 |
| 2 | cus_000163614187 | B.P. CAFETERIA LTDA - Go Coffee - PR Salgado Filho II | 65343372000166 |
| 3 | cus_000156656187 | Momo Crunchy - CE Buena Vista Eusebio | 49403544000274 |
| 4 | cus_000156225071 | CALMO CAFES E COOKIES CENTRO LTDA - Calmo Cafes - SC Osmar Cunha | 63625361000143 |
| 5 | cus_000155517652 | Franciely Karoline Ferreira de Castro - Go Coffee - SP Santana II | 50282101000170 |
| 6 | cus_000146748217 | Msa Roque & Jcrm LTDA - Coffeetown - ES Jardim Camburi | 63021371000170 |
| 7 | cus_000143566639 | Laguna Cookies LTDA - The Cookiery | 57618082000150 |
| 8 | cus_000140342874 | A2 COFFEE CAFETERIA LTDA - Go Coffee - PR Comendador Macedo | 60743233000106 |
| 9 | cus_000139652763 | FMG MAIA CAFETERIA LTDA - No. Coffee - SP Santos | 62464546000150 |
| 10 | cus_000137374879 | Tata Cafe & Smoothie LTDA - No. Coffee - SP Peruibe | 62059598000141 |
| 11 | cus_000136397856 | NO COFFEE & SMOOTHIE FRANCHISING LTDA - NO COFFEE | 60009496000196 |
| 12 | cus_000132015815 | Rebonato Cafeteria Ltda - Go Coffee - GO Shopping Lozandes II | 20638515000129 |
| 13 | cus_000131235593 | Geliquia Ltda - Geliquia - PR Matriz | 62138205000195 |
| 14 | cus_000130244275 | ABACAZO PALLADIUM LTDA - ABACAZO - PR Shopping Palladium (II) | 61842947000134 |
| 15 | cus_000129375520 | Dois Irmaos Industria e Comercio de Sorvetes LTDA - Skioba Sorvetes | 21813583000140 |
| 16 | cus_000128468419 | ABACAZO BARIGUI LTDA - Abacazo - Shopping Barigui | 61842296000182 |
| 17 | cus_000128419022 | INTER FRANCHISING COFFEETOWN LTDA - Coffetown - PR Matriz | 55420009000143 |
| 18 | cus_000127838290 | B&D SERVICOS DE ALIMENTACAO E CAFETERIA LTDA - Go Coffee - RS Porto Alegre (II) | 61362882000120 |
| 19 | cus_000126312446 | Calmo Cafes e Cookies LTDA - Calmo Cafes | 44553583000153 |
| 20 | cus_000122433810 | MD CAFE LTDA - Mini Donuts - RS Erechim | 60776253000183 |
| 21 | cus_000120774990 | AMOR ESPRESSO CAFE LTDA - Amor Espresso - SP Vila Olimpia [filial II] | 33644804000344 |
| 22 | cus_000120773631 | AMOR ESPRESSO CAFE LTDA - [FILIAL I] AMOR ESPRESSO CAFE | 33644804000263 |
| 23 | cus_000114432229 | AROMAS DIVINOS LTDA - Go Coffee - BA Shopping da Bahia | 58332726000101 |
| 24 | cus_000113724870 | Irado Gelateria Alejandro Gelateria LTDA - Irado Gelateria - PR Bigorrilho (matriz) | 59793724000182 |
| 25 | cus_000112679509 | A2 CAFETERIA LTDA - Go Coffee - Pinhais III | 55006293000106 |
| 26 | cus_000112676911 | ABACATE ABACAZO COMERCIO DE ALIMENTOS LTDA - Abacazo - Shopping Estacao II | 56987818000102 |
| 27 | cus_000111919868 | ADT CAFETERIA LTDA - Go Coffee - RS Sao Leopoldo | 32538780000114 |
| 28 | cus_000109794629 | D & J COFFEE LTDA - Go Coffee - RS Tramandai | 56053278000181 |
| 29 | cus_000107956633 | BREADBOX LTDA - Breadbox - SC Patio Milano | 48136294000371 |
| 30 | cus_000107753793 | LEON & MATHILDA CAFE LTDA - Go Coffee - RS Quinze de Janeiro | 57579276000193 |
| 31 | cus_000107373082 | A P DO NASCIMENTO NETO - Go Coffee - AC Alpha Mall | 28037011000165 |
| 32 | cus_000107294773 | GO COFFEE LANCHONETE LTDA - Go Coffee - SP Shopping Grand Plaza | 58014423000140 |
| 33 | cus_000106508426 | KOCOFFEE LTDA - Go Coffee - BA Lauro de Freitas | 57073740000175 |
| 34 | cus_000104510307 | MTW CAFES ESPECIAIS LTDA - Go Coffee - SP Jardins do Brasil | 56304749000187 |
| 35 | cus_000103857878 | RM HOUSE COFFEE LTDA - Go Coffee - SP Indaiatuba | 56000392000143 |
| 36 | cus_000102476902 | ANA CAROLINA MARTINS AMORIM VENTURA - Go Coffee - MG Brumadinho | 29536362000183 |
| 37 | cus_000101934572 | M & S CAFETERIA LTDA - Go Coffee - PR CWB Copa Mall | 56439012000171 |
| 38 | cus_000101837203 | SAO FRANCISCO CAFETERIA LTDA - Go Coffee - MS Sao Francisco | 57307899000107 |
| 39 | cus_000101836041 | COFFEE BY RAFA LTDA - Go Coffee - SP Bela Vista | 56419736000153 |
| 40 | cus_000101186156 | NMS LTDA - Go Coffee - SP Rua Augusta | 57214450000102 |
| 41 | cus_000100581441 | R A DO CARMO CAFETERIA LTDA - Go Coffee - PR Santo Antonio da Platina | 56033904000178 |
| 42 | cus_000100508730 | REAL MTSC LTDA - Go Coffee - RJ Shopping Rio Sul | 05146827000121 |
| 43 | cus_000100308272 | VIA CURITIBA COMERCIAL DE ALIMENTOS LTDA - Pastelaria da Jo | 14797446000101 |
| 44 | cus_000099721795 | JEM - THE BEST COFFEE LTDA - Go Coffee - PR CWB ED. ASA | 57304822000183 |
| 45 | cus_000098010828 | ANAKAM CAFETERIA LTDA - Go Coffee - PE Petrolina | 54628401000110 |
| 46 | cus_000097999008 | LIMA & CAVALCANTE CAFETERIA LTDA - Go Coffee - CE LC Corporate | 53188856000107 |
| 47 | cus_000096064239 | P V DE SOUSA SILVA MAGALHAES - Go Coffee - TO Araguaina | 55406324000116 |
| 48 | cus_000095120746 | LU MORAIS CAFE LTDA - Go Coffee - SC Balneario Shopping | 56282552000194 |
| 49 | cus_000092112863 | CM CAFE PEDROSA LTDA - Go Coffee - PR Dr. Pedrosa II | 56885822000151 |
| 50 | cus_000091270530 | LLDUCA CAFETERIA LTDA - Go Coffee - PR Ed Office Life | 54926078000160 |
| 51 | cus_000090095396 | FF COFFEE LTDA - Go Coffee - SP Moraes Salles | 54389232000102 |
| 52 | cus_000089801851 | MJM CAFE LTDA - Go Coffee - SP Guarulhos | 54993329000120 |
| 53 | cus_000088319583 | CAFE DAS GURIAS LTDA - Go Coffee - SC Mafra | 52460208000197 |
| 54 | cus_000087397050 | NEIVA & SANTOS LTDA - GO COFFEE - PI Paranaiba | 53938506000102 |
| 55 | cus_000086838815 | G. P. AZEREDO LTDA - Go Coffee - RS Pelotas | 52339407000141 |
| 56 | cus_000086374739 | ABACAZO COMERCIO DE ALIMENTOS LTDA - Abacazo | 40538549000159 |
| 57 | cus_000085843326 | SONS OF COFFEE CAFETERIA LTDA - Go Coffee - RJ Metro Rio | 54739539000196 |
| 58 | cus_000085163418 | ABFL COMERCIO DE ALIMENTOS LTDA - Go Coffee - PE Alberto Paiva | 53210352000138 |
| 59 | cus_000083857509 | LG CAFE LTDA - Go Coffee - PR Emiliano Perneta | 36485675000115 |
| 60 | cus_000083357741 | RF CAFE E LOCACAO DE ESPACO LTDA - Go Coffee - SP Barra Funda | 54234110000147 |
| 61 | cus_000082195023 | POMO PASTA STORE 03 LTDA - POMO PASTA - Trindade | 52361478000140 |
| 62 | cus_000082051112 | MANA COFFEE LTDA - GC RS Marau | 54176527000109 |
| 63 | cus_000081974475 | Toldo Cafeteria Ltda - Matriz II | 54347304000159 |
| 64 | cus_000081969431 | Toldo Cafeteria Ltda - Filial II | 54347304000230 |
| 65 | cus_000081723816 | GREAT COFFEE CAFETERIA LTDA - Go Coffee - PR Araucaria | 52596116000139 |
| 66 | cus_000081613680 | GO COFFEE CAFETERIA LTDA - Go Coffee - RS Cachoeirinha | 53145790000160 |
| 67 | cus_000081453424 | JAGHER & KUCHLA LTDA - GC PR Curitibano II | 54337291000137 |
| 68 | cus_000080678085 | J F C ARAUJO CAFETERIA LIDER LTDA - Go Coffee - PE Av. Agamenon Magalhaes | 48694759000148 |
| 69 | cus_000080610495 | TS Cafe Ltda - Go Coffee - PR Augusto Stresser II | 53729304000150 |
| 70 | cus_000080187610 | O MELHOR DO CAFE LTDA - Go Coffee - PR Passeo Republica | 42000615000168 |
| 71 | cus_000079545298 | Peaky Coffee Blinder Cafeteria Ltda - Go Coffee - RJ Miguel Lemos | 53010186000126 |
| 72 | cus_000079539052 | AGNUS CAFE LTDA - Go Coffee - PR Arthur Bernardes | 53020659000176 |
| 73 | cus_000079382622 | ARRUDA COFFEE LTDA - GC Pirai do Sul | 51206932000126 |
| 74 | cus_000079382269 | BEATRIZ GOODMAN DESIGN E COM. DE ALI. LTDA - Go Coffee - RJ Barra World | 36024607000159 |
| 75 | cus_000079381995 | BLB EMPREENDIMENTO LTDA - Go Coffee - CE Unifor | 52484180000128 |
| 76 | cus_000079381915 | B&G CAFES - GC Visconde do Rio Branco | 40373793000109 |
| 77 | cus_000079381289 | IRC DE MELO - Go Coffee - RN Natal | 47988606000140 |
| 78 | cus_000079380644 | MAZZ CAFE LTDA - Go Coffee - SP Lins de Vasconcelos II | 53621509000118 |
| 79 | cus_000079380512 | MELLO & MELLO - CAFES LTDA - CG Avenida Bom Jesus | 46457190000333 |
| 80 | cus_000079378923 | V.C CAFETERIA LTDA - Go Coffee - PR Salgado Filho | 52558274000102 |
| 81 | cus_000077117408 | COFFE BY BIA AROMA E GRAOS COMERCIO LTDA - GC Alphaville | 53559826000151 |
| 82 | cus_000075874936 | GO COFFEE CAFETERIA FRANCISCO BELTRAO LTDA - Go Coffee Francisco Beltrao | 52247747000142 |
| 83 | cus_000073531989 | EP CAFE LTDA - Go Coffee - Park Mall | 51844909000167 |
| 84 | cus_000073530712 | COFFEE E SELSKI LTDA - Go Coffee - PR Cel Bittencourt | 51464005000106 |
| 85 | cus_000072701012 | GO COFFEE MATINHOS LTDA - Go Coffee - PR Matinhos | 51861255000180 |
| 86 | cus_000070898345 | STREY ALIMENTOS LTDA - Go Coffee - RS Dois Irmaos | 51513607000106 |
| 87 | cus_000066521833 | MARCIA CRISTIANI DOS SANTOS - Go Coffee - SP Eloy Chaves | 50914914000136 |
| 88 | cus_000065513861 | ALPHA CAFE LTDA - Go Coffee - SP Calcada dos Lirios | 50832130000169 |
| 89 | cus_000061924830 | XAXIM PASTA LTDA - Macarrao Curitiba - Xaxim | 51760382000192 |
| 90 | cus_000061615564 | MAGALI RESTAURANTE E CAFETERIA LTDA - Bean go! Bigorrilho | 51507199000180 |
| 91 | cus_000061614884 | AUREA CAFETERIA LTDA - Go Coffee - SP UniSantos | 51049643000160 |
| 92 | cus_000060367790 | GRAND POINT COMERCIO DE VEICULOS LTDA - Go Coffee - SP BMW | 01291387000145 |
| 93 | cus_000059927032 | POA CAFES LTDA - GoCoffee - GC RS Assis Brasil | 49195938000101 |
| 94 | cus_000059380439 | VJV COFFEE PRODUTOS ALIMENTICIOS LTDA - Go Coffee - RJ Sao Boaventura | 49875168000130 |
| 95 | cus_000058893786 | C. F. GRILLO & CIA LTDA - Go Coffee - DF Brasilia Park Sul | 50381022000117 |
| 96 | cus_000058326694 | DAUDT CAFETERIA LTDA - Cafeteria Vila Izabel - Buona Farina | 44939637000113 |
| 97 | cus_000057917216 | HGM CAFE LTDA - Go Coffee - SC Norte Shopping Blumenau | 49995696000122 |
| 98 | cus_000057413282 | ESPACO N'AREIA BEACH LTDA - GC SP Maresias | 08807846000140 |
| 99 | cus_000057324923 | CONTEM OVO COMERCIO DE ALIMENTOS LTDA - Contem Ovo | 46454439000195 |
| 100 | cus_000056395201 | MARIE RIBEIRO PEREIRA LTDA - GC PR Cidade dos Lagos (Guarapuava) | 49139625000128 |
| 101 | cus_000053556640 | MARTINS CAMARGO CAFETERIA LTDA - Go Coffee Raul Pompeia | 48745157000172 |
| 102 | cus_000052848232 | POSTO SHOPPING CAR COMBUSTIVEIS LTDA - GC RS Venancio Aires | 00121811000574 |
| 103 | cus_000052579141 | AQUELE ABRACO CAFE BAR LTDA - Go Coffee - SP Ed. Erika | 49733019000136 |
| 104 | cus_000052161578 | CAFETERIA DOCE CAFE LTDA - Go Coffee Cidade Nova - GC RJ Neri Pinheiro | 49814371000104 |
| 105 | cus_000051971164 | POMO PASTA MARINGA LTDA - Pomo Pasta | 47659810000118 |
| 106 | cus_000051969983 | POMO PASTA VIDAL RAMOS LTDA - Pomo Pasta | 42597574000139 |
| 107 | cus_000050632947 | CAFETERIA DIGESTIVE LTDA - Go Coffee - GC CE Complexo Sao Mateus | 48962998000131 |
| 108 | cus_000049264878 | Momo Crunchy Sorvetes Ltda | 49403544000193 |
| 109 | cus_000048143533 | L.A. CAFETERIA NP LTDA - Go Coffee Nova Prata | 48720488000158 |
| 110 | cus_000046985587 | TMV CAFETERIA E ALIMENTACAO LTDA - Go Coffee - BA Pituba | 48957264000164 |
| 111 | cus_000046665223 | BUENO MA CAFETERIA LTDA - Go Coffee Juazeiro - CE Juazeiro | 48376801000182 |
| 112 | cus_000046396763 | TWO TWO FOUR LTDA - Go Coffee - SP Bom Retiro | 48342050000183 |
| 113 | cus_000046389016 | S & DRZ- COMERCIO DE ALIMENTOS LTDA - Mini Donuts - RS Ijui | 35254422000178 |
| 114 | cus_000046386114 | BMK CAFETERIA LTDA - Go Coffee - SP La Plage | 48999690000160 |
| 115 | cus_000044136851 | MINI DONUTS INDUSTRIA, COMERCIO E FRANCHISING LTDA - Mini Donuts | 29292252000113 |
| 116 | cus_000043470372 | MELLO&MELLO - Cafes Ltda - GC PR City Center | 46457190000252 |
| 117 | cus_000043467525 | K&C CAFETERIA LTDA - GC MT Grevileas | 47632181000132 |
| 118 | cus_000043467161 | ACY COFFEE CAFETERIA LTDA - Go Coffee - SP Paraiso | 48150046000113 |
| 119 | cus_000042677240 | MICANA SOCIEDADE UNIPESSOAL LTDA - Micana Cafeteria - SP Penha de Franca | 48219525000149 |
| 120 | cus_000042019162 | 227 CAFE LTDA - Go Coffee - GC PR Cascavel | 47975161000164 |
| 121 | cus_000042018840 | BIANCHIN CAFETERIA LTDA - Go Coffee - RS Borges de Medeiros | 47910312000104 |
| 122 | cus_000042018658 | COFFEE THRU CAFES LTDA - Go Coffee - PR Guaratuba | 45639270000185 |
| 123 | cus_000040782072 | H & C CAFES LTDA - Go Coffee - RJ Rua Mexico | 47561069000158 |
| 124 | cus_000039913368 | MARILE CAFETERIA LTDA - Go Coffee - SP SJRP Francisco das Chagas | 46726482000162 |
| 125 | cus_000039666189 | MADEGU CAFE LTDA - Go Coffee Jacarepagua | 47145661000179 |
| 126 | cus_000039132861 | MSF COMERCIO DE ROUPAS E ACESSORIOS EIRELI - GC ES Vitoria Aleixo Netto | 06978778000156 |
| 127 | cus_000038973274 | B&B CAFES LTDA - Go Coffee Jardim Paulista - GC SP Brig. Luis Antonio | 46516006000117 |
| 128 | cus_000037953866 | CFL COFFEE LTDA - Go Coffee - GC PE Recife Benvinda | 47142090000119 |
| 129 | cus_000036440207 | KAFFEINE CAFETERIA LTDA - Go Coffee RJ Tijuca | 46657074000104 |
| 130 | cus_000036324650 | SISTERS COFFEE LTDA - GC MG Muriae | 45987659000111 |
| 131 | cus_000036098531 | MELLO & MELLO CAFES LTDA - GC Campo Largo | 46457190000171 |
| 132 | cus_000035899181 | HAGI CAFE E COWORKING LTDA - GC SP Borges Lagoa II | 48999873000186 |
| 133 | cus_000034838628 | C G CAFETERIA 194 LTDA - Go Coffee - GC DF Brasilia Victoria | 46725884000142 |
| 134 | cus_000034259859 | GOOD COFFEE 1 ALIMENTOS E BEBIDAS LTDA - GC SP Alameda Santos | 43215055000121 |
| 135 | cus_000034005902 | SA COMERCIO DE ALIMENTOS LTDA - Go Coffee - SC Criciuma Santo Antonio | 46004221000139 |
| 136 | cus_000033915956 | FLV CAFETERIA LTDA - Go Coffee - MG BH Santa Efigenia | 45510111000186 |
| 137 | cus_000033593008 | ALOA COFFEE LTDA | 42806289000180 |
| 138 | cus_000033196919 | ZAIA CAFES LTDA - Go Coffee - SC Palhoca Pedra Branca | 45561445000189 |
| 139 | cus_000032310053 | FURUCHO, TSUKUMI & CIA CAFETERIA LTDA - Go Coffee - MS Jardim dos Estados | 45522143000100 |
| 140 | cus_000032309907 | SANPA CAFE LTDA - Go Coffee - PR Curitiba Comendador Araujo | 45303268000130 |
| 141 | cus_000032309869 | ALLIANCE CAFETERIA LTDA - Go Coffee - SP Sao Paulo Perdizes | 45492049000147 |
| 142 | cus_000032309785 | CAROL & CATARINA CAFE LTDA - Go Coffee - RJ Recreio dos Bandeirantes | 44818337000186 |
| 143 | cus_000032309773 | CL 706 CAFES LTDA - Go Coffee - DF Brasilia Asa Norte 706 | 44782392000163 |
| 144 | cus_000031968839 | BREADBOX LTDA - Breadbox - Matriz | 48136294000100 |
| 145 | cus_000031243333 | DE GRAO EM GRAO CAFETERIA - Go Coffee Santos | 43796145000153 |
| 146 | cus_000031240626 | GC ICARAI CAFE - Go Coffee - RJ Niteroi Icarai | 44252085000170 |
| 147 | cus_000029920608 | HERR MANN KAFFEE LTDA - Go Coffee - PR Curitiba Bacacheri | 40288652000198 |
| 148 | cus_000029919965 | M & G CAFETERIA LTDA - GC PR Curitiba Pr. Kennedy | 44647830000180 |
| 149 | cus_000028418289 | MDT CAFETERIA E SALGADOS LTDA - Go Coffee - SP Sao Paulo Indianopolis | 43843939000120 |
| 150 | cus_000028417850 | RMAITO CAFETERIA LTDA - Go Coffee Novo Hamburgo | 44140554000160 |
| 151 | cus_000028417648 | BONO LOPES CAFE LTDA - Go Coffee - PR Curitiba Michelangelo | 44052422000186 |
| 152 | cus_000027360657 | MALAGA BATEL SOHO LTDA - Go Coffee - PR Batel Soho | 44524800000187 |
| 153 | cus_000027360584 | FUJIMURA & FUJIMURA LTDA - Go Coffee - GC PR Londrina Norte | 36658313000189 |
| 154 | cus_000027359689 | MOZART ZAPPALA CAFES LTDA - Go Coffee Marajoara | 44297196000101 |
| 155 | cus_000026612167 | AMOR ESPRESSO CAFE LTDA - Amor Espresso Boticario | 33644804000182 |
| 156 | cus_000026473083 | ANDRESON ALVES DA SILVA - Materiais Eletricos | 09582229000156 |
| 157 | cus_000026472903 | NELSON JOSE RIBAS DE PAULA & PAULA LTDA | 03281325000188 |
| 158 | cus_000026472777 | RAMON ROCCA DOS SANTOS | 24045225000122 |
| 159 | cus_000026472748 | OSNI SYDORAK | 15572236000170 |
| 160 | cus_000025192616 | MACARRAO CURITIBA LTDA - Macarrao Curitiba - PR Bigorrilho | 43074826000108 |

---

## Assinaturas Ativas

| Metrica | Valor |
|---------|-------|
| Total de assinaturas | **124** |
| Status | **100% ACTIVE** |
| Valor nominal total | **R$ 134.220,66** |
| **MRR (Receita Mensal Recorrente)** | **R$ 54.593,32** |
| **ARR estimado** | **R$ 655.119,84** |
| Ticket medio mensal | **R$ 440,27** |
| Forma de pagamento | **100% BOLETO** |

### Distribuicao por Ciclo de Cobranca

| Ciclo | Qtd Assinaturas | Valor Nominal Total | MRR Equivalente | % do MRR |
|-------|-----------------|---------------------|-----------------|----------|
| MONTHLY | 105 | R$ 46.954,22 | R$ 46.954,22 | 86,0% |
| SEMIANNUALLY | 2 | R$ 4.402,80 | R$ 733,80 | 1,3% |
| YEARLY | 17 | R$ 82.863,64 | R$ 6.905,30 | 12,7% |
| **Total** | **124** | **R$ 134.220,66** | **R$ 54.593,32** | **100%** |

### Top 15 Clientes por MRR

| # | Cliente | MRR Mensal |
|---|---------|-----------|
| 1 | Macarrao Curitiba - PR Bigorrilho | R$ 1.261,24 |
| 2 | Go Coffee - PR Ed Office Life (LLDUCA) | R$ 1.101,00 |
| 3 | Pomo Pasta Vidal Ramos | R$ 967,79 |
| 4 | Breadbox - Matriz | R$ 800,99 |
| 5 | Cafeteria Vila Izabel - Buona Farina (DAUDT) | R$ 775,02 |
| 6 | Contem Ovo | R$ 744,32 |
| 7 | Pomo Pasta Maringa | R$ 717,60 |
| 8 | Toldo Cafeteria - Matriz II | R$ 712,00 |
| 9 | Macarrao Curitiba - Xaxim | R$ 685,00 |
| 10 | Aloa Coffee | R$ 673,02 |
| 11 | Breadbox - SC Patio Milano | R$ 639,00 |
| 12 | Go Coffee - RS Pelotas | R$ 639,00 |
| 13 | GC PR Curitibano II (Jagher & Kuchla) | R$ 628,00 |
| 14 | Pastelaria da Jo (Via Curitiba) | R$ 628,00 |
| 15 | Go Coffee - RS Quinze de Janeiro | R$ 628,00 |

### Detalhamento Completo das Assinaturas

| # | ID Assinatura | Cliente (ID) | Valor (R$) | Ciclo | Tipo Pag. |
|---|--------------|--------------|-----------|-------|-----------|
| 1 | sub_cmlcfxzo91n3l66m | cus_000168956653 | 428,00 | MONTHLY | BOLETO |
| 2 | sub_2p3u6nn6w1o8oozm | cus_000098010828 | 529,00 | MONTHLY | BOLETO |
| 3 | sub_zdltil8k3hv5gpsb | cus_000095120746 | 529,00 | MONTHLY | BOLETO |
| 4 | sub_tt0wmqx8y58v5dcz | cus_000090095396 | 390,00 | MONTHLY | BOLETO |
| 5 | sub_dys782989ulolde0 | cus_000088319583 | 529,00 | MONTHLY | BOLETO |
| 6 | sub_142zxozvt9mllqlq | cus_000081723816 | 529,00 | MONTHLY | BOLETO |
| 7 | sub_95ifgo8dr6n9izu0 | cus_000083357741 | 390,00 | MONTHLY | BOLETO |
| 8 | sub_emmel0k2i23vnks3 | cus_000081453424 | 628,00 | MONTHLY | BOLETO |
| 9 | sub_1bah0jfmk4obkg9a | cus_000081613680 | 281,00 | MONTHLY | BOLETO |
| 10 | sub_ca8unvi4vijshfbp | cus_000032309869 | 529,00 | MONTHLY | BOLETO |
| 11 | sub_8se7snnraryexy7l | cus_000026472777 | 170,00 | MONTHLY | BOLETO |
| 12 | sub_xlnjh9vqcw7j0drz | cus_000073531989 | 315,00 | MONTHLY | BOLETO |
| 13 | sub_uqfrrcnntnxm6zjw | cus_000026473083 | 118,20 | MONTHLY | BOLETO |
| 14 | sub_yu26zqjz2poi9gzw | cus_000079545298 | 315,00 | MONTHLY | BOLETO |
| 15 | sub_6qgshk7elpikn0xs | cus_000079539052 | 522,00 | MONTHLY | BOLETO |
| 16 | sub_o0nftiotmq1t8ec5 | cus_000155517652 | 281,00 | MONTHLY | BOLETO |
| 17 | sub_yuwnxmrezhdt71fw | cus_000028418289 | 370,02 | MONTHLY | BOLETO |
| 18 | sub_t6qukrh17h18a3w8 | cus_000163614187 | 581,00 | MONTHLY | BOLETO |
| 19 | sub_fplbhfcyw95ogm66 | cus_000127838290 | 390,00 | MONTHLY | BOLETO |
| 20 | sub_22i51dkwe9s9cnf1 | cus_000042019162 | 390,00 | MONTHLY | BOLETO |
| 21 | sub_emfpe4fd9xphbyfu | cus_000114432229 | 529,00 | MONTHLY | BOLETO |
| 22 | sub_chg0lhatrg023txu | cus_000113724870 | 512,68 | MONTHLY | BOLETO |
| 23 | sub_dqtesyggrvrme4xi | cus_000100308272 | 628,00 | MONTHLY | BOLETO |
| 24 | sub_xufjuo7mw6kxewp6 | cus_000100581441 | 529,00 | MONTHLY | BOLETO |
| 25 | sub_bzraso3zqvzaiw4b | cus_000092112863 | 390,00 | MONTHLY | BOLETO |
| 26 | sub_3bywr0c1fxe41tdr | cus_000089801851 | 390,00 | MONTHLY | BOLETO |
| 27 | sub_xpaqrrfg1blaqzq1 | cus_000085163418 | 390,00 | MONTHLY | BOLETO |
| 28 | sub_ypeu3w0gjrvyi6bm | cus_000032309907 | 256,00 | MONTHLY | BOLETO |
| 29 | sub_s200n2imcaayu44c | cus_000061924830 | 685,00 | MONTHLY | BOLETO |
| 30 | sub_jg97xwox4iayduqh | cus_000033196919 | 390,00 | MONTHLY | BOLETO |
| 31 | sub_265p3pl6ds4fyudz | cus_000027360584 | 390,00 | MONTHLY | BOLETO |
| 32 | sub_mrzp3fcud4utpgji | cus_000025192616 | 1.261,24 | MONTHLY | BOLETO |
| 33 | sub_33pjbsc70z5xmisc | cus_000070898345 | 422,00 | MONTHLY | BOLETO |
| 34 | sub_3q1ll506sbpv7dpl | cus_000028417850 | 370,02 | MONTHLY | BOLETO |
| 35 | sub_g9y0dbewjmdyc8se | cus_000028417648 | 486,00 | MONTHLY | BOLETO |
| 36 | sub_gswaso5m8ngtttut | cus_000027360657 | 390,00 | MONTHLY | BOLETO |
| 37 | sub_m3ricfysrhkvo6ey | cus_000032309773 | 529,00 | MONTHLY | BOLETO |
| 38 | sub_k9zg94k6yryauldc | cus_000029920608 | 361,26 | MONTHLY | BOLETO |
| 39 | sub_hp3gp4di62ln4yrl | cus_000029919965 | 273,25 | MONTHLY | BOLETO |
| 40 | sub_5az95sbdo10gszgn | cus_000033915956 | 438,05 | MONTHLY | BOLETO |
| 41 | sub_0ecm5bwe4rv5j10h | cus_000032310053 | 364,36 | MONTHLY | BOLETO |
| 42 | sub_xvzwkkdrso4ejclp | cus_000032309785 | 390,00 | MONTHLY | BOLETO |
| 43 | sub_tml9lnun42iq3ptg | cus_000046389016 | 427,76 | MONTHLY | BOLETO |
| 44 | sub_9eukadk2014p282b | cus_000036440207 | 320,58 | MONTHLY | BOLETO |
| 45 | sub_uwb91fisjj2fgiqo | cus_000034838628 | 429,19 | MONTHLY | BOLETO |
| 46 | sub_d90wasrn0psowebv | cus_000051971164 | 717,60 | MONTHLY | BOLETO |
| 47 | sub_38ih5etz25jf7kq8 | cus_000051969983 | 967,79 | MONTHLY | BOLETO |
| 48 | sub_z54szml2ujb1tbjd | cus_000048143533 | 390,00 | MONTHLY | BOLETO |
| 49 | sub_fyro0eo424x7w9ak | cus_000079381915 | 454,00 | MONTHLY | BOLETO |
| 50 | sub_jphqh5r5onjqzw9b | cus_000079381289 | 390,00 | MONTHLY | BOLETO |
| 51 | sub_gmafu3bi21sdtzxj | cus_000031968839 | 800,99 | MONTHLY | BOLETO |
| 52 | sub_o4i4ityfqa8kum6d | cus_000136397856 | 128,00 | MONTHLY | BOLETO |
| 53 | sub_8rjama9d71mu0xpe | cus_000120774990 | 412,00 | MONTHLY | BOLETO |
| 54 | sub_pmmldniyhp6a5fyo | cus_000120773631 | 273,00 | MONTHLY | BOLETO |
| 55 | sub_36ra2ahwpth12s2l | cus_000100508730 | 2.340,00 | SEMIANNUALLY | BOLETO |
| 56 | sub_vkgcz7fk9jonjuma | cus_000099721795 | 390,00 | MONTHLY | BOLETO |
| 57 | sub_ei8xfrx3spob5xlx | cus_000097999008 | 529,00 | MONTHLY | BOLETO |
| 58 | sub_cl8j9ono2h4prstk | cus_000079382269 | 422,00 | MONTHLY | BOLETO |
| 59 | sub_06zrdgvfellgguqg | cus_000072701012 | 521,00 | MONTHLY | BOLETO |
| 60 | sub_361w0uzwjs6tq9cs | cus_000107956633 | 639,00 | MONTHLY | BOLETO |
| 61 | sub_39umf3w1p4fbmet8 | cus_000107753793 | 628,00 | MONTHLY | BOLETO |
| 62 | sub_ul77fj0zyan55lf3 | cus_000026612167 | 278,70 | MONTHLY | BOLETO |
| 63 | sub_ohwfzc2p87ppxvls | cus_000096064239 | 529,00 | MONTHLY | BOLETO |
| 64 | sub_hqit56tk3hx3on75 | cus_000101837203 | 529,00 | MONTHLY | BOLETO |
| 65 | sub_chsnkfn1qnrl7ydl | cus_000107294773 | 529,00 | MONTHLY | BOLETO |
| 66 | sub_ps7m053u6qauh3ma | cus_000107373082 | 511,00 | MONTHLY | BOLETO |
| 67 | sub_9zbcvzxmtr9k29al | cus_000101934572 | 529,00 | MONTHLY | BOLETO |
| 68 | sub_nla0ni8jjwz5n0ny | cus_000086838815 | 639,00 | MONTHLY | BOLETO |
| 69 | sub_9tj3gfkhlp2pmcc3 | cus_000080678085 | 208,00 | MONTHLY | BOLETO |
| 70 | sub_6lycjhz6p739tvsc | cus_000043467161 | 390,00 | MONTHLY | BOLETO |
| 71 | sub_ps5xjfvhifg7fzkd | cus_000059380439 | 529,00 | MONTHLY | BOLETO |
| 72 | sub_bfaeojuo7uk6hlfs | cus_000046396763 | 529,00 | MONTHLY | BOLETO |
| 73 | sub_84c54ciqs8nyku9s | cus_000039666189 | 390,00 | MONTHLY | BOLETO |
| 74 | sub_3j3ghevuawvwsko1 | cus_000046985587 | 454,19 | MONTHLY | BOLETO |
| 75 | sub_gwb6eqk5nqz6psv2 | cus_000044136851 | 598,24 | MONTHLY | BOLETO |
| 76 | sub_lroletmf4ejcg4ku | cus_000043467525 | 345,04 | MONTHLY | BOLETO |
| 77 | sub_z3rwm5c5i31wsznp | cus_000042018840 | 345,04 | MONTHLY | BOLETO |
| 78 | sub_91yrhhiuxgmhpj2e | cus_000058326694 | 775,02 | MONTHLY | BOLETO |
| 79 | sub_wzv8gvqpc8p6iguc | cus_000057917216 | 390,00 | MONTHLY | BOLETO |
| 80 | sub_tg76nqpun8pvkivw | cus_000052848232 | 529,00 | MONTHLY | BOLETO |
| 81 | sub_4zt56iak1yi91lxl | cus_000079380644 | 433,50 | MONTHLY | BOLETO |
| 82 | sub_hjousy74vphgmjv1 | cus_000075874936 | 315,00 | MONTHLY | BOLETO |
| 83 | sub_yzaw9hw46r5zan6j | cus_000060367790 | 390,00 | MONTHLY | BOLETO |
| 84 | sub_4in5gs5rj1c3syyp | cus_000079382622 | 422,00 | MONTHLY | BOLETO |
| 85 | sub_j12hy4r1tx9nw2e5 | cus_000040782072 | 342,50 | MONTHLY | BOLETO |
| 86 | sub_j6h2mera87vjvnse | cus_000077117408 | 422,00 | MONTHLY | BOLETO |
| 87 | sub_pz0bd0lue1wfxgwq | cus_000128419022 | 502,02 | MONTHLY | BOLETO |
| 88 | sub_3ymfahd0nqqlbo6k | cus_000080610495 | 340,31 | MONTHLY | BOLETO |
| 89 | sub_o2p72reb3h88j3ys | cus_000082195023 | 160,80 | MONTHLY | BOLETO |
| 90 | sub_muvzouj4oiqtfwte | cus_000080187610 | 315,00 | MONTHLY | BOLETO |
| 91 | sub_r8mih9i7epiugbn9 | cus_000073530712 | 422,00 | MONTHLY | BOLETO |
| 92 | sub_n89mas2j2ks03r9f | cus_000129375520 | 128,00 | MONTHLY | BOLETO |
| 93 | sub_2gjqwop96d94olz3 | cus_000106508426 | 529,00 | MONTHLY | BOLETO |
| 94 | sub_esgo8lokysagyc69 | cus_000085843326 | 256,00 | MONTHLY | BOLETO |
| 95 | sub_jlpyddesxhjw4lla | cus_000081969431 | 214,00 | MONTHLY | BOLETO |
| 96 | sub_f9y4opgqtgnwhi8k | cus_000081974475 | 712,00 | MONTHLY | BOLETO |
| 97 | sub_x4kdb16fy9xkjytr | cus_000034005902 | 390,00 | MONTHLY | BOLETO |
| 98 | sub_mhhqtlv5532ldjkt | cus_000079378923 | 422,00 | MONTHLY | BOLETO |
| 99 | sub_4zqw5jz2hzyoeg2o | cus_000052579141 | 529,00 | MONTHLY | BOLETO |
| 100 | sub_b4hxia61x2flyz01 | cus_000042018658 | 358,55 | MONTHLY | BOLETO |
| 101 | sub_o8bvph4ajkppin4p | cus_000038973274 | 501,00 | MONTHLY | BOLETO |
| 102 | sub_ex72bes29dnmwet7 | cus_000061614884 | 256,00 | MONTHLY | BOLETO |
| 103 | sub_702k6is3oln1vtxm | cus_000058893786 | 442,00 | MONTHLY | BOLETO |
| 104 | sub_lpbyo2gwceu2mpdg | cus_000057324923 | 744,32 | MONTHLY | BOLETO |
| 105 | sub_mpgr8o8ydinbfmt8 | cus_000079381995 | 529,00 | MONTHLY | BOLETO |
| 106 | sub_7mq45xlowy5f8fj2 | cus_000066521833 | 422,00 | MONTHLY | BOLETO |
| 107 | sub_r73tvqvs9y9quhqx | cus_000156225071 | 4.720,92 | YEARLY | BOLETO |
| 108 | sub_1ho2snh1btgfmuvw | cus_000122433810 | 4.951,44 | YEARLY | BOLETO |
| 109 | sub_ozwy4yvt59grgqk8 | cus_000091270530 | 6.606,00 | YEARLY | BOLETO |
| 110 | sub_e9kwcqlv83n3hj9y | cus_000146748217 | 6.416,00 | YEARLY | BOLETO |
| 111 | sub_wxjb1m16jtukez4x | cus_000146748217 | 608,52 | YEARLY | BOLETO |
| 112 | sub_l702el1g53d5ici0 | cus_000143566639 | 6.179,72 | YEARLY | BOLETO |
| 113 | sub_9i3e5cyera21qf8x | cus_000139652763 | 4.130,04 | YEARLY | BOLETO |
| 114 | sub_y2t5qo95ltf6i1mf | cus_000137374879 | 4.006,08 | YEARLY | BOLETO |
| 115 | sub_2p4i6kq0hqpllibp | cus_000132015815 | 5.438,16 | YEARLY | BOLETO |
| 116 | sub_3upksl984nl63o73 | cus_000086374739 | 1.235,40 | YEARLY | BOLETO |
| 117 | sub_rqfwz8pqbx1xhnbh | cus_000101836041 | 2.062,80 | SEMIANNUALLY | BOLETO |
| 118 | sub_ehw52i52pogwwnx9 | cus_000049264878 | 7.363,27 | YEARLY | BOLETO |
| 119 | sub_crcikrjbauvqnskn | cus_000033593008 | 8.076,24 | YEARLY | BOLETO |
| 120 | sub_lxaanrn6u73x1bcj | cus_000131235593 | 2.630,08 | YEARLY | BOLETO |
| 121 | sub_paz6cv4fui3p1vm5 | cus_000128468419 | 4.371,24 | YEARLY | BOLETO |
| 122 | sub_n01mwftbvxq1rxi1 | cus_000126312446 | 4.580,53 | YEARLY | BOLETO |
| 123 | sub_bsydvsi60ieagxqh | cus_000091270530 | 6.606,00 | YEARLY | BOLETO |
| 124 | sub_y159c8fi02lrmoit | cus_000083857509 | 4.944,00 | YEARLY | BOLETO |

---

## Cobrancas Marco/2026

| Status | Quantidade | Valor Total (R$) | % do Total |
|--------|-----------|-------------------|-----------|
| RECEIVED | 105 | R$ 44.043,28 | 84,1% |
| CONFIRMED | 16 | R$ 5.680,34 | 10,8% |
| OVERDUE | 7 | R$ 2.636,69 | 5,0% |
| **TOTAL** | **128** | **R$ 52.360,31** | **100%** |

> **Taxa de recebimento marco**: 84,1% recebido, 10,8% confirmado (aguardando compensacao).
> **Taxa de sucesso efetiva (RECEIVED + CONFIRMED)**: 95,0%
> **Taxa de inadimplencia marco**: 5,0%

---

## Cobrancas Abril/2026

| Status | Quantidade | Valor Total (R$) | % do Total |
|--------|-----------|-------------------|-----------|
| PENDING | 99 | R$ 46.290,57 | 85,8% |
| CONFIRMED | 15 | R$ 5.292,22 | 9,8% |
| RECEIVED | 6 | R$ 2.381,14 | 4,4% |
| **TOTAL** | **120** | **R$ 53.963,93** | **100%** |

> **Nota**: Abril ainda esta no inicio (dia 3/30). A maioria das cobrancas esta PENDING, o que e esperado. Nenhuma cobranca de abril esta OVERDUE ainda.

---

## Inadimplencia (Aging)

### Resumo por Faixa de Atraso (referencia: 03/04/2026)

| Faixa de Atraso | Quantidade | Valor Total (R$) | % da Inadimplencia |
|-----------------|-----------|-------------------|-------------------|
| 1-30 dias | 7 | R$ 2.636,69 | 100,0% |
| 31-60 dias | 0 | R$ 0,00 | 0,0% |
| 61-90 dias | 0 | R$ 0,00 | 0,0% |
| >90 dias | 0 | R$ 0,00 | 0,0% |
| **TOTAL** | **7** | **R$ 2.636,69** | **100%** |

### Detalhamento dos Titulos Vencidos

| # | ID Pagamento | Cliente | Valor (R$) | Vencimento | Dias em Atraso |
|---|-------------|---------|-----------|------------|---------------|
| 1 | pay_a5fm58s5m7f8zusq | GO COFFEE LANCHONETE LTDA - Go Coffee - SP Shopping Grand Plaza | R$ 529,00 | 25/03/2026 | 9 dias |
| 2 | pay_on81866gv83uqdbb | VJV COFFEE PRODUTOS ALIMENTICIOS LTDA - Go Coffee - RJ Sao Boaventura | R$ 529,00 | 25/03/2026 | 9 dias |
| 3 | pay_bd8pd6gcjshywggh | TMV CAFETERIA E ALIMENTACAO LTDA - Go Coffee - BA Pituba | R$ 454,19 | 25/03/2026 | 9 dias |
| 4 | pay_vg1acxjkbsxptj4i | AMOR ESPRESSO CAFE LTDA - Amor Espresso - SP Vila Olimpia [filial II] | R$ 412,00 | 30/03/2026 | 4 dias |
| 5 | pay_nq9xbxq3f2dxot4t | AMOR ESPRESSO CAFE LTDA - Amor Espresso Boticario | R$ 278,70 | 27/03/2026 | 7 dias |
| 6 | pay_ejon6wpkfwdh1b5k | AMOR ESPRESSO CAFE LTDA - [FILIAL I] AMOR ESPRESSO CAFE | R$ 273,00 | 30/03/2026 | 4 dias |
| 7 | pay_wcv5ytpiiwradrib | POMO PASTA STORE 03 LTDA - POMO PASTA - Trindade | R$ 160,80 | 20/03/2026 | 14 dias |

### Alertas de Inadimplencia

- **AMOR ESPRESSO CAFE LTDA** possui **3 cobrancas vencidas** (3 filiais/CNPJs diferentes) totalizando **R$ 963,70**. Requer atencao prioritaria como grupo economico.
- **POMO PASTA - Trindade** e o titulo com maior atraso (14 dias).
- Taxa de inadimplencia sobre faturamento marco: **5,0%** (R$ 2.636,69 / R$ 52.360,31)
- Taxa de inadimplencia sobre MRR: **4,8%** (R$ 2.636,69 / R$ 54.593,32)

---

## Fontes Indisponiveis

| Fonte | Status | Dados Esperados | Impacto |
|-------|--------|-----------------|---------|
| **Google Sheets (Banco Inter)** | MCP nao conectado nesta sessao | Extrato bancario, saldo Inter, conciliacao | Sem dados de fluxo de caixa bancario real |
| **Odoo ERP (Nexuz)** | Conectado a base errada (No. Coffee) | Cadastro de clientes ERP, notas fiscais, contas a pagar | Sem visao de custos/despesas, apenas receita via Asaas |
| **Metricas de Churn** | Nao disponivel via API (filtro padrao) | Cancelamentos historicos, taxa de churn | API Asaas nao retorna assinaturas canceladas por padrao |
| **Custos Operacionais** | Nenhuma fonte configurada | DRE, custos fixos/variaveis | Sem fonte de dados de custos |

---

## Relatorio de Qualidade

### Indicadores de Completude

| Dimensao | Status | Completude |
|----------|--------|-----------|
| Saldo Asaas | EXTRAIDO | 100% |
| Clientes (cadastro) | 160/160 extraidos | 100% |
| Assinaturas | 124/124 extraidas | 100% |
| Cobrancas marco/2026 | 128/128 extraidas | 100% |
| Cobrancas abril/2026 | 120/120 extraidas | 100% |
| Inadimplencia (aging) | Calculada dos pagamentos | 100% |
| Extrato bancario (Inter) | Nao disponivel | 0% |
| Dados cadastrais ERP (Odoo) | Nao disponivel | 0% |
| **COMPLETUDE GERAL (Asaas)** | **COMPLETO** | **100%** |
| **COMPLETUDE GERAL (todas fontes)** | **PARCIAL** | **~75%** |

### Indicadores-Chave Extraidos (KPIs)

| KPI | Valor |
|-----|-------|
| **MRR** | **R$ 54.593,32** |
| **ARR estimado** | **R$ 655.119,84** |
| Ticket medio mensal (por assinatura) | R$ 440,27 |
| Clientes cadastrados | 160 |
| Assinaturas ativas | 124 |
| Taxa recebimento marco (RECEIVED+CONFIRMED) | 95,0% |
| Taxa inadimplencia marco | 5,0% |
| Valor total em atraso (OVERDUE) | R$ 2.636,69 |
| Faturamento marco/2026 | R$ 52.360,31 |
| Faturamento previsto abril/2026 | R$ 53.963,93 |
| Saldo Asaas | R$ 0,00 |

### Alertas

| Severidade | Codigo | Descricao |
|------------|--------|-----------|
| ALTO | FIN-001 | Saldo Asaas zerado — verificar se transferencia automatica esta ativa ou se houve saque manual |
| ALTO | FIN-002 | Amor Espresso (3 filiais) concentra R$ 963,70 em inadimplencia — grupo economico em risco |
| MEDIO | FIN-003 | 100% das cobrancas por boleto — migrar parte para PIX/cartao pode reduzir inadimplencia |
| MEDIO | FIN-004 | 36 clientes cadastrados sem assinatura ativa (160 clientes vs 124 assinaturas) — possivel churn nao rastreado |
| INFO | FIN-005 | MRR (R$ 54.593,32) consistente com faturamento mensal (marco R$ 52.360, abril R$ 53.964) |
| INFO | SRC-001 | Google Sheets e Odoo indisponiveis — dados de custos e fluxo de caixa bancario ausentes |

---

*Documento gerado por Diana Dados — Extratora de Dados Financeiros*
*Nexuz Financial Analysis Squad | v1 (re-execucao com API key) | 2026-04-03*
*Completude Asaas: 100% | Completude geral: ~75%*
