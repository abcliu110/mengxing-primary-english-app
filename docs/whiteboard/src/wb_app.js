// ---------- App 接线：王炸实验室白板播放器（所有页签共用） ----------
// 页签里用 ${wbStageHtml("tab", 当前序号)}：这个页签在 WB_LAB 里登记了案例就出白板，否则出原来的 Canvas。
var wbState = { t: 0, playing: true, player: null, key: "", voice: (function () { try { return localStorage.getItem("wbVoice") !== "0"; } catch (e) { return true; } })(), sp: null };
// ---------- 英文例句朗读：读的时候时间轴停住，读完再走；逐词高亮靠 onboundary，没有就按时间估算 ----------
function wbSpeechOK() { return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined"; }
function wbStopSpeech() {
  if (wbState.sp) wbState.sp.dead = true;
  wbState.sp = null;
  if (wbState.player) wbState.player.hl = null;
  try { if (wbSpeechOK()) window.speechSynthesis.cancel(); } catch (e) {}
}
function wbSpeak(i, sy) {
  wbStopSpeech();
  if (!wbSpeechOK()) return;
  const sp = { i, done: false, dead: false, hold: 0 };
  wbState.sp = sp;
  try {
    const st = (typeof appState !== "undefined" && appState) || {};
    const mkU = txt => { const u = new SpeechSynthesisUtterance(txt); u.lang = st.accent || "en-US"; u.rate = Number(st.speechRate) || .85; u.volume = Number.isFinite(Number(st.volume)) ? Number(st.volume) : 1; return u; };
    const starts = []; let pos = 0;
    sy.en.split(/\s+/).forEach(w => { const j = sy.en.indexOf(w, pos); starts.push(j); pos = j + w.length; });
    const sent = mkU(sy.en);
    sent.onboundary = e => { if (sp.dead || !wbState.player) return; let w = 0; for (let j = 0; j < starts.length; j++) if (e.charIndex >= starts[j]) w = j; wbState.player.hl = { i, w }; };
    sent.onend = sent.onerror = () => { sp.done = true; if (!sp.dead && wbState.player) wbState.player.hl = { i, w: -1 }; };
    if (sy.word) { const wu = mkU(sy.word); wu.onerror = () => {}; window.speechSynthesis.speak(wu); }
    window.speechSynthesis.speak(sent);
  } catch (e) { sp.done = true; }
}
function wbVoiceToggle() {
  wbState.voice = !wbState.voice;
  try { localStorage.setItem("wbVoice", wbState.voice ? "1" : "0"); } catch (e) {}
  if (!wbState.voice) wbStopSpeech();
  wbSyncButton();
}
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
function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {
  const cs = wbCases(tab);
  if ((!cs || !cs[idx | 0]) && svgId === "fpWbStage") {
    // 第一性原理总枢：这一幕还没做白板，保留旧 Canvas（可以一幕一幕地做）
    return `<div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#0f172a;">
        <canvas id="firstPrinciplesCanvas" style="width:100%; max-width:100%; height:auto; aspect-ratio:740/320; display:block;"></canvas>
      </div>`;
  }
  if (!cs || !cs.length) {
    return `<div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#0f172a; margin-bottom:16px;">
          <canvas id="superLabCanvas" style="width:100%; max-width:100%; height:auto; aspect-ratio:740/320; display:block;"></canvas>
        </div>`;
  }
  const i = Math.min(Math.max(0, idx | 0), cs.length - 1);
  return `
        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#fff; margin-bottom:14px;">
          <svg id="${svgId}" data-tab="${tab}" data-case="${i}" style="width:100%; height:auto; aspect-ratio:960/600; display:block;"></svg>
          <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8fafc; border-top:1px solid #e2e8f0;">
            <button id="wbPlay" onclick="wbToggle()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#059669; color:#fff; border:0;">⏸ 暂停</button>
            <button id="wbVoiceBtn" onclick="wbVoiceToggle()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0;">🔊 朗读</button>
            <button onclick="wbReplay()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#e2e8f0; color:#0f172a; border:0;">↺ 重播</button>
            <input id="wbSeek" type="range" min="0" max="1000" value="0" oninput="wbSeekTo(this.value)" style="flex:1;">
            <span id="wbTime" style="font:700 12px monospace; color:#475569; min-width:92px; text-align:right;">0.0s</span>
          </div>
        </div>${withGloss ? wbGlossHtml(tab, i) + '<div style="height:14px;"></div>' : ""}`;
}
// slot = "fp"：第一性原理总枢，动画帧 id 记在 fpAnimId（不和王炸实验室的 superLabAnimId 互相取消）
function startWBLoop(stage, slot) {
  const setId = v => { if (slot === "fp") fpAnimId = v; else superLabAnimId = v; };
  const tab = stage.getAttribute("data-tab") || "bamboo_tree";
  const cs = wbCases(tab) || [];
  const idx = Math.min(Number(stage.getAttribute("data-case")) || 0, cs.length - 1);
  const key = tab + "#" + idx;
  if (wbState.key !== key || !wbState.player || wbState.stage !== stage) {
    wbState.player = WB.mount(stage, cs[idx].build, 7 + idx);
    wbStopSpeech();
    wbState.key = key; wbState.stage = stage; wbState.t = 0; wbState.playing = true;
    if (wbState.player.strip) wbState.player.strip.addEventListener("click", () => {
      const p = wbState.player, says = p.says; let si = -1;
      for (let i = 0; i < says.length; i++) if (wbState.t >= says[i].t) si = i;
      if (si >= 0) { wbSpeak(si, says[si]); wbState.sp.manual = true; }
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (wbState.player) wbState.player.remeasure(); });
  }
  wbSyncButton();
  let last = performance.now();
  function frame(now) {
    if (document.getElementById(stage.id) !== stage) { setId(null); if (wbState.stage === stage) { wbStopSpeech(); wbState.player = null; wbState.key = ""; } return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const p = wbState.player;
    if (wbState.playing) {
      const t0 = wbState.t;
      let t1 = t0 + dt;
      const sp = wbState.sp;
      if (sp && !sp.done && !sp.manual) {
        const sy = p.says[sp.i];
        // 预留时间用完了还没读完：时间轴停住等它，最多再等 4 秒（防止设备不回 onend 卡死）
        if (t1 > sy.t + sy.dur) { sp.hold += dt; if (sp.hold < 4) t1 = Math.max(t0, sy.t + sy.dur); }
      }
      if (wbState.voice) for (let i = 0; i < p.says.length; i++) if (p.says[i].t > t0 && p.says[i].t <= t1) { wbSpeak(i, p.says[i]); break; }
      wbState.t = t1;
      if (wbState.t > p.end) { wbState.t = 0; wbStopSpeech(); }
    }
    p.render(wbState.t);
    const seek = document.getElementById("wbSeek"), tm = document.getElementById("wbTime");
    if (seek) seek.value = Math.round(wbState.t / p.end * 1000);
    if (tm) tm.textContent = wbState.t.toFixed(1) + "s / " + p.end.toFixed(0) + "s";
    setId(requestAnimationFrame(frame));
  }
  setId(requestAnimationFrame(frame));
}
function wbSyncButton() {
  const b = document.getElementById("wbPlay"); if (b) b.textContent = wbState.playing ? "⏸ 暂停" : "▶ 播放";
  const v = document.getElementById("wbVoiceBtn"); if (v) { v.textContent = wbState.voice ? "🔊 朗读" : "🔇 静音"; v.style.display = wbState.player && wbState.player.says && wbState.player.says.length ? "" : "none"; }
}
function wbToggle() {
  wbState.playing = !wbState.playing;
  try { if (wbSpeechOK()) { if (wbState.playing) window.speechSynthesis.resume(); else window.speechSynthesis.pause(); } } catch (e) {}
  wbSyncButton();
}
function wbReplay() { wbStopSpeech(); wbState.t = 0; wbState.playing = true; if (wbState.player) wbState.player.resetPen(); wbSyncButton(); }
function wbSeekTo(v) { if (!wbState.player) return; wbStopSpeech(); wbState.t = v / 1000 * wbState.player.end; wbState.player.resetPen(); }
