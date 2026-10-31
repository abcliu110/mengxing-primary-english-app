#!/usr/bin/env python3
"""phon_gen.py —— 决策 35 A1：假音标重生成。
来源：CMUdict（https://github.com/cmusphinx/cmudict ，ARPAbet → IPA，口径与词库现有真音标一致：美式、长音带 ː、ɜːr / ər、oʊ）
交叉核对：Wiktionary 英语词条的 {{IPA|en|…}}（优先 US / GenAm），缓存 /workspace/work/etym/wikt_ipa/（不进仓库）。
用法：python3 phon_gen.py fetch   # 抓 Wiktionary（单连接 1 秒间隔，断点续抓）
      python3 phon_gen.py report  # 生成 lab/audit35/PHON_FIX.md + phon_fix.json（改前 → 改后、两处是否一致）
数据进主文件由 patch_phon.py 做。"""
import json, re, sys, time, pathlib, urllib.request, urllib.parse, unicodedata
HERE = pathlib.Path(__file__).resolve().parent
LAB = HERE.parent / 'lab' / 'audit35'
CMU = pathlib.Path('/workspace/work/cmudict.dict')
WC = pathlib.Path('/workspace/work/etym/wikt_ipa'); WC.mkdir(parents=True, exist_ok=True)
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'

def vocab():
    import subprocess
    return json.loads(subprocess.run(['node', str(HERE / 'vocab_extract.js'), str(APP)], capture_output=True, text=True).stdout)

def is_cand(w):
    """候选：音标为空，或整串只有 ASCII 字母（假音标都是这样；/pen/ /red/ 这类真音标也会进候选，再由 CMUdict 比对放行）"""
    p = (w.get('phonetic') or '').strip()
    return not p.strip('/ ') or bool(re.fullmatch(r"[/A-Za-z' .,()…-]+", p))

V = {'AA': 'ɑː', 'AE': 'æ', 'AO': 'ɔː', 'AW': 'aʊ', 'AY': 'aɪ', 'EH': 'e', 'EY': 'eɪ', 'IH': 'ɪ', 'IY': 'iː', 'OW': 'oʊ', 'OY': 'ɔɪ', 'UH': 'ʊ', 'UW': 'uː'}
CN = {'B': 'b', 'CH': 'tʃ', 'D': 'd', 'DH': 'ð', 'F': 'f', 'G': 'ɡ', 'HH': 'h', 'JH': 'dʒ', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'NG': 'ŋ', 'P': 'p', 'R': 'r', 'S': 's', 'SH': 'ʃ', 'T': 't', 'TH': 'θ', 'V': 'v', 'W': 'w', 'Y': 'j', 'Z': 'z', 'ZH': 'ʒ'}
ONSETS = {('S', 'T', 'R'), ('S', 'P', 'R'), ('S', 'K', 'R'), ('S', 'P', 'L'), ('S', 'K', 'W'), ('S', 'T', 'Y'), ('S', 'K', 'Y'), ('S', 'P', 'Y')}
OK1 = set(CN) - {'NG'}
OK2 = {('P', 'R'), ('B', 'R'), ('T', 'R'), ('D', 'R'), ('K', 'R'), ('G', 'R'), ('F', 'R'), ('TH', 'R'), ('SH', 'R'), ('P', 'L'), ('B', 'L'), ('K', 'L'), ('G', 'L'), ('F', 'L'), ('S', 'L'),
       ('S', 'T'), ('S', 'P'), ('S', 'K'), ('S', 'M'), ('S', 'N'), ('S', 'W'), ('T', 'W'), ('D', 'W'), ('K', 'W'), ('G', 'W'), ('TH', 'W'), ('P', 'Y'), ('B', 'Y'), ('K', 'Y'), ('F', 'Y'), ('M', 'Y'), ('V', 'Y'), ('HH', 'Y')}
def legal(c): return len(c) == 0 or (len(c) == 1 and c[0] in OK1) or (len(c) == 2 and tuple(c) in OK2) or (len(c) == 3 and tuple(c) in ONSETS)

