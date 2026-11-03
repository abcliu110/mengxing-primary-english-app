"""parse_all.py —— 对已抓缓存跑 parse_etym 的 parse+verify，按词库全量输出 parsed_all.json。
键 = 词库 word 原值（'Sunday' 等保持原样）；抓取文件名由 fetch 的 fname() 决定（大小写保留）。"""
import json, re, pathlib, sys
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import parse_etym as P

C = pathlib.Path('/home/hatch/workspace/etym-work')
V = json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))
fn = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)
out = {}
for w in V:
    word = w['word'].strip()
    pw = C / 'wikt' / (fn(word) + '.txt')
    pe = C / 'etymo' / (fn(word) + '.txt')
    rec = {}
    if not pw.exists():
        rec = {'status': 'wikt_not_fetched'}
    else:
        wt = pw.read_text(encoding='utf-8')
        rec['wikt_empty'] = (len(wt.strip()) == 0)
        sec = P.etym_section(wt) if wt.strip() else ''
        rec['has_wikt_ety'] = bool(sec)
        r = P.parse(sec) if sec else {'chain': [], 'morph': None, 'cogs': [], 'raw': ''}
        rec.update(r)
        ety = pe.read_text(encoding='utf-8') if pe.exists() else None
        rec['etymo_fetched'] = ety is not None
        rec['etymo_empty'] = (ety is not None and len(ety.strip()) == 0)
        rec['verify'] = P.verify(word, r, ety or '')
        # 希腊站转写复核：希腊词形在 Etymonline 里以拉丁转写出现，逐字比对永远对不上属系统性误杀；
        # 用转写词干在 Etymonline 原文 'Greek' 附近窗口内复核，仍是「原文实存」标准，不降格。
        if ety and r['chain']:
            GR2LAT = {'ά': 'a', 'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'έ': 'e', 'ε': 'e', 'ζ': 'z', 'ή': 'e', 'η': 'e',
                      'θ': 'th', 'ί': 'i', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ό': 'o', 'ο': 'o',
                      'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'ύ': 'y', 'υ': 'y', 'φ': 'ph', 'χ': 'kh', 'ψ': 'ps',
                      'ώ': 'o', 'ω': 'o'}
            def _tr(f):
                s = ''.join(GR2LAT.get(ch, ch) for ch in f.lower())
                s = s.replace('gg', 'ng')                    # γγ → ng（如 angelos）
                s = re.sub(r'g(?=kh|k|x)', 'n', s)           # γ 在颚音前读 n（συγχ- → synkh-）
                return re.sub(r'[^a-z]', '', s)
            ok = rec['verify'].get('chain_ok', 0)
            while ok < len(r['chain']):
                _t, lc, form, _g = r['chain'][ok]
                if lc not in ('grc', 'el'): break
                stem = _tr(form)
                stem = stem[:-2] if len(stem) > 6 else stem
                hit = False
                if len(stem) >= 5:
                    tt = re.sub(r'[^A-Za-z ]', ' ', ety)
                    for m in re.finditer(r'\bGreek\b', tt):
                        if stem in re.sub(r'[^a-z]', '', tt[m.start():m.start() + 90].lower()): hit = True; break
                if hit: ok += 1
                else: break
            rec['verify']['chain_ok'] = ok
    out[word] = rec
json.dump(out, open(C / 'parsed_all.json', 'w'), ensure_ascii=False)
n = len(out)
fetched_w = sum(1 for r in out.values() if r.get('status') != 'wikt_not_fetched')
has_ety = sum(1 for r in out.values() if r.get('has_wikt_ety'))
ety_f = sum(1 for r in out.values() if r.get('etymo_fetched'))
ver = sum(1 for r in out.values() if r.get('verify', {}).get('chain_ok', 0) >= 1)
ver2 = sum(1 for r in out.values() if r.get('verify', {}).get('chain_ok', 0) >= 2)
morph = sum(1 for r in out.values() if r.get('verify', {}).get('morph_ok'))
print(f'total {n} | wikt fetched {fetched_w} | has wikt etym section {has_ety} | etymo fetched {ety_f} | chain_ok>=1 {ver} | chain_ok>=2 {ver2} | morph_ok {morph}')
