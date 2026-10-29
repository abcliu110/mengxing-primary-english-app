// ==================== 单词身世 · 格林定律章：元音变异 ②（原定律 B：形容词 + th；v2 + 讲解员）====================
// 依赖 cases/wo_props.js、cases/wo_vowel_kit.js（VW_KIT）。来源与纠错说明见 wo_vowel_kit.js 文件头、word_origins/SOURCES.md ⑤、grimm_law/VOWEL_SHIFT_INVENTORY.md。
WB_LAB.wo_vowel_b = [
  // ───────── 元音变异 ②（原定律 B：形容词 + th → 名词）─────────
  {
    build(k) {
      const { C, N } = k, V = VW_KIT, S = k.S;
      N("", "long 是「长的」，「长度」为什么不是 longth，而是 length？");
      const me = V.open(k, { title: "元音变异 ②：long → length", sub: "格林定律章", badges: ["📜", "✂️"] });
      k.T("（原标题「形容词 → 名词 · 定律 B：缩短元音 + th」；「缩短」的讲法已改正）", 40, 88, k.go(.8), .8, { size: 13, color: C.grey, weight: 700 });
      N("形容词：", "描述样子的词，比如 long（长的）。名词是东西或事情的名字。");
      const m = k.mono("long + th = longth", 40, 140, 30, C.ink);
      const syL = V.sayAt(k, "The river is long.", { zh: "这条河很长。", word: "long" });
      V.sayAt(k, "Length ends with th.", { zh: "length 以 th 结尾。", word: "th", blocks: ["th"] });
      N("", "照直加 -th 得到 longth？英语里没有这个词！");
      k.squiggle(m, "longth");
      k.redX(m.x1("longth") + 10, 116);
      k.act(me, "think", S.at - .8, 1.4);
      N("抽象名词：", "说摸不着的东西的名词，比如「长度」「力量」「深度」。");
      const g = k.mono("length", m.x0("longth"), 190, 30, C.green);
      V.ring(k, g, "e", 0, C.green);
      k.T("o 变成了 e！", m.x0("longth") - 12, 190, k.go(.6), .6, { size: 18, color: C.green, weight: 900, anchor: "end" });
      N("后缀：", "加在词尾、能改变词性的小尾巴。这里的 -th 能把形容词变成名词。");
      k.underline(g, "th", 0, C.orange);

      // 咬舌音示意
      N("咬舌音 -th：", "th 读 /θ/，舌尖要伸到上下牙齿中间，嘴巴可忙了。");
      const tg = "M716,132 C680,129 604,127 576,134 C564,138 564,146 576,149 C604,154 680,152 716,149 Z";
      k.P(tg, k.go(.6), .6, { color: C.red, w: 2.5 }); k.F(tg, k.go(.2, 0), { color: "#fecdd3", op: .95 });
      k.P(k.roughRect(600, 100, 96, 24), k.go(.5), .5, { color: C.ink, w: 2.5 }); k.F(k.rectD(600, 100, 96, 24), k.go(.2, 0), { color: "#fff", op: 1 });
      k.P(k.roughRect(600, 157, 96, 24), k.go(.5), .5, { color: C.ink, w: 2.5 }); k.F(k.rectD(600, 157, 96, 24), k.go(.2, 0), { color: "#fff", op: 1 });
      k.T("上牙", 648, 118, k.go(.3), .3, { size: 13, color: C.grey, weight: 700, anchor: "middle" });
      k.T("下牙", 648, 175, k.go(.3), .3, { size: 13, color: C.grey, weight: 700, anchor: "middle" });
      k.T("舌尖", 548, 146, k.go(.3), .3, { size: 13, color: C.red, weight: 900, anchor: "end" });
      k.T("th = /θ/", 734, 136, k.go(.6), .6, { size: 24, color: C.red, weight: 900, font: WB.MONO });
      k.T("舌尖夹在牙齿间", 734, 168, k.go(.6), .6, { size: 16, color: C.grey, weight: 700 });
      // R3 改正：原「嘴巴省力 → 元音变短、变靠前」
      N("真正的原因：", "原来说「嘴巴省力，把元音读短」不准。古时候这条尾巴是 -ith，里面的 i 像磁铁，把 o 拉成了 e——和 foot→feet 是同一块磁铁！");
      V.txt(k, "古尾巴 -ith 里的 i 把元音往前拉（同 feet）", 520, 214, { size: 16, color: C.purple, weight: 900 });
      k.badge("📜", 520 + k.estW("古尾巴 -ith 里的 i 把元音往前拉（同 feet）", 16) + 8, 210);
      k.T("（原讲法「嘴巴省力 → 元音变短、变靠前」不准，已改）", 520, 236, k.go(.6), .6, { size: 12, color: C.grey, weight: 700 });
      V.sayAt(k, "One foot, two feet.", { zh: "一只脚，两只脚。", word: "foot feet" });
      V.sayAt(k, "Feet has the letters ee.", { zh: "feet 里有字母 ee。", word: "ee ith", blocks: ["ee", "ith"] });

      // 四个示范
      N("长元音 / 短元音：", "/iː/、/aɪ/ 读起来长，/e/、/ɪ/ 读起来又短又快。");
      k.head("四个例子", 40, 262, C.purple, "start", 19);
      const row = (y, a, b, rule, zh) => {
        V.pairRow(k, 40, y, a, b, { ax: 135 });
        k.T(rule, 360, y, k.go(.6), .6, { size: 17, color: C.purple, weight: 900, font: WB.MONO });
        k.T(zh, 520, y, k.go(.6), .6, { size: 16, color: C.grey, weight: 700 });
      };
      row(300, ["long", "", [["o"]]], ["length", "", [["e"], ["th", 0, C.orange]]], "o ➔ e + th", "长的 → 长度");
      V.sayAt(k, "The river is long. What is the length of the river?", { zh: "这条河很长。这条河有多长？", word: "length" });
      N("", "strong 强壮的 → strength 力量：也是 o 变 e，再加 th。");
      row(340, ["strong", "", [["o"]]], ["strength", "", [["e"], ["th", 0, C.orange]]], "o ➔ e + th", "强壮的 → 力量");
      const sySt = V.sayAt(k, "He is strong. He has great strength.", { zh: "他很强壮，力气很大。", word: "strong strength", egg: ["strength"] });
      k.act(me, "support", sySt.t + sySt.wd, 1.4);
      N("✂️ deep → depth：", "deep 深的今天读长长的 /iː/，depth 里是短短的 e /e/。古时候两个元音差不多；后来（1400–1700 年）deep 的长元音变成了 /iː/，depth 的短元音没变。");
      row(380, ["deep", "", [["ee"]]], ["depth", "", [["e"], ["th", 0, C.orange]]], "ee ➔ e + th", "深的 → 深度");
      V.sayAt(k, "The water is deep. The depth is ten metres.", { zh: "水很深，深度是十米。", word: "deep depth" });
      N("i_e：", "i 和 e 中间夹一个字母，词尾 e 不出声，让 i 读成 /aɪ/，比如 wide。");
      row(420, ["wide", "", [["i"], ["e", 0, C.red]]], ["width", "", [["i"], ["th", 0, C.orange]]], "i_e ➔ i + th", "宽的 → 宽度");
      N("", "加 th 后去掉 e，i 缩成短短的 /ɪ/：wide 就变成了 width。（width 是四百年前照着 breadth 新造的词。）");
      k.badge("✂️", 612, 400, { label: "简化" });
      V.sayAt(k, "The road is wide. What is the width of the road?", { zh: "这条路很宽。路有多宽？", word: "wide width" });
      V.sayAt(k, "Breadth means width.", { zh: "breadth 的意思是宽度。", word: "breadth", egg: ["breadth"] });
      k.wait(.8);

      // 其余列表
      N("", "high 高的 → height 高度（加 t）；true → truth、warm → warmth 直接加 th。");
      k.P(k.roughRect(704, 246, 196, 196), k.go(.7), .7, { color: C.grey, w: 2 });
      k.T("还有：", 720, 276, k.go(.4), .4, { size: 17, color: C.ink, weight: 900 });
      [["high → height", "igh ➔ eigh + t"], ["true → truth", "直接 + th"], ["warm → warmth", "直接 + th"]].forEach(([w, r], i) => {
        k.T(w, 716, 306 + i * 50, k.go(.6), .6, { size: 17, color: C.ink, weight: 900, font: WB.MONO });
        k.T(r, 718, 326 + i * 50, k.go(.4), .4, { size: 13, color: C.purple, weight: 900 });
      });
      V.sayAt(k, "The tree is high. What is its height?", { zh: "这棵树很高。它有多高？", word: "high height" });
      V.sayAt(k, "High has the letters igh. Height has the letters eigh.", { zh: "high 里有 igh，height 里有 eigh。", word: "igh eigh", blocks: ["igh", "eigh"] });
      V.sayAt(k, "Is it true? Tell me the truth.", { zh: "是真的吗？告诉我真相。", word: "true truth" });
      V.sayAt(k, "The sun is warm. I feel its warmth.", { zh: "太阳很暖和，我感到它的温暖。", word: "warm warmth", egg: ["warmth"] });
      N("", "规律：形容词加 th 变名词，前面的元音跟着变。");
      k.final("long→length\u00a0\u00a0strong→strength\u00a0\u00a0deep→depth\u00a0\u00a0wide→width", [], "形容词 + th = 抽象名词；o 变 e 是古尾巴里 i 拉的，deep / wide 是后来长元音又变了。", { noSay: true });
      N("口诀：", "加上 th，元音缩一缩：long 变 length，deep 变 depth。（「缩」是好记的说法：o→e 其实是古尾巴里的 i 拉的。）");
      k.act(me, "nod", S.at, 1); k.expr(me, "proud", S.at, 3);
      k.wait(2);
    },
    r2skip: ["longth"],
    actionWords: [],
    terms: [
      ["抽象名词", "说摸不着、看不见的东西的名词，比如 length（长度）、strength（力量）、truth（真相）。"],
      ["后缀", "加在单词尾巴上、能改变词性的小尾巴。这里的 -th 能把形容词变成名词。"],
      ["词性", "单词的「身份」：名词、动词、形容词……同一个意思换了身份，样子常常会变。"],
      ["咬舌音 /θ/", "th 的读法：舌尖轻轻伸到上下牙齿中间，往外送气。"],
      ["长元音 / 短元音", "长元音读得长，比如 /iː/、/aɪ/；短元音读得又短又快，比如 /e/、/ɪ/。"],
      ["元音缩短（已改正）", "原来说「加上 -th 后嘴巴为了省力，把元音读短、读靠前」。改正：long→length、strong→strength 的 o→e 是古尾巴 -ith 里的 i 拉的（元音变异）；deep→depth、wide→width 读音差得远，是因为 deep、wide 的长元音后来（1400–1700 年）又变了，depth、width 的短元音没变。"],
      ["i_e（不出声的 e）", "i 和 e 中间夹一个字母（如 wide），词尾的 e 不出声，却让 i 读成 /aɪ/。去掉 e，i 就读短音 /ɪ/：width。"],
    ]
  },
];

