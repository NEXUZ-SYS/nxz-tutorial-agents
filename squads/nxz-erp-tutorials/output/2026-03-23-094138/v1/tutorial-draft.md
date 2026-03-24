# Como Abrir e Fechar uma Sessao do Ponto de Venda

**Modulo:** Ponto de Venda (PDV)
**Persona:** Operador de Caixa
**Nivel:** Basico
**Tempo estimado:** 10 minutos

## Objetivo

Ao final deste tutorial, voce sabera como iniciar uma nova sessao do Ponto de Venda, informar o saldo inicial do caixa, e fechar a sessao ao final do expediente com a contagem de caixa correta.

## Pre-requisitos

- [ ] Acesso ao sistema NXZ ERP com usuario e senha
- [ ] Permissao do grupo Ponto de Venda (perfil de Usuario ou Gerente)
- [ ] Um Ponto de Venda configurado e atribuido ao seu usuario (ex: Caixa 01)
- [ ] Nenhuma outra sessao aberta no mesmo PDV ou com o mesmo usuario

## Passo a Passo

### Parte 1: Abrir uma Sessao

#### Passo 1: Acesse o modulo Ponto de Venda

No menu lateral esquerdo do NXZ ERP, clique em **Ponto de Venda**.

O sistema exibe o **Painel**, que mostra os pontos de venda disponiveis como cartoes. Cada cartao exibe o nome do PDV, o status da sessao, o operador responsavel e a data do ultimo fechamento.

[SCREENSHOT: Painel do Ponto de Venda - Menu lateral com Ponto de Venda selecionado - Cartoes dos PDVs visiveis]

#### Passo 2: Inicie uma nova sessao

Localize o cartao do PDV que voce deseja operar (ex: **Caixa 01**).

Clique no botao **Nova Sessao** no cartao.

[SCREENSHOT: Painel do Ponto de Venda - Cartao do PDV com botao Nova Sessao destacado]

> **Dica:** Se o cartao mostrar o botao **Abrir Sessao** em vez de **Nova Sessao**, significa que uma sessao ja foi criada e esta aguardando a definicao do saldo inicial. Clique em **Abrir Sessao** para continuar.

#### Passo 3: Informe o saldo inicial do caixa

O sistema abre o formulario da sessao no estado **Controle de Abertura**.

Clique no botao **Definir Saldo Inicial** na area de botoes do formulario.

[SCREENSHOT: Formulario da Sessao - Estado Controle de Abertura - Botao Definir Saldo Inicial destacado]

#### Passo 4: Faca a contagem de notas e moedas

Uma janela popup de **Controle de Caixa** sera exibida.

Para cada tipo de nota ou moeda presente no caixa, preencha a coluna **Quantidade** com o numero de unidades. O sistema calcula o **Subtotal** automaticamente.

Apos preencher todas as linhas, clique em **Confirmar**.

[SCREENSHOT: Popup de Controle de Caixa - Linhas de contagem com valores e quantidades preenchidos - Botao Confirmar visivel]

> **Dica:** Se o caixa estiver vazio (inicio do dia sem troco), voce pode deixar todas as quantidades em zero e confirmar.

#### Passo 5: Abra a sessao

De volta ao formulario da sessao, verifique o valor do **Saldo Inicial** exibido.

Clique no botao **Abrir Sessao** no topo do formulario.

[SCREENSHOT: Formulario da Sessao - Saldo inicial preenchido - Botao Abrir Sessao destacado]

#### Passo 6: Acesse a interface de vendas

A sessao agora esta no estado **Em Andamento**.

Clique no botao **Continuar Vendendo** para abrir a interface de vendas do PDV, onde voce pode registrar pedidos e processar pagamentos.

[SCREENSHOT: Formulario da Sessao - Estado Em Andamento - Botao Continuar Vendendo destacado]

> **Dica:** Voce pode voltar ao Painel a qualquer momento e clicar em **Continuar Vendendo** no cartao do PDV para retornar a interface de vendas.

---

### Parte 2: Fechar uma Sessao

#### Passo 7: Acesse o formulario da sessao

No **Painel** do Ponto de Venda, localize o cartao do PDV com a sessao ativa (o status mostra **Em Andamento**).

Clique no botao **Fechar** no cartao.

[SCREENSHOT: Painel do Ponto de Venda - Cartao do PDV com status Em Andamento - Botao Fechar destacado]

#### Passo 8: Inicie o encerramento da sessao

No formulario da sessao, clique no botao **Encerrar Sessao** no topo.

A sessao muda para o estado **Controle de Fechamento**.

[SCREENSHOT: Formulario da Sessao - Estado Em Andamento - Botao Encerrar Sessao destacado]

#### Passo 9: Informe o saldo final do caixa

Clique no botao **Definir Saldo Final** na area de botoes do formulario.

[SCREENSHOT: Formulario da Sessao - Estado Controle de Fechamento - Botao Definir Saldo Final destacado]

#### Passo 10: Faca a contagem final de notas e moedas

Na janela popup de **Controle de Caixa**, preencha a **Quantidade** de cada nota e moeda presente no caixa neste momento.

Clique em **Confirmar**.

[SCREENSHOT: Popup de Controle de Caixa - Contagem de fechamento preenchida - Botao Confirmar visivel]

#### Passo 11: Verifique os valores e valide o fechamento

De volta ao formulario, confira os seguintes valores na secao de resumo financeiro:

- **Saldo Teorico de Fechamento**: valor calculado pelo sistema (saldo inicial + vendas em dinheiro)
- **Saldo Real de Fechamento**: valor que voce informou na contagem
- **Diferenca**: diferenca entre o teorico e o real

Clique no botao **Validar Fechamento e Contabilizar**.

[SCREENSHOT: Formulario da Sessao - Resumo financeiro com saldo teorico, saldo real e diferenca - Botao Validar Fechamento e Contabilizar destacado]

> **Alerta:** Se a diferenca entre o saldo teorico e o real for muito alta, o sistema pode bloquear o fechamento. Nesse caso, procure o gerente do PDV para autorizar o fechamento.

#### Passo 12: Sessao encerrada

O sistema confirma todos os pedidos, reconcilia os pagamentos e contabiliza os lancamentos financeiros. A sessao muda para o estado **Fechada e Contabilizada**.

Voce sera redirecionado ao **Painel**, que agora exibe a data do ultimo fechamento e o saldo de caixa final no cartao do PDV.

[SCREENSHOT: Painel do Ponto de Venda - Apos fechamento - Data do ultimo fechamento e saldo visivel no cartao]

## Resumo

Neste tutorial, voce aprendeu a:

- Acessar o modulo Ponto de Venda pelo menu lateral
- Iniciar uma nova sessao do PDV a partir do Painel
- Informar o saldo inicial do caixa usando a contagem de notas e moedas
- Abrir a sessao e acessar a interface de vendas
- Iniciar o fechamento da sessao ao final do expediente
- Informar o saldo final do caixa
- Verificar a diferenca entre o saldo teorico e real
- Validar o fechamento e contabilizar a sessao

## Proximos Passos

- **Registrar vendas no PDV**: aprenda a usar a interface de vendas para registrar pedidos e processar pagamentos
- **Entrada e saida de dinheiro**: como registrar suprimentos (entrada) e sangrias (saida) durante a sessao
- **Relatorio de fechamento**: como acessar e imprimir o relatorio Z de fechamento do caixa
