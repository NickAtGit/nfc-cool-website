---
id: batch-write-nfc-tags-csv-2026-09
title: "Cómo escribir etiquetas NFC por lotes desde una hoja de cálculo"
date: 2026-09-05
tags: ["guides", "nfc-tags", "iphone"]
summary: "Reparto códigos promocionales de la App Store en etiquetas NFC en conferencias y meetups, y a estas alturas ya van cientos. Así las escribo, y sirve para cualquier lista: prepárala en una hoja de cálculo, exporta un CSV, pasa el archivo al móvil y deja que NFC.cool Tools escriba una etiqueta tras otra."
image: "/assets/images/Features/nfc-reader-writer-csv-batch-write.webp"
imageAlt: "Un iPhone con un archivo de hoja de cálculo en pantalla escribiendo las filas de la hoja en una hilera de etiquetas NFC"
author: "Nicolo Stanciu"
metaTitle: "Escribir etiquetas NFC por lotes desde CSV en iPhone y Android"
metaDescription: "Programa cientos de etiquetas NFC desde una hoja de cálculo: haz la lista, expórtala como CSV, pásala al móvil y deja que NFC.cool Tools las escriba una tras otra."
ogTitle: "Escribir etiquetas NFC por lotes desde una hoja de cálculo"
ogDescription: "De un CSV en tu ordenador a un montón de etiquetas NFC escritas, un toque por etiqueta. Así preparo cientos de etiquetas con códigos promocionales para las conferencias."
---
Voy a conferencias y meetups a enseñar mis apps, y cuando una conversación ha ido bien me gusta despedirme con una etiqueta NFC que lleva un código promocional. Acercas el móvil a la etiqueta, se abre la App Store con el código ya puesto y tienes la app.

Las etiquetas nunca fueron el problema. El problema era la cantidad. Cada código promocional es distinto, así que cada etiqueta necesita su propio enlace, y yo quería unos cuantos cientos. Escribirlas de una en una en la app no era viable a esa escala. Por eso integré la **escritura por lotes CSV** en NFC.cool Tools: preparo la lista en el Mac, la exporto como CSV, paso el archivo al móvil y luego voy acercando una etiqueta tras otra mientras la app recorre las filas. A estas alturas ya he escrito cientos de etiquetas así.

Aquí va el proceso completo, desde la hoja de cálculo hasta la última etiqueta. Funciona igual para enlaces de productos, números de serie, credenciales de Wi-Fi o cualquier otra cosa que quepa en una celda.

---

## Qué hace exactamente la escritura por lotes CSV

Le das a la app un archivo CSV y cada fila se convierte en una etiqueta. La app te enseña una vista previa de lo que irá en cada una, pulsas Empezar a escribir y vas acercando una etiqueta tras otra al móvil. Cada fila escrita se elimina del archivo, así que la lista que ves en pantalla es siempre lo que queda por hacer. Puedes parar en cualquier momento y seguir más tarde, incluso días después.

Si nunca has escrito una etiqueta NFC, empieza por mi [guía para escribir etiquetas NFC con el iPhone](/blog/write-nfc-tags-iphone/). Este artículo va de escribir muchas.

---

## Paso 1: prepara la hoja de cálculo en el ordenador

Abre Numbers, Excel o Google Sheets y haz la lista en el ordenador. Es mucho más rápido que hacer cualquier cosa en el móvil, y además la hoja de cálculo puede construir los enlaces por ti.

La disposición más sencilla es **una columna con una fila por etiqueta**. Cada fila es exactamente lo que contendrá una etiqueta. Una columna de enlaces a productos tiene esta pinta:

```
https://example.com/products/1001
https://example.com/products/1002
https://example.com/products/1003
```

Si tus valores solo se diferencian en un número o un ID, deja que una fórmula construya la columna. Escribe el primero, arrastra hacia abajo para rellenar, y tienes la lista hecha, por larga que sea. Si ya tienes los ID en un archivo, ábrelo en la hoja de cálculo y añade la parte fija por delante con una fórmula.

La app mira cómo empieza cada valor y elige el tipo de registro que corresponde:

- Un enlace (`https://`, `http://` o `www.`) se convierte en un registro de URL. Acercas el móvil a la etiqueta y el navegador lo abre.
- `tel:`, `mailto:`, `sms:` y `geo:` se convierten en la acción correspondiente, así que una etiqueta puede marcar un teléfono, abrir un correo nuevo o mostrar una ubicación.
- `WIFI:T:WPA;S:MyNetwork;P:secret;;` se convierte en un registro de Wi-Fi, el mismo formato que usa un código QR de Wi-Fi. Con una pega: esa cadena lleva puntos y comas, así que la app dará por hecho que el archivo está separado por puntos y comas y la partirá en trozos. Pon el delimitador en coma dentro de la app y la fila se queda entera.
- `shortcuts://` ejecuta un atajo de iOS.
- Todo lo demás se escribe como texto plano.

