---
id: nfc-blog-015
title: "Cómo comprobar y restablecer el contador del cabezal de cepillo Philips Sonicare con NFC"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "Tu cepillo de dientes Sonicare tiene un chip NFC dentro de cada cabezal que cuenta hacia atrás hasta que compras uno de repuesto. Aquí te explico qué registra exactamente, y cómo comprobar tu uso o restablecer el contador con NFC.cool Tools."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "Cabezal de cepillo de dientes eléctrico con etiqueta NFC siendo restablecido con un móvil"
metaTitle: "Comprobar y restablecer el contador del cabezal de cepillo Philips Sonicare con NFC (2026)"
metaDescription: "Tu cabezal de cepillo Sonicare tiene un chip NFC que registra cuánto tiempo llevas cepillándote. Comprueba cuánta vida le queda y restablece el contador con NFC.cool Tools."
ogTitle: "Cómo comprobar y restablecer el contador del cabezal Sonicare"
ogDescription: "Cada cabezal de cepillo Sonicare tiene un chip NFC que cuenta hacia atrás hasta la sustitución. Consulta tus estadísticas de uso y restablece el temporizador si quieres."
---

Tu cepillo de dientes eléctrico te está espiando.

No de forma siniestra. En el sentido de "te hemos metido un pequeño chip NFC en el cabezal de cepillo para insistirte en que compres repuestos". Cada cabezal de repuesto Philips Sonicare lleva un NTAG213 incrustado en el plástico que registra cuánto tiempo llevas cepillándote y le dice al mango que parpadee con una luz de aviso cuando decide que tus tres meses han terminado.

Bienvenido a la Internet of Shit.

El caso es que tres meses es una recomendación, no un hecho médico. El desgaste de las cerdas depende de la fuerza con la que te cepilles, la pasta que uses y la frecuencia. El chip no mide el estado de las cerdas. Solo cuenta segundos. Alguien que se cepille con suavidad y use una pasta suave puede tener las cerdas perfectamente bien a los tres meses. El temporizador no lo sabe ni le importa.

NFC.cool Tools ya puede leer ese chip, mostrarte exactamente cuánta vida ha gastado tu cabezal de cepillo, y restablecer el temporizador si decides que las cerdas todavía están bien. Así es como funciona.

---

## Qué hay realmente en el chip

