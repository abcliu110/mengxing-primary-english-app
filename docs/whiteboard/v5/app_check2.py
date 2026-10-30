"""app_check2.py <fp|wo|ze> <幕 id> <幕数> —— 第一性原理 / 单词身世 / 中英对照 替换进 App 后的回归：逐幕检查 v5 iframe 挂载、时长、0 报错。"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
kind, sid, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        for i in range(n):
            if kind == 'fp': js = f"navigateTo('first_principles_hub', {{ lawIdx: FIRST_PRINCIPLES_DB.findIndex(l => l.id === '{sid}'), actIdx: {i} }})"
            elif kind == 'wo': js = f"navigateTo('word_origins_hub', {{ scene: '{sid}' }}); woSelectScene('{sid}')"
            else: js = f"navigateTo('zh_en_hub', {{ scene: '{sid}' }}); zeSelectScene('{sid}')"
            await pg.evaluate(js); await pg.wait_for_timeout(2500)
            info = await pg.evaluate("(()=>{const f=document.getElementById('wb5Frame'); if(!f) return {v5:false}; return {v5:true, case:f.dataset.case, dur:f.contentWindow.__dur && Math.round(f.contentWindow.__dur*10)/10}})()")
            print(kind, sid, i + 1, info)
        print('errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
