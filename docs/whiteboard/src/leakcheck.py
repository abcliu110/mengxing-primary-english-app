#!/usr/bin/env python3
"""leakcheck.py —— 决策 29 O2 / O7：进出 20 个入口后，残留的动画循环 / 计时器 / 监听不增长（返回码非 0 = 泄漏）。
做法：页面加载前注入探针，包住 requestAnimationFrame / cancelAnimationFrame、setInterval / clearInterval、window/document.addEventListener；
统计「最近 1 秒内还在请求下一帧的 rAF 回调数」「活着的 interval 数」「window/document 上的监听数」。
依次进 20 个入口（实验室页签、单词身世、中英对照、第一性原理、各大厅、总地图、交际句型地图…），每个停 0.6 秒，最后回首页停 1.5 秒再量。
判定：回首页后主页面 rAF 活跃回调 = 0（白板在 iframe 里，iframe 已移除即不计）、interval 数不超过首页基线、监听数不超过基线 + 2。"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
PROBE = """(()=>{const W=window; W.__lk={raf:new Map(), iv:new Set(), ls:0};
 const rf=W.requestAnimationFrame.bind(W), cf=W.cancelAnimationFrame.bind(W); let n=0;
 W.requestAnimationFrame=function(cb){const id=rf(function(t){W.__lk.raf.delete(id); cb(t);}); W.__lk.raf.set(id, performance.now()); return id;};
 W.cancelAnimationFrame=function(id){W.__lk.raf.delete(id); return cf(id);};
 const si=W.setInterval.bind(W), ci=W.clearInterval.bind(W);
 W.setInterval=function(){const id=si.apply(null, arguments); W.__lk.iv.add(id); return id;}; W.clearInterval=function(id){W.__lk.iv.delete(id); return ci(id);};
 for (const o of [W, document]) { const a=o.addEventListener.bind(o), r=o.removeEventListener.bind(o); o.addEventListener=function(){W.__lk.ls++; return a.apply(null, arguments);}; o.removeEventListener=function(){W.__lk.ls--; return r.apply(null, arguments);}; }
})()"""
GO = ["navigateTo('super_lab_hub', { labTab: 'tense_matrix' })", "navigateTo('super_lab_hub', { labTab: 'phrasal_key' })", "navigateTo('super_lab_hub', { labTab: 'pron_map' })",
      "navigateTo('word_origins_hub', { scene: 'wo_port' })", "navigateTo('word_origins_hub', { scene: 'wo_grimm' })", "navigateTo('zh_en_hub', { scene: 'ze_be' })",
      "navigateTo('first_principles_hub', { lawIdx: 0, actIdx: 0 })", "navigateTo('first_principles_hub', { lawIdx: 3, actIdx: 1 })", "navigateTo('vocab_hall')", "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })",
      "navigateTo('vocab_formation')", "navigateTo('vocab_frames')", "navigateTo('vocab_theme')", "navigateTo('grammar_hall')", "navigateTo('grammar_summary_hub')",
      "navigateTo('oral_hall')", "navigateTo('oral_func_map')", "navigateTo('app_map')", "navigateTo('super_lab_hub', { labTab: 'metaphor_code' })", "navigateTo('v6_hub')"]
MEASURE = "(()=>{const now=performance.now(); return {raf:[...__lk.raf.values()].filter(t=>now-t<1000).length, iv:__lk.iv.size, ls:__lk.ls, frames:document.querySelectorAll('iframe').length}})()"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e))); await pg.add_init_script(PROBE)
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500); base = await pg.evaluate(MEASURE)
        await pg.evaluate(GO[0]); await pg.wait_for_timeout(2500); live = await pg.evaluate(MEASURE)   # 白板页里：主页面不该自己跑 rAF（白板在 iframe 里）
        for rnd in range(2 if '--twice' in sys.argv else 1):
            for g in GO:
                try: await pg.evaluate(g)
                except Exception as e: errs.append(f'{g}: {e}')
                await pg.wait_for_timeout(600)
        mid = await pg.evaluate(MEASURE)
        await pg.evaluate("navigateTo('home')"); await pg.wait_for_timeout(1500); end = await pg.evaluate(MEASURE)
        ok = end['raf'] == 0 and end['iv'] <= base['iv'] and end['ls'] <= base['ls'] + 2
        print('基线', base, '白板页', live, '最后一个入口', mid, '回首页', end); print('leakcheck:', 'OK' if ok else 'FAIL', '；errors', errs[:5] or 'none'); await b.close()
        sys.exit(0 if ok and not errs else 1)
asyncio.run(main())
