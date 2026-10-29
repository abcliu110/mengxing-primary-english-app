// ==================== 单词身世 · 格林定律章：元音变异 ③（原定律 C：清名浊动；v2 + 讲解员）====================
// 依赖 cases/wo_props.js、cases/wo_vowel_kit.js（VW_KIT）。来源与纠错说明见 wo_vowel_kit.js 文件头、word_origins/SOURCES.md ⑤、grimm_law/VOWEL_SHIFT_INVENTORY.md。
WB_LAB.wo_vowel_c = [
  // ───────── 元音变异 ③（原定律 C：清名浊动）─────────
  {
    build(k) {
      const { C, N } = k, V = VW_KIT, S = k.S;
      N("", "safe 是「安全的」，save 是「拯救」。只差一个字母，秘密藏在喉咙里！");
      const me = V.open(k, { title: "元音变异 ③：清辅音 ↔ 浊辅音", sub: "格林定律章", badges: ["📜", "✂️", "⚠️"] });
      k.T("（原实验室「定律 C：清名浊动 · 清辅音 ↔ 浊辅音」）", 40, 78, k.go(.6), .6, { size: 13, color: C.grey, weight: 700 });
      // 两个喉咙
      const throat = (cx, voiced) => {
        k.P(k.wl(cx - 32, 92, cx - 28, 200, 1) + " " + k.wl(cx + 32, 92, cx + 28, 200, 1).replace(/^M/, "M"), k.go(.6), .6, { color: C.ink, w: 2.5 });
        k.T("声带", cx + 40, 126, k.go(.3), .3, { size: 14, color: C.grey, weight: 700 });
        if (voiced) {
          k.P(k.wave(cx - 24, cx + 24, 146, 4) + " " + k.wave(cx - 24, cx + 24, 158, 4), k.go(.6), .6, { color: C.purple, w: 3 });
          k.P("M" + (cx - 46) + ",140 q-8,12 0,24 M" + (cx + 46) + ",140 q8,12 0,24", k.go(.4), .4, { color: C.purple, w: 2 });
        } else {
          k.P(k.wl(cx - 24, 146, cx + 24, 146, .3) + " " + k.wl(cx - 24, 158, cx + 24, 158, .3).replace(/^M/, "M"), k.go(.5), .5, { color: C.blue, w: 3 });
        }
      };
      N("声带：", "喉咙里两片薄薄的肉。用手摸着脖子说话，就能感觉它在不在震动。");
      throat(110, false);
      N("清辅音：", "发音时声带不震动，只有气流「呼呼」出去，比如 /f/、/θ/、/s/。");
      k.T("清辅音：不震动", 110, 228, k.go(.6), .6, { size: 17, color: C.blue, weight: 900, anchor: "middle" });
      k.T("/f/ /θ/ /s/", 110, 256, k.go(.6), .6, { size: 20, color: C.blue, weight: 900, anchor: "middle", font: WB.MONO });
      N("浊辅音：", "发音时声带「嗡嗡」震动，比如 /v/、/ð/、/z/。");
      throat(330, true);
      k.T("浊辅音：嗡嗡震动", 330, 228, k.go(.6), .6, { size: 17, color: C.purple, weight: 900, anchor: "middle" });
      k.T("/v/ /ð/ /z/", 330, 256, k.go(.6), .6, { size: 20, color: C.purple, weight: 900, anchor: "middle", font: WB.MONO });

      // 右上：清名浊动
      N("清名浊动：", "词尾是清辅音，词安静地当名词或形容词；换成浊辅音，就「动」起来当动词。");
      k.P(k.roughRect(480, 82, 420, 196), k.go(.8), .8, { color: C.ink, w: 2 });
      V.txt(k, "清辅音结尾 = 静：名词 / 形容词", 496, 120, { size: 19, color: C.blue, weight: 900 });
      V.txt(k, "浊辅音结尾 = 动：动词", 496, 158, { size: 19, color: C.purple, weight: 900 });
      N("静态和动态：", "静态说「是什么、怎么样」，动态说「做什么」。三对音这样换：");
      k.T("/f/→/v/\u00a0\u00a0\u00a0/θ/→/ð/\u00a0\u00a0\u00a0/s/→/z/", 496, 210, k.go(.9), .9, { size: 24, color: C.ink, weight: 900, font: WB.MONO });
      N("/θ/ 和 /ð/：", "都是咬舌音：舌尖夹在牙齿间。/θ/ 只送气，/ð/ 声带还要震动。");
      V.txt(k, "θ、ð 都是咬舌音：ð 多了「嗡嗡」", 496, 252, { size: 16 });
      N("📜 来历：", "古英语里 f、th、s 夹在两个元音中间，就读成 v、ð、z。动词后面原来还有一条尾巴，词尾辅音正好夹在中间——所以动词读浊音。");
      k.badge("📜", 856, 248);
      V.sayAt(k, "Breath ends with th.", { zh: "breath 以 th 结尾。", word: "th", blocks: ["th"] });

      // 七对双胞胎
      N("", "safe 安全的（清音 /f/）→ save 拯救（浊音 /v/）：从「怎么样」变成「做什么」。");
      const o = { ax: 190 };
      V.pairRow(k, 30, 316, ["safe", "/seɪf/", [["f", 0, C.blue]]], ["save", "/seɪv/", [["v", 0, C.purple]]], o);
      const sySv = V.sayAt(k, "Keep your money safe. Save your money.", { zh: "把钱放安全。把钱存起来。", word: "safe save" });
      { const [w0, wd] = V.win(sySv); k.act(me, "put", w0, wd, { words: ["save"] }); }
      N("⚠️ 例外：", "safe 和 save 其实都是从法语借来的，看起来像这条规律，来历却不一样。");
      k.badge("⚠️", 200, 288, { label: "safe/save 法语来的" });
      N("", "life 生命 → live 居住；连元音也跟着变了：/aɪ/ 变成 /ɪ/。");
      V.pairRow(k, 30, 354, ["life", "/laɪf/", [["f", 0, C.blue]]], ["live", "/lɪv/", [["v", 0, C.purple]]], o);
      V.sayAt(k, "I live in a big city. Life is fun.", { zh: "我住在一个大城市。生活很有趣。", word: "live life" });
      N("", "breath 一口气（/θ/）→ breathe 呼吸这个动作（/ð/），词尾多了个 e。");
      V.pairRow(k, 30, 392, ["breath", "/breθ/", [["th", 0, C.blue]]], ["breathe", "/briːð/", [["the", 0, C.purple]]], o);
      N("", "bath 洗澡（名词）→ bathe 给…洗澡（动词）：/θ/ 变 /ð/。");
      V.pairRow(k, 30, 430, ["bath", "/bɑːθ/", [["th", 0, C.blue]]], ["bathe", "/beɪð/", [["the", 0, C.purple]]], o);
      V.sayAt(k, "The baby has a bath. Mum will bathe the baby.", { zh: "宝宝洗澡。妈妈要给宝宝洗澡。", word: "bath bathe", egg: ["bathe"] });
      N("同形词：", "拼写一模一样、只靠读音分开的词：use /s/ 是用途，use /z/ 是使用。");
      V.pairRow(k, 480, 316, ["use", "/juːs/", [["s", 0, C.blue]]], ["use", "/juːz/", [["s", 0, C.purple]]], o);
      V.sayAt(k, "Can I use your pen? It is of no use.", { zh: "我能用你的笔吗？它没有用处。", word: "use" });
      N("", "close /s/ 是「亲近的」，close /z/ 是「关门」。字一样，读音一变就成了动词。");
      V.pairRow(k, 480, 354, ["close", "/kləʊs/", [["s", 0, C.blue]]], ["close", "/kləʊz/", [["s", 0, C.purple]]], o);
      const syCl = V.sayAt(k, "We are close friends. Please close the door.", { zh: "我们是好朋友。请关上门。", word: "close" });
      { const [w0, wd] = V.win(syCl); k.act(me, "turn", w0, wd, { words: ["close"] }); }
      N("", "advice 建议（c 读 /s/）→ advise 劝告（s 读 /z/）：拼写和读音一起变。");
      V.pairRow(k, 480, 392, ["advice", "/ədˈvaɪs/", [["c", 0, C.blue]]], ["advise", "/ədˈvaɪz/", [["s", 0, C.purple]]], o);
      V.sayAt(k, "Thank you for your advice. I advise you to rest.", { zh: "谢谢你的建议。我劝你休息一下。", word: "advice advise", egg: ["advice", "advise"] });
      N("📜 拼写：", "advice 用 c、advise 用 s，是三百年前定下的拼写习惯：名词用 -ce，动词用 -se。use、advice 也是法语来的。");
      V.sayAt(k, "Advice ends with ce. Advise ends with se.", { zh: "advice 以 ce 结尾，advise 以 se 结尾。", word: "ce se", blocks: ["ce", "se"] });
      k.T("蓝色 = 清音（静）｜紫色 = 浊音（动）", 680, 432, k.go(.8), .8, { size: 16, color: C.grey, weight: 900, anchor: "middle" });
      N("", "规律：清辅音结尾当名词、形容词，浊辅音结尾当动词。（有例外：法语来的词只是长得像。）");
      k.final("safe→save\u00a0\u00a0breath→breathe\u00a0\u00a0use /s/→use /z/", [], "词尾清辅音 /f/ /θ/ /s/：名词、形容词；换成浊辅音 /v/ /ð/ /z/：动词。⚠️ 有例外", { noSay: true });
      const syBr = V.sayAt(k, "Take a deep breath. Breathe in, breathe out.", { zh: "深吸一口气。吸气，呼气。", word: "breath breathe" });
      { const [w0, wd] = V.win(syBr); k.act(me, "cheer", w0, wd, { words: ["breathe"] }); }
      N("口诀：", "清音静悄悄，名词形容词；浊音嗡嗡响，变成动词跑。");
      k.act(me, "nod", S.at, 1); k.expr(me, "proud", S.at, 3);
      k.wait(2);
    },
    actionWords: [
      { word: "save", act: "小人把钱往前下方放好（put，存起来）" },
      { word: "close", act: "小人转身去关门（turn）" },
      { word: "breathe", act: "小人张开双臂深呼吸（cheer 姿态：吸气举臂、呼气放下）" },
    ],
    terms: [
      ["声带", "喉咙里两片薄薄的肉。说话时用手摸着脖子，能感觉到它震不震动。"],
      ["清辅音", "发音时声带不震动、只有气流的辅音，比如 /f/、/θ/、/s/。"],
      ["浊辅音", "发音时声带嗡嗡震动的辅音，比如 /v/、/ð/、/z/。"],
      ["/θ/ 和 /ð/", "都是 th 的读法，舌尖夹在上下牙齿中间。/θ/ 只送气（breath），/ð/ 声带还要震动（breathe）。"],
      ["清名浊动", "词尾是清辅音时当名词或形容词（safe、breath），换成浊辅音就当动词（save、breathe）。⚠️ 本土词（breath/breathe、bath/bathe）真是这样来的；safe/save、use、advice/advise 是法语借词，只是长得像。"],
      ["静态 / 动态", "静态说「是什么、怎么样」（名词、形容词）；动态说「做什么」（动词）。"],
      ["同形词", "拼写一模一样、意思不同的词，靠读音分开，比如 use /juːs/（用途）和 use /juːz/（使用）。"],
    ]
  },
];
