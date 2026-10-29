#!/usr/bin/env python3
"""appwb.py [输出目录] —— 在 App 里打开竹节句 vs 树干句，5 个案例逐个截图（白板舞台 + 整页），并检查报错"""
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
        await pg.evaluate("navigateTo('super_lab_hub',{labTab:'bamboo_tree'})"); await pg.wait_for_timeout(1500)
        for i in range(5):
            await pg.evaluate(f"superLabState.btIdx={i}; renderSuperLabHubView();"); await pg.wait_for_timeout(1200)
            info = await pg.evaluate("({case: document.getElementById('wbStage').getAttribute('data-case'), t: wbState.t, end: wbState.player && wbState.player.end, playing: wbState.playing})")
            # 跳到结尾附近截图，检查字幕和渲染
            await pg.evaluate("wbState.playing=false; wbSeekTo(985); wbSyncButton();"); await pg.wait_for_timeout(1500)
            el = await pg.query_selector("#wbStage")
            await el.screenshot(path=f"{OUT}/app_wb{i+1}.png")
            # 检查 NaN / undefined
            bad = await pg.evaluate("document.getElementById('wbStage').outerHTML.match(/NaN|undefined/g)")
            print("case", i + 1, info, "bad:", bad)
        await pg.evaluate("superLabState.btIdx=2; renderSuperLabHubView();"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=f"{OUT}/app_wb_page.png", full_page=True)
        # 切到别的页签，确认白板循环退出、旧页签正常
        await pg.evaluate("superLabState.labTab='vowel_shift'; renderSuperLabHubView();"); await pg.wait_for_timeout(1200)
        print("after switch wbState.player:", await pg.evaluate("wbState.player"), "canvas:", await pg.evaluate("!!document.getElementById('superLabCanvas')"))
        print("errors:", errs); await b.close()
asyncio.run(main())
