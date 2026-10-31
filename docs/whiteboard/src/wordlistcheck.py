"""wordlistcheck.py —— 决策 37 / R37-10：单词表分页。入 runall。
390 px：全部词首屏渲染卡数 ≤ 40；翻页后第 2 页卡片不同、页码对；最后一页卡数 = 余数；首字母 B 筛选后每张卡都以 B 开头；
换筛选回第 1 页；搜索 cat 能搜到；全部页卡片加起来 = 总数（不丢词）。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
ST = """(()=>{const c=document.querySelector('[data-wl-count]'); const cards=[...document.querySelectorAll('#wlGrid [onclick^="openWordCardModal"]')];
 return {n:+c.dataset.wlCount, page:+c.dataset.wlPage, pages:+c.dataset.wlPages, cards:cards.length, ids:cards.map(x=>x.getAttribute('onclick').split("'")[1])}})()"""
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        await pg.evaluate("navigateTo('word_list')"); await pg.wait_for_timeout(500); a = await pg.evaluate(ST)
        print('全部', a['n'], '词', a['pages'], '页，首屏', a['cards'], '张')
        if a['cards'] > 40 or a['cards'] != min(40, a['n']): bad.append('首屏卡数')
        seen = set(a['ids'])
        for k in range(1, a['pages']):
            await pg.evaluate(f"wlGo({k})"); await pg.wait_for_timeout(60); r = await pg.evaluate(ST)
            if r['page'] != k: bad.append(f'页码 {k}')
            seen |= set(r['ids'])
        if len(seen) != a['n']: bad.append(f'翻完全部页 {len(seen)} ≠ {a["n"]}')
        if r['cards'] != a['n'] - 40 * (a['pages'] - 1): bad.append('末页卡数')
        await pg.evaluate("wlSet('letter', 'B')"); await pg.wait_for_timeout(200); r = await pg.evaluate(ST)
        ws = await pg.evaluate("(ids)=>ids.map(i=>VOCAB_DB.find(w=>w.id===i).word)", r['ids'])
        if r['page'] != 0 or not ws or any(not w.strip().upper().startswith('B') for w in ws): bad.append(f'首字母 B {ws[:5]}')
        print('首字母 B', r['n'], '词')
        await pg.evaluate("currentView.params = {}; renderWordListView(); const i=document.querySelector('[data-wl-q]'); i.value='cat'; i.dispatchEvent(new Event('input'))"); await pg.wait_for_timeout(200)
        ws = await pg.evaluate("(()=>[...document.querySelectorAll('#wlGrid [onclick^=\"openWordCardModal\"]')].map(x=>VOCAB_DB.find(w=>w.id===x.getAttribute('onclick').split(\"'\")[1]).word))()")
        if 'cat' not in ws: bad.append('搜索 cat')
        await b.close()
    print('errors', errs[:5] or 'none'); print('问题', bad or '无'); print('不合格', len(bad) + len(errs))
asyncio.run(main())
