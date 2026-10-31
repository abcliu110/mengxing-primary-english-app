"""app_check15.py —— 决策 33 菜单去重回归（src/patch_menu_home.py 起，后续 ③–⑤ 往这里加）。
③ 闯关厅只剩闯关游戏，旧页签重定向到新家且搬来的内容块在；method_hub 不带 tab 重定向底层原理，6 个页签单页显示、入口都在所属分区。
④ 语法大厅不再有总结 / 歌谣 / 纠偏入口；4 张总结表从词法 / 句型末尾单表打开；8 首歌谣、5 个纠偏神器、2 个微训练在对应语法点页签里；旧入口重定向。
⑤ 单词表 word_list 取代主题 / 闪电词 / 词性三个列表：筛选数对、旧入口重定向、4 对重叠子主题合成一个筛选且导图互加另见、闪认训练只练不规则词。
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
        # ③ 方法论教室 / 闯关厅收编
        MOVED = {'homo': ('vocab_phonics', 'homo'), 'ant': ('vocab_relations', 'ant'), 'oral': ('oral_hall', 'oral12'), 'excl': ('grammar_detail', 'excl'),
                 'essay': ('super_lab_hub', 'essay'), 'etym': ('vocab_formation', 'etym'), 'morph': ('vocab_formation', 'morph')}
        for t, (scr, box) in MOVED.items():
            await pg.evaluate(f"navigateTo('v6_hub', {{ tab: '{t}' }})"); await pg.wait_for_timeout(700)
            r = await pg.evaluate("({s:currentView.screen, b:(document.getElementById('d33Box')||{dataset:{}}).dataset.d33, n:document.querySelectorAll('#d33Box [onclick], #d33Box > div > div').length})")
            if not (r['s'] == scr and r['b'] == box and r['n'] >= 5): bad.append(f'闯关厅 {t} → {r}')
        await pg.evaluate("navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })"); await pg.wait_for_timeout(400)
        await pg.evaluate("currentView.params.tab='homophones'; renderVocabPhonicsView();"); await pg.wait_for_timeout(400)
        if await pg.evaluate("(document.getElementById('d33Box')||{dataset:{}}).dataset.d33") != 'homo': bad.append('页签切换后同音词块')
        await pg.evaluate("navigateTo('v6_hub')"); await pg.wait_for_timeout(900)
        r = await pg.evaluate("({tabs:getComputedStyle(document.querySelector('#v6HubRoot .v6-tabs')).display, game:!!document.querySelector('#v6panel-game.active'), n:V6H.data.GAME_BANKS.vocab.length, bc:document.getElementById('uiBreadcrumb').innerText})")
        if not (r['tabs'] == 'none' and r['game'] and r['n'] >= 25 and '练习与档案' in r['bc']): bad.append(f'闯关游戏页 {r}')
        await pg.evaluate("navigateTo('method_hub')"); await pg.wait_for_timeout(400)
        if await pg.evaluate("currentView.screen") != 'principles_hub': bad.append('method_hub 重定向')
        HOME = {'matrix': 'principles_hub', 'oral': 'principles_hub', 'vocab': 'vocab_hall', 'writing': 'grammar_hall', 'engine': 'practice_hub', 'trumps': 'practice_hub'}
        for t, home in HOME.items():
            await pg.evaluate(f"navigateTo('method_hub', {{ tab: '{t}' }})"); await pg.wait_for_timeout(900)
            r = await pg.evaluate(f"({{on:getComputedStyle(document.getElementById('view-{t}')).display, hdr:getComputedStyle(document.querySelector('.method-hub .top-header')).display, txt:document.getElementById('view-{t}').innerText.length}})")
            if not (r['on'] == 'block' and r['hdr'] == 'none' and r['txt'] > 200): bad.append(f'方法论 {t} {r}')
            await pg.click('[data-mh-back]'); await pg.wait_for_timeout(300)
            if await pg.evaluate("currentView.screen") != home: bad.append(f'方法论 {t} 回到 {home}')
        ent = {('vocab_hall', "[data-mh-chip=matrix]"), ('vocab_hall', "[data-mh-chip=vocab]"), ("grammar_cat|句型", "[data-mh-chip=writing]"),
               ('principles_hub', '[data-principles-card=mh_matrix]'), ('principles_hub', '[data-principles-card=mh_oral]'),
               ('practice_hub', '[data-practice-card=mh_engine]'), ('practice_hub', '[data-practice-card=mh_trumps]')}
        for where, sel in ent:
            await go(pg, where)
            if await pg.locator(sel).count() != 1: bad.append(f'入口 {where} {sel}'); continue
            await pg.click(sel); await pg.wait_for_timeout(500)
            if await pg.evaluate("currentView.screen") != 'method_hub': bad.append(f'入口跳转 {sel}')
        # ④ 总结表 / 歌谣 / 纠偏
        await pg.evaluate("navigateTo('grammar_hall')"); await pg.wait_for_timeout(300)
        r = await pg.evaluate("({sum:document.querySelectorAll('#appViewRoot [onclick*=\"grammar_summary_hub\"]').length, ch:document.querySelectorAll('#appViewRoot [onclick*=\"grammar_chants\"],#appViewRoot [onclick*=\"grammar_playground\"]').length, note:!!document.querySelector('[data-grammar-moved]')})")
        if r != {'sum': 0, 'ch': 0, 'note': True}: bad.append(f'语法大厅残留 {r}')
        for k, cat in (('pronouns', '词法'), ('interrogatives', '句型'), ('how_what', '句型'), ('syntax', '句型')):
            await go(pg, 'grammar_cat|' + cat)
            if await pg.locator(f'[data-sum-chip={k}]').count() != 1: bad.append(f'总结表入口 {k}'); continue
            await pg.click(f'[data-sum-chip={k}]'); await pg.wait_for_timeout(700)
            r = await pg.evaluate("({s:currentView.screen, t:currentView.params.summaryTab, bc:document.getElementById('uiBreadcrumb').innerText, tabs:getComputedStyle(document.querySelector('[data-sum-tabs]')).display, len:document.getElementById('appViewRoot').innerText.length})")
            if not (r['s'] == 'grammar_summary_hub' and r['t'] == k and cat in r['bc'] and r['tabs'] == 'none' and r['len'] > 800): bad.append(f'总结表 {k} {r}')
            await pg.click('[data-sum-back]'); await pg.wait_for_timeout(300)
            if await pg.evaluate("currentView.screen + currentView.params.cat") != 'grammar_cat' + cat: bad.append(f'总结表 {k} 回到')
        X = await pg.evaluate("D33_GRAMMAR_EXTRAS")
        for cid, g in X['chants'].items():
            ci = await pg.evaluate(f"GRAMMAR_CHANTS.findIndex(c => c.id === '{cid}')")
            await pg.evaluate(f"navigateTo('grammar_chants', {{ chantIdx: {ci} }})"); await pg.wait_for_timeout(500)
            r = await pg.evaluate(f"({{s:currentView.screen, g:currentView.params.gId, box:!!document.querySelector('[data-d33g-chant={cid}]')}})")
            if r != {'s': 'grammar_detail', 'g': g, 'box': True}: bad.append(f'歌谣 {cid} {r}')
        for did, g in X['diagrams'].items():
            await pg.evaluate(f"navigateTo('grammar_detail', {{ gId: '{g}' }})"); await pg.wait_for_timeout(400)
            if await pg.locator('[data-d33g-tab=diag]').count() == 1: await pg.click('[data-d33g-tab=diag]'); await pg.wait_for_timeout(200)
            if await pg.locator(f'[data-d33g-diag={did}]').count() != 1: bad.append(f'纠偏 {did} 不在 {g}')
        for gm, g in X['games'].items():
            await pg.evaluate(f"navigateTo('grammar_detail', {{ gId: '{g}', extra: 'game' }})"); await pg.wait_for_timeout(400)
            await pg.click(f'[data-d33g-game={gm}]'); await pg.wait_for_timeout(500)
            r = await pg.evaluate("({s:currentView.screen, t:currentView.params.tab, body:document.getElementById('playgroundBody').innerText.length})")
            if not (r['s'] == 'grammar_playground' and r['t'] == gm and r['body'] > 30): bad.append(f'微训练 {gm} {r}')
            await pg.click('[data-pg-back]'); await pg.wait_for_timeout(300)
            if await pg.evaluate("currentView.params.gId") != g: bad.append(f'微训练 {gm} 回到')
        await pg.evaluate("navigateTo('grammar_playground', { tab: 'diagrams' })"); await pg.wait_for_timeout(400)
        if await pg.evaluate("currentView.screen + currentView.params.gId") != 'grammar_detailG19': bad.append('纠偏神器旧入口')
        await pg.evaluate("navigateTo('grammar_detail', { gId: 'G15' })"); await pg.wait_for_timeout(300)
        await pg.click('#globalSubNav .nav-btn.quiz-launch'); await pg.wait_for_timeout(400)   # 下一点 G16：歌谣页签要跟着换
        if await pg.evaluate("(document.getElementById('d33GBox')||{dataset:{}}).dataset.d33g") != 'G16': bad.append('下一点后语法点页签没跟上')
        # ⑤ 单词表合一
        WL = "({s:currentView.screen, p:currentView.params, n:+(document.querySelector('[data-wl-count]')||{dataset:{}}).dataset.wlCount, grid:document.querySelectorAll('#wlGrid [onclick^=\"openWordCardModal\"]').length})"
        await pg.evaluate("navigateTo('vocab_hall')"); await pg.wait_for_timeout(300)
        r = await pg.evaluate("({wl:document.querySelectorAll('[data-wl-entry]').length, fl:document.querySelectorAll('[data-wl-flash]').length, old:document.querySelectorAll('#appViewRoot [onclick*=\"vocab_pos\"],#appViewRoot [onclick*=\"vocab_theme\"],#appViewRoot [onclick*=\"vocab_sight\"]').length})")
        if r != {'wl': 1, 'fl': 1, 'old': 0}: bad.append(f'单词大厅入口 {r}')
        await pg.click('[data-wl-entry]'); await pg.wait_for_timeout(500)
        total = await pg.evaluate("VOCAB_DB.length"); r = await pg.evaluate(WL)
        if not (r['s'] == 'word_list' and r['n'] == total and r['grid'] == total): bad.append(f'单词表全部 {r} / {total}')
        for old, want in (("navigateTo('vocab_theme')", {}), ("navigateTo('vocab_theme', { sub: '天气与四季', viewMode: 'list' })", {'theme': '天气与四季', 'q': ''}),
                          ("navigateTo('vocab_sight', { filter: 'all', mode: 'browse' })", {'sight': 'irregular'}), ("navigateTo('vocab_pos', { posKey: 'adj.' })", {'pos': 'adj.'})):
            await pg.evaluate(old); await pg.wait_for_timeout(400); r = await pg.evaluate(WL)
            if not (r['s'] == 'word_list' and r['p'] == want and r['n'] > 0): bad.append(f'旧入口 {old} {r}')
        irr = await pg.evaluate("VOCAB_DB.filter(w => w.sight_type === 'irregular').length")
        await pg.evaluate("navigateTo('word_list', { sight: 'irregular' })"); await pg.wait_for_timeout(400); r = await pg.evaluate(WL)
        if r['n'] != irr or await pg.locator('[data-wl-sight-tip]').count() != 1: bad.append(f'闪电词 {r} / {irr}')
        await pg.evaluate("navigateTo('word_list', { pos: 'n.' })"); await pg.wait_for_timeout(300)
        if await pg.locator('[data-wl-pos-tip]').count() != 1: bad.append('词性总纲')
        for key, a, b2 in (('pair:num', '数字与计量', '数字与数量'), ('pair:color', '色彩与空间方位', '颜色与形状'), ('pair:mood', '个人特征与情绪', '情感与性格'), ('pair:pron', '语法功能与指代', '核心语法功能词')):
            await pg.evaluate(f"navigateTo('word_list', {{ theme: '{key}' }})"); await pg.wait_for_timeout(300); r = await pg.evaluate(WL)
            want = await pg.evaluate(f"VOCAB_DB.filter(w => w.theme_sub === '{a}' || w.theme_sub === '{b2}').length")
            mm = await pg.evaluate("document.querySelectorAll('[data-wl-mindmap]').length")
            if r['n'] != want or mm != 2: bad.append(f'合并主题 {key} {r["n"]}/{want} mm{mm}')
            if await pg.locator(f'[data-wl-theme="{key}"]').count() != 1: bad.append(f'主题筛选 {key}')
            await pg.evaluate(f"navigateTo('vocab_theme', {{ sub: '{b2}', viewMode: 'mindmap' }})"); await pg.wait_for_timeout(500)
            if await pg.locator('[data-mm-see-also]').count() != 1: bad.append(f'导图另见 {b2}')
        await pg.evaluate("navigateTo('word_list', { grade: 'G1', pos: 'n.' })"); await pg.wait_for_timeout(300); r = await pg.evaluate(WL)
        want = await pg.evaluate("VOCAB_DB.filter(w => w.id.startsWith('G1_') && w.pos.toLowerCase().includes('n.')).length")
        if r['n'] != want: bad.append(f'年级 + 词性 {r["n"]}/{want}')
        await pg.fill('[data-wl-q]', 'apple'); await pg.wait_for_timeout(300); r = await pg.evaluate(WL)
        if r['n'] < 1 or r['p'].get('q') != 'apple': bad.append(f'搜索 {r}')
        await pg.evaluate("navigateTo('vocab_hall')"); await pg.wait_for_timeout(300)
        await pg.click('[data-wl-flash]'); await pg.wait_for_timeout(600)
        r = await pg.evaluate("({s:currentView.screen, m:currentView.params.mode, irr:sightFlashState.pool.every(w => w.sight_type === 'irregular')})")
        if r != {'s': 'vocab_sight', 'm': 'flash', 'irr': True}: bad.append(f'闪认训练 {r}')
        await b.close()
    print('不合格', len(bad), bad); print('errors', 'none' if not errs else errs)
asyncio.run(main())
