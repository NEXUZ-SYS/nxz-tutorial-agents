---
name: clickup-integration
description: Automate ClickUp workspace configuration using a hybrid approach — ClickUp MCP for reads, API v2 for hierarchy creation, and Playwright CLI (headed scripts) for UI-only operations like Custom Statuses, Custom Fields, and Automations. Use when the user needs to create or configure ClickUp Spaces, Folders, Lists, Statuses, Fields, Views, or Automations end-to-end, or needs to recover from API limitations where the docs say "yes" but the endpoint silently ignores the write.
type: hybrid
version: 2.0.0
categories:
  - clickup
  - productivity
  - project-management
env:
  - CLICKUP_API_TOKEN
  - CLICKUP_WORKSPACE_ID
mcp:
  server_name: clickup
  command: npx
  args: ["-y", "@taazkareem/clickup-mcp-server"]
  transport: stdio
script:
  path: scripts/run-playwright.sh
  runtime: bash
  dependencies:
    - "@playwright/test"
  invoke: bash scripts/run-playwright.sh {template} {args_json}
---

# ClickUp Integration — Hybrid (MCP + API v2 + Playwright CLI)

## The core problem

ClickUp has three interfaces, none complete on its own:
- **MCP server** — great for reads, cannot create Spaces or statuses
- **API v2** — can create hierarchy, **cannot** create/modify Custom Statuses, Custom Fields, or Automations
- **Browser UI** — can do anything a human can, including the things the APIs refuse

This skill tells you exactly which interface to use for each job, so you don't waste cycles hitting silent failures (200 OK but nothing changes) or dead endpoints.

A key learning from the NXZ squad (2026-04): ClickUp recently rolled out a "converged-ai" automation UI that replaces the classic automation builder in many workspaces. This breaks Playwright MCP interactions because the new dialog uses Angular CDK overlays (`cdk-overlay-connected-position-bounding-box`) that intercept clicks made via the Playwright MCP session. **The reliable path for Automations is now Playwright CLI (`@playwright/test`) run as a standalone subprocess**, not the Playwright MCP server. For Statuses and Fields the MCP-driven browser still works because those panels haven't been migrated to the new UI yet.

## Decision matrix — which tool for what

| Operation | ClickUp MCP | API v2 (curl) | Playwright CLI |
|---|---|---|---|
| Read workspace hierarchy | ✅ first choice | ✅ fallback | — |
| Get list/folder/task details | ✅ | ✅ | — |
| Create Space | ❌ | ✅ first choice | last resort |
| Create Folder | ❌ | ✅ | last resort |
| Create List | ✅ | ✅ | last resort |
| Create/update Task | ✅ | ✅ | — |
| **Custom Statuses** | ❌ | ❌ | ✅ **only way** |
| **Custom Fields** (create) | ❌ | ❌ | ✅ **only way** |
| Custom Fields (read) | ✅ | ✅ | — |
| Views (create + filter/group/sort) | ❌ | ✅ first choice | fallback |
| **Automations** | ❌ | ❌ | ✅ **only way** (but flaky — see known limitations) |
| Relationships between Lists | ❌ | ✅ | — |
| Default task type per List | ❌ | ❌ (GET returns null) | ✅ only way |

**Rule of thumb:** MCP for reads, API v2 for structural writes, Playwright CLI for anything the UI owns exclusively.

## When to use this skill

Activate whenever the user wants to:
- Configure a ClickUp workspace (Spaces, Folders, Lists, Statuses, Fields, Views, Automations)
- Recover from "the ClickUp API docs say this works but it doesn't"
- Operationalize a process template (CRM, content pipeline, support queue) in ClickUp
- Bulk-edit or audit existing workspace structure

## Prerequisites — credentials

ClickUp requires a Personal API Token. First run should verify `.env` has:

```
CLICKUP_API_TOKEN=pk_XXXXXXX_XXXXXXXXXXXXXXXXXXXXX
CLICKUP_WORKSPACE_ID=XXXXXXX
```

Load in shell:
```bash
TOKEN=$(grep '^CLICKUP_API_TOKEN=' .env | cut -d= -f2)
WORKSPACE=$(grep '^CLICKUP_WORKSPACE_ID=' .env | cut -d= -f2)
```

