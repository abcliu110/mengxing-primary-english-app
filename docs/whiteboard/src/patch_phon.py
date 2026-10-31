"""patch_phon.py —— 决策 35 A1：把 lab/audit35/phon_fix.json 里的新音标写进主文件 VOCAB_DB（幂等）。
只改 `"id":"<id>","word":"<word>","phonetic":"<旧>"` 这一处；旧值已经是新值就跳过。"""
import json, pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
HERE = pathlib.Path(__file__).resolve().parent
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
rows = json.loads((HERE.parent / 'lab' / 'audit35' / 'phon_fix.json').read_text(encoding='utf-8'))
s = APP.read_text(encoding='utf-8'); n = skip = 0
for r in rows:
    if not r['new']: continue
    pre = '"id":%s,"word":%s,"phonetic":' % (json.dumps(r['id'], ensure_ascii=False), json.dumps(r['word'], ensure_ascii=False))
    old, new = pre + json.dumps(r['old'], ensure_ascii=False), pre + json.dumps(r['new'], ensure_ascii=False)
    if s.count(new) == 1: skip += 1; continue
    assert s.count(old) == 1, (r['id'], r['word'], s.count(old))
    s = s.replace(old, new); n += 1
if n: __import__('appwrite').save(s)
print('patched', n, 'already', skip)
