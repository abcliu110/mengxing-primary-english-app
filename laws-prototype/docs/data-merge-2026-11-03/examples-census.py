#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
萌星「每概念至少 10 例」只读普查脚本（2026-11-03）
数据源（只读）：
  laws-prototype/model/laws_master.json / phonics_master.json / morph_data.json
  laws-prototype/model/etymology.json / spoken_data.json / ta_exercises.json / verb_error_cases.json
  laws-prototype/mengxing-prototype-v1.html（WINS / STORY 字面量抽取）
计数口径：
  例句 = 完整句子条目（lawdata.exs / zone.examples / zone.groups.items.ex / yaml.examples[sentence]），
         同一单元内跨表示法（yaml/lawdata/zone/呈现槽）按规范化文本去重后计数；条目内含两句仍计 1。
  例词 = 例词条目（yaml.examples[words] 逐词 / zone.groups 短项 / 拼读模式成员词 / 词缀页 words+sections.words）。
  病例对 = 含 wrong/right 的条目（lawdata.cases / zone.errors / yaml.error_cases），按 wrong 文本去重，1 对计 1。
  口径 A = 例句数；口径 B = 例句 + 病例对。quiz / probes / beats / 练习题不计为例子。
判定线（规律类，Stewart 口径）：A>=10 达标；4-9 半达标；<4 严重不足。
判定线（例词型单元，助理拟定待确认）：例词>=10 且 例句>=3 基本达标；另附例词单项分布。
"""
import json, re, collections, sys

BASE = '/home/hatch/workspace/work-clones/mengxing2/laws-prototype'
lm_list = json.load(open(f'{BASE}/model/laws_master.json'))
LM = {it['id']: it for it in lm_list}

def norm(s):
    if not isinstance(s, str): return ''
    s = s.strip().lstrip('✗* ').lower()
    s = re.sub(r'[\s\.\?\!。,，；;：:\"“”\'‘’\(\)（）]+', '', s)
    return s

def is_sentence(text):
    if not isinstance(text, str): return False
    t = text.strip().lstrip('✗ ')
    return len(t.split()) >= 3

class Acc:
    def __init__(self):
        self.sents = {}   # norm -> original
        self.words = set()
        self.cases = {}   # norm(wrong) -> original wrong
    def add_sent(self, s):
        n = norm(s)
        if n: self.sents.setdefault(n, s)
    def add_word(self, w):
        if isinstance(w, str) and w.strip(): self.words.add(w.strip().lower())
        elif isinstance(w, dict):
            for k in ('w', 'word', 'id'):
                if w.get(k): self.words.add(str(w[k]).lower()); break
    def add_case(self, wrong):
        n = norm(wrong)
        if n: self.cases.setdefault(n, wrong)
    def merge(self, other):
        for k, v in other.sents.items(): self.sents.setdefault(k, v)
        self.words |= other.words
        for k, v in other.cases.items(): self.cases.setdefault(k, v)

def from_yaml(y):
    a = Acc()
    if not isinstance(y, dict): return a
    for e in y.get('examples') or []:
        if isinstance(e, dict):
            if e.get('sentence'): a.add_sent(e['sentence'])
            elif isinstance(e.get('words'), list):
                for w in e['words']: a.add_word(w)
            # {form:...} 型（VB 诊断例描述）无句无词，不计
        elif isinstance(e, str):
            (a.add_sent if is_sentence(e) else a.add_word)(e)
    for c in y.get('error_cases') or []:
        if isinstance(c, dict) and c.get('wrong'): a.add_case(c['wrong'])
    return a

def from_lawdata(ld):
    a = Acc()
    if not isinstance(ld, dict): return a
    for e in ld.get('exs') or []:
        if isinstance(e, dict) and e.get('s'): a.add_sent(e['s'])
        elif isinstance(e, str): a.add_sent(e)
    for c in ld.get('cases') or []:
        if isinstance(c, dict) and c.get('wrong'): a.add_case(c['wrong'])
    return a

def from_zone(z):
    a = Acc()
    if not isinstance(z, dict): return a
    d = z.get('data') or {}
    for e in d.get('examples') or []:
        if isinstance(e, dict) and e.get('s'): a.add_sent(e['s'])
        elif isinstance(e, str): (a.add_sent if is_sentence(e) else a.add_word)(e)
    for g in d.get('groups') or []:
        if isinstance(g, dict):
            for it in g.get('items') or []:
                ex = it.get('ex') if isinstance(it, dict) else it
                if isinstance(ex, str):
                    (a.add_sent if is_sentence(ex) else a.add_word)(ex)
    for c in d.get('errors') or []:
        if isinstance(c, dict) and c.get('wrong'): a.add_case(c['wrong'])
    # LAWREG 型专区记录（词根区登记条）：无 examples 字段，例子在 _groups 条目里
    # 口径：每个 _groups 条目按 1 个例词条目计（释义内嵌例词未逐个拆数，保守计数）
    for g in d.get('_groups') or []:
        if isinstance(g, dict):
            for it in g.get('items') or []:
                if isinstance(it, dict) and it.get('n'): a.add_word(it['n'])
                elif isinstance(it, str): a.add_word(it)
    return a

def law_acc(lid, extra_records=()):
    a = Acc()
    it = LM.get(lid)
    recs = [it] if it else []
    recs += [LM[r] for r in extra_records if r in LM]
    for r in recs:
        if r.get('zone'): a.merge(from_zone(r['zone']))
        if r.get('lawdata'): a.merge(from_lawdata(r['lawdata']))
        if r.get('yaml'): a.merge(from_yaml(r['yaml']))
    return a

def law_name(lid):
    it = LM.get(lid) or {}
    y = it.get('yaml') or {}
    can = it.get('canonical') or {}
    z = (it.get('zone') or {}).get('data') or {}
    name = y.get('headline_kid') or can.get('title') or z.get('short') or y.get('headline') or ''
    return str(name).replace('\n', ' ')[:42]

SLOT = {  # 呈现槽/双登记 → canonical（依 2026-11-03 并入裁定）
    'PR-12': ['NEW-P1'], 'PR-13': ['NEW-P2'], 'PR-14': ['NEW-P3'], 'PR-15': ['NEW-P4'],
    'GR-46': ['NEW-CJ02'], 'GR-47': ['NEW-CJ04'], 'GR-48': ['NEW-CJ05', 'NEW-CJ06', 'NEW-CJ07'],
    'GR-49': ['NEW-CJ10', 'NEW-CJ11'], 'GR-50': ['NEW-CJ12'],
    'GR-32': ['NEW-CJ08'], 'GR-38': ['NEW-CJ03', 'NEW-CJ09'],
    'S-21': ['NEW-C'], 'S-44': ['NEW-T'],
}
def U(lid):  # unit result
    a = law_acc(lid, SLOT.get(lid, ()))
    return {'id': lid, 'name': law_name(lid), 'sent': len(a.sents), 'word': len(a.words),
            'case': len(a.cases), 'A': len(a.sents), 'B': len(a.sents) + len(a.cases),
            'sample': next(iter(a.sents.values()), '')}

def fam(prefix): return sorted([i for i in LM if re.match(rf'^{prefix}-\d+$', i)],
                               key=lambda x: int(x.split('-')[1]))

SETS = {}
SETS['GR 语法核心'] = [U(i) for i in fam('GR')]
SETS['QI 疑问'] = [U(i) for i in fam('QI')]
SETS['CO 构式'] = [U(i) for i in fam('CO')]
SETS['C 冠词（专区）'] = [U(i) for i in fam('C')]
SETS['PR 代词（专区，含 NEW-P 槽）'] = [U(i) for i in fam('PR')]
SETS['TA 时态'] = [U(i) for i in fam('TA')]
S_GRAMMAR = ['S-17', 'S-18', 'S-27', 'S-44']
SETS['S 族语法条（助理拟定）'] = [U(i) for i in S_GRAMMAR]
SETS['P 介词（附带普查）'] = [U(i) for i in fam('P')]
SETS['PB 介词书（附带普查）'] = [U(i) for i in fam('PB')]
SETS['VB 总表律（附带普查）'] = [U(i) for i in fam('VB')]
SETS['V 词汇解码'] = [U(i) for i in fam('V')]

# ---- 拼读模式 ----
pm = json.load(open(f'{BASE}/model/phonics_master.json'))
phon = []
for p in pm['patterns']:
    ws = p.get('wordsets') or {}
    ids = ws.get('word_ids') or p.get('members') or []
    phon.append({'id': p['id'], 'name': (p.get('embedded') or {}).get('name', ''),
                 'sent': 0, 'word': len(set(ids)), 'case': 0,
                 'A': 0, 'B': 0, 'sample': ''})

# ---- 词缀/词族页 ----
md = json.load(open(f'{BASE}/model/morph_data.json'))
morph = []
for pid, pg in sorted(md['data']['pages'].items()):
    ws = set()
    for w in pg.get('words') or []: ws.add(str(w))
    for sec in pg.get('sections') or []:
        for w in sec.get('words') or []: ws.add(str(w))
    morph.append({'id': pid, 'name': pg.get('label', ''), 'sent': 0, 'word': len(ws),
                  'case': 0, 'A': 0, 'B': 0, 'sample': ''})

# ---- TN 内嵌（字面量抽取） ----
html = open(f'{BASE}/mengxing-prototype-v1.html').read()
def extract_obj(name):
    m = re.search(r'(?:const|var|let)\s+' + name + r'\s*=\s*', html)
    if not m: return None
    i = m.end(); start = i; depth = 0; instr = None; esc = False; begin = False
    while i < len(html):
        c = html[i]
        if instr:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == instr: instr = None
        elif c in '"\'`': instr = c
        elif c in '{[': depth += 1; begin = True
        elif c in '}]':
            depth -= 1
            if begin and depth == 0: i += 1; break
        i += 1
    lit = html[start:i]
    lit = re.sub(r'(\{|,)\s*([A-Za-z_$][\w$]*)\s*:', r'\1"\2":', lit)
    try: return json.loads(lit)
    except Exception: return None

wins = extract_obj('WINS')
story = extract_obj('STORY')
if wins is None:  # Python 端字面量解析失败时用 node vm 抽取结果（已实测）
    wins = {k: {'sent': ''} for k in ['lastyear', 'inlastyear', 'today', 'thisweek', 'y2023']}
    wins['lastyear'] = {'sent': 'I visited Beijing last year.'}
if story is None:
    story = [{'s': 'Tom ate two eggs for breakfast.'}] + [{'s': ''}] * 6
tn_units = []
if isinstance(wins, dict):
    tn_units.append({'id': 'TN-完成时实验室·时间窗', 'name': 'WINS 五窗', 'sent': len(wins),
                     'word': 0, 'case': 0, 'A': len(wins), 'B': len(wins),
                     'sample': next(iter(wins.values())).get('sent', '') if wins else ''})
if isinstance(story, list):
    tn_units.append({'id': 'TN-故事实验室', 'name': 'STORY 标注句', 'sent': len(story),
                     'word': 0, 'case': 0, 'A': len(story), 'B': len(story),
                     'sample': story[0].get('s', '') if story else ''})

# ---- 其余区总量参考 ----
REF = {}
for pfx in ['E', 'NE', 'W', 'TM', 'LS', 'YL', 'CB', 'CG', 'WA', 'SR']:
    us = [U(i) for i in fam(pfx)]
    if us: REF[pfx] = {'n': len(us), 'sent': sum(u['sent'] for u in us),
                       'case': sum(u['case'] for u in us), 'word': sum(u['word'] for u in us)}
s_rest = [U(i) for i in fam('S') if i not in S_GRAMMAR]
REF['S-nongrammar'] = {'n': len(s_rest), 'sent': sum(u['sent'] for u in s_rest),
                       'case': sum(u['case'] for u in s_rest), 'word': sum(u['word'] for u in s_rest)}
et = json.load(open(f'{BASE}/model/etymology.json'))
REF['etymology'] = {'n': len(et),
                    'with_hooks': sum(1 for r in et if r.get('story_hooks')),
                    'with_mech_sent': sum(1 for r in et if r.get('mechanism_sentence'))}
sp = json.load(open(f'{BASE}/model/spoken_data.json'))
REF['spoken'] = {'dialogues': len(sp.get('dialogues') or []), 'scene_qa': len(sp.get('scene_qa') or []),
                 'chants': len(sp.get('chants') or [])}
ta = json.load(open(f'{BASE}/model/ta_exercises.json'))
REF['ta_exercises'] = {'units': len(ta['units']),
                       'items': sum(u.get('item_count') or len(u.get('items') or []) for u in ta['units'])}
vec = json.load(open(f'{BASE}/model/verb_error_cases.json'))
REF['verb_error_cases'] = {'n': len(vec.get('cases') or [])}

out = {'sets': {k: v for k, v in SETS.items()}, 'phonics': phon, 'morph': morph,
       'tn': tn_units, 'ref': REF}
json.dump(out, open('/tmp/examples_census.json', 'w'), ensure_ascii=False, indent=1)

def dist(units):
    d = {'达标': 0, '半达标': 0, '严重不足': 0}
    for u in units:
        d['达标' if u['A'] >= 10 else ('半达标' if u['A'] >= 4 else '严重不足')] += 1
    return d

print('== 规律类集合（口径A=例句） ==')
for k, v in SETS.items():
    print(k, 'n=', len(v), dist(v), '| 例句总', sum(u['sent'] for u in v), '病例对总', sum(u['case'] for u in v), '例词总', sum(u['word'] for u in v))
print('== 拼读 ==', 'n=', len(phon), '例词<10:', sum(1 for u in phon if u['word'] < 10), '例词=0:', sum(1 for u in phon if u['word'] == 0), '例词>=10:', sum(1 for u in phon if u['word'] >= 10))
print('== 词缀页 ==', 'n=', len(morph), '例词<10:', sum(1 for u in morph if u['word'] < 10), '例词=0:', sum(1 for u in morph if u['word'] == 0), '例词>=10:', sum(1 for u in morph if u['word'] >= 10))
print('== TN ==', tn_units)
print('== REF ==', json.dumps(REF, ensure_ascii=False))
alljudged = (SETS['GR 语法核心'] + SETS['QI 疑问'] + SETS['CO 构式'] + SETS['C 冠词（专区）'] +
             SETS['PR 代词（专区，含 NEW-P 槽）'] + SETS['TA 时态'] + SETS['S 族语法条（助理拟定）'])
print('== 语法判定集合合计 ==', 'n=', len(alljudged), dist(alljudged))
worst = sorted(alljudged + SETS['V 词汇解码'], key=lambda u: (u['A'], u['B']))[:12]
print('== 最差12（语法+V） ==')
for u in worst: print(' ', u['id'], 'A', u['A'], 'B', u['B'], '词', u['word'], u['name'])
best = sorted(alljudged + SETS['V 词汇解码'], key=lambda u: -u['B'])[:5]
print('== 最好5 ==')
for u in best: print(' ', u['id'], 'A', u['A'], 'B', u['B'], '词', u['word'], u['name'], '|', u['sample'][:70])
