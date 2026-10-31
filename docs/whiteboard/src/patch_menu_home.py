"""patch_menu_home.py —— 决策 33 第 ② 步：首页 5 入口 + 撤首页 13 张实验室卡（用户 2026-10-31 确认按原方案执行）。
- 首页：「▶ 继续上次」一行之后只剩 5 个入口卡（📚 单词 / 🧩 语法 / 💬 口语 / 🧠 底层原理 / 🎯 练习与档案）。
  原 v6 闯关厅横幅、三大总枢小卡、王炸实验室入口卡（13 + 2 个按钮）、「👑 更多」方法论小卡全部撤下首页，内容一个不删、换位置：
  · 13 个实验室页签按 B 分组：单词（发音与拼读 / 构词与变形 / 词语关系）、语法（时态 / 句型与写作）、底层原理（隐喻 / 竹节句）；
    单词大厅新增「🧭 单词专项」区（含原首页的「元音变异」「单词卡 X 光」两个按钮 + 单词身世卡）；语法分类页「动词与时态」「句型」末尾挂本类专项；
    新 screen `principles_hub`「🧠 底层原理」（第一性原理 / 中英对照 / 三大隐喻 / 竹节句；方法论教室暂挂这里，第 ③ 步并入后撤）；
    新 screen `practice_hub`「🎯 练习与档案」（我的学习 / 综合自测 / 总地图 / 闯关游戏厅——闯关厅第 ③ 步收编）。
  · 首页「📒 我的学习 / 🎯 综合自测 / 🗺️ 总地图」三个按钮从「继续上次」一行移进第 5 张卡（data-home-my / -test / -map 标记各仍 1 个）。
- 实验室页 super_lab_hub 保留为这 13 个页签的内容页（旧入口 navigateTo('super_lab_hub', …) 照常可用），
  面包屑 / 头部 / 页签条改成所属分区（只列同一分区的页签），右上角「↩ 回到 单词 / 语法 / 底层原理」。
- 总地图节点分区名去掉「王炸实验室」字样，改用 LAB_GROUPS 新组名。
幂等：已打过补丁就退出。写回走 appwrite.save（anchorcheck + jscheck）。"""
import sys, pathlib, re
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
if '// MENU_HOME_V2 ----------' in s:
    sys.exit('已打过补丁')

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, (c, n, old[:90])
    s = s.replace(old, new)

def cut(a, b):
    """返回 [a, b) 之间的原文（a、b 各唯一）"""
    assert s.count(a) == 1, ('start', s.count(a), a[:80]); i = s.index(a)
    j = s.index(b, i); assert s.count(b) >= 1
    return s[i:j]

# ---------- 1. LAB_GROUPS 按决策 33 B 重新分组（页签 id / 名字不变） ----------
old_groups = cut('const LAB_GROUPS = [', '\n];') + '\n];'
NEW_GROUPS = '''const LAB_GROUPS = [
  { name: "📚 单词 · 发音与拼读", home: "vocab_hall", tabs: [["pron_map", "👄 发音五大坑 + 口腔地图"], ["intonation_map", "🎵 语调 · 重音 · 弱读"]] },
  { name: "📚 单词 · 构词与变形", home: "vocab_hall", tabs: [["eight_endings", "🔚 只剩 8 个词尾"], ["irregular_plural", "👣 不规则复数"], ["past_clans", "⚔️ 过去式四大门派"]] },
  { name: "📚 单词 · 词语关系", home: "vocab_hall", tabs: [["phrasal_key", "🔑 短语动词总钥匙"]] },
  { name: "🧩 语法 · 时态", home: "grammar_hall", tabs: [["tense_matrix", "🧭 时 × 体矩阵"], ["aux_transformer", "🪞 助动词照妖镜"]] },
  { name: "🧩 语法 · 句型与写作", home: "grammar_hall", tabs: [["five_patterns", "🦴 五大基本句型"], ["adj_order", "👑 形容词排座次"], ["writing_alchemist", "🏆 高分作文炼金炉"]] },
  { name: "🧠 底层原理", home: "principles_hub", tabs: [["metaphor_code", "🎭 三大隐喻密码"], ["bamboo_tree", "🎋 竹节句 vs 树干句"]] }
];'''
ids_old = sorted(re.findall(r'\["(\w+)", "', old_groups)); ids_new = sorted(re.findall(r'\["(\w+)", "', NEW_GROUPS))
assert ids_old == ids_new and len(ids_new) == 13, (ids_old, ids_new)
rep(old_groups, NEW_GROUPS)

