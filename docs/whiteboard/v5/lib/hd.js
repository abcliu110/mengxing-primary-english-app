// v5/lib/hd.js —— §2.9 v5.1「全部手绘」道具层（2026-11-01，fp_boundedness_1_hd 样板起用）
// 目的：会动的道具（咖啡壶、杯、刀、苹果、面包、数字块……）也用 rough.js 线条逐笔画出、笔尖跟随，画完以后整件道具随 t 移动 / 旋转。
//   wb5 的 K.R 只能画「钉在世界坐标上」的静态线条；这里把同一套画法（种子固定 → flatten 折线 → 两遍描边同时推进 → hachure 描完淡入）
//   放进道具的局部坐标系，再由 xf(t) → {x, y, r, s, a} 摆到世界里。xf 只由 t 决定，可 seek。
// 用法：const H = hd(K);
//   const pot = H.sketch([{ d: 'M…', fill: OR2 }, { d: 'M…' }], { t0, speed, z, xf: t => ({ x, y, r }) });   // d = SVG path（局部坐标）
//   pot.t1 → 画完时刻；H.world(xf(t), [lx, ly]) → 局部点在世界里的位置（壶嘴尖、刀刃……都从同一套几何取）
// 硬规则：不出现任何 emoji / 位图道具；只用墨色 INK + 单强调色 OR（浅橙 OR2 只作辅助排线）。
import { INK, OR, OR2, BOARD } from '../wb5.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const sineInOut = q => -(Math.cos(Math.PI * q) - 1) / 2;

// rough drawable → 折线（与 wb5.js 同一算法：move / lineTo / bcurveTo，贝塞尔细分 10 段）
function flatten(drawable, type = 'path') {
  const out = [];
  for (const set of drawable.sets) {
    if (set.type !== type) continue;
    let cur = null, last = [0, 0];
    for (const op of set.ops) {
      const d = op.data;
      if (op.op === 'move') { cur = [[d[0], d[1]]]; out.push(cur); last = [d[0], d[1]]; }
      else if (op.op === 'lineTo') { cur.push([d[0], d[1]]); last = [d[0], d[1]]; }
      else if (op.op === 'bcurveTo') {
        const p0 = last, p1 = [d[0], d[1]], p2 = [d[2], d[3]], p3 = [d[4], d[5]];
        for (let i = 1; i <= 10; i++) { const s = i / 10, u = 1 - s; cur.push([u*u*u*p0[0] + 3*u*u*s*p1[0] + 3*u*s*s*p2[0] + s*s*s*p3[0], u*u*u*p0[1] + 3*u*u*s*p1[1] + 3*u*s*s*p2[1] + s*s*s*p3[1]]); }
        last = p3;
      }
    }
  }
  return out.filter(p => p.length > 1).map(pts => { const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, cum }; });
}
// 折线画到 len 长度，返回笔尖
function partial(g, s, len) {
  const { pts, cum } = s; if (len <= 0) return pts[0];
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); let tip = pts[0];
  for (let i = 1; i < pts.length; i++) {
    if (cum[i] <= len) { g.lineTo(pts[i][0], pts[i][1]); tip = pts[i]; continue; }
    const q = (len - cum[i - 1]) / (cum[i] - cum[i - 1]); tip = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * q, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * q];
    g.lineTo(tip[0], tip[1]); break;
  }
  g.stroke(); return tip;
}

