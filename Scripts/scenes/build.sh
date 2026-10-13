#!/usr/bin/env bash
# Rebuilds the live 3D scene assets in Content/StaticFiles/scenes/: the player (minified from
# Scripts/scenes/live-scenes.mjs) and the three bundle, both with source maps, then from
# NFCcoolScenes one GLB + manifest + H.264 screen video per scene and the shared phone GLB.
#   Scripts/scenes/build.sh        all of it
#   Scripts/scenes/build.sh --js   only the player and the three bundle (after editing the player)
# Needs Blender 5.2 (via NFCcoolScenes/scripts/blender.sh), ffmpeg and npm. A scene's poster still
# is rendered afterwards from the built site: see Scripts/scenes/render-poster.mjs.
set -euo pipefail
THREE_VERSION=0.186.1
ESBUILD_VERSION=0.28.2
SCENES=(bizcardroom)
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SCENES_REPO="${SCENES_REPO:-$ROOT/../NFCcoolScenes}"
OUT="$ROOT/Content/StaticFiles/scenes"
mkdir -p "$OUT/vendor"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
(
  cd "$WORK"
  npm init -y >/dev/null
  npm install --silent --no-audit --no-fund "three@$THREE_VERSION" "esbuild@$ESBUILD_VERSION"
  cp "$ROOT/Scripts/scenes/three-entry.mjs" entry.mjs
  # .mjs, so SiteKit's AssetMinifier (which rewrites .js) leaves the bundle alone. The source
  # map is only fetched by DevTools and Lighthouse, never by a visitor's page load.
  npx esbuild entry.mjs --bundle --minify --format=esm --target=es2020 --legal-comments=eof \
    --sourcemap --outfile="$OUT/vendor/three.scenes.min.mjs"
  # Not bundled: the player imports the three bundle itself, once the page is idle.
  npx esbuild "$ROOT/Scripts/scenes/live-scenes.mjs" --minify --format=esm --target=es2020 \
    --sourcemap --outfile="$OUT/live-scenes.mjs"
)
[[ "${1:-}" == "--js" ]] && exit 0

cd "$SCENES_REPO"
scripts/blender.sh scenes/nfc.blend -P scripts/export_scene_glb.py -- --phone "$OUT" | grep -E "EXPORT|Error|Traceback"
for scene in "${SCENES[@]}"; do
  scripts/blender.sh "scenes/$scene.blend" -P scripts/export_scene_glb.py -- "$scene" "$OUT" | grep -E "EXPORT|Error|Traceback"
  cp "export/$scene/$scene.scene.json" "$OUT/$scene.json"
  # The app's screen videos are HEVC, which Firefox and most Chromium builds cannot decode.
  ffmpeg -loglevel error -y -i "export/$scene/${scene}_screen.mp4" -vf "scale=330:-2" \
    -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart \
    "$OUT/${scene}_screen.mp4"
done
ls -la "$OUT" "$OUT/vendor"
