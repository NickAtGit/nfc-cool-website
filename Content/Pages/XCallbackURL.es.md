---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Otras apps y páginas web pueden pedir a NFC.cool en el iPhone que haga algo y les devuelva el resultado, según la convención x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Otras apps y páginas web pueden pedir a NFC.cool en el iPhone que haga algo y les devuelva el resultado, según la convención [x-callback-url](https://x-callback-url.com).

Los webhooks, Atajos y esquemas de URL están en la [página para desarrolladores](/es/developers/).

<a href="#read-uid" class="landing-cta-button">Ver la documentación</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone escaneando una etiqueta NFC" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Leer el ID de una etiqueta desde tu app o página web

Un enlace le pide a NFC.cool que escanee una etiqueta y te devuelva su UID y, con `ndef=1`, también el mensaje NDEF de la etiqueta. Funciona desde cualquier página web o app del iPhone, sin nada que configurar aparte de instalar NFC.cool. El enlace sigue la convención [x-callback-url](https://x-callback-url.com). Leer etiquetas para otras apps y sitios web forma parte de NFC.cool Business, la licencia para empresas de NFC.cool en iPhone: [escríbenos](mailto:info@nfc.cool?subject=NFC.cool%20Business) para conseguir una.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Las dos formas hacen lo mismo. Mejor usa la de `https`: en un iPhone sin NFC.cool abre una página que explica cómo conseguirla, en lugar de fallar sin avisar. Ponla en un enlace que la persona toque; iOS no abre apps desde enlaces que un script sigue por su cuenta.

NFC.cool pasa a primer plano, indica quién recibe el ID de la etiqueta e inicia el escaneo. Si ya hay un enlace read-uid abierto, el enlace más reciente lo sustituye y quien llamó antes recibe `cancelled`.

### Parámetros

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool llama a esta URL en segundo plano con el resultado como parámetros de consulta. Todos los resultados llegan aquí al instante, también los fallos y las cancelaciones.</p>
<p><strong>Obligatorio:</strong> <code>x-get</code>, <code>x-post</code> o <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool envía el resultado aquí como JSON mediante POST.</p>
<p><strong>Obligatorio:</strong> <code>x-get</code>, <code>x-post</code> o <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Se abre tras una lectura correcta, con <code>uid</code>, <code>ndef</code> y <code>state</code> añadidos. Junto a <code>x-get</code> o <code>x-post</code> solo recibe <code>state</code>: el UID va al servidor que se le mostró a la persona y a ningún otro sitio.</p>
<p><strong>Obligatorio:</strong> <code>x-get</code>, <code>x-post</code> o <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Se abre cuando la persona cierra NFC.cool después de un fallo, con <code>errorCode</code>, <code>errorMessage</code> y <code>state</code>.</p>
<p><strong>Obligatorio:</strong> no</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Se abre cuando la persona cancela, con <code>state</code>.</p>
<p><strong>Obligatorio:</strong> no</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Cualquier cadena, por ejemplo un ID de solicitud de un solo uso. Se devuelve sin cambios con cada resultado.</p>
<p><strong>Obligatorio:</strong> no, pero recomendado</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> lee también el mensaje NDEF de la etiqueta. Sin él, solo se lee el UID.</p>
<p><strong>Obligatorio:</strong> no</p>
</article>

</div>

Usa `x-get` o `x-post`, no los dos. Codifica en URL cada valor de callback.

Cualquier página web puede abrir este enlace, por eso NFC.cool solo devuelve la llamada a URLs `https` y a esquemas de URL de otras apps, como `yourapp://nfc-done`; `x-get` y `x-post` tienen que ser `https`. Se rechazan `http` sin cifrar, `javascript:`, `data:`, `tel:`, los esquemas propios de NFC.cool y los esquemas del sistema que actúan por sí solos (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` y similares), y un enlace con cualquier callback rechazado se ignora.

### El UID

Hexadecimal en mayúsculas, sin separadores, con el byte más significativo primero. Su longitud distingue las familias de chips:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 bytes</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE y otras etiquetas ISO 15693</h3>
<p>8 bytes</p>
<p><code>E004015012345678</code></p>
</article>

</div>

Los UID ISO 15693 empiezan por `E0`, en el orden impreso en el chip y que muestran la mayoría de los lectores.

### El mensaje NDEF

Con `ndef=1`, `ndef` contiene el mensaje NDEF en bruto de la etiqueta, es decir, los registros sin la cabecera TLV, en Base64url sin relleno ([RFC 4648, sección 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` y `_` en lugar de `+` y `/`, y sin `=`. Se omite cuando la etiqueta no contiene ningún mensaje NDEF.

```js
// Node.js
const bytes = Buffer.from(ndef, "base64url");
```

```python
# Python
import base64
data = base64.urlsafe_b64decode(ndef + "=" * (-len(ndef) % 4))
```

### `x-get`

```
GET https://your-server.example/nfc?code=abc123&uid=E004015012345678&ndef=0QEFVAJkZUhp&state=7f3c9a
GET https://your-server.example/nfc?code=abc123&error=cancelled&state=7f3c9a
```

Tu URL se llama tal cual, con el resultado añadido después de los parámetros que ya tiene. Cada intento recibe exactamente una llamada, así que la página que la espera puede dejar de esperar en cuanto llega:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>La persona canceló el escaneo o cerró NFC.cool antes de leer una etiqueta.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>No se encontró ninguna etiqueta a tiempo o no se pudo leer la etiqueta.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Este iPhone no tiene acceso a NFC.cool Business.</p>
</article>

</div>

Después de `cancelled` o `scan-failed` la persona puede volver a intentarlo, y una lectura correcta vuelve a llamar entonces a `x-get` con el `uid`: toma la última llamada de cada `state` como la respuesta. Responde con cualquier estado 2xx. Si falla una llamada de éxito, NFC.cool ofrece enviarla de nuevo.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Responde con cualquier estado 2xx en menos de 20 segundos. Cualquier otra cosa cuenta como fallo: la persona puede enviarlo de nuevo y, al cerrar NFC.cool, se notifica `delivery-failed` a `x-error`. Usa `x-post` cuando la página que inició la lectura no se pueda volver a abrir por URL, por ejemplo un web view dentro de otra app; la persona vuelve con el enlace que iOS muestra en la esquina superior izquierda.

NFC.cool no envía cookies con `x-get` ni con `x-post`. Reconoce la solicitud por el `state` de un solo uso que pusiste en el enlace.

### Códigos de `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Este iPhone no tiene acceso a NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>No se encontró ninguna etiqueta a tiempo o no se pudo leer la etiqueta.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>La solicitud <code>x-post</code> falló.</p>
</article>

</div>

### Ejemplo

Una página que espera a su propio servidor, también con el mensaje NDEF:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
