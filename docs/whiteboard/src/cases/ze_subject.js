// ==================== 🔀 中英对照总枢 · A 句子必须有主语（ze_subject）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「A 中英思维对照」。中文常常省掉主语（下雨了、好冷、去上学了），
// 英语的句子一定要有主语：没人做的事（天气、时间、距离）就请 it 来占位。
// 配色只用 V3 四色。徽章：💡 中英对照说法；✂️ 小学阶段的简化（祈使句可以不写主语，本幕只提一句）。
WB_LAB.ze_subject = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      // 雨云：几条雨线循环落下（用 buzz 轻微抖动表示下雨）
      const cloud = (x, y) => {
        const g = D.sub();
        P(k.cloud(x, y, 60, 26, 6), go(.6), .6, { color: C.blue, w: 2.6 });
        F(k.cloud(x, y, 60, 26, 6), go(.1, 0), { color: C.tintBlue, op: 1 });
        for (let i = 0; i < 5; i++) P(k.wl(x - 40 + i * 20, y + 34, x - 48 + i * 20, y + 58, .2), go(.1), .1, { color: C.blue, w: 2.4 });
        D.back(); return g;
      };
      N("", "这一幕：中文说「下雨了」，谁下的雨？英语可一定要说出来！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "句子必须有主语", sub: "🔀 中英对照 · 中英思维", badges: ["💡", "✂️"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("主语：", "句子里「谁 / 什么」在做这件事。英语的句子，主语一个都不能少。");
      k.wait(.6);

      // ───── 镜头 1 · 中文常常省主语 ─────
      D.step(0); D.shot();
      N("中文：", "「下雨了」「好冷」「去上学了」——中文不说是谁，大家也听得懂。");
      const gR = cloud(160, 150);
      k.buzz(gR, S.at, 2.4, 2);
      T("下雨了。", 280, 160, go(.6), .6, { size: 26, color: C.ink, weight: 900 });
      T("好冷！", 280, 220, go(.5), .5, { size: 26, color: C.ink, weight: 900 });
      T("去上学了。", 280, 280, go(.6), .6, { size: 26, color: C.ink, weight: 900 });
      T("← 谁？没说", 470, 220, go(.5), .5, { size: 18, color: C.red, weight: 900 });
      k.act(me, "think", S.at - .6, 1.4);
      k.wait(.5);

      // ───── 镜头 2 · 照搬：没有主语的英语 ─────
      D.step(1);
      N("照搬：", "照中文直接翻，就成了 Is raining.、Is cold.——英语里这是半句话，缺了主语。");
      T("Is raining.", 280, 360, go(.6), .6, { size: 24, color: C.red, weight: 900, font: M });
      T("Is cold.", 520, 360, go(.5), .5, { size: 24, color: C.red, weight: 900, font: M });
      k.redX(660, 336);
      k.act(me, "surprised", S.at - .5, 1.2); k.expr(me, "oops", S.at - .5, 1.6);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 英语：请 it 来占位 ─────
      D.step(2); D.shot();
      N("占位主语 it：", "天气、时间、距离，没有人在做——英语就请 it 来坐主语的位置，it 不用翻译。");
      const gR2 = cloud(150, 150);
      k.buzz(gR2, S.at, 2.4, 2);
      T("It is raining.", 270, 160, go(.8), .8, { size: 26, color: C.green, weight: 900, font: M });
      k.hlText("It", 270, 160, 26, { mono: true, color: C.hlYellow });
      sayAt("It is raining.", { zh: "下雨了。", word: "It is raining" });
      T("It is cold!", 270, 220, go(.6), .6, { size: 26, color: C.green, weight: 900, font: M });
      sayAt("It is cold!", { zh: "好冷！", word: "cold" });
      T("It is seven o'clock.", 270, 280, go(.8), .8, { size: 26, color: C.green, weight: 900, font: M });
      sayAt("What time is it? It is seven o'clock.", { zh: "几点了？七点了。", word: "What time seven o'clock" });
      k.act(me, "point", S.at - 1.2, 1.4, { at: [300, 220] });
      T("it = 占位主语（天气、时间、距离）", 270, 330, go(.8), .8, { size: 18, color: C.blue, weight: 900 });
      k.badge("💡", 270 + k.estW("it = 占位主语（天气、时间、距离）", 18) + 10, 326);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 4 · 有人做的事：把人说出来 ─────
      D.step(3); D.shot();
      N("把人说出来：", "「去上学了」是谁去？是我，就说 I go to school.；是他，就说 He goes to school.");
      T("（我）去上学了。", 60, 150, go(.6), .6, { size: 22, color: C.ink, weight: 900 });
      T("→  I go to school.", 300, 150, go(.8), .8, { size: 24, color: C.green, weight: 900, font: M });
      const syG = sayAt("I go to school.", { zh: "我去上学了。", word: "I go to school" });
      { const [w0, wd] = win(syG); k.act(me, "walk", w0, Math.max(1, wd), { to: 820, words: ["go"] }); }
      k.act(me, "walk", S.at + .1, 1, { to: 892 });
      T("（他）也去。", 60, 210, go(.5), .5, { size: 22, color: C.ink, weight: 900 });
      T("→  He goes too.", 300, 210, go(.7), .7, { size: 24, color: C.green, weight: 900, font: M });
      sayAt("He goes too. He goes to school too.", { zh: "他也去。他也去上学。", word: "He goes too" });
      N("✂️ 例外：", "叫别人做事的句子（祈使句）可以不说主语：Sit down, please. 主语 you 藏起来了。");
      T("✂️ 例外：Sit down, please.（主语 you 藏起来了）", 60, 280, go(1), 1, { size: 17, color: C.grey, weight: 700 });
      sayAt("Sit down, please. I mean you!", { zh: "请坐。说的就是你！", word: "Sit down please you" });
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "英语句子要有主，没人做事请 it 住！");
      T("英语句子要有主，没人做事请 it 住！", 60, 360, go(1), 1, { size: 22, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.8);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "「好热啊！今天是星期一。」英语怎么说？两句都要主语，先想 3 秒！");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 好热啊！今天是星期一。= ？", 36, 470, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 420, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "It is hot! It is Monday today. 天气和日子都请 it 占位。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("It is hot! It is Monday today.", 36, 512, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("It is hot! It is Monday today.", { zh: "好热啊！今天是星期一。", word: "hot Monday today" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文常常省掉主语，英语一个都不能少：\n有人做事，把人说出来；\n没人做事（天气、时间），请 it 来占位。", rhyme: "英语句子要有主，\n没人做事请 it 住！", hlLines: 2, foot: "🔀 中英对照 · 中英思维" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["Is raining.", "Is cold."],   // 照搬中文、缺主语的错句（打红叉），不读
    actionWords: [
      { word: "go", act: "讲解员朝学校方向走几步再走回来（walk）" },
    ],
    terms: [
      ["主语", "句子里「谁 / 什么」做这件事：I go to school 里的 I。英语句子必须有主语。"],
      ["占位主语 it", "天气、时间、距离没有人在做，就请 it 坐在主语的位置上：It is raining. It is seven o'clock."],
      ["祈使句", "叫别人做事的句子，主语 you 可以不说：Sit down, please."],
      ["负迁移", "把中文省主语的习惯搬进英语，说成 Is raining.，就缺了主语。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ✂️ 简化说法 · ⚠️ 有要注意的地方 · 📜 有出处的历史。"],
    ],
  },
];
