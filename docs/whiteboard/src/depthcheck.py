#!/usr/bin/env python3
"""depthcheck.py [--strict] —— 决策 39（SOP_COGNITIVE_UPGRADE.md §四 / SOP §18 第 20 条）：专题纵深门禁。
hd_g01–g40、wo_rule_*、ze_* 每个专题在 v5/scenes 下的子幕（<专题>_<n>.js，不算分节文件 *_p<k>_<n>.js）必须 ≥ 3 幕（①破障 ②建模 ③边界，④炼金可选）。
默认只提示（runall 里列在 WARN，不判不合格）；--strict 时不足 3 幕的专题记不合格。推广完成后 runall 改为 --strict。
输出最后一行「depthcheck 不足 3 幕 N / 专题 M」，--strict 下另打「depthcheck 不合格 N」。"""
import pathlib, re, sys, collections
V5 = pathlib.Path(__file__).resolve().parents[1] / 'v5' / 'scenes'
PAT = re.compile(r'^(hd_g\d+|wo_rule_[a-z0-9_]+?|ze_[a-z0-9_]+?)_(\d+)$')
mods = collections.defaultdict(set)
for f in V5.glob('*.js'):
    st = f.stem
    if re.search(r'_p\d+_\d+$', st): continue          # 决策 36-② 分节文件不是新幕
    m = PAT.match(st)
    if m: mods[m.group(1)].add(int(m.group(2)))
short = sorted((k, len(v)) for k, v in mods.items() if len(v) < 3)
by = collections.Counter(n for _, n in short)
for k, n in short: print(f'   {k}: {n} 幕')
print(f'按幕数：' + '，'.join(f'{n} 幕 {c} 个' for n, c in sorted(by.items())))
print(f'depthcheck 不足 3 幕 {len(short)} / 专题 {len(mods)}')
if '--strict' in sys.argv:
    print(f'depthcheck 不合格 {len(short)}'); sys.exit(1 if short else 0)
