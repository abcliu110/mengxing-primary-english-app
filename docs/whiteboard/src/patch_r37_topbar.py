"""patch_r37_topbar.py —— 决策 37 / R37-09：手机顶栏一层、吸顶、始终有返回（幂等；只在 ≤ 640 px 生效，电脑 / 平板布局不变）。
现状（390 px）：首页顶栏 170 px（品牌 + 打卡 + 星星 + 家长门折成 3 行）；子页面再加 155 px 的「回首页 / 返回上一步 / 面包屑 / 上一点下一点」，两层共 325 px；
而且 mobile-o4 的 `html, body { overflow-x:hidden }` 让 body 变成滚动容器，position:sticky 失效——滚下去返回键就没了。
改法（样式块 + 脚本，标记 R37_09_TOPBAR）：
  ① overflow-x:hidden → overflow-x:clip（同样不出横向滚动，但不建滚动容器，吸顶恢复）；
  ② 首页：一层 56 px——品牌名 + 🔥 天数 + ⭐ 星星 + ⚙️（家长门），副标题徽章收起；
  ③ 子页面：只留一层 56 px 吸顶栏「⬅ 返回 + 当前页标题 + ☰ 菜单」；回首页、完整面包屑、上一点 / 下一点等右侧按钮、打卡 / 星星 / 家长门都收进 ☰ 菜单。
检查：src/topbarcheck.py（入 runall）。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); n = 0
CSS = '''<style id="r37-topbar">
/* R37_09_TOPBAR */
html, body { overflow-x: clip !important; }
.r37-menu-btn, .r37-menu, .r37-short { display: none; }
@media (max-width: 640px) {
  body > .top-header { height: 56px; box-sizing: border-box; padding: 6px 10px; flex-wrap: nowrap; gap: 6px; }
  body > .top-header .brand-box { font-size: 1rem; gap: 4px; min-width: 0; white-space: nowrap; overflow: hidden; }
  body > .top-header .brand-box > span:first-child { font-size: 1.25rem !important; }
  body > .top-header .brand-badge, body > .top-header #uiStudyDateBadge { display: none; }
  body > .top-header .stats-bar { flex-wrap: nowrap; gap: 4px; flex-shrink: 0; }
  body > .top-header .stat-pill { padding: 4px 8px; font-size: 0.85rem; gap: 2px; }
  .r37-full { display: none; } .r37-short { display: inline; }
  .r37-menu .r37-full { display: inline !important; } .r37-menu .r37-short { display: none !important; }
  body > .top-header .parent-gate-btn { padding: 0; width: 44px; min-height: 44px; font-size: 1.1rem; }
  body.r37-sub > .top-header { display: none; }
  .sub-navbar { top: 0 !important; height: 56px; box-sizing: border-box; padding: 6px 8px; flex-wrap: nowrap !important; gap: 6px; }
  .sub-navbar .nav-left-group { flex-wrap: nowrap; min-width: 0; flex: 1 1 auto; gap: 6px; }
  .sub-navbar .nav-btn.home, #uiSubNavRight { display: none !important; }
  .sub-navbar .nav-btn.back { font-size: 0.9rem; padding: 0 12px; min-height: 44px; min-width: 48px; justify-content: center; flex-shrink: 0; }
  .sub-navbar .breadcrumb-trail { flex-wrap: nowrap; overflow: hidden; min-width: 0; font-size: 1rem; }
  .sub-navbar .breadcrumb-trail { display: block !important; white-space: nowrap; text-overflow: ellipsis; }
  .sub-navbar .breadcrumb-trail span { display: none; }
  .sub-navbar .breadcrumb-trail span:nth-last-child(-n+3) { display: inline; margin-right: 4px; }
  .sub-navbar .breadcrumb-trail span.active { color: #0f172a; }
  .r37-menu-btn { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; width: 48px; min-height: 44px; border-radius: 12px; border: 1.5px solid #cbd5e1; background: #f8fafc; font-size: 1.25rem; font-weight: 900; color: #0f172a; }
  .r37-menu.on { display: block; position: fixed; top: 58px; left: 8px; right: 8px; z-index: 300; max-height: calc(100vh - 80px); overflow-y: auto; background: #fff; border: 2px solid #cbd5e1; border-radius: 16px; box-shadow: 0 12px 32px rgba(15,23,42,.22); padding: 12px; }
  .r37-menu .r37-sec { font-size: 0.8rem; font-weight: 800; color: #475569; margin: 8px 2px 6px; }
  .r37-menu .r37-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .r37-menu .r37-crumb { font-size: 0.9rem; font-weight: 700; color: #334155; line-height: 1.5; }
  .r37-menu .stat-pill { font-size: 0.9rem; }
}
</style>
'''
JS = r'''<script>
/* R37_09_TOPBAR：手机一层吸顶栏 + ☰ 菜单（src/patch_r37_topbar.py） */
(function () {
  function init() {
    var nav = document.getElementById("globalSubNav"); if (!nav || document.getElementById("r37MenuBtn")) return;
    var btn = document.createElement("button"); btn.type = "button"; btn.id = "r37MenuBtn"; btn.className = "r37-menu-btn"; btn.textContent = "☰"; btn.title = "菜单"; btn.setAttribute("aria-label", "菜单");
    var menu = document.createElement("div"); menu.id = "r37Menu"; menu.className = "r37-menu";
    nav.appendChild(btn); document.body.appendChild(menu);
    function close() { menu.classList.remove("on"); btn.textContent = "☰"; }
    function fill() {
      var bc = document.getElementById("uiBreadcrumb"), right = document.getElementById("uiSubNavRight"), stats = document.querySelector("body > .top-header .stats-bar");
      menu.innerHTML = '<div class="r37-row"><button type="button" class="nav-btn home" onclick="goHome()">🏠 回首页</button><button type="button" class="nav-btn back" onclick="goBackStep()">⬅️ 返回上一步</button></div>'
        + (bc && bc.textContent.trim() ? '<div class="r37-sec">你在这里</div><div class="r37-crumb">' + bc.innerHTML + "</div>" : "")
        + (right && right.innerHTML.trim() ? '<div class="r37-sec">本页</div><div class="r37-row">' + right.innerHTML + "</div>" : "")
        + (stats ? '<div class="r37-sec">我的</div><div class="r37-row">' + stats.innerHTML.replace(/ id="/g, ' data-id="') + "</div>" : "");
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); if (menu.classList.contains("on")) { close(); return; } fill(); menu.classList.add("on"); btn.textContent = "✕"; });
    menu.addEventListener("click", function (e) { if (e.target.closest("button,[onclick]")) setTimeout(close, 0); });
    document.addEventListener("click", function (e) { if (menu.classList.contains("on") && !menu.contains(e.target) && e.target !== btn) close(); });
    function sync() { document.body.classList.toggle("r37-sub", nav.style.display !== "none"); close(); }
    new MutationObserver(sync).observe(nav, { attributes: true, attributeFilter: ["style"] });
    var bc = document.getElementById("uiBreadcrumb"); if (bc) new MutationObserver(close).observe(bc, { childList: true });
    sync();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
</script>
'''
if '/* R37_09_TOPBAR */' not in s:
    a = '<style id="mobile-o4">'; assert s.count(a) == 1; s = s.replace(a, CSS + a); n += 1
if '/* R37_09_TOPBAR：' not in s:
    a = '\n</body>'; i = s.rindex(a); s = s[:i] + '\n' + JS.rstrip('\n') + s[i:]; n += 1
HTML = [   # 手机上换短字（不用 font-size:0，免得 mobilecheck 判小字）
    ('<span>🔥 连续打卡</span>', '<span><span class="r37-full">🔥 连续打卡</span><span class="r37-short">🔥</span></span>'),
    ('<span>⭐ 星星</span>', '<span><span class="r37-full">⭐ 星星</span><span class="r37-short">⭐</span></span>'),
    ('<button class="parent-gate-btn" onclick="openParentGateChallenge()">⚙️ 家长门</button>', '<button class="parent-gate-btn" onclick="openParentGateChallenge()" title="家长门"><span class="r37-full">⚙️ 家长门</span><span class="r37-short">⚙️</span></button>'),
    ('<button class="nav-btn back" onclick="goBackStep()">⬅️ 返回上一步</button>\n    <div id="uiBreadcrumb"', '<button class="nav-btn back" onclick="goBackStep()"><span class="r37-full">⬅️ 返回上一步</span><span class="r37-short">⬅ 返回</span></button>\n    <div id="uiBreadcrumb"'),
]
for old, new in HTML:
    if new in s: continue
    assert s.count(old) == 1, old; s = s.replace(old, new); n += 1
if n: __import__('appwrite').save(s)
print('patched', n)
