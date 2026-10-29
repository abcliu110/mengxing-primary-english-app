// ==================== 白板脚本：⑫ 高分作文「黄金升级公式」炼金炉 3 个案例 ====================
// 数据来源：主文件 WRITING_ALCHEMIST_DB（3 项 → 3 个案例）。句子必须和数据一字不差。
// 本页签的小工具（炼金炉、路标、积木、自动换行英文、结尾绿框）都在这里本地定义，不改引擎。
(function () {
  const MONO = '"Courier New",Courier,monospace';

  // 贪心换行：按单词拆，每行不超过 maxChars 个字符；拼回去（用空格）必须等于原句
  function wrap(text, maxChars) {
    const out = []; let cur = "";
    text.split(" ").forEach(w => {
      if (cur && (cur + " " + w).length > maxChars) { out.push(cur); cur = w; }
      else cur = cur ? cur + " " + w : w;
    });
    if (cur) out.push(cur);
    return out;
  }
  // 等宽英文行（可调书写速度），返回和 k.mono 一样的定位对象
  function mline(k, text, x, y, size, color, weight = 700, rate = .045) {
    const dur = Math.max(.6, text.length * rate);
    k.T(text, x, y, k.go(dur), dur, { size, color, font: MONO, weight });
    const cw = size * .6;
    const at = (sub, nth = 0) => {
      // 按整词找（前后不是字母），避免 had 匹配到别的词里
      const re = new RegExp("(^|[^A-Za-z])" + sub.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![A-Za-z])", "g");
      let m, n = 0;
      while ((m = re.exec(text))) { if (n++ === nth) return m.index + m[1].length; re.lastIndex = m.index + 1; }
      return -1;
    };
    return { x, y, size, cw, text, at, x0: (s, n) => x + at(s, n) * cw, x1: (s, n) => x + (at(s, n) + s.length) * cw };
  }
  // 多行英文段落：返回各行对象；find(sub) 找到包含它的那一行
  function para(k, text, x, y, maxChars, size, color, lh, rate) {
    const lines = Array.isArray(maxChars) ? maxChars : wrap(text, maxChars);
    if (lines.join(" ") !== text) throw new Error("wrap mismatch");
    const ms = lines.map((s, i) => mline(k, s, x, y + i * lh, size, color, 700, rate));
    return ms;
  }
  function locate(ms, sub, nth = 0) { let n = 0; for (const m of ms) { let j = 0; while (m.at(sub, j) >= 0) { if (n++ === nth) return [m, j]; j++; } } throw new Error("not found: " + sub); }
  const uline = (k, ms, sub, color, nth = 0) => { const [m, j] = locate(ms, sub, nth); k.underline(m, sub, j, color); };
  const squig = (k, ms, sub, color, nth = 0) => { const [m, j] = locate(ms, sub, nth); k.squiggle(m, sub, j, color); };
  const ring = (k, ms, sub, color, nth = 0) => {
    const [m, j] = locate(ms, sub, nth), x0 = m.x0(sub, j), x1 = m.x1(sub, j);
    k.P(k.ellipse((x0 + x1) / 2, m.y - m.size * .34, (x1 - x0) / 2 + 7, m.size * .66), k.go(.45), .45, { color, w: 2.5 });
  };
  // 小标签（60分 / 100分）
  function tag(k, text, x, y, color, fill) {
    const w = k.estW(text, 14) + 12;
    k.P(k.roughRect(x, y - 16, w, 22), k.go(.35, 0), .35, { color, w: 2 });
    k.F(k.rectD(x, y - 16, w, 22), k.go(.15, 0), { color: fill, op: .95 });
    k.T(text, x + w / 2, y, k.go(.4), .4, { size: 14, color, weight: 900, anchor: "middle" });
  }
  // 炼金炉：x 左边，y 炉口；炉身写公式（两行）
  function furnace(k, x, y, l1, l2) {
    const { C, P, F, T, go } = k, w = 130, h = 64;
    const body = `M${x + 4},${y} C${x - 6},${y + 30} ${x + 10},${y + h} ${x + 24},${y + h} L${x + w - 24},${y + h} C${x + w - 10},${y + h} ${x + w + 6},${y + 30} ${x + w - 4},${y} Z`;
    P(body, go(.7, 0), .7, { color: C.purple, w: 2.5 }); F(body, go(.3), { color: "#f5d0fe", op: .85 });
    P(k.wl(x - 8, y, x + w + 8, y, .5), go(.3), .3, { color: C.purple, w: 4 });
    [32, 65, 98].forEach((dx, i) => {
      const cx = x + dx, by = y + h + 20;
      const d = `M${cx - 7},${by} Q${cx - 11},${by - 9} ${cx},${by - 18} Q${cx + 11},${by - 9} ${cx + 7},${by} Z`;
      P(d, go(.25, 0), .25, { color: C.orange, w: 2 }); F(d, go(.12), { color: i === 1 ? "#fecaca" : "#fde68a", op: 1 });
    });
    T(l1, x + w / 2, y + 26, go(.6), .6, { size: 13, color: C.purple, weight: 900, anchor: "middle", font: MONO });
    if (l2) T(l2, x + w / 2, y + 48, go(.6), .6, { size: 13, color: C.purple, weight: 900, anchor: "middle", font: MONO });
  }
  // 路标：左边一根杆子 + 向右指的牌子
  function signpost(k, x, y, word, label) {
    const { C, P, F, T, go } = k, w = 138, h = 30;
    P(k.wl(x + 14, y, x + 14, y + 80, .6), go(.3), .3, { color: C.brown, w: 4 });
    const d = `M${x},${y} L${x + w - 14},${y} L${x + w},${y + h / 2} L${x + w - 14},${y + h} L${x},${y + h} Z`;
    P(d, go(.5), .5, { color: C.blue, w: 2.5 }); F(d, go(.2, 0), { color: "#dbeafe", op: 1 });
    T(word, x + (w - 14) / 2 + 2, y + 20, go(.6), .6, { size: 13, color: C.blue, weight: 900, anchor: "middle", font: MONO });
    T(label, x + 24, y + 54, go(.5), .5, { size: 14, color: C.grey, weight: 900 });
  }
  // 链环：竖着两节，连起两个路标
  function chainLink(k, cx, y1, y2) {
    const m = (y1 + y2) / 2, ry = (y2 - y1) / 4 + 3;
    k.P(k.ellipse(cx, y1 + ry - 2, 7, ry), k.go(.3), .3, { color: k.C.grey, w: 2.5 });
    k.P(k.ellipse(cx, y2 - ry + 2, 7, ry), k.go(.3), .3, { color: k.C.grey, w: 2.5 });
    return m;
  }
  // 积木：一排彩色方块，返回右端 x
  function blocks(k, labels, x, y, colors) {
    const fills = { [k.C.blue]: "#dbeafe", [k.C.purple]: "#ede9fe", [k.C.green]: "#d1fae5", [k.C.orange]: "#fef3c7", [k.C.brown]: "#fde68a" };
    labels.forEach((s, i) => {
      const col = colors[i % colors.length], w = k.estW(s, 14) + 16;
      k.P(k.roughRect(x, y, w, 26), k.go(.35, 0), .35, { color: col, w: 2.2 });
      k.F(k.rectD(x, y, w, 26), k.go(.15, 0), { color: fills[col], op: .95 });
      k.T(s, x + w / 2, y + 18, k.go(.45), .45, { size: 14, color: col, weight: 900, anchor: "middle" });
      if (i < labels.length - 1) k.T("+", x + w + 10, y + 18, k.go(.15), .15, { size: 16, color: k.C.grey, weight: 900, anchor: "middle" });
      x += w + 20;
    });
    return x;
  }
  // 结尾绿框：两行（第一行绿色结论，第二行灰色补充），字号自动缩到不出界
  function finalBox(k, l1, l2, y = 444) {
    const { C } = k, fit = (s, sz) => Math.min(sz, sz * 880 / k.estW(s, sz));
    k.P(k.roughRect(16, y, 928, 88), k.go(.9), .9, { color: C.green, w: 2.2 });
    k.F(k.rectD(16, y, 928, 88), k.go(.2, 0), { color: "#ecfdf5", op: .9 });
    const s1 = fit(l1, 18), s2 = fit(l2, 16);
    k.T(l1, 36, y + 34, k.go(Math.max(1.6, l1.length * .04)), Math.max(1.6, l1.length * .04), { size: s1, color: C.green, weight: 900 });
    k.T(l2, 36, y + 70, k.go(Math.max(1.6, l2.length * .04)), Math.max(1.6, l2.length * .04), { size: s2, color: C.grey, weight: 700 });
  }

  const GOLD_X = 248, GOLD_CH = 64;

  WB_LAB.writing_alchemist = [
    // ───────── 炼金术 ①：60 分大白话 → 100 分惊艳句 ─────────
    {
      build(k) {
        const { C, N } = k;
        N("", "这节课：同一个意思，怎样把 60 分的大白话，炼成 100 分的作文句？");
        k.header("炼金术 ①  60分 → 100分", "满分作文炼金炉", false);
        // 公式 1：喜好表达三级跳
        N("炼金炉：", "传说能把普通铁块炼成金子。这里把平淡的句子炼成满分好句。");
        furnace(k, 32, 96, "be crazy about", "enjoy doing");
        N("基础句：", "意思对、但很平淡的句子，只能拿 60 分。比如 I like English very much.");
        tag(k, "60分", 180, 112, C.grey, "#f1f5f9");
        const b1 = [mline(k, "I like English very much.", GOLD_X, 112, 18, C.grey)];
        squig(k, b1, "like", C.red);
        N("", "阅卷老师一天看几百个 I like，早就看腻了！要换个说法。");
        N("高级句型：", "更生动、更有变化的说法。be crazy about 意思是「对……着迷」。");
        tag(k, "100分", 180, 146, C.green, "#d1fae5");
        const g1 = para(k, "I am crazy about English, and I really enjoy reading English stories in my free time!", GOLD_X, 146, GOLD_CH, 18, C.ink, 26, .04);
        k.say("I am crazy about English, and I really enjoy reading English stories in my free time!", { zh: "我超爱英语，空闲时特别喜欢读英语故事！" });
        ring(k, g1, "crazy about", C.purple);
        N("enjoy doing：", "喜欢做某事，后面动词加 ing：enjoy reading。也可以用 be fond of。");
        uline(k, g1, "enjoy reading", C.orange);
        N("时间状语：", "说明「什么时候」的词组。in my free time 就是「在我的空闲时间」。");
        uline(k, g1, "in my free time", C.green);
        // 公式 2：开心与感叹升级
        N("", "第二条公式：写开心的事，别只会说 very happy。");
        furnace(k, 32, 212, "What a ...!", "How ...!");
        tag(k, "60分", 180, 228, C.grey, "#f1f5f9");
        const b2 = [mline(k, "We were very happy yesterday.", GOLD_X, 228, 18, C.grey)];
        squig(k, b2, "very happy", C.red);
        N("感叹句：", "表达强烈感情的句子，用 What 或 How 开头，句末用感叹号「!」。");
        tag(k, "100分", 180, 262, C.green, "#d1fae5");
        const g2 = para(k, "What a wonderful and unforgettable day we had! How excited we were!", GOLD_X, 262, 48, 18, C.ink, 26, .04);
        k.say("What a wonderful and unforgettable day we had! How excited we were!", { zh: "那天真美好、真难忘！我们多兴奋啊！" });
        N("What a + 形容词 + 名词：", "多么美好的一天！What a wonderful … day，后面跟 we had。");
        ring(k, g2, "What a", C.purple); uline(k, g2, "day we had!", C.orange);
        N("How + 形容词：", "How excited we were! 我们多么激动啊！形容词紧跟在 How 后面。");
        ring(k, g2, "How excited", C.purple);
        // 公式 4：重要与好处
        N("", "第三条公式：说读书有好处，别只写 is good for us。");
        furnace(k, 32, 328, "not only", "but also");
        tag(k, "60分", 180, 344, C.grey, "#f1f5f9");
        const b3 = [mline(k, "Reading books is good for us.", GOLD_X, 344, 18, C.grey)];
        squig(k, b3, "good for us", C.red);
        N("连接词：", "把句子连起来的词。not only… but also… 意思是「不仅……而且……」。");
        tag(k, "100分", 180, 378, C.green, "#d1fae5");
        const g3 = para(k, "Reading books is not only good for our study, but also opens a window to the world for us!", GOLD_X, 378, ["Reading books is not only good for our study, but also", "opens a window to the world for us!"], 18, C.ink, 26, .04);
        k.say("Reading books is not only good for our study, but also opens a window to the world for us!", { zh: "读书不仅对学习有益，还为我们打开一扇看世界的窗！" });
        uline(k, g3, "not only", C.blue); uline(k, g3, "but also", C.blue);
        N("隐喻：", "打比方：读书 opens a window to the world，给你打开一扇看世界的窗。");
        ring(k, g3, "opens a window to the world", C.purple);
        N("五感法则：", "还有一条：眼睛看 look、鼻子闻 smell、耳朵听 singing，把春天写活。");
        finalBox(k, "口诀：换掉老词 like，加上时间状语，用感叹句和 not only… but also…",
          "还有一条 · 五感法则：视觉 look + 嗅觉 smell + 听觉 are singing（The park is very nice in spring. 的升级）");
        N("口诀：", "换掉老词加状语，感叹句和连接词一用，60 分秒变 100 分！");
      },
      terms: [
        ["炼金炉", "比喻：传说中能把普通铁块炼成金子的炉子。这里指把平淡的 60 分句子「炼」成 100 分好句子的方法。"],
        ["黄金升级公式", "把普通句子变高级的固定套路，比如用 be crazy about 换掉 like。"],
        ["基础句（60 分句）", "意思对、语法也对，但很平淡的句子，比如 I like English very much.。"],
        ["高级句型（100 分句）", "意思一样，但用了更生动、更有变化的说法，让阅卷老师眼前一亮的句子。"],
        ["阅卷老师", "考试时给作文打分的老师。"],
        ["be crazy about", "对……着迷、超级喜欢，比 like 更有感情：I am crazy about English.。"],
        ["be fond of", "喜欢……，也可以用来替换 like。"],
        ["enjoy doing sth.", "喜欢做某事。enjoy 后面的动词要加 ing：enjoy reading（喜欢读书）。sth. 是 something（某事）的缩写。"],
        ["状语 / 时间状语", "补充说明「什么时候、在哪里、怎么样」的词组。说时间的叫时间状语，比如 in my free time（在空闲时间）、yesterday。"],
        ["感叹句", "表达强烈感情的句子，用 What 或 How 开头，句末用感叹号：What a wonderful day we had!"],
        ["What a + adj + n + 主谓", "感叹句公式：What a + 形容词 + 名词 + 主语 + 谓语，比如 What a wonderful day we had!"],
        ["How + adj + 主谓", "感叹句公式：How + 形容词 + 主语 + 谓语，比如 How excited we were!"],
        ["adj / n", "adj 是形容词（描述样子、心情的词，比如 wonderful）；n 是名词（人或东西的名字，比如 day）。"],
        ["主谓", "主语 + 谓语：主语是「谁」（we），谓语是「做什么 / 怎么样」（had、were）。"],
        ["连接词", "把词或句子连起来的词，比如 and、but、not only… but also…。"],
        ["not only… but also…", "不仅……而且……：Reading books is not only good for our study, but also opens a window to the world.。"],
        ["隐喻（比喻）", "打比方。读书「打开一扇通向世界的窗」，意思是读书让你看到更大的世界。"],
        ["五感法则", "写景时把看到的（look）、闻到的（smell）、听到的（are singing）都写出来，句子就有画面。"]
      ]
    },
    // ───────── 炼金术 ②：四大逻辑衔接词链 ─────────
    {
      build(k) {
        const { C, N } = k;
        N("", "为什么有的作文读起来像一盘散沙？因为句子和句子之间没有「路标」。");
        k.header("炼金术 ②  四大逻辑衔接词链", "满分作文炼金炉", false);
        N("衔接词：", "连接句子、说明前后关系的词，比如 First of all、What's more。");
        signpost(k, 28, 92, "First of all,", "第一棒：开头");
        N("逻辑路标：", "像路边的指示牌，告诉老师：现在讲第一点、在补充，还是要转折了。");
        tag(k, "普通", 180, 112, C.grey, "#f1f5f9");
        const b1 = [mline(k, "First, I will do homework.", GOLD_X, 112, 18, C.grey)];
        squig(k, b1, "First,", C.red);
        N("First of all,：", "「首先」，放在句子开头，后面加逗号。也可以用 To begin with,。");
        tag(k, "高分", 180, 146, C.green, "#d1fae5");
        const g1 = para(k, "First of all, / To begin with, I am going to finish my homework carefully.", GOLD_X, 146, GOLD_CH, 18, C.ink, 26, .04);
        k.say("First of all, I am going to finish my homework carefully.", { zh: "首先，我要认真写完作业。" });
        ring(k, g1, "First of all,", C.blue); ring(k, g1, "To begin with,", C.blue);
        // 第二棒
        N("Cohesion Chain：", "衔接链。每一句都用衔接词扣住上一句，像链子一环扣一环。");
        chainLink(k, 42, 174, 206);
        signpost(k, 28, 208, "What's more,", "第二棒：递进");
        tag(k, "普通", 180, 228, C.grey, "#f1f5f9");
        const b2 = [mline(k, "And I also help my mom.", GOLD_X, 228, 18, C.grey)];
        squig(k, b2, "And", C.red);
        N("递进：", "意思再往前进一步，「而且」。用 What's more, 或 Besides, 代替 And。");
        tag(k, "高分", 180, 262, C.green, "#d1fae5");
        const g2 = para(k, "What's more, / Besides, I often help my parents do some housework, such as sweeping the floor.", GOLD_X, 262, ["What's more, / Besides, I often help my parents do some", "housework, such as sweeping the floor."], 18, C.ink, 26, .04);
        k.say("What's more, I often help my parents do some housework, such as sweeping the floor.", { zh: "而且，我常帮父母做家务，比如扫地。" });
        ring(k, g2, "What's more,", C.blue); ring(k, g2, "Besides,", C.blue);
        N("such as：", "「比如」，后面举例子：such as sweeping the floor（比如扫地）。");
        uline(k, g2, "such as sweeping the floor", C.orange);
        // 第三棒
        chainLink(k, 42, 290, 322);
        signpost(k, 28, 324, "Although", "第三棒：转折");
        N("转折：", "前后意思相反，比如「虽然很累，但是很开心」。");
        tag(k, "普通", 180, 344, C.grey, "#f1f5f9");
        const b3 = [mline(k, "I was tired, but I was happy.", GOLD_X, 344, 18, C.grey)];
        tag(k, "高分", 180, 378, C.green, "#d1fae5");
        const g3 = para(k, "Although I felt a little tired after the trip, I learned a lot and had a great time!", GOLD_X, 378, GOLD_CH, 18, C.ink, 26, .04);
        k.say("Although I felt a little tired after the trip, I learned a lot and had a great time!", { zh: "虽然旅行后有点累，但我学到很多，玩得很开心！" });
        ring(k, g3, "Although", C.blue);
        N("黄金铁律：", "英语里 Although（虽然）和 but（但是）不能出现在同一个句子里！");
        const rx = b3[0].x + b3[0].text.length * b3[0].cw + 30;
        k.T("Although + but", rx, 344, k.go(.7), .7, { size: 16, color: C.red, weight: 900, font: MONO });
        k.T("不能同句！", rx + 14 * 9.6 + 10, 344, k.go(.5), .5, { size: 16, color: C.red, weight: 900 });
        N("", "Because（因为）和 so（所以）也一样，二选一，不能一起用！");
        const g3end = g3[1].x + g3[1].text.length * g3[1].cw + 30;
        k.T("Because + so", g3end, 404, k.go(.7), .7, { size: 16, color: C.red, weight: 900, font: MONO });
        k.T("也不能同句！", g3end + 12 * 9.6 + 10, 404, k.go(.5), .5, { size: 16, color: C.red, weight: 900 });
        // 第四棒：结尾框
        N("总结：", "最后一棒收尾：All in all,（总而言之）或 In a word,（总之），代替 At last。");
        finalBox(k, "第四棒 · 收尾：All in all, / In a word, my weekend is busy but meaningful. I can't wait for it!",
          "口诀：首先 First of all，而且 What's more，虽然 Although 不配 but，总之 All in all！");
        N("busy but meaningful：", "「忙碌但有意义」。这句只有 but、没有 Although，所以没问题。");
        N("口诀：", "首先 First of all，而且 What's more，虽然不配 but，总之 All in all！");
      },
      terms: [
        ["衔接词", "连接句子、说明前后关系的词，比如 First of all（首先）、What's more（而且）、Although（虽然）。"],
        ["逻辑路标", "比喻：衔接词像路边的指示牌，告诉读者现在是第一点、补充、转折还是总结。"],
        ["Cohesion Chain（衔接链）", "比喻：每句话用衔接词扣住上一句，像链子一环扣一环，文章就连成一整片。"],
        ["一盘散沙", "比喻：句子之间没有联系，散散的，读起来不连贯。"],
        ["First of all, / To begin with,", "首先。放在句首，后面加逗号，引出第一点。"],
        ["递进", "意思再往前进一步，表示「而且、还有」。用 What's more, 或 Besides,。"],
        ["What's more, / Besides,", "而且、另外。用来补充新的一点，代替满篇的 And。"],
        ["such as", "比如。后面举例子：such as sweeping the floor（比如扫地）。"],
        ["转折", "前后意思相反，比如「虽然累，但是开心」。"],
        ["Although", "虽然。英语里 Although 和 but 不能在同一句里一起用，只留一个。"],
        ["Because / so", "因为 / 所以。英语里也不能在同一句里一起用，二选一。"],
        ["All in all, / In a word,", "总而言之 / 总之。放在结尾，把全文收起来，代替 At last。"],
        ["busy but meaningful", "忙碌但有意义。"]
      ]
    },
    // ───────── 炼金术 ③：三大必考母题范文积木 ─────────
    {
      build(k) {
        const { C, N } = k;
        N("", "小学考场作文，95% 都逃不出三大母题：写人、写过去的经历、写计划。");
        k.header("炼金术 ③  三大必考母题", "满分作文炼金炉", false);
        N("母题：", "最常考的作文题型，像「妈妈题」，很多作文题都是它变出来的。");
        k.T("母题一：写人篇", 32, 104, k.go(.9), .9, { size: 20, color: C.brown, weight: 900 });
        N("范文积木：", "把满分范文拆成几块积木，也叫骨架。按顺序搭起来，就是一篇好文章。");
        blocks(k, ["外貌 with短语", "性格 adj", "爱好 be good at", "榜样力量"], 200, 84, [C.blue, C.purple, C.green, C.orange]);
        const p1 = para(k, "Linda is a tall and outgoing girl with big bright eyes. Not only is she polite and helpful, but she is also good at playing the piano. Whenever I have trouble with English, she always helps me patiently.", 32, 144, 92, 16, C.ink, 28, .032);
        k.say("Linda is a tall and outgoing girl with big bright eyes.", { zh: "琳达是个高个子、性格外向的女孩，有一双明亮的大眼睛。" });
        N("后置定语：", "放在名词后面修饰它。with big bright eyes 挂在 girl 后面，省掉一句话。");
        uline(k, p1, "with big bright eyes", C.blue);
        N("性格品质：", "用形容词写脾气：outgoing 外向，polite 有礼貌，helpful 乐于助人。");
        uline(k, p1, "outgoing", C.purple); uline(k, p1, "polite", C.purple); uline(k, p1, "helpful", C.purple);
        N("Not only is she…：", "「她不仅……」。Not only 放在句首时，is 要跑到 she 前面。");
        ring(k, p1, "Not only is she", C.red);
        N("be good at：", "擅长……，后面动词加 ing：good at playing the piano（擅长弹钢琴）。");
        uline(k, p1, "good at playing the piano", C.green);
        N("Whenever… always…：", "「每当……她总是……」，写出朋友帮助我的小细节，这就是榜样力量。");
        ring(k, p1, "Whenever", C.orange); ring(k, p1, "always", C.orange);
        // 母题二
        k.T("母题二：过去经历篇", 32, 272, k.go(.9), .9, { size: 20, color: C.brown, weight: 900 });
        blocks(k, ["时间·天气·交通", "上午·下午活动", "感受·感叹"], 240, 252, [C.blue, C.green, C.orange]);
        const p2 = para(k, "Last Sunday, the weather was sunny and warm. I went to the countryside with my family by car. In the morning, we picked fresh strawberries and fed the cute sheep. In the afternoon, we took many beautiful photos by the lake. Tired as we were, what a fantastic day we had!", 32, 316, 92, 16, C.ink, 30, .032);
        k.say("Last Sunday, I went to the countryside with my family by car.", { zh: "上周日，我和家人坐车去了乡下。" });
        N("过去式：", "已经发生的事，动词要变样：is→was，go→went，take→took。");
        ["was", "went", "picked", "fed", "took", "had"].forEach(w => ring(k, p2, w, C.red));
        N("", "全文动词都锁定过去式：was, went, picked, fed, took, had，一个都不能漏！");
        uline(k, p2, "In the morning,", C.green); uline(k, p2, "In the afternoon,", C.green);
        N("Tired as we were：", "「虽然我们很累」。结尾再用感叹句，像画龙点睛，一下子亮起来。");
        uline(k, p2, "Tired as we were,", C.brown); uline(k, p2, "what a fantastic day we had!", C.orange);
        N("be going to：", "母题三写计划：be going to「打算做……」，再换着用 will、plan to。");
        finalBox(k, "母题三 · 计划篇积木：打算总起(be going to) + 三项计划(First/What's more/Finally) + 期待收尾",
          "口诀：写人抓外貌·性格·爱好；写经历锁定过去式；写计划用 be going to / will / plan to / look forward to！");
        N("口诀：", "写人抓外貌性格爱好，写经历锁定过去式，写计划要换着用将来的说法！");
      },
      terms: [
        ["母题", "最常考的作文题型，像「妈妈题」，很多作文题都是从它变出来的：写人、写过去的经历、写计划。"],
        ["范文", "可以学习、模仿的好作文。"],
        ["积木 / 核心骨架", "比喻：把一篇满分作文拆成几块固定的部分，按顺序搭起来就是一篇好文章。"],
        ["外貌特征", "人长什么样，比如 tall（高的）、big bright eyes（大大的明亮眼睛）。"],
        ["性格品质", "人是什么脾气，比如 outgoing（外向的）、polite（有礼貌的）、helpful（乐于助人的）。"],
        ["with 短语 / 后置定语", "放在名词后面修饰它的词组，比如 a girl with big bright eyes（长着大眼睛的女孩），一句顶两句。"],
        ["be good at", "擅长……，后面的动词加 ing：be good at playing the piano（擅长弹钢琴）。"],
        ["Not only is she…, but she is also…", "她不仅……而且……。Not only 放在句首时，is 要跑到 she 前面。"],
        ["Whenever… always…", "每当……总是……，用来写一件常常发生的小事。"],
        ["榜样力量", "写出这个人值得学习的地方，比如总是耐心地帮助我。"],
        ["过去式", "表示已经发生的事，动词要变形：is→was，go→went，pick→picked，feed→fed，take→took，have→had。"],
        ["Tired as we were", "虽然我们很累。一种高级的「虽然」说法。"],
        ["画龙点睛", "比喻：在最关键的地方加一笔，让整篇文章一下子生动起来，比如结尾的感叹句。"],
        ["be going to / will / plan to", "都可以表示将来要做的事：打算、将会、计划。交替使用，句子更丰富。"],
        ["look forward to", "期待……：I am really looking forward to it!（我真的很期待！）"]
      ]
    }
  ];
})();
