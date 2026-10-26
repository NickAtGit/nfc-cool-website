---
id: "ultimate-nfc-tag-guide-2026-09"
title: "La guía definitiva de etiquetas NFC: cada chip, para qué sirve y qué lo lee"
date: "2026-10-26"
tags: ["nfc-tags", "guides"]
summary: "Todos los chips NFC que puedes comprar, desde una NTAG210 de 48 bytes hasta una DESFire EV3, con las cifras reales: memoria, protección, resistencia, lo que un iPhone y un móvil Android pueden hacer con cada uno y el trabajo para el que de verdad está pensado."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "Un iPhone con un icono NFC luminoso detrás de una fila de formatos de etiqueta NFC: una pegatina, una moneda, una tarjeta de PVC, un llavero, una pulsera y un inlay transparente"
author: "Nicolo Stanciu"
metaTitle: "La guía definitiva de etiquetas NFC: cada chip explicado"
metaDescription: "Todos los chips NFC en un solo sitio: NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz y los clones. Memoria, seguridad, resistencia, qué los lee y qué etiqueta va con cada trabajo."
ogTitle: "Cada chip NFC, una sola guía"
ogDescription: "Memoria, seguridad, resistencia, compatibilidad con móviles y el uso honesto de cada chip NFC que puedes comprar. Tablas de especificaciones, una tabla de decisión y un catálogo completo."
---

Abres el anuncio de un pack de etiquetas NFC. Pone "NFC 213", o "compatible con NTAG215", o simplemente "tarjeta NFC 1K, funciona con todos los móviles". Tú solo quieres saber una cosa: ¿me sirve esto para lo que tengo en mente? Y el anuncio no te lo puede decir, porque quien lo escribió tampoco lo sabe.

Llevo años desarrollando [NFC.cool Tools](/features/nfc-reader-writer/), una app cuya primera tarea en cada lectura es responder justo a esa pregunta: ¿qué chip es este y qué puede hacer? Solo el código de identificación reconoce unos sesenta productos de siete fabricantes, y cada uno de ellos acabó en esa lista porque alguien lo acercó a un móvil y algo no se comportó como prometía el anuncio. Esta guía es la referencia que me habría gustado tener mientras escribía ese código. Es larga a propósito. Si quieres la versión corta, la [guía para principiantes sobre etiquetas NFC](/blog/nfc-tags-beginners-guide/) es el sitio por donde empezar, y enlaza de vuelta aquí cuando quieras más detalle.

La idea en una frase, para que la tengas antes de las tablas: **no existe la mejor etiqueta NFC, solo el chip adecuado para cada trabajo**, y el trabajo lo deciden tres cosas: cuánto necesitas guardar, a quién necesitas dejar fuera y qué tiene que poder leerla.

---

## Cómo usar esta guía

