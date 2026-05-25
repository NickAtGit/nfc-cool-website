#!/usr/bin/env python3
"""
Scaffold every translation file a new language needs, so adding a locale never
starts from a hand-maintained checklist.

The file list is DERIVED from the default-language files actually on disk under
each `localizableRoots` entry in `i18n.yaml` (skipping anything in `enOnly`), so
a new blog post or feature is picked up automatically. For each missing
`<base>.<locale>.<ext>` sibling it copies the default-language file verbatim and
injects a `⟦TODO:<locale>⟧` banner. That banner is a hard error in
`swift run Site i18n-check`, so a scaffolded-but-untranslated file cannot pass
the gate - translate the file, then delete the banner line.

The catalog (Strings/Localizable.json) and SiteConfig.yaml are NOT rewritten
here - they are single files and `i18n-check` hard-errors on a missing catalog
locale, so the printed next-steps cover them.

Usage:
    python3 Scripts/scaffold-locale.py pt              # create missing .pt siblings
    python3 Scripts/scaffold-locale.py pt --dry-run    # list what would be created
    python3 Scripts/scaffold-locale.py pt --force      # overwrite existing siblings
"""

from __future__ import annotations

import argparse
import fnmatch
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("PyYAML is required: pip3 install pyyaml")

ROOT = Path(__file__).resolve().parent.parent
EXT_FOR_KIND = {"markdown": "md", "yaml": "yaml"}


def load_yaml(path: Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def known_locales() -> tuple[str, list[str]]:
    """(default language, [additional languages]) from SiteConfig.yaml."""
    cfg = load_yaml(ROOT / "SiteConfig.yaml")
    loc = cfg.get("localization") or {}
    default = loc.get("defaultLanguage") or cfg.get("language") or "en"
    return default, list(loc.get("languages") or [])


def base_files(root: dict, additional_langs: list[str]) -> list[Path]:
    """Default-language files under a localizableRoots entry: the right
    extension, not a locale sibling, matching the optional glob."""
    directory = ROOT / root["path"]
    ext = EXT_FOR_KIND[root["kind"]]
    glob = root.get("glob")
    if not directory.is_dir():
        return []
    result: list[Path] = []
    for path in sorted(directory.iterdir()):
        if path.suffix != f".{ext}":
            continue
        stem_parts = path.name[: -len(ext) - 1].split(".")
        if len(stem_parts) > 1 and stem_parts[-1] in additional_langs:
            continue  # a locale sibling, not a base file
        if glob and not fnmatch.fnmatch(path.name, glob):
            continue
        result.append(path)
    return result


def is_en_only(path: Path, en_only: dict) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if rel in (en_only.get("files") or []):
        return True
    return any(rel == r or rel.startswith(r + "/") for r in (en_only.get("roots") or []))


def sibling_path(base: Path, locale: str) -> Path:
    ext = base.suffix.lstrip(".")
    stem = base.name[: -len(ext) - 1]
    return base.with_name(f"{stem}.{locale}.{ext}")


def inject_banner(text: str, kind: str, locale: str) -> str:
    note = (f"⟦TODO:{locale}⟧ machine-scaffolded copy of the default language - "
            f"translate every value, then delete this line.")
    if kind == "yaml":
        return f"# {note}\n{text}"
    lines = text.split("\n")
    if lines and lines[0].strip() == "---":  # insert inside the frontmatter
        return lines[0] + f"\n# {note}\n" + "\n".join(lines[1:])
    return f"<!-- {note} -->\n{text}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Scaffold translation files for a new locale.")
    parser.add_argument("locale", help="locale code to scaffold, e.g. 'pt'")
    parser.add_argument("--dry-run", action="store_true", help="list actions without writing")
    parser.add_argument("--force", action="store_true", help="overwrite existing siblings")
    args = parser.parse_args()

    locale = args.locale
    default_lang, additional = known_locales()
    if locale == default_lang:
        return f"'{locale}' is the default language - nothing to scaffold."
    # Treat the target as a known locale so its own siblings aren't re-scaffolded.
    additional = sorted(set(additional) | {locale})

    config = load_yaml(ROOT / "i18n.yaml")
    roots = config.get("localizableRoots") or []
    en_only = config.get("enOnly") or {}

    created, skipped = [], []
    for root in roots:
        for base in base_files(root, additional):
            if is_en_only(base, en_only):
                continue
            target = sibling_path(base, locale)
            rel = target.relative_to(ROOT).as_posix()
            if target.exists() and not args.force:
                skipped.append(rel)
                continue
            created.append(rel)
            if args.dry_run:
                continue
            content = inject_banner(base.read_text(encoding="utf-8"), root["kind"], locale)
            target.write_text(content, encoding="utf-8")

    verb = "Would create" if args.dry_run else "Created"
    print(f"{verb} {len(created)} '{locale}' file(s); {len(skipped)} already present.")
    for rel in created:
        print(f"  + {rel}")

    print(f"""
Next steps to finish adding '{locale}':
  1. SiteConfig.yaml: add "{locale}" to localization.languages and add a
     localeOverrides.{locale} block (navigation + footer titles; keep URLs).
  2. Strings/Localizable.json: add a "{locale}" entry to every key (translate
     each; set langFlag/langName for {locale}). i18n-check hard-errors on any
     catalog key missing a {locale} value.
  3. Translate every scaffolded file above, then delete its ⟦TODO:{locale}⟧ banner.
     Conventions: no em/en dashes (use ' - '), no decorative emojis, Title Case
     for English titles only, and feature/pricing tables must mirror the tiers
     in nfcreader's PaywallFeatures.swift.
  4. swift run Site i18n-check   # repeat until: 0 error(s)
  5. swift run Site build        # then spot-check /{locale}/
""")
    return 0


if __name__ == "__main__":
    sys.exit(main())
