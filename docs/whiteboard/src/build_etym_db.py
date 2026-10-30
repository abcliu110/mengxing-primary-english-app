"""build_etym_db.py —— 由 parsed.json 生成 ETYM_DB / MORPH_DB（决策 25，HANDOFF §5.1 ⑥d / ⑥e），写进主文件 + 出核对报告。
只收「Wiktionary 和 Etymonline 互相印证」的条目（parse_etym.py 的 verify）；其余不入库，在报告里逐词写原因。
用法：python3 src/build_etym_db.py etym|morph [--dry]
  etym  → 主文件 <script type="application/json" id="ETYM_DB_JSON">，报告 word_origins/ETYM_REVIEW.md
  morph → 主文件 <script type="application/json" id="MORPH_DB_JSON">，报告 word_origins/MORPH_REVIEW.md
条目字段（短键省体积）：
  ETYM_DB[词] = {k: 类型(native|loan|other), c: [[语言中文, 词形, 英文释义], …](新→旧，已截到最后一个对上的级别), w: Wiktionary 词条名, e: Etymonline 词条名}
  MORPH_DB[词] = {k: compound|affix, p: [[部分, 中文义或空], …], w, e}"""
import json, re, sys, pathlib, html
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from parse_etym import LANG, norm
C = pathlib.Path('/workspace/work/etym'); ROOT = pathlib.Path(__file__).resolve().parents[3]
APP = ROOT / '萌星小学英语_最终合并版.html'; WO = ROOT / 'docs/whiteboard/word_origins'
V = json.load(open(C / 'vocab.json')); P = json.load(open(C / 'parsed.json'))
mean = {w['word'].strip().lower(): w['meaning'] for w in V}
NATIVE = {'enm', 'ang', 'gmw-pro', 'gem-pro', 'ine-pro'}
AFFIX = {  # 常见英语词缀的中文义（只收意思单一、不会讲错的；其余部分义留空）
 '-er': None, '-ful': '充满……的', '-less': '没有……的', '-ly': '……地 / 有……样子的', '-ness': '（变名词）……的状态', '-y': '有……的 / 多……的',
 '-ing': '（动名词 / 进行）', '-ed': '（过去 / 被……的）', '-est': '最……', '-ment': '（变名词）', '-tion': '（变名词）', '-ion': '（变名词）', '-able': '能被……的',
 '-ish': '有点……的 / ……国的', '-th': '（序数 / 变名词）', '-teen': '十几', '-ty': '几十', '-ist': '……的人（专家）', '-ian': '……的人', '-or': '……的人 / 物',
 'un-': '不 / 反', 're-': '再 / 回', 'dis-': '不 / 相反', 'im-': None, 'in-': None, 'over-': '在上 / 过度', 'under-': '在下', 'out-': '向外 / 超过', 'mis-': '错误地',
 '-s': None, '-es': None,   # 2026-10-30：-s 不一定是复数（always 的 -s 是副词词尾），不给义，免得讲错
 '-en': '（变动词 / 材料）', '-ward': '向……', '-self': '……自己', '-day': '……日',
}
def morph_entry(word, r):
    m = r.get('morph'); v = r.get('verify', {})
    if not m or not v.get('morph_ok') or m.get('lang') != 'en' or m['type'] in ('clipping', 'clip', 'blend'): return None
    parts = []
    for p in m['parts']:
        g = mean.get(p.lower().strip('-')) if not (p.startswith('-') or p.endswith('-')) else AFFIX.get(p.lower())
        if p.lower() == '-er': g = '比较级（更……）' if (mean.get(word.lower(), '').startswith('更')) else None
        parts.append([p, g or ''])
    real_affix = any((p.startswith('-') or p.endswith('-')) and p.strip('-') not in ('s', 'n') for p, _ in parts)   # -s- 之类连接成分不算词缀
    return {'k': 'affix' if real_affix else 'compound', 'p': parts}
def etym_entry(word, r):
    v = r.get('verify', {}); n = v.get('chain_ok', 0)
    if not n: return None
    ch = r['chain'][:n]
    langs = [c[1] for c in ch]
    if all(l in NATIVE for l in langs): k = 'native' if 'ang' in langs else 'other'
    else: k = 'loan'
    if all(l == 'enm' for l in langs): return None   # 只追到中古英语（多半同形）：没有信息量，不入库
    cg = lambda g: re.sub(r'\s+', ' ', re.sub(r"''+|\"", '', g)).strip(' ,;')   # 去 wiki 斜体标记和残留引号（black 的释义曾显示成 dark", ''also'' "ink）
    return {'k': k, 'c': [[LANG[c[1]][0], c[2], cg(c[3])] for c in ch]}
