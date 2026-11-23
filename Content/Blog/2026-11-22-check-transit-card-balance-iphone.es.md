---
id: "check-transit-card-balance-iphone-2026-11"
title: "Cómo consultar el saldo de tu tarjeta de transporte o IC en el iPhone: Suica, Octopus, T-money y más"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Acerca a tu iPhone una tarjeta IC, de transporte o monedero como Suica, Octopus o T-money, y NFC.cool te muestra su saldo y sus últimos viajes. Aquí tienes todas las tarjetas que lee, lo que revela una tarjeta bancaria y lo que cualquiera podría leer de la tuya."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "Un iPhone que muestra el saldo y el gráfico de una tarjeta de transporte mientras se le acerca una tarjeta IC verde, con otras dos tarjetas de transporte delante"
metaTitle: "Saldo de tarjetas de transporte e IC en el iPhone: Suica y más"
metaDescription: "Consulta el saldo y los viajes de tarjetas IC, de transporte y monedero como Suica, PASMO, Octopus, T-money, Clipper y Opal en tu iPhone. Todas las que lee NFC.cool."
ogTitle: "Consulta el saldo de tu tarjeta de transporte o IC con el iPhone"
ogDescription: "Suica, Octopus, T-money, Navigo, Clipper y muchas más tarjetas IC: acerca la tarjeta al iPhone y mira su saldo, sus viajes y lo que cualquiera puede leer de ella."
---
Durante años me llegó una y otra vez el mismo tipo de correo, en una docena de idiomas y con una docena de nombres de tarjeta distintos. "Tu app no lee mi tarjeta monedero." "No reconoce mi tarjeta IC." "Acerqué mi billete de metro al móvil y no pasó nada."

Y no les faltaba razón. NFC.cool encontraba el chip, [mostraba su ID y el tipo de chip](/es/features/nfc-reader-writer/) y ahí se quedaba. Para alguien con una tarjeta cargada de dinero en la mano, eso parecía una app que se había rendido. Al fin y al cabo, el saldo que buscaba estaba ahí mismo, en la tarjeta.

La versión 7.4.0 de [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-es&mt=8) es mi respuesta a todos esos correos. Acerca al iPhone una tarjeta de transporte, una tarjeta monedero o una tarjeta bancaria, y la app te muestra ahora su saldo, sus últimos viajes y, lo que es igual de interesante, todo lo que cualquier otra persona podría leer de ella. Llega primero al iPhone, y [NFC.cool Tools para Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-es) (pronto) tendrá la misma lectura de tarjetas.

---

## Por qué una tarjeta NFC no es igual a otra

Todas estas tarjetas [se comunican con tu móvil por NFC](/es/blog/nfc-on-iphones-insider-look/). Ahí se acaba el parecido.

