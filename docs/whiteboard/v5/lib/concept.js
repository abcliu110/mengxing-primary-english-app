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
//   —— 决策 39（SOP_COGNITIVE_UPGRADE.md §三）五个认知组件，都记动态时间窗（insightcheck 量「动态时长 ≥ 60%」）——
//   C.step(1..4, t)                                                                   // 四步剧本分段：1 冲突 hook / 2 机制 / 3 迁移 / 4 锚点（源码另写 // @step1_hook 等注释）
//   C.morphLetters({ from:'pater', to:'father', x, y, t, d })                         // ⑦ 字母变形：保留的字母滑到新位置并标绿，变化的字母压扁消失 / 长出 + 气流波
//   C.schemaContainer({ x, y, w, h, content:'☕', states:[[t,'unbounded'],[t,'bounded'],[t,'enter'],[t,'exit'],[t,'expand'],[t,'deplete']], count })  // ⑧ 边界容器
//   C.syntaxSlotMachine({ x, y, subj:'I', verb:'stop', second:'smoke', fix:'-ing', tIn, tFix })   // ⑨ 句法卡槽：第二个动词塞主槽被电弧弹开 → 装上 to / -ing 挂进副轨
//   C.timelineCamera({ x0, x1, y, from, shots:[[t,'wide'],[t,'in',p],[t,'out',p]] })  // ⑩ 时间轴取景框：推近看到进行中的波浪，拉远压成一颗胶囊
//   C.contrastSplitScreen({ left:{ label, beats:[[t,'🚬']] }, right:{…}, from, diff:[t] })   // ⑪ 双屏同步对比，diff 时刻两边一起闪差异
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
  const C = { AHA: null, PRED: [], RULE: null, USES: {}, TEXTS: [], DYN: [], STEPS: [] };   // DYN：[t0,t1] 动态推演时间窗；STEPS：[{n,t}] 四步剧本分段   // TEXTS：板上出现过的全部字（词块 / 换装 / 标签），给「知识点不丢」核对用
  const use = k => { C.USES[k] = (C.USES[k] || 0) + 1; };
  const dyn = (t0, t1) => { if (t1 > t0) C.DYN.push([t0, t1]); };
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
    for (const [pt, , , d = 0.6] of path) dyn(pt, pt + d);
    for (const [st] of swap) dyn(st - 0.2, st + 0.4);
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
  C.swap = (chip, t, text, col = INK, bg = '#fff', bd = col) => { use('swap'); dyn(t - 0.2, t + 0.4); C.TEXTS.push(text); chip.sw.push([t, text, col, bg, bd]); chip.sw.sort((p, q) => p[0] - q[0]); return t; };
  C.drop = (chip, t, x, y, d = 0.7) => { use('drop'); dyn(t, t + d); chip.keys.push([t, [x, y], d, 'back']); return t + d; };
  C.move = (chip, t, x, y, d = 0.6) => { use('move'); dyn(t, t + d); chip.keys.push([t, [x, y], d, 'io']); return t + d; };

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
    dyn(from, from + 0.5); for (const [mt] of morph) dyn(mt, mt + 0.8); if (bob) dyn(from, until);
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

  // —— 决策 39 认知组件 ——
  C.motion = (t0, t1) => { dyn(t0, t1); return C; };   // 场景自己画的连续动画（K.prop 里随 t 运动）登记为动态时间窗
  C.step = (n, t) => { if (![1, 2, 3, 4].includes(n)) throw new Error('C.step 只收 1–4'); C.STEPS.push({ n, t }); return t; };

  // 最长公共子序列：morphLetters 用来找「不变的骨架」
  const lcs = (a, b) => {
    const m = a.length, n = b.length, L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = a[i].toLowerCase() === b[j].toLowerCase() ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const pairs = []; let i = 0, j = 0;
    while (i < m && j < n) { if (a[i].toLowerCase() === b[j].toLowerCase()) { pairs.push([i, j]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
    return pairs;
  };
  // ⑦ 字母变形：from → to。不变的字母（公共子序列）平移到新位置并在 hold 期间标绿；消失的字母压扁 + 下沉，新字母从地上长出；变化处画三道气流波
  C.morphLetters = ({ from: A, to: Bw, x = 960, y = 540, size = 120, t = 0, d = 1.6, until = 1e9, col = INK, keep = GREEN, chg = OR, wave = true, appear = 0 }) => {
    use('morphLetters'); C.TEXTS.push(A, Bw); dyn(t - 0.3, t + d + 0.3);
    const pairs = lcs([...A], [...Bw]), keptA = new Map(pairs.map(([i, j]) => [i, j])), keptB = new Set(pairs.map(p => p[1]));
    const g0 = K._mc || (K._mc = document.createElement('canvas').getContext('2d'));
    const layout = w => { g0.font = FONT(size, true); const ws = [...w].map(ch => g0.measureText(ch).width + size * 0.06); const tot = ws.reduce((p, q) => p + q, 0); let cx = x - tot / 2; return ws.map(wd => { const c = cx + wd / 2; cx += wd; return c; }); };
    const PA = layout(A), PB = layout(Bw);
    const chgX = [...Bw].map((_, j) => j).filter(j => !keptB.has(j)).map(j => PB[j]);
    K.prop((g, tt) => {
      if (tt < appear) return;
      const q = EASE.io(clamp((tt - t) / d));
      g.save(); g.font = FONT(size, true); g.textAlign = 'center'; g.textBaseline = 'middle';
      [...A].forEach((ch, i) => {
        if (keptA.has(i)) return;
        const s = 1 - clamp(q * 1.6); if (s <= 0) return;
        g.save(); g.translate(PA[i], y + (1 - s) * size * 0.5); g.scale(1, s); g.fillStyle = q > 0 ? chg : col; g.fillText(ch, 0, 0); g.restore();
      });
      [...Bw].forEach((ch, j) => {
        if (keptB.has(j)) return;
        const s = clamp((q - 0.4) / 0.6); if (s <= 0) return;
        g.save(); g.translate(PB[j], y + (1 - s) * size * 0.5); g.scale(1, EASE.back(s)); g.fillStyle = chg; g.fillText(ch, 0, 0); g.restore();
      });
      for (const [i, j] of pairs) { const px = PA[i] + (PB[j] - PA[i]) * q; g.fillStyle = tt >= t && tt < t + d + 1.2 ? keep : col; g.fillText(Bw[j], px, y); }
      if (wave && tt >= t && tt < t + d) for (const wx of chgX) for (let k = 0; k < 3; k++) {
        const r = size * (0.35 + ((tt - t) * 1.4 + k * 0.33) % 1 * 0.6);
        g.strokeStyle = BLUE; g.globalAlpha = 0.5; g.lineWidth = 4; g.beginPath(); g.arc(wx - size * 0.7, y, r, -0.6, 0.6); g.stroke(); g.globalAlpha = 1;
      }
      g.restore();
    }, { from: appear, until, z: 4 });
    return { endAt: t + d };
  };

  // ⑧ 边界容器：unbounded（没有边：内容像流体铺开）/ bounded（实线发光边框，右上角弹数字 count）/ enter（内容从左外侧刺入）/ exit（内容顶破右壁出去）/ expand（框里绽放放大）/ deplete（框内能量条耗尽）
  C.schemaContainer = ({ x = 960, y = 520, w = 420, h = 320, content = '☕', contentDraw = null, from = 0, until = 1e9, states = [[0, 'bounded']], label = '', count = null, col = BLUE, csize = 150, fluid = 'rgba(146,64,14,.18)', spread = 1.5 }) => {
    use('schemaContainer'); if (label) C.TEXTS.push(label);
    const ST = [...states].sort((p, q) => p[0] - q[0]);
    for (let i = 0; i < ST.length; i++) { const nx = Math.min(ST[i + 1] ? ST[i + 1][0] : 1e9, until); dyn(ST[i][0], ['unbounded', 'deplete'].includes(ST[i][1]) ? nx : Math.min(ST[i][0] + 1.4, nx)); }   // 流体 / 耗尽一直在动，整段算动态
    K.prop((g, t) => {
      if (t < from) return;
      let k = 0; for (let i = 0; i < ST.length; i++) if (t >= ST[i][0]) k = i;
      const [ts, st] = ST[k], q = clamp((t - ts) / 1.2), e = EASE.io(q), prev = k > 0 ? ST[k - 1][1] : st;
      const bounded = st !== 'unbounded', bq = st === 'bounded' && prev === 'unbounded' ? e : bounded ? 1 : (prev !== 'unbounded' && k > 0 ? 1 - e : 0);
      g.save();
      // 内容
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `${csize}px sans-serif`;
      let cx = x, cy = y, cs = 1, ca = 1;
      if (st === 'unbounded') {   // 流体铺开：一片淡色波浪 + 内容影子扩散
        const sp = 0.6 + e * (spread - 0.6); g.fillStyle = fluid; g.beginPath();
        for (let i = 0; i <= 40; i++) { const px = x - w * sp + (2 * w * sp) * i / 40, py = y + h * 0.35 + Math.sin(i * 0.7 + t * 3) * 14; i ? g.lineTo(px, py) : g.moveTo(px, py); }
        g.lineTo(x + w * sp, y + h * 0.5); g.lineTo(x - w * sp, y + h * 0.5); g.closePath(); g.fill(); cs = 1 - e * 0.2; ca = 0.85;
      }
      if (st === 'enter') { cx = x - w * 1.1 * (1 - e); }
      if (st === 'exit') { cx = x + w * 1.05 * e; }
      if (st === 'expand') { cs = 1 + e * 0.6; }
      if (st === 'deplete') { cs = 1; }
      if (content) { g.globalAlpha = ca; g.save(); g.translate(cx, cy); g.scale(cs, cs); g.fillText(content, 0, 0); g.restore(); g.globalAlpha = 1; }
      else if (contentDraw) { g.globalAlpha = ca; g.save(); g.translate(cx, cy); g.scale(cs, cs); contentDraw(g, t); g.restore(); g.globalAlpha = 1; }   // 元素内容（T16）：回调在内容位姿（cx,cy,cs,ca）下绘制元素，缺省不传时行为与旧版一致
      // 边框
      const bulge = st === 'exit' ? Math.sin(Math.PI * clamp(e * 1.3)) * 60 : 0;
      if (bq > 0) {
        g.globalAlpha = bq; g.strokeStyle = col; g.lineWidth = 7; g.shadowColor = col; g.shadowBlur = 18 * bq;
        g.beginPath(); g.moveTo(x - w / 2 + 18, y - h / 2); g.lineTo(x + w / 2 - 18, y - h / 2); g.quadraticCurveTo(x + w / 2, y - h / 2, x + w / 2, y - h / 2 + 18);
        g.quadraticCurveTo(x + w / 2 + bulge, y, x + w / 2, y + h / 2 - 18); g.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2 - 18, y + h / 2);
        g.lineTo(x - w / 2 + 18, y + h / 2); g.quadraticCurveTo(x - w / 2, y + h / 2, x - w / 2, y + h / 2 - 18); g.lineTo(x - w / 2, y - h / 2 + 18); g.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2 + 18, y - h / 2); g.stroke();
        g.shadowBlur = 0;
        if (count != null && (st === 'bounded' || st === 'expand') && q > 0.5) {
          const pq = EASE.back(clamp((q - 0.5) / 0.4)); g.fillStyle = OR; g.beginPath(); g.arc(x + w / 2, y - h / 2, 40 * pq, 0, 7); g.fill();
          g.fillStyle = '#fff'; g.font = FONT(48 * pq, true); g.fillText(String(count), x + w / 2, y - h / 2 + 3);
        }
        g.globalAlpha = 1;
      } else { g.strokeStyle = GREY; g.globalAlpha = 0.35; g.lineWidth = 3; g.setLineDash([10, 14]); rr(g, x - w / 2, y - h / 2, w, h, 18); g.stroke(); g.setLineDash([]); g.globalAlpha = 1; }
      if (st === 'deplete') {   // 框底能量条耗尽
        const bw = w - 60; g.strokeStyle = INK; g.lineWidth = 3; rr(g, x - bw / 2, y + h / 2 - 46, bw, 26, 10); g.stroke();
        g.fillStyle = e < 0.8 ? GREEN : RED; rr(g, x - bw / 2, y + h / 2 - 46, bw * (1 - e), 26, 10); g.fill();
      }
      if (label) { g.font = FONT(40, true); g.fillStyle = col; g.fillText(label, x, y + h / 2 + 50); }
      g.restore();
    }, { from, until, z: 2 });
    return C;
  };

  // ⑨ 句法卡槽：主轨 [subj][👑verb]；tIn 时第二个动词撞向主槽 → 红色电弧、弹回；tFix 时装上 fix（'to' 挂钩 / '-ing' 齿轮）→ 落到下方副轨
  C.syntaxSlotMachine = ({ x = 960, y = 420, subj = 'I', verb = 'stop', second = 'smoke', fix = 'to', tIn = 1, tFix = 4, from = 0, until = 1e9, size = 64, after = '' }) => {
    use('syntaxSlotMachine'); C.TEXTS.push(subj, verb, second, fix); if (after) C.TEXTS.push(after);
    dyn(tIn, tIn + 1.8); dyn(tFix, tFix + 1.6);
    const ing = /ing/.test(fix), word2 = ing ? second.replace(/e$/, '') + 'ing' : second;
    const card = (g, s, cx, cy, { bg = '#fff', bd = INK, fg = INK, crown = false, shake = 0 } = {}) => {
      g.font = FONT(size, true); const w = g.measureText(s).width + 44, h = size * 1.4;
      g.save(); g.translate(cx + shake, cy); g.fillStyle = bg; g.strokeStyle = bd; g.lineWidth = 4; rr(g, -w / 2, -h / 2, w, h, 16); g.fill(); g.stroke();
      g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 0, size * 0.06);
      if (crown) { g.font = `${size * 0.8}px sans-serif`; g.fillText('👑', 0, -h / 2 - size * 0.45); }
      g.restore(); return w;
    };
    K.prop((g, t) => {
      if (t < from) return;
      g.save(); g.strokeStyle = GREY; g.lineWidth = 6; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x - 620, y + size); g.lineTo(x + 620, y + size); g.stroke();                       // 主轨
      if (t >= tFix) { g.setLineDash([16, 12]); g.beginPath(); g.moveTo(x + 40, y + size * 4); g.lineTo(x + 620, y + size * 4); g.stroke(); g.setLineDash([]); }   // 副轨
      const shake = t >= tIn + 0.6 && t < tIn + 1.2 ? Math.sin(t * 90) * 9 : 0;
      card(g, subj, x - 420, y); card(g, verb, x - 120, y, { bd: OR, crown: true, shake });
      if (after && t >= tFix + 1.6) card(g, after, x + 520, y);
      // 第二个动词
      let sx = x + 900, sy = y, sbg = '#fff', sbd = INK;
      if (t >= tIn && t < tFix) {
        const a = clamp((t - tIn) / 0.6), b = clamp((t - tIn - 0.6) / 0.6);
        sx = x + 900 - 760 * EASE.io(a) + 440 * EASE.out(b); sbd = b > 0 ? RED : INK;
        if (a >= 1 && b < 1) {   // 电弧
          g.strokeStyle = RED; g.lineWidth = 5; for (let k = 0; k < 3; k++) { g.beginPath(); let px = x + 40, py = y - 60 + k * 50; g.moveTo(px, py); for (let s2 = 0; s2 < 5; s2++) { px += 18; py += (s2 % 2 ? -1 : 1) * (14 + 8 * Math.sin(t * 50 + k)); g.lineTo(px, py); } g.stroke(); }
          g.font = `${size}px sans-serif`; g.fillText('⚡', x + 60, y - size * 1.4);
        }
      } else if (t >= tFix) {
        const a = EASE.io(clamp((t - tFix) / 1.2)); sx = x + 580 - 200 * a; sy = y + size * 3 * a; sbg = '#ecfdf5'; sbd = GREEN;
      } else if (t < tIn) { g.restore(); return; }
      const txt = t >= tFix + 0.5 ? (ing ? word2 : 'to ' + second) : second;
      card(g, txt, sx, sy, { bg: sbg, bd: sbd, fg: t >= tFix ? GREEN : INK });
      if (t >= tFix && t < tFix + 0.9) {   // 装配件飞进来
        const a = EASE.back(clamp((t - tFix) / 0.5)); g.font = `${size * 0.9}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.save(); g.translate(sx + (ing ? 90 : -90), sy - 70 * a); g.rotate(ing ? t * 6 : 0); g.fillText(ing ? '⚙️' : '🪝', 0, 0); g.restore();
      }
      g.restore();
    }, { from, until, z: 3 });
    return { endAt: tFix + 1.6 };
  };

  // ⑩ 时间轴取景框：一条轴 + 事件点；shots = [[t,'wide'] | [t,'in',p] | [t,'out',p]]。in：框推近到 p 处并在框里画进行中的波浪（没收口）；out：框拉远，p 处事件压成一颗封口胶囊
  C.timelineCamera = ({ x0 = 200, x1 = 1720, y = 600, from = 0, until = 1e9, shots = [[0, 'wide']], events = [], col = INK }) => {
    use('timelineCamera'); for (const e of events) if (e.label) C.TEXTS.push(e.label);
    const S = [...shots].sort((p, q) => p[0] - q[0]);
    S.forEach((s, i) => dyn(s[0], s[1] === 'in' ? Math.min(S[i + 1] ? S[i + 1][0] : 1e9, until) : s[0] + 1.2));   // 推近后框里的波浪一直在流，整段算动态
    const W = x1 - x0, frame = s => s[1] === 'in' ? [x0 + W * s[2], 300] : s[1] === 'out' ? [x0 + W / 2, W * 1.04] : [x0 + W / 2, W * 1.04];
    K.prop((g, t) => {
      if (t < from) return;
      let k = 0; for (let i = 0; i < S.length; i++) if (t >= S[i][0]) k = i;
      const e = EASE.io(clamp((t - S[k][0]) / 1.0)), A = frame(k ? S[k - 1] : S[0]), Bf = frame(S[k]);
      const fx = A[0] + (Bf[0] - A[0]) * e, fw = A[1] + (Bf[1] - A[1]) * e, fh = 140 + 200 * clamp((1040 - fw) / 740);
      g.save(); g.strokeStyle = col; g.lineWidth = 6; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); g.beginPath(); g.moveTo(x1 - 30, y - 20); g.lineTo(x1, y); g.lineTo(x1 - 30, y + 20); g.stroke();
      g.font = FONT(34); g.fillStyle = GREY; g.textAlign = 'center';
      for (const ev of events) { const px = x0 + W * ev.p; g.beginPath(); g.moveTo(px, y - 12); g.lineTo(px, y + 12); g.stroke(); if (ev.label) g.fillText(ev.label, px, y + 60); }
      const mode = S[k][1], p = S[k][2] ?? 0.5, px = x0 + W * p;
      if (mode === 'in') {   // 框内：进行中的波浪，右端开口
        g.save(); g.beginPath(); g.rect(fx - fw / 2, y - fh / 2, fw, fh); g.clip();
        g.strokeStyle = BLUE; g.lineWidth = 8; g.beginPath();
        for (let i = 0; i <= 60; i++) { const wx = fx - fw / 2 + fw * i / 60, wy = y - 40 + Math.sin(i * 0.5 - t * 5) * 26 * e; i ? g.lineTo(wx, wy) : g.moveTo(wx, wy); } g.stroke(); g.restore();
      }
      if (mode === 'out') {   // 胶囊
        const cw = 70 + 60 * (1 - e); g.fillStyle = BLUE; g.globalAlpha = 0.9; rr(g, px - cw / 2, y - 62, cw, 44, 22); g.fill(); g.globalAlpha = 1; g.strokeStyle = INK; g.lineWidth = 3; rr(g, px - cw / 2, y - 62, cw, 44, 22); g.stroke();
      }
      // 取景框（四角）
      g.strokeStyle = OR; g.lineWidth = 6; const L = 36, X0 = fx - fw / 2, X1 = fx + fw / 2, Y0 = y - fh / 2, Y1 = y + fh / 2;
      for (const [cx, cy, sx, sy] of [[X0, Y0, 1, 1], [X1, Y0, -1, 1], [X0, Y1, 1, -1], [X1, Y1, -1, -1]]) { g.beginPath(); g.moveTo(cx + sx * L, cy); g.lineTo(cx, cy); g.lineTo(cx, cy + sy * L); g.stroke(); }
      g.font = '44px sans-serif'; g.fillText('🎥', X0 + 30, Y0 - 24);
      g.restore();
    }, { from, until, z: 2 });
    return { pos: p => [x0 + W * p, y] };
  };

  // ⑪ 双屏同步对比：左右两格同时播放各自的画面序列（beats = [[t, emoji]]，同一时刻两边一起换），diff 时刻两格一起闪黄框 + ⚡ 标出差异
  C.contrastSplitScreen = ({ left = {}, right = {}, from = 0, until = 1e9, diff = [], x = 120, y = 190, w = 1680, h = 560, psize = 200 }) => {
    use('contrastSplitScreen'); C.split({ x, y, w, h, from, until, labels: [left.label || '', right.label || ''] });
    for (const s of [left, right]) for (const [bt] of s.beats || []) dyn(bt - 0.1, bt + 0.8);
    for (const d of diff) dyn(d, d + 1.2);
    const half = (w - 40) / 2;
    K.prop((g, t) => {
      if (t < from) return;
      [left, right].forEach((s, i) => {
        const B = s.beats || []; let k = -1; for (let j = 0; j < B.length; j++) if (t >= B[j][0]) k = j; if (k < 0) return;
        const cx = x + i * (half + 40) + half / 2, cy = y + h / 2, q = clamp((t - B[k][0]) / 0.5);
        g.save(); g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `${psize}px sans-serif`;
        if (k > 0 && q < 1) { g.globalAlpha = 1 - q; g.fillText(B[k - 1][1], cx, cy); }
        g.globalAlpha = k > 0 ? q : EASE.out(q); g.fillText(B[k][1], cx, cy); g.restore();
      });
      for (const d of diff) if (t >= d && t < d + 1.2) {
        const a = Math.sin(Math.PI * (t - d) / 1.2);
        g.save(); g.globalAlpha = a; g.strokeStyle = '#facc15'; g.lineWidth = 12;
        for (const i of [0, 1]) { rr(g, x + i * (half + 40) - 8, y - 8, half + 16, h + 16, 28); g.stroke(); }
        g.font = '110px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('⚡', x + w / 2, y + h / 2); g.restore();
      }
    }, { from, until, z: 3 });
    return C;
  };


  C.finish = () => {
    const sc = K.done();
    const ins = { aha: C.AHA, predicts: C.PRED, ruleAt: C.RULE, uses: C.USES, dur: sc.DUR, texts: C.TEXTS, dyn: C.DYN, steps: C.STEPS, sdur: K.dur() };
    try { globalThis.__WB5_INSIGHT__ = ins; } catch (e) {}
    return { ...sc, INSIGHT: ins };
  };
  return C;
}
