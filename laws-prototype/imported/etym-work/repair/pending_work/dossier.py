"""dossier.py - generate per-word dossiers (compact stdout).
Usage: python3 dossier.py word1 word2 ... | python3 dossier.py @listfile"""
import json, re, sys, pathlib
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import parse_etym as P

C = pathlib.Path('/home/hatch/workspace/etym-work')
W = C / 'repair' / 'pending_work'
FN = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)
WB = {w['word'].strip(): w for w in json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))}
SCREEN = json.load(open(W / 'screen.json'))
ETYMDB_L = {k.lower(): v for k, v in json.load(open(C / 'etym_db_625.json')).items()}
GM = json.load(open(C / 'gloss_map.json'))

ADJ = {}
for _f in (C / 'round2-stopped').glob('adj_*.json'):
    _d = json.load(open(_f))
    if isinstance(_d, dict):
        for _k, _v in _d.items():
            ADJ.setdefault(_k, _v)


def read(kind, key):
    p = C / kind / (FN(key) + '.txt')
    return p.read_text(encoding='utf-8') if p.exists() else None


def clean_wikt(sec):
    s = sec or ''
    s = re.sub(r'\{\{etymon[^}]*\}\}', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()


def get_wsec(key):
    t = read('wikt', key) or ''
    sec = P.etym_section(t)
    if not sec:
        m = re.search(r'^=+\s*Etymology[^=\n]*=+\s*\n(.*?)(?=^=+[^=])', t, re.S | re.M)
        sec = m.group(1) if m else ''
    return sec


def dossier(word):
    d = SCREEN.get(word)
    if not d:
        print('### ' + word + ' not in pending pool')
        return
    key = d['key']
    wb = WB.get(key, {})
    okpairs = [k for k, v in d['agree'].items() if v['ok']]
    print('### {} | {} | {} | freq={} dolch={} | orig_reason: {} | tier={} agree={} morph_agree={}'.format(
        word, wb.get('pos', ''), wb.get('meaning', ''), d['freq'], d['dolch'], d['reason'], d['tier'], okpairs, d['morph_agree']))
    for k, v in d['agree'].items():
        print('  [{}] ok={} a:{} b:{}'.format(k, v['ok'], v['a'], v['b']))
    print('  Wchain:', d['wikt_chain'], '| morph:', d['wikt_morph'], '| sections:', d['wikt_sections'])
    if d['in_db']:
        print('  DBchain:', ETYMDB_L[word]['c'])
    if word in ADJ:
        print('  R2chain:', [(s['lang'], s['form']) for s in ADJ[word].get('source_chain', [])], '| R2orig:', ADJ[word].get('original_meaning'))
    print('  Wtext:', clean_wikt(get_wsec(key))[:850])
    ety = read('etymo', key)
    if (not ety or not ety.strip()) and d.get('etymo_ref'):
        ety = read('etymo', d['etymo_ref'])
        print('  (etymo variant file: {})'.format(d['etymo_ref']))
    if ety and ety.strip():
        head = ety.split(' also from ')[0]
        print('  Etext:', re.sub(r'\s+', ' ', head)[:1250])
    else:
        print('  Etext: [none/empty]')
    ox = read('ox', key)
    if ox and len(ox.strip()) > 40:
        print('  Otext:', re.sub(r'\s+', ' ', ox)[:450])
    else:
        print('  Otext: [none/empty]')
    glosses = {g for _, _, g in d['wikt_chain'] if g}
    hits = {g: GM[g] for g in glosses if g in GM}
    if hits:
        print('  gloss_zh_known:', hits)
    print()


if __name__ == '__main__':
    words = []
    for a in sys.argv[1:]:
        if a.startswith('@'):
            words += [x.strip() for x in open(a[1:]) if x.strip()]
        else:
            words.append(a)
    for w in words:
        dossier(w)
