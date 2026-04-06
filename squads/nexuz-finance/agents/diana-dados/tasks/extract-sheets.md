---
task: Extrair Dados do Google Sheets (Banco Inter)
order: 2
source: google-sheets
agent: diana-dados
---

# Extrair Dados do Google Sheets

Extrair dados financeiros das planilhas Google integradas com o Banco Inter. Essas planilhas contêm o extrato bancário, pagamentos recebidos e títulos a pagar da Nexuz.

---

## Processo

### 1. Identificar Planilhas Ativas
- Localizar as planilhas do período de referência
- Identificar abas relevantes: Extrato, Pagamentos Recebidos, Títulos a Pagar, Reconciliação
- Registrar IDs das planilhas e nomes das abas acessadas

### 2. Extrair Pagamentos Recebidos (Inter)
- Aba: Pagamentos Recebidos / Extrato de Entrada
- Campos: `data`, `descricao`, `valor`, `tipo_pagamento`, `referencia_cliente`
- Filtrar por período de referência
- Incluir todos os tipos: TED, PIX, boleto compensado

### 3. Extrair Títulos a Pagar
- Aba: Títulos a Pagar / Contas a Pagar
- Campos: `data_vencimento`, `fornecedor`, `descricao`, `valor`, `status_pagamento`
- Incluir status: pendente, pago, vencido
- Registrar total de títulos e valor consolidado

### 4. Extrair Entradas de Reconciliação
- Aba: Reconciliação / Conferência
- Campos: `data`, `origem`, `valor_esperado`, `valor_recebido`, `diferenca`, `status`
- Capturar entradas já reconciliadas e pendentes
- Sinalizar diferenças não justificadas

### 5. Extrair Extrato Bancário
- Aba: Extrato Inter
- Campos: `data`, `historico`, `valor`, `tipo` (credito/debito), `saldo`
- Filtrar por período de referência
- Registrar saldo inicial e final do período

### 6. Validar Extração
- Verificar que soma de créditos - débitos = variação de saldo
- Conferir que não há linhas vazias ou mal formatadas
- Validar que datas estão dentro do período solicitado

---

## Formato de Output

```
dataset_sheets:
  metadata:
    fonte: google-sheets-inter
    periodo: {data_inicio} a {data_fim}
    extraido_em: {timestamp}
    planilhas_acessadas: [ids]
    total_pagamentos_recebidos: N
    total_titulos_pagar: N
  pagamentos_recebidos: [...]
  titulos_pagar: [...]
  reconciliacao: [...]
  extrato:
    saldo_inicial: N
    saldo_final: N
    total_creditos: N
    total_debitos: N
```

---

## Exemplo de Output

```
dataset_sheets:
  metadata:
    fonte: google-sheets-inter
    periodo: 2026-03-01 a 2026-03-31
    extraido_em: 2026-04-01T10:45:00-03:00
    total_pagamentos_recebidos: 298
    total_titulos_pagar: 45
  extrato:
    saldo_inicial: 82450.33
    saldo_final: 97812.10
    total_creditos: 48230.77
    total_debitos: 32869.00
```

---

## Criterios de Qualidade

- Todos os valores monetários em BRL com 2 casas decimais
- Soma de créditos - débitos deve bater com variação de saldo (tolerância R$ 0,01)
- Datas em formato ISO 8601, timezone America/Sao_Paulo
- Nenhuma linha com campos obrigatórios nulos (data, valor)
- Referências de cliente devem ser identificáveis para cruzamento com Asaas

---

## Condições de Veto

- **Planilha inacessível:** Se não conseguir ler a planilha após 3 tentativas, abortar e sinalizar
- **Estrutura alterada:** Se colunas esperadas não existirem, pausar e solicitar mapeamento atualizado
- **Saldo inconsistente:** Se créditos - débitos divergir do saldo em mais de R$ 1,00, sinalizar como alerta crítico
- **Período vazio:** Se nenhum registro for encontrado no período, confirmar com usuário antes de prosseguir
