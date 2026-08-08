---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: las etiquetas NFC que demuestran que no son falsas"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Oí que las marcas de lujo usan etiquetas NTAG 424 DNA para demostrar que un producto es auténtico, así que compré un lote en AliExpress para ver qué hacen en realidad. Resultaron ser el Contador de Toques NFC con una capa criptográfica añadida, y NFC.cool Tools ahora las lee, las verifica y las configura por completo en iPhone y Android - cada clave, los permisos de cada archivo y los propios ajustes del chip."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Un bolso de piel con una etiqueta de autenticación NFC junto a un iPhone que muestra un escudo de seguridad e iconos de llave"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: la etiqueta NFC anti-falsificación explicada"
metaDescription: "Compré etiquetas NTAG 424 DNA para ver cómo las marcas demuestran que un producto es auténtico. Así funcionan estas etiquetas NFC anti-falsificación, y así las lee, verifica y programa NFC.cool."
ogTitle: "Las etiquetas NFC que demuestran que no son falsas"
ogDescription: "Cómo las etiquetas NTAG 424 DNA pillan clones, y cómo NFC.cool las lee, verifica y configura en iPhone y Android."
---

Hace un tiempo no dejaba de leer la misma afirmación de pasada: las marcas de lujo están poniendo chips NFC en sus productos para que puedas acercar el móvil a un bolso o a una botella y saber que es auténtico, no una falsificación. Cada artículo repetía la misma frase reluciente y ninguno decía *cómo*. ¿Qué es lo que de verdad impide que un falsificador copie el chip junto con el bolso?

Así que hice lo que siempre hago cuando me pica la curiosidad por una etiqueta. Entré en AliExpress, encontré un anuncio de etiquetas "NTAG 424 DNA", pedí un lote pequeño y esperé a que llegara el sobre. Unos pocos euros, un par de semanas, y tenía sobre mi escritorio el mismo silicio sobre el que están construidos esos sistemas de protección de marca. Luego acerqué el móvil a una para ver qué hace.

## Qué es en realidad una etiqueta NTAG 424 DNA

Por fuera es una etiqueta NFC corriente. No podrías distinguirla de un montón de etiquetas baratas, y cualquier móvil la lee sin quejarse. Si has leído mi [guía sobre los tipos de etiquetas NFC](/blog/nfc-tag-types-for-iphones/), encaja como una etiqueta Type 4 más que tu iPhone lee encantado.

La parte del "DNA" es lo que marca la diferencia. Dentro, el chip guarda unas cuantas claves AES-128 y un pequeño motor criptográfico, y puede hacer algo que ninguna NTAG215 corriente ni ningún adhesivo de un pack múltiple puede hacer: puede *firmar* cada toque. Esa firma lo es todo. Es la diferencia entre una etiqueta que dice "aquí tienes un enlace" y una etiqueta que dice "aquí tienes un enlace, y aquí tienes la prueba criptográfica de que yo, este chip auténtico en concreto, soy quien lo está sirviendo, ahora mismo".

Eso es lo que las marcas de lujo están pagando en realidad - no el enlace, sino la prueba de que es un chip auténtico quien lo sirve.

## Cómo funcionan SUN y SDM: un enlace que se reescribe a sí mismo en cada toque

Y aquí fue donde todo encajó de golpe. Cuando miré lo que la etiqueta estaba enviando en realidad, me di cuenta de que ya había construido la mayor parte de la maquinaria para entenderlo.

A principios de este año lancé una [función de Contador de Toques NFC](/blog/count-nfc-tag-scans/): una etiqueta que cuenta cuántas veces ha sido leída y pone ese número en la URL, de modo que un enlace puede saber que es la vez número 47 que alguien la escanea. Una etiqueta NTAG 424 DNA es esa misma idea, pero envuelta en una capa de cifrado que la hace imposible de falsificar.

