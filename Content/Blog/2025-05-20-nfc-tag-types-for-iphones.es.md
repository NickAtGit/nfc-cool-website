---
id: "nfc-tag-types-2025-05"
title: "Los diferentes tipos de etiquetas NFC - y cuáles funcionan con iPhones"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Del Tipo 1 al Tipo 5, quién las fabrica y por qué la serie NTAG (Tipo 2) es la apuesta más segura para proyectos con iPhone."
metaDescription: "Los tipos de tags NFC explicados - del Tipo 1 al Tipo 5, quién fabrica los chips y por qué la serie NTAG (Tipo 2) es la opción más segura y compatible para proyectos con iPhone."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Tipos de etiquetas NFC alineadas junto a un iPhone"
---

Las etiquetas NFC son pequeños circuitos integrados que almacenan información que cualquier dispositivo con NFC, como tu móvil, puede leer. Pero hay algo que ojalá alguien me hubiera dicho antes: no todas las etiquetas NFC son iguales. Existe todo un zoo de tipos de distintos fabricantes, cada uno con sus peculiaridades, y eso hace que elegir la correcta para tu iPhone sea sorprendentemente complicado.

Llevo años desarrollando NFC.cool, una app para leer y escribir etiquetas NFC, y "¿qué etiqueta debo comprar para mi iPhone?" es fácilmente una de las preguntas que más me hacen. Así que esta es la respuesta que doy. Voy a repasar los cinco tipos de etiquetas NFC, quién las fabrica de verdad, y por qué una de ellas es la apuesta segura para casi cualquier proyecto con iPhone. Si eres totalmente nuevo en esto, puede que quieras empezar por mi [guía completa para principiantes sobre etiquetas NFC](/blog/nfc-tags-beginners-guide/) primero - este artículo va una capa más profundo.

---

## Entender los tipos de etiquetas NFC

Las etiquetas NFC se dividen en cinco tipos: Tipo 1, Tipo 2, Tipo 3, Tipo 4 y Tipo 5. Esa clasificación no es algo que se inventaron los fabricantes - viene del NFC Forum, el consorcio de la industria que establece los estándares. Cada tipo tiene su propia capacidad de memoria y velocidad, y puede ser de lectura-escritura o de solo lectura.

Esa es la lente que uso siempre que miro la ficha técnica de una etiqueta, así que déjame repasarlos uno a uno.

---

## Tipo 1 y 2 - Topaz y MIFARE Ultralight®

El Tipo 1 (Topaz, de Broadcom) y el Tipo 2 (MIFARE Ultralight®, de [NXP Semiconductors](https://nxp.com)) son el extremo barato y asequible del espectro. Se adaptan bien a aplicaciones sencillas como carteles y tarjetas de visita. Su capacidad de memoria es pequeña (de 48 bytes a unos 2 KB), pero en mi experiencia eso es más que suficiente para una URL o un texto corto, que es lo que la mayoría de la gente realmente quiere.

---

## Tipo 3 - FeliCa™

Las etiquetas de Tipo 3, también conocidas como FeliCa™, fueron desarrolladas por Sony. Las verás sobre todo en Asia, alimentando billetes de transporte público y dinero electrónico. Ofrecen mayor velocidad y memoria (hasta 1 MB), pero su uso es bastante limitado porque cuestan más y están ligadas a aplicaciones específicas de cada región. Yo rara vez recurro a ellas fuera de ese contexto.

---

## Tipo 4 - MIFARE DESFire®

Las etiquetas MIFARE DESFire®, también de NXP Semiconductors, son de Tipo 4. Son la opción de alta seguridad y alta capacidad, diseñada para tareas complejas como el control de acceso seguro y los sistemas de transporte público. Pueden almacenar hasta 8 KB. Cuando un proyecto necesita de verdad protección criptográfica, es en esta familia donde miro - profundicé en el lado de la seguridad en mi artículo sobre [mantener secretos seguros en etiquetas NFC cifradas](/blog/nfc-safe-encrypted-secrets/).

---

## Tipo 5 - ISO 15693

Las etiquetas de Tipo 5 cumplen el estándar ISO 15693 y son relativamente nuevas en el ecosistema NFC. Son sobre todo una historia industrial, y su característica destacada es un alcance de lectura extendido comparado con los otros tipos. Útiles si estás controlando inventario en un almacén, menos útiles para la etiqueta pegada en la nevera.

---

## ¿Qué etiquetas NFC deberías elegir para tu iPhone?

Aquí está la parte que más importa. Los iPhones a partir del iPhone 7 son compatibles con NFC de Tipo 1, 2 y 5, pero ofrecen el mejor soporte para el Tipo 2. Las etiquetas NFC de Tipo 2 son la [serie NTAG](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) de NXP Semiconductors.

Los modelos NTAG213, NTAG215 y NTAG216 son los más populares de esa serie, y funcionan de maravilla con iPhones - es contra lo que hago pruebas día tras día. Te dan suficiente memoria (de 144 a 888 bytes) para la mayoría de proyectos prácticos, son totalmente escribibles y legibles por cualquier iPhone con NFC, y son reescribibles, así que puedes cambiar su contenido las veces que quieras.

Una nota práctica que me ha ahorrado mucha frustración: cuanto más grande sea la etiqueta y su antena, más fiable será la lectura por un lector NFC. Yo evitaría las pegatinas extremadamente baratas y endebles si la fiabilidad es importante para tu proyecto - los pocos céntimos que ahorras no compensan una etiqueta que solo lee al tercer toque.

Lo principal que hacen los iPhones con NFC es leer mensajes en formato NFC Data Exchange Format (NDEF) - URLs, texto plano o vCards (tarjetas de visita digitales). Cualquier etiqueta que soporte NDEF, y la mayoría de las etiquetas de la serie NTAG lo hacen, es una elección sólida para usuarios de iPhone. Cuando estés listo para poner datos en una, escribí una guía paso a paso sobre [cómo escribir etiquetas NFC en iPhone](/blog/write-nfc-tags-iphone/).

---

## Resumen

Si estás buscando etiquetas NFC para usar con tu iPhone, mi recomendación honesta es sencilla: etiquetas de Tipo 2 de la serie NTAG de NXP Semiconductors. Son económicas y te dan la mejor compatibilidad y funcionalidad para lo que la mayoría de la gente realmente quiere hacer con NFC en iPhones. Compra un paquete de pegatinas NTAG215 y estarás preparado para casi cualquier cosa.

El NFC sigue evolucionando, así que vale la pena estar atento a los nuevos desarrollos y las especificaciones de las etiquetas. Para saber más, mira mi artículo anterior sobre [aprovechar la magia del NFC en iPhones](/blog/nfc-on-iphones-insider-look/), y si solo quieres ver qué hay ya en una etiqueta, puedes [leer etiquetas NFC directamente desde tu navegador](/online-nfc-reader/).

¡Feliz etiquetado!
