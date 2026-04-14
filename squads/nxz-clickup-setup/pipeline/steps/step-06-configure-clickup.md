---
execution: inline
agent: squads/nxz-clickup-setup/agents/configurator
inputFile: squads/nxz-clickup-setup/output/workspace-design.md
outputFile: squads/nxz-clickup-setup/output/configuration-log.md
required_skills:
  - clickup-integration
---

# Step 06: Configurar ClickUp via Skill `clickup-integration`

## Skill obrigatória

Este step **exige** a skill `clickup-integration`. Toda interação com o ClickUp
passa por ela — MCP, API v2 ou Playwright CLI. É proibido chamar os backends
diretamente sem consultar a matriz de decisão da skill. Abrir primeiro:

- `skills/clickup-integration/SKILL.md` — fluxo hybrid e matriz de decisão
- `skills/clickup-integration/references/api-v2-recipes.md` — curls por operação
- `skills/clickup-integration/references/playwright-patterns.md` — UI-only ops
- `skills/clickup-integration/references/automation-patterns.md` — padrões de automação (inclui Time-In-Status trap)
- `skills/clickup-integration/references/known-limitations.md` — o que não funciona e por quê

## Context Loading

Além da skill, carregar:
- `squads/nxz-clickup-setup/output/workspace-design.md` — design aprovado
- `squads/nxz-clickup-setup/pipeline/data/config-focus.md` — departamentos e nível de customização
- `squads/nxz-clickup-setup/pipeline/data/anti-patterns.md` — erros comuns

## Instructions

### Pré-flight (obrigatório)
1. Confirmar `.env` carregado com `CLICKUP_API_TOKEN` e `CLICKUP_WORKSPACE_ID`
2. Verificar que o profile Playwright (`_opensquad/_browser_profile/`) não está travado
3. Ler estado atual via **MCP** (`clickup_get_workspace_hierarchy`) — nunca assumir estado vazio

### Processo por departamento
Aplicar a **matriz de decisão da skill** em cada etapa. Referência rápida:

| Operação | Interface |
|---|---|
| Criar Space, Folder, List | **API v2** (ver `api-v2-recipes.md`) |
| Criar/atualizar Task | MCP ou API v2 |
| Custom Statuses | **Playwright CLI** — template `configure-statuses` |
| Custom Fields | **Playwright CLI** — template `create-custom-field` |
| Default task type por List | **Playwright CLI** — template `set-default-task-type` |
| Views com filtro/grouping/sort | **API v2** |
| Automações | **Playwright CLI** — template `create-automation` (ver limitação converged-ai) |
| Validação/leitura de tudo | MCP primeiro, API v2 como fallback |

Fluxo recomendado:
1. **Layer 1 (API v2):** criar Spaces → Folders → Lists
2. **Layer 2 (Playwright CLI):** Statuses (no Folder, Lists herdam) → Custom Fields → Default task types
3. **Layer 3 (API v2):** Views com filtros/grouping usando field IDs do layer 2
4. **Layer 4 (Playwright CLI):** Automações **por último** (dependem de tudo acima e são as mais frágeis)

### Invocação do Playwright CLI

Usar **sempre** o wrapper:
```bash
bash skills/clickup-integration/scripts/run-playwright.sh <template> '<json-args>'
```

Nunca invocar `npx playwright test` diretamente — o wrapper gerencia lock do profile,
credenciais e flags vindas de `config.env` + `.env`. Flags one-off via `-- --flag=valor`.

Specs JSON devem viver em `squads/nxz-clickup-setup/specs/` (não hardcoded no agente).
Nome do arquivo: `<NN>-<slug>.json` — prefixo numérico controla ordem.

### Regras de operação
- **Idempotência:** antes de criar qualquer coisa, checar se já existe via MCP/API. Reexecuções não devem duplicar.
- **Nomes exatos** conforme `workspace-design.md` — não abreviar, não traduzir.
- **Log com timestamp** para cada operação (sucesso/falha/manual-required).
- **Falha → continuar:** uma operação falhada não aborta o departamento. Log e próxima.
- **Converged-ai automation falhou 2x → gerar guia manual** (`phase-X-manual-guide.md`) em vez de insistir. Custo humano (15min) < custo de retry flaky (100k+ tokens).
- **Ao descobrir nova limitação ClickUp**, atualizar `skills/clickup-integration/references/known-limitations.md` com a data.

## Output Format

```markdown
# Log de Configuração ClickUp

## Resumo
- Total de operações: X
- Sucesso: X
- Falha: X
- Manual required: X
- Skill usada: clickup-integration vX.Y.Z

## Departamento: {Nome}

### Space: {nome}
- [✅/❌] Criado em {timestamp} via {API v2 | MCP} — ID: {id}

### Folder: {nome}
- [✅/❌] Criado em {timestamp} via {API v2} — ID: {id}

### List: {nome}
- [✅/❌] Criada via {API v2} — ID: {id}
- Statuses: [✅] configurados via Playwright CLI (template configure-statuses) — {lista}

### Custom Fields
- [✅/❌] {campo}: {tipo} — via Playwright CLI (create-custom-field)

### Default task type
- [✅] {tipo} — via Playwright CLI (set-default-task-type)

### Views
- [✅] {nome} — via API v2 (filter/group/sort)

### Automações
- [✅] {descrição} — via Playwright CLI (create-automation)
- [⚠️ MANUAL] {descrição} — Converged-ai falhou 2x; guia em {arquivo.md}

### OKRs / Goals
- [✅/⚠️] {nome} — {interface usada}
```

## Veto Conditions

1. Agente chamou MCP ClickUp, API v2 ou Playwright diretamente sem seguir a matriz de decisão da skill
2. Playwright CLI invocado sem o wrapper `run-playwright.sh`
3. Nenhuma operação de criação executada (tudo falhou sem fallback)
4. Departamento selecionado completamente omitido
5. Nomes divergem do `workspace-design.md`

## Quality Criteria

- [ ] Skill `clickup-integration` foi carregada antes de qualquer operação
- [ ] Matriz de decisão consultada para cada tipo de operação
- [ ] Cada departamento tem Space, Folders e Lists criados
- [ ] Custom Statuses e Custom Fields configurados via Playwright CLI (não via MCP/API)
- [ ] Automações criadas via template oficial OU guia manual gerado após 2 falhas
- [ ] Log documenta qual interface foi usada em cada operação
- [ ] Descobertas novas refletidas em `known-limitations.md`
