// ==================== 第一性原理 ② 字母象形与音义同源簇（fp_iconicity）====================
// 4 幕 = FIRST_PRINCIPLES_DB[1].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
// v2 升级（2026-10-30 起，决策 24）：第 1–4 幕已升引擎 v2 + 讲解员；升级前整份文件原样保存在 cases/fp_iconicity_classic.js。依赖 wo_props + fp_props。
// 讲法提醒（HANDOFF §4）：字母象形、音义簇多是「帮助记忆的联想」，字幕用「可以想成 / 像」；tw- = two 是真词源。
WB_LAB.fp_iconicity = [
  // ───────── 2-1 M / S / B / C 像什么？（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_iconicity_classic.js（R1 零丢失）。原一排四个字母拆成两个镜头（M · S / B · C），给讲解员让位；配色收进 V3 四色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S, WOOD = k.C.brown;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：把字母当成一幅画，帮你一次记住一串词。");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "字母像一幅画", sub: "② 字母象形与音义同源簇", badges: ["💡"], steps: ["① M 山", "② S 蛇", "③ B 包", "④ C 抓", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);
      const xs = [190, 520];
      const letter = (ch, x, color) => { const g = D.sub(); T(ch, x, 260, go(.6), .6, { size: 120, color, weight: 900, font: M, anchor: "middle" }); D.back(); return g; };
      const words = (x, list, color) => list.forEach((w, i) => T(w, x, 326 + i * 32, go(.5), .5, { size: 19, color: i ? C.ink : color, weight: 900, font: M, anchor: "middle" }));

      // ───── 镜头 1 · M 和 S ─────
      D.step(0); D.shot();
      N("象形：", "照着东西的样子画出来的符号。英文字母最早也是从图画变来的。");
      k.wait(.3);
      N("", "M 可以想成两座山峰，也像合起来的上下嘴唇。");
      const gM = letter("M", xs[0], C.blue);
      k.fade(gM, go(.5), .5, .18);
      const mt = `M${xs[0] - 60},260 L${xs[0] - 30},180 L${xs[0]},230 L${xs[0] + 30},175 L${xs[0] + 60},260`;
      P(mt, go(1), 1, { color: C.green, w: 4 });
      P(`M${xs[0] - 40},225 l10,-5 l10,6 M${xs[0] + 20},220 l10,-6 l10,6`, go(.4), .4, { color: C.grey, w: 2.5 });
      words(xs[0], ["mountain 山", "mouth 嘴", "mother 妈妈"], C.blue);
      k.wait(.3);
      const syMt = sayAt("Look at the big mountain!", { zh: "看那座大山！", word: "mountain" });
      k.act(me, "point", syMt.t, Math.max(1.2, syMt.dur), { at: [xs[0], 210], words: ["look"] });
      const syMo = sayAt("Mouth, mother. Open your mouth, Mother!", { zh: "嘴，妈妈。妈妈，张开嘴！", word: "mouth mother" });
      k.act(me, "surprised", syMo.t + syMo.dur * .5, 1.2, { words: ["open"] }); k.expr(me, "surprised", syMo.t + syMo.dur * .5, 1.4);

      D.step(1);
      N("", "S 弯弯曲曲，像一条蛇，也像水波和笑起来的嘴。");
      const gS = letter("S", xs[1], C.green);
      k.fade(gS, go(.5), .5, .18);
      const snake = D.sub();
      P(`M${xs[1] + 30},180 C${xs[1] - 40},160 ${xs[1] - 50},215 ${xs[1]},220 C${xs[1] + 50},225 ${xs[1] + 40},280 ${xs[1] - 34},260`, go(1), 1, { color: C.green, w: 6 });
      P(k.ellipse(xs[1] + 30, 180, 6, 5), go(.2), .2, { color: C.red, w: 3 });
      D.back();
      words(xs[1], ["snake 蛇", "swim 游泳", "smile 微笑"], C.green);
      k.wait(.3);
      const sySn = sayAt("A snake swims in the sea.", { zh: "一条蛇在海里游。", word: "snake" });
      k.buzz(snake, sySn.t, Math.max(1.2, sySn.dur), 3); k.move(snake, sySn.t, Math.max(1.2, sySn.dur), 40, 0);
      k.actFx(["swims"], sySn.t, Math.max(1.2, sySn.dur), "蛇扭着身子往前游");
      const sySm = sayAt("Swim and smile. I smile when I swim.", { zh: "游泳，微笑。我游泳的时候会笑。", word: "swim smile" });
      k.expr(me, "happy", sySm.t, Math.max(1.4, sySm.dur));
      k.act(me, "nod", sySm.t + .3, .8);
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · B 和 C ─────
      D.step(2); D.shot();
      N("", "B 像两个鼓鼓的包，能装东西：包、盒子、床……");
      const gB = letter("B", xs[0], C.blue);
      k.fade(gB, go(.5), .5, .18);
      const bag = `M${xs[0] - 40},200 h80 l10,60 h-100 Z`;
      P(bag, go(.8), .8, { color: WOOD, w: 3.5 }); F(bag, go(.2, 0), { color: C.hlYellow, op: .6 });
      P(`M${xs[0] - 20},200 C${xs[0] - 20},170 ${xs[0] + 20},170 ${xs[0] + 20},200`, go(.4), .4, { color: WOOD, w: 3.5 });
      words(xs[0], ["bag 包", "box 盒子", "bed 床"], C.blue);
      k.wait(.3);
      const bk = k.prop("book", 0, 0, { hidden: true });
      const syBag = sayAt("Put the book in the bag.", { zh: "把书放进书包里。", word: "bag" });
      k.act(me, "read", syBag.t - 1.2, 1.2, { prop: bk, release: false });
      k.act(me, "put", syBag.t, Math.max(1.2, syBag.dur), { prop: bk, words: ["put"] });
      sayAt("Box, bed. The box is on the bed.", { zh: "盒子，床。盒子在床上。", word: "box bed" });

      D.step(3);
      N("", "C 像一只弯起来的手，去抓、去握：杯子、帽子、抓住。");
      const gC = letter("C", xs[1], C.red);
      k.fade(gC, go(.5), .5, .18);
      const cup = `M${xs[1] - 30},190 L${xs[1] - 22},260 L${xs[1] + 22},260 L${xs[1] + 30},190`;
      P(cup, go(.7), .7, { color: C.blue, w: 3.5 });
      P(`M${xs[1] + 28},205 c22,0 22,34 -4,36`, go(.4), .4, { color: C.blue, w: 3.5 });
      words(xs[1], ["cup 杯子", "cap 帽子", "catch 抓住"], C.red);
      k.wait(.5);
      T("这是帮你记单词的联想：看字母的样子，想起一串词。", 40, 444, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      const cc = k.prop("card", 0, 0, { hidden: true, text: "cup" });
      const syCt = sayAt("Catch the cup, please!", { zh: "请接住杯子！", word: "catch" });
      k.act(me, "holdCard", syCt.t, Math.max(1.2, syCt.dur + .3), { prop: cc, words: ["catch"] });
      sayAt("Cup, cap. My cap is red. This cup is blue.", { zh: "杯子，帽子。我的帽子是红色的。这个杯子是蓝色的。", word: "cup cap" });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "M 是山，S 是蛇，B 是包，C 来抓。");
      P(k.roughRect(40, 466, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：M 是山，S 是蛇，B 是包，C 来抓。", 60, 496, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "B 像鼓鼓的包，能装东西。box 和 cup，哪个能用 B 的画面记？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 B 像包　→　box 还是 cup？", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "box 以 B 开头，盒子也能装东西；cup 是 C 家族。");
      const tRev = go(.3);
      T("box —— B 是包，能装东西；cup 归 C 来抓", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Put the ball in the box.", { zh: "把球放进盒子里。", word: "box ball" });
      D.hold(2);

      k.quoteCard({ insight: "看字母的形状，联想画面，\n一个字母串起一串词", rhyme: "口诀：M 是山，S 是蛇，B 是包，C 来抓。", hlLines: 2, foot: "🧠 第一性原理 ② 字母象形与音义同源簇" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "look", act: "讲解员指着画出来的山（point），与「Look at the big mountain」同步" },
      { word: "open", act: "讲解员吃惊张嘴（surprised），与「Open your mouth」同步" },
      { word: "swims", act: "蛇在读到「A snake swims」时扭着身子往前游（场景动作 actFx + buzz + move）" },
      { word: "put", act: "讲解员捧着书放下去（read → put），与「Put the book in the bag」同步" },
      { word: "catch", act: "讲解员接住并举起 cup 词卡（holdCard），与「Catch the cup」同步" },
    ],
    terms: [
      ["字母", "英语的 26 个书写符号 A–Z。它们最早是从古代的图画文字（腓尼基字母）演变来的。"],
      ["象形", "照着东西的样子画出来。这里用字母的形状帮忙联想记词，不是每个词真的从字母形状来。"],
      ["辅音丛", "两三个辅音字母连在一起读，如 fl-、str-、sp-。"],
      ["词源", "一个词最早从哪里来、怎么变成今天的样子。"],
      ["音义联想", "某些开头的声音常和某种感觉一起出现，如 fl- 常和「飞、飘」有关。是规律倾向，有例外。"],
      ["可信度徽章", "💡 记忆联想：M=山、S=蛇、B=包、C=抓是帮助记忆的画面，mountain、snake、bag 这些词和字母形状没有历史关系。"],
    ],
  },
];
WB_LAB.fp_iconicity.push(
  // ───────── 2-2 fl- 飘 · gl- 亮 · sl- 滑（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_iconicity_classic.js（R1 零丢失）。原一排三列拆成两个镜头（fl- · gl- / sl-），给讲解员让位；配色收进 V3 四色。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S, WOOD = k.C.brown;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：fly、flag、flower 开头都是 fl-，是巧合吗？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "fl- 飘 · gl- 亮 · sl- 滑", sub: "② 字母象形与音义同源簇", badges: ["💡", "⚠️"], steps: ["① fl- 飘", "② gl- 亮", "③ sl- 滑", "④ 例外", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);
      const list = (x, pre, rest, color) => rest.forEach(([w, zh], i) => {
        FP.parts([[pre, color], [w, C.ink]], x - 80, 340 + i * 32, 20);
        T(zh, x + 56, 340 + i * 32, go(.3), .3, { size: 15, color: C.grey });
      });

      // ───── 镜头 1 · fl- 和 gl- ─────
      D.step(0); D.shot();
      const xs = [190, 540];
      N("辅音丛：", "两三个辅音字母连在一起读，比如 fl-、gl-、sl-。");
      T("fl-", xs[0], 140, go(.4), .4, { size: 34, color: C.blue, weight: 900, font: M, anchor: "middle" });
      N("", "读 fl- 时，上牙碰下唇吹一口气——可以想成风把东西吹得飘起来。");
      P(`M${xs[0] - 110},200 q20,-8 40,0 M${xs[0] - 110},220 q20,-8 40,0 M${xs[0] - 110},240 q20,-8 40,0`, go(.8), .8, { color: C.grey, w: 2.5 });
      P(k.wl(xs[0], 290, xs[0], 180, .4), go(.4), .4, { color: WOOD, w: 4 });
      const flag = D.sub(); const fd = `M${xs[0] + 2},184 C${xs[0] + 30},170 ${xs[0] + 50},200 ${xs[0] + 80},186 L${xs[0] + 80},226 C${xs[0] + 50},240 ${xs[0] + 30},210 ${xs[0] + 2},224 Z`;
      P(fd, go(.6), .6, { color: C.blue, w: 3 }); F(fd, go(.1, 0), { color: C.tintBlue, op: 1 }); D.back();
      k.rot(flag, go(.01, 0), .01, 0, xs[0], 204);
      list(xs[0], "fl", [["y", "飞"], ["ag", "旗子"], ["ower", "花"]], C.blue);
      k.wait(.3);
      const syFl = sayAt("The flag flies in the wind.", { zh: "旗子在风中飘扬。", word: "flag" });
      k.buzz(flag, syFl.t, Math.max(1.4, syFl.dur), 3);
      k.actFx(["flies"], syFl.t, Math.max(1.4, syFl.dur), "旗子在风里飘起来");
      k.act(me, "point", syFl.t, Math.max(1.2, syFl.dur), { at: [xs[0] + 40, 204] });
      const syFl2 = sayAt("Fl. Fly, flag, flower. Birds fly over the flowers.", { zh: "fl。飞、旗子、花。鸟儿飞过花丛。", word: "fl fly flag flower", blocks: ["fl"] });
      k.act(me, "jump", syFl2.t + syFl2.dur * .5, 1.1, { words: ["fly"] });

      D.step(1);
      T("gl-", xs[1], 140, go(.4), .4, { size: 34, color: C.red, weight: 900, font: M, anchor: "middle" });
      N("", "gl- 可以想成光滑、闪亮：透明的玻璃、眉开眼笑。");
      const gl = `M${xs[1] - 30},180 L${xs[1] - 22},280 L${xs[1] + 22},280 L${xs[1] + 30},180`;
      P(gl, go(.7), .7, { color: C.blue, w: 3 });
      const sp = D.sub(); P(`M${xs[1] + 50},190 l6,14 l14,6 l-14,6 l-6,14 l-6,-14 l-14,-6 l14,-6 Z M${xs[1] - 56},230 l4,9 l9,4 l-9,4 l-4,9 l-4,-9 l-9,-4 l9,-4 Z`, go(.5), .5, { color: C.red, w: 2.5 }); D.back();
      const ts = go(1.6); k.fade(sp, ts, .4, .2); k.fade(sp, ts + .5, .4, 1); k.fade(sp, ts + 1, .4, .2); k.fade(sp, ts + 1.4, .3, 1);
      list(xs[1], "gl", [["ass", "玻璃"], ["ad", "高兴的"]], C.red);
      k.wait(.3);
      const syGl = sayAt("I am glad to see you.", { zh: "见到你我很高兴。", word: "glad" });
      k.act(me, "wave", syGl.t, Math.max(1.2, syGl.dur)); k.expr(me, "happy", syGl.t, Math.max(1.4, syGl.dur));
      sayAt("Gl. Glass, glad. The glass is clean.", { zh: "gl。玻璃、高兴的。玻璃杯很干净。", word: "gl glass glad", blocks: ["gl"] });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · sl- 滑 + 例外 ─────
      D.step(2); D.shot();
      const x2 = 240;
      T("sl-", x2, 140, go(.4), .4, { size: 34, color: C.green, weight: 900, font: M, anchor: "middle" });
      N("", "sl- 可以想成轻轻地滑下去：滑梯、慢慢地、滑进梦里。");
      P(`M${x2 - 80},190 L${x2 - 60},190 C${x2 - 10},200 ${x2 + 20},280 ${x2 + 90},282`, go(.8), .8, { color: C.green, w: 4 });
      P(k.wl(x2 - 70, 190, x2 - 70, 290, .3), go(.3), .3, { color: C.green, w: 3 });
      const bl = D.sub(); const bd = `M${x2 - 74},178 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0`;
      P(bd, go(.2), .2, { color: C.red, w: 2 }); F(bd, go(.1, 0), { color: C.tintRed, op: 1 }); D.back();
      list(x2, "sl", [["ide", "滑梯"], ["ow", "慢的"], ["eep", "睡觉"]], C.green);
      k.wait(.3);
      const sySl = sayAt("Go down the slide slowly.", { zh: "慢慢地滑下滑梯。", word: "slide" });
      k.arc(bl, sySl.t, Math.max(1.6, sySl.dur), `M0,0 L14,0 C64,10 94,90 158,92`);
      k.actFx(["go"], sySl.t, Math.max(1.6, sySl.dur), "小球沿滑梯慢慢滑下去");
      k.act(me, "point", sySl.t, Math.max(1.2, sySl.dur), { at: [x2 + 20, 240] });
      sayAt("Sl. Slide, slow, sleep. The snail is slow. The cat is sleeping.", { zh: "sl。滑梯、慢的、睡觉。蜗牛很慢。小猫在睡觉。", word: "sl slide slow sleep", blocks: ["sl"] });

      D.step(3);
      T("这是帮助记忆的规律倾向，也有例外（比如 floor 地板）。", 40, 452, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      P(k.roughRect(470, 200, 300, 90), go(.6), .6, { color: C.red, w: 2.4 });
      T("⚠️ floor", 490, 240, go(.5), .5, { size: 24, color: C.red, weight: 900, font: M });
      T("地板：不飘也不飞", 490, 272, go(.5), .5, { size: 15, color: C.grey });
      const syFlr = sayAt("Floor. The ball is on the floor.", { zh: "地板。球在地板上。", word: "floor" });
      k.act(me, "surprised", syFlr.t, 1.2); k.expr(me, "oops", syFlr.t, 1.5);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "fl 飞，gl 亮，sl 滑下来。");
      P(k.roughRect(40, 470, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：fl 飞，gl 亮，sl 滑下来。", 60, 500, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "sl- 像滑下去。冰面上 slip 一下，是滑倒，还是跳起来？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 slip　→　滑倒？还是跳起来？", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "slip 是脚下一滑——sl- 滑下来。");
      const tRev = go(.3);
      T("slip = 滑倒 —— sl- 滑下来", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Be careful! Don't slip on the ice.", { zh: "小心！别在冰上滑倒。", word: "slip ice" });
      D.hold(2);

      k.quoteCard({ insight: "开头的辅音丛常常带着同一种感觉：\n一个声音串起一串词", rhyme: "口诀：fl 飞，gl 亮，sl 滑下来。", hlLines: 2, foot: "🧠 第一性原理 ② 字母象形与音义同源簇" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "flies", act: "旗子在读到「The flag flies」时飘动（场景动作 actFx + buzz），讲解员指着它" },
      { word: "fly", act: "讲解员在读到「Birds fly」时跳起来（jump）" },
      { word: "go", act: "小球在读到「Go down the slide」时沿滑梯滑下（场景动作 actFx + arc）" },
    ],
    r2skip: ["ag", "ower", "ass", "ad", "ide", "ow", "eep"],   // 辅音丛后面的词尾残片（fl|ag、gl|ass、sl|ide 拆开展示），整词已朗读
    terms: [
      ["可信度徽章", "💡 音义联想是规律倾向（语言学叫「音义联觉」），⚠️ 有很多例外，如 floor、flower 的 fl- 没有「飞」的来源。"],
    ],
  },
);
WB_LAB.fp_iconicity.push(
  // ───────── 2-3 str- 绷直 · sp- 向外（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_iconicity_classic.js（R1 零丢失）。原左（str-）右（sp-）两半拆成两个镜头；橙色改 V3 四色（str- 红 · sp- 蓝）。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S, WOOD = k.C.brown;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：straight、street、strong、strict，一个画面记住四个难词。");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "str- 绷直 · sp- 向外", sub: "② 字母象形与音义同源簇", badges: ["💡", "⚠️"], steps: ["① 拉紧绳子", "② str- 四兄弟", "③ sp- 喷出", "④ sp- 四兄弟", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · str- 拉紧的绳子 ─────
      D.step(0); D.shot();
      T("str-", 40, 140, go(.4), .4, { size: 34, color: C.red, weight: 900, font: M });
      N("", "str- 三个辅音挤在一起，读起来很用力——可以想成一根拉紧的绳子。");
      const loose = D.sub(); P(`M80,220 C140,180 180,270 240,220 C300,170 340,260 400,220`, go(1), 1, { color: WOOD, w: 4 }); D.back();
      const tight = D.sub(); P(k.wl(80, 220, 400, 220, .2), go(.01, 0), .01, { color: C.red, w: 4 }); D.back(); k.hide(tight);
      P(k.ellipse(70, 220, 10, 10) + " " + k.ellipse(410, 220, 10, 10), go(.4), .4, { color: C.ink, w: 3 });
      const tp = go(1.2); k.fade(loose, tp, .8, 0); k.fade(tight, tp + .2, .8, 1); k.sfx("pop", tp + .6);
      k.act(me, "surprised", tp + .3, 1); 
      k.arrow(64, 252, 24, 252, C.red); k.arrow(416, 252, 456, 252, C.red);
      T("拉紧 → 又直又有力", 240, 274, go(.6), .6, { size: 16, color: C.red, weight: 900, anchor: "middle" });
      D.step(1);
      N("", "笔直的、笔直的大街、肌肉绷紧的强壮、要求严格——都是「拉紧的直线」。");
      const row = (w, zh, y) => { FP.parts([["str", C.red], [w, C.ink]], 60, y, 22); T(zh, 260, y, go(.4), .4, { size: 16, color: C.grey }); };
      row("aight", "笔直的", 320); row("eet", "（笔直的）大街", 354); row("ong", "强壮的（肌肉绷紧）", 388); row("ict", "严格的（要求绷紧）", 422);
      k.wait(.5);
      const sySt = sayAt("Walk straight along the street.", { zh: "沿着这条街一直走。", word: "straight" });
      k.act(me, "walk", sySt.t, Math.max(1.2, sySt.dur * .7), { to: 840, words: ["walk"] });
      k.act(me, "walk", sySt.t + Math.max(1.2, sySt.dur * .7) + .2, 1, { to: 892 });
      sayAt("Str. Straight, street, strong, strict.", { zh: "str。笔直的、大街、强壮的、严格的。", word: "str straight street strong strict", blocks: ["str"] });
      const syStr = sayAt("He is strong. Our teacher is strict.", { zh: "他很强壮。我们的老师很严格。", word: "strong strict" });
      k.act(me, "cheer", syStr.t, 1.1); k.expr(me, "proud", syStr.t, 1.4);
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · sp- 向外喷 ─────
      D.step(2); D.shot();
      T("sp-", 40, 140, go(.4), .4, { size: 34, color: C.blue, weight: 900, font: M });
      N("", "sp- 读的时候气流「噗」地往外喷——可以想成向四面八方发散。");
      const cx = 240, cy = 230;
      const dot = `M${cx - 8},${cy} a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0`;
      P(dot, go(.3), .3, { color: C.blue, w: 2 }); F(dot, go(.1, 0), { color: C.blue, op: 1 });
      const rays = D.sub();
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; P(k.wl(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18, cx + Math.cos(a) * 62, cy + Math.sin(a) * 50, .3), go(.15), .15, { color: C.blue, w: 3 }); }
      D.back();
      D.step(3);
      N("", "声音向外说、活力向外放、向外延展的太空、万物冒头的春天。");
      const row2 = (w, zh, y) => { FP.parts([["sp", C.blue], [w, C.ink]], 60, y, 22); T(zh, 230, y, go(.4), .4, { size: 16, color: C.grey }); };
      row2("eak", "说话（声音向外）", 320); row2("ort", "运动（活力向外）", 354); row2("ace", "太空（向外延展）", 388); row2("ring", "春天（万物冒头）", 422);
      k.wait(.5);
      T("帮助记忆的联想", 800, 452, go(.5), .5, { size: 13, color: C.grey, anchor: "end" });
      const sySp = sayAt("Flowers come out in spring.", { zh: "春天花开了。", word: "spring" });
      k.squash(rays, sySp.t, Math.max(1, sySp.dur), .2, { cx, cy });
      k.actFx(["come"], sySp.t, Math.max(1, sySp.dur), "放射线再向外喷一次（花冒出来）");
      sayAt("Sp. Speak, sport, space, spring.", { zh: "sp。说话、运动、太空、春天。", word: "sp speak sport space spring", blocks: ["sp"] });
      const sySpk = sayAt("Speak English. I like sport. Look at space!", { zh: "说英语。我喜欢运动。看看太空！", word: "speak sport space" });
      k.act(me, "point", sySpk.t + sySpk.dur * .6, 1.2, { at: [cx, cy], words: ["look"] });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "str 拉直线，sp 往外喷。");
      P(k.roughRect(40, 466, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：str 拉直线，sp 往外喷。", 60, 496, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "str- 像拉紧的绳子。string 是绳子，还是杯子？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 string　→　绳子？还是杯子？", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "string 是细绳、琴弦——一拉就绷直。");
      const tRev = go(.3);
      T("string = 绳子 —— str- 拉直线", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("I have a long string.", { zh: "我有一根长绳子。", word: "string long" });
      D.hold(2);

      k.quoteCard({ insight: "str- 像拉紧的直线，sp- 像向外喷发：\n一个画面串起四个词", rhyme: "口诀：str 拉直线，sp 往外喷。", hlLines: 2, foot: "🧠 第一性原理 ② 字母象形与音义同源簇" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "walk", act: "讲解员在读到「Walk straight」时往前走一段再回来（walk）" },
      { word: "come", act: "sp- 放射线在读到「Flowers come out」时再向外喷一次（场景动作 actFx + squash）" },
      { word: "look", act: "讲解员指着向外发散的图（point），与「Look at space」同步" },
    ],
    r2skip: ["aight", "eet", "ong", "ict", "eak", "ort", "ace", "ring"],   // str|aight、sp|eak 拆开展示的词尾残片，整词已朗读
    terms: [
      ["可信度徽章", "💡 音义联想（拉紧 / 向外喷）是帮助记忆的画面；⚠️ 有例外：sport 是 disport（消遣、玩耍）的缩短形式，sp- 并不是「向外」的来源（Etymonline「sport」https://www.etymonline.com/word/sport）。"],
    ],
  },
);
WB_LAB.fp_iconicity.push(
  // ───────── 2-4 tw- 家族都等于 2（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_iconicity_classic.js（R1 零丢失）。原一棵五叉树拆成两个镜头（数字：twelve / twenty / twice；人：twin / between）。
  // R3 更正（已打开 Etymonline「between」「twelve」核对）：between 来自古英语 betweonum = bi-「by 旁边」+ tweonum「两个两个」，原讲法「be + twain」不够准确，保留原句作小字说明。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S, WOOD = k.C.brown;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：为什么 12 是 twelve，20 是 twenty？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "tw- 家族都等于 2", sub: "② 字母象形与音义同源簇", badges: ["📜"], steps: ["① two = 2", "② 12 · 20", "③ 两次", "④ 双胞胎 · 之间", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · two 长出数字家族 ─────
      D.step(0); D.shot();
      N("词源：", "一个词最早从哪里来。tw- 这一家，祖先都是数字 two（2）！");
      const cx = 360;
      FP.parts([["tw", C.red], ["o = 2", C.ink]], cx - 80, 160, 40);
      k.hlText("tw", cx - 80, 160, 40, { mono: true });
      const xs = [130, 360, 590];
      const leaf = (i, w, zh) => {
        P(k.wl(cx, 178, xs[i], 232, .6), go(.4), .4, { color: C.grey, w: 2 });
        FP.parts([["tw", C.red], [w.slice(2), C.ink]], xs[i] - w.length * 13.2 / 2, 264, 22);
        T(zh, xs[i], 294, go(.5), .5, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      };
      D.step(1);
      N("", "twelve：十个手指再加 2 个，就是 12。");
      leaf(0, "twelve", "12 = 2 + 10");
      T("🖐🖐 + ✌", xs[0], 360, go(.5), .5, { size: 24, color: C.ink, anchor: "middle" });
      N("", "twenty：2 个 10，就是 20。");
      leaf(1, "twenty", "20 = 2 × 10");
      T("10 + 10", xs[1], 360, go(.5), .5, { size: 20, color: C.grey, weight: 900, font: M, anchor: "middle" });
      const sy12 = sayAt("Ten and two make twelve.", { zh: "十加二等于十二。", word: "twelve" });
      const c12 = k.prop("card", 0, 0, { hidden: true, text: "12" });
      k.act(me, "holdCard", sy12.t, Math.max(1.2, sy12.dur + .3), { prop: c12 });
      D.step(2);
      N("", "twice：两次、两倍。");
      leaf(2, "twice", "两次 / 两倍");
      T("× 2", xs[2], 360, go(.4), .4, { size: 24, color: C.grey, weight: 900, font: M, anchor: "middle" });
      k.wait(.4);
      sayAt("Two tens make twenty. I read it twice.", { zh: "两个十是二十。我读了两遍。", word: "two twenty twice" });
      const bk = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", S.says[S.says.length - 1].t + S.says[S.says.length - 1].dur * .5, 1.6, { prop: bk, words: ["read"] });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 双胞胎和「在两个之间」─────
      D.step(3); D.shot();
      const ys = [170, 480];
      N("", "twin：双胞胎——两个长得一样的孩子。");
      FP.parts([["tw", C.red], ["in", C.ink]], ys[0] - 26, 160, 22);
      T("双胞胎", ys[0], 190, go(.5), .5, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      const gT = D.sub(); const tw1 = FP.person(ys[0] - 22, 330, C.blue), tw2 = FP.person(ys[0] + 22, 330, C.blue); D.adopt(tw1, tw2); D.back();
      const syTw = sayAt("They are twins.", { zh: "他们是双胞胎。", word: "twins" });
      k.buzz(tw1, syTw.t, 1, 2); k.buzz(tw2, syTw.t, 1, 2);
      k.act(me, "point", syTw.t, Math.max(1.2, syTw.dur), { at: [ys[0], 300] });
      N("", "between = be + twain（古英语的「两个」）：在两个之间。");
      FP.parts([["be", C.ink], ["tw", C.red], ["een", C.ink]], ys[1] - 46, 160, 22);
      T("在两者之间", ys[1], 190, go(.5), .5, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      const tree = x => { P(k.wl(x, 330, x, 300, .3), go(.2), .2, { color: WOOD, w: 3 }); P(k.cloud(x, 286, 14, 14, 5), go(.3), .3, { color: C.green, w: 2.5 }); };
      tree(ys[1] - 60); tree(ys[1] + 60);
      const gK = D.sub(); const kid = k.actor("traveler", { x: ys[1] + 150, y: 330, s: .45, f: -1, g: gK }); D.back();
      T("更准确：be-（by，在旁边）+ tween（古英语「两个两个」）", 40, 400, go(1), 1, { size: 15, color: C.green, weight: 900 });
      T("原讲法：between = be + twain（古英语的「两个」）", 40, 424, go(.8), .8, { size: 13, color: C.grey });
      k.wait(.4);
      const syBt = sayAt("I sit between my twin brothers.", { zh: "我坐在两个双胞胎哥哥中间。", word: "between" });
      k.act(kid, "walk", syBt.t, Math.max(1, syBt.dur * .5), { to: ys[1] });
      k.act(kid, "sit", syBt.t + Math.max(1, syBt.dur * .5), 1.4, { words: ["sit"] });
      sayAt("Twain. Twain is an old word for two.", { zh: "twain。twain 是「两个」的老说法。", word: "twain" });
      sayAt("By. The cat is by the door.", { zh: "旁边。猫在门旁边。", word: "by" });
      T("这是真正的词源：再也不会把 twelve 和 twenty 弄混。", 40, 452, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      sayAt("Tw. Two, twelve, twenty, twice, twin, between.", { zh: "tw。二、十二、二十、两次、双胞胎、在……之间。", word: "tw two twelve twenty twice twin between", blocks: ["tw"] });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "tw 一出现，成双又成对。");
      P(k.roughRect(40, 468, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：tw 一出现，成双又成对。", 60, 498, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "看到 tw- 就想到 2。一对 twins，一共有几个孩子？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 twins　→　几个孩子？", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "tw- = 2：双胞胎是两个孩子。");
      const tRev = go(.3);
      T("2 个 —— tw- = two", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Tom and Tim are twins. They are two boys.", { zh: "汤姆和蒂姆是双胞胎。他们是两个男孩。", word: "Tom Tim boys" });
      D.hold(2);

      k.quoteCard({ insight: "看到 tw-，想到 2：\ntwo · twelve · twenty · twice · twin · between", rhyme: "口诀：tw 一出现，成双又成对。", hlLines: 2, foot: "🧠 第一性原理 ② 字母象形与音义同源簇" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "read", act: "讲解员捧书读（read），与「I read it twice」同步" },
      { word: "sit", act: "小旅客走到两棵树中间坐下（walk + sit），与「I sit between」同步" },
    ],
    r2skip: ["elve", "enty", "ice", "in", "een", "be", "tween"],   // tw|elve、be|tw|een 拆开展示的残片；be 是古前缀（≈ by），不是动词 be；tween 是 between 的后半（古英语「两个两个」），整词已朗读
    terms: [
      ["可信度徽章", "📜 真实词源（Etymonline「twelve」：古英语 twelf = 「十之外剩二」；「between」：bi-「by」+ tweonum「两个两个」，都来自表示 2 的词根）。"],
    ],
  },
);
