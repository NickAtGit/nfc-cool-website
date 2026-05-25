---
id: nfc-blog-009
title: "Las etiquetas NFC explicadas: una guía completa para principiantes"
date: 2026-02-23
tags: ["nfc-tags", "guides", "automation"]
summary: "Las etiquetas NFC son pequeños chips sin batería que pueden activar acciones en tu móvil con un solo toque. Aquí tienes todo lo que necesitas saber - qué son, cómo funcionan, qué tipos comprar y más de 15 formas prácticas de usarlas."
image: "/assets/images/Blog/nfc-tags-beginners-guide.webp"
imageAlt: "Móvil y varias etiquetas NFC con iconos de flujo de trabajo para principiantes"
metaTitle: "Las etiquetas NFC explicadas: guía completa para principiantes (2026)"
metaDescription: "Aprende qué son las etiquetas NFC, cómo funcionan, los diferentes tipos (NTAG213, 215, 216) y más de 15 usos prácticos - desde la automatización del hogar inteligente hasta las tarjetas de visita digitales."
ogTitle: "Las etiquetas NFC explicadas: una guía completa para principiantes"
ogDescription: "Todo lo que los principiantes necesitan saber sobre las etiquetas NFC en 2026 - tipos, cómo funcionan, qué comprar y usos prácticos para casa, trabajo y más."
---
Seguramente ya has acercado el móvil para pagar un café, escaneado una tarjeta de transporte o abierto la puerta de una habitación de hotel con él. Todo eso es NFC en acción.

Llevo años desarrollando NFC.cool, una app para leer y grabar etiquetas NFC, y lo único que desearía que más gente supiera es esto: el NFC no es solo para pagos y tarjetas de acceso. Una pequeña **etiqueta NFC** - un chip que cuesta unos pocos céntimos y nunca necesita batería - puede automatizar tu hogar, compartir tus datos de contacto con un solo toque y conectar el mundo físico con acciones digitales.

Esta es la guía que le daría a cualquiera que está empezando. Te voy a explicar qué son las etiquetas NFC, cómo funcionan realmente, cuáles compraría yo y los usos que he visto que realmente merecen la pena.

---

## ¿Qué es el NFC?

**NFC** son las siglas de **Near Field Communication** (comunicación de campo cercano). Es una tecnología inalámbrica de corto alcance que permite a dos dispositivos intercambiar datos cuando están a pocos centímetros el uno del otro.

Funciona a **13,56 MHz** y alcanza hasta unos **4 cm** (aproximadamente 1,5 pulgadas). Ese alcance tan reducido confunde a la gente al principio, pero es deliberado - es una característica de seguridad. A diferencia del Bluetooth o el Wi-Fi, no puedes conectarte accidentalmente a algo que está al otro lado de la habitación.

Todos los smartphones modernos llevan un chip NFC dentro. Los iPhones leen NFC desde el iPhone 7 en 2016, y los Android todavía antes. Acerca el móvil a una etiqueta y el móvil alimenta la etiqueta y la lee - todo el intercambio ocurre en una fracción de segundo.

---

## ¿Qué es una etiqueta NFC?

Una etiqueta NFC es un pequeño chip pasivo integrado en una pegatina, tarjeta, llavero o prácticamente cualquier formato. "Pasivo" es la palabra clave: **una etiqueta NFC no tiene batería**. Se alimenta completamente del campo del dispositivo que la lee.

Eso es lo que hace que sean tan fáciles de usar en el día a día:
- **Prácticamente indestructibles** - sin batería que se agote, nada que se desgaste
- **Baratas** - unos pocos céntimos cada una en cantidad
- **Diminutas** - más pequeñas que una moneda, más finas que una tarjeta de crédito
- **Duraderas** - una buena etiqueta dura más de 10 años

Cada etiqueta almacena una pequeña cantidad de datos. Puedes guardar una URL, datos de contacto, credenciales de Wi-Fi, texto plano o instrucciones que le indican al móvil qué hacer cuando la lee.