# ---------- 2. 实验室页：头部 / 面包屑 / 页签条改成所属分区 ----------
rep('''  renderSubNavbar(
    ["首页", "⚡ 王炸实验室", tabTitles[tab] || "规律实验室"],
    `<button class="nav-btn quiz-launch" onclick="navigateTo('first_principles_hub', { lawIdx: 0, actIdx: 0 })">🧠 六大第一性原理总枢</button>`
  );''',
    '''  const labG = labGroupOf(tab), labTopName = labTop(labG);   // MENU_HOME_V2：按所属分区显示
  renderSubNavbar(
    ["首页", labTopName, tabTitles[tab] || "规律实验室"],
    `<button class="nav-btn" data-lab-back onclick="navigateTo('${labG.home}')">↩ 回到 ${labTopName}</button><button class="nav-btn quiz-launch" onclick="navigateTo('first_principles_hub', { lawIdx: 0, actIdx: 0 })">🧠 六大第一性原理总枢</button>`
  );''')
rep('''          <span style="background:#10b981; color:#0f172a; padding:3px 11px; border-radius:999px; font-weight:900; font-size:0.78rem;">⚡ 王炸实验室</span>
          <h2 style="margin:6px 0 2px; font-size:1.36rem; font-weight:900;">底层规律实验室（按发音、词汇、语法分组，点名字切换）</h2>''',
    '''          <span style="background:#10b981; color:#0f172a; padding:3px 11px; border-radius:999px; font-weight:900; font-size:0.78rem;">${labTopName} · 专项</span>
          <h2 style="margin:6px 0 2px; font-size:1.36rem; font-weight:900;">${labTopName}专项规律（同一分区的页签，点名字切换）</h2>''')
rep('''      <div class="lab-tabgroups">${LAB_GROUPS.map(g => `''',
    '''      <div class="lab-tabgroups">${LAB_GROUPS.filter(g => labTop(g) === labTopName).map(g => `''')

# ---------- 3. 总地图分区名 ----------
rep('''out.push({ area: "🧪 王炸实验室 · " + g.name, key: "lab:" + id''', '''out.push({ area: g.name, key: "lab:" + id''')

