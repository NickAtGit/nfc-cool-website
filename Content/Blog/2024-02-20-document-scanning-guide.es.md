---
id: nfc-blog-024
title: "Escáner de documentos siempre en el bolsillo con NFC.cool Tools"
date: 2024-02-20
tags: ["guides", "iphone"]
summary: "Una guía práctica sobre el escáner de documentos de NFC.cool: cómo capturar escaneos nítidos, por qué importa el paso de posprocesado y cómo el OCR convierte el escaneo en texto buscable y PDFs."
metaTitle: "Escáner de documentos con NFC.cool Tools - una guía práctica"
metaDescription: "Cómo escanear documentos con NFC.cool Tools - capturar, posprocesar, ejecutar OCR y exportar como PDFs buscables. Con consejos sobre iluminación y detección de esquinas."
ogTitle: "Escáner de documentos siempre en el bolsillo con NFC.cool Tools"
ogDescription: "Cómo escanear documentos, ejecutar OCR y exportar PDFs buscables con NFC.cool Tools."
image: "/assets/images/Blog/document-scanning-guide.webp"
---
Un iPhone moderno tiene suficiente cámara y potencia de procesamiento como para que "escanear un documento" ya no sea una función de la impresora - es un toque. El escáner de documentos de NFC.cool Tools está construido sobre el framework Vision de Apple, lo que significa captura rápida, detección automática de bordes y OCR que se ejecuta completamente en el dispositivo.

Así es como sacarle el máximo partido.

---

## Captura: mano firme, la luz importa

Abre NFC.cool Tools, toca el icono de documento y encuadra la página. El escáner dibuja un cuadrilátero amarillo alrededor de lo que cree que son los bordes de la página. La mayoría de las veces acierta. Cuando no, arrastra las esquinas hasta que encajen.

Unos consejos que realmente mejoran el resultado:

- **La luz natural gana a la luz del techo.** Las luces del techo de la oficina proyectan sombras del propio móvil sobre la página. La luz del día de una ventana, o un flexo inclinado sobre la página, es mejor.
- **Superficie plana.** Una página curvada dobla el texto y confunde el OCR.
- **Evita los reflejos.** Inclina ligeramente el móvil para evitar el reflejo del cuadrado blanco en papel brillante.
- **Documentos de varias páginas.** Escanea una página detrás de la otra - la app las apila en un único documento.

---

## Posprocesado: ajustar esquinas, ajustar el color

Después de la captura, tienes un paso de posprocesado. Las dos cosas que merece la pena usar:

- **Ajuste de esquinas.** La detección automática del escáner es buena pero no perfecta. Si la página tiene poco contraste con la superficie, arrastra las esquinas con precisión.
- **Modo de color.** Tres opciones: color (fotos, documentos en color), escala de grises (texto sobre papel blanco - el resultado más nítido para OCR) y blanco y negro (escritura a mano, tickets - lo más limpio posible).

Para la mayoría del papeleo - facturas, tickets, contratos - la escala de grises da el mejor equilibrio entre tamaño de archivo y precisión del OCR.

---

## OCR: imagen escaneada → texto buscable

Toca **Mostrar texto reconocido** bajo la imagen escaneada para ejecutar el OCR. El texto aparece en un panel desde el que puedes copiar, buscar o guardar.

La calidad del OCR depende de tres cosas: la nitidez de la imagen, la iluminación y el tipo de letra. El texto impreso sobre un fondo blanco limpio se reconoce a muy cerca del 100%. La escritura a mano es más difícil - el reconocedor de escritura a mano de Vision funciona razonablemente bien con letras de imprenta cuidadas y tiene problemas con la cursiva. Si un escaneo salió mal, la solución más habitual es volver a escanear con mejor iluminación en lugar de pelear con el resultado del OCR.

---

## Exportación: PDF buscable

El truco que hace que los escaneos sean realmente útiles a largo plazo es la exportación a **PDF buscable**. Es un PDF donde cada página es la imagen escaneada, con el texto del OCR superpuesto de forma invisible por debajo - así el documento parece una imagen, pero los buscadores (y Spotlight de macOS, y el Finder) pueden encontrar palabras dentro de él.

En NFC.cool Tools, pulsa **Compartir página como PDF** y la exportación incluye automáticamente la capa de OCR. Guarda el PDF en tu sistema de archivo, busca "factura 2024-02 acme corp" tres meses después, y aparece el documento correcto.

---

## ¿Por qué escanear en lugar de fotografiar?

Podrías simplemente hacerle una foto al documento. Las razones para usar un escáner en su lugar:

- **Recorte de bordes.** Un escaneo recorta a la página. Una foto incluye el escritorio, la taza de café, el gato.
- **Corrección de perspectiva.** Incluso sosteniéndolo recto, un móvil está ligeramente fuera de la perpendicular. Los escáneres corrigen esto para que la página quede "como si fuera un escáner" en lugar de "fotografiada en ángulo".
- **Agrupación de varias páginas.** Cinco fotos = cinco archivos en el carrete. Cinco escaneos = un PDF.
- **Texto buscable.** OCR incluido en la exportación.

Para tickets, contratos, formularios firmados, documentos de trabajo - escanea, no fotografíes.

El escáner de documentos es parte de [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-document-scanning-guide-en&mt=8) (la versión Android se centra en NFC; el escáner de documentos necesita el framework Vision de Apple).
