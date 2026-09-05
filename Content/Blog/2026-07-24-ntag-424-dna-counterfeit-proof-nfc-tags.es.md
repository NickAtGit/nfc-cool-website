---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: las etiquetas NFC que demuestran que no son falsas"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Oí que las marcas de lujo usan etiquetas NTAG 424 DNA para demostrar que un producto es auténtico, así que compré un lote en AliExpress para ver qué hacen en realidad. Resultaron ser el Contador de Toques NFC con una capa criptográfica añadida, y NFC.cool Tools ahora las lee, las verifica y las configura por completo en iPhone y Android - cada clave, los permisos de cada archivo y los propios ajustes del chip."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Un bolso de piel con una etiqueta de autenticación NFC junto a un iPhone que muestra un escudo de seguridad e iconos de llave"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: así funciona la etiqueta NFC antifalsificación"
metaDescription: "Compré etiquetas NTAG 424 DNA para ver cómo las marcas demuestran que un producto es auténtico. Así funcionan estas etiquetas NFC antifalsificación, y así las lee, verifica y programa NFC.cool."
ogTitle: "Las etiquetas NFC que demuestran que no son falsas"
ogDescription: "Cómo las etiquetas NTAG 424 DNA detectan los clones, y cómo NFC.cool las lee, verifica y configura en iPhone y Android."
---

Hace un tiempo no dejaba de leer la misma afirmación de pasada: las marcas de lujo están poniendo chips NFC en sus productos para que puedas acercar el móvil a un bolso o a unas zapatillas y saber que es auténtico, no una falsificación. Cada artículo repetía la misma frase rimbombante y ninguno decía *cómo*. ¿Qué es lo que de verdad impide que un falsificador copie el chip junto con el bolso?

Así que hice lo que siempre hago cuando me pica la curiosidad por una etiqueta. Entré en AliExpress, encontré un anuncio de etiquetas "NTAG 424 DNA", pedí un lote pequeño y esperé a que llegara el sobre. Unos pocos euros, un par de semanas, y tenía en mi escritorio el mismo silicio sobre el que están construidos esos sistemas de protección de marca. Luego acerqué el móvil a una para ver qué hace.

---

## Qué es en realidad una etiqueta NTAG 424 DNA

Por fuera es una etiqueta NFC corriente. No la distinguirías en un montón de etiquetas baratas, y cualquier móvil la lee sin quejarse. Si has leído mi [guía sobre los tipos de etiquetas NFC](/blog/nfc-tag-types-for-iphones/), encaja como una etiqueta Type 4 más que tu iPhone lee encantado.

La parte del "DNA" es lo que marca la diferencia. Dentro, el chip guarda unas cuantas claves AES-128 y un pequeño motor criptográfico, y puede hacer algo que ninguna NTAG215 corriente ni ningún adhesivo de los que vienen en paquete de diez puede hacer: puede *firmar* cada toque. Esa firma lo es todo. Es la diferencia entre una etiqueta que dice "aquí tienes un enlace" y una etiqueta que dice "aquí tienes un enlace, y aquí tienes la prueba criptográfica de que yo, este chip auténtico en concreto, soy quien lo está sirviendo, ahora mismo".

Eso es lo que las marcas de lujo están pagando en realidad - no el enlace, sino la prueba de que es un chip auténtico quien lo sirve.

---

## Cómo funcionan SUN y SDM: un enlace que se reescribe en cada toque

Y aquí fue donde todo encajó de golpe. Cuando miré lo que la etiqueta estaba enviando en realidad, me di cuenta de que ya había construido la mayor parte de la maquinaria para entenderlo.

A principios de este año lancé una [función de Contador de Toques NFC](/blog/count-nfc-tag-scans/): una etiqueta que cuenta cuántas veces ha sido leída y pone ese número en la URL, de modo que un enlace puede saber que es la vez número 47 que alguien la escanea. Una etiqueta NTAG 424 DNA es esa misma idea, pero envuelta en una capa de cifrado que la hace imposible de falsificar.

