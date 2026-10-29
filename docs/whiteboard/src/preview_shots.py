#!/usr/bin/env python3
"""preview_shots.py <tab> [输出目录] [比例,比例,...]
用 preview.html 把某页签的每个案例在指定进度（默认 0.55 和 1.0）截图，并打印报错。
图片名：<输出目录>/<tab>_c<序号>_<百分比>.png"""
import sys, os
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
tab = sys.argv[1] if len(sys.argv) > 1 else 'bamboo_tree'
OUT = sys.argv[2] if len(sys.argv) > 2 else '/tmp'
fr = [float(x) for x in sys.argv[3].split(',')] if len(sys.argv) > 3 else [0.55, 1.0]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1000, 'height': 640})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.goto('file://' + os.path.join(HERE, 'preview.html') + '?tab=' + tab); pg.wait_for_timeout(600)
    n = pg.evaluate('__count()')
    for i in range(n):
        end = pg.evaluate(f'__load({i})'); print(tab, 'case', i + 1, 'end', round(end, 1))
        for f in fr:
            pg.evaluate(f'__seek({end * f - 0.01})')
            pg.locator('#st').screenshot(path=f'{OUT}/{tab}_c{i + 1}_{int(f * 100)}.png')
        bad = pg.evaluate("document.getElementById('st').outerHTML.match(/NaN|undefined/g)")
        if bad: errs.append(f'case {i + 1}: NaN/undefined in SVG')
    print('errors', errs); b.close()
