#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Checking prerequisites"
command -v docker >/dev/null || { echo "Docker Desktop not installed. Get it: https://docs.docker.com/get-docker/"; exit 1; }
command -v node   >/dev/null || { echo "Node not installed."; exit 1; }

echo "==> Ensuring Docker daemon is running"
if ! docker info >/dev/null 2>&1; then
  case "$(uname -s)" in
    Darwin) open -a Docker ;;
    Linux)  sudo systemctl start docker || true ;;
    *)      echo "Start Docker manually then rerun."; exit 1 ;;
  esac
  echo "    waiting for Docker..."
  until docker info >/dev/null 2>&1; do sleep 1; done
fi

echo "==> Writing .env (if missing)"
[ -f .env ] || cp .env.example .env

echo "==> Starting Postgres"
docker compose up -d

echo "==> Waiting for DB to be healthy"
until [ "$(docker inspect -f '{{.State.Health.Status}}' todo-db 2>/dev/null)" = "healthy" ]; do
  sleep 1
done

echo "==> Installing npm dependencies"
npm install

echo "==> Linking CLI globally"
npm link

echo
echo "Done. Try: todo --add \"buy milk\" --tags shop && todo --list"
