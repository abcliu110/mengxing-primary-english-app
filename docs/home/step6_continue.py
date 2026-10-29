"""首页改版第 6 步（首页收尾）：
① 首屏加「继续上次」一行：记下上次学的页面（screen + params + 面包屑标题），一点回到那里；同时显示连续打卡天数。
② 王炸按钮（首页 .lab-chip、实验室页内 .lab-tab）用 ✓ 标出已学过的（打开过的页签 / 身世幕）。
数据存在 appState.lastView、appState.visited（随 saveAppState 进 localStorage）。可重复运行（已插入则跳过）。"""
F = "萌星小学英语_最终合并版.html"
s = open(F, encoding="utf-8").read()
MARK = "/* HOME_CONTINUE_V1 */"
if MARK in s:
    print("already applied"); raise SystemExit

# ---------- 1. 运行时代码：记录上次页面 + 已学，放在 renderCurrentView 前 ----------
code = MARK + r'''
// 首页收尾（第 6 步）：记下上次学到哪一页、哪些王炸页签 / 身世幕学过（✓）
function visitKeyOfView(screen, params) {
  params = params || {};
  if (screen === "super_lab_hub") {
    const t = params.labTab || (typeof superLabState !== "undefined" ? superLabState.labTab : "");
    return t ? "lab:" + t : "";
  }
  if (screen === "word_origins_hub" && params.scene) return "wo:" + params.scene;
  if (screen === "zh_en_hub" && params.scene) return "ze:" + params.scene;
  return "";
}
function noteLastView() {
  try {
    const sc = currentView.screen;
    if (!sc || sc === "home") return;
    const params = JSON.parse(JSON.stringify(currentView.params || {}));
    if (sc === "super_lab_hub" && typeof superLabState !== "undefined") params.labTab = superLabState.labTab;
    const bc = document.getElementById("uiBreadcrumb");
    let label = bc ? Array.from(bc.querySelectorAll("span")).map(x => x.textContent.trim()).filter(x => x && x !== "›" && x !== "首页").join(" › ") : "";
    if (!label) label = sc;
    if (!appState.visited || typeof appState.visited !== "object") appState.visited = {};
    const key = visitKeyOfView(sc, params);
    const prev = appState.lastView;
    const changed = !prev || prev.screen !== sc || JSON.stringify(prev.params) !== JSON.stringify(params) || prev.label !== label;
    const newKey = key && !appState.visited[key];
    if (newKey) appState.visited[key] = getTodayDateStr();
    if (changed || newKey) {
      appState.lastView = { screen: sc, params, label: label.slice(0, 80) };
      saveAppState();
    }
  } catch (e) { console.warn("noteLastView", e); }
}
function isVisitedKey(key) { return !!(key && appState.visited && appState.visited[key]); }
function labDoneMark(id) { return isVisitedKey("lab:" + id) ? '<span class="done-tick">✓</span>' : ""; }
function homeStreakNow() {
  const last = appState.lastStudyDate || "";
  if (!last) return 0;
  const gap = daysBetweenDateStr(last, getTodayDateStr());
  return gap <= 1 ? (Number(appState.streakDays) || 0) : 0;
}
function homeContinueHtml() {
  const lv = appState.lastView;
  const streak = homeStreakNow();
  const fire = streak > 0 ? `🔥 已连续打卡 <b>${streak}</b> 天` : `🔥 今天学一点，开始打卡`;
  const go = lv && lv.screen
    ? `<button type="button" class="hc-go" onclick="homeResumeLast()">▶ 继续上次<span class="hc-label">${attrEscape(lv.label || lv.screen)}</span></button>`
    : `<button type="button" class="hc-go" onclick="navigateTo('vocab_hall')">▶ 第一次来？<span class="hc-label">从单词大世界开始</span></button>`;
  return `<div class="home-continue">${go}<span class="hc-streak">${fire}</span></div>`;
}
function homeResumeLast() {
  const lv = appState.lastView;
  if (!lv || !lv.screen) { navigateTo("vocab_hall"); return; }
  navigateTo(lv.screen, lv.params || {});
}
function homeMarkVisitedChips() {
  document.querySelectorAll("#appViewRoot .lab-chip").forEach(b => {
    const oc = b.getAttribute("onclick") || "";
    let m, key = "";
    if ((m = oc.match(/labTab:\s*'(\w+)'/))) key = "lab:" + m[1];
    else if ((m = oc.match(/word_origins_hub',\s*\{\s*scene:\s*'(\w+)'/))) key = "wo:" + m[1];
    else if ((m = oc.match(/zh_en_hub',\s*\{\s*scene:\s*'(\w+)'/))) key = "ze:" + m[1];
    if (isVisitedKey(key) && !b.querySelector(".done-tick")) {
      b.classList.add("done");
      b.insertAdjacentHTML("afterbegin", '<span class="done-tick">✓</span>');
      b.title = "学过了";
    }
  });
}
(function () {
  const st = document.createElement("style");
  st.textContent = `.home-continue{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:#fffbeb;border:2px solid #f59e0b;border-radius:16px;padding:8px 10px;margin:0 0 14px;}
.hc-go{flex:1;min-width:0;text-align:left;background:#f59e0b;color:#1f2937;border:0;border-radius:12px;padding:9px 12px;font-weight:900;font-size:0.92rem;cursor:pointer;font-family:inherit;line-height:1.35;}
.hc-label{display:block;font-weight:700;font-size:0.84rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.hc-streak{font-weight:900;font-size:0.88rem;color:#b45309;white-space:nowrap;}
.done-tick{display:inline-block;margin-right:3px;color:#16a34a;font-weight:900;}
.lab-chip.done{background:#f0fdf4;}
.lab-tab .done-tick{color:#86efac;}`;
  document.head.appendChild(st);
})();
'''
fn = "function renderCurrentView() {"
assert s.count(fn) == 1
s = s.replace(fn, code + fn)

