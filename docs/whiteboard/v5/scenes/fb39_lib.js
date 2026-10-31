// 决策 39 样板 fp_boundedness 四幕共用小工具（不是一幕：没有 export default）
import { GREY, INK, OR } from '../wb5.js';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
export const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;
export function kit(K, C, title, n) {
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  // 朗读句同时在板上「词块拼句」：每个词跟着朗读点亮的节奏（0.36 秒一个）落下来，key 词标橙（符号层：句子是一块块拼出来的）
  const say = (t, en, zh, key = [], { y = 880, until = null, size = 40 } = {}) => {
    const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L });
    const ws = en.split(/\s+/), W = ws.map(w => K.measure(w, size) + 34 + 14), tot = W.reduce((a, b) => a + b, 0);
    let x = 960 - tot / 2; const kk = key.map(k => k.toLowerCase());
    ws.forEach((w, i) => { const cx = x + W[i] / 2; x += W[i]; const on = kk.includes(w.toLowerCase().replace(/[^a-z']/g, ''));
      C.chip({ text: w, x: cx, y: y - 90, size, pad: 17, col: on ? OR : INK, bd: on ? OR : '#9ca3af', from: t + i * 0.36, until: until ?? t + L + 0.4, path: [[t + i * 0.36, cx, y, 0.5, 'back']], z: 5 }); });
    return t + L + 0.4; };
  C.label(`📦 第一性原理 · 可数性 · ${n}`, 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  C.label(title, 1860, 1060, { size: 34, col: INK, from: 0.3, align: 'right', bold: true });   // 顶部留给讲解字幕
  // 刀：从 (x, y0) 往下切到 y1，t 开始 0.6 秒；切完留一条虚线
  const knife = (x, y0, y1, t, until) => {
    C.motion(t, t + 0.8);
    K.prop((g, tt) => {
      const q = clamp((tt - t) / 0.6); if (q <= 0) return;
      g.save(); g.strokeStyle = OR; g.lineWidth = 6; g.setLineDash([12, 10]); g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y0 + (y1 - y0) * q); g.stroke(); g.setLineDash([]);
      if (q < 1) { g.font = '90px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('🔪', x + 30, y0 + (y1 - y0) * q - 40); }
      g.restore();
    }, { from: t, until, z: 7 });
  };
  return { narr, say, knife };
}