def arpa2ipa(ph):
    toks = ph.split(); n = len(toks)
    vow = [i for i, t in enumerate(toks) if t[-1].isdigit()]
    out = []
    # 每个元音前的声母：取前一个元音后的辅音串里最长的合法声母
    onset_start = {}
    prev = -1
    for vi in vow:
        cons = toks[prev + 1:vi]
        k = 0
        for j in range(len(cons) + 1):
            if legal(cons[j:]): k = j; break
        onset_start[vi] = prev + 1 + k if prev >= 0 else 0
        prev = vi
    multi = len(vow) > 1
    marks = {}
    for vi in vow:
        st = toks[vi][-1]
        if multi and st in '12': marks[onset_start[vi]] = 'ˈ' if st == '1' else 'ˌ'
    for i, t in enumerate(toks):
        if i in marks: out.append(marks[i])
        if t[-1].isdigit():
            b, st = t[:-1], t[-1]
            if b == 'AH': out.append('ʌ' if st != '0' else 'ə')
            elif b == 'ER': out.append('ɜːr' if st != '0' else 'ər')
            elif b == 'IY' and st == '0': out.append('i')
            elif b == 'UW' and st == '0': out.append('u')
            elif b == 'IH' and st == '0' and i == n - 1: out.append('i')
            else: out.append(V[b])
        else: out.append(CN[t])
    s = ''.join(out)
    return tidy(s)

def tidy(s):
    """词库口径：只有一个主重音（多个时前面的降为次重音）；主重音后面的次重音不标（schoolbag /ˈskuːlbæɡ/、headache /ˈhedeɪk/）"""
    k = s.rfind('ˈ')
    if k < 0: return s
    head, tail = s[:k].replace('ˈ', 'ˌ'), s[k:].replace('ˌ', '')
    j = head.rfind('ˌ')   # 紧挨主重音的弱前缀（in- im- en- ex-）不标次重音：invent /ɪnˈvent/
    if j >= 0 and re.fullmatch(r'[^ɑæəeɪʊʌɔaoiu]*[ɪeə][^ɑæəeɪʊʌɔaoiuː]*', head[j + 1:]): head = head[:j] + head[j + 1:]
    return head + tail

def load_cmu():
    d = {}
    for line in CMU.read_text(encoding='utf-8', errors='ignore').splitlines():
        if not line or line.startswith(';;;'): continue
        line = line.split('#')[0].strip()
        w, ph = line.split(' ', 1)
        d.setdefault(re.sub(r'\(\d+\)$', '', w), []).append(ph.strip())
    return d

def heads(word):
    """词头 → 要查的单词（词组按空格拆；'how old' → how, old；斜杠多形取第一个）"""
    word = word.split('/')[0].strip()
    return [x for x in re.split(r"[\s]+", word.replace('…', ' ').replace('...', ' ')) if re.search('[A-Za-z]', x)]


