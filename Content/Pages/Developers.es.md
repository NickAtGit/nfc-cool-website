---
title: "Desarrolladores"
slug: "developers"
description: "Cómo integrar NFC.cool en tu stack - referencia del payload del webhook, App Intents, esquemas de URL, feeds legibles por máquina y todo lo que necesitas para la integración del lado del servidor, en iPhone y Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Para quienes construyen

NFC.cool es un escáner que respeta tu stack. Cada escaneo puede ser un HTTP POST estructurado a tu propio backend, en JSON predecible, enviado directamente desde el dispositivo. Sin intermediarios, sin cuenta de NFC.cool, sin subidas a nuestros servidores.

<a href="#webhook-payload" class="landing-cta-button">Ver el payload</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Datos de escaneo fluyendo hacia un endpoint de webhook" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Dónde puedes integrar NFC.cool

Un webhook no es más que un `POST` JSON a una URL que tú controlas - así que cualquier cosa que hable HTTP entra en juego.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Usa el disparador "Catch Webhook" de Zapier para enrutar los escaneos hacia más de 5000 apps - CRMs, hojas de cálculo, Slack, lo que quieras. El plan gratis aguanta volúmenes ligeros.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Aloja n8n por tu cuenta para ejecuciones de flujos de trabajo ilimitadas, sin precio por tarea. El nodo de disparo por HTTP acepta directamente los POST de NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Make (antes Integromat)</h3>
<p>Constructor visual de flujos de trabajo con amplia cobertura de apps. Usa el módulo Webhooks como punto de entrada para cada escaneo de NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Para un enrutamiento simple del tipo "if this then that". El servicio Webhooks de IFTTT te da una URL única para poner en la configuración de webhook de NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Apunta la URL del webhook a un incoming-webhook de Slack (o el equivalente de Discord/Teams) para avisar a un canal cada vez que se toca una etiqueta.</p>
</article>

<article class="feature-capability-card">
<h3>Tu propio backend</h3>
<p>Cualquier endpoint HTTPS que acepte un POST JSON sirve. El esquema, el modelo de autenticación y ejemplos de receptores están documentados más abajo.</p>
</article>

</div>

</section>

<section class="page-section">

## Patrones comunes de flujo de trabajo

- **Inventario + registro de auditoría.** Toca una etiqueta en un artículo y NFC.cool hace POST a una hoja de cálculo o sistema de almacén; aparece una fila con la marca de tiempo, el identificador de la etiqueta y el payload.
- **Captura de contactos en eventos.** Toca una etiqueta en el cartel de tu stand y tu CRM dispara automáticamente un correo de seguimiento.
- **Disparadores de hogar inteligente.** Toca una etiqueta en la puerta de entrada para marcar "Estoy en casa" - Home Assistant / Homey / Hubitat lo recoge vía webhook.
- **Seguimiento de activos.** El personal de mantenimiento toca etiquetas en los equipos para registrar inspecciones; el backend construye el registro de conformidad.
- **Check-ins en conferencias.** Toca la credencial NFC de un asistente; el webhook actualiza tu plataforma de eventos en tiempo real.

</section>

<section class="page-section" id="webhooks">

## Webhooks

Actívalo en **pestaña Más → Webhook** dentro de la app: introduce una URL HTTPS, opcionalmente un usuario/contraseña para HTTP Basic Auth y, luego, activa "escaneos NFC" y "escaneos de QR y códigos de barras" de forma independiente. Disponible en iOS y Android.

La app dispara un único `POST` por escaneo a la URL que configuraste. No hay una cola de reintentos aparte: si tu endpoint no está accesible o devuelve una respuesta que no sea 2xx, el POST del escaneo falla. Procura devolver `204 No Content` en caso de éxito; cualquier 2xx se trata como aceptado.

