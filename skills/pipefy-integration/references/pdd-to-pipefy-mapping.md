# PDD → Pipefy Mapping Rules

## Mapeamento de conceitos

| PDD (Process Design Document) | Pipefy Object | Notas |
|---|---|---|
| Pipeline/Funil | Pipe | 1 pipe por processo |
| Etapa do funil | Phase | Manter mesmos nomes |
| Sub-etapa de entrada (1A/1B/1C) | Campo "Origem" na Phase 1 | NÃO criar phases separadas |
| Terminal positivo (GANHO) | Phase com `done: true` | Phase final |
| Terminal negativo (DESCARTE) | Phase com `done: true` | Phase final com motivo obrigatório |
| Campo do modelo de dados | Phase Field | Tipos mapeados abaixo |
| Checklist de transição | Required fields na phase | Gates de progressão |
| Cadência (email sequence) | Múltiplas automations com SLA trigger | 1 automação por toque |
| SLA por etapa | Late alert (automation SLA-based) | Em horas |
| Motivos de descarte | Dropdown field (required) | 9 opções fixas |
| Conta (empresa) | Database "Contas" | Master data |
| Contato (pessoa) | Database "Contatos" | N:1 com Contas |
| Deal (oportunidade) | Card no Pipe Vendas | 1:1 com Conta |
| Handoff (cross-departamento) | Connector + automation "create card" | No evento GANHO |
| Dashboard | Dashboard Pipefy | Configurar via UI |
| Marco POD (timestamp) | Campo datetime (auto ou manual) | Registrar transições |

## Mapeamento de tipos de campo

| PDD Tipo | Pipefy Type | Notas |
|---|---|---|
| Texto | `short_text` | Campos curtos (nome, razão social) |
| Texto longo | `long_text` | Campos descritivos (dor central, observação) |
| Monetário (R$) | `currency` | Formato float com ponto decimal |
| Inteiro | `number` | Nº unidades, etc. |
| Booleano | `radio_vertical` com ["Sim","Não"] | Pipefy não tem campo bool nativo |
| Lista/Dropdown | `select` | Opções fixas (Origem, ICP, Motivo) |
| Lista múltipla | `checklist_vertical` | Múltipla seleção (Produtos) |
| Data | `date` | Datas simples |
| Data/hora | `datetime` | Timestamps de marcos |
| Email | `email` | Validação nativa |
| Telefone | `phone` | Validação nativa |
| CNPJ | `cnpj` | **Validação nativa** (14 dígitos) |
| URL | `short_text` | Sem validação nativa de URL |
| Referência (N:1) | `connector` | Connector field |
| Percentual | `number` | Não há tipo % nativo |

## Regras de tradução

### 1. Gates de progressão
Cada checklist de transição do PDD (seção 5A) = conjunto de `required: true` fields
na phase correspondente. O Pipefy bloqueia nativamente a movimentação do card se
algum required field está vazio.

### 2. Campos condicionais
Campos que dependem de valor de outro campo (ex: "Qual concorrente" só se motivo =
"Perdeu pra concorrente") → `createFieldCondition` com action "show/hide".

### 3. Sub-etapas de entrada
As 3 sub-etapas (Inbound, Outbound, Indicação) NÃO viram phases separadas.
Usar 1 phase "Novo Lead" com campo "Origem" (dropdown) para diferenciar.
SLAs diferentes por origem? → automações com conditions no campo Origem.

### 4. Pipe paralelo (Nutrição)
Nutrição é um Pipe SEPARADO, não uma phase no Pipe Vendas.
Conector 1:1 entre Vendas ↔ Nutrição.
Quando lead vai para nutrição: criar card no Pipe Nutrição via automação.

### 5. Transição automática GANHO
Não é "mover automaticamente" por SLA. É: campo "Pagamento confirmado" = true AND
campo "Contrato assinado" = true → mover para phase GANHO.
Usar automation com event_id "field_updated" + conditions AND.

### 6. Descarte automático D+67
SLA de 67 dias (1608 horas) na phase principal do Pipe Nutrição.
Action: mover para phase DESCARTE + update campo "Motivo" = "Nutrição expirada".