El mecanismo se llama **SUN** (Secure Unique NFC), o **SDM** (Secure Dynamic Messaging) si estás leyendo [la hoja de datos de NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Guardas un enlace normal en la etiqueta, algo como `https://example.com`. Pero le dices al chip que reescriba partes de ese enlace sobre la marcha cada vez que se toca. Así que lo que tu móvil recibe en realidad se parece más a:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Esos dos valores no son decoración. `picc_data` es una copia cifrada del ID real de la etiqueta más un contador de toques, revuelto con una clave que nunca sale del chip. `cmac` es una firma criptográfica sobre esos datos. Ambos cambian en cada toque. Acerca el móvil a la misma etiqueta dos veces y obtendrás dos URLs completamente distintas, cada una firmada de nuevo por el chip.

Yo pienso en una etiqueta NFC corriente como en un cartel impreso en el escaparate de una tienda. Cualquiera puede fotografiarlo e imprimir una copia idéntica. Una etiqueta SUN se parece más a un guardia de seguridad que te entrega un recibo nuevo, numerado y sellado individualmente, cada vez que entras. Copiar el recibo de ayer no te sirve de nada, porque el número de hoy es distinto y solo el sello del guardia es auténtico.

## Por qué una etiqueta NTAG 424 DNA clonada acaba pillada

Esta es la parte que responde a mi pregunta original. Un falsificador puede clonar sin ningún problema el *contenido* de una etiqueta. Puede leer la URL, copiarla byte a byte y grabarla en un chip en blanco. Eso siempre ha sido así, y es la razón por la que "ponle simplemente un código QR" nunca demuestra nada en realidad.

Lo que no puede hacer es producir la siguiente firma válida. La clave de firma vive dentro del chip auténtico y nunca sale, ni siquiera durante un toque. Eso significa que un toque solo vale algo para quien de verdad tiene la clave. En un montaje real de protección de marca, el enlace de la etiqueta apunta a un servidor que gestiona el fabricante, y ese servidor es lo que descifra cada toque, recalcula la firma para confirmar que la clave coincide y lleva la cuenta del contador a medida que sube.

Esa última parte es lo que pilla a un clon. La única URL que un falsificador puede poner en una copia es una que capturó de un toque auténtico, congelada con el contador que ese toque llevaba en ese momento. Reprodúcela y el servidor está mirando un número que ya ha visto, y el contador de un chip real solo avanza, así que una repetición o un paso atrás delatan la reproducción. Para enviar un contador nuevo y más alto con una firma que aun así cuadre, necesitarían la clave, y para conseguir la clave necesitarían romper AES o abrir físicamente el chip. Ninguna de las dos cosas va a ocurrir por un bolso falso.

Esa es la versión honesta de la frase de marketing. El chip no hace que el *producto* sea imposible de copiar. Hace que la *prueba de autenticidad* sea imposible de copiar, y traslada esa prueba a algo que el falsificador no puede reproducir.

## Cómo verifica NFC.cool que una etiqueta es auténtica

Una vez que entendí las etiquetas, quería que la app hiciera todo el proceso como es debido, no solo mostrar un volcado hexadecimal. Así que NFC.cool Tools ahora tiene un manejo completo de NTAG 424 DNA en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-es&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-es), y comprueba la autenticidad de dos formas independientes, más una tercera, física, en las etiquetas hechas para ello.

**El origen del chip.** Cada chip NXP auténtico lleva una firma de fábrica sobre su propio ID, firmada con la clave privada de NXP. NFC.cool lee esa firma y la verifica contra la clave pública de NXP, directamente en el móvil. Si cuadra, obtienes un simple resultado de "NXP Auténtico". Este no necesita ninguna configuración ni ninguna clave por tu parte. Responde a "¿es esto silicio NXP real, o un clon sin nombre?".

**El toque en sí.** Esta es la comprobación SUN. NFC.cool descifra el `picc_data`, extrae el ID de la etiqueta y el contador de toques, recalcula la firma y la compara con el `cmac` que envió la etiqueta. Si coinciden, el toque es auténtico y reciente, y ves "Auténtico". Este demuestra más, así que pide más: necesita la clave de la etiqueta. Una etiqueta recién estrenada, todavía con su valor de fábrica, se verifica sin que tengas que introducir nada. Una etiqueta que alguien bloqueó con su propia clave solo se verifica como auténtica si tienes esa clave guardada.

**El sello físico, en las etiquetas hechas para ello.** Una versión de estas, la NTAG 424 DNA TagTamper, está hecha para ser un sello a prueba de manipulaciones. Es un adhesivo con un fino cable extra que lo recorre, y lo pegas cruzando lo que quieras proteger, sobre la solapa de una caja o alrededor del tapón de una botella, el mismo trabajo que hacen hoy esos adhesivos de "garantía anulada si se rompe". Abre el artículo y rasgas el adhesivo, lo que corta el cable. NFC.cool comprueba ese cable en un toque y te dice claramente si el sello sigue intacto o se ha roto. Lo bonito es que es un pestillo de un solo sentido: córtalo una vez y el chip lo recuerda para siempre, así que algo que se abrió y luego se volvió a sellar con cuidado sigue leyéndose como abierto. La criptografía demuestra que el chip es auténtico; esto demuestra que nadie ha entrado en la caja.

