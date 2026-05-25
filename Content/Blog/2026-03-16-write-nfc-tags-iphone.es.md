---
id: nfc-blog-010
title: "Cómo grabar etiquetas NFC con tu iPhone"
date: 2026-03-16
tags: ["nfc-tags", "guides", "iphone"]
summary: "Tu iPhone puede hacer más que leer etiquetas NFC - también puede grabarlas. Aquí tienes una guía paso a paso para programar etiquetas NFC con tu iPhone, desde elegir las etiquetas correctas hasta grabar URLs, credenciales de Wi-Fi, tarjetas de contacto y automatizaciones."
image: "/assets/images/Blog/write-nfc-tags-iphone.webp"
imageAlt: "iPhone grabando datos en etiquetas NFC en blanco con iconos de progreso y de verificación"
metaTitle: "Cómo grabar etiquetas NFC con tu iPhone: guía paso a paso (2026)"
metaDescription: "Aprende a grabar etiquetas NFC con tu iPhone. Instrucciones paso a paso para programar URLs, Wi-Fi, contactos y automatizaciones usando NFC.cool Tools y Atajos de iOS."
ogTitle: "Cómo grabar etiquetas NFC con tu iPhone"
ogDescription: "Guía paso a paso para grabar etiquetas NFC con tu iPhone - URLs, Wi-Fi, contactos y automatizaciones. Sin necesidad de equipamiento especial."
---
La mayoría de la gente sabe que su iPhone puede *leer* etiquetas NFC - tocar para pagar, escanear una tarjeta de transporte, abrir un enlace. Pero lo que siempre tengo que convencer a la gente es de que tu iPhone también puede *grabar* en etiquetas NFC, convirtiendo etiquetas en blanco en activadores inteligentes para prácticamente cualquier cosa.

Llevo años desarrollando NFC.cool, una app para leer y grabar etiquetas NFC, y grabar es genuinamente la parte de la que nunca me canso. ¿Quieres una etiqueta en tu mesita de noche que silencie el móvil y configure una alarma? ¿Una etiqueta en tu escritorio que abra tu lista de reproducción del trabajo? ¿Una etiqueta en la puerta que comparta tu contraseña de Wi-Fi con los invitados? Tu iPhone puede programar todo eso, y una vez que lo hayas hecho una vez te preguntarás por qué esperaste tanto.

Esta es la guía que le daría a un amigo que acaba de comprar su primer pack de etiquetas: qué necesitas, cómo grabar los distintos tipos de datos y los proyectos prácticos que yo mismo montaría en minutos. Si eres completamente nuevo en la tecnología, mi [guía completa para principiantes sobre etiquetas NFC](/blog/nfc-tags-beginners-guide/) cubre primero las bases.

---

## Qué necesitas

Solo necesitas tres cosas para empezar a grabar, y ninguna es cara.

### 1. Un iPhone compatible

Para grabar etiquetas NFC necesitas un **iPhone 7 o posterior** con **iOS 13 o superior**. Si compraste tu iPhone en los últimos ocho años, lo tienes cubierto.

Para la mejor experiencia, yo optaría por un iPhone con **lectura NFC en segundo plano** (iPhone XS en adelante). Estos modelos pueden leer etiquetas NFC sin abrir primero una app, lo que hace que las etiquetas que grabas sean mucho más agradables de usar. Si quieres saber exactamente cómo gestiona el hardware del iPhone todo esto, profundicé en el tema en [una mirada por dentro al NFC en los iPhones](/blog/nfc-on-iphones-insider-look/).

### 2. Etiquetas NFC en blanco

Puedes [comprar etiquetas NFC en blanco](/affiliate-links/) en línea por tan solo **0,30-1,00 € cada una**. Vienen en varios formatos:

