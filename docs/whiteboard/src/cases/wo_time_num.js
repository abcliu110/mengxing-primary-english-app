// ==================== 单词身世 · 时间与度量章 ①：数字的秘密（eleven、-teen、dozen、万 ↔ million）（v2）====================
// 出处：word_origins/SOURCES.md「溯源幕 ⑥⑦」。决策 3：H 数字 + P 大数换算（星期月份见 wo_time_week）。
// 一句话洞见：eleven、twelve 是「十个之外剩下一个、两个」；十几都是「几 + 十」；中文四位一节（万、亿），英文三位一节（thousand、million）。
WB_LAB.wo_time_num = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const grp = () => { const g = D.sub(); D.back(); return g; };
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const mw = (txt, fs) => txt.length * fs * .6;
      let w0, wd;
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：eleven、twelve 为什么不叫 oneteen、twoteen？一万、一亿用英语怎么说？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "数字的秘密", sub: "单词身世 · 时间与度量", badges: ["📜", "✂️", "💡"] });
      N("可信度徽章：", "📜 = 查得到出处；✂️ = 简化说法；💡 = 中文对照 / 换算练习，不是词源。");
      k.wait(.6);

      // ───── 镜头 1 · 十根手指：先数到十 ─────
      D.step(0); D.shot();
      N("数到十：", "古人用十根手指数数。数到十，两只手都用完了——再来一个怎么办？");
      const dot = (x, y, c) => { const d = k.ellipse(x, y, 13, 13); P(d, go(.12), .12, { color: C.ink, w: 2 }); F(d, go(.05, 0), { color: c, op: 1 }); };
      P(k.roughRect(60, 110, 360, 110), go(.6), .6, { color: C.blue, w: 2.4 });
      T("ten（十）：两只手用完", 240, 246, go(.8), .8, { size: 17, color: C.blue, weight: 900, anchor: "middle" });
      for (let i = 0; i < 10; i++) dot(96 + (i % 5) * 64, 140 + Math.floor(i / 5) * 50, C.tintBlue);
      sayAt("I have ten fingers.", { zh: "我有十根手指。", word: "ten" });
      k.act(me, "point", S.at - 1.2, 1.4, { at: [240, 165] });
      k.wait(.6);

      // ───── 镜头 2 · eleven = 剩下一个，twelve = 剩下两个 ─────
      D.step(1);
      N("eleven：", "十个之外，还「剩下一个」——古英语就叫它「一 + 剩下」，后来变成 eleven！");
      const gL = D.sub(); dot(470, 165, C.hlYellow); D.back();
      k.pop(gL, S.at - .2, .5, { cx: 470, cy: 165 });
      T("剩下 1 个", 470, 205, go(.5), .5, { size: 15, color: C.red, weight: 900, anchor: "middle" });
      k.hlText("eleven = one + left（剩下）", 520, 150, 22, { mono: false });
      T("eleven = one + left（剩下）", 520, 150, go(1.2), 1.2, { size: 22, color: C.ink, weight: 900 });
      k.badge("📜", 520 + k.estW("eleven = one + left（剩下）", 22) + 10, 146);
      sayAt("I have eleven pencils.", { zh: "我有十一支铅笔。", word: "eleven" });
      sayAt("Ten are in the box. One is left.", { zh: "十支在盒子里，还剩一支。", word: "one left" });
      N("twelve：", "twelve 就是「二 + 剩下」：十个之外剩下两个。");
      T("twelve = two + left", 520, 200, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      sayAt("Twelve is two more than ten.", { zh: "十二比十多二。", word: "twelve two" });
      k.act(me, "surprised", S.at - 1, 1.2);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 词族：十几 = 几 + 十（-teen）─────
      D.step(2); D.shot();
      N("十几：", "从 13 开始换了办法：thirteen = three（三）+ teen（十），一直到 nineteen。");
      const rows = [["thirteen", "three + ten", "13"], ["fourteen", "four + ten", "14"], ["nineteen", "nine + ten", "19"]];
      rows.forEach(([w, f, n], i) => {
        const y = 140 + i * 56;
        T(n, 60, y, go(.3), .3, { size: 22, color: C.grey, weight: 900, font: M });
        T(w, 120, y, go(.6), .6, { size: 26, color: C.blue, weight: 900, font: M });
        k.hlText("teen", 120 + mw(w, 26) - mw("teen", 26), y, 26, { mono: true, color: C.hlGreen });
        T("= " + f, 380, y, go(.6), .6, { size: 22, color: C.ink, weight: 900 });
      });
      k.badge("📜", 650, 136);
      sayAt("Thirteen is three and ten.", { zh: "十三是三加十。", word: "thirteen three" });
      sayAt("Fourteen is four and ten.", { zh: "十四是四加十。", word: "fourteen four" });
      sayAt("Nineteen is nine and ten.", { zh: "十九是九加十。", word: "nineteen nine" });
      N("-teen：", "-teen 就是 ten 的另一个样子，意思是「再加十」。");
      T("-teen = ten（再加十）", 60, 330, go(1), 1, { size: 24, color: C.green, weight: 900 });
      sayAt("Thirteen ends with teen.", { zh: "thirteen 以 teen 结尾。", word: "teen", blocks: ["teen"] });
      N("✂️ 小秘密：", "eleven、twelve 本来应该是「十几」家族的头两个，只是长得不一样。");
      T("eleven、twelve：本该是十几家族的老大、老二", 60, 380, go(1.2), 1.2, { size: 17, color: C.grey, weight: 700 });
      k.badge("✂️", 60 + k.estW("eleven、twelve：本该是十几家族的老大、老二", 17) + 10, 376);
      k.act(me, "nod", S.at - .4, .8);
      k.wait(.8);
      D.wipe();

      // ───── 镜头 4 · 彩蛋：dozen = 二 + 十（和 two、ten 是亲戚）─────
      D.step(3); D.shot();
      N("dozen：", "一打（12 个）叫 dozen。它来自拉丁语 duodecim：duo（二）+ decem（十）。");
      T("dozen（一打 = 12 个）", 60, 130, go(.9), .9, { size: 26, color: C.ink, weight: 900 });
      T("← 法语 ← 拉丁语 duodecim = duo（二）+ decem（十）", 60, 176, go(1.4), 1.4, { size: 18, color: C.blue, weight: 900 });
      k.badge("📜", 60 + k.estW("← 法语 ← 拉丁语 duodecim = duo（二）+ decem（十）", 18) + 10, 172);
      sayAt("A dozen is twelve.", { zh: "一打是十二个。", word: "a dozen" });
      sayAt("Duo means two. Decem means ten.", { zh: "duo 是二，decem 是十。", word: "duo decem", egg: ["duo", "decem"] });
      sayAt("Duodecim means twelve.", { zh: "duodecim 的意思是十二。", word: "duodecim", egg: ["duodecim"] });
      N("格林定律：", "还记得吗？拉丁语 d → 英语 t：duo ↔ two，decem ↔ ten！");
      T("duo ↔ two　decem ↔ ten（d → t，格林定律）", 60, 222, go(1.2), 1.2, { size: 17, color: C.red, weight: 900 });
      // 一盒鸡蛋（12 个），搬运工抱着走（carries）
      const gB = grp();
      const porter = k.actor("porter", { x: 120, y: 470, s: .8, f: 1, g: gB });
      const box = k.prop("box", 175, 470, { g: gB, s: .7 });
      const syC = sayAt("She carries a dozen eggs.", { zh: "她抱着一打鸡蛋。", word: "dozen" });
      [w0, wd] = win(syC);
      k.act(porter, "carry", w0 - .4, wd + .4, { prop: box, to: 420, put: true, words: ["carries"] });
      const eggBox = "M520,300 L800,300 L800,380 L520,380 Z";
      P(eggBox, go(.5), .5, { color: C.ink, w: 2.4 }); F(eggBox, go(.05, 0), { color: "#fef3c7", op: 1 });
      for (let i = 0; i < 12; i++) { const e = k.ellipse(546 + (i % 6) * 46, 322 + Math.floor(i / 6) * 36, 14, 12); P(e, go(.06), .06, { color: C.ink, w: 1.6 }); F(e, go(.02, 0), { color: "#ffffff", op: 1 }); }
      T("12 个 = a dozen", 660, 410, go(.5), .5, { size: 17, color: C.green, weight: 900, anchor: "middle" });
      N("12 进位的影子：", "英语里还藏着「12 进位」：一打 12 个，一英尺 12 英寸。");
      T("还有：1 英尺 = 12 英寸", 520, 446, go(.8), .8, { size: 15, color: C.grey, weight: 700 });
      k.wait(.8);
      D.wipe();

      // ───── 镜头 5 · 中文对照：四位一节 vs 三位一节 ─────
      D.step(4); D.shot();
      N("大数：", "中文四位一节：万、亿。英文三位一节：thousand（千）、million（百万）。");
      T("中文：四位一节", 60, 130, go(.6), .6, { size: 19, color: C.red, weight: 900 });
      T("1,0000 万　1,0000,0000 亿", 60, 168, go(1.2), 1.2, { size: 24, color: C.red, weight: 900, font: M });
      T("英文：三位一节", 60, 222, go(.6), .6, { size: 19, color: C.blue, weight: 900 });
      T("1,000 thousand　1,000,000 million", 60, 260, go(1.4), 1.4, { size: 24, color: C.blue, weight: 900, font: M });
      k.badge("📜", 520, 126);
      sayAt("A thousand is ten hundreds.", { zh: "一千是十个一百。", word: "thousand hundred" });
      N("million：", "million 来自意大利语：mille（一千）加一个「大」尾巴 = 大大的一千，就是一千个一千！");
      T("million = mille（千）+ -one（大）= 一千个一千", 60, 316, go(1.4), 1.4, { size: 19, color: C.ink, weight: 900 });
      sayAt("Mille means a thousand.", { zh: "mille 的意思是一千。", word: "mille", egg: ["mille"] });
      sayAt("A million is a thousand thousands.", { zh: "一百万是一千个一千。", word: "million" });
      k.act(me, "point", S.at - 1.4, 1.4, { at: [300, 300] });
      N("换算：", "一万 = ten thousand（十个千）；一百万 = one million。");
      T("一万 = ten thousand　　一百万 = one million", 60, 370, go(1.4), 1.4, { size: 20, color: C.green, weight: 900 });
      k.badge("💡", 60, 404, { label: "换算练习" });
      sayAt("Ten thousand people are here.", { zh: "这里有一万人。", word: "thousand" });
      k.wait(.6);

      // ───── 🔮 预测：一亿 = ? ─────
      D.step(5);
      N("预测：", "考考你：一亿 = 一万个一万。英语怎么说？先想 3 秒！（提示：一亿 = 100,000,000）");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 一亿 = 100,000,000 = ？", 36, 470, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 420, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "100,000,000 = 100 个 million = one hundred million！");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("one hundred million", 380, 472, 22, { mono: true, color: C.hlGreen });
      T("one hundred million", 380, 472, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      T("（100 个 million）", 36, 510, go(.6), .6, { size: 15, color: C.grey, weight: 700 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("One hundred million is a very big number.", { zh: "一亿是一个很大的数。", word: "million" });
      N("口诀：", "十个之外剩一个，eleven；十几都是几加十；中文四位一节，英文三位一节！");
      D.hold(2.5);
      k.actorFade(porter, S.at - .4, .4, 0);

      k.quoteCard({ insight: "eleven、twelve =「十个之外剩下一个、两个」，\n十几都是「几 + 十」；\n中文四位一节，英文三位一节。", rhyme: "十个之外剩一个，eleven；\n十几都是几加十！", hlLines: 2, foot: "📖 单词身世 · 时间与度量 · 数字" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["oneteen", "twoteen"],   // 字幕里的反问（不存在的错误形式，不读）
    actionWords: [
      { word: "carries", act: "搬运工抱起一盒鸡蛋走过去放下（carry）" },
    ],
    terms: [
      ["-teen", "加在 three、four……后面，意思是「再加十」：thirteen = 13。和 ten 是同一个词根。"],
      ["dozen 一打", "正好 12 个。来自拉丁语 duodecim = duo（二）+ decem（十）。"],
      ["12 进位", "满 12 进一位。英语里还留着影子：一打 12 个、一英尺 12 英寸。"],
      ["四位一节 / 三位一节", "中文每四位一个新名字（万、亿）；英文每三位一个新名字（thousand、million）。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 / 中文对照 · ✂️ 简化说法 · ⚠️ 有例外 · ❓ 有争议。"],
      ["🥚 彩蛋词", "超出小学课标的词，知道就好，不用背。"],
    ],
  },
];
