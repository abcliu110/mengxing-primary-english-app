#!/usr/bin/env python3
"""datacheck.py —— 决策 35 数据底座检查（入 runall）。
A7：英美两种拼写都是主词条 → 0（主拼写英式，美式走 WORD_ALIAS）。
A6：同一词形多个主词条（别名除外；词组卡 ↔ 单词卡互链的除外）→ 0。
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
# A6：同一词形多个非别名词条 → 只允许「词组卡 ↔ 单词卡」互链（WORD_GROUP_MEMBERS，重复内容合并第 2 步的设计：G1_P01「I / me / my / mine」↔ V6_核心_0–3）
import collections
i0 = s.index('const VOCAB_DB = ['); seg = s[i0:s.index('\n];', i0)]
WA = json.loads(re.search(r'const WORD_ALIAS = (\{.*?\});', s).group(1)); GM = json.loads(re.search(r'const WORD_GROUP_MEMBERS = (\{.*?\});', s).group(1))
GOF = {m: g for g, ms in GM.items() for m in ms}
forms = collections.defaultdict(set)
for m in re.finditer(r'\{"id":"([^"]+)","word":"((?:[^"\\]|\\.)*)"', seg):
    i, w = m.group(1), m.group(2)
    if i in WA: continue
    for f in w.split(' / '): forms[f.strip().lower()].add(i)
for f, ids in forms.items():
    if len(ids) < 2: continue
    ok = all(i in GM or i in GOF for i in ids) and len({GOF.get(i, i) for i in ids}) == 1
    if not ok: bad.setdefault('A6 同一词形多个主词条', []).append(f + ':' + ','.join(sorted(ids)))
# A7：英美两种拼写都是主词条 → 不合格
for uk, us in [('colour', 'color'), ('grey', 'gray'), ('centre', 'center'), ('maths', 'math'), ('mum', 'mom'), ('metre', 'meter'), ('centimetre', 'centimeter'), ('theatre', 'theater'), ('favourite', 'favorite'), ('neighbour', 'neighbor'), ('practise', 'practice'), ('woollen', 'woolen')]:
    if forms.get(uk) and forms.get(us): bad.setdefault('A7 英美拼写都是主词条', []).append(f'{uk}/{us}')
n = sum(len(x) for x in bad.values())
for t, ks in bad.items(): print(f'❌ {t} {len(ks)}：', ' '.join(ks[:8]))
print(f'词条 {len(H)}；datacheck 不合格 {n}')
