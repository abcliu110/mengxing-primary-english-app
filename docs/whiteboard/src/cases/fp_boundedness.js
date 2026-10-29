// ==================== 第一性原理 ③ 物理边界感统摄律（fp_boundedness）====================
// 4 幕 = FIRST_PRINCIPLES_DB[2].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
// v2 升级（2026-10-30 起，决策 24）：第 1–3 幕已升引擎 v2 + 讲解员；升级前整份文件原样保存在 cases/fp_boundedness_classic.js。依赖 wo_props + fp_props。
WB_LAB.fp_boundedness = [
  // ───────── 3-1 一刀切测试法（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_boundedness_classic.js（R1 零丢失）。原左（一刀切）右（容器）两半拆成两个镜头，容器镜头左移 450。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S, WOOD = k.C.brown;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：为什么 bread、paper、homework 不能加 -s？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "一刀切测试法", sub: "③ 物理边界感统摄律", badges: ["💡", "✂️"], steps: ["① 切苹果", "② 切面包", "③ 一杯", "④ 两张", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 切苹果 ─────
      D.step(0); D.shot();
      N("可数名词：", "能一个一个数的东西，可以说 an apple、two apples。");
      const ax = 130, ay = 230;
      const aL = `M${ax},${ay - 46} C${ax - 30},${ay - 56} ${ax - 56},${ay - 30} ${ax - 52},${ay} C${ax - 50},${ay + 34} ${ax - 24},${ay + 52} ${ax},${ay + 42} Z`;
      const aR = `M${ax},${ay - 46} C${ax + 30},${ay - 56} ${ax + 56},${ay - 30} ${ax + 52},${ay} C${ax + 50},${ay + 34} ${ax + 24},${ay + 52} ${ax},${ay + 42} Z`;
      const apple = FP.halves(aL, aR, C.red, C.tintRed); D.adopt(apple.gl, apple.gr); D.back();
      P(`M${ax},${ay - 46} q4,-16 12,-22`, go(.3), .3, { color: WOOD, w: 3 });
      T("an apple", ax, 310, go(.5), .5, { size: 20, color: C.ink, weight: 900, font: M, anchor: "middle" });
      N("", "一刀切开苹果：两半还是「一个苹果」吗？不是了！");
      const t1 = FP.knife(ax, ay - 50, ay + 44); D.back(); apple.split(t1); k.sfx("pop", t1);
      k.act(me, "surprised", t1, 1.2); k.expr(me, "oops", t1, 1.5);
      T("切开就不是「一个苹果」了", ax, 340, go(.9), .9, { size: 15, color: C.green, weight: 900, anchor: "middle" });
      T("→ 有边界：可数", ax, 364, go(.6), .6, { size: 17, color: C.green, weight: 900, anchor: "middle" });
      k.wait(.4);
      sayAt("I have an apple. You have two apples.", { zh: "我有一个苹果，你有两个苹果。", word: "apples" });

      // ───── 镜头 1 续 · 切面包 ─────
      D.step(1);
      N("不可数名词：", "不能一个一个数的东西，不加 -s，不说 a bread。");
      const bx = 390, by = 230;
      const bL = `M${bx},${by - 34} L${bx - 40},${by - 34} C${bx - 70},${by - 34} ${bx - 72},${by + 30} ${bx - 50},${by + 30} L${bx},${by + 30} Z`;
      const bR = `M${bx},${by - 34} L${bx + 40},${by - 34} C${bx + 70},${by - 34} ${bx + 72},${by + 30} ${bx + 50},${by + 30} L${bx},${by + 30} Z`;
      const bread = FP.halves(bL, bR, WOOD, "#fde68a"); D.adopt(bread.gl, bread.gr); D.back();
      T("bread", bx, 310, go(.4), .4, { size: 20, color: C.ink, weight: 900, font: M, anchor: "middle" });
      N("", "切开面包：两块都还是面包。水倒一半，还是水。");
      const t2 = FP.knife(bx, by - 38, by + 32); D.back(); bread.split(t2);
      k.act(me, "nod", t2 + .2, .8);
      T("切开还是面包", bx, 340, go(.6), .6, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      T("→ 没边界：不可数", bx, 364, go(.6), .6, { size: 17, color: C.blue, weight: 900, anchor: "middle" });
      T("water · milk · paper · homework 也一样", 40, 414, go(1), 1, { size: 16, color: C.grey, weight: 700 });
      T("（作业是一大类事，不是一个一个的东西）", 40, 438, go(.8), .8, { size: 14, color: C.grey });
      k.wait(.6);
      sayAt("I like bread and water.", { zh: "我喜欢面包和水。", word: "bread" });
      sayAt("Water, milk. A glass of milk, please.", { zh: "水，牛奶。请来一杯牛奶。", word: "water milk a glass of milk glass" });
      const syH = sayAt("Homework. I have a lot of homework.", { zh: "家庭作业。我有很多作业。", word: "homework" });
      const hw = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", syH.t, Math.max(1.4, syH.dur), { prop: hw });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 套个容器 ─────
      D.step(2); D.shot();
      N("量词：", "想数不可数的东西，就给它套一个「容器」：一杯、一张、一块。");
      k.head("想数它？套个容器！", 60, 132, C.blue, "start", 20);
      const cup = "M110,170 L120,260 L170,260 L180,170";
      P(cup, go(.6), .6, { color: C.blue, w: 3 });
      const milk = D.sub(); F("M114,205 L120,260 L170,260 L176,205 Z", go(.01, 0), { color: C.tintBlue, op: 1 }); D.back(); k.hide(milk);
      k.fade(milk, go(.8), .8, 1);
      T("a glass of milk", 200, 225, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M });
      T("一杯牛奶", 200, 252, go(.4), .4, { size: 15, color: C.grey });
      const syG = sayAt("A glass of milk, please.", { zh: "请来一杯牛奶。", word: "please" });
      const gl = k.prop("card", 0, 0, { hidden: true, text: "milk" });
      k.act(me, "holdCard", syG.t, Math.max(1.2, syG.dur + .3), { prop: gl });
      D.step(3);
      N("", "要说「两张纸」，-s 加在容器词 piece 上，paper 不加。");
      for (let i = 0; i < 2; i++) P(k.roughRect(110 + i * 18, 300 + i * 10, 56, 70), go(.4), .4, { color: C.ink, w: 2 });
      const mp = k.mono("two pieces of paper", 200, 342, 22, C.ink, 900);
      P(k.ellipse(mp.x0("pieces") + 5.5 * mp.cw, mp.y - 7, 9, 15), go(.4), .4, { color: C.red, w: 3 });
      T("-s 加在容器上", 200, 370, go(.5), .5, { size: 15, color: C.red, weight: 900 });
      k.strike(k.mono("two papers", 200, 416, 18, C.grey, 700), "papers", 0, C.red);
      k.wait(.6);
      const syP = sayAt("Give me two pieces of paper, please.", { zh: "请给我两张纸。", word: "two pieces of paper" });
      const pp = k.prop("doc", 0, 0, { hidden: true });
      k.act(me, "holdCard", syP.t, Math.max(1.2, syP.dur + .3), { prop: pp, words: ["give"] });
      sayAt("An apple. A piece of bread.", { zh: "一个苹果。一块面包。", word: "an apple a piece" });
      sayAt("Papers. The teacher reads our papers.", { zh: "试卷。老师在看我们的试卷。", word: "papers" });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "一刀下去还是它，不可数来不加 s。");
      P(k.roughRect(40, 446, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：一刀下去还是它，不可数来不加 s。", 60, 476, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "一碗米饭，一刀切下去还是米饭吗？rice 能不能加 -s？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 rice　→　rices？还是 a bowl of rice", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "切开还是米饭 → 不可数，用容器来数：two bowls of rice。");
      const tRev = go(.3);
      T("two bowls of rice —— -s 加在 bowl 上", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Rice. A bowl of rice. I want two bowls of rice.", { zh: "米饭。一碗米饭。我要两碗米饭。", word: "rice bowl bowls want two" });
      D.hold(2);

      k.quoteCard({ insight: "切开就坏 → 可数；切开不变 → 不可数，\n用容器来数（-s 加在容器上）", rhyme: "口诀：一刀下去还是它，不可数来不加 s。", hlLines: 2, foot: "🧠 第一性原理 ③ 物理边界感统摄律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "give", act: "讲解员接过纸举起来（holdCard），与「Give me two pieces of paper」同步" },
    ],
    r2skip: ["rices"],   // 预测题里故意写的错误形式，不读
    terms: [
      ["名词", "表示人、东西、地方的词，比如 apple、water、school。"],
      ["可数名词", "能一个一个数的东西：an apple、three dogs。单数前面要有 a / the / my 这样的小帽子。"],
      ["不可数名词", "没有固定边界、不能一个一个数的东西：water、bread、paper、homework。不加 -s。"],
      ["单数 / 复数", "单数：一个；复数：两个或更多，可数名词一般加 -s。"],
      ["冠词", "a / an（一个）、the（这个、那个），戴在名词前面的「小帽子」。"],
      ["量词（容器词）", "a glass of、a piece of、a cup of……给不可数的东西套上边界，就能数了。"],
      ["可信度徽章", "💡 记忆方法（一刀切）· ✂️ 简化说法（有些词两种用法都有，如 papers = 试卷 / 报纸）。"],
    ],
  },
];
WB_LAB.fp_boundedness.push(
  // ───────── 3-2 a 就是 one，the 就是 that（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_boundedness_classic.js（R1 零丢失）。右栏左移 30 给讲解员让位；「独一无二」单独一个镜头。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S, WOOD = k.C.brown;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：什么时候用 a，什么时候用 the？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "a = one · the = that", sub: "③ 物理边界感统摄律", badges: ["💡", "📜"], steps: ["① 小狗", "② a = one", "③ the = that", "④ 独一无二", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 公园里的小狗 ─────
      D.step(0); D.shot();
      P(k.wl(30, 300, 440, 300, .8), go(.5), .5, { color: C.green, w: 2.5 });
      T("park", 410, 324, go(.3), .3, { size: 15, color: C.green, font: M });
      const dog = (x, y) => {
        const g = D.sub();
        P(k.ellipse(x, y, 26, 14), go(.3), .3, { color: WOOD, w: 2.5 });
        P(k.ellipse(x + 28, y - 14, 11, 10), go(.25), .25, { color: WOOD, w: 2.5 });
        P(`M${x - 16},${y + 12} v14 M${x + 14},${y + 12} v14 M${x - 26},${y - 4} l-10,-8`, go(.25), .25, { color: WOOD, w: 2.5 });
        D.back(); return g;
      };
      N("", "公园里有好几只小狗。");
      const ds = [70, 170, 270, 370].map(x => dog(x, 262));
      k.act(me, "point", S.at - .6, 1.4, { at: [220, 262] });

      // ───── a = one ─────
      D.step(1);
      N("不定冠词 a / an：", "第一次说起，还没指定是哪一个，意思就是「一个」。");
      T("There is a dog in the park.", 470, 160, go(1.2), 1.2, { size: 21, color: C.ink, weight: 900, font: M });
      P(k.ellipse(184, 258, 52, 34), go(.6), .6, { color: C.red, w: 3 });
      T("a = one", 470, 194, go(.5), .5, { size: 22, color: C.red, weight: 900, font: M });
      T("随便圈一只，还没说是哪只", 590, 194, go(.7), .7, { size: 15, color: C.grey });
      k.wait(.6);
      sayAt("I see a dog in the park.", { zh: "我在公园里看见一只狗。" });
      sayAt("There is a dog in the park.", { zh: "公园里有一只狗。", word: "There is a dog in the park" });

      // ───── the = that ─────
      D.step(2);
      N("定冠词 the：", "说话的人和听的人都知道是哪一个，意思像「那个」。");
      const tg = D.sub();
      P(k.ellipse(184, 258, 30, 30) + " " + k.wl(140, 258, 228, 258, .2) + " " + k.wl(184, 214, 184, 302, .2), go(.01, 0), .01, { color: C.blue, w: 2 });
      D.back(); k.hide(tg);
      const tl = go(.8); k.fade(tg, tl, .6, 1);
      T("The dog is running.", 470, 260, go(1), 1, { size: 21, color: C.ink, weight: 900, font: M });
      T("the = that", 470, 294, go(.5), .5, { size: 22, color: C.blue, weight: 900, font: M });
      T("就是刚才那只！", 638, 294, go(.5), .5, { size: 15, color: C.grey });
      k.wait(.3);
      const syRun = sayAt("The dog is running.", { zh: "那只狗在跑。", word: "running" });
      k.move(ds[1], syRun.t, Math.max(1.4, syRun.dur), 0, -60); k.move(tg, syRun.t, Math.max(1.4, syRun.dur), 0, -60);
      k.actFx(["running"], syRun.t, Math.max(1.4, syRun.dur), "被圈住的那只小狗跑开");
      k.act(me, "point", syRun.t, Math.max(1.2, syRun.dur), { at: [184, 200] });
      k.wait(.4);
      sayAt("The dog is very cute.", { zh: "那只狗很可爱。" });
      sayAt("One dog. That dog. The moon.", { zh: "一只狗。那只狗。月亮。", word: "one that moon" });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 独一无二也用 the ─────
      D.step(3); D.shot();
      N("", "世界上只有一个的东西，大家都知道是哪个，也用 the。");
      const sun = k.ellipse(100, 200, 24, 24);
      P(sun, go(.4), .4, { color: C.red, w: 2.5 }); F(sun, go(.1, 0), { color: C.hlYellow, op: 1 });
      P(`M100,164 v-10 M100,236 v10 M64,200 h-10 M136,200 h10`, go(.3), .3, { color: C.red, w: 2.5 });
      T("the sun · the moon", 170, 208, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M });
      const sySun = sayAt("The sun is hot today.", { zh: "今天太阳很热。", word: "the sun" });
      k.act(me, "point", sySun.t, Math.max(1.2, sySun.dur), { at: [100, 200] });
      // 房间里唯一的门
      P(k.roughRect(80, 280, 260, 120), go(.6), .6, { color: C.grey, w: 2 });
      const door = D.sub(); P(k.roughRect(150, 300, 50, 100), go(.4), .4, { color: WOOD, w: 2.5 }); F(k.rectD(150, 300, 50, 100), go(.1, 0), { color: "#fde68a", op: 1 }); D.back();
      T("Open the door, please!", 380, 340, go(1), 1, { size: 20, color: C.ink, weight: 900, font: M });
      T("房间里就这一扇门", 380, 368, go(.5), .5, { size: 15, color: C.grey });
      k.wait(.4);
      const syDoor = sayAt("Open the door, please!", { zh: "请开门！", word: "Open door please" });
      k.act(me, "point", syDoor.t, Math.max(1.2, syDoor.dur), { at: [175, 350], words: ["open"] });
      k.squash(door, syDoor.t + .3, .5, .25, { cx: 150, cy: 350 });
      sayAt("An apple, an egg.", { zh: "一个苹果，一个鸡蛋。", word: "an" });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "第一次见用 a，大家都知道用 the。");
      P(k.roughRect(40, 420, 760, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：第一次见用 a，大家都知道用 the。", 60, 453, go(1), 1, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "先说「我有一只猫」，再说「这只猫是白的」。两个空各填 a 还是 the？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 I have ___ cat. ___ cat is white.", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "第一次说起用 a；再说起，大家都知道是哪只了，用 the。");
      const tRev = go(.3);
      T("a cat → The cat —— 第一次 a，再提 the", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("I have a cat. The cat is white.", { zh: "我有一只猫。这只猫是白色的。", word: "I have cat white" });
      D.hold(2);

      k.quoteCard({ insight: "a / an = 一个（第一次说，随便一个）；\nthe = 那个（双方都知道是哪个）", rhyme: "口诀：第一次见用 a，大家都知道用 the。", hlLines: 2, foot: "🧠 第一性原理 ③ 物理边界感统摄律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "running", act: "被圈住的小狗在读到「The dog is running」时跑开（场景动作 actFx），讲解员指着它" },
      { word: "open", act: "讲解员指着门，门一晃（point + squash），与「Open the door」同步" },
    ],
    terms: [
      ["不定冠词", "a / an：第一次提到、不特指哪一个，意思是「一个」。它本来就是从 one 变来的。"],
      ["定冠词", "the：说话双方都知道是哪一个，意思像 that「那个」。"],
      ["可信度徽章", "💡 记忆方法（a = one、the = that）· 📜 有出处的历史（Etymonline「a」「the」：a/an 来自古英语 ān「一」；the 来自古英语指示词，古英语里 the 和 that 不分）。"],
    ],
  },
);
WB_LAB.fp_boundedness.push(
  // ───────── 3-3 go to school vs go to the school（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_boundedness_classic.js（R1 零丢失）。原左（楼房）右（成对例子）两半拆成两个镜头；例子两栏左移给讲解员让位。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：go to school 和 go to the school，差一个 the，意思差多少？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "go to school vs go to the school", sub: "③ 物理边界感统摄律", badges: ["💡", "✂️"], steps: ["① 那栋楼", "② 去上学", "③ 床 · 车", "④ 球 · 医院", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 学校楼房：外壳 vs 功能 ─────
      D.step(0); D.shot();
      const shell = D.sub();
      const bd = "M120,270 L120,170 L210,120 L300,170 L300,270 Z";
      P(bd, go(1), 1, { color: C.blue, w: 3 }); F(bd, go(.2, 0), { color: C.tintBlue, op: 1 });
      P(k.roughRect(190, 220, 40, 50), go(.3), .3, { color: C.blue, w: 2 });
      P(k.roughRect(140, 186, 30, 24) + " " + k.roughRect(250, 186, 30, 24), go(.3), .3, { color: C.blue, w: 2 });
      T("SCHOOL", 210, 166, go(.4), .4, { size: 14, color: C.blue, weight: 900, font: M, anchor: "middle" });
      D.back();
      P(k.wl(40, 270, 520, 270, .6), go(.3), .3, { color: C.grey, w: 2 });
      N("加 the：", "说的是看得见、摸得着的那栋楼——有边界的实物。");
      T("go to the school", 40, 320, go(.8), .8, { size: 22, color: C.blue, weight: 900, font: M });
      T("家长去学校那栋楼开会", 40, 348, go(.6), .6, { size: 15, color: C.grey });
      const hl = D.sub(); P("M114,276 L114,166 L210,112 L306,166 L306,276 Z", go(.01, 0), .01, { color: C.red, w: 5 }); D.back(); k.hide(hl);
      const gMum = D.sub(); const mum = k.actor("traveler", { x: 470, y: 270, s: .5, f: -1, g: gMum }); D.back();
      const t1 = go(.6); k.fade(hl, t1, .4, 1);
      k.act(me, "point", t1, 1.4, { at: [210, 200] });
      const syMum = sayAt("Mum goes to the school.", { zh: "妈妈去学校（那栋楼）。", word: "goes to the school" });
      k.act(mum, "walk", syMum.t, Math.max(1.6, syMum.dur + .4), { to: 330, words: ["go", "goes"] });
      k.wait(.4);
      sayAt("The school is very big.", { zh: "那所学校很大。" });

      // ───── 去上学：外壳淡掉，功能（书本 + 铅笔）出现 ─────
      D.step(1);
      N("零冠词：", "什么冠词都不加。这时说的是「做这件事」，不是那栋楼。");
      const t2 = go(1.4); k.fade(shell, t2, 1, .15); k.fade(hl, t2, 1, 0); k.fade(gMum, t2, 1, 0);
      const fn = D.sub();
      P(k.roughRect(176, 170, 70, 52), go(.01, 0), .01, { color: C.red, w: 3 });
      P("M211,170 L211,222", go(.01, 0), .01, { color: C.red, w: 2 });
      P("M262,226 l26,-60 l8,4 l-26,60 Z", go(.01, 0), .01, { color: C.blue, w: 2.5 });
      D.back(); k.hide(fn); const tFn = go(.8); k.fade(fn, tFn, .8, 1); k.squash(fn, tFn + .8, .3, .14, { cx: 230, cy: 200 });
      k.hlText("go to school", 40, 392, 22, { mono: true });
      T("go to school", 40, 392, go(.7), .7, { size: 22, color: C.red, weight: 900, font: M });
      T("去上学（读书、上课这件事）", 40, 420, go(.7), .7, { size: 15, color: C.grey });
      k.wait(.5);
      const syGo = sayAt("I go to school by bus.", { zh: "我坐公交车去上学。", word: "go to school" });
      const bk = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", syGo.t, Math.max(1.4, syGo.dur), { prop: bk });
      sayAt("Go to school. Go to the school.", { zh: "去上学。去那所学校（那栋楼）。", word: "go to the school" });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 更多成对例子 ─────
      D.step(2); D.shot();
      k.head("看得见的实物", 60, 132, C.blue, "start", 18);
      k.head("只讲做什么事", 420, 132, C.red, "start", 18);
      P(k.wl(400, 116, 400, 420, .5), go(.4), .4, { color: C.grey, w: 1.6 });
      const pair = (a, za, b, zb, y) => {
        T(a, 60, y, go(.5), .5, { size: 19, color: C.blue, weight: 900, font: M });
        T(za, 60, y + 22, go(.4), .4, { size: 13, color: C.grey });
        T(b, 420, y, go(.5), .5, { size: 19, color: C.red, weight: 900, font: M });
        T(zb, 420, y + 22, go(.4), .4, { size: 13, color: C.grey });
      };
      N("", "同样：on the bed 是在床这件家具上面；in bed 是在睡觉。");
      pair("on the bed", "在床（家具）上", "in bed", "在睡觉", 180);
      k.act(me, "point", S.at - .5, 1.2, { at: [420, 180] });
      sayAt("The cat is on the bed. I am in bed.", { zh: "猫在床上。我在睡觉。", word: "on the bed in bed a" });
      N("", "on a bus 是在一辆车里；by bus 是坐公交这种方式。");
      pair("on a bus", "在一辆公交车上", "by bus", "坐公交（方式）", 250);
      sayAt("I am on a bus. I go by bus.", { zh: "我在一辆公交车上。我坐公交车去。", word: "on a bus by bus" });
      D.step(3);
      N("", "buy a football 是买一个球；play football 是踢足球这项运动。");
      pair("buy a football", "买一个足球", "play football", "踢足球（运动）", 320);
      pair("to the hospital", "去医院大楼（探望）", "in hospital", "住院治病", 390);
      k.wait(.6);
      sayAt("Buy a football. Play football.", { zh: "买一个足球。踢足球。", word: "buy a football" });
      const syPlay = sayAt("Let's play football after school.", { zh: "放学后我们去踢足球吧。", word: "play football" });
      k.act(me, "jump", syPlay.t, Math.max(1.2, syPlay.dur), { words: ["play"] });
      k.expr(me, "happy", syPlay.t, Math.max(1.2, syPlay.dur));
      const syHos = sayAt("Mum goes to the hospital.", { zh: "妈妈去那家医院。", word: "to the hospital hospital" });
      k.act(me, "point", syHos.t, Math.max(1.2, syHos.dur), { at: [60, 390] });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "说楼房加 the，说上学不加。");
      P(k.roughRect(40, 440, 760, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：说楼房加 the，说上学不加。", 60, 473, go(1), 1, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "晚上十点，该去睡觉了。bed 前面要不要加 the？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 Time to go to ___ bed.　→　加 the 吗？", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "睡觉是一件事，不是那张床：go to bed，不加 the。");
      const tRev = go(.3);
      T("go to bed —— 睡觉这件事，不加 the", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("It's ten o'clock. Time to go to bed.", { zh: "十点了，该睡觉了。", word: "time go to bed" });
      D.hold(2);

      k.quoteCard({ insight: "加冠词 = 看得见的实物（外壳）；\n不加冠词 = 做这件事（功能）", rhyme: "口诀：说楼房加 the，说上学不加。", hlLines: 2, foot: "🧠 第一性原理 ③ 物理边界感统摄律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "goes", act: "妈妈（traveler）在读到「Mum goes to the school」时走向学校大楼" },
      { word: "go", act: "讲解员捧书读（read）表示上学这件事，与「I go to school by bus」同步；妈妈走向学校同上" },
      { word: "play", act: "讲解员在读到「play football」时跳起来、开心（jump + happy）" },
    ],
    r2skip: ["vs"],   // 白板上的对比符号 vs，不是要读的词
    terms: [
      ["零冠词", "名词前面什么冠词都不加，如 go to school、play football。说的是活动和功能，不是具体的东西。"],
      ["可信度徽章", "💡 记忆方法（外壳 / 功能）· ✂️ 简化说法（英美用法有差别，如美式常说 in the hospital）。"],
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
      k.say("Look! Two chickens are running.", { zh: "看！两只小鸡在跑。", word: "chickens" });
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
      k.say("I like chicken for dinner.", { zh: "我晚饭喜欢吃鸡肉。", word: "chicken" });
      N("", "a glass 是一个玻璃杯；made of glass 是玻璃这种材料。");
      pair("a glass", "一个玻璃杯", "made of glass", "玻璃做的（材料）", 170);
      N("", "a room 是一个房间；make room for you 是腾出地方。");
      pair("a room", "一个房间", "make room", "腾出空间", 245);
      N("", "two fish 是两条鱼；some fish 是一些鱼肉。");
      pair("two fish", "两条鱼", "some fish", "一些鱼肉", 320);
      T("看它在句子里有没有完整边界，一秒判断", 510, 400, go(1), 1, { size: 15, color: C.orange, weight: 900 });
      k.wait(.6);
      k.say("I can see two fish in the river.", { zh: "我能看见河里有两条鱼。" });
      N("口诀：", "整只能数，切成肉就不数。");
      // R2 补朗读（2026-10-29，旧幕推广 P2）：画面上的英文词单读 + 例句
      k.say("A chicken, three chickens.", { zh: "一只鸡，三只鸡。", word: "a three" });
      k.say("A glass. The window is made of glass.", { zh: "一个玻璃杯。窗户是玻璃做的。", word: "glass made of made of glass" });
      k.say("A room. I can make room for you.", { zh: "一个房间。我可以给你腾个地方。", word: "room make for you make room for you" });
      k.say("Two fish. Some fish, please.", { zh: "两条鱼。请来一些鱼肉。", word: "two fish some" });
      D.fin("同一个词：有完整外壳边界 → 可数；变成肉、材料、空间 → 不可数", "口诀：整只能数，切成肉就不数。");
      k.wait(2);
    },
    terms: [],
  },
);
