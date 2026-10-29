// ==================== 白板脚本：竹节句 vs 树干句 5 个病句手术 ====================
// v2 升级（2026-10-30 起，决策 24）：逐个案例升引擎 v2 + 讲解员；升级前整份文件原样保存在 cases/bamboo_tree_classic.js。依赖 wo_props。
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
WB_LAB.bamboo_tree = [
  // ───────── ① 多动词连动病（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/bamboo_tree_classic.js（R1 零丢失）。原左（竹节句 + 病句）右（树干句）两半拆成两个镜头；树整体左移 300 给讲解员让位；树干 / 王冠保留道具木色 / 金色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这节课：为什么中文顺着说的句子，照着翻成英语就错了？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "竹节句 vs 树干句", sub: "病句手术 ①  多动词连动病", badges: ["💡", "✂️"], steps: ["① 竹节句", "② 硬翻病句", "③ 立树干", "④ 挂树枝", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 竹节句 + 硬翻的病句 ─────
      D.step(0); D.shot();
      k.head("汉语：竹节句", 40, 108, C.ink);
      N("竹节句：", "中文像一根竹子，一节接一节。几个动作按先后排成一串，不用连接词。");
      const z = k.zh("我明天想去图书馆看故事书。", 40, 155);
      N("动词：", "表示动作的词。这句话里有 3 个：想、去、看。");
      k.circle(z, 3); k.circle(z, 4); k.circle(z, 8);
      k.act(me, "point", S.at - 1, 1.2, { at: [z.cx(4), z.cy] });
      N("", "画成竹子：每个动词占一节，一样长，谁也不比谁重要。");
      k.bamboo(["想 want", "去 go", "看 read"]);
      k.note("三个动词一样高，平起平坐", 40, 272);
      k.wait(.3);
      const syW = sayAt("Want, go, read. I want to read.", { zh: "想、去、读。我想读书。", word: "want go read I to" });
      const half = Math.max(1, syW.dur * .45);
      k.act(me, "walk", syW.t, half, { to: 850, words: ["go"] });
      const bk = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", syW.t + half, Math.max(1.2, syW.dur - half), { prop: bk, words: ["read"] });
      k.act(me, "walk", syW.t + syW.dur + .3, .8, { to: 892 });
      D.step(1);
      N("中式英语（Chinglish）：", "照着中文一个词一个词硬翻出来的英语。");
      const m = k.mono("I tomorrow want go library read storybook.", 40, 322);
      sayAt("Chinglish. Chinglish is English in Chinese word order.", { zh: "中式英语。中式英语就是按中文顺序排的英语。", word: "Chinglish" });
      N("", "错在哪？want、go、read 三个动词挤在一起，都想当老大。");
      k.squiggle(m, "go"); k.squiggle(m, "read"); k.redX(12, 302);
      k.act(me, "surprised", S.at - .4, 1); k.expr(me, "oops", S.at - .4, 1.4);
      N("谓语动词：", "句子里说「主语在做什么」的那个主要动词。英语一句话只能有一个。");
      k.note("英语一句话只能有 1 个谓语动词！", 40, 375, { size: 19, color: C.red, weight: 900 });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 树干句：先立主干，再挂树枝 ─────
      D.step(2); D.shot();
      k.head("英语：树干句", 40, 108, C.green);
      N("树干句：", "英语像一棵树。先长出主干（谁 + 做什么），别的内容像树枝挂上去。");
      k.tree({ cx: 420, gx0: 260, gx1: 610 });
      N("主干：", "I want（我想要）。want 是这句唯一的谓语动词，所以戴上王冠。");
      k.sign("I want", 421, 300, "want");
      k.act(me, "point", S.at - .6, 1.2, { at: [430, 300] });
      D.step(3);
      N("挂件（树枝）：", "挂在主干上的补充内容。go 前加 to，就不再抢谓语的位置。");
      k.chip("to go to the library", 192, 246, [398, 250], { tag: "挂件 1：去哪儿" });
      N("to + 动词：", "动词前加 to，表示「要去做的事」。read 变成 to read，说明去干什么。");
      k.chip("to read storybooks", 460, 212, [444, 236], { tag: "挂件 2：去干什么" });
      N("时间挂件：", "tomorrow 这类时间词，一般挂在英语句子的最后。");
      k.chip("tomorrow", 496, 358, [446, 350], { color: C.green, tag: "时间挂句尾" });
      sayAt("Tomorrow. The library has storybooks.", { zh: "明天。图书馆里有故事书。", word: "tomorrow library storybook storybooks the" });
      // 整句横跨全宽：讲解员先退到右边
      k.act(me, "walk", S.at, 1, { to: 1010 });
      k.wait(1);
      N("", "连起来：主干 + 树枝 = 一句地道的英语！");
      k.final("I want to go to the library to read storybooks tomorrow.", "want", "我明天想去图书馆看故事书。  先立树干，再挂树枝！");
      k.wait(.6);
      D.wipe();

      // ───── 口诀 ─────
      D.step(4); D.shot();
      k.act(me, "walk", S.at, 1.2, { to: 892 });
      N("口诀：", "先立树干，再挂树枝。一句话只留一个谓语动词当国王。");
      P(k.roughRect(40, 118, 760, 48), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：先立树干，再挂树枝。一句话只留一个谓语动词当国王。", 60, 150, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.4);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「我想去公园踢足球」，want 已经当国王了，go 和 play 前面各填什么？先想 3 秒！");
      P(k.roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 我想去公园踢足球。", 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      T("I want ___ go to the park ___ play football.", 64, 284, go(1), 1, { size: 22, color: C.ink, weight: 900, font: D.MONO });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "两个空都填 to：go 和 play 穿上 to，就变成挂件，不抢国王的位置。");
      const tRev = go(.3);
      T("I want to go to the park to play football.", 64, 330, go(1), 1, { size: 22, color: C.green, weight: 900, font: D.MONO });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      const syP = sayAt("I want to go to the park to play football.", { zh: "我想去公园踢足球。", word: "park play football" });
      k.act(me, "jump", syP.t + syP.dur * .5, Math.max(1, syP.dur * .5), { words: ["play"] });
      D.hold(2);

      k.quoteCard({ insight: "中文像竹子，动作一节接一节；\n英语像树，只立一个谓语当主干，其余都挂成树枝", rhyme: "口诀：先立树干，再挂树枝。一句话只留一个谓语动词当国王。", hlLines: 2, foot: "🌳 竹节句 vs 树干句 · 病句手术 ①" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "go", act: "讲解员在读到「Want, go, read」时往前走（walk）" },
      { word: "read", act: "讲解员接着捧书读（read），与「I want to read」同步" },
      { word: "play", act: "预测题揭晓读到「to play football」时讲解员跳起来（jump）" },
    ],
    r2skip: ["vs", "I tomorrow want go library read storybook."],   // vs 对比符号；病句不读
    terms: [
      ["可信度徽章", "💡 竹子 / 大树、国王 / 挂件都是帮助记忆的比喻；✂️ 简化说法：「一句只有一个谓语动词」指没有 and 等连接词的简单句。"],
      ["竹节句", "中文的句子像竹子，一节接一节：几个动作按先后排成一串，中间不用连接词。比如「我想去图书馆看书」里有想、去、看三个动作。"],
      ["树干句", "英语的句子像一棵树：先说主干（谁 + 做什么），其他内容像树枝一样挂在后面。"],
      ["动词", "表示动作或状态的词，比如 want（想要）、go（去）、read（读）。"],
      ["谓语动词（谓语王）", "句子里说「主语在做什么」的那个主要动词。英语一句话（没有 and 等连接词时）只能有一个，所以动画里给它戴王冠。"],
      ["主语", "句子在说「谁」，比如 I（我）。"],
      ["主干", "主语 + 谓语动词，句子最核心的部分，比如 I want。"],
      ["挂件 / 树枝", "挂在主干上的补充内容：去哪儿、去干什么、什么时候，比如 to go to the library、tomorrow。"],
      ["to + 动词（马甲）", "别的动词前面加上 to，就不再当谓语，变成挂件，表示「要去做的事」，比如 to go、to read。"],
      ["中式英语（Chinglish）", "按中文顺序一个词一个词硬翻出来的英语，比如 I tomorrow want go library。"],
      ["连动", "一句话里几个动作接连发生，比如「想 → 去 → 看」。中文可以直接连着说，英语不行。"],
      ["单核", "一个句子只有一个核心，也就是只有一个谓语动词。"]
    ]
  },
  // ───────── ② 双王相撞病（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/bamboo_tree_classic.js（R1 零丢失）。原左（竹节句 + 病句）右（两棵树）两半拆成两个镜头；两棵树整体左移 300；紫（程度）改墨黑、橙（and）改蓝（V3），树干 / 王冠保留道具色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一句有两个毛病：两个国王抢一个王座，还有一个形容词没有国王。");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "竹节句 vs 树干句", sub: "病句手术 ②  双王相撞病", badges: ["💡", "✂️"], steps: ["① 竹节句", "② 双王相撞", "③ 两棵树", "④ 挂件和桥", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 竹节句 + 双王相撞 ─────
      D.step(0); D.shot();
      k.head("汉语：竹节句", 40, 108, C.ink);
      N("竹节句：", "中文里「喜欢」是动作，「开心」是心情，都能直接当句子的核心。");
      const z = k.zh("我非常喜欢小狗，它们今天很开心。", 40, 155, 26);
      k.circle(z, 3, 4); k.circle(z, 13, 14);
      k.act(me, "point", S.at - .8, 1.2, { at: [z.cx(13), z.cy] });
      N("", "画成竹子：「喜欢」一节，「开心」一节。");
      k.bamboo(["喜欢 like", "开心 happy"]);
      k.note("中文里「开心」可以直接当谓语", 40, 272);
      D.step(1);
      N("中式英语（Chinglish）：", "照着中文硬翻：I am very like dogs, they very happy today.");
      const m1 = k.mono("I am very like dogs,", 40, 322);
      const m2 = k.mono("they very happy today.", 40, 372);
      k.redX(12, 302);
      sayAt("Chinglish is not good English.", { zh: "中式英语不是地道的英语。", word: "Chinglish" });
      N("双王相撞：", "am 和 like 都是动词，挤在同一个王座上打架。一句只能有一个国王！");
      k.miniCrown((m1.x0("am") + m1.x1("am")) / 2, m1.y - 22);
      k.miniCrown((m1.x0("like") + m1.x1("like")) / 2, m1.y - 22);
      k.bolt((m1.x0("very") + m1.x1("very")) / 2, m1.y - 50);
      k.act(me, "surprised", S.at - .3, 1); k.expr(me, "oops", S.at - .3, 1.4);
      k.strike(m1, "am");
      N("形容词：", "描述样子、心情的词，比如 happy。英语里它不能自己当谓语，要靠 are 搭桥。");
      k.caret(m2, "very", 0, "are");
      k.note("① 一句只能一个国王  ② 形容词要靠 are 搭桥", 40, 414, { size: 17, color: C.red, weight: 900 });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 两件事，两棵树 ─────
      D.step(2); D.shot();
      k.head("英语：树干句", 40, 108, C.green);
      N("树干句：", "这句话说了两件事，英语就长两棵树，再用 and 连起来。");
      k.tree({ cx: 300, gx0: 200, gx1: 630, crownRx: 70, crownRy: 40, crownY: 172, trunkW: 44 });
      k.tree({ cx: 530, groundLine: false, crownRx: 70, crownRy: 40, crownY: 172, trunkW: 44 });
      N("主干 1：", "I like dogs（我喜欢小狗）。like 是这棵树的谓语动词。");
      k.sign("I like dogs", 300, 290, "like", { size: 20, crownTag: false });
      N("系动词：", "am / is / are，像一座桥，把主语和形容词连起来：They are happy。");
      k.sign("They are happy", 530, 290, "are", { size: 20, crownTag: false });
      const syH = sayAt("I like dogs. They are happy.", { zh: "我喜欢小狗。它们很开心。", word: "I like dogs they are happy They are happy" });
      k.act(me, "cheer", syH.t + syH.dur * .5, 1.2);
      sayAt("Am, is, are. I am happy. She is happy.", { zh: "am、is、are。我很开心。她很开心。", word: "am is" });
      D.step(3);
      N("程度挂件：", "very much（非常）修饰 like，挂在句子后面；very 修饰 happy。");
      k.chip("very much", 250, 354, [300, 326], { string: true, color: C.ink, fill: C.tintInk, tag: "程度：多喜欢", tagX: 248 });
      k.chip("very", 460, 354, [488, 326], { string: true, color: C.ink, fill: C.tintInk, tag: "多开心", tagX: 460 });
      N("时间挂件：", "today 挂在句尾。");
      k.chip("today", 546, 354, [572, 326], { string: true, color: C.green, tag: "时间", tagX: 556 });
      N("and：", "连接词，像一座桥把两个句子连起来。有了 and，一句话里才能有两个谓语。");
      P("M322,240 C360,256 470,256 508,240", k.go(.6), .6, { color: C.blue, w: 3 });
      k.chip("and", 392, 232, null, { color: C.blue });
      k.act(me, "point", S.at - .5, 1.2, { at: [415, 245] });
      sayAt("Very, very much, today, and.", { zh: "非常、非常（喜欢）、今天、和。", word: "very much today and" });
      k.act(me, "walk", S.at, 1, { to: 1010 });
      k.wait(1);
      N("", "连起来：两棵树 + and = 一句地道的英语！");
      k.final("I like dogs very much, and they are very happy today.", ["like", "are"], "我非常喜欢小狗，它们今天很开心。  一件事一棵树，用 and 连起来！");
      k.wait(.6);
      D.wipe();

      // ───── 口诀 ─────
      D.step(4); D.shot();
      k.act(me, "walk", S.at, 1.2, { to: 892 });
      N("口诀：", "一句只能一个国王；想要两个国王，先用 and 搭桥。");
      P(k.roughRect(40, 118, 760, 48), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：一句只能一个国王；想要两个国王，先用 and 搭桥。", 60, 150, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.4);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「她很高」：tall（高的）是形容词，不能自己当国王。空里填什么？先想 3 秒！");
      P(k.roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 她很高。", 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      T("She ___ very tall.", 64, 284, go(1), 1, { size: 22, color: C.ink, weight: 900, font: D.MONO });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "填 is：she 后面用 is 搭桥，形容词 tall 才站得住。");
      const tRev = go(.3);
      T("She is very tall. —— is 搭桥", 64, 330, go(1), 1, { size: 22, color: C.green, weight: 900, font: D.MONO });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("She is very tall.", { zh: "她很高。", word: "she is very tall" });
      D.hold(2);

      k.quoteCard({ insight: "一件事一棵树，每棵树只有一个国王；\n形容词不能当国王，要靠 am / is / are 搭桥", rhyme: "口诀：一句只能一个国王；想要两个国王，先用 and 搭桥。", hlLines: 2, foot: "🌳 竹节句 vs 树干句 · 病句手术 ②" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [],   // 本案例例句里没有要人演的动作动词（like / be 是心理、状态动词）
    r2skip: ["vs", "I am very like dogs", "they very happy today.", "I am very like dogs, they very happy today."],   // 病句不读
    terms: [
      ["可信度徽章", "💡 竹子 / 大树、国王 / 挂件都是帮助记忆的比喻；✂️ 简化说法：「一句只有一个谓语动词」指没有 and 等连接词的简单句。"],
      ["双王相撞", "一句话里放了两个谓语动词抢「国王」的位置，比如 am like。英语里 am 和 like 只能留一个。"],
      ["形容词", "描述人或东西样子、心情的词，比如 happy（开心的）、big（大的）。英语里形容词不能自己当谓语。"],
      ["系动词", "am / is / are 这类「搭桥」的动词，把主语和形容词连起来：They are happy。"],
      ["程度副词", "说明「有多……」的词，比如 very（很）、very much（非常）。very much 修饰动词时放在句尾。"],
      ["and（连接词）", "把两个句子连成一句的桥。有了 and，一句话里才可以有两个谓语动词。"]
    ]
  },
  // ───────── ③ 长定语压塌车头病（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/bamboo_tree_classic.js（R1 零丢失）。原左（竹节句 + 病句）右（树干句）两半拆成两个镜头；树整体左移 300；紫（定语括号 / 波浪线）改 V3 蓝 / 红，树干 / 王冠保留道具色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一句的毛病：修饰语太长，把最重要的「女孩」压到了后面。");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "竹节句 vs 树干句", sub: "病句手术 ③  长定语压塌车头病", badges: ["💡", "✂️"], steps: ["① 竹节句", "② 车头压塌", "③ 立主干", "④ 修饰后挂", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 竹节句 + 车头压塌 ─────
      D.step(0); D.shot();
      k.head("汉语：竹节句", 40, 108, C.ink);
      N("竹节句：", "中文喜欢把所有修饰语都堆在名词前面，越堆越长。");
      const z = k.zh("在树下看书的那个穿红裙子的女孩是我姐姐。", 40, 155, 21);
      N("定语：", "修饰名词的词语，说明是「哪个、什么样的」，比如「穿红裙子的」。");
      k.bracket(z, 0, 12, "一长串定语", C.blue);
      N("核心名词：", "句子真正在说的那个人或东西：女孩。");
      k.circle(z, 13, 14, C.green);
      k.act(me, "point", S.at - .6, 1.2, { at: [z.cx(13), z.cy] });
      k.bamboo(["在树下看书的", "穿红裙子的", "女孩"], 212, 50, 449, 18);
      k.note("中文：修饰语全压在「女孩」前面", 40, 290);
      D.step(1);
      N("中式英语（Chinglish）：", "照着中文的顺序硬翻，主语 the girl 被压到了最后。");
      const m1 = k.mono("Under the tree reading book in red dress", 40, 340, 18);
      const m2 = k.mono("the girl is my sister.", 40, 372, 18);
      k.squiggle(m1, "Under the tree reading book in red dress", 0, C.red);
      k.underline(m2, "the girl", 0, C.green);
      k.redX(12, 320);
      k.act(me, "surprised", S.at - .3, 1); k.expr(me, "oops", S.at - .3, 1.4);
      sayAt("Chinglish puts the long part first.", { zh: "中式英语把长长的修饰放在前面。", word: "Chinglish" });
      N("", "英语要第一时间说出核心名词 The girl，修饰语挂在它后面。");
      k.note("英语：先立核心名词，修饰语挂后面！", 40, 414, { size: 17, color: C.red, weight: 900 });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 树干句：核心名词在前，修饰语后挂 ─────
      D.step(2); D.shot();
      k.head("英语：树干句", 40, 108, C.green);
      N("树干句：", "先长出主干 The girl is my sister，再把修饰语挂上去。");
      k.tree({ cx: 420, gx0: 260, gx1: 610 });
      N("主干：", "The girl is my sister（那个女孩是我姐姐）。is 是谓语动词。");
      const s = k.sign("The girl is my sister", 420, 300, "is", { size: 20, crownTag: "谓语王" });
      const syR = sayAt("The girl is reading a book. She is my sister.", { zh: "那个女孩在看书。她是我姐姐。", word: "girl is reading book my sister" });
      const bk = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", syR.t, Math.max(1.4, syR.dur * .55), { prop: bk, words: ["reading"] });
      D.step(3);
      N("后置：", "修饰语放到名词后面，叫后置。英语里长的修饰语都挂在名词后面。");
      const gx = s.wordX("girl");
      k.chip("in a red dress", 220, 362, [gx, s.y + s.h], { string: true, tag: "穿着：挂在 girl 后", tagX: 222, tagY: 412 });
      N("介词短语：", "介词 + 名词，比如 in a red dress（穿红裙子）、under the tree（在树下）。");
      k.chip("under the tree", 380, 362, [gx, s.y + s.h], { string: true, tag: "位置：挂在 girl 后", tagX: 384, tagY: 412 });
      sayAt("Under the tree. In a red dress.", { zh: "在树下。穿红裙子。", word: "under the tree in red dress a" });
      k.act(me, "walk", S.at, 1, { to: 1010 });
      k.wait(1);
      N("", "连起来：核心名词在前，修饰语挂后，句子就站稳了！");
      k.final("The girl in a red dress under the tree is my sister.", "is", "在树下看书的那个穿红裙子的女孩是我姐姐。  先说女孩，再挂修饰！");
      k.wait(.6);
      D.wipe();

      // ───── 口诀 ─────
      D.step(4); D.shot();
      k.act(me, "walk", S.at, 1.2, { to: 892 });
      N("口诀：", "先立核心名词，长修饰语往后挂。");
      P(k.roughRect(40, 118, 760, 48), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：先立核心名词，长修饰语往后挂。", 60, 150, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.4);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「戴眼镜的那个男孩是我哥哥」：先说哪个词？with glasses（戴眼镜的）挂在哪儿？先想 3 秒！");
      P(k.roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 戴眼镜的那个男孩是我哥哥。", 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      T("The boy ___ is my brother.  ( with glasses )", 64, 284, go(1), 1, { size: 22, color: C.ink, weight: 900, font: D.MONO });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "先说核心名词 The boy，with glasses 挂在 boy 后面。");
      const tRev = go(.3);
      T("The boy with glasses is my brother.", 64, 330, go(1), 1, { size: 22, color: C.green, weight: 900, font: D.MONO });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("The boy with glasses is my brother.", { zh: "戴眼镜的那个男孩是我哥哥。", word: "boy with glasses brother my is the" });
      D.hold(2);

      k.quoteCard({ insight: "英语先把核心名词说出来，\n长长的修饰语像挂件一样挂在后面", rhyme: "口诀：先立核心名词，长修饰语往后挂。", hlLines: 2, foot: "🌳 竹节句 vs 树干句 · 病句手术 ③" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "reading", act: "讲解员捧书读（read），与「The girl is reading a book」同步" },
    ],
    r2skip: ["vs", "Under the tree reading book in red dress", "the girl is my sister."],   // 病句（长定语压在前面）不读
    terms: [
      ["可信度徽章", "💡 竹子 / 大树、国王 / 挂件都是帮助记忆的比喻；✂️ 简化说法：「一句只有一个谓语动词」指没有 and 等连接词的简单句。"],
      ["定语", "修饰名词、说明「哪个、什么样的」的词语，比如「穿红裙子的」女孩。"],
      ["核心名词", "一堆修饰语中间，句子真正在说的那个人或东西，比如「女孩」(the girl)。"],
      ["后置", "把修饰语放到名词后面。中文定语在前，英语长的修饰语要后置：the girl in a red dress。"],
      ["介词短语", "介词 + 名词组成的短语，比如 in a red dress（穿着红裙子）、under the tree（在树下）。"],
      ["车头压塌", "比喻：把很长的修饰语堆在句子前面，像车头上压了一堆货，核心名词迟迟出不来。"]
    ]
  },
  // ───────── ④ 时空顺序颠倒病（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/bamboo_tree_classic.js（R1 零丢失）。原左（竹节句 + 病句）右（树干句）两半拆成两个镜头；树整体左移 300；紫色括号 / 波浪线改 V3（时间绿 · 地点蓝 · 病句红），树干 / 王冠保留道具色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一句的毛病：时间、地点都挤在动词前面，而且忘了用过去式。");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "竹节句 vs 树干句", sub: "病句手术 ④  时空顺序颠倒病", badges: ["💡", "✂️"], steps: ["① 竹节句", "② 时空颠倒", "③ 立主干", "④ 从小到大", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 竹节句 + 时空颠倒 ─────
      D.step(0); D.shot();
      k.head("汉语：竹节句", 40, 108, C.ink);
      N("竹节句：", "中文习惯先说时间、地点，最后才说做什么。");
      const z = k.zh("我们昨天早上八点在学校操场上做早操。", 40, 155, 24);
      k.bracket(z, 2, 7, "时间", C.green); k.bracket(z, 8, 13, "地点", C.blue); k.circle(z, 14);
      k.act(me, "point", S.at - .6, 1.2, { at: [z.cx(15), z.cy] });
      N("", "画成竹子：时间一节、地点一节、动作一节。");
      k.bamboo(["昨天早上八点", "在学校操场上", "做早操"], 212, 50, 449, 18);
      k.note("动作「做早操」排在最后", 40, 290);
      D.step(1);
      N("中式英语（Chinglish）：", "照着中文的顺序硬翻，时间地点全堆在 do 前面。");
      const m1 = k.mono("We yesterday morning 8 o'clock on school", 40, 340, 18);
      const m2 = k.mono("playground do morning exercises.", 40, 388, 18);
      k.squiggle(m1, "yesterday morning 8 o'clock on school", 0, C.red);
      k.redX(12, 320);
      k.act(me, "surprised", S.at - .3, 1); k.expr(me, "oops", S.at - .3, 1.4);
      sayAt("Chinglish puts the time first.", { zh: "中式英语把时间放在最前面。", word: "Chinglish" });
      N("过去式：", "表示已经发生的事，动词要变样：do 变成 did。昨天的事要用过去式。");
      k.strike(m2, "do"); k.above(m2, "do", 0, "did");
      N("", "英语要先说主干「谁做了什么」，时间和地点挂在后面。");
      k.note("英语：主干在前，时间地点挂后面！", 40, 422, { size: 17, color: C.red, weight: 900 });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 树干句：主干在前，地点、时间挂后 ─────
      D.step(2); D.shot();
      k.head("英语：树干句", 40, 108, C.green);
      N("树干句：", "先长出主干 We did morning exercises，再挂地点和时间。");
      k.tree({ cx: 420, gx0: 260, gx1: 610 });
      N("主干：", "We did morning exercises（我们做了早操）。did 是过去式的谓语动词。");
      k.sign("We did morning exercises", 415, 300, "did", { size: 18, crownTag: "过去式谓语王" });
      D.step(3);
      N("地点挂件：", "说「在哪儿」的部分，挂在主干后面：on the school playground。");
      k.chip("on the school playground", 186, 236, [392, 250], { size: 13, tag: "地点挂件" });
      const syEx = sayAt("On the school playground. Do morning exercises.", { zh: "在学校操场上。做早操。", word: "on school playground do exercises" });
      k.act(me, "jump", syEx.t + syEx.dur * .45, Math.max(1, syEx.dur * .55), { words: ["exercises"] });
      N("时间挂件：", "时间按「从小到大」排：先说几点 at 8 o'clock，再说哪天早上。");
      k.chip("at 8 o'clock", 256, 362, [392, 352], { color: C.green, tag: "小：几点" });
      k.chip("yesterday morning", 456, 362, [444, 352], { color: C.green, tag: "大：哪天早上" });
      sayAt("We did. Yesterday morning, at eight o'clock.", { zh: "我们做了。昨天早上，八点。", word: "we did yesterday morning at o'clock the" });
      k.act(me, "walk", S.at, 1, { to: 1010 });
      k.wait(1);
      N("", "连起来：主干在前，地点其次，时间从小到大挂最后！");
      k.final("We did morning exercises on the school playground at 8 o'clock yesterday morning.", "did", "我们昨天早上八点在学校操场上做早操。  主干在前，时间从小到大！");
      k.wait(.6);
      D.wipe();

      // ───── 口诀 ─────
      D.step(4); D.shot();
      k.act(me, "walk", S.at, 1.2, { to: 892 });
      N("口诀：", "先说谁做了什么，再挂地点，最后挂时间，时间从小到大。");
      P(k.roughRect(40, 118, 760, 48), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：先说谁做了什么，再挂地点，最后挂时间，时间从小到大。", 60, 150, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.4);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「我昨天下午三点在家看电视」：主干 I watched TV 之后，三个挂件怎么排？先想 3 秒！");
      P(k.roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 我昨天下午三点在家看电视。", 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      T("I watched TV + yesterday afternoon / at home / at 3 o'clock", 64, 284, go(1), 1, { size: 18, color: C.ink, weight: 900, font: D.MONO });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "先挂地点 at home，再挂时间：小的 at 3 o'clock 在前，大的 yesterday afternoon 在后。");
      const tRev = go(.3);
      T("I watched TV at home at 3 o'clock yesterday afternoon.", 64, 330, go(1), 1, { size: 19, color: C.green, weight: 900, font: D.MONO });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("I watched TV at home at three o'clock yesterday afternoon.", { zh: "我昨天下午三点在家看电视。", word: "I watched TV home afternoon" });
      D.hold(2);

      k.quoteCard({ insight: "英语先说「谁做了什么」，再挂地点，\n最后挂时间；几个时间一起来，从小到大排", rhyme: "口诀：先说谁做了什么，再挂地点，最后挂时间，时间从小到大。", hlLines: 2, foot: "🌳 竹节句 vs 树干句 · 病句手术 ④" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "exercises", act: "讲解员在读到「Do morning exercises」时跳起来做操（jump）" },
    ],
    r2skip: ["vs", "We yesterday morning", "o'clock on school", "playground do morning exercises."],   // 病句（时空顺序颠倒）不读
    terms: [
      ["可信度徽章", "💡 竹子 / 大树、国王 / 挂件都是帮助记忆的比喻；✂️ 简化说法：「一句只有一个谓语动词」指没有 and 等连接词的简单句。"],
      ["过去式", "表示已经发生的事，动词要变样，比如 do → did、go → went。句子里有 yesterday（昨天）就要用过去式。"],
      ["地点挂件（地点状语）", "说明「在哪儿」的部分，比如 on the school playground（在学校操场上），英语里挂在主干后面。"],
      ["时间挂件（时间状语）", "说明「什么时候」的部分，比如 at 8 o'clock、yesterday morning，一般挂在句子最后。"],
      ["从小到大", "几个时间（或地点）一起出现时，英语先说小的再说大的：at 8 o'clock（几点）→ yesterday morning（哪天早上）。"]
    ]
  },
  // ───────── ⑤ There be 双谓语病 ─────────
  {
    build(k) {
      const { C, N } = k;
      N("", "这一句的毛病：用错了「有」，又多出一个国王。");
      k.header("病句手术 ⑤  There be 双谓语病");
      k.leftHead();
      N("竹节句：", "中文一个「有」字，既能表示「拥有」，也能表示「某处存在某物」。");
      const z = k.zh("公园的湖面上有两只小黄鸭正在游泳。", 40, 155, 24);
      k.circle(z, 6); k.circle(z, 14, 15);
      N("", "画成竹子：「有」一节，「游泳」一节，两个动词平起平坐。");
      k.bamboo(["有 have?", "游泳 swim"]);
      k.note("中文：「有」+「在游泳」两个动作", 40, 272);
      N("中式英语（Chinglish）：", "照着中文硬翻：There have ... are swimming ...");
      const m1 = k.mono("There have two yellow ducks are swimming", 40, 330, 18);
      k.mono("on the lake in the park.", 40, 362, 18);
      k.redX(12, 310);
      N("There be 句型：", "表示「某处有某物」，要用 There is / There are，不能用 have（have 是「拥有」）。");
      k.strike(m1, "have"); k.above(m1, "have", 0, "are");
      N("", "后面又来一个 are，第二个国王！一山不容二虎，删掉它。");
      k.strike(m1, "are");
      k.note("国王只留一个，swimming 直接挂后面！", 40, 404, { size: 17, color: C.red, weight: 900 });
      k.rightHead();
      N("树干句：", "先长出主干 There are two yellow ducks，再挂上「正在游」和地点。");
      k.tree({});
      N("主干：", "There are two yellow ducks（有两只小黄鸭）。are 是唯一的谓语动词。");
      k.sign("There are two yellow ducks", 715, 300, "are", { size: 18 });
      N("现在分词（-ing）：", "动词加 -ing（swimming）表示「正在……」，直接挂在名词后面，不当谓语。");
      k.chip("swimming", 760, 212, [744, 236], { color: C.purple, tag: "-ing 挂件：正在游" });
      N("地点挂件：", "地点也从小到大：先说湖面 on the lake，再说公园 in the park。");
      k.chip("on the lake", 540, 362, [692, 352], { tag: "小：湖面" });
      k.chip("in the park", 760, 362, [744, 352], { tag: "大：公园" });
      N("", "连起来：一个国王 are，其余全挂后面！");
      k.final("There are two yellow ducks swimming on the lake in the park.", "are", "公园的湖面上有两只小黄鸭正在游泳。  There are 当国王，-ing 挂后面！");
      // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（病句不读，见 r2skip）
      k.say("There be. There is a duck. There are two ducks.", { zh: "There be 句型。有一只鸭子。有两只鸭子。", word: "there be is are two ducks" });
      k.say("Two yellow ducks are swimming. I can swim.", { zh: "两只小黄鸭在游泳。我会游泳。", word: "yellow swimming swim ing", blocks: ["ing"] });
      k.say("On the lake. In the park. I have a duck.", { zh: "在湖上。在公园里。我有一只鸭子。", word: "on the lake in park have" });
      k.say("Chinglish says there have.", { zh: "中式英语会说 there have。", word: "Chinglish" });
      N("口诀：", "「某处有」用 There is / are；国王只留一个，其余挂后面。");
    },
    r2skip: ["vs", "There have two yellow ducks are swimming", "There have ... are swimming ..."],   // 病句（there have + 双谓语）不读
    terms: [
      ["There be 句型", "表示「某处有某物」：There is（一个）/ There are（多个），比如 There are two ducks on the lake。"],
      ["have 和 There be", "have 是「某人拥有」：I have a dog。「某处存在」不能用 have，要用 There is / are。"],
      ["现在分词（-ing）", "动词加 -ing，比如 swimming，表示「正在……」。它可以挂在名词后面当挂件，不当谓语。"],
      ["一山不容二虎", "比喻：一句话只能有一个谓语国王。已经有 are 了，后面就不能再来一个 are。"]
    ]
  }
];
