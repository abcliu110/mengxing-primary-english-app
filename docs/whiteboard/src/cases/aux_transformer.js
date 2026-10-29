// ==================== 白板脚本：⑩ 助动词「照妖镜」与五大句型变形机（4 类护卫）====================
// v2 升级（2026-10-30 起，决策 24）：逐案例升引擎 v2 + 讲解员（每案例：① 肯定 + ② 否定 / ③ 一般疑问 + ④ 特殊疑问 / ⑤ 感叹 + 口诀 三个镜头 → 🔮 预测 → 金句卡）；升级前整份文件原样保存在 cases/aux_transformer_classic.js。依赖 wo_props。
// 旧版面（未升级的案例仍用 H）：左列 5 个句型标签，右边一行一种句子：① 肯定 ② 否定 ③ 一般疑问 ④ 特殊疑问 ⑤ 感叹；右上角画护卫图标；底部绿框给口诀。
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

  // ───────── v2 版面（2026-10-30，决策 24）─────────
  // 讲解员站在右侧 x≈892，内容收在 x≤800：原来一屏 5 行拆成 3 个镜头（① 肯定 + ② 否定 / ③ 一般疑问 + ④ 特殊疑问 / ⑤ 感叹 + 口诀），
  // 原来写在句子右边的中文 / 说明改到句子下方；护卫图标从右上角 (900,86) 挪到 (730,150)；配色只用 V3 k.PAL（橙→蓝、紫→蓝 / 墨黑、褐→墨黑）。
  const STEPS = ["① 肯定", "② 否定", "③ 一般疑问", "④ 特殊疑问", "⑤ 感叹·口诀", "🔮 预测"];
  const R1 = 150, R2 = 290, RQ = 150, RW = 300, RE = 160;   // 各镜头里每行的基线 y
  const V = (k, D) => {
    const { P, T, F, go, wl, ellipse, roughRect, rectD, estW } = k, C = k.PAL, MONO = D.MONO;
    const h = {
      label(text, y, color) { T(text, 22, y, go(.6), .6, { size: 17, color, weight: 900 }); },
      // 等宽句子：太长时自动缩小字号，保证不越过 x=800（讲解员在右边）
      line(text, y, color = C.ink, size = 20) {
        size = Math.min(size, 650 / (text.length * .6));
        return k.mono(text, SX, y, +size.toFixed(1), color, 700);
      },
      ringAt(m, i0, len, color = C.blue) {
        const x0 = m.x + i0 * m.cw, x1 = x0 + len * m.cw;
        P(ellipse((x0 + x1) / 2, m.y - m.size * .34, (x1 - x0) / 2 + 3, m.size * .7), go(.45), .45, { color, w: 2.5 });
        return { x0, x1, cx: (x0 + x1) / 2 };
      },
      ring(m, sub, color = C.blue, nth = 0) { return h.ringAt(m, m.at(sub, nth), sub.length, color); },
      tag(text, x, y, color = C.grey, o = {}) {
        const dur = Math.max(.6, text.length * .05);
        T(text, x, y, go(dur), dur, { size: 14, color, weight: 700, ...o });
      },
      jump(m, x1, x2, color = C.blue) {
        const yb = m.y - m.size * .85, cy = yb - 30, mx = (x1 + x2) / 2;
        const a = Math.atan2(yb - (cy + yb) / 2, x2 - (mx + x2) / 2), hl = 10;
        P(`M${x1},${yb} Q${mx},${cy} ${x2},${yb}` + ` M${x2 - hl * Math.cos(a - .5)},${yb - hl * Math.sin(a - .5)} L${x2},${yb} L${x2 - hl * Math.cos(a + .5)},${yb - hl * Math.sin(a + .5)}`,
          go(.7), .7, { color, w: 2.5 });
      },
      erase(text, x, y, note) {
        const fs = 17, w = text.length * fs * .6;
        T(note, x + w / 2, y - 22, go(.6), .6, { size: 13, color: C.red, weight: 900, anchor: "middle" });
        T(text, x, y, go(.6), .6, { size: fs, color: C.grey, weight: 700, font: MONO });
        P(wl(x - 3, y - fs * .32, x + w + 3, y - fs * .32, .5), go(.4), .4, { color: C.red, w: 3 });
      },
      // 护卫图标（盾牌 / 星章 / 镜子）：v2 放在第一个镜头右上 (730,150)，不和讲解员重叠
      icon(kind, word, label, cx = 730, cy = 150) {
        let d;
        if (kind === "shield") d = `M${cx},${cy - 30} L${cx + 26},${cy - 20} Q${cx + 26},${cy + 14} ${cx},${cy + 30} Q${cx - 26},${cy + 14} ${cx - 26},${cy - 20} Z`;
        else if (kind === "star") {
          d = ""; for (let i = 0; i < 10; i++) { const r = i % 2 ? 13 : 30, a = -Math.PI / 2 + i * Math.PI / 5; d += (i ? " L" : "M") + (cx + Math.cos(a) * r).toFixed(1) + "," + (cy + 2 + Math.sin(a) * r).toFixed(1); } d += " Z";
        } else d = ellipse(cx, cy - 4, 24, 27);
        const fill = kind === "star" ? C.hlYellow : C.tintBlue, col = kind === "star" ? C.ink : C.blue;
        const g = k.group();
        if (kind === "mirror") P(wl(cx, cy + 23, cx, cy + 40, .4), go(.3), .3, { color: C.ink, w: 6 });
        P(d, go(.7), .7, { color: col, w: 2.5 });
        F(d, go(.3, 0), { color: fill, op: .95 });
        T(word, cx, cy + 8, go(.4), .4, { size: kind === "star" ? 12 : 15, color: C.ink, weight: 900, anchor: "middle", font: MONO });
        k.endGroup(); k.pop(g, go(.01, 0), .5, { cx, cy });
        D.adopt(g); D.back();
        T(label, cx, cy + 58, go(.6), .6, { size: 14, color: C.blue, weight: 900, anchor: "middle" });
      },
      // 底部绿框：口诀（横跨全宽 16–944，出现前讲解员先退到 x=1010）
      final(text) {
        P(roughRect(16, 446, 928, 50), go(1.0), 1.0, { color: C.green, w: 2.5 });
        F(rectD(16, 446, 928, 50), go(.2, 0), { color: C.tintGreen, op: .55 });
        const size = Math.min(21, 880 / (estW(text, 1)));
        T(text, 480, 478, go(1.8), 1.8, { size, color: C.green, weight: 900, anchor: "middle" });
      },
      // 🔮 预测题框
      quiz(zhLine, ask) {
        P(roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
        F(rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
        T(zhLine, 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
        T(ask, 64, 286, go(1), 1, { size: 21, color: C.ink, weight: 900, font: MONO });
      },
      reveal(text) { T(text, 64, 330, go(1), 1, { size: 22, color: C.green, weight: 900, font: MONO }); },
      // 闪光（相机快门 / 场景小动效）：中心 (x,y)，先画好藏起来（要在朗读之前调用，否则笔画还没画完）；h.blink(g, t) 在 t 时刻闪一下
      flash(x, y) {
        const g = D.sub(); let d = "";
        for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r0 = 7, r1 = i % 2 ? 13 : 19; d += ` M${(x + Math.cos(a) * r0).toFixed(1)},${(y + Math.sin(a) * r0).toFixed(1)} L${(x + Math.cos(a) * r1).toFixed(1)},${(y + Math.sin(a) * r1).toFixed(1)}`; }
        k.hide(g);
        P(d.trim(), go(.05, 0), .05, { color: C.ink, w: 2.2 });
        F(ellipse(x, y, 6, 6), go(.05, 0), { color: C.hlYellow, op: 1 });
        D.back();
        return g;
      },
      // 镜头 3 回顾：前 4 种句子灰色小字排成一列（都是前面已经朗读过的原句）
      recap(lines) {
        lines.forEach((t, i) => { const tx = "①②③④"[i] + " " + t, dur = Math.max(.6, tx.length * .03); T(tx, SX, 236 + i * 40, go(dur), dur, { size: 16, color: C.grey, weight: 700, font: MONO }); });
      },
      blink(g, t) { k.fade(g, t, .12, 1); k.fade(g, t + .45, .25, 0); }
    };
    return h;
  };

  return [
    // ───────── ① be 动词护卫（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/aux_transformer_classic.js（R1 零丢失）。原一屏 5 行拆成 3 个镜头 + 🔮 预测 + 金句卡；
    // R4：场景里的「她」读到 taking photos 时举起相机（take 📷 卡）、快门闪两下；预测题读到 reading 时讲解员捧书读。
    {
      build(k) {
        k.v2();
        const { N } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = V(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "这节课：一句话怎么一键变成否定句、疑问句、感叹句？秘密在「护卫」身上。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "助动词照妖镜", sub: "第一类：be 动词护卫", badges: ["💡", "✂️"], steps: STEPS });
        k.wait(.4);

        // ───── 镜头 1 · ① 肯定句 + ② 否定句 ─────
        D.step(0); D.shot();
        N("五大句型变形：", "同一句话变出 5 种样子：肯定、否定、一般疑问、特殊疑问、感叹。");
        h.label("① 肯定句", R1, C.green);
        N("肯定句：", "正面说一件事的句子：她现在正在公园里拍照。");
        const a = h.line("She is taking photos in the park now.", R1);
        // 场景：公园里的「她」举起相机拍照（R4 taking photos）
        const gS = D.sub();
        const she = k.actor("traveler", { x: 470, y: 440, s: .75, f: 1, g: gS });
        const cam = k.prop("card", 0, 0, { text: "📷", hidden: true, g: gS });
        D.back();
        const fl = h.flash(548, 350);
        k.wait(.3);
        const syA = sayAt("She is taking photos in the park now.", { zh: "她现在正在公园里拍照。" });
        k.act(she, "take", syA.t, Math.max(1.6, syA.dur), { prop: cam, words: ["taking"] });
        h.blink(fl, syA.t + syA.dur * .55); h.blink(fl, syA.t + syA.dur * .55 + .8);
        k.actFx(["photos"], syA.t + syA.dur * .5, Math.max(1, syA.dur * .5), "快门闪两下（咔嚓拍照）");
        h.tag("她现在正在公园里拍照。", SX, R1 + 50, C.grey, { size: 15 });
        N("be 动词：", "am / is / are / was / were，意思是「是、在」。这句里的 is 就是。");
        const g = h.ring(a, "is");
        k.act(me, "point", S.at - .5, 1.2, { at: [g.cx, R1 - 8] });
        h.tag("护卫", g.cx, R1 + 24, C.blue, { anchor: "middle", weight: 900 });
        N("护卫词：", "be 动词、情态动词、助动词。只有护卫能背 not，能跳到主语前面提问。");
        h.icon("shield", "is", "be 护卫");
        k.say("Be: am, is, are, was, were. I am ten. They were happy.", { zh: "be 动词：am、is、are、was、were。我十岁。他们以前很开心。", word: "be am is are was were" });
        D.step(1);
        h.label("② 否定句", R2, C.red);
        N("否定句：", "说「不」的句子。not 直接贴在护卫 is 身后：is not = isn't。");
        const n = h.line("She is not (isn't) taking photos in the park now.", R2);
        k.say("She isn't taking photos in the park now.", { zh: "她现在没在公园里拍照。", word: "isn't" });
        h.ring(n, "not", C.red);
        k.act(me, "point", S.at - .3, 1.2, { at: [n.x0("not") + 18, R2 - 8] });
        h.tag("直接在护卫 is 身后贴上 not（is not = isn't）", SX, R2 + 22, C.red);
        k.say("Taking photos in the park now.", { zh: "现在在公园里拍照。", word: "taking photos in the park now" });
        k.wait(.6);
        D.wipe();

        // ───── 镜头 2 · ③ 一般疑问 + ④ 特殊疑问 ─────
        D.step(2); D.shot();
        h.label("③ 一般疑问", RQ, C.blue);
        N("一般疑问句：", "能用 Yes / No 回答的问句。把护卫 Is 提到主语 she 前面。");
        const q = h.line("Is she taking photos in the park now?", RQ, C.blue);
        k.say("Is she taking photos in the park now?", { zh: "她现在正在公园里拍照吗？" });
        N("主语：", "句子在说「谁」，这里是 she（她）。护卫跳过主语，站到句首。");
        h.jump(q, q.x1("she") + 4, q.x0("Is") + q.cw);
        k.act(me, "point", S.at - .7, 1.2, { at: [q.x0("Is") + 12, RQ - 30] });
        h.tag("护卫 Is 提到主语 she 前面", SX, RQ + 24, C.blue, { size: 15 });
        N("", "回答也请护卫出场：Yes, she is. / No, she isn't.");
        k.mono("— Yes, she is. / No, she isn't.", SX, RQ + 54, 15, C.grey, 700);
        k.say("She is not taking photos. Is she in the park? Yes, she is. No, she isn't.", { zh: "她没在拍照。她在公园吗？是的，她在。不，她不在。", word: "She is not Yes No" });
        D.step(3);
        h.label("④ 特殊疑问", RW, C.ink);
        N("特殊疑问句：", "用疑问词开头、问具体信息的问句，不能只答 Yes / No。");
        const w = h.line("Where is she taking photos now?", RW, C.ink);
        k.say("Where is she taking photos now?", { zh: "她现在在哪里拍照？" });
        N("疑问词：", "Where 问地点。三步：换 Where → 提护卫 is → 擦掉 in the park。");
        h.ring(w, "Where", C.blue);
        h.erase("in the park", w.x + w.text.length * w.cw + 40, RW, "对地点提问 → 擦掉");
        k.act(me, "surprised", S.at - .4, 1);
        h.tag("① 换疑问词 Where ➔ ② 提护卫 is ➔ ③ 擦掉被提问的 in the park", SX, RW + 22, C.blue);
        k.wait(.6);
        D.wipe();

        // ───── 镜头 3 · ⑤ 感叹句 + 口诀 ─────
        D.step(4); D.shot();
        h.label("⑤ 感叹句", RE, C.ink);
        N("感叹句：", "表达「多么……啊！」的句子，句末用感叹号。");
        const e = h.line("What beautiful photos she is taking! / How happy she is!", RE, C.ink);
        k.say("What beautiful photos she is taking!", { zh: "她拍的照片多漂亮啊！" });
        N("What 和 How：", "感叹名词（photos）用 What 开头；感叹形容词（happy）用 How 开头。");
        k.underline(e, "What beautiful photos", 0, C.green); k.underline(e, "How happy", 0, C.green);
        h.tag("What + 形容词 + 名词 + 主谓！   How + 形容词 + 主谓！", SX, RE + 27, C.green);
        k.say("How happy she is!", { zh: "她多开心啊！", word: "How happy" });
        k.act(me, "cheer", S.at - 1.4, 1.2);
        k.say("Where? What? Beautiful!", { zh: "哪里？什么？真漂亮！", word: "Where What beautiful" });
        N("", "五种句子都变出来了！be 动词自己就是护卫，不用请外援 do / does / did。");
        h.recap(["She is taking photos in the park now.", "She is not (isn't) taking photos in the park now.", "Is she taking photos in the park now?", "Where is she taking photos now?"]);
        k.act(me, "point", S.at - .8, 1.2, { at: [300, 300] });
        k.say("Do, does, did. Do you like it?", { zh: "do、does、did。你喜欢它吗？", word: "do does did" });
        // 口诀横跨全宽：讲解员先退到右边
        k.act(me, "walk", S.at, 1, { to: 1010 });
        k.wait(1);
        h.final("有 be 就用 be：not 贴身后，提问跳句首，不请 do / does / did！");
        N("口诀：", "有 be 就用 be：not 贴在身后，提问跳到句首。");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(5); D.shot();
        k.act(me, "walk", S.at, 1.2, { to: 892 });
        N("预测：", "「他正在看书」变成一般疑问句：护卫是谁？它该跳到哪里？先想 3 秒！");
        h.quiz("🔮 他正在看书。He is reading a book.", "→  ___ he reading a book?");
        sayAt("He is reading a book.", { zh: "他正在看书。", word: "he reading book" });
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "护卫 is 跳到主语 he 前面，句首大写：Is he reading a book?");
        const tRev = k.go(.3);
        h.reveal("Is he reading a book?");
        k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
        const bk = k.prop("book", 0, 0, { hidden: true });
        const syP = sayAt("Is he reading a book?", { zh: "他正在看书吗？", word: "is he reading a book" });
        k.act(me, "read", syP.t, Math.max(1.4, syP.dur), { prop: bk, words: ["reading"] });
        D.hold(1.5);

        k.quoteCard({ insight: "be 动词自己就是护卫：\n变否定贴 not，变疑问跳句首，不用请外援", rhyme: "口诀：有 be 就用 be：not 贴身后，\n提问跳句首，不请 do / does / did！", hlLines: 2, foot: "🪞 助动词照妖镜 · 第一类 be 动词护卫" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2.5);
        D.finish(.45);
      },
      actionWords: [
        { word: "taking", act: "场景里的「她」在读到「She is taking photos in the park now」时拿起相机（take 📷 卡）" },
        { word: "photos", act: "同一句里快门闪两下（场景动作 actFx），表示咔嚓拍照" },
        { word: "reading", act: "预测题揭晓读到「Is he reading a book?」时讲解员捧书读（read）" },
      ],
      terms: [
        ["可信度徽章", "💡 护卫、大将军、照妖镜、勋章都是帮助记忆的比喻；✂️ 简化说法：「只有护卫能背 not、能跳到主语前面提问」说的是小学阶段常见的句子。"],
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
    // ───────── ② 情态动词大将军（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/aux_transformer_classic.js（R1 零丢失）。原一屏 5 行拆成 3 个镜头 + 🔮 预测 + 金句卡；
    // R4：场景里的 Leo 读到 speak 时挥手开口、头顶冒出说话气泡；读到 read 时讲解员捧书读；预测题读到 jump 时讲解员跳起来。
    {
      build(k) {
        k.v2();
        const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = V(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "这一类句子里住着一位「大将军」，变形全靠它一个人。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "助动词照妖镜", sub: "第二类：情态动词大将军", badges: ["💡", "✂️"], steps: STEPS });
        k.wait(.4);

        // ───── 镜头 1 · ① 肯定句 + ② 否定句 ─────
        D.step(0); D.shot();
        h.label("① 肯定句", R1, C.green);
        N("肯定句：", "Leo can speak English very well. 里奥能把英语说得非常好。");
        const a = h.line("Leo can speak English very well.", R1);
        // 场景：Leo 开口说英语（R4 speak）——挥手 + 说话气泡
        const gL = D.sub();
        const leo = k.actor("traveler", { x: 470, y: 440, s: .75, f: 1, g: gL });
        D.back();
        const gB = D.sub();
        const bub = "M534,346 Q534,334 546,334 L638,334 Q650,334 650,346 L650,368 Q650,380 638,380 L546,380 Q534,380 534,368 L534,366 L512,360 L534,356 Z";
        k.hide(gB);
        P(bub, go(.05, 0), .05, { color: C.ink, w: 2.2 }); F(bub, go(.05, 0), { color: "#ffffff", op: 1 });
        T("Hello!", 592, 364, go(.05, 0), .05, { size: 18, color: C.blue, weight: 900, anchor: "middle", font: D.MONO });
        D.back();
        k.wait(.3);
        const syA = sayAt("Leo can speak English very well.", { zh: "里奥英语说得非常好。" });
        k.act(leo, "wave", syA.t, Math.max(1.6, syA.dur), { words: ["speak"] });
        const syH = sayAt("Hello! I can speak English.", { zh: "你好！我会说英语。", word: "hello" });
        k.fade(gB, syH.t, .25, 1); k.pop(gB, syH.t, .4, { cx: 592, cy: 357 }); k.fade(gB, syH.t + syH.dur + .6, .3, 0);
        k.act(leo, "wave", syH.t, Math.max(1.6, syH.dur), { words: ["speak"] });
        h.tag("里奥能把英语说得非常好。", SX, R1 + 50, C.grey, { size: 15 });
        N("情态动词：", "can 能、will 将要、must 必须、should 应该，表示能力、打算或要求。");
        const g = h.ring(a, "can");
        k.act(me, "point", S.at - .5, 1.2, { at: [g.cx, R1 - 8] });
        h.tag("大将军", g.cx, R1 + 24, C.blue, { anchor: "middle", weight: 900 });
        h.icon("star", "can", "情态大将军");
        N("免死金牌：", "不管主语是谁，情态动词后面的动词永远用原形：can speak。");
        h.ring(a, "speak", C.green);
        k.say("Will, must, should. You should read every day.", { zh: "将会、必须、应该。你应该每天读书。", word: "will must should" });
        const bk = k.prop("book", 0, 0, { hidden: true });
        { const sy = S.says[S.says.length - 1]; k.act(me, "read", sy.t + sy.dur * .5, Math.max(1.4, sy.dur * .5), { prop: bk, words: ["read"] }); }
        D.step(1);
        h.label("② 否定句", R2, C.red);
        N("否定句：", "大将军 can 后面直接加 not，写成 cannot 或 can't。");
        const n = h.line("Leo cannot (can't) speak English very well.", R2);
        k.say("Leo can't speak English very well.", { zh: "里奥英语说得不太好。", word: "can't" });
        h.ring(n, "cannot", C.red);
        k.act(me, "point", S.at - .3, 1.2, { at: [n.x0("cannot") + 30, R2 - 8] });
        N("", "注意 can + not 要连写成 cannot。后面的 speak 还是原形。");
        h.ring(n, "speak", C.green);
        h.tag("直接在大将军 can 后加 not（cannot / can't），后面 speak 保持原形", SX, R2 + 22, C.red);
        k.say("Cannot. He cannot swim. Not now.", { zh: "不能。他不会游泳。现在不行。", word: "cannot not" });
        k.wait(.6);
        D.wipe();

        // ───── 镜头 2 · ③ 一般疑问 + ④ 特殊疑问 ─────
        D.step(2); D.shot();
        h.label("③ 一般疑问", RQ, C.blue);
        N("一般疑问句：", "把大将军 Can 直接提到主语 Leo 前面，句末换成问号。");
        const q = h.line("Can Leo speak English very well?", RQ, C.blue);
        k.say("Can Leo speak English very well?", { zh: "里奥英语说得很好吗？" });
        h.jump(q, q.x1("Leo") + 4, q.x0("Can") + q.cw * 1.5);
        k.act(me, "point", S.at - .7, 1.2, { at: [q.x0("Can") + 18, RQ - 30] });
        h.tag("大将军 Can 提到主语 Leo 前面", SX, RQ + 24, C.blue, { size: 15 });
        N("", "回答也用 can：Yes, he can. / No, he can't.");
        k.mono("— Yes, he can. / No, he can't.", SX, RQ + 54, 15, C.grey, 700);
        k.say("Yes, he can. No, he can't.", { zh: "是的，他会。不，他不会。", word: "Yes he No" });
        D.step(3);
        h.label("④ 特殊疑问", RW, C.ink);
        N("特殊疑问句：", "问「说什么」用 What；问「说得多好」用 How well。");
        const w = h.line("What can Leo speak very well? / How well can Leo speak English?", RW, C.ink);
        k.say("How well can Leo speak English?", { zh: "里奥英语说得怎么样？" });
        h.ring(w, "What", C.blue); h.ring(w, "How well", C.blue);
        k.say("What can Leo speak very well?", { zh: "里奥什么说得很好？", word: "What" });
        N("", "三步：换疑问词 → 提大将军 can → 后面跟主语 + 动词原形。");
        h.tag("① 换疑问词 What ➔ ② 提大将军 can ➔ ③ 后面主语 + 动词原形", SX, RW + 22, C.blue);
        k.act(me, "nod", S.at - .6, .8);
        k.wait(.6);
        D.wipe();

        // ───── 镜头 3 · ⑤ 感叹句 + 口诀 ─────
        D.step(4); D.shot();
        h.label("⑤ 感叹句", RE, C.ink);
        N("副词：", "说明动作「怎么样」的词，比如 well（好）。感叹副词要用 How。");
        const e = h.line("How well Leo can speak English!", RE, C.ink);
        k.say("How well Leo can speak English!", { zh: "里奥英语说得多好啊！" });
        k.underline(e, "How well", 0, C.green);
        k.act(me, "cheer", S.at - 1.4, 1.2);
        N("感叹句：", "How well + 主语 Leo + 谓语 can speak，主语在前，不用倒过来！");
        h.tag("How well + 主语 Leo + 谓语 can speak！", SX, RE + 27, C.green);
        h.recap(["Leo can speak English very well.", "Leo cannot (can't) speak English very well.", "Can Leo speak English very well?", "What can Leo speak very well? / How well can Leo speak English?"]);
        k.say("Leo can speak English very well.", { zh: "里奥英语说得非常好。", word: "Leo can speak English very well How" });
        k.act(me, "point", S.at - 1.2, 1.2, { at: [300, 300] });
        // 口诀横跨全宽：讲解员先退到右边
        k.act(me, "walk", S.at, 1, { to: 1010 });
        k.wait(1);
        h.final("情态大将军：not 贴身后，提问跳句首，后面动词永远原形！");
        N("口诀：", "大将军自己会变形：加 not、跳句首，后面动词永远原形。");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(5); D.shot();
        k.act(me, "walk", S.at, 1.2, { to: 892 });
        N("预测：", "「她能跳得很高」变成一般疑问句：大将军 can 该站到哪里？jump 要不要变？先想 3 秒！");
        h.quiz("🔮 她能跳得很高。She can jump high.", "→  ___ she jump high?");
        sayAt("She can jump high.", { zh: "她能跳得很高。", word: "she jump high" });
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "大将军 Can 跳到句首，jump 还是原形：Can she jump high?");
        const tRev = go(.3);
        h.reveal("Can she jump high?");
        k.sfx("ding", tRev + .9);
        const syP = sayAt("Can she jump high?", { zh: "她能跳得很高吗？", word: "can she jump high" });
        k.act(me, "jump", syP.t, Math.max(1.2, syP.dur), { words: ["jump"] });
        k.act(me, "cheer", syP.t + Math.max(1.2, syP.dur) + .1, 1.2);
        D.hold(1.5);

        k.quoteCard({ insight: "情态动词是大将军：自己会变形，\n后面的动词永远用原形", rhyme: "口诀：情态大将军：not 贴身后，\n提问跳句首，后面动词永远原形！", hlLines: 2, foot: "🪞 助动词照妖镜 · 第二类 情态动词大将军" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2.5);
        D.finish(.45);
      },
      actionWords: [
        { word: "speak", act: "场景里的 Leo 在读到「Leo can speak English very well」「Hello! I can speak English」时挥手开口（wave），第二句头顶冒出说话气泡" },
        { word: "read", act: "读到「You should read every day」时讲解员捧书读（read）" },
        { word: "jump", act: "预测题揭晓读到「Can she jump high?」时讲解员跳起来（jump）" },
      ],
      terms: [
        ["可信度徽章", "💡 护卫、大将军、照妖镜、勋章都是帮助记忆的比喻；✂️ 简化说法：「只有护卫能背 not、能跳到主语前面提问」说的是小学阶段常见的句子。"],
        ["情态动词", "can（能）、will（将要）、must（必须）、should（应该）、may（可以）这类词，表示能力、打算或要求。它们也是护卫。"],
        ["大将军", "比喻情态动词：本领大，变否定、变疑问都不用请 do / does / did 帮忙。"],
        ["免死金牌", "比喻：情态动词后面的动词，不管主语是谁，永远用原形，比如 Leo can speak，不说 can speaks。"],
        ["cannot / can't", "can 的否定。can + not 要连在一起写成 cannot，口语里缩写成 can't。"],
        ["副词", "说明动作「怎么样」的词，比如 well（好）、fast（快）。感叹副词用 How：How well …!"]
      ]
    },
    // ───────── ③ 三单照妖镜 does（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/aux_transformer_classic.js（R1 零丢失）。原一屏 5 行拆成 3 个镜头 + 🔮 预测 + 金句卡；
    // R4：场景里的 Mia 读到 watches / watch 时坐在小凳上看电视（sit，电视屏幕闪动）；预测题读到 plays / play 时讲解员跳起来（踢球）。
    {
      build(k) {
        k.v2();
        const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = V(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "这一句没有护卫！动词只能去请一面照妖镜 does 来帮忙。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "助动词照妖镜", sub: "第三类：三单照妖镜 does", badges: ["💡", "✂️"], steps: STEPS });
        k.wait(.4);

        // ───── 镜头 1 · ① 肯定句 + ② 否定句 ─────
        D.step(0); D.shot();
        h.label("① 肯定句", R1, C.green);
        N("肯定句：", "Mia watches TV every Saturday evening. 米娅每周六晚上看电视。");
        const a = h.line("Mia watches TV every Saturday evening.", R1);
        // 场景：电视 + 小凳子 + Mia（R4 watch：坐下看电视，屏幕闪动）
        const tv = k.roughRect(300, 342, 120, 72);
        P(tv, go(.5), .5, { color: C.ink, w: 2.5 }); F(k.rectD(300, 342, 120, 72), go(.1, 0), { color: C.tintInk, op: 1 });
        P(k.wl(330, 414, 320, 440, .3) + " " + k.wl(390, 414, 400, 440, .3) + " " + k.wl(280, 440, 600, 440, .6), go(.4), .4, { color: C.ink, w: 2.2 });
        P(k.wl(500, 399, 548, 399, .3) + " " + k.wl(506, 399, 504, 440, .3) + " " + k.wl(542, 399, 544, 440, .3), go(.4), .4, { color: C.ink, w: 2.5 });
        const gTV = D.sub();
        k.hide(gTV);
        F(k.rectD(306, 348, 108, 60), go(.05, 0), { color: C.tintBlue, op: 1 });
        P(k.ellipse(345, 370, 10, 10) + " " + k.wave(368, 404, 392, 4), go(.05, 0), .05, { color: C.blue, w: 2.2 });
        P(k.wl(330, 395, 392, 360, .3), go(.05, 0), .05, { color: C.green, w: 2.2 });
        D.back();
        const gM = D.sub();
        const mia = k.actor("traveler", { x: 580, y: 440, s: .75, f: -1, g: gM });
        D.back();
        k.wait(.3);
        const syA = sayAt("Mia watches TV every Saturday evening.", { zh: "米娅每周六晚上看电视。", word: "watches" });
        k.act(mia, "walk", syA.t, .9, { to: 524 });
        const syW = sayAt("Watch, watches. Es.", { zh: "看，看（三单加 -es）。", word: "es", blocks: ["es"] });
        k.act(mia, "sit", syA.t + .9, syW.t + syW.dur - syA.t - .4, { words: ["watches", "watch"] });
        k.fade(gTV, syA.t + .6, .3, 1); k.fade(gTV, syW.t + syW.dur + .2, .3, 0);
        k.actFx(["watches", "watch"], syA.t + .6, syW.t + syW.dur - syA.t - .4, "电视屏幕亮起、画面闪动");
        h.tag("米娅每周六晚上看电视。", SX, R1 + 50, C.grey, { size: 15 });
        N("实义动词：", "watch 是有真正动作的动词，它是「老百姓」，不能自己跑到主语前面。");
        const i = a.at("watches");
        N("第三人称单数（单三）：", "主语是一个「他 / 她 / 它」，比如 Mia，现在时的动词要加 -s / -es。");
        const g = h.ringAt(a, i + 5, 2, C.red);
        k.act(me, "point", S.at - .5, 1.2, { at: [g.cx, R1 - 8] });
        h.tag("单三勋章 -es", g.cx, R1 + 24, C.red, { anchor: "middle", weight: 900 });
        N("照妖镜 does：", "请来同样带 -es 的助动词 does，它把勋章 -es 吸走，动词打回原形。");
        h.icon("mirror", "does", "照妖镜 does");
        D.step(1);
        h.label("② 否定句", R2, C.red);
        N("否定句：", "照妖镜 doesn't 出场，吸走 -es：watches 立刻变回原形 watch。");
        const n = h.line("Mia does not (doesn't) watch TV every Saturday evening.", R2);
        k.say("Mia doesn't watch TV every Saturday evening.", { zh: "米娅每周六晚上不看电视。", word: "watch" });
        h.ring(n, "does not", C.red);
        h.ring(n, "watch", C.green);
        k.act(me, "point", S.at - .3, 1.2, { at: [n.x0("watch") + 20, R2 - 8] });
        h.tag("照妖镜 doesn't 吸走 -es，watches 打回原形 watch", SX, R2 + 22, C.red);
        k.wait(.6);
        D.wipe();

        // ───── 镜头 2 · ③ 一般疑问 + ④ 特殊疑问 ─────
        D.step(2); D.shot();
        h.label("③ 一般疑问", RQ, C.blue);
        N("一般疑问句：", "照妖镜 Does 站到句首，把 -es 吸走，后面用原形 watch。");
        const q = h.line("Does Mia watch TV every Saturday evening?", RQ, C.blue);
        k.say("Does Mia watch TV every Saturday evening?", { zh: "米娅每周六晚上看电视吗？" });
        h.jump(q, q.x1("watch") + 2, q.x0("Does") + q.cw * 2);
        k.act(me, "point", S.at - .7, 1.2, { at: [q.x0("Does") + 24, RQ - 30] });
        h.tag("Does 吸走 -es", SX, RQ + 24, C.blue, { size: 15 });
        N("", "回答也用 does：Yes, she does. / No, she doesn't.");
        k.mono("— Yes, she does. / No, she doesn't.", SX, RQ + 54, 15, C.grey, 700);
        k.say("Mia does not watch TV. Does she? Yes, she does. No, she doesn't.", { zh: "米娅不看电视。她看吗？是的，她看。不，她不看。", word: "Mia does not doesn't Yes she No" });
        D.step(3);
        h.label("④ 特殊疑问", RW, C.ink);
        N("特殊疑问句：", "When 问「什么时候」。这里问的是 every Saturday evening。");
        const w = h.line("When does Mia watch TV?", RW, C.ink);
        k.say("When does Mia watch TV?", { zh: "米娅什么时候看电视？" });
        h.ring(w, "When", C.blue);
        h.erase("every Saturday evening", w.x + w.text.length * w.cw + 40, RW, "对时间提问 → 擦掉");
        k.act(me, "surprised", S.at - .4, 1);
        N("黄金三步：", "换 When → 提 does → 主语后面 watches 打回原形 watch。");
        h.tag("① 换疑问词 When ➔ ② 提助动词 does ➔ ③ 主语后 watches 打回原形 watch", SX, RW + 22, C.blue);
        k.say("TV, every Saturday evening.", { zh: "电视，每周六晚上。", word: "TV every Saturday evening" });
        k.wait(.6);
        D.wipe();

        // ───── 镜头 3 · ⑤ 感叹句 + 口诀 ─────
        D.step(4); D.shot();
        h.label("⑤ 感叹句", RE, C.ink);
        N("可数单数名词：", "能一个一个数、只有一个的东西，比如 an evening，前面要有 a / an。");
        const e = h.line("What a relaxing Saturday evening Mia has!", RE, C.ink);
        k.say("What a relaxing Saturday evening Mia has!", { zh: "米娅的周六晚上多轻松啊！" });
        k.underline(e, "What a relaxing Saturday evening", 0, C.green);
        h.ringAt(e, e.at(" a ") + 1, 1, C.red);
        k.act(me, "point", S.at - .4, 1.2, { at: [e.x + (e.at(" a ") + 1.5) * e.cw, RE - 8] });
        N("感叹句：", "What a + 形容词 + 单数名词 + 主谓：What a relaxing evening Mia has!");
        h.tag("What a + 形容词 + 单数名词 + 主谓！", SX, RE + 27, C.green);
        k.say("An apple. An hour.", { zh: "一个苹果。一小时。", word: "an" });
        k.say("When? What a relaxing evening Mia has!", { zh: "什么时候？米娅的晚上多轻松啊！", word: "When What a relaxing has" });
        h.recap(["Mia watches TV every Saturday evening.", "Mia does not (doesn't) watch TV every Saturday evening.", "Does Mia watch TV every Saturday evening?", "When does Mia watch TV?"]);
        k.act(me, "point", S.at - .8, 1.2, { at: [300, 300] });
        k.wait(.6);
        // 口诀横跨全宽：讲解员先退到右边
        k.act(me, "walk", S.at, 1, { to: 1010 });
        k.wait(1);
        h.final("单三请 does：-es 被照妖镜吸走，后面动词打回原形！");
        N("口诀：", "看到 does / doesn't，后面动词立刻打回原形，别再加 -es！");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(5); D.shot();
        k.act(me, "walk", S.at, 1.2, { to: 892 });
        N("预测：", "「他每天踢足球」变成一般疑问句：句首请谁来？plays 要变成什么？先想 3 秒！");
        h.quiz("🔮 他每天踢足球。He plays football every day.", "→  ___ he ___ football every day?  ( play )");
        const syS = sayAt("He plays football every day.", { zh: "他每天踢足球。", word: "he plays football every day" });
        k.act(me, "jump", syS.t + syS.dur * .3, Math.max(1, syS.dur * .7), { words: ["plays"] });
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "照妖镜 Does 站句首，吸走 -s：plays 打回原形 play。Does he play football every day?");
        const tRev = go(.3);
        h.reveal("Does he play football every day?");
        k.sfx("ding", tRev + .9);
        const syP = sayAt("Does he play football every day?", { zh: "他每天踢足球吗？", word: "does play" });
        k.act(me, "jump", syP.t + syP.dur * .3, Math.max(1, syP.dur * .7), { words: ["play"] });
        k.act(me, "cheer", syP.t + syP.dur + .1, 1.2);
        D.hold(1.5);

        k.quoteCard({ insight: "句子里没有护卫，就请 does 来帮忙；\n-es 被 does 吸走，动词打回原形", rhyme: "口诀：单三请 does：-es 被照妖镜吸走，\n后面动词打回原形！", hlLines: 2, foot: "🪞 助动词照妖镜 · 第三类 三单照妖镜 does" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2.5);
        D.finish(.45);
      },
      actionWords: [
        { word: "watches", act: "场景里的 Mia 读到「Mia watches TV every Saturday evening」时走到小凳前坐下看电视（walk + sit），电视屏幕亮起闪动（actFx）" },
        { word: "watch", act: "接着读「Watch, watches」时 Mia 继续坐着看电视" },
        { word: "plays", act: "预测题读到「He plays football every day」时讲解员跳起来（jump，踢球）" },
        { word: "play", act: "揭晓读到「Does he play football every day?」时讲解员再跳一次（jump）" },
      ],
      terms: [
        ["可信度徽章", "💡 护卫、大将军、照妖镜、勋章都是帮助记忆的比喻；✂️ 简化说法：「只有护卫能背 not、能跳到主语前面提问」说的是小学阶段常见的句子。"],
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
