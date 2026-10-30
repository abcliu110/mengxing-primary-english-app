#!/usr/bin/env python3
"""r2check.py [范围…] [--strict] [--all-items] [--summary] [--json 路径] [--html 主文件]
R2 朗读覆盖检查 + R4 动作覆盖检查（规则见 SOP §5、§7、§8）。

范围：all（默认）| lab | fp | wo | 具体 id（如 wo_port、bamboo_tree）。
在主文件里（有全部词库数据）逐幕执行 build，抽出画面上出现的全部英文：
  · 每个英文词 / 词块：✔读 = 单独朗读过（say 的 word）；✔句 = 有例句（say 的英文里出现）
  · 白板上的英文句子（≥3 个英文词）：必须被朗读
  · R4：案例 actionWords 分镜动作词清单 ↔ k.act 登记，且动作和含该词的朗读时间重叠
默认只列出缺的项；--all-items 列出每幕全部英文词清单。
--summary：最后按页签 / 幕 id 汇总（案例数、词、缺、句子、缺朗读、R4），按缺口从大到小排（旧幕推广清单用）。
--strict：所选范围里有任何缺项就返回 1（验收用）。
--r4v2：所选范围全部按 R4v2（决策 30）检查：动作词必须用 wb_verbs.js 的专属动作（k.verb）且语义对得上、actionWords 不能为空。
         案例对象写 r4v2: true 的，不加这个参数也按 R4v2 检查（新做 / 回改完的案例都要写）。
"""
import json, os, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
args = [a for a in sys.argv[1:]]
strict = '--strict' in args; r4v2 = '--r4v2' in args; all_items = '--all-items' in args; by_scene = '--summary' in args
jpath = args[args.index('--json') + 1] if '--json' in args else None
main = args[args.index('--html') + 1] if '--html' in args else os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
skip = {jpath, main}
scope = [a for a in args if not a.startswith('--') and a not in skip] or ['all']

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + main); pg.wait_for_timeout(800)
    pg.add_script_tag(path=os.path.join(HERE, 'r2check.js'))
    pg.evaluate("typeof wbLoadAll === 'function' && wbLoadAll()")   # 按需加载：先把全部模块执行
    ids = pg.evaluate('Object.keys(WB_LAB)')
    sel = []
    for s in scope:
        if s == 'all': sel += ids
        elif s == 'fp': sel += [i for i in ids if i.startswith('fp_')]
        elif s == 'wo': sel += [i for i in ids if i.startswith('wo_')]
        elif s == 'lab': sel += [i for i in ids if not i.startswith(('fp_', 'wo_'))]
        else: sel.append(s)
    sel = list(dict.fromkeys(sel))
    rep = pg.evaluate('([ids, v2]) => R2CHECK.run(ids, v2)', [sel, r4v2])
    b.close()

tot_w = tot_miss = tot_s = tot_smiss = tot_a = tot_amiss = 0
for r in rep:
    name = f"{r['id']} 第{r['i'] + 1}幕"
    if 'error' in r:
        print(f"✘ {name}: build 出错 {r['error']}"); tot_miss += 1; continue
    ws, ss = r['words'], r['sents']
    miss = [w for w in ws if not (w['read'] and w['sentence'])]
    smiss = [s for s in ss if not s['read']]
    am = [a for a in r['r4']['declared'] if not (a['registered'] and a['sync'])]
    tot_w += len(ws); tot_miss += len(miss); tot_s += len(ss); tot_smiss += len(smiss)
    tot_a += len(r['r4']['declared']); tot_amiss += len(am)
    flag = '✔' if not (miss or smiss or am) else '✘'
    print(f"{flag} {name}: 英文词/词块 {len(ws)} 个（缺 {len(miss)}）· 白板句子 {len(ss)} 句（缺朗读 {len(smiss)}）· 朗读 {r['says']} 句"
          + (f" · R4 动作词 {len(r['r4']['declared'])} 个（缺 {len(am)}）" if r['hasActionList'] else " · R4 未列动作词清单"))
    for w in (ws if all_items else miss):
        tag = '词块' if w['block'] else '单词'
        print(f"    {'✔' if w['read'] and w['sentence'] else '✘'} {w['raw']:<16} {tag} [{w['where']}]  "
              f"{'✔读' if w['read'] else '✘缺单独朗读'}  {'✔句' if w['sentence'] else '✘缺例句'}")
    for s in (ss if all_items else smiss):
        print(f"    {'✔' if s['read'] else '✘'} 句子 [{s['where']}] {s['text']}  {'✔已朗读' if s['read'] else '✘缺朗读'}")
    for a in r['r4']['declared']:
        if all_items or a in am:
            print(f"    {'✔' if a in r['r4']['declared'] and a not in am else '✘'} 动作词 {a['word']} → {a['act']}  "
                  f"{'✔已登记 ' + ','.join(a['acts']) if a['registered'] else '✘没有 k.act 登记'}  {'✔和朗读同步' if a['sync'] else '✘没和朗读重叠'}"
                  + (("  R4v2:" + ("✘ actionWords 为空" if a['v2'].get('empty') else (("✔" if a['v2']['semOK'] else f"✘ 语义不符（应为 {a['v2']['want']}）") + (" ✔专属动作" if a['v2']['verbOK'] else " ✘缺 k.verb 专属动作")))) if a.get('v2') else ""))
    if r['r4']['hints'] and (all_items or r['hasActionList']):
        print("    提示（例句里的动作动词，未在分镜动作词清单）：" + ", ".join(h['word'] for h in r['r4']['hints']))
print(f"\n合计：{len(rep)} 幕；英文词/词块 {tot_w} 个，缺 {tot_miss}；白板句子 {tot_s} 句，缺朗读 {tot_smiss}；R4 动作词 {tot_a} 个，缺 {tot_amiss}")
if by_scene:
    agg = {}
    for r in rep:
        a = agg.setdefault(r['id'], {'cases': 0, 'w': 0, 'wm': 0, 's': 0, 'sm': 0, 'says': 0, 'a': 0, 'am': 0, 'err': 0})
        a['cases'] += 1
        if 'error' in r: a['err'] += 1; continue
        a['w'] += len(r['words']); a['wm'] += sum(1 for w in r['words'] if not (w['read'] and w['sentence']))
        a['s'] += len(r['sents']); a['sm'] += sum(1 for x in r['sents'] if not x['read'])
        a['says'] += r['says']; a['a'] += len(r['r4']['declared'])
        a['am'] += sum(1 for x in r['r4']['declared'] if not (x['registered'] and x['sync']))
    print('\n按页签 / 幕 id 汇总（缺口 = 缺词 + 缺朗读句子，从大到小）：')
    print(f"{'id':<20}{'案例':>4}{'词':>6}{'缺词':>6}{'句子':>6}{'缺句':>6}{'朗读':>6}{'R4缺':>6}")
    for i, a in sorted(agg.items(), key=lambda kv: -(kv[1]['wm'] + kv[1]['sm'])):
        print(f"{i:<20}{a['cases']:>4}{a['w']:>6}{a['wm']:>6}{a['s']:>6}{a['sm']:>6}{a['says']:>6}{a['am']:>6}" + ('  build 出错 ' + str(a['err']) if a['err'] else ''))
if errs: print('页面报错：', errs)
if jpath:
    json.dump(rep, open(jpath, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); print('JSON →', jpath)
sys.exit(1 if strict and (tot_miss or tot_smiss or tot_amiss or errs) else 0)
