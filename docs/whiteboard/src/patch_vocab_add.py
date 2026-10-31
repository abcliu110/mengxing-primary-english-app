#!/usr/bin/env python3
"""patch_vocab_add.py [json …] —— 决策 35 A2：把新词条写进主文件（幂等）。
每个 json 是 [{"light": {...首屏字段}, "heavy": {...重字段}}, …]（gen_vocab_a2.py 等生成）；
light 追加到 `const VOCAB_DB = [...]` 末尾，heavy 追加到 `<script type="application/json" id="VOCAB_HEAVY_JSON">` 对象末尾。
id 已在 VOCAB_DB 里的跳过（重放安全）；不带参数时按 DEFAULT 顺序全部重放。"""
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

if __name__ == '__main__':
    files = sys.argv[1:] or [str(LAB / f) for f in DEFAULT if (LAB / f).exists()]
    s = APP.read_text(encoding='utf-8'); tot = 0
    for f in files:
        rows = json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
        s, n, k = apply(s, rows); tot += n; print(pathlib.Path(f).name, 'added', n, 'already', k)
    if tot: __import__('appwrite').save(s)
