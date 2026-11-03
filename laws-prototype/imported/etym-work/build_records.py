"""build_records.py —— 生成 etymology.json（verified + 待核）与未收清单。
口径（任务书 + 用户追加三条）：
 1) 有则有、无则无：完全无词源线索的词不进 JSON，入未收清单（notes 用）；待核只留「有线索未达双源互证」的词。
 2) 来源取全网最权威：牛津大学出版社词源栏（Oxford Learner's）可达时作主源并排第一；Etymonline 只作互证一方；
    evidence_grade 如实写本词实际达到的等级组合。OED 本体付费墙不可达，已试。
 3) 表述深入浅出：中文一律大白话；学术词出现须同句白话解释（生成模板已按此写）。
数据源：parsed_all.json（Wiktionary 解析 × Etymonline 互证）、etym_db_625.json（已核事实链）、
        ox/*.txt（牛津词源栏）、wikt/etymo 原文缓存、gloss_map.json（英文 gloss 忠实中译）。"""
import json, re, pathlib, collections, unicodedata

C = pathlib.Path('/home/hatch/workspace/etym-work')
WB = json.load(open('/tmp/mengxing2/laws-prototype/model/wordbank.json'))
PARSED = json.load(open(C / 'parsed_all.json'))
ETYMDB = json.load(open(C / 'etym_db_625.json'))
GM = json.load(open(C / 'gloss_map.json'))
FN = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)

LANG_EN = {'enm': 'Middle English', 'ang': 'Old English', 'gmw-pro': 'Proto-West Germanic', 'gem-pro': 'Proto-Germanic',
 'ine-pro': 'Proto-Indo-European', 'la': 'Latin', 'LL': 'Late Latin', 'ML': 'Medieval Latin', 'la-lat': 'Late Latin',
 'la-med': 'Medieval Latin', 'la-new': 'Modern Latin', 'NL': 'Modern Latin', 'la-vul': 'Vulgar Latin', 'VL': 'Vulgar Latin',
 'fro': 'Old French', 'frm': 'Middle French', 'fr': 'French', 'xno': 'Anglo-Norman', 'onf': 'Old North French',
 'non': 'Old Norse', 'grc': 'Ancient Greek', 'el': 'Greek', 'it': 'Italian', 'es': 'Spanish', 'pt': 'Portuguese',
 'nl': 'Dutch', 'dum': 'Middle Dutch', 'de': 'German', 'gml': 'Middle Low German', 'ar': 'Arabic', 'fa': 'Persian',
 'sa': 'Sanskrit', 'hi': 'Hindi', 'zh': 'Chinese', 'cmn': 'Chinese', 'yue': 'Cantonese', 'ja': 'Japanese',
 'tr': 'Turkish', 'nah': 'Nahuatl', 'pi': 'Pali', 'he': 'Hebrew', 'sga': 'Old Irish', 'cel-gau': 'Gaulish',
 'pro': 'Old Provençal', 'aus-pmn': 'Australian Aboriginal', 'gd': 'Scottish Gaelic', 'ota': 'Ottoman Turkish',
 'odt': 'Old Dutch', 'goh': 'Old High German', 'osx': 'Old Saxon', 'ofs': 'Old Frisian'}