El mecanismo se llama **SUN** (Secure Unique NFC), o **SDM** (Secure Dynamic Messaging) si estás leyendo [la hoja de datos de NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Guardas un enlace normal en la etiqueta, algo como `https://example.com`. Pero le dices al chip que reescriba partes de ese enlace sobre la marcha cada vez que alguien la lee. Así que lo que tu móvil recibe en realidad se parece más a:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Esos dos valores no son decoración. `picc_data` es una copia cifrada del ID real de la etiqueta más un contador de toques, protegida con una clave que nunca sale del chip. `cmac` es una firma criptográfica sobre esos datos. Ambos cambian en cada toque. Acerca el móvil a la misma etiqueta dos veces y obtendrás dos URLs completamente distintas, cada una firmada de nuevo por el chip.

Yo pienso en una etiqueta NFC corriente como en un cartel impreso en el escaparate de una tienda. Cualquiera puede fotografiarlo e imprimir una copia idéntica. Una etiqueta SUN se parece más a un guardia de seguridad que te entrega un recibo nuevo, numerado y sellado individualmente, cada vez que entras. Copiar el recibo de ayer no te sirve de nada, porque el número de hoy es distinto y solo el sello del guardia es auténtico.

---

## Por qué una etiqueta NTAG 424 DNA clonada acaba pillada

Esta es la parte que responde a mi pregunta original. Un falsificador puede clonar sin ningún problema el *contenido* de una etiqueta. Puede leer la URL, copiarla byte a byte y grabarla en un chip en blanco. Eso siempre ha sido así.

Lo que no puede hacer es producir la siguiente firma válida. La clave de firma vive dentro del chip auténtico y nunca sale, ni siquiera durante un toque. Eso significa que un toque solo vale algo para quien de verdad tiene la clave. En un sistema real de protección de marca, el enlace de la etiqueta apunta a un servidor que gestiona el fabricante, y ese servidor es el que descifra cada toque, recalcula la firma para confirmar que la clave coincide y lleva la cuenta del contador a medida que sube.

Esa última parte es lo que pilla a un clon. La única URL que un falsificador puede poner en una copia es una que capturó de un toque auténtico, congelada con el contador que ese toque llevaba en ese momento. Reenvíala y el servidor se encuentra con un número que ya ha visto, y como el contador de un chip real solo avanza, una repetición o un paso atrás delatan el truco. Para enviar un contador nuevo y más alto con una firma que aun así cuadre, necesitaría la clave, y para conseguir la clave tendría que romper AES o abrir físicamente el chip. Ninguna de las dos cosas va a ocurrir por un bolso falso.

Esa es la versión honesta de la frase de marketing. El chip no hace que el *producto* sea imposible de copiar. Hace que la *prueba de autenticidad* sea imposible de copiar, y traslada esa prueba a algo que el falsificador no puede reproducir.

---

## Qué hay dentro del chip

Todo lo que NFC.cool hace con estas etiquetas se entiende mucho mejor cuando tienes en la cabeza cómo está organizado el chip, así que aquí va el mapa que tuve que dibujarme antes de poder escribir una sola línea de código.

Una NTAG 424 DNA es una etiqueta NFC Forum Type 4 con 416 bytes de memoria, organizados en una única aplicación que contiene tres archivos fijos. No puedes crear ni borrar archivos como harías en una MIFARE DESFire. Estos tres son todo lo que hay:

| Archivo | Tamaño | Qué contiene |
| --- | --- | --- |
| File 01 | 32 bytes | El contenedor de capacidades, que le dice al móvil dónde están los datos NDEF |
| File 02 | 256 bytes | El mensaje NDEF, normalmente tu enlace. SUN refleja aquí sus valores cambiantes en cada lectura |
| File 03 | 128 bytes | Un archivo propietario que el chip puede mantener cifrado. NFC.cool lo usa como caja fuerte, más abajo lo explico |

Junto a los archivos hay cinco claves AES-128, numeradas de Key 0 a Key 4. **Key 0** es la clave maestra de la aplicación: es con la que te autenticas para cambiar el enlace, activar SUN, cambiar cualquier otra clave o tocar la configuración del chip. Key 1 a Key 4 no hacen nada por sí solas. Solo cuentan cuando los permisos de acceso de un archivo o la configuración de SUN apuntan a ellas. En una etiqueta recién salida de fábrica, las cinco claves son dieciséis bytes a cero y el archivo NDEF puede escribirlo cualquiera, y por eso una etiqueta nueva acepta un enlace normal sin más ceremonias.

Cada comando que cambia algo se ejecuta dentro de una sesión autenticada: móvil y chip hacen un desafío-respuesta mutuo con una de esas claves, derivan de ahí las claves de sesión y, a partir de ese momento, cada comando lleva un MAC o va completamente cifrado. Esa es la mensajería segura a la que el resto de este artículo vuelve una y otra vez. NFC.cool la implementa al completo, en iPhone y en Android, y todas las escrituras que describo a continuación pasan por ella.

---

## Qué te muestra un toque

Acerca una etiqueta al móvil y NFC.cool Tools, en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-es&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-es), hace una lectura a fondo sin pedirte nada: la identidad del chip y si es la variante TagTamper, el enlace, los ajustes y permisos de acceso de cada archivo, qué ranuras de clave se han cambiado respecto a los valores de fábrica y el resultado de tres comprobaciones independientes.

