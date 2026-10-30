"""patch_grammar_examples.py —— 决策 34-B：语法课页面底部加「📚 例句库」——该语法点从全部单词 / 日常用语 / 各模块里筛出的全部例句（数据 lab/GRAMMAR_EXAMPLES.json，由 build_grammar_examples.py 生成）。
按句型（肯定 / 否定 / 疑问 / 祈使 / 感叹）筛选、按人称分组，每句点了朗读（speakText）。
嵌入 <script type="application/json" id="GRAMMAR_EX_JSON">{Gxx: [[英文, 句型, 人称], …]}（重跑整块替换）；函数块 // GRAMMAR_EX_V1 整块替换；挂在 noteLastView 后（与「另见」条同一处）。写回走 appwrite.save。"""
import sys, pathlib, json
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
ROOT = pathlib.Path(__file__).resolve().parents[3]
D = json.loads((ROOT / 'docs/whiteboard/lab/GRAMMAR_EXAMPLES.json').read_text(encoding='utf-8'))
data = {g: [[x[0], x[1], x[2]] for x in v] for g, v in D.items()}
s = APP.read_text(encoding='utf-8')
js = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
tag = '<script type="application/json" id="GRAMMAR_EX_JSON">'
if tag in s:
    i = s.index(tag); j = s.index('</script>', i); s = s[:i] + tag + js + s[j:]
else:
    a = '<script type="text/plain" id="wb5html-'; i = s.index(a); s = s[:i] + tag + js + '</script>\n' + s[i:]
FUNCS = r'''// GRAMMAR_EX_V1 ---------- 决策 34-B：语法课例句库（src/patch_grammar_examples.py，勿手改） ----------
var grexState = { gId: "", type: "全部" };
function grexHtml(gId) {
  const all = ((typeof etymData === "function") ? etymData("GRAMMAR_EX_JSON") : {})[gId] || []; if (!all.length) return "";
  if (grexState.gId !== gId) grexState = { gId, type: "全部" };
  const TYPES = ["全部", "肯定", "否定", "疑问", "祈使", "感叹"], cnt = t => t === "全部" ? all.length : all.filter(x => x[1] === t).length;
  const list = grexState.type === "全部" ? all : all.filter(x => x[1] === grexState.type);
  const persons = [...new Set(list.map(x => x[2]))].sort((a, b) => list.filter(x => x[2] === b).length - list.filter(x => x[2] === a).length);
  const sent = x => `<div data-grex-s onclick="speakText(${attrEscape(JSON.stringify(x[0]))}, 'en')" style="cursor:pointer; padding:5px 10px; border-radius:8px; background:#fff; border:1px solid #e2e8f0; margin:3px 0; font-size:0.92rem;">🔊 ${etymEsc(x[0])} <span style="color:#94a3b8; font-size:0.74rem;">${x[1]}</span></div>`;
  return `<div id="grexBox" data-grex="${gId}" style="margin-top:18px; background:#f8fafc; border:2px solid #a5b4fc; border-radius:18px; padding:14px 16px;">
    <h3 style="margin:0 0 4px; color:#3730a3;">📚 例句库 · ${all.length} 句</h3>
    <div style="font-size:0.82rem; color:#64748b; margin-bottom:8px;">从全部单词的例句、日常用语和各模块课文里找出来的本课句子，实词都是词库里的词。点句子听朗读。</div>
    <div class="pill-tabs" style="margin-bottom:8px;">${TYPES.filter(t => cnt(t)).map(t => `<button class="pill-tab ${grexState.type === t ? "active" : ""}" data-grex-type="${t}" onclick="grexState.type='${t}'; grexMount(true);">${t}（${cnt(t)}）</button>`).join("")}</div>
    ${persons.map((p, i) => { const xs = list.filter(x => x[2] === p); return `<details data-grex-p="${attrEscape(p)}" ${i === 0 ? "open" : ""} style="margin:6px 0;"><summary style="cursor:pointer; font-weight:800; color:#1e293b;">主语：${etymEsc(p)}（${xs.length} 句）</summary>${xs.map(sent).join("")}</details>`; }).join("")}
  </div>`;
}
function grexMount(force) {
  try {
    if (currentView.screen !== "grammar_detail") return;
    const gId = (currentView.params || {}).gId, root = document.getElementById("appViewRoot"); if (!gId || !root) return;
    const old = document.getElementById("grexBox");
    if (old && (force || old.getAttribute("data-grex") !== gId)) old.remove(); else if (old) return;
    const h = grexHtml(gId); if (h) root.insertAdjacentHTML("beforeend", h);
  } catch (e) { console.warn("grexMount", e); }
}
'''
MARK = '// GRAMMAR_EX_V1 ----------'
if MARK in s:
    i = s.rindex('\n', 0, s.index(MARK)) + 1; j = s.index('// ORAL_FUNC_MAP_V1 ----------', i); s = s[:i] + FUNCS + s[j:]
else:
    s = s.replace('// ORAL_FUNC_MAP_V1 ----------', FUNCS + '// ORAL_FUNC_MAP_V1 ----------', 1)
HOOK_OLD = '  if (typeof kpMount === "function") kpMount();   // DEDUP_C_V1: 同一知识点另见\n'
HOOK_NEW = HOOK_OLD + '  if (typeof grexMount === "function") grexMount();   // GRAMMAR_EX_V1: 语法课例句库\n'
if HOOK_NEW not in s:
    assert s.count(HOOK_OLD) == 1; s = s.replace(HOOK_OLD, HOOK_NEW)
save(s); print('ok', sum(len(v) for v in data.values()), 'sentences', len(js), 'bytes')
