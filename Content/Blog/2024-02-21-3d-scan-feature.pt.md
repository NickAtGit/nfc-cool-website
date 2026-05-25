---
id: nfc-blog-025
title: "Digitalização 3D no iPhone: o que a fotogrametria e o LiDAR conseguem fazer no seu bolso"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "O NFC.cool Tools transforma o seu iPhone num scanner 3D usando a API Object Capture da Apple. A fotogrametria aliada ao LiDAR produz modelos que pode exportar para .stl, .obj, .usdz - prontos para impressão 3D, RA ou qualquer pipeline de modelação."
metaTitle: "Digitalização 3D no iPhone com o NFC.cool Tools"
metaDescription: "Como funciona o scanner 3D do NFC.cool Tools - fotogrametria, LiDAR e a API Object Capture da Apple. Exporte para .stl, .obj, .ply, .usdz para impressão 3D e RA."
ogTitle: "Digitalização 3D no iPhone: o que a fotogrametria e o LiDAR conseguem fazer no seu bolso"
ogDescription: "Como funciona o scanner 3D do NFC.cool Tools - fotogrametria, LiDAR e exportação para .stl, .obj, .usdz."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Há alguns anos, digitalizar em 3D significava um scanner dedicado do tamanho de um micro-ondas, mais software que custava mais do que o hardware. Hoje, um iPhone com um sensor LiDAR e a API Object Capture da Apple consegue produzir um modelo 3D utilizável a partir de um punhado de fotografias.

A funcionalidade **3D Scan** do NFC.cool Tools encapsula esse pipeline num fluxo de trabalho que cabe no bolso.

---

## O que acontece na realidade

Duas tecnologias trabalham em conjunto:

- **Fotogrametria** - A aplicação capta dezenas de fotografias do objeto a partir de diferentes ângulos. Um motor de fotogrametria (a API Object Capture da Apple no iOS) encontra características coincidentes entre as fotografias e triangula-as numa malha 3D.
- **LiDAR** - Nos iPhones com sensor LiDAR (modelos Pro a partir do iPhone 12), cada fotograma é enriquecido com medições de profundidade obtidas pelo sensor. Isto melhora a malha de forma acentuada de duas maneiras: a escala fica rigorosa (o modelo tem o tamanho do mundo real) e superfícies sem características visuais óbvias (uma parede branca lisa, uma curva brilhante) ganham geometria utilizável onde a fotogrametria sozinha falharia.

Não tem de pensar em nenhum destes passos - a aplicação guia-o ao longo da captura e depois corre a reconstrução no próprio dispositivo.

---

## Como captar uma boa digitalização

Algumas regras práticas:

- **Mova-se devagar à volta do objeto.** A aplicação espera uma cobertura mais ou menos contínua. Não salte de um lado para o lado oposto - dê a volta a pé.
- **Mantenha o objeto no enquadramento.** Uma margem constante à volta do objeto não faz mal; cortá-lo nas extremidades perde dados.
- **Iluminação uniforme.** Sombras duras confundem a fase de fotogrametria. Luz difusa (céu aberto, uma softbox, luz natural em interiores) dá a malha mais limpa.
- **Objetos com textura digitalizam melhor do que objetos sem características.** Uma caneca com padrão digitaliza quase na perfeição. Uma esfera de metal polido é genuinamente difícil. O LiDAR ajuda neste último caso, mas não o salva por completo.
- **Fique parado por um momento em cada ângulo.** O desfocado de movimento devora detalhe.

A digitalização completa leva 20-40 segundos a andar e depois mais 30-60 segundos de processamento.

---

## Formatos de exportação

O NFC.cool Tools exporta para os formatos de que realmente precisa a jusante:

- **.stl** - Impressoras 3D. Slicers como o Bambu Studio, o Cura e o PrusaSlicer aceitam-no todos.
- **.obj** - Formato 3D universal. Importa para o Blender, Cinema 4D, Unity, Unreal, basicamente todas as ferramentas de modelação.
- **.ply** - Formato de malha que preserva as cores dos vértices - útil quando a textura importa mais do que materiais mapeados em UV.
- **.usdz** - O formato de RA da Apple. Largue-o no Quick Look, no AR Quick Look ou use-o no RealityKit.
- **.abc** (Alembic) - Pipelines de animação.
- **.usd** - Universal Scene Description, suportado pela maioria das ferramentas DCC modernas.

O modelo é o mesmo. O formato apenas decide qual a ferramenta a jusante que o consegue consumir.

---

## O que pode fazer com o resultado

As aplicações mais divertidas que vi por parte dos utilizadores:

- **Imprimir em 3D uma réplica única.** Digitalize um objeto encontrado, faça o slice e imprima.
- **Documentar um bem do mundo real.** Documentação de patrimónios, catalogação de museus, "como é que é mesmo a jarra da avó".
- **Partilhar em RA.** Envie o .usdz para alguém com um iPhone - faz um toque e vê o objeto a flutuar na sala de estar através do AR Quick Look.
- **Colocar num motor de jogo.** Um adereço do mundo real numa cena de Unity, modelado em 90 segundos sem um artista 3D.

---

## Quando funciona e quando não funciona

A fotogrametria aliada ao LiDAR é forte em:
- Objetos sólidos e opacos
- Superfícies com textura ou padrão
- Objetos estáticos (tudo o que não se mova durante a digitalização)

Tem dificuldades com:
- Objetos transparentes ou refratários (vidro, água, lentes)
- Metal muito refletor
- Elementos muito finos (cabos, fios, cabelo)
- Tudo o que se mexa

Para aquilo em que é boa, o resultado é genuinamente útil - não é um brinquedo. Para o resto, conte com ter de limpar a malha no Blender ou aceitar os limites.

A 3D Scan faz parte do [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-en&mt=8). A Object Capture da Apple precisa de um sensor LiDAR, pelo que corre nos iPhones Pro (iPhone 12 Pro e posteriores) e nos modelos iPad Pro (2020 e posteriores).
