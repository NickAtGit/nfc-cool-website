#!/usr/bin/env python3
"""Work out which pages a deploy changes, for the IndexNow announcement in deploy.yml.

Runs in the build job, after the build, while the previous site is still live:

1. fingerprints every URL in the built sitemaps from the page's title, description
   and main content, leaving out the blocks every page shares (newsletter, final
   call to action, ratings, related posts), so a template or asset change is not
   mistaken for changed pages,
2. fetches the fingerprints the live site published on its last deploy,
3. writes the new fingerprints into _Site, so this deploy publishes them for the next,
4. hands the URLs that differ to the deploy job as a ready-to-send IndexNow request.

It never calls the IndexNow API itself: the deploy job does, once the new site is
live. Anything that goes wrong here costs one announcement and nothing else. With no
live fingerprints to compare with (the first deploy, or a failed fetch) it announces
nothing and the next deploy compares against what this one published.

Safe to run locally after `swift run Site build`: it only prints what it would
announce, and `_Site/` is not committed.
"""

import hashlib
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

HOST = "nfc.cool"
KEY = "b40aa0ef7a78cd928861721cc3881a9c"  # Public by design: the protocol serves it at /<key>.txt.
MANIFEST = "indexnow-pages.json"
# A protocol request may carry 10,000 URLs. More than this many changed pages means a
# site-wide change rather than news, and the sitemaps already cover those.
MAX_URLS = 500

SITE_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("_Site")
SHARED_BLOCKS = re.compile(
    r'<(section|p)\b[^>]*\sclass="[^"]*\b(?:newsletter|landing-final-cta|landing-hero-trust|'
    r'blog-post-related|feature-related)\b[^"]*".*?</\1>',
    re.DOTALL,
)


def sitemap_paths() -> list[str]:
    paths = set()
    for sitemap in SITE_DIR.rglob("sitemap.xml"):
        locs = re.findall(r"<loc>https://" + re.escape(HOST) + r"(/[^<]*)</loc>", sitemap.read_text("utf-8"))
        paths.update(locs)
    return sorted(paths)


def fingerprint(html: str) -> str:
    head = html.split("</head>", 1)[0]
    title = re.search(r"<title>.*?</title>", head, re.DOTALL)
    description = re.search(r'<meta\s+name="description"[^>]*>', head)
    main = re.search(r"<main\b.*</main>", html, re.DOTALL)
    parts = [m.group(0) for m in (title, description, main) if m]
    return hashlib.sha256(SHARED_BLOCKS.sub("", "".join(parts)).encode()).hexdigest()[:12]


def live_manifest() -> dict | None:
    # The query string gets past the CDN's 10-minute cache of the previous deploy.
    url = f"https://{HOST}/{MANIFEST}?run={os.environ.get('GITHUB_RUN_ID', 'local')}"
    try:
        with urllib.request.urlopen(url, timeout=20) as response:
            return json.load(response)
    except (OSError, ValueError) as error:
        print(f"No live fingerprints to compare with ({error}).")
        return None


def main() -> None:
    pages = {}
    for path in sitemap_paths():
        page = SITE_DIR / path.lstrip("/") / "index.html"
        if page.is_file():
            pages[path] = fingerprint(page.read_text("utf-8", errors="replace"))

    previous = live_manifest()
    (SITE_DIR / MANIFEST).write_text(json.dumps(pages, separators=(",", ":")), "utf-8")
    print(f"{len(pages)} pages fingerprinted into {MANIFEST}.")
    if previous is None:
        return

    # A page that left the sitemaps counts too: the protocol asks for removals as well.
    changed = [path for path in pages if previous.get(path) != pages[path]]
    changed += [path for path in previous if path not in pages]
    print(f"{len(changed)} changed since the live deploy.")
    for path in changed[:50]:
        print(f"  {path}")
    if not changed:
        return
    if len(changed) > MAX_URLS:
        print(f"More than {MAX_URLS} is a site-wide change, so nothing is announced.")
        return

    payload = json.dumps(
        {
            "host": HOST,
            "key": KEY,
            "keyLocation": f"https://{HOST}/{KEY}.txt",
            "urlList": [f"https://{HOST}{path}" for path in changed],
        },
        separators=(",", ":"),
    )
    output = os.environ.get("GITHUB_OUTPUT")
    if output:
        with open(output, "a", encoding="utf-8") as handle:
            handle.write(f"payload={payload}\n")


if __name__ == "__main__":
    main()
