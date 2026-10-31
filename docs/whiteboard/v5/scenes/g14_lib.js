// G14 in / on / at 三幕共用（决策 38 ⑤；啊哈卡 lab/audit38/aha/05_hd_g14.md）。不是场景（无 export default），insightcheck 跳过。
// 三张图：📦 盒子（立体容器）· 桌面（平面接触）· 🎯 靶心（一个点）。全部只由 t 决定。
import { OR, INK, GREY } from '../wb5.js';
import { BLUE, GREEN, FONT } from '../lib/concept.js';
export const COL = { in: BLUE, on: GREEN, at: OR };
export const XS = { in: 400, on: 960, at: 1520 };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
export const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

// shapes(K, { from, y, s, glow:{in:[t0,t1],…} })：画三张图；glow 时段内该图的「几何特征」闪亮（盒子体积涂色 / 桌面那条接触面 / 靶心那个点）
export function shapes(K, { from = 0, y = 400, s = 1, glow = {} } = {}) {
  const on = (k, t) => glow[k] && t >= glow[k][0] && t < glow[k][1];
  const pulse = t => 0.55 + 0.45 * Math.sin(t * 7);
  K.prop((g, t) => {
    const q = clamp((t - from) / 0.6); if (q <= 0) return;
    g.save(); g.globalAlpha = q; g.lineWidth = 6; g.lineJoin = 'round'; g.lineCap = 'round';
    // 盒子：前面方框 + 顶面开口 + 右侧面
    { const cx = XS.in, w = 240 * s, h = 170 * s, d = 70 * s, x0 = cx - w / 2 - d / 4, y0 = y - h / 2 + d / 3;
      if (on('in', t)) { g.fillStyle = `rgba(37,99,235,${0.25 * pulse(t)})`; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + d, y0 - d); g.lineTo(x0 + w + d, y0 - d); g.lineTo(x0 + w + d, y0 + h - d); g.lineTo(x0 + w, y0 + h); g.lineTo(x0, y0 + h); g.closePath(); g.fill(); }
      g.strokeStyle = BLUE; g.strokeRect(x0, y0, w, h);
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + d, y0 - d); g.lineTo(x0 + w + d, y0 - d); g.lineTo(x0 + w, y0); g.moveTo(x0 + w + d, y0 - d); g.lineTo(x0 + w + d, y0 + h - d); g.lineTo(x0 + w, y0 + h); g.stroke(); }
    // 桌子：桌面平行四边形 + 两条腿；glow 时桌面那条线加粗发亮
    { const cx = XS.on, w = 300 * s, d = 50 * s, ty = y + 10 * s;
      g.strokeStyle = GREEN; g.beginPath(); g.moveTo(cx - w / 2, ty); g.lineTo(cx - w / 2 + d, ty - d); g.lineTo(cx + w / 2 + d, ty - d); g.lineTo(cx + w / 2, ty); g.closePath(); g.stroke();
      g.beginPath(); g.moveTo(cx - w / 2 + 20 * s, ty); g.lineTo(cx - w / 2 + 20 * s, ty + 120 * s); g.moveTo(cx + w / 2 - 20 * s, ty); g.lineTo(cx + w / 2 - 20 * s, ty + 120 * s); g.stroke();
      if (on('on', t)) { g.strokeStyle = `rgba(5,150,105,${pulse(t)})`; g.lineWidth = 16; g.beginPath(); g.moveTo(cx - w / 2 + d / 2, ty - d / 2); g.lineTo(cx + w / 2 + d / 2, ty - d / 2); g.stroke(); g.lineWidth = 6; } }
    // 靶心：三圈 + 中心点；glow 时中心点放大闪
    { const cx = XS.at;
      g.strokeStyle = OR; [90, 58, 28].forEach(r => { g.beginPath(); g.arc(cx, y, r * s, 0, 7); g.stroke(); });
      g.fillStyle = OR; g.beginPath(); g.arc(cx, y, (on('at', t) ? 14 + 8 * pulse(t) : 10) * s, 0, 7); g.fill(); }
    g.restore();
  }, { from, z: 1 });
  return { in: [XS.in, y], on: [XS.on, y - 40 * s], at: [XS.at, y] };
}
