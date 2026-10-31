"""topbarcheck.py —— 决策 37 / R37-09：390×844 下顶栏一层、吸顶、始终有返回。入 runall。
首页：顶栏 ≤ 56 px；子页面（单词表 / 语法点 / 实验室 / 口语大厅）：可见顶栏总高 ≤ 60 px（首屏内容区 ≥ 75%），
滚到 1200 px 后「返回」仍在视口顶部可点；☰ 菜单能打开并含「回首页」；电脑宽度（1280）下原两层布局不变（回首页按钮可见）。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
SUBS = ["navigateTo('word_list')", "navigateTo('grammar_detail', { gId: 'G01' })", "navigateTo('super_lab_hub', { labTab: 'tense_matrix' })", "navigateTo('oral_hall')"]
BARS = """()=>{const v=[...document.querySelectorAll('body > .top-header, #globalSubNav')].filter(e=>getComputedStyle(e).display!=='none'); return v.reduce((a,e)=>a+e.getBoundingClientRect().height,0)}"""
BACK = """()=>{const b=document.querySelector('#globalSubNav .nav-btn.back'); if(!b) return null; const r=b.getBoundingClientRect(); const el=document.elementFromPoint(r.left+r.width/2, r.top+r.height/2); return {top:Math.round(r.top), hit: !!(el && (el===b || b.contains(el)))}}"""
async def main():
    bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        await pg.evaluate("goHome()"); await pg.wait_for_timeout(300)
        h = await pg.evaluate(BARS); ok = h <= 57; bad += not ok; print('首页 顶栏', round(h), 'OK' if ok else 'BAD')
        for js in SUBS:
            await pg.evaluate(js); await pg.wait_for_timeout(800)
            h = await pg.evaluate(BARS)
            await pg.evaluate("window.scrollTo(0, 1200)"); await pg.wait_for_timeout(300)
            bk = await pg.evaluate(BACK)
            await pg.evaluate("document.getElementById('r37MenuBtn').click()"); await pg.wait_for_timeout(200)
            mn = await pg.evaluate("(()=>{const m=document.getElementById('r37Menu'); return m.classList.contains('on') && /回首页/.test(m.textContent)})()")
            await pg.evaluate("document.getElementById('r37MenuBtn').click()")
            ok = h <= 60 and (1 - h / 844) >= 0.75 and bk and bk['top'] <= 8 and bk['hit'] and mn
            bad += not ok; print(js[:40], '顶栏', round(h), '返回', bk, '菜单', mn, 'OK' if ok else 'BAD')
        pg2 = await b.new_page(viewport={'width': 1280, 'height': 900}); await pg2.goto(APP.as_uri()); await pg2.wait_for_timeout(1200)
        await pg2.evaluate(SUBS[1]); await pg2.wait_for_timeout(500)
        d = await pg2.evaluate("(()=>{const h=document.querySelector('#globalSubNav .nav-btn.home'); return !!h && getComputedStyle(h).display!=='none'})()")
        bad += not d; print('电脑宽 回首页按钮可见', d)
        await b.close()
    print('errors', errs[:5] or 'none'); print('不合格', bad)
asyncio.run(main())