Todo esto es gratis para todo el mundo. Leer una etiqueta - su enlace, su contador de toques, la disposición de sus archivos, si su sello sigue intacto - y ejecutar ambas comprobaciones criptográficas no cuesta nada. Quería que la pregunta "¿es real esto?" pudiera responderla cualquiera que acerque el móvil a una.

## Programar tus propias etiquetas seguras

Leer es la mitad. La otra mitad es que esas etiquetas en blanco de AliExpress son tuyas para programarlas, y NFC.cool lo hace a través de un canal autenticado y cifrado como es debido, la misma mensajería segura que el chip exige, no una escritura en crudo hecha a la buena de Dios.

En su versión más sencilla, son tres pasos. Escribe tu propio enlace, que es gratis. Activa SUN para que la etiqueta empiece a firmar cada toque. Y reemplaza la clave de fábrica por la tuya, definida como una frase de contraseña para que no haya que lidiar con una cadena hexadecimal de 32 caracteres, guardada en tu llavero. A partir de ese momento la etiqueta queda bloqueada a tu nombre: sigue demostrando que es auténtica a cualquiera que la toque, pero solo tú puedes reprogramarla.

Ahí es donde podría haberme detenido. Las pocas apps que siquiera se acercan a estas etiquetas se detienen ahí. Yo no.

## Configura el chip NTAG 424 DNA completo desde tu iPhone o Android

En algún punto de una semana de noches en vela con estas etiquetas, tomé una decisión: NFC.cool Tools iba a cubrir el 100% de la especificación de NTAG 424 DNA, no la parte cómoda para las demos en la que se detiene cada tutorial de "toca para verificar". Si quiero que esta sea la mejor app NFC que existe, entonces "admitimos NTAG 424 DNA" no puede significar, en el fondo, "admitimos la única clave y el único modo que eran fáciles". Así que me metí en la hoja de datos y construí el resto.

Un chip NTAG 424 DNA no tiene una clave. Tiene cinco. NFC.cool ahora las gestiona todas - cambia cualquier ranura, restablécela a fábrica, o introduce una clave que definiste en otro dispositivo para que este móvil también pueda manejar la etiqueta. SUN tampoco tiene por qué firmar con esa clave principal: puedes apuntar el cifrado del toque a una clave y su firma a otra, y decidir si la etiqueta refleja su ID en claro o lo mantiene cifrado.

Cada archivo del chip lleva sus propias reglas de acceso, y ahora puedes editarlas - quién puede leer un archivo, quién puede escribirlo, quién puede cambiar sus ajustes - cada una fijada a una clave concreta, o abierta de par en par, o cerrada para siempre. Bajo los archivos está la propia configuración del chip, y eso también está aquí: activa un ID aleatorio para que la etiqueta deje de emitir el mismo número de serie a cada lector por el que pasa (una verdadera victoria para la privacidad), limita cuántos intentos fallidos de desbloqueo tolera antes de bloquearse, y un puñado de interruptores de más bajo nivel que la mayoría de la gente nunca necesitará tocar.

El chip incluso guarda una pequeña caja fuerte privada. Hay un archivo cifrado en él, bloqueado con tu Key 0, que viaja en la propia etiqueta en lugar de vivir en un servidor. Guarda ahí un pequeño secreto, algo que quieras que viaje con la etiqueta en vez de estar en la base de datos de alguien, y solo tu clave puede volver a leerlo. NFC.cool lo escribe y lo lee por ti.

Si alguna vez has hecho esto antes, lo hiciste en un escritorio. NXP reparte una herramienta de Windows llamada TagXplorer, conectas un lector USB al ordenador, y desde ahí vas haciendo clic por la configuración del chip. NFC.cool hace todas esas mismas cosas, pero está hecha para usarse, no para sufrirse. Donde TagXplorer es un programa de escritorio lleno de hexadecimal en crudo y campos crípticos, NFC.cool son pantallas en lenguaje claro en el móvil que ya llevas en el bolsillo, con una frase de contraseña en lugar de una clave en crudo y una advertencia antes de cualquier acción permanente. Manejas todo el proceso sosteniendo tu móvil contra la etiqueta durante un segundo o dos.

## Qué es el modo LRP de NTAG 424 DNA, y los cambios que no puedes deshacer

