"""app_check8.py —— 词卡「📖 真实词源」+「💡 巧记小故事」两块的 App 回归（HANDOFF §5.2 1b）。
抽 ETYM_DB 里 15 词 + 不在库里的 10 词：开卡 → 揭示（背面）→ 检查真实词源块（在库 = real、带两个出处链接；不在库 = none「暂未收录」）、
巧记块文字 = 旧 etymology 去掉标题前缀（R1 不丢字）、旧标题「📖 词源与巧记故事」不在；再用 openWordModal（词表弹窗）各抽 5 词同样检查。0 报错。"""
import asyncio, pathlib, random, json, re
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
INFO = """(()=>{const r=document.querySelector('[data-etym]'), t=document.querySelector('[data-etym-tip]');
 return {real: r && r.getAttribute('data-etym'), links: r ? r.querySelectorAll('a').length : 0, tip: t ? t.innerText : '', old: document.body.innerText.includes('📖 词源与巧记故事')}})()"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        db = await pg.evaluate("Object.keys(etymData('ETYM_DB_JSON'))")
        ws = await pg.evaluate("VOCAB_DB.filter(w=>!(w.is_function_word&&w.func_info)).map(w=>[w.id, w.word.trim(), w.etymology||w.memory_tip||''])")   # 功能词卡旧版就不显示词源块
        random.seed(5); inn = [w for w in ws if w[1] in db]; out = [w for w in ws if w[1] not in db]
        sample = random.sample(inn, min(15, len(inn))) + random.sample(out, 10); bad = 0
        for k, (wid, word, ety) in enumerate(sample):
            for opener in ([f"openWordCardModal({json.dumps(wid)}, []); cardModalState.revealed=true; cardModalState.flipped=true; renderWordCardModalContent()"] + ([f"closeDetailModal&&closeDetailModal(); MH.openWordModal({json.dumps(wid)})"] if k % 5 == 0 else [])):
                await pg.evaluate(opener); await pg.wait_for_timeout(500); x = await pg.evaluate(INFO)
                exp_tip = re.sub(r'^📖\s*【[^】]*】\s*', '', ety).strip()
                if re.match(r'^记忆锦囊：属于【[^】]*】高频核心词。?$', exp_tip) or exp_tip == '考场必考不规则/拼写变形词': exp_tip = ''   # 重复内容合并 1：占位文字不当巧记
                indb = word in db and not wid.startswith('V6_MORPH_')   # 变形词不按拼写查词源
                ok = x['real'] == ('real' if indb else 'none') and (x['links'] == 2 if indb else True) and (' '.join(x['tip'].split()).endswith(' '.join(re.sub(r'<[^>]+>', '', exp_tip).split())[-20:]) if exp_tip else True) and not x['old']
                bad += not ok
                if not ok or k < 3: print(word, 'OK' if ok else 'BAD', x['real'], x['links'], x['tip'][:50])
            await pg.evaluate("closeDetailModal && closeDetailModal()")
        ph = await pg.evaluate("VOCAB_DB.filter(w=>/^V6_/.test(w.id)&&etymIsPlaceholderTip(w.memory_tip)).map(w=>w.id)")
        for wid in ph[::60] + ['V6_MORPH_21']:
            await pg.evaluate(f"openWordCardModal({json.dumps(wid)}, []); cardModalState.revealed=true; cardModalState.flipped=true; renderWordCardModalContent()"); await pg.wait_for_timeout(300)
            y = await pg.evaluate("({theme: !!document.querySelector('[data-etym-theme]'), tip: document.querySelectorAll('[data-etym-tip]').length, ph: /记忆锦囊：属于|考场必考不规则\\/拼写变形词/.test(document.body.innerText), real: (document.querySelector('[data-etym]')||{}).dataset?.etym})")
            ok = y['theme'] and y['tip'] == 0 and not y['ph'] and (y['real'] == 'none' if wid.startswith('V6_MORPH_') else True); bad += not ok
            if not ok: print(wid, 'BAD 占位', y)
            await pg.evaluate("closeDetailModal && closeDetailModal()")
        print(f'占位词 {len(ph)}（抽 {len(ph[::60]) + 1}）')
        print(f'{len(sample)} 词（在库 {min(15, len(inn))}），不合格 {bad}；errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
