from PIL import Image
import numpy as np, potrace

SRC = '/mnt/user-data/uploads/3f0035d4-image.png'
X0, Y0, X1, Y1 = 290, 205, 735, 355   # crop around the logo, excludes watermark text
S = 4  # supersample factor for smoother tracing

im = Image.open(SRC).convert('RGB')
a = np.asarray(im).astype(float)[Y0:Y1, X0:X1]
r, g, b = a[..., 0], a[..., 1], a[..., 2]
lum = 0.299*r + 0.587*g + 0.114*b
gr = g - r

# soft ink coverage: 0 at background (~215), 1 at charcoal (~50)
def cover(lo, hi):
    return np.clip((hi - lum) / (hi - lo), 0, 1)

charcoal = np.where(gr < 4, cover(50, 150), 0)
sage = np.where(gr >= 4, cover(90, 170), 0) * (lum < 175)

from PIL import ImageFilter
def up(mask):
    img = Image.fromarray((mask*255).astype(np.uint8)).resize(
        (mask.shape[1]*S, mask.shape[0]*S), Image.BICUBIC)
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    return np.asarray(img).astype(float)/255.0

out = {}
for name, m in [('charcoal', charcoal), ('sage', sage)]:
    big = up(m)
    bm = potrace.Bitmap(big <= 0.5)
    plist = bm.trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.4)
    out[name] = plist
    print(name, 'curves', len(plist))

import pickle
pickle.dump({'out': out, 'X0': X0, 'Y0': Y0, 'S': S}, open('traced.pkl', 'wb'))
