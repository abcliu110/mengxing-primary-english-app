#!/usr/bin/env python3
"""把 rough.js 内联进主 HTML，并注入 wbRoughify 函数与 wbPrepare 钩子。"""
import re
from pathlib import Path

ROUGH_SRC = Path("../docs/whiteboard/v5/rough_inline.js").read_text(encoding="utf-8")
HTML_PATH = Path("mengxing-prototype-v1.html")
html = HTML_PATH.read_text(encoding="utf-8")

# 1. 在 </head> 前注入 rough.js + wbRoughify 函数
ROUGHIFY_SCRIPT = """
<script>
/* ===== rough.js 4.6.6 内联（手绘质感） ===== */
""" + ROUGH_SRC + """
</script>
<script>
/* wbRoughify(stage) — 对白板 SVG 中的 .wbd path/line 元素应用手绘扰动。
   在 wbPrepare() 最前面调用，确保路径数据替换后再量 getTotalLength()。
   roughness 1.2 = 可见但不夸张；disableMultiStroke=true 保持单笔，
   动画 stroke-dashoffset 才能正确描出来。 */
function wbRoughify(stage) {
  if (!window.Rough || !stage) return;
  var gen = Rough.generator();
  var idx = 0;
  /* ---- path.wbd ---- */
  stage.querySelectorAll('path.wbd').forEach(function(el) {
    var d = el.getAttribute('d');
    if (!d) return;
    try {
      var dr = gen.path(d, {roughness: 1.2, bowing: 1.1, seed: ++idx,
                            disableMultiStroke: true, preserveVertices: false});
      for (var j = 0; j < dr.sets.length; j++) {
        if (dr.sets[j].type === 'path') {
          el.setAttribute('d', gen.opsToPath(dr.sets[j]));
          break;
        }
      }
    } catch(e) {}
  });
  /* ---- line.wbd → 转成 path.wbd 再粗化 ---- */
  stage.querySelectorAll('line.wbd').forEach(function(el) {
    var x1 = +el.getAttribute('x1')||0, y1 = +el.getAttribute('y1')||0;
    var x2 = +el.getAttribute('x2')||0, y2 = +el.getAttribute('y2')||0;
    try {
      var dr = gen.line(x1, y1, x2, y2, {roughness: 1.2, bowing: 1.1,
                        seed: ++idx, disableMultiStroke: true});
      for (var j = 0; j < dr.sets.length; j++) {
        if (dr.sets[j].type === 'path') {
          var np = document.createElementNS('http://www.w3.org/2000/svg','path');
          np.setAttribute('d', gen.opsToPath(dr.sets[j]));
          ['class','stroke','stroke-width','stroke-linecap','stroke-linejoin',
           'fill','opacity','stroke-dasharray'].forEach(function(a){
            var v = el.getAttribute(a); if(v!==null) np.setAttribute(a,v);
          });
          np.style.cssText = el.style.cssText;
          el.parentNode && el.parentNode.replaceChild(np, el);
          break;
        }
      }
    } catch(e) {}
  });
}
</script>"""

if '<script>\n/* ===== rough.js' in html:
    print("rough.js already injected, skipping step 1")
else:
    html = html.replace('</head>', ROUGHIFY_SCRIPT + '\n</head>', 1)
    print("Step 1: rough.js + wbRoughify injected before </head>")

# 2. 在 PN 系 wbPrepare 和 AR 系 wbPrepare 的第一行后各插入 wbRoughify 调用
# 两者都以 "function wbPrepare(){\n  wbS.items = [];" 开头
HOOK = "  if(window.wbRoughify) wbRoughify(wbS.stage);"
target = "function wbPrepare(){\n  wbS.items = [];"
replacement = "function wbPrepare(){\n" + HOOK + "\n  wbS.items = [];"

count = html.count(target)
if count == 0:
    print("WARNING: wbPrepare pattern not found!")
else:
    html = html.replace(target, replacement)
    print(f"Step 2: wbRoughify hook injected into {count} wbPrepare(s)")

HTML_PATH.write_text(html, encoding="utf-8")
print("Done. File written.")
