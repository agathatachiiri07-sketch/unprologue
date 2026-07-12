#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8080}"
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Starting UNPROLOGUE inc site at http://localhost:${PORT}"
echo "Press Ctrl+C to stop."
cd "$ROOT"
python3 -m http.server "$PORT"
