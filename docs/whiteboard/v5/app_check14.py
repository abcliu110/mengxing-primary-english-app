"""app_check14.py —— 决策 34-B 回归：语法课例句库（src/patch_grammar_examples.py）。
① 40 课每课底部都有例句库，句数 = GRAMMAR_EX_JSON；② 句型筛选后条数对；③ 点句子朗读不报错；换课例句库跟着换。0 报错。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        ids = await pg.evaluate("GRAMMAR_DB.map(g=>g.id)"); d = await pg.evaluate("Object.fromEntries(Object.entries(etymData('GRAMMAR_EX_JSON')).map(([k,v])=>[k,v.length]))")
        low = [g for g in ids if d.get(g, 0) < 5]
        if low: bad.append(f'少于 5 句 {low}')
        for g in ids:
            await pg.evaluate(f"navigateTo('grammar_detail', {{ gId: '{g}' }})"); await pg.wait_for_timeout(150)
            n = await pg.evaluate(f"[document.querySelectorAll('#grexBox[data-grex=\"{g}\"]').length, document.querySelectorAll('#grexBox [data-grex-s]').length]")
            if n != [1, d.get(g, 0)]: bad.append(f'{g} {n} 期望 {d.get(g)}')
        await pg.evaluate("navigateTo('grammar_detail', { gId: 'G29' })"); await pg.wait_for_timeout(300)
        await pg.click('#grexBox [data-grex-type="否定"]'); await pg.wait_for_timeout(200)
        r = await pg.evaluate("[document.querySelectorAll('#grexBox [data-grex-s]').length, etymData('GRAMMAR_EX_JSON').G29.filter(x=>x[1]==='否定').length]")
        if r[0] != r[1] or r[0] == 0: bad.append(f'筛选 {r}')
        await pg.click('#grexBox [data-grex-s]'); await pg.wait_for_timeout(200)
        await b.close()
    print('不合格', len(bad), bad); print('errors', 'none' if not errs else errs)
asyncio.run(main())
