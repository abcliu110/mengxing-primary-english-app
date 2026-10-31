#!/usr/bin/env python3
"""split_auto.py <页签>_<n> … [--max 90] [--dry] —— 决策 36-② 长幕拆分（auto.js 自动版面幕）。
把一幕的 ITEMS 按讲解段（只在 'n' 讲解句前下刀）切成 k 节，每节估计 ≤ --max 秒（k = ceil(时长 / max)，时长取 lab/audit36/durations.json）：
  第 1 节留在原文件 scenes/<页签>_<n>.js；第 j 节（j ≥ 2）写 scenes/<页签>_p<j>_<n>.js（App 里由 src/patch_wb5_parts.py 的「第 j 节」按钮切换）。
ITEMS 原行原样搬（R1 零丢失：各节 ITEMS 拼起来 = 原 ITEMS，脚本自检）；ACTS / 角色包 / autoBuild 不变；第 j 节标题加「 · 第 j 节」。
之后：python3 rebuild_all.py --tabs=<页签> → durcheck --scan → app_check_parts。"""
import json, math, re, sys, pathlib
V5 = pathlib.Path(__file__).resolve().parent; DUR = V5.parent / 'lab' / 'audit36' / 'durations.json'
MAX = float(sys.argv[sys.argv.index('--max') + 1]) if '--max' in sys.argv else 90.0
DRY = '--dry' in sys.argv
names = [a for a in sys.argv[1:] if not a.startswith('--') and not re.fullmatch(r'[\d.]+', a)]
durs = json.loads(DUR.read_text())

def readT(s):
    s = re.sub(r'[\U0001F000-\U0001FAFF\u2600-\u27BF]', '', s)
    cjk = len(re.findall(r'[\u3400-\u9fff]', s)); en = len(re.findall(r'[A-Za-z]+', re.sub(r'[\u3400-\u9fff]', ' ', s)))
    return max(0.8, cjk / 5 + en / 2.2)

def weight(it):
    k = it[0]
    if k == 'n': return readT(it[1]) + 0.8
    if k == 's': return max(len(it[1].split()) * 0.36 + 0.9, readT(it[2] if len(it) > 2 else '') + 0.6) + 0.5
    if k == 'w': return 0.5 + len(it[1]) * 0.03
    return 0.4

for nm in names:
    f = V5 / 'scenes' / f'{nm}.js'; src = f.read_text(encoding='utf-8')
    m = re.search(r'^const ITEMS = \[\n(.*?)\n\];', src, re.S | re.M); assert m, nm
    lines = m.group(1).split('\n')
    import subprocess
    items = json.loads(subprocess.run(['node', '-e', 'console.log(JSON.stringify(eval(process.argv[1])))', '[' + m.group(1) + ']'], capture_output=True, text=True, check=True).stdout)
    assert len(items) == len(lines), f'{nm}: 一行不是一条（{len(items)} 条 / {len(lines)} 行）'
    dur = durs.get(nm); assert dur, f'{nm} 不在 durations.json（先 durcheck --scan）'
    k = math.ceil(dur / MAX)
    if k < 2: print(nm, dur, '不用拆'); continue
    w = [weight(it) for it in items]; tot = sum(w); cum = [0]
    for x in w: cum.append(cum[-1] + x)
    first_n = next(i for i, it in enumerate(items) if it[0] == 'n' and i > 0 and any(j[0] == 'n' for j in items[:i]))
    cand = [i for i, it in enumerate(items) if it[0] == 'n' and i >= first_n]
    cuts = []
    for j in range(1, k):
        tgt = tot * j / k
        c = min((i for i in cand if (not cuts or i > cuts[-1] + 2)), key=lambda i: abs(cum[i] - tgt))
        cuts.append(c)
    bounds = [0] + cuts + [len(items)]
    parts = [lines[bounds[j]:bounds[j + 1]] for j in range(k)]
    assert sum(parts, []) == lines
    est = [round((cum[bounds[j + 1]] - cum[bounds[j]]) / tot * dur) for j in range(k)]
    tab, n = re.match(r'(.+)_(\d+)$', nm).groups()
    print(nm, f'{dur:.0f} s →', k, '节，估计', est, '下刀于', [items[c][1][:18] for c in cuts])
    if DRY: continue
    title = re.search(r"title: '((?:[^'\\]|\\.)*)'", src).group(1)
    def write(path, part_lines, j):
        s2 = src[:m.start(1)] + '\n'.join(part_lines) + src[m.end(1):]
        if j > 1:
            s2 = s2.replace(f"title: '{title}'", f"title: '{title} · 第 {j} 节'", 1)
            first = s2.split('\n', 1)
            first[0] = re.sub(r'^// (.*?) —', lambda q: f'// {q.group(1)} · 第 {j} 节 —', first[0], count=1)
            s2 = first[0] + f'\n// 决策 36-② 长幕拆分：原 {nm}（{dur:.0f} s）的第 {j} 节（共 {k} 节，由 v5/split_auto.py 生成；App 白板下「第 {j} 节」按钮）\n' + first[1]
        else:
            s2 = s2.replace('\n', f'\n// 决策 36-② 长幕拆分：本幕只留第 1 节（共 {k} 节，其余在 scenes/{tab}_p2_{n}.js … 由 v5/split_auto.py 生成）\n', 1)
        path.write_text(s2, encoding='utf-8')
    write(f, parts[0], 1)
    for j in range(2, k + 1): write(V5 / 'scenes' / f'{tab}_p{j}_{n}.js', parts[j - 1], j)