# ---------- 4. 首页：5 入口 ----------
home_old = cut('''    <div class="home-sec">📚 今天学什么</div>''', '''  `;\n}\n\n// Parent Gate Challenge''')
assert "navigateTo('method_hub')" in home_old and "navigateTo('v6_hub')" in home_old and 'class="lab-entry"' in home_old
HOME_NEW = '''    <!-- MENU_HOME_V2：决策 33 ②，首页只留 5 个入口（src/patch_menu_home.py）。原三大总枢小卡、王炸实验室入口卡、闯关厅横幅、方法论小卡已按分区挪进各入口 -->
    <!-- WO_HOME / ZE_HOME：单词身世入口在「📚 单词」大厅的「🧭 单词专项」区，中英对照入口在「🧠 底层原理」；保留此标记，insert_wb.py 据此不再插入旧横幅 -->
    <!-- ZE_HOME（同上） -->
    <div class="home-portal-grid home-five" data-home-five>
      <div class="portal-card vocab" data-home-entry="vocab" onclick="navigateTo('vocab_hall')">
        <div>
          <div class="portal-icon">📚</div>
          <h2 class="portal-title" style="color:#1e40af;">单词</h2>
          <div class="portal-sub">单词表 · 发音与拼读 · 构词与变形 · 词语关系 · 单词身世</div>
          <div style="font-size:0.86rem; color:#475569; margin:10px 0 12px;">🌟 已掌握 <b>${wCounts.mastered}</b> 词 ｜ 📖 学习中 <b>${wCounts.learning}</b> ｜ 📕 错题本 <b>${wCounts.mistake}</b></div>
        </div>
        <div class="portal-enter-btn">进入单词 ➔</div>
      </div>
      <div class="portal-card grammar" data-home-entry="grammar" onclick="navigateTo('grammar_hall')">
        <div>
          <div class="portal-icon">🧩</div>
          <h2 class="portal-title" style="color:#5b21b6;">语法</h2>
          <div class="portal-sub">40 个核心语法点：词法 15 · 时态 12 · 句型 13，每类末尾有总结与专项</div>
          <div style="font-size:0.86rem; color:#475569; margin:10px 0 12px;">🌟 已掌握 <b>${gCounts.mastered}</b> 点 ｜ 📖 学习中 <b>${gCounts.learning}</b> ｜ 📕 错题本 <b>${gCounts.mistake}</b></div>
        </div>
        <div class="portal-enter-btn">进入语法 ➔</div>
      </div>
      <div class="portal-card oral" data-home-entry="oral" onclick="navigateTo('oral_hall')">
        <div>
          <div class="portal-icon">💬</div>
          <h2 class="portal-title" style="color:#065f46;">口语</h2>
          <div class="portal-sub">16 大交际场景 · ${DAILY_EXPRESSIONS_DB.length} 句高频口语 · 交际句型地图</div>
          <div style="font-size:0.86rem; color:#475569; margin:10px 0 12px;">🌟 已掌握 <b>${oCounts.mastered}</b> 句 ｜ 📖 学习中 <b>${oCounts.learning}</b> ｜ 📕 错题本 <b>${oCounts.mistake}</b></div>
        </div>
        <div class="portal-enter-btn">进入口语 ➔</div>
      </div>
      <div class="portal-card principles" data-home-entry="principles" onclick="navigateTo('principles_hub')">
        <div>
          <div class="portal-icon">🧠</div>
          <h2 class="portal-title" style="color:#4338ca;">底层原理</h2>
          <div class="portal-sub">六大第一性原理 · 中英对照 · 三大隐喻密码 · 竹节句 vs 树干句</div>
        </div>
        <div class="portal-enter-btn">进入底层原理 ➔</div>
      </div>
      <div class="portal-card practice" data-home-entry="practice" onclick="navigateTo('practice_hub')">
        <div>
          <div class="portal-icon">🎯</div>
          <h2 class="portal-title" style="color:#be123c;">练习与档案</h2>
          <div class="portal-sub">综合自测 · 错题本 / 学习中 / 已掌握 · 闯关游戏 · 总地图</div>
          <div class="home-practice-btns">
            <button type="button" data-home-my onclick="event.stopPropagation(); navigateTo('my_study')" style="background:#be123c;">📒 我的学习</button><button type="button" data-home-test onclick="event.stopPropagation(); navigateTo('self_test')" style="background:#047857;">🎯 综合自测</button><button type="button" data-home-map onclick="event.stopPropagation(); navigateTo('app_map')" style="background:#1e3a8a;">🗺️ 总地图</button>
          </div>
        </div>
        <div class="portal-enter-btn">进入练习与档案 ➔</div>
      </div>
    </div>
'''
rep(home_old, HOME_NEW)
# 首页 hero 副标题、「继续上次」一行：三个按钮已移进第 5 张卡
rep('''<button type="button" data-home-my onclick="navigateTo('my_study')" style="background:#be123c; color:#fff; border:0; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer; white-space:nowrap;">📒 我的学习</button><button type="button" data-home-test onclick="navigateTo('self_test')" style="background:#047857; color:#fff; border:0; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer; white-space:nowrap;">🎯 综合自测</button><button type="button" data-home-map onclick="navigateTo('app_map')" style="background:#1e3a8a; color:#fff; border:0; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer; white-space:nowrap;">🗺️ 总地图</button>''', '')