def reason(word, r):
    if ' ' in word.strip() or '/' in word: return '词组 / 多词条目（词组不单独溯源）'
    if r.get('status') == 'not_fetched': return 'Wiktionary 未抓到'
    if not r.get('has_wikt_ety'): return 'Wiktionary 无英语词源小节'
    ef = C / 'etymo' / (re.sub(r'[^A-Za-z0-9_-]', '_', word) + '.txt')
    if not ef.exists(): return 'Etymonline 尚未抓取（存档抓取进行中，抓完重跑）'
    if not ef.stat().st_size: return 'Etymonline 无词条（或存档无快照）'
    if not r.get('chain') and not r.get('morph'): return 'Wiktionary 词源无可解析的来源链 / 构词模板'
    return 'Wiktionary 与 Etymonline 的语言名 + 词形对不上（不入库，避免讲错）'
def patch(block_id, data):
    s = APP.read_text(encoding='utf-8')
    js = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    tag = f'<script type="application/json" id="{block_id}">'
    if tag in s:
        i = s.index(tag); j = s.index('</script>', i); s = s[:i] + tag + js + s[j:]
    else:
        anchor = '<script type="text/plain" id="wb5html-'
        assert s.count(anchor) >= 1; i = s.index(anchor)
        s = s[:i] + tag + js + '</script>\n' + s[i:]
    __import__('appwrite').save(s)   # O8：写前锚点检查、写后 jscheck，不过就还原
if __name__ == '__main__':
    mode = sys.argv[1]; dry = '--dry' in sys.argv
    db, miss = {}, []
    for w in V:
        word = w['word'].strip(); r = P.get(word, {}); e = (etym_entry if mode == 'etym' else morph_entry)(word, r) if r.get('verify') else None
        if e:
            e['w'] = word; e['e'] = word.lower().replace(' ', '-'); db[word] = e
        elif mode == 'etym': miss.append((w['id'], word, reason(word, r)))
    if mode == 'morph' and (WO / 'AFFIX_WORDS.json').exists():   # 决策 34-A：build_affix_db.py 核实过的词库派生词并进来（已有条目不覆盖）
        AW = json.loads((WO / 'AFFIX_WORDS.json').read_text(encoding='utf-8')); added = 0
        AZ = {k.strip(): y['zh'] for y in AW['affixes'] + AW['zero'] for k in [y['affix']] + y['affix'].replace('(', '/').replace(')', '').split('/')}
        for x in AW['affixes']:
            for word, wid, split, ev in x['words']:
                if word in db: continue
                parts = [q.strip() for q in split.split(' + ')]
                db[word] = {'k': 'affix', 'p': [[q, AZ.get(q, '') if (q.startswith('-') or q.endswith('-') or q in AZ) else mean.get(q.lower(), '')] for q in parts], 'w': word, 'e': word.lower()}; added += 1
        print('morph + AFFIX_WORDS', added)
    grade = lambda i: i.split('_')[0]
    by = {}
    for w in V: by.setdefault(grade(w['id']), [0, 0]); by[grade(w['id'])][0] += 1; by[grade(w['id'])][1] += w['word'].strip() in db
    title = '词源 ETYM_DB' if mode == 'etym' else '真实构词 MORPH_DB'
    out = [f'# {title} 核对报告（决策 25）\n\n> 由 `src/build_etym_db.py {mode}` 生成。来源：Wiktionary（原始 wikitext）+ Etymonline（经 Wayback Machine 存档读取）。'
           '入库条件：两处的「语言名 + 词形」逐级对上（来源链截到最后一个对上的级别）；构词则各部分都在 Etymonline 正文出现。不确定的一律不入库。\n',
           f'\n## 数字\n\n- 入库 **{len(db)}** / 1487 词\n' + ''.join(f'- {g}：{b} / {a}\n' for g, (a, b) in by.items())]
    if mode == 'etym':
        from collections import Counter
        out.append('\n## 未入库原因\n\n| 原因 | 词数 |\n|---|---|\n' + ''.join(f'| {k} | {n} |\n' for k, n in Counter(x[2] for x in miss).most_common()))
        out.append('\n## 未入库词表（逐词）\n\n| id | 词 | 原因 |\n|---|---|---|\n' + ''.join(f'| {a} | {b} | {c} |\n' for a, b, c in miss))
        out.append('\n## 入库词表\n\n| 词 | 类型 | 来源链（新 → 旧） |\n|---|---|---|\n' + ''.join(
            f"| {k} | {e['k']} | {' ← '.join(c[0] + ' ' + c[1] + (('（' + c[2] + '）') if c[2] else '') for c in e['c'])} |\n" for k, e in db.items()))
    else:
        out.append('\n## 入库词表\n\n| 词 | 类型 | 拆分 |\n|---|---|---|\n' + ''.join(f"| {k} | {e['k']} | {' + '.join(p + ('（' + g + '）' if g else '') for p, g in e['p'])} |\n" for k, e in db.items()))
    (WO / ('ETYM_REVIEW.md' if mode == 'etym' else 'MORPH_REVIEW.md')).write_text(''.join(out), encoding='utf-8')
    if not dry: patch('ETYM_DB_JSON' if mode == 'etym' else 'MORPH_DB_JSON', db)
    print(mode, 'entries', len(db), 'miss', len(miss), 'bytes', len(json.dumps(db, ensure_ascii=False, separators=(',', ':'))))
