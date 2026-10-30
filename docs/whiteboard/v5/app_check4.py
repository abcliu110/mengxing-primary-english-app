"""app_check4.py <hd_页签> "<进入页面的 JS>" —— 三大厅 HD 剧场换成 v5 后的 App 回归：剧场框已换成 v5 iframe、每一幕都能切换挂载、时长正确、0 报错。"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
tab, enter = sys.argv[1], sys.argv[2]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1200)
        await pg.evaluate(enter); await pg.wait_for_timeout(2500)
        n = await pg.evaluate(f"(() => {{ let n = 0; while (wb5El('{tab}', n)) n++; return n; }})()")
        for i in range(n):
            await pg.evaluate(f"wb5HDAct('{tab}', {i})"); await pg.wait_for_timeout(2500)
            info = await pg.evaluate("""(()=>{const w=document.querySelector('[data-wb5hd]'); const f=document.getElementById('wb5Frame'); const old=document.querySelector('.hd-video-wrapper canvas');
              return {swapped: !!w, tab: w && w.getAttribute('data-wb5hd'), case: f && f.dataset.case, dur: f && f.contentWindow.__dur && Math.round(f.contentWindow.__dur*10)/10, oldCanvas: !!old}})()""")
            print(tab, i + 1, info)
        print('errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
