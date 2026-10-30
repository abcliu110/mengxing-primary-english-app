"""cut_box.py <sheet.png> name x0 x1 [y0 y1] —— 联排图里两个姿势粘连时，按坐标手工切一帧（区域外刷成绿）。"""
import sys, numpy as np
from PIL import Image
src, name, x0, x1 = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
y0, y1 = (int(sys.argv[5]), int(sys.argv[6])) if len(sys.argv) > 6 else (0, 10**6)
a = np.array(Image.open(src).convert('RGB')).astype(int)[y0:y1, x0:x1]
r, g, b = a[..., 0], a[..., 1], a[..., 2]; fg = ~((g > 150) & (g > r + 50) & (g > b + 50))
ys, xs = np.nonzero(fg); a = a[max(0, ys.min() - 4):ys.max() + 5, max(0, xs.min() - 4):xs.max() + 5]
Image.fromarray(a.astype(np.uint8)).save(f'src/{name}.png'); print(name, a.shape)
