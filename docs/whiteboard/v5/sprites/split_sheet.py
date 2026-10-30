"""split_sheet.py —— 把一张 AI 绿幕联排图（多个姿势）切成单帧绿幕 PNG，存到 sprites/src/<name>.png
用法：python3 split_sheet.py <sheet.png> name1 name2 …   （按「先上后下、从左到右」的阅读顺序对应；名字写 - 表示丢弃）
做法：非绿像素膨胀 DIL 像素后求连通块（同一人物的手脚、道具连成一块），面积太小的当噪点丢掉；
      两行排布的联排图按行聚类后逐行从左到右。依赖 numpy + scipy.ndimage。"""
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage
HERE = os.path.dirname(os.path.abspath(__file__))
src, names = sys.argv[1], sys.argv[2:]
DIL = int(os.environ.get('DIL', 18))
im = Image.open(src).convert('RGB'); a = np.array(im).astype(int)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
fg = ~((g > 150) & (g > r + 50) & (g > b + 50))
def runs(prof, mingap):
    on = prof > 0; segs = []; i = 0; L = len(on)
    while i < L:
        if on[i]:
            j = i
            while j < L and on[j]: j += 1
            segs.append([i, j]); i = j
        else: i += 1
    out = []
    for sg in segs:
        if out and sg[0] - out[-1][1] < mingap: out[-1][1] = sg[1]
        else: out.append(sg)
    return out
# 去噪：小连通块（散点、彩纸屑）不参与切分
lab0, _ = ndimage.label(fg); sizes = ndimage.sum(fg, lab0, range(lab0.max() + 1)); core = sizes[lab0] > 400
order = []
for x0, x1 in runs(core.sum(0), int(os.environ.get('GAPX', 6))):
    if x1 - x0 < 40: continue
    for y0, y1 in runs(core[:, x0:x1].sum(1), int(os.environ.get('GAPY', 18))):
        if y1 - y0 < 40: continue
        order.append((y0, y1, x0, x1))
# 两行排布：按行（纵向中心）再从左到右
# 顺序：先按列从左到右，同一列内从上到下
print(f'{len(order)} 块', [(x0, y0, x1 - x0, y1 - y0) for y0, y1, x0, x1 in order])
os.makedirs(f'{HERE}/src', exist_ok=True)
for name, (y0, y1, x0, x1) in zip(names, order):
    if name == '-': continue
    pad = 6; crop = im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))
    c = np.array(crop); sub = fg[max(0, y0 - pad):min(im.height, y1 + pad), max(0, x0 - pad):min(im.width, x1 + pad)]
    inside = np.zeros_like(sub); inside[y0 - max(0, y0 - pad):y1 - max(0, y0 - pad), x0 - max(0, x0 - pad):x1 - max(0, x0 - pad)] = True
    c[~(sub & inside)] = [0, 255, 0]
    Image.fromarray(c.astype(np.uint8)).save(f'{HERE}/src/{name}.png')
    print(name, crop.size)