export function hd(K) {
  const RG = K.RG; let seedN = 601;
  const H = {};
  H.world = (x, p) => { const r = x.r || 0, s = x.s ?? 1, c = Math.cos(r), n = Math.sin(r); return [x.x + (p[0] * c - p[1] * n) * s, x.y + (p[0] * n + p[1] * c) * s]; };
  const apply = (g, x) => { g.translate(x.x, x.y); if (x.r) g.rotate(x.r); if ((x.s ?? 1) !== 1) g.scale(x.s, x.s); };

  // 一件手绘道具：parts 按顺序逐笔画出（每件内两遍描边同时推进），画完后 hachure 淡入；solid：画完后淡入的底色（遮住身后线条，如壶身挡住手臂）
  // part = { d: SVG path | shape: (o, RG) => drawable, col, w, rough, bow, fill, fillW, gap, solid, min }
  // opt = { t0, speed, xf(t) → {x,y,r,s,a}, z, until, fade:[t0,t1], visible(t) }
  H.sketch = (parts, { t0 = K.cur, speed = 2400, xf = () => ({ x: 0, y: 0 }), z = 2, until = 1e9, fade = null, pen = true, after = null, clip = null } = {}) => {
    let t = t0;
    const P = parts.map(p => {
      const opt = { seed: p.seed ?? seedN++, roughness: p.rough ?? 1.0, bowing: p.bow ?? 1.1, stroke: p.col || INK, strokeWidth: p.w ?? 5.5, preserveVertices: false };
      if (p.fill) Object.assign(opt, { fill: p.fill, fillStyle: 'hachure', hachureGap: p.gap ?? 12, hachureAngle: -41, fillWeight: p.fillW ?? 2.4 });
      const dr = p.shape ? p.shape(opt, RG) : RG.path(p.d, opt);
      const strokes = flatten(dr, 'path'), hatch = p.fill ? flatten(dr, 'fillSketch') : [];
      const L = Math.max(...strokes.map(s => s.cum[s.cum.length - 1]));
      const d = Math.max(p.min ?? 0.1, L / (p.speed || speed));
      const o = { ...p, strokes, hatch, L, t0: t, t1: t + d, solidPath: p.solid ? new Path2D(p.solidD || p.d) : null };
      t = o.t1 + 0.03; return o;
    });
    const t1 = t;
    const alphaAt = ft => (fade ? 1 - clamp((ft - fade[0]) / (fade[1] - fade[0])) : 1) * ((xf(ft).a) ?? 1);
    const drawAt = (g, ft) => {
      const a = alphaAt(ft); if (a <= 0 || ft < t0 || ft >= until) return null;
      const x = xf(ft); let tip = null;
      g.save(); apply(g, x); if (clip) { g.beginPath(); clip(g, ft); g.clip(); } g.lineCap = 'round'; g.lineJoin = 'round';
      for (const p of P) {
        if (ft < p.t0) break;
        const q = clamp((ft - p.t0) / (p.t1 - p.t0)), e = sineInOut(q);
        if (p.solidPath && q >= 1) { g.globalAlpha = a * clamp((ft - p.t1) / 0.25); g.fillStyle = p.solid; g.fill(p.solidPath); }
        if (p.hatch.length && q >= 1) { const ha = clamp((ft - p.t1) / 0.35); if (ha > 0) { g.globalAlpha = a * ha; g.strokeStyle = p.fill; g.lineWidth = p.fillW ?? 2.4; for (const h of p.hatch) partial(g, h, 1e9); } }
        g.globalAlpha = a; g.strokeStyle = p.col || INK; g.lineWidth = p.w ?? 5.5;
        p.strokes.forEach((s, i) => { const tp = partial(g, s, s.cum[s.cum.length - 1] * e); if (i === 0 && q < 1) tip = tp; });
      }
      if (after) after(g, ft, x);
      g.restore();
      return tip ? H.world(x, tip) : null;
    };
    K.prop((g, ft) => drawAt(g, ft), { from: t0, until, z });
    if (pen) {   // 笔尖跟随：引擎的笔读 B 时间线 → 推一笔「只报笔尖、不画东西」的自定义笔画（真正的画在 K.prop 里，层级可以压在人物之上）
      const first = P[0], last = P[P.length - 1];
      K.B.push({ kind: 'custom', t0, t1, col: INK, start: () => H.world(xf(t0), first.strokes[0].pts[0]), end: () => { const s = last.strokes[0].pts; return H.world(xf(t1), s[s.length - 1]); },
        draw(g, q, ft) {
          if (q >= 1) return null;
          for (const p of P) if (ft >= p.t0 && ft < p.t1) { const s = p.strokes[0], e = sineInOut(clamp((ft - p.t0) / (p.t1 - p.t0))), len = s.cum[s.cum.length - 1] * e;
            let i = 1; while (i < s.pts.length - 1 && s.cum[i] < len) i++; const k = clamp((len - s.cum[i - 1]) / ((s.cum[i] - s.cum[i - 1]) || 1));
            return H.world(xf(ft), [s.pts[i - 1][0] + (s.pts[i][0] - s.pts[i - 1][0]) * k, s.pts[i - 1][1] + (s.pts[i][1] - s.pts[i - 1][1]) * k]); }
          return H.world(xf(ft), (P.find(p => ft < p.t0) || last).strokes[0].pts[0]);
        } });
    }
    if (K.cur < t1) K.at(t1);
    return { t0, t1, P };
  };

  H.seed = () => seedN++;   // 取一个种子：两份同种子的 sketch 线条逐点一致（切开前两半严丝合缝 = 一整只）
  // 预先生成一条 rough 折线集（不上时间线），给每帧自己画的东西用（液面边线、液柱抖动等仍用固定种子）
  H.strokesOf = (d, o = {}) => flatten(RG.path(d, { seed: seedN++, roughness: o.rough ?? 0.8, bowing: o.bow ?? 1, strokeWidth: o.w ?? 4, preserveVertices: false }), 'path');
  H.drawStrokes = (g, S, { col = INK, w = 4, a = 1 } = {}) => { g.save(); g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; for (const s of S) partial(g, s, 1e9); g.restore(); };
  // 手绘排线填一个区域（每帧现算：排线间距固定、相位固定 → 只由几何决定，不抖）
  H.hatchFill = (g, path, { col = INK, gap = 9, angle = -41, w = 2.2, a = 1, box = [-400, -400, 800, 800] } = {}) => {
    g.save(); g.clip(path); g.globalAlpha = a; g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round';
    const [bx, by, bw, bh] = box, rad = angle * Math.PI / 180, dx = Math.cos(rad), dy = Math.sin(rad), R = Math.hypot(bw, bh), cx = bx + bw / 2, cy = by + bh / 2;
    g.beginPath(); for (let k = -R; k <= R; k += gap) { const ox = cx - dy * k, oy = cy + dx * k; g.moveTo(ox - dx * R, oy - dy * R); g.lineTo(ox + dx * R, oy + dy * R); } g.stroke();
    g.restore();
  };
  return H;
}

