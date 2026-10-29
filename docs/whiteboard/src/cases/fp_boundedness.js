// ==================== 第一性原理 ③ 物理边界感统摄律（fp_boundedness）====================
// 4 幕 = FIRST_PRINCIPLES_DB[2].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
WB_LAB.fp_boundedness = [
  // ───────── 3-1 一刀切测试法 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么 bread、paper、homework 不能加 -s？");
      k.header("③ 物理边界感统摄律", "一刀切测试法", true);
      N("可数名词：", "能一个一个数的东西，可以说 an apple、two apples。");
      // 苹果
      const ax = 130, ay = 220;
      const aL = `M${ax},${ay - 46} C${ax - 30},${ay - 56} ${ax - 56},${ay - 30} ${ax - 52},${ay} C${ax - 50},${ay + 34} ${ax - 24},${ay + 52} ${ax},${ay + 42} Z`;
      const aR = `M${ax},${ay - 46} C${ax + 30},${ay - 56} ${ax + 56},${ay - 30} ${ax + 52},${ay} C${ax + 50},${ay + 34} ${ax + 24},${ay + 52} ${ax},${ay + 42} Z`;
      const apple = D.halves(aL, aR, C.red, "#fecaca");
      P(`M${ax},${ay - 46} q4,-16 12,-22`, go(.3), .3, { color: C.brown, w: 3 });
      T("an apple", ax, 300, go(.5), .5, { size: 20, color: C.ink, weight: 900, font: M, anchor: "middle" });
      N("", "一刀切开苹果：两半还是「一个苹果」吗？不是了！");
      const t1 = D.knife(ax, ay - 50, ay + 44); apple.split(t1);
      T("切开就不是「一个苹果」了", ax, 330, go(.9), .9, { size: 15, color: C.green, weight: 900, anchor: "middle" });
      T("→ 有边界：可数", ax, 354, go(.6), .6, { size: 17, color: C.green, weight: 900, anchor: "middle" });
      k.wait(.4);
      // 面包
      N("不可数名词：", "不能一个一个数的东西，不加 -s，不说 a bread。");
      const bx = 350, by = 220;
      const bL = `M${bx},${by - 34} L${bx - 40},${by - 34} C${bx - 70},${by - 34} ${bx - 72},${by + 30} ${bx - 50},${by + 30} L${bx},${by + 30} Z`;
      const bR = `M${bx},${by - 34} L${bx + 40},${by - 34} C${bx + 70},${by - 34} ${bx + 72},${by + 30} ${bx + 50},${by + 30} L${bx},${by + 30} Z`;
      const bread = D.halves(bL, bR, C.brown, "#fde68a");
      T("bread", bx, 300, go(.4), .4, { size: 20, color: C.ink, weight: 900, font: M, anchor: "middle" });
      N("", "切开面包：两块都还是面包。水倒一半，还是水。");
      const t2 = D.knife(bx, by - 38, by + 32); bread.split(t2);
      T("切开还是面包", bx, 330, go(.6), .6, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      T("→ 没边界：不可数", bx, 354, go(.6), .6, { size: 17, color: C.blue, weight: 900, anchor: "middle" });
      T("water · milk · paper · homework 也一样", 40, 404, go(1), 1, { size: 16, color: C.grey, weight: 700 });
      T("（作业是一大类事，不是一个一个的东西）", 40, 428, go(.8), .8, { size: 14, color: C.grey });
      k.wait(.6);
      // 右：容器赋界
      N("量词：", "想数不可数的东西，就给它套一个「容器」：一杯、一张、一块。");
      k.head("想数它？套个容器！", 510, 112, C.purple, "start", 20);
      const cup = "M560,150 L570,240 L620,240 L630,150";
      P(cup, go(.6), .6, { color: C.blue, w: 3 });
      const milk = k.group(); F("M564,185 L570,240 L620,240 L626,185 Z", go(.01, 0), { color: "#e0f2fe", op: 1 }); k.endGroup(); k.hide(milk);
      k.fade(milk, go(.8), .8, 1);
      T("a glass of milk", 650, 205, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M });
      T("一杯牛奶", 650, 232, go(.4), .4, { size: 15, color: C.grey });
      N("", "要说「两张纸」，-s 加在容器词 piece 上，paper 不加。");
      for (let i = 0; i < 2; i++) P(k.roughRect(560 + i * 18, 280 + i * 10, 56, 70), go(.4), .4, { color: C.ink, w: 2 });
      const mp = k.mono("two pieces of paper", 650, 322, 22, C.ink, 900);
      P(k.ellipse(mp.x0("pieces") + 5.5 * mp.cw, mp.y - 7, 9, 15), go(.4), .4, { color: C.orange, w: 3 });
      T("-s 加在容器上", 650, 350, go(.5), .5, { size: 15, color: C.orange, weight: 900 });
      k.strike(k.mono("two papers", 650, 396, 18, C.grey, 700), "papers", 0, C.red);
      k.wait(.6);
      N("口诀：", "一刀下去还是它，不可数来不加 s。");
      D.fin("切开就坏 → 可数；切开不变 → 不可数，用容器来数（-s 加在容器上）", "口诀：一刀下去还是它，不可数来不加 s。");
      k.wait(2);
    },
    terms: [
      ["名词", "表示人、东西、地方的词，比如 apple、water、school。"],
      ["可数名词", "能一个一个数的东西：an apple、three dogs。单数前面要有 a / the / my 这样的小帽子。"],
      ["不可数名词", "没有固定边界、不能一个一个数的东西：water、bread、paper、homework。不加 -s。"],
      ["单数 / 复数", "单数：一个；复数：两个或更多，可数名词一般加 -s。"],
      ["冠词", "a / an（一个）、the（这个、那个），戴在名词前面的「小帽子」。"],
      ["量词（容器词）", "a glass of、a piece of、a cup of……给不可数的东西套上边界，就能数了。"],
    ],
  },
];
