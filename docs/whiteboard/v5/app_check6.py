"""app_check6.py [子主题序号…] —— 主题思维导图讲解幕（hd_mindmap）App 回归：
每个子主题打开「🗺️ 主题思维导图视图」→ 上方讲解幕已换成 v5 iframe（幕号 = 子主题顺序）、能挂载播放；下方交互导图仍在：
16 个节点可点（点节点 → 弹出单词卡）、➕/➖/滚轮缩放、拖拽平移、🔄 复位都正常；全程 0 报错。默认 25 个全测。"""
import asyncio, pathlib, sys, json
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
only = [int(x) for x in sys.argv[1:]]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text)); pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1200)
        subs = await pg.evaluate("[...new Set(VOCAB_DB.map(w => w.theme_sub))]")
        bad = 0
        for i, sub in enumerate(subs):
            if only and i + 1 not in only: continue
            await pg.evaluate(f"navigateTo('vocab_theme', {{ sub: {json.dumps(sub, ensure_ascii=False)}, viewMode: 'mindmap' }})"); await pg.wait_for_timeout(2600)
            info = await pg.evaluate("""(()=>{const f=document.getElementById('wb5Frame'); const c=document.getElementById('themeMindMapCanvas');
              const above = f && c ? (f.getBoundingClientRect().top < c.getBoundingClientRect().top) : false;
              return {tab: f && f.dataset.tab, case: f && +f.dataset.case, dur: f && f.contentWindow && f.contentWindow.__dur ? Math.round(f.contentWindow.__dur) : 0, above, canvas: !!c, nodes: mmState.hitNodes.length}})()""")
            # 缩放（按钮 + 滚轮）、复位、拖拽
            z = await pg.evaluate("(()=>{zoomMindMap(1.18); const a=mmState.scale; zoomMindMap(0.85); const b2=mmState.scale; resetMindMap(); return [a, b2, mmState.scale]})()")
            cv = await pg.query_selector('#themeMindMapCanvas'); await cv.scroll_into_view_if_needed(); bb = await cv.bounding_box()
            await pg.mouse.move(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await pg.mouse.wheel(0, -100); await pg.wait_for_timeout(100)
            wheel = await pg.evaluate("mmState.scale"); await pg.evaluate("resetMindMap()")
            await pg.mouse.move(bb['x'] + 60, bb['y'] + 60); await pg.mouse.down(); await pg.mouse.move(bb['x'] + 140, bb['y'] + 100, steps=4); await pg.mouse.up()
            drag = await pg.evaluate("[mmState.offsetX, mmState.offsetY]"); await pg.evaluate("resetMindMap()")
            # 点第一个单词节点 → 单词卡弹出
            n0 = await pg.evaluate("(()=>{const c=document.getElementById('themeMindMapCanvas'); const n=mmState.hitNodes[0]; return {x:n.x*c.getBoundingClientRect().width/c.width, y:n.y*c.getBoundingClientRect().height/c.height, id:n.wordId}})()")
            await pg.mouse.click(bb['x'] + n0['x'], bb['y'] + n0['y']); await pg.wait_for_timeout(600)
            card = await pg.evaluate("[document.getElementById('detailModal').style.display, cardModalState.wordId]")
            await pg.evaluate("closeDetailModal()"); await pg.wait_for_timeout(200)
            ok = (info['tab'] == 'hd_mindmap' and info['case'] == i and info['dur'] > 30 and info['above'] and info['canvas'] and info['nodes'] == min(16, info['nodes'] or 16) and info['nodes'] > 0
                  and z[0] > 1 and z[2] == 1 and wheel > 1 and drag != [0, 0] and card == ['flex', n0['id']])
            bad += not ok
            print(i + 1, sub, '✅' if ok else '❌', info, 'zoom', [round(x, 2) for x in z], 'wheel', round(wheel, 2), 'drag', drag, 'card', card)
        print('不合格', bad, 'errors', errs[:5] or 'none'); await b.close()
asyncio.run(main())
