"""assemble.py - turn authored specs into full verified records.
Spec per word (authored by hand from dossiers):
  chain: [(lang, form, gloss_zh, period), ...] old->new
  fa: first_attested str
  orig: original_meaning (must == path[0] meaning)
  path: [(meaning, period, how), ...]  (first how auto-set)
  mech, link, disp, folk: strings
  srcs: ordered list among 'ox','et','wk'
  grade: full evidence_grade string
Output: promoted dict merged into out_promoted.json; reasons into out_reasons.json.
"""
import json, re, sys, pathlib
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import build_records as BR

C = pathlib.Path('/home/hatch/workspace/etym-work')
W = C / 'repair' / 'pending_work'
WB = {w['word'].strip(): w for w in json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))}
ETYMDB_L = {k.lower(): v for k, v in json.load(open(C / 'etym_db_625.json')).items()}
DATA = {r['word']: r for r in json.load(open('/tmp/mengxing2/laws-prototype/model/etymology.json'))}

GRADES = {
    'ox_et': '一级＋二级双源互证（牛津大学出版社词源栏 × Etymonline，Wiktionary 旁证；待 OED 复核）',
    'et_wk_ox': '二级双源互证（Etymonline × Wiktionary，牛津词源栏说法太简、仅作旁证；待一级复核）',
    'et_wk': '二级双源互证（Etymonline × Wiktionary；待一级复核）',
    'ox_wk': '一级＋三级互证（牛津大学出版社词源栏 × Wiktionary；待 Etymonline 复核）',
    'ox_et_nowk': '一级＋二级双源互证（牛津大学出版社词源栏 × Etymonline；待 OED 复核）',
}


def src_objs(word, key, srcs):
    low = word
    slug = ETYMDB_L[low]['e'] if low in ETYMDB_L else low.replace(' ', '-').replace("'", '')
    pool = {
        'ox': {'name': 'Oxford Learner\u2019s Dictionaries（牛津大学出版社）',
               'detail': key + ' 词条 Word Origin 栏',
               'url': 'https://www.oxfordlearnersdictionaries.com/definition/english/' + low.replace("'", '')},
        'et': {'name': 'Etymonline',
               'detail': slug + ' 词条（经 Wayback Machine 存档读取）',
               'url': 'https://www.etymonline.com/word/' + slug},
        'wk': {'name': 'Wiktionary',
               'detail': key + ' 词条 Etymology 小节',
               'url': 'https://en.wiktionary.org/wiki/' + key.replace(' ', '_')},
    }
    return [pool[s] for s in srcs]


def auto_hooks(spec, mh):
    chain = spec['chain']
    hooks = []
    lang0, form0, gloss0 = chain[0][0], chain[0][1], chain[0][2]
    hooks.append('最远能追到' + lang0 + '的 ' + form0 + ('，意思是「' + gloss0 + '」' if gloss0 else ''))
    last = chain[-1]
    if last[0] in ('Middle English', 'Old English'):
        hooks.append('英语最早用的词形是' + last[0] + '的 ' + last[1])
    else:
        hooks.append('来源链在英语这一侧没有更早的词形记录，它直接来自' + last[0] + '的 ' + last[1])
    meanings = [p[0] for p in spec['path']] + [mh]
    distinct = list(dict.fromkeys(meanings))
    orig = spec['path'][0][0]
    if len(distinct) > 1:
        hooks.append('最早的意思「' + orig + '」和今天的意思「' + mh + '」差得挺远，中间变了 ' + str(len(distinct) - 1) + ' 次')
    else:
        hooks.append('最早的意思「' + orig + '」和今天的意思「' + mh + '」基本一样，是意思保持得很稳的老词')
    mids = [c[0] for c in chain[1:-1]]
    if mids:
        hooks.append('先经过' + '、'.join(dict.fromkeys(mids)) + '，才传进英语')
    return hooks


def build(word, spec):
    key = DATA[word]['wordbank_key']
    wb = WB.get(key, {})
    mh = BR.modern_head(wb.get('meaning', ''))
    chain = [{'lang': l, 'form': f, 'gloss': g, 'period': p} for (l, f, g, p) in spec['chain']]
    path = []
    for i, (m, per, how) in enumerate(spec['path']):
        path.append({'meaning': m, 'period': per, 'how': '最早见载的意思' if i == 0 else how})
    rec = {'word': word, 'wordbank_key': key, 'source_chain': chain,
           'first_attested': spec['fa'], 'original_meaning': spec['orig'],
           'semantic_path': path, 'mechanism_sentence': spec['mech'],
           'modern_meanings_link': spec['link'],
           'story_hooks': spec.get('hooks') or auto_hooks(spec, mh),
           'sources': src_objs(word, key, spec['srcs']),
           'evidence_grade': GRADES[spec['grade']] if spec['grade'] in GRADES else spec['grade'],
           'disputes': spec['disp'], 'folk_etymology_check': spec['folk'],
           'status': 'verified'}
    assert rec['original_meaning'] == path[0]['meaning'], word + ': orig != path[0]'
    return rec


def merge(promoted, reasons):
    pf = W / 'out_promoted.json'
    rf = W / 'out_reasons.json'
    P = json.load(open(pf)) if pf.exists() else {}
    R = json.load(open(rf)) if rf.exists() else {}
    P.update(promoted)
    R.update(reasons)
    json.dump(P, open(pf, 'w'), ensure_ascii=False, indent=1)
    json.dump(R, open(rf, 'w'), ensure_ascii=False, indent=1)
    print('promoted total:', len(P), '| reasons total:', len(R))
