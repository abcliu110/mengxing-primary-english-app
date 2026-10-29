// ==================== 白板脚本：⑪ 英语「五大基本句型」骨骼透视机 5 个案例 ====================
// 数据来源：主文件 FIVE_SENTENCE_PATTERNS_DB（5 项 → 5 个案例）。骨骼部件和金句必须和数据一字不差。
// 版面：上方一排「骨架方块」S / V / O / P / C（y 84–172）→ 中间两句金句，词下面用小括号标出 S/V/O… →
//       底部绿框写骨骼公式，字幕给口诀。本页签的小工具都在这个 IIFE 里，不改引擎。
// v2 升级（2026-10-30，决策 24）：逐个案例升引擎 v2 + 讲解员（3 个镜头 → 🔮 预测 → 金句卡），v2 案例用 vtools()；升级前整份文件原样保存在 cases/five_patterns_classic.js。依赖 wo_props。
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

  // ───────── v2 版面（2026-10-30，决策 24）─────────
  // 讲解员站在右侧 x≈892，内容收在 x≤800；骨架方块下移到 y 140（让出右上角的进度条）；原来一屏的方块 + 两句金句 + 铁律拆成 3 个镜头；
  // 配色只用 V3 k.PAL：S 主语墨黑、V 谓语蓝、O / IO 宾语红（靶心 / 收礼的人）、P 表语 / OC 宾补 / DO 物绿、挂件灰；橙 / 紫 / 褐都改 V3。
  const VFILL = { "#2563eb": "#dbeafe", "#e11d48": "#ffe4e6", "#059669": "#d1fae5", "#1f2937": "#f1f5f9", "#64748b": "#f1f5f9" };
  function vtools(k, D) {
    const { P, T, F, go, wl, ellipse, roughRect, rectD, estW } = k, C = k.PAL;
    const BY = 140, BH = 54, WS = 20;                      // v2：方块顶边 140（原 96）
    const h = {
      BY, BH,
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
          F(rectD(b.x, BY, b.w, BH), go(.2, 0), { color: VFILL[b.color], op: .6 });
        } else {
          P(roughRect(b.x, BY, b.w, BH), go(.7), .7, { color: b.color, w: 3 });
          F(rectD(b.x, BY, b.w, BH), go(.2, 0), { color: VFILL[b.color], op: .9 });
        }
        if (b.note) T(b.note, b.cx, BY + BH + 22, go(.5), .5, { size: 14, color: C.grey, weight: 700, anchor: "middle" });
      },
      word(b) {
        const dur = Math.max(.5, b.word.length * .06);
        T(b.word, b.cx, BY + BH / 2 + 7, go(dur), dur, { size: WS, color: C.ink, weight: 900, anchor: "middle", font: D.MONO });
      },
      // 等宽英文句子：太长时自动缩小，保证不越过 x=800（讲解员在右边）
      line(text, y, size = 20, color = C.ink, x = 40) {
        size = Math.min(size, (800 - x) / (text.length * .6));
        const dur = Math.max(1, text.length * .05);
        T(text, x, y, go(dur), dur, { size, color, font: D.MONO, weight: 700 });
        const cw = size * .6;
        const at = (sub, nth = 0) => {
          const re = new RegExp("(^|[^A-Za-z])" + sub.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![A-Za-z])", "g");
          let m, n = 0;
          while ((m = re.exec(text))) { if (n++ === nth) return m.index + m[1].length; re.lastIndex = m.index + 1; }
          return -1;
        };
        return { x, y, size, cw, text, at, x0: (s, n) => x + at(s, n) * cw, x1: (s, n) => x + (at(s, n) + s.length) * cw };
      },
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
      redX(x, y) { P(wl(x, y, x + 20, y + 30, .6) + " " + wl(x + 20, y, x, y + 30, .6), go(.5), .5, { color: C.red, w: 4 }); },
      // 普通文字（中文或混排）
      note(text, x, y, o = {}) {
        const dur = o.dur || Math.max(.6, [...text].length * .06);
        T(text, x, y, go(dur), dur, { size: 16, color: C.grey, weight: 700, ...o });
      },
      hook(x, y, color = C.red) {
        P(`M${x},${y - 26} L${x},${y - 10} Q${x},${y - 2} ${x - 7},${y - 2} Q${x - 13},${y - 2} ${x - 13},${y - 9}`, go(.4), .4, { color, w: 3 });
        P(ellipse(x, y - 30, 4, 4), go(.15), .15, { color, w: 2 });
      },
      heart(x, y, color = C.red) {
        const d = `M${x},${y + 9} C${x - 16},${y - 2} ${x - 10},${y - 15} ${x},${y - 6} C${x + 10},${y - 15} ${x + 16},${y - 2} ${x},${y + 9} Z`;
        P(d, go(.4), .4, { color, w: 2.2 }); F(d, go(.1, 0), { color: C.tintRed, op: 1 });
      },
      target(x, y) {
        [26, 17, 8].forEach((r, i) => { P(ellipse(x, y, r, r), go(.3), .3, { color: i === 1 ? C.ink : C.red, w: 2.5 }); });
      },
      // 天平式的等号弧：从 a 方块底部弯到 b 方块底部
      arc(a, b, label) {
        const y = BY + BH + 6, mx = (a.cx + b.cx) / 2;
        P(`M${a.cx},${y} Q${mx},${y + 48} ${b.cx},${y}`, go(.7), .7, { color: C.blue, w: 2.5, dash: "6 5" });
        T(label, mx, y + 44, go(.8), .8, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      },
      // 结尾绿框：骨骼公式 + 灰色中文（宽度收在 x≤800，讲解员不用退场）
      final(formula, zhLine) {
        const w = Math.min(784, Math.max(420, estW(formula, 21) + 50));
        P(roughRect(16, 448, w, 48), go(.9), .9, { color: C.green, w: 2 });
        F(rectD(16, 448, w, 48), go(.2, 0), { color: C.tintGreen, op: .55 });
        T(formula, 40, 479, go(1.6), 1.6, { size: 21, color: C.green, weight: 900 });
        T(zhLine, 40, 524, go(1.4), 1.4, { size: 17, color: C.grey });
      },
      // 🔮 预测题框
      quiz(zhLine, ask) {
        P(roughRect(40, 206, 760, 150), go(.8), .8, { color: C.green, w: 2.5 });
        F(rectD(40, 206, 760, 150), go(.2, 0), { color: C.tintGreen, op: .9 });
        T(zhLine, 64, 246, go(.8), .8, { size: 22, color: C.ink, weight: 900 });
        T(ask, 64, 286, go(1), 1, { size: 21, color: C.ink, weight: 900, font: D.MONO });
      },
      reveal(text) { T(text, 64, 330, go(1), 1, { size: 22, color: C.green, weight: 900, font: D.MONO }); }
    };
    return h;
  }

  WB_LAB.five_patterns = [
    // ───────── ① SV 自给自足型（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/five_patterns_classic.js（R1 零丢失）。原一屏拆成 3 个镜头（骨架 + 挂件 / 金句 / 挂钩 + 铁律 + 公式）+ 🔮 预测 + 金句卡；
    // R4：太阳读到 rises 时从山后升起；三只鸟读到 fly 时飞过；讲解员读到 run 时跑一段、读到 look at the blackboard 时指黑板、读到 Play with me 时跳起来；预测题 Look at the sky 时指向天空。
    {
      build(k) {
        k.v2();
        const { N, P, T, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = vtools(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "这节课：拍一张英语句子的「X 光片」，看清它的骨头！");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "句型 ① SV", sub: "自给自足型 · 无需宾语", badges: ["💡", "✂️"], steps: ["① 骨架", "② 挂件", "③ 金句", "④ 挂钩", "⑤ 公式·口诀", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 骨架方块 + 挂件 ─────
        D.step(0); D.shot();
        N("五大基本句型：", "英语句子最常见的 5 种骨架。句子再长，骨架也逃不出这 5 种。");
        const B = h.layout([
          { role: "S 主语", word: "The sun", color: C.ink, note: "谁？" },
          { role: "V 不及物谓语", word: "rises", color: C.blue, note: "做什么？" },
          { role: "地点挂件", word: "in the east", color: C.grey, note: "在哪儿（可有可无）", dashed: true }
        ]);
        N("主语 S：", "句子在说「谁」或「什么」。S 是 Subject（主语）的第一个字母。");
        h.block(B[0]);
        N("谓语 V：", "说主语「做什么」的动词，是句子的核心。V 来自 Verb（动词）。");
        h.block(B[1], B[0]);
        k.act(me, "point", S.at - .6, 1.2, { at: [B[1].cx, h.BY + 20] });
        N("", "把词放进骨架：The sun 是主语，rises（升起）是谓语。");
        h.word(B[0]); h.word(B[1]);
        D.step(1);
        N("挂件：", "补充「在哪儿、怎么样」的部分，比如 in the east（在东方）。去掉骨架也不散。");
        h.block(B[2], B[1]); h.word(B[2]);
        // 场景：太阳从东边的山后升起（R4 rises）——太阳先画，山后画（山的填色盖住太阳下半截）
        const gSun = D.sub();
        P(k.ellipse(640, 420, 24, 24), go(.4), .4, { color: C.ink, w: 2.5 }); F(k.ellipse(640, 420, 24, 24), go(.1, 0), { color: C.hlYellow, op: 1 });
        let rays = ""; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += ` M${(640 + Math.cos(a) * 31).toFixed(1)},${(420 + Math.sin(a) * 31).toFixed(1)} L${(640 + Math.cos(a) * 40).toFixed(1)},${(420 + Math.sin(a) * 40).toFixed(1)}`; }
        P(rays.trim(), go(.3), .3, { color: C.ink, w: 2 });
        D.back();
        const hill = `M500,440 Q560,392 640,404 Q720,392 790,440 Z`;
        P(hill, go(.5), .5, { color: C.green, w: 2.5 }); F(hill, go(.1, 0), { color: C.tintGreen, op: 1 });
        P(k.wl(440, 440, 800, 440, .5), go(.3), .3, { color: C.ink, w: 2 });
        T("东", 760, 470, go(.3), .3, { size: 15, color: C.grey, weight: 900, anchor: "middle" });
        const sySun = sayAt("The sun rises in the east.", { zh: "太阳从东方升起。", word: "The sun rises in the east" });
        k.move(gSun, sySun.t + sySun.wd, Math.max(1.4, sySun.dur - sySun.wd), 0, -96, { ease: "move" });
        k.actFx(["rises"], sySun.t + sySun.wd, Math.max(1.4, sySun.dur - sySun.wd), "太阳从东边的山后慢慢升起");
        N("不及物动词 Vi：", "主语自己就能完成的动作，力气不用传给别人，后面不用接对象。");
        h.note("自己就能完成：rise 升起 · fly 飞 · sleep 睡 · run 跑 · smile 笑", 40, 262, { color: C.blue, size: 16, weight: 900 });
        const syRun = sayAt("Rise, fly, sleep, run, smile. Babies sleep. Kids run and smile.", { zh: "升起、飞、睡、跑、笑。宝宝睡觉。孩子们跑着、笑着。", word: "rise fly sleep run smile" });
        const tr = syRun.t + syRun.dur * .62, hr = Math.max(.8, syRun.dur * .2);
        k.act(me, "run", tr, hr, { to: 830, words: ["run"] });
        k.act(me, "walk", tr + hr, hr, { to: 892 });
        k.act(me, "turn", tr + 2 * hr, .3, { to: -1 });
        k.expr(me, "happy", tr + 2 * hr, 1.2);
        k.wait(.4);
        D.wipe();

        // ───── 镜头 2 · 金句 Birds fly ─────
        D.step(2); D.shot();
        N("", "看金句：Birds fly 就是骨架，后面的部分全是挂件。");
        const m1 = h.line("Birds fly happily in the blue sky.", 170);
        // 三只鸟飞过蓝天（R4 fly）
        const gB = D.sub();
        [[0, 0], [34, 14], [66, -6]].forEach(([dx, dy]) => P(`M${90 + dx},${330 + dy} q8,-9 15,0 q7,-9 15,0`, go(.15, .02), .15, { color: C.ink, w: 2.2 }));
        D.back(); k.hide(gB);
        P(k.wl(40, 400, 800, 400, .4), go(.3), .3, { color: C.blue, w: 1.6, dash: "5 8" });
        const syB = sayAt("Birds fly happily in the blue sky.", { zh: "鸟儿在蓝天里快乐地飞翔。" });
        k.fade(gB, syB.t, .3, 1);
        k.path(gB, syB.t, syB.dur, [[200, -30], [420, 6], [600, -24]]);
        for (let i = 0; i < 6; i++) k.squash(gB, syB.t + .2 + i * (syB.dur - .3) / 6, (syB.dur - .3) / 6, .22);
        k.actFx(["fly"], syB.t, syB.dur, "三只鸟扇着翅膀飞过蓝天");
        h.tags(m1, [["Birds", "S", C.ink], ["fly", "V", C.blue]]);
        k.act(me, "point", S.at - .6, 1.2, { at: [m1.x1("fly"), 160] });
        N("副词：", "说明动作「怎么样」的词，常以 -ly 结尾，比如 happily（快乐地）。");
        h.tags(m1, [["happily", "副词挂件", C.grey], ["in the blue sky", "地点挂件", C.grey]]);
        k.say("Birds fly happily in the blue sky.", { zh: "鸟儿在蓝天里快乐地飞翔。", word: "Birds happily blue sky ly", blocks: ["ly"] });
        k.wait(.3);
        D.wipe();

        // ───── 镜头 3 · 介词挂钩 + 铁律 + 公式 ─────
        D.step(3); D.shot();
        N("宾语：", "动作的对象，就是「对谁、对什么」。不及物动词不能直接接宾语。");
        const m2 = h.line("Please listen to the teacher and look at the blackboard!", 166);
        k.say("Please listen to the teacher and look at the blackboard!", { zh: "请听老师讲，看黑板！", word: "listen to" });
        N("介词挂钩：", "to、at、for、with 这类小词像钩子，挂在不及物动词后面，才能接上对象。");
        const x1 = h.ring(m2, "to"); h.hook(x1, m2.y - 22);
        const x2 = h.ring(m2, "at"); h.hook(x2, m2.y - 22);
        h.tags(m2, [["listen", "V", C.blue], ["the teacher", "对象", C.red], ["look", "V", C.blue], ["the blackboard", "对象", C.red]]);
        N("铁律：", "一定要守的规矩：listen to、look at、wait for，钩子不能丢！");
        h.note("必考：", 40, 238, { color: C.red, size: 17, weight: 900, dur: .4 });
        h.note("listen TO · look AT · wait FOR · arrive IN(AT)", 100, 238, { color: C.red, size: 17, weight: 900, font: D.MONO, dur: 1.4 });
        // 小黑板（R4 look at the blackboard：讲解员读到时指向黑板）
        P(k.roughRect(470, 280, 300, 110), go(.6), .6, { color: C.ink, w: 3 });
        F(k.rectD(470, 280, 300, 110), go(.1, 0), { color: C.tintInk, op: 1 });
        T("黑板", 620, 412, go(.3), .3, { size: 14, color: C.grey, weight: 700, anchor: "middle" });
        const syL = sayAt("Please look at the blackboard and listen to the teacher.", { zh: "请看黑板，听老师讲。", word: "Please look at blackboard and teacher" });
        k.act(me, "point", syL.t + syL.wd, Math.max(1.4, syL.dur - syL.wd), { at: [620, 330], words: ["look"] });
        k.look(me, 620, 330, syL.t + syL.wd, syL.dur - syL.wd);
        k.say("Wait for me! We arrive at school at eight.", { zh: "等等我！我们八点到学校。", word: "wait FOR arrive" });
        D.step(4);
        N("", "这就是句型 ①：主语 + 不及物动词，挂件随便挂。");
        const syP = sayAt("Subject, verb. Play with me!", { zh: "主语，动词。和我一起玩吧！", word: "Subject Verb with" });
        k.act(me, "jump", syP.t + syP.dur * .5, Math.max(1, syP.dur * .5), { words: ["play"] });
        h.final("S（主语）+ Vi（不及物动词）  [+ 副词 / 介词短语挂件]", "鸟儿在蓝天上快乐地飞翔。  自己能做，不带宾语！");
        N("口诀：", "不及物动词自己就能做；想接对象，先挂介词钩。");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(5); D.shot();
        N("预测：", "「看天空！」look 是不及物动词，后面要接 the sky，中间该挂哪个钩子？先想 3 秒！");
        h.quiz("🔮 看天空！", "→  Look ___ the sky!");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "look 后面挂钩子 at，才能接上 the sky：Look at the sky!");
        const tRev = go(.3);
        h.reveal("Look at the sky!");
        k.sfx("ding", tRev + .9);
        const syQ = sayAt("Look at the sky!", { zh: "看天空！", word: "look at the sky" });
        k.act(me, "point", syQ.t, Math.max(1.4, syQ.dur), { at: [700, 110], words: ["look"] });
        k.look(me, 700, 110, syQ.t, syQ.dur);
        k.act(me, "cheer", syQ.t + Math.max(1.4, syQ.dur) + .1, 1.2);
        D.hold(1.4);

        k.quoteCard({ insight: "不及物动词自己就能把事做完，\n后面不直接接宾语；挂件随便挂", rhyme: "口诀：不及物动词自己就能做；\n想接对象，先挂介词钩。", hlLines: 2, foot: "🦴 五大基本句型 · 句型 ① SV" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "rises", act: "读到「The sun rises in the east」时太阳从东边的山后升起（场景动作 actFx + move）" },
        { word: "run", act: "读到「Kids run and smile」时讲解员往左跑一段再走回（run）" },
        { word: "fly", act: "读到「Birds fly happily in the blue sky」时三只鸟扇着翅膀飞过（场景动作 actFx + path + squash）" },
        { word: "look", act: "读到「Please look at the blackboard」时讲解员指向小黑板并看过去（point + look）；预测题「Look at the sky!」时指向天空" },
        { word: "play", act: "读到「Play with me!」时讲解员跳起来（jump）" },
      ],
      r2skip: ["SV", "Vi"],   // 成分标签（主语 S、不及物动词 Vi），不读
      terms: [
        ["可信度徽章", "💡 骨骼、挂件、介词挂钩、X 光片都是帮助记忆的比喻；✂️ 简化说法：「五大基本句型」是中小学常用的分法，有的语法书分得更细（如 Quirk 等人的《英语语法大全》分 7 种，多出必须带地点等状语的两种）。"],
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
    // ───────── ② SVP 状态天平型（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/five_patterns_classic.js（R1 零丢失）。原一屏拆成 3 个镜头（骨架 + 天平 + 系动词两类 / 金句 + -ly 避坑 + 铁律 / 秋天金句 + 公式）+ 🔮 预测 + 金句卡；
    // R4：鸡汤读到 smells 时冒出热气；树叶读到 turn yellow 时由绿变黄、飘落一片；读到 gets cool 时吹过一阵凉风；预测题讲解员举起一枝花。系动词本身不是肢体动作（同 bamboo_tree ② 先例），只做场景变化。
    {
      build(k) {
        k.v2();
        const { N, P, T, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = vtools(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "句型 ②：有一种动词不是动作，而像数学里的等号「=」。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "句型 ② SVP", sub: "状态天平型 · 绝不用副词", badges: ["💡"], steps: ["① 骨架", "② 天平", "③ 金句", "④ 避坑", "⑤ 变化·公式", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 骨架方块 + 状态天平 + 两类系动词 ─────
        D.step(0); D.shot();
        const B = h.layout([
          { role: "S 主语", word: "The chicken soup", color: C.ink },
          { role: "V 感官系动词 =", word: "smells / tastes", color: C.blue },
          { role: "P 形容词表语", word: "so delicious!", color: C.green }
        ]);
        N("主语 S：", "The chicken soup（鸡汤），这句话在说它。");
        h.block(B[0]); h.word(B[0]);
        N("系动词：", "不表示动作，像一座「等号桥」，把后面的状态交给主语。");
        h.block(B[1], B[0]); h.word(B[1]);
        k.act(me, "point", S.at - .6, 1.2, { at: [B[1].cx, h.BY + 20] });
        N("表语 P：", "系动词后面的部分，说主语「是什么、怎么样」，常用形容词。");
        h.block(B[2], B[1]); h.word(B[2]);
        N("形容词：", "描述样子、味道、心情的词，比如 delicious（美味的）、sweet（甜的）。");
        // 场景：一碗鸡汤，读到 smells 时冒热气（R4 场景变化）
        const bowl = `M560,392 Q620,452 680,392 Z`;
        P(bowl, go(.5), .5, { color: C.ink, w: 2.5 }); F(bowl, go(.1, 0), { color: C.hlYellow, op: .7 });
        P(k.wl(548, 392, 692, 392, .4), go(.3), .3, { color: C.ink, w: 2.5 });
        const gSt = D.sub();
        [590, 620, 650].forEach(x => P(`M${x},380 q-8,-12 0,-24 q8,-12 0,-24`, go(.2, .02), .2, { color: C.grey, w: 2.2 }));
        D.back(); k.hide(gSt);
        const sySoup = sayAt("The chicken soup smells so delicious.", { zh: "鸡汤闻起来太香了。", word: "The chicken soup smells so delicious" });
        k.fade(gSt, sySoup.t + sySoup.wd, .4, 1);
        k.move(gSt, sySoup.t + sySoup.wd, Math.max(1.4, sySoup.dur - sySoup.wd), 0, -16, { ease: "move" });
        k.actFx(["smells"], sySoup.t + sySoup.wd, Math.max(1.4, sySoup.dur - sySoup.wd), "鸡汤冒出三缕热气（闻起来香）");
        k.look(me, 620, 400, sySoup.t + sySoup.wd, 2); k.expr(me, "happy", sySoup.t + sySoup.wd, 2);
        D.step(1);
        N("状态天平：", "系动词两边一样重：鸡汤 = 很好吃，说的是同一个东西。");
        h.arc(B[0], B[2], "鸡汤 = 很好吃（两边平衡）");
        N("感官系动词：", "看、听、闻、尝、摸五种感觉：look、sound、smell、taste、feel。");
        h.note("感官：look · sound · smell · taste · feel", 40, 290, { color: C.blue, size: 16, weight: 900, font: D.MONO, dur: 1.2 });
        k.say("Look, sound, smell, taste, feel. You look happy. I feel good.", { zh: "看、听、闻、尝、摸。你看起来很开心。我感觉很好。", word: "look sound smell taste feel" });
        N("变化系动词：", "get、turn、become，意思都是「变得」。");
        h.note("变化：get · turn · become", 40, 322, { color: C.ink, size: 16, weight: 900, font: D.MONO, dur: .9 });
        k.say("Get, turn, become. He becomes tall.", { zh: "变得。他长高了。", word: "get turn become" });
        k.wait(.4);
        D.wipe();

        // ───── 镜头 2 · 金句 + -ly 避坑 + 铁律 ─────
        D.step(2); D.shot();
        N("", "看金句：sounds、tastes 是等号，后面 great、sweet 都是形容词。");
        const m1 = h.line("That idea sounds great! The cake tastes sweet.", 170);
        k.say("That idea sounds great! The cake tastes sweet.", { zh: "这个主意听起来很棒！蛋糕尝起来很甜。" });
        h.tags(m1, [["That idea", "S", C.ink], ["sounds", "V", C.blue], ["great", "P", C.green], ["The cake", "S", C.ink], ["tastes", "V", C.blue], ["sweet", "P", C.green]]);
        k.say("That idea sounds great! The cake tastes sweet.", { zh: "这个主意听起来很棒！蛋糕尝起来很甜。", word: "That idea sounds great cake tastes sweet" });
        D.step(3);
        N("副词：", "-ly 结尾的词修饰动作，比如 sweetly（甜甜地）。系动词后面不能用它！");
        const bad = h.line("tastes sweetly", 260, 18, C.red, 100);
        h.strike(bad, "sweetly"); h.redX(64, 238);
        k.act(me, "surprised", S.at - .4, 1);
        k.say("Sweetly, ly. She sings sweetly.", { zh: "甜甜地（-ly 副词）。她唱得很甜。", word: "sweetly ly", blocks: ["ly"] });
        h.note("铁律：系动词 + 形容词（对）    系动词 + -ly 副词（错）", 40, 330, { color: C.red, size: 17, weight: 900 });
        k.act(me, "point", S.at, 1.2, { at: [300, 324] });
        D.hold(1.3);
        D.wipe();

        // ───── 镜头 3 · 秋天金句（变化系动词）+ 公式 ─────
        D.step(4); D.shot();
        N("", "turn 管颜色变化（树叶变黄），get 管天气变化（天气变凉）。");
        const m2 = h.line("In autumn, the leaves turn yellow and the weather gets cool.", 170);
        // 场景：一棵树，读到 turn yellow 时叶子由绿变黄、飘落一片（R4 turn 场景变化）
        P(k.wl(620, 420, 620, 350, .4), go(.3), .3, { color: C.ink, w: 4 });
        P(k.wl(540, 420, 700, 420, .4), go(.3), .3, { color: C.ink, w: 2 });
        const LV = [[596, 336, 30, 22], [646, 332, 30, 22], [620, 304, 34, 24]];
        LV.forEach(([x, y, rx, ry]) => { P(k.ellipse(x, y, rx, ry), go(.25), .25, { color: C.green, w: 2.5 }); F(k.ellipse(x, y, rx, ry), go(.05, 0), { color: C.tintGreen, op: 1 }); });
        const gY = D.sub();
        LV.forEach(([x, y, rx, ry]) => { P(k.ellipse(x, y, rx, ry), go(.05, 0), .05, { color: C.ink, w: 2.5 }); F(k.ellipse(x, y, rx, ry), go(.05, 0), { color: C.hlYellow, op: 1 }); });
        D.back(); k.hide(gY);
        const gLf = D.sub();
        P(k.ellipse(668, 352, 8, 5), go(.05, 0), .05, { color: C.ink, w: 2 }); F(k.ellipse(668, 352, 8, 5), go(.05, 0), { color: C.hlYellow, op: 1 });
        D.back(); k.hide(gLf);
        const gW = D.wind(450, 360, 80); k.hide(gW);
        const syAu = sayAt("In autumn, the leaves turn yellow and the weather gets cool.", { zh: "秋天，树叶变黄，天气变凉。" });
        k.fade(gY, syAu.t + syAu.dur * .3, .8, 1);
        k.actFx(["turn"], syAu.t + syAu.dur * .3, 1.2, "树叶由绿变黄");
        k.fade(gLf, syAu.t + syAu.dur * .45, .2, 1);
        k.path(gLf, syAu.t + syAu.dur * .45, 2, [[14, 22], [-6, 44], [18, 64]]);
        k.fade(gW, syAu.t + syAu.dur * .7, .3, 1);
        k.move(gW, syAu.t + syAu.dur * .7, Math.max(1, syAu.dur * .3), 60, 0, { ease: "move" });
        k.actFx(["gets"], syAu.t + syAu.dur * .7, Math.max(1, syAu.dur * .3), "一阵凉风吹过（天气变凉）");
        h.tags(m2, [["In autumn", "时间挂件", C.grey], ["the leaves", "S", C.ink], ["turn", "V", C.blue], ["yellow", "P", C.green], ["the weather", "S", C.ink], ["gets", "V", C.blue], ["cool", "P", C.green]]);
        k.say("In autumn, the leaves turn yellow and the weather gets cool.", { zh: "秋天，树叶变黄，天气变凉。", word: "In autumn leaves yellow and weather gets cool" });
        k.act(me, "point", S.at - 1.2, 1.2, { at: [620, 320] });
        h.final("S（主语）+ 系动词（=）+ P（表语：名词 / 形容词 / 介词短语）", "那个主意听起来太棒了！蛋糕尝起来很甜。  系动词是等号！");
        N("口诀：", "系动词是等号，后面跟形容词，千万别跟 -ly。");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(5); D.shot();
        N("预测：", "「这朵花闻起来很香」：smells 是系动词，后面用 sweet 还是 sweetly？先想 3 秒！");
        h.quiz("🔮 这朵花闻起来很香。", "→  The flower smells ___.  ( sweet / sweetly )");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "系动词后面跟形容词 sweet：The flower smells sweet.");
        const tRev = go(.3);
        h.reveal("The flower smells sweet.");
        k.sfx("ding", tRev + .9);
        const fl = k.prop("flower", 0, 0, { hidden: true });
        const syQ = sayAt("The flower smells sweet.", { zh: "这朵花闻起来很香。", word: "flower smells sweet" });
        k.act(me, "holdCard", syQ.t, Math.max(1.4, syQ.dur + .3), { prop: fl });
        k.act(me, "cheer", syQ.t + Math.max(1.4, syQ.dur + .3) + .1, 1.2);
        D.hold(1.4);

        k.quoteCard({ insight: "系动词不是动作，是一个等号：\n主语 = 后面的状态", rhyme: "口诀：系动词是等号，后面跟形容词，\n千万别跟 -ly。", hlLines: 2, foot: "🦴 五大基本句型 · 句型 ② SVP" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "smells", act: "读到「The chicken soup smells so delicious」时鸡汤冒出三缕热气（场景动作 actFx + fade + move），讲解员看过去露出开心表情" },
        { word: "turn", act: "读到「the leaves turn yellow」时树叶由绿变黄、飘落一片（场景动作 actFx + fade + path）" },
        { word: "gets", act: "读到「the weather gets cool」时一阵凉风从树旁吹过（场景动作 actFx + fade + move）" },
      ],
      r2skip: ["SVP"],   // 成分标签，不读
      terms: [
        ["可信度徽章", "💡 状态天平、等号桥、骨架都是帮助记忆的比喻。"],
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
    // ───────── ③ SVO 一箭穿心型（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/five_patterns_classic.js（R1 零丢失）。原一屏拆成 3 个镜头（骨架 + 一箭穿心 / 植树金句 + 画蛇添足 / 宾语穿制服 + 公式）+ 🔮 预测 + 金句卡；
    // R4：箭从谓语飞进靶心；讲解员读到 reading 时捧书读；场景里的小旅客读到 planted 时把小树苗搬到坑边种下；读到 I decide to go 时讲解员走一段；预测题读到 read 时捧书读。
    {
      build(k) {
        k.v2();
        const { N, P, T, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = vtools(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "句型 ③：最常见的句型！动作像射出去的箭，一定要射中一个目标。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "句型 ③ SVO", sub: "一箭穿心型 · 动作击中靶心", badges: ["💡", "✂️"], steps: ["① 骨架", "② 射箭", "③ 金句", "④ 画蛇添足", "⑤ 穿制服·公式", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 骨架方块 + 一箭穿心 ─────
        D.step(0); D.shot();
        const B = h.layout([
          { role: "S 主语", word: "Leo", color: C.ink, note: "射箭的人" },
          { role: "V 及物谓语", word: "loves / enjoys", color: C.blue, note: "弓箭" },
          { role: "O 宾语靶心", word: "reading English books", color: C.red, note: "被射中的靶心", sep: "arrow" }
        ]);
        N("主语 S：", "Leo，射箭的人。");
        h.block(B[0]); h.word(B[0]);
        N("及物动词 Vt：", "动作要落到对象身上，后面必须接宾语。英语里约 80% 的动词都是它。");
        h.block(B[1], B[0]); h.word(B[1]);
        k.act(me, "point", S.at - .6, 1.2, { at: [B[1].cx, h.BY + 20] });
        N("宾语靶心 O：", "箭射中的目标，也就是动作的对象：reading English books。");
        h.block(B[2], B[1]); h.word(B[2]);
        const bx = B[2].x + B[2].w, ty = h.BY + h.BH / 2;
        if (bx + 50 < 800) h.target(bx + 36, ty);
        D.step(1);
        N("", "箭从 loves 出发，直接射中宾语 reading English books。");
        // 一支箭从谓语方块飞进靶心
        const ax0 = B[1].x + B[1].w - 4, ay = h.BY + h.BH + 34;
        const gA = D.sub();
        P(`M${ax0},${ay} L${ax0 + 34},${ay} M${ax0 + 24},${ay - 7} L${ax0 + 34},${ay} L${ax0 + 24},${ay + 7} M${ax0},${ay} l-8,-6 M${ax0},${ay} l-8,6`, go(.05, 0), .05, { color: C.red, w: 3 });
        D.back(); k.hide(gA);
        const tA = S.at;
        k.fade(gA, tA, .2, 1);
        k.path(gA, tA + .1, 1.1, [[(bx + 36 - ax0 - 34) / 2, ty - ay - 30], [bx + 36 - ax0 - 34, ty - ay]]);
        k.sfx("pop", tA + 1.2);
        D.hold(1.4);
        const bk1 = k.prop("book", 0, 0, { hidden: true });
        const syR = sayAt("Leo loves reading English books. He enjoys stories.", { zh: "里奥喜欢读英文书。他喜欢故事。", word: "Leo loves enjoys reading English books stories" });
        k.act(me, "read", syR.t + syR.wd, Math.max(1.6, syR.dur - syR.wd), { prop: bk1, words: ["reading"] });
        k.wait(.4);
        D.wipe();

        // ───── 镜头 2 · 植树金句 + 画蛇添足 ─────
        D.step(2); D.shot();
        N("", "看金句：planted（种了）直接射中宾语 trees，中间什么都不加。");
        const m1 = h.line("We planted twenty young trees on Tree Planting Day.", 170);
        // 场景：小旅客把小树苗搬到坑边种下（R4 planted）
        const gS = D.sub();
        P(k.wl(330, 446, 760, 446, .4), go(.3), .3, { color: C.ink, w: 2 });
        const mound = `M600,446 Q624,430 648,446 Z`;
        P(mound, go(.3), .3, { color: C.ink, w: 2 }); F(mound, go(.05, 0), { color: C.tintInk, op: 1 });
        const tv = k.actor("traveler", { x: 380, y: 446, s: .75, f: 1, g: gS });
        const sap = k.prop("flower", 410, 446, { g: gS, s: .9 });
        D.back();
        const syPl = sayAt("We planted twenty young trees on Tree Planting Day.", { zh: "植树节我们种了二十棵小树。" });
        k.act(tv, "carry", syPl.t, Math.max(2.4, syPl.dur), { prop: sap, to: 580, put: true, words: ["planted"] });
        h.tags(m1, [["We", "S", C.ink], ["planted", "V", C.blue], ["twenty young trees", "O", C.red], ["on Tree Planting Day", "时间挂件", C.grey]]);
        k.say("We planted twenty young trees on Tree Planting Day.", { zh: "植树节我们种了二十棵小树。", word: "We planted twenty young trees on Tree Planting Day" });
        D.step(3);
        N("画蛇添足：", "多此一举。及物动词后面乱加介词，就像给蛇画脚，反而画错了。");
        h.note("直接接宾语，不加介词：", 40, 252, { color: C.red, size: 16, weight: 900 });
        h.note("discuss the plan · marry her · enter the room", 240, 252, { color: C.red, size: 16, weight: 900, font: D.MONO, dur: 1.3 });
        k.act(me, "surprised", S.at - .4, 1);
        k.say("Discuss the plan. Marry her. Enter the room.", { zh: "讨论计划。娶她。进入房间。", word: "discuss the plan marry her enter room" });
        k.wait(.4);
        D.wipe();

        // ───── 镜头 3 · 宾语穿制服 + 公式 ─────
        D.step(4); D.shot();
        N("宾语穿制服：", "两个动词连用时，第二个要换成 to do 或 doing，才能当宾语。");
        const m2 = h.line("I want to buy a dictionary, and I enjoy reading stories.", 170);
        k.say("I want to buy a dictionary, and I enjoy reading stories.", { zh: "我想买一本词典，我也喜欢读故事。" });
        h.tags(m2, [["I", "S", C.ink], ["want", "V", C.blue], ["to buy a dictionary", "O", C.red], ["I", "S", C.ink, 1], ["enjoy", "V", C.blue], ["reading stories", "O", C.red]]);
        k.say("I want to buy a dictionary, and I enjoy reading stories.", { zh: "我想买一本词典，我也喜欢读故事。", word: "I want to buy a dictionary and enjoy" });
        N("to do：", "盼着将来去做的事用 to do，比如 want to do、hope to do。");
        h.note("将来想做 → want / plan / hope / decide + to do", 40, 252, { color: C.blue, size: 16, weight: 900 });
        const syGo = sayAt("Want to do, hope to do, plan to do. I decide to go.", { zh: "想做、希望做、打算做。我决定去。", word: "hope decide do want to do hope to do" });
        const tg = syGo.t + syGo.dur * .7, hg = Math.max(.8, syGo.dur * .18);
        k.act(me, "walk", tg, hg, { to: 840, words: ["go"] });
        k.act(me, "walk", tg + hg, hg, { to: 892 });
        k.act(me, "turn", tg + 2 * hg, .3, { to: -1 });
        N("doing：", "享受、完成、练习常做的事用 doing，比如 enjoy doing。");
        h.note("享受常做 → enjoy / finish / practice / mind + doing", 40, 284, { color: C.green, size: 16, weight: 900 });
        k.say("Enjoy doing. Finish doing, practice doing. Do you mind waiting?", { zh: "喜欢做。做完、练习做。你介意等一下吗？", word: "finish practice mind doing" });
        h.final("S（主语射箭人）+ Vt（及物动词）+ O（宾语靶心）", "我们在植树节种了 20 棵小树苗。  动作直接射中宾语！");
        N("口诀：", "及物动词是支箭，直接射中宾语，不加介词。");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(5); D.shot();
        N("预测：", "「我想读这个故事」：want 后面的动词要穿哪件制服？to read 还是 reading？先想 3 秒！");
        h.quiz("🔮 我想读这个故事。", "→  I want ___ this story.  ( to read / reading )");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "want 盼着将来去做，穿 to do 制服：I want to read this story.");
        const tRev = go(.3);
        h.reveal("I want to read this story.");
        k.sfx("ding", tRev + .9);
        const bk2 = k.prop("book", 0, 0, { hidden: true });
        const syQ = sayAt("I want to read this story.", { zh: "我想读这个故事。", word: "want to read this story" });
        k.act(me, "read", syQ.t, Math.max(1.6, syQ.dur), { prop: bk2, words: ["read"] });
        k.act(me, "cheer", syQ.t + Math.max(1.6, syQ.dur) + .1, 1.2);
        D.hold(1.4);

        k.quoteCard({ insight: "及物动词像一支箭，\n后面直接射中宾语，中间不加介词", rhyme: "口诀：及物动词是支箭，\n直接射中宾语，不加介词。", hlLines: 2, foot: "🦴 五大基本句型 · 句型 ③ SVO" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "reading", act: "读到「Leo loves reading English books」时讲解员捧书读（read）" },
        { word: "planted", act: "读到「We planted twenty young trees」时场景里的小旅客把小树苗搬到土坑边放下种好（carry + put）" },
        { word: "go", act: "读到「I decide to go」时讲解员往前走一段再走回（walk）" },
        { word: "read", act: "预测题揭晓读到「I want to read this story」时讲解员捧书读（read）" },
      ],
      r2skip: ["SVO", "Vt"],   // 成分标签，不读
      terms: [
        ["可信度徽章", "💡 一箭穿心、靶心、画蛇添足、宾语穿制服都是帮助记忆的比喻；✂️ 简化说法：to do 管「将来想做」、doing 管「享受常做」是帮小学生记搭配的大致规律，具体哪个动词跟哪种还要一个个记。"],
        ["宾语靶心", "比喻：及物动词像射出去的箭，宾语就是被射中的靶心，比如 planted trees 里的 trees。"],
        ["画蛇添足", "多此一举。及物动词后面直接接宾语，乱加介词反而错：discuss the plan、enter the room 都不加介词。"],
        ["宾语穿制服", "比喻：两个动词连用时，第二个动词要变成 to do 或 doing 才能当宾语，比如 want to buy、enjoy reading。"],
        ["to do（不定式）", "to + 动词原形，表示盼着将来去做的事，常跟在 want / plan / hope / decide 后面。"],
        ["doing（动名词）", "动词加 -ing 当名词用，表示享受、完成、练习正在做或常做的事，常跟在 enjoy / finish / practice / mind 后面。"]
      ]
    },
    // ───────── ④ SVOO 双手递礼型（v2 + 讲解员，2026-10-30）─────────
    // 升级前原样保存在 cases/five_patterns_classic.js（R1 零丢失）。原一屏拆成 3 个镜头（骨架 + 人 / 物 + 两种语序 / to 指向 / for 心意 + 公式）+ 🔮 预测 + 金句卡；
    // R4：场景里的妈妈读到 gave 时把礼物盒搬过去递给「我」；讲解员读到 Give it to me、show 时举起词卡；预测题读到 pass 时把书举起递出。
    {
      build(k) {
        k.v2();
        const { N, P, T, F, go } = k, D = WO_PROPS(k), C = k.PAL, S = k.S, h = vtools(k, D);
        const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
        const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
        N("", "句型 ④：有些动词天生就是「把东西递给人」，所以要带两个宾语。");
        k.act(me, "walk", .3, 1.6, { to: 892 });
        k.act(me, "wave", 2.0, 1.8);
        D.scene({ title: "句型 ④ SVOO", sub: "双手递礼型 · to 指向 vs for 心意", badges: ["💡", "✂️"], steps: ["① 骨架", "② 人和物", "③ to 指向", "④ for 心意", "⑤ 公式·口诀", "🔮 预测"], cardDur: 3.6 });

        // ───── 镜头 1 · 骨架方块（人 + 物）+ 两种语序 ─────
        D.step(0); D.shot();
        const B = h.layout([
          { role: "S 主语", word: "Mum", color: C.ink },
          { role: "V 双宾动词", word: "gave / bought", color: C.blue },
          { role: "IO 人", word: "me", color: C.red, note: "sb. 某人" },
          { role: "DO 物", word: "a birthday gift", color: C.green, note: "sth. 某物" }
        ]);
        N("双宾动词：", "give、send、buy、make……都是把某物交给某人。");
        h.block(B[0]); h.word(B[0]); h.block(B[1], B[0]); h.word(B[1]);
        k.act(me, "point", S.at - .6, 1.2, { at: [B[1].cx, h.BY + 20] });
        D.step(1);
        N("间接宾语 IO：", "收到东西的「人」，比如 me。sb. 是 somebody（某人）的缩写。");
        h.block(B[2], B[1]); h.word(B[2]);
        N("直接宾语 DO：", "递出去的「物」：a birthday gift。sth. 是 something（某物）。");
        h.block(B[3], B[2]); h.word(B[3]);
        N("双宾语：", "一个动词带两个宾语：人在前，物在后。");
        // 场景：妈妈把礼物盒递给「我」（R4 gave）
        const gS = D.sub();
        P(k.wl(330, 446, 780, 446, .4), go(.3), .3, { color: C.ink, w: 2 });
        const mum = k.actor("traveler", { x: 400, y: 446, s: .75, f: 1, g: gS });
        const kid = k.actor("porter", { x: 680, y: 446, s: .62, f: -1, g: gS });
        const gift = k.prop("box", 440, 446, { g: gS, s: .8 });
        D.back();
        const syG = sayAt("Mum gave me a birthday gift.", { zh: "妈妈送了我一份生日礼物。", word: "Mum me a birthday gift a birthday gift" });
        k.act(mum, "carry", syG.t, Math.max(2.4, syG.dur), { prop: gift, to: 610, put: true, words: ["gave"] });
        k.act(kid, "cheer", syG.t + Math.max(2.4, syG.dur) - .2, 1.2);
        k.say("Somebody, something. Somebody gave me something.", { zh: "某人，某物。有人给了我一样东西。", word: "somebody something" });
        N("", "也可以把物放前面、人放后面，但人前面要加 to 或 for。");
        h.note("人在前：V + sb. + sth.     或     物在前：V + sth. + to / for + sb.", 40, 262, { color: C.ink, size: 17, weight: 900 });
        k.act(me, "point", S.at, 1.2, { at: [360, 256] });
        D.hold(1.5);
        D.wipe();

        // ───── 镜头 2 · to 指向 ─────
        D.step(2); D.shot();
        const m1 = h.line("Leo gave me a nice pen. = Leo gave a nice pen TO me.", 170);
        k.say("Leo gave me a nice pen. Leo gave a nice pen to me.", { zh: "里奥给了我一支好看的笔。", word: "gave" });
        h.tags(m1, [["me", "IO", C.red], ["a nice pen", "DO", C.green], ["a nice pen", "DO", C.green, 1], ["TO me", "to + 人", C.red]]);
        N("to 指向：", "把现成的东西单向递过去，像一支箭头，就用 to。");
        k.arrow(m1.x1("me", 1) + 18, m1.y - 7, m1.x1("me", 1) + 58, m1.y - 7, C.red);
        const pen = k.prop("card", 0, 0, { text: "🖊️", hidden: true });
        const syP = sayAt("Leo gave me a nice pen. Give it to me.", { zh: "里奥给了我一支好看的笔。把它给我。", word: "Leo nice pen give to" });
        k.act(me, "holdCard", syP.t + syP.dur * .55, Math.max(1.2, syP.dur * .45 + .3), { prop: pen, words: ["give"] });
        h.note("to 派：give / show / send / pass / lend / teach / tell", 40, 250, { color: C.blue, size: 16, weight: 900, font: D.MONO, dur: 1.4 });
        const card2 = k.prop("card", 0, 0, { text: "🎁", hidden: true });
        const syS = sayAt("Give, show, send, pass, lend, teach, tell. Please tell me a story.", { zh: "给、展示、寄、递、借给、教、讲。请给我讲个故事。", word: "show send pass lend teach tell" });
        k.act(me, "holdCard", syS.t + syS.wd, Math.max(1.4, syS.dur * .45), { prop: card2, words: ["show"] });
        k.wait(.4);
        D.wipe();

        // ───── 镜头 3 · for 心意 + 公式 ─────
        D.step(3); D.shot();
        N("for 心意：", "花心思替别人买、做、准备，像送出一颗爱心，就用 for。");
        const m2 = h.line("Dad bought me a new bike. = Dad bought a new bike FOR me.", 170);
        k.say("Dad bought me a new bike. Dad bought a new bike for me.", { zh: "爸爸给我买了一辆新自行车。", word: "bought" });
        h.tags(m2, [["me", "IO", C.red], ["a new bike", "DO", C.green], ["a new bike", "DO", C.green, 1], ["FOR me", "for + 人", C.red]]);
        h.heart(m2.x1("me", 1) + 26, m2.y - 7);
        k.act(me, "point", S.at - .5, 1.2, { at: [m2.x1("me", 1) + 26, m2.y - 7] });
        h.note("for 派：buy / make / cook / draw / choose / find", 40, 250, { color: C.red, size: 16, weight: 900, font: D.MONO, dur: 1.3 });
        k.say("Dad bought me a new bike. He made a cake for me.", { zh: "爸爸给我买了一辆新自行车。他给我做了蛋糕。", word: "Dad new bike for" });
        k.say("Buy, make, cook, draw, choose, find. Mum cooks dinner for us.", { zh: "买、做、煮、画、挑选、找到。妈妈给我们做晚饭。", word: "buy make cook draw choose find" });
        D.step(4);
        h.final("S + V + 人 + 物    或    S + V + 物 + to / for + 人", "妈妈送了我一份生日礼物。  递过去用 to，花心思用 for！");
        N("口诀：", "现成东西递过去用 to，花心思替人准备用 for。");
        k.wait(.6);
        D.wipe();

        // ───── 🔮 预测 ─────
        D.step(5); D.shot();
        N("预测：", "「请把书递给我」：书是现成的，递过去用 to 还是 for？先想 3 秒！");
        h.quiz("🔮 请把书递给我。", "→  Please pass the book ___ me.  ( to / for )");
        k.act(me, "think", S.at, 3.1);
        D.hold(3);
        N("揭晓：", "现成的书递过去，用 to：Please pass the book to me.");
        const tRev = go(.3);
        h.reveal("Please pass the book to me.");
        k.sfx("ding", tRev + .9);
        const bk = k.prop("book", 0, 0, { hidden: true });
        const syQ = sayAt("Please pass the book to me.", { zh: "请把书递给我。", word: "please pass the book to me" });
        k.act(me, "holdCard", syQ.t, Math.max(1.4, syQ.dur + .3), { prop: bk, words: ["pass"] });
        k.act(me, "cheer", syQ.t + Math.max(1.4, syQ.dur + .3) + .1, 1.2);
        D.hold(1.4);

        k.quoteCard({ insight: "双宾动词把东西交给人：先人后物；\n物放前面时，人前面加 to 或 for", rhyme: "口诀：现成东西递过去用 to，\n花心思替人准备用 for。", hlLines: 2, foot: "🦴 五大基本句型 · 句型 ④ SVOO" });
        k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
        D.hold(2);
        D.finish(.45);
      },
      actionWords: [
        { word: "gave", act: "读到「Mum gave me a birthday gift」时场景里的妈妈把礼物盒搬过去放到「我」面前（carry + put），「我」欢呼" },
        { word: "give", act: "读到「Give it to me」时讲解员把 🖊️ 词卡举起递出（holdCard）" },
        { word: "show", act: "读到「Give, show, send, pass…」时讲解员举起 🎁 词卡给大家看（holdCard）" },
        { word: "pass", act: "预测题揭晓读到「Please pass the book to me」时讲解员把书举起递出（holdCard）" },
      ],
      r2skip: ["SVOO", "IO", "DO", "sb", "sth", "vs"],   // 成分标签和 sb./sth. 缩写、对比符号 vs，不读（全称 somebody / something 已读）
      terms: [
        ["可信度徽章", "💡 双手递礼、to 指向、for 心意都是帮助记忆的比喻；✂️ 简化说法：to 派 / for 派是常见动词的大致分组，遇到新动词时以词典为准。"],
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
