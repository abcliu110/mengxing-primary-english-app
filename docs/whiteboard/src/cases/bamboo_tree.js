// ==================== 白板脚本：竹节句 vs 树干句 5 个病句手术 ====================
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
WB_LAB.bamboo_tree = [
  // ───────── ① 多动词连动病 ─────────
  {
    build(k) {
      const { C, N } = k;
      N("", "这节课：为什么中文顺着说的句子，照着翻成英语就错了？");
      k.header("病句手术 ①  多动词连动病");
      k.leftHead();
      N("竹节句：", "中文像一根竹子，一节接一节。几个动作按先后排成一串，不用连接词。");
      const z = k.zh("我明天想去图书馆看故事书。", 40, 155);
      N("动词：", "表示动作的词。这句话里有 3 个：想、去、看。");
      k.circle(z, 3); k.circle(z, 4); k.circle(z, 8);
      N("", "画成竹子：每个动词占一节，一样长，谁也不比谁重要。");
      k.bamboo(["想 want", "去 go", "看 read"]);
      k.note("三个动词一样高，平起平坐", 40, 272);
      N("中式英语（Chinglish）：", "照着中文一个词一个词硬翻出来的英语。");
      const m = k.mono("I tomorrow want go library read storybook.", 40, 322);
      N("", "错在哪？want、go、read 三个动词挤在一起，都想当老大。");
      k.squiggle(m, "go"); k.squiggle(m, "read"); k.redX(12, 302);
      N("谓语动词：", "句子里说「主语在做什么」的那个主要动词。英语一句话只能有一个。");
      k.note("英语一句话只能有 1 个谓语动词！", 40, 375, { size: 19, color: C.red, weight: 900 });
      k.rightHead();
      N("树干句：", "英语像一棵树。先长出主干（谁 + 做什么），别的内容像树枝挂上去。");
      k.tree({});
      N("主干：", "I want（我想要）。want 是这句唯一的谓语动词，所以戴上王冠。");
      k.sign("I want", 721, 300, "want");
      N("挂件（树枝）：", "挂在主干上的补充内容。go 前加 to，就不再抢谓语的位置。");
      k.chip("to go to the library", 492, 246, [698, 250], { tag: "挂件 1：去哪儿" });
      N("to + 动词：", "动词前加 to，表示「要去做的事」。read 变成 to read，说明去干什么。");
      k.chip("to read storybooks", 760, 212, [744, 236], { tag: "挂件 2：去干什么" });
      N("时间挂件：", "tomorrow 这类时间词，一般挂在英语句子的最后。");
      k.chip("tomorrow", 796, 358, [746, 350], { color: C.green, tag: "时间挂句尾" });
      N("", "连起来：主干 + 树枝 = 一句地道的英语！");
      k.final("I want to go to the library to read storybooks tomorrow.", "want", "我明天想去图书馆看故事书。  先立树干，再挂树枝！");
      N("口诀：", "先立树干，再挂树枝。一句话只留一个谓语动词当国王。");
    },
    terms: [
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
  // ───────── ② 双王相撞病 ─────────
  {
    build(k) {
      const { C, N } = k;
      N("", "这一句有两个毛病：两个国王抢一个王座，还有一个形容词没有国王。");
      k.header("病句手术 ②  双王相撞病");
      k.leftHead();
      N("竹节句：", "中文里「喜欢」是动作，「开心」是心情，都能直接当句子的核心。");
      const z = k.zh("我非常喜欢小狗，它们今天很开心。", 40, 155, 26);
      k.circle(z, 3, 4); k.circle(z, 13, 14);
      N("", "画成竹子：「喜欢」一节，「开心」一节。");
      k.bamboo(["喜欢 like", "开心 happy"]);
      k.note("中文里「开心」可以直接当谓语", 40, 272);
      N("中式英语（Chinglish）：", "照着中文硬翻：I am very like dogs, they very happy today.");
      const m1 = k.mono("I am very like dogs,", 40, 322);
      const m2 = k.mono("they very happy today.", 40, 372);
      k.redX(12, 302);
      N("双王相撞：", "am 和 like 都是动词，挤在同一个王座上打架。一句只能有一个国王！");
      k.miniCrown((m1.x0("am") + m1.x1("am")) / 2, m1.y - 22);
      k.miniCrown((m1.x0("like") + m1.x1("like")) / 2, m1.y - 22);
      k.bolt((m1.x0("very") + m1.x1("very")) / 2, m1.y - 50);
      k.strike(m1, "am");
      N("形容词：", "描述样子、心情的词，比如 happy。英语里它不能自己当谓语，要靠 are 搭桥。");
      k.caret(m2, "very", 0, "are");
      k.note("① 一句只能一个国王  ② 形容词要靠 are 搭桥", 40, 414, { size: 17, color: C.red, weight: 900 });
      k.rightHead();
      N("树干句：", "这句话说了两件事，英语就长两棵树，再用 and 连起来。");
      k.tree({ cx: 600, gx0: 500, gx1: 930, crownRx: 70, crownRy: 40, crownY: 172, trunkW: 44 });
      k.tree({ cx: 830, groundLine: false, crownRx: 70, crownRy: 40, crownY: 172, trunkW: 44 });
      N("主干 1：", "I like dogs（我喜欢小狗）。like 是这棵树的谓语动词。");
      k.sign("I like dogs", 600, 290, "like", { size: 20, crownTag: false });
      N("系动词：", "am / is / are，像一座桥，把主语和形容词连起来：They are happy。");
      k.sign("They are happy", 830, 290, "are", { size: 20, crownTag: false });
      N("程度挂件：", "very much（非常）修饰 like，挂在句子后面；very 修饰 happy。");
      k.chip("very much", 550, 354, [600, 326], { string: true, color: C.purple, tag: "程度：多喜欢", tagX: 548 });
      k.chip("very", 760, 354, [788, 326], { string: true, color: C.purple, tag: "多开心", tagX: 760 });
      N("时间挂件：", "today 挂在句尾。");
      k.chip("today", 846, 354, [872, 326], { string: true, color: C.green, tag: "时间", tagX: 856 });
      N("and：", "连接词，像一座桥把两个句子连起来。有了 and，一句话里才能有两个谓语。");
      k.P("M622,240 C660,256 770,256 808,240", k.go(.6), .6, { color: C.orange, w: 3 });
      k.chip("and", 692, 232, null, { color: C.orange });
      N("", "连起来：两棵树 + and = 一句地道的英语！");
      k.final("I like dogs very much, and they are very happy today.", ["like", "are"], "我非常喜欢小狗，它们今天很开心。  一件事一棵树，用 and 连起来！");
      N("口诀：", "一句只能一个国王；想要两个国王，先用 and 搭桥。");
    },
    terms: [
      ["双王相撞", "一句话里放了两个谓语动词抢「国王」的位置，比如 am like。英语里 am 和 like 只能留一个。"],
      ["形容词", "描述人或东西样子、心情的词，比如 happy（开心的）、big（大的）。英语里形容词不能自己当谓语。"],
      ["系动词", "am / is / are 这类「搭桥」的动词，把主语和形容词连起来：They are happy。"],
      ["程度副词", "说明「有多……」的词，比如 very（很）、very much（非常）。very much 修饰动词时放在句尾。"],
      ["and（连接词）", "把两个句子连成一句的桥。有了 and，一句话里才可以有两个谓语动词。"]
    ]
  },
  // ───────── ③ 长定语压塌车头病 ─────────
  {
    build(k) {
      const { C, N } = k;
      N("", "这一句的毛病：修饰语太长，把最重要的「女孩」压到了后面。");
      k.header("病句手术 ③  长定语压塌车头病");
      k.leftHead();
      N("竹节句：", "中文喜欢把所有修饰语都堆在名词前面，越堆越长。");
      const z = k.zh("在树下看书的那个穿红裙子的女孩是我姐姐。", 40, 155, 21);
      N("定语：", "修饰名词的词语，说明是「哪个、什么样的」，比如「穿红裙子的」。");
      k.bracket(z, 0, 12, "一长串定语");
      N("核心名词：", "句子真正在说的那个人或东西：女孩。");
      k.circle(z, 13, 14, C.green);
      k.bamboo(["在树下看书的", "穿红裙子的", "女孩"], 212, 50, 449, 18);
      k.note("中文：修饰语全压在「女孩」前面", 40, 290);
      N("中式英语（Chinglish）：", "照着中文的顺序硬翻，主语 the girl 被压到了最后。");
      const m1 = k.mono("Under the tree reading book in red dress", 40, 340, 18);
      const m2 = k.mono("the girl is my sister.", 40, 372, 18);
      k.squiggle(m1, "Under the tree reading book in red dress", 0, C.purple);
      k.underline(m2, "the girl", 0, C.green);
      k.redX(12, 320);
      N("", "英语要第一时间说出核心名词 The girl，修饰语挂在它后面。");
      k.note("英语：先立核心名词，修饰语挂后面！", 40, 414, { size: 17, color: C.red, weight: 900 });
      k.rightHead();
      N("树干句：", "先长出主干 The girl is my sister，再把修饰语挂上去。");
      k.tree({ gx0: 560 });
      N("主干：", "The girl is my sister（那个女孩是我姐姐）。is 是谓语动词。");
      const s = k.sign("The girl is my sister", 720, 300, "is", { size: 20, crownTag: "谓语王" });
      N("后置：", "修饰语放到名词后面，叫后置。英语里长的修饰语都挂在名词后面。");
      const gx = s.wordX("girl");
      k.chip("in a red dress", 520, 362, [gx, s.y + s.h], { string: true, tag: "穿着：挂在 girl 后", tagX: 522, tagY: 412 });
      N("介词短语：", "介词 + 名词，比如 in a red dress（穿红裙子）、under the tree（在树下）。");
      k.chip("under the tree", 680, 362, [gx, s.y + s.h], { string: true, tag: "位置：挂在 girl 后", tagX: 684, tagY: 412 });
      N("", "连起来：核心名词在前，修饰语挂后，句子就站稳了！");
      k.final("The girl in a red dress under the tree is my sister.", "is", "在树下看书的那个穿红裙子的女孩是我姐姐。  先说女孩，再挂修饰！");
      N("口诀：", "先立核心名词，长修饰语往后挂。");
    },
    terms: [
      ["定语", "修饰名词、说明「哪个、什么样的」的词语，比如「穿红裙子的」女孩。"],
      ["核心名词", "一堆修饰语中间，句子真正在说的那个人或东西，比如「女孩」(the girl)。"],
      ["后置", "把修饰语放到名词后面。中文定语在前，英语长的修饰语要后置：the girl in a red dress。"],
      ["介词短语", "介词 + 名词组成的短语，比如 in a red dress（穿着红裙子）、under the tree（在树下）。"],
      ["车头压塌", "比喻：把很长的修饰语堆在句子前面，像车头上压了一堆货，核心名词迟迟出不来。"]
    ]
  },
  // ───────── ④ 时空顺序颠倒病 ─────────
  {
    build(k) {
      const { C, N } = k;
      N("", "这一句的毛病：时间、地点都挤在动词前面，而且忘了用过去式。");
      k.header("病句手术 ④  时空顺序颠倒病");
      k.leftHead();
      N("竹节句：", "中文习惯先说时间、地点，最后才说做什么。");
      const z = k.zh("我们昨天早上八点在学校操场上做早操。", 40, 155, 24);
      k.bracket(z, 2, 7, "时间"); k.bracket(z, 8, 13, "地点"); k.circle(z, 14);
      N("", "画成竹子：时间一节、地点一节、动作一节。");
      k.bamboo(["昨天早上八点", "在学校操场上", "做早操"], 212, 50, 449, 18);
      k.note("动作「做早操」排在最后", 40, 290);
      N("中式英语（Chinglish）：", "照着中文的顺序硬翻，时间地点全堆在 do 前面。");
      const m1 = k.mono("We yesterday morning 8 o'clock on school", 40, 340, 18);
      const m2 = k.mono("playground do morning exercises.", 40, 388, 18);
      k.squiggle(m1, "yesterday morning 8 o'clock on school", 0, C.purple);
      k.redX(12, 320);
      N("过去式：", "表示已经发生的事，动词要变样：do 变成 did。昨天的事要用过去式。");
      k.strike(m2, "do"); k.above(m2, "do", 0, "did");
      N("", "英语要先说主干「谁做了什么」，时间和地点挂在后面。");
      k.note("英语：主干在前，时间地点挂后面！", 40, 422, { size: 17, color: C.red, weight: 900 });
      k.rightHead();
      N("树干句：", "先长出主干 We did morning exercises，再挂地点和时间。");
      k.tree({});
      N("主干：", "We did morning exercises（我们做了早操）。did 是过去式的谓语动词。");
      k.sign("We did morning exercises", 715, 300, "did", { size: 18, crownTag: "过去式谓语王" });
      N("地点挂件：", "说「在哪儿」的部分，挂在主干后面：on the school playground。");
      k.chip("on the school playground", 486, 236, [692, 250], { size: 13, tag: "地点挂件" });
      N("时间挂件：", "时间按「从小到大」排：先说几点 at 8 o'clock，再说哪天早上。");
      k.chip("at 8 o'clock", 556, 362, [692, 352], { color: C.green, tag: "小：几点" });
      k.chip("yesterday morning", 756, 362, [744, 352], { color: C.green, tag: "大：哪天早上" });
      N("", "连起来：主干在前，地点其次，时间从小到大挂最后！");
      k.final("We did morning exercises on the school playground at 8 o'clock yesterday morning.", "did", "我们昨天早上八点在学校操场上做早操。  主干在前，时间从小到大！");
      N("口诀：", "先说谁做了什么，再挂地点，最后挂时间，时间从小到大。");
    },
    terms: [
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
      N("口诀：", "「某处有」用 There is / are；国王只留一个，其余挂后面。");
    },
    terms: [
      ["There be 句型", "表示「某处有某物」：There is（一个）/ There are（多个），比如 There are two ducks on the lake。"],
      ["have 和 There be", "have 是「某人拥有」：I have a dog。「某处存在」不能用 have，要用 There is / are。"],
      ["现在分词（-ing）", "动词加 -ing，比如 swimming，表示「正在……」。它可以挂在名词后面当挂件，不当谓语。"],
      ["一山不容二虎", "比喻：一句话只能有一个谓语国王。已经有 are 了，后面就不能再来一个 are。"]
    ]
  }
];
