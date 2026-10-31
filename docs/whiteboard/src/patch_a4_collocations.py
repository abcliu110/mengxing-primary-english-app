"""patch_a4_collocations.py —— 决策 35-A4（含 35-A3「搭配栏不再读例句」、R37-03）：词卡「常用搭配」只留真实搭配（幂等，走 appwrite）。
现状：collocations.adjs 882 词是模板「a X / the X / my X」，188 词放的是整句；collocations.verbs 1245 条是整句（1268 词与 senses[0] 例句逐字相同）、46 条「Morph form: X」占位。没有一条是真搭配。
改法：模板 / 「Morph form」占位删掉；整句与本词例句重复的删掉，不重复的（约 200 句）搬进新字段 more_ex（R1 不丢句），词卡显示「📝 更多例句」；
collocations 为空的词，词卡 / 主题页头 / 交互导图都不显示搭配栏（COLLOC_A4_V1）。真实形容词搭配（可核实来源）以后补进 collocations.adjs 即自动显示。
检查：src/datacheck.py（A4 段）。"""
import json, re, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent)); import appwrite
s = appwrite.APP.read_text(encoding='utf-8')
TAG = '<script type="application/json" id="VOCAB_HEAVY_JSON">'
a = s.index(TAG) + len(TAG); b = s.index('</script>', a); H = json.loads(s[a:b])
SENT = lambda x: bool(re.search(r'[.!?。！？]$', x.strip()))
def tpl(adjs): return len(adjs) == 3 and adjs[0].startswith('a') and adjs[1].startswith('the ') and adjs[2].startswith('my ') and adjs[1][4:] == adjs[2][3:]
st = dict(tpl=0, morph=0, dup=0, moved=0)
for k, v in H.items():
    c = v.get('collocations')
    if not isinstance(c, dict): continue
    exs = {(x.get('ex_en') or '').strip() for x in v.get('senses') or []} | {(v.get('example_en') or '').strip()}
    more = list(v.get('more_ex') or [])
    adjs = c.get('adjs') or []
    if tpl(adjs): st['tpl'] += 1; adjs = []
    for key, lst in (('verbs', c.get('verbs') or []), ('adjs', adjs)):
        keep = []
        for x in lst:
            if x.startswith('Morph form'): st['morph'] += 1
            elif SENT(x):
                if x.strip() in exs or x in more: st['dup'] += 1
                else: more.append(x); st['moved'] += 1
            else: keep.append(x)
        c[key] = keep
    if more: v['more_ex'] = more
s = s[:a] + json.dumps(H, ensure_ascii=False, separators=(',', ':')) + s[b:]
MARK = 'COLLOC_A4_V1'
if MARK not in s:
    K = '"polysemy_data", "example_en", "memory_assoc"]'
    assert s.count(K) == 2, s.count(K)
    s = s.replace(K, '"polysemy_data", "example_en", "memory_assoc", "more_ex"]')
    A = '🔗 常用搭配动词：${(w.collocations?.verbs||[]).join(" / ")} ｜ 形容词：${(w.collocations?.adjs||[]).join(" / ")}'
    if A not in s:   # patch_a3_examples 已改过的版本
        A = '${(w.collocations?.verbs||[]).length ? `🔗 常用搭配动词：${w.collocations.verbs.join(" / ")} ｜ ` : "🔗 "}形容词：${(w.collocations?.adjs||[]).join(" / ")}'
    assert s.count(A) == 1, 'modal colloc'
    s = s.replace(A, '${[(w.collocations?.verbs||[]).length ? `🔗 常用搭配动词：${w.collocations.verbs.join(" / ")}` : "", (w.collocations?.adjs||[]).length ? `🔗 常用搭配：${w.collocations.adjs.join(" / ")}` : "", (w.more_ex||[]).length ? `📝 更多例句：${w.more_ex.join(" / ")}` : ""].filter(Boolean).join(" ｜ ")}<!-- COLLOC_A4_V1：搭配栏只放真实搭配，空就不显示（决策 35-A4） -->')
    B = '''          🔗 <strong>高频搭配动词：</strong>${colloc.verbs.join(" / ")} ｜ ✨ <strong>常用评价形容词：</strong>${colloc.adjs.join(" / ")}'''
    assert s.count(B) == 1, 'theme head'
    s = s.replace(B, '''          ${[(colloc.verbs||[]).length ? `🔗 <strong>高频搭配动词：</strong>${colloc.verbs.join(" / ")}` : "", (colloc.adjs||[]).length ? `✨ <strong>常用评价形容词：</strong>${colloc.adjs.join(" / ")}` : ""].filter(Boolean).join(" ｜ ")}''')
    C = 'const colloc = subWords[0]?.collocations || { verbs: ["use (使用)", "see (看见)"], adjs: ["good (好的)", "nice (不错的)"] };'
    assert s.count(C) == 1, 'colloc fallback'
    s = s.replace(C, 'const colloc = subWords[0]?.collocations || { verbs: [], adjs: [] };   // COLLOC_A4_V1：不再用「use / see / good / nice」假搭配兜底')
    D = '  ctx.roundRect(vBoxX - 70, vBoxY - 44, 140, 88, 14);\n  ctx.fill(); ctx.stroke();'
    assert s.count(D) == 1, 'mm verbs box'
    i = s.index(D); j = s.rindex('\n', 0, s.rindex('const vBoxX = centerX - 172', 0, i)) + 1
    E = '  adjs.slice(0, 3).forEach((a, i) => ctx.fillText(a, aBoxX, aBoxY - 5 + i * 17));\n'
    e = s.index(E, i) + len(E)
    s = s[:j] + '  if (verbs.length || adjs.length) {   // COLLOC_A4_V1：没有真实搭配就不画两框\n' + s[j:e] + '  }\n' + s[e:]
appwrite.save(s); print(st)
