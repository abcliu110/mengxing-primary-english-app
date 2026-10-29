// ==================== 第一性原理 ⑥ 焦点先行与镜头缩放律（fp_zoom_focus）====================
// 4 幕 = FIRST_PRINCIPLES_DB[5].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
WB_LAB.fp_zoom_focus = [
  // ───────── 6-1 长修饰放名词后面：先立树干，后挂树枝 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么英语的长修饰语要放在名词后面？");
      k.header("⑥ 焦点先行与镜头缩放律", "先立树干，后挂树枝", true);
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
      N("不定代词：", "something、anything 这类词，连 1 个词的修饰也放后面。");
      T("something important", 520, 398, go(.7), .7, { size: 17, color: C.purple, weight: 900, font: M });
      T("（特殊：也放后面）", 736, 398, go(.5), .5, { size: 13, color: C.grey });
      k.wait(.6);
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