// ---------- 道具几何（局部坐标，单位 = 世界像素 ÷ 道具缩放）----------
// 手冲咖啡壶（细长鹅颈壶嘴，咖啡馆标准器具）：原点 = 壶把握点（店员拳头抓的位置）；壶身在原点右边、壶嘴在最右，竖直放着时壶嘴尖向右上斜。
// 倒的时候绕握点顺时针转 r（canvas 正角），壶嘴尖 SPOUT_TIP 跟着转到壶身下方、朝下指向杯口。液柱只许从 SPOUT_TIP 出。
export const KETTLE = {
  body: 'M30 70 L160 70 Q170 15 142 -30 Q130 -50 95 -52 Q60 -50 48 -30 Q20 15 30 70 Z',
  lid: 'M62 -50 Q95 -68 128 -50',
  knob: 'M86 -64 Q95 -80 104 -64',
  handle: 'M46 -28 Q2 -40 0 0 Q-2 42 34 58',
  spoutOut: 'M158 22 Q196 22 200 -20 Q204 -70 248 -96',
  spoutIn: 'M162 50 Q214 52 218 -14 Q222 -60 254 -82',
  spoutCap: 'M248 -96 L254 -82',
  SPOUT_TIP: [251, -89],          // 壶嘴开口中心
  SPOUT_DIR: Math.atan2(-24, 40), // 竖放时壶嘴末段方向（约 -31°，向右上斜）
  BODY_C: [95, 10],               // 壶身形心
  BOTTOM: 70,                     // 壶底（局部 y）
};
// 咖啡杯（马克杯，口宽 120）：原点 = 杯底中心；杯口在 y = -RIM_H。INNER(fill) = 内腔液面 y
export const MUG = {
  body: 'M-60 -118 L-52 -6 Q-50 0 -40 0 L40 0 Q50 0 52 -6 L60 -118',
  rim: 'M-60 -118 Q0 -128 60 -118',
  rimBack: 'M-60 -118 Q0 -108 60 -118',
  handle: 'M58 -96 Q100 -92 96 -60 Q92 -30 54 -32',
  RIM_H: 118, HALF_TOP: 60, HALF_BOT: 52, INNER_BOT: -8,
  inner: f => { const y = -8 - (118 - 20) * f; return y; },
};

