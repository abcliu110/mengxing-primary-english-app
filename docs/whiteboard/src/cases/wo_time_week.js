// ==================== 单词身世 · 时间与度量章 ②：星期和月份（v2）====================
// 出处：word_origins/SOURCES.md「溯源幕 ⑥⑦」（维基 Week / Thursday / Saturday / September；etymonline December 页 October、November）。
// 一句话洞见：一个星期是天上的七位「客人」（太阳、月亮、五颗行星和神）；September 到 December 是古罗马历的第七到第十个月。
WB_LAB.wo_time_week = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const mw = (txt, fs) => txt.length * fs * .6;
      let w0, wd;
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：Thursday 为什么叫「雷神的日子」？September 明明是 9 月，为什么藏着「七」？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "星期和月份", sub: "单词身世 · 时间与度量", badges: ["📜", "💡"] });
      N("可信度徽章：", "📜 = 查得到出处；💡 = 中文 / 日文对照，不是同源。");
      k.wait(.6);

      // ───── 镜头 1 · 天上的七位客人（古罗马）─────
      D.step(0); D.shot();
      N("七天：", "古罗马人用天上的七位「客人」给一星期七天起名：太阳、月亮和五颗行星。");
      const sky = [["☀️", "太阳"], ["🌙", "月亮"], ["火星", ""], ["水星", ""], ["木星", ""], ["金星", ""], ["土星", ""]];
      sky.forEach(([a, b], i) => {
        const x = 90 + i * 104, y = 170 - Math.sin(Math.PI * i / 6) * 50;
        const c = k.ellipse(x, y, 34, 34);
        P(c, go(.25), .25, { color: C.ink, w: 2.2 }); F(c, go(.05, 0), { color: i < 2 ? "#fef9c3" : C.tintBlue, op: 1 });
        T(a, x, y + 7, go(.2), .2, { size: a.length > 1 && !b ? 16 : 22, color: C.ink, weight: 900, anchor: "middle" });
        if (b) T(b, x, y + 56, go(.2), .2, { size: 14, color: C.grey, weight: 700, anchor: "middle" });
      });
      k.badge("📜", 760, 230);
      k.act(me, "point", S.at - 1, 1.4, { at: [400, 140] });
      N("日耳曼人：", "英语的祖先把其中几位换成了自己的神：提尔（Tiw）、沃登（Woden）、雷神（Thor）、弗丽嘉（Friga）。");
      T("英语的祖先换成了自己的神：Tiw、Woden、Thor、Friga", 60, 290, go(1.6), 1.6, { size: 19, color: C.ink, weight: 900 });
      sayAt("Tiw, Woden, Thor and Friga are old gods.", { zh: "提尔、沃登、雷神和弗丽嘉是古代的神。", word: "Tiw Woden Thor Friga", egg: ["Tiw", "Woden", "Thor", "Friga", "gods"] });
      N("雷神：", "Thor 是打雷的神，手里拿着大锤子。");
      const lx = 120, ly = 380;
      P(`M${lx},${ly - 50} L${lx - 20},${ly} L${lx},${ly} L${lx - 14},${ly + 46} L${lx + 26},${ly - 12} L${lx + 6},${ly - 12} L${lx + 20},${ly - 50} Z`, go(.6), .6, { color: C.ink, w: 2.4 });
      F(`M${lx},${ly - 50} L${lx - 20},${ly} L${lx},${ly} L${lx - 14},${ly + 46} L${lx + 26},${ly - 12} L${lx + 6},${ly - 12} L${lx + 20},${ly - 50} Z`, go(.1, 0), { color: "#facc15", op: 1 });
      T("Thor = 雷神", 170, 386, go(.6), .6, { size: 22, color: C.red, weight: 900 });
      sayAt("Thor is the god of thunder.", { zh: "Thor 是雷神。", word: "Thor thunder", egg: ["Thor", "thunder", "god"] });
      k.sfx("pop", S.at - 1);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 七天的名字 ─────
      D.step(1); D.shot();
      N("名字：", "看！七天的名字都是「谁的日子」：sun 的日子、moon 的日子……");
      const days = [
        ["Sunday", "sun + day", "太阳的日子", "The sun is hot on Sunday.", "星期天太阳很热。", "Sunday sun"],
        ["Monday", "moon + day", "月亮的日子", "We go to school on Monday.", "我们星期一上学。", "Monday moon"],
        ["Tuesday", "Tiw's day", "提尔的日子", "I have art on Tuesday.", "我星期二有美术课。", "Tuesday"],
        ["Wednesday", "Woden's day", "沃登的日子", "Wednesday is in the middle of the week.", "星期三在一周的中间。", "Wednesday"],
        ["Thursday", "Thor's day", "雷神的日子", "Thursday is after Wednesday.", "星期四在星期三后面。", "Thursday"],
        ["Friday", "Friga's day", "弗丽嘉的日子", "Friday is my favourite day.", "星期五是我最喜欢的一天。", "Friday"],
        ["Saturday", "Saturn's day", "土星的日子", "Saturn is a big planet.", "土星是一颗大行星。", "Saturday Saturn"],
      ];
      days.forEach(([w, f, zh, en, enzh, word], i) => {
        const y = 128 + i * 46;
        T(w, 60, y, go(.5), .5, { size: 24, color: C.blue, weight: 900, font: M });
        T("= " + f, 260, y, go(.5), .5, { size: 20, color: C.ink, weight: 900, font: M });
        T(zh, 520, y, go(.4), .4, { size: 16, color: C.grey, weight: 700 });
        const sy = sayAt(en, { zh: enzh, word, egg: ["Saturn", "planet", "favourite"].filter(e => en.includes(e)) });
        if (w === "Monday") { [w0, wd] = win(sy); k.act(me, "walk", w0, wd, { to: 840, words: ["go"] }); }
      });
      sayAt("I sleep late on Saturday.", { zh: "星期六我睡懒觉。", word: "Saturday" });
      sayAt("Tuesday is Tiw's day. Wednesday is Woden's day.", { zh: "星期二是提尔的日子，星期三是沃登的日子。", word: "Tiw's Woden's", egg: ["Tiw's", "Woden's"] });
      sayAt("Friday is Friga's day. Saturday is Saturn's day.", { zh: "星期五是弗丽嘉的日子，星期六是土星的日子。", word: "Friga's Saturn's", egg: ["Friga's", "Saturn's"] });
      sayAt("A week has seven days.", { zh: "一星期有七天。", word: "day week" });
      k.badge("📜", 700, 124);
      N("只有一个没换：", "Saturday 还是罗马的土星（Saturn），没换成日耳曼的神。");
      k.hlText("Saturday 没换：还是罗马的土星", 60, 450, 17, { color: C.hlYellow });
      T("Saturday 没换：还是罗马的土星", 60, 450, go(.9), .9, { size: 17, color: C.red, weight: 900 });
      k.act(me, "point", S.at - 1, 1.4, { at: [150, 404] });
      k.wait(.8);
      D.wipe();

      // ───── 镜头 3 · 词族：Thursday 的老样子 ─────
      D.step(2); D.shot();
      N("老样子：", "一千多年前，Thursday 写作 þunresdæg：雷神（Thunor）的日子。");
      T("古英语：þunresdæg", 60, 140, go(1), 1, { size: 26, color: C.ink, weight: 900 });
      T("= 雷神（Thunor / Thor）+ 日子", 60, 186, go(1), 1, { size: 22, color: C.blue, weight: 900 });
      k.badge("📜", 60 + k.estW("= 雷神（Thunor / Thor）+ 日子", 22) + 10, 182);
      T("→ Thuresday → Thursday", 60, 236, go(1.2), 1.2, { size: 24, color: C.green, weight: 900, font: M });
      sayAt("Thursday is Thor's day.", { zh: "星期四是雷神的日子。", word: "Thursday Thor's" });
      sayAt("Thunor is the old English name of Thor.", { zh: "Thunor 是 Thor 在古英语里的名字。", word: "Thunor", egg: ["Thunor"] });
      k.act(me, "surprised", S.at - .6, 1.2);
      k.wait(.8);
      D.wipe();

      // ───── 镜头 4 · 彩蛋：September 为什么藏着「七」？─────
      D.step(3); D.shot();
      N("月份：", "September 里藏着拉丁语 septem（七），可它是 9 月？");
      T("September ← septem（七）", 60, 130, go(1.2), 1.2, { size: 24, color: C.blue, weight: 900, font: M });
      sayAt("My birthday is in September.", { zh: "我的生日在九月。", word: "September", egg: ["birthday"] });
      sayAt("Septem means seven.", { zh: "septem 的意思是七。", word: "septem seven", egg: ["septem"] });
      N("古罗马历：", "最古老的罗马历从三月开始：三月第一，September 正好第七！后面三个也一样。");
      const rows = [["September", "septem 七", "第 7 个月", "9 月"], ["October", "octo 八", "第 8 个月", "10 月"], ["November", "novem 九", "第 9 个月", "11 月"], ["December", "decem 十", "第 10 个月", "12 月"]];
      T("古罗马历（三月开始）", 340, 182, go(.6), .6, { size: 15, color: C.grey, weight: 900 });
      T("今天", 560, 182, go(.3), .3, { size: 15, color: C.grey, weight: 900 });
      rows.forEach(([w, l, r, n], i) => {
        const y = 222 + i * 44;
        T(w, 60, y, go(.4), .4, { size: 22, color: C.ink, weight: 900, font: M });
        T(l, 220, y, go(.3), .3, { size: 17, color: C.blue, weight: 900 });
        T(r, 340, y, go(.3), .3, { size: 17, color: C.green, weight: 900 });
        T(n, 560, y, go(.3), .3, { size: 17, color: C.red, weight: 900 });
      });
      k.badge("📜", 640, 218);
      sayAt("October is after September.", { zh: "十月在九月后面。", word: "October" });
      sayAt("Octo means eight. Novem means nine.", { zh: "octo 是八，novem 是九。", word: "octo novem", egg: ["octo", "novem"] });
      sayAt("November is cold.", { zh: "十一月很冷。", word: "November" });
      sayAt("December is the last month.", { zh: "十二月是最后一个月。", word: "December" });
      sayAt("Decem means ten.", { zh: "decem 的意思是十。", word: "decem" });
      N("后来：", "后来罗马人在前面加了一月、二月，名字没改——所以「七月」跑到了第九个位置。");
      T("后来前面加了一月、二月，名字没改 → 往后挪了两格", 60, 410, go(1.4), 1.4, { size: 17, color: C.ink, weight: 900 });
      k.act(me, "point", S.at - 1.2, 1.4, { at: [300, 300] });
      k.wait(.8);
      D.wipe();

      // ───── 镜头 5 · 中文 / 日文对照 ─────
      D.step(4);
      N("对照：", "中文的星期按数字排：星期一、二、三……日语按天上的客人排：日、月、火、水、木、金、土——和英语是同一套想法！");
      P(k.roughRect(40, 104, 380, 150), go(.6), .6, { color: C.ink, w: 2 });
      T("中文：星期一、二、三……", 60, 150, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      T("按数字排", 60, 196, go(.6), .6, { size: 17, color: C.green, weight: 900 });
      P(k.roughRect(450, 104, 380, 150), go(.6), .6, { color: C.ink, w: 2 });
      T("日语：日、月、火、水……", 470, 150, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      T("按天上的七位客人排（同英语）", 470, 196, go(.8), .8, { size: 17, color: C.red, weight: 900 });
      k.badge("💡", 40, 290, { label: "对照，不是同源" });
      k.act(me, "point", S.at - 1, 1.4, { at: [640, 170] });
      k.wait(.6);

      // ───── 🔮 预测：octo = 8 → October 原来第几个月？─────
      D.step(5);
      N("预测：", "考考你：Sunday 是太阳的日子，那 Monday 是谁的日子？先想 3 秒！");
      P(k.roughRect(16, 410, 824, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 410, 824, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 Sunday = sun + day，Monday = ？ + day", 36, 462, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 520, 466, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "Monday = moon + day：月亮的日子！");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("moon（月亮）", 520, 464, 22, { color: C.hlGreen });
      T("moon（月亮）", 520, 464, go(.8), .8, { size: 22, color: C.green, weight: 900 });
      k.badge("📜", 36, 500);
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("The moon is bright tonight.", { zh: "今晚月亮很亮。", word: "moon", egg: ["tonight"] });
      N("口诀：", "七天是天上七位客人；September 到 December，古罗马的七、八、九、十！");
      D.hold(2.5);

      k.quoteCard({ insight: "一星期是天上的七位客人：\n太阳、月亮、五颗行星和神；\nSeptember 到 December 是古罗马历的第七到第十个月。", rhyme: "七天七位天上客；\n九月原来是「七」月！", hlLines: 2, foot: "📖 单词身世 · 时间与度量 · 星期和月份" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["unresd", "Thuresday"],   // Thuresday：中古英语旧拼法（画面展示演变，不读）；   // 古英语 þunresdæg 里 þ、æ 不是英文字母，切词会切出残片（画面上是古英语原文，不读）
    actionWords: [
      { word: "go", act: "讲解员往右走（我们星期一上学）" },
    ],
    terms: [
      ["七位客人", "古罗马人用太阳、月亮和五颗行星（火星、水星、木星、金星、土星）给七天起名。"],
      ["日耳曼的神", "英语祖先信的神：Tiw（提尔）、Woden（沃登）、Thor（雷神）、Friga（弗丽嘉）。"],
      ["古罗马历", "最古老的罗马历从三月开始，所以 September（七）原来是第七个月。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 / 中文对照 · ✂️ 简化说法 · ⚠️ 有例外 · ❓ 有争议。"],
      ["🥚 彩蛋词", "超出小学课标的词，知道就好，不用背。"],
    ],
  },
];
