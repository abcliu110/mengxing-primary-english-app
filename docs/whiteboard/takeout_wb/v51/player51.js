// 自写播放器：requestAnimationFrame 循环 → drawFrame(ctx, t)。不带 React / Remotion Player。
import { drawFrame, loadAssets, W, H, DUR, CUES } from './scene51.js';
import wk from '../public/wk.woff';
import kalam from '../public/kalam.woff';

const cv = document.getElementById('stage'); cv.width = W; cv.height = H;
const g = cv.getContext('2d');
const btn = document.getElementById('play'), bar = document.getElementById('bar'), lab = document.getElementById('time'), vbtn = document.getElementById('voice');
let t = 0, playing = false, last = 0, loop = true;

// ---------- 英文朗读（Web Speech API，en-US，语速 0.85） ----------
const TTS = window.speechSynthesis;
let voiceOn = localStorage.getItem('wbVoice') !== '0', voice = null, talking = false, holdStart = 0;
function pickVoice() { const vs = TTS ? TTS.getVoices() : []; voice = vs.find(v => /en[-_]US/i.test(v.lang) && /Samantha|Google|Microsoft|Natural/i.test(v.name)) || vs.find(v => /en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null; }
if (TTS) { pickVoice(); TTS.onvoiceschanged = pickVoice; }
function say(text) {
  if (!TTS || !voiceOn) return;
  const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = 0.85; if (voice) u.voice = voice;
  u.onstart = () => { talking = true; }; u.onend = u.onerror = () => { talking = false; };
  talking = true; TTS.speak(u);
}
function hush() { if (TTS) TTS.cancel(); talking = false; }
function showVoice() { vbtn.textContent = voiceOn ? '🔊' : '🔇'; vbtn.title = TTS ? (voiceOn ? '英文朗读：开' : '英文朗读：关') : '这台设备没有语音，改看字幕'; }
vbtn.onclick = () => { voiceOn = !voiceOn; localStorage.setItem('wbVoice', voiceOn ? '1' : '0'); if (!voiceOn) hush(); showVoice(); };
showVoice();

function show() { drawFrame(g, t); bar.value = t; lab.textContent = `${t.toFixed(1)} / ${DUR.toFixed(1)} s`; btn.textContent = playing ? '❚❚' : '▶'; }
function tick(now) {
  if (!playing) return;
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  const nt = t + dt, cue = CUES.find(([at]) => at > t && at <= nt);
  if (cue && talking && voiceOn) {                                   // 上一句还没念完：时间轴停住等
    if (!holdStart) holdStart = now;
    if (now - holdStart < 4000) { show(); requestAnimationFrame(tick); return; }
    hush();                                                          // 等满 4 秒仍没念完：放弃上一句
  }
  holdStart = 0;
  t = nt;
  if (cue) say(cue[1]);
  if (t >= DUR) { if (loop) { t = 0; hush(); } else { t = DUR; playing = false; } }
  show(); requestAnimationFrame(tick);
}
function play() { if (playing) return; if (t >= DUR) t = 0; playing = true; last = performance.now(); requestAnimationFrame(tick); }
function pause() { playing = false; hush(); show(); }
bar.max = DUR; bar.step = 1 / 30;
btn.onclick = () => (playing ? pause() : play());
bar.oninput = () => { pause(); t = +bar.value; show(); };
cv.onclick = () => (playing ? pause() : play());

window.__ready = loadAssets({ wk, kalam }).then(() => { show(); });   // 浏览器要求先点一下才能出声，所以不自动播放
window.__seek = s => { playing = false; hush(); t = s; show(); };
