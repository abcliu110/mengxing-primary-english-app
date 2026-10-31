"""app_check_vocab_add.py —— 决策 35 A2 新增词条的 App 回归。
每个 added_by = 35-A2 的词：开卡 → 功能词卡显示功能词说明块（不播动画）/ 普通词挂上单词卡模板 iframe 且注入的就是这个词、三个幕按钮；
揭示释义重渲染；单词表搜索能搜到；0 报错。"""
import asyncio, pathlib, json
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
INFO = """(()=>{const w=document.querySelector('[data-wb5tpl]'), f=document.getElementById('wb5Frame'); const cw=f&&f.contentWindow;
  const m=document.getElementById('wordCardModal')||document.body;
  return {tpl: !!w, word: cw && cw.__WB5_WORD__ && cw.__WB5_WORD__.id, btns: w ? w.querySelectorAll('button:not(.wb5-fs)').length : 0,
          text: (document.body.innerText||'')}})()"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        ws = await pg.evaluate("VOCAB_DB.filter(w=>w.added_by && w.added_by.startsWith('35-A2')).map(w=>[w.id, w.word, !!w.is_function_word, w.meaning])")
        ids = [w[0] for w in ws]; bad = 0
        for k, (wid, word, fn, mean) in enumerate(ws):
            await pg.evaluate(f"openWordCardModal({json.dumps(wid)}, {json.dumps(ids)})"); await pg.wait_for_timeout(2200 if k == 0 else 700)
            await pg.evaluate("cardModalState.revealed=true; renderWordCardModalContent()"); await pg.wait_for_timeout(500)
            x = await pg.evaluate(INFO)
            ok = (word.split(' / ')[0] in x['text']) and ((not x['tpl']) if fn else (x['tpl'] and x['word'] == wid and x['btns'] == 3))
            if not ok: bad += 1; print('BAD', wid, word, fn, {k2: v for k2, v in x.items() if k2 != 'text'})
        await pg.evaluate("window.closeWordCardModal && closeWordCardModal()")
        AL = json.loads((APP.parent / 'docs/whiteboard/lab/audit35/a2_alias.json').read_text(encoding='utf-8'))
        for a, (main, rel) in AL.items():   # 别名：不在列表里、开卡转主词条、主卡有「关系：词」标签
            await pg.evaluate(f"openWordCardModal({json.dumps(a)}, [{json.dumps(a)}])"); await pg.wait_for_timeout(250)
            x = await pg.evaluate(f"[cardModalState.wordId, (document.querySelector('[data-word-forms]')||{{}}).innerText||'', VOCAB_DB.some(w=>w.id==={json.dumps(a)}), (VOCAB_ALIAS_ENTRY[{json.dumps(a)}]||{{}}).word]")
            if x[0] != main or rel not in x[1] or x[2] or not x[3] or x[3] not in x[1]: bad += 1; print('BAD 别名', a, main, rel, x)
            await pg.evaluate("closeDetailModal()")
        n = await pg.evaluate("(()=>{let n=0; for (const w of VOCAB_DB.filter(w=>w.added_by&&w.added_by.startsWith('35-A2'))) { if (wlFilter({q: w.word.split(' / ')[0]}).some(v=>v.id===w.id)) n++; } return n;})()")
        if n != len(ws): bad += 1; print('BAD 单词表搜索', n, '/', len(ws))
        print(f'新增词 {len(ws)}（功能词 {sum(1 for w in ws if w[2])}），别名 {len(AL)}，单词表可搜 {n}，不合格 {bad}；errors', errs[:5] if errs else 'none')
        await b.close()
asyncio.run(main())
