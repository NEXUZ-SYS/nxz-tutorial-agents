# Known ClickUp Limitations

Dated list of gaps and quirks encountered in production. Update as new ones surface or old ones get fixed.

## Last verified: 2026-04-14

### API v2 silent failures
| Endpoint | Behavior | Workaround |
|---|---|---|
| `PUT /list/{id}` with `statuses` | Returns 200, statuses unchanged | Playwright: status manager UI |
| `POST /list/{id}/field` | No such endpoint; 404 | Playwright: List header → + Campo |
| `POST /list/{id}/automation` | No such endpoint; 404 | Playwright: Automatizar → Gerenciar |
| `PUT /list/{id}` with `default_task_type` | Returns 200, read-back returns null | Playwright: right-click List → Tipo padrão |
| `PATCH /field/{id}` on a formula field | Returns 200 but formula doesn't recalc | Touch each task manually or wait for nightly recalc |

### MCP server inconsistencies
| Operation | Issue | Fallback |
|---|---|---|
| `clickup_get_workspace_hierarchy` | Sometimes returns 0 spaces immediately after create | Retry after 10s, or use API v2 |
| Creating Spaces | No tool offered | API v2 |
| Modifying statuses | No parameter exposed | Playwright |
| Creating custom fields | No parameter exposed | Playwright |

### UI / Playwright
| Thing | Status | Notes |
|---|---|---|
| Classic automation builder | Deprecated in most workspaces | Selectors `[data-test="edit-automation__*"]` still present but wrapped by converged-ai |
| Converged-ai automation UI | Default as of 2026-Q1 | Portal-level clicks on Criar button often closed the dialog — use `dispatchEvent` with `bubbles:true`, 1200ms settle |
| Custom Field editor | Stable | Works reliably via Playwright |
| Status manager | Stable | Works reliably; prefer Folder-level config for inheritance |
| CNPJ input mask | Not available | ClickUp has no built-in Brazilian CNPJ mask. Use plain text field + validation in an automation |

### Browser session / Playwright lock
| Symptom | Cause | Fix |
|---|---|---|
| `SingletonLock` error on startup | Another Chrome using same profile | `pkill -9 -f "user-data-dir=.*_browser_profile"` |
| "user data directory is already in use" | Stale lock files after crash | `rm -f _browser_profile/Singleton{Lock,Cookie,Socket}` |
| Logged out unexpectedly | Profile was `rm -rf`'d at some point | Run the login template again |

### Rate limits
ClickUp API v2 allows 100 requests/minute per token. For bulk operations:
- Space/Folder/List creation: safe in parallel up to ~10
- Task creation: throttle to `xargs -P 5` or similar
- Automation reads (for validation): safe

## Historical issues (fixed, for context)

### 2025-Q3: MCP couldn't create Lists
Was bug in early MCP server. Fixed by upstream. Kept for context if someone runs into "create list returns 404" — update the MCP package.

## What to do when you find a new limitation

1. File it here with the date
2. If you find a workaround, add it to the main SKILL.md decision matrix
3. If the workaround is a script, save it as a template under `scripts/templates/`
4. Update `references/known-limitations.md` with "Last verified" date so the next user knows how stale the info is
