// ==================== 第一性原理 ⑤ 三维几何向量时空律（fp_vectors）====================
// 4 幕 = FIRST_PRINCIPLES_DB[4].acts。分镜见 docs/whiteboard/first_principles/STORYBOARD.md。
WB_LAB.fp_vectors = [
  // ───────── 5-1 at 点 · on 面 · in 体 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：为什么说 at 7:00、on Monday、in May？");
      k.header("⑤ 三维几何向量时空律", "at 点 · on 面 · in 体", false);
      N("介词：", "放在名词前面、表示位置或时间关系的小词，比如 at、on、in。");
      k.mono("at 7:00  ·  on Monday  ·  in May", 40, 104, 22, C.ink, 900);
      N("维度：", "0 维是一个点，2 维是一个平面，3 维是一个有里面的盒子。");
      const xs = [165, 480, 795];
      // 0 维点
      k.head("0 维：一个点", xs[0], 150, C.orange, "middle", 18);
      P(k.ellipse(xs[0], 212, 26, 26), go(.5), .5, { color: C.orange, w: 2 });
      P(k.wl(xs[0] - 38, 212, xs[0] + 38, 212, .3) + " " + k.wl(xs[0], 174, xs[0], 250, .3), go(.4), .4, { color: C.orange, w: 1.5 });
      const dot = "M" + (xs[0] - 6) + ",212 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0";
      P(dot, go(.2), .2, { color: C.red, w: 2 }); F(dot, go(.1, 0), { color: C.red, op: 1 });
      // 2 维面
      k.head("2 维：一个平面", xs[1], 150, C.green, "middle", 18);
      const pl = `M${xs[1] - 90},236 L${xs[1] - 40},188 L${xs[1] + 90},188 L${xs[1] + 40},236 Z`;
      P(pl, go(.8), .8, { color: C.green, w: 2.5 }); F(pl, go(.2, 0), { color: "#d1fae5", op: .9 });
      // 3 维体
      k.head("3 维：一个盒子", xs[2], 150, C.blue, "middle", 18);
      const bx = xs[2] - 60, by = 190;
      const back = `M${bx + 30},${by - 20} h100 v70 h-100 Z`;
      P(back, go(.6), .6, { color: "#93c5fd", w: 2 });
      P(`M${bx},${by} l30,-20 M${bx + 100},${by} l30,-20 M${bx + 100},${by + 70} l30,-20 M${bx},${by + 70} l30,-20`, go(.5), .5, { color: C.blue, w: 2 });
      // 小球：落到点上 / 面上 / 盒子里
      const ball = (x, y0, y1) => {
        const g = k.group();
        const d = `M${x - 9},${y0} a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0`;
        P(d, go(.01, 0), .01, { color: C.purple, w: 2 }); F(d, go(.01, 0), { color: "#c4b5fd", op: 1 });
        k.endGroup(); k.hide(g); const t = go(1.2); k.fade(g, t, .2, 1); k.move(g, t + .2, 1, 0, y1 - y0); return g;
      };
      N("at：", "落在一个精确的点上，不管它有多大，只当成一个点。");
      ball(xs[0], 160, 212);
      N("on：", "贴在一个平面的表面上。");
      ball(xs[1], 160, 203);
      N("in：", "被包在一个立体空间的里面。");
      ball(xs[2] + 15, 160, 222);
      const front = `M${bx},${by} h100 v70 h-100 Z`;
      P(front, go(.6), .6, { color: C.blue, w: 2.5 }); F(front, go(.2, 0), { color: "#dbeafe", op: .55 });
      k.wait(.4);
      // 介词 + 空间例子
      T("at", xs[0], 300, go(.4), .4, { size: 36, color: C.orange, weight: 900, font: M, anchor: "middle" });
      T("on", xs[1], 300, go(.4), .4, { size: 36, color: C.green, weight: 900, font: M, anchor: "middle" });
      T("in", xs[2], 300, go(.4), .4, { size: 36, color: C.blue, weight: 900, font: M, anchor: "middle" });
      N("", "空间：在门口这一点、在桌面上、在房间里面。");
      T("at the door", xs[0], 342, go(.6), .6, { size: 20, color: C.ink, weight: 900, font: M, anchor: "middle" });
      T("on the desk", xs[1], 342, go(.6), .6, { size: 20, color: C.ink, weight: 900, font: M, anchor: "middle" });
      T("in the room", xs[2], 342, go(.6), .6, { size: 20, color: C.ink, weight: 900, font: M, anchor: "middle" });
      k.wait(.6);
      N("", "时间也一样：钟面上一个刻度、日历上一页、一大段时间。");
      T("钟点 = 一个点", xs[0], 384, go(.5), .5, { size: 15, color: C.grey, anchor: "middle" });
      T("某一天 = 一页", xs[1], 384, go(.5), .5, { size: 15, color: C.grey, anchor: "middle" });
      T("月 / 季 / 年 = 大盒子", xs[2], 384, go(.6), .6, { size: 15, color: C.grey, anchor: "middle" });
      T("at 7:00", xs[0], 418, go(.5), .5, { size: 20, color: C.orange, weight: 900, font: M, anchor: "middle" });
      T("on Monday", xs[1], 418, go(.5), .5, { size: 20, color: C.green, weight: 900, font: M, anchor: "middle" });
      T("in May · in 2026", xs[2], 418, go(.7), .7, { size: 20, color: C.blue, weight: 900, font: M, anchor: "middle" });
      k.wait(.6);
      N("口诀：", "点钟 at，哪天 on，月季年份都用 in。");
      D.fin("点用 at，面用 on，体用 in：空间和时间是同一个道理", "口诀：点钟 at，哪天 on，月季年份都用 in。");
      k.wait(2);
    },
    terms: [
      ["介词", "放在名词前面，表示位置、时间、方向关系的小词：at、on、in、to、for、from……"],
      ["维度", "0 维 = 一个点；2 维 = 一个平面（只有长和宽）；3 维 = 一个立体空间（有长、宽、高，有「里面」）。"],
      ["短语动词", "动词 + 小词组成的固定说法，如 put on（穿上）、take off（脱下 / 起飞）。"],
    ],
  },
];
