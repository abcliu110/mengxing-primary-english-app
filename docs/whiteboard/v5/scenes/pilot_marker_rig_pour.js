// 试点短片：黑白马克笔 + 2D 骨骼 · 倒咖啡（2026-11-01，未嵌 App，回答用户「实际效果会不会和第一幅风格图一样、使用骨骼」）
// 风格参考：/workspace/style1_marker.png（黑白马克笔、粗黑线、hachure 排线；只在关键词文字上用橙 #EF7226；底 #FBFBFB、墨 #0A0503）
// 四拍（约 12 s）：① 立场景（柜台 / 咖啡机 / 店员 / 壶 / 杯逐笔画出，笔尖跟随）→ ② 动词重音 pours → ③ 动作（伸手 → 握起提壶 → 倾倒入杯 → 放回）→ ④ 总结 She pours the coffee.
// 人物：rig/barista_marker.js（generate_image 部件表 → potrace 矢量化）挂在 lib/rig.js 骨骼上：躯干 → 头；右臂两骨 IK（握点 = 壶把），左臂静止 FK；
//   壶锁在手骨上（壶的位姿由手骨 FK 求出，不是另算），手臂与壶同步转动；关节叠盖（两节重叠 + 白底关节圆）。
// 物理：复用 lib/pour.js 的常量 / 规则 / assertPour / drawStream（倾角 > 30° 才出流、断流先于回正、满倾壶嘴尖低于壶身形心、壶嘴朝下 ≥ 20°、落点在杯口内、液面随倒出量上升）。
import { scene, OR, INK, GREY, BOARD } from '../wb5.js';
import { hd, KETTLE, MUG } from '../lib/hd.js';
import { R_ON, TILT, GRAV, assertPour, drawStream } from '../lib/pour.js';
import { barista, track, apply, ik2 } from '../lib/rig.js';
import { PARTS, META } from '../rig/barista_marker.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const D = Math.PI / 180;

