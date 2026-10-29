// ==================== 白板脚本：⑩ 助动词「照妖镜」与五大句型变形机（4 类护卫）====================
// 版面：左列 5 个句型标签，右边一行一种句子：① 肯定 ② 否定 ③ 一般疑问 ④ 特殊疑问 ⑤ 感叹；右上角画护卫图标；底部绿框给口诀。
WB_LAB.aux_transformer = (() => {
  const SX = 150;                                        // 句子起点 x
  const ROW = { aff: 112, neg: 182, yn: 252, ans: 274, wh: 330, ex: 400 };
  // 本页签专用小工具（只在本文件里用）
  const H = k => {
    const { C, P, T, F, go, wl, ellipse, roughRect, rectD, estW } = k;
    const MONO = '"Courier New",Courier,monospace';
    const h = {
      label(text, y, color) { T(text, 22, y, go(.6), .6, { size: 17, color, weight: 900 }); },
      // 等宽句子：太长时自动缩小字号，保证不出右边界
      line(text, y, color = C.ink, size = 20) {
        size = Math.min(size, 760 / (text.length * .6));
        return k.mono(text, SX, y, +size.toFixed(1), color, 700);
      },
      // 圈出句子里第 i0 个字符起、长 len 的一段
      ringAt(m, i0, len, color = C.orange) {
        const x0 = m.x + i0 * m.cw, x1 = x0 + len * m.cw;
        P(ellipse((x0 + x1) / 2, m.y - m.size * .34, (x1 - x0) / 2 + 3, m.size * .7), go(.45), .45, { color, w: 2.5 });
        return { x0, x1, cx: (x0 + x1) / 2 };
      },
      ring(m, sub, color = C.orange, nth = 0) { return h.ringAt(m, m.at(sub, nth), sub.length, color); },
      tag(text, x, y, color = C.grey, o = {}) {
        const dur = Math.max(.6, text.length * .05);
        T(text, x, y, go(dur), dur, { size: 14, color, weight: 700, ...o });
      },
      // 弧形跳跃箭头：从 x1 跳到 x2（句子上方）
      jump(m, x1, x2, color = C.blue) {
        const yb = m.y - m.size * .85, cy = yb - 30, mx = (x1 + x2) / 2;
        const a = Math.atan2(yb - (cy + yb) / 2, x2 - (mx + x2) / 2), hl = 10;
        P(`M${x1},${yb} Q${mx},${cy} ${x2},${yb}` + ` M${x2 - hl * Math.cos(a - .5)},${yb - hl * Math.sin(a - .5)} L${x2},${yb} L${x2 - hl * Math.cos(a + .5)},${yb - hl * Math.sin(a + .5)}`,
          go(.7), .7, { color, w: 2.5 });
      },
      // 被提问的部分：灰字写出来再被红线划掉
      erase(text, x, y, note) {
        const fs = 17, w = text.length * fs * .6;
        T(note, x + w / 2, y - 22, go(.6), .6, { size: 13, color: C.purple, weight: 900, anchor: "middle" });
        T(text, x, y, go(.6), .6, { size: fs, color: C.grey, weight: 700, font: MONO });
        P(wl(x - 3, y - fs * .32, x + w + 3, y - fs * .32, .5), go(.4), .4, { color: C.red, w: 3 });
      },
      // 右上角的护卫图标
      icon(kind, word, label) {
        const cx = 900, cy = 86;
        let d;
        if (kind === "shield") d = `M${cx},${cy - 30} L${cx + 26},${cy - 20} Q${cx + 26},${cy + 14} ${cx},${cy + 30} Q${cx - 26},${cy + 14} ${cx - 26},${cy - 20} Z`;
        else if (kind === "star") {
          d = ""; for (let i = 0; i < 10; i++) { const r = i % 2 ? 13 : 30, a = -Math.PI / 2 + i * Math.PI / 5; d += (i ? " L" : "M") + (cx + Math.cos(a) * r).toFixed(1) + "," + (cy + 2 + Math.sin(a) * r).toFixed(1); } d += " Z";
        } else d = ellipse(cx, cy - 4, 24, 27);
        const fill = kind === "shield" ? "#fed7aa" : kind === "star" ? "#fde047" : "#dbeafe", col = kind === "mirror" ? C.blue : C.orange;
        if (kind === "mirror") P(wl(cx, cy + 23, cx, cy + 40, .4), go(.3), .3, { color: C.brown, w: 6 });
        P(d, go(.7), .7, { color: col, w: 2.5 });
        F(d, go(.3, 0), { color: fill, op: .95 });
        T(word, cx, cy + 8, go(.4), .4, { size: kind === "star" ? 12 : 15, color: C.ink, weight: 900, anchor: "middle", font: MONO });
        T(label, cx, cy + 58, go(.6), .6, { size: 14, color: col, weight: 900, anchor: "middle" });
      },
      // 底部绿框：口诀
      final(text) {
        P(roughRect(16, 446, 928, 50), go(1.0), 1.0, { color: C.green, w: 2.5 });
        F(rectD(16, 446, 928, 50), go(.2, 0), { color: "#d1fae5", op: .55 });
        const size = Math.min(21, 880 / (estW(text, 1)));
        T(text, 480, 478, go(1.8), 1.8, { size, color: C.green, weight: 900, anchor: "middle" });
      }
    };
    return h;
  };

  return [
    // ───────── ① be 动词护卫 ─────────
    {
      build(k) {
        const { C, N } = k, h = H(k);
        N("", "这节课：一句话怎么一键变成否定句、疑问句、感叹句？秘密在「护卫」身上。");
        k.header("第一类：be 动词护卫", "助动词照妖镜", false);
        N("五大句型变形：", "同一句话变出 5 种样子：肯定、否定、一般疑问、特殊疑问、感叹。");
        h.label("① 肯定句", ROW.aff, C.green);
        N("肯定句：", "正面说一件事的句子：她现在正在公园里拍照。");
        const a = h.line("She is taking photos in the park now.", ROW.aff);
        k.say("She is taking photos in the park now.", { zh: "她现在正在公园里拍照。" });
        h.tag("她现在正在公园里拍照。", a.x + a.text.length * a.cw + 18, ROW.aff, C.grey, { size: 15 });
        N("be 动词：", "am / is / are / was / were，意思是「是、在」。这句里的 is 就是。");
        const g = h.ring(a, "is");
        h.tag("护卫", g.cx, ROW.aff + 24, C.orange, { anchor: "middle", weight: 900 });
        N("护卫词：", "be 动词、情态动词、助动词。只有护卫能背 not，能跳到主语前面提问。");
        h.icon("shield", "is", "be 护卫");
        h.label("② 否定句", ROW.neg, C.red);
        N("否定句：", "说「不」的句子。not 直接贴在护卫 is 身后：is not = isn't。");
        const n = h.line("She is not (isn't) taking photos in the park now.", ROW.neg);
        k.say("She isn't taking photos in the park now.", { zh: "她现在没在公园里拍照。", word: "isn't" });
        h.ring(n, "not", C.red);
        h.tag("直接在护卫 is 身后贴上 not（is not = isn't）", SX, ROW.neg + 22, C.red);
        h.label("③ 一般疑问", ROW.yn, C.blue);
        N("一般疑问句：", "能用 Yes / No 回答的问句。把护卫 Is 提到主语 she 前面。");
        const q = h.line("Is she taking photos in the park now?", ROW.yn, C.blue);
        k.say("Is she taking photos in the park now?", { zh: "她现在正在公园里拍照吗？" });
        N("主语：", "句子在说「谁」，这里是 she（她）。护卫跳过主语，站到句首。");
        h.jump(q, q.x1("she") + 4, q.x0("Is") + q.cw);
        h.tag("护卫 Is 提到主语 she 前面", q.x + q.text.length * q.cw + 16, ROW.yn, C.blue, { size: 15 });
        N("", "回答也请护卫出场：Yes, she is. / No, she isn't.");
        k.mono("— Yes, she is. / No, she isn't.", SX, ROW.ans, 15, C.grey, 700);
        h.label("④ 特殊疑问", ROW.wh, C.purple);
        N("特殊疑问句：", "用疑问词开头、问具体信息的问句，不能只答 Yes / No。");
        const w = h.line("Where is she taking photos now?", ROW.wh, C.purple);
        k.say("Where is she taking photos now?", { zh: "她现在在哪里拍照？" });
        N("疑问词：", "Where 问地点。三步：换 Where → 提护卫 is → 擦掉 in the park。");
        h.ring(w, "Where", C.purple);
        h.erase("in the park", w.x + w.text.length * w.cw + 40, ROW.wh, "对地点提问 → 擦掉");
        h.tag("① 换疑问词 Where ➔ ② 提护卫 is ➔ ③ 擦掉被提问的 in the park", SX, ROW.wh + 22, C.purple);
        h.label("⑤ 感叹句", ROW.ex, C.orange);
        N("感叹句：", "表达「多么……啊！」的句子，句末用感叹号。");
        const e = h.line("What beautiful photos she is taking! / How happy she is!", ROW.ex, C.brown);
        k.say("What beautiful photos she is taking!", { zh: "她拍的照片多漂亮啊！" });
        N("What 和 How：", "感叹名词（photos）用 What 开头；感叹形容词（happy）用 How 开头。");
        k.underline(e, "What beautiful photos"); k.underline(e, "How happy");
        h.tag("What + 形容词 + 名词 + 主谓！   How + 形容词 + 主谓！", SX, ROW.ex + 27, C.orange);
        N("", "五种句子都变出来了！be 动词自己就是护卫，不用请外援 do / does / did。");
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句
        k.say("How happy she is!", { zh: "她多开心啊！", word: "How happy" });
        k.say("She is not taking photos. Is she in the park? Yes, she is. No, she isn't.", { zh: "她没在拍照。她在公园吗？是的，她在。不，她不在。", word: "She is not Yes No" });
        k.say("Taking photos in the park now.", { zh: "现在在公园里拍照。", word: "taking photos in the park now" });
        k.say("Where? What? Beautiful!", { zh: "哪里？什么？真漂亮！", word: "Where What beautiful" });
        k.say("Be: am, is, are, was, were. I am ten. They were happy.", { zh: "be 动词：am、is、are、was、were。我十岁。他们以前很开心。", word: "be am is are was were" });
        k.say("Do, does, did. Do you like it?", { zh: "do、does、did。你喜欢它吗？", word: "do does did" });
        h.final("有 be 就用 be：not 贴身后，提问跳句首，不请 do / does / did！");
        N("口诀：", "有 be 就用 be：not 贴在身后，提问跳到句首。");
      },
      terms: [
        ["五大句型变形", "同一句话变出 5 种样子：肯定句、否定句、一般疑问句、特殊疑问句、感叹句。"],
        ["护卫词", "be 动词、情态动词、助动词的统称。只有它们能在身后加 not，也只有它们能跳到主语前面提问。"],
        ["助动词", "帮忙的动词，自己没有具体意思，专门帮句子变否定和疑问，比如 do / does / did。"],
        ["照妖镜", "比喻助动词 does / did：它一出场，就把后面动词身上的 -s/-es 或过去式「照」掉，打回原形。"],
        ["be 动词", "am / is / are / was / were，意思是「是、在」。句子里有它，它就自己当护卫。"],
        ["实义动词", "有真正动作意思的动词，比如 like、play、go、watch。它们是「老百姓」，不能自己跳到主语前提问。"],
        ["主语", "句子在说「谁」或「什么」，比如 she、Leo、Mia、they。"],
        ["肯定句", "正面陈述一件事的句子，比如 She is taking photos.（她在拍照。）"],
        ["否定句", "说「不」的句子，在护卫后面加 not，比如 She is not taking photos."],
        ["一般疑问句", "能用 Yes / No 回答的问句，护卫跳到主语前面，比如 Is she taking photos?"],
        ["特殊疑问句", "用 What、Where、When、How 等疑问词开头的问句，问具体信息，不能只答 Yes / No。"],
        ["疑问词", "问具体信息的词：What 问什么、Where 问哪里、When 问什么时候、How 问怎样。"],
        ["感叹句", "表达「多么……啊！」的句子：What + 名词部分 / How + 形容词或副词，后面接主语和谓语，句末用「!」。"],
        ["原形", "动词最原本的样子，不加 -s、-es、-ed，比如 watch、go、speak。"]
      ]
    },
    // ───────── ② 情态动词大将军 ─────────
    {
      build(k) {
        const { C, N } = k, h = H(k);
        N("", "这一类句子里住着一位「大将军」，变形全靠它一个人。");
        k.header("第二类：情态动词大将军", "助动词照妖镜", false);
        h.label("① 肯定句", ROW.aff, C.green);
        N("肯定句：", "Leo can speak English very well. 里奥能把英语说得非常好。");
        const a = h.line("Leo can speak English very well.", ROW.aff);
        k.say("Leo can speak English very well.", { zh: "里奥英语说得非常好。" });
        h.tag("里奥能把英语说得非常好。", a.x + a.text.length * a.cw + 18, ROW.aff, C.grey, { size: 15 });
        N("情态动词：", "can 能、will 将要、must 必须、should 应该，表示能力、打算或要求。");
        const g = h.ring(a, "can");
        h.tag("大将军", g.cx, ROW.aff + 24, C.orange, { anchor: "middle", weight: 900 });
        h.icon("star", "can", "情态大将军");
        N("免死金牌：", "不管主语是谁，情态动词后面的动词永远用原形：can speak。");
        h.ring(a, "speak", C.green);
        h.label("② 否定句", ROW.neg, C.red);
        N("否定句：", "大将军 can 后面直接加 not，写成 cannot 或 can't。");
        const n = h.line("Leo cannot (can't) speak English very well.", ROW.neg);
        k.say("Leo can't speak English very well.", { zh: "里奥英语说得不太好。", word: "can't" });
        h.ring(n, "cannot", C.red);
        N("", "注意 can + not 要连写成 cannot。后面的 speak 还是原形。");
        h.ring(n, "speak", C.green);
        h.tag("直接在大将军 can 后加 not（cannot / can't），后面 speak 保持原形", SX, ROW.neg + 22, C.red);
        h.label("③ 一般疑问", ROW.yn, C.blue);
        N("一般疑问句：", "把大将军 Can 直接提到主语 Leo 前面，句末换成问号。");
        const q = h.line("Can Leo speak English very well?", ROW.yn, C.blue);
        k.say("Can Leo speak English very well?", { zh: "里奥英语说得很好吗？" });
        h.jump(q, q.x1("Leo") + 4, q.x0("Can") + q.cw * 1.5);
        h.tag("大将军 Can 提到主语 Leo 前面", q.x + q.text.length * q.cw + 16, ROW.yn, C.blue, { size: 15 });
        N("", "回答也用 can：Yes, he can. / No, he can't.");
        k.mono("— Yes, he can. / No, he can't.", SX, ROW.ans, 15, C.grey, 700);
        h.label("④ 特殊疑问", ROW.wh, C.purple);
        N("特殊疑问句：", "问「说什么」用 What；问「说得多好」用 How well。");
        const w = h.line("What can Leo speak very well? / How well can Leo speak English?", ROW.wh, C.purple);
        k.say("How well can Leo speak English?", { zh: "里奥英语说得怎么样？" });
        h.ring(w, "What", C.purple); h.ring(w, "How well", C.purple);
        N("", "三步：换疑问词 → 提大将军 can → 后面跟主语 + 动词原形。");
        h.tag("① 换疑问词 What ➔ ② 提大将军 can ➔ ③ 后面主语 + 动词原形", SX, ROW.wh + 22, C.purple);
        h.label("⑤ 感叹句", ROW.ex, C.orange);
        N("副词：", "说明动作「怎么样」的词，比如 well（好）。感叹副词要用 How。");
        const e = h.line("How well Leo can speak English!", ROW.ex, C.brown);
        k.say("How well Leo can speak English!", { zh: "里奥英语说得多好啊！" });
        k.underline(e, "How well");
        N("感叹句：", "How well + 主语 Leo + 谓语 can speak，主语在前，不用倒过来！");
        h.tag("How well + 主语 Leo + 谓语 can speak！", SX, ROW.ex + 27, C.orange);
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句
        k.say("Yes, he can. No, he can't.", { zh: "是的，他会。不，他不会。", word: "Yes he No" });
        k.say("What can Leo speak very well?", { zh: "里奥什么说得很好？", word: "What" });
        k.say("Leo can speak English very well.", { zh: "里奥英语说得非常好。", word: "Leo can speak English very well How" });
        k.say("Cannot. He cannot swim. Not now.", { zh: "不能。他不会游泳。现在不行。", word: "cannot not" });
        k.say("Will, must, should. You should read every day.", { zh: "将会、必须、应该。你应该每天读书。", word: "will must should" });
        h.final("情态大将军：not 贴身后，提问跳句首，后面动词永远原形！");
        N("口诀：", "大将军自己会变形：加 not、跳句首，后面动词永远原形。");
      },
      terms: [
        ["情态动词", "can（能）、will（将要）、must（必须）、should（应该）、may（可以）这类词，表示能力、打算或要求。它们也是护卫。"],
        ["大将军", "比喻情态动词：本领大，变否定、变疑问都不用请 do / does / did 帮忙。"],
        ["免死金牌", "比喻：情态动词后面的动词，不管主语是谁，永远用原形，比如 Leo can speak，不说 can speaks。"],
        ["cannot / can't", "can 的否定。can + not 要连在一起写成 cannot，口语里缩写成 can't。"],
        ["副词", "说明动作「怎么样」的词，比如 well（好）、fast（快）。感叹副词用 How：How well …!"]
      ]
    },
    // ───────── ③ 三单照妖镜 does ─────────
    {
      build(k) {
        const { C, N } = k, h = H(k);
        N("", "这一句没有护卫！动词只能去请一面照妖镜 does 来帮忙。");
        k.header("第三类：三单照妖镜 does", "助动词照妖镜", false);
        h.label("① 肯定句", ROW.aff, C.green);
        N("肯定句：", "Mia watches TV every Saturday evening. 米娅每周六晚上看电视。");
        const a = h.line("Mia watches TV every Saturday evening.", ROW.aff);
        k.say("Mia watches TV every Saturday evening.", { zh: "米娅每周六晚上看电视。", word: "watches" });
        h.tag("米娅每周六晚上看电视。", a.x + a.text.length * a.cw + 18, ROW.aff, C.grey, { size: 15 });
        N("实义动词：", "watch 是有真正动作的动词，它是「老百姓」，不能自己跑到主语前面。");
        const i = a.at("watches");
        N("第三人称单数（单三）：", "主语是一个「他 / 她 / 它」，比如 Mia，现在时的动词要加 -s / -es。");
        const g = h.ringAt(a, i + 5, 2, C.red);
        h.tag("单三勋章 -es", g.cx, ROW.aff + 24, C.red, { anchor: "middle", weight: 900 });
        N("照妖镜 does：", "请来同样带 -es 的助动词 does，它把勋章 -es 吸走，动词打回原形。");
        h.icon("mirror", "does", "照妖镜 does");
        h.label("② 否定句", ROW.neg, C.red);
        N("否定句：", "照妖镜 doesn't 出场，吸走 -es：watches 立刻变回原形 watch。");
        const n = h.line("Mia does not (doesn't) watch TV every Saturday evening.", ROW.neg);
        k.say("Mia doesn't watch TV every Saturday evening.", { zh: "米娅每周六晚上不看电视。", word: "watch" });
        h.ring(n, "does not", C.red);
        h.ring(n, "watch", C.green);
        h.tag("照妖镜 doesn't 吸走 -es，watches 打回原形 watch", SX, ROW.neg + 22, C.red);
        h.label("③ 一般疑问", ROW.yn, C.blue);
        N("一般疑问句：", "照妖镜 Does 站到句首，把 -es 吸走，后面用原形 watch。");
        const q = h.line("Does Mia watch TV every Saturday evening?", ROW.yn, C.blue);
        k.say("Does Mia watch TV every Saturday evening?", { zh: "米娅每周六晚上看电视吗？" });
        h.jump(q, q.x1("watch") + 2, q.x0("Does") + q.cw * 2);
        h.tag("Does 吸走 -es", q.x + q.text.length * q.cw + 16, ROW.yn, C.blue, { size: 15 });
        N("", "回答也用 does：Yes, she does. / No, she doesn't.");
        k.mono("— Yes, she does. / No, she doesn't.", SX, ROW.ans, 15, C.grey, 700);
        h.label("④ 特殊疑问", ROW.wh, C.purple);
        N("特殊疑问句：", "When 问「什么时候」。这里问的是 every Saturday evening。");
        const w = h.line("When does Mia watch TV?", ROW.wh, C.purple);
        k.say("When does Mia watch TV?", { zh: "米娅什么时候看电视？" });
        h.ring(w, "When", C.purple);
        h.erase("every Saturday evening", w.x + w.text.length * w.cw + 40, ROW.wh, "对时间提问 → 擦掉");
        N("黄金三步：", "换 When → 提 does → 主语后面 watches 打回原形 watch。");
        h.tag("① 换疑问词 When ➔ ② 提助动词 does ➔ ③ 主语后 watches 打回原形 watch", SX, ROW.wh + 22, C.purple);
        h.label("⑤ 感叹句", ROW.ex, C.orange);
        N("可数单数名词：", "能一个一个数、只有一个的东西，比如 an evening，前面要有 a / an。");
        const e = h.line("What a relaxing Saturday evening Mia has!", ROW.ex, C.brown);
        k.say("What a relaxing Saturday evening Mia has!", { zh: "米娅的周六晚上多轻松啊！" });
        k.underline(e, "What a relaxing Saturday evening");
        h.ringAt(e, e.at(" a ") + 1, 1, C.red);
        N("感叹句：", "What a + 形容词 + 单数名词 + 主谓：What a relaxing evening Mia has!");
        h.tag("What a + 形容词 + 单数名词 + 主谓！", SX, ROW.ex + 27, C.orange);
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句
        k.say("Mia does not watch TV. Does she? Yes, she does. No, she doesn't.", { zh: "米娅不看电视。她看吗？是的，她看。不，她不看。", word: "Mia does not doesn't Yes she No" });
        k.say("TV, every Saturday evening.", { zh: "电视，每周六晚上。", word: "TV every Saturday evening" });
        k.say("Watch, watches. Es.", { zh: "看，看（三单加 -es）。", word: "es", blocks: ["es"] });
        k.say("When? What a relaxing evening Mia has!", { zh: "什么时候？米娅的晚上多轻松啊！", word: "When What a relaxing has" });
        k.say("An apple. An hour.", { zh: "一个苹果。一小时。", word: "an" });
        h.final("单三请 does：-es 被照妖镜吸走，后面动词打回原形！");
        N("口诀：", "看到 does / doesn't，后面动词立刻打回原形，别再加 -es！");
      },
      terms: [
        ["第三人称单数（单三）", "主语是一个「他 / 她 / 它」，比如 he、she、Mia。现在时里，动词要加 -s 或 -es：Mia watches。"],
        ["单三勋章 -s/-es", "比喻：单三主语后面，动词身上挂的 -s / -es，比如 watches 的 -es。"],
        ["does / doesn't", "单三现在时用的助动词。它一出场就把 -es 吸走，后面的动词打回原形：Does Mia watch …?"],
        ["打回原形", "动词去掉 -s、-es 或过去式的变化，变回最原本的样子：watches → watch，went → go。"],
        ["可数单数名词", "能一个一个数、而且只有一个的东西，比如 an evening、a trip。前面要有 a / an。"]
      ]
    },
    // ───────── ④ 过去式照妖镜 did ─────────
    {
      build(k) {
        const { C, N } = k, h = H(k);
        N("", "这一句也没有护卫，动词还是过去式，要请过去式照妖镜 did。");
        k.header("第四类：过去式照妖镜 did", "助动词照妖镜", false);
        h.label("① 肯定句", ROW.aff, C.green);
        N("肯定句：", "They went to Sanya by plane last winter. 他们去年冬天坐飞机去了三亚。");
        const a = h.line("They went to Sanya by plane last winter.", ROW.aff);
        k.say("They went to Sanya by plane last winter.", { zh: "他们去年冬天坐飞机去了三亚。", word: "went" });
        h.tag("他们去年冬天坐飞机去了三亚。", a.x + a.text.length * a.cw + 18, ROW.aff, C.grey, { size: 15 });
        N("过去式：", "表示已经发生的事，动词要变样。went 是 go 的过去式。");
        const g = h.ring(a, "went", C.red);
        N("不规则过去式：", "不是加 -ed，而是整个词变了样，比如 go → went、buy → bought。");
        h.tag("过去式（原形 go）", g.cx, ROW.aff + 24, C.red, { anchor: "middle", weight: 900 });
        N("照妖镜 did：", "did 自己带着「过去」的标记，照到 went，它就打回原形 go。");
        h.icon("mirror", "did", "照妖镜 did");
        h.label("② 否定句", ROW.neg, C.red);
        N("否定句：", "照妖镜 didn't 出场，吸走过去时：went 瞬间变回 go。");
        const n = h.line("They did not (didn't) go to Sanya by plane last winter.", ROW.neg);
        k.say("They didn't go to Sanya by plane last winter.", { zh: "他们去年冬天没有坐飞机去三亚。", word: "go" });
        h.ring(n, "did not", C.red);
        h.ring(n, "go", C.green);
        h.tag("照妖镜 didn't 吸走过去时，went 打回原形 go", SX, ROW.neg + 22, C.red);
        h.label("③ 一般疑问", ROW.yn, C.blue);
        N("一般疑问句：", "照妖镜 Did 站到句首，后面的 went 必须还原成 go。");
        const q = h.line("Did they go to Sanya by plane last winter?", ROW.yn, C.blue);
        k.say("Did they go to Sanya by plane last winter?", { zh: "他们去年冬天坐飞机去三亚了吗？" });
        h.jump(q, q.x1("go") + 2, q.x0("Did") + q.cw * 1.5);
        h.tag("Did 站句首，went → go", q.x + q.text.length * q.cw + 16, ROW.yn, C.blue, { size: 15 });
        N("", "回答也用 did：Yes, they did. / No, they didn't.");
        k.mono("— Yes, they did. / No, they didn't.", SX, ROW.ans, 15, C.grey, 700);
        h.label("④ 特殊疑问", ROW.wh, C.purple);
        N("交通方式：", "坐什么去，比如 by plane（坐飞机）。问交通方式用 How（怎样）。");
        const w = h.line("How did they go to Sanya last winter?", ROW.wh, C.purple);
        k.say("How did they go to Sanya last winter?", { zh: "他们去年冬天怎么去的三亚？" });
        h.ring(w, "How", C.purple);
        h.erase("by plane", w.x + w.text.length * w.cw + 40, ROW.wh, "对交通方式提问");
        N("黄金三步：", "换 How → 提过去助动词 did → 主语后 went 还原为 go。");
        h.tag("① 交通方式用 How ➔ ② 提过去助动词 did ➔ ③ 主语后 went 还原为 go", SX, ROW.wh + 22, C.purple);
        h.label("⑤ 感叹句", ROW.ex, C.orange);
        N("感叹句：", "名词 trip 用 What a wonderful trip；副词 fast 用 How fast。");
        const e = h.line("What a wonderful trip they had last winter! / How fast the plane flew!", ROW.ex, C.brown);
        k.say("What a wonderful trip they had last winter!", { zh: "他们去年冬天的旅行多棒啊！" });
        k.underline(e, "What a wonderful trip"); k.underline(e, "How fast");
        N("", "感叹句里本来就是过去的事，所以 had、flew 保持过去式，不用 did。");
        h.tag("名词 trip 用 What a wonderful trip；副词 fast 用 How fast！", SX, ROW.ex + 27, C.orange);
        // R2 补朗读（2026-10-29，旧幕推广 P3）：画面上的英文词单读 + 例句
        k.say("How fast the plane flew!", { zh: "飞机飞得多快啊！", word: "How fast the flew" });
        k.say("They did not go. Did they? Yes, they did. No, they didn't.", { zh: "他们没去。他们去了吗？是的，去了。不，没去。", word: "They did not didn't Yes No" });
        k.say("To Sanya, by plane, last winter.", { zh: "去三亚，坐飞机，去年冬天。", word: "to Sanya by plane last winter" });
        k.say("What a wonderful trip they had!", { zh: "他们的旅行多棒啊！", word: "What a wonderful trip had" });
        k.say("Played, ed. Buy, bought. I bought a book.", { zh: "玩了（加 -ed）。买，买了。我买了一本书。", word: "ed buy bought", blocks: ["ed"] });
        h.final("过去请 did：过去时被照妖镜吸走，went 打回原形 go！");
        N("口诀：", "看到 did / didn't，后面动词一律打回原形！");
      },
      terms: [
        ["过去式", "表示已经发生的事，动词要变样，比如 play → played、go → went。句子里有 last winter（去年冬天）就用过去式。"],
        ["不规则过去式", "不是加 -ed，而是整个词变了样的过去式，比如 go → went、buy → bought、see → saw。"],
        ["did / didn't", "过去时用的助动词。它自己带着「过去」的标记，后面的动词要打回原形：Did they go …?"],
        ["交通方式", "坐什么去，比如 by plane（坐飞机）、by bus（坐公交）。问交通方式用 How。"]
      ]
    }
  ];
})();
