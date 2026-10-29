#!/usr/bin/env python3
"""preview_shots.py [输出目录] —— 用 preview.html 把 5 个案例在 55% 和结尾各截一张图，并打印报错"""
import sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp'
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1000,'height':640})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    pg.goto('file://' + os.path.join(HERE, 'preview.html')); pg.wait_for_timeout(500)
    for i in range(5):
        end=pg.evaluate(f'__load({i})'); print('case',i+1,'end',round(end,1))
        for frac in [0.55,1.0]:
            t=end*frac-0.01
            pg.evaluate(f'__seek({t})'); pg.locator('#st').screenshot(path=f'{OUT}/c{i+1}_{int(frac*100)}.png')
    print('errors',errs); b.close()
