"""patch_dedup_c.py —— 重复内容合并第 3 步（用户 2026-10-31 02:22）：代词 / 复数 / be·时态·否定疑问 三组模块去重 + 互链，总地图按知识点归组。
调查见 HANDOFF §5 第 6 项（仓库外草稿 /workspace/work/dedup/C_modules.md）。
- 代词：G07 / G08 / G09 / G10 与「代词全局原理」五处的三块「深度机制」演示板一字不差（同一套画了 5 遍）。主讲留在代词全局原理（三幕全播）；
  G07 只播第 1 幕（主格宾格）、G08 只播第 2 幕（物主代词）、G09 只播第 3 幕（指示代词）、G10 只播第 1 幕（保留它独有的标题 / 例句 / 口诀），不再出分幕按钮。旧文字不删（R1）。
- 其余（复数 3 个、be / 时态 / 否定疑问 11 个、中英对照·代词）没有可合并的相同段落，只在页面顶部加「🔗 同一知识点另见 →」一行（APP_MAP_KP 表驱动）；复数组注明 f/fe→ves 的两种归类。
- 总地图：加语法魔法屋 40 课（gr:Gxx）和代词全局原理等总结页（sum:<tab>）节点，「看过」照常记；推荐路径下面加「🔗 按知识点」一节。
独立块 // DEDUP_C_V1（不进 patch_practice.py 的 PRACTICE_LOOP 块，用包装函数扩展 appMapNodes / renderAppMapView）。幂等，写回走 appwrite.save。"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
s = APP.read_text(encoding='utf-8')
if '// DEDUP_C_V1' in s: sys.exit('已打过补丁')
def rep(old, new, n=1):
    global s
    c = s.count(old); assert c == n, (c, n, old[:80]); s = s.replace(old, new)

JS = r'''// DEDUP_C_V1 ---------- 重复内容合并 3：同一知识点的模块互链 + 总地图按知识点归组（src/patch_dedup_c.py） ----------
const APP_MAP_KP = [
  { kp: "🧑 代词", keys: ["sum:pronouns", "gr:G07", "gr:G08", "gr:G09", "gr:G10", "ze:ze_pronoun"], note: "三块「深度机制」演示板（主宾格 / 物主代词 / this·that）完整三幕在「代词全局原理」，G07–G10 各只播与本课相关的一幕。" },
  { kp: "👣 名词复数", keys: ["gr:G01", "gr:G02", "lab:irregular_plural", "wo:wo_rule_en_plural", "wo:wo_rule_latplural"], note: "f / fe → ves（leaf→leaves）：课本 G01 算规则变化；实验室「不规则复数」把它放在不规则里讲来历。两边说的是同一条。" },
  { kp: "🪞 be 动词 / 否定 / 疑问", keys: ["gr:G16", "gr:G17", "gr:G29", "gr:G30", "gr:G23", "lab:aux_transformer", "ze:ze_be", "ze:ze_yesno"], note: "否定和疑问的变法，4 类「护卫」在实验室「助动词照妖镜」里一套讲透；语法课里的「did 能量吸收器」和照妖镜 ④ 说的是同一件事。" },
  { kp: "🧭 时态", keys: ["lab:tense_matrix", "gr:G18", "gr:G19", "gr:G20", "gr:G21", "gr:G22", "gr:G23", "gr:G24", "gr:G25", "lab:past_clans", "ze:ze_mark"], note: "时 × 体矩阵是总览：G18 / G19 → 第 1 幕，G20 → 第 2 幕，G21–G23 → 第 3 幕，G24 / G25 → 第 4 幕。" },
];
const GRAMMAR_FIXED_ACT = { G07: 0 };   // 代词课只播相关的一幕（另两幕在代词全局原理）；决策 36 ①2 后 G08–G10 三幕都是本课板，照常三幕
const SUM_TAB_TITLE = { pronouns: "📊 代词全局原理", interrogatives: "📊 疑问词总表", how_what: "📊 How 与 What" };
const __appMapNodes0 = appMapNodes;
appMapNodes = function () {
  const out = __appMapNodes0();
  if (typeof GRAMMAR_DB !== "undefined") GRAMMAR_DB.forEach(g => out.push({ area: "🧩 语法魔法屋 · " + g.cat, key: "gr:" + g.id, title: g.id + " " + String(g.title).replace(/\s*[（(].*$/, ""), go: `navigateTo('grammar_detail', { gId: '${g.id}' })` }));
  Object.keys(SUM_TAB_TITLE).forEach(t => out.push({ area: "📊 语法总结", key: "sum:" + t, title: SUM_TAB_TITLE[t], go: `navigateTo('grammar_summary_hub', { summaryTab: '${t}' })` }));
  return out;
};
function kpChipHtml(n, cur) {
  return `<button data-kp-node="${n.key}" onclick="${n.go}" style="border-radius:999px; padding:4px 10px; font-weight:800; font-size:0.8rem; cursor:pointer; border:2px solid ${cur ? "#4f46e5" : "#c7d2fe"}; background:${cur ? "#4f46e5" : "#fff"}; color:${cur ? "#fff" : "#3730a3"};">${cur ? "📍 " : ""}${n.title}</button>`;
}
function kpSeeAlsoHtml(key) {
  const gs = APP_MAP_KP.filter(g => g.keys.includes(key)); if (!gs.length) return "";
  const nodes = appMapNodes(), byKey = k => nodes.find(n => n.key === k);
  return `<div id="kpSeeBar" data-kp-key="${key}" style="background:#eef2ff; border:2px solid #c7d2fe; border-radius:14px; padding:8px 12px; margin-bottom:12px;">${gs.map(g => `<div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:2px 0;"><span style="font-weight:900; color:#3730a3; font-size:0.85rem;">🔗 ${g.kp} · 另见 →</span>${g.keys.map(byKey).filter(Boolean).map(n => kpChipHtml(n, n.key === key)).join("")}</div><div style="font-size:0.78rem; color:#475569; margin:2px 0 4px;">${g.note}</div>`).join("")}</div>`;
}
function kpMount() {
  try {
    const sc = currentView.screen, params = Object.assign({}, currentView.params || {});
    if (sc === "super_lab_hub" && typeof superLabState !== "undefined") params.labTab = superLabState.labTab;
    if (sc === "word_origins_hub" && typeof woState !== "undefined") params.scene = woState.scene;
    if (sc === "zh_en_hub" && typeof zeState !== "undefined") params.scene = zeState.scene;
    if (sc === "grammar_summary_hub" && typeof grammarSummaryState !== "undefined" && !params.summaryTab) params.summaryTab = grammarSummaryState.summaryTab;
    const key = visitKeyOfView(sc, params), root = document.getElementById("appViewRoot");
    const old = document.getElementById("kpSeeBar"); if (old && old.getAttribute("data-kp-key") !== key) old.remove();
    if (!key || !root || document.getElementById("kpSeeBar")) return;
    const h = kpSeeAlsoHtml(key); if (h) root.insertAdjacentHTML("afterbegin", h);
  } catch (e) { console.warn("kpMount", e); }
}
const __renderAppMapView0 = renderAppMapView;
renderAppMapView = function () {
  __renderAppMapView0();
  const root = document.getElementById("appViewRoot"), h3 = [...root.querySelectorAll("h3")].find(x => x.textContent.includes("推荐路径")); if (!h3) return;
  const nodes = appMapNodes(), byKey = k => nodes.find(n => n.key === k);
  const st = k => appMapState(k) === "gold" ? "🏅 " : appMapState(k) === "seen" ? "✓ " : "○ ";
  h3.nextElementSibling.insertAdjacentHTML("afterend", `<h3 style="margin:0 0 8px; font-size:1.1rem; font-weight:900; color:#0f172a;">🔗 按知识点</h3><div data-map-kp style="display:grid; gap:10px; margin-bottom:18px;">${APP_MAP_KP.map(g => `<div style="background:#fff; border:2px solid #c7d2fe; border-radius:14px; padding:10px 12px;"><div style="font-weight:900; color:#3730a3; margin-bottom:6px;">${g.kp}</div><div style="display:flex; flex-wrap:wrap; gap:6px;">${g.keys.map(byKey).filter(Boolean).map(n => `<button data-map-kp-node="${n.key}" onclick="${n.go}" style="text-align:left; border-radius:12px; padding:6px 10px; cursor:pointer; font-weight:800; font-size:0.84rem; border:2px solid #e2e8f0; background:#f8fafc; color:#0f172a;">${st(n.key)}${n.title}</button>`).join("")}</div></div>`).join("")}</div>`);
};
'''
rep('// ORAL_FUNC_MAP_V1 ----------', JS + '// ORAL_FUNC_MAP_V1 ----------')
rep('''  if (screen === "first_principles_hub" && params.lawIdx != null) return "fp:" + params.lawIdx;   // PRACTICE_LOOP: 总地图记「看过」\n''',
    '''  if (screen === "first_principles_hub" && params.lawIdx != null) return "fp:" + params.lawIdx;   // PRACTICE_LOOP: 总地图记「看过」
  if (screen === "grammar_detail" && params.gId) return "gr:" + params.gId;   // DEDUP_C_V1
  if (screen === "grammar_summary_hub" && params.summaryTab) return "sum:" + params.summaryTab;   // DEDUP_C_V1\n''')
rep('''  if (typeof mqMount === "function") mqMount();   // PRACTICE_LOOP: 白板下方挂小测\n''',
    '''  if (typeof mqMount === "function") mqMount();   // PRACTICE_LOOP: 白板下方挂小测
  if (typeof kpMount === "function") kpMount();   // DEDUP_C_V1: 同一知识点另见\n''')
rep('''  if (wb5HDSwap("grammarWhyCanvas", "hd_" + g.id.toLowerCase(), g.id === "G14" ? prepDemoIdx : undefined)) return;   // WB5_HD:grammar''',
    '''  if (wb5HDSwap("grammarWhyCanvas", "hd_" + g.id.toLowerCase(), g.id === "G14" ? prepDemoIdx : (typeof GRAMMAR_FIXED_ACT !== "undefined" ? GRAMMAR_FIXED_ACT[g.id] : undefined))) return;   // WB5_HD:grammar  DEDUP_C_V1''')
save(s); print('ok')
