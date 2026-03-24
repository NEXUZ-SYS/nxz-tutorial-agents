# Como Atualizar o Certificado Digital no NXZ ERP

**Modulo:** Faturamento (nxz_br_nfe)
**Persona:** Gerente de Operacao
**Nivel:** Basico
**Tempo estimado:** 10 minutos

## Objetivo

Ao final deste tutorial, voce sabera como atualizar o certificado digital A1 no NXZ ERP para garantir que a emissao de NF-e (Nota Fiscal Eletronica) e NFC-e (Nota Fiscal de Consumidor Eletronica) continue funcionando sem interrupcoes.

## Pre-requisitos

- [ ] Acesso ao NXZ ERP com perfil de Gerente ou Administrador (permissao de Faturamento)
- [ ] Novo arquivo de certificado digital A1 (formato .pfx ou .p12)
- [ ] Senha do novo certificado, fornecida pela certificadora (ex: Certisign, Serasa, Soluti)
- [ ] O CNPJ do certificado deve corresponder ao CNPJ da empresa cadastrada no sistema

> **Importante:** O certificado digital A1 tem validade de 1 ano. O NXZ ERP exibe um aviso amarelo no topo da tela quando faltam menos de 30 dias para o vencimento. Alem disso, o sistema envia notificacoes por email automaticamente conforme a data de expiracao se aproxima.

## Passo a Passo

### Passo 1: Identifique o aviso de certificado (se houver)

Ao acessar o NXZ ERP, observe se ha um banner amarelo no topo da tela com um aviso sobre o certificado digital. Esse banner aparece automaticamente quando o certificado esta proximo do vencimento (menos de 30 dias) ou ja expirou.

[SCREENSHOT: Tela inicial do NXZ ERP - Banner amarelo de aviso de certificado no topo da tela]

> **Dica:** Se o banner nao aparece, o certificado ainda esta dentro da validade. Mesmo assim, voce pode atualiza-lo preventivamente seguindo os proximos passos.

### Passo 2: Acesse o menu Faturamento

Na barra superior do NXZ ERP, localize e clique no menu **Faturamento** (ou **Contabilidade**, dependendo da configuracao do seu sistema).

[SCREENSHOT: Barra superior do NXZ ERP - Menu Faturamento destacado]

### Passo 3: Abra o assistente de atualizacao de certificado

No menu lateral do Faturamento, localize a opcao **Atualizar Certificado Digital** e clique nela. Isso abrira o assistente (wizard) dedicado para a troca do certificado.

[SCREENSHOT: Menu lateral do Faturamento - Opcao Atualizar Certificado Digital visivel]

### Passo 4: Visualize as informacoes do certificado atual

O assistente exibira as informacoes do certificado atualmente instalado:

- **Status atual:** Valido, Expirado, Senha Invalida ou Nao Carregado
- **Data de expiracao atual:** Ate quando o certificado em uso e valido
- **Informacoes do certificado atual:** Dados do titular (CNPJ, razao social)

Revise essas informacoes antes de prosseguir com a atualizacao.

[SCREENSHOT: Wizard de Atualizar Certificado Digital - Etapa inicial mostrando dados do certificado atual]

### Passo 5: Faca upload do novo certificado

No campo **Arquivo do Certificado**, clique no botao de upload. Uma janela de selecao de arquivo sera aberta no seu computador.

1. Navegue ate a pasta onde voce salvou o novo arquivo .pfx ou .p12
2. Selecione o arquivo do certificado
3. Clique em **Abrir**

[SCREENSHOT: Wizard de certificado - Campo de upload com arquivo selecionado]

> **Atencao:** O sistema validara se o CNPJ do novo certificado corresponde ao CNPJ da empresa cadastrada. Se nao corresponder, um erro sera exibido e o certificado nao sera aceito.

### Passo 6: Informe a senha do novo certificado

No campo **Senha do Certificado**, digite a senha fornecida pela certificadora digital junto com o arquivo do certificado.

[SCREENSHOT: Wizard de certificado - Campo de senha preenchido]

