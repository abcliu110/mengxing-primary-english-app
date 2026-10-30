"""patch_my_study.py —— 决策 33 第 ① 步：档案与自测合一（用户 2026-10-31 02:32 确认）。
- 三套档案页 vocab_my / grammar_my / oral_my → 一个「📒 我的学习」screen `my_study`（参数 kind=vocab|grammar|oral + filter=mistake|learning|mastered）。
  三个旧渲染函数保留为各自的列表体（只改它们的面包屑和自我重绘调用），`renderMyStudyView` 在上面加「单词 / 语法 / 口语」筛选。
- 三大厅「综合自测」按钮 → 一个「🎯 综合自测」screen `self_test`（参数 kind），每种类型的开测调用与原按钮完全一样，另加「只测错题本」。
- 旧 screen 名留重定向（renderCurrentView 分支改成 my_study）；localStorage 学习记录键、getItemStatus / 消错规则一律不动。
- 首页「▶ 继续上次」一行加两个按钮（📒 我的学习、🎯 综合自测），首页整体改版是第 ② 步。
幂等：已打过补丁就退出。写回走 appwrite.save（anchorcheck + jscheck）。"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
if 'function renderMyStudyView()' in s:
    sys.exit('已打过补丁')

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, (c, n, old[:80])
    s = s.replace(old, new)

# 1. 路由：新 screen + 旧名重定向
rep('''  else if (s === "vocab_my") renderVocabMyView();\n''',
    '''  else if (s === "vocab_my" || s === "grammar_my" || s === "oral_my") { currentView = { screen: "my_study", params: Object.assign({ kind: s.split("_")[0] }, currentView.params), scrollY: 0 }; renderMyStudyView(); return; }   // MY_STUDY_V1: 旧档案页重定向
  else if (s === "my_study") renderMyStudyView();
  else if (s === "self_test") renderSelfTestView();\n''')
rep('''  else if (s === "grammar_my") renderGrammarMyView();\n''', '')
rep('''  else if (s === "oral_my") renderOralMyView();\n''', '')
# 重定向分支 return 了，要先记 lastView：把 return 前补 noteLastView
rep('''renderMyStudyView(); return; }   // MY_STUDY_V1''', '''renderMyStudyView(); noteLastView(); return; }   // MY_STUDY_V1''')

# 2. 三大厅档案卡 → my_study
for k in ('vocab', 'grammar', 'oral'):
    for f in ('mistake', 'learning', 'mastered'):
        rep(f"navigateTo('{k}_my', {{ filter: '{f}' }})", f"navigateTo('my_study', {{ kind: '{k}', filter: '{f}' }})")

# 3. 旧列表函数：面包屑交给外壳、自我重绘改成外壳
rep('''  renderSubNavbar(["首页", "📘 单词大世界", "📖 我的单词学习档案"]);\n''', '')
rep('''  renderSubNavbar(["首页", "🧩 语法魔法屋", "📖 我的语法档案"]);\n''', '')
rep('''  renderSubNavbar(["首页", "💬 日常用语小剧场", "📖 我的日常用语档案"]);\n''', '')
for fn in ('renderVocabMyView', 'renderGrammarMyView', 'renderOralMyView'):
    for f in ('mistake', 'learning', 'mastered'):
        rep(f"onclick=\"currentView.params.filter='{f}'; {fn}();\"", f"onclick=\"currentView.params.filter='{f}'; renderMyStudyView();\"")

# 4. 三大厅综合自测按钮 → self_test
rep('''onclick="startQuizSession('vocab', VOCAB_DB.slice(0,30).map(w=>w.id), '高频核心词综合自测')">🎯 单词综合自测</button>''',
    '''onclick="navigateTo('self_test', { kind: 'vocab' })">🎯 单词综合自测</button>''')
rep('''onclick="startQuizSession('grammar', GRAMMAR_DB.map(g=>g.id), '核心语法综合闯关')">🎯 语法综合闯关 (40点)</button>''',
    '''onclick="navigateTo('self_test', { kind: 'grammar' })">🎯 语法综合闯关 (40点)</button>''')
rep('''onclick="startQuizSession('oral', DAILY_EXPRESSIONS_DB.slice(0,30).map(e=>e.id), '日常用语综合情景自测')">🎯 日常用语综合自测</button>''',
    '''onclick="navigateTo('self_test', { kind: 'oral' })">🎯 日常用语综合自测</button>''')

# 5. 首页「继续上次」一行加入口
rep('''<button type="button" data-home-map onclick="navigateTo('app_map')"''',
    '''<button type="button" data-home-my onclick="navigateTo('my_study')" style="background:#be123c; color:#fff; border:0; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer; white-space:nowrap;">📒 我的学习</button><button type="button" data-home-test onclick="navigateTo('self_test')" style="background:#047857; color:#fff; border:0; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer; white-space:nowrap;">🎯 综合自测</button><button type="button" data-home-map onclick="navigateTo('app_map')"''')

# 6. 新页面
NEW = r'''
// MY_STUDY_V1 ---------- 决策 33 ①：我的学习（错题本 / 学习中 / 已掌握，按单词 / 语法 / 口语筛选）+ 综合自测（src/patch_my_study.py） ----------
const MY_KINDS = [["vocab", "📘 单词"], ["grammar", "🧩 语法"], ["oral", "💬 口语"]];
function myKindTabs(screen, kind) {
  return `<div class="pill-tabs" data-my-kinds style="margin-bottom:8px;">${MY_KINDS.map(([k, t]) => { const c = countDomainStatus(k); return `<button class="pill-tab ${kind === k ? "active" : ""}" data-my-kind="${k}" onclick="currentView.params.kind='${k}'; ${screen}();">${t}（错 ${c.mistake} · 学 ${c.learning} · 会 ${c.mastered}）</button>`; }).join("")}</div>`;
}
function renderMyStudyView() {
  const p = currentView.params;
  if (!["vocab", "grammar", "oral"].includes(p.kind)) p.kind = "vocab";
  if (!["mistake", "learning", "mastered"].includes(p.filter)) p.filter = "mistake";
  ({ vocab: renderVocabMyView, grammar: renderGrammarMyView, oral: renderOralMyView })[p.kind]();
  renderSubNavbar(["首页", "📒 我的学习"], `<button class="nav-btn quiz-launch" onclick="navigateTo('self_test', { kind: '${p.kind}' })">🎯 综合自测</button>`);
  const root = document.getElementById("appViewRoot");
  root.insertAdjacentHTML("afterbegin", `<div data-my-study style="background:linear-gradient(135deg,#fff1f2,#ffe4e6); border:2px solid #fda4af; border-radius:18px; padding:12px 16px; margin-bottom:12px;"><div style="font-weight:900; font-size:1.2rem; color:#9f1239; margin-bottom:8px;">📒 我的学习 · 单词、语法、口语一处看</div>${myKindTabs("renderMyStudyView", p.kind)}</div>`);
}
const SELF_TESTS = {
  vocab: { title: "高频核心词综合自测", desc: "从高频核心词里抽 30 个，混合英译中 / 中译英 / 听音选词等题型。", ids: () => VOCAB_DB.slice(0, 30).map(w => w.id) },
  grammar: { title: "核心语法综合闯关", desc: "40 个语法点全部上场。", ids: () => GRAMMAR_DB.map(g => g.id) },
  oral: { title: "日常用语综合情景自测", desc: "从 16 个场景里抽 30 句，情景选句 + 听音。", ids: () => DAILY_EXPRESSIONS_DB.slice(0, 30).map(e => e.id) },
};
const SELF_TEST_POOL = { vocab: () => VOCAB_DB, grammar: () => GRAMMAR_DB, oral: () => DAILY_EXPRESSIONS_DB };
function startSelfTest(kind, onlyMistakes) {
  const t = SELF_TESTS[kind];
  if (!onlyMistakes) return startQuizSession(kind, t.ids(), t.title);
  const ids = SELF_TEST_POOL[kind]().filter(x => getItemStatus(kind, x.id) === "mistake").map(x => x.id);
  if (ids.length) startQuizSession(kind, ids, "错题本消错 · " + t.title.replace(/综合.*$/, ""));
}
function renderSelfTestView() {
  const p = currentView.params;
  if (!SELF_TESTS[p.kind]) p.kind = "vocab";
  const t = SELF_TESTS[p.kind], c = countDomainStatus(p.kind);
  renderSubNavbar(["首页", "🎯 综合自测"], `<button class="nav-btn" onclick="navigateTo('my_study', { kind: '${p.kind}' })">📒 我的学习</button>`);
  document.getElementById("appViewRoot").innerHTML = `
    <div data-self-test style="background:linear-gradient(135deg,#ecfdf5,#d1fae5); border:2px solid #6ee7b7; border-radius:18px; padding:12px 16px; margin-bottom:14px;">
      <div style="font-weight:900; font-size:1.2rem; color:#065f46; margin-bottom:8px;">🎯 综合自测 · 选一种类型开测</div>
      ${myKindTabs("renderSelfTestView", p.kind)}
    </div>
    <div style="background:#fff; border:2px solid #cbd5e1; border-radius:18px; padding:16px 20px;">
      <div style="font-weight:900; font-size:1.1rem; color:#0f172a;">${t.title}</div>
      <div style="font-size:0.9rem; color:#475569; margin:6px 0 12px;">${t.desc} 答题结果照常记进「我的学习」：错题需跨 2 个学习日连对 3 次才消错。</div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button data-self-start onclick="startSelfTest('${p.kind}', false)" style="background:#059669; color:#fff; border:0; padding:10px 18px; border-radius:12px; font-weight:800; cursor:pointer;">🎯 开始${t.title}</button>
        ${c.mistake ? `<button data-self-mistake onclick="startSelfTest('${p.kind}', true)" style="background:#dc2626; color:#fff; border:0; padding:10px 18px; border-radius:12px; font-weight:800; cursor:pointer;">📕 只测错题本（${c.mistake}）</button>` : ""}
      </div>
    </div>`;
}
'''
rep('''// ORAL_FUNC_MAP_V1 ----------''', NEW.lstrip('\n') + '''// ORAL_FUNC_MAP_V1 ----------''')
save(s)
print('ok: my_study + self_test')
