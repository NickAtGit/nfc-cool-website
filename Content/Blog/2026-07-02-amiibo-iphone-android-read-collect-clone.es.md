---
id: "amiibo-iphone-android-read-collect-clone-2026-07"
title: "Leer, coleccionar y clonar Amiibo en iPhone y Android"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "Quiero que NFC.cool sea la mejor app de NFC en iPhone y Android, así que le he dado compatibilidad total con Amiibo: escanea una figura para ver sus datos, crea una colección personal y clona una en un NTAG215 en blanco. Así funcionan de verdad los Amiibo por dentro - y por qué la app no incluye ninguna clave."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-clone.webp"
imageAlt: "Una figura coleccionable NFC imaginaria junto a un móvil que muestra una pantalla de colección privada"
author: "Nicolo Stanciu"
metaTitle: "Amiibo en iPhone y Android: leer, coleccionar, clonar"
metaDescription: "NFC.cool lee Amiibo en iPhone y Android, guarda una colección y los clona en etiquetas NTAG215 en blanco. Cómo funcionan los Amiibo por dentro y sus límites reales."
ogTitle: "Leer, coleccionar y clonar Amiibo en iPhone y Android"
ogDescription: "Le he dado a NFC.cool compatibilidad total con Amiibo - escanea, colecciona y clona en una etiqueta en blanco. Así funcionan de verdad los Amiibo y por qué la app no incluye claves."
---
La gente da por hecho que dentro de un Amiibo hay algo exótico. Algún trozo de silicio de Nintendo que no puedes comprar en ningún otro sitio. Pues no. Sellado en la base de la figura hay un [NTAG215](/affiliate-links/) - el mismo chip de pegatina en blanco que leo y grabo cada día, de esos que vienen diez por paquete por cuatro monedas. Unos 540 bytes de memoria, un número de serie grabado en fábrica, y eso es toda la figura. El plástico es la parte cara. El chip es casi una ocurrencia de última hora.

Que es justo lo que me estuvo rondando durante tanto tiempo. Me gano la vida leyendo y grabando etiquetas NFC, y había toda una categoría de ellas - un puñado de figuras en la estantería junto a mi escritorio - a las que mi propia app se encogía de hombros. Quiero que NFC.cool sea la app de NFC más capaz que puedas instalar en tu móvil, la que no deja ningún tipo de etiqueta sin cubrir.

Así que me senté, las figuras a un lado y mi Switch al otro, y le di a NFC.cool una compatibilidad con Amiibo como es debido. Esto es en lo que se convirtió y lo que aprendí por el camino - empezando por qué un chip tan barato es tan sorprendentemente difícil de copiar.

---

## ¿Y dónde está la magia?

Si el chip es así de corriente, está claro que la magia no está en el silicio. Está en los bytes. Un Amiibo es en realidad un cuaderno barato que Nintendo ha escrito en un código privado y luego ha firmado al pie para que puedas distinguir una falsificación de la auténtica. (El chip en sí es un simple [NTAG215](/blog/nfc-tag-types-for-iphones/), por si quieres el recorrido más a fondo por los tipos de etiquetas.)

En esos bytes viven dos cosas. La primera está a la vista: un pequeño bloque que indica de qué personaje se trata - Link, de la serie The Legend of Zelda, dentro de una gama concreta de Amiibo. Esa es la parte que lee tu Switch para saber que una figura acaba de tocarla. La segunda parte está bloqueada: los datos de guardado propiamente dichos, como un apodo, el Mii del dueño, cuántas veces se ha usado la figura y lo que sea que el juego de turno haya garabateado en el pequeño bloc de notas que se le permite usar. Esa parte está cifrada, y está firmada.

## Por qué no puedes copiar un Amiibo sin más

El guardado cifrado no está protegido por una única clave fija que pudieras averiguar una vez y reutilizar para siempre. Cada etiqueta obtiene sus propias claves, derivadas al momento a partir de un conjunto de claves maestras mezcladas con datos extraídos de esa etiqueta concreta - incluido su número de serie único. Además, todo el conjunto está firmado con un HMAC. Cambia un solo byte sin volver a firmarlo y la consola detecta la falsificación y rechaza la figura.

Y aquí está la trampa. Como el número de serie está incrustado tanto en la derivación de claves como en la firma, no puedes volcar un Amiibo real y copiarlo byte a byte en una etiqueta en blanco. La etiqueta en blanco tiene un número de serie distinto, así que cada clave derivada sale diferente, la firma ya no coincide y la consola lo rechaza. El enfoque evidente de "copiar todas las páginas sin más" falla siempre.

