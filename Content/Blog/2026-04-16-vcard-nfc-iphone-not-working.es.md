---
id: nfc-blog-013
title: "Por qué las etiquetas NFC con vCard no funcionan en iPhone (y qué sí funciona)"
date: 2026-04-16
tags: ["nfc-tags", "business-cards", "guides", "iphone"]
summary: "¿Tu tarjeta de visita NFC con vCard funciona en Android pero no en iPhone? Aquí te explico por qué iOS ignora los datos vCard - y la solución sencilla que funciona en cualquier móvil."
image: "/assets/images/Blog/vcard-nfc-iphone-not-working.webp"
imageAlt: "iPhone mostrando los pasos para solucionar el problema de una tarjeta de visita NFC con vCard"
metaTitle: "Por qué las etiquetas NFC con vCard no funcionan en iPhone | NFC.cool"
metaDescription: "¿Tu tarjeta de visita NFC con vCard funciona en Android pero no en iPhone? Aquí te explico por qué iOS ignora los datos vCard - y la solución sencilla que funciona en cualquier móvil."
ogTitle: "Por qué las etiquetas NFC con vCard no funcionan en iPhone"
ogDescription: "Los iPhones ignoran silenciosamente los datos vCard en las etiquetas NFC. Aquí te explico por qué - y qué funciona en su lugar."
---
Llevo años desarrollando apps de NFC. Y cada semana - sin falta - alguien me manda un email con alguna variante de esto:

> "Hola, me compré una tarjeta de visita NFC. Le grabé mi vCard. Funciona de maravilla en el Android de mi amigo. Pero cuando la acerco a mi iPhone, ¿no pasa nada. ¿Mi tarjeta está rota?"

Tu tarjeta no está rota.

Tu iPhone simplemente no soporta vCard en etiquetas NFC. Y probablemente nunca lo hará.

Déjame explicarte por qué - y qué funciona en su lugar.

---

## Por qué las etiquetas NFC con vCard no funcionan en iPhone

Esto es lo que pasa cuando acercas una etiqueta NFC con datos vCard:

**En Android:** se abre la app Contactos. Ves los datos del contacto. Tocas guardar. Listo. Perfecto.

**En iPhone:** nada. Literalmente no pasa nada. Sin ventana emergente. Sin mensaje de error. Solo tu iPhone ahí parado, ignorándote en silencio.

La primera vez que vi esto en una conferencia, la persona que estaba tocando me miró como si *yo* fuera el que estaba roto.

**¿Por qué ocurre esto?**

Según la documentación para desarrolladores de Apple, la lectura en segundo plano de etiquetas NFC en iPhone solo admite tipos de datos específicos:

