// ==================== 白板脚本：格林音变与清名浊动 3 条定律 ====================
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
// 本页签局部小工具（不改引擎）：
const VS_KIT = {
  // 一行「原词 /音标/ → 变形 /音标/」；a、b = [单词, 音标, [[要标的字母, 第几个, 颜色], ...]]
  pairRow(k, x, y, a, b, o = {}) {
    const { C } = k, size = o.size || 22, cw = size * .6, ax = x + (o.ax || 175), bx = ax + 40;
    const m1 = k.mono(a[0], x, y, size, C.ink);
    if (a[1]) k.T(a[1], x + a[0].length * cw + 6, y, k.go(.4), .4, { size: 15, color: C.grey, font: WB.MONO, weight: 700 });
    k.arrow(ax, y - size * .32, ax + 28, y - size * .32, C.purple);
    const m2 = k.mono(b[0], bx, y, size, C.ink);
    if (b[1]) k.T(b[1], bx + b[0].length * cw + 6, y, k.go(.4), .4, { size: 15, color: C.grey, font: WB.MONO, weight: 700 });
    (a[2] || []).forEach(([s, n, c]) => k.underline(m1, s, n || 0, c || C.red));
    (b[2] || []).forEach(([s, n, c]) => k.underline(m2, s, n || 0, c || C.green));
    return { m1, m2 };
  },
  // 在等宽词的某几个字母外画圈
  ring(k, m, sub, nth = 0, color) {
    const x0 = m.x0(sub, nth), x1 = m.x1(sub, nth);
    k.P(k.ellipse((x0 + x1) / 2, m.y - m.size * .34, (x1 - x0) / 2 + m.size * .12, m.size * .52), k.go(.45), .45, { color: color || k.C.red, w: 3 });
  },
  // 普通文字（自动时长）
  txt(k, s, x, y, o = {}) {
    const dur = o.dur || Math.max(.5, k.estW(s, o.size || 17) / 220);
    k.T(s, x, y, k.go(dur), dur, { size: 17, color: k.C.grey, ...o });
  }
};

