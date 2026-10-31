#!/usr/bin/env python3
"""datacheck.py —— 决策 35 数据底座检查（入 runall）。
A4：collocations 里模板「a/the/my X」、整句、「Morph form」占位 → 0 条。
A3：VOCAB_HEAVY_JSON 里占位例句（`in a sentence!` / `核心考点词【`）、搭配动词占位、「课标关联：」占位构词栏 → 0 条。
输出「datacheck 不合格 N」。"""
import json, pathlib, re
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); TAG = '<script type="application/json" id="VOCAB_HEAVY_JSON">'
a = s.index(TAG) + len(TAG); H = json.loads(s[a:s.index('</script>', a)])
PH = lambda t: bool(t) and ('in a sentence!' in t or '核心考点词【' in t)
bad = {}
for k, v in H.items():
    for x in v.get('senses') or []:
        if PH(x.get('ex_en')) or PH(x.get('ex_zh')): bad.setdefault('A3 占位例句', []).append(k)
    if PH(v.get('example_en')) or PH(v.get('example_zh')): bad.setdefault('A3 占位 example_en/zh', []).append(k)
    if any(PH(x) for x in (v.get('collocations') or {}).get('verbs') or []): bad.setdefault('A3 搭配动词占位', []).append(k)
    if (v.get('affix_root') or '').startswith('课标关联：'): bad.setdefault('A3 构词栏占位', []).append(k)
    c = v.get('collocations') or {}; ad = c.get('adjs') or []
    if len(ad) == 3 and ad[1].startswith('the ') and ad[2].startswith('my ') and ad[1][4:] == ad[2][3:]: bad.setdefault('A4 模板搭配 a/the/my X', []).append(k)
    if any(x.startswith('Morph form') or re.search(r'[.!?。！？]$', x.strip()) for x in (c.get('verbs') or []) + ad): bad.setdefault('A4 搭配栏放了整句 / Morph 占位', []).append(k)
n = sum(len(x) for x in bad.values())
for t, ks in bad.items(): print(f'❌ {t} {len(ks)}：', ' '.join(ks[:8]))
print(f'词条 {len(H)}；datacheck 不合格 {n}')
