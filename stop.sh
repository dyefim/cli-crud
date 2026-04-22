#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

docker compose stop
echo "todo-db stopped. Data preserved. Run ./start.sh to resume."
