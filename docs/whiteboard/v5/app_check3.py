"""app_check3.py <vv_词组> —— 万能动词剧场替换进 App 后的回归：①② 两幕 iframe 挂载、时长、0 报错。"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
key = sys.argv[1][3:]; v, p_ = key.split('_')
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        for a in (0, 1):
            await pg.evaluate(f"navigateTo('super_lab_hub', {{ labTab: 'verb_matrix' }}); superLabState.vIdx = CORE_VERBS_WHEEL.findIndex(x => x.v === '{v}'); superLabState.pIdx = SPATIAL_VECTORS_WHEEL.findIndex(x => x.p === '{p_}'); superLabState.vvAct = {a}; renderSuperLabHubView();")
            await pg.wait_for_timeout(2500)
            info = await pg.evaluate("(()=>{const f=document.getElementById('wb5Frame'); if(!f) return {v5:false}; return {v5:true, tab:f.dataset.tab, case:f.dataset.case, dur:f.contentWindow.__dur && Math.round(f.contentWindow.__dur*10)/10}})()")
            print(sys.argv[1], a + 1, info)
        print('errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
