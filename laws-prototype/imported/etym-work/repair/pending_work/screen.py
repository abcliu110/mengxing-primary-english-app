"""screen.py —— 待核池主干一致筛查。
对每个待核词从三套缓存抽「主干」：来源语言组序列（新→旧）、最深历史词形、首站锚点；
按主干一致口径做两两比对（wikt×etymo / wikt×ox / etymo×ox），输出分层与诊断。
只读缓存与 etymology.json，结果写 screen.json。"""
import json, re, sys, pathlib, unicodedata, collections
sys.path.insert(0, '/home/hatch/workspace/etym-work')
import parse_etym as P

C = pathlib.Path('/home/hatch/workspace/etym-work')
W = C / 'repair' / 'pending_work'
FN = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)

WB = {w['word'].strip(): w for w in json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))}
DATA = json.load(open('/tmp/mengxing2/laws-prototype/model/etymology.json'))
ETYMDB_L = {k.lower(): v for k, v in json.load(open(C / 'etym_db_625.json')).items()}
ADJ = set()
for f in (C / 'round2-stopped').glob('adj_*.json'):
    d = json.load(open(f))
    if isinstance(d, dict): ADJ.update(d.keys())

import build_records as BR
LANG_GROUP = dict(BR.LANG_GROUP)
LANG_GROUP.update({'ine-pro': 'PIE', 'frk': 'Frankish', 'itc-pro': 'Proto-Italic', 'fro-nor': 'French',
                   'roa-oit': 'Italian', 'fa-cls': 'Persian', 'peo': 'Persian', 'pal': 'Persian',
                   'la-eme': 'Latin', 'la-cla': 'Latin', 'la-ren': 'Latin', 'ltc': 'Latin',
                   'osx': 'Old Saxon', 'ang-ang': 'Old English', 'cel-pro': 'Proto-Celtic',
                   'ms': 'Malay', 'nan-hbl': 'Chinese', 'tnq': 'Tarahumara', 'rom': 'Romani',
                   'nci': 'Nahuatl', 'oc-pro-old': 'Provençal', 'sco': 'Scots', 'gd': 'Scottish Gaelic',
                   'mga': 'Old Irish', 'gkm': 'Greek', 'gmw-msc': 'Middle Low German', 'xno,fro,frm': 'French',
                   'lng': 'Lombardic', 'itc-ola': 'Proto-Italic'})
LANG_EN = BR.LANG_EN

# 英文语言名 → 组（供 etymo/ox 文本扫描）
NAME2GROUP = {}
for code, name in LANG_EN.items():
    g = LANG_GROUP.get(code)
    if g: NAME2GROUP[name] = g
NAME2GROUP.update({'Proto-Indo-European': 'PIE', 'PIE': 'PIE', 'West Germanic': 'Proto-Germanic',
                   'Scandinavian': 'Old Norse', 'Anglo-French': 'French', 'Norse': 'Old Norse',
                   'Frankish': 'Frankish', 'Proto-Italic': 'Proto-Italic', 'Proto-Celtic': 'Proto-Celtic',
                   'Old Saxon': 'Old Saxon', 'Malay': 'Malay', 'Provençal': 'Provençal', 'Scots': 'Scots'})
EXTRA_NAMES = ['Proto-Indo-European', 'West Germanic', 'Proto-West Germanic', 'Vulgar Latin', 'Medieval Latin',
               'Modern Latin', 'Late Latin', 'Anglo-Norman', 'Anglo-French', 'Old North French', 'Middle French',
               'Middle Dutch', 'Middle Low German', 'Old High German', 'Old Saxon', 'Old Frisian', 'Old Irish',
               'Old Provençal', 'PIE', 'Scandinavian', 'Gaulish', 'Sanskrit', 'Arabic', 'Persian', 'Turkish',
               'Hebrew', 'Nahuatl', 'Chinese', 'Japanese', 'Hindi', 'Dutch', 'German', 'Italian', 'Spanish',
               'Portuguese', 'French', 'Greek', 'Latin', 'Old Norse', 'Old English', 'Middle English']
SCAN_NAMES = sorted(set(list(NAME2GROUP) + EXTRA_NAMES), key=len, reverse=True)
STOPFORM = {'the', 'a', 'an', 'word', 'words', 'century', 'source', 'form', 'also', 'see', 'in', 'of', 'to',
            'and', 'or', 'as', 'by', 'for', 'with', 'from', 'akin', 'cognate', 'cognates', 'related', 'root',
            'verb', 'noun', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'suffix', 'prefix'}