Mantén cada valor en una sola línea. El archivo se lee línea a línea, así que una tarjeta de contacto que ocupe varias líneas acabaría repartida en varias etiquetas.

Dos cosas a tener en cuenta:

1. **Sin fila de encabezado.** La app trata cada línea no vacía como contenido. Si tu primera fila dice "URL", la primera etiqueta contendrá la palabra URL.
2. **Las filas vacías no molestan.** Se saltan, igual que los espacios alrededor de un valor.

### Cuando una etiqueta necesita varios registros

A veces una etiqueta tiene que llevar más de una cosa, por ejemplo una web, un teléfono y un correo por persona. Para eso añades columnas. En la app, en **Agrupar por** eliges **Por filas** y cada fila se convierte en una etiqueta con un registro por celda. **Por columnas** hace lo contrario y convierte cada columna en una etiqueta, por si montaste la hoja al revés. Si el archivo tiene una sola columna, lo que aparece es el ajuste **Filas por etiqueta**, para que tres filas puedan ir en una misma etiqueta como tres registros.

---

## Paso 2: exporta la hoja como CSV

Un archivo CSV no es más que un archivo de texto. Una línea por fila, y las celdas de cada fila separadas por una coma, un punto y coma o un tabulador. Si abres uno en TextEdit o en el Bloc de notas ves exactamente lo que verá la app. Una hoja con un enlace y un teléfono por persona queda así después de exportarla:

```
https://example.com/anna,tel:+4915112345678
https://example.com/ben,tel:+4915198765432
```

El formato y las fórmulas no sobreviven a la exportación, solo los valores. Así se saca ese archivo de Numbers, Excel y Google Sheets.

### Numbers en el Mac

1. Elige **Archivo**, luego **Exportar a** y después **CSV**.
2. Si tu documento tiene más de una tabla, Numbers te pregunta si quieres un archivo por tabla o combinarlas. Lo que te interesa es una sola tabla en un solo archivo.
3. Deja **Incluir nombres de tablas** sin marcar. Si no, Numbers escribe el nombre de la tabla en el archivo como una línea más, y esa línea acabaría en una etiqueta.
4. En **Opciones avanzadas**, deja la codificación de texto en Unicode (UTF-8).
5. Haz clic en **Siguiente**, ponle nombre al archivo y haz clic en **Exportar**.

Dos cosas sobre Numbers: cada tabla nueva viene con una fila de encabezado sombreada, y lo que escribas ahí se exporta como cualquier otra fila, así que déjala vacía o bórrala. Y Numbers usa siempre comas. Si un valor contiene una coma, Numbers lo envuelve entre comillas, y la app no quita esas comillas. Así que cuando exportes desde Numbers, nada de comas dentro de los valores.

### Excel en Mac o Windows

1. Elige **Archivo** y luego **Guardar como** (algunas versiones lo llaman Guardar una copia).
2. Escoge el formato **CSV UTF-8 (delimitado por comas) (.csv)**.
3. Excel guarda solo la hoja que tienes abierta y avisa de que se perderá el formato. Confirma, el formato no te hace falta.

A pesar del nombre, Excel no siempre usa comas. Usa el separador de listas de la configuración regional de tu sistema, y en un sistema configurado para España, Alemania, Francia o la mayoría de países europeos ese separador es el punto y coma, porque la coma ya está ocupada como separador decimal. No tienes que cambiar nada. NFC.cool detecta automáticamente coma, punto y coma y tabulador. Y eso, de paso, significa que tus valores sí pueden llevar comas.

### Google Sheets

1. Elige **Archivo**, luego **Descargar** y después **Valores separados por comas (.csv)**.
2. Solo se exporta la hoja actual, siempre con comas.

### Antes de pasar el archivo al móvil

Yo, antes de pasar el archivo al móvil, lo abro una vez en un editor de texto. Lo que quieres es una línea por etiqueta, ninguna línea de encabezado, ninguna comilla alrededor de los valores y ninguna coma suelta dentro de un archivo separado por comas. Si un valor tiene que llevar una coma sí o sí, exporta con puntos y comas desde Excel, o usa la exportación TSV de Numbers (separado por tabuladores) y renombra el archivo para que acabe en `.csv`. En el iPhone el archivo tiene que terminar en `.csv` de todas formas, porque es lo que filtra el selector de archivos.

