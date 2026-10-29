#!/usr/bin/env python3
"""reg_render.py <主文件.html> <输出.json> [id…] —— 渲染回归：在主文件里把每个已登记白板幕
（全部 WB_LAB 页签 / 原理 / 溯源幕的每个案例）挂到一个离屏 SVG 上，在 5 个时刻（每次挂载的随机 id 前缀统一换成 wbID）（0.15/0.35/0.55/0.8/1.0 × 总长）
渲染，记录每个时刻 SVG outerHTML 的 sha1。新旧两个版本各跑一次，再用 --diff 比较：

  python3 reg_render.py old.html /tmp/old.json
  python3 reg_render.py 萌星小学英语_最终合并版.html /tmp/new.json
  python3 reg_render.py --diff /tmp/old.json /tmp/new.json      # 打印差异数，0 = 逐字节一致

按需加载之后，主文件里的幕不一定已经执行：先调 wbLoadAll()（有的话）把全部模块载入再渲染。
"""
import hashlib, json, os, sys
if sys.argv[1] == '--diff':
    a = json.load(open(sys.argv[2])); b = json.load(open(sys.argv[3]))
    keys = sorted(set(a) | set(b)); diff = [k for k in keys if a.get(k) != b.get(k)]
    print(f"items old={len(a)} new={len(b)} diff={len(diff)}")
    for k in diff[:40]: print("  ", k, "old" if k in a else "-", "new" if k in b else "-")
    sys.exit(1 if diff else 0)
from playwright.sync_api import sync_playwright
MAIN = os.path.abspath(sys.argv[1]); OUT = sys.argv[2]; only = sys.argv[3:]
JS = r"""(only) => {
  if (typeof wbLoadAll === 'function') wbLoadAll();
  const ids = (only && only.length) ? only : Object.keys(WB_LAB).sort();
  const res = {}, host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:0;top:0;width:960px;opacity:0;pointer-events:none';
  document.body.appendChild(host);
  for (const id of ids) (WB_LAB[id] || []).forEach((cs, i) => {
    host.innerHTML = '<svg id="regStage" style="width:960px;height:600px"></svg>';
    let p; try { p = WB.mount(host.firstChild, cs.build, 7 + i); } catch (e) { res[id + '#' + i] = 'ERR ' + e.message; return; }
    for (const f of [.15, .35, .55, .8, 1]) { p.render(p.end * f); const h = host.firstChild.outerHTML, m = h.match(/id="(wb[a-z0-9]{4,10})g"/); res[id + '#' + i + '@' + f] = m ? h.split(m[1]).join('wbID') : h; }
  });
  host.remove(); return res;
}"""
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1280, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("file://" + MAIN); pg.wait_for_timeout(1200)
    pg.evaluate("document.fonts && document.fonts.ready")
    res = pg.evaluate(JS, only)
    b.close()
out = {k: (v if v.startswith('ERR') else hashlib.sha1(v.encode()).hexdigest()) for k, v in res.items()}
json.dump(out, open(OUT, 'w'), indent=0, ensure_ascii=False)
print(f"{len(out)} renders, scenes={len({k.split('@')[0] for k in out})}, errors={errs}")
