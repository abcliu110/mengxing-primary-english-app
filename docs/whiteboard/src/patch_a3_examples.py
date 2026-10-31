"""patch_a3_examples.py —— 决策 35-A3：445 个 V6 扩展词占位例句换成真例句（幂等，走 appwrite）。
数据：lab/audit35/a3/b1–b4.tsv（词 \t 英文 \t 中文，顺序 = VOCAB_HEAVY_JSON 里含占位例句的词条顺序；写入前按词头逐条核对）。
改动：senses[0].ex_en / ex_zh、example_en / example_zh ← 真例句；collocations.verbs 里的占位句删掉；affix_root「课标关联：…」占位清空；
词卡「🧩 构词与词族规律」为空不显示、「🔗 常用搭配动词」为空不显示（WORDCARD_A3_V1）。检查：src/datacheck.py。"""
import json, re, glob, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent)); import appwrite
ROOT = pathlib.Path(__file__).resolve().parents[1]
s = appwrite.APP.read_text(encoding='utf-8')
TAG = '<script type="application/json" id="VOCAB_HEAVY_JSON">'
a = s.index(TAG) + len(TAG); b = s.index('</script>', a)
H = json.loads(s[a:b])
PH = lambda t: bool(t) and ('in a sentence!' in t or '核心考点词【' in t)
rows = [l.rstrip('\n').split('\t') for f in sorted(glob.glob(str(ROOT / 'lab/audit35/a3/b*.tsv'))) for l in open(f, encoding='utf-8') if l.strip()]
EX = {w: (en, zh) for w, en, zh in rows}
n = nv = na = 0
light = {}   # id → 词头（VOCAB_DB 里没有的 3 个词条按 meaning 认）
for m in re.finditer(r'\{"id":"([^"]+)"(?:,"[a-z_]+":(?:"[^"]*"|null|true|false|[0-9]+))*?,"word":"([^"]+)"', s): light.setdefault(m.group(1), m.group(2))
EXTRA = {'V6_颜色_1': 'color', 'V6_颜色_12': 'gray', 'V6_核心_14': 'its'}
for k, v in H.items():
    sen = v.get('senses') or []
    if sen and PH(sen[0].get('ex_en')):
        w = EXTRA.get(k) or light.get(k)
        if w not in EX: sys.exit(f'缺例句：{k} {w}')
        en, zh = EX[w]; sen[0]['ex_en'] = en; sen[0]['ex_zh'] = zh; n += 1
    if PH(v.get('example_en')) or PH(v.get('example_zh')):
        w = EXTRA.get(k) or light.get(k); en, zh = EX[w]; v['example_en'] = en; v['example_zh'] = zh
    c = v.get('collocations') or {}
    if c.get('verbs') and any(PH(x) for x in c['verbs']): c['verbs'] = [x for x in c['verbs'] if not PH(x)]; nv += 1
    if (v.get('affix_root') or '').startswith('课标关联：'): v['affix_root'] = ''; na += 1
s = s[:a] + json.dumps(H, ensure_ascii=False, separators=(',', ':')) + s[b:]
MARK = 'WORDCARD_A3_V1'
if MARK not in s:
    A = '''          <div style="background:#fff; padding:12px 14px; border-radius:12px; border-left:4px solid #7c3aed;">
            <div style="font-weight:900; color:#5b21b6; font-size:0.9rem;">🧩 构词与词族规律</div>
            <div style="font-size:0.9rem; color:#334155; margin-top:4px;">${w.affix_root}</div>
          </div>'''
    assert s.count(A) == 1, s.count(A)
    s = s.replace(A, '          ${w.affix_root ? `' + A.strip() + '` : ""}<!-- WORDCARD_A3_V1：占位构词栏为空时不显示（决策 35-A3） -->')
    B = '🔗 常用搭配动词：${(w.collocations?.verbs||[]).join(" / ")} ｜ 形容词：'
    assert s.count(B) == 1, s.count(B)
    s = s.replace(B, '${(w.collocations?.verbs||[]).length ? `🔗 常用搭配动词：${w.collocations.verbs.join(" / ")} ｜ ` : "🔗 "}形容词：')
appwrite.save(s); print(f'例句 {n}，搭配占位 {nv}，构词占位 {na}')
