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
