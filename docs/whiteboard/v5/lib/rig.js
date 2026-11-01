// v5/lib/rig.js —— 自研 2D 骨骼（不引入付费 Spine）：骨骼层级 + FK + 两骨 IK + 关节叠盖 + 部件逐笔画出（2026-11-01，pilot_marker_rig_pour 首用）
// 设计：
//   · 部件 = rig/barista_marker.js 里 potrace 矢量化的马克笔线稿（ink 墨线填充 + sil 白底剪影 + strokes 骨架中心线），局部原点 = 关节枢轴，骨骼方向 = 局部 +x；
//   · 骨骼世界变换 {x, y, a}（a = 世界角，弧度）；子骨 = 父骨 ∘ 平移(锚点) ∘ 旋转(局部角)；IK 骨直接给世界角；
//   · ik2：两骨解析 IK（余弦定理），bend = ±1 选肘向；目标够不着时拉直并返回误差 err（构建期断言 err≈0）；
//   · 关节叠盖：上下两节都比关节多画一截（部件表切开时各留 ~14 px 重叠），外侧再垫一个白底墨边的关节圆（画在两节之下），弯曲时外角不露缝；
//   · 逐笔画出：剪影先铺白，墨线按 strokes 顺序被「笔刷」揭开（裁切路径 = 已画中心线加粗成多边形并集），画完后不再裁切；
//   · 一切只由 t 决定（drawFrame(ctx, t) 纯函数，可 seek）。
import { INK, BOARD } from '../wb5.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const ease = {
  lin: q => q,
  io: q => (q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2),                 // 缓入缓出
  io3: q => (q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2),
  out: q => 1 - Math.pow(1 - q, 3),
  back: q => { const c1 = 1.25, c3 = c1 + 1; return 1 + c3 * Math.pow(q - 1, 3) + c1 * Math.pow(q - 1, 2); },   // 轻微超调（≈ 4%）
  sine: q => -(Math.cos(Math.PI * q) - 1) / 2,
};
// 关键帧轨道：keys = [[t, value(数 / 数组), easeName(进入这一帧用的缓动)]]，t 之外夹住
export function track(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, e = 'io'] = keys[i], [t0, v0] = keys[i - 1];
    if (t < t1) { const q = ease[e](clamp((t - t0) / (t1 - t0))); return Array.isArray(v0) ? v0.map((x, k) => x + (v1[k] - x) * q) : v0 + (v1 - v0) * q; }
  }
  return keys[keys.length - 1][1];
}
// ---- 变换 ----
export const xf = (x = 0, y = 0, a = 0) => ({ x, y, a });
export const apply = (T, p) => { const c = Math.cos(T.a), s = Math.sin(T.a); return [T.x + p[0] * c - p[1] * s, T.y + p[0] * s + p[1] * c]; };
export const child = (T, anchor, a) => { const [x, y] = apply(T, anchor); return { x, y, a: T.a + a }; };      // FK：父骨 ∘ 锚点 ∘ 局部角
export const inv = (T, p) => { const c = Math.cos(T.a), s = Math.sin(T.a), dx = p[0] - T.x, dy = p[1] - T.y; return [dx * c + dy * s, -dx * s + dy * c]; };
// ---- 两骨 IK：root → target，L1 / L2，bend = +1 / -1 选肘的一侧；返回两节世界角 + 末端误差 ----
export function ik2(root, target, L1, L2, bend = 1) {
  const dx = target[0] - root[0], dy = target[1] - root[1], d0 = Math.hypot(dx, dy);
  const d = clamp(d0, Math.abs(L1 - L2) + 1e-6, L1 + L2 - 1e-6), base = Math.atan2(dy, dx);
  const cA = clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1), A = Math.acos(cA);
  const a1 = base - bend * A, e = [root[0] + L1 * Math.cos(a1), root[1] + L1 * Math.sin(a1)];
  const a2 = Math.atan2(root[1] + d * Math.sin(base) - e[1], root[0] + d * Math.cos(base) - e[0]);
  const end = [e[0] + L2 * Math.cos(a2), e[1] + L2 * Math.sin(a2)];
  return { a1, a2, elbow: e, end, err: Math.hypot(end[0] - target[0], end[1] - target[1]) };
}

