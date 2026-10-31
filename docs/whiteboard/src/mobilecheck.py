#!/usr/bin/env python3
"""mobilecheck.py [--verbose] —— 决策 29 O4：手机 / 平板适配检查。
视口：手机 390×844、平板竖 768×1024、平板横 1024×768。逐个打开主要页面（含单词卡弹窗），检查：
  ① 无横向滚动：document.scrollingElement.scrollWidth <= 视口宽 + 1；
  ② 触控目标 ≥ 44 px：可见的 button / a / [onclick] / [role=button] / select / input[type=button|checkbox|radio] 的点击框宽高都 ≥ 44
     （一行文字里的内联链接例外：display:inline 且父元素是正文段落，按 WCAG 2.5.8 的 inline 例外）；
  ③ 文字 ≥ 12 px：可见文字节点所在元素的计算字号 ≥ 12（iframe 白板内部不查——那是画布，字号随白板缩放）。
输出每页不合格数和前几个样例；返回码非 0 = 不通过。"""
import asyncio, pathlib, sys, json
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
VERBOSE = '--verbose' in sys.argv
VIEWS = [('手机', 390, 844), ('平板竖', 768, 1024), ('平板横', 1024, 768)]
PAGES = [
    ('首页', "navigateTo('home')"),
    ('单词大厅', "navigateTo('vocab_hall')"),
    ('单词表', "navigateTo('word_list')"),
    ('思维导图', "navigateTo('vocab_theme', { sub: '动物大世界', viewMode: 'mindmap' })"),
    ('自然拼读', "navigateTo('vocab_phonics')"),
    ('构词', "navigateTo('vocab_formation')"),
    ('词语关系', "navigateTo('vocab_relations')"),
    ('语法大厅', "navigateTo('grammar_hall')"),
    ('语法分类', "navigateTo('grammar_cat', { cat: '动词与时态' })"),
    ('语法点', "navigateTo('grammar_detail', { gId: GRAMMAR_DB[0].id })"),
    ('口语大厅', "navigateTo('oral_hall')"),
    ('口语场景', "navigateTo('oral_scenario', { scId: SCENARIO_DEFINITIONS[0].id, expIdx: 0 })"),
    ('交际句型地图', "navigateTo('oral_func_map')"),
    ('底层原理', "navigateTo('principles_hub')"),
    ('第一性原理', "navigateTo('first_principles_hub')"),
    ('中英对照', "navigateTo('zh_en_hub')"),
    ('单词身世', "navigateTo('word_origins_hub')"),
    ('实验室', "navigateTo('super_lab_hub')"),
    ('练习与档案', "navigateTo('practice_hub')"),
    ('我的学习', "navigateTo('my_study')"),
    ('综合自测', "navigateTo('self_test')"),
    ('总地图', "navigateTo('app_map')"),
    ('闯关游戏', "navigateTo('v6_hub')"),
    ('单词卡', "navigateTo('word_list'); setTimeout(()=>openWordCardModal(VOCAB_DB[0].id), 300)"),
]
PROBE = r"""(() => {
  const vw = innerWidth, out = { scroll: document.scrollingElement.scrollWidth - vw, wide: [], small: [], tiny: [] };
  const vis = el => { const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return null;
    for (let p = el; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (s.display === 'none') return null; }
    return r; };
  const name = el => (el.id ? '#' + el.id : el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '')) + ' 「' + (el.innerText || el.value || el.title || '').replace(/\s+/g, ' ').trim().slice(0, 14) + '」';
  // ① 超出视口的元素（只报最外层）
  document.querySelectorAll('body *').forEach(el => { const r = vis(el); if (!r) return;
    if (r.right > vw + 1 && !el.closest('[data-hscroll]')) { const cs = getComputedStyle(el.parentElement || el);
      if (!['auto', 'scroll', 'hidden', 'clip'].includes(cs.overflowX) && !(el.parentElement && el.parentElement.getBoundingClientRect().right > vw + 1)) out.wide.push(name(el) + ' →' + Math.round(r.right - vw)); } });
  // ② 触控目标
  document.querySelectorAll('button, a[href], a[onclick], [onclick], [role=button], select, input[type=button], input[type=submit], input[type=checkbox], input[type=radio]').forEach(el => {
    const r = vis(el); if (!r) return; if (r.bottom < 0 || r.top > innerHeight * 6) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'inline' && el.parentElement && /^(P|LI|SPAN|TD|DIV)$/.test(el.parentElement.tagName) && (el.parentElement.innerText || '').trim().length > (el.innerText || '').trim().length + 8) return;
    if (el.closest('[onclick]') !== el && el.closest('[onclick]')) { const pr = el.closest('[onclick]').getBoundingClientRect(); if (pr.width >= 44 && pr.height >= 44) return; }
    if (r.width < 43.5 || r.height < 43.5) out.small.push(name(el) + ' ' + Math.round(r.width) + '×' + Math.round(r.height)); });
  // ③ 文字字号
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const seen = new Set();
  while (w.nextNode()) { const t = w.currentNode; if (!t.nodeValue.trim()) continue; const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    if (el.closest('script,style,noscript,svg,canvas')) continue; const r = vis(el); if (!r) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 11.95) out.tiny.push(name(el) + ' ' + fs + 'px'); }
  return out; })()"""
async def main():
    bad_total = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for vname, W, H in VIEWS:
            pg = await b.new_page(viewport={'width': W, 'height': H}, is_mobile=W < 700, has_touch=True); errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
            for pname, js in PAGES:
                try:
                    await pg.evaluate("try{closeDetailModal()}catch(e){}"); await pg.evaluate(js); await pg.wait_for_timeout(900)
                    r = await pg.evaluate(PROBE)
                except Exception as e:
                    print(f'{vname} {pname} ❌ 打不开 {e}'); bad_total += 1; continue
                n = (r['scroll'] > 1) + len(r['small']) + len(r['tiny'])
                bad_total += n
                line = f"{vname} {pname} {'✅' if not n else '❌'} 横滚{max(0, r['scroll'])} 小目标{len(r['small'])} 小字{len(r['tiny'])}"
                if n and (VERBOSE or True):
                    if r['scroll'] > 1: line += '\n   超宽：' + ' | '.join(r['wide'][:4])
                    if r['small']: line += '\n   小目标：' + ' | '.join(r['small'][:(20 if VERBOSE else 4)])
                    if r['tiny']: line += '\n   小字：' + ' | '.join(r['tiny'][:(20 if VERBOSE else 4)])
                print(line)
            if errs: print(vname, 'errors', errs[:3]); bad_total += len(errs)
            await pg.close()
        await b.close()
    print("不合格", bad_total)
    sys.exit(1 if bad_total else 0)
asyncio.run(main())
