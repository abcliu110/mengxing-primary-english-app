// ==================== 讲解员小人 · 动作库 v1 演示（只在 preview.html 里看，不进 App）====================
// preview.html?tab=narrator_demo&case=0  定格姿态表（截图 6 秒处）；case=1 一个小人按顺序演完全部动作（录屏用）
WB_LAB.narrator_demo = [
  {
    build(k) {
      const { C, T, go } = k;
      k.header("动作库 v1 · 5 表情 · 3 口型", "讲解员小人", false);
      const T0 = 6;                                  // 截图时刻
      const row1 = [["wave", "挥手 wave", .55], ["point", "指 point", .6], ["surprised", "惊讶", .4], ["holdCard", "举词卡", .6], ["read", "读书 read", .5], ["walk", "走 walk", .5], ["run", "跑 run", .5]];
      const row2 = [["carry", "搬 carry", .55], ["take", "拿 take", .95], ["put", "放 put", .5], ["jump", "跳 jump（腾空）", .5], ["jump", "跳（蓄力）", .2], ["turn", "转身 turn", .3], ["support", "托举 support", .6]];
      const place = (list, y) => list.forEach(([act, label, u], i) => {
        const x = 70 + i * 128, dur = 2.4, st = T0 - u * dur;
        const a = k.actor("narrator", { x, y, s: .78, f: 1, screen: false });
        const o = {};
        if (act === "walk" || act === "run") { o.to = x + (act === "run" ? 70 : 40); a.x = x - (act === "run" ? 35 : 20); }
        if (act === "carry") { o.to = x + 30; a.x = x - 15; o.prop = k.prop("box", x - 15 + 18, y); }
        if (act === "take") o.prop = k.prop("book", x + 30, y - 40);
        if (act === "put") { o.prop = k.prop("box", x + 20, y); k.act(a, "take", st - 2.5, 1.2, { prop: o.prop }); }
        if (act === "holdCard") o.prop = k.prop("card", x, y, { text: "port" });
        if (act === "read") o.prop = k.prop("book", x, y);
        if (act === "point") o.at = [x + 80, y - 140];
        k.act(a, act, st, dur, o);
        T(label, x, y + 26, go(.05, 0), .05, { size: 14, color: C.ink, weight: 900, anchor: "middle" });
      });
      place(row1, 250); place(row2, 440);
      // 表情行（放大的头像在下一个案例里看；这里用 5 个小人）
      k.wait(T0 + 1);
    },
    terms: [],
  },
  {
    build(k) {
      const { C, T, go } = k;
      k.header("五个表情 + 三个口型", "讲解员小人", false);
      const ex = [["happy", "开心"], ["think", "思考"], ["surprised", "惊讶"], ["proud", "得意"], ["oops", "哎呀"]];
      ex.forEach(([e, label], i) => {
        const x = 110 + i * 180, a = k.actor("narrator", { x, y: 470, s: 2.1, f: 1, screen: false, narrator: false });
        k.expr(a, e, 0, 99);
        T(label + " " + e, x, 510, go(.05, 0), .05, { size: 18, color: C.ink, weight: 900, anchor: "middle" });
      });
      k.wait(4);
    },
    terms: [],
  },
  {
    build(k) {
      const { C, T, N, go } = k;
      k.header("一个小人演完全部动作（录屏）", "动作库 v1", false);
      const me = k.actor("narrator", { x: 140, y: 470, s: 1, f: 1, screen: false });
      const lab = (s) => { N(s, ""); T(s, 480, 140, go(.3, 0), .3, { size: 22, color: C.blue, weight: 900, anchor: "middle" }); };
      k.wait(1.5); lab("待机：呼吸 + 眨眼"); k.wait(3);
      lab("挥手 wave"); k.act(me, "wave", go(2.2), 2.2);
      lab("走 walk"); k.act(me, "walk", go(2.4), 2.4, { to: 420 });
      lab("跑 run"); k.act(me, "run", go(1.4), 1.4, { to: 760 });
      lab("转身 turn"); k.act(me, "turn", go(.6), .6);
      lab("指 point"); k.act(me, "point", go(1.8), 1.8, { at: [300, 250] });
      lab("惊讶 surprised"); k.act(me, "surprised", go(1.6), 1.6);
      const box = k.prop("box", 640, 470);
      lab("搬 carry（抱起 → 走 → 放下）"); k.act(me, "carry", go(4), 4, { prop: box, to: 380, put: true });
      const bk = k.prop("book", 330, 400);
      lab("拿 take"); k.act(me, "take", go(1.6), 1.6, { prop: bk });
      lab("放 put"); k.act(me, "put", go(1.4), 1.4, { prop: bk });
      const card = k.prop("card", 0, 0, { text: "port" });
      lab("举词卡 hold up"); k.act(me, "holdCard", go(2.4), 2.4, { prop: card });
      const book = k.prop("book", 0, 0);
      lab("读书 read"); k.act(me, "read", go(2.6), 2.6, { prop: book });
      lab("跳 jump"); k.act(me, "jump", go(1.3), 1.3);
      lab("托举 support"); k.act(me, "support", go(2), 2);
      lab("开心 / 思考 / 惊讶 / 得意 / 哎呀");
      ["happy", "think", "surprised", "proud", "oops"].forEach(e => k.expr(me, e, go(1.1), 1));
      lab("朗读：口型随语音切换");
      k.say("A port is a door to the world.", { zh: "港口是通向世界的大门。", word: "port" });
      k.wait(1);
    },
    terms: [],
  },
];
