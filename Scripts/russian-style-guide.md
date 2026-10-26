# NFC.cool - Russian (`ru`) translation style sheet

The `ru` locale has NO existing corpus. These rules ARE the register. Follow them literally;
inconsistency between files is what makes a site read as machine-translated, more than any
single awkward sentence.

Decisions already settled with Nico (do not relitigate):
- **Register: informal `ты`**, never `вы`. (Matches `de` du, `it`/`fr` tu, `es` tú, `tr` sen,
  and Nico's first-person developer voice. Yes, most Russian tech marketing uses `вы` - this
  site deliberately does not.) A stray `вы`/`вас`/`вам`/`ваш` is a lint ERROR, not a warning.
- **`NFC tag` is `NFC-метка`**, never `NFC-тег`. In Russian `тег` means an HTML tag or a
  hashtag - which is exactly what the blog's own `/tags/` chips are, so the two words stay
  strictly separated: NFC hardware is a `метка`, a blog category is a `тег`.
- **Quotes: `«ёлочки»`.** `ru` IS listed in `i18n.yaml`'s `lint.quoteStyle`, so an ASCII `"`
  in prose is a hard error. Nested quotes take `„лапки“`, but restructure to avoid nesting.
- **No em dash, and no ` - ` standing in for one.** See §4 - this is the rule that shapes
  Russian sentences here more than any other.

---

## 1. The voice

Nico writes in first person as the actual developer: "I built", "I've seen", "I sent in a
gripe". Russian keeps that: `я сделал`, `я видел`, `я написал`. Address the reader with the
second person singular, and let the verb ending carry it - Russian does not need the pronoun:

- `Поднеси iPhone к метке.` (imperative, no pronoun)
- `Записываешь ссылку один раз, а работает она годами.` (`-ешь`, no `ты`)

Writing `ты` / `твой` out loud is emphatic in Russian. Use it only where the English genuinely
contrasts ("*your* data, not mine" → `твои данные, а не мои`).

Not corporate, not breathless. No exclamation marks unless the English has one. No decorative
emojis in any locale, ever.

---

## 2. Glossary - these renderings are FIXED across all 53 files

| English | Russian | Notes |
| --- | --- | --- |
| NFC tag / tags | **NFC-метка** / **NFC-метки** | never *тег*; declines normally: `на метку`, `с метки` |
| to read (a tag) | **считать** / **считывать** | `считать метку`; NFC is read, never "scanned" |
| to scan (camera: QR, barcode, doc, 3D) | **сканировать** | `сканировать QR-код`, `сканировать документ` |
| a scan (camera) | **сканирование** | `сканирование документов`, `сканирование помещения` |
| to tap / hold to a tag | **поднести** | `поднеси телефон к метке`. NEVER *нажать* / *тапнуть* for NFC |
| a tap (NFC), one read | **касание** | `одно касание`, `за одно касание` |
| to tap (UI button) | **нажать** / **коснуться** | UI taps only |
| to write (a tag) | **записать** | `записать ссылку на метку` |
| reader | **считыватель** | the page `/online-nfc-reader/` = `NFC-считыватель онлайн` |
| NFC Reader & Writer (feature) | **Чтение и запись NFC** | |
| app | **приложение** | NEVER *апп*, *аппликация*, *софт* |
| link | **ссылка** | |
| backup / to back up | **резервная копия** / **сохранить резервную копию** | `резервное копирование Amiibo`; not *бэкап* |
| restore | **восстановление** / **восстановить** | never *клонирование* (see §6) |
| digital business card | **цифровая визитка** | `визитка`, not *визитная карточка* |
| lead capture | **сбор контактов** | not *сбор лидов* |
| Conference Mode | **режим конференции** | in-app feature; Russian does not capitalize it |
| free | **бесплатно** / **бесплатный** | |
| paid / premium | **платный** / **премиум** | |
| subscription | **подписка** | |
| feature | **функция** | or `возможность`; never *фича* in marketing copy |
| settings | **настройки** | |
| privacy | **конфиденциальность** | the tag chip is `Приватность` (shorter, fits) |
| device | **устройство** | |
| password | **пароль** | |
| encryption / key | **шифрование** / **ключ** | |
| Shortcuts (the app) | **Быстрые команды** | Apple's Russian name; one shortcut = `команда` |
| Apple Wallet | **Apple Wallet** | brand kept; a pass = `карта в Apple Wallet` |
| App Store / Play Store | keep English | `в App Store`, `из Google Play` |
| QR code | **QR-код** | plural `QR-коды` |
| barcode | **штрихкод** | one word, pinned for consistency |
| document scan | **сканирование документов** | |
| room scan | **сканирование помещения** | |
| 3D object scan | **3D-сканирование объектов** | keep `3D`, hyphen before the noun |
| counter | **счётчик** | with `ё` (§5) |
| webhook | **вебхук** | declines: `вебхуки`, `вебхуком`, `по вебхуку` |
| widget | **виджет** | |
| smartphone | **смартфон** | |
| cloud / server | **облако** / **сервер** | |
| open source | **открытый исходный код** | |
| guide / how-to | **руководство** / **инструкция** | the tag chip is `Руководства`; never *гайд* |
| review (App Store) | **отзыв** | the page `/reviews/` = `Отзывы` |
| rating (the number) | **оценка** | `оценка 4,7` - decimal COMMA (§5) |
| blog tag (the chip) | **тег** | the ONLY place `тег` is allowed; `/tags/` = `Теги` |
| changelog | **История обновлений** | |
| terms | **Условия использования** | |
| privacy policy | **Политика конфиденциальности** | |

