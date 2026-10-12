---
id: "e-ink-phone-case-2026-10"
title: "Hackeé mi funda de tinta electrónica para que mi iPhone pueda escribir en ella"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Tengo una de esas fundas NFC con pantalla de tinta electrónica que funcionan sin batería, y la app que venía con ella no me convencía. Así que averigüé cómo se comunica, y NFC.cool Tools 7.2.0 ya puede poner fotos, códigos QR, tu próximo evento, la agenda del día y tus recordatorios en las fundas que usan la app DeerPhoneCase, KAZAVA, Novixand o TYOHINN."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "Un iPhone con una funda negra que lleva en la parte trasera una pantalla de tinta electrónica con un sol rojo y amarillo sobre colinas negras, junto a un segundo iPhone que le envía la misma imagen por NFC"
author: "Nicolo Stanciu"
metaTitle: "Funda NFC de tinta electrónica en iPhone: fotos, agenda y QR"
metaDescription: "Pon fotos, códigos QR, tu agenda y tus recordatorios en una funda NFC de tinta electrónica sin batería desde el iPhone. Para fundas DeerPhoneCase, KAZAVA, Novixand y TYOHINN."
ogTitle: "Hackeé mi funda de tinta electrónica para escribir en ella desde el iPhone"
ogDescription: "Cómo descifré el funcionamiento de una funda NFC de tinta electrónica sin batería, y lo que NFC.cool ya puede mostrar en su pantalla."
---

La pantalla parpadeó.

Es un detalle mínimo. Las pantallas de tinta electrónica lo hacen cada vez que se redibujan: un destello rápido que pasa por todos los colores antes de que se asiente la imagen nueva. Pero ese destello salía de un código que había escrito yo, enviado desde mi iPhone a la parte trasera de una funda que no tiene batería. Unos segundos después, todo el panel era de un rojo liso, con un ligero aspecto de papel. Nada más. Solo rojo.

He creado un montón de funciones NFC con los años, y ese simple rectángulo rojo es uno de los momentos que más he disfrutado.

---

## Una pantalla sin batería

Si nunca has visto una de estas fundas: parece una funda normal y corriente, salvo que gran parte de la cara trasera es una pantalla de tinta electrónica, como la de un lector de libros electrónicos. La mía pinta con cuatro tintas: negra, blanca, roja y amarilla.

No lleva batería ni puerto de carga. La funda se alimenta del campo NFC del móvil, el mismo que despierta una pegatina NFC cuando la escaneas. Mientras tienes el móvil apoyado en la funda, ese campo da energía a un pequeño chip y a un microcontrolador, que son los que redibujan la pantalla. Una vez que la imagen está puesta, la tinta electrónica no necesita nada de energía para mantenerla. Se queda ahí sin más: con el móvil sin batería, en un cajón, donde sea.

Yo me la imagino como una Telesketch que solo tu móvil puede sacudir. Nada cambia hasta que vuelves a apoyar el móvil en ella.

Estas fundas se venden con muchos nombres distintos, y casi cada marca tiene su propia app. La mía venía con una llamada **DeerPhoneCase**. De las demás hablo más abajo.

---

## Por qué no me conformé con la app oficial

Probé un montón de apps de los fabricantes con mi funda, y muchas funcionan. Pero todas son malísimas de usar. No son apps nativas de iPhone, para casi todo tienes que iniciar sesión primero y, al final, poner una imagen es lo único que pretenden hacer.

Cuando miraba esa pantalla en la parte de atrás del móvil, no veía un marco de fotos. Veía una pequeña pantalla que siempre está a la vista y no gasta nada de batería. Es el sitio perfecto para mi próxima reunión, la agenda del día o un código QR que alguien pueda escanear directamente de la trasera de mi móvil. La app oficial no podía hacer nada de eso, y resulta que yo hago una app que gira por completo en torno al NFC. Así que decidí enseñarle yo mismo a NFC.cool a hablar con la funda.

---

## Así descifré cómo habla la funda

Lo hice junto con Claude, el modelo de IA de Anthropic, que resultó ser un compañero muy paciente a la hora de leer código descompilado.

La primera idea era la obvia: mirar cómo se comunica con la funda la app oficial para iPhone. No llevó a ninguna parte. Las apps de la App Store están cifradas y no había nada útil que leer.

Con la versión de Android fue otra historia. La funda es un producto de marca blanca, así que la app del mismo fabricante está en Google Play con su propio nombre, y las apps de Android se pueden descompilar. La desmontamos, y entre ese código y lo que encontramos en internet sobre el chip que lleva dentro (un chip NFC de Fudan con un microcontrolador detrás), salió a la luz toda la conversación entre el móvil y la funda:

1. El móvil y la funda hacen un breve intercambio de inicio de sesión, así la funda sabe que le está hablando una app de verdad.
2. A partir de ahí, todos los comandos van cifrados.
3. La imagen viaja en 139 paquetes de píxeles en bruto. Cada píxel ocupa dos bits, justo lo necesario para cuatro tintas.
4. El móvil le dice a la funda que se redibuje y luego le pregunta cada segundo si ya ha terminado.

Mi primera prueba no escribía nada ingenioso, solo un color en toda la pantalla. Ese fue el rectángulo rojo.

---

## El muro de los 20 segundos