GR2LAT = {'ά': 'a', 'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'έ': 'e', 'ε': 'e', 'ζ': 'z', 'ή': 'e', 'η': 'e',
          'θ': 'th', 'ί': 'i', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ό': 'o', 'ο': 'o',
          'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'ύ': 'y', 'υ': 'y', 'φ': 'ph', 'χ': 'kh',
          'ψ': 'ps', 'ώ': 'o', 'ω': 'o', 'ᾱ': 'a', 'ī': 'i', 'ū': 'u', 'ā': 'a', 'ē': 'e', 'ō': 'o'}

def tr_gr(f):
    s = ''.join(GR2LAT.get(ch, ch) for ch in (f or '').lower()).replace('gg', 'ng')
    s = re.sub(r'g(?=kh|k|x)', 'n', s)
    return re.sub(r'[^a-z]', '', s)

def norm(s):
    return P.norm(s or '')

def read(kind, key):
    p = C / kind / (FN(key) + '.txt')
    return p.read_text(encoding='utf-8') if p.exists() else None

# ---------- Wiktionary 主干 ----------
def wikt_trunk(key):
    t = read('wikt', key)
    if t is None: return {'present': False}
    sec = P.etym_section(t)
    if not sec:
        # 词条把 Etymology 放在四级标题（Etymology 1 等）时，取第一个 Etymology 小节
        m = re.search(r'^=+\s*Etymology[^=\n]*=+\s*\n(.*?)(?=^=+[^=])', t, re.S | re.M)
        if m: sec = m.group(1)
    n_sections = len(re.findall(r'^=+\s*Etymology', t, re.M))
    if not sec:
        return {'present': True, 'has_sec': False, 'n_sections': n_sections, 'chain': [], 'morph': None, 'raw': ''}
    # 第一句链模板全量抽取（不限旧解析的 stop 规则）：取首段 + 必要时第二段
    paras = sec.split('\n\n')
    txt = paras[0]
    chain = extract_chain(txt)
    if len(chain) < 2 and len(paras) > 1 and 'Etymology' not in paras[1][:30]:
        chain2 = extract_chain(paras[1])
        if chain2 and (not chain or chain2[0][1] == chain[-1][1] or len(chain) < len(chain2)):
            chain = chain + [c for c in chain2 if c not in chain] if chain else chain2
    pr = P.parse(sec)
    return {'present': True, 'has_sec': True, 'n_sections': n_sections, 'chain': chain,
            'morph': pr.get('morph'), 'raw': pr.get('raw', '')[:400]}

def extract_chain(txt):
    out = []
    for pos_, name, a, kw in P.templates(txt):
        if name in P.CHAIN_T and len(a) >= 3:
            form = P.clean_form(a[2]) or (P.clean_form(a[3]) if len(a) > 3 else '')
            g = kw.get('t') or kw.get('gloss') or (a[4] if len(a) > 4 else '')
            g = re.sub(r'\[\[(?:[^|\]]*\|)?([^\]]*)\]\]', r'\1', g or '').strip()
            if form and form != '-':
                out.append((a[1], form, g))
        if name == 'etymon':
            # 树形链：:inh|enm:form 序列
            for arg in a:
                m = re.match(r':(inh|der|bor)\|([a-z\-]+):(.+)', arg or '')
                if m and not out:
                    out.append((m.group(2), P.clean_form(m.group(3)), ''))
    return out

# ---------- Etymonline / Oxford 主干 ----------
NAME_RE = re.compile(r'\b(' + '|'.join(re.escape(n) for n in SCAN_NAMES) + r')\s+(?:the\s+|word\s+)?(\*?)([^\s,;:"()\[\]]{2,})')

def text_trunk(text, limit=1500):
    """从词源原文头部抽 (语言名, 词形) 序列与首见年代提示。"""
    head = text[:limit]
    pairs = []
    for m in NAME_RE.finditer(head):
        name, star, form = m.group(1), m.group(2), m.group(3)
        f = form.strip('.,')
        if f.lower() in STOPFORM or any(ch.isdigit() for ch in f) or len(f) < 2: continue
        pairs.append((name, (star or '') + f))
    # 去重相邻同名
    return pairs

