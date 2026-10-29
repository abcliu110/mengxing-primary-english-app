// ==================== 🔀 中英对照总枢 · A 形合 vs 意合（ze_link）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「A 中英思维对照」。中文靠意思把句子连起来（意合），常常不用连接词，
// 也可以「因为……所以……」成对用；英语靠连接词连（形合），而且 because 和 so、although 和 but 只能二选一。
// 衔接词更多用法链接实验室「满分作文炼金炉」② 衔接词链。配色只用 V3 四色。徽章：💡 中英对照说法。
WB_LAB.ze_link = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      // 一个「小钩子」：把两句话勾在一起的连接词
      const hook = (x, y, w, col) => { P(`M${x},${y} C${x + w * .3},${y + 22} ${x + w * .7},${y + 22} ${x + w},${y}`, go(.5), .5, { color: col, w: 3 }); };
      N("", "这一幕：中文「下雨了，不去了」两句话中间什么也没有，英语可不行！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "形合 vs 意合", sub: "🔀 中英对照 · 中英思维", badges: ["💡"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("意合 / 形合：", "中文靠意思把句子连起来，叫意合；英语要用 and、so、because 这样的连接词连起来，叫形合。");
      k.wait(.6);

      // ───── 镜头 1 · 中文：意思连起来就行 ─────
      D.step(0); D.shot();
      N("中文：", "「下雨了，我们不去公园了。」中间不用「所以」，意思也连得上。");
      T("下雨了，我们不去公园了。", 60, 150, go(1), 1, { size: 24, color: C.ink, weight: 900 });
      T("（中间没有连接词，靠意思连）", 60, 186, go(.6), .6, { size: 16, color: C.grey, weight: 700 });
      N("", "中文还能「因为……所以……」成对用：因为下雨，所以我们待在家里。");
      T("因为下雨，所以我们待在家里。", 60, 250, go(1), 1, { size: 24, color: C.ink, weight: 900 });
      k.hlText("因为", 60, 250, 24, { color: C.hlYellow }); k.hlText("所以", 60 + k.estW("因为下雨，", 24), 250, 24, { color: C.hlYellow });
      k.act(me, "point", S.at - .8, 1.2, { at: [250, 250] });
      k.wait(.5);

      // ───── 镜头 2 · 照搬 ─────
      D.step(1);
      N("照搬：", "把「因为……所以……」一起搬进英语，就成了 Because it rained, so we stayed at home.——英语里这是错的！");
      T("Because it rained, so we stayed at home.", 60, 330, go(1.4), 1.4, { size: 20, color: C.red, weight: 900, font: M });
      k.redX(600, 306);
      T("❌ because 和 so 不能同句", 60, 370, go(.6), .6, { size: 17, color: C.red, weight: 900 });
      k.act(me, "surprised", S.at - .5, 1.2); k.expr(me, "oops", S.at - .5, 1.6);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 英语：连接词连，二选一 ─────
      D.step(2); D.shot();
      N("英语：", "英语两句话之间要有连接词：可以用 because（因为），也可以用 so（所以），只用一个。");
      T("Because it rained, we stayed at home.", 60, 150, go(1.2), 1.2, { size: 21, color: C.green, weight: 900, font: M });
      hook(60, 162, 110, C.blue);
      sayAt("Because it rained, we stayed at home.", { zh: "因为下雨，我们待在家里。", word: "Because it rained we stayed at home" });
      T("It rained, so we stayed at home.", 60, 220, go(1.2), 1.2, { size: 21, color: C.green, weight: 900, font: M });
      hook(200, 232, 40, C.blue);
      sayAt("It rained, so we stayed at home.", { zh: "下雨了，所以我们待在家里。", word: "so" });
      T("because / so：二选一", 60, 280, go(.8), .8, { size: 20, color: C.blue, weight: 900 });
      k.badge("💡", 60 + k.estW("because / so：二选一", 20) + 10, 276);
      N("", "although（虽然）和 but（但是）也一样，只能用一个。");
      T("Although it was cold, we played outside.", 60, 340, go(1.2), 1.2, { size: 20, color: C.green, weight: 900, font: M });
      sayAt("Although it was cold, we played outside.", { zh: "虽然很冷，我们还是在外面玩。", word: "Although was cold played outside" });
      T("It was cold, but we played outside.", 60, 390, go(1.2), 1.2, { size: 20, color: C.green, weight: 900, font: M });
      sayAt("It was cold, but we played outside.", { zh: "天很冷，但我们在外面玩。", word: "but" });
      k.act(me, "nod", S.at - .6, .8);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 4 · 中文没连接词的地方，英语要补上 ─────
      D.step(3); D.shot();
      N("补上连接词：", "「妈妈做饭，爸爸洗碗。」中文中间只有逗号；英语要补一个 and。");
      T("妈妈做饭，爸爸洗碗。", 60, 150, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      T("Mom cooks and Dad washes the dishes.", 60, 200, go(1.2), 1.2, { size: 21, color: C.green, weight: 900, font: M });
      k.hlText("and", 60 + k.estW("Mom cooks ", 21) * 1.17, 200, 21, { mono: true, color: C.hlYellow });
      sayAt("Mom cooks and Dad washes the dishes.", { zh: "妈妈做饭，爸爸洗碗。", word: "Mom cooks and Dad washes the dishes" });
      T("下雨了，我们不去公园了。", 60, 270, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      T("It is raining, so we won't go to the park.", 60, 320, go(1.3), 1.3, { size: 20, color: C.green, weight: 900, font: M });
      sayAt("It is raining, so we won't go to the park.", { zh: "下雨了，我们不去公园了。", word: "is raining won't go park" });
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "中文靠意思，英语靠钩子；因为所以选一个，虽然但是选一个！");
      T("中文靠意思，英语靠钩子；成对的连接词只选一个！", 60, 390, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.wait(.8);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "「因为我很累，所以我早早睡了。」英语怎么说？只能用一个连接词，先想 3 秒！");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 因为我很累，所以我早早睡了。= ？", 36, 470, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 470, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "I was tired, so I went to bed early.（也可以说 Because I was tired, I went to bed early.）");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("I was tired, so I went to bed early.", 36, 512, go(1.2), 1.2, { size: 21, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("I was tired, so I went to bed early.", { zh: "我很累，所以早早睡了。", word: "I tired went to bed early" });
      sayAt("Because I was tired, I went to bed early.", { zh: "因为很累，我早早睡了。", word: "because" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文靠意思把句子连起来，英语要用连接词：\nand、so、because、but……\n成对的「因为所以、虽然但是」英语只选一个。", rhyme: "中文靠意思，英语靠钩子；\n因为所以选一个！", hlLines: 2, foot: "🔀 中英对照 · 中英思维" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["Because it rained, so we stayed at home.", "vs"],   // 照搬「因为……所以……」的错句（打红叉）、标题里的 vs，不读
    terms: [
      ["意合", "靠意思把句子连起来，不一定用连接词。中文常常这样：下雨了，不去了。"],
      ["形合", "用连接词把句子连起来。英语要这样：It is raining, so we won't go."],
      ["连接词", "把两句话连起来的小词：and（和）、so（所以）、because（因为）、but（但是）、although（虽然）。"],
      ["成对连接词", "中文「因为……所以……」「虽然……但是……」可以成对用；英语里 because 和 so、although 和 but 只能用一个。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ✂️ 简化说法 · ⚠️ 有要注意的地方 · 📜 有出处的历史。"],
    ],
  },
];
