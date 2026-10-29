// ==================== 🔀 中英对照总枢 · 修饰语位置（ze_modifier_classic：v2 升级前的零丢失搬迁版，回退用，不进 App）====================
// 2026-10-30 从第一性原理 ⑥-1（fp_zoom_focus 第 1 幕）零丢失整幕搬来（清单 docs/whiteboard/zh_en_hub/INVENTORY_6-1.md）。
// 改动只增不减：标题加「🔀 修饰语位置」并保留原理名；开头加一句中英对照字幕；补 R2 朗读。下一步升引擎 v2 + 讲解员。
WB_LAB.ze_modifier_classic = [
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么英语的长修饰语要放在名词后面？");
      k.header("🔀 修饰语位置（原理 ⑥ 焦点先行）", "先立树干，后挂树枝", true);
      N("中英对照：", "中文的修饰语再长也放在名词前面；英语只有 1 个词才放前面，长的要挂到名词后面。照搬中文语序，英语就「头重脚轻」了。");
      N("修饰语：", "用来说明「哪一个、什么样」的词或短语，比如「穿蓝衣服的」。");
      const z = k.zh("树下那个穿蓝衣服的男孩", 40, 112, 26);
      k.circle(z, 9, 10, C.red);
      T("中文：一大串铺垫，最后才说核心「男孩」", 40, 150, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      k.wait(.4);
      N("核心名词：", "这句话真正在说的那个人或东西——the boy。英语先把它亮出来。");
      const tr = k.tree({ cx: 170, ground: 398, trunkTop: 246, crownY: 208, crownRx: 90, crownRy: 42, gx0: 50, gx1: 300 });
      k.sign("the boy", 170, 282, null, { size: 22 });
      N("短语：", "两个词以上组成的一小组，比如 in blue、under the tree。");
      k.chip("in blue", 270, 246, [236, 222], { size: 17, color: C.blue });
      k.chip("under the tree", 270, 318, [318, 280], { size: 17, color: C.green, string: true });
      T("the boy in blue under the tree", 40, 428, go(1.2), 1.2, { size: 18, color: C.green, weight: 900, font: M });
      k.wait(.5);
      // 右：两条规则
      k.say("The boy in blue under the tree is my brother.", { zh: "树下穿蓝衣服的男孩是我弟弟。", word: "the boy" });
      N("", "只有 1 个词的轻修饰，放在名词前面，挡不住核心。");
      k.head("1 个词 → 放前面", 520, 112, C.blue, "start", 20);
      T("a red apple", 520, 150, go(.5), .5, { size: 20, color: C.ink, weight: 900, font: M });
      T("a cute cat · my English book", 520, 180, go(.8), .8, { size: 17, color: C.blue, weight: 700, font: M });
      k.wait(.4);
      N("", "2 个词以上的短语，一律挂在名词后面，像圣诞树上的挂件。");
      k.head("2 个词以上 → 挂后面", 520, 240, C.green, "start", 20);
      T("the girl in a red dress", 520, 278, go(.8), .8, { size: 19, color: C.ink, weight: 900, font: M });
      T("穿红裙子的女孩", 520, 302, go(.4), .4, { size: 13, color: C.grey });
      T("the book on the teacher's desk", 520, 338, go(.9), .9, { size: 17, color: C.ink, weight: 900, font: M });
      T("讲台上的书", 520, 362, go(.4), .4, { size: 13, color: C.grey });
      k.say("I see the girl in a red dress.", { zh: "我看见那个穿红裙子的女孩。" });
      N("不定代词：", "something、anything 这类词，连 1 个词的修饰也放后面。");
      T("something important", 520, 398, go(.7), .7, { size: 17, color: C.purple, weight: 900, font: M });
      T("（特殊：也放后面）", 736, 398, go(.5), .5, { size: 13, color: C.grey });
      k.wait(.6);
      k.say("I have something important to tell you.", { zh: "我有重要的事要告诉你。", word: "something important" });
      // R2 补朗读（2026-10-29，搬迁时在新位置补齐）
      k.say("In blue, under the tree. The boy in blue is under the tree.", { zh: "穿蓝衣服的，在树下。穿蓝衣服的男孩在树下。", word: "in blue under tree" });
      k.say("A red apple. A cute cat. My English book.", { zh: "一个红苹果。一只可爱的猫。我的英语书。", word: "a red apple cute cat my English book a red apple a cute cat my English book" });
      k.say("The girl in a red dress. The book on the teacher's desk.", { zh: "穿红裙子的女孩。讲台上的书。", word: "girl dress on teacher's desk the book on the teacher's desk" });
      k.say("Something, anything. Is there anything new?", { zh: "某事、任何事。有什么新鲜事吗？", word: "anything" });
      N("口诀：", "先立树干，后挂树枝。");
      D.fin("1 个词的修饰放名词前；2 个词以上的短语挂在名词后", "口诀：先立树干，后挂树枝。");
      k.wait(2);
    },
    terms: [
      ["修饰语", "说明「哪一个、什么样」的词或短语，比如 red、in blue。"],
      ["核心名词", "这句话真正在说的人或东西，比如 the boy in blue 里的 the boy。"],
      ["短语", "两个词以上组成的一小组，但还不是完整的句子，比如 in blue、under the tree。"],
      ["语序", "词在句子里排列的先后顺序。"],
      ["疑问词", "what、where、when、who、how 这类用来提问的词。"],
      ["感叹句", "表示强烈感情的句子，以 What 或 How 开头：What a clever boy!"],
    ],
  },
];
