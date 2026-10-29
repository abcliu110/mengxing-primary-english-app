// ==================== 白板脚本：⑪ 英语「五大基本句型」骨骼透视机 5 个案例 ====================
// 数据来源：主文件 FIVE_SENTENCE_PATTERNS_DB（5 项 → 5 个案例）。骨骼部件和金句必须和数据一字不差。
// 版面：上方一排「骨架方块」S / V / O / P / C（y 84–172）→ 中间两句金句，词下面用小括号标出 S/V/O… →
//       底部绿框写骨骼公式，字幕给口诀。本页签的小工具都在这个 IIFE 里，不改引擎。
(function () {
  const MONO = '"Courier New",Courier,monospace';
  const FILL = { "#2563eb": "#dbeafe", "#f59e0b": "#fef3c7", "#7c3aed": "#ede9fe", "#92400e": "#fed7aa", "#059669": "#d1fae5", "#64748b": "#f1f5f9", "#e11d48": "#ffe4e6" };

  function tools(k) {
    const { C, P, T, F, go, wl, ellipse, roughRect, rectD, estW } = k;
    const BY = 96, BH = 54, WS = 20;                       // 方块顶边、高度、方块里英文字号
    const h = {
      // 排版骨架方块：list = [{ role, word, color, note, dashed, sep }]，从 x0 起左右排开
      layout(list, x0 = 40, gap = 44) {
        let x = x0;
        return list.map((b, i) => {
          if (i) x += gap;
          const w = Math.max(b.word.length * WS * .6 + 32, estW(b.role, 16) + 16, 92);
          const o = { ...b, x, w, cx: x + w / 2, i };
          x += w;
          return o;
        });
      },
      // 画一个方块：前面的连接符（+ 或箭头）、上方角色名、方框 + 涂色、下方灰色小注
      block(b, prev) {
        if (prev) {
          const mx = (prev.x + prev.w + b.x) / 2, my = BY + BH / 2;
          if (b.sep === "arrow") {
            P(wl(mx - 16, my, mx + 14, my, .5) + ` M${mx + 5},${my - 8} L${mx + 15},${my} L${mx + 5},${my + 8}`, go(.4), .4, { color: C.red, w: 3 });
          } else T("+", mx, my + 8, go(.3), .3, { size: 26, color: C.grey, weight: 900, anchor: "middle" });
        }
        T(b.role, b.cx, BY - 10, go(.6), .6, { size: 16, color: b.color, weight: 900, anchor: "middle" });
        if (b.dashed) {
          P(rectD(b.x, BY, b.w, BH), go(.5), .5, { color: b.color, w: 2.5, dash: "7 6" });
          F(rectD(b.x, BY, b.w, BH), go(.2, 0), { color: FILL[b.color], op: .6 });
        } else {
          P(roughRect(b.x, BY, b.w, BH), go(.7), .7, { color: b.color, w: 3 });
          F(rectD(b.x, BY, b.w, BH), go(.2, 0), { color: FILL[b.color], op: .9 });
        }
        if (b.note) T(b.note, b.cx, BY + BH + 22, go(.5), .5, { size: 14, color: C.grey, weight: 700, anchor: "middle" });
      },
      // 把骨骼部件里的英文放进方块
      word(b) {
        const dur = Math.max(.5, b.word.length * .06);
        T(b.word, b.cx, BY + BH / 2 + 7, go(dur), dur, { size: WS, color: C.ink, weight: 900, anchor: "middle", font: MONO });
      },
      // 等宽英文句子（按整词定位）
      line(text, y, size = 20, color = C.ink, x = 40) {
        size = Math.min(size, 860 / (text.length * .6));
        const dur = Math.max(1, text.length * .05);
        T(text, x, y, go(dur), dur, { size, color, font: MONO, weight: 700 });
        const cw = size * .6;
        const at = (sub, nth = 0) => {
          const re = new RegExp("(^|[^A-Za-z])" + sub.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![A-Za-z])", "g");
          let m, n = 0;
          while ((m = re.exec(text))) { if (n++ === nth) return m.index + m[1].length; re.lastIndex = m.index + 1; }
          return -1;
        };
        return { x, y, size, cw, text, at, x0: (s, n) => x + at(s, n) * cw, x1: (s, n) => x + (at(s, n) + s.length) * cw };
      },
      // 句子里某个词组下面画小括号，标上 S / V / O …
      tag(m, sub, label, color, nth = 0, dur = .3) {
        const x1 = m.x0(sub, nth) + 2, x2 = m.x1(sub, nth) - 2, y = m.y + 7;
        const r = Math.min(6, (x2 - x1) / 4);
        P(`M${x1},${y} Q${x1},${y + 6} ${x1 + r},${y + 6} L${x2 - r},${y + 6} Q${x2},${y + 6} ${x2},${y}`, go(dur), dur, { color, w: 2.2 });
        T(label, (x1 + x2) / 2, y + 23, go(dur), dur, { size: 14, color, weight: 900, anchor: "middle" });
      },
      tags(m, arr) { arr.forEach(a => h.tag(m, a[0], a[1], a[2], a[3] || 0)); },
      ring(m, sub, color = C.red, nth = 0) {
        const x0 = m.x0(sub, nth), x1 = m.x1(sub, nth);
        P(ellipse((x0 + x1) / 2, m.y - m.size * .34, (x1 - x0) / 2 + 5, m.size * .72), go(.45), .45, { color, w: 2.5 });
        return (x0 + x1) / 2;
      },
      strike(m, sub, nth = 0, color = C.red) {
        P(wl(m.x0(sub, nth) - 2, m.y - m.size * .3, m.x1(sub, nth) + 2, m.y - m.size * .3, .5), go(.35), .35, { color, w: 3 });
      },
      // 普通文字（中文或混排）
      say(text, x, y, o = {}) {
        const dur = o.dur || Math.max(.6, [...text].length * .06);
        T(text, x, y, go(dur), dur, { size: 16, color: C.grey, weight: 700, ...o });
      },
      // 介词挂钩：J 形钩子挂在 (x, y) 上方
      hook(x, y, color = C.red) {
        P(`M${x},${y - 26} L${x},${y - 10} Q${x},${y - 2} ${x - 7},${y - 2} Q${x - 13},${y - 2} ${x - 13},${y - 9}`, go(.4), .4, { color, w: 3 });
        P(ellipse(x, y - 30, 4, 4), go(.15), .15, { color, w: 2 });
      },
      // 爱心
      heart(x, y, color = C.red) {
        const d = `M${x},${y + 9} C${x - 16},${y - 2} ${x - 10},${y - 15} ${x},${y - 6} C${x + 10},${y - 15} ${x + 16},${y - 2} ${x},${y + 9} Z`;
        P(d, go(.4), .4, { color, w: 2.2 }); F(d, go(.1, 0), { color: "#fecdd3", op: 1 });
      },
      // 靶子
      target(x, y) {
        [26, 17, 8].forEach((r, i) => {
          const d = ellipse(x, y, r, r);
          P(d, go(.3), .3, { color: i === 1 ? C.purple : C.red, w: 2.5 });
        });
      },
      // 天平式的等号弧：从 a 方块底部弯到 b 方块底部
      arc(a, b, label) {
        const y = BY + BH + 6, mx = (a.cx + b.cx) / 2;
        P(`M${a.cx},${y} Q${mx},${y + 48} ${b.cx},${y}`, go(.7), .7, { color: C.orange, w: 2.5, dash: "6 5" });
        T(label, mx, y + 44, go(.8), .8, { size: 15, color: C.orange, weight: 900, anchor: "middle" });
      },
      // 结尾绿框：骨骼公式 + 灰色中文
      final(formula, zhLine) {
        const w = Math.min(928, Math.max(420, estW(formula, 21) + 50));
        T(formula, 40, 479, go(1.6), 1.6, { size: 21, color: C.green, weight: 900 });
        P(roughRect(16, 448, w, 48), go(.9), .9, { color: C.green, w: 2 });
        T(zhLine, 40, 524, go(1.4), 1.4, { size: 17, color: C.grey });
      }
    };
    return h;
  }

  WB_LAB.five_patterns = [
    // ───────── ① SV 自给自足型 ─────────
    {
      build(k) {
        const { C, N } = k, h = tools(k);
        N("", "这节课：拍一张英语句子的「X 光片」，看清它的骨头！");
        k.header("自给自足型 · 无需宾语", "句型 ① SV", false);
        N("五大基本句型：", "英语句子最常见的 5 种骨架。句子再长，骨架也逃不出这 5 种。");
        const B = h.layout([
          { role: "S 主语", word: "The sun", color: C.blue, note: "谁？" },
          { role: "V 不及物谓语", word: "rises", color: C.orange, note: "做什么？" },
          { role: "地点挂件", word: "in the east", color: C.grey, note: "在哪儿（可有可无）", dashed: true }
        ]);
        N("主语 S：", "句子在说「谁」或「什么」。S 是 Subject（主语）的第一个字母。");
        h.block(B[0]);
        N("谓语 V：", "说主语「做什么」的动词，是句子的核心。V 来自 Verb（动词）。");
        h.block(B[1], B[0]);
        N("", "把词放进骨架：The sun 是主语，rises（升起）是谓语。");
        h.word(B[0]); h.word(B[1]);
        N("挂件：", "补充「在哪儿、怎么样」的部分，比如 in the east（在东方）。去掉骨架也不散。");
        h.block(B[2], B[1]); h.word(B[2]);
        N("不及物动词 Vi：", "主语自己就能完成的动作，力气不用传给别人，后面不用接对象。");
        h.say("自己就能完成：rise 升起 · fly 飞 · sleep 睡 · run 跑 · smile 笑", 40, 206, { color: C.orange, size: 16, weight: 900 });
        k.wait(.8);
        N("", "看金句：Birds fly 就是骨架，后面的部分全是挂件。");
        const m1 = h.line("Birds fly happily in the blue sky.", 254);
        k.say("Birds fly happily in the blue sky.", { zh: "鸟儿在蓝天里快乐地飞翔。" });
        h.tags(m1, [["Birds", "S", C.blue], ["fly", "V", C.orange]]);
        N("副词：", "说明动作「怎么样」的词，常以 -ly 结尾，比如 happily（快乐地）。");
        h.tags(m1, [["happily", "副词挂件", C.grey], ["in the blue sky", "地点挂件", C.grey]]);
        N("宾语：", "动作的对象，就是「对谁、对什么」。不及物动词不能直接接宾语。");
        const m2 = h.line("Please listen to the teacher and look at the blackboard!", 350);
        k.say("Please listen to the teacher and look at the blackboard!", { zh: "请听老师讲，看黑板！", word: "listen to" });
        N("介词挂钩：", "to、at、for、with 这类小词像钩子，挂在不及物动词后面，才能接上对象。");
        const x1 = h.ring(m2, "to"); h.hook(x1, m2.y - 22);
        const x2 = h.ring(m2, "at"); h.hook(x2, m2.y - 22);
        h.tags(m2, [["listen", "V", C.orange], ["the teacher", "对象", C.purple], ["look", "V", C.orange], ["the blackboard", "对象", C.purple]]);
        N("铁律：", "一定要守的规矩：listen to、look at、wait for，钩子不能丢！");
        h.say("必考：", 40, 414, { color: C.red, size: 17, weight: 900, dur: .4 });
        h.say("listen TO · look AT · wait FOR · arrive IN(AT)", 100, 414, { color: C.red, size: 17, weight: 900, font: MONO, dur: 1.4 });
        N("", "这就是句型 ①：主语 + 不及物动词，挂件随便挂。");
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（S V O 这类成分标签不读，见 r2skip）
        k.say("The sun rises in the east.", { zh: "太阳从东方升起。", word: "The sun rises in the east" });
        k.say("Rise, fly, sleep, run, smile. Babies sleep. Kids run and smile.", { zh: "升起、飞、睡、跑、笑。宝宝睡觉。孩子们跑着、笑着。", word: "rise fly sleep run smile" });
        k.say("Birds fly happily in the blue sky.", { zh: "鸟儿在蓝天里快乐地飞翔。", word: "Birds happily blue sky ly", blocks: ["ly"] });
        k.say("Please look at the blackboard and listen to the teacher.", { zh: "请看黑板，听老师讲。", word: "Please look at blackboard and teacher" });
        k.say("Wait for me! We arrive at school at eight.", { zh: "等等我！我们八点到学校。", word: "wait FOR arrive" });
        k.say("Subject, verb. Play with me!", { zh: "主语，动词。和我一起玩吧！", word: "Subject Verb with" });
        h.final("S（主语）+ Vi（不及物动词）  [+ 副词 / 介词短语挂件]", "鸟儿在蓝天上快乐地飞翔。  自己能做，不带宾语！");
        N("口诀：", "不及物动词自己就能做；想接对象，先挂介词钩。");
      },
      r2skip: ["SV", "Vi"],   // 成分标签（主语 S、不及物动词 Vi），不读
      terms: [
        ["五大基本句型", "英语句子最常见的 5 种骨架：SV、SVP、SVO、SVOO、SVOC。句子再长，骨架也是这 5 种之一。"],
        ["骨骼 / 骨架", "比喻：句子里最核心、不能少的部分。动画里用一个个方块表示，其他补充内容是挂件。"],
        ["骨骼透视", "比喻：像拍 X 光片一样看穿句子，只看最核心的骨头（S、V、O、P、C）。"],
        ["主语 S", "句子在说「谁」或「什么」，比如 The sun、Birds。S 是 Subject 的首字母。"],
        ["谓语 V", "说主语「做什么、怎么样」的动词，是句子的核心。V 是 Verb（动词）的首字母。"],
        ["宾语 O", "动作的对象，回答「对谁、对什么」，比如 I love books 里的 books。O 是 Object 的首字母。"],
        ["表语 P", "跟在系动词后面，说明主语「是什么、怎么样」，比如 The cake tastes sweet 里的 sweet。"],
        ["宾语补足语 OC（宾补）", "补充说明宾语「变成什么样、去做什么」，比如 makes me happy 里的 happy。"],
        ["不及物动词 Vi", "主语自己就能完成的动作，后面不能直接接宾语，比如 rise、fly、sleep、run、smile。"],
        ["及物动词 Vt", "动作要落到一个对象上，后面必须直接接宾语，比如 plant trees、love books。"],
        ["挂件", "补充「在哪儿、什么时候、怎么样」的部分，比如 in the east、happily。去掉它骨架照样完整。"],
        ["副词", "说明动作「怎么样」的词，常以 -ly 结尾，比如 happily（快乐地）。"],
        ["介词挂钩", "to、at、for、with、in 这类介词。不及物动词想接对象，必须先挂上它：listen to、look at。"],
        ["第一性原理", "从最根本的道理想起，先弄懂「为什么」，再记规则。"],
        ["铁律 / 考点", "铁律：一定要遵守的规则；考点：考试最爱考的地方。"]
      ]
    },
    // ───────── ② SVP 状态天平型 ─────────
    {
      build(k) {
        const { C, N } = k, h = tools(k);
        N("", "句型 ②：有一种动词不是动作，而像数学里的等号「=」。");
        k.header("状态天平型 · 绝不用副词", "句型 ② SVP", false);
        const B = h.layout([
          { role: "S 主语", word: "The chicken soup", color: C.blue },
          { role: "V 感官系动词 =", word: "smells / tastes", color: C.orange },
          { role: "P 形容词表语", word: "so delicious!", color: C.brown }
        ]);
        N("主语 S：", "The chicken soup（鸡汤），这句话在说它。");
        h.block(B[0]); h.word(B[0]);
        N("系动词：", "不表示动作，像一座「等号桥」，把后面的状态交给主语。");
        h.block(B[1], B[0]); h.word(B[1]);
        N("表语 P：", "系动词后面的部分，说主语「是什么、怎么样」，常用形容词。");
        h.block(B[2], B[1]); h.word(B[2]);
        N("形容词：", "描述样子、味道、心情的词，比如 delicious（美味的）、sweet（甜的）。");
        k.wait(.6);
        N("状态天平：", "系动词两边一样重：鸡汤 = 很好吃，说的是同一个东西。");
        h.arc(B[0], B[2], "鸡汤 = 很好吃（两边平衡）");
        N("感官系动词：", "看、听、闻、尝、摸五种感觉：look、sound、smell、taste、feel。");
        h.say("感官：look · sound · smell · taste · feel", 40, 232, { color: C.orange, size: 16, weight: 900, font: MONO, dur: 1.2 });
        N("变化系动词：", "get、turn、become，意思都是「变得」。");
        h.say("变化：get · turn · become", 560, 232, { color: C.purple, size: 16, weight: 900, font: MONO, dur: .9 });
        N("", "看金句：sounds、tastes 是等号，后面 great、sweet 都是形容词。");
        const m1 = h.line("That idea sounds great! The cake tastes sweet.", 280);
        k.say("That idea sounds great! The cake tastes sweet.", { zh: "这个主意听起来很棒！蛋糕尝起来很甜。" });
        h.tags(m1, [["That idea", "S", C.blue], ["sounds", "V", C.orange], ["great", "P", C.brown], ["The cake", "S", C.blue], ["tastes", "V", C.orange], ["sweet", "P", C.brown]]);
        N("副词：", "-ly 结尾的词修饰动作，比如 sweetly（甜甜地）。系动词后面不能用它！");
        const bad = h.line("tastes sweetly", 280, 18, C.red, 640);
        h.strike(bad, "sweetly"); k.redX(612, 256);
        N("", "turn 管颜色变化（树叶变黄），get 管天气变化（天气变凉）。");
        const m2 = h.line("In autumn, the leaves turn yellow and the weather gets cool.", 362);
        k.say("In autumn, the leaves turn yellow and the weather gets cool.", { zh: "秋天，树叶变黄，天气变凉。" });
        h.tags(m2, [["In autumn", "时间挂件", C.grey], ["the leaves", "S", C.blue], ["turn", "V", C.orange], ["yellow", "P", C.brown], ["the weather", "S", C.blue], ["gets", "V", C.orange], ["cool", "P", C.brown]]);
        h.say("铁律：系动词 + 形容词（对）    系动词 + -ly 副词（错）", 40, 422, { color: C.red, size: 17, weight: 900 });
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（S V O 这类成分标签不读，见 r2skip）
        k.say("The chicken soup smells so delicious.", { zh: "鸡汤闻起来太香了。", word: "The chicken soup smells so delicious" });
        k.say("Look, sound, smell, taste, feel. You look happy. I feel good.", { zh: "看、听、闻、尝、摸。你看起来很开心。我感觉很好。", word: "look sound smell taste feel" });
        k.say("Get, turn, become. He becomes tall.", { zh: "变得。他长高了。", word: "get turn become" });
        k.say("That idea sounds great! The cake tastes sweet.", { zh: "这个主意听起来很棒！蛋糕尝起来很甜。", word: "That idea sounds great cake tastes sweet" });
        k.say("Sweetly, ly. She sings sweetly.", { zh: "甜甜地（-ly 副词）。她唱得很甜。", word: "sweetly ly", blocks: ["ly"] });
        k.say("In autumn, the leaves turn yellow and the weather gets cool.", { zh: "秋天，树叶变黄，天气变凉。", word: "In autumn leaves yellow and weather gets cool" });
        h.final("S（主语）+ 系动词（=）+ P（表语：名词 / 形容词 / 介词短语）", "那个主意听起来太棒了！蛋糕尝起来很甜。  系动词是等号！");
        N("口诀：", "系动词是等号，后面跟形容词，千万别跟 -ly。");
      },
      r2skip: ["SVP"],   // 成分标签，不读
      terms: [
        ["系动词", "不表示动作、像等号「=」的动词，把后面的状态交给主语，比如 am / is / are、look、taste、get。"],
        ["感官系动词", "和五种感觉有关的系动词：look 看起来、sound 听起来、smell 闻起来、taste 尝起来、feel 摸起来。"],
        ["变化系动词", "表示「变得」的系动词：get、turn、become。turn 常说颜色变化，get 常说天气变化。"],
        ["形容词", "描述样子、味道、心情的词，比如 delicious（美味的）、sweet（甜的）、cool（凉爽的）。"],
        ["状态天平 / 等号桥", "比喻：系动词两边说的是同一个东西，鸡汤 = 很好吃，像天平两边一样平衡。"],
        ["-ly 副词", "以 -ly 结尾、修饰动作的词，比如 sweetly、happily。系动词后面不能接它：taste sweet ✓ taste sweetly ✗。"],
        ["名词", "表示人、东西、地方的词，比如 soup（汤）、cake（蛋糕）、teacher（老师）。"],
        ["介词短语", "介词 + 名词组成的短语，比如 in the east、in the blue sky。"]
      ]
    },
    // ───────── ③ SVO 一箭穿心型 ─────────
    {
      build(k) {
        const { C, N } = k, h = tools(k);
        N("", "句型 ③：最常见的句型！动作像射出去的箭，一定要射中一个目标。");
        k.header("一箭穿心型 · 动作击中靶心", "句型 ③ SVO", false);
        const B = h.layout([
          { role: "S 主语", word: "Leo", color: C.blue, note: "射箭的人" },
          { role: "V 及物谓语", word: "loves / enjoys", color: C.orange, note: "弓箭" },
          { role: "O 宾语靶心", word: "reading English books", color: C.purple, note: "被射中的靶心", sep: "arrow" }
        ]);
        N("主语 S：", "Leo，射箭的人。");
        h.block(B[0]); h.word(B[0]);
        N("及物动词 Vt：", "动作要落到对象身上，后面必须接宾语。英语里约 80% 的动词都是它。");
        h.block(B[1], B[0]); h.word(B[1]);
        N("宾语靶心 O：", "箭射中的目标，也就是动作的对象：reading English books。");
        h.block(B[2], B[1]); h.word(B[2]);
        const bx = B[2].x + B[2].w;
        if (bx + 50 < 940) h.target(bx + 36, 123);
        N("", "箭从 loves 出发，直接射中宾语 reading English books。");
        k.wait(.6);
        N("", "看金句：planted（种了）直接射中宾语 trees，中间什么都不加。");
        const m1 = h.line("We planted twenty young trees on Tree Planting Day.", 238);
        k.say("We planted twenty young trees on Tree Planting Day.", { zh: "植树节我们种了二十棵小树。" });
        h.tags(m1, [["We", "S", C.blue], ["planted", "V", C.orange], ["twenty young trees", "O", C.purple], ["on Tree Planting Day", "时间挂件", C.grey]]);
        N("画蛇添足：", "多此一举。及物动词后面乱加介词，就像给蛇画脚，反而画错了。");
        h.say("直接接宾语，不加介词：", 40, 300, { color: C.red, size: 16, weight: 900 });
        h.say("discuss the plan · marry her · enter the room", 240, 300, { color: C.red, size: 16, weight: 900, font: MONO, dur: 1.3 });
        N("宾语穿制服：", "两个动词连用时，第二个要换成 to do 或 doing，才能当宾语。");
        const m2 = h.line("I want to buy a dictionary, and I enjoy reading stories.", 350);
        k.say("I want to buy a dictionary, and I enjoy reading stories.", { zh: "我想买一本词典，我也喜欢读故事。" });
        h.tags(m2, [["I", "S", C.blue], ["want", "V", C.orange], ["to buy a dictionary", "O", C.purple], ["I", "S", C.blue, 1], ["enjoy", "V", C.orange], ["reading stories", "O", C.purple]]);
        N("to do：", "盼着将来去做的事用 to do，比如 want to do、hope to do。");
        h.say("将来想做 → want / plan / hope / decide + to do", 40, 404, { color: C.blue, size: 16, weight: 900 });
        N("doing：", "享受、完成、练习常做的事用 doing，比如 enjoy doing。");
        h.say("享受常做 → enjoy / finish / practice / mind + doing", 40, 428, { color: C.green, size: 16, weight: 900 });
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（S V O 这类成分标签不读，见 r2skip）
        k.say("Leo loves reading English books. He enjoys stories.", { zh: "里奥喜欢读英文书。他喜欢故事。", word: "Leo loves enjoys reading English books stories" });
        k.say("We planted twenty young trees on Tree Planting Day.", { zh: "植树节我们种了二十棵小树。", word: "We planted twenty young trees on Tree Planting Day" });
        k.say("Discuss the plan. Marry her. Enter the room.", { zh: "讨论计划。娶她。进入房间。", word: "discuss the plan marry her enter room" });
        k.say("I want to buy a dictionary, and I enjoy reading stories.", { zh: "我想买一本词典，我也喜欢读故事。", word: "I want to buy a dictionary and enjoy" });
        k.say("Want to do, hope to do, plan to do. I decide to go.", { zh: "想做、希望做、打算做。我决定去。", word: "hope decide do want to do hope to do" });
        k.say("Enjoy doing. Finish doing, practice doing. Do you mind waiting?", { zh: "喜欢做。做完、练习做。你介意等一下吗？", word: "finish practice mind doing" });
        h.final("S（主语射箭人）+ Vt（及物动词）+ O（宾语靶心）", "我们在植树节种了 20 棵小树苗。  动作直接射中宾语！");
        N("口诀：", "及物动词是支箭，直接射中宾语，不加介词。");
      },
      r2skip: ["SVO", "Vt"],   // 成分标签，不读
      terms: [
        ["宾语靶心", "比喻：及物动词像射出去的箭，宾语就是被射中的靶心，比如 planted trees 里的 trees。"],
        ["画蛇添足", "多此一举。及物动词后面直接接宾语，乱加介词反而错：discuss the plan、enter the room 都不加介词。"],
        ["宾语穿制服", "比喻：两个动词连用时，第二个动词要变成 to do 或 doing 才能当宾语，比如 want to buy、enjoy reading。"],
        ["to do（不定式）", "to + 动词原形，表示盼着将来去做的事，常跟在 want / plan / hope / decide 后面。"],
        ["doing（动名词）", "动词加 -ing 当名词用，表示享受、完成、练习正在做或常做的事，常跟在 enjoy / finish / practice / mind 后面。"]
      ]
    },
    // ───────── ④ SVOO 双手递礼型 ─────────
    {
      build(k) {
        const { C, N } = k, h = tools(k);
        N("", "句型 ④：有些动词天生就是「把东西递给人」，所以要带两个宾语。");
        k.header("双手递礼型 · to 指向 vs for 心意", "句型 ④ SVOO", false);
        const B = h.layout([
          { role: "S 主语", word: "Mum", color: C.blue },
          { role: "V 双宾动词", word: "gave / bought", color: C.orange },
          { role: "IO 人", word: "me", color: C.purple, note: "sb. 某人" },
          { role: "DO 物", word: "a birthday gift", color: C.brown, note: "sth. 某物" }
        ]);
        N("双宾动词：", "give、send、buy、make……都是把某物交给某人。");
        h.block(B[0]); h.word(B[0]); h.block(B[1], B[0]); h.word(B[1]);
        N("间接宾语 IO：", "收到东西的「人」，比如 me。sb. 是 somebody（某人）的缩写。");
        h.block(B[2], B[1]); h.word(B[2]);
        N("直接宾语 DO：", "递出去的「物」：a birthday gift。sth. 是 something（某物）。");
        h.block(B[3], B[2]); h.word(B[3]);
        N("双宾语：", "一个动词带两个宾语：人在前，物在后。");
        k.wait(.5);
        N("", "也可以把物放前面、人放后面，但人前面要加 to 或 for。");
        h.say("人在前：V + sb. + sth.     或     物在前：V + sth. + to / for + sb.", 40, 210, { color: C.ink, size: 17, weight: 900 });
        const m1 = h.line("Leo gave me a nice pen. = Leo gave a nice pen TO me.", 262);
        k.say("Leo gave me a nice pen. Leo gave a nice pen to me.", { zh: "里奥给了我一支好看的笔。", word: "gave" });
        h.tags(m1, [["me", "IO", C.purple], ["a nice pen", "DO", C.brown], ["a nice pen", "DO", C.brown, 1], ["TO me", "to + 人", C.red]]);
        N("to 指向：", "把现成的东西单向递过去，像一支箭头，就用 to。");
        k.arrow(m1.x1("me", 1) + 18, m1.y - 7, m1.x1("me", 1) + 58, m1.y - 7, C.red);
        h.say("to 派：give / show / send / pass / lend / teach / tell", 40, 322, { color: C.blue, size: 16, weight: 900, font: MONO, dur: 1.4 });
        N("for 心意：", "花心思替别人买、做、准备，像送出一颗爱心，就用 for。");
        const m2 = h.line("Dad bought me a new bike. = Dad bought a new bike FOR me.", 372);
        k.say("Dad bought me a new bike. Dad bought a new bike for me.", { zh: "爸爸给我买了一辆新自行车。", word: "bought" });
        h.tags(m2, [["me", "IO", C.purple], ["a new bike", "DO", C.brown], ["a new bike", "DO", C.brown, 1], ["FOR me", "for + 人", C.red]]);
        h.heart(m2.x1("me", 1) + 26, m2.y - 7);
        h.say("for 派：buy / make / cook / draw / choose / find", 40, 428, { color: C.red, size: 16, weight: 900, font: MONO, dur: 1.3 });
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（S V O 这类成分标签不读，见 r2skip）
        k.say("Mum gave me a birthday gift.", { zh: "妈妈送了我一份生日礼物。", word: "Mum me a birthday gift a birthday gift" });
        k.say("Leo gave me a nice pen. Give it to me.", { zh: "里奥给了我一支好看的笔。把它给我。", word: "Leo nice pen give to" });
        k.say("Give, show, send, pass, lend, teach, tell. Please tell me a story.", { zh: "给、展示、寄、递、借给、教、讲。请给我讲个故事。", word: "show send pass lend teach tell" });
        k.say("Dad bought me a new bike. He made a cake for me.", { zh: "爸爸给我买了一辆新自行车。他给我做了蛋糕。", word: "Dad new bike for" });
        k.say("Buy, make, cook, draw, choose, find. Mum cooks dinner for us.", { zh: "买、做、煮、画、挑选、找到。妈妈给我们做晚饭。", word: "buy make cook draw choose find" });
        k.say("Somebody, something. Somebody gave me something.", { zh: "某人，某物。有人给了我一样东西。", word: "somebody something" });
        h.final("S + V + 人 + 物    或    S + V + 物 + to / for + 人", "妈妈送了我一份生日礼物。  递过去用 to，花心思用 for！");
        N("口诀：", "现成东西递过去用 to，花心思替人准备用 for。");
      },
      r2skip: ["SVOO", "IO", "DO", "sb", "sth", "vs"],   // 成分标签和 sb./sth. 缩写、对比符号 vs，不读（全称 somebody / something 已读）
      terms: [
        ["双宾语", "一个动词后面跟两个宾语：先人后物，比如 gave me a pen（给我一支笔）。"],
        ["间接宾语 IO", "收到东西的人，比如 gave me a pen 里的 me。IO 是 Indirect Object 的缩写。"],
        ["直接宾语 DO", "被递出去的东西，比如 gave me a pen 里的 a pen。DO 是 Direct Object 的缩写。"],
        ["sb. / sth.", "sb. = somebody（某人），sth. = something（某物），是词典和公式里的缩写。"],
        ["to 指向", "把现成东西单向递过去用 to：give / show / send / pass / lend / teach / tell sth. to sb.。"],
        ["for 心意", "花心思替人准备、购买用 for：buy / make / cook / draw / choose / find sth. for sb.。"]
      ]
    },
    // ───────── ⑤ SVOC 魔法赋能型 ─────────
    {
      build(k) {
        const { C, N } = k, h = tools(k);
        N("", "句型 ⑤：光有主谓宾还不够，还要说宾语「变成什么样」或「去做什么」。");
        k.header("魔法赋能型 · 让宾语干某事 / 变某样", "句型 ⑤ SVOC", false);
        const B = h.layout([
          { role: "S 主语", word: "Good music", color: C.blue },
          { role: "V 使役谓语", word: "makes", color: C.orange },
          { role: "O 宾语", word: "us", color: C.purple },
          { role: "OC 宾补", word: "happy / relax", color: C.green }
        ]);
        N("", "Good music makes us：好音乐让我们……话还没说完！");
        h.block(B[0]); h.word(B[0]); h.block(B[1], B[0]); h.word(B[1]); h.block(B[2], B[1]); h.word(B[2]);
        N("宾语补足语 OC：", "补充说明宾语的状态或动作，简称宾补，比如 happy、relax。");
        h.block(B[3], B[2]); h.word(B[3]);
        N("小主谓句：", "宾语 + 宾补连起来像一个小句子：us happy → 我们开心。");
        h.arc(B[2], B[3], "us + happy → 我们开心");
        N("魔法赋能：", "比喻：动词像魔法棒，点一下宾语，让它变个样或去做件事。");
        k.wait(.4);
        const m1 = h.line("Reading books makes me clever and keeps my mind open.", 270);
        k.say("Reading books makes me clever and keeps my mind open.", { zh: "读书让我变聪明，让我的思想更开阔。" });
        h.tags(m1, [["Reading books", "S", C.blue], ["makes", "V", C.orange], ["me", "O", C.purple], ["clever", "OC", C.green], ["keeps", "V", C.orange], ["my mind", "O", C.purple], ["open", "OC", C.green]]);
        N("形容词作宾补：", "make / keep + 宾语 + 形容词，不能写成 -ly 的 happily。");
        const bad = h.line("makes me happily", 270, 17, C.red, 712);
        h.strike(bad, "happily"); k.redX(686, 248);
        N("使役动词：", "make、let、have，意思是「让某人做某事」。后面的动词要脱掉 to。");
        const m2 = h.line("Our teacher asks us to read aloud, and she lets us play games!", 350);
        k.say("Our teacher asks us to read aloud, and she lets us play games!", { zh: "老师让我们大声朗读，还让我们玩游戏！" });
        h.tags(m2, [["asks", "V", C.orange], ["us", "O", C.purple], ["to read aloud", "OC", C.green], ["lets", "V", C.orange], ["us", "O", C.purple, 1], ["play games", "OC", C.green]]);
        N("动词原形：", "动词本来的样子，不加 to、-s、-ed、-ing，比如 play、laugh。");
        h.ring(m2, "play", C.red);
        N("", "一般动词 ask、tell、want、invite 要带 to：ask us to read。");
        h.say("ask / tell / want / invite + sb. + to do", 40, 404, { color: C.blue, size: 16, weight: 900, font: MONO, dur: 1.2 });
        N("", "使役动词后面用原形：Let's go! Make him laugh!");
        h.say("make / let / have + sb. + do（不带 to）   Let's go! · Make him laugh!", 40, 428, { color: C.red, size: 16, weight: 900 });
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句（S V O 这类成分标签不读，见 r2skip）
        k.say("Good music makes us happy. It makes us relax.", { zh: "好音乐让我们开心。它让我们放松。", word: "Good music makes us happy relax Good music makes us" });
        k.say("Reading books makes me clever and keeps my mind open.", { zh: "读书让我变聪明，让我的思想更开阔。", word: "Reading books me clever and keeps my mind open keep" });
        k.say("Happily, ly. They play happily.", { zh: "快乐地（-ly 副词）。他们玩得很开心。", word: "happily ly", blocks: ["ly"] });
        k.say("Our teacher asks us to read aloud, and she lets us play games!", { zh: "老师让我们大声朗读，还让我们玩游戏！", word: "Our teacher asks to read aloud she lets play games ask us to read" });
        k.say("Ask, tell, want, invite. Ask us to read! Do it now.", { zh: "请求、告诉、想要、邀请。叫我们来读吧！现在就做。", word: "ask tell want invite do" });
        k.say("Make, let, have. Let's go! Make him laugh!", { zh: "让。我们走吧！让他笑！", word: "make let have Let's go him laugh do" });
        k.say("Played, playing. Ed, ing.", { zh: "玩了、正在玩。-ed、-ing。", word: "ed ing", blocks: ["ed", "ing"] });
        h.final("S + V + O（宾语）+ OC（宾补：形容词 / 名词 / to do / do）", "读书让我变聪明。  make / let / have 后面不带 to！");
        N("口诀：", "make、let、have 不带 to；ask、tell、want 要带 to。");
      },
      r2skip: ["SVOC", "OC", "sb", "makes me happily"],   // 成分标签、sb. 缩写；划掉的错误搭配 makes me happily 不读
      terms: [
        ["使役动词", "表示「让某人做某事」的动词：make、let、have。后面的动词用原形，不带 to：let us play。"],
        ["动词原形", "动词本来的样子，不加 to、-s、-ed、-ing，比如 play、laugh、go。"],
        ["小主谓句", "宾语 + 宾补连起来，意思像一个小句子：makes us happy → 我们开心。"],
        ["魔法赋能", "比喻：动词像魔法棒，让宾语变个样（makes me clever）或去做件事（asks us to read）。"],
        ["形容词作宾补", "make / keep + 宾语 + 形容词，比如 makes me clever、keeps my mind open，不能用 -ly 副词。"]
      ]
    }
  ];
})();
