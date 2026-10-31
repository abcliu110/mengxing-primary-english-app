#!/usr/bin/env python3
"""wbdupcheck.py [--all] —— 决策 36 ①1/①2：语法白板（v5/scenes/hd_g*.js）跨课串板检查。
同一块板 = 场景 ITEMS 里连续 ≥3 条白板字（'w'，去掉标题行「Gxx 底层原理」「Gxx 第n幕」）；
不同语法点（G 号不同）的幕之间出现同一串连续 ≥3 条相同白板字 → 串板，不合格。
同一语法点的几幕之间允许重复（如 G14 三幕共用开场）。白名单 lab/audit36/wbdup_allow.json：{"G07|G09": "理由"}（应为空，临时登记待修项）。
输出最后一行「wbdupcheck 不合格 N」，N>0 返回码 1。"""
import glob, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__)); V5 = os.path.join(HERE, '..', 'v5')
ALLOW = os.path.join(HERE, '..', 'lab', 'audit36', 'wbdup_allow.json')
allow = json.load(open(ALLOW, encoding='utf-8')) if os.path.exists(ALLOW) else {}
def items(f):
    src = open(f, encoding='utf-8').read()
    m = re.search(r'const ITEMS = (\[.*?\n\]);', src, re.S)
    out = []
    if not m: return out   # 决策 38 重做幕（concept.js，用 KNOW、板上无逐行白板字）没有 ITEMS：不参与串板比对
    for mm in re.finditer(r"^\s*\['(\w)', '((?:[^'\\]|\\.)*)'", m.group(1), re.M):
        k, a = mm.group(1), mm.group(2).replace("\\'", "'").replace('\\\\', '\\')
        if k != 'w' or re.match(r'^G\d\d (底层原理|第\d+幕)$', a): out.append(None); continue
        out.append(a)
    return out
S = {}
for f in sorted(glob.glob(os.path.join(V5, 'scenes', 'hd_g[0-9][0-9]_*.js'))):
    name = os.path.basename(f)[:-3]; S[name] = items(f)
def runs(L, n=3):
    r = set()
    for i in range(len(L) - n + 1):
        w = L[i:i + n]
        if all(w): r.add(tuple(w))
    return r
R = {k: runs(v) for k, v in S.items()}
bad, seen = 0, set()
names = sorted(S)
for i, a in enumerate(names):
    for b in names[i + 1:]:
        ga, gb = a[3:6].upper(), b[3:6].upper()
        if ga == gb: continue
        common = R[a] & R[b]
        if not common: continue
        key = f'{ga}|{gb}'
        tag = '（白名单：' + allow[key] + '）' if key in allow else ''
        if not tag: bad += 1
        print(f"{'⚠' if tag else '❌'} {a} ↔ {b} 串板 {len(common)} 段，例：{' / '.join(sorted(common)[0])[:80]}{tag}")
print(f'wbdupcheck 幕 {len(S)}，不合格 {bad}')
sys.exit(1 if bad else 0)
