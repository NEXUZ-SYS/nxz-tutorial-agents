#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ -f "$PROJECT_ROOT/.env" ]; then
  export GOOGLE_SHEETS_CLIENT_ID="$(grep '^GOOGLE_SHEETS_CLIENT_ID=' "$PROJECT_ROOT/.env" | cut -d= -f2)"
  export GOOGLE_SHEETS_CLIENT_SECRET="$(grep '^GOOGLE_SHEETS_CLIENT_SECRET=' "$PROJECT_ROOT/.env" | cut -d= -f2)"
fi
export TOKEN_PATH="/home/walterfrey/.mcp-google-sheets-token.json"

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

exec mcp-google-sheets
