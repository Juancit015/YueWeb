#!/usr/bin/env bash
# Sirve el proyecto desde la carpeta contenedora (/web/...), igual que hace
# checks/avatar-check.js, para que las rutas relativas al avatar funcionen.
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PORT:-8765}"
echo "SIRVIENDO EN: http://127.0.0.1:$PORT/web/index.html"
exec python3 -m http.server "$PORT"