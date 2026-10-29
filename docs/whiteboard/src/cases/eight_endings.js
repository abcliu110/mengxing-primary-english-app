// ==================== 🔚 王炸实验室 · 英语只剩 8 个词尾（eight_endings）（v2 + 讲解员）====================
// 决策 5（MASTER_DESIGN）：实验室新页签「英语只剩 8 个词尾」（L）。
// 出处：lab/SOURCES.md ①（Wikipedia「Inflection」：英语有 8 个规则屈折词缀；古英语是中度屈折语言，中古、现代英语逐步丢失；
//       现代规则动词只有 look / looks / looked / looking 四种形式；中文普通话没有屈折变化，靠语序和虚词）。
// 徽章：📜 有出处的语言事实；💡「小尾巴」比喻；✂️「8 个」指规则词尾（-ed 与 -en 两个都表示完成，见术语）。配色只用 V3 四色。
WB_LAB.eight_endings = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：英语单词会长「小尾巴」：-s、-ed、-ing……数一数，规则的小尾巴一共只有 8 个！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "英语只剩 8 个词尾", sub: "🔚 王炸实验室 · 屈折词尾", badges: ["📜", "💡", "✂️"], steps: ["① 中文", "② 名词 2 个", "③ 动词 4 个", "④ 形容词 2 个", "⑤ 历史", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 中文不变，英语长尾巴 ─────
      D.step(0); D.shot();
      N("词尾：", "加在单词最后、表示「几个、什么时候、比谁更……」的小尾巴，比如 book 加 -s 变 books。");
      T("中文：一本书 / 三本书　书 不变", 60, 150, go(.9), .9, { size: 22, color: C.ink, weight: 900 });
      T("英语：a book / three books　book 长尾巴 -s", 60, 196, go(.9), .9, { size: 22, color: C.blue, weight: 900 });
      k.badge("📜", 60 + k.estW("英语：a book / three books　book 长尾巴 -s", 22) + 10, 192);
      sayAt("A book. Three books.", { zh: "一本书。三本书。", word: "a book three books" });
      k.act(me, "point", S.at - 1.6, 1.3, { at: [340, 192] });
      N("📜 中文：", "普通话的词不长尾巴，靠词序和「了、着、过」这些小词来表示。");
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 名词：2 个 ─────
      D.step(1); D.shot();
      k.head("名词的尾巴：2 个", 60, 140, C.blue, "start", 22);
      N("① -s：", "复数，好几个：cat → cats。");
      T("① -s　复数　cat → cats", 60, 184, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      N("② 's：", "谁的：Tom's bag 汤姆的包。");
      T("② 's　谁的　Tom → Tom's bag", 60, 228, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      const cS = k.prop("card", 0, 0, { text: "-s", hidden: true });
      const syCats = sayAt("One cat, two cats. This is Tom's bag.", { zh: "一只猫，两只猫。这是汤姆的包。", word: "cat cats Tom Tom's bag" });
      k.act(me, "holdCard", syCats.t, Math.max(1.6, syCats.dur), { prop: cS });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 3 · 动词：4 个 ─────
      D.step(2); D.shot();
      k.head("动词的尾巴：4 个", 60, 140, C.red, "start", 22);
      N("③ -s：", "他 / 她 / 它做事，现在：She walks.");
      T("③ -s　她现在做　She walks.", 60, 182, go(.8), .8, { size: 21, color: C.ink, weight: 900, font: M });
      N("④ -ed：", "过去做了：walked。");
      T("④ -ed　过去做了　walked", 60, 220, go(.8), .8, { size: 21, color: C.ink, weight: 900, font: M });
      N("⑤ -ing：", "正在做：walking。");
      T("⑤ -ing　正在做　walking", 60, 258, go(.8), .8, { size: 21, color: C.ink, weight: 900, font: M });
      N("⑥ -ed / -en：", "已经做完（完成）：has walked、has eaten。");
      T("⑥ -ed / -en　已经做完　has walked · has eaten", 60, 296, go(1), 1, { size: 21, color: C.ink, weight: 900, font: M });
      const syWalk = sayAt("She walks to school. She walked to school. She is walking to school.", { zh: "她走路上学。她走路上学了。她正在走路上学。", word: "she walks walked walking school" });
      k.act(me, "walk", syWalk.t, Math.max(2, syWalk.dur * .6), { to: 760, words: ["walks"] });
      k.act(me, "walk", syWalk.t + syWalk.dur * .62, Math.max(1.2, syWalk.dur * .38), { to: 892, words: ["walking"] });
      sayAt("He has walked home. I have eaten lunch.", { zh: "他已经走回家了。我已经吃过午饭了。", word: "has walked have eaten lunch home" });
      T("📜 look · looks · looked · looking：规则动词只有这 4 个样子", 60, 344, go(1), 1, { size: 18, color: C.green, weight: 900 });
      sayAt("Look, looks, looked, looking.", { zh: "看（原形、她看、看了、正在看）。", word: "look looks looked looking" });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 4 · 形容词：2 个 ─────
      D.step(3); D.shot();
      k.head("形容词的尾巴：2 个", 60, 140, C.green, "start", 22);
      N("⑦ -er：", "更……：tall → taller。");
      T("⑦ -er　更……　tall → taller", 60, 184, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      N("⑧ -est：", "最……：tall → tallest。");
      T("⑧ -est　最……　tall → tallest", 60, 228, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      const syTall = sayAt("Tom is tall. Sam is taller. Ben is the tallest.", { zh: "汤姆高。山姆更高。本最高。", word: "tall taller tallest the" });
      k.act(me, "jump", syTall.t + syTall.dur * .6, 1, { words: ["tallest"] });
      N("📜 长单词：", "很多从法语、拉丁语借来的长形容词不加尾巴，改用 more / most：more beautiful。");
      T("长单词：more beautiful · most beautiful", 60, 280, go(1), 1, { size: 19, color: C.blue, weight: 900, font: M });
      sayAt("More beautiful, most beautiful.", { zh: "更美，最美。", word: "more beautiful most" });
      T("2 + 4 + 2 = 8 个小尾巴！", 60, 340, go(.8), .8, { size: 24, color: C.red, weight: 900 });
      k.act(me, "cheer", S.at - .6, 1.3);
      k.wait(.5);
      D.wipe();

      // ───── 镜头 5 · 历史：尾巴越掉越少 ─────
      D.step(4); D.shot();
      N("📜 一千多年前：", "古英语的词尾可多了，名词要按主语、宾语、「的」、「给」换不同尾巴，很像今天的德语。");
      T("古英语：scip（船）→ scipes · scipe · scipu · scipa · scipum", 60, 150, go(1.4), 1.4, { size: 19, color: C.ink, weight: 900 });
      k.badge("📜", 60 + k.estW("古英语：scip（船）→ scipes · scipe · scipu · scipa · scipum", 19) + 8, 146);
      N("📜 后来：", "中古英语、现代英语把尾巴一条一条丢掉，只剩 8 个规则的；分谁做谁，改靠词序。");
      T("现代英语：ship → ships（还有 ship's）", 60, 200, go(1), 1, { size: 21, color: C.blue, weight: 900, font: M });
      sayAt("One ship, two ships. The ship's sail is white.", { zh: "一条船，两条船。这条船的帆是白色的。", word: "ship ships ship's sail white" });
      T("尾巴少了 → 词序更重要：The dog bites the man. ≠ The man bites the dog.", 60, 250, go(1.4), 1.4, { size: 18, color: C.green, weight: 900 });
      sayAt("The dog bites the man. The man bites the dog.", { zh: "狗咬人。人咬狗。", word: "dog bites man" });
      N("💡 联系：", "中文干脆一个尾巴都没有，所以中国孩子最容易忘记加 -s、-ed——记住这 8 个就够了！");
      T("💡 中文 0 个 → 英语 8 个：只要盯住这 8 个！", 60, 300, go(1), 1, { size: 20, color: C.red, weight: 900 });
      k.act(me, "point", S.at - .8, 1.3, { at: [300, 296] });
      k.wait(.5);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「昨天她打扫了三个房间」——要长几个尾巴？先想 3 秒！");
      P(k.roughRect(16, 420, 824, 112), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 420, 824, 112), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 昨天她打扫了三个房间。= ？", 36, 460, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 350, 464, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "She cleaned three rooms yesterday. 两个尾巴：cleaned 的 -ed（过去）和 rooms 的 -s（复数）。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("She cleaned three rooms yesterday.（-ed + -s）", 36, 500, go(1), 1, { size: 21, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("She cleaned three rooms yesterday.", { zh: "昨天她打扫了三个房间。", word: "cleaned rooms yesterday three" });
      D.hold(2);

      k.quoteCard({ insight: "英语规则的小尾巴只剩 8 个：\n名词 -s、's；动词 -s、-ed、-ing、-en；形容词 -er、-est。", rhyme: "名二动四形容二，\n八条尾巴记心里！", hlLines: 2, foot: "🔚 王炸实验室 · 8 个词尾" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["scipes", "scipe", "scipu", "scipa", "scipum", "scip", "ed", "ing", "en", "er", "est"],   // 古英语词形（历史展示）和词尾标签（-s、-ed……只是尾巴记号，整词都在例句里读），不朗读
    actionWords: [
      { word: "walks", act: "讲解员边读边走（walk）" },
      { word: "walking", act: "讲解员正在走回来（walk）" },
      { word: "tallest", act: "讲解员跳起来比「最高」（jump）" },
    ],
    terms: [
      ["词尾（屈折词尾）", "加在词尾、只改变语法意思不改变词义的小尾巴：books、walked、taller。英语规则的只有 8 个（📜 见出处）。"],
      ["复数 -s", "名词表示好几个：cats、books。"],
      ["所有格 's", "表示「谁的」：Tom's bag。"],
      ["三单 -s", "主语是他 / 她 / 它、说现在的事，动词加 -s：She walks。"],
      ["-ed / -en", "-ed 表示过去（walked）；-ed / -en 还用在「已经做完」里（has walked、has eaten）。✂️ -en 只在一部分不规则动词上出现。"],
      ["-ing", "正在做：walking。"],
      ["-er / -est", "比较级（更）和最高级（最）：taller、tallest；长单词改用 more / most。"],
      ["可信度徽章", "📜 有出处的语言事实 · 💡 比喻（小尾巴）· ✂️ 简化说法 · ⚠️ 有要注意的地方。"],
    ],
  },
];
