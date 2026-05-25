---
id: "nfc-safe-2026-05"
title: "NFC Safe: guarda secretos cifrados en etiquetas NFC duraderas"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "AES de 256 bits en etiquetas NFC revestidas de epoxi. Las copias de seguridad en papel se queman. Las copias en la nube se caen. Las etiquetas NFC no."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Móvil, tarjeta NFC, escudo y candado representando secretos NFC cifrados"
author: "Nicolo Stanciu"
---

Tu seed phrase probablemente está en un trozo de papel. Quizás en una caja fuerte. Quizás bajo una tabla del suelo. Quizás repartida en tres ubicaciones porque alguien en Reddit dijo que eso es lo que hace la gente "seria" del mundo cripto. Pero sigue siendo papel. El papel se quema. El papel se moja. El papel se pierde.

Llevo años desarrollando NFC.cool, una app para leer y escribir etiquetas NFC, y en algún momento empecé a hacerme una pregunta que no tiene nada que ver con pagos ni tarjetas de acceso: ¿y si tu copia de seguridad no pudiera pudrirse, no pudiera degradarse, y no pareciera nada para quien la encontrara?

Esa pregunta es la razón por la que construí **NFC Safe**. Cifra cualquier texto - seed phrases, contraseñas, códigos de recuperación, lo que necesites mantener en secreto - en una etiqueta NFC con cifrado AES de 256 bits. La etiqueta es autónoma. Sin nube. Sin servidor. Sin cuenta. Para leer el secreto, necesitas la etiqueta física *y* la frase de contraseña. Sin ambas, la etiqueta es solo un pequeño trozo de plástico con algo incomprensible grabado.

Hubo algo en lo que insistí mucho mientras diseñaba esto: no quería que tus secretos dependieran de que mi app siguiera existiendo. Por eso el formato de cifrado está [completamente documentado y abierto](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), incluyendo un decodificador de referencia en Python. Si NFC.cool alguna vez desapareciera, todavía podrías recuperar tus datos con un lector NFC estándar y la especificación. Es una promesa que puedo cumplir porque escribí la especificación para sobrevivir al software.

---

## El problema de guardar secretos

Si me pidieras que identificara el punto débil de todos los métodos de almacenamiento de secretos que he visto, podría hacerlo sin pensar: el papel se quema, los conectores USB se corroen, los servicios en la nube sufren brechas, los monederos hardware solo gestionan seed phrases cripto, y tu cerebro olvida. Cada opción falla a su manera.

