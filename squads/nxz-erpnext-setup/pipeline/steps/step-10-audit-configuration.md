---
execution: inline
agent: squads/nxz-erpnext-setup/agents/reviewer
inputFile: squads/nxz-erpnext-setup/output/configuration-log.md
outputFile: squads/nxz-erpnext-setup/output/audit-report.md
required_skills:
  - erpnext-integration
---

# Step 10: Auditoria da Configuração

## Skill obrigatória

Leitura passa pela skill `erpnext-integration`. Para auditoria usar **REST API exclusivamente** (leitura via `/api/resource/<Doctype>` com filters).

- `skills/erpnext-integration/SKILL.md` — matriz de decisão
- `skills/erpnext-integration/references/rest-recipes.md` — queries de validação

## Context Loading

- `squads/nxz-erpnext-setup/output/configuration-log.md` — log do step 08
- `squads/nxz-erpnext-setup/output/erpnext-design-document.md` — EDD aprovado
- `squads/nxz-erpnext-setup/pipeline/data/interview-data.md` — entrevista original (fonte da verdade)
- `squads/nxz-erpnext-setup/pipeline/data/quality-criteria.md` — critérios de avaliação
- `squads/nxz-erpnext-setup/pipeline/data/anti-patterns.md` — erros comuns

## Instructions

### Pré-flight

1. Smoke test auth (ping + get_logged_user) — se falhar, pausar e alertar user
2. Se 401, o `api_secret` pode ter rotacionado — alertar e não tentar consertar

### Process

1. Ler EDD + log de configuração.
2. Para cada Layer (0-7), query o estado real via REST:
   - Layer 2: `GET /api/resource/Company/<razão social>?fields=["*"]`
   - Layer 3: `GET /api/resource/Account?filters=[["company","=","..."]]&fields=["name","account_type","is_group"]&limit_page_length=0`
   - Layer 4: `GET /api/resource/Item?fields=["name","item_group","stock_uom"]&limit_page_length=0`
   - Layer 5: `GET /api/resource/Custom Field?filters=[["dt","in",[<doctypes>]]]&fields=["*"]&limit_page_length=0`
   - Layer 6: `GET /api/resource/Workflow?fields=["*"]&limit_page_length=0`
   - Layer 7: `GET /api/resource/Webhook?fields=["*"]&limit_page_length=0`
3. Comparar **realidade vs EDD** item a item:
   - Existe? Nome correto? Campos mandatory conforme design? Links válidos?
4. Comparar **realidade vs Entrevista** — flagear deltas não-autorizados (itens que estão na realidade mas não na entrevista nem flagged no EDD).
5. Para cada critério em `quality-criteria.md`, atribuir score 1-10 por layer.
6. Gerar verdict: APPROVE / CONDITIONAL APPROVE / REJECT.
7. Para cada issue, propor **PATCH via curl**:
   ```bash
   curl -X PUT "$BASE/api/resource/<Doctype>/<name>" \
        -H "$HOST_HDR" -H "$AUTH" -H "Content-Type: application/json" \
        -d '{"<fieldname>":"<correct_value>"}'
   ```

## Output Format

```
==============================
 REVIEW VERDICT: {APPROVE/REJECT/CONDITIONAL APPROVE}
==============================

Data: {YYYY-MM-DD}
Skill usada: erpnext-integration v1.0.0
Interface usada: REST API (read-only)
Smoke test auth: ✅/❌

------------------------------
 SCORING TABLE (por Layer)
------------------------------
| Layer | Nome              | Score  | Resumo |
|---|---|---|---|
| 0 | Stack lifecycle     | 10/10 | — |
| 1 | API access + users  | 9/10  | — |
| 2 | Company + Fiscal    | ...   | ... |
| 3 | COA                 | ...   | ... |
| 4 | Master Data         | ...   | ... |
| 5 | Customizations      | ...   | ... |
| 6 | Workflows           | ...   | ... |
| 7 | Integrations        | ...   | ... |

OVERALL: X/10

------------------------------
 CONFORMIDADE COM ENTREVISTA
------------------------------
- Company: campos da entrevista presentes? ✅/❌
- Fiscal Year: datas conforme entrevista? ✅/❌
- COA: abordagem (template/csv/custom) executada? ✅/❌
- Master Data: grupos e items iniciais conforme entrevista? ✅/❌
- Users: usuários criados conforme entrevista? ✅/❌
- Custom Fields: lista conforme entrevista + deltas aprovados? ✅/❌
- Workflows: conforme entrevista? ✅/❌

------------------------------
 DELTAS NÃO-AUTORIZADOS (flag para user)
------------------------------
(itens que existem na realidade mas não estão na entrevista nem aprovados no EDD)
- {doctype}.{name}: motivo? {propor delete via curl}

------------------------------
 PATCHES PROPOSTOS
------------------------------
(para cada issue encontrado)
1. {issue}: {curl PATCH completo}

------------------------------
 PATH TO APPROVAL (se não APPROVE)
------------------------------
(lista acionável de passos)
```

## Veto Conditions

1. Auditoria não fez smoke test de auth antes de iniciar
2. Auditoria só leu o log (não consultou ERPNext real)
3. Chamadas diretas à API sem passar pela skill
4. Algum critério de `quality-criteria.md` omitido
5. Deltas não-autorizados não foram flagged
6. PATCHes propostos não são acionáveis (falta curl ou endpoint)

## Quality Criteria

- [ ] Skill `erpnext-integration` carregada antes de qualquer leitura
- [ ] Smoke test auth passou
- [ ] Todos os critérios de `quality-criteria.md` avaliados
- [ ] Comparação EDD vs realidade feita item a item
- [ ] Conformidade com entrevista verificada
- [ ] Deltas não-autorizados flagged
- [ ] PATCHes propostos com curl completo
