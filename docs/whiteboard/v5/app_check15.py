"""app_check15.py —— 决策 33 菜单去重回归（src/patch_menu_home.py 起，后续 ③–⑤ 往这里加）。
② 首页只有 5 个入口卡（data-home-entry），各自进对 screen；首页不再有实验室入口卡 / 闯关厅横幅 / 方法论小卡；
   我的学习 / 综合自测 / 总地图三个按钮在第 5 张卡里且可用；
   13 个实验室页签都能从新位置点进去（单词大厅专项区 / 语法分类页末尾 / 底层原理页），进去后 super_lab_hub 页签对、面包屑是所属分区、
   页签条只列同分区页签、「↩ 回到」回到所属分区；旧入口 navigateTo('super_lab_hub', { labTab }) 照常可用。0 报错。"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
WHERE = {  # 页签 → (从哪里点, 所属分区首页)
    'pron_map': ('vocab_hall', 'vocab_hall'), 'intonation_map': ('vocab_hall', 'vocab_hall'),
    'eight_endings': ('vocab_hall', 'vocab_hall'), 'irregular_plural': ('vocab_hall', 'vocab_hall'), 'past_clans': ('vocab_hall', 'vocab_hall'),
    'phrasal_key': ('vocab_hall', 'vocab_hall'),
    'tense_matrix': ("grammar_cat|动词与时态", 'grammar_hall'), 'aux_transformer': ("grammar_cat|动词与时态", 'grammar_hall'),
    'five_patterns': ("grammar_cat|句型", 'grammar_hall'), 'adj_order': ("grammar_cat|句型", 'grammar_hall'), 'writing_alchemist': ("grammar_cat|句型", 'grammar_hall'),
    'metaphor_code': ('principles_hub', 'principles_hub'), 'bamboo_tree': ('principles_hub', 'principles_hub'),
}
async def go(pg, where):
    if where.startswith('grammar_cat|'): await pg.evaluate(f"navigateTo('grammar_cat', {{ cat: '{where.split('|')[1]}' }})")
    else: await pg.evaluate(f"navigateTo('{where}')")
    await pg.wait_for_timeout(350)
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(1500)
        ent = await pg.evaluate("[...document.querySelectorAll('#appViewRoot [data-home-entry]')].map(e=>e.dataset.homeEntry)")
        if ent != ['vocab', 'grammar', 'oral', 'principles', 'practice']: bad.append(f'首页入口 {ent}')
        left = await pg.evaluate("({lab:document.querySelectorAll('#appViewRoot .lab-entry,#appViewRoot .lab-chip').length, v6:document.querySelectorAll('#appViewRoot [onclick*=\"v6_hub\"]').length, mh:document.querySelectorAll('#appViewRoot [onclick*=\"method_hub\"]').length, portals:document.querySelectorAll('#appViewRoot .portal-card').length})")
        if left != {'lab': 0, 'v6': 0, 'mh': 0, 'portals': 5}: bad.append(f'首页残留 {left}')
        for e, scr in (('vocab', 'vocab_hall'), ('grammar', 'grammar_hall'), ('oral', 'oral_hall'), ('principles', 'principles_hub'), ('practice', 'practice_hub')):
            await pg.evaluate("goHome()"); await pg.wait_for_timeout(250)
            await pg.click(f'[data-home-entry={e}] .portal-enter-btn'); await pg.wait_for_timeout(350)
            if await pg.evaluate("currentView.screen") != scr: bad.append(f'入口 {e}')
        for sel, scr in (('[data-home-my]', 'my_study'), ('[data-home-test]', 'self_test'), ('[data-home-map]', 'app_map')):
            await pg.evaluate("goHome()"); await pg.wait_for_timeout(250)
            await pg.click(sel); await pg.wait_for_timeout(350)
            if await pg.evaluate("currentView.screen") != scr: bad.append(f'第5卡按钮 {sel}')
        await pg.evaluate("navigateTo('principles_hub')"); await pg.wait_for_timeout(300)
        n = await pg.evaluate("document.querySelectorAll('[data-principles-card]').length")
        if n < 4: bad.append(f'底层原理卡 {n}')
        await pg.evaluate("navigateTo('practice_hub')"); await pg.wait_for_timeout(300)
        n = await pg.evaluate("document.querySelectorAll('[data-practice-card]').length")
        if n < 3: bad.append(f'练习与档案卡 {n}')
        for tab, (where, home) in WHERE.items():
            await go(pg, where)
            loc = pg.locator(f'[data-lab-chip={tab}], [data-principles-card={tab}]')
            if await loc.count() < 1: bad.append(f'{tab} 在 {where} 没有入口'); continue
            await loc.first.click(); await pg.wait_for_timeout(700)
            r = await pg.evaluate("({s:currentView.screen, t:superLabState.labTab, bc:document.getElementById('uiBreadcrumb').innerText, tabs:document.querySelectorAll('#appViewRoot .lab-tab').length, top:labTop(labGroupOf(superLabState.labTab))})")
            ntab = await pg.evaluate(f"LAB_GROUPS.filter(g => labTop(g) === labTop(labGroupOf('{tab}'))).reduce((a, g) => a + g.tabs.length, 0)")
            if not (r['s'] == 'super_lab_hub' and r['t'] == tab and r['top'] in r['bc'] and '王炸' not in r['bc'] and r['tabs'] == ntab): bad.append(f'{tab} {r} 期望页签 {ntab}')
            await pg.click('[data-lab-back]'); await pg.wait_for_timeout(300)
            if await pg.evaluate("currentView.screen") != home: bad.append(f'{tab} 回到 {home}')
        for tab in WHERE:   # 旧入口
            await pg.evaluate(f"navigateTo('super_lab_hub', {{ labTab: '{tab}' }})"); await pg.wait_for_timeout(250)
            if await pg.evaluate("superLabState.labTab") != tab: bad.append(f'旧入口 {tab}')
        await b.close()
    print('不合格', len(bad), bad); print('errors', 'none' if not errs else errs)
asyncio.run(main())
