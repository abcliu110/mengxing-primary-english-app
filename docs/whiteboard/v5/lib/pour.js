// v5/lib/pour.js —— 倒液体的物理动作（店员关键姿势帧 + 手绘手冲咖啡壶 + 抛物线液柱 + 液面上升），只由 t 决定
// 规则（用户 2026-11-01 硬性要求）：
//   ① 倒咖啡用手冲咖啡壶（KETTLE，鹅颈壶嘴），不用茶壶；
//   ② 倒的时候壶嘴尖低于壶身、朝下指向落点；液柱只从壶嘴尖 SPOUT_TIP 出，初速度沿壶嘴方向、受重力成抛物线落下；
//      倾角与出流同步（过了 R_ON 才出流、回到 R_ON 以下立刻断流 → 断流先于回正）；落进杯子时液面随倒出量上升；
//   ③ 不倒时壶竖着，壶嘴自然朝右上斜。
// 姿势表 poses = [[t, 'rest'|'reach'|'lift'|'pour'], …]：rest = 壶放在桌上、店员站姿；reach = 伸手握住桌上的壶把；
//   lift = 提起到胸前（壶竖着）；pour = 举到下巴高、倾壶（进 pour 后 0.3 s 开始倾，离开 pour 前 0.5 s 开始回正）。
// 店员帧（sprites/bndhd.js）：bar_stand / bar_reach / bar_lift / bar_pour；拳头握点 GRIP 为帧内像素（目测 + alpha 复核）。
// 构建期断言 assertPour（不过就抛错停建）：满倾时壶嘴尖低于壶身形心、壶嘴方向朝下 ≥ 20°、液柱落点在杯口内。
import { INK } from '../wb5.js';
import { KETTLE } from './hd.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const io = q => (q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2);
const invIo = y => (y < 0.5 ? Math.sqrt(y / 2) : 1 - Math.sqrt((1 - y) / 2));
const DEG = Math.PI / 180;
export const R_ON = 30 * DEG, TILT = 58 * DEG, GRAV = 2600, POT_S = 0.5;
export const GRIP = { bar_reach: [188, 292], bar_lift: [189, 238], bar_pour: [176, 168] };
export const FEET = { bar_stand: 115.4, bar_reach: 115.1, bar_lift: 107.2, bar_pour: 107.2 };   // 脚底 4% 带质心 x：换帧时脚不动
const FRAME = { rest: 'bar_stand', reach: 'bar_reach', lift: 'bar_lift', pour: 'bar_pour' };
const UP = 0.3, TIN = 0.55, TOUT = 0.5;

export function pourRig(bar, poses) {
  const sc = bar.h / bar.FI.bar_stand.bottom;
  const gripW = key => { const f = bar.FI[key], g = GRIP[key]; return [bar.x + (g[0] - FEET[key]) * sc, bar.ground - (f.bottom - g[1]) * sc]; };
  const POS = { reach: gripW('bar_reach'), lift: gripW('bar_lift'), pour: gripW('bar_pour') }; POS.rest = POS.reach;
  const TY = POS.reach[1] + KETTLE.BOTTOM * POT_S;                       // 桌面 = 壶放着时壶底
  const P = [...poses].sort((a, b) => a[0] - b[0]);
  const idx = t => { let k = 0; for (let i = 0; i < P.length; i++) if (t >= P[i][0]) k = i; return k; };
  const frames = P.map(([t, s], i) => [i ? t + 0.12 : t, FRAME[s]]);
  const posAt = t => { const k = idx(t), [tk, s] = P[k]; if (t < P[0][0]) return POS[P[0][1]];
    const prev = k ? POS[P[k - 1][1]] : POS[s], q = io(clamp((t - tk) / UP)); return [prev[0] + (POS[s][0] - prev[0]) * q, prev[1] + (POS[s][1] - prev[1]) * q]; };
  const rotAt = t => { const k = idx(t), [tk, s] = P[k]; if (s !== 'pour' || t < tk) return 0; const tEnd = P[k + 1] ? P[k + 1][0] : 1e9;
    return TILT * io(clamp((t - tk - UP) / TIN)) * (1 - io(clamp((t - (tEnd - TOUT)) / TOUT))); };
  const xf = t => { const [x, y] = posAt(t); return { x, y, r: rotAt(t), s: POT_S }; };
  const toW = (x, p) => { const c = Math.cos(x.r), n = Math.sin(x.r); return [x.x + (p[0] * c - p[1] * n) * x.s, x.y + (p[0] * n + p[1] * c) * x.s]; };
  const tipAt = t => toW(xf(t), KETTLE.SPOUT_TIP);
  // 出流窗：每个 pour 姿势一段，倾角过 R_ON 的那段
  const W = []; P.forEach(([tk, s], k) => { if (s !== 'pour') return; const tEnd = P[k + 1] ? P[k + 1][0] : 1e9;
    W.push([tk + UP + TIN * invIo(R_ON / TILT), tEnd - TOUT + TOUT * invIo(1 - R_ON / TILT)]); });
  const vel = t => { const r = rotAt(t), v = 110 + 170 * clamp((r - R_ON) / (TILT - R_ON)), a = KETTLE.SPOUT_DIR + r; return [v * Math.cos(a), v * Math.sin(a)]; };
  const landU = (tip, v, yT) => { const A = 0.5 * GRAV, B = v[1], C = tip[1] - yT; return (-B + Math.sqrt(Math.max(0, B * B - 4 * A * C))) / (2 * A); };
  // 液柱：从壶嘴尖沿抛物线落到 yT(t)。开流时液头以液体自己的下落时间往下伸；断流后液尾离开壶嘴往下掉，掉完才消失
  const stream = (t, yT) => {
    const i = W.findIndex(([on, off]) => t >= on && t < off + 0.6); if (i < 0) return null;
    const [on, off] = W[i], tt = Math.min(t, off), tip = tipAt(tt), v = vel(tt), U = landU(tip, v, yT);
    const head = Math.min(U, t - on), tail = t > off ? t - off : 0; if (tail >= U) return null;
    const pts = []; for (let k = 0; k <= 18; k++) { const u = tail + (head - tail) * k / 18; pts.push([tip[0] + v[0] * u, tip[1] + v[1] * u + 0.5 * GRAV * u * u]); }
    return { pts, landed: head >= U - 1e-6, landX: tip[0] + v[0] * U, tip, U, on, off, i, cut: t > off };
  };
  // 第 i 次倒出的量 0→1（液体落到底才算数：开流 + lag → 断流 + lag）
  const amount = (t, i, lag = 0.12) => { const [on, off] = W[i]; return clamp((t - on - lag) / (off - on)); };
  return { frames, xf, tipAt, stream, amount, W, POS, TY, rotAt, toW, sc, vel, landU };
}