### ¿Es silicio NXP auténtico?

Cada NTAG 424 DNA sale de fábrica con una **firma de originalidad**: una firma ECDSA sobre el UID de siete bytes del propio chip, hecha con la clave privada de NXP en la curva P-224. NFC.cool la lee y la verifica contra la clave pública que NXP tiene publicada, directamente en el móvil y sin que tú aportes ninguna clave. Si cuadra, la app muestra "NXP auténtica". Eso responde a la primera pregunta: ¿es silicio NXP de verdad, o un chip de imitación que simplemente responde al mismo nombre?

### ¿Es auténtico este toque?

Esta es la comprobación SUN. La app toma el `picc_data` y el `cmac` del enlace que la etiqueta acaba de servir, descifra los datos PICC para obtener el UID y el contador de lecturas, recalcula el CMAC y lo compara con lo que envió la etiqueta. Si los dos coinciden, ves "Auténtico" y el contador aparece como Contador de lecturas.

Esta comprobación necesita la clave de la etiqueta, porque justo de eso se trata. Una etiqueta que sigue con sus claves de fábrica se verifica con la clave de todo ceros. Una etiqueta que has bloqueado con tu propia clave se verifica con la clave que NFC.cool guardó cuando la definiste. Y una etiqueta que otra persona bloqueó con una clave que tú no tienes muestra "No verificado", que es la respuesta correcta.

### ¿Se ha roto el precinto?

Una versión de estos chips, la **NTAG 424 DNA TagTamper**, está hecha para servir de precinto: un sello que delata si alguien lo ha abierto. Es un adhesivo con un fino bucle conductor que lo recorre. Lo pegas cruzando lo que quieras proteger, sobre la solapa de una caja o alrededor del tapón de una botella, el mismo trabajo que hoy hacen esas pegatinas de "garantía anulada si se rompe". Al abrir el artículo rasgas el adhesivo y se corta el bucle.

El chip registra dos cosas sobre ese bucle: una marca permanente que anota si *alguna vez* se ha abierto, y el estado en este preciso momento. NFC.cool lee las dos en cada toque e indica "Precintado", "Abierto" o el que más importa, "Abierto, vuelto a cerrar": alguien cortó el bucle y luego lo cerró de nuevo con cuidado. La marca solo va en un sentido, así que una caja vuelta a precintar se lee como abierta durante el resto de la vida del chip. La criptografía demuestra que el chip es auténtico. Esto demuestra que nadie ha metido mano en la caja.

---

## Programar las tuyas: la versión corta

