#!/usr/bin/env python3
"""insightcheck.py [--report N] —— 决策 38 / R38：白板「启发性」硬指标检查。
强制对象 = 已按决策 38 重做的幕：`v5/scenes/*.js` 里 import 了 `../lib/concept.js` 的场景（v6）。其余幕只报告数量、不拦。
每个强制幕现场打包到 /tmp（`node v5/build.mjs`），无头浏览器打开，读 `globalThis.__WB5_INSIGHT__`（concept.js 的 C.finish() 挂上）：
  ① 啊哈卡四项齐：see / guess / reveal / rule 都非空；
  ② ≥1 个 ≥3 秒的预测停顿（C.predict）；
  ③ 规则命名（C.rule 记的时刻）不早于第一个预测停顿结束；
  ④ 板上文字面积 ≤ 40%：逐帧（均匀取 24 帧）记录 fillText 的文字框（按当前变换求外接矩形，在 1920×1080 画布上按 20 px 网格去重），
     顶部讲解字幕（40px WK）与底部朗读字幕（58px Kalam / 34px WK）不算；每帧文字格数 ÷ 画布格数，取最大值 ≤ 0.40。
  另查：页面 0 报错。
模板幕（wordcard_tpl）按 SAMPLE_WORDS 逐词 × 3 幕检查：词条取主 App 的 wb5PlainData（含 __etym / __morph），覆盖时间轴 / 构词 / 盖字母三条分支。
--report N：另外从 v5/out/ 里已打包的非 v6 幕均匀抽 N 幕，只量文字面积并报告（不计入不合格）。
输出最后一行「insightcheck 不合格 N」，N>0 返回码 1。"""
import asyncio, glob, json, os, pathlib, re, subprocess, sys
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent; V5 = HERE.parent / 'v5'
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
SAMPLE_WORDS = ['apple', 'foot', 'teacher', 'classroom', 'book', 'beautiful', 'I']
MAXTEXT = 0.40
HOOK = r"""
(() => {
  const SUB = new Set(['40px WK', '58px Kalam', '34px WK']);
  const CELL = 20, GW = Math.ceil(1920 / CELL), GH = Math.ceil(1080 / CELL);
  window.__TXT = new Set(); window.__TXT_ON = false;
  const P = CanvasRenderingContext2D.prototype, orig = P.fillText;
  P.fillText = function (s, x, y, mw) {
    try {
      if (window.__TXT_ON && this.canvas.id === 'stage' && String(s).trim() && !SUB.has(this.font.replace(/"/g, ''))) {
        const m = this.measureText(String(s)), a = this.textAlign;
        let x0 = a === 'center' ? x - m.width / 2 : (a === 'right' || a === 'end') ? x - m.width : x;
        const asc = m.actualBoundingBoxAscent || 0, desc = m.actualBoundingBoxDescent || 0;
        const T = this.getTransform(), k = this.canvas.width / 1920;
        const pts = [[x0, y - asc], [x0 + m.width, y - asc], [x0, y + desc], [x0 + m.width, y + desc]].map(([px, py]) => [(T.a * px + T.c * py + T.e) / k, (T.b * px + T.d * py + T.f) / k]);
        const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
        const c0 = Math.max(0, Math.floor(Math.min(...xs) / CELL)), c1 = Math.min(GW - 1, Math.floor(Math.max(...xs) / CELL));
        const r0 = Math.max(0, Math.floor(Math.min(...ys) / CELL)), r1 = Math.min(GH - 1, Math.floor(Math.max(...ys) / CELL));
        if (this.globalAlpha > 0.05) for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) window.__TXT.add(r * GW + c);
      }
    } catch (e) {}
    return orig.call(this, s, x, y, mw);
  };
  window.__textFrac = t => { window.__TXT = new Set(); window.__TXT_ON = true; window.__seek(t); window.__TXT_ON = false; return window.__TXT.size / (GW * GH); };
})();
"""

def v6_scenes():
    out = []
    for f in sorted(glob.glob(str(V5 / 'scenes' / '*.js'))):
        src = open(f, encoding='utf-8').read()
        if re.search(r"from '\.\./lib/concept\.js'", src): out.append(pathlib.Path(f))
    return out

