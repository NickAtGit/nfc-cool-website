#!/usr/bin/env python3
"""
One-shot migration: rewrite every App Store / Play Store / *.nfc.cool short URL
in Content/Blog/, Content/Changelog/, and selected Content/Pages/ markdown files
so the campaign tag carries `{channel}_{page}_{locale}`.

Mirrors the canonical URL format produced by Sources/Site/Helpers/StoreLink.swift.
Idempotent: re-running on already-migrated files is a no-op.

Usage:
    python3 Scripts/migrate-blog-links.py            # rewrite in place
    python3 Scripts/migrate-blog-links.py --dry-run  # show what would change
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_LOCALE = "en"

# (directory, channel-prefix, dated-filenames). `dated` means the filename has a
# YYYY-MM-DD prefix that should be stripped to derive the slug.
TARGETS: list[tuple[Path, str, bool, set[str] | None]] = [
    (ROOT / "Content" / "Blog", "blog", True, None),
    (ROOT / "Content" / "Changelog", "changelog", True, None),
    (
        ROOT / "Content" / "Pages",
        "web",
        False,
        {"Reviews", "AffiliateLinks", "business-card"},
    ),
]

APPLE_PROVIDER_TOKEN = "106913804"
TOOLS_APP_ID = "1249686798"
BUSINESS_CARD_APP_ID = "6502926572"
ANDROID_PACKAGE_ID = "cool.nfc"

URL_STOP = r"\s\)\"\]<>"

PATTERNS = {
    "tools_app_store": re.compile(
        rf"https://apps\.apple\.com/app/[^/]+/id{TOOLS_APP_ID}(?:\?[^{URL_STOP}]*)?"
    ),
    "business_card_app_store": re.compile(
        rf"https://apps\.apple\.com/app/[^/]+/id{BUSINESS_CARD_APP_ID}(?:\?[^{URL_STOP}]*)?"
    ),
    "google_play": re.compile(
        rf"https://play\.google\.com/store/apps/details\?id={re.escape(ANDROID_PACKAGE_ID)}(?:&[^{URL_STOP}]*)?"
    ),
    "short_ios": re.compile(rf"https://ios\.nfc\.cool(?:/[^{URL_STOP}]*)?"),
    "short_android": re.compile(rf"https://android\.nfc\.cool(?:/[^{URL_STOP}]*)?"),
    "short_business_card": re.compile(
        rf"https://business-card\.nfc\.cool(?:/[^{URL_STOP}]*)?"
    ),
}

DATED_FILENAME_RE = re.compile(
    r"^\d{4}-\d{2}-\d{2}-(?P<slug>[^.]+)(?:\.(?P<locale>[a-z]{2}))?\.md$"
)
PAGE_FILENAME_RE = re.compile(
    r"^(?P<slug>[A-Za-z0-9_-]+?)(?:\.(?P<locale>[a-z]{2}))?\.md$"
)


def slugify_page(name: str) -> str:
    # SiteKit's loader maps `AffiliateLinks` -> `affiliate-links`. Mirror that.
    out: list[str] = []
    for i, ch in enumerate(name):
        if ch.isupper() and i > 0 and not name[i - 1].isupper():
            out.append("-")
        out.append(ch.lower())
    return "".join(out)


def parse_filename(name: str, dated: bool) -> tuple[str, str] | None:
    if dated:
        m = DATED_FILENAME_RE.match(name)
        if not m:
            return None
        return m.group("slug"), m.group("locale") or DEFAULT_LOCALE
    m = PAGE_FILENAME_RE.match(name)
    if not m:
        return None
    return slugify_page(m.group("slug")), m.group("locale") or DEFAULT_LOCALE


def app_store_url(app_id: str, page: str, locale: str) -> str:
    campaign = f"{page}_{locale}"
    return f"https://apps.apple.com/app/apple-store/id{app_id}?pt={APPLE_PROVIDER_TOKEN}&ct={campaign}&mt=8"


def google_play_url(page: str, locale: str) -> str:
    campaign = f"{page}_{locale}"
    channel = page.split("_", 1)[0] if "_" in page else "web"
    if channel not in {"web", "blog", "changelog"}:
        channel = "web"
    referrer = f"utm_source%3Dnfc.cool%26utm_medium%3D{channel}%26utm_campaign%3D{campaign}"
    return f"https://play.google.com/store/apps/details?id={ANDROID_PACKAGE_ID}&referrer={referrer}"


def rewrite_content(content: str, page: str, locale: str) -> str:
    content = PATTERNS["tools_app_store"].sub(
        app_store_url(TOOLS_APP_ID, page, locale), content
    )
    content = PATTERNS["business_card_app_store"].sub(
        app_store_url(BUSINESS_CARD_APP_ID, page, locale), content
    )
    content = PATTERNS["google_play"].sub(google_play_url(page, locale), content)
    content = PATTERNS["short_ios"].sub(
        app_store_url(TOOLS_APP_ID, page, locale), content
    )
    content = PATTERNS["short_android"].sub(google_play_url(page, locale), content)
    content = PATTERNS["short_business_card"].sub(
        app_store_url(BUSINESS_CARD_APP_ID, page, locale), content
    )
    return content


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--locale",
        help="Limit to a single locale (en | de | ja). Useful for reviewing diffs one language at a time.",
    )
    args = parser.parse_args()

    changed = 0
    scanned = 0
    for directory, channel, dated, allowlist in TARGETS:
        if not directory.is_dir():
            continue
        for path in sorted(directory.glob("*.md")):
            parsed = parse_filename(path.name, dated)
            if parsed is None:
                continue
            slug, locale = parsed
            if allowlist is not None:
                # Match against the raw filename stem (before any .locale suffix).
                stem = path.name.split(".", 1)[0]
                if stem not in allowlist:
                    continue
            if args.locale and locale != args.locale:
                continue
            page = f"{channel}_{slug}"
            scanned += 1
            original = path.read_text()
            rewritten = rewrite_content(original, page, locale)
            if rewritten == original:
                continue
            changed += 1
            if args.dry_run:
                print(f"would rewrite: {path.relative_to(ROOT)}")
            else:
                path.write_text(rewritten)
                print(f"rewrote: {path.relative_to(ROOT)}")

    print(
        f"\n{scanned} scanned, {changed} {'would change' if args.dry_run else 'changed'}."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