# 人工定的读音（多音词按词库释义取；见 lab/audit35/PHON_FIX.md）
OVERRIDE = {'baseball': 'ˈbeɪsbɔːl', 'enjoyable': 'ɪnˈdʒɔɪəbəl', 'myself': 'maɪˈself', 'headmaster': 'ˌhedˈmæstər', 'librarian': 'laɪˈbreriən', 'toothbrush': 'ˈtuːθbrʌʃ', 'dislike': 'dɪsˈlaɪk', 'transport': 'ˈtrænspɔːrt', 'blackbird': 'ˈblækbɜːrd', 'upstairs': 'ˌʌpˈsterz', 'disagree': 'ˌdɪsəˈɡriː', 'close': 'kloʊz/ /kloʊs', 'use': 'juːz/ /juːs', 'present': 'ˈpreznt', 'thirty': 'ˈθɜːrti', 'lead': 'liːd', 'perfect': 'ˈpɜːrfɪkt', 'enjoy': 'ɪnˈdʒɔɪ', 'sometimes': 'ˈsʌmtaɪmz', 'nobody': 'ˈnoʊbɑːdi', 'somebody': 'ˈsʌmbɑːdi', 'anybody': 'ˈenibɑːdi', 'direction': 'dəˈrekʃn', 'yesterday': 'ˈjestərdeɪ', 'kept': 'kept', 'fire': 'ˈfaɪər', 'forget': 'fərˈɡet', 'piano': 'piˈænoʊ', 'pianist': 'ˈpiːənɪst', 'where': 'wer', 'when': 'wen', 'everywhere': 'ˈevriwer', 'anywhere': 'ˈeniwer', 'wheelchair': 'ˈwiːltʃer', 'whale': 'weɪl', 'february': 'ˈfebrueri', 'july': 'dʒuˈlaɪ', 'handmade': 'ˌhændˈmeɪd', 'peanut': 'ˈpiːnʌt', 'really': 'ˈriːəli', 'unusual': 'ʌnˈjuːʒuəl', 'usual': 'ˈjuːʒuəl', 'usually': 'ˈjuːʒuəli', 'center': 'ˈsentər', 'centre': 'ˈsentər', 'always': 'ˈɔːlweɪz', 'anyone': 'ˈeniwʌn', 'postman': 'ˈpoʊstmən', 'artist': 'ˈɑːrtɪst', 'dentist': 'ˈdentɪst', 'tourist': 'ˈtʊrɪst', 'excited': 'ɪkˈsaɪtɪd', 'knowledge': 'ˈnɑːlɪdʒ', 'yourself': 'jʊrˈself', 'ourselves': 'ɑːrˈselvz', 'themselves': 'ðəmˈselvz', 'education': 'ˌedʒuˈkeɪʃn', 'question': 'ˈkwestʃən', 'holiday': 'ˈhɑːlədeɪ', 'fog': 'fɑːɡ', 'coffee': 'ˈkɔːfi'}
UK2US = [('our', 'or'), ('tre', 'ter'), ('ise', 'ize'), ('ll', 'l'), ('ogue', 'og')]
def cmu_variants(k, cmu):
    if k in cmu: return [arpa2ipa(v) for v in cmu[k]]
    for a, b in UK2US:   # 英式拼写 → 美式再查
        if a in k and k.replace(a, b) in cmu: return [arpa2ipa(v) for v in cmu[k.replace(a, b)]]
    for i in range(3, len(k) - 2):   # 合成词：两段都在 CMUdict，第二段主重音降为次重音
        a, b = k[:i], k[i:]
        if a in cmu and b in cmu and len(a) > 2 and len(b) > 2:
            x = arpa2ipa(cmu[a][0]); y = arpa2ipa(cmu[b][0]).replace('ˈ', '').replace('ˌ', '')
            if not x.startswith('ˈ'): x = 'ˈ' + x
            return [tidy(x + y)]
    return []
def lev(a, b):
    d = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        prev, d[0] = d[0], i
        for j, cb in enumerate(b, 1):
            prev, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, prev + (ca != cb))
    return d[-1]

def wikt_ipa(w):
    p = WC / (urllib.parse.quote(w, safe='') + '.txt')
    if p.exists(): return p.read_text(encoding='utf-8')
    return None

def fetch(words):
    for w in words:
        p = WC / (urllib.parse.quote(w, safe='') + '.txt')
        if p.exists(): continue
        url = 'https://en.wiktionary.org/w/index.php?action=raw&title=' + urllib.parse.quote(w)
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'mengxing-edu-app/1.0 (phonetic check)'})
            t = urllib.request.urlopen(req, timeout=20).read().decode('utf-8')
        except urllib.error.HTTPError as e:
            t = '' if e.code == 404 else None
        except Exception:
            t = None
        if t is not None:
            m = re.search(r'==English==(.*?)(\n==[^=]|\Z)', t, re.S)
            ipas = re.findall(r'\{\{IPA\|en\|([^}]*)\}\}', m.group(1) if m else '')
            p.write_text('\n'.join(ipas), encoding='utf-8')
        time.sleep(1.0)

def norm(s):
    s = unicodedata.normalize('NFC', s).strip('/[] ')
    s = s.replace('ˈ', '').replace('ˌ', '').replace('.', '').replace('ː', '').replace('ɹ', 'r').replace('ɡ', 'g').replace('ɚ', 'ər').replace('ɝ', 'ɜr')
    s = s.replace('ɛ', 'e').replace('ɐ', 'ə').replace('ɾ', 't').replace('(', '').replace(')', '').replace('ʔ', 't').replace('ɫ', 'l').replace('ᵻ', 'ɪ').replace('ɒ', 'ɑ').replace('o', 'oʊ').replace('oʊʊ', 'oʊ')
    s = s.replace('l̩', 'əl').replace('n̩', 'ən').replace('m̩', 'əm').replace('\u0329', '')
    return s

def wikt_us(lines):
    """Wiktionary IPA 行 → 美式候选（a=US/GA/GenAm 优先；没有标注的也收）"""
    us, other = [], []
    for ln in lines.splitlines():
        parts = ln.split('|'); ipas = [x for x in parts if x.startswith('/')]
        acc = ' '.join(x for x in parts if x.startswith('a=') or x.startswith('a1=')).lower()
        (us if any(k in acc for k in ('us', 'ga', 'genam', 'canada')) else other).extend(ipas)
    return us, other

