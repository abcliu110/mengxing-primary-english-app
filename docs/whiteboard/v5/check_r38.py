#!/usr/bin/env python3
"""check_r38.py <场景名…> —— 决策 38 手工重做幕逐幕验收（口语版式幕用 check_oral.py）。
对象：scenes/<名>.js（export const KNOW = [...]）；读 out/<名>.html（先 node build.mjs 打包）。
每幕：① KNOW 每条（去掉 ** 与反引号）出现在板上文字（INSIGHT.texts）/ 讲解字幕 / 朗读字幕任一处；
② 啊哈卡四项、≥3 s 预测、规则晚于第一个预测；③ 确定性（3 个时刻逐像素）、0 报错；④ 时长。
输出「check_r38 不合格 N」。"""
import asyncio, json, os, pathlib, re, sys
from playwright.async_api import async_playwright
V5 = pathlib.Path(__file__).resolve().parent
PAGE = open(V5 / 'check_oral.py', encoding='utf-8').read().split('PAGE = """', 1)[1].split('"""', 1)[0]

def know_of(src):
    m = re.search(r'export const KNOW = (\[.*?\n\]);', src, re.S)
    if not m: return None
    import subprocess
    arr = json.loads(subprocess.run(['node', '-e', 'console.log(JSON.stringify(eval(process.argv[1])))', m.group(1)], capture_output=True, text=True, check=True).stdout)
    return [x.replace('**', '').replace('`', '') for x in arr]

async def main():
    names = [a for a in sys.argv[1:] if not a.startswith('--')]; bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for st in names:
            f = V5 / 'scenes' / f'{st}.js'; html = V5 / 'out' / f'{st}.html'; probs = []; errs = []; dur = 0
            know = know_of(open(f, encoding='utf-8').read())
            if know is None: probs.append('没有 KNOW')
            if not html.exists() or html.stat().st_mtime < f.stat().st_mtime: probs.append('out/ 未重建')
            else:
                pg = await b.new_page(viewport={'width': 960, 'height': 540})
                pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
                await pg.goto(html.as_uri()); await pg.evaluate('window.__ready')
                r = await pg.evaluate(PAGE); await pg.close(); dur = r['dur']
                txt = r['text'].replace('**', '').replace('`', '')
                miss = [k for k in (know or []) if k not in txt]
                if miss: probs.append(f'知识点缺 {len(miss)}：' + ' / '.join(miss)[:200])
                ins = r['ins']; aha = ins.get('aha') or {}
                if any(not str(aha.get(x) or '').strip() for x in ('see', 'guess', 'reveal', 'rule')): probs.append('啊哈卡不全')
                pr = [q for q in ins.get('predicts') or [] if q['sec'] >= 3]
                if not pr: probs.append('没有 ≥3 s 预测')
                elif ins.get('ruleAt') is None or ins['ruleAt'] < pr[0]['t'] + pr[0]['sec'] - 1e-6: probs.append('规则早于预测')
                if not r['same']: probs.append('不确定')
                if errs: probs.append('报错 ' + '; '.join(errs)[:160])
            bad += bool(probs)
            print(f"{'❌' if probs else '✅'} {st}  {dur:.1f}s  {'；'.join(probs)}")
        await b.close()
    print(f'check_r38 不合格 {bad}'); sys.exit(1 if bad else 0)
asyncio.run(main())
