// ==================== 第一性原理 ① 口腔省力同化律（fp_economy）====================
// 4 幕 = FIRST_PRINCIPLES_DB[0].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
// v2 升级（2026-10-30 起）：第 1–3 幕已升引擎 v2 + 讲解员；升级前整份文件原样保存在 cases/fp_economy_classic.js。依赖 wo_props + fp_props。
WB_LAB.fp_economy = [
  // ───────── 1-1 为什么 -s 和 -ed 都有三种读音？（v2 + 讲解员，2026-10-30 试点）─────────
  // 升级前原样保存在 cases/fp_economy_classic.js（R1 零丢失，可随时回退）；原字幕 / 白板 / 朗读 / 术语逐条保留。
  // 结构改成 v2 六步：① 6 种读音？② 声带 ③ 同化 ④ 过去式 ⑤ 口诀 🔮 预测。配色：V3 四色（口腔道具自带颜色，与 pron_map 同）。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：复数 -s 和过去式 -ed，为什么各有三种读音？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "-s 和 -ed 的三种读音", sub: "① 口腔省力同化律", badges: ["💡"], steps: ["① 6 种读音？", "② 声带", "③ 同化", "④ 过去式", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 看起来要背 6 种 ─────
      D.step(0); D.shot();
      N("", "看起来要背 6 种读音……");
      k.mono("books /s/   bags /z/    buses /ɪz/", 60, 170, 24, C.ink, 700);
      k.mono("worked /t/  played /d/  wanted /ɪd/", 60, 220, 24, C.ink, 700);
      T("6 种？！", 640, 200, go(.6), .6, { size: 30, color: C.red, weight: 900 });
      k.act(me, "surprised", S.at - .6, 1.3); k.expr(me, "oops", S.at - .6, 1.6);
      k.wait(.4);
      N("", "其实只看一件事：前一个音，声带有没有震动。");
      P(k.roughRect(40, 290, 700, 60), go(.7), .7, { color: C.blue, w: 2.4 });
      T("只看一件事：前一个音，声带震不震？", 64, 330, go(1), 1, { size: 22, color: C.blue, weight: 900 });
      k.act(me, "think", S.at - 1.4, 1.6);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 声带：清 vs 浊 ─────
      D.step(1); D.shot();
      N("声带：", "喉咙里的两片小肉，发某些音时会快速震动。");
      const m = FP.mouth({ x: 90, y: 120, s: 1.05, labelX: -16 }); D.adopt(m.cords);
      const wv = m.waves(); D.adopt(wv); D.back();   // waves() 建组后回到 0 组，这里接回镜头组（否则后面的字擦不掉）
      k.act(me, "point", S.at - .8, 1.6, { at: [m.X(90), m.Y(225)] });
      k.wait(.4);
      N("清辅音：", "发音时声带不震动的辅音，比如 /k/ /p/ /t/ /s/。");
      FP.tag("/k/", 420, 200, C.blue, 26);
      T("声带不震", 420, 240, go(.6), .6, { size: 20, color: C.blue, weight: 900 });
      T("= 清", 420, 268, go(.4), .4, { size: 20, color: C.blue, weight: 900 });
      k.wait(.8);
      N("浊辅音：", "发音时声带震动的辅音，比如 /ɡ/ /b/ /d/ /v/；元音也都震。");
      FP.tag("/ɡ/", 420, 340, C.green, 26);
      const tb = go(.2);
      k.buzz(m.cords, tb, 3.2, 2.2); k.fade(wv, tb, .3, 1); k.fade(wv, tb + 3, .3, 0);
      k.act(me, "point", tb, 1.8, { at: [m.X(90), m.Y(225)] }); k.expr(me, "surprised", tb, 1.8);
      T("声带震动", 420, 380, go(.6), .6, { size: 20, color: C.green, weight: 900 });
      T("= 浊", 420, 408, go(.4), .4, { size: 20, color: C.green, weight: 900 });
      k.badge("💡", 560, 300, { label: "摸喉咙试试" });
      k.wait(1.4);
      D.wipe();

      // ───── 镜头 3 · 同化：-s 跟着前一个音走 ─────
      D.step(2); D.shot();
      P(k.wl(420, 130, 420, 430, 1), go(.4), .4, { color: C.grey, w: 2, dash: "6 7" });
      k.head("不震 → 尾巴不震", 60, 150, C.blue, "start", 22);
      k.head("震 → 尾巴也震", 460, 150, C.green, "start", 22);
      N("同化：", "后一个音学前一个音的样子，嘴巴最省力。");
      const r1 = k.mono("book+s", 60, 220, 34, C.ink, 900);
      P(k.ellipse(r1.x + 3.5 * r1.cw, r1.y - 11, 14, 22), go(.4), .4, { color: C.blue, w: 2.5 });
      k.arrow(r1.x + 3.5 * r1.cw + 8, r1.y + 16, r1.x + 5.5 * r1.cw, r1.y + 36, C.blue);
      T("/s/", 60, 290, go(.4), .4, { size: 30, color: C.blue, weight: 900, font: M });
      N("", "book 最后是 /k/，声带不震，-s 就顺势读不震的 /s/。");
      k.hlText("k", r1.x + 3 * r1.cw, r1.y, 34, { color: C.hlYellow });
      const r2 = k.mono("bag+s", 460, 220, 34, C.ink, 900);
      P(k.ellipse(r2.x + 2.5 * r2.cw, r2.y - 11, 14, 22), go(.4), .4, { color: C.green, w: 2.5 });
      k.arrow(r2.x + 2.5 * r2.cw + 8, r2.y + 16, r2.x + 4.5 * r2.cw, r2.y + 36, C.green);
      T("/z/", 460, 290, go(.4), .4, { size: 30, color: C.green, weight: 900, font: M });
      N("", "bag 最后是 /ɡ/，声带在震，-s 就顺势读会震的 /z/。");
      k.hlText("g", r2.x + 2 * r2.cw, r2.y, 34, { color: C.hlGreen });
      k.wait(.6);
      T("I have two books and two bags.", 60, 380, go(1.2), 1.2, { size: 24, color: C.ink, weight: 900, font: M });
      const bk = k.prop("book", 0, 0, { hidden: true });
      const syBooks = sayAt("I have two books and two bags.", { zh: "我有两本书和两个包。", word: "I have two and" });
      k.act(me, "holdCard", syBooks.t - .2, Math.max(1.6, syBooks.dur + .4), { prop: bk });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 4 · 过去式：同一条规律 ─────
      D.step(3); D.shot();
      N("过去式：", "表示以前发生的事，规则动词加 -ed。同一条规律！");
      P(k.wl(420, 130, 420, 330, 1), go(.4), .4, { color: C.grey, w: 2, dash: "6 7" });
      k.mono("worked", 60, 190, 34, C.ink, 900);
      T("/t/", 60, 250, go(.4), .4, { size: 30, color: C.blue, weight: 900, font: M });
      T("/k/ 不震", 130, 250, go(.5), .5, { size: 18, color: C.grey });
      k.mono("played", 460, 190, 34, C.ink, 900);
      T("/d/", 460, 250, go(.4), .4, { size: 30, color: C.green, weight: 900, font: M });
      T("/eɪ/ 元音会震", 530, 250, go(.6), .6, { size: 18, color: C.grey });
      k.wait(.6);
      T("I worked hard, and then I played.", 60, 310, go(1.2), 1.2, { size: 22, color: C.ink, weight: 900, font: M });
      const syWp = sayAt("I worked hard, and then I played.", { zh: "我努力学习，然后去玩。", word: "hard then" });
      const book2 = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "read", syWp.t, Math.max(1.2, syWp.dur * .55), { prop: book2, words: ["worked"] });
      k.act(me, "jump", syWp.t + syWp.dur * .58, Math.max(.9, syWp.dur * .42), { words: ["played"] });
      k.wait(.4);
      N("", "那 buses /ɪz/、wanted /ɪd/ 呢？下一幕讲。");
      T("buses  wanted  → ?", 60, 380, go(1), 1, { size: 22, color: C.grey, weight: 700, font: M });
      k.act(me, "think", S.at - 1, 1.4);
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "前音不震尾不震，前音一震尾也震。");
      P(k.roughRect(40, 410, 760, 52), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：前音不震尾不震，前音一震尾也震。", 60, 444, go(1), 1, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      // R2 补朗读（2026-10-29，旧幕推广 P2）：画面上的英文词单读 + 例句
      sayAt("Books, bags, buses.", { zh: "书、包、公交车。", word: "book books bag bags buses" });
      sayAt("Worked, played, wanted.", { zh: "工作了、玩了、想要了。", word: "worked played wanted ed", blocks: ["ed"] });
      k.wait(.4);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "dog 最后是 /ɡ/。dogs 的 -s 读 /s/ 还是 /z/？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 dog + s　→　/s/ 还是 /z/", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      const qm = D.sub(); T("？", 470, 204, go(.3), .3, { size: 34, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "/ɡ/ 声带在震，-s 也跟着震：dogs 读 /z/。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("dogs /dɒɡz/ —— /ɡ/ 震，尾巴也震 → /z/", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Dogs. I have two dogs.", { zh: "狗。我有两只狗。", word: "dog dogs" });
      D.hold(2);

      k.quoteCard({ insight: "清配清，浊配浊：\n-s / -ed 跟着前一个音的声带走", rhyme: "口诀：前音不震尾不震，\n前音一震尾也震。", hlLines: 2, foot: "🧠 第一性原理 ① 口腔省力同化律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "worked", act: "讲解员捧书认真读（read），与「I worked hard」同步" },
      { word: "played", act: "讲解员开心地跳起来（jump），与「then I played」同步" },
    ],
    terms: [
      ["音素", "一个最小的声音单位，音标里的一个符号就是一个音素，比如 /k/。"],
      ["元音 / 辅音", "元音：气流不受阻挡的音，如 /æ/ /eɪ/；辅音：气流被舌头、牙齿或嘴唇挡一下的音，如 /k/ /b/。"],
      ["声带", "喉咙里的两片小肉。用手摸喉咙读 /z/，能感觉到它在震动。"],
      ["清辅音", "声带不震动的辅音：/p/ /t/ /k/ /f/ /s/ /ʃ/ /tʃ/ /θ/。"],
      ["浊辅音", "声带震动的辅音：/b/ /d/ /ɡ/ /v/ /z/ /m/ /n/ /l/ 等；所有元音也都震。"],
      ["音标", "记录读音的符号，写在斜线里，比如 book /bʊk/。"],
      ["复数 / 三单", "复数：两个以上，名词加 -s；三单：主语是 he/she/it 时，动词加 -s。读音规律一样。"],
      ["过去式", "表示过去发生的事，规则动词加 -ed。"],
      ["同化", "后一个音变得像前一个音，让嘴巴少换动作、说起来更省力。"],
      ["可信度徽章", "💡 记忆方法（口诀、摸喉咙）· 📜 有出处的历史 · ✂️ 简化说法 · ⚠️ 有要注意的地方。"],
    ],
  },
];
WB_LAB.fp_economy.push(
  // ───────── 1-2 为什么 s/sh/ch/x 加 -es，t/d 加 -ed 要多读 /ɪ/？（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_economy_classic.js（R1 零丢失）；原字幕 / 白板 / 朗读 / 术语逐条保留。
  // v2 六步：① 撞车 ② 插 /ɪ/ ③ -es ④ -ed ⑤ 口诀 🔮 预测。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：buses、wanted 为什么要多读一个 /ɪ/？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "为什么多读一个 /ɪ/？", sub: "① 口腔省力同化律", badges: ["💡"], steps: ["① 撞车", "② 插 /ɪ/", "③ -es", "④ -ed", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 撞车：bus + s 粘成一个 ─────
      D.step(0); D.shot();
      N("", "先试试：bus 后面直接加一个 /s/……");
      const m = FP.mouth({ x: 66, y: 130, s: .9 }); D.adopt(m.cords); D.back();
      N("舌尖音：", "舌尖顶在上牙后面发的音，比如 /s/ /z/ /t/ /d/。");
      m.glow(166, 132);
      T("/s/ 在这里", m.X(150), m.Y(100), go(.6), .6, { size: 15, color: C.red, weight: 900, anchor: "end" });
      k.act(me, "point", S.at - .6, 1.4, { at: [m.X(166), m.Y(132)] });
      k.wait(.4);
      k.head("bus + s", 320, 160, C.ink, "start", 24);
      T("/bʌs/", 320, 220, go(.6), .6, { size: 30, color: C.ink, weight: 900, font: M });
      const gs = D.sub();
      P(k.ellipse(580, 210, 22, 22), go(.4), .4, { color: C.red, w: 2.5 });
      T("s", 580, 220, go(.3), .3, { size: 30, color: C.red, weight: 900, font: M, anchor: "middle" });
      D.back();
      N("吞音：", "两个一样的音挨在一起，会粘成一个，听不出来。");
      const tm = go(1.2);
      k.move(gs, tm, 1.2, -200, 0, { ease: "antic" });
      k.squash(gs, tm + 1.2, .32, .2); k.sfx("pop", tm + 1.2);
      k.buzz(gs, tm + 1.2, .8, 2);
      k.act(me, "surprised", tm + 1.1, 1.3); k.expr(me, "oops", tm + 1.1, 1.6);
      k.wait(.4);
      k.redX(372, 234);
      T("粘成一个 /s/，听不出是复数！", 402, 258, go(1), 1, { size: 17, color: C.red, weight: 900 });
      k.wait(.6);

      // ───── 镜头 1 续 · 插 /ɪ/ 隔开 ─────
      D.step(1);
      N("", "办法：中间插一个短短的 /ɪ/，把两个音隔开。");
      k.move(gs, go(.8), .8, 200, 0);
      k.act(me, "think", S.at - .8, 1.4);
      k.wait(.2);
      T("bus + ɪ + z", 320, 316, go(.8), .8, { size: 26, color: C.ink, weight: 900, font: M });
      k.arrow(520, 307, 570, 307, C.grey);
      T("/ˈbʌsɪz/  buses", 586, 316, go(.8), .8, { size: 26, color: C.green, weight: 900, font: M });
      T("↑ 多了一个 /ɪ/", 434, 344, go(.6), .6, { size: 16, color: C.green, weight: 900 });
      k.hlText("ɪ", 320 + 6 * 26 * .6, 316, 26, { color: C.hlYellow });
      k.act(me, "nod", S.at - .4, .8);
      k.wait(.4);
      const syBus = sayAt("Two buses are coming.", { zh: "两辆公交车开过来了。", word: "buses" });
      k.act(me, "point", syBus.t, Math.max(1.2, syBus.dur), { at: [700, 300] });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · -es 和 -ed：同一个道理 ─────
      // 套用：row(原形, 词尾, 音标, x, y)
      const row = (base, tail, ipa, x, y, size = 22) => {
        const cw = size * .6;
        T(base, x, y, go(.4), .4, { size, color: C.ink, weight: 900, font: M });
        const ax = x + base.length * cw + 8;
        k.arrow(ax, y - 6, ax + 26, y - 6, C.grey);
        const bx = ax + 34;
        FP.parts([[base, C.ink], [tail, C.blue]], bx, y, size);
        T(ipa, bx + (base.length + tail.length) * cw + 12, y, go(.5), .5, { size: size - 2, color: C.grey, weight: 700, font: M });
      };
      D.step(2); D.shot();
      P(k.wl(470, 120, 470, 330, 1), go(.4), .4, { color: C.grey, w: 2, dash: "6 7" });
      k.head("-es → /ɪz/", 60, 150, C.blue, "start", 22);
      k.head("-ed → /ɪd/", 500, 150, C.green, "start", 22);
      N("嘶嘶音：", "/s/ /z/ /ʃ/ /tʃ/ 这类像蛇嘶嘶响的音，加 -es 读 /ɪz/。");
      row("watch", "es", "/ˈwɒtʃɪz/", 60, 210);
      row("box", "es", "/ˈbɒksɪz/", 60, 260);
      k.wait(.4);
      const syW = sayAt("We watch the bus. I need a box.", { zh: "我们看着公交车。我需要一个盒子。", word: "bus watch box need es", blocks: ["es"] });
      k.act(me, "point", syW.t, Math.max(1.2, syW.dur * .5), { at: [200, 210], words: ["watch"] });
      const bx2 = k.prop("box", 0, 0, { hidden: true });
      k.act(me, "holdCard", syW.t + syW.dur * .5, Math.max(1.2, syW.dur * .5 + .3), { prop: bx2 });
      k.wait(.4);

      D.step(3);
      N("", "-ed 也一样：want 最后是 /t/，再加 /t/ 就粘住了。");
      row("want", "ed", "/ˈwɒntɪd/", 500, 210);
      row("need", "ed", "/ˈniːdɪd/", 500, 260);
      k.wait(.6);
      T("She wanted a red kite.", 500, 310, go(1), 1, { size: 20, color: C.ink, weight: 900, font: M });
      const syK = sayAt("She wanted a red kite.", { zh: "她想要一只红风筝。", word: "wanted she a red kite" });
      const kite = k.prop("card", 0, 0, { hidden: true, text: "kite" });
      k.act(me, "holdCard", syK.t, Math.max(1.4, syK.dur + .3), { prop: kite });
      sayAt("I want a kite. I wanted a kite.", { zh: "我想要风筝。我以前想要风筝。", word: "want ed", blocks: ["ed"] });
      k.wait(.4);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "同位相撞，插个 /ɪ/ 来帮忙。");
      P(k.roughRect(40, 380, 760, 52), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：同位相撞，插个 /ɪ/ 来帮忙。", 60, 414, go(1), 1, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "kiss 最后是 /s/。kisses 的 -es 读 /s/、/z/ 还是 /ɪz/？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 kiss + es　→　/s/、/z/ 还是 /ɪz/", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      const qm = D.sub(); T("？", 560, 204, go(.3), .3, { size: 34, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "/s/ 再加 /s/ 会粘住，所以插 /ɪ/：kisses 读 /ˈkɪsɪz/。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("kisses /ˈkɪsɪz/ —— /s/ 撞 /s/，插 /ɪ/", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Kiss, kisses. Two kisses for Mum.", { zh: "亲一下，亲两下。给妈妈两个吻。", word: "kiss kisses for Mum" });
      D.hold(2);

      k.quoteCard({ insight: "尾音和词缀发音位置一样 → 插 /ɪ/ 隔开：\n-es 读 /ɪz/，-ed 读 /ɪd/", rhyme: "口诀：同位相撞，插个 /ɪ/ 来帮忙。", hlLines: 2, foot: "🧠 第一性原理 ① 口腔省力同化律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "watch", act: "讲解员指着看公交车（point），与「We watch the bus」同步" },
    ],
    terms: [
      ["舌尖音", "舌尖顶在上牙后面发出的音，如 /s/ /z/ /t/ /d/。"],
      ["嘶嘶音", "/s/ /z/ /ʃ/ /ʒ/ /tʃ/ /dʒ/，读起来像蛇嘶嘶响。词尾是 s、x、sh、ch 的词，加 -es 读 /ɪz/。"],
      ["吞音", "两个发音位置一样的音挨在一起，粘成一个，后面那个就听不出来了。"],
      ["可信度徽章", "💡 记忆方法（口诀）· 📜 有出处的历史 · ✂️ 简化说法 · ⚠️ 有要注意的地方。"],
    ],
  },
);
WB_LAB.fp_economy.push(
  // ───────── 1-3 为什么 a 变 an？为什么 in- 变成 im-？（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_economy_classic.js（R1 零丢失）；原左右两半拆成两个镜头。
  // v2 六步：① 卡一下 ② 小桥 an ③ 嘴唇 ④ im- ⑤ 口诀 🔮 预测。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：a 为什么变 an？in- 为什么变 im-？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "a → an，in- → im-", sub: "① 口腔省力同化律", badges: ["💡", "✂️"], steps: ["① 卡一下", "② 小桥 an", "③ 嘴唇", "④ im-", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · a → an ─────
      D.step(0); D.shot();
      N("冠词：", "放在名词前面的小词 a / an / the。a、an 表示「一个」。");
      k.head("a → an", 40, 128, C.blue, "start", 22);
      const m1 = k.mono("a apple", 60, 202, 30, C.ink, 900);
      N("元音：", "气流不受阻挡的音，比如 /æ/ /ɒ/ /aʊ/。两个元音挨着，嘴巴会卡一下。");
      P(k.wave(m1.x + 1.1 * m1.cw, m1.x + 2 * m1.cw - 2, m1.y - 30, 4), go(.5), .5, { color: C.red, w: 2.5 });
      T("卡一下！", m1.x + 2.2 * m1.cw, m1.y - 30, go(.5), .5, { size: 16, color: C.red, weight: 900 });
      k.redX(250, 174);
      k.act(me, "surprised", S.at - .5, 1.2); k.expr(me, "oops", S.at - .5, 1.5);
      k.wait(.4);
      D.step(1);
      N("", "加一个 /n/，像一座小桥，让气流顺顺地过去。");
      FP.parts([["a", C.ink], ["n", C.blue], [" apple", C.ink]], 60, 270, 30);
      const bx = 60 + 1.5 * 18, ex = 60 + 3.3 * 18;
      P(`M${bx},${242} Q${(bx + ex) / 2},${216} ${ex},${242}`, go(.6), .6, { color: C.blue, w: 3 });
      T("/n/ 小桥", (bx + ex) / 2 + 60, 226, go(.5), .5, { size: 16, color: C.blue, weight: 900 });
      T("/æn ˈæpl/", 260, 270, go(.6), .6, { size: 20, color: C.grey, weight: 700, font: M });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.5);
      N("", "看第一个「音」，不看字母：hour 的 h 不读，开头是元音。");
      const m2 = k.mono("an hour", 60, 342, 24, C.ink, 900);
      k.strike(m2, "h", 0, C.red);
      T("h 不读，/aʊə/ 开头 → an", 240, 342, go(.8), .8, { size: 16, color: C.green, weight: 900 });
      const syA = sayAt("I can eat an apple in an hour.", { zh: "我一小时能吃一个苹果。", word: "an apple" });
      k.act(me, "point", syA.t, Math.max(1.2, syA.dur * .6), { at: [120, 270] });
      N("", "useful 开头读 /j/，是辅音，所以还是用 a。");
      k.mono("a useful book", 60, 392, 24, C.ink, 900);
      T("u 读 /j/（辅音）→ a", 290, 392, go(.8), .8, { size: 16, color: C.blue, weight: 900 });
      k.wait(.5);
      const syU = sayAt("This is a useful book.", { zh: "这是一本有用的书。" });
      const bk = k.prop("book", 0, 0, { hidden: true });
      k.act(me, "holdCard", syU.t - .2, Math.max(1.4, syU.dur + .4), { prop: bk });
      sayAt("I have a book. The book is useful.", { zh: "我有一本书。这本书很有用。", word: "a the book useful" });
      sayAt("An hour has sixty minutes.", { zh: "一小时有六十分钟。", word: "hour", egg: ["minutes"] });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · in- → im- ─────
      D.step(2); D.shot();
      N("前缀：", "加在单词前面、改变意思的部分。in- 表示「不」。");
      k.head("in- → im-", 70, 128, C.blue, "start", 22);
      N("双唇音：", "上下嘴唇合在一起发的音：/p/ /b/ /m/。");
      const L = FP.lips(160, 196, 96, 24); D.adopt(L.up, L.lo); D.back();
      T("读 /p/：双唇先合上", 230, 202, go(.8), .8, { size: 17, color: C.red, weight: 900 });
      const tc = go(.2);
      L.close(tc, .5); L.open(tc + 1.2, .4); L.close(tc + 2, .5);
      k.act(me, "point", tc, 2.2, { at: [160, 196] });
      k.wait(2.4);
      D.step(3);
      N("鼻音：", "气流从鼻子出来的音，/n/ 和 /m/ 都是。");
      const m3 = k.mono("in + polite", 80, 290, 28, C.ink, 900);
      k.underline(m3, "p", 0, C.red);
      N("", "嘴唇已经为 /p/ 合上了，/n/ 自然变成双唇的 /m/。");
      k.strike(m3, "n", 0, C.red);
      k.above(m3, "n", 0, "m", C.blue);
      k.arrow(80, 320, 120, 320, C.grey);
      FP.parts([["i", C.green], ["m", C.blue], ["polite", C.green]], 134, 328, 28);
      T("不礼貌的", 320, 326, go(.5), .5, { size: 17, color: C.grey });
      k.act(me, "nod", S.at - .4, .8);
      k.wait(.4);
      N("", "同理：in + possible，变成 impossible（不可能的）。");
      FP.parts([["in + possible  ", C.ink]], 80, 392, 22);
      k.arrow(288, 386, 320, 386, C.grey);
      FP.parts([["i", C.green], ["m", C.blue], ["possible", C.green]], 330, 392, 22);
      k.wait(.6);
      const syF = sayAt("It's impossible to fly like a bird.", { zh: "像鸟一样飞是不可能的。", word: "impossible" });
      k.act(me, "jump", syF.t + syF.dur * .35, Math.max(.9, syF.dur * .5), { words: ["fly"] });
      sayAt("Be polite. It is possible.", { zh: "要有礼貌。这是可能的。", word: "polite possible in im", blocks: ["in", "im"] });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "元音前面搭座桥，双唇前面 n 变 m。");
      P(k.roughRect(40, 420, 760, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：元音前面搭座桥，双唇前面 n 变 m。", 60, 453, go(1), 1, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "elephant 开头是元音 /e/。前面用 a 还是 an？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 ___ elephant　→　a 还是 an", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      const qm = D.sub(); T("？", 520, 204, go(.3), .3, { size: 34, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "/e/ 是元音，两个元音挨着会卡，搭 /n/ 小桥：an elephant。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("an elephant —— 元音开头，搭 /n/ 小桥", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("An elephant. I can see an elephant.", { zh: "一头大象。我能看见一头大象。", word: "elephant an see" });
      D.hold(2);

      k.quoteCard({ insight: "元音撞元音加 /n/ 架桥（an）；\n/p/ /b/ /m/ 前面 n 变 m（im-）", rhyme: "口诀：元音前面搭座桥，双唇前面 n 变 m。", hlLines: 2, foot: "🧠 第一性原理 ① 口腔省力同化律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "fly", act: "讲解员跳起来做飞的样子（jump），与「fly like a bird」同步" },
    ],
    terms: [
      ["冠词", "放在名词前面的小词：a / an（一个）、the（这个、那个）。"],
      ["前缀", "加在单词前面、改变意思的部分，如 in-、im-、un- 表示「不」。"],
      ["双唇音", "上下嘴唇合在一起发的音：/p/ /b/ /m/。"],
      ["鼻音", "气流从鼻子出来的音：/m/ /n/ /ŋ/。"],
      ["可信度徽章", "💡 记忆方法（口诀、小桥）· ✂️ 简化说法（a/an 其实看的是读音，不是字母）。"],
    ],
  },
);
WB_LAB.fp_economy.push(
  // ───────── 1-4 为什么 run 变 running 要双写 n？─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：run 变 running，为什么要多写一个 n？");
      k.header("① 口腔省力同化律", "run → running 为什么双写？", true);
      N("双写：", "把单词最后一个辅音字母再写一遍，比如 run → running。");
      const w = k.mono("runing ?", 40, 112, 24, C.red, 900);
      T("很多同学这样写", 200, 112, go(.6), .6, { size: 16, color: C.grey });
      // 音节房间
      N("音节：", "单词里一拍一拍的读音单位。run 只有一拍，是一个音节。");
      P(k.roughRect(60, 160, 170, 90), go(.8), .8, { color: C.ink, w: 2.5 });
      F(k.rectD(60, 160, 170, 90), go(.2, 0), { color: "#f8fafc", op: 1 });
      T("r", 84, 222, go(.3), .3, { size: 44, color: C.ink, weight: 900, font: M });
      const gu = k.group(); T("u", 120, 222, go(.3), .3, { size: 44, color: C.blue, weight: 900, font: M }); k.endGroup();
      const gn = k.group(); T("n", 160, 222, go(.3), .3, { size: 44, color: C.ink, weight: 900, font: M }); k.endGroup();
      const gd = k.group();
      P(k.roughRect(212, 166, 12, 78), go(.5), .5, { color: C.brown, w: 2.5 });
      F(k.rectD(212, 166, 12, 78), go(.2, 0), { color: "#fde68a", op: 1 });
      k.endGroup();
      N("闭音节：", "「辅音+元音+辅音」，元音被后面的辅音关在门里，读短音。");
      T("门：n 守着", 172, 276, go(.6), .6, { size: 15, color: C.brown, weight: 900, anchor: "middle" });
      T("u 读短音 /ʌ/", 60, 148, go(.6), .6, { size: 16, color: C.blue, weight: 900 });
      k.wait(.5);
      k.chip("ing", 322, 194, null, { size: 22, color: C.green });
      T("+", 252, 222, go(.3), .3, { size: 28, color: C.grey, weight: 900 });
      k.wait(.4);
      // 不双写：n 被 ing 拉走，门开
      N("开音节：", "元音后面没有辅音挡着，门开了，元音往往读长音。");
      const t1 = go(1.4);
      k.move(gn, t1, 1, 132, 0); k.rot(gd, t1 + .3, .8, -75, 218, 166);
      k.buzz(gu, t1 + 1.1, 1.2, 2.5);
      T("ru | ning：门开了，u 跑出来读长音 /uː/", 60, 316, go(1.4), 1.4, { size: 17, color: C.red, weight: 900 });
      T("tap + ing 不双写 → ta | ping，读成 tape 的 /eɪ/", 60, 346, go(1.4), 1.4, { size: 15, color: C.grey, weight: 700 });
      k.redX(400, 292);
      k.wait(.8);
      // 双写：n 回家，第二个 n 来拼尾巴
      N("", "办法：再派一个 n。第一个 n 守门，第二个 n 去拼 -ing。");
      const t2 = go(1.2);
      k.move(gn, t2, .8, -132, 0); k.rot(gd, t2 + .3, .7, 75, 218, 166);
      const g2 = k.group(); T("n", 292, 222, go(.01, 0), .01, { size: 44, color: C.orange, weight: 900, font: M }); k.endGroup();
      k.hide(g2); k.fade(g2, go(.6), .6, 1);
      k.move(g2, go(.01, 0), .01, 0, 0);
      T("第二个 n", 305, 274, go(.5), .5, { size: 15, color: C.orange, weight: 900, anchor: "middle" });
      D.parts([["run", C.ink], ["n", C.orange], ["ing", C.green]], 60, 400, 30);
      T("/ˈrʌnɪŋ/  u 还是短音", 240, 398, go(.8), .8, { size: 18, color: C.green, weight: 900, font: M });
      k.wait(.6);
      // 右：套用
      N("短元音：", "读得又短又快的元音：a /æ/、e /e/、i /ɪ/、o /ɒ/、u /ʌ/。");
      k.head("辅元辅 + 元音尾巴 → 双写", 520, 112, C.purple, "start", 19);
      const row = (base, dbl, tail, y) => {
        T(base, 540, y, go(.4), .4, { size: 24, color: C.ink, weight: 900, font: M });
        k.arrow(540 + base.length * 14.4 + 10, y - 8, 540 + base.length * 14.4 + 40, y - 8, C.grey);
        D.parts([[base, C.ink], [dbl, C.orange], [tail, C.green]], 540 + base.length * 14.4 + 52, y, 24);
      };
      row("swim", "m", "ing", 170); row("big", "g", "er", 222); row("hot", "t", "est", 274); row("stop", "p", "ed", 326);
      T("-er 更… · -est 最… · -ed 过去式：都是元音开头的尾巴", 520, 372, go(1.2), 1.2, { size: 15, color: C.grey });
      k.wait(.6);
      k.say("The dog is running in the park.", { zh: "小狗在公园里跑。", word: "running" });
      N("口诀：", "辅元辅，加尾巴，派个守门员看家。");
      // R2 补朗读（2026-10-29，旧幕推广 P2）：画面上的英文词单读 + 例句
      k.say("I can run and swim.", { zh: "我会跑步和游泳。", word: "run swim ing", blocks: ["ing"] });
      k.say("The tap is in the kitchen. This is tape.", { zh: "水龙头在厨房里。这是胶带。", word: "tap tape" });
      k.say("Big, bigger. Hot, hottest.", { zh: "大，更大。热，最热。", word: "big hot er est", blocks: ["er", "est"] });
      k.say("Stop! A bus stopped here.", { zh: "停下！一辆公交车停在这里了。", word: "a stop ed", blocks: ["ed"] });
      D.fin("「辅元辅」加元音开头的尾巴 → 双写最后的辅音，保住短元音", "口诀：辅元辅，加尾巴，派个守门员看家。");
      k.wait(2);
    },
    r2skip: ["runing", "ru", "ning", "ta", "ping"],   // 拼错的 runing 和「ru | ning」「ta | ping」音节切分演示（错误 / 残片，不读）
    terms: [
      ["音节", "单词里一拍一拍的读音单位。run 一拍（1 个音节），running 两拍（run-ning）。"],
      ["闭音节", "元音后面有辅音挡着，像关上门，元音读短音，如 run、big。"],
      ["开音节", "元音后面没有辅音挡着，门开着，元音常读长音（字母本身的音），如 ta-ping 里的 a。"],
      ["短元音 / 长元音", "短元音又短又快：/æ/ /e/ /ɪ/ /ɒ/ /ʌ/；长元音拉长或滑动：/eɪ/ /iː/ /uː/。"],
      ["双写", "把最后一个辅音字母再写一遍：run → running、big → bigger。"],
    ],
  },
);