// 构建期断言：t 时刻（满倾）壶嘴尖低于壶身形心、壶嘴朝下、落点在 [cx-half, cx+half]
export function assertPour(rig, t, yT, cx, half) {
  const x = rig.xf(t), tip = rig.toW(x, KETTLE.SPOUT_TIP), body = rig.toW(x, KETTLE.BODY_C), dir = (KETTLE.SPOUT_DIR + x.r) / DEG;
  if (!(tip[1] > body[1] + 15)) throw new Error(`倒咖啡断言：满倾时壶嘴尖 y=${tip[1].toFixed(0)} 不低于壶身形心 y=${body[1].toFixed(0)}`);
  if (!(dir >= 20)) throw new Error(`倒咖啡断言：壶嘴方向 ${dir.toFixed(0)}° 没有朝下（要 ≥20°）`);
  const s = rig.stream(t, yT); if (!s) throw new Error('倒咖啡断言：满倾时没有出流');
  if (cx != null && Math.abs(s.landX - cx) > half) throw new Error(`倒咖啡断言：落点 x=${s.landX.toFixed(0)} 不在杯口内（杯心 ${cx.toFixed(0)}±${half}）`);
  const r0 = rig.xf(-1e3); if (Math.abs(r0.r) > 1e-6) throw new Error('倒咖啡断言：不倒时壶没有竖着');
  return { tip, body, dir, landX: s.landX };
}
// 画液柱：墨色细流（略收细、轻微抖动），落点小水花（相位只由 t 决定）
export function drawStream(g, s, t, { col = INK, w = 6 } = {}) {
  if (!s) return;
  g.save(); g.strokeStyle = col; g.lineCap = 'round'; g.lineJoin = 'round';
  const n = s.pts.length;
  for (let k = 1; k < n; k++) { const [x0, y0] = s.pts[k - 1], [x1, y1] = s.pts[k], wob = Math.sin(t * 29 + k * 1.7) * 0.7;
    g.lineWidth = w * (1 - 0.3 * k / n); g.beginPath(); g.moveTo(x0 + wob, y0); g.lineTo(x1 + wob, y1); g.stroke(); }
  if (s.landed && !s.cut) { const [lx, ly] = s.pts[n - 1];
    for (let i = 0; i < 5; i++) { const ph = (t * 2.3 + i * 0.37) % 1, dx = (i - 2) * 7 * ph, dy = -14 * Math.sin(ph * Math.PI) * (0.6 + 0.1 * i);
      g.globalAlpha = 0.8 * (1 - ph); g.fillStyle = col; g.beginPath(); g.arc(lx + dx, ly + dy, 2.6 - ph * 1.2, 0, 7); g.fill(); } }
  g.restore();
}
