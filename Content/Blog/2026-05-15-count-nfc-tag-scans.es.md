---
id: "count-nfc-tag-scans-2026-05"
title: "Cómo contar los escaneos de una etiqueta NFC sin servidor"
date: "2026-05-15"
tags: ["nfc-tags", "guides"]
summary: "Pon la misma URL en 50 adhesivos NFC y no podrás saber cuál recibió el toque - a menos que la etiqueta se cuente a sí misma. Así es como funciona."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Una etiqueta NFC siendo tocada por un móvil, con un número de recuento de escaneos que aumenta al lado"
author: "Nicolo Stanciu"
metaTitle: "Cómo contar los escaneos de una etiqueta NFC sin servidor"
metaDescription: "Averigua cuántas veces se ha tocado una etiqueta NFC - y cuál es la etiqueta física - usando el contador integrado del chip. Sin backend, sin internet. Una guía práctica."
ogTitle: "Cómo contar los escaneos de una etiqueta NFC sin servidor"
ogDescription: "Tu etiqueta NFC puede contar sus propios escaneos. Así puedes usarlo para hacer seguimiento de interacciones, ediciones limitadas y verificaciones anti-falsificación."
---

Imagina que imprimes la misma URL en cincuenta adhesivos NFC y los pegas en cincuenta productos, cincuenta carteles o cincuenta tarjetas de visita. Una semana después, alguien hace la pregunta obvia: ¿cuál recibió el toque, exactamente? ¿Y cuántas veces?

Llevo años desarrollando NFC.cool, y la respuesta habitual que escucho es un servidor. Generas cincuenta enlaces únicos, los apuntas todos a un backend y dejas que el software de analíticas cuente los accesos. Funciona, pero ahora estás manteniendo infraestructura, pagándola y confiando en que siga funcionando mientras esos adhesivos existan. Siempre me ha parecido mucha maquinaria para una pregunta tan sencilla.

Hay una forma más simple, y ha estado dentro del chip NFC todo este tiempo. Muchas etiquetas pueden contar sus propios escaneos. Con la configuración correcta, una etiqueta te dirá cuántas veces ha sido leída y cuál es la etiqueta física en cuestión, sin ningún backend. Es uno de mis trucos de NFC favoritos para mostrarle a la gente, así que aquí explico cómo funciona y cómo configurarlo.

---

## Qué es realmente un contador de toques NFC

La mayoría de los [adhesivos NFC que puedes comprar](/affiliate-links/) usan chips de la familia NTAG21x - `NTAG213`, `NTAG215` y `NTAG216`. Esos chips tienen una pequeña función que, en mi experiencia, la mayoría de la gente nunca supo que existía: un contador integrado. Cada vez que se lee la etiqueta, el contador sube una unidad. Vive en el hardware del chip, no en una app y no en un servidor. (Si quieres el desglose más detallado de estos chips, los traté en [tipos de etiquetas NFC para iPhone](/blog/nfc-tag-types-for-iphones/).)

La forma en que lo describo es como un cuentakilómetros para la etiqueta. El cuentakilómetros de un coche cuenta los kilómetros independientemente de si alguien lo está mirando; el contador NFC cuenta los lecturas del mismo modo. El número siempre está ahí. La única cuestión es si hay algo configurado para mostrártelo.

Eso es exactamente lo que hace la función Contador de Toques NFC en NFC.cool Tools, y es la parte de la que más me enorgullezco. Configura la etiqueta una vez para que, a partir de ese momento, la etiqueta informe de su propio recuento. No tienes que escanear la etiqueta tú mismo para comprobar el número, y no necesitas que la app esté presente cuando otras personas la tocan. La etiqueta hace el conteo y el reporte por sí sola.

Los mismos chips también llevan un ID de etiqueta único - un número de serie grabado en fábrica, un poco como una dirección MAC en una tarjeta de red. La función Contador de Toques también puede mostrar ese ID, que es lo que te permite distinguir cincuenta adhesivos de aspecto idéntico.

---

## Cómo funciona, sin tecnicismos

Cuando escribes contenido en una etiqueta con el Contador de Toques activado, la app hace algo que me parece genuinamente inteligente. Incrusta una fila de caracteres de marcador de posición en lo que estás escribiendo - un sustituto para el recuento y el ID. Esa parte todavía me parece un poco un truco de magia, incluso después de haberla construido.

A partir de ahí, el chip gestiona el resto. Como dice la pantalla de ayuda dentro de la app: "La app incrusta bytes de marcador de posición en tu contenido. En cada escaneo, el chip los reemplaza por el recuento de toques actual (y/o el ID de la etiqueta) antes de que el iPhone lo lea. Sin servidor ni internet."

Así que la secuencia en cada toque es la siguiente. Alguien acerca su móvil a la etiqueta. El chip se activa, incrementa su contador, intercambia los marcadores de posición por los números reales y solo entonces entrega el contenido final al móvil. El móvil que escaneó la etiqueta nunca ve un marcador de posición - ve una URL completa con un recuento en tiempo real ya integrado.

