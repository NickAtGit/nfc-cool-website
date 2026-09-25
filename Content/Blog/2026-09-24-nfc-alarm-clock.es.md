---
id: "nfc-alarm-2026-09"
title: "Despertador NFC para iPhone: escanea tus etiquetas para apagar la alarma"
date: "2026-09-24"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Las noches programando hasta tarde siempre acababan perdiendo contra el botón de posponer, así que metí Alarma NFC en NFC.cool Tools: una alarma para iPhone que no se calla hasta que recorres un camino de etiquetas NFC por tu casa. Te cuento cómo funciona y cómo me las apañé con el botón Detener que Apple pone en todas las alarmas."
image: "/assets/images/Blog/nfc-alarm-clock.webp"
imageAlt: "Un iPhone con el anillo de escaneo de una alarma en 2 de 3 junto a una cafetera con una pegatina NFC, y un rastro punteado de etiquetas NFC que vuelve por una estantería del pasillo hasta la cama"
author: "Nicolo Stanciu"
metaTitle: "Despertador NFC para iPhone: escanea etiquetas para apagarlo"
metaDescription: "Una alarma para iPhone que solo se apaga cuando escaneas tus etiquetas NFC en orden. Cómo hice Alarma NFC con AlarmKit y cómo esquiva el botón Detener."
ogTitle: "El despertador con el que no hay posponer que valga"
ogDescription: "Alarma NFC no se calla hasta que recorres un camino de etiquetas NFC por tu casa. Así funciona en el iPhone."
---
Ser desarrollador independiente tiene un ritmo al que el horario de oficina le da igual. Donde mejor programo es de noche, cuando dejan de llegar mensajes y la casa está en silencio, y cuando me doy cuenta ya son las dos de la mañana. La alarma, claro, sigue sonando a la misma hora de siempre. Y yo le doy a posponer. Y otra vez. Y una tercera, hasta que media mañana de la que tenía planeada se me ha esfumado.

Estuve un tiempo dándole vueltas a qué podía hacer de verdad. ¿Una alarma más fuerte? Acabaría acostumbrándome a dormir con ella. ¿Dejar el móvil en la otra punta de la habitación? Iría hasta allí, pulsaría Detener y volvería a meterme en la cama. El problema nunca fue no oír la alarma. El problema era que para apagarla bastaba un toque, sin pensar nada.

Y entonces se me ocurrió: me paso el día haciendo una app para etiquetas NFC. ¿Por qué no juntar las dos cosas y montar un recorrido de etiquetas que tenga que seguir cada mañana antes de que la alarma me deje en paz?

Así nació **Alarma NFC**, que ya forma parte de NFC.cool Tools en iPhone. La versión para Android llegará pronto.

---

## De la cama a la cafetera

Mi recorrido tiene tres paradas. La primera etiqueta está junto a la cama. La segunda, en una estantería del pasillo. La tercera va pegada a la cafetera.

Cuando suena la alarma, tengo que escanear las tres, y en ese orden. La de la cama es fácil, la tengo al lado. Pero luego toca levantarse e ir hasta el pasillo, y cuando llego a la cafetera ya estoy en pie, justo en el sitio donde empieza mi mañana. A esas alturas, volver a la cama sería un poco absurdo. Ya puestos, me hago un café.

El orden importa. Si las etiquetas se pudieran escanear en cualquier orden, podrías tener las tres en la mesilla y terminar sin moverte. Por eso la app espera a la siguiente etiqueta del recorrido, y si le acercas la que no toca, te lo dice: "Esta no es Pasillo". Cuando escaneas la última, sale un poco de confeti, un "Buenos días" y la alarma queda apagada por hoy. Mañana vuelve a sonar como siempre.

Y sí, funciona. El recorrido me saca de la cama, y eso no lo había conseguido ninguna alarma hasta ahora.

---

## El botón Detener que no pude quitar

Esta fue la parte que más me hizo pensar. Alarma NFC está construida sobre **AlarmKit**, el framework de Apple que permite a las apps hacer sonar una alarma de verdad, de las que suenan aunque el iPhone esté en silencio y ocupan la pantalla bloqueada igual que las de la app Reloj. Es justo lo que necesita una app de alarmas, con una pega: cada alarma de AlarmKit trae un botón **Detener** que dibuja el propio sistema. Una app no puede quitarlo, ni esconderlo, ni cambiarle el aspecto.

Así que, sobre el papel, una alarma que se empeña en que vayas hasta tus etiquetas viene con un botón que la apaga de un toque. No es lo ideal.

