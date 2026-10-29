// ==================== 🔀 中英对照总枢 · N 一字多词：说 = say / speak / talk / tell（ze_say）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「N 一字多词」。中文一个「说」，英语按「说什么」分四个词：
// say 说出具体的话、speak 说一种语言、talk 和人聊天（talk with / about）、tell 告诉某人（tell sb. sth.）。
// 配色只用 V3 四色。徽章：💡 中英对照说法；✂️ 为小学生简化的分法（四个词还有别的用法）。
WB_LAB.ze_say = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      const card = (x, y, w, word, zh, ex, col) => {
        P(k.roughRect(x, y, w, 120), go(.5), .5, { color: col, w: 2.4 });
        F(k.rectD(x, y, w, 120), go(.08, 0), { color: "#ffffff", op: .92 });
        T(word, x + 14, y + 34, go(.4), .4, { size: 26, color: col, weight: 900, font: M });
        T(zh, x + 14, y + 64, go(.4), .4, { size: 16, color: C.ink, weight: 900 });
        T(ex, x + 14, y + 98, go(.7), .7, { size: 16, color: C.grey, weight: 700, font: M });
      };
      N("", "这一幕：中文一个「说」字，英语分成 say、speak、talk、tell 四个词。怎么挑？看「说什么」！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "说：say / speak / talk / tell", sub: "🔀 一字多词", badges: ["💡", "✂️"], steps: ["① 中文", "② 照搬", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("一字多词：", "中文一个字，英语常常分成好几个词。今天看「说」。");
      k.wait(.6);

      // ───── 镜头 1 · 中文：四个「说」─────
      D.step(0); D.shot();
      N("中文：", "「说你好」「说英语」「和朋友说话」「跟我说个故事」——都是「说」，意思可不太一样。");
      ["说「你好」", "说英语", "和朋友说话", "跟我说一个故事"].forEach((z, i) => T(z, 60 + (i % 2) * 300, 150 + Math.floor(i / 2) * 56, go(.5), .5, { size: 22, color: C.ink, weight: 900 }));
      k.act(me, "think", S.at - .6, 1.4);
      k.wait(.4);
      // ───── 照搬 ─────
      D.step(1);
      N("照搬：", "全都用一个词，就会说出 speak hello、say English 这样的怪句子。");
      T("speak hello　say English", 60, 300, go(.8), .8, { size: 22, color: C.red, weight: 900, font: M });
      k.redX(420, 276);
      k.act(me, "surprised", S.at - .5, 1.2); k.expr(me, "oops", S.at - .5, 1.6);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 四张词卡 ─────
      D.step(2); D.shot();
      N("say：", "说出具体的话：say hello、say \"Thank you\"。后面跟说的内容。");
      card(40, 110, 390, "say", "说出具体的话", "say hello", C.blue);
      const syS = sayAt("Say hello to your friend.", { zh: "跟你的朋友打个招呼。", word: "say hello to your friend" });
      { const [w0, wd] = win(syS); k.act(me, "wave", w0, Math.max(1.2, wd), { words: ["say"] }); }
      N("speak：", "说一种语言：speak English、speak Chinese。");
      card(450, 110, 390, "speak", "说一种语言", "speak English", C.red);
      sayAt("I can speak English and Chinese.", { zh: "我会说英语和汉语。", word: "speak English Chinese I can and" });
      N("talk：", "和人聊天、谈话：talk with a friend、talk about a film。");
      card(40, 250, 390, "talk", "和人聊天", "talk with a friend", C.green);
      sayAt("We talk with a friend after class.", { zh: "下课后我们和一个朋友聊天。", word: "talk with a friend We after class" });
      N("tell：", "告诉某人：tell me a story、tell him the news。后面先跟人。");
      card(450, 250, 390, "tell", "告诉某人", "tell me a story", C.ink);
      sayAt("Please tell me a story.", { zh: "请给我讲个故事。", word: "tell me a story please" });
      sayAt("Tell him the news. Let's talk about a film.", { zh: "告诉他这个消息。我们聊聊一部电影吧。", word: "him news film" });
      k.act(me, "point", S.at - 1.2, 1.4, { at: [600, 300] });
      k.badge("✂️", 760, 108);
      k.wait(.6);
      D.wipe();

      // ───── 镜头 3 · 更多例子 ─────
      D.step(3); D.shot();
      N("更多例子：", "说「谢谢」用 say；老师告诉我们一件事用 tell；聊一部电影用 talk about。");
      T("Say \"Thank you\".", 60, 150, go(.8), .8, { size: 22, color: C.blue, weight: 900, font: M });
      sayAt("Say thank you.", { zh: "说谢谢。", word: "thank you" });
      T("The teacher tells us the news.", 60, 210, go(1), 1, { size: 22, color: C.ink, weight: 900, font: M });
      sayAt("The teacher tells us the news.", { zh: "老师告诉我们这个消息。", word: "The teacher tells us news" });
      T("Let's talk about the film.", 60, 270, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      sayAt("Let's talk about the film.", { zh: "我们聊聊这部电影吧。", word: "Let's about film" });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "say 说话的内容，speak 说语言，talk 是聊天，tell 告诉人！");
      T("say 说内容　speak 说语言　talk 聊聊天　tell 告诉人", 60, 340, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.badge("💡", 60 + k.estW("say 说内容　speak 说语言　talk 聊聊天　tell 告诉人", 20) + 10, 336);
      k.wait(.8);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "「你会说法语吗？」该用哪个词？先想 3 秒！（法语 = French）");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 你会说法语吗？= Can you ____ French?", 36, 470, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 520, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "说一种语言用 speak：Can you speak French?");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("Can you speak French?", 36, 512, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Can you speak French?", { zh: "你会说法语吗？", word: "French", egg: ["French"] });
      D.hold(2.5);

      k.quoteCard({ insight: "中文一个「说」，英语看说什么挑词：\n说出的话 say，说语言 speak，\n聊天 talk，告诉某人 tell。", rhyme: "say 说内容，speak 说语言，\ntalk 聊聊天，tell 告诉人！", hlLines: 2, foot: "🔀 中英对照 · 一字多词" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    r2skip: ["speak hello　say English", "speak hello say English", "Can you ____ French?"],   // 照搬的错误搭配（打红叉）；预测题填空句（揭晓后整句朗读）
    actionWords: [
      { word: "say", act: "讲解员向朋友挥手打招呼（wave）" },
    ],
    terms: [
      ["say", "说出具体的话：say hello、say \"Thank you\"。"],
      ["speak", "说一种语言：speak English、speak Chinese。"],
      ["talk", "和人聊天、谈话：talk with a friend、talk about a film。"],
      ["tell", "告诉某人：tell me a story、tell him the news（后面先跟人）。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ✂️ 简化说法（这四个词还有别的用法）· ⚠️ 有要注意的地方 · 📜 有出处的历史。"],
    ],
  },
];
