#!/usr/bin/env python3
"""gen_oral38.py —— 决策 38 ② 阶段 ②：把 scenes/hd_oral_*_*.js 从 auto.js 切到口语通用版式 oral.js（幂等）。
只改：首行注释说明、import、autoBuild→oralBuild、ACTS 加 "M"（男孩帧 说/听/开场）"F"（女孩帧），旧 "A"/"B" 键改名 M/F；ITEMS 一字不动。
用法：python3 gen_oral38.py [前缀…]   之后 python3 rebuild_all.py --tabs=hd_oral 打包 + 嵌入，python3 check_oral.py 验收。"""
import glob, json, re, sys, pathlib
V5 = pathlib.Path(__file__).resolve().parent
PRE = sys.argv[1:]
M = ["l_speak", "l_ear", "l_wave"]; F = ["m_story", "m_admire", "m_admire"]
NOTE = '—— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）'
n = 0
for f in sorted(glob.glob(str(V5 / 'scenes' / 'hd_oral_*_*.js'))):
    st = pathlib.Path(f).stem
    if PRE and not any(st.startswith(p) for p in PRE): continue
    s0 = s = open(f, encoding='utf-8').read()
    items0 = re.search(r'const ITEMS = \[.*?\n\];', s, re.S).group(0)
    lines = s.split('\n')
    lines[0] = re.sub(r' —— .*$', ' ' + NOTE, lines[0]); s = '\n'.join(lines)
    s = s.replace("import { autoBuild } from './auto.js';", "import { oralBuild } from './oral.js';").replace('return autoBuild(SP,', 'return oralBuild(SP,')
    m = re.search(r'const ACTS = (\{.*?\});', s)
    acts = json.loads(m.group(1))
    acts.setdefault('M', acts.pop('A', M)); acts.setdefault('F', acts.pop('B', F))
    acts = {k: acts[k] for k in ['*', 'M', 'F'] if k in acts}
    s = s[:m.start(1)] + json.dumps(acts, ensure_ascii=False) + s[m.end(1):]
    assert re.search(r'const ITEMS = \[.*?\n\];', s, re.S).group(0) == items0, st
    assert "from './oral.js'" in s and 'oralBuild(SP' in s, st
    if s != s0: open(f, 'w', encoding='utf-8').write(s); n += 1
print('改写', n, '幕')
