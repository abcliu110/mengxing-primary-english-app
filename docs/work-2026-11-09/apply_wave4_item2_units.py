"""第四波第 2 项：units.json 登记 vv_give_on（插在 vv_give_back 之后）。

用法：python3 docs/work-2026-11-09/apply_wave4_item2_units.py
写入格式与原文件一致：json.dumps(indent=1, ensure_ascii=False)，无尾换行；
跑前断言 roundtrip 且 vv_give_back 紧邻在前、总数 233。
"""
import json

UNITS = 'docs/whiteboard/v5/units.json'

with open(UNITS, encoding='utf-8') as f:
    raw = f.read()
d = json.loads(raw)
assert json.dumps(d, indent=1, ensure_ascii=False) == raw, 'roundtrip 与原文件不一致，先停手'
assert len(d) == 233, len(d)
assert 'vv_give_on' not in d
keys = list(d.keys())
assert keys.index('vv_give_back') == 79, keys.index('vv_give_back')

entry = {
    "field": "vv",
    "lib": "vvgiveon",
    "name": "🎬 万能动词 · give on",
    "cases": {
        "1": {
            "title": "🎬 万能动词 · give on ①",
            "acts": {"*": ["l_shutter"]},
        },
        "2": {
            "title": "🎬 万能动词 · give on ②",
            "acts": {"*": ["l_gdoor"]},
        },
    },
}

out = {}
for k, v in d.items():
    out[k] = v
    if k == 'vv_give_back':
        out['vv_give_on'] = entry

assert list(out.keys()).index('vv_give_on') == list(out.keys()).index('vv_give_back') + 1
assert len(out) == 234
text = json.dumps(out, indent=1, ensure_ascii=False)
assert not text.endswith('\n')
assert json.loads(text) == out
with open(UNITS, 'w', encoding='utf-8') as f:
    f.write(text)
print('units.json: 233 -> 234, vv_give_on 插在 vv_give_back 之后')
