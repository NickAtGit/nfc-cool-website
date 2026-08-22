#!/usr/bin/env python3
"""Regenerate portrait image variants that SiteKit's ImageResizer box-fitted.

SiteKit generates responsive variants with ImageMagick `-resize WxW>` (a WxW
bounding box). For a portrait source the height hits the box first, so a
"240w" variant comes out narrower than 240px - while the emitted markup
(`width=`, `srcset` descriptors) assumes the variant is exactly 240px wide.
Portrait images therefore render at roughly half the intended pixel density.

This script runs after `swift run Site build`:

1. scans the built site for `*-<N>w.<ext>` variants narrower than N,
2. regenerates each one from its sibling original with width-only geometry
   (`-resize Nx>`, matching SiteKit's quality/strip flags), and
3. writes the corrected file into SiteKit's variant cache
   (`.sitekit-cache/images/<sha8>-<N>w.<ext>`, sha8 = first 8 hex chars of
   SHA-256 of the rooted source path), so subsequent builds copy the
   corrected variant straight from cache and stay fixed without this script.

Idempotent: a second run finds nothing to do. Uses `magick` (IM7) or falls
back to `convert` (IM6, Ubuntu CI). Drop this script once SiteKit itself
resizes by width only.
"""

import hashlib
import re
import shutil
import subprocess
import sys
from pathlib import Path

SITE_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("_Site")
CACHE_DIR = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(".sitekit-cache/images")

VARIANT_RE = re.compile(r"^(?P<base>.+)-(?P<width>\d+)w\.(?P<ext>webp|png|jpe?g)$", re.IGNORECASE)

MAGICK = shutil.which("magick")
CONVERT = shutil.which("convert")
IDENTIFY = shutil.which("identify")
if not MAGICK and not CONVERT:
    sys.exit("error: neither `magick` (IM7) nor `convert` (IM6) found on PATH")


def run(args: list[str]) -> str:
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout


def image_width(path: Path) -> int | None:
    try:
        if MAGICK:
            out = run([MAGICK, "identify", "-format", "%w", str(path)])
        else:
            out = run([IDENTIFY or "identify", "-format", "%w", str(path)])
        return int(out.strip().split()[0])
    except (subprocess.CalledProcessError, ValueError, IndexError):
        return None


def resize_width_only(src: Path, dest: Path, width: int) -> bool:
    tool = [MAGICK] if MAGICK else [CONVERT]
    args = tool + [str(src), "-resize", f"{width}x>", "-quality", "85", "-strip", str(dest)]
    return subprocess.run(args, capture_output=True).returncode == 0


def main() -> int:
    if not SITE_DIR.is_dir():
        sys.exit(f"error: site directory {SITE_DIR} not found - run the build first")

    fixed = 0
    failed = 0
    for variant in sorted(SITE_DIR.rglob("*")):
        match = VARIANT_RE.match(variant.name)
        if not match or not variant.is_file():
            continue
        target = int(match.group("width"))
        original = variant.with_name(f"{match.group('base')}.{match.group('ext')}")
        if not original.is_file():
            continue

        actual = image_width(variant)
        # A correct variant is exactly `target` wide; box-fitted portrait ones
        # are narrower. Only touch those, and only when the original is wide
        # enough that SiteKit intended a real downscale (it never upscales).
        if actual is None or actual >= target:
            continue
        source_width = image_width(original)
        if source_width is None or source_width < target:
            continue

        if not resize_width_only(original, variant, target):
            print(f"  FAILED {variant.relative_to(SITE_DIR)}")
            failed += 1
            continue

        rooted_src = "/" + original.relative_to(SITE_DIR).as_posix()
        sha8 = hashlib.sha256(rooted_src.encode()).hexdigest()[:8]
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(variant, CACHE_DIR / f"{sha8}-{target}w.{match.group('ext')}")

        print(f"  {variant.relative_to(SITE_DIR)}: {actual}px -> {target}px wide")
        fixed += 1

    print(f"fix-portrait-variants: {fixed} variant(s) regenerated, {failed} failure(s)")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
