"""The neutral face, drawn with numpy distance fields, so Cycles renders show the
same face the runtime canvas draws (face.mjs uses the same sizes and positions)."""
import bpy
import numpy as np

W, H = 512, 320
COLOR = (0.28, 0.93, 1.0)  # linear #8FF6FF


def _rounded_rect(x, y, cx, cy, hw, hh, r):
    qx = np.abs(x - cx) - (hw - r)
    qy = np.abs(y - cy) - (hh - r)
    return np.hypot(np.maximum(qx, 0), np.maximum(qy, 0)) + np.minimum(np.maximum(qx, qy), 0) - r


def neutral(name):
    image = bpy.data.images.get(name)
    if image:
        return image
    rows, x = np.mgrid[0:H, 0:W].astype(np.float32)
    y = H - 1 - rows  # Blender stores the bottom row first; draw in top-down canvas coordinates
    d = np.minimum(_rounded_rect(x, y, 0.32 * W, 0.47 * H, 36, 59, 34),
                   _rounded_rect(x, y, 0.68 * W, 0.47 * H, 36, 59, 34))
    mx = (x - 0.5 * W) / 42.0
    smile = 0.8 * H + 6 * (1 - mx ** 2)
    d = np.minimum(d, np.where(np.abs(mx) <= 1, np.abs(y - smile) - 5, 1e3))
    ink = np.clip(0.5 - d, 0, 1)
    glow = 0.35 * np.exp(-np.maximum(d, 0) / 8.0)
    v = np.clip(ink + glow * (1 - ink), 0, 1)
    rgba = np.zeros((H, W, 4), np.float32)
    for c in range(3):
        rgba[..., c] = v * COLOR[c]
    rgba[..., 3] = 1.0
    image = bpy.data.images.new(name, W, H, alpha=False, float_buffer=True)
    image.pixels.foreach_set(rgba.ravel())
    return image
