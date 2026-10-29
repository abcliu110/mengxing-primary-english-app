// ==================== 第一性原理 ⑥ 焦点先行与镜头缩放律（fp_zoom_focus）====================
// 4 幕 = FIRST_PRINCIPLES_DB[5].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
WB_LAB.fp_zoom_focus = [
  // ───────── 6-1 长修饰放名词后面：先立树干，后挂树枝 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么英语的长修饰语要放在名词后面？");
      k.header("⑥ 焦点先行与镜头缩放律", "先立树干，后挂树枝", true);
      N("修饰语：", "用来说明「哪一个、什么样」的词或短语，比如「穿蓝衣服的」。");
      const z = k.zh("树下那个穿蓝衣服的男孩", 40, 112, 26);
      k.circle(z, 9, 10, C.red);
      T("中文：一大串铺垫，最后才说核心「男孩」", 40, 150, go(1.2), 1.2, { size: 15, color: C.grey, weight: 700 });
      k.wait(.4);
      N("核心名词：", "这句话真正在说的那个人或东西——the boy。英语先把它亮出来。");
      const tr = k.tree({ cx: 170, ground: 398, trunkTop: 246, crownY: 208, crownRx: 90, crownRy: 42, gx0: 50, gx1: 300 });
      k.sign("the boy", 170, 282, null, { size: 22 });
      N("短语：", "两个词以上组成的一小组，比如 in blue、under the tree。");
      k.chip("in blue", 270, 246, [236, 222], { size: 17, color: C.blue });
      k.chip("under the tree", 270, 318, [318, 280], { size: 17, color: C.green, string: true });
      T("the boy in blue under the tree", 40, 428, go(1.2), 1.2, { size: 18, color: C.green, weight: 900, font: M });
      k.wait(.5);
      // 右：两条规则
      k.say("The boy in blue under the tree is my brother.", { zh: "树下穿蓝衣服的男孩是我弟弟。", word: "the boy" });
      N("", "只有 1 个词的轻修饰，放在名词前面，挡不住核心。");
      k.head("1 个词 → 放前面", 520, 112, C.blue, "start", 20);
      T("a red apple", 520, 150, go(.5), .5, { size: 20, color: C.ink, weight: 900, font: M });
      T("a cute cat · my English book", 520, 180, go(.8), .8, { size: 17, color: C.blue, weight: 700, font: M });
      k.wait(.4);
      N("", "2 个词以上的短语，一律挂在名词后面，像圣诞树上的挂件。");
      k.head("2 个词以上 → 挂后面", 520, 240, C.green, "start", 20);
      T("the girl in a red dress", 520, 278, go(.8), .8, { size: 19, color: C.ink, weight: 900, font: M });
      T("穿红裙子的女孩", 520, 302, go(.4), .4, { size: 13, color: C.grey });
      T("the book on the teacher's desk", 520, 338, go(.9), .9, { size: 17, color: C.ink, weight: 900, font: M });
      T("讲台上的书", 520, 362, go(.4), .4, { size: 13, color: C.grey });
      k.say("I see the girl in a red dress.", { zh: "我看见那个穿红裙子的女孩。" });
      N("不定代词：", "something、anything 这类词，连 1 个词的修饰也放后面。");
      T("something important", 520, 398, go(.7), .7, { size: 17, color: C.purple, weight: 900, font: M });
      T("（特殊：也放后面）", 736, 398, go(.5), .5, { size: 13, color: C.grey });
      k.wait(.6);
      k.say("I have something important to tell you.", { zh: "我有重要的事要告诉你。", word: "something important" });
      N("口诀：", "先立树干，后挂树枝。");
      D.fin("1 个词的修饰放名词前；2 个词以上的短语挂在名词后", "口诀：先立树干，后挂树枝。");
      k.wait(2);
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
  // ───────── 6-2 疑问词抢句首 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么英语的疑问词总是放在句子第一个？");
      k.header("⑥ 焦点先行与镜头缩放律", "焦点抢头条", false);
      const z = k.zh("你周末打算去哪里？", 40, 112, 26);
      k.circle(z, 6, 7, C.red);
      T("中文：疑问词「哪里」在后面", 300, 112, go(.8), .8, { size: 15, color: C.grey, weight: 700 });
      k.wait(.4);
      N("疑问词：", "Where（哪里）、When（什么时候）、How（怎样）……是提问的焦点。");
      const cw = 15.6, X = n => 60 + n * cw, y = 200, st = { size: 26, weight: 900, font: M };
      const word = (w, n, color) => { const g = k.group(); T(w, X(n), y, go(.4), .4, { ...st, color }); k.endGroup(); return g; };
      const gYou = word("you", 0, C.ink), gAre = word("are", 4, C.blue), gBase = word("going this weekend", 8, C.ink), gWh = word("Where", 27, C.red);
      const gLab = k.group(); T("按中文顺序排：", 60, 160, go(.5), .5, { size: 15, color: C.grey }); k.endGroup();
      k.wait(.6);
      N("", "英语要第一秒就让人听清「问的是地点」：Where 跳到句首！");
      const t1 = go(2); k.fade(gLab, t1, .6, 0);
      k.arc(gWh, t1, 1.6, `M0,0 C${-9 * cw},-80 ${-18 * cw},-80 ${-27 * cw},0`);
      k.move(gBase, t1 + .3, 1.2, 6 * cw, 0);
      k.move(gYou, t1 + .3, 1.2, 10 * cw, 0);
      N("", "助动词 / be 动词 are 也提上来，紧跟在疑问词后面。");
      k.move(gAre, go(1), 1, 2 * cw, 0);
      T("?", X(32), y, go(.3), .3, { ...st, color: C.ink });
      P(k.ellipse(X(2.5), y - 9, 56, 26), go(.5), .5, { color: C.orange, w: 3 });
      T("焦点先出场", X(2.5), y + 40, go(.5), .5, { size: 15, color: C.orange, weight: 900, anchor: "middle" });
      T("are 紧跟其后", X(6.5), y + 62, go(.5), .5, { size: 15, color: C.blue, weight: 900 });
      k.wait(.6);
      // 下：套用
      k.say("Where are you going this weekend?", { zh: "你这个周末去哪里？", word: "Where" });
      N("特殊疑问句：", "用疑问词开头、不能用 Yes / No 回答的问句。公式：疑问词 + 一般疑问句。");
      k.head("提问：焦点词第一个", 40, 300, C.purple, "start", 18);
      T("Where is my bag?", 40, 336, go(.6), .6, { size: 19, color: C.ink, weight: 900, font: M });
      T("When do you get up?", 40, 366, go(.6), .6, { size: 19, color: C.ink, weight: 900, font: M });
      T("How much is this shirt?", 40, 396, go(.7), .7, { size: 19, color: C.ink, weight: 900, font: M });
      k.say("When do you get up?", { zh: "你几点起床？" });
      N("感叹句：", "表示强烈感情的句子。被夸的那个词抢到最前面，后面的主谓可以省略。");
      k.head("感叹：被夸的词第一个", 500, 300, C.orange, "start", 18);
      D.parts([["What a clever boy ", C.ink], ["(he is)", "#94a3b8"], ["!", C.ink]], 500, 340, 19);
      D.parts([["How fast ", C.ink], ["(he runs)", "#94a3b8"], ["!", C.ink]], 500, 376, 19);
      T("括号里的部分可以省略", 500, 406, go(.6), .6, { size: 14, color: C.grey });
      k.wait(.6);
      k.say("What a clever boy!", { zh: "多聪明的男孩啊！" });
      N("口诀：", "焦点先出场。");
      D.fin("最想问的、最想夸的词放第一个；问句里 be / 助动词紧跟其后", "口诀：焦点先出场。");
      k.wait(2);
    },
    terms: [
      ["特殊疑问句", "用 what / where / when / how 等疑问词开头的问句，不能用 Yes / No 回答。"],
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
