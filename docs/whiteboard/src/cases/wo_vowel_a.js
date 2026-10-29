// ==================== 单词身世 · 格林定律章：元音变异 ①（原定律 A：元音前移；v2 + 讲解员）====================
// 依赖 cases/wo_props.js、cases/wo_vowel_kit.js（VW_KIT）。来源与纠错说明见 wo_vowel_kit.js 文件头、word_origins/SOURCES.md ⑤、grimm_law/VOWEL_SHIFT_INVENTORY.md。
WB_LAB.wo_vowel_a = [
  // ───────── 元音变异 ①（原定律 A：元音前移高化律）─────────
  {
    build(k) {
      const { C, N } = k, V = VW_KIT, S = k.S;
      N("", "一只脚是 foot，两只脚为什么不是 foots，而是 feet？今天来破译！");
      const me = V.open(k, { title: "元音变异 ①：foot → feet", sub: "格林定律章", badges: ["📜", "✂️", "⚠️"] });
      N("元音变异：", "单词里有规律的元音变化。（原来叫「格林音变」不准：格林定律讲的是辅音，上一幕讲过。）");
      k.T("（原实验室「格林音变破译机 · 定律 A：元音前移」；格林定律其实讲辅音，这里是元音变异）", 40, 88, k.go(.8), .8, { size: 13, color: C.grey, weight: 700 });
      const f = k.mono("foot", 60, 165, 48, C.ink);
      N("元音：", "a、e、i、o、u 这类张开嘴就能响亮发出的音，是单词的「心脏」。");
      V.ring(k, f, "oo", 0, C.red);
      k.T("元音", (f.x0("oo") + f.x1("oo")) / 2, 210, k.go(.4), .4, { size: 16, color: C.red, weight: 900, anchor: "middle" });
      N("辅音：", "f、t 这类要用嘴唇、牙齿或舌头挡一下，才发出来的音。");
      k.T("辅音", (f.x0("f") + f.x1("f")) / 2, 210, k.go(.4), .4, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      k.T("辅音", (f.x0("t") + f.x1("t")) / 2, 210, k.go(.4), .4, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      V.txt(k, "元音 = 单词的心脏", 230, 138, { color: C.red, weight: 900, size: 18 });
      V.txt(k, "辅音 = 挡一下的音", 230, 174, { color: C.blue, weight: 900, size: 18 });
      const syF = V.sayAt(k, "My foot is in my shoe.", { zh: "我的脚在鞋子里。", word: "foot" });
      k.act(me, "point", syF.t, 1.4, { at: [110, 150] });
      V.sayAt(k, "Food has the letters oo.", { zh: "food 里有字母 oo。", word: "oo", blocks: ["oo"] });

      // 舌头位置示意：前 ←→ 后
      N("后元音：", "舌头往后缩着发的元音，比如 oo /uː/，像拉长的「乌」。");
      k.P(k.roughRect(510, 100, 380, 120), k.go(.8), .8, { color: C.ink, w: 2.5 });
      k.F(k.rectD(510, 100, 380, 120), k.go(.2, 0), { color: "#f8fafc", op: 1 });
      k.T("舌头的位置", 700, 126, k.go(.5), .5, { size: 16, color: C.grey, weight: 900, anchor: "middle" });
      k.T("后", 872, 126, k.go(.3), .3, { size: 17, color: C.ink, weight: 900, anchor: "end" });
      k.T("oo /uː/", 760, 178, k.go(.6), .6, { size: 24, color: C.red, weight: 900, font: WB.MONO });
      k.T("后元音", 810, 208, k.go(.4), .4, { size: 15, color: C.red, weight: 900, anchor: "middle" });
      N("前元音：", "舌头往前顶着发的元音，比如 ee /iː/，像拉长的「衣」。");
      k.T("前", 530, 126, k.go(.3), .3, { size: 17, color: C.ink, weight: 900 });
      k.T("ee /iː/", 556, 178, k.go(.6), .6, { size: 24, color: C.green, weight: 900, font: WB.MONO });
      k.T("前元音", 606, 208, k.go(.4), .4, { size: 15, color: C.green, weight: 900, anchor: "middle" });
      V.sayAt(k, "Feet has the letters ee.", { zh: "feet 里有字母 ee。", word: "ee", blocks: ["ee"] });
      N("前移高化：", "舌头往前挪（前移）、又抬高（高化），oo 就变成了 ee。");
      k.arrow(748, 170, 682, 170, C.purple, "往前拉", 715, 158);

      // 古英语小故事
      N("古英语：", "一千多年前的英语。那时想表示「好几个」，要在词尾加一个 -i。");
      k.head("一千多年前发生了什么？", 40, 246, C.purple, "start", 20);
      k.badge("📜", 300, 240);
      k.T("foot", 40, 290, k.go(.5), .5, { size: 30, color: C.ink, weight: 900, font: WB.MONO });
      k.T("-i", 112, 290, k.go(.3), .3, { size: 30, color: C.red, weight: 900, font: WB.MONO });
      V.txt(k, "① 词尾加上 -i", 40, 322, { size: 15 });
      N("磁铁 -i：", "-i 是前元音，像一块磁铁，把前面的 oo 往前拉成 ee。");
      k.arrow(168, 280, 232, 280, C.purple);
      k.T("feet", 250, 290, k.go(.5), .5, { size: 30, color: C.ink, weight: 900, font: WB.MONO });
      k.T("-i", 322, 290, k.go(.3), .3, { size: 30, color: C.red, weight: 900, font: WB.MONO });
      k.P(k.wl(268, 298, 304, 298, .6), k.go(.4), .4, { color: C.green, w: 4 });
      V.txt(k, "② -i 把 oo 拉成 ee", 250, 322, { size: 15 });
      N("", "后来词尾的 -i 掉了，只留下变好的 ee：foot 就成了 feet！");
      k.arrow(378, 280, 442, 280, C.purple);
      k.T("feet", 460, 290, k.go(.5), .5, { size: 30, color: C.green, weight: 900, font: WB.MONO });
      k.T("-i", 552, 290, k.go(.3), .3, { size: 30, color: "#cbd5e1", weight: 900, font: WB.MONO });
      k.P(k.wl(550, 280, 584, 280, .5), k.go(.3), .3, { color: C.red, w: 3 });
      V.txt(k, "③ -i 掉了，ee 留下", 460, 322, { size: 15 });
      V.txt(k, "→ 今天的 feet", 620, 290, { size: 22, color: C.green, weight: 900 });
      N("✂️ 简化：", "古时候那块「磁铁」有时是 i，有时是像 y 的 j；这件事发生在古英语写成文字之前（约一千五百年前）。");
      k.badge("✂️", 800, 284, { label: "简化" });
      const syFt = V.sayAt(k, "I have two feet.", { zh: "我有两只脚。", word: "feet" });
      k.act(me, "jump", syFt.t + syFt.wd, 1.2);

      // 两组双胞胎
      N("复数：", "两个或更多。一般加 -s，这几个词却靠「改元音」变复数。");
      k.head("单数 → 复数", 40, 360, C.purple, "start", 19);
      V.pairRow(k, 40, 396, ["foot", "/fʊt/", [["oo"]]], ["feet", "/fiːt/", [["ee"]]]);
      N("音标：", "斜线 / / 里的符号，写出单词怎么读。ː 表示读长一点。");
      V.pairRow(k, 40, 430, ["tooth", "/tuːθ/", [["oo"]]], ["teeth", "/tiːθ/", [["ee"]]]);
      V.sayAt(k, "I brush my teeth. This tooth is loose.", { zh: "我刷牙。这颗牙松了。", word: "tooth teeth", egg: ["loose"] });
      k.T("（goose → geese 也一样）", 168, 360, k.go(.6), .6, { size: 15, color: C.grey, weight: 700 });
      V.sayAt(k, "One goose, two geese.", { zh: "一只鹅，两只鹅。", word: "goose geese" });
      N("使动动词：", "「让别人变成那样」的动词。food 食物 → feed 把食物喂给它。");
      k.head("名词、形容词 → 动词", 520, 360, C.blue, "start", 19);
      V.pairRow(k, 520, 396, ["food", "/fuːd/", [["oo"]]], ["feed", "/fiːd/", [["ee"]]], { ax: 140 });
      N("", "full 满的 → fill 装满（u 变 i）；blood 血 → bleed 流血。");
      V.pairRow(k, 520, 430, ["full", "/fʊl/", [["u"]]], ["fill", "/fɪl/", [["i"]]], { ax: 140 });
      k.T("（blood → bleed 也一样）", 860, 362, k.go(.6), .6, { size: 15, color: C.grey, weight: 700, anchor: "end" });
      const syFill = V.sayAt(k, "Fill the cup. Now the cup is full.", { zh: "把杯子装满。现在杯子满了。", word: "fill full" });
      { const [w0, wd] = V.win(syFill); k.act(me, "take", w0, wd, { words: ["fill"] }); }
      N("⚠️ 注意：", "blood 今天读 /blʌd/，不是 /uː/：拼写 oo 留着古时候的长 o，读音后来变了。");
      k.T("⚠️ blood 今天读 /blʌd/", 860, 342, k.go(.8), .8, { size: 14, color: C.red, weight: 900, anchor: "end" });
      const syBl = V.sayAt(k, "A cut can bleed. Blood is red.", { zh: "伤口会流血。血是红的。", word: "bleed blood" });
      { const [w0, wd] = V.win(syBl); k.act(me, "surprised", w0, wd, { words: ["bleed"] }); k.expr(me, "oops", w0, wd); }
      N("", "都是后元音 oo/u 被拉到前面，变成前元音 ee/i！");
      k.final("foot→feet\u00a0\u00a0tooth→teeth\u00a0\u00a0goose→geese\u00a0\u00a0food→feed", [], "后元音 oo/u 往前拉，变成前元音 ee/i：变复数，或者变成动词。", { say: "One foot, two feet. One tooth, two teeth.", zh: "一只脚，两只脚；一颗牙，两颗牙。", word: "foot feet" });
      const syFd = V.sayAt(k, "The geese like the food I feed them.", { zh: "鹅喜欢我喂它们的食物。", word: "feed food" });
      { const [w0, wd] = V.win(syFd); k.act(me, "put", w0, wd, { words: ["feed"] }); }
      N("口诀：", "舌头往前拉，oo 变 ee：一只变一群，名词变动词。");
      k.act(me, "nod", S.at, 1); k.expr(me, "proud", S.at, 3);
      k.wait(2);
    },
    r2skip: ["foots", "a"],   // foots：字幕里的反例（错误形式，不读）；a：字母名「a、e、i、o、u」
    actionWords: [
      { word: "fill", act: "小人伸手拿起杯子装满（take）" },
      { word: "bleed", act: "小人吓一跳、表情「哎呀」（surprised + oops）" },
      { word: "feed", act: "小人把食物往前下方放给鹅（put）" },
    ],
    terms: [
      ["元音变异（音变）", "单词里有规律的元音变化，比如 foot → feet。（原页签叫「格林音变」不准：格林定律讲的是辅音 p→f、t→th……见上一幕；foot → feet 叫元音变异，英文 i-mutation。）"],
      ["不规则", "不按「加 -s、加 -ed」这种常见办法变化的词，比如 foot 的复数是 feet，不是 foots。"],
      ["元音", "a、e、i、o、u 这类张开嘴就能响亮发出的音，是单词的「心脏」。"],
      ["辅音", "f、t、s、v 这类要用嘴唇、牙齿或舌头挡一下才发出来的音。"],
      ["音标", "斜线 / / 里的符号，专门写出单词怎么读，比如 foot /fʊt/。ː 表示读长一点。"],
      ["后元音", "舌头往后缩着发的元音，比如 oo /uː/（拉长的「乌」）、/ʊ/（短「乌」）。"],
      ["前元音", "舌头往前顶着发的元音，比如 ee /iː/（拉长的「衣」）、/ɪ/（短「衣」）。"],
      ["前移高化", "舌头往前挪、又往上抬，后元音 oo/u 就变成前元音 ee/i。"],
      ["古英语", "一千多年前的英语。很多今天的「怪词」，都是那时候留下来的。"],
      ["单数 / 复数", "单数是一个（a foot），复数是两个或更多（two feet）。"],
      ["名词", "表示人、东西或事情名字的词，比如 food（食物）、blood（血）。"],
      ["动词", "表示动作的词，比如 feed（喂）、fill（装满）、save（拯救）。"],
      ["形容词", "描述样子、性质的词，比如 full（满的）、long（长的）、safe（安全的）。"],
      ["使动动词", "表示「让别人或东西变成那样」的动词：full 满的 → fill 让它变满。"],
      ["清辅音 / 浊辅音", "发音时声带不震动的辅音叫清辅音（/f/ /s/），声带嗡嗡震动的叫浊辅音（/v/ /z/）。元音变异 ③ 会细讲。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 · ✂️ 简化说法 · ⚠️ 有例外 · ❓ 有争议。"],
    ]
  },
];

