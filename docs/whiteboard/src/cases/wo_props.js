// ==================== 单词身世 · 共用演示道具 + 5 步溯源幕模板 ====================
// 只给 cases/wo_*.js 用（风格同 fp_props.js：手绘静态部分 P/T/F + 引擎 v2 动效）。
// 用法：const D = WO_PROPS(k);
//   D.scene({ title, sub, badges })        → 标题 + 可信度徽章 + 5 步进度条（①地图 ②场景 ③词族 ④彩蛋 ⑤中文 🔮预测）
//   D.step(i)                              → 进度条高亮第 i 步（0–5）
//   D.shot() / D.sub() / D.back() / D.wipe() → 一个镜头的内容放进组里，镜头结束整组擦掉（淡出）
//   D.map(box)  D.boat  D.wind  D.plane  D.tower  D.city  D.crate  D.scroll  D.person  D.bull  D.stamp  D.morph  D.snap
const WO_PROPS = function (k) {
  const { C, P, T, F, go } = k;
  const MONO = '"Courier New",Courier,monospace';
  const D = { MONO };
  let shotG = 0, shotList = [];
  // v2（视觉标准 V1–V8 + M1–M12，k.v2() 打开）：配色收进统一调色板，吸附 / 盖章 / 擦除 / 片头换成新动效；没开 v2 的旧幕一切照旧
  const V2 = () => !!k.S.v2;
  const col = (v1, v2) => (V2() ? v2 : v1);
  const PAL = k.PAL || {};
  D.col = col;

  // ---------- 镜头管理：一个镜头 = 一个静态组 + 若干动的组；wipe() 一起淡出 ----------
  D.shot = () => { shotG = k.group(); shotList = [shotG]; return shotG; };
  D.sub = () => { const g = k.group(); shotList.push(g); return g; };      // 动的部分单独一组
  // 回到静态内容：开一个新的静态组（这样后画的东西在 DOM 里也在上层，不会被先画的动组盖住）
  D.back = () => { if (!shotG) { k.S.g = 0; return; } shotG = k.group(); shotList.push(shotG); };
  D.wipe = (dur = .8) => {
    k.S.g = 0;
    if (V2()) { const t = k.erase(shotList, 1.15); shotList = []; shotG = 0; return t; }   // 板擦擦除（V8）
    const t = go(dur); shotList.forEach(g => k.fade(g, t, dur, 0)); shotList = []; shotG = 0; return t;
  };

  // ---------- 5 步溯源幕模板：标题 + 徽章 + 进度条 ----------
  const STEPS0 = ["① 地图", "② 场景", "③ 词族", "④ 彩蛋", "⑤ 中文", "🔮 预测"];
  let STEPS = STEPS0;   // o.steps 可换成别的进度条（如中英对照幕：① 中文 ② 照搬 ③ 英语 ④ 例子 ⑤ 口诀 🔮 预测）；不传 = 溯源幕原样
  let stepXs = [], stepWs = [], ring = 0, ringAt = -1;
  D.scene = (o) => {
    if (o.steps) STEPS = o.steps;
    if (V2() && o.card !== false) k.titleCard({ title: o.title, sub: o.sub, badges: o.badges, dur: o.cardDur });   // 统一片头（V8）
    k.header(o.sub || "", o.title, false);
    if (o.badges && o.badges.length) k.badges(o.badges);
    const fs = V2() ? 13 : 12, ws = STEPS.map(s => k.estW(s, fs) + 12), tot = ws.reduce((a, b) => a + b, 0) + 5 * (STEPS.length - 1);
    let x = 948 - tot; const y = 80;
    const t0 = go(.8);
    STEPS.forEach((s, i) => {
      stepXs.push(x); stepWs.push(ws[i]);
      P(k.roughRect(x, y - 14, ws[i], 20), t0 + i * .08, .3, { color: "#cbd5e1", w: 1.4 });
      T(s, x + 6, y + 1, t0 + i * .08, .3, { size: fs, color: C.grey, weight: 700 });
      x += ws[i] + 5;
    });
    ring = k.group();
    const r = k.roughRect(stepXs[0] - 2, y - 16, stepWs[0] + 4, 24);
    P(r, go(.01, 0), .01, { color: C.orange, w: 3 });
    k.endGroup(); k.hide(ring);
  };
  D.step = (i) => {
    const t = go(.5);
    if (ringAt < 0) k.fade(ring, t, .3, 1);
    const from = ringAt < 0 ? 0 : ringAt;
    if (i !== from) k.move(ring, t, .5, (stepXs[i] + stepWs[i] / 2) - (stepXs[from] + stepWs[from] / 2), 0);
    ringAt = i;
  };

  // ---------- 地中海手绘地图（简化）：box = {x,y,w,h}，经度 -10…41，纬度 29…47 ----------
  // 返回 { eu, af, as（三块陆地的组）, pt(lon,lat), dot(lon,lat,label,…) }
  D.map = (box, o = {}) => {
    const L0 = -10, L1 = 41, A0 = 29, A1 = 47;
    const pt = (lon, lat) => [box.x + (lon - L0) / (L1 - L0) * box.w, box.y + (A1 - lat) / (A1 - A0) * box.h];
    const poly = pts => pts.map((p, i) => { const [x, y] = pt(p[0], p[1]); return (i ? "L" : "M") + x.toFixed(1) + "," + y.toFixed(1); }).join(" ") + " Z";
    // 海：底色
    P(k.roughRect(box.x, box.y, box.w, box.h), go(.8), .8, { color: col("#93c5fd", PAL.blue), w: 2, alpha: col(undefined, .5) });
    F(k.rectD(box.x, box.y, box.w, box.h), go(.2, 0), { color: col("#e0f2fe", PAL.tintBlue), op: 1 });
    const EU = [[-10, 47], [-10, 43.6], [-9, 43.4], [-9.3, 39], [-8.9, 37], [-6, 36.3], [-5.6, 36], [-2, 36.8], [0, 38.7], [0.5, 40.5], [3.2, 42], [3.1, 43.2], [5, 43.3], [7.5, 43.8], [8.9, 44.4], [10.2, 43.9], [11, 42.4], [12.5, 41.6], [14, 40.8], [15.7, 40], [15.6, 38.2], [16.1, 38], [16.6, 38.5], [17.1, 39], [16.6, 39.7], [17.3, 40.5], [18.5, 40.1], [18, 40.7], [16, 41.6], [14.1, 42.5], [13.6, 43.5], [12.3, 44.5], [12.4, 45.4], [13.7, 45.6], [15, 44.6], [16.4, 43.5], [18.1, 42.6], [19.4, 41.8], [19.4, 40.5], [20.2, 39.5], [21.1, 38.3], [21.7, 36.8], [22.5, 36.4], [23.1, 36.8], [23.2, 37.9], [24, 38.2], [22.8, 39.6], [23, 40.4], [24, 40.8], [26, 40.8], [26.3, 40.3], [27, 40.6], [29, 41.2], [28, 43.4], [29.7, 45.2], [30.5, 47]];
    const AF = [[-10, 29], [-10, 31.5], [-9.6, 32.6], [-6.8, 34], [-6, 35.8], [-5.3, 35.9], [-2, 35.1], [0, 35.8], [3, 36.8], [5, 36.8], [8.6, 36.9], [10, 37.3], [11, 37], [10.5, 36.4], [11, 35.5], [10.2, 34.5], [11, 33.3], [13.2, 32.9], [16, 31.2], [19, 30.3], [20, 30.9], [20.1, 32.2], [22, 32.8], [25, 31.6], [29.9, 31.2], [32.3, 31.2], [34.2, 31.3], [34.2, 29]];
    const AS = [[29, 41.2], [31, 41.1], [35, 42], [38, 41], [41, 41.2], [41, 29], [34.2, 29], [34.4, 31.5], [35, 32.8], [35.5, 34], [35.8, 35.5], [36, 36.6], [34.6, 36.8], [32.5, 36.1], [30.5, 36.6], [28, 36.7], [27.3, 37], [27, 38.4], [26.4, 39.5], [26.3, 40.1], [27, 40.4]];
    const ISL = [[[12.4, 37.8], [15.6, 38.3], [15.1, 36.7]], [[8.4, 41.1], [9.8, 41], [9.6, 39], [8.4, 39]], [[8.6, 43], [9.4, 42.9], [9.2, 41.4], [8.7, 41.6]], [[23.5, 35.6], [26.3, 35.2], [24, 35.1]], [[32.3, 35], [34.5, 35.6], [33.9, 34.7]]];
    const land = (pts, extra = []) => {
      const g = D.sub(), d = poly(pts);
      P(d, go(1.1), 1.1, { color: col(C.brown, PAL.ink), w: 2.2 }); F(d, go(.2, 0), { color: col("#fdf6e3", "#fef9c3"), op: 1 });
      extra.forEach(isl => { const di = poly(isl); P(di, go(.25), .25, { color: col(C.brown, PAL.ink), w: 1.8 }); F(di, go(.05, 0), { color: col("#fdf6e3", "#fef9c3"), op: 1 }); });
      D.back(); return g;
    };
    const eu = land(EU, ISL.slice(0, 4)), af = land(AF), as = land(AS, ISL.slice(4));
    return {
      eu, af, as, pt,
      dot(lon, lat, label, o2 = {}) {
        const [x, y] = pt(lon, lat), dd = k.ellipse(x, y, 5, 5);
        P(dd, go(.3), .3, { color: o2.color || C.red, w: 2.5 }); F(dd, go(.1, 0), { color: o2.color || C.red, op: 1 });
        if (label) T(label, x + (o2.dx ?? 9), y + (o2.dy ?? 5), go(.5), .5, { size: o2.size || 15, color: o2.color || C.red, weight: 900, anchor: o2.anchor || "start" });
        return [x, y];
      },
    };
  };

  // ---------- 船（组）：吃水线中心 (x,y)，s 缩放；返回组 id ----------
  D.boat = (x, y, s = 1, color) => {
    color = color || col(C.brown, PAL.ink);
    const g = D.sub();
    const X = v => (x + v * s).toFixed(1), Y = v => (y + v * s).toFixed(1);
    const hull = `M${X(-46)},${Y(-12)} L${X(46)},${Y(-12)} L${X(32)},${Y(8)} L${X(-34)},${Y(8)} Z`;
    P(hull, go(.5), .5, { color, w: 2.5 }); F(hull, go(.1, 0), { color: col("#fde68a", "#fef9c3"), op: 1 });
    P(`M${X(0)},${Y(-12)} L${X(0)},${Y(-70)}`, go(.3), .3, { color, w: 2.5 });
    const sail = `M${X(3)},${Y(-66)} Q${X(34)},${Y(-44)} ${X(3)},${Y(-18)} Z`;
    P(sail, go(.4), .4, { color: C.ink, w: 2 }); F(sail, go(.1, 0), { color: "#fff", op: 1 });
    P(`M${X(-4)},${Y(-62)} L${X(-26)},${Y(-22)} L${X(-4)},${Y(-22)}`, go(.3), .3, { color: C.ink, w: 2 });
    D.back(); return g;
  };
  // ---------- 风（组）：三条波浪风线 + 箭头，从 (x,y) 往右 ----------
  D.wind = (x, y, len = 70) => {
    const g = D.sub();
    [-18, 0, 18].forEach((dy, i) => {
      const yy = y + dy, x2 = x + len - i * 8;
      P(k.wave(x, x2, yy, 3) + ` M${x2 - 8},${yy - 6} L${x2 + 2},${yy} L${x2 - 8},${yy + 6}`, go(.35), .35, { color: col("#0ea5e9", PAL.blue), w: 2.2 });
    });
    D.back(); return g;
  };
  // ---------- 飞机（组）：中心 (x,y) ----------
  D.plane = (x, y, s = 1) => {
    const g = D.sub();
    const X = v => (x + v * s).toFixed(1), Y = v => (y + v * s).toFixed(1);
    const body = `M${X(-56)},${Y(-4)} Q${X(-60)},${Y(-12)} ${X(-48)},${Y(-12)} L${X(44)},${Y(-10)} Q${X(62)},${Y(-4)} ${X(44)},${Y(4)} L${X(-48)},${Y(4)} Z`;
    P(body, go(.5), .5, { color: C.blue, w: 2.5 }); F(body, go(.1, 0), { color: "#dbeafe", op: 1 });
    const wing = `M${X(-6)},${Y(-6)} L${X(-24)},${Y(-34)} L${X(-10)},${Y(-34)} L${X(16)},${Y(-6)} Z M${X(-6)},${Y(2)} L${X(-24)},${Y(30)} L${X(-10)},${Y(30)} L${X(16)},${Y(2)} Z`;
    P(wing, go(.5), .5, { color: C.blue, w: 2.2 }); F(wing, go(.1, 0), { color: "#bfdbfe", op: 1 });
    P(`M${X(-50)},${Y(-10)} L${X(-58)},${Y(-26)} L${X(-46)},${Y(-26)} L${X(-38)},${Y(-11)}`, go(.3), .3, { color: C.blue, w: 2.2 });
    D.back(); return g;
  };
  // ---------- 机场塔台 + 跑道（组）：塔底 (x,y) ----------
  D.tower = (x, y) => {
    const g = D.sub();
    P(`M${x - 8},${y} L${x - 6},${y - 70} M${x + 8},${y} L${x + 6},${y - 70}`, go(.4), .4, { color: C.ink, w: 2.5 });
    const cab = `M${x - 22},${y - 70} L${x + 22},${y - 70} L${x + 16},${y - 94} L${x - 16},${y - 94} Z`;
    P(cab, go(.4), .4, { color: C.ink, w: 2.5 }); F(cab, go(.1, 0), { color: "#bae6fd", op: 1 });
    P(k.wl(x - 140, y + 4, x + 120, y + 4, .5), go(.4), .4, { color: C.grey, w: 3 });
    P(`M${x - 130},${y + 14} h18 M${x - 100},${y + 14} h18 M${x - 70},${y + 14} h18 M${x - 40},${y + 14} h18`, go(.3), .3, { color: C.grey, w: 2 });
    D.back(); return g;
  };
  // ---------- 码头（组）：左端 (x,y)，宽 w ----------
  D.pier = (x, y, w = 110) => {
    const g = D.sub();
    P(k.roughRect(x, y - 10, w, 10), go(.4), .4, { color: col(C.brown, PAL.ink), w: 2.2 }); F(k.rectD(x, y - 10, w, 10), go(.1, 0), { color: col("#d6a77a", "#fef9c3"), op: 1 });
    for (let i = 10; i < w; i += 30) P(k.wl(x + i, y, x + i, y + 24, .3), go(.12), .12, { color: col(C.brown, PAL.ink), w: 2.5 });
    D.back(); return g;
  };
  // ---------- 小城（城墙 + 房子）：左下角 (x,y)，宽 w ----------
  D.city = (x, y, w = 150, label) => {
    P(k.roughRect(x, y - 44, w, 44), go(.6), .6, { color: col(C.brown, PAL.ink), w: 2.5 }); F(k.rectD(x, y - 44, w, 44), go(.1, 0), { color: col("#fef3c7", "#fef9c3"), op: 1 });
    let crenel = ""; for (let i = 0; i < w; i += 20) crenel += ` M${x + i},${y - 44} v-8 h10 v8`;
    P(crenel, go(.4), .4, { color: col(C.brown, PAL.ink), w: 2 });
    const r1 = `M${x + 22},${y - 52} l18,-22 l18,22 Z`, r2 = `M${x + w - 64},${y - 52} l22,-28 l22,28 Z`;
    P(r1 + " " + r2, go(.4), .4, { color: C.red, w: 2 }); F(r1 + " " + r2, go(.1, 0), { color: col("#fecdd3", PAL.tintRed), op: 1 });
    const gate = `M${x + w / 2 - 12},${y} v-20 q12,-14 24,0 v20`;
    P(gate, go(.3), .3, { color: C.ink, w: 2 });
    if (label) T(label, x + w / 2, y + 22, go(.4), .4, { size: 15, color: col(C.brown, PAL.ink), weight: 900, anchor: "middle" });
  };
  // ---------- 货箱 / 卷轴信件（组）：中心 (x,y) ----------
  D.crate = (x, y, color) => {
    color = color || col(C.brown, PAL.ink);
    const g = D.sub();
    P(k.roughRect(x - 13, y - 13, 26, 26), go(.3), .3, { color, w: 2.2 }); F(k.rectD(x - 13, y - 13, 26, 26), go(.1, 0), { color: col("#fcd9a8", "#fef9c3"), op: 1 });
    P(`M${x - 13},${y - 13} L${x + 13},${y + 13} M${x + 13},${y - 13} L${x - 13},${y + 13}`, go(.2), .2, { color, w: 1.4 });
    D.back(); return g;
  };
  D.scroll = (x, y) => {
    const g = D.sub();
    const d = `M${x - 16},${y - 10} h32 v20 h-32 Z`;
    P(d, go(.3), .3, { color: C.purple, w: 2.2 }); F(d, go(.1, 0), { color: "#ede9fe", op: 1 });
    P(`M${x - 10},${y - 3} h20 M${x - 10},${y + 3} h14`, go(.2), .2, { color: C.purple, w: 1.5 });
    D.back(); return g;
  };
  // ---------- 火柴人（组）：脚底 (x,y) ----------
  D.person = (x, y, color = C.purple) => {
    const g = D.sub();
    P(k.ellipse(x, y - 52, 8, 8), go(.3), .3, { color, w: 2.5 });
    P(`M${x},${y - 44} L${x},${y - 18} M${x},${y - 18} L${x - 9},${y} M${x},${y - 18} L${x + 9},${y} M${x - 12},${y - 34} L${x + 14},${y - 30}`, go(.4), .4, { color, w: 2.5 });
    D.back(); return g;
  };
  // ---------- 白牛（组，Europe 幕）：脚底中心 (x,y)，s 缩放，默认头朝左；返回 { g, back:[x,y]（牛背坐处）, legs（腿的组，游泳时可藏进水里）} ----------
  D.bull = (x, y, s = 1, o = {}) => {
    const f = o.face === "right" ? -1 : 1;
    const X = v => (x - v * s * f).toFixed(1), Y = v => (y + v * s).toFixed(1);   // v 以「头的方向」为正
    const ink = col(C.ink, PAL.ink);
    const legs = D.sub();   // 腿单独一组（游泳时淡出，像藏进水里）；身体一组；移动时两组一起动
    [[-28, 0], [-14, 0], [22, 0], [34, 0]].forEach(([lx]) => P(`M${X(lx)},${Y(-30)} L${X(lx + 1)},${Y(-2)} M${X(lx - 3)},${Y(0)} L${X(lx + 4)},${Y(0)}`, go(.12), .12, { color: ink, w: 2.6 }));
    const g = D.sub();
    const body = `M${X(-44)},${Y(-40)} Q${X(-48)},${Y(-62)} ${X(-24)},${Y(-64)} L${X(26)},${Y(-64)} Q${X(44)},${Y(-62)} ${X(46)},${Y(-44)} Q${X(44)},${Y(-26)} ${X(26)},${Y(-26)} L${X(-26)},${Y(-26)} Q${X(-44)},${Y(-26)} ${X(-44)},${Y(-40)} Z`;
    P(body, go(.6), .6, { color: ink, w: 2.5 }); F(body, go(.1, 0), { color: "#ffffff", op: 1 });
    const head = `M${X(40)},${Y(-60)} Q${X(52)},${Y(-74)} ${X(64)},${Y(-68)} Q${X(74)},${Y(-60)} ${X(70)},${Y(-46)} Q${X(66)},${Y(-38)} ${X(56)},${Y(-40)} Q${X(46)},${Y(-44)} ${X(40)},${Y(-60)} Z`;
    P(head, go(.4), .4, { color: ink, w: 2.5 }); F(head, go(.1, 0), { color: "#ffffff", op: 1 });
    P(`M${X(50)},${Y(-70)} Q${X(44)},${Y(-86)} ${X(54)},${Y(-90)} M${X(62)},${Y(-70)} Q${X(66)},${Y(-86)} ${X(76)},${Y(-86)}`, go(.3), .3, { color: col(C.orange, PAL.ink), w: 3 });   // 角（金色角是神话里的标志，用描边表示）
    P(`M${X(-44)},${Y(-50)} Q${X(-58)},${Y(-46)} ${X(-56)},${Y(-30)}`, go(.2), .2, { color: ink, w: 2.2 });   // 尾巴
    const eye = k.ellipse(+X(60), +Y(-58), 1.8, 1.8); P(eye, go(.1), .1, { color: ink, w: 2.4 }); F(eye, go(.05, 0), { color: ink, op: 1 });
    P(`M${X(66)},${Y(-46)} q${(-3 * f).toFixed(1)},2 ${(-5 * f).toFixed(1)},0`, go(.1), .1, { color: ink, w: 1.6 });
    D.back();
    return { g, legs, back: [x - 2 * s * f, y - 64 * s] };
  };
  // ---------- 盖章：印章从上面压到 (x,y)，留下红色印记 label ----------
  D.stamp = (x, y, label = "OK", o = {}) => {
    const g = D.sub();
    P(`M${x - 22},${y - 74} h44 v-22 h-44 Z`, go(.3), .3, { color: C.ink, w: 2.2 }); F(`M${x - 22},${y - 74} h44 v-22 h-44 Z`, go(.1, 0), { color: "#fda4af", op: 1 });
    P(`M${x - 6},${y - 96} h12 v-30 h-12 Z`, go(.3), .3, { color: C.brown, w: 2.2 }); F(`M${x - 6},${y - 96} h12 v-30 h-12 Z`, go(.1, 0), { color: "#d6a77a", op: 1 });
    D.back();
    const t = go(1.8);
    if (V2()) { k.move(g, t - .15, .15, 0, -10, { ease: "move" }); k.move(g, t, .5, 0, 84, { ease: "exit" }); k.squash(g, t + .5, .3, .2); k.sfx("pop", t + .5); }   // 预备上提 → 加速砸下 → 压扁回弹
    else { k.move(g, t, .5, 0, 74, { linear: true }); k.buzz(g, t + .5, .3, 2); }
    if (o.into) k.S.g = o.into;     // 印记跟着文书一起走
    const ring = k.ellipse(x, y - 4, 26, 15);
    P(ring, t + .6, .25, { color: C.red, w: 3 });
    T(label, x, y + 2, t + .6, .25, { size: 14, color: C.red, weight: 900, anchor: "middle", font: MONO });
    D.back();
    k.move(g, t + 1, .5, 0, -74); k.fade(g, t + 1.3, .4, 0);
    return t + .6;
  };
  // ---------- 变身：A 抖一下 → 淡出，B 在同一位置淡入（B 要先 hide）----------
  D.morph = (gA, gB, dur = 1) => {
    const t = go(.4 + dur);
    k.buzz(gA, t, .4, 2); k.fade(gA, t + .4, dur, 0); k.fade(gB, t + .4, dur, 1);
    return t;
  };
  // ---------- 前缀吸附：词根块固定在 (rx, y)，前缀块从 from=[dx,dy] 飞过来「咔」地贴在左边 ----------
  // 返回 { x0（前缀左边）, end（词根右边）, y }
  D.chipW = (text, fs = 18) => text.length * fs * .6 + 20;
  D.snap = (prefix, root, rx, y, o = {}) => {
    const fs = o.size ?? 18, pw = D.chipW(prefix, fs), rw = D.chipW(root, fs);
    const tint = c => (V2() ? ({ [PAL.red]: PAL.tintRed, [PAL.green]: PAL.tintGreen, [PAL.blue]: PAL.tintBlue, [PAL.ink]: PAL.tintInk })[c] : undefined);
    if (!o.noRoot) k.chip(root, rx, y, null, { size: fs, color: o.rootColor || C.blue, fill: tint(o.rootColor || C.blue) });
    const g = D.sub();
    k.chip(prefix, rx - pw, y, null, { size: fs, color: o.color || C.purple, fill: tint(o.color || C.purple) });
    D.back();
    const [dx, dy] = o.from || [-60, -50];
    k.move(g, -1, .001, dx, dy);
    const t = go(.9);
    if (V2()) { k.move(g, t, .6, -dx, -dy, { ease: "antic" }); k.squash(g, t + .6, .32, .16); k.sfx("pop", t + .6); }   // 预备后撤 → 飞过去 → 贴上压扁回弹（M1 + M2）
    else { k.move(g, t, .6, -dx, -dy); k.buzz(g, t + .6, .25, 1.6); }
    return { x0: rx - pw, end: rx + rw, y, t };
  };
  // ---------- 节奏：画线写字整体加速，朗读和「停下来想」的时间保持原长 ----------
  // D.hold(秒)：要保留原长的停顿（比如预测题留 3 秒思考）；k.say 自动保留。
  // D.finish(f)：build 结尾调用，把其余时间压缩成 f 倍（f=0.5 → 画得快一倍）。
  const keeps = [];
  D.hold = (sec) => { keeps.push([k.S.at, k.S.at + sec]); k.wait(sec); };
  D.finish = (f = .5) => {
    const S = k.S, raw = keeps.concat(S.keeps || [], S.says.map(sy => [sy.t, sy.t + sy.dur + .25]));
    // v2：人物动作（走、搬、跑……）按原速演，不压缩（否则脚步变快、像快进）
    if (V2() && S.acts) S.acts.forEach(r => raw.push([r.t, r.t + r.dur]));
    raw.sort((a, b) => a[0] - b[0]);
    const iv = [];
    raw.forEach(([a, b]) => { const l = iv[iv.length - 1]; if (l && a <= l[1]) l[1] = Math.max(l[1], b); else iv.push([a, b]); });
    const g = t => {
      if (t < 0) return t;
      let out = 0, prev = 0;
      for (const [a, b] of iv) {
        if (t <= a) return out + (t - prev) * f;
        out += (a - prev) * f;
        if (t <= b) return out + (t - a);
        out += b - a; prev = b;
      }
      return out + (t - prev) * f;
    };
    S.items.forEach(it => { const t0 = it.t; it.t = g(t0); it.dur = Math.max(.01, g(t0 + it.dur) - it.t); });
    S.fx.forEach(fx => { if (fx.t < 0) return; const t0 = fx.t; fx.t = g(t0); fx.dur = Math.max(.001, g(t0 + fx.dur) - fx.t); });
    S.cam.forEach(c => { const t0 = c.t; c.t = g(t0); c.dur = Math.max(.001, g(t0 + c.dur) - c.t); });
    S.narr.forEach(n => { n[0] = g(n[0]); });
    S.says.forEach(sy => { sy.t = g(sy.t); });
    if (k.remap) k.remap(g);
    S.at = g(S.at);
    // 字幕至少停留 minGap 秒：太挤的地方整体往后推
    const minGap = 2.2;
    for (let i = 1; i < S.narr.length; i++) {
      const gap = S.narr[i][0] - S.narr[i - 1][0];
      if (gap >= minGap) continue;
      const at = S.narr[i][0], d = minGap - gap, sh = t => (t >= at - 1e-6 ? t + d : t);
      S.items.forEach(it => { it.t = sh(it.t); });
      S.fx.forEach(fx => { if (fx.t >= 0) fx.t = sh(fx.t); });
      S.cam.forEach(c => { c.t = sh(c.t); });
      S.says.forEach(sy => { sy.t = sh(sy.t); });
      if (k.remap) k.remap(sh);
      for (let j = i; j < S.narr.length; j++) S.narr[j][0] += d;
      S.at += d;
    }
  };
  return D;
};