export default function build() {
  const K = scene({}), H = hd(K), R = barista(PARTS, META);
  const MC = document.createElement('canvas').getContext('2d');
  // 逐字手写（与 fp_boundedness_1_hd 同一画法：之字形揭开，笔尖跟随）
  const hand = (str, x, y, size, { t0 = K.cur, col = INK, rate = 14, align = 'left' } = {}) => {
    const font = `${size}px Kalam, WK`; MC.font = font;
    const chars = [...str], ws = chars.map(ch => MC.measureText(ch).width), w = ws.reduce((a, b) => a + b, 0), x0 = align === 'center' ? x - w / 2 : x, t1 = t0 + chars.length / rate;
    K.B.push({ kind: 'custom', t0, t1, col, start: () => [x0, y - size * 0.3], end: () => [x0 + w, y - size * 0.3], draw: (g, q) => {
      const n = chars.length, k = Math.min(n, q * n), done = Math.floor(k); let xx = x0, tip = null;
      g.save(); g.font = font; g.fillStyle = col; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
      chars.forEach((ch, i) => {
        if (i < done) g.fillText(ch, xx, y);
        else if (i === done && k < n) { const zz = DG.zigzag(xx - 2, y - size * 0.95, ws[i] + 4, size * 1.15, 3), cum = DG.cum(zz), dd = cum[cum.length - 1] * (k - done);
          g.save(); g.clip(DG.revealMask(zz, cum, dd, size * 0.62)); g.fillText(ch, xx, y); g.restore(); tip = DG.pointAt(zz, cum, dd); }
        xx += ws[i]; });
      g.restore(); return q < 1 ? (tip || [x0 + w, y]) : null; } });
    return { x0, w, t1 };
  };
  const words = (segs, x, y, size, t0, rate = 16) => {   // [[文字, 颜色]…] 连写，整体居中
    MC.font = `${size}px Kalam, WK`; const tot = segs.reduce((s, [str]) => s + MC.measureText(str).width, 0); let xx = x - tot / 2, t = t0; const out = [];
    for (const [str, col] of segs) { const r = hand(str, xx, y, size, { t0: t, col, rate }); out.push(r); xx += r.w; t = r.t1 + 0.02; }
    return { t1: t, segs: out };
  };

  // ===== 舞台几何 =====
  const CT = 790;                                   // 柜台面
  const ROOT = { x: 700, y: 1010 };                 // 躯干枢轴（胯部）
  const KS = 0.8, CS = 0.72;                        // 壶 / 杯缩放
  const HOFF = -10 * D;                             // 手骨角 − 壶角（握法：拳头比壶把略上扬 10°）
  const KREST = [1080, CT - KETTLE.BOTTOM * KS];     // 壶放在柜台上时的握点（壶把中点）
  const POUR = [1150, 545];                          // 倾倒时握点（下巴以下、抬肘）
  // ===== 时间表（四拍）=====
  const B2 = 3.7, B3 = B2 + 1.4;
  const T_REACH = B3, T_GRIP = B3 + 0.75, T_LIFT = T_GRIP + 0.18, T_ST = T_LIFT + 0.5, T_SH = 0.14, T_UP = T_ST + T_SH + 0.5, T_TILT = T_UP + 0.05, T_FULL = T_TILT + 0.6,
    T_BACK = T_FULL + 1.1, T_UPR = T_BACK + 0.55, T_ST2 = T_UPR + 0.45, T_DOWN = T_ST2 + T_SH + 0.45, T_REL = T_DOWN + 0.12, T_HOME = T_REL + 0.6, B4 = T_REL - 0.1;
  const rootAt = t => ({ x: ROOT.x, y: ROOT.y, a: track([[0, 0], [T_REACH, 0], [T_GRIP, 1.6 * D], [T_UP, 0.6 * D], [T_FULL, 1.8 * D], [T_BACK, 1.8 * D], [T_HOME, 0]], t) + 0.25 * D * Math.sin(t * 2.1) });
  // 伸直点：手臂伸到 100.2%（够不着一点点 → IK 两个解重合成一条直线），肘向在这里从「朝下」换到「抬肘」，不跳；按那一刻的真实肩位算
  const ST = (() => { const sh = apply(rootAt(T_ST + T_SH / 2), R.P.torso.anchors.shR), dir = [Math.cos(20 * D), Math.sin(20 * D)], L = 1.002 * (R.L1 + R.L2), w = [sh[0] + dir[0] * L, sh[1] + dir[1] * L], a = HOFF;
    return [w[0] + R.GRIP[0] * Math.cos(a) - R.GRIP[1] * Math.sin(a), w[1] + R.GRIP[0] * Math.sin(a) + R.GRIP[1] * Math.cos(a)]; })();
  // 手自然垂在身侧（柜台后面，被台面挡住）：腕 = 肩 + 97% 臂长 · 方向 84°
  const AREST = 84 * D, REST = (() => { const sh = apply(rootAt(0), R.P.torso.anchors.shR), L = 0.97 * (R.L1 + R.L2), w = [sh[0] + L * Math.cos(AREST), sh[1] + L * Math.sin(AREST)];
    return [w[0] + R.GRIP[0] * Math.cos(AREST) - R.GRIP[1] * Math.sin(AREST), w[1] + R.GRIP[0] * Math.sin(AREST) + R.GRIP[1] * Math.cos(AREST)]; })();
  // 握点 [x, y]、手骨世界角 ah、肘向 bend（+1 抬肘 / −1 肘朝下）——关键帧（进入该帧用的缓动）
  const GKEY = [[0, REST], [T_REACH, REST], [T_GRIP, KREST, 'io3'], [T_LIFT, KREST], [T_ST, ST, 'io'], [T_ST + T_SH, ST], [T_UP, POUR, 'back'], [T_UPR, POUR], [T_ST2, ST, 'io'], [T_ST2 + T_SH, ST], [T_DOWN, KREST, 'io'], [T_REL, KREST], [T_HOME, REST, 'io']];
  const AKEY = [[0, AREST], [T_REACH, AREST], [T_GRIP, HOFF, 'io3'], [T_TILT, HOFF], [T_FULL, HOFF + TILT, 'back'], [T_BACK, HOFF + TILT], [T_UPR, HOFF, 'io'], [T_REL, HOFF], [T_HOME, AREST, 'io']];
  const BKEY = [[0, -1], [T_ST, -1], [T_ST + T_SH, 1, 'sine'], [T_ST2, 1], [T_ST2 + T_SH, -1, 'sine']];   // 肘向只在伸直停顿里换
  const pose = t => ({
    root: rootAt(t),
    head: track([[0, 0], [T_REACH, 0], [T_GRIP, 5 * D], [T_UP, 2 * D], [T_FULL, 7 * D], [T_BACK, 7 * D], [T_HOME + 0.3, 0]], t),
    armL: 92 * D + 1.2 * D * Math.sin(t * 2.1 + 0.6),
    grip: track(GKEY, t), ah: track(AKEY, t), bend: track(BKEY, t),
  });
  const W = t => R.world(pose(t));
  // 壶：t < T_GRIP 与 t ≥ T_REL 放在柜台上；中间锁在手骨上（位姿 = 手骨 FK 的握点 + 手骨角 − HOFF）
  const held = t => t >= T_GRIP && t < T_REL;
  const kxf = t => { if (!held(t)) return { x: KREST[0], y: KREST[1], r: 0, s: KS }; const w = W(t); return { x: w.grip[0], y: w.grip[1], r: w.hand.a - HOFF, s: KS }; };
  // ===== 倒液物理（规则同 lib/pour.js；出流窗由壶角数值求出）=====
  const toW = (x, p) => { const c = Math.cos(x.r), n = Math.sin(x.r); return [x.x + (p[0] * c - p[1] * n) * x.s, x.y + (p[0] * n + p[1] * c) * x.s]; };
  const rotAt = t => kxf(t).r;
  const WIN = []; { let on = null; for (let t = B3; t <= B4; t += 0.001) { const r = rotAt(t); if (on == null && r > R_ON) on = t; else if (on != null && r <= R_ON) { WIN.push([on, t]); on = null; } } }
  const vel = t => { const r = rotAt(t), v = 110 + 170 * clamp((r - R_ON) / (TILT - R_ON)), a = KETTLE.SPOUT_DIR + r; return [v * Math.cos(a), v * Math.sin(a)]; };
  const landU = (tip, v, yT) => { const A = 0.5 * GRAV, Bq = v[1], C = tip[1] - yT; return (-Bq + Math.sqrt(Math.max(0, Bq * Bq - 4 * A * C))) / (2 * A); };
  const tipAt = t => toW(kxf(t), KETTLE.SPOUT_TIP);
  const stream = (t, yT) => {
    const i = WIN.findIndex(([on, off]) => t >= on && t < off + 0.6); if (i < 0) return null;
    const [on, off] = WIN[i], tt = Math.min(t, off), tip = tipAt(tt), v = vel(tt), U = landU(tip, v, yT);
    const head = Math.min(U, t - on), tail = t > off ? t - off : 0; if (tail >= U) return null;
    const pts = []; for (let k = 0; k <= 18; k++) { const u = tail + (head - tail) * k / 18; pts.push([tip[0] + v[0] * u, tip[1] + v[1] * u + 0.5 * GRAV * u * u]); }
    return { pts, landed: head >= U - 1e-6, landX: tip[0] + v[0] * U, tip, U, on, off, i, cut: t > off };
  };
  const amount = (t, lag = 0.12) => (WIN.length ? clamp((t - WIN[0][0] - lag) / (WIN[0][1] - WIN[0][0])) : 0);
  const PR = { xf: t => (t < -100 ? { x: 0, y: 0, r: 0, s: KS } : kxf(t)), toW, stream, rotAt };
  const FILL = 0.78, level = t => CT - CS * (8 + 98 * FILL * amount(t));
  const tMid = WIN.length ? (WIN[0][0] + WIN[0][1]) / 2 : T_FULL + 0.5;
  const CUPX = (() => { const tip = tipAt(tMid), v = vel(tMid), u = landU(tip, v, CT - CS * 60); return Math.round(tip[0] + v[0] * u); })();

  // ===== 构建期断言（不过就抛错，页面报错 → check_hd 不合格）=====
  const STATS = { win: WIN.map(w => w.map(x => +x.toFixed(3))), cupX: CUPX };
  if (WIN.length !== 1) throw new Error(`倒咖啡断言：出流窗应为 1 段，实际 ${WIN.length}`);
  STATS.full = assertPour(PR, T_FULL + 0.3, level(T_FULL + 0.3), CUPX, CS * 50);
  { let maxErr = 0, maxWB = 0, maxJump = 0, lock = 0, prevK = null, lvl = -1e9, flowBad = 0, gap = 0;
    let tUpright = null;
    for (let t = 0; t <= B4 + 2; t += 0.004) {
      const w = W(t), kx = kxf(t);
      if (w.err > maxErr) { maxErr = w.err; STATS.errAt = +t.toFixed(3); } if (t > T_REACH) maxWB = Math.max(maxWB, Math.abs(w.wristBend));
      gap = Math.max(gap, Math.hypot(apply(w.upper, [R.L1, 0])[0] - w.fore.x, apply(w.upper, [R.L1, 0])[1] - w.fore.y), Math.hypot(apply(w.fore, [R.L2, 0])[0] - w.hand.x, apply(w.fore, [R.L2, 0])[1] - w.hand.y));
      if (held(t)) lock = Math.max(lock, Math.hypot(kx.x - w.grip[0], kx.y - w.grip[1]), Math.abs(kx.r - (w.hand.a - HOFF)));
      if (prevK) maxJump = Math.max(maxJump, Math.hypot(kx.x - prevK.x, kx.y - prevK.y));
      prevK = kx;
      const inWin = WIN.some(([on, off]) => t >= on && t < off);
      if (inWin !== (kx.r > R_ON)) flowBad++;
      const L = -level(t); if (L < lvl - 1e-9) throw new Error('倒咖啡断言：液面下降了'); lvl = L;
      if (t > WIN[0][1] && tUpright == null && kx.r < 1 * D) tUpright = t;
    }
    if (flowBad > 2) throw new Error(`倒咖啡断言：出流与倾角 > 30° 不同步（${flowBad} 个取样）`);
    if (!(tUpright > WIN[0][1])) throw new Error('倒咖啡断言：断流没有先于回正');
    if (maxErr > 4) throw new Error(`骨骼断言：IK 末端误差 ${maxErr.toFixed(2)} px > 4（t=${STATS.errAt}，ST=${T_ST.toFixed(2)}）`);
    if (lock > 1e-6) throw new Error(`骨骼断言：壶没有锁在手骨上（偏差 ${lock}）`);
    if (gap > 1e-6) throw new Error(`骨骼断言：关节断开 ${gap}`);
    if (maxJump > 40) throw new Error(`骨骼断言：壶一帧跳了 ${maxJump.toFixed(1)} px（握起 / 放下不连续）`);
    const gErr = Math.hypot(W(T_GRIP).grip[0] - KREST[0], W(T_GRIP).grip[1] - KREST[1]), rErr = Math.hypot(W(T_REL - 1e-4).grip[0] - KREST[0], W(T_REL - 1e-4).grip[1] - KREST[1]);
    if (gErr > 1 || rErr > 1) throw new Error(`骨骼断言：握起 / 放下时手没到壶把（${gErr.toFixed(2)} / ${rErr.toFixed(2)} px）`);
    Object.assign(STATS, { ikMaxErr: +maxErr.toFixed(3), wristMaxDeg: +(maxWB / D).toFixed(1), kettleMaxStep: +maxJump.toFixed(2), lockErr: lock, jointGap: gap, flowBad, cutBeforeUpright: +(tUpright - WIN[0][1]).toFixed(3), gripErr: +gErr.toFixed(3), relErr: +rErr.toFixed(3) });
  }
  globalThis.__RIGSTATS = STATS;

  // ===== ① 立场景：柜台 → 咖啡机 → 店员 → 壶 → 杯（逐笔，笔尖跟随）=====
  K.at(0.1);
  K.line(120, 1006, 1800, 1006, { w: 5, rough: 0.6, bow: 0.4, speed: 22000, min: 0.05 });
  K.rect(300, CT, 1460, 20, { w: 5.5, rough: 0.8, speed: 22000, min: 0.05 });                         // 台面
  K.rect(330, CT + 20, 560, 186, { w: 5, rough: 0.9, speed: 22000, fill: INK, fillW: 1.7, min: 0.05 });    // 柜身两格（排线）
  K.rect(905, CT + 20, 820, 186, { w: 5, rough: 0.9, speed: 22000, min: 0.05 });
  // 店员：逐个部件画出（剪影先铺白，墨线被笔刷揭开）
  const DRAW = [['head', 0], ['torso', 0], ['armL', 0], ['upper', 0], ['capE', 0.06], ['fore', 0], ['capW', 0.05], ['fist', 0]];
  const SPEED = 7600; let tc = K.cur + 0.02; const REV = {};
  for (const [k, min] of DRAW) { const L = R.P[k] ? R.P[k].L : 0, d = Math.max(min, L / SPEED, 0.05); REV[k] = [tc, tc + d]; tc += d + 0.02; }
  const tChar1 = tc;
  const revAt = t => Object.fromEntries(Object.entries(REV).map(([k, [a, b]]) => [k, clamp((t - a) / (b - a))]));
  // 笔尖：报正在画的部件的笔尖（真正的画在 K.prop 里）
  K.B.push({ kind: 'custom', t0: REV.head[0], t1: tChar1, col: INK, start: () => apply(W(0).head, R.P.head.S[0].pts[0]), end: () => [ROOT.x, CT - 40],
    draw(g, q, ft) { if (q >= 1) return null; return penTip(ft); } });
  let penCache = [-1, null];
  const penTip = t => { if (penCache[0] === t) return penCache[1]; const w = W(t), rv = revAt(t); let tip = null;
    for (const [k] of DRAW) { const q = rv[k]; if (q <= 0 || q >= 1 || !R.P[k]) continue; const P = R.P[k], T = k === 'fist' ? w.hand : k === 'armL' ? w.armL : w[k];
      let acc = 0, goal = P.L * q; for (const s of P.S) { if (acc + s.L >= goal) { const len = goal - acc; let i = 1; while (i < s.pts.length - 1 && s.cum[i] < len) i++; const kk = clamp((len - s.cum[i - 1]) / ((s.cum[i] - s.cum[i - 1]) || 1)); tip = apply(T, [s.pts[i - 1][0] + (s.pts[i][0] - s.pts[i - 1][0]) * kk, s.pts[i - 1][1] + (s.pts[i][1] - s.pts[i - 1][1]) * kk]); break; } acc += s.L; } }
    penCache = [t, tip]; return tip; };
  // 人物层：只画柜台面以上（人站在柜台后面）
  K.prop((g, t) => { g.save(); g.beginPath(); g.rect(-500, -500, 3000, CT + 3 + 500); g.clip(); R.draw(g, W(t), revAt(t)); g.restore(); }, { from: REV.head[0], until: 1e9, z: 2 });
  // 壶（手冲壶，鹅颈壶嘴；黑色排线）：画在人物之下 → 拳头盖在壶把上 = 握住
  K.at(tChar1 + 0.02);
  const kettle = H.sketch([
    { d: KETTLE.body, w: 5.5, fill: INK, fillW: 1.7, gap: 13, solid: BOARD, min: 0.04 },
    { d: KETTLE.lid, w: 4.5, min: 0.04 }, { d: KETTLE.knob, w: 4.5, min: 0.04 }, { d: KETTLE.handle, w: 6, min: 0.04 },
    { d: KETTLE.spoutOut, w: 4.5, min: 0.04 }, { d: KETTLE.spoutIn, w: 4.5, min: 0.04 }, { d: KETTLE.spoutCap, w: 4, min: 0.03 },
  ], { t0: K.cur, speed: 7500, xf: kxf, z: 1.5 });
  // 杯：逐笔画出，液面随倒出量上升（黑色排线）
  const inner = new Path2D('M-58 -116 L-50 -8 L50 -8 L58 -116 Z');
  const cup = H.sketch([{ d: MUG.body, w: 5, min: 0.05 }, { d: MUG.rim, w: 4.5, min: 0.04 }, { d: MUG.rimBack, w: 3, col: GREY, min: 0.04 }, { d: MUG.handle, w: 5, min: 0.04 }], { t0: kettle.t1 + 0.02, speed: 6500, z: 2.6, xf: () => ({ x: CUPX, y: CT, s: CS }),
    after: (g, t) => { const f = FILL * amount(t); if (f <= 0) return; const y = -8 - 98 * f, wob = Math.sin(t * 13) * 2.5 * clamp((WIN[0][1] + 0.6 - t) / 0.6);
      const p = new Path2D(); p.moveTo(-60, y + wob); p.lineTo(60, y - wob); p.lineTo(60, 0); p.lineTo(-60, 0); p.closePath();
      g.save(); g.clip(inner); H.hatchFill(g, p, { col: INK, gap: 8, w: 3, a: 0.85 * g.globalAlpha, box: [-70, -130, 140, 140] });
      g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); g.moveTo(-60, y + wob); g.lineTo(60, y - wob); g.stroke(); g.restore(); } });
  Object.assign(STATS, { rev: Object.fromEntries(Object.entries(REV).map(([k, v]) => [k, v.map(x => +x.toFixed(2))])), kettleT: [kettle.t0, kettle.t1].map(x => +x.toFixed(2)), cupT1: +cup.t1.toFixed(2) });
  K.at(cup.t1 + 0.02);
  // 咖啡机（背景，右后方）
  K.rect(1450, 470, 300, 250, { w: 5, rough: 0.9, speed: 22000, min: 0.05 });
  K.rect(1470, 495, 260, 70, { w: 4, rough: 0.9, speed: 22000, fill: INK, fillW: 1.6, min: 0.05 });
  K.circle(1690, 530, 26, { w: 4, min: 0.05, speed: 22000 });
  K.path([[1560, 600], [1560, 640], [1600, 640], [1600, 600]], { w: 4, rough: 0.7, min: 0.05, speed: 22000 });
  K.line(1600, 622, 1660, 640, { w: 6, rough: 0.6, min: 0.05, speed: 22000 });
  if (K.cur > B2) throw new Error(`立场景超时：${K.cur.toFixed(2)} > ${B2}`);
  // 液柱
  K.prop((g, t) => drawStream(g, stream(t, level(t) - 2), t, { w: 5.5 }), { from: B3, until: 1e9, z: 2.55 });
  K.narr('咖啡馆里：店员、一把手冲壶、一只杯子。', 0.3, B2 - 0.1);

  // ===== ② 动词重音：pours =====
  K.at(B2 + 0.05);
  const pw = hand('pours', 1460, 300, 120, { t0: B2 + 0.05, col: OR, rate: 7, align: 'center' });
  K.at(pw.t1 + 0.05); K.line(pw.x0 - 4, 326, pw.x0 + pw.w + 6, 322, { w: 5, rough: 0.7, min: 0.12 });
  K.say(B2 + 0.2, 'She pours the coffee.', { key: ['pours'], zh: '她倒咖啡。', len: 2.3 });
  K.narr('动词 pours：倒（液体从壶里流出来）。', B2 + 0.1, B3 - 0.05);
  // ===== ③ 动作 =====
  K.narr('伸手握住壶把 → 提起 → 倾斜，咖啡从壶嘴流进杯子 → 放回。', B3, B4 - 0.1);
  K.cam(B3 - 0.2, { x: 1010, y: 560, z: 1.22, d: 0.7 });
  K.cam(B4 - 0.4, { x: 960, y: 540, z: 1.0, d: 0.7 });
  // ===== ④ 总结 =====
  const sum = words([['She ', INK], ['pours', OR], [' the coffee.', INK]], 1315, 884, 70, B4 + 0.1, 20);   // 写在柜台正面右格（像店里的小黑板）
  K.say(B4 + 0.2, 'She pours the coffee.', { key: ['pours'], zh: '她倒咖啡。', len: 2.4 });
  K.narr('看动作，记动词：She pours the coffee.', B4 + 0.1, B4 + 2.3);
  K.end(Math.max(sum.t1, B4 + 2.3, T_HOME) + 0.4);
  return K.done();
}