# ---------- 5. 首页卡样式 ----------
rep('''.portal-card.method {''', '''/* MENU_HOME_V2：首页第 4、5 张入口卡 */
.portal-card.principles { border-color: #a5b4fc; background: linear-gradient(180deg, #ffffff 0%, #eef2ff 100%); }
.portal-card.principles .portal-enter-btn { background: linear-gradient(135deg, #4f46e5, #4338ca); }
.portal-card.practice { border-color: #fda4af; background: linear-gradient(180deg, #ffffff 0%, #fff1f2 100%); }
.portal-card.practice .portal-enter-btn { background: linear-gradient(135deg, #e11d48, #be123c); }
.home-five .portal-card { min-height: 0 !important; }
.home-practice-btns { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 12px; }
.home-practice-btns button { color: #fff; border: 0; border-radius: 12px; padding: 10px 12px; min-height: 44px; font-weight: 900; cursor: pointer; font-family: inherit; font-size: 0.9rem; }
.hub-zone { background: #fff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 14px 16px; margin-bottom: 14px; }
.hub-zone-t { font-weight: 900; font-size: 1.02rem; margin-bottom: 8px; }
.hub-zone-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.hub-chip { background: #fff; border: 1.5px solid; border-radius: 999px; padding: 9px 14px; min-height: 44px; font-size: 0.88rem; font-weight: 800; cursor: pointer; font-family: inherit; }
.hub-chip:hover { filter: brightness(0.96); }
.portal-card.method {''')

# ---------- 6. 单词大厅「🧭 单词专项」区；语法分类页末尾本类专项 ----------
rep('''    <!-- My Vocabulary Learning Status (我的) -->''', '''    <!-- MENU_HOME_V2:vocab_zone -->${vocabZonesHtml()}
    <!-- My Vocabulary Learning Status (我的) -->''')
rep('''          </div>
        `;
      }).join("")}
    </div>
  `;
}

// 4-Step Inductive Grammar Detail View (Section 4.5)''', '''          </div>
        `;
      }).join("")}
    </div>
    <!-- MENU_HOME_V2:grammar_cat_zone -->${grammarCatZoneHtml(cat)}
  `;
}

// 4-Step Inductive Grammar Detail View (Section 4.5)''')

# ---------- 7. 路由 + 新页面 ----------
rep('''  else if (s === "self_test") renderSelfTestView();\n''', '''  else if (s === "self_test") renderSelfTestView();
  else if (s === "principles_hub") renderPrinciplesHubView();   // MENU_HOME_V2
  else if (s === "practice_hub") renderPracticeHubView();   // MENU_HOME_V2\n''')

