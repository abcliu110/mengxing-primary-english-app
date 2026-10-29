#!/usr/bin/env python3
"""appwb.py <tab> [输出目录] —— 在 App 里打开某个王炸页签，逐个案例截白板舞台，检查页面报错和 NaN/undefined。
最后截一张整页图 <输出目录>/app_<tab>_page.png。"""
import asyncio, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
TAB = sys.argv[1] if len(sys.argv) > 1 else 'bamboo_tree'
OUT = sys.argv[2] if len(sys.argv) > 2 else '/tmp'
IDX = {'phrasal_key': 'pkIdx', 'eight_endings': 'eeIdx', 'bamboo_tree': 'btIdx', 'adj_order': 'adjExIdx', 'past_clans': 'clanIdx',
       'stress_rhythm': 'stressIdx', 'metaphor_code': 'metaIdx', 'tense_matrix': 'tenseIdx',
       'aux_transformer': 'auxIdx', 'five_patterns': 'patIdx', 'writing_alchemist': 'writeIdx'}[TAB]
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page(viewport={"width": 1280, "height": 900}); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto("file://" + MAIN); await pg.wait_for_timeout(1500)
        await pg.evaluate(f"navigateTo('super_lab_hub',{{labTab:'{TAB}'}})"); await pg.wait_for_timeout(1200)
        n = await pg.evaluate(f"(WB_LAB['{TAB}']||[]).length")
        print(TAB, "cases registered:", n)
        for i in range(n):
            await pg.evaluate(f"superLabState.{IDX}={i}; renderSuperLabHubView();"); await pg.wait_for_timeout(1000)
            ok = await pg.evaluate("!!document.getElementById('wbStage') && !!wbState.player")
            await pg.evaluate("wbState.playing=false; wbSeekTo(985); wbSyncButton();"); await pg.wait_for_timeout(1200)
            el = await pg.query_selector("#wbStage")
            if el: await el.screenshot(path=f"{OUT}/app_{TAB}_{i + 1}.png")
            bad = await pg.evaluate("document.getElementById('wbStage') && document.getElementById('wbStage').outerHTML.match(/NaN|undefined/g)")
            print("case", i + 1, "mounted:", ok, "bad:", bad)
        await pg.evaluate(f"superLabState.{IDX}=0; renderSuperLabHubView();"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=f"{OUT}/app_{TAB}_page.png", full_page=True)
        print("errors:", errs); await b.close()
asyncio.run(main())
