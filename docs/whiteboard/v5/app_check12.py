"""app_check12.py —— 重复内容合并第 3 步回归（src/patch_dedup_c.py）：
① G07 白板固定播相关一幕（0）、不出分幕按钮；G08 / G09 / G10 决策 36 ①2 后三幕都是本课板，不固定（照常三幕）；代词全局原理照常三幕；
② 知识点组内各页顶部有「🔗 另见」条，当前页高亮，点了能跳；组外页面没有；
③ 总地图多出语法课 / 总结页节点，「按知识点」一节节点能跳转，进语法课记「看过」。0 报错。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
INFO = """()=>{const bar=document.getElementById('kpSeeBar'); const w=document.querySelector('[data-wb5hd]'); const f=document.querySelector('#wb5Frame'); return {key:bar&&bar.dataset.kpKey, chips:bar?bar.querySelectorAll('[data-kp-node]').length:0, wb:w&&w.dataset.wb5hd, fixed:w&&w.dataset.fixed||null, act:f&&f.dataset.case}}"""
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        await pg.evaluate("localStorage.clear(); appState.visited = {}")
        for g, act, fx in (('G07', '0', '1'), ('G08', '0', None), ('G09', '0', None), ('G10', '0', None)):
            await pg.evaluate(f"navigateTo('grammar_detail', {{ gId: '{g}' }})"); await pg.wait_for_timeout(600)
            r = await pg.evaluate(INFO)
            if not (r['key'] == 'gr:' + g and r['chips'] >= 5 and r['fixed'] == fx and r['act'] == act): bad.append(f'{g} {r}')
        for go, key, fixed in (("navigateTo('grammar_summary_hub', { summaryTab: 'pronouns' })", 'sum:pronouns', None), ("navigateTo('super_lab_hub', { labTab: 'aux_transformer' })", 'lab:aux_transformer', None),
                               ("navigateTo('grammar_detail', { gId: 'G02' })", 'gr:G02', None), ("navigateTo('zh_en_hub', { scene: 'ze_pronoun' })", 'ze:ze_pronoun', None), ("navigateTo('grammar_detail', { gId: 'G11' })", None, None)):
            await pg.evaluate(go); await pg.wait_for_timeout(600)
            r = await pg.evaluate(INFO)
            if r['key'] != key or (key and r['chips'] < 4) or r['fixed'] != fixed: bad.append(f'{go} {r}')
        await pg.evaluate("navigateTo('grammar_detail', { gId: 'G16' })"); await pg.wait_for_timeout(500)
        await pg.click('#kpSeeBar [data-kp-node="lab:aux_transformer"]'); await pg.wait_for_timeout(500)
        if await pg.evaluate("currentView.screen + ':' + superLabState.labTab") != 'super_lab_hub:aux_transformer': bad.append('另见跳转')
        await pg.evaluate("navigateTo('app_map')"); await pg.wait_for_timeout(500)
        r = await pg.evaluate("({kp: document.querySelectorAll('[data-map-kp-node]').length, gr: appMapNodes().filter(n=>n.key.startsWith('gr:')).length, sum: appMapNodes().filter(n=>n.key.startsWith('sum:')).length, seen: ['gr:G07','gr:G02','sum:pronouns'].every(k=>isVisitedKey(k))})")
        if r['kp'] < 25 or r['gr'] != 40 or r['sum'] < 3 or not r['seen']: bad.append(f'总地图 {r}')
        await pg.click('[data-map-kp-node="gr:G01"]'); await pg.wait_for_timeout(300)
        if await pg.evaluate("currentView.screen + ':' + currentView.params.gId") != 'grammar_detail:G01': bad.append('地图跳转')
        await b.close()
    print('不合格', len(bad), bad); print('errors', 'none' if not errs else errs)
asyncio.run(main())
