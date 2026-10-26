#!/usr/bin/env bash
# Rebuilds the live 3D scene assets in Content/StaticFiles/scenes/: the players (minified from
# Scripts/scenes/live-scenes.mjs, and the blog's phone figures bundled from
# Scripts/scenes/phone-figures.mjs) and the three bundle, all with source maps, then from
# NFCcoolScenes one GLB + manifest + H.264 screen video per scene and the shared phone GLB (plus
# blog_phone.glb, its slimmed copy for the phone figures: Scripts/scenes/blog-phone.mjs), the
# cardfan scene (Scripts/scenes/cardfan.py, from the batch scene's cards: GLB + manifest), and the
# home page's nfctags scene (Scripts/scenes/nfctags*.py: GLB + manifest + screen video).
#   Scripts/scenes/build.sh        all of it
#   Scripts/scenes/build.sh --js   only the players and the three bundle (after editing a player)
# Needs Blender 5.2 (via NFCcoolScenes/scripts/blender.sh), ffmpeg, npm and Python 3 with Pillow. A scene's poster still
# is rendered afterwards from the built site: see Scripts/scenes/render-poster.mjs (and
# Scripts/scenes/render-phone-shell.mjs for the phone figures' still).
set -euo pipefail
THREE_VERSION=0.186.1
ESBUILD_VERSION=0.28.2
GLTF_TRANSFORM_VERSION=4.5.1
MESHOPTIMIZER_VERSION=1.2.0
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
  npm install --silent --no-audit --no-fund "three@$THREE_VERSION" "esbuild@$ESBUILD_VERSION" \
    "@gltf-transform/core@$GLTF_TRANSFORM_VERSION" "@gltf-transform/extensions@$GLTF_TRANSFORM_VERSION" \
    "@gltf-transform/functions@$GLTF_TRANSFORM_VERSION" "meshoptimizer@$MESHOPTIMIZER_VERSION"
  cp "$ROOT/Scripts/scenes/three-entry.mjs" entry.mjs
  # .mjs, so SiteKit's AssetMinifier (which rewrites .js) leaves the bundle alone. The source
  # map is only fetched by DevTools and Lighthouse, never by a visitor's page load.
  npx esbuild entry.mjs --bundle --minify --format=esm --target=es2020 --legal-comments=eof \
    --sourcemap --outfile="$OUT/vendor/three.scenes.min.mjs"
  # Not bundled: the player imports the three bundle itself, once the page is idle.
  npx esbuild "$ROOT/Scripts/scenes/live-scenes.mjs" --minify --format=esm --target=es2020 \
    --sourcemap --outfile="$OUT/live-scenes.mjs"
  # Its small pure modules are bundled in; three stays the shared bundle, imported once idle.
  npx esbuild "$ROOT/Scripts/scenes/phone-figures.mjs" --bundle --external:./vendor/* --minify \
    --format=esm --target=es2020 --sourcemap --outfile="$OUT/phone-figures.mjs"
)
[[ "${1:-}" == "--js" ]] && exit 0

cd "$SCENES_REPO"
scripts/blender.sh scenes/nfc.blend -P scripts/export_scene_glb.py -- --phone "$OUT" | grep -E "EXPORT|Error|Traceback"
# Run from the work dir: an ES module resolves its imports next to itself, not via NODE_PATH.
cp "$ROOT/Scripts/scenes/blog-phone.mjs" "$WORK/" && node "$WORK/blog-phone.mjs" "$OUT/feature_phone.glb" "$OUT/blog_phone.glb"
for scene in "${SCENES[@]}"; do
  scripts/blender.sh "scenes/$scene.blend" -P scripts/export_scene_glb.py -- "$scene" "$OUT" | grep -E "EXPORT|Error|Traceback"
  cp "export/$scene/$scene.scene.json" "$OUT/$scene.json"
  # The app's screen videos are HEVC, which Firefox and most Chromium builds cannot decode.
  ffmpeg -loglevel error -y -i "export/$scene/${scene}_screen.mp4" -vf "scale=330:-2" \
    -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart \
    "$OUT/${scene}_screen.mp4"
done
python3 "$ROOT/Scripts/scenes/cardfan_faces.py" "$SCENES_REPO" "$WORK/cardfan_faces" | grep -v FACE || true
scripts/blender.sh scenes/csvbatch.blend -P "$ROOT/Scripts/scenes/cardfan.py" -- "$WORK/cardfan_faces" "$OUT" | grep -E "EXPORT|Error|Traceback"
python3 "$ROOT/Scripts/scenes/nfctags_textures.py" "$SCENES_REPO" "$WORK/cardfan_faces" "$WORK/nfctags_textures"
python3 "$ROOT/Scripts/scenes/nfctags_screen.py" "$SCENES_REPO" "$WORK/nfctags_screen"
ffmpeg -loglevel error -y -framerate 30 -i "$WORK/nfctags_screen/%04d.png" -vf "scale=330:-2" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart "$OUT/nfctags_screen.mp4"
scripts/blender.sh -P "$ROOT/Scripts/scenes/nfctags.py" -- "$SCENES_REPO" "$WORK/nfctags_textures" "$WORK/nfctags_screen" "$OUT" | grep -E "EXPORT|Error|Traceback"
ls -la "$OUT" "$OUT/vendor"
