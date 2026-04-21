# Pipefy — Pipe Customization Defaults (Nexuz Standard)

> Padrão de personalização obrigatório ao criar qualquer Pipe novo na org Nexuz.
> Descoberto e validado em 2026-04-20 (Pipe Vendas setup).

## Checklist de personalização (ordem recomendada)

Aplicar IMEDIATAMENTE após `createPipe` + cleanup das 3 phases default:

### 1. API (via `updatePipe`)

```graphql
mutation {
  updatePipe(input: {
    id: "$PIPE_ID",
    name: "<Nome do Processo>",       # ex.: "Vendas", "Implantação", "Suporte"
    noun: "<item singular>",           # ex.: "oportunidade", "onboarding", "chamado"
    icon: "<icon-slug>",               # sales/rocket/support/etc
    color: "<color>",                  # red/blue/green/etc
    expiration_time_by_unit: 60,       # opcional, minutos default por card
    expiration_unit: 0                 # 0=min, 1=horas, 2=dias
  }) { pipe { id noun } }
}
```

**Catálogo de `noun` Nexuz:**

| Processo | noun | create_card_label (UI-only) |
|---|---|---|
| Vendas | oportunidade | "Nova oportunidade" |
| Nutrição | lead em nutrição | "Novo lead em nutrição" |
| Implantação | onboarding | "Novo onboarding" |
| Suporte | chamado | "Novo chamado" |
| Contratos | contrato | "Novo contrato" |
| Compras | pedido de compra | "Novo pedido" |
| Financeiro | pendência | "Nova pendência" |
| RH — Recrutamento | vaga | "Nova vaga" |
| RH — Admissão | admissão | "Nova admissão" |
| Incidentes | incidente | "Novo incidente" |

### 2. Auto-detectado pelo Pipefy (não precisa setar)

- `title_field` — primeiro `short_text` required do Start Form vira title automaticamente. **Sempre ordenar campos para que "Título do <item>" seja o primeiro do Start Form.**

### 3. UI-only — automatizar via Playwright CLI (recomendado)

Esses campos NÃO são aceitos pela GraphQL API. Use o template **`customize-pipe-settings`** da skill:

```bash
bash skills/pipefy-integration/scripts/run-playwright.sh \
  customize-pipe-settings \
  '{"pipe_id":"307117441","button_text":"Nova oportunidade"}'
```

**Args aceitos** (todos opcionais; seta o que for fornecido):
- `pipe_id` (required) — ID do pipe
- `button_text` — valor de `create_card_label` ("Texto do botão de criar cards")
- `description` — conteúdo de `pipe.description` (aceita markdown)

**O que o template faz:**
1. Abre browser com perfil persistente (`_opensquad/_browser_profile`)
2. Navega para `/pipes/{id}/settings` (modal drawer com tabs)
3. Se não logado: auto-login 2-step usando `PIPEFY_EMAIL` + `PIPEFY_PASSWORD` do `.env`
4. Clica na tab **"Configurações do pipe"** (5ª tab do drawer)
5. Localiza os inputs por label em português e preenche
6. Auto-save on blur (Pipefy salva ao desfocar o input)

**Navegação / selectors validados (2026-04-20):**
- Login: `getByRole('textbox', { name: /email|username/i })` → botão "Continue" → `input[type="password"]` → botão "Log in"
- Settings modal: URL `/pipes/{id}/settings`
- Tab: `getByRole('tab', { name: /Configurações do pipe/i })`
- Button text field: label "Texto do botão de criar cards" (findInputByLabelText helper)

**Campos UI-only que ainda precisam de manual (templates a criar):**

| Campo | Onde no UI | Template disponível? |
|---|---|---|
| `create_card_label` ("Texto do botão") | Configurações do pipe | ✅ `customize-pipe-settings` |
| `pipe.description` ("Descrição") | Configurações do pipe | ✅ `customize-pipe-settings` (arg `description`) |
| URL do formulário público | Formulário → Modo Público | ⏳ TODO: `enable-public-form` |
| Cores/logo do form público | Formulário → Visual | ⏳ TODO: parte de `enable-public-form` |
| Dashboards / Painéis | Tab "Painéis" | ⏳ TODO: `create-dashboard` |
| Conditional Fields visuais | Formulário → Condicionais | ⏳ TODO: `configure-conditional-fields` |

#### Template de descrição do pipe (para colar no UI)

```markdown
**<Nome do Pipe>** — <1 frase descrevendo o processo>.

Funil com <N> phases: Phase1 → Phase2 → ... → Terminal.

<Modelo de dados: tabelas conectadas via connectors>.

📖 [Playbook <Processo> Nexuz — completo](https://docs.google.com/document/d/<DOC-ID>/edit) — processo, cadências, SLAs, motivos, handoff.
```

### 4. Gênero gramatical no `create_card_label`

**Português exige concordância manual** (Pipefy não detecta):
- Masculino: "Novo chamado", "Novo onboarding", "Novo pedido"
- Feminino: "Nova oportunidade", "Nova admissão", "Nova vaga"

⚠️ Sempre revisar no UI após setar `noun`. O default "Criar novo card" continua ativo até ser sobrescrito manualmente.

## Campo `preferences` (RepoPreferenceInput)

```graphql
preferences: {
  findable: true,           # aparece em busca global
  inboxEmailEnabled: false, # ativar se quiser criar cards via email
  mainTabViews: "kanban"    # kanban | calendar | list | report
}
```

## Anti-patterns

| Fazer ❌ | Fazer ✅ |
|---|---|
| Criar pipe e deixar `noun: "cards"` default | Sempre setar `noun` conforme tabela acima |
| Nome de pipe genérico ("Processo 1", "Novo") | Nome do processo de negócio ("Vendas", "Suporte") |
| Criar sem setar icon/color | Definir icon semântico + cor brand |
| Esquecer de limpar 3 phases default (Caixa de entrada, Fazendo, Concluído) | Sempre deletar após createPipe |
| Deixar `create_card_label` como "Criar novo card" | Customizar manualmente no UI para "Nova(o) <noun>" |

## Fluxo de criação completo (API + Playwright)

```python
# 1. Create via API
pipe = create_pipe(name="Vendas", icon="sales", phases=[...], labels=[...])

# 2. Clean default phases (sempre após createPipe)
for default_phase in ["Caixa de entrada", "Fazendo", "Concluído"]:
    delete_phase(find_by_name(default_phase))

# 3. API-customizable settings
update_pipe(id=pipe.id, name="Vendas", noun="oportunidade", color="red")

# 4. Create start form + phase fields (Título do <item> como primeiro)
# ... createPhaseField loops ...

# 5. UI-only customization via Playwright CLI (agora automatizado!)
import subprocess, json
subprocess.run([
    "bash", "skills/pipefy-integration/scripts/run-playwright.sh",
    "customize-pipe-settings",
    json.dumps({
        "pipe_id": pipe.id,
        "button_text": "Nova oportunidade",  # gender agreement manual
        "description": "**Pipe Vendas Nexuz** — ...\n\n📖 [Playbook](https://...)",
    })
], check=True)

# 6. Done! Verify:
assert query_pipe(pipe.id).create_card_label == "Nova oportunidade"
```

## Referências

- Descoberta empírica durante Pipe Vendas Nexuz setup (2026-04-20)
- `known-limitations.md` itens 1m (pipe.description read-only) e este arquivo