async def measure(b, html, inj='', frames=24):
    pg = await b.new_page(viewport={'width': 960, 'height': 540}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
    await pg.add_init_script(inj + HOOK)
    await pg.goto(pathlib.Path(html).resolve().as_uri()); await pg.evaluate('window.__ready'); await pg.wait_for_timeout(200)
    dur = await pg.evaluate('window.__dur'); ins = await pg.evaluate('globalThis.__WB5_INSIGHT__ || null')
    fr = [await pg.evaluate(f'window.__textFrac({dur * (i + 0.5) / frames})') for i in range(frames)]
    await pg.close()
    return dur, ins, max(fr) if fr else 0, errs

def judge(ins, tmax, errs):
    bad = []
    if not ins: return ['没有 __WB5_INSIGHT__（场景没调 C.finish()）']
    aha = ins.get('aha') or {}
    miss = [k for k in ('see', 'guess', 'reveal', 'rule') if not str(aha.get(k) or '').strip()]
    if miss: bad.append('啊哈卡缺 ' + '/'.join(miss))
    pr = [p for p in ins.get('predicts') or [] if p.get('sec', 0) >= 3]
    if not pr: bad.append('没有 ≥3 秒预测停顿')
    ra = ins.get('ruleAt')
    if ra is None: bad.append('没有记规则命名时刻（C.rule）')
    elif pr and ra < pr[0]['t'] + pr[0]['sec'] - 1e-6: bad.append(f'规则命名 {ra:.1f}s 早于第一个预测停顿结束 {pr[0]["t"] + pr[0]["sec"]:.1f}s')
    if tmax > MAXTEXT: bad.append(f'板上文字面积 {tmax:.0%} > {MAXTEXT:.0%}')
    if errs: bad.append('页面报错 ' + '; '.join(errs)[:200])
    return bad

async def main():
    rep = int(sys.argv[sys.argv.index('--report') + 1]) if '--report' in sys.argv else 0
    scenes = v6_scenes(); total = len(glob.glob(str(V5 / 'scenes' / '*.js')))
    fails = 0; tmp = pathlib.Path('/tmp/insightcheck'); tmp.mkdir(exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        words = {}
        if any(s.stem == 'wordcard_tpl' for s in scenes):
            pa = await b.new_page(); await pa.goto(APP.as_uri()); await pa.wait_for_timeout(1500)
            for w in SAMPLE_WORDS:
                words[w] = await pa.evaluate(f"(()=>{{const d=VOCAB_DB.find(w=>w.word==={json.dumps(w)}); return d ? JSON.stringify(wb5PlainData(d)) : null}})()")
            await pa.close()
        for s in scenes:
            out = tmp / (s.stem + '.html')
            r = subprocess.run(['node', 'build.mjs', str(s.relative_to(V5)), str(out), s.stem], cwd=V5, capture_output=True, text=True)
            if r.returncode: print(f'❌ {s.stem} 打包失败 {r.stderr[-300:]}'); fails += 1; continue
            runs = [('', '')]
            if s.stem == 'wordcard_tpl':
                runs = [(f'{w}·{a}', f'globalThis.__WB5_WORD__={d};globalThis.__WB5_ACT__={a};') for w, d in words.items() if d for a in range(3)]
                for w, d in words.items():
                    if not d: print(f'❌ wordcard_tpl 样本词 {w} 在主 App 里取不到'); fails += 1
            for tag, inj in runs:
                dur, ins, tmax, errs = await measure(b, out, inj)
                bad = judge(ins, tmax, errs); fails += bool(bad)
                pr = (ins or {}).get('predicts') or []
                print(f"{'❌' if bad else '✅'} {s.stem}{' ' + tag if tag else ''}  {dur:.1f}s  预测 {len(pr)} 个  规则 {(ins or {}).get('ruleAt')}  文字 {tmax:.0%}  {'；'.join(bad)}")
        if rep:   # 未重做幕抽样：现场打包到 /tmp，只量文字面积（角色包缺时打包会失败，跳过）
            pool = [f for f in sorted(glob.glob(str(V5 / 'scenes' / '*.js'))) if pathlib.Path(f).stem not in {s.stem for s in scenes} and re.search(r'_\d+\.js$', f)]
            for f in pool[::max(1, len(pool) // rep)][:rep]:
                st = pathlib.Path(f).stem; out = tmp / (st + '.html')
                r = subprocess.run(['node', 'build.mjs', str(pathlib.Path(f).relative_to(V5)), str(out), st], cwd=V5, capture_output=True, text=True)
                if r.returncode: print(f'   报告（不拦）{st} 打包失败（多半是角色包没生成），跳过'); continue
                dur, ins, tmax, errs = await measure(b, out, '', 12)
                print(f'   报告（不拦）{st}  {dur:.0f}s  文字 {tmax:.0%}  啊哈卡 {"有" if ins else "无"}')
        await b.close()
    print(f'强制检查 {len(scenes)} 幕（v6 / 决策 38），未重做 {total - len(scenes)} 个场景文件只报告不拦')
    print(f'insightcheck 不合格 {fails}'); sys.exit(1 if fails else 0)

asyncio.run(main())
