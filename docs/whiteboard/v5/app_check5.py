"""app_check5.py —— 普通单词卡换成通用白板模板后的 App 回归（DESIGN_MINDMAP_WORDCARD.md §2.4）。
抽样（普通词 = 非多义、非功能词；功能词旧版不播动画）：每个子主题第 1 个非多义词 + 随机 30 词；每词：开卡 → 模板 iframe 已挂载、注入的是这个词、旧 canvas 不在 → 切 ①②③ 三幕 → 揭示释义（重渲染）→ 下一张 → 关闭；外加 1 个多义词确认仍走 hd_poly_*。0 报错。"""
import asyncio, pathlib, random, json
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
INFO = """(()=>{const w=document.querySelector('[data-wb5tpl]'), p=document.querySelector('[data-wb5hd]'), f=document.getElementById('wb5Frame');
  const cw=f&&f.contentWindow; return {tpl: !!w, poly: p && p.getAttribute('data-wb5hd'), word: cw && cw.__WB5_WORD__ && cw.__WB5_WORD__.id, act: cw && cw.__WB5_ACT__,
  dur: cw && cw.__dur && Math.round(cw.__dur), btns: w ? w.querySelectorAll('button').length : 0, oldCanvas: !!document.getElementById('wordModalCanvas')}})()"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        ws = await pg.evaluate("VOCAB_DB.map(w=>[w.id, w.theme_sub, !!(w.has_polysemy&&w.polysemy_data)||w.is_function_word, !!(w.has_polysemy&&w.polysemy_data)])")
        first = {}
        for i, sub, poly, _ in ws:
            if not poly: first.setdefault(sub, i)
        random.seed(11); plain = [i for i, _, poly, _ in ws if not poly]
        sample = list(first.values()) + random.sample([i for i in plain if i not in first.values()], 30)
        bad = 0
        for k, wid in enumerate(sample):
            await pg.evaluate(f"openWordCardModal({json.dumps(wid)}, {json.dumps(sample)})"); await pg.wait_for_timeout(2500 if k == 0 else 900)
            info = [await pg.evaluate(INFO)]
            if k < 6:   # 前 6 个词：三幕都切一遍 + 揭示释义重渲染
                for a in (1, 2, 0):
                    await pg.evaluate(f"wb5TplAct(document.querySelector('[data-wb5tpl]'), {a})"); await pg.wait_for_timeout(900); info.append(await pg.evaluate(INFO))
                await pg.evaluate("cardModalState.revealed=true; renderWordCardModalContent()"); await pg.wait_for_timeout(900); info.append(await pg.evaluate(INFO))
            ok = all(x['tpl'] and x['word'] == wid and x['dur'] and not x['oldCanvas'] and x['btns'] == 3 for x in info)
            bad += not ok
            if k < 6 or not ok: print(wid, 'OK' if ok else 'BAD', [(x['word'], x['act'], x['dur']) for x in info])
        poly = next(i for i, _, _, pl in ws if pl)
        await pg.evaluate(f"openWordCardModal({json.dumps(poly)}, [])"); await pg.wait_for_timeout(1200); print('poly', poly, await pg.evaluate(INFO))
        print(f'{len(sample)} 词，不合格 {bad}；errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