// ---- 部件：预处理（Path2D、笔画累计长度）----
export function prepPart(P) {
  const strokes = P.strokes.map(f => { const pts = []; for (let i = 0; i < f.length; i += 2) pts.push([f[i], f[i + 1]]);
    const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, cum, L: cum[cum.length - 1] }; });
  const L = strokes.reduce((s, k) => s + k.L, 0);
  return { ...P, inkP: new Path2D(P.ink), silP: new Path2D(P.sil), S: strokes, L, brush: Math.max(9, (P.ink_px || 3) * 2 + 7) };
}
// 一条折线画到 len 处的点
const pointAt = (s, len) => { let i = 1; while (i < s.pts.length - 1 && s.cum[i] < len) i++; const k = clamp((len - s.cum[i - 1]) / ((s.cum[i] - s.cum[i - 1]) || 1));
  return [s.pts[i - 1][0] + (s.pts[i][0] - s.pts[i - 1][0]) * k, s.pts[i - 1][1] + (s.pts[i][1] - s.pts[i - 1][1]) * k]; };
// 笔刷多边形（顺时针一致 → nonzero 并集）：线段 = 矩形，顶点 = 八边形
function brushPath(path, a, b, r) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * r, ny = dx / L * r;
  let q = [[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]];
  const area = (q[1][0] - q[0][0]) * (q[2][1] - q[0][1]) - (q[2][0] - q[0][0]) * (q[1][1] - q[0][1]); if (area < 0) q = q.reverse();
  path.moveTo(q[0][0], q[0][1]); for (let i = 1; i < 4; i++) path.lineTo(q[i][0], q[i][1]); path.closePath();
}
function dotPath(path, p, r) { path.moveTo(p[0] + r, p[1]); for (let k = 1; k < 8; k++) path.lineTo(p[0] + r * Math.cos(k * Math.PI / 4), p[1] + r * Math.sin(k * Math.PI / 4)); path.closePath(); }
// q ∈ [0,1]：已画的比例（按笔画长度）。返回笔尖（部件局部坐标）或 null
export function drawPart(g, P, T, q = 1, { a = 1, ink = INK, bg = BOARD } = {}) {
  if (q <= 0 || a <= 0) return null;
  g.save(); g.translate(T.x, T.y); g.rotate(T.a); g.globalAlpha = a;
  g.fillStyle = bg; g.fill(P.silP);
  let tip = null;
  if (q < 1) {
    const goal = P.L * q, clip = new Path2D(); let acc = 0;
    for (const s of P.S) {
      const len = Math.min(s.L, goal - acc); if (len <= 0) break;
      dotPath(clip, s.pts[0], P.brush);
      for (let i = 1; i < s.pts.length; i++) {
        if (s.cum[i] <= len) { brushPath(clip, s.pts[i - 1], s.pts[i], P.brush); dotPath(clip, s.pts[i], P.brush); continue; }
        const e = pointAt(s, len); brushPath(clip, s.pts[i - 1], e, P.brush); dotPath(clip, e, P.brush); break;
      }
      acc += s.L; if (acc >= goal) { tip = pointAt(s, len); break; }
    }
    g.save(); g.clip(clip, 'nonzero'); g.fillStyle = ink; g.fill(P.inkP); g.restore();
  } else { g.fillStyle = ink; g.fill(P.inkP); }
  g.restore();
  return tip ? apply(T, tip) : null;
}
// 关节叠盖圆：白底 + 微抖马克笔圈（固定相位），画在相邻两节之下
export function drawCap(g, p, r, { w = 5.2, a = 1, ph = 0.7 } = {}) {
  if (a <= 0) return;
  g.save(); g.globalAlpha = a; g.beginPath();
  for (let k = 0; k <= 40; k++) { const th = k / 40 * Math.PI * 2, rr = r * (1 + 0.03 * Math.sin(3 * th + ph) + 0.02 * Math.sin(5 * th + 2 * ph)); const x = p[0] + rr * Math.cos(th), y = p[1] + rr * Math.sin(th); k ? g.lineTo(x, y) : g.moveTo(x, y); }
  g.closePath(); g.fillStyle = BOARD; g.fill(); g.strokeStyle = INK; g.lineWidth = w; g.stroke(); g.restore();
}

