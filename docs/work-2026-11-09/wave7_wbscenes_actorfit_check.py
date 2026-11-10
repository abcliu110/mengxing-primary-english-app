#!/usr/bin/env python3
"""wave7_wbscenes_actorfit_check.py —— 静态尺寸复核（auto.js 同款公式，不跑浏览器）：
对每幕的 ACTS 帧，用其精灵包 FI（w/bottom/ax）算：
  无 actorFitW：AH=470，AX 钳制后的演员 x、右缘 = x + (w-ax)*AH/bottom；
  有 actorFitW=500：AH = min(470, min over 帧 500*bottom/w)，再算同一组数。
演员窗 [1380,1880]，画布 1920；右缘 > 1920 即超画布。
用法：python3 docs/work-2026-11-09/wave7_wbscenes_actorfit_check.py <幕> [...]
幕名如 five_patterns_p2_1（不带 .js）。精灵包取 v5/sprites/<lib>.js（gitignored 本地产物；缺包则该幕跳过并注明）。
"""
import json, re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
SCENES = ROOT / 'docs/whiteboard/v5/scenes'
SPR = ROOT / 'docs/whiteboard/v5/sprites'

def parse_scene(name):
    src = (SCENES / f'{name}.js').read_text(encoding='utf-8')
    lib = re.search(r"from '\.\./sprites/(\w+)\.js'", src).group(1)
    acts = json.loads(re.search(r'const ACTS = (\{.*?\});', src).group(1))
    fit = re.search(r'actorFitW:\s*(\d+)', src)
    return lib, acts, int(fit.group(1)) if fit else None

def parse_fi(lib):
    p = SPR / f'{lib}.js'
    if not p.exists():
        return None
    src = p.read_text(encoding='utf-8')
    m = re.search(r'export const FI = (\{.*?\});', src, re.S)
    if not m:
        return {}  # stub 包：FI 为空
    return json.loads(m.group(1))

def geom_action(frames_fi, ah):
    """auto.js AX(fr)：按 ACTS 登记顺序逐帧 min/max；返回该动作的 (x, 左缘, 右缘)。"""
    x = 1600.0
    for f in frames_fi:
        sc = ah / f['bottom']
        x = min(x, 1880 - (f['w'] - f['ax']) * sc)
        x = max(x, 1380 + f['ax'] * sc)
    left = min(x - f['ax'] * ah / f['bottom'] for f in frames_fi)
    right = max(x + (f['w'] - f['ax']) * ah / f['bottom'] for f in frames_fi)
    return x, left, right

def geom_scene(acts, fi_all, ah):
    """每动作一组 AX；取全幕最差左/右缘。返回 (worst_left, worst_right, worst_key)。"""
    wl, wr, wk = 1e9, -1e9, None
    for k, fs in acts.items():
        fis = [fi_all[f] for f in fs]
        _, l, r = geom_action(fis, ah)
        if r > wr:
            wr, wk = r, k
        wl = min(wl, l)
    return wl, wr, wk

for name in sys.argv[1:]:
    lib, acts, fit = parse_scene(name)
    fi_all = parse_fi(lib)
    if fi_all is None:
        print(f'{name}: 精灵包 {lib}.js 缺失，跳过'); continue
    frames = sorted({f for vs in acts.values() for f in vs})
    missing = [f for f in frames if f not in fi_all]
    if missing:
        print(f'{name}: 帧 {missing} 不在 {lib}.js FI 里（stub/缺包），跳过'); continue
    if not frames:
        print(f'{name}: ACTS 为空，无演员（actorFitW {"已声明 %d" % fit if fit else "未声明"}， dormant）'); continue
    fis = [fi_all[f] for f in frames]
    l0, r0, k0 = geom_scene(acts, fi_all, 470)
    ah = 470
    if fit:
        for f in fis:
            ah = min(ah, fit * f['bottom'] / f['w'])
    l1, r1, k1 = geom_scene(acts, fi_all, ah)
    print(f'{name} (lib {lib}, actorFitW={fit}):')
    print(f'  无收界 AH=470：右缘 {r0:.0f}（超 {max(0, r0 - 1920):.0f}px，最差动作 {k0}）左缘 {l0:.0f}')
    print(f'  收界后 AH={ah:.1f}：右缘 {r1:.0f}（超 {max(0, r1 - 1920):.0f}px，最差动作 {k1}）左缘 {l1:.0f} 判定 {"OK" if r1 <= 1920 and l1 >= 1380 - 1 else "仍超"}')