PERIOD = {'ine-pro': '原始印欧语时期', 'gem-pro': '原始日耳曼语时期', 'gmw-pro': '原始西日耳曼语时期', 'ang': '古英语时期',
 'enm': '中古英语时期', 'la': '古典拉丁时期', 'LL': '晚期拉丁语时期', 'la-lat': '晚期拉丁语时期', 'ML': '中世纪拉丁语时期',
 'la-med': '中世纪拉丁语时期', 'la-new': '近代拉丁语时期', 'NL': '近代拉丁语时期', 'la-vul': '通俗拉丁语时期', 'VL': '通俗拉丁语时期',
 'fro': '古法语时期', 'frm': '中古法语时期', 'fr': '法语近现代', 'xno': '盎格鲁-诺曼法语时期', 'onf': '古北部法语时期',
 'non': '古诺斯语时期', 'grc': '古希腊时期', 'el': '希腊语时期', 'it': '意大利语时期', 'es': '西班牙语时期', 'pt': '葡萄牙语时期',
 'nl': '荷兰语时期', 'dum': '中古荷兰语时期', 'de': '德语时期', 'gml': '中古低地德语时期', 'ar': '阿拉伯语时期', 'fa': '波斯语时期',
 'sa': '梵语时期', 'hi': '印地语时期', 'zh': '汉语时期', 'cmn': '汉语时期', 'yue': '粤语时期', 'ja': '日语时期', 'tr': '土耳其语时期',
 'nah': '纳瓦特尔语时期', 'pi': '巴利语时期', 'he': '希伯来语时期', 'sga': '古爱尔兰语时期', 'cel-gau': '高卢语时期',
 'pro': '古奥克语时期', 'aus-pmn': '澳大利亚原住民语时期', 'gd': '苏格兰盖尔语时期', 'ota': '奥斯曼土耳其语时期',
 'odt': '古荷兰语时期', 'goh': '古高地德语时期', 'osx': '古撒克逊语时期', 'ofs': '古弗里斯兰语时期'}
ZH2CODE = {'中古英语': 'enm', '古英语': 'ang', '古法语': 'fro', '拉丁语': 'la', '原始西日耳曼语': 'gmw-pro', '原始日耳曼语': 'gem-pro',
 '盎格鲁-诺曼法语': 'xno', '原始印欧语': 'ine-pro', '古诺斯语': 'non', '中古法语': 'frm', '晚期拉丁语': 'la-lat', '法语': 'fr',
 '中世纪拉丁语': 'la-med', '意大利语': 'it', '通俗拉丁语': 'la-vul', '西班牙语': 'es', '荷兰语': 'nl', '中古荷兰语': 'dum',
 '德语': 'de', '古希腊语': 'grc', '古荷兰语': 'odt', '古爱尔兰语': 'sga', '葡萄牙语': 'pt', '中古低地德语': 'gml'}
# 牛津词源栏里语言名的归组（用于冲突判定：同组视为一致）
LANG_GROUP = {}
for grp, codes in [('Latin', {'la', 'LL', 'ML', 'la-lat', 'la-med', 'la-vul', 'VL', 'la-new', 'NL'}),
                   ('French', {'fro', 'frm', 'fr', 'xno', 'onf'}), ('Greek', {'grc', 'el'}),
                   ('Old Norse', {'non'}), ('Middle Dutch', {'dum'}), ('Dutch', {'nl', 'odt'}),
                   ('Middle Low German', {'gml'}), ('German', {'de', 'goh'}), ('Old English', {'ang'}),
                   ('Italian', {'it'}), ('Spanish', {'es'}), ('Portuguese', {'pt'}), ('Arabic', {'ar'}),
                   ('Persian', {'fa'}), ('Sanskrit', {'sa'}), ('Hindi', {'hi'}), ('Chinese', {'zh', 'cmn', 'yue'}),
                   ('Japanese', {'ja'}), ('Turkish', {'tr', 'ota'}), ('Hebrew', {'he'}), ('Old Irish', {'sga'}),
                   ('Gaulish', {'cel-gau'}), ('Nahuatl', {'nah'}), ('Proto-Germanic', {'gem-pro', 'gmw-pro'})]:
    for c in codes: LANG_GROUP[c] = grp
OX_LANG_NAMES = ['Old Norse', 'Middle Low German', 'Middle Dutch', 'Anglo-Norman', 'Old French', 'Middle French',
                 'Old English', 'Old High German', 'Old Irish', 'Latin', 'Greek', 'French', 'Dutch', 'German',
                 'Italian', 'Spanish', 'Portuguese', 'Arabic', 'Persian', 'Sanskrit', 'Hindi', 'Chinese',
                 'Japanese', 'Turkish', 'Hebrew', 'Gaulish', 'Nahuatl', 'Norse', 'Scandinavian']

def cg(g):
    return re.sub(r'\s+', ' ', re.sub(r"''+|\"", '', g or '')).strip(' ,;')

