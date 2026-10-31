#!/usr/bin/env python3
"""datacheck.py —— 决策 35 数据底座检查（入 runall）。
A3：VOCAB_HEAVY_JSON 里占位例句（`in a sentence!` / `核心考点词【`）、搭配动词占位、「课标关联：」占位构词栏 → 0 条。
输出「datacheck 不合格 N」。"""
import json, pathlib
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
n = sum(len(x) for x in bad.values())
for t, ks in bad.items(): print(f'❌ {t} {len(ks)}：', ' '.join(ks[:8]))
print(f'词条 {len(H)}；datacheck 不合格 {n}')
