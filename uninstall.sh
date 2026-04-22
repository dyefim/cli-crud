#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Unlinking CLI"
npm unlink -g crud-app 2>/dev/null || true

echo "==> Stopping and removing containers + volume"
docker compose down -v

echo "Done."
