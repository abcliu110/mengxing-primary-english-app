// ==================== 🔀 中英对照总枢 · A 单复数和时态要「上身」（ze_mark）（v2 + 讲解员，总览幕）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「A 中英思维对照」。中文靠「三本、昨天」这些词说数量和时间，名词、动词本身不变；
// 英语的名词、动词自己要变样（book → books，go → went，like → likes）。本幕只做总览，细讲见第一性原理 ③（可数 / 不可数）
// 和实验室「时态矩阵」「过去式门派」。配色只用 V3 四色。徽章：💡 中英对照说法；✂️ 不规则变化只举一两个。
WB_LAB.ze_mark = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      // 一行对照：中文（词不变）→ 英语（词变样，变的部分荧光）
      const row = (y, zh, en, hl, hx) => {
        T(zh, 60, y, go(.6), .6, { size: 22, color: C.ink, weight: 900 });
        T("→", 330, y, go(.2), .2, { size: 22, color: C.grey, weight: 900 });
        if (hl) k.hlText(hl, 370 + hx, y, 24, { mono: true, color: C.hlYellow });
        T(en, 370, y, go(.8), .8, { size: 24, color: C.green, weight: 900, font: M });
      };
      const cw = 24 * .6;   // 等宽字一个字母的宽度
      N("", "这一幕：中文「一本书、三本书」，书字从来不变；英语的 book 可要变成 books！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "单复数和时态要「上身」", sub: "🔀 中英对照 · 中英思维", badges: ["💡", "✂️"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("上身：", "中文用「三本、昨天」这些词告诉你多少、什么时候；英语还要让名词、动词自己换衣服。");
      k.wait(.6);

      // ───── 镜头 1 · 中文：词不变 ─────
      D.step(0); D.shot();
      N("中文：", "一本书、三本书；我今天去、我昨天去——「书」「去」一个字都没变。");
      T("一本书　三本书", 60, 150, go(.8), .8, { size: 24, color: C.ink, weight: 900 });
      T("我每天去　我昨天去", 60, 210, go(.8), .8, { size: 24, color: C.ink, weight: 900 });
      T("← 「书」「去」不变", 360, 180, go(.5), .5, { size: 18, color: C.blue, weight: 900 });
      k.act(me, "point", S.at - .6, 1.2, { at: [200, 180] });
      k.wait(.5);

      // ───── 镜头 2 · 照搬 ─────
      D.step(1);
      N("照搬：", "照中文直接翻，就成了 three book、I go yesterday——数量和时间都没「上身」。");
      T("three book", 60, 290, go(.6), .6, { size: 24, color: C.red, weight: 900, font: M });
      T("I go yesterday", 300, 290, go(.7), .7, { size: 24, color: C.red, weight: 900, font: M });
      k.redX(560, 266);
      k.act(me, "surprised", S.at - .5, 1.2); k.expr(me, "oops", S.at - .5, 1.6);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 英语：名词、动词自己变 ─────
      D.step(2); D.shot();
      N("单复数上身：", "两个以上，名词加 -s：book → books。");
      row(140, "一本书", "a book", "", 0);
      row(190, "三本书", "three books", "s", cw * 10);
      sayAt("A book. Three books.", { zh: "一本书。三本书。", word: "a book three books s", blocks: ["s"] });
      N("时态上身：", "过去发生的事，动词换成过去式：go → went。");
      row(260, "我每天去上学", "I go to school every day.", "", 0);
      const syG = sayAt("I go to school every day.", { zh: "我每天去上学。", word: "I go to school every day" });
      { const [w0, wd] = win(syG); k.act(me, "walk", w0, Math.max(1, wd), { to: 820, words: ["go"] }); }
      k.act(me, "walk", S.at + .1, 1, { to: 892 });
      row(310, "我昨天去了学校", "I went to school yesterday.", "went", cw * 2);
      sayAt("I went to school yesterday.", { zh: "我昨天去了学校。", word: "went yesterday" });
      N("三单上身：", "他、她一个人做事，动词也要加 -s：like → likes。");
      row(380, "她喜欢猫", "She likes cats.", "s", cw * 8);
      sayAt("I like cats. She likes cats.", { zh: "我喜欢猫。她喜欢猫。", word: "She likes cats like" });
      k.badge("💡", 640, 376);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 4 · 更多例子 + 去哪里细学 ─────
      D.step(3); D.shot();
      N("更多例子：", "两只小狗 two dogs；他们昨天踢了足球 They played football yesterday.");
      row(150, "两只小狗", "two dogs", "s", cw * 7);
      sayAt("I have two dogs.", { zh: "我有两只小狗。", word: "two dogs" });
      row(210, "他们昨天踢了足球", "They played football.", "ed", cw * 10);
      sayAt("They played football yesterday.", { zh: "他们昨天踢了足球。", word: "They played football ed", blocks: ["ed"] });
      N("✂️ 小提醒：", "也有不规则的：child → children，go → went。细讲看第一性原理 ③ 和实验室「时态矩阵」「过去式门派」。");
      T("✂️ 不规则：child → children，go → went", 60, 280, go(1), 1, { size: 18, color: C.grey, weight: 700 });
      sayAt("One child, two children.", { zh: "一个孩子，两个孩子。", word: "child children" });
      T("细讲：第一性原理 ③、实验室「时态矩阵」「过去式门派」", 60, 320, go(1), 1, { size: 16, color: C.blue, weight: 700 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "中文靠小词，英语换衣服：多了加 s，过去换过去式！");
      T("中文靠小词，英语换衣服：多了加 s，过去换过去式！", 60, 390, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.wait(.8);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "「我昨天看了两本书。」英语怎么说？数量和时间都要上身，先想 3 秒！（看 read 的过去式还是 read）");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 我昨天看了两本书。= ？", 36, 470, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 360, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "I read two books yesterday.（books 加了 -s；read 的过去式拼法不变，读音变成 /red/。）");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("I read two books yesterday.", 36, 512, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("I read two books yesterday.", { zh: "我昨天看了两本书。", word: "read books" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文靠「三本、昨天」这些小词说多少、什么时候；\n英语还要让名词、动词自己换衣服：\nbook → books，go → went，like → likes。", rhyme: "中文靠小词，英语换衣服！", hlLines: 2, foot: "🔀 中英对照 · 中英思维" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["three book", "I go yesterday"],   // 照搬中文、没「上身」的错误说法（打红叉），不读
    actionWords: [
      { word: "go", act: "讲解员朝学校方向走几步再走回来（walk）" },
    ],
    terms: [
      ["单复数", "一个叫单数（a book），两个以上叫复数（three books）。英语的名词要跟着变。"],
      ["时态", "动词的样子告诉你事情什么时候发生：go（平时）、went（过去）。"],
      ["三单", "他、她、它一个人做事（第三人称单数），一般现在时的动词要加 -s：She likes cats."],
      ["不规则变化", "不按加 -s、加 -ed 的规矩变：child → children，go → went，read → read（读音变）。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ✂️ 简化说法 · ⚠️ 有要注意的地方 · 📜 有出处的历史。"],
    ],
  },
];