Leer es solo la mitad. La otra mitad es que esas etiquetas en blanco de AliExpress puedes programarlas tú mismo, y la configuración mínima son tres pasos.

1. **Escribe tu enlace.** Una escritura NDEF normal, igual que en cualquier otra etiqueta.
2. **Activa SUN.** La app graba tu enlace con huecos reservados y le dice al chip que refleje en ellos su UID cifrado, el contador de toques y la firma en cada lectura. A partir de ahí, cada toque produce una URL única y firmada.
3. **Define tu propia Key 0.** Así sustituyes los ceros de fábrica por una clave que solo tú conoces, y nadie más puede reconfigurar la etiqueta.

Para ese último paso escribes una frase de contraseña, no una clave. NFC.cool deriva la clave AES a partir de ella tomando los primeros 16 bytes de su hash SHA-256, de la misma forma en iPhone y en Android, así que una etiqueta que preparas en uno se abre con la misma frase en el otro. Si prefieres usar una clave generada en otro sitio, por ejemplo en tu propio servidor, puedes pegar los 32 caracteres hexadecimales en su lugar.

Una clave perdida es una etiqueta que ya no podrás reconfigurar nunca más, así que la app tiene mucho cuidado con dónde la guarda. En iPhone va al llavero del sistema y se sincroniza a través de iCloud Keychain. En Android se cifra con una clave respaldada por hardware y se replica en Block Store, de modo que sobrevive a una reinstalación o a un cambio de móvil. La clave nueva se guarda antes de enviar el cambio, y si el toque se interrumpe a medias, tanto el valor antiguo como el nuevo siguen disponibles hasta que la etiqueta confirma cuál de los dos tiene. También puedes introducir una frase de contraseña que definiste en otro dispositivo, y la app la comprueba contra la etiqueta antes de guardarla.

Hay una cosa que la app se niega a hacer a propósito: escribir un enlace normal en una etiqueta con SUN activado desde la pantalla de escritura corriente. Las posiciones en las que el chip refleja sus valores están fijadas para la URL con la que se configuró SUN, y una URL de otra longitud dejaría al chip escribiendo esos valores en mitad de tu nuevo contenido en cada toque. La pantalla de NTAG 424 desactiva SUN primero y luego escribe.

---

## El resto del chip

En esa versión corta es donde se quedan la mayoría de los tutoriales, y hasta ahora la forma de ir más allá era el TagXplorer de NXP en un ordenador de escritorio con un lector USB. Yo quería tener toda la hoja de datos al alcance desde el móvil, así que la fui recorriendo sección por sección.

### Las cinco claves

Key 0 tiene su propia pantalla, y Key 1 a Key 4 viven en "Avanzado". Cada una se puede definir a partir de una frase de contraseña o en hexadecimal, restablecer al valor de fábrica o introducir si ya la definiste en otro dispositivo. Todos los cambios se autentican con Key 0, que es la que manda sobre las cinco ranuras.

### SUN con las claves que tú elijas

Activar SUN no es un simple interruptor. Eliges el **modo**: cifrado, en el que el UID viaja dentro de `picc_data` y solo quien tenga la clave puede leerlo, o en claro, en el que el UID y el contador aparecen en la URL sin cifrar y solo la firma es secreta. Y eliges qué claves hacen el trabajo: una **clave de metalectura** que cifra los datos PICC y una **clave de lectura del archivo** que calcula la firma. Pueden ser la misma ranura o dos distintas, y así es como una marca podría entregar a un socio la clave que verifica los toques sin entregarle la clave que descifra los UID.

La app te avisa si eliges una ranura que sigue con los ceros de fábrica, porque una firma hecha con una clave que todo el mundo conoce no protege nada. Y el lado de la verificación entiende la misma variedad: un toque firmado con Key 3 y cifrado con Key 1 se verifica correctamente siempre que esas claves estén guardadas en el móvil.

### Permisos de acceso a los archivos

