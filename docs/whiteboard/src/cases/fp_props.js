// ==================== 第一性原理总枢 · 共用演示道具 ====================
// 只给 cases/fp_*.js 用。道具 = 手绘静态部分（P/T/F）+ 引擎 v2 动效（group/move/buzz/fade/rot/camera）。
// 用法：const D = FP_PROPS(k);  D.mouth(...)
const FP_PROPS = function (k) {
  const { C, P, T, F, go } = k;
  const MONO = '"Courier New",Courier,monospace';
  const D = { MONO };

  // 口腔侧面图（脸朝右）。返回 { cords: 声带组, lips: 嘴唇组（上唇可合拢）, glow(x,y) 标出发音位置 }
  // o.x,o.y = 左上角；整个图约 250×260
  D.mouth = (o = {}) => {
    const x = o.x ?? 50, y = o.y ?? 170, s = o.s ?? 1;
    const X = v => x + v * s, Y = v => y + v * s;
    const pt = (a, b) => `${X(a).toFixed(1)},${Y(b).toFixed(1)}`;
    // 脸的轮廓：额头 → 鼻子 → 上唇 → 下唇 → 下巴 → 脖子前面
    P(`M${pt(80, 0)} C${pt(140, 10)} ${pt(160, 40)} ${pt(165, 70)} L${pt(195, 95)} L${pt(170, 108)} C${pt(178, 112)} ${pt(182, 118)} ${pt(178, 124)}`, go(1.1), 1.1, { color: C.ink, w: 3 });
    P(`M${pt(178, 140)} C${pt(184, 146)} ${pt(180, 154)} ${pt(172, 158)} C${pt(170, 176)} ${pt(160, 190)} ${pt(140, 196)} L${pt(138, 260)}`, go(1), 1, { color: C.ink, w: 3 });
    // 脖子后面
    P(`M${pt(20, 60)} C${pt(10, 120)} ${pt(30, 180)} ${pt(40, 260)}`, go(.7), .7, { color: C.ink, w: 3 });
    // 上颚 + 喉咙后壁
    P(`M${pt(172, 128)} C${pt(140, 112)} ${pt(100, 108)} ${pt(80, 130)} C${pt(70, 145)} ${pt(72, 170)} ${pt(75, 260)}`, go(1), 1, { color: C.brown, w: 2.5 });
    // 舌头
    const tongue = `M${pt(168, 140)} C${pt(150, 128)} ${pt(118, 128)} ${pt(100, 150)} C${pt(95, 165)} ${pt(100, 185)} ${pt(102, 200)}`;
    P(tongue, go(.8), .8, { color: C.red, w: 3 });
    F(`${tongue} L${pt(110, 200)} C${pt(130, 175)} ${pt(150, 158)} ${pt(170, 150)} Z`, go(.3, 0), { color: "#fecdd3", op: .8 });
    // 气管前壁
    P(`M${pt(102, 200)} L${pt(104, 260)}`, go(.4), .4, { color: C.brown, w: 2.5 });
    // 声带（两片小肉，组：可抖动）
    const cords = k.group();
    P(`M${pt(75, 228)} L${pt(88, 222)} M${pt(104, 228)} L${pt(91, 222)}`, go(.5), .5, { color: C.purple, w: 5 });
    k.endGroup();
    T("声带", X(o.labelX ?? -20), Y(232), go(.5), .5, { size: 16, color: C.purple, weight: 900, anchor: "end" });
    P(k.wl(X(o.labelX ?? -16), Y(226), X(72), Y(225), .4), go(.3), .3, { color: C.purple, w: 1.5 });
    return {
      cords, X, Y,
      // 声带旁边的震动波纹（组），默认隐藏，用 k.fade 显示
      waves() {
        const g = k.group();
        P(`M${pt(58, 214)} q-8,10 0,20 M${pt(50, 208)} q-12,16 0,32 M${pt(120, 214)} q8,10 0,20 M${pt(128, 208)} q12,16 0,32`, go(.01, 0), .01, { color: C.orange, w: 2.5 });
        k.endGroup(); k.hide(g); return g;
      },
      // 在某个位置画一个亮点（发音位置）
      glow(a, b, color = C.orange) {
        const d = k.ellipse(X(a), Y(b), 9 * s, 9 * s);
        P(d, go(.35), .35, { color, w: 3 }); F(d, go(.1, 0), { color: "#fde68a", op: .9 });
      },
    };
  };

  // 小标签框（等宽英文/音标）
  D.tag = (text, x, y, color = C.blue, size = 20) => {
    const w = text.length * size * .6 + 18, h = size + 14;
    P(k.roughRect(x, y - h + 7, w, h), go(.4, 0), .4, { color, w: 2.2 });
    T(text, x + 9, y, go(Math.max(.4, text.length * .06)), Math.max(.4, text.length * .06), { size, color, weight: 900, font: MONO });
    return { x, y, w, h };
  };

  // 分段上色的等宽一行：parts = [["/ˈbʌs", C.ink], ["ɪ", C.orange], ["z/", C.ink]]，返回结束 x
  D.parts = (parts, x, y, size = 24, weight = 900) => {
    let cx = x;
    parts.forEach(([text, color]) => {
      const dur = Math.max(.3, text.length * .07);
      T(text, cx, y, go(dur), dur, { size, color, weight, font: MONO });
      cx += text.length * size * .6;
    });
    return cx;
  };

  // 结论绿框 + 口诀（y 446–498 + 525）
  D.fin = (concl, rhyme) => {
    P(k.roughRect(16, 446, 928, 52), go(1), 1, { color: C.green, w: 2.5 });
    F(k.rectD(16, 446, 928, 52), go(.2, 0), { color: "#ecfdf5", op: .9 });
    T(concl, 36, 480, go(Math.max(1.6, concl.length * .07)), Math.max(1.6, concl.length * .07), { size: 20, color: C.green, weight: 900 });
    T(rhyme, 36, 526, go(1.8), 1.8, { size: 18, color: C.orange, weight: 900 });
  };
  return D;
};
