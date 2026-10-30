// ==================== 白板脚本：三大隐喻密码（身体 × 颜色 × 动物习性）3 个案例 ====================
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
// 本文件的小工具都包在 IIFE 里，避免和其他页签文件重名。
// v2 升级（2026-10-30，决策 24）：3 个案例都升引擎 v2 + 讲解员（右下 892）+ 五步进度 + 镜头拆分（原 2×2 卡片一屏放不下 x≤800，
// 拆成「两张卡一个镜头」）+ 结尾连读 / 结论框（宽度收进 x≤800，代替旧 k.final）+ 🔮 预测 + 金句卡。
// 升级前整份文件原样保存在 cases/metaphor_code_classic.js。依赖 wo_props。
// 配色只用 V3 k.PAL：旧 brown / purple / orange 改 ink / blue / red；卡片底色改 tint*；皮肤色、蜂黄、马棕、茶红是道具色（SOP §9 允许）。
// 旧颜色值（只留作 R1 对照）："#fde4cf" "#dbeafe" "#94a3b8" "#ecfdf5" "#fff" "#fecaca" "#fffbeb" "#fef3c7" "#bfdbfe" "#eff6ff" "#f5f3ff"
//   "#60a5fa" "#86efac" "#334155" "#22c55e" "#64748b" "#b91c1c" "#dc2626" "#111827" "#f8fafc" "#fda4af" "#fde047" "#e0f2fe" "#fff7ed" "#fcd34d" "#e5e7eb" "#cbd5e1"
(function () {
  const MONO = '"Courier New",Courier,monospace';
  const BADGE_TERM = ["可信度徽章", "💡 身体尺子、颜色心情、动物习性都是帮助记忆的说法（隐喻本身是真实存在的英语用法）；✂️ 简化说法：每个隐喻背后的来历往往不止一种解释，这里只讲最好懂的一种，具体用法以词典为准。"];
  // 写一行字（自动按字数给时长）
  const tx = (k, s, x, y, o = {}) => {
    const dur = o.dur ?? Math.max(.35, [...String(s)].length * .05);
    k.T(s, x, y, k.go(dur), dur, { size: 16, color: k.PAL.ink, ...o });
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
    k.P(k.wl(x - 2, y - size * .35, x + w + 2, y - size * .35, .5), k.go(.35), .35, { color: k.PAL.red, w: 2.5 });
  };
  // 宽卡片的文字区：英文短语 + 字面（划掉）+ 比喻
  const cardText = (k, px, py, key, keyColor, keyZh, phrase, lit, fig, litLabel = "字面：", figLabel = "比喻：") => {
    const C = k.PAL, x = px + 132;
    tx(k, key, x, py + 30, { size: 20, color: keyColor, weight: 900, font: MONO });
    if (keyZh) tx(k, keyZh, x + key.length * 12 + 14, py + 30, { size: 14, color: C.grey });
    tx(k, phrase, x, py + 62, { size: 17, color: C.ink, weight: 700, font: MONO });
    const lx = x + k.estW(litLabel, 15);
    tx(k, litLabel, x, py + 92, { size: 15, color: C.red, weight: 700, dur: .3 });
    tx(k, lit, lx, py + 92, { size: 15, color: C.red, weight: 700 });
    if (litLabel === "字面：") strikeZh(k, lit, lx, py + 92);
    tx(k, figLabel + fig, x, py + 122, { size: 15, color: C.green, weight: 900 });
  };
  // 开场：讲解员从右边走进来挥手 + 统一片头 + 进度条
  const intro = (k, D, o) => {
    const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
    k.N("", o.open);
    k.act(me, "walk", .3, 1.6, { to: 892 });
    k.act(me, "wave", 2.0, 1.8);
    D.scene({ title: o.title, sub: o.sub, badges: ["💡", "✂️"], steps: o.steps, cardDur: 3.6 });
    return me;
  };
  // 结论框（代替旧 k.final：宽度收在 x≤800），重点词下面画红线，然后朗读
  const finalBox = (k, text, crown, zhLine, o = {}) => {
    const C = k.PAL, size = Math.min(22, 740 / (text.length * .6)), cw = size * .6, bw = Math.min(784, Math.max(380, text.length * cw + 48));
    k.P(k.roughRect(16, 448, bw, 48), k.go(.9), .9, { color: C.green, w: 2 });
    k.F(k.rectD(16, 448, bw, 48), k.go(.2, 0), { color: C.tintGreen, op: .55 });
    const dur = Math.max(1.6, text.length * .04);
    k.T(text, 40, 479, k.go(dur), dur, { size, color: C.green, weight: 900, font: MONO });
    (Array.isArray(crown) ? crown : [crown]).forEach(wd => {
      const i = (" " + text + " ").search(new RegExp("[ ,]" + wd + "[ ,.!]"));
      if (i >= 0) k.P(k.wl(40 + i * cw, 487, 40 + (i + wd.length) * cw, 487, .6), k.go(.4), .4, { color: C.red, w: 4 });
    });
    k.T(zhLine, 40, 524, k.go(1.4), 1.4, { size: Math.min(17, 760 / Math.max(1, k.estW(zhLine, 1))), color: C.grey });
    k.say(o.say ?? text, { zh: o.zh ?? String(zhLine || "").split(/\s{2,}/)[0], word: o.word });
    return k.S.says[k.S.says.length - 1];
  };
  // 复习小卡：一排英文词卡（都已单独朗读过）
  const chips = (k, words, y, color) => {
    const C = k.PAL; let x = 24;
    words.forEach(w => {
      const fs = 17, cw = w.length * fs * .6 + 22;
      k.P(k.roughRect(x, y - 22, cw, 32), k.go(.25, 0), .25, { color, w: 2 });
      k.F(k.rectD(x, y - 22, cw, 32), k.go(.12, 0), { color: color === C.green ? C.tintGreen : color === C.red ? C.tintRed : C.tintBlue, op: .95 });
      k.T(w, x + cw / 2, y, k.go(.3, .05), .3, { size: fs, color, weight: 900, anchor: "middle", font: MONO });
      x += cw + 12;
    });
    return x;
  };
  // 🔮 预测题：题框 + 想 3 秒 + 揭晓 + 朗读（照 adj_order 先例）
  const quiz = (k, D, me, q) => {
    const C = k.PAL, S = k.S, { P, F, T, go } = k;
    D.shot();
    k.N("预测：", q.ask);
    P(k.roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
    F(k.rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
    T("🔮 " + q.zh, 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
    T(q.line, 64, 286, go(1), 1, { size: Math.min(21, 720 / (q.line.length * .6)), color: C.ink, weight: 900, font: MONO });
    k.act(me, "think", S.at, 3.1);
    D.hold(3);
    k.N("揭晓：", q.why);
    const tRev = go(.3);
    T(q.ans, 64, 330, go(1), 1, { size: Math.min(22, 720 / (q.ans.length * .6)), color: C.green, weight: 900, font: MONO });
    k.sfx("ding", tRev + .9);
    const ok = k.prop("card", 0, 0, { text: "✔", hidden: true });
    k.say(q.ansSay, { zh: q.ansZh, word: q.word });
    const sy = S.says[S.says.length - 1];
    k.act(me, "holdCard", sy.t + sy.wd, Math.max(1.4, sy.dur - sy.wd + .3), { prop: ok });
    k.act(me, "cheer", sy.t + sy.dur + .4, 1.2);
    D.hold(1.4);
  };
  const ending = (k, D, me, o) => {
    k.quoteCard({ insight: o.insight, rhyme: o.rhyme, hlLines: 2, foot: "🔐 三大隐喻密码 · " + o.foot });
    k.act(me, "nod", k.S.at - 1.2, 1); k.expr(me, "proud", k.S.at - 1.2, 9);
    D.hold(2);
    D.finish(.45);
  };

  WB_LAB.metaphor_code = [
    // ───────── ① 人体部位空间隐喻 ─────────
    {
      build(k) {
        k.v2();
        const { N, P, F, go } = k, C = k.PAL, S = k.S, D = WO_PROPS(k);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        let ry = 200;   // 连读镜头：每读一句，先把这句写在板上（都是原有朗读句）
        const rs = (en, o, extra) => { tx(k, en, 24, ry, { size: 15, color: C.ink, font: MONO, dur: .6 }); ry += 32; return sayAt(en, extra ? { ...o, word: o.word + " " + extra } : o); };   // extra：板上写出的句子里其余要单读的词
        const me = intro(k, D, { open: "这节课：为什么山脚在英语里叫 foot of the mountain（山的脚）？", title: "密码一  人体部位隐喻", sub: "三大隐喻密码",
          steps: ["① 身体尺子", "② 脚·脸·手", "③ 嘴·头", "④ 连读", "🔮 预测"] });

        // ───── 镜头 1 · 身体 = 第一把尺子 ─────
        D.step(0); D.shot();
        N("隐喻：", "不说「像」，直接把一个东西叫成另一个东西。比如把山的最下面叫「脚」。");
        tx(k, "身体 = 第一把尺子", 26, 128, { size: 18, color: C.ink, weight: 900 });
        k.wait(1.6);
        const cx = 70, Y = 30;   // 小人整体下移 30，让出进度条
        N("身体尺子：", "古人用自己的身体去量万物：从头到脚，对应东西的顶、面、口、手、底。");
        const hd = k.ellipse(cx, 140 + Y, 24, 26);
        draw(k, hd, C.ink, .6, "#fde3cf", .9);
        P(k.wl(cx - 9, 135 + Y, cx - 7, 135 + Y, .2) + " " + k.wl(cx + 7, 135 + Y, cx + 9, 135 + Y, .2), go(.2), .2, { color: C.ink, w: 3.5 });
        P(`M${cx - 7},${150 + Y} Q${cx},${156 + Y} ${cx + 7},${150 + Y}`, go(.25), .25, { color: C.red, w: 2 });
        P(k.wl(cx, 166 + Y, cx, 182 + Y, .3), go(.2), .2, { color: C.ink, w: 3 });
        P(k.roughRect(cx - 22, 182 + Y, 44, 100), go(.6, 0), .6, { color: C.blue, w: 2.5 });
        F(k.rectD(cx - 22, 182 + Y, 44, 100), go(.25), { color: C.tintBlue, op: .9 });
        P(k.wl(cx - 22, 190 + Y, cx - 40, 262 + Y, .6) + " " + k.wl(cx + 22, 190 + Y, cx + 40, 262 + Y, .6), go(.5), .5, { color: C.ink, w: 3 });
        P(k.wl(cx - 12, 282 + Y, cx - 16, 386 + Y, .6) + " " + k.wl(cx + 12, 282 + Y, cx + 16, 386 + Y, .6), go(.5), .5, { color: C.ink, w: 3 });
        P(k.wl(cx - 16, 388 + Y, cx - 34, 390 + Y, .3) + " " + k.wl(cx + 16, 388 + Y, cx + 34, 390 + Y, .3), go(.3), .3, { color: C.ink, w: 4 });
        // —— 身体标签 ——
        const lab = (y, fy, fx, en, zh, col) => {
          P(k.wl(fx, fy + Y, 128, y - 5 + Y, .4), go(.25), .25, { color: C.grey, w: 1.5 });
          tx(k, en, 132, y + Y, { size: 15, color: col, weight: 900, font: MONO });
          tx(k, zh, 132, y + 19 + Y, { size: 13, color: C.grey });
          k.act(me, "point", S.at - .5, .8, { at: [132, y + Y] });
        };
        N("字面意思：", "词本来的意思，foot 就是「脚」。比喻意思：借过去用在别的东西上的意思。");
        lab(122, 118, cx + 18, "head", "最高处·统帅", C.blue);
        lab(170, 140, cx + 24, "face/eye", "表面·孔洞中心", C.red);
        lab(218, 162, cx + 6, "mouth/neck", "出入口·窄处", C.red);
        lab(276, 262, cx + 42, "hand/arm", "指针·帮手·扶手", C.blue);
        lab(380, 388, cx + 36, "foot/leg", "最底部·支撑", C.green);
        // 右边：从上到下一根「身体尺子」——顶 / 面 / 口 / 手 / 底
        P(k.wl(330, 160, 330, 410, .5), go(.6), .6, { color: C.ink, w: 3 });
        [["顶", 160, C.blue], ["面", 210, C.red], ["口", 260, C.red], ["手", 320, C.blue], ["底", 410, C.green]].forEach(([z, y, col]) => {
          P(k.wl(320, y, 340, y, .2), go(.15), .15, { color: C.ink, w: 3 });
          tx(k, z, 352, y + 6, { size: 18, color: col, weight: 900, dur: .3 });
        });
        k.wait(.8);
        D.wipe();

        // ───── 镜头 2 · 山脚 foot + 钟面 face / 指针 hand ─────
        D.step(1); D.shot();
        const X0 = 24, X1 = 412, W = 370, H = 160, Y0 = 130;
        N("foot（脚）：", "脚在身体最下面，所以山最下面那一圈，就叫山的脚——山脚。");
        panel(k, X0, Y0, W, H, C.green, C.tintGreen);
        { const px = X0, py = Y0;
          draw(k, `M${px + 14},${py + 96} L${px + 66},${py + 18} L${px + 122},${py + 96}`, C.ink, .7);
          draw(k, `M${px + 50},${py + 42} L${px + 66},${py + 18} L${px + 83},${py + 43} L${px + 74},${py + 38} L${px + 66},${py + 46} L${px + 58},${py + 38} Z`, C.grey, .4, "#ffffff", 1, 1.5);
          P(k.wl(px + 8, py + 98, px + 128, py + 98, .5), go(.3), .3, { color: C.ink, w: 2 });
          draw(k, `M${px + 22},${py + 96} v-12 l7,-7 l7,7 v12 Z`, C.red, .35, C.tintRed, 1, 2);
          P(k.ellipse(px + 66, py + 94, 58, 12), go(.45), .45, { color: C.red, w: 2.5 });
          k.act(me, "point", S.at - .6, 1, { at: [px + 66, py + 94] });
          tx(k, "字面：脚", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：最底部", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          tx(k, "→ 山脚下", px + 145, py + 94, { size: 15, color: C.green, weight: 900 });
          tx(k, "at the foot of the mountain", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "在山脚下", px + 12, py + 150, { size: 14, color: C.grey }); }
        k.say("My home is at the foot of the hill.", { zh: "我家在小山脚下。", word: "foot" });
        N("face（脸）：", "脸是朝外给人看的那一面，所以钟朝外的那一面就叫钟面 clock face。");
        panel(k, X1, Y0, W, H, C.red, C.tintRed);
        let tHand = 0;
        { const px = X1, py = Y0, ccx = px + 66, ccy = py + 56;
          draw(k, k.ellipse(ccx, ccy, 44, 44), C.red, .7, "#ffffff", 1, 3);
          [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([a, b]) => P(k.wl(ccx + a * 36, ccy + b * 36, ccx + a * 42, ccy + b * 42, .2), go(.12, .02), .12, { color: C.ink, w: 3 }));
          tx(k, "字面：脸、手", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：钟面、指针", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          N("hand（手）：", "手会指方向，钟上指时间的针就叫 hand。短的那根是时针 hour hand。");
          P(k.wl(ccx, ccy, ccx, ccy - 34, .3), go(.35), .35, { color: C.ink, w: 3 });
          const gh = D.sub();   // 时针单独一组：读到「points to three」时转到 3
          P(k.wl(ccx, ccy, ccx, ccy + 22, .3), go(.35), .35, { color: C.blue, w: 5 });
          D.back();
          tx(k, "短针指 6", px + 145, py + 94, { size: 14, color: C.blue, weight: 700 });
          tx(k, "face of a clock · hour hand", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "钟面表盘 · 时针", px + 12, py + 150, { size: 14, color: C.grey });
          const sy = sayAt("Look at the clock face. The hour hand points to three.", { zh: "看钟面，时针指着三。", word: "clock face" });
          k.act(me, "point", sy.t, Math.max(1.4, sy.dur * .5), { at: [ccx, ccy], words: ["look"] });
          tHand = sy.t + sy.dur * .55;
          k.rot(gh, tHand, .8, -90, ccx, ccy);   // 时针从 6 转到 3（逆时针 90°）
          k.actFx([], tHand, .8, "时针转到 3");
          tx(k, "→ 转到 3", px + 250, py + 94, { size: 14, color: C.blue, weight: 700, dur: .4 }); }
        k.wait(.6);
        D.wipe();

        // ───── 镜头 3 · 河口 mouth + 队首 head ─────
        D.step(2); D.shot();
        N("mouth（嘴）：", "嘴是进出的口子，河流进大海的口子就叫河口 mouth of a river。");
        panel(k, X0, Y0, W, H, C.blue, C.tintBlue);
        { const px = X0, py = Y0;
          draw(k, `M${px + 12},${py + 40} C${px + 50},${py + 34} ${px + 70},${py + 46} ${px + 92},${py + 26}`, C.blue, .45);
          draw(k, `M${px + 12},${py + 64} C${px + 50},${py + 68} ${px + 70},${py + 60} ${px + 92},${py + 84}`, C.blue, .45);
          k.F(`M${px + 12},${py + 40} C${px + 50},${py + 34} ${px + 70},${py + 46} ${px + 92},${py + 26} L${px + 128},${py + 14} L${px + 128},${py + 100} L${px + 92},${py + 84} C${px + 70},${py + 60} ${px + 50},${py + 68} ${px + 12},${py + 64} Z`, go(.3), { color: C.sea, op: .8, back: 2 });
          P(k.wave(px + 100, px + 124, py + 52, 2), go(.3), .3, { color: C.blue, w: 1.5 });
          tx(k, "大海", px + 100, py + 96, { size: 12, color: C.blue });
          P(k.ellipse(px + 92, py + 55, 13, 33), go(.45), .45, { color: C.red, w: 2.5 });
          k.act(me, "point", S.at - .6, 1, { at: [px + 92, py + 55] });
          tx(k, "字面：嘴", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：出入口", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          tx(k, "→ 河口、洞口", px + 145, py + 94, { size: 15, color: C.green, weight: 900 });
          tx(k, "mouth of a river", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "河流入海口", px + 12, py + 150, { size: 14, color: C.grey }); }
        N("head（头）：", "头在最高、最前面，所以排在队伍最前面就是 at the head of the line。");
        panel(k, X1, Y0, W, H, C.blue, C.tintBlue);
        { const px = X1, py = Y0;
          [0, 1, 2, 3].forEach(i => {
            const hx = px + 22 + i * 28, big = i === 0;
            P(k.ellipse(hx, py + 46, big ? 9 : 8, big ? 9 : 8), go(.2, .02), .2, { color: big ? C.blue : C.ink, w: 2.2 });
            P(k.wl(hx, py + 56, hx, py + 82, .3) + " " + k.wl(hx, py + 82, hx - 6, py + 98, .3) + " " + k.wl(hx, py + 82, hx + 6, py + 98, .3), go(.2, .02), .2, { color: big ? C.blue : C.ink, w: 2.2 });
          });
          k.miniCrown(px + 22, py + 32, C.blue);
          tx(k, "字面：头", px + 145, py + 38, { size: 15, color: C.red, weight: 700 });
          tx(k, "比喻：最前端、带头人", px + 145, py + 66, { size: 15, color: C.green, weight: 900 });
          N("headmaster：", "一所学校带头的人，也就是一校之「头」——校长。");
          tx(k, "headmaster 校长", px + 145, py + 94, { size: 15, color: C.blue, weight: 900 }); k.wait(1);
          tx(k, "at the head of the line", px + 12, py + 128, { size: 16, color: C.ink, font: MONO });
          tx(k, "排在队首", px + 12, py + 150, { size: 14, color: C.grey }); }
        N("还有：", "针眼叫「针的眼睛」，瓶颈叫「瓶子的脖子」，帮忙叫「给我一只手」！");
        tx(k, "还有：eye of a needle 针眼 · neck of a bottle 瓶颈 · give me a hand 帮把手", 24, 336, { size: 15, color: C.grey, dur: 1.5 }); k.wait(1.6);
        k.wait(.4);
        D.wipe();

        // ───── 镜头 4 · 连读 + 结论 ─────
        D.step(3); D.shot();
        N("", "连起来读一句：山脚下有一个小村庄。");
        // R2 补朗读（2026-10-29，旧幕推广：人体 / 颜色 / 动物隐喻按 MASTER_DESIGN 留在本页签，先补）
        chips(k, ["head", "face", "mouth", "hand", "foot"], 150, C.blue);
        const syB = rs("Head, face, mouth, hand, foot.", { zh: "头、脸、嘴、手、脚。", word: "head face mouth hand foot" });
        k.act(me, "point", syB.t, syB.dur, { at: [200, 140] });
        rs("The face of a clock. The hour hand.", { zh: "钟面。时针。", word: "the face of a clock hour face of a clock" });
        rs("The mouth of a river. The headmaster is at the head of the line.", { zh: "河口。校长站在队伍最前面。", word: "mouth of a river river headmaster at head line at the head of the line" });
        rs("The eye of a needle. The neck of a bottle.", { zh: "针眼。瓶颈。", word: "eye needle neck bottle eye of a needle neck of a bottle" });
        // give me a hand：讲解员伸手托一把（「帮把手」由人演出来）
        const syG = rs("Can you give me a hand?", { zh: "你能帮我一下吗？", word: "give me a hand" }, "Can you");
        k.act(me, "support", syG.t, Math.max(1.4, syG.dur), { words: ["give"] });
        rs("Arm, leg. There is a small village at the foot of the mountain.", { zh: "胳膊、腿。山脚下有一个小村庄。", word: "mountain arm leg There is small village" });
        const syF = finalBox(k, "There is a small village at the foot of the mountain.", "foot", "山脚下有一个小村庄。  从头到脚：头最高、脸朝外、嘴是口、手会指、脚在底！");
        k.act(me, "cheer", syF.t + syF.dur * .6, 1.3);
        N("口诀：", "身体就是尺子：头是顶，脸是面，嘴是口，手会指，脚是底！");
        k.wait(.4);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(4);
        quiz(k, D, me, { zh: "床头（床最靠头的那一端）", ask: "「床头」英语怎么说？用 head 还是 foot？先想 3 秒！", line: "→  the ___ of the bed  ( head / foot )",
          why: "睡觉时头放的那一端，就是床的「头」：the head of the bed。", ans: "the head of the bed", ansSay: "My cat sleeps at the head of the bed.", ansZh: "我的猫睡在床头。", word: "the head of the bed bed" });
        ending(k, D, me, { insight: "身体是人类的第一把尺子：\n英语用头、脸、嘴、手、脚去叫万物的各个部位", rhyme: "口诀：身体就是尺子 ——\n头是顶，脸是面，嘴是口，手会指，脚是底！", foot: "人体部位" });
      },
      actionWords: [{ word: "look", act: "point" }, { word: "give", act: "support" }],   // Look at the clock face → 讲解员指钟面；give me a hand → 讲解员伸手托一把；points to three 用时针转到 3 的场景动作表现
      terms: [
        BADGE_TERM,
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
        k.v2();
        const { N, P, go } = k, C = k.PAL, S = k.S, D = WO_PROPS(k);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        let ry = 200;   // 连读镜头：每读一句，先把这句写在板上（都是原有朗读句）
        const rs = (en, o, extra) => { tx(k, en, 24, ry, { size: 15, color: C.ink, font: MONO, dur: .6 }); ry += 32; return sayAt(en, extra ? { ...o, word: o.word + " " + extra } : o); };   // extra：板上写出的句子里其余要单读的词
        const me = intro(k, D, { open: "这节课：颜色词只按字面翻译，会闹大笑话！", title: "密码二  颜色隐喻", sub: "三大隐喻密码",
          steps: ["① 蓝·绿", "② 黑·白", "③ 连读", "④ 结论", "🔮 预测"] });
        const XA = 24, XB = 412, W = 370, H = 148, YA = 150;

        // ───── 镜头 1 · 颜色词 ≠ 只是颜色 + BLUE + GREEN ─────
        D.step(0); D.shot();
        N("文化潜台词：", "一个说法背后藏着的、外国人一听就懂的意思，字面上看不出来。");
        tx(k, "颜色词 ≠ 只是颜色：", 26, 128, { size: 18, color: C.ink, weight: 900 }); k.wait(.6);
        tx(k, "字面意思", 210, 128, { size: 18, color: C.red, weight: 900 });
        tx(k, "✗  →", 288, 128, { size: 18, color: C.red, weight: 900 });
        tx(k, "比喻意思", 336, 128, { size: 18, color: C.green, weight: 900 });
        N("feel blue：", "不是变成蓝色！蓝色像阴沉的大海、忧伤的蓝调音乐，意思是心情低落。");
        panel(k, XA, YA, W, H, C.blue, C.tintBlue);
        { const px = XA, py = YA, fx = px + 62, fy = py + 66;
          draw(k, k.ellipse(fx, fy, 38, 38), C.blue, .6, C.sea, .9, 3);
          P(k.wl(fx - 15, fy - 10, fx - 13, fy - 10, .2) + " " + k.wl(fx + 13, fy - 10, fx + 15, fy - 10, .2), go(.2), .2, { color: C.ink, w: 4 });
          P(`M${fx - 14},${fy + 18} Q${fx},${fy + 6} ${fx + 14},${fy + 18}`, go(.3), .3, { color: C.ink, w: 2.5 });
          draw(k, `M${fx + 20},${fy - 2} q-6,10 0,13 q6,-3 0,-13 Z`, C.blue, .3, C.blue, 1, 1.5);
          cardText(k, px, py, "BLUE", C.blue, "蔚蓝 → 忧郁", "feel blue / look blue", "变成蓝色", "心情低落 = feel sad"); }
        const syBl = sayAt("I feel blue today.", { zh: "我今天心情不好。", word: "feel blue" });
        k.expr(me, "oops", syBl.t, Math.max(1.2, syBl.dur));
        N("a green hand：", "不是绿色的手！绿色像刚长出的嫩芽，嫩嫩的，意思是新手、菜鸟。");
        panel(k, XB, YA, W, H, C.green, C.tintGreen);
        let gLight;
        { const px = XB, py = YA;
          P(`M${px + 40},${py + 124} C${px + 38},${py + 100} ${px + 44},${py + 80} ${px + 42},${py + 64}`, go(.4), .4, { color: C.green, w: 3 });
          draw(k, `M${px + 42},${py + 70} C${px + 22},${py + 52} ${px + 12},${py + 64} ${px + 14},${py + 74} C${px + 26},${py + 80} ${px + 36},${py + 78} ${px + 42},${py + 70} Z`, C.green, .4, C.hlGreen, 1, 2);
          draw(k, `M${px + 42},${py + 66} C${px + 58},${py + 44} ${px + 70},${py + 52} ${px + 70},${py + 60} C${px + 60},${py + 70} ${px + 50},${py + 70} ${px + 42},${py + 66} Z`, C.green, .4, C.hlGreen, 1, 2);
          draw(k, k.roughRect(px + 82, py + 30, 28, 82), C.ink, .5, C.ink, 1, 2);
          [0, 1, 2].forEach(i => { const d = k.ellipse(px + 96, py + 46 + i * 25, 9, 9); P(d, go(.15, 0), .15, { color: C.ink, w: 1.5 }); k.F(d, go(.15), { color: C.grey, op: 1 }); });
          // 绿灯单独一组：读到 give the green light 时才亮
          gLight = D.sub(); k.hide(gLight);
          k.F(k.ellipse(px + 96, py + 96, 9, 9), go(.05, 0), { color: C.hlGreen, op: 1 });
          P(k.ellipse(px + 96, py + 96, 13, 13), go(.05, 0), .05, { color: C.green, w: 2 });
          D.back();
          cardText(k, px, py, "GREEN", C.green, "嫩芽 → 新手", "a green hand", "绿色的手", "新手、菜鸟");
          N("give the green light：", "亮绿灯 = 可以走，就是批准、同意。");
          const tL = go(.3); k.fade(gLight, tL, .3, 1); k.pop && k.pop(gLight, tL, .4);
          k.act(me, "point", tL, 1.2, { at: [px + 96, py + 96] });
          k.wait(2.4); }
        D.wipe();

        // ───── 镜头 2 · BLACK TEA + WHITE & GOLDEN ─────
        D.step(1); D.shot();
        N("black tea：", "不是黑茶！英语看的是干茶叶，乌黑乌黑的；中文看的是泡出来的红色茶水。");
        panel(k, XA, YA, W, H, C.ink, C.tintInk);
        { const px = XA, py = YA;
          const cup = `M${px + 22},${py + 58} L${px + 30},${py + 108} Q${px + 52},${py + 118} ${px + 74},${py + 108} L${px + 82},${py + 58} Z`;
          draw(k, cup, C.ink, .6, "#ffffff", 1, 2.5);
          draw(k, `M${px + 25},${py + 66} L${px + 79},${py + 66} L${px + 74},${py + 106} Q${px + 52},${py + 114} ${px + 30},${py + 106} Z`, C.red, .4, C.red, .8, 1.5);
          P(`M${px + 82},${py + 70} q18,4 8,24 q-4,6 -10,6`, go(.3), .3, { color: C.ink, w: 2.5 });
          P(k.wl(px + 12, py + 124, px + 96, py + 124, .5), go(.25), .25, { color: C.ink, w: 2.5 });
          [[88, 30], [104, 44]].forEach(([dx, dy]) => draw(k, `M${px + dx},${py + dy} q8,-12 16,0 q-8,10 -16,0 Z`, C.ink, .25, C.ink, 1, 1.5));
          tx(k, "干叶黑", px + 86, py + 66, { size: 12, color: C.ink });
          tx(k, "茶水红", px + 34, py + 140, { size: 12, color: C.red, weight: 700 });
          cardText(k, px, py, "BLACK", C.ink, "黑 ≠ 红", "black tea", "黑茶", "红茶（看干茶叶的颜色）", "字面：", "其实：");
          N("中式错译：", "照着中文硬翻，把红茶说成 red tea，就错啦！"); k.wait(2.4); }
        k.say("I like black tea.", { zh: "我喜欢红茶。", word: "black tea" });
        N("a white lie：", "白色像干净的雪，没有坏心眼。white lie 是不伤人的善意的谎言。");
        panel(k, XB, YA, W, H, C.red, C.tintRed);
        { const px = XB, py = YA;
          draw(k, `M${px + 14},${py + 22} h86 q8,0 8,8 v42 q0,8 -8,8 h-56 l-14,16 v-16 h-16 q-8,0 -8,-8 v-42 q0,-8 8,-8 Z`, C.grey, .7, "#ffffff", 1, 2.5);
          draw(k, `M${px + 58},${py + 66} C${px + 38},${py + 52} ${px + 42},${py + 34} ${px + 58},${py + 44} C${px + 74},${py + 34} ${px + 78},${py + 52} ${px + 58},${py + 66} Z`, C.red, .4, C.tintRed, 1, 2);
          draw(k, k.ellipse(px + 88, py + 116, 20, 20), C.ink, .4, C.hlYellow, 1, 2.5);
          tx(k, "$", px + 83, py + 122, { size: 16, color: C.ink, weight: 900, font: MONO });
          cardText(k, px, py, "WHITE", C.grey, "& GOLDEN", "a white lie", "白色的谎言", "善意的谎言，不伤人");
          N("golden：", "金子最宝贵，golden opportunity 就是千载难逢的黄金良机。"); k.wait(2.6); }
        D.wipe();

        // ───── 镜头 3 · 连读 ─────
        D.step(2); D.shot();
        N("", "连起来读一句：别难过！一切都会好起来的。");
        // R2 补朗读（2026-10-29，旧幕推广：人体 / 颜色 / 动物隐喻按 MASTER_DESIGN 留在本页签，先补）
        chips(k, ["blue", "green", "black", "white", "golden", "red"], 150, C.blue);
        const syC = rs("Blue, green, black, white, golden, red.", { zh: "蓝、绿、黑、白、金、红。", word: "BLUE GREEN BLACK WHITE GOLDEN red" });
        k.act(me, "point", syC.t, syC.dur, { at: [240, 140] });
        rs("He is a green hand. It is a white lie.", { zh: "他是个新手。那是个善意的谎言。", word: "a green hand a white lie a hand lie" }, "He is It");
        // give the green light：再亮一次小绿灯，讲解员举「GO」卡放行
        const gL2 = D.sub(); k.hide(gL2);
        P(k.roughRect(720, 196, 34, 92), go(.05, 0), .05, { color: C.ink, w: 2 });
        [0, 1, 2].forEach(i => P(k.ellipse(737, 214 + i * 28, 10, 10), go(.02, 0), .02, { color: C.ink, w: 1.5 }));
        D.back();
        const gOn = D.sub(); k.hide(gOn);
        k.F(k.ellipse(737, 270, 10, 10), go(.05, 0), { color: C.hlGreen, op: 1 });
        D.back();
        const syGL = rs("Please give the green light. It is a golden opportunity.", { zh: "请放行吧。这是个绝佳的机会。", word: "give the light opportunity give the green light" }, "Please");
        k.fade(gL2, syGL.t, .3, 1); k.fade(gOn, syGL.t + syGL.dur * .35, .3, 1);
        k.actFx(["give"], syGL.t + syGL.dur * .35, Math.max(1, syGL.dur * .4), "红绿灯亮绿灯（放行）");
        k.act(me, "point", syGL.t + syGL.dur * .3, 1.2, { at: [737, 270] });
        const sySad = rs("You look sad. Don't feel blue! Everything will be fine.", { zh: "你看起来很难过。别难过！一切都会好起来的。", word: "look sad Don't Everything will be fine" }, "You");
        k.expr(me, "happy", sySad.t + sySad.dur * .4, 2);
        k.wait(.3);
        D.step(3);
        const syF = finalBox(k, "Don't feel blue! Everything will be fine.", "blue", "别难过！一切都会好起来的。  蓝是忧，绿是新，黑茶是红茶，白谎是善意！");
        k.act(me, "cheer", syF.t + syF.dur * .6, 1.3);
        N("口诀：", "颜色藏心情：蓝是忧，绿是新，黑茶是红茶，白谎是善意，金子最宝贵！");
        k.wait(.4);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(4);
        quiz(k, D, me, { zh: "红茶英语怎么说？", ask: "去英国点「红茶」：说 red tea 还是 black tea？先想 3 秒！", line: "→  I like ___ .  ( red tea / black tea )",
          why: "英语按乌黑的干茶叶叫它：black tea。说 red tea 就是中式错译。", ans: "black tea", ansSay: "I like black tea with milk.", ansZh: "我喜欢加奶的红茶。", word: "I like black tea milk with" });
        ending(k, D, me, { insight: "颜色词背后藏着文化：\n先想「它在那个文化里让人想到什么」，再翻译", rhyme: "口诀：颜色藏心情 ——\n蓝是忧，绿是新，黑茶是红茶，白谎是善意！", foot: "颜色隐喻" });
      },
      actionWords: [{ word: "give", act: "红绿灯亮绿灯（放行）" }],   // give the green light → 场景红绿灯亮绿（场景动作）；look sad 是系动词（看起来），按 five_patterns ② 先例不演
      r2skip: ["red tea"],   // 预测题错误选项（中式错译，不读）
      terms: [
        BADGE_TERM,
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
        k.v2();
        const { N, P, go } = k, C = k.PAL, S = k.S, D = WO_PROPS(k);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        let ry = 200;   // 连读镜头：每读一句，先把这句写在板上（都是原有朗读句）
        const rs = (en, o, extra) => { tx(k, en, 24, ry, { size: 15, color: C.ink, font: MONO, dur: .6 }); ry += 32; return sayAt(en, extra ? { ...o, word: o.word + " " + extra } : o); };   // extra：板上写出的句子里其余要单读的词
        const me = intro(k, D, { open: "这节课：英语里超爱用动物的特点打比方，背会了写作口语都加分！", title: "密码三  动物习性比喻", sub: "三大隐喻密码",
          steps: ["① 公式", "② 蜂·马", "③ 羊·猫狗", "④ 连读", "🔮 预测"] });
        const XA = 24, XB = 412, W = 370, H = 140, YA = 196;

        // ───── 镜头 1 · as … as 公式 + BEE + HORSE ─────
        D.step(0); D.shot();
        N("同级比较：", "说两样东西「一样……」，用 as + 形容词 + as：和蜜蜂一样忙。");
        const m = k.mono("as ______ as a ______", 26, 136, 24, C.ink, 900); k.wait(1.4);
        N("形容词原级：", "形容词本来的样子，不加 -er、-est，比如 busy，不能写成 busier。");
        tx(k, "形容词原级", m.x0("______") + 2, 162, { size: 14, color: C.blue, weight: 900 });
        tx(k, "动物", m.x0("______", 1) + 22, 162, { size: 14, color: C.red, weight: 900 }); k.wait(1.6);
        N("习性：", "动物天生就有的特点，比如蜜蜂总在忙着采蜜。");
        tx(k, "动物的习性 → 人的样子", 400, 136, { size: 18, color: C.ink, weight: 900 }); k.wait(1.2);
        D.step(1);
        N("as busy as a bee：", "蜜蜂一天到晚不停地采蜜，所以「像蜜蜂一样忙」就是忙得不可开交。");
        panel(k, XA, YA, W, H, C.red, C.tintRed);
        { const px = XA, py = YA, bx = px + 62, by = py + 78;
          const gB = D.sub();   // 蜜蜂单独一组：画完在原地嗡嗡忙个不停
          draw(k, k.ellipse(bx - 10, by - 28, 16, 12), C.blue, .3, C.tintBlue, .9, 2);
          draw(k, k.ellipse(bx + 10, by - 30, 16, 12), C.blue, .3, C.tintBlue, .9, 2);
          draw(k, k.ellipse(bx, by, 36, 22), C.ink, .6, "#fde047", 1, 2.5);
          P(k.wl(bx - 12, by - 20, bx - 12, by + 20, .3) + " " + k.wl(bx + 6, by - 21, bx + 6, by + 21, .3), go(.3), .3, { color: C.ink, w: 5 });
          P(k.wl(bx + 22, by - 6, bx + 24, by - 6, .1), go(.1), .1, { color: C.ink, w: 4 });
          P(k.wl(bx - 36, by, bx - 46, by + 2, .2), go(.15), .15, { color: C.ink, w: 2.5 });
          D.back();
          k.buzz && k.buzz(gB, S.at, 1.6);
          cardText(k, px, py, "BEE", C.red, "勤劳小蜜蜂", "as busy as a bee", "蜜蜂不停采蜜", "忙得不可开交", "习性：", "比喻："); }
        N("谚语：", "流传很久的老话。The early bird catches the worm：早起的鸟儿有虫吃。");
        tx(k, "谚语：The early bird catches the worm.", 24, 372, { size: 15, color: C.grey, dur: 1.4 });
        k.wait(1.3);
        k.say("The early bird catches the worm.", { zh: "早起的鸟儿有虫吃。" });
        N("as strong as a horse：", "马跑一整天也不累，所以「像马一样壮」就是力大无穷。");
        panel(k, XB, YA, W, H, C.ink, C.tintInk);
        { const px = XB, py = YA, h = py + 40;
          draw(k, k.ellipse(px + 56, h + 34, 34, 16), C.ink, .5, "#fcd34d", .9, 2.5);
          draw(k, `M${px + 72},${h + 24} L${px + 86},${h - 8} Q${px + 90},${h - 13} ${px + 96},${h - 8} L${px + 114},${h + 4} Q${px + 117},${h + 11} ${px + 109},${h + 11} L${px + 97},${h + 8} L${px + 88},${h + 32} Z`, C.ink, .6, "#fcd34d", .9, 2.5);
          draw(k, `M${px + 88},${h - 9} l2,-9 l5,8 Z`, C.ink, .2, "#fcd34d", .9, 2);
          P(`M${px + 84},${h - 4} Q${px + 76},${h + 6} ${px + 70},${h + 22}`, go(.25), .25, { color: C.ink, w: 3.5 });
          P(k.wl(px + 101, h + 1, px + 103, h + 1, .1), go(.1), .1, { color: C.ink, w: 3.5 });
          P([[34, 0], [46, 2], [66, 2], [78, 0]].map(([dx, dd]) => k.wl(px + dx, h + 46, px + dx - dd, h + 82, .3)).join(" "), go(.4), .4, { color: C.ink, w: 2.5 });
          P(`M${px + 22},${h + 30} q-12,10 -6,28`, go(.2), .2, { color: C.ink, w: 2.5 });
          cardText(k, px, py, "HORSE", C.ink, "强壮的骏马", "as strong as a horse", "马不知疲倦", "力大无穷、身体棒", "习性：", "比喻：");
          N("还有：", "as brave as a lion，像狮子一样勇敢。"); k.wait(2.2); }
        D.wipe();

        // ───── 镜头 2 · LAMB + CATS & DOGS ─────
        D.step(2); D.shot();
        const YB = 150;
        N("as gentle as a lamb：", "小羊乖乖的、软软的，从不发脾气，所以就是温顺得像小羊。");
        panel(k, XA, YB, W, H, C.green, C.tintGreen);
        { const px = XA, py = YB;
          draw(k, k.cloud(px + 58, py + 70, 34, 22), C.grey, .8, "#ffffff", 1, 2.5);
          draw(k, k.ellipse(px + 98, py + 58, 12, 10), C.ink, .3, C.tintInk, 1, 2);
          P([36, 50, 66, 80].map(dx => k.wl(px + dx, py + 92, px + dx, py + 114, .3)).join(" "), go(.4), .4, { color: C.ink, w: 2.5 });
          cardText(k, px, py, "LAMB", C.green, "温顺的小羊", "as gentle as a lamb", "小羊很温和", "性格温柔、很乖", "习性：", "比喻：");
          N("还有：", "black sheep 黑羊，比喻害群之马。"); k.wait(2.2); }
        k.say("My dad is as strong as a horse.", { zh: "我爸爸壮得像匹马。", word: "as strong as a horse" });
        N("rain cats and dogs：", "是习语，不是天上掉猫和狗！意思是雨大得吓人，下倾盆大雨。");
        panel(k, XB, YB, W, H, C.blue, C.tintBlue);
        { const px = XB, py = YB;
          draw(k, k.cloud(px + 62, py + 40, 40, 18), C.grey, .7, C.tintInk, .9, 2.5);
          const gR = D.sub();   // 雨点单独一组：一阵阵往下落
          P([30, 50, 70, 90].map((dx, i) => k.wl(px + dx, py + 70 + (i % 2) * 6, px + dx - 8, py + 96 + (i % 2) * 6, .3)).join(" "), go(.4), .4, { color: C.blue, w: 2.5 });
          D.back();
          const tR = S.at; [0, 1, 2].forEach(j => { k.move(gR, tR + j * .7, .35, 0, 6); k.move(gR, tR + j * .7 + .35, .35, 0, -6); });
          draw(k, `M${px + 76},${py + 112} q16,-22 32,0 Z`, C.red, .4, C.tintRed, 1, 2);
          P(`M${px + 92},${py + 112} v18 q0,5 -5,5`, go(.2), .2, { color: C.ink, w: 2 });
          cardText(k, px, py, "CAT&DOG", C.blue, "习语", "rain cats and dogs", "天上下猫下狗", "下倾盆大雨");
          N("更多习语：", "a lucky dog 幸运儿，white elephant 贵又没用的累赘。"); k.wait(2.6); }
        const syRn = sayAt("It's raining cats and dogs!", { zh: "外面下着倾盆大雨！", word: "raining cats and dogs" });
        k.expr(me, "surprised", syRn.t, Math.max(1.2, syRn.dur));
        k.wait(.4);
        D.wipe();

        // ───── 镜头 3 · 连读 + 结论 ─────
        D.step(3); D.shot();
        N("", "连起来读一句：我妈妈每天早上都忙得像只小蜜蜂！");
        // R2 补朗读（2026-10-29，旧幕推广：人体 / 颜色 / 动物隐喻按 MASTER_DESIGN 留在本页签，先补）
        chips(k, ["bee", "horse", "lamb", "lion", "dog", "cat"], 150, C.green);
        const syB = rs("Bee, busy. As busy as a bee. Busy, busier.", { zh: "蜜蜂、忙。像蜜蜂一样忙。忙，更忙。", word: "BEE busy busier er", blocks: ["er"] });
        k.act(me, "point", syB.t, Math.min(2, syB.dur), { at: [60, 140] });
        rs("The early bird catches the worm.", { zh: "早起的鸟儿有虫吃。", word: "The early bird catches worm" });
        rs("Lamb, gentle. As gentle as a lamb. As brave as a lion.", { zh: "小羊、温柔。像小羊一样温柔。像狮子一样勇敢。", word: "LAMB gentle brave lion as gentle as a lamb as brave as a lion" });
        rs("Dog, cat, rain. It will rain cats and dogs. You are a lucky dog!", { zh: "狗、雨。下着倾盆大雨。你真是个幸运儿！", word: "DOG CAT rain lucky a lucky dog rain cats and dogs" }, "It will You are");
        rs("My mom is busy every morning.", { zh: "我妈妈每天早上都很忙。", word: "My mom is every morning" });
        rs("A black sheep. A white elephant.", { zh: "害群之马。大而无用的东西。", word: "black sheep white elephant" });
        rs("Big, biggest. Est.", { zh: "大，最大。-est。", word: "est", blocks: ["est"] }, "Big biggest");
        const syF = finalBox(k, "My mom is as busy as a bee every morning!", "busy", "我妈妈每天早上都忙得像只小蜜蜂！  as + 形容词原级 + as + a 动物");
        k.act(me, "cheer", syF.t + syF.dur * .6, 1.3);
        N("口诀：", "as 加原级再加 as，后面放个小动物：忙像蜂，壮像马，乖像羊！");
        k.wait(.4);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(4);
        quiz(k, D, me, { zh: "像老鼠一样安静", ask: "图书馆里要「像老鼠一样安静」：中间填 quiet，后面放哪只动物？先想 3 秒！", line: "→  as quiet as a ___  ( mouse / horse )",
          why: "小老鼠走路悄无声息：as quiet as a mouse，中间的 quiet 用原级。", ans: "as quiet as a mouse", ansSay: "Please be as quiet as a mouse in the library.", ansZh: "在图书馆里请像小老鼠一样安静。", word: "quiet mouse as quiet as a mouse library" });
        ending(k, D, me, { insight: "英语爱借动物的天性说人：\n记住动物的习性，就记住了这个比喻", rhyme: "口诀：as 加原级再加 as ——\n忙像蜂，壮像马，乖像羊！", foot: "动物习性" });
      },
      actionWords: [],   // 例句是 busy / strong / gentle / rain / catches（catches 不在动作表，也不是人演的动作）；蜜蜂嗡嗡、雨点落下用场景动画表现，按 bamboo_tree ② 先例留空
      r2skip: [],
      terms: [
        BADGE_TERM,
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
