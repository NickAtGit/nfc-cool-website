---
id: "nxp-icode-3-2026-10"
title: "Las etiquetas ICODE 3, SLIX, ICODE DNA y NTAG 5 ya funcionan con NFC.cool en iPhone"
date: "2026-10-04"
tags: ["announcements", "nfc-tags", "iphone"]
summary: "NFC.cool Tools 7.1.0 ya se entiende con los chips NXP ICODE: lee, verifica y gestiona etiquetas ICODE 3, de la familia SLIX, ICODE DNA y NTAG 5 en iPhone, y también en iPad y Mac con un lector externo. Te cuento qué saben hacer estos chips de bibliotecas y tiendas, y la rareza de iOS que casi me hizo creer que mi propio código estaba roto."
image: "/assets/images/Blog/nxp-icode-3-slix-ntag-5.webp"
imageAlt: "Un libro de biblioteca con una etiqueta RFID por dentro de la cubierta junto a un iPhone que muestra los detalles de una etiqueta NFC"
author: "Nicolo Stanciu"
metaTitle: "Etiquetas NXP ICODE 3 y SLIX en iPhone: léelas y gestiónalas"
metaDescription: "NFC.cool ya lee y gestiona etiquetas NXP ICODE 3, SLIX, SLIX2, ICODE DNA y NTAG 5 en iPhone: contraseñas, contador de toques, indicador antirrobo, modo privacidad y más."
ogTitle: "ICODE 3, SLIX y NTAG 5 ya funcionan en el iPhone"
ogDescription: "Qué saben hacer los chips de NXP para bibliotecas y tiendas, y cómo NFC.cool los lee y los gestiona en iPhone, iPad y Mac."
---

Tenía una etiqueta ICODE 3 sobre el escritorio, el iPhone encima y la app leyendo sin problema todo lo que el chip tenía que contar: su ID, su memoria, su contador de toques y la firma de NXP que demostraba que era auténtico. Entonces le pedí que cambiara una sola cosa, el contador, y la app me dijo que la etiqueta se había alejado.

No se había movido ni un milímetro. Volví a intentarlo. El mismo mensaje. Probé a poner una contraseña. El mismo mensaje.

Enseguida te cuento qué estaba pasando, porque es el bug más curioso que he tenido que cazar este año. Pero primero, por qué andaba yo trasteando con una etiqueta ICODE.

Quiero que NFC.cool sea la app NFC más completa que puedas llevar en el móvil. Este verano eso significó [NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), las etiquetas que usan las marcas para demostrar que un producto es auténtico. Después de eso, la familia de chips más grande con la que la app todavía no se entendía de verdad era ICODE, de NXP. Con **NFC.cool Tools 7.1.0**, por fin se entienden.

---

## ICODE, las etiquetas que has tenido en la mano sin saberlo

Si has sacado un libro de una biblioteca en los últimos veinte años, es muy probable que hayas tenido en la mano una etiqueta ICODE. Es esa etiqueta plana con una antena en espiral pegada por dentro de la cubierta. Esos mismos chips van en las etiquetas antirrobo de las tiendas, en las de lavandería y en las que llevan muchos productos.

Técnicamente son chips **ISO 15693**, lo que en el mundo NFC se llama **Type 5**. Las pegatinas NFC que compra casi todo el mundo, como la NTAG215, siguen otro estándar. Yo me lo imagino como dos emisoras que suenan en la misma radio: tu iPhone sintoniza las dos, pero cada una emite en su propio idioma.

Si las bibliotecas y las tiendas eligen ICODE, es por el alcance. Una antena grande en el arco de salida de una biblioteca o en un puesto de autopréstamo puede leer estas etiquetas desde más lejos que una pegatina NFC normal. Con el móvil hay que acercarse igualmente, porque la antena del iPhone es diminuta, pero el chip está pensado para esos arcos.

