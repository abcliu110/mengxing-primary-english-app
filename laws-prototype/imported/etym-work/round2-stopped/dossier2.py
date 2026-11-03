import json, sys
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import build_records as B

wb = {w['word']: w for w in json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))}
for w in sys.argv[1:]:
    p = B.PARSED.get(w, {})
    chain = [(s[1], s[2], s[3] if len(s) > 3 else '') for s in (p.get('chain') or [])]
    print('=' * 90)
    print(f"### {w} | bank: {wb[w]['pos']} {wb[w]['meaning']} freq={wb[w]['freq_rank']}")
    print(f"    parsed chain={chain} ok={p.get('chain_ok')} morph={p.get('morph')} morph_ok={p.get('morph_ok')}")
    print('--- etymo:', (B.read_cache('etymo', w) or '')[:700].replace('\n', ' '))
    print('--- ox:', (B.read_cache('ox', w) or '')[:320].replace('\n', ' '))
    print('--- wikt:', (B.wikt_etym_raw(w) or '')[:520].replace('\n', ' '))
