// ==================== 🔑 王炸实验室 · 短语动词总钥匙（phrasal_key）（v2 + 讲解员）====================
// 决策 4（MASTER_DESIGN）：F 小品词方向义（up / down / out / off / on / back）+ O 核心义动词（get / take / make / put）合成新页签；
// 旧页签「① 万能动词 × 向量转盘」verb_matrix 并入本页签的「🎬 组合区」：6 × 6 = 36 个 VV 卡通动画、组合表、朗读按钮原样保留（不改成白板）。
// 本文件是页签上方「📖 白板课」的两幕。徽章：方向画面是 💡 记忆联想；「一个小品词一个核心方向」是 ✂️ 简化说法（真实短语还有很多引申义）。
// 配色只用 V3 四色。
WB_LAB.phrasal_key = [
  // ───────────────────────── 第 1 幕：小品词方向义 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：get up、sit down、go out、come back……短语动词那么多，怎么记？先认识 6 个「方向小尾巴」！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "小品词方向义", sub: "🔑 短语动词总钥匙 ①", badges: ["💡", "✂️"], steps: ["① 什么是", "② up/down", "③ out/back", "④ on/off", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 动词 + 小尾巴 ─────
      D.step(0); D.shot();
      N("短语动词：", "一个动词后面跟一个小词，合起来当一个动词用，比如 sit down（坐下）。");
      T("sit", 120, 170, go(.5), .5, { size: 30, color: C.blue, weight: 900, font: M });
      T("+", 200, 170, go(.3), .3, { size: 30, color: C.grey, weight: 900 });
      T("down", 240, 170, go(.5), .5, { size: 30, color: C.red, weight: 900, font: M });
      T("= sit down 坐下", 350, 170, go(.6), .6, { size: 26, color: C.green, weight: 900 });
      N("小品词：", "跟在动词后面的小词：up、down、out、off、on、back……它们大多原本表示方向。");
      T("小品词 = 方向小尾巴", 120, 230, go(.8), .8, { size: 22, color: C.red, weight: 900 });
      k.badge("💡", 120 + k.estW("小品词 = 方向小尾巴", 22) + 10, 226, { label: "联想" });
      T("up · down · out · back · on · off", 120, 280, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      sayAt("Up, down, out, back, on, off.", { zh: "向上、向下、向外、回来、贴上、离开。", word: "up down out back on off" });
      k.act(me, "point", S.at - 2, 1.4, { at: [300, 276] });
      N("✂️ 简化说法：", "每个小尾巴先记一个核心方向；真实的短语还有不少引申意思，遇到再学。");
      k.wait(.5);
      D.wipe();

      // ───── 镜头 2 · up / down ─────
      D.step(1); D.shot();
      P(k.roughRect(862, 474, 60, 64), go(.5), .5, { color: C.ink, w: 2.2 });   // 讲解员要坐的小凳子
      N("up：", "向上；也表示「做到头、做完」。");
      k.head("up ⬆ 向上 / 做完", 60, 140, C.blue, "start", 22);
      T("stand up 站起来 · look up 抬头看 · eat up 吃光", 60, 176, go(1.1), 1.1, { size: 19, color: C.ink, weight: 700 });
      N("down：", "向下；也表示「减弱、写下来固定住」。");
      k.head("down ⬇ 向下 / 减弱", 60, 240, C.red, "start", 22);
      T("sit down 坐下 · write down 写下 · slow down 慢下来", 60, 276, go(1.1), 1.1, { size: 19, color: C.ink, weight: 700 });
      const sySit = sayAt("Sit down, please.", { zh: "请坐下。", word: "sit down" });
      k.act(me, "sit", sySit.t, sySit.dur + 1.2, { words: ["sit down"] });
      const syStand = sayAt("Stand up, please.", { zh: "请站起来。", word: "stand up" });
      k.act(me, "jump", syStand.t, Math.max(1, syStand.dur), { words: ["stand up"] });
      const syLook = sayAt("Look up! A bird!", { zh: "抬头看！一只鸟！", word: "look up bird" });
      k.act(me, "point", syLook.t, Math.max(1.2, syLook.dur), { at: [880, 130], words: ["look up"] });
      sayAt("Eat up your rice. Write down the words. Slow down!", { zh: "把饭吃光。把这些单词写下来。慢一点！", word: "eat up write down slow down" });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 3 · out / back ─────
      D.step(2); D.shot();
      N("out：", "从里面到外面；也表示「出现、弄清楚、用完」。");
      k.head("out ➡ 向外 / 出现 / 用完", 60, 140, C.blue, "start", 22);
      T("go out 出去 · find out 弄清楚 · run out 用完", 60, 176, go(1.1), 1.1, { size: 19, color: C.ink, weight: 700 });
      N("back：", "回到原来的地方或主人那里。");
      k.head("back ↩ 回来 / 还回去", 60, 240, C.red, "start", 22);
      T("come back 回来 · give back 还回去 · call back 回电话", 60, 276, go(1.1), 1.1, { size: 19, color: C.ink, weight: 700 });
      const syOut = sayAt("Let's go out and play.", { zh: "我们出去玩吧。", word: "go out" });
      k.act(me, "walk", syOut.t, Math.max(1.4, syOut.dur), { to: 1120, words: ["go out"] });
      const syBack = sayAt("Come back soon!", { zh: "早点回来！", word: "come back" });
      k.act(me, "walk", syBack.t, Math.max(1.4, syBack.dur), { to: 892, words: ["come back"] });
      sayAt("Find out the answer. We run out of milk. Give back my book. Call back later.", { zh: "找出答案。我们的牛奶喝完了。把我的书还回来。稍后回电话。", word: "find out run out give back call back" });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 4 · on / off ─────
      D.step(3); D.shot();
      N("on：", "贴在表面上、接通；也表示「继续下去」。");
      k.head("on 📎 贴上 / 接通 / 继续", 60, 140, C.blue, "start", 22);
      T("put on 穿上 · turn on 打开（电器）· go on 继续", 60, 176, go(1.1), 1.1, { size: 19, color: C.ink, weight: 700 });
      N("off：", "离开表面、断开。");
      k.head("off ✂ 离开 / 断开", 60, 240, C.red, "start", 22);
      T("take off 脱下；起飞 · turn off 关掉 · get off 下车", 60, 276, go(1.1), 1.1, { size: 19, color: C.ink, weight: 700 });
      const cOn = k.prop("card", 0, 0, { text: "ON", hidden: true }), cOff = k.prop("card", 0, 0, { text: "OFF", hidden: true });
      const syOn = sayAt("Turn on the light. Put on your coat. Go on!", { zh: "开灯。穿上外套。继续！", word: "turn on put on go on light coat" });
      k.act(me, "holdCard", syOn.t, Math.max(1.6, syOn.dur), { prop: cOn });
      const syOff = sayAt("Turn off the TV. Take off your shoes. Get off the bus.", { zh: "关掉电视。脱下鞋子。下公交车。", word: "turn off take off get off TV shoes bus" });
      k.act(me, "holdCard", syOff.t, Math.max(1.6, syOff.dur), { prop: cOff });
      T("on ↔ off：一贴一离，正好相反", 60, 340, go(.9), .9, { size: 20, color: C.green, weight: 900 });
      k.wait(.5);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "up 上完，down 下减，out 出现，back 回还，on 贴续，off 离断！");
      P(k.roughRect(40, 372, 800, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("up 上完 · down 下减 · out 出现 · back 回还 · on 贴续 · off 离断", 60, 404, go(1.2), 1.2, { size: 19, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.5);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "没学过 turn down 也能猜：down 是「减弱」，turn down the music 是什么意思？先想 3 秒！");
      P(k.roughRect(16, 440, 824, 92), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 440, 824, 92), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 turn down the music = ？", 36, 478, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 330, 482, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "把音乐调小声！down 让音量「往下走」。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("把音乐调小声（音量往下走）", 36, 516, go(1), 1, { size: 21, color: C.green, weight: 900 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Please turn down the music.", { zh: "请把音乐调小声。", word: "turn down music the" });
      D.hold(2);

      k.quoteCard({ insight: "短语动词 = 动词 + 方向小尾巴。\n先认方向，意思就猜得出。", rhyme: "up 上完，down 下减，\nout 出现，back 回还，on 贴续，off 离断！", hlLines: 2, foot: "🔑 短语动词总钥匙 · 小品词方向义" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "sit down", act: "讲解员坐到小凳子上（sit）" },
      { word: "stand up", act: "讲解员从凳子上蹦起来（jump）" },
      { word: "look up", act: "讲解员抬手指向天上的方向（point）" },
      { word: "go out", act: "讲解员走出画面（walk）" },
      { word: "come back", act: "讲解员走回画面（walk）" },
    ],
    terms: [
      ["短语动词", "动词 + 小词，合起来当一个动词用：sit down、get up、take off。"],
      ["小品词", "跟在动词后面的小词：up、down、out、off、on、back、in、away……大多原本表示方向。"],
      ["方向义", "小品词最基本的意思是方向：up 向上、down 向下、out 向外、back 回来、on 贴上、off 离开。"],
      ["引申义", "从方向「借」出来的意思：up 做完（eat up）、down 减弱（slow down）、out 用完（run out）、on 继续（go on）。"],
      ["可信度徽章", "💡 记忆联想 · ✂️ 简化说法（一个小品词先记一个核心方向）· 📜 有出处的历史 · ⚠️ 有要注意的地方。"],
    ],
  },

  // ───────────────────────── 第 2 幕：核心动词 + 方向 = 短语 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：get、take、make、put 这 4 个小动词，配上方向小尾巴，能拼出一大堆短语！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "核心动词 + 方向 = 短语", sub: "🔑 短语动词总钥匙 ②", badges: ["💡", "✂️"], steps: ["① 公式", "② take/put", "③ get", "④ make", "⑤ 组合区", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · 公式 ─────
      D.step(0); D.shot();
      N("核心义：", "一个词最中心、最基本的意思。get、take、make、put 意思很多，但都从一个核心画面长出来。");
      T("核心义 + 方向义 = 短语义", 60, 160, go(1), 1, { size: 28, color: C.ink, weight: 900 });
      k.hlText("核心义", 60, 160, 28, { color: C.hlYellow });
      T("take（拿走）+ off（离开）= take off 拿掉、脱下", 60, 220, go(1.2), 1.2, { size: 20, color: C.blue, weight: 900 });
      k.badge("💡", 60 + k.estW("核心义 + 方向义 = 短语义", 28) + 12, 156, { label: "联想" });
      k.act(me, "point", S.at - 1.6, 1.4, { at: [300, 156] });
      k.wait(.5);
      D.wipe();

      // ───── 镜头 2 · take / put ─────
      D.step(1); D.shot();
      N("take：", "核心画面是「抓住、拿走」。");
      k.head("take ✋ 拿走", 60, 140, C.blue, "start", 22);
      T("take off 脱下；起飞 · take out 拿出来", 60, 176, go(1), 1, { size: 19, color: C.ink, weight: 700 });
      N("put：", "核心画面是「放到某个位置」。");
      k.head("put 🫳 放到位置", 60, 240, C.red, "start", 22);
      T("put on 穿上 · put down 放下 · put away 收起来", 60, 276, go(1), 1, { size: 19, color: C.ink, weight: 700 });
      const box = k.prop("box", 760, 470, { s: .8 });
      const syTake = sayAt("Take out your book. The plane takes off.", { zh: "把书拿出来。飞机起飞了。", word: "take out take off plane takes off" });
      k.act(me, "walk", syTake.t - .8, 1, { to: 800 });
      k.act(me, "take", syTake.t + .3, Math.max(1.2, syTake.dur - .3), { prop: box, words: ["take out"] });
      const syPut = sayAt("Put down your bag. Put away your toys. Put on your hat.", { zh: "放下书包。把玩具收起来。戴上帽子。", word: "put down put away put on bag toys hat" });
      k.act(me, "put", syPut.t, Math.max(1.4, syPut.dur * .5), { prop: box, words: ["put down"] });
      k.act(me, "walk", S.at + .1, 1, { to: 892 });
      k.wait(1);
      D.wipe();

      // ───── 镜头 3 · get ─────
      D.step(2); D.shot();
      N("get：", "核心画面是「进入一个新位置或新状态」。");
      k.head("get 🧲 进入新位置 / 新状态", 60, 140, C.blue, "start", 22);
      T("get up 起床 · get on 上车 · get off 下车 · get back 回来", 60, 176, go(1.2), 1.2, { size: 19, color: C.ink, weight: 700 });
      P(k.roughRect(862, 474, 60, 64), go(.4), .4, { color: C.ink, w: 2.2 });   // 小凳子（当床边）
      const sySleep = sayAt("I get up at seven.", { zh: "我七点起床。", word: "get up seven" });
      k.act(me, "sit", sySleep.t - 1.6, 1.6);
      k.act(me, "jump", sySleep.t, Math.max(1, sySleep.dur), { words: ["get up"] });
      sayAt("Get on the bus. Get off the bus. I get back home at five.", { zh: "上公交车。下公交车。我五点回到家。", word: "get on get off get back bus home five" });
      T("get + 方向 = 让自己「到」那个方向去", 60, 240, go(1), 1, { size: 20, color: C.green, weight: 900 });
      k.wait(.5);
      D.wipe();

      // ───── 镜头 4 · make ─────
      D.step(3); D.shot();
      N("make：", "核心画面是「做出来、让东西出现」。");
      k.head("make 🛠 做出来", 60, 140, C.blue, "start", 22);
      T("make up a story 编故事 · make a cake 做蛋糕", 60, 176, go(1), 1, { size: 19, color: C.ink, weight: 700 });
      N("✂️ 注意：", "make up 还有「化妆」「和好」等意思，小学先记「编出来」。");
      k.badge("✂️", 60 + k.estW("make up a story 编故事 · make a cake 做蛋糕", 19) * 1.05 + 12, 172, { label: "简化" });
      const syMake = sayAt("Let's make up a story!", { zh: "我们来编个故事吧！", word: "make up story" });
      k.act(me, "think", syMake.t, Math.max(1.4, syMake.dur), { words: ["make up"] });
      sayAt("Mum and I make a cake.", { zh: "妈妈和我做蛋糕。", word: "make a cake mum" });
      k.wait(.5);
      D.wipe();

      // ───── 镜头 5 · 去组合区 ─────
      D.step(4); D.shot();
      N("组合区：", "下面的「🎬 组合区」有 6 个动词 × 6 个方向 = 36 个动画：take、put、get、turn、look、give 配 on、off、up、down、in、out，点一下就演给你看。");
      T("6 个动词 × 6 个方向 = 36 个动画", 60, 160, go(1), 1, { size: 26, color: C.ink, weight: 900 });
      T("take · put · get · turn · look · give", 60, 210, go(1), 1, { size: 21, color: C.blue, weight: 900, font: M });
      T("on · off · up · down · in · out", 60, 250, go(1), 1, { size: 21, color: C.red, weight: 900, font: M });
      sayAt("Take, put, get, turn, look, give. On, off, up, down, in, out.", { zh: "拿、放、得到、转、看、给。贴上、离开、向上、向下、向里、向外。", word: "take put get turn look give in" });
      k.act(me, "point", S.at - 2, 1.6, { at: [300, 300] });
      T("👇 点页签上方「🎬 组合区」试试！", 60, 310, go(.8), .8, { size: 20, color: C.green, weight: 900 });
      k.wait(.5);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "put 是「放」，out 是「向外」——消防员 put out the fire 是在做什么？先想 3 秒！");
      P(k.roughRect(16, 440, 824, 92), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 440, 824, 92), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 The firemen put out the fire. = ？", 36, 478, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 470, 482, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "把火「弄出去、弄没了」——扑灭大火！");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      T("消防员扑灭了大火。", 36, 516, go(1), 1, { size: 21, color: C.green, weight: 900 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("The firemen put out the fire.", { zh: "消防员扑灭了大火。", word: "the firemen put out fire" });
      D.hold(2);

      k.quoteCard({ insight: "get 进入、take 拿走、make 做出、put 放置——\n核心义 + 方向义 = 短语义。", rhyme: "动词定动作，\n尾巴定方向！", hlLines: 2, foot: "🔑 短语动词总钥匙 · 核心动词" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "take out", act: "讲解员走到箱子旁把箱子拿起来（take）" },
      { word: "put down", act: "讲解员把箱子放下（put）" },
      { word: "get up", act: "讲解员从凳子上蹦起来（jump）" },
      { word: "make up", act: "讲解员歪头想故事（think）" },
    ],
    terms: [
      ["核心义", "一个词最中心、最基本的意思，其他意思都从它长出来。"],
      ["get", "核心：进入新位置 / 新状态。get up、get on、get off、get back。"],
      ["take", "核心：抓住、拿走。take off、take out。"],
      ["make", "核心：做出来、让东西出现。make a cake、make up a story。"],
      ["put", "核心：放到某个位置。put on、put down、put away、put out。"],
    ],
  },
];