def groups_of_pairs(pairs):
    gs = []
    for name, _ in pairs:
        g = NAME2GROUP.get(name)
        if g and (not gs or gs[-1] != g): gs.append(g)
    return gs

def groups_of_chain(chain):
    gs = []
    for code, _, _ in chain:
        if code == 'enm': continue
        g = LANG_GROUP.get(code)
        if g and (not gs or gs[-1] != g): gs.append(g)
    return gs

def is_subseq(a, b):
    it = iter(b)
    return all(any(x == y for y in it) for x in a)

def backbone_ok(gw, ge):
    """(a) 主干语言序列一致性：首末组同 / 前缀相容（一家更深或更浅）/ 子序列 / 首末组互见。"""
    if not gw: return False, 'wikt无外语站'
    if not ge: return False, '对方无外语站'
    if gw[0] == ge[0] and gw[-1] == ge[-1]: return True, '首末组同'
    n = min(len(gw), len(ge))
    if gw[:n] == ge[:n]: return True, '前缀相容（深度异）'
    if is_subseq(gw, ge) or is_subseq(ge, gw): return True, '子序列'
    if gw[0] == ge[0] and gw[-1] in ge: return True, '首组同+末组见'
    if gw[-1] == ge[-1] and gw[0] in ge: return True, '末组同+首组见'
    return False, f'主干组序异 w={gw} e={ge}'

def form_in(form, text_norm, raw_text):
    f = norm(form).strip('-*')
    if len(f) >= 3 and f in text_norm: return True
    tg = tr_gr(form)
    if len(tg) >= 4 and tg in re.sub(r'[^a-z]', '', raw_text.lower()): return True
    if len(tg) > 6 and tg[:-2] in re.sub(r'[^a-z]', '', raw_text.lower()): return True
    return False

def gloss_overlap(gloss_en, text):
    if not gloss_en: return False
    words = [w for w in re.findall(r'[a-z]{4,}', gloss_en.lower()) if w not in
             ('with', 'from', 'that', 'this', 'which', 'also', 'used', 'meaning', 'sense', 'word', 'form')]
    tl = text.lower()
    return any(w in tl for w in words)

def deepest_ok(wchain, pairs, raw_text):
    """(b) 最深历史词形/gloss 一致性：在对方最深语言组那一层对词形。"""
    if not wchain: return False, '无链'
    if not pairs: return False, '对方无站'
    code, form, gloss = wchain[-1]
    tn = norm(raw_text)
    ogroup = NAME2GROUP.get(pairs[-1][0])
    if ogroup:
        same_level = [s for s in wchain if LANG_GROUP.get(s[0]) == ogroup]
        if same_level:
            c2, f2, g2 = same_level[-1]
            if form_in(f2, tn, raw_text): return True, f'同层({ogroup})词形见于对方原文'
            if norm(pairs[-1][1]).strip('*') == norm(f2).strip('*'): return True, '同层词形同'
            if gloss_overlap(g2, raw_text): return True, '同层组同+gloss呼应'
    if form_in(form, tn, raw_text): return True, '最深词形见于对方原文'
    eform = pairs[-1][1]
    if norm(eform).strip('*') == norm(form).strip('*'): return True, '最深词形同'
    if ogroup and ogroup == LANG_GROUP.get(code) and gloss_overlap(gloss, raw_text): return True, '最深组同+gloss呼应'
    return False, f'最深站异 w=({code},{form}) e={pairs[-1]}'

def pair_agree(wchain, pairs, raw_text):
    gw = groups_of_chain(wchain)
    ge = groups_of_pairs(pairs)
    a_ok, a_why = backbone_ok(gw, ge)
    b_ok, b_why = deepest_ok(wchain, pairs, raw_text)
    return (a_ok and b_ok), a_why, b_why, gw, ge

