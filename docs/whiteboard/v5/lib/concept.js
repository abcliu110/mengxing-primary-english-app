// v5/lib/concept.js —— 决策 38「白板启发性重做」概念原语（MASTER_DESIGN 决策 38；检查 src/insightcheck.py）。
// 目的：让「运动本身解释概念」，取代 auto.js「字 + 讲解员」。全部原语只由时间 t 决定（可拖进度条、两次绘制一致）。
// 用法：
//   import { scene } from '../wb5.js';  import { concept } from '../lib/concept.js';
//   const K = scene({ sprites }), C = concept(K);
//   C.aha({ see, guess, reveal, rule });           // 啊哈卡（分镜第 0 步，必填）：孩子先看到什么 → 猜什么 → 揭晓什么 → 最后才出规则名
//   const a = C.chip({ text:'he', x, y, from, path:[[t,x,y]], swap:[[t,'him']] });   // ① 词块移动 / 换装
//   C.split({ x, y, w, h, from, labels:['昨天','今天'] });                             // ② 并排对比分屏
//   C.cover({ x, y, w, h, from, open });                                              // ③ 遮挡揭晓（open 之前盖着）
//   C.axis({ x0, x1, y, from, ticks }) + chip.path 沿轴移动                            // ④ 时间轴推移
//   C.slot({ x, y, w, h, from }) + C.drop(chip, t, x, y)                              // ⑤ 拖放挂钩（落位回弹）
//   T = C.predict(t, { q:'先猜：…' })                                                 // ⑥ 预测停顿（≥3 秒倒数，期间画面不揭晓）
//   C.rule(t)                                                                          // 记下「规则命名」的时刻（必须晚于第一个预测停顿）
//   export default C.finish();   // = K.done()，另把啊哈卡 / 预测停顿 / 原语用量挂到 globalThis.__WB5_INSIGHT__ 给 insightcheck 读
// 文字只做标签：规则句进字幕（K.narr）或收尾要点卡，不上板（insightcheck 量板上文字面积 ≤ 40%）。
import { INK, OR, GREY } from '../wb5.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const EASE = {
  io: q => (q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2),
  out: q => 1 - Math.pow(1 - q, 3),
  back: q => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(q - 1, 3) + c1 * Math.pow(q - 1, 2); },
  lin: q => q,
};
export const BLUE = '#2563eb', GREEN = '#059669', RED = '#e11d48', HI = 'rgba(253,224,71,.55)';
export const FONT = (size, bold = false) => `${bold ? '700 ' : ''}${size}px Kalam, WK`;

// 关键帧轨道：keys = [[t, v, d?, ease?], …]，v 是数或数组；t 时刻开始在 d 秒内（默认 0.6）从上一个值过渡到 v
export function track(keys, t, def = 0.6, e = 'io') {
  if (!keys || !keys.length) return null;
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [kt, kv, kd = def, ke = e] = keys[i];
    if (t < kt) break;
    const q = EASE[ke](clamp((t - kt) / kd));
    v = Array.isArray(kv) ? kv.map((x, j) => v[j] + (x - v[j]) * q) : v + (kv - v) * q;
  }
  return v;
}
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

