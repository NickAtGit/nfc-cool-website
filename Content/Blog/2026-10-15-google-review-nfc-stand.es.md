---
id: "google-review-nfc-stand-2026-10"
title: "Cómo montar tu propio expositor de reseñas de Google con NFC"
date: "2026-10-15"
tags: ["guides", "nfc-tags", "business-cards"]
summary: "Esos pequeños expositores de reseñas de Google que ves en el mostrador de las cafeterías no son más que una etiqueta NFC y un código QR que apuntan a un enlace. Te enseño a montar el tuyo, y por qué los expositores de las mesas de Piano Negro llevan toda su tarjeta de NFC.cool Business Card y no solo el enlace para dejar una reseña."
image: "/assets/images/Blog/google-review-nfc-stand.webp"
imageAlt: "Un expositor de metacrilato transparente en la mesa de una cafetería, con una tarjeta que muestra cinco estrellas doradas, un símbolo NFC y un código QR, junto a un iPhone con una pantalla de reseña de cinco estrellas"
author: "Nicolo Stanciu"
metaTitle: "Crea tu propio expositor NFC de reseñas de Google"
metaDescription: "Un expositor de reseñas de Google no es más que una etiqueta NFC y un código QR. Cómo hacer el tuyo y poner tu carta, tus redes y tu enlace de reseñas en cada mesa."
ogTitle: "Monta tu propio expositor de reseñas de Google"
ogDescription: "Una etiqueta NFC, un código QR y un expositor de metacrilato. Así puse la carta, las redes y el enlace de reseñas de Google de un bar en cada mesa."
---

En los últimos años he visto cómo aparecían por todas partes unos pequeños expositores de metacrilato: junto a la caja, en las mesas de los restaurantes, en el mostrador de la peluquería. "Déjanos una reseña en Google", cinco estrellas, un código QR y casi siempre un pequeño símbolo NFC. Acercas el móvil y se abre una página para dejar una reseña.

Me gano la vida haciendo una app de NFC, así que, como es lógico, quería saber qué llevaban dentro. ¿Un chip especial de Google? ¿Algún acuerdo secreto?

Nada de eso. Es una etiqueta NFC normal y corriente y un código QR impreso, y los dos apuntan a un enlace. Ese es todo el truco, y significa que puedes montar el tuyo en una tarde.

---

## Qué lleva dentro un expositor de reseñas de Google

La etiqueta NFC de estos expositores es el mismo tipo de pegatina barata que puedes [comprar en paquetes de cincuenta](/affiliate-links/). Alguien ha grabado en ella un único enlace web. El código QR de al lado es ese mismo enlace, impreso como un patrón de cuadraditos, para quien tenga un móvil sin NFC o lo tenga desactivado.

