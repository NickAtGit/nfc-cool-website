---
id: "nfc-safe-2026-05"
title: "NFC Safe: segreti cifrati su tag NFC che durano nel tempo"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "AES a 256 bit su tag NFC rivestiti di resina epossidica. I backup su carta bruciano. Quelli nel cloud vanno offline. I tag NFC no."
metaDescription: "NFC Safe cifra i tuoi segreti - seed phrase, password, codici di recupero - su un tag NFC con AES a 256 bit. Niente cloud, solo il tag e la passphrase."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Telefono, tessera NFC, scudo e lucchetto a rappresentare i segreti cifrati su NFC"
author: "Nicolo Stanciu"
---

La tua seed phrase è quasi sicuramente su un foglio di carta. Magari chiusa in una cassaforte. Magari sotto un'asse del pavimento. Magari divisa fra tre posti diversi, perché su Reddit qualcuno ha scritto che è così che fa la gente "seria" del mondo cripto. Resta comunque carta. La carta brucia. La carta si bagna. La carta si perde.

Sono anni che lavoro a NFC.cool, un'app per leggere e scrivere tag NFC, e a un certo punto ho iniziato a farmi una domanda che con i pagamenti e le tessere di accesso non c'entra niente: e se il backup non potesse marcire né deteriorarsi, e a chi lo trovasse non sembrasse nulla di che?

Da quella domanda è nato **NFC Safe**. Cifra qualsiasi testo - seed phrase, password, codici di recupero, qualunque cosa tu debba tenere segreta - su un tag NFC con crittografia AES a 256 bit. Il tag è autosufficiente. Niente cloud. Niente server. Niente account. Per leggere il segreto servono il tag fisico *e* la passphrase. Senza entrambi, il tag è solo un pezzetto di plastica con sopra qualche carattere senza senso.

Su un punto sono stato irremovibile fin dalla progettazione: i tuoi segreti non devono dipendere dall'esistenza della mia app. Per questo il formato di cifratura è [documentato e aperto](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), decodificatore Python di riferimento incluso. Se un giorno NFC.cool sparisse, i dati resterebbero recuperabili con un lettore NFC qualsiasi e le specifiche alla mano. È una promessa che posso mantenere: le specifiche le ho scritte apposta perché sopravvivessero al software.

---

## Il problema di conservare i segreti

Se mi chiedessi di indicare il punto debole di ogni metodo per custodire segreti che ho visto finora, risponderei senza pensarci: la carta brucia, i connettori USB si ossidano, i servizi cloud vengono violati, gli hardware wallet gestiscono solo le seed phrase delle criptovalute e la memoria dimentica. Ogni opzione cede a modo suo.

Allora ho ragionato al contrario. Il backup ideale dovrebbe essere fisicamente resistente, cifrato, autosufficiente, ridondante e destinato a durare. I tag NFC soddisfano tutti e cinque i requisiti, e all'inizio la cosa ha sorpreso anche me. Non hanno batteria né parti in movimento, e il chip NTAG216 è certificato per oltre 10 anni di conservazione dei dati. Le versioni rivestite di resina epossidica reggono l'acqua, gli urti e decenni di abbandono in un cassetto. Se le differenze fra un chip e l'altro non ti sono ancora chiare, ho messo a confronto pregi e limiti in [tipi di tag NFC per iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Come si usa NFC Safe

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-safe-encrypted-secrets/1-encrypt-440w.webp" alt="NFC Safe in modalità Encrypt, con un messaggio segreto e la passphrase correct-horse-battery inseriti"><p><strong>Cifra.</strong> Il segreto e una passphrase robusta, poi avvicina un tag al telefono.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-safe-encrypted-secrets/2-decrypt-440w.webp" alt="NFC Safe in modalità Decrypt, con il segreto riletto dal tag"><p><strong>Decifra.</strong> La stessa passphrase e un tocco, e il segreto torna.</p></li>
</ol>
</figure>

NFC Safe si trova dentro NFC.cool Tools, nella sezione NFC Apps. Ho tenuto tutto su una sola schermata, con un selettore in alto: Cifra o Decifra. Se hai già scritto un tag almeno una volta, non troverai niente di spiazzante.

**Per cifrare:**
1. Apri Tools → NFC Apps → NFC Safe
2. Scegli **Cifra**
3. Scrivi o incolla il segreto
4. Imposta una passphrase robusta
5. Tocca Cifra e avvicina un tag NFC al telefono

