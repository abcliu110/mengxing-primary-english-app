// ==================== 白板脚本：⑨「时×体」二维时空矩阵沙盘 5 个时态 ====================
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
// 版面：左上 3×3 时×体矩阵 · 右上时间轴（过去/现在/将来）+ 镜头图 · 中间公式和 4 个例句 · 信号词 · 陷阱 · 底部结论框。
// v2 升级（2026-10-30，决策 24）：逐个案例升引擎 v2 + 讲解员（每案例：时间轴 + 格子 / 公式 + 前两句 / 后两句 / 信号词 + 陷阱 + 结论 四个镜头 → 🔮 预测 → 金句卡），版面工具 TM_V2；升级前整份文件原样保存在 cases/tense_matrix_classic.js。依赖 wo_props。
// 进度：① 已升 v2；②–⑤ 仍是旧版（TM_KIT），全部升完后删 TM_KIT。
const TM_KIT = function (k) {
  const { C, P, T, F, go, wl, ellipse, rectD, roughRect, estW } = k;
  const MONO = '"Courier New",Courier,monospace';
  const A = { y: 168, x0: 350, x1: 925, past: 450, now: 640, fut: 830 };
  const pos = (text, x, y, size) => {
    const cw = size * .6;
    const at = (sub, nth = 0) => { let i = -1; for (let n = 0; n <= nth; n++) i = text.indexOf(sub, i + 1); return i; };
    // atW：按整词找（前后不是字母），用于给 is / are / have 这类短词划线
    const atW = (sub, nth = 0) => { let c = -1; for (let i = text.indexOf(sub); i >= 0; i = text.indexOf(sub, i + 1)) { if (/[A-Za-z]/.test(text[i - 1] || " ") || /[A-Za-z]/.test(text[i + sub.length] || " ")) continue; if (++c === nth) return i; } return at(sub, nth); };
    return { x, y, size, cw, text, at, atW, x0: (s, n) => x + at(s, n) * cw, x1: (s, n) => x + (at(s, n) + s.length) * cw, end: x + text.length * cw };
  };
  const h = {
    A,
    // 时间轴：过去 → 现在 → 将来
    axis() {
      P(wl(A.x0, A.y, A.x1, A.y, .8) + ` M${A.x1 - 13},${A.y - 7} L${A.x1},${A.y} L${A.x1 - 13},${A.y + 7}`, go(1.0), 1.0, { color: C.ink, w: 3 });
      [[A.past, "过去 Past", C.brown], [A.now, "现在 Now", C.red], [A.fut, "将来 Future", C.blue]].forEach(([x, s, c]) => {
        P(wl(x, A.y - 8, x, A.y + 8, .3), go(.2), .2, { color: c, w: 3 });
        T(s, x, A.y + 30, go(.6), .6, { size: 16, color: c, weight: 900, anchor: "middle" });
      });
    },
    // 3×3 时×体矩阵：col 0 过去 / 1 现在 / 2 将来；row 0 一般 / 1 进行 / 2 完成
    matrix(col, row, label, beforeHL) {
      const x0 = 100, cw = 70, y0 = 102, rh = 34;
      T("体＼时", 40, 94, go(.4), .4, { size: 13, color: C.grey, weight: 900 });
      ["过去", "现在", "将来"].forEach((s, i) => T(s, x0 + cw * (i + .5), 94, go(.3), .3, { size: 15, color: C.ink, weight: 900, anchor: "middle" }));
      ["一般", "进行", "完成"].forEach((s, j) => T(s, 48, y0 + rh * (j + .5) + 6, go(.3), .3, { size: 15, color: C.ink, weight: 900 }));
      P(roughRect(x0, y0, cw * 3, rh * 3), go(.6), .6, { color: C.grey, w: 2 });
      for (let i = 1; i < 3; i++) P(wl(x0 + cw * i, y0, x0 + cw * i, y0 + rh * 3, .5), go(.15), .15, { color: C.grey, w: 1.5 });
      for (let j = 1; j < 3; j++) P(wl(x0, y0 + rh * j, x0 + cw * 3, y0 + rh * j, .5), go(.15), .15, { color: C.grey, w: 1.5 });
      if (beforeHL) beforeHL();
      const cx = x0 + cw * col, cy = y0 + rh * row;
      P(roughRect(cx + 4, cy + 4, cw - 8, rh - 8), go(.5), .5, { color: C.orange, w: 3 });
      F(rectD(cx + 4, cy + 4, cw - 8, rh - 8), go(.3), { color: "#fde68a", op: .9 });
      T(label, cx + cw / 2, cy + rh / 2 + 5, go(.6), .6, { size: 11, color: C.red, weight: 900, anchor: "middle" });
    },
    dot(x, color = C.orange, r = 6) {
      const d = ellipse(x, A.y, r, r);
      P(d, go(.25), .25, { color, w: 2.5 }); F(d, go(.05, 0), { color, op: 1 });
    },
    // 快照相机
    camera(cx, cy) {
      P(roughRect(cx - 12, cy - 26, 22, 8), go(.3), .3, { color: C.ink, w: 2.5 });
      P(roughRect(cx - 30, cy - 18, 60, 38), go(.6), .6, { color: C.ink, w: 2.5 });
      F(rectD(cx - 30, cy - 18, 60, 38), go(.2, 0), { color: "#e0f2fe", op: .95 });
      const l = ellipse(cx, cy + 1, 11, 11);
      P(l, go(.4), .4, { color: C.blue, w: 2.5 }); F(l, go(.1, 0), { color: "#fff", op: 1 });
    },
    // 录像机
    video(cx, cy) {
      const r1 = ellipse(cx - 20, cy - 27, 9, 9), r2 = ellipse(cx + 2, cy - 27, 9, 9);
      P(r1, go(.3), .3, { color: C.ink, w: 2.5 }); P(r2, go(.3), .3, { color: C.ink, w: 2.5 });
      P(roughRect(cx - 34, cy - 16, 52, 34), go(.6), .6, { color: C.ink, w: 2.5 });
      F(rectD(cx - 34, cy - 16, 52, 34), go(.2, 0), { color: "#ede9fe", op: .95 });
      const tri = `M${cx + 20},${cy + 1} L${cx + 38},${cy - 11} L${cx + 38},${cy + 13} Z`;
      P(tri, go(.3), .3, { color: C.ink, w: 2.5 }); F(tri, go(.1, 0), { color: "#ede9fe", op: .95 });
      const rec = ellipse(cx - 24, cy - 6, 4, 4);
      P(rec, go(.2), .2, { color: C.red, w: 2 }); F(rec, go(.05, 0), { color: C.red, op: 1 });
      T("REC", cx - 16, cy - 1, go(.3), .3, { size: 11, color: C.red, weight: 900, font: MONO });
    },
    // 老照片
    photo(cx, cy) {
      P(roughRect(cx - 36, cy - 26, 72, 50), go(.6), .6, { color: C.brown, w: 2.5 });
      F(rectD(cx - 36, cy - 26, 72, 50), go(.2, 0), { color: "#fef3c7", op: .95 });
      P(`M${cx - 28},${cy + 18} L${cx - 10},${cy - 6} L${cx + 4},${cy + 10} L${cx + 14},${cy} L${cx + 28},${cy + 18}`, go(.5), .5, { color: C.brown, w: 2 });
      const s = ellipse(cx + 18, cy - 13, 6, 6);
      P(s, go(.2), .2, { color: C.orange, w: 2 }); F(s, go(.05, 0), { color: "#fde047", op: 1 });
    },
    // 望远镜：从 (x1,y1) 细头到 (x2,y2) 粗头
    telescope(x1, y1, x2, y2) {
      const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L, r1 = 6, r2 = 12;
      const d = `M${x1 + nx * r1},${y1 + ny * r1} L${x2 + nx * r2},${y2 + ny * r2} L${x2 - nx * r2},${y2 - ny * r2} L${x1 - nx * r1},${y1 - ny * r1} Z`;
      P(d, go(.7), .7, { color: C.purple, w: 2.5 }); F(d, go(.2, 0), { color: "#ddd6fe", op: .95 });
      P(wl((x1 * 2 + x2) / 3 + nx * 9, (y1 * 2 + y2) / 3 + ny * 9, (x1 * 2 + x2) / 3 - nx * 9, (y1 * 2 + y2) / 3 - ny * 9, .3), go(.2), .2, { color: C.purple, w: 2.5 });
      // 三脚架
      const bx = (x1 + x2) / 2, by = (y1 + y2) / 2 + 4;
      P(wl(bx, by, bx - 16, A.y - 8, .4) + " " + wl(bx, by, bx + 14, A.y - 8, .4).replace(/^M/, "M"), go(.4), .4, { color: C.ink, w: 2 });
    },
    // 奖杯（成果）
    trophy(cx, cy) {
      const d = `M${cx - 16},${cy - 18} h32 q0,22 -16,24 q-16,-2 -16,-24 Z`;
      P(d, go(.5), .5, { color: C.orange, w: 2.5 }); F(d, go(.2, 0), { color: "#fde047", op: 1 });
      P(wl(cx, cy + 6, cx, cy + 14, .2) + " " + wl(cx - 11, cy + 15, cx + 11, cy + 15, .3), go(.3), .3, { color: C.orange, w: 3 });
    },
    // 圈出等宽文字里的一段
    ring(m, sub, nth = 0, color = C.red) {
      const x0 = m.x0(sub, nth), x1 = m.x1(sub, nth);
      P(ellipse((x0 + x1) / 2, m.y - m.size * .32, (x1 - x0) / 2 + 5, m.size * .66), go(.4), .4, { color, w: 2.5 });
    },
    uline(m, sub, nth = 0, color = C.orange) { const a = m.x + m.atW(sub, nth) * m.cw; P(wl(a, m.y + 6, a + sub.length * m.cw, m.y + 6, .5), go(.4), .4, { color, w: 3.5 }); },
    // 公式行
    formula(text, y, label = "公式：", size = 16) {
      T(label, 40, y, go(.4), .4, { size, color: C.red, weight: 900 });
      const dur = Math.max(1, text.length * .06);
      T(text, 40 + estW(label, size) + 2, y, go(dur), dur, { size, color: C.purple, weight: 900 });
    },
    // 例句：主语（青）+ 动词部分（蓝）+ 右边灰色小标签
    ex(subj, verb, y, tag) {
      const text = subj + " " + verb, room = (tag ? 935 - estW(tag, 14) - 24 : 935) - 40;
      const size = Math.min(17, room / (text.length * .6)), cw = size * .6;
      const d1 = Math.max(.5, subj.length * .05), d2 = Math.max(.9, verb.length * .05);
      T(subj, 40, y, go(d1, .05), d1, { size, color: "#0d9488", weight: 900, font: MONO });
      T(verb, 40 + (subj.length + 1) * cw, y, go(d2), d2, { size, color: C.blue, weight: 700, font: MONO });
      if (tag) T(tag, 935, y, go(.6), .6, { size: 14, color: C.grey, weight: 900, anchor: "end" });
      return pos(text, 40, y, size);
    },
    signals(text, y) {
      const lab = "信号词：", size = Math.min(15, (895 - estW(lab, 15)) / estW(text, 1));
      T(lab, 40, y, go(.4), .4, { size: 15, color: C.red, weight: 900 });
      const dur = Math.max(1.2, text.length * .03);
      T(text, 40 + estW(lab, 15) + 2, y, go(dur), dur, { size, color: "#0f766e", weight: 800 });
    },
    // 陷阱：错句划掉 → 正确句
    trapFix(bad, badSub, good, y) {
      T("陷阱：", 40, y, go(.4), .4, { size: 16, color: C.red, weight: 900 });
      const x = 40 + estW("陷阱：", 16) + 4, dur = Math.max(.8, bad.length * .05);
      T(bad, x, y, go(dur), dur, { size: 16, color: C.red, weight: 700, font: MONO });
      const m = pos(bad, x, y, 16);
      P(wl(m.x0(badSub) - 2, y - 5, m.x1(badSub) + 2, y - 5, .4), go(.35), .35, { color: C.red, w: 3 });
      T("→", m.end + 12, y, go(.3), .3, { size: 16, color: C.ink, weight: 900 });
      const d2 = Math.max(.8, good.length * .05);
      T(good, m.end + 40, y, go(d2), d2, { size: 16, color: C.green, weight: 900, font: MONO });
      return m;
    },
    trapText(text, y) {
      const size = Math.min(16, 895 / estW("陷阱：" + text, 1));
      T("陷阱：", 40, y, go(.4), .4, { size, color: C.red, weight: 900 });
      const dur = Math.max(1, text.length * .05);
      T(text, 40 + estW("陷阱：", size) + 2, y, go(dur), dur, { size, color: C.red, weight: 800 });
    }
  };
  return h;
};