// 肘外角的叠盖：两节转开以后外侧会露出切口 → 在外侧补一段扇形（白底）+ 圆弧墨线，把上臂外沿接到前臂外沿（画在两节之上）
export function drawElbow(g, p, a1, a2, r, { w = 5.6, a = 1 } = {}) {
  const b = Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1)); if (Math.abs(b) < 3 * Math.PI / 180 || a <= 0) return;
  const s = Math.sign(b), t1 = a1 - s * Math.PI / 2, t2 = a2 - s * Math.PI / 2;
  g.save(); g.globalAlpha = a;
  g.beginPath(); g.moveTo(p[0], p[1]); g.arc(p[0], p[1], r + 1.5, t1, t2, b < 0); g.closePath(); g.fillStyle = BOARD; g.fill();
  g.beginPath(); g.arc(p[0], p[1], r, t1, t2, b < 0); g.strokeStyle = INK; g.lineWidth = w; g.lineCap = 'round'; g.stroke();
  g.restore();
}

// ---- 人物骨骼：躯干 → 头 / 左臂（静止 FK）/ 右臂（IK：上臂 → 前臂 → 手）----
// pose(t) → { root: {x,y,a}, head: 局部角, armL: 局部角, grip: [x,y], ah: 手的世界角, bend }
// 返回 world(t)：所有骨骼世界变换 + 关键点；err = IK 末端误差
export function barista(PARTS, META) {
  const P = Object.fromEntries(Object.entries(PARTS).map(([k, v]) => [k, prepPart(v)]));
  const L1 = P.upper.anchors.elbow[0], L2 = P.fore.anchors.wrist[0], GRIP = P.fist.anchors.grip;
  const world = pose => {
    const torso = pose.root;
    const head = child(torso, P.torso.anchors.neck, pose.head || 0);
    const shR = apply(torso, P.torso.anchors.shR), shL = apply(torso, P.torso.anchors.shL);
    const armL = { x: shL[0], y: shL[1], a: torso.a + (pose.armL ?? 0) };
    // 手的握点 = 目标 → 腕 = 握点 − R(ah)·GRIP → 两骨 IK
    const ah = pose.ah, c = Math.cos(ah), s = Math.sin(ah);
    const wristT = [pose.grip[0] - (GRIP[0] * c - GRIP[1] * s), pose.grip[1] - (GRIP[0] * s + GRIP[1] * c)];
    const k = ik2(shR, wristT, L1, L2, pose.bend ?? 1);
    const upper = { x: shR[0], y: shR[1], a: k.a1 };
    const fore = child(upper, [L1, 0], k.a2 - k.a1);                 // FK 往下传：肘 = 上臂末端（不会有缝）
    const hand = child(fore, [L2, 0], ah - k.a2);
    const grip = apply(hand, GRIP);                                    // 握点由手骨 FK 求出 —— 壶挂在这里
    return { torso, head, armL, upper, fore, hand, grip, elbow: [fore.x, fore.y], wrist: [hand.x, hand.y], err: k.err,
      wristBend: ((ah - k.a2 + Math.PI * 3) % (Math.PI * 2)) - Math.PI, elbowBend: ((k.a2 - k.a1 + Math.PI * 3) % (Math.PI * 2)) - Math.PI };
  };
  // 绘制顺序（下 → 上）：左臂 → 躯干 → 头 → 前臂 → 腕关节圆 → 上臂 → 肘外角叠盖 → 手（壶画在人物之下：拳头盖住壶把 = 握住）
  const ORDER = ['armL', 'torso', 'head', 'fore', 'capW', 'upper', 'capE', 'fist'];
  const draw = (g, W, reveal = {}, { a = 1 } = {}) => {
    let tip = null; const R = META.R_ARM;
    for (const k of ORDER) {
      const q = reveal[k] ?? 1; if (q <= 0) continue;
      if (k === 'capE') { drawElbow(g, W.elbow, W.upper.a, W.fore.a, R, { a: a * clamp(q * 3) }); continue; }
      if (k === 'capW') { drawCap(g, W.wrist, R * 0.75, { a: a * clamp(q * 3), ph: 2.1 }); continue; }
      const T = k === 'fist' ? W.hand : k === 'armL' ? W.armL : W[k];
      const p = drawPart(g, P[k], T, q, { a }); if (p) tip = p;
    }
    return tip;
  };
  return { P, L1, L2, GRIP, world, draw, ORDER };
}