**Per decifrare:**
1. Stessa schermata, passa a **Decifra**
2. Inserisci la passphrase
3. Avvicina un tag già cifrato e il segreto compare

A livello tecnico succede questo: AES-256-GCM con PBKDF2 (HMAC-SHA-256, 100.000 iterazioni, salt casuale da 16 byte). Il risultato finisce sul tag come record NDEF personalizzato (`urn:nfc:ext:crypto`). Se preferisci verificarlo di persona invece di credermi sulla parola, [le specifiche complete del formato sono su GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). E se prima ti incuriosisce vedere com'è fatta una normale scrittura senza cifratura, l'ho spiegata passo passo in [come scrivere tag NFC da iPhone](/blog/write-nfc-tags-iphone/).

---

## La strategia della ridondanza

Ecco come lo userei io. Un tag NTAG216 costa più o meno come un caffè, quindi non ha senso fermarsi a uno solo. Comprane una manciata, cifra lo stesso segreto su ciascuno e distribuiscili: il cassetto della scrivania, l'ufficio, la casa di un familiare, una cassetta di sicurezza, un posto che verrebbe in mente solo a te. Preso da solo, senza la passphrase, un tag non vuol dire niente. È la parte del progetto che mi piace di più: è a due fattori per natura, un tag fisico più una passphrase, custoditi in due posti separati, senza che tu debba configurare nulla.

---

## Perché un tag NFC e non una chiavetta USB o una scheda SD

Me lo chiedono spesso: perché non consigliare semplicemente una chiavetta USB o una scheda SD? La risposta sincera è che ne ho viste morire troppe, in modi banali e del tutto evitabili. Un tag NFC aggira tutti questi problemi:

- **nessun connettore** - non c'è niente che si ossidi o si pieghi
- **nessuna batteria** - è passivo, lo alimenta il lettore
- **nessun filesystem** - non c'è niente che si corrompa
- **nessun driver** - qualsiasi smartphone legge l'NFC in modo nativo
- **piccolo ed economico** - grande come una moneta, meno di un dollaro se ne compri diversi
- **resistente** - le versioni in resina epossidica reggono acqua, urti e raggi UV

L'unico limite vero è la capacità: circa 500-700 byte una volta tolto lo spazio che si prende la cifratura. Non è molto, ma basta e avanza per ciò a cui serve davvero, cioè una seed phrase da 24 parole, una password principale o una serie di codici di recupero.

---

## Note sulla sicurezza

Preferisco dirti subito dove sono gli spigoli, invece di lasciarteli scoprire dopo:

- **La passphrase è tutto.** L'AES a 256 bit è inviolabile. Una passphrase debole no. Usa una stringa casuale di almeno 20 caratteri e su questo punto non fare sconti.
- **Il raggio d'azione dell'NFC è cortissimo** (circa 4 cm). Nessuno legge il tag dall'altra parte della stanza: quella distanza minima è un pregio, non un difetto.
- **Nessuna cancellazione da remoto.** Hai perso un tag? Distruggilo fisicamente, bastano un paio di forbici. E comunque, senza la passphrase, quei dati non servono a nessuno.
- **Nessun recupero della passphrase.** Se la dimentichi, i dati sono persi. È una scelta voluta: una via di recupero è anche una via d'attacco. Annota la passphrase da qualche parte, lontano dai tag.

---

## Il quadro d'insieme

Lavorando sull'NFC tutti i giorni, ho visto questi tag diventare in sordina il supporto su cui finiscono le cose che contano. Il Passaporto digitale di prodotto dell'UE elenca l'NFC fra i vettori di dati approvati, subito accanto ai codici QR. Philips li mette nelle testine degli spazzolini. Gli hotel li usano come chiavi delle stanze. Economici, resistenti e leggibili da qualsiasi dispositivo che hai già in tasca: è una combinazione rara, ed è proprio per questo che continuo a trovarci usi nuovi. Se ti interessa la panoramica generale, ho raccolto le basi in [tag NFC spiegati: la guida completa per chi comincia](/blog/nfc-tags-beginners-guide/).

NFC Safe è il mio tentativo di prendere quella resistenza e aggiungerci l'unica cosa che le mancava: la crittografia. Un backup che dura più della carta, che chi lo trova non può leggere e che costa meno di un caffè. È quello che volevo per me, così l'ho costruito.

Disponibile ora su [NFC.cool Tools per iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-it&mt=8) e su [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-safe-encrypted-secrets-it).
