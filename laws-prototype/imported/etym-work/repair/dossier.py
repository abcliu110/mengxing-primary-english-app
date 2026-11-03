import json, re, sys, os
W = os.path.expanduser('~/workspace/etym-work')
data = json.load(open('/tmp/mengxing2/laws-prototype/model/etymology.json'))
by = {r['word']: r for r in data}
try:
    wb = {w['word']: w for w in json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))}
except Exception:
    wb = {}

def wikt_etym(word):
    p = f'{W}/wikt/{word}.txt'
    if not os.path.exists(p): return '(no wikt file)'
    t = open(p, encoding='utf-8', errors='replace').read()
    # find English section first
    m = re.search(r'==English==', t)
    if m: t = t[m.start():]
    secs = []
    for mm in re.finditer(r'===+\s*Etymology[^=]*===+', t):
        start = mm.end()
        nxt = re.search(r'\n===+[^=]', t[start:])
        end = start + nxt.start() if nxt else len(t)
        secs.append(t[start:end].strip())
    if not secs: return '(no Etymology section found)'
    return '\n---\n'.join(s[:1800] for s in secs[:3])

def rd(path):
    if not os.path.exists(path): return '(missing)'
    return open(path, encoding='utf-8', errors='replace').read().strip()

for word in sys.argv[1:]:
    r = by.get(word)
    print('='*90)
    print(f'WORD: {word}')
    if word in wb:
        print('BANK meaning:', wb[word].get('meaning'), '| pos:', wb[word].get('pos'))
    if not r:
        print('NO RECORD'); continue
    print('orig:', r['original_meaning'])
    print('path:')
    for s in r['semantic_path']:
        print(f"  - [{s['period']}] {s['meaning']} || how: {s['how']}")
    print('mech:', r['mechanism_sentence'])
    print('chain:', ' <- '.join(f"{c['lang']}:{c['form']}({c['gloss']})" for c in r['source_chain']))
    print('disputes:', str(r.get('disputes'))[:200])
    print('--- ETYMO ---')
    print(rd(f'{W}/etymo/{word}.txt')[:3500])
    print('--- WIKT ETYM ---')
    print(wikt_etym(word))
    print('--- OX ---')
    print(rd(f'{W}/ox/{word}.txt')[:700])