### ¿En qué se diferencia el NFC del RFID?

El NFC es en realidad un subconjunto del RFID (Radio-Frequency Identification, identificación por radiofrecuencia). Así es como explico la diferencia:

| | NFC | RFID |
|---|---|---|
| **Frecuencia** | Solo 13,56 MHz | 125 KHz - 960 MHz |
| **Alcance** | Hasta ~4 cm | Hasta varios metros |
| **Comunicación** | Bidireccional | Normalmente unidireccional |
| **Estandarizado** | ISO 14443 / ISO 18092 | Múltiples estándares |
| **Uso de consumo** | Alto (móviles, pagos) | Principalmente industrial |

Todo NFC es RFID, pero no todo RFID es NFC. La tarjeta que pasas para entrar a una oficina suele funcionar a 125 KHz, y tu móvil simplemente no puede leerla. Las etiquetas NFC usan la frecuencia de 13,56 MHz que sí soportan los móviles. "¿Por qué mi móvil no lee el carné del trabajo?" es una de las preguntas que más me hacen, y esta es casi siempre la respuesta. (Si es el agujero en el que estás metido, escribí un artículo entero sobre [por qué tu iPhone no puede abrir una puerta RFID](/blog/iphone-rfid-condo-doors/).)

---

## Tipos de etiquetas NFC: ¿cuál deberías comprar?

Las etiquetas NFC se dividen en tipos definidos por el **NFC Forum**, el organismo de estándares del sector. Las que realmente vas a encontrar están basadas en chips de **NXP Semiconductors** - la serie NTAG.

### La familia NTAG

Son, con diferencia, las etiquetas NFC de consumo más comunes:

#### NTAG213
- **Memoria:** 144 bytes (unos 132 utilizables)
- **Ideal para:** URLs, tarjetas de contacto, automatizaciones simples
- **Precio:** La opción más barata (~0,15-0,30 USD por etiqueta)
- **Capacidad de URL:** ~130 caracteres

La mula de carga. Para una URL sola o un texto corto, la NTAG213 es todo lo que necesitas - es la que usa la mayoría de las tarjetas de visita NFC y las etiquetas de marketing.

#### NTAG215
- **Memoria:** 504 bytes (unos 488 utilizables)
- **Ideal para:** URLs más largas, vCards con varios campos, credenciales de Wi-Fi
- **Precio:** ~0,20-0,40 USD por etiqueta
- **Capacidad de URL:** ~480 caracteres

Una opción intermedia sólida - margen suficiente para URLs más largas y vCards de varios campos, barata para comprar en cantidad. También es el chip que llevan dentro las figuras Nintendo Amiibo, que es por eso que las NTAG215 grabables son tan fáciles de encontrar.

#### NTAG216
- **Memoria:** 888 bytes (unos 868 utilizables)
- **Ideal para:** vCards completas, múltiples registros, contenido de texto más largo
- **Precio:** ~0,30-0,60 USD por etiqueta
- **Capacidad de URL:** ~850 caracteres

La mayor memoria de la línea NTAG de consumo, y la etiqueta que elegiría si solo compras una. El espacio extra significa que no te vas a quedar sin margen - vCards completas, múltiples registros, textos más largos, espacio para ediciones futuras - y es el estándar contra el que NFC.cool hace sus pruebas.

### Otros tipos de etiquetas que puedes encontrar

- **NTAG424 DNA** - Un chip avanzado con autenticación criptográfica. Aparece en la lucha contra la falsificación, la verificación de artículos de lujo y las nuevas normas del Pasaporte Digital de Producto de la UE. Excesivo para uso personal, genuinamente importante para trabajo comercial.
- **MIFARE Classic** - Un chip NXP antiguo usado en tarjetas de acceso y sistemas de transporte. No es una etiqueta estándar del NFC Forum, así que la compatibilidad con móviles es una lotería. Lo evitaría en proyectos personales.
- **ST25T** - La línea de etiquetas NFC de STMicroelectronics. Similar en función a la NTAG, menos común en productos de consumo.
- **ICODE** - Diseñada para el seguimiento en bibliotecas y logística. Probablemente nunca la toques.

