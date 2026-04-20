---
execution: inline
agent: squads/nxz-pipefy-setup/agents/architect
inputFile: squads/nxz-pipefy-setup/output/research-findings.md
outputFile: squads/nxz-pipefy-setup/output/pipe-design.md
---

# Step 04: Design dos Pipes

## Context Loading

- `squads/nxz-pipefy-setup/output/research-findings.md` — Pesquisa sobre API Pipefy
- `squads/nxz-pipefy-setup/pipeline/data/config-focus.md` — Escopo selecionado
- `squads/nxz-pipefy-setup/pipeline/data/anti-patterns.md` — Erros comuns
- `squads/nxz-backoffice-processes/output/2026-04-16-165948/v6/process-design-document.md` — PDD completo
- `squads/nxz-backoffice-processes/output/2026-04-16-165948/v1/pipefy-dossier.md` — Dossiê técnico
- `_opensquad/_memory/company.md` — Contexto Nexuz

## Instructions

### Process
1. Ler o PDD completo (fonte da verdade para o processo)
2. Ler o escopo selecionado no config-focus.md
3. Para CADA componente no escopo, traduzir o PDD em design Pipefy:

   **Pipe Vendas:**
   a. Mapear as 9 etapas do PDD para Phases (incluindo sub-etapas via labels/fields)
   b. Para cada Phase, definir:
      - Campos (do modelo de dados do PDD seção 3)
      - Campos obrigatórios (dos checklists de transição seção 5A)
      - Start Form fields (para intake do lead)
   c. Definir terminal phases: GANHO (done=true) e DESCARTE (done=true)
   d. Mapear automações (seções 6, 10, 14 do PDD → automations)
   e. Mapear SLAs (seção 10 do PDD → late alerts)

   **Pipe Nutrição (se no escopo):**
   a. Mapear as fases do ciclo de nutrição (D+0 → D+67)
   b. Definir connector com Pipe Vendas
   c. Automações de cadência (e-mails D+7, D+15, D+37, D+45)
   d. Descarte automático D+67

   **Databases (se no escopo):**
   a. Database "Contas" com campos da seção 3.1 do PDD
   b. Database "Contatos" com campos da seção 3.2 do PDD
   c. Connector fields para relacionar Deal → Conta → Contatos

   **Pipe Implantação (se no escopo):**
   a. Estrutura básica para receber handoff (seção R38-R40 do PDD)
   b. Connector com Pipe Vendas (cross-pipe)
   c. Automação "Create connected card" no GANHO

4. Gerar diagrama Mermaid da arquitetura completa
5. Gerar spec JSON para cada operação (input para step 06)
6. Estimar quota de automation jobs/mês com base nas cadências

## Output Format

```markdown
# Design Pipefy — Nexuz Vendas

## Arquitetura Geral
(Diagrama Mermaid: pipes, databases, connectors)

## Estimativa de Quota de Automações
- Jobs estimados/mês: X (de 300 no plano Business)
- Detalhamento: ...
- Recomendação de plano: Business / Enterprise

## Pipe: Vendas

### Phases
| # | Nome | done? | Descrição |
...

### Start Form (intake)
| Campo | Tipo | Required | Descrição |
...

### Phase Fields por Phase
#### Phase: Qualificação
| Campo | Tipo | Required | Opções | Descrição |
...

### Automações
| # | Nome | Trigger | Conditions | Actions | Estimativa jobs/mês |
...

### SLAs (Late Alerts)
| Phase | Tempo máximo | Alerta | Ação |
...

### Email Templates
| # | Nome | Trigger | Destinatário | Assunto | Body vars |
...

## Database: Contas
### Fields
| Campo | Tipo | Required | Descrição |
...

## Database: Contatos
### Fields
| Campo | Tipo | Required | Descrição |
...

## Pipe: Nutrição
(mesma estrutura)

## Pipe: Implantação
(mesma estrutura)

## Connectors
| De | Para | Campo | Tipo (1:1/1:N) | Sync rules |
...

## JSON Specs (para Step 06)
Referência: squads/nxz-pipefy-setup/specs/
- 01-databases.json
- 02-pipe-vendas.json
- 03-pipe-nutricao.json
- 04-pipe-implantacao.json
- 05-connectors.json
- 06-automations.json
- 07-email-templates.json
```

## Veto Conditions

1. PDD não foi lido como fonte primária do design
2. Algum componente do escopo selecionado foi omitido
3. Campos obrigatórios dos checklists de transição (seção 5A) não estão marcados como required
4. Automações não cobrem as cadências definidas no PDD (seção 6)
5. Estimativa de quota não foi calculada

## Quality Criteria

- [ ] Cada Phase tem campos mapeados do modelo de dados do PDD
- [ ] Checklists de transição → required fields (gates de progressão)
- [ ] Cadências do PDD → automações com triggers temporais
- [ ] SLAs do PDD → late alerts
- [ ] Motivos de descarte (9 motivos) → dropdown field obrigatório na phase DESCARTE
- [ ] Connector fields definem cardinalidade (1:1 vs 1:N)
- [ ] Estimativa de quota calculada e plano recomendado
- [ ] JSON specs gerados para step 06
- [ ] Diagrama Mermaid da arquitetura
