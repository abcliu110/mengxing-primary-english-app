// ==================== 第一性原理 ② 字母象形与音义同源簇（fp_iconicity）====================
// 4 幕 = FIRST_PRINCIPLES_DB[1].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
// 讲法提醒（HANDOFF §4）：字母象形、音义簇多是「帮助记忆的联想」，字幕用「可以想成 / 像」；tw- = two 是真词源。
WB_LAB.fp_iconicity = [
  // ───────── 2-1 M / S / B / C 像什么？─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：把字母当成一幅画，帮你一次记住一串词。");
      k.header("② 字母象形与音义同源簇", "字母像一幅画", false);
      N("象形：", "照着东西的样子画出来的符号。英文字母最早也是从图画变来的。");
      const xs = [130, 360, 590, 820];
      const letter = (ch, x, color) => { const g = k.group(); T(ch, x, 250, go(.6), .6, { size: 120, color, weight: 900, font: M, anchor: "middle" }); k.endGroup(); return g; };
      const words = (x, list, color) => list.forEach((w, i) => T(w, x, 316 + i * 32, go(.5), .5, { size: 19, color: i ? C.ink : color, weight: 900, font: M, anchor: "middle" }));
      // M
      N("", "M 可以想成两座山峰，也像合起来的上下嘴唇。");
      const gM = letter("M", xs[0], C.purple);
      k.fade(gM, go(.5), .5, .18);
      const mt = `M${xs[0] - 60},250 L${xs[0] - 30},170 L${xs[0]},220 L${xs[0] + 30},165 L${xs[0] + 60},250`;
      P(mt, go(1), 1, { color: C.green, w: 4 });
      P(`M${xs[0] - 40},215 l10,-5 l10,6 M${xs[0] + 20},210 l10,-6 l10,6`, go(.4), .4, { color: "#94a3b8", w: 2.5 });
      words(xs[0], ["mountain 山", "mouth 嘴", "mother 妈妈"], C.purple);
      k.wait(.3);
      // S
      N("", "S 弯弯曲曲，像一条蛇，也像水波和笑起来的嘴。");
      const gS = letter("S", xs[1], C.blue);
      k.fade(gS, go(.5), .5, .18);
      P(`M${xs[1] + 30},170 C${xs[1] - 40},150 ${xs[1] - 50},205 ${xs[1]},210 C${xs[1] + 50},215 ${xs[1] + 40},270 ${xs[1] - 34},250`, go(1), 1, { color: C.green, w: 6 });
      P(k.ellipse(xs[1] + 30, 170, 6, 5), go(.2), .2, { color: C.red, w: 3 });
      words(xs[1], ["snake 蛇", "swim 游泳", "smile 微笑"], C.blue);
      k.wait(.3);
      // B
      N("", "B 像两个鼓鼓的包，能装东西：包、盒子、床……");
      const gB = letter("B", xs[2], C.orange);
      k.fade(gB, go(.5), .5, .18);
      const bag = `M${xs[2] - 40},190 h80 l10,60 h-100 Z`;
      P(bag, go(.8), .8, { color: C.brown, w: 3.5 }); F(bag, go(.2, 0), { color: "#fde68a", op: .6 });
      P(`M${xs[2] - 20},190 C${xs[2] - 20},160 ${xs[2] + 20},160 ${xs[2] + 20},190`, go(.4), .4, { color: C.brown, w: 3.5 });
      words(xs[2], ["bag 包", "box 盒子", "bed 床"], C.orange);
      k.wait(.3);
      // C
      N("", "C 像一只弯起来的手，去抓、去握：杯子、帽子、抓住。");
      const gC = letter("C", xs[3], C.red);
      k.fade(gC, go(.5), .5, .18);
      const cup = `M${xs[3] - 30},180 L${xs[3] - 22},250 L${xs[3] + 22},250 L${xs[3] + 30},180`;
      P(cup, go(.7), .7, { color: C.blue, w: 3.5 });
      P(`M${xs[3] + 28},195 c22,0 22,34 -4,36`, go(.4), .4, { color: C.blue, w: 3.5 });
      words(xs[3], ["cup 杯子", "cap 帽子", "catch 抓住"], C.red);
      k.wait(.5);
      T("这是帮你记单词的联想：看字母的样子，想起一串词。", 40, 424, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      N("口诀：", "M 是山，S 是蛇，B 是包，C 来抓。");
      D.fin("看字母的形状，联想画面，一个字母串起一串词", "口诀：M 是山，S 是蛇，B 是包，C 来抓。");
      k.wait(2);
    },
    terms: [
      ["字母", "英语的 26 个书写符号 A–Z。它们最早是从古代的图画文字（腓尼基字母）演变来的。"],
      ["象形", "照着东西的样子画出来。这里用字母的形状帮忙联想记词，不是每个词真的从字母形状来。"],
      ["辅音丛", "两三个辅音字母连在一起读，如 fl-、str-、sp-。"],
      ["词源", "一个词最早从哪里来、怎么变成今天的样子。"],
      ["音义联想", "某些开头的声音常和某种感觉一起出现，如 fl- 常和「飞、飘」有关。是规律倾向，有例外。"],
    ],
  },
];
