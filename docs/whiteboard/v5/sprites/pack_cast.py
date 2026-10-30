"""pack_cast.py —— 人物先行（CAST_V5.md）：把 sprites/src/*.png 绿幕单帧全部抠好，存成仓库里的透明 WebP 帧库 sprites/cast/<帧名>.webp。
src/ 和 kf/ 联排原图不进仓库；cast/ 进仓库，以后 build_sprites.py 找不到 src/<名>.png 时自动读 cast/<名>.webp。
用法：python3 pack_cast.py [帧名…]（不写 = 全部）。MAXH（默认 520）/ Q（默认 78）控制体积。"""
import sys, os, glob, json
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); os.makedirs(f'{HERE}/cast', exist_ok=True)
names = sys.argv[1:] or sorted(os.path.basename(p)[:-4] for p in glob.glob(f'{HERE}/src/*.png'))
MAXH, Q = int(os.environ.get('MAXH', 520)), int(os.environ.get('Q', 78))
tot = 0
for name in names:
    im = Image.open(f'{HERE}/src/{name}.png').convert('RGB')
    a = np.array(im).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    green = (g > 150) & (g > r + 50) & (g > b + 50)
    edge = (g > r + 15) & (g > b + 15) & ~green
    a[..., 1] = np.where(edge, np.maximum(r, b), g)
    img = Image.fromarray(np.dstack([a.astype(np.uint8), np.where(green, 0, 255).astype(np.uint8)]), 'RGBA')
    ys, xs = np.nonzero(np.array(img)[..., 3] > 0); img = img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    sc = min(1, MAXH / img.height)
    if sc < 1: img = img.resize((round(img.width * sc), round(img.height * sc)), Image.LANCZOS)
    img.save(f'{HERE}/cast/{name}.webp', 'WEBP', quality=Q, method=6); tot += os.path.getsize(f'{HERE}/cast/{name}.webp')
print(len(names), '帧', tot // 1024, 'KB')
