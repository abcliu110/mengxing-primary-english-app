# -*- coding: utf-8 -*-
"""【归档副本，勿作正式通道】正式版已于 2026-11-03 迁至 laws-prototype/tools/refresh_et.py
（引擎为 tools/gen_et.py）。本文件仅作历史归档保留（《数据源规范》§5.2：归档不参与生成与引用）。

刷新主文件词源区的内联数据（数据层变更后重跑本脚本即可）。
只替换 ET script 里的 var D = <payload>; 一行 + 区内 5 处静态计数文案，每处断言唯一命中。
payload 构造与 build_integration.py 完全一致。"""
import json, pathlib

LP = pathlib.Path('/tmp/mengxing2/laws-prototype')
HTML = LP / 'mengxing-prototype-v1.html'

data = json.load(open(LP / 'model/etymology.json'))
bank_raw = json.load(open(LP / 'model/wordbank.json'))
bank = {w['word'].lower(): w for w in bank_raw}
bank_total = len(bank_raw)

ver = sorted([r for r in data if r['status'] == 'verified'], key=lambda r: r['word'])
pend = sorted([{'word': r['word'], 'pending_reason': r.get('pending_reason', '')}
               for r in data if r['status'] != 'verified'], key=lambda r: r['word'])
FLAG = ['school', 'camp', 'law', 'horse', 'beach', 'gentle', 'magazine',
        'lunatic', 'coin', 'charge', 'doctor', 'light']
NV, NP = len(ver), len(pend)
assert all(any(r['word'] == w for r in ver) for w in FLAG), 'flagship not all verified'
unc = bank_total - NV - NP
assert unc == 195, unc

banksub = {}
for r in ver + pend:
    b = bank.get(r['word']) or bank.get(r['word'].lower())
    if b:
        banksub[r['word']] = {
            'phonetic': b.get('phonetic_gb') or b.get('phonetic') or '',
            'meaning': b.get('meaning', ''), 'pos': b.get('pos', ''),
            'emoji': b.get('emoji', '') or ''}
payload = {'verified': ver, 'pending': pend, 'bank': banksub,
           'flagship': FLAG, 'bankTotal': bank_total}
pj = json.dumps(payload, ensure_ascii=False).replace('</', '<\\/')

src = HTML.read_text(encoding='utf-8')
lines = src.split('\n')
hits = [i for i, ln in enumerate(lines) if ln.startswith('var D = {') and '"flagship"' in ln]
assert len(hits) == 1, f'payload line hits: {len(hits)}'
i = hits[0]
old = json.loads(lines[i][len('var D = '):-1])
print('old payload:', len(old['verified']), 'verified /', len(old['pending']), 'pending')
lines[i] = 'var D = ' + pj + ';'
out = '\n'.join(lines)

for a, b in [
    ('词源数据层：1816 已核 + 462 待核', f'词源数据层：{NV} 已核 + {NP} 待核'),
    ('1816 个词的身世档案 · 全部双源核实', f'{NV} 个词的身世档案 · 全部双源核实'),
    ('其余 462 个词按卡住的原因分五组如实标待核', f'其余 {NP} 个词按卡住的原因分五组如实标待核'),
    ('<span class="n">1816 词 · 双源核实 · 真模块</span>', f'<span class="n">{NV} 词 · 双源核实 · 真模块</span>'),
    ('词源区：1816 个词的身世档案', f'词源区：{NV} 个词的身世档案'),
]:
    assert out.count(a) == 1, f'copy hit != 1: {a[:24]} -> {out.count(a)}'
    out = out.replace(a, b)

HTML.write_text(out, encoding='utf-8')
chk = [ln for ln in out.split('\n') if ln.startswith('var D = {') and '"flagship"' in ln]
new = json.loads(chk[0][len('var D = '):-1])
school = next(r for r in new['verified'] if r['word'] == 'school')
print('new payload:', len(new['verified']), 'verified /', len(new['pending']), 'pending',
      '| school 原义:', school['original_meaning'], '| unc:', unc)
assert len(new['verified']) == NV and len(new['pending']) == NP
print('OK')
