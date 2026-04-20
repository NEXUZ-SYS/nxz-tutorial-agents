---
execution: inline
agent: squads/nxz-pipefy-setup/agents/configurator
inputFile: squads/nxz-pipefy-setup/output/pipe-design.md
outputFile: squads/nxz-pipefy-setup/output/configuration-log.md
required_skills:
  - pipefy-integration
---

# Step 06: Configurar Pipefy via Skill `pipefy-integration`

## Skill obrigatória

Este step **exige** a skill `pipefy-integration`. Toda interação com o Pipefy
passa por ela — GraphQL API ou Playwright CLI. Abrir primeiro:

- `skills/pipefy-integration/SKILL.md` — fluxo hybrid e matriz de decisão
- `skills/pipefy-integration/references/graphql-recipes.md` — mutations/queries
- `skills/pipefy-integration/references/playwright-patterns.md` — UI-only ops
- `skills/pipefy-integration/references/known-limitations.md` — o que não funciona

## Context Loading

- `squads/nxz-pipefy-setup/output/pipe-design.md` — design aprovado
- `squads/nxz-pipefy-setup/pipeline/data/config-focus.md` — escopo e nível
- `squads/nxz-pipefy-setup/specs/` — JSON specs por operação
- `squads/nxz-pipefy-setup/pipeline/data/anti-patterns.md` — erros comuns

## Instructions

### Pré-flight (obrigatório)
1. Confirmar `.env` carregado com `PIPEFY_API_TOKEN` e `PIPEFY_ORGANIZATION_ID`
2. Verificar conectividade com API:
   ```bash
   curl -s 'https://api.pipefy.com/graphql' \
     -H "Authorization: Bearer $PIPEFY_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"query":"{ me { name email } }"}' | jq .
   ```
3. Verificar pipes existentes (nunca assumir estado vazio)
4. Se Playwright necessário, verificar profile não travado

### Processo por camada (ordem obrigatória)

Aplicar a **matriz de decisão da skill** em cada operação:

| Camada | Operação | Interface |
|---|---|---|
| Layer 1 | Databases (Contas, Contatos) | **GraphQL API** |
| Layer 2 | Pipes (Vendas, Nutrição, Implantação) | **GraphQL API** |
| Layer 3 | Phases em cada Pipe | **GraphQL API** |
| Layer 4 | Fields em cada Phase (incluindo Start Form) | **GraphQL API** |
| Layer 5 | Connector Fields (cross-pipe/database) | **GraphQL API** |
| Layer 6 | Automations + Email Templates | **GraphQL API** (fallback: Playwright CLI) |
| Layer 7 | Conditional Fields (visual) | **Playwright CLI** |
| Layer 8 | Dashboards | **Playwright CLI** |

Fluxo recomendado:
1. **Databases primeiro** — Contas e Contatos precisam existir para os connectors
2. **Pipes + Phases** — criar a estrutura esqueleto
3. **Fields** — popular cada phase com campos (capturar IDs retornados)
4. **Connectors** — ligar pipes ↔ databases usando IDs
5. **Automations** — dependem de phase IDs + field IDs
6. **UI-only (se necessário)** — conditional fields, dashboards

### Invocação GraphQL API

Usar curl com jq para todas as chamadas:
```bash
TOKEN=$(grep '^PIPEFY_API_TOKEN=' .env | cut -d= -f2)
ORG_ID=$(grep '^PIPEFY_ORGANIZATION_ID=' .env | cut -d= -f2)

curl -s 'https://api.pipefy.com/graphql' \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { ... }"}' | jq .
```

### Invocação Playwright CLI (UI-only)

```bash
bash skills/pipefy-integration/scripts/run-playwright.sh <template> '<json-args>'
```

### Regras de operação
- **Idempotência:** antes de criar, checar se já existe via query. Reexecuções não duplicam.
- **Nomes exatos** conforme `pipe-design.md` — não abreviar, não traduzir.
- **Capturar IDs** retornados por cada mutation — necessários para operações subsequentes.
- **Log com timestamp** para cada operação (sucesso/falha/manual-required).
- **Falha → continuar:** uma operação falhada não aborta. Log e próxima.
- **Delay entre calls:** 500ms entre mutations para evitar rate limiting.
- **Playwright falhou 2x → gerar guia manual** em vez de insistir.
- **Ao descobrir nova limitação**, atualizar `skills/pipefy-integration/references/known-limitations.md`.

## Output Format

```markdown
# Log de Configuração Pipefy

## Resumo
- Total de operações: X
- Sucesso: X
- Falha: X
- Manual required: X
- Skill usada: pipefy-integration v1.0.0

## IDs Criados (referência rápida)
| Objeto | Nome | ID |
|---|---|---|
| Database | Contas | ... |
| Database | Contatos | ... |
| Pipe | Vendas | ... |
| Pipe | Nutrição | ... |
| Phase | Novo Lead — Inbound | ... |
...

## Layer 1: Databases

### Database: Contas
- [✅/❌] Criado em {timestamp} via GraphQL — ID: {id}
- Fields: ...

### Database: Contatos
- [✅/❌] Criado em {timestamp} via GraphQL — ID: {id}
- Fields: ...

## Layer 2: Pipes
...

## Layer 3: Phases
...

## Layer 4: Fields
...

## Layer 5: Connectors
...

## Layer 6: Automations
- [✅] {nome} — via GraphQL (trigger: {tipo}, action: {tipo})
- [⚠️ MANUAL] {nome} — API insuficiente; guia em {arquivo.md}

## Layer 7: Conditional Fields (se aplicável)
- [✅] {campo} — via Playwright CLI

## Layer 8: Dashboards (se aplicável)
- [✅/⚠️] {nome} — via Playwright CLI
```

## Veto Conditions

1. Agente chamou API ou Playwright sem seguir a matriz de decisão da skill
2. Playwright CLI invocado sem o wrapper `run-playwright.sh`
3. Nenhuma operação de criação executada (tudo falhou sem fallback)
4. IDs não capturados (impossibilita layers subsequentes)
5. Nomes divergem do `pipe-design.md`

## Quality Criteria

- [ ] Skill `pipefy-integration` carregada antes de qualquer operação
- [ ] Matriz de decisão consultada para cada tipo de operação
- [ ] Databases criados ANTES dos pipes (dependência de connectors)
- [ ] Todos os IDs capturados e documentados
- [ ] Automações criadas via API OU guia manual gerado
- [ ] Log documenta qual interface foi usada em cada operação
- [ ] Descobertas novas refletidas em `known-limitations.md`
- [ ] Delay de 500ms entre calls respeitado
