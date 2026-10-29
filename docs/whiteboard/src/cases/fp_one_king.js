// ==================== 第一性原理 ④ 一山不容二虎单核谓语律（fp_one_king）====================
// 4 幕 = FIRST_PRINCIPLES_DB[3].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
// v2 升级（2026-10-30 起，决策 24）：第 2–4 幕已升引擎 v2 + 讲解员（第 1 幕是搬到 ze_be 的占位幕，不升级）；升级前整份文件原样保存在 cases/fp_one_king_classic.js。依赖 wo_props + fp_props。
WB_LAB.fp_one_king = [
  // ───────── 4-1 为什么不能说 I am like apples？─────────
  {
    // 2026-10-30：本幕已零丢失整幕搬到中英对照总枢 ze_be（清单 docs/whiteboard/zh_en_hub/INVENTORY_*.md，原内容见 cases/ze_be.js）。
    // 原理页这一幕显示「一句话 + 跳转」卡片（act.movedTo → fpMovedHtml），这里只留占位白板，保证幕序号不变；terms 是本原理全部幕共用的术语，保留。
    movedTo: "ze_be",
    build(k) {
      const { C, N, T, go } = k;
      N("", "这一幕已经搬到「🔀 中英对照总枢 · 「是」≠ be」。");
      T("这一幕已搬到 🔀 中英对照总枢 · 「是」≠ be", 40, 120, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      T("一个句子只有一个国王：要么状态王，要么动作王。", 40, 170, go(1.2), 1.2, { size: 16, color: C.grey, weight: 700 });
      k.say("Be. I am happy.", { zh: "be 动词。我很开心。", word: "be" });
      k.wait(1);
    },
    terms: [
      ["谓语动词", "句子里说「做什么 / 是什么」的动词，是句子的核心（国王）。一个简单句只能有一个。"],
      ["be 动词", "am / is / are（过去 was / were），意思是「是、在」，表示状态。"],
      ["实义动词", "表示真正动作或心理活动的动词：like、play、eat、want……"],
      ["形容词", "描述样子、心情、性质的词：happy、tall、big。不是动词，不能自己当谓语。"],
      ["主语", "句子里「谁 / 什么」做这件事，比如 I like apples 里的 I。"],
      ["助动词", "帮忙变疑问句、否定句的「侍卫」：do / does / did，还有 can、will 等。"],
    ],
  },
];
WB_LAB.fp_one_king.push(
  // ───────── 4-2 第二个动词出场：穿马甲（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_one_king_classic.js（R1 零丢失）。原左（王座 + to 马甲）右（doing 马甲）两半拆成两个镜头；橙 / 紫改 V3（to 蓝 · doing 绿），王座 / 王冠保留道具金色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：王座上已经有国王了，第二个动词怎么办？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "第二个动词：穿马甲", sub: "④ 一山不容二虎单核谓语律", badges: ["💡", "✂️"], steps: ["① 抢王座", "② to 马甲", "③ doing 马甲", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 王座只坐一个 ─────
      D.step(0); D.shot();
      k.mono("I want go home.", 40, 132, 26, C.red, 900);
      k.redX(300, 108);
      FP.throne(150, 300);
      const kw = FP.king("want", 150, 250, C.red); D.adopt(kw); D.back();
      N("", "want 已经坐在王座上了，go 没有位置坐。");
      const gg = FP.king("go", 360, 250, C.ink, false); D.adopt(gg); D.back();
      const tb = go(1); k.buzz(gg, tb, 1, 2.5);
      k.act(me, "surprised", tb, 1); k.expr(me, "oops", tb, 1.3);
      D.step(1);
      N("不定式 to do：", "to + 动词原形。to 像一个指向将来的箭头 → 想做、打算做的事。");
      const vest = D.sub();
      const vd = "M288,232 h46 l12,18 l-12,18 h-46 Z";
      P(vd, go(.01, 0), .01, { color: C.blue, w: 2.5 }); F(vd, go(.01, 0), { color: C.tintBlue, op: 1 });
      T("to", 312, 257, go(.01, 0), .01, { size: 20, color: C.blue, weight: 900, font: M, anchor: "middle" });
      D.back(); k.hide(vest);
      const tv = go(.7); k.fade(vest, tv, .7, 1); k.squash(vest, tv + .7, .3, .15, { cx: 312, cy: 250 }); k.sfx("pop", tv + .7);
      T("随从穿上 to 马甲", 350, 300, go(.6), .6, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      k.hlText("I want to go home.", 40, 408, 24, { mono: true });
      T("I want to go home.", 40, 408, go(1), 1, { size: 24, color: C.green, weight: 900, font: M });
      T("want to go · plan to visit · hope to see", 40, 438, go(1.2), 1.2, { size: 15, color: C.blue, weight: 700, font: M });
      k.wait(.6);
      const syGo = sayAt("I want to go home.", { zh: "我想回家。", word: "to go" });
      k.act(me, "walk", syGo.t, Math.max(1.2, syGo.dur), { to: 820, words: ["go"] });
      k.act(me, "walk", syGo.t + Math.max(1.2, syGo.dur) + .2, 1, { to: 892 });
      sayAt("Want to go. Plan to visit. Hope to see.", { zh: "想去。打算拜访。希望见到。", word: "want plan visit hope see want to go plan to visit hope to see" });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 马甲 2：doing ─────
      D.step(2); D.shot();
      N("动名词 doing：", "动词加 -ing。表示正在做，或者享受做这件事的过程。");
      k.head("马甲 2：doing", 60, 132, C.green, "start", 22);
      const lp = D.sub();
      const loop = "M110,190 a26,22 0 1,1 -2,-1";
      P(loop, go(.8), .8, { color: C.green, w: 3 });
      P("M106,180 l4,10 l-10,2", go(.3), .3, { color: C.green, w: 3 });
      D.back();
      k.rot(lp, go(1.2), 1.2, 360, 108, 190);
      T("一直在进行", 150, 196, go(.5), .5, { size: 16, color: C.green, weight: 900 });
      D.step(3);
      T("I enjoy reading.", 60, 256, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      T("享受读书的过程", 60, 282, go(.5), .5, { size: 14, color: C.grey });
      T("She is swimming.", 60, 326, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      T("is 是国王，swimming 穿 -ing 马甲：正在游", 60, 352, go(.9), .9, { size: 14, color: C.grey });
      T("finish doing · good at drawing", 60, 392, go(1), 1, { size: 15, color: C.green, weight: 700, font: M });
      const syRd = sayAt("I enjoy reading. She is swimming.", { zh: "我喜欢读书。她正在游泳。", word: "reading" });
      const bk = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", syRd.t, Math.max(1.4, syRd.dur * .5), { prop: bk, words: ["reading"] });
      sayAt("I want to go home. I hope to see you.", { zh: "我想回家。我希望见到你。", word: "I home" });
      sayAt("Enjoy, finish. She is swimming.", { zh: "享受、完成。她正在游泳。", word: "enjoy finish She is swimming" });
      sayAt("Finish doing. Good at drawing.", { zh: "做完。擅长画画。", word: "doing good at drawing good at drawing ing", blocks: ["ing"] });
      N("", "还有第三件马甲 done（表示被做、已完成），以后再学。");
      T("第 3 件马甲 done：以后学", 60, 424, go(.8), .8, { size: 14, color: C.grey });
      sayAt("Do, doing, done. I have done my homework.", { zh: "做、正在做、做完了。我做完作业了。", word: "do done" });
      k.act(me, "cheer", S.at - 1, 1);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "想做穿 to，在做穿 -ing。");
      P(k.roughRect(40, 446, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：想做穿 to，在做穿 -ing。", 60, 476, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "hope 已经是国王了，see 要穿哪件马甲？「希望」是想做的事。先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 I hope ___ see you.　→　穿哪件马甲？", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "希望是还没发生、想做的事：穿 to 马甲。");
      const tRev = go(.3);
      T("I hope to see you —— 想做穿 to", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("I hope to see you soon.", { zh: "我希望很快见到你。", word: "hope to see soon you" });
      D.hold(2);

      k.quoteCard({ insight: "王座只坐 1 个动词；其他动词穿马甲：\nto do（想做）或 doing（正在做 / 享受过程）", rhyme: "口诀：想做穿 to，在做穿 -ing。", hlLines: 2, foot: "🧠 第一性原理 ④ 一山不容二虎单核谓语律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "go", act: "讲解员在读到「I want to go home」时往前走（walk），再走回来" },
      { word: "reading", act: "讲解员捧书读（read），与「I enjoy reading」同步" },
    ],
    r2skip: ["I want go home."],   // 画面上被打叉的错句（第二个动词没穿马甲），不读
    terms: [
      ["不定式 to do", "to + 动词原形，如 to go。常表示想要、打算、将要去做的事。"],
      ["动名词 / 现在分词 doing", "动词 + -ing，如 reading。表示正在做，或者做这件事本身。"],
      ["动词原形", "动词最原本的样子，不加 -s、-ed、-ing，如 go、play。"],
      ["可信度徽章", "💡 记忆方法（王座、马甲）· ✂️ 简化说法（有些动词两种马甲都能穿，如 like to swim / like swimming；以后再细分）。"],
    ],
  },
);
WB_LAB.fp_one_king.push(
  // ───────── 4-3 令牌守恒：does / did / can 来了，动词变原形（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_one_king_classic.js（R1 零丢失）。原左（令牌飞走）右（侍卫接管对照表）两半拆成两个镜头；紫 / 橙文字改 V3，令牌保留道具金色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：为什么加了 does / did / can，后面的动词就变回原形？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "令牌守恒定律", sub: "④ 一山不容二虎单核谓语律", badges: ["💡"], steps: ["① -s 令牌", "② Does 拿走", "③ 过去令牌", "④ 侍卫接管", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 令牌从动词飞到侍卫 ─────
      D.step(0); D.shot();
      N("三单：", "主语是 he / she / it 时，一般现在时的动词要加 -s。");
      T("She like", 40, 170, go(.8), .8, { size: 30, color: C.ink, weight: 900, font: M });
      const tk = FP.token("-s", 202, 160); D.adopt(tk); D.back();
      T("apples.", 228, 170, go(.6), .6, { size: 30, color: C.ink, weight: 900, font: M });
      T("这块 -s 令牌，现在戴在 like 身上", 40, 206, go(.9), .9, { size: 15, color: C.red, weight: 900 });
      k.act(me, "point", S.at - .8, 1.2, { at: [202, 160] });
      k.wait(.6);
      D.step(1);
      N("一般疑问句：", "能用 Yes / No 回答的问句。要请侍卫 Does 站到句首。");
      T("Does", 40, 290, go(.5), .5, { size: 30, color: C.blue, weight: 900, font: M });
      T("she like apples?", 130, 290, go(1), 1, { size: 30, color: C.ink, weight: 900, font: M });
      N("", "一句话只有一块令牌：侍卫 Does 拿走了它，like 就变回原形。");
      const t1 = go(1.6);
      k.arc(tk, t1, 1.5, "M0,0 C30,60 -60,90 -126,92"); k.sfx("pop", t1 + 1.5);
      k.act(me, "surprised", t1 + 1.2, 1);
      k.wait(.2);
      T("令牌被侍卫拿走", 40, 330, go(.6), .6, { size: 15, color: C.blue, weight: 900 });
      T("like 变回原形", 210, 330, go(.6), .6, { size: 15, color: C.green, weight: 900 });
      P(k.ellipse(238, 280, 42, 20), go(.4), .4, { color: C.green, w: 2.5 });
      k.wait(.5);
      sayAt("Does she like apples?", { zh: "她喜欢苹果吗？", word: "like" });
      sayAt("I like apples. Do you like apples?", { zh: "我喜欢苹果。你喜欢苹果吗？", word: "apples do" });
      D.step(2);
      N("过去式：", "went 身上戴着「过去」令牌；Did 一出场，went 就变回 go。");
      T("She went home.", 40, 392, go(.8), .8, { size: 20, color: C.ink, weight: 900, font: M });
      k.arrow(216, 386, 246, 386, C.grey);
      T("Did she go home?", 256, 392, go(.8), .8, { size: 20, color: C.blue, weight: 900, font: M });
      const tk2 = FP.token("过去", 106, 350, 19); D.adopt(tk2); D.back();
      k.move(tk2, go(1.2), 1.2, 168, 0);
      k.wait(.4);
      const syGo = sayAt("Did she go home?", { zh: "她回家了吗？", word: "go" });
      const syW = sayAt("She went home. Did she go home?", { zh: "她回家了。她回家了吗？", word: "She went home Did" });
      k.act(me, "walk", syW.t, Math.max(1, syW.dur * .5), { to: 830, words: ["went", "go"] });
      k.act(me, "walk", syW.t + Math.max(1, syW.dur * .5) + .1, .9, { to: 892 });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 侍卫接管令牌 ─────
      D.step(3); D.shot();
      N("助动词：", "do / does / did、can 这些「侍卫」，扛下所有变形，后面永远是原形。");
      k.head("国王自己戴令牌", 60, 132, C.red, "start", 19);
      T("He plays football.", 60, 170, go(.7), .7, { size: 19, color: C.ink, weight: 900, font: M });
      T("They went home.", 60, 200, go(.7), .7, { size: 19, color: C.ink, weight: 900, font: M });
      k.head("侍卫接管令牌 → 动词原形", 60, 260, C.blue, "start", 19);
      T("Does he play?", 60, 298, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      T("He doesn't play.", 60, 328, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      N("情态动词：", "can、must、will 这类表示「能、必须、将要」的侍卫，后面也用原形。");
      T("Did they go?", 60, 358, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      T("She can swim.", 60, 388, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      T("不能说 Does he plays? / She can swims.", 60, 428, go(1), 1, { size: 15, color: C.red, weight: 900 });
      k.wait(.6);
      const syPl = sayAt("He plays football. They went home.", { zh: "他踢足球。他们回家了。", word: "He plays football They" });
      k.act(me, "jump", syPl.t, Math.max(1, syPl.dur * .5), { words: ["plays"] });
      sayAt("Does he play? He doesn't play. Did they go?", { zh: "他踢吗？他不踢。他们去了吗？", word: "Does play doesn't" });
      sayAt("She can swim.", { zh: "她会游泳。", word: "swim" });
      sayAt("Can, must, will. She can swim.", { zh: "能、必须、将会。她会游泳。", word: "can must will" });
      sayAt("Yes, it is. No, it isn't.", { zh: "是的，它是。不，它不是。", word: "Yes No it" });
      k.act(me, "nod", S.at - 1.6, .8);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "侍卫拿令牌，动词回原形。");
      P(k.roughRect(40, 450, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：侍卫拿令牌，动词回原形。", 60, 480, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "侍卫 Does 已经站在句首，后面的动词用 play 还是 plays？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 Does Tom ___ football?　→　play / plays", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "令牌在侍卫 Does 手里，动词回原形：play。");
      const tRev = go(.3);
      T("Does Tom play football? —— 侍卫拿令牌", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Does Tom play football?", { zh: "汤姆踢足球吗？", word: "Tom play football" });
      D.hold(2);

      k.quoteCard({ insight: "一句话只有 1 块令牌（-s / 过去）：\n侍卫 does / did / can 拿了，动词就用原形", rhyme: "口诀：侍卫拿令牌，动词回原形。", hlLines: 2, foot: "🧠 第一性原理 ④ 一山不容二虎单核谓语律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "went", act: "讲解员在读到「She went home」时往前走（walk），再走回来" },
      { word: "go", act: "同上：Did she go home 时讲解员走" },
      { word: "plays", act: "讲解员在读到「He plays football」时跳起来（jump）" },
    ],
    r2skip: ["Does he plays?", "She can swims.", "swims"],   // 红字「不能说」的错句，不读
    terms: [
      ["三单", "主语是第三人称单数（he / she / it / 一个人名）时，一般现在时的动词加 -s：She likes apples。"],
      ["一般疑问句", "能用 Yes / No 回答的问句：Does she like apples?"],
      ["否定句", "带 not 的句子：He doesn't play。"],
      ["情态动词", "can（能）、must（必须）、may（可以）、will（将要）……后面接动词原形。"],
      ["可信度徽章", "💡 记忆方法（令牌、侍卫）：语法书叫「助动词承担时态和人称变化，后接动词原形」。"],
    ],
  },
);
WB_LAB.fp_one_king.push(
  // ───────── 4-4 五副基本骨骼（总览）（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_one_king_classic.js（R1 零丢失）。五行整体下移 20 给进度条让位；成分配色收进 V3（S 蓝 · V 红 · O / DO 绿 · P / IO / C 墨黑）；新增 🔮 预测和金句卡。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：再长的句子，拆掉装饰，只剩 5 副骨骼。");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "五副基本骨骼", sub: "④ 一山不容二虎单核谓语律", badges: ["✂️"], steps: ["① 主谓", "② 主系表", "③ 主谓宾", "④ 双宾 · 补语", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);
      D.shot();
      N("", "国王动词像一个插线板，决定后面还能插几个部件。");
      const COL = { S: C.blue, V: C.red, O: C.green, P: C.ink, IO: C.ink, DO: C.green, C: C.ink };
      const FILL = { S: C.tintBlue, V: C.tintRed, O: C.tintGreen, P: "#ffffff", IO: "#ffffff", DO: C.tintGreen, C: "#ffffff" };
      const row = (no, parts, en, y, marks = []) => {
        T(no, 40, y + 8, go(.3), .3, { size: 22, color: C.ink, weight: 900 });
        let x = 76;
        parts.forEach(p => {
          const w = p.length > 1 ? 48 : 38;
          P(k.roughRect(x, y - 16, w, 32), go(.25, 0), .25, { color: COL[p], w: 2.5 });
          F(k.rectD(x, y - 16, w, 32), go(.1, 0), { color: FILL[p], op: 1 });
          T(p, x + w / 2, y + 7, go(.2), .2, { size: 17, color: COL[p], weight: 900, font: M, anchor: "middle" });
          x += w + 8;
        });
        T(en, 372, y + 8, go(.9), .9, { size: 22, color: C.ink, weight: 900, font: M });
        marks.forEach(([sub, p]) => { const i = en.indexOf(sub); P(k.wl(372 + i * 13.2, y + 16, 372 + (i + sub.length) * 13.2, y + 16, .5), go(.3), .3, { color: COL[p], w: 4 }); });
      };
      D.step(0);
      N("主语 S + 谓语 V：", "谁 + 做什么。动词后面什么都不用插。");
      row("①", ["S", "V"], "Birds fly.", 140, [["Birds", "S"], ["fly", "V"]]);
      const syB = sayAt("Birds fly.", { zh: "鸟会飞。" });
      k.act(me, "jump", syB.t, Math.max(1, syB.dur + .3), { words: ["fly"] });
      D.step(1);
      N("表语 P：", "跟在系动词后面，说主语「怎么样 / 是什么」。");
      row("②", ["S", "V", "P"], "The cake smells delicious.", 198, [["The cake", "S"], ["smells", "V"], ["delicious", "P"]]);
      const syC = sayAt("The cake smells delicious.", { zh: "蛋糕闻起来很香。" });
      k.expr(me, "happy", syC.t, Math.max(1.2, syC.dur));
      D.step(2);
      N("宾语 O：", "动作落到的人或东西。");
      row("③", ["S", "V", "O"], "I love my family.", 256, [["I", "S"], ["love", "V"], ["my family", "O"]]);
      const syL = sayAt("I love my family.", { zh: "我爱我的家人。" });
      k.act(me, "cheer", syL.t, Math.max(1, syL.dur));
      D.step(3);
      N("双宾语：", "给谁（IO 人）+ 给什么（DO 物）。祈使句省略了主语 you。");
      row("④", ["S", "V", "IO", "DO"], "Pass me the book.", 314, [["Pass", "V"], ["me", "IO"], ["the book", "DO"]]);
      const syP = sayAt("Pass me the book.", { zh: "把书递给我。" });
      const bk = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "holdCard", syP.t, Math.max(1.2, syP.dur + .3), { prop: bk, words: ["pass"] });
      N("补语 C：", "补充说明宾语变成什么样。");
      row("⑤", ["S", "V", "O", "C"], "Reading makes me clever.", 372, [["Reading", "S"], ["makes", "V"], ["me", "O"], ["clever", "C"]]);
      k.wait(.4);
      T("①②③ 最常用，小学大部分句子都是它们。详细讲解看「五大句型」实验室。", 40, 432, go(1.4), 1.4, { size: 15, color: C.grey, weight: 700 });
      k.wait(.6);
      const syR = sayAt("Reading makes me clever.", { zh: "读书让我变聪明。" });
      const rb = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", syR.t, Math.max(1.4, syR.dur), { prop: rb, words: ["reading"] });
      sayAt("Birds fly. Birds can fly high.", { zh: "鸟会飞。鸟能飞得很高。", word: "Birds fly" });
      sayAt("The cake smells delicious. I love my family.", { zh: "蛋糕闻起来很香。我爱我的家人。", word: "The cake smells delicious I love my family" });
      sayAt("Pass me the book. Reading makes me clever.", { zh: "把书递给我。读书让我变聪明。", word: "Pass me book Reading makes clever" });
      sayAt("Can you pass me the book?", { zh: "你能把书递给我吗？", word: "you" });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "先搭骨架再挂花。");
      P(k.roughRect(40, 456, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：先搭骨架再挂花。", 60, 486, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "She gives me an apple. 给谁 + 给什么，是第几副骨骼？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 She gives me an apple.　→　第几副？", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "给谁（me）+ 给什么（an apple）：第 ④ 副：主语 + 谓语 + 人 + 物。");
      const tRev = go(.3);
      T("第 ④ 副 —— me 是人，an apple 是物", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      const syG = sayAt("She gives me an apple.", { zh: "她给我一个苹果。", word: "She gives an apple" });
      const ap = k.prop("card", 0, 0, { hidden: true, text: "apple" });
      k.act(me, "holdCard", syG.t, Math.max(1.2, syG.dur + .3), { prop: ap, words: ["gives"] });
      D.hold(2);

      k.quoteCard({ insight: "先把主干骨骼搭对，\n再往上挂时间、地点、形容词这些装饰", rhyme: "口诀：先搭骨架再挂花。", hlLines: 2, foot: "🧠 第一性原理 ④ 一山不容二虎单核谓语律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "fly", act: "讲解员在读到「Birds fly」时跳起来（jump）" },
      { word: "pass", act: "讲解员把书举起递出（holdCard），与「Pass me the book」同步" },
      { word: "reading", act: "讲解员捧书读（read），与「Reading makes me clever」同步" },
      { word: "gives", act: "讲解员举起 apple 词卡（holdCard），与「She gives me an apple」同步" },
    ],
    r2skip: ["IO", "DO"],   // 双宾语的成分标签缩写（间接 / 直接宾语），和 S V O 一样不读
    terms: [
      ["宾语", "动作落到的人或东西：I love my family 里的 my family。"],
      ["表语", "跟在 be / smell / look 这类系动词后面，说明主语怎么样：The cake smells delicious。"],
      ["补语", "补充说明宾语的状态：Reading makes me clever 里的 clever。"],
      ["双宾语", "一个动词带两个宾语：给谁（人）+ 给什么（物），如 Pass me the book。"],
      ["可信度徽章", "✂️ 简化说法：五种基本句型是传统语法的归纳，复杂句另有更细的分法。"],
    ],
  },
);
