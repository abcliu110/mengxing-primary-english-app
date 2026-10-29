// ==================== 第一性原理 ⑥ 焦点先行与镜头缩放律（fp_zoom_focus）====================
// 4 幕 = FIRST_PRINCIPLES_DB[5].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
// v2 升级（2026-10-30 起，决策 24）：第 2 幕已升引擎 v2 + 讲解员（第 1 幕是搬到 ze_modifier 的占位幕，不升级）；升级前整份文件原样保存在 cases/fp_zoom_focus_classic.js。依赖 wo_props + fp_props。
WB_LAB.fp_zoom_focus = [
  // ───────── 6-1 长修饰放名词后面：先立树干，后挂树枝 ─────────
  {
    // 2026-10-30：本幕已零丢失整幕搬到中英对照总枢 ze_modifier（清单 docs/whiteboard/zh_en_hub/INVENTORY_*.md，原内容见 cases/ze_modifier.js）。
    // 原理页这一幕显示「一句话 + 跳转」卡片（act.movedTo → fpMovedHtml），这里只留占位白板，保证幕序号不变；terms 是本原理全部幕共用的术语，保留。
    movedTo: "ze_modifier",
    build(k) {
      const { C, N, T, go } = k;
      N("", "这一幕已经搬到「🔀 中英对照总枢 · 修饰语位置」。");
      T("这一幕已搬到 🔀 中英对照总枢 · 修饰语位置", 40, 120, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      T("1 个词的修饰放名词前，2 个词以上的短语挂在名词后。", 40, 170, go(1.2), 1.2, { size: 16, color: C.grey, weight: 700 });
      k.wait(1);
    },
    terms: [
      ["修饰语", "说明「哪一个、什么样」的词或短语，比如 red、in blue。"],
      ["核心名词", "这句话真正在说的人或东西，比如 the boy in blue 里的 the boy。"],
      ["短语", "两个词以上组成的一小组，但还不是完整的句子，比如 in blue、under the tree。"],
      ["语序", "词在句子里排列的先后顺序。"],
      ["疑问词", "what、where、when、who、how 这类用来提问的词。"],
      ["感叹句", "表示强烈感情的句子，以 What 或 How 开头：What a clever boy!"],
    ],
  },
];
WB_LAB.fp_zoom_focus.push(
  // ───────── 6-2 疑问词抢句首（v2 + 讲解员，2026-10-30）─────────
  // 升级前原样保存在 cases/fp_zoom_focus_classic.js（R1 零丢失）。上（Where 跳句首）下（问句 / 感叹句套用）拆成两个镜头；紫 / 橙改 V3。
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), FP = FP_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：为什么英语的疑问词总是放在句子第一个？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "焦点抢头条", sub: "⑥ 焦点先行与镜头缩放律", badges: ["💡"], steps: ["① 中文顺序", "② Where 跳", "③ 问句", "④ 感叹句", "⑤ 口诀", "🔮 预测"] });
      k.wait(.4);

      // ───── 镜头 1 · Where 跳到句首 ─────
      D.step(0); D.shot();
      const z = k.zh("你周末打算去哪里？", 40, 132, 26);
      k.circle(z, 6, 7, C.red);
      T("中文：疑问词「哪里」在后面", 300, 132, go(.8), .8, { size: 15, color: C.grey, weight: 700 });
      k.wait(.4);
      N("疑问词：", "Where（哪里）、When（什么时候）、How（怎样）……是提问的焦点。");
      const cw = 15.6, X = n => 60 + n * cw, y = 230, st = { size: 26, weight: 900, font: M };
      const word = (w, n, color) => { const g = D.sub(); T(w, X(n), y, go(.4), .4, { ...st, color }); D.back(); return g; };
      const gYou = word("you", 0, C.ink), gAre = word("are", 4, C.blue), gBase = word("going this weekend", 8, C.ink), gWh = word("Where", 27, C.red);
      const gLab = D.sub(); T("按中文顺序排：", 60, 190, go(.5), .5, { size: 15, color: C.grey }); D.back();
      k.wait(.6);
      D.step(1);
      N("", "英语要第一秒就让人听清「问的是地点」：Where 跳到句首！");
      const t1 = go(2); k.fade(gLab, t1, .6, 0);
      k.arc(gWh, t1, 1.6, `M0,0 C${-9 * cw},-80 ${-18 * cw},-80 ${-27 * cw},0`); k.sfx("pop", t1 + 1.6);
      k.move(gBase, t1 + .3, 1.2, 6 * cw, 0);
      k.move(gYou, t1 + .3, 1.2, 10 * cw, 0);
      k.act(me, "surprised", t1 + .2, 1.2);
      N("", "助动词 / be 动词 are 也提上来，紧跟在疑问词后面。");
      k.move(gAre, go(1), 1, 2 * cw, 0);
      T("?", X(32), y, go(.3), .3, { ...st, color: C.ink });
      P(k.ellipse(X(2.5), y - 9, 56, 26), go(.5), .5, { color: C.red, w: 3 });
      T("焦点先出场", X(2.5), y + 40, go(.5), .5, { size: 15, color: C.red, weight: 900, anchor: "middle" });
      T("are 紧跟其后", X(6.5), y + 62, go(.5), .5, { size: 15, color: C.blue, weight: 900 });
      k.wait(.6);
      const syW = sayAt("Where are you going this weekend?", { zh: "你这个周末去哪里？", word: "Where" });
      k.act(me, "point", syW.t, Math.max(1.2, syW.dur), { at: [X(2.5), y - 9] });
      sayAt("You are going to the park this weekend.", { zh: "你这个周末要去公园。", word: "you are going weekend" });
      k.act(me, "walk", S.says[S.says.length - 1].t, 1.2, { to: 840, words: ["going"] });
      k.act(me, "walk", S.says[S.says.length - 1].t + 1.4, .9, { to: 892 });
      k.wait(.4);
      D.wipe();

      // ───── 镜头 2 · 套用：问句和感叹句 ─────
      D.step(2); D.shot();
      N("特殊疑问句：", "用疑问词开头、不能用 Yes / No 回答的问句。公式：疑问词 + 一般疑问句。");
      k.head("提问：焦点词第一个", 60, 140, C.blue, "start", 18);
      T("Where is my bag?", 60, 176, go(.6), .6, { size: 19, color: C.ink, weight: 900, font: M });
      T("When do you get up?", 60, 206, go(.6), .6, { size: 19, color: C.ink, weight: 900, font: M });
      T("How much is this shirt?", 60, 236, go(.7), .7, { size: 19, color: C.ink, weight: 900, font: M });
      const syUp = sayAt("When do you get up?", { zh: "你几点起床？" });
      k.act(me, "jump", syUp.t + syUp.dur * .4, 1, { words: ["get up"] });
      sayAt("Where is my bag?", { zh: "我的书包在哪里？", word: "is my bag" });
      sayAt("How much is this shirt?", { zh: "这件衬衫多少钱？", word: "How much shirt this" });
      sayAt("When do you get up? I get up at seven.", { zh: "你几点起床？我七点起床。", word: "When do get up" });
      D.step(3);
      N("感叹句：", "表示强烈感情的句子。被夸的那个词抢到最前面，后面的主谓可以省略。");
      k.head("感叹：被夸的词第一个", 60, 296, C.red, "start", 18);
      FP.parts([["What a clever boy ", C.ink], ["(he is)", C.grey], ["!", C.ink]], 60, 336, 19);
      FP.parts([["How fast ", C.ink], ["(he runs)", C.grey], ["!", C.ink]], 60, 372, 19);
      T("括号里的部分可以省略", 60, 402, go(.6), .6, { size: 14, color: C.grey });
      k.wait(.6);
      const syCl = sayAt("What a clever boy!", { zh: "多聪明的男孩啊！" });
      k.act(me, "cheer", syCl.t, Math.max(1, syCl.dur));
      const syRun = sayAt("What a clever boy he is! How fast he runs!", { zh: "他是多么聪明的男孩啊！他跑得多快啊！", word: "What a clever boy he fast runs" });
      k.act(me, "run", syRun.t + syRun.dur * .5, 1, { to: 830, words: ["runs"] });
      k.act(me, "walk", syRun.t + syRun.dur * .5 + 1.1, .8, { to: 892 });
      sayAt("Be. Is he a boy? Yes, he is. No, he isn't.", { zh: "be 动词。他是男孩吗？是的。不，不是。", word: "be Yes No" });

      // ───── 口诀 ─────
      D.step(4);
      N("口诀：", "焦点先出场。");
      P(k.roughRect(40, 440, 760, 44), go(.6), .6, { color: C.blue, w: 2.4 });
      T("口诀：焦点先出场。", 60, 470, go(1), 1, { size: 20, color: C.blue, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.6);
      D.wipe();

      // ───── 🔮 预测 ─────
      D.step(5); D.shot();
      N("预测：", "「你的猫在哪里？」英语里「哪里」应该放在哪？先想 3 秒！");
      P(k.roughRect(40, 150, 760, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 150, 760, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 你的猫在哪里？　→　___ is your cat?", 64, 200, go(1), 1, { size: 24, color: C.ink, weight: 900, font: M });
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "问的是地点，Where 抢头条。");
      const tRev = go(.3);
      T("Where is your cat? —— 焦点先出场", 64, 248, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("Where is your cat?", { zh: "你的猫在哪里？", word: "Where your cat" });
      D.hold(2);

      k.quoteCard({ insight: "最想问的、最想夸的词放第一个；\n问句里 be / 助动词紧跟其后", rhyme: "口诀：焦点先出场。", hlLines: 2, foot: "🧠 第一性原理 ⑥ 焦点先行与镜头缩放律" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.45);
    },
    actionWords: [
      { word: "going", act: "讲解员在读到「You are going to the park」时往前走（walk），再走回来" },
      { word: "get up", act: "讲解员在读到「When do you get up」时跳起来（jump）" },
      { word: "runs", act: "讲解员在读到「How fast he runs」时跑一小段（run）" },
    ],
    terms: [
      ["特殊疑问句", "用 what / where / when / how 等疑问词开头的问句，不能用 Yes / No 回答。"],
      ["可信度徽章", "💡 记忆方法（焦点先出场）：语法书叫「特殊疑问句 = 疑问词 + 一般疑问句」。"],
    ],
  },
);
WB_LAB.fp_zoom_focus.push(
  // ───────── 6-3 镜头从小拉到大 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：写地址和时间，英语和中文的顺序为什么正好相反？");
      k.header("⑥ 焦点先行与镜头缩放律", "镜头从小拉到大", true);
      N("", "中文像推镜头：先说最大的北京，再一步步推到 201 室。");
      T("中文：北京 → 星光学校 → 3 号楼 → 201 室", 510, 112, go(1.4), 1.4, { size: 17, color: C.grey, weight: 900 });
      T("（从大到小）", 510, 140, go(.5), .5, { size: 15, color: C.grey });
      k.wait(.4);
      // 镜头推到最小的点
      const cx = 240, cy = 272;
      N("", "英语像拉镜头：先对准脚下最小的地方——201 室这扇门。");
      k.camera(go(1.6), 1.5, cx, cy, 4.2);
      const door = k.roughRect(cx - 9, cy - 14, 18, 28);
      P(door, go(.5), .5, { color: C.brown, w: 1.5 }); F(k.rectD(cx - 9, cy - 14, 18, 28), go(.1, 0), { color: "#fde68a", op: 1 });
      T("Room 201", cx, cy - 20, go(.6), .6, { size: 10, color: C.red, weight: 900, font: M, anchor: "middle" });
      k.wait(.6);
      const ring = (rx, ry, label, color, z) => {
        k.camera(go(1.3), 1.2, z === 1 ? 480 : cx, z === 1 ? 272 : cy, z);
        P(k.ellipse(cx, cy, rx, ry), go(.8), .8, { color, w: 2.5 / Math.max(1, z / 1.6) });
        T(label, cx, cy - ry + (z === 1 ? 38 : 18 / Math.max(1, z / 1.4)), go(.5), .5, { size: Math.max(12, 26 / z), color, weight: 900, font: M, anchor: "middle" });
      };
      N("", "镜头往外拉：3 号楼……");
      ring(70, 50, "Building 3", C.orange, 2.4);
      N("", "……星光学校……");
      ring(135, 92, "Star School", C.green, 1.5);
      N("同心圆：", "一圈套一圈、圆心相同的圆。英语地址从最里面一圈往外写。");
      ring(205, 140, "Beijing", C.blue, 1);
      k.wait(.4);
      // 右：英文写法
      k.head("英语：从小到大", 510, 196, C.green, "start", 20);
      T("I am in Room 201,", 510, 234, go(.7), .7, { size: 19, color: C.ink, weight: 900, font: M });
      T("Building 3, Star School,", 510, 262, go(.8), .8, { size: 19, color: C.ink, weight: 900, font: M });
      T("Beijing.", 510, 290, go(.4), .4, { size: 19, color: C.ink, weight: 900, font: M });
      k.wait(.5);
      k.say("I am in Room 201, Building 3, Star School, Beijing.", { zh: "我在北京星光学校 3 号楼 201 室。" });
      N("", "时间也一样：先说几点，再说哪一天的上午，最后说几月。");
      k.head("时间：也从小到大", 510, 340, C.purple, "start", 18);
      D.parts([["at 9:00 ", C.red], ["on Tuesday morning", C.orange]], 510, 376, 17);
      D.parts([["in September", C.blue]], 510, 402, 17);
      T("点 → 天 → 月", 690, 402, go(.5), .5, { size: 15, color: C.grey, weight: 900 });
      k.wait(.6);
      k.say("See you at nine on Tuesday morning.", { zh: "星期二上午九点见。" });
      N("口诀：", "英语拉镜头，从小到大走。");
      // R2 补朗读（2026-10-29，旧幕推广 P2'）：画面上的英文词单读 + 例句（第 1 幕要搬去中英对照总枢，搬时在新位置补，这里不补）
      k.say("Room, Building, Star School, Beijing.", { zh: "房间、楼、星光学校、北京。", word: "Room Building Star School Beijing" });
      k.say("I am in Beijing. I am at school.", { zh: "我在北京。我在学校。", word: "I am in at" });
      k.say("On Tuesday morning. My birthday is in September.", { zh: "在星期二上午。我的生日在九月。", word: "on Tuesday morning September" });
      D.fin("英语地址、时间从小到大写；中文从大到小，正好相反", "口诀：英语拉镜头，从小到大走。");
      k.wait(2);
    },
    terms: [
      ["同心圆", "圆心相同、一圈套一圈的圆。英语地址就像从最里面一圈往外写。"],
    ],
  },
);
WB_LAB.fp_zoom_focus.push(
  // ───────── 6-4 3 段时间轴 × 3 种拍法（总览）─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：所有时态，都是「选时间 × 选拍法」。");
      k.header("⑥ 焦点先行与镜头缩放律", "时间轴 × 镜头拍法", false);
      N("时态：", "动词的样子告诉你：事情发生在什么时候、是什么状态。");
      const xs = [300, 540, 790];
      P(k.wl(190, 130, 920, 130, .8) + " M908,122 L920,130 L908,138", go(1), 1, { color: C.ink, w: 3 });
      P(k.wl(420, 118, 420, 142, .3) + " " + k.wl(665, 118, 665, 142, .3), go(.4), .4, { color: C.ink, w: 2.5 });
      T("过去", xs[0], 112, go(.3), .3, { size: 18, color: C.brown, weight: 900, anchor: "middle" });
      T("现在", xs[1], 112, go(.3), .3, { size: 18, color: C.green, weight: 900, anchor: "middle" });
      T("将来", xs[2], 112, go(.3), .3, { size: 18, color: C.blue, weight: 900, anchor: "middle" });
      const mk = k.group(); const md = `M${xs[1] - 8},130 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0`;
      P(md, go(.2), .2, { color: C.red, w: 2 }); F(md, go(.1, 0), { color: C.red, op: 1 }); k.endGroup();
      T("第一步：看时间路标词，选位置", 190, 160, go(.8), .8, { size: 14, color: C.grey });
      k.wait(.4);
      const head = (t, sub, y, color) => {
        T(t, 40, y, go(.4), .4, { size: 18, color, weight: 900 });
        T(sub, 40, y + 22, go(.4), .4, { size: 13, color: C.grey });
      };
      const cell = (x, sig, form, y, color) => {
        T(sig, x, y - 4, go(.5), .5, { size: 14, color: C.grey, weight: 700, font: M, anchor: "middle" });
        T(form, x, y + 22, go(.5), .5, { size: 19, color, weight: 900, font: M, anchor: "middle" });
      };
      // 快照
      N("一般态（快照）：", "把动作当成一个整体：习惯、规律、事实。");
      head("📸 快照", "一般态", 216, C.blue);
      k.move(mk, go(.6), .6, xs[0] - xs[1], 0);
      cell(xs[0], "yesterday", "did", 216, C.brown);
      k.move(mk, go(.6), .6, xs[1] - xs[0], 0);
      cell(xs[1], "every day", "do / does", 216, C.green);
      k.move(mk, go(.6), .6, xs[2] - xs[1], 0);
      cell(xs[2], "tomorrow", "will do", 216, C.blue);
      k.move(mk, go(.6), .6, xs[1] - xs[2], 0);
      // 录像
      k.say("I played yesterday. I play every day. I will play tomorrow.", { zh: "我昨天玩了，我每天玩，我明天会玩。" });
      N("进行态（录像）：", "正在发生的动态画面，be 动词 + doing。");
      head("🎥 录像", "进行态", 296, C.purple);
      cell(xs[1], "Look! / now", "am/is/are doing", 296, C.purple);
      // 结算
      k.say("Look! She is reading now.", { zh: "看！她正在读书。", word: "is reading" });
      N("完成态（结算）：", "做完了、有了结果，have / has + done（过去分词）。");
      head("🏁 结算", "完成态", 376, C.orange);
      cell(xs[1], "already / just", "have/has done", 376, C.orange);
      T("第二步：看动作状态，选拍法", 190, 424, go(.8), .8, { size: 14, color: C.grey });
      T("详细讲解看「时态矩阵」实验室", 640, 424, go(.8), .8, { size: 14, color: C.grey });
      k.wait(.6);
      k.say("I have already finished my homework.", { zh: "我已经写完作业了。", word: "have finished" });
      N("口诀：", "先选时间，再选镜头。");
      // R2 补朗读（2026-10-29，旧幕推广 P2'）：画面上的英文词单读 + 例句（第 1 幕要搬去中英对照总枢，搬时在新位置补，这里不补）
      k.say("Yesterday, did. Every day, do, does. Tomorrow, will.", { zh: "昨天，做了。每天，做。明天，将会。", word: "yesterday did every day do does tomorrow will" });
      k.say("Did you play yesterday? He does his homework every day.", { zh: "你昨天玩了吗？他每天写作业。", word: "did does" });
      k.say("Look, now. Is, am, are doing.", { zh: "看，现在。is、am、are 正在做。", word: "look now am are doing" });
      k.say("Be quiet, please. The baby is sleeping.", { zh: "请安静。宝宝在睡觉。", word: "be" });
      k.say("I am doing my homework. We are doing sports.", { zh: "我正在写作业。我们正在运动。", word: "am are doing am are doing" });
      k.say("Already, just. Has, have, done.", { zh: "已经，刚刚。has、have、做完。", word: "already just has done" });
      k.say("She has just done her homework.", { zh: "她刚刚写完作业。", word: "has just done" });
      D.fin("先看时间路标词选「过去 / 现在 / 将来」，再看动作状态选「快照 / 录像 / 结算」", "口诀：先选时间，再选镜头。");
      k.wait(2);
    },
    terms: [
      ["时态", "动词的不同样子，表示事情发生的时间（过去 / 现在 / 将来）和状态。"],
      ["一般态", "像拍快照：把动作当成整体，讲习惯、规律或事实。"],
      ["进行态", "像录像：动作正在进行，be + doing。"],
      ["完成态", "像结算：动作已经完成、有了结果，have / has + done。"],
      ["时间信号词", "提示时态的词：yesterday（过去）、every day（现在）、tomorrow（将来）、now、already……"],
    ],
  },
);