Cada archivo lleva cuatro permisos: lectura, escritura, lectura y escritura a la vez, y cambio, que es el que decide quién puede editar los otros tres. Cada permiso apunta a una de las cinco claves, a "Libre" (cualquiera) o a "Nunca" (nadie, jamás). Así puedes decir "cualquiera puede leer File 02, solo Key 2 puede escribirlo y solo Key 0 puede cambiar estas reglas", y el chip lo hace cumplir sin ninguna app de por medio.

NFC.cool muestra los permisos actuales de cada archivo y te deja editarlos, con dos avisos incorporados. Te dice cuándo un permiso apunta a una clave que este móvil no tiene, porque podrías estar cerrándote la puerta a ti mismo. Y te obliga a confirmar en un paso aparte antes de poner el permiso de cambio en "Nunca", porque una vez escrito, las reglas de ese archivo quedan congeladas para toda la vida del chip.

### Configuración del chip

Por debajo de los archivos está la configuración del propio chip, que NXP expone a través de un único comando SetConfiguration. NFC.cool cubre estas opciones:

- **UID aleatorio.** Normalmente el chip comunica el mismo UID fijo a todos los lectores, lo que permite a cualquiera rastrear una etiqueta de toque en toque. Con el UID aleatorio activado, responde con un ID aleatorio nuevo cada vez y solo revela el real después de que te autentiques. Una mejora real para la privacidad, y además permanente. La app identifica las etiquetas por su UID, así que después recupera el real probando cada Key 0 que conoce mediante un GetCardUID autenticado, y la etiqueta sigue siendo manejable desde el móvil que la preparó.
- **Límite de autenticaciones fallidas.** Cuántos intentos con una clave incorrecta tolera el chip antes de bloquear Key 0. Es una protección contra los intentos de adivinar la clave, pero si lo pones demasiado bajo, un puñado de toques fallidos puede bloquear la clave maestra para siempre.
- **Intensidad de la modulación de retorno.** Fuerte o estándar. La estándar puede resultar ilegible con antenas pequeñas, así que lo sensato es dejarla en el valor por defecto.
- **Escritura encadenada.** Se puede desactivar para que cada escritura quede limitada a una sola trama. Permanente.
- **Bytes de capacidad.** Dos bytes libres que NXP deja para tu propio uso.
- **LRP.** El interruptor de la mensajería segura, que tiene su propia sección más abajo.

### La caja fuerte

File 03 es un archivo propietario de 128 bytes que el chip puede mantener cifrado, y NFC.cool lo convierte en una pequeña caja fuerte privada dentro de la propia etiqueta (en la app aparece como "Cámara acorazada"). La primera vez que guardas algo, la app pasa el archivo a modo completamente cifrado y fija todos sus permisos de acceso a Key 0. A partir de ahí, la caja fuerte guarda hasta 126 bytes de texto que solo tu clave puede volver a leer, y una lectura a fondo desde cualquier otro móvil se lleva un error de permisos y nada más.

Está pensada para un secreto que debería viajar con el objeto en lugar de vivir en la base de datos de alguien: un número de serie, una nota para tu yo del futuro, un token que espera tu propio servidor. Restablecer Key 0 a fábrica la borra, y esa es la única forma en que la caja fuerte desaparece.

---

## El modo LRP

Normalmente el chip protege sus claves con AES corriente, y robar una clave significaría romper el propio AES. Pero hay una línea de ataque más taimada. Pon el chip en un banco de pruebas, mide las leves variaciones de su consumo eléctrico y de sus emisiones electromagnéticas mientras ejecuta el cifrado, y con suficientes trazas de ese tipo puedes reconstruir la clave solo a partir de la fuga, sin tocar nunca las matemáticas. **LRP**, de Leakage-Resilient Primitive, es un canal seguro reconstruido desde cero para que esa fuga no tenga nada a lo que agarrarse. NXP lo documenta en la AN12304, y para un adhesivo en una botella de vino es matar moscas a cañonazos, así que la mayoría de las etiquetas nunca lo activan y la mayoría de las herramientas nunca aprenden a hablarlo.

