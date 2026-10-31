"""patch_menu_words.py —— 决策 33 第 ⑤ 步：主题 / 闪电词 / 词性三个列表页合成一个可筛选的「📚 单词表」word_list；顺带处理主题子主题重叠。
- 新 screen `word_list`（参数 theme / pos / sight / grade / q）：按主题（三大主题分行）、词性、闪电词、年级筛选 + 搜索，网格点词开卡、可朗读。
  · 选词性时显示原「单词的家」该词性的「词性语法总纲」（POS_CATEGORIES.tip，原文照搬）；
  · 选「🔴 闪电词」时只列真正不规则的（sight_type = irregular，原 745 词里标「可拼读」的 726 个不再算闪电词），卡片沿用原闪电词卡（标出不规则部位），并给「⚡ 1.5 秒闪认训练」入口；
  · 选主题时给「🗺️ 看思维导图」入口（思维导图页 vocab_theme 的 mindmap 视图保留）。
- 子主题重叠（课标子主题与 V6 扩展词库同名子主题）：4/22 数字与计量 + 数字与数量、5/21 色彩与空间方位 + 颜色与形状、11/23 个人特征与情绪 + 情感与性格、9/25 语法功能与指代 + 核心语法功能词
  在单词表里合成一个主题筛选（两组词并列、各自的思维导图都能进，两组没有共同词）；思维导图页对应两幕互加「🔗 另见 →」。思维导图 25 幕本身不重建（VOCAB_DB 子主题不改，R1 基线不动）。
- 旧入口：vocab_theme 无子主题 / 列表视图 → word_list（带主题）；vocab_sight 浏览 → word_list（闪电词）、闪认训练保留且只练不规则词；vocab_pos → word_list（带词性）。
- 单词大厅：「主题大世界」「视觉闪电词」两张大卡 +「单词的家」小卡 → 一张「📚 单词表」大卡 + 一张「⚡ 1.5 秒闪认训练」大卡。
幂等：已打过补丁就退出。写回走 appwrite.save（anchorcheck + jscheck）。"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
if '// MENU_WORDS_V5 ----------' in s:
    sys.exit('已打过补丁')

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, (c, n, old[:90])
    s = s.replace(old, new)

# 1. 三个旧列表页：重定向（闪认训练、思维导图保留）
rep('''function renderVocabThemeView() {
  const { sub = "", viewMode = "list", search = "" } = currentView.params;
''', '''function renderVocabThemeView() {
  const { sub = "", viewMode = "list", search = "" } = currentView.params;
  if (!sub || viewMode !== "mindmap") { currentView = { screen: "word_list", params: sub ? { theme: wlThemeKeyOfSub(sub), q: search || "" } : {}, scrollY: 0 }; renderCurrentView(); return; }   // MENU_WORDS_V5：列表并入单词表
''')
rep('''        <button class="pill-tab ${viewMode === 'list' ? 'active' : ''}" onclick="currentView.params.viewMode='list'; renderVocabThemeView();">📋 词卡列表视图</button>''',
    '''        <button class="pill-tab" data-mm-list onclick="navigateTo('word_list', { theme: wlThemeKeyOfSub('${sub}') })">📋 在单词表里看</button>${wlPairSeeAlso(sub)}''')
rep('''    ["首页", "📘 单词大世界", "🌍 主题大世界", sub],''', '''    ["首页", "📚 单词", "📚 单词表", sub + " · 思维导图"],''')
rep('''function renderVocabSightView() {
  const { filter = "all", mode = "browse" } = currentView.params;
''', '''function renderVocabSightView() {
  const { filter = "all", mode = "browse" } = currentView.params;
  if (mode !== "flash") { currentView = { screen: "word_list", params: filter === "decodable" ? {} : { sight: "irregular" }, scrollY: 0 }; renderCurrentView(); return; }   // MENU_WORDS_V5：浏览并入单词表，闪电词只留不规则
''')
rep('''  const pool = VOCAB_DB.filter(w => w.sight_type).slice(0, 60);''', '''  const pool = VOCAB_DB.filter(w => w.sight_type === "irregular").slice(0, 60);   // MENU_WORDS_V5：只练真正不规则的闪电词''')
rep('''function renderVocabPosView() {
  const { posKey = "n." } = currentView.params;
''', '''function renderVocabPosView() {
  const { posKey = "n." } = currentView.params;
  { currentView = { screen: "word_list", params: { pos: posKey }, scrollY: 0 }; renderCurrentView(); return; }   // MENU_WORDS_V5：词性分类并入单词表（总纲照搬）
''')

# 2. 单词大厅：两张大卡 + 单词的家 → 单词表 + 闪认训练
i = s.index('''      <div class="hero-dim-card theme" onclick="navigateTo('vocab_theme', { sub: '', viewMode: 'list' })">''')
j = s.index('''    <!-- Secondary Exploration Zone (进阶探索区) -->''', i)
old = s[i:j]
assert old.count('hero-dim-card') == 2
rep(old, '''      <!-- MENU_WORDS_V5:hall -->
      <div class="hero-dim-card theme" data-wl-entry onclick="navigateTo('word_list')">
        <div>
          <span class="dim-badge" style="background:#dbeafe; color:#1e40af;">一个列表 · 四种筛选</span>
          <h3 style="font-size:1.55rem; font-weight:900; margin:4px 0 6px; color:#1e3a8a;">📚 单词表</h3>
          <div style="font-size:0.92rem; color:#475569; font-weight:700; margin-bottom:12px;">按主题 / 词性 / 闪电词 / 年级筛选，共 ${VOCAB_DB.length} 词</div>
          <p style="font-size:0.9rem; color:#334155; margin:0 0 14px;">原「主题大世界」「视觉闪电词」「单词的家」三个列表合成一个；选主题可进<strong>🗺️ 主题思维导图</strong>，选词性看<strong>词性语法总纲</strong>。</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-weight:800; color:#2563eb;"><span>打开单词表</span><span>➔</span></div>
      </div>
      <div class="hero-dim-card sight" data-wl-flash onclick="wlStartFlash()">
        <div>
          <span class="dim-badge" style="background:#fef3c7; color:#92400e;">阅读提速</span>
          <h3 style="font-size:1.55rem; font-weight:900; margin:4px 0 6px; color:#92400e;">⚡ 1.5 秒闪认训练</h3>
          <div style="font-size:0.92rem; color:#78350f; font-weight:700; margin-bottom:12px;">只练真正不规则的闪电词（${irregCount} 个）</div>
          <p style="font-size:0.9rem; color:#334155; margin:0 0 14px;">单词闪现 1.5 秒后消失，选出刚才看到的词，练一眼认出整个词形。</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-weight:800; color:#d97706;"><span>开始闪认训练</span><span>➔</span></div>
      </div>
    </div>

''')
i = s.index('''      <div class="sec-dim-card" onclick="navigateTo('vocab_pos', { posKey: 'n.' })">''')
j = s.index('''      <div class="sec-dim-card" onclick="navigateTo('vocab_relations', { tab: 'confusables', query: '' })">''', i)
rep(s[i:j], '')

# 3. 路由 + 页面
rep('''  else if (s === "principles_hub") renderPrinciplesHubView();   // MENU_HOME_V2\n''', '''  else if (s === "principles_hub") renderPrinciplesHubView();   // MENU_HOME_V2
  else if (s === "word_list") renderWordListView();   // MENU_WORDS_V5\n''')
rep('''hubChip("🪄 自然拼读 9 步", "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })", "#e11d48")''',
    '''hubChip("🪄 自然拼读 9 步", "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })", "#e11d48") + hubChip("🔴 不规则闪电词", "navigateTo('word_list', { sight: 'irregular' })", "#e11d48", "data-wl-sight-chip")''')

NEW = r'''
// MENU_WORDS_V5 ---------- 决策 33 ⑤：三个列表页合成一个单词表（src/patch_menu_words.py） ----------
const WL_PAIRS = [   // 课标子主题 + V6 扩展词库同名子主题：单词表里合成一个主题
  { key: "pair:num", label: "🔢 数字", subs: ["数字与计量", "数字与数量"] },
  { key: "pair:color", label: "🎨 颜色", subs: ["色彩与空间方位", "颜色与形状"] },
  { key: "pair:mood", label: "😊 情绪与性格", subs: ["个人特征与情绪", "情感与性格"] },
  { key: "pair:pron", label: "🫵 代词与功能词", subs: ["语法功能与指代", "核心语法功能词"] }
];
const WL_GRADES = [["G1", "一年级"], ["G2", "二年级"], ["G3", "三年级"], ["G4", "四年级"], ["G5", "五年级"], ["G6", "六年级"], ["V6", "扩展词"]];
function wlThemeKeyOfSub(sub) { const p = WL_PAIRS.find(x => x.subs.includes(sub)); return p ? p.key : sub; }
function wlSubsOf(key) { const p = WL_PAIRS.find(x => x.key === key); return p ? p.subs : (key ? [key] : []); }
function wlPairSeeAlso(sub) { const p = WL_PAIRS.find(x => x.subs.includes(sub)); if (!p) return ""; const o = p.subs.find(x => x !== sub); return `<button class="pill-tab" data-mm-see-also onclick="navigateTo('vocab_theme', { sub: '${o}', viewMode: 'mindmap' })">🔗 另见 → ${o}</button>`; }
function wlPosMatch(w, k) { const p = (w.pos || "").toLowerCase(); return k === "conj." ? (p.includes("conj") || p.includes("interj") || p.includes("art")) : p.includes(k); }
function wlFilter(p) {
  const subs = wlSubsOf(p.theme), q = (p.q || "").trim().toLowerCase();
  return VOCAB_DB.filter(w => (!subs.length || subs.includes(w.theme_sub)) && (!p.pos || wlPosMatch(w, p.pos)) && (!p.sight || w.sight_type === "irregular")
    && (!p.grade || w.id.split("_")[0] === p.grade) && (!q || w.word.toLowerCase().includes(q) || String(w.meaning).includes(q)));
}
function wlSightCards(list) {   // 原「视觉闪电词」卡片（不规则部位标红），照搬
  const ctx = JSON.stringify(list.map(x => x.id)).replace(/"/g, "'");
  return `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(230px, 1fr)); gap:14px;">${list.map(w => `
    <div onclick="openWordCardModal('${w.id}', ${ctx})" style="background:#fff; border-radius:16px; padding:16px; border:2.5px solid #f87171; cursor:pointer; box-shadow:var(--shadow-sm);">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;"><span style="font-size:1.6rem; font-weight:900; color:#b91c1c;">${w.word}</span><span style="font-size:0.76rem; font-weight:800; padding:3px 9px; border-radius:999px; background:#fee2e2; color:#991b1b;">🔴 不规则拼读</span></div>
      <div style="font-size:0.86rem; color:#64748b; font-weight:700; margin:4px 0;">${w.phonetic} · ${w.pos} · <b>${w.meaning}</b></div>
      ${w.irregular_info ? `<div style="background:#fff1f2; border-left:3.5px solid #e11d48; padding:8px 10px; border-radius:8px; font-size:0.8rem; color:#881337; margin-top:8px;">🎯 <b>不规则部位 [${w.irregular_info.part}]：</b>${w.irregular_info.tip}</div>` : ""}
    </div>`).join("")}</div>`;
}
function wlGridHtml(p) {
  const list = wlFilter(p);
  return `<div data-wl-count="${list.length}" style="font-weight:800; color:#475569; margin:4px 0 10px;">共 ${list.length} 词</div>` + (p.sight && list.length ? wlSightCards(list) : renderWordGridHTML(list, list.map(w => w.id)));
}
function wlStartFlash() {   // 闪认训练：vocab_sight 只在 mode=flash 时还是原页面
  if (typeof stopActiveCanvasLoops === "function") stopActiveCanvasLoops();
  navHistoryStack.push(JSON.parse(JSON.stringify(currentView))); if (navHistoryStack.length > 20) navHistoryStack.shift();
  currentView = { screen: "vocab_sight", params: { filter: "irregular" }, scrollY: 0 };
  startSightFlashTraining(); noteLastView(); window.scrollTo(0, 0);
}
function wlChip(label, on, set, attr) { return `<button class="pill-tab ${on ? "active" : ""}" ${attr || ""} onclick="${set}">${label}</button>`; }
function wlSet(k, v) { const p = currentView.params; if (v === "" || v == null || p[k] === v) delete p[k]; else p[k] = v; renderWordListView(); }
function renderWordListView() {
  const p = currentView.params;
  const ids = wlFilter(p).map(w => w.id);
  renderSubNavbar(["首页", "📚 单词", "📚 单词表"], `<button class="nav-btn quiz-launch" onclick="startQuizSession('vocab', ${JSON.stringify(ids.slice(0, 30)).replace(/"/g, "'")}, '单词表自测')">🎯 自测这些词</button>`);
  const macros = MACRO_THEME_META.concat(VOCAB_DB.some(w => w.theme_macro === "v6扩展词库") ? [{ key: "v6扩展词库", icon: "➕", color: "#0f766e" }] : []);
  const paired = new Set(WL_PAIRS.flatMap(x => x.subs.slice(1)));
  const themeRows = macros.map(m => {
    const subs = [...new Set(VOCAB_DB.filter(w => w.theme_macro === m.key).map(w => w.theme_sub))].filter(x => !paired.has(x));
    if (!subs.length) return "";
    return `<div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-bottom:6px;"><span style="font-weight:900; color:${m.color}; font-size:0.84rem; min-width:84px;">${m.icon} ${m.key}</span>${subs.map(x => { const key = wlThemeKeyOfSub(x), pr = WL_PAIRS.find(y => y.key === key); return wlChip(pr ? `${pr.label}（${pr.subs.join(" + ")}）` : x, p.theme === key, `wlSet('theme', '${key}')`, `data-wl-theme="${key}"`); }).join("")}</div>`;
  }).join("");
  const pos = POS_CATEGORIES.find(x => x.key === p.pos);
  const subs = wlSubsOf(p.theme);
  document.getElementById("appViewRoot").innerHTML = `
    <div data-word-list style="background:#fff; border:2px solid #bfdbfe; border-radius:18px; padding:14px 16px; margin-bottom:14px;">
      <div style="font-weight:900; font-size:1.25rem; color:#1e3a8a; margin-bottom:8px;">📚 单词表 · 按主题 / 词性 / 闪电词 / 年级筛选</div>
      <input type="text" data-wl-q value="${attrEscape(p.q || "")}" placeholder="🔍 搜英文或中文…" oninput="currentView.params.q=this.value; document.getElementById('wlGrid').innerHTML = wlGridHtml(currentView.params);" style="width:100%; box-sizing:border-box; padding:11px 14px; border-radius:12px; border:2px solid #cbd5e1; font-size:1rem; font-weight:700; margin-bottom:10px;">
      <details ${p.theme ? "open" : ""} style="margin-bottom:6px;"><summary style="font-weight:900; cursor:pointer; min-height:32px;">🌍 主题${p.theme ? "：" + subs.join(" + ") : ""}</summary><div style="margin-top:8px;">${themeRows}</div></details>
      <div class="pill-tabs" style="margin-bottom:6px;">${POS_CATEGORIES.map(x => wlChip(x.label, p.pos === x.key, `wlSet('pos', '${x.key}')`, `data-wl-pos="${x.key}"`)).join("")}</div>
      <div class="pill-tabs" style="margin-bottom:0;">${wlChip("🔴 不规则闪电词", !!p.sight, "wlSet('sight', 'irregular')", "data-wl-sight")}${WL_GRADES.map(([g, t]) => wlChip(t, p.grade === g, `wlSet('grade', '${g}')`, `data-wl-grade="${g}"`)).join("")}${(p.theme || p.pos || p.sight || p.grade || p.q) ? wlChip("✖ 清除筛选", false, "currentView.params = {}; renderWordListView();", "data-wl-clear") : ""}</div>
    </div>
    ${subs.length ? `<div data-wl-theme-info style="background:#eff6ff; border-left:5px solid #2563eb; border-radius:14px; padding:12px 16px; margin-bottom:14px; display:flex; flex-wrap:wrap; gap:8px; align-items:center;"><b style="color:#1e3a8a;">🌍 ${subs.join(" + ")}</b>${subs.length > 1 ? `<span style="font-size:0.84rem; color:#475569;">（课标子主题和扩展词库同名子主题合在一起看）</span>` : ""}${subs.map(x => `<button class="hub-chip" data-wl-mindmap onclick="navigateTo('vocab_theme', { sub: '${x}', viewMode: 'mindmap' })" style="border-color:#2563eb55; color:#1d4ed8;">🗺️ ${x} 思维导图</button>`).join("")}</div>` : ""}
    ${pos ? `<div data-wl-pos-tip style="background:#eff6ff; border-left:5px solid #2563eb; border-radius:14px; padding:12px 16px; margin-bottom:14px;"><div style="font-weight:900; color:#1e3a8a;">${pos.label}</div><div style="font-size:0.9rem; color:#334155; margin-top:4px;">💡 <strong>词性语法总纲：</strong>${pos.tip}</div></div>` : ""}
    ${p.sight ? `<div data-wl-sight-tip style="background:linear-gradient(135deg,#fffbeb,#fef3c7); border:2px solid #fbbf24; border-radius:14px; padding:12px 16px; margin-bottom:14px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:space-between;"><div style="font-size:0.9rem; color:#78350f;">⚡ <b>不规则闪电词</b>：拼写不按自然拼读规则发音的高频词，标红的是不规则部位，要整体认读。</div><button onclick="wlStartFlash()" style="background:#d97706; color:#fff; border:0; border-radius:12px; padding:10px 16px; min-height:44px; font-weight:900; cursor:pointer;">⚡ 1.5 秒闪认训练</button></div>` : ""}
    <div id="wlGrid">${wlGridHtml(p)}</div>`;
}
'''
rep('''// ORAL_FUNC_MAP_V1 ----------''', NEW.lstrip('\n') + '''// ORAL_FUNC_MAP_V1 ----------''')
save(s)
print('ok: 单词表合一')
