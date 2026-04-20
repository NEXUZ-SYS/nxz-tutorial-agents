#!/usr/bin/env bash
# Playwright CLI runner for ClickUp templates.
#
# Usage:
#   bash run-playwright.sh <template-name> '<json-args>' [-- <playwright-flags>...]
#
# Example:
#   bash run-playwright.sh configure-statuses '{"folder_id":"90178149765",...}'
#   bash run-playwright.sh create-automation '{...}' -- --debug
#
# Configuration resolution order (later wins):
#   1. skills/clickup-integration/config.env            (skill ships defaults)
#   2. project_root/.env                                (per-project overrides)
#   3. PLAYWRIGHT_FLAGS in the calling shell            (ad-hoc session)
#   4. CLI flags after `--`                             (one-off run)
#
# The template name maps to scripts/templates/<template>.js
# Template-specific JSON args are passed via the CLICKUP_ARGS env var.

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_ROOT="$(cd "$SKILL_DIR/../.." && pwd)"
TEMPLATE="${1:-}"
ARGS="${2-}"
if [[ -z "$ARGS" ]]; then ARGS='{}'; fi

if [[ -z "$TEMPLATE" ]]; then
  echo "usage: run-playwright.sh <template> '<json-args>' [-- <playwright-flags>]"
  echo "available templates:"
  ls "$SKILL_DIR/scripts/templates/" 2>/dev/null | sed 's/\.js$//' | sed 's/^/  /'
  exit 1
fi

TEMPLATE_PATH="$SKILL_DIR/scripts/templates/${TEMPLATE}.js"
if [[ ! -f "$TEMPLATE_PATH" ]]; then
  echo "template not found: $TEMPLATE_PATH" >&2
  exit 1
fi

# Shift past template + args, collect any flags passed after `--`
shift $(( $# >= 2 ? 2 : $# ))
CLI_FLAGS=()
if [[ "${1:-}" == "--" ]]; then
  shift
  CLI_FLAGS=("$@")
fi

# Capture the shell's PLAYWRIGHT_FLAGS (if any) before loading config files,
# so we can re-apply it as the highest-priority env-level source.
SHELL_FLAGS="${PLAYWRIGHT_FLAGS:-}"

# 1. Skill defaults
if [[ -f "$SKILL_DIR/config.env" ]]; then
  set -a; source "$SKILL_DIR/config.env"; set +a
fi

# 2. Project overrides (also provides credentials)
if [[ -f "$PROJECT_ROOT/.env" ]]; then
  set -a; source "$PROJECT_ROOT/.env"; set +a
fi

# 3. Re-apply shell override if it was set
if [[ -n "$SHELL_FLAGS" ]]; then
  PLAYWRIGHT_FLAGS="$SHELL_FLAGS"
fi

: "${CLICKUP_API_TOKEN:?CLICKUP_API_TOKEN missing — check .env}"
: "${CLICKUP_WORKSPACE_ID:?CLICKUP_WORKSPACE_ID missing — check .env}"
: "${PLAYWRIGHT_FLAGS:?PLAYWRIGHT_FLAGS missing — check skill config.env}"

PROFILE_DIR="$PROJECT_ROOT/${CLICKUP_BROWSER_PROFILE:-_opensquad/_browser_profile}"
if [[ -f "$PROFILE_DIR/SingletonLock" ]]; then
  if pgrep -f "user-data-dir=.*$(basename "$PROFILE_DIR")" > /dev/null; then
    echo "ERROR: another Chrome process is using $PROFILE_DIR" >&2
    echo "kill it with: pkill -9 -f 'user-data-dir=.*$(basename "$PROFILE_DIR")'" >&2
    exit 2
  fi
  rm -f "$PROFILE_DIR"/Singleton{Lock,Cookie,Socket} 2>/dev/null || true
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "npx not found — install Node.js first" >&2
  exit 3
fi

export CLICKUP_ARGS="$ARGS"
export CLICKUP_PROFILE_DIR="$PROFILE_DIR"

# shellcheck disable=SC2206
RESOLVED_FLAGS=( $PLAYWRIGHT_FLAGS )

cd "$SKILL_DIR"
set -x
npx playwright test "$TEMPLATE_PATH" "${RESOLVED_FLAGS[@]}" "${CLI_FLAGS[@]}"