def report():
    db = vocab(); cmu = load_cmu()
    rows = []
    for w in db:
        if w.get('alias_of') or not is_cand(w): continue
        hs = heads(w['word']); cmu_ipa = []; ok_cmu = True
        wk = []
        for h in hs:
            t = wikt_ipa(h.strip(".,!?")) or wikt_ipa(h.lower().strip(".,!?")) or ''
            us, other = wikt_us(t); wk.append((us or other)[:1])
        for h, wkh in zip(hs, wk):
            k = h.lower().strip(".,!?'’")
            if k in OVERRIDE: cmu_ipa.append(OVERRIDE[k]); continue
            vs = cmu_variants(k, cmu)
            if not vs: ok_cmu = False; cmu_ipa.append(None); continue
            if len(vs) > 1 and wkh:   # 多个读音：取和 Wiktionary 美式最接近的那个
                vs = sorted(vs, key=lambda v: lev(norm(v), norm(wkh[0])))
            cmu_ipa.append(vs[0])
        wk_s = ' '.join(x[0].strip('/') for x in wk if x) if all(wk) else ''
        cm_s = ' '.join(cmu_ipa) if ok_cmu else ''
        agree = bool(cm_s and wk_s and norm(cm_s).replace(' ', '') == norm(wk_s).replace(' ', ''))
        new = cm_s or wk_s
        if new and norm(new).replace(' ', '') == norm(w['phonetic']).replace(' ', ''): continue   # 本来就是真音标（/pen/ /red/）
        rows.append({'id': w['id'], 'word': w['word'], 'old': w['phonetic'], 'cmu': cm_s, 'wikt': wk_s, 'agree': agree, 'new': ('/' + new + '/') if new else ''})
    (LAB / 'phon_fix.json').write_text(json.dumps(rows, ensure_ascii=False, indent=0), encoding='utf-8')
    n = len(rows); a = sum(r['agree'] for r in rows); nn = sum(1 for r in rows if not r['new'])
    print('fake', n, 'agree', a, 'no source', nn)
    # 白名单：读音本来就和拼写同形的词（phoncheck 放行）
    same = sorted({w['word'].lower() for w in db if is_cand(w) and w['id'] not in {r['id'] for r in rows}})
    (LAB / 'phon_same_ok.json').write_text(json.dumps(same, ensure_ascii=False), encoding='utf-8')
    md = ['# 决策 35 A1 · 假音标修复对照表', '',
          f'- 假音标 {n} 个（音标 = 拼写套斜杠，或只有 ASCII 字母且与 CMUdict 读音不同）；白名单（读音本来与拼写同形，如 pen、red）{len(same)} 个，见 `phon_same_ok.json`。',
          '- 新音标：CMUdict（ARPAbet → IPA，美式、长音带 ː，与词库原有真音标同一口径）；同一词 CMUdict 有多个读音时取与 Wiktionary 美式最接近的；多音词 / CMUdict 首选读音不常用的 ' + str(len(OVERRIDE)) + ' 个人工定（`phon_gen.py` OVERRIDE，多音词两个读音都列，如 close /kloʊz/ /kloʊs/）。',
          f'- 与 Wiktionary 美式读音逐音素一致（忽略重音、长音符号）：{a} 个；不一致多为弱读 ə / ɪ、英美差异、次重音写法，未逐个改；CMUdict 没有的 {sum(1 for r in rows if not r["cmu"])} 个用 Wiktionary 或合成词拆分。', '',
          '| id | 词 | 改前 | 改后 | CMUdict | Wiktionary | 一致 |', '|---|---|---|---|---|---|---|']
    for r in rows: md.append(f"| {r['id']} | {r['word']} | {r['old']} | {r['new']} | {r['cmu']} | {r['wikt']} | {'✅' if r['agree'] else ''} |")
    (LAB / 'PHON_FIX.md').write_text('\n'.join(md) + '\n', encoding='utf-8')
    return rows

if __name__ == '__main__':
    if sys.argv[1] == 'fetch':
        db = vocab(); ws = sorted({h.strip(".,!?") for w in db if not w.get('alias_of') and is_cand(w) for h in heads(w['word'])})
        print(len(ws), 'words'); fetch(ws); print('done')
    else: report()
