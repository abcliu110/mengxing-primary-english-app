// ==================== 第一性原理 ① 口腔省力同化律（fp_economy）====================
// 4 幕 = FIRST_PRINCIPLES_DB[0].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
WB_LAB.fp_economy = [
  // ───────── 1-1 为什么 -s 和 -ed 都有三种读音？─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：复数 -s 和过去式 -ed，为什么各有三种读音？");
      k.header("① 口腔省力同化律", "-s 和 -ed 的三种读音", false);
      N("", "看起来要背 6 种读音……");
      k.mono("books /s/   bags /z/    buses /ɪz/", 40, 104, 20, C.ink, 700);
      k.mono("worked /t/  played /d/  wanted /ɪd/", 40, 136, 20, C.ink, 700);
      N("", "其实只看一件事：前一个音，声带有没有震动。");
      k.wait(.6);
      // 口腔图
      N("声带：", "喉咙里的两片小肉，发某些音时会快速震动。");
      const m = D.mouth({ x: 70, y: 168, s: .95 });
      const wv = m.waves();
      k.wait(.4);
      // 试 /k/
      N("清辅音：", "发音时声带不震动的辅音，比如 /k/ /p/ /t/ /s/。");
      D.tag("/k/", 300, 214, C.blue, 24);
      T("声带不震", 300, 250, go(.6), .6, { size: 18, color: C.blue, weight: 900 });
      T("= 清", 300, 276, go(.4), .4, { size: 18, color: C.blue, weight: 900 });
      k.wait(.8);
      // 试 /ɡ/：声带抖动 + 波纹
      N("浊辅音：", "发音时声带震动的辅音，比如 /ɡ/ /b/ /d/ /v/；元音也都震。");
      D.tag("/ɡ/", 300, 340, C.green, 24);
      const tb = go(.2);
      k.buzz(m.cords, tb, 3.2, 2.2); k.fade(wv, tb, .3, 1); k.fade(wv, tb + 3, .3, 0);
      T("声带震动", 300, 376, go(.6), .6, { size: 18, color: C.green, weight: 900 });
      T("= 浊", 300, 402, go(.4), .4, { size: 18, color: C.green, weight: 900 });
      k.wait(1.4);
      // 右边：两列
      P(k.wl(595, 170, 595, 395, 1), go(.4), .4, { color: "#cbd5e1", w: 2, dash: "6 7" });
      k.head("不震 → 尾巴不震", 410, 192, C.blue, "start", 18);
      k.head("震 → 尾巴也震", 615, 192, C.green, "start", 18);
      N("同化：", "后一个音学前一个音的样子，嘴巴最省力。");
      const r1 = k.mono("book+s", 410, 236, 24, C.ink, 900);
      P(k.ellipse(r1.x + 3.5 * r1.cw, r1.y - 8, 10, 16), go(.4), .4, { color: C.blue, w: 2.5 });
      k.arrow(r1.x + 3.5 * r1.cw + 6, r1.y + 12, r1.x + 5.5 * r1.cw, r1.y + 26, C.blue);
      T("/s/", 410, 284, go(.4), .4, { size: 22, color: C.blue, weight: 900, font: M });
      N("", "book 最后是 /k/，声带不震，-s 就顺势读不震的 /s/。");
      const r2 = k.mono("bag+s", 615, 236, 24, C.ink, 900);
      P(k.ellipse(r2.x + 2.5 * r2.cw, r2.y - 8, 10, 16), go(.4), .4, { color: C.green, w: 2.5 });
      k.arrow(r2.x + 2.5 * r2.cw + 6, r2.y + 12, r2.x + 4.5 * r2.cw, r2.y + 26, C.green);
      T("/z/", 615, 284, go(.4), .4, { size: 22, color: C.green, weight: 900, font: M });
      N("", "bag 最后是 /ɡ/，声带在震，-s 就顺势读会震的 /z/。");
      k.wait(.8);
      N("过去式：", "表示以前发生的事，规则动词加 -ed。同一条规律！");
      k.mono("worked", 410, 336, 24, C.ink, 900);
      T("/t/", 410, 372, go(.4), .4, { size: 22, color: C.blue, weight: 900, font: M });
      T("/k/ 不震", 460, 372, go(.5), .5, { size: 15, color: C.grey });
      k.mono("played", 615, 336, 24, C.ink, 900);
      T("/d/", 615, 372, go(.4), .4, { size: 22, color: C.green, weight: 900, font: M });
      T("/eɪ/ 元音会震", 665, 372, go(.6), .6, { size: 15, color: C.grey });
      k.wait(.6);
      N("", "那 buses /ɪz/、wanted /ɪd/ 呢？下一幕讲。");
      T("buses  wanted  → ?", 410, 422, go(1), 1, { size: 18, color: C.grey, weight: 700, font: M });
      k.wait(.6);
      N("口诀：", "前音不震尾不震，前音一震尾也震。");
      D.fin("清配清，浊配浊：-s / -ed 跟着前一个音的声带走", "口诀：前音不震尾不震，前音一震尾也震。");
      k.wait(2);
    },
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
    ],
  },
];
WB_LAB.fp_economy.push(
  // ───────── 1-2 为什么 s/sh/ch/x 加 -es，t/d 加 -ed 要多读 /ɪ/？─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：buses、wanted 为什么要多读一个 /ɪ/？");
      k.header("① 口腔省力同化律", "为什么多读一个 /ɪ/？", false);
      N("", "先试试：bus 后面直接加一个 /s/……");
      const m = D.mouth({ x: 66, y: 150, s: .9 });
      N("舌尖音：", "舌尖顶在上牙后面发的音，比如 /s/ /z/ /t/ /d/。");
      m.glow(166, 132);
      T("/s/ 在这里", m.X(150), m.Y(100), go(.6), .6, { size: 15, color: C.orange, weight: 900, anchor: "end" });
      k.wait(.4);
      // 撞车动画
      k.head("bus + s", 320, 160, C.ink, "start", 24);
      T("/bʌs/", 320, 220, go(.6), .6, { size: 30, color: C.ink, weight: 900, font: M });
      const gs = k.group();
      P(k.ellipse(580, 210, 22, 22), go(.4), .4, { color: C.red, w: 2.5 });
      T("s", 580, 220, go(.3), .3, { size: 30, color: C.red, weight: 900, font: M, anchor: "middle" });
      k.endGroup();
      N("吞音：", "两个一样的音挨在一起，会粘成一个，听不出来。");
      const tm = go(1.2);
      k.move(gs, tm, 1.2, -200, 0);
      k.buzz(gs, tm + 1.2, .8, 2);
      k.wait(.4);
      k.redX(372, 234);
      T("粘成一个 /s/，听不出是复数！", 402, 258, go(1), 1, { size: 17, color: C.red, weight: 900 });
      k.wait(.6);
      // 插 /ɪ/
      N("", "办法：中间插一个短短的 /ɪ/，把两个音隔开。");
      k.move(gs, go(.8), .8, 200, 0);
      k.wait(.2);
      T("bus + ɪ + z", 320, 316, go(.8), .8, { size: 26, color: C.ink, weight: 900, font: M });
      k.arrow(520, 307, 570, 307, C.grey);
      T("/ˈbʌsɪz/  buses", 586, 316, go(.8), .8, { size: 26, color: C.green, weight: 900, font: M });
      T("↑ 多了一个 /ɪ/", 434, 344, go(.6), .6, { size: 16, color: C.orange, weight: 900 });
      k.wait(.6);
      // 套用：row(原形, 词尾, 音标, x, y)
      const row = (base, tail, ipa, x, y) => {
        const cw = 20 * .6;
        T(base, x, y, go(.4), .4, { size: 20, color: C.ink, weight: 900, font: M });
        const ax = x + base.length * cw + 8;
        k.arrow(ax, y - 6, ax + 26, y - 6, C.grey);
        const bx = ax + 34;
        D.parts([[base, C.ink], [tail, C.orange]], bx, y, 20);
        T(ipa, bx + (base.length + tail.length) * cw + 12, y, go(.5), .5, { size: 18, color: C.grey, weight: 700, font: M });
      };
      N("嘶嘶音：", "/s/ /z/ /ʃ/ /tʃ/ 这类像蛇嘶嘶响的音，加 -es 读 /ɪz/。");
      row("watch", "es", "/ˈwɒtʃɪz/", 320, 394);
      row("box", "es", "/ˈbɒksɪz/", 320, 424);
      k.wait(.4);
      N("", "-ed 也一样：want 最后是 /t/，再加 /t/ 就粘住了。");
      row("want", "ed", "/ˈwɒntɪd/", 640, 394);
      row("need", "ed", "/ˈniːdɪd/", 640, 424);
      k.wait(.6);
      N("口诀：", "同位相撞，插个 /ɪ/ 来帮忙。");
      D.fin("尾音和词缀发音位置一样 → 插 /ɪ/ 隔开：-es 读 /ɪz/，-ed 读 /ɪd/", "口诀：同位相撞，插个 /ɪ/ 来帮忙。");
      k.wait(2);
    },
    terms: [
      ["舌尖音", "舌尖顶在上牙后面发出的音，如 /s/ /z/ /t/ /d/。"],
      ["嘶嘶音", "/s/ /z/ /ʃ/ /ʒ/ /tʃ/ /dʒ/，读起来像蛇嘶嘶响。词尾是 s、x、sh、ch 的词，加 -es 读 /ɪz/。"],
      ["吞音", "两个发音位置一样的音挨在一起，粘成一个，后面那个就听不出来了。"],
    ],
  },
);
WB_LAB.fp_economy.push(
  // ───────── 1-3 为什么 a 变 an？为什么 in- 变成 im-？─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：a 为什么变 an？in- 为什么变 im-？");
      k.header("① 口腔省力同化律", "a → an，in- → im-", true);
      // 左：a → an
      N("冠词：", "放在名词前面的小词 a / an / the。a、an 表示「一个」。");
      k.head("a → an", 40, 108, C.blue, "start", 22);
      const m1 = k.mono("a apple", 60, 182, 30, C.ink, 900);
      N("元音：", "气流不受阻挡的音，比如 /æ/ /ɒ/ /aʊ/。两个元音挨着，嘴巴会卡一下。");
      P(k.wave(m1.x + 1.1 * m1.cw, m1.x + 2 * m1.cw - 2, m1.y - 30, 4), go(.5), .5, { color: C.red, w: 2.5 });
      T("卡一下！", m1.x + 2.2 * m1.cw, m1.y - 30, go(.5), .5, { size: 16, color: C.red, weight: 900 });
      k.redX(250, 154);
      k.wait(.4);
      N("", "加一个 /n/，像一座小桥，让气流顺顺地过去。");
      D.parts([["a", C.ink], ["n", C.orange], [" apple", C.ink]], 60, 250, 30);
      const bx = 60 + 1.5 * 18, ex = 60 + 3.3 * 18;
      P(`M${bx},${222} Q${(bx + ex) / 2},${196} ${ex},${222}`, go(.6), .6, { color: C.orange, w: 3 });
      T("/n/ 小桥", (bx + ex) / 2 + 60, 206, go(.5), .5, { size: 16, color: C.orange, weight: 900 });
      T("/æn ˈæpl/", 260, 250, go(.6), .6, { size: 20, color: C.grey, weight: 700, font: M });
      k.wait(.5);
      N("", "看第一个「音」，不看字母：hour 的 h 不读，开头是元音。");
      const m2 = k.mono("an hour", 60, 322, 24, C.ink, 900);
      k.strike(m2, "h", 0, C.red);
      T("h 不读，/aʊə/ 开头 → an", 240, 322, go(.8), .8, { size: 16, color: C.green, weight: 900 });
      N("", "useful 开头读 /j/，是辅音，所以还是用 a。");
      k.mono("a useful book", 60, 372, 24, C.ink, 900);
      T("u 读 /j/（辅音）→ a", 290, 372, go(.8), .8, { size: 16, color: C.blue, weight: 900 });
      k.wait(.5);
      // 右：in- → im-
      N("前缀：", "加在单词前面、改变意思的部分。in- 表示「不」。");
      k.head("in- → im-", 510, 108, C.purple, "start", 22);
      N("双唇音：", "上下嘴唇合在一起发的音：/p/ /b/ /m/。");
      const L = D.lips(600, 176, 96, 24);
      T("读 /p/：双唇先合上", 670, 182, go(.8), .8, { size: 17, color: C.red, weight: 900 });
      const tc = go(.2);
      L.close(tc, .5); L.open(tc + 1.2, .4); L.close(tc + 2, .5);
      k.wait(2.4);
      N("鼻音：", "气流从鼻子出来的音，/n/ 和 /m/ 都是。");
      const m3 = k.mono("in + polite", 520, 270, 28, C.ink, 900);
      k.underline(m3, "p", 0, C.red);
      N("", "嘴唇已经为 /p/ 合上了，/n/ 自然变成双唇的 /m/。");
      k.strike(m3, "n", 0, C.red);
      k.above(m3, "n", 0, "m", C.orange);
      k.arrow(520, 300, 560, 300, C.grey);
      D.parts([["i", C.green], ["m", C.orange], ["polite", C.green]], 574, 308, 28);
      T("不礼貌的", 760, 306, go(.5), .5, { size: 17, color: C.grey });
      k.wait(.4);
      N("", "同理：in + possible，变成 impossible（不可能的）。");
      D.parts([["in + possible  ", C.ink]], 520, 372, 22);
      k.arrow(728, 366, 760, 366, C.grey);
      D.parts([["i", C.green], ["m", C.orange], ["possible", C.green]], 770, 372, 22);
      k.wait(.6);
      N("口诀：", "元音前面搭座桥，双唇前面 n 变 m。");
      D.fin("元音撞元音加 /n/ 架桥（an）；/p/ /b/ /m/ 前面 n 变 m（im-）", "口诀：元音前面搭座桥，双唇前面 n 变 m。");
      k.wait(2);
    },
    terms: [
      ["冠词", "放在名词前面的小词：a / an（一个）、the（这个、那个）。"],
      ["前缀", "加在单词前面、改变意思的部分，如 in-、im-、un- 表示「不」。"],
      ["双唇音", "上下嘴唇合在一起发的音：/p/ /b/ /m/。"],
      ["鼻音", "气流从鼻子出来的音：/m/ /n/ /ŋ/。"],
    ],
  },
);
