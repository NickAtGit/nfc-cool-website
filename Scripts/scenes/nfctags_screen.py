"""The phone screen of the nfctags scene: one PNG per frame, on the same clock as the 3D scene.

  python3 Scripts/scenes/nfctags_screen.py <NFCcoolScenes> <out dir>

Writes <out dir>/0000.png ... (880 x 1912, the phone screen's UV square). Ready: the NFC symbol
in a pale circle. Reading: a blue ring fills round it. Read: the circle turns green with a
check that draws itself, and the tag's name rises in below. As the tag leaves, the screen
goes back to ready. Scripts/scenes/build.sh encodes the frames to nfctags_screen.mp4.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
import nfctags_timeline as tl  # noqa: E402

SCENES, OUT = Path(sys.argv[1]), Path(sys.argv[2])
W, H, SS = 880, 1912, 2           # output size, supersampling
CX, CY, R = W / 2, H * 0.40, 150   # the status circle
BLUE, PALE, GREEN, INK = (10, 132, 255), (232, 242, 255), (52, 199, 89), (28, 28, 30)

glyph = Image.open(SCENES / "assets/symbols/wave.3.right.png").convert("RGBA")


def name_font(text, size=86, width=W - 120):
    """SF bold at `size`, smaller if the name would not fit across the screen."""
    while True:
        font = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", size * SS)
        font.set_variation_by_name("Bold")
        if font.getlength(text) <= width * SS or size <= 40:
            return font
        size -= 2


def mix(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def tinted(size, color, alpha=1.0):
    g = glyph.resize((size, size), Image.LANCZOS)
    solid = Image.new("RGBA", g.size, (*color, 255))
    solid.putalpha(g.getchannel("A").point(lambda a: round(a * alpha)))
    return solid


def frame(f):
    img = Image.new("RGB", (W * SS, H * SS), (255, 255, 255))
    d = ImageDraw.Draw(img)
    s = lambda v: v * SS  # noqa: E731
    i = tl.active(f)
    t = tl.local(f, i)
    name = tl.TAGS[i][0]

    reading = tl.progress(t, tl.CONTACT, tl.SUCCESS)
    done = tl.progress(t, tl.SUCCESS, tl.SUCCESS + 7)
    back = tl.progress(t, tl.LEAVE + 2, tl.LEAVE + 12)   # the tag has left: ready again
    shown = done * (1 - back)

    # Ready circle, with the ring filling while the phone reads.
    r = R * (1 + 0.04 * tl.spring((t - tl.CONTACT) / tl.FPS, 3, 6))
    d.ellipse((s(CX - r), s(CY - r), s(CX + r), s(CY + r)), fill=PALE)
    icon = tinted(round(s(r * 1.05)), BLUE, 1 - shown)
    img.paste(icon, (round(s(CX) - icon.width / 2 + s(6)), round(s(CY) - icon.height / 2)), icon)
    if 0 < reading and done == 0:
        ring = s(R + 22)
        d.arc((s(CX) - ring, s(CY) - ring, s(CX) + ring, s(CY) + ring), -90, -90 + 360 * tl.ease_in_out(reading),
              fill=mix(BLUE, (255, 255, 255), back), width=s(14))

    # Read: green circle pops, the check draws itself, the name rises in.
    if shown > 0:
        layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        gr = R * 1.08 * max(0.0, tl.ease_out_back(done, 2.2))
        ld.ellipse((s(CX - gr), s(CY - gr), s(CX + gr), s(CY + gr)), fill=GREEN)
        stroke = tl.progress(t, tl.SUCCESS + 2, tl.SUCCESS + 9)
        a, b, c = (CX - 58, CY + 4), (CX - 16, CY + 46), (CX + 64, CY - 44)
        k1 = min(1.0, stroke / 0.4)
        line = [a, (a[0] + (b[0] - a[0]) * k1, a[1] + (b[1] - a[1]) * k1)]
        if stroke > 0.4:
            k2 = (stroke - 0.4) / 0.6
            line.append((b[0] + (c[0] - b[0]) * k2, b[1] + (c[1] - b[1]) * k2))
        if stroke > 0:
            ld.line([(s(x), s(y)) for x, y in line], fill="white", width=s(26), joint="curve")
            for x, y in (line[0], line[-1]):
                ld.ellipse((s(x - 13), s(y - 13), s(x + 13), s(y + 13)), fill="white")
        rise = tl.ease_out_cubic(tl.progress(t, tl.SUCCESS + 3, tl.SUCCESS + 13))
        if rise > 0:
            y = CY + R + 120 + 40 * (1 - rise)
            ld.text((s(CX), s(y)), name, font=name_font(name), fill=(*INK, round(255 * rise)), anchor="mm")
        layer.putalpha(layer.getchannel("A").point(lambda v: round(v * shown)))
        img.paste(layer, (0, 0), layer)
    return img.resize((W, H), Image.LANCZOS)


OUT.mkdir(parents=True, exist_ok=True)
for f in range(tl.FRAMES):
    frame(f).save(OUT / f"{f:04d}.png")
print("SCREEN", tl.FRAMES, "frames ->", OUT)
