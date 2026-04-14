# Playwright CLI Patterns for ClickUp

## Why CLI and not the Playwright MCP

The Playwright MCP works fine for reads (snapshots, evaluates) but is expensive and unreliable for multi-step UI writes in ClickUp:

- Each `browser_snapshot` burns ~1-2k tokens. A 15-step automation flow eats 30k+ tokens just in snapshots
- ClickUp's Angular CDK spawns `cdk-overlay-connected-position-bounding-box` elements that intercept the next pointer event. The MCP's snapshot-then-click cycle consistently hits them
- The new "converged-ai" automation UI closes on portal-level click events — the MCP fires these, standalone Playwright scripts can dispatch them more carefully
- Session lock contention: MCP and CLI both want `_opensquad/_browser_profile/`, so they can't coexist

Rule: use MCP for one-off reads while exploring, switch to CLI scripts the moment a flow has 3+ writes.

## Session management

The persistent profile lives at `<project_root>/_opensquad/_browser_profile/`. It stores cookies, localStorage, and login state so the user only authenticates once.

Before every Playwright CLI run:
1. Check no other Chrome holds the lock: `pgrep -f "user-data-dir=.*_browser_profile"`
2. If stale lock exists (no process): `rm -f _opensquad/_browser_profile/Singleton{Lock,Cookie,Socket}`
3. Never `rm -rf` the whole profile — that logs the user out

Launch via `chromium.launchPersistentContext(PROFILE, { headless: false, viewport: {width:1400,height:900} })`. Headed mode lets the user watch and intervene, and some ClickUp dialogs behave differently in headless.

## Selector cheat sheet

ClickUp uses data-test attributes that are stable across sessions. Prefer these over text matches.

### Sidebar
| Thing | Selector |
|---|---|
| Folder ellipsis | `[data-test^="category-row__ellipsis-folder-name__"]` |
| List ellipsis | `[data-test^="subcategory-row__ellipsis-name__"]` |
| Task statuses menu item | `[data-test="nav-menu-item__task-statuses"]` |

### Status manager
| Thing | Selector |
|---|---|
| Status item input (existing) | `[data-test^="status-manager__status-item-"][data-test$="status-manager__status-item_input"]` |
| Add status input (active) | `[data-test="status-manager__statuses-container-active"] [data-test="status-manager__create-status-input"]` |
| Add status input (done) | `[data-test="status-manager__statuses-container-done"] [data-test="status-manager__create-status-input"]` |
| Color picker option | `[data-test="color-picker-option__{ColorName}"]` (Roxo, Azul neon, Azul ciano, Azul-petróleo, Verde, Amarelo, Laranja, Vermelho, Rosa, Violeta, Marrom, Cinza) |
| Footer save | `[data-test="status-manager-footer__save"]` |

### Automation builder (classic + converged-ai)
| Thing | Selector |
|---|---|
| Automatizar button | `[data-test="automation-converged-ai-task-button__button"]` |
| Gerenciar automações | `button.converged-ai-task-manage-button` |
| + Adicionar automação | `[data-test="automation-tab-manage__add-automation-button"]` |
| Trigger: Schedule | `[data-test="dropdown-list-item__schedule"]` |
| Trigger: Daily | `[data-test="dropdown-list-item__Diariamente"]` |
| Condition: Status | `[data-test="dropdown-list-item__Status"]` |
| Condition: Time In Status | `[data-test="dropdown-list-item__Time In Status"]` |
| Status multi-select toggle | `[data-test="status-filter__toggle"]` |
| Action: Add comment | `[data-test="dropdown-list-item__Adicionar um comentário"]` |
| Comment editor (nested) | `[data-test="comment-bar__editor-input"] .ql-editor` |
| Add condition button | `.cu-edit-automation__container-body-add[aria-label="Adicionar condição"]` |
| Footer Create | `[data-test="edit-automation__create-footer-button"]` |
| Time input placeholder | `input[placeholder*="48h"]` or `input[placeholder*="2h"]` |

## Overlay interception workarounds

### Problem
Clicking a ClickUp button often spawns a `cdk-overlay-connected-position-bounding-box` that sits on top of where you want to click next. Playwright's standard click retries against the overlay and times out.

### Fix 1: dispatchEvent
Instead of `locator.click()`, dispatch the event directly on the element:
```js
await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
}, selector);
```
This bypasses Playwright's actionability checks and most overlays.

### Fix 2: remove the overlay before clicking
```js
await page.evaluate(() => {
  document.querySelectorAll('.cdk-overlay-backdrop, .cdk-overlay-connected-position-bounding-box')
    .forEach(e => e.remove());
});
```
Safe when the overlay is orphaned (the dropdown it served is already closed). Don't do this while a real picker is open or you'll kill the picker too.

### Fix 3: longer settle delays
The converged-ai dialog mounts lazily. After clicking a trigger type or adding a condition, wait `1200ms` before the next step. Playwright's default auto-waiting doesn't cover async Angular renders.

### Fix 4: NEVER press Escape to dismiss a stray overlay
Escape closes the entire automation dialog and throws away your unsaved work. Instead, click on `document.body` at a neutral location:
```js
await page.evaluate(() => document.body.click());
```

## React-safe input setting

When `.fill()` doesn't propagate to React/Angular state, use the native setter:
```js
await page.evaluate((value) => {
  const inp = document.querySelector('input[placeholder*="48h"]');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(inp, value);
  inp.dispatchEvent(new Event('input', { bubbles: true }));
  inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
}, '48h');
```

## Idempotency

Templates should be safe to rerun. Before creating, check:
- For statuses: does the folder already show the expected status list? If yes, skip
- For fields: query `GET /list/{id}/field` first; skip if the field name already exists
- For automations: query `GET /list/{id}/automation` first

When in doubt, prefer "create new" over "edit existing" — ClickUp's UI for editing is more fragile than the UI for creating.

## Failure recovery

Every template should:
- Exit with a non-zero code on failure
- Save a screenshot to `_opensquad/_browser_profile/failure-<template>-<timestamp>.png`
- Log the last successful step to stdout so the caller knows where to resume

Example:
```js
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({ path: `_opensquad/_browser_profile/failure-${Date.now()}.png` });
  }
});
```
