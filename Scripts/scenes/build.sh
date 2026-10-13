#!/usr/bin/env bash
# Rebuilds the live 3D scene assets in Content/StaticFiles/scenes/ from NFCcoolScenes: one GLB +
# manifest + H.264 screen video per scene, the shared phone GLB, and the three bundle.
#   Scripts/scenes/build.sh            all of it
#   Scripts/scenes/build.sh --bundle   only the three bundle
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
  # .mjs, so SiteKit's AssetMinifier (which rewrites .js) leaves the bundle alone.
  npx esbuild entry.mjs --bundle --minify --format=esm --target=es2020 --legal-comments=eof \
    --outfile="$OUT/vendor/three.scenes.min.mjs"
)
[[ "${1:-}" == "--bundle" ]] && exit 0

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
