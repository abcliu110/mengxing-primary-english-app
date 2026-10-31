"""app_check_parts.py —— 决策 36-② 长幕分节（src/patch_wb5_parts.py，WB5_PARTS_V1）App 回归：
每个分了节的幕：白板下有「第 1 节 / 第 2 节」按钮 → 第 1 节可播 → 点第 2 节换成 <页签>_p2 子幕可播 → 点回第 1 节 → 0 报错。
没分节的幕不出按钮（抽 tense_matrix 第 1 幕）。输出「不合格 N」与 errors。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
CASES = [   # (页签, 幕号, 进入页面的 JS)
    ('tense_matrix', 2, "navigateTo('super_lab_hub', { labTab: 'tense_matrix' }); superLabState.tenseIdx=2; renderSuperLabHubView();"),
    ('fp_economy', 0, "navigateTo('first_principles_hub', { lawIdx: FIRST_PRINCIPLES_DB.findIndex(l => l.id === 'fp_economy'), actIdx: 0 })"),
    ('hd_g07', 0, "navigateTo('grammar_detail', { gId: 'G07' })"),
]
NONE = [('tense_matrix', 0, "navigateTo('super_lab_hub', { labTab: 'tense_matrix' }); superLabState.tenseIdx=0; renderSuperLabHubView();")]
INFO = "(()=>{const f=document.getElementById('wb5Frame'); return f ? {tab:f.dataset.tab, case:f.dataset.case, dur:f.contentWindow.__dur && Math.round(f.contentWindow.__dur*10)/10, parts:document.querySelectorAll('.wb5-parts button').length} : null})()"
async def main():
    bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        for tab, i, js in CASES:
            await pg.evaluate(js); await pg.wait_for_timeout(2500)
            a = await pg.evaluate(INFO)
            await pg.click('.wb5-parts button[data-wb5part="1"]'); await pg.wait_for_timeout(2500)
            c = await pg.evaluate(INFO)
            await pg.click('.wb5-parts button[data-wb5part="0"]'); await pg.wait_for_timeout(2500)
            d = await pg.evaluate(INFO)
            ok = bool(a and a['parts'] == 2 and a['tab'] == tab and a['dur'] and c and c['tab'] == tab + '_p2' and c['case'] == str(i) and c['dur'] and d and d['tab'] == tab and d['dur'])
            bad += not ok; print('✅' if ok else '❌', tab, i, '第1节', a, '第2节', c, '回第1节', d)
        for tab, i, js in NONE:
            await pg.evaluate(js); await pg.wait_for_timeout(2000)
            a = await pg.evaluate(INFO); ok = bool(a and a['parts'] == 0 and a['dur'])
            bad += not ok; print('✅' if ok else '❌', tab, i, '不分节', a)
        print(f'分节回归 不合格 {bad}'); print('errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
