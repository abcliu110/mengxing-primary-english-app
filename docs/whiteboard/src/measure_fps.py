#!/usr/bin/env python3
# fps 实测：python3 measure_fps.py <主文件或旧版 html> <起始秒> <时长秒>（打开单词身世 port 幕播放，记录帧间隔和每帧渲染耗时）
import asyncio, json, statistics, sys
from playwright.async_api import async_playwright
MAIN=sys.argv[1]; T0=float(sys.argv[2]); DUR=int(sys.argv[3])
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page(viewport={'width':1280,'height':900})
        await pg.goto('file://'+MAIN); await pg.wait_for_timeout(1200)
        await pg.evaluate("navigateTo('word_origins_hub',{scene:'wo_port'})"); await pg.wait_for_timeout(1000)
        await pg.evaluate("""() => { wbState.voice=false; window.__fr = []; const R = wbState.player.render; wbState.player.render = function (t) { const a = performance.now(); R.call(this, t); window.__fr.push([a, performance.now() - a]); }; }""")
        await pg.evaluate(f"wbSeekTo(Math.round({T0}/wbState.player.end*1000)); wbState.playing=true; window.__fr=[]")
        await pg.wait_for_timeout(DUR*1000)
        fr = await pg.evaluate("window.__fr"); await b.close()
    iv=[(fr[i+1][0]-fr[i][0]) for i in range(len(fr)-1)]
    rc=[f[1] for f in fr]
    print(json.dumps(dict(frames=len(fr), avg_fps=round(1000/statistics.mean(iv),1), low1pct_fps=round(1000/sorted(iv)[int(len(iv)*.99)],1), over20ms=f"{sum(1 for x in iv if x>20)/len(iv)*100:.2f}%", render_ms_avg=round(statistics.mean(rc),2), render_ms_p99=round(sorted(rc)[int(len(rc)*.99)],2))))
asyncio.run(main())