// ───────── v2 版面（2026-10-30，决策 24）─────────
// 讲解员站在右侧 x≈892，内容收在 x≤800；原来一屏（矩阵 + 时间轴 + 公式 + 4 例句 + 信号词 + 陷阱 + 结论）拆成 4 个镜头：
// ① 时间轴 + 时×体格子 + 镜头图 / ② 公式 + 前两句 / ③ 后两句 / ④ 信号词 + 陷阱 + 结论 → 🔮 预测 → 金句卡。
// 时间轴从 x 350–925 收到 380–800（过去 440 · 现在 600 · 将来 760），在矩阵右边；原来写在句子右边 x=935 的灰色小标签改成右对齐到 x=800。
// 配色只用 V3 k.PAL：过去墨黑 · 现在红 · 将来蓝；主语墨黑、动词部分蓝；词尾变化红圈、助动词蓝下划线；信号词绿；陷阱红 → 正确绿；橙 / 紫 / 褐 / 青都改 V3。
const TM_V2 = function (k, D) {
  const { P, T, F, go, wl, ellipse, rectD, roughRect, estW } = k, C = k.PAL, MONO = D.MONO;
  const A = { y: 250, x0: 380, x1: 800, past: 440, now: 600, fut: 760 };
  A.map = x => Math.round(A.x0 + (x - 350) * (A.x1 - A.x0) / 575);      // 旧时间轴 x（350–925）→ 新时间轴 x
  const pos = (text, x, y, size) => {
    const cw = size * .6;
    const at = (sub, nth = 0) => { let i = -1; for (let n = 0; n <= nth; n++) i = text.indexOf(sub, i + 1); return i; };
    // atW：按整词找（前后不是字母），用于给 is / are / have 这类短词划线
    const atW = (sub, nth = 0) => { let c = -1; for (let i = text.indexOf(sub); i >= 0; i = text.indexOf(sub, i + 1)) { if (/[A-Za-z]/.test(text[i - 1] || " ") || /[A-Za-z]/.test(text[i + sub.length] || " ")) continue; if (++c === nth) return i; } return at(sub, nth); };
    return { x, y, size, cw, text, at, atW, x0: (s, n) => x + at(s, n) * cw, x1: (s, n) => x + (at(s, n) + s.length) * cw, end: x + text.length * cw };
  };
  const h = {
    A, pos,
    // 时间轴：过去 → 现在 → 将来
    axis() {
      P(wl(A.x0, A.y, A.x1, A.y, .8) + ` M${A.x1 - 13},${A.y - 7} L${A.x1},${A.y} L${A.x1 - 13},${A.y + 7}`, go(1.0), 1.0, { color: C.ink, w: 3 });
      [[A.past, "过去 Past", C.ink], [A.now, "现在 Now", C.red], [A.fut, "将来 Future", C.blue]].forEach(([x, s, c]) => {
        P(wl(x, A.y - 8, x, A.y + 8, .3), go(.2), .2, { color: c, w: 3 });
        T(s, x, A.y + 30, go(.6), .6, { size: 16, color: c, weight: 900, anchor: "middle" });
      });
    },
    // 3×3 时×体矩阵：col 0 过去 / 1 现在 / 2 将来；row 0 一般 / 1 进行 / 2 完成；返回高亮格中心
    matrix(col, row, label, beforeHL) {
      const x0 = 100, cw = 80, y0 = 146, rh = 38;
      T("体＼时", 40, 136, go(.4), .4, { size: 13, color: C.grey, weight: 900 });
      ["过去", "现在", "将来"].forEach((s, i) => T(s, x0 + cw * (i + .5), 136, go(.3), .3, { size: 15, color: C.ink, weight: 900, anchor: "middle" }));
      ["一般", "进行", "完成"].forEach((s, j) => T(s, 48, y0 + rh * (j + .5) + 6, go(.3), .3, { size: 15, color: C.ink, weight: 900 }));
      P(roughRect(x0, y0, cw * 3, rh * 3), go(.6), .6, { color: C.grey, w: 2 });
      for (let i = 1; i < 3; i++) P(wl(x0 + cw * i, y0, x0 + cw * i, y0 + rh * 3, .5), go(.15), .15, { color: C.grey, w: 1.5 });
      for (let j = 1; j < 3; j++) P(wl(x0, y0 + rh * j, x0 + cw * 3, y0 + rh * j, .5), go(.15), .15, { color: C.grey, w: 1.5 });
      if (beforeHL) beforeHL();
      const cx = x0 + cw * col, cy = y0 + rh * row;
      P(roughRect(cx + 4, cy + 4, cw - 8, rh - 8), go(.5), .5, { color: C.red, w: 3 });
      F(rectD(cx + 4, cy + 4, cw - 8, rh - 8), go(.3), { color: C.hlYellow, op: .75 });
      T(label, cx + cw / 2, cy + rh / 2 + 5, go(.6), .6, { size: 13, color: C.red, weight: 900, anchor: "middle" });
      return [cx + cw / 2, cy + rh / 2];
    },
    dot(x, color = C.red, r = 6) {
      const d = ellipse(x, A.y, r, r);
      P(d, go(.25), .25, { color, w: 2.5 }); F(d, go(.05, 0), { color, op: 1 });
    },
    // 快照相机
    camera(cx, cy) {
      P(roughRect(cx - 12, cy - 26, 22, 8), go(.3), .3, { color: C.ink, w: 2.5 });
      P(roughRect(cx - 30, cy - 18, 60, 38), go(.6), .6, { color: C.ink, w: 2.5 });
      F(rectD(cx - 30, cy - 18, 60, 38), go(.2, 0), { color: C.tintBlue, op: .95 });
      const l = ellipse(cx, cy + 1, 11, 11);
      P(l, go(.4), .4, { color: C.blue, w: 2.5 }); F(l, go(.1, 0), { color: "#fff", op: 1 });
    },
    // 录像机（REC 红点单独一组，可以闪）
    video(cx, cy) {
      const r1 = ellipse(cx - 20, cy - 27, 9, 9), r2 = ellipse(cx + 2, cy - 27, 9, 9);
      P(r1, go(.3), .3, { color: C.ink, w: 2.5 }); P(r2, go(.3), .3, { color: C.ink, w: 2.5 });
      P(roughRect(cx - 34, cy - 16, 52, 34), go(.6), .6, { color: C.ink, w: 2.5 });
      F(rectD(cx - 34, cy - 16, 52, 34), go(.2, 0), { color: C.tintBlue, op: .95 });
      const tri = `M${cx + 20},${cy + 1} L${cx + 38},${cy - 11} L${cx + 38},${cy + 13} Z`;
      P(tri, go(.3), .3, { color: C.ink, w: 2.5 }); F(tri, go(.1, 0), { color: C.tintBlue, op: .95 });
      const rec = ellipse(cx - 24, cy - 6, 4, 4);
      P(rec, go(.2), .2, { color: C.red, w: 2 }); F(rec, go(.05, 0), { color: C.red, op: 1 });
      T("REC", cx - 16, cy - 1, go(.3), .3, { size: 11, color: C.red, weight: 900, font: MONO });
    },
    // 老照片
    photo(cx, cy) {
      P(roughRect(cx - 36, cy - 26, 72, 50), go(.6), .6, { color: C.ink, w: 2.5 });
      F(rectD(cx - 36, cy - 26, 72, 50), go(.2, 0), { color: C.tintInk, op: .95 });
      P(`M${cx - 28},${cy + 18} L${cx - 10},${cy - 6} L${cx + 4},${cy + 10} L${cx + 14},${cy} L${cx + 28},${cy + 18}`, go(.5), .5, { color: C.green, w: 2 });
      const s = ellipse(cx + 18, cy - 13, 6, 6);
      P(s, go(.2), .2, { color: C.ink, w: 2 }); F(s, go(.05, 0), { color: C.hlYellow, op: 1 });
    },
    // 望远镜：从 (x1,y1) 细头到 (x2,y2) 粗头
    telescope(x1, y1, x2, y2) {
      const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L, r1 = 6, r2 = 12;
      const d = `M${x1 + nx * r1},${y1 + ny * r1} L${x2 + nx * r2},${y2 + ny * r2} L${x2 - nx * r2},${y2 - ny * r2} L${x1 - nx * r1},${y1 - ny * r1} Z`;
      P(d, go(.7), .7, { color: C.blue, w: 2.5 }); F(d, go(.2, 0), { color: C.tintBlue, op: .95 });
      P(wl((x1 * 2 + x2) / 3 + nx * 9, (y1 * 2 + y2) / 3 + ny * 9, (x1 * 2 + x2) / 3 - nx * 9, (y1 * 2 + y2) / 3 - ny * 9, .3), go(.2), .2, { color: C.blue, w: 2.5 });
      const bx = (x1 + x2) / 2, by = (y1 + y2) / 2 + 4;
      P(wl(bx, by, bx - 16, A.y - 8, .4) + " " + wl(bx, by, bx + 14, A.y - 8, .4), go(.4), .4, { color: C.ink, w: 2 });
    },
    // 奖杯（成果）
    trophy(cx, cy) {
      const d = `M${cx - 16},${cy - 18} h32 q0,22 -16,24 q-16,-2 -16,-24 Z`;
      P(d, go(.5), .5, { color: C.ink, w: 2.5 }); F(d, go(.2, 0), { color: C.hlYellow, op: 1 });
      P(wl(cx, cy + 6, cx, cy + 14, .2) + " " + wl(cx - 11, cy + 15, cx + 11, cy + 15, .3), go(.3), .3, { color: C.ink, w: 3 });
    },
    // 圈出等宽文字里的一段（词尾变化：红）
    ring(m, sub, nth = 0, color = C.red) {
      const x0 = m.x0(sub, nth), x1 = m.x1(sub, nth);
      P(ellipse((x0 + x1) / 2, m.y - m.size * .32, (x1 - x0) / 2 + 5, m.size * .66), go(.4), .4, { color, w: 2.5 });
      return (x0 + x1) / 2;
    },
    // 助动词下划线（蓝）
    uline(m, sub, nth = 0, color = C.blue) { const a = m.x + m.atW(sub, nth) * m.cw; P(wl(a, m.y + 6, a + sub.length * m.cw, m.y + 6, .5), go(.4), .4, { color, w: 3.5 }); return a + sub.length * m.cw / 2; },
    // 公式行（x≤800）
    formula(text, y, label = "公式：", size = 16) {
      size = Math.min(size, 760 / estW(label + text, 1));
      T(label, 40, y, go(.4), .4, { size, color: C.red, weight: 900 });
      const dur = Math.max(1, text.length * .06);
      T(text, 40 + estW(label, size) + 2, y, go(dur), dur, { size, color: C.blue, weight: 900 });
    },
    // 例句：主语（墨黑）+ 动词部分（蓝）+ 右边灰色小标签（右对齐到 x=800）
    ex(subj, verb, y, tag) {
      const text = subj + " " + verb, room = (tag ? 800 - estW(tag, 14) - 20 : 800) - 40;
      const size = Math.min(18, room / (text.length * .6)), cw = size * .6;
      const d1 = Math.max(.5, subj.length * .05), d2 = Math.max(.9, verb.length * .05);
      T(subj, 40, y, go(d1, .05), d1, { size, color: C.ink, weight: 900, font: MONO });
      T(verb, 40 + (subj.length + 1) * cw, y, go(d2), d2, { size, color: C.blue, weight: 700, font: MONO });
      if (tag) T(tag, 800, y, go(.6), .6, { size: 14, color: C.grey, weight: 900, anchor: "end" });
      return pos(text, 40, y, size);
    },
    // 信号词：一行放不下（字号会小于 14）就在「 · 」处折成两行
    signals(text, y) {
      const lab = "信号词：", lw = estW(lab, 15) + 2, room = 800 - 40 - lw;
      T(lab, 40, y, go(.4), .4, { size: 15, color: C.red, weight: 900 });
      let lines = [text];
      if (room / estW(text, 1) < 14) {
        const parts = text.split(" · "), half = estW(text, 1) / 2; let a = [], b = [], w = 0;
        parts.forEach(p => { if (w < half) { a.push(p); w += estW(p + " · ", 1); } else b.push(p); });
        lines = [a.join(" · ") + " ·", b.join(" · ")];
      }
      lines.forEach((ln, i) => {
        const size = Math.min(15, room / estW(ln, 1)), dur = Math.max(1, ln.length * .03);
        T(ln, 40 + lw, y + i * 26, go(dur), dur, { size, color: C.green, weight: 800 });
      });
      return y + (lines.length - 1) * 26;
    },
    // 陷阱：错句划掉 → 正确句（放不下就把正确句放到下一行）
    trapFix(bad, badSub, good, y) {
      T("陷阱：", 40, y, go(.4), .4, { size: 16, color: C.red, weight: 900 });
      const x = 40 + estW("陷阱：", 16) + 4, dur = Math.max(.8, bad.length * .05);
      T(bad, x, y, go(dur), dur, { size: 16, color: C.red, weight: 700, font: MONO });
      const m = pos(bad, x, y, 16);
      P(wl(m.x0(badSub) - 2, y - 5, m.x1(badSub) + 2, y - 5, .4), go(.35), .35, { color: C.red, w: 3 });
      const one = m.end + 40 + good.length * 9.6 <= 800, gx = one ? m.end + 40 : x + 28, gy = one ? y : y + 30;
      T("→", gx - 28, gy, go(.3), .3, { size: 16, color: C.ink, weight: 900 });
      const d2 = Math.max(.8, good.length * .05);
      T(good, gx, gy, go(d2), d2, { size: 16, color: C.green, weight: 900, font: MONO });
      return m;
    },
    trapText(text, y) {
      const size = Math.min(16, 760 / estW("陷阱：" + text, 1));
      T("陷阱：", 40, y, go(.4), .4, { size, color: C.red, weight: 900 });
      const dur = Math.max(1, text.length * .05);
      T(text, 40 + estW("陷阱：", size) + 2, y, go(dur), dur, { size, color: C.red, weight: 800 });
    },
    // 普通文字
    note(text, x, y, o = {}) {
      const dur = o.dur || Math.max(.6, [...text].length * .06);
      T(text, x, y, go(dur), dur, { size: 15, color: C.grey, weight: 700, ...o });
    },
    // 底部结论框（代替旧 k.final：宽度收在 x≤800，讲解员不用退场）：绿框 + 绿字句子 + 谓语蓝下划线 + 灰色口诀行；同样朗读句子
    final(text, crown, zhLine, o = {}) {
      const size = Math.min(22, 740 / (text.length * .6)), cw = size * .6, w = Math.min(784, Math.max(380, text.length * cw + 48));
      P(roughRect(16, 448, w, 48), go(.9), .9, { color: C.green, w: 2 });
      F(rectD(16, 448, w, 48), go(.2, 0), { color: C.tintGreen, op: .55 });
      T(text, 40, 479, go(Math.max(1.6, text.length * .04)), Math.max(1.6, text.length * .04), { size, color: C.green, weight: 900, font: MONO });
      (Array.isArray(crown) ? crown : [crown]).forEach(wd => {
        const i = (" " + text + " ").search(new RegExp("[ ,]" + wd + "[ ,.]"));
        if (i >= 0) P(wl(40 + i * cw, 488, 40 + (i + wd.length) * cw, 488, .6), go(.4), .4, { color: C.blue, w: 4 });
      });
      T(zhLine, 40, 524, go(1.4), 1.4, { size: 17, color: C.grey });
      k.say(o.say ?? text, { zh: o.zh ?? String(zhLine || "").split(/\s{2,}/)[0], word: o.word });
      return k.S.says[k.S.says.length - 1];
    },
    // 🔮 预测题框
    quiz(zhLine, ask) {
      P(roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
      F(rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
      T(zhLine, 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      const size = Math.min(21, 720 / (ask.length * .6));
      T(ask, 64, 286, go(1), 1, { size, color: C.ink, weight: 900, font: MONO });
    },
    reveal(text) { T(text, 64, 330, go(1), 1, { size: Math.min(22, 720 / (text.length * .6)), color: C.green, weight: 900, font: MONO }); },
    // 场景小件：地面线
    ground(x0, x1, y) { P(wl(x0, y, x1, y, .6), go(.3), .3, { color: C.ink, w: 2 }); },
    // 足球（组）：中心 (x,y)
    ball(x, y) {
      const g = D.sub();
      P(ellipse(x, y, 9, 9), go(.25), .25, { color: C.ink, w: 2.2 }); F(ellipse(x, y, 9, 9), go(.05, 0), { color: "#fff", op: 1 });
      P(`M${x - 3},${y - 3} l6,0 l2,5 l-5,3 l-5,-3 Z`, go(.15), .15, { color: C.ink, w: 1.6 });
      D.back(); return g;
    },
    // 小汽车（组）：车底中心 (x,y)
    car(x, y) {
      const g = D.sub(), body = `M${x - 46},${y - 10} L${x - 46},${y - 26} L${x - 26},${y - 26} L${x - 14},${y - 42} L${x + 18},${y - 42} L${x + 30},${y - 26} L${x + 46},${y - 26} L${x + 46},${y - 10} Z`;
      P(body, go(.6), .6, { color: C.blue, w: 2.5 }); F(body, go(.1, 0), { color: C.tintBlue, op: 1 });
      [x - 26, x + 26].forEach(wx => { P(ellipse(wx, y - 8, 9, 9), go(.2), .2, { color: C.ink, w: 2.5 }); F(ellipse(wx, y - 8, 9, 9), go(.05, 0), { color: C.ink, op: 1 }); });
      D.back(); return g;
    },
    // 小鸟（组）：中心 (x,y)
    bird(x, y, s = 1.8) {
      const g = D.sub();
      P(`M${x - 15 * s},${y} q${8 * s},${-10 * s} ${15 * s},0 q${7 * s},${-10 * s} ${15 * s},0`, go(.25), .25, { color: C.ink, w: 2.8 });
      D.back(); return g;
    },
    // 风筝（组）：中心 (x,y)，线拖到 (hx,hy)
    kite(x, y) {
      const g = D.sub(), d = `M${x},${y - 22} L${x + 16},${y} L${x},${y + 26} L${x - 16},${y} Z`;
      P(d, go(.5), .5, { color: C.red, w: 2.5 }); F(d, go(.1, 0), { color: C.tintRed, op: 1 });
      P(`M${x},${y + 26} q-6,10 4,18 q8,8 -2,16`, go(.3), .3, { color: C.red, w: 2 });
      D.back(); return g;
    },
    // 房子：底边左端 (x,y)，宽 w
    house(x, y, w = 90) {
      const roof = `M${x - 8},${y - 52} L${x + w / 2},${y - 92} L${x + w + 8},${y - 52} Z`;
      P(roughRect(x, y - 52, w, 52), go(.5), .5, { color: C.ink, w: 2.5 }); F(rectD(x, y - 52, w, 52), go(.1, 0), { color: C.tintInk, op: 1 });
      P(roof, go(.4), .4, { color: C.red, w: 2.5 }); F(roof, go(.1, 0), { color: C.tintRed, op: 1 });
      P(roughRect(x + w / 2 - 10, y - 30, 20, 30), go(.3), .3, { color: C.ink, w: 2 });
    }
  };
  return h;
};

WB_LAB.tense_matrix = [
  // ───────── ① 一般现在时（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/tense_matrix_classic.js（R1 零丢失）。原一屏拆成 4 个镜头（时间轴 + 格子 + 习惯小圆点 + 地球绕太阳 / 公式 + 原形 · 单三 / -es · y→ies / 信号词 + 照妖镜 + 结论）+ 🔮 预测 + 金句卡；
  // R4：读到 The earth goes around the sun 时地球绕太阳转一圈；They play football 时讲解员跳起来；He plays football 时场景里的小男孩带球跑、足球滚进球门；
  // goes to work by car 时小汽车开走；The little bird flies 时小鸟飞过；预测题 She goes to school 时讲解员走一段。
  {
    build(k) {
      k.v2();
      const { N, P, T, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = TM_V2(k, D), A = h.A;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "同一个 play，为什么有时写 plays、played，有时写 is playing？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "① 一般现在时", sub: "现在 × 一般体", badges: ["💡", "✂️"], steps: ["① 时间轴", "② 时×体格子", "③ 公式", "④ 例句", "⑤ 信号词·陷阱", "🔮 预测"], cardDur: 3.6 });

      // ───── 镜头 1 · 时间轴 + 时×体格子 + 档案照 + 习惯小圆点 + 客观真理 ─────
      D.step(0); D.shot();
      N("时态：", "英语动词会「变身」，告诉你事情是什么时候发生、正处在什么样子。");
      k.wait(1.0);
      N("时间轴：", "一根从左到右的线：左边是过去，中间是现在，右边是将来。这就是「时」。");
      h.axis();
      k.say("Past, now, future.", { zh: "过去、现在、将来。", word: "Past Now Future" });
      k.act(me, "point", S.at - 1.6, 1.4, { at: [A.now, A.y] });
      D.step(1);
      N("体（镜头）：", "用什么镜头拍这个动作：快照、录像，还是留存成果。这就是「体」。");
      const cell = h.matrix(1, 0, "一般现在时", () => N("时×体矩阵：", "横着选时间，竖着选镜头，两条线交叉的格子，就是一种时态。"));
      k.act(me, "point", S.at - .8, 1.2, { at: cell });
      N("一般体：", "像拍一张「档案照」：不管这一秒在不在做，只记下每天反复做的规律。");
      h.camera(A.now, 190);
      N("习惯：", "每天都做的事，在时间轴上是一串小圆点：过去有，现在有，将来还有。");
      [385, 505, 570, 700, 760, 880].forEach(x => h.dot(A.map(x), C.red, 5));
      k.T("一次又一次", A.map(540), A.y - 20, k.go(.6), .6, { size: 14, color: C.grey, weight: 900, anchor: "middle" });
      N("客观真理：", "永远不变的事实也用它：The earth goes around the sun（地球绕着太阳转）。");
      // 场景：太阳 + 地球（R4 goes around：读到时地球绕太阳转一圈）
      const sx = 200, sy = 380;
      P(k.ellipse(sx, sy, 22, 22), go(.4), .4, { color: C.ink, w: 2.5 }); F(k.ellipse(sx, sy, 22, 22), go(.1, 0), { color: C.hlYellow, op: 1 });
      P(k.ellipse(sx, sy, 90, 42), go(.6), .6, { color: C.grey, w: 1.4, dash: "4 6" });
      const gE = D.sub();
      P(k.ellipse(sx + 90, sy, 10, 10), go(.3), .3, { color: C.blue, w: 2.5 }); F(k.ellipse(sx + 90, sy, 10, 10), go(.05, 0), { color: C.tintBlue, op: 1 });
      D.back();
      const syE = sayAt("Played, playing. The earth goes around the sun.", { zh: "玩了、正在玩。地球绕着太阳转。", word: "played playing earth around sun The earth goes around the sun" });
      const orb = []; for (let i = 1; i <= 12; i++) { const a = i / 12 * Math.PI * 2; orb.push([+(90 * Math.cos(a) - 90).toFixed(1), +(42 * Math.sin(a)).toFixed(1)]); }
      k.path(gE, syE.t + syE.wd, Math.max(2, syE.dur - syE.wd), orb, { ease: "linear" });
      k.actFx(["goes"], syE.t + syE.wd, Math.max(2, syE.dur - syE.wd), "地球绕着太阳转一圈");
      k.look(me, sx, sy, syE.t + syE.wd, 2);
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 公式 + 原形 / 单三 ─────
      D.step(2); D.shot();
      N("动词原形：", "动词本来的样子，什么尾巴都没加，比如 play。状态就用 am / is / are。");
      h.formula("主语 + 动词原形 V / 单三 V-s(es)   ｜   状态：am / is / are", 150);
      D.step(3);
      N("", "I、We、They 当主语：动词保持原形 play。");
      h.ex("I / We / They", "play football every afternoon.", 200, "原形");
      const syT = sayAt("I am, she is, we are. They play football every afternoon.", { zh: "我是，她是，我们是。他们每天下午踢足球。", word: "am is are I We They She play football every afternoon play football every afternoon" });
      k.act(me, "jump", syT.t + syT.dur * .62, Math.max(1, syT.dur * .3), { words: ["play"] });
      N("单三勋章：", "单三（第三人称单数）就是另外一个人或东西，比如 Leo，动词要戴 -s 勋章。");
      const m2 = h.ex("He / She / Leo", "plays football every afternoon.", 240, "+s");
      h.ring(m2, "s", 0, C.red);
      // 场景：小男孩带球跑，足球滚进球门（R4 plays football）
      h.ground(60, 790, 430);
      P(k.roughRect(690, 370, 70, 60), go(.5), .5, { color: C.ink, w: 2.5 });
      P(k.wl(700, 380, 750, 420, .3) + " " + k.wl(750, 380, 700, 420, .3), go(.3), .3, { color: C.grey, w: 1.2 });
      const gK = D.sub();
      const leo = k.actor("traveler", { x: 160, y: 430, s: .72, f: 1, g: gK });
      D.back();
      const gBall = h.ball(200, 421);
      const syP = sayAt("He plays football every afternoon. Leo plays too.", { zh: "他每天下午踢足球。里奥也踢。", word: "He Leo" });
      const tp = syP.t + syP.wd, dp = Math.max(2.2, syP.dur - syP.wd);
      k.act(leo, "run", tp, dp * .8, { to: 560, words: ["plays"] });
      k.move(gBall, tp, dp * .9, 520, 0, { ease: "move" });
      for (let i = 0; i < 4; i++) k.squash(gBall, tp + i * dp * .22, dp * .2, .2);
      k.act(leo, "cheer", tp + dp * .85, 1.2);
      k.wait(.3);
      D.wipe();

      // ───── 镜头 3 · -es / 辅音 + y → ies ─────
      D.shot();
      N("", "以 ch、sh、s、x、o 结尾的动词，加 -es：teaches、goes。");
      const m3 = h.ex("My mom", "teaches English and goes to work by car.", 150, "+es");
      // 场景：小汽车开去上班（R4 goes to work by car）
      h.ground(60, 790, 430);
      const gCar = h.car(140, 430);
      const syM = sayAt("My mom teaches English and goes to work by car.", { zh: "我妈妈教英语，开车去上班。", word: "teaches" });
      k.move(gCar, syM.t + syM.dur * .55, Math.max(1.6, syM.dur * .45), 300, 0, { ease: "move" });
      k.actFx(["goes"], syM.t + syM.dur * .55, Math.max(1.6, syM.dur * .45), "妈妈的小汽车开去上班");
      h.ring(m3, "es", 0, C.red); h.ring(m3, "es", 1, C.red);
      k.say("Ch, sh, es. Watch, watches. Wash, washes.", { zh: "ch、sh 结尾加 -es。看，（他）看。洗，（他）洗。", word: "ch sh es", blocks: ["ch", "sh", "es"] });
      k.say("My mom teaches English and goes to work by car.", { zh: "我妈妈教英语，开车去上班。", word: "My mom English and goes to work by car" });
      N("辅音 + y：", "辅音就是 a e i o u 以外的字母。辅音 + y 结尾，变 y 为 i 加 -es。");
      const m4 = h.ex("The little bird", "flies high in the sky.", 190, "y → i + es");
      k.say("A, e, i, o, u. A cat, an egg.", { zh: "a、e、i、o、u（元音字母）。一只猫，一个鸡蛋。", word: "a" });
      h.ring(m4, "ies", 0, C.red);
      // 场景：小鸟飞过天空（R4 flies）
      const gBd = h.bird(120, 300); k.hide(gBd);
      const syB = sayAt("The little bird flies high in the sky.", { zh: "小鸟在天上飞得很高。", word: "The little bird flies high in sky" });
      k.fade(gBd, syB.t, .3, 1);
      k.path(gBd, syB.t, syB.dur, [[160, -40], [380, -10], [600, -50]]);
      for (let i = 0; i < 6; i++) k.squash(gBd, syB.t + .2 + i * (syB.dur - .3) / 6, (syB.dur - .3) / 6, .25);
      k.actFx(["flies"], syB.t, syB.dur, "小鸟扇着翅膀飞过天空");
      k.look(me, 500, 280, syB.t, syB.dur);
      k.wait(.3);
      D.wipe();

      // ───── 镜头 4 · 信号词 + 照妖镜 + 结论 ─────
      D.step(4); D.shot();
      N("信号词：", "看到 every day、always、usually、often，就知道要用一般现在时。");
      const yS = h.signals("every day (每天) · always (总是) · usually (通常) · often (经常) · sometimes (有时) · on Sundays (每逢周日)", 150);
      k.say("Every day, always, usually, often, sometimes, on Sundays.", { zh: "每天、总是、通常、经常、有时、每逢周日。", word: "every day always usually often sometimes on Sundays" });
      N("照妖镜：", "比喻 doesn't / Does：它们把 -s 勋章拿走了，后面的动词被打回原形。");
      h.trapFix("He doesn't likes", "likes", "He doesn't like", yS + 60);
      k.act(me, "surprised", S.at - .4, 1);
      k.say("He likes milk. He doesn't like tea. Does he like juice?", { zh: "他喜欢牛奶。他不喜欢茶。他喜欢果汁吗？", word: "likes like doesn't does He doesn't like" });
      N("", "结论：单三主语 He，动词戴上 -s 勋章。");
      h.final("He plays football every afternoon.", "plays", "口诀：习惯真理用一般现在时；单三动词戴勋章，见 does 就脱掉！", { zh: "他每天下午踢足球。", word: "plays" });
      k.act(me, "point", S.at - 1.4, 1.2, { at: [160, 470] });
      N("口诀：", "习惯真理用一般现在时；单三动词戴勋章，见 does / doesn't 就脱掉！");
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "「她每天去上学」：She 是单三，go 要不要戴 -es 勋章？先想 3 秒！");
      h.quiz("🔮 她每天去上学。", "→  She ___ to school every day.  ( go / goes )");
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "单三主语 She，go 戴上 -es 勋章：She goes to school every day.");
      const tRev = go(.3);
      h.reveal("She goes to school every day.");
      k.sfx("ding", tRev + .9);
      const syQ = sayAt("She goes to school every day.", { zh: "她每天去上学。", word: "go goes She to school every day" });
      k.act(me, "walk", syQ.t + syQ.wd, Math.max(1.2, (syQ.dur - syQ.wd) / 2), { to: 840, words: ["goes"] });
      k.act(me, "walk", syQ.t + syQ.wd + Math.max(1.2, (syQ.dur - syQ.wd) / 2), 1.2, { to: 892 });
      k.act(me, "turn", syQ.t + syQ.dur + 1.3, .3, { to: -1 });
      k.act(me, "cheer", syQ.t + syQ.dur + 1.7, 1.2);
      D.hold(1.4);

      k.quoteCard({ insight: "一般现在时是一张「档案照」：\n拍下习惯、规律和永远不变的事实", rhyme: "口诀：习惯真理用一般现在时；\n单三动词戴勋章，见 does 就脱掉！", hlLines: 2, foot: "⏳ 时×体矩阵 · ① 一般现在时" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2);
      D.finish(.45);
    },
    actionWords: [
      { word: "goes", act: "读到「The earth goes around the sun」时地球绕太阳转一圈（场景动作 actFx + path）；读到「goes to work by car」时妈妈的小汽车开走（actFx + move）；预测题「She goes to school」时讲解员走一段再走回（walk）" },
      { word: "play", act: "读到「They play football every afternoon」时讲解员跳起来（jump，踢球的兴奋）" },
      { word: "plays", act: "读到「He plays football … Leo plays too」时场景里的小男孩带球跑（run）、足球滚进球门（move + squash），进球后欢呼（cheer）" },
      { word: "flies", act: "读到「The little bird flies high in the sky」时小鸟扇着翅膀飞过天空（场景动作 actFx + path + squash）" },
    ],
    r2skip: ["V-s", "He doesn't likes"],   // 公式标签；红叉错句不读
    terms: [
      ["可信度徽章", "💡 快照、录像、望远镜、老照片、奖杯、单三勋章、照妖镜都是帮助记忆的比喻；✂️ 简化说法：「时×体」九宫格是帮小学生看清时态的简化图，真实英语里的时态用法更多，以后再学。"],
      ["时态", "英语动词的「变身」，用来告诉你事情发生在什么时候（过去 / 现在 / 将来）、处在什么样子。"],
      ["时间轴（时）", "一根从左到右的线：左边是过去，中间是现在，右边是将来。时态里的「时」就是在这根线上选位置。"],
      ["体（镜头）", "用什么镜头看这个动作：一般体像快照，进行体像录像，完成体像把成果留存下来。"],
      ["时×体矩阵", "横着是时间（过去 / 现在 / 将来），竖着是镜头（一般 / 进行 / 完成），交叉的格子就是一种时态，比如「现在 × 进行 = 现在进行时」。"],
      ["一般体（快照镜头）", "不管这一秒在不在做，只拍下经常发生的规律、习惯或事实，像一张档案照。"],
      ["进行体（录像镜头）", "拍下正在发生、还没停下的动作，结构是 be + 动词-ing。"],
      ["完成体（留存镜头）", "动作已经做完，但成果还留着，结构是 have / has + 过去分词。"],
      ["一般现在时", "说习惯、规律和永远不变的事实，比如 I play football every afternoon。"],
      ["客观真理", "永远不变的事实，比如 The earth goes around the sun（地球绕着太阳转），要用一般现在时。"],
      ["主语", "句子在说「谁」或「什么」，比如 I、He、My mom、The little bird。"],
      ["动词原形", "动词本来的样子，没有加 -s、-ed、-ing，比如 play、go、fly。"],
      ["am / is / are（be 动词）", "表示「是、在」等状态的动词：I 用 am，单三用 is，复数和 you 用 are。"],
      ["第三人称单数（单三）", "除了「我」和「你」以外的一个人或东西：he、she、it、Leo、my mom、the little bird。"],
      ["单三勋章 -s / -es", "比喻：单三主语后面，一般现在时的动词要加 -s 或 -es，比如 plays、teaches、flies。"],
      ["辅音字母", "a、e、i、o、u 是元音字母，其余的字母叫辅音字母。辅音 + y 结尾的动词要变 y 为 i 再加 -es。"],
      ["信号词（标志时间雷达词）", "一看到就能判断用哪个时态的词，比如 every day、always、often。"],
      ["照妖镜（does / doesn't）", "比喻：句子里出现 doesn't 或 Does，它们已经带走了单三的 -s，后面的动词要变回原形：He doesn't like。"]
    ]
  },
  // ───────── ② 现在进行时 ─────────
  {
    build(k) {
      const { C, N } = k, h = TM_KIT(k), A = h.A;
      N("", "「看！Leo 正在跑！」这一秒正在发生的动作，英语怎么拍下来？");
      k.header("现在 × 进行体", "② 现在进行时", false);
      h.axis();
      N("现在进行时：", "在矩阵里，它是「现在」这一列和「进行」这一行交叉的格子。");
      h.matrix(1, 1, "现在进行时");
      N("进行体：", "像一台高清录像机，正在直播这一秒的动作，动作还没有停。");
      h.video(A.now - 4, 108);
      N("", "在时间轴上，它是「现在」附近一段还在动的波浪线。");
      k.P(k.wave(A.now - 60, A.now + 60, A.y, 5), k.go(.8), .8, { color: C.purple, w: 4 });
      k.wait(.6);
      N("助动词：", "帮主要动词说清时间的小帮手。这里的 am / is / are 是句子的「发动机」。");
      h.formula("am / is / are（助动词画框） + V-ing（动态分词镜头）", 250);
      N("V-ing（现在分词）：", "动词加 -ing，只是「正在……」的画面，不能自己当谓语。");
      const bad = k.mono("I playing football", 740, 250, 16, C.red);
      N("", "所以 I playing football 是错的：少了发动机 am，两样缺一不可！");
      k.caret(bad, "playing", 0, "am");
      k.wait(.5);
      N("重读闭音节：", "run 这类短词是「辅音 + 元音 + 辅音」结尾，而且重读。");
      const m1 = h.ex("Look! Leo", "is running fast on the playground.", 284, "双写 n");
      h.uline(m1, "is"); h.ring(m1, "nn", 0, C.orange);
      N("双写：", "重读闭音节的词，要把最后一个字母写两遍再加 -ing：run → running。");
      k.wait(1.5);
      N("不发音的 e：", "dance、make 末尾的 e 不读，去掉 e 再加 -ing：dancing、making。");
      const m2 = h.ex("Listen! Mia", "is dancing and making a cake.", 314, "去 e + ing");
      k.say("Look! Leo is running fast on the playground.", { zh: "看！里奥在操场上飞快地跑。", word: "is running" });
      h.uline(m2, "is"); h.ring(m2, "cing", 0, C.orange); h.ring(m2, "king", 0, C.orange);
      N("", "The children 是复数（好多个），所以用 are；swim 也要双写 m。");
      const m3 = h.ex("The children", "are swimming in the pool now.", 344, "are + 双写 m");
      h.uline(m3, "are"); h.ring(m3, "mm", 0, C.orange);
      N("", "I 配 am；普通动词直接加 -ing：read → reading。");
      const m4 = h.ex("I", "am reading an English storybook right now.", 374, "直接 + ing");
      h.uline(m4, "am"); h.ring(m4, "ing", 0, C.orange);
      N("信号词：", "看到 Look!、Listen!、now、right now，说明镜头正在直播！");
      h.signals("Look! (看！) · Listen! (听！) · now (现在) · right now (此时此刻) · at the moment (眼下)", 406);
      N("心理状态词：", "like、know、want、have 是心里的感觉，不是看得见的动作，拍不成录像。");
      h.trapText("like(喜欢)、know(知道)、want(想要)、have(拥有) 这类心理状态词，通常不用进行时！", 434);
      N("", "结论：发动机 am + 正在读 reading，一个都不能少。");
      // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（错句、V-s 这类公式标签不读，见 r2skip）
      k.say("Past, now, future. I am playing football now.", { zh: "过去、现在、将来。我现在正在踢足球。", word: "Past Now Future am are I playing football" });
      k.say("Look! Leo is running fast on the playground. Listen!", { zh: "看！里奥在操场上飞快地跑。听！", word: "Look Leo fast on the playground Listen" });
      k.say("Mia is dancing and making a cake.", { zh: "米娅一边跳舞一边做蛋糕。", word: "Mia dancing and making a cake is dancing and making a cake" });
      k.say("The children are swimming in the pool now.", { zh: "孩子们现在正在泳池里游泳。", word: "children swimming in pool are swimming in the pool now" });
      k.say("Run, dance, make, swim, read. Ing.", { zh: "跑、跳舞、做、游泳、读。加 -ing。", word: "run dance make swim read ing", blocks: ["ing"] });
      k.say("I am reading an English storybook right now, at the moment.", { zh: "我此刻正在读一本英语故事书。", word: "an English storybook right at moment at the moment" });
      k.say("I like it. I know. I want it. I have a dog.", { zh: "我喜欢它。我知道。我想要它。我有一只狗。", word: "like know want have" });
      k.final("I am reading an English storybook right now.", "am", "口诀：此刻正在做，am / is / are 加 V-ing，缺一不可！", { zh: "我此刻正在读一本英语故事书。", word: "am reading" });
      N("口诀：", "此刻正在做，am / is / are 加 V-ing，缺一不可！");
    },
    r2skip: ["V-ing", "REC", "I playing football"],   // 公式标签、录像图标字样 REC；缺 am 的错句不读
    terms: [
      ["现在进行时", "说此时此刻正在做的事，结构是 am / is / are + 动词-ing，比如 I am reading now。"],
      ["助动词", "帮主要动词表达时间、否定、疑问的小帮手词，比如 am / is / are、do / does、will、have / has。"],
      ["发动机（be 动词）", "比喻：进行时里的 am / is / are 让句子「动起来」，并且把时间定在「现在」，不能漏掉。"],
      ["V-ing（现在分词）", "动词加 -ing，表示「正在……」的画面，比如 running、dancing。它自己不能当谓语，前面要有 am / is / are。"],
      ["谓语", "句子里说「主语在做什么、是什么样」的部分，比如 is running。"],
      ["重读闭音节", "像 run、swim、stop 这样，以「辅音 + 元音 + 辅音」结尾、读得重的短词。加 -ing 或 -ed 时要双写最后一个字母。"],
      ["双写", "把单词最后一个字母再写一遍，比如 run → running、swim → swimming。"],
      ["不发音的 e（哑 e）", "单词末尾不读出声的 e，比如 dance、make。加 -ing 时去掉它：dancing、making。"],
      ["复数", "两个或更多，比如 the children（孩子们）。复数主语配 are。"],
      ["心理状态词", "表示心里感觉、想法的词，比如 like、know、want、have（拥有），通常不用进行时。"]
    ]
  },
  // ───────── ③ 一般过去时 ─────────
  {
    build(k) {
      const { C, N } = k, h = TM_KIT(k), A = h.A;
      N("", "昨天、上周末发生的事，英语就像翻开一张老照片。");
      k.header("过去 × 一般体", "③ 一般过去时", false);
      h.axis();
      N("一般过去时：", "在矩阵里，它是「过去」这一列和「一般」这一行交叉的格子。");
      h.matrix(0, 0, "一般过去时");
      N("历史老照片：", "比喻：咔嚓一下，把昨天的事定格在过去。事情已经做完，结束了。");
      h.photo(A.past, 112);
      h.dot(A.past, C.brown, 7);
      k.T("yesterday", A.past + 80, 154, k.go(.6), .6, { size: 15, color: C.grey, weight: 900, font: '"Courier New",Courier,monospace' });
      N("过去式：", "动词表示「过去」时变的样子，比如 visit → visited、take → took。");
      h.formula("主语 + 动词过去式 V-ed / 不规则过去式   ｜   状态：was (单) / were (复)", 250);
      N("", "好消息：过去式「不看主语脸色」，I、He、They 全都一样，不用管单三！");
      const m1 = h.ex("I / He / They", "visited the museum and took many photos yesterday.", 284, "+ed / 不规则");
      N("规则动词：", "直接加 -ed 就变成过去式的动词，比如 visit → visited。");
      h.ring(m1, "ed", 0, C.orange);
      k.wait(1.2);
      N("不规则动词：", "过去式不按 -ed 规律、要单独记的动词，比如 take → took。");
      h.uline(m1, "took");
      k.wait(1.3);
      N("", "辅音 + y 结尾：变 y 为 i 再加 -ed，study → studied、cry → cried。");
      const m2 = h.ex("Mia", "studied hard and cried when she lost her pen.", 314, "y → i + ed");
      k.say("I visited the museum and took many photos yesterday.", { zh: "昨天我参观了博物馆，拍了很多照片。", word: "visited" });
      h.ring(m2, "ied", 0, C.orange); h.ring(m2, "ied", 1, C.orange);
      N("", "stop 是重读闭音节：双写 p 再加 -ed，stopped；plan 也一样变 planned。");
      const m3 = h.ex("The bus", "stopped at the station five minutes ago.", 344, "双写 + ed");
      h.ring(m3, "pp", 0, C.orange);
      N("was / were：", "be 动词的过去式：I、He、She、It 用 was，We、You、They 用 were。");
      const m4 = h.ex("We", "were very happy at the party last night.", 374, "过去的状态");
      h.uline(m4, "were");
      N("信号词：", "yesterday、last night、…ago、just now，一看就是过去的事。");
      h.signals("yesterday (昨天) · last night/weekend/year (昨晚/上周末/去年) · ...ago (…以前) · just now (刚才) · in 2022", 406);
      N("陷阱：", "有 didn't 或 Did 时，「过去」已经被它们带走，后面的动词变回原形。");
      h.trapFix("Did you went there?", "went", "Did you go there?", 434);
      N("", "结论：stop 双写 p，加 -ed，变成过去式 stopped。");
      // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（错句、V-s 这类公式标签不读，见 r2skip）
      k.say("Past, now, future. Yesterday.", { zh: "过去、现在、将来。昨天。", word: "Past Now Future yesterday" });
      k.say("I was happy. They were happy. He was at home.", { zh: "我很开心。他们很开心。他在家。", word: "was were I He They" });
      k.say("I visited the museum and took many photos. Visit, take.", { zh: "我参观了博物馆，拍了很多照片。参观、拍。", word: "the museum and took many photos visit take" });
      k.say("Mia studied hard and cried when she lost her pen.", { zh: "米娅学习很努力，丢了笔时哭了。", word: "Mia studied hard cried when she lost her pen study cry" });
      k.say("The bus stopped at the station five minutes ago. Stop, ed.", { zh: "公交车五分钟前停在了车站。停，加 -ed。", word: "bus at station five minutes ago stop ed", blocks: ["ed"] });
      k.say("We were very happy at the party last night.", { zh: "我们昨晚在聚会上很开心。", word: "We very happy party last night were very happy at the party last night" });
      k.say("Last night, last year. We went there in May. I just got home.", { zh: "昨晚，去年。我们五月去了那里。我刚到家。", word: "year just in went there" });
      k.say("Did you go there? No, I didn't go. Go, went.", { zh: "你去那里了吗？不，我没去。去，去了。", word: "Did you go didn't Did you go there" });
      k.say("Plan, planned. Be, was. It was fun. I study English. Babies cry.", { zh: "计划，计划了。是，以前是。很好玩。", word: "plan planned be It study cry" });
      k.final("The bus stopped at the station five minutes ago.", "stopped", "口诀：过去的事用过去式，不看主语人人一样；见 did 变回原形！", { zh: "公交车五分钟前停在了车站。", word: "stopped" });
      N("口诀：", "过去的事用过去式，不看主语人人一样；见 did / didn't 变回原形！");
    },
    r2skip: ["V-ed", "Did you went there?", "last night year"],   // 公式标签；错句不读；「last night / year」是斜杠并列，已分别朗读
    terms: [
      ["一般过去时", "说过去某个时间发生、已经做完的事，比如 I visited the museum yesterday。"],
      ["过去式", "动词表示「过去」时的样子，比如 visit → visited、take → took。"],
      ["规则动词", "加 -ed 就变过去式的动词，比如 visit → visited、stop → stopped、study → studied。"],
      ["不规则动词", "过去式不按 -ed 规律变化、要单独记住的动词，比如 take → took、lose → lost。"],
      ["was / were", "be 动词（am / is / are）的过去式：I / He / She / It 用 was，We / You / They 用 were。"],
      ["不看主语脸色", "比喻：一般过去时的动词不管主语是谁都用同一个样子，不用加单三的 -s。"],
      ["did / didn't 还原", "句子里有 didn't 或 Did 提问时，后面的动词要用原形：Did you go there?"]
    ]
  },
  // ───────── ④ 一般将来时 ─────────
  {
    build(k) {
      const { C, N } = k, h = TM_KIT(k), A = h.A;
      N("", "明天、下周要做的事，英语怎么说？举起望远镜看向未来！");
      k.header("将来 × 一般", "④ 一般将来时", false);
      h.axis();
      N("一般将来时：", "在矩阵里，它是「将来」这一列和「一般」这一行交叉的格子。");
      h.matrix(2, 0, "一般将来时");
      N("望远镜：", "比喻：站在「现在」，往右边的「将来」看过去，看到明天要做的事。");
      h.telescope(A.now - 6, 132, A.now + 70, 104);
      k.P(k.wl(A.now + 84, 104, A.fut - 10, A.y - 12, .5), k.go(.6), .6, { color: C.purple, w: 2, dash: "5 6" });
      h.dot(A.fut, C.blue, 7);
      N("will：", "将来时有两个方案。方案 A：will 原意是「决心」，表示临时决定或一定会发生。");
      h.formula("方案A：will + 动词原形（意愿/临时决定/客观预测）", 240);
      N("be going to：", "方案 B：「人已经走在路上了」，表示早有计划，或有迹象马上要发生。");
      h.formula("方案B：am/is/are going to + 动词原形（早有计划/有迹象要发生）", 266, "      ");
      k.wait(.6);
      N("情态助动词：", "will 这样的帮手词，所有人称都一样，后面永远接动词原形。");
      const m1 = h.ex("I / He / We", "will fly a kite in the park tomorrow.", 298, "人人通用");
      h.uline(m1, "will");
      N("", "be going to 里的 be 要跟着主语变：Leo 是单三，用 is。");
      const m2 = h.ex("Leo", "is going to visit his grandparents this weekend.", 326, "be 随主语变");
      k.say("Leo is going to visit his grandparents this weekend.", { zh: "里奥这个周末打算去看爷爷奶奶。", word: "is going to" });
      h.uline(m2, "is going to");
      N("", "They 是复数，用 are going to，后面接原形 have。");
      const m3 = h.ex("They", "are going to have a picnic next Sunday.", 354, "复数 are");
      h.uline(m3, "are going to");
      N("There be 句型：", "表示「某处有某物」。它的将来时是 There will be 或 There is going to be。");
      const m4 = h.ex("There", "will be (= is going to be) a football match tomorrow.", 382, "黄金考点");
      h.uline(m4, "will be");
      N("信号词：", "tomorrow、next week、this weekend、soon，都在说将来。");
      h.signals("tomorrow (明天) · next week/month/year (下周/下月/明年) · this evening/weekend (今晚/本周末) · soon (不久) · in the future", 410);
      N("陷阱：", "别受中文「将要有」影响写 have！「某处有」永远用 be：There will be。");
      h.trapFix("There is going to have", "have", "There will be / There is going to be", 436);
      N("", "结论：There be 的将来时，就是 There will be。");
      // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（错句、V-s 这类公式标签不读，见 r2skip）
      k.say("Past, now, future. Am, are going to. Be going to. We are going to swim.", { zh: "过去、现在、将来。我打算游泳。我们打算游泳。", word: "Past Now Future am are I We am are going to are going to be going to" });
      k.say("He will fly a kite in the park tomorrow.", { zh: "他明天会在公园里放风筝。", word: "He fly a kite in the park will fly a kite in the park tomorrow" });
      k.say("Leo is going to visit his grandparents this weekend.", { zh: "里奥这个周末打算去看爷爷奶奶。", word: "Leo visit his grandparents this weekend" });
      k.say("They are going to have a picnic next Sunday.", { zh: "他们下周日要去野餐。", word: "They have picnic next Sunday are going to have a picnic next Sunday" });
      k.say("There is going to be a football match.", { zh: "将会有一场足球赛。", word: "There football match is going to be There is going to be" });
      k.say("Next week, next year, this evening, soon, in the future.", { zh: "下周、明年、今天晚上、很快、将来。", word: "week year evening soon in the future" });
      k.final("There will be (= is going to be) a football match tomorrow.", "will", "口诀：临时决定用 will，早有计划用 be going to，后面都跟原形！", { say: "There will be a football match tomorrow.", zh: "明天会有一场足球赛。", word: "will be" });
      N("口诀：", "临时决定用 will，早有计划用 be going to，后面都跟动词原形！");
    },
    r2skip: ["There is going to have", "next week year"],   // 错句不读；「next week / year」斜杠并列，已分别朗读
    terms: [
      ["一般将来时", "说将来要发生的事，比如 I will fly a kite tomorrow。有 will 和 be going to 两种说法。"],
      ["将来体（望远镜镜头）", "页面上的比喻：站在现在，用望远镜看向将来。在矩阵里它就是「将来 × 一般」那一格。"],
      ["will", "原意是「决心、意愿」，表示临时决定、愿意去做，或一定会发生的预测，比如 Tomorrow will be sunny。"],
      ["be going to", "am / is / are going to + 动词原形，表示早就计划好，或者有迹象马上要发生，比如 It is going to rain!"],
      ["情态助动词", "帮主要动词表达「会、能、要」等意思的词，比如 will、can。所有人称都一样，后面接动词原形。"],
      ["临时决定", "说话的那一刻才决定要做的事，用 will：I will help you!"],
      ["There be 句型", "表示「某处有某物」：There is / There are。将来时是 There will be 或 There is / are going to be，不能写 There will have。"]
    ]
  },
  // ───────── ⑤ 现在完成时 ─────────
  {
    build(k) {
      const { C, N } = k, h = TM_KIT(k), A = h.A;
      N("", "「我把钥匙弄丢了」，为什么英语有时说 lost，有时说 have lost？");
      k.header("现在 × 完成体", "⑤ 现在完成时", false);
      h.axis();
      N("现在完成时：", "在矩阵里，它是「现在」这一列和「完成」这一行交叉的格子。");
      h.matrix(1, 2, "现在完成时");
      N("完成体：", "像一个「成果留存」镜头：动作在过去做完了，但成果一直留着。");
      k.wait(1.0);
      h.dot(A.past, C.brown, 7);
      k.T("动作做完", A.past - 14, 150, k.go(.6), .6, { size: 14, color: C.brown, weight: 900, anchor: "end" });
      N("过去连通现在的桥：", "从过去搭一座桥到现在：动作在过去，结果留到现在。");
      k.P(`M${A.past + 12},${A.y - 10} Q${(A.past + A.now) / 2},${A.y - 110} ${A.now - 12},${A.y - 14} M${A.now - 24},${A.y - 22} L${A.now - 12},${A.y - 14} L${A.now - 14},${A.y - 28}`, k.go(1.0), 1.0, { color: C.purple, w: 3 });
      h.trophy(A.now + 46, 116);
      k.T("结果留在现在", A.now + 72, 112, k.go(.7), .7, { size: 14, color: C.orange, weight: 900 });
      N("have / has：", "本意是「现在手里拥有」；has 给单三主语用。");
      h.formula("have / has（现在拥有） + V-ed / 过去分词（已经做完的动作状态）", 250);
      N("过去分词：", "动词的另一种变身，表示「已经做完」，比如 finish → finished、go → gone。");
      k.wait(1.8);
      N("", "I lost my key 只说丢了；I have lost my key 是丢了，现在还进不去门！");
      k.wait(2.2);
      N("", "作业已经写完了，结果留在现在：现在可以出去玩啦！");
      const m1 = h.ex("I / We / They", "have already finished the homework.", 284, "成果：能玩了");
      h.uline(m1, "have"); h.ring(m1, "finished", 0, C.orange);
      N("for + 时间段：", "表示持续了多久：从 5 年前一直住到现在。单三主语用 has。");
      const m2 = h.ex("He / She / Mia", "has lived in Beijing for five years.", 314, "一直到现在");
      h.uline(m2, "has"); h.ring(m2, "lived", 0, C.orange);
      N("have been to：", "去过某地，人已经回来了，留下一段人生经历。");
      const m3 = h.ex("Have you", "ever been to the Great Wall?", 344, "去过·已回来");
      k.say("Have you ever been to the Great Wall?", { zh: "你去过长城吗？", word: "ever been" });
      h.ring(m3, "been to", 0, C.green);
      N("have gone to：", "去某地了，人还在上海或在路上，现在不在说话的地方。");
      const m4 = h.ex("Mr Wang", "has gone to Shanghai.", 374, "去了·还没回");
      h.ring(m4, "gone to", 0, C.red);
      N("信号词：", "already、yet、just、ever、never、since、for，常和现在完成时一起出现。");
      h.signals("already (已经) · yet (还/尚) · just (刚刚) · ever (曾经) · never (从不) · since (自从) · for + 时间段 (持续了…)", 406);
      N("陷阱：", "出现明确的过去时间点，就只能用一般过去时，不能用现在完成时。");
      h.trapText("句子里有 yesterday, last week, two days ago 这类过去时间点，不能用 have/has done！", 434);
      N("", "结论：have + 过去分词 finished，作业写完的成果留到现在。");
      // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（错句、V-s 这类公式标签不读，见 r2skip）
      k.say("Past, now, future. Have, has, done.", { zh: "过去、现在、将来。have、has、过去分词。", word: "Past Now Future has done" });
      k.say("They have already finished the homework.", { zh: "他们已经写完作业了。", word: "I We They already the homework They have already finished the homework" });
      k.say("Mia has lived in Beijing for five years.", { zh: "米娅在北京住了五年了。", word: "He She Mia lived in Beijing for five years has lived in Beijing for five years" });
      k.say("Have you been to the Great Wall? Mr Wang has gone to Shanghai.", { zh: "你去过长城吗？王老师去上海了。", word: "you to Great Wall Mr Wang gone Shanghai has gone to Shanghai" });
      k.say("Have been to, have gone to. He has gone. She has done it.", { zh: "去过（回来了），去了（还没回来）。", word: "have been to have gone to He She" });
      k.say("Already, yet, just, never, since. I have just done it.", { zh: "已经、还、刚刚、从未、自从。我刚做完。", word: "already yet just never since" });
      k.say("Yesterday, last week, two days ago.", { zh: "昨天、上周、两天前。", word: "yesterday last week two days ago" });
      k.say("I lost my key. I have lost my key. Finish, go.", { zh: "我丢了钥匙。我把钥匙弄丢了（现在还没找到）。完成、去。", word: "lost my key I lost my key I have lost my key finish go" });
      k.final("I / We / They have already finished the homework.", "have", "口诀：过去做完，结果留到现在 → have / has + 过去分词！", { say: "We have already finished the homework.", zh: "我们已经写完作业了。", word: "have finished" });
      N("口诀：", "过去做完，结果留到现在，就用 have / has + 过去分词！");
    },
    r2skip: ["V-ed"],   // 公式标签
    terms: [
      ["现在完成时", "动作发生在过去，但结果或影响留到现在，结构是 have / has + 过去分词，比如 I have already finished my homework。"],
      ["小升初", "小学升初中。现在完成时是初中要学的内容，这里提前学一点。"],
      ["have / has", "本意是「现在拥有」。在完成时里当助动词：I / We / They 用 have，单三主语用 has。"],
      ["过去分词", "动词的另一种变身，表示「已经做完」。规则动词和过去式一样加 -ed（finished），不规则的要单独记（go → gone、be → been）。"],
      ["一般过去时 vs 现在完成时", "I lost my key 只说过去丢了；I have lost my key 强调丢了的结果还在：现在进不去门。"],
      ["have been to", "去过某地，人已经回来了，比如 Have you ever been to the Great Wall?"],
      ["have gone to", "去某地了，人现在还在那里或在路上，不在这儿，比如 Mr Wang has gone to Shanghai。"],
      ["for + 时间段 / since", "for five years 表示「持续了 5 年」；since 表示「自从……以来」，都常和现在完成时一起用。"],
      ["already / yet / just / ever / never", "已经 / 还（用在否定和疑问里）/ 刚刚 / 曾经 / 从不，都是现在完成时的信号词。"]
    ]
  }
];
