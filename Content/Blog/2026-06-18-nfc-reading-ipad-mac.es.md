---
id: "nfc-reading-ipad-mac-2026-06"
title: "Cómo NFC.cool lee etiquetas NFC en iPad y Mac"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "Los iPad y los Mac no tienen chip NFC, así que siempre dije que no podían leer etiquetas NFC. Con un lector USB externo, la versión 6.15.0 cambia eso - aquí te cuento cómo funciona y de dónde salió."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Un iPad junto a un lector NFC USB HID OMNIKEY con una etiqueta apoyada encima"
author: "Nicolo Stanciu"
metaTitle: "Cómo NFC.cool lee etiquetas NFC en iPad y Mac"
metaDescription: "Los iPad y los Mac no tienen radio NFC, así que no podían leer etiquetas NFC. En NFC.cool 6.15.0, un lector USB externo cambia eso en iPad y Mac. Aquí tienes cómo funciona."
ogTitle: "La lectura de etiquetas NFC llega a iPad y Mac"
ogDescription: "¿Tu iPad o Mac no tiene chip NFC? Con un lector USB externo, NFC.cool 6.15.0 también lee y escribe etiquetas ahí - además de los límites honestos."
---
El año pasado estuve en Bologna para la [PragmaConf 2025](https://pragmaconference.com). Era mi primera vez en esa conferencia y, según resultó, también la última - los organizadores no pueden mantenerla en marcha, así que la edición a la que fui fue la final. Todavía me da un poco de pena.

Mientras estaba allí me puse a hablar con [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer), otro desarrollador de iOS y NFC. En algún momento la conversación derivó hacia un problema que yo tenía archivado desde hacía mucho bajo la etiqueta de "imposible": leer etiquetas NFC en un iPad. Los iPad no tienen chip NFC, así que siempre le había dicho a la gente que sencillamente no se podía hacer. Alexander me dijo que sí se podía - con el lector externo adecuado - y se ofreció a enviarme un pequeño fragmento de código para empezar. Lo hizo, unos días después. Ese fragmento es la razón por la que NFC.cool ahora puede leer etiquetas NFC en iPad y Mac.

---

## Os dije que esto no funcionaría

En mayo, [cuando NFC.cool llegó al Mac](/blog/nfc-cool-comes-to-mac/), escribí toda una sección sobre lo que el Mac no puede hacer y puse el escaneo NFC justo al principio. Mi razonamiento era sencillo: los Mac no tienen radio NFC, los iPad no tienen radio NFC, y eso es un límite de hardware que ninguna actualización de software mía puede arreglar.

Esa parte sigue siendo cierta - para el chip integrado en el dispositivo. Lo que se me escapó es que no tienes por qué usar el chip integrado. Puedes conectar uno.

---

## Cómo funciona sin un chip NFC

El truco está en un lector NFC USB externo. Lo conectas a tu iPad o Mac, y NFC.cool habla con él directamente. No hay drivers que instalar: funciona a través del soporte para tarjetas inteligentes que Apple ya incluye en iPadOS y macOS, así que en el momento en que enchufas el lector al puerto USB-C, la app lo detecta y cambia a él por su cuenta.

La app prefiere un lector externo siempre que haya uno conectado. En un iPad o Mac ese lector es el único hardware NFC en juego, así que no hay nada que decidir. En un iPhone se convierte en una elección que la app hace por ti: conecta un lector y NFC.cool lo usa, déjalo desenchufado y el móvil recurre a su propio NFC integrado. No cambias ningún ajuste ni eliges un modo - la app averigua qué hardware tiene y actúa en consecuencia.

El lector sobre el que construí todo esto, y el único que he probado de verdad, es el HID OMNIKEY 5022 CL. Otros lectores USB también funcionan, y unos cuantos están en la lista de abajo, reportados por usuarios que los probaron.

<figure class="phone-figure" data-layout="stage" data-device="ipad">
<figcaption>Un iPad con un lector USB</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-1-place-tag-600w.webp" alt="NFC.cool en un iPad con un lector NFC USB externo conectado: Place tag on reader"><p><strong>Conecta un lector.</strong> NFC.cool lo detecta solo y espera una etiqueta.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-2-tag-read-600w.webp" alt="NFC.cool en el iPad tras la lectura: una marca verde y Tag read"><p><strong>Pon la etiqueta encima.</strong> El lector se ocupa de la radio y el iPad del resto.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-3-record-600w.webp" alt="El registro completo de la etiqueta en el iPad: una tarjeta de visita de Anna Miller, con el vCard en bruto debajo"><p><strong>Todo lo que verías en un iPhone.</strong> Los mismos registros, las mismas herramientas.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-4-sonicare-600w.webp" alt="Sonicare Reset en el iPad: un cabezal al 80% de uso, con Reset Timer"><p><strong>Incluso el caso difícil.</strong> Leer un cabezal Sonicare y escribir en su contador protegido con contraseña también funciona.</p></li>
</ol>
</figure>

---

## Los lectores que funcionan

Estos son todos los lectores que sé hasta ahora que funcionan con NFC.cool:

- **HID OMNIKEY 5022 CL** - sobre el que construí todo esto, probado de principio a fin ([Amazon](https://amzn.to/3SNPi46))
- **HID OMNIKEY 5422** - un usuario reporta que funciona ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1552U-M1** - un usuario reporta que funciona ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1255U-J1** - un usuario reporta que funciona ([Amazon](https://amzn.to/4xZVEwe))

Gracias a todos los que me han escrito. No puedo comprar todos los lectores del mercado, así que cada modelo más allá del primero está en esta lista porque alguien lo compró, lo probó y se tomó el tiempo de contármelo. Si usas un lector que no aparece aquí, [cuéntame](/contact/) si funcionó o dónde falló, y lo añado a este artículo.

Son enlaces de afiliado de Amazon: si compras a través de uno puede que gane una pequeña comisión sin coste adicional para ti.

---

## Qué puedes hacer con él

<figure class="phone-figure" data-layout="float" data-device="mac">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/mac-1-my-messages-800w.webp" alt="Un MacBook con un lector NFC USB externo al lado, mostrando My NFC Messages de NFC.cool"><p><strong>También en un Mac.</strong> Conecta el lector a tu Mac y cada etiqueta que leas irá a My NFC Messages.</p></li>
</ol>
</figure>

Casi todo lo que harías en un iPhone. Puedes leer etiquetas y volcar toda su memoria, escribir mensajes NDEF y ejecutar tareas por lotes que leen o escriben una pila entera de etiquetas una tras otra. Proteger etiquetas con contraseña funciona. También [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), el formato de bobinas de filamento para impresoras 3D, en ambas direcciones. Y sí, el [reinicio del cabezal del cepillo Philips Sonicare](/blog/reset-sonicare-brush-head-nfc/) también se ejecuta.

Esto último fue la parte difícil. Reiniciar un cabezal Sonicare significa leer un contador de la etiqueta y luego volver a escribir en una página protegida con contraseña, y la etiqueta solo acepta esa escritura si todavía te considera autenticado de un momento anterior. A través de un lector externo, eso significaba mantener una única sesión abierta con el lector durante ambos pasos en lugar de dejar que se cerrara entre uno y otro. Una vez que eso aguantó, las operaciones que dependen de ello - escrituras protegidas, el reinicio del cepillo - empezaron a comportarse como lo hacen en un móvil.

---

## Los límites honestos

Un par de cosas todavía no están ahí, y prefiero contártelas a dejar que las descubras tú.

- El OMNIKEY 5022 CL es el único lector que he probado yo mismo. Los demás de la lista de arriba vienen de reportes de usuarios, y cualquier cosa fuera de esa lista es territorio no verificado.
- Las etiquetas MIFARE Classic son de solo lectura a través del lector. Puedes leerlas, no escribirlas.

Nada de esto rompe la forma en que la mayoría de la gente va a usar esto, pero son reales, y son el tipo de cosa que a mí me gustaría saber antes de comprar un lector.

---

## Gracias, Alexander

Quiero ser claro sobre de dónde salió esto. No me senté a inventarlo - Alexander me dio el hilo y yo tiré de él. No tenía por qué compartir ese código, y le agradezco que lo hiciera. Parte de por qué después lo perseguí con tanto empeño es sencilla: quería que NFC.cool fuera la primera app de iPad capaz de leer de verdad una etiqueta NFC. Sea o no la primerísima, llegar hasta ahí mereció el trabajo.

La lectura de etiquetas NFC en iPad y Mac llega en NFC.cool 6.15.0. Si tienes un iPad o un Mac, un lector compatible y una etiqueta que nunca antes pudiste escanear desde tu escritorio, simplemente funcionará.

¿Necesitas el lector? Aquí tienes el HID OMNIKEY 5022 CL en [Amazon](https://amzn.to/3SNPi46) - el enlace te lleva a la tienda de Amazon de tu país. Es un enlace de afiliado: si compras a través de él puede que gane una pequeña comisión sin coste adicional para ti, y ayuda a financiar el trabajo en NFC.cool.

[Descarga NFC.cool Tools para iPhone, iPad y Mac](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-es&mt=8)

Y si estuviste en aquella última PragmaConf en Bologna: gracias por una buena. Ojalá fuera a haber otra.
