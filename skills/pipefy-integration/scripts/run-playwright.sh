#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(cd "$SKILL_DIR/../.." && pwd)"

# Load configuration (layer 1: skill defaults)
if [[ -f "$SKILL_DIR/config.env" ]]; then
  source "$SKILL_DIR/config.env"
fi

# Load project .env (layer 2: project overrides)
if [[ -f "$PROJECT_ROOT/.env" ]]; then
  source "$PROJECT_ROOT/.env"
fi

# Resolve browser profile path
PROFILE_DIR="${PIPEFY_BROWSER_PROFILE:-_opensquad/_browser_profile}"
if [[ ! "$PROFILE_DIR" = /* ]]; then
  PROFILE_DIR="$PROJECT_ROOT/$PROFILE_DIR"
fi

# Check for SingletonLock
if [[ -f "$PROFILE_DIR/SingletonLock" ]]; then
  echo "⚠️  Browser profile locked. Cleaning stale lock..."
  rm -f "$PROFILE_DIR/Singleton"{Lock,Cookie,Socket} 2>/dev/null || true
fi

# Parse arguments
TEMPLATE="${1:?Usage: run-playwright.sh <template> [args_json] [-- extra_flags]}"
# NOTE: Can't use ${2:-{}} — bash parses the closing `}` ambiguously and appends literal `}` to $2.
ARGS_JSON="${2:-}"
[[ -z "$ARGS_JSON" ]] && ARGS_JSON='{}'
shift 2 || shift $#

# Separate extra flags (after --)
EXTRA_FLAGS=""
if [[ "${1:-}" == "--" ]]; then
  shift
  EXTRA_FLAGS="$*"
fi

TEMPLATE_FILE="$SCRIPT_DIR/templates/${TEMPLATE}.js"
if [[ ! -f "$TEMPLATE_FILE" ]]; then
  echo "❌ Template not found: $TEMPLATE_FILE"
  echo "Available templates:"
  ls "$SCRIPT_DIR/templates/"*.js 2>/dev/null | xargs -I{} basename {} .js | sed 's/^/  - /'
  exit 1
fi

# Export args for the Playwright test
export PIPEFY_ARGS="$ARGS_JSON"
export PIPEFY_BROWSER_PROFILE="$PROFILE_DIR"

# Load Pipefy credentials from .env
export PIPEFY_API_TOKEN="${PIPEFY_API_TOKEN:-$(grep '^PIPEFY_API_TOKEN=' "$PROJECT_ROOT/.env" 2>/dev/null | cut -d= -f2 || echo '')}"
export PIPEFY_ORGANIZATION_ID="${PIPEFY_ORGANIZATION_ID:-$(grep '^PIPEFY_ORGANIZATION_ID=' "$PROJECT_ROOT/.env" 2>/dev/null | cut -d= -f2 || echo '')}"
export PIPEFY_EMAIL="${PIPEFY_EMAIL:-$(grep '^PIPEFY_EMAIL=' "$PROJECT_ROOT/.env" 2>/dev/null | cut -d= -f2 || echo '')}"
export PIPEFY_PASSWORD="${PIPEFY_PASSWORD:-$(grep '^PIPEFY_PASSWORD=' "$PROJECT_ROOT/.env" 2>/dev/null | cut -d= -f2 || echo '')}"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Pipefy Integration — Playwright CLI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Template: $TEMPLATE"
echo "  Args: $ARGS_JSON"
echo "  Profile: $PROFILE_DIR"
echo "  Flags: ${PLAYWRIGHT_FLAGS:-default} $EXTRA_FLAGS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Run Playwright test
cd "$SKILL_DIR"
npx playwright test "$TEMPLATE_FILE" \
  ${PLAYWRIGHT_FLAGS:-} \
  $EXTRA_FLAGS \
  --project=chromium \
  2>&1

EXIT_CODE=$?

if [[ $EXIT_CODE -eq 0 ]]; then
  echo "✅ Template '$TEMPLATE' completed successfully"
else
  echo "❌ Template '$TEMPLATE' failed (exit code: $EXIT_CODE)"
fi

exit $EXIT_CODE
