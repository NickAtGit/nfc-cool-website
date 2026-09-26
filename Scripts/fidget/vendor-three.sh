#!/usr/bin/env bash
# Rebuilds Content/StaticFiles/fidget/vendor/three.bundle.min.mjs from pinned versions.
# The .mjs extension matters: SiteKit's AssetMinifier rewrites .js files and would
# corrupt the bundle.
set -euo pipefail
THREE_VERSION=0.186.1
ESBUILD_VERSION=0.28.2
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
cd "$WORK"
npm init -y >/dev/null
npm install --silent --no-audit --no-fund "three@$THREE_VERSION" "esbuild@$ESBUILD_VERSION"
cp "$ROOT/Scripts/fidget/three-entry.mjs" entry.mjs
npx esbuild entry.mjs --bundle --minify --format=esm --target=es2020 --legal-comments=eof \
  --outfile="$ROOT/Content/StaticFiles/fidget/vendor/three.bundle.min.mjs"
