# Pipefy — "Campos sincronizados" em connector fields (descoberto 2026-04-22)

Pipefy tem uma feature chamada **"Campos sincronizados"** (ou similar na UI) em connector fields:
ao usar "Criar novo" a partir do connector, campos do NOVO registro podem ser pré-preenchidos
com valores fixos ou copiados de campos do card/registro pai.

## Endpoint

```
PUT https://app.pipefy.com/internal_api/settings/fields/{field_internal_id}
```

- Header obrigatório: `X-CSRF-Token` (Rails-style, vem do meta tag `<meta name="csrf-token">`)
- Cookie de sessão via `credentials: 'include'`
- Content-Type: `application/json`
- Body: envelope JSON:API com `data.attributes`

## Atributos relevantes

Todos os campos do drawer de edição vão em `data.attributes`:

| Atributo | Tipo | Observação |
|---|---|---|
| `label` | string | Nome do campo |
| `description` | string | Descrição abaixo do label |
| `help` | string | Help text (não renderiza no UI por bug) |
| `required` | boolean | Obrigatoriedade |
| `editable` | boolean | |
| `unique` | boolean | |
| `can_connect_multiple_cards` | boolean | Permitir conectar múltiplos |
| `can_create_connected_cards` | boolean | Permitir criar novo |
| `can_search_connected_cards` | boolean | Permitir buscar existentes |
| `custom_validation` | string | Regex |
| `minimal_view` | boolean | |
| `card_synced` | boolean | Sync reverso — updates no target atualizam o source |
| **`own_field_maps_attributes`** | array | **Campos sincronizados — ver abaixo** |

## `own_field_maps_attributes` — o que descobrimos

Array de mapeamentos `{field_id, input_mode, value}`:

```json
"own_field_maps_attributes": [
  {"field_id": "<target_internal_id>", "input_mode": "fixed_value", "value": "<string literal>"},
  {"field_id": "<target_internal_id>", "input_mode": "copy_from", "value": "%{<source_internal_id>}"}
]
```

### Modes

- **`fixed_value`**: `value` é string literal; aplicado sempre no novo registro.
- **`copy_from`**: `value` é template `%{<source_field_id>}` referenciando um campo do card/registro pai; valor copiado no momento da criação.

### Target

- `field_id` = `internal_id` (numérico string) do campo no REGISTRO/CARD DE DESTINO (o que será criado).
- Pode ser campo de tabela (quando connector aponta para Table) ou phase_field (quando aponta para Pipe).

### Source (em `copy_from`)

- `%{<id>}` onde `<id>` = `internal_id` de um campo no card/registro de ORIGEM (onde o connector está hospedado).

## Exemplo real — cascade Cliente do deal → Cliente do contato

Contexto:
- `contatos_do_deal_1` (connector no start form do Pipe Vendas, internal_id `428522757`) → tabela Contatos
- Queremos: ao clicar "Adicionar contato", preencher Status="Ativo" e Cliente = mesmo cliente do deal

Fields envolvidos:
- Deal.`cliente` (start form phase, internal_id `428488620`, connector → Clientes)
- Contatos.`status` (table field, internal_id `428522456`)
- Contatos.`cliente` (table field, internal_id `428522458`, connector → Clientes)

Payload:

```json
{
  "data": {
    "id": "428522757",
    "type": "fields",
    "attributes": {
      "label": "Contatos do deal",
      "required": true,
      "can_create_connected_cards": true,
      "can_connect_multiple_cards": true,
      "can_search_connected_cards": true,
      "own_field_maps_attributes": [
        {"field_id": "428522456", "input_mode": "fixed_value", "value": "Ativo"},
        {"field_id": "428522458", "input_mode": "copy_from", "value": "%{428488620}"}
      ]
    },
    "relationships": {
      "connected_pipe": {"data": {"type": "connected_pipe", "id": "Hwgq9hZN"}},
      "type": {"data": {"type": "field_type", "name": "Connector"}}
    }
  }
}
```

## Replay pattern (reusable)

Mesmo padrão do `bulk-create-automations.js` (Rails CSRF replay):

1. Login via persistent browser profile (`_opensquad/_browser_profile`)
2. Navegar até qualquer página Pipefy logada para obter CSRF token (meta tag)
3. `page.evaluate` executando `fetch()` com:
   - method: `PUT`
   - url: `/internal_api/settings/fields/{internal_id}`
   - headers: `Content-Type`, `X-CSRF-Token`, `Accept: application/vnd.api+json`
   - credentials: `'include'`
   - body: envelope `{data: {id, type, attributes, relationships}}`

## Notas / gotchas

- **PUT, não POST**: é update do próprio field, não create.
- **Envelope JSON:API**: `data: {id, type: "fields", attributes: {...}, relationships: {...}}`. Não aceita payload flat.
- **`attributes` precisa trazer TODOS os atributos atuais do field**, não só os que vão mudar. Pipefy parece fazer full-replace (a GET prévia do field é necessária para preservar o resto).
- **`value` em `copy_from` usa `%{id}` (sintaxe template)**, não `{{id}}` ou `$id`.
- **`options: []`** em connector fields — não passar options (é específico de select/radio).
- **Sem `filter` visível neste save** — o filtro dinâmico cross-field (se existir) deve ser outro atributo ou outro endpoint. Precisa sniff adicional.
