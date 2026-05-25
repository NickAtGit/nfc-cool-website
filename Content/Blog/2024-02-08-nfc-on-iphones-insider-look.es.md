---
id: nfc-blog-020
title: "NFC en el iPhone por dentro: la visión de quien lo conoce bien"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "Cómo funciona realmente NFC en el iPhone - desde el elemento seguro de Apple Pay hasta la lectura de etiquetas con Core NFC. Un repaso práctico al protocolo, la historia en iOS y por qué el corto alcance es una ventaja, no una limitación."
metaTitle: "Cómo funciona NFC en el iPhone: la visión de quien lo conoce bien"
metaDescription: "Una explicación práctica de NFC en el iPhone - cómo funciona el protocolo, el elemento seguro de Apple Pay, la lectura de etiquetas con Core NFC y por qué el corto alcance es una función de seguridad."
ogTitle: "NFC en el iPhone por dentro: la visión de quien lo conoce bien"
ogDescription: "Cómo funciona realmente NFC en el iPhone - protocolo, elemento seguro, lectura de etiquetas con Core NFC y la historia en iOS."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Mucha de la tecnología que usamos cada día desaparece en el fondo. Haces un toque para pagar, desbloquear, escanear, compartir - y nunca piensas en el protocolo que hay debajo. NFC es una de esas piezas discretas de la fontanería, y después de años construyendo NFC.cool, una app para leer y escribir etiquetas NFC, he pasado más tiempo dentro de esa fontanería que la mayoría de la gente. Así es como funciona realmente en tu iPhone, tal y como se lo explicaría a un amigo curioso.

---

## Qué es realmente NFC

**Near Field Communication** es un protocolo inalámbrico de corto alcance - dos dispositivos pueden intercambiar datos cuando están a unos 4 cm el uno del otro. Yo lo veo como un primo simplificado y de alcance mucho más corto del Bluetooth y del Wi-Fi.

Ese corto alcance desconcierta a la gente al principio, pero no es una limitación. Es el modelo de seguridad, y cuando eso me quedó claro, muchas de las decisiones de diseño de NFC empezaron a tener sentido. No puedes tocar accidentalmente un terminal de pago desde el otro lado de la habitación, y un lector malicioso no puede extraer datos en silencio de tu cartera a distancia. Si esto es todo nuevo para ti, escribí una [guía para principiantes sobre etiquetas NFC](/blog/nfc-tags-beginners-guide/) que empieza desde más atrás que este artículo.

---

## NFC en el iPhone: una breve historia

Apple incluyó hardware NFC por primera vez con el iPhone 6 y el 6 Plus en 2014, pero la radio estaba bloqueada exclusivamente para Apple Pay. Las apps de terceros no podían leer etiquetas NFC en absoluto - lo cual, para alguien que más adelante iba a construir una app de NFC, fueron unos años frustrantes de ver desde fuera.

Eso cambió con **iOS 11** (2017), que introdujo el framework **Core NFC** y por fin permitió a desarrolladores como yo leer etiquetas NDEF. Apple fue abriendo la puerta cada vez más en versiones posteriores - iOS 13 añadió soporte de escritura, y el iPhone XS y modelos más nuevos incorporaron la lectura de etiquetas en segundo plano siempre activa. Hoy, en cualquier iPhone moderno, puedes tocar una etiqueta sin abrir nada: el sistema operativo la reconoce y ofrece la acción correcta.

---

## Cómo mueve datos NFC realmente

Los dispositivos NFC operan en uno de dos roles por interacción: **activo** (alimentado, genera un campo) o **pasivo** (sin batería, capta energía del campo). Esta es la única idea a la que vuelvo siempre que alguien me pregunta cómo funciona NFC.

Cuando haces un pago con Apple Pay, tu iPhone es el lector activo. Genera un campo de radio a 13,56 MHz. El elemento NFC del terminal de pago se activa dentro de ese campo, se identifica y intercambia una pequeña cantidad de datos criptográficos con tu móvil. Los datos de tu tarjeta nunca salen del **Secure Element** - un chip dedicado y aislado por hardware en el teléfono. Lo que sale es un token de un solo uso.

Cuando tocas un adhesivo NFC en un cartel, los roles se invierten. La etiqueta del cartel es pasiva - no tiene batería. El lector de tu iPhone la alimenta, la etiqueta responde con los registros NDEF que tenga almacenados, e iOS decide qué hacer (abrir una URL, lanzar una app, mostrar una tarjeta de contacto, activar un Atajo). Esa segunda mitad - el lado de la etiqueta - es la parte donde vive NFC.cool, y si quieres verlo en acción sin instalar nada, puedes [leer etiquetas NFC directamente desde tu navegador](/online-nfc-reader/) en Android.

---

## NDEF: la lingua franca

La capa de datos sobre la radio NFC es **NDEF** - NFC Data Exchange Format. Yo lo describo como un pequeño formato de registro autodescriptivo: una etiqueta lleva uno o más registros, y cada registro tiene un tipo (URI, texto, vCard, credenciales Wi-Fi, MIME personalizado) y un contenido.

Todos los móviles con NFC del planeta hablan NDEF, por eso una etiqueta programada en un dispositivo Android se lee sin problemas en un iPhone y viceversa. Es uno de los pocos sitios en el mundo móvil donde iOS y Android comparten genuinamente un estándar, y sinceramente esa interoperabilidad es lo que más agradezco cuando construyo funcionalidades - escribo para el formato, no para una plataforma. Si quieres probar a escribir tus propios registros, lo explico todo en [cómo escribir etiquetas NFC en el iPhone](/blog/write-nfc-tags-iphone/).

---

## Privacidad y seguridad

Vale la pena mencionar dos capas de defensa, y son las dos que más me encuentro explicando:

- **Alcance.** Unos pocos centímetros son difíciles de interceptar sin una antena perceptible - este es el modelo de amenaza original alrededor del cual se diseñó NFC.
- **Tokenización.** Apple Pay nunca transmite el número real de tu tarjeta. Cada transacción usa un Device Account Number más un criptograma de un solo uso, generado dentro del Secure Element. Ni siquiera un terminal comprometido puede reproducirlo.

Para la lectura de etiquetas, la superficie de amenaza es diferente - la propia etiqueta es lo que se está confiando. Si controlas lo que hay en la etiqueta (tus propias automatizaciones del hogar, tu tarjeta de visita), no hay problema. Si tocas una etiqueta aleatoria en un espacio público, deberías ver igualmente un diálogo de confirmación en iOS antes de que ocurra nada. Cuando realmente necesito que una etiqueta guarde un secreto en lugar de simplemente apuntar a uno, recurro a etiquetas criptográficas, y lo traté en [guardar secretos seguros y cifrados en etiquetas NFC](/blog/nfc-safe-encrypted-secrets/).

---

## Por qué esto importa

NFC es uno de esos protocolos que desaparece cuando funciona, y es exactamente por eso que me resulta satisfactorio construir sobre él. Tocas un torniquete, un terminal de pago, una tarjeta de visita, un altavoz inteligente - y algo pasa. No hay emparejamiento, no hay PIN, no hay lanzamiento de app. Solo un gesto físico deliberado que autoriza un intercambio específico.

Por eso construí [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-en&mt=8) - para poner toda la superficie NDEF de NFC al alcance de cualquiera sin que nadie tenga que aprender el protocolo primero. Lee cualquier etiqueta, escribe cualquier tipo de registro, bloquea una etiqueta cuando hayas terminado. En iPhone o en [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-en).
