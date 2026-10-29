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
      k.say("The cat is at the door, on the table, in the room.", { zh: "猫在门口、在桌子上、在房间里。" });
      N("", "时间也一样：钟面上一个刻度、日历上一页、一大段时间。");
      T("钟点 = 一个点", xs[0], 384, go(.5), .5, { size: 15, color: C.grey, anchor: "middle" });
      T("某一天 = 一页", xs[1], 384, go(.5), .5, { size: 15, color: C.grey, anchor: "middle" });
      T("月 / 季 / 年 = 大盒子", xs[2], 384, go(.6), .6, { size: 15, color: C.grey, anchor: "middle" });
      T("at 7:00", xs[0], 418, go(.5), .5, { size: 20, color: C.orange, weight: 900, font: M, anchor: "middle" });
      T("on Monday", xs[1], 418, go(.5), .5, { size: 20, color: C.green, weight: 900, font: M, anchor: "middle" });
      T("in May · in 2026", xs[2], 418, go(.7), .7, { size: 20, color: C.blue, weight: 900, font: M, anchor: "middle" });
      k.wait(.6);
      k.say("I get up at seven on Monday in May.", { zh: "五月的星期一，我七点起床。" });
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
WB_LAB.fp_vectors.push(
  // ───────── 5-2 on 贴上接通 · off 脱离断开 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：take off 为什么既是「脱衣服」，又是「飞机起飞」？");
      k.header("⑤ 三维几何向量时空律", "on 贴上 · off 分开", true);
      k.head("ON：贴上、接通", 40, 108, C.green, "start", 22);
      k.head("OFF：离开、断开", 510, 108, C.red, "start", 22);
      // ON 1：方块贴到表面
      N("on：", "东西贴到一个表面上，或者电路接上了。");
      P(k.wl(60, 200, 220, 200, .6), go(.4), .4, { color: C.ink, w: 3 });
      T("身体表面", 140, 220, go(.4), .4, { size: 13, color: C.grey, anchor: "middle" });
      const coat = k.group();
      P(k.roughRect(110, 130, 60, 30), go(.4), .4, { color: C.green, w: 2.5 }); F(k.rectD(110, 130, 60, 30), go(.1, 0), { color: "#bbf7d0", op: 1 });
      T("coat", 140, 151, go(.3), .3, { size: 15, color: C.green, weight: 900, font: M, anchor: "middle" });
      k.endGroup();
      k.move(coat, go(.9), .9, 0, 40);
      T("put on your coat", 240, 180, go(.8), .8, { size: 19, color: C.ink, weight: 900, font: M });
      T("衣服贴到身上", 240, 204, go(.5), .5, { size: 14, color: C.grey });
      // ON 2：开关接通，灯亮
      P(k.wl(60, 290, 110, 290, .3) + " " + k.wl(160, 290, 210, 290, .3), go(.4), .4, { color: C.ink, w: 3 });
      const lever = k.group(); P(k.wl(110, 290, 150, 262, .2), go(.3), .3, { color: C.green, w: 4 }); k.endGroup();
      const bulb = k.ellipse(232, 278, 13, 15);
      P(bulb, go(.3), .3, { color: C.ink, w: 2 });
      const glow = k.group(); F(bulb, go(.01, 0), { color: "#fde047", op: 1 }); P(`M232,252 v-8 M252,262 l7,-6 M212,262 l-7,-6`, go(.01, 0), .01, { color: C.orange, w: 2 }); k.endGroup(); k.hide(glow);
      const tl = go(.8); k.rot(lever, tl, .6, 35, 110, 290); k.fade(glow, tl + .6, .3, 1);
      T("turn on the light", 272, 286, go(.8), .8, { size: 17, color: C.ink, weight: 900, font: M });
      T("开关接通", 280, 310, go(.4), .4, { size: 14, color: C.grey });
      T("get on the bus：脚踏上车厢地板", 60, 372, go(1), 1, { size: 16, color: C.green, weight: 900 });
      k.wait(.5);
      // OFF 1：鞋子离开脚
      k.say("Put on your coat. Turn on the light.", { zh: "穿上外套。打开灯。" });
      N("off：", "东西离开一个表面，或者电路断开了。");
      P(k.wl(530, 200, 690, 200, .6), go(.4), .4, { color: C.ink, w: 3 });
      T("脚面", 610, 220, go(.3), .3, { size: 13, color: C.grey, anchor: "middle" });
      const shoe = k.group();
      P(k.roughRect(580, 170, 60, 30), go(.4), .4, { color: C.red, w: 2.5 }); F(k.rectD(580, 170, 60, 30), go(.1, 0), { color: "#fecdd3", op: 1 });
      T("shoe", 610, 191, go(.3), .3, { size: 15, color: C.red, weight: 900, font: M, anchor: "middle" });
      k.endGroup();
      k.move(shoe, go(.9), .9, 0, -42);
      T("take off your shoes", 706, 180, go(.8), .8, { size: 17, color: C.ink, weight: 900, font: M });
      T("鞋子离开脚", 706, 204, go(.5), .5, { size: 14, color: C.grey });
      // OFF 2：飞机离开跑道
      N("", "飞机离开跑道，也是「离开表面」——所以起飞也叫 take off！");
      P(k.wl(530, 300, 700, 300, .5), go(.4), .4, { color: C.ink, w: 3 });
      T("跑道", 560, 320, go(.3), .3, { size: 13, color: C.grey });
      const plane = k.group();
      const pd = "M540,292 l40,0 l14,-8 l6,0 l-6,8 l8,0 l0,4 l-62,0 Z M562,292 l8,-12 l6,0 l-4,12 Z";
      P(pd, go(.5), .5, { color: C.blue, w: 2 }); F(pd, go(.1, 0), { color: "#bfdbfe", op: 1 });
      k.endGroup();
      k.arc(plane, go(1.6), 1.6, "M0,0 C60,0 100,-10 150,-50");
      T("The plane takes off!", 706, 286, go(.8), .8, { size: 17, color: C.ink, weight: 900, font: M });
      T("飞机离开地面", 706, 310, go(.5), .5, { size: 14, color: C.grey });
      T("turn off the TV · get off the bus · fall off", 530, 372, go(1.2), 1.2, { size: 15, color: C.red, weight: 900, font: M });
      k.wait(.6);
      k.say("Take off your coat. The plane takes off.", { zh: "脱下外套。飞机起飞了。", word: "take off" });
      N("口诀：", "贴上 on，分开 off。");
      D.fin("on = 贴上表面 / 接通；off = 离开表面 / 断开", "口诀：贴上 on，分开 off。");
      k.wait(2);
    },
    terms: [],
  },
);
WB_LAB.fp_vectors.push(
  // ───────── 5-3 get on the bus vs get in the car ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：上公交说 get on，上小汽车为什么说 get in？");
      k.header("⑤ 三维几何向量时空律", "get on the bus vs get in the car", true);
      // 公交
      P(k.roughRect(110, 140, 300, 110), go(1), 1, { color: C.green, w: 3 }); F(k.rectD(110, 140, 300, 110), go(.2, 0), { color: "#ecfdf5", op: 1 });
      for (let i = 0; i < 4; i++) P(k.roughRect(180 + i * 56, 156, 40, 34), go(.2), .2, { color: C.green, w: 2 });
      P(k.roughRect(122, 156, 40, 84), go(.3), .3, { color: C.green, w: 2 });
      P(k.ellipse(160, 254, 16, 16) + " " + k.ellipse(360, 254, 16, 16), go(.5), .5, { color: C.ink, w: 3 });
      P(k.wl(30, 270, 450, 270, .6), go(.4), .4, { color: C.grey, w: 2 });
      T("BUS", 360, 236, go(.3), .3, { size: 18, color: C.green, weight: 900, font: M });
      N("", "公交车很高，人上去以后能站着、走来走去。");
      const p1 = D.person(70, 270, C.purple);
      k.arc(p1, go(1.8), 1.8, "M0,0 C30,0 50,-10 72,-30 L170,-30");
      k.wait(.2);
      N("on：", "能站着走的车，就像一个平台、一块地板——当成平面，用 on。");
      P(k.wl(122, 240, 400, 240, .4), go(.5), .5, { color: C.orange, w: 4 });
      T("站着走 = 地板平面", 260, 122, go(.7), .7, { size: 16, color: C.orange, weight: 900, anchor: "middle" });
      k.wait(.5);
      // 小汽车
      const car = "M560,250 L560,215 L610,212 L640,180 L760,180 L790,212 L830,216 L830,250 Z";
      P(car, go(1), 1, { color: C.blue, w: 3 }); F(car, go(.2, 0), { color: "#eff6ff", op: 1 });
      P(k.roughRect(650, 188, 50, 24) + " " + k.roughRect(706, 188, 50, 24), go(.3), .3, { color: C.blue, w: 2 });
      P(k.ellipse(612, 254, 16, 16) + " " + k.ellipse(780, 254, 16, 16), go(.5), .5, { color: C.ink, w: 3 });
      P(k.wl(510, 270, 930, 270, .6), go(.4), .4, { color: C.grey, w: 2 });
      k.say("Let's get on the bus.", { zh: "我们上公交车吧。", word: "get on" });
      N("", "小汽车很矮，人得弯下腰，钻进去坐着。");
      const p2 = D.person(560, 270, C.purple, true);
      const tc = go(1.8);
      k.arc(p2, tc, 1.6, "M0,0 C40,0 70,-8 110,-30");
      k.fade(p2, tc + 1.2, .5, .45);
      N("in：", "要钻进去、被车厢包起来的，就像一个盒子——用 in。");
      P(k.roughRect(640, 176, 124, 74), go(.6), .6, { color: C.orange, w: 3 });
      T("钻进去 = 盒子", 700, 160, go(.6), .6, { size: 16, color: C.orange, weight: 900, anchor: "middle" });
      k.wait(.5);
      // 例子
      T("get on the bus", 60, 320, go(.7), .7, { size: 24, color: C.green, weight: 900, font: M });
      T("get in the car", 540, 320, go(.7), .7, { size: 24, color: C.blue, weight: 900, font: M });
      k.say("Get in the car, please.", { zh: "请上车。", word: "get in" });
      N("", "同样能站着走的：火车、飞机、轮船，都用 on。");
      T("on the train / plane / ship", 60, 358, go(.9), .9, { size: 18, color: C.ink, weight: 700, font: M });
      N("", "下车：get off the bus；从小车里钻出来：get out of the car。");
      T("get off the bus", 60, 392, go(.6), .6, { size: 18, color: C.ink, weight: 700, font: M });
      T("in a taxi · get out of the car", 540, 358, go(.9), .9, { size: 18, color: C.ink, weight: 700, font: M });
      N("", "骑自行车、骑马：人跨坐在上面，也是 on。");
      T("on a bike · on a horse（跨坐在上面）", 60, 426, go(1), 1, { size: 16, color: C.green, weight: 900 });
      k.wait(.6);
      k.say("Get off the bus and get out of the car.", { zh: "下公交车，从小汽车里出来。" });
      N("口诀：", "站着上车用 on，弯腰钻进用 in。");
      D.fin("能站着走的车 = 平面 → on；要弯腰钻进去的车 = 盒子 → in", "口诀：站着上车用 on，弯腰钻进用 in。");
      k.wait(2);
    },
    terms: [],
  },
);
WB_LAB.fp_vectors.push(
  // ───────── 5-4 to · for · from 三个方向箭头 ─────────
  {
    build(k) {
      const { C, N, T, P, F, go } = k, D = FP_PROPS(k), M = D.MONO;
      N("", "这一幕：to、for、from，三个方向箭头。");
      k.header("⑤ 三维几何向量时空律", "to · for · from", false);
      const ball = (x, y, color) => {
        const g = k.group(); const d = `M${x - 8},${y} a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0`;
        P(d, go(.2), .2, { color, w: 2 }); F(d, go(.1, 0), { color, op: .5 }); k.endGroup(); return g;
      };
      const box = (x, y, label, color) => {
        P(k.roughRect(x, y - 22, 70, 44), go(.4), .4, { color, w: 2.5 });
        T(label, x + 35, y + 6, go(.3), .3, { size: 15, color, weight: 900, anchor: "middle" });
      };
      // to
      N("to：", "箭头一直走到终点，动作到达了目标。");
      T("to", 40, 160, go(.4), .4, { size: 34, color: C.blue, weight: 900, font: M });
      box(330, 150, "终点", C.blue);
      const b1 = ball(110, 150, C.blue);
      k.arrow(124, 150, 326, 150, C.blue);
      k.move(b1, go(1.2), 1.2, 210, 0);
      T("listen to me", 450, 146, go(.6), .6, { size: 20, color: C.ink, weight: 900, font: M });
      T("声音一直传到我耳朵", 640, 146, go(.6), .6, { size: 15, color: C.grey });
      T("go to school · give a book to me", 450, 176, go(.8), .8, { size: 17, color: C.blue, weight: 700, font: M });
      k.wait(.4);
      // from
      N("from：", "从起点出发、离开源头，方向和 to 正好相反。");
      T("from", 40, 260, go(.4), .4, { size: 34, color: C.green, weight: 900, font: M });
      box(130, 250, "起点", C.green);
      const b2 = ball(214, 250, C.green);
      k.arrow(204, 250, 410, 250, C.green);
      k.move(b2, go(1.2), 1.2, 186, 0);
      T("come from China", 450, 246, go(.6), .6, { size: 20, color: C.ink, weight: 900, font: M });
      T("从中国出发", 660, 246, go(.5), .5, { size: 15, color: C.grey });
      T("borrow from you ⇄ lend to him", 450, 276, go(.8), .8, { size: 17, color: C.green, weight: 700, font: M });
      k.say("I walk to school. The letter is from Grandma.", { zh: "我走路去上学。这封信是奶奶寄来的。" });
      N("", "借进来 borrow from（从你那里来），借出去 lend to（到他那里去）。");
      k.wait(.6);
      // for
      N("for：", "心里朝着目标去，但不一定已经碰到它。");
      T("for", 40, 360, go(.4), .4, { size: 34, color: C.orange, weight: 900, font: M });
      const tg = (r, op) => P(k.ellipse(370, 350, r, r), go(.25), .25, { color: C.orange, w: 2.5 });
      tg(26); tg(14);
      const b3 = ball(130, 350, C.orange);
      P(k.wl(144, 350, 336, 350, .3), go(.6), .6, { color: C.orange, w: 2.5, dash: "8 7" });
      k.move(b3, go(1), 1, 110, 0);
      T("还没碰到", 250, 384, go(.4), .4, { size: 14, color: C.orange, weight: 900, anchor: "middle" });
      T("look for my pen", 450, 346, go(.6), .6, { size: 20, color: C.ink, weight: 900, font: M });
      T("心里朝着笔去找", 660, 346, go(.5), .5, { size: 15, color: C.grey });
      T("wait for the bus · a cake for mom", 450, 376, go(.8), .8, { size: 17, color: C.orange, weight: 700, font: M });
      k.wait(.5);
      k.say("This gift is for you.", { zh: "这份礼物是给你的。", word: "for" });
      N("", "换一个介词，就换一个方向：look at 看一点，look for 找，look after 照看。");
      T("look at（目光打在一点）· look for（找）· look after（跟在后面照看）", 40, 424, go(1.6), 1.6, { size: 16, color: C.purple, weight: 900 });
      k.wait(.6);
      k.say("I look for my cat and look after my sister.", { zh: "我找我的猫，也照看妹妹。" });
      N("口诀：", "to 到终点，from 离起点，for 心里想着它。");
      D.fin("to 到达终点 · from 离开起点 · for 朝着目标（还没碰到）", "口诀：to 到终点，from 离起点，for 心里想着它。");
      k.wait(2);
    },
    terms: [],
  },
);
