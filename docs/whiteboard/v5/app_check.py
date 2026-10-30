"""app_check.py <页签> <状态字段> <幕数> —— 替换进主 App 后的回归：逐幕切换，检查 v5 iframe 挂载 / 时长 / 0 报错，其他页签仍走旧 SVG。
例：python3 v5/app_check.py past_clans clanIdx 4"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
tab, field, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        for i in range(n):
            await pg.evaluate(f"navigateTo('super_lab_hub', {{ labTab: '{tab}' }}); superLabState.{field}={i}; renderSuperLabHubView();")
            await pg.wait_for_timeout(2500)
            info = await pg.evaluate("(()=>{const f=document.getElementById('wb5Frame'); if(!f) return {v5:false, svg:!!document.getElementById('wbStage')}; return {v5:true, case:f.dataset.case, dur:Math.round(f.contentWindow.__dur*10)/10, h:f.style.height}})()")
            print(tab, i + 1, info)
        for t in ['bamboo_tree', 'adj_order', 'tense_matrix']:
            if t == tab: continue
            await pg.evaluate(f"navigateTo('super_lab_hub', {{ labTab: '{t}' }})"); await pg.wait_for_timeout(1200)
            print(t, await pg.evaluate("({svg:!!document.getElementById('wbStage'), v5:!!document.getElementById('wb5Frame')})"))
        print('errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