---

## Paso 3: pasa el archivo al móvil

Vale cualquier camino que termine en la app Archivos del iPhone, o en un sitio al que llegue el selector de archivos del sistema en Android.

- Envía el archivo por **AirDrop** del Mac al iPhone y elige Guardar en Archivos.
- **iCloud Drive:** guarda el CSV en iCloud Drive en el Mac y aparece en la app Archivos del móvil. Google Drive y Dropbox funcionan igual, la app Archivos también puede abrirlos.
- **Envíatelo por correo** y guarda el adjunto.
- **Android:** Quick Share desde un portátil, Google Drive o un cable USB. La app usa el selector de documentos del sistema, así que vale cualquier ubicación que pueda abrir.

---

## Paso 4: importa el archivo y revisa la vista previa

En NFC.cool Tools, abre la pantalla de herramientas NFC y busca **Escritura por lotes CSV** dentro de **Modos por lotes**. En Android también está en la lista de herramientas NFC. Pulsa **Importar CSV** y elige tu archivo.

La app hace su propia copia del archivo. A medida que escribes etiquetas, las filas se van eliminando de esa copia. Tu hoja de cálculo original en el ordenador se queda como está, así que siempre conservas la lista completa.

Una vez elegido el archivo, la app muestra lo que ha detectado: el delimitador, el número de columnas, el modo de agrupación y cuántas etiquetas vas a necesitar. El número que yo compruebo siempre es **Bytes por etiqueta NFC**, el tamaño del mensaje más grande del lote. Compáralo con tus etiquetas. Una NTAG213 tiene capacidad para 144 bytes, una NTAG215 para 504 y una NTAG216 para 888. Un enlace corto ronda los 50 bytes, así que para enlaces sirven las etiquetas más baratas. Un registro de Wi-Fi o una tarjeta de contacto larga necesita una 215 o una 216. Si no estás seguro de qué chip tienes, échale un vistazo a mi [guía sobre los tipos de etiquetas NFC](/blog/nfc-tag-types-for-iphones/).

Abre **Vista previa de lotes** para ver cada etiqueta con los registros que va a recibir. Lo que ves ahí es exactamente lo que se va a escribir.

---

## Paso 5: escribe las etiquetas, una tras otra

Pulsa **Empezar a escribir** y acerca la primera etiqueta al borde superior del iPhone. Cuando el móvil vibra, la etiqueta está escrita y coges la siguiente. La fila que acabas de escribir desaparece de la lista y el contador te dice cuántas quedan.

Unas cuantas cosas que van a pasar y son normales:

- **La hoja de escaneo desaparece a los 60 segundos.** Es un límite de iOS, no un fallo. Vuelve sola al cabo de unos segundos y sigues donde estabas.
- **Una etiqueta falla.** Quizá estaba bloqueada, quizá la retiraste demasiado pronto. La fila se queda en el archivo, la app no salta a la siguiente, y vuelves a acercar la misma etiqueta o coges otra.
- **Tienes que parar.** Cierra la app, haz otra cosa, vuelve mañana. El archivo recuerda lo que falta. En Android la app te muestra el lote sin terminar y te ofrece retomarlo.

Con cien etiquetas se tarda poco una vez que coges el ritmo.

---

## Lo que he aprendido después de escribir cientos de etiquetas

**Escribe dos etiquetas primero.** Luego léelas con la app y comprueba que hacen lo que deben. Solo entonces escribe el resto.

**No necesitas el chip más grande.** Para enlaces, una NTAG213 sobra y sale bastante más barata al por mayor. Reserva la NTAG216 para tarjetas de contacto y Wi-Fi.

**Bloquea o protege con contraseña las etiquetas que regalas.** Justo al lado de Escritura por lotes CSV están los modos Bloqueo por lotes y Protección con contraseña por lotes. El bloqueo deja la etiqueta en solo lectura para siempre; con la contraseña tú puedes cambiarla más adelante, pero nadie más. Para las etiquetas que salen de tus manos, pásalas después por uno de esos dos modos para que nadie pueda sobrescribir el contenido.

La escritura por lotes CSV está en [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-batch-write-nfc-tags-csv-es&mt=8) y [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-batch-write-nfc-tags-csv-es). Y si me ves en una conferencia o en un meetup, pídeme una etiqueta.