| Formato | Ideal para |
|-------------|----------|
| **Pegatinas** (redondas, 25-30 mm) | Superficies, objetos, carteles |
| **Tarjetas** (tamaño tarjeta de crédito) | Carteras, tarjetas de visita |
| **Llaveros** | Llaveros, accesorios para bolsas |
| **Pulseras** | Eventos, control de acceso |
| **Etiquetas moneda** (discos gruesos) | Embutir en objetos |

**¿Qué chip deberías comprar?**

Si me pides que elija uno, para la mayoría de los proyectos la **NTAG216** es la mejor opción - 888 bytes de memoria utilizable, ampliamente compatible y asequible en cantidad. Es el chip que recomiendo y con el que más pruebas hago. Aquí tienes el resumen rápido:

- **NTAG213** (144 bytes) - Suficiente para URLs y texto sencillo. La opción más barata.
- **NTAG215** (504 bytes) - Suficiente para tarjetas de contacto, credenciales de Wi-Fi y múltiples registros.
- **NTAG216** (888 bytes) - La mejor para todo. El mayor margen para tarjetas de contacto, credenciales de Wi-Fi y contenido más largo, como vCards detalladas - lo que recomiendo para la mayoría de los proyectos.

Si no estás seguro, empieza con un pack mixto de pegatinas NTAG216 y deja de complicarte - cubren el 90 % de los casos de uso. Para el repaso completo chip a chip, incluidos los tipos que los iPhones prefieren, escribí [una guía sobre los tipos de etiquetas NFC para iPhones](/blog/nfc-tag-types-for-iphones/).

### 3. Una app de grabación NFC

Tu iPhone necesita una app para grabar datos en etiquetas. El soporte NFC integrado de Apple gestiona la lectura, pero para grabar necesitas una app dedicada.

Esta es la parte en la que he invertido años, así que voy a ser transparente sobre mi sesgo: **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** está diseñada específicamente para esto, tanto en iPhone como en [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en). Soporta la escritura de todos los tipos de registro NDEF estándar - URLs, texto, configuraciones de Wi-Fi, contactos y más - con una interfaz limpia que muestra exactamente cuánta memoria de la etiqueta estás usando. También permite bloquear etiquetas, leer detalles técnicos y automatizar la grabación mediante Atajos de iOS. Puedes ver la lista completa de funciones en la [página del lector y grabador NFC](/features/nfc-reader-writer/).

Existen otras opciones (como la app Atajos de Apple para escritura básica de URLs), pero una app NFC dedicada te da más control sobre qué grabas y cómo.

---

## Paso a paso: graba tu primera etiqueta NFC

Voy a empezar por donde empiezo con todo el mundo: grabar una URL en una etiqueta. Es el caso de uso más común y la victoria más rápida.

### Grabar una URL

1. **Abre NFC.cool Tools** y toca la pestaña **Grabar**
2. **Selecciona "URL"** como tipo de registro
3. **Introduce tu URL** - por ejemplo, `https://nfc.cool`
4. **Toca "Grabar en etiqueta"**
5. **Acerca tu iPhone a la etiqueta NFC en blanco** - el borde superior de tu iPhone (donde está la antena NFC) debe estar a 2-3 cm de la etiqueta
6. **Espera la confirmación de éxito** - notarás un toque háptico y verás una marca de verificación

Eso es todo. Cualquiera que acerque su móvil a esa etiqueta será llevado a tu URL - sin app, sin código QR que escanear. La primera vez que vi la cara de un compañero cuando una pegatina en blanco abrió un sitio web, supe que esa era la demostración con la que había que empezar.

**Consejo pro:** La antena NFC en los iPhones está en el **borde superior** del móvil, cerca de la cámara. Para la conexión más fuerte, apoya la parte superior de tu iPhone directamente sobre la etiqueta. Si quieres comprobar lo que grabaste sin una app, puedes [leer etiquetas NFC directamente desde el navegador](/online-nfc-reader/) en Android.

---

## ¿Qué puedes grabar en etiquetas NFC?

Las etiquetas NFC usan un formato llamado **NDEF** (NFC Data Exchange Format) que define tipos de registro estándar. En cuanto ese modelo me quedó claro, toda la tecnología dejó de parecer magia. Esto es lo que puedes grabar:

