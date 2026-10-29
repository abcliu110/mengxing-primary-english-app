// ==================== 白板脚本：王炸④ 皇家形容词排座次（OSASCOMP）4 个真题专列 ====================
// 每个案例 = ADJ_ORDER_EXAMPLES 的一项。画一列火车：7 节车厢（ADJ_ORDER_CARRIAGES 的顺序）+ 名词终点站，
// 把形容词一个个送进对应车厢，空车厢打「—」，最后连成短语。辅助函数都包在 IIFE 里，避免和别的页签重名。
WB_LAB.adj_order = (function () {
  // 7 节车厢（与 ADJ_ORDER_CARRIAGES 同顺序）+ 第 8 格名词站
  const CARS = [
    { lab: "① 限定词", letter: "", col: "#475569", fill: "#f1f5f9" },
    { lab: "② 观点", letter: "O", col: "#db2777", fill: "#fce7f3" },
    { lab: "③ 大小", letter: "S", col: "#2563eb", fill: "#dbeafe" },
    { lab: "④ 新旧/形状", letter: "A·S", col: "#d97706", fill: "#fef3c7" },
    { lab: "⑤ 颜色", letter: "C", col: "#059669", fill: "#d1fae5" },
    { lab: "⑥ 国籍/来源", letter: "O", col: "#7c3aed", fill: "#ede9fe" },
    { lab: "⑦ 材质/用途", letter: "M·P", col: "#dc2626", fill: "#fee2e2" },
    { lab: "名词站", letter: "", col: "#059669", fill: "#bbf7d0" }
  ];
  const BX = 20, BW = 108, GAP = 8, BY = 236, BH = 70;
  const cx = i => BX + i * (BW + GAP) + BW / 2;
  const MONO = '"Courier New",Courier,monospace';

  // 开场：标题 + 中文短语 + 一袋打乱的形容词
  function intro(k, cfg) {
    const { C, N, T, go } = k;
    N("", cfg.open);
    k.header(cfg.sub, "形容词排座次", false);
    N("中文：", cfg.zhSay);
    const zs = Math.min(17, 900 / k.estW("中文：" + cfg.zh, 17) * 17);
    T("中文：" + cfg.zh, 24, 98, go(1.8), 1.8, { size: zs, color: C.ink });
    k.wait(.2);
    N("问题：", cfg.problem);
    T("这些形容词要排队上车：", 24, 140, go(.9), .9, { size: 17, color: C.grey });
    let x = 230;
    cfg.bag.forEach(w => {
      const fs = 16, cw = w.length * fs * .6 + 20;
      k.P(k.roughRect(x, 118, cw, 30), go(.25, 0), .25, { color: C.purple, w: 2 });
      k.F(k.rectD(x, 118, cw, 30), go(.15, 0), { color: "#ede9fe", op: .95 });
      T(w, x + cw / 2, 139, go(.3, .05), .3, { size: fs, color: C.purple, weight: 700, anchor: "middle", font: MONO });
      x += cw + 14;
    });
    T("谁先谁后？", x + 4, 140, go(.6), .6, { size: 17, color: C.red, weight: 900 });
    k.wait(.5);
  }

  // 原理：主观 → 客观 的箭头
  function principle(k, say) {
    const { C, N, T, go } = k;
    N("第一性原理：", say);
    T("主观：心里的感觉", 24, 192, go(.9), .9, { size: 17, color: "#db2777", weight: 900 });
    k.arrow(186, 186, 720, 186, C.orange, "越往右，越贴近东西本身，越紧挨名词", 453, 176);
    T("客观：东西本来的样子", 728, 192, go(1.0), 1.0, { size: 17, color: C.green, weight: 900 });
    k.wait(.5);
  }

  // 画第 i 节车厢（车厢 + 轮子 + 顶上字母 + 标签）
  function car(k, i) {
    const { T, P, F, go } = k, c = CARS[i], x = BX + i * (BW + GAP);
    if (i === 7) {
      // 名词站：站牌 + 小旗
      P(k.roughRect(x, BY, BW, BH), go(.5, 0), .5, { color: c.col, w: 3 });
      F(k.rectD(x, BY, BW, BH), go(.2, 0), { color: c.fill, op: .8 });
      const fx = x + BW - 14;
      P(k.wl(fx, BY, fx, BY - 34, .4), go(.25), .25, { color: k.C.ink, w: 2 });
      const fd = `M${fx},${BY - 34} l-22,7 l22,7 Z`;
      P(fd, go(.25, 0), .25, { color: k.C.red, w: 2 }); F(fd, go(.1), { color: "#fecaca", op: 1 });
    } else {
      P(k.roughRect(x, BY, BW, BH), go(.35, 0), .35, { color: c.col, w: 2.5 });
      F(k.rectD(x, BY, BW, BH), go(.2, 0), { color: c.fill, op: .8 });
      P(k.ellipse(x + 24, BY + BH + 7, 7, 7) + " " + k.ellipse(x + BW - 24, BY + BH + 7, 7, 7), go(.2, 0), .2, { color: k.C.ink, w: 2 });
      if (i > 0) P(k.wl(x - GAP - 2, BY + BH - 14, x + 2, BY + BH - 14, .3), go(.1, 0), .1, { color: k.C.ink, w: 3 });
      if (i === 0) { // 车头烟囱 + 一团烟
        P(k.roughRect(x + 12, BY - 18, 16, 18), go(.25, 0), .25, { color: c.col, w: 2 });
        P(k.cloud(x + 36, BY - 30, 14, 8, 5), go(.3, 0), .3, { color: "#94a3b8", w: 1.5 });
      }
    }
    if (c.letter) T(c.letter, cx(i), BY - 8, go(.3, .05), .3, { size: 20, color: c.col, weight: 900, anchor: "middle", font: MONO });
    T(c.lab, cx(i), BY + 20, go(.3, .05), .3, { size: 13, color: c.col, weight: 900, anchor: "middle" });
  }

  // 把单词送进第 i 节车厢；word 为 "—" 时画空位
  function seat(k, i, word, gloss) {
    const { T, go, C } = k;
    if (word === "—") { T("—", cx(i), BY + 50, go(.4), .4, { size: 24, color: "#94a3b8", weight: 900, anchor: "middle" }); return; }
    const fs = word.length > 8 ? 16 : 18, col = i === 7 ? C.green : CARS[i].col;
    T(word, cx(i), BY + 46, go(.4, .05), .4, { size: fs, color: col, weight: 900, anchor: "middle", font: MONO });
    if (gloss) T(gloss, cx(i), BY + 64, go(.25), .25, { size: 13, color: C.grey, anchor: "middle" });
  }

  // 主体：开场 → 原理 → 逐节上车 → 紧贴名词 → 为什么 → 结论
  function build(k, cfg) {
    const { C, N, T, go } = k;
    intro(k, cfg);
    principle(k, cfg.principle);
    N("", cfg.trainSay);
    for (let i = 0; i < 8; i++) {
      if (cfg.say[i]) N(cfg.say[i][0], cfg.say[i][1]);
      car(k, i);
      seat(k, i, cfg.words[i], cfg.gloss[i]);
      k.wait(cfg.say[i] ? (cfg.words[i] === "—" ? .9 : 1.3) : .1);
    }
    // 最后一个形容词紧贴名词：画一条绿色括号把它和名词站连起来
    const last = cfg.lastAdj, x1 = cx(last) - 30, x2 = cx(7) + 30, y = BY + BH + 22;
    N("紧贴名词：", cfg.hugSay);
    k.P(`M${x1},${y - 4} Q${x1},${y + 6} ${x1 + 10},${y + 6} L${x2 - 10},${y + 6} Q${x2},${y + 6} ${x2},${y - 4}`, go(.6), .6, { color: C.green, w: 3 });
    T("离本质最近 → 紧贴名词", (x1 + x2) / 2, y + 26, go(.8), .8, { size: 15, color: C.green, weight: 900, anchor: "middle" });
    k.wait(.5);
    N("为什么这样排？", cfg.whySay);
    const ws = Math.min(17, 912 / k.estW("💡 " + cfg.why, 17) * 17);
    T("💡 " + cfg.why, 24, 386, go(1.6), 1.6, { size: ws, color: C.ink, weight: 700 });
    T("空车厢「—」读的时候直接跳过", 24, 420, go(.9), .9, { size: 16, color: C.grey });
    k.wait(.6);
    N("", cfg.finalSay);
    k.final(cfg.en, [], cfg.finalZh);
    k.wait(.3);
    N("口诀：", "限观大形龄色国材 —— " + cfg.rhyme);
    k.wait(.4);
  }

  return [
    // ───────── ① 一张漂亮的小圆木桌 ─────────
    {
      build(k) {
        build(k, {
          sub: "真题专列 ①  一张漂亮的小圆木桌",
          open: "这节课：好几个形容词一起修饰一个名词时，英语里谁站前面、谁站后面？",
          zh: "一张 + 漂亮的(观点) + 小的(大小) + 圆的(形状) + 木头的(材质) + 桌子",
          zhSay: "先看中文：一张漂亮的小圆木桌。括号里写的是每个词属于哪一类。",
          problem: "形容词：描述样子、大小、颜色、感觉的词。这里有 4 个，英语里不能乱排。",
          bag: ["wooden", "nice", "round", "small"],
          principle: "越是「我觉得」的词站得越靠外，越是东西本来的样子越贴紧名词。",
          trainSay: "画一列火车：7 节车厢 + 名词终点站，形容词按车厢号上车。",
          words: ["a", "nice", "small", "round", "—", "—", "wooden", "table"],
          gloss: ["一张", "漂亮的", "小的", "圆的", "", "", "木头的", "桌子"],
          say: [
            ["限定词：", "a、two、that 这类词，先说「几个、哪一个」，永远坐车头。a 就是「一张」。"],
            ["O = Opinion 观点：", "nice 漂亮，是心里的感觉，每个人想法可能不一样，所以站最外面。"],
            ["S = Size 大小：", "small 小的，一眼就能看出的个头。"],
            ["A·S = Age 新旧 / Shape 形状：", "round 圆的，走近才看清的形状。这两样合坐一节车厢。"],
            ["C = Colour 颜色：", "这张桌子没说颜色，车厢空着，画一道「—」。"],
            ["O = Origin 来源：", "哪个国家、哪里来的？也没说，空着。"],
            ["M·P = Material 材质 / Purpose 用途：", "wooden 木头做的，是桌子本身是什么做的。"],
            ["名词：", "表示人或东西名字的词。table 桌子是终点站，所有形容词都为它服务。"]
          ],
          lastAdj: 6,
          hugSay: "wooden 是桌子的物理本质，离本质最近，所以必须紧贴 table。",
          why: "漂亮(nice)是主观感受放最外层；木头做的(wooden)是桌子的物理本质，必须紧贴 table！",
          whySay: "OSASCOMP 就是车厢顶上字母连起来，从主观的心到客观的东西排好队。",
          finalSay: "空车厢跳过，把乘客连起来，就是地道的英语短语！",
          en: "a nice small round wooden table",
          finalZh: "一张漂亮的小圆木桌。  主观在外，本质贴名词！",
          rhyme: "美小圆旧黄，法国木书房！"
        });
      },
      terms: [
        ["形容词", "描述人或东西样子、大小、颜色、感觉的词，比如 nice（漂亮的）、small（小的）、red（红色的）。"],
        ["名词", "表示人或东西名字的词，比如 table（桌子）、cat（猫）、coach（教练）。形容词都是为名词服务的。"],
        ["排座次", "比喻：好几个形容词一起修饰一个名词时，要像坐火车一样按车厢号排好先后顺序，不能乱坐。"],
        ["OSASCOMP", "形容词排队顺序的英文首字母缩写：Opinion 观点、Size 大小、Age 新旧、Shape 形状、Colour 颜色、Origin 来源、Material 材质、Purpose 用途。"],
        ["限定词（冠/数/指）", "放在最前面「锁定是哪个、有几个」的词：冠词 a / the、数词 two、指示词 this / that、物主代词 my。它们坐车头。"],
        ["冠词", "a / an / the，放在名词前，a 表示「一个、一张」。"],
        ["观点（Opinion）", "说话人心里的评价，比如 nice、cute、beautiful。每个人想法可能不同，所以排最外面。"],
        ["大小（Size）", "一眼看出的个头：big、small、tall、long。"],
        ["形状 / 新旧（Shape / Age）", "形状 round（圆的），新旧或年龄 new、old、young。这列火车里它们合坐一节车厢。"],
        ["颜色（Colour）", "东西表面的颜色：red、white、blue。"],
        ["来源 / 国籍（Origin）", "从哪个国家、哪里来：Chinese（中国的）、British（英国的）。"],
        ["材质 / 用途（Material / Purpose）", "材质是用什么做的：wooden、silk；用途是拿来做什么的：basketball（篮球的）。离东西本质最近，紧贴名词。"],
        ["主观", "「我觉得」：带着个人感觉的评价，比如漂亮、可爱。"],
        ["客观", "东西本来就是这样，谁看都一样，比如木头做的、红色的。"],
        ["第一性原理", "找到最根本的道理再推出规律。这里的根本道理是：越主观越靠外，越接近东西本质越贴紧名词。"]
      ]
    },
    // ───────── ② 两只可爱的小白猫 ─────────
    {
      build(k) {
        build(k, {
          sub: "真题专列 ②  两只可爱的小白猫",
          open: "第二列火车：两只可爱的小白猫，英语该怎么排？",
          zh: "两只 + 可爱的(观点) + 小的(大小) + 白色的(颜色) + 猫咪",
          zhSay: "中文：两只可爱的小白猫。有 3 个形容词：可爱的、小的、白色的。",
          problem: "white、cute、little 三个词，谁先上车、谁后上车？",
          bag: ["white", "cute", "little"],
          principle: "还是那条原理：「我觉得」的词靠外，东西本来的样子贴紧名词。",
          trainSay: "同样的 7 节车厢 + 名词站，按车厢号一个个上车。",
          words: ["two", "cute", "little", "—", "white", "—", "—", "cats"],
          gloss: ["两只", "可爱的", "小的", "", "白色的", "", "", "猫咪"],
          say: [
            ["数词：", "表示数量的词，比如 two（两）。它属于限定词，坐车头。"],
            ["观点：", "cute 可爱，是心里的感觉，先夸可爱，站最外面。"],
            ["大小：", "little 小小的，再看个头。"],
            ["", "新旧/形状车厢：没说是新是旧，空着。"],
            ["颜色：", "white 白色的，毛的颜色，谁看都一样。"],
            ["", "来源车厢、材质/用途车厢都没有乘客，空着。"],
            null,
            ["复数：", "两只以上要用复数，名词后加 -s：cat 变成 cats。"]
          ],
          lastAdj: 4,
          hugSay: "后面的车厢都空着，所以 white 就是离 cats 最近的那个。",
          why: "先夸可爱(cute)，再看个头小(little)，最后看毛色白(white)紧贴 cats！",
          whySay: "从心里的夸奖，到个头，再到毛色，一步步走近猫咪本身。",
          finalSay: "空车厢跳过，连起来读一遍！",
          en: "two cute little white cats",
          finalZh: "两只可爱的小白猫。  先夸可爱，再看大小，颜色贴名词！",
          rhyme: "美小圆旧黄，法国木书房！"
        });
      },
      terms: [
        ["数词", "表示数量的词，比如 one、two、three。它属于限定词，排在所有形容词前面。"],
        ["复数", "两个或更多时，名词要变成复数，一般在词尾加 -s，比如 cat → cats。"],
        ["little 和 small", "都表示「小」，都坐「大小」车厢。little 常带一点「小小的、可爱」的感觉。"]
      ]
    },
    // ───────── ③ 一件漂亮的崭新红色中国丝绸连衣裙 ─────────
    {
      build(k) {
        build(k, {
          sub: "真题专列 ③  一件漂亮的崭新红色中国丝绸连衣裙",
          open: "第三列火车最挤：5 个形容词一起上车，看谁坐哪一节！",
          zh: "一件 + 漂亮的(观点) + 新的(新旧) + 红色的(颜色) + 中国的(国籍) + 丝绸(材质) + 连衣裙",
          zhSay: "中文：一件漂亮的、崭新的红色中国丝绸连衣裙。",
          problem: "beautiful、new、red、Chinese、silk，5 个词怎么排才不乱？",
          bag: ["silk", "red", "beautiful", "Chinese", "new"],
          principle: "从主观到客观：先说「我觉得」，最后说「它是什么做的」。",
          trainSay: "按车厢号，一个个对号入座。",
          words: ["a", "beautiful", "—", "new", "red", "Chinese", "silk", "dress"],
          gloss: ["一件", "漂亮的", "", "新的", "红色的", "中国的", "丝绸", "连衣裙"],
          say: [
            ["", "a 一件，坐车头。"],
            ["观点：", "beautiful 漂亮，是心里的评价，站最外面。"],
            ["", "大小车厢：没说大小，空着。"],
            ["新旧：", "new 新的，是衣服的「年龄」，坐新旧/形状车厢。"],
            ["颜色：", "red 红色的。"],
            ["国籍：", "属于哪个国家。Chinese 中国的，表示裙子从哪里来。"],
            ["材质：", "silk 丝绸，裙子是用什么做的。silk 本来是名词，在这里修饰 dress。"],
            ["", "dress 连衣裙，终点站。"]
          ],
          lastAdj: 6,
          hugSay: "silk 丝绸就是裙子本身的料子，离本质最近，紧贴 dress。",
          why: "严格遵循「观点 ➔ 新旧 ➔ 颜色 ➔ 国籍 ➔ 材质 ➔ 名词」由主观到客观的顺序！",
          whySay: "观点、新旧、颜色、国籍、材质，一节一节从主观走到客观。",
          finalSay: "5 个形容词一个不乱，连起来读！",
          en: "a beautiful new red Chinese silk dress",
          finalZh: "一件漂亮的崭新红色中国丝绸连衣裙。  观点→新旧→颜色→国籍→材质",
          rhyme: "美小圆旧黄，法国木书房！"
        });
      },
      terms: [
        ["国籍", "属于哪个国家，比如 Chinese（中国的）、British（英国的）、American（美国的）。坐「来源」车厢。"],
        ["新旧（Age）", "东西新不新、人年龄大不大，比如 new（新的）、old（旧的）、young（年轻的）。"],
        ["名词当形容词用", "有些名词可以直接放在另一个名词前面修饰它，比如 silk dress（丝绸连衣裙），silk 坐「材质」车厢。"]
      ]
    },
    // ───────── ④ 那个高个子年轻的英国篮球教练 ─────────
    {
      build(k) {
        build(k, {
          sub: "真题专列 ④  那个高个子年轻的英国篮球教练",
          open: "最后一列火车：这次的名词是一个人——篮球教练！",
          zh: "那个 + 高个子的(大小) + 年轻的(年龄) + 英国的(国籍) + 篮球(用途) + 教练",
          zhSay: "中文：那个高个子、年轻的英国篮球教练。",
          problem: "tall、young、British、basketball，形容人也一样要排队！",
          bag: ["British", "young", "basketball", "tall"],
          principle: "原理不变：一眼看到的在外面，「他是干什么的」最贴近名词。",
          trainSay: "开车！按车厢号对号入座。",
          words: ["that", "—", "tall", "young", "—", "British", "basketball", "coach"],
          gloss: ["那个", "", "高个子的", "年轻的", "", "英国的", "篮球", "教练"],
          say: [
            ["指示词：", "this（这个）、that（那个），用来指出是哪一个。that 属于限定词，坐车头。"],
            ["", "观点车厢：这里没有夸他，空着。"],
            ["大小：", "tall 高个子，一眼就能看到的身高。"],
            ["年龄：", "young 年轻的，坐新旧/形状车厢。"],
            ["", "颜色车厢：空着。"],
            ["国籍：", "British 英国的，他从哪个国家来。"],
            ["用途：", "拿来做什么用。basketball 篮球，说明他是教什么的教练。"],
            ["", "coach 教练，终点站。"]
          ],
          lastAdj: 6,
          hugSay: "basketball 说明他是「篮球」教练，这是他的身份本质，紧贴 coach。",
          why: "身高(tall)在年龄(young)前，国籍(British)在专业用途(basketball)前！",
          whySay: "大小在年龄前；国籍在用途前。用途最贴名词。",
          finalSay: "空车厢跳过，连起来读一遍！",
          en: "that tall young British basketball coach",
          finalZh: "那个高个子年轻的英国篮球教练。  大小→年龄→国籍→用途",
          rhyme: "美小圆旧黄，法国木书房！"
        });
      },
      terms: [
        ["指示词", "指出「是哪一个」的词：this（这个）、that（那个）、these、those。属于限定词，坐车头。"],
        ["用途（Purpose）", "东西或人是做什么用的，比如 basketball coach（教篮球的教练）、sports shoes（运动鞋）。紧贴名词。"],
        ["年龄", "人年轻还是年老：young（年轻的）、old（老的），和「新旧」坐同一节车厢。"]
      ]
    }
  ];
})();