Así que trabajé hacia atrás. La copia de seguridad ideal sería físicamente duradera, cifrada, autónoma, redundante y de larga duración. Las etiquetas NFC cumplen las cinco, y eso también me sorprendió al principio. No tienen batería, no tienen partes móviles, y el chip NTAG216 tiene una vida útil de retención de datos de más de 10 años. Las variantes revestidas de epoxi sobreviven al agua, los golpes y décadas de abandono. Si eres nuevo en las diferencias entre estos chips, analicé las ventajas e inconvenientes en [tipos de etiquetas NFC para iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Cómo usar NFC Safe

NFC Safe vive dentro de NFC.cool Tools en NFC Apps. Mantuve todo en una sola pantalla con un control segmentado en la parte superior - Cifrar o Descifrar. Si alguna vez has escrito una etiqueta antes, nada de esto te resultará desconocido.

**Para cifrar:**
1. Abre Tools → NFC Apps → NFC Safe
2. Selecciona **Cifrar**
3. Escribe o pega tu secreto
4. Establece una frase de contraseña fuerte
5. Toca Cifrar; acerca una etiqueta NFC a tu móvil

**Para descifrar:**
1. En la misma pantalla, cambia a **Descifrar**
2. Introduce tu frase de contraseña
3. Acerca una etiqueta previamente cifrada - tu secreto aparece

Bajo el capó, esto es lo que hago en realidad: AES-256-GCM con PBKDF2 (HMAC-SHA-256, 100.000 iteraciones, sal aleatoria de 16 bytes). El resultado se almacena en la etiqueta como un registro NDEF personalizado (`urn:nfc:ext:crypto`). Si quieres verificarlo tú mismo en lugar de creerme a mí, la [especificación completa del formato está en GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). Y si tienes curiosidad por ver primero cómo es una escritura normal sin cifrar, lo explico paso a paso en [cómo escribir etiquetas NFC en iPhone](/blog/write-nfc-tags-iphone/).

---

## La estrategia de redundancia

Así es como yo mismo usaría esto. Una etiqueta NTAG216 cuesta más o menos lo que un café, así que no hay razón para hacer solo una. Compra un puñado, cifra el mismo secreto en cada una y distribúyelas: cajón del escritorio, oficina, casa de un familiar, una caja fuerte bancaria, algún sitio donde solo tú pensarías en buscar. Cada etiqueta por sí sola no significa nada sin la frase de contraseña. Esa es la parte que más me gusta del diseño - es de dos factores por naturaleza: una etiqueta física más una frase de contraseña, guardadas en dos lugares separados, sin ninguna configuración extra de tu parte.

---

## Por qué NFC en lugar de USB o tarjeta SD

La gente me pregunta por qué no simplemente mandé a todo el mundo a usar un pendrive o una tarjeta SD. La respuesta honesta es que he visto demasiados fallar de formas aburridas y evitables. NFC esquiva todos esos problemas:

- **Sin conector** - nada que corroer ni doblar
- **Sin batería** - pasivo, alimentado por el lector
- **Sin sistema de archivos** - nada que corromper
- **Sin driver** - cualquier smartphone lee NFC de forma nativa
- **Pequeño y barato** - del tamaño de una moneda, menos de un dólar en cantidad
- **Duradero** - las variantes de epoxi aguantan agua, golpes y UV

El único límite real es la capacidad: unos 500-700 bytes después del overhead del cifrado. No es mucho, pero es suficiente para lo que esto sirve en realidad - una seed phrase de 24 palabras, una contraseña maestra o un conjunto de códigos de recuperación.

---

## Notas de seguridad

Prefiero ser claro sobre los puntos delicados antes de que los descubras después:

- **Tu frase de contraseña lo es todo.** AES de 256 bits es irrompible. Una frase de contraseña débil no lo es. Usa una cadena generada aleatoriamente de más de 20 caracteres y no hagas concesiones aquí.
- **El alcance del NFC es corto** (~4 cm). Nadie escanea desde el otro lado de la habitación - ese alcance diminuto es una ventaja, no un defecto.
- **Sin borrado remoto.** ¿Perdiste la etiqueta? Destrúyela físicamente. Con unas tijeras vale, y además los datos son inútiles sin la frase de contraseña.
- **Sin recuperación de frase de contraseña.** Si la olvidas, los datos desaparecen. Tomé esa decisión deliberadamente - un camino de recuperación también es un camino de ataque. Anota la frase de contraseña en algún lugar separado de las etiquetas.

---

## El panorama general

Trabajando con NFC cada día, he visto cómo estas etiquetas se han convertido silenciosamente en el medio de almacenamiento de cosas que importan. El Pasaporte Digital de Producto de la UE requerirá NFC para la autenticidad de los productos. Philips las pone en los cabezales de los cepillos de dientes. Los hoteles las usan para las llaves de las habitaciones. Baratas, duraderas y universalmente legibles por el dispositivo que ya llevas en el bolsillo - esa combinación es rara, y es exactamente por eso que sigo encontrándoles nuevos usos. Si quieres una visión más amplia, cubrí lo básico en [etiquetas NFC explicadas: una guía completa para principiantes](/blog/nfc-tags-beginners-guide/).

NFC Safe es mi intento de tomar esa durabilidad y añadirle lo único que le faltaba - cifrado. Una copia de seguridad que dura más que el papel, que no puede ser leída por quien la encuentre, y que cuesta menos que un café. Es el tipo de cosa que yo quería para mí mismo, así que la construí.

Disponible ya en [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-en&mt=8). Próximamente en Android.
