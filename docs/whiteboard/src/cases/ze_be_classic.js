// ==================== 🔀 中英对照总枢 · 「是」≠ be（ze_be_classic：v2 升级前的零丢失搬迁版，回退用，不进 App）====================
// 2026-10-29 从第一性原理 ④-1（fp_one_king 第 1 幕）零丢失整幕搬来（清单 docs/whiteboard/zh_en_hub/INVENTORY_4-1.md）。
// 改动只增不减：标题加「🔀「是」≠ be」并保留原理名；开头加一句中英对照字幕；补 R2 朗读。下一步升引擎 v2 + 讲解员。
WB_LAB.ze_be_classic = [
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么不能说 I am like apples？");
      k.header("🔀「是」≠ be（原理 ④ 一山不容二虎）", "一个句子，一个国王", true);
      N("中英对照：", "中文「我是喜欢苹果」听着挺顺，可英语的 be 不等于中文的「是」——照搬就会说成 I am like apples。");
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
      k.say("I like apples.", { zh: "我喜欢苹果。", word: "like" });
      N("形容词：", "描述样子、心情的词，比如 happy、tall。它不是动词，要 be 动词撑腰。");
      T("happy 不是动词，要请 am 撑腰", 510, 308, go(.8), .8, { size: 15, color: C.grey });
      T("I am ten. · She is tall. · They are in the park.", 510, 348, go(1.4), 1.4, { size: 14, color: C.blue, weight: 700, font: M });
      T("She plays the piano.（动作王自己加 -s）", 510, 380, go(1.2), 1.2, { size: 14, color: C.red, weight: 700, font: M });
      k.wait(.6);
      k.say("I am happy.", { zh: "我很开心。", word: "am" });
      // R2 补朗读（2026-10-29，搬迁时在新位置补齐）
      k.say("I am ten. She is tall. They are in the park.", { zh: "我十岁。她个子高。他们在公园里。", word: "I am ten She is tall They are in the park" });
      k.say("She plays the piano. I like apples.", { zh: "她弹钢琴。我喜欢苹果。", word: "plays piano apples happy" });
      k.say("Be, do. Play, eat. I play and eat.", { zh: "be 动词、do 动词。玩、吃。我玩，我吃。", word: "be do play eat" });
      N("口诀：", "一个句子一个王，be 和 do 不同堂。");
      D.fin("一个简单句只有 1 个谓语国王：要么 be（状态），要么实义动词（动作）", "口诀：一个句子一个王，be 和 do 不同堂。");
      k.wait(2);
    },
    r2skip: ["I am like apples."],   // 红叉错句（两个国王），不读
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
