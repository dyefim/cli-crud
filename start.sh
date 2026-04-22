#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! docker info >/dev/null 2>&1; then
  case "$(uname -s)" in
    Darwin) open -a Docker ;;
    Linux)  sudo systemctl start docker || true ;;
  esac
  until docker info >/dev/null 2>&1; do sleep 1; done
fi

docker compose up -d
until [ "$(docker inspect -f '{{.State.Health.Status}}' todo-db 2>/dev/null)" = "healthy" ]; do
  sleep 1
done
echo "todo-db ready."
