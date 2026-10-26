#!/usr/bin/env python3
"""
Deterministic lint for the Ukrainian (`uk`) locale.

`swift run Site i18n-check` gates what is checkable for every locale at once:
missing siblings, leftover ⟦TODO⟧ markers, em dashes, per-locale quote styles.
This script covers the tells that are specific to Ukrainian.

Ukrainian's characteristic failure mode is not awkwardness, it is **Russian
showing through**: a form that a spellchecker accepts, that a reader who knows
both languages does not notice, and that a Ukrainian reader spots in the first
sentence. Most of the rules below exist for that one reason.

  errors
    - `ы э ъ ё` anywhere. These letters are NOT in the Ukrainian alphabet, so
      one of them means Russian text leaked in. Zero false positives possible.
    - `-тся`. The Ukrainian reflexive ending is always `-ться`; `-тся` is a
      Russian verb that was never translated.
    - a word-initial `и`, and a curated list of Russian function words that
      happen to be spelled with Ukrainian-legal letters (`если`, `его`,
      `сейчас`, `можно`, `после`). `перед`, `через`, `просто` and `тебе` are
      identical in both languages and are deliberately NOT on that list.
    - surzhyk and russianisms: `являється`, `включити` for "turn on",
      `на протязі`, `приймати участь`, `відмінити`, `співпадати`,
      `в залежності від`, `при допомозі`, `не дивлячись на`, `тим не менше`,
      `по` + dative plural, `скачати`. See the style guide §4.3.
    - active present participles (`існуючий`, `працюючий`, `скануючий`).
      Ukrainian does not form them; Russian does. §4.4.
    - a missing apostrophe in the fixed list of words that require one
      (`комп'ютер`, `об'єкт`, `пам'ять`, `з'єднання`). §4.5.
    - `проект` for `проєкт` and `пресса` for `преса` (2019 orthography).
    - a `ви` form of any kind. This locale is `ти`-only (see the style guide),
      so `ви / вас / вам / ваш` and the ви-imperatives (`піднесіть`,
      `натисніть`) are register leaks, not style drift.
    - mixed Cyrillic and Latin inside one word. `a c e i o p x y B E I K M H`
      exist in both alphabets, and Ukrainian adds the worst pair of all:
      Latin `i` and Cyrillic `і` are the same glyph. Invisible to proofreading;
      trivial for a regex.
    - em / en dashes, banned house-wide - AND ` - ` standing in for one, which
      is the substitution a translator reaches for next and reads worse than
      either. Ukrainian restructures instead; see the style guide §5.
    - `X це Y`, the copula that would need the banned dash. §5.1.
    - glossary violations: `NFC-тег` (it is `NFC-мітка`; `тег` is reserved for
      the blog's own tag chips), `бекап`, `гайд`, `фіча`, `додаток`, `юзер`,
      `девайс`, and `тапнути` for an NFC tap.
    - English curly quotes, the curly apostrophe (this locale pins the ASCII
      `'`), and English thousands separators (`73,500`).
    - ASCII `"` in a YAML value or in markdown frontmatter. i18n-check's quote
      rule covers markdown BODY prose only, so this closes that gap - the
      structural quotes YAML puts around a scalar are stripped first.

  warnings (advisory - style drift, not a hard gate)
    - `можеш` density: English leans on "you can"; Ukrainian prefers the bare
      imperative.
    - explicit `ти / твій`: the person is already carried by the verb ending,
      so writing the pronoun out is emphatic and should be rare.
    - officialese density (`здійснювати`, `даний`, `шляхом`, `з метою`).

Two things are deliberately NOT linted, and the style guide says so: euphony
(`у`/`в`, `і`/`й`), which needs a phonetic model, and `у якості` / `на рахунок`,
which are russianisms in one sense and correct Ukrainian in another
(`різниця у якості`, `переказ на рахунок`) with no signal to separate them.

Prose only. Identifier frontmatter, fenced and inline code, HTML tags and
attributes, and URLs are stripped before matching - but prose-bearing
frontmatter (`title`, `summary`, `imageAlt`, `metaDescription`, …) is KEPT,
because that is what a card and a search result actually show.

The register, glossary and calque traps this cannot check are in
`Scripts/ukrainian-style-guide.md`.

Usage:
    python3 Scripts/lint-ukrainian.py               # every *.uk.md / *.uk.yaml
    python3 Scripts/lint-ukrainian.py <path>...     # only these files
    python3 Scripts/lint-ukrainian.py --quiet       # errors only, no warnings
    python3 Scripts/lint-ukrainian.py --selftest    # check the rules themselves

Exit code is non-zero when any error is found; warnings never fail the run.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Every Cyrillic letter that can appear in a `uk` file, INCLUDING the four that
# must not (`ы э ъ ё`) - the mixed-script rule has to see them to report them.
CYR = "А-Яа-яЁёІіЇїЄєҐґ"

# ви-forms. Every one of these is a register leak in a ти-only locale.
VY_PRONOUNS = r"ви|вас|вам|вами|ваш(?:а|е|і|ого|ому|ій|ої|ою|им|ими|их|у|ту)?"

# ви-imperatives and 2pl indicatives that would leak in from a ви draft.
# Listed explicitly rather than matched by ending: an ending-based rule would
# have to guess, and Ukrainian imperative plurals (`-іть`, `-те`) collide with
# ordinary noun and verb forms.
VY_VERBS = [
    "піднесіть", "натисніть", "відкрийте", "закрийте", "виберіть", "запишіть",
    "зчитайте", "прочитайте", "завантажте", "встановіть", "спробуйте",
    "подивіться", "перевірте", "переконайтеся", "переконайтесь", "надішліть",
    "введіть", "додайте", "створіть", "збережіть", "увімкніть", "вимкніть",
    "торкніться", "тримайте", "використовуйте", "почніть", "перейдіть",
    "можете", "хочете", "знаєте", "отримаєте", "побачите", "зможете",
    "знайдете", "зробіть", "напишіть", "вкажіть", "налаштуйте", "скажіть",
]

# Russian function words spelled entirely with letters Ukrainian also has, so
# no other rule would catch them. Words identical in both languages (`перед`,
# `через`, `просто`, `тебе`, `теж`) are deliberately absent.
RUSSIAN_WORDS = [
    "если", "его", "ему", "него", "нее", "неё", "также", "тоже", "очень",
    "сейчас", "нужно", "можно", "здесь", "когда", "потому", "после", "между",
    "около", "всегда", "никогда", "даже", "более", "только", "сделать",
    "сделал", "хочешь", "может", "должен", "просто́", "потом", "всего",
    "именно", "почти", "снова", "лучше", "больше", "меньше", "чтоб",
]

# Words that MUST carry an apostrophe. Listed in their broken (apostrophe-less)
# form, which is the defect being caught.
APOSTROPHE_WORDS = [
    r"комп[юя]тер\w*", r"об[’']?єкт\w*".replace("[’']?", ""), r"обєм\w*",
    r"п[’']?ять".replace("[’']?", ""), r"девят\w*", r"імя\b", r"імям\w*",
    r"памят\w*", r"звязк\w*", r"звязок\b", r"звязан\w*", r"зєдна\w*",
    r"розєм\w*", r"мяк\w*", r"премєр\w*", r"інтервю\w*", r"барєр\w*",
    r"здоровя\b", r"сімя\b", r"вязк\w*", r"пятдесят\w*", r"обява\w*",
]

# Surzhyk and russianisms. Left is what a translator thinking in Russian
# writes; the message says what to write instead.
RUSSIANISMS = [
    # The lookbehind is load-bearing: `'` is not a word character, so a bare
    # `\bявля…` also matches inside `з'являється`, which is correct Ukrainian
    # and was flagged on the first run over the locale.
    (r"(?<!')\bявля[єю]тьс\w*|\bпредставля[єю]\s+собою\b",
     "`являється` is surzhyk - drop the copula or use a verb (style guide §5)"),
    # Shape is load-bearing, the same way the `ru` lint's `подключение` rule is.
    # The device sense (`включити`, `включений`, `включено`) is wrong here, but
    # the verbal noun `включення` ("inclusion") and the adverb `включно` are
    # ordinary correct Ukrainian - both must stay unflagged.
    (r"\bвключ(?:и|ен(?!ня))\w*|\bвиключ(?:и|ен(?!ня))\w*",
     "a device is `увімкнути` / `вимкнути`, never `включити` / `виключити` "
     "(`включно` and `включення` are correct and are not matched)"),
    (r"\bна протязі\b", "`протягом` - `на протязі` means «in a draught»"),
    (r"\bпри(?:ймати|йняти|ймає|ймаю|йму)\s+участь\b", "`брати участь`"),
    (r"\bпри(?:ймати|йняти|ймає|ймаю|йму)\s+рішення\b", "`ухвалювати рішення`"),
    (r"\bвідміни(?:ти|в|ла|ло|ли|ть)\b|\bвідміню\b|\bвідмінять\b",
     "`скасувати` (`відмінний` = excellent is a different word and is not matched)"),
    (r"\bслідуюч\w*", "`наступний`"),
    (r"\bнаступним чином\b", "`так` / `ось як`"),
    (r"\bспівпада\w*|\bспівпаді\w*", "`збігатися` / `збіг`"),
    (r"\bв залежності від\b", "`залежно від`"),
    (r"\bпри допомозі\b|\bпри умові\b", "`за допомогою` / `за умови`"),
    (r"\bне дивлячись на\b", "`незважаючи на`"),
    (r"\bтим не менше\b", "`однак` / `а проте`"),
    (r"\bв кінці кінців\b", "`зрештою` / `врешті-решт`"),
    (r"\bзаключа[єю]тьс\w*", "`полягає`"),
    (r"\bміроприємств\w*", "`захід`"),
    (r"\bбувш(?:ий|ого|ому|им|ій|ої|ою|а|е|і|у)\b", "`колишній`"),
    (r"\bнаглядн\w*", "`наочний`"),
    (r"\bтак як\b", "causal `так як` is a russianism - `оскільки` / `бо`"),
    (r"\bсамий\s+(?:кращ|найкращ|більш|менш|швидк|прост|надійн|зручн|дешев|дорог|велик)\w*",
     "Ukrainian forms the superlative with `най-`: `найкращий`, not `самий кращий`"),
    (r"\bпо\s+[а-яіїєґ]+(?:ам|ям)\b",
     "`по` + dative plural is Russian - Ukrainian takes the locative "
     "(`по містах`) or another preposition (`за темами`, `з налаштування`)"),
    (r"\bскача(?:ти|в|ла|ло|ли|ю|єш|є|ють)\b|\bскачай\w*", "`завантажити`"),
]

# Active present participles. Ukrainian has no productive form for these, so
# each one is Russian grammar in Ukrainian spelling. Matched as stem + an
# ADJECTIVAL ending, so the gerunds (`працюючи`, `скануючи`) stay clean.
PARTICIPLE_STEMS = [
    "існу", "працю", "скану", "оточу", "керу", "бажа", "викону", "зроста",
    "ді", "наступа", "контролю", "доміну", "лідиру", "пишу", "читаю",
    "розділя", "об'єдну", "спрощу",
]
PARTICIPLE_ENDING = r"(?:ий|а|е|і|ого|ому|им|ім|ій|ої|ою|у|их|ими)"

# Fixed glossary violations - the word is simply wrong for this site.
GLOSSARY = [
    (r"NFC[-\s]?тег\w*|тег\w*\s+NFC", "NFC hardware is a `мітка`, never a `тег`"),
    (r"\bбекап\w*|\bбэкап\w*", "`резервна копія`, not `бекап`"),
    (r"\bгайд\w*", "`посібник` / `інструкція`, not `гайд`"),
    (r"\bфіч[аиіеу]\w*", "`функція` / `можливість`, not `фіча`"),
    (r"\bдодат(?:ок|ка|ку|ком|ки|ків|кам|ках|кові)\b",
     "an app is a `застосунок` - `додаток` is the russianism from `приложение` "
     "(`додатково` is a different word and is not matched)"),
    (r"\bюзер\w*", "`користувач`"),
    (r"\bдевайс\w*", "`пристрій`"),
    (r"\bтапн\w*|\bтапа(?:ти|є|ють)\b",
     "NFC: `піднести`. A UI tap is `натиснути` / `торкнутися`"),
    (r"\bклонуванн\w*\s+Amiibo|Amiibo[- ]клон\w*",
     "Amiibo: `резервне копіювання і відновлення`, never `клонування`"),
    (r"\bпроект\w*", "2019 orthography: `проєкт`"),
    (r"\bпресс\w*", "`преса` has one `с`"),
]

# Phrases where a rule hit is legitimate. Keep short and specific - it is an
# escape hatch, not a policy.
ALLOWED_PHRASES = [
    "теги блогу",       # the blog's own tag chips, which ARE `теги`
    "Усі теги",
    "тегами",
    # A product name that contains a spaced hyphen. It is the App Store title,
    # allowlisted in i18n.yaml too, so it cannot be restructured away.
    "1st Class - Flight Tracker",
    # The brand separator in a page title or an image alt (`… - NFC.cool Tools`,
    # `NFC.cool - сканування…`). That hyphen is a label delimiter, the same one
    # every locale uses including `en`, not a dash standing in for `—`.
    " - NFC.cool",
    "NFC.cool - ",
    # NFC.cool Tools' own Ukrainian label for the "Save for later" toggle on
    # the Password Protection screen. Posts quote it verbatim so it matches
    # the screen, even though it is a ви-imperative.
    "Збережіть на потім",
]

# --- The copula `X це Y` ---------------------------------------------------
# Ukrainian puts a dash between a subject and a predicate noun when the copula
# is omitted, and the dash goes before `це`: `NFC-мітка — це чип`. This locale
# bans the dash, so that whole shape has to be restructured (style guide §5.1),
# which makes every occurrence a defect.
#
# The hard part is that `це` is also a subject pronoun (`Для NFC це значення
# запису NDEF`), an object (`Лічильник дотиків це використовує`) and a
# determiner (`усе це`). Telling those apart needs to know whether the word
# before it heads a nominative subject. Three signals do it well enough:
#   1. what OPENS the clause - a preposition or question word means `це` is the
#      subject, and the clause is fine;
#   2. what sits immediately BEFORE `це` - a preposition, particle or verb
#      makes it an object or determiner;
#   3. what FOLLOWS `це` - a verb or predicative adverb is not a predicate noun.
# Signals 2 and 3 only ever SUPPRESS, so a gap there costs a missed defect
# rather than a false alarm on correct prose.
COPULA_TRANSPARENT = {"але", "а", "і", "й", "однак", "проте", "натомість",
                      "тут", "тепер", "також"}

COPULA_OPENERS = set("""
в у на за під по про для з із зі від до к через над перед
без між навколо після замість крім заради серед при
що чим чому чого хто кого кому як який яка яке які де куди звідки
коли навіщо скільки котрий котра котре котрі щоб якщо чи
формально поки спочатку потім тепер тоді там сюди туди вже ще
саме лише тільки просто нарешті звичайно можливо ймовірно тому отже однак
усе все це те ось так ні не ані або
часто зазвичай адже втім радше мабуть хіба невже
вперше сьогодні вчора завтра раніше пізніше всюди скрізь
зовні всередині зверху знизу зліва справа попереду позаду поруч
""".split())

COPULA_PRE_STOP = {"чи", "усе", "все", "це", "те", "ось", "і", "й", "а", "але",
                   "так", "би", "б", "не", "ні", "же", "ж", "саме", "хіба", "аж"}

COPULA_PREPOSITIONS = set("""
в у на за під по про для з із зі від до к через над перед
без між навколо після замість крім заради серед при
""".split())

COPULA_POST_STOP = {"не", "ні", "теж", "також", "уже", "вже", "ще", "же", "ж",
                    "би", "б", "чи", "і", "й", "сам", "сама", "самі"}

COPULA_PREDICATIVE = set("""
вірно можливо важливо потрібно треба добре погано зрозуміло ясно легко просто
зручно корисно нормально правда неправда очевидно логічно дивно цікаво
""".split())

COPULA_PAST_MODAL = {"зміг", "змогла", "змогли", "міг", "могла", "могли",
                     "допоміг", "хотів", "хотіла", "вирішив", "вирішила"}

COPULA_IMPERATIVE = {"порівняй", "збери", "спробуй", "запиши", "зчитай",
                     "перевір", "подивись", "подивися", "відкрий", "натисни",
                     "піднеси", "візьми", "зроби", "дивись", "читай", "бери",
                     "почни", "думай", "знай"}

_COPULA_VERB_END = re.compile(
    r"(?:ає|ають|яє|яють|ує|ують|ить|ать|ять|еш|єш|иш|ємо|имо|ете|єте|ите|"
    r"ться|ся|аю|яю|ую|юю|ю|ив|ила|ило|или|ав|ала|ало|али|ів|іла|іло|іли|ув|ула|уло|ули|"
    r"ла|ло|ли|уть|ють)$")
# Real infinitive endings only. A blanket `ти$` would swallow every genitive
# singular in `-оти` / `-іти` and suppress far more than it should.
_COPULA_NONFINITE = re.compile(
    r"(?:ати|ити|іти|ути|яти|ести|исти|асти|ерти|орти|огти|екти|очи|чи)$")

_ALNUM = "A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9"
_CW = rf"[{_ALNUM}]+(?:[.\-_'][{_ALNUM}]+)*"     # NFC.cool, 3D-сканер, об'єкт
_EMPH = r"[*_«\"‘“]*"                 # markdown emphasis / opening quotes
# The clause separators are same-line on purpose. `\s+` here used to swallow a
# blank line, so a colon ending a `### Heading:` reached into the NEXT paragraph
# and read `…тариф Що це таке` as one clause. `^` (re.M) already covers every
# line start, so crossing a newline bought nothing and cost a false positive.
COPULA_PATTERN = (
    rf"(?:^|[.!?:;»)\]][^\S\n]+|,[^\S\n]+|\n)[^\S\n]*{_EMPH}"
    rf"(?P<subj>(?:{_CW}{_EMPH}[^\S\n]+{_EMPH}){{0,5}}{_CW})"
    rf"{_EMPH}[^\S\n]+це[^\S\n]+{_EMPH}(?P<after>{_CW})")


def copula_is_defect(match: re.Match) -> bool:
    """True when `це` is the second half of a copula that needs a dash."""
    subj = match.group("subj").split()
    after = match.group("after").lower()
    while subj and subj[0].lower() in COPULA_TRANSPARENT:
        subj = subj[1:]
    if not subj:
        return False
    if subj[0].lower() in COPULA_OPENERS:
        return False                              # a preposition opens the clause
    last = subj[-1].lower()
    if last in COPULA_PRE_STOP or last in COPULA_PREPOSITIONS:
        return False                              # `на це`, `усе це`
    if (_COPULA_VERB_END.search(last) or _COPULA_NONFINITE.search(last)
            or last in COPULA_IMPERATIVE or last in COPULA_PAST_MODAL):
        return False                              # `зробити це` -> object
    if (after in COPULA_PREDICATIVE or after in COPULA_POST_STOP
            or _COPULA_VERB_END.search(after)):
        return False                              # `це працює`, `це вірно`
    return True


# Rules whose regex is only the candidate finder; the predicate decides.
SUPPRESSORS = {"copula-tse": lambda m: not copula_is_defect(m)}

# (name, pattern, explanation, regex flags)
ERROR_RULES: list[tuple[str, str, str, int]] = [
    (
        "russian-letter",
        r"[ыэъёЫЭЪЁ]",
        "`ы э ъ ё` are not in the Ukrainian alphabet - this is Russian text",
        0,
    ),
    (
        "russian-tsya",
        r"\w+тся\b",
        "Ukrainian always writes `-ться` (`відкривається`, `може відкритися`) - "
        "`-тся` is a Russian verb that was not translated",
        re.I,
    ),
    (
        "word-initial-y",
        r"(?<![\w'])и[а-яіїєґ]",
        "no Ukrainian word begins with `и` - this is a Russian word",
        re.I,
    ),
    (
        "russian-word",
        r"\b(?:" + "|".join(RUSSIAN_WORDS) + r")\b",
        "Russian word left untranslated",
        re.I,
    ),
    (
        "vy-register",
        r"\b(?:" + VY_PRONOUNS + r")\b",
        "this locale is `ти`-only - a `ви` form is a register leak",
        re.I,
    ),
    (
        "vy-verb",
        r"\b(?:" + "|".join(VY_VERBS) + r")\b",
        "ви-form verb - use the `ти` imperative (`піднеси`, `натисни`, `вибери`)",
        re.I,
    ),
    (
        "mixed-script",
        rf"[A-Za-z{CYR}]*(?:[A-Za-z][{CYR}]|[{CYR}][A-Za-z])[A-Za-z{CYR}]*",
        "Latin and Cyrillic mixed inside one word - `a c e i o p x y` look "
        "identical (Latin `i` and Cyrillic `і` especially) but break search, "
        "spellcheck and screen readers",
        0,
    ),
    ("dash", r"[—–]", "em/en dash - restructure the sentence (style guide §5)", 0),
    (
        "hyphen-as-dash",
        r"(?<=\S) - (?=\S)",
        "a hyphen standing in for a dash reads worse than either - restructure "
        "with a verb, `і` / `а`, a colon, or parentheses (style guide §5)",
        0,
    ),
    (
        "missing-apostrophe",
        r"\b(?:" + "|".join(APOSTROPHE_WORDS) + r")",
        "this word needs an apostrophe (`комп'ютер`, `об'єкт`, `пам'ять`, "
        "`з'єднання`) - style guide §4.5",
        re.I,
    ),
    (
        "curly-apostrophe",
        r"’",
        "this locale pins the ASCII apostrophe `'` - style guide §4.5",
        0,
    ),
    (
        "active-participle",
        r"\b(?:" + "|".join(PARTICIPLE_STEMS) + r")юч" + PARTICIPLE_ENDING + r"\b",
        "Ukrainian has no active present participle - rewrite as a clause "
        "(`який сканує`) or a plain adjective (`наявний`, `робочий`)",
        re.I,
    ),
    (
        "copula-tse",
        COPULA_PATTERN,
        "`X це Y` needs a dash before `це` in Ukrainian, and this locale bans "
        "the dash - restructure with a verb or a locative (style guide §5.1)",
        re.M,
    ),
    (
        "curly-quote",
        r"[“”]",
        "English curly quotes - Ukrainian prose uses «…» (nested: „…“)",
        0,
    ),
    (
        "number-format",
        r"\b\d{1,3},\d{3}\b",
        "English thousands separator - Ukrainian groups with a non-breaking "
        "space (73 500) and uses the comma as a DECIMAL point (4,7)",
        0,
    ),
    (
        "ascii-quote",
        r"\"",
        "straight ASCII quote in a value i18n-check does not reach "
        "(YAML scalar or markdown frontmatter) - use «…»",
        0,
    ),
]

WARNING_RULES: list[tuple[str, str, float, str]] = [
    (
        "mozhesh-density",
        r"\bможеш\b",
        1.0,
        "\"you can\" fatigue - prefer the bare imperative (`запиши`, not "
        "`ти можеш записати`)",
    ),
    (
        "pronoun-density",
        r"\b(?:ти|тебе|тобі|тобою|тві(?:й|м|х)|тво(?:я|є|ї|го|му|їм|їх|єю|ю|їми))\b",
        1.2,
        "the person is already carried by the verb ending - writing `ти / твій` "
        "out is emphatic and should be rare",
    ),
    (
        "officialese-density",
        r"\bздійсн\w*|\bшляхом\b|\bз метою\b|\bдан(?:ий|ого|ому|им|ій|ої|ою|у)\b|"
        r"\bнаявн(?:ість|ості)\b|\bздатн(?:ість|ості)\b",
        0.5,
        "officialese - marketing prose uses plain verbs "
        "(`записати`, not `здійснити запис`)",
    ),
]

SELFTEST: list[tuple[str, str | None]] = [
    # (prose fragment, expected rule name or None when it must stay clean)
    # -- correct Ukrainian that must NOT trip anything ------------------------
    ("Піднеси iPhone до мітки, і посилання відкриється саме", None),
    ("NFC-мітка працює без батарейки", None),
    ("Застосунок зчитує мітку і показує вміст", None),
    ("Wi-Fi, AirDrop і NameDrop працюють на iPhone", None),
    ("3D-сканування об'єктів і сканування приміщення", None),
    ("Мітка легко зчитується, і лічильник росте", None),
    ("Посилання може відкритися у браузері", None),
    ("Оцінка 4,7 і 73 500 відгуків", None),
    ("Той самий бренд, знайомий тобі з iPhone", None),
    ("Дані обробляються на пристрої, і нічого не йде на сервер", None),
    ("Комп'ютер, пам'ять, з'єднання, об'єкт, ім'я, п'ять", None),
    ("Це працює включно з Android", None),
    ("Включення до списку відбувається вручну", None),   # verbal noun, correct
    ("Виключення з переліку теж можливе", None),
    ("Відмінний результат і помітна відмінність", None),
    ("Сканування документів працює лише на iOS", None),
    ("Наявні мітки, які сканує застосунок", None),
    ("Читаючи документацію, я знайшов помилку", None),
    ("Скануючи кімнату, тримай телефон рівно", None),
    ("- пункт списку", None),
    ("  - пункт списку", None),
    ("будь-який чип, по-своєму зручно", None),
    ("Android читає мітки, а сканери камери лише на iOS", None),
    ("Теги блогу допомагають знайти статтю", None),
    ("Історія оновлень і Політика конфіденційності", None),
    ("Проєкт відкритий, і преса про нього писала", None),
    ("Перед тим як писати, перевір чип через застосунок", None),
    ("Просто піднеси телефон, і тебе це не здивує", None),
    # -- Russian leaking through ---------------------------------------------
    ("Приложение считывает метку", "russian-letter"),        # `ы` in `считывает`
    ("Это метка", "russian-letter"),
    ("Мітка открывается сама", "russian-tsya"),
    ("Из коробки все работает", "word-initial-y"),
    ("Если мітка поруч", "russian-word"),
    ("Сейчас застосунок зчитує мітку", "russian-word"),
    ("Можно записати посилання", "russian-word"),
    # -- surzhyk and russianisms ---------------------------------------------
    ("NFC-мітка являється чипом", "russianism"),
    ("Кнопка з'являється у меню", None),          # correct: apostrophe boundary
    ("Нові мітки з'являються щороку", None),
    ("Включи NFC у налаштуваннях", "russianism"),
    ("Виключений NFC не зчитає мітку", "russianism"),
    ("На протязі року все працювало", "russianism"),
    ("Можна прийняти участь у бета-тесті", "russianism"),
    ("Підписку можна відмінити будь-коли", "russianism"),
    ("Слідуючий крок простий", "russianism"),
    ("В залежності від чипа", "russianism"),
    ("При допомозі застосунку", "russianism"),
    ("Не дивлячись на це, мітка працює", "russianism"),
    ("Інструкція по налаштуванням", "russianism"),
    ("Скачати застосунок можна безкоштовно", "russianism"),
    ("Самий кращий чип у родині", "russianism"),
    ("Так як мітка пасивна, батарейка не потрібна", "russianism"),
    # -- active participles ---------------------------------------------------
    ("Існуючі мітки треба перезаписати", "active-participle"),
    ("Працюючий вебхук отримає запит", "active-participle"),
    ("Застосунок, скануючий документи", "active-participle"),
    # -- orthography and glossary --------------------------------------------
    ("Компютер не бачить мітку", "missing-apostrophe"),
    ("Обєкт відсканований", "missing-apostrophe"),
    ("Память чипа обмежена", "missing-apostrophe"),
    ("Це проект з відкритим кодом", "glossary"),
    ("Пресса про нас писала", "glossary"),
    ("Запиши на NFC-тег посилання", "glossary"),
    ("Зроби бекап Amiibo", "glossary"),
    ("Просто тапни по мітці", "glossary"),
    ("Завантаж додаток з App Store", "glossary"),
    ("Юзер відкриває девайс", "glossary"),
    ("Додатково перевір налаштування", None),
    # -- register -------------------------------------------------------------
    ("Піднесіть телефон до мітки", "vy-verb"),
    ("Ви можете записати посилання", "vy-register"),
    ("Це ваша мітка", "vy-register"),
    # -- script, dashes, quotes, numbers -------------------------------------
    ("сkанер документів", "mixed-script"),          # Latin k
    ("мiтка на столі", "mixed-script"),             # Latin i for Cyrillic і
    ("NFC-мітка - це чип", "hyphen-as-dash"),
    ("NFC-мітка — це чип", "dash"),
    ("Він сказав “привіт”", "curly-quote"),
    ("Дані об’єкта", "curly-apostrophe"),
    ("73,500 відгуків", "number-format"),
    ('title: "Можливості"', "ascii-quote"),
    # -- the copula, which needs a dash this locale cannot use ---------------
    ("NFC-мітка це невеликий пасивний чип", "copula-tse"),
    ("Паперова візитівка це застиглий артефакт.", "copula-tse"),
    ("Amiibo це саме чипи NTAG215.", "copula-tse"),
    ("NTAG216 від NXP це найємніший чип у родині.", "copula-tse"),
    ("Застосунок для iPhone це повний набір для сканування.", "copula-tse"),
    ("Найпростіше розкладання це **один стовпець**.", "copula-tse"),
    # a colon ending a heading must not reach into the next paragraph
    ("### 2. Wave Connect: найкращий тариф\n\nЩо це таке", None),
    # -- `це` as subject, object or determiner: all correct, none flagged ----
    ("Для NFC це значення запису NDEF, посилання або текст.", None),
    ("Лічильник дотиків це використовує: мітка налаштовується так.", None),
    ("І все це так само виходить з-під однієї клавіатури.", None),
    ("На iPhone це робить безкоштовний застосунок NFC.cool.", None),
    ("Формально це вірно майже для будь-якого чипа NTAG.", None),
    ("Чи працює це на iPhone?", None),
    ("Безкоштовно там, де це можливо.", None),
    ("Зовні це звичайна NFC-мітка.", None),
    ("Кожен гість скаже за це дякую.", None),
    ("Спробуй зробити це з п'ятьмастами картками.", None),
    ("Я вважаю це важливим для приватності.", None),
    ("а більшості рівно це й потрібно", None),
]


def compiled_error_rules() -> list[tuple[str, re.Pattern, str]]:
    rules = [(name, re.compile(pat, flags), why) for name, pat, why, flags in ERROR_RULES]
    rules += [("glossary", re.compile(pat, re.I), why) for pat, why in GLOSSARY]
    rules += [("russianism", re.compile(pat, re.I), why) for pat, why in RUSSIANISMS]
    return rules


def selftest() -> int:
    failures = 0
    rules = compiled_error_rules()
    for prose, expected in SELFTEST:
        hits = set()
        for name, pattern, _ in rules:
            for m in pattern.finditer(prose):
                if SUPPRESSORS.get(name, lambda _m: False)(m):
                    continue
                hits.add(name)
                break
        if expected is None and hits:
            print(f"  [SELFTEST] false positive on correct Ukrainian: "
                  f"{prose!r} -> {sorted(hits)}")
            failures += 1
        elif expected is not None and expected not in hits:
            print(f"  [SELFTEST] missed {expected} on {prose!r} -> {sorted(hits) or 'nothing'}")
            failures += 1
    print(f"lint-ukrainian selftest: {len(SELFTEST)} case(s), {failures} failure(s)")
    return 1 if failures else 0


FENCED = re.compile(r"```.*?```", re.S)
INLINE_CODE = re.compile(r"`[^`\n]*`")
SCRIPT_STYLE = re.compile(r"<(script|style)\b[^>]*>.*?</\1\s*>", re.S | re.I)
# HTML code blocks are code, so their CONTENTS are blanked, not just the tags.
PRE_CODE = re.compile(r"<(pre|code)\b[^>]*>.*?</\1\s*>", re.S | re.I)
HTML_TAG = re.compile(r"<[^>\n]+>")
# A bare brand mention (`NFC.cool`) is prose, not a link: blanking it hid every
# `NFC.cool це …` from the copula rule, which is exactly where the site says it.
# So a schemeless domain is only stripped when it actually carries a path.
URL = re.compile(r"https?://\S+|\b[\w.-]+\.(?:com|org|net|io|cool|dev|pt|de|tr|ru|ua)/\S*")
MD_LINK_TARGET = re.compile(r"\]\([^)\n]*\)")
PATH_LIKE = re.compile(r"/[A-Za-z0-9._~%-]+(?:/[A-Za-z0-9._~%-]*)+")
YAML_COMMENT = re.compile(r"^\s*#.*$", re.M)

ID_KEYS = (
    r"slug|id|date|author|tags|url|image|ogImage|platforms|values|columns|"
    r"[A-Za-z]*[Pp]ath|[A-Za-z]*URL|[A-Za-z]*[Ii]con|badge|rating|count|"
    r"width|height|order|layout|type|theme|color"
)
ID_VALUE = re.compile(rf"^\s*-?\s*(?:{ID_KEYS})\s*:.*$", re.M)
QUOTED_SCALAR = re.compile(r'^(\s*(?:-\s*)?(?:[\w.]+\s*:\s*)?)"(.*)"(\s*)$', re.M)


def blank(match: re.Match) -> str:
    """Replace a span with same-length whitespace so offsets stay put."""
    return re.sub(r"\S", " ", match.group(0))


def unquote_scalars(text: str) -> str:
    """Blank the structural quotes around a YAML scalar, keeping its prose."""
    return QUOTED_SCALAR.sub(lambda m: f"{m.group(1)} {m.group(2)} {m.group(3)}", text)


def strip_structure(text: str, path: Path) -> str:
    """Blank identifier values and structural quoting, keeping line numbers
    stable so reported positions still point at the real line."""
    if path.suffix == ".yaml":
        return unquote_scalars(ID_VALUE.sub(blank, YAML_COMMENT.sub(blank, text)))
    if not text.startswith("---\n"):
        return text
    end = text.find("\n---\n", 4)
    if end == -1:
        return text
    head = unquote_scalars(ID_VALUE.sub(blank, text[: end + 1]))
    return head + text[end + 1 :]


def prose_of(path: Path) -> tuple[str, int]:
    text = path.read_text(encoding="utf-8")
    body = strip_structure(text, path)
    for pattern in (SCRIPT_STYLE, PRE_CODE, FENCED, INLINE_CODE, HTML_TAG, URL,
                    MD_LINK_TARGET, PATH_LIKE):
        body = pattern.sub(blank, body)
    return body, len(body.split())


def line_of(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def check(path: Path, quiet: bool) -> tuple[list[str], list[str]]:
    prose, words = prose_of(path)
    rel = path.relative_to(ROOT) if path.is_relative_to(ROOT) else path
    errors, warnings = [], []

    allowed = [
        (m.start(), m.end())
        for phrase in ALLOWED_PHRASES
        for m in re.finditer(re.escape(phrase), prose, re.I)
    ]

    for name, pattern, explanation in compiled_error_rules():
        suppress = SUPPRESSORS.get(name, lambda _m: False)
        for m in pattern.finditer(prose):
            if any(start <= m.start() and m.end() <= end for start, end in allowed):
                continue
            if suppress(m):
                continue
            errors.append(
                f"  [ERROR] {rel}:{line_of(prose, m.start())} [{name}] "
                f"\"{m.group(0).strip()}\" - {explanation}"
            )

    if not quiet and words >= 150:
        for name, pattern, per_hundred, explanation in WARNING_RULES:
            hits = len(re.findall(pattern, prose, re.I))
            rate = hits * 100 / words
            if rate > per_hundred:
                warnings.append(
                    f"  [WARN ] {rel} [{name}] {hits} hits in {words} words "
                    f"({rate:.1f} per 100, threshold {per_hundred}) - {explanation}"
                )
    return errors, warnings


def targets(argv: list[str]) -> list[Path]:
    paths = [Path(a) for a in argv if not a.startswith("-")]
    if paths:
        return [p if p.is_absolute() else ROOT / p for p in paths]
    return sorted(ROOT.glob("Content/**/*.uk.md")) + sorted(ROOT.glob("Content/**/*.uk.yaml"))


def main() -> int:
    if "--selftest" in sys.argv:
        return selftest()
    quiet = "--quiet" in sys.argv
    files = targets(sys.argv[1:])
    if not files:
        print("lint-ukrainian: no .uk files found")
        return 0

    all_errors, all_warnings = [], []
    for path in files:
        if not path.exists():
            print(f"  [ERROR] {path}: no such file")
            all_errors.append(str(path))
            continue
        errors, warnings = check(path, quiet)
        all_errors += errors
        all_warnings += warnings

    for line in all_errors:
        print(line)
    for line in all_warnings:
        print(line)

    print(
        f"\nlint-ukrainian: {len(files)} file(s), "
        f"{len(all_errors)} error(s), {len(all_warnings)} warning(s)"
    )
    if all_errors:
        return 1
    print("✓ Ukrainian lint clean")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
