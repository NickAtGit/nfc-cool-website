"""Textures for the nfctags scene's tags.

  python3 Scripts/scenes/nfctags_textures.py <NFCcoolScenes> <card faces dir> <out dir>

<card faces dir> is cardfan_faces.py's output; the charcoal card 6 becomes the NTAG 424 DNA
card, turned so its wordmark reads across the landscape card. The rest are drawn here: a white
card and a sticker with the NFC symbol printed in grey, a yellow coin, and an ICODE SLIX inlay
(a clear film with its copper antenna and chip; the film's alpha is kept).
"""

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

SCENES, FACES, OUT = (Path(p) for p in sys.argv[1:4])
OUT.mkdir(parents=True, exist_ok=True)
glyph = Image.open(SCENES / "assets/symbols/wave.3.right.png").convert("RGBA")


def printed(size, background, ink, glyph_scale, alpha=255):
    img = Image.new("RGBA", size, (*background, 255))
    g = glyph.resize((round(min(size) * glyph_scale),) * 2, Image.LANCZOS)
    solid = Image.new("RGBA", g.size, (*ink, 255))
    solid.putalpha(g.getchannel("A").point(lambda a: a * alpha // 255))
    img.alpha_composite(solid, ((size[0] - g.width) // 2, (size[1] - g.height) // 2))
    return img


# The NFC.cool card: the batch scene's wordmark (white NFC, yellow .cool) on the real card's
# near-black with its faint hexagon pattern.
with Image.open(FACES / "card_face_6.png") as face:
    face = face.convert("RGB")
    face = face.rotate(-90, expand=True) if face.height > face.width else face
face = face.resize((1280, round(1280 * face.height / face.width)), Image.LANCZOS)
card = Image.new("RGB", face.size, (17, 18, 21))
hexes = ImageDraw.Draw(card)
side = 74
for row in range(-1, face.height // side + 2):
    for col in range(-1, face.width // side + 2):
        cx = col * side * 1.5
        cy = row * side * math.sqrt(3) + (side * math.sqrt(3) / 2 if col % 2 else 0)
        pts = [(cx + side * math.cos(math.radians(60 * k)), cy + side * math.sin(math.radians(60 * k))) for k in range(7)]
        hexes.line(pts, fill=(34, 36, 41), width=3)
# The wordmark is whatever stands out from the face's grey gradient.
ink = face.convert("HSV").getchannel("V").point(lambda v: max(0, min(255, (v - 95) * 4)))
card.paste(face, (0, 0), ink)
card.save(OUT / "card_424.png")

# The NTAG 216 card is the rainbow NFC.cool card (Content/Assets/images/Webflow/nfc-card.webp):
# diagonal stripes in its colours, the same wordmark with a soft shadow so the white NFC holds
# on the yellow.
STRIPES = ["#E563A6", "#E8981B", "#EDDB26", "#CFDC35", "#84C35A", "#439EAF", "#8FCCDC"]
rainbow = Image.new("RGB", face.size)
rd = ImageDraw.Draw(rainbow)
# Placed like the real card: .cool sits on the green and teal.
band, slant, start = face.width / 6.2, face.height * 0.47, -face.width / 6.2 * 1.45
rainbow.paste(STRIPES[0], (0, 0, face.width, face.height))
for k, color in enumerate(STRIPES):
    x0 = start + k * band
    right = x0 + band if k < len(STRIPES) - 1 else face.width * 2
    rd.polygon([(x0 + slant, 0), (right + slant, 0), (right, face.height), (x0, face.height)], fill=color)
shadow = ink.filter(ImageFilter.GaussianBlur(10)).point(lambda v: v * 45 // 100)
rainbow.paste((40, 30, 60), (6, 8), shadow)
rainbow.paste(face, (0, 0), ink)
rainbow.save(OUT / "card_216.png")
# The NTAG 213 sticker in the brand yellow, the symbol and a ring printed in ink.
sticker = printed((512, 512), (255, 199, 0), (28, 31, 38), 0.42)
ImageDraw.Draw(sticker).ellipse((40, 40, 472, 472), outline=(28, 31, 38), width=14)
sticker.convert("RGB").save(OUT / "sticker.png")
# The NTAG 215 coin in the NFC.cool app icon's blue gradient, the symbol in white.
coin = Image.new("RGBA", (512, 512))
for y in range(512):
    t = y / 511
    ImageDraw.Draw(coin).line([(0, y), (511, y)], fill=(round(0x12 + (0x1A - 0x12) * t), round(0x8C + (0x60 - 0x8C) * t), round(0xF0 + (0xCE - 0xF0) * t), 255))
g = glyph.resize((210, 210), Image.LANCZOS)
white = Image.new("RGBA", g.size, (255, 255, 255, 255))
white.putalpha(g.getchannel("A"))
coin.alpha_composite(white, (151, 151))
coin.convert("RGB").save(OUT / "coin.png")

# ICODE SLIX inlay: a rectangular copper coil wound inward, the chip on a bridge across it.
W, H, SS = 704, 448, 2
inlay = Image.new("RGBA", (W * SS, H * SS), (226, 232, 238, 150))
d = ImageDraw.Draw(inlay)
copper = (196, 112, 52, 255)
for k in range(7):
    m = (28 + k * 14) * SS
    d.rounded_rectangle((m, m, W * SS - m, H * SS - m), radius=(36 - k * 3) * SS, outline=copper, width=8 * SS)
d.rectangle(((W // 2 - 4) * SS, 28 * SS, (W // 2 + 4) * SS, 128 * SS), fill=copper)
d.rounded_rectangle(((W // 2 - 26) * SS, 112 * SS, (W // 2 + 26) * SS, 150 * SS), radius=6 * SS, fill=(34, 34, 38, 255))
inlay.resize((W, H), Image.LANCZOS).save(OUT / "inlay.png")
print("TEXTURES", sorted(p.name for p in OUT.iterdir()))
