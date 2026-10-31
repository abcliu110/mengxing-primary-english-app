"""patch_r37_md.py —— 决策 37 / R37-04：语法点等页面直接露出 Markdown 原始标记（`…` 反引号 31 / 40 个语法点、残留 **）（幂等）。
改法：全 App 文本出口统一过滤（标记 R37_04_MD）——MutationObserver 盯住 document.body，新渲染进来的文本节点里：
  成对的 `…` → <code class="md-code">（浅紫底等宽，不是开发者样式的灰框）；成对的 **…** → <b>；落单的 ` 和 ** 直接去掉。
  跳过 script / style / textarea / input / code / pre 和 iframe 里的白板（白板文字在 canvas 上，不受影响）。
数据（GRAMMAR_DB）不改：反引号在数据里表示「结构公式」，渲染成 code 样式后反而更清楚。检查：src/mdcheck.py（入 runall）。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); n = 0
CSS = '''<style id="r37-md">
/* R37_04_MD */
code.md-code { font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; background: #f3e8ff; color: #5b21b6; padding: 1px 6px; border-radius: 6px; font-size: 0.95em; white-space: normal; }
</style>
'''
JS = r'''<script>
/* R37_04_MD：全 App 文本出口过滤 Markdown 原始标记（src/patch_r37_md.py） */
(function () {
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, CODE: 1, PRE: 1, IFRAME: 1, NOSCRIPT: 1 };
  function esc(t) { return t.replace(/[&<>]/g, function (c) { return c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"; }); }
  function fix(node) {
    var v = node.nodeValue; if (!v || (v.indexOf("`") < 0 && v.indexOf("**") < 0)) return;
    var p = node.parentNode; if (!p || SKIP[p.nodeName] || (p.closest && p.closest("code,pre,textarea,script,style"))) return;
    var h = esc(v).replace(/`([^`\n]+?)`/g, function (m, a) { return a.trim() ? '<code class="md-code">' + a + "</code>" : ""; })
      .replace(/\*\*([^*\n]+?)\*\*/g, "<b>$1</b>").replace(/`/g, "").replace(/\*\*/g, "");
    if (h === esc(v)) return;
    var t = document.createElement("template"); t.innerHTML = h; p.replaceChild(t.content, node);
  }
  function scan(root) {
    if (!root) return;
    if (root.nodeType === 3) { fix(root); return; }
    if (root.nodeType !== 1 || SKIP[root.nodeName]) return;
    var w = document.createTreeWalker(root, 4, { acceptNode: function (n) { var v = n.nodeValue; return v && (v.indexOf("`") >= 0 || v.indexOf("**") >= 0) ? 1 : 3; } }), a = [], x;
    while ((x = w.nextNode())) a.push(x);
    a.forEach(fix);
  }
  window.mdScrub = scan;
  function start() {
    scan(document.body);
    new MutationObserver(function (ms) { ms.forEach(function (m) { if (m.type === "characterData") fix(m.target); else m.addedNodes.forEach(scan); }); })
      .observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
</script>
'''
if '/* R37_04_MD */' not in s:
    a = '<style id="mobile-o4">'; assert s.count(a) == 1; s = s.replace(a, CSS + a); n += 1
if '/* R37_04_MD：' not in s:
    a = '\n</body>'; i = s.rindex(a); s = s[:i] + '\n' + JS.rstrip('\n') + s[i:]; n += 1
if n: __import__('appwrite').save(s)
print('patched', n)
