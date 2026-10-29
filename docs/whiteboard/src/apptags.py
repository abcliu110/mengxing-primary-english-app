#!/usr/bin/env python3
"""apptags.py [输出目录] —— 📖 身世标签验收（决策 11 + 12）：
1) WO_ORIGIN_TAGS 里每个词都在 VOCAB_DB 里、指向的溯源幕已上线（woSceneReady）；
2) 打开每个词的词卡 → 翻到背面 → 有身世标签；没登记的词（如 reporter）没有标签；
3) 点标签 → 关闭词卡、跳到单词身世总枢对应的幕，白板已挂载；
4) 页面无报错。截一张词卡背面图 <输出目录>/app_tag_<词>.png。"""
import os, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp'
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1280, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto("file://" + MAIN); pg.wait_for_timeout(1200)
    tags = pg.evaluate("Object.keys(WO_ORIGIN_TAGS)")
    bad = pg.evaluate("""() => Object.entries(WO_ORIGIN_TAGS).flatMap(([w, ts]) => {
      const out = []; if (!VOCAB_DB.find(x => x.word.toLowerCase() === w)) out.push(w + ': 不在词库');
      ts.forEach(t => { if (!woSceneReady(t.scene)) out.push(w + ': 幕未上线 ' + t.scene); }); return out; })""")
    print("tagged words:", len(tags), tags, "data problems:", bad)
    ok_all = True
    for w in tags + ['reporter']:
        wid = pg.evaluate(f"(VOCAB_DB.find(x => x.word.toLowerCase() === '{w}') || {{}}).id")
        if not wid: print(w, "not in VOCAB_DB"); continue
        pg.evaluate(f"openWordCardModal('{wid}'); flipCurrentWordCard();"); pg.wait_for_timeout(250)
        n = pg.evaluate("(document.querySelector('#detailModal [data-origin-tags]') || {}).dataset?.originTags || 0")
        expect = 0 if w == 'reporter' else 1
        ok = int(n) >= expect and (expect or int(n) == 0)
        ok_all &= ok
        if w in ('import', 'reporter'):
            el = pg.query_selector('#detailModal')
            if el: el.screenshot(path=f"{OUT}/app_tag_{w}.png")
        print(f"{w:10s} id={wid} tags={n} {'✔' if ok else '✘'}")
        pg.evaluate("closeDetailModal()"); pg.wait_for_timeout(100)
    # 点标签跳转
    wid = pg.evaluate("VOCAB_DB.find(x => x.word.toLowerCase() === 'passport').id")
    pg.evaluate(f"openWordCardModal('{wid}'); flipCurrentWordCard();"); pg.wait_for_timeout(250)
    pg.click("#detailModal [data-origin-tags] button"); pg.wait_for_timeout(1200)
    nav = pg.evaluate("[currentView.screen || currentView.name || '', woState.scene, document.getElementById('detailModal').style.display, !!document.getElementById('woWbStage') && !!wbState.player && wbState.key === woState.scene + '#0']")
    print("click tag → view/scene/modal/mounted:", nav)
    print("errors:", errs, "| RESULT:", "PASS" if ok_all and not bad and nav[1] == 'wo_port' and nav[2] == 'none' and nav[3] and not errs else "FAIL")
    b.close()
