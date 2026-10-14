# NFC.cool - Ukrainian (`uk`) translation style sheet

The `uk` locale has NO existing corpus. These rules ARE the register. Follow them literally;
inconsistency between files is what makes a site read as machine-translated, more than any
single awkward sentence.

Decisions already settled with Nico (do not relitigate):
- **Register: informal `ти`**, never `ви`. (Matches `de` du, `it`/`fr` tu, `es` tú, `tr` sen,
  `ru` ты, and Nico's first-person developer voice.) A stray `ви`/`вас`/`вам`/`ваш` is a lint
  ERROR, not a warning.
- **`NFC tag` is `NFC-мітка`**, never `NFC-тег`. In Ukrainian `тег` means an HTML tag or a
  hashtag - which is exactly what the blog's own `/tags/` chips are, so the two words stay
  strictly separated: NFC hardware is a `мітка`, a blog category is a `тег`.
- **Quotes: `«лапки»`.** `uk` IS listed in `i18n.yaml`'s `lint.quoteStyle`, so an ASCII `"`
  in prose is a hard error. Nested quotes take `„…“`, but restructure to avoid nesting.
- **No em dash, and no ` - ` standing in for one.** See §5 - Ukrainian uses `—` as grammar the
  same way Russian does, so this rule shapes the sentences here more than any other.
- **This is not Russian.** The single loudest defect in Ukrainian marketing prose is a
  russianism or a surzhyk form that a spellchecker accepts. §4 is the list; it is linted.

---

## 1. The voice

Nico writes in first person as the actual developer: "I built", "I've seen", "I sent in a
gripe". Ukrainian keeps that: `я зробив`, `я бачив`, `я написав`. Address the reader with the
second person singular, and let the verb ending carry it - Ukrainian does not need the pronoun:

- `Піднеси iPhone до мітки.` (imperative, no pronoun)
- `Записуєш посилання один раз, а працює воно роками.` (`-єш`, no `ти`)

Writing `ти` / `твій` out loud is emphatic in Ukrainian. Use it only where the English
genuinely contrasts ("*your* data, not mine" → `твої дані, а не мої`).

Not corporate, not breathless. No exclamation marks unless the English has one. No decorative
emojis in any locale, ever.

---

## 2. Glossary - these renderings are FIXED across all 53 files

| English | Ukrainian | Notes |
| --- | --- | --- |
| NFC tag / tags | **NFC-мітка** / **NFC-мітки** | never *тег*; declines normally: `на мітку`, `з мітки` |
| to read (a tag) | **зчитати** / **зчитувати** | `зчитати мітку`; NFC is read, never "scanned" |
| to scan (camera: QR, barcode, doc, 3D) | **сканувати** | `сканувати QR-код`, `сканувати документ` |
| a scan (camera) | **сканування** | `сканування документів`, `сканування приміщення` |
| to tap / hold to a tag | **піднести** | `піднеси телефон до мітки`. NEVER *натиснути* / *тапнути* for NFC |
| a tap (NFC), one read | **дотик** | `один дотик`, `одним дотиком` |
| to tap (UI button) | **натиснути** / **торкнутися** | UI taps only |
| to write (a tag) | **записати** | `записати посилання на мітку` |
| reader | **зчитувач** | the page `/online-nfc-reader/` = `NFC-зчитувач онлайн` |
| NFC Reader & Writer (feature) | **Читання і запис NFC** | |
| app | **застосунок** | NEVER *додаток* (a russianism from *приложение*), *апка*, *програма* |
| link | **посилання** | |
| to download | **завантажити** | never *скачати* |
| backup / to back up | **резервна копія** / **зробити резервну копію** | `резервне копіювання Amiibo`; not *бекап* |
| restore | **відновлення** / **відновити** | never *клонування* (see §7) |
| digital business card | **цифрова візитівка** | `візитівка`, not *візитна картка*, not *визитка* |
| lead capture | **збір контактів** | not *збір лідів* |
| Conference Mode | **режим конференції** | in-app feature; Ukrainian does not capitalize it |
| free | **безкоштовно** / **безкоштовний** | |
| paid / premium | **платний** / **преміум** | |
| subscription | **підписка** | |
| feature | **функція** | or `можливість`; never *фіча* in marketing copy |
| settings | **налаштування** | |
| to turn on / off | **увімкнути** / **вимкнути** | NEVER *включити* / *виключити* (§4) |
| privacy | **приватність** | the legal page is `Політика конфіденційності` |
| device | **пристрій** | never *девайс* |
| user | **користувач** | never *юзер* |
| password | **пароль** | |
| encryption / key | **шифрування** / **ключ** | |
| Shortcuts (the app) | **Швидкі команди** | Apple's Ukrainian name; one shortcut = `команда` |
| Apple Wallet | **Apple Wallet** | brand kept; a pass = `картка в Apple Wallet` |
| App Store / Play Store | keep English | `в App Store`, `з Google Play` |
| QR code | **QR-код** | plural `QR-коди` |
| barcode | **штрихкод** | one word, pinned for consistency |
| document scan | **сканування документів** | |
| room scan | **сканування приміщення** | |
| 3D object scan | **3D-сканування об'єктів** | keep `3D`, hyphen before the noun |
| counter | **лічильник** | `Лічильник дотиків` for Tap Counter |
| webhook | **вебхук** | declines: `вебхуки`, `вебхуком`, `на вебхук` |
| widget | **віджет** | |
| smartphone | **смартфон** | |
| cloud / server | **хмара** / **сервер** | |
| open source | **відкритий вихідний код** | |
| guide / how-to | **посібник** / **інструкція** | the tag chip is `Посібники`; never *гайд* |
| review (App Store) | **відгук** | the page `/reviews/` = `Відгуки` |
| rating (the number) | **оцінка** | `оцінка 4,7` - decimal COMMA (§6) |
| blog tag (the chip) | **тег** | the ONLY place `тег` is allowed; `/tags/` = `Теги` |
| changelog | **Історія оновлень** | |
| terms | **Умови використання** | |
| privacy policy | **Політика конфіденційності** | |
| support | **підтримка** | `Підтримка і контакти` |
| project | **проєкт** | with `є`, per the 2019 orthography (§6) |

Product names are NEVER translated: `NFC.cool`, `NFC.cool Tools`, `NFC.cool Business Card`,
`NTAG 424 DNA`, `AES-128`, `iPhone`, `iPad`, `Mac`, `Android`, `Amiibo`, `Wi-Fi`, `AirDrop`,
`NameDrop`, `App Clip`. They stay in Latin script and do NOT take Ukrainian endings or an
apostrophe: `на iPhone`, `в iPhone`, `для Android`, `через AirDrop` - never `iPhone'а`,
never `Андроїд`.

---

## 3. The calque traps (shared with every locale)

**Adapt, don't calque.** A native reader must not be able to tell this was translated.

1. **"You can" fatigue.** English leans on "you can"; `ти можеш` on every sentence reads like
   a manual. Prefer the bare imperative or a plain statement.
   - BAD: `Ти можеш записати посилання, ти можеш додати Wi-Fi.`
   - GOOD: `Запиши посилання, додай Wi-Fi.` / `На мітку поміщається посилання, Wi-Fi або контакт.`

2. **Possessive overuse.** English repeats "your"; Ukrainian leaves it implied.
   - BAD: `Піднеси свій телефон до своєї NFC-мітки.`
   - GOOD: `Піднеси телефон до мітки.`

3. **`даний` / `цей` as a stand-in for "the".** English articles have no Ukrainian equivalent;
   translating them produces officialese. (`даний` is also a russianism - see §4.)
   - BAD: `Даний застосунок зчитує дану мітку.`
   - GOOD: `Застосунок зчитує мітку.`

4. **Verbal-noun padding.** Officialese loves `здійснювати`, `виконання`, `з метою`,
   `при допомозі`. Marketing prose does not.
   - BAD: `Здійснити виконання запису даних на мітку.`
   - GOOD: `Записати дані на мітку.` / `Записати мітку.`

5. **Passive and reflexive overuse.** English passives usually become a Ukrainian active.
   - BAD: `Мітка зчитується застосунком.` → GOOD: `Застосунок зчитує мітку.`

6. **Word order is topic-comment, not SVO.** New information goes at the END of the sentence.
   English word order preserved in Ukrainian is a defect even when every word is right.
   - BAD: `Крихітний чип стоїть усередині мітки.` (if the chip is the new information)
   - GOOD: `Усередині мітки стоїть крихітний чип.`

7. **Literal idioms.** `не соромся`, `почувайся вільно`, `в кінці дня`, `зроби це` are English
   wearing Cyrillic. Rewrite the thought, not the words.

8. **Headings are rephrased, never calqued.** A bare English pronoun dangles in Ukrainian -
   name the subject. "Is it genuine?" → `Як відрізнити підробку?`, not `Чи це справжнє?`.

9. **Sentence case everywhere.** Ukrainian does not Title Case. Only the first word and proper
   nouns take a capital - in headings, nav labels, footer labels and the language picker alike.
   `Історія оновлень`, not `Історія Оновлень`.

---

## 4. The Ukrainian traps (the ones that matter most here, and are linted)

This locale's characteristic failure is not awkwardness, it is **Russian showing through**.
A form can be spelled with Ukrainian letters, pass a spellchecker, and still be wrong.

### 4.1 Letters that do not exist in Ukrainian

`ы`, `э`, `ъ`, `ё` are **not in the Ukrainian alphabet**. One of them anywhere in a `uk` file
means Russian text leaked in. Hard error, no exceptions.

Likewise `-тся` never occurs in Ukrainian: the reflexive ending is always `-ться`
(`відкривається`, `може відкритися`). A `-тся` is a Russian verb that was not translated.

### 4.2 Latin homoglyphs inside a Cyrillic word (linted)

`a c e i o p x y B E I K M H O P C T X` exist in both alphabets and are invisible to the eye,
but they break search, spellcheck and screen readers. Ukrainian adds one Russian does not
have: **Latin `i` and Cyrillic `і` are the same glyph**, so this locale trips it more than any
other. `сканер` must be six Cyrillic letters; `мітка` must be five.

### 4.3 Surzhyk and russianisms (linted)

Left is wrong, right is what to write:

| Wrong (russianism / surzhyk) | Correct Ukrainian |
| --- | --- |
| `являється`, `представляє собою` | drop the copula, or use a verb (§5) |
| `включити` / `виключити` (a device) | `увімкнути` / `вимкнути` |
| `на протязі` | `протягом` (`на протязі` means "in a draught") |
| `приймати участь` | `брати участь` |
| `приймати рішення` | `ухвалювати рішення` |
| `відмінити` | `скасувати` |
| `слідуючий`, `наступним чином` | `наступний`, `так` |
| `любий` (meaning "any") | `будь-який` |
| `співпадати`, `співпадіння` | `збігатися`, `збіг` |
| `вірний` (meaning "correct") | `правильний` |
| `рахувати` (meaning "to consider") | `вважати` |
| `у якості` (meaning "as") | `як` |
| `в залежності від` | `залежно від` |
| `при допомозі`, `при умові` | `за допомогою`, `за умови` |
| `не дивлячись на` | `незважаючи на` |
| `так як` (causal) | `оскільки`, `бо` |
| `тим не менше` | `однак`, `а проте` |
| `в кінці кінців` | `зрештою`, `врешті-решт` |
| `на рахунок` (meaning "about") | `щодо` |
| `даний` (meaning "this") | `цей`, or drop it |
| `заключається` | `полягає` |
| `міроприємство` | `захід` |
| `бувший` | `колишній` |
| `наглядний` | `наочний` |
| `по темам`, `інструкція по налаштуванню` | `за темами`, `інструкція з налаштування` |
| `самий кращий` | `найкращий` |

### 4.4 Active participles (linted)

Ukrainian does **not** form active present participles the way Russian does. `існуючий`,
`працюючий`, `скануючий`, `оточуючий`, `керуючий`, `бажаючий`, `виконуючий` are all wrong.
Rewrite as a subordinate clause or a plain adjective:

- BAD: `застосунок, скануючий документи` → GOOD: `застосунок, який сканує документи`
- BAD: `існуючі мітки` → GOOD: `наявні мітки`
- BAD: `працюючий вебхук` → GOOD: `вебхук, який працює` / `робочий вебхук`

(`блискучий`, `гарячий`, `неминучий`, `майбутній` are ordinary adjectives, not participles,
and are fine.)

### 4.5 The apostrophe (linted)

Ukrainian requires an apostrophe after a labial or `р` before `я ю є ї`: `об'єкт`, `п'ять`,
`ім'я`, `пам'ять`, `комп'ютер`, `з'єднання`, `роз'єм`, `зв'язок`, `прем'єра`, `інтерв'ю`,
`м'який`, `бар'єр`, `здоров'я`, `сім'я`. Dropping it is a spelling error a native reader
sees instantly. Use the **ASCII `'`**, consistently, everywhere (never `’`).

### 4.6 Euphony (not linted - read for it)

Ukrainian alternates `у`/`в` and `і`/`й` to avoid consonant and vowel clusters: `в застосунку`
after a vowel, `у застосунку` after a consonant; `і` after a consonant, `й` after a vowel.
No linter catches this, and getting it wrong is one of the tells that a text was written by
someone thinking in Russian. Read every sentence aloud.

---

## 5. The dash rule (and the `це` copula)

The repo bans `—` and `–` everywhere, in every locale. Ukrainian normally uses `—` as grammar,
not decoration, so **we restructure instead of substituting**. Writing ` - ` where a Ukrainian
reader expects `—` is a WORSE tell than either, so the hyphen-as-dash is linted too.

The five places English or Ukrainian would reach for a dash, and what to write instead:

1. **Missing copula (`X — це Y`).** The single most common case.
   - Reframe with a verb: `NFC-мітка зберігає кількасот байтів.`
   - Reframe with a locative: `Усередині NFC-мітки стоїть чип без батарейки.`
   - Split the sentence and let `це` be a real subject pronoun, where no dash is needed:
     `Що таке NFC-мітка? Це крихітний чип без батарейки.`
   - Never `NFC-мітка це чип` (ungrammatical) and never `NFC-мітка - це чип`.

2. **The dramatic pause (`One tap — and it's saved`).** Use `і` or a comma.
   - `Один дотик, і контакт збережено.`

3. **Contrast (`iOS gets the 3D scanner — Android doesn't`).** Use `а`, `натомість`, `але`.
   - `Android читає мітки й QR-коди, а сканери документів і 3D працюють лише на iOS.`

4. **Parenthetical aside.** Use paired commas or parentheses - both are native Ukrainian.
   - `Застосунок, і це головне, нічого не надсилає на сервер.`
   - `Лічильник рахує дотики (і тільки їх).`

5. **Ranges and elliptical lists.** Spell them out or use a colon.
   - `з 2018 по 2024 рік`, not `2018 - 2024`
   - `На мітку поміщається будь-що: посилання, Wi-Fi, контакт.`

Hyphens inside words are NOT dashes and stay: `NFC-мітка`, `QR-код`, `3D-сканування`,
`будь-який`, `по-своєму`. Colons and parentheses carry a lot of the load a dash would.

---

## 6. Mechanics

- **No em/en dashes and no ` - ` substitute.** Restructure per §5. (Hard gate.)
- **No decorative emojis.**
- **2019 orthography.** `проєкт`, `проєктор`, `плеєр`, `фоє`; `пів години` written separately;
  `и` never starts a word. `преса` has one `с`. (`проект` is a hard error.)
- **Sentence case for every title, heading, nav and footer label.** Title Case is English-only.
- **Numbers: decimal comma, thousands space.** `4,7`, `73 500`. `LocaleNumber`'s `uk` row
  emits a real non-breaking space for the figures it generates; hand-written figures in prose
  use an ordinary space, as `ru` prose does, because a literal NBSP in a markdown source is
  invisible and easy to corrupt in a later edit. Never the English `73,500`.
- **Quotes `«…»`** in prose. Straight `"` is a hard error outside code spans, frontmatter,
  HTML attributes and link targets.
- **Keep byte-identical:** `id`, `date`, the filename `<slug>`, `image`/`imagePath` paths,
  `tags` slugs, all URLs, image dimensions, `author` handles.
- **Translate:** `title`, `summary`, `imageAlt`, `description`, body prose, link *text*, and
  any `metaTitle`/`metaDescription`/`ogTitle`/`ogDescription` present.
- **Blog CTA tracking:** `ct=blog-<slug>-uk` and `utm_campaign%3Dblog-<slug>-uk`. Everything
  else in the URL is unchanged.
- **Internal links** stay locale-agnostic: `/blog/<slug>/`, `/features/nfc-reader-writer/`.
  Never add a `/uk/` prefix - SiteKit routes locales itself.
- **Blog `---` rule:** exactly one `---` before every `## H2` and nowhere else. Preserve the
  English file's structure exactly.
- **Pricing sentinels stay literal English** in `values:` arrays: `"limited"`, `"soon"`,
  `"partial"`, `"~"`, `"✓"`, `"✗"`. Only the row `label:` is translated. Translating a
  sentinel silently breaks the pill rendering.
- **App Store review quotes ARE translated**; the `author` handle stays as-is, the `location`
  is translated: `App Store · США`, `App Store · Німеччина`, `App Store · Японія`.
- **HTML in markdown pages** (`<section>`, `<div>`, `class=`, `src=`, `alt=`) - translate only
  the human-readable text and `alt` values. Never touch tags, classes, or paths.
- Delete the `⟦TODO:uk⟧` banner line when the file is done. It is a hard build error.

Run `python3 Scripts/lint-ukrainian.py <file>` after every file; it must report `0 error(s)`.

---

## 7. Product facts that override the English wording

- Amiibo: always **резервне копіювання і відновлення**, never *клонування* / *копіювання*.
  Keep the "not affiliated with Nintendo" disclaimer wherever the English has it.
- The QR and barcode scanners (QR, штрихкоди) and QR Code Studio are on **both** platforms.
  Android reads 13 formats to iOS's 19; reading codes from photos and screenshots, Micro QR, Micro PDF417, GS1 DataBar,
  Shortcuts, webhooks and speech on code scans, and iCloud Sync stay iOS-only. The document, 3D
  and room scanners are **iOS only**. Android gets NFC read/write and вебхуки with full parity,
  Amiibo included. Never promise a document, 3D or room scanner on Android.
- Business Card is a **separate app** on both platforms. Every Business Card CTA points at the
  standalone app, never at the legacy bundle inside Android Tools.

---

## 8. The final pass is monolingual

Close the English. Read the Ukrainian file top to bottom as if it were the original. Anything
that makes you reach for the source to understand it is a defect - rewrite it. The lint
catches spelling, register and russianisms; only this pass catches prose that is technically
correct and still obviously translated.

Two things the lint deliberately cannot judge, so give them their own read:

- **The `це` copula restructure.** `copula-tse` flags the shape, but choosing between a verb,
  a locative and a split sentence (§5.1) is a human call every time.
- **Euphony (§4.6).** `у`/`в` and `і`/`й` are decided by the sounds on either side, so no rule
  can check them without a phonetic model. They are also the fastest way for a reader to feel
  that a text was written by someone thinking in Russian. Read the final third of every long
  file aloud; that is where attention drifts and the clusters survive.
