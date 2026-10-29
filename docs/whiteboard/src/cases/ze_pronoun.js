// ==================== 🔀 中英对照总枢 · M 代词变格活化石：I / me / my / mine（ze_pronoun）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「M 代词变格」。出处：zh_en_hub/SOURCES.md（📜 古英语变格、现代英语只剩代词变格）。
// 中文「我」做主语、宾语都是「我」，「我的」加个「的」；英语代词按位置换形：I（主语）/ me（宾语）/ my（+ 名词）/ mine（单独用）。
// 配色只用 V3 四色。徽章：📜 有出处的历史；💡 中英对照 / 活化石比喻。
WB_LAB.ze_pronoun = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：中文一个「我」字走天下，英语的「我」却有 I、me、my、mine 四个样子！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "I / me / my / mine", sub: "🔀 中英对照 · 代词变格", badges: ["📜", "💡"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 历史", "⑤ 口诀", "🔮 预测"] });
      N("代词：", "代替名字的词：我、你、他、她……英语叫 I、you、he、she。");
      k.wait(.6);

      // ───── 镜头 1 · 中文：一个「我」─────
      D.step(0); D.shot();
      N("中文：", "「我喜欢他」「他喜欢我」「这是我的书」「书是我的」——「我」的样子从来不变。");
      ["我喜欢他。", "他喜欢我。", "这是我的书。", "这本书是我的。"].forEach((z, i) => T(z, 60 + (i % 2) * 300, 150 + Math.floor(i / 2) * 56, go(.5), .5, { size: 22, color: C.ink, weight: 900 }));
      k.hlText("我", 60, 150, 22, { color: C.hlYellow }); k.hlText("我", 360 + k.estW("他喜欢", 22), 150, 22, { color: C.hlYellow });
      k.act(me, "think", S.at - .6, 1.4);
      k.wait(.4);
      // ───── 照搬 ─────
      D.step(1);
      N("照搬：", "照中文用一个样子，就会说出 Him likes I. 这样的句子——英语里主语、宾语要换形。");
      T("Him likes I.", 60, 300, go(.6), .6, { size: 24, color: C.red, weight: 900, font: M });
      k.redX(260, 276);
      k.act(me, "surprised", S.at - .5, 1.2); k.expr(me, "oops", S.at - .5, 1.6);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 英语：按位置换形 ─────
      D.step(2); D.shot();
      N("按位置换形：", "做主语用 I，放在动词后面当宾语用 me，后面跟名词用 my，单独用用 mine。");
      const cols = [["主语", "I", "he", "she", "we", "they"], ["宾语", "me", "him", "her", "us", "them"], ["+ 名词", "my", "his", "her", "our", "their"], ["单独用", "mine", "his", "hers", "ours", "theirs"]];
      cols.forEach((c, ci) => c.forEach((w, ri) => {
        const x = 60 + ci * 130, y = 130 + ri * 40;
        T(w, x, y, go(ri ? .18 : .3), ri ? .18 : .3, { size: ri ? 22 : 16, color: ri === 1 ? [C.blue, C.red, C.green, C.ink][ci] : (ri ? C.ink : C.grey), weight: 900, font: ri ? M : undefined });
      }));
      k.act(me, "point", S.at - 1, 1.4, { at: [300, 170] });
      sayAt("I like him. He likes me.", { zh: "我喜欢他。他喜欢我。", word: "I like him He likes me" });
      sayAt("This is my book. The book is mine.", { zh: "这是我的书。这本书是我的。", word: "This is my book The mine" });
      sayAt("She, her, hers. We, us, our, ours.", { zh: "她（主语、宾语、的、单独用）；我们（主语、宾语、的、单独用）。", word: "she her hers we us our ours" });
      sayAt("They, them, their, theirs. His.", { zh: "他们（主语、宾语、的、单独用）。他的。", word: "they them their theirs his" });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 历史：活化石 ─────
      D.step(3); D.shot();
      N("📜 一千多年前：", "古英语里，很多词都要换样子，表示它在句子里做主语还是宾语，这叫「变格」。后来英语把这套变化差不多都丢了。");
      T("古英语：词要「变格」（换样子表示主语 / 宾语）", 60, 140, go(1.2), 1.2, { size: 19, color: C.ink, weight: 900 });
      k.badge("📜", 60 + k.estW("古英语：词要「变格」（换样子表示主语 / 宾语）", 19) + 10, 136);
      N("今天的名词：", "现在的名词不变了：The dog sees the cat. 和 The cat sees the dog. 里 dog 一模一样，全靠位置分谁做谁。");
      T("The dog sees the cat.", 60, 200, go(.9), .9, { size: 21, color: C.green, weight: 900, font: M });
      T("The cat sees the dog.", 60, 240, go(.9), .9, { size: 21, color: C.green, weight: 900, font: M });
      T("← dog 不变，靠位置", 420, 220, go(.5), .5, { size: 17, color: C.blue, weight: 900 });
      sayAt("The dog sees the cat. The cat sees the dog.", { zh: "狗看见了猫。猫看见了狗。", word: "The dog sees the cat" });
      N("活化石：", "只有代词还留着变格：he 和 him、I 和 me——它们是一千多年前英语的「活化石」！");
      T("He sees him.　You see me.　→ 代词还在变！", 60, 300, go(1), 1, { size: 21, color: C.red, weight: 900, font: M });
      sayAt("He sees him. You see me.", { zh: "他看见了他（另一个人）。你看见了我。", word: "sees you see" });
      T("代词 = 古英语变格的活化石", 60, 350, go(.8), .8, { size: 20, color: C.blue, weight: 900 });
      k.badge("💡", 60 + k.estW("代词 = 古英语变格的活化石", 20) + 10, 346, { label: "比喻" });
      k.act(me, "surprised", S.at - .5, 1);
      k.wait(.6);
      D.wipe();

      // ───── 口诀 ─────
      D.step(4); D.shot();
      N("口诀：", "前面做事用 I，后面挨打用 me，带着东西用 my，单独出门用 mine！");
      T("做主语 I，当宾语 me，", 60, 160, go(.8), .8, { size: 22, color: C.blue, weight: 900 });
      T("带名词 my，单独用 mine！", 60, 210, go(.8), .8, { size: 22, color: C.blue, weight: 900 });
      sayAt("I, me, my, mine.", { zh: "我（主语、宾语、的、单独用）。", word: "I me my mine" });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「她是我的朋友，我喜欢她。」两个「她」、一个「我的」、一个「我」，英语各用哪个？先想 3 秒！");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 她是我的朋友，我喜欢她。= ？", 36, 470, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 420, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "She is my friend. I like her. 主语 She、I，宾语 her，带名词 my。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("She is my friend. I like her.", 36, 512, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("She is my friend. I like her.", { zh: "她是我的朋友，我喜欢她。", word: "friend" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文一个「我」走天下，英语的代词按位置换形：\nI / me / my / mine。\n它们是一千多年前英语「变格」的活化石。", rhyme: "做主语 I，当宾语 me，\n带名词 my，单独用 mine！", hlLines: 2, foot: "🔀 中英对照 · 代词变格" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["Him likes I."],   // 照搬中文的错句（打红叉），不读
    terms: [
      ["代词", "代替名字的词：I、you、he、she、it、we、they。"],
      ["主格 / 宾格", "做主语用主格（I、he、she、we、they）；当宾语用宾格（me、him、her、us、them）。"],
      ["物主代词", "表示「谁的」：后面跟名词用 my、his、her、our、their；单独用用 mine、his、hers、ours、theirs。"],
      ["变格", "词换样子表示它在句子里当主语还是宾语。古英语的词大多要变格，现代英语只剩代词还在变（📜 见出处）。"],
      ["可信度徽章", "📜 有出处的历史 · 💡 中英对照 / 比喻 · ✂️ 简化说法 · ⚠️ 有要注意的地方。"],
    ],
  },
];
