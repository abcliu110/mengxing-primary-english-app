#!/usr/bin/env python3
"""rig/trace_parts.py —— 黑白马克笔店员线稿（barista_marker_sheet.png，generate_image 以 style1_marker.png 为参考生成的部件表）
→ 按部件切开 → potrace 矢量化（墨线 = 填充路径，保留马克笔粗细变化）+ 剪影（白底，用来遮挡身后线条、关节叠盖）
→ 骨架化得到「逐笔」中心线（决定画的顺序和笔尖路线）→ 写 rig/barista_marker.js（每个部件局部坐标，原点 = 关节枢轴）。
依赖：pip install potracer scipy scikit-image pillow numpy。输出逐字节确定（无随机）。
用法：python3 rig/trace_parts.py"""
import json, math, pathlib
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as nd
from skimage.morphology import skeletonize
from skimage.measure import approximate_polygon
import potrace

HERE = pathlib.Path(__file__).resolve().parent
SHEET = Image.open(HERE / 'barista_marker_sheet.png').convert('L')
UP = 4                     # 放大 4 倍再描（线条边缘更顺）
S = 1.5                    # 部件表像素 → 世界像素

def comp_mask(box):
    """部件表里 box 内、整块都落在框里的墨线连通块（膨胀后算连通）的并集（脸上的眼睛 / 鼻子 / 嘴是独立小块，也要留下），返回 (crop 灰度, 掩膜)"""
    g = np.array(SHEET.crop(box))
    ink = g < 150
    lab, n = nd.label(nd.binary_dilation(ink, iterations=5))
    if n == 0: raise SystemExit(f'box {box} 没有墨线')
    h, w = g.shape; keep = np.zeros_like(ink)
    for k, sl in enumerate(nd.find_objects(lab), 1):
        if sl[0].start > 0 and sl[1].start > 0 and sl[0].stop < h and sl[1].stop < w: keep |= lab == k
    return g, keep

def poly_mask(shape, polys, off):
    im = Image.new('L', (shape[1], shape[0]), 0); d = ImageDraw.Draw(im)
    for p in polys: d.polygon([(x - off[0], y - off[1]) for x, y in p], fill=255)
    return np.array(im) > 0

def trace_d(mask, tf):
    """布尔掩膜（放大后的）→ SVG path d；tf(x, y) 把放大像素坐标转到部件局部坐标"""
    bm = potrace.Bitmap(~mask)   # potracer 把 False 当作「有墨」
    pl = bm.trace(turdsize=6 * UP, alphamax=1.0, opticurve=True, opttolerance=0.25)
    f = lambda p: '%.1f %.1f' % tf(p.x if hasattr(p, 'x') else p[0], p.y if hasattr(p, 'y') else p[1])
    out = []
    for c in pl:
        out.append('M' + f(c.start_point))
        for s in c.segments:
            if s.is_corner: out.append('L' + f(s.c) + 'L' + f(s.end_point))
            else: out.append('C' + f(s.c1) + ' ' + f(s.c2) + ' ' + f(s.end_point))
        out.append('Z')
    return ''.join(out)

def strokes_of(ink, tf, min_len=5):
    """墨线掩膜（原分辨率 ×2）→ 骨架 → 折线（逐笔）。排序：先长线（轮廓）后短线（排线），各自从上到下、从左到右"""
    sk = skeletonize(ink)
    pts = set(zip(*np.nonzero(sk)))
    nb = lambda p: [(p[0] + dy, p[1] + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1) if (dy or dx) and (p[0] + dy, p[1] + dx) in pts]
    seen, lines = set(), []
    def walk(p):
        line = [p]; seen.add(p)
        while True:
            nx = [q for q in nb(p) if q not in seen]
            if not nx: break
            # 优先直着走（与上一步方向一致）
            if len(line) > 1:
                d0 = (p[0] - line[-2][0], p[1] - line[-2][1]); nx.sort(key=lambda q: -((q[0] - p[0]) * d0[0] + (q[1] - p[1]) * d0[1]))
            p = nx[0]; line.append(p); seen.add(p)
        return line
    order = sorted(pts)
    for p in [q for q in order if len(nb(q)) == 1] + order:   # 先从端点出发，剩下的（闭环）任意起点
        if p in seen: continue
        ln = walk(p)
        if len(ln) >= min_len: lines.append(ln)
    out = []
    for ln in lines:
        a = approximate_polygon(np.array(ln, float), tolerance=0.8)
        P = [tf(x, y) for y, x in a]
        L = sum(math.dist(P[i], P[i + 1]) for i in range(len(P) - 1))
        out.append((L, P))
    longs = sorted([o for o in out if o[0] >= 30], key=lambda o: (round(o[1][0][1] / 40), o[1][0][0]))
    shorts = sorted([o for o in out if o[0] < 30], key=lambda o: (round(o[1][0][1] / 40), o[1][0][0]))
    return [[round(v, 1) for xy in P for v in xy] for L, P in longs + shorts]

