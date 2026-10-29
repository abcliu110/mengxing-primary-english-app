#!/usr/bin/env python3
"""addsay.py <case.js> <spec.json>：spec = [[anchor, en, zh, word?], ...]，在含 anchor 的那一行之前插入 k.say(...)。anchor 必须唯一。"""
import sys, json
f, spec = sys.argv[1], json.load(open(sys.argv[2]))
L = open(f, encoding='utf-8').read().split('\n')
for a, en, zh, *w in spec:
    a0 = a.startswith('>'); a = a[1:] if a0 else a
    idx = [i for i, l in enumerate(L) if a in l]
    assert len(idx) == 1, (a, len(idx))
    i = idx[0] + (1 if a0 else 0); ind = L[idx[0]][:len(L[idx[0]]) - len(L[idx[0]].lstrip())]
    o = {'zh': zh}
    if w and w[0]: o['word'] = w[0]
    L.insert(i, f"{ind}k.say({json.dumps(en, ensure_ascii=False)}, {json.dumps(o, ensure_ascii=False)});".replace('{"zh"', '{ zh').replace(', "word"', ', word').replace('"}', '" }'))
open(f, 'w', encoding='utf-8').write('\n'.join(L))
print(f, '+', len(spec))
