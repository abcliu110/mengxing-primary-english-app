// 比较三兄弟（G37 / G38 / G39）共用：身高尺 + 人柱（决策 38 ⑧；啊哈卡 lab/audit38/aha/08_hd_g37_39.md）。不是场景（无 export default）。
import { OR, INK, GREY } from '../wb5.js';
import { BLUE, GREEN, FONT } from '../lib/concept.js';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const EQ = q => 1 - Math.pow(1 - q, 3);
export const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
export const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;
// 身高尺：左边刻度（cm），base = 地面 y，px = 每厘米像素，lo = 刻度起点
export function ruler(K, { x = 200, base = 820, px = 3.2, lo = 60, hi = 170, step = 10, from = 0 } = {}) {
  K.prop((g, t) => {
    const q = clamp((t - from) / 0.6); if (q <= 0) return;
    g.save(); g.globalAlpha = q; g.strokeStyle = GREY; g.lineWidth = 4; g.beginPath(); g.moveTo(x, base); g.lineTo(x, base - (hi - lo) * px); g.stroke();
    g.font = FONT(26); g.fillStyle = GREY; g.textAlign = 'right'; g.textBaseline = 'middle';
    for (let c = lo; c <= hi; c += step) { const y = base - (c - lo) * px; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 16, y); g.stroke(); if (c % 20 === 0) g.fillText(String(c), x - 10, y); }
    g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(x, base); g.lineTo(1800, base); g.stroke();
    g.restore();
  }, { from, z: 0 });
  return c => base - (c - lo) * px;
}
// 人柱：cm 可随时间变（cmKeys=[[t,cm],…]），头顶 emoji，脚下名字；hi=[[t0,t1]] 头顶高出部分涂橙
export function person(K, { x, y0, base, emoji = '🧒', name = '', cmAt, col = BLUE, from = 0, w = 120, extraAt = null }) {
  K.prop((g, t) => {
    const q = clamp((t - from) / 0.6); if (q <= 0) return;
    const top = base - (base - y0(cmAt(t))) * (0.3 + 0.7 * EQ(q));
    g.save(); g.fillStyle = col + '33'; g.strokeStyle = col; g.lineWidth = 5; g.beginPath(); g.roundRect(x - w / 2, top, w, base - top, 14); g.fill(); g.stroke();
    if (extraAt) { const e = extraAt(t); if (e) { g.fillStyle = 'rgba(239,114,38,.75)'; g.fillRect(x - w / 2 + 3, top, w - 6, e.px); } }
    g.fillStyle = '#000'; g.font = '84px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'bottom'; g.fillText(emoji, x, top + 6);
    g.font = FONT(36, true); g.fillStyle = col; g.textBaseline = 'top'; g.fillText(name, x, base + 12);
    g.restore();
  }, { from, z: 2 });
}
// 分段常量 cm
export const cmSteps = keys => t => { let v = keys[0][1]; for (const [kt, kv, d = 0.6] of keys) { if (t >= kt) { const q = clamp((t - kt) / d); v = v + (kv - v) * q; } } return v; };