// 菜刀（局部原点 = 刀把握点；刀身朝 -x，刃口在 +y 一侧、向刀尖上收）：倒拿 / 斜切时由 r 转到刃口朝下
export const KNIFE_HD = {
  handle: 'M-8 -9 L34 -9 Q42 0 34 9 L-8 9 Z',
  bolster: 'M-12 -12 L-12 13',
  spine: 'M-12 -10 L-150 -7',
  edge: 'M-12 14 Q-118 18 -150 -7',
  EDGE_MID: [-80, 15], TIP: [-150, -7], EDGE_N: [0, 1],     // 刃口中点、刀尖、刃口外法线（局部）
};
// 苹果（局部原点 = 果心，半径 30）：整只 / 左半 / 右半（切面 = x=0 的竖线）
export const APPLE = {
  whole: 'M0 -26 Q26 -36 32 -8 Q36 22 12 30 Q0 34 -12 30 Q-36 22 -32 -8 Q-26 -36 0 -26 Z',
  stem: 'M0 -26 Q2 -36 6 -42', leaf: 'M4 -36 Q16 -48 24 -38 Q14 -32 4 -36',
  left: 'M0 -26 Q-26 -36 -32 -8 Q-36 22 -12 30 Q-6 32 0 31 Z', right: 'M0 -26 Q26 -36 32 -8 Q36 22 12 30 Q6 32 0 31 Z',
  R: 30,
};
// 面包（局部原点 = 底边中心）：整条 / 左块 / 右块（切面 x=0）
export const BREAD = {
  whole: 'M-56 0 L-56 -30 Q-56 -52 -30 -54 Q0 -60 30 -54 Q56 -52 56 -30 L56 0 Z',
  score: ['M-34 -50 Q-28 -40 -20 -36', 'M-4 -55 Q2 -45 10 -41', 'M24 -52 Q30 -42 38 -38'],
  left: 'M0 0 L-56 0 L-56 -30 Q-56 -52 -30 -54 Q-14 -57 0 -57 Z', right: 'M0 0 L56 0 L56 -30 Q56 -52 30 -54 Q14 -57 0 -57 Z',
};
// 打开的语法书（局部原点 = 书脊底）
export const BOOK = {
  left: 'M0 0 Q-50 -14 -110 -4 L-110 -84 Q-50 -94 0 -80 Z', right: 'M0 0 Q50 -14 110 -4 L110 -84 Q50 -94 0 -80 Z',
  lines: ['M-92 -66 Q-50 -74 -16 -64', 'M-92 -48 Q-50 -56 -16 -46', 'M16 -64 Q50 -74 92 -66', 'M16 -46 Q50 -56 92 -48'],
};
// 玻璃杯（局部原点 = 杯底中心，高 120）
export const GLASS = { body: 'M-34 -120 L-28 -4 Q-27 0 -22 0 L22 0 Q27 0 28 -4 L34 -120', rim: 'M-34 -120 Q0 -128 34 -120', rimBack: 'M-34 -120 Q0 -112 34 -120' };
// 一张纸（局部原点 = 中心，A4 竖放比例）
export const SHEET = { body: 'M-46 -64 L46 -64 L46 64 L-46 64 Z', lines: ['M-30 -40 L30 -40', 'M-30 -20 L30 -20', 'M-30 0 L22 0', 'M-30 20 L30 20'] };
// 作业本（局部原点 = 底边中心）
export const WORKBOOK = { body: 'M-70 0 L70 0 L70 -22 L-70 -22 Z', spine: 'M-70 -11 L70 -11' };
// 碗（局部原点 = 碗底中心）+ 米饭堆
export const BOWL = {
  body: 'M-70 -56 Q-66 -6 -24 -2 L-20 4 L20 4 L24 -2 Q66 -6 70 -56', rim: 'M-70 -56 Q0 -70 70 -56', rimBack: 'M-70 -56 Q0 -44 70 -56',
  rice: 'M-62 -58 Q-56 -80 -40 -84 Q-30 -100 -10 -98 Q4 -110 22 -100 Q42 -98 48 -82 Q62 -76 62 -58',
};
