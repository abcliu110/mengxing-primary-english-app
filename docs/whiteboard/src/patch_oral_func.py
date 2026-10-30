"""patch_oral_func.py —— 决策 6 交际句型地图（口语大世界新入口，幂等）。
- 口语大厅顶部加入口卡；新页 oral_func_map：v5 白板剧场 2 幕（oral_func ① 礼貌阶梯 ② 五大交际功能，canvas 由 wb5HDSwap 换成 v5）+ 点读句型表。
- 旧口语场景一句不删（R1）；本页只做「骨架句型」汇总。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); MARK = '// ORAL_FUNC_MAP_V1'
FUNCS = r'''// ORAL_FUNC_MAP_V1 ---------- 决策 6：交际句型地图（礼貌阶梯 + 五大交际功能；src/patch_oral_func.py） ----------
const ORAL_FUNC_LADDER = [
  ["① 命令", "Give me the pen.", "把笔给我。"], ["② 加 please", "Please give me the pen.", "请把笔给我。"],
  ["③ Can you ...?", "Can you give me the pen?", "你能把笔给我吗？"], ["④ Could you ..., please?", "Could you give me the pen, please?", "您能把笔给我吗？"],
  ["⑤ Would you mind ...ing?", "Would you mind giving me the pen?", "您介意把笔给我吗？（答应说 Not at all.）"],
];
const ORAL_FUNC_MAP = [
  { icon: "🧭", name: "问路", s: [["Excuse me, where is the library?", "打扰一下，图书馆在哪儿？"], ["How can I get to the zoo?", "我怎么去动物园？"], ["Go straight and turn left.", "一直走，然后左转。"]] },
  { icon: "🛍️", name: "购物", s: [["How much is this T-shirt?", "这件 T 恤多少钱？"], ["Can I try it on?", "我可以试穿吗？"], ["I'll take it.", "我买了。"]] },
  { icon: "📞", name: "打电话", tip: "⚠️ 电话里介绍自己说 This is ...，不说 I am ...", s: [["Hello, this is Amy.", "你好，我是埃米。"], ["May I speak to Tom, please?", "请问汤姆在吗？"], ["Hold on, please.", "请稍等。"]] },
  { icon: "🙋", name: "请求许可", s: [["May I come in?", "我可以进来吗？"], ["Can I use your pencil?", "我可以用你的铅笔吗？"], ["Sure, go ahead.", "当然，用吧。"]] },
  { icon: "🙇", name: "道歉与回应", tip: "打扰之前说 Excuse me，做错之后说 Sorry", s: [["I'm sorry I'm late.", "对不起，我迟到了。"], ["That's OK.", "没关系。"], ["Never mind.", "别在意。"]] },
];
function renderOralFuncMapView() {
  renderSubNavbar(["首页", "💬 日常用语小剧场", "🗺️ 交际句型地图"], "");
  const say = t => `onclick="speakText(${attrEscape(JSON.stringify(t))}, 'en')"`;
  document.getElementById("appViewRoot").innerHTML = `
    <div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5); border-radius:20px; padding:16px 20px; border:2px solid #6ee7b7; margin-bottom:16px;">
      <h2 style="margin:0 0 6px; font-size:1.35rem; color:#065f46;">🗺️ 交际句型地图 · 礼貌阶梯 + 五大交际功能</h2>
      <div style="font-size:0.9rem; color:#047857;">先学「说得多客气」，再学五件最常用的事各三句核心句型。点任意一句可听朗读。</div>
    </div>
    <div class="hd-video-wrapper" data-oral-func-stage>
      <canvas id="oralFuncCanvas" class="hd-stage" width="740" height="320"></canvas>
      ${renderHDVideoControlBarHTML(["第一幕·礼貌阶梯", "第二幕·五大交际功能"])}
    </div>
    <div style="background:#fff; border:2px solid #a7f3d0; border-radius:16px; padding:14px 16px; margin:14px 0;">
      <div style="font-weight:900; color:#065f46; margin-bottom:8px;">🪜 礼貌阶梯（从直接到客气）${typeof wbBadgeHtml === "function" ? wbBadgeHtml(["✂️"]) : ""}</div>
      ${ORAL_FUNC_LADDER.map((r, i) => `<div data-oral-line ${say(r[1])} style="cursor:pointer; display:flex; gap:10px; align-items:baseline; padding:6px 8px; margin-left:${i * 14}px; border-left:4px solid #34d399; background:#f0fdf4; border-radius:8px; margin-top:4px;"><b style="color:#047857; min-width:150px;">${r[0]}</b><span style="font-weight:800;">${r[1]} 🔊</span><span style="color:#64748b; font-size:0.85rem;">${r[2]}</span></div>`).join("")}
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px;">
      ${ORAL_FUNC_MAP.map(f => `<div style="background:#fff; border:2px solid #e2e8f0; border-radius:16px; padding:12px 14px;"><div style="font-weight:900; font-size:1.05rem; color:#0f172a;">${f.icon} ${f.name}</div>
        ${f.tip ? `<div style="font-size:0.8rem; color:#b45309; font-weight:800; margin:2px 0 4px;">${f.tip}</div>` : ""}
        ${f.s.map(x => `<div data-oral-line ${say(x[0])} style="cursor:pointer; padding:6px 8px; border-radius:8px; background:#f8fafc; margin-top:5px;"><div style="font-weight:800;">${x[0]} 🔊</div><div style="color:#64748b; font-size:0.84rem;">${x[1]}</div></div>`).join("")}</div>`).join("")}
    </div>`;
  setTimeout(() => { if (typeof wb5HDSwap === "function") wb5HDSwap("oralFuncCanvas", "oral_func"); }, 30);
}
'''
if MARK in s:
    i = s.index(MARK); i = s.rindex('\n', 0, i) + 1; j = s.index('function renderCurrentView() {', i); s = s[:i] + FUNCS + s[j:]; print('funcs updated')
else:
    reps = [
        ('  else if (s === "app_map") renderAppMapView();   // PRACTICE_LOOP: 总地图\n', '  else if (s === "app_map") renderAppMapView();   // PRACTICE_LOOP: 总地图\n  else if (s === "oral_func_map") renderOralFuncMapView();   // ORAL_FUNC_MAP: 交际句型地图\n'),
        ('''    <div class="subcat-grid" style="grid-template-columns:repeat(auto-fill, minmax(255px, 1fr));">
      ${SCENARIO_DEFINITIONS.map(sc => {''', '''    <div data-oral-func-entry onclick="navigateTo('oral_func_map')" style="cursor:pointer; display:flex; align-items:center; gap:12px; background:#fff; border:2.5px solid #10b981; border-radius:16px; padding:12px 16px; margin-bottom:16px;">
      <span style="font-size:2rem;">🗺️</span><div style="flex:1;"><div style="font-weight:900; font-size:1.08rem; color:#065f46;">交际句型地图（新）</div><div style="font-size:0.84rem; color:#475569;">礼貌阶梯 Give me → Could you → Would you mind；问路 · 购物 · 打电话 · 请求许可 · 道歉，每件三句核心句型 + 白板动画</div></div><span style="color:#059669; font-weight:900;">➔</span>
    </div>
    <div class="subcat-grid" style="grid-template-columns:repeat(auto-fill, minmax(255px, 1fr));">
      ${SCENARIO_DEFINITIONS.map(sc => {'''),
    ]
    for a, b in reps: assert s.count(a) == 1, a[:40]; s = s.replace(a, b)
    j = s.index('function renderCurrentView() {'); s = s[:j] + FUNCS + s[j:]; print('patched')
__import__('appwrite').save(s)   # O8：写前锚点检查、写后 jscheck，不过就还原
