# ClickUp API v2 — Recipe Library

All recipes assume:
```bash
TOKEN=$(grep '^CLICKUP_API_TOKEN=' .env | cut -d= -f2)
WORKSPACE=$(grep '^CLICKUP_WORKSPACE_ID=' .env | cut -d= -f2)
```

Base URL: `https://api.clickup.com/api/v2`

## Reads

### List teams (workspaces)
```bash
curl -s "$BASE/team" -H "Authorization: $TOKEN" | jq
```

### List spaces in workspace
```bash
curl -s "$BASE/team/$WORKSPACE/space?archived=false" -H "Authorization: $TOKEN" | jq '.spaces[] | {id,name}'
```

### List folders in space
```bash
curl -s "$BASE/space/$SPACE_ID/folder?archived=false" -H "Authorization: $TOKEN" | jq '.folders[] | {id,name}'
```

### Lists (folder vs folderless)
```bash
# In folder
curl -s "$BASE/folder/$FOLDER_ID/list" -H "Authorization: $TOKEN" | jq '.lists[] | {id,name}'
# Folderless
curl -s "$BASE/space/$SPACE_ID/list" -H "Authorization: $TOKEN" | jq '.lists[] | {id,name}'
```

### List details (statuses, task count)
```bash
curl -s "$BASE/list/$LIST_ID" -H "Authorization: $TOKEN" | jq '.statuses[].status, .task_count'
```

### Custom fields of a list
```bash
curl -s "$BASE/list/$LIST_ID/field" -H "Authorization: $TOKEN" | jq '.fields[] | {id,name,type}'
```

### Views of a list
```bash
curl -s "$BASE/list/$LIST_ID/view" -H "Authorization: $TOKEN" | jq '.views[] | {id,name,type}'
```

### Automations on a list
```bash
curl -s "$BASE/list/$LIST_ID/automation" -H "Authorization: $TOKEN" | jq '.automations[] | {id,name,enabled}'
```

## Creates

### Space
```bash
curl -s -X POST "$BASE/team/$WORKSPACE/space" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "name": "Vendas",
    "multiple_assignees": true,
    "features": {
      "due_dates": {"enabled": true, "start_date": true, "remap_due_dates": true},
      "time_tracking": {"enabled": true},
      "tags": {"enabled": true},
      "time_estimates": {"enabled": true},
      "checklists": {"enabled": true},
      "custom_fields": {"enabled": true},
      "remap_dependencies": {"enabled": true},
      "dependency_warning": {"enabled": true},
      "portfolios": {"enabled": true}
    }
  }' | jq '.id'
```

### Folder
```bash
curl -s -X POST "$BASE/space/$SPACE_ID/folder" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"CRM"}' | jq '.id'
```

### List (in folder)
```bash
curl -s -X POST "$BASE/folder/$FOLDER_ID/list" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"Leads & Deals","content":"Pipeline comercial"}' | jq '.id'
```

### List (folderless, directly in space)
```bash
curl -s -X POST "$BASE/space/$SPACE_ID/list" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"Requests Internos"}'
```

### Task
```bash
curl -s -X POST "$BASE/list/$LIST_ID/task" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"Nova oportunidade","status":"qualificado","priority":2}'
```

### View (with filter + grouping)
```bash
# Body shape varies by view type. Example: list view grouped by status, filtered by custom field.
curl -s -X POST "$BASE/list/$LIST_ID/view" \
  -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "name": "Lista da semana",
    "type": "list",
    "grouping": {"field":"status","dir":1},
    "sorting": {"fields":[{"field":"cf_<LEAD_SCORE_FIELD_ID>","dir":-1}]},
    "filters": {
      "op":"AND",
      "fields":[{"field":"status","op":"EQ","values":["qualificado"]}]
    }
  }'
```

Key gotchas for views:
- Reference custom fields as `cf_<field_id>` (with the `cf_` prefix) in filters and sorts
- For NOT-filter against status groups (e.g., `status != done`), use `{"type":"done"}` or `{"type":"closed"}` as the value instead of the raw status name

## Limits

These return 200 but don't actually write:
- `PUT /list/{id}` with `statuses` field — does not update statuses
- `POST /list/{id}/field` — no such endpoint, cannot create custom fields
- `POST /list/{id}/automation` — no such endpoint, cannot create automations
- `PUT /list/{id}` with `default_task_type` — ignored, always reads back null

For these, use the Playwright CLI scripts in `scripts/templates/`.