### URLs y enlaces

El uso más común, y al que más recurro. Graba cualquier dirección web, y tocar la etiqueta la abrirá en el navegador del móvil.

**Usos prácticos:**
- Enlace al menú del restaurante en una etiqueta de mesa
- Portfolio o perfil de LinkedIn en una tarjeta de visita
- Enlace a la página del producto en etiquetas de estantería en tiendas
- Enlace al formulario de valoración en la recepción

**Memoria necesaria:** ~30-80 bytes (la mayoría de las URLs caben en cualquier etiqueta)

### Credenciales de red Wi-Fi

Graba el nombre de tu red Wi-Fi (SSID) y la contraseña en una etiqueta. Los invitados tocan la etiqueta y se conectan automáticamente - sin escribir contraseñas largas.

**Cómo grabar credenciales de Wi-Fi:**

1. En NFC.cool Tools, selecciona **"Wi-Fi"** como tipo de registro
2. Introduce el **nombre de la red** (SSID)
3. Introduce la **contraseña**
4. Selecciona el **tipo de seguridad** (WPA2 o WPA3 para la mayoría de las redes domésticas)
5. Graba en la etiqueta

**Consejo pro:** Coloca una etiqueta de Wi-Fi cerca del router, en un llavero junto a la puerta o dentro de la habitación de invitados. Etiquétala con "Toca para Wi-Fi" - en mi experiencia, esta es la etiqueta por la que todos los invitados acaban dándote las gracias.

**Memoria necesaria:** ~60-120 bytes según la longitud de la contraseña

### Tarjetas de contacto (vCard)

Graba un contacto vCard en una etiqueta. Cuando alguien la toca, tus datos de contacto aparecen listos para guardar - nombre, teléfono, correo electrónico, empresa, dirección.

Esto es esencialmente lo que hace una tarjeta de visita digital, pero integrado directamente en una etiqueta física. Sin app, sin conexión a internet necesaria - los datos de contacto viven en la propia etiqueta.

**Cómo grabar un contacto:**

1. Selecciona **"Contacto"** como tipo de registro
2. Rellena los campos que quieras compartir (nombre, teléfono, correo electrónico, etc.)
3. Graba en la etiqueta

**Memoria necesaria:** ~100-400 bytes según el número de campos que incluyas. Usa NTAG215 o NTAG216 para contactos con direcciones y notas.

Un aviso honesto, sacado de los correos de soporte que recibo: las vCards en bruto en una etiqueta pueden comportarse de forma inconsistente en iPhone. Si la tuya no se abre bien, analicé las causas en [por qué tu etiqueta NFC con vCard no funciona en iPhone](/blog/vcard-nfc-iphone-not-working/).

**Nota:** Para una experiencia más completa con fotos, enlaces sociales y estadísticas, echa un vistazo a **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** - crea un perfil de tarjeta de visita digital alojado y puede grabar el enlace en cualquier etiqueta NFC. Cuando alguien la toca, los usuarios de iOS ven un App Clip nativo y los de Android abren un sitio web en el dominio nfc.cool - sin app necesaria. En mi propio networking lo he encontrado mucho más fiable que las vCards en bruto.

### Texto plano

Graba cualquier mensaje de texto en una etiqueta. Menos común que las URLs, pero útil para:

- Etiquetas de inventario (números de serie, descripciones)
- Instrucciones o notas adjuntas a equipos
- Mensajes ocultos en yincanas
- Seguimiento de activos en almacenes

**Memoria necesaria:** Varía según la longitud del texto (~1 byte por carácter)

### Números de teléfono y direcciones de correo electrónico

Graba un URI `tel:` o `mailto:` para iniciar una llamada o redactar un correo al tocar.

Útil para:
- Etiquetas de contacto de emergencia en equipos médicos
- Etiquetas "llamar para asistencia" en máquinas expendedoras
- Etiquetas de contacto de soporte en productos