WB_LAB.vowel_shift = [
  // ───────── 定律 A：元音前移高化律 ─────────
  {
    build(k) {
      const { C, N } = k, V = VS_KIT;
      N("", "一只脚是 foot，两只脚为什么不是 foots，而是 feet？今天来破译！");
      k.header("格林音变破译机", "定律 A：元音前移", false);
      N("格林音变：", "单词里有规律的读音变化。看懂规律，「不规则」的词也能一眼认出来。");
      const f = k.mono("foot", 60, 165, 48, C.ink);
      N("元音：", "a、e、i、o、u 这类张开嘴就能响亮发出的音，是单词的「心脏」。");
      V.ring(k, f, "oo", 0, C.red);
      k.T("元音", (f.x0("oo") + f.x1("oo")) / 2, 210, k.go(.4), .4, { size: 16, color: C.red, weight: 900, anchor: "middle" });
      N("辅音：", "f、t 这类要用嘴唇、牙齿或舌头挡一下，才发出来的音。");
      k.T("辅音", (f.x0("f") + f.x1("f")) / 2, 210, k.go(.4), .4, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      k.T("辅音", (f.x0("t") + f.x1("t")) / 2, 210, k.go(.4), .4, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      V.txt(k, "元音 = 单词的心脏", 230, 138, { color: C.red, weight: 900, size: 18 });
      V.txt(k, "辅音 = 挡一下的音", 230, 174, { color: C.blue, weight: 900, size: 18 });

      // 舌头位置示意：前 ←→ 后
      N("后元音：", "舌头往后缩着发的元音，比如 oo /uː/，像拉长的「乌」。");
      k.P(k.roughRect(510, 88, 410, 120), k.go(.8), .8, { color: C.ink, w: 2.5 });
      k.F(k.rectD(510, 88, 410, 120), k.go(.2, 0), { color: "#f8fafc", op: 1 });
      k.T("舌头的位置", 715, 114, k.go(.5), .5, { size: 16, color: C.grey, weight: 900, anchor: "middle" });
      k.T("后", 900, 114, k.go(.3), .3, { size: 17, color: C.ink, weight: 900, anchor: "end" });
      k.T("oo /uː/", 790, 166, k.go(.6), .6, { size: 24, color: C.red, weight: 900, font: WB.MONO });
      k.T("后元音", 840, 196, k.go(.4), .4, { size: 15, color: C.red, weight: 900, anchor: "middle" });
      N("前元音：", "舌头往前顶着发的元音，比如 ee /iː/，像拉长的「衣」。");
      k.T("前", 530, 114, k.go(.3), .3, { size: 17, color: C.ink, weight: 900 });
      k.T("ee /iː/", 556, 166, k.go(.6), .6, { size: 24, color: C.green, weight: 900, font: WB.MONO });
      k.T("前元音", 606, 196, k.go(.4), .4, { size: 15, color: C.green, weight: 900, anchor: "middle" });
      N("前移高化：", "舌头往前挪（前移）、又抬高（高化），oo 就变成了 ee。");
      k.arrow(778, 158, 682, 158, C.purple, "往前拉", 730, 146);

      // 古英语小故事
      N("古英语：", "一千多年前的英语。那时想表示「好几个」，要在词尾加一个 -i。");
      k.head("一千多年前发生了什么？", 40, 246, C.purple, "start", 20);
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

      // 两组双胞胎
      N("复数：", "两个或更多。一般加 -s，这几个词却靠「改元音」变复数。");
      k.head("单数 → 复数", 40, 360, C.purple, "start", 19);
      V.pairRow(k, 40, 396, ["foot", "/fʊt/", [["oo"]]], ["feet", "/fiːt/", [["ee"]]]);
      N("音标：", "斜线 / / 里的符号，写出单词怎么读。ː 表示读长一点。");
      V.pairRow(k, 40, 430, ["tooth", "/tuːθ/", [["oo"]]], ["teeth", "/tiːθ/", [["ee"]]]);
      k.T("（goose → geese 也一样）", 168, 360, k.go(.6), .6, { size: 15, color: C.grey, weight: 700 });
      N("使动动词：", "「让别人变成那样」的动词。food 食物 → feed 把食物喂给它。");
      k.head("名词、形容词 → 动词", 560, 360, C.blue, "start", 19);
      V.pairRow(k, 560, 396, ["food", "/fuːd/", [["oo"]]], ["feed", "/fiːd/", [["ee"]]], { ax: 140 });
      N("", "full 满的 → fill 装满（u 变 i）；blood 血 → bleed 流血。");
      V.pairRow(k, 560, 430, ["full", "/fʊl/", [["u"]]], ["fill", "/fɪl/", [["i"]]], { ax: 140 });
      k.T("（blood → bleed 也一样）", 920, 362, k.go(.6), .6, { size: 15, color: C.grey, weight: 700, anchor: "end" });
      N("", "都是后元音 oo/u 被拉到前面，变成前元音 ee/i！");
      k.final("foot→feet\u00a0\u00a0tooth→teeth\u00a0\u00a0goose→geese\u00a0\u00a0food→feed", [], "后元音 oo/u 往前拉，变成前元音 ee/i：变复数，或者变成动词。");
      N("口诀：", "舌头往前拉，oo 变 ee：一只变一群，名词变动词。");
    },
    terms: [
      ["格林音变（音变）", "单词里有规律的读音变化。（格林定律本来是语言学家格林发现的辅音变化规律，这个页签借它的名字，讲英语单词读音变化的几条规律。）"],
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
      ["清辅音 / 浊辅音", "发音时声带不震动的辅音叫清辅音（/f/ /s/），声带嗡嗡震动的叫浊辅音（/v/ /z/）。定律 C 会细讲。"]
    ]
  },
  // ───────── 定律 B：元音缩短加 -th ─────────
  {
    build(k) {
      const { C, N } = k, V = VS_KIT;
      N("", "long 是「长的」，「长度」为什么不是 longth，而是 length？");
      k.header("形容词 → 名词", "定律 B：缩短元音 + th", false);
      N("形容词：", "描述样子的词，比如 long（长的）。名词是东西或事情的名字。");
      const m = k.mono("long + th = longth", 40, 140, 30, C.ink);
      N("", "照直加 -th 得到 longth？英语里没有这个词！");
      k.squiggle(m, "longth");
      k.redX(m.x1("longth") + 10, 116);
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
      k.T("th = /θ/", 744, 136, k.go(.6), .6, { size: 24, color: C.red, weight: 900, font: WB.MONO });
      k.T("舌尖夹在牙齿间", 744, 168, k.go(.6), .6, { size: 16, color: C.grey, weight: 700 });
      N("缩短：", "嘴巴为了省力，就把前面的元音读得又短又靠前，变成 /e/ 或 /ɪ/。");
      V.txt(k, "嘴巴省力 → 元音变短、变靠前", 560, 214, { size: 17, color: C.purple, weight: 900 });

      // 四个示范
      N("长元音 / 短元音：", "/iː/、/aɪ/ 读起来长，/e/、/ɪ/ 读起来又短又快。");
      k.head("四个例子", 40, 262, C.purple, "start", 19);
      const row = (y, a, b, rule, zh) => {
        V.pairRow(k, 40, y, a, b, { ax: 135 });
        k.T(rule, 360, y, k.go(.6), .6, { size: 17, color: C.purple, weight: 900, font: WB.MONO });
        k.T(zh, 520, y, k.go(.6), .6, { size: 16, color: C.grey, weight: 700 });
      };
      row(300, ["long", "", [["o"]]], ["length", "", [["e"], ["th", 0, C.orange]]], "o ➔ e + th", "长的 → 长度");
      N("", "strong 强壮的 → strength 力量：也是 o 变 e，再加 th。");
      row(340, ["strong", "", [["o"]]], ["strength", "", [["e"], ["th", 0, C.orange]]], "o ➔ e + th", "强壮的 → 力量");
      N("", "deep 深的读长长的 /iː/，加 th 后 ee 缩成短短的 e /e/：depth。");
      row(380, ["deep", "", [["ee"]]], ["depth", "", [["e"], ["th", 0, C.orange]]], "ee ➔ e + th", "深的 → 深度");
      N("i_e：", "i 和 e 中间夹一个字母，词尾 e 不出声，让 i 读成 /aɪ/，比如 wide。");
      row(420, ["wide", "", [["i"], ["e", 0, C.red]]], ["width", "", [["i"], ["th", 0, C.orange]]], "i_e ➔ i + th", "宽的 → 宽度");
      N("", "加 th 后去掉 e，i 缩成短短的 /ɪ/：wide 就变成了 width。");
      k.wait(.8);

      // 其余列表
      N("", "high 高的 → height 高度（加 t）；true → truth、warm → warmth 直接加 th。");
      k.P(k.roughRect(704, 246, 230, 196), k.go(.7), .7, { color: C.grey, w: 2 });
      k.T("还有：", 720, 276, k.go(.4), .4, { size: 17, color: C.ink, weight: 900 });
      [["high → height", "igh ➔ eigh + t"], ["true → truth", "直接 + th"], ["warm → warmth", "直接 + th"]].forEach(([w, r], i) => {
        k.T(w, 720, 306 + i * 50, k.go(.6), .6, { size: 18, color: C.ink, weight: 900, font: WB.MONO });
        k.T(r, 722, 326 + i * 50, k.go(.4), .4, { size: 13, color: C.purple, weight: 900 });
      });
      N("", "规律：形容词加 th 变名词，前面的元音跟着变短。");
      k.final("long→length\u00a0\u00a0strong→strength\u00a0\u00a0deep→depth\u00a0\u00a0wide→width", [], "形容词 + th = 抽象名词；元音缩短：o / ee / i_e 变成短 e 或短 i。");
      N("口诀：", "加上 th，元音缩一缩：long 变 length，deep 变 depth。");
    },
    terms: [
      ["抽象名词", "说摸不着、看不见的东西的名词，比如 length（长度）、strength（力量）、truth（真相）。"],
      ["后缀", "加在单词尾巴上、能改变词性的小尾巴。这里的 -th 能把形容词变成名词。"],
      ["词性", "单词的「身份」：名词、动词、形容词……同一个意思换了身份，样子常常会变。"],
      ["咬舌音 /θ/", "th 的读法：舌尖轻轻伸到上下牙齿中间，往外送气。"],
      ["长元音 / 短元音", "长元音读得长，比如 /iː/、/aɪ/；短元音读得又短又快，比如 /e/、/ɪ/。"],
      ["元音缩短", "加上 -th 后，嘴巴为了省力，把前面的长元音或后元音读短、读靠前，比如 deep /iː/ → depth /e/。"],
      ["i_e（不出声的 e）", "i 和 e 中间夹一个字母（如 wide），词尾的 e 不出声，却让 i 读成 /aɪ/。去掉 e，i 就读短音 /ɪ/：width。"]
    ]
  },
  // ───────── 定律 C：清名浊动交替律 ─────────
  {
    build(k) {
      const { C, N } = k, V = VS_KIT;
      N("", "safe 是「安全的」，save 是「拯救」。只差一个字母，秘密藏在喉咙里！");
      k.header("清辅音 ↔ 浊辅音", "定律 C：清名浊动", false);
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
      k.P(k.roughRect(500, 82, 430, 196), k.go(.8), .8, { color: C.ink, w: 2 });
      V.txt(k, "清辅音结尾 = 静：名词 / 形容词", 520, 120, { size: 19, color: C.blue, weight: 900 });
      V.txt(k, "浊辅音结尾 = 动：动词", 520, 158, { size: 19, color: C.purple, weight: 900 });
      N("静态和动态：", "静态说「是什么、怎么样」，动态说「做什么」。三对音这样换：");
      k.T("/f/→/v/\u00a0\u00a0\u00a0/θ/→/ð/\u00a0\u00a0\u00a0/s/→/z/", 520, 210, k.go(.9), .9, { size: 24, color: C.ink, weight: 900, font: WB.MONO });
      N("/θ/ 和 /ð/：", "都是咬舌音：舌尖夹在牙齿间。/θ/ 只送气，/ð/ 声带还要震动。");
      V.txt(k, "θ、ð 都是咬舌音：ð 多了「嗡嗡」", 520, 252, { size: 16 });

      // 七对双胞胎
      N("", "safe 安全的（清音 /f/）→ save 拯救（浊音 /v/）：从「怎么样」变成「做什么」。");
      const o = { ax: 190 };
      V.pairRow(k, 30, 316, ["safe", "/seɪf/", [["f", 0, C.blue]]], ["save", "/seɪv/", [["v", 0, C.purple]]], o);
      N("", "life 生命 → live 居住；连元音也跟着变了：/aɪ/ 变成 /ɪ/。");
      V.pairRow(k, 30, 354, ["life", "/laɪf/", [["f", 0, C.blue]]], ["live", "/lɪv/", [["v", 0, C.purple]]], o);
      N("", "breath 一口气（/θ/）→ breathe 呼吸这个动作（/ð/），词尾多了个 e。");
      V.pairRow(k, 30, 392, ["breath", "/breθ/", [["th", 0, C.blue]]], ["breathe", "/briːð/", [["the", 0, C.purple]]], o);
      N("", "bath 洗澡（名词）→ bathe 给…洗澡（动词）：/θ/ 变 /ð/。");
      V.pairRow(k, 30, 430, ["bath", "/bɑːθ/", [["th", 0, C.blue]]], ["bathe", "/beɪð/", [["the", 0, C.purple]]], o);
      N("同形词：", "拼写一模一样、只靠读音分开的词：use /s/ 是用途，use /z/ 是使用。");
      V.pairRow(k, 500, 316, ["use", "/juːs/", [["s", 0, C.blue]]], ["use", "/juːz/", [["s", 0, C.purple]]], o);
      N("", "close /s/ 是「亲近的」，close /z/ 是「关门」。字一样，读音一变就成了动词。");
      V.pairRow(k, 500, 354, ["close", "/kləʊs/", [["s", 0, C.blue]]], ["close", "/kləʊz/", [["s", 0, C.purple]]], o);
      N("", "advice 建议（c 读 /s/）→ advise 劝告（s 读 /z/）：拼写和读音一起变。");
      V.pairRow(k, 500, 392, ["advice", "/ədˈvaɪs/", [["c", 0, C.blue]]], ["advise", "/ədˈvaɪz/", [["s", 0, C.purple]]], o);
      k.T("蓝色 = 清音（静）｜紫色 = 浊音（动）", 720, 432, k.go(.8), .8, { size: 16, color: C.grey, weight: 900, anchor: "middle" });
      N("", "规律：清辅音结尾当名词、形容词，浊辅音结尾当动词。");
      k.final("safe→save\u00a0\u00a0breath→breathe\u00a0\u00a0use /s/→use /z/", [], "词尾清辅音 /f/ /θ/ /s/：名词、形容词；换成浊辅音 /v/ /ð/ /z/：动词。");
      N("口诀：", "清音静悄悄，名词形容词；浊音嗡嗡响，变成动词跑。");
    },
    terms: [
      ["声带", "喉咙里两片薄薄的肉。说话时用手摸着脖子，能感觉到它震不震动。"],
      ["清辅音", "发音时声带不震动、只有气流的辅音，比如 /f/、/θ/、/s/。"],
      ["浊辅音", "发音时声带嗡嗡震动的辅音，比如 /v/、/ð/、/z/。"],
      ["/θ/ 和 /ð/", "都是 th 的读法，舌尖夹在上下牙齿中间。/θ/ 只送气（breath），/ð/ 声带还要震动（breathe）。"],
      ["清名浊动", "词尾是清辅音时当名词或形容词（safe、breath），换成浊辅音就当动词（save、breathe）。"],
      ["静态 / 动态", "静态说「是什么、怎么样」（名词、形容词）；动态说「做什么」（动词）。"],
      ["同形词", "拼写一模一样、意思不同的词，靠读音分开，比如 use /juːs/（用途）和 use /juːz/（使用）。"]
    ]
  }
];
