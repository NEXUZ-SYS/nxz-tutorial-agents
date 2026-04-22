---
execution: inline
agent: squads/nxz-erpnext-setup/agents/interviewer
inputFile: squads/nxz-erpnext-setup/pipeline/data/config-focus.md
outputFile: squads/nxz-erpnext-setup/pipeline/data/interview-data.md
---

# Step 02: Entrevista de Configuração

## Agente responsável
**Ana Analista** (🎙️) — conduz a entrevista usando AskUserQuestion para cada pergunta.

## Context Loading

- `squads/nxz-erpnext-setup/pipeline/data/config-focus.md` — escopo e parâmetros técnicos
- `squads/nxz-erpnext-setup/pipeline/data/scope-selection.md` — escopo do step 00
- `_opensquad/_memory/company.md` — contexto Nexuz (evitar reperguntar)
- `squads/nxz-erpnext-setup/pipeline/data/domain-framework.md` — mapeamento Nexuz → ERPNext

## Instructions

### Process

Ana conduz a entrevista em **blocos temáticos** — confirma o fim de cada bloco antes de passar ao próximo. Ajusta os blocos ao escopo escolhido (step 00):

**Blocos mínimos (sempre aplicáveis):**

**Bloco 1 — Company**
1. Razão social (confirmar de company.md ou corrigir)
2. Abreviação (abbr) para autonaming (3-6 letras, ex: NEXUZ)
3. CNPJ formatado
4. Regime tributário: Simples Nacional / Lucro Presumido / Lucro Real
5. Moeda default (proposta BRL)
6. País (proposta Brazil)

**Bloco 2 — Fiscal Year**
7. Data início do ano fiscal corrente (proposta 2026-01-01)
8. Data fim do ano fiscal corrente (proposta 2026-12-31)

**Bloco 3 — Chart of Accounts**
9. Abordagem para o COA:
   - Template "Brazil - Default COA"
   - Template "Standard"
   - Importar CSV existente (Odoo atual) — precisa caminho do arquivo
   - Construir do zero guiado pela Ana (próximo passo: categorias básicas)

**Blocos adicionais (conforme escopo):**

**Bloco 4 — Master Data** (escopo 2+)
10. Item Groups top-level (ex: Software, Serviço, Hardware)
11. Customer Groups (ex: FS Small, FS Enterprise, Franquia)
12. Supplier Groups (ex: Gateway, Hardware, Infra)
13. Warehouses (ex: Digital default não físico; Matriz física se houver)
14. UOMs customizadas além das default (ex: "Porção", "Kit")
15. Volume inicial esperado (quantos Items / Customers / Suppliers nos primeiros dias)

**Bloco 5 — Users & Roles** (escopo 3+)
16. Usuários iniciais (nome, email, papel desejado)
17. Role Profiles customizados (além dos default) — ex: "AI Team", "Caixa", "Gestor FS"

**Bloco 6 — Customizations** (escopo 3+)
18. Custom Fields desejados — listar (Doctype.campo + tipo)
19. Workflows — listar (Doctype alvo + estados + transições)

**Bloco 7 — Integrations** (escopo 4)
20. Webhooks de saída — listar (evento → URL)
21. Integrações de entrada — listar (fonte, formato, doctype destino)

### Regras de execução

1. **Uma pergunta por turno** — usar AskUserQuestion com 2-4 opções
2. **Toda pergunta tem opção "Usar default + explicação"** quando aplicável
3. **Confirmação entre blocos** — ao fim de cada bloco, resumir o capturado e pedir confirmação
4. **Traduzir jargão** — "Doctype" → "tipo de documento/registro", "Link Field" → "vínculo", etc.
5. **Nunca perguntar o que já está em company.md** — usar como contexto e reconfirmar apenas se sensível (CNPJ, razão social)

## Output Format

```markdown
# Dados da Entrevista de Configuração — ERPNext Nexuz

**Entrevistadora:** Ana Analista
**Data:** {YYYY-MM-DD}
**Escopo selecionado:** {do step 00}
**Sponsor/Respondente:** {nome}

## Bloco 1: Company
- Razão social: ...
- Abbr: ...
- CNPJ: ...
- Regime tributário: ...
- Moeda: BRL
- País: Brazil

## Bloco 2: Fiscal Year
- Início: YYYY-MM-DD
- Fim: YYYY-MM-DD

## Bloco 3: Chart of Accounts
- Abordagem: {template|csv|custom}
- {Se CSV: caminho + preview primeiras linhas}

## Bloco 4: Master Data
- Item Groups: [...]
- Customer Groups: [...]
...

## Bloco 5: Users & Roles
- Usuários: [ {email, nome, roles}, ... ]
- Role Profiles custom: [...]

## Bloco 6: Customizations
- Custom Fields: [ {doctype, fieldname, type, label}, ... ]
- Workflows: [ {doctype, states, transitions}, ... ]

## Bloco 7: Integrations
- Webhooks: [ {doctype_event, url, secret_header_name}, ... ]
- Entradas: [ {source, format, target_doctype}, ... ]

## Observações capturadas
(qualquer texto livre relevante — defaults explícitos do user, itens para próxima run, etc.)
```

## Veto Conditions

1. Algum bloco obrigatório (1-3) ficou incompleto
2. Respostas contraditórias (ex: CNPJ diferente do que está em company.md sem justificativa)
3. Agente não usou AskUserQuestion (fez perguntas como texto aberto)
4. Agente perguntou dados já disponíveis em company.md sem reconfirmação

## Quality Criteria

- [ ] Entrevista em blocos temáticos com confirmação entre blocos
- [ ] Toda pergunta via AskUserQuestion (2-4 opções)
- [ ] Defaults propostos e explicados
- [ ] Jargão ERPNext traduzido
- [ ] Output estruturado sem ambiguidade
- [ ] Dados sensíveis (CNPJ, moeda, fiscal year) reconfirmados
