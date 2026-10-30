"""parse_etym.py —— 解析 Wiktionary 词源（决策 25，HANDOFF §5.1 ⑥a）并与 Etymonline 交叉核对。
输入：/workspace/work/etym/{vocab.json, wikt/*.txt, etymo/*.txt}（fetch_etym.py 抓的缓存，不进仓库）
输出：/workspace/work/etym/parsed.json（每词：来源链 chain、构词 morph、同源 cogs、核对结果 verify）
核对规则（不编造）：来源链逐级看 Etymonline 正文里是否同时出现「该级语言名」和「该级词形」（去附加符号、小写比较）；
  链只保留到最后一个对上的级别；一级都对不上 = 未核实（不入库，写原因）。构词：各部分都在 Etymonline 正文出现才算核实。"""
import json, re, unicodedata, pathlib
C = pathlib.Path('/workspace/work/etym')
LANG = {  # 代码: (中文, Etymonline 用的英文名[可多个])
 'enm': ('中古英语', ['Middle English']), 'ang': ('古英语', ['Old English']), 'gmw-pro': ('原始西日耳曼语', ['West Germanic', 'Proto-West Germanic']),
 'gem-pro': ('原始日耳曼语', ['Proto-Germanic']), 'ine-pro': ('原始印欧语', ['PIE', 'Proto-Indo-European']),
 'la': ('拉丁语', ['Latin']), 'LL': ('晚期拉丁语', ['Late Latin', 'Latin']), 'ML': ('中世纪拉丁语', ['Medieval Latin', 'Latin']),
 'la-lat': ('晚期拉丁语', ['Late Latin', 'Latin']), 'la-med': ('中世纪拉丁语', ['Medieval Latin', 'Latin']), 'la-new': ('新拉丁语', ['Modern Latin', 'Latin']), 'NL': ('新拉丁语', ['Modern Latin', 'Latin']), 'la-vul': ('通俗拉丁语', ['Vulgar Latin', 'Latin']), 'VL': ('通俗拉丁语', ['Vulgar Latin', 'Latin']),
 'fro': ('古法语', ['Old French']), 'frm': ('中古法语', ['Middle French', 'French']), 'fr': ('法语', ['French']), 'xno': ('盎格鲁-诺曼法语', ['Anglo-French', 'Anglo-Norman']),
 'onf': ('古北部法语', ['Old North French']), 'non': ('古诺斯语', ['Old Norse']), 'grc': ('古希腊语', ['Greek']), 'el': ('希腊语', ['Greek']),
 'it': ('意大利语', ['Italian']), 'es': ('西班牙语', ['Spanish']), 'pt': ('葡萄牙语', ['Portuguese']), 'nl': ('荷兰语', ['Dutch']), 'dum': ('中古荷兰语', ['Middle Dutch']),
 'de': ('德语', ['German']), 'gml': ('中古低地德语', ['Middle Low German']), 'ar': ('阿拉伯语', ['Arabic']), 'fa': ('波斯语', ['Persian']), 'sa': ('梵语', ['Sanskrit']),
 'hi': ('印地语', ['Hindi']), 'zh': ('汉语', ['Chinese']), 'cmn': ('汉语普通话', ['Chinese', 'Mandarin']), 'yue': ('粤语', ['Cantonese', 'Chinese']), 'ja': ('日语', ['Japanese']),
 'tr': ('土耳其语', ['Turkish']), 'nah': ('纳瓦特尔语', ['Nahuatl']), 'pi': ('巴利语', ['Pali']), 'he': ('希伯来语', ['Hebrew']), 'sga': ('古爱尔兰语', ['Old Irish']),
 'cel-gau': ('高卢语', ['Gaulish']), 'pro': ('古奥克语', ['Provençal', 'Old Provençal', 'Occitan']), 'aus-pmn': ('澳大利亚原住民语', ['Australian', 'Aboriginal']), 'gd': ('苏格兰盖尔语', ['Gaelic']),
 'ota': ('奥斯曼土耳其语', ['Turkish']), 'odt': ('古荷兰语', ['Old Dutch']), 'goh': ('古高地德语', ['Old High German']), 'osx': ('古撒克逊语', ['Old Saxon']), 'ofs': ('古弗里斯兰语', ['Old Frisian']),
}
CHAIN_T = {'inh': '传承', 'inh+': '传承', 'der': '来自', 'der+': '来自', 'bor': '借自', 'bor+': '借自', 'lbor': '借自', 'slbor': '借自', 'ubor': '借自', 'uder': '来自', 'lbor+': '借自'}
def norm(s):
    s = unicodedata.normalize('NFKD', s); s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[\*\[\]]', '', s).replace('æ', 'ae').replace('þ', 'th').replace('ð', 'th').replace('ȝ', 'gh').lower().strip()
def tmpl_args(body):
    parts, depth, cur = [], 0, ''
    for ch in body:
        if ch in '{[': depth += 1
        if ch in '}]': depth -= 1
        if ch == '|' and depth == 0: parts.append(cur); cur = ''
        else: cur += ch
    parts.append(cur)
    pos = [p for p in parts if '=' not in p.split('[[')[0]]; kw = dict(p.split('=', 1) for p in parts if '=' in p.split('[[')[0])
    return pos, kw
def clean_form(f):
    f = re.sub(r'\[\[(?:[^|\]]*\|)?([^\]]*)\]\]', r'\1', f); f = f.split(',')[0].split('<')[0].strip()
    return f
