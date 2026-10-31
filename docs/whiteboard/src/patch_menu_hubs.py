"""patch_menu_hubs.py —— 决策 33 第 ③ 步：方法论教室 method_hub、4 合 1 闯关厅 v6_hub 收编（先搬后删，逐段对比见 lab/MENU_D33_AUDIT.md）。
做法（内容一字不删，只换位置；旧 screen 名都留着）：
- v6_hub 只剩「🎮 闯关游戏」（单词闪电战 / 感叹句快刀手 / 考场捉虫），面包屑「🎯 练习与档案 › 🎮 闯关游戏」；单词闪电战在原 5 题后接上从 VOCAB_DB 出的题（中文 → 选英文，干扰项取同一子主题）。
  其余 7 个页签逐段比对后按 B 搬到新家，旧入口 navigateTo('v6_hub', { tab }) 重定向过去：
    同音词 30 组 → 自然拼读「同音词」页签末尾（只挂词库页面没有的 13 组）；反义词 50 对 → 词语的亲戚「反义词」页签末尾（只挂没有的 24 对）；
    12 景口语 → 口语大厅（12 组问答 9 组在日常用语里没有，整块搬）；金剪刀 8 题 → 语法 G34 感叹句；作文母题 6 篇 → 高分作文炼金炉页签末尾；
    词源树 5 组 → 构词页「后缀」页签末尾；变形表 70 词 → 构词页「派生词族」页签末尾。
- method_hub 不再是菜单：6 个页签逐个挂到所属分区（底层原理：三大元公理 + 六原理速查表、汉英句法真火车；单词：四大变形拼写动画台、一词多义三幕剧；
  语法句型：感叹句剪刀切尾 & 作文；练习与档案：考场秒杀决策树 & 十大天坑、十五条规律速查），打开时只显示该页签（不出方法论自己的页签条 / 剧场条），
  面包屑和「↩ 回到」按所属分区；不带 tab 的旧入口 navigateTo('method_hub') 重定向到底层原理。
- 闯关厅 12 景口语第 8 组问句「Did you anything else?」缺 do，改成「Did you do anything else?」（原讲法记在审计表）。
幂等：已打过补丁就退出。写回走 appwrite.save（anchorcheck + jscheck）。"""
import sys, pathlib, json, re, subprocess
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
if '// MENU_HUBS_V3 ----------' in s:
    sys.exit('已打过补丁')

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, (c, n, old[:90])
    s = s.replace(old, new)

# ---------- 0. 逐段对比：同音词 / 反义词哪些是新的（App 里已有的不重复挂） ----------
EX = pathlib.Path('/tmp/d33_extract.js')
EX.write_text(r'''const fs=require('fs'); const s=fs.readFileSync(process.argv[2],'utf8');
function grab(name){ const i=s.indexOf('const '+name+' ='); if(i<0) return null; let j=s.indexOf('=',i)+1; while(s[j]===' ')j++;
 const open=s[j], close=open==='['?']':'}'; let d=0,k=j,q=null;
 for(;k<s.length;k++){const c=s[k]; if(q){ if(c==='\\'){k++;continue;} if(c===q)q=null; continue;} if(c==='"'||c==="'"||c==='`'){q=c;continue;} if(c===open)d++; else if(c===close){d--; if(!d)break;}}
 return eval('('+s.slice(j,k+1)+')'); }
const o={}; for(const n of process.argv.slice(3)) o[n]=grab(n); process.stdout.write(JSON.stringify(o));''')
D = json.loads(subprocess.run(['node', str(EX), str(APP), 'HOMOPHONES_30', 'HOMOPHONES_DB', 'HOMOPHONES_LIST', 'ANTONYMS_50', 'ANTONYMS_LIST', 'WORD_RELATIONS_DB'],
                              capture_output=True, text=True, check=True).stdout)
def wset(p): return frozenset(x.strip().lower() for x in re.sub(r'\(.*?\)', '', p).split('/') if x.strip())
have_h = [frozenset(w['w'].lower() for w in g['words']) for g in D['HOMOPHONES_DB']] + [wset(h) for h in D['HOMOPHONES_LIST']]
HOMO_NEW = [i for i, (p, z) in enumerate(D['HOMOPHONES_30']) if not any(wset(p) <= g or g <= wset(p) for g in have_h)]
have_a = set()
for a in D['ANTONYMS_LIST']:
    l, r = a.split('↔'); have_a.add((l.strip().lower(), re.sub(r'\(.*', '', r).strip().lower()))
