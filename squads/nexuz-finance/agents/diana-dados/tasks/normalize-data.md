---
task: Normalizar e Unificar Dados
order: 4
source: all
agent: diana-dados
---

# Normalizar e Unificar Dados

Consolidar todos os datasets extraídos (Asaas, Sheets, Odoo) em um dataset unificado e normalizado. Realizar validação cruzada entre fontes para garantir integridade e identificar divergências.

---

## Processo

### 1. Inventário de Datasets Disponíveis
- Verificar quais extrações foram concluídas com sucesso
- Registrar fontes disponíveis e indisponíveis (ex: Odoo em modo placeholder)
- Carregar metadados de cada extração (totais, período, timestamps)

### 2. Padronizar Schema
- Unificar campos equivalentes entre fontes:
  - Asaas `customer.name` = Sheets `referencia_cliente` = Odoo `res.partner.name`
  - Asaas `payment.value` = Sheets `pagamento.valor`
  - Asaas `payment.dueDate` = Sheets `titulo.data_vencimento`
- Padronizar tipos:
  - Valores monetários: `decimal(10,2)` em BRL
  - Datas: ISO 8601 (`YYYY-MM-DD`), timezone `America/Sao_Paulo`
  - Status: mapear para vocabulário unificado (PAGO, PENDENTE, VENCIDO, CANCELADO)
  - Identificadores: gerar `cliente_id` unificado (formato `NXZ-XXX`)

### 3. Deduplicar Registros
- Identificar registros duplicados entre fontes usando chaves compostas:
  - Cliente: CNPJ + nome
  - Transação: cliente_id + valor + data_vencimento
- Manter registro mais completo, registrar fonte preferencial

### 4. Validação Cruzada
- **Clientes:** Comparar lista de clientes Asaas vs. Sheets vs. Odoo
  - Sinalizar clientes presentes em uma fonte e ausentes em outra
- **Valores:** Comparar totais por cliente entre Asaas e Sheets
  - Tolerância: R$ 0,01 por transação
  - Divergências acima da tolerância entram no relatório
- **Contagens:** Total de transações Asaas vs. entradas no extrato Sheets
  - Identificar transações sem correspondência

### 5. Gerar Mapa de Clientes Unificado
- Um registro por cliente com dados consolidados de todas as fontes
- Campos: `cliente_id`, `nome`, `cnpj`, `email`, `telefone`, `plano`, `valor_mensal`, `status_assinatura`, `status_pagamento`, `dias_inadimplente`
- Prioridade de dados: Odoo (cadastro) > Asaas (financeiro) > Sheets (bancário)

### 6. Gerar Dataset Final
- Consolidar todas as transações em tabela única
- Adicionar campo `fonte` para rastreabilidade
- Adicionar campo `validacao_cruzada` (confirmado / divergente / sem_correspondencia)
- Ordenar por data_vencimento DESC

### 7. Gerar Relatório de Qualidade
- Métricas de completude por fonte
- Lista de divergências encontradas
- Clientes sem correspondência entre fontes
- Alertas e recomendações

---

## Formato de Output

```
dataset_unificado:
  metadata:
    periodo: {data_inicio} a {data_fim}
    gerado_em: {timestamp}
    fontes: [asaas, sheets, odoo?]
    total_clientes_unificados: N
    total_transacoes: N
    taxa_completude: N%
  clientes: [...]
  transacoes: [...]
  divergencias: [...]
  relatorio_qualidade:
    completude_asaas: N%
    completude_sheets: N%
    completude_odoo: N% | "placeholder"
    total_divergencias: N
    alertas: [...]
```

---

## Exemplo de Output

```
dataset_unificado:
  metadata:
    periodo: 2026-03-01 a 2026-03-31
    gerado_em: 2026-04-01T11:30:00-03:00
    fontes: [asaas, sheets]
    total_clientes_unificados: 159
    total_transacoes: 312
    taxa_completude: 96.8%
  divergencias:
    - cliente_id: NXZ-047
      tipo: valor_divergente
      asaas: 499.90
      sheets: 489.90
      diferenca: 10.00
      obs: "Possível desconto aplicado no banco"
  relatorio_qualidade:
    completude_asaas: 100%
    completude_sheets: 95.5%
    completude_odoo: "placeholder — MCP não configurado"
    total_divergencias: 3
    alertas:
      - "Odoo indisponível — dados cadastrais limitados ao Asaas"
      - "2 clientes no Sheets sem correspondência no Asaas"
```

---

## Criterios de Qualidade

- Taxa de completude geral >= 95%
- Zero registros duplicados no dataset final (verificar por chave composta)
- 100% dos registros com campo `fonte` e `validacao_cruzada` preenchidos
- Todas as divergências documentadas com valores de ambas as fontes
- Mapa de clientes com cobertura >= 98% dos clientes ativos

---

## Condições de Veto

- **Nenhuma fonte disponível:** Se nenhuma extração anterior foi concluída, abortar
- **Completude abaixo de 80%:** Se taxa de completude geral ficar abaixo de 80%, pausar e alertar
- **Divergências massivas:** Se mais de 20% das transações apresentarem divergência, pausar para revisão manual
- **IDs não resolvidos:** Se mais de 10 clientes não puderem ser unificados entre fontes, solicitar mapeamento manual