- ✓ URLs web (http:// y https://)
- ✓ Números de teléfono (tel:)
- ✓ Enlaces SMS (sms:)
- ✗ Archivos de contacto vCard - **no soportados**

Cuando tu iPhone detecta una etiqueta NFC con datos vCard, simplemente los ignora. Sin alternativa. Sin mensaje de error útil. Nada y punto.

Android gestiona los vCards de forma nativa porque Google decidió que tenía sentido. Apple decidió que las URLs eran suficiente.

Yo no hago las reglas. Solo construyo a su alrededor.

---

## Pero espera - ¿una app no puede leer vCards en iPhone?

Técnicamente, sí. Si instalas una app lectora de NFC como [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8) en iPhone o [NFC.cool Tools en Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-en), puede leer los datos en bruto de la etiqueta - incluidos los registros vCard - y mostrar los datos del contacto. En Android, [NFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-en) lo hace automáticamente cuando detecta un vCard en una etiqueta.

Pero aquí está el problema: **la persona que escanea tu tarjeta necesita tener la app instalada de antemano.**

En un evento de networking, eso significa: *"Oye, antes de escanear mi tarjeta, ¿puedes ir a la App Store, buscar una app de NFC, descargarla, esperar a que se instale, abrirla, conceder los permisos de NFC, y luego escanear?"*

Ya se han ido. La magia desapareció.

El objetivo del NFC es *tocar y listo*. En el momento en que añades pasos extra, has perdido.

NFC.cool Tools es genial para leer y escribir etiquetas NFC - lo construí exactamente para eso. Pero para compartir tus datos de contacto con desconocidos, necesitas algo que funcione sin ninguna app de su parte.

---

## La solución: tarjetas de visita NFC basadas en URL

Lo que nadie te dice cuando compras una tarjeta de visita NFC:

**No deberías almacenar datos de contacto en la etiqueta en absoluto.**

En su lugar, guarda una URL que apunte a un perfil digital.

Eso es exactamente lo que hace [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8). En lugar de meter datos vCard en la etiqueta (donde los iPhones los ignoran), guardamos un enlace inteligente a tu perfil digital.

**Cuando alguien toca tu tarjeta:**

- iPhone → Se abre el enlace → Carga un perfil bonito → Guardar contacto con un toque
- Android → La misma experiencia → Funciona a la perfección
- Cualquier smartphone → Compatibilidad universal

Sin app necesaria para quien recibe tu tarjeta. Sin tutoriales. Sin fricciones.

Toque. Perfil. Guardar. Listo.

---

## Por qué un perfil digital es mejor que un vCard

Cuando construí esta solución por primera vez, pensé que era solo una solución provisional para las limitaciones de Apple.

Luego me di cuenta: este enfoque es genuinamente *mejor* que los vCards.

**Lo que te da un vCard:** nombre. Número de teléfono. Email. Quizás un cargo. Eso es todo. Datos estáticos de 2005.

**Lo que te da un perfil digital basado en URL:**

▸ **Todos tus enlaces en un solo lugar**
LinkedIn, Twitter, Instagram, tu portfolio, tu enlace de reserva de Calendly - todo accesible con un toque.

▸ **Funciones inteligentes de networking**
¿Sabes eso de conocer a alguien, guardar su contacto, y dos semanas después estar mirando "Juan - Conferencia" sin tener ni idea de quién es Juan?

NFC.cool te permite capturar el contexto: dónde os conocisteis, de qué hablasteis, notas de seguimiento. Es como un CRM que no cuesta 50 $/mes.

▸ **Integración con Apple Wallet**
Tu tarjeta de visita digital vive en Apple Wallet. ¿Dejaste tu tarjeta NFC física en casa? Solo muestra el móvil.

▸ **Actualiza cuando quieras**
¿Cambiaste de trabajo? ¿Nuevo número de teléfono? Actualiza tu perfil una vez - todos los que tienen tu enlace ven la nueva información al instante. Sin reimprimir tarjetas. Sin reprogramar etiquetas.

Los vCards no pueden hacer nada de esto. Quedan congelados en el tiempo en el momento en que los escribes.

▸ **Funciona en cualquier móvil**
A diferencia del vCard, un perfil basado en URL funciona en cualquier smartphone - iPhone, Android, incluso dispositivos más antiguos con solo un navegador. La [app NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8) en iOS usa un [App Clip](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8), así que quien recibe ni siquiera necesita instalar nada. En Android, [NFC.cool Business Card](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-en) (dentro de NFC.cool Tools) abre un perfil web al instante.

---

## FAQ

**¿Apple alguna vez soportará vCard en etiquetas NFC?**

Han pasado años y Apple no ha cambiado este comportamiento. La lectura NFC en segundo plano ha seguido limitada a URLs, números de teléfono y enlaces SMS desde el iPhone XS. Yo no contaría con que cambie.

**¿Esto afecta a todos los iPhones?**

Sí. Todos los iPhones con lectura NFC en segundo plano (iPhone XS y posteriores con iOS 13+) ignoran los datos vCard en las etiquetas NFC.

**¿Puedo leer etiquetas NFC con vCard en iPhone de alguna manera?**

Solo con una app lectora de NFC instalada. [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8) en iPhone y [NFC.cool Tools en Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-en) pueden leer y mostrar datos vCard de etiquetas NFC. Android lo hace de forma nativa sin app; iPhone requiere una. Pero para compartir tarjetas de visita, el mejor camino es [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8) - sin necesidad de ninguna app en el lado de quien recibe.

**¿Qué etiquetas NFC funcionan mejor para las tarjetas de visita digitales?**

Cualquier etiqueta NTAG213 o NTAG215 funciona perfectamente. Los datos almacenados son solo una URL, así que no necesitas mucha memoria.

**¿Puedo escribir etiquetas NFC con mi iPhone?**

Sí - [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8) te permite escribir URLs y otros datos en etiquetas NFC directamente desde iPhone. Soporta todos los tipos de registro NDEF habituales y funciona con cualquier etiqueta NTAG.

---

## La conclusión

Si tu tarjeta de visita NFC usa datos vCard, es invisible para la mitad de tu audiencia. Los iPhones no la leerán sin una app - y no puedes pedirle a cada nuevo contacto que instale una.

La solución no es un parche - es un enfoque fundamentalmente mejor:

1. Guarda una URL en lugar de datos de contacto
2. Haz que esa URL apunte a un perfil digital rico
3. Deja que el perfil gestione el guardado del contacto, el intercambio de enlaces y todo lo demás

Eso es lo que hace NFC.cool Business Card. Es lo que uso en cada conferencia, meetup y evento de networking.

Yo toco. Ellos guardan. Los dos seguimos con nuestras vidas.

**Así es como debería funcionar.**

*NFC.cool Business Card está disponible en la [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8) y en [Android (dentro de NFC.cool Tools)](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-en). NFC.cool Tools (lector y escritor de etiquetas) está disponible en la [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-en&mt=8) y en [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-en).*