for a in D['WORD_RELATIONS_DB']['antonyms']: have_a.add((a['w1'].lower(), a['w2'].lower()))
ANT_NEW = []
for i, a in enumerate(D['ANTONYMS_50']):
    l, r = a.split('↔'); L, R = wset(l), wset(r)
    if not any((x, y) in have_a or (y, x) in have_a for x in L for y in R): ANT_NEW.append(i)
print('同音词新增', len(HOMO_NEW), '反义词新增', len(ANT_NEW))
assert len(HOMO_NEW) == 13 and len(ANT_NEW) == 24, (HOMO_NEW, ANT_NEW)

# ---------- 1. V6H：暴露数据、mount 支持指定页签；12 景口语第 8 组改错 ----------
rep('''Did you anything else?''', '''Did you do anything else?''')
rep('''V6H.mount = function(root){''', '''V6H.data = { ORAL_12_SCENES, HOMOPHONES_30, ANTONYMS_50, ESSAY_8_TEMPLATES, ETYMOLOGY_TREES, MORPH_DERIVATIONS, EXCLAMATION_10_CASES, GAME_BANKS };   // MENU_HUBS_V3：内容搬到各分区后由 d33Mount 读取
V6H.mount = function(root, tab){''')
rep('''  switchTab("game");\n};\n})(window.V6H);''', '''  switchTab(tab || "game");\n};\n})(window.V6H);''')
rep('''      <div style="font-weight:900;font-size:1.05rem;">🎮 v6 拓展教室 / 闯关游戏厅</div>
      <button type="button" onclick="goHome()">🏠 返回萌星首页</button>''', '''      <div style="font-weight:900;font-size:1.05rem;">🎮 闯关游戏</div>
      <button type="button" onclick="navigateTo('practice_hub')">↩ 回到练习与档案</button>''')

# ---------- 2. v6_hub 页面：只剩闯关游戏，旧页签重定向 ----------
old_v6 = s[s.index('function renderV6HubView() {'):s.index('/* ===== Method Hub (namespaced) ===== */')]
rep(old_v6, '''function renderV6HubView() {   // MENU_HUBS_V3：只剩闯关游戏；其余页签已搬家（见 V6_MOVED）
  const t = (currentView.params || {}).tab;
  if (t && t !== "game" && V6_MOVED[t]) { const m = V6_MOVED[t]; currentView = { screen: m[0], params: m[1], scrollY: 0 }; renderCurrentView(); return; }
  renderSubNavbar(["首页", "🎯 练习与档案", "🎮 闯关游戏"], `<button class="nav-btn" onclick="navigateTo('practice_hub')">↩ 回到练习与档案</button>`);
  const root = document.getElementById("appViewRoot");
  root.innerHTML = `<div class="v6-hub v6-games-only" id="v6HubRoot"></div>`;
  if (window.V6H && typeof V6H.mount === "function") {
    setTimeout(function(){ d33ExtendVocabGame(); V6H.mount(document.getElementById("v6HubRoot"), "game"); }, 20);
  }
}

''')

