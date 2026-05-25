---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "Procesa los datos del contador de toques NFC con Atajos de iOS"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Atajos de iOS listos para usar que procesan el ID de etiqueta y el recuento de lecturas del contador de toques NFC - un parser reutilizable y una demo de alerta de etiqueta que lo usa."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "Un iPhone mostrando una alerta con un ID de etiqueta y un recuento de lecturas después de tocar un adhesivo NFC"
author: "Nicolo Stanciu"
metaTitle: "Procesa los datos del contador de toques NFC con Atajos de iOS"
metaDescription: "Un atajo de iOS reutilizable que procesa las cargas del contador de toques NFC (ID de etiqueta + recuento de lecturas), más una demo de alerta de etiqueta. Enlaces de iCloud listos para usar, sin configuración."
ogTitle: "Procesa los datos del contador de toques NFC con Atajos de iOS"
ogDescription: "Atajos de iOS listos para usar para el contador de toques NFC: un parser reutilizable y una demo de alerta de etiqueta."
---

Hace una semana [expliqué paso a paso cómo funciona el contador de toques NFC](/blog/count-nfc-tag-scans/): el chip cuenta sus propias lecturas, la app inserta bytes de marcador de posición, y la etiqueta sustituye el recuento en vivo y el ID de etiqueta en lo que transporta en cada toque. Ese artículo termina donde termina la etiqueta, es decir, en el momento en que los valores llegan a tu móvil.

La pregunta que me han estado haciendo desde entonces es la siguiente obvia: "genial, la etiqueta me está entregando `049F50824F1390x000007` - ¿y ahora qué?" Si estás en iPhone y quieres actuar sobre esos valores dentro de un atajo, tienes que procesarlos. Es un trabajo de manipulación de cadenas pequeño pero tedioso, y prefiero que no tengas que escribirlo tú.

Así que construí dos atajos y los comparto como enlaces de iCloud. Uno es el cerebro. El otro es una demo que usa el cerebro.

---

## Lo que la etiqueta te entrega

Antes de los atajos: un repaso rápido de lo que reciben en realidad, porque importa para cómo los usas.

En la pantalla de configuración del contador de toques eliges un tipo de contenido para la etiqueta: URL, correo, SMS o atajo. Cuando activas las opciones de contador de toques y/o ID de etiqueta, la app inserta bytes de marcador de posición dentro de ese contenido, y el chip los intercambia por los valores en vivo en cada lectura. Usando `049F50824F1390` como ID de etiqueta y `000007` como recuento, los cuatro tipos de contenido quedan así:

