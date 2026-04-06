---
task: Extrair Dados do Asaas
order: 1
source: asaas-api
agent: diana-dados
---

# Extrair Dados do Asaas

Extrair dados financeiros completos da API do Asaas para o período de referência solicitado. A Nexuz utiliza o Asaas como gateway de pagamentos para ~159 clientes B2B de food service.

---

## Processo

### 1. Verificar Conectividade
- Testar acesso à API Asaas via MCP Docs Asaas
- Confirmar que a API Key está ativa e com permissões de leitura
- Registrar timestamp de início da extração

### 2. Extrair Clientes
- Endpoint: `GET /customers`
- Campos: `id`, `name`, `cpfCnpj`, `email`, `phone`, `externalReference`
- Paginar todos os resultados (limit/offset)
- Registrar total de clientes encontrados

### 3. Extrair Assinaturas
- Endpoint: `GET /subscriptions`
- Campos: `id`, `customer`, `value`, `billingType`, `status`, `nextDueDate`, `cycle`
- Filtrar por status: ACTIVE, INACTIVE, EXPIRED
- Associar cada assinatura ao cliente correspondente

### 4. Extrair Cobranças
- Endpoint: `GET /payments`
- Filtrar por `dueDate` dentro do período de referência
- Campos: `id`, `customer`, `value`, `netValue`, `status`, `dueDate`, `paymentDate`, `billingType`
- Status relevantes: CONFIRMED, RECEIVED, OVERDUE, PENDING, REFUNDED

### 5. Mapear Inadimplência
- Filtrar cobranças com status OVERDUE
- Calcular dias de atraso: `hoje - dueDate`
- Agrupar por cliente: total devido, quantidade de cobranças atrasadas
- Classificar: 1-30 dias, 31-60 dias, 61-90 dias, >90 dias

### 6. Validar Extração
- Verificar contagem total de registros por entidade
- Conferir que nenhum campo obrigatório está nulo
- Verificar consistência: toda cobrança tem cliente associado

---

## Formato de Output

```
dataset_asaas:
  metadata:
    fonte: asaas-api
    periodo: {data_inicio} a {data_fim}
    extraido_em: {timestamp}
    total_clientes: N
    total_assinaturas: N
    total_cobrancas: N
  clientes: [...]
  assinaturas: [...]
  cobrancas: [...]
  inadimplencia:
    resumo:
      total_inadimplente_brl: N
      clientes_inadimplentes: N
    detalhamento: [...]
```

---

## Exemplo de Output

```
dataset_asaas:
  metadata:
    fonte: asaas-api
    periodo: 2026-03-01 a 2026-03-31
    extraido_em: 2026-04-01T10:30:00-03:00
    total_clientes: 159
    total_assinaturas: 162
    total_cobrancas: 312
  inadimplencia:
    resumo:
      total_inadimplente_brl: 4298.70
      clientes_inadimplentes: 8
```

---

## Criterios de Qualidade

- Total de clientes extraídos deve ser >= 155 (margem para inativos recentes)
- Toda cobrança deve ter `customer_id` associado e válido
- Valores monetários em BRL com 2 casas decimais
- Datas em formato ISO 8601
- Zero cobranças duplicadas (verificar por `id` único)

---

## Condições de Veto

- **API indisponível:** Se a API retornar erro 5xx em 3 tentativas, abortar e sinalizar
- **Token expirado:** Se retornar 401/403, abortar e solicitar renovação do token
- **Dados incompletos:** Se total de clientes < 100 (muito abaixo do esperado ~159), pausar e alertar
- **Paginação quebrada:** Se offset retornar mesmos dados, abortar para evitar duplicatas