If missing, ask the user for the token (Settings → Apps → API Token in ClickUp) and the workspace ID (it's in every ClickUp URL: `app.clickup.com/<WORKSPACE_ID>/...`).

## Core workflows

### 1. Read state (MCP first)

Before creating anything, know what exists. The MCP server handles this best:
- `clickup_get_workspace_hierarchy` — tree of all Spaces/Folders/Lists
- `clickup_get_list` / `clickup_get_folder` — details including statuses
- `clickup_get_custom_fields` — field definitions per list

If the MCP returns 0 items for something you know exists (a known inconsistency), fall back to API v2:
```bash
curl -s "https://api.clickup.com/api/v2/team/$WORKSPACE/space?archived=false" \
  -H "Authorization: $TOKEN" | jq '.spaces[] | {id, name}'
```

### 2. Create hierarchy (API v2)

Spaces and Folders can only be created via API. See `references/api-v2-recipes.md` for full curl snippets. Key pattern:

```bash
# Space
curl -X POST "https://api.clickup.com/api/v2/team/$WORKSPACE/space" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Vendas", "multiple_assignees": true, "features": {...}}'

# Folder inside a Space
curl -X POST "https://api.clickup.com/api/v2/space/$SPACE_ID/folder" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "CRM"}'

# List inside a Folder
curl -X POST "https://api.clickup.com/api/v2/folder/$FOLDER_ID/list" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Leads & Deals"}'
```

Always capture the returned `id` — you'll pass it to downstream steps.

### 3. Configure Statuses, Fields, Automations (Playwright CLI)

These UI-only operations run as standalone Playwright scripts, not through the Playwright MCP. The MCP approach (taking snapshots, clicking refs) has three problems:
- ClickUp's Angular CDK overlays reappear after each click and intercept the next one
- The "converged-ai" automation dialog closes on portal-level click events
- Each MCP snapshot burns ~1-2k tokens; complex flows burn 100k+ tokens for work a CLI script does in 30s

Instead, use `scripts/run-playwright.sh` which runs a pre-written JS test from `scripts/templates/`. Templates are idempotent (check current state before acting), use the persistent browser profile at `_opensquad/_browser_profile/`, and run headed so the user can watch and intervene.

Available templates (extend as you learn more patterns):
- `scripts/templates/login.js` — first-time auth, caches session
- `scripts/templates/configure-statuses.js` — rename/add/save custom statuses on a Folder or List
- `scripts/templates/create-automation.js` — build one automation from a JSON spec
- `scripts/templates/create-custom-field.js` — add a custom field to a List
- `scripts/templates/set-default-task-type.js` — right-click a List → change default type

Invocation:
```bash
bash skills/clickup-integration/scripts/run-playwright.sh \
  configure-statuses \
  '{"folder_id":"90178149765","statuses":[{"name":"Backlog","color":"Cinza","type":"active"}, ...]}'
```

### Tuning Playwright execution

No flags are hard-coded in the runner. All Playwright parameters come from configuration files and are overridable at any level. Resolution order (later wins):

1. **Skill defaults** — `skills/clickup-integration/config.env` ships with `PLAYWRIGHT_FLAGS="--workers=1 --reporter=list --timeout=120000 --headed"`. Don't edit this file unless improving the skill itself.
2. **Project `.env`** — per-project overrides. Add a line like `PLAYWRIGHT_FLAGS="--timeout=300000 --headed"` to the project's `.env`. This is the right place for team-wide preferences (e.g., "we always run headless in CI, headed locally").
3. **Shell env** — `export PLAYWRIGHT_FLAGS="..."` in the current session overrides both files for every subsequent call.
4. **CLI after `--`** — one-off overrides appended to whatever the resolved `PLAYWRIGHT_FLAGS` resolves to:
   ```bash
   bash run-playwright.sh create-automation '{...}' -- --debug
   ```

Config files also carry:
- `CLICKUP_BROWSER_PROFILE` — path to the persistent Chrome profile (default `_opensquad/_browser_profile`). Override in `.env` if your squad stores sessions elsewhere.

Useful recipes for the user's `.env`:
```bash
# Local development — watch what happens, longer timeout for debugging
PLAYWRIGHT_FLAGS="--workers=1 --reporter=list --timeout=300000 --headed"

# CI / unattended — fast, no display
PLAYWRIGHT_FLAGS="--workers=1 --reporter=list --timeout=120000 --headed=false"

# Diagnosing a flaky template — full artifacts
PLAYWRIGHT_FLAGS="--workers=1 --reporter=list --timeout=300000 --headed --trace=on --video=on"
```

One-off CLI examples:
- Interactive inspector: `-- --debug`
- Force headless for one run: `-- --headed=false`
- Capture trace for one run: `-- --trace on --video on`

The script echoes progress to stdout. On failure it exits non-zero and (if `screenshot: 'only-on-failure'` is active via the config or CLI flag) leaves artifacts under `test-results/`.

### 4. Validate (MCP or API v2)

After every write, read back. For structure:
```bash
curl -s "https://api.clickup.com/api/v2/team/$WORKSPACE/space?archived=false" \
  -H "Authorization: $TOKEN" | jq '.spaces[] | {id, name}'
```

For automations (only way to check without opening UI):
```bash
curl -s "https://api.clickup.com/api/v2/list/$LIST_ID/automation" \
  -H "Authorization: $TOKEN" | jq '.automations[] | {id, name, enabled}'
```

## Working with Playwright CLI alongside the ClickUp MCP

This is the hybrid flow that actually works:

1. **Plan with MCP reads.** Start the conversation by fetching the current hierarchy via `clickup_get_workspace_hierarchy`. This is free of the UI's quirks and gives you clean IDs.

2. **Write the plan as data, not prose.** For each target object (Space, Folder, List, Status set, Field, Automation), write a JSON spec. This spec becomes the argument to API v2 curls AND to Playwright CLI scripts. Co-locate specs in `_opensquad/<squad>/specs/` so reruns are deterministic.

3. **Fan out by layer:**
   - Layer 1 (API v2): create Spaces → Folders → Lists in parallel where possible
   - Layer 2 (Playwright CLI): configure Statuses on Folders (Lists inherit) → Custom Fields → Default task types
   - Layer 3 (API v2): create Views with filters/grouping/sort using the field IDs returned in layer 2
   - Layer 4 (Playwright CLI): Automations **last**, because they depend on everything above and are the flakiest

4. **Never mix Playwright MCP and Playwright CLI in the same session.** They both want a lock on `_opensquad/_browser_profile/`. If one is running, the other will hit `SingletonLock` errors. Pick one per squad step.

5. **When Playwright CLI fails on Automations specifically,** don't loop retrying. After 2 consecutive failures, generate a **manual guide** (a markdown file with numbered UI steps) and hand it to the user to execute. Time-cost trumps elegance — a human clicking for 15 minutes beats an AI burning 100k tokens failing.

6. **Keep MCP in the loop even during Playwright CLI runs** — after each CLI script completes, read back via MCP or API v2 to confirm the change landed. Never trust a 0-exit from Playwright without verifying via an independent read path.

## Design best practices

See `references/hierarchy-patterns.md` for the long version. TL;DR:

- **One Workspace per company.** Never split.
- **One Space per department.** Marketing, Vendas, Suporte — not per-team or per-project.
- **Max depth Workspace → Space → Folder → List.** No deeper. If you want more nesting, reconsider.
- **Folders only when ≥2 Lists share statuses.** Single-List folders are waste — use a folderless List.
- **Custom statuses per Folder** when Lists share a workflow (they inherit). Per-List only when the workflow is truly unique.
- **Names in the user's language** (Portuguese for Brazilian users, etc.). Internal IDs stay English.
- **Incremental rollout:** one department at a time, validate, then next. Fields and Automations in Phase 2, after the team has used the basics for a week.

## Error handling

### "Space with this name already exists" (API 400)
Happens on rerun. Before creating, GET and filter:
```bash
curl -s ".../space?archived=false" -H "Authorization: $TOKEN" \
  | jq '.spaces[] | select(.name == "Marketing")'
```
If present, skip creation and use the returned ID.

### MCP returns 0 items but the object exists
Fall back to API v2 for that read. File a mental note — the MCP's cache sometimes lags.

### Playwright CLI: "SingletonLock" / "user data directory is already in use"
Another Chrome is holding the profile. Resolve:
```bash
pkill -9 -f "user-data-dir=.*_opensquad/_browser_profile" || true
rm -f _opensquad/_browser_profile/Singleton{Lock,Cookie,Socket} || true
```
Only then retry. Never delete the full profile directory — that logs you out.

### Playwright CLI: Automation dialog closes on click (converged-ai UI)
This is the known 2026+ ClickUp issue. Options in order:
1. Try `scripts/templates/create-automation.js` — it uses `dispatchEvent` with `{bubbles:true,cancelable:true}` and a 1200ms settle delay, which bypasses most overlays
2. If it still fails twice in a row, generate a manual guide and exit gracefully. Don't loop.

### Custom Field creation: panel opens but field doesn't save
The UI needs a click on the Field's "Criar" footer button **after** configuring. Template handles this; if editing the template, preserve the final explicit click — the Enter key doesn't submit.

### "Time In Status" not found as a trigger
It isn't a trigger — it's a **condition**. Time-based automations use trigger `A cada... Diariamente` plus conditions `Status = X` and `Time In Status > Yh`. See `references/automation-patterns.md`.

## Reference files

Read these when the main SKILL.md isn't enough:
- `references/api-v2-recipes.md` — full curl library (Space/Folder/List/Task/View)
- `references/playwright-patterns.md` — selector cheat sheet, overlay workarounds, session management
- `references/automation-patterns.md` — trigger/condition/action combos that work, including the Time In Status pattern
- `references/hierarchy-patterns.md` — design principles for workspace structure
- `references/known-limitations.md` — current list of ClickUp API gaps and UI quirks, with dates

## Memory

When a squad completes a ClickUp setup, save learnings to `_opensquad/_memory/` under the squad name. Specifically:
- What worked on the first try (reusable template)
- What required a workaround (document it)
- Customer-specific naming conventions (for consistency on future squads)