Leer el enlace o el texto guardado en una etiqueta ICODE nunca fue lo difícil. Lo interesante está por debajo: contraseñas, un contador, el indicador antirrobo, un modo privacidad. Hasta ahora, esa parte del chip quedaba fuera del alcance de NFC.cool.

---

## Qué hace NFC.cool con una ICODE 3

**ICODE 3** es el chip más reciente de la familia y el sucesor de ICODE SLIX2. En internet lo verás anunciado muchas veces como "SLIX 3". NXP no tiene ningún chip con ese nombre, así que si un anuncio dice SLIX 3, es una ICODE 3.

Escanea una con NFC.cool y lo verás todo: qué chip es, su memoria, su contador y si aparece como **NXP auténtica**. NXP firma en fábrica el ID de cada chip y la app comprueba esa firma, así que una copia que reutilice el ID no puede falsificarla.

A partir de ahí puedes cambiar casi todo lo que ofrece el chip:

- **Contador de toques.** La ICODE 3 puede contar por sí sola cada lectura. Activa el espejo NFC y el chip escribe su ID y el número actual dentro del enlace guardado, de modo que cada toque abre una URL un poco distinta que una web puede contar. Si has leído sobre el [Contador de Toques NFC](/blog/count-nfc-tag-scans/), es la misma idea en otro chip.
- **Contraseñas.** La ICODE 3 tiene seis, una para cada cosa: lectura, escritura, privacidad, destrucción, ajustes antirrobo y configuración. Todas las etiquetas salen de fábrica con los mismos valores, así que una protección solo sirve de algo cuando pones las tuyas. NFC.cool guarda tus contraseñas en el Llavero de iCloud, etiqueta por etiqueta.
- **Protección de memoria.** Puedes dividir la memoria en dos partes y proteger cada una por separado, por ejemplo para que un enlace público se pueda seguir leyendo mientras los datos guardados detrás quedan ocultos.
- **Ajustes antirrobo y de biblioteca.** El indicador EAS es lo que hace pitar el arco de una tienda o de una biblioteca. El byte AFI es lo que usan las bibliotecas para marcar un libro como prestado. Puedes cambiar los dos, y también bloquearlos.
- **Modo privacidad.** La etiqueta oculta su ID y sus datos hasta que alguien presenta la contraseña de privacidad.
- **Detección de manipulación** en la versión SL2S3003TT, que lleva un hilo que puedes pasar por el tapón de una botella o por el precinto de una caja. La app te muestra si el precinto se ha roto alguna vez.
- **Tu propia firma.** Una marca puede sustituir la firma de NXP por la suya y bloquearla.
- **Destrucción.** Apaga el chip para siempre, por privacidad, cuando el producto llega al final de su vida útil.

Varios de estos ajustes son permanentes, y algunos pueden dejar una etiqueta inaccesible desde un iPhone. Por eso, para todo lo que no tiene vuelta atrás, NFC.cool te pide primero que escribas los cuatro últimos caracteres del ID de la etiqueta. Además, se niega a modificar una etiqueta que no sea la misma con la que empezaste. Aun así, yo probaría cualquier cosa nueva primero en una etiqueta de repuesto.

Una cosita que arreglé por el camino: ahora puedes formatear desde la app una etiqueta ICODE en blanco como etiqueta NFC, para que quede lista para guardar un enlace o un texto.

---

## El resto de la familia

La app identifica qué chip tienes en la mano y solo te ofrece lo que ese chip puede hacer de verdad. Una SLIX antigua te muestra menos opciones que una ICODE 3, sencillamente porque el chip tiene menos funciones.