Cada cifra de esta guía sale de una hoja de datos del fabricante, de un documento de plataforma de Apple o Google o del código de mi propia app, y las [fuentes](#fuentes-y-lecturas-recomendadas) están al final. Cuando he tenido un chip en mi mesa, lo digo en una nota práctica. Cuando no, también lo digo: las piezas exóticas salen de hojas de datos, y una hoja de datos es una promesa, no una medición.

Dos cosas que no vas a encontrar aquí: un paso a paso para grabar tu primera etiqueta (para eso está la [guía de grabación](/blog/write-nfc-tags-iphone/)) y la historia completa de la NTAG 424 DNA, que tiene [su propio artículo](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

- [Qué es físicamente una etiqueta NFC](#qué-es-físicamente-una-etiqueta-nfc)
- [La sopa de letras: estándares, tipos del NFC Forum y lo que no es NFC](#la-sopa-de-letras-estándares-tipos-del-nfc-forum-y-lo-que-no-es-nfc)
- [Cómo leer una hoja de datos o un anuncio](#cómo-leer-una-hoja-de-datos-o-un-anuncio)
- [NDEF y lo que de verdad cabe en una etiqueta](#ndef-y-lo-que-de-verdad-cabe-en-una-etiqueta)
- [Mapas de memoria: qué hay en cada parte del chip](#mapas-de-memoria-qué-hay-en-cada-parte-del-chip)
- [La tabla de decisión](#la-tabla-de-decisión)
- [Familia por familia](#familia-por-familia)
- [Formatos y alcance de lectura](#formatos-y-alcance-de-lectura)
- [Qué lee qué](#qué-lee-qué)
- [Qué hace NFC.cool Tools con cada chip](#qué-hace-nfccool-tools-con-cada-chip)
- [Comprar sin llevarte un chasco](#comprar-sin-llevarte-un-chasco)
- [Todo el catálogo en una tabla](#todo-el-catálogo-en-una-tabla)
- [Las comparativas que más se buscan](#las-comparativas-que-más-se-buscan)
- [Preguntas frecuentes](#preguntas-frecuentes)
- [Glosario](#glosario)
- [Fuentes y lecturas recomendadas](#fuentes-y-lecturas-recomendadas)

---

## Qué es físicamente una etiqueta NFC

Una etiqueta NFC son tres cosas pegadas: un **chip** del tamaño de un grano de arena, una **antena** que no es más que unas cuantas espiras de aluminio o cobre grabado, y un **sustrato** que lo sujeta todo, que puede ser una pegatina de papel, un inlay de PET, una tarjeta de PVC o una cápsula de vidrio. El chip no tiene batería. Lo alimenta el móvil.

Eso funciona por acoplamiento inductivo. La antena del móvil es una bobina que genera un campo magnético que alterna 13,56 millones de veces por segundo. Si metes una segunda bobina en ese campo, se induce una corriente en ella, igual que en un cargador inalámbrico, solo que con una fracción minúscula de la potencia. El chip de la etiqueta vive de esa corriente inducida. Para devolver datos no transmite nada por su cuenta. Conecta y desconecta una carga en su antena, y la bobina del móvil lo nota como un cambio diminuto en su propio campo. Ese truco se llama **modulación de carga**, y es la razón por la que el móvil hace todo el trabajo y la etiqueta puede costar ocho céntimos.

También explica por qué el alcance es el que es. El campo de una bobina pequeña cae con el cubo de la distancia, así que una etiqueta que se lee perfectamente a un centímetro no recibe nada a diez. Yo lo veo como una vela: puedes leer a su luz si estás cerca, y por mucho que entrecierres los ojos no te sirve desde la otra punta de la habitación. La propia definición del NFC Forum habla de "un alcance típico de hasta 2 cm", la documentación de Android dice "4 cm o menos" y las hojas de datos de NXP dicen "hasta 100 mm según la intensidad del campo y la geometría de la antena". Las tres tienen razón. La cifra del móvil es la que vas a ver; los 100 mm son lo que el chip puede hacer con un lector grande y una antena grande.

Las velocidades de datos son modestas porque no hace falta más. Una etiqueta Type A o Type B habla a 106 kbit/s, y los chips más rápidos negocian 212, 424 u 848 kbit/s después del saludo inicial. FeliCa va a 212 o 424. ISO 15693, la familia de largo alcance, es aún más lenta, 26,48 kbit/s en su modo normal, porque se diseñó para que la leyera a un metro el arco de un almacén y no un móvil. Un volcado completo de los 888 bytes de una NTAG216 tarda una fracción de segundo en cualquier caso.

| Estándar | Velocidad base | Modos más rápidos | Canal de retorno |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A y B | 106 kbit/s | 212, 424 y 848 kbit/s en los chips que los negocian (DESFire, Plus, NTAG 424 DNA) | modulación de carga sobre una subportadora de 847,5 kHz |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | modulación de carga |
| ISO/IEC 15693 | 26,48 kbit/s (6,62 kbit/s en velocidad baja) | modo rápido de NXP a 53 kbit/s; ICODE 3 hasta 212 kbit/s | modulación de carga sobre una subportadora de 423,75 kHz |

---

## La sopa de letras: estándares, tipos del NFC Forum y lo que no es NFC

Cada anuncio mezcla tres sistemas de nombres: los estándares ISO que definen la radio, los tipos de etiqueta del NFC Forum que definen cómo se organizan los datos y los nombres comerciales de los fabricantes. Aquí tienes el mapa.

### Los estándares

| Estándar | Qué define | Nombre en el NFC Forum | Chips de ejemplo |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A (partes 1 a 3) | tarjetas de proximidad, 106 kbit/s, modulación Type A, anticolisión, el UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Type B | lo mismo, con otra modulación y sin un UID en el mismo sentido | NFC-B | ST SRI512, tarjetas de transporte Calypso, muchos pasaportes electrónicos |
| ISO/IEC 14443-4 | el protocolo de transporte sobre A o B, llamado ISO-DEP | ISO-DEP | DESFire, NTAG 424 DNA, MIFARE Plus en SL3, tarjetas bancarias, pasaportes |
| ISO/IEC 7816-4 | el lenguaje de comandos (APDU) y el sistema de archivos que se usan sobre ISO-DEP | | todo lo de la fila anterior |
| ISO/IEC 7816-6 | entre otras cosas, el registro de códigos de fabricantes de chips | | el primer byte del UID |
| ISO/IEC 15693 | tarjetas de vecindad, hasta un metro con el lector adecuado, UID de 8 bytes | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | FeliCa de Sony | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | el propio NFC (NFCIP-1): peer-to-peer y los modos pasivos que usan los móviles | | tu móvil |

### Los tipos de etiqueta del NFC Forum

El NFC Forum no diseñó chips. Escribió cinco recetas para guardar un mensaje **NDEF** (el formato contenedor que entiende cualquier móvil) en chips que ya existían. Eso es lo que significa "etiqueta Type 2": no un chip, sino una forma de organizar los datos.

| Tipo del Forum | Radio | Modelo de memoria | Chips típicos | Compatibilidad con móviles |
| --- | --- | --- | --- | --- |
| Type 1 | NFC-A | bloques de 8 bytes, bloqueo de una sola vez | Topaz de Innovision/Broadcom | se lee en ambas plataformas; el NFC Forum retiró Type 1 de su versión de especificaciones de 2021 |
| Type 2 | NFC-A | páginas de 4 bytes, un capability container en la página 3, bloques TLV | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone y Android, incluida la lectura en segundo plano del iPhone |
| Type 3 | NFC-F | bloques de 16 bytes, códigos de servicio | FeliCa Lite-S, FeliCa Standard | iPhone y Android (en Android la compatibilidad con NFC-F es obligatoria) |
| Type 4 | ISO-DEP sobre NFC-A o NFC-B | archivos seleccionados por APDU: un archivo CC y un archivo NDEF | NTAG 424 DNA, DESFire, ST25TA | iPhone y Android |
| Type 5 | NFC-V | bloques de 4 bytes, CC en el bloque 0 | ICODE SLIX y SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone desde iOS 13, Android mediante NfcV; se añadió al Forum en 2015 |

Dos cosas se quedan fuera de esa lista a propósito. **MIFARE Classic** no es un tipo de etiqueta del Forum en absoluto; el NDEF en Classic es una adaptación de NXP que Android admite en algunos móviles y iOS no admite en ninguno. Y las recetas del Forum no dicen nada de seguridad. Una etiqueta Type 2 puede ser una NTAG213 normal o una NTAG 224 DNA con autenticación AES-128; una etiqueta Type 4 puede ser una ST25TA02K sin más o una tarjeta bancaria. El tipo te dice cómo se guarda el mensaje NDEF, no quién puede acceder a él.

### Lo que no es una etiqueta NFC

La mitad de los mensajes del tipo "¿por qué mi móvil no lee esto?" que recibo tratan de cosas que nunca fueron NFC. La bobina NFC de un móvil está sintonizada a 13,56 MHz y habla los protocolos de arriba. Todo lo demás le resulta invisible, por mucha pinta de etiqueta que tenga.

| Parece una etiqueta, pero | Frecuencia | Lo que es en realidad | ¿Lo puede leer un móvil? |
| --- | --- | --- | --- |
| una tarjeta de oficina o de parking sin chip visible | 125 kHz | RFID de baja frecuencia: IDs de solo lectura EM4100, HID Prox, regrabables T5577 | no, y ninguna app puede cambiar eso |
| el microchip de una mascota | 134,2 kHz | transpondedor FDX-B ISO 11784/11785 | no |
| una etiqueta antirrobo de tienda o de logística | 860 a 960 MHz | RFID UHF RAIN, EPC Gen2 | no |
| la llave de un hotel o una tarjeta de transporte antigua | 13,56 MHz | MIFARE Classic o una tarjeta HF propietaria | Android a veces, el iPhone solo muestra el UID |
| una tarjeta bancaria | 13,56 MHz | una tarjeta inteligente EMV que habla ISO-DEP | técnicamente sí; una app puede leer la lista de aplicaciones de la tarjeta y sus datos públicos, pero Core NFC de Apple bloquea la lectura de tarjetas de pago y ningún móvil puede producir una copia que funcione |
| un pasaporte | 13,56 MHz | un documento electrónico ICAO 9303 | sí, con la zona de lectura mecánica como clave; [eso lo construí yo](/blog/read-passport-nfc-chip/) |
| una llave de seguridad | 13,56 MHz | un autenticador FIDO2 sobre ISO 7816 | sí para el navegador, no como etiqueta |

La tarjeta de 125 kHz es la que duele. Funciona en el lector de la puerta, es una tarjeta de plástico con una bobina dentro y nunca va a hablar con un móvil. Escribí sobre [por qué un iPhone no puede abrir la puerta de tu edificio](/blog/iphone-rfid-condo-doors/) porque la respuesta honesta es de hardware.

---

## Cómo leer una hoja de datos o un anuncio

La portada de una hoja de datos tiene todas las cifras que necesitas, y un buen anuncio las copia. Esto es lo que significa cada una y cuáles mienten.

### Memoria de usuario frente a memoria total

Todos los chips tienen más EEPROM de la que puedes usar. Una NTAG213 tiene 180 bytes en total y 144 son tuyos; los otros 36 guardan el UID, los bits de bloqueo, el capability container y las páginas de configuración. Una MIFARE Classic 1K tiene 1024 bytes y 752 son de datos, porque cada sector pierde un bloque para sus claves. Los anuncios citan la cifra que sea más grande. La que importa es la **memoria de usuario**, y ni siquiera eso es lo que cabe en un mensaje NDEF, que es la sección siguiente.

### El UID

El identificador único se graba en fábrica y no se puede cambiar, salvo en los clones fabricados precisamente para cambiarlo. Hay tres longitudes:

| Longitud del UID | Dónde | Notas |
| --- | --- | --- |
| 4 bytes | MIFARE Classic antiguas, tarjetas Classic baratas actuales | NXP los llama "identificadores no únicos" (NUID) porque los 4 bytes se agotaron. Un UID de 4 bytes no lleva código de fabricante. Un primer byte 08 significa que el chip genera un ID aleatorio en cada lectura |
| 7 bytes | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (opcional); el IDm de 8 bytes de FeliCa es un pariente | el primer byte es el código de fabricante |
| 8 bytes | todos los chips ISO 15693 | el primer byte es siempre E0 y el segundo es el código de fabricante |

El código de fabricante sale del registro ISO/IEC 7816-6, y es la comprobación honesta más rápida que puedes hacerle a un anuncio. Si una etiqueta "NXP original" devuelve 1D, la fabricó Fudan.

| Código | Fabricante |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK y GET_VERSION: cómo distingue un lector un chip de otro

Cuando un chip Type A responde a un móvil, envía dos valores pequeños, el **ATQA** y el **SAK**. Los lectores, incluida mi app, usan el SAK para clasificar los chips en familias, porque sus bits dicen si el chip habla ISO-DEP y a qué familia general pertenece. La propia nota de identificación de NXP dice en negrita que no se use el ATQA para nada, porque se repite entre chips y despista, y mi experiencia lo confirma.

| SAK | Familia | ATQA habitual |
| --- | --- | --- |
| 00 | NTAG y MIFARE Ultralight, todas | 00 44 |
| 08 | MIFARE Classic 1K, MIFARE Plus 2K o SE en nivel de seguridad 1 | 00 04 (UID de 4 bytes), 00 44 (7 bytes) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, MIFARE Plus 4K en nivel 1 | 00 02 o 00 42 |
| 10, 11 | MIFARE Plus X en nivel 2 | |
| 20 | todo lo que habla ISO-DEP: DESFire, NTAG 424 DNA, Plus en nivel 3, tarjetas bancarias, JCOP | 03 44 (DESFire, 424), 03 04 con ID aleatorio |

Como todas las NTAG y todas las Ultralight responden SAK 00, distinguir una NTAG213 de una NTAG216 o de una Ultralight EV1 requiere un comando más: **GET_VERSION**. Devuelve ocho bytes, y tres de ellos hacen el trabajo. El byte 2 es el tipo de producto (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), el byte 4 es la generación y el byte 6 codifica el tamaño de almacenamiento. Así es como NFC.cool sabe lo que tiene delante, y también es lo primero que le pregunta a una etiqueta una consola que lee Amiibo.

| Chip | Respuesta de GET_VERSION |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 B | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 B | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (envuelta en una APDU) | fabricante 04, tipo 04, versión principal 30, almacenamiento 11 |

Hay chips sin GET_VERSION: la Ultralight original, la Ultralight C y la antigua NTAG203 nunca lo tuvieron, y la mayoría de los clones tampoco. Esa ausencia ya es en sí una huella.

### Resistencia, retención y temperatura

Estas tres cifras son las que los anuncios casi nunca citan y las hojas de datos siempre dan.

- La **resistencia a la escritura** es cuántas veces se puede reescribir un byte. 100.000 ciclos es el mínimo en cualquier chip actual; los chips de la época de Classic y la Ultralight original están certificados para 10.000. La DESFire EV3 y la familia ST25DV están certificadas para 1.000.000 típicos.
- La **retención de datos** es cuánto tiempo sobreviven los bytes sin alimentación. 10 años es el estándar antiguo, 50 años es lo que NXP especifica para la NTAG 424 DNA y la familia ICODE SLIX, y ST especifica 200 años para los chips Type 4 ST25TA. La retención se especifica a temperatura ambiente; el calor la acorta.
- La **temperatura de funcionamiento** va de -25 a +70 °C en la mayoría de los chips de consumo de NXP, de -40 a +85 °C en las piezas de ST y EM, y hasta 105 °C en ICODE 3. El límite no suele ser el chip, sino el adhesivo y el sustrato.

### La escalera de seguridad

Esta es la parte de un anuncio que más miente. "Cifrado", "seguro" o "anticlonación" aparecen impresos en etiquetas cuya única protección es una contraseña de 32 bits que viaja en claro. Esta es la escalera, de abajo arriba, y cada chip de esta guía está en un peldaño.

| Peldaño | Qué es | Chips | Qué impide |
| --- | --- | --- | --- |
| 0. Nada | cualquiera puede leer y grabar | Ultralight original, NTAG203, TI Tag-it Standard, Topaz | nada |
| 1. Bits de bloqueo | bits de un solo sentido que dejan páginas en solo lectura para siempre | todos los chips Type 2 y Type 5 | reescribir; no impide copiar |
| 2. Contraseña | una contraseña de 32 bits más una confirmación de 16 bits (PACK), con un límite opcional de intentos fallidos; en NTAG21x la contraseña viaja por el aire sin cifrar | NTAG21x, Ultralight EV1, NTAG 223 DNA, familia ICODE SLIX (32 bits), ST25TV (32 o 64 bits), ST25TA (128 bits) | que un desconocido con una app la reescriba por las buenas; no a un atacante decidido con un sniffer |
| 3. CRYPTO1 | el cifrado de flujo de 48 bits de NXP de los años noventa | MIFARE Classic, MIFARE Plus en nivel 1 | nada desde 2008; trátalo como el peldaño 0 |
| 4. Triple DES | autenticación mutua con una clave de 16 bytes | Ultralight C, FeliCa Lite-S, DESFire D40 y EV1 | copiar el contenido sin la clave |
| 5. AES-128 | autenticación mutua, mensajería segura | Ultralight AES, NTAG 224 DNA, DESFire EV1 a EV3, DESFire Light, Plus en nivel 3, ICODE DNA, FeliCa Standard, EM4425 | lo mismo, con un cifrado en el que todavía se confía |
| 6. AES más SUN | cada lectura genera una prueba criptográfica nueva en la propia URL | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | la clonación, porque una copia no puede firmar la siguiente lectura |
| 7. Bucle antimanipulación | un hilo que informa, de forma permanente, si alguna vez se rompió | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | reutilizar un precinto |

Dos funciones están al lado de la escalera y no en ella. Una **firma de originalidad** es una firma digital sobre el UID, escrita por el fabricante, que permite a un lector comprobar que el chip salió de NXP o de ST. No impide copiar, porque un clon puede llevar una firma copiada, y NXP lo dice en su propia nota de aplicación. Y los **contadores** (un contador de lecturas de 24 bits en NTAG213/215/216, tres contadores de un solo sentido en Ultralight EV1, un contador de escrituras de 16 bits en SLIX2) son para casos de uso, no para seguridad, salvo que se integren en un mensaje SUN.

---

## NDEF y lo que de verdad cabe en una etiqueta

**NDEF** (NFC Data Exchange Format) es el sobre. Un móvil no lee "una URL" de una etiqueta; lee un mensaje NDEF que contiene un registro URI, y el sobre pesa. Saber cuánto pesa es lo que te permite responder a "¿me cabe el enlace en una NTAG213?".

### El registro

Cada registro empieza con un byte de flags (inicio de mensaje, fin de mensaje, registro corto y un formato de nombre de tipo de tres bits), seguido de la longitud del tipo, la longitud de la carga útil (un byte si la carga útil tiene menos de 256 bytes, cuatro en caso contrario), el propio tipo y la carga útil. Así que un registro URL corto cuesta 4 bytes de cabecera antes del primer byte de tu enlace.

| Registro | Tipo | Carga útil |
| --- | --- | --- |
| URL | tipo well-known `U` | un byte de prefijo más el resto de la URL en UTF-8 |
| Texto | tipo well-known `T` | un byte de estado, un código de idioma (`en`) y luego el texto |
| Smart Poster | tipo well-known `Sp` | un mensaje NDEF entero dentro: una URL más títulos opcionales y una acción |
| Contacto | MIME `text/vcard` | el texto de la vCard tal cual |
| Wi-Fi | MIME `application/vnd.wfa.wsc` | atributos de Wi-Fi Simple Configuration: SSID, tipo de autenticación, clave |
| App de Android | tipo externo `android.com:pkg` | un nombre de paquete; Android abre esa app o su página en Play Store |

El byte de prefijo es lo único ingenioso del registro URI. En lugar de escribir `https://` letra a letra, el primer byte de la carga útil es un código para un prefijo habitual, y el móvil lo vuelve a poner.

| Código | Prefijo | Código | Prefijo |
| --- | --- | --- | --- |
| 00 | ninguno | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

Así que `https://nfc.cool/` se guarda como el byte 04 seguido de `nfc.cool/`: nueve bytes de carga útil para una URL de diecisiete caracteres. La propia hoja de datos de la NTAG 5 de NXP trae el ejemplo `D1 01 0C 55 01` seguido de `nxp.com/nfc`, que se descodifica como `http://www.nxp.com/nfc`.

### El sobre alrededor del registro

En una etiqueta Type 2 o Type 5, el mensaje va dentro de un TLV: un byte que dice "mensaje NDEF" (03), un byte de longitud (tres bytes si el mensaje tiene 255 bytes o más), el mensaje y un byte terminador (FE). En una etiqueta Type 4 no hay TLV; el archivo NDEF empieza con una longitud de dos bytes. Y en una NTAG213 o NTAG212 recién salida de fábrica, los cinco primeros bytes de la memoria de usuario ya están ocupados por un Lock Control TLV que NXP entrega pregrabado y que cualquier app de grabación respeta.

Estas son las cuentas para un solo enlace `https://`, hechas a mano para el chip que compra casi todo el mundo:

- memoria de usuario de la NTAG213: 144 bytes
- menos el Lock Control TLV de fábrica: 139
- menos el marco del TLV NDEF (03, longitud, FE): 136 bytes para el mensaje
- menos la cabecera del registro (flags, longitud del tipo, longitud de la carga útil, `U`): 132 bytes de carga útil
- menos el byte de prefijo: **131 caracteres después de `https://`**

### Qué cabe en cada etiqueta

<div class="table-scroll">

| Etiqueta | Área NDEF | Caracteres de URL después de https:// | vCard mínima (132 B: nombre, teléfono, email, URL) | vCard típica (250 a 500 B) | Registro Wi-Fi (67 a 88 B) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 B | 48 | 40 | no | no | no |
| NTAG212 | 128 | 115 | no | no | sí |
| Ultralight EV1 128 B | 128 | 120 | no | no | sí |
| NTAG213, estado de fábrica | 144 | 131 | no, por 9 bytes | no | sí |
| NTAG213, sin el lock TLV | 144 | 136 | no, por 4 bytes | no | sí |
| ST25TN01K | 160 | unos 147 | sí, por poco | no | sí |
| NTAG215 | 496 declarados (504 de usuario) | 483 | sí | sí, la mayoría | sí |
| NTAG216 | 872 declarados (888 de usuario) | 859 | sí | sí | sí |
| ICODE SLIX | 112 (CC incluido) | 100 | no | no | sí |
| ICODE SLIX2 | 316 | unos 300 | sí | normalmente | sí |
| NTAG 424 DNA | archivo NDEF de 256 bytes | 249 | sí | las pequeñas | sí |
| DESFire EV3 2K | archivo NDEF de hasta 2048 bytes | hasta 2038 | sí | sí | sí |

</div>

Dos notas al pie que confunden a la gente. El propio capability container de NXP en la NTAG215 y la NTAG216 declara 496 y 872 bytes, menos que la memoria de usuario, así que `getMaxSize()` de Android devuelve la cifra más pequeña, y es correcta. Y una vCard con nombre, teléfono, email y URL ocupa 132 bytes antes del sobre y 148 después, que es por lo que no llega a caber en una NTAG213 y por lo que los vendedores de tarjetas de visita eligen por defecto la NTAG215 o la NTAG216. Las cifras redondeadas que usé en la guía para principiantes (unos 130, 480 y 850 caracteres) son estos números con los bordes limados.

---

## Mapas de memoria: qué hay en cada parte del chip

Si alguna vez has volcado una etiqueta en NFC.cool y te has quedado mirando el hexadecimal, esto es la piedra de Rosetta.

### Type 2: el mapa de páginas de la NTAG213

| Página | Bytes | Contenido |
| --- | --- | --- |
| 00 | 4 | bytes 0 a 2 del UID y un byte de comprobación |
| 01 | 4 | bytes 3 a 6 del UID |
| 02 | 4 | byte de comprobación, un byte interno, dos bytes de bloqueo estático para las páginas 3 a 15 |
| 03 | 4 | capability container: E1 10 12 00 (número mágico, versión 1.0, 18 x 8 = 144 bytes, lectura y escritura permitidas) |
| 04 a 27 | 144 | memoria de usuario, donde viven los TLV |
| 28 | 4 | bytes de bloqueo dinámico para las páginas 16 en adelante |
| 29 | 4 | CFG0: configuración del espejo, la página en la que cae el espejo, y AUTH0, la primera página protegida por contraseña |
| 2A | 4 | CFG1: byte ACCESS con el bit de protección de lectura o escritura y AUTHLIM, el límite de intentos fallidos |
| 2B | 4 | PWD, la contraseña, solo escritura |
| 2C | 4 | PACK, la confirmación de dos bytes, más dos bytes reservados |

Una NTAG215 tiene la misma forma, con la memoria de usuario hasta la página 81 y la configuración en las páginas 83 a 86; una NTAG216 llega hasta la E1, con la configuración en E3 a E6. Los bits del capability container son de un solo sentido: una vez que se activa el indicador de solo lectura del byte 3, o un bit de bloqueo, no se puede desactivar, y eso es justo lo que escribe el "bloqueo permanente" de la app. Un "formateo" en Type 2 escribe un TLV NDEF vacío (03 00 FE) en la página 4; no pone la memoria a cero, así que los datos antiguos se pueden seguir volcando hasta que se sobrescriban.

### Type 4: el sistema de archivos de la NTAG 424 DNA

Aquí no hay páginas. Una aplicación ISO 7816 llamada D2760000850101 contiene tres archivos: un capability container de 32 bytes (E103), un archivo NDEF de 256 bytes (E104) y un archivo propietario de 128 bytes (E105). Cada archivo tiene sus propios derechos de lectura, escritura y cambio de acceso, cada uno asociado a una de cinco claves AES. DESFire funciona igual, pero te deja crear tus propias aplicaciones y archivos; los tres de la NTAG 424 DNA son fijos, y por eso la describí como [una pequeña caja fuerte cerrada con tres cajones](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

### Type 5: los bloques de ISO 15693

Bloques de cuatro bytes, numerados desde cero, con el capability container en el bloque 0 (E1 40 seguido del tamaño) y el TLV NDEF empezando en el bloque 1. El UID, el AFI, el DSFID y el estado de bloqueo viven fuera de los bloques direccionables y se leen con un comando aparte, GET SYSTEM INFORMATION. En una ICODE SLIX2, el último bloque direccionable, el 79, es el contador de 16 bits; en ICODE 3, el bloque 75 guarda un contador de 24 bits y los bloques del 76 en adelante son un área de configuración separada.

### MIFARE Classic: sectores, trailers y el directorio

Una Classic 1K tiene 16 sectores de 4 bloques de 16 bytes. El último bloque de cada sector es el **sector trailer**: clave A, tres bytes de acceso, un byte libre, clave B. El bloque 0 del sector 0 es el bloque del fabricante, con el UID. Para poner NDEF en una Classic, NXP definió un directorio: el sector 0 se convierte en el **MIFARE Application Directory** (MAD), que se lee con la clave pública A0 A1 A2 A3 A4 A5 y que indica qué sectores contienen NDEF bajo el código de aplicación 03 E1. Esos sectores usan una segunda clave pública, D3 F7 D3 F7 D3 F7. Una tarjeta recién salida de fábrica tiene todas las claves en FF FF FF FF FF FF. Cuando NFC.cool formatea una tarjeta Classic en Android, lo que escribe es este directorio y estas claves, y esa es la razón por la que una Classic formateada se lee en algunos móviles Android y en ningún iPhone.

---

## La tabla de decisión

Empieza aquí si ya sabes el trabajo y quieres el chip.

| El trabajo | El chip | Por qué | Compatibilidad en NFC.cool |
| --- | --- | --- | --- |
| un enlace, una red Wi-Fi, un disparador de Atajos, una pegatina en un objeto | NTAG213 | 131 caracteres de URL, contraseña, contador, ocho céntimos | completa en iPhone, Android, iPad y Mac |
| una tarjeta de contacto, un enlace más largo, cualquier cosa con margen para crecer | NTAG216 | 859 caracteres, las mismas funciones, el chip con el que hago mis pruebas | completa |
| Amiibo | NTAG215 | la consola comprueba exactamente este chip y sus 504 bytes | copia de seguridad y restauración en ambas plataformas |
| contar lecturas en un cartel, una tarjeta de visita, una unidad de demostración | NTAG213, 215 o 216 | el contador de lecturas por hardware y el espejo ASCII, y los tres chips que admite el Contador de Toques de la app | [Contador de Toques](/blog/count-nfc-tag-scans/) en ambas plataformas |
| una antena diminuta, un anillo, algo barato y desechable | NTAG 210µ o Ultralight EV1 48 B | 48 bytes, 17 pF para bobinas pequeñas, sin contraseña | lectura y grabación |
| demostrar que un producto es auténtico, con una lectura y sin app | NTAG 424 DNA | cada lectura se firma con AES-128; una copia no puede | configuración completa, incluida la comprobación de la firma |
| lo mismo, pero como una pegatina Type 2 barata | NTAG 223 DNA | SUN en un chip Type 2, 144 bytes | aparece como una etiqueta Type 2; la configuración de SUN todavía no está disponible |
| un precinto que avisa cuando se abrió | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | un hilo antimanipulación que se recuerda para siempre | la 424 TT por completo; las demás se leen como su chip base |
| inventario o una biblioteca a un brazo de distancia con un lector de arco | ICODE SLIX2 o ICODE 3 | ISO 15693 se lee a 1 o 1,5 metros con un lector adecuado, y aun así funciona acercando un móvil | lectura, grabación y formateo en ambas plataformas |
| una bobina de filamento de impresora 3D que la propia impresora tiene que leer | ICODE SLIX2 | el estándar [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) espera NFC-V | lectura y grabación |
| una puerta, un torno de acceso, un sistema de transporte | DESFire EV3 o MIFARE Plus EV2 | AES, gestión de claves de verdad, seguridad certificada | identifica y vuelca lo que es público; sin operaciones con claves |
| un sensor sin batería que habla con un microcontrolador | NTAG I2C plus, ST25DV, NTAG 5 | una interfaz I2C y captación de energía en el mismo chip | se lee por su lado NFC |
| cualquier cosa del mundo del transporte o el dinero electrónico de Japón | FeliCa | es lo que hablan los lectores | lectura; grabación NDEF en Lite-S y Standard en iPhone |
| una etiqueta sobre una superficie metálica | cualquiera de las anteriores en formato para metal | lo que la hace funcionar es la capa de ferrita, no el chip | como el chip |
| bajo la piel | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | las antenas pequeñas de vidrio necesitan el punto exacto del móvil | como el chip |

Lo que no está en la tabla: MIFARE Classic. No hay ningún trabajo en 2026 para el que yo compraría un chip Classic, y la sección siguiente explica por qué.

---

## Familia por familia

Cada familia recibe el mismo tratamiento: una tabla de especificaciones sacada de la hoja de datos, para qué sirve el chip, qué hacen los móviles con él y una nota práctica cuando la tengo.

### NTAG 21x: la familia de las pegatinas

Este es el chip que llevan casi todas las pegatinas, monedas y tarjetas NFC que se venden al público, y NXP todavía las tiene todas como activas en 2026, aunque la hoja de datos no ha cambiado desde 2015.

<div class="table-scroll">

| Chip | Bytes de usuario / totales | Contraseña | Contador | Espejo | Firma | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | no | no | no | sí, reprogramable | 100k / 10 años | activo |
| NTAG210 | 48 / 80 | 32 bits + PACK, AUTHLIM | no | UID | sí | 100k / 10 años | activo |
| NTAG212 | 128 / 164 | sí | no | UID | sí | 100k / 10 años | activo |
| NTAG213 | 144 / 180 | sí | contador de lecturas de 24 bits | UID y contador | sí | 100k / 10 años | activo |
| NTAG215 | 504 / 540 | sí | sí | sí | sí | 100k / 10 años | activo |
| NTAG216 | 888 / 924 | sí | sí | sí | sí | 100k / 10 años | activo |
| NTAG213F, NTAG216F | 144 u 888 | sí | sí | sí | sí | 100k / 10 años | activo; añade un pin de detección de campo y un modo de reposo para integrarlo en electrónica |
| NTAG 213 TT | 144 / 184 | sí | sí | UID, contador y estado antimanipulación | sí | 100k / 10 años | activo; añade un hilo antimanipulación |
| NTAG203 | 144 / 168 | no, un área OTP de 32 bits | contador de escrituras de 16 bits | no | no | 10k / 5 años | fin de vida, sustituido por la NTAG213 |

</div>

Todas son NFC Forum Type 2, ISO/IEC 14443 Type A, UID de 7 bytes, 106 kbit/s, certificadas de -25 a +70 °C. La NTAG210 y la NTAG212 vienen con una capacidad de entrada de 17 pF para antenas pequeñas; la 213, la 215 y la 216 tienen 50 pF. La firma de originalidad es ECDSA sobre la curva secp128r1, de 32 bytes, y se lee con el comando READ_SIG; la clave de verificación está en una nota de aplicación de NXP que no es pública, y por eso casi ninguna app de consumo la comprueba.

Las tres funciones que importan en la práctica son la **contraseña** (un PWD de 32 bits, un PACK de 16 bits con el que responde la etiqueta, AUTH0 para indicar dónde empieza la protección y AUTHLIM para inutilizar la etiqueta tras el número de intentos fallidos que elijas), el **contador NFC** (24 bits, se incrementa una vez por sesión de lectura y se lee con un comando propio) y el **espejo ASCII**, que pega el UID y el contador como texto dentro de tu mensaje NDEF, de modo que una URL normal se convierte en `https://example.com/?u=04A1...&c=000123` en cada lectura. Los cabezales de cepillo Philips Sonicare sobre los que escribí usan una NTAG213 con AUTHLIM en tres, y así es como [un cabezal se bloquea solo](/blog/reset-sonicare-brush-head-nfc/) si fallas la contraseña.

> **En la práctica:** son los chips con los que pruebo cada versión, y la NTAG216 es la que recomiendo cuando alguien quiere comprar un solo pack y olvidarse del tema. Merece la pena poner contraseña a cualquier etiqueta que dejes en un sitio público; frena a quien tiene una app gratuita, que es la mayoría de la gente. No frena a nadie con un sniffer, porque la propia contraseña viaja por el aire sin cifrar, y lo digo claramente en la app.

En los móviles: lectura y grabación NDEF en todas, lectura en segundo plano de registros URL en iPhone y acceso a bajo nivel en ambas plataformas para la contraseña, el contador y el espejo. NFC.cool hace todo eso en iPhone, en Android y, con un lector USB, en iPad y Mac.

### NTAG DNA: las que firman cada lectura

Tres generaciones, dos de ellas todavía en fabricación.

<div class="table-scroll">

| Chip | Tipo del Forum | Bytes de usuario | Claves | SUN | Firma | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Type 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | sí, contador de 24 bits | ECC | 200k / 50 años | ya no se fabrica |
| NTAG 424 DNA | Type 4 | 416 (32 + 256 + 128) | 5 AES-128, opción LRP, opción de Random ID | sí, con opción de UID cifrado | ECDSA secp224r1, 56 bytes, más claves AES de originalidad | 200k / 50 años | activo; Common Criteria EAL4 |
| NTAG 424 DNA TT | Type 4 | 416 | 5 AES-128 | sí, más el estado antimanipulación en el mensaje | igual | 200k / 50 años | activo |
| NTAG 223 DNA | Type 2 | 144 / 240 | una clave SUN de 16 bytes más una contraseña de 32 bits | sí, contador de 24 bits | ECDSA secp192r1, 48 bytes | 100k / 10 años | activo desde febrero de 2022 |
| NTAG 224 DNA | Type 2 | 208 / 304 | la autenticación mutua AES-128 sustituye a la contraseña | sí | igual | 100k / 10 años | activo |
| NTAG 223 y 224 DNA StatusDetect | Type 2 | como arriba | como arriba | sí, con el estado del sensor en el mensaje | igual | 100k / 10 años | activo |

</div>

**SUN**, Secure Unique NFC, es la función por la que estos chips valen el triple que una NTAG213: la etiqueta copia su UID y su contador de lecturas en la URL y añade un CMAC AES-128 calculado sobre ellos, nuevo en cada lectura. El servidor comprueba el MAC; una etiqueta clonada no tiene la clave y falla. Lo expliqué todo, incluido el modo LRP y las cinco claves, en [el artículo sobre la NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), así que aquí va solo lo que ha cambiado desde entonces: NXP ahora vende también la NTAG 426Q DNA y la NTAG X DNA, un chip Type 4 conectado de 16 kB certificado EAL6+, así que la 424 ya no es el chip DNA más nuevo, solo el que de verdad puedes comprar en forma de pegatina.

La familia 22x DNA es la novedad interesante: SUN en un chip Type 2, lo que significa que la pegatina es más barata y el móvil la lee como una NTAG normal. Las variantes **StatusDetect** añaden un sensor: o un bucle conductor que registra, de forma irreversible, que se ha roto, o una medida de capacidad de 0 a 11 pF entre dos pines, que NXP propone para nivel de líquido, humedad y presión.

> **En la práctica:** compré mis primeras etiquetas NTAG 424 DNA en AliExpress por unos pocos euros y construí a su alrededor todas las funciones 424 de la app: cambio de claves, SUN en modo normal y cifrado, derechos de acceso a archivos, el archivo caja fuerte, el estado antimanipulación. La 424 es además el único chip en el que NFC.cool comprueba la firma de originalidad con la clave pública que publica NXP y muestra "Genuine NXP". Las 22x DNA solo las conozco sobre el papel.

### MIFARE Ultralight: la familia de los billetes

Ultralight es la hermana mayor de NTAG. La misma interfaz de radio, las mismas páginas de 4 bytes, el mismo SAK y, desde EV1, los mismos comandos. La diferencia es la intención: Ultralight se creó para billetes de un solo viaje y la línea NTAG para pegatinas con una URL, y por eso NTAG viene con un capability container pregrabado y Ultralight no.

<div class="table-scroll">

| Chip | Bytes de usuario / totales | Protección | Contador | Firma | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | bits de bloqueo y un área OTP de 32 bits | no | no | 10k / 5 años | ya no se fabrica |
| Ultralight C | 144 / 192 | autenticación mutua triple DES, clave de 16 bytes | 16 bits, de un solo sentido | no | 100k / 10 años | no recomendado para diseños nuevos, sustituido por Ultralight AES |
| Ultralight EV1 | 48 / 80 o 128 / 164 | contraseña de 32 bits, AUTHLIM | tres contadores independientes de 24 bits de un solo sentido | sí, 32 bytes | 100k / 10 años | activo |
| Ultralight AES | 144 / 240 | autenticación mutua AES-128, mensajería con CMAC, opción de Random ID | tres contadores de 24 bits | sí, más una clave AES de originalidad | 100k / 10 años | activo desde febrero de 2022, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | bits de bloqueo y OTP | no | sí | 100k / 10 años | desaparecido del catálogo de NXP sin ningún aviso que yo haya encontrado |

</div>

Los tres contadores de un solo sentido de la Ultralight EV1 son su rasgo distintivo: un operador de transporte va descontando y el chip se niega a volver a subir. La Ultralight AES es la respuesta discreta a "quiero una NTAG213 con autenticación de verdad": los mismos 144 bytes, AES-128 en lugar de contraseña, en una etiqueta Type 2 que cualquier móvil puede leer.

En los móviles: todo lo de aquí se lee como una etiqueta Type 2. Core NFC de Apple expone una familia `.ultralight` y deja a una app enviar comandos nativos; Android tiene una clase `MifareUltralight` que es opcional, pero está presente en todos los móviles que he visto. NFC.cool identifica las variantes EV1 y la AES por GET_VERSION y trata la contraseña de la EV1 igual que la de NTAG; la autenticación AES en sí no es algo que haga la app.

### MIFARE Classic, Plus y DESFire: la familia del control de acceso

Tres familias en una sección porque son una sola historia: Classic se rompió, Plus fue el camino de migración y DESFire es donde acabó el sector.

**MIFARE Classic** es el chip de tu vieja llave de hotel, de tu tarjeta del gimnasio y de muchísimas tarjetas de oficina. No es un tipo de etiqueta del NFC Forum. Tiene su propio cifrado, CRYPTO1, al que dos grupos de investigación le hicieron ingeniería inversa en 2008: Nohl y Plötz mirando el silicio al microscopio, y el grupo de la Universidad de Radboud observando el protocolo, que recuperó una clave "a partir de solo uno o dos intentos de autenticación con un lector auténtico en menos de un segundo". NXP fue a los tribunales para frenar el segundo artículo y perdió. Dieciséis años después, en agosto de 2024, Quarkslab publicó una puerta trasera de hardware en la Fudan FM11RF08S, el chip compatible con Classic más común de los últimos cinco años, y encontró una clave de puerta trasera más antigua compartida por chips Fudan anteriores, algunos chips de Infineon e incluso algunos chips de NXP de alrededor del año 2000. Classic no es un producto de seguridad, y la propia página de producto de NXP para la Classic EV1 dice ahora "no recomendado para diseños nuevos" y remite a DESFire Light.

<div class="table-scroll">

| Chip | Bytes de usuario / totales | UID | Protección | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4 bytes | CRYPTO1 | 100k / 10 años | descatalogado |
| Classic 1K | 752 / 1024 | NUID de 4 bytes | CRYPTO1 | 100k / 10 años | descatalogado; EV1 no recomendado para diseños nuevos |
| Classic 4K | 3440 / 4096 | NUID de 4 bytes | CRYPTO1 | 100k / 10 años | descatalogado; EV1 no recomendado |
| Classic EV1 1K y 4K | como arriba | 7 o 4 bytes, opción de ID aleatorio | CRYPTO1; comprobación de originalidad solo en la 1K | 100k mínimo / 10 años | no recomendado para diseños nuevos |

</div>

La respuesta directa para iPhone, porque me lo preguntan cada semana: **un iPhone no puede leer el contenido de una tarjeta MIFARE Classic, y ninguna app puede cambiar eso.** Core NFC de Apple no tiene ninguna familia Classic en su API, y la documentación de su comando MIFARE dice sin rodeos que "no admite el protocolo Crypto1". El móvil ve el UID y el SAK, mi app deduce la familia a partir de ellos, y ahí se acaba todo. Android es distinto: la clase `MifareClassic` es opcional y la implementan los móviles cuyo controlador NFC lleva CRYPTO1 en hardware (los controladores de NXP sí; los chips de Broadcom de toda una generación de Nexus y Galaxy no), y en esos móviles NFC.cool lee todos los sectores que abre la clave de fábrica y puede formatear una tarjeta nueva para NDEF.

**MIFARE Plus** es el mapa de memoria de Classic con AES-128 añadido, para que un operador pudiera cambiar primero las tarjetas y después los lectores. Funciona por niveles de seguridad: SL1 se comporta como una Classic (con AES opcional), SL3 es solo AES sobre ISO-DEP y la Plus X tenía un SL2 intermedio. Plus S y Plus X están descatalogadas; Plus SE (una 1K, 752 bytes) y Plus EV2 (2K o 4K, EAL5+, retención de 25 años, resistencia típica de 1.000.000 de ciclos) son las actuales. En SL1 un móvil ve SAK 08 o 18, igual que con una Classic; en SL3 ve una tarjeta ISO-DEP.

**MIFARE DESFire** es otra cosa: un pequeño sistema de archivos con aplicaciones, archivos, derechos de acceso por archivo y hasta 14 claves por aplicación, que habla APDU sobre ISO-DEP a hasta 848 kbit/s.

<div class="table-scroll">

| Chip | Memoria utilizable | Criptografía | Extras | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 kB | DES, triple DES | | 100k / 10 años | retirado en 2011; sus claves se recuperaron ese mismo año mediante análisis de consumo |
| DESFire EV1 | 2304, 4864 o 7936 bytes | DES, 3DES, AES-128 | compatible con NFC Forum Type 4, ID aleatorio | 200k mínimo / 10 años | no recomendado para diseños nuevos |
| DESFire EV2 | 2560, 5120, 8192 o 16384 bytes | AES-128, EAL5+ | MAC de transacción, comprobación de proximidad, firma de originalidad | 200k / 25 años | no recomendado para diseños nuevos |
| DESFire EV3 | 2560, 5120, 8192 o 16384 bytes | AES-128, EAL5+ | todo lo de EV2 más SUN/SDM y un temporizador de transacción; certificado NFC Forum Type 4 número 58652 | 200k mínimo, 1M típico / 25 años, de -25 a +85 °C | activo |
| DESFire Light | 640 bytes | solo AES-128, opción LRP, EAL4 | una aplicación fija con seis archivos | 200k / 10 años | activo |

</div>

El "2K" del nombre de una DESFire no son 2048 bytes de nada que puedas usar directamente. La nota comparativa de NXP da las cifras utilizables de la tabla, y cada aplicación y cada archivo que creas se lleva un trozo para sus propias cabeceras, que se reservan en páginas de 256 bytes. Pregúntale a la tarjeta con el comando FreeMemory en lugar de fiarte de la etiqueta. DESFire EV3 también trajo SUN a la familia, así que una EV3 puede hacer el truco de la NTAG 424 DNA de firmar una URL, cosa que la EV2 no puede.

En los móviles: iOS entrega la DESFire como una etiqueta MIFARE `.desfire`, o como una etiqueta ISO 7816 si la app pide la aplicación NDEF; Android usa `IsoDep`. NFC.cool identifica la generación y el tamaño con GetVersion y muestra las aplicaciones y los archivos que puede ver sin claves. No se autentica en una DESFire ni graba en ella; ese es trabajo de las herramientas propias del operador, y prefiero decirlo a fingir lo contrario.

### ISO 15693: la familia de largo alcance

Son los chips que se diseñaron para un metro, no para un centímetro. Un móvil los sigue leyendo (Apple desde iOS 13, Android mediante `NfcV`), y GoToTags midió que las etiquetas Type 5 se leían aproximadamente al doble de distancia que las Type 2 en un iPhone, pero su sitio natural es el arco de la biblioteca, la estantería del almacén y la lavandería industrial. El UID tiene 8 bytes y empieza por E0, los bloques son de 4 bytes y la familia añade tres cosas que los chips Type A no tienen: un **AFI** (un byte de familia de aplicación por el que un lector puede filtrar), un **DSFID** (un byte de formato de datos) y **EAS**, el bit de vigilancia electrónica de artículos que hace pitar el arco de una tienda.

**NXP ICODE.** El linaje va así: SLI (2000), SLI-S y SLI-L (2007), SLIX y sus variantes S y L (2010), SLIX2 (2014), ICODE DNA (2016) e ICODE 3 (2024). No existe ninguna "SLIX3"; un anuncio que lo diga se refiere a ICODE 3 o está adivinando.

<div class="table-scroll">

| Chip | Bytes de usuario / totales | Protección | Contador | Firma | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | solo bits de bloqueo | no | no | 100k / 10 años | fin de vida |
| ICODE SLI-S | 160 / 256 | cinco contraseñas de 32 bits: lectura, escritura, destrucción, privacidad, EAS | no | no | 100k / 10 años | ya no se fabrica |
| ICODE SLI-L | 32 / 64 | tres contraseñas | no | no | 100k / 10 años | ya no se fabrica |
| ICODE SLIX | 112 / 128 | una contraseña de 32 bits para EAS y AFI | no | no | 100k / 50 años | no recomendado para diseños nuevos |
| ICODE SLIX-S | 160 / 256 | cinco contraseñas de 32 bits, modo privacidad, destrucción | no | no | 100k / 50 años | activo |
| ICODE SLIX-L | 32 / 64 | tres contraseñas | no | no | 100k / 50 años | activo |
| ICODE SLIX2 | 316 / 320 | cinco contraseñas de 32 bits, modo privacidad, destrucción | 16 bits, avanza con un comando de escritura | sí, 32 bytes | 100k / 50 años | activo |
| ICODE DNA | 252 / 256 | autenticación mutua AES-128, tres claves | 16 bits | sí, reprogramable | 100k / 50 años | activo |
| ICODE 3 | 300 / 304 más un área de configuración de 192 bytes | seis contraseñas de 32 bits, dos modos de privacidad | 24 bits, puede contar lecturas como una NTAG | sí, 32 o 48 bytes, reprogramable | 100k / 50 años, hasta 105 °C | activo; existe una variante TagTamper |

</div>

ICODE 3 es la que conviene conocer: copia el UID y su contador de lecturas en el mensaje NDEF igual que una NTAG213, lee a hasta 212 kbit/s y sintoniza su antena por sí sola. No tiene AES; la pieza con AES es ICODE DNA, y ninguna de las dos hace SUN.

**STMicroelectronics ST25TV y ST25DV.** La línea Type 5 de ST, y la que tiene las mejores cifras de hoja de datos de toda la guía.

<div class="table-scroll">

| Chip | Bytes de usuario | Protección | Contador | Firma | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 o 256 | contraseñas de 32 o 64 bits, kill, modo no rastreable, antimanipulación en la variante -AD | contador de eventos de escritura de 16 bits | TruST25 | 100k / 60 años | no recomendado para diseños nuevos |
| ST25TV512C, ST25TV02KC | 64 o 320 | contraseñas, kill, modos silencioso y discreto, antimanipulación en la variante -T | ninguno; en su lugar, un código de lectura único de 3 dígitos | TruST25 | 100k / 60 años | activo, disponible hasta 2035 |
| ST25TV04K-P | 512 | contraseñas de 64 bits, kill | no | no | 1M / 40 años | activo; tiene un pin de captación de energía |
| ST25TV16K, ST25TV64K y las versiones KC | 2048 u 8192 | contraseñas de 64 bits, kill | no | no | 1M / 40 años | piezas K no recomendadas, piezas KC activas |
| ST25DV04K, 16K, 64K y las versiones KC | 512, 2048 u 8192 | tres contraseñas RF de 64 bits más una contraseña I2C | no | no | 1M / 40 años | piezas K no recomendadas, piezas KC activas |
| M24LR04E, 16E, 64E | 512, 2048 u 8192 | contraseñas de 32 bits | no | no | 1M / 40 años | no recomendado para diseños nuevos |

</div>

El **Augmented NDEF** de la ST25TV02KC merece un párrafo, porque se vende como seguridad. El chip inserta en la URL, en cada lectura, su UID, un campo personalizado y un **código de lectura único** de tres caracteres, sin tocar la EEPROM. El código cambia en cada lectura y la hoja de datos de ST dice literalmente que es "predecible". Es un testigo de frescura que le dice a tu servidor que se trata de una lectura nueva, no una prueba de que la etiqueta sea auténtica. TruST25, la firma de originalidad de ST sobre el UID, es la función de autenticidad, y como la de NXP es una firma estática que un clon puede copiar.

**El resto del mundo Type 5.** Los inlays Tag-it HF-I de Texas Instruments (Standard de 32 bytes, Pro de 32 bytes con escritura protegida por contraseña y un comando kill, Plus de 256 bytes) están en todas las bibliotecas que instalaron NFC antes de 2015, y hoy todos figuran como no recomendados u obsoletos. La EM4233 de EM Microelectronic (208 bytes, un modo de privacidad con clave de 96 bits, retención de 60 años) está disponible bajo pedido. La my-d de Infineon y la MB89R118 de Fujitsu aparecen en el código de identificación de NFC.cool porque los usuarios me las mandaron. La NTAG 5 de NXP (link, boost, switch) es un chip ISO 15693 a pesar del nombre NTAG, con 2048 o 512 bytes, un puerto I2C, captación de energía de hasta 30 mW y una EEPROM de 1.000.000 de ciclos y 40 años: una etiqueta conectada para electrónica, no una pegatina, y el software escrito para NTAG21x no va a hablar con ella.

> **En la práctica:** la SLIX2 es el chip que va dentro de cada bobina de filamento con OpenPrintTag, así que he tenido bastantes en la mano, y NFC.cool las lee, las graba y las formatea en ambas plataformas. Lo que la app no hace, y quiero dejarlo claro, son los comandos ISO 15693 de contraseña, privacidad, EAS y AFI. Los bytes de esos comandos están en el código como tabla de referencia; los botones todavía no están.

### Type 4 fuera de MIFARE: ST25TA

La familia ST25TA de ST son etiquetas Type 4 sobre ISO/IEC 14443 Type A sin nada de la maquinaria de DESFire: un archivo NDEF, un archivo de capability container y un archivo de sistema, dos contraseñas de 128 bits (lectura y escritura) y un contador de eventos de 20 bits que puede contar lecturas o escrituras.

<div class="table-scroll">

| Chip | Archivo NDEF | Contraseñas | Contador | Firma | Resistencia / retención | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 bytes | dos de 128 bits | 20 bits en la B | TruST25 en la B | 1M / 200 años | 512 no recomendado |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 bytes | dos de 128 bits | 20 bits | TruST25 en la B | 1M / 200 años | 02K y 02KB no recomendados; 02KB-P y 02KB-D activos |
| ST25TA16K, ST25TA64K | 2048 u 8192 bytes | dos de 128 bits | no | no | 1M / 200 años | activo |

</div>

Doscientos años de retención y un millón de ciclos de escritura, solo a 106 kbit/s. Las variantes -P y -D tienen un pin de salida de propósito general que cambia de estado cuando se lee la etiqueta, y así es como haces que una lámpara reaccione a un móvil. En los dos tipos de móvil se leen como etiquetas Type 4; NFC.cool lee y graba NDEF en ellas y muestra los detalles de ISO-DEP.

### Chips con sensor y doble interfaz

Son chips con dos caras: una antena NFC por un lado y un bus I2C, un sensor o una segunda radio por el otro.

| Chip | Lado NFC | El otro lado | Memoria | A destacar |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Type 2, 888 o 1912 bytes, contraseña de 32 bits, firma | I2C hasta 400 kHz, paso directo por SRAM de 64 bytes, pin de detección de campo | 200k a 500k / 20 años | captación de energía de hasta 15 mW; el chip del implante xSIID |
| ST25DV (ver arriba) | Type 5 | I2C hasta 1 MHz, un buzón de 256 bytes para transmisión continua | 1M / 40 años | captación de energía en el pin V_EH, sin regular, "algunos µW" según la hoja de datos |
| NTAG 5 link, boost, switch | Type 5, 2048 o 512 bytes, AES en la 5332 | I2C, GPIO, salidas PWM | 1M / 40 años | captación de hasta 30 mW; la variante switch no necesita ningún microcontrolador |
| NHS3100 | Type 2, emulado por firmware | un Cortex-M0+ con un sensor de temperatura con precisión de 0,3 °C | 32 kB de flash, 4 kB de EEPROM | un registrador de cadena de frío sobre una lámina, certificado por el NFC Forum |
| EM4423 "em echo" | Type 2, área NDEF de 240 bytes | RFID UHF RAIN, la misma memoria, el mismo número de serie | 100k / 10 años | descatalogado |
| EM4425 "em echo-V" | Type 5, hasta 256 bytes compartidos | RFID UHF RAIN, AES-128, contactos antimanipulación, firma digital | 100k / 50 años | actual; un solo chip que lee un móvil a un centímetro y un lector UHF de muelle de carga a varios metros |

No he construido nada con estos, así que esta tabla sale solo de hojas de datos. Importan en esta guía porque aparecen en los anuncios como "chip NFC" y confunden a la gente: una NTAG 5 no es una NTAG213, y una etiqueta em echo no va a hacer nada especial en tu móvil.

### Antiguos y de nicho

**Topaz** (Innovision, después Broadcom) es NFC Forum Type 1: bloques de 8 bytes, 96 o 512 bytes, bloqueos de una sola vez, 10.000 ciclos de escritura. Los dos tipos de móvil siguen leyendo NDEF de una Topaz, pero el NFC Forum retiró Type 1 de su conjunto de especificaciones de 2021 y ya nadie la usa en diseños nuevos. Los distribuidores todavía tienen existencias.

**FeliCa** es la familia de Sony y el transporte público de Japón. FeliCa Lite-S (224 bytes de memoria de usuario en bloques de 16 bytes, un IDm de 8 bytes, un MAC triple DES simplificado) es la versión etiqueta y es NFC Forum Type 3; FeliCa Standard es la versión tarjeta inteligente, ahora con AES y una certificación Common Criteria EAL6+ en la actual RC-SA01, y es sobre la que funcionan Suica, PASMO, Edy, WAON, nanaco y la Octopus de Hong Kong. Sony descatalogó sus módulos FeliCa Plug en marzo de 2026. NFC.cool identifica las marcas de transporte y de dinero electrónico por el código de sistema en ambas plataformas, lee Lite-S y Standard, y graba NDEF en ellas en iPhone.

**Kovio NFC Barcode** era una etiqueta de silicio impreso, de solo lectura y 16 bytes. Android todavía tiene una clase `NfcBarcode` para ella. Los activos de Kovio pasaron a Thinfilm en 2014, Thinfilm dejó de producir NFC en 2019 y cambió de nombre en 2021. La clase es un fósil.

**Chips de memoria ISO 14443 Type B.** Las SRI512, SRT512 y SRI4K de ST (512 o 4096 bits en bloques de 32 bits, dos contadores descendentes, 1.000.000 de ciclos, 40 años) viven en el transporte francés y belga y en algunos forfaits de esquí. Android los expone mediante `NfcB`; el iPhone no tiene ningún objeto de etiqueta Type B a bajo nivel, así que, a menos que una tarjeta Type B hable ISO-DEP y responda a un SELECT, un iPhone no la verá. Calypso, el sistema Navigo de París, es una tarjeta inteligente Type B que sí lo hace.

### Clones y compatibles

Esta es la sección que los anuncios no quieren que leas.

**Fudan FM11NT021** es la "NTAG213" más común que no es una NTAG213. Tiene los mismos 180 bytes en 45 páginas, la misma área de usuario de 144 bytes, una contraseña, un contador de lecturas de 24 bits y el código de fabricante de Fudan, 1D, en el UID. No implementa GET_VERSION y su hoja de datos actual no incluye ningún comando READ_SIG, así que un lector que haga cualquiera de las dos preguntas recibe silencio y acaba adivinando por el tamaño de memoria, y por eso la comunidad de Proxmark3 la identifica como una NTAG203. Fudan también fabrica versiones de 504 y 888 bytes (FM11NT041, FM11NT081). Para un enlace en una pegatina funcionan. Para Amiibo no, porque la consola pregunta primero por GET_VERSION.

**Fudan FM11RF08 y FM11RF08S** son los chips compatibles con Classic de la mayoría de las tarjetas "1K" baratas. La 08S añadió en 2020 contramedidas contra los ataques conocidos a Classic y luego resultó llevar una clave de puerta trasera de hardware común a todas las tarjetas fabricadas, que Quarkslab publicó en 2024 junto con herramientas que ya están en el firmware de Proxmark3.

**Las tarjetas MIFARE Classic "mágicas"** son chips fabricados para que el UID y el bloque del fabricante se puedan reescribir, algo que una Classic auténtica nunca permite. Sus generaciones son un hobby en sí mismas:

| Generación | Cómo cambia el UID | ¿Se detecta? | Notas |
| --- | --- | --- | --- |
| Gen1a, Gen1b | un comando de activación por puerta trasera | sí, cualquier lector puede sondear la puerta trasera | la "tarjeta mágica china" original; los sistemas de acceso la filtran |
| Gen2, CUID | una escritura normal en el bloque 0 tras autenticarse | no hay puerta trasera que sondear; un lector tiene que intentar una escritura | compatible con móviles, la más común hoy |
| FUID, UFUID | una vez, o hasta que se sella | antes de sellarla | tarjetas de un solo uso para clonar una tarjeta de acceso de forma permanente |
| Gen3, APDU | comandos APDU especiales | un lector que conozca los comandos | |
| Gen4 GTU, GDM, "Ultimate" | una configuración protegida por contraseña; también puede emular Ultralight y NTAG | solo mientras la contraseña sea la de fábrica | un camaleón de cualquier familia, con UID de 7 bytes, en formato tarjeta |

También existen tarjetas NTAG21x mágicas, y las que emulan por completo aceptan incluso una firma de originalidad copiada, que es justo lo que NXP señala sobre las firmas estáticas.

**"Compatible con NTAG215" para Amiibo.** Un Amiibo es una NTAG215 normal cuyos 540 bytes llevan datos cifrados y firmados con claves derivadas del propio UID de la etiqueta. Si copias los bytes a otra etiqueta, las firmas dejan de coincidir, y por eso una copia de seguridad tiene que volver a cifrarse para el UID de destino, que es lo que hace la función de [copia de seguridad y restauración de Amiibo](/blog/amiibo-iphone-android-read-collect-backup/) de NFC.cool. La secuencia de lectura de la consola empieza con GET_VERSION, sigue con una autenticación por contraseña derivada del UID y luego lee las 135 páginas, incluidas las de configuración. Un chip sin GET_VERSION o con 45 páginas en lugar de 135 falla en el primer paso. La documentación de TagMo lo resume en una línea: solo se reconoce la NTAG215.

**Cómo aparece un clon en la app.** NFC.cool identifica primero por GET_VERSION. Un chip que no responde, o que responde con un tamaño de memoria que no coincide con lo que anuncia, recibe el nombre de lo que es en realidad, no el del anuncio. En una NTAG 424 DNA la app va un paso más allá y comprueba la firma de originalidad ECDSA con la clave pública de NXP, que es el único sitio de la app que puede decir "Genuine NXP" con respaldo criptográfico. En las NTAG21x la app no lee la firma, en parte porque la clave de verificación de NXP está bajo NDA y en parte porque una firma estática copiada pasa la comprobación de todos modos. La cadena de pruebas honesta para una etiqueta Type 2 es el código de fabricante, GET_VERSION, el tamaño de memoria y la presencia de las funciones que el chip dice tener.

---

## Formatos y alcance de lectura

El chip decide lo que puede hacer la etiqueta; el formato decide si el móvil llega a ella.

| Formato | Qué es | Antena típica | Alcance con un móvil | Certificaciones y notas |
| --- | --- | --- | --- | --- |
| Wet inlay | la antena grabada y el chip sobre una película de PET con adhesivo y un papel protector | 22 a 38 mm | 2 a 4 cm | la forma más barata de comprar un chip; se pega una sola vez |
| Dry inlay | lo mismo sin adhesivo | como arriba | como arriba | para laminarlo dentro de otra cosa |
| Pegatina de papel o PET | un inlay con una cara imprimible | 22 a 38 mm | 2 a 4 cm | una cara de papel se puede imprimir, una de PET aguanta el agua |
| Tarjeta de PVC | ISO 7810 ID-1, 85,60 x 53,98 mm, 0,76 mm de grosor | toda la tarjeta | 3 a 5 cm | la antena más grande que vas a tener en la mano; también es para lo que se diseñan los lectores |
| Moneda, ficha de epoxi | un inlay bajo una cúpula de resina dura, a menudo con un agujero | 20 a 30 mm | 2 a 3 cm | resistente al agua; el formato de los Amiibo |
| Llavero | un inlay en una carcasa de ABS | 20 a 30 mm | 2 a 3 cm | un llavero de GoToTags está certificado IP67 y de -25 a +75 °C |
| Pulsera | silicona con un inlay | 20 a 25 mm | 1 a 3 cm | festivales, piscinas; la pulsera se dobla, el inlay no debería |
| Para metal | un inlay con una lámina de ferrita entre la antena y el metal | 22 a 34 mm | 2 a 3 cm sobre metal | Seritag mide 21 a 25 mm sobre metal frente a 26 a 30 mm fuera de él para la misma etiqueta de 22 mm; la versión industrial de 34 mm se lee a 31 a 40 mm y es IP68, de -25 a +85 °C |
| Etiqueta de lavandería | un chip en un botón de PPS | 16 mm | 1 a 2 cm | Smartrac certifica su etiqueta HF de lavandería para 200 lavados, de -30 a +200 °C y 60 bar; la mayoría de las etiquetas de lavandería son ISO 15693 que solo llevan el UID |
| Implante | un chip en una cápsula de vidrio de 2 x 12 mm o en un polímero flexible | unos pocos milímetros | necesita el punto exacto del móvil | el xNT es una NTAG216, el NExT añade una T5577 de 125 kHz, el xSIID es una NTAG I2C plus con un LED, el xDF es una DESFire; las versiones flexibles se leen mucho mejor que las de vidrio |

Dos reglas físicas explican la mayoría de las consultas del tipo "no se lee". **El tamaño de la antena marca el alcance**, a grandes rasgos: una tarjeta se lee desde más lejos que una moneda, una moneda desde más lejos que un inlay de 10 mm, y un implante necesita contacto. **El metal desintoniza la antena**: una bobina sobre una superficie metálica induce corrientes parásitas en el metal, su inductancia baja y su resonancia se aleja de 13,56 MHz, así que una etiqueta normal sobre un armario de acero está muerta. Una lámina de ferrita entre la bobina y el metal redirige el campo y devuelve la etiqueta a la vida, a cambio de menos alcance y más coste, y por eso las etiquetas para metal cuestan el triple.

Dónde colocas el móvil importa tanto como la etiqueta. En un iPhone la antena está en el borde superior; la propia instrucción de Apple es "acerca la parte superior del iPhone" a la etiqueta. En Android depende del modelo, normalmente el centro de la parte trasera o cerca de la cámara. La [guía para principiantes](/blog/nfc-tags-beginners-guide/) lo explica paso a paso.

---

## Qué lee qué

La matriz de móviles y lectores. Las columnas de móviles salen de la documentación de Apple y Google y de mi propia app; las columnas de escritorio y de aficionados salen de las fichas técnicas de los fabricantes y de la propia documentación de los proyectos, y no he probado esos dispositivos personalmente, salvo los lectores que aparecen en la columna de iPad y Mac.

<div class="table-scroll sticky-first">

| Familia de chips | iPhone en segundo plano | iPhone dentro de una app | Android | iPad y Mac con un lector USB | Web NFC (Chrome en Android) | ACR122U | ACR1552U, OMNIKEY 5022 | Placa PN532 | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, otras Type 2 | solo registros URL | NDEF, contraseña, contador, espejo, volcado | igual | igual, a través de NFC.cool | solo NDEF | sí | sí | sí | sí, más emulación | sí, más emulación |
| NTAG 22x DNA | registros URL | NDEF, comandos a bajo nivel | igual | como Type 2 | NDEF | sí | sí | sí | sí | se lee como NTAG |
| NTAG 424 DNA, ST25TA, DESFire como Type 4 | registros URL | NDEF, APDU | NDEF, APDU | NDEF, configuración completa de la 424 | NDEF | sí | sí | sí | sí | lee NDEF; sin operaciones con claves |
| Ultralight C | NDEF si está formateada | NDEF, comandos nativos | igual | NDEF | NDEF | sí | sí | sí | sí | sí |
| Ultralight AES | NDEF si está formateada | NDEF, comandos nativos | igual | NDEF | NDEF | sí | sí | sí | sí | se lee como Ultralight |
| MIFARE Classic | no | solo UID y familia | lectura y grabación completas en móviles cuyo controlador tiene CRYPTO1 | solo lectura NDEF, claves conocidas | no | sí, con claves | sí, con claves | sí, con claves | sí, más recuperación de claves y emulación | sí, más recuperación de claves y emulación |
| MIFARE Plus | no | UID en SL1; ISO-DEP en SL3 | como Classic en SL1; IsoDep en SL3 | UID | no | sí | sí | sí | sí | no documentado |
| DESFire, nativa | no | familia y versión, APDU | IsoDep | versión | no | sí | sí | sí | sí | solo leer y guardar |
| ISO 15693: ICODE, ST25TV, ST25DV, TI, EM | registros URL | conjunto completo de comandos ISO 15693 desde iOS 13 | NfcV | no probado | NDEF | no | sí | no | sí, más emulación | sí, más emulación |
| FeliCa Lite-S y Standard | registros URL | lectura y grabación, declarando el código de sistema | NfcF | lectura; grabación en FeliCa a través de NFC.cool | NDEF | sí | solo UID en el OMNIKEY | sí | sí | lectura y emulación de Lite-S |
| Topaz (Type 1) | NDEF | NDEF | NDEF | no probado | NDEF | sí | no documentado | sí | sí | no documentado |
| Memoria ISO 14443 Type B (SRI512) | no | no | NfcB | no probado | no | sí | sí | solo como lector | sí | solo UID |
| Tarjetas de 125 kHz, chips de mascotas, etiquetas UHF | no | no | no | no | no | no | no | no | 125 kHz sí | 125 kHz sí |

</div>

Algunas filas merecen una frase.

- **La lectura en segundo plano del iPhone** solo salta con un registro URL NDEF, solo cuando el móvil está desbloqueado y en uso, y no mientras estén activos la cámara, Wallet, una sesión de lectura o el modo avión. Nunca lee un chip a bajo nivel. iPhone XS y posteriores.
- **Qué iPhone leen etiquetas siquiera:** del iPhone 7 en adelante dentro de una app, según la sesión de la WWDC 2019 de Apple. La grabación y los comandos a bajo nivel llegaron con iOS 13.
- **La clase `MifareClassic` de Android es opcional.** En palabras de la propia Google: "si no está implementada, MifareClassic nunca se enumerará". Depende del controlador, no de la versión de Android.
- **Web NFC** es solo NDEF, Chrome 89 y posteriores, solo Android, y Apple tiene una postura contraria, así que no habrá versión para Safari. Por eso el [lector NFC online](/online-nfc-reader/) de esta web funciona en Android y les dice a los usuarios de iPhone que usen la app.
- **El iPad y el Mac no tienen radio NFC.** Desde NFC.cool 6.15.0 la app habla en su lugar con un lector USB CCID a través de la pila de tarjetas inteligentes de Apple; el HID OMNIKEY 5022 CL es el que probé yo, el ACS ACR1552U-M1 y el ACR1255U-J1 funcionan según los usuarios, y [el artículo](/blog/nfc-reading-ipad-mac/) detalla los límites. Poner una contraseña a una NTAG funciona con un lector; quitarla necesita un comando que el OMNIKEY rechaza, así que eso hay que hacerlo con el móvil.
- **El ACS ACR122U no hace ISO 15693**, y tampoco el ACR1252U ni el ACR1255U-J1. En la línea de ACS solo lo hace el ACR1552U. El OMNIKEY 5022 hace las dos cosas. Conviene saberlo antes de comprar un lector para etiquetas de biblioteca.
- **Proxmark3 y Flipper Zero** son las herramientas que pueden recuperar claves de MIFARE Classic y emular tarjetas. Para eso existen, y la guía los menciona porque hablar de "qué lo lee" sin ellos no sería honesto.

<div class="table-scroll">

| Lector | Interfaz | Type A | Type B | FeliCa | ISO 15693 | 125 kHz | Classic con claves | Recuperación de claves de Classic | Emulación | Precio visto en septiembre de 2026 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | sí | sí | sí | no | no | sí | no | no | unos 40 a 50 USD; ACS lo ha descatalogado y abundan las falsificaciones |
| ACS ACR1252U | USB, PC/SC | sí | sí | sí | no | no | sí | no | modo de emulación de tarjeta | 97,50 USD |
| ACS ACR1552U | USB, PC/SC | sí | sí | sí | sí | no | sí | no | modo de emulación de tarjeta | 44,81 USD |
| ACS ACR1255U-J1 | Bluetooth y USB | sí | sí | sí | no | no | sí | no | no | 64,81 USD |
| HID OMNIKEY 5022 CL | USB, PC/SC | sí | sí | solo UID | sí | no | sí | no | no | 69,99 EUR |
| Placa PN532 | SPI, I2C, UART | sí | solo como lector | sí | no | no | sí | herramientas del ordenador | Classic 1K/4K y FeliCa | 24 a 40 USD |
| Proxmark3 RDV4 | USB, opción BLE | sí | sí | sí | sí | sí | sí | sí | sí | 329 a 529 EUR |
| Proxmark3 Easy | USB | sí | sí | sí | sí | sí | sí | parcial | sí | 78 EUR; clones desde unas 28 GBP |
| Flipper Zero | autónomo, USB-C, BLE | sí | limitado | Lite-S | sí | sí | sí | sí | sí | 169 USD |
| Chameleon Ultra | USB-C, BLE | lectura y emulación | no | no | no | emulación y lectura | sí | sí | sí | 129 EUR |

</div>

---

## Qué hace NFC.cool Tools con cada chip

Este es el punto de un artículo en el que aparece lo que he construido, y aquí tiene sentido, porque cada fila de arriba acaba en "¿y qué hace la app con esto?". La tabla de abajo no es texto de marketing; la saqué del propio código fuente de la app mientras escribía esta guía, y me corrigió dos cosas que, de otro modo, habría afirmado.

| Familia de chips | iPhone | Android | iPad y Mac con un lector |
| --- | --- | --- | --- |
| Identificación por producto | unos 60 nombres: NTAG203 a 216, NTAG I2C, Ultralight y C, Ultralight EV1 por tamaño, Ultralight AES, Classic Mini, 1K y 4K, Plus 2K y 4K por nivel de seguridad, DESFire EV1, EV2 y EV3 por tamaño, NTAG 424 DNA y su variante TagTamper, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L y SLIX2, TI Tag-it Standard, Pro y Plus, ST25TV, ST25DV y M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 y EM4423, FeliCa Lite y Standard más Suica, PASMO, ICOCA, Edy, WAON y nanaco; las tarjetas EMV y PIV se reconocen como tales | unos 20 nombres: NTAG203, 213, 215 y 216, NTAG 424 DNA, DESFire, Classic Mini, 1K y 4K, Plus 2K y 4K, JCOP y SmartMX, marcas FeliCa incluida Octopus; los chips ISO 15693 se indican por tamaño, no por producto | el tipo de tarjeta a partir de la respuesta del lector al reset |
| Leer NDEF | todas las familias | todas las familias | Type 2, Type 4, FeliCa; Classic con las claves públicas |
| Grabar NDEF, vaciar una etiqueta | Type 2, Type 4, Type 5, FeliCa Lite-S y Standard | Type 2, Type 5, MIFARE Classic con el directorio NDEF, cualquier cosa que Android pueda formatear | Type 2, Type 4, FeliCa |
| Poner a cero toda la memoria | Type 5 | Type 2, Type 5, Classic | como en iPhone |
| Bloqueo permanente | bytes de bloqueo de Type 2; NDEF de solo lectura en Type 4, Type 5 y FeliCa; rechazado a propósito en la NTAG 424 DNA | Type 2 | sí |
| Contraseña | NTAG213, 215, 216 y 203 | la familia Type 2 | ponerla sí; quitarla depende del lector |
| Contador de toques y espejo | NTAG213, 215, 216 | NTAG213, 215, 216 | sí |
| Volcado completo de memoria | Type 2, ISO 15693, listado de archivos de DESFire, FeliCa, archivos de la NTAG 424 DNA | Classic con la clave de fábrica, Ultralight, ISO 15693, FeliCa, cualquier Type A | Type 2, Type 4, FeliCa |
| Contenido de MIFARE Classic | no; Core NFC no tiene CRYPTO1 | lectura con la clave de fábrica, formateo y grabación con las claves conocidas | solo lectura NDEF |
| NTAG 424 DNA | claves, SUN en modo normal y cifrado, derechos de acceso a archivos, configuración del chip, el archivo caja fuerte, UID aleatorio, LRP, estado antimanipulación, comprobación de la firma de originalidad | lo mismo | lo mismo |
| Amiibo | copia de seguridad y restauración de NTAG215, volviendo a cifrar para la etiqueta de destino | lo mismo | sí |
| Contraseña, EAS y AFI de ISO 15693 | todavía no | todavía no | no |
| Autenticación y grabación en DESFire | no | no | no |
| Comandos a bajo nivel | modo experto de APDU | un catálogo de comandos | sí |

Las dos correcciones, para que conste: habría escrito que la app comprueba la firma de originalidad en las etiquetas NTAG21x, y no lo hace; solo la 424 tiene eso. Y habría escrito que los comandos de contraseña de ISO 15693 ya estaban, y son una tabla de referencia esperando una interfaz. Las dos cosas están en la lista de pendientes.

---

## Comprar sin llevarte un chasco

Lo que tiene que decir un anuncio antes de que yo compre:

1. **El nombre exacto del chip.** "NTAG213", no "NFC 213"; "ICODE SLIX2", no "etiqueta ISO 15693"; "MIFARE Classic EV1 1K", no "tarjeta 1K". Si el anuncio no nombra el chip, el vendedor no lo sabe o no quiere que lo sepas.
2. **La memoria de usuario en bytes**, y tiene que cuadrar con el chip: 144 para una NTAG213, 504 para una 215, 888 para una 216, 316 para una SLIX2. Una "1K" que resulta ser una MIFARE Classic no va a funcionar en un iPhone.
3. **El fabricante**, si dice ser NXP o ST original. El código de fabricante del UID te dirá la verdad después de comprar; el precio te la dirá antes. Nadie vende pegatinas NTAG216 originales a un tercio del precio normal.
4. **El tamaño de la antena y el formato.** Un inlay de 10 mm se lee a un centímetro; uno de 38 mm, a cuatro. Si es para metal, tiene que decir que es para metal.
5. **Si viene formateada para NDEF.** Las NTAG vienen formateadas de fábrica; las Ultralight EV1 y la mayoría de los chips ISO 15693 no, y NFC.cool las formatea, pero es un paso más.

Señales de alarma: "compatible con NTAG215" (no es una NTAG215), "cifrada" en cualquier cosa por debajo del peldaño 4 de la escalera, "funciona con todos los móviles" en una MIFARE Classic, y cualquier nombre de chip con una letra que el fabricante nunca usó, como SLIX3.

**Lo que cuestan las etiquetas.** Precios de catálogo que vi el 9 de septiembre de 2026 en Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand y Digi-Key. La mayoría de las tiendas venden como mínimo de diez en diez, así que la columna "unidad" es el lote más pequeño que ofrecen. Los precios cambian; tómalos como proporciones.

| Etiqueta | Unidad o lote más pequeño | Por 100 | Por 1.000 | Chip suelto |
| --- | --- | --- | --- | --- |
| Pegatina NTAG213 | 0,32 a 0,65 EUR, 0,33 a 0,58 USD | 0,29 a 0,34 EUR | 0,23 a 0,24 EUR, 0,50 USD | 0,14 USD en volumen de oblea |
| Pegatina o tarjeta NTAG215 | 0,48 a 0,54 USD, 0,64 a 0,67 GBP | 0,35 USD | 0,33 USD | 0,21 USD |
| Pegatina NTAG216 | 0,97 EUR, 0,71 USD | 0,70 EUR, 0,61 USD | 0,56 EUR, 0,56 USD | 0,37 USD |
| Pegatina NTAG 424 DNA | 0,63 EUR, 0,90 USD | 0,62 EUR, 0,77 USD | 0,57 EUR, 0,68 USD | 0,79 USD la unidad, 0,51 por 1.000 |
| Tarjeta MIFARE Classic 1K | 1,35 a 1,59 EUR de diez en diez; 6,69 EUR como tarjeta suelta al por menor | 1,29 a 1,52 EUR, 1,98 USD | 0,95 a 1,13 EUR, 0,86 USD | |
| Tarjeta DESFire EV3 | 1,85 a 2,79 EUR | 1,85 a 2,45 EUR | 1,35 a 2,29 EUR | 1,18 USD a partir de 31.000 |
| Etiqueta ICODE SLIX2 | 0,69 EUR | 0,34 a 0,37 EUR | 0,22 a 0,25 EUR | 0,35 USD la unidad, 0,22 por 1.000 |
| Inlay ST25TV02KC | 0,32 a 0,87 USD | 0,30 a 0,79 USD | 0,28 a 0,77 USD | 0,13 USD por bobina |

El patrón es el que te imaginas: la memoria sale casi gratis, la criptografía cuesta más o menos el doble y el formato cuesta más que el chip. Un chip NTAG213 suelto cuesta catorce céntimos; la pegatina que lo rodea es la mayor parte del precio.

Dónde comprar: tengo una lista de las etiquetas y los lectores que uso de verdad en la [página de enlaces de afiliado](/affiliate-links/), y las etiquetas 424 con las que empezó todo el conjunto de funciones DNA vinieron de AliExpress, así que no te voy a decir que los marketplaces estén prohibidos. Comprueba con la app lo que te llega antes de grabarle nada.

---

## Todo el catálogo en una tabla

Una fila por chip. "Bytes de usuario" es lo que puedes grabar; en DESFire es la cifra utilizable de NXP. Las columnas de móviles dicen lo que puede hacer la plataforma, no lo que hace cada app; la columna de NFC.cool dice lo que hace la mía. En el móvil, desplázate hacia los lados; la primera columna se queda fija.

<div class="table-scroll sticky-first">

| Chip | Fabricante | Tipo del Forum | Estándar | Bytes de usuario | UID | Protección | Resistencia / retención | iPhone | Android | NFC.cool | Ideal para |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | bits de bloqueo | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | lectura, grabación | desechables diminutos |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | contraseña | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | lectura, grabación | antenas pequeñas |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | contraseña | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | lectura, grabación | antenas pequeñas con algo de margen |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | contraseña, contador, espejo | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | todo | la pegatina por defecto |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | contraseña, contador, espejo | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | todo, Amiibo | Amiibo, contenidos medianos |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | contraseña, contador, espejo | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | todo | contactos, la opción segura |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | contraseña, pin de detección de campo | 100k / 10 años | como la 213 | como la 213 | como la 213 | etiquetas integradas en electrónica |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | contraseña, hilo antimanipulación | 100k / 10 años | como la 213 | como la 213 | como la 213 | precintos |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | bloqueo, OTP | 10k / 5 años | NDEF | NDEF | lectura, grabación, contraseña | existencias antiguas |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | contraseña | 200k a 500k / 20 años | NDEF, bajo nivel | NDEF, bajo nivel | identifica, lectura, grabación | electrónica con un MCU |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | contraseña o AES, SUN | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | como Type 2 | autenticidad barata |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | como arriba, sensor | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | como Type 2 | precintos y sensores |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 claves AES, SUN | 200k / 50 años | NDEF, APDU | NDEF, APDU | identifica | descatalogado |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 claves AES, SUN, LRP | 200k / 50 años | NDEF, APDU | NDEF, APDU | configuración completa | autenticidad |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | como arriba, antimanipulación | 200k / 50 años | NDEF, APDU | NDEF, APDU | configuración completa | precintos de autenticidad |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | bloqueo, OTP | 10k / 5 años | NDEF | NDEF | lectura, grabación | descatalogado |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | lectura, grabación | billetes antiguos |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | contraseña, 3 contadores | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | lectura, grabación, contraseña | billetes, desechables |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | lectura, grabación | Type 2 con autenticación |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | bloqueo, OTP | 100k / 10 años | NDEF | NDEF | lectura, grabación | billetes de un solo viaje |
| Classic Mini | NXP | ninguno | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 años | UID | depende del controlador | Android: lectura, formateo | nada |
| Classic 1K, EV1 | NXP | ninguno | 14443-A | 752 | 4 o 7 | CRYPTO1 | 100k / 10 años | UID | depende del controlador | Android: lectura, formateo | nada |
| Classic 4K, EV1 | NXP | ninguno | 14443-A | 3440 | 4 o 7 | CRYPTO1 | 100k / 10 años | UID | depende del controlador | Android: lectura, formateo | nada |
| Plus SE | NXP | ninguno | 14443-A | 752 | 4 o 7 | AES en SL3 | 100k / 10 años | UID | como Classic | identifica | migración desde Classic |
| Plus EV2 | NXP | ninguno | 14443-4 en SL3 | 1520, 3440 | 4 o 7 | AES-128, EAL5+ | 200k / 25 años | ISO-DEP | IsoDep | identifica | control de acceso |
| DESFire EV1 | NXP | 4 | 14443-4 | 2304 a 7936 | 7 | DES, 3DES, AES | 200k / 10 años | NDEF, APDU | NDEF, APDU | identifica, lista archivos | transporte antiguo |
| DESFire EV2 | NXP | 4 | 14443-4 | 2560 a 16384 | 7 | AES, EAL5+ | 200k / 25 años | NDEF, APDU | NDEF, APDU | identifica, lista archivos | control de acceso |
| DESFire EV3 | NXP | 4 | 14443-4 | 2560 a 16384 | 7 | AES, SUN, EAL5+ | 200k mín., 1M típ. / 25 años | NDEF, APDU | NDEF, APDU | identifica, lista archivos | control de acceso, transporte |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 años | NDEF, APDU | NDEF, APDU | identifica | tarjetas de una sola aplicación |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | bloqueo | 100k / 10 años | NDEF, bajo nivel | NfcV | lectura, grabación, formateo | fin de vida |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | contraseñas | 100k / 10 años | NDEF, bajo nivel | NfcV | lectura, grabación, formateo | ya no se fabrica |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | contraseña EAS/AFI | 100k / 50 años | NDEF, bajo nivel | NfcV | lectura, grabación, formateo | existencias de bibliotecas y logística |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | contraseñas, privacidad | 100k / 50 años | NDEF, bajo nivel | NfcV | lectura, grabación, formateo | logística |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | contraseñas, privacidad, contador, firma | 100k / 50 años | NDEF, bajo nivel | NfcV | lectura, grabación, formateo | inventario, bobinas OpenPrintTag |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 años | NDEF, bajo nivel | NfcV | se lee como ISO 15693 | protección de marca a distancia |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | contraseñas, contador de lecturas, espejo, firma | 100k / 50 años | NDEF, bajo nivel | NfcV | se lee como ISO 15693 | el chip de inventario actual |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | contraseñas, AES en la 5332 | 1M / 40 años | NDEF, bajo nivel | NfcV | se lee como ISO 15693 | electrónica conectada |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | kill, código de lectura, TruST25 | 100k / 40 años | NDEF, bajo nivel | NDEF, bajo nivel | se lee como Type 2 | la alternativa a la NTAG213 |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | contraseñas, kill, privacidad, código de lectura, TruST25 | 100k / 60 años | NDEF, bajo nivel | NfcV | identifica ST25TV, lectura, grabación | etiquetas con una URL nueva en cada lectura |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | contraseñas de 64 bits, kill | 1M / 40 años | NDEF, bajo nivel | NfcV | lectura, grabación | almacenamiento Type 5 grande |
| ST25DV04K a 64K | ST | 5 | 15693 | 512 a 8192 | 8 | contraseñas de 64 bits | 1M / 40 años | NDEF, bajo nivel | NfcV | identifica ST25DV, lectura, grabación | etiquetas dinámicas con un MCU |
| M24LR | ST | no declarado | 15693 | 512 a 8192 | 8 | contraseñas de 32 bits | 1M / 40 años | NDEF, bajo nivel | NfcV | se lee como ST25TV | doble interfaz antigua |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | contraseñas de 128 bits, contador, TruST25 en la B | 1M / 200 años | NDEF, APDU | NDEF, APDU | lectura, grabación | Type 4 sin DESFire |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | contraseñas de 128 bits | 1M / 200 años | NDEF, APDU | NDEF, APDU | lectura, grabación | almacenamiento Type 4 grande |
| TI Tag-it HF-I Standard, Pro, Plus | TI | no declarado | 15693 | 32, 32, 256 | 8 | bloqueo; la Pro añade escritura con contraseña y kill | 100k / 10 años | NDEF, bajo nivel | NfcV | identifica, lectura | bibliotecas antiguas |
| EM4233 | EM | no declarado | 15693 | 208 | 8 | clave de 96 bits, privacidad, destrucción | ? / 60 años | NDEF, bajo nivel | NfcV | identifica, lectura | bajo pedido |
| EM4425 em echo-V | EM | 5 | 15693 más UHF | hasta 256 | 8 | AES-128, contraseñas, antimanipulación | 100k / 50 años | NDEF, bajo nivel | NfcV | se lee como ISO 15693 | comercio de doble frecuencia |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | contraseña, contador de valor | 100k / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | identifica, lectura | billetaje |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | contraseña, contador | 500k declarados / 10 años | NDEF, bajo nivel | NDEF, bajo nivel | se lee como una Type 2 genérica | pegatinas baratas para enlaces |
| Fudan FM11RF08, 08S | Fudan | ninguno | 14443-A | 752 | 4 | CRYPTO1, con puerta trasera | ? | UID | depende del controlador | como Classic | nada |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, unos 480 | 7 | bloqueos de una sola vez | 10k / 5 años | NDEF | NDEF | NDEF | antiguo |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | MAC 3DES | ? | NDEF, bajo nivel | NfcF | lectura, grabación | Japón |
| FeliCa Standard | Sony | 3 | 18092 | 4 kB | 8 | AES, EAL6+ | ? | NDEF, bajo nivel | NfcF | lectura, marcas | transporte y dinero electrónico |
| Kovio NFC Barcode | Kovio, Thinfilm | ninguno | propietario | 16, solo lectura | ninguno | ninguna | n/d | no | NfcBarcode | no | desaparecido |
| ST SRI512, SRT512, SRI4K | ST | ninguno | 14443-B | 64, 512 | 8 | contadores, bloqueo | 1M / 40 años | no | NfcB | no | transporte Type B |

</div>

---

## Las comparativas que más se buscan

**NTAG213 vs NTAG215 vs NTAG216.** El mismo chip en tres tamaños de memoria: 144, 504 y 888 bytes, con la misma contraseña, el mismo contador, el mismo espejo y la misma firma. Compra la 213 para un enlace, la 215 para Amiibo y la 216 para una tarjeta de contacto o para no tener que pensarlo. La diferencia de precio ronda los treinta céntimos.

**NTAG213 vs Ultralight EV1.** La misma interfaz de radio y los mismos comandos; la NTAG tiene el espejo ASCII y un capability container pregrabado, la EV1 tiene tres contadores de un solo sentido y viene en 48 o 128 bytes. Para pegatinas, la NTAG; para billetes, la EV1.

**NTAG213 vs ST25TN01K vs Fudan FM11NT021.** Tres chips Type 2 de entre 144 y 160 bytes. La NTAG tiene contraseña y contador de lecturas y responde a GET_VERSION; la ST25TN tiene más memoria, un comando kill, un código de lectura y TruST25, pero no tiene contraseña; la Fudan copia las funciones de la NTAG salvo GET_VERSION y, según su hoja de datos actual, la firma. Para un enlace sin más, cualquiera; para un contador o para Amiibo, la NTAG.

**MIFARE Classic vs DESFire.** No hay color. El cifrado de Classic se rompió en 2008 y a su clon más común se le encontró una puerta trasera en 2024; la DESFire EV3 tiene AES, gestión de claves, certificación EAL5+ y SUN. El único argumento a favor de Classic es que el lector de la pared se instaló en 2009.

**NTAG 424 DNA vs NTAG213.** La 424 firma cada lectura con AES-128 y guarda 416 bytes en tres archivos con cinco claves; la 213 guarda 144 bytes con una contraseña de 32 bits. Si la pregunta es "¿este producto es auténtico?", solo la 424 la responde. Si la pregunta es "¿esta pegatina abre un enlace?", la 213 lo hace por un tercio del precio.

**NTAG 424 DNA vs NTAG 223 DNA.** Las dos hacen SUN. La 424 es Type 4 con cinco claves, LRP, opción de UID aleatorio, un archivo caja fuerte y 50 años de retención; la 223 es una pegatina Type 2 con una clave SUN, una contraseña de 32 bits y 10 años. La 223 es la forma más barata de poner una URL firmada en una etiqueta; la 424 es la que hoy puedes configurar con una app.

**ICODE SLIX2 vs NTAG216 para inventario.** Si el único lector es un móvil, la NTAG216 tiene más memoria y el contador. Si interviene un arco o un lector de mano, la SLIX2 se lee a un metro y la NTAG a cuatro centímetros, y eso lo decide todo.

**FeliCa vs NTAG en Japón.** Un torno de transporte japonés habla FeliCa y nada más; un móvil japonés lee las dos. Para una etiqueta en un cartel en Tokio, la NTAG va bien. Para cualquier cosa que tenga que aceptar un lector de Suica, FeliCa, y ese no es un chip que programes con una app del móvil.

---

## Preguntas frecuentes

### ¿Compro NTAG215 o NTAG216?

La 216, salvo que vayas a grabar Amiibo. Tiene 888 bytes frente a los 504 de la 215, la misma contraseña, el mismo contador y el mismo espejo, y la misma compatibilidad con móviles. La 215 está en todas las tiendas porque la usan las figuras de Nintendo, y si ese es tu caso, es la única opción.

### ¿Puede un iPhone leer etiquetas MIFARE Classic?

Puede ver que hay una. Core NFC lee el UID y el SAK y se detiene ahí; la API de Apple no tiene familia Classic y su documentación dice que el comando MIFARE "no admite el protocolo Crypto1". Ninguna app puede leer un sector en un iPhone. Los móviles Android con un controlador NFC de NXP sí pueden; los móviles con algunos otros controladores no, y en ellos la clase `MifareClassic` sencillamente no aparece.

### ¿Cuántas veces puedo reescribir una etiqueta NFC?

100.000 veces en cualquier chip actual de NXP o ST a temperatura ambiente, y las cifras de las hojas de datos son mínimos. Una DESFire EV3 o una ST25DV están certificadas para un millón. La antigua NTAG203, la Ultralight original y la Topaz estaban certificadas para 10.000. Nadie reescribe una pegatina diez mil veces; la cifra importa para contadores y para etiquetas que registran datos.

### ¿A qué distancia funciona una etiqueta NFC?

Con un móvil, hasta unos cuatro centímetros con una antena del tamaño de una tarjeta y unos dos con una pegatina pequeña, en el punto adecuado del móvil. La propia definición del NFC Forum dice "hasta 2 cm". Una etiqueta ISO 15693 con un lector de arco y una antena grande funciona a un metro, pero un móvil la lee a los mismos pocos centímetros que cualquier otra, quizá el doble que una etiqueta Type 2.

### ¿Las etiquetas NFC caducan o se desgastan?

Los datos del chip están certificados para 10 años en la mayoría de los chips de consumo, 50 en la NTAG 424 DNA y la familia ICODE SLIX, 60 en la ST25TV y 200 en la ST25TA, siempre a temperatura ambiente. El calor acorta esas cifras. En la práctica, el adhesivo, la cara de papel y la antena se rinden mucho antes que la EEPROM.

### ¿Es seguro comprar etiquetas NFC baratas en marketplaces?

Seguro, sí; que sean lo que dicen, no siempre. Una "NTAG213" barata suele ser una Fudan FM11NT021, que sirve para un enlace y falla con cualquier cosa que pregunte por GET_VERSION. Una "NTAG215" barata a menudo no lo es, y Amiibo la rechazará. Comprueba en la app el código de fabricante y el nombre del chip antes de grabar nada, y compra en una tienda que diga qué chip vende.

### ¿Puede mi móvil leer mi tarjeta bancaria o mi pasaporte con una app NFC?

El pasaporte sí: con la zona de lectura mecánica como clave, una app puede leer los grupos de datos del chip, y NFC.cool lo hace en ambas plataformas. La tarjeta bancaria es una tarjeta inteligente EMV; una app puede leer su lista de aplicaciones y algunos registros públicos, pero Apple bloquea la lectura de tarjetas de pago en Core NFC, el código de seguridad de la tarjeta no está en el chip y cada transacción la firma una clave que nunca sale de la tarjeta, así que no hay nada que copiar.

### ¿Por qué mi tarjeta de la oficina o la llave del hotel no aparecen en la app?

La mayoría de las tarjetas de oficina son tarjetas de proximidad de 125 kHz, que la bobina de 13,56 MHz de un móvil ni siquiera puede detectar. La mayoría de las llaves de hotel y de las tarjetas de transporte antiguas son MIFARE Classic, que un iPhone solo puede identificar y un móvil Android solo puede leer con el controlador adecuado y las claves adecuadas. Ninguna de las dos cosas la puede arreglar una app, y prefiero decirlo a venderte un apaño.

### ¿Puedo desbloquear una etiqueta NFC que se dejó en solo lectura?

No. Los bits de bloqueo de una etiqueta Type 2 o Type 5 son bits de un solo sentido dentro del chip; el indicador de solo lectura del capability container es igual. Una contraseña se puede quitar si la sabes; un bloqueo no. Por eso NFC.cool pregunta dos veces antes de bloquear nada.

### ¿La contraseña de una NTAG es seguridad de verdad?

Frena a quien tiene una app gratuita, que es la mayoría de la gente. No frena a nadie con un lector capaz de escuchar, porque la contraseña de 32 bits viaja por el aire sin cifrar y la etiqueta responde con una confirmación de 16 bits. Para cualquier cosa que tenga que resistir a un atacante con motivación, la escalera empieza en AES: Ultralight AES para una pegatina Type 2, NTAG 424 DNA si la propia lectura tiene que demostrar algo.

### ¿Qué etiqueta necesito para Amiibo?

Una NTAG215, y solo una NTAG215. La consola pregunta por GET_VERSION, se autentica con una contraseña derivada del UID y lee las 135 páginas. Un chip sin GET_VERSION o con otro número de páginas falla en el primer comando. Grabar un Amiibo en una etiqueta es permanente, porque los bytes de bloqueo y la contraseña forman parte del formato.

### ¿Qué etiqueta NFC funciona sobre una superficie metálica?

Cualquier chip en formato para metal, es decir, con una lámina de ferrita entre la antena y el metal. Una etiqueta normal pegada al acero no se lee en absoluto; una etiqueta para metal se lee a unos cuatro quintos de su alcance normal. Si puedes poner tres milímetros de cualquier material no metálico entre una etiqueta normal y el metal, eso también funciona.

### ¿Funciona NFC.cool en iPad y Mac?

Sí, desde la versión 6.15.0, con un lector USB de tarjetas inteligentes; ninguno de los dos dispositivos tiene radio NFC propia. El HID OMNIKEY 5022 CL es el que probé yo, y los usuarios han confirmado que el ACS ACR1552U y el ACR1255U-J1 funcionan. Todo lo que funciona con el móvil en Type 2, Type 4 y FeliCa funciona con el lector, con MIFARE Classic en solo lectura.

---

## Glosario

| Término | Significado |
| --- | --- |
| AFI | Application Family Identifier, un byte de las etiquetas ISO 15693 que permite a un lector inventariar solo las etiquetas de un tipo |
| APDU | Application Protocol Data Unit, el formato de comando y respuesta de ISO 7816-4, que usan todos los chips ISO-DEP |
| ATQA | Answer To Request, los dos primeros bytes que envía un chip Type A; NXP recomienda no identificar chips por él |
| AUTH0 | el byte de configuración de NTAG que indica la primera página que necesita la contraseña |
| AUTHLIM | el ajuste de NTAG que bloquea la etiqueta tras el número de intentos fallidos de contraseña que elijas |
| CC | Capability Container, los cuatro bytes (o el archivo, en Type 4) que le dicen a un lector que la etiqueta contiene NDEF y cuánto |
| CMAC | un código de autenticación de mensajes calculado con AES; lo que hace que un mensaje SUN no se pueda falsificar |
| CRYPTO1 | el cifrado de flujo propietario de 48 bits de NXP en MIFARE Classic, roto en 2008 |
| DSFID | Data Storage Format Identifier, un byte de ISO 15693 que describe cómo está organizada la memoria |
| EAS | Electronic Article Surveillance, el bit de las etiquetas ISO 15693 que hace sonar la alarma del arco de una tienda |
| GET_VERSION | el comando de NXP que devuelve ocho bytes que identifican el fabricante, el tipo, la generación y el tamaño del chip |
| ISO-DEP | el protocolo de transporte ISO/IEC 14443-4; un chip que lo habla responde SAK 20 y acepta APDU |
| Modulación de carga | cómo envía datos una etiqueta pasiva: conectando una carga en su antena, que el lector detecta en su propio campo |
| LRP | Leakage Resilient Primitive, un modo AES de la NTAG 424 DNA y la DESFire Light que resiste ataques de canal lateral |
| MAD | MIFARE Application Directory, el sector 0 de una tarjeta Classic, que indica qué contienen los demás sectores |
| Espejo | la función de NTAG que pega el UID y el contador como ASCII en el mensaje NDEF en cada lectura |
| NDEF | NFC Data Exchange Format, el contenedor de registros que lee cualquier móvil |
| NUID | Non-Unique Identifier, el nombre que da NXP a un UID de 4 bytes |
| OTP | One Time Programmable, bits que se pueden activar una vez y nunca desactivar |
| PACK | Password Acknowledge, los dos bytes que devuelve una NTAG tras una contraseña correcta |
| PICC, PCD | los nombres que dan los estándares a la tarjeta y al lector |
| Random ID | un modo en el que el chip responde a la anticolisión con un ID aleatorio nuevo de 4 bytes cada vez, por privacidad |
| READ_SIG | el comando que devuelve la firma de originalidad de un chip |
| SAK | Select Acknowledge, el byte que devuelve un chip Type A tras la selección; sus bits clasifican los chips en familias |
| SDM | Secure Dynamic Messaging, el mecanismo de la NTAG 424 DNA y la DESFire EV3 que hay detrás de SUN |
| SUN | Secure Unique NFC, una URL que lleva una prueba criptográfica nueva en cada lectura |
| T5T, T2T, T4T | la abreviatura del NFC Forum para las etiquetas Type 5, Type 2 y Type 4 |
| TLV | Tag-Length-Value, el marco que rodea un mensaje NDEF en los chips Type 2 y Type 5 |
| TruST25 | la firma de originalidad de ST sobre el UID |
| UID | el identificador del chip programado en fábrica, de 4, 7 u 8 bytes |

---

## Fuentes y lecturas recomendadas

Cada tabla de esta guía se ha comprobado con alguna de estas fuentes. Los precios son de las tiendas citadas en la sección de compra, a 9 de septiembre de 2026.

**NXP NTAG**

- [Hoja de datos de NTAG213/215/216, Rev 3.2](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)
- Hojas de datos de [NTAG210/212](https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf), [NTAG 210µ](https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf), [NTAG213F/216F](https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf) y [NTAG 213 TT](https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf)
- Hojas de datos de [NTAG 223 DNA](https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf) y [NTAG 224 DNA StatusDetect](https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf)
- Hojas de datos de [NTAG 424 DNA](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) y [NTAG 424 DNA TagTamper](https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf), y [AN12196, la nota de funciones y consejos de la 424 con la clave pública de originalidad](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- Hojas de datos de [NTAG I2C plus](https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf) y [NTAG 5 boost](https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf)
- [AN13089, funciones y consejos de NTAG 21x](https://www.puntoflotante.net/AN13089.pdf), sobre por qué una firma de originalidad estática no garantiza nada frente a los clones (copia espejo; la de nxp.com no es pública)

**NXP MIFARE**

- Hojas de datos de [MIFARE Ultralight](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf), [Ultralight C](https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf), [Ultralight EV1](https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf) y [Ultralight AES](https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf)
- Hojas de datos de [MIFARE Classic EV1 1K](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) y [Classic EV1 4K](https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf)
- Hojas de datos resumidas de [MIFARE Plus S](https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf), [Plus SE](https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf) y [Plus EV2](https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf)
- Hojas de datos de [DESFire EV1](https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf), [DESFire EV2](https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf), [DESFire EV3](https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf) y [DESFire Light](https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf), y [AN12752 sobre la memoria utilizable de DESFire](https://www.nxp.com/docs/en/application-note/AN12752.pdf)
- [AN10833, identificación de tipos MIFARE](https://www.nxp.com/docs/en/application-note/AN10833.pdf), [AN10927, los UID de MIFARE](https://www.nxp.com/docs/en/application-note/AN10927.pdf), [AN1305, NDEF en MIFARE Classic](https://www.nxp.com/docs/en/application-note/AN1305.pdf), [AN10787, el MIFARE Application Directory](https://www.nxp.com/docs/en/application-note/AN10787.pdf), [AN11004, DESFire como etiqueta Type 4](https://www.nxp.com/docs/en/application-note/AN11004.pdf)

**NXP ICODE**

- Hojas de datos de [ICODE SLIX](https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf), [SLIX-S](https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf), [SLIX-L](https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf), [SLIX2](https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf), [ICODE DNA](https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf) e [ICODE 3](https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf)
- [AN11809, la comparativa de la familia ICODE](https://www.nxp.com/docs/en/application-note/AN11809.pdf)

**STMicroelectronics, TI, EM, Sony, Fudan**

- Hojas de datos de ST [ST25TV02KC](https://www.st.com/resource/en/datasheet/st25tv02kc.pdf), [ST25TN01K](https://www.st.com/resource/en/datasheet/st25tn01k.pdf), [ST25DV64KC](https://www.st.com/resource/en/datasheet/st25dv64kc.pdf), [ST25TA02KB](https://www.st.com/resource/en/datasheet/st25ta02kb.pdf) y [M24LR64E-R](https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf), [AN5658 sobre Augmented NDEF](https://www.st.com/resource/en/application_note/an5658-augmented-ndef-messages-with-st25tv512c-and-st25tv02kc-devices-stmicroelectronics.pdf) y [TA0358 sobre TruST25](https://www.st.com/resource/en/technical_article/ta0358-developing-supply-chain-confidence-with-trust25-digital-signature-in-rfidnfc-tags-stmicroelectronics.pdf)
- Hojas de datos de TI Tag-it HF-I [Standard](https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf), [Pro](https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf) y [Plus](https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf)
- EM Microelectronic [EM4233](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233), [EM4423](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423) y [EM4425](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v)
- Sony [hoja de datos de FeliCa Lite-S](https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf) y [FeliCa Standard RC-SA01](https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html)
- [Hoja de datos de Fudan FM11NT021](https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf)

**Investigación de seguridad y estándares**

- Quarkslab, [MIFARE Classic: exposing the static encrypted nonce variant and a few hardware backdoors](https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html) (2024)
- Nohl, Evans, Starbug y Plötz, [Reverse-Engineering a Cryptographic RFID Tag](https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf) (USENIX Security 2008)
- Garcia et al., [Dismantling MIFARE Classic](https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7) (ESORICS 2008)
- [ISO/IEC JTC1/SC17 Standing Document 5, el registro de fabricantes de circuitos integrados](https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf)
- [Notas de Proxmark3 sobre tarjetas mágicas](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md) y [3dbrew sobre la estructura de la etiqueta Amiibo](https://www.3dbrew.org/wiki/Amiibo)
- El NFC Forum sobre [la tecnología](https://nfc-forum.org/learn/nfc-technology/) y [la especificación de etiquetas Type 2](https://nfc-forum.org/build/specifications/type-2-tag-specification/)

**Móviles y lectores**

- Apple [Core NFC](https://developer.apple.com/documentation/corenfc), [lectura de etiquetas en segundo plano](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [el comando MIFARE que excluye CRYPTO1](https://developer.apple.com/documentation/corenfc/nfcmifaretag/sendmifarecommand(commandpacket:completionhandler:)) y [la sesión 715 de la WWDC 2019](https://developer.apple.com/videos/play/wwdc2019/715/)
- Android [MifareClassic](https://developer.android.com/reference/android/nfc/tech/MifareClassic), [la guía avanzada de NFC](https://developer.android.com/develop/connectivity/nfc/advanced-nfc) y [Web NFC en Chrome](https://developer.chrome.com/docs/capabilities/nfc)
- Lectores: [ACS ACR122U](https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf), [HID OMNIKEY 5022 CL](https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf), [NXP PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf), [Proxmark3](https://github.com/RfidResearchGroup/proxmark3), [Flipper Zero](https://docs.flipper.net/nfc) y [Chameleon Ultra](https://github.com/RfidResearchGroup/ChameleonUltraDocs)
- Antenas y ferrita: [TI SLOA241](https://www.ti.com/lit/an/sloa241b/sloa241b.pdf) y [Würth ANP022](https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF)

---

## Para terminar

Elige el chip según el trabajo. Una NTAG213 para un enlace, una NTAG216 cuando no lo tengas claro, una NTAG215 para Amiibo, una NTAG 424 DNA cuando una lectura tenga que demostrar algo, una ICODE SLIX2 o una ICODE 3 cuando la tenga que leer un arco, una DESFire EV3 cuando una puerta tenga que fiarse de ella, y nada en absoluto de la estantería de MIFARE Classic. Todo lo demás en esta guía es el razonamiento detrás de esa frase, y las tablas están ahí para que nunca más tengas que fiarte de lo que dice un anuncio.

Si quieres ver qué es de verdad una etiqueta antes de grabar en ella, eso es lo que hace [NFC.cool Tools](/features/nfc-reader-writer/) en cada lectura, en [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-es&mt=8), en [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-es) y en un iPad o un Mac con un lector conectado. Y si tienes en tu mesa un chip al que la app le pone un nombre equivocado, o al que no le pone ninguno, escríbeme. Así es como llegaron a la lista la mayoría de esos sesenta.
