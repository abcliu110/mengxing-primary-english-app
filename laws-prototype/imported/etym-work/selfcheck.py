"""selfcheck.py —— 交付前 20% 抽查：高危字段与所引原文逐项机检。
机检三项（对每个抽中 verified 记录）：
 A) first_attested 若声称引 Etymonline 原文记法，该记法 token 必须真实出现在该词 Etymonline 原文里；
 B) source_chain 最深一站的词形，必须能在 Etymonline 原文或牛津词源栏里找到（跨源实存）；
 C) original_meaning 必须能回溯到来源链某站 gloss 的中译，或 Etymonline 引首释义的中译（重算比对）。
另强制纳入校准词与民间词源点名词。人工通读清单另行打印。"""
import json, re, pathlib, sys, unicodedata, random
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import build_records as B

C = pathlib.Path('/home/hatch/workspace/etym-work')
D = json.load(open(C / 'etymology_draft.json'))
VER = [r for r in D if r['status'] == 'verified']
random.seed(20261102)
sample = VER[::5]
force = {'school', 'play', 'charge', 'light', 'posh', 'golf', 'news', 'coach', 'window', 'computer'}
sample += [r for r in VER if r['word'] in force and r not in sample]
print(f'verified total {len(VER)} | sampled {len(sample)} ({len(sample)/max(len(VER),1):.0%})')

fails = []
def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return s.replace('æ', 'ae').replace('þ', 'th').replace('ð', 'th').lower()

for r in sample:
    w = r['wordbank_key']
    ety = B.read_cache('etymo', w) or ''
    ox = B.read_cache('ox', w) or ''
    # A
    m = re.search(r'原文记作 ([^）]+)', r['first_attested'])
    if m and m.group(1) not in ety:
        fails.append((r['word'], 'A-first_attested-token', m.group(1)))
    # B
    deep = r['source_chain'][0]
    f = norm(deep['form']).strip('*').strip('-')
    found = len(f) >= 3 and (f in norm(ety) or f in norm(ox))
    if not found and any('Ͱ' <= ch <= 'ώ' for ch in deep['form']):
        # 希腊词形：按转写词干在原文里核（与 parse_all 的希腊复核同一口径）
        GR2LAT = {'ά': 'a', 'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'έ': 'e', 'ε': 'e', 'ζ': 'z', 'ή': 'e', 'η': 'e',
                  'θ': 'th', 'ί': 'i', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ό': 'o', 'ο': 'o',
                  'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'ύ': 'y', 'υ': 'y', 'φ': 'ph', 'χ': 'kh', 'ψ': 'ps', 'ώ': 'o', 'ω': 'o'}
        s = ''.join(GR2LAT.get(ch, ch) for ch in deep['form'].lower()).replace('gg', 'ng')
        s = re.sub(r'g(?=kh|k|x)', 'n', s)
        stem = re.sub(r'[^a-z]', '', s)
        stem = stem[:-2] if len(stem) > 6 else stem
        found = len(stem) >= 4 and (stem in norm(ety).replace(' ', '') or stem in norm(ox).replace(' ', ''))
    if not found:
        srcdb = B.ETYMDB_L.get(r['word'])
        if not (srcdb and any(norm(x[1]).strip('*') == f for x in srcdb['c'])):
            fails.append((r['word'], 'B-deepest-form', deep['form']))
    # C
    chain_zhs = {s['gloss'] for s in r['source_chain'] if s['gloss']}
    eg = B.etymo_entry_gloss(ety)
    eg_zh = B.GM.get(eg) if eg else None
    sfg_zh = None
    if len(r['source_chain']) == 1 and ety:
        form0 = r['source_chain'][0]['form']
        cands = [form0]
        GR2LAT = {'ά': 'a', 'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'έ': 'e', 'ε': 'e', 'ζ': 'z', 'ή': 'e', 'η': 'e',
                  'θ': 'th', 'ί': 'i', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ό': 'o', 'ο': 'o',
                  'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'ύ': 'y', 'υ': 'y', 'φ': 'ph', 'χ': 'kh', 'ψ': 'ps', 'ώ': 'o', 'ω': 'o'}
        s = ''.join(GR2LAT.get(ch, ch) for ch in form0.lower()).replace('gg', 'ng')
        s = re.sub(r'g(?=kh|k|x)', 'n', s)
        full = re.sub(r'[^a-z]', '', s)
        if full != form0: cands.append(full)
        if len(full) > 6: cands.append(full[:-2])
        for cand in cands:
            if len(cand) < 4: continue
            mm = re.search(re.escape(cand) + r'[a-z]*\s*"([^"]{2,70})"', ety[:1200])
            if mm: sfg_zh = B.GM.get(mm.group(1).strip()); break
    if r['original_meaning'] not in chain_zhs and r['original_meaning'] != eg_zh and r['original_meaning'] != sfg_zh:
        fails.append((r['word'], 'C-original-meaning', r['original_meaning'][:40]))

print('machine-check FAILS:', len(fails))
for f in fails[:40]: print(' ', f)
json.dump(fails, open(C / 'selfcheck_fails.json', 'w'), ensure_ascii=False, indent=1)
