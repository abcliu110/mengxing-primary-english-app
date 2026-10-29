// ==================== 白板脚本：三大隐喻密码（身体 × 颜色 × 动物习性）3 个案例 ====================
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
// 本文件的小工具都包在 IIFE 里，避免和其他页签文件重名。
(function () {
  const MONO = '"Courier New",Courier,monospace';
  // 写一行字（自动按字数给时长）
  const tx = (k, s, x, y, o = {}) => {
    const dur = o.dur ?? Math.max(.35, [...String(s)].length * .05);
    k.T(s, x, y, k.go(dur), dur, { size: 16, color: k.C.ink, ...o });
  };
  // 卡片框：描边 + 淡色底
  const panel = (k, x, y, w, h, color, fill) => {
    k.P(k.roughRect(x, y, w, h), k.go(.45, 0), .45, { color, w: 2 });
    k.F(k.rectD(x, y, w, h), k.go(.1, .05), { color: fill, op: .55 });
  };
  // 一笔路径 + 可选涂色
  const draw = (k, d, color, dur = .4, fill, op = .9, w = 2.5) => {
    k.P(d, k.go(dur, fill ? 0 : .1), dur, { color, w });
    if (fill) k.F(d, k.go(.1, .05), { color: fill, op });
  };
  // 中文字划掉（按估算宽度）
  const strikeZh = (k, s, x, y, size = 15) => {
    const w = k.estW(s, size);
    k.P(k.wl(x - 2, y - size * .35, x + w + 2, y - size * .35, .5), k.go(.35), .35, { color: k.C.red, w: 2.5 });
  };
  // 宽卡片的文字区：英文短语 + 字面（划掉）+ 比喻
  const cardText = (k, px, py, key, keyColor, keyZh, phrase, lit, fig, litLabel = "字面：", figLabel = "比喻：") => {
    const { C } = k, x = px + 132;
    tx(k, key, x, py + 30, { size: 20, color: keyColor, weight: 900, font: MONO });
    if (keyZh) tx(k, keyZh, x + key.length * 12 + 14, py + 30, { size: 14, color: C.grey });
    tx(k, phrase, x, py + 62, { size: 17, color: C.ink, weight: 700, font: MONO });
    const lx = x + k.estW(litLabel, 15);
    tx(k, litLabel, x, py + 92, { size: 15, color: C.red, weight: 700, dur: .3 });
    tx(k, lit, lx, py + 92, { size: 15, color: C.red, weight: 700 });
    if (litLabel === "字面：") strikeZh(k, lit, lx, py + 92);
    tx(k, figLabel + fig, x, py + 122, { size: 15, color: C.green, weight: 900 });
  };

  WB_LAB.metaphor_code = [
    // ───────── ① 人体部位空间隐喻 ─────────
    {
      build(k) {
        const { C, N, P, T, F, go } = k;
        N("", "这节课：为什么山脚在英语里叫 foot of the mountain（山的脚）？");
        k.header("密码一  人体部位隐喻", "三大隐喻密码", false);
        N("隐喻：", "不说「像」，直接把一个东西叫成另一个东西。比如把山的最下面叫「脚」。");
        tx(k, "身体 = 第一把尺子", 26, 98, { size: 18, color: C.brown, weight: 900 });
        k.wait(1.6);
        // —— 小人 ——
        const cx = 70;
        N("身体尺子：", "古人用自己的身体去量万物：从头到脚，对应东西的顶、面、口、手、底。");
        const hd = k.ellipse(cx, 140, 24, 26);
        draw(k, hd, C.ink, .6, "#fde4cf", .9);
        P(k.wl(cx - 9, 135, cx - 7, 135, .2) + " " + k.wl(cx + 7, 135, cx + 9, 135, .2), go(.2), .2, { color: C.ink, w: 3.5 });
        P(`M${cx - 7},${150} Q${cx},${156} ${cx + 7},${150}`, go(.25), .25, { color: C.red, w: 2 });
        P(k.wl(cx, 166, cx, 182, .3), go(.2), .2, { color: C.ink, w: 3 });
        P(k.roughRect(cx - 22, 182, 44, 100), go(.6, 0), .6, { color: C.blue, w: 2.5 });
        F(k.rectD(cx - 22, 182, 44, 100), go(.25), { color: "#dbeafe", op: .9 });
        P(k.wl(cx - 22, 190, cx - 40, 262, .6) + " " + k.wl(cx + 22, 190, cx + 40, 262, .6), go(.5), .5, { color: C.ink, w: 3 });
        P(k.wl(cx - 12, 282, cx - 16, 386, .6) + " " + k.wl(cx + 12, 282, cx + 16, 386, .6), go(.5), .5, { color: C.ink, w: 3 });
        P(k.wl(cx - 16, 388, cx - 34, 390, .3) + " " + k.wl(cx + 16, 388, cx + 34, 390, .3), go(.3), .3, { color: C.ink, w: 4 });
        // —— 身体标签 ——
        const lab = (y, fy, fx, en, zh, col) => {
          P(k.wl(fx, fy, 128, y - 5, .4), go(.25), .25, { color: "#94a3b8", w: 1.5 });
          tx(k, en, 132, y, { size: 15, color: col, weight: 900, font: MONO });
          tx(k, zh, 132, y + 19, { size: 13, color: C.grey });
        };
        N("字面意思：", "词本来的意思，foot 就是「脚」。比喻意思：借过去用在别的东西上的意思。");
        lab(122, 118, cx + 18, "head", "最高处·统帅", C.purple);
        lab(170, 140, cx + 24, "face/eye", "表面·孔洞中心", C.orange);
        lab(218, 162, cx + 6, "mouth/neck", "出入口·窄处", C.red);
        lab(276, 262, cx + 42, "hand/arm", "指针·帮手·扶手", C.blue);
        lab(380, 388, cx + 36, "foot/leg", "最底部·支撑", C.green);
        const X0 = 290, X1 = 624, W = 324, H = 160, Y0 = 82, Y1 = 252;
        // —— A：山脚 foot ——
        N("foot（脚）：", "脚在身体最下面，所以山最下面那一圈，就叫山的脚——山脚。");
        panel(k, X0, Y0, W, H, C.green, "#ecfdf5");
        { const px = X0, py = Y0;
          draw(k, `M${px + 14},${py + 96} L${px + 66},${py + 18} L${px + 122},${py + 96}`, C.brown, .7);
          draw(k, `M${px + 50},${py + 42} L${px + 66},${py + 18} L${px + 83},${py + 43} L${px + 74},${py + 38} L${px + 66},${py + 46} L${px + 58},${py + 38} Z`, C.grey, .4, "#fff", 1, 1.5);
          P(k.wl(px + 8, py + 98, px + 128, py + 98, .5), go(.3), .3, { color: C.ink, w: 2 });
          draw(k, `M${px + 22},${py + 96} v-12 l7,-7 l7,7 v12 Z`, C.red, .35, "#fecaca", 1, 2);
          P(k.ellipse(px + 66, py + 94, 58, 12), go(.45), .45, { color: C.red, w: 2.5 });
          tx(k, "字面：脚", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：最底部", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          tx(k, "→ 山脚下", px + 145, py + 94, { size: 15, color: C.green, weight: 900 });
          tx(k, "at the foot of the mountain", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "在山脚下", px + 12, py + 150, { size: 14, color: C.grey }); }
        // —— B：钟面 face + 指针 hand ——
        N("face（脸）：", "脸是朝外给人看的那一面，所以钟朝外的那一面就叫钟面 clock face。");
        panel(k, X1, Y0, W, H, C.orange, "#fffbeb");
        { const px = X1, py = Y0, ccx = px + 66, ccy = py + 56;
          draw(k, k.ellipse(ccx, ccy, 44, 44), C.orange, .7, "#fef3c7", 1, 3);
          [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([a, b]) => P(k.wl(ccx + a * 36, ccy + b * 36, ccx + a * 42, ccy + b * 42, .2), go(.12, .02), .12, { color: C.ink, w: 3 }));
          tx(k, "字面：脸、手", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：钟面、指针", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          N("hand（手）：", "手会指方向，钟上指时间的针就叫 hand。短的那根是时针 hour hand。");
          P(k.wl(ccx, ccy, ccx, ccy - 34, .3), go(.35), .35, { color: C.ink, w: 3 });
          P(k.wl(ccx, ccy, ccx, ccy + 22, .3), go(.35), .35, { color: C.blue, w: 5 });
          tx(k, "短针指 6", px + 145, py + 94, { size: 14, color: C.blue, weight: 700 });
          tx(k, "face of a clock · hour hand", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "钟面表盘 · 时针", px + 12, py + 150, { size: 14, color: C.grey }); }
        // —— C：河口 mouth ——
        N("mouth（嘴）：", "嘴是进出的口子，河流进大海的口子就叫河口 mouth of a river。");
        panel(k, X0, Y1, W, H, C.blue, "#eff6ff");
        { const px = X0, py = Y1;
          draw(k, `M${px + 12},${py + 40} C${px + 50},${py + 34} ${px + 70},${py + 46} ${px + 92},${py + 26}`, C.blue, .45);
          draw(k, `M${px + 12},${py + 64} C${px + 50},${py + 68} ${px + 70},${py + 60} ${px + 92},${py + 84}`, C.blue, .45);
          k.F(`M${px + 12},${py + 40} C${px + 50},${py + 34} ${px + 70},${py + 46} ${px + 92},${py + 26} L${px + 128},${py + 14} L${px + 128},${py + 100} L${px + 92},${py + 84} C${px + 70},${py + 60} ${px + 50},${py + 68} ${px + 12},${py + 64} Z`, go(.3), { color: "#bfdbfe", op: .8, back: 2 });
          P(k.wave(px + 100, px + 124, py + 52, 2), go(.3), .3, { color: C.blue, w: 1.5 });
          tx(k, "大海", px + 100, py + 96, { size: 12, color: C.blue });
          P(k.ellipse(px + 92, py + 55, 13, 33), go(.45), .45, { color: C.red, w: 2.5 });
          tx(k, "字面：嘴", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：出入口", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          tx(k, "→ 河口、洞口", px + 145, py + 94, { size: 15, color: C.green, weight: 900 });
          tx(k, "mouth of a river", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "河流入海口", px + 12, py + 150, { size: 14, color: C.grey }); }
        // —— D：队首 head ——
        N("head（头）：", "头在最高、最前面，所以排在队伍最前面就是 at the head of the line。");
        panel(k, X1, Y1, W, H, C.purple, "#f5f3ff");
        { const px = X1, py = Y1;
          [0, 1, 2, 3].forEach(i => {
            const hx = px + 22 + i * 28, big = i === 0;
            P(k.ellipse(hx, py + 46, big ? 9 : 8, big ? 9 : 8), go(.2, .02), .2, { color: big ? C.purple : C.ink, w: 2.2 });
            P(k.wl(hx, py + 56, hx, py + 82, .3) + " " + k.wl(hx, py + 82, hx - 6, py + 98, .3) + " " + k.wl(hx, py + 82, hx + 6, py + 98, .3), go(.2, .02), .2, { color: big ? C.purple : C.ink, w: 2.2 });
          });
          k.miniCrown(px + 22, py + 32, C.purple);
          tx(k, "字面：头", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：最前端、带头人", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          N("headmaster：", "一所学校带头的人，也就是一校之「头」——校长。");
          tx(k, "headmaster 校长", px + 145, py + 94, { size: 15, color: C.purple, weight: 900 }); k.wait(1);
          tx(k, "at the head of the line", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "排在队首", px + 12, py + 150, { size: 14, color: C.grey }); }
        N("还有：", "针眼叫「针的眼睛」，瓶颈叫「瓶子的脖子」，帮忙叫「给我一只手」！");
        tx(k, "还有：eye of a needle 针眼 · neck of a bottle 瓶颈 · give me a hand 帮把手", 290, 432, { size: 14, color: C.grey, dur: 1.5 }); k.wait(1.6);
        N("", "连起来读一句：山脚下有一个小村庄。");
        k.final("There is a small village at the foot of the mountain.", "foot", "山脚下有一个小村庄。  从头到脚：头最高、脸朝外、嘴是口、手会指、脚在底！");
        N("口诀：", "身体就是尺子：头是顶，脸是面，嘴是口，手会指，脚是底！");
      },
      terms: [
        ["隐喻", "一种打比方的方法：不说「像」，直接把一个东西叫成另一个东西。比如把山的最下面叫 foot（脚）。"],
        ["隐喻密码", "英语里藏着的打比方规律。懂了它，就知道 foot、blue、bee 这些词为什么会有别的意思。"],
        ["字面意思", "一个词本来的、最直接的意思，比如 foot 就是「脚」，blue 就是「蓝色」。"],
        ["比喻意思（隐喻扩展）", "把词借过去用在别的东西上得到的新意思，比如 foot of the mountain 是「山脚」。页面上叫「隐喻扩展」。"],
        ["物理本源", "页面卡片上的词：这个词最早指的那个看得见、摸得着的东西，比如 hand 本来就是人的「手」。"],
        ["空间隐喻", "用身体的位置（头在上、脚在下、脸朝外）去说东西的位置，比如山脚、床头、钟面。"],
        ["习语", "固定说法，几个词合在一起有特别的意思，不能一个词一个词地翻，比如 give me a hand（帮我一把）。"],
        ["时针 / 分针", "钟上指时间的针：短的叫时针 hour hand，长的叫分针 minute hand。英语里叫它们「手」。"],
        ["瓶颈 / 入海口", "瓶颈 neck of a bottle：瓶子最细的「脖子」。入海口 mouth of a river：河流进大海的「嘴」。"],
        ["二手的 second-hand", "被别人用过、再转到你手里的东西，比如二手书。"]
      ]
    },
    // ───────── ② 色彩情绪与文化隐喻 ─────────
    {
      build(k) {
        const { C, N, P, go } = k;
        N("", "这节课：颜色词只按字面翻译，会闹大笑话！");
        k.header("密码二  颜色隐喻", "三大隐喻密码", false);
        N("文化潜台词：", "一个说法背后藏着的、外国人一听就懂的意思，字面上看不出来。");
        tx(k, "颜色词 ≠ 只是颜色：", 26, 100, { size: 18, color: C.brown, weight: 900 }); k.wait(.6);
        tx(k, "字面意思", 210, 100, { size: 18, color: C.red, weight: 900 });
        tx(k, "✗  →", 288, 100, { size: 18, color: C.red, weight: 900 });
        tx(k, "比喻意思", 336, 100, { size: 18, color: C.green, weight: 900 });
        const XA = 20, XB = 485, W = 455, H = 148, YA = 118, YB = 280;
        // —— BLUE ——
        N("feel blue：", "不是变成蓝色！蓝色像阴沉的大海、忧伤的蓝调音乐，意思是心情低落。");
        panel(k, XA, YA, W, H, C.blue, "#eff6ff");
        { const px = XA, py = YA, fx = px + 62, fy = py + 66;
          draw(k, k.ellipse(fx, fy, 38, 38), C.blue, .6, "#bfdbfe", .9, 3);
          P(k.wl(fx - 15, fy - 10, fx - 13, fy - 10, .2) + " " + k.wl(fx + 13, fy - 10, fx + 15, fy - 10, .2), go(.2), .2, { color: C.ink, w: 4 });
          P(`M${fx - 14},${fy + 18} Q${fx},${fy + 6} ${fx + 14},${fy + 18}`, go(.3), .3, { color: C.ink, w: 2.5 });
          draw(k, `M${fx + 20},${fy - 2} q-6,10 0,13 q6,-3 0,-13 Z`, C.blue, .3, "#60a5fa", 1, 1.5);
          cardText(k, px, py, "BLUE", C.blue, "蔚蓝 → 忧郁", "feel blue / look blue", "变成蓝色", "心情低落 = feel sad"); }
        // —— GREEN ——
        N("a green hand：", "不是绿色的手！绿色像刚长出的嫩芽，嫩嫩的，意思是新手、菜鸟。");
        panel(k, XB, YA, W, H, C.green, "#ecfdf5");
        { const px = XB, py = YA;
          P(`M${px + 40},${py + 124} C${px + 38},${py + 100} ${px + 44},${py + 80} ${px + 42},${py + 64}`, go(.4), .4, { color: C.green, w: 3 });
          draw(k, `M${px + 42},${py + 70} C${px + 22},${py + 52} ${px + 12},${py + 64} ${px + 14},${py + 74} C${px + 26},${py + 80} ${px + 36},${py + 78} ${px + 42},${py + 70} Z`, C.green, .4, "#86efac", 1, 2);
          draw(k, `M${px + 42},${py + 66} C${px + 58},${py + 44} ${px + 70},${py + 52} ${px + 70},${py + 60} C${px + 60},${py + 70} ${px + 50},${py + 70} ${px + 42},${py + 66} Z`, C.green, .4, "#86efac", 1, 2);
          draw(k, k.roughRect(px + 82, py + 30, 28, 82), C.ink, .5, "#334155", 1, 2);
          [0, 1, 2].forEach(i => { const d = k.ellipse(px + 96, py + 46 + i * 25, 9, 9); P(d, go(.15, 0), .15, { color: C.ink, w: 1.5 }); k.F(d, go(.15), { color: i === 2 ? "#22c55e" : "#64748b", op: 1 }); });
          cardText(k, px, py, "GREEN", C.green, "嫩芽 → 新手", "a green hand", "绿色的手", "新手、菜鸟");
          N("give the green light：", "亮绿灯 = 可以走，就是批准、同意。"); k.wait(2.4); }
        // —— BLACK TEA ——
        N("black tea：", "不是黑茶！英语看的是干茶叶，乌黑乌黑的；中文看的是泡出来的红色茶水。");
        panel(k, XA, YB, W, H, C.ink, "#f8fafc");
        { const px = XA, py = YB;
          const cup = `M${px + 22},${py + 58} L${px + 30},${py + 108} Q${px + 52},${py + 118} ${px + 74},${py + 108} L${px + 82},${py + 58} Z`;
          draw(k, cup, C.ink, .6, "#fff", 1, 2.5);
          draw(k, `M${px + 25},${py + 66} L${px + 79},${py + 66} L${px + 74},${py + 106} Q${px + 52},${py + 114} ${px + 30},${py + 106} Z`, "#b91c1c", .4, "#dc2626", .8, 1.5);
          P(`M${px + 82},${py + 70} q18,4 8,24 q-4,6 -10,6`, go(.3), .3, { color: C.ink, w: 2.5 });
          P(k.wl(px + 12, py + 124, px + 96, py + 124, .5), go(.25), .25, { color: C.ink, w: 2.5 });
          [[88, 30], [104, 44]].forEach(([dx, dy]) => draw(k, `M${px + dx},${py + dy} q8,-12 16,0 q-8,10 -16,0 Z`, C.ink, .25, "#111827", 1, 1.5));
          tx(k, "干叶黑", px + 86, py + 66, { size: 12, color: C.ink });
          tx(k, "茶水红", px + 34, py + 140, { size: 12, color: "#b91c1c", weight: 700 });
          cardText(k, px, py, "BLACK", C.ink, "黑 ≠ 红", "black tea", "黑茶", "红茶（看干茶叶的颜色）", "字面：", "其实：");
          N("中式错译：", "照着中文硬翻，把红茶说成 red tea，就错啦！"); k.wait(2.4); }
        // —— WHITE & GOLDEN ——
        N("a white lie：", "白色像干净的雪，没有坏心眼。white lie 是不伤人的善意的谎言。");
        panel(k, XB, YB, W, H, C.orange, "#fffbeb");
        { const px = XB, py = YB;
          draw(k, `M${px + 14},${py + 22} h86 q8,0 8,8 v42 q0,8 -8,8 h-56 l-14,16 v-16 h-16 q-8,0 -8,-8 v-42 q0,-8 8,-8 Z`, C.grey, .7, "#fff", 1, 2.5);
          draw(k, `M${px + 58},${py + 66} C${px + 38},${py + 52} ${px + 42},${py + 34} ${px + 58},${py + 44} C${px + 74},${py + 34} ${px + 78},${py + 52} ${px + 58},${py + 66} Z`, C.red, .4, "#fda4af", 1, 2);
          draw(k, k.ellipse(px + 88, py + 116, 20, 20), C.orange, .4, "#fde047", 1, 2.5);
          tx(k, "$", px + 83, py + 122, { size: 16, color: C.brown, weight: 900, font: MONO });
          cardText(k, px, py, "WHITE", C.grey, "& GOLDEN", "a white lie", "白色的谎言", "善意的谎言，不伤人");
          N("golden：", "金子最宝贵，golden opportunity 就是千载难逢的黄金良机。"); k.wait(2.6); }
        N("", "连起来读一句：别难过！一切都会好起来的。");
        k.final("Don't feel blue! Everything will be fine.", [], "别难过！一切都会好起来的。  蓝是忧，绿是新，黑茶是红茶，白谎是善意！");
        P(k.wl(40 + 11 * 14.4, 487, 40 + 15 * 14.4, 487, .6), go(.4), .4, { color: C.orange, w: 4 });
        N("口诀：", "颜色藏心情：蓝是忧，绿是新，黑茶是红茶，白谎是善意，金子最宝贵！");
      },
      terms: [
        ["文化潜台词", "一个说法背后藏着的意思，外国人一听就懂，但只看字面看不出来，比如 feel blue 是「心情低落」。"],
        ["色彩情绪", "用颜色说心情：blue 蓝色 = 忧郁，所以 feel blue 就是不开心。"],
        ["中式错译", "照着中文一个字一个字硬翻出来的错英语，比如把红茶说成 red tea，正确是 black tea。"],
        ["a green hand", "新手、菜鸟。绿色像刚长出的嫩芽，还很嫩，经验不足。"],
        ["give the green light", "亮绿灯 = 可以通行，引申为「批准、同意」。"],
        ["a red-letter day", "喜庆的大好日子。西方日历上节日用红字印，所以叫「红字的日子」。"],
        ["a white lie", "善意的谎言：为了不让别人难过而说的、不伤人的小谎。"],
        ["golden opportunity", "千载难逢的黄金良机，像金子一样宝贵。"]
      ]
    },
    // ───────── ③ 动物习性比喻与同级比较 ─────────
    {
      build(k) {
        const { C, N, P, T, go } = k;
        N("", "这节课：英语里超爱用动物的特点打比方，背会了写作口语都加分！");
        k.header("密码三  动物习性比喻", "三大隐喻密码", false);
        N("同级比较：", "说两样东西「一样……」，用 as + 形容词 + as：和蜜蜂一样忙。");
        const m = k.mono("as ______ as a ______", 40, 104, 24, C.ink, 900); k.wait(1.4);
        N("形容词原级：", "形容词本来的样子，不加 -er、-est，比如 busy，不能写成 busier。");
        tx(k, "形容词原级", m.x0("______") + 2, 130, { size: 14, color: C.purple, weight: 900 });
        tx(k, "动物", m.x0("______", 1) + 22, 130, { size: 14, color: C.orange, weight: 900 }); k.wait(1.6);
        N("习性：", "动物天生就有的特点，比如蜜蜂总在忙着采蜜。");
        tx(k, "动物的习性 → 人的样子", 400, 104, { size: 18, color: C.brown, weight: 900 }); k.wait(1.2);
        const XA = 20, XB = 485, W = 455, H = 140, YA = 150, YB = 300;
        // —— BEE ——
        N("as busy as a bee：", "蜜蜂一天到晚不停地采蜜，所以「像蜜蜂一样忙」就是忙得不可开交。");
        panel(k, XA, YA, W, H, C.orange, "#fffbeb");
        { const px = XA, py = YA, bx = px + 62, by = py + 78;
          draw(k, k.ellipse(bx - 10, by - 28, 16, 12), C.blue, .3, "#e0f2fe", .9, 2);
          draw(k, k.ellipse(bx + 10, by - 30, 16, 12), C.blue, .3, "#e0f2fe", .9, 2);
          draw(k, k.ellipse(bx, by, 36, 22), C.ink, .6, "#fde047", 1, 2.5);
          P(k.wl(bx - 12, by - 20, bx - 12, by + 20, .3) + " " + k.wl(bx + 6, by - 21, bx + 6, by + 21, .3), go(.3), .3, { color: C.ink, w: 5 });
          P(k.wl(bx + 22, by - 6, bx + 24, by - 6, .1), go(.1), .1, { color: C.ink, w: 4 });
          P(k.wl(bx - 36, by, bx - 46, by + 2, .2), go(.15), .15, { color: C.ink, w: 2.5 });
          cardText(k, px, py, "BEE", C.orange, "勤劳小蜜蜂", "as busy as a bee", "蜜蜂不停采蜜", "忙得不可开交", "习性：", "比喻："); }
        N("谚语：", "流传很久的老话。The early bird catches the worm：早起的鸟儿有虫吃。");
        tx(k, "谚语：The early bird catches the worm.", 400, 130, { size: 14, color: C.grey, dur: 1.4 });
        k.wait(1.3);
        // —— HORSE ——
        N("as strong as a horse：", "马跑一整天也不累，所以「像马一样壮」就是力大无穷。");
        panel(k, XB, YA, W, H, C.brown, "#fff7ed");
        { const px = XB, py = YA, h = py + 40;
          draw(k, k.ellipse(px + 56, h + 34, 34, 16), C.brown, .5, "#fcd34d", .9, 2.5);
          draw(k, `M${px + 72},${h + 24} L${px + 86},${h - 8} Q${px + 90},${h - 13} ${px + 96},${h - 8} L${px + 114},${h + 4} Q${px + 117},${h + 11} ${px + 109},${h + 11} L${px + 97},${h + 8} L${px + 88},${h + 32} Z`, C.brown, .6, "#fcd34d", .9, 2.5);
          draw(k, `M${px + 88},${h - 9} l2,-9 l5,8 Z`, C.brown, .2, "#fcd34d", .9, 2);
          P(`M${px + 84},${h - 4} Q${px + 76},${h + 6} ${px + 70},${h + 22}`, go(.25), .25, { color: C.ink, w: 3.5 });
          P(k.wl(px + 101, h + 1, px + 103, h + 1, .1), go(.1), .1, { color: C.ink, w: 3.5 });
          P([[34, 0], [46, 2], [66, 2], [78, 0]].map(([dx, dd]) => k.wl(px + dx, h + 46, px + dx - dd, h + 82, .3)).join(" "), go(.4), .4, { color: C.brown, w: 2.5 });
          P(`M${px + 22},${h + 30} q-12,10 -6,28`, go(.2), .2, { color: C.ink, w: 2.5 });
          cardText(k, px, py, "HORSE", C.brown, "强壮的骏马", "as strong as a horse", "马不知疲倦", "力大无穷、身体棒", "习性：", "比喻：");
          N("还有：", "as brave as a lion，像狮子一样勇敢。"); k.wait(2.2); }
        // —— LAMB ——
        N("as gentle as a lamb：", "小羊乖乖的、软软的，从不发脾气，所以就是温顺得像小羊。");
        panel(k, XA, YB, W, H, C.green, "#ecfdf5");
        { const px = XA, py = YB;
          draw(k, k.cloud(px + 58, py + 70, 34, 22), C.grey, .8, "#fff", 1, 2.5);
          draw(k, k.ellipse(px + 98, py + 58, 12, 10), C.ink, .3, "#e5e7eb", 1, 2);
          P([36, 50, 66, 80].map(dx => k.wl(px + dx, py + 92, px + dx, py + 114, .3)).join(" "), go(.4), .4, { color: C.ink, w: 2.5 });
          cardText(k, px, py, "LAMB", C.green, "温顺的小羊", "as gentle as a lamb", "小羊很温和", "性格温柔、很乖", "习性：", "比喻：");
          N("还有：", "black sheep 黑羊，比喻害群之马。"); k.wait(2.2); }
        // —— CATS & DOGS ——
        N("rain cats and dogs：", "是习语，不是天上掉猫和狗！意思是雨大得吓人，下倾盆大雨。");
        panel(k, XB, YB, W, H, C.blue, "#eff6ff");
        { const px = XB, py = YB;
          draw(k, k.cloud(px + 62, py + 40, 40, 18), C.grey, .7, "#cbd5e1", .9, 2.5);
          P([30, 50, 70, 90].map((dx, i) => k.wl(px + dx, py + 70 + (i % 2) * 6, px + dx - 8, py + 96 + (i % 2) * 6, .3)).join(" "), go(.4), .4, { color: C.blue, w: 2.5 });
          draw(k, `M${px + 76},${py + 112} q16,-22 32,0 Z`, C.red, .4, "#fecaca", 1, 2);
          P(`M${px + 92},${py + 112} v18 q0,5 -5,5`, go(.2), .2, { color: C.ink, w: 2 });
          cardText(k, px, py, "CAT&DOG", C.blue, "习语", "rain cats and dogs", "天上下猫下狗", "下倾盆大雨");
          N("更多习语：", "a lucky dog 幸运儿，white elephant 贵又没用的累赘。"); k.wait(2.6); }
        N("", "连起来读一句：我妈妈每天早上都忙得像只小蜜蜂！");
        k.final("My mom is as busy as a bee every morning!", "busy", "我妈妈每天早上都忙得像只小蜜蜂！  as + 形容词原级 + as + a 动物");
        N("口诀：", "as 加原级再加 as，后面放个小动物：忙像蜂，壮像马，乖像羊！");
      },
      terms: [
        ["同级比较", "说两样东西「一样……」：as + 形容词原级 + as，比如 as busy as a bee（和蜜蜂一样忙）。"],
        ["形容词原级", "形容词本来的样子，不加 -er / -est，比如 busy、strong、gentle。as…as 中间只能放原级。"],
        ["习性", "动物天生、一直有的特点，比如蜜蜂总在采蜜、马跑不累、小羊很温和。"],
        ["谚语", "流传很久、讲道理的老话，比如 The early bird catches the worm（早起的鸟儿有虫吃）。"],
        ["black sheep（害群之马）", "羊群里的黑羊，比喻一群人里最让人头疼、拖后腿的那个人。"],
        ["love me, love my dog（爱屋及乌）", "喜欢一个人，连他的狗（他身边的东西）也一起喜欢。"],
        ["white elephant", "白色大象：又贵又没用、还要花钱养着的累赘。"],
        ["看图写话", "看着图片写几句话的作文题，用上这些动物比喻会很加分。"]
      ]
    }
  ];
})();
