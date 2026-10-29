// ==================== 第一性原理总枢 · 共用演示道具 ====================
// 只给 cases/fp_*.js 用。道具 = 手绘静态部分（P/T/F）+ 引擎 v2 动效（group/move/buzz/fade/rot/camera）。
// 用法：const D = FP_PROPS(k);  D.mouth(...)
const FP_PROPS = function (k) {
  const { C, P, T, F, go } = k;
  const MONO = '"Courier New",Courier,monospace';
  const D = { MONO };

  // 口腔侧面图（脸朝右）。返回 { cords: 声带组, lips: 嘴唇组（上唇可合拢）, glow(x,y) 标出发音位置 }
  // o.x,o.y = 左上角；整个图约 250×260
  D.mouth = (o = {}) => {
    const x = o.x ?? 50, y = o.y ?? 170, s = o.s ?? 1;
    const X = v => x + v * s, Y = v => y + v * s;
    const pt = (a, b) => `${X(a).toFixed(1)},${Y(b).toFixed(1)}`;
    // 脸的轮廓：额头 → 鼻子 → 上唇 → 下唇 → 下巴 → 脖子前面
    P(`M${pt(80, 0)} C${pt(140, 10)} ${pt(160, 40)} ${pt(165, 70)} L${pt(195, 95)} L${pt(170, 108)} C${pt(178, 112)} ${pt(182, 118)} ${pt(178, 124)}`, go(1.1), 1.1, { color: C.ink, w: 3 });
    P(`M${pt(178, 140)} C${pt(184, 146)} ${pt(180, 154)} ${pt(172, 158)} C${pt(170, 176)} ${pt(160, 190)} ${pt(140, 196)} L${pt(138, 260)}`, go(1), 1, { color: C.ink, w: 3 });
    // 脖子后面
    P(`M${pt(20, 60)} C${pt(10, 120)} ${pt(30, 180)} ${pt(40, 260)}`, go(.7), .7, { color: C.ink, w: 3 });
    // 上颚 + 喉咙后壁
    P(`M${pt(172, 128)} C${pt(140, 112)} ${pt(100, 108)} ${pt(80, 130)} C${pt(70, 145)} ${pt(72, 170)} ${pt(75, 260)}`, go(1), 1, { color: C.brown, w: 2.5 });
    // 舌头
    const tongue = `M${pt(168, 140)} C${pt(150, 128)} ${pt(118, 128)} ${pt(100, 150)} C${pt(95, 165)} ${pt(100, 185)} ${pt(102, 200)}`;
    P(tongue, go(.8), .8, { color: C.red, w: 3 });
    F(`${tongue} L${pt(110, 200)} C${pt(130, 175)} ${pt(150, 158)} ${pt(170, 150)} Z`, go(.3, 0), { color: "#fecdd3", op: .8 });
    // 气管前壁
    P(`M${pt(102, 200)} L${pt(104, 260)}`, go(.4), .4, { color: C.brown, w: 2.5 });
    // 声带（两片小肉，组：可抖动）
    const g0 = k.S.g;   // 画完声带组后回到调用方原来的组（v2 镜头组：擦黑板时一起擦掉；旧幕 g0 = 0，画面不变）
    const cords = k.group();
    P(`M${pt(75, 228)} L${pt(88, 222)} M${pt(104, 228)} L${pt(91, 222)}`, go(.5), .5, { color: C.purple, w: 5 });
    k.endGroup(); k.S.g = g0;
    T("声带", X(o.labelX ?? -20), Y(232), go(.5), .5, { size: 16, color: C.purple, weight: 900, anchor: "end" });
    P(k.wl(X(o.labelX ?? -16), Y(226), X(72), Y(225), .4), go(.3), .3, { color: C.purple, w: 1.5 });
    return {
      cords, X, Y,
      // 声带旁边的震动波纹（组），默认隐藏，用 k.fade 显示
      waves() {
        const g = k.group();
        P(`M${pt(58, 214)} q-8,10 0,20 M${pt(50, 208)} q-12,16 0,32 M${pt(120, 214)} q8,10 0,20 M${pt(128, 208)} q12,16 0,32`, go(.01, 0), .01, { color: C.orange, w: 2.5 });
        k.endGroup(); k.hide(g); return g;
      },
      // 在某个位置画一个亮点（发音位置）
      glow(a, b, color = C.orange) {
        const d = k.ellipse(X(a), Y(b), 9 * s, 9 * s);
        P(d, go(.35), .35, { color, w: 3 }); F(d, go(.1, 0), { color: "#fde68a", op: .9 });
      },
    };
  };

  // 正面嘴唇（上唇 / 下唇两个组），闭合：k.move(up, t, d, 0, gap/2) + k.move(lo, t, d, 0, -gap/2)
  D.lips = (cx, cy, w = 90, gap = 22) => {
    const g0 = k.S.g;
    const up = k.group();
    const du = `M${cx - w / 2},${cy - gap / 2} C${cx - w / 4},${cy - gap / 2 - 16} ${cx - 6},${cy - gap / 2 - 12} ${cx},${cy - gap / 2 - 6} C${cx + 6},${cy - gap / 2 - 12} ${cx + w / 4},${cy - gap / 2 - 16} ${cx + w / 2},${cy - gap / 2} C${cx + w / 4},${cy - gap / 2 + 4} ${cx - w / 4},${cy - gap / 2 + 4} ${cx - w / 2},${cy - gap / 2} Z`;
    P(du, go(.6), .6, { color: C.red, w: 2.5 }); F(du, go(.2, 0), { color: "#fda4af", op: .9 });
    k.endGroup();
    const lo = k.group();
    const dl = `M${cx - w / 2},${cy + gap / 2} C${cx - w / 4},${cy + gap / 2 - 4} ${cx + w / 4},${cy + gap / 2 - 4} ${cx + w / 2},${cy + gap / 2} C${cx + w / 4},${cy + gap / 2 + 20} ${cx - w / 4},${cy + gap / 2 + 20} ${cx - w / 2},${cy + gap / 2} Z`;
    P(dl, go(.6), .6, { color: C.red, w: 2.5 }); F(dl, go(.2, 0), { color: "#fda4af", op: .9 });
    k.endGroup(); k.S.g = g0;
    return { up, lo, close(t, d = .5) { k.move(up, t, d, 0, gap / 2 - 1); k.move(lo, t, d, 0, -gap / 2 + 1); }, open(t, d = .5) { k.move(up, t, d, 0, -gap / 2 + 1); k.move(lo, t, d, 0, gap / 2 - 1); } };
  };

  // 火柴人（组）：脚底在 (x,y)，bend=true 弯腰；返回组 id
  D.person = (x, y, color = C.purple, bend = false) => {
    const g = k.group();
    if (!bend) {
      P(k.ellipse(x, y - 52, 8, 8), go(.3), .3, { color, w: 2.5 });
      P(`M${x},${y - 44} L${x},${y - 18} M${x},${y - 18} L${x - 9},${y} M${x},${y - 18} L${x + 9},${y} M${x - 12},${y - 34} L${x + 12},${y - 34}`, go(.4), .4, { color, w: 2.5 });
    } else {
      P(k.ellipse(x + 20, y - 34, 8, 8), go(.3), .3, { color, w: 2.5 });
      P(`M${x + 13},${y - 29} L${x - 2},${y - 18} M${x - 2},${y - 18} L${x - 8},${y} M${x - 2},${y - 18} L${x + 8},${y} M${x + 6},${y - 24} L${x + 18},${y - 14}`, go(.4), .4, { color, w: 2.5 });
    }
    k.endGroup(); return g;
  };

  // 一刀切：在 (x, y0) 上方画刀，切到 y1，然后淡出。返回切下去的时间
  D.knife = (x, y0, y1) => {
    const g = k.group();
    const d = `M${x - 4},${y0 - 60} L${x + 4},${y0 - 60} L${x + 4},${y0} L${x - 4},${y0 - 8} Z M${x - 6},${y0 - 90} h12 v30 h-12 Z`;
    P(d, go(.5), .5, { color: C.ink, w: 2 }); F(d, go(.1, 0), { color: "#cbd5e1", op: 1 });
    k.endGroup();
    const t = go(1); k.move(g, t, .8, 0, y1 - y0 + 40); k.fade(g, t + .9, .3, 0);
    return t + .6;
  };
  // 左右两半（组）：pathL / pathR 已在一起，t 时刻分开 gap
  D.halves = (dL, dR, color, fill, t, gap = 12) => {
    const gl = k.group(); P(dL, go(.6, 0), .6, { color, w: 2.5 }); F(dL, go(.1, 0), { color: fill, op: .9 }); k.endGroup();
    const gr = k.group(); P(dR, go(.6), .6, { color, w: 2.5 }); F(dR, go(.1, 0), { color: fill, op: .9 }); k.endGroup();
    return { gl, gr, split(t2) { k.move(gl, t2, .5, -gap, 0); k.move(gr, t2, .5, gap, 0); } };   // gl / gr：v2 镜头里 D.adopt(h.gl, h.gr) 让擦黑板时一起擦（2026-10-30 只加返回值）
  };

  // 王座：座位中心 (cx, y)，返回座位上方坐人的位置
  D.throne = (cx, y, color = C.orange) => {
    const d = `M${cx - 50},${y} L${cx - 50},${y - 90} L${cx - 30},${y - 70} L${cx},${y - 100} L${cx + 30},${y - 70} L${cx + 50},${y - 90} L${cx + 50},${y} Z`;
    P(d, go(.9), .9, { color, w: 3 }); F(d, go(.2, 0), { color: "#fef3c7", op: 1 });
    P(k.roughRect(cx - 62, y, 124, 18) + ` M${cx - 54},${y + 18} v30 M${cx + 54},${y + 18} v30`, go(.6), .6, { color: C.brown, w: 3 });
    T("王座", cx, y + 70, go(.3), .3, { size: 14, color: C.brown, weight: 900, anchor: "middle" });
    return { x: cx, y: y - 30 };
  };
  // 戴王冠的词牌（组）：中心 (cx, y)
  D.king = (word, cx, y, color = C.red, crown = true) => {
    const g = k.group();
    const w = word.length * 22 * .6 + 24;
    P(k.roughRect(cx - w / 2, y - 18, w, 36), go(.4), .4, { color, w: 2.5 }); F(k.rectD(cx - w / 2, y - 18, w, 36), go(.1, 0), { color: "#fff", op: 1 });
    T(word, cx, y + 8, go(.3), .3, { size: 22, color, weight: 900, font: MONO, anchor: "middle" });
    if (crown) { const c = `M${cx - 14},${y - 22} l4,-14 l6,8 l4,-12 l4,12 l6,-8 l4,14 Z`; P(c, go(.3), .3, { color: C.orange, w: 2 }); F(c, go(.1, 0), { color: "#fde047", op: 1 }); }
    k.endGroup(); return g;
  };

  // 令牌（组）：金色圆牌，中心 (cx, cy)
  D.token = (label, cx, cy, r = 17) => {
    const g = k.group();
    const d = k.ellipse(cx, cy, r, r);
    P(d, go(.4), .4, { color: C.orange, w: 3 }); F(d, go(.1, 0), { color: "#fde047", op: 1 });
    T(label, cx, cy + 6, go(.3), .3, { size: label.length > 2 ? 13 : 17, color: C.brown, weight: 900, font: MONO, anchor: "middle" });
    k.endGroup(); return g;
  };

  // 小标签框（等宽英文/音标）
  D.tag = (text, x, y, color = C.blue, size = 20) => {
    const w = text.length * size * .6 + 18, h = size + 14;
    P(k.roughRect(x, y - h + 7, w, h), go(.4, 0), .4, { color, w: 2.2 });
    T(text, x + 9, y, go(Math.max(.4, text.length * .06)), Math.max(.4, text.length * .06), { size, color, weight: 900, font: MONO });
    return { x, y, w, h };
  };

  // 分段上色的等宽一行：parts = [["/ˈbʌs", C.ink], ["ɪ", C.orange], ["z/", C.ink]]，返回结束 x
  D.parts = (parts, x, y, size = 24, weight = 900) => {
    let cx = x;
    parts.forEach(([text, color]) => {
      const dur = Math.max(.3, text.length * .07);
      T(text.replace(/ /g, "\u00a0"), cx, y, go(dur), dur, { size, color, weight, font: MONO });
      cx += text.length * size * .6;
    });
    return cx;
  };

  // 结论绿框 + 口诀（y 446–498 + 525）
  D.fin = (concl, rhyme) => {
    P(k.roughRect(16, 446, 928, 52), go(1), 1, { color: C.green, w: 2.5 });
    F(k.rectD(16, 446, 928, 52), go(.2, 0), { color: "#ecfdf5", op: .9 });
    T(concl, 36, 480, go(Math.max(1.6, concl.length * .07)), Math.max(1.6, concl.length * .07), { size: 20, color: C.green, weight: 900 });
    T(rhyme, 36, 526, go(1.8), 1.8, { size: 18, color: C.orange, weight: 900 });
  };
  return D;
};
