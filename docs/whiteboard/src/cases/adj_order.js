// ==================== 白板脚本：王炸④ 皇家形容词排座次（OSASCOMP）4 个真题专列 ====================
// 每个案例 = ADJ_ORDER_EXAMPLES 的一项。画一列火车：7 节车厢（ADJ_ORDER_CARRIAGES 的顺序）+ 名词终点站，
// 把形容词一个个送进对应车厢，空车厢打「—」，最后连成短语。辅助函数都包在 IIFE 里，避免和别的页签重名。
// v2 升级（2026-10-30，决策 24）：4 个案例共用一个 build，一次升引擎 v2 + 讲解员：
// 镜头 1 中文 + 一袋形容词 + 主观 → 客观箭头 / 镜头 2 火车（车厢收窄到 x≤800）+ 逐个上车（词从车厢上方落进座位）+ 紧贴名词 + 为什么 + 结论框 → 🔮 预测 → 金句卡。
// 升级前整份文件原样保存在 cases/adj_order_classic.js。依赖 wo_props。
// 配色只用 V3 k.PAL：主观（观点车厢）红 → 中间车厢蓝 → 客观（材质 / 用途车厢、名词站）绿，限定词灰，和「主观 → 客观」箭头同色；旧粉 / 橙 / 紫 / 琥珀都改 V3。
WB_LAB.adj_order = (function () {
  // 旧 7 节车厢配色（与 ADJ_ORDER_CARRIAGES 同顺序，只留作 R1 对照）："#475569" "#db2777" "#2563eb" "#d97706" "#059669" "#7c3aed" "#dc2626"
  const BX = 20, BW = 88, GAP = 6, BY = 150, BH = 66;
  const cx = i => BX + i * (BW + GAP) + BW / 2;
  const BADGE_TERM = ["可信度徽章", "💡 火车、车厢、排座次、口诀都是帮助记忆的比喻；✂️ 简化说法：OSASCOMP 是常见的排列习惯，不是死规定，「新旧」和「形状」在这里合坐一节车厢，真实英语里偶尔也能换顺序。"];

  function cars(C) {
    const L = { col: C.grey, fill: C.tintInk }, R = { col: C.red, fill: C.tintRed }, B = { col: C.blue, fill: C.tintBlue }, G = { col: C.green, fill: C.tintGreen };
    return [
      { lab: "① 限定词", letter: "", ...L },
      { lab: "② 观点", letter: "O", ...R },
      { lab: "③ 大小", letter: "S", ...B },
      { lab: "④ 新旧/形状", letter: "A·S", ...B },
      { lab: "⑤ 颜色", letter: "C", ...B },
      { lab: "⑥ 国籍/来源", letter: "O", ...B },
      { lab: "⑦ 材质/用途", letter: "M·P", ...G },
      { lab: "名词站", letter: "", col: C.green, fill: C.hlGreen }
    ];
  }

  function build(k, cfg) {
    k.v2();
    const { N, T, P, F, go, estW } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, MONO = D.MONO, CARS = cars(C);
    const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
    const fit = (text, max, room) => Math.min(max, room / Math.max(1, estW(text, 1)));
    const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
    N("", cfg.open);
    k.act(me, "walk", .3, 1.6, { to: 892 });
    k.act(me, "wave", 2.0, 1.8);
    D.scene({ title: cfg.sub.replace(/^真题专列\s*/, ""), sub: "真题专列 · 形容词排座次", badges: ["💡", "✂️"], steps: ["① 中文", "② 原理", "③ 上车", "④ 连读", "🔮 预测"], cardDur: 3.6 });

    // ───── 镜头 1 · 中文 + 一袋形容词 + 主观 → 客观 ─────
    D.step(0); D.shot();
    N("中文：", cfg.zhSay);
    const zl = "中文：" + cfg.zh;
    T(zl, 24, 140, go(1.8), 1.8, { size: fit(zl, 17, 770), color: C.ink });
    k.wait(.2);
    N("问题：", cfg.problem);
    T("这些形容词要排队上车：", 24, 196, go(.9), .9, { size: 17, color: C.grey });
    let x = 230;
    cfg.bag.forEach(w => {
      const fs = 16, cw = w.length * fs * .6 + 20;
      P(k.roughRect(x, 174, cw, 30), go(.25, 0), .25, { color: C.blue, w: 2 });
      F(k.rectD(x, 174, cw, 30), go(.15, 0), { color: C.tintBlue, op: .95 });
      T(w, x + cw / 2, 195, go(.3, .05), .3, { size: fs, color: C.blue, weight: 700, anchor: "middle", font: MONO });
      x += cw + 14;
    });
    T("谁先谁后？", x + 4, 196, go(.6), .6, { size: 17, color: C.red, weight: 900 });
    k.act(me, "think", S.at - .6, 2);
    k.wait(.5);
    D.step(1);
    N("第一性原理：", cfg.principle);
    T("主观：心里的感觉", 24, 276, go(.9), .9, { size: 17, color: C.red, weight: 900 });
    k.arrow(186, 270, 596, 270, C.blue, "越往右，越贴近东西本身，越紧挨名词", 391, 254);
    T("客观：东西本来的样子", 606, 276, go(1.0), 1.0, { size: 17, color: C.green, weight: 900 });
    // 小图：左边一颗心（我觉得），右边一块木头方块（东西本身）
    const heart = "M100,330 C100,316 78,312 78,328 C78,342 100,352 100,360 C100,352 122,342 122,328 C122,312 100,316 100,330 Z";
    P(heart, go(.5), .5, { color: C.red, w: 2.5 }); F(heart, go(.1, 0), { color: C.tintRed, op: 1 });
    P(k.roughRect(660, 312, 50, 46), go(.5), .5, { color: C.green, w: 2.5 }); F(k.rectD(660, 312, 50, 46), go(.1, 0), { color: C.tintGreen, op: 1 });
    k.act(me, "point", S.at - 1.2, 1.2, { at: [606, 270] });
    k.wait(.6);
    D.wipe();

    // ───── 镜头 2 · 火车 + 逐个上车 + 紧贴名词 + 为什么 + 结论 ─────
    D.step(2); D.shot();
    N("", cfg.trainSay);
    const car = (i) => {
      const c = CARS[i], x0 = BX + i * (BW + GAP);
      if (i === 7) {
        P(k.roughRect(x0, BY, BW, BH), go(.5, 0), .5, { color: c.col, w: 3 });
        F(k.rectD(x0, BY, BW, BH), go(.2, 0), { color: c.fill, op: .6 });
        const fx = x0 + BW - 12;
        P(k.wl(fx, BY, fx, BY - 34, .4), go(.25), .25, { color: C.ink, w: 2 });
        const fd = `M${fx},${BY - 34} l-22,7 l22,7 Z`;
        P(fd, go(.25, 0), .25, { color: C.red, w: 2 }); F(fd, go(.1), { color: C.tintRed, op: 1 });
      } else {
        P(k.roughRect(x0, BY, BW, BH), go(.35, 0), .35, { color: c.col, w: 2.5 });
        F(k.rectD(x0, BY, BW, BH), go(.2, 0), { color: c.fill, op: .8 });
        P(k.ellipse(x0 + 20, BY + BH + 7, 7, 7) + " " + k.ellipse(x0 + BW - 20, BY + BH + 7, 7, 7), go(.2, 0), .2, { color: C.ink, w: 2 });
        if (i > 0) P(k.wl(x0 - GAP - 2, BY + BH - 14, x0 + 2, BY + BH - 14, .3), go(.1, 0), .1, { color: C.ink, w: 3 });
        if (i === 0) {   // 车头烟囱 + 一团烟（烟单独一组，开车时冒烟）
          P(k.roughRect(x0 + 10, BY - 18, 16, 18), go(.25, 0), .25, { color: c.col, w: 2 });
        }
      }
      if (c.letter) T(c.letter, cx(i), BY - 8, go(.3, .05), .3, { size: 20, color: c.col, weight: 900, anchor: "middle", font: MONO });
      T(c.lab, cx(i), BY + 20, go(.3, .05), .3, { size: fit(c.lab, 13, BW - 6), color: c.col, weight: 900, anchor: "middle" });
    };
    // 上车：词先在车厢上方出现，再落进座位（squash 一下）
    const seat = (i, word, gloss) => {
      if (word === "—") { T("—", cx(i), BY + 50, go(.4), .4, { size: 24, color: C.grey, weight: 900, anchor: "middle" }); return; }
      const fs = Math.min(18, (BW - 8) / (word.length * .6)), col = i === 7 ? C.green : CARS[i].col;
      const g = D.sub(); k.hide(g);
      T(word, cx(i), BY + 46, go(.05, 0), .05, { size: fs, color: col, weight: 900, anchor: "middle", font: MONO });
      D.back();
      const t = go(.5);
      k.fade(g, t, .2, 1); k.move(g, t - .01, .01, 0, -44); k.move(g, t, .45, 0, 44, { ease: "move" }); k.squash(g, t + .42, .3, .2);
      if (gloss) T(gloss, cx(i), BY + 64, go(.25), .25, { size: 13, color: C.grey, anchor: "middle" });
    };
    const smoke = D.sub(); k.hide(smoke);
    P(k.cloud(BX + 34, BY - 30, 14, 8, 5), go(.05, 0), .05, { color: C.grey, w: 1.5 });
    D.back();
    for (let i = 0; i < 8; i++) {
      if (cfg.say[i]) N(cfg.say[i][0], cfg.say[i][1]);
      car(i);
      if (i === 0) { const ts = S.at; k.fade(smoke, ts, .3, 1); k.move(smoke, ts, 2.4, 6, -14, { ease: "move" }); }
      seat(i, cfg.words[i], cfg.gloss[i]);
      if (cfg.words[i] !== "—" && i > 0 && i < 7) k.look(me, cx(i), BY + 40, S.at - .6, .8);
      k.wait(cfg.say[i] ? (cfg.words[i] === "—" ? .9 : 1.3) : .1);
    }
    // 最后一个形容词紧贴名词：绿色括号把它和名词站连起来
    const last = cfg.lastAdj, x1 = cx(last) - 30, x2 = cx(7) + 30, y = BY + BH + 22;
    N("紧贴名词：", cfg.hugSay);
    P(`M${x1},${y - 4} Q${x1},${y + 6} ${x1 + 10},${y + 6} L${x2 - 10},${y + 6} Q${x2},${y + 6} ${x2},${y - 4}`, go(.6), .6, { color: C.green, w: 3 });
    T("离本质最近 → 紧贴名词", Math.min((x1 + x2) / 2, 700), y + 26, go(.8), .8, { size: 15, color: C.green, weight: 900, anchor: "middle" });
    k.act(me, "point", S.at - 1, 1.2, { at: [(x1 + x2) / 2, y] });
    k.wait(.5);
    D.step(3);
    N("为什么这样排？", cfg.whySay);
    const wl = "💡 " + cfg.why;
    T(wl, 24, 330, go(1.6), 1.6, { size: fit(wl, 17, 770), color: C.ink, weight: 700 });
    T("空车厢「—」读的时候直接跳过", 24, 364, go(.9), .9, { size: 16, color: C.grey });
    k.wait(.6);
    N("", cfg.finalSay);
    // 结论框（代替旧 k.final：宽度收在 x≤800）
    const en = cfg.en, fsz = Math.min(22, 740 / (en.length * .6)), bw = Math.min(784, Math.max(380, en.length * fsz * .6 + 48));
    P(k.roughRect(16, 448, bw, 48), go(.9), .9, { color: C.green, w: 2 });
    F(k.rectD(16, 448, bw, 48), go(.2, 0), { color: C.tintGreen, op: .55 });
    T(en, 40, 479, go(Math.max(1.6, en.length * .04)), Math.max(1.6, en.length * .04), { size: fsz, color: C.green, weight: 900, font: MONO });
    T(cfg.finalZh, 40, 524, go(1.4), 1.4, { size: fit(cfg.finalZh, 17, 760), color: C.grey });
    const syF = sayAt(cfg.sayEn, { zh: cfg.sayZh, word: cfg.en });
    k.act(me, "cheer", syF.t + syF.dur * .6, 1.3);
    (cfg.extraSays || []).forEach(([en, zh, word, egg]) => k.say(en, { zh, word, egg: egg || [] }));   // R2 补朗读（2026-10-29：字幕里出现的英文词单读 + 例句）
    k.wait(.3);
    N("口诀：", "限观大形龄色国材 —— " + cfg.rhyme);
    k.wait(.4);
    D.wipe();

    // ───── 🔮 预测 ─────
    const q = cfg.quiz;
    D.step(4); D.shot();
    N("预测：", q.ask);
    P(k.roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
    F(k.rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
    T("🔮 " + q.zh, 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
    T(q.line, 64, 286, go(1), 1, { size: Math.min(21, 720 / (q.line.length * .6)), color: C.ink, weight: 900, font: MONO });
    k.act(me, "think", S.at, 3.1);
    D.hold(3);
    N("揭晓：", q.why);
    const tRev = go(.3);
    T(q.ans, 64, 330, go(1), 1, { size: Math.min(22, 720 / (q.ans.length * .6)), color: C.green, weight: 900, font: MONO });
    k.sfx("ding", tRev + .9);
    const ok = k.prop("card", 0, 0, { text: "✔", hidden: true });
    const syQ = sayAt(q.ansSay, { zh: q.ansZh, word: q.word });
    k.act(me, "holdCard", syQ.t + syQ.wd, Math.max(1.4, syQ.dur - syQ.wd + .3), { prop: ok });
    k.act(me, "cheer", syQ.t + syQ.dur + .4, 1.2);
    D.hold(1.4);

    k.quoteCard({ insight: "形容词排队，从「我觉得」走到「它本来是」：\n越主观越靠外，越接近本质越贴紧名词", rhyme: "口诀：限观大形龄色国材 ——\n" + cfg.rhyme, hlLines: 2, foot: "🚂 形容词排座次 · " + cfg.sub.replace(/^真题专列\s*/, "") });
    k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
    D.hold(2);
    D.finish(.45);
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
          sayEn: "Mom bought a nice small round wooden table.", sayZh: "妈妈买了一张漂亮的小圆木桌。",
          extraSays: [["Opinion, size, age, shape, colour, origin, material, purpose.", "观点、大小、新旧、形状、颜色、来源、材质、用途。", "opinion size age shape colour origin material purpose", ["opinion", "origin", "material", "purpose"]],
            ["OSASCOMP helps me remember the order.", "OSASCOMP 帮我记住顺序。", "OSASCOMP", ["OSASCOMP"]],
            ["I have two pens. That pen is red.", "我有两支笔。那支笔是红的。", "two that"]],
          finalZh: "一张漂亮的小圆木桌。  主观在外，本质贴名词！",
          rhyme: "美小圆旧黄，法国木书房！",
          quiz: {"zh": "一个漂亮的大红气球", "ask": "「一个漂亮的大红气球」：nice、big、red 谁坐前面？先想 3 秒！", "line": "→  a ___ balloon  ( red big nice / nice big red )", "why": "观点 nice → 大小 big → 颜色 red：a nice big red balloon.", "ans": "a nice big red balloon", "ansSay": "I have a nice big red balloon.", "ansZh": "我有一个漂亮的大红气球。", "word": "balloon nice big red"}
        });
      },
      actionWords: [],   // 例句只有 bought / have / wears / is（买、有、穿、是），没有走跑跳拿放类肢体动作，按 bamboo_tree ② 先例留空；上车用「词落进车厢」的场景动画表现
      r2skip: ["red big nice", "yellow little cute", "sports white new", "Chinese young friendly"],   // 预测题里排错的选项（不读）
      terms: [
        BADGE_TERM,
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
          sayEn: "I have two cute little white cats.", sayZh: "我有两只可爱的小白猫。",
          extraSays: [["I have a cat.", "我有一只猫。", "cat"]],
          finalZh: "两只可爱的小白猫。  先夸可爱，再看大小，颜色贴名词！",
          rhyme: "美小圆旧黄，法国木书房！",
          quiz: {"zh": "三只可爱的小黄鸭", "ask": "「三只可爱的小黄鸭」：yellow、little、cute 怎么排？先想 3 秒！", "line": "→  three ___ ducks  ( yellow little cute / cute little yellow )", "why": "先夸可爱，再看大小，颜色贴名词：three cute little yellow ducks.", "ans": "three cute little yellow ducks", "ansSay": "Look at the three cute little yellow ducks.", "ansZh": "看那三只可爱的小黄鸭。", "word": "three cute little yellow ducks"}
        });
      },
      actionWords: [],   // 例句只有 bought / have / wears / is（买、有、穿、是），没有走跑跳拿放类肢体动作，按 bamboo_tree ② 先例留空；上车用「词落进车厢」的场景动画表现
      r2skip: ["red big nice", "yellow little cute", "sports white new", "Chinese young friendly"],   // 预测题里排错的选项（不读）
      terms: [
        BADGE_TERM,
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
          sayEn: "She wears a beautiful new red Chinese silk dress.", sayZh: "她穿着一件漂亮的崭新红色中国丝绸连衣裙。",
          finalZh: "一件漂亮的崭新红色中国丝绸连衣裙。  观点→新旧→颜色→国籍→材质",
          rhyme: "美小圆旧黄，法国木书房！",
          quiz: {"zh": "一双崭新的白色运动鞋", "ask": "「一双崭新的白色运动鞋」：new、white、sports 怎么排？先想 3 秒！", "line": "→  a pair of ___ shoes  ( sports white new / new white sports )", "why": "新旧 new → 颜色 white → 用途 sports 紧贴名词：a pair of new white sports shoes.", "ans": "a pair of new white sports shoes", "ansSay": "I want a pair of new white sports shoes.", "ansZh": "我想要一双崭新的白色运动鞋。", "word": "pair of new white sports shoes"}
        });
      },
      actionWords: [],   // 例句只有 bought / have / wears / is（买、有、穿、是），没有走跑跳拿放类肢体动作，按 bamboo_tree ② 先例留空；上车用「词落进车厢」的场景动画表现
      r2skip: ["red big nice", "yellow little cute", "sports white new", "Chinese young friendly"],   // 预测题里排错的选项（不读）
      terms: [
        BADGE_TERM,
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
          sayEn: "That tall young British basketball coach is my uncle.", sayZh: "那个高个子年轻的英国篮球教练是我叔叔。",
          extraSays: [["This is my uncle.", "这是我叔叔。", "this"]],
          finalZh: "那个高个子年轻的英国篮球教练。  大小→年龄→国籍→用途",
          rhyme: "美小圆旧黄，法国木书房！",
          quiz: {"zh": "一位友好的年轻中国老师", "ask": "「一位友好的年轻中国老师」：Chinese、young、friendly 怎么排？先想 3 秒！", "line": "→  a ___ teacher  ( Chinese young friendly / friendly young Chinese )", "why": "观点 friendly → 年龄 young → 国籍 Chinese：a friendly young Chinese teacher.", "ans": "a friendly young Chinese teacher", "ansSay": "She is a friendly young Chinese teacher.", "ansZh": "她是一位友好的年轻中国老师。", "word": "a friendly young Chinese teacher"}
        });
      },
      actionWords: [],   // 例句只有 bought / have / wears / is（买、有、穿、是），没有走跑跳拿放类肢体动作，按 bamboo_tree ② 先例留空；上车用「词落进车厢」的场景动画表现
      r2skip: ["red big nice", "yellow little cute", "sports white new", "Chinese young friendly"],   // 预测题里排错的选项（不读）
      terms: [
        BADGE_TERM,
        ["指示词", "指出「是哪一个」的词：this（这个）、that（那个）、these、those。属于限定词，坐车头。"],
        ["用途（Purpose）", "东西或人是做什么用的，比如 basketball coach（教篮球的教练）、sports shoes（运动鞋）。紧贴名词。"],
        ["年龄", "人年轻还是年老：young（年轻的）、old（老的），和「新旧」坐同一节车厢。"]
      ]
    }
  ];
})();