Mi solución: una Alarma NFC no es una sola alarma, sino toda una cadena. Después de la hora que eliges, la app programa avisos de refuerzo separados por unos minutos. Por defecto son 20 más, con un minuto entre uno y otro, y puedes elegir 5, 10, 15 o 20 avisos y una separación de 1, 2, 3 o 5 minutos. Pulsar Detener en la pantalla bloqueada solo silencia el que está sonando en ese momento. Un minuto después, salta el siguiente. Solo escanear el recorrido entero cancela el resto de la cadena de esa mañana, y la alarma sigue puesta para el día siguiente.

Piensa en el botón Detener como en un botón de silencio con una batería que dura muy poquito.

AlarmKit le da a cada app exactamente un botón propio junto a Detener. La mayoría de apps de alarmas pondrían ahí el de posponer. Yo lo usé para **Escanear para detener**, que abre la app directamente en la pantalla de escaneo. Así que en la pantalla bloqueada no hay botón de posponer, y es a propósito.

Dos detalles más pequeños que salieron de probarla conmigo mismo:

- Mientras estás escaneando, el sonido se pausa. Nadie quiere una alarma pitándole en la mano mientras acerca el móvil a una etiqueta. Eso sí, si lo dejas a medias, el siguiente aviso de la cadena vuelve a sonar igualmente.
- Mientras la alarma está sonando, la app no te deja desactivarla, borrarla ni editarla desde la lista de alarmas. Esos resquicios los descubrí por las malas: a las 7 de la mañana, muerto de sueño y con una imaginación desbordante.

---

## La salida de emergencia

Las etiquetas se pierden. Se despega la pegatina de la cafetera, una etiqueta se rompe o pasas la noche fuera de casa. Una alarma que no se pudiera apagar nunca sería una idea malísima, así que en la pantalla de escaneo hay una **Parada de emergencia** que funciona siempre, tengas las etiquetas o no.

Pero te pide que escribas esta frase, palabra por palabra:

"Por favor para, ya sé que tengo que volver a configurar todas mis etiquetas."

Lo hice así a propósito. Quería que la salida tardara más o menos lo mismo que hacer el recorrido, para que nunca fuera el camino fácil. Y tiene un precio de verdad: la parada de emergencia detiene y borra *todas* las alarmas, así que después te toca volver a configurar todas tus etiquetas. Está pensada para cuando algo se ha estropeado de verdad, no para ese martes en el que la cama está más a gusto que nunca. La hice para castigarme a mí mismo, y cumple.

---

## Por qué NFC y no una foto del lavabo

Hay apps de alarma que te obligan a hacerle una foto al lavabo o a escanear el código de barras de la pasta de dientes. Funcionan. Pero a mí para esto me gusta el NFC, y no solo porque vaya en el nombre de mi app.

Una etiqueta NFC, por sí sola, no es más que un trocito de metal. Un chip diminuto con un ID y nada más, quieto en una estantería. Lo que más disfruto de hacer NFC.cool es darle sentido a ese trocito de metal: convertir una pegatina de unos céntimos en algo que de verdad pinta algo en tu día a día. Con Alarma NFC, la etiqueta ni siquiera necesita tener contenido. La app reconoce cada una por el ID del chip y no escribe nada en ella. Vale cualquier etiqueta, también ese paquete de pegatinas de repuesto que tienes en un cajón. Y la luz le da igual: escanear una etiqueta funciona en un pasillo a oscuras, donde una cámara lo tendría difícil, y no hace falta apuntar a nada.

Si todavía no tienes etiquetas, en mi [guía de etiquetas NFC para principiantes](/blog/nfc-tags-beginners-guide/) te explico cuáles comprar.

---

## Cómo configurarla

Alarma NFC necesita un iPhone con iOS 26 o posterior, porque AlarmKit solo existe a partir de ahí. La encontrarás en la pestaña NFC, dentro de **Aplicaciones NFC**. Crea una alarma, elige la hora y los días, y luego escanea las etiquetas que quieras en el orden en que las vas a recorrer. Puedes ponerle un nombre a cada una para saber cuál toca después. Colócalas en un recorrido que de verdad te obligue a salir de la cama. Junto a la cama es un buen comienzo, y la cocina, un final todavía mejor.

Alarma NFC es gratis y está en [NFC.cool Tools en la App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-alarm-clock-es&mt=8). Tu cafetera te está esperando.
