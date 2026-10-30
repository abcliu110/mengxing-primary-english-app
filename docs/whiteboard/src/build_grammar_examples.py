"""build_grammar_examples.py —— 决策 34-B：语法例句从全部单词 / 日常用语 / 各模块英文句里取（用户 2026-10-31 02:36「有多少取多少」）。
输入：仓库外分析 /workspace/work/d34/grammar.json（句池 2173 句去重；spaCy + 规则判定语法特征、句型、人称；脚本 grammar_classify.py / grammar_review.py 同目录）。
输出（进仓库）：lab/GRAMMAR_EXAMPLES.json（每个语法点 [英文, 句型, 人称, 来源]）+ lab/GRAMMAR_EXAMPLES_REVIEW.md（每点数量表，少于 5 句单列）。
收录口径：自动判定命中且人工抽查保留（kept）；「词汇只用词库里的词」= 实词都在 VOCAB_DB（as / than / so / very / not 这类功能词放过——词库本来就没收功能词）。"""
import json, pathlib, sys, collections
ROOT = pathlib.Path(__file__).resolve().parents[3]; LAB = ROOT / 'docs/whiteboard/lab'
G = json.loads(pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '/workspace/work/d34/grammar.json').read_text())
F = {'as', 'than', 'so', 'too', 'very', 'not', 'no', 'yes', 'oh', 'please', 'ever', 'also', 'just', 'then', 'here', 'there', 'well', 'ok', 'okay', 'wow', 'hi', 'hello'}
out, rows, drop = {}, [], collections.Counter()
for p in G['points']:
    ks = [s for s in p['sentences'] if all(o.lower() in F for o in s['oov'])]
    drop[p['id']] = len(p['sentences']) - len(ks)
    out[p['id']] = [[s['en'], s['stype'], s['person'], s['sources'][0].split(':')[0]] for s in ks]
    c = collections.Counter(s['stype'] for s in ks)
    rows.append((p['id'], p['title'], len(ks), c, p['existing'].get('step1_story_sentences', 0), p['feature']))
(LAB / 'GRAMMAR_EXAMPLES.json').write_text(json.dumps(out, ensure_ascii=False, indent=0), encoding='utf-8')
md = ['# 语法例句全量取核对报告（决策 34-B）\n\n> 由 `src/build_grammar_examples.py` 生成（2026-10-31）。句池：词库例句、日常用语 144 句、GRAMMAR_DB 和各模块英文句，去重后 ',
      f"{G['meta']['pool_total']} 句；按语法特征自动筛选 + 人工抽查，再去掉含词库外实词的句子。每句在 App 里都能点读。\n\n",
      f"## 数字\n\n- 共 **{sum(len(v) for v in out.values())}** 句（一句可属多个语法点）\n- 少于 5 句的语法点：{'、'.join(r[0] for r in rows if r[2] < 5) or '无'}\n- 少于 15 句的：{'、'.join(f'{r[0]}（{r[2]}）' for r in rows if r[2] < 15)}\n\n",
      '## 每个语法点\n\n| 点 | 名称 | 句数 | 肯定 | 否定 | 疑问 | 祈使 | 感叹 | 原有例句 | 因含词库外实词去掉 | 判定特征 |\n|---|---|---|---|---|---|---|---|---|---|---|\n']
for gid, t, n, c, ex, feat in rows:
    md.append(f"| {gid}{' ⚠️' if n < 5 else ''} | {t} | {n} | {c.get('肯定', 0)} | {c.get('否定', 0)} | {c.get('疑问', 0)} | {c.get('祈使', 0)} | {c.get('感叹', 0)} | {ex} | {drop[gid]} | {feat.replace('|', '／')} |\n")
md.append('\n## 说明与待定\n\n- 词库没收 a / the / be / can / will 等功能词，也没有 now、last、great、nice、let 等常用词，按「每个词都在词库」严格口径只有约 1/3 的句子能过；这里用「实词都在词库」口径。要不要把这些常用词补进词库，需用户定。\n'
          '- G05 只收 an 和「a + u 读 /juː/」的句子，G08 只收名词性物主代词和 Whose 问句（普通 a、my 的句子太多、不典型）。\n'
          '- G16、G18、G14、G33、G01、G11 几百句的大点只做了自动清理（混时态、超长句、套语、片段）+ 抽查，没有逐句通读。\n')
(LAB / 'GRAMMAR_EXAMPLES_REVIEW.md').write_text(''.join(md), encoding='utf-8')
print('sentences', sum(len(v) for v in out.values()), 'low<5', [r[0] for r in rows if r[2] < 5])
