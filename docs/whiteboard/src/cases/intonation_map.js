// ==================== 🎵 王炸实验室 · 语调地图（intonation_map）（v2 + 讲解员）====================
// 决策 5（MASTER_DESIGN）：实验室新页签「语调地图」：升调、降调、句重音。
// 原页签「⑥ 名动重音与弱读连读机」stress_rhythm 整体并入本页签的「🎯 重音与弱读」区（原正文、原白板幕、原词卡逐字保留，见 lab/STRESS_RHYTHM_MERGE.md）。
// 本文件是「🎵 语调」区的两幕。出处 lab/SOURCES.md ③。徽章：✂️「大多数情况」的规律（语调还受情绪影响）；💡 节拍比喻。配色只用 V3 四色。
WB_LAB.intonation_map = [
  // ───────────────────────── 第 1 幕：升调与降调 ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      // 句尾的音高箭头：up = 升调 ↗，否则降调 ↘
      const tune = (x, y, up, col) => {
        const d = up ? `M${x},${y + 12} Q${x + 18},${y + 10} ${x + 34},${y - 12} M${x + 24},${y - 12} L${x + 34},${y - 12} L${x + 33},${y - 2}` : `M${x},${y - 12} Q${x + 18},${y - 10} ${x + 34},${y + 12} M${x + 24},${y + 12} L${x + 34},${y + 12} L${x + 33},${y + 2}`;
        P(d, go(.5), .5, { color: col, w: 3.2 });
      };
      N("", "这一幕：同样几个词，句尾声音往上走还是往下走，意思就不一样。画一张语调地图！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "升调与降调", sub: "🎵 语调地图 ①", badges: ["✂️", "💡"], steps: ["① 降调", "② 升调", "③ 选择", "④ 列举", "⑤ 口诀", "🔮 预测"] });
      N("语调：", "说话时声音的高低起伏，像唱歌的旋律。中文每个字有声调，英语主要是整句话的语调。");
      k.wait(.3);

      // ───── 降调 ─────
      D.step(0); D.shot();
      N("降调 ↘：", "说完一件事、或者用 what、where 这类词提问，句尾声音往下落。");
      k.head("降调 ↘：说完了 / 特殊疑问句", 60, 140, C.blue, "start", 22);
      T("I like apples.", 60, 186, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M }); tune(280, 180, false, C.blue);
      T("What's your name?", 60, 230, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M }); tune(310, 224, false, C.blue);
      T("Where do you live?", 60, 274, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M }); tune(330, 268, false, C.blue);
      sayAt("I like apples.", { zh: "我喜欢苹果。", word: "like apples" });
      sayAt("What's your name? Where do you live?", { zh: "你叫什么名字？你住在哪里？", word: "what what's your name where do you live" });
      k.act(me, "nod", S.at - 1.4, 1);
      k.wait(.3);

      // ───── 升调 ─────
      D.step(1);
      N("升调 ↗：", "用 Yes / No 回答的问题（一般疑问句），句尾声音往上扬。");
      k.head("升调 ↗：一般疑问句（答 Yes / No）", 60, 330, C.red, "start", 22);
      T("Are you OK?", 60, 374, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M }); tune(230, 368, true, C.red);
      T("Do you like to jump?", 60, 418, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M }); tune(340, 412, true, C.red);
      sayAt("Are you OK?", { zh: "你还好吗？", word: "are you OK yes no" });
      sayAt("Yes or no?", { zh: "是还是不是？", word: "yes no" });
      const syJump = sayAt("Do you like to jump?", { zh: "你喜欢跳吗？", word: "to jump" });
      k.act(me, "jump", syJump.t + syJump.dur * .5, 1, { words: ["jump"] });
      k.badge("✂️", 60 + k.estW("升调 ↗：一般疑问句（答 Yes / No）", 22) + 10, 326, { label: "大多数" });
      N("✂️ 大多数情况：", "这是最常见的规律；惊讶、生气的时候，语调也会变。");
      k.wait(.4);
      D.wipe();

      // ───── 选择疑问句 ─────
      D.step(2); D.shot();
      N("选择疑问句：", "让人二选一：前面升 ↗，最后一个降 ↘。");
      k.head("选择：前升 ↗ 后降 ↘", 60, 140, C.green, "start", 22);
      T("Tea ↗ or coffee ↘?", 60, 186, go(.9), .9, { size: 24, color: C.ink, weight: 900, font: M });
      sayAt("Tea or coffee?", { zh: "喝茶还是咖啡？", word: "tea or coffee" });
      sayAt("Is it a cat or a dog?", { zh: "它是猫还是狗？", word: "is it a cat dog" });
      T("Is it a cat or a dog?", 60, 230, go(.7), .7, { size: 22, color: C.ink, weight: 900, font: M });
      k.wait(.3);

      // ───── 列举 ─────
      D.step(3);
      N("列举：", "一样一样地数：前面每个都升 ↗，最后一个降 ↘，告诉别人「数完了」。");
      k.head("列举：升 ↗ 升 ↗ … 最后降 ↘", 60, 300, C.green, "start", 22);
      T("Red ↗, yellow ↗ and blue ↘.", 60, 346, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      const syList = sayAt("Red, yellow and blue.", { zh: "红、黄、蓝。", word: "red yellow and blue" });
      k.act(me, "point", syList.t, Math.max(1.2, syList.dur), { at: [300, 340] });
      sayAt("I have a pen, a ruler and a book.", { zh: "我有一支钢笔、一把尺子和一本书。", word: "have pen ruler book" });
      k.wait(.4);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "说完降，Yes / No 升；二选一，前升后降；数东西，最后才降。");
      P(k.roughRect(40, 384, 800, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("说完降 ↘ · Yes/No 升 ↗ · 二选一前升后降 · 数东西最后降", 60, 416, go(1.2), 1.2, { size: 19, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.5);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "Can you swim? 句尾升还是降？先想 3 秒！");
      P(k.roughRect(16, 448, 824, 84), go(.6), .6, { color: C.green, w: 2.5 });
      F(k.rectD(16, 448, 824, 84), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 Can you swim? 升 ↗ 还是降 ↘？", 36, 482, go(.9), .9, { size: 20, color: C.ink, weight: 900 });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "升调！它要你回答 Yes 或 No。");
      T("升调 ↗：答 Yes / No 的问题", 36, 516, go(.8), .8, { size: 20, color: C.green, weight: 900 });
      k.act(me, "cheer", S.at - .3, 1.3); k.sfx("ding", S.at + .2);
      sayAt("Can you swim? Yes, I can.", { zh: "你会游泳吗？会，我会。", word: "can you swim yes I can" });
      D.hold(2);

      k.quoteCard({ insight: "句尾往下落 ↘：说完了、问 what / where。\n句尾往上扬 ↗：问 Yes / No。", rhyme: "说完降，Yes/No 升，\n二选一，前升后降！", hlLines: 2, foot: "🎵 语调地图 · 升调与降调" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "jump", act: "讲解员读到 jump 时跳起来（jump）" },
    ],
    terms: [
      ["语调", "整句话声音的高低起伏。英语句尾往上扬叫升调 ↗，往下落叫降调 ↘。"],
      ["降调 ↘", "陈述句、特殊疑问句（what、where、who 开头）大多用降调。"],
      ["升调 ↗", "一般疑问句（用 Yes / No 回答）大多用升调。"],
      ["选择疑问句", "A or B?：前面升，最后降。"],
      ["可信度徽章", "✂️ 大多数情况的规律（情绪不同语调也会变）· 💡 比喻 · 📜 有出处 · ⚠️ 要注意。"],
    ],
  },

  // ───────────────────────── 第 2 幕：句重音（实词重、虚词轻） ─────────────────────────
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      const beat = (x, y, n) => { for (let i = 0; i < n; i++) { const d = k.ellipse(x + i * 26, y, 8, 8); P(d, go(.15), .15, { color: C.red, w: 2 }); F(d, go(.05, 0), { color: C.red, op: .9 }); } };
      N("", "这一幕：一句英语里，哪些词读得重、哪些词读得轻？像打鼓一样找节拍！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "句重音：实词重、虚词轻", sub: "🎵 语调地图 ②", badges: ["💡", "✂️"], steps: ["① 实词虚词", "② 打节拍", "③ 换重音", "④ 弱读", "⑤ 口诀", "🔮 预测"] });
      k.wait(.3);

      // ───── 实词 / 虚词 ─────
      D.step(0); D.shot();
      N("实词：", "带着主要意思的词：名词、动词、形容词、副词，比如 want、go、park。它们读得重。");
      N("虚词：", "帮忙连接的小词：a、the、to、and、of……它们读得轻、读得快。");
      T("I WANT to GO to the PARK.", 60, 170, go(1), 1, { size: 26, color: C.ink, weight: 900, font: M });
      k.hlText("WANT", 60 + k.estW("I ", 26) * 1.2, 170, 26, { color: C.hlYellow });
      T("大写 = 重读的实词；小写 = 轻轻带过的虚词", 60, 210, go(.8), .8, { size: 17, color: C.grey, weight: 700 });
      sayAt("I want to go to the park.", { zh: "我想去公园。", word: "I want go park to the" });
      k.act(me, "point", S.at - 1.6, 1.2, { at: [300, 166] });
      k.wait(.3);

      // ───── 打节拍 ─────
      D.step(1);
      N("💡 打节拍：", "重读的词像鼓点，一拍一拍；中间的小词被挤得又轻又快。");
      T("CATS　EAT　FISH.", 60, 280, go(.8), .8, { size: 24, color: C.blue, weight: 900, font: M }); beat(490, 274, 3);
      T("The CATS will EAT the FISH.", 60, 324, go(.9), .9, { size: 24, color: C.blue, weight: 900, font: M }); beat(490, 318, 3);
      k.badge("✂️", 580, 296, { label: "简化" });
      N("✂️ 简化说法：", "两句都是 3 个鼓点，第二句多出来的小词要说得快一些。真实说话不会完全一样长。");
      sayAt("Cats eat fish. The cats will eat the fish.", { zh: "猫吃鱼。猫会吃鱼。", word: "cats eat fish will" });
      k.act(me, "nod", S.at - 2, .8); k.act(me, "nod", S.at - 1, .8);
      k.wait(.4);
      D.wipe();

      // ───── 换重音换意思 ─────
      D.step(2); D.shot();
      N("换重音：", "想强调哪个词，就把哪个词读重——意思的焦点跟着变。");
      T("I like the RED one.（不是蓝的）", 60, 160, go(.9), .9, { size: 22, color: C.ink, weight: 900, font: M });
      T("I LIKE the red one.（不是讨厌）", 60, 204, go(.9), .9, { size: 22, color: C.ink, weight: 900, font: M });
      sayAt("I like the red one.", { zh: "我喜欢红色的那个。", word: "like red one" });
      k.act(me, "holdCard", S.at - 1.6, 1.6, { prop: k.prop("card", 0, 0, { text: "RED", hidden: true }) });
      k.wait(.3);

      // ───── 弱读 ─────
      D.step(3);
      N("弱读：", "虚词读轻时，元音常常变成最懒的 /ə/：to 读成 /tə/，and 读成 /ən/。");
      T("to /tə/ · and /ən/ · a /ə/ · of /əv/", 60, 268, go(1), 1, { size: 21, color: C.green, weight: 900, font: M });
      sayAt("Bread and butter. A cup of tea.", { zh: "面包和黄油。一杯茶。", word: "bread and butter a cup of tea" });
      T("👉 更多名前动后、弱读连读：点页签上方「🎯 重音与弱读」", 60, 320, go(1), 1, { size: 18, color: C.blue, weight: 900 });
      k.wait(.4);

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "实词重如鼓，虚词轻如风；想强调哪个，哪个就加重。");
      P(k.roughRect(40, 360, 800, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("实词重如鼓，虚词轻如风；想强调哪个，哪个就加重。", 60, 392, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.4);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "I want a cup of tea. 哪几个词读重？先想 3 秒！");
      P(k.roughRect(16, 428, 824, 104), go(.6), .6, { color: C.green, w: 2.5 });
      F(k.rectD(16, 428, 824, 104), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 I want a cup of tea. 重读哪几个？", 36, 466, go(.9), .9, { size: 20, color: C.ink, weight: 900 });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "want、cup、tea 三个实词读重；a、of 轻轻带过。");
      T("I WANT a CUP of TEA.", 36, 506, go(.8), .8, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", S.at - .3, 1.3); k.sfx("ding", S.at + .2);
      sayAt("I want a cup of tea.", { zh: "我想要一杯茶。", word: "want cup tea" });
      D.hold(2);

      k.quoteCard({ insight: "实词（名、动、形、副）读重，像鼓点；\n虚词（a、the、to、of）读轻，常弱成 /ə/。", rhyme: "实词重如鼓，\n虚词轻如风！", hlLines: 2, foot: "🎵 语调地图 · 句重音" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    terms: [
      ["句重音", "一句话里读得重的词。一般是实词：名词、动词、形容词、副词。"],
      ["实词", "带着主要意思的词：park、go、red、quickly。"],
      ["虚词", "帮忙连接的小词：a、the、to、and、of、will……"],
      ["弱读", "虚词读轻时元音变成 /ə/：to /tə/、and /ən/。"],
      ["节拍", "重读的词像鼓点（💡 比喻）；✂️ 真实说话里每拍长短不会完全一样。"],
    ],
  },

  // ───────────────────────── 第 3 幕：合成词重音（BLACKboard vs black BOARD）─────────────────────────
  // 决策 6「合成词重音」：做在语调地图旁边（本页签第 3 幕）。原 stress_rhythm 没有合成词条目，无需搬迁。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：blackboard 和 black board，写法差一个空格，重音一换，意思就变了！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "合成词重音", sub: "🎵 语调地图 ③", badges: ["✂️", "💡"], steps: ["① 对比", "② 规律", "③ 更多例子", "④ 句子里", "⑤ 口诀", "🔮 预测"] });
      k.wait(.3);

      D.step(0); D.shot();
      N("合成词：", "两个词拼成一个新词，表示一样新东西，比如 blackboard（黑板）。");
      T("BLACKboard　黑板（教室里写字的板）", 60, 160, go(1), 1, { size: 24, color: C.blue, weight: 900, font: M });
      T("black BOARD　一块黑色的木板", 60, 210, go(1), 1, { size: 24, color: C.red, weight: 900, font: M });
      sayAt("Blackboard. A black board.", { zh: "黑板。一块黑色的板。", word: "blackboard black board a" });
      k.act(me, "point", S.at - 1.6, 1.4, { at: [200, 156] });
      k.wait(.3);

      D.step(1);
      N("✂️ 规律：", "合成名词重音多在前面一个词；「形容词 + 名词」的普通短语，重音落在后面的名词上。");
      T("合成名词：重音在前　　形容词 + 名词：重音在后", 60, 270, go(1), 1, { size: 20, color: C.green, weight: 900 });
      k.badge("✂️", 60 + k.estW("合成名词：重音在前　　形容词 + 名词：重音在后", 20) + 10, 266, { label: "大多数" });
      k.wait(.4);
      D.wipe();

      D.step(2); D.shot();
      N("更多例子：", "greenhouse 温室 / green house 绿色的房子；hotdog 热狗 / hot dog 很热的狗。");
      T("GREENhouse 温室　·　green HOUSE 绿房子", 60, 150, go(1), 1, { size: 21, color: C.ink, weight: 900, font: M });
      T("HOTdog 热狗　·　hot DOG 很热的狗", 60, 192, go(1), 1, { size: 21, color: C.ink, weight: 900, font: M });
      T("WHITE House 白宫　·　white HOUSE 白色的房子", 60, 234, go(1), 1, { size: 21, color: C.ink, weight: 900, font: M });
      sayAt("Greenhouse, green house. Hotdog, hot dog.", { zh: "温室，绿色的房子。热狗，很热的狗。", word: "greenhouse green house hotdog hot dog" });
      sayAt("The White House is a white house.", { zh: "白宫是一座白色的房子。", word: "white house the is" });
      k.act(me, "surprised", S.at - 1.2, 1);
      k.wait(.3);

      D.step(3);
      N("句子里：", "读对重音，别人才知道你说的是哪一个。");
      T("Look at the BLACKboard, please.", 60, 300, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      const syLook = sayAt("Look at the blackboard, please.", { zh: "请看黑板。", word: "look at please" });
      k.act(me, "point", syLook.t, Math.max(1.2, syLook.dur), { at: [300, 296], words: ["look"] });
      k.wait(.3);

      D.step(4);
      N("口诀：", "合成名词前面重，普通短语后面重。");
      P(k.roughRect(40, 340, 800, 50), go(.6), .6, { color: C.blue, w: 2.4 });
      T("合成名词前面重，普通短语后面重。", 60, 372, go(.9), .9, { size: 21, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.4);

      D.step(5);
      N("预测：", "football（足球）的重音在哪儿？先想 3 秒！");
      P(k.roughRect(16, 420, 824, 112), go(.6), .6, { color: C.green, w: 2.5 });
      F(k.rectD(16, 420, 824, 112), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 football 足球：重音在前还是在后？", 36, 460, go(.9), .9, { size: 20, color: C.ink, weight: 900 });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "合成名词，重音在前：FOOTball。");
      T("FOOTball（合成名词，前面重）", 36, 502, go(.8), .8, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", S.at - .3, 1.3); k.sfx("ding", S.at + .2);
      sayAt("Football. I play football.", { zh: "足球。我踢足球。", word: "football I play" });
      D.hold(2);

      k.quoteCard({ insight: "两个词拼成新东西（合成名词）：重音在前；\n形容词 + 名词：重音在后。", rhyme: "合成名词前面重，\n普通短语后面重！", hlLines: 2, foot: "🎵 语调地图 · 合成词重音" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "look", act: "讲解员读 Look at the blackboard 时指向黑板（point）" },
    ],
    terms: [
      ["合成词", "两个词拼成的新词：blackboard、football、greenhouse。"],
      ["合成名词重音", "✂️ 大多数合成名词重音在前一个词：BLACKboard、FOOTball。"],
      ["短语重音", "形容词 + 名词的普通短语，重音在后面的名词：black BOARD。"],
    ],
  },
];
