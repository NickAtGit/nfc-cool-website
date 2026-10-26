"""The nfctags scene's clock (the home page hero): one tag after another meets the top edge of a
still phone, the phone reads it, and its screen shows a check and the tag's name.

Pure Python, so the Blender scene (nfctags.py) and the screen frames (nfctags_screen.py, PIL)
read the same numbers. Frames are 0-based here and the loop is FRAMES long: frame FRAMES is
frame 0 again.

Each tag owns a SEGMENT of frames, counted from its own start:

    0 .. CONTACT         glides in from above, fading in, and touches the top edge
    CONTACT .. SUCCESS   the phone reads it: three waves grow from the top edge, the ring on
                         the screen fills
    SUCCESS              the check pops and the tag's name shows
    LEAVE .. SEGMENT+OVERLAP   glides out the other way, fading, as the next tag arrives
"""

import math

FPS = 30

# (name on the screen, prop, the side it flies in from: -1 left, 1 right, 0 from above).
# Every name is one the app shows after a scan (NFCService's NFCTagDetector on iOS).
TAGS = [
    ("NTAG 213", "sticker", -1),
    ("NTAG 424 DNA", "brandcard", 1),
    ("ICODE SLIX", "inlay", 0),
    ("NTAG 215", "coin", -1),
    ("Amiibo", "figure", 1),
    ("MIFARE DESFire", "fob", 0),
    ("NTAG 216", "card", -1),
    ("MIFARE Ultralight", "wristband", 1),
]

SEGMENT = 60          # frames per tag
ARRIVE = 16           # fully faded in
CONTACT = 21          # touching the top edge
SUCCESS = 33          # read: check, burst, hop
LEAVE = 50            # starts flying out
OVERLAP = 12          # the next tag arrives while this one leaves
FRAMES = SEGMENT * len(TAGS)


def clamp01(x):
    return 0.0 if x < 0 else 1.0 if x > 1 else x


def progress(t, start, end):
    return clamp01((t - start) / (end - start))


def ease_out_cubic(t):
    return 1 - (1 - t) ** 3


def ease_in_cubic(t):
    return t ** 3


def ease_in_out(t):
    return 4 * t ** 3 if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2


def ease_out_back(t, s=1.6):
    t -= 1
    return 1 + t * t * ((s + 1) * t + s)


def spring(t, hz=2.2, decay=5.0):
    """0 at t=0, settles to 0 again: a damped bounce, t in seconds."""
    return math.exp(-decay * t) * math.sin(2 * math.pi * hz * t) if t > 0 else 0.0


def local(frame, index):
    """Frame relative to tag `index`'s start, wrapped so a tag's exit can run past the loop seam."""
    t = (frame - index * SEGMENT) % FRAMES
    return t if t < SEGMENT + OVERLAP else t - FRAMES


def active(frame):
    """The tag the screen is about at `frame`: the one that has arrived and not yet left."""
    return (frame // SEGMENT) % len(TAGS)
