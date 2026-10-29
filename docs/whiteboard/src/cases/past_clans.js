// ==================== 白板脚本：⑤ 不规则过去式「四大门派」破译阵 ====================
// 每个案例 = IRREGULAR_PAST_CLANS 里的一个门派：门派旗 + 秘诀 → 3 个成员「原形 → 过去式」完整画 → 其余成员列表 → 结论 + 口诀。
(function () {
  const MONO = '"Courier New",Courier,monospace';
  // 本页签的小工具（只在本文件里用）
  function tools(k) {
    const { C, P, T, F, go } = k;
    const W = {};
    // 门派旗：旗杆 + 飘动的旗面 + 门派招式 + 中文名
    W.flag = (label, sub, color, fill, lsize = 24) => {
      P(k.wl(44, 76, 44, 206, .8), go(.5), .5, { color: C.brown, w: 4 });
      const d = "M46,84 C110,70 170,100 248,84 L248,158 C170,174 110,144 46,158 Z";
      P(d, go(.9), .9, { color, w: 3 });
      F(d, go(.3, 0), { color: fill, op: .9 });
      T(label, 147, 124, go(.9), .9, { size: lsize, color, weight: 900, anchor: "middle", font: MONO });
      T(sub, 147, 149, go(.8), .8, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
    };
    // 在等宽文字 m 的第 i..j-1 个字母外画圈
    W.ring = (m, i, j, color = C.red) => {
      const cx = m.x + (i + j) / 2 * m.cw, cy = m.y - m.size * .34;
      P(k.ellipse(cx, cy, (j - i) * m.cw / 2 + (j - i > 1 ? 3 : 5), m.size * .6), go(.45), .45, { color, w: 3 });
    };
    // 一个成员：原形 → 过去式（+ 中文意思 / 音标），右边写秘诀和例句
    W.row = (o) => {
      const y = o.y, size = o.size || 28;
      const mb = k.mono(o.base, 40, y, size, C.ink, 900);
      T(o.under || o.mean, 40, y + 22, go(.5), .5, { size: 14, color: C.grey, font: o.under ? MONO : undefined });
      const ax = 40 + o.base.length * size * .6 + 14;
      if (o.same) {
        T("=", ax + 22, y - 2, go(.4), .4, { size: 30, color: C.green, weight: 900, anchor: "middle" });
      } else k.arrow(ax, y - 9, ax + 44, y - 9, C.purple);
      const px = ax + 58;
      const mp = k.mono(o.past, px, y, size, C.red, 900);
      if (o.ipa) T(o.ipa, px, y + 22, go(.5), .5, { size: 14, color: C.grey, font: MONO });
      return { mb, mp, px, done: () => {
        if (o.tipN) k.N(o.tipN[0], o.tipN[1]);
        T(o.tip, 392, y - 8, go(Math.max(.8, o.tip.length * .06)), Math.max(.8, o.tip.length * .06), { size: 16, color: C.brown, weight: 900 });
        if (o.exN) k.N(o.exN[0], o.exN[1]);
        const me = k.mono(o.ex, 392, y + 17, 15, C.blue, 700);
        if (o.exWord) k.underline(me, o.exWord, 0, C.orange);
      } };
    };
    // 其余成员一行
    W.others = (text) => {
      T("其余成员：", 40, 428, go(.6), .6, { size: 16, color: C.grey, weight: 900 });
      k.mono(text, 128, 428, 16, C.ink, 700);
    };
    // 结论绿框 + 口诀
    W.fin = (concl, rhyme) => {
      const d = k.roughRect(16, 446, 928, 52);
      P(d, go(1), 1, { color: C.green, w: 2.5 });
      F(k.rectD(16, 446, 928, 52), go(.2, 0), { color: "#ecfdf5", op: .9 });
      T(concl, 36, 480, go(2), 2, { size: 20, color: C.green, weight: 900 });
      T(rhyme, 36, 525, go(1.8), 1.8, { size: 17, color: C.grey, weight: 700 });
    };
    return W;
  }

  WB_LAB.past_clans = [
    // ───────── ① 金钟罩铁布衫派（AAA）─────────
    {
      build(k) {
        const { C, N, T, go } = k, W = tools(k);
        N("", "这节课：为什么有的动词变过去式，不加 -ed？");
        k.header("第一门派：金钟罩铁布衫派", "过去式四大门派", false);
        N("过去式：", "动词表示「以前发生的事」时的样子。比如 play 变成 played。");
        const m1 = k.mono("play → played", 290, 110, 22, C.green, 900);
        k.note("规则动词：直接加 -ed", 520, 110, { color: C.green, weight: 900 });
        k.wait(1);
        N("不规则动词：", "不按「加 -ed」规矩变的动词。put 写成 putted 就错了！");
        const m2 = k.mono("put → putted", 290, 148, 22, C.ink, 900);
        k.strike(m2, "putted"); k.redX(470, 124);
        k.note("不规则动词：不加 -ed", 520, 148, { color: C.red, weight: 900 });
        N("四大门派：", "把不规则动词按发音规律分成 4 组，像武林 4 个门派，一组一组记。");
        W.flag("A A A", "金钟罩铁布衫派", C.red, "#ffe4e6", 26);
        N("AAA：", "原形、过去式、过去分词三个样子完全一样，像穿了金钟罩，怎么打都不变。");
        k.wait(2.6);
        N("爆破音：", "/t/ /d/ 这种音，舌尖一顶再一弹，又短又脆，像小鞭炮。");
        T("秘诀：词尾本来就是爆破音 /t/ /d/，再加 -ed 会撞车被吞掉 → 保持原形", 290, 188, go(2.6), 2.6, { size: 17, color: C.purple, weight: 900 });
        k.wait(.6);

        N("原形：", "动词最原本、没变化的样子，就是词典里查到的样子，比如 put（放）。");
        const r1 = W.row({ y: 248, base: "put", mean: "放", past: "put", ipa: "/pʊt/", same: true,
          tip: "短促闭音节 + t 结尾，过去现在一模一样", ex: "He put his book on the desk yesterday.", exWord: "put",
          exN: ["", "例句里有 yesterday（昨天），动词还是 put，一个字母都不加。"] });
        N("闭音节：", "元音后面被辅音「关上门」，读得又短又快，比如 put 里 u 后面关着 t。");
        W.ring(r1.mb, 2, 3); W.ring(r1.mp, 2, 3);
        r1.done();

        N("", "第二位成员 hurt（弄伤），也是 t 结尾。");
        const r2 = W.row({ y: 308, base: "hurt", mean: "弄伤 / 疼", past: "hurt", ipa: "/hɜːt/", same: true,
          tip: "以 t 结尾，千万别写成 hurted！", ex: "I fell off my bike and hurt my foot.", exWord: "hurt",
          exN: ["", "摔下自行车弄伤了脚：hurt my foot，不是 hurted。"] });
        W.ring(r2.mb, 3, 4); W.ring(r2.mp, 3, 4);
        r2.done();

        N("音标：", "斜线 / / 里的符号，专门记一个词怎么读。read 的拼写不变，读音会变！");
        const r3 = W.row({ y: 368, base: "read", under: "/riːd/ 读", past: "read", ipa: "/red/", same: true,
          tip: "拼写不变，读音从长音 /riːd/ 缩成短音 /red/", ex: "I read an interesting book last night.", exWord: "read",
          tipN: ["长音和短音：", "长音 /iː/ 拉长读，短音 /e/ 短短一下。read 的过去式读起来像 red（红色）。"] });
        k.P(k.ellipse(r3.px + 22, 386, 30, 12), go(.45), .45, { color: C.orange, w: 3 });
        r3.done();

        k.say("Yesterday I put my bag on the desk.", { zh: "昨天我把书包放在桌上。", word: "put" });
        N("", "这一派还有：cut、hit、let、cost，过去式都和原形一样。");
        W.others("cut→cut · hit/let→hit/let · cost→cost");
        N("", "结论：词尾是短促 /t/ /d/ 的这几个动词，过去式 = 原形。");
        W.fin("结论：put / cut / hurt / hit / let / cost / read，过去式 = 原形（AAA）",
          "口诀：t、d 结尾金钟罩，-ed 进不来，原样不变！read 只变读音 /red/。");
        k.say("He cut the cake and hurt his finger.", { zh: "他切蛋糕时弄伤了手指。", word: "cut" });
        N("口诀：", "t、d 结尾金钟罩，-ed 进不来，原样不变！");
        // R2 补朗读（2026-10-29，旧幕推广：四派都是不规则过去式，不属于将来并走的「复数例」，先补）
        k.say("Play, played. Ed.", { zh: "玩，玩了。加 -ed。", word: "play played ed", blocks: ["ed"] });
        k.say("He put his book on the desk yesterday.", { zh: "他昨天把书放在桌上了。", word: "He his book on the desk yesterday" });
        k.say("I fell off my bike and hurt my foot.", { zh: "我从自行车上摔下来，弄伤了脚。", word: "I fell off my bike and hurt foot hurt my foot" });
        k.say("I read an interesting book last night. Read sounds like red.", { zh: "我昨晚读了一本有趣的书。read 的过去式读起来像 red。", word: "read an interesting last night red" });
        k.say("Hit, let, cost. The book cost ten yuan.", { zh: "打、让、花费。这本书花了十元。", word: "hit let cost" });
      },
      r2skip: ["putted", "hurted", "AAA", "A A A"],   // 红叉错写 putted / hurted；AAA 是派别标签（原形 = 过去式 = 过去分词）
      terms: [
        ["过去式", "动词表示「以前发生的事」时的样子，比如 play → played、put → put。"],
        ["原形", "动词最原本、没有变化的样子，也就是词典里查到的样子，比如 put、sing、buy。"],
        ["规则动词", "过去式按规矩直接加 -ed 的动词，比如 play → played、jump → jumped。"],
        ["不规则动词", "过去式不按「加 -ed」规矩变的动词，比如 put → put、sing → sang、buy → bought，要单独记。"],
        ["四大门派", "比喻：把不规则动词按发音规律分成 4 组，像武林里的 4 个门派，同一派的变法一样，一组一组记更快。"],
        ["过去分词", "动词的另一种变化样子，用在 have 后面（比如 have sung），以后会学。"],
        ["AAA 型", "原形、过去式、过去分词三个样子完全一样，比如 put - put - put。"],
        ["金钟罩铁布衫", "比喻：这一派动词像穿了护身铠甲，变过去式时一个字母都不加、不变。"],
        ["元音 / 辅音", "元音是 a e i o u 发出的「响亮」的音；辅音是 b、t、d、p 这类要靠舌头、嘴唇挡一下的音。"],
        ["闭音节", "元音后面跟着辅音「关上门」，读得又短又快，比如 put、cut、hit。"],
        ["爆破音", "像 /t/ /d/ /p/ 这样的音：先堵住气，再一下子放开，又短又脆，像小鞭炮。"],
        ["舌尖爆破音 /t/ /d/", "舌尖顶住上牙后面，再一弹发出的 /t/ /d/。这一派动词的词尾都是它。"],
        ["音标", "写在斜线 / / 里的读音符号，告诉你一个词怎么读，比如 read 读 /riːd/。"],
        ["长音 / 短音", "长音拉长读，比如 /iː/；短音短短一下，比如 /e/。read 的过去式就是从长音变成了短音 /red/。"],
        ["第一性原理", "从最根本的原因去想问题：不死记，先弄明白「为什么会这样」。"],
        ["古英语", "一千多年前的英语。很多不规则动词的变法就是那时候留下来的。"]
      ]
    },
    // ───────── ② 水流音乐元音换挡派（i → a）─────────
    {
      build(k) {
        const { C, N, T, go } = k, W = tools(k);
        N("", "这一派的秘密藏在中间的元音字母里：i 一换成 a，就变成过去式。");
        k.header("第二门派：水流音乐元音换挡派", "过去式四大门派", false);
        W.flag("i → a", "元音换挡派", C.blue, "#dbeafe", 28);
        N("元音交替：", "不加 -ed，只把单词中间的元音换掉来表示时间，就像汽车换挡。");
        const m = k.mono("sing → sang → sung", 290, 112, 24, C.ink, 900);
        W.ring(m, 1, 2, C.red); W.ring(m, 8, 9, C.green); W.ring(m, 15, 16, C.purple);
        N("", "现在 sing 用 i，过去式 sang 用 a，过去分词 sung 用 u。");
        k.wait(.8);
        T("现在", m.x + 1.5 * m.cw, 140, go(.5), .5, { size: 14, color: C.red, weight: 900, anchor: "middle" });
        T("过去式", m.x + 8.5 * m.cw, 140, go(.5), .5, { size: 14, color: C.green, weight: 900, anchor: "middle" });
        T("过去分词", m.x + 15.5 * m.cw, 140, go(.5), .5, { size: 14, color: C.purple, weight: 900, anchor: "middle" });
        N("口腔张开度：", "嘴巴张多大。i 嘴扁扁，a 嘴张得最大，u 嘴巴半张收一点。");
        k.note("i 扁嘴 → a 张大嘴 → u 半张嘴", 600, 112, { color: C.blue, weight: 900 });
        k.note("例：We sang English songs at the party.", 600, 140, { size: 15, color: C.grey });
        N("鼻音：", "气从鼻子出来的音，比如 -ng、-nk、-m、-n。带这些音的动词常在这一派。");
        T("秘诀：带鼻音 -ng / -nk / -m / -n 的常用动词，多数在这一派", 290, 188, go(2.2), 2.2, { size: 17, color: C.purple, weight: 900 });
        k.wait(.6);

        N("", "成员 swim（游泳）：结尾 m 是鼻音，中间 i 换成 a。");
        const r1 = W.row({ y: 248, base: "swim", mean: "游泳", past: "swam", ipa: "过去分词 swum",
          tip: "i ➔ a 元音换挡", ex: "I swam in the blue sea last summer.", exWord: "swam",
          exN: ["", "去年夏天在大海里游泳：swam。"] });
        W.ring(r1.mb, 2, 3); W.ring(r1.mp, 2, 3, C.green);
        r1.done();

        N("", "成员 drink（喝）：结尾 -nk 是鼻音，i 换成 a 就是 drank。");
        const r2 = W.row({ y: 308, base: "drink", mean: "喝水", past: "drank", ipa: "过去分词 drunk",
          tip: "i ➔ a 元音换挡", ex: "He drank a big glass of milk.", exWord: "drank",
          exN: ["", "他喝了一大杯牛奶：drank。"] });
        W.ring(r2.mb, 2, 3); W.ring(r2.mp, 2, 3, C.green);
        r2.done();

        N("", "sit（坐）和 give（给）：短 i 变 a 是 sat，长 i_e 变 a_e 是 gave。");
        const r3 = W.row({ y: 368, size: 22, base: "sit/give", mean: "坐 / 给", past: "sat/gave",
          tip: "短 i 变 a (sat)，长 i_e 变 a_e (gave)", ex: "She sat down and gave me a smile.", exWord: "sat",
          tipN: ["i_e：", "i 后面隔一个辅音再跟个不发音的 e，像 give、bike。"] });
        W.ring(r3.mb, 1, 2); W.ring(r3.mb, 6, 7); W.ring(r3.mp, 1, 2, C.green); W.ring(r3.mp, 5, 6, C.green);
        r3.done();

        k.say("We sang and swam last summer.", { zh: "去年夏天我们唱歌、游泳。", word: "sang" });
        N("", "begin、ring 也是 i 变 a。run、come 变 ran、came，不是 i 变 a，单独记！");
        W.others("begin/ring→began/rang · run/come→ran/came");
        T("（不是 i 变 a）", 128 + 39 * 9.6 + 14, 428, go(.8), .8, { size: 15, color: C.red, weight: 900 });
        N("", "结论：i 换成 a，就是过去式。");
        W.fin("结论：sing→sang、swim→swam、drink→drank：中间的 i 换成 a = 过去式",
          "口诀：现在 i 扁嘴，过去 a 张嘴，换个元音就过去！");
        k.say("She drank some milk and sat down.", { zh: "她喝了点牛奶，然后坐下了。", word: "drank" });
        N("口诀：", "现在 i 扁嘴，过去 a 张嘴，换个元音就过去！");
        // R2 补朗读（2026-10-29，旧幕推广：四派都是不规则过去式，不属于将来并走的「复数例」，先补）
        k.say("Sing, sang, sung. We sang English songs at the party.", { zh: "唱，唱了，唱过。我们在聚会上唱了英文歌。", word: "a sing sung We English songs at the party" });
        k.say("Swim, swam, swum. I swam in the blue sea last summer.", { zh: "游，游了，游过。去年夏天我在蓝色的大海里游泳。", word: "swim swam swum I in blue sea last summer" });
        k.say("Drink, drank, drunk. He drank a big glass of milk.", { zh: "喝，喝了，喝过。他喝了一大杯牛奶。", word: "drink drunk He big glass of milk" });
        k.say("Sit, sat. Give, gave. She sat down and gave me a smile.", { zh: "坐，坐了。给，给了。她坐下来，对我笑了笑。", word: "sit sat give gave She down and me smile" });
        k.say("Ng, nk. Sing, drink.", { zh: "-ng、-nk 结尾。唱、喝。", word: "ng nk", blocks: ["ng", "nk"] });
        k.say("Begin, ring, rang. The bell rang.", { zh: "开始、响、响了。铃响了。", word: "begin ring rang" });
        k.say("Run, ran. Come, came. I ran home and came back. Ride a bike. Ed.", { zh: "跑，跑了。来，来了。我跑回家又回来了。骑自行车。-ed。", word: "run ran come came bike ed", blocks: ["ed"] });
      },
      terms: [
        ["元音交替（Ablaut）", "不加 -ed，只换掉单词中间的元音来表示时间，比如 sing → sang → sung。"],
        ["元音换挡", "比喻：像汽车换挡一样，把元音 i 换成 a，动词就「开」到了过去。"],
        ["口腔张开度", "发音时嘴巴张多大：i 嘴扁扁，a 张得最大，u 半张。"],
        ["前高元音 i /ɪ/", "舌头往前、抬得高的元音，嘴巴很扁，比如 sing 里的 i。"],
        ["鼻音", "气从鼻子里出来的音，比如 -ng（sing）、-nk（drink）、-m（swim）、-n（begin）。"],
        ["日耳曼语", "英语、德语的「老祖宗」语言家族。元音换挡就是从那里传下来的老办法。"],
        ["i_e（不发音的 e）", "i 后面隔一个辅音再跟一个 e，这个 e 不读，比如 give、bike。"]
      ]
    },
    // ───────── ③ 长音减肥派（ee → e + t）─────────
    {
      build(k) {
        const { C, N, T, P, F, go } = k, W = tools(k);
        N("", "这一派的动词原来读长长的 /iː/，变过去式时会「减肥」。");
        k.header("第三门派：长音减肥派", "过去式四大门派", false);
        W.flag("ee → e+t", "长音减肥派", C.green, "#d1fae5", 22);
        N("长元音：", "要拉长读的元音，比如 /iː/，读成「衣——」。ee、ea 常读 /iː/。");
        k.wait(1);
        T("/iː/ 长", 290, 112, go(.6), .6, { size: 18, color: C.red, weight: 900, font: MONO });
        let d = k.rectD(370, 98, 200, 18);
        P(k.roughRect(370, 98, 200, 18), go(.8), .8, { color: C.red, w: 2.5 }); F(d, go(.2, 0), { color: "#fecdd3", op: .9 });
        N("短元音：", "短短读一下的元音，比如 /e/。从长音变成短音，就像减肥变瘦。");
        k.wait(.5);
        k.arrow(590, 107, 640, 107, C.purple);
        d = k.rectD(660, 98, 60, 18);
        P(k.roughRect(660, 98, 60, 18), go(.6), .6, { color: C.green, w: 2.5 }); F(d, go(.2, 0), { color: "#bbf7d0", op: .9 });
        T("/e/ 短", 735, 112, go(.6), .6, { size: 18, color: C.green, weight: 900, font: MONO });
        N("音节：", "单词里一拍一拍的读音单位。词尾加上 t，这一拍变挤了，长音只好缩短。");
        k.mono("sleep /sliːp/ → slept /slept/", 290, 150, 20, C.ink, 900);
        T("秘诀：词尾加 -t，音节变挤 → 长音 /iː/ 减肥成短音 /e/", 290, 188, go(2.2), 2.2, { size: 17, color: C.purple, weight: 900 });
        k.wait(.6);

        N("", "成员 sleep（睡觉）：ee 缩成一个 e，后面加 t，就是 slept。");
        const r1 = W.row({ y: 248, base: "sleep", under: "/sliːp/ 睡觉", past: "slept", ipa: "/slept/",
          tip: "ee 缩成 e + t", ex: "I slept very well last night.", exWord: "slept",
          exN: ["", "昨晚睡得很好：slept。"] });
        W.ring(r1.mb, 2, 4); W.ring(r1.mp, 2, 3, C.green); W.ring(r1.mp, 4, 5, C.green);
        r1.done();

        N("", "成员 feel（感觉）：也是 ee 缩成 e，再加 t，变成 felt。");
        const r2 = W.row({ y: 308, base: "feel", under: "/fiːl/ 感觉", past: "felt", ipa: "/felt/",
          tip: "ee 缩成 e + t", ex: "He felt very happy yesterday.", exWord: "felt",
          exN: ["", "昨天他感觉很开心：felt。"] });
        W.ring(r2.mb, 1, 3); W.ring(r2.mp, 1, 2, C.green); W.ring(r2.mp, 3, 4, C.green);
        r2.done();

        N("清音 / 浊音：", "清音喉咙不震动，像 f、t；浊音喉咙会震动，像 v、d。");
        const r3 = W.row({ y: 368, base: "leave", under: "/liːv/ 离开", past: "left", ipa: "/left/",
          tip: "ea 缩成 e，浊音 v 变清音 f + t", ex: "The train left ten minutes ago.", exWord: "left",
          tipN: ["同化：", "两个音挨着，一个变得像另一个。v 挨着清音 t，就变成清音 f。"] });
        W.ring(r3.mb, 1, 3); W.ring(r3.mb, 3, 4, C.orange); W.ring(r3.mp, 2, 3, C.orange); W.ring(r3.mp, 3, 4, C.green);
        r3.done();

        k.say("I slept well and felt happy.", { zh: "我睡得很好，感觉很开心。", word: "slept" });
        N("", "还有 keep、sweep；meet、feed 直接减掉一个 e，变成 met、fed。");
        W.others("keep→kept · sweep→swept · meet/feed→met/fed");
        N("", "结论：ee / ea 缩成一个 e，后面加 t。");
        W.fin("结论：sleep→slept、feel→felt、leave→left：长音 ee/ea 缩成 e，再加 t",
          "口诀：加 t 太挤要减肥，两个 e 变一个 e！");
        k.say("We met at the park.", { zh: "我们在公园见面了。", word: "met" });
        N("口诀：", "加 t 太挤要减肥，两个 e 变一个 e！");
        // R2 补朗读（2026-10-29，旧幕推广：四派都是不规则过去式，不属于将来并走的「复数例」，先补）
        k.say("Ee, ea. Sleep, feel, leave.", { zh: "ee、ea。睡、感觉、离开。", word: "ee ea sleep feel leave", blocks: ["ee", "ea"] });
        k.say("I slept very well last night.", { zh: "我昨晚睡得很好。", word: "I very well last night" });
        k.say("He felt very happy yesterday.", { zh: "他昨天很开心。", word: "felt He happy yesterday" });
        k.say("The train left ten minutes ago.", { zh: "火车十分钟前开走了。", word: "left The train ten minutes ago" });
        k.say("Keep, kept. Sweep, swept. Meet. Feed, fed.", { zh: "保持、扫、见面、喂。", word: "keep kept sweep swept meet feed fed" });
      },
      terms: [
        ["长元音", "要拉长读的元音，比如 /iː/（读成「衣——」）。ee、ea 经常读 /iː/，比如 sleep、leave。"],
        ["短元音", "短短读一下的元音，比如 /e/，像 slept、felt 里的 e。"],
        ["长音减肥", "比喻：长元音 /iː/ 变过去式时缩成短元音 /e/，就像减肥变瘦了。"],
        ["音节", "单词里一拍一拍的读音单位。sleep 是一拍，加上 t 后这一拍变挤，长音只好缩短。"],
        ["清音", "发音时喉咙不震动的辅音，比如 f、t、p、k。"],
        ["浊音", "发音时喉咙会震动的辅音，比如 v、d、b、g。"],
        ["同化", "两个音挨在一起时，一个变得像另一个。leave 里的浊音 v 挨着清音 t，就变成清音 f：left。"]
      ]
    },
    // ───────── ④ -ought / -aught 六大护法派 ─────────
    {
      build(k) {
        const { C, N, T, P, go } = k, W = tools(k);
        N("", "bought、brought、caught、taught 长得太像，到底怎么写？");
        k.header("第四门派：-ought / -aught 护法派", "过去式四大门派", false);
        N("护法：", "比喻：这一派成员都带着同一个「保镖」尾巴 -ought 或 -aught。");
        W.flag("-ought/-aught", "六大护法派", C.purple, "#ede9fe", 20);
        k.wait(.4);
        N("不发音字母：", "写出来但不读的字母。gh 在这里不发音，ought、aught 都读 /ɔːt/。");
        const m = k.mono("-ought = -aught = /ɔːt/", 290, 112, 22, C.ink, 900);
        P(k.wl(m.x0("gh") + 2, 92, m.x1("gh") - 2, 110, .4), go(.35), .35, { color: C.red, w: 3 });
        P(k.wl(m.x0("gh", 1) + 2, 92, m.x1("gh", 1) - 2, 110, .4), go(.35), .35, { color: C.red, w: 3 });
        k.note("gh 不发音！", 610, 112, { color: C.red, weight: 900 });
        N("黄金铁律：", "看原形里有没有字母 a：有 a 写 -aught，没有 a 写 -ought。");
        T("原形有 a → -aught", 290, 150, go(1.2), 1.2, { size: 19, color: C.orange, weight: 900 });
        k.note("（teach、catch）", 470, 150, { size: 16 });
        T("没有 a → -ought", 620, 150, go(1.2), 1.2, { size: 19, color: C.blue, weight: 900 });
        T("秘诀：先找原形里的字母 a，再决定写 -aught 还是 -ought", 290, 188, go(2.2), 2.2, { size: 17, color: C.purple, weight: 900 });
        k.wait(.6);

        N("", "成员 buy（买）：原形里没有 a，所以写 -ought：bought。");
        const r1 = W.row({ y: 248, base: "buy", mean: "买", past: "bought", ipa: "/bɔːt/",
          tip: "无 a 用 -ought（去商店买礼物）", ex: "Mom bought a new dress for me.", exWord: "bought",
          exN: ["", "妈妈给我买了一条新裙子：bought。"] });
        W.ring(r1.mp, 1, 6, C.blue);
        r1.done();

        N("", "成员 bring（带来）：开头 br- 留着，没有 a，写 brought。");
        const r2 = W.row({ y: 308, base: "bring", mean: "带来", past: "brought", ipa: "/brɔːt/",
          tip: "br- 开头保留，别和 bought 混！", ex: "He brought his puppy to the park.", exWord: "brought",
          exN: ["", "注意：bought 是「买了」，brought 多一个 r，是「带来了」。"] });
        W.ring(r2.mb, 0, 2, C.orange); W.ring(r2.mp, 0, 2, C.orange); W.ring(r2.mp, 2, 7, C.blue);
        r2.done();

        N("", "成员 teach（教）：原形 teach 里有字母 a，所以必须写 -aught！");
        const r3 = W.row({ y: 368, base: "teach", mean: "教课", past: "taught", ipa: "/tɔːt/",
          tip: "原形 teach 里有字母 a ➔ 必用 -aught！", ex: "Miss White taught us English last year.", exWord: "taught",
          exN: ["", "去年怀特老师教我们英语：taught。"] });
        W.ring(r3.mb, 2, 3, C.orange); W.ring(r3.mp, 1, 6, C.orange);
        r3.done();

        k.say("Mom bought me a book. Mr. Li taught us English.", { zh: "妈妈给我买了一本书。李老师教我们英语。", word: "bought" });
        N("", "还有 think→thought、fight→fought；catch 有 a，所以是 caught。");
        W.others("think→thought · fight→fought · catch→caught");
        N("", "结论：原形有 a 写 -aught，没有 a 写 -ought，都读 /ɔːt/。");
        W.fin("结论：有 a → -aught（taught、caught）；没 a → -ought（bought…）",
          "口诀：原形有 a 用 aught，其余全用 ought，gh 不出声！");
        k.say("I thought he caught the ball.", { zh: "我以为他接住了球。", word: "caught" });
        N("口诀：", "原形有 a 用 aught，其余全用 ought，gh 不出声！");
        // R2 补朗读（2026-10-29，旧幕推广：四派都是不规则过去式，不属于将来并走的「复数例」，先补）
        k.say("Ought, aught, gh. Teach, catch, buy, bring, think, fight.", { zh: "-ought、-aught、gh。教、抓、买、带来、想、打架。", word: "ought aught gh a teach catch buy bring think fight", blocks: ["ought", "aught", "gh"] });
        k.say("Mom bought a new dress for me.", { zh: "妈妈给我买了一条新裙子。", word: "Mom new dress for me" });
        k.say("Br. He brought his puppy to the park.", { zh: "br-。他把小狗带到了公园。", word: "brought br He his puppy to the park", blocks: ["br"] });
        k.say("Miss White taught us English last year.", { zh: "怀特老师去年教我们英语。", word: "taught Miss White us English last year" });
        k.say("I thought about it. They fought.", { zh: "我想了想。他们打架了。", word: "thought fought" });
      },
      terms: [
        ["-ought / -aught", "这一派过去式共同的尾巴，都读 /ɔːt/，比如 bought、thought、taught、caught。"],
        ["六大护法", "比喻：这一派成员都带着同一个「保镖」尾巴 -ought 或 -aught，一眼就能认出来。"],
        ["不发音字母", "写出来但不读的字母。-ought、-aught 里的 gh 就不发音。"],
        ["黄金铁律", "原形里有字母 a（teach、catch）→ 写 -aught；没有 a（buy、think、bring、fight）→ 写 -ought。"],
        ["舌根摩擦音", "舌头后部靠近上颚、让气挤出来的音。古英语里 gh 就读这个音，后来不读了。"],
        ["元音后移", "发元音时舌头的位置往后退，ought / aught 里的元音就是这样变成 /ɔː/ 的。"]
      ]
    }
  ];
})();