Yo lo veo así: el NFC es solo la puerta de entrada. Detrás de ella, cada tarjeta es un edificio distinto, con su propio plano y sus propias habitaciones cerradas con llave. Las tarjetas japonesas funcionan con **FeliCa**, de Sony. Muchas tarjetas de transporte europeas usan **Calypso**. San Francisco, Sídney y Helsinki usan [**MIFARE DESFire**](/es/blog/ultimate-nfc-tag-guide/#mifare-classic-plus-y-desfire-la-familia-del-control-de-acceso), cada una con una organización interna diferente. Las tarjetas bancarias hablan **EMV**, el mismo estándar que usa el datáfono de la caja de tu supermercado.

Y dentro de cada edificio es el operador quien decide qué habitaciones quedan abiertas. Algunos dejan el saldo y los últimos veinte viajes a la vista de cualquiera que entre. Otros cierran todas las puertas, y la llave solo la tienen sus propios tornos y máquinas de billetes. Ninguna app se salta eso, y NFC.cool ni lo intenta: solo lee, no usa claves y no escribe nada en la tarjeta.

Así que el trabajo de verdad detrás de esta función fue aprenderme el plano de cada sistema de tarjetas, uno por uno.

---

## Qué tarjetas IC y de transporte puede leer NFC.cool

Esto es lo que la app sabe leer hoy. Antes, una aclaración sincera. He probado todo lo que llevaba en mi propia cartera, incluido el billete desechable de papel de la OV-chipkaart de los Países Bajos y mis propias tarjetas bancarias. Pero en el mundo hay muchísimas más tarjetas de las que caben en una cartera, así que casi todo lo que verás a continuación se basa en cómo está organizado cada sistema de tarjetas, no en una tarjeta que yo haya tenido en la mano. Si la tuya se lee mal, o no se lee, de verdad quiero saberlo. Más abajo te cuento cómo.

<figure class="phone-figure" data-layout="stage">
<figcaption>Lo que NFC.cool te muestra de tu tarjeta</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="Una tarjeta Suica en NFC.cool: la tarjeta verde con un saldo de ¥2140, un gráfico del saldo debajo y los primeros viajes y pagos"><p><strong>Saldo.</strong> El saldo de la tarjeta arriba, y cómo ha ido cambiando en los últimos viajes.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="Una tarjeta T-money en NFC.cool con un saldo de ₩12.350 y una lista de pagos con fecha, hora, importe y el saldo que quedó tras cada uno"><p><strong>Viajes y pagos.</strong> Cada movimiento que guarda la tarjeta, con el saldo que quedó después.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="Una tarjeta de transporte MIFARE DESFire en NFC.cool: el tipo de chip y el número de serie se pueden leer, y los viajes, el saldo y los abonos aparecen como No legible"><p><strong>Tarjetas bloqueadas.</strong> Cuando el operador la bloquea, la app te dice qué queda cerrado.</p></li>
</ol>
</figure>

### Saldo y últimos viajes

- **Japón:** Suica, PASMO, ICOCA, Kitaca, manaca, nimoca, PiTaPa, TOICA y Hayakaken, con hasta 20 viajes recientes y sus estaciones cuando la app las conoce. Rakuten Edy, nanaco y WAON también muestran su saldo y su historial.
- **Corea del Sur:** T-money y Cashbee, con los últimos viajes y las fechas de emisión y caducidad de la tarjeta.
- **China y Hong Kong:** Shenzhen Tong, Wuhan Tong, las tarjetas City Union (que aparecen como Shanghai Public Transport cuando son de Shanghái) y T-Union, con los últimos viajes y las fechas de validez. La Octopus de Hong Kong muestra su saldo.
- **Indonesia:** Mandiri e-money, BCA Flazz, BNI TapCash, MegaCash y la KRL Kartu Multi Trip, con historial. Las tarjetas JakCard y MRT Jakarta muestran el saldo.
- **Australia y Nueva Zelanda:** Opal en Sídney, con el saldo y el último viaje, y la Snapper de Wellington, que funciona con el mismo sistema que T-money y aparece en NZ$.
- **Estados Unidos:** Clipper en San Francisco y ORCA en Seattle.
- **Finlandia:** las tarjetas de HSL, Waltti y Tampere.
- **Israel:** Rav-Kav, con su saldo, sus abonos y sus viajes.

### Abonos y viajes, pero sin saldo

Muchas tarjetas europeas no guardan ningún saldo. Lo que llevan son abonos. La Navigo de París y las demás tarjetas Calypso francesas (Pass Pass, KorriGo, OùRA y otras), MOBIB en Bruselas, Opus en Montreal, Venezia Unica y Lisboa Viva muestran los abonos que hay en la tarjeta y los últimos viajes. La metroCARD de Adelaida y la Hafilat de Abu Dabi hacen lo mismo, porque su saldo está protegido con la clave del operador.

### Billetes de papel y de un solo uso

Los billetes finos de papel también llevan chip. NFC.cool lee los billetes Ventra de Chicago y Compass de Vancouver, la Troika de Moscú, los billetes de papel de Clipper, los de HSL, Tampere, Venecia y Pisa, el billete de papel de la OV-chipkaart y los billetes GTT de Turín, en los que verás el tipo de billete, cuándo se emitió y cuándo se validó.

### Bloqueadas por el operador

Algunos operadores lo cierran todo. Con la Oyster de Londres, la Leap de Dublín o la tarjeta Rabbit de Bangkok, NFC.cool puede decirte qué tarjeta es, y nada más, porque no hay nada más abierto en ella. Unas pocas, como la Myki de Melbourne y la PRESTO de Toronto, dejan ver el número de tarjeta y se guardan todo lo demás. Eso no lo puede cambiar ninguna actualización. Así es como están construidos esos sistemas.

### Tarjetas que necesitan un lector externo

Hay tarjetas que el iPhone sencillamente no deja leer a ninguna app. La EZ-Link y la NETS FlashPay de Singapur y la Yikatong de Pekín son de esas. Conecta un [lector NFC USB externo](/es/affiliate-links/#usb-nfc-reader) y NFC.cool las lee, con saldo e historial. Expliqué cómo funcionan esos lectores en el artículo sobre [leer etiquetas NFC en iPad y Mac](/es/blog/nfc-reading-ipad-mac/).

---

## Tarjetas bancarias: lo que ves y lo que nunca verás

Con las tarjetas bancarias la gente se pone nerviosa, y con razón.

En un iPhone, NFC.cool te muestra la red, Visa o Mastercard, y nada más. [Apple no permite que apps como la mía lean los datos de pago de una tarjeta bancaria](https://developer.apple.com/documentation/corenfc/nfctagreadersession) en el iPhone, y como alguien que trabaja con esta tecnología a diario, creo que hace bien.

Con un lector USB externo se ve algo más: la red, el número de tarjeta enmascarado de forma que solo quedan a la vista los seis primeros y los cuatro últimos dígitos, la fecha de caducidad, el país emisor y la moneda. Lo que NFC.cool no lee nunca, en ningún dispositivo, es tu nombre, y el código de seguridad y el PIN no se pueden leer en absoluto. Por qué en el chip no hay nada que valga la pena copiar lo explico en [mi guía de etiquetas NFC](/es/blog/ultimate-nfc-tag-guide/#puede-mi-móvil-leer-mi-tarjeta-bancaria-o-mi-pasaporte-con-una-app-nfc).

---

## Lo que el móvil de un desconocido podría leer de tu tarjeta

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="La sección Lo que cualquiera puede leer de una tarjeta Suica en NFC.cool: cualquier móvil puede leer el saldo y los 6 últimos viajes y pagos, sin necesidad de clave"><p><strong>Lo que cualquiera puede leer.</strong> En una Suica, el saldo y los últimos viajes, sin necesidad de clave.</p></li>
</ol>
</figure>

Esta es la parte que más me interesa, y es lo primero que yo miraría.

Todo lo que lee NFC.cool, lo lee sin clave. Eso significa que cualquier móvil que se acerque a tu tarjeta podría leer lo mismo. Un pasaporte funciona justo al revés: su chip no dice nada hasta que le das una clave impresa en la página de la foto, y así es como se consigue [leer tu pasaporte con el móvil](/es/blog/read-passport-nfc-chip/). Por eso cada pantalla de tarjeta tiene una sección llamada **Lo que cualquiera puede leer**, con exactamente lo que ha salido en esa lectura: el saldo, los viajes con sus fechas y estaciones, un número de tarjeta, lo que la tarjeta haya entregado.

En una Suica, pueden ser veinte trayectos con el nombre de las estaciones. En una Navigo, tus abonos y los últimos viajes. En una Oyster, casi nada. El NFC solo funciona a unos pocos centímetros, así que nadie va a leer tu tarjeta desde la otra punta del vagón, pero aun así conviene saber qué tipo de tarjeta llevas en el bolsillo.

Mientras ocurre todo esto, nada sale de tu iPhone. La lectura queda entre la tarjeta y tu móvil, y ahí se acaba.

---

## Tu tarjeta con el paso del tiempo

Cada tarjeta que lees se guarda en tu lista de escaneos, con un resumen corto como "Suica • ¥1,234" para que puedas encontrarla después. Si la abres más adelante, ves la tarjeta tal como estaba, y además **Desde el último escaneo**, que te dice cuánto ha cambiado el saldo desde la vez anterior que leíste esa misma tarjeta. Muy práctico si alguna vez te has preguntado en qué se fue la última recarga.

---

## Cómo consultar el saldo de tu tarjeta en el iPhone

1. Abre [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-es&mt=8) y toca **Leer NFC**.
2. Apoya la tarjeta plana contra la parte superior del iPhone y no la muevas hasta que la ventana diga **Tarjeta leída**.
3. La tarjeta se abre en su propia pantalla, con el saldo arriba y los detalles debajo.

No tienes que elegir antes el tipo de tarjeta. La app averigua por sí sola qué tarjeta es.

---

## ¿Tu tarjeta no está en la lista? Envíamela

Aquí es donde entras tú. Cuando NFC.cool reconoce un chip pero no consigue leerlo entero, la pantalla de la tarjeta muestra **Ayúdanos a leer esta tarjeta**. Y si sí ha leído un saldo pero algo no cuadra, esa misma sección se llama **¿Algo va mal?**

Toca **Enviar detalles de la lectura**, escribe el nombre y el país de la tarjeta y, si hay saldo, dime si es correcto. Antes de que se envíe nada, toca **Ver los datos** para ver exactamente lo que se va a mandar: lo que respondió la tarjeta durante la lectura, el tipo de chip, tu dispositivo y la versión de la app, y tu país. Ni tu nombre ni ninguna cuenta forman parte de ello, y el número de serie de la tarjeta y cualquier número de tarjeta que la app reconozca van enmascarados. Una tarjeta que la app todavía no conoce podría contener datos que no sabe detectar, y precisamente por eso puedes revisarlo todo antes. Si el envío no funciona, también puedes mandármelo por correo.

Cada informe es una tarjeta que yo no tengo, muchas veces de una ciudad a la que nunca he viajado, y así es como llegan las siguientes tarjetas. Así que, si alguna vez me escribiste que NFC.cool no lee tu tarjeta, [actualiza la app](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-es&mt=8) y vuelve a probar. Y si sigue sin leerla, ahora tienes un botón que me envía justo lo que necesito para arreglarlo.

[Descarga NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-es&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-es) (pronto)
