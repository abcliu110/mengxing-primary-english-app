#!/usr/bin/env python3
"""check_poly.py [前缀…] —— 决策 38 ⑩ 一词多义通用版式（scenes/poly.js）逐幕验收（由 check_oral.py 改写，判定相同）。
对象：scenes/hd_oral_*.js 里用 oralBuild 的幕（可给前缀只查一部分，如 hd_oral_sc01）；读已打包的 out/<页签>_<n>.html（先 rebuild）。
每幕：
  ① 知识点不丢（R1 修订）：ITEMS 里的场景名、核心交际句整句、💡 提示整句、每轮「对话第n轮」、角色 emoji +「角色 A/B」、英文句、中文句，
     都要出现在板上文字（INSIGHT.texts）/ 讲解字幕（NARR）/ 朗读字幕（SAYS）任一处；
  ② 啊哈卡四项、≥3 s 预测停顿、规则（C.rule）晚于第一个预测停顿结束；
  ③ 确定性（同一 t 两次建场景绘制逐像素一致，取 3 个时刻）、页面 0 报错；
  ④ 时长统计。
输出每幕一行 + 汇总「check_poly 不合格 N」，N>0 返回码 1。"""
import asyncio, glob, json, os, pathlib, re, sys
from playwright.async_api import async_playwright
V5 = pathlib.Path(__file__).resolve().parent
PRE = [a for a in sys.argv[1:] if not a.startswith('--')]

def items_of(src):
    js = re.search(r'const ITEMS = (\[.*?\n\]);', src, re.S).group(1)
    out = []
    for m in re.finditer(r"^  \['(\w)', (.*)\],?$", js, re.M):
        parts = re.findall(r"'((?:[^'\\]|\\.)*)'", m.group(2))
        out.append([m.group(1)] + [p.replace("\\'", "'").replace('\\\\', '\\') for p in parts])
    return out

def knowledge(items):
    k = []
    for it in items:
        if it[0] == 's': k += [it[1], it[2]]; continue
        a = it[1]; m = re.match(r'^(\S+) 角色 ([AB])：(.*)$', a)
        if m: k += [f'{m.group(1)} 角色 {m.group(2)}', m.group(3)]
        else: k.append(a)
    return [x for x in k if x.strip()]

PAGE = """async () => {
  const cv = document.createElement('canvas'); cv.width = 1920; cv.height = 1080; const g = cv.getContext('2d');
  const S1 = globalThis.__WB5_SCENE__(); await S1.loadAssets(); const S2 = globalThis.__WB5_SCENE__(); await S2.loadAssets();
  let same = true;
  for (const f of [0.25, 0.5, 0.85]) { S1.drawFrame(g, S1.DUR * f); const a = cv.toDataURL(); S2.drawFrame(g, S2.DUR * f); if (a !== cv.toDataURL()) same = false; }
  const I = S1.INSIGHT || {};
  return { dur: S1.DUR, same, ins: { aha: I.aha, predicts: I.predicts, ruleAt: I.ruleAt },
    text: [...(I.texts || []), ...(S1.NARR || []).map(n => n.zh), ...(S1.SAYS || []).flatMap(x => [x.en, x.zh])].join('\\n') };
}"""

async def main():
    files = [f for f in sorted(glob.glob(str(V5 / 'scenes' / 'hd_poly_*_*.js'))) if "from './poly.js'" in open(f, encoding='utf-8').read()]
    if PRE: files = [f for f in files if any(pathlib.Path(f).stem.startswith(p) for p in PRE)]
    bad, durs = 0, []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for f in files:
            st = pathlib.Path(f).stem; html = V5 / 'out' / (st + '.html'); errs = []; probs = []
            if not html.exists() or html.stat().st_mtime < os.path.getmtime(f): probs.append('out/ 未重建')
            else:
                pg = await b.new_page(viewport={'width': 960, 'height': 540})
                pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
                await pg.goto(html.as_uri()); await pg.evaluate('window.__ready')
                r = await pg.evaluate(PAGE); await pg.close()
                miss = [k for k in knowledge(items_of(open(f, encoding='utf-8').read())) if k not in r['text']]
                if miss: probs.append(f'知识点缺 {len(miss)}：' + ' / '.join(miss)[:160])
                ins = r['ins']; aha = ins.get('aha') or {}
                if any(not str(aha.get(x) or '').strip() for x in ('see', 'guess', 'reveal', 'rule')): probs.append('啊哈卡不全')
                pr = [q for q in ins.get('predicts') or [] if q['sec'] >= 3]
                if not pr: probs.append('没有 ≥3 s 预测')
                elif ins.get('ruleAt') is None or ins['ruleAt'] < pr[0]['t'] + pr[0]['sec'] - 1e-6: probs.append('规则早于预测')
                if not r['same']: probs.append('不确定')
                if errs: probs.append('报错 ' + '; '.join(errs)[:120])
                durs.append(r['dur'])
            bad += bool(probs)
            print(f"{'❌' if probs else '✅'} {st}  {durs[-1] if durs and not (probs and probs[0] == 'out/ 未重建') else 0:.1f}s  {'；'.join(probs)}")
        await b.close()
    if durs: print(f'共 {len(files)} 幕，时长 {min(durs):.1f}–{max(durs):.1f} s（平均 {sum(durs) / len(durs):.1f} s）')
    print(f'check_poly 不合格 {bad}'); sys.exit(1 if bad else 0)

asyncio.run(main())
