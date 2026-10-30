"""build_sprites.py —— v5 角色帧库：绿幕 PNG → 抠图 / 去溢色 / 裁边 / 锚点 → sprites/<lib>.js（WebP data URI）
用法：python3 build_sprites.py <lib名> name[:flip] ...   （源图 sprites/src/<name>.png，没有就读仓库帧库 sprites/cast/<name>.webp）
锚点：bottom 脚底行；ax 上 30% 的水平中心（身体轴）；foot 下半部最右点（踢球接触点）；hand 中段最右点。"""
import sys, json, base64, io, os
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
lib, names = sys.argv[1], sys.argv[2:]
FR, FI = {}, {}
for spec in names:
    name, *opt = spec.split(':')
    if os.path.exists(f'{HERE}/src/{name}.png'):
        im = Image.open(f'{HERE}/src/{name}.png').convert('RGB')
        a = np.array(im).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
        green = (g > 150) & (g > r + 50) & (g > b + 50)
        edge = (g > r + 15) & (g > b + 15) & ~green          # 半透明边：去溢色
        alpha = np.where(green, 0, 255).astype(np.uint8)
        a[..., 1] = np.where(edge, np.maximum(r, b), g)
        rgba = np.dstack([a.astype(np.uint8), alpha])
        img = Image.fromarray(rgba, 'RGBA')
    else:                                                 # 仓库里的人物帧库（pack_cast.py 已抠好）
        img = Image.open(f'{HERE}/cast/{name}.webp').convert('RGBA'); alpha = np.array(img)[..., 3]
    # 去掉孤立绿噪点：alpha 轻微收缩
    ys, xs = np.nonzero(alpha > 0); img = img.crop((xs.min() - 2, ys.min() - 2, xs.max() + 3, ys.max() + 3))
    if 'flip' in opt: img = img.transpose(Image.FLIP_LEFT_RIGHT)
    MAXH, MAXW = int(os.environ.get('MAXH', 520)), int(os.environ.get('MAXW', 860))   # 显示尺寸上限（§2.9 F 体积预算）
    sc = min(1, MAXH / img.height, MAXW / img.width)
    if sc < 1: img = img.resize((round(img.width * sc), round(img.height * sc)), Image.LANCZOS)
    al = np.array(img)[..., 3] > 128; h, w = al.shape; ys, xs = np.nonzero(al)
    d = {'w': w, 'h': h, 'bottom': int(ys.max()), 'ax': float(np.nonzero(al[:int(h * .3)])[1].mean())}
    lo = al[int(h * .5):]; ly, lx = np.nonzero(lo); fx = lx.max(); d['foot'] = [float(fx), float(ly[lx == fx].mean() + int(h * .5))]
    mid = al[int(h * .3):int(h * .6)]; my, mx = np.nonzero(mid); hx = mx.max(); d['hand'] = [float(hx), float(my[mx == hx].mean() + int(h * .3))]
    FI[name] = d
    bb = io.BytesIO(); img.save(bb, 'WEBP', quality=int(os.environ.get('Q', 74)), method=6)
    FR[name] = 'data:image/webp;base64,' + base64.b64encode(bb.getvalue()).decode()
    img.save(f'/tmp/sp_{name}.png')
out = f'{HERE}/{lib}.js'
open(out, 'w').write(f'// 自动生成：python3 build_sprites.py {" ".join(sys.argv[1:])}\nexport const FR = {json.dumps(FR)};\nexport const FI = {json.dumps(FI)};\n')
print(out, os.path.getsize(out), 'bytes'); print({k: (v['w'], v['h']) for k, v in FI.items()})