Lo interesante es el propio enlace. Google tiene una URL que lleva al cliente directamente al formulario de reseñas de un negocio concreto, identificado por su **Place ID**. Todos los negocios de Google Maps tienen uno, y si el tuyo todavía no aparece, Google explica cómo [crear un Perfil de Empresa](https://support.google.com/business/answer/2911778?hl=es). Graba ese enlace en una etiqueta y acercar el móvil al expositor se convierte en el camino más corto entre "qué noche tan buena" y una reseña escrita.

---

## Las pegas de las que Google no te habla

Antes de que te pongas a montar uno, hay unas cuantas cosas que aprendí a base de probar y equivocarme.

**El enlace no puede abrir la app de Google Maps.** Fue lo primero que intenté, porque parecía lo más lógico: acercas el móvil al expositor, se abre Google Maps y aparece la ventana para escribir la reseña. Probé todas las variantes del enlace que encontré. No hay manera. Por lo visto, Google no quiere que los enlaces de reseñas abran la app directamente.

**En el navegador, en cambio, funciona bien.** Lo que *sí* funciona es un enlace que abre una página en el navegador donde el cliente puede elegir las estrellas y escribir unas palabras en el momento. Es rápido, no hace falta instalar ninguna app y funciona igual en iPhone que en Android.

**El cliente tiene que haber iniciado sesión en Google.** Una reseña solo cuenta si viene de una cuenta de Google. La mayoría de los móviles Android ya tienen una sesión de Google iniciada, y muchos usuarios de iPhone la tienen iniciada en el navegador. A quien no la tenga, se le pedirá que inicie sesión primero. Ni tú ni yo podemos hacer nada al respecto y, sinceramente, es parte de lo que evita que las reseñas de Google se llenen de spam.

---

## Por qué las mesas de Piano Negro llevan algo más que un enlace de reseñas

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/card-top-440w.webp" alt="La tarjeta de NFC.cool Business Card de Piano Negro abierta en Safari, con el logo y enlaces a la carta en portugués y en inglés, WhatsApp, Instagram, Google Maps y las reseñas de Google"><p><strong>La tarjeta de Piano Negro.</strong> Lo que ve un cliente al acercar el móvil al expositor de su mesa.</p></li>
</ol>
</figure>

[Piano Negro](https://mycard.nfc.cool/PianoNegro/Piano-Negro) es un bar de Coimbra que lleva abierto desde 1993. Cuando ayudé al dueño a preparar sus expositores, no pusimos solo un enlace de reseñas en las mesas. Quien acaba de sentarse todavía no está pensando en reseñas. Quiere ver qué hay en la carta.

Por eso, cada mesa de Piano Negro tiene un expositor con la **[NFC.cool Business Card](/business-card/)** del bar. Acercas el móvil o escaneas el código QR, y se abre la tarjeta con todo lo que un cliente puede querer, cada cosa a un toque:

- la carta, en portugués y en inglés
- WhatsApp
- Instagram, TikTok y Facebook
- Google Maps
- el enlace para dejar una reseña en Google, y TripAdvisor
- y hasta la lista de Spotify del bar

Puedes [abrir su tarjeta](https://mycard.nfc.cool/PianoNegro/Piano-Negro) tú mismo y ver exactamente lo que ve un cliente. Y los clientes la usan justo como esperarías: abren la carta, buscan el bar en Instagram y dejan una reseña, todo desde el mismo expositor.

Otra cosa que me gusta de este montaje es que el expositor nunca se queda desfasado. La etiqueta y el código QR guardan el enlace de la tarjeta, no la carta en sí. Cuando cambia la carta, cambias el enlace en la app y todas las mesas tienen la nueva. Sin reimprimir nada ni volver a grabar etiquetas.

---

## Lo que necesitas

La lista de la compra es sorprendentemente corta:

- **Etiquetas NFC.** Una simple pegatina NTAG213 es más que suficiente, y los enlaces de este artículo caben de sobra. Si no tienes claro qué tipo de etiqueta usar, mi [guía de etiquetas NFC para iPhone](/blog/nfc-tag-types-for-iphones/) explica las diferencias.
- **Expositores de metacrilato transparente** en los que se mete una tarjeta impresa. Se venden como portamenús o portacarteles y cuestan unos pocos euros cada uno.
- **Una impresora a color.**
- **[NFC.cool Business Card](/business-card/)** para los expositores de las mesas.
- **NFC.cool Tools** para el enlace de reseñas y para proteger tus etiquetas con contraseña, en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-es&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-es).

---

## El expositor de mesa: tu negocio como tarjeta de visita

Aunque hablemos de tarjetas de visita, una tarjeta de NFC.cool Business Card no tiene por qué ser de una persona. Puedes dejar vacíos los campos del nombre y rellenar solo el nombre de tu empresa y el logo, y la tarjeta se presenta como la de tu negocio.

<figure class="phone-figure" data-layout="stage">
<figcaption>Cómo preparar el expositor de mesa</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-1-links-440w.webp" alt="El editor de NFC.cool Business Card con cinco enlaces llamados Menu, WhatsApp, Instagram, Google Maps y Google Review"><p><strong>Enlaces.</strong> Ponle a cada enlace un nombre que tus clientes entiendan de un vistazo.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-2-write-tag-440w.webp" alt="Las acciones de una tarjeta en NFC.cool Business Card, entre ellas Escribir en etiqueta NFC y Mostrar código QR"><p><strong>Escribir en etiqueta NFC.</strong> Desde las acciones de la tarjeta. Luego acerca el móvil a la pegatina.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-3-qr-code-440w.webp" alt="El código QR de una tarjeta en NFC.cool Business Card, con Compartir y Guardar en Fotos debajo"><p><strong>Mostrar código QR.</strong> Con Guardar en Fotos tienes una imagen para la tarjeta impresa.</p></li>
</ol>
</figure>

### Paso 1: Añade tus enlaces

En **Enlaces**, toca **Añadir enlace** para cada cosa que un cliente pueda buscar: tu carta, WhatsApp, Instagram y cualquier otra red en la que estés, tu ubicación en Google Maps y tu enlace de reseñas de Google. Si tu carta es un PDF, tiene que estar subida a algún sitio de internet, como tu web, para que puedas enlazarla.

Ponle a cada enlace un nombre que tus clientes entiendan de un vistazo, como "Carta" o "Déjanos una reseña". Piano Negro tiene dos enlaces a la carta, uno por idioma, para que quien venga de fuera tenga una carta que pueda leer.

Si todavía no tienes tu enlace de reseñas, NFC.cool Tools te lo crea con **Enlace de revisión de Google**. Te enseño cómo más abajo, en la parte del expositor de la caja.

### Paso 2: Graba la etiqueta y guarda el código QR

Abre las acciones de la tarjeta, elige **Escribir en etiqueta NFC** y acerca el móvil a la pegatina. Para la tarjeta impresa, elige **Mostrar código QR** y después **Guardar en Fotos**, y tendrás una imagen que puedes meter en cualquier diseño.

### Paso 3: Imprime y prueba

Diseña una tarjeta sencilla para el expositor: tu logo, una frase corta como "Carta, Instagram y más", el código QR y un pequeño símbolo NFC con "o acerca tu móvil aquí" al lado. Imprímela, métela en el expositor y pega la etiqueta detrás de la tarjeta, justo donde está el símbolo. El metacrilato y el papel no bloquean el NFC en absoluto, así que la etiqueta se lee perfectamente a través de ellos. Eso sí, mantenla lejos del metal, que ese sí lo bloquea.

Después, pruébalo con un par de móviles distintos antes de ponerlo en una mesa.

---

## El expositor de la caja: directo a la página de reseñas

En Piano Negro se limitan a los expositores de mesa. Si yo montara un negocio desde cero, añadiría uno más, justo en la caja, sin nada más que el enlace de reseñas. Es el momento en que la gente acaba de terminar su visita, la tiene fresca en la memoria y ya no está esperando a que le traigan nada. Acercan el móvil y ya están en el formulario de reseñas, sin pasar por la carta.

<figure class="phone-figure" data-layout="stage">
<figcaption>Cómo crear el enlace de reseñas</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-1-search-440w.webp" alt="La pantalla Enlace de revisión de Google de NFC.cool Tools, con Piano Negro Coimbra escrito en el campo de búsqueda y un único resultado: Piano Negro, en la Rua Borges Carneiro"><p><strong>Busca.</strong> Escribe el nombre de tu negocio y elígelo entre los resultados.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-2-selected-440w.webp" alt="Piano Negro como negocio seleccionado, con Ver en Google Maps y Ver la página de reseñas debajo"><p><strong>Vista previa.</strong> Comprueba que es el negocio correcto antes de guardar.</p></li>
</ol>
</figure>

### Paso 1: Crea el enlace de reseñas

Abre NFC.cool Tools, ve a crear un nuevo mensaje NFC y elige **Enlace de revisión de Google**. Escribe el nombre de tu negocio y elígelo entre los resultados. Debajo de cada uno aparece la dirección, algo que ayuda si en tu ciudad hay varios sitios con nombres parecidos.

Hay una forma aún más rápida si ya tienes Google Maps abierto. Busca allí tu negocio, toca **Compartir** y compártelo directamente con NFC.cool, o copia el enlace y pégalo. La app reconoce el negocio a partir del enlace de Maps.

Antes de guardar, toca **Ver la página de reseñas**. Se abre exactamente lo que verán tus clientes, así que puedes asegurarte de que es el negocio correcto. Parece obvio, pero he visto una cafetería con el mismo nombre a dos calles, y no querrás acabar recogiendo reseñas para la competencia.

Si tu negocio no aparece, lo más probable es que todavía no tenga Perfil de Empresa en Google. En esa misma pantalla tienes un enlace a la guía de Google para crear uno.

### Paso 2: Graba la etiqueta

Guarda el enlace y grábalo en tu pegatina NFC acercando el móvil. Si nunca has grabado una etiqueta, lo explico paso a paso en [esta guía para grabar etiquetas NFC con el iPhone](/blog/write-nfc-tags-iphone/).

### Paso 3: Crea el código QR

No todo el mundo va a acercar el móvil. Hay quien no sabe que su móvil puede hacerlo, y en Android el NFC puede estar desactivado. El código QR es el plan B.

Crea un código QR con la misma opción, **Enlace de revisión de Google**, en la sección de códigos QR de la app. Desde ahí puedes compartirlo como imagen, o abrirlo antes en **Estudio de códigos QR** para darle tus colores y que pegue con el resto de la tarjeta. Luego imprime la tarjeta con una frase como "¿Te ha gustado tu visita? Cuéntanoslo en Google" y métela en el expositor con la etiqueta detrás.

---

## Protege cada etiqueta con una contraseña

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/password-440w.webp" alt="La pantalla Protección por contraseña de NFC.cool Tools, con Activar contraseña y Desactivar contraseña"><p><strong>Protección por contraseña.</strong> En NFC.cool Tools, para etiquetas NTAG 2xx.</p></li>
</ol>
</figure>

Un expositor está a la vista de todo el mundo, tanto en las mesas como en la caja. Sin protección, cualquiera con una app de NFC podría pasar por delante y regrabar tu etiqueta con otra cosa, y no te enterarías hasta que un cliente te lo comentara.

Podrías bloquear la etiqueta para siempre, pero yo prefiero protegerla con contraseña. En NFC.cool Tools, abre **Protección por contraseña**, elige **Activar contraseña**, escribe una contraseña y acerca el móvil a la etiqueta. Los clientes la pueden leer igual que antes. La contraseña solo hace falta para escribir en ella. Y, a diferencia del bloqueo, tiene vuelta atrás: si algún día tu negocio se muda, o quieres que la etiqueta apunte a otro sitio, quitas la contraseña y la vuelves a grabar. También funciona con las etiquetas de la Business Card, porque la contraseña protege la etiqueta, no lo que lleva grabado. Necesitas una etiqueta NTAG 2xx, como las pegatinas NTAG213 de la lista de la compra.

Activa **Guardar para más tarde** para que la app recuerde la contraseña por ti. Si la pierdes, ya no podrás cambiar esa etiqueta.

---

## Pide reseñas a todos, y que sean sinceras

Te pido cuidado con una cosa: invita a *todos* tus clientes a dejar una reseña, y pide que sea sincera, buena o mala, no que sea de cinco estrellas. La política de reseñas de Google no permite que un negocio se lo pida solo a los clientes que cree que están contentos, ni que ofrezca nada a cambio de una reseña, como una bebida gratis o un descuento. Saltarse esas normas puede hacer que te eliminen reseñas, o algo peor. Y, sinceramente, al siguiente cliente le inspira mucha más confianza una mezcla de reseñas reales que una ristra de reseñas sospechosamente perfectas.

---

## En resumen

Un expositor de reseñas de Google es una de esas cosas que parecen un producto, pero que en realidad no son más que un enlace en una pegatina. Y si de todas formas vas a poner una pegatina en cada mesa, ya puestos, que lleve a la vez tu carta, tus redes y tu enlace de reseñas.

Para los expositores de mesa necesitas NFC.cool Business Card, en [iPhone](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-google-review-nfc-stand-es&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-es). Las funciones Enlace de revisión de Google y Protección por contraseña están en NFC.cool Tools, en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-es&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-es). Y si montas uno para tu propio negocio, me encantaría ver una foto.