Para clonar uno como es debido tienes que volver a derivar las claves contra la etiqueta de destino y volver a firmar los datos para que sean válidos para ese trozo exacto de plástico y silicio, no para el que lo volcaste. La implementación de referencia sobre la que todo el mundo construye es una herramienta llamada amiitool. Reconstruí todo ese baile de forma nativa dentro de la app - del formato de la etiqueta al formato interno y vuelta, derivación de claves, cifrado, firma - para que NFC.cool pueda hacerlo en el móvil que tienes en la mano, sin ningún ordenador de por medio.

## Qué hace NFC.cool ahora

Tres cosas, en el orden en que probablemente las uses.

**Leer.** Acerca un Amiibo a la parte de atrás de tu móvil, igual que harías para [leer cualquier etiqueta NFC](/features/nfc-reader-writer/), y NFC.cool lo identifica al instante: el personaje, la serie del juego, la serie de Amiibo, el tipo de figura y la ilustración, junto con un par de datos de la propia etiqueta, como cuántas veces se ha grabado. Para esto no hacen falta claves. Identificar una figura solo toca la parte que ya está a la vista.

**Coleccionar.** Cada Amiibo que escaneas se guarda en Mi colección, una simple cuadrícula con todo lo que tienes. Vive en tu dispositivo - en iPhone se sincroniza con tus demás dispositivos Apple a través de iCloud - y las ilustraciones se guardan en caché para que la colección siga viéndose bien cuando estás sin conexión. Solo con eso, mi triste estantería se convirtió en algo que de verdad puedo explorar.

**Clonar.** Con tus propias claves importadas, puedes grabar una copia con claves regeneradas de una figura en un NTAG215 en blanco. Puedes clonar directamente desde una figura que acabas de escanear o desde un volcado `.bin` guardado en tu dispositivo. La app vuelve a derivar las claves para la etiqueta en blanco que tienes en la mano y firma los datos para esa etiqueta, de modo que la copia es válida por sí misma en lugar de una falsificación byte a byte condenada al fracaso. La grabación es permanente - una vez que la etiqueta se bloquea, se queda bloqueada - y la app te lo dice con claridad antes de que confirmes.

## Qué se ha dejado fuera a propósito

NFC.cool no incluye las claves de Amiibo, y nunca lo hará. No hay claves escondidas en la app, ni una biblioteca de datos de Amiibo integrada.

Leer y coleccionar funcionan de fábrica porque solo tocan la parte abierta de la etiqueta. Clonar es distinto: necesita las claves maestras, y esas son de Nintendo, no mías. Si las has conseguido tú mismo - el `key.bin` combinado, o los dos archivos por separado - las importas en la app una vez y la función de clonado se activa. Si no las tienes, se queda desactivada. Yo he construido la máquina; el combustible lo pones tú.

Creo que esa es la línea honesta por la que hay que ir. La capacidad es de verdad útil. Hacer una copia de seguridad de una figura que tu hijo está a una mala tarde de perder, o poner un repuesto en una tarjeta barata en lugar de arriesgar el original, son razones reales por las que la gente quiere esto. Prefiero darte una forma limpia y privada de hacerlo en tu propio móvil antes que fingir que la demanda no existe. Pero no voy a repartir algo que nunca fue mío para repartir.

## Funciona de verdad

No quería lanzar esto a ciegas, así que lo probé de la única manera que cuenta.

Escaneé una de mis propias figuras, la cloné en un NTAG215 en blanco y me llevé la copia a mi Switch. Cargué The Legend of Zelda: Tears of the Kingdom, acerqué el clon al Joy-Con derecho y me soltó un puñado de objetos en el inventario. Igual que el original. Sin quejas, sin ningún "no se puede leer este Amiibo". Ese fue el momento en que todo esto se volvió real para mí. Toda esa matemática de derivación de claves y esos diseños de bytes, y el resultado es una barata pegatina en blanco que una consola de Nintendo trata tan contenta como la figura auténtica.

---

Esa estantería junto a mi escritorio ya no es solo decoración. Es una función.

Si quieres probarlo, las herramientas de Amiibo están en NFC.cool para [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-clone-es&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-clone-es), justo al lado de todo lo demás que he construido para leer y grabar etiquetas. Trae tus propias claves, acerca una figura y descubre lo que tu app llevaba todo este tiempo ignorando en silencio.
