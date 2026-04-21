# Design Decisions — Pipefy Setup Nexuz Vendas

**Data:** 2026-04-20
**Run:** 2026-04-20-162723

## DD-001 — Renomear "Contas" → "Parceiros" com modelo CTI

**Contexto:** O PDD v1.0 especifica uma tabela `Contas` para armazenar empresas-cliente. A Nexuz precisa de um modelo mais abrangente que cubra todos os tipos de relacionamento comercial (clientes, fornecedores, colaboradores PF/PJ).

**Decisão:** Adotar padrão **CTI (Class Table Inheritance)** com 4 tabelas:

- `Parceiros` (abstrata/core) — campos comuns a qualquer parceiro
- `Clientes` (especializada) — campos específicos de relacionamento comercial
- `Fornecedores` (especializada) — campos específicos de aquisição
- `Colaboradores` (especializada) — campos específicos de RH/pagamento

Cada especializada tem um connector field 1:1 apontando para `Parceiros`.

**Motivação:**
- Um mesmo Parceiro pode ter múltiplos papéis (ex.: Maria PJ = colaboradora + fornecedora) — CTI modela isso naturalmente com 2 registros especializados apontando pro mesmo Parceiro.
- Zero nullable desnecessário — cada tabela só tem os campos que fazem sentido para aquele papel.
- Evolução incremental — adicionar novo subtipo (ex.: `Indicadores`) é criar nova tabela sem impacto nas existentes.

**Descartado:** STI (tabela única com discriminador) — inflacionaria a tabela com campos específicos de cada tipo e perderia representação natural de parceiros com múltiplos papéis.

**Trade-off aceito:** Pipefy não tem herança nativa nem constraint de unicidade. Requer padrão de enforcement (ver DD-002).

## DD-002 — Enforcement 1:1 do connector Especializada → Parceiros

**Contexto:** `can_connect_multiples: false` no connector não impede que 2 Clientes apontem para o mesmo Parceiro (limitação Pipefy confirmada).

**Decisão:** Aplicar padrão de enforcement em **2 camadas preventivas + 1 detectiva**:

### Camada 1 — Pre-check client-side (obrigatório)
Qualquer script ou integração que criar registro em tabela especializada deve, ANTES do `createTableRecord`, executar query:
```graphql
{ table(id: $SPECIALIZED_TABLE_ID) {
    table_records(search: { fieldsFilter: [
      { field_id: "parceiro", field_value: $PARCEIRO_ID }
    ]}, first: 1) { edges { node { id } } }
}}
```
Se retornar edge → recusar criação com erro "Parceiro X já tem registro em $tabela".

### Camada 2 — Formula title (sempre ligado)
`title_field` de cada especializada = formula incluindo nome do Parceiro + id do próprio registro. Facilita detecção visual de duplicatas em listagens.

### Camada 3 — Audit diário (detetive)
Automation recorrente (trigger `recurring` daily 06:00) com action `webhook` → serviço externo que varre cada especializada agrupando por `parceiro_connector`. Qualquer grupo count > 1 gera notificação para triagem.

### Opcional — Creation-via-Parceiros (avaliar no Step 04)
Fluxo alternativo: usuários não criam especializadas diretamente, apenas marcam `tags` em `Parceiros`, e automação cria o registro especializado. Decidir no design se a UX justifica o custo de +1 automation job/Cliente criado.

**Rejeitado:** Webhook validator com auto-delete (over-engineering para volume Nexuz).

## DD-003 — Escopo da primeira execução: Parceiros + Clientes

**Decisão:** Criar apenas as 2 tabelas CTI mínimas viáveis para o Pipe Vendas: `Parceiros` (abstrata) + `Clientes` (especializada).

`Fornecedores` e `Colaboradores` ficam documentados no design como expansão futura — mas não são criadas nesta execução.

**Motivação:** O Pipe Vendas só precisa de `Clientes` para funcionar. Criar as 4 tabelas agora adicionaria complexidade sem valor imediato. Quando o negócio precisar de pipes de Compras (Fornecedores) ou RH (Colaboradores), roda-se a squad novamente com escopo expandido.

## DD-004 — Creation livre (não ligar Creation-via-Parceiros)

**Decisão:** Usuários podem criar registros diretamente em `Parceiros` ou em `Clientes`. Não há automação obrigando a criação passar por `Parceiros`.

**Motivação:** Economia de automation jobs (Enterprise = 2.000/mês) e UX mais flexível para vendedores que estão focados em converter leads. O enforcement de duplicidade fica garantido pelas camadas 1 (pre-check client-side) + 3 (audit diário) de DD-002.

**Trade-off aceito:** Vendedor criando um Cliente precisa decidir manualmente se o Parceiro já existe (e vincular) ou criar um novo. Interface do Pipefy resolve isso naturalmente via `can_connect_existing: true` no connector field.

## Implicações downstream

- **Step 04 (Paulo Pipes — design):** incorporar as 4 tabelas CTI no lugar de `Contas`. Desenhar campos de `Parceiros` (core) + `Clientes` (comercial). Especificar connector do Deal no Pipe Vendas apontando para `Clientes` (não `Parceiros`).
- **Step 06 (Caio Configurador):** criar tabelas na ordem `Parceiros` → especializadas. Implementar pre-check no script de criação.
- **Skill update:** adicionar `enforcement-patterns.md` em `skills/pipefy-integration/references/` documentando o padrão CTI + enforcement (reuso em squads futuras).
- **Memória da squad:** salvar em `_memory/memories.md` as decisões como padrão reaproveitável em próximas execuções.
