# NFC.cool - Turkish (`tr`) translation style sheet

The `tr` locale has NO existing corpus. These rules ARE the register. Follow them literally;
inconsistency between files is what makes a site read as machine-translated, more than any
single awkward sentence.

Decisions already settled with Nico (do not relitigate):
- **Register: informal `sen`**, never `siz`. (Matches `de` du, `it`/`fr` tu, `es` tú, and Nico's
  first-person developer voice. Yes, Apple Türkiye uses `siz` - this site deliberately does not.)
- **`NFC tag` stays the English loanword**, not `etiket`. Suffixes attach with an apostrophe.
- **Quotes: ASCII `"…"`.** `tr` is deliberately NOT in `i18n.yaml`'s `lint.quoteStyle`
  (like `es`/`pt`/`id`/`it`). Do not use `“”` and do not use `«»`.

---

## 1. The voice

Nico writes in first person as the actual developer: "I built", "I've seen", "I sent in a
gripe". Turkish keeps that. Use the first person singular (`yaptım`, `gördüm`, `yazdım`), and
address the reader as `sen` - which in Turkish means the **second person singular suffix**,
almost never the word `sen` itself:

- `iPhone'unu tag'e yaklaştır.` (imperative, no pronoun)
- `Kendi bağlantını yazabilirsin.` (`-sin`, no `sen`)

Writing the pronoun `sen` / `senin` out loud is emphatic in Turkish. Use it only where the
English genuinely contrasts ("*your* data, not mine" → `senin verin, benim değil`).

Not corporate, not breathless. No exclamation marks unless the English has one. No decorative
emojis in any locale, ever.

---

## 2. Glossary - these renderings are FIXED across all 53 files

| English | Turkish | Notes |
| --- | --- | --- |
| NFC tag / tags | **NFC tag** / **NFC tag'ler** | loanword; apostrophe + FRONT harmony (§3.6) |
| to read (a tag) | **okumak** | `tag'i okumak`; NFC is read, not "scanned" |
| to scan (camera: QR, barcode, doc, 3D) | **taramak** | `QR kod taramak`, `belge taramak` |
| a scan (camera) | **tarama** | `belge taraması`, `oda taraması` |
| to tap / hold to a tag | **yaklaştırmak** | `telefonu tag'e yaklaştır`. NEVER *dokunmak* for NFC |
| a tap (NFC), to get it read | **okutmak** / **okutma** | `tek okutmayla`, `okutma sayacı` |
| to tap (UI button) | **dokunmak** | UI taps only |
| to write (a tag) | **yazmak** | `tag'e veri yazmak` |
| reader | **okuyucu** | `çevrimiçi NFC okuyucu` |
| NFC Reader & Writer (feature) | **NFC Okuma ve Yazma** | never *yazıcı* - that is a printer |
| app | **uygulama** | Apple Türkiye's word. NEVER *app*, never *aplikasyon* |
| link | **bağlantı** | |
| backup / to back up | **yedek** / **yedeklemek** | `Amiibo yedekleme` |
| restore | **geri yükleme** | never *klonlama* (see §5) |
| digital business card | **dijital kartvizit** | |
| lead capture | **müşteri adayı toplama** | |
| Conference Mode | **Konferans Modu** | in-app feature name, capitalized |
| free | **ücretsiz** | |
| paid / premium | **ücretli** / **premium** | |
| subscription | **abonelik** | |
| feature | **özellik** | |
| settings | **ayarlar** | |
| privacy | **gizlilik** | |
| device | **cihaz** | |
| password | **parola** | Apple Türkiye's word, not *şifre* |
| encryption / key | **şifreleme** / **anahtar** | |
| Shortcuts (the app) | **Kısayollar** | Apple Türkiye's name; one shortcut = `kısayol` |
| Apple Wallet | **Apple Wallet** | brand kept; a pass = `Apple Wallet kartı` |
| App Store / Play Store | keep English | `App Store'da`, `Play Store'dan` |
| QR code | **QR kod** | plural `QR kodlar`, possessive `QR kodu` |
| barcode | **barkod** | |
| document scan | **belge tarama** | |
| room scan | **oda tarama** | |
| 3D object scan | **3B nesne tarama** | `3B` is the Turkish form; keep `3D` only inside product names |
| counter | **sayaç** | `okutma sayacı`, `tarama sayacı` |
| webhook | **webhook** | invariable, apostrophe suffixes: `webhook'lar` |
| widget | **widget** | Apple Türkiye keeps it |
| smartphone | **akıllı telefon** | |
| cloud / server | **bulut** / **sunucu** | |
| open source | **açık kaynak** | |
| guide / how-to | **rehber** | |
| review (App Store) | **değerlendirme** | the page `/reviews/` = `Değerlendirmeler` |
| rating (the number) | **puan** | `4,7 puan` - decimal COMMA (§4) |
| changelog | **Sürüm Notları** | |
| terms | **Kullanım Koşulları** | |

