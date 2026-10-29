#!/usr/bin/env python3
"""measure_load.py <主文件.html> [对比文件.html …] [--n 次数=9] —— 首屏可交互耗时（决策 13 验收：按需加载前后对比，不能变差）。
每次新开一个页面（无缓存）打开 file://主文件，记录：
  · dcl：DOMContentLoaded 结束（脚本全部解析执行完）
  · fcp：首次内容绘制
  · ready：首页可交互（appViewRoot 已渲染出首页，且主线程空闲能响应——用 setTimeout 0 往返确认）
  · enter_*：首次进入某个白板模块（含按需加载）的耗时：王炸实验室竹节句 / 第一性原理① / 单词身世 port / 万能动词 VV（1.7 MB 素材）
输出各项中位数（毫秒）。沙箱无 GPU，绝对值偏保守，只看前后对比。
"""
import json, os, statistics, sys
from playwright.sync_api import sync_playwright
A = sys.argv[1:]; N = int(A[A.index('--n') + 1]) if '--n' in A else 9
FILES = [os.path.abspath(a) for a in A if a.endswith('.html')]   # 多个文件时交替测，减少环境波动的影响
ENTER = {"enter_lab": "navigateTo('super_lab_hub',{labTab:'bamboo_tree'})",
         "enter_fp": "navigateTo('first_principles_hub',{lawIdx:0,actIdx:0})",
         "enter_wo": "navigateTo('word_origins_hub',{scene:'wo_port'})",
         "enter_vv": "navigateTo('super_lab_hub',{labTab:'verb_matrix'})"}
rows = {f: [] for f in FILES}
with sync_playwright() as pw:
    b = pw.chromium.launch()
    for i in range(N):
      for MAIN in FILES:
          ctx = b.new_context(viewport={"width": 1280, "height": 900}); pg = ctx.new_page()
          pg.goto("file://" + MAIN, wait_until="domcontentloaded")
          pg.wait_for_function("() => { const r = document.getElementById('appViewRoot'); return r && r.innerText.length > 50; }")
          ready = pg.evaluate("() => new Promise(r => setTimeout(() => r(performance.now()), 0))")
          nav = pg.evaluate("() => { const n = performance.getEntriesByType('navigation')[0]; const f = performance.getEntriesByName('first-contentful-paint')[0]; return {dcl: n.domContentLoadedEventEnd, load: n.loadEventEnd, fcp: f ? f.startTime : null}; }")
          row = dict(dcl=nav["dcl"], fcp=nav["fcp"], ready=ready)
          for k, js in ENTER.items():
              row[k] = pg.evaluate(f"() => {{ const a = performance.now(); {js}; return performance.now() - a; }}")
              pg.wait_for_timeout(150)
          rows[MAIN].append(row); ctx.close()
    b.close()
for f, rs in rows.items():
    med = {k: round(statistics.median([r[k] for r in rs if r[k] is not None]), 1) for k in rs[0]}
    print(json.dumps(dict(file=os.path.basename(f), runs=N, median_ms=med), ensure_ascii=False))
