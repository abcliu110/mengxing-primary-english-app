// ==================== 🔀 中英对照总枢 · N 一字多词：借 = borrow / lend（ze_borrow）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「N 一字多词」。中文「借」不分方向，英语分成两个词：
// 东西往我这边来 = borrow（from），东西从我这边出去 = lend（to）。呼应第一性原理 ⑤ to / from。
// 配色只用 V3 四色。徽章：💡 中英对照说法。
WB_LAB.ze_borrow = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const arrow = (x0, y, x1, col) => {
        const d = Math.sign(x1 - x0);
        P(k.wl(x0, y, x1, y, .4) + ` M${x1 - d * 12},${y - 9} L${x1},${y} L${x1 - d * 12},${y + 9}`, go(.6), .6, { color: col, w: 3.2 });
      };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：中文一个「借」字，英语却有两个词——borrow 和 lend。怎么分？看东西往哪边走！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "借：borrow / lend", sub: "🔀 中英对照 · 一字多词", badges: ["💡"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("一字多词：", "中文一个字，英语常常分成好几个词。今天先看「借」。");
      k.wait(.6);

      // ───── 镜头 1 · 中文：一个「借」两个方向 ─────
      D.step(0); D.shot();
      N("中文：", "「我向汤姆借书」和「我借书给汤姆」都用「借」——可书走的方向正好相反！");
      T("我向汤姆借了一本书", 60, 140, go(.8), .8, { size: 22, color: C.blue, weight: 900 });
      T("书：汤姆 → 我", 360, 140, go(.5), .5, { size: 17, color: C.grey, weight: 700 });
      T("我借了一本书给汤姆", 60, 200, go(.8), .8, { size: 22, color: C.red, weight: 900 });
      T("书：我 → 汤姆", 360, 200, go(.5), .5, { size: 17, color: C.grey, weight: 700 });
      k.act(me, "think", S.at - .6, 1.4);
      k.wait(.5);

      // ───── 镜头 2 · 照搬：只有一个词就分不清 ─────
      D.step(1);
      N("照搬：", "如果英语也只用一个词，听的人就猜不出书到底给了谁。所以英语分成两个词。");
      T("❌ 只用一个词 → 书到底给了谁？", 60, 270, go(.8), .8, { size: 19, color: C.red, weight: 900 });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · borrow：东西往我这边来 ─────
      D.step(2); D.shot();
      N("borrow：", "东西往我这边来，用 borrow：borrow 东西 from 某人（从某人那里借来）。");
      const gF = D.sub();
      const tom = k.actor("traveler", { x: 640, y: 470, s: .85, f: 1, g: gF });
      const bk = k.prop("book", 700, 470, { g: gF, s: .8 });
      T("Tom", 640, 500, go(.3), .3, { size: 16, color: C.grey, weight: 900, anchor: "middle" });
      D.back();
      k.act(tom, "take", S.at, 1.2, { prop: bk });
      T("borrow ← （往我这边来）", 60, 140, go(.8), .8, { size: 24, color: C.blue, weight: 900 });
      arrow(420, 180, 120, C.blue);
      T("borrow a book from Tom", 60, 230, go(1), 1, { size: 22, color: C.ink, weight: 900, font: M });
      k.act(me, "walk", S.at - .8, 1.2, { to: 760 });
      const syB = sayAt("I borrow a book from Tom.", { zh: "我向汤姆借了一本书。", word: "I borrow a book from Tom borrow a book from Tom" });
      { const [w0, wd] = win(syB); k.act(me, "take", w0, Math.max(1.2, wd), { prop: bk, words: ["borrow"] }); }
      k.act(me, "walk", S.at + .2, 1.2, { to: 892 });
      k.wait(1.2);

      // ───── lend：东西从我这边出去 ─────
      N("lend：", "东西从我这边出去，用 lend：lend 东西 to 某人（借给某人）。");
      T("lend → （从我这边出去）", 60, 300, go(.8), .8, { size: 24, color: C.red, weight: 900 });
      arrow(120, 340, 420, C.red);
      T("lend a book to Tom", 60, 390, go(1), 1, { size: 22, color: C.ink, weight: 900, font: M });
      k.act(me, "walk", S.at - .6, 1.2, { to: 760 });
      const syL = sayAt("I lend a book to Tom.", { zh: "我借了一本书给汤姆。", word: "lend to lend a book to Tom" });
      { const [w0, wd] = win(syL); k.act(tom, "take", w0, Math.max(1.2, wd), { prop: bk, words: ["lend"] }); }
      k.act(me, "walk", S.at + .2, 1.2, { to: 892 });
      k.wait(1.2);
      k.actorFade(tom, S.at, .4, 0);
      D.wipe();

      // ───── 镜头 4 · 更多例子 ─────
      D.step(3); D.shot();
      N("更多例子：", "想借同学的笔：可以说「我能借你的笔吗」，也可以说「你能把笔借给我吗」。");
      T("Can I borrow your pen?", 60, 150, go(1), 1, { size: 22, color: C.blue, weight: 900, font: M });
      T("我能借你的笔吗？（笔 → 我）", 60, 182, go(.5), .5, { size: 15, color: C.grey, weight: 700 });
      sayAt("Can I borrow your pen?", { zh: "我能借你的笔吗？", word: "Can your pen" });
      T("Can you lend me your pen?", 60, 240, go(1), 1, { size: 22, color: C.red, weight: 900, font: M });
      T("你能把笔借给我吗？（笔 → 我）", 60, 272, go(.5), .5, { size: 15, color: C.grey, weight: 700 });
      sayAt("Can you lend me your pen?", { zh: "你能把笔借给我吗？", word: "you me" });
      N("", "两句意思一样，主语不同：拿东西的人说 borrow，给东西的人说 lend。");
      T("拿东西的人 borrow，给东西的人 lend", 60, 330, go(1), 1, { size: 19, color: C.green, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "借进来 borrow from，借出去 lend to！");
      T("借进来 borrow from　借出去 lend to", 60, 390, go(1), 1, { size: 22, color: C.blue, weight: 900 });
      k.badge("💡", 60 + k.estW("借进来 borrow from　借出去 lend to", 22) + 10, 386);
      sayAt("Borrow from, lend to.", { zh: "借进来用 borrow from，借出去用 lend to。", word: "borrow from lend to" });
      k.wait(.8);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "「汤姆借给我一本书」——书从汤姆那里出去，主语是汤姆，用哪个词？先想 3 秒！");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 汤姆借给我一本书 = Tom ____ me a book.", 36, 470, go(1.2), 1.2, { size: 19, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 620, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "书从汤姆那里出去，汤姆是给东西的人：Tom lends me a book.");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("lends", 36 + k.estW("Tom ", 22) * 1.2, 512, 22, { mono: true, color: C.hlGreen });
      T("Tom lends me a book.", 36, 512, go(.8), .8, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Tom lends me a book.", { zh: "汤姆借给我一本书。", word: "lends" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文一个「借」，英语分两个词：\n东西往我这边来 borrow（from），\n东西从我这边出去 lend（to）。", rhyme: "借进来 borrow from，\n借出去 lend to！", hlLines: 2, foot: "🔀 中英对照 · 一字多词" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["Tom ____ me a book."],   // 预测题的填空句（有空格），揭晓后整句朗读 Tom lends me a book.
    actionWords: [
      { word: "borrow", act: "讲解员走到汤姆面前，从他手里拿过书（take）" },
      { word: "lend", act: "汤姆从讲解员手里接过书（take）" },
    ],
    terms: [
      ["borrow", "从别人那里借来（东西往我这边来）：borrow a book from Tom。"],
      ["lend", "借给别人（东西从我这边出去）：lend a book to Tom，也可以说 lend Tom a book。"],
      ["一字多词", "中文一个字，英语分成几个词：借 = borrow / lend；说 = say / speak / talk / tell。"],
      ["from / to", "from 从起点离开，to 到达终点（第一性原理 ⑤）：borrow from、lend to 正好一来一去。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ✂️ 简化说法 · ⚠️ 有要注意的地方 · 📜 有出处的历史。"],
    ],
  },
];
