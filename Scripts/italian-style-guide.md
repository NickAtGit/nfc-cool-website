# NFC.cool - Italian (`it`) translation style sheet

The `it` locale has NO existing corpus. These rules ARE the register. Follow them literally;
inconsistency between files is what makes a site read as machine-translated, more than any
single awkward sentence.

Decisions already settled with Nico (do not relitigate):
- **Register: informal "tu"**, never "Lei". (Matches `es`, and Apple Italy's consumer voice.)
- **Vocabulary: Apple Italy style.** Italian prose; English kept only for established
  invariable loanwords. Verbs are Italianized.
- **Quotes: ASCII `"…"`.** `it` is deliberately NOT in `i18n.yaml`'s `lint.quoteStyle`
  (like `es`/`pt`/`id`). Do not use caporali `«»` and do not use curly “”.

---

## 1. The voice

Nico writes in first person as the actual developer: "I built", "I've seen", "I sent in a
gripe". Italian keeps that. Use the first person singular (`ho creato`, `ho visto`), and
address the reader as `tu` (`avvicina`, `apri`, `puoi`).

Not corporate, not breathless. No exclamation marks unless the English has one. No decorative
emojis in any locale, ever.

---

## 2. Glossary - these renderings are FIXED across all 53 files

| English | Italian | Notes |
| --- | --- | --- |
| NFC tag / tags | **tag NFC** (invariable) | never *tags*, never *etichetta* |
| to scan | **scansionare** | `scansiona il tag`, `scansionato` |
| a scan | **una scansione** | |
| to tap (a tag) | **avvicinare** | `avvicina l'iPhone al tag`. NEVER *toccare* for the NFC gesture |
| a tap (NFC) | **un avvicinamento**, or rephrase | `con un semplice avvicinamento` |
| to tap (UI button) | **toccare** | UI taps only |
| to write (a tag) | **scrivere** | `scrivere un tag` |
| to read (a tag) | **leggere** | |
| reader / writer | **lettore / scrittore** | `lettore NFC online` |
| app | **app** (f., invariable) | `le app`, `un'app`. NEVER *apps* |
| backup | **backup** (m., invariable) | never *backups* |
| link | **link** (m., invariable) | never *links* |
| smartphone / widget / password | invariable loanwords | no `-s` plural |
| digital business card | **biglietto da visita digitale** | |
| lead capture | **raccolta dei contatti** | |
| Conference Mode | **Modalità Conferenza** | in-app feature name, capitalized |
| free | **gratis** (adv.) / **gratuito** (adj.) | `scarica gratis`, `un'app gratuita` |
| paid / premium | **a pagamento** / **premium** | |
| subscription | **abbonamento** | |
| feature | **funzione** | *funzionalità* only when abstract |
| settings | **impostazioni** | |
| privacy | **privacy** (invariable) | |
| device | **dispositivo** | |
| shortcut (iOS app) | **Comando rapido** | Apple's own Italian term for Shortcuts |
| Shortcuts (the app) | **Comandi Rapidi** | |
| Apple Wallet / Play Store / App Store | keep English | product names |
| room scan | **scansione degli ambienti** | |
| document scan | **scansione dei documenti** | |
| barcode | **codice a barre** | |
| QR code | **codice QR** | plural `codici QR` |
| counter (scan counter) | **contatore** | `contatore delle scansioni` |
| webhook | **webhook** (invariable) | |
| firmware / cloud / server | invariable | |

Product names are NEVER translated: `NFC.cool`, `NFC.cool Tools`, `NFC.cool Business Card`,
`NTAG 424 DNA`, `AES-128`, `iPhone`, `iPad`, `Android`, `Amiibo`.

---

## 3. The Italian calque traps (the #1 failure mode)

**Adapt, don't calque.** A native reader must not be able to tell this was translated. These
are the specific tells in Italian:

1. **Possessive overuse - the loudest tell.** English repeats "your"; Italian drops it when
   ownership is obvious.
   - BAD: `Avvicina il tuo iPhone al tuo tag NFC.`
   - GOOD: `Avvicina l'iPhone al tag NFC.`
   Keep `tuo/tua` only where the ownership is genuinely the point (`i tuoi contatti`,
   `il tuo biglietto da visita`).

2. **"You can" fatigue.** English leans on "you can"; Italian prefers the bare imperative or
   an impersonal construction.
   - BAD: `Puoi scrivere un link, puoi aggiungere il Wi-Fi, puoi salvare un contatto.`
   - GOOD: `Scrivi un link, aggiungi il Wi-Fi, salva un contatto.`

3. **No English plurals on loanwords.** `i tag`, `le app`, `i backup`, `i link`, `i widget`.
   Never `tags`, `apps`, `backups`, `links`. (Linted.)

4. **Noun stacks need prepositions.** English piles nouns; Italian cannot.
   - `NFC tag scan counter` → `contatore delle scansioni dei tag NFC`
   - `document scanning guide` → `guida alla scansione dei documenti`

5. **English gerunds don't survive.** "Scanning tags is easy" is not `Scansionando…`.
   Use an infinitive or a noun: `Scansionare i tag è semplice.` / `La scansione dei tag è semplice.`

6. **"In order to" → `per`.** Never `al fine di` in marketing prose.

7. **Passive overuse.** English passives usually become an Italian active or `si` impersonal:
   `il tag viene letto` → `si legge il tag` / `l'app legge il tag`.

8. **False friends.** `eventually` ≠ *eventualmente* (use `alla fine`, `col tempo`);
   `actually` ≠ *attualmente* (use `in realtà`); `to realize` ≠ *realizzare* (use
   `rendersi conto`); `consistent` ≠ *consistente* (use `coerente`).

9. **Headings are rephrased, never calqued.** A bare English pronoun dangles in Italian - name
   the subject. "Is it genuine?" → `Il documento è autentico?`, not `È autentico?`.
   "The honest limits" → `Cosa l'app non sa fare`, not a literal *I limiti onesti*.

10. **Orthography tells** (all linted): `perché` not *perchè*; `È` not *E'*; `po'` not *pò*;
    `un'app` (f. elision) but `un anno` (m., no apostrophe); `qual è` never *qual'è*.
    Use real accented characters, never ASCII workarounds.

---

## 4. Mechanics (same as every locale)

- **No em/en dashes anywhere.** Plain hyphen with spaces: ` - `. (Hard gate.)
- **No decorative emojis.**
- **Titles: sentence case.** Title Case is English-only. `Come scrivere un tag NFC da iPhone`,
  not `Come Scrivere Un Tag NFC Da iPhone`. Proper nouns keep their capitals.
- **Keep byte-identical:** `id`, `date`, the filename `<slug>`, `image`/`imagePath` paths,
  `tags` slugs, all URLs, image dimensions, `author` handles.
- **Translate:** `title`, `summary`, `imageAlt`, `description`, body prose, link *text*,
  and any `metaTitle`/`metaDescription`/`ogTitle`/`ogDescription` present.
- **Blog CTA tracking:** `ct=blog-<slug>-it` and `utm_campaign%3Dblog-<slug>-it`. Everything
  else in the URL is unchanged.
- **Internal links** stay locale-agnostic: `/blog/<slug>/`, `/features/nfc-reader-writer/`.
  Internal links need the `/it/` prefix: SiteKit does not rewrite them, and a bare link lands the reader on the English page.
- **Blog `---` rule:** exactly one `---` before every `## H2` and nowhere else. Preserve the
  English file's structure exactly.
- **Pricing sentinels stay literal English** in `values:` arrays: `"limited"`, `"soon"`,
  `"partial"`, `"~"`, `"✓"`, `"✗"`. Only the row `label:` is translated. Translating a
  sentinel silently breaks the pill rendering.
- **App Store review quotes ARE translated** (see `Landing.es.yaml`); the `author` handle
  stays as-is, the `location` is translated: `App Store · Stati Uniti`, `App Store · Germania`,
  `App Store · Giappone`.
- **HTML in markdown pages** (`<section>`, `<div>`, `class=`, `src=`, `alt=`) - translate only
  the human-readable text and `alt` values. Never touch tags, classes, or paths.
- Delete the `⟦TODO:it⟧` banner line when the file is done. It is a hard build error.

---

## 5. The final pass is monolingual

Close the English file. Reread the Italian start to finish as a reader who has never seen the
original. Anything that only parses because you remember the English is a defect - rewrite it.
Calques survive side-by-side review precisely because the English is right there priming you.
Give the last third of every long post its own dedicated read; that is where calques cluster.