Product names are NEVER translated: `NFC.cool`, `NFC.cool Tools`, `NFC.cool Business Card`,
`NTAG 424 DNA`, `AES-128`, `iPhone`, `iPad`, `Mac`, `Android`, `Amiibo`, `Wi-Fi`, `AirDrop`,
`NameDrop`, `App Clip`. They stay in Latin script and take Russian case endings without an
apostrophe: `на iPhone`, `у iPhone`, `в Android`, `через AirDrop`.

---

## 3. The Russian calque traps (the #1 failure mode)

**Adapt, don't calque.** A native reader must not be able to tell this was translated.

1. **`является` - the loudest tell.** English "is" tempts a copula; Russian present tense has
   none, and `является` is bureaucratic officialese.
   - BAD: `NFC-метка является пассивным чипом.`
   - GOOD: `NFC-метка работает без батарейки.` / `Внутри метки пассивный чип.`

2. **"You can" fatigue.** English leans on "you can"; `ты можешь` on every sentence reads like
   a manual. Prefer the bare imperative or a plain statement.
   - BAD: `Ты можешь записать ссылку, ты можешь добавить Wi-Fi.`
   - GOOD: `Запиши ссылку, добавь Wi-Fi.` / `На метку помещается ссылка, Wi-Fi или контакт.`

3. **Possessive overuse.** English repeats "your"; Russian leaves it implied.
   - BAD: `Поднеси свой телефон к своей NFC-метке.`
   - GOOD: `Поднеси телефон к метке.`

4. **`данный` / `этот` as a stand-in for "the".** English articles have no Russian equivalent;
   translating them produces officialese.
   - BAD: `Данное приложение считывает данную метку.`
   - GOOD: `Приложение считывает метку.`

5. **Verbal-noun padding.** Russian officialese loves `осуществлять`, `производить`,
   `выполнение`, `в целях`, `при помощи`. Marketing prose does not.
   - BAD: `Осуществить выполнение записи данных на метку.`
   - GOOD: `Записать данные на метку.` / `Записать метку.`

6. **Passive and reflexive overuse.** English passives usually become a Russian active.
   - BAD: `Метка считывается приложением.` → GOOD: `Приложение считывает метку.`

7. **Word order is topic-comment, not SVO.** New information goes at the END of the sentence.
   English word order preserved in Russian is a defect even when every word is right.
   - BAD: `Крошечный чип находится внутри метки.` (if the chip is the new information)
   - GOOD: `Внутри метки находится крошечный чип.`

8. **`-тся` / `-ться` (linted).** Infinitive takes the soft sign, third person does not.
   - `метка может открыться` (infinitive after `может`) · `метка открывается` (3rd person)
   - The test: `что делать?` → `-ться`; `что делает?` → `-тся`.

9. **Literal idioms.** `не стесняйся`, `чувствуй себя свободно`, `в конце дня`, `сделай это`
   are English wearing Cyrillic. Rewrite the thought, not the words.

10. **Headings are rephrased, never calqued.** A bare English pronoun dangles in Russian -
    name the subject. "Is it genuine?" → `Как отличить подделку?`, not `Это подлинное?`.

11. **Sentence case everywhere.** Russian does not Title Case. Only the first word and proper
    nouns take a capital - in headings, nav labels, footer labels and the language picker
    alike. `История обновлений`, not `История Обновлений`.

12. **Real Cyrillic, always (linted).** Never mix Latin homoglyphs into a Cyrillic word:
    `с o e a p x y k B M H T` exist in both alphabets and are invisible to the eye, but they
    break search, spellcheck and screen readers. `сканер` must be six Cyrillic letters.

---

## 4. The dash rule (`ru`-specific, and the one that shapes the prose)

The repo bans `—` and `–` everywhere, in every locale. Russian normally uses `—` as grammar,
not decoration, so **we restructure instead of substituting**. Writing ` - ` where a Russian
reader expects `—` is a WORSE tell than either, so the hyphen-as-dash is linted too.

The five places English or Russian would reach for a dash, and what to write instead:

1. **Missing copula (`X — это Y`).** The single most common case.
   - Reframe with a verb: `NFC-метка хранит несколько сотен байт.`
   - Reframe with a locative: `Внутри NFC-метки стоит чип без батарейки.`
   - Split the sentence and let `это` be a real subject pronoun, where no dash is needed:
     `Что такое NFC-метка? Это крошечный чип без батарейки.`
   - Never `NFC-метка это чип` (ungrammatical) and never `NFC-метка - это чип`.

