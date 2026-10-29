// ---------- App 接线：王炸实验室白板播放器（所有页签共用） ----------
// 页签里用 ${wbStageHtml("tab", 当前序号)}：这个页签在 WB_LAB 里登记了案例就出白板，否则出原来的 Canvas。
var wbState = { t: 0, playing: true, player: null, key: "", voice: (function () { try { return localStorage.getItem("wbVoice") !== "0"; } catch (e) { return true; } })(), sp: null };
// ---------- 英文例句朗读：读的时候时间轴停住，读完再走；逐词高亮靠 onboundary，没有就按时间估算 ----------
function wbSpeechOK() { return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined"; }
function wbStopSpeech() {
  if (wbState.sp) wbState.sp.dead = true;
  wbState.sp = null;
  if (wbState.player) { wbState.player.hl = null; wbState.player.speech = null; }
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
    // 语音事件 → 讲解员口型（onstart 张嘴、onboundary 每个词重新张嘴、onend 闭嘴）+ v2 时间轴跟着语音走
    const live = { live: false, on: false, b: 0, i, phase: "", j: -1 };
    sp.live = live; sp.t0 = performance.now();
    if (wbState.player) wbState.player.speech = live;
    const mark = (ph, j) => { if (sp.dead) return; live.live = true; live.on = ph !== "done"; live.phase = ph; if (j != null) live.j = j; live.b = performance.now(); if (wbState.syncLog) wbState.syncLog.push({ i, ph, j: live.j, at: live.b }); };
    const sent = mkU(sy.en);
    sent.onstart = () => mark("sent", 0);
    sent.onboundary = e => { if (sp.dead || !wbState.player) return; let w = 0; for (let j = 0; j < starts.length; j++) if (e.charIndex >= starts[j]) w = j; sp.gotB = true; wbState.player.hl = { i, w }; mark("sent", w); };
    sent.onend = () => { sp.done = true; mark("done"); live.on = false; if (!sp.dead && wbState.player && sp.gotB) wbState.player.hl = { i, w: -1 }; };
    sent.onerror = () => { sp.done = true; live.live = false; live.on = false; if (!sp.dead && wbState.player) wbState.player.hl = null; };   // 没声音：退回按时间估算高亮和口型
    if (sy.word) { const wu = mkU(sy.word); wu.onstart = () => mark("word"); wu.onboundary = () => { if (live.phase === "word") live.b = performance.now(); }; wu.onend = () => { if (live.phase === "word") { live.on = false; live.phase = "gap"; } }; wu.onerror = () => {}; window.speechSynthesis.speak(wu); }
    window.speechSynthesis.speak(sent);
  } catch (e) { sp.done = true; }
}
function wbVoiceToggle() {
  wbState.voice = !wbState.voice;
  try { localStorage.setItem("wbVoice", wbState.voice ? "1" : "0"); } catch (e) {}
  if (!wbState.voice) wbStopSpeech();
  wbSyncButton();
}
// ---------- 按需加载（决策 13）：白板模块在主文件里是不执行的 <script type="text/plain" id="wbmod-<id>">，
// 第一次用到时取出文字、生成 <script> 同步执行（登记进 WB_LAB），之后不再重复加载；data-deps 里的道具文件先执行。
// 仍是单个 HTML、双击即用（不用 fetch，file:// 下也能跑）。
var wbModsLoaded = {};
function wbModEl(id) { return typeof document !== "undefined" && id ? document.getElementById("wbmod-" + id) : null; }
function wbHasModule(id) { return !!((typeof WB_LAB !== "undefined" && WB_LAB[id]) || wbModEl(id)); }
function wbLoadModule(id) {
  if (wbModsLoaded[id]) return true;
  const el = wbModEl(id);
  if (!el) return false;
  wbModsLoaded[id] = true;
  (el.getAttribute("data-deps") || "").split(/\s+/).filter(Boolean).forEach(wbLoadModule);
  const sc = document.createElement("script");
  sc.text = el.textContent + "\n//# sourceURL=wbmod-" + id + ".js";
  (document.head || document.documentElement).appendChild(sc);
  return true;
}
function wbLoadAll() { if (typeof document === "undefined") return; document.querySelectorAll('script[type="text/plain"][id^="wbmod-"]').forEach(e => wbLoadModule(e.id.slice(6))); }
function wbCases(tab) {
  if (typeof WB_LAB === "undefined") return null;
  if (!WB_LAB[tab]) wbLoadModule(tab);
  return WB_LAB[tab] || null;
}
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
  if ((!cs || !cs[idx | 0]) && svgId === "woWbStage") {
    // 单词身世总枢：这一幕还没做好，显示「即将上线」
    return `<div style="width:100%; border-radius:16px; border:2px dashed #cbd5e1; background:#f8fafc; padding:48px 16px; text-align:center; color:#64748b; font-weight:800; margin-bottom:14px;">
        ⏳ 这一幕正在制作中，即将上线。先看看已经上线的 ▶ 溯源幕吧！</div>`;
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
            <button id="wbSfxBtn" onclick="wbSfxToggle()" title="音效（马克笔、弹出、叮）开关，和朗读分开" style="display:none; padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#fef9c3; color:#854d0e; border:1px solid #fde047;">🔔 音效</button>
            <button id="wbVoiceBtn" onclick="wbVoiceToggle()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0;">🔊 朗读</button>
            <button onclick="wbReplay()" style="padding:7px 14px; border-radius:10px; font-weight:900; font-size:0.85rem; background:#e2e8f0; color:#0f172a; border:0;">↺ 重播</button>
            <input id="wbSeek" type="range" min="0" max="1000" value="0" oninput="wbSeekTo(this.value)" style="flex:1;">
            <span id="wbTime" style="font:700 12px monospace; color:#475569; min-width:92px; text-align:right;">0.0s</span>
          </div>
        </div>${withGloss ? wbGlossHtml(tab, i) + '<div style="height:14px;"></div>' : ""}`;
}
// slot = "fp"：第一性原理总枢，动画帧 id 记在 fpAnimId；slot = "wo"：单词身世总枢，记在 woAnimId（不和王炸实验室的 superLabAnimId 互相取消）
function startWBLoop(stage, slot) {
  const setId = v => { if (slot === "fp") fpAnimId = v; else if (slot === "wo") woAnimId = v; else superLabAnimId = v; };
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
        // v2：时间轴跟着语音事件走（误差目标 ≤ 0.2 秒）：读到第 j 个词时，时间轴停在「第 j 个词」的预留区间里，
        // 落后就 4 倍速追上、超前就停住等下一个 onboundary；没有收到任何语音事件（设备没语音）就按原来的预留时长走
        if (p.v2 && sp.live) {
          const L = sp.live, n = sy.en.split(/\s+/).length, per = (sy.dur - sy.wd - .5) / n, est = j => sy.t + sy.wd + .25 + j * per;
          let lo = -1e9, hi = 1e9;
          if (!L.live && performance.now() - sp.t0 < 1500) hi = sy.t + .04;                 // 等 onstart（最多 1.5 秒）
          else if (L.phase === "word") hi = sy.t + Math.max(.05, sy.wd - .1);
          else if (L.phase === "gap") { lo = sy.t + sy.wd - .3; hi = sy.t + sy.wd + .2; }
          else if (L.phase === "sent") { lo = est(Math.max(0, L.j)); hi = L.j + 1 < n ? est(L.j + 1) - .03 : sy.t + sy.dur - .05; }
          if (t1 < lo) t1 = Math.min(lo, t0 + dt * 4);
          if (t1 > hi) t1 = Math.max(t0, hi);
        }
        // 预留时间用完了还没读完：时间轴停住等它，最多再等 4 秒（防止设备不回 onend 卡死）
        if (t1 > sy.t + sy.dur) { sp.hold += dt; if (sp.hold < 4) t1 = Math.max(t0, sy.t + sy.dur); }
      }
      if (wbState.voice) for (let i = 0; i < p.says.length; i++) if (p.says[i].t > t0 && p.says[i].t <= t1) { wbSpeak(i, p.says[i]); break; }
      if (p.v2) for (const nm of p.sfxBetween(t0, t1)) wbSfxPlay(nm);
      wbState.t = t1;
      if (wbState.t > p.end) { wbState.t = 0; wbStopSpeech(); }
    }
    p.render(wbState.t);
    if (p.v2) wbSfxScratch(wbState.playing && p.drawing, !!(wbState.sp && !wbState.sp.done));
    const seek = document.getElementById("wbSeek"), tm = document.getElementById("wbTime");
    if (seek) seek.value = Math.round(wbState.t / p.end * 1000);
    if (tm) tm.textContent = wbState.t.toFixed(1) + "s / " + p.end.toFixed(0) + "s";
    setId(requestAnimationFrame(frame));
  }
  setId(requestAnimationFrame(frame));
}
function wbSyncButton() {
  const b = document.getElementById("wbPlay"); if (b) b.textContent = wbState.playing ? "⏸ 暂停" : "▶ 播放";
  const fx = document.getElementById("wbSfxBtn"); if (fx) { fx.textContent = wbSfx.on ? "🔔 音效" : "🔕 音效"; fx.style.display = wbState.player && wbState.player.v2 ? "" : "none"; }
  const v = document.getElementById("wbVoiceBtn"); if (v) { v.textContent = wbState.voice ? "🔊 朗读" : "🔇 静音"; v.style.display = wbState.player && wbState.player.says && wbState.player.says.length ? "" : "none"; }
}
function wbToggle() {
  wbSfxInit();
  wbState.playing = !wbState.playing;
  try { if (wbSpeechOK()) { if (wbState.playing) window.speechSynthesis.resume(); else window.speechSynthesis.pause(); } } catch (e) {}
  wbSyncButton();
}
function wbReplay() { wbSfxInit(); wbStopSpeech(); wbState.t = 0; wbState.playing = true; if (wbState.player) wbState.player.resetPen(); wbSyncButton(); }
function wbSeekTo(v) { if (!wbState.player) return; wbStopSpeech(); wbState.t = v / 1000 * wbState.player.end; wbState.player.resetPen(); }

// ---------- 音效（V7）：Web Audio 现场合成，不带任何音频文件；一键静音（和朗读开关分开）；朗读时自动压低 ----------
// 马克笔沙沙（画线写字时的带通噪声）、弹出「啵」、答对 / 金句卡「叮」、板擦「唰」。默认音量很低。
var wbSfx = { on: (function () { try { return localStorage.getItem("wbSfx") !== "0"; } catch (e) { return true; } })(), ctx: null, master: null, scratch: null, buf: null, duck: 1 };
function wbSfxInit() {
  if (wbSfx.ctx) { if (wbSfx.ctx.state === "suspended") wbSfx.ctx.resume().catch(() => {}); return; }
  const AC = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
  if (!AC) return;
  try {
    const c = new AC(), m = c.createGain(); m.gain.value = .16; m.connect(c.destination);
    const buf = c.createBuffer(1, c.sampleRate, c.sampleRate), d = buf.getChannelData(0);
    let s = 7; for (let i = 0; i < d.length; i++) { s = (s * 9301 + 49297) % 233280; d[i] = s / 116640 - 1; }
    const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = .9;
    const g = c.createGain(); g.gain.value = 0; src.connect(bp); bp.connect(g); g.connect(m); src.start();
    Object.assign(wbSfx, { ctx: c, master: m, scratch: g, buf });
  } catch (e) { wbSfx.ctx = null; }
}
if (typeof document !== "undefined") document.addEventListener("pointerdown", function wbSfxGesture() { wbSfxInit(); }, { passive: true });
function wbSfxToggle() {
  wbSfxInit();
  wbSfx.on = !wbSfx.on;
  try { localStorage.setItem("wbSfx", wbSfx.on ? "1" : "0"); } catch (e) {}
  if (!wbSfx.on && wbSfx.scratch) wbSfx.scratch.gain.setTargetAtTime(0, wbSfx.ctx.currentTime, .02);
  wbSyncButton();
}
function wbSfxScratch(drawing, speaking) {
  if (!wbSfx.ctx || !wbSfx.scratch) return;
  wbSfx.duck = speaking ? .3 : 1;
  const want = wbSfx.on && drawing ? .05 * wbSfx.duck : 0;
  if (Math.abs((wbSfx.lastScratch ?? -1) - want) > .001) { wbSfx.scratch.gain.setTargetAtTime(want, wbSfx.ctx.currentTime, .04); wbSfx.lastScratch = want; }
}
function wbSfxPlay(name) {
  if (!wbSfx.on || !wbSfx.ctx || wbSfx.ctx.state !== "running") return;
  const c = wbSfx.ctx, t = c.currentTime, out = c.createGain(), k = wbSfx.duck;
  out.connect(wbSfx.master);
  if (name === "pop") {
    const o = c.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(620, t); o.frequency.exponentialRampToValueAtTime(240, t + .1);
    out.gain.setValueAtTime(.45 * k, t); out.gain.exponentialRampToValueAtTime(.001, t + .14); o.connect(out); o.start(t); o.stop(t + .16);
  } else if (name === "ding") {
    [1318, 1976].forEach((f, i) => { const o = c.createOscillator(); o.type = "sine"; o.frequency.value = f; o.connect(out); o.start(t + i * .07); o.stop(t + .9); });
    out.gain.setValueAtTime(.001, t); out.gain.exponentialRampToValueAtTime(.32 * k, t + .02); out.gain.exponentialRampToValueAtTime(.001, t + .85);
  } else if (name === "erase") {
    const src = c.createBufferSource(); src.buffer = wbSfx.buf; const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 900; bp.Q.value = .7;
    src.connect(bp); bp.connect(out);
    out.gain.setValueAtTime(.001, t); for (let i = 0; i < 6; i++) { out.gain.linearRampToValueAtTime(.22 * k, t + i * .16 + .06); out.gain.linearRampToValueAtTime(.05 * k, t + i * .16 + .15); }
    out.gain.linearRampToValueAtTime(.001, t + 1.05); src.start(t); src.stop(t + 1.1);
  }
}
