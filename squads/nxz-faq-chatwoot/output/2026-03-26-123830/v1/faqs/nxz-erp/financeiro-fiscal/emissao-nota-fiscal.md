---
produto: NXZ ERP
categoria: financeiro-fiscal
slug: emissao-nota-fiscal
titulo: Como emitir e consultar notas fiscais no NXZ ERP?
versao: 1
gerado_em: 2026-03-26
article_id: null
template: B
tickets_relacionados: 7
---

# Como emitir e consultar notas fiscais no NXZ ERP?

O NXZ ERP emite NFC-e (cupom fiscal eletronico) automaticamente a cada venda no PDV e permite emitir NF-e (nota fiscal de saida) pelo modulo Financeiro/Fiscal.

## Antes de comecar

- O certificado digital (A1) da sua empresa deve estar instalado e valido no sistema.
- Os dados fiscais da empresa (CNPJ, Inscricao Estadual, regime tributario) devem estar configurados.
- A conexao com a SEFAZ deve estar ativa.

## Passo a passo — Emitir NFC-e (automatico no PDV)

1. Ao finalizar uma venda no PDV, o sistema emite a NFC-e automaticamente.
2. O cupom fiscal e impresso na impressora termica configurada.
3. Se a SEFAZ estiver fora do ar, o sistema opera em **modo contingencia** e envia as notas assim que a conexao retornar.

## Passo a passo — Emitir NF-e (nota fiscal avulsa)

1. Acesse o modulo **Faturamento** ou **Fiscal** no menu principal.
2. Clique em **Nova Nota Fiscal**.
3. Preencha os dados do destinatario (CNPJ ou CPF, nome, endereco).
4. Adicione os produtos e valores.
5. Revise os impostos calculados automaticamente pelo sistema.
6. Clique em **Emitir**. O sistema enviara a nota para a SEFAZ.
7. Apos autorizacao, o XML e o DANFE ficam disponiveis para download.

## Passo a passo — Consultar e exportar XMLs

1. Acesse **Fiscal > Notas Fiscais Emitidas**.
2. Use os filtros de data para localizar o periodo desejado.
3. Para exportar: selecione as notas e clique em **Exportar XMLs**.
4. O sistema gera um arquivo ZIP com todos os XMLs do periodo selecionado.

## Problemas comuns

- **"A nota ficou como rascunho":** A nota nao foi transmitida para a SEFAZ. Verifique se o certificado digital esta valido e se ha conexao com a internet. Clique em **Reenviar**.
- **"Preciso cancelar uma nota emitida":** O cancelamento e possivel em ate 24 horas apos a emissao. Acesse a nota e clique em **Cancelar**. Informe o motivo.
- **"A contabilidade nao recebeu os XMLs":** Verifique se o e-mail da contabilidade esta cadastrado em **Configuracoes > Fiscal > E-mail automatico de XMLs**.

**Ainda precisa de ajuda?** Fale com nosso suporte pelo WhatsApp.
