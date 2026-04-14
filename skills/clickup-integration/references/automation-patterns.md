# ClickUp Automation Patterns

## The Time-In-Status trap

A common ask is "alert me when a task sits in status X too long." The intuitive first try is to look for a trigger called "Time In Status" — **it doesn't exist as a trigger**. It's a condition.

### Correct pattern for "status stalled" alerts

```yaml
trigger:
  type: scheduled
  frequency: Diariamente    # or Semanalmente, Mensalmente, Anualmente,
                            # Todos os dias da semana, Personalizado
  time: "09:00"
conditions:
  - Status = <target status>
  - Time In Status > <threshold>    # e.g. 48h, 7d
action:
  type: comment
  body: "@<Responsável> <message>"
```

The scheduler fires every day at 09:00, checks each task, and only posts the comment when both conditions match.

## Available trigger types

From the trigger picker dropdown:
- `Tarefa ou subtarefa criada`
- `Alterações de status`
- `Alterações de campo personalizado`
- `A cada...` (scheduled) — **the workhorse for time-based alerts**
- `Comunicação`
- `Datas e horário`
- `Relacionamentos`
- `Ações do usuário`

## Available condition types

From the "Adicionar condição" dropdown:
- Assignee
- Current Date Is
- Custom Field
- Due Date
- O nome da tarefa contém
- Observador
- Priority
- Start Date
- Status
- Tag
- Time Estimate
- **Time In Status** ← not a trigger, a condition
- Tipo de tarefa

## Available action types (partial)

- Adicionar um comentário
- Alterar status
- Definir campo personalizado
- Atribuir responsável
- Remover responsável
- Enviar e-mail
- Criar tarefa
- Arquivar tarefa
- Aplicar modelo

## Patterns that work

### 1. Status-stalled alert (time-based)
Use case: "Leads in Qualified for >48h should ping the sales rep."

```json
{
  "name": "Alerta Qualificado >48h",
  "trigger": {"type":"scheduled","frequency":"Diariamente"},
  "conditions": [
    {"type":"Status","value":"qualificado"},
    {"type":"Time In Status","operator":">","value":"48h"}
  ],
  "action": {
    "type":"comment",
    "body":"@Responsável Lead qualificado há >48h sem avanço."
  }
}
```

### 2. Status-change reaction
Use case: "When a deal moves to Closed Won, set due date and notify CS."

```yaml
trigger: Alterações de status  (from: *, to: "fechado ganho")
action 1: Alterar status → (none, leave)
action 2: Adicionar comentário "@CS Novo cliente, iniciar onboarding."
action 3 (optional): Criar tarefa em outra List (Implantações) com nome copiado
```

### 3. Field-update reaction
Use case: "When CNPJ is filled, move status to Contract Stage."

```yaml
trigger: Alterações de campo personalizado (field: "CNPJ", from: empty, to: not empty)
action: Alterar status → "contrato"
```

### 4. Scheduled + field condition
Use case: "If Payment Confirmed is true and >3 days old and Contract not signed, escalate."

```yaml
trigger: A cada... Diariamente
conditions:
  - Custom Field "Pagamento confirmado" = true
  - Custom Field "Contrato assinado" = false
  - Time In Status "pagamento" > 72h
action: Adicionar comentário "@Gerente escalação"
```

## Anti-patterns

### Don't: use "Status changes" trigger for alerts about stagnant status
That fires once when the task enters the status. It can't fire again "48h later" — that's what the scheduler + Time In Status condition is for.

### Don't: chain 5+ conditions in one automation
Break into two automations. ClickUp evaluates conditions as AND; the UI becomes unreadable past 3, and debugging is painful. Duplicate logic across two automations is cheaper than one unmaintainable one.

### Don't: use @mentions without full names
ClickUp resolves `@Carol` to the first matching user. If a Carol Silva joins later, her notifications will route to the wrong person. Always use `@Carol Oliveira`.

## Writing automation specs for the CLI

Specs are JSON, one per automation, stored in `_opensquad/<squad>/specs/automations/`. The `create-automation.js` template consumes them directly.

File naming: `<NN>-<slug>.json` (e.g., `01-alerta-qualificado-48h.json`) — the numeric prefix controls execution order.

Running one:
```bash
bash skills/clickup-integration/scripts/run-playwright.sh create-automation \
  "$(cat _opensquad/nxz-clickup-setup/specs/automations/01-alerta-qualificado-48h.json)"
```

Running a batch:
```bash
for f in _opensquad/nxz-clickup-setup/specs/automations/*.json; do
  echo "Creating $f..."
  bash skills/clickup-integration/scripts/run-playwright.sh create-automation "$(cat $f)"
  sleep 2
done
```

## Known limitation: converged-ai UI

As of 2026-04, ClickUp's new automation dialog (class prefix `converged-ai-task`) intercepts clicks on the Criar footer button via Angular CDK overlays. The `create-automation.js` template works around this with dispatchEvent and settle delays, but it is not 100% reliable.

**Fallback policy:** if `create-automation.js` fails twice in a row for different specs, stop automating and generate a manual guide (markdown with numbered UI steps + the exact values from each spec). 15 minutes of human clicks beats 2 hours of flaky retries.
