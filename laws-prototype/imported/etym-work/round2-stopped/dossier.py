"""裁断卷宗：打印一个词的三套原文关键部分 + 词库义项 + 当前记录，供人工裁断。
用法：python3 /tmp/dossier.py word1 word2 ..."""
import json, re, sys, pathlib
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import parse_etym as P
C = pathlib.Path('/home/hatch/workspace/etym-work')
FN = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)
wb = {w['word']: w for w in json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))}
et = {r['word']: r for r in json.load(open('/tmp/mengxing2/laws-prototype/model/etymology.json'))}
parsed = json.load(open(C / 'parsed_all.json'))
for w in sys.argv[1:]:
    key = next((k for k in wb if k.lower() == w.lower()), w)
    print('=' * 90)
    print(f"### {key} | bank: pos={wb.get(key,{}).get('pos')} meaning={wb.get(key,{}).get('meaning')} freq={wb.get(key,{}).get('freq_rank')} dolch={wb.get(key,{}).get('dolch')}")
    r = et.get(key.lower()) or et.get(key)
    if r: print(f"    current: {r['status']} {r.get('pending_reason','')[:110]}")
    pr = parsed.get(key, {})
    print(f"    parsed: chain={[(c[1], c[2]) for c in pr.get('chain', [])]} chain_ok={pr.get('verify',{}).get('chain_ok')} morph={pr.get('morph')} morph_ok={pr.get('verify',{}).get('morph_ok')}")
    for kind, limit in (('etymo', 1100), ('ox', 500)):
        p = C / kind / (FN(key) + '.txt')
        t = p.read_text(encoding='utf-8') if p.exists() else '(no file)'
        print(f"--- {kind}: {t[:limit]}")
    p = C / 'wikt' / (FN(key) + '.txt')
    sec = P.etym_section(p.read_text(encoding='utf-8')) if p.exists() else '(no file)'
    print(f"--- wikt etym: {sec[:1100]}")
