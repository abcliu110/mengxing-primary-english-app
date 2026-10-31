"""fix36_trunc.py —— 决策 36 ①3：语法白板（hd_g*）截断句、`**` / 反引号残留、底部字幕放口诀。
- 旧 HD 剧场导出清单时把 GRAMMAR_DB 的长句按字数硬截（「……在中间垫一个鼻音 n 变成」），v5 照抄上了黑板。
  本脚本把每条白板字（去掉「① 典型语境：」「② 核心结构规律：」「③ 进阶要点：」标签后）若是 GRAMMAR_DB 某字段的前缀，
  就补回整句，并按语义拆行（先按换行 / 条目，再在长段里按 。！？； 断开），不按字数截。
- 剥掉 `**` 和反引号（Markdown 原始标记）。
- 末句朗读的中文原是口诀 → 改成这句英文的译文（取 step1_zh 对应的句子，个别手工校），口诀进讲解字幕（'n'，🎵 口诀：…）保留。
- 内容全部取自主文件 GRAMMAR_DB，不新编。决策 38 样板幕（G05、G07、G14、G18、G19、G37–G39）归道 r38，本脚本不碰。
- 幂等：重跑不再改。对照表 lab/audit36/R1_36_3_TRUNC.md。"""
import os, re, json, glob, sys
HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html')
LAB = os.path.join(HERE, '..', 'lab', 'audit36')
SKIP = {'G05', 'G07', 'G14', 'G18', 'G19', 'G37', 'G38', 'G39'}   # 决策 38 样板（道 r38）
DB = {g['id']: g for g in json.loads(re.search(r'const GRAMMAR_DB = (\[.*?\]);\n', open(APP, encoding='utf-8').read()).group(1))}
clean = lambda s: s.replace('**', '').replace('`', '')
LABELS = ['① 典型语境：', '② 核心结构规律：', '③ 进阶要点：']
# 末句译文：按句数从 step1_zh 取；下列手工校（step1_zh 句子和英文句数对不上的）
ZH_FIX = {
 'G32': '天气怎么样？（无 like 用 How = 有 like 用 What）',
 'G36': '我们房子前面有一个大花园。',
 'G24': '明天是周六，我打算去看望祖父母。',
}
q = lambda s: "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
def L(it): return '  [' + ', '.join(q(x) for x in it) + ']'
def ev(line): return tuple(x.replace("\\'", "'").replace('\\\\', '\\') for x in re.findall(r"'((?:[^'\\]|\\.)*)'", line))
def fields(g):
    d = DB[g]; out = [d['why_explanation'], d['subtitle'], d['step1_zh'], d['chant'], *d['step1_story'], *d['step3_rules']]
    return [clean(x) for x in out]
def split_sem(s, lim=70):
    parts = []
    for seg in s.split('\n'):
        seg = seg.strip()
        if not seg: continue
        if len(seg) <= lim: parts.append(seg); continue
        pcs = []   # 在 。！？； 和 】 后断开，右括号 / 引号跟着前一段；以逗号开头的段并回前一段
        for piece in re.findall(r'[^。！？；】]*(?:[。！？；]+[）」』”’)]*|】)?', seg):
            if not piece: continue
            if pcs and re.match(r'^[,，、）)」』”’！!。？?；：:\s]', piece): pcs[-1] += piece
            else: pcs.append(piece)
        cur = ''
        for piece in pcs:
            if cur and len(cur) + len(piece) > lim: parts.append(cur.strip()); cur = piece
            else: cur += piece
        if cur.strip(): parts.append(cur.strip())
    return parts
def zh_for(g, en):
    if g in ZH_FIX: return ZH_FIX[g]
    n = max(1, len(re.findall(r'[.!?](?=\s|$|\))', en)))
    zs = re.findall(r'[^。！？]+[。！？]?', DB[g]['step1_zh'])
    return ''.join(zs[:n]).strip()
rows = []; changed = 0
for f in sorted(glob.glob(os.path.join(HERE, 'scenes', 'hd_g[0-9][0-9]_*.js'))):
    stem = os.path.basename(f)[:-3]; g = stem[3:6].upper()
    if g in SKIP: continue
    src = open(f, encoding='utf-8').read()
    if 'fix36_trunc' in src: continue
    m = re.search(r'const ITEMS = \[\n(.*?)\n\];', src, re.S); its = [ev(x.rstrip(',')) for x in m.group(1).split('\n')]
    F = fields(g); out = []; log = []
    for it in its:
        if it[0] != 'w': out.append(tuple(clean(x) for x in it)); continue
        a = clean(it[1]); p = next((x for x in LABELS if a.startswith(x)), ''); rem = a[len(p):]
        full = next((x for x in F if len(rem) >= 8 and len(x) > len(rem) and x.startswith(rem)), None)
        if full is None:
            out.append(('w', a))
            if a != it[1]: log.append(f'剥标记：{it[1][:40]}')
            continue
        ps = split_sem(full); ps[0] = p + ps[0]
        out += [('w', x) for x in ps]; log.append(f'补全：「{it[1][-24:]}」→ {len(ps)} 行（…{full[len(rem):len(rem) + 24]}…）')
    # 末句：口诀 → 译文；口诀进讲解字幕
    chant = clean(DB[g]['chant'])
    for i in range(len(out) - 1, -1, -1):
        if out[i][0] == 's' and out[i][2] == chant:
            zh = zh_for(g, out[i][1]); out[i] = ('s', out[i][1], zh, *out[i][3:])
            out.append(('n', '🎵 口诀：' + chant)); log.append(f'末句字幕：口诀 → 译文「{zh}」'); break
    if not log: continue
    src = src[:m.start(1)] + '\n'.join(L(it) + ',' for it in out)[:-1] + src[m.end(1):]
    src = src.replace('\nimport ', '\n// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文\nimport ', 1)
    open(f, 'w', encoding='utf-8').write(src); changed += 1
    rows.append(f'| {stem} | ' + '<br>'.join(log) + ' |')
if rows:
    p = os.path.join(LAB, 'R1_36_3_TRUNC.md')
    head = ('# 决策 36 ①3 对照表：语法白板截断句补全 / 剥 Markdown / 字幕给译文（R1 纠错补全，只增不删）\n\n'
            '> 生成：`v5/fix36_trunc.py`。截断行补回 GRAMMAR_DB 原句并按语义拆行；`**`、反引号剥掉；末句中文由口诀改为译文，口诀进讲解字幕。'
            '决策 38 样板幕（G05、G07、G14、G18、G19、G37–G39）归道 r38，未改，在 `src/wbtextcheck.py` 白名单。\n\n| 幕 | 改动 |\n|---|---|\n')
    old = open(p, encoding='utf-8').read().split('|---|---|\n', 1)[1] if os.path.exists(p) else ''
    open(p, 'w', encoding='utf-8').write(head + old + '\n'.join(rows) + '\n')
print('changed', changed)