export function concept(K) {
  const C = { AHA: null, PRED: [], RULE: null, USES: {}, TEXTS: [] };   // TEXTS：板上出现过的全部字（词块 / 换装 / 标签），给「知识点不丢」核对用
  const use = k => { C.USES[k] = (C.USES[k] || 0) + 1; };
  // 板上没有手写笔画时引擎的「笔」会找不到上一笔：垫一笔看不见的（画面外、t = -1 秒），笔自动藏起来
  K.B.push({ kind: 'custom', t0: -1, t1: -0.99, col: INK, start: () => [2300, 1400], end: () => [2300, 1400], draw: () => null });

  C.aha = card => { for (const k of ['see', 'guess', 'reveal', 'rule']) if (!card[k]) throw new Error('啊哈卡缺 ' + k); C.AHA = card; return C; };

  // ① 词块：圆角卡片里一个词。path 移动、swap 换装（翻一下换字 / 换色）、hi:[[t0,t1]] 荧光高亮、out 淡出
  C.chip = ({ text, x, y, size = 64, col = INK, bg = '#fff', bd = INK, from = 0, until = 1e9, path = [], swap = [], hi = [], out = null, pad = 22, z = 3, bold = false, alpha = 1 }) => {
    use('chip');
    const spec = { text, x, y, size, from, keys: [[from, [x, y]], ...path.map(([t, px, py, d, e]) => [t, [px, py], d, e])] };
    const sw = spec.sw = [[from, text, col, bg, bd], ...swap.map(([t, tx, c = col, b = bg, d = bd]) => [t, tx, c, b, d])];
    C.TEXTS.push(text, ...swap.map(s => s[1]));
    if (swap.length) use('swap');
    if (path.length) use('move');
    spec.pos = t => track(spec.keys, t);
    K.prop((g, t) => {
      if (t < from) return;
      const fa = out != null ? 1 - clamp((t - out) / 0.4) : 1; if (fa <= 0) return;
      let cur = sw[0], flip = 1;
      for (const s of sw) if (t >= s[0]) cur = s;
      for (const s of sw.slice(1)) { const d = t - s[0]; if (d > -0.18 && d < 0.18) flip = Math.abs(d) / 0.18; }
      const [px, py] = spec.pos(t), pop = EASE.back(clamp((t - from) / 0.4));
      g.save(); g.globalAlpha = fa * alpha; g.font = FONT(size, bold); g.textAlign = 'center'; g.textBaseline = 'middle';
      const w = g.measureText(cur[1]).width + pad * 2, h = size * 1.35;
      g.translate(px, py); g.scale(pop * flip, pop);
      for (const [h0, h1] of hi) if (t >= h0 && t < h1) { g.fillStyle = HI; rr(g, -w / 2 - 10, -h / 2 - 8, w + 20, h + 16, 18); g.fill(); }
      g.fillStyle = cur[3]; g.strokeStyle = cur[4]; g.lineWidth = 4; rr(g, -w / 2, -h / 2, w, h, 16); g.fill(); g.stroke();
      g.fillStyle = cur[2]; g.fillText(cur[1], 0, size * 0.06); g.restore();
    }, { from, until, z });
    return spec;
  };
  // 拖放挂钩：chip 在 t 时刻飞到 (x, y)，回弹落位
  // 换装：t 时刻翻一下换成新字 / 新颜色
  C.swap = (chip, t, text, col = INK, bg = '#fff', bd = col) => { use('swap'); C.TEXTS.push(text); chip.sw.push([t, text, col, bg, bd]); chip.sw.sort((p, q) => p[0] - q[0]); return t; };
  C.drop = (chip, t, x, y, d = 0.7) => { use('drop'); chip.keys.push([t, [x, y], d, 'back']); return t + d; };
  C.move = (chip, t, x, y, d = 0.6) => { use('move'); chip.keys.push([t, [x, y], d, 'io']); return t + d; };

  // 插槽：虚线框（拖放目标），filled 之后变实线
  C.slot = ({ x, y, w, h, from = 0, until = 1e9, label = '', filled = 1e9, col = GREY }) => {
    use('slot');
    K.prop((g, t) => {
      const q = clamp((t - from) / 0.4); if (q <= 0) return;
      g.save(); g.globalAlpha = q; g.strokeStyle = t >= filled ? GREEN : col; g.lineWidth = 4; if (t < filled) g.setLineDash([14, 10]);
      rr(g, x - w / 2, y - h / 2, w, h, 18); g.stroke(); g.setLineDash([]);
      if (label) { g.font = FONT(34); g.fillStyle = GREY; g.textAlign = 'center'; g.fillText(label, x, y + h / 2 + 44); }
      g.restore();
    }, { from, until, z: 1 });
    return C;
  };

  // ② 并排对比：左右两格 + 中缝，标签在格子上方
  C.split = ({ x = 120, y = 170, w = 1680, h = 620, from = 0, until = 1e9, labels = ['', ''], cols = [BLUE, OR] }) => {
    use('split');
    K.prop((g, t) => {
      const q = EASE.out(clamp((t - from) / 0.6)); if (q <= 0) return;
      g.save(); g.lineWidth = 5; const half = (w - 40) / 2;
      [0, 1].forEach(i => {
        const px = x + i * (half + 40);
        g.strokeStyle = cols[i]; g.globalAlpha = q; rr(g, px, y, half, h * q, 24); g.stroke();
        if (labels[i]) { g.font = FONT(44, true); g.fillStyle = cols[i]; g.textAlign = 'center'; g.fillText(labels[i], px + half / 2, y - 22); }
      });
      g.restore();
    }, { from, until, z: 0 });
    return C;
  };

  // ③ 遮挡揭晓：open 之前一张「？」卡盖住 (x, y, w, h)；open 时向上翻走
  C.cover = ({ x, y, w, h, from = 0, open, label = '？', col = '#fde68a', until = 1e9 }) => {
    use('cover');
    K.prop((g, t) => {
      if (t < from) return;
      const q = clamp((t - open) / 0.55); if (q >= 1) return;
      const e = EASE.io(q);
      g.save(); g.globalAlpha = 1 - e * 0.6; g.translate(x, y - e * h * 0.9); g.scale(1, 1 - e * 0.85);
      g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 5; rr(g, -w / 2, -h / 2, w, h, 22); g.fill(); g.stroke();
      g.font = FONT(Math.min(h * 0.7, 120), true); g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, 0, 6);
      g.restore();
    }, { from, until, z: 6 });
    return C;
  };

  // ④ 时间轴：一条带箭头的轴 + 刻度；pos(p) 给 0–1 处的坐标，词块沿轴移动用 chip.path
  C.axis = ({ x0 = 160, x1 = 1760, y = 640, from = 0, until = 1e9, ticks = [], col = INK, now = null }) => {
    use('axis');
    K.prop((g, t) => {
      const q = EASE.out(clamp((t - from) / 0.8)); if (q <= 0) return;
      g.save(); g.strokeStyle = col; g.lineWidth = 6; g.lineCap = 'round';
      const xe = x0 + (x1 - x0) * q; g.beginPath(); g.moveTo(x0, y); g.lineTo(xe, y); g.stroke();
      if (q >= 1) { g.beginPath(); g.moveTo(x1 - 34, y - 22); g.lineTo(x1, y); g.lineTo(x1 - 34, y + 22); g.stroke(); }
      g.font = FONT(34); g.fillStyle = GREY; g.textAlign = 'center';
      for (const tk of ticks) { const px = x0 + (x1 - x0) * tk.p; if (px > xe) continue; g.beginPath(); g.moveTo(px, y - 14); g.lineTo(px, y + 14); g.stroke(); if (tk.label) g.fillText(tk.label, px, y + 62); }
      if (now != null && t >= now) { const px = x0 + (x1 - x0) * 0.97; g.fillStyle = OR; g.beginPath(); g.arc(px, y, 14, 0, 7); g.fill(); }
      g.restore();
    }, { from, until, z: 1 });
    return { pos: p => [x0 + (x1 - x0) * p, y] };
  };

  // 大图：emoji / 符号当图画（可 morph 渐变成另一张），用于「看图说词」
  C.pic = ({ emoji, x, y, size = 300, from = 0, until = 1e9, morph = [], bob = 0 }) => {
    use('pic');
    const ks = [[from, emoji], ...morph];
    K.prop((g, t) => {
      if (t < from) return; const pop = EASE.back(clamp((t - from) / 0.5));
      let i = 0; for (let k = 0; k < ks.length; k++) if (t >= ks[k][0]) i = k;
      const mq = i > 0 ? clamp((t - ks[i][0]) / 0.8) : 1;
      g.save(); g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `${size}px sans-serif`;
      const dy = bob ? Math.sin(t * bob) * 10 : 0;
      if (i > 0 && mq < 1) { g.globalAlpha = 1 - mq; g.fillText(ks[i - 1][1], x, y + dy); }
      g.globalAlpha = i > 0 ? mq : 1; g.translate(x, y + dy); g.scale(pop, pop); g.fillText(ks[i][1], 0, 0);
      g.restore();
    }, { from, until, z: 2 });
    return C;
  };

  // 标签：板上的短字（只做标签，≤ 1 行）
  C.label = (str, x, y, { size = 44, col = INK, from = 0, until = 1e9, align = 'center', bold = false, out = null } = {}) => {
    C.TEXTS.push(str);
    K.prop((g, t) => {
      const q = clamp((t - from) / 0.35) * (out != null ? 1 - clamp((t - out) / 0.4) : 1); if (q <= 0) return;
      g.save(); g.globalAlpha = q; g.font = FONT(size, bold); g.fillStyle = col; g.textAlign = align; g.textBaseline = 'alphabetic'; g.fillText(str, x, y); g.restore();
    }, { from, until, z: 4 });
    return C;
  };
  // 箭头（实时画出）
  C.arrow = (x0, y0, x1, y1, { from = 0, until = 1e9, col = OR, w = 7 } = {}) => {
    K.prop((g, t) => {
      const q = EASE.out(clamp((t - from) / 0.5)); if (q <= 0) return;
      const xe = x0 + (x1 - x0) * q, ye = y0 + (y1 - y0) * q, a = Math.atan2(y1 - y0, x1 - x0);
      g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(xe, ye); g.stroke();
      if (q >= 1) { g.beginPath(); g.moveTo(x1 - 30 * Math.cos(a - 0.45), y1 - 30 * Math.sin(a - 0.45)); g.lineTo(x1, y1); g.lineTo(x1 - 30 * Math.cos(a + 0.45), y1 - 30 * Math.sin(a + 0.45)); g.stroke(); }
      g.restore();
    }, { from, until, z: 2 });
    return C;
  };

  // ⑥ 预测停顿：问题气泡 + 倒数圆环（≥3 秒）。返回停顿结束时刻；这段时间里不要揭晓答案
  C.predict = (t, { q, sec = 3, x = 960, y = 120, until = null } = {}) => {
    use('predict'); sec = Math.max(3, sec); C.PRED.push({ t, sec, q });
    K.narr('🤔 ' + q, t, t + sec);
    K.prop((g, tt) => {
      const p = clamp((tt - t) / sec); const a = clamp((tt - t) / 0.3) * (1 - clamp((tt - t - sec) / 0.3)); if (a <= 0) return;
      const cx = x + 760, cy = y + 90;
      g.save(); g.globalAlpha = a; g.lineWidth = 10; g.strokeStyle = '#e5e7eb'; g.beginPath(); g.arc(cx, cy, 46, 0, 7); g.stroke();
      g.strokeStyle = OR; g.beginPath(); g.arc(cx, cy, 46, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - p)); g.stroke();
      g.font = FONT(52, true); g.fillStyle = OR; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(Math.max(1, Math.ceil(sec * (1 - p)))), cx, cy + 3);
      g.restore();
    }, { from: t, until: until ?? t + sec + 0.4, z: 8 });
    return t + sec;
  };
  C.rule = t => { C.RULE = t; return C; };

  C.finish = () => {
    const sc = K.done();
    const ins = { aha: C.AHA, predicts: C.PRED, ruleAt: C.RULE, uses: C.USES, dur: sc.DUR, texts: C.TEXTS };
    try { globalThis.__WB5_INSIGHT__ = ins; } catch (e) {}
    return { ...sc, INSIGHT: ins };
  };
  return C;
}
