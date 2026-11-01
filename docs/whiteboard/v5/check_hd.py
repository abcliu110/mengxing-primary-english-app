#!/usr/bin/env python3
"""check_hd.py <场景名…> —— §2.9「全部手绘」幕的附加验收（2026-11-01 起，fp_boundedness_1_hd 首用）。
读 out/<名>.html，无头浏览器逐帧（默认 160 帧均匀取样）拦截 Canvas 调用：
  ① 0 emoji：场景源码与运行时 fillText 的字里都没有 emoji / 符号块（U+1F000–1FAFF、2600–27BF、2B00–2BFF、FE0F）；
  ② 位图只来自人物关键帧：drawImage 的来源全部是角色帧库（sprites/*.js 的 data:image/webp），没有 emoji 预栅格化 canvas、没有其它位图道具；
  ③ 单强调色：fillStyle / strokeStyle 用到的彩色（饱和度 > 25%）只有 #EF7226 / #E9A67C 两种橙（墨色、灰、白不计）；
  ④ 确定性：同一 t 两次画面逐像素一致；0 报错。
--mono（2026-11-01 黑白马克笔试点 pilot_marker_rig_pour 起用）：单色风格——彩色只许 #EF7226 一种（浅橙 #E9A67C 也不行），
  且橙色只许出现在文字上：stroke() 时的描边色不许是橙（线条、排线、液柱一律墨色），fill() 只放过笔帽（引擎的笔跟着写橙字时笔尖变橙）。
  另外：位图源必须为 0（人物也是矢量骨骼，不用关键帧位图）。
输出「check_hd 不合格 N」。"""
import asyncio, pathlib, re, sys, colorsys
from playwright.async_api import async_playwright
V5 = pathlib.Path(__file__).resolve().parent
EMO = re.compile('[\U0001F000-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F]')
HOOK = r"""
(() => {
  const P = CanvasRenderingContext2D.prototype; window.__T = new Set(); window.__IMG = new Set(); window.__COL = new Set(); window.__ON = false;
  const ft = P.fillText; P.fillText = function (s, ...r) { if (window.__ON && this.canvas.id === 'stage') window.__T.add(String(s)); return ft.call(this, s, ...r); };
  const di = P.drawImage; P.drawImage = function (im, ...r) { if (window.__ON && this.canvas.id === 'stage') window.__IMG.add(im && im.src ? im.src.slice(0, 22) : (im && im.tagName) || String(im)); return di.call(this, im, ...r); };
  window.__ORS = 0; const isOr = v => typeof v === 'string' && /^#?ef7226$|rgba?\(\s*239\s*,\s*114\s*,\s*38/i.test(v.replace('#', '#'));
  const st = P.stroke; P.stroke = function (...r) { if (window.__ON && this.canvas.id === 'stage' && isOr(String(this.strokeStyle))) window.__ORS++; return st.call(this, ...r); };
  for (const k of ['fillStyle', 'strokeStyle']) { const d = Object.getOwnPropertyDescriptor(P, k);
    Object.defineProperty(P, k, { get() { return d.get.call(this); }, set(v) { if (window.__ON && typeof v === 'string') window.__COL.add(v); d.set.call(this, v); } }); }
})();
"""
def colorful(c):
    m = re.match(r'#([0-9a-f]{6})$', c.strip().lower()); rgb = None
    if m: h = m.group(1); rgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    m2 = re.match(r'rgba?\(([^)]+)\)', c.strip())
    if m2: rgb = [float(x) / 255 for x in m2.group(1).split(',')[:3]]
    if rgb is None: return None
    h, l, s = colorsys.rgb_to_hls(*rgb); return (s > 0.25 and 0.12 < l < 0.92), tuple(round(x * 255) for x in rgb)
async def main():
    names = [a for a in sys.argv[1:] if not a.startswith('--')]; bad = 0; N = 160; MONO = '--mono' in sys.argv
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for st in names:
            probs = []; src = (V5 / 'scenes' / f'{st}.js').read_text(encoding='utf-8')
            e = sorted(set(EMO.findall(src)));  probs += [f'源码有 emoji/符号 {"".join(e)}'] if e else []
            pg = await b.new_page(viewport={'width': 960, 'height': 540}); errs = []
            pg.on('pageerror', lambda x: errs.append(str(x))); pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
            await pg.add_init_script(HOOK); await pg.goto((V5 / 'out' / f'{st}.html').as_uri()); await pg.evaluate('window.__ready')
            dur = await pg.evaluate('window.__dur')
            await pg.evaluate(f'(()=>{{window.__ON=true; for(let i=0;i<{N};i++) window.__seek({dur}*(i+0.5)/{N}); window.__ON=false;}})()')
            T = await pg.evaluate('[...window.__T]'); IMG = await pg.evaluate('[...window.__IMG]'); COL = await pg.evaluate('[...window.__COL]'); ORS = await pg.evaluate('window.__ORS')
            same = await pg.evaluate(f'(()=>{{const c=document.getElementById("stage"); window.__seek({dur*0.37}); const a=c.toDataURL(); window.__seek(1); window.__seek({dur*0.37}); return a===c.toDataURL();}})()')
            await pg.close()
            e2 = sorted(set(ch for s in T for ch in EMO.findall(s)))
            if e2: probs.append(f'运行时 fillText 有 emoji/符号 {"".join(e2)}')
            other = [s for s in IMG if not s.startswith('data:image/webp')]
            if other: probs.append(f'有非角色帧位图 {other[:4]}')
            accents = sorted({rgb for c in COL for r in [colorful(c)] if r and r[0] for rgb in [r[1]]} - ({(239, 114, 38)} if MONO else {(239, 114, 38), (233, 166, 124)}))
            if MONO and ORS: probs.append(f'单色：橙色用在了线条上（stroke {ORS} 次）')
            if MONO and IMG: probs.append(f'单色骨骼幕不该有位图 {IMG[:3]}')
            if accents: probs.append(f'强调色不止橙色：{accents[:6]}')
            if not same: probs.append('不确定（同 t 两次画面不同）')
            if errs: probs.append('报错 ' + '; '.join(errs)[:160])
            bad += bool(probs)
            print(f"{'❌' if probs else '✅'} {st}  {dur:.1f}s  取样 {N} 帧  字串 {len(T)}  位图源 {len(IMG)}  色值 {len(COL)}{'  橙色描边 ' + str(ORS) if MONO else ''}  {'；'.join(probs)}")
        await b.close()
    print(f'check_hd 不合格 {bad}'); sys.exit(1 if bad else 0)
asyncio.run(main())