### Datos específicos de apps

Algunas apps pueden grabar registros NDEF personalizados que activan acciones concretas de la app. Por ejemplo, podrías grabar un registro que abra un atajo, una lista de reproducción o una pantalla específica de una app.

---

## Avanzado: grabar con Atajos de iOS

Aquí es donde la cosa se pone interesante para mí. La app **Atajos** de Apple tiene soporte integrado de escritura NFC, y NFC.cool Tools lo amplía aún más con sus propias acciones de Atajos.

### Escritura básica de URL con Atajos

1. Abre la app **Atajos**
2. Crea un nuevo atajo
3. Busca la acción **"Establecer etiqueta NFC"** (en Scripting → NFC)
4. Configura qué grabar (URL, texto, etc.)
5. Ejecuta el atajo y toca una etiqueta

Esto es útil para grabar en lote varias etiquetas con los mismos datos.

### Integración de Atajos de NFC.cool Tools

NFC.cool Tools añade sus propias acciones de Atajos, dándote más opciones:

- **Grabar etiqueta** - Graba cualquier tipo de registro compatible de forma programática
- **Leer etiqueta** - Escanea y devuelve los datos de la etiqueta a tu atajo
- **Historial de escaneos** - Accede a tus resultados de escaneo recientes

Esto abre posibilidades de automatización. Por ejemplo, podrías crear un atajo que:
1. Pida el nombre de un producto
2. Genere una URL como `https://yoursite.com/product/{name}`
3. La grabe en una etiqueta NFC
4. Registre la etiqueta en una hoja de cálculo

Perfecto para etiquetar inventario en lote o configurar insignias de eventos.

---

## Proyectos prácticos con etiquetas NFC

Estos son los proyectos a los que sigo volviendo - listos para montar, y cada uno lleva unos minutos:

### Etiquetas de hogar inteligente

**Etiqueta de mesita de noche - "Modo noche"**
Graba una URL que active un Atajo de iOS para:
- Activar No molestar
- Configurar la alarma de mañana
- Bajar el brillo de la pantalla
- Iniciar una lista de reproducción para dormir

**Etiqueta de escritorio - "Modo trabajo"**
- Abrir el gestor de tareas
- Iniciar un temporizador de concentración
- Conectar a la VPN del trabajo
- Reproducir una lista de concentración

**Etiqueta de la puerta - "Saliendo de casa"**
- Consultar la previsión del tiempo
- Mostrar el tiempo de trayecto
- Activar la escena "ausente" del hogar inteligente

### Etiquetas de trabajo

**Etiqueta para el distintivo de conferencia**
Graba la URL de tu NFC.cool Business Card en una etiqueta pegada en la parte trasera de tu distintivo de conferencia. Los contactos tocan tu distintivo → aparece tu tarjeta de visita digital completa.

**Etiquetas de producto**
Graba enlaces a la documentación del producto, registro de garantía o páginas de soporte. Pégalas en los productos o el embalaje.

**Etiquetas de salas de reuniones**
Graba enlaces a calendarios de reserva de salas o credenciales de Wi-Fi. Pégalas junto a la puerta.

### Proyectos creativos

**Etiquetas de música**
Graba enlaces de álbumes de Spotify o Apple Music en pegatinas NFC. Pégalas en las portadas físicas de los álbumes, y tocarlas reproduce el álbum.

**Etiquetas de juegos de mesa**
Graba enlaces a PDFs de reglas o vídeos tutoriales. Pégalas por dentro de la tapa de la caja.

**Etiquetas de recetas**
Graba enlaces a tus recetas favoritas y pega etiquetas en los botes de especias o en las páginas del libro de cocina.

---

## Bloquear etiquetas NFC

Una vez que hayas grabado una etiqueta y estés satisfecho con su contenido, puedes **bloquearla**. Bloquear la convierte en permanentemente de solo lectura - nadie puede sobreescribir tus datos. Trato esto como un paso deliberado y final, nunca algo que hacer a la ligera, porque no hay marcha atrás.