Product names are NEVER translated: `NFC.cool`, `NFC.cool Tools`, `NFC.cool Business Card`,
`NTAG 424 DNA`, `AES-128`, `iPhone`, `iPad`, `Mac`, `Android`, `Amiibo`, `Wi-Fi`, `AirDrop`,
`NameDrop`, `App Clip`.

---

## 3. The Turkish calque traps (the #1 failure mode)

**Adapt, don't calque.** A native reader must not be able to tell this was translated. These
are the specific tells in Turkish:

1. **`bir` spam - the loudest tell.** English needs "a/an"; Turkish usually does not. `bir`
   means "one", and sprinkling it everywhere is the single clearest sign of a translation.
   - BAD: `Bir NFC tag'e bir bağlantı yazmak için bir uygulamaya ihtiyacın var.`
   - GOOD: `NFC tag'e bağlantı yazmak için uygulama gerekir.`
   Keep `bir` only when the count genuinely matters (`bir tag, iki kart`) or the noun is
   introduced for the first time and truly indefinite.

2. **Pronoun overuse.** English repeats "your"; Turkish already marks it with a suffix.
   - BAD: `Senin iPhone'unu senin NFC tag'ine yaklaştır.`
   - GOOD: `iPhone'unu tag'e yaklaştır.`
   Often even the possessive suffix can go: `Telefonu tag'e yaklaştır.`

3. **"You can" fatigue.** English leans on "you can"; `-ebilirsin` on every sentence reads
   like a manual. Prefer the bare imperative or a plain statement.
   - BAD: `Bağlantı yazabilirsin, Wi-Fi ekleyebilirsin, kartvizit kaydedebilirsin.`
   - GOOD: `Bağlantı yaz, Wi-Fi ekle, kartvizit kaydet.`

4. **Word order is SOV.** The verb goes last. English word order preserved in Turkish is a
   defect even when every word is right.
   - BAD: `Uygulama okur tag'i ve gösterir içeriği.`
   - GOOD: `Uygulama tag'i okur ve içeriği gösterir.`

5. **Relative clauses are prenominal participles**, never `ki`.
   - `the app that reads tags` → `tag okuyan uygulama`, never *`uygulama ki tag okur`*.
   - `a tag you wrote yourself` → `kendi yazdığın tag`.

6. **The apostrophe rule (linted).** Proper nouns, brand names and abbreviations take an
   apostrophe before a suffix; ordinary Turkish common nouns never do.
   - `iPhone'un`, `iPhone'a`, `iPhone'da` · `iPad'i`, `iPad'de` · `Mac'te` · `Android'de`,
     `Android'in` · `iOS'ta` · `NFC'yi`, `NFC'nin`, `NFC'de` · `NFC.cool'un` ·
     `App Store'da` · `Play Store'dan` · `Amiibo'yu` · `Wi-Fi'ye` · `NTAG 424 DNA'yı`
   - `tag` is a foreign common noun read `/teg/`, so it takes the apostrophe too, with
     **front** vowel harmony: `tag'e`, `tag'i`, `tag'in`, `tag'de`, `tag'den`, `tag'ler`,
     `tag'leri`, `tag'lere`, `tag'lerde`. Never *`taga`*, *`tagı`*, *`taglar`*, *`tags`*.
   - Same treatment for `webhook'lar`, `webhook'a`.
   - NOT apostrophised: `uygulamayı`, `telefonda`, `kartvizitin` - these are Turkish words.

7. **`de`/`da` and `ki` (linted).** The locative suffix is joined (`telefonda`, `tag'de`);
   the word meaning "also/too" is separate (`telefon da okur`). The suffix `-ki` is joined
   (`cebindeki tag`); the conjunction `ki` is separate (`biliyorum ki`).

8. **Noun stacks need izafet.** English piles nouns; Turkish chains them with `-i`.
   - `NFC tag scan counter` → `NFC tag okutma sayacı`
   - `document scanning guide` → `belge tarama rehberi`

9. **Passive overuse.** English passives usually become a Turkish active.
   - `the tag is read by the app` → `uygulama tag'i okur`, not `tag uygulama tarafından okunur`.

