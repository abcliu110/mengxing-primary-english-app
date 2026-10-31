"""patch_r37_contrast.py —— 决策 37 / R37-14：按钮对比度 ≥ 4.5:1（大字 ≥ 3:1）（幂等；标记 R37_14_CONTRAST）。
现状（contrastcheck.py 390 px 扫 18 页）：15 种按钮配色不达标，例如白字 + #059669 / #0d9488 / #16a34a 绿底（3.3–3.8）、
#d97706 橙字白底（3.1）、#94a3b8 灰字白底（2.6）、#0284c7 / #db2777 / #e11d48 字配同色浅底（3.8–4.2）。
这些颜色散在几百处行内样式和 JS 拼出来的模板里（不少是 `color:${m.color}` 这种数据驱动的），逐处改容易漏，所以分两层：
  ① 统一按钮色板（静态 CSS）：常用的几种绿底白字按钮（#059669 / #0d9488 / #16a34a 底、quiz-launch / 口语入口渐变）换深一档（emerald-700 / teal-700 / green-700）；
  ② 运行时对比度守卫：每次渲染后，对可点元素（button / [onclick] / .pill-tab / .nav-btn …）里带字的元素算 WCAG 对比度，
     不达标时——深字浅底：把字色按比例压暗直到达标；浅字深底：把背景（含渐变每个色标）压暗直到达标。色相不变，只变深。
检查：src/contrastcheck.py（入 runall）。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); n = 0
CSS = '''<style id="r37-contrast">
/* R37_14_CONTRAST：统一按钮色板（白字用的绿底换深一档） */
button[style*="background:#059669"], button[style*="background: #059669"], [onclick][style*="background:#059669"], [onclick][style*="background: #059669"] { background-color: #047857 !important; }
button[style*="background:#0d9488"], button[style*="background: #0d9488"], [onclick][style*="background:#0d9488"] { background-color: #0f766e !important; }
button[style*="background:#16a34a"], button[style*="background: #16a34a"], [onclick][style*="background:#16a34a"] { background-color: #15803d !important; }
button[style*="background:#10b981"], button[style*="background: #10b981"] { background-color: #047857 !important; }
.nav-btn.quiz-launch { background: linear-gradient(135deg, #047857, #065f46) !important; }
.portal-card.oral .portal-enter-btn { background: linear-gradient(135deg, #047857, #065f46) !important; }
</style>
'''
JS = r'''<script>
/* R37_14_CONTRAST：运行时按钮对比度守卫（src/patch_r37_contrast.py；检查 src/contrastcheck.py） */
(function () {
  var SEL = 'button, [role=button], .pill-tab, .nav-btn, label[style*="background"], [onclick]';
  function parse(c) { var m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; var p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
  function lum(c) { function f(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); } return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); }
  function blend(t, b) { var a = t[3]; return [t[0] * a + b[0] * (1 - a), t[1] * a + b[1] * (1 - a), t[2] * a + b[2] * (1 - a), 1]; }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function rgb(c) { return "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")"; }
  function scale(c, k) { return [c[0] * k, c[1] * k, c[2] * k, c[3]]; }
  function bgInfo(el) {   // 背景候选色（渐变 = 全部色标）+ 背景归属元素
    var stack = [], owner = null;
    for (var e = el; e && e.nodeType === 1; e = e.parentElement) {
      var cs = getComputedStyle(e), img = cs.backgroundImage;
      if (img && img !== "none" && /gradient/.test(img)) { var cols = (img.match(/rgba?\([^)]+\)/g) || []).map(parse); if (cols.length) { stack.push({ grad: cols, e: e }); owner = owner || e; break; } }
      var c = parse(cs.backgroundColor); if (c && c[3] > 0) { stack.push({ c: c, e: e }); owner = owner || e; if (c[3] >= 0.99) break; }
    }
    var base = [[255, 255, 255, 1]];
    for (var i = stack.length - 1; i >= 0; i--) { var s = stack[i]; base = s.grad ? s.grad.map(function (g) { return g[3] < 1 ? blend(g, [255, 255, 255, 1]) : g; }) : base.map(function (b) { return blend(s.c, b); }); }
    return { B: base, owner: owner, top: stack[0] };
  }
  function worst(fg, B, op) { var w = 99; B.forEach(function (b) { var f = fg[3] < 1 ? blend(fg, b) : fg; if (op < 1) f = blend([f[0], f[1], f[2], op], b); w = Math.min(w, ratio(f, b)); }); return w; }
  function fixOne(el, clickRoot) {
    var txt = ""; for (var k = 0; k < el.childNodes.length; k++) if (el.childNodes[k].nodeType === 3) txt += el.childNodes[k].nodeValue;
    if (!txt.replace(/[\s\u2600-\u27BF\uFE0F]|[\uD800-\uDFFF]/g, "")) return;
    var cs = getComputedStyle(el), fg = parse(cs.color); if (!fg) return;
    var fs = parseFloat(cs.fontSize), fw = +cs.fontWeight || 400, need = (fs >= 24 || (fs >= 18.66 && fw >= 700)) ? 3 : 4.5, op = +cs.opacity;
    var info = bgInfo(el), B = info.B; if (worst(fg, B, op) >= need) return;
    var bgL = Math.min.apply(null, B.map(lum));
    if (lum(fg) < bgL || !info.owner || !(clickRoot === info.owner || clickRoot.contains(info.owner))) {   // 深字浅底：压暗字
      for (var kk = 0.94; kk > 0.05; kk -= 0.04) { var f2 = scale(fg, kk); if (worst(f2, B, op) >= need) { el.style.setProperty("color", rgb(f2), "important"); el.setAttribute("data-cg", "fg"); return; } }
      el.style.setProperty("color", "#0f172a", "important"); el.setAttribute("data-cg", "fg"); return;
    }
    var o = info.owner, ocs = getComputedStyle(o), img = ocs.backgroundImage;   // 浅字深底：压暗背景
    for (var q = 0.94; q > 0.2; q -= 0.04) {
      var B2 = B.map(function (b) { return scale(b, q); });
      if (worst(fg, B2, op) >= need) {
        if (img && img !== "none" && /gradient/.test(img)) o.style.setProperty("background-image", img.replace(/rgba?\([^)]+\)/g, function (m) { var c = parse(m); return rgb(scale(c, q)); }), "important");
        else o.style.setProperty("background-color", rgb(scale(parse(ocs.backgroundColor), q)), "important");
        o.setAttribute("data-cg", "bg"); return;
      }
    }
  }
  function fixRoot(root) {
    if (!root || root.nodeType !== 1) return;
    var list = []; if (root.matches && root.matches(SEL)) list.push(root);
    root.querySelectorAll && root.querySelectorAll(SEL).forEach(function (x) { list.push(x); });
    list.forEach(function (c) { if (c.disabled || !c.offsetParent) return; fixOne(c, c); c.querySelectorAll("span,b,strong,div,i,em").forEach(function (x) { if (x.offsetParent) fixOne(x, c); }); });
  }
  var pend = new Set(), raf = 0;
  function queue(n) { if (n && n.nodeType === 1) pend.add(n); if (!raf) raf = requestAnimationFrame(function () { raf = 0; var a = [...pend]; pend.clear(); a.forEach(function (x) { if (x.isConnected) fixRoot(x); }); }); }
  window.contrastGuard = fixRoot;
  function start() {
    queue(document.body);
    new MutationObserver(function (ms) { ms.forEach(function (m) {
      if (m.type === "attributes") { var t = m.target; if (t.getAttribute("data-cg") || !(t.matches && (t.matches(SEL) || t.closest(SEL)))) return; queue(t.closest(SEL) || t); }
      else m.addedNodes.forEach(function (x) { if (x.nodeType === 1) queue(x.closest && x.closest(SEL) ? x.closest(SEL) : x); });
    }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
</script>
'''
if '/* R37_14_CONTRAST：统一按钮色板' not in s:
    a = '<style id="mobile-o4">'; assert s.count(a) == 1; s = s.replace(a, CSS + a); n += 1
if '/* R37_14_CONTRAST：运行时' not in s:
    a = '\n</body>'; i = s.rindex(a); s = s[:i] + '\n' + JS.rstrip('\n') + s[i:]; n += 1
if n: __import__('appwrite').save(s)
print('patched', n)
