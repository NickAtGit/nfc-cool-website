---
id: "read-passport-nfc-chip-2026-07"
title: "Lee el chip NFC de tu pasaporte con tu móvil"
date: "2026-07-20"
tags: ["announcements", "nfc-tags", "privacy"]
summary: "Dentro de tu pasaporte hay un chip NFC, y ahora tu móvil puede leerlo. NFC.cool Tools lee el chip de un pasaporte, un documento de identidad o un permiso de residencia en iPhone y Android - muestra la foto y los datos guardados, y comprueba si el documento es auténtico."
image: "/assets/images/Blog/read-passport-nfc-chip.webp"
imageAlt: "Un pasaporte biométrico junto a un móvil que muestra la foto guardada del documento y una marca de verificación de autenticidad"
author: "Nicolo Stanciu"
metaTitle: "Lee el chip NFC de tu pasaporte con tu móvil"
metaDescription: "Tu pasaporte tiene un chip NFC, y NFC.cool puede leerlo en iPhone y Android. Ve la foto y los datos guardados en el chip, y comprueba si el documento es auténtico."
ogTitle: "Tu pasaporte tiene un chip NFC. Ahora tu móvil puede leerlo."
ogDescription: "NFC.cool ahora lee el chip de tu pasaporte, documento de identidad o permiso de residencia - la foto, los datos y si es auténtico. En iPhone y Android."
---
La última vez que volé, pasé un minuto de pie en una de esas puertas automáticas de pasaportes - la cabina de cristal donde apoyas el pasaporte en el lector, levantas la vista hacia la cámara y esperas a que las puertas decidan que les caes bien. Tarda un momento. Y en ese momento me sorprendí pensando en lo que la máquina estaba haciendo en realidad. No estaba leyendo la página impresa. Estaba hablando con el pequeño chip escondido dentro de la tapa de mi pasaporte.

Llevo años leyendo chips NFC para ganarme la vida. Sabía que ese chip estaba ahí. Simplemente nunca había apuntado mi propia app hacia él. De pie en aquella puerta, me molestó de verdad que un quiosco fronterizo pudiera leer mi pasaporte y NFC.cool no.

Y esa espinita clavada es justo la razón de ser de NFC.cool. Mi objetivo con ella siempre ha sido simple y un poco terco: ser el mejor lector NFC que puedas tener en un móvil, y admitir todo lo que el NFC puede hacer de verdad - sin convertirla en una herramienta que necesites un título de ingeniería para manejar. Un chip de pasaporte es prácticamente el máximo exponente de "todo lo que el NFC puede hacer". Así que lo integré.

NFC.cool Tools ahora lee el chip que hay dentro de un pasaporte biométrico, un documento de identidad o un permiso de residencia, tanto en iPhone como en Android. Te muestra la foto y los datos personales guardados en el chip, y te dice si el documento parece auténtico. Así es como funciona, y hasta dónde llega de verdad.

---

## El chip no habla hasta que demuestras que tienes el documento en la mano

Esta es la parte que sorprende a la gente: no puedes simplemente pasar el móvil por encima de un pasaporte y leerlo. El chip está bloqueado a propósito. No dirá una sola palabra hasta que le entregues una clave, y esa clave está impresa en tu propio documento.

Me parece un detalle de diseño precioso. Significa que nadie puede leer tu pasaporte a escondidas mientras está en tu bolsillo o en tu bolsa. La única forma de entrar es tener ya el documento abierto en la mano, porque la clave se construye a partir de lo que está impreso en él: el número de documento, tu fecha de nacimiento y la fecha de caducidad.

Así que la app te pide primero exactamente esas tres cosas, de una de dos maneras. Puedes apuntar la cámara a la zona de lectura mecánica - esa banda de gruesos caracteres `<<<` a lo largo de la parte inferior de la página con tu foto en el pasaporte, o del reverso de un documento de identidad - y NFC.cool la lee ópticamente, igual que hace la puerta del aeropuerto. O, si el documento está desgastado o hay poca luz, escribes los tres valores a mano. En cualquier caso, una vez que la app tiene la clave, te pide que sostengas la parte superior de tu móvil contra el documento, y empieza la lectura real del chip. Si alguna vez te has preguntado [cómo funciona realmente el NFC en un iPhone](/blog/nfc-on-iphones-insider-look/), este es el mismo apretón de manos a corta distancia, solo que con un chip mucho más quisquilloso al otro lado.