def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[\*\[\]]', '', s).replace('æ', 'ae').replace('þ', 'th').replace('ð', 'th').lower().strip()

def read_cache(kind, word):
    p = C / kind / (FN(word) + '.txt')
    return p.read_text(encoding='utf-8') if p.exists() else None

def wikt_etym_raw(word):
    p = C / 'wikt' / (FN(word) + '.txt')
    if not p.exists(): return ''
    import parse_etym as P
    return P.etym_section(p.read_text(encoding='utf-8'))

CENT_RE = re.compile(r'\b(late|early|mid)[- ](\d{1,2})c\.|\bc\.\s*(\d{3,4})\b|\b(\d{1,2})c\.|\b(1[0-9]{3}|20[0-9]{2})s?\b')
def first_attested(chain_new_old, ety, ox):
    if ety:
        m = None
        first_from = ety.find(' from ')
        for mm in CENT_RE.finditer(ety[:260]):
            # Etymonline 的体例：词条年代写在引言最前（第一个 from 之前）；
            # 出现在 from 之后的年代都是义项/拼写等局部年代，不是这个词的首见年代
            if first_from >= 0 and mm.start() > first_from: break
            if 'pelling' in ety[max(0, mm.start() - 80):mm.start()]: continue
            m = mm; break
        if m:
            tok = m.group(0)
            if m.group(2):
                return f"约 {m.group(2)} 世纪{'晚期' if m.group(1) == 'late' else '早期' if m.group(1) == 'early' else '中期'}（Etymonline 词条原文记作 {tok}）"
            if m.group(3):
                y = int(m.group(3)); return f'约 {(y - 1) // 100 + 1} 世纪（Etymonline 词条原文记作 {tok}）'
            if m.group(4):
                return f'约 {m.group(4)} 世纪（Etymonline 词条原文记作 {tok}）'
            if tok.endswith('s') and len(tok) == 5 and tok[:4].isdigit():
                y = int(tok[:4])
                return f'约 {(y - 1) // 100 + 1} 世纪 {y % 100 // 10 * 10} 年代（Etymonline 词条原文记作 {tok}）'
            return f'约 {tok} 年（Etymonline 词条原文）'
    if ox:
        if re.search(r'\blate Middle English\b', ox): return '中古英语晚期（约 15 世纪）见载（牛津词源栏）'
        if re.search(r'\bOld English\b', ox): return '古英语时期就已经有了（牛津词源栏以古英语词形起头）'
        if re.search(r'\bMiddle English\b', ox): return '中古英语时期见载（牛津词源栏）'
    if chain_new_old:
        codes = [c for (c, f, g) in chain_new_old]
        if 'ang' in codes: return '古英语时期就已经有了（来源链里有古英语词形，两个来源都对得上）'
        if 'enm' in codes: return '中古英语时期见载（来源链从中古英语词形开始，两个来源都对得上）'
    return None

def etymo_entry_gloss(ety):
    if not ety: return None
    head = ety[:700]
    for m in re.finditer(r'(?:Old English|Middle English).{0,140}?"([^"]{2,200})"', head, re.S):
        g = m.group(1).strip()
        if len(g) > 70:
            # 长释义取第一分句（原文摘录，不改词）：如 about 的 abutan 长释义取首段 'on the outside of'
            g = g.split(';')[0].strip(' ,')
            if not (8 <= len(g) <= 70): continue
        if len(g.strip(' ,;')) < 4: continue
        # 抓到的若是散文片段而非释义（重构说明、书名、转述句），跳过不用——宁可待核不用错义
        if 'Proto' in g or 'reconstructed' in g or 'Dictionary' in g: continue
        if ' gave English' in g or ', which,' in g or ' which, via ' in g: continue
        if g.startswith(('from ', 'also', 'This ', 'also in part')): continue
        return g
    return None