Luego probé con imágenes de verdad, y salían rotas. Líneas que cruzaban la pantalla, colores que no eran los que tocaban, media foto.

El redibujado tarda unos 18 segundos, y la conexión se cortaba justo en torno a los 20. Claude estaba convencido de que iOS corta sin más cualquier sesión NFC a los 20 segundos y de que no había nada que hacer. Yo no me lo creía, porque la app oficial lo conseguía en ese mismo iPhone.

Así que conecté el iPhone al Mac y grabé el registro del sistema mientras la app oficial dibujaba una imagen. Ahí estaba el truco: iOS limita cada *conexión* con una etiqueta a unos 20 segundos, no la sesión entera. Justo después de enviar la imagen, la app oficial corta la conexión, vuelve a conectarse más o menos una décima de segundo después y deja que la funda se redibuje con esa conexión recién estrenada, con 20 segundos enteros por delante.

En cuanto NFC.cool hizo lo mismo, las imágenes salieron limpias. Reconozco que disfruté bastante de haber tenido razón esa vez.

---

## Lo que NFC.cool puede poner en tu funda

La función está en **NFC.cool Tools 7.2.0**, dentro de Aplicaciones NFC, con el nombre **Funda de tinta electrónica**. Eliges un diseño, ves una vista previa exacta de cómo lo mostrará la funda, quitas la funda del móvil y apoyas el iPhone en su parte trasera hasta que se cierre la ventana de escaneo NFC.

- **Foto**: cualquier imagen de tu fototeca, recortada al tamaño de la pantalla. Esta es gratis. Convierte tu foto a las cuatro tintas, con realce de color (Estándar, Intenso o Máx.) y una opción en blanco y negro.
- **Recorte**: separa a la persona, la mascota o el objeto de una foto y lo coloca sobre un fondo de una de las cuatro tintas.
- **Código QR**: cualquier código QR que hayas guardado en NFC.cool, con su propio diseño, o uno que escribas tú. Puedes invertirlo, y la app te avisa cuando el texto es demasiado largo para que el código se siga leyendo bien en una pantalla tan pequeña.
- **Próximo evento** o un **evento elegido** de tu calendario.
- **Agenda de hoy**: todo lo que tienes hoy en el calendario.
- **Recordatorios**: los recordatorios pendientes de una de tus listas, en tres tamaños de texto.

Los diseños de calendario y de recordatorios son una foto fija: la funda muestra lo que había en el momento en que los enviaste, hasta que envíes el siguiente. No puede actualizarse sola sin tu móvil, y ese es el precio de no necesitar nunca un cargador.

---

## Lo que conviene saber

**Deja descansar la funda entre una escritura y otra.** Si envías dos diseños seguidos, el segundo sale desvaído y grisáceo. La funda necesita un momento para recuperarse entre un redibujado y el siguiente. La app oficial te pide que esperes un minuto, y es un buen consejo también con NFC.cool.

**No te muevas.** Todo el proceso tarda un poco, y casi todo ese tiempo se lo lleva el redibujado. Si apartas el móvil antes de tiempo, la app te avisa y puedes volver a intentarlo sin más.

**Solo en iPhone, de momento.** Está en la app de iPhone. La app de Android todavía no lo tiene.

**Qué fundas funcionan.** La mayoría de estas fundas vienen de un mismo desarrollador, que publica una app distinta para casi cada marca. Probé con mi funda todas las que encontré:

- **DeerPhoneCase**, **KAZAVA**, **Novixand** y **TYOHINN** funcionan con mi funda, y NFC.cool también. Si tu funda venía con una de estas apps, NFC.cool debería funcionar con ella.
- **Bestie e-INK** y **KINGZER** no funcionan con la mía. La imagen pasa por NFC sin problemas, pero cuando la funda debería redibujar la pantalla, no pasa nada.
- **SpaceInk+**, de otro desarrollador, no funciona en absoluto con mi funda. La app solo dice "device channel information mismatch".

Eso no significa que NFC.cool no funcione con las fundas de Bestie e-INK, KINGZER o SpaceInk+. Puede que simplemente sean algo distintas de la mía, y no puedo probarlas. Si tienes una, [cuéntame](/contact/) si NFC.cool funciona con ella o no. Si la tuya usa otra, la app te dice que todavía no es compatible y te ofrece un botón **Enviar datos de la funda**. Así se envían los datos técnicos del chip, nada que te identifique a ti ni a tu funda, para que yo pueda ver qué fundas tiene la gente de verdad y añadirlas.

**Dónde conseguir una.** En Amazon estas fundas se venden con muchísimas marcas, algunas bastante crípticas, pero detrás están las mismas fundas. [Aquí tienes una búsqueda en Amazon](https://link.amazon/B0hUxLZTR) (enlace de afiliado). La mía lleva DIY impreso por dentro, y algunos anuncios ponen DIY en el título, así que es una buena palabra para buscar. Si el anuncio menciona la app que usa la funda, busca DeerPhoneCase, KAZAVA, Novixand o TYOHINN.

---

## En resumen

Si tienes una de estas fundas por casa con la misma imagen que traía el primer día, dale algo más útil que mostrar. NFC.cool Tools está en la [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-es&mt=8).

Y si nunca has visto una pantalla de tinta electrónica parpadear y dibujar una imagen que le has mandado tú mismo, te lo recomiendo. Son unos segundos de lo más satisfactorios.
