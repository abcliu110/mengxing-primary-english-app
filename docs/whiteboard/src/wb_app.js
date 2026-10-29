// ---------- App 接线：王炸实验室白板播放器（所有页签共用） ----------
// 页签里用 ${wbStageHtml("tab", 当前序号)}：这个页签在 WB_LAB 里登记了案例就出白板，否则出原来的 Canvas。
var wbState = { t: 0, playing: true, player: null, key: "" };
function wbCases(tab) { return (typeof WB_LAB !== "undefined" && WB_LAB[tab]) || null; }
function wbTerms(tab, idx) {
  const cs = wbCases(tab) || [];
  const base = (cs[0] && cs[0].terms) || [], own = idx && cs[idx] ? (cs[idx].terms || []) : [];
  return [...base, ...own];
}
function wbGlossHtml(tab, idx) {
  const terms = wbTerms(tab, idx);
  if (!terms.length) return "";
  return `
        <div style="margin-top:14px; background:#f8fafc; border-radius:14px; padding:14px 16px; border:2px solid #cbd5e1;">
          <div style="font-weight:900; color:#065f46; font-size:0.98rem; margin-bottom:8px;">📖 术语小词典（看不懂的词点这里看）</div>
          ${terms.map(([k, v]) => `
            <div style="display:flex; gap:10px; font-size:0.88rem; line-height:1.55; padding:4px 0; border-bottom:1px dashed #e2e8f0;">
              <div style="flex:0 0 150px; font-weight:900; color:#e11d48;">${k}</div>
              <div style="color:#334155;">${v}</div>
            </div>`).join("")}
        </div>`;
}
function wbStageHtml(tab, idx, withGloss = true) {
  const cs = wbCases(tab);
  if (!cs || !cs.length) {
    return `<div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#0f172a; margin-bottom:16px;">
          <canvas id="superLabCanvas" style="width:100%; max-width:100%; height:auto; aspect-ratio:740/320; display:block;"></canvas>
        </div>`;
  }
  const i = Math.min(Math.max(0, idx | 0), cs.length - 1);
  return `
        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#fff; margin-bottom:14px;">
          <svg id="wbStage" data-tab="${tab}" data-case="${i}" style="width:100%; height:auto; aspect-ratio:960/600; display:block;"></svg>
          <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8fafc; border-top:1px solid #e2e8f0;">
            <button id="wbPlay" onclick="wbToggle()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#059669; color:#fff; border:0;">⏸ 暂停</button>
            <button onclick="wbReplay()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#e2e8f0; color:#0f172a; border:0;">↺ 重播</button>
            <input id="wbSeek" type="range" min="0" max="1000" value="0" oninput="wbSeekTo(this.value)" style="flex:1;">
            <span id="wbTime" style="font:700 12px monospace; color:#475569; min-width:92px; text-align:right;">0.0s</span>
          </div>
        </div>${withGloss ? wbGlossHtml(tab, i) + '<div style="height:14px;"></div>' : ""}`;
}
function startWBLoop(stage) {
  const tab = stage.getAttribute("data-tab") || "bamboo_tree";
  const cs = wbCases(tab) || [];
  const idx = Math.min(Number(stage.getAttribute("data-case")) || 0, cs.length - 1);
  const key = tab + "#" + idx;
  if (wbState.key !== key || !wbState.player || wbState.stage !== stage) {
    wbState.player = WB.mount(stage, cs[idx].build, 7 + idx);
    wbState.key = key; wbState.stage = stage; wbState.t = 0; wbState.playing = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (wbState.player) wbState.player.remeasure(); });
  }
  wbSyncButton();
  let last = performance.now();
  function frame(now) {
    if (document.getElementById("wbStage") !== stage) { superLabAnimId = null; wbState.player = null; wbState.key = ""; return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const p = wbState.player;
    if (wbState.playing) { wbState.t += dt; if (wbState.t > p.end) wbState.t = 0; }
    p.render(wbState.t);
    const seek = document.getElementById("wbSeek"), tm = document.getElementById("wbTime");
    if (seek) seek.value = Math.round(wbState.t / p.end * 1000);
    if (tm) tm.textContent = wbState.t.toFixed(1) + "s / " + p.end.toFixed(0) + "s";
    superLabAnimId = requestAnimationFrame(frame);
  }
  superLabAnimId = requestAnimationFrame(frame);
}
function wbSyncButton() { const b = document.getElementById("wbPlay"); if (b) b.textContent = wbState.playing ? "⏸ 暂停" : "▶ 播放"; }
function wbToggle() { wbState.playing = !wbState.playing; wbSyncButton(); }
function wbReplay() { wbState.t = 0; wbState.playing = true; if (wbState.player) wbState.player.resetPen(); wbSyncButton(); }
function wbSeekTo(v) { if (!wbState.player) return; wbState.t = v / 1000 * wbState.player.end; wbState.player.resetPen(); }