# renderCurrentView 末尾记一笔
old_end = '''  else if (s === "v6_hub") renderV6HubView();
  else renderHomeView();
}'''
assert s.count(old_end) == 1
s = s.replace(old_end, '''  else if (s === "v6_hub") renderV6HubView();
  else renderHomeView();
  if (s === "home") homeMarkVisitedChips(); else noteLastView();
}''')

# 页内直接重绘（不经 renderCurrentView）的三个页面也记一笔：启动时包一层
old_boot = '''window.addEventListener("DOMContentLoaded", () => {
  loadAppState();'''
assert s.count(old_boot) == 1
s = s.replace(old_boot, '''window.addEventListener("DOMContentLoaded", () => {
  ["renderSuperLabHubView", "renderWordOriginsHubView", "renderZhEnHubView"].forEach(n => {
    const f = window[n];
    if (typeof f === "function" && !f.__noted) {
      const w = function () { const r = f.apply(this, arguments); noteLastView(); return r; };
      w.__noted = true; window[n] = w;
    }
  });
  loadAppState();''')

# ---------- 2. 首页插入「继续上次」一行（标题下面） ----------
hero_end = '''      <p>遵循 2022 义务教育英语课标 · 大道至简 · 用「6大第一性原理」把语音、单词、语法、口语融会贯通</p>
    </div>
'''
assert s.count(hero_end) == 1
s = s.replace(hero_end, hero_end + "    ${homeContinueHtml()}\n")

# ---------- 3. 实验室页内页签按钮加 ✓ ----------
old_tab = '''class="lab-tab${tab === id ? ' on' : ''}">${label}</button>'''
assert s.count(old_tab) == 1
s = s.replace(old_tab, '''class="lab-tab${tab === id ? ' on' : ''}">${labDoneMark(id)}${label}</button>''')

open(F, "w", encoding="utf-8").write(s)
print("ok")
