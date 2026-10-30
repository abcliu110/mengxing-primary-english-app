"""app_check10.py —— 决策 33 ① 回归：我的学习 my_study + 综合自测 self_test（src/patch_my_study.py）。
① 旧 screen 名 vocab_my / grammar_my / oral_my 重定向到 my_study（kind、filter 带过去），lastView 记 my_study；
② 我的学习 3 个类型标签、错题本/学习中/已掌握切换不丢外壳；三大厅状态卡跳 my_study；
③ 综合自测 3 类可切换，开测进 quiz_engine；有错题时出现「只测错题本」且只测错题；首页两个入口按钮。0 报错。"""
import asyncio, pathlib, json
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(1500)
        if await pg.locator('[data-home-my]').count() != 1 or await pg.locator('[data-home-test]').count() != 1: bad.append('首页入口')
        S = "()=>({s:currentView.screen,p:currentView.params,my:!!document.querySelector('[data-my-study]'),st:!!document.querySelector('[data-self-test]'),k:(document.querySelector('.pill-tab.active[data-my-kind]')||{dataset:{}}).dataset.myKind,lv:appState.lastView&&appState.lastView.screen})"
        for old, k in (('vocab_my', 'vocab'), ('grammar_my', 'grammar'), ('oral_my', 'oral')):
            await pg.evaluate(f"navigateTo('{old}', {{ filter: 'learning' }})"); await pg.wait_for_timeout(250)
            r = await pg.evaluate(S)
            if not (r['s'] == 'my_study' and r['p'].get('kind') == k and r['p'].get('filter') == 'learning' and r['my'] and r['k'] == k and r['lv'] == 'my_study'): bad.append(f'重定向 {old} {r}')
        await pg.click('[data-my-kind=grammar]'); await pg.wait_for_timeout(200)
        await pg.click('#appViewRoot .pill-tab:not([data-my-kind]) >> nth=0'); await pg.wait_for_timeout(200)
        r = await pg.evaluate(S)
        if not (r['p'] == {'kind': 'grammar', 'filter': 'mistake'} and r['my']): bad.append(f'标签切换 {r}')
        for hall in ('vocab_hall', 'grammar_hall', 'oral_hall'):
            await pg.evaluate(f"navigateTo('{hall}')"); await pg.wait_for_timeout(300)
            await pg.click('.status-card.mastered'); await pg.wait_for_timeout(250)
            r = await pg.evaluate(S)
            if not (r['s'] == 'my_study' and r['p'].get('kind') == hall.split('_')[0] and r['p'].get('filter') == 'mastered'): bad.append(f'大厅卡 {hall} {r}')
        for k in ('vocab', 'grammar', 'oral'):
            await pg.evaluate(f"navigateTo('self_test', {{ kind: '{k}' }})"); await pg.wait_for_timeout(250)
            r = await pg.evaluate(S)
            if not (r['s'] == 'self_test' and r['st'] and r['k'] == k): bad.append(f'自测 {k} {r}')
            await pg.click('[data-self-start]'); await pg.wait_for_timeout(300)
            if await pg.evaluate("currentView.screen") != 'quiz_engine': bad.append(f'开测 {k}')
        ids = await pg.evaluate("(()=>{const a=[VOCAB_DB[3].id, VOCAB_DB[40].id]; a.forEach(id=>recordQuizResult('vocab', id, false)); return a;})()")
        await pg.evaluate("navigateTo('self_test', { kind: 'vocab' })"); await pg.wait_for_timeout(250)
        if await pg.locator('[data-self-mistake]').count() != 1: bad.append('只测错题本按钮')
        else:
            await pg.click('[data-self-mistake]'); await pg.wait_for_timeout(300)
            got = await pg.evaluate("JSON.stringify(quizState.itemIds)")
            if sorted(json.loads(got)) != sorted(ids) or await pg.evaluate("currentView.screen") != 'quiz_engine': bad.append(f'错题自测 {got[:200]}')
        await pg.evaluate("navigateTo('my_study', { kind: 'vocab', filter: 'mistake' })"); await pg.wait_for_timeout(250)
        n = await pg.evaluate("document.querySelectorAll('#appViewRoot [onclick^=\"openWordCardModal\"]').length")
        if n != 2: bad.append(f'错题本列表 {n}')
        await b.close()
    print('不合格', len(bad), bad); print('errors', 'none' if not errs else errs)
asyncio.run(main())
