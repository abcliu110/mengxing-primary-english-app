"""jargoncheck.py [--list] —— 决策 37 / R37-11、R37-12：儿童页可见文字里不得出现开发术语 / 过时旧名。入 runall。
同一页里指向同一目的地的入口出现 ≥ 2 次也算（重复入口）。\n扫：首页、各大厅、单词表、40 个语法点、实验室全部页签、方法论页、单词身世 / 中英对照总枢、练习与档案、总地图、单词卡；
家长门弹窗（家长区）不扫。术语表 TERMS 改动请写理由。"""
import asyncio, pathlib, re, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
TERMS = [r'总结矩阵', r'Canvas', r'canvas', r'\bHD\b', r'高清', r'\bR[1-4]\b', r'runall', r'\bSVG\b', r'\bv5(\.1)?\b', r'iframe', r'localStorage', r'JSON',
         r'四大总结矩阵', r'王炸', r'需求文档', r'开发者', r'\bdebug\b', r'TODO', r'\bDB\b', r'_DB', r'数据库', r'渲染', r'引擎', r'组件', r'模块化', r'回归测试',
         r'决策 ?\d+', r'patch', r'\bAPI\b']
SCREENS = ["goHome()", "navigateTo('vocab_hall')", "navigateTo('grammar_hall')", "navigateTo('oral_hall')", "navigateTo('principles_hub')", "navigateTo('practice_hub')",
           "navigateTo('word_list')", "navigateTo('my_study')", "navigateTo('self_test')", "navigateTo('app_map')", "navigateTo('method_hub')",
           "navigateTo('word_origins_hub')", "navigateTo('zh_en_hub')", "navigateTo('oral_func_map')", "navigateTo('v6_hub')",
           "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })", "navigateTo('grammar_summary_hub')", "navigateTo('first_principles_hub')", "navigateTo('grammar_playground')",
           "navigateTo('grammar_cat', { cat: '词法' })", "navigateTo('grammar_cat', { cat: '时态' })", "navigateTo('grammar_cat', { cat: '句型' })", "navigateTo('oral_scenario', { sid: 'SC01' })", "navigateTo('vocab_formation')", "navigateTo('vocab_relations')", "navigateTo('vocab_frames')",
           "navigateTo('word_list'); setTimeout(()=>openWordCardModal(VOCAB_DB[0].id), 200)"]
GET = "()=>document.body.innerText"
DUP = """()=>{const m={}; if(currentView.screen==='app_map') return []; document.querySelectorAll('#appViewRoot [onclick]').forEach(e=>{ if(!e.offsetParent || e.closest('.home-continue,#kpSeeBar')) return; const oc=e.getAttribute('onclick'); if(!/navigateTo|goHome/.test(oc)) return;
  const k=oc.replace(/\\s+/g,' '); (m[k]=m[k]||[]).push(e.textContent.trim().replace(/\\s+/g,' ').slice(0,24)); });
  return Object.entries(m).filter(([k,v])=>v.length>1).map(([k,v])=>k.slice(0,70)+' ← '+v.join(' / '))}"""
async def main():
    lst = '--list' in sys.argv; hits = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        extra = [f"navigateTo('grammar_detail', {{ gId: '{g}' }})" for g in await pg.evaluate("GRAMMAR_DB.map(g=>g.id)")]
        tabs = await pg.evaluate("(typeof LAB_GROUPS!=='undefined' ? LAB_GROUPS.flatMap(g=>(g.tabs||g.items||[]).map(t=>t.id||t[0]||t)) : [])")
        extra += [f"navigateTo('super_lab_hub', {{ labTab: '{t}' }})" for t in tabs if isinstance(t, str)]
        for js in SCREENS + extra:
            try: await pg.evaluate(js)
            except Exception as e: print('nav err', js[:50], str(e)[:60]); continue
            await pg.wait_for_timeout(250)
            t = await pg.evaluate(GET)
            for d in await pg.evaluate(DUP): hits.setdefault(('重复入口', d), js[:60])
            for term in TERMS:
                for m in re.finditer(term, t):
                    ctx = t[max(0, m.start() - 14): m.end() + 14].replace('\n', ' ')
                    hits.setdefault((term, ctx), js[:60])
        await b.close()
    for (term, ctx), js in sorted(hits.items()):
        print(f'[{term}] …{ctx}…  @ {js}') if lst else None
    print('页面', len(SCREENS + extra), '个；命中', len(hits), '处'); print('errors', errs[:5] or 'none'); print('不合格', len(hits))
asyncio.run(main())