# ---------- 3. method_hub：单页签模式 + 重定向 ----------
rep('''function renderMethodHubView() {
  renderSubNavbar([
    { label: "首页", onClick: "goHome()" },
    { label: "十五大王炸方法论 / 真动画教室", onClick: "" }
  ], `<button class="nav-btn home" onclick="goHome()">🏠 回首页</button>`);
  const root = document.getElementById("appViewRoot");
  root.innerHTML = `<div class="method-hub">
<div class="mh-back-bar">
  <div style="font-weight:900;font-size:1.05rem;">👑 十五大王炸方法论 / 真动画教室</div>
  <button type="button" onclick="goHome()">🏠 返回萌星首页</button>
</div>''', '''function renderMethodHubView() {
  const mhTab = (currentView.params || {}).tab, mhHome = MH_TAB_HOME[mhTab];   // MENU_HUBS_V3：不再是菜单，只按页签打开
  if (!mhHome) { currentView = { screen: "principles_hub", params: {}, scrollY: 0 }; renderCurrentView(); return; }
  renderSubNavbar(["首页", mhHome[0], mhHome[2]], `<button class="nav-btn" data-mh-back onclick="navigateTo('${mhHome[1]}')">↩ 回到 ${mhHome[0]}</button>`);
  const root = document.getElementById("appViewRoot");
  root.innerHTML = `<div class="method-hub mh-single" data-mh-tab="${mhTab}">
<div class="mh-back-bar">
  <div style="font-weight:900;font-size:1.05rem;">${mhHome[2]}</div>
  <button type="button" onclick="navigateTo('${mhHome[1]}')">↩ 回到 ${mhHome[0]}</button>
</div>''')
rep('''  if (window.MH && typeof MH.init === "function") {
    setTimeout(function(){ MH.init(); }, 30);
  }
}''', '''  if (window.MH && typeof MH.init === "function") {
    setTimeout(function(){ MH.init(); if (MH.switchTab) MH.switchTab(mhTab); }, 30);
  }
}''')
rep('''.method-hub .top-header { position: sticky; top: 0; z-index: 20; }''', '''.method-hub .top-header { position: sticky; top: 0; z-index: 20; }
.method-hub.mh-single .top-header, .method-hub.mh-single .theater-strip { display: none; }   /* MENU_HUBS_V3：单页签模式 */
.v6-games-only .v6-tabs { display: none; }''')

# ---------- 4. 各分区挂入口 ----------
rep('''<!-- MENU_HOME_V2:method_card -->${hubCard("👑", "方法论 / 真动画教室", "天坑测验 · 三幕剧 · 句法火车 · 变形拼写台（整理中，内容将并入各分区）", "navigateTo('method_hub')", "#b45309", "#fffbeb", 'data-principles-card="method"')}''',
    '''<!-- MENU_HUBS_V3:principles -->${hubCard("🌌", "三大元公理 + 六原理速查表", "名词边界 / 动词心脏 / 火车语序，一页对照六大第一性原理", "navigateTo('method_hub', { tab: 'matrix' })", "#b45309", "#fffbeb", 'data-principles-card="mh_matrix"')}
      ${hubCard("🚂", "汉英句法真火车", "车厢换位动画：主干先行、状语倒挂", "navigateTo('method_hub', { tab: 'oral' })", "#1e3a8a", "#eff6ff", 'data-principles-card="mh_oral"')}''')
rep('''<!-- MENU_HOME_V2:games_card -->${hubCard("🎮", "闯关游戏厅", "4 合 1 闯关 · 单词闪电战 · 考场捉虫 · 金剪刀", "navigateTo('v6_hub')", "#0284c7", "#f0f9ff", 'data-practice-card="games"')}''',
    '''<!-- MENU_HOME_V2:games_card -->${hubCard("🎮", "闯关游戏", "单词闪电战 · 感叹句快刀手 · 考场捉虫大侦探", "navigateTo('v6_hub')", "#0284c7", "#f0f9ff", 'data-practice-card="games"')}
      <!-- MENU_HUBS_V3:practice -->${hubCard("⚡", "考场秒杀决策树 & 十大天坑", "三棵决策树 + 十大高频天坑 + 防坑闪电战", "navigateTo('method_hub', { tab: 'engine' })", "#b91c1c", "#fef2f2", 'data-practice-card="mh_engine"')}
      ${hubCard("📜", "十五条规律速查", "拼读、变形、代词、时态、疑问词…一页看完（可打印）", "navigateTo('method_hub', { tab: 'trumps' })", "#7c2d12", "#fff7ed", 'data-practice-card="mh_trumps"')}''')
# 单词专项区：构词与变形 + 四大变形拼写动画台；词语关系 + 一词多义三幕剧
rep('''hubChip("🔬 单词卡 X 光", "openWordCardModal('G6_258', ['G6_258','G4_167','G5_208','G1_030','G3_151','G3_152'])", "#7c3aed"), 'data-vocab-zone="form"')}''',
    '''hubChip("🔬 单词卡 X 光", "openWordCardModal('G6_258', ['G6_258','G4_167','G5_208','G1_030','G3_151','G3_152'])", "#7c3aed") + hubChip("🧪 四大变形拼写动画台", "navigateTo('method_hub', { tab: 'matrix' })", "#7c3aed", "data-mh-chip='matrix'"), 'data-vocab-zone="form"')}''')