> **Dica:** A senha do certificado e diferente da senha de acesso ao NXZ ERP. Ela foi informada no momento da compra ou renovacao do certificado digital. Caso nao a encontre, entre em contato com a certificadora.

### Passo 7: Valide o novo certificado

Apos preencher o arquivo e a senha, o sistema ira validar o certificado automaticamente. Verifique os campos que serao atualizados:

- **Status do novo certificado:** Deve mostrar **Valido**
- **Data de expiracao:** Mostrara a nova data de validade (geralmente 1 ano a partir da emissao)
- **Informacoes do certificado:** Exibira os dados do titular do novo certificado (CNPJ e razao social)
- **CNPJ do certificado:** Sera extraido automaticamente e comparado com o CNPJ da empresa

[SCREENSHOT: Wizard de certificado - Validacao concluida com status Valido e dados do novo certificado]

> **Atencao:** Se o status mostrar "Senha Invalida", verifique se digitou a senha corretamente. Se mostrar "Desconhecido", o arquivo pode estar corrompido e voce deve solicitar um novo a certificadora.

### Passo 8: Confirme a atualizacao

Clique no botao **Confirmar** (ou **Atualizar**) para aplicar o novo certificado. O sistema substituira o certificado antigo pelo novo.

[SCREENSHOT: Wizard de certificado - Etapa de confirmacao com botao Confirmar destacado]

### Passo 9: Verifique a conclusao

O assistente exibira a tela de conclusao confirmando que o certificado foi atualizado com sucesso. Verifique:

1. O **Status** esta como **Valido**
2. A **Data de Expiracao** mostra a nova data (futura)
3. As **Informacoes** correspondem a sua empresa

[SCREENSHOT: Wizard de certificado - Tela de conclusao com certificado atualizado com sucesso]

### Passo 10: Feche o assistente

Clique em **Fechar** para sair do assistente e retornar ao sistema. O banner amarelo de aviso (se estava visivel) deve desaparecer apos a atualizacao bem-sucedida.

[SCREENSHOT: Tela do NXZ ERP apos atualizacao - Sem banner de aviso de certificado]

## Resumo

Neste tutorial voce aprendeu a:

- Identificar o aviso de certificado proximo do vencimento (banner amarelo)
- Acessar o assistente de atualizacao de certificado digital via menu Faturamento
- Verificar as informacoes do certificado atual
- Fazer upload e validar um novo certificado A1 (.pfx ou .p12)
- Confirmar a atualizacao e verificar o sucesso da operacao

## Solucao de Problemas

| Problema | Causa Provavel | Solucao |
|----------|---------------|---------|
| Status "Senha Invalida" | Senha digitada incorretamente | Verifique a senha com a certificadora |
| Status "Desconhecido" | Arquivo corrompido ou formato invalido | Solicite novo arquivo .pfx/.p12 a certificadora |
| Erro de CNPJ nao correspondente | Certificado de outro CNPJ | Verifique se o certificado e da empresa correta |
| Status "Expirado" apos upload | Certificado adquirido ja vencido | Adquira um certificado com validade futura |
| Banner amarelo persiste apos troca | Cache do navegador | Atualize a pagina (F5) ou saia e entre novamente |
| Erro ao emitir NF-e apos troca | Sessao antiga em cache | Saia e faca login novamente no NXZ ERP |

## Proximos Passos

- **Teste a emissao:** Apos atualizar o certificado, emita uma NF-e ou NFC-e para confirmar que tudo funciona corretamente
- **Configure o ambiente:** Verifique se o campo "Ambiente" esta configurado como "Producao" (e nao "Homologacao") em Configuracoes > Empresas > sua empresa > aba NF-e
- **Atualize os tokens CSC:** Para emissao de NFC-e, verifique se os campos de Token CSC (producao e homologacao) estao preenchidos em Configuracoes > Empresas > sua empresa
- **Agende o proximo vencimento:** Anote a nova data de expiracao e programe a renovacao com 30 dias de antecedencia
