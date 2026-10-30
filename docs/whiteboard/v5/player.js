// v5 通用播放器：requestAnimationFrame 循环 → drawFrame(ctx, t)。不带 React / Remotion Player。
// 场景脚本（每幕单独一段，在引擎之后加载）把 build 函数挂到 globalThis.__WB5_SCENE__；字体由 build.mjs 通过 __FONTS__ 注入（全 App 共用一份）。
const buildScene = () => globalThis.__WB5_SCENE__();
let drawFrame, loadAssets, W = 1920, H = 1080, DUR = 1, CUES = [];
const cv = document.getElementById('stage'); cv.width = W; cv.height = H;
const g = cv.getContext('2d');
const btn = document.getElementById('play'), bar = document.getElementById('bar'), lab = document.getElementById('time'), vbtn = document.getElementById('voice');
let t = 0, playing = false, last = 0, loop = true;

// ---------- 英文朗读（Web Speech API，en-US，语速 0.85）：先读重点词（word），再读整句 ----------
// 预览框（sandbox iframe）里读 localStorage / speechSynthesis 可能直接抛错 → 一律包 try/catch（SOP §17 #9）
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
let TTS = null; try { TTS = window.speechSynthesis || null; } catch (e) {}
let voiceOn = store.get('wbVoice') !== '0', voice = null, talking = false, holdStart = 0;
function pickVoice() { let vs = []; try { vs = TTS ? TTS.getVoices() : []; } catch (e) {} voice = vs.find(v => /en[-_]US/i.test(v.lang) && /Samantha|Google|Microsoft|Natural/i.test(v.name)) || vs.find(v => /en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null; }
if (TTS) { pickVoice(); try { TTS.onvoiceschanged = pickVoice; } catch (e) {} }
function utter(text, last) {
  const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = 0.85; if (voice) u.voice = voice;
  if (last) { u.onend = u.onerror = () => { talking = false; }; }
  return u;
}
function say(text, word) {
  if (!TTS || !voiceOn) return;
  talking = true;
  try { if (word) TTS.speak(utter(word, false)); TTS.speak(utter(text, true)); } catch (e) { talking = false; }
}
function hush() { try { if (TTS) TTS.cancel(); } catch (e) {} talking = false; }
function showVoice() { vbtn.textContent = voiceOn ? '🔊' : '🔇'; vbtn.title = TTS ? (voiceOn ? '英文朗读：开' : '英文朗读：关') : '这台设备没有语音，改看字幕'; }
vbtn.onclick = () => { voiceOn = !voiceOn; store.set('wbVoice', voiceOn ? '1' : '0'); if (!voiceOn) hush(); showVoice(); };
showVoice();

function show() { if (!drawFrame) return; drawFrame(g, t); bar.value = t; lab.textContent = `${t.toFixed(1)} / ${DUR.toFixed(1)} s`; btn.textContent = playing ? '❚❚' : '▶'; }
function tick(now) {
  if (!playing) return;
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  const nt = t + dt, cue = CUES.find(([at]) => at > t && at <= nt);
  if (cue && talking && voiceOn) {                                   // 上一句还没念完：时间轴停住等（最多 4 秒）
    if (!holdStart) holdStart = now;
    if (now - holdStart < 4000) { show(); requestAnimationFrame(tick); return; }
    hush();
  }
  holdStart = 0; t = nt;
  if (cue) say(cue[1], cue[2]);
  if (t >= DUR) { if (loop) { t = 0; hush(); } else { t = DUR; playing = false; } }
  show(); requestAnimationFrame(tick);
}
function play() { if (playing) return; if (t >= DUR) t = 0; playing = true; last = performance.now(); requestAnimationFrame(tick); }
function pause() { playing = false; hush(); show(); }
btn.onclick = () => (playing ? pause() : play());
bar.oninput = () => { pause(); t = +bar.value; show(); };
// 决策 29 O2：标签页切到后台就暂停（否则回来时时间轴一下跳过一大段、朗读和画面错位）
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) pause(); });
cv.onclick = () => (playing ? pause() : play());
// 先装字体（场景排版要量真实字宽）→ 建场景 → 装角色帧 → 画第一帧。浏览器要求先点一下才能出声，所以不自动播放。
const fontsReady = Promise.all([['WK', __FONTS__.wk], ['Kalam', __FONTS__.kalam]].map(([n, u]) => new FontFace(n, `url(${u})`).load().then(f => document.fonts.add(f)).catch(() => {})));
// 场景脚本在引擎之后执行；字体若已缓存，fontsReady 会在两段脚本之间就兑现 → 必须等 DOMContentLoaded（此时场景脚本一定已跑完）
const sceneReady = new Promise(r => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', r) : r()));
window.__ready = Promise.all([fontsReady, sceneReady]).then(() => {
  const SC = buildScene(); ({ drawFrame, loadAssets, W, H, DUR, CUES } = SC);
  bar.max = DUR; bar.step = 1 / 30; window.__cues = CUES; window.__dur = DUR;   return loadAssets();
}).then(() => { show(); });
window.__seek = s => { playing = false; hush(); t = s; show(); };