UNCERTAIN_RE = re.compile(r'uncertain|unknown origin|of unknown origin|not certainly known|disputed|perhaps from|possibly from|probably from', re.I)
def disputes_of(ety, wraw):
    for txt, srcname in ((ety, 'Etymonline'), (wraw, 'Wiktionary')):
        if not txt: continue
        head = txt[:1600]
        m = UNCERTAIN_RE.search(head)
        if m:
            s = max(head.rfind('. ', 0, m.start()), head.rfind('\n', 0, m.start())) + 1
            e = head.find('. ', m.end())
            snip = head[s:(e if e > 0 else m.end() + 160)].strip().replace('\n', ' ')
            if len(snip) > 240: snip = snip[:240] + '…'
            return f'来源还没有完全定论（{srcname} 原文措辞：“{snip}”）'
    return '无已知争议'

FOLK_RE = re.compile(r'folk etymology|popular etymology|false etymology|acronym', re.I)
def folk_scan(ety):
    if not ety: return None
    m = FOLK_RE.search(ety)
    if not m: return None
    s = max(ety.rfind('. ', 0, m.start()), 0)
    e = ety.find('. ', m.end())
    return ety[s:(e if e > 0 else m.end() + 160)].strip()[:240]

def ox_check(chain_new_old, full_chain, ox, corpus=''):
    """返回 (tier, detail): tier ∈ strong|weak|conflict|none。
    牛津词源栏是压缩表述，常跳过中间站直说深层来源——只有当它点名的来源语言在全链里找不到、
    在另两源的词源原文里也完全没被提到、且链上词形一个都没对上时，才算两说对不上。"""
    if not ox or not ox.strip(): return 'none', ''
    oxn = ' ' + norm(ox) + ' '
    foreign = [(c, f) for (c, f, g) in chain_new_old if c not in ('enm', 'ang')]
    matched_foreign = [f for (c, f) in foreign if len(norm(f).strip('-')) >= 3 and norm(f).strip('-') in oxn]
    matched_any = [(c, f) for (c, f, g) in chain_new_old if len(norm(f).strip('-')) >= 3 and norm(f).strip('-') in oxn]
    if matched_foreign or len(matched_any) >= 2: return 'strong', ''
    m = re.search(r'\bfrom\s+([A-Z][A-Za-z\- ]{2,30}?)[\s,\.]', ox)
    if m and foreign:
        ox_lang = m.group(1).strip()
        grp = None
        for name in OX_LANG_NAMES:
            if ox_lang.startswith(name): grp = name; break
        full_groups = {LANG_GROUP.get(c) for (c, f, g) in full_chain if c not in ('enm', 'ang')}
        full_groups.discard(None)
        mentioned = grp and (grp in corpus or grp.split()[-1] in corpus)
        if grp and grp not in full_groups and not matched_any and not mentioned:
            return 'conflict', f'牛津词源栏作“from {ox_lang} …”，这个来源在 Wiktionary 链与词源原文里都找不到，Etymonline 也未提及；两说并存，不擅自裁定'
    return 'weak', ''

def ox_rescue(chain_full, ox):
    """Etymonline 没对上时，用牛津词源栏核链：按新→旧顺序数能在牛津原文里找到的词形站数。"""
    if not ox or not ox.strip(): return 0
    oxn = norm(ox)
    cnt = 0
    for (_, lc, form, g) in chain_full:
        f = norm(form).strip('-')
        if len(f) >= 3 and f in oxn: cnt += 1
        else: break
    return cnt

def modern_head(meaning):
    m = (meaning or '').strip()
    m = re.split(r'[；;]', m)[0]
    m = re.split(r'[，,]', m)[0]
    m = re.sub(r'（.*?）', '', m).strip()
    return m or (meaning or '').strip()

ETYMDB_L = {k.lower(): v for k, v in ETYMDB.items()}

def build_chain(word, rec):
    if word.lower() in ETYMDB_L:
        ch = []
        for lang_zh, form, gloss in ETYMDB_L[word.lower()]['c']:
            code = ZH2CODE.get(lang_zh)
            if not code: return None, 'db_langmap'
            ch.append((code, form, cg(gloss)))
        return ch, 'db'
    v = rec.get('verify', {})
    n = v.get('chain_ok', 0)
    ch_full = rec.get('chain', [])
    if n >= 1 and ch_full:
        return [(lc, form, cg(g)) for (_, lc, form, g) in ch_full[:n]], 'parsed'
    return None, None