## Qué sale del chip

Unos segundos después estás mirando lo que el chip ha llevado consigo todo este tiempo: la foto tuya que guardó la autoridad emisora, tu nombre, tu nacionalidad, el número de documento, tu fecha de nacimiento y de caducidad, y en algunos documentos un poco más - lugar de nacimiento, la autoridad emisora, la fecha en que se expidió. Son los mismos datos que saca la cabina del agente, solo que en tu mano.

Cada documento que lees se guarda en una pequeña cartera dentro de la app, llamada Mis Documentos, para que puedas consultarlo más tarde. Esa cartera vive en tu dispositivo, y en iPhone se sincroniza a través de tu propio iCloud. No llega a mí, ni a ningún servidor mío. Con algo tan personal, no es un detalle que vaya a esconder.

## ¿Es auténtico el documento?

La parte de la que más contento estoy es la comprobación de autenticidad. El chip de un pasaporte moderno no es solo una tarjeta de memoria. El país emisor firma su contenido, un poco como un sello de cera estampado en los datos. NFC.cool comprueba ese sello: que nada en el chip ha sido alterado desde que se expidió, que la firma es matemáticamente válida y que se remonta a una autoridad emisora real que la app reconoce. Los mejores chips también pueden demostrar que son el silicio original y no una copia, y la app también lo comprueba cuando el chip lo admite.

Eso sí, hay una promesa que me hice sobre las palabras que usa la app. Nunca llamará "falso" a tu pasaporte. Si todas las comprobaciones pasan, dice que el documento parece auténtico. Si algo no cuadra - o, mucho más a menudo, si simplemente no puede confirmar al emisor porque ese país no está en la lista que la app lleva consigo - dice que no se pudo verificar, y ahí se detiene. "No pude comprobar esto" y "esto es una falsificación" son frases muy distintas, y no estoy dispuesto a confundirlas cuando se trata de algo tan serio como tu documento de identidad.

## Lo que la app no puede hacer

Unas cuantas respuestas directas, porque este es el tipo de función en el que andarse por las ramas sería un flaco favor.

Funciona con muchos documentos, pero no puedo prometer que funcione con absolutamente todos. Lo he probado con un montón de pasaportes y tarjetas de distintos países y la mayoría se leen sin problemas, pero los documentos del mundo no son perfectamente uniformes, y el tuyo podría ser la excepción. Si uno se resiste, normalmente es el documento, no tú.

Lee lo que se le permite leer, y nada más. Algunos chips también guardan huellas dactilares o datos del iris, y esos están detrás de claves que solo tienen los sistemas de inspección gubernamentales - no algo que se le dé a una app de consumo, y no algo que yo querría que tuviera. NFC.cool nunca los toca. Lee la foto del rostro y los mismos datos que van impresos en el documento, que es justo la parte pensada para que la lea la persona que lo tiene en la mano.

Y necesita un móvil con NFC, sostenido quieto contra el documento mientras lee. El chip es pequeño y la conexión es delicada, así que si el móvil se resbala, hay que empezar la lectura otra vez. Mantén el documento plano contra la parte superior del móvil hasta que termine.

---

Sigo pensando en aquella puerta del aeropuerto. Todo ese teatro de la seguridad en los viajes modernos, y en el centro de todo hay un diminuto chip NFC haciendo un cuidadoso apretón de manos - el mismo tipo de apretón de manos con el que llevo años [leyendo y escribiendo etiquetas](/features/nfc-reader-writer/). Ahora el lector que llevas en el bolsillo también puede hacerlo.

Si quieres ver lo que tu propio pasaporte ha estado llevando en silencio, el lector de Pasaporte e ID está en NFC.cool Tools en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-read-passport-nfc-chip-es&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-read-passport-nfc-chip-es), justo al lado de todo lo demás que he construido para NFC. Abre tu pasaporte, acércalo al móvil y conoce a esa versión de ti que lleva todo este tiempo viviendo en el chip.
