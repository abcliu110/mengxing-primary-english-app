// ==================== 第一性原理 ④ 一山不容二虎单核谓语律（fp_one_king）====================
// 4 幕 = FIRST_PRINCIPLES_DB[3].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
WB_LAB.fp_one_king = [
  // ───────── 4-1 为什么不能说 I am like apples？─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么不能说 I am like apples？");
      k.header("④ 一山不容二虎单核谓语律", "一个句子，一个国王", true);
      const m = k.mono("I am like apples.", 40, 112, 26, C.red, 900);
      k.redX(330, 88);
      N("谓语动词：", "句子里说「做什么 / 是什么」的那个动词，是句子的国王。");
      const th = D.throne(230, 300);
      const kA = D.king("am", 90, 170, C.blue), kB = D.king("like", 370, 170, C.red);
      N("", "am 和 like 都想坐王座——一个句子里两个国王，打起来了！");
      const t1 = go(1.2); k.move(kA, t1, 1, 122, 70); k.move(kB, t1, 1, -130, 70);
      k.buzz(kA, t1 + 1, 1.4, 4); k.buzz(kB, t1 + 1, 1.4, 4);
      k.wait(1.6);
      T("一山不容二虎！", 230, 160, go(.8), .8, { size: 20, color: C.red, weight: 900, anchor: "middle" });
      k.wait(.4);
      N("实义动词：", "表示真正动作或心理的动词，比如 like、play、eat。它自己就能当国王。");
      const t2 = go(1); k.move(kA, t2, .8, -150, -40); k.fade(kA, t2 + .4, .5, .25);
      // 右：两条路线
      k.head("路线 A：动作王", 510, 112, C.red, "start", 20);
      T("I like apples.", 510, 152, go(.8), .8, { size: 24, color: C.green, weight: 900, font: M });
      T("like 是动词，自己当国王，不要 am", 510, 180, go(.8), .8, { size: 15, color: C.grey });
      k.wait(.5);
      N("be 动词：", "am / is / are，意思是「是、在」。表示状态，也能当国王。");
      k.head("路线 B：状态王", 510, 240, C.blue, "start", 20);
      T("I am happy.", 510, 280, go(.7), .7, { size: 24, color: C.green, weight: 900, font: M });
      N("形容词：", "描述样子、心情的词，比如 happy、tall。它不是动词，要 be 动词撑腰。");
      T("happy 不是动词，要请 am 撑腰", 510, 308, go(.8), .8, { size: 15, color: C.grey });
      T("I am ten. · She is tall. · They are in the park.", 510, 348, go(1.4), 1.4, { size: 14, color: C.blue, weight: 700, font: M });
      T("She plays the piano.（动作王自己加 -s）", 510, 380, go(1.2), 1.2, { size: 14, color: C.red, weight: 700, font: M });
      k.wait(.6);
      N("口诀：", "一个句子一个王，be 和 do 不同堂。");
      D.fin("一个简单句只有 1 个谓语国王：要么 be（状态），要么实义动词（动作）", "口诀：一个句子一个王，be 和 do 不同堂。");
      k.wait(2);
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
  // ───────── 4-2 第二个动词出场：穿马甲 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：王座上已经有国王了，第二个动词怎么办？");
      k.header("④ 一山不容二虎单核谓语律", "第二个动词：穿马甲", true);
      k.mono("I want go home.", 40, 112, 26, C.red, 900);
      k.redX(300, 88);
      D.throne(150, 280);
      const kw = D.king("want", 150, 230, C.red);
      N("", "want 已经坐在王座上了，go 没有位置坐。");
      const gg = D.king("go", 360, 230, C.ink, false);
      k.buzz(gg, go(1), 1, 2.5);
      N("不定式 to do：", "to + 动词原形。to 像一个指向将来的箭头 → 想做、打算做的事。");
      const vest = k.group();
      const vd = "M268,212 h46 l12,18 l-12,18 h-46 Z";
      P(vd, go(.01, 0), .01, { color: C.orange, w: 2.5 }); F(vd, go(.01, 0), { color: "#fed7aa", op: 1 });
      T("to", 292, 237, go(.01, 0), .01, { size: 20, color: C.orange, weight: 900, font: M, anchor: "middle" });
      k.endGroup(); k.hide(vest);
      k.fade(vest, go(.7), .7, 1);
      T("随从穿上 to 马甲", 330, 280, go(.6), .6, { size: 15, color: C.orange, weight: 900, anchor: "middle" });
      T("I want to go home.", 40, 388, go(1), 1, { size: 24, color: C.green, weight: 900, font: M });
      T("want to go · plan to visit · hope to see", 40, 418, go(1.2), 1.2, { size: 15, color: C.orange, weight: 700, font: M });
      k.wait(.6);
      // 右：doing
      N("动名词 doing：", "动词加 -ing。表示正在做，或者享受做这件事的过程。");
      k.head("马甲 2：doing", 510, 112, C.green, "start", 22);
      const loop = "M560,170 a26,22 0 1,1 -2,-1";
      P(loop, go(.8), .8, { color: C.green, w: 3 });
      P("M556,160 l4,10 l-10,2", go(.3), .3, { color: C.green, w: 3 });
      T("一直在进行", 600, 176, go(.5), .5, { size: 16, color: C.green, weight: 900 });
      T("I enjoy reading.", 510, 236, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      T("享受读书的过程", 510, 262, go(.5), .5, { size: 14, color: C.grey });
      T("She is swimming.", 510, 306, go(.8), .8, { size: 22, color: C.ink, weight: 900, font: M });
      T("is 是国王，swimming 穿 -ing 马甲：正在游", 510, 332, go(.9), .9, { size: 14, color: C.grey });
      T("finish doing · good at drawing", 510, 372, go(1), 1, { size: 15, color: C.green, weight: 700, font: M });
      N("", "还有第三件马甲 done（表示被做、已完成），以后再学。");
      T("第 3 件马甲 done：以后学", 510, 404, go(.8), .8, { size: 14, color: C.grey });
      k.wait(.6);
      N("口诀：", "想做穿 to，在做穿 -ing。");
      D.fin("王座只坐 1 个动词；其他动词穿马甲：to do（想做）或 doing（正在做 / 享受过程）", "口诀：想做穿 to，在做穿 -ing。");
      k.wait(2);
    },
    terms: [
      ["不定式 to do", "to + 动词原形，如 to go。常表示想要、打算、将要去做的事。"],
      ["动名词 / 现在分词 doing", "动词 + -ing，如 reading。表示正在做，或者做这件事本身。"],
      ["动词原形", "动词最原本的样子，不加 -s、-ed、-ing，如 go、play。"],
    ],
  },
);
WB_LAB.fp_one_king.push(
  // ───────── 4-3 令牌守恒：does / did / can 来了，动词变原形 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么加了 does / did / can，后面的动词就变回原形？");
      k.header("④ 一山不容二虎单核谓语律", "令牌守恒定律", true);
      N("三单：", "主语是 he / she / it 时，一般现在时的动词要加 -s。");
      T("She like", 40, 170, go(.8), .8, { size: 30, color: C.ink, weight: 900, font: M });
      const tk = D.token("-s", 202, 160);
      T("apples.", 228, 170, go(.6), .6, { size: 30, color: C.ink, weight: 900, font: M });
      T("这块 -s 令牌，现在戴在 like 身上", 40, 206, go(.9), .9, { size: 15, color: C.orange, weight: 900 });
      k.wait(.6);
      N("一般疑问句：", "能用 Yes / No 回答的问句。要请侍卫 Does 站到句首。");
      T("Does", 40, 290, go(.5), .5, { size: 30, color: C.blue, weight: 900, font: M });
      T("she like apples?", 130, 290, go(1), 1, { size: 30, color: C.ink, weight: 900, font: M });
      N("", "一句话只有一块令牌：侍卫 Does 拿走了它，like 就变回原形。");
      const t1 = go(1.6);
      k.arc(tk, t1, 1.5, "M0,0 C30,60 -60,90 -126,92");
      k.wait(.2);
      T("令牌被侍卫拿走", 40, 330, go(.6), .6, { size: 15, color: C.blue, weight: 900 });
      T("like 变回原形", 210, 330, go(.6), .6, { size: 15, color: C.green, weight: 900 });
      P(k.ellipse(238, 280, 42, 20), go(.4), .4, { color: C.green, w: 2.5 });
      k.wait(.5);
      N("过去式：", "went 身上戴着「过去」令牌；Did 一出场，went 就变回 go。");
      T("She went home.", 40, 392, go(.8), .8, { size: 20, color: C.ink, weight: 900, font: M });
      k.arrow(216, 386, 246, 386, C.grey);
      T("Did she go home?", 256, 392, go(.8), .8, { size: 20, color: C.blue, weight: 900, font: M });
      const tk2 = D.token("过去", 106, 350, 19);
      k.move(tk2, go(1.2), 1.2, 168, 0);
      k.wait(.4);
      // 右：侍卫接管
      N("助动词：", "do / does / did、can 这些「侍卫」，扛下所有变形，后面永远是原形。");
      k.head("国王自己戴令牌", 510, 112, C.purple, "start", 19);
      T("He plays football.", 510, 150, go(.7), .7, { size: 19, color: C.ink, weight: 900, font: M });
      T("They went home.", 510, 180, go(.7), .7, { size: 19, color: C.ink, weight: 900, font: M });
      k.head("侍卫接管令牌 → 动词原形", 510, 240, C.blue, "start", 19);
      T("Does he play?", 510, 278, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      T("He doesn't play.", 510, 308, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      N("情态动词：", "can、must、will 这类表示「能、必须、将要」的侍卫，后面也用原形。");
      T("Did they go?", 510, 338, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      T("She can swim.", 510, 368, go(.6), .6, { size: 19, color: C.blue, weight: 900, font: M });
      T("不能说 Does he plays? / She can swims.", 510, 408, go(1), 1, { size: 15, color: C.red, weight: 900 });
      k.wait(.6);
      N("口诀：", "侍卫拿令牌，动词回原形。");
      D.fin("一句话只有 1 块令牌（-s / 过去）：侍卫 does / did / can 拿了，动词就用原形", "口诀：侍卫拿令牌，动词回原形。");
      k.wait(2);
    },
    terms: [
      ["三单", "主语是第三人称单数（he / she / it / 一个人名）时，一般现在时的动词加 -s：She likes apples。"],
      ["一般疑问句", "能用 Yes / No 回答的问句：Does she like apples?"],
      ["否定句", "带 not 的句子：He doesn't play。"],
      ["情态动词", "can（能）、must（必须）、may（可以）、will（将要）……后面接动词原形。"],
    ],
  },
);
