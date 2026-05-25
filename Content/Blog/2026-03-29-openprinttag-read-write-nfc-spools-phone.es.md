---
id: nfc-blog-011
title: "OpenPrintTag: cómo leer y escribir bobinas de impresión 3D inteligentes con tu móvil"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag es el estándar abierto para bobinas de filamento inteligentes. Aprende cómo funciona, qué datos almacena y cómo leer y escribir etiquetas NFC OpenPrintTag usando solo tu móvil."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "Bobina de impresora 3D con etiqueta NFC siendo leída por un móvil"
metaTitle: "OpenPrintTag: leer y escribir bobinas de impresión 3D inteligentes con tu móvil"
metaDescription: "Aprende a usar OpenPrintTag para gestionar las bobinas de filamento de tu impresora 3D con NFC. Lee, escribe y controla los datos del material desde tu iPhone o Android, sin apps propietarias."
ogTitle: "OpenPrintTag: bobinas de impresión 3D inteligentes con NFC"
ogDescription: "La guía completa para leer y escribir bobinas NFC OpenPrintTag con tu móvil. Funciona con cualquier impresora y cualquier marca de filamento."
---
Si haces impresión 3D, probablemente hayas estado ahí: una estantería llena de bobinas a medias, sin idea de cuánto filamento queda en cada una, y esa bobina sin etiquetar que puede ser PETG o puede ser PLA, sin forma de saberlo sin una impresión de prueba. Yo también he estado ahí, y es el tipo de pequeña molestia recurrente para la que el NFC es genuinamente bueno.

