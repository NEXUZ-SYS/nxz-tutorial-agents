# Pipefy — Playwright Patterns (raríssimo uso)

> **ATENÇÃO:** Playwright deve ser usado em < 5% das operações. A API GraphQL
> cobre 95%+ do que é necessário. Só use Playwright para operações listadas em
> `known-limitations.md` como "UI-only".

## Quando usar Playwright

1. **Dashboards avançados** — criar/configurar charts e widgets
2. **PDF Templates** — configurar templates de documento
3. **Email Inbox** — setup inicial de email integrado ao pipe
4. **Power-ups** — configurar integrações visuais (Slack, etc.)
5. **Formulário público customizado** — CSS, logo, cores

## Setup

```bash
# Instalar dependências
cd skills/pipefy-integration
npm install @playwright/test
npx playwright install chromium
```

## Invocação

Sempre via wrapper:
```bash
bash skills/pipefy-integration/scripts/run-playwright.sh <template> '<json-args>'
```

## Seletores comuns do Pipefy UI

| Elemento | Seletor |
|---|---|
| Login email input | `input[name="email"]` |
| Login password input | `input[name="password"]` |
| Login button | `button[type="submit"]` |
| Pipe title | `.pipe-header h1` |
| Phase column | `.phase-column` |
| Card in phase | `.card-item` |
| Dashboard add widget | `[data-testid="add-widget-button"]` |
| Settings menu | `[data-testid="pipe-settings"]` |

## Template pattern

```javascript
// skills/pipefy-integration/scripts/templates/create-dashboard.js
const { test, expect } = require('@playwright/test');

test('create dashboard', async ({ page }) => {
  const args = JSON.parse(process.env.PIPEFY_ARGS || '{}');
  const baseUrl = 'https://app.pipefy.com';

  // Navigate to pipe
  await page.goto(`${baseUrl}/pipes/${args.pipe_id}`);
  await page.waitForLoadState('networkidle');

  // Open dashboard tab
  await page.click('[data-testid="dashboard-tab"]');
  await page.waitForTimeout(1000);

  // Add widget
  await page.click('[data-testid="add-widget-button"]');
  // ... configure widget
});
```

## Browser profile

```bash
# Profile path (persistent login session)
PIPEFY_BROWSER_PROFILE="${PIPEFY_BROWSER_PROFILE:-_opensquad/_browser_profile}"
```

## Error handling

- Se login expirou: rodar template `login.js` primeiro
- Se seletor não encontrado: aguardar 5s, retry 1x, depois falhar e logar
- Se modal bloqueia: ESC para fechar, retry ação
- Nunca retry mais de 2x — gerar guia manual