- **SLIX, SLIX-S, SLIX-L, SLIX2** y los antiguos **SLI** son los chips de toda la vida, los que encontrarás en la mayoría de las bibliotecas. La SLIX2 tiene el contador y la protección de memoria. La SLIX-S protege su memoria página a página y admite contraseñas de 64 bits, con las que cada acceso protegido necesita tanto la contraseña de lectura como la de escritura.
- **ICODE DNA** es la variante pensada para la seguridad. Guarda claves AES secretas que nunca salen del chip. Introduce la clave en NFC.cool y la app desafía al chip a demostrar que la tiene. Una copia no pasa la prueba aunque su ID y su memoria coincidan a la perfección.
- **NTAG 5** es la familia que más me emociona, porque me encanta cacharrear. Son chips NFC pensados para ir montados en una placa de circuito. La versión **switch** controla pines directamente, y las versiones **link** y **boost** hablan con un microcontrolador por I2C. Pueden alimentar un pequeño circuito solo con el campo de tu móvil, avisar de eventos a través de un pin y compartir 256 bytes de memoria con la placa. NFC.cool lee y cambia esos ajustes, y en los modelos NTP5332 y NTA5332 puede incluso hablar con sensores conectados al chip, directamente desde tu iPhone.

Lo encontrarás todo en las herramientas NFC, en **NXP ICODE y NTAG 5**, justo al lado de NTAG 424 DNA. O simplemente escanea una etiqueta ICODE y la app abrirá sus detalles por sí sola.

---

## El bug que iOS no quería que arreglara

Volvamos a mi escritorio y a la etiqueta que "se había alejado".

La norma ISO 15693 le da al móvil dos formas de hablar con una etiqueta. Puede escribir el ID de la etiqueta en cada mensaje, como quien pone el nombre del destinatario en un sobre, para que solo responda esa etiqueta. O puede **seleccionar** primero la etiqueta, como quien se gira hacia una persona concreta en una sala llena de gente, y a partir de ahí hablarle sin más.

La vía del sobre es la más limpia, así que NFC.cool la prueba primero. Para comprobar si funciona, la app enviaba un mensaje de prueba rápido con un ID. La etiqueta respondía, así que la app daba por hecho que los mensajes con destinatario funcionaban y seguía adelante.

Lo que yo no sabía es que iOS reparte estos comandos en dos grupos. Por un lado están los estándar, los que entiende cualquier chip ISO 15693. Por otro, los comandos propios de NXP, que son los de las contraseñas, el contador y la configuración. Cuando un mensaje con destinatario lleva uno de esos comandos de NXP, iOS se niega a enviarlo. El mensaje ni siquiera sale del móvil. El sistema se limita a devolver un error de "parámetro no válido", y para mi código ese error era idéntico al de una etiqueta que se había apartado del iPhone.

Mi mensaje de prueba usaba un comando estándar, así que pasaba sin el menor problema y me decía que todo iba bien. Todos los cambios de verdad usaban un comando de NXP, así que todos fallaban.

Una vez entendido el problema, el arreglo fue tan pequeño que casi da vergüenza. Ahora la prueba usa uno de los comandos propios de NXP, uno inofensivo que solo le pide al chip un número aleatorio. Si iOS lo rechaza, la app recurre a seleccionar la etiqueta. Volví a poner la ICODE 3 debajo del iPhone, pulsé **Establecer contador** y el número de la etiqueta cambió. Pocas veces me ha hecho tanta ilusión ver moverse un contador.

---

## Dónde funciona

En iPhone, todo esto funciona con el lector NFC que lleva el propio teléfono. En iPad y Mac, que no tienen chip NFC, funciona a través de un [lector NFC USB externo](/blog/nfc-reading-ipad-mac/). Eso sí, el lector tiene que pasarle los comandos ICODE a la etiqueta tal cual. Si el tuyo lo hace, la app lee y gestiona las etiquetas ICODE exactamente igual que en un iPhone, y el bug del que te acabo de hablar ni siquiera existe ahí. Con un lector que no lo haga, sigues pudiendo leer la memoria de la etiqueta.

La app de Android todavía no es compatible con ICODE.

Si tienes un cajón lleno de etiquetas de las de biblioteca con las que nunca pudiste hacer gran cosa, o una placa con NTAG 5 esperando su proyecto, actualiza a la 7.1.0 y acerca una al iPhone. NFC.cool Tools está en la [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nxp-icode-3-slix-ntag-5-es&mt=8).
