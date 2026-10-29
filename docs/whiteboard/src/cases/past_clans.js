// ==================== 白板脚本：⑤ 不规则过去式「四大门派」破译阵 ====================
// 每个案例 = IRREGULAR_PAST_CLANS 里的一个门派：门派旗 + 秘诀 → 3 个成员「原形 → 过去式」完整画 → 其余成员列表 → 结论 + 口诀。
// v2 升级（2026-10-30，决策 24）：4 个案例全部升引擎 v2 + 讲解员（每案例：门派旗 + 秘诀 / 前两个成员 + 场景 / 第三个成员 + 其余成员 + 结论 三个镜头 → 🔮 预测 → 金句卡），版面工具 PC_V2；升级前整份文件原样保存在 cases/past_clans_classic.js。依赖 wo_props。
// 旧版面工具 tools() 已无人使用，只为 R1 对照保留（字符串在 build 之外），下一次改这个文件时删除。
(function () {
  const MONO = '"Courier New",Courier,monospace';
  // 本页签的小工具（只在本文件里用）
  function tools(k) {
    const { C, P, T, F, go } = k;
    const W = {};
    // 门派旗：旗杆 + 飘动的旗面 + 门派招式 + 中文名
    W.flag = (label, sub, color, fill, lsize = 24) => {
      P(k.wl(44, 76, 44, 206, .8), go(.5), .5, { color: C.brown, w: 4 });
      const d = "M46,84 C110,70 170,100 248,84 L248,158 C170,174 110,144 46,158 Z";
      P(d, go(.9), .9, { color, w: 3 });
      F(d, go(.3, 0), { color: fill, op: .9 });
      T(label, 147, 124, go(.9), .9, { size: lsize, color, weight: 900, anchor: "middle", font: MONO });
      T(sub, 147, 149, go(.8), .8, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
    };
    // 在等宽文字 m 的第 i..j-1 个字母外画圈
    W.ring = (m, i, j, color = C.red) => {
      const cx = m.x + (i + j) / 2 * m.cw, cy = m.y - m.size * .34;
      P(k.ellipse(cx, cy, (j - i) * m.cw / 2 + (j - i > 1 ? 3 : 5), m.size * .6), go(.45), .45, { color, w: 3 });
    };
    // 一个成员：原形 → 过去式（+ 中文意思 / 音标），右边写秘诀和例句
    W.row = (o) => {
      const y = o.y, size = o.size || 28;
      const mb = k.mono(o.base, 40, y, size, C.ink, 900);
      T(o.under || o.mean, 40, y + 22, go(.5), .5, { size: 14, color: C.grey, font: o.under ? MONO : undefined });
      const ax = 40 + o.base.length * size * .6 + 14;
      if (o.same) {
        T("=", ax + 22, y - 2, go(.4), .4, { size: 30, color: C.green, weight: 900, anchor: "middle" });
      } else k.arrow(ax, y - 9, ax + 44, y - 9, C.purple);
      const px = ax + 58;
      const mp = k.mono(o.past, px, y, size, C.red, 900);
      if (o.ipa) T(o.ipa, px, y + 22, go(.5), .5, { size: 14, color: C.grey, font: MONO });
      return { mb, mp, px, done: () => {
        if (o.tipN) k.N(o.tipN[0], o.tipN[1]);
        T(o.tip, 392, y - 8, go(Math.max(.8, o.tip.length * .06)), Math.max(.8, o.tip.length * .06), { size: 16, color: C.brown, weight: 900 });
        if (o.exN) k.N(o.exN[0], o.exN[1]);
        const me = k.mono(o.ex, 392, y + 17, 15, C.blue, 700);
        if (o.exWord) k.underline(me, o.exWord, 0, C.orange);
      } };
    };
    // 其余成员一行
    W.others = (text) => {
      T("其余成员：", 40, 428, go(.6), .6, { size: 16, color: C.grey, weight: 900 });
      k.mono(text, 128, 428, 16, C.ink, 700);
    };
    // 结论绿框 + 口诀
    W.fin = (concl, rhyme) => {
      const d = k.roughRect(16, 446, 928, 52);
      P(d, go(1), 1, { color: C.green, w: 2.5 });
      F(k.rectD(16, 446, 928, 52), go(.2, 0), { color: "#ecfdf5", op: .9 });
      T(concl, 36, 480, go(2), 2, { size: 20, color: C.green, weight: 900 });
      T(rhyme, 36, 525, go(1.8), 1.8, { size: 17, color: C.grey, weight: 700 });
    };
    return W;
  }


  // ───────── v2 版面（2026-10-30，决策 24）─────────
  // 讲解员站在右侧 x≈892，内容收在 x≤800；原来一屏（门派旗 + 秘诀 + 3 个成员 + 其余成员 + 结论）拆成 3 个镜头：
  // ① 门派旗 + 秘诀 / ② 前两个成员 + 场景动作 / ③ 第三个成员 + 其余成员 + 结论 → 🔮 预测 → 金句卡。
  // 门派旗整体下移 44（让出标题和进度条）；秘诀从旗子右边 x=290 挪到旗子下面 x=40（一行放得下）；结论框收窄到 x≤800。
  // 配色只用 V3 k.PAL：原形墨黑、过去式红；变化的字母红圈（过去式里的新字母绿圈）；秘诀蓝；例句蓝 + 红下划线；旗杆褐 → 墨黑；紫 / 橙 / 褐都改 V3。
  function PC_V2(k, D) {
    const { P, T, F, go, estW } = k, C = k.PAL, MONO = D.MONO;
    const H = {};
    const fit = (text, max, room) => Math.min(max, room / Math.max(1, estW(text, 1)));
    H.flag = (label, sub, color, fill, lsize = 24) => {
      P(k.wl(44, 120, 44, 250, .8), go(.5), .5, { color: C.ink, w: 4 });
      const d = "M46,128 C110,114 170,144 248,128 L248,202 C170,218 110,188 46,202 Z";
      P(d, go(.9), .9, { color, w: 3 });
      F(d, go(.3, 0), { color: fill, op: .9 });
      T(label, 147, 168, go(.9), .9, { size: lsize, color, weight: 900, anchor: "middle", font: MONO });
      T(sub, 147, 193, go(.8), .8, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
    };
    H.ring = (m, i, j, color = C.red) => {
      const cx = m.x + (i + j) / 2 * m.cw, cy = m.y - m.size * .34;
      P(k.ellipse(cx, cy, (j - i) * m.cw / 2 + (j - i > 1 ? 3 : 5), m.size * .6), go(.45), .45, { color, w: 3 });
      return [cx, cy];
    };
    H.note = (text, x, y, o = {}) => {
      const dur = o.dur || Math.max(.6, [...text].length * .06);
      T(text, x, y, go(dur), dur, { size: 16, color: C.grey, weight: 700, ...o });
    };
    H.secret = (text, y = 272) => {
      const dur = Math.max(1.6, text.length * .055);
      T(text, 40, y, go(dur), dur, { size: fit(text, 17, 760), color: C.blue, weight: 900 });
    };
    // 一个成员：原形 → 过去式（+ 中文意思 / 音标），右边（x=392）写秘诀和例句
    H.row = (o) => {
      const y = o.y, size = o.size || 28;
      const mb = k.mono(o.base, 40, y, size, C.ink, 900);
      T(o.under || o.mean, 40, y + 22, go(.5), .5, { size: 14, color: C.grey, font: o.under ? MONO : undefined });
      const ax = 40 + o.base.length * size * .6 + 14;
      if (o.same) T("=", ax + 22, y - 2, go(.4), .4, { size: 30, color: C.green, weight: 900, anchor: "middle" });
      else k.arrow(ax, y - 9, ax + 44, y - 9, C.blue);
      const px = ax + 58;
      const mp = k.mono(o.past, px, y, size, C.red, 900);
      if (o.ipa) T(o.ipa, px, y + 22, go(.5), .5, { size: 14, color: C.grey, font: MONO });
      return { mb, mp, px, done: () => {
        if (o.tipN) k.N(o.tipN[0], o.tipN[1]);
        const td = Math.max(.8, o.tip.length * .06);
        T(o.tip, 392, y - 8, go(td), td, { size: fit(o.tip, 16, 408), color: C.ink, weight: 900 });
        if (o.exN) k.N(o.exN[0], o.exN[1]);
        const me = k.mono(o.ex, 392, y + 17, Math.min(15, 408 / (o.ex.length * .6)), C.blue, 700);
        if (o.exWord) k.underline(me, o.exWord, 0, C.red);
        return me;
      } };
    };
    H.others = (text, y = 250) => {
      T("其余成员：", 40, y, go(.6), .6, { size: 16, color: C.grey, weight: 900 });
      return k.mono(text, 128, y, 16, C.ink, 700);
    };
    // 结论绿框 + 口诀（收在 x≤800，讲解员不用退场）
    H.fin = (concl, rhyme, y = 446) => {
      P(k.roughRect(16, y, 784, 52), go(1), 1, { color: C.green, w: 2.5 });
      F(k.rectD(16, y, 784, 52), go(.2, 0), { color: C.tintGreen, op: .55 });
      T(concl, 36, y + 34, go(2), 2, { size: fit(concl, 20, 750), color: C.green, weight: 900 });
      T(rhyme, 36, y + 79, go(1.8), 1.8, { size: fit(rhyme, 17, 750), color: C.grey, weight: 700 });
    };
    // 🔮 预测题框
    H.quiz = (zhLine, ask) => {
      P(k.roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
      T(zhLine, 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
      T(ask, 64, 286, go(1), 1, { size: Math.min(21, 720 / (ask.length * .6)), color: C.ink, weight: 900, font: MONO });
    };
    H.reveal = (text) => T(text, 64, 330, go(1), 1, { size: Math.min(22, 720 / (text.length * .6)), color: C.green, weight: 900, font: MONO });
    // 场景小件
    H.ground = (x0, x1, y) => P(k.wl(x0, y, x1, y, .6), go(.3), .3, { color: C.ink, w: 2 });
    H.desk = (x, y, w = 120) => {   // 桌面左端 (x,y)，桌腿到 y+44
      P(k.roughRect(x, y, w, 10), go(.4), .4, { color: C.ink, w: 2.5 }); F(k.rectD(x, y, w, 10), go(.1, 0), { color: C.tintInk, op: 1 });
      P(k.wl(x + 10, y + 10, x + 10, y + 44, .3) + " " + k.wl(x + w - 10, y + 10, x + w - 10, y + 44, .3), go(.3), .3, { color: C.ink, w: 3 });
    };
    H.stool = (x, y) => {   // 凳面中心 (x,y)，凳腿到 y+30
      P(k.roughRect(x - 22, y, 44, 8), go(.3), .3, { color: C.ink, w: 2.5 }); F(k.rectD(x - 22, y, 44, 8), go(.1, 0), { color: C.tintInk, op: 1 });
      P(k.wl(x - 16, y + 8, x - 18, y + 30, .3) + " " + k.wl(x + 16, y + 8, x + 18, y + 30, .3), go(.2), .2, { color: C.ink, w: 3 });
    };
    // 水波（游泳池）：(x0..x1, y)
    H.waves = (x0, x1, y) => {
      let d = `M${x0},${y}`; for (let x = x0; x < x1; x += 30) d += ` q7.5,-7 15,0 q7.5,7 15,0`;
      P(d, go(.6), .6, { color: C.blue, w: 2.5 });
      F(k.rectD(x0, y, x1 - x0, 30), go(.1, 0), { color: C.tintBlue, op: .9 });
    };
    // 游泳的小脑袋（组）：中心 (x,y)
    H.swimmer = (x, y) => {
      const g = D.sub();
      P(k.ellipse(x, y, 9, 9), go(.25), .25, { color: C.ink, w: 2.2 }); F(k.ellipse(x, y, 9, 9), go(.05, 0), { color: "#fde3cf", op: 1 });
      P(`M${x - 20},${y + 6} q6,-8 12,0 M${x + 8},${y + 6} q6,-8 12,0`, go(.2), .2, { color: C.blue, w: 2 });
      D.back(); return g;
    };
    // 一杯牛奶：杯子 + 奶（奶单独一组，可以「喝掉」）
    H.glass = (x, y) => {   // 杯底中心 (x,y)
      const gm = D.sub();
      F(k.rectD(x - 17, y - 44, 34, 42), go(.2, 0), { color: C.tintBlue, op: 1 });
      P(k.wl(x - 17, y - 44, x + 17, y - 44, .3), go(.2), .2, { color: C.grey, w: 1.6 });
      D.back();
      P(`M${x - 20},${y - 56} L${x - 16},${y} L${x + 16},${y} L${x + 20},${y - 56}`, go(.5), .5, { color: C.ink, w: 2.5 });
      T("milk", x, y + 18, go(.3), .3, { size: 13, color: C.grey, weight: 900, anchor: "middle", font: MONO });
      return gm;
    };
    // 火车（组）：车底左端 (x,y)
    H.train = (x, y) => {
      const g = D.sub();
      P(k.roughRect(x, y - 50, 150, 40), go(.5), .5, { color: C.blue, w: 2.5 }); F(k.rectD(x, y - 50, 150, 40), go(.1, 0), { color: C.tintBlue, op: 1 });
      P(k.roughRect(x + 150, y - 40, 34, 30), go(.3), .3, { color: C.blue, w: 2.5 }); F(k.rectD(x + 150, y - 40, 34, 30), go(.1, 0), { color: C.tintBlue, op: 1 });
      [0, 1, 2, 3].forEach(i => P(k.roughRect(x + 12 + i * 34, y - 44, 22, 14), go(.08), .08, { color: C.blue, w: 1.6 }));
      [x + 24, x + 70, x + 116, x + 166].forEach(wx => { P(k.ellipse(wx, y - 8, 8, 8), go(.12), .12, { color: C.ink, w: 2.5 }); F(k.ellipse(wx, y - 8, 8, 8), go(.05, 0), { color: C.ink, op: 1 }); });
      D.back(); return g;
    };
    H.ball = (x, y) => {
      const g = D.sub();
      P(k.ellipse(x, y, 9, 9), go(.25), .25, { color: C.ink, w: 2.2 }); F(k.ellipse(x, y, 9, 9), go(.05, 0), { color: "#fff", op: 1 });
      P(`M${x - 3},${y - 3} l6,0 l2,5 l-5,3 l-5,-3 Z`, go(.15), .15, { color: C.ink, w: 1.6 });
      D.back(); return g;
    };
    // 小狗（组）：脚底中心 (x,y)，朝右
    H.puppy = (x, y) => {
      const g = D.sub();
      const body = k.ellipse(x, y - 14, 18, 10), head = k.ellipse(x + 20, y - 24, 9, 8);
      P(body, go(.3), .3, { color: C.ink, w: 2.2 }); F(body, go(.05, 0), { color: C.tintInk, op: 1 });
      P(head, go(.2), .2, { color: C.ink, w: 2.2 }); F(head, go(.05, 0), { color: C.tintInk, op: 1 });
      P(`M${x - 10},${y - 6} l-2,8 M${x + 10},${y - 6} l2,8 M${x - 18},${y - 18} q-8,-8 -4,-14 M${x + 22},${y - 32} l4,-6`, go(.3), .3, { color: C.ink, w: 2.2 });
      D.back(); return g;
    };
    // 站牌：杆底 (x,y)
    H.sign = (x, y, label) => {
      P(k.wl(x, y, x, y - 70, .3), go(.3), .3, { color: C.ink, w: 3 });
      const w = Math.max(52, estW(label, 13) + 16);
      P(k.roughRect(x - w / 2, y - 92, w, 24), go(.3), .3, { color: C.green, w: 2.2 }); F(k.rectD(x - w / 2, y - 92, w, 24), go(.1, 0), { color: C.tintGreen, op: 1 });
      T(label, x, y - 74, go(.3), .3, { size: 13, color: C.green, weight: 900, anchor: "middle" });
    };
    // 飘起来的字（Zzz / 爱心等）：先藏起来，float(g, t, dur) 时淡入上飘再淡出
    H.floaty = (text, x, y, o = {}) => {
      const g = D.sub(); k.hide(g);
      T(text, x, y, go(.05, 0), .05, { size: o.size || 20, color: o.color || C.blue, weight: 900, font: o.font });
      D.back(); return g;
    };
    H.float = (g, t, dur, dy = -40) => { k.fade(g, t, .3, 1); k.move(g, t, dur, 0, dy, { ease: "move" }); k.fade(g, t + dur - .3, .3, 0); };
    return H;
  }

  WB_LAB.past_clans = [
    // ───────── ① 金钟罩铁布衫派（AAA）（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/past_clans_classic.js（R1 零丢失）。原一屏拆成 3 个镜头（门派旗 + 秘诀 / put · hurt + 场景 / read + 其余成员 + 结论）+ 🔮 预测 + 金句卡；
    // R4：读到 Play, played 时讲解员跳；He put his book on the desk 时场景里的小旅客把书搬到桌边放下；I fell off my bike and hurt my foot 时小旅客「哎呀」；
    // I read an interesting book 时讲解员捧书读；预测题揭晓 Yesterday I put my bag on the desk 时讲解员举起 put 词卡。
    {
      build(k) {
        k.v2();
        const { N, T, P, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, W = PC_V2(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "这节课：为什么有的动词变过去式，不加 -ed？");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "第一门派：金钟罩铁布衫派", sub: "过去式四大门派", badges: ["💡", "✂️"], steps: ["① 门派旗", "② 秘诀", "③ 成员", "④ 结论", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 规则 vs 不规则 + 门派旗 + 秘诀 ─────
        D.step(0); D.shot();
        N("过去式：", "动词表示「以前发生的事」时的样子。比如 play 变成 played。");
        const m1 = k.mono("play → played", 290, 150, 22, C.green, 900);
        k.note("规则动词：直接加 -ed", 520, 150, { color: C.green, weight: 900, size: 17 });
        const syPl = sayAt("Play, played. Ed.", { zh: "玩，玩了。加 -ed。", word: "play played ed", blocks: ["ed"] });
        k.act(me, "jump", syPl.t, Math.max(1, syPl.dur * .5), { words: ["play"] });
        k.wait(1);
        N("不规则动词：", "不按「加 -ed」规矩变的动词。put 写成 putted 就错了！");
        const m2 = k.mono("put → putted", 290, 190, 22, C.ink, 900);
        k.strike(m2, "putted", 0, C.red); k.redX(470, 166);
        k.note("不规则动词：不加 -ed", 520, 190, { color: C.red, weight: 900, size: 17 });
        k.act(me, "surprised", S.at - .4, 1);
        N("四大门派：", "把不规则动词按发音规律分成 4 组，像武林 4 个门派，一组一组记。");
        W.flag("A A A", "金钟罩铁布衫派", C.red, C.tintRed, 26);
        k.act(me, "point", S.at - 1, 1.2, { at: [147, 168] });
        D.step(1);
        N("AAA：", "原形、过去式、过去分词三个样子完全一样，像穿了金钟罩，怎么打都不变。");
        k.wait(2.6);
        N("爆破音：", "/t/ /d/ 这种音，舌尖一顶再一弹，又短又脆，像小鞭炮。");
        W.secret("秘诀：词尾本来就是爆破音 /t/ /d/，再加 -ed 会撞车被吞掉 → 保持原形");
        // 小鞭炮：/t/ /d/ 啪一下
        const gPop = W.floaty("💥 /t/ /d/", 300, 350, { size: 26, color: C.red, font: D.MONO });
        W.float(gPop, S.at - .6, 1.6, -30);
        k.act(me, "nod", S.at, 1);
        k.wait(1.6);
        D.wipe();

        // ───── 镜头 2 · put / hurt ─────
        D.step(2); D.shot();
        N("原形：", "动词最原本、没变化的样子，就是词典里查到的样子，比如 put（放）。");
        const r1 = W.row({ y: 170, base: "put", mean: "放", past: "put", ipa: "/pʊt/", same: true,
          tip: "短促闭音节 + t 结尾，过去现在一模一样", ex: "He put his book on the desk yesterday.", exWord: "put",
          exN: ["", "例句里有 yesterday（昨天），动词还是 put，一个字母都不加。"] });
        N("闭音节：", "元音后面被辅音「关上门」，读得又短又快，比如 put 里 u 后面关着 t。");
        W.ring(r1.mb, 2, 3); W.ring(r1.mp, 2, 3);
        r1.done();
        // 场景：小旅客把书搬到桌边放下（R4 put）
        const gS = D.sub();
        W.ground(60, 790, 440);
        W.desk(560, 396, 130);
        const tv = k.actor("traveler", { x: 200, y: 440, s: .72, f: 1, g: gS });
        const bk = k.prop("book", 236, 440, { g: gS, s: .8 });
        D.back();
        const syPut = sayAt("He put his book on the desk yesterday.", { zh: "他昨天把书放在桌上了。", word: "He his book on the desk yesterday" });
        k.act(tv, "carry", syPut.t, Math.max(2.4, syPut.dur), { prop: bk, to: 540, put: true, words: ["put"] });

        N("", "第二位成员 hurt（弄伤），也是 t 结尾。");
        const r2 = W.row({ y: 250, base: "hurt", mean: "弄伤 / 疼", past: "hurt", ipa: "/hɜːt/", same: true,
          tip: "以 t 结尾，千万别写成 hurted！", ex: "I fell off my bike and hurt my foot.", exWord: "hurt",
          exN: ["", "摔下自行车弄伤了脚：hurt my foot，不是 hurted。"] });
        W.ring(r2.mb, 3, 4); W.ring(r2.mp, 3, 4);
        r2.done();
        const syH = sayAt("I fell off my bike and hurt my foot.", { zh: "我从自行车上摔下来，弄伤了脚。", word: "I fell off my bike and hurt foot hurt my foot" });
        k.act(tv, "surprised", syH.t + syH.dur * .5, 1.2); k.expr(tv, "oops", syH.t + syH.dur * .5, 2.4);
        k.wait(.4);
        D.wipe();

        // ───── 镜头 3 · read + 其余成员 + 结论 ─────
        D.shot();
        N("音标：", "斜线 / / 里的符号，专门记一个词怎么读。read 的拼写不变，读音会变！");
        const r3 = W.row({ y: 170, base: "read", under: "/riːd/ 读", past: "read", ipa: "/red/", same: true,
          tip: "拼写不变，读音从长音 /riːd/ 缩成短音 /red/", ex: "I read an interesting book last night.", exWord: "read",
          tipN: ["长音和短音：", "长音 /iː/ 拉长读，短音 /e/ 短短一下。read 的过去式读起来像 red（红色）。"] });
        k.P(k.ellipse(r3.px + 22, 188, 30, 12), go(.45), .45, { color: C.red, w: 3 });
        r3.done();
        const bk2 = k.prop("book", 0, 0, { hidden: true });
        const syR = sayAt("I read an interesting book last night. Read sounds like red.", { zh: "我昨晚读了一本有趣的书。read 的过去式读起来像 red。", word: "read an interesting last night red" });
        k.act(me, "read", syR.t, Math.max(1.6, syR.dur), { prop: bk2, words: ["read"] });

        k.say("Yesterday I put my bag on the desk.", { zh: "昨天我把书包放在桌上。", word: "put" });
        N("", "这一派还有：cut、hit、let、cost，过去式都和原形一样。");
        W.others("cut→cut · hit/let→hit/let · cost→cost");
        k.say("Hit, let, cost. The book cost ten yuan.", { zh: "打、让、花费。这本书花了十元。", word: "hit let cost" });
        D.step(3);
        N("", "结论：词尾是短促 /t/ /d/ 的这几个动词，过去式 = 原形。");
        W.fin("结论：put / cut / hurt / hit / let / cost / read，过去式 = 原形（AAA）",
          "口诀：t、d 结尾金钟罩，-ed 进不来，原样不变！read 只变读音 /red/。");
        k.act(me, "point", S.at - 1.4, 1.2, { at: [200, 470] });
        k.say("He cut the cake and hurt his finger.", { zh: "他切蛋糕时弄伤了手指。", word: "cut" });
        N("口诀：", "t、d 结尾金钟罩，-ed 进不来，原样不变！");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(4); D.shot();
        N("预测：", "「昨天我把书包放在桌上」：put 的过去式要不要加 -ed？先想 3 秒！");
        W.quiz("🔮 昨天我把书包放在桌上。", "→  Yesterday I ___ my bag on the desk.  ( put / putted )");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "put 是金钟罩派，过去式还是 put：Yesterday I put my bag on the desk.");
        const tRev = go(.3);
        W.reveal("Yesterday I put my bag on the desk.");
        k.sfx("ding", tRev + .9);
        const card = k.prop("card", 0, 0, { text: "put", hidden: true });
        const syQ = sayAt("Yesterday I put my bag on the desk.", { zh: "昨天我把书包放在桌上。", word: "Yesterday I put my bag on the desk" });
        k.act(me, "holdCard", syQ.t + syQ.wd, Math.max(1.4, syQ.dur - syQ.wd + .3), { prop: card, words: ["put"] });
        k.act(me, "cheer", syQ.t + syQ.dur + .4, 1.2);
        D.hold(1.4);

        k.quoteCard({ insight: "t、d 结尾的短动词穿着「金钟罩」：\n过去式 = 原形，一个字母都不加", rhyme: "口诀：t、d 结尾金钟罩，\n-ed 进不来，原样不变！", hlLines: 2, foot: "⚔️ 过去式四大门派 · ① 金钟罩铁布衫派" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "play", act: "读到「Play, played」时讲解员跳起来（jump，玩的兴奋）" },
        { word: "put", act: "读到「He put his book on the desk yesterday」时场景里的小旅客把书搬到桌边放下（carry + put）；预测题揭晓「Yesterday I put my bag on the desk」时讲解员举起 put 词卡（holdCard）" },
        { word: "read", act: "读到「I read an interesting book last night」时讲解员捧书读（read）" },
      ],
      r2skip: ["putted", "hurted", "AAA", "A A A"],   // 红叉错写 putted / hurted；AAA 是派别标签（原形 = 过去式 = 过去分词）
      terms: [
        ["可信度徽章", "💡 金钟罩、门派、小鞭炮都是帮助记忆的比喻；✂️ 简化说法：「四大门派」是把常见不规则动词按变化规律分组的简化办法，真实的不规则动词还有很多别的变法，要逐个记。"],
        ["过去式", "动词表示「以前发生的事」时的样子，比如 play → played、put → put。"],
        ["原形", "动词最原本、没有变化的样子，也就是词典里查到的样子，比如 put、sing、buy。"],
        ["规则动词", "过去式按规矩直接加 -ed 的动词，比如 play → played、jump → jumped。"],
        ["不规则动词", "过去式不按「加 -ed」规矩变的动词，比如 put → put、sing → sang、buy → bought，要单独记。"],
        ["四大门派", "比喻：把不规则动词按发音规律分成 4 组，像武林里的 4 个门派，同一派的变法一样，一组一组记更快。"],
        ["过去分词", "动词的另一种变化样子，用在 have 后面（比如 have sung），以后会学。"],
        ["AAA 型", "原形、过去式、过去分词三个样子完全一样，比如 put - put - put。"],
        ["金钟罩铁布衫", "比喻：这一派动词像穿了护身铠甲，变过去式时一个字母都不加、不变。"],
        ["元音 / 辅音", "元音是 a e i o u 发出的「响亮」的音；辅音是 b、t、d、p 这类要靠舌头、嘴唇挡一下的音。"],
        ["闭音节", "元音后面跟着辅音「关上门」，读得又短又快，比如 put、cut、hit。"],
        ["爆破音", "像 /t/ /d/ /p/ 这样的音：先堵住气，再一下子放开，又短又脆，像小鞭炮。"],
        ["舌尖爆破音 /t/ /d/", "舌尖顶住上牙后面，再一弹发出的 /t/ /d/。这一派动词的词尾都是它。"],
        ["音标", "写在斜线 / / 里的读音符号，告诉你一个词怎么读，比如 read 读 /riːd/。"],
        ["长音 / 短音", "长音拉长读，比如 /iː/；短音短短一下，比如 /e/。read 的过去式就是从长音变成了短音 /red/。"],
        ["第一性原理", "从最根本的原因去想问题：不死记，先弄明白「为什么会这样」。"],
        ["古英语", "一千多年前的英语。很多不规则动词的变法就是那时候留下来的。"]
      ]
    },
    // ───────── ② 水流音乐元音换挡派（i → a）（v2 + 讲解员，2026-10-30）─────────
    // 原一屏拆成 3 个镜头（门派旗 + sing·sang·sung + 秘诀 / swim · drink + 泳池 · 牛奶杯 / sit · give + 其余成员 + 结论）+ 🔮 预测 + 金句卡；
    // R4：读到 I swam in the blue sea 时泳池里的小脑袋游过去（场景动作）；He drank a big glass of milk 时杯里的牛奶被喝光（场景动作）；
    // She sat down 时场景里的小旅客坐到凳子上；I ran home and came back 时讲解员跑出去再跑回来。
    {
      build(k) {
        k.v2();
        const { N, T, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, W = PC_V2(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "这一派的秘密藏在中间的元音字母里：i 一换成 a，就变成过去式。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "第二门派：水流音乐元音换挡派", sub: "过去式四大门派", badges: ["💡", "✂️"], steps: ["① 门派旗", "② 秘诀", "③ 成员", "④ 结论", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 门派旗 + sing → sang → sung + 秘诀 ─────
        D.step(0); D.shot();
        W.flag("i → a", "元音换挡派", C.blue, C.tintBlue, 28);
        N("元音交替：", "不加 -ed，只把单词中间的元音换掉来表示时间，就像汽车换挡。");
        const m = k.mono("sing → sang → sung", 290, 150, 24, C.ink, 900);
        W.ring(m, 1, 2, C.red); W.ring(m, 8, 9, C.green); W.ring(m, 15, 16, C.blue);
        N("", "现在 sing 用 i，过去式 sang 用 a，过去分词 sung 用 u。");
        k.wait(.8);
        T("现在", m.x + 1.5 * m.cw, 178, go(.5), .5, { size: 14, color: C.red, weight: 900, anchor: "middle" });
        T("过去式", m.x + 8.5 * m.cw, 178, go(.5), .5, { size: 14, color: C.green, weight: 900, anchor: "middle" });
        T("过去分词", m.x + 15.5 * m.cw, 178, go(.5), .5, { size: 14, color: C.blue, weight: 900, anchor: "middle" });
        k.act(me, "point", S.at - 1.2, 1.2, { at: [m.x + 8.5 * m.cw, 150] });
        D.step(1);
        N("口腔张开度：", "嘴巴张多大。i 嘴扁扁，a 嘴张得最大，u 嘴巴半张收一点。");
        W.note("i 扁嘴 → a 张大嘴 → u 半张嘴", 290, 212, { color: C.blue, weight: 900, size: 17 });
        // 三张小嘴：扁 → 大 → 半张（跟着说明画出来）
        [[640, 4], [690, 13], [740, 8]].forEach(([x, ry], i) => {
          const d = k.ellipse(x, 206, 16, ry);
          k.P(d, go(.3), .3, { color: [C.red, C.green, C.blue][i], w: 2.5 }); k.F(d, go(.05, 0), { color: C.tintRed, op: 1 });
        });
        W.note("例：We sang English songs at the party.", 290, 240, { size: 15, color: C.grey });
        const sySg = sayAt("Sing, sang, sung. We sang English songs at the party.", { zh: "唱，唱了，唱过。我们在聚会上唱了英文歌。", word: "a sing sung We English songs at the party" });
        k.act(me, "cheer", sySg.t + sySg.dur * .6, 1.2);
        N("鼻音：", "气从鼻子出来的音，比如 -ng、-nk、-m、-n。带这些音的动词常在这一派。");
        W.secret("秘诀：带鼻音 -ng / -nk / -m / -n 的常用动词，多数在这一派", 290);
        k.say("Ng, nk. Sing, drink.", { zh: "-ng、-nk 结尾。唱、喝。", word: "ng nk", blocks: ["ng", "nk"] });
        k.wait(1.2);
        D.wipe();

        // ───── 镜头 2 · swim / drink ─────
        D.step(2); D.shot();
        N("", "成员 swim（游泳）：结尾 m 是鼻音，中间 i 换成 a。");
        const r1 = W.row({ y: 170, base: "swim", mean: "游泳", past: "swam", ipa: "过去分词 swum",
          tip: "i ➔ a 元音换挡", ex: "I swam in the blue sea last summer.", exWord: "swam",
          exN: ["", "去年夏天在大海里游泳：swam。"] });
        W.ring(r1.mb, 2, 3); W.ring(r1.mp, 2, 3, C.green);
        r1.done();
        // 场景：蓝色的海 + 游泳的小脑袋（R4 swam）
        W.waves(60, 420, 410);
        const gSw = W.swimmer(100, 404);
        const sySw = sayAt("Swim, swam, swum. I swam in the blue sea last summer.", { zh: "游，游了，游过。去年夏天我在蓝色的大海里游泳。", word: "swim swam swum I in blue sea last summer" });
        const tSw = sySw.t + sySw.dur * .35, dSw = Math.max(2, sySw.dur * .65);
        k.move(gSw, tSw, dSw, 270, 0, { ease: "linear" });
        for (let i = 0; i < 5; i++) k.squash(gSw, tSw + i * dSw / 5, dSw / 5, .18);
        k.actFx(["swam"], tSw, dSw, "小脑袋在大海里游过去");

        N("", "成员 drink（喝）：结尾 -nk 是鼻音，i 换成 a 就是 drank。");
        const r2 = W.row({ y: 250, base: "drink", mean: "喝水", past: "drank", ipa: "过去分词 drunk",
          tip: "i ➔ a 元音换挡", ex: "He drank a big glass of milk.", exWord: "drank",
          exN: ["", "他喝了一大杯牛奶：drank。"] });
        W.ring(r2.mb, 2, 3); W.ring(r2.mp, 2, 3, C.green);
        r2.done();
        // 场景：一大杯牛奶被喝光（R4 drank）
        const gMilk = W.glass(620, 430);
        const syDr = sayAt("Drink, drank, drunk. He drank a big glass of milk.", { zh: "喝，喝了，喝过。他喝了一大杯牛奶。", word: "drink drunk He big glass of milk" });
        const tDr = syDr.t + syDr.dur * .4, dDr = Math.max(1.6, syDr.dur * .6);
        k.move(gMilk, tDr, dDr, 0, 40, { ease: "move" }); k.fade(gMilk, tDr + dDr * .6, dDr * .4, 0);
        k.actFx(["drank"], tDr, dDr, "杯子里的牛奶被一口口喝光");
        k.look(me, 620, 400, tDr, dDr);
        k.say("We sang and swam last summer.", { zh: "去年夏天我们唱歌、游泳。", word: "sang" });
        k.wait(.4);
        D.wipe();

        // ───── 镜头 3 · sit / give + 其余成员 + 结论 ─────
        D.shot();
        N("", "sit（坐）和 give（给）：短 i 变 a 是 sat，长 i_e 变 a_e 是 gave。");
        const r3 = W.row({ y: 170, size: 22, base: "sit/give", mean: "坐 / 给", past: "sat/gave",
          tip: "短 i 变 a (sat)，长 i_e 变 a_e (gave)", ex: "She sat down and gave me a smile.", exWord: "sat",
          tipN: ["i_e：", "i 后面隔一个辅音再跟个不发音的 e，像 give、bike。"] });
        W.ring(r3.mb, 1, 2); W.ring(r3.mb, 6, 7); W.ring(r3.mp, 1, 2, C.green); W.ring(r3.mp, 5, 6, C.green);
        r3.done();
        // 场景：小旅客走到凳子边坐下，冲我们笑（R4 sat）
        const gS = D.sub();
        W.ground(380, 790, 420);
        W.stool(640, 380);
        const tv = k.actor("traveler", { x: 470, y: 420, s: .72, f: 1, g: gS });
        D.back();
        const sySt = sayAt("Sit, sat. Give, gave. She sat down and gave me a smile.", { zh: "坐，坐了。给，给了。她坐下来，对我笑了笑。", word: "sit sat give gave She down and me smile" });
        k.act(tv, "walk", sySt.t, Math.max(1.2, sySt.dur * .45), { to: 640 });
        k.act(tv, "sit", sySt.t + Math.max(1.2, sySt.dur * .45), Math.max(1.8, sySt.dur * .55 + .6), { words: ["sat"] });
        k.expr(tv, "happy", sySt.t + sySt.dur * .7, 2);

        k.say("She drank some milk and sat down.", { zh: "她喝了点牛奶，然后坐下了。", word: "drank" });
        N("", "begin、ring 也是 i 变 a。run、come 变 ran、came，不是 i 变 a，单独记！");
        const mo = W.others("begin/ring→began/rang · run/come→ran/came", 250);
        T("（不是 i 变 a）", 128 + 39 * 9.6 + 14, 250, go(.8), .8, { size: 15, color: C.red, weight: 900 });
        k.say("Begin, ring, rang. The bell rang.", { zh: "开始、响、响了。铃响了。", word: "begin ring rang" });
        const syRn = sayAt("Run, ran. Come, came. I ran home and came back. Ride a bike. Ed.", { zh: "跑，跑了。来，来了。我跑回家又回来了。骑自行车。-ed。", word: "run ran come came bike ed", blocks: ["ed"] });
        const tRn = syRn.t + syRn.dur * .3, dRn = Math.max(1.2, syRn.dur * .2);
        k.act(me, "run", tRn, dRn, { to: 1010, words: ["ran"] });
        k.act(me, "run", tRn + dRn + .2, dRn, { to: 892, words: ["came"] });
        k.act(me, "turn", tRn + 2 * dRn + .3, .3, { to: -1 });
        D.step(3);
        N("", "结论：i 换成 a，就是过去式。");
        W.fin("结论：sing→sang、swim→swam、drink→drank：中间的 i 换成 a = 过去式",
          "口诀：现在 i 扁嘴，过去 a 张嘴，换个元音就过去！");
        k.act(me, "point", S.at - 1.4, 1.2, { at: [200, 470] });
        N("口诀：", "现在 i 扁嘴，过去 a 张嘴，换个元音就过去！");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(4); D.shot();
        N("预测：", "「她在聚会上唱了一首歌」：sing 是元音换挡派，过去式怎么写？先想 3 秒！");
        W.quiz("🔮 她在聚会上唱了一首歌。", "→  She ___ a song at the party.  ( singed / sang )");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "i 换成 a：She sang a song at the party.");
        const tRev = go(.3);
        W.reveal("She sang a song at the party.");
        k.sfx("ding", tRev + .9);
        const syQ = sayAt("She sang a song at the party.", { zh: "她在聚会上唱了一首歌。", word: "She sang song at the party" });
        k.act(me, "cheer", syQ.t + syQ.dur * .5, 1.4);
        D.hold(1.4);

        k.quoteCard({ insight: "元音换挡派不加 -ed：\n只把中间的 i 换成 a，动词就开到了过去", rhyme: "口诀：现在 i 扁嘴，过去 a 张嘴，\n换个元音就过去！", hlLines: 2, foot: "⚔️ 过去式四大门派 · ② 元音换挡派" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "swam", act: "读到「I swam in the blue sea last summer」时泳池里的小脑袋游过去（场景动作 actFx + move + squash；动作库没有游泳）" },
        { word: "drank", act: "读到「He drank a big glass of milk」时杯子里的牛奶被喝光（场景动作 actFx + move + fade；动作库没有喝）" },
        { word: "sat", act: "读到「She sat down and gave me a smile」时场景里的小旅客走到凳子边坐下（walk + sit），然后笑" },
        { word: "ran", act: "读到「I ran home」时讲解员跑出去（run）" },
        { word: "came", act: "读到「and came back」时讲解员跑回来（run）" },
      ],
      r2skip: ["singed"],   // 预测题错误选项（不读）
      terms: [
        ["可信度徽章", "💡 门派、换挡、扁嘴张嘴都是帮助记忆的比喻；✂️ 简化说法：「带鼻音的动词多数在这一派」是大致规律，run → ran、come → came 这类要单独记。"],
        ["元音交替（Ablaut）", "不加 -ed，只换掉单词中间的元音来表示时间，比如 sing → sang → sung。"],
        ["元音换挡", "比喻：像汽车换挡一样，把元音 i 换成 a，动词就「开」到了过去。"],
        ["口腔张开度", "发音时嘴巴张多大：i 嘴扁扁，a 张得最大，u 半张。"],
        ["前高元音 i /ɪ/", "舌头往前、抬得高的元音，嘴巴很扁，比如 sing 里的 i。"],
        ["鼻音", "气从鼻子里出来的音，比如 -ng（sing）、-nk（drink）、-m（swim）、-n（begin）。"],
        ["日耳曼语", "英语、德语的「老祖宗」语言家族。元音换挡就是从那里传下来的老办法。"],
        ["i_e（不发音的 e）", "i 后面隔一个辅音再跟一个 e，这个 e 不读，比如 give、bike。"]
      ]
    },
    // ───────── ③ 长音减肥派（ee → e + t）（v2 + 讲解员，2026-10-30）─────────
    // 原一屏拆成 3 个镜头（门派旗 + 长条变短条 + 秘诀 / sleep · feel + 月亮 Zzz · 开心 / leave + 火车 + 其余成员 + 结论）+ 🔮 预测 + 金句卡；
    // R4：读到 I slept very well 时月亮旁飘起 Zzz（场景动作）；He felt very happy 时讲解员欢呼；The train left 时火车开走（场景动作）；
    // We met at the park 时两个小人从两边走到一起、挥手打招呼。
    {
      build(k) {
        k.v2();
        const { N, T, P, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, W = PC_V2(k, D), MONO = D.MONO;
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "这一派的动词原来读长长的 /iː/，变过去式时会「减肥」。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "第三门派：长音减肥派", sub: "过去式四大门派", badges: ["💡", "✂️"], steps: ["① 门派旗", "② 秘诀", "③ 成员", "④ 结论", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 门派旗 + 长音长条 → 短音短条 + 秘诀 ─────
        D.step(0); D.shot();
        W.flag("ee → e+t", "长音减肥派", C.green, C.tintGreen, 22);
        N("长元音：", "要拉长读的元音，比如 /iː/，读成「衣——」。ee、ea 常读 /iː/。");
        k.say("Ee, ea. Sleep, feel, leave.", { zh: "ee、ea。睡、感觉、离开。", word: "ee ea sleep feel leave", blocks: ["ee", "ea"] });
        k.wait(1);
        T("/iː/ 长", 280, 150, go(.6), .6, { size: 18, color: C.red, weight: 900, font: MONO });
        let d = k.rectD(356, 136, 200, 18);
        P(k.roughRect(356, 136, 200, 18), go(.8), .8, { color: C.red, w: 2.5 }); F(d, go(.2, 0), { color: C.tintRed, op: .9 });
        N("短元音：", "短短读一下的元音，比如 /e/。从长音变成短音，就像减肥变瘦。");
        k.wait(.5);
        k.arrow(570, 145, 615, 145, C.blue);
        d = k.rectD(630, 136, 60, 18);
        P(k.roughRect(630, 136, 60, 18), go(.6), .6, { color: C.green, w: 2.5 }); F(d, go(.2, 0), { color: C.tintGreen, op: .9 });
        T("/e/ 短", 702, 150, go(.6), .6, { size: 18, color: C.green, weight: 900, font: MONO });
        k.act(me, "point", S.at - 1, 1.2, { at: [660, 145] });
        D.step(1);
        N("音节：", "单词里一拍一拍的读音单位。词尾加上 t，这一拍变挤了，长音只好缩短。");
        k.mono("sleep /sliːp/ → slept /slept/", 290, 196, 20, C.ink, 900);
        W.secret("秘诀：词尾加 -t，音节变挤 → 长音 /iː/ 减肥成短音 /e/", 272);
        k.wait(1.4);
        D.wipe();

        // ───── 镜头 2 · sleep / feel ─────
        D.step(2); D.shot();
        N("", "成员 sleep（睡觉）：ee 缩成一个 e，后面加 t，就是 slept。");
        const r1 = W.row({ y: 170, base: "sleep", under: "/sliːp/ 睡觉", past: "slept", ipa: "/slept/",
          tip: "ee 缩成 e + t", ex: "I slept very well last night.", exWord: "slept",
          exN: ["", "昨晚睡得很好：slept。"] });
        W.ring(r1.mb, 2, 4); W.ring(r1.mp, 2, 3, C.green); W.ring(r1.mp, 4, 5, C.green);
        r1.done();
        // 场景：月亮 + 小床，Zzz 飘起来（R4 slept）
        const moon = "M150,330 a26,26 0 1,0 30,38 a20,20 0 1,1 -30,-38 Z";
        P(moon, go(.4), .4, { color: C.ink, w: 2.2 }); F(moon, go(.1, 0), { color: C.hlYellow, op: 1 });
        P(k.roughRect(220, 400, 150, 22), go(.4), .4, { color: C.ink, w: 2.5 }); F(k.rectD(220, 400, 150, 22), go(.1, 0), { color: C.tintBlue, op: 1 });
        P(k.wl(222, 384, 222, 436, .3) + " " + k.wl(368, 400, 368, 436, .3), go(.3), .3, { color: C.ink, w: 3 });
        const zz = [W.floaty("Z", 300, 380, { size: 18 }), W.floaty("z", 318, 360, { size: 16 }), W.floaty("Z", 336, 338, { size: 22 })];
        const sySl = sayAt("I slept very well last night.", { zh: "我昨晚睡得很好。", word: "I very well last night" });
        zz.forEach((g, i) => W.float(g, sySl.t + i * .35, Math.max(1.4, sySl.dur), -24));
        k.actFx(["slept"], sySl.t, Math.max(1.4, sySl.dur + .7), "月亮旁边飘起 Zzz：睡得很香");

        N("", "成员 feel（感觉）：也是 ee 缩成 e，再加 t，变成 felt。");
        const r2 = W.row({ y: 250, base: "feel", under: "/fiːl/ 感觉", past: "felt", ipa: "/felt/",
          tip: "ee 缩成 e + t", ex: "He felt very happy yesterday.", exWord: "felt",
          exN: ["", "昨天他感觉很开心：felt。"] });
        W.ring(r2.mb, 1, 3); W.ring(r2.mp, 1, 2, C.green); W.ring(r2.mp, 3, 4, C.green);
        r2.done();
        const syFe = sayAt("He felt very happy yesterday.", { zh: "他昨天很开心。", word: "felt He happy yesterday" });
        k.act(me, "cheer", syFe.t + syFe.dur * .4, 1.3);
        k.say("I slept well and felt happy.", { zh: "我睡得很好，感觉很开心。", word: "slept" });
        k.wait(.4);
        D.wipe();

        // ───── 镜头 3 · leave + 火车 + 其余成员 + 结论 ─────
        D.shot();
        N("清音 / 浊音：", "清音喉咙不震动，像 f、t；浊音喉咙会震动，像 v、d。");
        const r3 = W.row({ y: 170, base: "leave", under: "/liːv/ 离开", past: "left", ipa: "/left/",
          tip: "ea 缩成 e，浊音 v 变清音 f + t", ex: "The train left ten minutes ago.", exWord: "left",
          tipN: ["同化：", "两个音挨着，一个变得像另一个。v 挨着清音 t，就变成清音 f。"] });
        W.ring(r3.mb, 1, 3); W.ring(r3.mb, 3, 4, C.red); W.ring(r3.mp, 2, 3, C.red); W.ring(r3.mp, 3, 4, C.green);
        r3.done();
        // 场景：火车开走（R4 left）
        const gRail = D.sub(); W.ground(40, 790, 330); D.back();
        const gTr = W.train(80, 330);
        const syLf = sayAt("The train left ten minutes ago.", { zh: "火车十分钟前开走了。", word: "left The train ten minutes ago" });
        k.move(gTr, syLf.t + syLf.dur * .2, Math.max(1.6, syLf.dur * .8), 560, 0, { ease: "move" });
        k.fade(gTr, syLf.t + syLf.dur * .2 + Math.max(1.6, syLf.dur * .8) * .7, .5, 0);
        k.fade(gRail, syLf.t + syLf.dur * .2 + Math.max(1.6, syLf.dur * .8) * .7, .5, 0);
        k.actFx(["left"], syLf.t + syLf.dur * .2, Math.max(1.6, syLf.dur * .8), "火车开出站，走远了");

        N("", "还有 keep、sweep；meet、feed 直接减掉一个 e，变成 met、fed。");
        W.others("keep→kept · sweep→swept · meet/feed→met/fed", 250);
        k.say("Keep, kept. Sweep, swept. Meet. Feed, fed.", { zh: "保持、扫、见面、喂。", word: "keep kept sweep swept meet feed fed" });
        // 场景：两个小人从两边走到一起见面（R4 met）
        const gM = D.sub();
        W.ground(40, 790, 420);
        W.sign(420, 420, "公园");
        const pa = k.actor("traveler", { x: 120, y: 420, s: .66, f: 1, g: gM });
        const pb = k.actor("porter", { x: 720, y: 420, s: .66, f: -1, g: gM });
        D.back();
        const syMt = sayAt("We met at the park.", { zh: "我们在公园见面了。", word: "met" });
        const dMt = Math.max(1.6, syMt.dur);
        k.act(pa, "walk", syMt.t, dMt, { to: 370, words: ["met"] });
        k.act(pb, "walk", syMt.t, dMt, { to: 470, words: ["met"] });
        k.act(pa, "wave", syMt.t + dMt, 1.4); k.act(pb, "wave", syMt.t + dMt, 1.4);
        k.wait(.8);
        D.step(3);
        N("", "结论：ee / ea 缩成一个 e，后面加 t。");
        W.fin("结论：sleep→slept、feel→felt、leave→left：长音 ee/ea 缩成 e，再加 t",
          "口诀：加 t 太挤要减肥，两个 e 变一个 e！");
        k.act(me, "point", S.at - 1.4, 1.2, { at: [200, 470] });
        N("口诀：", "加 t 太挤要减肥，两个 e 变一个 e！");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(4); D.shot();
        N("预测：", "「我把房间打扫得很干净」：sweep 是长音减肥派，过去式怎么写？先想 3 秒！");
        W.quiz("🔮 我把房间打扫得很干净。", "→  I ___ the room clean.  ( sweeped / swept )");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "ee 缩成 e，再加 t：I swept the room clean.");
        const tRev = go(.3);
        W.reveal("I swept the room clean.");
        k.sfx("ding", tRev + .9);
        const syQ = sayAt("I swept the room clean.", { zh: "我把房间打扫得很干净。", word: "I swept the room clean" });
        k.act(me, "cheer", syQ.t + syQ.dur * .5, 1.4);
        D.hold(1.4);

        k.quoteCard({ insight: "长音减肥派：词尾加 t 太挤，\n长长的 /iː/ 只好缩成短短的 /e/", rhyme: "口诀：加 t 太挤要减肥，\n两个 e 变一个 e！", hlLines: 2, foot: "⚔️ 过去式四大门派 · ③ 长音减肥派" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "slept", act: "读到「I slept very well last night」时月亮旁边飘起 Zzz（场景动作 actFx + fade + move；动作库没有睡）" },
        { word: "left", act: "读到「The train left ten minutes ago」时火车开出站、走远（场景动作 actFx + move）" },
        { word: "met", act: "读到「We met at the park」时两个小人从两边走到公园站牌下（walk），见面挥手（wave）" },
      ],
      r2skip: ["sweeped"],   // 预测题错误选项（不读）
      terms: [
        ["可信度徽章", "💡 减肥、太挤都是帮助记忆的比喻；✂️ 简化说法：「加 t 太挤、长音只好缩短」是帮小学生记的说法，真实的读音变化来自很久以前的语音演变。"],
        ["长元音", "要拉长读的元音，比如 /iː/（读成「衣——」）。ee、ea 经常读 /iː/，比如 sleep、leave。"],
        ["短元音", "短短读一下的元音，比如 /e/，像 slept、felt 里的 e。"],
        ["长音减肥", "比喻：长元音 /iː/ 变过去式时缩成短元音 /e/，就像减肥变瘦了。"],
        ["音节", "单词里一拍一拍的读音单位。sleep 是一拍，加上 t 后这一拍变挤，长音只好缩短。"],
        ["清音", "发音时喉咙不震动的辅音，比如 f、t、p、k。"],
        ["浊音", "发音时喉咙会震动的辅音，比如 v、d、b、g。"],
        ["同化", "两个音挨在一起时，一个变得像另一个。leave 里的浊音 v 挨着清音 t，就变成清音 f：left。"]
      ]
    },
    // ───────── ④ -ought / -aught 六大护法派（v2 + 讲解员，2026-10-30）─────────
    // 原一屏拆成 3 个镜头（门派旗 + gh 不发音 + 黄金铁律 + 秘诀 / buy · bring + 礼物盒 · 小狗 / teach + 其余成员 + 接球 + 结论）+ 🔮 预测 + 金句卡；
    // R4：读到 Mom bought a new dress 时购物袋里冒出新裙子（场景动作）；He brought his puppy to the park 时小旅客带着小狗走到公园；
    // Miss White taught us English 时讲解员指着黑板；I thought he caught the ball 时小旅客伸手接住飞来的球。
    {
      build(k) {
        k.v2();
        const { N, T, P, F, go, estW } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, W = PC_V2(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "bought、brought、caught、taught 长得太像，到底怎么写？");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "think", 2.0, 1.8);
        D.scene({ title: "第四门派：-ought / -aught 护法派", sub: "过去式四大门派", badges: ["💡", "✂️"], steps: ["① 门派旗", "② 铁律", "③ 成员", "④ 结论", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 门派旗 + gh 不发音 + 黄金铁律 ─────
        D.step(0); D.shot();
        N("护法：", "比喻：这一派成员都带着同一个「保镖」尾巴 -ought 或 -aught。");
        W.flag("-ought/-aught", "六大护法派", C.ink, C.tintInk, 20);
        k.wait(.4);
        N("不发音字母：", "写出来但不读的字母。gh 在这里不发音，ought、aught 都读 /ɔːt/。");
        const m = k.mono("-ought = -aught = /ɔːt/", 290, 150, 22, C.ink, 900);
        P(k.wl(m.x0("gh") + 2, 130, m.x1("gh") - 2, 148, .4), go(.35), .35, { color: C.red, w: 3 });
        P(k.wl(m.x0("gh", 1) + 2, 130, m.x1("gh", 1) - 2, 148, .4), go(.35), .35, { color: C.red, w: 3 });
        k.note("gh 不发音！", 610, 150, { color: C.red, weight: 900, size: 17 });
        k.say("Ought, aught, gh. Teach, catch, buy, bring, think, fight.", { zh: "-ought、-aught、gh。教、抓、买、带来、想、打架。", word: "ought aught gh a teach catch buy bring think fight", blocks: ["ought", "aught", "gh"] });
        k.act(me, "surprised", S.at - 1.2, 1);
        D.step(1);
        N("黄金铁律：", "看原形里有没有字母 a：有 a 写 -aught，没有 a 写 -ought。");
        T("原形有 a → -aught", 290, 196, go(1.2), 1.2, { size: 19, color: C.red, weight: 900 });
        k.note("（teach、catch）", 290 + estW("原形有 a → -aught", 19) + 10, 196, { size: 16 });
        T("没有 a → -ought", 290, 230, go(1.2), 1.2, { size: 19, color: C.blue, weight: 900 });
        k.act(me, "point", S.at - 1, 1.2, { at: [380, 210] });
        W.secret("秘诀：先找原形里的字母 a，再决定写 -aught 还是 -ought", 280);
        k.wait(1.4);
        D.wipe();

        // ───── 镜头 2 · buy / bring ─────
        D.step(2); D.shot();
        N("", "成员 buy（买）：原形里没有 a，所以写 -ought：bought。");
        const r1 = W.row({ y: 170, base: "buy", mean: "买", past: "bought", ipa: "/bɔːt/",
          tip: "无 a 用 -ought（去商店买礼物）", ex: "Mom bought a new dress for me.", exWord: "bought",
          exN: ["", "妈妈给我买了一条新裙子：bought。"] });
        W.ring(r1.mp, 1, 6, C.blue);
        r1.done();
        // 场景：购物袋里冒出一条新裙子（R4 bought）
        W.ground(40, 790, 430);
        const bag = "M90,430 L84,370 L156,370 L150,430 Z";
        P(bag, go(.4), .4, { color: C.ink, w: 2.5 }); F(bag, go(.1, 0), { color: C.tintBlue, op: 1 });
        P("M104,370 q16,-24 32,0", go(.3), .3, { color: C.ink, w: 2.5 });
        const gDr = D.sub(); k.hide(gDr);
        const dress = "M110,306 L130,306 L133,322 L150,362 L90,362 L107,322 Z";   // 小裙子：上身 + 散开的裙摆
        P(dress, go(.3, 0), .3, { color: C.red, w: 2.5 }); F(dress, go(.05, 0), { color: C.tintRed, op: 1 });
        P("M110,306 L106,292 M130,306 L134,292 M107,322 L133,322", go(.1, 0), .1, { color: C.red, w: 2.2 });
        D.back();
        const syBo = sayAt("Mom bought a new dress for me.", { zh: "妈妈给我买了一条新裙子。", word: "Mom new dress for me" });
        k.fade(gDr, syBo.t + syBo.dur * .3, .4, 1); k.move(gDr, syBo.t + syBo.dur * .3, Math.max(1, syBo.dur * .5), 0, -20, { ease: "move" });
        k.squash(gDr, syBo.t + syBo.dur * .3 + .5, .4, .2);
        k.actFx(["bought"], syBo.t + syBo.dur * .3, Math.max(1, syBo.dur * .6), "购物袋里冒出买来的新裙子");

        N("", "成员 bring（带来）：开头 br- 留着，没有 a，写 brought。");
        const r2 = W.row({ y: 250, base: "bring", mean: "带来", past: "brought", ipa: "/brɔːt/",
          tip: "br- 开头保留，别和 bought 混！", ex: "He brought his puppy to the park.", exWord: "brought",
          exN: ["", "注意：bought 是「买了」，brought 多一个 r，是「带来了」。"] });
        W.ring(r2.mb, 0, 2, C.red); W.ring(r2.mp, 0, 2, C.red); W.ring(r2.mp, 2, 7, C.blue);
        r2.done();
        // 场景：小旅客带着小狗走到公园（R4 brought）
        const gB = D.sub();
        W.sign(700, 430, "公园");
        const tv = k.actor("traveler", { x: 260, y: 430, s: .7, f: 1, g: gB });
        D.back();
        const gPup = W.puppy(310, 430);
        const syBr = sayAt("Br. He brought his puppy to the park.", { zh: "br-。他把小狗带到了公园。", word: "brought br He his puppy to the park", blocks: ["br"] });
        const tBr = syBr.t + syBr.dur * .25, dBr = Math.max(2, syBr.dur * .75);
        k.act(tv, "walk", tBr, dBr, { to: 600, words: ["brought"] });
        k.move(gPup, tBr, dBr, 340, 0, { ease: "move" });
        for (let i = 0; i < 5; i++) k.squash(gPup, tBr + i * dBr / 5, dBr / 5, .15);
        k.wait(.4);
        D.wipe();

        // ───── 镜头 3 · teach + 其余成员 + 接球 + 结论 ─────
        D.shot();
        N("", "成员 teach（教）：原形 teach 里有字母 a，所以必须写 -aught！");
        const r3 = W.row({ y: 170, base: "teach", mean: "教课", past: "taught", ipa: "/tɔːt/",
          tip: "原形 teach 里有字母 a ➔ 必用 -aught！", ex: "Miss White taught us English last year.", exWord: "taught",
          exN: ["", "去年怀特老师教我们英语：taught。"] });
        W.ring(r3.mb, 2, 3, C.red); W.ring(r3.mp, 1, 6, C.red);
        r3.done();
        const syTa = sayAt("Miss White taught us English last year.", { zh: "怀特老师去年教我们英语。", word: "taught Miss White us English last year" });
        k.act(me, "point", syTa.t + syTa.dur * .2, Math.max(1.2, syTa.dur * .6), { at: [r3.px + 60, 160], words: ["taught"] });

        k.say("Mom bought me a book. Mr. Li taught us English.", { zh: "妈妈给我买了一本书。李老师教我们英语。", word: "bought" });
        N("", "还有 think→thought、fight→fought；catch 有 a，所以是 caught。");
        W.others("think→thought · fight→fought · catch→caught", 250);
        k.say("I thought about it. They fought.", { zh: "我想了想。他们打架了。", word: "thought fought" });
        // 场景：飞来的球被小旅客接住（R4 caught）
        const gC = D.sub();
        W.ground(40, 790, 420);
        const ct = k.actor("traveler", { x: 560, y: 420, s: .7, f: -1, g: gC });
        D.back();
        const gBall = W.ball(120, 300);
        const syCa = sayAt("I thought he caught the ball.", { zh: "我以为他接住了球。", word: "caught" });
        const tCa = syCa.t + syCa.dur * .2, dCa = Math.max(1.4, syCa.dur * .6);
        k.path(gBall, tCa, dCa, [[140, -50], [300, -20], [418, 40]]);
        k.act(ct, "take", tCa + dCa * .55, Math.max(1, dCa * .6), { words: ["caught"] });
        k.act(ct, "cheer", tCa + dCa + .6, 1.2);
        k.wait(.6);
        D.step(3);
        N("", "结论：原形有 a 写 -aught，没有 a 写 -ought，都读 /ɔːt/。");
        W.fin("结论：有 a → -aught（taught、caught）；没 a → -ought（bought…）",
          "口诀：原形有 a 用 aught，其余全用 ought，gh 不出声！");
        k.act(me, "point", S.at - 1.4, 1.2, { at: [200, 470] });
        N("口诀：", "原形有 a 用 aught，其余全用 ought，gh 不出声！");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(4); D.shot();
        N("预测：", "「爸爸昨天给我买了一只风筝」：buy 原形里有没有 a？先想 3 秒！");
        W.quiz("🔮 爸爸昨天给我买了一只风筝。", "→  Dad ___ me a kite yesterday.  ( baught / bought )");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "buy 里没有字母 a，写 -ought：Dad bought me a kite yesterday.");
        const tRev = go(.3);
        W.reveal("Dad bought me a kite yesterday.");
        k.sfx("ding", tRev + .9);
        const card = k.prop("card", 0, 0, { text: "-ought", hidden: true });
        const syQ = sayAt("Dad bought me a kite yesterday.", { zh: "爸爸昨天给我买了一只风筝。", word: "Dad bought me kite yesterday" });
        k.act(me, "holdCard", syQ.t + syQ.wd, Math.max(1.4, syQ.dur - syQ.wd + .3), { prop: card });
        k.act(me, "cheer", syQ.t + syQ.dur + .4, 1.2);
        D.hold(1.4);

        k.quoteCard({ insight: "-ought / -aught 读音一样，都读 /ɔːt/：\n先找原形里的字母 a，就知道怎么写", rhyme: "口诀：原形有 a 用 aught，\n其余全用 ought，gh 不出声！", hlLines: 2, foot: "⚔️ 过去式四大门派 · ④ 护法派" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "bought", act: "读到「Mom bought a new dress for me」时购物袋里冒出买来的新裙子（场景动作 actFx + fade + move；动作库没有买）" },
        { word: "brought", act: "读到「He brought his puppy to the park」时小旅客带着小狗走到公园站牌下（walk + 小狗 move）" },
        { word: "taught", act: "读到「Miss White taught us English last year」时讲解员指着黑板上的 taught（point）" },
        { word: "caught", act: "读到「I thought he caught the ball」时球飞过来，小旅客伸手接住（path + take），接住后欢呼（cheer）" },
      ],
      r2skip: ["baught"],   // 预测题错误选项（不读）
      terms: [
        ["可信度徽章", "💡 护法、保镖尾巴都是帮助记忆的比喻；✂️ 简化说法：「原形有 a 写 -aught」只对 teach、catch 这类常用词管用，其他少见的词要查词典。"],
        ["-ought / -aught", "这一派过去式共同的尾巴，都读 /ɔːt/，比如 bought、thought、taught、caught。"],
        ["六大护法", "比喻：这一派成员都带着同一个「保镖」尾巴 -ought 或 -aught，一眼就能认出来。"],
        ["不发音字母", "写出来但不读的字母。-ought、-aught 里的 gh 就不发音。"],
        ["黄金铁律", "原形里有字母 a（teach、catch）→ 写 -aught；没有 a（buy、think、bring、fight）→ 写 -ought。"],
        ["舌根摩擦音", "舌头后部靠近上颚、让气挤出来的音。古英语里 gh 就读这个音，后来不读了。"],
        ["元音后移", "发元音时舌头的位置往后退，ought / aught 里的元音就是这样变成 /ɔː/ 的。"]
      ]
    }
  ];
})();