- **URL:** `https://nfc.cool/tap-counter/` se convierte en [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **Cuerpo del correo:** `Hi, here's my card.` se convierte en `Hi, here's my card. 049F50824F1390x000007`
- **Cuerpo del SMS:** `Order confirmed!` se convierte en `Order confirmed! 049F50824F1390x000007`
- **Entrada del atajo:** `log-entry` se convierte en `log-entry 049F50824F1390x000007`

Esa URL de arriba es real. Nuestra [página de prueba en vivo del contador de toques](/tap-counter/) está configurada para leer el valor `?nfc=` directamente de su propia barra de direcciones, así que si quieres ver la sustitución antes de escribir tu propia automatización, graba una etiqueta apuntando a `https://nfc.cool/tap-counter/` con ambas opciones activadas, tócala y la página te mostrará el ID de etiqueta y el recuento que acaba de recibir.

Cuando el tipo de contenido es **Atajo**, NFC.cool ejecuta el atajo elegido mediante `shortcuts://run-shortcut?name=Your%20Shortcut&input=text&text=<payload>`, con los valores NFC ya añadidos en el texto. La entrada de tu atajo es una cadena de texto simple. Tu único trabajo es extraer de ella el ID de etiqueta y el recuento.

Dependiendo de qué opciones estaban activas cuando grabaste la etiqueta, puedes obtener el patrón completo (14 caracteres hexadecimales, una `x` y luego 6 caracteres hexadecimales), o solo el ID de etiqueta de 14 hexadecimales, o solo el recuento de 6 hexadecimales. El parser maneja los tres casos.

---

## Parse NFC Tap Counter - el parser reutilizable

[Instalar Parse NFC Tap Counter](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Este es el cerebro. No tiene interfaz, recibe una sola entrada de texto y devuelve un Dictionary. Eso es deliberado: un atajo de utilidad sin interfaz se compone limpiamente dentro de cualquier otra cosa que construyas, y un Dictionary es lo más fácil de consumir desde otro atajo con la acción **Get Dictionary Value**.

Esto es lo que contiene el Dictionary:

- `tagID` - el ID de etiqueta hexadecimal de 14 caracteres, o una cadena vacía si la opción estaba desactivada.
- `count` - el recuento de lecturas como número decimal (así `000007` sale como `7`, y `00000A` como `10`), o vacío si la opción estaba desactivada.
- `countHex` - el recuento hexadecimal original de 6 caracteres, en caso de que quieras usarlo tal cual. Vacío si no está presente.
- `hasTagID`, `hasCount` - booleanos para ramificación, para que puedas escribir **If hasCount is true** sin tener que comprobar la cadena tú mismo.
- `content` - la entrada con la carga NFC eliminada limpiamente, para que el resto de tu atajo vea la entrada tal como estaba antes de que la etiqueta la modificara. Si la entrada era una URL con `?nfc=...`, obtienes la URL de vuelta sin eso. Si era un cuerpo de correo con el ID de etiqueta añadido, obtienes el cuerpo de vuelta sin eso.
- `raw` - la entrada original sin modificar, por si quieres registrarla o recurrir a ella.

Para llamarlo desde tu propio atajo, la receta son tres acciones:

1. **Receive Shortcut Input** como texto (la carga NFC llega aquí).
2. **Run Shortcut** -> Parse NFC Tap Counter, con ese texto como entrada. Desactiva "Show When Run" para que permanezca invisible.
3. **Get Dictionary Value** -> elige `tagID`, `count`, `content`, o las claves que te interesen.

Eso es todo. A partir del paso 3 puedes hacer lo que quieras con los valores: ramificar sobre `hasTagID`, registrar `count` en una Nota, disparar un webhook con el JSON, lo que sea. El parser no asume qué quiere hacer tu atajo con el resultado, que es exactamente por qué es pequeño y reutilizable.

Una nota sobre el recuento: es un Number real en el Dictionary, no una cadena de texto, así que puedes introducirlo directamente en un **Calculate** o en una comparación **If** sin volver a convertirlo. El paso de hexadecimal a decimal ya está hecho.

---

## NFC Tag Alert - la demo

[Instalar NFC Tag Alert](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Esta es una demo que yo mismo instalaría el primer día, aunque no tengas intención de usar alertas en producción. Recibe una entrada de texto de atajo, ejecuta el parser y muestra una sola alerta titulada **NFC Tag Scanned** con dos líneas:

```
Tag ID: 049F50824F1390
Scans: 7
```

La razón por la que la instalaría primero es que es la comprobación de cordura más rápida posible para una etiqueta con el contador activado. Graba una etiqueta desde NFC.cool Tools con el tipo de contenido **Atajo** y el nombre **NFC Tag Alert**, activa las opciones de contador de toques e ID de etiqueta, grábala, tócala. Aparece una alerta con los valores reales de tu etiqueta física.

Si la alerta muestra los valores que esperabas, tu etiqueta está haciendo su trabajo y puedes pasar a construir algo más elaborado. Si el recuento es incorrecto o falta el ID de etiqueta, sabes que el problema está en la etiqueta (o en las opciones que elegiste al grabarla) y no en tu propio atajo. Eliminar toda una clase de depuración del tipo "¿es esto culpa del chip?" justifica instalar un atajo de cinco acciones.

Si alguna vez te preguntas cómo llamar al parser correctamente, este atajo es también el ejemplo práctico más pequeño posible. Ábrelo, mira las cinco acciones, copia la estructura en tu propio atajo.

---

## Integrándolo en tu propio atajo

Hay dos formas de enrutar el contenido de la etiqueta hacia tu atajo. El parser funciona bien con ambas.

**Guiado por la etiqueta (la carga del atajo).** Graba la etiqueta con el tipo de contenido **Atajo**, elige tu atajo por nombre, activa las opciones que quieras. A partir de ahí, cada toque lanza tu atajo con la carga NFC ya en la entrada. Dentro de tu atajo, llama a Parse NFC Tap Counter sobre esa entrada y tendrás `tagID` / `count` listos para usar.

**Guiado por URL (la carga de la URL).** Este es el caso más común. La etiqueta lleva una URL, tu móvil abre esa URL al tocarla, y el recuento viaja junto como `?nfc=...`. Si quieres que un atajo gestione el toque en lugar de (o junto con) un navegador, puedes: enruta la URL a través de un atajo que acepte una entrada de página web de Safari, luego ejecuta Parse NFC Tap Counter sobre la URL. El parser elimina el segmento `?nfc=` limpiamente y te devuelve la URL sin él como `content`, para que puedas pasarla a un navegador, a una llamada a una API, o a cualquier otro lugar que espere una URL normal.

Aquí tienes un ejemplo de cuatro acciones para "registrar cada lectura en una nota de Notas de Apple":

1. **Receive Shortcut Input** como texto.
2. **Run Shortcut** -> Parse NFC Tap Counter, con la entrada como texto.
3. **Get Dictionary Value** -> tres consultas seguidas para `tagID`, `count` y `content`. Guarda cada una en una variable.
4. **Append to Note** -> una sola línea como `[Current Date] tag=<tagID> count=<count> url=<content>`.

Ahora tienes un registro de toques continuo escrito por la propia etiqueta. Sin backend, sin analíticas de terceros, sin cuentas en ningún sitio.

---

## Algunas ideas para desarrollar

Un puñado de cosas pequeñas que el parser desbloquea, escritas para que no tengas que inventarlas desde cero:

- **Ramificar según el ID de etiqueta.** Un atajo, muchas etiquetas. Añade una acción **If** por cada ID de etiqueta conocido: si se leyó la etiqueta de la puerta de la oficina, silencia las notificaciones; si se leyó la del estudio, activa un modo de concentración; si se leyó la de la cocina, inicia un temporizador. El ID de etiqueta identifica la etiqueta física, no el contenido, así que puedes dar la misma URL a todas las etiquetas y aun así reaccionar a cada una individualmente.
- **Elegir un ganador en la lectura N.** Combina `hasCount` con una comparación. Si `count` es igual a 100, dispara un mensaje de confirmación; para el resto de lecturas, haz el tratamiento normal. El chip impone el orden; tu atajo simplemente lo lee.
- **Enviar a un webhook.** Combina esto con la [función de Webhooks de NFC.cool](/features/webhooks/) si quieres procesamiento en el servidor sin escribir una app iOS: envía los valores procesados como JSON y deja que el servidor lo gestione desde ahí. Dos acciones en iOS y tu etiqueta está conectada a cualquier cosa que hable HTTP.
- **Registrar en un archivo o Nota.** La más simple y sorprendentemente útil. Añade `timestamp, tagID, count` a un archivo continuo en iCloud Drive o a una única Nota, y tendrás un registro de toques que puedes revisar o graficar más adelante. Ideal para hacer seguimiento de interacciones en una sola etiqueta sin montar infraestructura.

Si construyes algo interesante con estos, me encantaría verlo.

---

## Un agradecimiento rápido

Ambos atajos se construyeron con [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin), el plugin de Federico Viticci para generar Atajos de iOS desde lenguaje natural. Es una herramienta genial, y quiero agradecerle que lo haya publicado - sin él, estos dos me habrían llevado mucho más tiempo de armar.

---

## Una nota rápida para Android

Atajos es una app de Apple, así que estos dos solo funcionan en iPhone. La función del contador de toques en sí funciona en ambas plataformas, porque la sustitución ocurre dentro del chip y no le importa qué móvil está leyendo la etiqueta. En Android, los tipos de carga URL, correo y SMS se comportan igual que en iOS; si quieres automatizaciones similares ahí, apps como Tasker o MacroDroid pueden coger una URL con `?nfc=...` y extraer los valores con sus propias acciones de manipulación de cadenas. El formato en el cable es el mismo.

---

## Pruébalo

Si quieres la explicación más detallada de cómo funciona realmente la función del contador de toques por dentro, está en el [artículo anterior](/blog/count-nfc-tag-scans/). Y si quieres ver una etiqueta con el contador activado en acción sin configurar primero tu propia automatización, nuestra [página de demo en vivo del contador de toques](/tap-counter/) lee el valor `?nfc=` directamente de su propia URL: graba una etiqueta que apunte ahí, tócala, observa cómo aparecen el recuento y el ID de etiqueta.

La función del contador de toques NFC está en NFC.cool Tools, en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-en&mt=8) y en [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-en). Para el conjunto completo de herramientas que he construido en torno al NFC, echa un vistazo a la [función de lector y escritor NFC](/features/nfc-reader-writer/).