Lo que quiero que te quedes es que solo haces la configuración una vez. Después de esa primera escritura, la etiqueta se vale por sí sola: contará y sustituirá en cada toque, de cada persona, en cada móvil, durante toda la vida del adhesivo. Nada en esa cadena toca internet. El conteo ocurre en el chip. La sustitución ocurre en el chip. Si apuntas la URL final a un sitio web que controles, tu propio servidor verá llegar el recuento - pero eso es una opción tuya, no un requisito de la función.

---

## Qué puedes hacer con esto en la práctica

Una etiqueta que se cuenta a sí misma suena a truco ingenioso hasta que lo combinas con un problema real. Estos son los cuatro usos a los que vuelvo cuando la gente me pregunta para qué sirve.

**Saber qué adhesivo físico se escaneó.** Este es el problema de los cincuenta adhesivos del inicio de este artículo. Pon la misma URL en todas las etiquetas, activa el ID de etiqueta, y cada toque llega marcado con el número de serie de la etiqueta exacta de la que proviene. Una URL que gestionar, cincuenta etiquetas que aún puedes distinguir.

**Limitar el acceso gratuito.** Como el recuento viaja con cada toque, puedes actuar sobre él. Haz una promoción donde los primeros cien escaneos reciben la versión de demostración y los escaneos posteriores se redirigen a otro sitio. Una tirada limitada puede entregar la recompensa completa hasta que el contador supere un umbral que hayas elegido. La etiqueta aplica el "primero en llegar, primero en ser servido" sin necesidad de un sistema de registro detrás.

**Hacer seguimiento de interacciones.** Pega una etiqueta en una tarjeta de visita, un cartel, una caja de producto o un escaparate, y el contador se convierte en una métrica de interacción discreta. Puedes ver si una tarjeta ha recibido dos toques o doscientos sin montar una infraestructura de analíticas para ello.

**Demostrar autenticidad.** El contador solo sube - no se puede revertir. Un número que solo puede aumentar es difícil de falsificar de forma convincente, por eso creo que tiene su lugar en artículos de edición limitada y verificaciones anti-falsificación. Una etiqueta genuina tiene un historial plausible y creciente; una clonada no. Si ese lado del NFC te interesa, lo desarrollé más en [cómo NFC mantiene secretos cifrados a salvo](/blog/nfc-safe-encrypted-secrets/).

Combina varios de ellos y obtienes algo así: un artesano coloca una etiqueta en cada número de tirada de un producto, todas apuntando a la misma página de destino. El ID de etiqueta le dice qué artículo tiene un comprador en las manos, el recuento le dice con qué frecuencia ha vuelto ese comprador, y como el recuento solo sube, un revendedor no puede hacer pasar disimuladamente una copia por el original. Sin cuentas, sin base de datos, sin factura mensual - solo el chip haciendo su trabajo. Para ese tipo de resultado construí esta función.

---

## Cómo configurarlo, paso a paso

La función vive en NFC.cool Tools, tanto en iPhone como en Android. Forma parte de la suscripción Pro (Platinum), así que la necesitarás para escribir etiquetas con contador activado. Si nunca has escrito en una etiqueta, mi guía sobre [cómo escribir etiquetas NFC en iPhone](/blog/write-nfc-tags-iphone/) cubre primero lo básico.

1. Abre NFC.cool Tools, ve a la sección **NFC Tools** y toca **NFC Tap Counter**.
2. Elige qué debe entregar la etiqueta: una **URL**, un **Email**, un **SMS** o un **Atajo**. (El Atajo es solo para iOS, ya que Shortcuts es una app de Apple; URL, Email y SMS funcionan en ambas plataformas.)
3. Compón ese contenido como lo harías normalmente - escribe el enlace, redacta el mensaje, elige el atajo.
4. Activa las opciones que quieras: **NFC Tap Counter** añade el recuento en tiempo real, y **NFC Tag ID** añade el número de serie de la etiqueta. Puedes usar cualquiera, o ambas.
5. Si estás programando un lote de etiquetas con el mismo contenido, activa **Escritura en lote** para que el escáner permanezca abierto y puedas escribir una etiqueta tras otra.
6. Comprueba la **Vista previa**. Muestra un ejemplo del resultado con valores de muestra, para que veas exactamente dónde quedarán el recuento y el ID antes de confirmar.
7. Toca **Escribir en la etiqueta NFC** y acerca una etiqueta a la parte superior de tu móvil.

Esa es toda la configuración, y deliberadamente la he mantenido así de breve. A partir de ese punto la etiqueta es autosuficiente - cuenta e informa por sí sola, para cada persona que la toca, con o sin la app.

Si alguna vez quieres detenerlo, la app puede desactivar el contador en una etiqueta existente. El chip deja de intercambiar valores en tiempo real, pero el contenido permanece en la etiqueta exactamente como se escribió por última vez. Un detalle que conviene saber: el chip sigue contando internamente incluso después de desactivar la sustitución - el recuento nunca se pierde, simplemente deja de mostrarse.

---

## Dónde aparecen el recuento y el ID de etiqueta

El lugar donde quedan los valores depende del tipo de contenido que hayas elegido. Con ambas opciones activadas, el ID de etiqueta y el recuento se insertan juntos - primero el ID, luego el recuento, unidos por una pequeña `x`. Usando `049F50824F1390` como ID de etiqueta y `000007` como recuento, este es el antes y el después para cada tipo:

