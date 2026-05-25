---
id: nfc-blog-025
title: "Escaneo 3D en el iPhone: lo que la fotogrametría y LiDAR pueden hacer en tu bolsillo"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "NFC.cool Tools convierte tu iPhone en un escáner 3D usando la API Object Capture de Apple. La fotogrametría junto con LiDAR produce modelos que puedes exportar a .stl, .obj, .usdz - listos para impresión 3D, RA o cualquier pipeline de modelado."
metaTitle: "Escaneo 3D en el iPhone con NFC.cool Tools"
metaDescription: "Cómo funciona el escáner 3D de NFC.cool Tools - fotogrametría, LiDAR y la API Object Capture de Apple. Exporta a .stl, .obj, .ply, .usdz para impresión 3D y RA."
ogTitle: "Escaneo 3D en el iPhone: lo que la fotogrametría y LiDAR pueden hacer en tu bolsillo"
ogDescription: "Cómo funciona el escáner 3D de NFC.cool Tools - fotogrametría, LiDAR y exportación a .stl, .obj, .usdz."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Hace unos años, el escaneo 3D implicaba un escáner dedicado del tamaño de un microondas, más un software que costaba más que el hardware. Hoy, un iPhone con sensor LiDAR y la API Object Capture de Apple puede producir un modelo 3D utilizable a partir de un puñado de fotos.

La función **3D Scan** de NFC.cool Tools encapsula ese pipeline en un flujo de trabajo que cabe en el bolsillo.

---

## Qué ocurre en realidad

Dos tecnologías trabajan juntas:

- **Fotogrametría** - La app captura decenas de fotos del objeto desde distintos ángulos. Un motor de fotogrametría (la API Object Capture de Apple en iOS) encuentra características coincidentes entre las fotos y las triangula en una malla 3D.
- **LiDAR** - En iPhones con sensor LiDAR (modelos Pro a partir del iPhone 12), cada fotograma se enriquece con mediciones de profundidad tomadas por el sensor. Esto mejora la malla de forma notable en dos sentidos: la escala es precisa (el modelo tiene el tamaño real del objeto), y las superficies sin características visuales obvias (una pared blanca lisa, una curva brillante) obtienen geometría utilizable donde la fotogrametría sola fallaría.

No tienes que pensar en ninguno de estos pasos - la app te guía durante la captura y luego ejecuta la reconstrucción en el propio dispositivo.

---

## Cómo capturar un buen escaneo

Unas cuantas reglas prácticas:

- **Muévete despacio alrededor del objeto.** La app espera una cobertura más o menos continua. No saltes de un lado al opuesto - da la vuelta andando.
- **Mantén el objeto encuadrado.** Un margen constante alrededor del objeto está bien; cortarlo en los bordes pierde datos.
- **Iluminación uniforme.** Las sombras duras confunden la fase de fotogrametría. La luz difusa (cielo abierto, una softbox, luz natural en interiores) da la malla más limpia.
- **Los objetos con textura escanean mejor que los uniformes.** Una taza con estampado se escanea casi a la perfección. Una esfera de metal pulido es realmente difícil. LiDAR ayuda en este último caso, pero no lo resuelve del todo.
- **Quédate quieto un momento en cada ángulo.** El desenfoque de movimiento devora el detalle.

El escaneo completo lleva entre 20 y 40 segundos de recorrido, y luego otros 30-60 segundos de procesamiento.

---

## Formatos de exportación

NFC.cool Tools exporta a los formatos que realmente necesitas:

- **.stl** - Impresoras 3D. Slicers como Bambu Studio, Cura y PrusaSlicer lo aceptan todos.
- **.obj** - Formato 3D universal. Importa en Blender, Cinema 4D, Unity, Unreal, básicamente cualquier herramienta de modelado.
- **.ply** - Formato de malla que preserva los colores de vértices - útil cuando la textura importa más que los materiales mapeados en UV.
- **.usdz** - El formato RA de Apple. Ábrelo en Quick Look, AR Quick Look o úsalo en RealityKit.
- **.abc** (Alembic) - Pipelines de animación.
- **.usd** - Universal Scene Description, compatible con la mayoría de las herramientas DCC modernas.

El modelo es el mismo. El formato solo decide qué herramienta puede consumirlo después.

---

## Qué puedes hacer con el resultado

Las aplicaciones más interesantes que he visto de los usuarios:

- **Imprimir en 3D una réplica única.** Escanea un objeto encontrado, haz el slice e imprímelo.
- **Documentar un bien del mundo real.** Documentación de patrimonio, catalogación de museos, "cómo es exactamente el jarrón de la abuela".
- **Compartir en RA.** Envía el .usdz a alguien con un iPhone - lo toca y ve el objeto flotando en su salón a través de AR Quick Look.
- **Llevar a un motor de juego.** Un objeto real en una escena de Unity, modelado en 90 segundos sin un artista 3D.

---

## Cuándo funciona y cuándo no

La fotogrametría más LiDAR es fuerte con:
- Objetos sólidos y opacos
- Superficies con textura o patrón
- Sujetos estáticos (cualquier cosa que no se mueva durante el escaneo)

Tiene dificultades con:
- Objetos transparentes o refractivos (vidrio, agua, lentes)
- Metal muy reflectante
- Elementos muy delgados (cables, hilos, pelo)
- Cualquier cosa que se mueva

Para lo que se le da bien, el resultado es genuinamente útil - no es un juguete. Para el resto, prepárate para limpiar la malla en Blender o aceptar las limitaciones.

3D Scan forma parte de [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-en&mt=8). Object Capture de Apple necesita sensor LiDAR, así que funciona en los iPhones Pro (iPhone 12 Pro en adelante) y en los modelos iPad Pro (2020 en adelante).