2. **The dramatic pause (`One tap — and it's saved`).** Use `и` or a comma.
   - `Одно касание, и контакт сохранён.`

3. **Contrast (`iOS gets the 3D scanner — Android doesn't`).** Use `а`, `зато`, `но`.
   - `Android читает метки и QR-коды, а сканеры документов и 3D работают только на iOS.`

4. **Parenthetical aside.** Use paired commas or parentheses - both are native Russian.
   - `Приложение, и это главное, ничего не отправляет на сервер.`
   - `Счётчик считает касания (и только их).`

5. **Ranges and elliptical lists.** Spell them out or use a colon; Russian is happy with both.
   - `с 2018 по 2024 года`, not `2018 - 2024`
   - `На метку помещается что угодно: ссылка, Wi-Fi, контакт.`

Hyphens inside words are NOT dashes and stay: `NFC-метка`, `QR-код`, `3D-сканирование`,
`из-за`, `по-своему`. Colons and parentheses carry a lot of the load a dash would - use them.

---

## 5. Mechanics

- **No em/en dashes and no ` - ` substitute.** Restructure per §4. (Hard gate.)
- **No decorative emojis.**
- **Write `ё`.** `ещё`, `её`, `счётчик`, `надёжный`, `сохранён`, `объём`, `нашёл`, `приём`.
  A site that drops `ё` reads as hastily typed, and `все`/`всё` genuinely changes the meaning.
- **Sentence case for every title, heading, nav and footer label.** Title Case is English-only.
- **Numbers: decimal comma, thousands non-breaking space.** `4,7`, `73 500`. This is what
  `LocaleNumber`'s `ru` row emits; hand-written figures in prose must match it.
- **Quotes `«…»`** in prose. Straight `"` is a hard error outside code spans, frontmatter,
  HTML attributes and link targets.
- **Keep byte-identical:** `id`, `date`, the filename `<slug>`, `image`/`imagePath` paths,
  `tags` slugs, all URLs, image dimensions, `author` handles.
- **Translate:** `title`, `summary`, `imageAlt`, `description`, body prose, link *text*, and
  any `metaTitle`/`metaDescription`/`ogTitle`/`ogDescription` present.
- **Blog CTA tracking:** `ct=blog-<slug>-ru` and `utm_campaign%3Dblog-<slug>-ru`. Everything
  else in the URL is unchanged.
- **Internal links** stay locale-agnostic: `/blog/<slug>/`, `/features/nfc-reader-writer/`.
  Never add a `/ru/` prefix - SiteKit routes locales itself.
- **Blog `---` rule:** exactly one `---` before every `## H2` and nowhere else. Preserve the
  English file's structure exactly.
- **Pricing sentinels stay literal English** in `values:` arrays: `"limited"`, `"soon"`,
  `"partial"`, `"~"`, `"✓"`, `"✗"`. Only the row `label:` is translated. Translating a
  sentinel silently breaks the pill rendering.
- **App Store review quotes ARE translated**; the `author` handle stays as-is, the `location`
  is translated: `App Store · США`, `App Store · Германия`, `App Store · Япония`.
- **HTML in markdown pages** (`<section>`, `<div>`, `class=`, `src=`, `alt=`) - translate only
  the human-readable text and `alt` values. Never touch tags, classes, or paths.
- Delete the `⟦TODO:ru⟧` banner line when the file is done. It is a hard build error.

---

## 6. Product facts that override the English wording

- Amiibo: always **резервное копирование и восстановление**, never *клонирование* /
  *копирование*. Keep the "not affiliated with Nintendo" disclaimer wherever the English has it.
- The QR and barcode scanners (QR, штрихкод) and QR Code Studio are on **both** platforms.
  Android reads 13 formats to iOS's 19; reading codes from photos and screenshots, Micro QR, Micro PDF417, GS1 DataBar,
  Shortcuts, webhooks and speech on code scans, and iCloud Sync stay iOS-only. The document, 3D
  and room scanners are **iOS only**. Android gets NFC read/write and вебхуки with full parity,
  Amiibo included. Never promise a document, 3D or room scanner on Android.
- Business Card is a **separate app** on both platforms. Every Business Card CTA points at the
  standalone app, never at the legacy bundle inside Android Tools.

---

## 7. The final pass is monolingual

Close the English. Read the Russian file top to bottom as if it were the original. Anything
that makes you reach for the source to understand it is a defect - rewrite it. The lint
catches spelling and register; only this pass catches prose that is technically correct and
still obviously translated.

The copula `X это Y` used to live in this pass, because the dash it needs is banned here
and `это` is also a subject pronoun, an object and a determiner. It is now linted
(`copula-eto` in `Scripts/lint-russian.py`), so the sweep is automatic; what stays manual
is choosing the restructure. Reach for a verb (`NFC-метка хранит…`), a locative
(`Внутри метки стоит…`), or split the sentence so `это` becomes a real subject
(`Что такое NFC-метка? Это крошечный чип.`) - never ` - ` in place of the dash.