def part(name, box, pivot, *, scale=1.0, keep=None, erase=(), rot=0.0, flip=False, sil_from=None, anchors=None):
    """box：部件表裁切框；pivot：枢轴（部件表像素）；keep(x, y) → 布尔：只保留这部分（切开上臂 / 前臂）；
    erase：擦掉的多边形（躯干上的两只袖子，换成可动的手臂）；rot：部件转多少度挂到骨骼上（骨骼方向 = 局部 +x）"""
    g, m = comp_mask(box)
    h, w = g.shape
    ink = (g < 150) & nd.binary_dilation(m, iterations=1)
    sil = nd.binary_fill_holes(nd.binary_closing(nd.binary_dilation(ink, iterations=2), iterations=3))
    sil = nd.binary_erosion(sil, iterations=1)
    yy, xx = np.mgrid[0:h, 0:w]; X, Y = xx + box[0], yy + box[1]
    sel = np.ones_like(ink)
    if keep is not None: sel &= keep(X, Y)
    if erase: sel &= ~poly_mask(ink.shape, erase, box[:2])
    ink &= sel; sil &= sel
    # 放大描：灰度放大 + 平滑后阈值（墨线）；剪影直接放大
    gi = Image.fromarray(np.where(ink, g, 255).astype(np.uint8)).resize((w * UP, h * UP), Image.LANCZOS).filter(ImageFilter.GaussianBlur(UP * 0.35))
    inkU = np.array(gi) < 140
    silU = np.array(Image.fromarray((sil * 255).astype(np.uint8)).resize((w * UP, h * UP), Image.LANCZOS).filter(ImageFilter.GaussianBlur(UP * 0.6))) > 127
    c, s_ = math.cos(math.radians(rot)), math.sin(math.radians(rot)); k = S * scale
    def tf_sheet(x, y):
        x, y = x - pivot[0], y - pivot[1]
        if flip: x = -x
        x, y = x * k, y * k
        return (round(x * c - y * s_, 1), round(x * s_ + y * c, 1))
    tfU = lambda x, y: tf_sheet(box[0] + x / UP, box[1] + y / UP)
    ink2 = np.array(Image.fromarray((ink * 255).astype(np.uint8)).resize((w * 2, h * 2), Image.NEAREST)) > 127
    tf2 = lambda x, y: tf_sheet(box[0] + (x + 0.5) / 2, box[1] + (y + 0.5) / 2)
    P = {'ink': trace_d(inkU, tfU), 'sil': trace_d(silU, tfU), 'strokes': strokes_of(ink2, tf2)}
    xs = [tf_sheet(x, y) for x, y in [(box[0], box[1]), (box[2], box[1]), (box[0], box[3]), (box[2], box[3])]]
    P['box'] = [min(p[0] for p in xs), min(p[1] for p in xs), max(p[0] for p in xs), max(p[1] for p in xs)]
    P['anchors'] = {a: list(tf_sheet(*v)) for a, v in (anchors or {}).items()}
    P['ink_px'] = float(np.mean(nd.distance_transform_edt(ink2)[skeletonize(ink2)])  / 2 * S * scale)   # 平均墨线半宽（世界像素）
    print(f'{name:9s} 墨线 {len(P["ink"]):6d} 字  剪影 {len(P["sil"]):5d} 字  笔画 {len(P["strokes"]):3d}  半宽 {P["ink_px"]:.1f}px')
    return P

ARM_BOX = (1145, 278, 1262, 648)
SH_R, EL, WR = (1205, 320), (1187, 452), (1209, 556)            # 部件表里手臂的肩 / 肘 / 腕（逐行量墨线左右沿取中点）
deg = lambda a, b: math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))
A_UP, A_FO = deg(SH_R, EL), deg(EL, WR)                         # 上臂 / 前臂在部件表里的朝向（≈ 竖直向下）
PARTS = {
    'head': part('head', (104, 34, 312, 266), (210, 248), anchors={'top': (205, 45)}),
    'torso': part('torso', (84, 279, 326, 684), (215, 660),
                  erase=[[(262, 316), (340, 316), (340, 448), (294, 448), (293, 380), (281, 346), (262, 330)],
                         [(78, 316), (186, 316), (168, 342), (152, 380), (150, 448), (78, 448)]],
                  anchors={'neck': (226, 312), 'shR': (276, 348), 'shL': (162, 348)}),
    'upper': part('upper', ARM_BOX, SH_R, scale=0.9, keep=lambda X, Y: Y < 458, rot=-A_UP, anchors={'elbow': EL}),
    'fore': part('fore', ARM_BOX, EL, scale=0.9, keep=lambda X, Y: (Y > 434) & (Y < 563), rot=-A_FO, anchors={'wrist': WR}),
    'fist': part('fist', (356, 588, 492, 672), (370, 627), scale=0.72, anchors={'grip': (447, 626)}),
    'armL': part('armL', ARM_BOX, SH_R, scale=0.9, flip=True, rot=-(180 - A_UP), anchors={'elbow': EL}),
}
for k, p in PARTS.items():
    if 'elbow' in p['anchors'] or 'wrist' in p['anchors']: pass
meta = {'S': S, 'A_UP': A_UP, 'A_FO': A_FO,
        'L_UP': round(math.dist(SH_R, EL) * S * 0.9, 1), 'L_FO': round(math.dist(EL, WR) * S * 0.9, 1),
        'R_ARM': round(21 * S * 0.9, 1)}   # 手臂半宽（关节叠盖圆的半径）
src = ('// 自动生成：python3 rig/trace_parts.py（来源 rig/barista_marker_sheet.png = generate_image 以 style1_marker.png 为参考的黑白马克笔部件表）\n'
       '// 每个部件：ink = potrace 墨线填充路径；sil = 剪影（白底遮挡）；strokes = 骨架中心线 [x0,y0,x1,y1,…]（逐笔顺序 + 笔尖路线）；\n'
       '// 局部坐标原点 = 关节枢轴，骨骼方向 = 局部 +x（上臂 / 前臂已转好）；anchors = 子关节 / 握点。\n'
       f'export const META = {json.dumps(meta)};\n'
       f'export const PARTS = {json.dumps(PARTS, ensure_ascii=False, separators=(",", ":"))};\n')
(HERE / 'barista_marker.js').write_text(src, encoding='utf-8')
print('写入', HERE / 'barista_marker.js', len(src), '字节', meta)
