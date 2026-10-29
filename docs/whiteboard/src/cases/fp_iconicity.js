// ==================== 第一性原理 ② 字母象形与音义同源簇（fp_iconicity）====================
// 4 幕 = FIRST_PRINCIPLES_DB[1].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
// v2 升级（2026-10-30 起，决策 24）：第 1 幕已升引擎 v2 + 讲解员；升级前整份文件原样保存在 cases/fp_iconicity_classic.js。依赖 wo_props + fp_props。
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
  // ───────── 2-2 fl- 飘 · gl- 亮 · sl- 滑 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：fly、flag、flower 开头都是 fl-，是巧合吗？");
      k.header("② 字母象形与音义同源簇", "fl- 飘 · gl- 亮 · sl- 滑", false);
      N("辅音丛：", "两三个辅音字母连在一起读，比如 fl-、gl-、sl-。");
      const xs = [160, 480, 800];
      const list = (x, pre, rest, color) => rest.forEach(([w, zh], i) => {
        D.parts([[pre, color], [w, C.ink]], x - 80, 330 + i * 32, 20);
        T(zh, x + 56, 330 + i * 32, go(.3), .3, { size: 15, color: C.grey });
      });
      // fl-
      T("fl-", xs[0], 120, go(.4), .4, { size: 34, color: C.blue, weight: 900, font: M, anchor: "middle" });
      N("", "读 fl- 时，上牙碰下唇吹一口气——可以想成风把东西吹得飘起来。");
      P(`M${xs[0] - 110},180 q20,-8 40,0 M${xs[0] - 110},200 q20,-8 40,0 M${xs[0] - 110},220 q20,-8 40,0`, go(.8), .8, { color: "#94a3b8", w: 2.5 });
      P(k.wl(xs[0], 270, xs[0], 160, .4), go(.4), .4, { color: C.brown, w: 4 });
      const flag = k.group(); const fd = `M${xs[0] + 2},164 C${xs[0] + 30},150 ${xs[0] + 50},180 ${xs[0] + 80},166 L${xs[0] + 80},206 C${xs[0] + 50},220 ${xs[0] + 30},190 ${xs[0] + 2},204 Z`;
      P(fd, go(.6), .6, { color: C.blue, w: 3 }); F(fd, go(.1, 0), { color: "#bfdbfe", op: 1 }); k.endGroup();
      k.rot(flag, go(.01, 0), .01, 0, xs[0], 184); k.buzz(flag, go(1.4), 1.4, 3);
      list(xs[0], "fl", [["y", "飞"], ["ag", "旗子"], ["ower", "花"]], C.blue);
      k.wait(.3);
      // gl-
      T("gl-", xs[1], 120, go(.4), .4, { size: 34, color: C.orange, weight: 900, font: M, anchor: "middle" });
      k.say("The flag flies in the wind.", { zh: "旗子在风中飘扬。", word: "flag" });
      N("", "gl- 可以想成光滑、闪亮：透明的玻璃、眉开眼笑。");
      const gl = `M${xs[1] - 30},160 L${xs[1] - 22},260 L${xs[1] + 22},260 L${xs[1] + 30},160`;
      P(gl, go(.7), .7, { color: C.blue, w: 3 });
      const sp = k.group(); P(`M${xs[1] + 50},170 l6,14 l14,6 l-14,6 l-6,14 l-6,-14 l-14,-6 l14,-6 Z M${xs[1] - 56},210 l4,9 l9,4 l-9,4 l-4,9 l-4,-9 l-9,-4 l9,-4 Z`, go(.5), .5, { color: C.orange, w: 2.5 }); k.endGroup();
      const ts = go(1.6); k.fade(sp, ts, .4, .2); k.fade(sp, ts + .5, .4, 1); k.fade(sp, ts + 1, .4, .2); k.fade(sp, ts + 1.4, .3, 1);
      list(xs[1], "gl", [["ass", "玻璃"], ["ad", "高兴的"]], C.orange);
      k.wait(.3);
      // sl-
      T("sl-", xs[2], 120, go(.4), .4, { size: 34, color: C.green, weight: 900, font: M, anchor: "middle" });
      k.say("I am glad to see you.", { zh: "见到你我很高兴。", word: "glad" });
      N("", "sl- 可以想成轻轻地滑下去：滑梯、慢慢地、滑进梦里。");
      P(`M${xs[2] - 80},170 L${xs[2] - 60},170 C${xs[2] - 10},180 ${xs[2] + 20},260 ${xs[2] + 90},262`, go(.8), .8, { color: C.green, w: 4 });
      P(k.wl(xs[2] - 70, 170, xs[2] - 70, 270, .3), go(.3), .3, { color: C.green, w: 3 });
      const bl = k.group(); const bd = `M${xs[2] - 74},158 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0`;
      P(bd, go(.2), .2, { color: C.red, w: 2 }); F(bd, go(.1, 0), { color: "#fecaca", op: 1 }); k.endGroup();
      k.arc(bl, go(1.6), 1.6, `M0,0 L14,0 C64,10 94,90 158,92`);
      list(xs[2], "sl", [["ide", "滑梯"], ["ow", "慢的"], ["eep", "睡觉"]], C.green);
      k.wait(.5);
      T("这是帮助记忆的规律倾向，也有例外（比如 floor 地板）。", 40, 432, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      k.say("Go down the slide slowly.", { zh: "慢慢地滑下滑梯。", word: "slide" });
      N("口诀：", "fl 飞，gl 亮，sl 滑下来。");
      // R2 补朗读（2026-10-29，旧幕推广 P2）：画面上的英文词单读 + 例句
      k.say("Fl. Fly, flag, flower. Birds fly over the flowers.", { zh: "fl。飞、旗子、花。鸟儿飞过花丛。", word: "fl fly flag flower", blocks: ["fl"] });
      k.say("Gl. Glass, glad. The glass is clean.", { zh: "gl。玻璃、高兴的。玻璃杯很干净。", word: "gl glass glad", blocks: ["gl"] });
      k.say("Sl. Slide, slow, sleep. The snail is slow. The cat is sleeping.", { zh: "sl。滑梯、慢的、睡觉。蜗牛很慢。小猫在睡觉。", word: "sl slide slow sleep", blocks: ["sl"] });
      k.say("Floor. The ball is on the floor.", { zh: "地板。球在地板上。", word: "floor" });
      D.fin("开头的辅音丛常常带着同一种感觉：一个声音串起一串词", "口诀：fl 飞，gl 亮，sl 滑下来。");
      k.wait(2);
    },
    r2skip: ["ag", "ower", "ass", "ad", "ide", "ow", "eep"],   // 辅音丛后面的词尾残片（fl|ag、gl|ass、sl|ide 拆开展示），整词已朗读
    terms: [],
  },
);
WB_LAB.fp_iconicity.push(
  // ───────── 2-3 str- 绷直 · sp- 向外 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：straight、street、strong、strict，一个画面记住四个难词。");
      k.header("② 字母象形与音义同源簇", "str- 绷直 · sp- 向外", true);
      T("str-", 40, 120, go(.4), .4, { size: 34, color: C.red, weight: 900, font: M });
      N("", "str- 三个辅音挤在一起，读起来很用力——可以想成一根拉紧的绳子。");
      const loose = k.group(); P(`M80,200 C140,160 180,250 240,200 C300,150 340,240 400,200`, go(1), 1, { color: C.brown, w: 4 }); k.endGroup();
      const tight = k.group(); P(k.wl(80, 200, 400, 200, .2), go(.01, 0), .01, { color: C.red, w: 4 }); k.endGroup(); k.hide(tight);
      P(k.ellipse(70, 200, 10, 10) + " " + k.ellipse(410, 200, 10, 10), go(.4), .4, { color: C.ink, w: 3 });
      const tp = go(1.2); k.fade(loose, tp, .8, 0); k.fade(tight, tp + .2, .8, 1);
      k.arrow(64, 232, 24, 232, C.red); k.arrow(416, 232, 456, 232, C.red);
      T("拉紧 → 又直又有力", 240, 254, go(.6), .6, { size: 16, color: C.red, weight: 900, anchor: "middle" });
      N("", "笔直的、笔直的大街、肌肉绷紧的强壮、要求严格——都是「拉紧的直线」。");
      const row = (w, zh, y) => { D.parts([["str", C.red], [w, C.ink]], 60, y, 22); T(zh, 260, y, go(.4), .4, { size: 16, color: C.grey }); };
      row("aight", "笔直的", 300); row("eet", "（笔直的）大街", 334); row("ong", "强壮的（肌肉绷紧）", 368); row("ict", "严格的（要求绷紧）", 402);
      k.wait(.5);
      // sp-
      T("sp-", 510, 120, go(.4), .4, { size: 34, color: C.orange, weight: 900, font: M });
      k.say("Walk straight along the street.", { zh: "沿着这条街一直走。", word: "straight" });
      N("", "sp- 读的时候气流「噗」地往外喷——可以想成向四面八方发散。");
      const cx = 720, cy = 200;
      const dot = `M${cx - 8},${cy} a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0`;
      P(dot, go(.3), .3, { color: C.orange, w: 2 }); F(dot, go(.1, 0), { color: C.orange, op: 1 });
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; P(k.wl(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18, cx + Math.cos(a) * 62, cy + Math.sin(a) * 50, .3), go(.15), .15, { color: C.orange, w: 3 }); }
      N("", "声音向外说、活力向外放、向外延展的太空、万物冒头的春天。");
      const row2 = (w, zh, y) => { D.parts([["sp", C.orange], [w, C.ink]], 530, y, 22); T(zh, 700, y, go(.4), .4, { size: 16, color: C.grey }); };
      row2("eak", "说话（声音向外）", 300); row2("ort", "运动（活力向外）", 334); row2("ace", "太空（向外延展）", 368); row2("ring", "春天（万物冒头）", 402);
      k.wait(.5);
      T("帮助记忆的联想", 940, 432, go(.5), .5, { size: 13, color: C.grey, anchor: "end" });
      k.say("Flowers come out in spring.", { zh: "春天花开了。", word: "spring" });
      N("口诀：", "str 拉直线，sp 往外喷。");
      // R2 补朗读（2026-10-29，旧幕推广 P2）：画面上的英文词单读 + 例句
      k.say("Str. Straight, street, strong, strict.", { zh: "str。笔直的、大街、强壮的、严格的。", word: "str straight street strong strict", blocks: ["str"] });
      k.say("He is strong. Our teacher is strict.", { zh: "他很强壮。我们的老师很严格。", word: "strong strict" });
      k.say("Sp. Speak, sport, space, spring.", { zh: "sp。说话、运动、太空、春天。", word: "sp speak sport space spring", blocks: ["sp"] });
      k.say("Speak English. I like sport. Look at space!", { zh: "说英语。我喜欢运动。看看太空！", word: "speak sport space" });
      D.fin("str- 像拉紧的直线，sp- 像向外喷发：一个画面串起四个词", "口诀：str 拉直线，sp 往外喷。");
      k.wait(2);
    },
    r2skip: ["aight", "eet", "ong", "ict", "eak", "ort", "ace", "ring"],   // str|aight、sp|eak 拆开展示的词尾残片，整词已朗读
    terms: [],
  },
);
WB_LAB.fp_iconicity.push(
  // ───────── 2-4 tw- 家族都等于 2 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么 12 是 twelve，20 是 twenty？");
      k.header("② 字母象形与音义同源簇", "tw- 家族都等于 2", false);
      N("词源：", "一个词最早从哪里来。tw- 这一家，祖先都是数字 two（2）！");
      D.parts([["tw", C.red], ["o = 2", C.ink]], 400, 150, 40);
      P(k.ellipse(424, 136, 32, 26), go(.5), .5, { color: C.red, w: 3 });
      const xs = [110, 300, 480, 660, 850];
      const leaf = (i, w, zh) => {
        P(k.wl(480, 168, xs[i], 222, .6), go(.4), .4, { color: C.grey, w: 2 });
        D.parts([["tw", C.red], [w.slice(2), C.ink]], xs[i] - w.length * 13.2 / 2, 254, 22);
        T(zh, xs[i], 284, go(.5), .5, { size: 16, color: C.purple, weight: 900, anchor: "middle" });
      };
      N("", "twelve：十个手指再加 2 个，就是 12。");
      leaf(0, "twelve", "12 = 2 + 10");
      N("", "twenty：2 个 10，就是 20。");
      leaf(1, "twenty", "20 = 2 × 10");
      k.say("Ten and two make twelve.", { zh: "十加二等于十二。", word: "twelve" });
      N("", "twice：两次、两倍。");
      leaf(2, "twice", "两次 / 两倍");
      N("", "twin：双胞胎——两个长得一样的孩子。");
      leaf(3, "twin", "双胞胎");
      D.person(xs[3] - 16, 380, C.blue); D.person(xs[3] + 16, 380, C.blue);
      k.say("They are twins.", { zh: "他们是双胞胎。", word: "twins" });
      N("", "between = be + twain（古英语的「两个」）：在两个之间。");
      P(k.wl(480, 168, xs[4], 222, .6), go(.4), .4, { color: C.grey, w: 2 });
      D.parts([["be", C.ink], ["tw", C.red], ["een", C.ink]], xs[4] - 46, 254, 22);
      T("在两者之间", xs[4], 284, go(.5), .5, { size: 16, color: C.purple, weight: 900, anchor: "middle" });
      const tree = x => { P(k.wl(x, 380, x, 350, .3), go(.2), .2, { color: C.brown, w: 3 }); P(k.cloud(x, 336, 14, 14, 5), go(.3), .3, { color: C.green, w: 2.5 }); };
      tree(xs[4] - 40); tree(xs[4] + 40); D.person(xs[4], 380, C.red);
      // twelve / twenty 小图
      T("🖐🖐 + ✌", xs[0], 360, go(.5), .5, { size: 24, color: C.ink, anchor: "middle" });
      T("10 + 10", xs[1], 360, go(.5), .5, { size: 20, color: C.grey, weight: 900, font: M, anchor: "middle" });
      T("× 2", xs[2], 360, go(.4), .4, { size: 24, color: C.grey, weight: 900, font: M, anchor: "middle" });
      k.wait(.5);
      T("这是真正的词源：再也不会把 twelve 和 twenty 弄混。", 40, 424, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      k.say("I sit between my twin brothers.", { zh: "我坐在两个双胞胎哥哥中间。", word: "between" });
      N("口诀：", "tw 一出现，成双又成对。");
      // R2 补朗读（2026-10-29，旧幕推广 P2）：画面上的英文词单读 + 例句
      k.say("Tw. Two, twelve, twenty, twice, twin, between.", { zh: "tw。二、十二、二十、两次、双胞胎、在……之间。", word: "tw two twelve twenty twice twin between", blocks: ["tw"] });
      k.say("Two tens make twenty. I read it twice.", { zh: "两个十是二十。我读了两遍。", word: "two twenty twice" });
      k.say("Twain. Twain is an old word for two.", { zh: "twain。twain 是「两个」的老说法。", word: "twain" });
      D.fin("看到 tw-，想到 2：two · twelve · twenty · twice · twin · between", "口诀：tw 一出现，成双又成对。");
      k.wait(2);
    },
    r2skip: ["elve", "enty", "ice", "in", "een", "be"],   // tw|elve、be|tw|een 拆开展示的残片；be 是古前缀（≈ by），不是动词 be，整词已朗读
    terms: [],
  },
);
