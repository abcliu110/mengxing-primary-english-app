#!/usr/bin/env python3
# 朗读同步误差 + fps 实测（模拟 TTS：onstart/onboundary/onend 随机时序）。用法：python3 measure_sync.py  → 打印并写 /workspace/work/mx_shots/measure_v2.json
import asyncio, json, statistics, sys
from playwright.async_api import async_playwright
MAIN='/workspace/work/mx/萌星小学英语_最终合并版.html'
MOCK = r"""
(() => {
  // 模拟 TTS：onstart 延迟 80–250ms，每个词 0.22–0.62 秒（随机，比估算时长有快有慢），然后 onend
  let seed = 11; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const q = []; let busy = false;
  window.__ttsLog = [];
  function run() {
    if (busy || !q.length) return; busy = true;
    const u = q.shift(), words = u.text.split(/\s+/); let pos = 0, idx = [];
    words.forEach(w => { const j = u.text.indexOf(w, pos); idx.push(j); pos = j + w.length; });
    let t = 80 + rnd() * 170;
    setTimeout(() => { if (u.__dead) return; window.__ttsLog.push({ ev: 'start', at: performance.now(), text: u.text }); u.onstart && u.onstart({}); }, t);
    words.forEach((w, j) => { const tt = t; setTimeout(() => { if (u.__dead) return; window.__ttsLog.push({ ev: 'b', j, at: performance.now(), text: u.text }); u.onboundary && u.onboundary({ charIndex: idx[j], name: 'word' }); }, tt); t += 220 + rnd() * 400; });
    setTimeout(() => { busy = false; if (!u.__dead) { window.__ttsLog.push({ ev: 'end', at: performance.now(), text: u.text }); u.onend && u.onend({}); } run(); }, t);
  }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: function (text) { this.text = text; }, configurable: true, writable: true });
  const SS = { speak(u) { q.push(u); run(); }, cancel() { q.forEach(u => u.__dead = true); q.length = 0; busy = false; }, pause() {}, resume() {}, getVoices() { return []; } };
  Object.defineProperty(window, 'speechSynthesis', { get: () => SS, configurable: true });
})();
"""
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        pg = await b.new_page(viewport={'width':1280,'height':900}, device_scale_factor=1)
        errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.add_init_script(MOCK)
        await pg.goto('file://'+MAIN); await pg.wait_for_timeout(1200)
        await pg.evaluate("navigateTo('word_origins_hub',{scene:'wo_port'})"); await pg.wait_for_timeout(1000)
        # 帧记录器：每帧记 (wall, wbState.t, 口型 d)
        await pg.evaluate("""() => { window.__fr = []; wbState.syncLog = []; const R = wbState.player.render; wbState.player.render = function (t) { const a = performance.now(); R.call(this, t); const m = document.querySelector('#woWbStage [data-actor=narrator] path[fill="#9f1239"], #woWbStage [data-actor=narrator] path[fill=none]'); window.__fr.push([a, performance.now() - a, wbState.t]); }; }""")
        # 1) 从头播放 70 秒（含片头、地图、进港、搬运开头）——真实时间轴 + 模拟语音
        await pg.evaluate("wbReplay()")
        await pg.wait_for_timeout(55000)
        fr = await pg.evaluate("window.__fr"); log = await pg.evaluate("wbState.syncLog"); says = await pg.evaluate("wbState.player.says.map(s=>({t:s.t,dur:s.dur,wd:s.wd,en:s.en}))")
        # 2) 跳到搬运镜头（最重的画面：多个角色 + 道具）再播 25 秒
        await pg.evaluate("wbSeekTo(Math.round(76/wbState.player.end*1000)); wbState.playing=true;")
        await pg.evaluate("window.__fr2=window.__fr.length")
        await pg.wait_for_timeout(20000)
        fr2 = (await pg.evaluate("window.__fr"))[await pg.evaluate("window.__fr2"):]
        log2 = await pg.evaluate("wbState.syncLog")
        await b.close()
    def fps_stats(fr):
        iv=[(fr[i+1][0]-fr[i][0]) for i in range(len(fr)-1)]
        iv=[x for x in iv if x<1000]
        avg=1000/statistics.mean(iv); p99=sorted(iv)[int(len(iv)*.99)]; slow=sum(1 for x in iv if x>20)/len(iv)
        rc=[f[1] for f in fr]
        return dict(frames=len(fr), avg_fps=round(avg,1), low1pct_fps=round(1000/p99,1), over20ms=f"{slow*100:.2f}%", render_ms_avg=round(statistics.mean(rc),2), render_ms_p99=round(sorted(rc)[int(len(rc)*.99)],2), render_ms_max=round(max(rc),2))
    def sync(fr, log):
        errs=[]
        for e in log:
            if e['ph']!='sent' or e['j']<0: continue
            sy=says[e['i']]; n=len(sy['en'].split()); per=(sy['dur']-sy['wd']-.5)/n; est=sy['t']+sy['wd']+.25+e['j']*per
            # 白板时间轴到达这个词的预定时刻的墙钟时间 − onboundary 的墙钟时间
            hit=next((f[0] for f in fr if f[0]>=e['at']-2000 and f[2]>=est-1e-3), None)
            if hit is None: continue
            errs.append((hit-e['at'])/1000)
        return errs
    e1=sync(fr,log) or [0]
    out={'run1_fps':fps_stats(fr),'run2_heavy_fps':fps_stats(fr2),'sync_n':len(e1),
         'sync_err_mean_s':round(statistics.mean(e1),3),'sync_err_absmax_s':round(max(abs(x) for x in e1),3),
         'sync_err_p95_s':round(sorted(abs(x) for x in e1)[int(len(e1)*.95)],3),'within_0.2s':f"{sum(1 for x in e1 if abs(x)<=.2)}/{len(e1)}",'errors':errs}
    print(json.dumps(out,ensure_ascii=False,indent=1))
    json.dump(out,open('/workspace/work/mx_shots/measure_v2.json','w'),ensure_ascii=False,indent=1)
asyncio.run(main())