Esta página es la referencia técnica. Para la visión general de la función - los otros cuatro ganchos de automatización de iOS, los precios y las preguntas frecuentes - consulta la [página de la función Webhooks y Automatización](/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## Payload del webhook

Content-type `application/json`, el cuerpo es JSON con formato:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

Las etiquetas estructuradas (actualmente OpenPrintTag) añaden dos campos más:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "Filament Spool #1234",
  "tagType" : "openPrintTag",
  "structured" : {
    "material" : "PLA",
    "color" : "#FF6F4C",
    "manufacturer" : "Prusament",
    "uuid" : "5e8a-7c1d-4f90"
  }
}
```

Referencia de los campos:

- `identifier` - Para los escaneos NFC, el UID de hardware de la etiqueta en hexadecimal en mayúsculas separado por dos puntos (por ejemplo, `04:A2:7F:1B:5E:80:00`). Es estable por etiqueta, así que puedes usarlo para deduplicación. Para los escaneos de QR y códigos de barras es un UUID nuevo en cada escaneo - no es un ID de código estable. En los modos de compatibilidad NFC más antiguos de iOS que no exponen el UID, el valor es la cadena literal `NoIdentifierInCompatibilityMode`.
- `date` - ISO 8601, cuándo ocurrió el escaneo en el dispositivo.
- `content` - Contenido decodificado. Para NFC, el valor del registro NDEF (URI o texto); para QR/código de barras, la cadena decodificada en bruto.
- `tagType` - Se omite en los escaneos simples. Se establece en `"openPrintTag"` para los escaneos de OpenPrintTag.
- `structured` - Se omite en los escaneos simples. Payload estructurado interpretado cuando `tagType` está presente.

</section>

<section class="page-section">

## Autenticación

Los webhooks admiten **solo HTTP Basic Auth**. En **pestaña Más → Webhook** puedes, de forma opcional, guardar un usuario y una contraseña en el Keychain de iOS. La app responde entonces a los desafíos HTTP estándar `401 / WWW-Authenticate: Basic` de tu servidor con esas credenciales.

Eso significa que es tu endpoint quien controla si la autenticación es obligatoria. Si no necesitas autenticación, deja el usuario y la contraseña en blanco en la app y omite el desafío en el servidor. Si la necesitas, devuelve un `401` con `WWW-Authenticate: Basic realm="…"` en el primer POST - el dispositivo lo reintentará con `Authorization: Basic …` llevando las credenciales guardadas. Todo viaja por TLS; los servidores de NFC.cool nunca ven tus credenciales.

Hoy no hay soporte para token Bearer, clave de API ni firma HMAC. Si necesitas eso, termínalos en un proxy inverso (Cloudflare Worker, nginx, etc.) que traduzca Basic a tu esquema.

</section>

<section class="page-section">

## Ejemplos de receptores

¿Necesitas el ciclo completo, de extremo a extremo? Clona el [servidor de webhook de referencia en GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server) - registra cada payload en directo. Los fragmentos de abajo son receptores mínimos para tu propio stack.

### cURL - prueba rápida

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - receptor con Express

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // le indica a NFC.cool que reintente con credenciales
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - receptor con FastAPI

```python
import os
import secrets
from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

app = FastAPI()
security = HTTPBasic()

def check(creds: HTTPBasicCredentials = Depends(security)):
    ok_user = secrets.compare_digest(creds.username, "nfc-cool")
    ok_pass = secrets.compare_digest(creds.password, os.environ["WEBHOOK_PASSWORD"])
    if not (ok_user and ok_pass):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": 'Basic realm="nfc-cool"'},
        )

@app.post("/webhook")
async def webhook(request: Request, _: None = Depends(check)):
    body = await request.json()
    print(f"scan: {body['content']} id={body['identifier']}")
    return {"status": "ok"}
```

</section>

<section class="page-section" id="shortcuts">

## App Intents y Atajos

NFC.cool Tools en **iOS** incluye un puñado de App Intents que puedes conectar a la app Atajos, a automatizaciones, a modos de concentración o a Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Inicia un escaneo en la función que elijas: NFC, QR / código de barras, documento, objeto 3D o habitación.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Abre NFC.cool en una pestaña concreta (NFC, QR, documento, 3D, más) sin iniciar un escaneo.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Devuelve el contenido de la última etiqueta NFC escaneada como cadena de texto - útil como entrada de un Atajo. No abre la app.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Devuelve el contenido del último código QR / código de barras escaneado. No abre la app.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Abre el flujo de grabación NFC ya rellenado con una URL o un payload de texto proporcionado por el Atajo.</p>
</article>

</div>

Las variantes específicas de iOS 18 (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) aparecen directamente en Spotlight / en el selector del botón de acción.

</section>

<section class="page-section" id="url-schemes">

## Esquemas de URL

Para deep-linking desde otras apps de iOS, widgets o atajos de la pantalla de inicio, NFC.cool Tools registra estas URLs:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Abrir cualquiera de estas te lleva directamente al escáner correspondiente. Los esquemas `nfc://` y `geo://` también están registrados para gestionar el traspaso de enlaces externos de etiquetas/coordenadas.

</section>

<section class="page-section">

## Recursos legibles por máquina

Feeds detectables para herramientas, motores de búsqueda y agentes de IA:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Índice completo del sitio - cada ruta + última modificación.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Directorio del sitio amigable para IA (emitido automáticamente por SiteKit).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>RSS de todo el sitio con el contenido íntegro de cada sección.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Feed RSS solo del blog.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Feed de lanzamientos - versiones, fechas y entradas del registro de cambios.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Índice de navegación estructurado con títulos, resúmenes, etiquetas y URLs.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Contenido en texto plano de cada artículo para la búsqueda del lado del cliente.</p>
</article>

</div>

¿Estás construyendo algo sobre NFC.cool? ¿O has encontrado un socio de integración que debería estar en esta página? [Escríbenos](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
