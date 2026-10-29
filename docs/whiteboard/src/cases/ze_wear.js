// ==================== 🔀 中英对照总枢 · N 一字多词：穿 / 带 / 教学（ze_wear）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「N 一字多词」。三组：
// 穿 = wear（穿着，状态）/ put on（穿上，动作）；带 = take（带走，离开说话人）/ bring（带来，朝说话人来）；
// 中文「教 / 学」有时混着说（「我学你」= 我教你？），英语分得清：teach（教别人）/ learn（自己学）。
// 配色只用 V3 四色。徽章：💡 中英对照说法；✂️ 为小学生简化的分法。
WB_LAB.ze_wear = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      const pair = (y, zh, a, az, b, bz, ca, cb) => {
        T(zh, 60, y, go(.4), .4, { size: 24, color: C.ink, weight: 900 });
        T(a, 180, y, go(.5), .5, { size: 24, color: ca, weight: 900, font: M });
        T(az, 180, y + 28, go(.4), .4, { size: 15, color: C.grey, weight: 700 });
        T(b, 480, y, go(.5), .5, { size: 24, color: cb, weight: 900, font: M });
        T(bz, 480, y + 28, go(.4), .4, { size: 15, color: C.grey, weight: 700 });
      };
      N("", "这一幕：中文的「穿」「带」「教 / 学」，英语都分成两个词。三组一起记！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "穿 / 带 / 教学", sub: "🔀 中英对照 · 一字多词", badges: ["💡", "✂️"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("一字多词：", "中文一个字，英语分两个词：一个说「状态 / 方向 A」，一个说「动作 / 方向 B」。");
      k.wait(.6);

      // ───── 镜头 1 · 穿：wear / put on ─────
      D.step(0); D.shot();
      N("穿：", "「她穿着红裙子」是一直穿着（状态）；「快穿上外套」是穿上去的那个动作。中文都说「穿」。");
      pair(140, "穿", "wear", "穿着（状态）", "put on", "穿上（动作）", C.blue, C.red);
      D.step(1);
      N("照搬：", "全都用 wear，就会说 Wear your coat quickly! 英语里「快穿上」要用 put on。");
      T("Wear your coat quickly!", 60, 220, go(.8), .8, { size: 20, color: C.red, weight: 900, font: M });
      k.redX(380, 196);
      D.step(2);
      T("She wears a red dress.", 60, 270, go(.8), .8, { size: 20, color: C.green, weight: 900, font: M });
      sayAt("She wears a red dress.", { zh: "她穿着一条红裙子。", word: "wear She wears a red dress" });
      T("Put on your coat, please!", 60, 320, go(.8), .8, { size: 20, color: C.green, weight: 900, font: M });
      sayAt("Put on your coat, please!", { zh: "请穿上你的外套！", word: "put on your coat please" });
      k.act(me, "point", S.at - 1.2, 1.4, { at: [250, 300] });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 带：take / bring ─────
      D.step(3); D.shot();
      N("带：", "东西离开我这边，用 take（带走）；东西朝我这边来，用 bring（带来）。");
      pair(140, "带", "take", "带走（离开我）", "bring", "带来（到我这里）", C.blue, C.red);
      const gB = D.sub(); const bx = k.prop("box", 960, 470, { g: gB, s: .7 }); D.back();
      k.act(me, "take", S.at, 1, { prop: bx });
      T("Take the box to the classroom.", 60, 240, go(1), 1, { size: 20, color: C.green, weight: 900, font: M });
      const syT = sayAt("Take the box to the classroom.", { zh: "把箱子带到教室去。", word: "take the box to classroom" });
      { const [w0, wd] = win(syT); k.act(me, "carry", w0, Math.max(1.6, wd), { prop: bx, to: 660, words: ["take"] }); }
      T("Bring your book to me.", 60, 300, go(1), 1, { size: 20, color: C.green, weight: 900, font: M });
      const syR = sayAt("Bring your book to me. Bring it here!", { zh: "把你的书带给我。拿到这儿来！", word: "bring book me it here" });
      { const [w0, wd] = win(syR); k.act(me, "carry", w0, Math.max(1.6, wd), { prop: bx, to: 892, put: true, words: ["bring"] }); }
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 教 / 学：teach / learn ─────
      D.shot();
      N("教 / 学：", "有的方言里「我学你」= 我教你。英语分得很清楚：教别人 teach，自己学 learn。");
      pair(140, "教 / 学", "teach", "教（别人）", "learn", "学（自己）", C.blue, C.red);
      T("Miss Li teaches us English.", 60, 240, go(1), 1, { size: 20, color: C.green, weight: 900, font: M });
      sayAt("Miss Li teaches us English.", { zh: "李老师教我们英语。", word: "teach Miss Li teaches us English" });
      T("We learn English from her.", 60, 300, go(1), 1, { size: 20, color: C.green, weight: 900, font: M });
      sayAt("We learn English from her.", { zh: "我们跟她学英语。", word: "learn We from her" });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "穿着 wear 穿上 put on；带走 take 带来 bring；教人 teach 自学 learn！");
      T("穿着 wear，穿上 put on；带走 take，带来 bring；", 60, 370, go(1.2), 1.2, { size: 19, color: C.blue, weight: 900 });
      T("教人 teach，自学 learn！", 60, 404, go(.8), .8, { size: 19, color: C.blue, weight: 900 });
      k.badge("💡", 60 + k.estW("教人 teach，自学 learn！", 19) + 10, 400);
      k.wait(.8);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "妈妈在家说：「明天把你的照片带来给我看。」照片朝妈妈这边来，用哪个词？先想 3 秒！");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 把你的照片带来给我看 = ____ your photos to me.", 36, 470, go(1.2), 1.2, { size: 19, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 660, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "照片朝说话的妈妈来，用 bring：Bring your photos to me.");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("Bring your photos to me.", 36, 512, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Bring your photos to me.", { zh: "把你的照片带来给我。", word: "photos" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文一个字，英语分两个词：\n穿着 wear / 穿上 put on，带走 take / 带来 bring，\n教人 teach / 自己学 learn。", rhyme: "带走 take，带来 bring；\n教人 teach，自学 learn！", hlLines: 2, foot: "🔀 中英对照 · 一字多词" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["Wear your coat quickly!", "quickly", "____ your photos to me."],   // 照搬的错误说法（打红叉）；预测题填空句（揭晓后整句朗读）
    actionWords: [
      { word: "take", act: "讲解员抱起箱子往左走开（carry，离开说话人）" },
      { word: "bring", act: "讲解员抱着箱子走回原处放下（carry，回到说话人这里）" },
    ],
    terms: [
      ["wear / put on", "wear 是穿着（状态）：She wears a red dress.；put on 是穿上（动作）：Put on your coat."],
      ["take / bring", "take 带走（离开说话人）；bring 带来（朝说话人来）。"],
      ["teach / learn", "teach 教别人：Miss Li teaches us English.；learn 自己学：We learn English."],
      ["一字多词", "中文一个字，英语分成几个词：借、说、穿、带、教 / 学。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ✂️ 简化说法 · ⚠️ 有要注意的地方 · 📜 有出处的历史。"],
    ],
  },
];
