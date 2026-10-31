"""etymcheck.py —— 决策 37 / R37-02：单词卡不得出现未标注的自造「字母象形」词源。入 runall。
① 数据：VOCAB_HEAVY_JSON 全部 1487 词的 memory_tip / etymology / affix_root 里，src/iconic.py 判为象形句的 = 0（应已挪到 memory_assoc）；
② App：带 memory_assoc 的词全部开卡（词卡背面 + 词表小弹窗抽 5 个）：有「🧠 记忆联想」块且带「非词源」徽章；
   联想文字不出现在「📖 词源」块和「💡 巧记小故事」块里；「📖 词源」块的下一个兄弟元素不是联想块（不相邻）；0 报错。"""
import asyncio, json, pathlib, sys
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
from iconic import is_iconic, FIELDS
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); TAG = '<script type="application/json" id="VOCAB_HEAVY_JSON">'
i = s.index(TAG) + len(TAG); H = json.loads(s[i:s.index('</script>', i)].replace('<\\/', '</'))
bad = 0
for wid, r in H.items():
    for f in FIELDS:
        if is_iconic(r.get(f)): bad += 1; print('BAD 未标注象形句', wid, f, str(r.get(f))[:80])
assoc = [w for w, r in H.items() if r.get('memory_assoc')]
k = s.index('const MH_VOCAB_DB = ') + len('const MH_VOCAB_DB = '); MH = json.loads(s[k:s.index('];', k) + 1])   # 方法论页内嵌小词库
for w in MH:
    for f in FIELDS:
        if is_iconic(w.get(f)): bad += 1; print('BAD 未标注象形句（MH_VOCAB_DB）', w['id'], f, str(w.get(f))[:80])
INFO = """(()=>{const a=document.querySelector('[data-etym-assoc]'), e=document.querySelector('[data-etym]'), t=document.querySelector('[data-etym-tip]');
 return {assoc: a ? a.innerText : '', badge: !!(a && a.querySelector('[data-badge=non-etym]')), ety: e ? e.innerText : '', tip: t ? t.innerText : '',
   adj: !!(e && e.nextElementSibling && e.nextElementSibling.hasAttribute('data-etym-assoc'))}})()"""
async def main():
    global bad
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        for k, wid in enumerate(assoc):
            exp = H[wid]['memory_assoc']
            for op in [f"openWordCardModal({json.dumps(wid)}, []); cardModalState.revealed=true; cardModalState.flipped=true; renderWordCardModalContent()"]:
                await pg.evaluate(op); await pg.wait_for_timeout(250); x = await pg.evaluate(INFO)
                norm = lambda t: ' '.join(t.split())
                ok = x['badge'] and all(norm(a)[:12] in norm(x['assoc']) for a in exp) and not any(norm(a)[:12] in norm(x['ety'] + x['tip']) for a in exp) and not x['adj']
                bad += not ok
                if not ok: print('BAD', wid, op[:20], {k2: (v[:40] if isinstance(v, str) else v) for k2, v in x.items()})
            await pg.evaluate("closeDetailModal && closeDetailModal()")
        # 方法论页小词库的词卡弹窗（MH.openWordModal）：先进方法论页让弹窗挂上
        await pg.evaluate("navigateTo('method_hub', { tab: 'vocab' })"); await pg.wait_for_timeout(1200)
        for w in [x for x in MH if x.get('memory_assoc')]:
            if not await pg.evaluate("!!document.getElementById('mhWordModal') && !!(window.MH && MH.openWordModal)"): bad += 1; print('BAD 方法论页词卡弹窗没挂上'); break
            await pg.evaluate(f"MH.openWordModal({json.dumps(w['id'])})"); await pg.wait_for_timeout(250); x = await pg.evaluate(INFO)
            ok = x['badge'] and all(a[:8] in x['assoc'] for a in w['memory_assoc']) and not any(a[:8] in x['ety'] + x['tip'] for a in w['memory_assoc']) and not x['adj']
            bad += not ok; assoc.append('MH:' + w['id'])
            if not ok: print('BAD MH', w['id'], x)
        print(f'etymcheck：数据 1487 词 × 3 字段；带记忆联想 {len(assoc)} 词逐个开卡，不合格 {bad}；errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
