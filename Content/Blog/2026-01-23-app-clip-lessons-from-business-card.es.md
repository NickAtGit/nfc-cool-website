---
id: "app-clip-lessons-2026-01"
title: "Crear una gran experiencia de App Clip: lecciones de NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Resumen de la charla en mDevCamp 2025 en Praga sobre la arquitectura detrás del flujo de App Clip de NFC.cool Business Card."
metaDescription: "Lecciones de construir el App Clip de NFC.cool Business Card - arquitectura, límites de tamaño y guardar contactos con un toque, de mi charla en la mDevCamp 2025 en Praga."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Presentando en mDevCamp 2025 en Praga"
---

En 2025 di mi primera charla en una conferencia, y elegí un tema dentro del cual había vivido durante años pero que nunca había tenido que explicar a una sala: cómo funciona realmente el App Clip detrás de NFC.cool Business Card. La charla fue en mDevCamp 2025 en Praga, y le puse el mismo título que a este artículo.

Si no te has cruzado con uno, un App Clip es la pequeña parte de una app de iOS que se abre al instante desde un toque NFC o un escaneo de código QR - sin App Store, sin instalación. Es lo que permite que alguien vea tu tarjeta de visita NFC.cool aproximadamente un segundo después de que acercáis los móviles, sin descargar nada. Hacer que eso parezca instantáneo, manteniendo al mismo tiempo los datos de la tarjeta compartida seguros y sin obligar a nadie a registrarse, requiere más decisiones de arquitectura de las que parece desde fuera. La charla las recorrió: cómo está estructurado el App Clip, dónde se gana SwiftUI su lugar, y cómo el backend gestiona los datos de la tarjeta.

Explicarlo desde un escenario me vino bien. Me obligó a justificar decisiones que había tomado sobre todo por instinto, y las preguntas del final - de desarrolladores iOS que claramente habían librado las mismas batallas - fueron más afiladas que cualquier revisión de código. La forma que había adoptado, App Clips con SwiftUI y una API de backend segura, aguantó ese escrutinio, y un par de sugerencias de las conversaciones del pasillo ya han llegado a la app.

Puedes ver la charla completa en [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card).