10. **Bureaucratic verb padding.** Turkish officialese loves `gerçekleştirmek`, `sağlamak`,
    `bulunmak`, `ile ilgili`, `-sel/-sal` adjectives. Marketing prose does not.
    - BAD: `Tarama işlemini gerçekleştirebilirsin.` → GOOD: `Tarayabilirsin.` / `Tara.`
    - BAD: `Bu, gizlilik açısından avantaj sağlar.` → GOOD: `Gizlilik için iyi.`

11. **Headings are rephrased, never calqued.** A bare English pronoun dangles in Turkish -
    name the subject. "Is it genuine?" → `Ürün gerçek mi?`, not `O gerçek mi?`.

12. **Real Turkish characters, always.** `ı İ ş Ş ğ Ğ ü Ü ö Ö ç Ç`. Never ASCII-fold
    (`gizlilik` not *gizlilik* stripped, `İstanbul` not *Istanbul*). Note the dotted capital
    `İ` for a capitalised `i` (`İndir`, `İletişim`), and dotless `ı` where the vowel harmony
    calls for it.

---

## 4. Mechanics (same as every locale)

- **No em/en dashes anywhere.** Plain hyphen with spaces: ` - `. (Hard gate.)
- **No decorative emojis.**
- **Titles: sentence case.** Title Case is English-only. `NFC tag'e iPhone'dan nasıl yazılır`,
  not `NFC Tag'e iPhone'dan Nasıl Yazılır`. Proper nouns keep their capitals. (Short nav and
  footer labels in `SiteConfig.yaml` are the one exception - Turkish menus are title-cased:
  `Ana Sayfa`, `Destek ve İletişim`.)
- **Numbers: decimal comma, thousands dot.** `4,7 puan`, `70.660 değerlendirme`. This is what
  `LocaleNumber`'s `tr` row emits; hand-written figures in prose must match it.
- **Keep byte-identical:** `id`, `date`, the filename `<slug>`, `image`/`imagePath` paths,
  `tags` slugs, all URLs, image dimensions, `author` handles.
- **Translate:** `title`, `summary`, `imageAlt`, `description`, body prose, link *text*,
  and any `metaTitle`/`metaDescription`/`ogTitle`/`ogDescription` present.
- **Blog CTA tracking:** `ct=blog-<slug>-tr` and `utm_campaign%3Dblog-<slug>-tr`. Everything
  else in the URL is unchanged.
- **Internal links** stay locale-agnostic: `/blog/<slug>/`, `/features/nfc-reader-writer/`.
  Never add a `/tr/` prefix - SiteKit routes locales itself.
- **Blog `---` rule:** exactly one `---` before every `## H2` and nowhere else. Preserve the
  English file's structure exactly.
- **Pricing sentinels stay literal English** in `values:` arrays: `"limited"`, `"soon"`,
  `"partial"`, `"~"`, `"✓"`, `"✗"`. Only the row `label:` is translated. Translating a
  sentinel silently breaks the pill rendering.
- **App Store review quotes ARE translated**; the `author` handle stays as-is, the `location`
  is translated: `App Store · ABD`, `App Store · Almanya`, `App Store · Japonya`.
- **HTML in markdown pages** (`<section>`, `<div>`, `class=`, `src=`, `alt=`) - translate only
  the human-readable text and `alt` values. Never touch tags, classes, or paths.
- Delete the `⟦TODO:tr⟧` banner line when the file is done. It is a hard build error.

---

## 5. Product facts that override the English wording

- Amiibo: always **yedekleme ve geri yükleme**, never *klonlama* / *kopyalama*. Keep the
  "not affiliated with Nintendo" disclaimer wherever the English has it.
- The QR and barcode scanners (QR, barkod) and QR Code Studio are on **both** platforms.
  Android reads 13 formats to iOS's 19; reading codes from photos and screenshots, Micro QR, Micro PDF417, GS1 DataBar,
  Shortcuts, webhooks and speech on code scans, and iCloud Sync stay iOS-only. The document, 3D
  and room scanners are **iOS only**. Android gets NFC read/write and webhooks with full parity,
  Amiibo included. Never promise a document, 3D or room scanner on Android.
- Business Card is a **separate app** on both platforms. Every Business Card CTA points at the
  standalone app, never at the legacy bundle inside Android Tools.

---

## 6. The final pass is monolingual

Close the English file. Reread the Turkish start to finish as a reader who has never seen the
original. Anything that only parses because you remember the English is a defect - rewrite it.
Calques survive side-by-side review precisely because the English is right there priming you.
Read specifically for `bir` and for English word order; those two are where Turkish translations
break down, and they cluster in the last third of every long post.
