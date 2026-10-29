// ==================== 👣 王炸实验室 · 不规则复数（irregular_plural）（v2 + 讲解员）====================
// 决策 6（MASTER_DESIGN）：新模块「不规则复数」做成实验室新页签。格林章 / 首页王炸 03 里只留历史解释和速记卡（见 HANDOFF），练习放这里。
// 两幕：① 换元音的复数（foot→feet 家族）② 其他四种：-en 复数、单复数同形、f→ves、person→people。
// 出处：lab/SOURCES.md ④（Wikipedia「English plurals」，2026-10-30 抓取）。徽章：📜 有出处；✂️ 简化；💡 比喻。配色只用 V3 四色。
WB_LAB.irregular_plural = [
  // ───────────────────────── 第 1 幕：换元音的复数 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      // 一对：单数 → 复数，换掉的字母用红色
      const pair = (x, y, one, many, hl, zh) => {
        T(one, x, y, go(.5), .5, { size: 24, color: C.ink, weight: 900, font: M });
        T("→", x + 110, y, go(.3), .3, { size: 22, color: C.grey, weight: 900 });
        T(many, x + 145, y, go(.5), .5, { size: 24, color: C.red, weight: 900, font: M });
        T(zh, x + 280, y, go(.4), .4, { size: 16, color: C.grey, weight: 700 });
      };
      N("", "这一幕：一般的复数在词尾加 s，可有几个老单词不加 s，而是把中间的元音换掉！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "换元音的复数", sub: "👣 王炸实验室 · 不规则复数 ①", badges: ["📜", "💡"], steps: ["① 平常", "② oo→ee", "③ a→e", "④ ou→i", "⑤ 为什么", "🔮 预测"] });
      k.wait(.3);

      D.step(0); D.shot();
      N("复数：", "两个或更多。大多数名词在词尾加 s：one cat，two cats。");
      T("one cat → two cats　（大多数：加 s）", 60, 150, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      sayAt("One cat, two cats.", { zh: "一只猫，两只猫。", word: "one cat two cats" });
      k.wait(.3);

      D.step(1);
      N("oo → ee：", "foot、tooth、goose：两个 o 换成两个 e。");
      pair(60, 210, "foot", "feet", "ee", "脚");
      pair(60, 252, "tooth", "teeth", "ee", "牙齿");
      pair(60, 294, "goose", "geese", "ee", "鹅");
      sayAt("Foot, feet. Tooth, teeth. Goose, geese.", { zh: "一只脚，两只脚。一颗牙，好多牙。一只鹅，好多鹅。", word: "foot feet tooth teeth goose geese" });
      const syFeet = sayAt("I stand on my two feet.", { zh: "我用两只脚站着。", word: "stand on my two" });
      k.act(me, "jump", syFeet.t, Math.max(1, syFeet.dur * .6), { words: ["stand"] });
      k.wait(.4);
      D.wipe();

      D.step(2); D.shot();
      N("a → e：", "man 变 men，woman 变 women（women 的第一个音读 /ɪ/，像 wimin）。");
      pair(60, 150, "man", "men", "e", "男人");
      pair(60, 192, "woman", "women", "e", "女人");
      sayAt("One man, two men. One woman, two women.", { zh: "一个男人，两个男人。一个女人，两个女人。", word: "man men woman women" });
      k.wait(.3);

      D.step(3);
      N("ou → i：", "mouse 变 mice：中间的 ou 换成 i，s 还变成了 ce。");
      pair(60, 246, "mouse", "mice", "i", "老鼠");
      sayAt("One mouse, three mice.", { zh: "一只老鼠，三只老鼠。", word: "mouse three mice" });
      k.act(me, "surprised", S.at - 1.2, 1);
      k.wait(.4);

      D.step(4);
      N("📜 为什么：", "很久以前的古英语里，这几个词的复数后面跟着一个带 i 音的词尾，它把前面的元音「拉」成了别的音；后来词尾掉了，只剩下换过的元音。");
      P(k.roughRect(40, 290, 800, 92), go(.6), .6, { color: C.blue, w: 2.4 });
      T("📜 古英语：词尾的 i 音把元音拉变了 → 词尾掉了 → 只剩换过的元音", 60, 324, go(1.2), 1.2, { size: 17, color: C.blue, weight: 900 });
      T("💡 像磁铁吸走了元音，磁铁不见了，变形留下来", 60, 360, go(1), 1, { size: 17, color: C.green, weight: 900 });
      k.badge("📜", 790, 300, { label: "出处" });
      N("💡 比喻：", "就像一块磁铁把元音吸变了形，后来磁铁被拿走，变形却留了下来。格林章里讲过更多这段历史。");
      k.act(me, "think", S.at - 2, 1.6);
      k.wait(.5);

      D.step(5);
      N("预测：", "postman（邮递员）的复数是什么？先想 3 秒！");
      P(k.roughRect(16, 404, 824, 128), go(.6), .6, { color: C.green, w: 2.5 });
      F(k.rectD(16, 404, 824, 128), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 one postman → two ？", 36, 444, go(.9), .9, { size: 21, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "postmen！man 结尾的合成词，复数一样把 man 换成 men。");
      T("two postmen（man → men，跟着变）", 36, 490, go(.8), .8, { size: 21, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", S.at - .3, 1.3); k.sfx("ding", S.at + .2);
      sayAt("One postman, two postmen.", { zh: "一个邮递员，两个邮递员。", word: "postman postmen" });
      D.hold(2);

      k.quoteCard({ insight: "有几个古老的词不加 s，而是换元音：\nfoot→feet、man→men、mouse→mice。", rhyme: "脚牙鹅，oo 变 ee，\n男女换 e，鼠变 mice！", hlLines: 2, foot: "👣 王炸实验室 · 不规则复数" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["oo", "ee", "a", "ou", "wimin", "ce", "s"],   // 字母组合 / 读音示意，不是单词
    actionWords: [
      { word: "stand", act: "讲解员读 I stand on my two feet 时双脚一蹦站稳（jump）" },
    ],
    terms: [
      ["复数", "两个或更多。大多数名词加 s：cats、books。"],
      ["不规则复数", "不按「加 s」变的复数：feet、men、mice、children。"],
      ["换元音复数", "📜 foot/feet、tooth/teeth、goose/geese、man/men、woman/women、mouse/mice：古英语留下来的（Wikipedia「English plurals」）。"],
      ["可信度徽章", "📜 有出处 · 💡 比喻 · ✂️ 简化说法 · ⚠️ 要注意。"],
    ],
  },

  // ───────────────────────── 第 2 幕：另外四种不规则复数 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      const row = (y, one, many, zh, col) => {
        T(one, 60, y, go(.5), .5, { size: 23, color: C.ink, weight: 900, font: M });
        T("→", 200, y, go(.3), .3, { size: 22, color: C.grey, weight: 900 });
        T(many, 236, y, go(.5), .5, { size: 23, color: col, weight: 900, font: M });
        T(zh, 420, y, go(.4), .4, { size: 16, color: C.grey, weight: 700 });
      };
      N("", "这一幕：除了换元音，还有四种不加 s 的复数。一个一个认识！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "另外四种不规则复数", sub: "👣 王炸实验室 · 不规则复数 ②", badges: ["📜", "✂️"], steps: ["① 加 en", "② 不变", "③ f→ves", "④ 换个词", "⑤ 口诀", "🔮 预测"] });
      k.wait(.3);

      D.step(0); D.shot();
      N("加 -en：", "child 变 children，ox（公牛）变 oxen。古英语有一类词复数加 -en，现在常用的只剩这几个。");
      k.head("① 加 -en", 60, 140, C.blue, "start", 22);
      row(182, "child", "children", "孩子", C.blue);
      row(222, "ox", "oxen", "公牛", C.blue);
      sayAt("One child, two children. One ox, two oxen.", { zh: "一个孩子，两个孩子。一头牛，两头牛。", word: "child children ox oxen" });
      k.wait(.3);

      D.step(1);
      N("单复数一样：", "sheep、deer、fish：一只和一群写法一样，很多是动物的名字。");
      k.head("② 一只一群都一样", 60, 280, C.green, "start", 22);
      row(322, "sheep", "sheep", "绵羊", C.green);
      row(362, "deer", "deer", "鹿", C.green);
      row(402, "fish", "fish", "鱼", C.green);
      sayAt("One sheep, ten sheep. One deer, five deer. One fish, many fish.", { zh: "一只羊，十只羊。一头鹿，五头鹿。一条鱼，好多鱼。", word: "sheep ten deer five fish many" });
      k.act(me, "nod", S.at - 1.4, 1);
      k.wait(.4);
      D.wipe();

      D.step(2); D.shot();
      N("f → ves：", "leaf、knife、wolf：f 变成 v，再加 es。");
      k.head("③ f / fe → ves", 60, 140, C.red, "start", 22);
      row(182, "leaf", "leaves", "树叶", C.red);
      row(222, "knife", "knives", "刀", C.red);
      row(262, "wolf", "wolves", "狼", C.red);
      sayAt("Leaf, leaves. Knife, knives. Wolf, wolves.", { zh: "树叶，好多树叶。刀，好多刀。狼，好多狼。", word: "leaf leaves knife knives wolf wolves" });
      k.badge("✂️", 60 + k.estW("③ f / fe → ves", 22) + 10, 136, { label: "不全是" });
      N("✂️ 不全是：", "roof（屋顶）就只加 s：roofs。遇到新词查一查。");
      sayAt("Roof, roofs. The houses have red roofs.", { zh: "屋顶，好多屋顶。这些房子有红屋顶。", word: "roof roofs the houses have red" });
      k.wait(.3);

      D.step(3);
      N("换个词：", "person 的复数常用 people——完全换了一个词！");
      k.head("④ 换个词", 60, 320, C.blue, "start", 22);
      row(362, "person", "people", "人", C.blue);
      sayAt("One person, many people.", { zh: "一个人，好多人。", word: "person people many" });
      k.act(me, "surprised", S.at - 1.2, 1);
      k.wait(.4);

      D.step(4);
      N("口诀：", "孩子牛加 en，羊鹿鱼不变，叶刀狼变 ves，人换 people。");
      P(k.roughRect(40, 396, 800, 46), go(.6), .6, { color: C.blue, w: 2.4 });
      T("孩子牛加 en，羊鹿鱼不变，叶刀狼变 ves，人换 people！", 60, 426, go(1.2), 1.2, { size: 19, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.4);

      D.step(5);
      N("预测：", "There are three ___ on the farm.（三只羊）空里填什么？先想 3 秒！");
      P(k.roughRect(16, 452, 824, 80), go(.6), .6, { color: C.green, w: 2.5 });
      F(k.rectD(16, 452, 824, 80), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 There are three ___ on the farm.（羊）", 36, 484, go(.9), .9, { size: 20, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "sheep！一只羊、三只羊都写 sheep，不加 s。");
      T("three sheep（不加 s！）", 36, 518, go(.8), .8, { size: 20, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", S.at - .3, 1.3); k.sfx("ding", S.at + .2);
      sayAt("There are three sheep on the farm.", { zh: "农场里有三只羊。", word: "there are three on the farm" });
      D.hold(2);

      k.quoteCard({ insight: "不加 s 的复数还有四种：加 en、不变、\nf 变 ves、换个词（person → people）。", rhyme: "孩子牛加 en，羊鹿鱼不变，\n叶刀狼变 ves，人换 people！", hlLines: 2, foot: "👣 王炸实验室 · 不规则复数" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["en", "ves", "fe", "es", "f"],   // 词尾 / 字母名称，不是单词
    terms: [
      ["-en 复数", "📜 child/children、ox/oxen：古英语一类词的复数加 -en，现在常用的只剩这几个。"],
      ["单复数同形", "sheep、deer、fish：一只和好多只写法一样，很多是动物名。"],
      ["f → ves", "leaf/leaves、knife/knives、wolf/wolves；✂️ 但 roof 只加 s：roofs。"],
      ["换词复数", "person 的复数常用 people（正式文件里也用 persons）。"],
    ],
  },
];
