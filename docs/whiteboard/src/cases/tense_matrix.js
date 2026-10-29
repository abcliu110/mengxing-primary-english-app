// ==================== 白板脚本：⑨「时×体」二维时空矩阵沙盘 5 个时态 ====================
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
// 版面：左上 3×3 时×体矩阵 · 右上时间轴（过去/现在/将来）+ 镜头图 · 中间公式和 4 个例句 · 信号词 · 陷阱 · 底部结论框。
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

WB_LAB.tense_matrix = [
  // ───────── ① 一般现在时 ─────────
  {
    build(k) {
      const { C, N } = k, h = TM_KIT(k), A = h.A;
      N("", "同一个 play，为什么有时写 plays、played，有时写 is playing？");
      k.header("现在 × 一般体", "① 一般现在时", false);
      N("时态：", "英语动词会「变身」，告诉你事情是什么时候发生、正处在什么样子。");
      k.wait(1.8);
      N("时间轴：", "一根从左到右的线：左边是过去，中间是现在，右边是将来。这就是「时」。");
      h.axis();
      N("体（镜头）：", "用什么镜头拍这个动作：快照、录像，还是留存成果。这就是「体」。");
      h.matrix(1, 0, "一般现在时", () => N("时×体矩阵：", "横着选时间，竖着选镜头，两条线交叉的格子，就是一种时态。"));
      N("一般体：", "像拍一张「档案照」：不管这一秒在不在做，只记下每天反复做的规律。");
      h.camera(A.now, 110);
      N("习惯：", "每天都做的事，在时间轴上是一串小圆点：过去有，现在有，将来还有。");
      [385, 505, 570, 700, 760, 880].forEach(x => h.dot(x, C.orange, 5));
      k.T("一次又一次", 540, 148, k.go(.6), .6, { size: 14, color: C.grey, weight: 900, anchor: "middle" });
      N("客观真理：", "永远不变的事实也用它：The earth goes around the sun（地球绕着太阳转）。");
      k.wait(2.2);
      N("动词原形：", "动词本来的样子，什么尾巴都没加，比如 play。状态就用 am / is / are。");
      h.formula("主语 + 动词原形 V / 单三 V-s(es)   ｜   状态：am / is / are", 250);
      N("", "I、We、They 当主语：动词保持原形 play。");
      h.ex("I / We / They", "play football every afternoon.", 284, "原形");
      N("单三勋章：", "单三（第三人称单数）就是另外一个人或东西，比如 Leo，动词要戴 -s 勋章。");
      const m2 = h.ex("He / She / Leo", "plays football every afternoon.", 314, "+s");
      h.ring(m2, "s", 0, C.orange);
      N("", "以 ch、sh、s、x、o 结尾的动词，加 -es：teaches、goes。");
      const m3 = h.ex("My mom", "teaches English and goes to work by car.", 344, "+es");
      h.ring(m3, "es", 0, C.orange); h.ring(m3, "es", 1, C.orange);
      N("辅音 + y：", "辅音就是 a e i o u 以外的字母。辅音 + y 结尾，变 y 为 i 加 -es。");
      const m4 = h.ex("The little bird", "flies high in the sky.", 374, "y → i + es");
      h.ring(m4, "ies", 0, C.orange);
      N("信号词：", "看到 every day、always、usually、often，就知道要用一般现在时。");
      h.signals("every day (每天) · always (总是) · usually (通常) · often (经常) · sometimes (有时) · on Sundays (每逢周日)", 406);
      N("照妖镜：", "比喻 doesn't / Does：它们把 -s 勋章拿走了，后面的动词被打回原形。");
      h.trapFix("He doesn't likes", "likes", "He doesn't like", 434);
      N("", "结论：单三主语 He，动词戴上 -s 勋章。");
      k.final("He plays football every afternoon.", "plays", "口诀：习惯真理用一般现在时；单三动词戴勋章，见 does 就脱掉！");
      N("口诀：", "习惯真理用一般现在时；单三动词戴勋章，见 does / doesn't 就脱掉！");
    },
    terms: [
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
      k.final("I am reading an English storybook right now.", "am", "口诀：此刻正在做，am / is / are 加 V-ing，缺一不可！");
      N("口诀：", "此刻正在做，am / is / are 加 V-ing，缺一不可！");
    },
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
      k.final("The bus stopped at the station five minutes ago.", "stopped", "口诀：过去的事用过去式，不看主语人人一样；见 did 变回原形！");
      N("口诀：", "过去的事用过去式，不看主语人人一样；见 did / didn't 变回原形！");
    },
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
      k.final("There will be (= is going to be) a football match tomorrow.", "will", "口诀：临时决定用 will，早有计划用 be going to，后面都跟原形！");
      N("口诀：", "临时决定用 will，早有计划用 be going to，后面都跟动词原形！");
    },
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
      const m1 = h.ex("I / We / They", "have already finished our homework.", 284, "成果：能玩了");
      h.uline(m1, "have"); h.ring(m1, "finished", 0, C.orange);
      N("for + 时间段：", "表示持续了多久：从 5 年前一直住到现在。单三主语用 has。");
      const m2 = h.ex("He / She / Mia", "has lived in Beijing for five years.", 314, "一直到现在");
      h.uline(m2, "has"); h.ring(m2, "lived", 0, C.orange);
      N("have been to：", "去过某地，人已经回来了，留下一段人生经历。");
      const m3 = h.ex("Have you", "ever been to the Great Wall?", 344, "去过·已回来");
      h.ring(m3, "been to", 0, C.green);
      N("have gone to：", "去某地了，人还在上海或在路上，现在不在说话的地方。");
      const m4 = h.ex("Mr Wang", "has gone to Shanghai.", 374, "去了·还没回");
      h.ring(m4, "gone to", 0, C.red);
      N("信号词：", "already、yet、just、ever、never、since、for，常和现在完成时一起出现。");
      h.signals("already (已经) · yet (还/尚) · just (刚刚) · ever (曾经) · never (从不) · since (自从) · for + 时间段 (持续了…)", 406);
      N("陷阱：", "出现明确的过去时间点，就只能用一般过去时，不能用现在完成时。");
      h.trapText("句子里有 yesterday, last week, two days ago 这类过去时间点，不能用 have/has done！", 434);
      N("", "结论：have + 过去分词 finished，作业写完的成果留到现在。");
      k.final("I / We / They have already finished our homework.", "have", "口诀：过去做完，结果留到现在 → have / has + 过去分词！");
      N("口诀：", "过去做完，结果留到现在，就用 have / has + 过去分词！");
    },
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
