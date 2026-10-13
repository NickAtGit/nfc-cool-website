"""Card faces for the cardfan scene: NFCcoolScenes' batch-scene card faces (the brand gradients and
the wordmark) without the faint badge ring, scaled for the web.

  python3 Scripts/scenes/cardfan_faces.py <NFCcoolScenes> <out dir>

Writes <out dir>/card_face_1.png ... card_face_6.png. Scripts/scenes/build.sh runs it.
"""

import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(sys.argv[1]) / "scripts"))
import make_csvbatch_assets as assets  # noqa: E402
from csvbatch_params import CARD  # noqa: E402

LONG_SIDE_PX = 640  # the front card is about 460 px long in the 960 px still


class NoRing:
    """Stands in for ImageDraw.Draw, which make_csvbatch_assets only uses for the badge ring."""

    def __init__(self, image):
        pass

    def ellipse(self, *args, **kwargs):
        pass


assets.OUT = Path(sys.argv[2])
assets.OUT.mkdir(parents=True, exist_ok=True)
assets.ImageDraw = type("ImageDrawStub", (), {"Draw": NoRing})
for index, (start, end) in enumerate(CARD["faces"]):
    assets.card_face(index, start, end)
for path in sorted(assets.OUT.glob("card_face_*.png")):
    with Image.open(path) as face:
        scale = LONG_SIDE_PX / max(face.size)
        face.resize((round(face.width * scale), round(face.height * scale)), Image.LANCZOS).save(path)
    print("FACE", path.name)
