"""patch_menu_grammar.py —— 决策 33 第 ④ 步：四大总结矩阵并入语法各类末尾；歌谣、纠偏微训练改成对应语法点里的页签。
- 「📊 四大总结总表」grammar_summary_hub 不再是独立菜单：语法大厅撤掉总结横幅；代词矩阵挂「词法」类末尾，疑问词雷达 / How vs What / 汉英语序挂「句型」类末尾。
  打开时只显示该张表（不出 4 个页签条），面包屑「🧩 语法 › 类名 › 表名」，「↩ 回到 类名」；旧入口 navigateTo('grammar_summary_hub', { summaryTab }) 照常可用。
- 「🎵 语法韵律歌谣」8 首、「🎮 语法纠偏游乐场」5 个纠偏神器 + 2 个微训练：语法大厅撤掉两张大卡，按内容挂进语法点页面底部「🎵 歌谣 / 🛡️ 纠偏 / 🔨 微训练」页签
  （CH01→G16 … 见 D33_GRAMMAR_EXTRAS）。歌谣、纠偏神器整段在语法点里显示；两个微训练（有计分状态）从语法点进原页面的单页模式，面包屑回语法点。
  旧入口：grammar_chants → 对应语法点；grammar_playground 纠偏神器页 → G19（第一个神器三单警报器所在），微训练页签照常。
- 语法点上一点 / 下一点按钮直接重绘、不经路由，例句库 / 搬来的内容会停在上一个点：把 renderGrammarDetailView 也包一层 noteLastView。
- 顺带（③ 截图自审）：闯关游戏页开发说明句改成给孩子看的话；方法论单页模式隐藏顶部横幅。
幂等：已打过补丁就退出。写回走 appwrite.save（anchorcheck + jscheck）。"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
if '// MENU_GRAMMAR_V4 ----------' in s:
    sys.exit('已打过补丁')

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, (c, n, old[:90])
    s = s.replace(old, new)

# 0. ③ 截图自审后的小修：闯关游戏页去掉开发说明句；方法论单页模式也隐藏顶部「十五大王炸」横幅
rep('''答对奖励星星（写入萌星同一进度 STORAGE_KEY，不另建存储）。已跳过与方法论教室重复的十五王炸/天坑榜。''', '''答对奖励 5 颗星星，和萌星其他地方的星星记在一起。''')
rep('''.method-hub.mh-single .top-header, .method-hub.mh-single .theater-strip { display: none; }''', '''.method-hub.mh-single .top-header, .method-hub.mh-single .theater-strip, .method-hub.mh-single .hero-banner { display: none; }''')

# 1. 语法大厅：撤总结横幅、歌谣 / 纠偏两张卡（换一行说明）
i = s.index('    <!-- NEW v1.2 Hero Banner: 4 Deep Summary Matrices & Underlying Principles inside Grammar Hall -->')
j = s.index('    <!-- 3 Main Grammar Categories -->', i)
rep(s[i:j], '''    <!-- MENU_GRAMMAR_V4:summary_moved：四大总结表已挂到词法 / 句型两类末尾（决策 33 ④） -->
''')
i = s.index('    <!-- Special Interactive Zones: Error Intervention Playground & Grammar Chants -->')
j = s.index('    <!-- My Grammar Status -->', i)
rep(s[i:j], '''    <!-- MENU_GRAMMAR_V4:chants_moved -->
    <div data-grammar-moved style="background:#f5f3ff; border:1.5px dashed #a78bfa; border-radius:14px; padding:10px 14px; margin-bottom:18px; font-size:0.88rem; color:#4c1d95; font-weight:700;">
      📊 总结表在每类末尾（代词矩阵在词法，疑问词 / How vs What / 语序在句型）；🎵 8 首歌谣和 🛡️ 纠偏神器、🔨 微训练放进了对应语法点（如 be 动词拍手歌在 G16、三单警报器在 G19）。
    </div>

''')

# 2. 总结页：单表模式
rep('''  renderSubNavbar(
    ["首页", "🧩 语法魔法屋", "📊 四大核心总结总表与底层原理"],''', '''  const sumHome = SUMMARY_TAB_HOME[summaryTab] || SUMMARY_TAB_HOME.pronouns;   // MENU_GRAMMAR_V4：挂在所属类末尾
  renderSubNavbar(
    ["首页", "🧩 语法", sumHome[0], sumHome[1]],''')
rep('''    `<button class="nav-btn quiz-launch" onclick="startQuizSession('grammar', ['G07','G08','G09','G10','G14','G28','G31','G32','G34','G36'], '总结矩阵与原理专项闯关')">🎯 总结矩阵专项自测</button>`''',
    '''    `<button class="nav-btn" data-sum-back onclick="navigateTo('grammar_cat', { cat: '${sumHome[0]}' })">↩ 回到 ${sumHome[0]}</button><button class="nav-btn quiz-launch" onclick="startQuizSession('grammar', ['G07','G08','G09','G10','G14','G28','G31','G32','G34','G36'], '总结矩阵与原理专项闯关')">🎯 总结矩阵专项自测</button>`''')
rep('''    <div class="pill-tabs" style="margin-bottom:16px;">
      <button class="pill-tab ${summaryTab==='pronouns'?'active':''}" onclick="currentView.params.summaryTab='pronouns'; renderGrammarSummaryHubView();">''',
    '''    <div class="pill-tabs" data-sum-tabs style="margin-bottom:16px; display:none;">
      <button class="pill-tab ${summaryTab==='pronouns'?'active':''}" onclick="currentView.params.summaryTab='pronouns'; renderGrammarSummaryHubView();">''')

# 3. 语法分类页末尾：总结表入口
rep('''const GRAMMAR_CAT_ZONES = {
  "动词与时态":''', '''const GRAMMAR_CAT_ZONES = {
  "词法": { title: "🧱 词法类收尾：总结表", tabs: [], get extra() { return sumChipHtml("pronouns"); } },
  "动词与时态":''')
rep('''"#7c3aed", "data-mh-chip='writing'"); } }''', '''"#7c3aed", "data-mh-chip='writing'") + sumChipHtml("interrogatives") + sumChipHtml("how_what") + sumChipHtml("syntax"); } }''')

# 4. 歌谣 / 纠偏页：旧入口重定向 + 微训练单页模式
rep('''function renderGrammarChantsView() {
  const { chantIdx = 0 } = currentView.params;''', '''function renderGrammarChantsView() {
  { const ci = +((currentView.params || {}).chantIdx || 0), c = GRAMMAR_CHANTS[ci] || GRAMMAR_CHANTS[0], gId = D33_GRAMMAR_EXTRAS.chants[c.id];   // MENU_GRAMMAR_V4：歌谣已放进语法点
    if (gId) { currentView = { screen: "grammar_detail", params: { gId, extra: "chant" }, scrollY: 0 }; renderCurrentView(); return; } }
  const { chantIdx = 0 } = currentView.params;''')
rep('''function renderGrammarPlaygroundView() {
  const { tab = "diagrams" } = currentView.params;
  renderSubNavbar(["首页", "🧩 语法魔法屋", "🎮 语法纠偏游乐场"]);''', '''function renderGrammarPlaygroundView() {
  const { tab = "diagrams" } = currentView.params;
  if (tab === "diagrams") { currentView = { screen: "grammar_detail", params: { gId: "G19", extra: "diag" }, scrollY: 0 }; renderCurrentView(); return; }   // MENU_GRAMMAR_V4：纠偏神器已放进语法点
  const pgG = D33_GRAMMAR_EXTRAS.games[tab] || "G23", pgGt = (GRAMMAR_DB.find(x => x.id === pgG) || {}).title || pgG;
  renderSubNavbar(["首页", "🧩 语法", pgG, tab === "verb_game" ? "🔨 动词还原大作战" : "📮 介词分类投递"], `<button class="nav-btn" data-pg-back onclick="navigateTo('grammar_detail', { gId: '${pgG}', extra: 'game' })">↩ 回到 ${pgG}</button>`);''')
rep('''    <div class="pill-tabs">
      <button class="pill-tab ${tab==='diagrams'?'active':''}" onclick="currentView.params.tab='diagrams'; renderGrammarPlaygroundView();">🛡️ 5大母语负迁移视觉纠偏神器</button>''',
    '''    <div class="pill-tabs" style="display:none;">
      <button class="pill-tab ${tab==='diagrams'?'active':''}" onclick="currentView.params.tab='diagrams'; renderGrammarPlaygroundView();">🛡️ 5大母语负迁移视觉纠偏神器</button>''')

# 5. 语法点底部「歌谣 / 纠偏 / 微训练」页签：接在 d33Mount 里
rep('''  if (typeof d33Mount === "function") d33Mount();   // MENU_HUBS_V3: 闯关厅搬来的内容''',
    '''  if (typeof d33Mount === "function") d33Mount();   // MENU_HUBS_V3: 闯关厅搬来的内容
  if (typeof d33GrammarMount === "function") d33GrammarMount();   // MENU_GRAMMAR_V4: 语法点里的歌谣 / 纠偏''')
rep('''"renderVocabPhonicsView", "renderVocabRelationsView", "renderVocabFormationView"].forEach(n => {''',
    '''"renderVocabPhonicsView", "renderVocabRelationsView", "renderVocabFormationView", "renderGrammarDetailView"].forEach(n => {''')

NEW = r'''
// MENU_GRAMMAR_V4 ---------- 决策 33 ④：总结表挂语法各类末尾；歌谣 / 纠偏放进语法点（src/patch_menu_grammar.py） ----------
const SUMMARY_TAB_HOME = {   // 总结表 → [所属类, 表名]
  pronouns: ["词法", "🫵 代词全维 5 列分类矩阵"], interrogatives: ["句型", "❓ 9 大疑问词雷达与词源"],
  how_what: ["句型", "⚖️ How 推导公式与 How vs What 原理"], syntax: ["句型", "🔄 汉英语序与词根词缀总表"]
};
function sumChipHtml(k) { return hubChip("📊 " + SUMMARY_TAB_HOME[k][1], `navigateTo('grammar_summary_hub', { summaryTab: '${k}' })`, "#4338ca", `data-sum-chip="${k}"`); }
const D33_GRAMMAR_EXTRAS = {
  chants: { CH01: "G16", CH02: "G19", CH03: "G14", CH04: "G32", CH05: "G20", CH06: "G22", CH07: "G07", CH08: "G36" },
  diagrams: { DG01: "G19", DG02: "G36", DG03: "G23", DG04: "G11", DG05: "G14" },
  games: { verb_game: "G23", prep_game: "G14" }
};
function d33GrammarExtras(gId) {
  const X = D33_GRAMMAR_EXTRAS, out = [];
  GRAMMAR_CHANTS.forEach((c, i) => { if (X.chants[c.id] === gId) out.push(["chant", c, i]); });
  GRAMMAR_PLAYGROUND.diagrams.forEach(d => { if (X.diagrams[d.id] === gId) out.push(["diag", d]); });
  Object.keys(X.games).forEach(k => { if (X.games[k] === gId) out.push(["game", k]); });
  return out;
}
function d33GrammarMount(force) {
  try {
    const old = document.getElementById("d33GBox");
    if (currentView.screen !== "grammar_detail") { if (old) old.remove(); return; }
    const p = currentView.params || {}, gId = p.gId || "G01", xs = d33GrammarExtras(gId);
    if (old) old.remove();
    if (!xs.length) return;
    const kinds = [["chant", "🎵 歌谣"], ["diag", "🛡️ 纠偏"], ["game", "🔨 微训练"]].filter(k => xs.some(x => x[0] === k[0]));
    const cur = kinds.some(k => k[0] === p.extra) ? p.extra : kinds[0][0];
    const body = xs.filter(x => x[0] === cur).map(x => {
      if (x[0] === "chant") { const ch = x[1]; return `<div data-d33g-chant="${ch.id}" style="margin-bottom:10px;"><div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;"><b style="color:#5b21b6; font-size:1.05rem;">${ch.title}</b><button onclick="speakText(${attrEscape(JSON.stringify(ch.en_lines.join(" ")))}, 'en')" style="background:#7c3aed; color:#fff; padding:9px 16px; min-height:44px; border-radius:12px; font-weight:800; border:0;">▶️ 整首朗读</button></div>${ch.en_lines.map((line, i) => `<div onclick="speakText(${attrEscape(JSON.stringify(line))}, 'en')" style="background:#f5f3ff; padding:10px 14px; border-radius:12px; border-left:5px solid #7c3aed; cursor:pointer; margin-bottom:6px;"><div style="font-weight:900; color:#1e1b4b;">🥁 ${line} 🔊</div><div style="font-size:0.88rem; color:#475569; font-weight:700;">${ch.zh_lines[i] || ""}</div></div>`).join("")}</div>`; }
      if (x[0] === "diag") { const d = x[1]; return `<div data-d33g-diag="${d.id}" style="background:#fff; border-radius:14px; padding:12px 14px; border:2px solid #cbd5e1; margin-bottom:10px;"><div style="font-weight:900; color:#1e3a8a; margin-bottom:8px;">${d.icon} ${d.title}</div><div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px; margin-bottom:8px;"><div style="background:#fef2f2; padding:10px; border-radius:10px; border:1.5px solid #fca5a5; font-weight:800; color:#991b1b;">${d.error_ex}</div><div onclick="speakText(${attrEscape(JSON.stringify(d.correct_ex.replace("✅", "").split("/")[0]))}, 'en')" style="background:#ecfdf5; padding:10px; border-radius:10px; border:1.5px solid #6ee7b7; font-weight:800; color:#065f46; cursor:pointer;">${d.correct_ex} 🔊</div></div><div style="font-size:0.9rem; color:#334155; font-weight:700;">💡 <strong>纠偏原理：</strong>${d.visual_rule}</div></div>`; }
      return `<button data-d33g-game="${x[1]}" onclick="pgGameIdx=0; navigateTo('grammar_playground', { tab: '${x[1]}' })" style="background:#dc2626; color:#fff; border:0; border-radius:12px; padding:10px 16px; min-height:44px; font-weight:900; margin:0 8px 8px 0; cursor:pointer;">${x[1] === "verb_game" ? "🔨 动词还原大作战" : "📮 in / on / at 介词分类投递"} ➔</button>`;
    }).join("");
    document.getElementById("appViewRoot").insertAdjacentHTML("beforeend", `<div id="d33GBox" data-d33g="${gId}" style="background:#fff; border:2px solid #c4b5fd; border-radius:18px; padding:14px 16px; margin-top:18px;"><div class="pill-tabs" style="margin-bottom:10px;">${kinds.map(k => `<button class="pill-tab ${cur === k[0] ? "active" : ""}" data-d33g-tab="${k[0]}" onclick="currentView.params.extra='${k[0]}'; d33GrammarMount(true);">${k[1]}</button>`).join("")}</div>${body}</div>`);
  } catch (e) { console.warn("d33GrammarMount", e); }
}
'''
rep('''// ORAL_FUNC_MAP_V1 ----------''', NEW.lstrip('\n') + '''// ORAL_FUNC_MAP_V1 ----------''')
save(s)
print('ok: 总结表 / 歌谣 / 纠偏并入语法')
