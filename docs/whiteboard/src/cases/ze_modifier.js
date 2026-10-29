// ==================== 🔀 中英对照总枢 · 修饰语位置（ze_modifier）（v2 + 讲解员）====================
// 2026-10-30 从第一性原理 ⑥-1（fp_zoom_focus 第 1 幕）零丢失整幕搬来（清单 docs/whiteboard/zh_en_hub/INVENTORY_6-1.md）。
// v2 升级（2026-10-29）：引擎 v2 + 讲解员；对照版五步（中文 → 照搬 → 英语 → 例子 → 口诀）+ 🔮 预测 + 金句卡。
// 升级前的版本原样保存在 cases/ze_modifier_classic.js（R1 零丢失，可随时回退）；对照清单 zh_en_hub/INVENTORY_ZE_MODIFIER_V2.md。
// 徽章：树干树枝比喻 💡；配色只用 V3 四色（原「something important」紫色改红色，文字不变）。
WB_LAB.ze_modifier = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：为什么英语的长修饰语要放在名词后面？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "🔀 修饰语位置（原理 ⑥ 焦点先行）", sub: "先立树干，后挂树枝", badges: ["💡"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 中文：修饰语全堆在前面 ─────
      D.step(0); D.shot();
      N("中英对照：", "中文的修饰语再长也放在名词前面；英语只有 1 个词才放前面，长的要挂到名词后面。照搬中文语序，英语就「头重脚轻」了。");
      N("修饰语：", "用来说明「哪一个、什么样」的词或短语，比如「穿蓝衣服的」。");
      const z = k.zh("树下那个穿蓝衣服的男孩", 60, 150, 26);
      k.circle(z, 9, 10, C.red);
      T("中文：一大串铺垫，最后才说核心「男孩」", 60, 192, go(1.2), 1.2, { size: 16, color: C.grey, weight: 700 });
      k.act(me, "point", S.at - 1.4, 1.4, { at: [330, 140] });
      k.wait(.3);

      // ───── 照搬 ─────
      D.step(1);
      T("❌ 照搬中文语序：一长串修饰堆在 boy 前面 → 头重脚轻", 60, 250, go(1), 1, { size: 18, color: C.red, weight: 900 });
      k.act(me, "surprised", S.at - .4, 1.2); k.expr(me, "oops", S.at - .4, 1.6);
      k.wait(.5);
      D.wipe();

      // ───── 镜头 2 · 先立树干，后挂树枝 ─────
      D.step(2); D.shot();
      N("核心名词：", "这句话真正在说的那个人或东西——the boy。英语先把它亮出来。");
      k.tree({ cx: 200, ground: 440, trunkTop: 288, crownY: 250, crownRx: 90, crownRy: 42, gx0: 80, gx1: 330 });
      k.sign("the boy", 200, 324, null, { size: 22 });
      k.act(me, "point", S.at - 1, 1.3, { at: [200, 320] });
      N("短语：", "两个词以上组成的一小组，比如 in blue、under the tree。");
      k.chip("in blue", 300, 288, [266, 264], { size: 17, color: C.blue });
      k.chip("under the tree", 300, 360, [348, 322], { size: 17, color: C.green, string: true });
      T("the boy in blue under the tree", 60, 480, go(1.2), 1.2, { size: 20, color: C.green, weight: 900, font: M });
      k.badge("💡", 60 + k.estW("the boy in blue under the tree", 20) * 1.1 + 12, 476, { label: "比喻" });
      k.wait(.4);
      const cBoy = k.prop("card", 0, 0, { text: "the boy", hidden: true });
      const syBoy = sayAt("The boy in blue under the tree is my brother.", { zh: "树下穿蓝衣服的男孩是我弟弟。", word: "the boy" });
      k.act(me, "holdCard", syBoy.t - .2, Math.max(1.6, syBoy.dur + .4), { prop: cBoy });
      k.wait(.3);
      D.wipe();

      // ───── 镜头 3 · 两条规则 + 例子 ─────
      D.step(3); D.shot();
      N("", "只有 1 个词的轻修饰，放在名词前面，挡不住核心。");
      k.head("1 个词 → 放前面", 60, 140, C.blue, "start", 20);
      T("a red apple", 60, 178, go(.5), .5, { size: 21, color: C.ink, weight: 900, font: M });
      T("a cute cat · my English book", 60, 210, go(.8), .8, { size: 18, color: C.blue, weight: 700, font: M });
      k.wait(.4);
      N("", "2 个词以上的短语，一律挂在名词后面，像圣诞树上的挂件。");
      k.head("2 个词以上 → 挂后面", 440, 140, C.green, "start", 20);
      T("the girl in a red dress", 440, 178, go(.8), .8, { size: 20, color: C.ink, weight: 900, font: M });
      T("穿红裙子的女孩", 440, 202, go(.4), .4, { size: 14, color: C.grey });
      T("the book on the teacher's desk", 440, 238, go(.9), .9, { size: 18, color: C.ink, weight: 900, font: M });
      T("讲台上的书", 440, 262, go(.4), .4, { size: 14, color: C.grey });
      const sySee = sayAt("I see the girl in a red dress.", { zh: "我看见那个穿红裙子的女孩。" });
      k.act(me, "point", sySee.t, Math.max(1.2, sySee.dur), { at: [560, 178], words: ["see"] });
      N("不定代词：", "something、anything 这类词，连 1 个词的修饰也放后面。");
      T("something important", 60, 310, go(.7), .7, { size: 19, color: C.red, weight: 900, font: M });
      T("（特殊：也放后面）", 60 + k.estW("something important", 19) * 1.1 + 12, 310, go(.5), .5, { size: 14, color: C.grey });
      k.wait(.4);
      const syTell = sayAt("I have something important to tell you.", { zh: "我有重要的事要告诉你。", word: "something important" });
      k.act(me, "wave", syTell.t + syTell.dur * .5, Math.max(1, syTell.dur * .5), { words: ["tell"] });
      // R2 补朗读（2026-10-29，搬迁时在新位置补齐）
      sayAt("In blue, under the tree. The boy in blue is under the tree.", { zh: "穿蓝衣服的，在树下。穿蓝衣服的男孩在树下。", word: "in blue under tree" });
      sayAt("A red apple. A cute cat. My English book.", { zh: "一个红苹果。一只可爱的猫。我的英语书。", word: "a red apple cute cat my English book a red apple a cute cat my English book" });
      sayAt("The girl in a red dress. The book on the teacher's desk.", { zh: "穿红裙子的女孩。讲台上的书。", word: "girl dress on teacher's desk the book on the teacher's desk" });
      sayAt("Something, anything. Is there anything new?", { zh: "某事、任何事。有什么新鲜事吗？", word: "anything" });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "先立树干，后挂树枝。");
      P(k.roughRect(40, 340, 800, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：先立树干，后挂树枝。", 60, 372, go(.9), .9, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.5);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "「桌子上的那只猫」，英语怎么说？on the table 放 cat 前面还是后面？先想 3 秒！");
      P(k.roughRect(16, 420, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 420, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 桌子上的那只猫 = ？", 36, 460, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 300, 464, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "on the table 是 3 个词的短语，挂在 cat 后面——the cat on the table.");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("the cat on the table", 36, 502, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Look at the cat on the table.", { zh: "看桌子上的那只猫。", word: "the cat on the table cat table" });
      D.hold(2);

      k.quoteCard({ insight: "1 个词的修饰放名词前；\n2 个词以上的短语挂在名词后", rhyme: "先立树干，\n后挂树枝。", hlLines: 2, foot: "🔀 中英对照 · 修饰语位置" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "see", act: "讲解员读 I see the girl… 时指向「the girl in a red dress」（point）" },
      { word: "tell", act: "讲解员读 to tell you 时向观众挥手（wave）" },
    ],
    terms: [
      ["修饰语", "说明「哪一个、什么样」的词或短语，比如 red、in blue。"],
      ["核心名词", "这句话真正在说的人或东西，比如 the boy in blue 里的 the boy。"],
      ["短语", "两个词以上组成的一小组，但还不是完整的句子，比如 in blue、under the tree。"],
      ["语序", "词在句子里排列的先后顺序。"],
      ["疑问词", "what、where、when、who、how 这类用来提问的词。"],
      ["感叹句", "表示强烈感情的句子，以 What 或 How 开头：What a clever boy!"],
      ["可信度徽章", "💡 记忆比喻（树干、树枝）· 📜 有出处的历史 · ✂️ 简化说法 · ⚠️ 有要注意的地方。"],
    ],
  },
];
