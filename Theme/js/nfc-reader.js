/* Online NFC Reader + Writer - powers the widget on /online-nfc-reader/.
   Uses the Web NFC API (NDEFReader: scan / write), which exists only in
   Chrome on Android. data-state picks the visible
   .nfc-reader-panel; data-mode highlights the Read/Write tab. The HTML
   default state is "desktop", so a no-JS visitor still lands on a panel.

   Localization: every user-facing string flows through t(key). English
   lives in DEFAULTS below. To translate, add a JSON string table to the
   localized page - e.g. in Content/Pages/NfcReader.de.md:
      <script type="application/json" id="nfc-i18n">{"err.read":"..."}</script>
   Any key present there overrides the English default; missing keys fall
   back to English. The page's own HTML (panel copy, buttons, FAQ) is
   localized the usual way, by creating NfcReader.<lang>.md. */
(function () {
   'use strict';

   const DEFAULTS = {
      'rec.text': 'Text',
      'rec.link': 'Link',
      'rec.phone': 'Phone',
      'rec.email': 'Email',
      'rec.sms': 'SMS',
      'rec.location': 'Location',
      'rec.contact': 'Contact',
      'rec.contactCard': 'Contact card',
      'rec.wifi': 'Wi-Fi',
      'rec.wifiNetwork': 'Wi-Fi network',
      'rec.smartPoster': 'Smart Poster',
      'rec.app': 'App',
      'rec.empty': 'Empty',
      'rec.emptyValue': 'No data on this record.',
      'rec.data': 'Data',
      'rec.generic': 'Record',
      'rec.undecodable': '(could not be decoded)',
      'read.unavailable': 'unavailable',
      'read.noRecords': 'The tag is readable but holds no records.',
      'unit.bytes': 'bytes',
      'tech.serial': 'Serial number',
      'tech.records': 'Records',
      'tech.total': 'Total payload',
      'tech.record': 'Record',
      'tech.type': 'Type',
      'tech.media': 'Media type',
      'tech.id': 'Record ID',
      'tech.encoding': 'Encoding',
      'tech.language': 'Language',
      'tech.size': 'Size',
      'tech.note1': "A browser can't see the chip model, memory size or lock state. The ",
      'tech.appLink': 'NFC.cool app',
      'tech.note2': " reads all of that, plus the chip's raw memory.",
      'summary.contact': 'Contact: ',
      'summary.wifi': 'Wi-Fi: ',
      'valid.link': 'Enter a link to write to the tag.',
      'valid.linkInvalid': "That doesn't look like a valid link.",
      'valid.text': 'Enter some text to write to the tag.',
      'valid.phone': 'Enter a phone number.',
      'valid.email': 'Enter an email address.',
      'valid.latlng': 'Enter both latitude and longitude.',
      'valid.latlngNum': 'Latitude and longitude must be numbers.',
      'valid.contact': 'Enter a name for the contact.',
      'valid.wifiSsid': 'Enter the Wi-Fi network name.',
      'valid.wifiPass': 'Enter the Wi-Fi password.',
      'err.readingError': "I couldn't read that tag. Hold it flat against the top of your phone, then try again.",
      'err.blocked': 'NFC access was blocked. Allow NFC for this site, then try again.',
      'err.notSupported': "This phone can't reach an NFC chip. Check that NFC is switched on in Android settings.",
      'err.notReadable': "Android couldn't open NFC. Make sure NFC is turned on, then try again.",
      'err.write': "The tag couldn't be written. It may be locked, too small, or it moved away too soon.",
      'err.read': 'The scan stopped unexpectedly. Hold a tag to your phone and try again.'
   };

   function init() {
      const app = document.getElementById('nfc-reader-app');
      if (!app) return;

      // Load the optional per-locale string overrides embedded in the page.
      let STR = {};
      try {
         const i18nEl = document.getElementById('nfc-i18n');
         if (i18nEl) STR = JSON.parse(i18nEl.textContent) || {};
      } catch (e) { STR = {}; }
      function t(key) {
         if (STR[key] != null) return STR[key];
         if (DEFAULTS[key] != null) return DEFAULTS[key];
         return key;
      }
      const docLang = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2);

      function setState(s) { app.setAttribute('data-state', s); }
      function stateNow() { return app.getAttribute('data-state'); }
      function setMode(m) {
         app.setAttribute('data-mode', m);
         app.querySelectorAll('[data-nfc-tab]').forEach(function (tab) {
            tab.setAttribute('aria-selected', tab.getAttribute('data-nfc-tab') === m ? 'true' : 'false');
         });
      }

      // Route non-Android-Chrome visitors to a device-specific panel. Web NFC
      // (NDEFReader) ships only in Chrome on Android; iPhone and desktop get
      // their own guidance instead of a misleading "unsupported" fallback.
      const ua = navigator.userAgent || '';
      const isIOS = /iPad|iPhone|iPod/.test(ua) ||
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isAndroid = /Android/.test(ua);
      if (!('NDEFReader' in window)) {
         setState(isIOS ? 'ios' : (isAndroid ? 'android-other' : 'desktop'));
         return;
      }

      const recordsEl = app.querySelector('[data-nfc-records]');
      const serialEl = app.querySelector('[data-nfc-serial]');
      const errorEl = app.querySelector('[data-nfc-error-msg]');
      const writtenEl = app.querySelector('[data-nfc-written]');
      const techEl = app.querySelector('[data-nfc-tech]');
      const typeSelectEl = app.querySelector('[data-nfc-type-select]');
      const fieldGroups = app.querySelectorAll('[data-nfc-fields]');
      const inputErrEl = app.querySelector('[data-nfc-input-error]');

      let scanReader = null;     // held so the active scan isn't GC'd
      let readArmed = false;     // reader.scan() is already listening
      let writeType = 'link';    // the selected Write dropdown type
      let lastAction = 'read';   // what the error panel's retry re-runs
      let opAbort = null;        // aborts an in-flight write / lock

      setMode('read');
      setState('read-ready');

      // --- Reading -----------------------------------------------------
      // Render a DataView as space-separated 2-digit hex.
      function bytesToHex(view) {
         const out = [];
         for (let i = 0; i < view.byteLength; i++) {
            out.push(view.getUint8(i).toString(16).padStart(2, '0'));
         }
         return out.join(' ').toUpperCase();
      }

      // Pull the SSID out of a Wi-Fi Simple Config (WSC) payload.
      function wscSsid(view) {
         try {
            function scan(start, end) {
               let p = start;
               while (p + 4 <= end) {
                  const type = view.getUint16(p);
                  const len = view.getUint16(p + 2);
                  const vs = p + 4;
                  if (vs + len > end) break;
                  if (type === 0x1045) {
                     return new TextDecoder().decode(new DataView(view.buffer, view.byteOffset + vs, len));
                  }
                  if (type === 0x100E) { const r = scan(vs, vs + len); if (r) return r; }
                  p = vs + len;
               }
               return '';
            }
            return scan(0, view.byteLength);
         } catch (e) { return ''; }
      }

      // Summarise a smart-poster's nested URL + title records.
      function smartPosterSummary(record) {
         try {
            const nested = record.toRecords ? record.toRecords() : [];
            let url = '', title = '';
            nested.forEach(function (r) {
               if (r.recordType === 'url' || r.recordType === 'absolute-url') {
                  url = new TextDecoder().decode(r.data);
               } else if (r.recordType === 'text') {
                  title = new TextDecoder(r.encoding || 'utf-8').decode(r.data);
               }
            });
            return title ? title + ' (' + url + ')' : url;
         } catch (e) { return t('rec.smartPoster'); }
      }

      // Decode one NDEF record into { label, value, href? }.
      function decodeRecord(record) {
         const type = record.recordType;
         try {
            if (type === 'text') {
               return { label: t('rec.text'), value: new TextDecoder(record.encoding || 'utf-8').decode(record.data) };
            }
            if (type === 'url' || type === 'absolute-url') {
               const url = new TextDecoder().decode(record.data);
               const scheme = (url.split(':')[0] || '').toLowerCase();
               const named = { tel: t('rec.phone'), mailto: t('rec.email'), sms: t('rec.sms'), geo: t('rec.location') };
               return { label: named[scheme] || t('rec.link'), value: url, href: url };
            }
            if (type === 'mime') {
               const mt = (record.mediaType || '').toLowerCase();
               if (mt.indexOf('vcard') !== -1) {
                  const text = new TextDecoder().decode(record.data);
                  const fn = (text.match(/^FN:(.*)$/m) || [])[1];
                  return { label: t('rec.contact'), value: fn ? fn.trim() : t('rec.contactCard') };
               }
               if (mt.indexOf('wfa.wsc') !== -1) {
                  return { label: t('rec.wifi'), value: wscSsid(record.data) || t('rec.wifiNetwork') };
               }
               return { label: record.mediaType || t('rec.data'), value: record.data.byteLength + ' ' + t('unit.bytes') };
            }
            if (type === 'smart-poster') {
               return { label: t('rec.smartPoster'), value: smartPosterSummary(record) };
            }
            if (type === 'android.com:pkg') {
               return { label: t('rec.app'), value: new TextDecoder().decode(record.data) };
            }
            if (type === 'empty') {
               return { label: t('rec.empty'), value: t('rec.emptyValue') };
            }
            return { label: String(type), value: new TextDecoder().decode(record.data) };
         } catch (e) {
            return { label: String(type || t('rec.generic')), value: t('rec.undecodable') };
         }
      }

      function techRow(label, value) {
         const row = document.createElement('div');
         row.className = 'nfc-reader-tech-row';
         const l = document.createElement('span');
         l.className = 'nfc-reader-tech-label';
         l.textContent = label;
         const v = document.createElement('span');
         v.className = 'nfc-reader-tech-value';
         v.textContent = value;
         row.appendChild(l);
         row.appendChild(v);
         return row;
      }

      // Fill the unfoldable "Technical details" section from the read event.
      function buildTech(records, serial) {
         techEl.textContent = '';
         let totalBytes = 0;
         records.forEach(function (r) { totalBytes += (r.data && r.data.byteLength) || 0; });
         techEl.appendChild(techRow(t('tech.serial'), serial));
         techEl.appendChild(techRow(t('tech.records'), String(records.length)));
         techEl.appendChild(techRow(t('tech.total'), totalBytes + ' ' + t('unit.bytes')));
         records.forEach(function (r, i) {
            const block = document.createElement('div');
            block.className = 'nfc-reader-tech-record';
            const head = document.createElement('p');
            head.className = 'nfc-reader-tech-head';
            head.textContent = t('tech.record') + ' ' + (i + 1);
            block.appendChild(head);
            block.appendChild(techRow(t('tech.type'), r.recordType || '-'));
            if (r.mediaType) block.appendChild(techRow(t('tech.media'), r.mediaType));
            if (r.id) block.appendChild(techRow(t('tech.id'), r.id));
            if (r.encoding) block.appendChild(techRow(t('tech.encoding'), r.encoding));
            if (r.lang) block.appendChild(techRow(t('tech.language'), r.lang));
            const len = (r.data && r.data.byteLength) || 0;
            block.appendChild(techRow(t('tech.size'), len + ' ' + t('unit.bytes')));
            if (len) {
               const hex = document.createElement('pre');
               hex.className = 'nfc-reader-hex';
               hex.textContent = bytesToHex(r.data);
               block.appendChild(hex);
            }
            techEl.appendChild(block);
         });
         const note = document.createElement('p');
         note.className = 'nfc-reader-tech-note';
         note.appendChild(document.createTextNode(t('tech.note1')));
         const link = document.createElement('a');
         link.href = '/features/nfc-reader-writer/';
         link.textContent = t('tech.appLink');
         note.appendChild(link);
         note.appendChild(document.createTextNode(t('tech.note2')));
         techEl.appendChild(note);
      }

      function showResult(event) {
         const serial = event.serialNumber ? event.serialNumber.toUpperCase() : t('read.unavailable');
         serialEl.textContent = serial;
         recordsEl.textContent = '';
         const records = (event.message && event.message.records) || [];
         if (!records.length) {
            const li = document.createElement('li');
            li.className = 'nfc-reader-record';
            li.textContent = t('read.noRecords');
            recordsEl.appendChild(li);
         } else {
            records.forEach(function (record) {
               const decoded = decodeRecord(record);
               const li = document.createElement('li');
               li.className = 'nfc-reader-record';
               const label = document.createElement('span');
               label.className = 'nfc-reader-record-label';
               label.textContent = decoded.label;
               const value = document.createElement(decoded.href ? 'a' : 'span');
               value.className = 'nfc-reader-record-value';
               value.textContent = decoded.value;
               if (decoded.href) {
                  value.href = decoded.href;
                  value.target = '_blank';
                  value.rel = 'noopener nofollow';
               }
               li.appendChild(label);
               li.appendChild(value);
               recordsEl.appendChild(li);
            });
         }
         buildTech(records, serial);
         setState('result');
      }

      async function startScan() {
         lastAction = 'read';
         setState('scanning');
         // The reader stays armed once scan() resolves; onreading is guarded
         // on data-state so taps only count while the panel is "scanning".
         if (readArmed) return;
         try {
            scanReader = new NDEFReader();
            scanReader.onreading = function (event) {
               if (stateNow() === 'scanning') showResult(event);
            };
            scanReader.onreadingerror = function () {
               if (stateNow() !== 'scanning') return;
               errorEl.textContent = t('err.readingError');
               lastAction = 'read';
               setState('error');
            };
            await scanReader.scan();
            readArmed = true;
         } catch (e) {
            handleError(e, 'read');
         }
      }

      // --- Writing -----------------------------------------------------
      // Build a vCard 3.0 string for a contact record.
      function buildVCard(name, tel, email, org) {
         const lines = ['BEGIN:VCARD', 'VERSION:3.0', 'N:' + name + ';;;;', 'FN:' + name];
         if (tel) lines.push('TEL;TYPE=CELL:' + tel);
         if (email) lines.push('EMAIL:' + email);
         if (org) lines.push('ORG:' + org);
         lines.push('END:VCARD');
         return lines.join('\r\n');
      }

      // Build a Wi-Fi Simple Config (WSC) payload: a Credential TLV (0x100E)
      // wrapping SSID, auth/encryption type, network key and a zero MAC.
      function buildWifiWsc(ssid, password, security) {
         const enc = new TextEncoder();
         let auth = 0x0020, encr = 0x0008;          // WPA2-PSK / AES
         if (security === 'wep') { auth = 0x0001; encr = 0x0002; }
         else if (security === 'open') { auth = 0x0001; encr = 0x0001; }
         function tlv(type, value) {
            const out = new Uint8Array(4 + value.length);
            out[0] = type >> 8; out[1] = type & 0xff;
            out[2] = value.length >> 8; out[3] = value.length & 0xff;
            out.set(value, 4);
            return out;
         }
         function u16(n) { return new Uint8Array([n >> 8, n & 0xff]); }
         const parts = [
            tlv(0x1026, new Uint8Array([1])),        // Network Index
            tlv(0x1045, enc.encode(ssid)),           // SSID
            tlv(0x1003, u16(auth)),                  // Authentication Type
            tlv(0x100F, u16(encr)),                  // Encryption Type
            tlv(0x1027, enc.encode(password || '')), // Network Key
            tlv(0x1020, new Uint8Array(6))           // MAC Address
         ];
         let len = 0;
         parts.forEach(function (p) { len += p.length; });
         const cred = new Uint8Array(len);
         let off = 0;
         parts.forEach(function (p) { cred.set(p, off); off += p.length; });
         return tlv(0x100E, cred);
      }

      function activeGroup() {
         return app.querySelector('[data-nfc-fields="' + writeType + '"]');
      }

      // Build the NDEF records for the selected type.
      // Returns { records, summary } or null when validation fails.
      function buildRecords() {
         inputErrEl.textContent = '';
         const g = activeGroup();
         function val(k) {
            const el = g && g.querySelector('[data-k="' + k + '"]');
            return el ? (el.value || '').trim() : '';
         }
         function fail(msg, k) {
            inputErrEl.textContent = msg;
            const el = k && g && g.querySelector('[data-k="' + k + '"]');
            if (el) el.focus();
            return null;
         }
         function normalizeUrl(u) {
            if (!u) return null;
            if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u;
            try { new URL(u); } catch (e) { return null; }
            return u;
         }

         if (writeType === 'link') {
            if (!val('url')) return fail(t('valid.link'), 'url');
            const url = normalizeUrl(val('url'));
            if (!url) return fail(t('valid.linkInvalid'), 'url');
            return { records: [{ recordType: 'url', data: url }], summary: url };
         }
         if (writeType === 'text') {
            const text = val('text');
            if (!text) return fail(t('valid.text'), 'text');
            return { records: [{ recordType: 'text', data: text, lang: docLang }], summary: text };
         }
         if (writeType === 'phone') {
            const tel = val('tel');
            if (!tel) return fail(t('valid.phone'), 'tel');
            const uri = 'tel:' + tel.replace(/\s+/g, '');
            return { records: [{ recordType: 'url', data: uri }], summary: uri };
         }
         if (writeType === 'email') {
            const addr = val('email');
            if (!addr) return fail(t('valid.email'), 'email');
            let uri = 'mailto:' + addr;
            const subject = val('subject');
            if (subject) uri += '?subject=' + encodeURIComponent(subject);
            return { records: [{ recordType: 'url', data: uri }], summary: uri };
         }
         if (writeType === 'sms') {
            const tel = val('tel');
            if (!tel) return fail(t('valid.phone'), 'tel');
            let uri = 'sms:' + tel.replace(/\s+/g, '');
            const body = val('body');
            if (body) uri += '?body=' + encodeURIComponent(body);
            return { records: [{ recordType: 'url', data: uri }], summary: uri };
         }
         if (writeType === 'location') {
            const lat = val('lat'), lng = val('lng');
            if (!lat || !lng) return fail(t('valid.latlng'), !lat ? 'lat' : 'lng');
            if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
               return fail(t('valid.latlngNum'), 'lat');
            }
            const uri = 'geo:' + parseFloat(lat) + ',' + parseFloat(lng);
            return { records: [{ recordType: 'url', data: uri }], summary: uri };
         }
         if (writeType === 'contact') {
            const name = val('name');
            if (!name) return fail(t('valid.contact'), 'name');
            const vcard = buildVCard(name, val('tel'), val('email'), val('org'));
            return {
               records: [{ recordType: 'mime', mediaType: 'text/vcard', data: vcard }],
               summary: t('summary.contact') + name
            };
         }
         if (writeType === 'wifi') {
            const ssid = val('ssid');
            if (!ssid) return fail(t('valid.wifiSsid'), 'ssid');
            const secEl = g.querySelector('[data-k="security"]');
            const security = secEl ? secEl.value : 'wpa';
            const password = val('password');
            if (security !== 'open' && !password) return fail(t('valid.wifiPass'), 'password');
            const bytes = buildWifiWsc(ssid, password, security);
            return {
               records: [{ recordType: 'mime', mediaType: 'application/vnd.wfa.wsc', data: bytes }],
               summary: t('summary.wifi') + ssid
            };
         }
         return null;
      }

      async function startWrite() {
         const built = buildRecords();
         if (!built) return;
         lastAction = 'write';
         setState('writing');
         opAbort = new AbortController();
         try {
            const writer = new NDEFReader();
            await writer.write({ records: built.records }, { signal: opAbort.signal });
            writtenEl.textContent = built.summary;
            setState('written');
         } catch (e) {
            if (e && e.name === 'AbortError') return; // caller already set the next state
            handleError(e, 'write');
         }
      }

      // --- Shared ------------------------------------------------------
      function handleError(e, action) {
         lastAction = action;
         const name = e && e.name;
         let msg;
         if (name === 'NotAllowedError') {
            msg = t('err.blocked');
         } else if (name === 'NotSupportedError') {
            msg = t('err.notSupported');
         } else if (name === 'NotReadableError') {
            msg = t('err.notReadable');
         } else if (action === 'write') {
            msg = t('err.write');
         } else {
            msg = t('err.read');
         }
         errorEl.textContent = msg;
         setState('error');
      }

      function retry() {
         if (lastAction === 'write') startWrite();
         else startScan();
      }

      function cancelOp() {
         if (opAbort) opAbort.abort();
         setState(app.getAttribute('data-mode') === 'write' ? 'write-ready' : 'read-ready');
      }

      function switchMode(mode) {
         if (opAbort) opAbort.abort();
         setMode(mode);
         setState(mode === 'write' ? 'write-ready' : 'read-ready');
      }

      function setWriteType(type) {
         writeType = type;
         app.setAttribute('data-write-type', type);
         fieldGroups.forEach(function (g) {
            g.hidden = g.getAttribute('data-nfc-fields') !== type;
         });
         inputErrEl.textContent = '';
      }

      // --- Wiring ------------------------------------------------------
      function onClick(selector, handler) {
         app.querySelectorAll(selector).forEach(function (el) {
            el.addEventListener('click', handler);
         });
      }
      onClick('[data-nfc-scan], [data-nfc-again]', startScan);
      onClick('[data-nfc-write]', startWrite);
      onClick('[data-nfc-write-again]', function () { switchMode('write'); });
      onClick('[data-nfc-retry]', retry);
      onClick('[data-nfc-cancel]', cancelOp);
      app.querySelectorAll('[data-nfc-tab]').forEach(function (tab) {
         tab.addEventListener('click', function () { switchMode(tab.getAttribute('data-nfc-tab')); });
      });
      typeSelectEl.addEventListener('change', function () { setWriteType(typeSelectEl.value); });
      app.querySelectorAll('[data-nfc-form] input').forEach(function (el) {
         el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); startWrite(); }
         });
      });
      setWriteType(typeSelectEl.value);
   }

   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
   } else {
      init();
   }
})();