Y luego está LRP. En mis notas de diseño para la primera versión, justo al lado de "modo LRP", había escrito "no planeado - exótico, no lo necesita una app de consumo". LRP viene de Leakage-Resilient Primitive, y es el modo genuinamente paranoico de la etiqueta. Normalmente el chip protege sus claves con AES corriente, y robar una clave significaría romper el propio AES. Pero hay una línea de ataque más taimada: pon un chip en un banco de pruebas, observa el leve temblor en su consumo de energía y su zumbido electromagnético mientras ejecuta la criptografía, y con suficientes de esas trazas puedes reconstruir la clave secreta solo a partir de la fuga, sin tocar nunca las matemáticas. LRP es un canal seguro reconstruido, diseñado para no dejar que esa fuga tenga nada a lo que agarrarse. Es una exageración total para un adhesivo en una botella de vino, y por eso la mayoría de las etiquetas nunca lo activan y la mayoría de las herramientas nunca aprenden a hablarlo. Aun así, no dejaba de darme la lata, y "cubre toda la especificación" no viene con una nota al pie que diga "excepto la parte difícil", así que lo construí. NFC.cool ahora habla LRP, lo que significa que incluso después de que una etiqueta se pase a ese modo, un interruptor de un solo sentido que no puedes revertir, la app todavía puede autenticarse ante ella y gestionarla como cualquier otra. No conozco otra app de móvil que llegue hasta ahí.

Seré claro con los riesgos, porque ahora hay más. Muchos de estos comandos son permanentes. Activar LRP no se puede deshacer. Activar un ID aleatorio no se puede deshacer. Fija el permiso de "cambio" de un archivo en Nunca y habrás congelado ese archivo durante toda la vida de la etiqueta. Una clave equivocada puede bloquear una ranura para siempre. La app avisa de esto alto y claro en el momento, las acciones verdaderamente irreversibles te hacen confirmar mediante una advertencia que detalla la consecuencia exacta, pero conviene decirlo aquí también: practica con una etiqueta de repuesto antes de tocar una que te importe.

## Dónde se usan de verdad las etiquetas NFC anti-falsificación

¿Con sinceridad? La mayoría de la gente que toca una etiqueta NFC nunca necesita nada de esto, y está bien. Un adhesivo que abre un enlace es una cosa maravillosa, aburrida y útil.

Pero una vez que has tenido una de estas en la mano, los casos de uso son obvios. Un bolso de lujo puede demostrar que es auténtico. Una botella de vino o de whisky puede mostrar que nunca se descorchó a escondidas para rellenarla con algo más barato, con el sello anti-manipulación encargándose de esa mitad. Una caja de medicamento responde tanto por el fármaco real que hay dentro como por un sello que nadie ha roto. Un producto de tirada limitada o una obra de arte obtienen un certificado que nadie puede falsificar, y las entradas de eventos dejan de ser algo de lo que puedes hacer una captura de pantalla y repartir. Pon una etiqueta junto a una puerta o en una estantería y un toque demuestra que alguien estuvo de verdad ahí, en lugar de reproducir un enlace guardado desde su sofá. Las zapatillas y los cromos coleccionables demuestran que son el lanzamiento auténtico y no una buena imitación. Y cualquier creador independiente puede hacer que su producto demuestre que es *su* producto. Es el mismo problema de autenticidad que el [Pasaporte Digital de Producto de la UE](/blog/eu-digital-product-passport-2026/) está rondando desde el lado de la regulación, resuelto a nivel del objeto individual.

No construí esto porque mil usuarios lo pidieran. Lo construí porque compré unas etiquetas raras por internet por curiosidad, descubrí cómo funcionaban, y luego no pude dejar sin mirar ni una sola página de la hoja de datos. Así es como suelen empezar las buenas funciones.

## La conclusión sobre las etiquetas NTAG 424 DNA

Las etiquetas NTAG 424 DNA son lo más parecido que tiene el NFC a un sello a prueba de manipulaciones. No pueden impedir que alguien copie un producto, pero hacen que la *prueba de que el producto es auténtico* sea imposible de falsificar, porque esa prueba es una firma criptográfica nueva que solo el chip real puede producir.

NFC.cool Tools ahora las lee, verifica el chip, el toque y el sello anti-manipulación gratis, y te entrega el chip entero para configurarlo - cada clave, los permisos de cada archivo, sus ajustes de más bajo nivel, incluso LRP - para que aprovisiones las tuyas propias directamente desde el móvil. Si alguna vez te has preguntado cómo un toque puede distinguir lo real de lo falso, consíguela en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-es&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-es), pide un par de [estas etiquetas](/affiliate-links/) por unos pocos euros, y toca una tú mismo. Es de esas cosas en las que da gusto perderse.