def make(w):
    word = w['word'].strip()
    low = word.lower()
    base = {'word': low, 'wordbank_key': word}
    rec = PARSED.get(word, {})
    ety = read_cache('etymo', word)
    ox = read_cache('ox', word)
    wraw = wikt_etym_raw(word) if rec.get('has_wikt_ety') else ''
    has_ety_text = bool(ety and ety.strip())
    has_ox = bool(ox and ox.strip())

    def pending(reason, detail=''):
        r = dict(base)
        r.update({'source_chain': [], 'first_attested': '', 'original_meaning': '', 'semantic_path': [],
                  'mechanism_sentence': '', 'modern_meanings_link': '', 'story_hooks': [], 'sources': [],
                  'evidence_grade': '', 'disputes': '', 'folk_etymology_check': '', 'status': '待核',
                  'pending_reason': reason + (('：' + detail) if detail else '')})
        return r

    def uncollected(reason, detail=''):
        return {'word': low, 'wordbank_key': word, 'id': w['id'], '_uncollected': reason + (('：' + detail) if detail else '')}

    # ---- 完全无线索 → 未收 ----
    if '/' in word or ' ' in word:
        return uncollected('多词条目', '短语或词形组，不是单个词，没有单独的词源条目可核')
    wikt_nothing = (rec.get('status') == 'wikt_not_fetched') or rec.get('wikt_empty') or not rec.get('has_wikt_ety')
    if wikt_nothing and not has_ety_text and not has_ox:
        raw = read_cache('wikt', word) or ''
        lm = None
        for pat in (r'\{\{plural of\|en\|([^|}]+)', r'\{\{infl of\|en\|([^|}]+)', r'\{\{past tense of\|en\|([^|}]+)',
                    r'\{\{present participle of\|en\|([^|}]+)', r'\{\{past participle of\|en\|([^|}]+)',
                    r'\{\{alternative (?:form|spelling) of\|en\|([^|}]+)', r'\{\{(?:syn|synonym) of\|en\|([^|}]+)'):
            mm = re.search(pat, raw)
            if mm: lm = mm.group(1).strip(); break
        if lm:
            return uncollected('词形变化词', f'复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「{lm}」，无独立词源小节；词源随原形词条目（若原形已收录）')
        if rec.get('status') == 'wikt_not_fetched' or rec.get('wikt_empty'):
            return uncollected('无词源可考', 'Wiktionary 无此词条，Etymonline 与牛津词源栏也都没有条目')
        return uncollected('无词源可考', 'Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法')

    chain, src = build_chain(word, rec)
    via = None  # verified 的互证路径： 'etymo' | 'oxford'
    if chain is not None:
        if src == 'db': via = 'etymo'
        elif rec.get('verify', {}).get('chain_ok', 0) >= 1: via = 'etymo'
    if chain is None and rec.get('chain'):
        # 试牛津救场：链节在牛津原文里逐站对上 ≥2 站（含至少 1 个外语站）
        n = ox_rescue(rec['chain'], ox)
        foreign_in = sum(1 for (_, lc, f, g) in rec['chain'][:n] if lc not in ('enm', 'ang'))
        if n >= 2 and foreign_in >= 1:
            chain = [(lc, form, cg(g)) for (_, lc, form, g) in rec['chain'][:n]]
            src, via = 'parsed', 'oxford'
    if chain is None and not rec.get('chain'):
        # 链为空时再查一次是否为词形条目（seen 型：页面标明是某词的变形；有真链的词不会走到这）
        raw0 = read_cache('wikt', word) or ''
        lm0 = None
        for pat in (r'\{\{plural of\|en\|([^|}]+)', r'\{\{infl of\|en\|([^|}]+)', r'\{\{past tense of\|en\|([^|}]+)',
                    r'\{\{present participle of\|en\|([^|}]+)', r'\{\{past participle of\|en\|([^|}]+)'):
            mm = re.search(pat, raw0)
            if mm: lm0 = mm.group(1).strip(); break
        if lm0:
            return uncollected('词形变化词', f'词形条目，Wiktionary 只标原形「{lm0}」，无独立词源小节；词源随原形词条目（若原形已收录）')
    if chain is None:
        # 有线索但未达互证 → 待核，分原因
        if rec.get('status') == 'wikt_not_fetched' or rec.get('wikt_empty'):
            return pending('single_source', '只有 Etymonline/牛津单方面说法，Wiktionary 无词条可互证')
        if not rec.get('has_wikt_ety'):
            return pending('single_source', 'Wiktionary 无词源小节，只有 Etymonline/牛津单方面说法可参考，未达双源互证')
        if not has_ety_text and not has_ox:
            return pending('second_source_missing', 'Wiktionary 有来源链，但 Etymonline 本次未抓到、牛津词源栏无此词，缺第二来源互证')
        if not has_ety_text and has_ox:
            return pending('second_source_missing', 'Wiktionary 有来源链，Etymonline 本次未抓到；牛津词源栏虽有此词，但未能与链逐站对上，互证未达标')
        if rec.get('etymo_fetched') and rec.get('etymo_empty') and not has_ox:
            return pending('second_source_missing', 'Etymonline 无词条、牛津词源栏无此词，只有 Wiktionary 一个来源')
        if not rec.get('chain') and not rec.get('morph'):
            return pending('chain_unparsable', 'Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）')
        if rec.get('morph') and rec.get('verify', {}).get('morph_ok'):
            parts = ' + '.join(rec['morph']['parts'])
            return pending('morph_only', f'构词拆分（{parts}）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核')
        return pending('chain_mismatch', 'Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过')

    # ---- 已核链：候选门槛 ----
    single_foreign_gloss = None
    if src != 'db' and len(chain) < 2:
        code, form, g = chain[0]
        ok_gate = (code not in ('enm', 'ang') and g) or rec.get('verify', {}).get('morph_ok')
        if not ok_gate and code not in ('enm', 'ang') and ety:
            # 单站直造词（如 synchronize ← 希腊语）：Etymonline 原文在词源词形后紧跟引号释义时，可据原文立档
            cands = [form]
            if code in ('grc', 'el'):
                GR2LAT = {'ά': 'a', 'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'έ': 'e', 'ε': 'e', 'ζ': 'z', 'ή': 'e', 'η': 'e',
                          'θ': 'th', 'ί': 'i', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ό': 'o', 'ο': 'o',
                          'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'ύ': 'y', 'υ': 'y', 'φ': 'ph', 'χ': 'kh', 'ψ': 'ps', 'ώ': 'o', 'ω': 'o'}
                s = ''.join(GR2LAT.get(ch, ch) for ch in form.lower()).replace('gg', 'ng')
                s = re.sub(r'g(?=kh|k|x)', 'n', s)
                full = re.sub(r'[^a-z]', '', s)
                cands.append(full)
                if len(full) > 6: cands.append(full[:-2])  # 词干：Etymonline 常引不定式词尾（-izein），与字典词头（-izō）只差词尾
            for cand in cands:
                if len(cand) < 4: continue
                mm = re.search(re.escape(cand) + r'[a-z]*\s*"([^"]{2,70})"', ety[:1200])
                if mm:
                    g0 = mm.group(1).strip()
                    if ' gave English' in g0 or ', which,' in g0 or ' which, via ' in g0 or 'Proto' in g0: continue
                    single_foreign_gloss = g0
                    ok_gate = True
                    break
        if not ok_gate:
            return pending('chain_too_short', '来源链只对上一站且信息量不足（只到中古英语同形等），不足以立档')
    full_chain = chain if src == 'db' else [(lc, form, cg(g)) for (_, lc, form, g) in rec.get('chain', [])]
    corpus = (wraw or '') + '\n' + (ety or '')
    oxtier, oxdetail = ox_check(chain, full_chain, ox, corpus) if has_ox else ('none', '')
    if oxtier == 'conflict' and via == 'etymo':
        return pending('sources_conflict', oxdetail + '；两说并存，不擅自裁定，整条待核')
    # ---- 字段可提炼性门槛 ----
    chain_old_new = list(reversed(chain))
    glossed = [(c, f, g) for (c, f, g) in chain_old_new if g]
    fa = first_attested(chain, ety, ox)
    if fa is None:
        return pending('fields_unfillable', '来源链已互证，但这个词在英语里最早什么时候出现，来源原文里没有可依据的说法')
    orig = None
    if glossed:
        orig = GM.get(glossed[0][2])
    if not orig and single_foreign_gloss:
        orig = GM.get(single_foreign_gloss) or ('__UNTRANSLATED__' + single_foreign_gloss)
    if not orig:
        eg = etymo_entry_gloss(ety)
        if eg: orig = GM.get(eg) or ('__UNTRANSLATED__' + eg)
    if not orig:
        return pending('fields_unfillable', '来源链已互证，但这个词最早的意思在来源原文里没有可依据的说法')
    # ---- 组装 ----
    sc = [{'lang': LANG_EN.get(c, c), 'form': f, 'gloss': (GM.get(g) or ''), 'period': PERIOD.get(c, '')} for (c, f, g) in chain_old_new]
    mh = modern_head(w.get('meaning', ''))
    path_src = [(c, f, GM.get(g) or '') for (c, f, g) in glossed]
    if not path_src:
        path_src = [(chain_old_new[0][0], chain_old_new[0][1], orig)]
    path = []
    prev = None
    for i, (c, f, zh) in enumerate(path_src):
        if i == 0: how = '最早的意思（本义）'
        elif zh == prev: how = '意思没变，跟着词一起传下来'
        else: how = '意思变了（和上一站对比着看）'
        path.append({'meaning': zh, 'period': PERIOD.get(c, ''), 'how': how})
        prev = zh
    same_modern = (mh == path[-1]['meaning']) or (mh and (mh in path[-1]['meaning'] or path[-1]['meaning'] in mh))
    path.append({'meaning': mh, 'period': '现代', 'how': '一直传到今天，意思没变' if same_modern else '进入英语以后，意思又慢慢变了，变成今天这样'})
    meanings = [p['meaning'] for p in path]
    distinct = list(dict.fromkeys(meanings))
    oldest_lang = LANG_EN.get(chain_old_new[0][0], chain_old_new[0][0])
    if len(distinct) <= 1:
        mech = f'从{oldest_lang}到今天，核心意思一直是「{meanings[0]}」，没有大变化，是直接传下来的老词。'
    else:
        mech = '意思从「' + distinct[0] + '」开始一站一站变：' + ' → '.join(distinct) + '，最后变成今天的「' + mh + '」。'
    orig_zh = path[0]['meaning']
    shared = set(orig_zh) & set(mh)
    if same_modern:
        link = f'今天的意思「{mh}」就是最早的意思「{orig_zh}」，一直没变。'
    elif shared:
        link = f'今天的意思「{mh}」是从最早的意思「{orig_zh}」变来的，字面上还留着相同的部分，具体怎么变的看上面的语义路径。'
    else:
        link = f'今天的意思「{mh}」和最早的意思「{orig_zh}」光看字面已经看不出关系了，只有翻来源链才知道它们是同一个词一路变下来的。'
    hooks = []
    oc, of, og = chain_old_new[0]
    hooks.append(f'最远能追到{oldest_lang}的 {of}' + (f'，意思是「{GM.get(og)}」' if og and GM.get(og) else ''))
    nc, nf, ng = chain_old_new[-1]
    if nc in ('enm', 'ang'):
        hooks.append(f'英语最早用的词形是{LANG_EN.get(nc, nc)}的 {nf}')
    else:
        hooks.append(f'来源链在英语这一侧没有更早的词形记录，它直接来自{LANG_EN.get(nc, nc)}的 {nf}')
    if len(distinct) > 1:
        hooks.append(f'最早的意思「{orig_zh}」和今天的意思「{mh}」差得挺远，中间变了 {len(distinct) - 1} 次')
    else:
        hooks.append(f'最早的意思「{orig_zh}」和今天的意思「{mh}」基本一样，是意思保持得很稳的老词')
    mid_langs = [LANG_EN.get(c, c) for (c, f, g) in chain_old_new[1:-1]]
    if mid_langs:
        hooks.append('先经过' + '、'.join(dict.fromkeys(mid_langs)) + '，才传进英语')
    if rec.get('verify', {}).get('morph_ok') and rec.get('morph'):
        hooks.append('这个词可以拆开看：' + ' + '.join(rec['morph']['parts']) + '（这个拆法在 Etymonline 正文里也能对上）')
    slug = ETYMDB_L[low]['e'] if low in ETYMDB_L else low.replace(' ', '-').replace("'", '')
    src_ox = {'name': 'Oxford Learner’s Dictionaries（牛津大学出版社）', 'detail': f'{word} 词条 Word Origin 栏',
              'url': 'https://www.oxfordlearnersdictionaries.com/definition/english/' + low.replace("'", '')}
    src_et = {'name': 'Etymonline', 'detail': f'{slug} 词条（经 Wayback Machine 存档读取）', 'url': f'https://www.etymonline.com/word/{slug}'}
    src_wk = {'name': 'Wiktionary', 'detail': f'{word} 词条 Etymology 小节', 'url': 'https://en.wiktionary.org/wiki/' + word.replace(' ', '_')}
    if via == 'oxford':
        sources = [src_ox, src_wk]
        grade = '一级＋三级互证（牛津大学出版社词源栏 × Wiktionary；待 Etymonline 复核）'
    elif oxtier == 'strong':
        sources = [src_ox, src_et, src_wk]
        grade = '一级＋二级双源互证（牛津大学出版社词源栏 × Etymonline，Wiktionary 旁证；待 OED 复核）'
    elif oxtier == 'weak':
        sources = [src_et, src_wk, src_ox]
        grade = '二级双源互证（Etymonline × Wiktionary，牛津词源栏说法太简、仅作旁证；待一级复核）'
    else:
        sources = [src_et, src_wk]
        grade = '二级双源互证（Etymonline × Wiktionary；待一级复核）'
    folk = folk_scan(ety)
    folk_field = (f'流传着与这个词有关的假词源说法，已按来源原文核对排除（原文：“{folk}”）' if folk else '未见流传假词源')
    r = dict(base)
    r.update({'source_chain': sc, 'first_attested': fa, 'original_meaning': orig, 'semantic_path': path,
              'mechanism_sentence': mech, 'modern_meanings_link': link, 'story_hooks': hooks, 'sources': sources,
              'evidence_grade': grade, 'disputes': disputes_of(ety, wraw), 'folk_etymology_check': folk_field,
              'status': 'verified'})
    if orig.startswith('__UNTRANSLATED__'): r['_untranslated_orig'] = orig
    if src == 'db': r['_from_db'] = True
    return r

if __name__ == '__main__':
    out, unc = [], []
    for w in WB:
        r = make(w)
        (unc if '_uncollected' in r else out).append(r)
    out.sort(key=lambda r: r['word'])
    json.dump(out, open(C / 'etymology_draft.json', 'w'), ensure_ascii=False, indent=1)
    json.dump(unc, open(C / 'uncollected.json', 'w'), ensure_ascii=False, indent=1)
    st = collections.Counter(r['status'] for r in out)
    pr = collections.Counter(r.get('pending_reason', '').split('：')[0] for r in out if r['status'] == '待核')
    gr = collections.Counter(r.get('evidence_grade', '')[:6] for r in out if r['status'] == 'verified')
    un = [r['word'] for r in out if r.get('_untranslated_orig')]
    print('in-json', len(out), dict(st), '| uncollected', len(unc))
    print('pending reasons:', pr.most_common())
    print('grades:', gr.most_common())
    print('untranslated originals:', len(un), un[:15])
    print('from ETYM_DB:', sum(1 for r in out if r.get('_from_db')))