**En NFC.cool Tools:**
1. Toca la opción **Bloquear** después de grabar
2. Confirma - **esto es irreversible**

**Cuándo bloquear:**
- Etiquetas en lugares públicos (evitar manipulaciones)
- Etiquetas de producto (proteger tus URLs)
- Tarjetas de visita (mantener tus datos de contacto seguros)
- Cualquier etiqueta que no pienses regravar

**Cuándo NO bloquear:**
- Etiquetas que quizás quieras actualizar más adelante (cambios de contraseña de Wi-Fi, URLs de temporada)
- Experimentación y aprendizaje - déjalas grabables mientras pruebas

---

## Solución de problemas

La mayoría de las preguntas "¿por qué no graba?" que recibo caen en una de estas cuatro causas. Así es como yo las abordaría.

### Error "No se puede grabar"

- **La etiqueta puede estar bloqueada.** Si alguien (o tú) bloqueó la etiqueta anteriormente, es permanentemente de solo lectura. Necesitarás una etiqueta nueva.
- **Memoria insuficiente.** Tus datos pueden ser demasiado grandes para la capacidad de la etiqueta. Prueba una etiqueta con más memoria (NTAG215 → NTAG216) o reduce tus datos.
- **Etiqueta mal posicionada.** Mueve lentamente el borde superior de tu iPhone sobre la etiqueta. Algunas superficies (metal, fundas gruesas) pueden interferir.
- **La etiqueta está dañada.** Las etiquetas NFC son duraderas pero no indestructibles. El calor extremo, la deformación o la perforación pueden inutilizarlas.

### La grabación parece funcionar pero la etiqueta no responde

- **Comprueba el formato NDEF.** Los datos deben grabarse en formato NDEF para que los móviles los lean automáticamente. NFC.cool Tools lo gestiona por ti, pero las etiquetas grabadas de forma personalizada pueden tener problemas de formato.
- **El modelo de iPhone importa.** Los iPhones más antiguos (7, 8, X) requieren una app para leer etiquetas. El iPhone XS en adelante lee etiquetas automáticamente en segundo plano.

### La etiqueta funciona en Android pero no en iPhone

- **Comprueba el tipo de chip.** Los iPhones funcionan mejor con chips de la serie NTAG (NTAG213, 215, 216). Algunos otros tipos de chip pueden no ser compatibles con iOS.
- **Formato NDEF.** La etiqueta debe estar formateada en NDEF. Algunas etiquetas compradas a granel llegan sin formatear - grábalas con NFC.cool Tools para que se formateen automáticamente.

---

## Consejos para sacar el máximo partido a las etiquetas NFC

Estas son las pequeñas lecciones que he aprendido a las malas, para que tú no tengas que hacerlo.

1. **Etiqueta tus etiquetas.** Una pegatina en blanco en un escritorio no ayuda. Usa una etiquetadora o un rotulador permanente para indicar qué hace la etiqueta ("Toca para Wi-Fi", "Modo trabajo", etc.).

2. **Evita las superficies metálicas.** El metal interfiere con las señales NFC. Si tienes que pegarla en metal, usa **etiquetas NFC anti-metal** (tienen una capa de ferrita que protege contra las interferencias). Son ligeramente más gruesas y caras, pero funcionan perfectamente en superficies metálicas.

3. **Prueba antes de pegar.** Graba la etiqueta, pruébala y luego despega el adhesivo y pégala en su lugar definitivo. Despegar una etiqueta ya pegada para regrabarla es el tipo de pequeña molestia que he aprendido a evitar por completo.

4. **Usa la etiqueta adecuada para cada tarea.** No desperdicies una NTAG216 (888 bytes) en una URL sencilla que ocupa 40 bytes. Y no intentes meter una vCard completa en una NTAG213 (144 bytes).

