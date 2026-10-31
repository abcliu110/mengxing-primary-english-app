"""mdcheck.py —— 决策 37 / R37-04：可见文本里不得出现 Markdown 原始标记（反引号 ` / **）。入 runall。
扫：40 个语法点详情页（含底部各页签）+ 语法 / 单词 / 口语 / 底层原理 / 练习各大厅 + 单词表 + 若干单词卡弹窗。"""
import asyncio, json, pathlib, re
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
SCREENS = ["goHome()", "navigateTo('grammar_hub')", "navigateTo('vocab_hub')", "navigateTo('oral_hub')", "navigateTo('principles_hub')",
           "navigateTo('practice_hub')", "navigateTo('word_list')", "navigateTo('my_study')", "navigateTo('app_map')", "navigateTo('method_hub')"]
SCAN = """()=>{const t=document.body.innerText; const m=[...t.matchAll(/.{0,12}(`|\\*\\*).{0,12}/g)].map(x=>x[0]); return m.slice(0,3).concat(m.length?['共 '+m.length]:[])}"""
async def main():
    bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        ids = await pg.evaluate("GRAMMAR_DB.map(g=>g.id)")
        for gid in ids:
            await pg.evaluate(f"navigateTo('grammar_detail', {{ gId: '{gid}' }})"); await pg.wait_for_timeout(150)
            hits = await pg.evaluate(SCAN)
            tabs = await pg.evaluate("[...document.querySelectorAll('#appViewRoot button')].filter(b=>/歌谣|纠偏|微训练|例句库|练一练|小测/.test(b.textContent)).length")
            for k in range(tabs):
                await pg.evaluate(f"(()=>{{const bs=[...document.querySelectorAll('#appViewRoot button')].filter(b=>/歌谣|纠偏|微训练|例句库|练一练|小测/.test(b.textContent)); if(bs[{k}]) bs[{k}].click();}})()")
                await pg.wait_for_timeout(80); hits += await pg.evaluate(SCAN)
            if hits: bad += 1; print(gid, hits)
        for js in SCREENS:
            try: await pg.evaluate(js)
            except Exception as e: print(js, 'nav err', str(e)[:60]); continue
            await pg.wait_for_timeout(300); hits = await pg.evaluate(SCAN)
            if hits: bad += 1; print(js, hits)
        for w in ['apple', 'water', 'cat', 'go', 'book']:
            await pg.evaluate(f"(()=>{{const x=VOCAB_DB.find(v=>v.word==='{w}'); if(x && typeof openWordCardModal==='function') openWordCardModal(x.id);}})()"); await pg.wait_for_timeout(300)
            hits = await pg.evaluate(SCAN)
            if hits: bad += 1; print('词卡', w, hits)
        await b.close()
    print('语法点', len(ids), '个已扫'); print('errors', errs[:5] or 'none'); print('不合格', bad)
asyncio.run(main())
