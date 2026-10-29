#!/usr/bin/env python3
# 拖动 / 重播状态正确性：14 个时刻 × 3 种到达方式（直接跳、正常播放、从结尾往回拖）截图比对
import hashlib
from playwright.sync_api import sync_playwright
HERE='/workspace/work/mx/docs/whiteboard/src'
T=[3,25.2,41,79.5,92,101,113,121,131,140,150,168,182,196]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1000,'height':700})
    pg.goto('file://'+HERE+'/preview.html?tab=wo_port'); pg.wait_for_timeout(400)
    pg.evaluate("__load(0)"); pg.evaluate("window.__p = WB.mount(document.getElementById('st'), WB_LAB.wo_port[0].build, 7)")
    shot=lambda: hashlib.md5(pg.locator('#st').screenshot()).hexdigest()
    bad=[]
    for t in T:
        pg.evaluate(f"__p.render({t})"); a=shot()
        pg.evaluate(f"(()=>{{for(let x={t}-7.3;x<{t};x+=1/60)__p.render(x);__p.render({t})}})()"); c=shot()
        pg.evaluate(f"__p.render(__p.end-.1);__p.render({t})"); d=shot()
        if not (a==c==d): bad.append(t)
    print('pixel seek determinism: checked',len(T),'mismatched',bad)
    b.close()
