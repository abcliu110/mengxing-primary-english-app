// ---------- 「📖 单词身世」总枢：页面 + 白板舞台（接线方式同第一性原理总枢） ----------
// 白板案例登记在 WB_LAB.<场景 id>（如 wo_port）；insert_wb.py 的 WO_READY 列表决定写进主文件的场景。
// 没登记的场景显示「即将上线」。章节内容来源：docs/whiteboard/word_origins/DESIGN.md、europe_culture/DESIGN.md。
var woAnimId = null;
var woState = { scene: "wo_port" };
const WO_CHAPTERS = [
  { id: "europe", icon: "🏛️", title: "欧洲文化密码", insight: "一个英语词，往往装着一个欧洲场景：先把场景演出来，词族自己就长出来了。",
    scenes: [
      { id: "wo_port", title: "port 港口", sub: "地中海的港口 → import / export / passport / airport", badges: ["📜", "💡"] },
      { id: "wo_europe", title: "Europe 欧罗巴", sub: "一块大陆的名字，来自一个神话", badges: ["📜"] },
      { id: "wo_bluetooth", title: "Bluetooth 蓝牙", sub: "一千年前的国王，今天在「统一」你的耳机", badges: ["📜"] },
    ] },
  { id: "loanwords", icon: "⛵", title: "单词环游世界", insight: "英语是一门「收集者」语言，全世界都往里装过单词。" },
  { id: "places", icon: "🍔", title: "地名、人名变成东西", insight: "东西会带着它出生地的名字去旅行（hamburger、china）。" },
  { id: "animals", icon: "🦛", title: "动植物名字里的画面", insight: "名字是古人第一眼看到的画面（河里的马 = 河马）。" },
  { id: "myths", icon: "🔍", title: "辟谣角：流行的假词源", insight: "好故事不等于真故事；查证本身就是一种能力。" },
  { id: "vikings", icon: "⚔️", title: "维京人与诺曼人", insight: "词汇是社会阶层的化石：农民养 cow，贵族吃 beef。" },
  { id: "letters", icon: "🔤", title: "字母的真实身世", insight: "字母来自古代的图画：A 原来是一个牛头。" },
  { id: "daily", icon: "🌅", title: "日常词里的古老画面", insight: "breakfast = 打破（一夜的）禁食。" },
  { id: "time", icon: "⏰", title: "时间与度量的身世", insight: "a.m. / p.m.、mile = 一千步。" },
  { id: "sports", icon: "🎾", title: "体育与音乐词", insight: "piano = 轻声（pianoforte 的缩写）。" },
  { id: "drift", icon: "🎭", title: "词义漂移", insight: "词也会「变脸」：nice 原来是「傻的」。" },
];
const WO_TIMELINE = [["🏛️", "罗马", "公元前后"], ["⛵", "维京", "约 800 年起"], ["🏰", "诺曼", "1066 年"], ["🧭", "大航海", "约 1500 年"], ["✈️", "现代", "今天"]];
function woSceneReady(id) { return typeof WB_LAB !== "undefined" && !!(WB_LAB[id] && WB_LAB[id].length); }
function woFindScene(id) { for (const ch of WO_CHAPTERS) for (const sc of (ch.scenes || [])) if (sc.id === id) return sc; return null; }
// 可信度徽章（HTML 版，词卡/章节卡片通用）
function wbBadgeHtml(keys) {
  const B = (typeof WB !== "undefined" && WB.BADGES) || {};
  return (keys || []).map(kk => { const b = B[kk]; if (!b) return ""; return `<span title="${b.full}" style="display:inline-block; padding:1px 8px; margin:0 4px 2px 0; border-radius:8px; border:1.5px solid ${b.color}; background:${b.fill}; color:${b.color}; font-size:0.74rem; font-weight:900; white-space:nowrap;">${kk} ${b.label}</span>`; }).join("");
}
// 🥚 彩蛋词标记（超出课标：知道就好，不用背）
function wbEggHtml(word) { return `<span title="彩蛋词：知道就好，不用背" style="white-space:nowrap;">${word}<span style="font-size:0.8em;">🥚</span></span>`; }
function wbBadgeLegendHtml() {
  const B = (typeof WB !== "undefined" && WB.BADGES) || {};
  return `<div style="display:flex; flex-wrap:wrap; gap:6px 14px; align-items:center; font-size:0.8rem; color:#334155;">
    ${Object.keys(B).map(kk => `<span>${wbBadgeHtml([kk])}<span style="color:#64748b;">${B[kk].full.split("：")[1] || B[kk].full}</span></span>`).join("")}
    <span><span style="display:inline-block; padding:1px 8px; border-radius:8px; border:1.5px solid #f59e0b; background:#fef9c3; color:#92400e; font-size:0.74rem; font-weight:900;">🥚 彩蛋词</span><span style="color:#64748b;">超出课标，知道就好，不用背</span></span>
  </div>`;
}
function woMapSvg() {
  // 简化手绘世界地图（只示意大致位置），点 = 已有或计划中的溯源幕
  const land = "#fdf6e3", ink = "#92400e";
  const blobs = [
    "M40,60 Q80,30 150,40 Q190,55 170,90 Q150,110 160,140 Q140,150 120,120 Q90,110 70,100 Q40,90 40,60 Z",            // 北美
    "M150,150 Q175,145 185,170 Q190,200 175,230 Q160,240 155,215 Q145,185 150,150 Z",                                    // 南美
    "M280,55 Q300,40 330,45 Q345,55 335,70 Q320,80 300,82 Q285,78 280,55 Z",                                             // 欧洲
    "M290,95 Q330,88 350,105 Q360,140 340,175 Q320,200 305,170 Q290,130 290,95 Z",                                       // 非洲
    "M340,45 Q400,25 480,35 Q540,45 545,80 Q530,110 490,120 Q450,130 420,115 Q380,105 360,85 Q345,70 340,45 Z",          // 亚洲
    "M470,175 Q500,165 520,180 Q515,200 490,200 Q470,195 470,175 Z",                                                     // 澳洲
  ];
  const dots = [[312, 74, "罗马 · port"], [330, 86, "克里特岛 · Europe"], [306, 48, "丹麦 · Bluetooth"]];
  return `<svg viewBox="0 0 600 250" style="width:100%; height:auto; display:block; background:#e0f2fe; border-radius:14px; border:2px solid #93c5fd;">
    ${blobs.map(d => `<path d="${d}" fill="${land}" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>`).join("")}
    ${dots.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="#e11d48" stroke="#fff" stroke-width="1.5"/><text x="${x}" y="${y + 4}" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">${i + 1}</text>`).join("")}
    ${dots.map(([, , t], i) => `<circle cx="${22 + i * 150}" cy="225" r="7" fill="#e11d48"/><text x="${22 + i * 150}" y="229" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">${i + 1}</text><text x="${34 + i * 150}" y="229" font-size="12" font-weight="900" fill="#9f1239">${t}</text>`).join("")}
    <text x="590" y="16" font-size="11" fill="#64748b" text-anchor="end">简化示意图，不按比例</text>
  </svg>`;
}
function woTimelineHtml() {
  return `<div style="display:flex; align-items:center; gap:0; margin-top:10px; overflow-x:auto;">
    ${WO_TIMELINE.map(([ic, name, when], i) => `
      <div style="flex:1; min-width:86px; text-align:center; position:relative;">
        <div style="height:3px; background:#f59e0b; position:absolute; top:17px; left:${i ? 0 : "50%"}; right:${i === WO_TIMELINE.length - 1 ? "50%" : 0};"></div>
        <div style="position:relative; display:inline-block; width:36px; height:36px; line-height:36px; border-radius:50%; background:#fff; border:2.5px solid #f59e0b; font-size:1.05rem;">${ic}</div>
        <div style="font-weight:900; font-size:0.85rem; color:#fde68a; margin-top:2px;">${name}</div>
        <div style="font-size:0.72rem; color:#cbd5e1;">${when}</div>
      </div>`).join("")}
  </div>`;
}
function woSelectScene(id) { woState.scene = id; if (currentView.params) currentView.params.scene = id; renderWordOriginsHubView(); }
function renderWordOriginsHubView() {
  if (currentView.params && typeof currentView.params.scene === "string") woState.scene = currentView.params.scene;
  const sc = woFindScene(woState.scene) || WO_CHAPTERS[0].scenes[0];
  renderSubNavbar(["首页", "📖 单词身世总枢", sc.title], "");
  const root = document.getElementById("appViewRoot");
  root.innerHTML = `
    <div style="background:linear-gradient(135deg, #1e293b 0%, #422006 60%, #78350f 100%); color:#fff; border-radius:22px; padding:20px 24px; border:3px solid #f59e0b; margin-bottom:20px; box-shadow:0 10px 26px rgba(15,23,42,0.18);">
      <div style="display:flex; flex-wrap:wrap; gap:18px; align-items:flex-start;">
        <div style="flex:1; min-width:280px;">
          <h2 style="margin:0 0 6px; font-size:1.5rem; font-weight:900;">📖 单词身世总枢</h2>
          <p style="margin:0 0 10px; font-size:0.93rem; color:#e2e8f0; line-height:1.6;">每个英语单词都有自己的「身世」：它在哪里出生、经历过什么、又长出了哪些亲戚。用 5 步溯源幕把场景演出来——<strong>① 地图定位 → ② 场景还原 → ③ 词族生长 → ④ 现代彩蛋 → ⑤ 中文对照</strong>，最后用 🔮 预测题检验你学会了没有。</p>
          ${woTimelineHtml()}
        </div>
        <div style="flex:1; min-width:260px; max-width:440px;">${woMapSvg()}</div>
      </div>
    </div>

    <div style="background:#fff; border-radius:16px; padding:12px 16px; border:2px solid #e2e8f0; margin-bottom:18px;">
      <div style="font-weight:900; color:#0f172a; font-size:0.92rem; margin-bottom:6px;">🏷️ 可信度徽章：每个说法都标清楚「是真的历史」还是「帮你记的联想」</div>
      ${wbBadgeLegendHtml()}
    </div>

    <div style="background:#fff; border-radius:22px; padding:18px 20px; border:2px solid #cbd5e1; margin-bottom:20px; box-shadow:var(--shadow-md);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <div><span style="background:#fef3c7; color:#92400e; padding:4px 10px; border-radius:999px; font-weight:900; font-size:0.78rem;">🎬 溯源幕</span>
          <strong style="font-size:1.08rem; color:#0f172a; margin-left:8px;">${sc.title}</strong>
          <span style="margin-left:8px;">${wbBadgeHtml(sc.badges)}</span></div>
        <div style="font-size:0.85rem; color:#475569;">${sc.sub}</div>
      </div>
      <!-- WB_STAGE:wo -->${wbStageHtml(sc.id, 0, false, "woWbStage")}
      ${woSceneReady(sc.id) ? wbGlossHtml(sc.id, 0) : ""}
    </div>

    <h3 style="margin:0 0 10px; font-size:1.2rem; color:#0f172a; font-weight:900;">📚 章节</h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:12px; margin-bottom:24px;">
      ${WO_CHAPTERS.map(ch => {
        const scs = ch.scenes || [], ready = scs.some(s => woSceneReady(s.id));
        return `<div style="background:${ready ? "#fffbeb" : "#f8fafc"}; border-radius:16px; padding:13px 14px; border:2px solid ${ready ? "#f59e0b" : "#e2e8f0"};">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <strong style="font-size:1rem; color:#0f172a;">${ch.icon} ${ch.title}</strong>
            ${ready ? "" : `<span style="background:#e2e8f0; color:#475569; padding:2px 8px; border-radius:999px; font-size:0.72rem; font-weight:900;">即将上线</span>`}
          </div>
          <div style="font-size:0.84rem; color:#475569; margin:6px 0 4px; line-height:1.5;">💡 ${ch.insight}</div>
          ${scs.map(s => {
            const ok = woSceneReady(s.id), on = s.id === sc.id;
            return `<button onclick="woSelectScene('${s.id}')" style="display:block; width:100%; text-align:left; margin-top:6px; padding:7px 10px; border-radius:10px; border:1.5px solid ${on ? "#f59e0b" : "#e2e8f0"}; background:${on ? "#fef3c7" : "#fff"}; color:#0f172a; font-weight:800; font-size:0.86rem;">
              ${ok ? "▶" : "⏳"} ${s.title} ${ok ? wbBadgeHtml(s.badges) : `<span style="color:#94a3b8; font-size:0.75rem;">即将上线</span>`}</button>`;
          }).join("")}
        </div>`;
      }).join("")}
    </div>`;
  startWordOriginsLoop();
}
function startWordOriginsLoop() {
  if (woAnimId) { cancelAnimationFrame(woAnimId); woAnimId = null; }
  const st = document.getElementById("woWbStage");
  if (st) startWBLoop(st, "wo");
}
