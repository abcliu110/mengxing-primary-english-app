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
WB_LAB.fp_boundedness.push(
  // ───────── 3-2 a 就是 one，the 就是 that ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：什么时候用 a，什么时候用 the？");
      k.header("③ 物理边界感统摄律", "a = one · the = that", true);
      // 公园和 4 只小狗
      P(k.wl(30, 290, 450, 290, .8), go(.5), .5, { color: C.green, w: 2.5 });
      T("park", 420, 314, go(.3), .3, { size: 15, color: C.green, font: M });
      const dog = (x, y) => {
        const g = k.group();
        P(k.ellipse(x, y, 26, 14), go(.3), .3, { color: C.brown, w: 2.5 });
        P(k.ellipse(x + 28, y - 14, 11, 10), go(.25), .25, { color: C.brown, w: 2.5 });
        P(`M${x - 16},${y + 12} v14 M${x + 14},${y + 12} v14 M${x - 26},${y - 4} l-10,-8`, go(.25), .25, { color: C.brown, w: 2.5 });
        k.endGroup(); return g;
      };
      N("", "公园里有好几只小狗。");
      const ds = [70, 170, 270, 370].map(x => dog(x, 252));
      // a = one
      N("不定冠词 a / an：", "第一次说起，还没指定是哪一个，意思就是「一个」。");
      T("There is a dog in the park.", 500, 150, go(1.2), 1.2, { size: 21, color: C.ink, weight: 900, font: M });
      P(k.ellipse(184, 248, 52, 34), go(.6), .6, { color: C.orange, w: 3 });
      T("a = one", 500, 184, go(.5), .5, { size: 22, color: C.orange, weight: 900, font: M });
      T("随便圈一只，还没说是哪只", 620, 184, go(.7), .7, { size: 15, color: C.grey });
      k.wait(.6);
      // the = that
      N("定冠词 the：", "说话的人和听的人都知道是哪一个，意思像「那个」。");
      const tg = k.group();
      P(k.ellipse(184, 248, 30, 30) + " " + k.wl(140, 248, 228, 248, .2) + " " + k.wl(184, 204, 184, 292, .2), go(.01, 0), .01, { color: C.red, w: 2 });
      k.endGroup(); k.hide(tg);
      const tl = go(.8); k.fade(tg, tl, .6, 1);
      T("The dog is running.", 500, 250, go(1), 1, { size: 21, color: C.ink, weight: 900, font: M });
      T("the = that", 500, 284, go(.5), .5, { size: 22, color: C.purple, weight: 900, font: M });
      T("就是刚才那只！", 668, 284, go(.5), .5, { size: 15, color: C.grey });
      const tr = go(1.4); k.move(ds[1], tr, 1.4, 0, -60); k.move(tg, tr, 1.4, 0, -60);
      k.wait(.5);
      // 独一无二
      N("", "世界上只有一个的东西，大家都知道是哪个，也用 the。");
      const sun = k.ellipse(80, 370, 18, 18);
      P(sun, go(.4), .4, { color: C.orange, w: 2.5 }); F(sun, go(.1, 0), { color: "#fde047", op: 1 });
      P(`M80,342 v-8 M80,398 v8 M52,370 h-8 M108,370 h8`, go(.3), .3, { color: C.orange, w: 2.5 });
      T("the sun · the moon", 132, 378, go(.7), .7, { size: 20, color: C.ink, weight: 900, font: M });
      T("Open the door, please!", 500, 360, go(1), 1, { size: 20, color: C.ink, weight: 900, font: M });
      T("房间里就这一扇门", 500, 388, go(.5), .5, { size: 15, color: C.grey });
      k.wait(.6);
      N("口诀：", "第一次见用 a，大家都知道用 the。");
      D.fin("a / an = 一个（第一次说，随便一个）；the = 那个（双方都知道是哪个）", "口诀：第一次见用 a，大家都知道用 the。");
      k.wait(2);
    },
    terms: [
      ["不定冠词", "a / an：第一次提到、不特指哪一个，意思是「一个」。它本来就是从 one 变来的。"],
      ["定冠词", "the：说话双方都知道是哪一个，意思像 that「那个」。"],
    ],
  },
);
WB_LAB.fp_boundedness.push(
  // ───────── 3-3 go to school vs go to the school ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：go to school 和 go to the school，差一个 the，意思差多少？");
      k.header("③ 物理边界感统摄律", "go to school vs go to the school", true);
      // 学校楼房（外壳组）
      const shell = k.group();
      const bd = "M120,270 L120,170 L210,120 L300,170 L300,270 Z";
      P(bd, go(1), 1, { color: C.blue, w: 3 }); F(bd, go(.2, 0), { color: "#eff6ff", op: 1 });
      P(k.roughRect(190, 220, 40, 50), go(.3), .3, { color: C.blue, w: 2 });
      P(k.roughRect(140, 186, 30, 24) + " " + k.roughRect(250, 186, 30, 24), go(.3), .3, { color: C.blue, w: 2 });
      T("SCHOOL", 210, 166, go(.4), .4, { size: 14, color: C.blue, weight: 900, font: M, anchor: "middle" });
      k.endGroup();
      P(k.wl(40, 270, 450, 270, .6), go(.3), .3, { color: C.grey, w: 2 });
      // 外壳
      N("加 the：", "说的是看得见、摸得着的那栋楼——有边界的实物。");
      T("go to the school", 40, 320, go(.8), .8, { size: 22, color: C.blue, weight: 900, font: M });
      T("家长去学校那栋楼开会", 40, 348, go(.6), .6, { size: 15, color: C.grey });
      const hl = k.group(); P("M114,276 L114,166 L210,112 L306,166 L306,276 Z", go(.01, 0), .01, { color: C.orange, w: 5 }); k.endGroup(); k.hide(hl);
      const p = D.person(370, 270, C.purple);
      const t1 = go(1.6); k.fade(hl, t1, .4, 1); k.move(p, t1, 1.4, -50, 0);
      k.wait(.4);
      // 功能
      N("零冠词：", "什么冠词都不加。这时说的是「做这件事」，不是那栋楼。");
      const t2 = go(1.4); k.fade(shell, t2, 1, .15); k.fade(hl, t2, 1, 0); k.fade(p, t2, 1, 0);
      const fn = k.group();
      P(k.roughRect(176, 170, 70, 52), go(.01, 0), .01, { color: C.red, w: 3 });
      P("M211,170 L211,222", go(.01, 0), .01, { color: C.red, w: 2 });
      P("M262,226 l26,-60 l8,4 l-26,60 Z", go(.01, 0), .01, { color: C.orange, w: 2.5 });
      k.endGroup(); k.hide(fn); k.fade(fn, go(.8), .8, 1);
      T("go to school", 40, 392, go(.7), .7, { size: 22, color: C.red, weight: 900, font: M });
      T("去上学（读书、上课这件事）", 40, 420, go(.7), .7, { size: 15, color: C.grey });
      k.wait(.5);
      // 右：更多成对例子
      k.head("看得见的实物", 510, 112, C.blue, "start", 18);
      k.head("只讲做什么事", 730, 112, C.red, "start", 18);
      const pair = (a, za, b, zb, y) => {
        T(a, 510, y, go(.5), .5, { size: 19, color: C.blue, weight: 900, font: M });
        T(za, 510, y + 22, go(.4), .4, { size: 13, color: C.grey });
        T(b, 730, y, go(.5), .5, { size: 19, color: C.red, weight: 900, font: M });
        T(zb, 730, y + 22, go(.4), .4, { size: 13, color: C.grey });
      };
      N("", "同样：on the bed 是在床这件家具上面；in bed 是在睡觉。");
      pair("on the bed", "在床（家具）上", "in bed", "在睡觉", 160);
      N("", "on a bus 是在一辆车里；by bus 是坐公交这种方式。");
      pair("on a bus", "在一辆公交车上", "by bus", "坐公交（方式）", 230);
      N("", "buy a football 是买一个球；play football 是踢足球这项运动。");
      pair("buy a football", "买一个足球", "play football", "踢足球（运动）", 300);
      pair("to the hospital", "去医院大楼（探望）", "in hospital", "住院治病", 370);
      k.wait(.6);
      N("口诀：", "说楼房加 the，说上学不加。");
      D.fin("加冠词 = 看得见的实物（外壳）；不加冠词 = 做这件事（功能）", "口诀：说楼房加 the，说上学不加。");
      k.wait(2);
    },
    terms: [
      ["零冠词", "名词前面什么冠词都不加，如 go to school、play football。说的是活动和功能，不是具体的东西。"],
    ],
  },
);
WB_LAB.fp_boundedness.push(
  // ───────── 3-4 chicken 既可数又不可数 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：chicken 为什么有时能加 -s，有时不能？");
      k.header("③ 物理边界感统摄律", "一个词，两种边界", true);
      // 小鸡（组）+ 边界圈
      const chick = k.group();
      const body = k.ellipse(150, 215, 46, 38);
      P(body, go(.6), .6, { color: C.orange, w: 3 }); F(body, go(.1, 0), { color: "#fef08a", op: 1 });
      const head = k.ellipse(196, 172, 22, 20);
      P(head, go(.4), .4, { color: C.orange, w: 3 }); F(head, go(.1, 0), { color: "#fef08a", op: 1 });
      P("M216,170 l14,4 l-14,5 M140,252 v20 M162,252 v20", go(.4), .4, { color: C.red, w: 3 });
      P(k.ellipse(200, 166, 3, 3), go(.1), .1, { color: C.ink, w: 3 });
      k.endGroup();
      const edge = k.group(); P(k.ellipse(170, 214, 92, 76), go(.8), .8, { color: C.green, w: 2.5, dash: "9 7" }); k.endGroup();
      N("", "一只活蹦乱跳的小鸡，有完整的身体边界——可数。");
      T("a chicken · three chickens", 40, 326, go(1), 1, { size: 19, color: C.green, weight: 900, font: M });
      T("一只小鸡：有完整边界 → 可数", 40, 352, go(.8), .8, { size: 15, color: C.green, weight: 900 });
      const tb = go(.6); k.buzz(chick, tb, .6, 2);
      k.wait(.6);
      // 变成鸡肉
      N("", "做成盘子里的鸡肉，完整的边界没了——不可数。");
      const t2 = go(1.2); k.fade(chick, t2, 1, 0); k.fade(edge, t2, 1, 0);
      const meat = k.group();
      P(k.ellipse(170, 236, 96, 26), go(.01, 0), .01, { color: C.grey, w: 3 });
      [[130, 226], [166, 220], [200, 230], [150, 244], [190, 246]].forEach(([x, y]) => {
        const d = k.ellipse(x, y, 14, 8); P(d, go(.01, 0), .01, { color: C.brown, w: 2 }); F(d, go(.01, 0), { color: "#fdba74", op: 1 });
      });
      k.endGroup(); k.hide(meat); k.fade(meat, go(.8), .8, 1);
      T("some chicken", 40, 396, go(.7), .7, { size: 19, color: C.purple, weight: 900, font: M });
      T("鸡肉：没有边界 → 不可数", 40, 422, go(.7), .7, { size: 15, color: C.purple, weight: 900 });
      k.wait(.6);
      // 右：更多例子
      k.head("有完整外壳（可数）", 510, 112, C.green, "start", 18);
      k.head("变成材料 / 空间（不可数）", 700, 112, C.purple, "start", 16);
      const pair = (a, za, b, zb, y) => {
        T(a, 510, y, go(.5), .5, { size: 19, color: C.green, weight: 900, font: M });
        T(za, 510, y + 22, go(.4), .4, { size: 13, color: C.grey });
        T(b, 700, y, go(.5), .5, { size: 19, color: C.purple, weight: 900, font: M });
        T(zb, 700, y + 22, go(.4), .4, { size: 13, color: C.grey });
      };
      N("", "a glass 是一个玻璃杯；made of glass 是玻璃这种材料。");
      pair("a glass", "一个玻璃杯", "made of glass", "玻璃做的（材料）", 170);
      N("", "a room 是一个房间；make room for you 是腾出地方。");
      pair("a room", "一个房间", "make room", "腾出空间", 245);
      N("", "two fish 是两条鱼；some fish 是一些鱼肉。");
      pair("two fish", "两条鱼", "some fish", "一些鱼肉", 320);
      T("看它在句子里有没有完整边界，一秒判断", 510, 400, go(1), 1, { size: 15, color: C.orange, weight: 900 });
      k.wait(.6);
      N("口诀：", "整只能数，切成肉就不数。");
      D.fin("同一个词：有完整外壳边界 → 可数；变成肉、材料、空间 → 不可数", "口诀：整只能数，切成肉就不数。");
      k.wait(2);
    },
    terms: [],
  },
);
