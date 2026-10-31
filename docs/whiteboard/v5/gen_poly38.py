#!/usr/bin/env python3
"""gen_poly38.py —— 决策 38 ⑩：把 scenes/hd_poly_*_*.js（一词多义 17 词 × 3 幕）从 auto.js 切到 scenes/poly.js（幂等）。
只改首行说明、import、autoBuild→polyBuild；ITEMS / ACTS 一字不动。之后打包 + check_poly.py。"""
import glob, re, pathlib
V5 = pathlib.Path(__file__).resolve().parent
NOTE = '—— 决策 38 ⑩ 啊哈重做（一词多义通用版式 scenes/poly.js；啊哈卡 lab/audit38/aha/10_hd_poly.md）'
n = 0
for f in sorted(glob.glob(str(V5 / 'scenes' / 'hd_poly_*_*.js'))):
    s0 = s = open(f, encoding='utf-8').read(); it0 = re.search(r'const ITEMS = \[.*?\n\];', s, re.S).group(0)
    lines = s.split('\n'); lines[0] = re.sub(r' —— .*$', ' ' + NOTE, lines[0]); s = '\n'.join(lines)
    s = s.replace("import { autoBuild } from './auto.js';", "import { polyBuild } from './poly.js';").replace('return autoBuild(SP,', 'return polyBuild(SP,')
    assert re.search(r'const ITEMS = \[.*?\n\];', s, re.S).group(0) == it0 and "from './poly.js'" in s, f
    if s != s0: open(f, 'w', encoding='utf-8').write(s); n += 1
print('改写', n, '幕')