No hice yo mismo la ingeniería inversa de nada de esto. Cyrill Künzi [desmontó el protocolo](https://kuenzi.dev/toothbrush/) y mbirth [mapeó cada byte](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html), y entre los dos descubrieron todo lo que viene a continuación. Esto es lo que almacena el NTAG213 en tu cabezal de cepillo:

- **Tipo y color del cabezal** - un único byte en la página `0x1F` que identifica el modelo (Premium All-in-One, Gum Care, DiamondClean, etc.) y su color (el [mapa de memoria de mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) lista 22 tipos conocidos)
- **Vida útil objetivo** - en `0x21`, normalmente `0x5460` = 21.600 segundos, es decir, 180 sesiones de cepillado de dos minutos, o tres meses de uso dos veces al día
- **Código de fabricación** - en `0x21-0x23`, la fecha de producción y la línea en ASCII, como `241206 31K` (fabricado el 6 de diciembre de 2024, en la línea 31K). También impreso en el vástago
- **Tiempo de cepillado acumulado** - los dos primeros bytes de la página `0x24` almacenan el total de segundos que el cabezal ha estado en uso como un valor de 16 bits. Cuando llega a `0xFFFF` (65.535 segundos, unas 18 horas de cepillado continuo), el contador se detiene. Un cabezal nuevo empieza en `00:00:02:00` - los dos primeros bytes son cero (sin uso), el significado de los dos últimos bytes es actualmente desconocido
- **Última intensidad y modo** - también en `0x24`: Baja/Media/Alta y Clean/White+/Gum Health/Deep Clean+
- **Una URL** - que apunta a `philips.com/nfcbrushheadtap`, que se abre si tocas el cabezal con un lector NFC genérico

Cuando el tiempo acumulado supera el objetivo (21.600 segundos), el mango parpadea con su LED ámbar. Es el chip hablando, no las cerdas.

---

## Por qué puede que quieras restablecerlo

El intervalo de sustitución de tres meses es una recomendación de Philips, no una medición científica del desgaste de las cerdas. El chip cuenta segundos, no el desgaste de las cerdas. Si quieres decidir por ti mismo - mirando tus cerdas en lugar de obedecer a un temporizador de cuenta atrás - restablecer el contador te lo permite.

También puedes restablecerlo si alternas entre varios cabezales (viaje vs. casa) y quieres llevar tú mismo el control.

---

## Cómo funciona la contraseña

El NTAG213 está protegido por contraseña. Cada cabezal de cepillo tiene una contraseña única de 4 bytes. El mango del cepillo se autentica con ella cada vez que escribe en la etiqueta.

La contraseña se calcula a partir de dos entradas: el UID de 7 bytes de la etiqueta y el código de fabricación almacenado en la etiqueta (y impreso en el vástago). [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) hizo ingeniería inversa del algoritmo a partir del firmware de Sonicare después de que Cyrill Künzi captase originalmente la transmisión de la contraseña usando una radio definida por software.

⚠️**Importante:** el NTAG213 se bloquea permanentemente tras **tres intentos fallidos de contraseña**. El chip pasa a ser de solo lectura para siempre - ni siquiera el cepillo de dientes puede volver a escribir en él. No adivines.

---

## Cómo comprobar y restablecer con NFC.cool Tools

Así es como se ve en la app:

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools mostrando un cabezal de cepillo Sonicare al 80% de uso con el botón Restablecer temporizador" />
</figure>

NFC.cool Tools gestiona todo el proceso: leer la etiqueta, calcular la contraseña y mostrarte las estadísticas. Sin comandos hex, sin calculadoras web, sin SDR.

1. Abre **NFC.cool Tools** en tu iPhone
2. Ve a **Restablecer cabezal de cepillo**
3. Toca **Leer NFC** y acerca el cabezal de cepillo a tu móvil
4. La app muestra un **indicador de porcentaje** de cuánta vida ha gastado el cabezal, con el tiempo usado y el tiempo restante debajo
5. Toca **Restablecer temporizador** para poner el contador de uso de nuevo a cero, o escanea otro cabezal

Disponible ya en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8), próximamente en [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) en una actualización futura.

---

## Qué hace realmente el restablecimiento

Cuando restableces, estás escribiendo `00:00:02:00` en la página `0x24` - el mismo valor con el que viene de fábrica un cabezal de cepillo nuevo. Solo se ponen a cero los dos primeros bytes (el contador de uso). El significado de los dos últimos bytes es desconocido, así que la app los conserva.

El cepillo empieza a contar desde cero de nuevo, y la luz ámbar vuelve después de otros tres meses. En ese momento puedes comprobar tus cerdas y decidir por ti mismo.

---

## El panorama general: NFC en objetos cotidianos

Un cabezal de cepillo de dientes con un chip NFC que cuenta hacia atrás hasta tu próxima compra es el colmo de la Internet of Shit. He construido mi trabajo alrededor del NFC porque creo que es genuinamente útil, pero incrustarlo en plástico desechable específicamente para empujarte a comprar más es... una elección.

El mismo chip NTAG213 también se usa para cosas que realmente sirven al consumidor: autenticación de productos, control de accesos, y pronto el Pasaporte Digital de Producto de la UE, que exigirá etiquetas NFC en productos de consumo para que puedas verificar qué estás comprando y de dónde viene. Eso es el NFC siendo usado *a tu favor*, no en tu contra.

NFC.cool Tools lee y escribe todo esto. La función Sonicare es un ejemplo de entender qué hay en las etiquetas a tu alrededor, y decidir qué hacer con esa información.

---

## Para seguir leyendo

- [El artículo original de ingeniería inversa de Cyrill Künzi](https://kuenzi.dev/toothbrush/) - captura con SDR, extracción de contraseña y el primer análisis detallado del protocolo NFC de Sonicare
- [El generador de contraseñas de Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - el algoritmo extraído del firmware de Sonicare
- [El mapa de memoria del NTAG213 de mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - documentación detallada de cada byte en el chip

*¿Tienes un cabezal de cepillo Sonicare que comprobar? [Descarga NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) (restablecimiento de Sonicare llegando pronto a Android) y comprueba qué ha estado registrando tu cepillo de dientes.*