En mis notas de diseño para la primera versión, justo al lado de "modo LRP", había escrito "no planeado". No dejaba de darme la lata, así que lo construí. NFC.cool puede pasar una etiqueta a modo LRP y, lo que es más importante, seguir autenticándose ante ella y gestionándola después: claves, permisos de archivos, caja fuerte, configuración del chip, todo a través del canal LRP en lugar de AES.

Dos cosas que debes saber antes de accionar ese interruptor. Es permanente: una vez que una etiqueta está en modo LRP, su mensajería segura AES queda desactivada para siempre, y ninguna herramienta que solo hable AES podrá volver a comunicarse con ella. Y SUN no está disponible en una etiqueta LRP, así que una etiqueta cuyo trabajo es firmar toques debería quedarse en modo AES.

---

## Lo que no se puede deshacer

Muchos de estos comandos son permanentes, y la app lo dice alto y claro en el momento: cada acción irreversible te obliga a confirmar mediante una advertencia que detalla la consecuencia exacta. Aun así, merece la pena enumerarlas aquí también.

- Activar LRP.
- Activar el UID aleatorio.
- Desactivar la escritura encadenada.
- Poner el permiso de cambio de un archivo en "Nunca".
- Perder una clave. El chip no tiene restablecimiento de fábrica. Si Key 0 desaparece, con ella se va tu capacidad de reconfigurar la etiqueta.
- Un límite de autenticaciones fallidas demasiado bajo, que puede bloquear Key 0 tras unos pocos toques fallidos.

Practica con una etiqueta de repuesto antes de tocar una que te importe.

---

## Dónde se usan de verdad las etiquetas NFC antifalsificación

¿La verdad? La mayoría de la gente que acerca el móvil a una etiqueta NFC nunca necesita nada de esto, y no pasa nada. Un adhesivo que abre un enlace es algo maravilloso, aburrido y útil.

Pero una vez que has tenido una de estas en la mano, los casos de uso saltan a la vista. Un bolso de lujo puede demostrar que es auténtico. Una botella de vino o de whisky puede demostrar que nadie la descorchó a escondidas para rellenarla, con el precinto encargándose de esa mitad. Una caja de medicamentos responde tanto del fármaco real que hay dentro como de un precinto que nadie ha roto. Las entradas para eventos dejan de ser algo que puedes capturar en pantalla y pasar a otros, y una etiqueta junto a una puerta demuestra que alguien estuvo ahí de verdad, en lugar de reenviar un enlace guardado desde el sofá. Es el mismo problema de autenticidad al que el [Pasaporte Digital de Producto de la UE](/blog/eu-digital-product-passport-2026/) se acerca desde el lado de la regulación, resuelto a nivel del objeto individual.

No construí esto porque mil usuarios lo pidieran. Lo construí porque compré unas etiquetas raras por internet, por pura curiosidad, descubrí cómo funcionaban, y luego no pude dejar sin mirar ni una sola página de la hoja de datos. Así es como suelen empezar las buenas funciones.

---

## La conclusión sobre las etiquetas NTAG 424 DNA

Las etiquetas NTAG 424 DNA son lo más parecido que tiene el NFC a un precinto inviolable. No pueden impedir que alguien copie un producto, pero hacen que la *prueba de que el producto es auténtico* sea imposible de falsificar, porque esa prueba es una firma criptográfica nueva que solo el chip real puede producir.

NFC.cool Tools las lee, verifica el chip, el toque y el precinto, y te entrega el chip entero para que lo configures: cada clave, los permisos de cada archivo, los propios ajustes del chip, incluso LRP, todo desde el móvil. Si alguna vez te has preguntado cómo un toque puede distinguir lo auténtico de lo falso, consíguela en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-es&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-es), pide un par de [estas etiquetas](/affiliate-links/) por unos pocos euros y acerca el móvil a una tú mismo. Es de esas cosas en las que da gusto perderse.