rep('''labChipHtml("phrasal_key", "#d97706"), 'data-vocab-zone="rel"')}''',
    '''labChipHtml("phrasal_key", "#d97706") + hubChip("🎬 一词多义三幕剧微电影", "navigateTo('method_hub', { tab: 'vocab' })", "#d97706", "data-mh-chip='vocab'"), 'data-vocab-zone="rel"')}''')
rep('''  return `<div style="margin-top:18px;" data-grammar-cat-zone="${cat}">${hubZone(z.title, "#7c3aed", "#f5f3ff", z.tabs.map(id => labChipHtml(id, "#7c3aed")).join(""))}</div>`;''',
    '''  return `<div style="margin-top:18px;" data-grammar-cat-zone="${cat}">${hubZone(z.title, "#7c3aed", "#f5f3ff", z.tabs.map(id => labChipHtml(id, "#7c3aed")).join("") + (z.extra || ""))}</div>`;''')
rep('''  "句型": { title: "🚂 句型类收尾专项", tabs: ["five_patterns", "adj_order", "writing_alchemist"] }''',
    '''  "句型": { title: "🚂 句型类收尾专项", tabs: ["five_patterns", "adj_order", "writing_alchemist"], get extra() { return hubChip("✂️ 感叹句剪刀切尾 & 作文", "navigateTo('method_hub', { tab: 'writing' })", "#7c3aed", "data-mh-chip='writing'"); } }''')

# ---------- 5. 挂载：搬来的内容在新家页面末尾出现（noteLastView 里调用；三个单词页的页签切换也包一层） ----------
rep('''  if (typeof grexMount === "function") grexMount();   // GRAMMAR_EX_V1: 语法课例句库''',
    '''  if (typeof grexMount === "function") grexMount();   // GRAMMAR_EX_V1: 语法课例句库
  if (typeof d33Mount === "function") d33Mount();   // MENU_HUBS_V3: 闯关厅搬来的内容''')
rep('''  ["renderSuperLabHubView", "renderWordOriginsHubView", "renderZhEnHubView"].forEach(n => {''',
    '''  ["renderSuperLabHubView", "renderWordOriginsHubView", "renderZhEnHubView", "renderVocabPhonicsView", "renderVocabRelationsView", "renderVocabFormationView"].forEach(n => {   // MENU_HUBS_V3：后三个页签切换不走 renderCurrentView''')

