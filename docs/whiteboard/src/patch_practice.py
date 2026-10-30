"""patch_practice.py —— 决策 14：练习闭环 + 全 App 总地图（幂等；改 JS 后重跑会整块替换）。
- 每个模块（实验室页签 / 单词身世幕 / 中英对照幕）白板下方挂「🎯 小测」：3–5 题，认出（听音选拼写）→ 选择（选中文义）→ 拼写；
  题目和选项全部来自 VOCAB_DB（词表 = MODULE_QUIZ_JSON，src/gen_module_quiz.py 从该模块白板里取讲过的课标词）。
- 答题走现有 recordQuizResult('vocab', id, ok)：答错进现有错题本，消错规则不变（跨 2 个学习日、连续答对 3 次）。
- 答对 ≥ 60% = 本模块点亮，记 appState.moduleQuiz[key]（随 saveAppState 存 localStorage）；不接任何第三方统计。
- 新页面 app_map「🗺️ 总地图」：四大区全部模块，○ 没看过 / ✓ 看过 / 🏅 小测过关；三条推荐路径（发音线 / 语法线 / 词汇词源线）；
  小测面板里显示「上一站 → 本站 → 下一站」。首页「继续上次」条加入口按钮。第一性原理按 fp:<序号> 记「看过」（它自带原有习题，不另加小测）。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = '// PRACTICE_LOOP_V1'
FUNCS = r'''// PRACTICE_LOOP_V1 ---------- 决策 14：模块小测 + 总地图（src/patch_practice.py 生成，勿手改） ----------
var mqState = null;
const APP_MAP_PATHS = [
  { name: "👄 发音线", keys: ["lab:pron_map", "lab:intonation_map", "wo:wo_vowel_a", "wo:wo_vowel_c"] },
  { name: "🧩 语法线", keys: ["ze:ze_same", "ze:ze_be", "lab:five_patterns", "lab:tense_matrix", "lab:aux_transformer", "lab:bamboo_tree"] },
  { name: "📖 词汇词源线", keys: ["wo:wo_port", "wo:wo_grimm", "lab:eight_endings", "lab:irregular_plural", "lab:phrasal_key"] },
];
function mqWords(key) { const d = (typeof etymData === "function") ? etymData("MODULE_QUIZ_JSON") : JSON.parse((document.getElementById("MODULE_QUIZ_JSON") || {}).textContent || "{}"); return (d[key] || []).map(id => VOCAB_DB.find(w => w.id === id)).filter(Boolean); }
function mqRand(seed) { let h = 2166136261; for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; }; }
function mqShuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function mqMeaning(w) { return String(w.meaning || "").split(/[，,；;]/)[0]; }
function mqBuild(key) {
  const ws = mqWords(key); if (ws.length < 3) return null;
  const r = mqRand(key + ":" + getTodayDateStr()), n = Math.min(5, ws.length), pick = mqShuffle(ws, r).slice(0, n);
  const kinds = ["hear", "pick", "spell", "pick", "spell"].slice(0, n);
  const pool = ws.concat(mqShuffle(VOCAB_DB.filter(w => !w.is_function_word && !/[ \/]/.test(w.word.trim())), r).slice(0, 40));
  return pick.map((w, i) => {
    const others = mqShuffle(pool.filter(x => x.id !== w.id && x.word.trim().toLowerCase() !== w.word.trim().toLowerCase() && mqMeaning(x) !== mqMeaning(w)), r).slice(0, 3);
    return { kind: kinds[i], w, opts: mqShuffle([w].concat(others), r) };
  });
}
function mqPathNav(key) {
  const p = APP_MAP_PATHS.find(p => p.keys.includes(key)); if (!p) return "";
  const i = p.keys.indexOf(key), lab = k => appMapNodes().find(n => n.key === k);
  const btn = (k, t) => { const n = lab(k); return n ? `<button onclick="${n.go}" style="background:#eef2ff; color:#3730a3; border:0; border-radius:10px; padding:5px 10px; font-weight:800; cursor:pointer;">${t} ${n.title}</button>` : ""; };
  return `<div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; font-size:0.82rem; margin-top:8px;"><b style="color:#475569;">${p.name}</b>${i > 0 ? btn(p.keys[i - 1], "⬅ 上一站") : ""}<span style="color:#64748b;">第 ${i + 1} / ${p.keys.length} 站</span>${i < p.keys.length - 1 ? btn(p.keys[i + 1], "下一站 ➡") : ""}<button onclick="navigateTo('app_map')" style="background:#fef3c7; color:#92400e; border:0; border-radius:10px; padding:5px 10px; font-weight:800; cursor:pointer;">🗺️ 总地图</button></div>`;
}
function mqPanelHtml(key) {
  const done = appState.moduleQuiz && appState.moduleQuiz[key];
  let body;
  if (!mqState || mqState.key !== key) {
    body = `<div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center;"><span style="color:#334155; font-size:0.9rem;">看完白板，做 3–5 道小题（听音认词 → 选意思 → 拼写）。答错的词会进📕错题本。</span>
      <button data-mq-start onclick="mqStart('${key}')" style="background:#16a34a; color:#fff; border:0; border-radius:12px; padding:8px 16px; font-weight:900; cursor:pointer;">${done ? "🔁 再测一次" : "▶ 开始小测"}</button></div>`;
  } else if (mqState.i >= mqState.qs.length) {
    const n = mqState.qs.length, ok = mqState.score >= Math.ceil(n * 0.6);
    body = `<div data-mq-result="${mqState.score}/${n}" style="font-weight:900; font-size:1rem; color:${ok ? "#15803d" : "#b45309"};">${ok ? "🏅" : "💪"} 答对 ${mqState.score} / ${n}　${ok ? "本模块已在总地图上点亮！" : "再看一遍白板，再试一次就能点亮。"}</div>
      <div style="margin-top:8px; display:flex; gap:8px;"><button onclick="mqStart('${key}')" style="background:#16a34a; color:#fff; border:0; border-radius:10px; padding:6px 14px; font-weight:800; cursor:pointer;">🔁 再测一次</button><button onclick="navigateTo('app_map')" style="background:#fef3c7; color:#92400e; border:0; border-radius:10px; padding:6px 14px; font-weight:800; cursor:pointer;">🗺️ 看总地图</button></div>`;
  } else {
    const q = mqState.qs[mqState.i], fb = mqState.fb, w = q.w, word = w.word.trim();
    const head = { hear: "① 认出：听一听，是哪个词？", pick: "② 选择：这个词是什么意思？", spell: "③ 拼写：把这个词拼出来" }[q.kind];
    let ask = "";
    if (q.kind === "hear") ask = `<button data-mq-say onclick="speakText(${attrEscape(JSON.stringify(word))}, 'en')" style="background:#2563eb; color:#fff; border:0; border-radius:10px; padding:8px 14px; font-weight:900; cursor:pointer;">🔊 再听一遍</button>
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:8px; margin-top:8px;">${q.opts.map(o => `<button data-mq-opt="${attrEscape(o.word.trim())}" ${fb ? "disabled" : ""} onclick="mqAnswer(${attrEscape(JSON.stringify(o.word.trim()))})" style="background:#fff; border:2px solid #cbd5e1; border-radius:10px; padding:10px; font-weight:900; font-size:1rem; cursor:pointer;">${o.word.trim()}</button>`).join("")}</div>`;
    if (q.kind === "pick") ask = `<div style="font-size:1.5rem; font-weight:900; color:#0f172a;">${w.emoji || ""} ${word}</div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:8px; margin-top:8px;">${q.opts.map(o => `<button data-mq-opt="${attrEscape(o.word.trim())}" ${fb ? "disabled" : ""} onclick="mqAnswer(${attrEscape(JSON.stringify(o.word.trim()))})" style="background:#fff; border:2px solid #cbd5e1; border-radius:10px; padding:10px; font-weight:800; cursor:pointer;">${mqMeaning(o)}</button>`).join("")}</div>`;
    if (q.kind === "spell") ask = `<div style="font-size:1.1rem; font-weight:900; color:#0f172a;">${w.emoji || ""} ${w.meaning}　<span style="color:#64748b; font-size:0.85rem;">${w.phonetic || ""}</span></div>
      <div style="display:flex; gap:8px; margin-top:8px;"><input data-mq-input id="mqInput" autocomplete="off" autocapitalize="off" spellcheck="false" ${fb ? "disabled" : ""} onkeydown="if(event.key==='Enter') mqAnswer(this.value)" style="flex:1; min-width:0; font-size:1.1rem; padding:8px 10px; border:2px solid #cbd5e1; border-radius:10px;" placeholder="在这里输入英文">
      <button ${fb ? "disabled" : ""} onclick="mqAnswer(document.getElementById('mqInput').value)" style="background:#16a34a; color:#fff; border:0; border-radius:10px; padding:8px 14px; font-weight:900; cursor:pointer;">确定</button></div>`;
    body = `<div style="font-size:0.82rem; color:#64748b; font-weight:800;">第 ${mqState.i + 1} / ${mqState.qs.length} 题　答对 ${mqState.score}</div><div style="font-weight:900; color:#1e293b; margin:4px 0 8px;">${head}</div>${ask}
      ${fb ? `<div data-mq-fb="${fb.ok ? "ok" : "bad"}" style="margin-top:8px; font-weight:900; color:${fb.ok ? "#15803d" : "#b91c1c"};">${fb.ok ? "✅ 对了！" : `❌ 正确答案：${word}（${w.meaning}）— 已记入📕错题本`}</div>
      <button data-mq-next onclick="mqNext()" style="margin-top:8px; background:#0f172a; color:#fff; border:0; border-radius:10px; padding:6px 14px; font-weight:800; cursor:pointer;">${mqState.i + 1 < mqState.qs.length ? "下一题 ➡" : "看成绩"}</button>` : ""}`;
  }
  return `<div id="mqPanel" data-mq-key="${key}" style="background:#f0fdf4; border:2px solid #86efac; border-radius:18px; padding:14px 16px; margin:14px 0;">
    <div style="font-weight:900; color:#166534; font-size:1rem; margin-bottom:8px;">🎯 小测 ${done ? `<span style="background:#fef3c7; color:#92400e; border-radius:999px; padding:2px 8px; font-size:0.75rem;">🏅 已点亮 ${done.s}/${done.n}</span>` : ""}</div>${body}${mqPathNav(key)}</div>`;
}
function mqRender() { const el = document.getElementById("mqPanel"); if (el && mqState) el.outerHTML = mqPanelHtml(mqState.key); }
function mqStart(key) { const qs = mqBuild(key); if (!qs) return; mqState = { key, qs, i: 0, score: 0, fb: null }; mqRender(); const q = qs[0]; if (q.kind === "hear") speakText(q.w.word.trim(), "en"); }
function mqAnswer(v) {
  if (!mqState || mqState.fb) return; const q = mqState.qs[mqState.i];
  const ok = String(v || "").trim().toLowerCase() === q.w.word.trim().toLowerCase();
  recordQuizResult("vocab", q.w.id, ok); if (ok) mqState.score++;
  mqState.fb = { ok }; if (typeof playEffectTone === "function") playEffectTone(ok ? "chime" : "wrong"); mqRender();
}
function mqNext() {
  if (!mqState) return; mqState.i++; mqState.fb = null;
  if (mqState.i >= mqState.qs.length) {
    const n = mqState.qs.length;
    if (mqState.score >= Math.ceil(n * 0.6)) { if (!appState.moduleQuiz || typeof appState.moduleQuiz !== "object") appState.moduleQuiz = {}; appState.moduleQuiz[mqState.key] = { d: getTodayDateStr(), s: mqState.score, n }; saveAppState(); }
  }
  mqRender(); const q = mqState.qs[mqState.i]; if (q && q.kind === "hear") speakText(q.w.word.trim(), "en");
}
function mqMount() {
  try {
    const sc = currentView.screen, params = Object.assign({}, currentView.params || {});
    if (sc === "super_lab_hub" && typeof superLabState !== "undefined") params.labTab = superLabState.labTab;
    if (sc === "word_origins_hub" && typeof woState !== "undefined") params.scene = woState.scene;
    if (sc === "zh_en_hub" && typeof zeState !== "undefined") params.scene = zeState.scene;
    const key = visitKeyOfView(sc, params);
    const old = document.getElementById("mqPanel"); if (old && old.getAttribute("data-mq-key") !== key) old.remove();
    if (!key || document.getElementById("mqPanel") || mqWords(key).length < 3) return;
    if (mqState && mqState.key !== key) mqState = null;
    const root = document.getElementById("appViewRoot"); if (!root) return;
    const fr = root.querySelector("#wb5Frame, iframe"); let host = fr ? fr.parentElement : null;
    while (host && host.parentElement && host.parentElement !== root) host = host.parentElement;
    if (host && host.parentElement === root) host.insertAdjacentHTML("afterend", mqPanelHtml(key)); else root.insertAdjacentHTML("beforeend", mqPanelHtml(key));
  } catch (e) { console.warn("mqMount", e); }
}
function appMapNodes() {
  const out = [];
  if (typeof LAB_GROUPS !== "undefined") LAB_GROUPS.forEach(g => g.tabs.forEach(([id, t]) => out.push({ area: "🧪 王炸实验室 · " + g.name, key: "lab:" + id, title: t, go: `navigateTo('super_lab_hub', { labTab: '${id}' })` })));
  if (typeof WO_CHAPTERS !== "undefined") WO_CHAPTERS.forEach(ch => (ch.scenes || []).forEach(s => { if (typeof woSceneReady !== "function" || woSceneReady(s.id)) out.push({ area: "📖 单词身世 · " + ch.icon + " " + ch.title, key: "wo:" + s.id, title: s.title, go: `navigateTo('word_origins_hub', { scene: '${s.id}' })` }); }));
  if (typeof ZE_CHAPTERS !== "undefined") ZE_CHAPTERS.forEach(ch => (ch.scenes || []).forEach(s => out.push({ area: "🔀 中英对照 · " + ch.icon + " " + ch.title, key: "ze:" + s.id, title: s.title, go: `navigateTo('zh_en_hub', { scene: '${s.id}' })` })));
  if (typeof FIRST_PRINCIPLES_DB !== "undefined") FIRST_PRINCIPLES_DB.forEach((l, i) => out.push({ area: "🧠 第一性原理", key: "fp:" + i, title: l.shortTitle || l.num, go: `navigateTo('first_principles_hub', { lawIdx: ${i}, actIdx: 0 })` }));
  return out;
}
function appMapState(key) { return appState.moduleQuiz && appState.moduleQuiz[key] ? "gold" : isVisitedKey(key) ? "seen" : "new"; }
function renderAppMapView() {
  renderSubNavbar(["首页", "🗺️ 总地图"], "");
  const nodes = appMapNodes(), areas = [...new Set(nodes.map(n => n.area))];
  const gold = nodes.filter(n => appMapState(n.key) === "gold").length, seen = nodes.filter(n => appMapState(n.key) !== "new").length;
  const chip = n => { const st = appMapState(n.key), quiz = mqWords(n.key).length >= 3; return `<button data-map-node="${n.key}" data-map-state="${st}" onclick="${n.go}" title="${st === "gold" ? "小测过关" : st === "seen" ? "看过了" : "还没看"}" style="text-align:left; border-radius:12px; padding:7px 10px; cursor:pointer; font-weight:800; font-size:0.84rem; border:2px solid ${st === "gold" ? "#f59e0b" : st === "seen" ? "#86efac" : "#e2e8f0"}; background:${st === "gold" ? "#fef3c7" : st === "seen" ? "#f0fdf4" : "#fff"}; color:#0f172a;">${st === "gold" ? "🏅" : st === "seen" ? "✓" : "○"} ${n.title}${quiz && st !== "gold" ? ` <span style="color:#94a3b8; font-size:0.72rem;">🎯</span>` : ""}</button>`; };
  const byKey = k => nodes.find(n => n.key === k);
  document.getElementById("appViewRoot").innerHTML = `
    <div style="background:linear-gradient(135deg,#0f172a,#1e3a8a); color:#fff; border-radius:22px; padding:18px 22px; margin-bottom:16px;">
      <h2 style="margin:0 0 6px; font-size:1.4rem; font-weight:900;">🗺️ 全 App 总地图</h2>
      <div style="font-size:0.92rem; color:#dbeafe;">○ 还没看　✓ 看过了　🏅 小测过关（答对 60% 以上）　🎯 = 有小测。进度只存在这台设备上，不上传。</div>
      <div data-map-count style="margin-top:8px; font-weight:900; color:#fde68a;">已看过 ${seen} / ${nodes.length}　·　已点亮 🏅 ${gold}</div>
    </div>
    <h3 style="margin:0 0 8px; font-size:1.1rem; font-weight:900; color:#0f172a;">🧭 推荐路径</h3>
    <div style="display:grid; gap:10px; margin-bottom:18px;">${APP_MAP_PATHS.map(p => `<div style="background:#fff; border:2px solid #c7d2fe; border-radius:14px; padding:10px 12px;"><div style="font-weight:900; color:#3730a3; margin-bottom:6px;">${p.name}</div><div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center;">${p.keys.map(byKey).filter(Boolean).map(chip).join('<span style="color:#94a3b8;">→</span>')}</div></div>`).join("")}</div>
    ${areas.map(a => `<div style="background:#fff; border:2px solid #e2e8f0; border-radius:16px; padding:12px 14px; margin-bottom:12px;"><div style="font-weight:900; color:#0f172a; margin-bottom:8px;">${a}</div><div style="display:flex; flex-wrap:wrap; gap:6px;">${nodes.filter(n => n.area === a).map(chip).join("")}</div></div>`).join("")}`;
}
'''
if MARK in s:
    i = s.index(MARK); i = s.rindex('\n', 0, i) + 1
    ends = [k for k in (s.find('// ORAL_FUNC_MAP_V1', i), s.find('function renderCurrentView() {', i)) if k > 0]   # 后面还插了别的块（交际句型地图）：只换到它前面
    j = min(ends); j = s.rindex('\n', 0, j) + 1 if s[j:j + 2] == '//' else j
    s = s[:i] + FUNCS + s[j:]; print('funcs updated')
else:
    reps = [
        ('  else if (s === "v6_hub") renderV6HubView();\n', '  else if (s === "v6_hub") renderV6HubView();\n  else if (s === "app_map") renderAppMapView();   // PRACTICE_LOOP: 总地图\n'),
        ('  if (screen === "zh_en_hub" && params.scene) return "ze:" + params.scene;\n', '  if (screen === "zh_en_hub" && params.scene) return "ze:" + params.scene;\n  if (screen === "first_principles_hub" && params.lawIdx != null) return "fp:" + params.lawIdx;   // PRACTICE_LOOP: 总地图记「看过」\n'),
        ('  } catch (e) { console.warn("noteLastView", e); }\n}', '  } catch (e) { console.warn("noteLastView", e); }\n  if (typeof mqMount === "function") mqMount();   // PRACTICE_LOOP: 白板下方挂小测\n}'),
        ('''    : `<button type="button" class="hc-go" onclick="navigateTo('vocab_hall')">▶ 第一次来？<span class="hc-label">从单词大世界开始</span></button>`;
  return `<div class="home-continue">${go}<span class="hc-streak">${fire}</span></div>`;''', '''    : `<button type="button" class="hc-go" onclick="navigateTo('vocab_hall')">▶ 第一次来？<span class="hc-label">从单词大世界开始</span></button>`;
  return `<div class="home-continue">${go}<button type="button" data-home-map onclick="navigateTo('app_map')" style="background:#1e3a8a; color:#fff; border:0; border-radius:12px; padding:9px 12px; font-weight:900; cursor:pointer; white-space:nowrap;">🗺️ 总地图</button><span class="hc-streak">${fire}</span></div>`;'''),
    ]
    for a, b in reps: assert s.count(a) == 1, a[:50]; s = s.replace(a, b)
    j = s.index('function renderCurrentView() {'); s = s[:j] + FUNCS + s[j:]; print('patched')
__import__('appwrite').save(s)   # O8：写前锚点检查、写后 jscheck，不过就还原
