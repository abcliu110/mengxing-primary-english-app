"""build_affix_db.py —— 决策 34-A：词根词缀实例从 1487 词全量取（用户 2026-10-31 02:36「应该在单词集合中取，有多少取多少」）。
输入：词库全量扫描 + Wiktionary / Etymonline 核实结果（仓库外分析 /workspace/work/d34/affix.json，生成脚本同目录 affix_scan.py；缓存在 /workspace/work/etym/）。
输出（进仓库）：
  word_origins/AFFIX_WORDS.json —— 每个词缀挂的全部词库派生词 [词, id, 拆分, 出处]；词库里没有真派生词的词缀；待定（历史拆分 ⚠️ / 屈折形式）。
  word_origins/AFFIX_REVIEW.md —— 每个词缀的词数表、0 词词缀、待定与排除。
收录口径：分解经 Wiktionary 词源模板或 Etymonline 原句核实；现代英语透明可分（含「整词借入但现代可按词缀分析」的 waiter / leader 类）；
  不收「历史拆分 ⚠️」（but = be- + out、any = one + -y 这类小学生看不出关系的，待用户定）和屈折形式（复数 / 比较级 / 过去分词，不算派生）。
build_etym_db.py morph 会把这里的派生词并进 MORPH_DB（MORPH_DB 已有的词不覆盖）。"""
import json, pathlib, sys, collections
ROOT = pathlib.Path(__file__).resolve().parents[3]; WO = ROOT / 'docs/whiteboard/word_origins'
SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '/workspace/work/d34/affix.json')
A = json.loads(SRC.read_text())
keep = lambda w: w['transparency'] in ('透明', '表层可分析') and not w['uncertain'] and not w['level'].startswith('Wiktionary 屈折')
out = {'affixes': [], 'zero': [], 'pending': []}
for x in A['affixes']:
    ws = [w for w in x['words'] if keep(w)]
    for w in x['words']:
        if not keep(w): out['pending'].append([x['affix'], w['word'], w['id'], w['split'], w['transparency'] + ('·不确定' if w['uncertain'] else ''), w['evidence']])
    if ws: out['affixes'].append({'affix': x['affix'], 'type': x['type'], 'zh': x['zh'], 'words': [[w['word'], w['id'], w['split'], w['evidence']] for w in ws]})
    else: out['zero'].append({'affix': x['affix'], 'type': x['type'], 'zh': x['zh'], 'note': '词库里没有真派生词' if not x['words'] else '词库里的候选词都是历史拆分 / 屈折形式（见待定）'})
(WO / 'AFFIX_WORDS.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
n = sum(len(x['words']) for x in out['affixes']); nw = len({w[0] for x in out['affixes'] for w in x['words']})
md = [f"# 词根词缀实例核对报告（决策 34-A）\n\n> 由 `src/build_affix_db.py` 生成（2026-10-31）。对 1487 词全量扫描，分解经 Wiktionary 词源模板或 Etymonline 原句核实才收；只用词库里的词，不设上限。\n\n",
      f"## 数字\n\n- 有词库派生词的词缀 **{len(out['affixes'])}** 个，共 **{n}** 对（{nw} 个词）\n- 词库里没有真派生词的词缀 **{len(out['zero'])}** 个（单列，不硬凑）\n- 待定 {len(out['pending'])} 对（历史拆分 ⚠️ / 屈折形式，未上 App）\n\n",
      "## 每个词缀的词数\n\n| 词缀 | 类型 | 意思 | 词数 | 词 |\n|---|---|---|---|---|\n"]
for x in sorted(out['affixes'], key=lambda x: -len(x['words'])):
    md.append(f"| {x['affix']} | {'前缀' if x['type'] == 'prefix' else '后缀'} | {x['zh']} | {len(x['words'])} | {'、'.join(w[0] for w in x['words'])} |\n")
md.append("\n## 词库里没有真派生词的词缀\n\n| 词缀 | 意思 | 说明 |\n|---|---|---|\n" + ''.join(f"| {x['affix']} | {x['zh']} | {x['note']} |\n" for x in out['zero']))
md.append("\n## 待定（未上 App，需用户定）\n\n| 词缀 | 词 | id | 拆分 | 类别 | 出处 |\n|---|---|---|---|---|---|\n" + ''.join(f"| {' | '.join(map(str, p))} |\n" for p in out['pending']))
md.append("\n## 排除的假派生（形式含词缀，但不是派生）\n\n| 词缀 | 词 | 原因 |\n|---|---|---|\n" + ''.join(f"| {x['affix']} | {e['word']} | {e['reason']} |\n" for x in A['affixes'] for e in x.get('excluded', [])))
(WO / 'AFFIX_REVIEW.md').write_text(''.join(md), encoding='utf-8')
print('affixes', len(out['affixes']), 'pairs', n, 'words', nw, 'zero', len(out['zero']), 'pending', len(out['pending']))
