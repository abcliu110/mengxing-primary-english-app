"""playercheck.py —— 决策 37 / R37-01 白板手机播放框检查（入 runall）。
390×844 手机视口，抽 4 处白板（实验室 / 单词身世 / HD 剧场 / 单词卡模板之外的语法课）：
  ① 画面（canvas）面积占播放框（iframe）≥ 90%；② 时间文字不截断（scrollWidth ≤ clientWidth + 1）；
  ③ 点「⛶ 全屏」后：播放框铺满视口，竖屏时画面横过来，canvas 显示宽 ≥ 600 px（1920 宽场景 ≥ 0.31 倍，场景 ≥ 40 px 的字 ≥ 12 px）；退出后恢复。
  ④ 0 页面报错。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
PAGES = [("tense_matrix", "navigateTo('super_lab_hub', { labTab: 'tense_matrix' })"),
         ("wo_grimm", "navigateTo('word_origins_hub', { woId: 'wo_grimm' })"),
         ("hd_phonics", "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })"),
         ("grammar G01", "navigateTo('grammar_detail', { grammarId: 'G01' })")]
MEAS = """(()=>{const f=document.getElementById('wb5Frame'); if(!f) return null; f.scrollIntoView(); const r=f.getBoundingClientRect(); const d=f.contentDocument; if(!d||!d.getElementById('stage')) return {wait:1};
 const c=d.getElementById('stage').getBoundingClientRect(), t=d.getElementById('time');
 return {ratio: Math.round(c.width*c.height/(r.width*r.height)*100), tcut: t.scrollWidth > t.clientWidth + 1, time: t.textContent, w: Math.round(r.width)}})()"""
FS = """(()=>{const b=document.querySelector('.wb5-fs'); b.click(); const f=document.getElementById('wb5Frame'), box=f.closest('.wb5-box'), bb=box.getBoundingClientRect();
 const c=f.contentDocument.getElementById('stage').getBoundingClientRect(); return {full: Math.round(bb.width)===innerWidth && Math.round(bb.height)===innerHeight, cw: Math.round(Math.max(c.width, c.height)), rot: f.style.transform}})()"""
OFF = """(()=>{document.querySelector('.wb5-fs').click(); const f=document.getElementById('wb5Frame'); return {off: !f.closest('.wb5-fson') && !f.style.transform}})()"""
async def main():
    bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        for name, js in PAGES:
            await pg.evaluate(js); m = None
            for _ in range(20):
                await pg.wait_for_timeout(500); m = await pg.evaluate(MEAS)
                if m and not m.get('wait') and m.get('time'): break   # 播放器排好版（时间文字出来）才量，否则偶发量到半成品（ratio 85）
            if not m or m.get('wait'): print(name, '无白板 BAD'); bad += 1; continue
            fs = await pg.evaluate(FS); await pg.wait_for_timeout(300)
            fs2 = await pg.evaluate("(()=>{const c=document.getElementById('wb5Frame').contentDocument.getElementById('stage').getBoundingClientRect(); return Math.round(Math.max(c.width,c.height))})()")
            off = await pg.evaluate(OFF)
            ok = m['ratio'] >= 90 and not m['tcut'] and fs['full'] and fs2 >= 600 and off['off']
            bad += not ok
            print(name, m, 'fs', fs, 'canvas', fs2, off, 'OK' if ok else 'BAD')
        await b.close()
    print('errors', errs[:5] or 'none'); print('不合格', bad)
asyncio.run(main())