NEW = r'''
// MENU_HUBS_V3 ---------- 决策 33 ③：方法论教室 / 闯关厅收编，内容搬到所属分区（src/patch_menu_hubs.py；逐段对比 lab/MENU_D33_AUDIT.md） ----------
const MH_TAB_HOME = {   // 方法论页签 → [所属分区, 分区 screen, 页面标题]
  matrix: ["🧠 底层原理", "principles_hub", "🌌 三大元公理 + 四大变形拼写动画台 + 六原理速查表"],
  oral: ["🧠 底层原理", "principles_hub", "🚂 汉英句法真火车"],
  vocab: ["📚 单词", "vocab_hall", "🎬 一词多义三幕剧微电影"],
  writing: ["🧩 语法", "grammar_hall", "✂️ 感叹句剪刀切尾 & 作文"],
  engine: ["🎯 练习与档案", "practice_hub", "⚡ 考场秒杀决策树 & 十大天坑"],
  trumps: ["🎯 练习与档案", "practice_hub", "📜 十五条规律速查"]
};
const V6_MOVED = {   // 闯关厅旧页签 → 新家
  homo: ["vocab_phonics", { tab: "homophones" }], ant: ["vocab_relations", { tab: "antonyms", query: "" }], oral: ["oral_hall", {}],
  excl: ["grammar_detail", { gId: "G34" }], essay: ["super_lab_hub", { labTab: "writing_alchemist" }],
  etym: ["vocab_formation", { tab: "suffixes" }], morph: ["vocab_formation", { tab: "matrices" }]
};
const D33_HOMO_NEW = __HOMO_NEW__, D33_ANT_NEW = __ANT_NEW__;
function d33Esc(x) { return String(x == null ? "" : x).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]); }
function d33Box(id, title, sub, inner) {
  return `<div id="d33Box" data-d33="${id}" style="background:#fff; border:2px dashed #94a3b8; border-radius:18px; padding:14px 16px; margin-top:18px;"><div style="font-weight:900; font-size:1.08rem; color:#0f172a;">${title}</div><div style="font-size:0.82rem; color:#64748b; margin:2px 0 10px;">${sub}</div>${inner}</div>`;
}
function d33Speak(t) { return `onclick="speakEnglishText(${d33Esc(JSON.stringify(t))})"`; }
const D33_GRID = "display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:8px;";
const D33_CARD = "background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:9px 11px; min-height:44px; cursor:pointer;";
function d33BoxHtml() {
  const V = (window.V6H && V6H.data) || null; if (!V) return "";
  const sc = currentView.screen, p = currentView.params || {};
  if (sc === "vocab_phonics" && p.tab === "homophones")
    return d33Box("homo", "➕ 更多同音词（" + D33_HOMO_NEW.length + " 组，原闯关厅「同音词 30 组」里上面没有的）", "点卡片朗读", `<div style="${D33_GRID}">${D33_HOMO_NEW.map(i => { const h = V.HOMOPHONES_30[i]; return `<div style="${D33_CARD}" ${d33Speak(h[0].replace(/\(.*?\)/g, "").replace(/\s*\/\s*/g, ", "))}><div style="font-weight:900;">🔊 ${d33Esc(h[0])}</div><div style="font-size:0.86rem; color:#475569;">${d33Esc(h[1])}</div></div>`; }).join("")}</div>`);
  if (sc === "vocab_relations" && p.tab === "antonyms")
    return d33Box("ant", "➕ 更多反义词（" + D33_ANT_NEW.length + " 对，原闯关厅「反义词 50 对」里上面没有的）", "点卡片朗读", `<div style="${D33_GRID}">${D33_ANT_NEW.map(i => { const a = V.ANTONYMS_50[i]; return `<div style="${D33_CARD}" ${d33Speak(a.replace(/\(.*?\)/g, "").replace(/↔/g, ",").replace(/\s*\/\s*/g, ", "))}><div style="font-weight:800;">🔊 ${d33Esc(a)}</div></div>`; }).join("")}</div>`);
  if (sc === "oral_hall")
    return d33Box("oral12", "🗣️ 12 个话题快问快答（原闯关厅「12 景口语」）", "一问一答，点卡片朗读整组", `<div style="${D33_GRID}">${V.ORAL_12_SCENES.map(o => `<div style="${D33_CARD}" ${d33Speak(o.q + " " + o.a)}><div style="font-size:0.8rem; font-weight:900; color:#047857;">${d33Esc(o.title)}</div><div style="font-weight:800; margin-top:4px;">Q: ${d33Esc(o.q)}</div><div style="color:#065f46; margin-top:3px;">A: ${d33Esc(o.a)}</div></div>`).join("")}</div>`);
  if (sc === "grammar_detail" && p.gId === "G34")
    return d33Box("excl", "✂️ 金剪刀 8 题（原闯关厅）", "先剪掉句末主谓，再看尾词：名词用 What（单数可数加 a/an），形容词 / 副词用 How。动画版见「✂️ 感叹句剪刀切尾」。", `<div style="${D33_GRID}">${V.EXCLAMATION_10_CASES.map((c, i) => `<div style="${D33_CARD}"><b>第 ${i + 1} 题</b><div style="margin:4px 0;">What/How + <b>${d33Esc(c.mid)}</b> + <span style="color:#dc2626;">${d33Esc(c.tail)}</span> !</div><div style="font-size:0.86rem; color:#065f46; font-weight:700;">${d33Esc(c.reason)}</div></div>`).join("")}</div><div style="margin-top:10px;">${hubChip("✂️ 感叹句剪刀切尾动画", "navigateTo('method_hub', { tab: 'writing' })", "#7c3aed")}</div>`);
  if (sc === "super_lab_hub" && typeof superLabState !== "undefined" && superLabState.labTab === "writing_alchemist")
    return d33Box("essay", "📄 作文母题范文 6 篇（原闯关厅「作文模板」）", "点范文朗读", V.ESSAY_8_TEMPLATES.map(t => `<div style="${D33_CARD} margin-bottom:8px;" ${d33Speak(t.body)}><div style="font-weight:900; color:#86198f;">🔊 ${d33Esc(t.title)}</div><div style="font-size:0.9rem; line-height:1.55; margin-top:4px;">${d33Esc(t.body)}</div></div>`).join(""));
  if (sc === "vocab_formation" && p.tab === "suffixes")
    return d33Box("etym", "🌳 词缀词族树 5 组（原闯关厅「词源树」）", "构词规律口诀版；真实派生以上面「词库里的真派生词」为准", `<div style="${D33_GRID}">${V.ETYMOLOGY_TREES.map(t => `<div style="${D33_CARD} cursor:default;"><div style="font-weight:900;">${d33Esc(t.root)}</div><div style="font-size:0.86rem; color:#475569; margin:3px 0;">${d33Esc(t.desc)}</div><div style="font-size:0.86rem;">${(t.items || []).map(d33Esc).join(" · ")}</div></div>`).join("")}</div>`);
  if (sc === "vocab_formation" && p.tab === "matrices")
    return d33Box("morph", "🧩 不规则变形速查表 70 词（原闯关厅「变形表」）", "复数、过去式等变形；点卡片朗读", `<div style="${D33_GRID}">${V.MORPH_DERIVATIONS.map(r => `<div style="${D33_CARD}" ${d33Speak(r[0])}><div style="font-weight:900;">🔊 ${d33Esc(r[0])} <span style="font-weight:600; color:#64748b; font-size:0.82rem;">${d33Esc(r[1])} · ${d33Esc(r[2])}</span></div><div style="font-size:0.86rem;">${d33Esc(r[3])} ${d33Esc(r[4] || "")} <span style="color:#64748b;">${d33Esc(r[5] || "")}</span></div></div>`).join("")}</div>`);
  return "";
}
function d33Mount() {
  try {
    const root = document.getElementById("appViewRoot"); if (!root) return;
    const h = d33BoxHtml(), old = document.getElementById("d33Box");
    if (old) old.remove();
    if (h) root.insertAdjacentHTML("beforeend", h);
  } catch (e) { console.warn("d33Mount", e); }
}
function d33ExtendVocabGame() {   // 单词闪电战：原 5 题之后接上从 VOCAB_DB 出的题（中文 → 选英文，干扰项取同一子主题），只扩一次
  try {
    const V = window.V6H && V6H.data; if (!V || !V.GAME_BANKS || !V.GAME_BANKS.vocab || V.GAME_BANKS.vocab.__d33) return;
    const pool = VOCAB_DB.filter(w => /^G[1-6]_/.test(w.id) && /^[a-z]+$/.test(w.word) && w.meaning);
    const L = ["A. ", "B. ", "C. ", "D. "];
    for (let k = 0; k < 20; k++) {
      const w = pool[(k * 37) % pool.length];
      const same = pool.filter(x => x.theme_sub === w.theme_sub && x.word !== w.word);
      const ds = [], src = same.length >= 3 ? same : pool.filter(x => x.word !== w.word);
      for (let j = 0; ds.length < 3 && j < src.length; j++) { const x = src[(k * 13 + j * 7) % src.length]; if (!ds.includes(x.word) && x.word !== w.word) ds.push(x.word); }
      const ans = k % 4, opts = ds.slice(); opts.splice(ans, 0, w.word);
      V.GAME_BANKS.vocab.push({ q: `【单词闪电战 · 词库】“${String(w.meaning).split(/[；;，,]/)[0]}”的英文是？`, opts: opts.map((o, i) => L[i] + o), ans, exp: `${w.word} ${w.phonetic || ""} ${w.meaning}` });
    }
    V.GAME_BANKS.vocab.__d33 = true;
  } catch (e) { console.warn("d33ExtendVocabGame", e); }
}
'''
NEW = NEW.replace('__HOMO_NEW__', json.dumps(HOMO_NEW)).replace('__ANT_NEW__', json.dumps(ANT_NEW))
rep('''// ORAL_FUNC_MAP_V1 ----------''', NEW.lstrip('\n') + '''// ORAL_FUNC_MAP_V1 ----------''')
save(s)
print('ok: 方法论教室 / 闯关厅收编')
