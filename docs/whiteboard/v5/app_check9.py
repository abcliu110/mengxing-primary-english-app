"""app_check9.py —— 决策 14 练习闭环 + 总地图 App 回归。
① 每个有小测的模块（MODULE_QUIZ_JSON 全部 key）：进入 → 小测面板挂在白板下方、key 对、白板 iframe 仍在；
② 3 个模块完整答一遍（第 1 题故意答错）：错词进错题本（status=mistake）、成绩页出现、≥60% 时 appState.moduleQuiz 点亮；拼写题输入框可用；
③ 总地图：节点数 = 四大区模块数，点亮数一致，点节点能跳转；首页有「🗺️ 总地图」按钮。0 报错。"""
import asyncio, pathlib, json
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
GO = {'lab': "navigateTo('super_lab_hub', {{ labTab: '{0}' }})", 'wo': "navigateTo('word_origins_hub', {{ scene: '{0}' }})", 'ze': "navigateTo('zh_en_hub', {{ scene: '{0}' }})"}
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        await pg.evaluate("localStorage.clear(); appState.moduleQuiz = {}; saveAppState()")
        home = await pg.evaluate("!!document.querySelector('[data-home-map]')")
        keys = await pg.evaluate("Object.keys(etymData('MODULE_QUIZ_JSON'))"); bad = 0
        for k in keys:
            a, t = k.split(':', 1); await pg.evaluate(GO[a].format(t)); await pg.wait_for_timeout(500)
            x = await pg.evaluate("""(()=>{const m=document.getElementById('mqPanel'), f=document.querySelector('#appViewRoot iframe');
              return {key: m && m.getAttribute('data-mq-key'), after: !!(m && f && (f.compareDocumentPosition(m) & 4)), frame: !!f}})()""")
            ok = x['key'] == k and x['frame'] and x['after']; bad += not ok
            if not ok: print('BAD', k, x)
        print(f'① 模块 {len(keys)}，面板不合格 {bad}')
        lit = 0
        for k in keys[:3]:
            a, t = k.split(':', 1); await pg.evaluate(GO[a].format(t)); await pg.wait_for_timeout(400)
            await pg.click('[data-mq-start]'); first_wrong = None
            for qi in range(5):
                q = await pg.evaluate("mqState && mqState.i < mqState.qs.length ? {kind: mqState.qs[mqState.i].kind, word: mqState.qs[mqState.i].w.word.trim(), id: mqState.qs[mqState.i].w.id} : null")
                if not q: break
                ans = 'zzzz' if qi == 0 else q['word']
                if qi == 0: first_wrong = q['id']
                if q['kind'] == 'spell': await pg.fill('[data-mq-input]', ans); await pg.press('[data-mq-input]', 'Enter')
                elif qi == 0: await pg.evaluate("mqAnswer('zzzz')")
                else: await pg.click(f"[data-mq-opt=\"{q['word']}\"]")
                await pg.click('[data-mq-next]')
            r = await pg.evaluate("[document.querySelector('[data-mq-result]') && document.querySelector('[data-mq-result]').getAttribute('data-mq-result'), appState.moduleQuiz[%s], getItemRecord('vocab', %s).status]" % (json.dumps(k), json.dumps(first_wrong)))
            n = int(r[0].split('/')[1]); good = r[0] and r[2] == 'mistake' and (bool(r[1]) == ((n - 1) >= -(-n * 6 // 10)))
            lit += bool(r[1]); print('②', k, r[0], 'lit' if r[1] else 'not lit', '错题本:', r[2], 'OK' if good else 'BAD'); bad += not good
        await pg.evaluate("navigateTo('app_map')"); await pg.wait_for_timeout(500)
        m = await pg.evaluate("""(()=>({nodes: new Set([...document.querySelectorAll('[data-map-node]')].map(x=>x.getAttribute('data-map-node'))).size, gold: new Set([...document.querySelectorAll('[data-map-state=gold]')].map(x=>x.getAttribute('data-map-node'))).size, expect: appMapNodes().length}))()""")
        await pg.click('[data-map-node="lab:pron_map"]'); await pg.wait_for_timeout(500); jumped = await pg.evaluate("currentView.screen + ':' + superLabState.labTab")
        okm = m['nodes'] == m['expect'] and m['gold'] == lit and jumped == 'super_lab_hub:pron_map' and home; bad += not okm
        print('③ 总地图', m, '跳转', jumped, '首页按钮', home, 'OK' if okm else 'BAD')
        print(f'不合格 {bad}；errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
