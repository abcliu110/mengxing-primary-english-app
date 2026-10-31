#!/usr/bin/env python3
"""phoncheck.py —— 决策 35 A1：词库音标检查（入 runall）。
不合格：① 音标为空或没有用 /…/ 包起来；② 含 IPA 里不用的 ASCII 字母 c q x y 或 ASCII g（应为 ɡ）；
③ 音标去掉斜杠 / 空格后和拼写一模一样，且该词不在白名单 lab/audit35/phon_same_ok.json（pen、red 这类 CMUdict 读音本来就和拼写同形的词）。"""
import json, re, sys, subprocess, pathlib
HERE = pathlib.Path(__file__).resolve().parent
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
OK = set(json.loads((HERE.parent / 'lab' / 'audit35' / 'phon_same_ok.json').read_text(encoding='utf-8')))
db = json.loads(subprocess.run(['node', str(HERE / 'vocab_extract.js'), str(APP)], capture_output=True, text=True).stdout)
bad = []
for w in db:
    p = (w.get('phonetic') or '').strip(); word = w['word']
    core = p.strip('/').replace(' ', '').lower(); sp = word.replace(' ', '').lower()
    if not re.fullmatch(r'/[^/]+/(\s*/[^/]+/)*', p): bad.append((w['id'], word, p, '格式')); continue
    if re.search(r'[cqxyg]', p): bad.append((w['id'], word, p, '非 IPA 字母')); continue
    if core == sp and word.lower() not in OK: bad.append((w['id'], word, p, '音标=拼写'))
for b in bad[:30]: print('BAD', *b)
print(f'phoncheck: {len(db)} 词，不合格 {len(bad)}' + ('' if bad else ' → OK'))
sys.exit(1 if bad else 0)