Eso es lo que hace OpenPrintTag. Es un estándar NFC de código abierto creado por [Prusa Research](https://www.prusa3d.com) que convierte cualquier etiqueta NFC compatible en una etiqueta inteligente para tu bobina de filamento. Tipo de material, marca, color, peso restante: todo almacenado directamente en la bobina y legible con un toque rápido de tu móvil.

Sin nube. Sin ecosistema propietario. Sin necesidad de internet. Llevo años construyendo NFC.cool, una app para leer y escribir etiquetas NFC, y este es exactamente el tipo de estándar que me gusta ver - uno que pone los datos en la etiqueta y la deja funcionar en cualquier sitio. Aquí te explico cómo funciona y cómo leo y escribo bobinas OpenPrintTag con nada más que un móvil.

---

## ¿Qué es OpenPrintTag?

OpenPrintTag es un formato de datos universal y abierto para materiales de impresión 3D. En vez de que cada fabricante invente su propio sistema de bobina inteligente incompatible - que es exactamente el lío que he visto desarrollarse en otros rincones del mundo NFC - OpenPrintTag define un único estándar que cualquiera puede adoptar, incluidos fabricantes de filamento, fabricantes de impresoras, software de laminado y apps como NFC.cool.

Los principios clave, y las razones por las que creo que merece la pena prestarle atención:

- **Código abierto:** publicado bajo licencia MIT, libre de implementar, sin tasas de licencia
- **Offline por diseño:** todos los datos viven en la propia etiqueta, sin necesidad de servicio en la nube
- **Regrabable:** actualiza el filamento restante mientras imprimes, reutiliza etiquetas en bobinas nuevas
- **Universal:** funciona entre marcas y ecosistemas
- **Compatible tanto con FFF (filamento) como con SLA (resina)**

Más de 22 empresas y grupos han mostrado interés, incluidas Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint y PrintedSolid. La especificación completa está disponible en [specs.openprinttag.org](https://specs.openprinttag.org).

---

## ¿Qué datos almacena una OpenPrintTag?

Esta es la parte que me convenció. OpenPrintTag no es solo una etiqueta con un nombre. Es un formato de datos correctamente estructurado con campos para casi todo lo que querrías saber sobre una bobina, y la especificación claramente fue escrita por personas que realmente imprimen.

**Identificación del material:**
- Clase del material (filamento o resina)
- Tipo de material (PLA, PETG, ABS, TPU, ASA, PC, PA6 y más de 30 otros)
- Nombre del material (p. ej. "PLA Galaxy Black")
- Nombre de la marca (p. ej. "Prusament")
- Etiquetas de propiedad del material: más de 68 propiedades definidas como abrasivo, conductor, luminiscente en la oscuridad, apto para alimentos, seguro contra ESD, flexible y más

**Seguimiento de peso y longitud:**
- Peso nominal (anunciado, p. ej. 1000 g)
- Peso real (medido para esta bobina específica)
- Longitud del filamento (nominal y real, en mm)
- Peso del recipiente vacío (para que puedas pesar la bobina y calcular el material restante)
- Peso consumido (actualizado a medida que imprimes; este es el campo que hace que las bobinas sean verdaderamente "inteligentes")

**Color:**
- Color primario en formato RGBA
- Hasta 5 colores secundarios (para filamentos multicolor, galaxy o con degradado)
- Distancia de transmisión (valor de opacidad, útil para proyectos de [HueForge](https://shop.thehueforge.com/))

**Metadatos:**
- Fecha de fabricación y fecha de caducidad
- País de origen
- UUIDs para la marca, el material y la instancia específica de la bobina
- Configuración de protección contra escritura

La especificación cubre incluso campos específicos de resina como `last_stir_time`, que registra cuándo se agitó la resina por última vez antes de imprimir. Ese es el tipo de detalle que me dice que las personas detrás de esto se han quemado de verdad con resina sin agitar.

---

## La etiqueta: no es tu adhesivo NFC habitual

Aquí hay un detalle técnico que señalaría antes de comprar nada: **OpenPrintTag está diseñado para etiquetas ISO 15693 (NFC-V)**, específicamente chips **NXP ICODE SLIX e ICODE SLIX2**. Estas son etiquetas NFC Forum Type 5 con un alcance de lectura significativamente mayor que las etiquetas NFC-A estándar, hasta 1,5 metros con un lector dedicado. Si hasta ahora solo has comprado los adhesivos NTAG baratos que usa la mayoría de los proyectos, esta es una familia de etiqueta diferente - cubro el panorama completo en [tipos de etiquetas NFC para iPhone](/blog/nfc-tag-types-for-iphones/).

¿Por qué NFC-V? El lector NFC integrado de una impresora necesita detectar la bobina independientemente de su rotación. El mayor alcance del NFC-V lo hace posible sin requerir una alineación precisa de la etiqueta, lo cual es un diseño inteligente.

**¿Y los adhesivos NTAG normales?** El formato de datos de OpenPrintTag está basado en NDEF, así que una app de móvil como NFC.cool puede técnicamente leer y escribir datos OpenPrintTag en cualquier etiqueta NFC, incluidas NTAG213/215/216. Lo he hecho - funciona bien para lectura entre móviles. Sin embargo, **el hardware de las impresoras y apps como la de Prusa solo reconocen etiquetas NFC-V**. Así que si quieres que tus bobinas etiquetadas funcionen con los lectores integrados de las impresoras, usa etiquetas ICODE SLIX2. No cometas el error que esperaría que la mayoría de la gente cometiera y compres una bolsa de NTAG213 para esto.

Si compras etiquetas en blanco, busca específicamente **ICODE SLIX2** o **ISO 15693**. Puedes encontrar etiquetas compatibles en [Amazon EE. UU.](https://amzn.to/3LTh1fT) o [Amazon Europa](https://amzn.to/4oJpQr4) (enlaces de afiliado).

---

## Cómo leer y escribir OpenPrintTag con tu móvil

No necesitas una impresora Prusa ni ningún hardware especial para trabajar con OpenPrintTag, solo tu móvil. Esta es la parte que más ganas tenía de construir, porque un móvil en el bolsillo es el lector NFC más accesible que existe.

NFC.cool Tools es compatible con OpenPrintTag de forma nativa tanto en [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) como en [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en), y me aseguré de que la función fuera completamente gratuita.

**Leer una etiqueta:**
1. Abre NFC.cool Tools
2. Acerca tu móvil a la etiqueta NFC de la bobina
3. NFC.cool detecta automáticamente el formato OpenPrintTag
4. Ve los datos estructurados: material, marca, color, peso, longitud, propiedades

**Escribir una etiqueta:**
1. Pega una etiqueta ICODE SLIX2 en blanco en tu bobina
2. Abre NFC.cool → sección NFC Apps → OpenPrintTag
3. Rellena los detalles del material: tipo, marca, color, peso, longitud
4. Toca para escribir

**Actualizar el material restante:**
Después de una impresión, actualiza el campo de peso consumido en la etiqueta. La próxima vez que la escanees, sabrás exactamente cuánto filamento queda, sin adivinar, sin pesar. Esta es la parte que convierte una bobina inteligente de una novedad en algo en lo que realmente confiaría.

Si quieres mirar bajo el capó, puedes usar el Modo Experto para inspeccionar los registros NDEF en bruto - útil cuando necesitas depurar una etiqueta o verificar la estructura de los datos. ¿Nuevo escribiendo etiquetas en general? Explico lo básico en [cómo escribir etiquetas NFC en iPhone](/blog/write-nfc-tags-iphone/).

---

## ¿Por qué usar tu móvil?

Las impresoras Prusa están incorporando lectores NFC integrados, y proyectos como [SpoolSense](https://github.com/SpoolSense) (un lector ESP32 de código abierto) están añadiendo opciones de hardware dedicado. ¿Entonces para qué molestarse con el móvil? Aquí está el argumento que haría:

- **Funciona con cualquier impresora:** Voron, Bambu Lab, Creality, Ender, lo que uses
- **Escribe etiquetas para cualquier filamento:** Prusament viene preetiquetado, pero puedes etiquetar tú mismo Fillamentum, eSUN, Hatchbox o cualquier marca
- **Gestiona el inventario lejos de tu impresora:** escanea bobinas en tu escritorio, en tu almacenamiento o en un makerspace
- **Depura etiquetas:** cuando una impresora no puede leer una etiqueta, escanéala con tu móvil para ver qué hay realmente en ella - este es el uso al que más recurriría
- **Sin hardware extra:** tu móvil ya tiene un lector NFC, y ese es todo el punto

---

## Casos de uso prácticos

**Inventario personal:** Etiqueta cada bobina de tu colección. Cuando planifiques una impresión, escanea las bobinas para comprobar el tipo de material, la longitud restante y el color sin desembalar nada.

**Seguimiento del filamento restante:** Pesa tu bobina antes y después de una impresión, actualiza el peso consumido en la etiqueta. Se acabó la ansiedad del "¿tendrá esta bobina suficiente para una impresión de 14 horas?".

**Uso en makerspace o en equipo:** Etiqueta las bobinas con los detalles del material para que cualquiera en el taller pueda escanearlas e identificarlas. Se acabó el filamento misterioso.

**Notas de prueba de filamento:** ¿Encontraste la temperatura perfecta para una bobina específica? Actualiza la etiqueta con tus notas para la próxima vez.

**Materiales multicolor y especiales:** OpenPrintTag admite hasta 6 colores por bobina y más de 68 etiquetas de propiedad. Tu PETG luminiscente en la oscuridad reforzado con fibra de carbono por fin puede estar bien etiquetado, con la indicación de abrasivo y todo.

---

## El ecosistema está creciendo

OpenPrintTag todavía es joven, pero el impulso es real:

- **Prusament** incluye etiquetas NFC OpenPrintTag en cada bobina
- Las **impresoras Prusa** están añadiendo lectores NFC nativos
- **Lectores de hardware de código abierto** como SpoolSense (basado en ESP32) están surgiendo de la comunidad
- **Más de 22 empresas** se han unido a la iniciativa
- **NFC.cool** es la única app NFC de propósito general con soporte completo de OpenPrintTag tanto en iOS como en Android, y la añadí porque yo mismo quería usarla

Llevo años viendo cómo la industria de la impresión 3D necesitaba un estándar abierto para bobinas inteligentes, y he visto unos cuantos intentos propietarios aparecer y desaparecer. OpenPrintTag es el más creíble que he visto: respaldado por un fabricante importante, completamente de código abierto y ya disponible en productos reales. Esa combinación es suficientemente rara como para apostar por ella.

---

## Cómo empezar

**Lo que necesitas:**
- iPhone 7 o posterior, o un móvil Android con NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en)), gratuito, con OpenPrintTag incluido
- Etiquetas NFC ICODE SLIX2 / ISO 15693 en blanco ([Amazon EE. UU.](https://amzn.to/3LTh1fT) / [Amazon Europa](https://amzn.to/4oJpQr4), enlaces de afiliado)
- Algunas bobinas de filamento para etiquetar

Eso es todo. En cinco minutos tu primera bobina podría ser inteligente. Si el NFC te resulta nuevo, mi [guía para principiantes sobre etiquetas NFC](/blog/nfc-tags-beginners-guide/) es el lugar al que te dirigiría primero, y la [página de la función de lector/escritor NFC](/features/nfc-reader-writer/) cubre lo que NFC.cool Tools puede hacer más allá de OpenPrintTag.

*OpenPrintTag es una iniciativa de código abierto de Prusa Research. NFC.cool es una colaboradora independiente del estándar. Más información en [openprinttag.org](https://openprinttag.org).*