def main():
    out = {}
    for r in DATA:
        if r['status'] != '待核': continue
        word, key = r['word'], r['wordbank_key']
        wb = WB.get(key, {})
        wt = wikt_trunk(key)
        ety = read('etymo', key)
        ox = read('ox', key)
        ety_ref = None
        if ety:
            m = re.search(r'spelling of\s+([A-Za-z\-]+)', ety[:300])
            if m and len(ety.strip()) < 400:
                ety_ref = m.group(1)
                alt = read('etymo', ety_ref)
                if alt: ety = alt
        if (not ety or not ety.strip()) and key == key.lower():
            # 英美拼写变体互跟（centimetre→centimeter、organise→organize 等）
            cands = []
            w0 = key
            if w0.endswith('tre'): cands.append(w0[:-3] + 'ter')
            if w0.endswith('our'): cands.append(w0[:-3] + 'or')
            if w0.endswith('ise'): cands.append(w0[:-3] + 'ize')
            if w0.endswith('isation'): cands.append(w0[:-7] + 'ization')
            if w0.endswith('yse'): cands.append(w0[:-3] + 'yze')
            if w0.endswith('ogue'): cands.append(w0[:-4] + 'og')
            for cv in cands:
                alt = read('etymo', cv)
                if alt and alt.strip():
                    ety_ref, ety = cv, alt
                    break
        ety_head = ''
        if ety:
            ety_head = ety.split(' also from ')[0]
        # 同源词列举（cognates: ...）不是祖先站，抽站与词形证据都在该处截断
        ety_trim = re.split(r'cognat', ety_head, flags=re.I)[0] if ety_head else ''
        epairs = text_trunk(ety_trim) if ety_trim else []
        opairs = text_trunk(ox, 900) if ox else []
        wchain = wt.get('chain') or []
        diag = {'word': word, 'key': key, 'reason': r['pending_reason'].split('：')[0],
                'freq': wb.get('freq_rank'), 'dolch': wb.get('dolch'), 'meaning': wb.get('meaning', ''),
                'pos': wb.get('pos', ''), 'wikt_chain': wchain, 'wikt_morph': wt.get('morph'),
                'wikt_sections': wt.get('n_sections'), 'etymo_ref': ety_ref,
                'etymo_pairs': epairs, 'ox_pairs': opairs,
                'has_ety': bool(ety and ety.strip()), 'has_ox': bool(ox and ox.strip() and len(ox.strip()) > 40),
                'in_db': word in ETYMDB_L, 'in_adj': word in ADJ}
        agree = {}
        if wchain and epairs:
            ok, aw, bw, gw, ge = pair_agree(wchain, epairs, ety_trim)
            agree['we'] = {'ok': ok, 'a': aw, 'b': bw, 'gw': gw, 'ge': ge}
        if wchain and opairs:
            ok, aw, bw, gw, ge = pair_agree(wchain, opairs, ox)
            agree['wo'] = {'ok': ok, 'a': aw, 'b': bw, 'gw': gw, 'ge': ge}
        if epairs and opairs:
            ge, go = groups_of_pairs(epairs), groups_of_pairs(opairs)
            a_ok, a_why = backbone_ok(ge, go) if ge and go else (False, '一侧无组序')
            eform = norm(epairs[-1][1]).strip('*') if epairs else ''
            oform = norm(opairs[-1][1]).strip('*') if opairs else ''
            same_g = bool(ge and go and ge[-1] == go[-1])
            b_ok = bool(same_g and eform and oform and (eform == oform or eform in norm(ox) or oform in norm(ety_trim)))
            agree['eo'] = {'ok': bool(a_ok and b_ok), 'a': a_why, 'b': '末组同+末形呼应' if b_ok else f'末形异 e={eform} o={oform}'}
        # 构词一致标记：wikt 给出 morph 且 Etymonline 头部原文点名了这些部件
        morph_agree = False
        if wt.get('morph') and ety_head:
            parts = [norm(p).strip('-') for p in wt['morph'].get('parts', []) if norm(p).strip('-')]
            eh = norm(ety_head)
            morph_agree = bool(parts) and all(p in eh for p in parts)
        diag['morph_agree'] = morph_agree
        diag['agree'] = agree
        pairs_ok = [k for k, v in agree.items() if v['ok']]
        usable = sum([bool(wchain or wt.get('morph')), bool(epairs), bool(opairs)])
        if pairs_ok: diag['tier'] = 'A' ; diag['agree_pair'] = pairs_ok
        elif usable >= 2: diag['tier'] = 'B'
        else: diag['tier'] = 'C'
        out[word] = diag
    json.dump(out, open(W / 'screen.json', 'w'), ensure_ascii=False, indent=1)
    tc = collections.Counter(d['tier'] for d in out.values())
    print('tiers:', dict(tc))
    by = collections.Counter((d['reason'], d['tier']) for d in out.values())
    for (reason, tier), n in sorted(by.items()):
        print(f'{reason:24s} {tier} {n}')

if __name__ == '__main__':
    main()