NEW = r'''
// MENU_HOME_V2 ---------- 决策 33 ②：首页 5 入口，实验室 13 页签按单词 / 语法 / 底层原理分区（src/patch_menu_home.py） ----------
function labGroupOf(id) { return LAB_GROUPS.find(g => g.tabs.some(t => t[0] === id)) || LAB_GROUPS[0]; }
function labTop(g) { return (g && g.name || "").split(" · ")[0]; }
function labTabLabel(id) { const g = labGroupOf(id), t = g.tabs.find(x => x[0] === id); return t ? t[1] : id; }
function labChipHtml(id, color) { return `<button type="button" class="hub-chip" data-lab-chip="${id}" onclick="navigateTo('super_lab_hub', { labTab: '${id}' })" style="border-color:${color}55; color:${color};">${typeof labDoneMark === "function" ? labDoneMark(id) : ""}${labTabLabel(id)}</button>`; }
function hubChip(label, go, color, attr) { return `<button type="button" class="hub-chip" ${attr || ""} onclick="${go}" style="border-color:${color}55; color:${color};">${label}</button>`; }
function hubZone(title, color, bg, chips, attr) { return `<div class="hub-zone" ${attr || ""} style="border-color:${color}40; background:${bg};"><div class="hub-zone-t" style="color:${color};">${title}</div><div class="hub-zone-chips">${chips}</div></div>`; }
function vocabZonesHtml() {
  return `<div class="section-banner"><h2>🧭 单词专项（发音与拼读 · 构词与变形 · 词语关系 · 单词身世）</h2></div>
    ${hubZone("👄 发音与拼读", "#e11d48", "#fff1f2", hubChip("🪄 自然拼读 9 步", "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })", "#e11d48") + labChipHtml("pron_map", "#e11d48") + labChipHtml("intonation_map", "#e11d48"), 'data-vocab-zone="pron"')}
    ${hubZone("🤖 构词与变形", "#7c3aed", "#f5f3ff", hubChip("🤖 合成词 / 前后缀 / 派生词族", "navigateTo('vocab_formation', { tab: 'compounds' })", "#7c3aed") + labChipHtml("eight_endings", "#7c3aed") + labChipHtml("irregular_plural", "#7c3aed") + labChipHtml("past_clans", "#7c3aed") + hubChip("🧬 元音变异 foot→feet", "navigateTo('word_origins_hub', { scene: 'wo_vowel_a' })", "#7c3aed") + hubChip("🔬 单词卡 X 光", "openWordCardModal('G6_258', ['G6_258','G4_167','G5_208','G1_030','G3_151','G3_152'])", "#7c3aed"), 'data-vocab-zone="form"')}
    ${hubZone("👨‍👩‍👧 词语关系", "#d97706", "#fffbeb", hubChip("👨‍👩‍👧 易混词 / 反义词 / 同义词", "navigateTo('vocab_relations', { tab: 'confusables', query: '' })", "#d97706") + hubChip("🎬 框架小剧场", "navigateTo('vocab_frames', { frameIdx: 0, pIdx: 0 })", "#d97706") + labChipHtml("phrasal_key", "#d97706"), 'data-vocab-zone="rel"')}
    ${hubZone("📖 单词身世", "#7c3aed", "#faf5ff", hubChip("📖 单词身世：罗马、维京、诺曼、大航海，单词的故事", "navigateTo('word_origins_hub', { scene: 'wo_port' })", "#7c3aed", "data-vocab-wo"), 'data-vocab-zone="wo"')}`;
}
const GRAMMAR_CAT_ZONES = {
  "动词与时态": { title: "⏳ 时态类收尾专项", tabs: ["tense_matrix", "aux_transformer"] },
  "句型": { title: "🚂 句型类收尾专项", tabs: ["five_patterns", "adj_order", "writing_alchemist"] }
};
function grammarCatZoneHtml(cat) {
  const z = GRAMMAR_CAT_ZONES[cat]; if (!z) return "";
  return `<div style="margin-top:18px;" data-grammar-cat-zone="${cat}">${hubZone(z.title, "#7c3aed", "#f5f3ff", z.tabs.map(id => labChipHtml(id, "#7c3aed")).join(""))}</div>`;
}
function hubCard(icon, title, desc, go, color, bg, attr) {
  return `<div class="hub-mini" ${attr || ""} onclick="${go}" style="background:${bg}; border-color:${color}40; display:flex; align-items:center; gap:12px; border:2px solid ${color}40; border-radius:16px; padding:12px 14px; cursor:pointer; min-height:44px;"><div style="font-size:1.7rem;">${icon}</div><div style="flex:1;"><div style="font-weight:900; font-size:1rem; color:${color};">${title}</div><div style="font-size:0.84rem; color:#475569; margin-top:2px;">${desc}</div></div><div style="font-weight:900; color:${color};">➔</div></div>`;
}
function renderPrinciplesHubView() {
  renderSubNavbar(["首页", "🧠 底层原理"]);
  document.getElementById("appViewRoot").innerHTML = `
    <div data-principles-hub style="background:linear-gradient(135deg,#eef2ff,#e0e7ff); border:2px solid #a5b4fc; border-radius:18px; padding:14px 18px; margin-bottom:14px;">
      <div style="font-weight:900; font-size:1.25rem; color:#3730a3;">🧠 底层原理 · 一理通百词，一理通百句</div>
      <div style="font-size:0.88rem; color:#475569; margin-top:4px;">语音、单词、语法背后的共同规律；中文习惯哪些能搬进英语、哪些不能。</div>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:10px;">
      ${hubCard("🧠", "六大第一性原理", "6 条原理 × 4 幕白板动画", "navigateTo('first_principles_hub', { lawIdx: 0, actIdx: 0 })", "#4338ca", "#eef2ff", 'data-principles-card="fp"')}
      ${hubCard("🔀", "中英对照", "句法与思维差异：中文习惯哪些能搬、哪些不能搬", "navigateTo('zh_en_hub', { scene: 'ze_be' })", "#0f766e", "#f0fdfa", 'data-principles-card="ze"')}
      ${hubCard("🎭", "三大隐喻密码", "身体 / 颜色 / 动物 + 空间隐喻", "navigateTo('super_lab_hub', { labTab: 'metaphor_code' })", "#db2777", "#fdf2f8", 'data-principles-card="metaphor_code"')}
      ${hubCard("🎋", "竹节句 vs 树干句", "汉语竹节句 → 英语树干句手术台", "navigateTo('super_lab_hub', { labTab: 'bamboo_tree' })", "#15803d", "#f0fdf4", 'data-principles-card="bamboo_tree"')}
      <!-- MENU_HOME_V2:method_card -->${hubCard("👑", "方法论 / 真动画教室", "天坑测验 · 三幕剧 · 句法火车 · 变形拼写台（整理中，内容将并入各分区）", "navigateTo('method_hub')", "#b45309", "#fffbeb", 'data-principles-card="method"')}
    </div>`;
}
function renderPracticeHubView() {
  renderSubNavbar(["首页", "🎯 练习与档案"]);
  const c = { vocab: countDomainStatus("vocab"), grammar: countDomainStatus("grammar"), oral: countDomainStatus("oral") };
  const sum = k => c.vocab[k] + c.grammar[k] + c.oral[k];
  document.getElementById("appViewRoot").innerHTML = `
    <div data-practice-hub style="background:linear-gradient(135deg,#fff1f2,#ffe4e6); border:2px solid #fda4af; border-radius:18px; padding:14px 18px; margin-bottom:14px;">
      <div style="font-weight:900; font-size:1.25rem; color:#9f1239;">🎯 练习与档案</div>
      <div style="font-size:0.88rem; color:#475569; margin-top:4px;">📕 错题本 <b>${sum("mistake")}</b> ｜ 📖 学习中 <b>${sum("learning")}</b> ｜ 🌟 已掌握 <b>${sum("mastered")}</b>（单词 + 语法 + 口语）</div>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:10px;">
      ${hubCard("🎯", "综合自测", "按单词 / 语法 / 口语选类型开测，可只测错题本", "navigateTo('self_test')", "#047857", "#ecfdf5", 'data-practice-card="test"')}
      ${hubCard("📒", "我的学习", "错题本 / 学习中 / 已掌握，三类合在一处", "navigateTo('my_study')", "#be123c", "#fff1f2", 'data-practice-card="my"')}
      <!-- MENU_HOME_V2:games_card -->${hubCard("🎮", "闯关游戏厅", "4 合 1 闯关 · 单词闪电战 · 考场捉虫 · 金剪刀", "navigateTo('v6_hub')", "#0284c7", "#f0f9ff", 'data-practice-card="games"')}
      ${hubCard("🗺️", "总地图", "全部模块一张图，学过的点亮", "navigateTo('app_map')", "#1e3a8a", "#eff6ff", 'data-practice-card="map"')}
    </div>`;
}
'''
rep('''// ORAL_FUNC_MAP_V1 ----------''', NEW.lstrip('\n') + '''// ORAL_FUNC_MAP_V1 ----------''')
save(s)
print('ok: 首页 5 入口 + 实验室分区')