### Guía de compra rápida

| Caso de uso | Etiqueta recomendada | Por qué |
|---|---|---|
| URL de sitio web | NTAG213 | Datos mínimos, la más barata |
| Tarjeta de visita digital | NTAG213 o NTAG215 | El enlace URL necesita ~100 caracteres |
| Compartir Wi-Fi | NTAG215 | Las credenciales pueden ser largas |
| vCard completa almacenada en la etiqueta | NTAG216 | Necesita más memoria |
| Activador de hogar inteligente | NTAG213 | Solo necesita un ID único |
| Antifalsificación | NTAG424 DNA | Verificación criptográfica |

**Dónde comprar:** Mi página de [etiquetas NFC recomendadas](/affiliate-links/) lista las pegatinas NTAG216 que uso y con las que hago pruebas. Las etiquetas en formato pegatina son las más versátiles - se pegan en casi cualquier cosa.

Mi consejo honesto: compra un pack de pegatinas NTAG216 y deja de darle vueltas. He visto a gente agonizar sobre los tipos de chip para un proyecto que una etiqueta de 20 céntimos resuelve sin problema. Si alguna vez quieres el análisis más detallado, hice un repaso chip a chip en [tipos de etiquetas NFC para iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Cómo funcionan las etiquetas NFC (la versión sencilla)

La gente espera que esto sea complicado. No lo es. Aquí está todo, de principio a fin:

1. **Transferencia de energía** - La antena NFC de tu móvil genera un campo electromagnético. Cuando una etiqueta entra en ese campo (~4 cm), el campo induce una pequeña corriente en la bobina de la antena de la etiqueta, y esa corriente alimenta el chip.

2. **Intercambio de datos** - El chip alimentado envía los datos almacenados de vuelta a tu móvil como ondas de radio moduladas a 13,56 MHz. El intercambio dura unos 100 milisegundos.

3. **Acción** - Tu móvil lee los datos y decide qué hacer. Una URL se abre en el navegador. Un número de teléfono ofrece llamar. Un registro de Wi-Fi ofrece conectarse. Un registro específico de una app abre la app correspondiente.

Sin emparejamiento. Sin PIN. Sin app necesaria para una lectura básica. Toca y listo.

### NDEF: el idioma que hablan las etiquetas

Los datos de una etiqueta NFC están estructurados usando **NDEF** (NFC Data Exchange Format, formato de intercambio de datos NFC). Pienso en NDEF como el idioma común que permite a cualquier móvil NFC entender cualquier etiqueta NFC.

Tipos comunes de registros NDEF:
- **URI** - Un enlace web (http, https, tel:, mailto:)
- **Text** - Texto plano en cualquier idioma
- **Smart Poster** - URL + título + icono combinados
- **Wi-Fi** - Nombre de red, contraseña y tipo de seguridad
- **vCard** - Información de contacto
- **MIME** - Cualquier tipo de dato personalizado, usado por apps para acciones propias

Cuando grabas una etiqueta en una app como NFC.cool Tools, estás creando registros NDEF. Cuando un móvil lee la etiqueta, interpreta esos registros y actúa en consecuencia. Ese es todo el modelo - en cuanto me quedó claro, todo lo demás sobre NFC cobró sentido.

---

## Leer etiquetas NFC

### En iPhone

Los iPhones gestionan las etiquetas de forma automática. En el **iPhone XS en adelante** (y en el iPhone SE de 3.ª generación), la lectura NFC funciona en segundo plano - acerca la parte superior del móvil a una etiqueta y la lee al instante, sin necesidad de abrir ninguna app. Los iPhones más antiguos (7, 8, X) necesitan que abras primero una app de lectura NFC.

Lo que ocurre al escanear depende de los datos:
- **URL** - aparece una notificación, toca para abrirla en Safari
- **Número de teléfono** - opción para llamar
- **App Clip** - lanza un App Clip si existe uno
- **Datos personalizados** - abre la app asociada

Si solo quieres ver qué hay en una etiqueta ahora mismo, también puedes [leer etiquetas NFC directamente desde el navegador](/online-nfc-reader/) en Android - sin instalar nada.

### En Android

La mayoría de los Android tienen NFC desde alrededor de 2012. La lectura está activada por defecto; encontrarás el interruptor en Ajustes, Dispositivos conectados, NFC. Toca una etiqueta y Android pasa los datos a la app más adecuada - las URLs al navegador, los contactos a la agenda, los registros personalizados a su app.

---

## Grabar etiquetas NFC

Esta es la parte que realmente me divierte. Grabar en una etiqueta significa programarla con los datos que quieras.

### Qué necesitas

1. Un móvil con NFC
2. Una app de grabación NFC (como **NFC.cool Tools** - disponible para [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-en&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-en))
3. Una etiqueta NFC en blanco o regrabable

### Cómo grabar una etiqueta

El proceso es breve:
1. Abre tu app de grabación NFC
2. Elige qué grabar (URL, texto, credenciales de Wi-Fi, contacto, etc.)
3. Introduce los datos
4. Acerca el móvil a la etiqueta
5. Espera la confirmación, normalmente en torno a un segundo

Eso es todo. La etiqueta ya tiene tus datos y funciona con cualquier móvil NFC que la lea. Si quieres el paso a paso específico para iPhone, escribí uno aquí: [cómo grabar etiquetas NFC en iPhone](/blog/write-nfc-tags-iphone/).

### Importante: bloquear etiquetas

Una vez grabada una etiqueta, puedes opcionalmente **bloquearla**. Bloquear la convierte en permanentemente de solo lectura - nadie puede sobreescribir ni borrar su contenido. No hay marcha atrás.

Trato el bloqueo como un paso deliberado y final, nunca algo que hacer a la ligera. Bloquea una etiqueta cuando:
- Esté en un lugar público (en un cartel, producto o tarjeta de visita)
- Quieras evitar que la manipulen
- Los datos no vayan a cambiar

Déjala sin bloquear cuando:
- Puedas querer actualizar los datos más adelante
- Todavía estés experimentando
- Esté en un entorno controlado, como tu casa

---

## 16 formas prácticas de usar etiquetas NFC

Podría listar cien. Estas son las que sigo usando - los usos que he visto que realmente se mantienen.

### En casa

**1. Compartir la red Wi-Fi de invitados**
Pega una etiqueta cerca de la puerta de entrada o en la habitación de invitados y prográmala con tus credenciales de Wi-Fi. Los invitados la tocan y se conectan al instante, sin tener que escribir una contraseña larga.

**2. Escenas de hogar inteligente**
Coloca etiquetas por la casa para activar automatizaciones. Toca la de tu mesita de noche para "buenas noches" (luces apagadas, alarma configurada, No molestar activado). Toca la de junto a la puerta para "saliendo de casa" (luces apagadas, termostato bajo, aspiradora en marcha).

**3. Despertador**
Pon una etiqueta en la cocina o en el baño y crea un atajo que solo desactiva la alarma matutina cuando la escaneas físicamente. Funciona - te obliga a levantarte de la cama.

**4. Manuales de electrodomésticos**
Pega una etiqueta en la lavadora o el lavavajillas y apúntala al PDF del manual. Nunca más tendrás que buscar un manual.

**5. Recordatorios de medicación**
Coloca una etiqueta en un bote de pastillas. Escanearla registra una marca de tiempo en una nota o en una hoja de cálculo, para tener un historial de cuándo la tomaste.

### En el trabajo

**6. Tarjetas de visita digitales**
El caso de uso NFC más popular en los negocios. En lugar de tarjetas de papel, una tarjeta de visita NFC comparte tus datos de contacto con un solo toque. [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-en&mt=8) te permite crear una tarjeta digital profesional y grabar su URL en cualquier etiqueta NFC de terceros - los destinatarios en iOS ven un App Clip nativo, los de Android abren un sitio web en el dominio nfc.cool, y ambos pueden guardar tu contacto con un toque.

**7. Registro en salas de reuniones**
Pon una etiqueta fuera de las salas de reuniones. Tocarla lanza tu calendario o registra la asistencia - más sencillo que cualquier sistema de reservas.

**8. Inicio de sesión en equipos compartidos**
Coloca etiquetas en dispositivos o herramientas compartidos. Escanearlas registra quién los ha usado y cuándo.

**9. Enlace rápido a documentos compartidos**
Pega una etiqueta en una pizarra o en el área de un proyecto, apuntando al drive compartido, la página de Notion o el tablero de tareas.

### De camino

**10. Bluetooth y navegación en el coche**
Pon una etiqueta en el soporte del coche. Tocarla conecta el Bluetooth, abre tu app de navegación e inicia tu lista de reproducción para conducir.

**11. Identificación de equipaje**
Mete una etiqueta NFC bloqueada con tus datos de contacto dentro del equipaje. Si lo encuentran, cualquiera con un móvil puede identificar al propietario.

**12. Etiqueta de identificación para mascotas**
Coloca una etiqueta en el collar de tu mascota con tus datos de contacto y su información médica - más duradera y con más datos que una chapa grabada.

**13. Inicio de sesión de gimnasio y entrenamiento**
Una etiqueta en tu bolsa de deporte o en la taquilla que abre tu app de entrenamiento con la rutina de hoy cargada.

### Usos creativos

**14. Pedidos en mesa de restaurante**
Si gestionas un restaurante, incorpora etiquetas en las mesas. Los clientes tocan para ver el menú, pedir o pagar. Muchos locales adoptaron esto durante el COVID y nunca volvieron atrás.

**15. Arte y exposiciones interactivas**
Los museos y galerías colocan etiquetas junto a las piezas para que los visitantes puedan tocar y acceder a audioguías, notas del artista o experiencias de RA.

**16. Yincanas y juegos**
Esconde etiquetas por un lugar, cada una revelando una pista o un acertijo. Genial para actividades de equipo, fiestas de niños o juegos al estilo escape room.

---

## Etiquetas NFC y Atajos de iOS

Esto es lo que más me gusta mostrarle a la gente. La app **Atajos** de Apple (integrada en iOS) tiene soporte nativo de activadores NFC, y es donde las etiquetas pasan de útiles a genuinamente potentes en iPhone.

Así se configura uno:
1. Abre la app Atajos
2. Ve a la pestaña **Automatización**
3. Toca **Nueva automatización**, luego **NFC**
4. Escanea la etiqueta que quieres usar como activador
5. Construye la automatización que quieras

Lo más inteligente: la etiqueta ni siquiera necesita tener datos grabados. Atajos reconoce la etiqueta por su ID de hardware único, así que una etiqueta completamente en blanco puede activar algo complejo:

- Iniciar un modo de concentración y un temporizador cuando tocas la etiqueta de tu escritorio
- Registrar tu hora de llegada en una hoja de cálculo cuando tocas la etiqueta de la oficina
- Enviar un mensaje a tu pareja "ya voy para casa" cuando tocas la etiqueta del coche
- Activar o desactivar dispositivos concretos del hogar inteligente

En Android, apps como **Tasker** y **MacroDroid** hacen el mismo tipo de automatización activada por NFC.

---

## Preguntas frecuentes

### ¿Las etiquetas NFC necesitan batería?
No. Las etiquetas NFC son completamente pasivas - se alimentan del campo del dispositivo lector. Nunca se agotan y pueden durar una década o más.

### ¿Se pueden hackear las etiquetas NFC?
Las etiquetas estándar no tienen cifrado por defecto, así que cualquiera con un móvil NFC puede leer una etiqueta desbloqueada y sin protección. Para la mayoría de los usos - compartir una URL, activar un atajo - no lo considero un problema. Para aplicaciones sensibles, usa una etiqueta con características criptográficas (como la NTAG424 DNA), o asegúrate de que la etiqueta solo activa una acción que requiere autenticación adicional.

### ¿A qué distancia tengo que acercar el móvil?
A unos 1-4 cm. En los iPhones la antena NFC está en la parte superior del móvil; en la mayoría de los Android está en la parte superior-central de la trasera. Encontrarás el punto exacto en unos pocos intentos.

### ¿Puedo regravar etiquetas NFC?
Sí, siempre que la etiqueta no esté bloqueada. La mayoría de las etiquetas soportan unos 100.000 ciclos de escritura, así que puedes reprogramarlas todas las veces que quieras. Una vez bloqueada, la etiqueta es permanentemente de solo lectura.

### ¿Cuántos datos puede almacenar una etiqueta NFC?
Depende del chip: la NTAG213 almacena ~144 bytes, la NTAG215 ~504 bytes, la NTAG216 ~888 bytes. Una URL típica ocupa entre 30 y 80 bytes. No es mucho - las etiquetas son mejores para datos cortos o como punteros a contenido en línea.

### ¿Las etiquetas NFC funcionan a través de fundas?
Sí. El NFC funciona a través de la mayoría de las fundas de móvil, pegatinas y materiales finos. Las fundas muy gruesas o metálicas pueden reducir el alcance. Si vas a pegar una etiqueta en metal, usa una diseñada para superficies metálicas - tiene una capa de blindaje de ferrita.

### ¿Cuál es la diferencia entre etiquetas NFC y tarjetas NFC?
Nada fundamental. Una tarjeta NFC es simplemente una etiqueta NFC en un cuerpo con forma de tarjeta - el chip y la antena son la misma tecnología. Las tarjetas suelen usar NTAG213 o NTAG215 y son populares para tarjetas de visita, tarjetas de acceso y programas de fidelización.

---

## Empezar: tu primer proyecto NFC

¿Quieres probarlo? Aquí tienes un proyecto de cinco minutos con el que empezaría a cualquiera:

**Proyecto: una etiqueta para compartir el Wi-Fi en casa**

1. **Compra etiquetas:** hazte con un pack de [pegatinas NTAG216](/affiliate-links/) (unos 10 USD por 25)
2. **Descarga NFC.cool Tools:** para [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-en&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-en)
3. **Graba tus credenciales de Wi-Fi:** abre la app, elige Grabar, luego Wi-Fi, introduce el nombre de tu red y la contraseña, y acerca el móvil a la etiqueta
4. **Coloca la etiqueta:** en algún lugar visible - junto a la puerta, en la nevera, en la habitación de invitados
5. **Pruébala:** tócala con otro móvil y deberías recibir una propuesta para unirte a la red

Coste total: unos 0,30 USD y dos minutos. Todos los invitados que pasen por casa te lo agradecerán.

---

## Para terminar

Las etiquetas NFC son una de esas tecnologías que parecen complejas y resultan ser sorprendentemente sencillas. Sin batería, sin emparejamiento, sin app necesaria para una lectura básica. Unos pocos céntimos compran un chip programable que dura años y funciona con miles de millones de móviles.

He construido mi trabajo en torno a estos pequeños chips, y sigo encontrándoles nuevos usos. Ya sea que quieras automatizar tu mañana, compartir tus datos de contacto o construir algo divertido - una etiqueta es el puente entre tocar un móvil y hacer que algo ocurra en el mundo real.

**¿Listo para empezar a programar etiquetas NFC?** Descarga [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-en&mt=8) para iPhone o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-en) - es la forma más sencilla que conozco de leer, grabar y gestionar etiquetas NFC.

**¿Quieres una tarjeta de visita digital con NFC?** Echa un vistazo a [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-en&mt=8) - comparte tu contacto con un solo toque. La interfaz de la app y el App Clip están disponibles en 35 idiomas.
