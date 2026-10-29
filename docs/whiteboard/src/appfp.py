#!/usr/bin/env python3
"""appfp.py <lawIdx 0-5> [输出目录] —— 在 App 里打开「六大第一性原理总枢」的某条原理，点「下一幕」逐幕截白板，
检查页面报错和 NaN/undefined；没做白板的原理会显示旧 Canvas（mounted: False 但 canvas: True）。
再切到王炸实验室竹节句，确认两个动画循环互不干扰。"""
import asyncio, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
LAW = int(sys.argv[1]) if len(sys.argv) > 1 else 0
OUT = sys.argv[2] if len(sys.argv) > 2 else '/tmp'
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page(viewport={"width": 1280, "height": 900}); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto("file://" + MAIN); await pg.wait_for_timeout(1500)
        await pg.evaluate(f"navigateTo('first_principles_hub',{{lawIdx:{LAW},actIdx:0}})"); await pg.wait_for_timeout(1200)
        law = await pg.evaluate("FIRST_PRINCIPLES_DB[fpState.lawIdx].id")
        n = await pg.evaluate("FIRST_PRINCIPLES_DB[fpState.lawIdx].acts.length")
        print(law, "acts:", n, "wb cases:", await pg.evaluate(f"(WB_LAB['{law}']||[]).length"))
        for i in range(n):
            await pg.evaluate(f"switchFirstPrincipleAct({i})"); await pg.wait_for_timeout(1000)
            ok = await pg.evaluate("!!document.getElementById('fpWbStage') && !!wbState.player && wbState.key === FIRST_PRINCIPLES_DB[fpState.lawIdx].id + '#' + fpState.actIdx")
            cv = await pg.evaluate("!!document.getElementById('firstPrinciplesCanvas')")
            await pg.evaluate("if (document.getElementById('fpWbStage')) { wbState.playing=false; wbSeekTo(985); wbSyncButton(); }"); await pg.wait_for_timeout(1000)
            el = await pg.query_selector("#fpWbStage") or await pg.query_selector("#firstPrinciplesCanvas")
            if el: await el.screenshot(path=f"{OUT}/app_{law}_{i + 1}.png")
            bad = await pg.evaluate("document.getElementById('fpWbStage') && document.getElementById('fpWbStage').outerHTML.match(/NaN|undefined/g)")
            print("act", i + 1, "mounted:", ok, "canvas:", cv, "bad:", bad)
        await pg.evaluate("switchFirstPrincipleAct(0)"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=f"{OUT}/app_{law}_page.png", full_page=True)
        # 切到王炸实验室再切回来：两个循环互不干扰
        await pg.evaluate("navigateTo('super_lab_hub',{labTab:'bamboo_tree'})"); await pg.wait_for_timeout(1000)
        lab = await pg.evaluate("!!document.getElementById('wbStage') && !!wbState.player")
        await pg.evaluate(f"navigateTo('first_principles_hub',{{lawIdx:{LAW},actIdx:0}})"); await pg.wait_for_timeout(1000)
        back = await pg.evaluate("!document.getElementById('fpWbStage') || (!!wbState.player && wbState.stage === document.getElementById('fpWbStage'))")
        print("lab after hub:", lab, "hub after lab:", back)
        print("errors:", errs); await b.close()
asyncio.run(main())
