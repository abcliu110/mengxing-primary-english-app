"""gatecheck.py —— 决策 37 / R37-13：390 px 下家长门弹窗（验证页 + 设置页）和顶栏家长门按钮里，按钮不被挤成竖排：最多 2 行且每行 ≥ 5 个字符（原问题是一字一行）。入 runall。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
JS = """(sel)=>[...document.querySelectorAll(sel)].filter(b=>b.offsetParent).map(b=>{const cs=getComputedStyle(b), fs=parseFloat(cs.fontSize), r=document.createRange(); r.selectNodeContents(b); const rects=[...r.getClientRects()]; const lines=new Set(rects.map(x=>Math.round(x.top/(fs*0.8)))).size;
 const n=b.textContent.trim().length; return {t:b.textContent.trim().slice(0,14), lines, per: n/lines}}).filter(x=>x.t && x.lines>1 && (x.lines>2 || x.per<5))"""
async def main():
    bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1200)
        r0 = await pg.evaluate(JS, '.parent-gate-btn'); print('顶栏', r0 or 'OK'); bad += len(r0)
        await pg.evaluate("openParentGateChallenge()"); await pg.wait_for_timeout(400)
        r1 = await pg.evaluate(JS, '#parentGateContent button'); print('验证页', r1 or 'OK'); bad += len(r1)
        await pg.evaluate("renderParentSettingsPanel()"); await pg.wait_for_timeout(400)
        r2 = await pg.evaluate(JS, '#parentGateContent button, #parentGateContent label'); print('设置页', r2 or 'OK'); bad += len(r2)
        await b.close()
    print('errors', errs[:5] or 'none'); print('不合格', bad)
asyncio.run(main())
