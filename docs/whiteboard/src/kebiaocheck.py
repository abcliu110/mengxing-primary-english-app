#!/usr/bin/env python3
"""kebiaocheck.py —— 决策 35 A2 / A5：课标词覆盖检查（入 runall）。
① 课标二级词表（lab/audit35/kebiao2.json，《义务教育英语课程标准（2022 年版）》附录 3，500 词；数词 / 月份 / 星期课标另列）
   每个词都能在 VOCAB_DB 找到一个词头（词头按「 / 」拆分、忽略大小写；a/an 拆成 a、an 都要有）→ 缺一个就不合格。
② Dolch 220 视觉高频词（lab/audit35/dolch220.json，按 Wikipedia 分级转录共 221 个）也必须全部在库（别名词条也算，A2 第 2 批起）；--dolch-loose 只报告。"""
import json, re, sys, subprocess, pathlib
HERE = pathlib.Path(__file__).resolve().parent
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
LAB = HERE.parent / 'lab' / 'audit35'
db = json.loads(subprocess.run(['node', str(HERE / 'vocab_extract.js'), str(APP)], capture_output=True, text=True).stdout)
forms = {}
for w in db:
    for f in re.split(r'\s*/\s*', w['word']):
        forms.setdefault(f.strip().lower(), w['id'])
def has(x): return all(p.strip().lower() in forms for p in x.split('/'))
kb = json.loads((LAB / 'kebiao2.json').read_text(encoding='utf-8'))
miss = [x for x in kb if not has(x)]
for x in miss: print('BAD 课标二级缺词', x)
dp = LAB / 'dolch220.json'; strict = '--dolch-loose' not in sys.argv
if dp.exists():
    dl = json.loads(dp.read_text(encoding='utf-8')); words = [x for v in dl['lists'].values() for x in v]
    dm = [x for x in words if x.lower() not in forms]
    print(f'Dolch 220：词库有 {len(words) - len(dm)} / {len(words)}' + (f'，缺 {len(dm)}：' + ' '.join(dm[:40]) if dm else ''))
    if strict and dm: miss += dm
print(f'kebiaocheck: 课标二级 {len(kb)} 词，不合格 {len(miss)}' + ('' if miss else ' → OK'))
sys.exit(1 if miss else 0)
