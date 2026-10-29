// ==================== 🔀 中英对照总枢 · 「是」≠ be（ze_be）（v2 + 讲解员）====================
// 2026-10-29 从第一性原理 ④-1（fp_one_king 第 1 幕）零丢失整幕搬来（清单 docs/whiteboard/zh_en_hub/INVENTORY_4-1.md）。
// v2 升级（2026-10-29）：引擎 v2 + 讲解员 + 两个国王角色演「抢王座」；结构改成对照版五步（中文 → 照搬 → 英语 → 例子 → 口诀）+ 🔮 预测。
// 升级前的版本原样保存在 cases/ze_be_classic.js（R1 零丢失，可随时回退）。原字幕 / 白板 / 朗读 / 术语逐条保留，见 zh_en_hub/INVENTORY_ZE_BE_V2.md。
// 徽章：国王比喻 💡；配色只用 V3 四色。
WB_LAB.ze_be = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：为什么不能说 I am like apples？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "🔀「是」≠ be（原理 ④ 一山不容二虎）", sub: "一个句子，一个国王", badges: ["💡"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 中文：「是」到处用 ─────
      D.step(0); D.shot();
      N("中英对照：", "中文「我是喜欢苹果」听着挺顺，可英语的 be 不等于中文的「是」——照搬就会说成 I am like apples。");
      T("我是喜欢苹果。", 60, 150, go(.7), .7, { size: 24, color: C.ink, weight: 900 });
      T("我是十岁。　我是很开心。", 60, 200, go(.9), .9, { size: 20, color: C.grey, weight: 700 });
      k.hlText("是", 60 + k.estW("我", 24), 150, 24, { color: C.hlYellow });
      k.act(me, "think", S.at - .6, 1.4);
      k.wait(.3);

      // ───── 照搬：两个国王 ─────
      D.step(1);
      T("I am like apples.", 60, 290, go(.8), .8, { size: 26, color: C.red, weight: 900, font: M });
      k.redX(330, 266);
      k.act(me, "surprised", S.at - .4, 1.2); k.expr(me, "oops", S.at - .4, 1.6);
      k.wait(.5);
      D.wipe();

      // ───── 镜头 2 · 王座之争 ─────
      D.step(2); D.shot();
      N("谓语动词：", "句子里说「做什么 / 是什么」的那个动词，是句子的国王。");
      // 王座
      P(k.roughRect(380, 330, 120, 110), go(.8), .8, { color: C.blue, w: 3 });
      F(k.rectD(380, 330, 120, 110), go(.2, 0), { color: C.tintInk, op: .7 });
      P(k.roughRect(370, 260, 140, 74), go(.6), .6, { color: C.blue, w: 3 });
      T("👑 王座", 440, 395, go(.4), .4, { size: 20, color: C.ink, weight: 900, anchor: "middle" });
      T("谓语动词", 440, 420, go(.3), .3, { size: 14, color: C.grey, weight: 700, anchor: "middle" });
      const gK = D.sub();
      const kA = k.actor("king", { x: 170, y: 470, s: .8, f: 1, g: gK });
      const kB = k.actor("king", { x: 700, y: 470, s: .8, f: -1, g: gK });
      const cA = k.prop("card", 0, 0, { text: "am", g: gK, hidden: true });
      const cB = k.prop("card", 0, 0, { text: "like", g: gK, hidden: true });
      D.back();
      N("", "am 和 like 都想坐王座——一个句子里两个国王，打起来了！");
      const t1 = S.at - 2.2;
      k.act(kA, "holdCard", t1, 2.6, { prop: cA, words: ["am"], release: false });
      k.act(kB, "holdCard", t1 + .3, 2.6, { prop: cB, words: ["like"], release: false });
      k.act(kA, "walk", t1 + 2.8, 1.2, { to: 320 }); k.act(kB, "walk", t1 + 2.8, 1.2, { to: 560 });
      k.act(kA, "jump", t1 + 4.1, .9); k.act(kB, "jump", t1 + 4.3, .9);
      k.expr(kA, "oops", t1 + 4, 2); k.expr(kB, "oops", t1 + 4, 2);
      k.wait(1.2);
      T("一山不容二虎！", 440, 200, go(.8), .8, { size: 22, color: C.red, weight: 900, anchor: "middle" });
      k.badge("💡", 440 + k.estW("一山不容二虎！", 22) / 2 + 10, 196, { label: "比喻" });
      k.act(me, "point", S.at - .8, 1.4, { at: [440, 300] });
      k.wait(.4);
      N("实义动词：", "表示真正动作或心理的动词，比如 like、play、eat。它自己就能当国王。");
      const t2 = S.at - 3;
      k.act(kA, "walk", t2, 1.8, { to: -120 });   // am 国王退场（这一句不要 be）
      k.act(kB, "walk", t2 + .4, 1.4, { to: 450 });
      k.act(kB, "cheer", t2 + 2, 1.4); k.expr(kB, "proud", t2 + 2, 2.5);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 两条路线 ─────
      D.step(3); D.shot();
      k.head("路线 A：动作王", 60, 140, C.red, "start", 20);
      T("I like apples.", 60, 180, go(.8), .8, { size: 24, color: C.green, weight: 900, font: M });
      T("like 是动词，自己当国王，不要 am", 60, 210, go(.8), .8, { size: 15, color: C.grey });
      const syLike = sayAt("I like apples.", { zh: "我喜欢苹果。", word: "like" });
      k.act(me, "cheer", syLike.t, Math.max(1, syLike.dur), { words: ["like"] });
      k.wait(.3);
      N("be 动词：", "am / is / are，意思是「是、在」。表示状态，也能当国王。");
      k.head("路线 B：状态王", 470, 140, C.blue, "start", 20);
      T("I am happy.", 470, 180, go(.7), .7, { size: 24, color: C.green, weight: 900, font: M });
      N("形容词：", "描述样子、心情的词，比如 happy、tall。它不是动词，要 be 动词撑腰。");
      T("happy 不是动词，要请 am 撑腰", 470, 210, go(.8), .8, { size: 15, color: C.grey });
      const cAm = k.prop("card", 0, 0, { text: "am", hidden: true });
      const syAm = sayAt("I am happy.", { zh: "我很开心。", word: "am" });
      k.act(me, "holdCard", syAm.t - .2, Math.max(1.4, syAm.dur + .4), { prop: cAm, words: ["am"] });
      k.wait(.3);

      // ───── 更多例子 ─────
      T("I am ten. · She is tall. · They are in the park.", 60, 290, go(1.4), 1.4, { size: 18, color: C.blue, weight: 700, font: M });
      T("She plays the piano.（动作王自己加 -s）", 60, 330, go(1.2), 1.2, { size: 18, color: C.red, weight: 700, font: M });
      // R2 补朗读（2026-10-29，搬迁时在新位置补齐）
      sayAt("I am ten. She is tall. They are in the park.", { zh: "我十岁。她个子高。他们在公园里。", word: "I am ten She is tall They are in the park" });
      sayAt("She plays the piano. I like apples.", { zh: "她弹钢琴。我喜欢苹果。", word: "plays piano apples happy" });
      k.act(me, "point", S.at - 2.4, 1.4, { at: [300, 326] });
      sayAt("Be, do. Play, eat. I play and eat.", { zh: "be 动词、do 动词。玩、吃。我玩，我吃。", word: "be do play eat" });
      k.wait(.5);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "一个句子一个王，be 和 do 不同堂。");
      P(k.roughRect(40, 372, 800, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：一个句子一个王，be 和 do 不同堂。", 60, 404, go(1), 1, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「我是很喜欢画画」，英语怎么说？要不要 am？先想 3 秒！");
      P(k.roughRect(16, 440, 824, 92), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 440, 824, 92), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 我是很喜欢画画。= ？", 36, 478, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 330, 482, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "like 自己当国王，不要 am——I like drawing very much.");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("I like drawing very much.", 36, 516, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("I like drawing very much.", { zh: "我很喜欢画画。", word: "drawing very much" });
      D.hold(2);

      k.quoteCard({ insight: "一个简单句只有 1 个谓语国王：\n要么 be（状态），要么实义动词（动作）", rhyme: "一个句子一个王，\nbe 和 do 不同堂。", hlLines: 2, foot: "🔀 中英对照 ·「是」≠ be" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["I am like apples."],   // 红叉错句（两个国王），不读
    actionWords: [
      { word: "am", act: "am 国王举起「am」词卡抢王座；讲解员举「am」词卡给 happy 撑腰（holdCard）" },
      { word: "like", act: "like 国王举起「like」词卡抢王座（holdCard）；讲解员读 I like apples 时欢呼（cheer）" },
    ],
    terms: [
      ["谓语动词", "句子里说「做什么 / 是什么」的动词，是句子的核心（国王）。一个简单句只能有一个。"],
      ["be 动词", "am / is / are（过去 was / were），意思是「是、在」，表示状态。"],
      ["实义动词", "表示真正动作或心理活动的动词：like、play、eat、want……"],
      ["形容词", "描述样子、心情、性质的词：happy、tall、big。不是动词，不能自己当谓语。"],
      ["主语", "句子里「谁 / 什么」做这件事，比如 I like apples 里的 I。"],
      ["助动词", "帮忙变疑问句、否定句的「侍卫」：do / does / did，还有 can、will 等。"],
      ["可信度徽章", "💡 记忆比喻（国王、王座）· 📜 有出处的历史 · ✂️ 简化说法 · ⚠️ 有要注意的地方。"],
    ],
  },
];
