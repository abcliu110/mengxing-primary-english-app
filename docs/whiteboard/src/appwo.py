#!/usr/bin/env python3
"""appwo.py [输出目录] —— 在 App 里打开「📖 单词身世总枢」，逐个点已上线的溯源幕，截白板，
检查页面报错和 NaN/undefined；再点一个「即将上线」的场景确认占位正常；
最后切到王炸实验室、第一性原理总枢再切回来，确认几个动画循环互不干扰。"""
import asyncio, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp'
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page(viewport={"width": 1280, "height": 900}); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto("file://" + MAIN); await pg.wait_for_timeout(1500)
        home = await pg.evaluate("document.body.innerHTML.includes(\"navigateTo('word_origins_hub'\")")
        print("home entry:", home)
        await pg.screenshot(path=f"{OUT}/app_wo_home.png", full_page=False)
        await pg.evaluate("navigateTo('word_origins_hub',{scene:'wo_port'})"); await pg.wait_for_timeout(1200)
        scenes = await pg.evaluate("WO_CHAPTERS.flatMap(c => (c.scenes||[]).map(s => s.id))")
        ready = [s for s in scenes if await pg.evaluate(f"woSceneReady('{s}')")]
        print("scenes:", scenes, "ready:", ready)
        for sc in ready:
            await pg.evaluate(f"woSelectScene('{sc}')"); await pg.wait_for_timeout(1000)
            ok = await pg.evaluate(f"!!document.getElementById('woWbStage') && !!wbState.player && wbState.key === '{sc}#0'")
            await pg.evaluate("wbState.playing=false; wbSeekTo(999); wbSyncButton();"); await pg.wait_for_timeout(1200)
            el = await pg.query_selector("#woWbStage")
            if el: await el.screenshot(path=f"{OUT}/app_{sc}.png")
            bad = await pg.evaluate("document.getElementById('woWbStage') && document.getElementById('woWbStage').outerHTML.match(/NaN|undefined/g)")
            badPage = await pg.evaluate("document.getElementById('appViewRoot').innerText.match(/NaN|undefined/g)")
            print("scene", sc, "mounted:", ok, "bad:", bad, "page bad:", badPage)
        todo = [s for s in scenes if s not in ready]
        if todo:
            await pg.evaluate(f"woSelectScene('{todo[0]}')"); await pg.wait_for_timeout(600)
            ph = await pg.evaluate("!document.getElementById('woWbStage') && document.getElementById('appViewRoot').innerText.includes('即将上线')")
            print("placeholder", todo[0], ":", ph)
        await pg.evaluate(f"woSelectScene('{ready[0]}')"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=f"{OUT}/app_wo_page.png", full_page=True)
        # 切到王炸实验室、第一性原理总枢，再切回来
        await pg.evaluate("navigateTo('super_lab_hub',{labTab:'bamboo_tree'})"); await pg.wait_for_timeout(1000)
        lab = await pg.evaluate("!!document.getElementById('wbStage') && !!wbState.player && wbState.stage === document.getElementById('wbStage')")
        await pg.evaluate("navigateTo('first_principles_hub',{lawIdx:0,actIdx:0})"); await pg.wait_for_timeout(1000)
        fp = await pg.evaluate("!!wbState.player && wbState.stage === document.getElementById('fpWbStage')")
        await pg.evaluate(f"navigateTo('word_origins_hub',{{scene:'{ready[0]}'}})"); await pg.wait_for_timeout(1000)
        back = await pg.evaluate("!!wbState.player && wbState.stage === document.getElementById('woWbStage') && !!woAnimId")
        t1 = await pg.evaluate("wbState.t"); await pg.wait_for_timeout(700); t2 = await pg.evaluate("wbState.t")
        print("lab after hub:", lab, "fp after lab:", fp, "hub after fp:", back, "playing:", t2 > t1)
        await pg.evaluate("goHome()"); await pg.wait_for_timeout(500)
        print("loop stopped on home:", await pg.evaluate("!woAnimId"))
        print("errors:", errs); await b.close()
asyncio.run(main())