5. **Existen opciones impermeables.** Las etiquetas NFC recubiertas de epoxi son impermeables y más duraderas. Ideales para uso en exteriores, cocinas o baños.

6. **Combina etiquetas NFC con Atajos.** El verdadero potencial de las etiquetas NFC en iPhone no es solo abrir URLs - es activar automatizaciones complejas. Una etiqueta NFC puede lanzar cualquier Atajo de iOS, que a su vez puede controlar dispositivos del hogar inteligente, enviar mensajes, registrar datos y mucho más.

---

## Preguntas frecuentes

### ¿Puedo regravar una etiqueta NFC?

Sí, siempre que la etiqueta no esté bloqueada. Las etiquetas NFC estándar pueden regrabarse **más de 100.000 veces**. Simplemente graba los nuevos datos encima de los antiguos - no hace falta "borrar" primero.

### ¿A qué distancia tiene que estar mi iPhone?

A **2-4 cm** (aproximadamente 1-2 pulgadas). La antena NFC está en el borde superior del iPhone. Apoya la parte superior del móvil directamente sobre la etiqueta para la mejor conexión.

### ¿Puedo grabar etiquetas NFC sin una app?

Atajos de iOS tiene una acción integrada "Establecer etiqueta NFC" para escrituras básicas (URLs, texto). Pero para credenciales de Wi-Fi, contactos y registros más complejos, necesitarás una app como NFC.cool Tools.

### ¿Las etiquetas NFC necesitan batería?

No. Las etiquetas NFC son **pasivas** - no tienen batería y se alimentan del lector NFC de tu móvil cuando las tocas. Las etiquetas pueden durar **más de 10 años** porque no tienen nada que agotarse.

### ¿Puedo proteger con contraseña una etiqueta NFC?

Sí. NFC.cool Tools puede establecer protección por contraseña en etiquetas NTAG, tanto en iPhone como en Android. Ten en cuenta que esto solo impide que la etiqueta sea **sobreescrita** - no impide que nadie **lea** lo que ya hay en la etiqueta. Si necesitas que el propio contenido sea ilegible sin una clave, lo que buscas son datos cifrados - consulta nuestra guía sobre [NFC Safe](/blog/nfc-safe-encrypted-secrets/). Bloquear una etiqueta es la otra opción: bloquea permanentemente cualquier escritura futura.

### ¿Las etiquetas NFC funcionan a través de una funda?

Sí, la mayoría de las fundas no son problema. El NFC funciona a través del plástico, la silicona, el cuero e incluso las carteras finas. Las fundas muy gruesas (como las fundas resistentes reforzadas) o las que tienen placas metálicas (para soportes magnéticos de coche) pueden interferir.

### ¿Cuántas etiquetas puedo grabar con un iPhone?

Ilimitadas. No hay ninguna restricción en cuántas etiquetas grabas. El factor limitante son las propias etiquetas, no tu móvil.

---

## ¿Y ahora qué?

Ahora que ya sabes cómo grabar etiquetas NFC, las posibilidades están abiertas de par en par. Mi consejo es el de siempre: empieza con un proyecto sencillo - una etiqueta de Wi-Fi para invitados o una etiqueta de tarjeta de visita - consigue esa pequeña victoria y ve construyendo desde ahí.

Si buscas una app de grabación NFC potente y fácil de usar, **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** es la app que he desarrollado para esto - desde la escritura básica de URLs hasta la gestión avanzada de etiquetas, con integración de Atajos de iOS para automatización.

Y si quieres convertir etiquetas NFC en tarjetas de visita digitales profesionales, **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** te permite crear un bonito perfil de tarjeta y grabar su URL en cualquier etiqueta NFC. La interfaz de la app y el App Clip son compatibles con 35 idiomas en iOS, y los destinatarios de Android ven un sitio web en el dominio nfc.cool (actualmente solo en inglés).

**Descarga NFC.cool Tools:** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en)

**Descarga NFC.cool Business Card:** [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8) | [Android (en NFC.cool Tools)](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en)