def templates(text):
    out = []; i = 0
    while True:
        i = text.find('{{', i)
        if i < 0: break
        d, j = 0, i
        while j < len(text):
            if text.startswith('{{', j): d += 1; j += 2; continue
            if text.startswith('}}', j):
                d -= 1; j += 2
                if d == 0: break
                continue
            j += 1
        body = text[i + 2:j - 2]; pos, kw = tmpl_args(body); out.append((i, pos[0].strip(), pos[1:], kw)); i = j
    return out
def etym_section(s):
    m = re.search(r'^==English==\n(.*?)(?=^==[^=]|\Z)', s, re.S | re.M)
    if not m: return ''
    e = m.group(1); x = re.search(r'^===\s*Etymology[^=]*===\n(.*?)(?=^===)', e, re.S | re.M)
    return x.group(1) if x else ''
def parse(text):
    r = {'chain': [], 'morph': None, 'cogs': [], 'raw': ''}
    first_para = text.split('\n\n')[0]; r['raw'] = re.sub(r'\s+', ' ', first_para)[:600]
    stop = False; prev_end = 0
    for pos_, name, a, kw in templates(text):
        gap = text[prev_end:pos_]; prev_end = pos_
        # 来源链只取第一句（"From A, from B, from C."）：句号之后、仿译（calque）、"Ultimately / Compare / Doublet" 一律停
        if r['chain'] and (re.search(r'\.(\s|$)', gap) or '+' in gap or '(' in gap): stop = True   # "+" / 括号 = 开始讲构词或插注，不再是来源链
        if r['chain'] and name in ('compound', 'com', 'affix', 'af', 'suffix', 'suf', 'prefix', 'pre', 'confix', 'con', 'blend'): stop = True
        if re.search(r'calque|translation of|Ultimately|perhaps|possibly|probably|uncertain|Compare|compare', text[max(0, pos_ - 40):pos_]): stop = True
        if name in ('cog', 'cognate', 'noncog', 'ncog'):
            if len(a) >= 2: r['cogs'].append((a[0], clean_form(a[1]), kw.get('t') or (a[3] if len(a) > 3 else '')))
            continue
        if name in ('doublet', 'dbt') or 'Compare' in text[max(0, pos_ - 12):pos_]: stop = True
        if name in CHAIN_T and not stop and pos_ < len(first_para) + 5:
            if len(a) >= 3:
                form = clean_form(a[2]) or (clean_form(a[3]) if len(a) > 3 else '')
                g = kw.get('t') or kw.get('gloss') or (a[4] if len(a) > 4 else '')
                g = re.sub(r'\[\[(?:[^|\]]*\|)?([^\]]*)\]\]', r'\1', g).strip()
                if form and form != '-': r['chain'].append((name, a[1], form, g))
        if name in ('compound', 'com', 'affix', 'af', 'suffix', 'suf', 'prefix', 'pre', 'confix', 'con', 'blend', 'univerbation', 'clipping', 'clip') and r['morph'] is None and pos_ < len(first_para) + 5:
            parts = [clean_form(p) for p in a[1:] if p.strip()]
            if name in ('suffix', 'suf') and len(parts) >= 2: parts[1] = '-' + parts[1].lstrip('-')
            if name in ('prefix', 'pre') and len(parts) >= 2: parts[0] = parts[0].rstrip('-') + '-'
            r['morph'] = {'type': name, 'lang': a[0].strip() if a else '', 'parts': parts}
    return r
def verify(word, r, ety):
    E = norm(ety); res = {'etymo': bool(ety), 'chain_ok': 0, 'morph_ok': False}
    if not ety: return res
    last = 0
    for k, (_, lang, form, _) in enumerate(r['chain']):
        if lang not in LANG: break
        names = LANG[lang][1]; f = norm(form)
        if len(f.strip('-')) < 3: continue        # 太短的词形（an、a）在正文里随处可见，不能算对上
        if any(n.lower() in E for n in names) and re.search(r'(?<![a-z])' + re.escape(f.strip('-')) + r'(?![a-z])', E): last = k + 1
    res['chain_ok'] = last
    if r['morph']:
        ps = [norm(p).strip('-') for p in r['morph']['parts'] if p.strip('-')]
        res['morph_ok'] = bool(ps) and all(re.search(r'(?<![a-z])' + re.escape(p) + r'(?![a-z])', E) for p in ps)
    return res
if __name__ == '__main__':
    V = json.load(open(C / 'vocab.json')); out = {}
    fn = lambda w: re.sub(r'[^A-Za-z0-9_-]', '_', w)
    for w in V:
        word = w['word'].strip(); pw = C / 'wikt' / (fn(word) + '.txt'); pe = C / 'etymo' / (fn(word) + '.txt')
        if not pw.exists(): out[word] = {'status': 'not_fetched'}; continue
        sec = etym_section(pw.read_text(encoding='utf-8'))
        r = parse(sec) if sec else {'chain': [], 'morph': None, 'cogs': [], 'raw': ''}
        ety = pe.read_text(encoding='utf-8') if pe.exists() else None
        r['verify'] = verify(word, r, ety or ''); r['etymo_fetched'] = ety is not None; r['has_wikt_ety'] = bool(sec)
        out[word] = r
    json.dump(out, open(C / 'parsed.json', 'w'), ensure_ascii=False, indent=0)
    n = len(out); ok = sum(1 for r in out.values() if r.get('verify', {}).get('chain_ok') or r.get('verify', {}).get('morph_ok'))
    print('words', n, 'verified(chain or morph)', ok, 'etymo fetched', sum(1 for r in out.values() if r.get('etymo_fetched')))
