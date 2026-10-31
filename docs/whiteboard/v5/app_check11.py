"""app_check11.py —— 重复内容合并第 2 步回归：别名词条（src/patch_dedup_b.py）。
① 别名词条不在 VOCAB_DB 列表里；每个别名的主词条存在、无环；② 旧 id 打开词卡 → 主词条，主词条卡上有「过去式：went」类标签；
③ 旧记录读档迁移进主 id，错题本计数与列表一致；④ 按词形跳卡 / 小测题单 / 模块小测都转主词条；⑤ center↔centre、studies、代词组只互链不重定向。0 报错。"""
import asyncio, pathlib, json
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(500)
        await pg.evaluate("""localStorage.setItem(STORAGE_KEY, JSON.stringify({wordRecords:{'V6_MORPH_20':{status:'mistake',streak:0,streakDays:['2026-10-30'],wrongCount:2},'V6_日常_1':{status:'mastered',streak:3,streakDays:['2026-10-01'],wrongCount:0}}}))""")
        await pg.reload(); await pg.wait_for_timeout(1500)
        r = await pg.evaluate("""(()=>{const ids=new Set(VOCAB_DB.map(w=>w.id)); const a=Object.keys(WORD_ALIAS); return {n:a.length, inList:a.filter(k=>ids.has(k)), noMain:a.filter(k=>!ids.has(resolveWordId(k))), noEntry:a.filter(k=>!VOCAB_ALIAS_ENTRY[k]), see:Object.values(WORD_SEE).flat().filter(x=>/^G\\d_|^V6_/.test(x[1])&&!ids.has(x[1])), grp:Object.values(WORD_GROUP_MEMBERS).flat().filter(m=>!ids.has(m)), rec:appState.wordRecords, cnt:countDomainStatus('vocab')}})()""")
        if r['n'] < 51 or r['inList'] or r['noMain'] or r['noEntry'] or r['see'] or r['grp']: bad.append(f'别名表 {r}')
        if list(r['rec']) != ['V6_日常_1'] or r['rec']['V6_日常_1']['status'] != 'mistake' or r['rec']['V6_日常_1']['wrongCount'] != 2: bad.append(f'迁移 {r["rec"]}')
        EXP = [('V6_MORPH_20', 'V6_日常_1', '过去式'), ('V6_颜色_1', 'G2_0452', '美式'), ('V6_颜色_12', 'V6_颜色_11', '美式'), ('V6_MORPH_16', 'V6_家庭_20', '复数'), ('V6_核心_14', 'V6_核心_13', '物主代词'),
               ('G5_0689', 'G5_0689', '英式'), ('G5_0374', 'G5_0374', '美式'), ('G6_273', 'G6_273', '原形'), ('G4_174', 'G4_174', '三单'), ('G1_P01', 'G1_P01', '单词卡'), ('V6_核心_0', 'V6_核心_0', '词组卡')]
        for wid, main, lab in EXP:
            await pg.evaluate(f"openWordCardModal('{wid}', ['{wid}'])"); await pg.wait_for_timeout(200)
            x = await pg.evaluate("[cardModalState.wordId, (document.querySelector('[data-word-forms]')||{}).innerText||'']")
            if x[0] != main or lab not in x[1]: bad.append(f'词卡 {wid} {x}')
            await pg.evaluate("closeDetailModal()")
        await pg.evaluate("jumpOrSpeakWord('went')")
        if await pg.evaluate("cardModalState.wordId") != 'V6_日常_1': bad.append('按词形跳卡')
        await pg.evaluate("closeDetailModal()")
        await pg.evaluate("startQuizSession('vocab',['V6_MORPH_20','V6_日常_1','V6_MORPH_21'],'t')")
        if sorted(await pg.evaluate("quizState.itemIds")) != ['V6_日常_1', 'V6_日常_17']: bad.append('小测题单')
        q = await pg.evaluate("mqWords('lab:five_patterns').map(w=>w.id)")
        if 'V6_MORPH_16' in q or len(q) != len(set(q)): bad.append(f'模块小测 {q}')
        await pg.evaluate("navigateTo('my_study',{kind:'vocab',filter:'mistake'})"); await pg.wait_for_timeout(300)
        n = await pg.evaluate("document.querySelectorAll('#appViewRoot [onclick^=\"openWordCardModal\"]').length")
        if n != r['cnt']['mistake']: bad.append(f'错题本 {n} vs {r["cnt"]}')
        await b.close()
    print('不合格', len(bad), bad); print('errors', 'none' if not errs else errs)
asyncio.run(main())
