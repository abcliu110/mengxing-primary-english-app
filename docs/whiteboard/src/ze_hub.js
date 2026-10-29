// ---------- 「🔀 中英对照总枢」：页面 + 白板舞台（接线方式同单词身世总枢 wo_hub.js） ----------
// 白板案例登记在 WB_LAB.<幕 id>（如 ze_be）；insert_wb.py 的 ZE_READY 决定写进主文件的幕，没登记的显示「即将上线」。
// 章节与幕表：docs/whiteboard/zh_en_hub/DESIGN.md。徽章、按需加载判断复用 wo_hub.js 的 wbBadgeHtml / woSceneReady。
var zeAnimId = null;
var zeState = { scene: "ze_be" };
const ZE_CHAPTERS = [
  { id: "same", icon: "✅", title: "正迁移：这些你已经会了", insight: "先讲一样的：主谓宾的顺序、形容词放名词前，中英文本来就一样，直接用！",
    scenes: [
      { id: "ze_same", title: "这些你已经会了", sub: "我爱妈妈 = I love my mom；红苹果 = a red apple", badges: ["💡"] },
    ] },
  { id: "think", icon: "🧠", title: "A 中英思维对照", insight: "最常犯的错，是把中文的习惯直接搬进英语：「是」≠ be、修饰语放哪、主语不能省。",
    scenes: [
      { id: "ze_be", title: "「是」≠ be", sub: "为什么不能说 I am like apples（原第一性原理 ④-1）", badges: ["💡"] },
      { id: "ze_modifier", title: "修饰语位置：先立树干", sub: "长修饰语挂在名词后面（原第一性原理 ⑥-1）", badges: ["💡"] },
      { id: "ze_subject", title: "句子必须有主语", sub: "下雨了 → It is raining：it 是占位主语", badges: ["💡"] },
      { id: "ze_link", title: "形合 vs 意合", sub: "中文靠意思连，英语靠连接词连；because 和 so 只用一个", badges: ["💡"] },
      { id: "ze_mark", title: "单复数和时态要「上身」", sub: "book / books、go / went：中文不变，英语要变", badges: ["💡"] },
    ] },
  { id: "yesno", icon: "❓", title: "Q 否定疑问怎么答", insight: "你不喜欢吗？——不，我喜欢 = Yes, I do. 英语的 Yes / No 跟着事实走。",
    scenes: [
      { id: "ze_yesno", title: "Yes / No 跟着事实走", sub: "中文回答「对不对」，英语回答「是不是」", badges: ["💡"] },
    ] },
  { id: "words", icon: "🔀", title: "N 一字多词", insight: "中文一个字，英语常常分成好几个词：借、说、穿、带、教 / 学。",
    scenes: [
      { id: "ze_borrow", title: "借：borrow / lend", sub: "从别人那里拿 borrow from，给别人 lend to", badges: ["💡"] },
      { id: "ze_say", title: "说：say / speak / talk / tell", sub: "说内容、说语言、聊天、告诉某人", badges: ["💡"] },
      { id: "ze_wear", title: "穿 / 带 / 教学", sub: "wear / put on、take / bring、teach / learn", badges: ["💡"] },
    ] },
  { id: "pronoun", icon: "🧩", title: "M 代词变格活化石", insight: "中文「我」一个字走天下，英语按位置换形：I / me / my / mine。",
    scenes: [
      { id: "ze_pronoun", title: "I / me / my / mine", sub: "主格、宾格、物主：英语里仅存的变格", badges: ["📜", "💡"] },
    ] },
];
function zeFindScene(id) { for (const ch of ZE_CHAPTERS) for (const sc of (ch.scenes || [])) if (sc.id === id) return sc; return null; }
function zeFirstReady() { for (const ch of ZE_CHAPTERS) for (const sc of (ch.scenes || [])) if (woSceneReady(sc.id)) return sc; return ZE_CHAPTERS[1].scenes[0]; }
function zeSelectScene(id) { zeState.scene = id; if (currentView.params) currentView.params.scene = id; renderZhEnHubView(); }
function renderZhEnHubView() {
  if (currentView.params && typeof currentView.params.scene === "string") zeState.scene = currentView.params.scene;
  let sc = zeFindScene(zeState.scene);
  if (!sc || !woSceneReady(sc.id)) sc = zeFirstReady();
  renderSubNavbar(["首页", "🔀 中英对照总枢", sc.title], "");
  const root = document.getElementById("appViewRoot");
  root.innerHTML = `
    <div style="background:linear-gradient(135deg, #0f172a 0%, #134e4a 60%, #0f766e 100%); color:#fff; border-radius:22px; padding:20px 24px; border:3px solid #14b8a6; margin-bottom:20px; box-shadow:0 10px 26px rgba(15,23,42,0.18);">
      <h2 style="margin:0 0 6px; font-size:1.5rem; font-weight:900;">🔀 中英对照总枢</h2>
      <p style="margin:0 0 10px; font-size:0.93rem; color:#e2e8f0; line-height:1.6;">中国孩子学英语最常犯的错，大多是<strong>把中文的习惯直接搬进英语</strong>；也有很多地方中英文本来一样，可以直接用。先讲一样的，再讲不一样的：<strong>① 中文怎么说 → ② 照搬会怎样（❌）→ ③ 英语怎么说、为什么 → ④ 更多例子 → ⑤ 口诀</strong>。</p>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(94,234,212,0.5); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#ccfbf1;">中文：我是学生 · 我喜欢苹果</span>
        <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(94,234,212,0.5); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#ccfbf1;">英语：I am a student. · I like apples.</span>
      </div>
    </div>

    <div style="background:#fff; border-radius:16px; padding:12px 16px; border:2px solid #e2e8f0; margin-bottom:18px;">
      <div style="font-weight:900; color:#0f172a; font-size:0.92rem; margin-bottom:6px;">🏷️ 可信度徽章：记忆比喻、简化说法、真实历史分开标</div>
      ${wbBadgeLegendHtml()}
    </div>

    <div style="background:#fff; border-radius:22px; padding:18px 20px; border:2px solid #cbd5e1; margin-bottom:20px; box-shadow:var(--shadow-md);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
        <div><span style="background:#ccfbf1; color:#115e59; padding:4px 10px; border-radius:999px; font-weight:900; font-size:0.78rem;">🎬 对照幕</span>
          <strong style="font-size:1.08rem; color:#0f172a; margin-left:8px;">${sc.title}</strong>
          <span style="margin-left:8px;">${wbBadgeHtml(sc.badges)}</span></div>
        <div style="font-size:0.85rem; color:#475569;">${sc.sub}</div>
      </div>
      <!-- WB_STAGE:ze -->${wbStageHtml(sc.id, 0, false, "zeWbStage")}
      ${woSceneReady(sc.id) ? wbGlossHtml(sc.id, 0) : ""}
    </div>

    <h3 style="margin:0 0 10px; font-size:1.2rem; color:#0f172a; font-weight:900;">📚 章节</h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:12px; margin-bottom:24px;">
      ${ZE_CHAPTERS.map(ch => {
        const scs = ch.scenes || [], ready = scs.some(s => woSceneReady(s.id));
        return `<div style="background:${ready ? "#f0fdfa" : "#f8fafc"}; border-radius:16px; padding:13px 14px; border:2px solid ${ready ? "#14b8a6" : "#e2e8f0"};">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <strong style="font-size:1rem; color:#0f172a;">${ch.icon} ${ch.title}</strong>
            ${ready ? "" : `<span style="background:#e2e8f0; color:#475569; padding:2px 8px; border-radius:999px; font-size:0.72rem; font-weight:900;">即将上线</span>`}
          </div>
          <div style="font-size:0.84rem; color:#475569; margin:6px 0 4px; line-height:1.5;">💡 ${ch.insight}</div>
          ${scs.map(s => {
            const ok = woSceneReady(s.id), on = s.id === sc.id;
            return `<button ${ok ? `onclick="zeSelectScene('${s.id}')"` : "disabled"} style="display:block; width:100%; text-align:left; margin-top:6px; padding:7px 10px; border-radius:10px; border:1.5px solid ${on ? "#14b8a6" : "#e2e8f0"}; background:${on ? "#ccfbf1" : "#fff"}; color:#0f172a; font-weight:800; font-size:0.86rem;">
              ${ok ? "▶" : "⏳"} ${s.title} ${ok ? wbBadgeHtml(s.badges) : `<span style="color:#94a3b8; font-size:0.75rem;">即将上线</span>`}</button>`;
          }).join("")}
        </div>`;
      }).join("")}
    </div>`;
  startZhEnLoop();
}
function startZhEnLoop() {
  if (zeAnimId) { cancelAnimationFrame(zeAnimId); zeAnimId = null; }
  const st = document.getElementById("zeWbStage");
  if (st) startWBLoop(st, "ze");
}
// 第一性原理里搬到本总枢的幕：原位置只留一句话 + 跳转（FIRST_PRINCIPLES_DB 的 act.movedTo = { scene, title, line }）
function fpMovedHtml(act) {
  const m = act.movedTo;
  return `<div id="fpMovedBox" style="background:linear-gradient(135deg,#f0fdfa,#ccfbf1); border:2.5px dashed #14b8a6; border-radius:16px; padding:22px 24px; text-align:center;">
    <div style="font-size:1.6rem;">🔀</div>
    <div style="font-weight:900; color:#0f172a; font-size:1.08rem; margin:6px 0;">这一幕已经搬到「中英对照总枢」</div>
    <div style="color:#334155; font-size:0.92rem; line-height:1.6; max-width:640px; margin:0 auto 14px;">${m.line}</div>
    <button onclick="navigateTo('zh_en_hub', { scene: '${m.scene}' })" style="background:linear-gradient(135deg,#14b8a6,#0d9488); color:#fff; font-weight:900; padding:10px 20px; border-radius:12px; font-size:0.95rem;">去看「${m.title}」这一幕 ➔</button>
  </div>`;
}
