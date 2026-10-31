#!/usr/bin/env python3
"""patch_vocab_add.py [json …] —— 决策 35 A2：把新词条写进主文件（幂等）。
每个 json 是 [{"light": {...首屏字段}, "heavy": {...重字段}}, …]（gen_vocab_a2.py 等生成）；
light 追加到 `const VOCAB_DB = [...]` 末尾，heavy 追加到 `<script type="application/json" id="VOCAB_HEAVY_JSON">` 对象末尾。
id 已在 VOCAB_DB 里的跳过（重放安全）；不带参数时按 DEFAULT 顺序全部重放。
另：lab/audit35/a2_alias.json（别名 id → [主词条 id, 关系]）补进 WORD_ALIAS（patch_dedup_b 建的表，主卡显示「过去式：said」类标签，
别名词条运行时从 VOCAB_DB 列表拿掉）；lab/audit35/dolch220.json 的级别写进对应词条首屏字段 `dolch`（pre-primer / primer / grade1–3，词组词条取最早一级）。"""
import json, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
LAB = HERE.parent / 'lab' / 'audit35'
DEFAULT = ['a2_kebiao_add.json', 'a2_dolch_add.json']
TAG = '<script type="application/json" id="VOCAB_HEAVY_JSON">'
dump = lambda o: json.dumps(o, ensure_ascii=False, separators=(',', ':'))

def apply(s, rows):
    i = s.index('const VOCAB_DB = '); j = s.index('];\n', i)
    head = s[i:j]; add_l = []; add_h = []; skip = 0
    for r in rows:
        L, H = r['light'], r['heavy']
        if '"id":%s,' % json.dumps(L['id'], ensure_ascii=False) in head: skip += 1; continue
        add_l.append(dump(L)); add_h.append(json.dumps(L['id'], ensure_ascii=False) + ':' + dump(H).replace('</', '<\\/'))
    if not add_l: return s, 0, skip
    s = s[:j] + ',' + ','.join(add_l) + s[j:]
    a = s.index(TAG) + len(TAG); b = s.index('</script>', a)
    blob = s[a:b].rstrip(); assert blob.endswith('}')
    s = s[:a] + blob[:-1] + ',' + ','.join(add_h) + '}' + s[b:]
    return s, len(add_l), skip

def apply_alias(s):
    p = LAB / 'a2_alias.json'
    if not p.exists(): return s, 0
    al = json.loads(p.read_text(encoding='utf-8')); k = s.index('const WORD_ALIAS = {'); e = s.index('};', k)
    body = s[k:e]; add = [json.dumps(a, ensure_ascii=False) + ': ' + json.dumps(v, ensure_ascii=False) for a, v in al.items() if json.dumps(a, ensure_ascii=False) + ':' not in body]
    if add: s = s[:e] + ', ' + ', '.join(add) + s[e:]
    return s, len(add)

def apply_dolch(s):
    import re
    p = LAB / 'dolch220.json'
    if not p.exists(): return s, 0
    lv = {}
    for lev, ws in json.loads(p.read_text(encoding='utf-8'))['lists'].items():
        for w in ws: lv.setdefault(w.lower(), lev)
    order = list(json.loads(p.read_text(encoding='utf-8'))['lists'])
    i = s.index('const VOCAB_DB = '); j = s.index('];\n', i); db = json.loads(s[i + 16:j + 1])
    al = set(json.loads((LAB / 'a2_alias.json').read_text(encoding='utf-8'))) if (LAB / 'a2_alias.json').exists() else set()
    k0 = s.index('const WORD_ALIAS = {'); al |= set(json.loads(s[k0 + 19:s.index('};', k0) + 1]))
    best = {}
    for w in db:   # 每个 Dolch 词挂到第一个非别名词条（没有就挂别名词条）
        for f in re.split(r'\s*/\s*', w['word']):
            f = f.strip().lower()
            if f in lv and (f not in best or (best[f] in al and w['id'] not in al)): best[f] = w['id']
    tag = {}
    for f, wid in best.items():
        if wid not in tag or order.index(lv[f]) < order.index(tag[wid]): tag[wid] = lv[f]
    n = 0
    for wid, lev in tag.items():
        pre = '{"id":%s,' % json.dumps(wid, ensure_ascii=False)
        a = s.index(pre, i); b = s.index('}', a)
        if '"dolch":' in s[a:b]: continue
        s = s[:a] + pre + '"dolch":%s,' % json.dumps(lev) + s[a + len(pre):]; n += 1
    return s, n

if __name__ == '__main__':
    files = sys.argv[1:] or [str(LAB / f) for f in DEFAULT if (LAB / f).exists()]
    s = APP.read_text(encoding='utf-8'); tot = 0
    for f in files:
        rows = json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
        s, n, k = apply(s, rows); tot += n; print(pathlib.Path(f).name, 'added', n, 'already', k)
    s, na = apply_alias(s); s, nd = apply_dolch(s); print('WORD_ALIAS added', na, 'dolch tagged', nd)
    if tot or na or nd: __import__('appwrite').save(s)