- **URL:** `https://example.com/page` se convierte en `https://example.com/page?nfc=049F50824F1390x000007`
- **Cuerpo del email:** `Hi, here's my card.` se convierte en `Hi, here's my card. 049F50824F1390x000007`
- **Cuerpo del SMS:** `Order confirmed!` se convierte en `Order confirmed! 049F50824F1390x000007`
- **Entrada del atajo:** `log-entry` se convierte en `log-entry 049F50824F1390x000007`

Los valores se añaden limpiamente, así que el resto de tu contenido sigue funcionando con normalidad. Desactiva una opción y simplemente tendrás la otra sola: solo el recuento (`000007`) o solo el ID de etiqueta (`049F50824F1390`).

Ahora, la pregunta que me hacen siempre aquí: ¿por qué `000007` y no simplemente `7`? El recuento se escribe en hexadecimal - el sistema numérico de base 16 que va del 0 al 9 y luego de la A a la F - y se rellena hasta seis caracteres. Así que `000007` es simplemente el séptimo escaneo de la etiqueta. Una vez que superas el escaneo nueve empiezas a ver letras: `00000A` es 10. El límite máximo es `FFFFFF`, que son aproximadamente 16 millones de escaneos, más margen del que casi cualquier etiqueta del mundo real necesitará jamás. El ID de etiqueta es una cadena hexadecimal más larga - el número de serie de fábrica de 7 bytes del chip - y, a diferencia del recuento, nunca cambia.

Si estás enrutando la URL final a tu propio sitio web, tu servidor lee esos valores directamente de la dirección: registra el recuento, compáralo con un umbral, o distingue una etiqueta de otra por su ID.

---

## Qué etiquetas necesitas

Esta función depende del chip, así que la etiqueta importa. NFC.cool admite los chips `NTAG213`, `NTAG215` y `NTAG216` para el Contador de Toques. Son los adhesivos NFC más comunes que se venden para móviles, así que son fáciles de encontrar, pero aun así comprobaría el tipo de chip antes de comprar en cantidad. Si intentas usar una etiqueta que la función no admite, la app te avisa en lugar de escribir algo que no funcionará - me aseguré de eso porque he visto lo frustrante que es un fallo silencioso.

Si necesitas abastecerte, nuestra página de [etiquetas NFC recomendadas](/affiliate-links/) lista los adhesivos `NTAG216` que usamos y con los que probamos. Y si estás empezando a elegir etiquetas, mi guía sobre [los diferentes tipos de etiquetas NFC para iPhone](/blog/nfc-tag-types-for-iphones/) explica las diferencias en términos sencillos.

---

## Algunas preguntas rápidas

**¿Puedo resetear el contador?** No. Es un contador unidireccional integrado en el chip y solo puede subir. Eso es deliberado y, honestamente, es todo el punto - un contador que se pudiese resetear sería inútil para ediciones limitadas o verificaciones anti-falsificación. Si necesitas un recuento nuevo, usa una etiqueta nueva.

**¿Cualquiera puede leer el recuento, o solo yo?** Cualquiera. Cada móvil que toca la etiqueta recibe el contenido final con el recuento ya incluido, con o sin la app instalada. Ese es el punto - la etiqueta informa por sí sola.

**¿Puedo desactivarlo más tarde?** Sí. La app puede hacer que el chip deje de sustituir los marcadores de posición. La URL o el mensaje permanecen en la etiqueta; solo se detienen las actualizaciones en tiempo real. El chip sigue contando internamente.

**¿Es privado el contador?** El recuento vive en la etiqueta, no en un servidor. Cualquiera que toque la etiqueta ve el recuento en el contenido, y si ese contenido apunta a un servidor que controles, solo ese servidor lo ve. El ID de etiqueta es un número de serie de fábrica, no información de identificación personal.

**¿Necesita internet?** No. El conteo y la sustitución ocurren dentro del chip. Internet solo entra en juego si la URL que escribiste apunta a un sitio web.

---

## Pruébalo

Durante la mayor parte de los años que llevo trabajando con NFC, contar toques significaba enlaces únicos y un backend para totalizarlos. El contador del NTAG21x elimina silenciosamente ese requisito: la etiqueta mantiene su propio recuento, y la función Contador de Toques NFC en NFC.cool Tools es lo que lo activa. Es una de esas funciones que sigo deseando que más gente supiera que es posible.

¿Quieres verlo funcionar antes de escribir en una sola etiqueta? Nuestra [demo en vivo del contador de toques](/tap-counter/) es una página que hace exactamente lo que describe este artículo - escribe una etiqueta que apunte a ella, dale un toque, y la página te muestra el recuento de escaneos y el ID de etiqueta que el chip acaba de entregarte. Sin servidor de por medio, solo la URL.

Está disponible ahora en NFC.cool Tools, en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-en&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-en). Para ver el conjunto completo de herramientas NFC que he construido, echa un vistazo a la [función de lector y escritor NFC](/features/nfc-reader-writer/).
