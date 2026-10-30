// 自写播放器：requestAnimationFrame 循环 → drawFrame(ctx, t)。不带 React / Remotion Player。
import { drawFrame, loadAssets, W, H, DUR } from './scene51.js';
import wk from '../public/wk.woff';
import kalam from '../public/kalam.woff';

const cv = document.getElementById('stage'); cv.width = W; cv.height = H;
const g = cv.getContext('2d');
const btn = document.getElementById('play'), bar = document.getElementById('bar'), lab = document.getElementById('time');
let t = 0, playing = false, last = 0, loop = true;

function show() { drawFrame(g, t); bar.value = t; lab.textContent = `${t.toFixed(1)} / ${DUR.toFixed(1)} s`; btn.textContent = playing ? '❚❚' : '▶'; }
function tick(now) {
  if (!playing) return;
  t += Math.min(0.1, (now - last) / 1000); last = now;
  if (t >= DUR) { if (loop) t = 0; else { t = DUR; playing = false; } }
  show(); requestAnimationFrame(tick);
}
function play() { if (playing) return; if (t >= DUR) t = 0; playing = true; last = performance.now(); requestAnimationFrame(tick); }
function pause() { playing = false; show(); }
bar.max = DUR; bar.step = 1 / 30;
btn.onclick = () => (playing ? pause() : play());
bar.oninput = () => { pause(); t = +bar.value; show(); };
cv.onclick = () => (playing ? pause() : play());

window.__ready = loadAssets({ wk, kalam }).then(() => { show(); if (!/still/.test(location.hash)) play(); });
window.__seek = s => { playing = false; t = s; show(); };
