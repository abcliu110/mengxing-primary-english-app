"""app_check7.py —— 第一性原理总枢核查：6 条原理 × 4 幕逐一打开，列出每幕是 v5 iframe、跳转（movedTo）还是旧 canvas；页面里出现任何 canvas 都会列出来。0 报错才算过。"""
import asyncio, sys, pathlib
from playwright.async_api import async_playwright
APP = sys.argv[1] if len(sys.argv) > 1 else str(pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html')
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width':1280,'height':900}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://'+APP); await pg.wait_for_timeout(1500)
        n = await pg.evaluate("FIRST_PRINCIPLES_DB.length")
        for L in range(n):
            for A in range(4):
                await pg.evaluate(f"navigateTo('first_principles_hub', {{ lawIdx: {L}, actIdx: {A} }})"); await pg.wait_for_timeout(700)
                r = await pg.evaluate("""(()=>({id: FIRST_PRINCIPLES_DB[fpState.lawIdx].id, moved: !!FIRST_PRINCIPLES_DB[fpState.lawIdx].acts[fpState.actIdx].movedTo,
                  wb5: !!document.getElementById('wb5Frame'), canv: [...document.querySelectorAll('#appViewRoot canvas')].map(c=>c.id||'(noid)')}))()""")
                print(L, A, r)
        print('errors', errs[:3] or 'none'); await b.close()
asyncio.run(main())
