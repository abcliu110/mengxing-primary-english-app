"""app_check13.py —— 决策 34-A 回归：构词页挂词库全部真派生词（src/patch_affix_vocab.py）+ 词卡构词栏（MORPH_DB 并入）。
① 前缀 / 后缀页签末尾的卡数、词数 = AFFIX_WORDS_JSON；0 词词缀单列；uncle / under 不在 un- 下；② 派生词族页签有词族；
③ 点派生词开对应词卡，词卡出「🧩 真实构词」；抽 20 个派生词，词卡都有构词栏。0 报错。"""
import asyncio, pathlib
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        d = await pg.evaluate("affixData()")
        for tab, typ in (('prefixes', 'prefix'), ('suffixes', 'suffix')):
            await pg.evaluate(f"navigateTo('vocab_formation', {{ tab: '{tab}' }})"); await pg.wait_for_timeout(400)
            r = await pg.evaluate(f"({{cards: document.querySelectorAll('[data-affix-vocab=\"{typ}\"] [data-affix]').length, words: document.querySelectorAll('[data-affix-vocab=\"{typ}\"] [data-affix-word]').length, zero: !!document.querySelector('[data-affix-zero]')}})")
            exp_c = sum(1 for x in d['a'] if x[1] == typ); exp_w = sum(len(x[3]) for x in d['a'] if x[1] == typ)
            if r['cards'] != exp_c or r['words'] != exp_w or (any(z[1] == typ for z in d['z']) and not r['zero']): bad.append(f'{tab} {r} 期望 {exp_c}/{exp_w}')
        un = await pg.evaluate("Array.from(document.querySelectorAll('[data-affix]')).length")
        await pg.evaluate("navigateTo('vocab_formation', { tab: 'prefixes' })"); await pg.wait_for_timeout(300)
        unw = await pg.evaluate("Array.from(document.querySelectorAll('[data-affix=\"un-\"] [data-affix-word]')).map(x=>x.dataset.affixWord)")
        if not unw or 'uncle' in unw or 'under' in unw: bad.append(f'un- {unw}')
        await pg.click('[data-affix="un-"] [data-affix-word] a'); await pg.wait_for_timeout(300)
        if await pg.evaluate("VOCAB_DB.find(w=>w.id===cardModalState.wordId).word") != unw[0]: bad.append('点词开卡')
        await pg.evaluate("closeDetailModal()")
        await pg.evaluate("navigateTo('vocab_formation', { tab: 'matrices' })"); await pg.wait_for_timeout(300)
        if await pg.evaluate("document.querySelectorAll('[data-affix-fam]').length") < 10: bad.append('派生词族')
        ws = [w for x in d['a'] for w in x[3]][::14][:20]
        for w, wid, split in ws:
            await pg.evaluate(f"openWordCardModal(resolveWordId('{wid}'), []); cardModalState.revealed=true; cardModalState.flipped=true; renderWordCardModalContent()"); await pg.wait_for_timeout(200)
            t = await pg.evaluate("(document.querySelector('[data-etym]')||{}).innerText||''")
            if '真实构词' not in t: bad.append(f'词卡构词 {w}')
            await pg.evaluate("closeDetailModal()")
        await b.close()
    print('不合格', len(bad), bad); print('errors', 'none' if not errs else errs)
asyncio.run(main())
