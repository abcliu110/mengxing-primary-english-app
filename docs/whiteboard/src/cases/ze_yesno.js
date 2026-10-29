// ==================== 🔀 中英对照总枢 · Q 否定疑问：Yes / No 跟着事实走（ze_yesno）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「Q 否定疑问」。中文回答「你说得对不对」，英语回答「事实是不是」。
// 配色只用 V3 四色（ink / red / green / blue）。徽章：💡 中英对照说法；✂️ 规则为小学生简化（口语里也有别的答法）。
WB_LAB.ze_yesno = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      const bubble = (x, y, w, txt, col, o = {}) => {
        P(k.roughRect(x, y - 30, w, 44), go(.4), .4, { color: col, w: 2.2 });
        F(k.rectD(x, y - 30, w, 44), go(.08, 0), { color: o.fill || "#ffffff", op: .95 });
        T(txt, x + 14, y, go(.6), .6, { size: o.size || 21, color: col, weight: 900, font: o.mono ? M : undefined });
      };
      N("", "这一幕：妈妈问「你不喜欢牛奶吗？」你其实喜欢——英语该说 Yes 还是 No？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "Yes / No 跟着事实走", sub: "🔀 中英对照 · 否定疑问", badges: ["💡", "✂️"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("否定疑问句：", "带「不」的问句，比如「你不喜欢牛奶吗？」英语是 Don't you like milk?");
      k.wait(.6);

      // ───── 镜头 1 · 中文怎么答 ─────
      D.step(0); D.shot();
      N("中文：", "你其实喜欢牛奶。中文答「不，我喜欢」——这个「不」是说：你猜错啦。");
      T("妈妈：", 60, 140, go(.3), .3, { size: 19, color: C.grey, weight: 900 });
      bubble(130, 140, 300, "你不喜欢牛奶吗？", C.ink);
      T("我：", 60, 210, go(.3), .3, { size: 19, color: C.grey, weight: 900 });
      bubble(130, 210, 300, "不，我喜欢！", C.blue);
      T("「不」= 你说得不对", 460, 210, go(.6), .6, { size: 17, color: C.blue, weight: 900 });
      T("（事实：我喜欢牛奶 🥛）", 460, 240, go(.5), .5, { size: 15, color: C.grey, weight: 700 });
      k.act(me, "point", S.at - .8, 1.2, { at: [280, 210] });
      k.wait(.5);

      // ───── 镜头 2 · 照搬成英语 ─────
      D.step(1);
      N("照搬：", "把「不」照搬成 No，就会说 No, I like——英语人听了会糊涂：到底喜欢还是不喜欢？");
      bubble(130, 310, 330, "Don't you like milk?", C.ink, { mono: true, size: 19 });
      sayAt("Don't you like milk?", { zh: "你不喜欢牛奶吗？", word: "Don't you like milk" });
      bubble(130, 380, 330, "No, I like.", C.red, { mono: true, size: 19 });
      k.redX(480, 356);
      T("❌ 中文的「不」不能照搬", 540, 380, go(.6), .6, { size: 17, color: C.red, weight: 900 });
      k.act(me, "surprised", S.at - .6, 1.2); k.expr(me, "oops", S.at - .6, 1.6);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 英语：看事实 ─────
      D.step(2); D.shot();
      N("英语：", "英语不管问句里有没有「不」，只看事实：喜欢就 Yes, I do.；不喜欢就 No, I don't.");
      T("事实：我喜欢 🥛", 60, 140, go(.5), .5, { size: 20, color: C.green, weight: 900 });
      bubble(60, 190, 330, "Yes, I do.", C.green, { mono: true });
      T("= 不，我喜欢", 410, 190, go(.4), .4, { size: 18, color: C.green, weight: 900 });
      const syY = sayAt("Yes, I do. I like milk.", { zh: "不，我喜欢。我喜欢牛奶。", word: "Yes I do" });
      k.act(me, "nod", syY.t + .3, 1);
      T("事实：我不喜欢", 60, 270, go(.5), .5, { size: 20, color: C.red, weight: 900 });
      bubble(60, 320, 330, "No, I don't.", C.red, { mono: true });
      T("= 对，我不喜欢", 410, 320, go(.4), .4, { size: 18, color: C.red, weight: 900 });
      sayAt("No, I don't. I don't like milk.", { zh: "对，我不喜欢。我不喜欢牛奶。", word: "No don't" });
      N("规则：", "Yes 后面一定跟「是 / 会 / 喜欢」，No 后面一定跟「不」：Yes 配 do，No 配 don't，不会打架。");
      T("Yes ＋ 肯定　No ＋ 否定", 60, 400, go(.8), .8, { size: 22, color: C.blue, weight: 900 });
      k.badge("✂️", 60 + k.estW("Yes ＋ 肯定　No ＋ 否定", 22) + 10, 396);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 4 · 更多例子 ─────
      D.step(3); D.shot();
      N("更多例子：", "外面很冷，妈妈问「不冷吗？」——事实是冷，所以 Yes, it is.");
      bubble(60, 150, 260, "Isn't it cold?", C.ink, { mono: true, size: 19 });
      T("→", 336, 150, go(.3), .3, { size: 22, color: C.grey, weight: 900 });
      bubble(370, 150, 230, "Yes, it is.", C.green, { mono: true, size: 19 });
      T("（很冷 ❄️）", 620, 150, go(.4), .4, { size: 16, color: C.grey, weight: 700 });
      sayAt("Isn't it cold? Yes, it is.", { zh: "不冷吗？不，很冷。", word: "Isn't it cold is" });
      N("", "你其实不会游泳，朋友问「你不会游泳吗？」——事实是不会，所以 No, I can't.");
      bubble(60, 240, 260, "Can't you swim?", C.ink, { mono: true, size: 19 });
      T("→", 336, 240, go(.3), .3, { size: 22, color: C.grey, weight: 900 });
      bubble(370, 240, 230, "No, I can't.", C.red, { mono: true, size: 19 });
      T("（不会游 🏊）", 620, 240, go(.4), .4, { size: 16, color: C.grey, weight: 700 });
      sayAt("Can't you swim? No, I can't.", { zh: "你不会游泳吗？对，我不会。", word: "Can't swim can't" });
      k.act(me, "think", S.at - 1.2, 1.4);
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "问句有「不」别管它，事实是啥答啥：是就 Yes，不是就 No！");
      T("问句有「不」别管它，事实是啥答啥！", 60, 340, go(1), 1, { size: 22, color: C.blue, weight: 900 });
      k.badge("💡", 60 + k.estW("问句有「不」别管它，事实是啥答啥！", 22) + 10, 336);
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.8);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "你是学生。老师问 Aren't you a student?（你不是学生吗？）英语怎么答？先想 3 秒！");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 Aren't you a student?（事实：我是学生）", 36, 470, go(1.2), 1.2, { size: 19, color: C.ink, weight: 900 });
      sayAt("Aren't you a student?", { zh: "你不是学生吗？", word: "Aren't you a student" });
      const qm = D.sub(); T("？", 560, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "事实是「是学生」，所以 Yes, I am.（中文要说：不，我是学生。）");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("Yes, I am.", 560, 472, 22, { mono: true, color: C.hlGreen });
      T("Yes, I am.", 560, 472, go(.8), .8, { size: 22, color: C.green, weight: 900, font: M });
      T("（中文：不，我是学生）", 36, 510, go(.6), .6, { size: 15, color: C.grey, weight: 700 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Yes, I am. I am a student.", { zh: "不，我是。我是学生。", word: "am" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文回答「你说得对不对」，\n英语回答「事实是不是」：\n事实是，就 Yes；事实不是，就 No。", rhyme: "问句有「不」别管它，\n事实是啥答啥！", hlLines: 2, foot: "🔀 中英对照 · 否定疑问" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["No, I like."],   // 照搬中文的错误答法（打红叉），不读
    terms: [
      ["否定疑问句", "带「不」的问句：Don't you like milk?（你不喜欢牛奶吗？）Isn't it cold?（不冷吗？）"],
      ["简短回答", "只用 Yes / No + 主语 + 助动词回答：Yes, I do. / No, I don't. / Yes, it is."],
      ["事实", "真实的情况。英语的 Yes / No 跟着事实走，不跟着问句里的「不」走。"],
      ["负迁移", "把中文的习惯硬搬进英语，结果说错了。比如把「不，我喜欢」照搬成 No, I like。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ✂️ 简化说法（口语里还有别的答法）· ⚠️ 有要注意的地方 · 📜 有出处的历史。"],
    ],
  },
];
